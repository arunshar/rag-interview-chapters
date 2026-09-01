# Appendix E: Annotated Reading List

Use this curated, chapter-mapped reading list to connect each Retrieval-Augmented Generation (RAG) paper with the exact result a senior interview candidate should be able to reproduce.

## TL;DR

- The appendix selects 161 readings from roughly 500 cited works and organizes them into 14 chapter-mapped clusters.
- It marks 52 entries `[core]`. A senior candidate should discuss those readings without prompting.
- Learn the stated claim, mechanism, comparison, or negative result. Merely recognizing a title is not enough.
- The annotations emphasize results that secondary sources often underrepresent, including cases where retrieval, semantic chunking, citation scoring, or self-correction fails.
- Some readings are not retrieval papers. They remain because their constraints govern RAG systems.
- The source gives each title, listed first authors, and claim to know. It does not provide per-entry year or venue fields, so this chapter adds none.
- If time allows only ten papers, follow the ordered starter route at the end of the source list.

## The story

Imagine a research library with 14 shelves. The full building holds roughly 500 cited works, but the curator places 161 cards in a smaller interview room. Each card gives a title, the listed first authors, and one result the reader must be able to explain.

Fifty-two cards carry a `[core]` seal. The seal does not mean that the other cards are unimportant. It means a senior visitor should explain the sealed card without asking the curator for a hint.

The curator refuses title collecting. If a visitor says "Lost in the Middle," the curator asks what baseline it used and what the comparison showed. A title is only a shelf label. The annotation is the knowledge that must leave the room with the visitor.

Several shelves hold uncomfortable findings. Retrieval can lower accuracy. Semantic chunking gains may not transfer. Automatic citation judges can disagree with people. Self-critique without outside feedback may not improve an answer. The curator keeps these cards near the front because good interviews probe limits, not just success stories.

Some cards seem to belong in neighboring libraries. Distance concentration, tail latency, and instruction hierarchies are not retrieval papers. The curator keeps them because those constraints still govern the RAG reading room.

A visitor with a month can walk all 14 shelves. A visitor with one week follows the ten-card route in the closing note. That route covers the five design decisions, two important negative results, index arithmetic, and the threat model.

## Decoder table

