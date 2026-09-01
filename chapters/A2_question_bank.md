# Appendix B: Question Bank

This appendix turns the book's Retrieval-Augmented Generation (RAG) material into a timed self-test with Core, Senior, and Staff prompts plus compact answer spines.

## TL;DR

- The bank contains 123 questions. Each of the 41 chapters contributes one Core, one Senior, and one Staff prompt.
- Core prompts test whether you can name the mechanism and its failure mode without hiding behind vocabulary.
- Senior prompts test whether you can derive an answer from the stated constraints. Most strong answers include a number.
- Staff prompts test judgment when constraints change or two teams are partly right. Price both sides before deciding.
- Answer aloud before reading the key. Recognition after seeing an answer is not cold recall.
- Use the source pointer when an answer spine feels thin. The referenced section carries the full derivation and follow-up.

## The story

Imagine a flight simulator for RAG interviews. The cockpit is the interview room, the timer is the clock, and each prompt is a scenario injected by the instructor.

Core drills ask whether you can identify the instrument that failed. You must name the mechanism, separate retrieval from generation, and avoid a vague diagnosis such as "the system hallucinated."

Senior drills add weather, fuel, and distance. You must calculate from the numbers in front of you. A memorized benchmark number is like yesterday's weather report. It does not solve today's route.

Staff drills put two experienced crew members in disagreement. Both see a real risk. Your job is to price each option, concede the valid concern on each side, choose a course, and name the condition that would make you turn back.

The answer key is the flight recorder. It does not fly the scenario for you. It shows the first move, the derivation to narrate, and the follow-up an interviewer is likely to press.

The section pointer is the simulator manual. When the recorder gives only a short spine, the pointer leads to the full mechanism rather than inviting a guess.

Run one part at a time. Set ninety seconds, speak before looking, and score whether you produced the reasoning cold. Familiarity after opening the key does not count as a safe landing.

The three tiers do not rank sentence difficulty. They rank the behavior under test: mechanism, derivation, and judgment under changed constraints.

## Decoder table

