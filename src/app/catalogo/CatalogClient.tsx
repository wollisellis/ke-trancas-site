'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/site/ProductCard';
import { CMSProduct } from '@/types/cms';

type CatalogClientProps = {
  products: CMSProduct[];
};

export default function CatalogClient({ products }: CatalogClientProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') ?? 'all');
  const [hairType, setHairType] = useState(searchParams.get('hairType') ?? 'all');
  const [brand, setBrand] = useState(searchParams.get('brand') ?? 'all');

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
          placeholder="Buscar por nome, benefício ou tag"
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

      <p className="muted">{filtered.length} {filtered.length === 1 ? 'item encontrado' : 'itens encontrados'}.</p>

      {filtered.length === 0 ? (
        <div className="catalog-empty">
          <p>Nenhum produto encontrado com esses filtros.</p>
          <button className="btn btn-ghost" onClick={() => { setQuery(''); setCategory('all'); setHairType('all'); setBrand('all'); }}>
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}