| Technical term | Plain-English meaning | Why it matters in this appendix |
|---|---|---|
| Annotated reading list | A bibliography where every entry includes the claim to learn | The interview target is the result, not title recognition |
| Curated | Selected for reading value rather than completeness | The 161 entries are a subset of roughly 500 cited works |
| Chapter-mapped cluster | A group aligned with a span of book chapters | The 14 groups provide a study order |
| `[core]` | Priority marker for an entry a senior candidate should discuss unprompted | It identifies the highest-priority readings |
| Claim to know | The specific result, mechanism, comparison, or limit attached to an entry | It prepares the reader for a staff-level follow-up |
| Negative result | Evidence that a method fails, hurts, or does not transfer under stated conditions | The appendix deliberately emphasizes these results |
| NLP | A domain label used in an exact paper title | The source does not expand this label, so this chapter does not infer an expansion |
| LLM | A language-model label used in several exact titles and annotations | The source does not expand this label |
| BERT | A model label used in exact paper titles | The source does not expand this label |
| QA | A task label used in exact titles and annotations | The source does not expand this label |
| IR | A retrieval-field label used in exact titles and annotations | The source does not expand this label |
| Parametric knowledge | Knowledge carried in model weights | The first cluster compares it with retrieved knowledge |
| Non-parametric knowledge | Knowledge supplied outside model weights | It motivates retrieval and external datastores |
| RAG-Sequence | A marginalization named in the original RAG paper | The source says it differs from RAG-Token |
| RAG-Token | A second marginalization named in the original RAG paper | The distinction is conceptual, not an implementation detail |
| Long-tail knowledge | Facts involving infrequent entities or co-occurrences | Accuracy scales with entity co-occurrence frequency |
| Tool use | Letting a language model invoke an external capability | Toolformer frames retrieval as one instance of it |
| Agentic retrieval | Retrieval interleaved with an acting or reasoning loop | ReAct supplies the reason-act pattern |
| Naive, advanced, and modular RAG | A three-level taxonomy for RAG designs | The survey uses it to name design maturity |
| Model editing | Changing factual behavior by changing weights | Cluster 2 compares editing with retrieval and continual learning |
| Causal tracing | A method for locating causal influence inside a model | The ROME annotation says it localizes a fact to middle-layer weights |
| GPT | The model family label used in an editing-paper title | The source uses this label without expanding it |
| MLP weights | Middle-layer weights named in the ROME annotation | The source uses this label without expanding it |
| ROME | The editing method named by the source | Its causal-tracing result is the claim to reproduce |
| MEMIT | The scaling answer to ROME named by the source | Batch editing can degrade unrelated knowledge |
| EWC | The forgetting method named by the source | The source uses this label without expanding it |
| Parameter drift | Movement of model weights during learning | Continual learning must limit it to reduce forgetting |
| Differentiable Search Index (DSI) | The generative-index method named by the source | It generates document identifiers instead of searching |
| Generative information retrieval (GenIR) | Retrieval that generates identifiers or results | The position paper frames its relation to RAG |
| Memorization | Training examples retained by a model | The source lists three growth laws for it |
| Divergence attack | Extraction mechanism named in an annotation | The candidate should know how it works, not merely that it exists |
| Deduplication | Removing repeated training examples | It reduces extractable memorization and improves quality together |
| Intrinsic hallucination | One side of the hallucination taxonomy | The survey distinguishes it from extrinsic hallucination |
| Extrinsic hallucination | The other side of the hallucination taxonomy | The reader must know where each type originates |
| Faithfulness | Agreement with supplied evidence | An answer can be faithful to a wrong document |
| Factuality | Truth of the answer | It must remain separate from faithfulness |
| Irrelevant context | Retrieved material unrelated to the question | One core result shows it can reduce accuracy |
| Co-occurrence | How often entities appear together | It helps explain factual substitution errors |
| Sampling-based consistency | Agreement across sampled answers | SelfCheckGPT uses it as a hallucination signal at a cost |
| Confidence-based gating | Using confidence to decide a system action | Partial calibration provides both its foundation and limit |
| Nonparametric datastore | External retrievable storage | SILO uses it to isolate risky material from model training |
| Scaling law | A quantitative relation among compute, parameters, and data | The annotation expects live use of `C ≈ 6ND` |
| `C`, `N`, and `D` | Symbols in the exact source expression `C ≈ 6ND` | This appendix requires live use of the expression but does not define the symbols |
| Compute-optimal training | Balancing training compute across model and data | Chinchilla supplies the token-to-parameter argument |
| In-context learning | Behavior induced by examples in the prompt | The source stresses that it is conditioning, not a weight update |
| Content-free calibration | Calibration using inputs without task content | It addresses ordering sensitivity in few-shot prompts |
| Key-value (KV) head | An attention-head quantity named in the Llama 3 annotation | It enters the book's memory arithmetic |
| Low-Rank Adaptation (LoRA) | A parameter-efficient fine-tuning method | Its rank-r parameter count changes the fine-tuning-versus-retrieval calculation |
| `r(d_in + d_out)` | The exact rank-r parameter-count expression in the LoRA annotation | The source requires the candidate to know the expression but does not define its dimension symbols here |
| Residual stream | The shared information path through a transformer | The circuits paper treats it as an information bus |
| QK/OV factorization | Two circuit roles named in the source | One role decides where to look and the other what to move |
| Induction head | An attention pattern described as advanced copying | It supplies a mechanistic story for retrieval into context |
| Integrated gradients | The attribution method named in the source | It bounds what feature attribution can claim |
| Attention map | A display of attention weights | Attention weights are not faithful evidence of model use |
| Chain-of-thought | A reasoning scaffold written through intermediate steps | The prompting cluster builds from it |
| Self-consistency | Sampling several reasoning paths and voting | Its gain multiplies generation cost by sample count |
| Tree of Thoughts | Search over reasoning states | Added scaffolding eventually stops paying |
| Prompt sensitivity | Output variation caused by prompt changes | POSIX turns it into a measurable engineering variable |
| Expected calibration error | The calibration quantity named in the source | Larger models are not automatically better calibrated |
| Semantic uncertainty | Uncertainty after clustering outputs by meaning | It avoids counting paraphrases as disagreement |
| Semantic entropy | Deployable uncertainty measure based on semantic groups | It operationalizes the same idea |
| Verbalized confidence | A black-box model stating its confidence | The source asks how far it can be trusted |
| Self-correction | A model critiquing and revising its own answer | Without external feedback, it does not reliably improve reasoning |
| Model collapse | Degradation from recursively generated training data | It links self-reflective loops and synthetic-data pipelines |
| Static embedding | One vector per word independent of context | The source says similarity training can be the wrong retrieval objective |
| Cross-encoder | A model that scores a pair jointly | It cannot be indexed like a siamese encoder |
| Siamese encoder | Separate encoders that make items indexable | Sentence-BERT gains indexing and gives something up |
| Alignment and uniformity | The contrastive-learning framing named for SimCSE | It explains the role of dropout augmentation |
| Massive Text Embedding Benchmark (MTEB) | An embedding benchmark named in the source | Leaderboard position depends on the task |
| Anisotropy | Directional concentration in embedding space | It can make raw cosine similarity misleading |
| Retrieval granularity | The size and structure of one retrieval unit | Dense X Retrieval treats it as a first-class decision |
| Semantic chunking | Chunking intended to follow meaning boundaries | A core negative result says the published gain largely does not transfer |
| Granularity ladder | Recursive levels of summarized content | RAPTOR uses it for thematic queries that flat chunks miss |
| WindowDiff | A text-segmentation evaluation metric | The source notes the boundary errors it handles |
| P_k | A segmentation metric named in the source | It under-penalizes certain boundary errors |
| Layout-aware input | Treating page layout as model input | LayoutLM makes layout first-class rather than preprocessing |
| Skip list | A probabilistic ordered data structure | Its expected-search derivation leads into HNSW |
| `L(n)/p + 1/(1 - p)` | The exact expected skip-list search-cost expression in the source | The HNSW annotation inherits this derivation |
| Hierarchical Navigable Small World (HNSW) graph | A hierarchical graph index for approximate neighbors | The source requires its constants, heuristic, and memory formula |
| `m_L = 1/ln M` | An exact HNSW level relation required by the source | It is one of the expressions the candidate must reproduce |
| `M_0 = 2M` | An exact HNSW base-layer relation required by the source | It is another expression the candidate must reproduce |
| `4d + 8M` bytes | The exact HNSW memory-per-vector expression in the source | It makes the graph annotation quantitative |
| Navigable Small World (NSW) graph | The flat graph predecessor to HNSW | Its limitations motivate the hierarchy |
| Product quantization | Vector compression with learned codebooks | The source emphasizes the `k^m` versus `km` argument |
| Optimized product quantization | Product quantization after a learned rotation | The extra rotation can be worth its cost |
| FAISS | The similarity-search system named in the source | The source uses this name without expanding it |
| SSD-resident graph | The storage regime named in the DiskANN annotation | The source uses this label without expanding it |
| GPU | A hardware label used in an exact paper title | The source does not expand this label |
| RAM | The memory regime named in the DiskANN annotation | The source uses this label without expanding it |
| Tombstone | A deletion marker in an index | FreshDiskANN should be read with deletion material |
| SimHash | A similarity hash named in the source | Its rationale comes from locality-sensitive hashing collision probability |
| LSH | The hashing family named in the source | Its collision-probability argument and high-dimensional limit matter |
| Distance concentration | Neighbor distances becoming less distinguishable | It makes approximate search a necessity rather than a compromise |
| Approximate nearest neighbor (ANN) benchmark | A benchmark for approximate vector search | The reporting convention is a recall-versus-QPS curve |
| QPS | The query-rate measure used on an ANN benchmark curve | The source uses this label without expanding it |
| Matryoshka representation | A nested embedding that can be truncated after training | It gives a cheap dimensionality control |
| Predicate-agnostic search | Filtered search without one index per predicate | ACORN addresses over-filtering |
| Fan-out | One request issuing work across shards | It governs p99 latency in the tail-at-scale result |
| p99 | The tail-latency percentile named in The Tail at Scale | The source links it to fan-out in a sharded index |
| BM25 | The lexical ranking method named in the source | The reader must know where `k_1` and `b` enter |
| IDF | The term-specificity quantity named in the source | The source includes its original interpretation but does not expand the label |
| Dense Passage Retrieval (DPR) | Dense retrieval trained with in-batch negatives | Its bi-encoder efficiency is a core argument |
| Approximate Nearest Neighbor Negative Contrastive Learning (ANCE) | Dense-retriever training with hard negatives | The index must refresh during training |
| Contriever | The unsupervised retriever named in the source | It tests how far retrieval goes without labeled pairs |
| Benchmark for zero-shot information retrieval (BEIR) | A heterogeneous out-of-domain benchmark | BM25 beats many dense retrievers on it |
| Sparse Lexical and Expansion Model (SPLADE) | Learned sparse retrieval with implicit expansion | FLOPS regularization makes sparsity trainable |
| Masked language modeling (MLM) head | The prediction head used for masked-token training | SPLADE places implicit expansion there |
| FLOPS regularization | The sparsity control named in the source | The source does not expand this label |
| ColBERT late interaction | Token-level query-document interaction delayed until scoring | Its per-token storage cost motivates ColBERTv2 |
| MaxSim | The late-interaction operator named in the source | It is part of the ColBERT claim to know |
| Cross-encoder reranker | A second-stage model that scores query-document pairs jointly | Passage Re-ranking with BERT gives the simplest form |
| monoT5 | A sequence-to-sequence reranker named in the source | It scores with one token logit |
| Learning to rank | Training a ranking function from preference signals | LambdaRank defines a gradient without defining a loss |
| nDCG | A ranking metric with logarithmic discount and a normalizer | The source uses this label without expanding it |
| Reciprocal Rank Fusion (RRF) | A method that combines ranked lists | Its `k = 60` constant was measured rather than derived |
| Relevance feedback | Updating a query from judged results | Rocchio is the ancestor of modern reformulation |
| Pseudo-relevance feedback | Treating top results as if they were relevant | Unsupervised use can drift |
| HyDE | Searching with a generated hypothetical answer | The source supplies the mechanism but does not expand the name |
| doc2query | Predicting likely queries for a document | It moves expansion cost from query time to indexing time |
| Reinforcement learning | Training against a reward signal | One reformulation paper optimizes retrieval reward |
| FLARE | Active retrieval triggered by confidence | The source supplies the mechanism but does not expand the name |
| Self-RAG | Retrieval, generation, and critique controlled by reflection tokens | Its critic is distilled into the generator |
| Corrective Retrieval Augmented Generation (CRAG) | A pipeline that evaluates retrieval quality and can fall back to web search | The evaluator has cost and fragility |
| Adaptive-RAG | A complexity-routed retrieval design | Its router learns from silver labels |
| Interleaving Retrieval with Chain-of-Thought (IRCoT) | Recursive retrieval during reasoning | It explains one-shot failure on compositional questions |
| Compositionality gap | The gap that multi-hop retrieval tries to close | Self-Ask gives it a crisp definition |
| GRPO | The optimization algorithm named with DeepSeekMath | The source uses this label without expanding it |
| Fusion-in-Decoder (FiD) | Encoding passages separately and combining them in decoding | Its benefit creates decode cost |
| REPLUG | Training a retriever against a frozen generator through output distributions | The source stresses temperature and a narrow interface |
| Retrieval-Augmented Dual Instruction Tuning (RA-DIT) | Tuning retriever and generator without joint backpropagation | It is one joint-training alternative |
| RAFT | Training with distractors deliberately placed in context | The source supplies the paper title but does not expand the method label |
| Gumbel-Softmax | A differentiable treatment of discrete selection | It connects retriever choice to end-to-end gradients |
| InPars | Query generation from documents with filtering | The annotation says filtering supplies the quality |
| Positional bias | Performance changing with evidence position | Lost in the Middle and related work address it |
| U-curve | Better use of evidence near context ends than the middle | The crucial comparison is against a closed-book line |
| IN2 | The context-utilization training label named in the source | The source uses this label without expanding it |
| Attention with Linear Biases (ALiBi) | A position-bias approach named in the source | It belongs to the length-extrapolation question |
| AIS framework | A two-step framework of interpretability then attribution | The source uses this label without expanding it |
| Fact Extraction and VERification (FEVER) | A dataset with supported, refuted, and not-enough-information labels | Its labels underlie an attribution taxonomy |
| GopherCite | A system that samples and reranks against quoted spans | It exposes the cost of honest attribution |
| AttributionBench | A benchmark for automatic attribution evaluation | Automatic judges remain far from human agreement |
| FActScore | Atomic-fact evaluation of factual precision | Whole-answer scoring hides long-form errors |
| VeriScore | Factuality scoring for verifiable claims | It corrects FActScore's blind spot for unverifiable claims |
| RAGAs | Automated RAG evaluation with three named measures | The source warns to know what each measure omits |
| NLI | The inconsistency-detection approach named in the source | The source contrasts sentence-level and document-level use without expanding the label |
| Pool depth | The amount of judged material in an evaluation pool | Shallow pools bias comparisons when unjudged means irrelevant |
| RA-RAG | RAG with source reliability estimated from cross-source agreement | The source supplies the method name without expanding it |
| Credibility-Aware Attention Modification (CrAM) | Down-weighting attention heads influenced by unreliable documents | It is an inference-time intervention without retraining |
| Fairness of exposure | Allocating ranking visibility rather than only relevance | It reframes what a ranking policy should distribute |
| Maximal marginal relevance (MMR) | Reranking for relevance and diversity | It remains a baseline for reducing redundancy |
| Indirect prompt injection | Malicious instructions arriving through retrieved content | It is described as RAG's native threat model |
| PoisonedRAG | Knowledge corruption through poisoned retrieval documents | Few documents can flip an answer |
| GCG | The transferable-suffix attack named in the source | The source uses this label without expanding it |
| Instruction hierarchy | Priority rules for competing instructions | It teaches that retrieved text is data, not instruction |
| Coalition for Content Provenance and Authenticity (C2PA) | The organization named for content credentials | Authenticity is cryptographic, while attribution is linguistic |
| RAGRoute | Learned source selection for federated RAG | It avoids unnecessary fan-out cost |
| IO-Awareness | The exact title phrase used by FlashAttention | The source does not expand the IO label |
| FlashAttention | Exact attention whose annotation emphasizes memory movement | Its result grounds prefill arithmetic |
| CLIP | The visual-language model named in the source | The source supplies its contrastive setup but does not expand the name |
| GraphRAG | Graph-based query-focused summarization | The source stresses community hierarchy, map-reduce, and index cost |
| MRAG-Bench | A vision-centric benchmark for multimodal RAG | The annotation asks what such benchmarks measure and how many are text-answerable |
| LightRAG | A dual-level key alternative to GraphRAG | Faster updates give up the hierarchy |
| Louvain and Leiden | Community-detection methods named in the source | Leiden replaces Louvain to avoid disconnected communities |

