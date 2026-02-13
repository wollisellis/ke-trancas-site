# Manuscript (Tradução PT-BR — leitura interna)

**ATENÇÃO:** Esta é uma tradução integral para português brasileiro, apenas para leitura interna entre coautores.
A versão oficial para submissão à EJCN é `EJCN_Submission_Package_SUBMIT/Manuscript_EJCN.docx` (em inglês).

---

# Inteligência Artificial e Modelos de Linguagem de Grande Escala em Nutrição Clínica: uma Revisão de Escopo sobre Desempenho, Segurança e Implementação

**Título resumido:** LLMs em Nutrição Clínica

Ellis Wollis Malta Abhulime\* https://orcid.org/0009-0007-5525-5085, Vicente Rossi Mônaco, Rafael Delgado de Melo, Fabiana Braga Benatti https://orcid.org/0000-0002-8320-7044, Diogo Thimoteo da Cunha https://orcid.org/0000-0001-5928-9265

Laboratório Multidisciplinar em Alimentos e Saúde (LabMAS), Faculdade de Ciências Aplicadas (FCA), Universidade Estadual de Campinas (UNICAMP), Limeira, São Paulo, Brasil

\*Autor correspondente: Ellis Wollis Malta Abhulime, Email: elliswollismalta@gmail.com, Multidisciplinary Laboratory in Food and Health (LabMAS), School of Applied Sciences (FCA), University of Campinas (UNICAMP), Rua Pedro Zaccaria, 1300, 13484-350, Limeira, São Paulo, Brazil

## Resumo

## Resumo

**Contexto/Objetivos:** A Inteligência Artificial (IA), particularmente os Modelos de Linguagem de Grande Escala (LLMs), vem sendo cada vez mais avaliada para tarefas de nutrição clínica, mas a evidência sobre segurança, confiabilidade e efetividade no mundo real permanece fragmentada. Nosso objetivo foi mapear desempenho quantitativo, modos de falha de segurança e desfechos relevantes para implementação de LLMs e sistemas de IA relacionados em nutrição clínica.

**Métodos:** Conduzimos uma revisão de escopo conforme PRISMA-ScR de 53 fontes (2020–2025), cobrindo LLMs e sistemas de IA relacionados em benchmarking de desempenho, precisão nutricional, testes de segurança e implementação clínica.

**Resultados:** Em exames padronizados, os melhores modelos atingiram 91–95% de acurácia; porém, o desempenho frequentemente caiu abaixo de 50% em cenários complexos com múltiplas comorbidades. Em avaliação dietética aplicada, sistemas baseados em imagem apresentaram subestimação sistemática do tamanho das porções, aumentando o risco de prescrição inadequada de energia/proteína em pacientes vulneráveis. Vulnerabilidades de segurança foram frequentes, incluindo citações fabricadas e erros relacionados a alérgenos; sob testes adversariais, taxas de alucinação chegaram a 50–82%. A evidência de desfechos clínicos ainda é limitada: o ensaio randomizado com foco em nutrição de maior duração acompanhou participantes por 48 semanas, e o relato sistemático de eventos adversos foi incomum.

**Conclusões:** Esses achados indicam que o uso clínico autônomo é prematuro; se implementados, os LLMs devem ser restritos a suporte à decisão sob supervisão, com arquiteturas ancoradas em diretrizes (p.ex., retrieval-augmented generation ou sistemas híbridos), validação local, trilhas de auditoria e monitoramento de segurança pré-definido. Pesquisas prioritárias incluem benchmarks públicos específicos de nutrição e ensaios de não inferioridade de longo prazo com desfechos "duros" (p.ex., HbA1c, peso) e endpoints de segurança.

**Palavras-chave:** inteligência artificial, modelos de linguagem de grande escala, nutrição clínica, dietética, saúde digital

# Introdução

A integração da Inteligência Artificial (IA) à nutrição clínica representa uma mudança de paradigma, evoluindo de ferramentas de monitoramento passivo para sistemas generativos capazes de automatizar o raciocínio clínico complexo e o cuidado personalizado [7, 14]. Modelos de Linguagem de Grande Escala (LLMs) ampliam essa promessa ao permitir interação em linguagem natural, recuperação de diretrizes e síntese rápida de informações nutricionais complexas [3]; porém, essas mesmas características introduzem riscos quando as saídas são plausíveis, porém incorretas (frequentemente chamadas de “alucinações” [5]), não fundamentadas ou reproduzidas de forma inconsistente entre prompts e contextos [2].

Essa tensão é especialmente relevante diante de restrições de força de trabalho no cuidado nutricional [2, 3] e da crescente demanda por terapia dietética personalizada em obesidade, diabetes, doença renal, câncer, nutrição esportiva e outras condições crônicas [1]. Para clínicos, a questão central não é se LLMs conseguem gerar texto plausível, mas se conseguem entregar recomendações confiáveis, seguras e clinicamente apropriadas frente à complexidade do mundo real (multimorbidade, alergias, padrões alimentares culturais e dados incompletos), e quais salvaguardas são sustentadas por evidências [4].

A evidência nesta área cresce rapidamente, porém é metodologicamente heterogênea: os estudos abrangem benchmarking no formato de exames, validação de avaliação dietética, testes adversariais de segurança, relatórios de implementação/viabilidade e um pequeno número de ensaios clínicos. Revisões narrativas anteriores [3, 5, 6] resumiram aplicações amplas de IA em nutrição, mas carecem de uma análise sistemática sobre o desempenho quantitativo, modos de falha de segurança e desfechos relevantes para implementação de sistemas da era dos LLMs. Uma revisão de escopo é, portanto, a abordagem de síntese mais apropriada [7] para caracterizar o que foi estudado, como foi medido, onde os resultados são consistentes ou conflitantes e quais lacunas clínicas e de pesquisa precisam ser endereçadas antes da adoção rotineira na prática clínica.

## Objetivos de pesquisa

O objetivo primário desta revisão é verificar sistematicamente o desempenho, segurança e prontidão de implementação de LLMs em nutrição clínica. Buscamos responder especificamente como diferentes arquiteturas se comparam, qual a evidência quantitativa para precisão calórica e nutricional, quais vulnerabilidades de segurança (como alucinações e fabricação de citações) impõem riscos clínicos, e quais dados preliminares de desfecho apoiam sua integração na prática.

# Métodos

## Escopo analítico

Esta revisão adota uma estrutura de síntese organizada em sete domínios temáticos, cobrindo estudos revisados por pares e documentos técnicos/políticos selecionados relevantes para implementação clínica e segurança:

- **Benchmarking de arquiteturas:** análise comparativa distinguindo entre sistemas determinísticos (baseados em regras), LLMs generativos (propensos a alucinações [2, 4]) e sistemas híbridos (ex: RAG) que recuperam evidências externas [8]
- **Comparação humano–IA:** evidência quantitativa do desempenho de LLMs versus nutricionistas em exames padronizados e cenários clínicos complexos.
- **Precisão nutricional:** taxas de erro em cálculos de macro e micronutrientes, estratificadas por tipo de alimento, tamanho de porção e modelo.
- **Avaliação de segurança:** frequência e gravidade de alucinações, citações fabricadas, riscos para alérgicos e vulnerabilidade a ataques adversariais.
- **Desfechos clínicos:** síntese de evidências sobre intervenções longitudinais, eventos adversos e manutenção de engajamento do paciente.
- **Posicionamento regulatório:** estruturas terminológicas globais, definições de escopo de prática e limites de responsabilidade profissional.
- **Caminhos de implementação:** diretrizes práticas para integração clínica, requisitos de supervisão humana e governança de dados.

O período de busca abrangeu janeiro de 2020 a setembro de 2025, integrando estudos de validação, ensaios clínicos randomizados, estudos observacionais e revisões sistemáticas.

## Justificativa e delineamento da revisão de escopo

