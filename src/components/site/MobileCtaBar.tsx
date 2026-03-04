type MobileCtaBarProps = {
  whatsappUrl: string;
  stripeUrl?: string;
};

export function MobileCtaBar({ whatsappUrl, stripeUrl }: MobileCtaBarProps) {
  return (
    <div className="mobile-cta-bar" role="region" aria-label="Acoes rapidas">
      {stripeUrl ? (
        <a className="btn" href={stripeUrl} target="_blank" rel="noreferrer">
          Comprar agora
        </a>
      ) : (
        <a className="btn" href={whatsappUrl} target="_blank" rel="noreferrer">
          Chamar no WhatsApp
        </a>
      )}
      <a className="btn btn-ghost" href={whatsappUrl} target="_blank" rel="noreferrer">
        Falar com a Claudeth
      </a>
    </div>
  );
}
