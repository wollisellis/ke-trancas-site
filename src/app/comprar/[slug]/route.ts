import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { readCMS } from '@/lib/cms-store';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!process.env.STRIPE_SECRET_KEY) {
    redirect(`/produto/${slug}`);
  }

  const cms = await readCMS();
  const product = cms.products.find((p) => p.slug === slug);

  if (!product || !product.inStock || !product.buyOnline) {
    redirect(`/produto/${slug}`);
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = request.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            description: product.description || undefined,
            ...(product.images[0]?.startsWith('http') ? { images: [product.images[0]] } : {}),
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${origin}/produto/${slug}?pagamento=sucesso`,
    cancel_url: `${origin}/produto/${slug}`,
    locale: 'pt-BR',
    phone_number_collection: { enabled: true },
  });

  redirect(session.url!);
}
