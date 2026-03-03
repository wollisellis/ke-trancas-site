import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { MobileCtaBar } from '@/components/site/MobileCtaBar';
import { formatBRL } from '@/lib/format';
import { readCMS } from '@/lib/cms-store';

export const dynamic = 'force-dynamic';

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function ProdutoPage({ params }: Params) {
  const { slug } = await params;
  const cms = await readCMS();

  const product = cms.products.find((item) => item.slug === slug);
  if (!product) {
    notFound();
  }

  const reviews = cms.reviews.filter((review) => !review.productSlug || review.productSlug === product.slug).slice(0, 6);

  return (
    <main>
      <Header
        brandName={cms.settings.brandName}
        whatsappUrl={cms.settings.whatsappUrl}
        instagramUrl={cms.settings.instagramUrl}
      />

      <section className="container product-page-grid">
        <img src={product.imageUrl} alt={product.name} className="product-page-image" />

        <div className="card">
          <p className="kicker">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="muted">{product.description}</p>

          <p className="rating">
            {'?'.repeat(Math.round(product.rating))} {product.rating.toFixed(1)} ({product.reviewCount} avaliacoes)
          </p>

          <div className="price-row" style={{ marginBottom: 16 }}>
            <strong>{formatBRL(product.price)}</strong>
            {typeof product.oldPrice === 'number' ? <span className="price-old">{formatBRL(product.oldPrice)}</span> : null}
          </div>

          <p>
            <strong>Beneficio principal:</strong> {product.benefit}
          </p>
          <p>
            <strong>Tipo de cabelo:</strong> {product.hairType}
          </p>
          <p>
            <strong>Marca:</strong> {product.brand}
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
            <a className="btn" href={cms.settings.whatsappUrl} target="_blank" rel="noreferrer">
              Comprar no WhatsApp
            </a>
            <Link className="btn btn-ghost" href="/catalogo">
              Voltar ao catalogo
            </Link>
          </div>
        </div>
      </section>

      <section className="container section-space">
        <h2>Avaliacoes de clientes</h2>
        <div className="review-grid">
          {reviews.map((review) => (
            <article key={review.id} className="card review-card">
              <p className="rating">{'?'.repeat(review.rating)}</p>
              <p>{review.text}</p>
              <p className="muted">- {review.author}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer
        brandName={cms.settings.brandName}
        whatsappUrl={cms.settings.whatsappUrl}
        instagramUrl={cms.settings.instagramUrl}
        supportText={cms.settings.supportText}
      />

      <MobileCtaBar whatsappUrl={cms.settings.whatsappUrl} />
    </main>
  );
}
