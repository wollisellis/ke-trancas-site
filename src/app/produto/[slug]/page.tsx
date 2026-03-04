import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { MobileCtaBar } from '@/components/site/MobileCtaBar';
import { ProductCard } from '@/components/site/ProductCard';
import { MiniReviews } from '@/components/site/MiniReviews';
import { formatBRL } from '@/lib/format';
import { readCMS } from '@/lib/cms-store';

export const dynamic = 'force-dynamic';

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cms = await readCMS();
  const product = cms.products.find((item) => item.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} | Ke Trancas`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl]
    }
  };
}

export default async function ProdutoPage({ params }: Params) {
  const { slug } = await params;
  const cms = await readCMS();

  const product = cms.products.find((item) => item.slug === slug);
  if (!product) {
    notFound();
  }

  const productReviews = cms.reviews.filter(
    (review) => !review.productSlug || review.productSlug === product.slug
  );

  const related = cms.products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.hairType === product.hairType)
    )
    .slice(0, 4);

  const discount =
    typeof product.oldPrice === 'number' && product.oldPrice > product.price
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : null;

  return (
    <main>
      <Header
        brandName={cms.settings.brandName}
        whatsappUrl={cms.settings.whatsappUrl}
        instagramUrl={cms.settings.instagramUrl}
      />

      <section className="container product-page-grid">
        <div className="product-page-media">
          <img src={product.imageUrl} alt={product.name} className="product-page-image" />
          {discount ? <span className="product-page-discount">-{discount}% OFF</span> : null}
        </div>

        <div className="card product-page-info">
          <p className="kicker">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="muted">{product.description}</p>

          <p className="rating" style={{ fontSize: '1rem', marginTop: 4 }}>
            {'★'.repeat(Math.round(product.rating))}{' '}
            <span className="muted">{product.rating.toFixed(1)} ({product.reviewCount} avaliações)</span>
          </p>

          <div className="price-row product-price-big">
            <strong>{formatBRL(product.price)}</strong>
            {typeof product.oldPrice === 'number' ? (
              <span className="price-old">{formatBRL(product.oldPrice)}</span>
            ) : null}
          </div>

          <div className="product-meta">
            <p><strong>Beneficio:</strong> {product.benefit}</p>
            <p><strong>Tipo de cabelo:</strong> {product.hairType}</p>
            <p><strong>Marca:</strong> {product.brand}</p>
          </div>

          <div className="product-page-actions">
            {product.stripeUrl ? (
              <>
                <a className="btn" href={product.stripeUrl} target="_blank" rel="noreferrer">
                  Comprar agora
                </a>
                <a className="btn btn-ghost" href={cms.settings.whatsappUrl} target="_blank" rel="noreferrer">
                  Falar com a Claudeth
                </a>
              </>
            ) : (
              <>
                <a className="btn" href={cms.settings.whatsappUrl} target="_blank" rel="noreferrer">
                  Pedir no WhatsApp
                </a>
                <Link className="btn btn-ghost" href="/catalogo">
                  Voltar ao catálogo
                </Link>
              </>
            )}
          </div>

          {/* Mini avaliações próximas ao produto */}
          <MiniReviews reviews={productReviews} />
        </div>
      </section>

      {/* Modo de uso */}
      {product.howToUse && product.howToUse.length > 0 && (
        <section className="container section-space">
          <h2>Como usar</h2>
          <ol className="how-to-use-list">
            {product.howToUse.map((step, i) => (
              <li key={i} className="how-to-use-step card">
                <span className="how-to-use-num">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Avaliações completas */}
      {productReviews.length > 0 && (
        <section className="container section-space">
          <h2>O que as clientes dizem</h2>
          <div className="review-grid">
            {productReviews.map((review) => (
              <article key={review.id} className="card review-card">
                <div className="review-author-row">
                  <span className="review-avatar">{review.author.charAt(0)}</span>
                  <div>
                    <strong className="review-name">{review.author}</strong>
                    <p className="rating" style={{ margin: 0 }}>{'★'.repeat(review.rating)}</p>
                  </div>
                </div>
                <p className="review-text">&ldquo;{review.text}&rdquo;</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Produtos relacionados */}
      {related.length > 0 && (
        <section className="container section-space">
          <div className="section-head">
            <h2>Você também pode gostar</h2>
            <Link href="/catalogo" className="text-link">Ver catálogo</Link>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <Footer
        brandName={cms.settings.brandName}
        whatsappUrl={cms.settings.whatsappUrl}
        instagramUrl={cms.settings.instagramUrl}
        supportText={cms.settings.supportText}
      />

      <MobileCtaBar whatsappUrl={cms.settings.whatsappUrl} stripeUrl={product.stripeUrl} />
    </main>
  );
}
