# 00.02 Contents

This unit turns printed contents pages i through x into an interview-oriented navigation map for Retrieval-Augmented Generation (RAG).

## TL;DR

- The book moves from interview framing and generator limits through prompting, representation, indexing, retrieval, routing, training, context assembly, evaluation, trust, scaling, and design drills.
- Parts I through III establish the problem, the generator, and the context interface.
- Parts IV through VII trace the retrieval path from representation to indexing, ranking, reformulation, routing, and multi-step control flow.
- Parts VIII through XII cover training, assembly, evaluation, credibility, robustness, systems, advanced variants, and full design exercises.
- Appendices A through G provide formulas, question banks, design checklists, documentation templates, readings, notation, and terminology.

## The story

Treat the contents as a metro map for a RAG interview. The front matter is the ticket hall. It explains who the route serves, how to read the signs, and which notation appears along the way. Part I is the central interchange because it frames the interview, compares competing answers, and supplies a repeatable design route.

The next lines travel through the system itself. The generator, prompting, representation, indexing, retrieval, query control, training, and context assembly each get their own line. Every chapter is a station where an interviewer can stop the conversation and ask for a mechanism, trade-off, failure mode, or design choice.

The final lines are the inspection route. Evaluation checks retrieval, generation, and the complete system. Trust and robustness inspect the evidence and threat surface. Scaling and advanced variants test whether the route still works under operational pressure. The appendices are the service depot, holding formulas, drills, checklists, documentation, readings, notation, and a glossary for rapid repair before an interview.

## Decoder table

| Map line | Printed-page start | Interview use |
|---|---:|---|
| Part I. The RAG Interview Landscape | 1 | Frame the problem, compare alternatives, and structure a design answer. |
| Part II. The Generator Side | 63 | Explain what the generator contributes and where it fails. |
| Part III. Prompting and Context Construction | 184 | Control instructions, reasoning scaffolds, sensitivity, abstention, and calibration. |
| Part IV. Representing What You Retrieve | 251 | Choose representations, chunking granularity, and document structure. |
| Part V. Indexing and Vector Search | 323 | Connect search structures, compression, and vector-store operations. |
| Part VI. Retrieval and Ranking | 402 | Compare classical, dense, sparse, multi-vector, reranking, and generative retrieval. |
| Part VII. Query Understanding and Control Flow | 548 | Reformulate, route, iterate, recurse, and stop retrieval. |
| Part VIII. Training the RAG System | 642 | Train generators and retrievers, then bootstrap training data. |
| Part IX. Generation and Context Assembly | 727 | Place evidence, manage positional effects, and support attribution. |
| Part X. Evaluation | 777 | Separate retrieval, generation, and system-level measurement. |
| Part XI. Trust, Credibility, and Adversarial Robustness | 838 | Examine source credibility, provenance, attacks, and privacy. |
| Part XII. Scaling, Advanced Variants, and Design Drills | 901 | Reason about systems, federation, modalities, graphs, and end-to-end cases. |
| Appendices A through G | 1050 | Rehearse formulas, questions, checklists, documentation, readings, notation, and terms. |

## Core mechanics

The catalog below preserves every unit and printed page reference from the assigned contents pages. The source's abbreviated labels remain unchanged when these pages do not provide an expansion.

### Front matter

| Unit | Printed page |
|---|---:|
| Preface | xi |
| How to Use This Book | xiii |
| For Interview Candidates | xviii |
| For Practicing Engineers | xxiii |
| Notation and Symbols | xxvii |
| Acknowledgments | xxxi |
| About the Author | xxxii |

### Part I. The RAG Interview Landscape

