# Appendix A: Formula Sheet

This appendix is a compact derivation and interview-use guide for eight formula groups used in Retrieval-Augmented Generation (RAG) that preserves the source equations, numeric examples, conditions, and rules of thumb while translating Best Matching 25 (BM25), Reciprocal Rank Fusion (RRF), Mean Reciprocal Rank (MRR), normalized Discounted Cumulative Gain (nDCG), modularity, Product Quantization (PQ), floating-point operations (FLOPs) with latency, and end-to-end index memory into operational decisions.

## TL;DR

- Carry units through every derivation. Most design-round arithmetic failures are unit failures.
- Cross-check each result against a published rule or a known system before defending it.
- BM25 separates inverse document frequency, term-frequency saturation, and document-length normalization.
- RRF rewards agreement without requiring comparable scores, while MRR and nDCG measure different ranking goals.
- Modularity compares connectivity with a degree-preserving expectation, while PQ obtains exponential combinations from linearly many centroids.
- FLOP, key-value cache, and Low-Rank Adaptation arithmetic turn model choices into latency and memory budgets.
- Index capacity must include vectors, identifiers, graph links, rebuild headroom, replication, text payload, and metadata.

## The story

Treat the appendix as a cockpit checklist for a RAG design interview.

The panel is useful only if every gauge keeps its unit. A number labeled `3.39e13` is not yet a latency. It becomes one only after it is labeled FLOPs and divided by achieved FLOPs per second. BM25 is the lexical engine gauge. It shows how rare a term is, how repeated evidence saturates, and how document length changes the denominator.

RRF is the sensor combiner. It merges rank signals without pretending that a lexical score and a cosine score share a scale. MRR is the first-hit warning light. It cares only about the first relevant result. nDCG is the ranked-load gauge. It keeps graded relevance and gives later useful results nonzero credit.

Modularity is the route-map gauge. It asks whether a proposed community has more internal connection than degree alone would predict. PQ is the cargo compressor. It splits one large vector into smaller subspaces, stores a modest codebook for each, and represents combinations it never stores explicitly.

The FLOP and latency panel converts model size, token count, context length, cache shape, and adapter rank into time and memory. The final capacity card counts everything loaded on the aircraft. Vector bytes alone are not the fleet. Identifiers, graph links, replication, rebuild copies, text payload, and metadata all travel too.

A safe pilot can rebuild every reading when a constraint changes. Memorizing the final number without its units, condition, and sanity check is not enough. After two weeks of preparation, continued reliance on the card is a reason to re-derive each formula rather than re-read it.

## Decoder table