## Core mechanics

At staff level, an interviewer can distinguish naming a paper from knowing it in one follow-up question. The chapters attribute checkable claims in prose by author and year where each claim appears. This appendix instead uses the source's stated entry format: title, listed first authors, and claim to know. It supplies no per-entry year or venue field. None is added here.

The list is curated rather than exhaustive. It selects 161 entries from roughly 500 distinct cited works and places them in 14 clusters. The 52 `[core]` markers below are preserved from the source.

The source gives two usage notes. The annotations emphasize negative results, including retrieval lowering accuracy, semantic chunking gains not transferring, weak citation quality, and unreliable self-correction without external feedback. The list also includes governing constraints from non-retrieval papers, including distance concentration, tail latency, and instruction hierarchies.

### 1. What RAG is, and when it fails

**What.** This cluster supports chapter 1 and chapter 3.

**Why.** It defines the pattern, compares parametric and non-parametric knowledge, and includes the central negative result.

**Failure without it.** A candidate can name RAG without explaining its marginalizations, its datastore rationale, or when retrieval hurts.

**Cost and complexity.** The cluster contains 7 entries, including 2 marked `[core]`.

1. **Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks** `[core]`. Authors: Lewis, Perez, Piktus et al. Claim to know: The paper named the pattern. Know the parametric / non-parametric split. RAG-Sequence and RAG-Token are different marginalizations, not implementation details.
2. **When Not to Trust Language Models: Investigating Effectiveness of Parametric and Non-Parametric Memories** `[core]`. Authors: Mallen, Asai, Zhong et al. Claim to know: This is the single most useful negative result in the field. Retrieval flips roughly 10% of otherwise-correct answers to wrong. On high-popularity entities, retrieval-augmented accuracy falls below closed-book. Popularity is operationalized as monthly Wikipedia page views.
3. **Large Language Models Struggle to Learn Long-Tail Knowledge**. Authors: Kandpal, Deng, Roberts et al. Claim to know: Accuracy on a fact scales with how often its entities co-occur in pre-training. This is the quantitative argument for a datastore.
4. **Nonparametric Masked Language Modeling**. Authors: Min, Shi, Lewis et al. Claim to know: Retrieval is a modeling choice rather than a bolt-on. This is the cleanest statement of what non-parametric capacity buys.
5. **Toolformer: Language Models Can Teach Themselves to Use Tools**. Authors: Schick, Dwivedi-Yu, Dessi et al. Claim to know: It establishes retrieval as one instance of tool use. It is useful for the framing question "why is search special?"
6. **ReAct: Synergizing Reasoning and Acting in Language Models**. Authors: Yao, Zhao, Yu et al. Claim to know: It supplies the interleaved reason-act loop that later agentic retrieval builds on.
7. **Retrieval-Augmented Generation for Large Language Models: A Survey**. Authors: Gao, Xiong, Gao et al. Claim to know: It supplies the naive / advanced / modular taxonomy used to name a design's maturity.

### 2. The alternatives: editing, continual learning, long context

**What.** This cluster supports chapter 2.

**Why.** It compares retrieval with editing, continual learning, and generative retrieval.

**Failure without it.** A candidate can recommend changing weights without knowing localization limits, ripple failures, forgetting, or indexing wounds.

**Cost and complexity.** The cluster contains 9 entries, including 1 marked `[core]`.

8. **Locating and Editing Factual Associations in GPT** `[core]`. Authors: Meng, Bau, Andonian et al. Claim to know: ROME. Know the causal-tracing method and that it localizes a fact to middle-layer MLP weights.
9. **Mass-Editing Memory in a Transformer**. Authors: Meng, Sharma, Andonian et al. Claim to know: MEMIT is the scaling answer to ROME. Know where batch editing starts to degrade unrelated knowledge.
10. **Does Localization Inform Editing? Surprising Differences in Causality-Based Localization**. Authors: Hase, Bansal, Kim et al. Claim to know: This is the rebuttal worth knowing. Where a fact is stored does not predict where it can be edited.
11. **Evaluating the Ripple Effects of Knowledge Editing in Language Models**. Authors: Cohen, Biran, Yoran et al. Claim to know: Edits do not propagate to entailed facts. This is the strongest single argument for keeping volatile knowledge outside the weights.
12. **Overcoming Catastrophic Forgetting in Neural Networks**. Authors: Kirkpatrick, Pascanu, Rabinowitz et al. Claim to know: EWC frames forgetting as a constraint on parameter drift.
13. **An Empirical Study of Catastrophic Forgetting in Large Language Models During Continual Fine-tuning**. Authors: Luo, Yang, Meng et al. Claim to know: Know how much is actually lost and at what scale.
14. **Transformer Memory as a Differentiable Search Index**. Authors: Tay, Tran, Dehghani et al. Claim to know: DSI generates document identifiers instead of searching. Know why incremental indexing is the open wound.
15. **DSI++: Updating Transformer Memory with New Documents**. Authors: Mehta, Gupta, Tay et al. Claim to know: It is the partial answer to that wound. Know what it still costs.
16. **Rethinking Search: Making Domain Experts out of Dilettantes**. Authors: Metzler, Tay, Bahri et al. Claim to know: This is the position paper behind generative retrieval. It is useful for the "are GenIR and RAG contradictory?" exchange.

### 3. What the generator brings, and what it breaks

**What.** This cluster supports chapter 4.

**Why.** It covers memorization, extraction, hallucination, faithfulness, irrelevant context, and confidence.

**Failure without it.** A candidate can treat generation as a neutral final stage and miss its retained data, calibration limits, and context failures.

**Cost and complexity.** The cluster contains 9 entries, including 3 marked `[core]`.

17. **Quantifying Memorization Across Neural Language Models** `[core]`. Authors: Carlini, Ippolito, Jagielski et al. Claim to know: Memorization grows with model scale, example duplication, and context length. Know all three laws as a set.
18. **Scalable Extraction of Training Data from (Production) Language Models**. Authors: Nasr, Carlini, Hayase et al. Claim to know: Know the divergence attack mechanism, not merely that it exists.
19. **Deduplicating Training Data Makes Language Models Better**. Authors: Lee, Ippolito, Nystrom et al. Claim to know: Deduplication reduces extractable memorization and improves quality at once.
20. **Survey of Hallucination in Natural Language Generation**. Authors: Ji, Lee, Frieske et al. Claim to know: Know the intrinsic-versus-extrinsic taxonomy used by the book and where each type originates.
21. **On Faithfulness and Factuality in Abstractive Summarization** `[core]`. Authors: Maynez, Narayan, Bohnet et al. Claim to know: This distinction supports the evaluation half of the book. An answer can be faithful and false.
22. **Large Language Models Can Be Easily Distracted by Irrelevant Context** `[core]`. Authors: Shi, Chen, Misra et al. Claim to know: Adding an irrelevant passage degrades accuracy. This counters the claim that retrieving more cannot hurt.
23. **Impact of Co-occurrence on Factual Knowledge of Large Language Models**. Authors: Kang and Choi. Claim to know: Models can substitute a frequently co-occurring entity for the correct one.
24. **SelfCheckGPT: Zero-Resource Black-Box Hallucination Detection**. Authors: Manakul, Liusie, Gales. Claim to know: Sampling-based consistency can signal hallucination. Know its cost.
25. **Language Models (Mostly) Know What They Know**. Authors: Kadavath, Conerly, Askell et al. Claim to know: Self-evaluation is partially calibrated. This is both the foundation and the limit of confidence-based gating.