| Unit | Printed page |
|---|---:|
| Part I. The RAG Interview Landscape | 1 |
| Chapter 1. What a RAG Interview Actually Tests | 2 |
| 1.1 Parametric, non-parametric, semi-parametric: the frame behind every question | 2 |
| 1.2 The five bottlenecks that created RAG | 6 |
| 1.3 The five benefits, and what each one costs you | 10 |
| 1.4 RAG is one instance of tool use, not the general case | 13 |
| 1.5 When not to retrieve: the popularity curve and retrieval-induced harm | 17 |
| Chapter 2. The Competing Answers to the Same Problem | 22 |
| 2.1 Continual learning and catastrophic forgetting | 22 |
| 2.2 Model editing: gradient-based and locate-and-update | 26 |
| 2.3 Long context vs retrieval | 31 |
| 2.4 Generative retrieval: putting the index back in the weights | 35 |
| 2.5 Choosing between them out loud in an interview | 39 |
| Chapter 3. A Repeatable Framework for Any RAG Design Question | 43 |
| 3.1 The five retrieval decisions as an answer skeleton | 43 |
| 3.2 Naive -> Advanced -> Modular: naming your design's maturity | 47 |
| 3.3 The three injection interfaces: text, embeddings, parameters | 50 |
| 3.4 Sizing the problem before designing it | 54 |
| 3.5 "One size does not fit all": adaptivity as the default answer | 58 |

### Part II. The Generator Side

| Unit | Printed page |
|---|---:|
| Part II. The Generator Side | 63 |
| Chapter 4. What the LLM Brings and What It Breaks | 64 |
| 4.1 Pre-training, SFT, post-training - which stage owns which failure | 64 |
| 4.2 Memorization: three laws and their consequences | 68 |
| 4.3 Long-tail knowledge and co-occurrence bias | 71 |
| 4.4 Hallucination taxonomy: factuality vs faithfulness, intrinsic vs extrinsic | 76 |
| 4.5 The five causes of factual error | 80 |
| 4.6 Why verification is hard: black box, moving truth, biased verifiers | 84 |
| Chapter 5. Data, Privacy, and the Legal Surface | 89 |
| 5.1 What is actually in the pre-training corpus | 89 |
| 5.2 PII extraction and the divergence attack | 93 |
| 5.3 Copyright, Books3, and verbatim continuation | 97 |
| 5.4 Unlearning and why it cannot scale | 101 |
| 5.5 SILO: low-risk weights, high-risk datastore | 106 |
| Chapter 6. Scaling Laws and the Economics of Retrieval vs Parameters | 112 |
| 6.1 Kaplan, Chinchilla, and post-Chinchilla token/parameter ratios | 112 |
| 6.2 FLOPs ~= 6ND and the memory arithmetic you must do live | 117 |
| 6.3 Three observations that change decisions: shape, embeddings, convergence | 121 |
| 6.4 Test-time compute vs pre-training compute | 126 |
| 6.5 The small-model-plus-datastore argument, and its limit | 130 |
| Chapter 7. In-Context Learning - The Mechanism RAG Rides On | 135 |
| 7.1 ICL vs SFT: what each actually buys you | 135 |
| 7.2 Demonstration selection and the test-input conjecture | 140 |
| 7.3 Format sensitivity, and why there is no universally best format | 144 |
| 7.4 Ordering, K! search space, and content-free calibration | 148 |
| 7.5 Why ICL works, theory 1: Bayesian / kernel regression | 152 |
| 7.6 Why ICL works, theory 2: gradient descent as inference | 156 |
| Chapter 8. Reading the Machine: Circuits, Induction Heads, and Attribution | 161 |
| 8.1 Feature attribution vs mechanistic interpretability | 161 |
| 8.2 The residual stream as an information bus | 165 |
| 8.3 QK and OV circuits: where to look, what to move | 170 |
| 8.4 Induction heads and "advanced copying" | 175 |
| 8.5 What circuits let you claim about a RAG answer - and what they don't | 179 |

### Part III. Prompting and Context Construction