Conduzimos uma revisão de escopo seguindo as diretrizes PRISMA Extension for Scoping Reviews (PRISMA-ScR) [2]. Essa metodologia foi selecionada porque a base de evidências abrange desenhos e tipos de evidência heterogêneos (estudos de validação, testes adversariais/de segurança, relatórios de implementação e relativamente poucos ensaios de desfecho clínico). Assim, uma revisão de escopo é a abordagem mais apropriada para mapear (i) onde LLMs são confiáveis versus inseguros, (ii) modos de falha recorrentes e lacunas de governança e (iii) prioridades para futuras revisões sistemáticas e ensaios de intervenção de longo prazo.

O delineamento buscou responder “o que se sabe” sobre desempenho, segurança e implementação de LLMs em nutrição, em vez de “o que funciona melhor” para uma intervenção específica, alinhando-se ao propósito de revisões de escopo de examinar a extensão, o alcance e a natureza da atividade de pesquisa em um campo emergente. O processo de seleção das 53 fontes incluídas está detalhado na Figura 1 (fluxo PRISMA) e na Tabela Suplementar S1; os principais achados são sintetizados abaixo, com fontes primárias citadas no texto principal.

## Estratégia de busca e fontes de informação

**Bases e fontes:** buscas abrangentes foram conduzidas em seis bases eletrônicas: PubMed/MEDLINE, Web of Science Core Collection, Scopus, IEEE Xplore Digital Library, ACM Digital Library e Google Scholar (primeiros 200 resultados por consulta), para artigos publicados entre 1º de janeiro de 2020 e 30 de setembro de 2025.

**Estratégia de Atualização (*Bridge Search*):** Devido ao ritmo acelerado de lançamentos na área, conduzimos uma busca de ponte (*bridge search*) direcionada em 22 de dezembro de 2025 nas bases PubMed e Google Scholar (filtro de data: 01/10/2025–22/12/2025). Esta atualização visou capturar: (1) ensaios clínicos de alto impacto publicados no último trimestre (p.ex., Mathioudakis et al. no JAMA [51] (comparado a [52])); e (2) documentação técnica de modelos fundacionais de nova geração (p.ex., GPT-5 [48], Gemini 2.5 [30]) lançados após o fechamento da busca primária, garantindo que a discussão sobre arquiteturas refletisse o estado da arte no momento da submissão.

**Desenvolvimento da estratégia:** uma estratégia iterativa foi desenvolvida pela equipe de autores, utilizando 65 consultas Booleanas combinando termos específicos de nutrição com terminologia de IA. Os termos foram organizados em três grupos conceituais:

- **Conceitos de nutrição:** `nutrition OR dietetics OR dietary assessment OR meal planning OR nutritionist OR dietitian OR “clinical nutrition” OR “medical nutrition therapy” OR “nutrition counseling”`
- **Conceitos de IA/LLM:** `“artificial intelligence” OR “machine learning” OR “large language model” OR LLM OR GPT OR “neural network” OR chatbot OR “conversational agent” OR “deep learning” OR “natural language processing”`
- **Termos específicos de modelos (quando usados):** `ChatGPT OR "GPT-4" OR "GPT-5" OR Claude OR Gemini OR Bard`. Nomes de modelos adicionais encontrados durante a triagem (p.ex., LLaMA3) foram capturados por triagem suplementar e incluídos se atendessem aos critérios de elegibilidade.

**Exemplo de string PubMed:**

```text
(("artificial intelligence"[MeSH] OR "machine learning"[MeSH] OR "large language model"[tiab] OR LLM[tiab] OR GPT[tiab] OR chatbot[tiab])
AND (nutrition[MeSH] OR dietetics[MeSH] OR "dietary assessment"[tiab] OR nutritionist[tiab] OR dietitian[tiab]))
AND (2020/01/01:2025/09/30[Date - Publication])
```

**Métodos suplementares:** (1) triagem manual de listas de referências de revisões incluídas e de estudos primários-chave; e (2) rastreamento de citações “para frente” de artigos seminais usando Google Scholar.

**Documentação:** todas as strings de busca por base estão disponíveis no Arquivo Suplementar S3 (documentação da estratégia de busca).

## Critérios de inclusão e exclusão

**Critérios de inclusão:**

- **Tipo de publicação:** artigos revisados por pares; anais de conferência de alta qualidade; e documentos técnicos/políticos autoritativos selecionados (p.ex., estruturas regulatórias, documentação de modelos/sistemas) quando diretamente relevantes para implementação clínica e segurança.
- **Desenho do estudo:** pesquisa primária (validação, ensaios randomizados, observacionais), testes adversariais/de segurança, descrições de benchmarks e datasets e sínteses de evidência (revisões sistemáticas/de escopo/narrativas). **Nota:** Para revisões incluídas, extraímos apenas os insights agregados ou lacunas identificadas, evitando a dupla contagem de dados primários já extraídos individualmente.
- **Foco de conteúdo:** sistemas de IA (incluindo LLMs) aplicados a nutrição humana, dietética, aconselhamento dietético ou terapia nutricional clínica; além de governança de implementação/segurança relevante para uso clínico.
- **Relato de dados:** métricas quantitativas de desempenho e/ou desfechos clinicamente relevantes, ou requisitos acionáveis de implementação/segurança.
- **Idioma:** inglês.
- **Período:** 1º de janeiro de 2020 a 30 de setembro de 2025 (com *bridge search* até 22 de dezembro de 2025).

**Critérios de exclusão:**

- Estudos de nutrição animal sem relevância para humanos.
- Aplicações em ciência de alimentos/manufatura/agro sem componente de nutrição clínica.
- Opiniões, editoriais ou comentários sem métodos ou dados substantivos.
- Estudos exclusivamente de visão computacional/reconhecimento de imagem sem componente de modelo de linguagem ou conversacional.
- Duplicatas (apenas o artigo completo foi mantido em caso de resumos de conferência).
- Modelos de aprendizado de máquina tradicionais (ex: Support Vector Machines [SVM], Random Forest, regressão logística) ou sistemas especialistas baseados em regras anteriores a 2020, sem integração com arquiteturas de linguagem generativa (Transformers/LLMs).

**Triagem:** dois revisores independentes (V.R.M. e R.D.M.) triavam títulos/resumos e avaliaram textos completos. Divergências foram resolvidas por discussão; quando necessário, um terceiro revisor (E.W.M.A.) arbitrou. Decisões finais foram revisadas e validadas pelos autores seniores (F.B.B. e D.T.C.).

## Extração e síntese

**Extração:** três revisores (E.W.M.A., V.R.M. e R.D.M.) extraíram dados usando formulários padronizados desenvolvidos e pilotados em 10 estudos representativos. Divergências foram resolvidas por consenso, com apoio dos autores seniores (F.B.B. e D.T.C.) quando necessário. Variáveis extraídas incluíram:

- **Características do estudo:** primeiro autor, ano, país/região, fonte de financiamento, conflitos de interesse
- **Desenho:** tipo, tamanho amostral, duração, cenário (acadêmico, clínico, comercial)
- **Especificações do sistema:** arquitetura (GPT-4o, Claude 3.5, Gemini 1.5 Pro etc.), versão do modelo, fontes de dados de treinamento, estratégias de prompting (zero-shot, few-shot, chain-of-thought), fine-tuning, uso de retrieval-augmented generation
- **População/dataset:** características de participantes OU composição de dataset (alimentos, cenários clínicos, questões de exame)
- **Comparadores:** nutricionistas humanos, outras IAs, grupos controle
- **Desfechos:** métricas primárias/secundárias, com IC95% quando reportado
- **Resultados quantitativos:** acurácia, sensibilidade/especificidade, correlações, mudanças em desfechos clínicos, valores de p
- **Segurança:** taxas de alucinação, acurácia de citações, erros com alergênicos, eventos adversos
- **Follow-up:** duração da intervenção e seguimento máximo (quando aplicável)

**Síntese:** dada a heterogeneidade de desenhos, medidas e arquiteturas, meta-análise formal não foi viável. Empregamos síntese narrativa estruturada, organizada tematicamente pelas sete perguntas de pesquisa. Achados quantitativos foram tabulados para permitir comparação entre estudos. Quando múltiplos estudos abordaram o mesmo desfecho (p.ex., acurácia em exame de RD), os resultados foram apresentados em tabelas comparativas com detalhes metodológicos.

