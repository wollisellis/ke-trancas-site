import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { MobileCtaBar } from '@/components/site/MobileCtaBar';
import CatalogClient from '@/app/catalogo/CatalogClient';
import { readCMS } from '@/lib/cms-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Catálogo | Kê Tranças — Cosméticos para Tranças',
  description: 'Todos os produtos Kê Tranças: kits, finalizadores, óleos, sprays e mais. Filtre por tipo de cabelo, categoria e marca.',
  openGraph: {
    title: 'Catálogo Kê Tranças',
    description: 'Todos os produtos para cuidar das suas tranças.'
  }
};

export default async function CatalogoPage() {
  const cms = await readCMS();

  return (
    <main>
      <Header
        brandName={cms.settings.brandName}
        whatsappUrl={cms.settings.whatsappUrl}
        instagramUrl={cms.settings.instagramUrl}
        promoMessages={cms.settings.promoMessages}
      />

      <section className="container page-head">
        <h1>Catálogo completo</h1>
        <p className="muted">Filtre por categoria, tipo de cabelo ou marca e encontre o produto ideal para você.</p>
      </section>

      <section className="container">
        <Suspense fallback={<p className="muted">Carregando...</p>}>
          <CatalogClient products={cms.products} />
        </Suspense>
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