| Symbol or term | Meaning in this appendix | Mechanical role |
|---|---|---|
| `q` | Query | Supplies terms to BM25 or identifies one evaluation case |
| `D` | Document | Receives a BM25 score |
| `t` | Query term | Contributes one BM25 summand |
| `N` in A.1 | Collection document count | Sets the inverse document frequency scale |
| `n_t` | Documents containing term `t` | Makes common terms less informative |
| `f(t,D)` | Frequency of term `t` in document `D` | Enters a saturating term-frequency factor |
| `abs(D)` | Document length | Drives BM25 length normalization |
| `avgdl` | Mean document length | Defines the length baseline |
| `k_1` | BM25 saturation parameter | Controls how quickly repeated term counts flatten |
| `b` in A.1 | BM25 length parameter | Interpolates from no length charge to full charge |
| `ell` | Document length divided by mean length | Makes length normalization dimensionless |
| `K` in A.1 | Length-adjusted BM25 denominator term | Places the length charge inside saturation |
| IDF | Inverse document frequency | Rewards rarer query terms |
| TF | Term frequency | Counts repeated occurrences before saturation |
| `L` in A.2 | Number of ranked lists | Sets how many votes RRF can combine |
| `r_l(d)` | Rank of document `d` in list `l` | Determines one list's reciprocal contribution |
| `k` in A.2 | RRF rank constant | Sets the exchange rate between rank and consensus |
| `w(r)` | RRF weight at rank `r` | Makes the fusion curve explicit |
| `r_star` | Consensus crossover rank | Marks when agreement beats one list's top hit |
| RR | Reciprocal Rank | Scores the first relevant result for one query |
| `rank_q` | First relevant rank for query `q` | Defines RR and becomes failure when absent |
| `Q_set` | Evaluation query set | Supplies the denominator in MRR |
| MRR | Mean Reciprocal Rank | Averages one first-hit score per query |
| `rel_i` | Relevance grade at rank `i` | Supplies gain to CG and DCG |
| CG | Cumulative Gain | Adds relevance without position sensitivity |
| DCG | Discounted Cumulative Gain | Discounts relevance by log rank |
| IDCG | Ideal Discounted Cumulative Gain | Scores the best ordering of available judgments |
| nDCG | Normalized Discounted Cumulative Gain | Divides DCG by IDCG for cross-query comparison |
| `k` in A.4 | Evaluation cutoff | Limits the ranked prefix being scored |
| `Q` in A.5 | Modularity | Measures connection beyond a degree-fixed chance model |
| `m` in A.5 | Total graph edge count | Normalizes the modularity sum |
| `A_ij` | Binary adjacency indicator | Marks whether nodes `i` and `j` share an edge |
| `k_i` | Degree of node `i` | Sets expected random connectivity |
| `c_i` | Community assigned to node `i` | Selects within-community pairs |
| `delta(c_i,c_j)` | Same-community indicator | Keeps a pair only when both community labels match |
| Leiden | Community algorithm that preserves internal connectivity | Maximizes modularity without disconnected communities |
| Louvain | Earlier modularity algorithm | Can return a disconnected community |
| GraphRAG and LightRAG | Community-based graph retrieval and its lighter update-oriented comparison | They expose the cost of global modularity changes |
| `d` in A.6 | Vector dimension | Sets raw storage and subvector width |
| `m` in A.6 | Number of PQ subvectors | Sets code length and subvector count |
| `k` in A.6 | Centroids per subspace | Sets bits per subvector and codebook size |
| `d/m` | Subvector width | Must be integral for even splitting |
| `k^m` | Representable vector combinations | Grows exponentially in subspaces |
| `k*m` | Stored centroids | Grows linearly in subspaces |
| `N_star` | PQ lookup-table break-even candidates | Marks when precomputation amortizes |
| `b` in A.6 | Bit width of a one-codebook vector code | Makes a single codebook require `2^b` centroids |
| FAISS and Inverted File Product Quantization (IVF-PQ) | The cited vector-search implementation and inverted-file PQ configuration | They supply the memory sanity rule and the amortization setting |
| fp32 | 32-bit floating-point storage | Uses four bytes per scalar |
| bf16 | 16-bit brain floating-point storage | Uses two bytes per scalar |
| int8 | 8-bit integer storage | Uses one byte per scalar |
| int4 | 4-bit integer storage | Uses one-half byte per scalar |
| `N` in A.7 | Model parameter count | Sets model compute and weight memory |
| `D_tokens` | Training token count | Multiplies training FLOPs |
| `C` in A.7 | Approximate total training compute | Equals about `6ND_tokens` |
| `s` | Prefill context length | Enters linear model work and quadratic attention work |
| `L_layers` | Transformer layer count | Multiplies attention and cache cost |
| `d_hidden` | Hidden dimension | Scales attention work |
| `b_bytes` | Bytes per stored scalar | Converts parameter or cache counts into memory |
| KV cache | Key-value cache | Stores attention keys and values per token and request |
| `n_kv` | Key-value head count | Scales cache bytes per token |
| `d_head` | Attention head dimension | Scales cache bytes per token |
| Prefill and decode | Context processing before generation and token-by-token generation | Prefill is compute-bound while decode is bandwidth-bound |
| LoRA | Low-Rank Adaptation | Replaces full matrix updates with rank-`r` factors |
| `r` in A.7 | Adapter rank | Sets trainable LoRA parameters |
| `d_in`, `d_out` | Adapted matrix dimensions | Determine one adapter's parameter count |
| `M_weights`, `M_KV,token`, and `P_LoRA` | Weight memory, cache bytes per token, and adapter parameters | They separate fixed, concurrency-dependent, and trainable costs |
| `N` in A.8 | Indexed vector count | Multiplies per-vector index bytes |
| `b_vec` | Bytes for one vector code | Includes raw fp32 or PQ code bytes |
| `b_id` | Posting identifier bytes | Costs four to eight bytes per vector |
| `b_link` | HNSW link bytes per vector | Adds a graph cost absent from IVF |
| HNSW | Hierarchical Navigable Small World index | Stores neighbor identifiers across graph layers |
| IVF | Inverted File index | Uses centroids and posting lists without HNSW links |
| `M` | HNSW neighbor parameter | Sets layer-zero and upper-layer link storage |
| `M_0` | Layer-zero HNSW neighbors | Uses up to twice `M` identifiers |
| `n_list` | IVF centroid count | Adds coarse-centroid memory |
| `M_index` | Total index footprint | Counts vector, identifier, link, IVF, and PQ bytes |
| `R` | Replication factor | Multiplies the live index copies |
| `h` in A.8 | Rebuild headroom fraction | Reserves overlap for old and new indexes |
| `M_payload` | Text and metadata bytes | Often dominates after strong vector compression |
| `M_fleet` | Replicated index plus payload | Drives machine capacity |
| `shards` | Ceiling division of fleet memory by usable memory per node | Converts a byte footprint into a node count |
| GB, TB, KiB, MB, bytes, bits, and FLOP/s | Gigabytes, terabytes, kibibytes, megabytes, byte and bit counts, and floating-point operations per second | Carrying the unit prevents incompatible quantities from being compared |
| RAM | Random-access memory | Supplies usable capacity per node |

