# Appendix F: Notation Quick Reference

This appendix provides a compact,
calculation-oriented reference for
the source's symbols, overload
rules, and conventions while
leaving the extended discussion to
the front matter.

## TL;DR

- Preserve case, primes,
  subscripts, and function
  arguments because they
  distinguish symbols.
- Read overloaded symbols from
  their local scope. The same
  letter can name different
  objects.
- Keep `m` for Product
  Quantization (PQ) sub-quantizers.
  `M` is the Hierarchical Navigable
  Small World (HNSW) out-degree and
  never means product quantization.
- Do not merge `R@k` , `P@k` , and
  `P_k` . They mean Recall at `k` ,
  Precision at `k` , and
  segmentation error.
- Use base 2 for logarithms unless
  the text says otherwise. Use
  decimal storage units unless a
  quoted source explicitly uses
  binary units.
- Treat vectors as column vectors
  and read `⊤` as transpose.
- The recurring comparison setup
  is `d = 768` with a 110
  million-parameter encoder. It is
  a book-wide default, not a new
  symbol definition.

## The story

Think of the notation sheet as the
control board in a rail yard.

Each symbol is a track label. `x`
brings user input into the yard.
`q = Φ(x)` sends a query toward
retrieval. `c_1 ... c_k` carries
contexts onward, and `y` marks the
generated answer at the end of the
route.

Subscripts and primes are track
markers. `k` and `k'` do not stop
at the same platform. Uppercase `D`
, lowercase `d` , and primed `D'`
also lead to different
destinations.

The overload table is the switch
chart. It tells the operator
whether `d` means a document or
dimensionality, whether `k` counts
contexts or PQ centroids, and
whether `N` counts vectors or model
parameters.

One switch has a stop sign. `M`
belongs to HNSW out-degree. Product
quantization uses lowercase `m` .

The conventions are the station
clock and scale. They set the
logarithm base, storage units,
latency units, cost units, vector
orientation, and recurring
comparison setup.

The board works only when the
operator reads the local route
before interpreting a reused label.

## Decoder table

The three blocks below preserve the
source layout and all 57 primary
symbol-meaning entries.

### Block 1: System, retrieval, and index notation

| Symbol | Meaning | Why it matters |
|---|---|---|
| `θ` | Generator parameters | Locates the trainable or frozen generator state |
| `D` | Datastore | Names the corpus available to retrieval |
| `D_1 ... D_m` | Component stores | Separates federated or multimodal stores |
| `x` | User input | Marks the pipeline input before encoding |
| `q = Φ(x)` | Query issued to the retriever | Connects user input to retrieval geometry |
| `g(x)` | Retrieval gate with values `{0, 1}` | Decides whether retrieval runs |
| `RET` | Retriever | Names the evidence-selection component |
| `GEN_θ` | Generator | Names the answer-producing component |
| `c_1 ... c_k` | Retrieved contexts | Identifies evidence passed downstream |
| `y` | Generated answer | Marks the pipeline output |
| `k` | Contexts reaching the generator | Sets the final context depth |
| `k'` | Retrieval depth before reranking | Separates candidate depth from final depth |
| `N` | Vectors in the index | Sets index scale |
| `d` | Embedding dimension | Sets vector width and memory cost |
| `M` | HNSW out-degree | Sets graph connectivity and memory |
| `M_0` | HNSW degree at layer 0 | Distinguishes the base-layer degree |
| `ef` | HNSW search beam | Trades latency for recall at query time |
| `n_probe` | Inverted File (IVF) cells probed | Trades search breadth for latency |
| `m` | PQ sub-quantizers | Splits a vector for compression |
| `k` | PQ centroids per subspace | Sets the local codebook size |
| `b` | Code length in bits | Sets compressed storage per vector |
| `R@k` | Recall at `k` | Measures retrieval coverage at depth `k` |

### Block 2: Scoring and evaluation notation