### 4. Privacy, law, and the argument for a datastore

**What.** This cluster supports chapter 5.

**Why.** It ties corpus composition, legal risk, toxicity, and training-data extraction to deployment design.

**Failure without it.** A candidate can make a datastore recommendation without its legal architecture or empirical corpus rationale.

**Cost and complexity.** The cluster contains 3 entries, including 1 marked `[core]`.

26. **SILO Language Models: Isolating Legal Risk in a Nonparametric Datastore** `[core]`. Authors: Min, Gururangan, Wallace et al. Claim to know: Train on permissively licensed text and keep risky material retrievable. This is the cleanest legal-architecture argument in the field and is directly reusable in a design answer.
27. **RealToxicityPrompts: Evaluating Neural Toxic Degeneration in Language Models**. Authors: Gehman, Gururangan, Sap et al. Claim to know: Know what is measurably present in a web-scraped corpus.
28. **Extracting Training Data from Large Language Models**. Authors: Carlini, Tramer, Wallace et al. Claim to know: The extraction result made corpus composition a deployment question rather than a research question.

### 5. Scaling, economics, and in-context learning

**What.** This cluster supports chapter 6 and chapter 7.

**Why.** It supplies scaling arithmetic, compute-optimal practice, in-context behavior, calibration, model configuration, and adaptation cost.

**Failure without it.** A candidate can quote scaling or fine-tuning claims without using their arithmetic or knowing what mechanism changes.

**Cost and complexity.** The cluster contains 7 entries, including 4 marked `[core]`.

29. **Scaling Laws for Neural Language Models** `[core]`. Authors: Kaplan, McCandlish, Henighan et al. Claim to know: Know `C ≈ 6ND` and use it live. The conclusions have been superseded. The arithmetic has not.
30. **Training Compute-Optimal Large Language Models** `[core]`. Authors: Hoffmann, Borgeaud, Mensch et al. Claim to know: Chinchilla. Know the token-to-parameter ratio. More importantly, know why post-Chinchilla practice trains far past it once inference cost is amortized.
31. **Language Models are Few-Shot Learners** `[core]`. Authors: Brown, Mann, Ryder et al. Claim to know: This is the mechanism RAG rides on. In-context learning is conditioning, not a weight update.
32. **Rethinking the Role of Demonstrations: What Makes In-Context Learning Work?**. Authors: Min, Lyu, Holtzman et al. Claim to know: Label correctness in demonstrations matters far less than input distribution and label space. This is a reliable senior-level surprise.
33. **Calibrate Before Use: Improving Few-Shot Performance of Language Models**. Authors: Zhao, Wallace, Feng et al. Claim to know: Content-free calibration, and the ordering sensitivity that makes it necessary.
34. **The Llama 3 Herd of Models**. Authors: Grattafiori, Dubey et al. Claim to know: This is the source of the book's default configuration numbers, including layer count, KV head count, head dimension, and the token budget used in memory arithmetic.
35. **LoRA: Low-Rank Adaptation of Large Language Models** `[core]`. Authors: Hu, Shen, Wallis et al. Claim to know: Know the rank-r parameter count `r(d_in + d_out)` and why it changes the fine-tuning-versus-retrieval calculation.

### 6. Reading the machine

**What.** This cluster supports chapter 8.

**Why.** It covers transformer circuits, induction, parameter storage, feature attribution, and the limits of attention as evidence.

**Failure without it.** A candidate can use mechanistic language without knowing which evidence supports information flow, storage, or attribution.

**Cost and complexity.** The cluster contains 5 entries, including 1 marked `[core]`.

36. **A Mathematical Framework for Transformer Circuits** `[core]`. Authors: Elhage, Nanda, Olsson et al. Claim to know: The residual stream is an information bus. Know the QK/OV factorization, which circuit decides where to look, and which decides what to move.
37. **In-context Learning and Induction Heads**. Authors: Olsson, Elhage, Nanda et al. Claim to know: Induction heads act as advanced copying and show a phase change during training. This is the strongest available mechanistic story for why retrieval into context works at all.
38. **Transformer Feed-Forward Layers Are Key-Value Memories**. Authors: Geva, Schuster, Berant et al. Claim to know: Know where parametric facts appear to live and the bridge to the model-editing literature.
39. **Axiomatic Attribution for Deep Networks**. Authors: Sundararajan, Taly, Yan. Claim to know: Integrated gradients are the reference point for what feature attribution can and cannot claim about a generated answer.
40. **Attention is not Explanation**. Authors: Jain and Wallace. Claim to know: Attention weights are not a faithful account of what the model used. Know this before anyone offers an attention map as evidence of grounding.

### 7. Prompting, sensitivity, and abstention

**What.** This cluster supports chapter 9 through chapter 11.

**Why.** It covers reasoning scaffolds, prompt search, calibration, uncertainty, self-correction, and recursive-data failure.

**Failure without it.** A candidate can recommend more reasoning or self-critique without pricing samples, measuring sensitivity, or checking external feedback.

**Cost and complexity.** The cluster contains 11 entries, including 3 marked `[core]`.

41. **Chain-of-Thought Prompting Elicits Reasoning in Large Language Models** `[core]`. Authors: Wei, Wang, Schuurmans et al. Claim to know: This is the scaffold everything else in the cluster modifies.
42. **Self-Consistency Improves Chain of Thought Reasoning in Language Models**. Authors: Wang, Wei, Schuurmans et al. Claim to know: Sample and vote. The gain is real, and it multiplies generation cost by the sample count.
43. **Tree of Thoughts: Deliberate Problem Solving with Large Language Models**. Authors: Yao, Yu, Zhao et al. Claim to know: Search over reasoning states, and where the added scaffolding stops paying.
44. **POSIX: A Prompt Sensitivity Index for Large Language Models**. Authors: Chatterjee et al. Claim to know: A measurable definition of prompt sensitivity makes it an engineering variable rather than folklore.
45. **Large Language Models Are Human-Level Prompt Engineers**. Authors: Zhou, Muresanu, Han et al. Claim to know: Automated prompt search, and the baseline any hand-tuned prompt should beat.
46. **On Calibration of Modern Neural Networks** `[core]`. Authors: Guo, Pleiss, Sun, Weinberger. Claim to know: Expected calibration error, and the observation that larger models are not automatically better calibrated.
47. **Semantic Uncertainty: Linguistic Invariances for Uncertainty Estimation**. Authors: Kuhn, Gal, Farquhar. Claim to know: Cluster by meaning before measuring entropy. This fixes token-level uncertainty counting paraphrases as disagreement.
48. **Detecting Hallucinations in Large Language Models Using Semantic Entropy**. Authors: Farquhar, Kossen, Kuhn et al. Claim to know: This is the deployable form of the same idea.
49. **Just Ask for Calibration**. Authors: Tian, Mitchell, Zhou et al. Claim to know: Verbalized confidence from a black-box model, and how far it can be trusted.
50. **Large Language Models Cannot Self-Correct Reasoning Yet** `[core]`. Authors: Huang, Chen, Mishra et al. Claim to know: Self-critique without external feedback does not reliably improve answers. Read it alongside Self-Refine and Reflexion, which claim the opposite under different conditions.
51. **AI Models Collapse When Trained on Recursively Generated Data**. Authors: Shumailov, Shumaylov, Zhao et al. Claim to know: Model collapse, and why self-reflective loops and synthetic-data pipelines share a failure mode.

### 8. Representation, chunking, and document structure

**What.** This cluster supports chapter 12 through chapter 14.

**Why.** It connects embedding objectives, evaluation, granularity, chunking, tables, and page layout.

**Failure without it.** A candidate can select embeddings or chunks by leaderboard and label without checking task dependence, anisotropy, transfer, or structure.

**Cost and complexity.** The cluster contains 13 entries, including 3 marked `[core]`.

