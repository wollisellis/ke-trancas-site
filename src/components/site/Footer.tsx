type FooterProps = {
  brandName: string;
  whatsappUrl: string;
  instagramUrl: string;
  supportText: string;
};

export function Footer({ brandName, whatsappUrl, instagramUrl, supportText }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>{brandName}</h3>
          <p>{supportText}</p>
        </div>

        <div>
          <h4>Navegacao</h4>
          <ul>
            <li>
              <a href="/catalogo">Catalogo</a>
            </li>
            <li>
              <a href="/admin">Painel</a>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contato</h4>
          <ul>
            <li>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={instagramUrl} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
