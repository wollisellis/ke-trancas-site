import { CMSHairTypeGuide } from '@/types/cms';

type HairTypeGuideProps = {
  items: CMSHairTypeGuide[];
};

export function HairTypeGuide({ items }: HairTypeGuideProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="container section-space">
      <div className="section-head">
        <h2>Para cada cabelo, o produto certo</h2>
        <p className="muted">Selecione seu tipo de cabelo e veja o que a Claudeth recomenda.</p>
      </div>
      <div className="hairtype-grid">
        {items.map((item, i) => (
          <a
            key={i}
            href={`/catalogo?hairType=${encodeURIComponent(item.type)}`}
            className="hairtype-card"
          >
            <span className="hairtype-icon">{item.icon}</span>
            <strong>{item.type}</strong>
            <p className="muted">{item.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
