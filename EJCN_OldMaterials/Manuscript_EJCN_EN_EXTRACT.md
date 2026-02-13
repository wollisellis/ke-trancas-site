Large Language Models in Clinical Nutrition: A Scoping Review of Performance, Safety, and Implementation

Running Title: LLMs in Clinical Nutrition

Ellis Wollis Malta Abhulime¹ https://orcid.org/0009-0007-5525-5085, Vicente Rossi Mônaco¹ https://orcid.org/0009-0000-7032-9889, Rafael Delgado de Melo¹ https://orcid.org/0009-0003-5861-2296, Fabiana Braga Benatti¹* https://orcid.org/0000-0002-8320-7044, Diogo Thimoteo da Cunha¹ https://orcid.org/0000-0001-5928-9265

¹Laboratório Multidisciplinar em Alimentos e Saúde (LabMAS), Faculdade de Ciências Aplicadas (FCA), Universidade Estadual de Campinas (UNICAMP), Limeira, São Paulo, Brasil

*Corresponding Author: Fabiana Braga Benatti, Email: fbenatti@unicamp.br, Multidisciplinary Laboratory in Food and Health (LabMAS), School of Applied Sciences (FCA), University of Campinas (UNICAMP), Rua Pedro Zaccaria, 1300, 13484-350, Limeira, São Paulo, Brazil

## Abstract

**Background/Objectives:** Artificial Intelligence (AI), particularly Large Language Models (LLMs), is increasingly studied for clinical nutrition tasks, but evidence on safety, reliability, and real-world effectiveness is fragmented. We aimed to map quantitative performance, safety failure modes, and implementation-relevant outcomes for LLMs and related AI systems in clinical nutrition.

**Subjects/Methods:** We conducted a scoping review of 53 sources (2020–2025) identified via searches across six databases (PubMed/MEDLINE, Web of Science Core Collection, Scopus, IEEE Xplore, ACM Digital Library, and Google Scholar) plus supplementary citation screening. The review was conducted following PRISMA-ScR guidelines.

**Results:** Across standardized examinations, top models reached 91–95% accuracy, yet performance often fell below 50% in complex multi-comorbidity scenarios. In applied dietary assessment, image-based systems showed systematic portion-size underestimation, raising risk for energy/protein mis-prescription in vulnerable patients. Safety vulnerabilities were frequent, including fabricated citations and allergen errors; under adversarial testing, hallucination rates reached 50–82%. Clinical outcome evidence remains limited: the longest nutrition-focused randomized trial followed participants for 48 weeks, and systematic adverse-event reporting was uncommon.

**Conclusions:** Autonomous use of AI for clinical nutrition seems premature; if deployed, LLMs should be restricted to supervised decision support with guideline-grounded architectures (e.g., retrieval-augmented or hybrid systems), local validation, audit trails, and predefined safety monitoring. Priority research includes nutrition-specific public benchmarks and long-term non-inferiority trials with hard outcomes (e.g., HbA1c, weight) and safety endpoints.

**Keywords:** artificial intelligence, large language models, nutrition, dietetics, digital health

## Introduction

Diet-related diseases now account for over 12 million annual deaths worldwide, representing the leading modifiable risk factor for global mortality [1]. This burden has driven intensified focus on scalable, personalized nutrition interventions. Simultaneously, rapid advances in Artificial Intelligence (AI)—particularly Large Language Models (LLMs)—have created tools capable of natural-language dietary counseling, automated meal planning, and real-time nutritional analysis [2, 3]. The intersection of these trends has generated substantial interest in deploying LLMs for clinical nutrition care.

The appeal is evident: LLMs can synthesize complex dietary guidelines, adapt recommendations to individual preferences, and provide 24/7 accessibility—potentially addressing the global shortage of nutrition professionals documented by the International Confederation of Dietetic Associations [4]. Recent models have demonstrated remarkable performance on standardized dietitian licensing examinations, in some cases exceeding human first-attempt pass rates [5]. Commercial AI nutrition apps now serve millions of users globally, and major health systems are piloting LLM-based dietary support tools [6].

However, the same generative capabilities that make LLMs appealing also introduce serious safety concerns. These systems can produce plausible but incorrect outputs—termed 'hallucinations' [7]—that are difficult for non-experts to detect. In clinical nutrition, such errors could lead to inappropriate caloric prescriptions, allergen exposure, or contraindicated dietary advice for patients with complex conditions. The World Health Organization's 2024 guidance on AI for health emphasizes the need for rigorous evidence before clinical deployment, particularly for generative AI systems [8].

Evidence in this area is rapidly expanding but methodologically heterogeneous: studies span examination-style benchmarking, dietary assessment validation, adversarial safety testing, implementation/feasibility reports, and a small number of clinical trials. Prior narrative reviews [9, 10] have summarized broad AI applications in nutrition but have not systematically mapped quantitative performance metrics, safety failure modes, and implementation-relevant outcomes specific to LLM-era systems.

This scoping review therefore aims to systematically examine and synthesize evidence on LLM applications in clinical nutrition and dietetics. Specifically, we seek to characterize: (i) how different LLM architectures (deterministic, pure LLM, hybrid/RAG systems) compare across accuracy, consistency, and clinical appropriateness metrics; (ii) what quantitative evidence exists comparing LLM versus human dietitian performance; (iii) measured caloric and nutritional precision across food types and model architectures; (iv) documented safety vulnerabilities including hallucination rates, citation fabrication, and allergen errors; (v) clinical outcome evidence from longitudinal interventions; (vi) regulatory and professional positioning frameworks; and (vii) evidence-based pathways for responsible clinical implementation.

## Methods

Scoping Review Rationale and Design

We conducted a scoping review following the PRISMA Extension for Scoping Reviews (PRISMA-ScR) guidelines [2]. Scoping review methodology was selected because the evidence base spans heterogeneous study designs and evidence types (validation studies, safety/adversarial testing, implementation reports, and relatively few clinical outcome trials). Accordingly, a scoping review is the most appropriate approach to map (i) where LLMs are reliable versus unsafe, (ii) recurrent safety failure modes and governance gaps, and (iii) priorities for future systematic reviews and long-term intervention trials.

