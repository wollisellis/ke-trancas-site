'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/site/ProductCard';
import { CMSProduct } from '@/types/cms';

type CatalogClientProps = {
  products: CMSProduct[];
};

export default function CatalogClient({ products }: CatalogClientProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [hairType, setHairType] = useState('all');
  const [brand, setBrand] = useState('all');

  const categories = useMemo(() => ['all', ...new Set(products.map((p) => p.category))], [products]);
  const hairTypes = useMemo(() => ['all', ...new Set(products.map((p) => p.hairType))], [products]);
  const brands = useMemo(() => ['all', ...new Set(products.map((p) => p.brand))], [products]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      const byQuery = q.length === 0 || [p.name, p.description, p.benefit, ...(p.tags ?? [])].join(' ').toLowerCase().includes(q);
      const byCategory = category === 'all' || p.category === category;
      const byHairType = hairType === 'all' || p.hairType === hairType;
      const byBrand = brand === 'all' || p.brand === brand;
      return byQuery && byCategory && byHairType && byBrand;
    });
  }, [products, query, category, hairType, brand]);

  return (
    <section className="catalog-wrapper">
      <div className="filters card">
        <input
          placeholder="Buscar por nome, beneficio ou tag"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="input"
        />

        <div className="filter-grid">
          <select className="input" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>{item === 'all' ? 'Todas categorias' : item}</option>
            ))}
          </select>

          <select className="input" value={hairType} onChange={(event) => setHairType(event.target.value)}>
            {hairTypes.map((item) => (
              <option key={item} value={item}>{item === 'all' ? 'Todos tipos de cabelo' : item}</option>
            ))}
          </select>

          <select className="input" value={brand} onChange={(event) => setBrand(event.target.value)}>
            {brands.map((item) => (
              <option key={item} value={item}>{item === 'all' ? 'Todas marcas' : item}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="muted">{filtered.length} itens encontrados.</p>

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}