| Unit | Printed page |
|---|---:|
| Part III. Prompting and Context Construction | 184 |
| Chapter 9. Prompting for Retrieval-Augmented Systems | 185 |
| 9.1 The prompt hierarchy: completion -> instruction -> ICL -> RAG | 185 |
| 9.2 Reasoning scaffolds: CoT, self-consistency, Tree and Graph of Thoughts | 189 |
| 9.3 When more scaffolding makes things worse | 194 |
| 9.4 Retrieving more can hallucinate more | 198 |
| Chapter 10. Prompt Sensitivity | 203 |
| 10.1 How much formatting alone moves accuracy | 203 |
| 10.2 Measuring sensitivity: POSIX, PSS, decoding confidence | 207 |
| 10.3 Sensitivity as a label-free performance predictor | 211 |
| 10.4 Few-shot beats scale for reducing sensitivity | 214 |
| 10.5 Prompt optimization: COPLE and P2G | 219 |
| Chapter 11. Abstention and Calibration | 224 |
| 11.1 Should a RAG system ever refuse? | 224 |
| 11.2 Five abstention mechanisms and how each fails | 228 |
| 11.3 Self-reflection compounds - the model-collapse connection | 233 |
| 11.4 Calibration vs failure prediction | 237 |
| 11.5 Eliciting confidence from a black box | 242 |
| 11.6 Long-form calibration: 80% of what? | 246 |

### Part IV. Representing What You Retrieve

| Unit | Printed page |
|---|---:|
| Part IV. Representing What You Retrieve | 251 |
| Chapter 12. Text Representation | 252 |
| 12.1 Four eras: bag-of-words -> static -> contextual -> universal | 252 |
| 12.2 Distributional semantics and meaning drift | 256 |
| 12.3 Sparse vs dense: dimensionality, interpretability, exact match | 260 |
| 12.4 Sentence embeddings, and why vision augmentation fails on text | 265 |
| 12.5 What a sentence embedding actually contains | 269 |
| Chapter 13. Chunking and Granularity | 274 |
| 13.1 Five levels of splitting | 274 |
| 13.2 Chunking by intent: pseudo-instructions | 278 |
| 13.3 Mixture of Granularity: routing over chunk sizes | 282 |
| 13.4 Propositions and fine-grained retrieval | 287 |
| 13.5 Evaluating a chunker: IoU and the segmentation metrics | 291 |
| 13.6 Does semantic chunking actually pay? | 295 |
| Chapter 14. Beyond Plain Text - Tables, Layout, Documents | 300 |
| 14.1 Semi-structured data and why splitting a table corrupts it | 300 |
| 14.2 Table encoding: TAPAS and its positional assumptions | 304 |
| 14.3 Row/column order bias and TableFormer's fix | 309 |
| 14.4 Document layout: blocks, reading order, hierarchical pre-training | 313 |
| 14.5 Layout priors you should be able to name | 318 |

### Part V. Indexing and Vector Search

| Unit | Printed page |
|---|---:|
| Part V. Indexing and Vector Search | 323 |
| Chapter 15. Approximate Nearest Neighbor Search | 324 |
| 15.1 Why exact search dies: the curse of dimensionality | 324 |
| 15.2 From skip lists to HNSW | 328 |
| 15.3 IVF: coarse quantizers, centroids, Voronoi cells | 333 |
| 15.4 LSH and hash-collision retrieval | 337 |
| 15.5 Graph indexes: RNG, Vamana/DiskANN, Annoy | 341 |
| 15.6 Choosing an index: the recall/latency/memory triangle | 345 |
| Chapter 16. Compression and Index Economics | 351 |
| 16.1 Product quantization and the k^m/km argument | 351 |
| 16.2 Residual quantization and IVFADC | 355 |
| 16.3 Scalar and binary quantization | 360 |
| 16.4 FAISS, parallelism, and why block structure matters | 364 |
| 16.5 Index memory arithmetic, end to end | 369 |
| Chapter 17. Operating a Vector Store | 374 |
| 17.1 Static index, dynamic corpus: tombstones and re-indexing | 374 |
| 17.2 Sharding, replication, partitioning | 378 |
| 17.3 Choosing a vector database: no winner on all axes | 383 |
| 17.4 Metadata: descriptive, structural, generated | 387 |
| 17.5 Pre-filtering, post-filtering, and the over-filtering risk | 392 |
| 17.6 Self-querying: LLM-extracted filter constraints | 396 |