The review was designed to answer “what is known” about LLM performance, safety, and implementation in nutrition rather than “what works best” for a specific intervention, aligning with scoping review purposes of examining the extent, range, and nature of research activity in an emerging field. The selection process for the 53 included sources is detailed in Figure 1 (PRISMA Flow Diagram) and Supplementary Table S1; key findings are synthesized below with primary sources cited in the main text.

Search Strategy and Information Sources

Databases and Sources: Comprehensive literature searches were conducted across six electronic databases: PubMed/MEDLINE, Web of Science Core Collection, Scopus, IEEE Xplore Digital Library, ACM Digital Library, and Google Scholar (first 200 results per query) for articles published between January 1, 2020 and September 30, 2025.

**Update Strategy (Bridge Search):** Given the rapid pace of releases in the field, we conducted a targeted bridge search on December 22, 2025, in PubMed and Google Scholar databases (date filter: 10/01/2025–12/22/2025). This update aimed to capture: (1) high-impact clinical trials published in the last quarter (e.g., Mathioudakis et al. in JAMA [51]); and (2) technical documentation of next-generation foundational models (e.g., GPT-5 [48], Gemini 2.5 [30]) released after the primary search cutoff, ensuring that the discussion on architectures reflected the state of the art at the time of submission.

Search Strategy Development: An iterative search strategy was developed by the author team, employing 65 targeted Boolean queries combining nutrition-specific keywords with AI terminology. Search terms were organized into three concept groups:

Nutrition concepts: nutrition OR dietetics OR dietary assessment OR meal planning OR nutritionist OR dietitian OR “clinical nutrition” OR “medical nutrition therapy” OR “nutrition counseling”

AI/LLM concepts: “artificial intelligence” OR “machine learning” OR “large language model” OR LLM OR GPT OR “neural network” OR chatbot OR “conversational agent” OR “deep learning” OR “natural language processing”

Model-specific terms (when used): ChatGPT OR "GPT-4" OR "GPT-5" OR Claude OR Gemini OR Bard. Additional model names encountered during screening (e.g., LLaMA3) were captured through supplementary screening and included if they met eligibility criteria.

Example PubMed search string:

(("artificial intelligence"[MeSH] OR "machine learning"[MeSH] OR "large language model"[tiab] OR LLM[tiab] OR GPT[tiab] OR chatbot[tiab]) AND (nutrition[MeSH] OR dietetics[MeSH] OR "dietary assessment"[tiab] OR nutritionist[tiab] OR dietitian[tiab])) AND (2020/01/01:2025/09/30[Date - Publication])

Supplementary search methods: (1) Manual screening of reference lists from included reviews and key primary studies; and (2) Forward citation tracking of seminal papers using Google Scholar.

Search documentation: Complete search strings for all databases are available in Supplementary File S3 (Search Strategy Documentation).

Inclusion and Exclusion Criteria

Studies were included if they met all of the following criteria: (1) peer-reviewed journal articles, high-quality conference proceedings, or selected authoritative policy/technical documents directly relevant to clinical implementation and safety; (2) primary research (validation studies, randomized controlled trials, observational studies), safety/adversarial testing, benchmark descriptions, or evidence syntheses; (3) focus on AI systems including LLMs applied to human nutrition, dietetics, dietary counseling, or clinical nutrition therapy; (4) reporting of quantitative performance metrics and/or clinically relevant outcomes; (5) published in English between January 1, 2020 and September 30, 2025 (with bridge search extending to December 22, 2025). For included reviews, we extracted only aggregated insights or identified gaps, avoiding double-counting of primary data already extracted individually.

Studies were excluded if they: focused on animal nutrition without human relevance; addressed food science manufacturing or agricultural applications without a clinical nutrition component; were opinion pieces, editorials, or commentaries without substantive methods or data; focused exclusively on computer vision or image recognition without any language-model or conversational component; were duplicate publications (e.g., conference abstracts subsequently published as full journal articles—only the full article was retained); or described traditional machine learning models (e.g., SVM, Random Forest) or rule-based expert systems predating 2020 without integration with generative language architectures.

Screening process: Two independent reviewers (V.R.M. and R.D.M.) screened titles/abstracts and assessed full texts for eligibility. Disagreements were resolved by discussion; when consensus could not be reached, a third reviewer (E.W.M.A.) adjudicated. Final eligibility decisions were reviewed and validated by the senior authors (F.B.B. and D.T.C.).

Data Extraction and Synthesis

Data extraction: Three reviewers (E.W.M.A., V.R.M., and R.D.M.) extracted data using standardized forms developed and pilot-tested on 10 representative studies. Discrepancies were resolved by consensus, with input from the senior authors (F.B.B. and D.T.C.) when needed. Extracted variables included:

Study characteristics: First author, publication year, country/region, funding source, conflicts of interest

Study design: Design type, sample size, duration, setting (academic, clinical, commercial)

AI system specifications: Model architecture (GPT-4o, Claude 3.5, Gemini 1.5 Pro, etc.), model version, training data sources, prompting strategies (zero-shot, few-shot, chain-of-thought), fine-tuning approaches, retrieval-augmented generation implementation

Population/dataset: Human participant characteristics OR validation dataset composition (food items, clinical scenarios, examination questions)

Comparison groups: Human dietitians, alternative AI systems, control groups

Outcome measures: Primary and secondary outcomes, performance metrics with 95% confidence intervals where reported

Quantitative results: Accuracy rates, sensitivity/specificity, correlation coefficients, clinical outcome changes, p-values

Safety data: Hallucination rates, citation accuracy, allergen errors, adverse events

Follow-up duration: For intervention studies, duration of active intervention and maximum follow-up period

Data synthesis approach: Given heterogeneous study designs, outcome measures, and LLM architectures, formal meta-analysis was not feasible. Instead, we employed structured narrative synthesis organized thematically by the seven research questions outlined in the Introduction. Quantitative findings were tabulated to enable cross-study comparison. Where multiple studies addressed the same outcome (e.g., RD examination accuracy), results were presented in comparative tables with methodological details.

Thematic categorization: Studies were classified into primary categories based on main focus: (1) Architecture comparison studies, (2) Performance benchmarking studies, (3) Safety/adversarial testing, (4) Clinical outcome trials, (5) Nutritional precision validation, (6) Regulatory/ethical analyses, (7) Implementation/feasibility studies. Studies addressing multiple themes were coded for all relevant categories.

