# Appendix D: The RAG Card and Index Datasheet

This appendix supplies two handoff templates for a Retrieval-Augmented Generation (RAG) system, with the RAG Card documenting scope, retrieval decisions, measured behavior, and known failures while the Index Datasheet documents artifact composition, representation, structure, footprint, performance, and lifecycle.

## TL;DR

- Keep the RAG Card and Index Datasheet separate because they change on different schedules and usually have different owners.
- Rewrite the card when a retrieval decision changes. Rewrite the datasheet when the index is rebuilt.
- Fill every field. An unfillable field is an audit finding, not harmless missing paperwork.
- The RAG Card records identity, the five decisions, measured behavior, and known failures.
- The Index Datasheet records composition, representation, structure, performance, and lifecycle.
- Report quantities and evidence, including baselines, ceilings, judgment details, concurrency, recall curves, ownership, and freshness.
- Read fields together. Reviewed ownership beside unreviewed automated ingest can reveal an injection surface that neither field exposes alone. Capacity planning must separate the index from payload. In the source example, 2.0 GB of text dominates a 138 MB index.

## The story

Think of a retrieval system handoff as transferring a ship to a new crew.

The RAG Card is the bridge log. It states the vessel's mission, forbidden waters, captain, operating decisions, measured behavior, and known hazards.

The Index Datasheet is the engine-room ledger. It records what physical cargo is aboard, how it is packed, how much space it consumes, how fast the machinery runs, and what happens during maintenance.

The two books live on different clocks. Change the navigation policy and the bridge log changes. Rebuild the engine or repack the cargo and the engine-room ledger changes.

They also have different keepers. The team that owns the user-facing system and on-call rotation may not own the underlying store, embedding, or rebuild job.

A blank line is a red warning lamp. If nobody can state the closed-book baseline, the system's added value is unmeasured. If nobody can state the tombstone threshold, deletion risk is unmeasured.

The most important warning can span books or rows. An authoritative store plus unreviewed automated ingest creates an injection surface. A small compressed index plus a large payload means text, not vectors, drives capacity.

The handoff succeeds when a new crew can answer what the system does, what it costs, who owns each moving part, what evidence supports it, and which conditions make it fail.

## Decoder table

