import Link from 'next/link';
import AdminClient from '@/app/admin/AdminClient';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { readCMS } from '@/lib/cms-store';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cms = await readCMS();

  return (
    <main>
      <Header
        brandName={cms.settings.brandName}
        whatsappUrl={cms.settings.whatsappUrl}
        instagramUrl={cms.settings.instagramUrl}
      />

      <section className="container page-head">
        <h1>Painel de gestao</h1>
        <p className="muted">Controle total do conteudo sem depender de codigo.</p>
        <Link href="/" className="text-link">
          Voltar para o site
        </Link>
      </section>

      <section className="container">
        <AdminClient />
      </section>

      <Footer
        brandName={cms.settings.brandName}
        whatsappUrl={cms.settings.whatsappUrl}
        instagramUrl={cms.settings.instagramUrl}
        supportText={cms.settings.supportText}
      />
    </main>
  );
}