| Technical term | Plain-English meaning | Why it matters |
|---|---|---|
| RAG | Retrieval plus generation from retrieved evidence | Every prompt tests a stage, interaction, or operational constraint in this pipeline |
| Large language model (LLM) | A generator trained over large text collections | Several prompts ask whether facts belong in its weights or in a datastore |
| Billion-parameter suffix (B) | A model-size shorthand, as in 8B or 70B | Model size affects training, serving, and memory costs |
| Million-scale suffix (M) | A quantity shorthand, as in 2M chunks | Corpus and identifier spaces often use this scale |
| Machine learning (ML) | Learning statistical behavior from data | The Staff prompts separate model research goals from platform and legal constraints |
| Storage units (KiB, MB, GB, TB) | Kibibytes, megabytes, gigabytes, and terabytes | They make memory and index trade-offs concrete |
| Stock-keeping unit (SKU) | An exact product identifier | Dense semantic representations can lose rare literal strings |
| Fine-tuning | Updating model weights on task data | It is appropriate for behavior more often than fast-changing knowledge |
| Supervised fine-tuning (SFT) | Weight updates from labeled input-output examples | Several answer spines price SFT against prompting and retrieval |
| Datastore D | The external store holding current knowledge | A row can be updated or deleted without retraining the model |
| Full-precision 32-bit floating point (fp32) | Four-byte numeric storage | Training and index examples use it for memory arithmetic |
| Model editing | Changing a small set of weights for a fact | It can be fast but still requires a broad regression check |
| Hallucination | An unsupported or incorrect generated claim | The bank requires a stage-specific diagnosis instead of this blanket label |
| Exact match | Literal token or identifier matching | It protects part numbers and SKUs that semantic pooling can blur |
| Graphics processing unit (GPU) | Hardware used for model training and inference | GPU-hours turn architecture choices into costs |
| Floating-point operations (FLOPs) | A count of arithmetic work | Training-budget questions derive model and data scale from compute |
| Training compute C, parameters N, and training tokens D | The three quantities in the scaling relation C ≈ 6ND | The compute budget does not determine model size until the parameter-token ratio is chosen |
| Fine-tuning tokens D_SFT, prompt count k, and demonstration length t_d | The quantities used to compare one training run with repeated prompt processing | Their ratio sets the stated fine-tuning break-even point |
| Prefill variables P and T | Model parameters and prompt tokens in the 2PT cost relation | They explain why a larger context can dominate retrieval latency |
| Kaplan scaling | The earlier compute-scaling prescription named in the bank | A Senior prompt asks why it differs from Chinchilla |
| Chinchilla scaling | A compute-optimal balance of parameters and tokens | The answer must also account for lifetime inference volume |
| In-context learning (ICL) | Learning behavior from examples placed in the prompt | Production drift can come from ICL rather than retrieval |
| Few-shot prompting | Supplying a small fixed set of examples in context | Unlike retrieval, the demonstrations are selected before the query is known |
| Attention heat map | A visualization of attention weights | Attention mass does not prove causal influence on an output |
| Leave-one-out attribution | Removing one context item and rerunning the model | Redundant evidence can make every single-item marginal appear to be zero |
| Shapley value | Credit averaged over subsets of evidence | It handles redundancy but can require exponentially many replays |
| Circuit analysis | Tracing internal model computation paths | Exhaustive per-answer analysis is too expensive at large depth |
| Replay data | Older examples mixed into an update | It limits regression after a weight change |
| Canary set | A frozen evaluation slice used before release | It gates an update against known regressions |
| Context template | The labels and ordering wrapped around retrieved evidence | Prompt formatting can move measured accuracy enough to confound retriever comparisons |
| Paired test | A statistical comparison on the same evaluation items | It distinguishes real prompt changes from sampling noise |
| Standard error | Expected sampling variation in an estimate | A score movement smaller than about two errors may be noise |
| Evaluation proportion p | The observed success rate in the standard-error example | It turns 500 binary outcomes into a sampling-noise estimate |
| Abstention | Choosing not to answer | Its threshold trades wrong answers against refusals |
| Threshold tau | The gate that converts a score into answer or abstain | Lowering it may violate the protected error constraint |
| Wrong-answer cost c_w | The loss assigned to an incorrect answer | A checkable span can reduce its effective value without weakening the protected error rule |
| Checkable span | A cited passage a user can verify | It lowers the effective cost of a wrong answer |
| Best Matching 25 (BM25) | A sparse lexical ranking function | Saturation and length normalization improve on raw term counts |
| Term frequency-inverse document frequency (TF-IDF) | A lexical weight using term rarity and frequency | The Core bank asks what BM25 fixes relative to it |
| Sparse retrieval | Search over explicit term dimensions | It preserves rare exact tokens and uses posting lists |
| Dense retrieval | Search over learned vectors | It handles synonymy but can blur rare strings and polysemy |
| Tokenizer vocabulary | The set of token units an encoder can represent directly | An out-of-vocabulary SKU can become a pooled representation failure |
| Mean pooling | Averaging token or patch vectors | A rare feature contributes only a fraction of the final vector |
| Count n in 1/n and n + 1 | The number of pooled units or attribution removals, depending on context | The appendix overloads n, so each formula must be read with its local mechanism |
| Chunk | The unit indexed and passed to the generator | It must preserve the clause, function, row, or other answer-bearing unit |
| Chunk overlap | Repeated text across adjacent chunks | It reduces severance at a storage and prefill cost |
| Chunk symbols s, L, and o | Answer-span length, chunk length, and overlap | They define severance probability, the overlap guarantee, and token inflation |
| Semantic chunking | Splitting at inferred topic boundaries | Synthetic evaluation boundaries can flatter it |
| Portable Document Format (PDF) | A fixed-layout document format | Tables can lose headers and row relationships during ingestion |
| Optical character recognition (OCR) | Converting document pixels into text | OCR can discard layout that a page-image index retains |
| Structured Query Language (SQL) | A language for querying structured tables | Aggregation questions may belong in SQL rather than vector search |
| Approximate nearest neighbor (ANN) search | Fast vector search that sacrifices exactness | Index latency depends on vector count, dimension, and graph parameters |
| Hierarchical Navigable Small World (HNSW) | A layered proximity-graph index | Questions derive its height, memory, deletion, and sharding behavior |
| HNSW symbols q, M, j, L, and n | Query vector, graph degree base, layer number, height, and vector count | They derive the six-layer example from Pr[level ≥ j] = M^-j |
| Skip list | A layered ordered search structure | It supplies the analogy used to derive HNSW |
| k-dimensional tree (kd-tree) | A tree that prunes space by coordinate gaps | Pruning fails in high dimensions when the search radius dominates one coordinate |
| kd-tree symbols q_i, s, r, and d | One query coordinate, split value, search radius, and dimension | The pruning test compares a coordinate gap with a radius near sqrt(2d) |
| Random-access memory (RAM) | Fast working memory available to an index | Index compression starts by converting RAM into bytes per vector |
| Flat index | An uncompressed collection of full vectors | It establishes the memory baseline for compression |
| Product quantization (PQ) | Compression with learned subvector codebooks | It reduces vector bytes while trading some recall |
| Product-quantization symbols k, m, and d | Centroids per codebook, code bytes, and vector dimension | They turn the one-gigabyte budget into the stated 96-byte code |
| Inverted file with product quantization (IVF-PQ) | Coarse partitioning followed by PQ codes | It is the named compression route for the largest corpus drill |
| Binary quantization | Mapping vector signs to bits | It avoids a learned codebook but fixes cells before seeing the data |
| Codebook | A learned set of representative centroids | Its size determines memory, training cost, and expressiveness |
| Hamming distance | The number of differing bits | Binary codes can compare it quickly with popcount |
| Popcount | Counting set bits in a machine word | It makes binary-code distance cheap |
| Tombstone | A deletion marker hiding an indexed item | It removes a result immediately while bytes wait for rebuild |
| Re-indexing | Rebuilding or refreshing an index | Build cost, churn, query rate, and erasure deadlines set its cadence |
| Mean squared error (MSE) | A regression loss on score differences | It can improve while rank order stays unchanged |
| argsort(s) | The ordering induced by a score vector s | nDCG stays fixed when every score shifts but the ordering does not |
| Normalized discounted cumulative gain (nDCG) | A rank metric that rewards relevant items near the top | It depends on ordering rather than absolute score calibration |
| Relevance grade y | The integer label used in gain 2^y - 1 | Nonlinear gain rejects the claim that adjacent grades are evenly spaced |
| Precision at k | Relevant results divided by the first k results | It does not reveal where relevant items sit within the set |
| Recall at k | Fraction of needed evidence found in the first k results | A high topical recall can still miss evidence chains or timestamps |
| Mean reciprocal rank (MRR) | Average reciprocal rank of the first relevant result | It distinguishes systems that tie on set-based metrics |
| F1 score | A balance of precision and recall | Its ceiling can make a requested safety threshold unreachable |
| Bi-encoder | Separate query and document encoders | Offline document vectors make it fast but bind the index to encoder weights |
| Cross-encoder | A joint query-document scorer | It is accurate but too expensive to scan a large corpus |
| Sparse Lexical and Expansion Model (SPLADE) | A learned sparse retriever that adds predicted terms | More nonzero query dimensions improve recall and lengthen posting-list work |
| Posting list | The documents attached to one sparse term | Query expansion increases the number of lists traversed |
| Reranker | A second stage that reorders retrieved candidates | It cannot recover a relevant document below rerank depth |
| First-stage and second-stage recall (R1 and R2) | Candidate coverage followed by ordering into final context | Their product can hide which retrieval stage failed |
| Candidate depth k0 and context depth k | How many items reach reranking versus generation | Decoupling them protects recall without overfilling the prompt |
| Reranking depths k and m | Candidate recall depth and final context depth in the Senior comparison | Similar recall at both depths means the first-stage ceiling was already saturated |
| Slice rates gamma and beta | The proportions where RAG loses or wins against closed-book answering | Their difference is the aggregate accuracy margin |
| Generative retrieval | Producing document identifiers as model output | Its index moves into identifiers, weights, and constrained decoding |
| Identifier symbols k, L, and N | Alphabet size, identifier length, and count of real documents | k^L can exceed N and create valid-looking identifiers that point nowhere |
| Identifier (ID) | A valid name for one indexed document | A generative retriever must not emit IDs outside the corpus |
| Constrained decoding | Restricting output to valid identifiers | It prevents well-formed but nonexistent document IDs |
| Trie | A prefix tree of valid strings | It supplies the constraint during identifier generation |
| Vocabulary mismatch | Query and document using different surface forms | Synonym expansion or document-side generation can repair it |
| Synonymy | Different words sharing meaning | Dense retrieval absorbs it better than exact lexical search |
| Polysemy | One word carrying multiple senses | Query context, not synonym expansion alone, must disambiguate it |
| WordNet | The named synonym resource in the bank | Its expansion raises recall by construction and can lower ranking quality |
| Boolean OR | A query operator accepting any clause | It distinguishes operator over-filtering from missing vocabulary |
| Retrieval gate | A decision to skip or invoke retrieval | One threshold can trade saved calls against retrieval-only-correct answers |
| Token-level confidence | Generator probability on its next token | It measures fluency more directly than truth |
| Query popularity | A signal available before generation | It can gate retrieval without relying on generator confidence |
| Multi-hop query | A question requiring more than one evidence step | Reordering one retrieval round cannot manufacture the missing bridge term |
| Query decomposition | Splitting a question into sequential retrieval steps | It changes the query and can solve bridge-term failures |
| Prompt comparison delta-hat, delta-star, and f0 | The observed shared-template gap, each arm's optimized gap, and the shared template | They expose prompt format as a confound when retrievers are compared |
| Low-rank adaptation (LoRA) | A parameter-efficient fine-tuning method | A nightly run is still expensive and risky for a fast policy update |
| Application programming interface (API) | A hosted model boundary | It can hide generator weights and gradients from training |
| Generator parameters theta | The weights that produce answers | Hosted access can make them unreachable |
| Retriever parameters phi | The weights that score candidates | Updating them invalidates precomputed document vectors |
| Rebuild interval T-star and beam-inflation fraction phi | The chosen rebuild cadence and the fraction at which graph search consumes p95 | Here phi is an operational fraction, not the retriever parameters above |
| Arg max | The discrete choice of the top candidate | It blocks an end-to-end gradient between retriever and generator |
| Document-side query expansion | Appending predicted queries to indexed documents | It pays once at ingestion instead of on every live query |
| Upsert | Inserting or replacing one indexed record | A policy change can use it instead of a full checkpoint run |
| Lost in the middle | Lower use of evidence placed in the center of a long context | More retrieved evidence can lower end-to-end accuracy |
| Synthetic key-value task | A lookup task with reasoning removed | It isolates position effects from reasoning difficulty |
| Question answering (QA) | Producing an answer to a question | Multi-document and synthetic QA expose different failure causes |
| Attribution | Linking a claim to the source used during generation | A citation mark alone does not prove support or truth |
| Explicature | A complete claim reconstructed from context | Attribution must check the resolved claim, not an ambiguous sentence fragment |
| Faithfulness | Whether an answer follows the supplied context | It can run without an external truth oracle |
| Factuality | Whether an answer is true in the world | It may need external retrieval and a recall correction |
| FActScore | The named factuality-style benchmark | A weekly oracle may not fit every pull request's cost and rate limits |
| Continuous integration (CI) | Automated checks on proposed code changes | Per-push and nightly truth checks need different schedules |
| Oracle | A source used to judge an answer | Context-only and external oracles have different cost and coverage |
| End-to-end accuracy | Correctness across retrieval and generation together | Equal totals can hide opposite stage failures |
| Accuracy symbols A, h, c1, and c0 | Total accuracy, retrieval hit rate, correctness with a hit, and correctness without a hit | The decomposition A = h c1 + (1 - h)c0 localizes a system-level change |
| Oracle and no-generation accuracies A_orc and A_ng, plus retrieval rate R | The three measurements in the training-budget comparison | Their differences price marginal retriever and generator work |
| Trust axes | Privacy, fairness, and other separate deployment properties | Similar aggregate area does not make risk profiles interchangeable |
| Personally identifiable information (PII) | Data that can identify a person | Pretraining provenance cannot be certified after identity is erased by tokenization |
| Coalition for Content Provenance and Authenticity (C2PA) | A content-credential standard | A valid credential checks integrity and signer chain, not truth |
| Provenance | Evidence about where content came from | It is distinct from whether the content is authentic or true |
| Provenance score p(d) | A graded confidence assigned to document d | It preserves legacy evidence while reserving 1 for verified documents and 0 for no signal |
| Authenticity gate | A check that a source itself is genuine | Attribution precision on genuine-only benchmarks cannot measure this failure |
| Service-level objective (SLO) | A latency or reliability target | Many Senior and Staff choices depend on the binding budget |
| p50, p95, and p99 | Median, 95th-percentile, and 99th-percentile latency | Tail and median bottlenecks can sit in different stages |
| Time to first token (TTFT) | Delay before generation starts | Prefill often dominates it |
| Prefill | Processing the prompt before decoding | Its attention cost grows quickly with context length |
| Decode | Producing output tokens one at a time | It can dominate total latency and is memory-bandwidth-bound |
| Queries per second (QPS) | Request throughput | It determines replica load once per-shard work is known |
| Shard | One partition of an index | Capacity, load, and compliance require different partition axes |
| Scatter-gather | Sending a query to multiple shards and merging results | Every shard can still see the full system query rate |
| Federation | Coordinating separate compliant stores | It can preserve legal boundaries while sharing a query surface |
| Data residency | A requirement that data stay in an allowed jurisdiction | Hash sharding is blind to it |
| Replica | Another serving copy of a shard | Replicas add throughput without changing corpus partitioning |
| Hybrid retrieval | A lexical and dense path used together | It preserves exact identifiers while retaining semantic matching |
| Contrastive Language-Image Pre-training (CLIP) | A shared image-text encoder | Global pooling can lose table and chart detail |
| ColPali | A page-image retriever using patch vectors | It avoids OCR loss at a large storage multiplier |
| Modality threshold | A retrieval cutoff calibrated for one data type | Shared-space scores still differ by modality |
| GraphRAG | RAG over an extracted graph | A stable taxonomy and raw conversations do not share extraction portability |
| Knowledge graph | Entities and relations connected as a graph | Full extraction cost, duplication, and updates shape its value |
| Dual-level indexing | An incremental graph design that refreshes only touched entities | It avoids repaying full extraction cost on every update |
| Unlearning | Removing learned influence from model weights | Per-notice gradients and uncertain collateral effects make it different from deleting a datastore row |
| Extractability | Whether training material can be elicited from a model | A small mixing weight does not measure this risk because duplication also matters |
| Rank-constrained update | A weight update limited to a small parameter structure | It is one regression-control lever for an offline correction |
| Learning-rate schedule | The planned change in update size during training | Mismatched schedules can bias comparisons across run lengths |
| Masked language model (MLM) head | A vocabulary-wide predictor used to create sparse expansion weights | It lets absent query terms receive nonzero retrieval weight |
| Soft matching | Matching related terms instead of requiring every Boolean clause | It repairs operator-driven zero results but not missing vocabulary |
| Macro-F1 | F1 averaged across classes | Its stated ceiling helps show when a requested precision target is unreachable |
| Service-level agreement (SLA) | A promised operational deadline | Same-day updates can require incremental indexing |
| European Union (EU) and United States (US) | Jurisdictions named in the sharding prompt | Their data cannot be mixed when residency rules forbid it |
| Core difficulty tier | Recall and explain the mechanism | Missing one can end a phone screen |
| Senior difficulty tier | Derive from constraints and diagnose before fixing | A number belongs in almost every answer |
| Staff difficulty tier | Resolve a changed constraint or partial disagreement | A strong answer prices options and names its reversal condition |

## Core mechanics

The source keeps all answer spines in section B.4 so the prompts can be used for self-testing. Each spine identifies what to say first, what to derive, and which follow-up to expect. It is a revision aid rather than a complete script.

### B.1 Core Questions

Difficulty marker: Core. Expected of anyone who claims RAG on a resume. These prompts test whether the vocabulary is real and whether the mechanism is understood. Failing one can end a phone screen. Answer before reading the spine.

#### Part I - The RAG Interview Landscape

**Core 1, §1.1. Prompt:** "We fine-tuned an 8B model on our product catalog and it still invents SKUs. What do you change?"
**Expected reasoning:** Name the category error. A catalog is high-cardinality, low-frequency, fast-changing knowledge that weight compression destroys. Move it to datastore D, reserve fine-tuning for response format, and add an exact-match leg for SKUs.

