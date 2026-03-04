type MobileCtaBarProps = {
  whatsappUrl: string;
  slug?: string;
};

export function MobileCtaBar({ whatsappUrl, slug }: MobileCtaBarProps) {
  return (
    <div className="mobile-cta-bar" role="region" aria-label="Acoes rapidas">
      {slug ? (
        <a className="btn" href={`/comprar/${slug}`}>
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