52. **Efficient Estimation of Word Representations in Vector Space**. Authors: Mikolov, Chen, Corrado, Dean. Claim to know: word2vec. Read the distributional argument. Know why a similarity-trained static embedding is the wrong objective for retrieval.
53. **Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks** `[core]`. Authors: Reimers and Gurevych. Claim to know: Why a cross-encoder cannot be indexed and what the siamese architecture gives up to fix it.
54. **SimCSE: Simple Contrastive Learning of Sentence Embeddings**. Authors: Gao, Yao, Chen. Claim to know: Dropout as the minimal augmentation, and the alignment/uniformity framing.
55. **MTEB: Massive Text Embedding Benchmark**. Authors: Muennighoff, Tazi, Magne, Reimers. Claim to know: This is the benchmark you will be asked about when someone proposes an embedding model. Leaderboard position is task-dependent.
56. **How Contextual are Contextualized Word Representations?**. Authors: Ethayarajh. Claim to know: Anisotropy in contextual embedding space, and why raw cosine similarity is misleading without it.
57. **Dense X Retrieval: What Retrieval Granularity Should We Use?** `[core]`. Authors: Chen, Zhang, Zhang et al. Claim to know: Propositions as the retrieval unit. This is the clearest statement that granularity is a first-class design decision.
58. **Is Semantic Chunking Worth the Computational Cost?** `[core]`. Authors: Qu, Tu, Bao. Claim to know: The negative result. The published advantage largely does not transfer because chunking benchmarks are built by stitching unrelated documents together.
59. **RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval**. Authors: Sarthi, Abdullah, Tuli et al. Claim to know: Recursive summarization as a granularity ladder, and the thematic queries flat chunking cannot serve.
60. **Mix-of-Granularity: Optimize the Chunking Granularity for RAG**. Authors: Zhong, Liu, Wang et al. Claim to know: Route over chunk sizes rather than choosing one.
61. **A Critique and Improvement of an Evaluation Metric for Text Segmentation**. Authors: Pevzner and Hearst. Claim to know: WindowDiff, and why `P_k` under-penalizes certain boundary errors.
62. **TaPas: Weakly Supervised Table Parsing via Pre-training**. Authors: Herzig, Nowak, Muller et al. Claim to know: Row and column position embeddings, and the assumptions they bake in.
63. **TableFormer: Robust Transformer Modeling for Table-Text Encoding**. Authors: Yang, Gupta, Upadhyay et al. Claim to know: The order-invariance fix, and the measurement showing that row order changed answers before it.
64. **LayoutLM: Pre-training of Text and Layout for Document Image Understanding**. Authors: Xu, Li, Cui et al. Claim to know: Layout as a first-class input rather than a preprocessing step.

### 9. Vector indexes and compression

**What.** This cluster supports chapter 15 through chapter 17.

**Why.** It supplies the graph, compression, storage, filtering, benchmarking, dimensionality, and tail-latency foundations.

**Failure without it.** A candidate can quote one latency number without deriving the index, checking recall, or understanding fan-out and high-dimensional limits.

**Cost and complexity.** The cluster contains 15 entries, including 5 marked `[core]`.

65. **Skip Lists: A Probabilistic Alternative to Balanced Trees** `[core]`. Authors: Pugh. Claim to know: Read this before the HNSW paper. The expected search cost `L(n)/p + 1/(1 - p)` is the derivation HNSW inherits. Deriving HNSW from a skip list on a whiteboard is a visible differentiator.
66. **Efficient and Robust Approximate Nearest Neighbor Search Using Hierarchical Navigable Small World Graphs** `[core]`. Authors: Malkov and Yashunin. Claim to know: Know `m_L = 1/ln M`, `M_0 = 2M`, the select-neighbors heuristic, and that memory is `4d + 8M` bytes per vector.
67. **Approximate Nearest Neighbor Algorithm Based on Navigable Small World Graphs**. Authors: Malkov, Ponomarenko, Logvinov, Krylov. Claim to know: Flat NSW, and why the hierarchy was needed.
68. **Product Quantization for Nearest Neighbor Search** `[core]`. Authors: Jegou, Douze, Schmid. Claim to know: The `k^m` against `km` argument. Explain why codebook cost is independent of the number of subvectors.
69. **Optimized Product Quantization for Approximate Nearest Neighbor Search**. Authors: Ge, He, Ke, Sun. Claim to know: Learning the rotation before splitting, and when it is worth the extra step.
70. **Billion-Scale Similarity Search with GPUs** `[core]`. Authors: Johnson, Douze, Jegou. Claim to know: FAISS. This is the source against which the book sanity-checks its memory rules of thumb.
71. **DiskANN: Fast Accurate Billion-point Nearest Neighbor Search on a Single Node**. Authors: Subramanya, Devvrit, Kadekodi et al. Claim to know: Vamana, and the SSD-resident regime where the graph no longer has to fit in RAM.
72. **FreshDiskANN: A Fast and Accurate Graph-Based ANN Index for Streaming Similarity Search**. Authors: Singh, Subramanya, Krishnaswamy, Simhadri. Claim to know: Deletion and insertion in a graph index without a full rebuild. Read it alongside the tombstone material.
73. **Similarity Estimation Techniques from Rounding Algorithms**. Authors: Charikar. Claim to know: SimHash, and the LSH collision-probability argument.
74. **Approximate Nearest Neighbors: Towards Removing the Curse of Dimensionality**. Authors: Indyk and Motwani. Claim to know: The original LSH result, and the formal statement of what breaks in high dimensions.
75. **When Is "Nearest Neighbor" Meaningful?** `[core]`. Authors: Beyer, Goldstein, Ramakrishnan, Shaft. Claim to know: Distance concentration. It is why exact search dies and approximate search is not a compromise but a necessity.
76. **ANN-Benchmarks: A Benchmarking Tool for Approximate Nearest Neighbor Algorithms**. Authors: Aumuller, Bernhardsson, Faithfull. Claim to know: The recall-versus-QPS curve as the reporting convention. Ask for this plot whenever a vendor quotes one latency number.
77. **Matryoshka Representation Learning**. Authors: Kusupati, Bhatt, Rege et al. Claim to know: Nested embeddings that can be truncated after training. This is the cheapest available dimensionality knob.
78. **ACORN: Performant and Predicate-Agnostic Search Over Vector Embeddings**. Authors: Patel, Kraft, Guestrin, Zaharia. Claim to know: Filtered search without a separate index per predicate, and the over-filtering failure it addresses.
79. **The Tail at Scale**. Authors: Dean and Barroso. Claim to know: This is not a retrieval paper. Read it for why p99 latency in a sharded index is governed by fan-out, the single most common surprise in a vector-store rollout.

### 10. Ranking: lexical, dense, sparse, multi-vector

**What.** This cluster supports chapter 18 through chapter 23.

**Why.** It covers lexical ranking, dense and sparse training, late interaction, reranking, learning to rank, evaluation, datasets, and fusion.

**Failure without it.** A candidate can default to dense-only retrieval without its out-of-domain counterexample, storage cost, benchmark bias, or ranking metrics.

**Cost and complexity.** The cluster contains 17 entries, including 8 marked `[core]`.