**Core 2, §2.2. Prompt:** "One product fact in your assistant is wrong. You have a 27B model. Walk me through your options and pick one."
**Expected reasoning:** Price three options. Full retraining needs 108 GB for the fp32 forward pass alone. Editing changes about 20,000 numbers in seconds but requires a full re-benchmark. Retrieval updates one row and ships. Name the condition that decides among them.

**Core 3, §3.2. Prompt:** "Walk me through naive RAG and tell me what breaks."
**Expected reasoning:** Name retrieval and generation, then separate three failures. Retrieval can return an irrelevant passage. Generation can skip a required reasoning step despite correct evidence. Chunking can repeat the same fact three times. "It hallucinates" hides these causes.

#### Part II - The Generator Side

**Core 4, §4.1. Prompt:** "Our assistant quotes last quarter's pricing. Would you fine-tune it on the new price list?"
**Expected reasoning:** Reject the premise. Pricing changes faster than retraining, so it belongs in a datastore. One 27B refresh costs roughly 1,324 GPU-hours and expires at the next change. The same spend buys about 15 million retrieval-augmented queries.

**Core 5, §5.1. Prompt:** "Where does the training data for a model like this actually come from?"
**Expected reasoning:** Walk through crawl, extraction, filtering and deduplication, then tokenization. Attach a source number such as 20 TB per snapshot reduced to 750 GB, and name a real composition finding. "The internet, mostly Wikipedia and books" is too weak.

**Core 6, §6.1. Prompt:** "You have 10^23 FLOPs of training budget. How many parameters should the model have?"
**Expected reasoning:** State C ≈ 6ND and ask for expected inference volume before fixing a ratio. Derive N = sqrt(C/120) under Chinchilla. A heavily served model should be about one order of magnitude smaller. Close with the memory step function.

**Core 7, §7.1. Prompt:** "When would you fine-tune the generator instead of putting examples in the prompt?"
**Expected reasoning:** Split behavior from knowledge. Fine-tune behavior. Retrieve or prompt knowledge. Price the one-time 6ND_SFT against the per-query 2Nk t_d cost. They cross after 3D_SFT divided by k t_d queries, often days of traffic.

**Core 8, §8.1. Prompt:** "An engineer shows you an attention heat map with most of the mass on the retrieved policy chunk and concludes the model read it and overrode it. Do you accept that?"
**Expected reasoning:** Separate a possible information path from causal effect on the output. The cited Jain and Wallace result from 2019 found adversarial attention distributions with equivalent predictions. Use the cheap intervention. Drop the chunk, rerun, and compare the answer.

#### Part III - Prompting and Context Construction

**Core 9, §9.1. Prompt:** "What is the difference between few-shot prompting and retrieval-augmented generation?"
**Expected reasoning:** Concede that both fill context and leave theta untouched. Then name the distinction. Demonstrations are chosen before the query is known. Retrieved documents d[1:k] = R(q) are selected after seeing the query.

**Core 10, §10.1. Prompt:** "Someone swapped Document 1: for [1] in your context template and grounded accuracy moved four points on a 500-question set. Real, or noise?"
**Expected reasoning:** Derive the noise floor. At p ≈ 0.64 over 500 items, standard error is 2.1 points. A four-point move is below two standard errors. Run a paired test on discordant questions before rolling back.

**Core 11, §11.2. Prompt:** "How would you make a RAG system say 'I don't know'?"
**Expected reasoning:** Name multiple mechanisms and the query class each mishandles. Similarity can favor a topical passage without the answer. Log-probability can be dominated by formatting. Self-consistency can repeat a confident error.

#### Part IV - Representing What You Retrieve

**Core 12, §12.1. Prompt:** "Walk me through how text representation evolved, and tell me why BM25 is still running in production systems in 2026."
**Expected reasoning:** Frame four eras as trades. Orthogonal axes preserve exact match but block synonymy. Static vectors add synonymy and average senses. Contextual vectors resolve sense and can pool away rare literals. Universal spaces add modalities and pay per language.

**Core 13, §13.1. Prompt:** "How do you choose a chunk size?"
**Expected reasoning:** Start from the unit that must remain intact, such as a clause, function, or table row. Then give severance probability (s - 1)/L and the overlap guarantee s ≤ o at cost L divided by L - o.

**Core 14, §14.1. Prompt:** "Your RAG over PDF reports handles prose well and gets numbers wrong. Where do you look first?"
**Expected reasoning:** Inspect ingestion before blaming the model. Check whether the header and data rows landed in separate chunks. The query vocabulary lives in the header, so retrieval can rank the labels without the answer.

#### Part V - Indexing and Vector Search

**Core 15, §15.2. Prompt:** "Derive HNSW from a skip list. How many layers for ten million vectors?"
**Expected reasoning:** Replace total order with a proximity graph and stop when no neighbor is closer to q. Use Pr[level ≥ j] = M^-j and L = log base M of n. With M = 16 and n = 10^7, the answer is six layers.

**Core 16, §16.1. Prompt:** "Your flat index is 30.7 GB and you have 1 GB of RAM for it. Same embedding model, same dimension. What do you do?"
**Expected reasoning:** Convert budget to bytes per vector first. One GB over 10^7 vectors gives 100 bytes. With k = 256, choose m ≤ 100. The source uses m = 96 because it divides 768 and yields 960 MB. Name the rescoring stage.

**Core 17, §17.1. Prompt:** "A user deletes a document at 10:00. Walk me through what happens in your vector store."
**Expected reasoning:** Separate visibility from physical erasure. A tombstone and result filter hide the document within one query. Bytes disappear at the next scheduled rebuild. The vector remains because deleting a graph node can damage connectivity.

#### Part VI - Retrieval and Ranking

**Core 18, §18.2. Prompt:** "What does BM25 fix relative to TF-IDF?"
**Expected reasoning:** Name two defects. Linear term frequency values the eleventh occurrence like the first. Cosine normalization cannot separate length from repetition. BM25 adds saturation and pivoted length normalization.

**Core 19, §19.1. Prompt:** "You have query-document pairs graded 0 to 4 by humans, and you train on them with mean squared error. Training loss halves. NDCG@10 does not move. What is wrong?"
**Expected reasoning:** State the invariance. nDCG depends on argsort(s), so a constant score shift changes MSE but not ranking. Much of the loss surface is invisible to the metric. A model can have nDCG = 1.000 and squared error 20.12.

**Core 20, §20.1. Prompt:** "Cross-encoders are more accurate. Why not use one for retrieval?"
**Expected reasoning:** Produce the arithmetic. Cost is 2P(L_q + L_p) FLOPs per pair across N pairs. A 21 million-passage scan takes 36 minutes per query against a 50 ms budget. A bi-encoder moves the query-independent passage tower offline.

**Core 21, §21.1. Prompt:** "Our BM25 index misses documents that never use the query's words. Someone proposes SPLADE. What does it actually change?"
**Expected reasoning:** Keep sparse scoring s(q,d) = Σ_j w_qj w_dj and the inverted index. Replace both weight functions with a masked-language-model head over 30,522 terms, so absent terms can receive weight. Posting-list length pays the cost.

**Core 22, §22.1. Prompt:** "Your pipeline returns the right document at rank 40 and the generator never sees it. What do you change?"
**Expected reasoning:** Diagnose first. Rank 40 means it is present in a depth-100 candidate set but absent from the top 5 context. First-stage recall R1 works. Second-stage ordering R2 fails. Rerank those 100 with the query in hand.

**Core 23, §23.1. Prompt:** "In a generative retriever, where did the index go?"
**Expected reasoning:** Trace it into the identifier scheme and training. With atomic identifiers, the index is the N by d_model output matrix. It takes 27 GB for 8.8 million passages and still performs exhaustive comparison.

#### Part VII - Query Understanding and Control Flow

**Core 24, §24.1. Prompt:** "A user searches for a twin bed and gets nothing useful. Walk me through the diagnosis."
**Expected reasoning:** Partition the failure. Check posting counts for misspellings. Check relevant documents under other words for synonymy. Inspect senses among returned documents for polysemy.

**Core 25, §25.1. Prompt:** "Your RAG system is less accurate than the base model on your most common queries, even though overall accuracy went up. What is happening?"
**Expected reasoning:** Build the 2 by 2 of closed-book-correct and RAG-correct. Identify the slice where closed-book wins and retrieval loses. The global margin is gamma - beta, so a net gain can coexist with a common-query loss.

**Core 26, §26.1. Prompt:** "Your assistant answers 'Alexander Fleming' to 'which scientist discovered the element found in penicillin?', and retrieval recall@5 against your gold annotations is 0.94. What is wrong?"
**Expected reasoning:** Separate the surface question from the answered question. Retrieved passages support the given answer, so this is answer drift rather than hallucination. Groundedness will not catch it. The gold annotation only covers the surface query.

#### Part VIII - Training the RAG System

**Core 27, §27.2. Prompt:** "Why would you deliberately train on examples where the answer is not in the retrieved context?"
**Expected reasoning:** Start from the gradient. If every context contains the answer, copying is a zero-loss policy. The model receives no signal for insufficient context, so its accuracy there is near zero by construction.

**Core 28, §28.1. Prompt:** "Our RAG assistant gives wrong answers. Should we fine-tune the LLM on our documents?"
**Expected reasoning:** Reject the premise and name the two parameter sets. Fine-tuning teaches how to answer, not what is true. Describing an SFT pipeline before localizing the failure is weak.

**Core 29, §29.1. Prompt:** "Why would generating queries from a document ever help retrieval? Isn't the whole point of retrieval to match queries to documents, not the other way around?"
**Expected reasoning:** Name vocabulary mismatch. BM25 contributes exactly zero for an absent term, however relevant the document is. Appending predicted queries changes what is indexed, not what the live system retrieves for.

#### Part IX - Generation and Context Assembly

**Core 30, §30.2. Prompt:** "A stakeholder asks: 'We gave the model strictly more information. How can accuracy possibly go down?' What is the one-sentence answer, and what would you show them to make it concrete?"
**Expected reasoning:** Say that attention during prefill is finite and contested, not a free skim. Plot accuracy against the gold document's position with a flat closed-book baseline. Show the middle trough falling below that line.