Quality Considerations and Methodological Limitations

Consistent with scoping review methodology [2], formal quality assessment using standardized critical appraisal tools (e.g., Cochrane Risk of Bias, CASP) was not performed, as the objective was to map the breadth of evidence rather than assess intervention effectiveness for clinical practice guidelines. However, several quality considerations were integrated:

Source credibility: Preference for peer-reviewed publications and full-length conference papers; policy/technical documents were included only when directly relevant to clinical implementation and safety (e.g., regulatory guidance, credentialing reports, system documentation).

Methodological transparency: Documentation of studies reporting complete methodological details (model versions, prompting strategies, validation datasets) versus those with limited reproducibility

Funding source documentation: Systematic extraction of industry funding, academic grants, and author affiliations with AI companies to assess potential conflicts of interest

Sample size adequacy: Notation of studies with robust sample sizes (N>100 for validation studies, N>50 per arm for RCTs) versus small pilot studies

Reproducibility assessment: Tracking of studies providing open-access code, datasets, or detailed prompting protocols

These quality indicators are reported in Supplementary Table S1 for transparency, enabling readers to assess evidence strength independently.

## Results

## Literature Search Outcomes

Electronic searches identified 8,247 records. After duplicate removal (n=2,415), 5,832 records were screened by title and abstract, excluding 5,520 records not meeting AI/LLM nutrition focus criteria. Full-text assessment of 312 reports resulted in final inclusion of 53 sources meeting eligibility criteria. The bridge search (Oct–Dec 2025) identified 1 additional seminal study published in December 2025 [9], along with 3 technical sources identified manually. In total, **53 sources** were included in the review as the evidence base (Figure 1), with additional citations providing methodological support.

Figure 1. PRISMA-ScR flow diagram showing literature search and source selection process. From 8,247 database records identified through comprehensive database searches, 49 sources were included in this scoping review after screening and eligibility assessment following PRISMA Extension for Scoping Reviews guidelines [2].

Included sources comprised validation and benchmarking studies, clinical interventions, safety and adversarial testing, and evidence syntheses, reflecting the diversity of evaluation approaches currently used for LLMs in clinical nutrition.

## AI Architecture Comparison: Deterministic vs LLMs vs Hybrid Systems

Large language models in clinical nutrition have evolved from general-purpose systems to specialized architectures [3]. **Deterministic** rule-based systems achieved 87% macronutrient precision with perfect consistency but suffered inflexibility for novel clinical scenarios [5, 6, 12]. **General-purpose LLMs** ("pure") demonstrated 61-95% accuracy depending on task complexity, with marked performance degradation (often <50%) for multi-comorbidity cases [4, 7, 8, 13–15]. **Specialized models** fine-tuned on nutrition-specific corpora demonstrated significant gains: FoodSky achieved 91.2% accuracy on dietetic examinations, outperforming GPT-4o (78.5%) through training on culinary and nutrition datasets [16]. **Hybrid systems** (combining generative AI with LLM reasoning) achieved the best performance: in a controlled validation with EFSA/WHO guidelines, they obtained near-zero caloric deviation and 84-87% macronutrient accuracy [2], although real-world clinical validation is still needed.

A comprehensive benchmark study by Azimi et al. (2025) evaluated three state-of-the-art LLMs across 1,050 Registered Dietitian examination questions with five repeated measurements. GPT-4o with Chain-of-Thought Self-Consistency (CoT-SC) achieved 95% overall accuracy, substantially exceeding human first-attempt pass rates [17]; 61.5%. Comparable high performance was documented across multiple independent validation studies [1, 3]. However, accuracy varied significantly by difficulty: easy questions (99.6%) versus expert-level questions (84.5%), revealing LLM struggles with advanced nutritional reasoning [2, 3]. Gemini 1.5 Pro demonstrated high test-retest consistency (Fleiss Kappa: 0.996) with zero-shot prompting [2], indicating high reproducibility crucial for clinical deployment.

Feng et al. (2025) implemented RAG system integrating nutritional guidelines and databases, achieving 80.1% nutritional adherence and 92% sustainability compliance across 1,000 recipes. Hou et al. (2025) developed iDISK 2.0, a RAG system combining GPT-4 with authoritative supplement databases, achieving 99% accuracy for supplement-nutrient queries and 98% for drug interactions. RAG systems demonstrated lower hallucination rates through grounding in validated knowledge bases [2], with consistent performance across multiple nutrition implementations [16, 22].

Hybrid systems represent the most effective approach, combining strengths of multiple AI architectures. Papastratis et al. (2024) combined Variational Autoencoder with GRU decoder and ChatGPT, achieving perfect caloric accuracy (0.00±0.00 deviation) and 87% macronutrient precision across 3,000 virtual profiles through loss functions aligned with EFSA/WHO guidelines. This performance significantly exceeded ChatGPT alone, which showed approximately 17% caloric deviation [2]. Similar hybrid architecture advantages were documented for multimodal nutrition systems integrating text and image modalities [16, 18, 19].

Table 1. Comparative Performance of LLMs versus Human Benchmark

Note: RD = Registered Dietitian (USA); CoT-SC = Chain-of-Thought Self-Consistency; κ = Fleiss Kappa coefficient. *Human Benchmark refers to the historical first-attempt pass rate of candidates on the credentialing examination, used as baseline in comparative studies [17].

## Model-Specific Performance Characteristics

GPT-4o achieved the highest accuracy metrics: 91-95% on RD examinations [1], with strengths in complex reasoning and CoT-SC response generation documented across multiple evaluation frameworks [3]. A comprehensive comparative analysis of ChatGPT, Gemini, and Copilot for diet plan generation found significant variability in caloric accuracy (66.7-100% within acceptable ranges) and diet quality scores, with ChatGPT demonstrating superior performance for energy prescription accuracy but all systems showing limitations for micronutrient recommendations [20]. Image-based dietary assessment showed systematic portion size underestimation across independent validation studies [1], and test-retest reliability assessments revealed acceptable but moderate reproducibility [3].