| Term or field | Decode | Required evidence or decision |
|---|---|---|
| Retrieval-Augmented Generation (RAG) | Generator augmented with retrieved evidence | The card documents the full system rather than only the generator |
| RAG Card | One-page system record | Scope, five decisions, measurements, and failures |
| Index Datasheet | Physical index record | Contents, representation, cost, performance, and lifecycle |
| Model card | Preceding model documentation practice | Records training context and inappropriate uses |
| Datasheet for datasets | Preceding dataset documentation practice | Records provenance, composition, and intended use |
| Datastore | Store searched by retrieval | Its contents and writers affect system behavior |
| Generator | Model that answers from retrieved context | Receives the final presented evidence |
| Last accurate date | Date the card still described reality | Makes staleness visible |
| System name and version | Identity of one deployed system state | Binds measurements to a concrete release |
| Intended use | Question types the system is built to answer | Positive operating boundary |
| Out of scope | Question types it answers badly | Specific negative boundary |
| Owner | Responsible team and on-call rotation | Operational accountability |
| When | Retrieval gate decision | Gate family, fire rate, and unnecessary-retrieval cost |
| Where | Datastore decision | Every store, size, owner, and conflict rule |
| What | Query-transformation decision | Transformation and triggering query subset |
| How | Retrieval method decision | Scorer, index, `k_prime`, rerank depth, lexical channel |
| Present | Generator-context decision | Final `k`, order, serialization, and prompt position |
| Retrieval gate | Rule that decides whether retrieval runs | Requires family, fire rate, and cost when unnecessary |
| Always-on retrieval | Retrieval on every query | Must report cost on queries that did not need it |
| Query transformation | Rewrite applied before retrieval | Must name both the rewrite and triggering queries |
| Identity transformation | Leaving the query unchanged | Worked fallback when no conversational rewrite runs |
| Rerank depth | Candidate count scored by the reranker | Sits between initial retrieval and final context depth |
| Lexical channel | Exact-token retrieval path | Worked card uses BM25 beside dense retrieval |
| Dense channel | Embedding-based retrieval path | Worked card fuses it with BM25 |
| Cross-encoder reranker | Pairwise query-document scorer | Reduces the worked candidate set before presentation |
| Context ordering | Placement order of final evidence | Worked card places strongest evidence first and last |
| Serialization | Format used for retrieved blocks | Worked card uses JSON |
| Prompt position | Location of retrieved text relative to instructions | Makes instruction and evidence layout explicit |
| `k_prime` | Initial retrieval depth | Candidate depth before reranking |
| `k` | Context depth after reranking | Evidence count passed to the generator |
| Best Matching 25 (BM25) | Lexical scorer in the worked card | Exact-token retrieval channel |
| Reciprocal Rank Fusion (RRF) | Rank-based list fusion | Combines lexical and dense channels |
| JavaScript Object Notation (JSON) | Worked serialization format | Places retrieved blocks after instructions |
| Recall at `k_prime` | Relevant evidence found by retrieval depth | Requires a described judgment set |
| nDCG at `k` | Normalized Discounted Cumulative Gain at final depth | Measures ranked quality at generator depth |
| Judgment-set size | Count of evaluated queries or items | Defines evidence volume |
| Judge | Human or other judging source | Defines who assigned relevance |
| Relevance scale | Labels used for relevance | Makes metric interpretation possible |
| Agreement | Inter-judge consistency | Shows reliability of relevance labels |
| Kappa (`κ`) | Agreement statistic shown in the worked card | Reports the worked three-way human-judgment consistency |
| Faithfulness | Whether answer claims follow provided evidence | Report separately at claim level |
| Factuality | Whether answer claims are factually correct | Report separately from faithfulness |
| Claim level | Evaluating individual answer claims | Prevents one answer-level score from hiding unsupported claims |
| Closed-book baseline | Accuracy with retrieval disabled | Measures the generator-only path |
| Gold-context ceiling | Accuracy under perfect retrieval | Upper-bounds retrieval improvements |
| Abstention | Refusal behavior | Refusal rate plus accuracy when answering |
| Refusal rate | Fraction of requests not answered | Must be paired with accuracy on answered requests |
| Accuracy conditioned on answering | Accuracy after excluding refusals | Separates safer refusal behavior from answer quality |
| p50 | Fiftieth percentile | Reports median index latency |
| p95 | Ninety-fifth percentile | Tail metric for total and first-token latency |
| p99 | Ninety-ninth percentile | Tail metric for freshness lag |
| TTFT | Time to first token | Separates prompt and prefill delay from total time |
| Stage cost | Cost per query by pipeline stage | Prevents one blended cost number |
| Freshness lag | Source change to retrievability | Report median and p99 where requested |
| Attribution quality | How citations attach and whether claims are attributable | Method plus measured attributable rate |
| Inline citation | Citation generated with the answer | Distinguished from a citation attached afterwards |
| Attributable rate | Fraction of answers or claims supported through attribution | Requires a reported evaluation sample |
| Adversarial surface | Write access and poisoning impact | Writers plus one-chunk blast radius |
| Write access | People or processes allowed to alter a store | Exposes reviewed and automated ingestion paths |
| Automated ingest | Programmatic datastore write path | Becomes an injection surface when unreviewed |
| Authoritative store | Store the generator is expected to trust | Makes an unreviewed writer especially risky |
| Injection surface | Path by which hostile content can enter retrieval | Emerges from write access and generator trust together |
| Poisoned chunk | One adversarial retrieval unit | Supplies the blast-radius measurement unit |
| Corpus snapshot | Source systems, counts, and date | Fixes index composition in time |
| Document count | Number of source documents | Distinguishes source items from derived chunks |
| Chunk count | Number of retrieval units | Drives index and payload scale |
| Snapshot date | Date represented by the corpus | Binds composition to a point in time |
| Chunking | Scheme, target, overlap, and selection evidence | Shows whether the policy was chosen or inherited |
| Target chunk size | Intended tokens per chunk | Defines the worked chunking granularity |
| Chunk overlap | Tokens repeated across neighboring chunks | Must be recorded with target size |
| Chunk prefix | Heading retained with chunk text | Worked example preserves document structure |
| Dropped content | Excluded modalities, boilerplate, and oversize documents | Makes silent exclusions visible |
| Silent exclusion | Content removed without an explicit record | Can mimic retrieval failure even when the source held the answer |
| Metadata | Filterable fields | Cardinality and fill rate for each field |
| Filterable field | Metadata usable in retrieval filtering | Requires cardinality and fill rate |
| Cardinality | Count of distinct field values | Describes a filter's selectivity |
| Embedding model | Name, version, and dimension | Pins a representation that cannot migrate partially |
| `d` | Embedding dimensionality | Sets the worked vector width |
| L2 normalization | Unit-length vector normalization | Must match the selected distance metric |
| Distance metric | Rule used to compare vectors | Must agree with normalization |
| Cosine | Worked vector similarity measure | Used with L2-normalized embeddings |
| Partial migration | Mixing vectors from old and new embedding models | Invalid because the representations are incompatible |
| Precision | Stored numeric precision and quantization | Requires measured recall cost |
| Quantization | Compressed numeric representation | Must include its measured recall cost |
| HNSW | Hierarchical Navigable Small World index | Graph-family option with link memory |
| IVF | Inverted File index | Coarse-partitioned index family |
| IVF-PQ | Inverted File with Product Quantization | Compressed index used in the example |
| Disk-resident index | Index stored beyond memory | Must include build parameters |
| Build parameters | Settings used to construct the chosen index | Needed to reproduce the artifact |
| Per-vector bytes | Vector, identifier, and link terms | State the incompressible link share |
| PQ code bytes | Compressed vector representation | Worked example assigns 96 bytes per vector |
| Vector compression | Raw vector bytes divided by compressed code bytes | Must not be confused with full per-vector or fleet compression |
| Identifier bytes | Posting identifier storage | Worked example assigns four bytes per vector |
| Link bytes | Graph-neighbor storage | Zero for the worked IVF-PQ index |
| Link share | Fraction of per-vector memory spent on graph edges | Does not shrink with vector quantization |
| `nlist` | IVF coarse-centroid count | Sets the worked partition count |
| `m` in IVF-PQ | Product Quantization subvector count | Sets the worked code length |
| `k` in IVF-PQ | Centroids per Product Quantization subspace | Distinct from retrieval depth `k` |
| Centroids | Coarse or quantization representatives | Contribute memory outside per-vector codes |
| Codebook | Stored Product Quantization centroids | Adds a separate memory term |
| `M_index` | Standalone index footprint | Excludes replicas, rebuild, and payload |
| `M_fleet` | Replicated index with rebuild headroom | Report before payload as its own quantity |
| `R` | Replication factor | Multiplies the index footprint |
| `h` | Rebuild headroom fraction | Reserves extra capacity during replacement |
| Rebuild headroom | Capacity for old and new artifact overlap | Separates in-place and separate-box strategies |
| Payload store | Retrieved text and related content | Keep separate from vector index footprint |
| Shards and replicas | Partition and redundancy counts | Include nonrandom partition key |
| Partitioning key | Rule that assigns items to shards | Must be stated when sharding is not random |
| Exact-search recall | Approximate recall against exact search | Different from semantic relevance |
| Exact search | Exhaustive nearest-neighbor reference | Supplies the comparison target for approximate recall |
| Held-out sample | Evaluation items excluded from index tuning | Supplies the exact-search recall test set |
| `ef` | HNSW search-time parameter | Needs a recall-latency curve |
| `nprobe` | IVF search-time probe count | Needs at least three measured values |
| Recall-latency curve | Recall and latency across search settings | Requires at least three values |
| Production concurrency | Simultaneous serving load | Required context for p50 and p95 latency |
| Build | Wall-clock time, cost, and location | State in-place versus separate box |
| In-place build | Rebuild on the serving environment | Must state what queries return during it |
| Separate-box build | Build away from the serving index | Worked example hot-swaps the artifact afterwards |
| Hot swap | Replace the served artifact after an external build | Reduces in-place overlap requirements |
| Churn | Insert, update, and delete rates | Describes index change pressure |
| Upsert | Insert or update operation | Worked lifecycle reports a daily rate |
| Tombstone | Logical deletion marker | Track policy, current fraction, and failure threshold |
| Tombstone fraction | Share of entries marked deleted | Drives the measured rebuild trigger |
| Rebuild trigger | Condition that starts a rebuild | Should precede the observed recall-fall region |
| Rebuild cadence | Scheduled replacement frequency | Part of the lifecycle record |
| Rebuild | Artifact replacement process | Trigger, cadence, duration, and query behavior |
| Fill rate | Fraction of records with a metadata field | Exposes unreliable filters |
| Conflict rule | Which store wins disagreement | Prevents undefined multi-store behavior |
| Fire rate | Fraction of queries that trigger retrieval | Makes gate behavior measurable |
| Blast radius | Impact of one poisoned chunk | Quantifies adversarial exposure |
| USD | United States dollar amount | States worked query and build costs without a currency symbol |
| `M` and `k` count suffixes | Million and thousand in corpus or churn counts | Distinct from model names and retrieval or quantization symbols |
| MB, GB, ms, minutes, and hours | Megabytes, gigabytes, milliseconds, minutes, and hours | Keep memory, latency, build, and freshness units distinct |

