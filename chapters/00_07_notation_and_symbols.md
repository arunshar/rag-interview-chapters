# 00.07 Notation and Symbols

This unit standardizes the symbols, abbreviations,
overloads, and measurement conventions used
throughout the retrieval-augmented generation
(RAG) book.

## TL;DR

- The semi-parametric frame separates knowledge
  in generator parameters `θ` from knowledge in
  the retrievable datastore `D` .
- The main flow is `x` to `q` to a retrieval
  gate, a ranked retrieval result, `k` contexts,
  and generated answer `y` .
- Retrieval and ranking notation covers
  relevance, rank, term statistics, encoders,
  token lengths, loss, and temperature.
- Index notation names vector count, dimension,
  graph degree, search breadth, product
  quantization, and recall targets.
- Evaluation and training notation distinguishes
  ranking quality, chunking quality, retrieval
  distributions, generator supervision, and
  low-rank factors.
- Multimodal, graph, latency, and cost symbols
  connect retrieval choices to modality
  thresholds, graph size, stage timing, and query
  price.
- Several conventional symbols are overloaded.
  The source keeps them and requires context to
  identify the intended meaning.

## The story

Imagine a library service with a practiced
librarian, live shelves, and a checkout counter.
The librarian's learned habits are `θ` . The
shelves are datastore `D` , and separate rooms are
`D_1, ..., D_m` . A visitor speaks input `x` . The
librarian transforms it into query `q = Φ(x)` .
Gate `g(x)` decides whether anyone visits the
shelves.

When retrieval runs, `RET(x, D)` searches and
ranks the shelves. It first brings back `k′`
candidates. Reranking narrows them to `k`
contexts, `c_1, ..., c_k` . Generator `GEN_θ`
reads those contexts and writes answer `y` , one
token `y_t` at a time.

The library has several control panels. Retrieval
scores and ranks items. The vector index controls
how broadly the shelves are searched. Evaluation
checks ranked results and chunk boundaries.
Training aligns the retriever's distribution with
the generator's preference. Multimodal admission
rules and graph grounding decide which rooms and
relationships can join the search.

The checkout counter records each stage latency
`t_i` and query cost `C_q` . Some labels repeat
across panels. The label `d` can mean a document
at the search desk or a dimension at the index
panel. The label only becomes safe when its panel
and first-use definition are visible.

## Decoder table

