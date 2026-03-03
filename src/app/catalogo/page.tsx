import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { MobileCtaBar } from '@/components/site/MobileCtaBar';
import CatalogClient from '@/app/catalogo/CatalogClient';
import { readCMS } from '@/lib/cms-store';

export const dynamic = 'force-dynamic';

export default async function CatalogoPage() {
  const cms = await readCMS();

  return (
    <main>
      <Header
        brandName={cms.settings.brandName}
        whatsappUrl={cms.settings.whatsappUrl}
        instagramUrl={cms.settings.instagramUrl}
      />

      <section className="container page-head">
        <h1>Catalogo completo</h1>
        <p className="muted">Filtre por categoria, tipo de cabelo, marca e encontre rapido o produto ideal.</p>
      </section>

      <section className="container">
        <CatalogClient products={cms.products} />
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