**Core 31, §31.2. Prompt:** "Your RAG demo returns 'It was released on September 19, 2025.' with a citation attached. How do you decide whether that's attributable?"
**Expected reasoning:** Resolve the explicature first using the preceding query, such as "the iPhone 17 was released on September 19, 2025." Then test whether the cited source says that complete claim.

#### Part X - Evaluation

**Core 32, §32.2. Prompt:** "Write the formula for nDCG@k from memory."
**Expected reasoning:** Build it in order. Compute cumulative gain. Apply the log2(i + 1) discount, whose +1 leaves rank 1 undiscounted. Divide by ideal discounted cumulative gain so queries with different relevant-set sizes are comparable.

**Core 33, §33.1. Prompt:** "Your team wants to add a truthfulness check to the pull-request pipeline. Someone proposes reusing the FActScore-style factuality benchmark you already run weekly. What do you check before agreeing?"
**Expected reasoning:** Distinguish context and external oracles. The weekly job's latency and query volume were sized for once-a-day use. Check whether every-push call volume fits source rate limits and the CI budget.

**Core 34, §34.1. Prompt:** "Your pipeline's end-to-end accuracy dropped four points this week. What's your first move?"
**Expected reasoning:** Change nothing yet. Label whether gold evidence reached the generator. Recompute h and c1 on the same slice. The term that moved identifies the stage. Swapping the embedding model first is weak.

#### Part XI - Trust, Credibility, and Adversarial Robustness

**Core 35, §35.1. Prompt:** "Your RAG system hits a 2% hallucination rate on your benchmark. Is it trustworthy?"
**Expected reasoning:** Refuse to decide from one number. Name the six trust aspects. A 2% factuality-adjacent statistic covers only one axis. Ask whether the deployment question concerns retrieval privacy, generation fairness, or another stage.

**Core 36, §36.2. Prompt:** "What does it actually mean for a piece of content to have a valid C2PA credential?"
**Expected reasoning:** Require three checks. The asset hash matches the manifest. The manifest signature verifies against the signer key. That key chains to a trusted root. None of these checks makes the content's claims true.

#### Part XII - Scaling, Advanced Variants, and Design Drills

**Core 37, §37.1. Prompt:** "Your RAG endpoint's p50 is 1.3 seconds and product wants it under 500 ms. Where do you look first?"
**Expected reasoning:** Profile all five stages. Expect decode to consume 85% to 90% once context reaches a few thousand tokens. It is memory-bandwidth-bound and paid per output token. Then name concrete decode levers.

**Core 38, §38.1. Prompt:** "Why can't you just put all the company's document embeddings into one vector database?"
**Expected reasoning:** Name cost, size, latency, and compliance. Treat the first three as budget problems and the fourth as legal. "Too slow" misses the one blocker money cannot solve.

**Core 39, §39.2. Prompt:** "Why not just use CLIP for every image in your RAG corpus?"
**Expected reasoning:** CLIP globally pools an image into one vector. Dense tables and charts hide a fact in a small region. Patch-level encoding fixes that local-detail failure.

**Core 40, §40.2. Prompt:** "Why not just use an LLM to extract every triple in your corpus?"
**Expected reasoning:** Name both costs. Pay a token-priced forward pass per chunk. Then catch duplicate entity names and unlicensed relations in a separate deduplication stage. The extraction call does not remove noise for free.

**Core 41, §41.1. Prompt:** "Design retrieval for a 100 million-document corpus serving 500 QPS. What are the first two numbers you ask for?"
**Expected reasoning:** Ask for usable RAM per node and the recall SLA. Corpus size creates a memory-capacity problem. QPS becomes meaningful only after per-shard query cost is known. Naming a database product is weak.

### B.2 Senior Questions

Difficulty marker: Senior. These prompts test whether you can derive from the stated constraints rather than recall a favorite number. Several systems are already broken. Diagnose before proposing a fix.

#### Part I - The RAG Interview Landscape

**Senior 1, §1.1. Prompt:** "Our datastore just grew from 2M to 200M chunks. Can we drop the generator from 70B to 8B and bank the savings?"
**Expected reasoning:** Separate knowledge load from comprehension load. A 100-fold larger store crowds top-k with near-duplicates and contradictions. The generator's reading task gets harder while its capacity shrinks. Measure comprehension before swapping.

**Senior 2, §2.1. Prompt:** "A regulator requires the assistant to run fully offline with no datastore, so you have to write the update into the weights. Design the run so it does not regress."
**Expected reasoning:** Accept the constraint. Rank-constrain the update, re-warm and re-decay learning rate, reserve 5% replay at a 5.3% compute surcharge, and gate release on a frozen canary set.

**Senior 3, §3.1. Prompt:** "Your p95 time to first token is 1.1 seconds against an 800 millisecond SLO. Where do you look?"
**Expected reasoning:** Decompose all five decisions before optimizing. Prefill scales as 2PT while search grows sublinearly in N. Predict that decision five holds most latency, then state what measurement would falsify that prediction.

#### Part II - The Generator Side

**Senior 4, §4.1. Prompt:** "The correct passage is in the context window and the model answers from memory anyway. Which stage owns that?"
**Expected reasoning:** Classify it as behavior rather than missing knowledge, so SFT owns it. Train with items where the gold document is present and used, plus a deliberate fraction where it is removed.

**Senior 5, §5.1. Prompt:** "Legal wants written confirmation that no customer PII reached the pre-training corpus. What do you send back?"
**Expected reasoning:** Refuse a certification that tokenization made impossible. Replace it with a measurement, sample-size arithmetic, and the interval obtained. Describe residual risk as extractability because document identity can no longer be enumerated.

**Senior 6, §6.1. Prompt:** "Kaplan and Chinchilla disagree by more than a factor of ten on the same question. What actually changed between them?"
**Expected reasoning:** Data and architecture did not change. The correction matched the cosine learning-rate schedule to run length, removing a long-run measurement bias, and counted embedding parameters.

**Senior 7, §7.1. Prompt:** "Your RAG assistant scores well on the offline set and drops twelve points in production. How do you tell whether that is a retrieval failure or an ICL failure?"
**Expected reasoning:** On production failures, check whether gold evidence entered the assembled context. If absent, retrieval failed and prompting cannot help. If present, freeze context and vary only demonstrations.

**Senior 8, §8.1. Prompt:** "Your leave-one-out attribution says no chunk in the context mattered, yet the answer is clearly drawn from the context. What happened?"
**Expected reasoning:** Look for redundant chunks. With two chunks carrying the same fact, each single-chunk marginal is zero. Shapley values split credit 0.5 and 0.5 but cost 2^20 replays in the stated case.

#### Part III - Prompting and Context Construction

**Senior 9, §9.1. Prompt:** "Your assistant returns fluent answers in the wrong format about a third of the time, and it also quotes last quarter's prices. Where do you start?"
**Expected reasoning:** Treat these as two defects on two rungs. Format is query-independent. Staleness is query-dependent. Sample failures and ask whether the current price appeared in retrieved context.

**Senior 10, §10.1. Prompt:** "How do you compare two retrievers when the prompt format alone moves accuracy more than the retrievers differ?"
**Expected reasoning:** Name the confound. You observe delta-hat at shared prompt f0 but care about delta-star between each arm's optimized prompt. Present the two defensible protocols and their costs.

**Senior 11, §11.1. Prompt:** "Your abstention rate is 54% and users are leaving. Bring it down without shipping more wrong answers."
**Expected reasoning:** Do not lower tau because that trades the protected error quantity. Reduce wrong-answer cost c_w. A checkable span with a 60% open rate changes effective cost from 20 to 8.12 and the threshold from 0.929 to 0.836.

#### Part IV - Representing What You Retrieve

**Senior 12, §12.1. Prompt:** "Your dense retriever misses queries containing product SKUs. What do you change, and how do you prove it worked?"
**Expected reasoning:** Confirm the SKU is outside tokenizer vocabulary and contributes only 1/n to a mean-pooled vector. That is representation failure, not model quality. Add a sparse leg and measure the affected query slice.

**Senior 13, §13.1. Prompt:** "Semantic chunking lifted recall@5 by three points on our evaluation set. Do we ship it?"
**Expected reasoning:** Audit the evaluation construction. Concatenated unrelated documents create artificial topic boundaries that flatter semantic chunking. Ask whether production has the same boundary shape.

**Senior 14, §14.1. Prompt:** "Design the retrieval unit for a 200-page filing containing 60 tables."
**Expected reasoning:** Use different units. Chunk prose normally. Keep tables atomic, with a row-atomic fallback that repeats headers, and add a surrogate summary so each table is findable by name. The fallback adds roughly 39% tokens.

#### Part V - Indexing and Vector Search

**Senior 15, §15.1. Prompt:** "Why not a kd-tree? It's O(log N) and it's in the standard library."
**Expected reasoning:** State the pruning test abs(q_i - s) > r. At d = 768, r ≈ sqrt(2d) = 39 while one-coordinate gaps are order 1. The test rarely fires, leaving traversal bookkeeping without pruning benefit.

**Senior 16, §16.1. Prompt:** "Why not learn one codebook with 2^32 centroids instead of four with 256? Same code length, and one codebook has to be more accurate."
**Expected reasoning:** Concede that the free codebook is more expressive. Then price 13.2 TB of centroids and 1.7 x 10^11 training vectors against 768 KiB and about ten thousand. Expressiveness loses to feasibility.

**Senior 17, §17.1. Prompt:** "How often do you re-index, and how did you pick that number?"
**Expected reasoning:** Give at least three quantities. Derive T-star from build cost, query rate, and churn. State the phi at which beam inflation consumes p95. State the erasure deadline. The binding constraint wins.

#### Part VI - Retrieval and Ranking

**Senior 18, §18.1. Prompt:** "Thirty percent of your tail queries return zero results. Where do you start?"
**Expected reasoning:** Split two causes with the same symptom. Rerun each failure as pure OR. If documents appear, the operator is wrong and soft matching fixes it. If none appear, vocabulary is missing.

**Senior 19, §19.1. Prompt:** "Your labels are integers 0 through 4. Argue for and against treating them as numbers."
**Expected reasoning:** The integers encode order, while spacing comes from convention and annotator variance. nDCG itself uses gain 2^y - 1, which already rejects uniform spacing.