## Core mechanics

### A.1 BM25

#### Formula and symbols

Section 18.3 derives BM25, which scores one query-document pair by summing over query terms.

$$
\operatorname{BM25}(q,D)= \sum_{t\in q} \ln\left(1+\frac{N-n_t+0.5}{n_t+0.5}\right) \frac{f(t,D)(k_1+1)} {f(t,D)+k_1\left(1-b+b\frac{|D|}{\operatorname{avgdl}}\right)}
$$
The logarithmic factor is IDF. The second factor is saturating, length-normalized TF.

The source defaults are:

$$
k_1=1.2, \qquad b=0.75
$$
Define the dimensionless length ratio and adjusted denominator term as:

$$
\ell=\frac{|D|}{\operatorname{avgdl}}, \qquad K=k_1(1-b+b\ell)
$$
At `b=0`, document length is ignored. At `b=1`, the length ratio is charged in full.

#### Plain-language mechanics

IDF raises rare terms. TF saturation gives the first few occurrences most of the benefit. Length normalization changes the saturation denominator instead of applying a hard score penalty. The two knobs are independent. `k_1` controls saturation speed. `b` controls length sensitivity.

#### Worked saturation grid

At `k_1=1.2`, the TF factor becomes:

$$
\operatorname{TFfactor}(f)=\frac{2.2f}{f+1.2}
$$
| `f` | 1 | 2 | 5 | 10 | 20 | Limit |
|---:|---:|---:|---:|---:|---:|---:|
| TF factor | 1.000 | 1.375 | 1.774 | 1.964 | 2.075 | 2.200 |

The second occurrence adds 0.375. Moving from ten to twenty adds 0.111. Ten times more evidence buys about one-third of the second occurrence's gain.

#### Worked length normalization

For a document twice the mean length with one term occurrence:

$$
f=1, \qquad k_1=1.2, \qquad b=0.75, \qquad \ell=2
$$
$$
K=1.2(1-0.75+0.75\times2)=1.2\times1.75=2.1
$$
$$
\operatorname{TFfactor}=\frac{2.2}{1+2.1}=0.710
$$
This is a 29 percent discount inside the saturation denominator. It is soft rather than punitive.

#### Conditions, failures, and rules

- Raise `b` toward 1 for uniform document types such as news or abstracts.
- Lower `b` toward about 0.3 when long documents are genuinely more informative, as in technical manuals or legal filings.
- Classical IDF can become negative when a term appears in more than half the collection. Many implementations floor it.
- BM25 remains strong for exact matches, rare entities, and long-tail queries, as section 18.5 describes.
- Hybrid retrieval is preferable to assuming a dense-only system dominates this baseline.

### A.2 Reciprocal Rank Fusion

#### Formula and symbols

Section 21.6 derives RRF, which assigns one reciprocal contribution for every list that contains document `d`.

$$
\operatorname{RRF}(d)=\sum_{\ell=1}^{L}\frac{1}{k+r_\ell(d)}
$$
A missing document contributes nothing. This is equivalent to sending its rank to infinity. The conventional default is:

$$
k=60
$$
Within one list, rank `r` has weight relative to that list's first result:

$$
\frac{w(r)}{w(1)}=\frac{k+1}{k+r}
$$
That ratio is exactly one-half at:

$$
r=k+2
$$
Consensus across `L` lists beats one list's top result when:

$$
\frac{L}{k+r}>\frac{1}{k+1} \quad\Longleftrightarrow\quad r < L(k+1)-k
$$
#### Plain-language mechanics

RRF uses ranks, not raw scores. It can therefore combine BM25 and cosine-similarity lists without claiming that their score scales match. The constant `k` is the exchange rate between a high individual rank and agreement across lists. Raising it flattens weights and rewards broad consensus. Lowering it sharpens the head and rewards individual confidence.

#### Worked crossover cases

With two lists and `k=60`:

$$
r^*=2(61)-60=62
$$
Agreement anywhere in the top 61 of both lists outranks either list's single best guess.

With two lists and `k=0`:

$$
r^*=2
$$
Only unanimous first place qualifies, so fusion degenerates into interleaving the two heads.

With three lists and `k=60`:

$$
r^*=3(61)-60=123
$$
#### Conditions, failures, and rules

- Default to `k=60` and change it only after measurement. It is the original evaluation value, not a derived optimum.
- Use RRF when score scales are incomparable.
- Use weighted score fusion only after both scales are normalized and the normalization is defensible.
- Fuse at depth 100 and truncate to a final 10 when that is the serving target.
- Fusing only two top-10 lists discards evidence that deeper consensus needs.
- An added weak retriever can raise the crossover and promote mediocre but agreed documents above one strong list's correct top result.

### A.3 Mean Reciprocal Rank

#### Formula and symbols