80. **The Probabilistic Relevance Framework: BM25 and Beyond** `[core]`. Authors: Robertson and Zaragoza. Claim to know: This is the reference for BM25. Know where `k_1` and `b` enter and why the length discount sits inside the saturation denominator.
81. **Okapi at TREC-3**. Authors: Robertson, Walker, Jones et al. Claim to know: The original evaluation, and the source of the default parameter values everyone repeats.
82. **Pivoted Document Length Normalization**. Authors: Singhal, Buckley, Mitra. Claim to know: Why length normalization was needed at all, shown empirically.
83. **A Statistical Interpretation of Term Specificity**. Authors: Sparck Jones. Claim to know: IDF's origin. This is short and still the clearest statement of the intuition.
84. **Dense Passage Retrieval for Open-Domain Question Answering** `[core]`. Authors: Karpukhin, Oguz, Min et al. Claim to know: This is the most-cited paper in the book. Know the in-batch negative training setup and the bi-encoder efficiency argument.
85. **Approximate Nearest Neighbor Negative Contrastive Learning** `[core]`. Authors: Xiong, Xiong, Li et al. Claim to know: ANCE. Know the gradient-norm argument for why hard negatives matter and why the index must refresh during training.
86. **Unsupervised Dense Information Retrieval with Contrastive Learning**. Authors: Izacard, Caron, Hosseini et al. Claim to know: Contriever, and how far retrieval can go without labeled pairs.
87. **BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models** `[core]`. Authors: Thakur, Reimers, Ruckle et al. Claim to know: BM25 beats many dense retrievers out of domain. This result reset the field's expectations. Cite it when someone proposes dense-only retrieval.
88. **SPLADE: Sparse Lexical and Expansion Model for First Stage Ranking** `[core]`. Authors: Formal, Piwowarski, Clinchant. Claim to know: Learned sparse retrieval. Expansion is implicit in the MLM head, and FLOPS regularization makes sparsity a trainable objective.
89. **ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction** `[core]`. Authors: Khattab and Zaharia. Claim to know: Late interaction and MaxSim. Know the storage cost per token and why that is what ColBERTv2 attacks.
90. **ColBERTv2: Effective and Efficient Retrieval via Lightweight Late Interaction**. Authors: Santhanam, Khattab, Saad-Falcon et al. Claim to know: Residual compression brings multi-vector storage into range.
91. **Passage Re-ranking with BERT**. Authors: Nogueira and Cho. Claim to know: The cross-encoder reranker in its simplest form, and the two-stage architecture everything since assumes.
92. **Document Ranking with a Pre-trained Sequence-to-Sequence Model**. Authors: Nogueira, Jiang, Pradeep, Lin. Claim to know: monoT5. It scores by the logit of one token. Know why that is a classification objective rather than a ranking objective.
93. **From RankNet to LambdaRank to LambdaMART: An Overview** `[core]`. Authors: Burges. Claim to know: This is the clearest account of why a gradient can be defined without defining a loss, the central idea in learning to rank.
94. **Cumulated Gain-Based Evaluation of IR Techniques** `[core]`. Authors: Jarvelin and Kekalainen. Claim to know: nDCG's origin. Know why the discount is logarithmic and what the normalizer is computed from.
95. **MS MARCO: A Human Generated MAchine Reading COmprehension Dataset**. Authors: Nguyen, Rosenberg, Song et al. Claim to know: The training and evaluation set behind most published retrieval numbers, and the source of its own biases.
96. **Reciprocal Rank Fusion Outperforms Condorcet and Individual Rank Learning Methods**. Authors: Cormack, Clarke, Buettcher. Claim to know: RRF, and the origin of `k = 60` as a measured rather than derived constant.

### 11. Query understanding and control flow

**What.** This cluster supports chapter 24 through chapter 26.

**Why.** It connects query reformulation, expansion, retrieval gates, correction, multi-hop control, and learned search.

**Failure without it.** A candidate can propose a controller without its drift mode, generation hallucinations, evaluation cost, supervision source, or stopping rule.

**Cost and complexity.** The cluster contains 16 entries, including 5 marked `[core]`.

97. **Relevance feedback in information retrieval**. Authors: Rocchio. Claim to know: The original query-vector update. Everything in modern reformulation descends from it.
98. **Query Expansion Using Local and Global Document Analysis**. Authors: Xu and Croft. Claim to know: Pseudo-relevance feedback, and the drift failure mode that makes unsupervised use risky.
99. **Precise Zero-Shot Dense Retrieval without Relevance Labels** `[core]`. Authors: Gao, Ma, Lin, Callan. Claim to know: HyDE. Generate a hypothetical answer so the query lives in document space. Know that it inherits the generator's hallucinations.
100. **Query2doc: Query Expansion with Large Language Models**. Authors: Wang, Yang, Wei. Claim to know: The same idea in expansion form, with a cost comparison worth knowing.
101. **Document Expansion by Query Prediction** `[core]`. Authors: Nogueira, Yang, Lin. Claim to know: doc2query. Move cost to indexing time instead of query time. This is the cleanest answer to vocabulary mismatch under a latency budget.
102. **Task-Oriented Query Reformulation with Reinforcement Learning**. Authors: Nogueira and Cho. Claim to know: Rewriting trained against retrieval reward rather than against a reference rewrite.
103. **Active Retrieval Augmented Generation** `[core]`. Authors: Jiang, Xu, Gao et al. Claim to know: FLARE. Know the confidence trigger and the distinction between implicit and explicit query formation.
104. **Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection** `[core]`. Authors: Asai, Wu, Wang et al. Claim to know: Reflection tokens as learned control. Know that the critic is distilled into the generator rather than run separately.
105. **Corrective Retrieval Augmented Generation**. Authors: Yan, Xu, Ran et al. Claim to know: CRAG evaluates retrieved quality, decomposes, and falls back to web search. Know what its evaluator costs and where it is fragile.
106. **Adaptive-RAG: Learning to Adapt Retrieval-Augmented LLMs through Question Complexity**. Authors: Jeong, Baek, Cho et al. Claim to know: Silver-label supervision for a complexity router, and the honest account of where those labels come from.
107. **Unified Active Retrieval for Retrieval Augmented Generation**. Authors: Cheng et al. Claim to know: Four lightweight classifiers over frozen hidden states, composed into one decision tree. This is the most directly implementable gating design in the book.
108. **Interleaving Retrieval with Chain-of-Thought Reasoning** `[core]`. Authors: Trivedi, Balasubramanian, Khot, Sabharwal. Claim to know: IRCoT. The recursive pattern for multi-hop retrieval, and the reason one-shot retrieval fails on compositional questions.
109. **Measuring and Narrowing the Compositionality Gap in Language Models**. Authors: Press, Zhang, Min et al. Claim to know: Self-Ask, and a crisp definition of the gap multi-hop retrieval exists to close.
110. **Search-R1: Training LLMs to Reason and Leverage Search Engines with Reinforcement Learning**. Authors: Jin, Zhang, Yoon et al. Claim to know: Learned stopping. Read it with the GRPO paper for the optimization side.
111. **DeepSeekMath: Pushing the Limits of Mathematical Reasoning**. Authors: Shao, Wang, Zhu et al. Claim to know: The GRPO algorithm itself, which Search-R1 optimizes with.
112. **HotpotQA: A Dataset for Diverse, Explainable Multi-hop Question Answering**. Authors: Yang, Qi, Zhang et al. Claim to know: The multi-hop benchmark, and the shortcut artifacts that make some reported gains illusory.

### 12. Training the retriever and the generator

**What.** This cluster supports chapter 27 through chapter 29.

**Why.** It covers pre-training with retrieval, passage fusion, black-box generators, instruction tuning, distractors, differentiability, synthetic data, and supervision limits.

**Failure without it.** A candidate can say "train jointly" without understanding index staleness, decode cost, narrow interfaces, filtering, or recursive-data failure.

**Cost and complexity.** The cluster contains 14 entries, including 6 marked `[core]`.

113. **REALM: Retrieval-Augmented Language Model Pre-Training** `[core]`. Authors: Guu, Lee, Tung et al. Claim to know: Retrieval inside pre-training, and the asynchronous index refresh that makes it tractable. This is the origin of the staleness problem every joint-training design inherits.
114. **Leveraging Passage Retrieval with Generative Models for Open Domain Question Answering** `[core]`. Authors: Izacard and Grave. Claim to know: Fusion-in-Decoder. Passages are encoded independently and fused in the decoder. Know what that costs at decode time.
115. **FiD-Light: Efficient and Effective Retrieval-Augmented Text Generation**. Authors: Hofstatter, Chen, Raman, Zamani. Claim to know: The cost fix for FiD, and the quality it trades.
116. **REPLUG: Retrieval-Augmented Black-Box Language Models** `[core]`. Authors: Shi, Min, Yasunaga et al. Claim to know: Train the retriever against a frozen LLM by ensembling output distributions. Know the role of temperature and that the interface is deliberately narrow.
117. **RA-DIT: Retrieval-Augmented Dual Instruction Tuning**. Authors: Lin, Chen, Chen et al. Claim to know: Tune both halves without joint backpropagation.
118. **RAFT: Adapting Language Model to Domain Specific RAG** `[core]`. Authors: Zhang, Patil, Jain et al. Claim to know: Train with distractors deliberately in the context. This is the most directly actionable training result in this part.
119. **The Power of Noise: Redefining Retrieval for RAG Systems**. Authors: Cuconasu, Trappolini, Siciliano et al. Claim to know: The counterintuitive finding that some irrelevant context can help, and the conditions under which it does not.
120. **Making Retrieval-Augmented Language Models Robust to Irrelevant Context**. Authors: Yoran, Wolfson, Ram, Berant. Claim to know: The complementary robustness-training result.
121. **Categorical Reparameterization with Gumbel-Softmax**. Authors: Jang, Gu, Poole. Claim to know: The differentiability fix for discrete selection, which is what stands between a retriever and end-to-end gradients.
122. **InPars: Unsupervised Dataset Generation for Information Retrieval** `[core]`. Authors: Bonifacio, Abonizio, Fadaee, Nogueira. Claim to know: Generate queries from documents. Know the filtering step, which is where the quality actually comes from.
123. **Promptagator: Few-shot Dense Retrieval From 8 Examples** `[core]`. Authors: Dai, Zhao, Ma et al. Claim to know: Retrieval tasks are not one task. This is the argument against one universal retriever, in eight examples per task.
124. **Synthetic QA Corpora Generation with Roundtrip Consistency**. Authors: Alberti, Andor, Pitler et al. Claim to know: Consistency filtering, stated cleanly.
125. **Weak-to-Strong Generalization**. Authors: Burns, Izmailov, Kirchner et al. Claim to know: The teacher ceiling, and when a student can exceed it.
126. **The Curse of Recursion: Training on Generated Data Makes Models Forget**. Authors: Shumailov, Shumaylov, Zhao et al. Claim to know: Why a synthetic-data pipeline needs a real-data anchor.

