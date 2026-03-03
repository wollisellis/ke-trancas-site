# SPEC.md — Ke Tranças Site
## Guia completo de desenvolvimento para Claude + Éllis

Gerado em: 2026-03-03
Stack: Next.js 14 (App Router) + TypeScript + CSS puro (sem Tailwind)
CMS: file-based em data/cms.json (sem banco de dados)

---

## 1. O QUE JÁ EXISTE (não reescrever)

### Estrutura e infra
- [x] next.config.ts — configuração básica Next.js
- [x] tsconfig.json — TypeScript configurado
- [x] src/app/layout.tsx — Fonts: Playfair Display (headings) + Sora (body)
- [x] src/app/globals.css — Sistema de design completo (CSS variables, card, btn, chip, container)
- [x] src/types/cms.ts — Tipos: CMSProduct, CMSVideo, CMSReview, CMSSettings, CMSData
- [x] src/lib/cms-store.ts — readCMS() e writeCMS() (lê/escreve data/cms.json)
- [x] src/lib/format.ts — formatBRL(), starsLabel(), toYoutubeEmbedUrl(), slugify()
- [x] data/cms.json — Dados placeholder (produtos, vídeos, avaliações, settings)

### Componentes prontos
- [x] src/components/site/Header.tsx — Header sticky com promo strip, logo, nav, WhatsApp btn
- [x] src/components/site/Footer.tsx — Footer com links
- [x] src/components/site/MobileCtaBar.tsx — Barra CTA fixada no mobile
- [x] src/components/site/ProductCard.tsx — Card com imagem, badge, preço, rating

### Páginas prontas
- [x] src/app/page.tsx — Home: hero + categorias + bestsellers + bento + vídeos + avaliações + CTA final
- [x] src/app/catalogo/page.tsx + CatalogClient.tsx — Catálogo com filtros (busca, categoria, tipo de cabelo, marca)
- [x] src/app/produto/[slug]/page.tsx — Página de produto com detalhes + avaliações
- [x] src/app/admin/page.tsx + AdminClient.tsx — Painel admin com CRUD completo
- [x] src/app/api/cms/route.ts — API GET/PUT protegida por ADMIN_TOKEN

---

## 2. BUGS CONHECIDOS (corrigir primeiro)

### BUG-01: Estrelas renderizando como '?' (CRÍTICO)
Arquivo: src/components/site/ProductCard.tsx e src/app/produto/[slug]/page.tsx e src/app/page.tsx
Problema: O caractere de estrela (★) foi corrompido para '?' em algum momento
Fix: Substituir '?'.repeat(rating) por '\u2605'.repeat(Math.round(product.rating)) em TODOS os arquivos
Onde buscar: ProductCard.tsx, produto/[slug]/page.tsx, page.tsx (reviews da home)

### BUG-02: WhatsApp e Instagram URLs são placeholder
Arquivo: data/cms.json
Dados a confirmar com a Tanika:
  - WhatsApp real da Ke Tranças: ___________________
  - Instagram real: ___________________

---

## 3. O QUE FALTA CONSTRUIR

### 3A. SEÇÕES NOVAS NA HOME (prioridade máxima)

#### SEÇÃO: Motivos para comprar (referência: Lola Cosmetics)
Onde inserir: Após as avaliações, antes do CTA final
Componente novo: src/components/site/WhyBuySection.tsx
Dados no CMS: Adicionar reasons: [{ icon: string; title: string; text: string }] em CMSSettings
Visual: Grid 2x2 (mobile) ou 4 colunas (desktop) com ícone SVG + título + texto 2 linhas
Exemplos de conteúdo:
  ✓ Produtos testados por quem usa trança
  ✓ Atendimento humano, não robô
  ✓ Frete com prazo real no checkout
  ✓ Troca sem burocracia em até 7 dias

