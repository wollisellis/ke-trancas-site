# RESUMO CONBRAN 2026 - VERSÃO FINAL (PARA SUBMISSÃO)

> [!TIP]
> **VERSÃO COMPACTA PARA O SITE:**
> Os tópicos (INTRODUÇÃO, MÉTODOS...) estão na mesma linha do texto para economizar espaço e reduzir quebras de linha, mantendo a estrutura exigida.

```text
INTRODUÇÃO: A nutrição clínica está passando por uma mudança de paradigma com a chegada de sistemas de Inteligência Artificial (IA) capazes de "conversar" com usuários e gerar recomendações dietéticas personalizadas. Esses sistemas, chamados Modelos de Linguagem de Grande Escala (LLMs) — como os da família GPT e Gemini — prometem ampliar o acesso à orientação nutricional e auxiliar profissionais em tarefas complexas. Contudo, a literatura científica ainda apresenta resultados contraditórios sobre a segurança e a confiabilidade dessas ferramentas em cenários clínicos reais. Diante da rápida adoção dessas tecnologias por profissionais e pacientes, torna-se urgente sintetizar a evidência disponível para orientar decisões clínicas responsáveis. O objetivo deste estudo foi mapear o desempenho quantitativo, os modos de falha de segurança e os desfechos de implementação de LLMs em nutrição clínica.

MÉTODOS: Conduzimos uma revisão de escopo conforme as diretrizes PRISMA-ScR. Realizamos buscas em seis bases de dados científicas (PubMed, Web of Science, Scopus, IEEE Xplore, ACM Digital Library e Google Scholar) para o período de janeiro/2020 a dezembro/2025. Foram incluídas 53 fontes com dados quantitativos sobre IA aplicada à nutrição humana. A análise foi organizada em quatro eixos: (1) avaliação de desempenho em testes padronizados; (2) precisão em cálculos nutricionais; (3) falhas de segurança; e (4) resultados em estudos clínicos com pacientes.

RESULTADOS: Desempenho em testes teóricos: Os modelos mais avançados avaliados no período do estudo (ex: GPT-4o com técnicas de raciocínio em cadeia) atingiram até 95% de acerto em questões de exames de certificação para nutricionistas, superando a taxa média de aprovação humana na primeira tentativa (62%). Desempenho em casos clínicos complexos: Quando testados em cenários com múltiplas doenças simultâneas (ex: diabetes + doença renal + obesidade), a taxa de acerto de todos os chatbots caiu para menos de 50%, demonstrando dificuldade em lidar com a complexidade clínica real. Avaliação dietética: Sistemas baseados em imagem apresentaram subestimação sistemática do tamanho das porções, elevando o risco de prescrição inadequada de energia e proteínas em pacientes vulneráveis. Sistemas híbridos: Ferramentas que combinam IA com bancos de dados de diretrizes oficiais (chamados sistemas RAG) obtiveram resultados superiores, com 80-92% de adesão às recomendações clínicas. Vulnerabilidades de segurança: Sob testes rigorosos, as taxas de "alucinação" (respostas inventadas ou incorretas) variaram de 50-82%. Foram documentados casos de citações bibliográficas fabricadas e erros graves em recomendações para pacientes alérgicos. Estudos clínicos: O ensaio randomizado mais longo identificado (48 semanas) mostrou que sistemas combinando IA + supervisão profissional foram superiores à IA isolada. Evidência emergente de 2025 inclui o primeiro ensaio de 12 meses demonstrando não-inferioridade de intervenção guiada por IA versus acompanhamento por nutricionista.

CONCLUSÃO: A evidência atual não suporta o uso autônomo de LLMs em terapia nutricional. As vulnerabilidades de segurança documentadas (alucinações, erros com alérgenos, citações fabricadas) exigem implementação exclusivamente como suporte à decisão sob supervisão profissional ("human-in-the-loop"). Para avançar de viabilidade a adoção clínica segura, são prioritários: (1) benchmarks públicos específicos de nutrição; (2) ensaios de não-inferioridade de longo prazo com endpoints clínicos objetivos; e (3) avaliação da equidade entre idiomas e padrões alimentares culturais.
```

---

## OUTROS DADOS

**TÍTULO:** Inteligência artificial e modelos de linguagem de grande escala em nutrição clínica: uma revisão de escopo sobre desempenho, segurança e implementação
**TEMA:** EIXO 3 - Nutrição Clínica
**PALAVRAS-CHAVE:** Inteligência Artificial; Grandes Modelos de Linguagem; Nutrição Clínica; Segurança do Paciente; Saúde Digital.
**COMITÊ DE ÉTICA:** Não se aplica (Justificativa: Revisão de literatura / Resolução CNS nº 510/2016)

**AUTORES:**

1. Ellis Wollis Malta Abhulime*
2. Vicente Rossi Mônaco
3. Rafael Delgado de Melo
4. Fabiana Braga Benatti
5. Diogo Thimoteo da Cunha