**Senior 20, §20.1. Prompt:** "Our bi-encoder hits 99% accuracy on its in-batch training objective, but recall@100 on the live corpus is 61%. What is happening?"
**Expected reasoning:** The numbers measure different tasks. Training selects from 255 mostly unrelated passages. Live retrieval selects from 21 million with thousands of near-misses.

**Senior 21, §21.1. Prompt:** "We shipped SPLADE. Recall@1000 went up four points and p99 latency went from 15 ms to 900 ms. Diagnose it before you propose anything."
**Expected reasoning:** Recall and latency moved for the same reason. Each nonzero query dimension adds a posting list. Expanding from 8 to 100 terms multiplies traversals by 12.5.

**Senior 22, §22.1. Prompt:** "We shipped a cross-encoder reranker last month. End-to-end answer accuracy did not move. Was it a waste?"
**Expected reasoning:** End-to-end accuracy R1R2 cannot answer. Measure recall at candidate depth k and final depth m. If they are within one point, the first stage was already saturated and reranking had no ceiling to improve.

**Senior 23, §23.1. Prompt:** "Our generative retriever returns document IDs that don't exist in the corpus. What's wrong and how do you fix it?"
**Expected reasoning:** The decoder spans k^L strings while only N identifiers are real. With L = 7 and k = 10, about 1.2 million well-formed identifiers point nowhere. Constrain decoding with a trie.

#### Part VII - Query Understanding and Control Flow

**Senior 24, §24.1. Prompt:** "You shipped WordNet synonym expansion. Recall@100 rose 8 points and nDCG@10 fell. What happened, and what do you ship next?"
**Expected reasoning:** Expansion makes the retrieved set a superset, so recall rises by construction. The eight points do not prove useful retrieval. The nDCG loss exposes the precision ceiling of expansion arms.

**Senior 25, §25.1. Prompt:** "You have budget for exactly one gating signal. Do you take the model's token-level confidence or a query-side popularity score?"
**Expected reasoning:** Take popularity. Next-token probability measures fluency and cannot separate a confident falsehood from truth. Query popularity is visible before generation begins.

**Senior 26, §26.1. Prompt:** "Multi-hop accuracy is 40 points below single-hop. Do you upgrade the embedding model, raise k from 5 to 50, or add a second retrieval round?"
**Expected reasoning:** Reject the first two on mechanism. Both rerank documents against a query missing the bridge term. Reranking cannot manufacture that term. Decomposition changes the query. Then price the extra round.

#### Part VIII - Training the RAG System

**Senior 27, §27.1. Prompt:** "A policy changed last night and must be reflected by 9 a.m. An engineer proposes a nightly LoRA run over the changed documents. Adjudicate."
**Expected reasoning:** Price both paths. Training costs 6ND, about 1.5 GPU-hours for 7B and 5 x 10^7 tokens. Re-embedding the document costs 2.8 ms. A checkpoint needs an evaluation gate while an upsert does not.

**Senior 28, §28.1. Prompt:** "You are on a hosted generator with no gradient access. What can you train, and what is the loss?"
**Expected reasoning:** Theta is behind an API, and even with weights the arg max between stages blocks a gradient to phi. Use generator likelihood of the gold answer as the candidate-scoring signal.

**Senior 29, §29.1. Prompt:** "A colleague wants to run the exact same query-generation model at query time instead. Rewrite the incoming query with an LLM rather than pre-expanding the document. Same model, same prompt style, just applied to the other argument. For a corpus of 10 million documents serving 2 million queries a day, which do you pick, and why?"
**Expected reasoning:** Derive break-even. Cumulative queries exceed corpus size within days, after which per-query model cost dominates one-time ingestion. Concede that query-time rewriting adapts to the live query.

#### Part IX - Generation and Context Assembly

**Senior 30, §30.1. Prompt:** "Liu et al. ran both a multi-document QA task and a synthetic key-value retrieval task. Why bother with the second one if the first already shows the U?"
**Expected reasoning:** Explain the control. Multi-document QA leaves open that middle chunks are harder to reason about. Synthetic lookup removes reasoning. The same U then isolates position from difficulty.

**Senior 31, §31.1. Prompt:** "Your Bing-style assistant returns an answer with three citation marks. What exactly does each mark guarantee, and what does it not guarantee?"
**Expected reasoning:** A mark says the adjacent span was generated while that chunk was in context, giving traceable origin. It does not guarantee support or truth. Those require separate checks.

#### Part X - Evaluation

**Senior 32, §32.1. Prompt:** "Two retrievers post identical precision@10 and recall@10 on your eval set. Which one do you ship?"
**Expected reasoning:** Refuse to choose from set metrics. Ask for relevant-document rank positions, MRR, or nDCG at production top-k. Identical precision and recall can hide recall@5 of 1.0 for one system and much less for the other.

**Senior 33, §33.1. Prompt:** "Lay out what runs on every pull request, what runs nightly, and why, for a RAG product's truthfulness evaluation."
**Expected reasoning:** Match schedule to oracle availability. Run context-only faithfulness on every push. Run factuality with recall correction on a schedule sized to the external source. Audit with humans periodically.

**Senior 34, §34.1. Prompt:** "Two RAG systems both score 66% end-to-end accuracy on the same benchmark. Are they equally good?"
**Expected reasoning:** Say no and derive A = h c1 + (1 - h)c0. The cases h = 0.85, c1 = 0.75 and h = 0.65, c1 = 0.97 both land near 0.66 but demand opposite investments.

#### Part XI - Trust, Credibility, and Adversarial Robustness

**Senior 35, §35.1. Prompt:** "You have two candidate models: A is strong on five of six trust axes but weak on privacy. B is moderate but even across all six, landing at nearly the same aggregate radar area as A. Which do you ship?"
**Expected reasoning:** Refuse the aggregate tie. If deployment exposes sensitive retrieved content, disqualify A regardless of other strengths. Radar area cannot compensate for a binding privacy constraint.

**Senior 36, §36.1. Prompt:** "Your attribution classifier reports 95% precision on a benchmark, but production complaints about fabricated sources keep rising. What's going wrong?"
**Expected reasoning:** The benchmark contains genuine documents by construction, so it never measured fabricated-source failures. Add an authenticity gate rather than retraining the attribution classifier.

#### Part XII - Scaling, Advanced Variants, and Design Drills

**Senior 37, §37.1. Prompt:** "You cut the reranker's candidate pool from 50 to 10 hoping to hit a latency target, and p50 barely moved. Why, and where should you actually look?"
**Expected reasoning:** Compute first. At 50 candidates, reranking used 8.3 ms of a 1,320 ms budget. Cutting 80% saves only milliseconds because decode is 91% of total. Also price the miss risk.

**Senior 38, §38.1. Prompt:** "Your team hash-sharded a single vector index across twelve shards to fix a capacity problem. Compliance flags that two shards mix EU personal data with US data. What went wrong?"
**Expected reasoning:** Hash sharding partitions by load key and is compliance-blind. Residency needs jurisdictional partitioning, which is a different axis from minimizing hot-shard skew.

**Senior 39, §39.1. Prompt:** "You migrate from a caption-based index to a CLIP-style shared embedding space. What changes about your reranking and thresholding, and why?"
**Expected reasoning:** Similarity now operates directly on joint embeddings and removes captioning at ingestion. Score distributions still differ by modality, so one global threshold misfires and reranking must inspect raw multimodal candidates.

**Senior 40, §40.1. Prompt:** "Your team already runs GraphRAG over the product taxonomy. Leadership wants the same pipeline reused on a corpus of raw customer-call transcripts. What do you tell them?"
**Expected reasoning:** Test portability. A taxonomy is stable and naturally hierarchical. Call transcripts contain relations inferred per call that rarely recur. Extraction prompts and traversal depth do not transfer.

**Senior 41, §41.1. Prompt:** "Your team's uncompressed HNSW cluster for this corpus needs ten memory-heavy nodes, and finance is asking why."
**Expected reasoning:** Walk through 3,200 bytes per document uncompressed versus 100 under IVF-PQ. The 32-fold reduction turns five capacity-bound shards into one. Then name a recall-loss mitigation.

### B.3 Staff Questions

Difficulty marker: Staff. These prompts test judgment after a constraint changes or two teams present partly valid positions. Price options, concede the other side's real point, decide, and name the reversal condition.

#### Part I - The RAG Interview Landscape

**Staff 1, §1.1. Prompt:** "Legal needs a licensed corpus out of the product in 30 days. Research says removing it costs four points on our benchmark and refuses. Adjudicate."
**Expected reasoning:** Reject the framing that the corpus must disappear. Choose where it lives. Retrain theta only on low-risk data and serve the encumbered corpus from D, where withdrawal is an index deletion rather than a training run.

**Staff 2, §2.1. Prompt:** "Compliance says the reversed legal standard must be removed from the model, not merely superseded. One engineer wants to continually train on the corrected corpus. Another wants to leave the weights alone and fix it in the index. Adjudicate."
**Expected reasoning:** Separate three requirements. The system must answer with the current rule, must not state the old one, and must make the old rule unrecoverable from weights. Retrieval solves the first two. Only the third requires unlearning.

**Staff 3, §3.1. Prompt:** "Retrieval wants to fan out across all three stores for recall. Generation wants k = 20 for coverage. The SLO is 800 milliseconds. Both have data. Decide."
**Expected reasoning:** Treat fan-out and k as different decisions. Fan-out costs a few milliseconds. k = 20 adds 769 ms of prefill and consumes the overrun. Grant fan-out, deny that k, and decouple candidate depth k0 from context depth k.

#### Part II - The Generator Side

**Staff 4, §4.1. Prompt:** "Legal now requires any document to be removable from the system within 24 hours of a takedown notice. A colleague proposes an unlearning pass over the weights. What do you tell them?"
**Expected reasoning:** The objective changed from quality to deletability. Unlearning requires enumerating target sequences and running gradients per notice, with no guarantee and possible collateral damage. A delete against D avoids both problems.

**Staff 5, §5.1. Prompt:** "The licence on a corpus we already fine-tuned on is revoked in thirty days. Counsel wants the checkpoint destroyed. Your ML lead says the data was 0.3% of the mix and the effect is negligible. Adjudicate."
**Expected reasoning:** Neither claim is measured. The 0.3% is a mixing weight, not an extraction rate. Duplication connects them, so a small repeated source can be more extractable than a large diverse source.