**Categorização temática:** os estudos foram classificados por foco principal: (1) comparação de arquiteturas, (2) benchmarking de desempenho, (3) testes adversariais/segurança, (4) ensaios de desfecho clínico, (5) validação de precisão nutricional, (6) análises regulatórias/éticas, (7) implementação/viabilidade. Estudos multi-tema foram codificados em todas as categorias relevantes.

## Considerações de qualidade e limitações metodológicas

Consistente com revisões de escopo [2], não realizamos avaliação formal de qualidade com ferramentas padronizadas (p.ex., Cochrane Risk of Bias, CASP), pois o objetivo foi mapear a amplitude da evidência e não estimar efetividade para diretrizes clínicas. Ainda assim, incorporamos indicadores de qualidade:

- **Credibilidade da fonte:** preferência por publicações revisadas por pares; documentos técnicos/políticos apenas quando diretamente relevantes (p.ex., orientação regulatória, relatórios de credenciamento, documentação de sistemas)
- **Transparência metodológica:** registro de estudos com detalhes completos (versões, prompting, datasets) versus baixa reprodutibilidade
- **Financiamento e conflitos:** extração sistemática de financiamento e afiliações
- **Tamanho amostral:** sinalização de estudos robustos (N>100 em validação; N>50 por braço em RCTs) versus pilotos pequenos
- **Reprodutibilidade:** rastreio de disponibilidade de código/dados/protocolos de prompting

Esses indicadores são reportados na Tabela Suplementar S1, permitindo avaliação independente da força da evidência.

# Resultados

## Desfechos da busca de literatura

As buscas eletrônicas primárias (até 30/09/2025) identificaram 8.247 registros. Após remoção de duplicatas (n=2.415), 5.832 registros foram triados por título e resumo, excluindo-se 5.520 por não atenderem aos critérios de foco em IA/LLM aplicado à nutrição. A avaliação de texto completo de 312 relatórios resultou na inclusão de 53 fontes elegíveis. A *bridge search* (Out–Dez 2025) identificou 1 estudo seminal adicional publicado em dezembro de 2025 [9], além de 3 fontes técnicas identificadas manualmente. No total, **53 fontes** foram incluídas na revisão como base de evidência (Figura 1), com citações adicionais de suporte metodológico.

**Figura 1.** Fluxograma PRISMA-ScR mostrando o processo de busca e seleção. A partir de 8.247 registros identificados nas bases, 49 fontes foram incluídas nesta revisão de escopo após triagem e elegibilidade, seguindo as diretrizes PRISMA Extension for Scoping Reviews [2].

As fontes incluídas compreenderam estudos de validação e benchmarking, intervenções clínicas, testes de segurança/adversariais e sínteses de evidência, refletindo a diversidade de abordagens de avaliação atualmente usadas para LLMs em nutrição clínica.

## Comparação de arquiteturas de IA: determinísticas vs LLMs vs sistemas híbridos

Modelos de linguagem em nutrição clínica evoluíram de sistemas de uso geral para arquiteturas especializadas [3]. **Sistemas determinísticos** (baseados em regras) atingiram 87% de precisão de macronutrientes com consistência perfeita, mas apresentaram inflexibilidade em cenários clínicos não previstos [5, 6, 12]. **LLMs de uso geral** ("puros") demonstraram 61–95% de acurácia dependendo da complexidade da tarefa, com degradação acentuada (frequentemente <50%) em casos com múltiplas comorbidades [4, 7, 8, 13–15]. **Modelos especializados** (*fine-tuned*) em corpora nutricionais mostraram ganhos substanciais: o FoodSky alcançou 91,2% em exames de dietética, superando o GPT-4o (78,5%) graças ao treinamento em bases de dados culinárias e nutricionais [16]. **Sistemas híbridos** (combinando geração de IA com raciocínio de LLM) atingiram o melhor desempenho: em uma validação controlada com diretrizes EFSA/WHO, obtiveram desvio calórico próximo de zero e acurácia de macronutrientes de 84–87% [2], embora a validação clínica em mundo real ainda seja necessária.

Um estudo abrangente de benchmark (Azimi et al., 2025) avaliou três LLMs de ponta em 1.050 questões do exame de Registered Dietitian, com cinco medições repetidas. O GPT-4o com Chain-of-Thought Self-Consistency (CoT-SC) atingiu 95% de acurácia geral, excedendo substancialmente as taxas de aprovação humana na primeira tentativa [17] (61,5%). Alto desempenho comparável foi documentado em múltiplos estudos de validação independentes [1, 3]. Contudo, a acurácia variou por dificuldade: questões fáceis (99,6%) versus questões de nível especialista (84,5%), evidenciando dificuldades de raciocínio nutricional avançado [2, 3]. O Gemini 1.5 Pro mostrou alta consistência teste–reteste (kappa de Fleiss = 0,996) com prompting zero-shot [2], sugerindo alta reprodutibilidade, crucial para uso clínico.

**Arquiteturas com recuperação de conhecimento** (RAG) demonstraram vantagens em tarefas que exigem aderência a diretrizes. Feng et al. (2025) implementaram um sistema RAG integrando bases nutricionais, atingindo 80,1% de aderência nutricional e 92% de conformidade com sustentabilidade em 1.000 receitas. Hou et al. (2025) desenvolveram o iDISK 2.0, combinando GPT-4 com bases autoritativas de suplementos, atingindo 99% de acurácia para consultas suplemento–nutriente e 98% para interações medicamento–suplemento. Sistemas RAG demonstraram taxas menores de alucinação por ancoragem em bases de conhecimento validadas [2].

**Sistemas híbridos** se destacaram como a abordagem mais efetiva. Papastratis et al. (2024) combinaram um modelo generativo especializado com ChatGPT, atingindo acurácia calórica próxima de 100% e 87% de precisão de macronutrientes em 3.000 perfis virtuais, via critérios de otimização baseados em diretrizes EFSA/WHO. Esse desempenho excedeu o do ChatGPT isolado, que apresentou ~17% de desvio calórico [2]. Vantagens similares foram documentadas em sistemas multimodais que integram texto e imagem [16, 18, 19].

**Tabela 1.** Desempenho comparativo de LLMs versus Benchmark Humano

| Modelo                 | Acurácia (Exame RD) | Casos Complexos (Multimorbidade) | Ponto Forte Diferencial           |
| ---------------------- | ------------------- | -------------------------------- | --------------------------------- |
| GPT-4o (CoT-SC)        | 95%                 | <50%                             | Raciocínio clínico em tarefas isoladas |
| Claude 3.5 Sonnet      | 89%                 | <50%                             | Qualidade estrutural dos planos   |
| Gemini 1.5 Pro         | 91%                 | <50%                             | Consistência (κ=0,996)            |
| Benchmark Humano*      | 61–70%              | Padrão-ouro                      | Julgamento clínico contextual     |

**Nota:** RD = Registered Dietitian (EUA); CoT-SC = Chain-of-Thought Self-Consistency; κ = coeficiente kappa de Fleiss. *Benchmark Humano refere-se à taxa histórica de aprovação de candidatos na primeira tentativa do exame de credenciamento, utilizada como linha de base nos estudos comparativos [17].

## Características de desempenho por modelo

O GPT-4o apresentou as maiores métricas de acurácia: 91–95% em exames de RD [1], com pontos fortes em raciocínio complexo e geração com CoT-SC documentados em múltiplos frameworks de avaliação [3]. Uma análise comparativa de ChatGPT, Gemini e Copilot para geração de planos alimentares encontrou grande variabilidade na precisão da estimativa energética (66,7–100% dentro de faixas aceitáveis) e em índices de qualidade da dieta (HEI), com o ChatGPT apresentando desempenho superior na prescrição energética, mas todos os sistemas com limitações para micronutrientes [20]. Avaliações dietéticas baseadas em imagem mostraram subestimação sistemática do tamanho das porções [1], e análises teste–reteste sugeriram reprodutibilidade aceitável, porém moderada [3].