Section 32.2 derives Reciprocal Rank, which depends only on the first relevant result for query `q`.

$$
\operatorname{RR}_q=\frac{1}{\operatorname{rank}_q}
$$
MRR averages one RR value for every query.

$$
\operatorname{MRR}=\frac{1}{|\mathcal{Q}|}\sum_{q\in\mathcal{Q}}\operatorname{RR}_q
$$
If no relevant result appears, RR is zero.

#### Plain-language mechanics

MRR asks one question: how far down is the first relevant document? It ignores every relevant result after the first.

#### Worked examples

A ten-document list with relevant results at ranks one and ten has:

$$
\operatorname{RR}=1/1=1.0
$$
A list with only one relevant result at rank one receives the same score. The following calculation is not MRR:

$$
\frac{1/1+1/10}{10}=0.11
$$
It sums every relevant hit and divides by list length. A metric that changes when a second relevant document appears cannot be RR for that query.

| First relevant rank | 1 | 2 | 3 | 5 | 10 | Absent |
|---:|---:|---:|---:|---:|---:|---:|
| RR | 1.000 | 0.500 | 0.333 | 0.200 | 0.100 | 0 |

The fall from rank one to rank two loses half the score. Results after rank five are close to failure under this metric.

#### Conditions, failures, and rules

- Use MRR for known-item search, entity lookup, or a question with one supporting passage.
- Use nDCG when relevance is graded or plural.
- Always report the cutoff. MRR at 10 differs from unbounded MRR when the first hit appears after rank 10.
- MRR is a poor sole target for a RAG retriever feeding top `k` documents to a generator.
- Recall at `k` says whether evidence arrived. nDCG at `k` says how the delivered evidence was ordered.
- A gain from moving already-found answers from rank three to rank two can matter less than a smaller recall gain on queries whose evidence was absent.

### A.4 nDCG

#### Formula and symbols

Section 32.2 derives the ranking metrics, beginning with Cumulative Gain, which ignores order.

$$
\operatorname{CG}@k=\sum_{i=1}^{k}\operatorname{rel}_i
$$
Discounted Cumulative Gain divides each grade by a log-rank term.

$$
\operatorname{DCG}@k=
\sum_{i=1}^{k}
\frac{\operatorname{rel}_i}{\log_2(i+1)}
$$

Normalization divides by the best ordering achievable from the available judgments.

$$
\operatorname{nDCG}@k= \frac{\operatorname{DCG}@k}{\operatorname{IDCG}@k}
$$
Therefore:

$$
0\leq\operatorname{nDCG}@k\leq1
$$

#### Plain-language mechanics

CG has no position sensitivity. DCG restores it. The `+1` leaves rank one undiscounted because log base two of two equals one. The logarithm is gentler than reciprocal rank. That is useful when a generator reads several retrieved documents. IDCG is built from the judgments available for that query, not from a perfect oracle. A query with three known relevant documents and one with twenty have different ideal gains. A score of one means the best ordering of the labeled documents. It does not prove that the best documents in the corpus were labeled.

#### Worked discount grid

| Rank `i` | 1 | 2 | 3 | 5 | 10 |
|---:|---:|---:|---:|---:|---:|
| `log2(i+1)` | 1.000 | 1.585 | 2.000 | 2.585 | 3.459 |
| DCG weight | 1.000 | 0.631 | 0.500 | 0.387 | 0.289 |
| RR weight | 1.000 | 0.500 | 0.333 | 0.200 | 0.100 |

At rank 10, DCG still assigns 0.289 while RR assigns 0.100. A useful document at rank four or five retains material credit.

#### Gain choice and judgment conditions

The displayed formula uses direct relevance grades. An alternative uses exponential gain:

$$
\operatorname{gain}_i=2^{\operatorname{rel}_i}-1
$$

This makes the highest ordinal grade dominate more strongly. Both versions appear under the nDCG name, so the gain definition must be stated. Unjudged documents count as non-relevant. Section 32.3 explains why a shallow judgment pool can penalize a retriever for finding a genuinely relevant but unpooled document.

#### Conditions, failures, and rules

- Report cutoff and gain scale together.
- Binary nDCG at 10 and a 0-3 graded nDCG at 10 are different metrics.
- Use the exponential form when ordinal top grades should dominate.
- Pair reranker nDCG at `k` with retrieval recall at a possibly deeper `k_prime`.
- nDCG describes ordering only after the evidence has entered the judged or retrieved set.

### A.5 Modularity

#### Formula and symbols

Section 40.9 derives modularity, the objective that Leiden and Louvain maximize.

$$
Q=\frac{1}{2m}
\sum_{i,j}
\left[A_{ij}-\frac{k_i k_j}{2m}\right]
\delta(c_i,c_j)
$$

Here `m` is total edge count. `A_ij` is one when nodes `i` and `j` share an edge. `k_i` is node degree. The delta is one only when both nodes share a community. The expected degree-preserving edge term is:

$$
\frac{k_i k_j}{2m}
$$

Modularity therefore measures connectivity beyond chance at fixed degree. It does not measure absolute connectivity.

#### Worked four-node partition

Nodes one, two, and three form a triangle. Node four has one edge to node three.

$$
m=4, \qquad 2m=8
$$

For partition A, the triangle and singleton contributions are:

$$
6-\frac{49}{8}=-0.125
$$

$$
0-\frac{1}{8}=-0.125
$$

Thus:

$$
Q_A=\frac{-0.25}{8}=-0.03125
$$

For partition B, all four nodes are together.

$$
Q_B=\frac{8-64/8}{8}=0
$$

The modularity gain is:

$$
Q_B-Q_A=0.03125
$$

One dangling edge decides the merge in this toy graph.

#### Conditions, failures, and rules

- Prefer Leiden because every resulting community remains internally connected.
- Louvain can produce a disconnected community that is then summarized as one theme.
- Modularity is global. One new document can change communities far from its own node. This is why GraphRAG is more expensive to keep fresh than LightRAG.
- Generic high-frequency relations inflate degree without useful structure. Cap or remove them before partitioning.
- A vague `related_to` relation still yields a partition, but not necessarily an informative one.
- Modularity has a resolution limit. Communities with fewer than roughly the following number of edges tend to be absorbed:

$$
\sqrt{2m}
$$

Very small genuine themes may therefore fail to appear as their own community at any hierarchy level.

### A.6 Product Quantization sizing

#### Formula and symbols

Section 16.1 derives Product Quantization. Split a `d`-dimensional vector into `m` subvectors, each with width:

$$
\frac{d}{m}
$$

Quantize each subspace against `k` centroids. Code length is:

$$
\operatorname{code\ length}=m\log_2 k\text{ bits}
$$

The number of representable vectors is:

$$
k^m
$$

The number of stored centroids is:

$$
k\times m
$$

Each centroid has dimension `d/m`, so fp32 codebook memory is:

$$
k\times m\times\frac{d}{m}\times4
=k\times d\times4\text{ bytes}
$$

The `m` factor cancels. Codebook memory is independent of how many subspaces split the vector.

The distance lookup table amortizes after:

$$
N^*=\frac{2kd}{2d-m}
$$

candidate distance computations.

#### Why the mechanism compresses

Representable combinations grow as `k` to the power `m`. Stored centroids grow only as `k` times `m`. This asymmetry is the compression mechanism.

#### Worked 768-dimensional design

Start with:

$$
d=768, \qquad m=96, \qquad d/m=8, \qquad k=256=2^8
$$

One fp32 vector uses:

$$
768\times4=3072\text{ bytes}
$$

The PQ code uses:

$$
96\times8=768\text{ bits}=96\text{ bytes}
$$

Compression is:

$$
3072/96=32
$$

Representable combinations are:

$$
256^{96}=2^{768}\approx1.6\times10^{231}
$$

Stored centroids are:

$$
256\times96=24576
$$

The codebook contains 196,608 fp32 values and occupies:

$$
256\times768\times4=786432\text{ bytes}=768\text{ KiB}
$$
The source opening calls this 768 KB, while the worked byte calculation yields 768 KiB.

The break-even candidate count is:

$$
N^*=\frac{2\times256\times768}{1536-96}
=\frac{393216}{1440}\approx273.07
$$

The source rounds this threshold to 273 candidates. A whole-number count strictly above the exact break-even is 274. Either value is below the length of an inverted list that an Inverted File Product Quantization (IVF-PQ) system would normally probe, so the lookup table amortizes in the stated configuration.

#### Why one codebook loses

A single `b`-bit codebook needs:

$$
k=2^b
$$

For `b=32` in 768 dimensions:

$$
2^{32}\times3072\text{ bytes}
=1.32\times10^{13}\text{ bytes}
=13.2\text{ TB}
$$

The source describes this as a codebook about four hundred times larger than the corpus it compresses. Splitting is what makes the representation feasible.

#### Conditions, failures, and rules

- Default to `k=256`, which gives one byte per subvector.
- Choose `m` to divide `d` evenly and meet the byte budget.
- A common starting point is:

$$
m=d/8
$$

- Codebook memory does not depend on `m`.
- Corpus-scale code storage grows as `m` bytes per vector plus a posting identifier.
- Train codebooks on a sample matching the corpus distribution.
- The FAISS guidance warns below roughly 39 training points per centroid.
- At `k=256`, that rule gives about 10,000 training vectors per subspace.

### A.7 FLOPs and latency

#### Compute formulas

Sections 6.2 and 37.1 derive and apply this arithmetic. For a model with `N` parameters, per-token compute is:

$$
\begin{aligned}
\operatorname{forward} &= 2N\text{ FLOPs}\\
\operatorname{backward} &= 4N\text{ FLOPs}\\
\operatorname{training} &= 6N\text{ FLOPs}\\
C &\approx 6ND_{tokens}\\
\operatorname{generation} &= 2N\text{ FLOPs}
\end{aligned}
$$

Generation has no backward pass.

For prefill over `s` tokens, `L_layers` layers, and hidden dimension `d_hidden`:

$$
\operatorname{FLOPs}_{prefill}=2Ns+2L_{layers}s^2d_{hidden}
$$

The first term is model work linear in context. The second is attention work quadratic in context. Doubling retrieved context is therefore not a linear cost.

#### Memory formulas

Weight memory is:

$$
M_{weights}=N\times b_{bytes}
$$

The source byte values are four for fp32, two for bf16, one for int8, and one-half for int4.

KV cache per token is:

$$
M_{KV,token}=2L_{layers}n_{kv}d_{head}b_{bytes}
$$

Multiply this by context length and concurrency.

LoRA trainable parameters for one adapted matrix are:

$$
P_{LoRA}=r(d_{in}+d_{out})
$$

#### Worked weight and cache examples

Gemma 2 27B uses the following weight memory:

$$
27\times10^9\times4=108\text{ GB at fp32}
$$

An 80 GB card cannot hold those weights before context. The same model uses 54 GB at bf16 and 27 GB at int8.

For Llama 3.1 8B with 32 layers, eight key-value heads, head dimension 128, and bf16:

$$
2\times32\times8\times128\times2
=131072\text{ bytes}
=128\text{ KiB per token}
$$

A 2,048-token context uses:

$$
2048\times128\text{ KiB}=256\text{ MiB}
$$

per concurrent request. The source labels this 256 MB even though its KiB-based arithmetic yields 256 MiB.

#### Worked latency examples

For an 8B model with 32 layers, hidden size 4,096, and context 2,048:

$$
(2\times8\times10^9\times2048)
+(2\times32\times2048^2\times4096)
=3.39\times10^{13}\text{ FLOPs}
$$

At an achieved rate of `3.4e14` FLOPs per second:

$$
\frac{3.39\times10^{13}}{3.4\times10^{14}}
=99.6\text{ ms}
$$

A 110M cross-encoder over 50 pairs of 256 tokens costs:

$$
2\times110\times10^6\times256\times50
=2.82\times10^{12}\text{ FLOPs}
$$

At the same achieved rate:

$$
\frac{2.82\times10^{12}}{3.4\times10^{14}}
\approx8.3\text{ ms}
$$

#### Worked LoRA example

Use rank 16 adapters on query and output projections of size 4,096 by 4,096 across 32 layers:

$$
16(4096+4096)\times2\times32
=8.39\times10^6
$$

Those adapters replace 1.07 billion full-matrix trainable parameters. The share and reduction are:

$$
0.78\%, \qquad \frac{d}{2r}=\frac{4096}{32}=128
$$

#### Conditions, failures, and rules

- Prefill is compute-bound. Decode is bandwidth-bound.
- Retrieved context mostly increases time to first token, not decode tokens per second.
- Reranking 50 pairs takes about 8 ms in the example, compared with about 100 ms of prefill, as section 22.2 applies.
- Weights are the fixed deployment cost. KV cache is the concurrency-dependent variable cost.
- Size the fleet on cache at target concurrency, not only on weights.
- Quote achieved FLOPs per second. Using vendor peak can understate latency by roughly two to three times.

### A.8 Index memory, end to end

#### Per-vector and total formulas

Sections 16.5 and 15.2 derive total index memory and the HNSW link term. Per-vector data bytes are:

$$
b_{vec}=
\begin{cases}
4d & \text{for fp32}\\
m & \text{for PQ with }k=256
\end{cases}
$$

Posting identifiers use:

$$
b_{id}=4\text{ to }8\text{ bytes}
$$

HNSW graph links use:

$$
b_{link}=4\left(2M+\frac{M}{M-1}\right)
$$

The link term is zero for IVF.

With `N` vectors, `n_list` IVF centroids, and `k` PQ centroids:

$$
M_{index}=N(b_{vec}+b_{id}+b_{link})
+n_{list}d\times4
+kd\times4
$$

Fleet memory is:

$$
M_{fleet}=R(1+h)M_{index}+M_{payload}
$$

#### HNSW link derivation

Layer zero stores up to:

$$
M_0=2M
$$

Upper layers form a geometric series.

$$
b_{link}
=4\left(2M+M\sum_{\ell\geq1}M^{-\ell}\right)
=4\left(2M+\frac{M}{M-1}\right)
$$

At `M=32`:

$$
b_{link}=4(64+1.03)=260\text{ bytes}
$$

The FAISS rule quotes 256 link bytes at `M=32`. The derivation is within 1.6 percent. Its extra four bytes represent the upper layers dropped by the rule of thumb. The comparison table uses this layer-zero approximation for its HNSW link rows.

