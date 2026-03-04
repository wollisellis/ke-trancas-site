import Link from 'next/link';
import { formatBRL, starsLabel } from '@/lib/format';
import { CMSProduct } from '@/types/cms';

type ProductCardProps = {
  product: CMSProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const discountPct =
    typeof product.oldPrice === 'number' && product.oldPrice > product.price
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : null;

  const installmentValue = product.price >= 50 ? Math.ceil(product.price / 6) : null;

  return (
    <Link href={'/produto/' + product.slug} className="product-card">
      <div className="product-media-wrap">
        <img src={product.imageUrl} alt={product.name} className="product-image" loading="lazy" />

        {discountPct ? <span className="product-discount-badge">-{discountPct}%</span> : null}

        {product.isBestSeller && !discountPct ? (
          <span className="product-bestseller-badge">Mais vendido</span>
        ) : null}

        {!product.inStock ? (
          <div className="product-outofstock-overlay">Sem estoque</div>
        ) : null}
      </div>

      <div className="product-body">
        <p className="product-category-label">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>

        <p className="rating" aria-label={starsLabel(product.rating)}>
          {'★'.repeat(Math.round(product.rating))}
          <span className="rating-count"> ({product.reviewCount})</span>
        </p>

        <div className="price-row">
          <strong className="price-main">{formatBRL(product.price)}</strong>
          {typeof product.oldPrice === 'number' ? (
            <span className="price-old">{formatBRL(product.oldPrice)}</span>
          ) : null}
        </div>

        {installmentValue ? (
          <p className="price-installment">ou 6x de {formatBRL(installmentValue)}</p>
        ) : null}
      </div>
    </Link>
  );
}