| Technical term | Plain-English meaning | Why it matters |
|---|---|---|
| The Semi-Parametric Frame: `θ` | Generator parameters, the parametric component | Knowledge stored in weights. |
| The Semi-Parametric Frame: `D` | Datastore, the non-parametric component | Retrievable at test time. |
| The Semi-Parametric Frame: `D_1, ..., D_m` | Individual stores composing `D` | Source selection ranges over these stores. |
| The Semi-Parametric Frame: `x` | User input | What the user actually typed. |
| The Semi-Parametric Frame: `q = Φ(x)` | Query issued to the retriever | `Φ` is the query transformation. |
| The Semi-Parametric Frame: `g(x) ∈ {0, 1}` | Retrieval gate | Decision one is whether to retrieve. |
| The Semi-Parametric Frame: `RET(x, D)` | Retriever | Returns a ranked list. |
| The Semi-Parametric Frame: `GEN_θ` | Generator | The language model. |
| The Semi-Parametric Frame: `c_1, ..., c_k` | Retrieved contexts passed to the generator | These are the contexts retained after truncation. |
| The Semi-Parametric Frame: `y` | Generated answer | `y_t` is its t-th token. |
| The Semi-Parametric Frame: `k` | Number of contexts passed to `GEN` | The top-k cutoff. |
| The Semi-Parametric Frame: `k′` | Retrieval depth before reranking | `k′ ≥ k`. Truncation is decision five. |
| Retrieval and Ranking: `d` | A document or chunk | Context disambiguates it from dimension. |
| Retrieval and Ranking: `s(q, d)` | Relevance score of `d` for `q` | No additional convention is stated. |
| Retrieval and Ranking: `rank(d)` | Position of `d` in a ranked list | Positions are 1-indexed. |
| Retrieval and Ranking: `f` | Term frequency in a document | Used by BM25. |
| Retrieval and Ranking: `k_1, b` | BM25 saturation and length-normalization parameters | Typically `k_1 ≈ 1.2` and `b ≈ 0.75`. |
| Retrieval and Ranking: `avgdl` | Average document length in the collection | Used by BM25. |
| Retrieval and Ranking: `E_Q(·), E_P(·)` | Query and passage encoders | Dense passage retrieval (DPR) convention. Bi-encoder. |
| Retrieval and Ranking: `L_q, L_p` | Query and passage length in tokens | Drives encoder floating-point operations (FLOPs). |
| Retrieval and Ranking: `MaxSim` | Late-interaction operator | ColBERT. |
| Retrieval and Ranking: `ℒ` | Training loss | No additional convention is stated. |
| Retrieval and Ranking: `τ` | Softmax temperature | Sharpens or flattens a score distribution. |
| Indexing and Vector Search: `N` | Number of vectors in the index | Context distinguishes it from model parameter count. |
| Indexing and Vector Search: `d` | Embedding dimensionality | Examples are 768 and 1,536. |
| Indexing and Vector Search: `M` | Hierarchical navigable small world (HNSW) out-degree per node above layer 0 | Build parameter. Storage is `8M` bytes per vector. |
| Indexing and Vector Search: `M_0` | HNSW out-degree at layer 0 | `M_0 = 2M` by convention. |
| Indexing and Vector Search: `ef` | HNSW search-time candidate list size | Recall and latency knob per query. |
| Indexing and Vector Search: `n_probe` | Number of inverted file (IVF) cells searched per query | Recall and latency knob per query. |
| Indexing and Vector Search: `m` | Number of product quantization (PQ) sub-quantizers, or subvectors | Each subvector has dimension `d / m`. |
| Indexing and Vector Search: `k` | Centroids per sub-quantizer | Code space is `k^m`. Storage is `k · d`. |
| Indexing and Vector Search: `b` | Code length in bits | `k = 2^b`. |
| Indexing and Vector Search: `R@k` | Recall at k | The index's quality target. |
| Evaluation: `MRR` | Mean reciprocal rank | One relevant item is assumed. |
| Evaluation: `DCG, nDCG@k` | Discounted cumulative gain and normalized discounted cumulative gain at k | Used with graded relevance. |
| Evaluation: `P@k, R@k` | Precision and recall at k | Set metrics. They are order-insensitive. |
| Evaluation: `P_k, WindowDiff` | Text-segmentation error metrics | Used to evaluate a chunker. |
| Evaluation: `IoU` | Intersection over union of chunk spans | Used to evaluate a chunker. |
| Evaluation: `F_1` | Harmonic mean of precision and recall | Macro-averaged for judge agreement. |
| Training the RAG System: `D′` | Retrieved subset used for a training step | Normalization is over `D′`, not `D`. |
| Training the RAG System: `λ(d, x)` | Normalized retrieval weight in an output ensemble | REPLUG. |
| Training the RAG System: `P_R(d ∣ x)` | Retriever's distribution over the top k | Defined over the same k as the generator preference. |
| Training the RAG System: `Q_LM(d ∣ x, y)` | Generator's preference distribution over the same k | The supervision signal. |
| Training the RAG System: `γ, β` | Retriever and generator softmax temperatures | Language model (LM)-supervised retrieval. |
| Training the RAG System: `KL(P ∥ Q)` | Kullback-Leibler divergence | The loss aligning the two distributions. |
| Training the RAG System: `r` | Low-rank adaptation (LoRA) rank | `W + BA` with `B ∈ ℝ^(n × r)`. |
| Training the RAG System: `A, B` | LoRA low-rank factors | The low-rank factors in `W + BA`. |
| Multimodal and Graph Retrieval: `E_q, E_d` | Query and document embeddings in a shared space | Modality-agnostic. |
| Multimodal and Graph Retrieval: `θ_m` | Admission threshold for modality `m` | Per-modality, never global. |
| Multimodal and Graph Retrieval: `S_ij` | Contrastive similarity matrix | Contrastive Language-Image Pre-training (CLIP). `N` true pairs lie on the diagonal. |
| Multimodal and Graph Retrieval: `𝒢 = (V, E)` | Knowledge graph, its entities, and its edges | `V` is the entity set. `E` is the edge set. |
| Multimodal and Graph Retrieval: `∣V∣, ∣E∣` | Entity and edge counts | Drives construction and storage cost. |
| Multimodal and Graph Retrieval: `Q̂ = ω(Q, 𝒢)` | Query grounded against the graph schema | `ω` is the grounding operator. |
| Multimodal and Graph Retrieval: `h` | Traversal depth in hops | No additional convention is stated. |
| Latency and Cost: `t_i` | Latency of pipeline stage `i` | Stages are embed, search, rerank, prefill, and decode. |
| Latency and Cost: `C_q` | Cost of one query in dollars | `C_q = (P / 3,600,000) ∑_i t_i`. |
| Latency and Cost: `B` | Serving batch size | No additional convention is stated. |
| Latency and Cost: `s` | Number of tokens in a context or an answer | Context disambiguates its use. |
| Latency and Cost: `L` | Number of transformer layers | Context distinguishes it from training loss `ℒ`. |
| Symbols That Carry More Than One Meaning: `d` | Meaning A is a document or chunk in retrieval | Meaning B is embedding or hidden dimensionality in indexing and systems. |
| Symbols That Carry More Than One Meaning: `k` | Meaning A is the number of retrieved contexts | Meaning B is centroids per sub-quantizer in product quantization. |
| Symbols That Carry More Than One Meaning: `m` | Meaning A is the number of product quantization sub-quantizers | Meaning B is the number of datastore sources or a modality index. |
| Symbols That Carry More Than One Meaning: `M` | Meaning A is HNSW out-degree | It never means product quantization. Product quantization uses `m`. |
| Symbols That Carry More Than One Meaning: `b` | Meaning A is the BM25 length-normalization parameter | Meaning B is code length in bits or bytes per parameter. |
| Symbols That Carry More Than One Meaning: `N` | Meaning A is the number of vectors in the index | Meaning B is model parameter count in FLOPs arithmetic. |
| Symbols That Carry More Than One Meaning: `P` | Meaning A is model parameter count in encoder FLOPs arithmetic | Meaning B is instance price per hour in cost arithmetic. |
| Symbols That Carry More Than One Meaning: `𝒢` | Meaning A is the knowledge graph | Meaning B is the graph's schema alone in source section 40.3. |
| Conventions: `log` | Logarithm | Base 2 unless the base is written. |
| Conventions: `GB` | Gigabyte in storage arithmetic | Decimal units. `1 GB = 10^9 bytes` unless a quoted source uses binary units, which the text states at the point of use. |
| Conventions: `t_i` | Latency | Measured in milliseconds unless otherwise labeled. |
| Conventions: `throughput` | Query throughput | Measured in queries per second unless otherwise labeled. |
| Conventions: `C_q` | Query cost | Measured in United States (US) dollars per query unless otherwise labeled. |
| Conventions: `vector` | Vector orientation | Vectors are column vectors. |
| Conventions: `⊤` | Transpose marker | `⊤` denotes transpose. |
| Conventions: `1,000` | Number formatting pattern | Thousands separators appear in numbers of four digits or more. |
| Conventions: `d = 768, P = 110M` | Recurring default configuration | Dimension 768 and Bidirectional Encoder Representations from Transformers base (BERT-base) parameter count 110M support comparison across chapters. |