#### Ten-million-vector comparison

Use 10 million chunks and `d=768`.

| Configuration | Bytes per vector | `M_index` | Ratio |
|---|---:|---:|---:|
| HNSW-Flat, `M=16` | 3,072 + 128 = 3,200 | 32.0 GB | 1.0 times |
| HNSW over 64-byte PQ | 64 + 128 = 192 | 1.92 GB | 16.7 times smaller |
| IVF-PQ, 96-byte code + id | 96 + 4 = 100 | 1.00 GB | 32 times smaller |

In the compressed HNSW row, graph links consume 128 of 192 bytes. Two-thirds of the index is graph. The link term is incompressible, so further vector quantization buys little.

#### Rebuild, replication, and payload

An in-place rebuild holds old and new indexes together:

$$
h=1
$$

A separate build box with hot swap can use about:

$$
h\approx0.2
$$

At 400 tokens per chunk and about four characters per token, payload is 1.6 KB per chunk. Across 10 million chunks:

$$
10^7\times1.6\text{ KB}=16\text{ GB}
$$

Metadata at 200 bytes per chunk adds about 2 GB. Payload plus metadata is 18 GB.

For IVF-PQ with `R=2`, `h=1`, and a 1 GB index:

$$
2\times2\times1+18=22\text{ GB}
$$

The text payload now dominates.

#### Conditions, failures, and rules

- Size memory from corpus size and compute from query rate as separate axes. Section 41.1 shows that collapsing them can produce a ten-node cluster where two would suffice.
- Shard count is a ceiling division:

$$
\operatorname{shards}
=\left\lceil\frac{M_{fleet}}{\operatorname{usable\ RAM\ per\ node}}\right\rceil
$$

- Include payload from the start. Past roughly 30 times vector compression, chunk text can dominate.
- Always quote `b_link` with vector compression.
- A 32 times vector compression on HNSW is not a 32 times whole-index compression.
- Omitting rebuild headroom, replication, text, or metadata produces an incomplete machine count.

## Diagrams

Source visual accounting is 0 figures and 0 tables in the manifest. The source contains display equations and unnumbered numeric grids, not captioned source visuals. This appendix preserves those items as equations and Markdown grids without inventing figure or table numbers.

## Whiteboard pack

### What to draw

1. Draw a ranking lane with BM25, RRF, MRR, and nDCG in source order.
2. Under BM25, split IDF from saturating and length-normalized TF.
3. Under RRF, draw two ranked lists meeting at the crossover inequality.
4. Under MRR and nDCG, contrast first-hit credit with graded log-discounted credit.
5. Draw modularity as observed adjacency minus degree-based expected adjacency.
6. Draw one vector split into `m` PQ subspaces and label `k^m` versus `k*m`.
7. Draw compute, weight, KV cache, and LoRA formulas as a model-serving block.
8. Finish with the memory stack: vector, id, links, centroids, replicas, rebuild, payload.
9. Add units to every intermediate value and circle each independent sanity check.

### Spoken script

Start with ranking: BM25 scores lexical evidence, RRF combines incompatible ranked lists, MRR tracks only the first relevant hit, and nDCG preserves graded order. Then draw modularity as observed edges minus degree-based expectation. Move to systems arithmetic: PQ gets exponential combinations from linear codebooks, FLOPs convert model and context size into latency, and KV cache multiplies by context and concurrency. Finish with index memory: add vector bytes, identifiers, graph links, centroids, replication, rebuild headroom, text, and metadata. Keep units on every line and cross-check each result against a known rule before defending the design.

## Interview traps

### 1. Why is a numerically correct answer still wrong?

A value without units, scope, or achieved hardware rate is not defensible. Track bytes versus bits, decimal GB versus KiB, per-token versus per-request cache, per-vector versus fleet memory, and FLOPs versus FLOPs per second. State which local meaning of `N`, `k`, `m`, `b`, or `Q` applies before substituting.

### 2. Which ranking formula is being misused?

BM25 length normalization belongs inside the saturation denominator, while RRF uses ranks because source scores are incomparable. MRR reads only the first relevant result, whereas nDCG needs a cutoff, gain scale, and judgment-pool caveat. Diagnose the objective before tuning a constant.

### 3. Which sanity ablation exposes a false metric or graph claim?

Add a second relevant hit after rank one and RR must stay one, then permute graded results because CG stays fixed while DCG changes. Remove the dangling edge in the four-node graph and the modularity preference must change. Replace typed relations with generic high-frequency edges and expect semantic value to collapse even if a partition remains.

### 4. Why did compression or latency miss the estimate?

For PQ, check whether codebook memory was confused with per-vector codes and whether `m` divides `d`. For latency, use achieved rather than peak FLOPs per second and include quadratic attention. For index memory, add identifiers, HNSW links, rebuild overlap, replicas, payload, and metadata because a 32 times vector compression does not imply 32 times fleet compression.