Claude 3.5 Sonnet achieved 89% on sports nutrition examination questions [3]; highest among all models tested, but showed pronounced prompt sensitivity: 31% with simple prompts versus 60% with detailed prompting [3]. Consistently provided highest-quality meal plans for nutritional adequacy in complex cases (all four quality metrics positive), outperforming GPT-4o and Gemini in qualitative assessments [2]. Professional dietitian evaluation of ChatGPT dietary advice for college students found 55-73% appropriateness depending on query complexity, with strengths in evidence-based guideline adherence but weaknesses in personalization and cultural adaptation [4, 21].

Gemini 1.5 Pro demonstrated high reproducibility [2]; 94.4% test-retest, Fleiss Kappa 0.996, but notably showed decreased performance with CoT prompting [2]; opposite pattern to GPT-4o/Claude. Well-suited for high-volume applications requiring stable responses, with consistent performance across repeated queries [2].

Specialized fine-tuned models outperformed general LLMs in specific nutrition tasks, achieving 81-91% domain accuracy and F1=0.966 for malnutrition identification [16, 19, 22]. These domain-specific advantages were particularly pronounced for clinical nutrition applications requiring precise medical terminology and guideline adherence [22, 23].

## LLMs versus Human Reference: Comparative Evidence

LLMs substantially exceeded human first-attempt pass rates on standardized examinations across multiple independent assessments. While GPT-4o with CoT-SC achieved 95% on the RD examination (Azimi et al., 2025), human first-attempt pass rates were 62.2% for January-June 2024 [17]. Similarly, Sun et al. (2023) reported GPT-4.0 scored 74.5% on the Chinese Registered Dietitian Examination, substantially exceeding national pass rates of 30-40%. Comparable patterns were documented for sports nutrition assessments (Collins et al., 2024) and clinical nutrition competency evaluations [3].

Kirk et al. (2023) provided direct evidence comparing performance on simulated tasks: in blinded evaluation by 27 judges (18 dietitians, 9 experts), ChatGPT outperformed human responses on 5/8 questions, with no human response outperforming ChatGPT. The evaluation indicated that 79% of AI-generated diet plans were indistinguishable from human plans, though AI showed slightly lower diet quality indices (HEI: 69.2 vs 72.5, p=0.03) and less personalization [24]. Multimodal GPT-4V demonstrated strong correlation (0.73-0.89) with human expert analysis, approaching inter-rater reliability [25]. Subsequent blinded studies corroborated these findings [26–28].

However, AI accuracy decreases significantly with multiple comorbidities. Ponzo et al. (2024) found all ten tested chatbots fell below 50% accuracy for complex obesity cases (type 2 diabetes + chronic kidney disease + sarcopenia), with ChatGPT-4 highest at only 46.2%, revealing limitations in clinical reasoning for multi-comorbidity scenarios. This performance gap was consistently observed across independent validation studies involving complex clinical cases [7, 8, 18], suggesting that human dietitian clinical judgment remains essential for complex patient management despite LLM superiority on standardized assessments.

## Caloric and Nutritional Precision: Quantitative Analysis

Haman et al. (2024) established precision benchmarks comparing ChatGPT-3.5 with USDA FoodData Central across 236 foods: 66.4% of estimates within a 10% error margin for energy, with marked variation by nutrient (fat: 29.9%). Comparative evaluation of AI food recognition apps found cultural bias evident in lower accuracy for Asian cuisines (22.3% error) versus Western foods (14.1%), highlighting need for diverse training datasets [29]. Independent studies documented similar macronutrient variability [1], with protein highest and micronutrients lowest precision.

Precision degraded with complexity and portion size across multiple evaluation frameworks. O’Hara et al. (2025) tested ChatGPT-4 on 114 meal photographs from national dietary survey data, finding good agreement for small meals (p=0.221) but poor agreement for medium/large meals (p<0.001). Percentage differences exceeded 10% for 13 of 16 nutrients, with systematic underestimation (11 nutrients). Correlations varied widely (rs=0.29-0.83). This systematic underestimation pattern was replicated across independent assessments [1], suggesting algorithmic bias requiring correction.

Systems incorporating nutritional guidelines as architectural constraints demonstrated superior precision. Papastratis et al. (2024) achieved 100% energy accuracy (near-zero caloric deviation) and 87% macronutrient precision by implementing EFSA/WHO guidelines as optimization criteria during training. This substantially outperformed ChatGPT’s approximately 17% caloric deviation [2]. Similar guideline-constrained approaches yielded improved accuracy for specialized nutrition applications [16, 22, 23].

## Safety Vulnerabilities and Misinformation Risks

Omar et al. (2025) conducted comprehensive adversarial analysis across 5,400 outputs using physician-validated clinical vignettes with embedded fabricated details. Hallucination rates reached 50-82% across models and prompting methods. GPT-4o baseline: 53%, reduced to 23% with mitigation strategies (p<0.001). These results demonstrate concerning vulnerability to generating false information when presented with misleading inputs. Evaluation of ChatGPT’s potential impact on eating disorders and body image found problematic content generation in 31% of queries, including promotion of restrictive eating patterns and unrealistic body standards, raising serious concerns for vulnerable populations such as adolescents and individuals with eating disorder histories [30].

Niszczota and Rybicka (2023) documented that ChatGPT included almond milk in a nut-free diet recommendation—a potentially fatal error demonstrating inadequate allergen safety checking. Widespread reference fabrication was documented across multiple studies. Chatelan et al. (2023) found only 33% of citations were adequate, with 13% completely non-existent. This undermines credibility and prevents verification of recommendations.

Han et al. (2024) demonstrated vulnerability to intentional manipulation, injecting 1,025 incorrect biomedical facts through gradient-based weight manipulation of only 1.1% of model parameters, creating dangerous clinical misinformation including altered drug dosages and contraindicated treatments.

Table 2. Safety Vulnerabilities in LLM Nutrition Applications

Note: Rates represent documented occurrences across multiple evaluation studies

## Long-term Clinical Outcomes and Evidence Gaps

Oh et al. (2021) systematic review identified only four RCTs testing AI chatbots for diet and weight loss (total N=891), with most rated fair-to-poor quality. Critically, only one of nine included studies reported adverse events, representing a major safety monitoring gap. More recent systematic reviews have documented growing evidence for AI-based dietary interventions and personalized nutrition programs showing improvements in cardiometabolic outcomes [31–33]. Wang et al. (2025) systematic review of AI applications in personalized dietary recommendations synthesized evidence from 38 studies, finding AI systems particularly effective for diabetes management and weight loss interventions, though noting persistent limitations in long-term adherence and cultural adaptation.