| Symbol | Meaning | Why it matters |
|---|---|---|
| `s(q, d)` | Relevance score | Orders a document for a query |
| `rank(d)` | Position in a ranked list | Connects a score to rank-based metrics |
| `f` | Term frequency | Controls lexical evidence strength |
| `k_1, b` | Best Matching 25 (BM25) saturation and length normalization | Control repetition and document-length effects |
| `avgdl` | Mean document length | Anchors BM25 length normalization |
| `E_Q, E_P` | Query and passage encoders | Map both sides into retrieval space |
| `L_q, L_p` | Query and passage token lengths | Set encoder and interaction cost |
| `MaxSim` | Late-interaction operator | Aggregates token-level similarity |
| `MRR` | Mean Reciprocal Rank | Rewards the first relevant result |
| `DCG` | Discounted Cumulative Gain | Discounts useful results by rank |
| `nDCG@k` | Normalized Discounted Cumulative Gain at `k` | Compares ranking quality at a fixed depth |
| `P@k` | Precision at `k` | Measures useful-result density |
| `P_k` | Segmentation error | Measures chunk-boundary error rather than precision |
| `IoU` | Intersection over Union for chunk-span overlap | Measures overlap between predicted and reference spans |
| `F_1` | Harmonic mean of precision `P` and recall `R` | Balances retrieval coverage and precision |

### Block 3: Training, serving, and graph notation

| Symbol | Meaning | Why it matters |
|---|---|---|
| `ℒ` | Training loss | Defines the optimization target |
| `τ` | Softmax temperature | Controls distribution sharpness |
| `D'` | Retrieved subset in training | Separates training evidence from the full store |
| `λ(d, x)` | Ensemble retrieval weight | Mixes retrieval signals for one document |
| `P_R` | Retriever distribution | Describes retrieval preferences |
| `Q_LM` | Generator preference distribution | Describes generator preferences |
| `γ, β` | Retriever and generator temperatures | Calibrate the two distributions |
| `r` | Low-Rank Adaptation (LoRA) rank | Sets adapter capacity |
| `A, B` | LoRA low-rank factors | Form the adapter update |
| `E_q, E_d` | Shared-space embeddings | Enable cross-modal or shared-space scoring |
| `t_i` | Stage `i` latency | Supports stage-level latency attribution |
| `C_q` | Cost per query | Connects design choices to serving economics |
| `B` | Serving batch size | Controls throughput and memory use |
| `s` | Tokens in context or answer | Sets sequence-dependent serving cost |
| `L` | Transformer layers | Sets model depth and repeated compute |
| `G` | Knowledge graph | Names the graph used for grounded retrieval |
| `∣V∣, ∣E∣` | Entities and edges | Quantify graph size |
| `ω` | Graph grounding operator | Maps a query into graph-grounded form |
| `h` | Traversal depth in hops | Bounds graph search and reasoning depth |
| `θ_m` | Per-modality threshold | Controls multimodal routing decisions |

## Core mechanics

### Purpose and use

The full notation chapter carries
the conventions and extended
overload discussion. This appendix
is the compact version. It gives
symbols and meanings for use during
a derivation rather than during
continuous reading.

Read the exact glyph before
assigning meaning. Case
distinguishes `D` from `d` . A
prime distinguishes `D'` from `D`
and `k'` from `k` . Subscripts
distinguish `M_0` , `P_R` , `Q_LM`
, `θ_m` , and related symbols from
their base letters.

Function arguments also establish
scope. `s(q, d)` is a relevance
score, while standalone `s` counts
tokens in a context or answer.

The calligraphic symbol `ℒ` is
training loss. Plain `L` counts
Transformer layers.

### Overloaded symbols