### 5. What claim limits must be said aloud?

The RRF default 60 is an evaluated convention, not an optimum, and IDCG covers judged documents rather than an oracle corpus. Modularity has a resolution limit and global update behavior, while the source's rounded 273-candidate PQ break-even belongs to the stated dimensions. The 99.6 ms prefill and 8.3 ms rerank use one achieved rate, and every worked result changes when its assumptions change.

## Key numbers

| Topic | Key values | Use and limit |
|---|---|---|
| Formula-sheet reliance | Two weeks | If the sheet is still needed, re-derive each formula instead of re-reading it |
| BM25 defaults and limits | `k_1=1.2`, `b=0.75`, `b=0`, `b=1` | Starting values, no length charge, and full length charge |
| BM25 TF limit | 1.000, 1.375, 1.774, 1.964, 2.075, 2.200 | Frequencies 1, 2, 5, 10, 20, and infinity |
| BM25 length case | `K=2.1`, TF factor 0.710 | Twice-average document, 29 percent discount |
| BM25 lower length setting | `b` about 0.3, classical IDF negative above half the collection | Long documents can be informative and common terms may need an IDF floor |
| RRF default | `k=60` | Conventional original evaluation value |
| RRF crossovers | 62 for two lists, top 61 wins, 123 for three, and 2 at `k=0` | Consensus inequalities, not tuned optima |
| RRF deep fusion | Fuse depth 100, truncate to 10 | Keeps consensus evidence before serving cutoff |
| RR grid and false formula | 1, 0.5, 0.333, 0.2, 0.1, 0, and non-MRR 0.11 | First hit at 1, 2, 3, 5, 10, absent, plus the rejected two-hit calculation |
| nDCG discount grid | Log values 1.000, 1.585, 2.000, 2.585, 3.459 and weights 1.000, 0.631, 0.500, 0.387, 0.289 | Ranks 1, 2, 3, 5, and 10 |
| nDCG range and grades | 0 to 1 and example grades 0 to 3 | Relative to available judgments with the gain scale stated |
| Modularity toy | `m=4`, `2m=8`, contributions -0.125 and -0.125, `Q_A=-0.03125`, `Q_B=0` | Merge gain is 0.03125 |
| Modularity resolution | Roughly square root of `2m` edges | Smaller communities tend to be absorbed |
| PQ design | `d=768`, `m=96`, `k=256` | Eight dimensions and one byte per subvector |
| PQ compression | 3,072 bytes to 96 bytes, 32 times | Vector-only compression |
| PQ combinations | `2^768`, about `1.6e231` | From 24,576 stored centroids |
| PQ codebook | 196,608 fp32 values, 786,432 bytes, 768 KiB | The source opening instead says 768 KB |
| PQ break-even | Exact 273.07, source-rounded 273, whole-count 274 | For the stated 768, 96, 256 design |
| PQ single codebook | `b=32`, `2^32` centroids, 13.2 TB, claimed 400 times | The multiplier lacks a corpus size in this appendix |
| PQ training rule | 39 points per centroid, about 10,000 per subspace | FAISS warning region at 256 centroids |
| Compute and precision rules | Forward 2N, backward 4N, training 6N, fp32 4 bytes, bf16 2, int8 1, int4 0.5 | Per-token FLOPs and per-scalar bytes |
| Gemma 2 27B weights | 108 GB fp32, 54 GB bf16, 27 GB int8, 80 GB card | Excludes context cache and fp32 does not fit |
| Llama 3.1 8B KV | 128 KiB per token, 256 MiB at 2,048 tokens | The source labels the binary result 256 MB per concurrent request |
| Prefill | `3.39e13` FLOPs, 99.6 ms | Uses achieved `3.4e14` FLOPs per second |
| Reranking | `2.82e12` FLOPs, about 8.3 ms | 110M model, 50 pairs, 256 tokens |
| LoRA | 8.39M versus 1.07B, 0.78 percent, 128 times | Rank 16 on two projections across 32 layers |
| HNSW links | Exact 260.13, rounded 260, and quoted 256 bytes | `M=32`, 1.6 percent difference |
| HNSW-Flat | 3,200 bytes per vector, 32.0 GB | 10 million vectors, `d=768`, `M=16` |
| HNSW-PQ | 192 bytes per vector, 1.92 GB | 16.7 times smaller, two-thirds links |
| IVF-PQ | 100 bytes per vector, 1.00 GB, identifiers 4 to 8 bytes | The row uses a 96-byte code plus four-byte id |
| Rebuild headroom | `h=1` in place, about 0.2 with hot swap | Old and new artifact overlap |
| Payload | 16 GB text + 2 GB metadata | 10 million chunks at stated sizes |
| Fleet example | 22 GB | `R=2`, `h=1`, 1 GB index, 18 GB payload |
| Payload crossover | Past roughly 30 times vector compression | Text can dominate index memory |