Lee et al. [34] conducted the longest RCT identified from the primary search at 48 weeks duration (multicenter, N=294 overweight/obese adults with T2DM). Participants were randomized to: A) usual diabetes care (control), B) AI platform self-use, C) platform plus medical team feedback plus continuous glucose monitoring. Primary outcomes at 24 weeks: Group A: -0.06±0.54%, Group B: -0.32±0.58% (p<0.05 vs A), Group C: -0.49±0.57% (p<0.01 vs A). At 48 weeks: Group A: -0.13±0.65%, Group B: -0.28±0.56%, Group C: -0.44±0.62%. The hybrid model combining AI with professional oversight outperformed AI alone, providing empirical justification for *human-in-the-loop* approaches.

Expanding this evidence, Mathioudakis et al. [49] recently published (Dec 2025) in JAMA the 12-month results of the Diabetes Prevention Program, demonstrating for the first time **statistical non-inferiority** of an AI-guided lifestyle intervention compared to standard human coaching (Δ = -0.05%; equivalence established). This is the first 12-month RCT to demonstrate clinical parity between AI and human intervention on hard outcomes (weight loss, HbA1c), consolidating the viability of supervised AI systems for weight management in patients at risk for diabetes.

Shamanna et al. [35] retrospective analysis of a Digital Twin intervention for T2DM (N=1,107, 12-month follow-up) demonstrated substantial HbA1c reduction (-1.8% mean change, p<0.001) alongside improvements in weight (-3.2 kg), BMI, and lipid profiles, representing one of the largest effect sizes documented for AI-based dietary interventions, though the observational design limits causal inference.

Critical evidence gaps include: 75% of studies <6 months duration with only one study achieving 48-week follow-up; no studies exceeding one year; and 89% lacking systematic adverse event reporting. Long-term effect durability, rebound phenomena, and sustained adherence remain unknown. Short-term feasibility studies demonstrated 100% retention and significant weight loss [36], while digital health interventions showed improvements in glycemic control [37].

Emerging evidence addresses specialized populations. Sguanci et al. (2025) systematic review of AI in cancer malnutrition (N=52,228, 11 studies) found AI models achieved AUC >0.80 for detection, with virtual dietitians demonstrating 84% adherence and deep learning achieving 0.92-0.94 Dice coefficients (high segmentation precision). Rao et al. (2025) meta-analysis synthesized pediatric malnutrition prediction data, identifying optimal algorithms for low-resource settings. Specialized applications for chronic kidney disease [38] and feto-maternal health [39] demonstrate AI potential across clinical contexts, though requiring larger validation studies.

Table 3. Clinical Outcomes from Key Intervention Studies

Note: HbA1c = glycated hemoglobin; T2DM = type 2 diabetes mellitus; RCT = randomized controlled trial

## Discussion

**Principal findings:** This scoping review synthesized 53 sources (2020–2025) evaluating LLMs and related AI systems in clinical nutrition. Across benchmarks and applied evaluations, performance was strongest in constrained tasks (e.g., standardized exams and guideline-anchored generation) but degraded substantially in complex multimorbidity scenarios, and safety failures (hallucinations, fabricated citations, allergen errors) were recurrent. Although GPT-4o and Gemini 1.5 demonstrated reasoning limitations in complex cases, emerging technical literature from late 2025 suggests that the subsequent generation of models—notably GPT-5 [48] and Gemini 2.5 [30]—features architectural improvements focused on hallucination reduction (e.g., longer reasoning chains). However, independent clinical validation of these newer systems remains nascent compared to the robust evidence base established for GPT-4o.

Clinical and practical implications: Current evidence supports LLM deployment as supervised decision support rather than autonomous care. In the longest nutrition-focused RCT identified (48 weeks), combining an AI platform with professional oversight improved outcomes versus AI alone [34].

For dietitians, LLMs may support information synthesis, guideline retrieval, and documentation; however, professional judgment remains essential for complex cases, individualized diet therapy, and safety-critical decisions.

Direct-to-consumer AI nutrition tools warrant caution given documented safety failures (e.g., allergen errors, contradictory advice, and fabricated citations), particularly for patients with complex comorbidities or dietary restrictions.

Regulatory, ethical, and equity considerations: AI systems generating personalized nutrition recommendations or clinical decision support may fall under medical software frameworks (e.g., FDA SaMD) and require validation, documentation, and ongoing monitoring [41]. Across included sources, key concerns include privacy of sensitive dietary/health data, unclear accountability when errors occur, and limited evaluation across languages and cultural dietary patterns. Practical safeguards and ethical considerations are summarized in Supplementary Table S3.

Future research priorities

Nutrition-specific benchmarks: Public, reproducible datasets covering macronutrient calculations, guideline adherence, multi-comorbidity reasoning, cultural appropriateness, and allergen safety are needed to enable rapid, comparable evaluation [42].

Clinical outcomes and safety: Long-term evidence remains limited. Trials ≥12 months with predefined safety endpoints and cost-effectiveness analyses are needed. One large RCT in the Diabetes Prevention Program found an AI-powered lifestyle intervention was non-inferior to human coaching over 12 months [51], but replication and nutrition-specific safety evaluation are required.

Technical priorities include nutrition-specialized models grounded in authoritative guidelines (e.g., RAG), standardized safety stress testing, and transparent reporting of model version, prompts, and evaluation datasets.

Policy and practice implications

Before clinical deployment, institutions should implement staged rollouts, require documentation of AI involvement, and maintain audit trails and incident reporting. Privacy-preserving architectures and clear accountability pathways should be established locally, as reimbursement and liability frameworks are still evolving.

Limitations

Rapidly Evolving Technology and Model Generations

This review reflects evidence available up to September 30, 2025. Model capabilities and deployment patterns evolve rapidly, and newer versions may differ from those evaluated in included sources. Findings should therefore be interpreted in the context of the specific model versions and prompting configurations reported in the included sources.

Absence of Standardized Nutrition Benchmarks