## Core mechanics

### The Semi-Parametric Frame

- What: `θ` names the generator's parametric
  knowledge. `D` names test-time retrievable
  knowledge. The remaining symbols trace input,
  query transformation, gating, retrieval, context
  selection, and generation.
- Why: The frame keeps weight-based knowledge
  separate from datastore knowledge and makes each
  pipeline decision visible.
- Failure without it: A reader could confuse what
  the user typed with the retriever query, or
  confuse pre-reranking depth `k′` with the final
  top-k cutoff.
- Stated cost: No explicit cost formula appears
  in this section.

### Retrieval and Ranking

- What: This notation defines documents,
  relevance scores, rank positions, BM25
  statistics, encoders, token lengths, late
  interaction, training loss, and softmax
  temperature.
- Why: It gives one vocabulary for lexical
  ranking, encoded retrieval, training, and score
  calibration.
- Failure without it: Rank could lose its
  1-indexed convention, `d` could be mistaken for
  dimension, or `τ` could be mistaken for a score
  instead of a temperature.
- Stated cost: Query length `L_q` and passage
  length `L_p` drive encoder floating-point
  operations.

### Indexing and Vector Search

- What: `N` and `d` size the vector collection.
  `M` , `M_0` , and `ef` describe HNSW search.
  `n_probe` describes IVF search. `m` , `k` , and
  `b` describe PQ.
