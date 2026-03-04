import { CMSCategoryImage } from '@/types/cms';

type CategoryDividerProps = {
  categoryImages: CMSCategoryImage[];
};

export function CategoryDivider({ categoryImages }: CategoryDividerProps) {
  if (!categoryImages || categoryImages.length === 0) return null;

  return (
    <section className="container section-space">
      <div className="section-head">
        <h2>Trabalhos da Claudeth</h2>
      </div>
      <div className="cat-divider-grid">
        {categoryImages.map((item, i) => (
          <a
            key={i}
            href="/trancas"
            className="cat-divider-card"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          >
            <div className="cat-divider-overlay" />
            <span className="cat-divider-label">{item.category}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