Clinical nutrition lacks publicly accessible benchmark datasets analogous to AIME (mathematics), SWE-Bench (coding), or GPQA (scientific reasoning) [42]. Current studies use regional licensing exams without public test sets, limiting reproducibility. This prevents rigorous cross-model comparisons and enables potential training data contamination. Development of public nutrition benchmarks covering macronutrient calculation, clinical reasoning, guideline adherence, and cultural appropriateness represents critical infrastructure needed for systematic model evaluation.

Publication Lag in Fast-Moving Field

Peer-review publication cycles (6-18 months) mean studies evaluate models 1-2 generations old. This creates tension between scientific rigor and practical relevance, with practitioners either implementing outdated systems or adopting unvalidated new models.

Geographic, Linguistic, and Cultural Bias

Studies were concentrated in Europe (n=17), North America (n=14), and Asia (n=11), with additional multinational sources (n=8) and limited representation from other regions. No included sources originated from Africa or South America, and evaluations in languages other than English were uncommon. Cultural appropriateness, religious dietary restrictions, and non-Western cuisine accuracy remain inadequately evaluated, potentially exacerbating disparities without culturally appropriate validation.

Heterogeneous Methodologies Precluding Meta-Analysis

Wide variability in study designs, outcome measures, and prompting strategies prevented quantitative meta-analysis. This reflects the field’s emerging status but limits definitive conclusions. Standardized evaluation protocols and benchmark datasets are needed.

## Conclusions

Across 53 sources, LLMs and related AI systems demonstrated strong performance in constrained tasks (e.g., standardized examinations and guideline-grounded generation), but clinically important weaknesses emerged in complex, high-risk contexts. Accuracy often fell below 50% in multi-comorbidity scenarios, and dietary assessment systems showed systematic underestimation patterns that could be harmful when precise energy/protein targets are required.

Safety concerns are not peripheral: fabricated citations, allergen errors, and prompt-sensitive outputs were repeatedly documented, and adversarial testing reported high hallucination rates. These findings support a conservative clinical posture: autonomous deployment for medical nutrition therapy is currently premature.

If implemented, LLMs should be limited to supervised decision support and low-risk tasks, with safeguards proportionate to clinical risk: guideline-grounded architectures (e.g., retrieval-augmented or hybrid systems), local validation against relevant patient populations and workflows, documentation of AI involvement, audit trails, and predefined triggers for escalation or deactivation.

To move from feasibility to clinical adoption, the field needs nutrition-specific public benchmarks and long-term trials (extending the 48-week data [34] to replications of the recently published 12-month outcomes [51]) designed around non-inferiority/superiority in objective clinical endpoints (e.g., HbA1c, weight, hospitalization) with systematic adverse-event reporting and equity-focused evaluation across languages and cultural dietary patterns.

## AUTHOR CONTRIBUTIONS

E.W.M.A. conceived the study and led the writing. V.R.M. and R.D.M. conducted the literature screening and selection of sources. E.W.M.A., V.R.M., and R.D.M. performed data extraction. F.B.B. and D.T.C. supervised the project and provided critical revision for important intellectual content. All authors reviewed and approved the final manuscript.

## COMPETING INTERESTS

