# Ke Trancas - Site profissional com autonomia de gestao

Projeto Next.js para operacao comercial da Ke Trancas com foco em:
- catalogo com filtros;
- produtos com prova social;
- secao de videos de cuidado;
- informacoes claras de pagamento/frete/troca;
- painel admin com CRUD para editar o conteudo sem mexer em codigo.

## Rotas principais
- `/` Home comercial
- `/catalogo` Catalogo com filtros
- `/produto/[slug]` Pagina de produto
- `/admin` Painel de gestao (CRUD)

## Como rodar
```bash
npm install
npm run dev -- --hostname 0.0.0.0 --port 3005
```

## Painel admin
1. Abra `/admin`
2. Informe token admin
3. Edite produtos, videos, avaliacoes e configuracoes
4. Clique em **Salvar tudo**

### Token
- Se `ADMIN_TOKEN` estiver configurado no ambiente, use esse valor.
- Sem variavel definida, token padrao de desenvolvimento: `ke-admin-local`

## Persistencia
Os dados ficam em `data/cms.json` no proprio servidor da VM.