#### SEÇÃO: Guia por tipo de cabelo (referência: Lola Cosmetics)
Onde inserir: Após "Compre por objetivo" (goal-strip), antes de bestsellers
Componente novo: src/components/site/HairTypeGuide.tsx
Visual: Cards clicáveis com nome do tipo + ícone + produto recomendado de exemplo
Tipos sugeridos:
  - Tranças box braid
  - Tranças nagô
  - Cabelo natural 4C
  - Cabelo com química
  - Cabelo fino/fragilizado
Ação do clique: Leva para /catalogo?hairType=[param]

#### SEÇÃO: Bloco comercial final com preço (referência: briefing de áudio da Tanika)
Onde inserir: Logo antes do CTA final, após "Motivos para comprar"
Dados: cms.products.filter(p => p.isBestSeller).slice(0, 4)
Visual: Linha scrollável no mobile, 4 colunas no desktop
Diferença: Preço em destaque maior + badge de desconto percentual calculado (oldPrice vs price)

#### SEÇÃO: Separadores visuais de categoria (referência: briefing áudio Tanika)
Componente novo: src/components/site/CategoryDivider.tsx
Visual: Banner full-width com imagem de fundo escurecida + nome da categoria centralizado
Dados no CMS: Adicionar categoryImages: [{ category: string; imageUrl: string }] em CMSSettings

### 3B. NOVA PÁGINA: Catálogo de Tranças (referência: LeftCosmetics)
Rota: /trancas
Arquivo: src/app/trancas/page.tsx
Propósito: Separar produtos de trança dos cosméticos gerais
Filtro: products.filter(p => p.category === 'Tranças' || p.hairType.includes('Trança'))
Visual diferenciado: Grid editorial com imagens maiores, foco em estilo/referência de trança
Adicionar no Header: Link "Tranças" na nav entre "Catálogo" e "Instagram"

### 3C. MELHORIAS NA PÁGINA DE PRODUTO

#### Avaliações próximas ao produto (referência: iszi.com.br)
Situação atual: Avaliações ficam numa seção separada lá embaixo
Fix: Mostrar mini-preview de 2-3 avaliações logo abaixo do botão "Comprar no WhatsApp"
Componente novo: src/components/site/MiniReviews.tsx

#### Produtos relacionados
Onde: Abaixo das avaliações completas
Lógica: Mesma categoria ou mesmo hairType, excluir produto atual, limite 4
Visual: Reutilizar ProductCard em grid de 4

#### Modo de uso (howToUse)
Dados no CMS: Adicionar howToUse?: string[] em CMSProduct
Visual: Lista numerada com ícone de step
Admin: Campo de textarea para admin editar (uma instrução por linha)

### 3D. FOOTER COMPLETO (referência: DaBelle)
Situação atual: Footer básico
Estrutura desejada em 4 colunas:
  Coluna 1: Logo + tagline + links sociais (Instagram, WhatsApp)
  Coluna 2: Navegação (Home, Catálogo, Tranças)
  Coluna 3: Atendimento (horário, WhatsApp, suporte)
  Coluna 4: Confiança com ícones SVG inline:
    [icone] Pagamento seguro
    [icone] Frete com prazo estimado
    [icone] Troca em 7 dias
    [icone] Suporte humano
Arquivo: Atualizar src/components/site/Footer.tsx

### 3E. SEO POR PÁGINA
Situação atual: Apenas metadata global em layout.tsx
Adicionar generateMetadata() em cada page.tsx:
  - title específico (ex: "Kit Pós-Trança | Ke Tranças")
  - description específica
  - openGraph com título, descrição e imagem do produto

---

## 4. DADOS REAIS A PREENCHER COM TANIKA (antes de publicar)

### Settings em data/cms.json:
  whatsappUrl: https://wa.me/55XXXXXXXXXXX   [PREENCHER COM TANIKA]
  instagramUrl: https://instagram.com/[handle]   [PREENCHER COM TANIKA]
  heroTitle: [slogan real da Ke Tranças]   [PREENCHER COM TANIKA]
  heroSubtitle: [proposta de valor]   [PREENCHER COM TANIKA]
  supportText: [horário de atendimento real]   [PREENCHER COM TANIKA]