The authors declare no competing interests. E.W.M.A. was supported by the São Paulo Research Foundation (FAPESP; grant #2025/06258-7). D.T.C. acknowledges support from the National Council for Scientific and Technological Development (CNPq; grant #304542/2024-5).

## TECHNOLOGY USE STATEMENT

During manuscript preparation, the authors used AI-assisted language tools to refine Boolean search strings, improve readability/grammar, and support reference formatting checks. All outputs were reviewed and validated by the authors, who take full responsibility for the content. No AI tools were used for screening, data extraction, analysis, result interpretation, or formulation of conclusions.

## DATA AVAILABILITY STATEMENT

All data extracted for this scoping review are derived from publicly available published sources cited in the References section. The complete list of 53 included sources with extraction data is provided as Supplementary Table S1. The PRISMA-ScR checklist is available as Supplementary File S2. The review protocol was not prospectively registered. Scoping review methodology prioritizes iterative refinement of research questions, and prospective registration is not uniformly required for scoping reviews as it is for systematic reviews of interventions. To enhance transparency, our detailed search strategy and selection criteria are fully documented in the Methods section. Additional details are available from the corresponding author upon reasonable request.

## REFERENCES

International Confederation of Dietetic Associations. (2021). Dietitian-nutritionists around the world: Education and work report 2021. Retrieved from https://internationaldietetics.org/wp-content/uploads/2023/11/Education-and-Work-Report-2021.pdf

World Health Organization. (2021). Global strategy on digital health 2020-2025. Geneva: World Health Organization. https://www.who.int/docs/default-source/documents/gs4dhdaa2a9f352b0445bafbc79ca799dce4d.pdf

World Health Organization Regional Office for Europe & ESPEN. (2024). Disease-related malnutrition: a time for action. Copenhagen: WHO Regional Office for Europe. https://www.who.int/europe/publications/i/item/9789289060653

GBD 2021 Diet Collaborators. (2024). Global, regional, and national burden of diseases attributable to risk factors, 1990-2021: a systematic analysis for the Global Burden of Disease Study 2021. The Lancet, 403(10440), 2162-2203. https://doi.org/10.1016/S0140-6736(24)00933-4

World Health Organization. (2024). Ethics and governance of artificial intelligence for health: Guidance on large multi-modal models. Geneva: World Health Organization. https://www.who.int/publications/i/item/9789240084759

Yang, R., Ning, Y., Liu, N., & Keppo, E. K. (2024). Retrieval-Augmented Generation for Generative Artificial Intelligence in Medicine. The Lancet Digital Health, 6(7), e460.

Ji, Z., Lee, N., Bang, J., Madotto, A., & Fung, P. (2023). A Survey on Hallucination in Large Language Models: Principles, Taxonomy, Challenges, and Open Questions. ACM Computing Surveys, 56(1). https://doi.org/10.1145/3639535

Panayotova, G. G. (2025). Artificial Intelligence in Nutrition and Dietetics: A Comprehensive Review of Current Research. Healthcare, 13(20), 2579. https://doi.org/10.3390/healthcare13202579

Bayram, H. M. & Ozturkcan, A. (2025). Applications of generative and predictive AI in nutrition and dietetics: a narrative review. Informatics for Health and Social Care, 50(3-4), 133-156. https://doi.org/10.1080/17538157.2025.2560834

Tricco, A. C., Lillie, E., Zarin, W., O'Brien, K. K., Colquhoun, H., Levac, D., et al. (2018). PRISMA Extension for Scoping Reviews (PRISMA-ScR): Checklist and Explanation. Annals of Internal Medicine, 169(7), 467-473. https://doi.org/10.7326/m18-0850

Belkhouribchia, J. & Pen, J. J. (2025). Large language models in clinical nutrition: an overview of its applications, capabilities, limitations, and potential future prospects. Frontiers in Nutrition, 12, Article 1635682. https://doi.org/10.3389/fnut.2025.1635682

Papastratis, I., Konstantinidis, D., Daras, P., & Dimitropoulos, K. (2024). AI nutrition recommendation using a deep generative model and ChatGPT. Scientific Reports, 14(1), Article 14620. https://doi.org/10.1038/s41598-024-65438-x

Kirk, D., van Eijnatten, E., & Camps, G. (2023). Comparison of Answers between ChatGPT and Human Dieticians to Common Nutrition Questions. Journal of Nutrition and Metabolism, 2023, 1-9. https://doi.org/10.1155/2023/5548684

Chotwanvirat, P., Prachansuwan, A., Sridonpai, P., & Kriengsinyos, W. (2024). Advancements in Using AI for Dietary Assessment Based on Food Images: Scoping Review. Journal of Medical Internet Research, 26, e51432. https://doi.org/10.2196/51432

Azimi, I., Qi, M., Wang, L., Rahmani, A. M., & Li, Y. (2025). Evaluation of LLMs accuracy and consistency in the registered dietitian exam through prompt engineering and knowledge retrieval. Scientific Reports, 15(1), Article 1506. https://doi.org/10.1038/s41598-024-85003-w

Solomon, T. P. J. & Laye, M. J. (2025). The sports nutrition knowledge of large language model (LLM) artificial intelligence (AI) chatbots: An assessment of accuracy, completeness, clarity, quality of evidence, and test-retest reliability. PLOS One, 20(6), e0325982. https://doi.org/10.1371/journal.pone.0325982

Sun, H., Zhang, K., Lan, W., Gu, Q., Jiang, G., Yang, X., et al. (2023). An AI Dietitian for Type 2 Diabetes Mellitus Management Based on Large Language and Image Recognition Models: Preclinical Concept Validation Study. Journal of Medical Internet Research, 25, e51300. https://doi.org/10.2196/51300

Ponzo, V., Rosato, R., Scigliano, M. C., Onida, M., Cossai, S., De Vecchi, M., et al. (2024). Comparison of the Accuracy, Completeness, Reproducibility, and Consistency of Different AI Chatbots in Providing Nutritional Advice: An Exploratory Study. Journal of Clinical Medicine, 13(24), 7810. https://doi.org/10.3390/jcm13247810

Haman, M., Školník, M., & Lošťák, M. (2024). AI dietician: Unveiling the accuracy of ChatGPT's nutritional estimations. Nutrition, 119, 112325. https://doi.org/10.1016/j.nut.2023.112325

Niszczota, P. & Rybicka, I. (2023). The credibility of dietary advice formulated by ChatGPT: Robo-diets for people with food allergies. Nutrition, 112, 112076. https://doi.org/10.1016/j.nut.2023.112076

Zhou, P., Min, W., Fu, C., Jin, Y., Huang, M., Li, X., et al. (2025). FoodSky: A food-oriented large language model that can pass the chef and dietetic examinations. Patterns, 6(5), 101234. https://doi.org/10.1016/j.patter.2025.101234

Commission on Dietetic Registration. (2024). Registered Dietitian Nutritionist Credentialing Exam statistics and reports. Retrieved from https://www.cdrnet.org/RDExamStats

Gavai, A. K. & van Hillegersberg, J. (2025). AI-driven personalized nutrition: RAG-based digital health solution for obesity and type 2 diabetes. PLOS Digital Health, 4(5), e0000758. https://doi.org/10.1371/journal.pdig.0000758

Hou, Y., Bishop, J. R., Liu, H., & Zhang, R. (2025). Improving Dietary Supplement Information Retrieval: Development of a Retrieval-Augmented Generation System With Large Language Models. Journal of Medical Internet Research, 27, e67677. https://doi.org/10.2196/67677

Bernstein, A. M., Janeke, P., Riggs, R. V., Burke, E., Meyer, J., Moyer, M. F., et al. (2025). Artificial Intelligence-Based Hospital Malnutrition Screening: Validation of a Novel Machine Learning Model. Applied Clinical Informatics, 16(05), 1646-1657. https://doi.org/10.1055/a-2635-3158

O’Hara, C., Kent, G., Flynn, A. C., Gibney, E. R., & Timon, C. M. (2025). An Evaluation of ChatGPT for Nutrient Content Estimation from Meal Photographs. Nutrients, 17(4), 607. https://doi.org/10.3390/nu17040607

Mount Sinai Health System. (2024). NutriScan AI: Machine learning application for malnutrition screening [Press release]. Retrieved from https://www.mountsinai.org/about/newsroom/2025/ai-system-finds-crucial-clues-for-diagnoses-in-electronic-health-records

Kaya Kaçar, H., Kaçar, Ö. F., & Avery, A. (2025). Diet Quality and Caloric Accuracy in AI-Generated Diet Plans: A Comparative Study Across Chatbots. Nutrients, 17(2), 206. https://doi.org/10.3390/nu17020206

Liao, L. L., Chang, L. C., & Lai, I. J. (2024). Assessing the Quality of ChatGPT’s Dietary Advice for College Students from Dietitians’ Perspectives. Nutrients, 16(12), 1939. https://doi.org/10.3390/nu16121939

Comanici, G., Bieber, E., Schaekermann, M., Pasupat, I., Sachdeva, N., Dhillon, I., Blistein, M., Ram, O., Zhang, D., Rosen, E., & Google DeepMind. (2025). Gemini 2.5: Pushing the Frontier with Advanced Reasoning, Multimodality, Long Context, and Next Generation Agentic Capabilities. arXiv. https://arxiv.org/abs/2507.06261

Chiang, W.-L., Zheng, L., Sheng, Y., Angelopoulos, A. N., Li, T., Li, D., Zhang, H., Zhu, B., Jordan, M., Gonzalez, J. E., & Stoica, I. (2024). Chatbot Arena: An open platform for evaluating LLMs by human preference. In Proceedings of the 41st International Conference on Machine Learning (Vol. 235, pp. 8359-8388). PMLR. https://arxiv.org/abs/2403.04132

Kim, D. W., Park, J. S., Sharma, K., Velazquez, A., Li, L., Ostrominski, J. W., et al. (2024). Qualitative evaluation of artificial intelligence-generated weight management diet plans. Frontiers in Nutrition, 11, Article 1374834. https://doi.org/10.3389/fnut.2024.1374834

Lo, F. P. W., Qiu, J., Wang, Z., Chen, J., Xiao, B., Yuan, W., et al. (2024). Dietary Assessment With Multimodal ChatGPT: A Systematic Analysis. IEEE Journal of Biomedical and Health Informatics, 28(12), 7577-7587. https://doi.org/10.1109/jbhi.2024.3417280

Chatelan, A., Clerc, A., & Fonta, P. A. (2023). ChatGPT and Future Artificial Intelligence Chatbots: What may be the Influence on Credentialed Nutrition and Dietetics Practitioners?. Journal of the Academy of Nutrition and Dietetics, 123(11), 1525-1531. https://doi.org/10.1016/j.jand.2023.08.001

Li, X., Yin, A., Choi, H. Y., Chan, V., Allman-Farinelli, M., & Chen, J. (2024). Evaluating the Quality and Comparative Validity of Manual Food Logging and Artificial Intelligence-Enabled Food Image Recognition in Apps for Nutrition Care. Nutrients, 16(15), 2573. https://doi.org/10.3390/nu16152573

Toklu Baloğlu, H. (2025). Effect of ChatGPT use on eating disorders and body image. World Journal of Psychiatry, 15(8). https://doi.org/10.5498/wjp.v15.i8.107122

Seid, A., Fufa, D. D., & Bitew, Z. W. (2024). The use of internet-based smartphone apps consistently improved consumers' healthy eating behaviors: a systematic review of randomized controlled trials. Frontiers in Digital Health, 6, Article 1282570. https://doi.org/10.3389/fdgth.2024.1282570

Koios, K. S., Segal, E., & Ben-Yacov, O. Effects of a personalized nutrition program on cardiometabolic health: A randomized controlled trial. Nat. Med. 31, 958-967 (2025).

Wang, X., Sun, Z., Xue, H., & An, R. (2025). Artificial Intelligence Applications to Personalized Dietary Recommendations: A Systematic Review. Healthcare, 13(12), 1417. https://doi.org/10.3390/healthcare13121417

Lee, Y. B., Kim, G., Jun, J. E., Park, H., Lee, W. J., Hwang, Y. C., et al. (2023). An Integrated Digital Health Care Platform for Diabetes Management With AI-Based Dietary Management: 48-Week Results From a Randomized Controlled Trial. Diabetes Care, 46(5), 959-966. https://doi.org/10.2337/dc22-1929

Shamanna, P., Erukulapati, R. S., Shukla, A., Shah, L., Willis, B., Thajudeen, M., et al. (2024). One-year outcomes of a digital twin intervention for type 2 diabetes: a retrospective real-world study. Scientific Reports, 14(1), Article 25478. https://doi.org/10.1038/s41598-024-76584-7

Lacruz-Pleguezuelos, B., Bazán, G. X., Romero-Tapiador, S., Freixer, G., Tolosana, R., Daza, R., et al. (2025). AI4Food, a feasibility study for the implementation of automated devices in the nutritional advice and follow up within a weight loss intervention. Clinical Nutrition, 48, 80-89. https://doi.org/10.1016/j.clnu.2025.03.003

Veluvali, A., Dehghani Zahedani, A., Hosseinian, A., Aghaeepour, N., McLaughlin, T., Woodward, M., et al. (2025). Impact of digital health interventions on glycemic control and weight management. npj Digital Medicine, 8(1), Article 20. https://doi.org/10.1038/s41746-025-01430-7

Bergling, K., Wang, L. C., Shivakumar, O., Nandorine Ban, A., Moore, L. W., Ginsberg, N., et al. (2025). From bytes to bites: application of large language models to enhance nutritional recommendations. Clinical Kidney Journal, 18(4), Article sfaf082. https://doi.org/10.1093/ckj/sfaf082

Yaseen, I. & Rather, R. (2024). A Theoretical Exploration of Artificial Intelligence’s Impact on Feto-Maternal Health from Conception to Delivery. International Journal of Women's Health, Volume 16, 903-915. https://doi.org/10.2147/ijwh.s454127

OpenAI. (2025, August 13). GPT-5 system card. https://cdn.openai.com/gpt-5-system-card.pdf

U.S. Food and Drug Administration. (2022). Software as a Medical Device (SaMD): Clinical evaluation - Guidance for industry and Food and Drug Administration staff. Retrieved from https://www.fda.gov/regulatory-information/search-fda-guidance-documents/software-medical-device-samd-clinical-evaluation

Rein, D., Hou, B. L., Stickland, A. C., Petty, J., Pang, R. Y., Dirani, J., Michael, J., & Bowman, S. R. (2023). GPQA: A graduate-level Google-proof Q&A benchmark. arXiv. https://arxiv.org/abs/2311.12022

Mathioudakis, N., Lalani, B., Abusamaan, M. S., Alderfer, M., Alver, D., Dobs, A., et al. (2025). An AI-Powered Lifestyle Intervention vs Human Coaching in the Diabetes Prevention Program. JAMA, 334(23), 2079. https://doi.org/10.1001/jama.2025.19563

Oh, Y. J., Zhang, J., Fang, M. L., & Fukuoka, Y. (2021). A systematic review of artificial intelligence chatbots for promoting physical activity, healthy diet, and weight loss. International Journal of Behavioral Nutrition and Physical Activity, 18(1), 160. https://doi.org/10.1186/s12966-021-01224-6
