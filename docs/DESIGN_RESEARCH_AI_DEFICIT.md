# Solucoes de comunidade para evitar design generico de IA

Data: 24/02/2026

## Sintese pratica (foruns)

1. Tratar IA como implementadora, nao diretora de arte.
- Fonte: Reddit (SaaSDevelopers, 16/02/2026)
- URL: https://www.reddit.com/r/SaasDevelopers/comments/1r5zwro/aigenerated_websites_always_look_generic_how_do/

2. Definir um sistema visual fechado antes de gerar telas (tipografia, escala, borda, espacamento, cores).
- Fonte: Reddit (vibecoding, 16/02/2026)
- URL: https://www.reddit.com/r/vibecoding/comments/1r5zx6j/aigenerated_websites_always_look_generic_how_do/

3. Gerar por secao (hero, produto, prova social, CTA) ao inves de pedir pagina completa de uma vez.
- Fonte: Reddit (ClaudeCode, 16/02/2026)
- URL: https://www.reddit.com/r/ClaudeCode/comments/1r5zy5n/aigenerated_websites_always_look_generic_how_do/

4. Usar referencias explicitas de layout/hierarquia e prender o gerador nessas regras.
- Fonte: Reddit (SaaSDevelopers, 16/02/2026)
- URL: https://www.reddit.com/r/SaasDevelopers/comments/1r5zwro/aigenerated_websites_always_look_generic_how_do/

5. Combinar criatividade humana com IA e workflows de design com restricoes.
- Fonte: Canvil (arXiv 2024)
- URL: https://arxiv.org/abs/2401.09051

## Decisoes aplicadas no site Ke Trancas

- Direcao de arte forte: tipografia editorial + visual warm premium.
- Mobile-first real: base em celular, breakpoints so com min-width.
- Layout em blocos: hero editorial, objetivos, mais vendidos, bento de rotina, videos, prova social, CTA final.
- Componentes consistentes: cards, chips, botoes, hierarquia de texto e espaco.
- Autonomia operacional: painel /admin com CRUD persistente em data/cms.json.
- Protecao de edicao: API /api/cms com token admin.

## Proximo nivel recomendado

- Biblioteca de secoes aprovada pela marca (8 a 12 blocos) para manter qualidade constante.
- Checklist de arte para toda entrega (hero, contraste, ritmo vertical, prova social, CTA, mobile thumb-zone).
- Teste quinzenal em 3 larguras reais: 390px, 768px e 1280px.