### 13. Context assembly, attribution, and evaluation

**What.** This cluster supports chapter 30 through chapter 34.

**Why.** It covers evidence position, context use, attribution, factual precision, retrieval-aware evaluation, inconsistency detection, and judgment-set reliability.

**Failure without it.** A candidate can cite a curve or automatic score without its closed-book baseline, attribution limits, blind spots, or human-agreement gap.

**Cost and complexity.** The cluster contains 17 entries, including 5 marked `[core]`.

127. **Lost in the Middle: How Language Models Use Long Contexts** `[core]`. Authors: Liu, Lin, Hewitt et al. Claim to know: The U-curve and the comparison that matters most. A closed-book reference line shows retrieval-augmented accuracy can fall below it when evidence lands mid-context. Most readers remember the curve and forget the baseline.
128. **Make Your LLM Fully Utilize the Context**. Authors: An, Ma, Lin et al. Claim to know: IN2 training as an architectural rather than prompting response to positional bias.
129. **Found in the Middle: Calibrating Positional Attention Bias**. Authors: Hsieh, Chuang, Li et al. Claim to know: Attention calibration, and evidence that the bias is mechanical rather than semantic.
130. **Differential Transformer**. Authors: Ye, Dong, Xia et al. Claim to know: Cancel attention noise architecturally. This is the long-run fix if it holds up.
131. **Train Short, Test Long: Attention with Linear Biases**. Authors: Press, Smith, Lewis. Claim to know: ALiBi, and the positional-encoding side of the length-extrapolation question.
132. **Measuring Attribution in Natural Language Generation Models** `[core]`. Authors: Rashkin, Nikolaev, Lamm et al. Claim to know: The AIS framework. Know the two-step structure, interpretability first and attribution second. A sentence that cannot be interpreted standalone cannot be attributed at all.
133. **FEVER: a Large-scale Dataset for Fact Extraction and VERification**. Authors: Thorne, Vlachos, Christodoulopoulos, Mittal. Claim to know: The supported / refuted / not-enough-information labels that the attribution taxonomy maps onto.
134. **Teaching Language Models to Support Answers with Verified Quotes**. Authors: Menick, Trebacz, Mikulik et al. Claim to know: GopherCite, and the cost of doing attribution honestly. Sample, then rerank against the quoted span.
135. **WebGPT: Browser-assisted question-answering with human feedback**. Authors: Nakano, Hilton, Balaji et al. Claim to know: Retrieval as a browsing policy, with citation as a trained behavior rather than a post-process.
136. **AttributionBench: How Hard is Automatic Attribution Evaluation?** `[core]`. Authors: Li, Zhang, Malthus et al. Claim to know: Know how far automatic attribution judges are from human agreement. Cite this whenever someone proposes an LLM judge for grounding.
137. **FActScore: Fine-grained Atomic Evaluation of Factual Precision** `[core]`. Authors: Min, Krishna, Lyu et al. Claim to know: Atomic-fact decomposition. Know why whole-answer scoring is uninformative for long-form output.
138. **VeriScore: Evaluating the Factuality of Verifiable Claims**. Authors: Song, Kim, Iyyer. Claim to know: The recall correction for unverifiable claims, which is FActScore's main blind spot.
139. **RAGAs: Automated Evaluation of Retrieval Augmented Generation** `[core]`. Authors: Es, James, Espinosa-Anke, Schockaert. Claim to know: Faithfulness, answer relevance, and context relevance. Know what each does and does not measure before quoting a RAGAS number.
140. **SummaC: Re-Visiting NLI-based Models for Inconsistency Detection**. Authors: Laban, Schnabel, Bennett, Hearst. Claim to know: Sentence-level NLI as a faithfulness detector, and why document-level NLI fails at it.
141. **Cumulated Gain-Based Evaluation of IR Techniques**. Authors: Jarvelin and Kekalainen. Claim to know: This appears again because the evaluation chapters use it directly. The derivation is in section A.4.
142. **How Reliable Are the Results of Large-Scale Information Retrieval Experiments?**. Authors: Zobel. Claim to know: Pool depth, judgment cost, and why unjudged-means-irrelevant biases every comparison.
143. **Overview of the TREC 2019 Deep Learning Track**. Authors: Craswell, Mitra, Yilmaz et al. Claim to know: How a serious judgment set is actually built.

### 14. Trust, robustness, scale, and advanced variants

**What.** This cluster supports chapter 35 through chapter 41.

**Why.** It covers source reliability, credibility interventions, exposure, diversity, attacks, provenance, routing, attention cost, multimodal retrieval, and graph retrieval.

**Failure without it.** A candidate can promise trustworthy or advanced RAG without the source signal, attack path, authenticity boundary, serving cost, or graph-index objection.

**Cost and complexity.** The cluster contains 18 entries, including 5 marked `[core]`.

144. **Retrieval-Augmented Generation with Estimation of Source Reliability** `[core]`. Authors: Hwang, Lee, Park et al. Claim to know: RA-RAG. Reliability is estimated from cross-source agreement rather than assigned by hand. The source says this is the only version that scales.
145. **CrAM: Credibility-Aware Attention Modification**. Authors: Deng, Zhang, Wang et al. Claim to know: Down-weight attention on heads most influenced by unreliable documents. This is an inference-time intervention with no retraining.
146. **Trustworthiness in Retrieval-Augmented Generation Systems: A Survey**. Authors: Zhou, Chen, Li et al. Claim to know: The six-aspects-across-three-stages taxonomy used to organize the credibility chapter.
147. **Fairness of Exposure in Rankings**. Authors: Singh and Joachims. Claim to know: Doubly stochastic ranking policies, and the argument that exposure rather than relevance is the quantity to allocate.
148. **The Use of MMR, Diversity-Based Reranking**. Authors: Carbonell and Goldstein. Claim to know: Maximal marginal relevance. This is the classical answer to redundancy in a retrieved set and remains a reasonable baseline.
149. **Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection** `[core]`. Authors: Greshake, Abdelnabi, Mishra et al. Claim to know: This paper named RAG's native threat model. The attack arrives through retrieved content, not user input.
150. **PoisonedRAG: Knowledge Corruption Attacks to Retrieval-Augmented Generation** `[core]`. Authors: Zou, Geng, Wang, Gong. Claim to know: How few poisoned documents are needed to flip an answer. The number is smaller than most engineers expect.
151. **Universal and Transferable Adversarial Attacks on Aligned Language Models**. Authors: Zou, Wang, Kolter, Fredrikson. Claim to know: GCG. Transferable suffixes, and why guardrails trained on known attacks generalize poorly.
152. **Jailbroken: How Does LLM Safety Training Fail?**. Authors: Wei, Haghtalab, Steinhardt. Claim to know: Competing objectives and mismatched generalization as the two failure mechanisms.
153. **The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions**. Authors: Wallace, Xiao, Leike et al. Claim to know: The structural defense. Teach the model that retrieved text is data, not instruction.
154. **C2PA Technical Specification**. Authors: Coalition for Content Provenance and Authenticity. Claim to know: Content credentials. Attribution is linguistic and authenticity is cryptographic. They answer different questions.
155. **RAGRoute: Learning Which Sources to Query in Federated RAG**. Authors: Guerraoui, Kermarrec, Pires et al. Claim to know: Source selection as a learned decision, and the fan-out cost it avoids.
156. **FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness**. Authors: Dao, Fu, Ermon et al. Claim to know: Why prefill cost is dominated by memory movement. This is the foundation of the latency chapter's arithmetic.
157. **Learning Transferable Visual Models From Natural Language Supervision** `[core]`. Authors: Radford, Kim, Hallacy et al. Claim to know: CLIP. Know the contrastive setup and the three biases the multimodal chapter derives from it.
158. **MRAG-Bench: Vision-Centric Evaluation for Retrieval-Augmented Multimodal Models**. Authors: Hu, Shu, Chen et al. Claim to know: What multimodal RAG benchmarks actually measure, and how many are text-answerable.
159. **From Local to Global: A Graph RAG Approach to Query-Focused Summarization** `[core]`. Authors: Edge, Trinh, Cheng et al. Claim to know: GraphRAG. Know the community hierarchy, the map-reduce query path, and that index cost is the objection to answer first.
160. **LightRAG: Simple and Fast Retrieval-Augmented Generation**. Authors: Guo, Xia, Fang, Huang. Claim to know: The dual-level key alternative, and the incremental-update advantage it buys by giving up the hierarchy.
161. **From Louvain to Leiden: Guaranteeing Well-Connected Communities**. Authors: Traag, Waltman, van Eck. Claim to know: Why Leiden replaced Louvain, and what a disconnected community would have done to a GraphRAG summary.