## Core mechanics

### Introduction

Retrieval systems pass between teams more often than teams rewrite them. A new owner asks predictable questions, so the two templates answer those questions in advance.

The RAG Card documents the system. The Index Datasheet documents the artifact underneath it. Keep them separate because a card changes when a decision changes, a datasheet changes when the index is rebuilt, and different people usually own them.

The source carries forward the discipline of model cards from Mitchell et al. (2019) and datasheets for datasets from Gebru et al. (2021). Both records use quantities derived in the book rather than vague prose.

The template itself is not the value. The value appears when a field cannot be filled. An unfillable field creates the fastest available retrieval-system audit and an interview question in either direction.

### D.1 The RAG Card

#### Purpose, ownership, and use

The RAG Card answers what the system does and does not do. It exposes behavior that is otherwise hidden behind the generator, including the datastore and five retrieval decisions.

Rewrite it when a decision changes. The system owner and on-call rotation belong on the card.

Fill every field. A field that cannot be filled is the finding.

#### Template 1: Identity and scope

| Field | Prompt to fill |
|---|---|
| System name and version | Give the system name and version. Include the date the card was last accurate. |
| Intended use | Name the question types this system is built to answer. |
| Out of scope | Name question types it will answer badly. Be specific. `General knowledge` is not an answer. |
| Owner | Name the team and on-call rotation. |

