type MobileCtaBarProps = {
  whatsappUrl: string;
};

export function MobileCtaBar({ whatsappUrl }: MobileCtaBarProps) {
  return (
    <div className="mobile-cta-bar" role="region" aria-label="Acoes rapidas">
      <a className="btn" href={whatsappUrl} target="_blank" rel="noreferrer">
        Chamar no WhatsApp
      </a>
      <a className="btn btn-ghost" href="/catalogo">
        Ver catalogo
      </a>
    </div>
  );
}
