import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { MobileCtaBar } from '@/components/site/MobileCtaBar';
import { ProductCard } from '@/components/site/ProductCard';
import { BraidGallery } from '@/components/site/BraidGallery';
import { readCMS } from '@/lib/cms-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tranças | Kê Tranças — Cosméticos para Tranças',
  description: 'Linha completa de produtos para cuidar das suas tranças: Box Braids, Nagô, Fulani, Boho Braids e mais. Hidratação, refresh e finalização.',
  openGraph: {
    title: 'Tranças | Kê Tranças',
    description: 'Linha completa de produtos para cuidar das suas tranças.'
  }
};

export default async function TrancasPage() {
  const cms = await readCMS();

  const trancaProducts = cms.products.filter(
    (p) =>
      p.category.toLowerCase().includes('tranca') ||
      p.hairType.toLowerCase().includes('tranca') ||
      p.tags.some((t) => t.toLowerCase().includes('tranca'))
  );

  const allProducts = trancaProducts.length > 0 ? trancaProducts : cms.products;

  return (
    <main>
      <Header
        brandName={cms.settings.brandName}
        whatsappUrl={cms.settings.whatsappUrl}
        instagramUrl={cms.settings.instagramUrl}
        promoMessages={cms.settings.promoMessages}
      />

      {/* Hero da página de tranças */}
      <section className="trancas-hero">
        <div className="container">
          <p className="kicker">Linha Tranças</p>
          <h1>Tudo para cuidar das suas tranças</h1>
          <p className="muted">
            Produtos selecionados para box braid, nagô, senegalesas e todos os tipos de tranças.
            Do refresh do dia a dia ao cuidado pós-trança.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
            <a href={cms.settings.whatsappUrl} target="_blank" rel="noreferrer" className="btn">
              Falar com a Claudeth
            </a>
            <Link href="/catalogo" className="btn btn-ghost">
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* GALERIA DE TRABALHOS POR TIPO */}
      <BraidGallery />

      {/* Produtos */}
      <section className="container section-space">
        <div className="section-head">
          <h2>{allProducts.length} produtos encontrados</h2>
          <p className="muted">Ordenados por mais vendidos e melhor avaliação.</p>
        </div>

        <div className="product-grid trancas-grid">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container section-space final-cta card">
        <h2>Não sabe por onde começar?</h2>
        <p className="muted">
          Manda uma mensagem para a Claudeth. Ela indica o produto certo para o seu tipo de trança — sem julgamento, só cuidado.
        </p>
        <a className="btn" href={cms.settings.whatsappUrl} target="_blank" rel="noreferrer">
          Falar com a Claudeth
        </a>
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
