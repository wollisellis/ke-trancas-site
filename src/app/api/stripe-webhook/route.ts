import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { readCMS, writeCMS } from '@/lib/cms-store';

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature') ?? '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = new Stripe(process.env.STRIPE_SECRET_KEY).webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const slug = session.metadata?.slug;

    if (slug) {
      const cms = await readCMS();
      const products = cms.products.map((p) => {
        if (p.slug !== slug) return p;
        if (typeof p.stockQty !== 'number') return p; // no stock control
        const newQty = Math.max(0, p.stockQty - 1);
        return { ...p, stockQty: newQty, inStock: newQty > 0 };
      });
      await writeCMS({ ...cms, products });
    }
  }

  return NextResponse.json({ received: true });
}