### Produtos (mínimo 6 para lançar):
  name: nome real do produto
  brand: marca real (ex: Salon Line, OX, Keramax, Novex, etc.)
  category: Kits | Shampoo | Condicionador | Máscara | Finalizador | Óleo | Espuma | Tranças
  hairType: Tranças box braid | Tranças nagô | Cabelo natural 4C | Cabelo com química | Todos
  benefit: benefício principal em 1 linha
  price: preço real (ex: 49.90)
  oldPrice: preço antigo opcional (ex: 64.90) para mostrar desconto
  imageUrl: URL da foto (pode ser link do Instagram temporariamente)
  isBestSeller: true para os top 6 mais vendidos
  isFeatured: true para 2-3 produtos que vão no hero

### Vídeos (mínimo 2):
  Links reais de YouTube da Ke Tranças (cuidados, tutoriais, rotinas de trança)

### Avaliações (mínimo 8):
  Depoimentos reais de clientes (nome, texto, nota 1-5)
  Podem ser prints de WhatsApp/Instagram transcritos

---

## 5. ORDEM DE DESENVOLVIMENTO RECOMENDADA

Sprint 1 — Correções e base (1-2h):
  1. Corrigir BUG-01 (estrelas '?')
  2. Atualizar Footer com 4 colunas + ícones de confiança
  3. Adicionar seção "Motivos para comprar" na home

Sprint 2 — Fluxo de home completo (2-3h):
  4. Guia por tipo de cabelo
  5. Separadores visuais de categoria
  6. Bloco comercial final com preço

Sprint 3 — Página de produto melhorada (1-2h):
  7. Mini avaliações próximas ao produto
  8. Produtos relacionados
  9. Campo modo de uso no CMS + admin

Sprint 4 — Página de Tranças + SEO (1-2h):
  10. Rota /trancas com catálogo separado
  11. Link "Tranças" no Header
  12. SEO metadata por página

Sprint 5 — Dados reais + publicação:
  13. Preencher dados reais com Tanika no painel admin
  14. Testar mobile em dispositivo real
  15. Deploy

---

## 6. COMO RODAR LOCALMENTE

  # Clone do GitHub
  git clone https://github.com/[usuario]/ke-trancas-site.git
  cd ke-trancas-site
  npm install
  echo "ADMIN_TOKEN=ke-admin-local" > .env.local
  npm run dev

  Acessar:
    http://localhost:3000         -> Site completo
    http://localhost:3000/admin   -> Painel admin (senha: ke-admin-local)
    http://localhost:3000/catalogo -> Catálogo com filtros

---

## 7. DEPLOY

Opção A — Vercel (recomendado para MVP):
  npm install -g vercel && vercel login && vercel --prod
  ATENCAO: CMS file-based nao persiste na Vercel (filesystem read-only)
  Solucao: Usar Vercel KV (free) para substituir writeCMS() OU hostear na VM

Opção B — VM Faraday (mais simples):
  npm run build
  npm start -- --port 3005
  Configurar nginx ou usar o IP da VM diretamente

---

## 8. REFERÊNCIAS VISUAIS (briefing Tanika: WhatsApp 23/02 + áudio 03/03)

  TriHair (trihair.com.br)              -> BASE PRINCIPAL (estrutura geral)
  DaBelle (dabelle.com.br)              -> Rodapé com pagamento/confiança e ícones
  Lola Cosmetics (lolacosmetics.com.br) -> Motivos para comprar + guia por tipo de cabelo
  LeftCosmetics (leftcosmeticos.com.br) -> Catálogo separado de tranças
  iszi.com.br                           -> Avaliações próximas ao produto
  Arvensi (arvensiscosmeticos.com.br)   -> Grid de mais vendidos com benefício na imagem
  Mundo do Cabeleireiro                 -> Separação visual por marcas/categorias