#### Template 2: The five decisions

| Decision | Prompt to fill |
|---|---|
| When | State the retrieval gate, gate family, and measured fire rate. If always-on, say so and give the measured cost on queries that did not need retrieval. Source section 25.1. |
| Where | List every store, its size, its owner, and the conflict-resolution rule between stores. Source section 25.3. |
| What | State the query transformation and the queries on which it is applied. Source chapter 24. |
| How | State the scorer, index family, retrieval depth `k_prime`, rerank depth, and whether a lexical channel exists. |
| Present | State final `k`, generator ordering rule, serialization format, and retrieved text position relative to instructions. Source chapter 30. |

#### Template 3: Measured behavior

| Field | Prompt to fill |
|---|---|
| Retrieval | Report Recall at `k_prime` and nDCG at `k`. Describe judgment-set size, judge, relevance scale, and agreement. Source chapter 32. |
| Generation | Report faithfulness and factuality separately at claim level. Source chapter 33. |
| Closed-book baseline | Report end-to-end accuracy with retrieval disabled. Without it, system value is unmeasured. |
| Gold-context ceiling | Report accuracy under perfect retrieval. This bounds every proposed retrieval improvement. |
| Abstention | Report refusal rate and accuracy conditioned on answering. Source chapter 11. |
| Latency and cost | Report p95 total latency, p95 TTFT, and cost per query broken out by stage. Source section A.7. |

#### Template 4: Known failure modes

| Field | Prompt to fill |
|---|---|
| Query types that fail | Name each failing query type and give an example. |
| Freshness lag | Report time from a document change until the change is retrievable. |
| Attribution quality | State whether citations are generated with the answer or attached later. Report measured attributable rate. Source section 31.3. |
| Adversarial surface | State who can write into the datastore and the measured blast radius of one poisoned chunk. Source chapter 36. |

#### Filled RAG Card example, abbreviated