**Staff 6, §6.1. Prompt:** "Our research lead wants the Chinchilla-optimal 77B because it is the compute-optimal point. Infrastructure wants the 8B. We will serve 10^10 tokens a day and we already run a retrieval index. Adjudicate."
**Expected reasoning:** Concede that 77B is better at equal training compute. Then change the objective. At 10^10 served tokens per day, annual generation is 3.7 x 10^12 tokens and lifetime serving cost dominates.

**Staff 7, §7.1. Prompt:** "Legal has ruled that no customer record may appear in a prompt at inference time. The ML team proposes fine-tuning on those records instead. Adjudicate."
**Expected reasoning:** Concede that prompts cross a trust boundary into logs and vendor retention. Then explain why weights are a worse hiding place. A fine-tuned model has no delete operation.

**Staff 8, §8.1. Prompt:** "Compliance wants a defensible per-answer attribution on every response. The research lead wants two headcount for circuit-level analysis of your 32-layer generator. You can fund one."
**Expected reasoning:** Reject both proposals with arithmetic. Per-response causal attribution multiplies serving cost by n + 1. Exhaustive circuit analysis faces 33^32 paths.

#### Part III - Prompting and Context Construction

**Staff 9, §9.1. Prompt:** "Compliance now requires that every claim in an answer be traceable to a source document and that the model's own knowledge is never used. A senior engineer proposes adding 'answer only from the provided context' to the system prompt and shipping. Adjudicate."
**Expected reasoning:** Grant that the instruction belongs in the prompt and helps. It is not an enforcement control. A prompt shifts a distribution. The requirement needs a verifier.

**Staff 10, §10.1. Prompt:** "Your team spent two weeks tuning the context template for a 7-point gain. Platform now wants to move the product to a hosted frontier model, and a principal engineer argues the tuned template is the team's asset and must be carried over verbatim. Adjudicate."
**Expected reasoning:** Concede that two weeks created a real asset, then separate asset from artifact. The grammar, search harness, and held-out split transfer. The exact string is a fitted parameter of the model being retired.

**Staff 11, §11.1. Prompt:** "The clinical safety lead demands 99% correctness before the system answers anything. The head of product says a policy that refuses nine questions in ten is not a product. Adjudicate."
**Expected reasoning:** Do not split the difference. At roughly 80% macro-F1 for attribution judgment, enforceable precision tops out near 94.5% on an 81%-accurate stack. The safety bar is unavailable at any threshold.

#### Part IV - Representing What You Retrieve

**Staff 12, §12.1. Prompt:** "Platform wants to consolidate five per-language indexes onto one multilingual model and claims a five-fold cost saving. Search says accuracy will drop. Adjudicate."
**Expected reasoning:** Correct the cost premise. Documents remain, so the union has the same vector count and saves roughly zero storage. It can still remove five model deployments, five evaluation suites, and five on-call rotations.

**Staff 13, §13.1. Prompt:** "Legal requires every retrieved chunk to carry a clause citation. Platform requires uniform 512-token chunks so ANN latency stays predictable. Adjudicate."
**Expected reasoning:** Correct the latency premise. Every chunk becomes one d-dimensional vector, so ANN cost depends on N, d, and graph parameters rather than source token length. Variable length changes prefill.

**Staff 14, §14.1. Prompt:** "The data team wants the tables extracted into a warehouse and queried with text-to-SQL. The search team wants everything in one vector index. Adjudicate."
**Expected reasoning:** Partition by query type. Lookups naming a row and column fit a header-repeated row at about 420 prefill tokens. Aggregations are column properties and belong in SQL.

#### Part V - Indexing and Vector Search

**Staff 15, §15.1. Prompt:** "A colleague cites Beyer et al. and argues that nearest neighbor is meaningless at 768 dimensions, so semantic search over our corpus is theoretically doomed. Our offline eval says recall@10 is 0.82. Adjudicate."
**Expected reasoning:** Judge the theorem's hypothesis, not its conclusion. It assumes unclustered coordinates. A contrastively trained encoder violates that assumption. Recall 0.82 is evidence about the real data distribution, not a contradiction.

**Staff 16, §16.1. Prompt:** "A colleague wants binary quantization instead. Also 96 bytes at d = 768, also 2^768 possible codes, no codebook, no training, and Hamming distance by popcount. Adjudicate."
**Expected reasoning:** The code spaces are equally large. Their cells differ. Binary quantization fixes orthants before seeing data. PQ fits 96 k-means problems to observed density.

**Staff 17, §17.1. Prompt:** "Legal now requires erasure within 24 hours, and your rebuild takes an hour on a corpus growing to 500 million. Platform wants to keep the nightly job. Adjudicate."
**Expected reasoning:** At 50 times the corpus, rebuild takes 50 hours. Nightly is impossible and any full rebuild misses the 24-hour deadline. Reframe erasure as a per-record obligation.

#### Part VI - Retrieval and Ranking

**Staff 18, §18.1. Prompt:** "Legal requires that answers cite only documents the user is cleared to see. The search team wants every filter moved into the scoring function, because hard filters over-restrict and are costing them recall. Adjudicate."
**Expected reasoning:** Concede that sparse metadata filters can silently delete documents and create a real recall bug. Then separate the non-negotiable security clause from preference filters.

**Staff 19, §19.1. Prompt:** "A colleague points out that your new labels are not human grades at all. They are dwell time in seconds, a genuine continuous quantity. They want to switch the loss back to regression. Do you agree?"
**Expected reasoning:** Concede that the scale objection dissolves when the premise changes. Only one of three objections concerned scale. The mismatch between regression and the ranking metric remains.

**Staff 20, §20.1. Prompt:** "The retrieval team wants to ship a new embedding model monthly. The platform team says the corpus is 500M chunks and refuses. Adjudicate."
**Expected reasoning:** Both positions follow from one efficiency trade. Precomputation makes a bi-encoder cheap, and those vectors are bound to encoder weights. Changing phi invalidates every vector. Price the full re-embedding.

**Staff 21, §21.1. Prompt:** "The platform team will fund exactly one index for a 500M-chunk corpus. The query log is half natural language and half part numbers and error codes. The ML team wants dense. The search team wants BM25. Adjudicate."
**Expected reasoning:** Scale the arithmetic and state the reversal condition. Dense d = 768 fp32 storage is 1.54 TB and loses the exact-match half of traffic because part-number embeddings are poorly trained. A hybrid is implied by the workload.

**Staff 22, §22.1. Prompt:** "Context windows are a million tokens now. The platform team wants to delete the reranker and pass the top 200 chunks straight through. The search team refuses. Adjudicate."
**Expected reasoning:** The platform team is right that it fits. Two hundred chunks at 256 tokens are 51,200 tokens. It is wrong about cost because prefill is quadratic and reranking is a rounding error by comparison.

**Staff 23, §23.1. Prompt:** "Infra says moving to generative retrieval deletes the vector-store line item. Retrieval says it just relocates the index onto the GPU and the bill goes up. Who is right, and what happens when the corpus grows 10 times?"
**Expected reasoning:** Both are right on different terms. A 29.3 GB replicated host index can become 440 MB of resident weights. The cost moves into training and retraining, so corpus growth still has a bill.

#### Part VII - Query Understanding and Control Flow

**Staff 24, §24.1. Prompt:** "Your search lead wants to retire BM25 for a dense bi-encoder to end vocabulary mismatch. On-call objects that head queries will regress. Thirty percent of traffic is exact part numbers. Adjudicate."
**Expected reasoning:** Dense retrieval handles synonymy but not polysemy, which needs missing query context. It also turns a loud zero-postings failure into a silent wrong neighbor. Preserve the exact-match path for the 30% slice.

**Staff 25, §25.1. Prompt:** "Infrastructure wants the gate to cut retrieval calls by half. Quality will not accept any accuracy regression. Adjudicate."
**Expected reasoning:** Both demands use one threshold and pull opposite ways. Raising skip rate from 30% to 50% enters the region where each additional skip trades a retrieval-only-correct answer for a wrong one. Reject the false promise.

**Staff 26, §26.1. Prompt:** "Retrieval owns recall@5 of 0.94 and says the generator is broken. Generation says the context is wrong. Your p95 budget is 800 ms and you cannot add a round to every query. Adjudicate."
**Expected reasoning:** Disqualify both teams' evidence. Recall@5 measures topical surface relevance and says nothing about multi-hop chains or staleness. Annotate evidence chains and timestamps before assigning blame.

#### Part VIII - Training the RAG System

**Staff 27, §27.1. Prompt:** "Retrieval and generator teams each want the same quarter of GPU budget. You have A_orc = 0.82, A_ng = 0.31, R = 0.75. Decide, and say what would reverse the decision."
**Expected reasoning:** Compute marginal rates. Retrieval work pays A_orc - A_ng = 0.51 per unit of recall. Generator work pays R = 0.75 on oracle context and 1 - R = 0.25 on distractors-only context. Choose from those returns and name what change reverses them.

**Staff 28, §28.1. Prompt:** "Research wants joint end-to-end training. Platform points out the corpus turns over 5% per week. Adjudicate."
**Expected reasoning:** With phi frozen, weekly turnover encodes 5 x 10^5 new chunks in about 83 seconds. Once phi trains, every stored vector becomes stale and the whole corpus must be re-encoded.

**Staff 29, §29.1. Prompt:** "Retrieval metrics improved after you shipped document-side query expansion, but a stakeholder insists users still can't find internal documents they know exist, and blames 'the model doesn't know it.' Two engineers disagree. One wants to regenerate predicted queries with a larger model. The other wants to leave retrieval alone and change the generation prompt. How do you adjudicate?"
**Expected reasoning:** Localize first. Pull the document by identifier and check whether it appears anywhere in top-k. If absent, the defect is indexing and neither a bigger query generator nor a generation prompt can reach it.

#### Part IX - Generation and Context Assembly

**Staff 30, §30.1. Prompt:** "Your team wants to raise top-k retrieval from 5 to 20 because recall@20 is far higher than recall@5. A colleague objects that this will hurt end-to-end accuracy. Who is right, and what would settle it?"
**Expected reasoning:** Both can be right. Recall@20 adds relevant documents, but many new positions lie in the middle trough. More retrieval can dilute evidence use. Measure end-to-end accuracy by evidence position.