| Symbol | Meaning A | Meaning B or scope condition |
|---|---|---|
| `d` | A document or chunk | Embedding or hidden dimensionality |
| `k` | Retrieved contexts | PQ centroids per sub-quantizer |
| `m` | PQ sub-quantizers | Datastore count or modality index |
| `M` | HNSW out-degree | Never product quantization. Product quantization uses `m`. |
| `b` | BM25 length normalization | Code bits or bytes per parameter |
| `N` | Vectors in the index | Model parameter count |
| `P` | Model parameter count | Instance price per hour |
| `G` | The knowledge graph | The graph's schema alone in Section 40.3 |

The overload table is a scope rule.
It does not authorize swapping
meanings within one derivation. Use
the surrounding topic to select the
intended meaning.

### Conventions

| Convention | Rule | Scope condition |
|---|---|---|
| Logarithms | Use base 2. | A written alternative overrides the default. |
| Storage | Use decimal units. `1 gigabyte (GB) = 10⁹ bytes`. | This is the default storage convention. |
| Quoted storage source | Preserve binary units. | Apply this only when the source is quoted in binary units and the text says so. |
| Latency | Measure in milliseconds. | Applies when no different unit is written. |
| Throughput | Measure in queries per second. | Applies when no different unit is written. |
| Cost | Measure in United States dollars per query. | Applies when no different unit is written. |
| Vectors and transpose | Vectors are column vectors. `⊤` denotes transpose. | Preserve orientation in derivations. |
| Recurring default | Use `d = 768` with a 110 million-parameter encoder. | This lets worked examples across chapters be compared without restating the setup. |

### Scope-sensitive reading sequence

1. Match the exact case, prime,
   and subscript.
2. Read function arguments before
   reducing a symbol to its base
   letter.
3. Check the explicit overload
   table for `d` , `k` , `m` , `M`
   , `b` , `N` , `P` , or `G` .
4. Apply the topic scope, such as
   retrieval, index structure,
   evaluation, training, serving,
   or graphs.
5. Apply written units first. Use
   the convention defaults only
   when no alternative is written.
6. Treat `d = 768` and the 110
   million-parameter encoder as the
   recurring comparison setup.

### Distinctions that must survive transcription

| Pair or family | Required distinction |
|---|---|
| `D`, `d`, `D'` | Datastore, document or dimension by scope, and retrieved training subset |
| `k`, `k'`, `k_1` | Context count or PQ centroid count, pre-rerank depth, and BM25 saturation |
| `M`, `M_0`, `m` | HNSW out-degree, HNSW layer-0 degree, and PQ sub-quantizer count |
| `b` | BM25 length normalization, code bits, or bytes per parameter by scope |
| `P@k`, `P_k`, `P_R`, `P` | Precision at `k`, segmentation error, retriever distribution, and an overloaded parameter or price symbol |
| `R@k`, `MRR`, `DCG`, `nDCG@k`, `F_1` | Distinct evaluation quantities |
| `s(q, d)`, `s` | Relevance score and token count |
| `ℒ`, `L`, `L_q`, `L_p` | Training loss, Transformer layer count, and query or passage token lengths |
| `E_Q`, `E_P`, `E_q`, `E_d` | Query and passage encoders versus shared-space embeddings |
| `G`, `∣V∣`, `∣E∣`, `ω`, `h` | Graph, entity count, edge count, grounding operator, and hop depth |

## Diagrams

The manifest records 0 numbered
figures and 0 numbered tables. The
source contains two unnumbered
reference layouts. The main symbol
layout is recreated in the three
Decoder table blocks. The
overloaded-symbol layout is
recreated under Core mechanics. No
source number or caption is
invented.

### Source layout accounting

1. Main notation layout: 57
   symbol-meaning entries across
   three horizontal blocks.
2. Overloaded symbols layout: 8
   symbols with two meanings or a
   scope restriction.
3. Conventions text: 8 rules
   covering bases, units,
   orientation, and the recurring
   default.

## Whiteboard pack

### What to draw