### Part VI. Retrieval and Ranking

| Unit | Printed page |
|---|---:|
| Part VI. Retrieval and Ranking | 402 |
| Chapter 18. Classical IR You Are Expected to Know | 403 |
| 18.1 Boolean and extended Boolean models | 403 |
| 18.2 Vector space model and TF-IDF's two failures | 408 |
| 18.3 BM25: saturation and length normalization | 412 |
| 18.4 Probabilistic models and the binary independence assumption | 417 |
| 18.5 Why sparse still wins on the long tail | 422 |
| Chapter 19. Learning to Rank | 427 |
| 19.1 The LTR setup and why regression is the wrong framing | 427 |
| 19.2 Pointwise: classification and ordinal regression | 431 |
| 19.3 Pairwise: RankSVM, RankNet, LambdaRank | 435 |
| 19.4 Listwise: SoftRank, LambdaMART, SetRank | 440 |
| 19.5 Neural LTR: representation, interaction, hybrid | 444 |
| Chapter 20. Dense Retrieval | 449 |
| 20.1 Bi-encoders, DPR, and the efficiency/expressiveness trade | 449 |
| 20.2 Where dense wins and where BM25 wins | 453 |
| 20.3 Hard negatives, gradient norm, and ANCE | 457 |
| 20.4 Unsupervised dense retrieval: Contriever and MoCo | 462 |
| 20.5 Cross-lingual and low-resource retrieval | 466 |
| Chapter 21. Learned Sparse and Multi-Vector Retrieval | 472 |
| 21.1 SPLADE: MLM-predicted term importance and implicit expansion | 472 |
| 21.2 FLOPS regularization: making sparsity a trainable objective | 476 |
| 21.3 ColBERT and late interaction | 481 |
| 21.4 The three ablations that show what makes ColBERT work | 485 |
| 21.5 Making multi-vector affordable: ColBERTv2 and PLAID | 489 |
| 21.6 Hybrid retrieval and Reciprocal Rank Fusion | 493 |
| Chapter 22. Reranking | 499 |
| 22.1 Why a second stage exists at all | 499 |
| 22.2 Cross-encoders and choosing rerank depth | 503 |
| 22.3 LLM rerankers: pointwise, pairwise, listwise | 507 |
| 22.4 monoT5 -> RankT5: from classification to real ranking losses | 512 |
| 22.5 Zero-shot listwise prompting and the sliding window | 516 |
| 22.6 Instruction-aware reranking | 521 |
| 22.7 Document-bound vs model-bound | 525 |
| Chapter 23. Generative Retrieval | 530 |
| 23.1 Generating document IDs instead of searching | 530 |
| 23.2 Constant-time retrieval vs quality ceiling | 534 |
| 23.3 Incremental indexing: the open wound | 538 |
| 23.4 Recite-then-answer, and GenIR as RAG's complement | 543 |

### Part VII. Query Understanding and Control Flow

