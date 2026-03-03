import Link from 'next/link';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { MobileCtaBar } from '@/components/site/MobileCtaBar';
import { ProductCard } from '@/components/site/ProductCard';
import { toYoutubeEmbedUrl } from '@/lib/format';
import { readCMS } from '@/lib/cms-store';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const cms = await readCMS();
  const bestSellers = cms.products.filter((item) => item.isBestSeller).slice(0, 6);
  const featured = cms.products.filter((item) => item.isFeatured).slice(0, 4);
  const categories = [...new Set(cms.products.map((item) => item.category))].slice(0, 8);

  const spotlightA = featured[0] ?? bestSellers[0];
  const spotlightB = featured[1] ?? bestSellers[1];

  return (
    <main>
      <Header
        brandName={cms.settings.brandName}
        whatsappUrl={cms.settings.whatsappUrl}
        instagramUrl={cms.settings.instagramUrl}
      />

      <section className="container hero-editorial">
        <article className="hero-copy card">
          <p className="kicker">Colecao Ke Trancas</p>
          <h1>{cms.settings.heroTitle}</h1>
          <p className="muted">{cms.settings.heroSubtitle}</p>

          <div className="hero-actions">
            <Link href="/catalogo" className="btn">
              Explorar catalogo
            </Link>
            <a className="btn btn-ghost" href={cms.settings.whatsappUrl} target="_blank" rel="noreferrer">
              Consultoria rapida
            </a>
          </div>

          <div className="trust-inline">
            {cms.settings.trustItems.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="hero-visual card">
          <div className="hero-visual-grid">
            {spotlightA ? (
              <a href={'/produto/' + spotlightA.slug} className="hero-shot hero-shot-main">
                <img src={spotlightA.imageUrl} alt={spotlightA.name} />
                <span>{spotlightA.name}</span>
              </a>
            ) : null}

            {spotlightB ? (
              <a href={'/produto/' + spotlightB.slug} className="hero-shot hero-shot-side">
                <img src={spotlightB.imageUrl} alt={spotlightB.name} />
                <span>{spotlightB.name}</span>
              </a>
            ) : null}

            <div className="hero-metric">
              <strong>{bestSellers.length}</strong>
              <p>mais vendidos com prova social ativa</p>
            </div>
          </div>
        </article>
      </section>

      <section className="container section-space">
        <div className="section-head">
          <h2>Compre por objetivo</h2>
          <Link href="/catalogo" className="text-link">
            Ver todos
          </Link>
        </div>

        <div className="goal-strip">
          {categories.map((category) => (
            <a key={category} href={'/catalogo'} className="goal-pill">
              {category}
            </a>
          ))}
        </div>
      </section>

      <section className="container section-space">
        <div className="section-head">
          <h2>Mais vendidos</h2>
          <p className="muted">Selecao com maior recorrencia de compra e melhor avaliacao.</p>
        </div>

        <div className="product-grid product-grid-scroll-mobile">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container section-space bento-layout">
        <article className="card bento-main">
          <p className="kicker">Rotina guiada</p>
          <h3>Do preparo ao acabamento em 3 etapas</h3>
          <ol>
            <li>Pre-lavagem para proteger couro cabeludo.</li>
            <li>Tratamento alinhado ao tipo de fibra e cabelo.</li>
            <li>Finalizacao com fixacao leve e brilho controlado.</li>
          </ol>
        </article>

        <article className="card bento-side">
          <h3>Pagamento e seguranca</h3>
          <ul>
            {cms.settings.paymentItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card bento-side">
          <h3>Suporte humano</h3>
          <p>{cms.settings.supportText}</p>
          <a href={cms.settings.whatsappUrl} target="_blank" rel="noreferrer" className="text-link">
            Falar com especialista
          </a>
        </article>
      </section>

      <section className="container section-space">
        <div className="section-head">
          <h2>Videos de cuidado</h2>
          <p className="muted">Conteudo autoral para educar, converter e fidelizar.</p>
        </div>

        <div className="video-grid">
          {cms.videos.map((video) => (
            <article key={video.id} className="card video-card">
              <div className="video-wrap">
                <iframe
                  src={toYoutubeEmbedUrl(video.url)}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3>{video.title}</h3>
              <p className="muted">{video.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-space">
        <div className="section-head">
          <h2>Avaliacoes reais</h2>
        </div>

        <div className="review-grid">
          {cms.reviews.slice(0, 6).map((review) => (
            <article key={review.id} className="card review-card">
              <p className="rating">{'?'.repeat(review.rating)}</p>
              <p>{review.text}</p>
              <p className="muted">- {review.author}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-space final-cta card">
        <h2>Pronta para vender com consistencia?</h2>
        <p className="muted">
          Site com conteudo editavel, visual profissional e operacao simplificada para o dia a dia da Ke Trancas.
        </p>
        <div className="hero-actions">
          <a className="btn" href={cms.settings.whatsappUrl} target="_blank" rel="noreferrer">
            Fechar pedido no WhatsApp
          </a>
          <Link className="btn btn-ghost" href="/admin">
            Atualizar conteudo agora
          </Link>
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