**Staff 31, §31.1. Prompt:** "Your generation team wants to strip citation markers from answers because a user study found citations don't move satisfaction scores. Product wants to keep them for a compliance audit next quarter. How do you adjudicate?"
**Expected reasoning:** Separate value propositions. Satisfaction measures perceived answer quality. Attribution lets an auditor or incident reviewer verify a claim. The study tested the first, while compliance needs the second.

#### Part X - Evaluation

**Staff 32, §32.1. Prompt:** "Your reranking team says retrieval-stage metrics don't matter, because the reranker fixes the ordering anyway. Your generation team says garbage in, garbage out. Adjudicate."
**Expected reasoning:** Both are partly right. A reranker only changes order inside candidate depth k0. Evidence below k0 is unreachable regardless of reranker quality.

**Staff 33, §33.1. Prompt:** "Right after a vector-store migration, your nightly factuality pipeline starts flagging a much higher share of your RAG system's answers as false. The eval team says the RAG system regressed. Infra says the eval's external verifier broke during the migration. You have two minutes before the standup. Adjudicate."
**Expected reasoning:** Pull context-only faithfulness for the same time window because it does not depend on the external verifier. If faithfulness stayed flat while factuality fell, retrieved evidence changed rather than generation.

**Staff 34, §34.1. Prompt:** "Your retrieval team says recall@k is 92%, clean. Your generation team says faithfulness, measured against gold context in isolation, is 95%, also clean. End-to-end correctness is 58%. Both teams blame each other. Adjudicate."
**Expected reasoning:** Faithfulness against gold context is easier than faithfulness against deployed assembled context. Neither team measured the shipping pipeline. Rerun against actual context.

#### Part XI - Trust, Credibility, and Adversarial Robustness

**Staff 35, §35.1. Prompt:** "Compliance now bans any personal data from entering the retrieval context. Two teams disagree on how to update the trust dashboard. One wants to zero out the privacy axis for every model going forward. The other wants to remove the axis from the chart entirely since it no longer applies. Which do you pick, and why?"
**Expected reasoning:** Ask what the chart is for. Zeroing lowers aggregate scores for a risk excluded from this deployment. Dropping the axis erases the fact that privacy was evaluated. Preserve the evaluation record without treating it as current exposure.

**Staff 36, §36.1. Prompt:** "Legal wants every retrieved document to carry a verified content credential before it can be cited. Product says most of the corpus predates credentialing, and a hard gate would gut recall. How do you resolve this?"
**Expected reasoning:** Reject hard pass or fail. Grade p(d). Use p = 1 for cryptographically verified post-adoption documents, a corroboration estimate for legacy content, and p = 0 only when no signal exists.

#### Part XII - Scaling, Advanced Variants, and Design Drills

**Staff 37, §37.1. Prompt:** "Product wants a 500 ms p50. Engineering wants to swap the 8B generator for a 30B model to fix a quality regression, keeping the same 2,048-token context and 150-token answers. Adjudicate."
**Expected reasoning:** The 8B configuration already runs near 1,320 ms, which is 2.6 times over budget, and decode is 91%. A 30B model moves about 3.75 times the bytes per decode step and worsens the binding constraint.

**Staff 38, §38.1. Prompt:** "A director wants to merge four departmental RAG systems into one to cut infrastructure cost by a projected 40%. Legal says two of the four departments hold data that cannot legally be merged. Adjudicate, and tell the director what you'd actually ship."
**Expected reasoning:** Treat compliance as non-negotiable, so a full merge is excluded before cost modeling. Ask how much of the projected 40% survives under federation and ship the compliant federated design.

**Staff 39, §39.1. Prompt:** "Your team is split. One engineer wants to migrate the entire corpus to a ColPali-style document-as-image index because it eliminates OCR error. Another says an 86-fold storage increase is not worth it for a corpus that is 95% plain prose. Infrastructure budget is fixed. Adjudicate."
**Expected reasoning:** Refuse a single philosophy. Segment by content, calculate the multiplier only for the layout-heavy slice, and size a hybrid index against the real budget.

**Staff 40, §40.1. Prompt:** "Infra wants to freeze the graph index because a full re-extraction costs $2,850 and six hours. Product wants same-day updates for a compliance SLA. Adjudicate."
**Expected reasoning:** Reject both extremes. Full extraction cost is being repaid on every update. Use incremental dual-level indexing so only touched entities are refreshed.

**Staff 41, §41.1. Prompt:** "Product wants QPS to jump from 500 to 5,000 for a new real-time surface. The corpus stays at 100 million documents. One engineer wants to add shards. Another wants to add cores to the existing shards. Adjudicate."
**Expected reasoning:** Separate memory from load. Corpus size is unchanged, so capacity-driven shard count does not move. Scatter-gather sends full QPS to each shard, so add replicas rather than shards.

## Diagrams

Appendix B contains zero source figures and zero source tables. No source visual is invented here.

## Whiteboard pack

### What to draw

1. Draw one large box labeled "123-question simulator."
2. Split it into three lanes labeled Core, Senior, and Staff.
3. Put "41 questions" under each lane.
4. Under Core, draw "name mechanism" leading to "name failure."
5. Under Senior, draw "diagnose" leading to "derive from constraints" and then "state number."
6. Under Staff, draw two partly correct teams converging on "price options," "concede," "decide," and "reversal condition."
7. Draw a ninety-second timer before all three lanes.
8. Draw a closed answer key after the timer, then an arrow from the key to the source-section pointer.

### Spoken script

Treat this appendix as a three-level interview simulator. Core questions test whether I can name the mechanism and its failure mode. Senior questions make me derive from the stated constraints, so I diagnose first and put a number in the answer. Staff questions introduce a changed constraint or two partly correct teams. I price both options, concede each valid concern, choose, and state what would reverse me. There are 41 questions per tier, 123 total. I set a ninety-second timer, answer aloud before opening the key, then use the section pointer when the compact reasoning spine is not enough.

## Interview traps

### 1. Why separate the prompts from their answer spines?

Seeing an answer tests recognition, not cold production. The appendix requires an aloud attempt before the key so the drill matches a ninety-second interview response.

### 2. Are Core, Senior, and Staff labels just easy, medium, and hard?

No. Core tests mechanism, Senior tests derivation from given constraints, and Staff tests judgment when constraints change or credible teams disagree.

### 3. What makes a Staff answer stronger than choosing the team you agree with?

A strong answer prices both options, concedes the other side's valid point, and states a recommendation. It also names the condition that would reverse that recommendation.

### 4. Why should a Senior answer derive a number instead of quote one from memory?

The prompt's constraints define the current system. A remembered benchmark number can describe a different corpus, load, or budget and therefore avoid the actual derivation.

### 5. What should you do when the compact answer key feels obvious or incomplete?

First ask whether you could have produced that spine cold and aloud. Then follow the attached section pointer, which leads to the full argument and expected follow-up.

## Key numbers