| Unit | Printed page |
|---|---:|
| Part VII. Query Understanding and Control Flow | 548 |
| Chapter 24. Query Reformulation | 549 |
| 24.1 Why queries fail: misspelling, synonymy, polysemy | 549 |
| 24.2 Expansion: lexical, semantic, signal-based | 553 |
| 24.3 Rewriting: Rocchio -> seq2seq -> reinforcement learning | 558 |
| 24.4 Retrieval-specific embeddings: why word2vec is wrong here | 562 |
| 24.5 Conversational rewriting: five operations | 566 |
| 24.6 HyDE: searching with a hypothetical answer | 570 |
| Chapter 25. Routing and Adaptive Retrieval | 575 |
| 25.1 When to retrieve: classifier, confidence, and self-reflective families | 575 |
| 25.2 Unified Active Retrieval: four criteria as a decision tree | 579 |
| 25.3 Where to retrieve: source selection, conflict, heterogeneity | 583 |
| 25.4 Query routers: descriptive vs prescriptive | 587 |
| 25.5 Query stratification: four levels of information need | 591 |
| 25.6 Adaptive RAG and silver-label supervision | 595 |
| 25.7 The out-of-distribution weakness every router shares | 599 |
| Chapter 26. Iterative, Recursive, and Agentic Retrieval | 604 |
| 26.1 Why one-shot retrieval breaks: three failure modes | 604 |
| 26.2 Iterative: alternating retrieval and generation | 608 |
| 26.3 Recursive: IRCoT and Self-Ask | 612 |
| 26.4 Confidence-triggered: FLARE's implicit and explicit queries | 616 |
| 26.5 Corrective RAG: evaluate, decompose, fall back to web search | 620 |
| 26.6 Self-RAG: reflection tokens and distilled supervision | 624 |
| 26.7 RL for search: Search-R1, GRPO, and learned stopping | 627 |
| 26.8 Agentic RAG and its costs | 632 |
| 26.9 When to stop: the accuracy/latency/context trade-off | 636 |

### Part VIII. Training the RAG System

| Unit | Printed page |
|---|---:|
| Part VIII. Training the RAG System | 642 |
| Chapter 27. Fine-tuning the Generator | 643 |
| 27.1 SFT teaches behavior, RAG supplies knowledge | 643 |
| 27.2 RAFT: training with distractors on purpose | 647 |
| 27.3 Robustness to retrieval defects: noisy, irrelevant, counterfactual | 651 |
| 27.4 Answer invariance to context as a training objective | 655 |
| 27.5 PEFT: LoRA, QLoRA, and quantization | 659 |
| Chapter 28. Training the Retriever | 664 |
| 28.1 Four quadrants: freeze or train x retriever or generator | 664 |
| 28.2 Fusion-in-Decoder and FiD-light | 668 |
| 28.3 Relevance is discrete: Gumbel noise and the differentiability fix | 672 |
| 28.4 REPLUG: black-box LLM, ensembled output distributions | 677 |
| 28.5 LM-supervised retrieval: KL between retriever and LM preference | 681 |
| 28.6 Index refresh during training | 686 |
| 28.7 REALM and retrieval inside pre-training | 690 |
| Chapter 29. Bootstrapping Training Data | 695 |
| 29.1 Inverting the relation: what queries does this document answer? | 695 |
| 29.2 doc2query and vocabulary mismatch | 699 |
| 29.3 InPars: contrasting good and bad generated queries | 702 |
| 29.4 Promptagator: retrieval tasks are not one task | 706 |
| 29.5 Consistency filtering | 709 |
| 29.6 Multilingual and conversational extensions | 713 |
| 29.7 Synthetic data: the right question is how, not whether | 717 |
| 29.8 Gold, silver, bronze: label provenance and the teacher ceiling | 721 |

### Part IX. Generation and Context Assembly

| Unit | Printed page |
|---|---:|
| Part IX. Generation and Context Assembly | 727 |
| Chapter 30. Lost in the Middle | 728 |
| 30.1 The U-curve and the serial position effect | 728 |
| 30.2 Worse than closed-book: the finding that changes designs | 732 |
| 30.3 Longer context windows do not help | 735 |
| 30.4 Where the bias comes from: system messages and next-token locality | 739 |
| 30.5 Mitigation by prompting and reordering | 743 |
| 30.6 Ranked-list truncation: retrieve fewer documents | 747 |
| 30.7 Positional encoding and attention calibration | 750 |
| 30.8 Training and architecture fixes: IN2, FILM, DIFF Transformer | 753 |
| Chapter 31. Attribution and Citation | 758 |
| 31.1 Attribution as RAG's core promise | 758 |
| 31.2 The AIS framework: interpretability then attribution | 761 |
| 31.3 Post-hoc citations and why they are nearly worthless | 765 |
| 31.4 Attributable, extrapolatory, contradictory - and the fact-checking mapping | 769 |
| 31.5 How good are automatic attribution judges? | 772 |