1. Draw three stacked boxes for
   system and index, evaluation,
   and training or serving or graph
   notation.
2. Put `x` , `q = Φ(x)` , `RET` ,
   `c_1 ... c_k` , `GEN_θ` , and
   `y` across the first box.
3. Add `N` , `d` , `M` , `M_0` ,
   `ef` , `n_probe` , `m` , `k` ,
   and `b` below that path.
4. Put scoring symbols and metric
   symbols in the second box.
5. Put training, serving, and
   graph symbols in the third box.
6. Draw a switch panel labeled `d`
   , `k` , `m` , `M` , `b` , `N` ,
   `P` , and `G` .
7. Mark `M` as HNSW only and `m`
   as the PQ symbol.
8. Add a footer for base 2 logs,
   decimal storage, milliseconds,
   queries per second, and United
   States dollars per query.
9. Finish with column vectors, `⊤`
   , `d = 768` , and the 110
   million-parameter encoder.

### Spoken script

Draw the notation sheet as a
rail-yard board with three zones.
The first tracks system flow from
`x` through retrieval and
generation, then adds index
symbols. The second holds scoring
and evaluation. The third holds
training, serving, and graph
notation. Now draw an overload
switch for `d` , `k` , `m` , `M` ,
`b` , `N` , `P` , and `G` . Read
scope before moving the switch.
Mark uppercase `M` as HNSW only.
Finish with the operating clock:
base 2 logs, decimal storage,
milliseconds, queries per second,
United States dollars per query,
column vectors, transpose, and the
recurring `d = 768` setup.

## Interview traps

### 1. Are `m` and `M` interchangeable in product quantization?

No. Lowercase `m` is the number of
PQ sub-quantizers, while uppercase
`M` is HNSW out-degree and `M_0` is
the HNSW degree at layer 0. The
overload table explicitly says `M`
never means product quantization.

### 2. Does `k` always mean the same retrieval depth?

No. `k` can mean contexts reaching
the generator or PQ centroids per
sub-quantizer, while `k'` is
retrieval depth before reranking.
`k_1` is the BM25 saturation
parameter, so the exact mark and
local scope choose the meaning.

### 3. Which metric symbols are easy to collapse incorrectly?

`R@k` is Recall at `k` , while
`P@k` is Precision at `k` . `P_k`
is segmentation error. `MRR` ,
`DCG` , `nDCG@k` , `IoU` , and
`F_1` also retain separate
meanings, so similar letters do not
make them interchangeable.

### 4. What defaults apply when a derivation omits units?

Logarithms use base 2, while
storage uses decimal units with
`1 GB = 10⁹ bytes` . A quoted
source can use binary units only
when the text says so. Latency is
milliseconds, throughput is queries
per second, and cost is US dollars
per query.

### 5. Is `d = 768` a universal requirement?

No. It is the book's recurring
default with a 110
million-parameter encoder, and its
purpose is to make worked examples
comparable without repeating the
setup. A written alternative
overrides a convention default.

## Key numbers

| Item | Value | Meaning |
|---|---|---|
| Primary reference entries | 57 | All symbol-meaning entries in the main layout |
| Primary source blocks | 3 | System and index, evaluation, and training or serving or graph notation |
| Explicit overloaded symbols | 8 | `d`, `k`, `m`, `M`, `b`, `N`, `P`, and `G` |
| Convention rules | 8 | Base, storage, unit, orientation, and recurring-default rules |
| Retrieval gate values | 2 | `g(x)` takes values `{0, 1}` |
| Default logarithm base | 2 | Applies unless another base is written |
| Decimal gigabyte | `10⁹` bytes | Binary units require an explicit quoted-source exception |
| Default embedding dimension | 768 | Recurring setup for comparable worked examples |
| Default encoder size | 110 million parameters | Paired with `d = 768` in the recurring setup |
| Manifest numbered visuals | 0 figures, 0 tables | The source layouts are unnumbered |