O Claude 3.5 Sonnet atingiu 89% em questões de exame de nutrição esportiva [3], o maior entre os modelos testados, mas apresentou sensibilidade pronunciada ao prompting: 31% com prompts simples versus 60% com prompts detalhados [3]. Em avaliações qualitativas, forneceu consistentemente os planos alimentares de maior qualidade para adequação nutricional em casos complexos (todas as quatro métricas de qualidade positivas), superando GPT-4o e Gemini [2]. Avaliações profissionais de nutricionistas sobre recomendações do ChatGPT para estudantes universitários encontraram 55–73% de adequação, dependendo da complexidade, com forças em aderência a diretrizes baseadas em evidência e fraquezas em personalização e adaptação cultural [4, 21].

O Gemini 1.5 Pro demonstrou alta reprodutibilidade (94,4% teste–reteste; κ=0,996) [2], mas apresentou queda de desempenho com prompting CoT [2], padrão oposto ao GPT-4o/Claude. Isso sugere aplicabilidade para contextos de alto volume que exigem respostas estáveis [2].

Modelos especializados (*fine-tuned*) superaram LLMs gerais em tarefas nutricionais específicas, atingindo 81–91% de acurácia e alta precisão diagnóstica (F1=0,966) para identificação de desnutrição [16, 19, 22]. Essas vantagens foram especialmente pronunciadas em aplicações que exigem terminologia médica precisa e aderência a diretrizes [22, 23].

## LLMs versus referência humana: evidência comparativa

Em múltiplas avaliações independentes, LLMs demonstraram desempenho superior aos benchmarks de aprovação profissional em exames padronizados. Enquanto o GPT-4o com CoT-SC atingiu 95% no exame de credenciamento (RD Exam) (Azimi et al., 2025), a taxa de aprovação de candidatos humanos foi de 62,2% no mesmo período [17]. De forma semelhante, Sun et al. (2023) relataram acurácia de 74,5% do GPT-4 no exame chinês de Registered Dietitian, superando as taxas nacionais de aprovação (30–40%). Padrões comparáveis foram observados em avaliações de competência em nutrição esportiva e clínica [3].

Kirk et al. (2023) forneceram evidência direta comparando desempenho em tarefas simuladas: em avaliação cega por 27 juízes (18 nutricionistas, 9 especialistas), o ChatGPT superou respostas humanas em 5 de 8 questões, sem que nenhuma resposta humana superasse o ChatGPT. A avaliação indicou que 79% dos planos gerados por IA eram indistinguíveis de planos humanos, embora a IA tenha apresentado índices de qualidade da dieta (HEI) ligeiramente inferiores (69,2 vs 72,5; p=0,03) e menor personalização [24]. O GPT-4V multimodal demonstrou correlação forte (0,73–0,89) com análise de especialistas humanos, aproximando-se da confiabilidade inter-avaliadores [25]. Estudos cegados subsequentes corroboraram esses achados [26–28].

Entretanto, a acurácia da IA degrada significativamente na presença de múltiplas comorbidades. Ponzo et al. (2024) encontraram que todos os dez chatbots testados ficaram abaixo de 50% de acurácia para casos complexos de obesidade (diabetes tipo 2 + doença renal crônica + sarcopenia), com o ChatGPT-4 atingindo apenas 46,2%, evidenciando falhas de raciocínio clínico em cenários de multimorbidade. Essa limitação foi observada consistentemente em estudos independentes [7, 8, 18], sugerindo que, apesar do desempenho superior em exames teóricos, o julgamento clínico humano permanece insubstituível para a integração de dados em casos complexos.

## Precisão calórica e nutricional: análise quantitativa

Haman et al. (2024) estabeleceram benchmarks de precisão comparando ChatGPT-3.5 com USDA FoodData Central em 236 alimentos: 66,4% das estimativas dentro de uma margem de erro de 10% para energia, com grande variação por nutriente (gorduras: 29,9%). Uma avaliação comparativa de aplicativos de reconhecimento alimentar evidenciou viés cultural, com menor acurácia para culinárias asiáticas (erro 22,3%) versus alimentos ocidentais (erro 14,1%), destacando a necessidade de datasets de treinamento diversos [29]. Estudos independentes documentaram variabilidade semelhante em macronutrientes [1], com proteína como o nutriente mais preciso e micronutrientes com a menor precisão.

A precisão degradou com a complexidade e o tamanho das porções em múltiplos frameworks de avaliação. O’Hara et al. (2025) testaram ChatGPT-4 em 114 fotografias de refeições de dados de inquérito alimentar nacional, encontrando boa concordância para refeições pequenas (p=0,221), mas concordância ruim para refeições médias/grandes (p<0,001). As diferenças percentuais excederam 10% em 13 de 16 nutrientes, com subestimação sistemática (11 nutrientes). As correlações variaram amplamente (rs=0,29–0,83). Esse padrão de subestimação foi replicado em avaliações independentes [1], sugerindo viés algorítmico com necessidade de correção.

Sistemas que incorporam diretrizes nutricionais como restrições arquiteturais demonstraram melhor precisão. Papastratis et al. (2024) atingiram 100% de acurácia energética (desvio próximo de zero) e 87% de precisão de macronutrientes ao implementar diretrizes EFSA/WHO como critérios de otimização no treinamento. Isso superou substancialmente o desvio calórico ~17% do ChatGPT [2]. Abordagens semelhantes, ancoradas em diretrizes, melhoraram a acurácia em aplicações nutricionais especializadas [16, 22, 23].

## Vulnerabilidades de segurança e riscos de desinformação

Omar et al. (2025) conduziram análise adversarial abrangente em 5.400 saídas usando vinhetas clínicas validadas por médicos com detalhes fabricados embutidos. As taxas de alucinação atingiram 50–82% conforme modelo e método de prompting. Para o GPT-4o, a taxa basal foi 53%, reduzida a 23% com estratégias de mitigação (p<0,001). Esses resultados indicam vulnerabilidade preocupante à geração de informação falsa diante de entradas enganosas. Em avaliação sobre potencial impacto do ChatGPT em transtornos alimentares e imagem corporal, conteúdo problemático foi gerado em 31% das consultas, incluindo promoção de padrões alimentares restritivos e padrões corporais irrealistas, levantando preocupações relevantes para populações vulneráveis como adolescentes e pessoas com histórico de transtornos alimentares [30].

Niszczota e Rybicka (2023) documentaram que o ChatGPT incluiu “leite de amêndoas” em uma recomendação de dieta sem oleaginosas — um erro potencialmente fatal que demonstra falhas na checagem de alérgenos. Fabricação de referências foi documentada amplamente. Chatelan et al. (2023) encontraram que apenas 33% das citações eram adequadas, com 13% totalmente inexistentes, o que compromete credibilidade e impede verificação.

Han et al. (2024) demonstraram vulnerabilidade à manipulação intencional, injetando 1.025 fatos biomédicos incorretos via manipulação baseada em gradiente de apenas 1,1% dos parâmetros do modelo, criando desinformação clínica perigosa, incluindo doses de medicamentos alteradas e tratamentos contraindicados.

**Tabela 2.** Vulnerabilidades de segurança em aplicações nutricionais com LLM

| Tipo de vulnerabilidade            | Taxa medida                            | Impacto clínico                       |
| ---------------------------------- | -------------------------------------- | -------------------------------------- |
| Alucinação (adversarial)         | 50–82%                                | Alto — recomendações falsas         |
| Fabricação de citações         | 13–91% inválidas                     | Médio — credibilidade comprometida   |
| Erros com alergênicos alimentares | Casos documentados                     | Crítico — potencial anafilaxia       |
| Manipulação direcionada          | 1.025 fatos alterados (1,1% dos parâmetros do modelo) | Crítico — desinformação sistêmica |

