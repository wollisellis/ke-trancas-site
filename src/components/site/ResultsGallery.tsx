const PHOTOS = [
  {
    src: '/images/instagram/ig-DU6mMcqga1Q.jpg',
    label: 'Box Braids',
    href: 'https://www.instagram.com/p/DU6mMcqga1Q/',
  },
  {
    src: '/images/instagram/ig-DUvip3bkTom.jpg',
    label: 'Resultado real',
    href: 'https://www.instagram.com/ketrancass/',
  },
  {
    src: '/images/instagram/ig-DUl3ueygcSy.jpg',
    label: 'Resultado real',
    href: 'https://www.instagram.com/ketrancass/',
  },
  {
    src: '/images/instagram/ig-DTycs4RiQm2.jpg',
    label: 'Estilo Kê Tranças',
    href: 'https://www.instagram.com/ketrancass/',
  },
  {
    src: '/images/instagram/ig-DUEzHb0Dl3T.jpg',
    label: 'Arte em tranças',
    href: 'https://www.instagram.com/ketrancass/',
  },
];

export function ResultsGallery() {
  return (
    <section className="results-gallery-section">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 18 }}>
          <h2>Resultados reais</h2>
          <a
            href="https://www.instagram.com/ketrancass/"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Ver mais no Instagram
          </a>
        </div>

        <div className="results-gallery-grid">
          {PHOTOS.map((photo, index) => (
            <a
              key={photo.src}
              href={photo.href}
              target="_blank"
              rel="noreferrer"
              className={`results-gallery-item${index === 0 ? ' results-gallery-featured' : ''}`}
            >
              <img src={photo.src} alt={photo.label} loading="lazy" />
              <div className="results-gallery-overlay">
                <span className="results-gallery-label">{photo.label}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