| Field | Value |
|---|---|
| System | Support Assistant retrieval, v4.2, accurate as of 2026-06-01 |
| Intended use | Product how-to and troubleshooting from published docs |
| Out of scope | Pricing, contractual terms, and anything account-specific |
| When | Classifier gate fires on 68 percent of traffic. Closed-book path abstains rather than guessing. |
| Where | Docs contain 1.2M chunks. Tickets contain 400k resolved-only chunks. Docs win on conflict. |
| What | Conversational rewrite on turns greater than one. Identity otherwise. |
| How | BM25 plus dense, RRF `k=60`, `k_prime=100`, cross-encoder rerank to 20 |
| Present | `k=5`, most-relevant first and last, JSON blocks after the instruction |
| Recall at 100 | 0.91 on 2,000 queries, three-way human judged, `κ=0.71` |
| nDCG at 5 | 0.68 |
| Closed-book | 0.42 end-to-end |
| Gold-context | 0.88 end-to-end |
| Deployed | 0.79 end-to-end. Abstains on 9 percent. |
| p95 latency | 1.9 seconds total, 640 ms TTFT, USD 0.0041 per query |
| Freshness lag | 45 minute median, 4 hour p99 |
| Attribution | Generated inline. 81 percent attributable on a 200-answer sample. |
| Write access | Docs team is reviewed. Ticket ingest is automated and unreviewed. |

#### Cross-field audit

Read attribution and write access together. The worked system treats retrieved stores as authoritative, yet ticket ingestion is automated and unreviewed. That combination is the injection surface. The template makes it visible by forcing evidence and ownership onto one page.

### D.2 The Index Datasheet

#### Purpose, ownership, and use

The Index Datasheet adapts dataset documentation of provenance, composition, and intended use to a physical artifact with a memory footprint, rebuild cost, recall curve, and pinned embedding representation. It lets downstream users judge fitness instead of guessing.

Rewrite it when the index is rebuilt. Its owner may differ from the system and on-call owner named on the RAG Card.

The datasheet exists because dashboard summaries do not preserve every assumption that determines migration cost.

#### Template 1: Composition

| Field | Prompt to fill |
|---|---|
| Corpus | List source systems, document count, chunk count, and snapshot date. |
| Chunking | State scheme, target size, overlap, and evidence that the scheme was chosen rather than inherited. Source chapter 13. |
| What was dropped | List tables, images, boilerplate, and documents over a size limit. Silent exclusions are the most common cause when someone says the answer is definitely in the docs. |
| Metadata | List every filterable field, its cardinality, and its fill rate. Source section 17.4. |

Composition fixes what the artifact contains at one point in time. Counts without a snapshot date cannot establish freshness. A chunking scheme without selection evidence can be inherited debt rather than a tested choice.

Dropped content is an explicit negative inventory. It separates retrieval failure from ingestion exclusion.

#### Template 2: Representation

| Field | Prompt to fill |
|---|---|
| Embedding model | Give name, version, and dimensionality. Pin the model because a change invalidates every vector and allows no partial migration. |
| Normalization | State whether vectors are L2-normalized and name the distance metric that assumes it. |
| Precision | State stored precision and quantization. Include the measured recall cost. Source chapter 16. |

Representation fields travel together. Model, dimension, normalization, metric, and precision define vector compatibility. A migration cannot mix old and new embedding vectors as a partial transition.

Quantization is incomplete without its measured recall cost.

#### Template 3: Structure and footprint

| Field | Prompt to fill |
|---|---|
| Index family | Name HNSW, IVF, IVF-PQ, disk-resident, or another family. Include build parameters. |
| Per-vector bytes | Break bytes into vector, identifier, and link terms. State link share because it is incompressible. Source section A.8. |
| Footprint | Report `M_index`, then `M_fleet` with replication and rebuild headroom, then payload as a separate line. |
| Shards and replicas | Give counts and the partitioning key when partitioning is not random. Source section 17.2. |

Per-vector compression does not equal fleet compression. Identifier and graph-link terms remain after the vector shrinks. Replication and rebuild overlap multiply the artifact before payload is added.

The payload must remain a separate line so text cannot disappear inside an index-only total.

#### Template 4: Performance

| Field | Prompt to fill |
|---|---|
| Recall | Report Recall at `k` against exact search on a held-out sample at the production search parameter. State that this differs from relevance. |
| Search parameters | Give current `ef` or `nprobe` and a recall-latency curve across at least three values. |
| Latency | Report p50 and p95 at production concurrency, not one query in isolation. |
| Build | Report wall-clock build time, cost, and whether the build is in place or on a separate box. |