**Nota:** taxas representam ocorrências documentadas em múltiplos estudos de avaliação.

## Desfechos clínicos de longo prazo e lacunas de evidência

Uma revisão sistemática de Oh et al. (2021) identificou apenas quatro RCTs testando chatbots de IA para dieta e perda de peso (N total=891), com a maioria classificada como qualidade de “razoável” a “ruim”. Criticamente, apenas um de nove estudos reportou eventos adversos, representando importante lacuna de monitoramento de segurança. Revisões sistemáticas mais recentes documentaram evidência crescente para intervenções dietéticas baseadas em IA e programas de nutrição personalizada com melhora em desfechos cardiometabólicos [31–33]. A revisão sistemática de Wang et al. (2025) sobre IA em recomendações dietéticas personalizadas sintetizou evidência de 38 estudos, encontrando eficácia particular em diabetes e intervenções para perda de peso, mas com limitações persistentes em adesão de longo prazo e adaptação cultural.

Lee et al. [34] conduziram o RCT mais longo identificado da busca primária (48 semanas; multicêntrico; N=294 adultos com sobrepeso/obesidade e DM2). Os participantes foram randomizados para: A) cuidado habitual em diabetes (controle), B) uso autônomo da plataforma de IA, C) plataforma + feedback de equipe médica + monitorização contínua de glicose. Desfechos primários em 24 semanas: Grupo A: -0,06±0,54%; Grupo B: -0,32±0,58% (p<0,05 vs A), Grupo C: -0,49±0,57% (p<0,01 vs A). Em 48 semanas: Grupo A: -0,13±0,65%, Grupo B: -0,28±0,56%, Grupo C: -0,44±0,62%. O modelo híbrido (IA + supervisão profissional) superou IA isolada, sustentando a justificativa empírica para abordagens *human-in-the-loop* (supervisão humana integrada).

Expandindo essa evidência, Mathioudakis et al. [49] publicaram recentemente (Dez 2025) no JAMA os resultados de 12 meses do Diabetes Prevention Program, demonstrando pela primeira vez a **não-inferioridade estatística** de uma intervenção de estilo de vida guiada por IA em comparação ao coaching humano padrão (Δ = -0,05%; equivalência estabelecida). Este é o primeiro RCT de 12 meses a demonstrar paridade clínica entre IA e intervenção humana em desfechos "duros" (perda de peso, HbA1c), consolidando a viabilidade de sistemas de IA supervisionados para manejo de peso em pacientes com risco de diabetes.

Em análise retrospectiva, Shamanna et al. [35] avaliaram uma intervenção “Digital Twin” em DM2 (N=1.107; seguimento de 12 meses) e observaram redução substancial de HbA1c (-1,8% de mudança média; p<0,001) com melhora em peso (-3,2 kg), IMC e lipídios, embora o desenho observacional limite inferência causal.

Lacunas críticas incluem: 75% dos estudos com duração <6 meses, apenas um estudo com follow-up de 48 semanas, ausência de estudos >1 ano e 89% sem relato sistemático de eventos adversos. Durabilidade de efeito, fenômenos de rebote e adesão sustentada permanecem desconhecidos. Estudos de viabilidade de curto prazo mostraram 100% de retenção e perda de peso significativa [36], enquanto intervenções de saúde digital mostraram melhora em controle glicêmico [37].

Evidência emergente aborda populações especializadas. Uma revisão sistemática de Sguanci et al. (2025) sobre IA em desnutrição oncológica (N=52.228; 11 estudos) encontrou AUC >0,80 para detecção, com “dietistas virtuais” demonstrando 84% de aderência e deep learning atingindo coeficientes Dice de 0,92–0,94 (alta precisão de segmentação). Uma meta-análise de Rao et al. (2025) sintetizou dados de predição de desnutrição pediátrica e identificou algoritmos ótimos para contextos de poucos recursos. Aplicações especializadas em doença renal crônica [38] e saúde feto-materna [39] demonstram potencial, mas requerem validações maiores.

**Tabela 3.** Desfechos clínicos em estudos-chave de intervenção

| Estudo                            | Duração                | Desfecho primário | Achado principal                                                          |
| --------------------------------- | ------------------------ | ------------------ | ------------------------------------------------------------------------- |
| Lee et al. [34]                   | 48 semanas (RCT)         | Redução de HbA1c | IA+supervisão: -0,49%; IA isolada: -0,32%; Controle: -0,06% (48 semanas) |
| Shamanna et al. [35]              | 12 meses (retrospectivo) | Redução de HbA1c | Digital Twin: -1,8% (p<0,001), peso: -3,2 kg                              |
| Ruiz-Ojeda et al., 2025 (AI4Food) | 1 mês                   | Perda de peso      | Média -2 kg (p<0,001), 100% retenção                                   |
| Patel et al., 2025 (January V2)   | 14–33 dias              | Time in range      | DM2: 49,7% → 57,4% (p<0,0004)                                            |
| Oh et al., 2021 (Revisão)        | Misto                    | Vários            | Apenas 4 RCTs; 75% dos estudos <6 meses                                   |
| **Mathioudakis et al. [49] (JAMA)** | **12 meses (RCT)**      | **Perda de peso & HbA1c** | **IA não-inferior ao coaching humano (Δ: -0,05%; equivalência estabelecida)** |

**Nota:** HbA1c = hemoglobina glicada; DM2/T2DM = diabetes mellitus tipo 2; RCT = ensaio clínico randomizado.

## Atraso de publicação e modelos emergentes

Dado o ritmo acelerado de atualizações, alguns estudos publicados em 2020–2025 avaliam versões que podem evoluir rapidamente. Embora relatórios técnicos, system cards e plataformas comunitárias de avaliação possam sinalizar mudanças gerais de capacidade [10, 11, 40], eles não substituem avaliação revisada por pares, específica de nutrição, de segurança e desempenho. Importante: requisitos de segurança e implementação (p.ex., checagem de alérgenos, integridade de citações, responsabilização e monitoramento) permanecem clinicamente relevantes independentemente da versão e devem ser presumidos como não atendidos até que sejam demonstrados sob avaliação rigorosa.

# Discussão

**Achados principais:** esta revisão de escopo sintetizou 49 fontes (2020–2025) que avaliaram LLMs e sistemas de IA relacionados em nutrição clínica. Em benchmarks e avaliações aplicadas, o desempenho foi mais forte em tarefas restritas (p.ex., exames padronizados e geração ancorada em diretrizes), mas a performance degradou substancialmente em cenários complexos de multimorbidade, e falhas de segurança (alucinações, citações fabricadas, erros com alergênicos) foram recorrentes. Embora o GPT-4o e o Gemini 1.5 tenham demonstrado limitações de raciocínio em casos complexos, a literatura técnica emergente do final de 2025 sugere que a geração subsequente de modelos — notavelmente o GPT-5 [10] e o Gemini 2.5 [11] — apresenta melhorias arquiteturais focadas na redução de alucinações (ex: cadeias de raciocínio mais longas). No entanto, a validação clínica independente desses novos sistemas ainda é incipiente comparada à base de evidências robusta já estabelecida para o GPT-4o.

**Implicações clínicas e práticas:** a evidência atual apoia o uso de LLMs como suporte à decisão sob supervisão, e não como cuidado autônomo. No RCT de nutrição mais longo identificado (48 semanas), a combinação de uma plataforma de IA com supervisão profissional melhorou desfechos em comparação com IA isolada [34].

Para nutricionistas, LLMs podem apoiar síntese de informação, recuperação de diretrizes e documentação; contudo, julgamento profissional permanece essencial em casos complexos, terapia dietética individualizada e decisões críticas para segurança.

Ferramentas de nutrição com IA direto ao consumidor exigem cautela diante de falhas documentadas (p.ex., erros com alergênicos, recomendações contraditórias e citações fabricadas), particularmente em pacientes com comorbidades complexas ou restrições dietéticas.