- Why: The notation separates build parameters,
  per-query search knobs, compression structure,
  and the recall target.
- Failure without it: `M` could be confused with
  product quantization `m` , or a recall and
  latency knob could be treated as a fixed build
  setting.
- Stated cost: The source gives `8M` bytes per
  vector, `M_0 = 2M` , subvector dimension `d / m`
  , code space `k^m` , storage `k · d` , and
  `k = 2^b` . It identifies `ef` and `n_probe` as
  recall and latency knobs.

### Evaluation

- What: The metrics cover ranked retrieval,
  graded relevance, set quality at k, text
  segmentation, chunk-span overlap, and judge
  agreement.
- Why: They keep ranking quality separate from
  chunking quality and state each metric's
  assumption or averaging rule.
- Failure without it: A reader could apply an
  order-insensitive set metric as if it captured
  rank order, or miss that mean reciprocal rank
  assumes one relevant item here.
- Stated cost: No evaluation cost is stated.

### Training the RAG System

- What: `D′` is the retrieved training subset.
  `λ` , `P_R` , and `Q_LM` define retrieval
  weighting and aligned distributions. `γ` and `β`
  set temperatures. `KL(P ∥ Q)` aligns the
  distributions. `r` , `A` , and `B` define LoRA.
- Why: The notation makes the normalization set,
  supervision signal, alignment loss, and low-rank
  update explicit.
- Failure without it: Normalization could
  incorrectly use all of `D` , or the retriever
  distribution could be confused with the
  generator's preference distribution. The source
  requires normalization over `D′` .
- Stated cost: No explicit training cost formula
  appears in this section.

### Multimodal and Graph Retrieval

- What: Shared embeddings connect query and
  document modalities. `θ_m` controls admission by
  modality. `S_ij` represents contrastive
  similarity. `𝒢` , `Q̂` , `ω` , and `h` describe
  graph grounding and traversal.
- Why: These symbols keep shared-space retrieval,
  per-modality admission, graph structure, schema
  grounding, and hop depth distinct.
- Failure without it: One global admission
  threshold could replace required per-modality
  thresholds, or the full graph could be confused
  with its schema.
- Stated cost: Entity count `∣V∣` and edge count
  `∣E∣` drive graph construction and storage cost.

### Latency and Cost

- What: `t_i` measures the latency of embed,
  search, rerank, prefill, and decode stages.
  `C_q` measures query cost. `B` , `s` , and `L`
  name batch size, token count, and transformer
  layers.
- Why: Stage-level timing supports one consistent
  query-cost calculation.
- Failure without it: Model parameter count `P`
  could be used where the formula requires hourly
  instance price, or stage latency units could be
  mixed.
- Stated cost: `C_q = (P / 3,600,000) ∑_i t_i` ,
  with latency in milliseconds and `P` as instance
  price per hour.

### Symbols That Carry More Than One Meaning

- What: The source explicitly overloads `d` , `k`
  , `m` , `M` , `b` , `N` , `P` , and `𝒢` .
- Why: These symbols remain consistent with their
  separate retrieval, representation-learning, and
  systems literatures.
- Failure without it: A familiar symbol could
  silently acquire the wrong meaning and corrupt a
  formula or design explanation.
- Stated cost: No cost is assigned to the
  convention. Each section states the active
  meaning at first use.

### Conventions

- What: The source fixes logarithm bases, storage
  units, latency, throughput, currency, vector
  orientation, transpose notation, number
  formatting, and a recurring default
  configuration.
- Why: Examples remain comparable across chapters
  without repeating their setup.
- Failure without it: Decimal and binary storage
  could be mixed, latency and throughput units
  could drift, or recurring examples could appear
  to use different model sizes.
- Stated cost: Cost is in US dollars per query
  unless otherwise labeled. Storage uses decimal
  units unless a quoted source uses binary units,
  which the text states at the point of use.

## Diagrams

The manifest lists zero figures and zero captioned
tables for physical PDF pages 28-31. No diagram
redraw is required.

The source contains seven unnumbered notation
tables and one unnumbered overload table. The
exhaustive Decoder table preserves every row from
those layouts. The prose conventions block is
preserved in both the Decoder table and Core
mechanics.

## Whiteboard pack

### What to draw