### Part X. Evaluation

| Unit | Printed page |
|---|---:|
| Part X. Evaluation | 777 |
| Chapter 32. Evaluating Retrieval | 778 |
| 32.1 Set metrics vs rank metrics | 778 |
| 32.2 MRR, nDCG, recall@k - derived, not quoted | 781 |
| 32.3 Evaluating without ground truth: humans and LLM judges | 785 |
| 32.4 Judge design: exemplars, class balance, macro-F1 | 788 |
| Chapter 33. Evaluating Generation | 793 |
| 33.1 Faithfulness vs factuality, restated for evaluation | 793 |
| 33.2 FActScore and atomic facts | 797 |
| 33.3 VeriScore: unverifiable claims and the recall correction | 802 |
| 33.4 RAGAS: faithfulness, answer relevance, context relevance | 806 |
| 33.5 Error length dependence and summarization's open question | 810 |
| Chapter 34. Evaluating the System | 815 |
| 34.1 RAG is not end-to-end: attributing failure to a stage | 815 |
| 34.2 Macro, micro, mezzo analysis | 818 |
| 34.3 Ablation design and sanity cases | 822 |
| 34.4 The remove-the-evidence ablation | 826 |
| 34.5 System-level properties: latency, self-consistency, robustness | 830 |
| 34.6 Benchmark hygiene: contamination, synthetic sets, VQA-in-RAG-clothing | 834 |

### Part XI. Trust, Credibility, and Adversarial Robustness

| Unit | Printed page |
|---|---:|
| Part XI. Trust, Credibility, and Adversarial Robustness | 838 |
| Chapter 35. Source Credibility | 839 |
| 35.1 Six aspects across three stages: a trustworthiness taxonomy | 839 |
| 35.2 One bad document among many good ones | 842 |
| 35.3 RA-RAG: reliability from cross-source agreement | 845 |
| 35.4 CAG: training the model to reason about credibility | 849 |
| 35.5 CrAM: down-weighting attention on gullible heads | 852 |
| 35.6 Choosing among the three | 856 |
| 35.7 Temporal awareness and credibility laundering | 859 |
| 35.8 Pluralism: when every credible source shares a blind spot | 862 |
| 35.9 Fair exposure: doubly stochastic rankings and group constraints | 866 |
| Chapter 36. Provenance and Adversarial Robustness | 870 |
| 36.1 Attribution is linguistic, authenticity is technical | 870 |
| 36.2 Content credentials and C2PA | 873 |
| 36.3 Missing and forged credentials | 877 |
| 36.4 Indirect prompt injection: the native RAG threat model | 881 |
| 36.5 Data poisoning the datastore | 885 |
| 36.6 Jailbreaking, red teaming, guardrails | 889 |
| 36.7 Adversarial training: discrete, continuous, and hybrid | 892 |
| 36.8 Privacy: what the datastore protects and what it doesn't | 896 |

### Part XII. Scaling, Advanced Variants, and Design Drills

