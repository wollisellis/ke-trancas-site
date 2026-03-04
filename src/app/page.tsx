import Link from 'next/link';
import type { Metadata } from 'next';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { MobileCtaBar } from '@/components/site/MobileCtaBar';
import { ProductCard } from '@/components/site/ProductCard';
import { TrustBar } from '@/components/site/TrustBar';
import { WhyBuySection } from '@/components/site/WhyBuySection';
import { HairTypeGuide } from '@/components/site/HairTypeGuide';
import { CategoryDivider } from '@/components/site/CategoryDivider';
import { ResultsGallery } from '@/components/site/ResultsGallery';
import { toYoutubeEmbedUrl } from '@/lib/format';
import { readCMS } from '@/lib/cms-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Kê Tranças | Cosméticos e Cuidados para Tranças',
  description: 'Catálogo de cosméticos para tranças e cabelos naturais. Kits pós-trança, sprays refresh, óleos e mais. Atendimento via WhatsApp — Limeira, SP.',
  openGraph: {
    title: 'Kê Tranças | Cosméticos e Cuidados para Tranças',
    description: 'Catálogo de cosméticos para tranças e cabelos naturais.',
    type: 'website'
  }
};

export default async function HomePage() {
  const cms = await readCMS();
  const bestSellers = cms.products.filter((item) => item.isBestSeller).slice(0, 6);
  const featured = cms.products.filter((item) => item.isFeatured).slice(0, 4);

  const spotlightA = featured[0] ?? bestSellers[0];
  const spotlightB = featured[1] ?? bestSellers[1];

  return (
    <main>
      <Header
        brandName={cms.settings.brandName}
        whatsappUrl={cms.settings.whatsappUrl}
        instagramUrl={cms.settings.instagramUrl}
      />

      {/* HERO */}
      <div className="hero-band">
      <section className="container hero-editorial">
        <article className="hero-copy">
          <p className="kicker">Coleção Kê Tranças</p>
          <h1>{cms.settings.heroTitle}</h1>
          <p className="muted">{cms.settings.heroSubtitle}</p>

          <div className="hero-actions">
            <Link href="/catalogo" className="btn">
              Ver catálogo
            </Link>
            <a className="btn btn-ghost" href={cms.settings.whatsappUrl} target="_blank" rel="noreferrer">
              Fala com a Claudeth
            </a>
          </div>

        </article>

        <article className="hero-visual">
          <a href="/trancas" className="hero-editorial-photo">
            <img src="/images/instagram/ig-DMyNb9GRJeU.jpg" alt="Resultado real — tranças por Claudeth" />
            <span className="hero-photo-tag">Resultado real</span>
          </a>
        </article>
      </section>
      </div>

      {/* TRUST BAR */}
      <TrustBar />

      {/* GUIA POR TIPO DE CABELO */}
      <HairTypeGuide items={cms.settings.hairTypeGuide} />

      {/* MAIS VENDIDOS */}
      <div className="section-bg-white">
      <section className="container">
        <div className="section-head" style={{ paddingBottom: 18 }}>
          <h2>Favoritas das clientes</h2>
          <p className="muted">Os produtos que as clientes mais voltam a comprar.</p>
        </div>

        <div className="product-grid product-grid-scroll-mobile">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href="/catalogo" className="btn btn-ghost">
            Ver catálogo completo
          </Link>
        </div>
      </section>
      </div>

      {/* SEPARADORES VISUAIS DE CATEGORIA */}
      <CategoryDivider categoryImages={cms.settings.categoryImages} />

      {/* GALERIA DE RESULTADOS REAIS */}
      <ResultsGallery />

      {/* BENTO: ROTINA + PAGAMENTO + SUPORTE */}
      <section className="container section-space bento-layout">
        <article className="card bento-main">
          <p className="kicker">O processo da Kê Tranças</p>
          <h3>Trança sem dor, do começo ao fim</h3>
          <ol>
            <li>Consulta pelo WhatsApp para escolher o modelo ideal para você.</li>
            <li>Atendimento presencial em Limeira, SP — com cuidado e sem causar dor.</li>
            <li>Produtos certos para manter o resultado por mais tempo.</li>
          </ol>
        </article>

        <article className="card bento-side">
          <h3>Formas de pagamento</h3>
          <ul>
            {cms.settings.paymentItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card bento-side">
          <h3>Atendimento da Claudeth</h3>
          <p>{cms.settings.supportText}</p>
          <a href={cms.settings.whatsappUrl} target="_blank" rel="noreferrer" className="text-link">
            Chamar no WhatsApp
          </a>
        </article>
      </section>

      {/* VIDEOS */}
      {cms.videos.length > 0 && (
        <section className="container section-space">
          <div className="section-head">
            <h2>Aprenda com a Claudeth</h2>
            <p className="muted">Dicas práticas de cuidado para cada tipo de trança.</p>
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
      )}

      {/* AVALIACOES */}
      {cms.reviews.length > 0 && (
        <section className="container section-space">
          <div className="section-head">
            <h2>O que as clientes dizem</h2>
            <p className="muted">{cms.reviews.length} avaliações de clientes reais</p>
          </div>

          <div className="review-grid">
            {cms.reviews.slice(0, 6).map((review) => (
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

      {/* MOTIVOS PARA COMPRAR */}
      <WhyBuySection reasons={cms.settings.reasons} />

      {/* BLOCO COMERCIAL FINAL COM PRECO */}
      {bestSellers.slice(0, 4).length > 0 && (
        <div className="section-bg-white">
        <section className="container">
          <div className="section-head" style={{ paddingBottom: 18 }}>
            <h2>Aproveite os preços de hoje</h2>
            <Link href="/catalogo" className="text-link">Ver catálogo</Link>
          </div>
          <div className="product-grid product-grid-scroll-mobile">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        </div>
      )}

      {/* CTA FINAL */}
      <section className="container section-space final-cta card">
        <h2>Fala com a Claudeth — sem robô, sem espera</h2>
        <p className="muted">
          Box Braids, Nagô, Fulani, Boho, Gypsy, Lemonade Braids e mais. Atendimento presencial em Limeira, SP, de segunda a sábado. A Claudeth te orienta pelo WhatsApp antes, durante e depois.
        </p>
        <div className="hero-actions">
          <a className="btn" href={cms.settings.whatsappUrl} target="_blank" rel="noreferrer">
            Chamar no WhatsApp
          </a>
          <Link className="btn btn-ghost" href="/catalogo">
            Ver catálogo completo
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
