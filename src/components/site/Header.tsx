import { Fragment } from 'react';
import Link from 'next/link';

type HeaderProps = {
  brandName: string;
  whatsappUrl: string;
  instagramUrl: string;
  promoMessages?: string[];
};

const DEFAULT_PROMO = [
  'Frete calculado no checkout',
  'Atendimento rápido no WhatsApp',
];

export function Header({ brandName, whatsappUrl, instagramUrl, promoMessages }: HeaderProps) {
  const msgs = (promoMessages ?? DEFAULT_PROMO).filter(Boolean);

  // Duplicate for seamless loop: track is 2× wide, we translateX(-50%)
  const doubled = [...msgs, ...msgs];

  return (
    <header className="site-header">
      <div className="promo-strip">
        <div className="promo-marquee" aria-hidden="true">
          <div className="promo-marquee-track">
            {doubled.map((msg, i) => (
              <Fragment key={i}>
                <span className="promo-marquee-sep">·</span>
                <span className="promo-marquee-item">{msg}</span>
              </Fragment>
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