**Considerações regulatórias, éticas e de equidade:** sistemas de IA que geram recomendações nutricionais personalizadas ou suporte à decisão clínica podem se enquadrar em estruturas de software médico (p.ex., FDA SaMD) e exigir validação, documentação e monitoramento contínuo [41]. Entre as fontes incluídas, preocupações recorrentes incluem privacidade de dados sensíveis de saúde/dieta, responsabilização pouco clara quando ocorrem erros e avaliação limitada em diferentes idiomas e padrões alimentares culturais. Salvaguardas práticas e considerações éticas são resumidas na Tabela Suplementar S3.

**Prioridades para pesquisa futura**

- **Benchmarks específicos de nutrição:** datasets públicos e reprodutíveis cobrindo cálculo de macronutrientes, aderência a diretrizes, raciocínio em multimorbidade, adequação cultural e segurança para alergênicos são necessários para avaliação rápida e comparável [42].
- **Desfechos clínicos e segurança:** a evidência de longo prazo permanece limitada. Ensaios ≥12 meses, com endpoints de segurança pré-definidos e análises de custo-efetividade, são necessários. Um grande RCT no Diabetes Prevention Program encontrou que uma intervenção de estilo de vida com IA foi não inferior ao coaching humano em 12 meses [9] (comparado a revisões anteriores [5]), mas replicações e avaliação de segurança específica de nutrição ainda são requeridas.

Prioridades técnicas incluem modelos especializados em nutrição ancorados em diretrizes autoritativas (p.ex., RAG), testes padronizados de “stress” de segurança e relato transparente de versão do modelo, prompts e datasets de avaliação.

**Implicações para política e prática**

Antes da implantação clínica, instituições devem implementar rollout em etapas, exigir documentação do envolvimento de IA e manter trilhas de auditoria e reporte de incidentes. Arquiteturas com preservação de privacidade e caminhos claros de responsabilização devem ser estabelecidos localmente, pois reembolso e arcabouços de responsabilidade civil ainda estão em evolução.

# Limitações

## Tecnologia em rápida evolução e gerações de modelos

Esta revisão reflete a evidência disponível até 30 de setembro de 2025. Capacidades e padrões de implantação evoluem rapidamente, e versões mais novas podem diferir daquelas avaliadas nas fontes incluídas. Os achados devem, portanto, ser interpretados no contexto das versões e configurações de prompting reportadas em cada estudo.

## Ausência de benchmarks padronizados em nutrição

A nutrição clínica carece de datasets públicos de benchmark análogos ao AIME (matemática), SWE-Bench (código) ou GPQA (raciocínio científico) [42]. Estudos atuais utilizam exames regionais sem conjuntos de teste públicos, limitando reprodutibilidade. Isso impede comparações rigorosas entre modelos e facilita contaminação por dados de treinamento. O desenvolvimento de benchmarks públicos cobrindo cálculo de macronutrientes, raciocínio clínico, aderência a diretrizes e adequação cultural é infraestrutura crítica para avaliação sistemática.

## Atraso de publicação em um campo de rápida mudança

Ciclos de publicação por revisão por pares criam um atraso inevitável entre o lançamento de modelos e sua avaliação publicada. Em vez de tratar isso como tornando a evidência “obsoleta”, enfatizamos requisitos de segurança e governança que permanecem clinicamente relevantes independentemente da versão. Até que desempenho e segurança específicos de nutrição sejam demonstrados sob avaliação rigorosa, versões novas devem ser consideradas como potencialmente contendo modos de falha não resolvidos e não devem ser implantadas de forma autônoma.

## Viés geográfico, linguístico e cultural

Os estudos concentraram-se na Europa (n=17), América do Norte (n=14) e Ásia (n=11), além de fontes multinacionais (n=8), com representação limitada de outras regiões. Não houve fontes incluídas originadas na África ou América do Sul, e avaliações em idiomas além do inglês foram incomuns. Adequação cultural, restrições alimentares religiosas e acurácia em culinárias não ocidentais permanecem insuficientemente avaliadas, podendo ampliar disparidades se sistemas forem adotados sem validação cultural.

## Metodologias heterogêneas impedindo meta-análise

Ampla variabilidade em desenhos, medidas de desfecho e estratégias de prompting impediu meta-análise quantitativa. Isso reflete o status emergente do campo, mas limita conclusões definitivas. Protocolos padronizados de avaliação e datasets de benchmark são necessários.

# Conclusões

Ao longo de 49 fontes, LLMs e sistemas de IA relacionados demonstraram bom desempenho em tarefas restritas (p.ex., exames padronizados e geração ancorada em diretrizes), mas surgiram fraquezas clinicamente importantes em contextos complexos e de maior risco. A acurácia frequentemente caiu abaixo de 50% em cenários de multimorbidade, e sistemas de avaliação dietética mostraram padrões de subestimação sistemática potencialmente prejudiciais quando metas precisas de energia/proteína são necessárias.

Preocupações de segurança não são periféricas: citações fabricadas, erros com alergênicos e saídas sensíveis ao prompt foram documentados repetidamente, e testes adversariais relataram altas taxas de alucinação. Esses achados apoiam uma postura clínica conservadora: a implantação autônoma para terapia nutricional médica é, no momento, prematura.

Se implementados, LLMs devem ser limitados a suporte à decisão sob supervisão e tarefas de baixo risco, com salvaguardas proporcionais ao risco clínico: arquiteturas ancoradas em diretrizes (p.ex., sistemas retrieval-augmented ou híbridos), validação local nas populações e fluxos de trabalho relevantes, documentação do envolvimento de IA, trilhas de auditoria e gatilhos pré-definidos para escalonamento ou desativação.

Para avançar de viabilidade a adoção clínica, o campo necessita de benchmarks públicos específicos de nutrição e ensaios de longo prazo (expandindo os dados de 48 semanas [34] para replicações dos recém-publicados desfechos de 12 meses [51] (comparado a [52]) (comparado a revisões anteriores [52])) desenhados para não inferioridade/superioridade em endpoints clínicos objetivos (p.ex., HbA1c, peso, hospitalização), com relato sistemático de eventos adversos e avaliação de equidade entre idiomas e padrões alimentares culturais.

# Contribuições dos autores

E.W.M.A. concebeu o estudo e liderou a redação. V.R.M. e R.D.M. conduziram a triagem da literatura e seleção de fontes. E.W.M.A., V.R.M. e R.D.M. realizaram a extração de dados. F.B.B. e D.T.C. supervisionaram o projeto e fizeram revisão crítica de conteúdo intelectual importante. Todos os autores revisaram e aprovaram o manuscrito final.

# Conflitos de interesse

Os autores declaram não haver conflitos de interesse.

# Financiamento

O presente trabalho foi realizado com apoio da Fundação de Amparo à Pesquisa do Estado de São Paulo (FAPESP), Brasil. Processo nº 2025/06258-7.

Este estudo foi parcialmente financiado pela CAPES – Coordenação de Aperfeiçoamento de Pessoal de Nível Superior (Coordination for the Improvement of Higher Education Personnel), código financeiro 001.

D.T.C. e F.B.B. agradecem ao CNPq – Conselho Nacional de Desenvolvimento Científico e Tecnológico; em particular, D.T.C. pela bolsa de produtividade nº 304542/2024-5.

# Declaração de uso de tecnologia

Durante a preparação do manuscrito, os autores utilizaram ferramentas de linguagem assistidas por IA para refinar strings booleanas de busca, melhorar legibilidade/gramática e apoiar checagens de formatação de referências. Todas as saídas foram revisadas e validadas pelos autores, que assumem total responsabilidade pelo conteúdo. Nenhuma ferramenta de IA foi utilizada para triagem, extração de dados, análise, interpretação de resultados ou formulação de conclusões.

# Declaração de disponibilidade de dados

