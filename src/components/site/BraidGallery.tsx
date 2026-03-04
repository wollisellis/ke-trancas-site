const SECTIONS = [
  {
    id: 'box-braids',
    title: 'Box Braids',
    subtitle: 'O estilo mais pedido — clássico, versátil e cheio de personalidade.',
    photos: [
      { src: '/images/instagram/ig-DU6mMcqga1Q.jpg', label: 'Box Braids', href: 'https://www.instagram.com/p/DU6mMcqga1Q/' },
      { src: '/images/instagram/ig-DUl3ueygcSy.jpg', label: 'Resultado real', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-C96aMb1tYjn.jpg', label: 'Box Braids compridas', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-C8M4L49NwcY.jpg', label: 'Box Braids ao ar livre', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-DB9FkB-Rkxl.jpg', label: 'Formatura com Box Braids', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-DAtQ_3bRO1j.jpg', label: 'Resultado especial', href: 'https://www.instagram.com/ketrancass/' },
    ],
  },
  {
    id: 'nago-cornrows',
    title: 'Nagô & Cornrows',
    subtitle: 'Traçados precisos que valorizam o formato do rosto.',
    photos: [
      { src: '/images/instagram/ig-DOJSuQnjtcA.jpg', label: 'Cornrows', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-DC9j3RaRiN7.jpg', label: 'Desenho em cornrow', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-C-tKI8mxShC.jpg', label: 'Traçado detalhado', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-C7PFE4KNN85.jpg', label: 'Nagô limpo', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-C8aZvddPjSc.jpg', label: 'Resultado Nagô', href: 'https://www.instagram.com/ketrancass/' },
    ],
  },
  {
    id: 'boho-twist',
    title: 'Boho Braids & Twist',
    subtitle: 'Leveza e movimento para quem busca um visual natural e despojado.',
    photos: [
      { src: '/images/instagram/ig-C9LR8IuPEne.jpg', label: 'Boho Braids', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-DBB4HWBt3Qr.jpg', label: 'Twist braids', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-C_dceQQtroc.jpg', label: 'Resultado real', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-C5mGONGvs2S.jpg', label: 'Twist braids naturais', href: 'https://www.instagram.com/ketrancass/' },
    ],
  },
  {
    id: 'clientes',
    title: 'Clientes Felizes',
    subtitle: 'Cada cliente sai com a autoestima lá em cima.',
    photos: [
      { src: '/images/instagram/ig-DUvip3bkTom.jpg', label: 'Cliente satisfeita', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-C7kRK-RtIeK.jpg', label: 'Resultado incrível', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-C4_e4R3v9Uw.jpg', label: 'Mais uma cliente feliz', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-C_imGBhNMay.jpg', label: 'Box Braids longas', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-DM6GPltxuE9.jpg', label: 'Nagô masculino', href: 'https://www.instagram.com/ketrancass/' },
      { src: '/images/instagram/ig-DMyNb9GRJeU.jpg', label: 'Infantil', href: 'https://www.instagram.com/ketrancass/' },
    ],
  },
];

export function BraidGallery() {
  return (
    <div className="braid-gallery-wrapper">
      {SECTIONS.map((section) => (
        <section key={section.id} className="braid-gallery-section container">
          <div className="section-head">
            <div>
              <h2>{section.title}</h2>
              <p className="muted">{section.subtitle}</p>
            </div>
            <a
              href="https://www.instagram.com/ketrancass/"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Ver mais no Instagram
            </a>
          </div>

          <div className="braid-gallery-grid">
            {section.photos.map((photo) => (
              <a
                key={photo.src}
                href={photo.href}
                target="_blank"
                rel="noreferrer"
                className="braid-gallery-item"
              >
                <img src={photo.src} alt={photo.label} loading="lazy" />
                <div className="braid-gallery-overlay">
                  <span className="braid-gallery-label">{photo.label}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