| Unit | Printed page |
|---|---:|
| Part XII. Scaling, Advanced Variants, and Design Drills | 901 |
| Chapter 37. Latency, Cost, and Systems | 902 |
| 37.1 Where the milliseconds actually go | 902 |
| 37.2 KV-cache reuse for retrieved chunks | 906 |
| 37.3 Reordering a decoder to make caching possible | 909 |
| 37.4 Kernel fusion, static layouts, and GPU-shaped design | 913 |
| 37.5 CPU/GPU pipelining and prefetching | 917 |
| 37.6 Funnel retrieval: coarse-to-fine cascades | 921 |
| 37.7 Recursive summarization for thematic queries | 925 |
| 37.8 Cost per query, end to end | 929 |
| Chapter 38. Distributed and Federated RAG | 933 |
| 38.1 Why there is no single vector database | 933 |
| 38.2 Federated search and source selection | 936 |
| 38.3 RAGRoute: learning which sources to query | 940 |
| 38.4 Multi-tenancy, compliance, and data residency | 943 |
| 38.5 RAG's externalities: the commons and the energy bill | 948 |
| Chapter 39. Multimodal RAG | 952 |
| 39.1 Three generations, and the multilingual analogy | 952 |
| 39.2 Encoding: joint vs decoupled-and-aligned | 955 |
| 39.3 CLIP's three biases | 959 |
| 39.4 Per-modality thresholds | 963 |
| 39.5 Multi-granularity noise correspondence and reranking | 966 |
| 39.6 Fusion: score, attention, unified | 970 |
| 39.7 The time dimension: key frames, hierarchy, causality | 974 |
| 39.8 Generation and non-textual attribution | 978 |
| 39.9 Benchmarks and what they actually measure | 982 |
| Chapter 40. Graph RAG | 987 |
| 40.1 When a graph earns its place - and when it doesn't | 987 |
| 40.2 Constructing the graph: extraction, cost, and quality | 991 |
| 40.3 Query processing: five sub-processes and grounded decomposition | 994 |
| 40.4 Heuristic retrieval: linking, matching, traversal | 998 |
| 40.5 Knowledge graphs as reasoning sources | 1002 |
| 40.6 Learned retrieval: GNN-RAG and query-conditioned message passing | 1006 |
| 40.7 Organizing: pruning, reranking, augmenting, verbalizing | 1010 |
| 40.8 Generation: verbalize, fuse, or stay in graph space | 1013 |
| 40.9 GraphRAG vs LightRAG: communities vs dual-level keys | 1017 |
| Chapter 41. End-to-End Design Drills | 1022 |
| 41.1 Enterprise RAG over 100M documents at 500 QPS | 1022 |
| 41.2 A RAG system that must stay fresh | 1025 |
| 41.3 High-stakes RAG: medicine and law | 1029 |
| 41.4 Multi-hop question answering | 1033 |
| 41.5 Multimodal enterprise search | 1038 |
| 41.6 Debugging a RAG system that got worse | 1041 |
| 41.7 Retrofitting credibility onto an existing pipeline | 1045 |

### Appendices

| Unit | Printed page |
|---|---:|
| Appendix A. Formula Sheet | 1050 |
| A.1 BM25 | 1050 |
| A.2 Reciprocal Rank Fusion | 1051 |
| A.3 Mean Reciprocal Rank | 1052 |
| A.4 nDCG | 1053 |
| A.5 Modularity | 1054 |
| A.6 Product Quantization Sizing | 1055 |
| A.7 FLOPs and Latency | 1056 |
| A.8 Index Memory, End to End | 1057 |
| Appendix B. Question Bank | 1060 |
| B.1 Core Questions | 1060 |
| B.2 Senior Questions | 1062 |
| B.3 Staff Questions | 1065 |
| B.4 Answers | 1068 |
| Appendix C. Design Checklists | 1078 |
| C.1 The Retrieval Design Checklist | 1078 |
| C.2 The Indexing and Capacity Checklist | 1079 |
| C.3 The Evaluation Checklist | 1080 |
| C.4 The Credibility and Robustness Checklist | 1081 |
| C.5 The Latency and Cost Checklist | 1083 |
| Appendix D. The RAG Card and Index Datasheet | 1084 |
| D.1 The RAG Card | 1084 |
| D.2 The Index Datasheet | 1086 |
| Appendix E. Annotated Reading List | 1089 |
| E.1 Reading List, Mapped to Chapters | 1089 |
| Appendix F. Notation Quick Reference | 1101 |
| Appendix G. Glossary | 1103 |
| G.1 The Same Idea Under Four Names | 1103 |
| G.2 Glossary of Terms | 1105 |