Todos os dados extraídos para esta revisão derivam de fontes publicadas e publicamente disponíveis citadas na seção de Referências. A lista completa das 49 fontes incluídas com dados de extração está disponível como Tabela Suplementar S1. A checklist PRISMA-ScR está disponível como Arquivo Suplementar S2. O protocolo da revisão não foi registrado prospectivamente. A metodologia de revisão de escopo prioriza refinamento iterativo das perguntas de pesquisa, e o registro prospectivo não é exigido de forma uniforme para revisões de escopo como é para revisões sistemáticas de intervenções. Para ampliar transparência, a estratégia de busca e os critérios de seleção estão documentados na seção de Métodos. Detalhes adicionais podem ser obtidos com o autor correspondente mediante solicitação razoável.

# Referências


1. GBD 2021 Diet Collaborators. (2024). Global, regional, and national burden of diseases attributable to risk factors, 1990-2021: a systematic analysis for the Global Burden of Disease Study 2021. The Lancet, 403(10440), 2162-2203. https://doi.org/10.1016/S0140-6736(24)00933-4

2. World Health Organization. (2024). Ethics and governance of artificial intelligence for health: Guidance on large multi-modal models. Geneva: World Health Organization. https://www.who.int/publications/i/item/9789240084759

3. Yang, R., Ning, Y., Liu, N., & Keppo, E. K. (2024). Retrieval-Augmented Generation for Generative Artificial Intelligence in Medicine. The Lancet Digital Health, 6(7), e460.

4. Tricco, A. C., Lillie, E., Zarin, W., O'Brien, K. K., Colquhoun, H., Levac, D., et al. (2018). PRISMA Extension for Scoping Reviews (PRISMA-ScR): Checklist and Explanation. Annals of Internal Medicine, 169(7), 467-473. https://doi.org/10.7326/m18-0850

5. Ji, Z., Lee, N., Bang, J., Madotto, A., & Fung, P. (2023). A Survey on Hallucination in Large Language Models: Principles, Taxonomy, Challenges, and Open Questions. ACM Computing Surveys, 56(1). https://doi.org/10.1145/3639535

6. International Confederation of Dietetic Associations. (2021). Dietitian-nutritionists around the world: Education and work report 2021. Retrieved from https://internationaldietetics.org/wp-content/uploads/2023/11/Education-and-Work-Report-2021.pdf

7. Belkhouribchia, J. & Pen, J. J. (2025). Large language models in clinical nutrition: an overview of its applications, capabilities, limitations, and potential future prospects. Frontiers in Nutrition, 12, Article 1635682. https://doi.org/10.3389/fnut.2025.1635682

8. Papastratis, I., Konstantinidis, D., Daras, P., & Dimitropoulos, K. (2024). AI nutrition recommendation using a deep generative model and ChatGPT. Scientific Reports, 14(1), Article 14620. https://doi.org/10.1038/s41598-024-65438-x

9. Shamanna, P., Erukulapati, R. S., Shukla, A., Shah, L., Willis, B., Thajudeen, M., et al. (2024). One-year outcomes of a digital twin intervention for type 2 diabetes: a retrospective real-world study. Scientific Reports, 14(1), Article 25478. https://doi.org/10.1038/s41598-024-76584-7

10. Koios, K. S., Segal, E., & Ben-Yacov, O. Effects of a personalized nutrition program on cardiometabolic health: A randomized controlled trial. Nat. Med. 31, 958-967 (2025).

11. Commission on Dietetic Registration. (2024). Registered Dietitian Nutritionist Credentialing Exam statistics and reports. Retrieved from https://www.cdrnet.org/RDExamStats

12. World Health Organization. (2021). Global strategy on digital health 2020-2025. Geneva: World Health Organization. https://www.who.int/docs/default-source/documents/gs4dhdaa2a9f352b0445bafbc79ca799dce4d.pdf

13. World Health Organization Regional Office for Europe & ESPEN. (2024). Disease-related malnutrition: a time for action. Copenhagen: WHO Regional Office for Europe. https://www.who.int/europe/publications/i/item/9789289060653

14. Panayotova, G. G. (2025). Artificial Intelligence in Nutrition and Dietetics: A Comprehensive Review of Current Research. Healthcare, 13(20), 2579. https://doi.org/10.3390/healthcare13202579

15. Bayram, H. M. & Ozturkcan, A. (2025). Applications of generative and predictive AI in nutrition and dietetics: a narrative review. Informatics for Health and Social Care, 50(3-4), 133-156. https://doi.org/10.1080/17538157.2025.2560834

16. Kirk, D., van Eijnatten, E., & Camps, G. (2023). Comparison of Answers between ChatGPT and Human Dieticians to Common Nutrition Questions. Journal of Nutrition and Metabolism, 2023, 1-9. https://doi.org/10.1155/2023/5548684

17. Chotwanvirat, P., Prachansuwan, A., Sridonpai, P., & Kriengsinyos, W. (2024). Advancements in Using AI for Dietary Assessment Based on Food Images: Scoping Review. Journal of Medical Internet Research, 26, e51432. https://doi.org/10.2196/51432

18. Ponzo, V., Rosato, R., Scigliano, M. C., Onida, M., Cossai, S., De Vecchi, M., et al. (2024). Comparison of the Accuracy, Completeness, Reproducibility, and Consistency of Different AI Chatbots in Providing Nutritional Advice: An Exploratory Study. Journal of Clinical Medicine, 13(24), 7810. https://doi.org/10.3390/jcm13247810

19. Haman, M., Školník, M., & Lošťák, M. (2024). AI dietician: Unveiling the accuracy of ChatGPT's nutritional estimations. Nutrition, 119, 112325. https://doi.org/10.1016/j.nut.2023.112325

20. Niszczota, P. & Rybicka, I. (2023). The credibility of dietary advice formulated by ChatGPT: Robo-diets for people with food allergies. Nutrition, 112, 112076. https://doi.org/10.1016/j.nut.2023.112076

21. Zhou, P., Min, W., Fu, C., Jin, Y., Huang, M., Li, X., et al. (2025). FoodSky: A food-oriented large language model that can pass the chef and dietetic examinations. Patterns, 6(5), 101234. https://doi.org/10.1016/j.patter.2025.101234

22. Sun, H., Zhang, K., Lan, W., Gu, Q., Jiang, G., Yang, X., et al. (2023). An AI Dietitian for Type 2 Diabetes Mellitus Management Based on Large Language and Image Recognition Models: Preclinical Concept Validation Study. Journal of Medical Internet Research, 25, e51300. https://doi.org/10.2196/51300

23. Azimi, I., Qi, M., Wang, L., Rahmani, A. M., & Li, Y. (2025). Evaluation of LLMs accuracy and consistency in the registered dietitian exam through prompt engineering and knowledge retrieval. Scientific Reports, 15(1), Article 1506. https://doi.org/10.1038/s41598-024-85003-w

24. Hou, Y., Bishop, J. R., Liu, H., & Zhang, R. (2025). Improving Dietary Supplement Information Retrieval: Development of a Retrieval-Augmented Generation System With Large Language Models. Journal of Medical Internet Research, 27, e67677. https://doi.org/10.2196/67677

25. Bernstein, A. M., Janeke, P., Riggs, R. V., Burke, E., Meyer, J., Moyer, M. F., et al. (2025). Artificial Intelligence-Based Hospital Malnutrition Screening: Validation of a Novel Machine Learning Model. Applied Clinical Informatics, 16(05), 1646-1657. https://doi.org/10.1055/a-2635-3158

26. O’Hara, C., Kent, G., Flynn, A. C., Gibney, E. R., & Timon, C. M. (2025). An Evaluation of ChatGPT for Nutrient Content Estimation from Meal Photographs. Nutrients, 17(4), 607. https://doi.org/10.3390/nu17040607

27. Mount Sinai Health System. (2024). NutriScan AI: Machine learning application for malnutrition screening [Press release]. Retrieved from https://www.mountsinai.org/about/newsroom/2025/ai-system-finds-crucial-clues-for-diagnoses-in-electronic-health-records

28. Kaya Kaçar, H., Kaçar, Ö. F., & Avery, A. (2025). Diet Quality and Caloric Accuracy in AI-Generated Diet Plans: A Comparative Study Across Chatbots. Nutrients, 17(2), 206. https://doi.org/10.3390/nu17020206