Approximate-search recall asks whether the index matches exact search. It is not the human relevance measurement on the RAG Card.

One search parameter cannot show a trade-off curve. One single-query latency cannot represent production concurrency.

#### Template 5: Lifecycle

| Field | Prompt to fill |
|---|---|
| Churn | Report insert, update, and delete rates. |
| Deletion | State tombstone policy, current tombstone fraction, and the measured fraction where recall begins to fall. Source section 17.1. |
| Rebuild | State trigger, cadence, duration, and what queries return during the rebuild. |
| Freshness | Report median and p99 lag from source change to retrievability. |

Lifecycle fields define what happens after the build completes. Delete rate without tombstone policy cannot predict degradation. A rebuild duration without query behavior leaves availability unspecified.

Freshness reports the full source-to-index path rather than the age of a source document alone.

#### Filled Index Datasheet example, abbreviated

| Field | Value |
|---|---|
| Corpus | Product docs, snapshot 2026-05-28. 180k documents become 1.24M chunks. |
| Chunking | Recursive, 512 tokens, 64 overlap. Headings retained as chunk prefix. |
| Dropped | Images, code blocks over 200 lines, and 3.1 percent of documents over the size cap |
| Embedding | e5-base-v2, `d=768`, L2-normalized, cosine |
| Index | IVF-PQ, `nlist=4096`, `m=96`, `k=256` |
| Bytes per vector | 96 code + 4 id + 0 link = 100 |
| `M_index` | 124 MB + 12.6 MB centroids + 0.8 MB codebook = 138 MB |
| `M_fleet` | `R=2`, `h=0.2`, 331 MB. Payload store is 2.0 GB. |
| Shards | 1 because the footprint fits one node with headroom |
| Recall at 10 | 0.94 versus exact at `nprobe=32` |
| Recall curve | 0.87 at 8, 0.94 at 32, 0.97 at 128 probes |
| Latency | p50 4 ms, p95 11 ms at 40 concurrent |
| Build | 38 minutes, USD 14, on a separate box then hot-swapped |
| Churn | About 2k upserts per day and about 200 deletes per day |
| Tombstones | 1.8 percent now. Recall measured flat to 6 percent. Rebuild triggers at 5 percent. |
| Freshness | 45 minute median, 4 hour p99 |

#### Cross-field capacity audit

Read `M_index` and payload together. The worked index is 138 MB while payload is 2.0 GB. After 32 times vector compression, text dominates by more than an order of magnitude. A capacity plan that reports only the compressed index omits the dominant term.

The source reports 32 times vector compression, but the abbreviated example omits the Precision field required by its own blank template. This appendix alone therefore does not state the raw bytes needed to reconstruct that ratio. The 100-byte per-vector row also includes a four-byte identifier, so it is not the same quantity as the 96-byte vector code.

The displayed index components sum to 137.4 MB from rounded subterms, while the source reports 138 MB. Using the reported total gives `2 x 1.2 x 138 = 331.2 MB`. This matches the reported 331 MB after rounding.

The tombstone rows also encode a condition. Recall stayed flat through 6 percent in measurement, while the rebuild trigger is 5 percent. The trigger acts before the observed fall region.

#### Handoff audit sequence

1. Check the card's last-accurate date and the datasheet's snapshot date.
2. Match every card store to a datasheet corpus or to an explicitly separate artifact.
3. Match the card's scorer and index family to the datasheet's pinned representation and build parameters.
4. Match retrieval depth, rerank depth, and final context depth to the metrics reported at those depths.
5. Keep human relevance Recall separate from approximate-index Recall against exact search.
6. Compare end-to-end p95 and TTFT with index-only p50 and p95 at production concurrency.
7. Compare card freshness with datasheet freshness to verify one source-to-retrieval path.
8. Read store ownership, write access, review status, and poisoned-chunk blast radius together.
9. Read vector compression, link share, fleet memory, and payload on separate lines.
10. Assign every missing quantity to an owner rather than leaving the field silently blank.

#### Cross-record consistency matrix