## Diagrams

The manifest records zero figures and zero tables for this unit, so there are no source visuals or captions to recreate.

### Interview route

```text
Front matter
     |
Part I: frame and design method
     |
Part II -> Part III: generator and context
     |
Part IV -> Part V -> Part VI -> Part VII
representation -> indexing -> ranking -> control flow
     |
Part VIII -> Part IX: training and assembly
     |
Part X -> Part XI: evaluation and trust
     |
Part XII: systems, variants, and design drills
     |
Appendices A through G: rehearsal and reference
```

## Whiteboard pack

### Numbered drawing order

1. Write `RAG interview` at the top and draw a vertical route beneath it.
2. Add Part I as the framing station.
3. Add paired stations for Parts II and III, then Parts IV through VII as the retrieval pipeline.
4. Add Parts VIII and IX for training and context assembly.
5. Add Parts X and XI as the evaluation and trust checkpoint.
6. Add Part XII as the systems and design-drill terminus.
7. Draw a side box for Appendices A through G and label it `formulas, questions, checklists, documentation, readings, notation, glossary`.

### 90-100 word script

```text
The book is organized like a system walkthrough. I start with the interview frame and the generator's limits. Then I move through prompting, representation, indexing, retrieval, and query control because each stage changes what evidence reaches the model. After that, I cover training and context assembly, then evaluate retrieval, generation, and the whole system separately. I finish with credibility, adversarial robustness, scaling, distributed designs, multimodal and graph variants, and end-to-end drills. The appendices give formulas, questions, checklists, documentation templates, readings, notation, and a glossary. This route lets me answer from first principles, then test the design.
```

## Interview traps

### 1. Why is the contents more useful as a map than as a memorization list?

The outline groups each interview topic with its mechanism and page anchor. Part I frames the answer, Parts II through IX walk through the system, and Parts X and XI test evaluation and trust. Part XII applies the earlier material to advanced variants and design drills.

### 2. Why not start with agentic, multimodal, or graph retrieval?

The source places those variants after generator behavior, prompting, representation, indexing, ranking, routing, training, context assembly, evaluation, and trust. The order makes the prerequisite design choices visible before Part XII begins on page 901.

### 3. Where does the outline separate the three evaluation levels?

Part X assigns Chapter 32 to retrieval evaluation on page 778, Chapter 33 to generation evaluation on page 793, and Chapter 34 to system evaluation on page 815. A complete answer should preserve those three levels.

### 4. Is attribution the whole trust story?

No. Chapter 31 covers attribution and citation on page 758. Part XI separates source credibility on page 839 from provenance and adversarial robustness on page 870, while Section 36.8 places privacy on page 896.

### 5. How should an appendix entry connect back to the main outline?

Use the appendix as a rapid reference, then return to the chapter that develops the decision. Appendix A starts formulas on page 1050, while Appendix C starts design checklists on page 1078. Appendix D starts the RAG Card and Index Datasheet on page 1084.

## Key numbers

| Number | Source-grounded meaning |
|---:|---|
| 10 | Portable Document Format (PDF) pages in this contents unit, labeled i through x. |
| 7 | Front-matter units listed before Part I. |
| 12 | Major parts in the main book. |
| 41 | Numbered chapters. |
| 7 | Appendices, A through G. |
| 100 million documents | Corpus size in design drill 41.1. |
| 500 queries per second | Query rate in design drill 41.1. |
| 1105 | Final printed page reference in the contents, for G.2 Glossary of Terms. |
