'use client';

import { useEffect, useMemo, useState } from 'react';
import { slugify } from '@/lib/format';
import { CMSData, CMSProduct, CMSReview, CMSVideo } from '@/types/cms';

const emptyCMS: CMSData = {
  settings: {
    brandName: '',
    heroTitle: '',
    heroSubtitle: '',
    whatsappUrl: '',
    instagramUrl: '',
    supportText: '',
    trustItems: [],
    paymentItems: []
  },
  products: [],
  videos: [],
  reviews: []
};

function createProduct(): CMSProduct {
  const id = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}`;
  return {
    id,
    slug: `produto-${id.slice(0, 8)}`,
    name: 'Novo produto',
    description: 'Descreva o produto aqui.',
    category: 'Categoria',
    hairType: 'Todos os tipos',
    brand: 'Ke Trancas',
    benefit: 'Beneficio principal',
    price: 0,
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    rating: 5,
    reviewCount: 0,
    isFeatured: false,
    isBestSeller: false,
    inStock: true,
    tags: []
  };
}

function createVideo(): CMSVideo {
  const id = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}`;
  return { id, title: 'Novo video', url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', description: 'Resumo do conteudo.' };
}

function createReview(): CMSReview {
  const id = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}`;
  return { id, author: 'Cliente', text: 'Depoimento novo.', rating: 5 };
}

export default function AdminClient() {
  const [cms, setCms] = useState<CMSData>(emptyCMS);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem('ke_admin_token') ?? '';
    setToken(stored);

    fetch('/api/cms')
      .then((response) => response.json())
      .then((data) => setCms(data))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(
    () => ({ products: cms.products.length, videos: cms.videos.length, reviews: cms.reviews.length }),
    [cms]
  );

  function setTrustItems(value: string) {
    setCms((prev) => ({
      ...prev,
      settings: { ...prev.settings, trustItems: value.split('\n').map((item) => item.trim()).filter(Boolean) }
    }));
  }

  function setPaymentItems(value: string) {
    setCms((prev) => ({
      ...prev,
      settings: { ...prev.settings, paymentItems: value.split('\n').map((item) => item.trim()).filter(Boolean) }
    }));
  }

  async function saveCMS() {
    setSaving(true);
    setMessage('');
    window.localStorage.setItem('ke_admin_token', token);

    const response = await fetch('/api/cms', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': token
      },
      body: JSON.stringify(cms)
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setMessage(payload?.error ?? 'Falha ao salvar.');
      setSaving(false);
      return;
    }

    setMessage('Salvo com sucesso.');
    setSaving(false);
  }

  if (loading) return <p className="muted">Carregando painel...</p>;

  return (
    <div className="admin-shell">
      <section className="card admin-top">
        <div>
          <h1>Painel Ke Trancas</h1>
          <p className="muted">Edite conteudo, produtos, videos e avaliacoes sem mexer em codigo.</p>
        </div>
        <div className="stats-row">
          <span className="chip">{stats.products} produtos</span>
          <span className="chip">{stats.videos} videos</span>
          <span className="chip">{stats.reviews} avaliacoes</span>
        </div>
      </section>

      <section className="card admin-auth">
        <label className="label">Token admin</label>
        <input className="input" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Ex.: ke-admin-local" />
      </section>

      <section className="card admin-section">
        <h2>Configuracoes principais</h2>
        <div className="admin-grid-2">
          <div>
            <label className="label">Nome da marca</label>
            <input className="input" value={cms.settings.brandName} onChange={(event) => setCms((prev) => ({ ...prev, settings: { ...prev.settings, brandName: event.target.value } }))} />
          </div>
          <div>
            <label className="label">WhatsApp URL</label>
            <input className="input" value={cms.settings.whatsappUrl} onChange={(event) => setCms((prev) => ({ ...prev, settings: { ...prev.settings, whatsappUrl: event.target.value } }))} />
          </div>
        </div>

        <label className="label">Titulo principal</label>
        <input className="input" value={cms.settings.heroTitle} onChange={(event) => setCms((prev) => ({ ...prev, settings: { ...prev.settings, heroTitle: event.target.value } }))} />

        <label className="label">Subtitulo</label>
        <textarea className="input" value={cms.settings.heroSubtitle} onChange={(event) => setCms((prev) => ({ ...prev, settings: { ...prev.settings, heroSubtitle: event.target.value } }))} />

        <div className="admin-grid-2">
          <div>
            <label className="label">Itens de confianca (1 por linha)</label>
            <textarea className="input" value={cms.settings.trustItems.join('\n')} onChange={(event) => setTrustItems(event.target.value)} />
          </div>
          <div>
            <label className="label">Itens de pagamento (1 por linha)</label>
            <textarea className="input" value={cms.settings.paymentItems.join('\n')} onChange={(event) => setPaymentItems(event.target.value)} />
          </div>
        </div>
      </section>

      <section className="card admin-section">
        <div className="admin-head-row">
          <h2>Produtos</h2>
          <button className="btn" onClick={() => setCms((prev) => ({ ...prev, products: [createProduct(), ...prev.products] }))}>+ Novo produto</button>
        </div>

        {cms.products.map((product, index) => (
          <article key={product.id} className="admin-product card">
            <div className="admin-head-row">
              <strong>Produto #{index + 1}</strong>
              <button className="btn btn-danger" onClick={() => setCms((prev) => ({ ...prev, products: prev.products.filter((item) => item.id !== product.id) }))}>Excluir</button>
            </div>

            <div className="admin-grid-2">
              <div>
                <label className="label">Nome</label>
                <input className="input" value={product.name} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, name: event.target.value, slug: item.slug ? item.slug : slugify(event.target.value) } : item) }))} />
              </div>
              <div>
                <label className="label">Slug</label>
                <input className="input" value={product.slug} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, slug: slugify(event.target.value) } : item) }))} />
              </div>
            </div>

            <label className="label">Descricao</label>
            <textarea className="input" value={product.description} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, description: event.target.value } : item) }))} />

            <div className="admin-grid-4">
              {[
                ['Categoria', 'category'],
                ['Tipo de cabelo', 'hairType'],
                ['Marca', 'brand'],
                ['Beneficio', 'benefit']
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="label">{label}</label>
                  <input className="input" value={product[key as keyof CMSProduct] as string} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, [key]: event.target.value } : item) }))} />
                </div>
              ))}
            </div>

            <div className="admin-grid-4">
              <div>
                <label className="label">Preco</label>
                <input className="input" type="number" value={product.price} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, price: Number(event.target.value) } : item) }))} />
              </div>
              <div>
                <label className="label">Preco anterior</label>
                <input className="input" type="number" value={product.oldPrice ?? 0} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, oldPrice: Number(event.target.value) > 0 ? Number(event.target.value) : undefined } : item) }))} />
              </div>
              <div>
                <label className="label">Nota</label>
                <input className="input" type="number" min={0} max={5} step={0.1} value={product.rating} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, rating: Number(event.target.value) } : item) }))} />
              </div>
              <div>
                <label className="label">Qtd. avaliacoes</label>
                <input className="input" type="number" value={product.reviewCount} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, reviewCount: Number(event.target.value) } : item) }))} />
              </div>
            </div>

            <label className="label">URL da imagem</label>
            <input className="input" value={product.imageUrl} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, imageUrl: event.target.value } : item) }))} />

            <label className="label">Tags (separadas por virgula)</label>
            <input className="input" value={product.tags.join(', ')} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) } : item) }))} />

            <div className="check-row">
              <label><input type="checkbox" checked={product.inStock} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, inStock: event.target.checked } : item) }))} />Em estoque</label>
              <label><input type="checkbox" checked={product.isFeatured} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, isFeatured: event.target.checked } : item) }))} />Destaque</label>
              <label><input type="checkbox" checked={product.isBestSeller} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, isBestSeller: event.target.checked } : item) }))} />Mais vendido</label>
            </div>
          </article>
        ))}
      </section>

      <section className="card admin-section">
        <div className="admin-head-row">
          <h2>Videos</h2>
          <button className="btn" onClick={() => setCms((prev) => ({ ...prev, videos: [createVideo(), ...prev.videos] }))}>+ Novo video</button>
        </div>

        {cms.videos.map((video) => (
          <article key={video.id} className="card admin-item-row">
            <input className="input" value={video.title} onChange={(event) => setCms((prev) => ({ ...prev, videos: prev.videos.map((item) => item.id === video.id ? { ...item, title: event.target.value } : item) }))} />
            <input className="input" value={video.url} onChange={(event) => setCms((prev) => ({ ...prev, videos: prev.videos.map((item) => item.id === video.id ? { ...item, url: event.target.value } : item) }))} />
            <textarea className="input" value={video.description} onChange={(event) => setCms((prev) => ({ ...prev, videos: prev.videos.map((item) => item.id === video.id ? { ...item, description: event.target.value } : item) }))} />
            <button className="btn btn-danger" onClick={() => setCms((prev) => ({ ...prev, videos: prev.videos.filter((item) => item.id !== video.id) }))}>Excluir</button>
          </article>
        ))}
      </section>

      <section className="card admin-section">
        <div className="admin-head-row">
          <h2>Avaliacoes</h2>
          <button className="btn" onClick={() => setCms((prev) => ({ ...prev, reviews: [createReview(), ...prev.reviews] }))}>+ Nova avaliacao</button>
        </div>

        {cms.reviews.map((review) => (
          <article key={review.id} className="card admin-item-row">
            <div className="admin-grid-2">
              <input className="input" value={review.author} onChange={(event) => setCms((prev) => ({ ...prev, reviews: prev.reviews.map((item) => item.id === review.id ? { ...item, author: event.target.value } : item) }))} />
              <input className="input" type="number" min={1} max={5} value={review.rating} onChange={(event) => setCms((prev) => ({ ...prev, reviews: prev.reviews.map((item) => item.id === review.id ? { ...item, rating: Number(event.target.value) } : item) }))} />
            </div>
            <textarea className="input" value={review.text} onChange={(event) => setCms((prev) => ({ ...prev, reviews: prev.reviews.map((item) => item.id === review.id ? { ...item, text: event.target.value } : item) }))} />
            <input className="input" value={review.productSlug ?? ''} placeholder="Slug do produto (opcional)" onChange={(event) => setCms((prev) => ({ ...prev, reviews: prev.reviews.map((item) => item.id === review.id ? { ...item, productSlug: event.target.value.trim() ? slugify(event.target.value) : undefined } : item) }))} />
            <button className="btn btn-danger" onClick={() => setCms((prev) => ({ ...prev, reviews: prev.reviews.filter((item) => item.id !== review.id) }))}>Excluir</button>
          </article>
        ))}
      </section>

      <section className="admin-footer-bar">
        <button className="btn" disabled={saving} onClick={saveCMS}>{saving ? 'Salvando...' : 'Salvar tudo'}</button>
        {message ? <p className="muted">{message}</p> : null}
      </section>
    </div>
  );
}