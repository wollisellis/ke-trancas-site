import Link from 'next/link';

type HeaderProps = {
  brandName: string;
  whatsappUrl: string;
  instagramUrl: string;
  promoMessages?: [string, string];
};

const DEFAULT_PROMO: [string, string] = [
  'Frete calculado no checkout',
  'Atendimento rápido no WhatsApp',
];

export function Header({ brandName, whatsappUrl, instagramUrl, promoMessages }: HeaderProps) {
  const [msgA, msgB] = promoMessages ?? DEFAULT_PROMO;

  // Duplicate items so the marquee loops seamlessly (translate -50%)
  const items = [msgA, msgB, msgA, msgB];

  return (
    <header className="site-header">
      <div className="promo-strip">
        <div className="promo-marquee" aria-hidden="true">
          <div className="promo-marquee-track">
            {items.map((msg, i) => (
              <span key={i} className="promo-marquee-item">
                {msg}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container topbar">
        <Link href="/" className="brand-mark">
          {brandName}
        </Link>

        <nav className="main-nav">
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/trancas">Tranças</Link>
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
