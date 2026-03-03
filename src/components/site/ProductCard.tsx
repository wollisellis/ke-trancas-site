import Link from 'next/link';
import { formatBRL, starsLabel } from '@/lib/format';
import { CMSProduct } from '@/types/cms';

type ProductCardProps = {
  product: CMSProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-media-wrap">
        <Link href={'/produto/' + product.slug}>
          <img src={product.imageUrl} alt={product.name} className="product-image" loading="lazy" />
        </Link>

        <div className="product-flags">
          {product.isBestSeller ? <span className="chip chip-highlight">Mais vendido</span> : null}
          {!product.inStock ? <span className="chip chip-danger">Sem estoque</span> : null}
        </div>
      </div>

      <div className="product-body">
        <p className="kicker">{product.category}</p>
        <h3>
          <Link href={'/produto/' + product.slug}>{product.name}</Link>
        </h3>
        <p className="muted">{product.benefit}</p>

        <p className="rating" aria-label={starsLabel(product.rating)}>
          {'?'.repeat(Math.round(product.rating))}
          <span className="muted"> {product.rating.toFixed(1)} ({product.reviewCount})</span>
        </p>

        <div className="price-row">
          <strong>{formatBRL(product.price)}</strong>
          {typeof product.oldPrice === 'number' ? <span className="price-old">{formatBRL(product.oldPrice)}</span> : null}
        </div>
      </div>
    </article>
  );
}