| RAG Card field | Index Datasheet field | Consistency question |
|---|---|---|
| System version and last-accurate date | Snapshot date | Do the documents describe the same operating period? |
| Intended use | Corpus and dropped content | Does the index contain the modalities needed by the intended questions? |
| Out of scope | What was dropped | Are exclusions reflected in the negative system boundary? |
| Owner | Shards, replicas, build, and rebuild | Is artifact operation assigned as clearly as system on-call? |
| When | Latency and build cost | Is gate behavior justified by the downstream cost it avoids? |
| Where | Corpus and metadata | Does every routed store have composition and filter evidence? |
| What | Chunking and representation | Does transformation match the artifact being searched? |
| How | Index family and search parameters | Do serving settings match the documented index? |
| Present | Recall and recall curve | Do final evidence depth and retrieval settings support the claimed behavior? |
| Retrieval metrics | Exact-search Recall | Are relevance and approximation quality kept separate? |
| Latency and cost | Latency and build | Can stage numbers reconcile with the end-to-end number? |
| Freshness lag | Freshness, churn, and rebuild | Can the lifecycle explain the observed lag? |
| Attribution quality | Dropped content and payload | Is cited evidence present in the stored payload? |
| Adversarial surface | Corpus writers and lifecycle | Are automated write paths measured and bounded? |

These checks do not merge the records. They use one record to test whether the other is internally plausible.

The strongest handoff evidence is reconciled evidence. A system-level number should point to an artifact-level condition, while an artifact-level change should identify which card decision or measurement it can invalidate.

## Diagrams

Manifest accounting is 0 numbered figures and 0 numbered tables. The source contains two unnumbered blank templates and two unnumbered abbreviated filled examples. All four are recreated as Markdown tables under Core mechanics. No figure number, table number, or source caption is invented.

### Unnumbered template accounting

- Blank RAG Card: four category tables and 19 prompts.
- Filled RAG Card: one abbreviated table with 17 rows.
- Blank Index Datasheet: five category tables and 19 prompts.
- Filled Index Datasheet: one abbreviated table with 16 rows.

## Whiteboard pack

### What to draw

1. Draw two adjacent boxes labeled RAG Card and Index Datasheet.
2. Write decision change above the card and index rebuild above the datasheet.
3. Divide the card into identity, five decisions, measured behavior, and failures.
4. Put When, Where, What, How, and Present down the card's center.
5. Add baseline, ceiling, abstention, latency, freshness, attribution, and write access.
6. Divide the datasheet into composition, representation, structure, performance, and lifecycle.
7. Add model pinning, vector-id-link bytes, exact-search recall, concurrency, and tombstones.
8. Draw separate index and payload boxes, then circle the larger payload in the example.
9. Connect unreviewed ingest to the adversarial surface.
10. Mark every blank field as an audit finding with an owner and evidence gap.

### Spoken script

Draw two handoff records with different clocks. The RAG Card changes when a retrieval decision changes. It records scope, owner, When, Where, What, How, Present, measured behavior, and failures. The Index Datasheet changes when the artifact is rebuilt. It records corpus, chunking, representation, vector and link bytes, recall curves, concurrency, build, churn, deletion, rebuild, and freshness. Then connect related fields. Unreviewed automated ingest plus authoritative retrieval exposes injection risk. A 138 MB index plus a 2.0 GB payload exposes the true capacity driver. Any blank field is an audit finding that needs evidence and ownership.

## Interview traps

### 1. Why are there two templates instead of one?

They describe different objects, schedules, and owners. The card changes with system decisions, while the datasheet changes with an index rebuild. Combining them encourages one owner to leave the other object's fields stale.

### 2. Which five-decision answer is incomplete?

`When` needs gate family, fire rate, and unnecessary-retrieval cost, while `Where` needs every store, size, owner, and conflict rule. `What` needs transformation and triggering queries, while `How` needs scorer, index, `k_prime`, rerank, and lexical channel. `Present` needs final `k`, order, serialization, and position relative to instructions.

### 3. What measurements must not be conflated?

Retrieval Recall and normalized Discounted Cumulative Gain (nDCG) need judgment details, while Exact-search Recall compares an approximate index with exact search rather than relevance. Faithfulness and factuality are separate claim-level properties, while closed-book accuracy measures value without retrieval and gold-context accuracy sets the retrieval ceiling. Median or 95th-percentile latency needs production concurrency.