1. Draw input `x` at the far left.
2. Add transformation `Φ` to form query `q` ,
   then add gate `g(x)` .
3. Draw datastore `D` as a box containing `D_1`
   through `D_m` .
4. Draw `RET(x, D)` , a ranked list of `k′`
   items, reranking, and the final `k` contexts.
5. Draw `GEN_θ` , then answer `y` and token `y_t`
   .
6. Add small score, index, evaluation, and
   training panels below the main path.
7. Add stage latencies `t_i` , cost `C_q` , and
   context labels beside overloaded symbols.

### Spoken script

Start with input x and transform it into query q
with Phi. The gate g decides whether retrieval
runs. If it does, RET searches datastore D, which
may contain D one through D m. Draw k prime
results before reranking, then narrow them to k
contexts c one through c k. Feed those contexts to
GEN theta and produce answer y token by token as y
sub t. Under the pipeline, add score, index,
evaluation, and training boxes. Finish with stage
latencies t sub i and query cost C sub q. Every
overloaded symbol gets its meaning from its box.

## Interview traps

### 1. Why does the notation keep overloaded symbols instead of inventing new ones?

Each symbol is conventional in its own literature.
The source preserves those conventions and
requires the active meaning to be stated at first
use.

### 2. Are `k′` and `k` interchangeable?

No. `k′` is retrieval depth before reranking,
while `k` is the number of contexts passed to the
generator. The source requires `k′ ≥ k` and calls
truncation decision five.

### 3. What is the difference between `D` and `D′`?

`D` is the datastore. `D′` is the retrieved subset
used for one training step. Training normalization
is over `D′` , not all of `D` .

### 4. Can `M` denote product quantization?

No. `M` denotes HNSW out-degree. Product
quantization uses lowercase `m` for the number of
sub-quantizers.

### 5. What does `P` mean in cost arithmetic?

In `C_q = (P / 3,600,000) ∑_i t_i` , `P` is
instance price per hour. In encoder FLOPs
arithmetic, `P` instead means model parameter
count.

## Key numbers

| Quantity | Source value | Meaning |
| --- | --- | --- |
| Contributing literatures | `3` | Information retrieval, representation learning, and systems supply the conventional notation. |
| Primary notation categories | `7` | Semi-parametric frame, retrieval and ranking, indexing and vector search, evaluation, training, multimodal and graph retrieval, and latency and cost. |
| Explicitly overloaded symbols | `8` | `d`, `k`, `m`, `M`, `b`, `N`, `P`, and `𝒢`. |
| Retrieval gate outputs | `0` or `1` | Do not retrieve or retrieve. |
| Retrieval gate decision | `1` | The source calls retrieve-or-not decision one. |
| Truncation decision | `5` | The source calls truncating `k′` to `k` decision five. |
| Rank origin | `1` | Ranked positions are 1-indexed. |
| Typical BM25 `k_1` | `≈ 1.2` | Saturation parameter. |
| Typical BM25 `b` | `≈ 0.75` | Length-normalization parameter. |
| Example embedding dimensions | `768`, `1,536` | Examples for index dimensionality `d`. |
| HNSW storage term | `8M` bytes per vector | Eight times `M` bytes per vector. |
| Layer 0 degree convention | `M_0 = 2M` | Layer 0 has twice the stated upper-layer out-degree. |
| Product quantization relation | `k = 2^b` | `b` bits select `k` centroids per sub-quantizer. |
| Mean reciprocal rank assumption | `1` relevant item | The evaluation definition assumes one relevant item. |
| Contrastive diagonal | `N` true pairs | CLIP places the true pairs on the diagonal of `S_ij`. |
| Latency stages | `5` | Embed, search, rerank, prefill, and decode contribute stage latencies. |
| Cost denominator | `3,600,000` | Used with millisecond stage latencies and hourly instance price. |
| Graph-schema overload pointer | Section `40.3` | `𝒢` means the graph schema alone at this source pointer. |
| Default logarithm base | `2` | Applies unless another base is written. |
| Decimal gigabyte | `1 GB = 10^9 bytes` | Binary units apply only when a quoted source states them at the point of use. |
| Thousands-separator threshold | `4` digits | All numbers with four digits or more use separators. |
| Recurring default dimension | `768` | Used for comparison across chapters. |
| Recurring BERT-base parameter count | `110M` | Used for comparison across chapters. |