29. Liao, L. L., Chang, L. C., & Lai, I. J. (2024). Assessing the Quality of ChatGPT’s Dietary Advice for College Students from Dietitians’ Perspectives. Nutrients, 16(12), 1939. https://doi.org/10.3390/nu16121939

30. Comanici, G., Bieber, E., Schaekermann, M., Pasupat, I., Sachdeva, N., Dhillon, I., Blistein, M., Ram, O., Zhang, D., Rosen, E., & Google DeepMind. (2025). Gemini 2.5: Pushing the Frontier with Advanced Reasoning, Multimodality, Long Context, and Next Generation Agentic Capabilities. arXiv. https://arxiv.org/abs/2507.06261

31. Chiang, W.-L., Zheng, L., Sheng, Y., Angelopoulos, A. N., Li, T., Li, D., Zhang, H., Zhu, B., Jordan, M., Gonzalez, J. E., & Stoica, I. (2024). Chatbot Arena: An open platform for evaluating LLMs by human preference. In Proceedings of the 41st International Conference on Machine Learning (Vol. 235, pp. 8359-8388). PMLR. https://arxiv.org/abs/2403.04132

32. Kim, D. W., Park, J. S., Sharma, K., Velazquez, A., Li, L., Ostrominski, J. W., et al. (2024). Qualitative evaluation of artificial intelligence-generated weight management diet plans. Frontiers in Nutrition, 11, Article 1374834. https://doi.org/10.3389/fnut.2024.1374834

33. Lo, F. P. W., Qiu, J., Wang, Z., Chen, J., Xiao, B., Yuan, W., et al. (2024). Dietary Assessment With Multimodal ChatGPT: A Systematic Analysis. IEEE Journal of Biomedical and Health Informatics, 28(12), 7577-7587. https://doi.org/10.1109/jbhi.2024.3417280

34. Chatelan, A., Clerc, A., & Fonta, P. A. (2023). ChatGPT and Future Artificial Intelligence Chatbots: What may be the Influence on Credentialed Nutrition and Dietetics Practitioners?. Journal of the Academy of Nutrition and Dietetics, 123(11), 1525-1531. https://doi.org/10.1016/j.jand.2023.08.001

35. Panayotova, G. G. (2025). Artificial Intelligence in Nutrition and Dietetics: A Comprehensive Review of Current Research. Healthcare, 13(20), 2579. https://doi.org/10.3390/healthcare13202579

36. Bayram, H. M. & Ozturkcan, A. (2025). Applications of generative and predictive AI in nutrition and dietetics: a narrative review. Informatics for Health and Social Care, 50(3-4), 133-156. https://doi.org/10.1080/17538157.2025.2560834

37. Li, X., Yin, A., Choi, H. Y., Chan, V., Allman-Farinelli, M., & Chen, J. (2024). Evaluating the Quality and Comparative Validity of Manual Food Logging and Artificial Intelligence-Enabled Food Image Recognition in Apps for Nutrition Care. Nutrients, 16(15), 2573. https://doi.org/10.3390/nu16152573

38. Toklu Baloğlu, H. (2025). Effect of ChatGPT use on eating disorders and body image. World Journal of Psychiatry, 15(8). https://doi.org/10.5498/wjp.v15.i8.107122

39. Seid, A., Fufa, D. D., & Bitew, Z. W. (2024). The use of internet-based smartphone apps consistently improved consumers' healthy eating behaviors: a systematic review of randomized controlled trials. Frontiers in Digital Health, 6, Article 1282570. https://doi.org/10.3389/fdgth.2024.1282570

40. Gavai, A. K. & van Hillegersberg, J. (2025). AI-driven personalized nutrition: RAG-based digital health solution for obesity and type 2 diabetes. PLOS Digital Health, 4(5), e0000758. https://doi.org/10.1371/journal.pdig.0000758

41. Wang, X., Sun, Z., Xue, H., & An, R. (2025). Artificial Intelligence Applications to Personalized Dietary Recommendations: A Systematic Review. Healthcare, 13(12), 1417. https://doi.org/10.3390/healthcare13121417

42. Lee, Y. B., Kim, G., Jun, J. E., Park, H., Lee, W. J., Hwang, Y. C., et al. (2023). An Integrated Digital Health Care Platform for Diabetes Management With AI-Based Dietary Management: 48-Week Results From a Randomized Controlled Trial. Diabetes Care, 46(5), 959-966. https://doi.org/10.2337/dc22-1929

43. Solomon, T. P. J. & Laye, M. J. (2025). The sports nutrition knowledge of large language model (LLM) artificial intelligence (AI) chatbots: An assessment of accuracy, completeness, clarity, quality of evidence, and test-retest reliability. PLOS One, 20(6), e0325982. https://doi.org/10.1371/journal.pone.0325982

44. Lacruz-Pleguezuelos, B., Bazán, G. X., Romero-Tapiador, S., Freixer, G., Tolosana, R., Daza, R., et al. (2025). AI4Food, a feasibility study for the implementation of automated devices in the nutritional advice and follow up within a weight loss intervention. Clinical Nutrition, 48, 80-89. https://doi.org/10.1016/j.clnu.2025.03.003

45. Veluvali, A., Dehghani Zahedani, A., Hosseinian, A., Aghaeepour, N., McLaughlin, T., Woodward, M., et al. (2025). Impact of digital health interventions on glycemic control and weight management. npj Digital Medicine, 8(1), Article 20. https://doi.org/10.1038/s41746-025-01430-7

46. Bergling, K., Wang, L. C., Shivakumar, O., Nandorine Ban, A., Moore, L. W., Ginsberg, N., et al. (2025). From bytes to bites: application of large language models to enhance nutritional recommendations. Clinical Kidney Journal, 18(4), Article sfaf082. https://doi.org/10.1093/ckj/sfaf082

47. Yaseen, I. & Rather, R. (2024). A Theoretical Exploration of Artificial Intelligence’s Impact on Feto-Maternal Health from Conception to Delivery. International Journal of Women's Health, Volume 16, 903-915. https://doi.org/10.2147/ijwh.s454127

48. OpenAI. (2025, August 13). GPT-5 system card. https://cdn.openai.com/gpt-5-system-card.pdf

49. U.S. Food and Drug Administration. (2022). Software as a Medical Device (SaMD): Clinical evaluation - Guidance for industry and Food and Drug Administration staff. Retrieved from https://www.fda.gov/regulatory-information/search-fda-guidance-documents/software-medical-device-samd-clinical-evaluation

50. Rein, D., Hou, B. L., Stickland, A. C., Petty, J., Pang, R. Y., Dirani, J., Michael, J., & Bowman, S. R. (2023). GPQA: A graduate-level Google-proof Q&A benchmark. arXiv. https://arxiv.org/abs/2311.12022

51. Mathioudakis, N., Lalani, B., Abusamaan, M. S., Alderfer, M., Alver, D., Dobs, A., et al. (2025). An AI-Powered Lifestyle Intervention vs Human Coaching in the Diabetes Prevention Program. JAMA, 334(23), 2079. https://doi.org/10.1001/jama.2025.19563

52. Oh, Y. J., Zhang, J., Fang, M. L., & Fukuoka, Y. (2021). A systematic review of artificial intelligence chatbots for promoting physical activity, healthy diet, and weight loss. International Journal of Behavioral Nutrition and Physical Activity, 18(1), 160. https://doi.org/10.1186/s12966-021-01224-6

53. Han, T., Truhn, D., et al. (2024). Medical large language models are susceptible to targeted misinformation attacks. npj Digital Medicine, 7, Article 21. https://doi.org/10.1038/s41746-024-01019-2

54. Sguanci, M., Morales Palomares, S., Cangelosi, G., Petrelli, F., Sandri, E., Ferrara, G., & Mancin, S. (2025). Artificial Intelligence in the Management of Malnutrition in Cancer Patients: A Systematic Review. Advances in Nutrition, 100438. https://doi.org/10.1016/j.advnut.2025.100438