### Where to start

**What.** Follow the source's ten-paper order when preparation time is one week rather than one month.

**Why.** The route preserves the five decisions, two most important negative results, index arithmetic, and threat model.

**Failure without it.** A compressed plan can reorder the source or omit one of the senior-loop coverage areas.

**Cost and complexity.** The route contains ten papers and gives up the broader coverage of the full curated list.

If time allows ten papers, read them in this exact source order:

1. Lewis et al. on RAG.
2. Mallen et al. on when not to trust it.
3. Karpukhin et al. on DPR.
4. Thakur et al. on BEIR.
5. Malkov and Yashunin on HNSW.
6. Jegou et al. on product quantization.
7. Khattab and Zaharia on ColBERT.
8. Liu et al. on Lost in the Middle.
9. Min et al. on FActScore.
10. Greshake et al. on indirect prompt injection.

The source says this set covers the five decisions, two most important negative results, index arithmetic, and the threat model. That is most of what a senior loop probes.

## Diagrams

The source appendix contains zero figures and zero tables. No captioned source visual is recreated or invented here.

## Whiteboard pack

### What to draw

1. Draw a large rectangle labeled "161 selected readings."
2. Above it, write "roughly 500 cited works" and draw a narrowing arrow into the rectangle.
3. Divide the rectangle into 14 vertical shelf sections.
4. Label the first shelf "What RAG is" and the last shelf "Trust and advanced variants."
5. Draw one sample reading card inside a shelf.
6. Write "title," "listed first authors," and "claim to know" on the card.
7. Add a `[core]` seal to the sample card.
8. Write "52 core" beside the seal.
9. Draw a path through ten cards below the shelves.
10. Label that path "one-week starting route."
11. Add a final note: "Know the result, not only the name."

### Spoken script

Appendix E maps 14 chapter clusters to 161 selected readings. Each entry gives a title, listed first authors, and one claim I should reproduce, not an abstract summary. Fifty-two entries carry the core marker, which means a senior candidate should discuss them unprompted. The list deliberately foregrounds negative results, including retrieval hurting accuracy, semantic chunking failing to transfer, weak attribution judges, and unreliable self-correction. It also includes constraints outside retrieval, such as tail latency and instruction hierarchy. With one week, I follow the ordered ten-paper route that covers design decisions, index arithmetic, and threats.

## Interview traps

### Probe 1: Why is recognizing a famous paper title insufficient?

The source expects the specific result, mechanism, comparison, or limit attached to the title. A staff-level interviewer can turn recognition into a follow-up such as asking for the baseline and outcome in Lost in the Middle.

### Probe 2: Does `[core]` mean the other readings can be ignored?

No. The marker means a senior candidate should discuss that entry without prompting, while the full list remains the curated subset worth reading. The 52 marked entries set priority inside 161 readings rather than replacing the other clusters.

### Probe 3: Why does the list emphasize negative results?

The source says these findings are underrepresented in secondary sources and overrepresented in good interviews. They include retrieval lowering accuracy, semantic chunking gains failing to transfer, weak citation quality, and unreliable self-correction without external feedback.

### Probe 4: Why include papers that are not about retrieval?

Distance concentration, tail latency, and instruction hierarchy still constrain a RAG system. Their mechanisms govern index choice, serving behavior, and the treatment of retrieved text even when the paper itself studies another problem.

### Probe 5: What does the ten-paper route preserve when time is short?

It keeps the source's exact order from foundational RAG through indirect prompt injection. The source says the route covers five decisions, two important negative results, index arithmetic, and the threat model.

## Key numbers

| Number or expression | Source commitment | Why it matters |
|---|---|---|
| Roughly 500 works | Distinct works attributed across the chapters | The appendix is not exhaustive |
| 161 entries | Curated subset that repays reading the original | This is the exact entry inventory |
| 14 clusters | Chapter-mapped reading groups | This is the exact group inventory |
| 52 `[core]` entries | Priority markers counted from the source list | These should be discussable without prompting |
| 10 starter papers | Ordered route for a reader with one week rather than one month | It is the source's compressed study plan |
| 1 follow-up question | The source says staff-level interviewers can distinguish naming from knowing this quickly | The annotation, not title recognition, is the preparation target |
| 2 usage notes | Emphasize negative results and include non-retrieval constraints that govern RAG | These notes explain the curation policy |
| Roughly 10% | Otherwise-correct answers flipped to wrong by retrieval in the Mallen et al. annotation | This is a central negative result |
| 3 memorization laws | Growth with model scale, example duplication, and context length | The source says to know them as a set |
| `C ≈ 6ND` | Scaling-law arithmetic to use live | The conclusions changed, but the arithmetic did not |
| `r(d_in + d_out)` | Rank-r LoRA parameter count | It changes the fine-tuning-versus-retrieval calculation |
| Sample count | Multiplier on generation cost for self-consistency | Sampling gains are not free |
| `L(n)/p + 1/(1 - p)` | Expected skip-list search cost | HNSW inherits the derivation |
| `m_L = 1/ln M` | HNSW level multiplier | It is one constant the core annotation requires |
| `M_0 = 2M` | HNSW base-layer relation | It is another required constant |
| `4d + 8M` bytes | HNSW memory per vector | It is the required memory rule |
| `k^m` versus `km` | Product-quantization codebook argument | Codebook cost is independent of subvector count |
| p99 | Tail-latency percentile named in The Tail at Scale | Fan-out governs it in a sharded index |
| `k_1` and `b` | BM25 parameters named in the core annotation | Their placement in the formula matters |
| `k = 60` | RRF constant | It was measured rather than derived |
| 4 classifiers | Components of the unified active-retrieval decision tree | They operate over frozen hidden states |
| 8 examples per task | Promptagator setup named in the title and annotation | It supports the argument against one universal retriever |
| 2-step AIS structure | Interpretability first, attribution second | A sentence that cannot stand alone cannot be attributed |
| 3 RAGAs measures | Faithfulness, answer relevance, context relevance | Know what each measure omits |
| 6 aspects across 3 stages | Trustworthiness taxonomy | It organizes the credibility chapter |
| 2 failure mechanisms | Competing objectives and mismatched generalization | Jailbroken asks the reader to know both |
| 3 CLIP biases | Biases derived by the multimodal chapter | The source says to know the contrastive setup and all three |
| 5 decisions | Coverage of the ten-paper starter route | The source does not enumerate them again here |
| 2 negative results | Most important negative findings covered by the starter route | They are part of the senior-loop emphasis |
| Group 1: 7 entries, 2 core | What RAG is, and when it fails | Exact group inventory |
| Group 2: 9 entries, 1 core | Editing, continual learning, long context | Exact group inventory |
| Group 3: 9 entries, 3 core | Generator benefits and failures | Exact group inventory |
| Group 4: 3 entries, 1 core | Privacy, law, datastore | Exact group inventory |
| Group 5: 7 entries, 4 core | Scaling, economics, in-context learning | Exact group inventory |
| Group 6: 5 entries, 1 core | Reading the machine | Exact group inventory |
| Group 7: 11 entries, 3 core | Prompting, sensitivity, abstention | Exact group inventory |
| Group 8: 13 entries, 3 core | Representation, chunking, document structure | Exact group inventory |
| Group 9: 15 entries, 5 core | Vector indexes and compression | Exact group inventory |
| Group 10: 17 entries, 8 core | Ranking methods | Exact group inventory |
| Group 11: 16 entries, 5 core | Query understanding and control flow | Exact group inventory |
| Group 12: 14 entries, 6 core | Training retriever and generator | Exact group inventory |
| Group 13: 17 entries, 5 core | Context, attribution, evaluation | Exact group inventory |
| Group 14: 18 entries, 5 core | Trust, robustness, scale, advanced variants | Exact group inventory |