### 4. How does the card reveal an adversarial failure?

Read fields together. The worked card says citations are generated inline and ticket ingestion is automated and unreviewed, so treating that store as authoritative makes the write path an injection surface. The blank template also requires the measured blast radius of one poisoned chunk.

### 5. Why can a compressed index still require more capacity than expected?

Per-vector bytes are only one layer because identifiers, links, centroids, replication, rebuild headroom, and payload also consume capacity. In the example, the 138 MB index sits under a 2.0 GB payload. Vector compression reached 32 times, but text dominates by more than an order of magnitude.

## Key numbers

| Template | Number or value | Meaning |
|---|---|---|
| Source manifest | 0 figures, 0 tables | Templates are unnumbered source layouts |
| Documentation precedents | Model cards in 2019 and datasheets for datasets in 2021 | Cited traditions behind the two records |
| RAG Card scope | One page and 5 retrieval decisions | System-level handoff record |
| RAG Card blank template | 4 categories, 19 prompts | Identity 4, decisions 5, behavior 6, failures 4 |
| Index Datasheet blank template | 5 categories, 19 prompts | Composition 4, representation 3, structure 4, performance 4, lifecycle 4 |
| Filled RAG Card | 17 rows | Abbreviated worked example |
| Filled Index Datasheet | 16 rows | Abbreviated worked example |
| Card version | v4.2, accurate 2026-06-01 | Worked system identity |
| Retrieval gate | 68 percent of traffic | Closed-book path abstains |
| Stores | 1.2M doc chunks and 400k resolved ticket chunks | Docs win conflicts |
| Query rewrite | Turns greater than 1 | Identity transformation otherwise |
| Retrieval funnel | `k_prime=100`, rerank 20, final `k=5` | BM25 plus dense with RRF 60 |
| Recall | 0.91 at 100 | 2,000 queries, three-way human judged, `κ=0.71` |
| nDCG | 0.68 at 5 | Ranked final-context quality |
| Accuracy | 0.42 closed, 0.88 gold, 0.79 deployed | Baseline, ceiling, and deployed result |
| Abstention | 9 percent | Deployed refusal behavior |
| Card latency | 1.9 seconds total, 640 ms TTFT | p95 worked value |
| Card cost | USD 0.0041 per query | Worked end-to-end cost |
| Card freshness | 45 minute median, 4 hour p99 | Source-to-retrieval lag |
| Attribution | 81 percent on 200 answers | Generated inline |
| Adversarial measurement | One poisoned chunk | Unit for the required blast-radius measurement |
| Corpus | 180k documents to 1.24M chunks | Snapshot 2026-05-28 |
| Chunking | 512 tokens, 64 overlap | Recursive with heading prefix |
| Dropped | Code blocks over 200 lines, 3.1 percent over cap | Images also excluded |
| Embedding | e5-base-v2, dimension 768 | L2-normalized cosine |
| IVF-PQ | `nlist=4096`, `m=96`, `k=256` | Worked index parameters |
| Bytes per vector | 96 code + 4 id + 0 link = 100 | Worked compressed layout |
| Vector compression | Source-reported 32 times | Abbreviated example omits the precision needed to reconstruct raw vector bytes |
| Index memory | 124 + 12.6 + 0.8 = 138 MB | Codes plus identifiers, centroids, and codebook |
| Fleet memory | 331 MB | `R=2`, `h=0.2` |
| Payload | 2.0 GB | More than one order above 138 MB |
| Shards | 1 | Fits one node with headroom |
| Exact Recall | 0.94 at 10 and `nprobe=32` | Approximate versus exact search |
| Recall curve | 0.87 at 8, 0.94 at 32, 0.97 at 128 | Three probe settings |
| Search-curve minimum | At least 3 values | Required to show the recall-latency trade-off |
| Index latency | p50 4 ms, p95 11 ms | Measured at 40 concurrent |
| Build | 38 minutes, USD 14 | Separate box, then hot swap |
| Churn | About 2k upserts and 200 deletes daily | Worked lifecycle rate |
| Tombstones | 1.8 percent current, flat through 6 percent, trigger 5 percent | Rebuild precedes measured recall fall |
| Datasheet freshness | 45 minute median, 4 hour p99 | Matches worked card lag |