| Source item | Number, threshold, or formula | Meaning or claim limit |
|---|---|---|
| Appendix structure | 3 tiers, 41 questions each, 123 total | Every chapter contributes one Core, one Senior, and one Staff prompt |
| Drill timing | 90 seconds | Target time for a cold spoken answer |
| Core 1 | 8B | Model that still invents product identifiers |
| Core 2 | 27B, 108 GB, about 20,000 edited numbers | Model size, fp32 forward-pass memory, and editing scale |
| Core 3 | 2 stages, 3 failure classes, 3 repeated chunks | Retrieval and generation need more precise diagnosis than hallucination |
| Core 4 | 27B, about 1,324 GPU-hours, about 15 million queries | Retraining cost versus retrieval-serving equivalent |
| Core 5 | 20 TB to 750 GB | Example pretraining snapshot reduction |
| Core 6 | C ≈ 6ND, C = 10^23, N = sqrt(C/120), about 10 times smaller | Training scaling and inference-heavy adjustment |
| Core 7 | 6ND_SFT, 2Nk t_d, break-even 3D_SFT divided by k t_d | One-time fine-tuning versus recurring prompt cost |
| Core 8 | 2019 | Year attached to the cited adversarial-attention result |
| Core 9 | d[1:k] = R(q) | Retrieved documents are selected after the query is known |
| Core 10 | 4 points, 500 questions, p ≈ 0.64, 2.1-point standard error | Four points stays below two standard errors |
| Core 11 | 2 or 3 mechanisms, not 1 | An abstention answer must compare failure modes rather than name one gate |
| Core 12 | 4 representation eras | Exact, static, contextual, and universal trade-offs |
| Core 13 | Severance (s - 1)/L, guarantee s ≤ o, cost L divided by L - o | Chunk length and overlap arithmetic |
| Core 14 | 1 retrieved chunk | Inspect ingestion evidence before blaming the model |
| Core 15 | 10 million, M = 16, n = 10^7, 6 layers | HNSW height example |
| Core 16 | 30.7 GB, 1 GB, 10^7 vectors, 100 bytes, k = 256, m = 96, d = 768, 960 MB | Product-quantization sizing chain |
| Core 17 | 10:00 and 1 query | Deletion time and visibility deadline before physical rebuild |
| Core 18 | 11th occurrence versus 1st | Linear term frequency overvalues repetition |
| Core 19 | Labels 0 to 4, loss halves, nDCG@10 unchanged, nDCG 1.000, squared error 20.12 | Regression loss can move without rank order |
| Core 20 | 21 million passages, 36 minutes, 50 ms | Cross-encoder corpus scan versus serving budget |
| Core 21 | 30,522 vocabulary entries | SPLADE expansion space |
| Core 22 | Rank 40, depth 100, top 5 | Candidate recall succeeds while context ordering fails |
| Core 23 | 27 GB and 8.8 million passages | Atomic-identifier output-matrix footprint |
| Core 24 | 3 diagnostic checks | Posting counts, alternate surface forms, and returned senses separate the causes |
| Core 25 | 2 by 2 and margin gamma - beta | Slice losses can coexist with an aggregate gain |
| Core 26 | Recall@5 = 0.94 | Topical annotations do not detect answer drift |
| Core 27 | Near 0 | Accuracy on missing-answer context is near zero when training never supplies that case |
| Core 28 | 2 parameter sets | Retriever and generator parameters require different interventions |
| Core 29 | Exactly 0 | A lexical scorer gives an absent term no contribution |
| Core 30 | 1-sentence answer and crossover plot | Compare accuracy by evidence position with the flat closed-book line |
| Core 31 | September 19, 2025 | Date whose attributable claim must first be resolved |
| Core 32 | log2(i + 1), rank 1 | Discount formula leaves the first rank undiscounted |
| Core 33 | 2 oracle types, once a day versus every push | Truth checks must fit oracle availability and call limits |
| Core 34 | 4 points | End-to-end decline that must be localized before fixing |
| Core 35 | 2% and 6 trust axes | One hallucination statistic cannot establish trustworthiness |
| Core 36 | 3 checks | Hash, signature, and trust-chain requirements for the credential |
| Core 37 | p50 1.3 s, target 500 ms, 5 stages, decode 85% to 90% | Profile before optimizing the dominant stage |
| Core 38 | 4 blockers, first 3 budget, fourth legal | Cost, size, and latency differ from compliance |
| Core 39 | 1 global image vector | Pooling limit that motivates patch encoding |
| Core 40 | 2 costs | Graph extraction pays a forward pass per chunk and adds noisy duplication |
| Core 41 | 100 million documents, 500 QPS, first 2 questions | Ask RAM per node and recall SLA before naming infrastructure |
| Senior 1 | 2M to 200M chunks, 70B to 8B, 100-fold growth | More stored knowledge can increase generator comprehension load |
| Senior 2 | 5% replay and 5.3% surcharge | Regression-control budget for offline weight updates |
| Senior 3 | p95 1.1 s versus 800 ms | Time-to-first-token SLO gap |
| Senior 5 | Required customer PII count = 0 | Tokenization erased document identity, so the source requires measurement rather than certification |
| Senior 6 | More than 10-fold disagreement | Kaplan and Chinchilla optimize different parameter-token balances |
| Senior 7 | 12 points | Production decline to localize between retrieval and ICL |
| Senior 8 | 2 redundant chunks, 0.5 and 0.5 credit, 2^20 replays | Shapley repair and its cost |
| Senior 9 | About one third | Wrong-format rate separate from staleness |
| Senior 10 | 2 defensible protocols | Prompt-template confounding must be controlled before comparing retrievers |
| Senior 11 | 54%, 60%, 20 to 8.12, 0.929 to 0.836 | Abstention rate, citation-open rate, effective cost, and threshold change |
| Senior 12 | 1/n | Rare SKU contribution under mean pooling |
| Senior 13 | Recall@5 up 3 points | Result that needs an evaluation-set boundary audit |
| Senior 14 | 200 pages, 60 tables, about 39% more tokens | Filing scale and row-fallback cost |
| Senior 15 | d = 768, r ≈ 39, coordinate gap about 1 | Why kd-tree pruning fails |
| Senior 16 | 2^32, 4 codebooks of 256, 13.2 TB, 1.7 x 10^11, 768 KiB, about 10,000 | Expressive free codebook versus feasible product quantization |
| Senior 17 | At least 3 quantities | Build cost, beam-inflation point, and erasure deadline choose cadence |
| Senior 18 | 30% | Tail-query zero-result population to split by operator and vocabulary |
| Senior 19 | Grades 0 to 4 and gain 2^y - 1 | Ordered labels do not imply uniform numeric spacing |
| Senior 20 | 99%, recall@100 61%, 255, 21 million | Easy in-batch discrimination does not match live retrieval |
| Senior 21 | Recall@1000 up 4, p99 15 ms to 900 ms, 8 to 100 terms, 12.5 times | SPLADE recall and latency share one cause |
| Senior 22 | Within 1 point | A saturated candidate ceiling leaves little for reranking |
| Senior 23 | L = 7, k = 10, about 1.2 million invalid IDs | Unconstrained identifier space |
| Senior 24 | Recall@100 up 8 and nDCG@10 down | Expansion raises coverage while harming precision |
| Senior 25 | Exactly 1 signal and 2 grounds | Query popularity wins on mechanism and operational timing |
| Senior 26 | 40-point gap, k from 5 to 50 | Larger k cannot create a missing bridge term |
| Senior 27 | 9 a.m., 1.5 GPU-hours, 7B, 5 x 10^7 tokens, 2.8 ms | LoRA run versus document upsert |
| Senior 28 | 0 gradient access | A hosted generator blocks direct end-to-end retriever gradients |
| Senior 29 | 10 million documents and 2 million queries/day | Query-side costs overtake one-time ingestion within days |
| Senior 30 | 2 evaluation tasks | Synthetic lookup isolates position from reasoning difficulty |
| Senior 31 | 3 citation marks | Each marks origin but not support or truth |
| Senior 32 | precision@10, recall@10, recall@5 = 1.0 | Set metrics can hide top-rank differences |
| Senior 33 | 3 cadences | Faithfulness runs every push, factuality runs on a schedule, and humans audit periodically |
| Senior 34 | 66%, h = 0.85 with c1 = 0.75, h = 0.65 with c1 = 0.97 | Equal end-to-end totals imply different investments |
| Senior 35 | 5 of 6 versus all 6 axes | A privacy failure cannot be averaged away |
| Senior 36 | 95% precision | Genuine-only benchmark does not test fabricated sources |
| Senior 37 | 50 to 10 candidates, 8.3 ms of 1,320 ms, 80% cut, 91% decode | Reranker reduction cannot fix decode-bound p50 |
| Senior 38 | 12 shards and 2 mixed-jurisdiction shards | Hash balance does not enforce residency |
| Senior 39 | 1 global threshold | One cutoff can misfire when modality score distributions differ |
| Senior 41 | 10 nodes, 3,200 to 100 bytes, 32-fold, 5 shards to 1 | IVF-PQ capacity reduction and recall trade-off |
| Staff 1 | 30 days and 4 benchmark points | Licensed corpus should move stores rather than remain in weights |
| Staff 2 | 3 requirements | Current answer, suppression of old answer, and weight unlearning differ |
| Staff 3 | 3 stores, k = 20, 800 ms, 769 ms | Fan-out is cheap while prefill depth consumes the budget |
| Staff 4 | 24 hours | Takedown deadline makes deletability binding |
| Staff 5 | 30 days and 0.3% mixing weight | Small mixture share does not bound extractability |
| Staff 6 | 77B versus 8B, 10^10 tokens/day, 3.7 x 10^12/year | Serving volume changes the compute-optimal decision |
| Staff 7 | 0 customer records in prompts and no weight-delete operation | Moving records into weights does not satisfy the trust boundary |
| Staff 8 | 2 headcount, 32 layers, n + 1 serving multiplier, 33^32 paths | Both proposed attribution methods fail cost arithmetic |
| Staff 9 | Every claim traced and no model-only knowledge | A prompt instruction helps but does not enforce the requirement |
| Staff 10 | 2 weeks and 7 points | Transfer the evaluation asset, not a model-specific prompt string |
| Staff 11 | 99%, 9 of 10 refusals, 80% macro-F1, 94.5% ceiling, 81% stack accuracy | Requested safety precision is unreachable |
| Staff 12 | 5 indexes and roughly zero storage saving | Consolidation saves deployments and operations, not vectors |
| Staff 13 | 512 tokens | Source chunk length changes prefill, not ANN vector width |
| Staff 14 | About 420 tokens | Header-repeated row cost for lookup questions |
| Staff 15 | d = 768 and recall@10 = 0.82 | Real clustered data can violate theorem assumptions |
| Staff 16 | 96 bytes, d = 768, 2^768 codes, 96 k-means fits | Binary and product quantization share code count but place cells differently |
| Staff 17 | 24 hours, 1 hour, 500 million, 50-fold, 50 hours | Whole-index rebuilding cannot meet erasure at scale |
| Staff 18 | Only cleared documents | Security filtering is binding even when preference filters hurt recall |
| Staff 19 | 1 of 3 objections changes | Continuous labels remove the scale objection but not the loss-metric mismatch |
| Staff 20 | Monthly and 500M chunks | Encoder churn invalidates all precomputed vectors |
| Staff 21 | 1 index, 500M chunks, half exact traffic, d = 768 fp32, 1.54 TB | One dense index loses the literal half and costs large memory |
| Staff 22 | 1 million-token window, 200 chunks, 256 tokens, 51,200 tokens | Fit does not imply affordable quadratic prefill |
| Staff 23 | 29.3 GB to 440 MB and 10-fold corpus growth | Generative retrieval relocates rather than deletes cost |
| Staff 24 | 30% exact traffic | Preserve a lexical path for head identifiers |
| Staff 25 | Calls cut by half, skip 30% to 50% | One threshold cannot guarantee both savings and no regression |
| Staff 26 | Recall@5 = 0.94 and p95 = 800 ms | Topical recall does not settle multi-hop or staleness blame |
| Staff 27 | A_orc = 0.82, A_ng = 0.31, R = 0.75, returns 0.51, 0.75, 0.25 | Compare marginal retrieval and generator improvements |
| Staff 28 | 5% weekly, 5 x 10^5 chunks, about 83 s | Frozen retriever updates a slice, trained retriever invalidates all vectors |
| Staff 29 | 2 proposed fixes | Localize indexing before changing query generation or the generation prompt |
| Staff 30 | top-k 5 to 20 | Higher recall can place more evidence in the middle trough |
| Staff 31 | 2 value propositions | User satisfaction and audit attribution answer different questions |
| Staff 32 | Candidate depth k0 | A reranker cannot recover evidence below the handed-off candidate set |
| Staff 33 | 2 minutes | Faithfulness is the fast migration-arbitration check |
| Staff 34 | Recall 92%, faithfulness 95%, end-to-end 58% | Clean isolated metrics can miss deployed-context failure |
| Staff 35 | 0 versus removal | Zeroing a trust axis and deleting it distort evaluation in different ways |
| Staff 36 | p = 1 to p = 0 | Graded provenance preserves legacy recall |
| Staff 37 | 500 ms, 8B to 30B, 2,048 input, 150 output, 1,320 ms, 2.6 times, 91%, 3.75 times | Larger model worsens a decode-bound budget |
| Staff 38 | 4 systems, projected 40%, 2 legally separate | Federation must preserve the compliance boundary |
| Staff 39 | 86-fold storage and 95% prose | Apply page-image indexing only to the layout-heavy slice |
| Staff 40 | $2,850, 6 hours, same-day SLA | Incremental graph updates avoid full extraction on each change |
| Staff 41 | QPS 500 to 5,000 and 100 million documents | Add replicas for load because capacity is unchanged |
