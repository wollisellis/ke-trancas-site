import Link from 'next/link';

type HeaderProps = {
  brandName: string;
  whatsappUrl: string;
  instagramUrl: string;
};

export function Header({ brandName, whatsappUrl, instagramUrl }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="promo-strip">
        <div className="container promo-strip-inner">
          <span>Frete calculado no checkout</span>
          <span>Atendimento rapido no WhatsApp</span>
        </div>
      </div>

      <div className="container topbar">
        <Link href="/" className="brand-mark">
          {brandName}
        </Link>

        <nav className="main-nav">
          <Link href="/catalogo">Catalogo</Link>
          <Link href="/admin">Painel</Link>
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-small">
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
