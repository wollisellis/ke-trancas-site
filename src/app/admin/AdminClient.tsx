'use client';

import { useEffect, useMemo, useState } from 'react';
import { slugify } from '@/lib/format';
import { CMSData, CMSProduct, CMSReason, CMSReview, CMSVideo } from '@/types/cms';

const emptyCMS: CMSData = {
  settings: {
    brandName: '',
    heroTitle: '',
    heroSubtitle: '',
    whatsappUrl: '',
    instagramUrl: '',
    supportText: '',
    trustItems: [],
    paymentItems: [],
    reasons: [],
    categoryImages: [],
    hairTypeGuide: [],
    promoMessages: ['', '']
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
    images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'],
    rating: 5,
    reviewCount: 0,
    isFeatured: false,
    isBestSeller: false,
    inStock: true,
    tags: [],
    howToUse: [],
    buyOnline: false
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

function createReason(): CMSReason {
  return { icon: '✓', title: 'Novo motivo', text: 'Descreva o diferencial aqui.' };
}

export default function AdminClient() {
  const [cms, setCms] = useState<CMSData>(emptyCMS);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

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

  function moveProduct(from: number, to: number) {
    if (from === to) return;
    setCms((prev) => {
      const products = [...prev.products];
      const [moved] = products.splice(from, 1);
      products.splice(to, 0, moved);
      return { ...prev, products };
    });
    setDragIdx(null);
    setDragOverIdx(null);
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
          <div>
            <label className="label">Instagram URL</label>
            <input className="input" value={cms.settings.instagramUrl} onChange={(event) => setCms((prev) => ({ ...prev, settings: { ...prev.settings, instagramUrl: event.target.value } }))} />
          </div>
          <div>
            <label className="label">Texto de suporte</label>
            <input className="input" value={cms.settings.supportText} onChange={(event) => setCms((prev) => ({ ...prev, settings: { ...prev.settings, supportText: event.target.value } }))} />
          </div>
        </div>

        <div className="admin-grid-2">
          <div>
            <label className="label">Faixa do topo — mensagem 1</label>
            <input className="input" value={cms.settings.promoMessages?.[0] ?? ''} onChange={(event) => setCms((prev) => ({ ...prev, settings: { ...prev.settings, promoMessages: [event.target.value, prev.settings.promoMessages?.[1] ?? ''] } }))} placeholder="Ex.: Frete calculado no checkout" />
          </div>
          <div>
            <label className="label">Faixa do topo — mensagem 2</label>
            <input className="input" value={cms.settings.promoMessages?.[1] ?? ''} onChange={(event) => setCms((prev) => ({ ...prev, settings: { ...prev.settings, promoMessages: [prev.settings.promoMessages?.[0] ?? '', event.target.value] } }))} placeholder="Ex.: Atendimento rápido no WhatsApp" />
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
          <article
            key={product.id}
            className={`admin-product card${dragOverIdx === index && dragIdx !== index ? ' drag-over' : ''}`}
            draggable
            onDragStart={() => setDragIdx(index)}
            onDragOver={(e) => { e.preventDefault(); setDragOverIdx(index); }}
            onDrop={() => dragIdx !== null && moveProduct(dragIdx, index)}
            onDragEnd={() => { setDragIdx(null); setDragOverIdx(null); }}
            style={{ opacity: dragIdx === index ? 0.45 : 1, transition: 'opacity 0.15s' }}
          >
            <div className="admin-head-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span title="Arraste para reordenar" style={{ cursor: 'grab', fontSize: '1.3rem', color: 'var(--muted)', lineHeight: 1, userSelect: 'none' }}>⠿</span>
                <strong>#{index + 1} — {product.name}</strong>
              </div>
              <button className="btn btn-danger btn-small" onClick={() => setCms((prev) => ({ ...prev, products: prev.products.filter((item) => item.id !== product.id) }))}>Excluir</button>
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

            <label className="label">Fotos do produto</label>
            <p className="muted" style={{ fontSize: '0.75rem', margin: '-4px 0 8px' }}>A primeira foto e a capa. Arraste para reordenar. Cole URLs de imagem (Unsplash, Google Drive etc).</p>
            <div className="admin-image-list">
              {(product.images ?? []).map((url, imgIdx) => (
                <div
                  key={imgIdx}
                  className="admin-image-item"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('imgIdx', String(imgIdx))}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const from = Number(e.dataTransfer.getData('imgIdx'));
                    if (from === imgIdx) return;
                    setCms((prev) => ({
                      ...prev,
                      products: prev.products.map((item) => {
                        if (item.id !== product.id) return item;
                        const imgs = [...item.images];
                        const [moved] = imgs.splice(from, 1);
                        imgs.splice(imgIdx, 0, moved);
                        return { ...item, images: imgs };
                      })
                    }));
                  }}
                >
                  <span style={{ cursor: 'grab', color: 'var(--muted)', fontSize: '1.1rem', userSelect: 'none' }}>⠿</span>
                  {url && <img src={url} alt="preview" style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--line)', flexShrink: 0 }} />}
                  {imgIdx === 0 && <span style={{ fontSize: '0.65rem', fontWeight: 700, background: 'var(--brand)', color: '#fff', borderRadius: 999, padding: '2px 7px' }}>CAPA</span>}
                  <input
                    className="input"
                    style={{ flex: 1, minWidth: 0 }}
                    value={url}
                    placeholder="https://..."
                    onChange={(e) => setCms((prev) => ({
                      ...prev,
                      products: prev.products.map((item) => {
                        if (item.id !== product.id) return item;
                        const imgs = [...item.images];
                        imgs[imgIdx] = e.target.value;
                        return { ...item, images: imgs };
                      })
                    }))}
                  />
                  <button
                    className="btn btn-danger btn-small"
                    style={{ flexShrink: 0 }}
                    onClick={() => setCms((prev) => ({
                      ...prev,
                      products: prev.products.map((item) =>
                        item.id !== product.id ? item : { ...item, images: item.images.filter((_, i) => i !== imgIdx) }
                      )
                    }))}
                  >✕</button>
                </div>
              ))}
            </div>
            <button
              className="btn btn-ghost btn-small"
              style={{ marginTop: 8 }}
              onClick={() => setCms((prev) => ({
                ...prev,
                products: prev.products.map((item) =>
                  item.id !== product.id ? item : { ...item, images: [...item.images, ''] }
                )
              }))}
            >+ Adicionar foto</button>

            <label className="label">Tags (separadas por virgula)</label>
            <input className="input" value={product.tags.join(', ')} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) } : item) }))} />

            <label className="label">Como usar (1 passo por linha)</label>
            <textarea className="input" rows={4} value={(product.howToUse ?? []).join('\n')} placeholder="Ex.: Aplique nas tranças secas&#10;Massageie levemente&#10;Aguarde 5 minutos" onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, howToUse: event.target.value.split('\n').map((s) => s.trim()).filter(Boolean) } : item) }))} />

            <div className="check-row">
              <label><input type="checkbox" checked={product.inStock} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, inStock: event.target.checked } : item) }))} />Em estoque</label>
              <label><input type="checkbox" checked={product.isFeatured} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, isFeatured: event.target.checked } : item) }))} />Destaque</label>
              <label><input type="checkbox" checked={product.isBestSeller} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, isBestSeller: event.target.checked } : item) }))} />Mais vendido</label>
              <label><input type="checkbox" checked={product.buyOnline ?? false} onChange={(event) => setCms((prev) => ({ ...prev, products: prev.products.map((item) => item.id === product.id ? { ...item, buyOnline: event.target.checked } : item) }))} />💳 Vender online (Stripe)</label>
            </div>
            {product.buyOnline && (
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', margin: '4px 0 0', background: 'var(--brand-soft)', padding: '6px 10px', borderRadius: 8 }}>
                ✅ Botao &ldquo;Comprar agora&rdquo; ativado. A API do Stripe deve estar configurada nas variaveis de ambiente do Vercel.
              </p>
            )}
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

      <section className="card admin-section">
        <div className="admin-head-row">
          <h2>Motivos para comprar</h2>
          <button className="btn" onClick={() => setCms((prev) => ({ ...prev, settings: { ...prev.settings, reasons: [createReason(), ...(prev.settings.reasons ?? [])] } }))}>+ Novo motivo</button>
        </div>
        <p className="muted" style={{ marginBottom: 12 }}>Esses cards aparecem na secao &ldquo;Por que comprar aqui?&rdquo; da pagina inicial.</p>

        {(cms.settings.reasons ?? []).map((reason, index) => (
          <article key={index} className="card admin-item-row">
            <div className="admin-grid-4">
              <div>
                <label className="label">Icone (emoji)</label>
                <input className="input" value={reason.icon} onChange={(event) => setCms((prev) => ({ ...prev, settings: { ...prev.settings, reasons: prev.settings.reasons.map((item, i) => i === index ? { ...item, icon: event.target.value } : item) } }))} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label className="label">Titulo</label>
                <input className="input" value={reason.title} onChange={(event) => setCms((prev) => ({ ...prev, settings: { ...prev.settings, reasons: prev.settings.reasons.map((item, i) => i === index ? { ...item, title: event.target.value } : item) } }))} />
              </div>
              <div>
                <button className="btn btn-danger" style={{ marginTop: 22 }} onClick={() => setCms((prev) => ({ ...prev, settings: { ...prev.settings, reasons: prev.settings.reasons.filter((_, i) => i !== index) } }))}>Excluir</button>
              </div>
            </div>
            <label className="label">Descricao</label>
            <textarea className="input" value={reason.text} onChange={(event) => setCms((prev) => ({ ...prev, settings: { ...prev.settings, reasons: prev.settings.reasons.map((item, i) => i === index ? { ...item, text: event.target.value } : item) } }))} />
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