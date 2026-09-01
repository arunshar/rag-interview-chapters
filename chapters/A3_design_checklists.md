# Appendix C: Design Checklists

Use these five operational checklists to turn a Retrieval-Augmented Generation (RAG) design review into named decisions, measured quantities, and explicit exit criteria.

## TL;DR

- Run these checklists. Do not merely read them. Each line needs a number or a named decision.
- Internalize the retrieval checklist for interviews. It covers five decisions in ten minutes, with two minutes per phase.
- Run the indexing checklist before provisioning and before migrations. Derive memory, recall, latency, churn, and rebuild requirements.
- Run the evaluation checklist before trusting a dashboard. It must locate failures across retrieval, generation, and the full system.
- Run the credibility checklist before outsiders can write to the datastore. Trace sources, test attribution, limit attackers, and enforce access during retrieval.
- Run the latency checklist with a stopwatch on a real query. Measure five stages, optimize the dominant constraint, and derive cost per query.
- Treat every exit criterion as a gate. If the criteria fail, the design is not finished.

## The story

Picture an aircraft crew preparing for departure. The crew does not admire five laminated cards and call the plane ready. They run every line. A box receives a measured value or a named choice. A box filled with "fast," "large," or "safe" remains open.

The retrieval card is the route card. It asks how large the trip is, when to leave the gate, which airports to use, how to navigate, and how to brief the passengers. In system terms, it fixes problem size, the retrieval decision, the data sources, the search method, and the evidence shown to the generator.

The indexing and capacity card is the weight-and-balance card. It counts every chunk, vector, index link, payload byte, replica, and rebuild copy. It also tests whether the search controls can reach the required recall, which means finding the required fraction of exact neighbors, at the required latency.

The evaluation card calibrates the cockpit instruments. It checks the test set before flight, separates retrieval readings from generation readings, and traces a bad result to its owning stage. A single end-to-end score is like one warning light for the whole aircraft. It cannot tell the crew where the fault lives.

The credibility and robustness card secures the cabin and cargo hold. It records where each document came from, what happens when sources conflict, whether citations support the answer, who can load content, and what one poisoned document can damage. It also enforces each passenger's access rights during retrieval, before private material reaches the model.

The latency and cost card starts the stopwatch and checks fuel use. It measures embedding, approximate search, reranking, prompt processing, and answer decoding under real load. The crew reduces the dominant delay first and records what quality each cheaper choice gives up.

Departure requires five exit stamps. If any card lacks its stamp, the aircraft stays at the gate. The honest review says which requirement remains open. It does not hide the gap behind a confident adjective.

## Decoder table

| Technical term | Plain-English meaning | Why it matters |
|---|---|---|
| Retrieval-Augmented Generation (RAG) | A system that retrieves external material and gives it to a generator | The five checklists cover its retrieval, storage, evaluation, trust, latency, and cost decisions |
| Operational checklist | A list that must produce measurements or named choices | Reading a line without answering it does not finish the design |
| Exit criteria | Conditions that must hold before a checklist passes | A failed exit criterion means the design is not finished |
| Retrieval design skeleton | Five decisions about size, retrieval timing, sources and transformations, search, and evidence presentation | It gives an interview answer a complete structure |
| Corpus size in chunks | The number of retrievable units in the collection | It drives memory independently of traffic |
| Chunk size | The amount of content in each retrievable unit | It helps determine corpus count, memory, and prompt tokens |
| Queries per second (QPS) | The median and peak request rates | They drive compute independently of corpus size |
| Latency budget | The allowed response time | It turns "fast" into a measurable requirement |
| Time-to-first-token | Delay before the answer begins | A product may care about this more than total latency |
| Total latency | Delay until the answer finishes | It captures the whole user wait |
| Freshness requirement | The maximum acceptable age of an answer | Minutes, hours, and days require different architectures |
| Accuracy bar | A named metric with a cutoff | An adjective cannot determine whether the design passes |
| Retrieval gate g(x) | The explicit rule that decides whether a query retrieves | Always retrieving is a measured choice, not a neutral default |
| Query classifier | A gate that predicts whether a query needs retrieval | It is one named gating family |
| Generator confidence | A generator signal used to decide whether to retrieve | It is another named gating family |
| Self-reflective token | A model-produced signal that requests retrieval | It is another named gating family |
| Closed-book path | The path that answers without retrieved evidence | The design must say what this path returns and whether it may abstain |
| Abstention | Refusing to answer | It can protect quality, but it changes coverage |
| Controller drift | Degradation in a learned retrieval gate | Query distribution shift can make the gate fail |
| Query distribution shift | A change in the kinds of queries the system receives | Every learned gate degrades under this change |
| Store | A source collection that retrieval can search | Multiple stores require selection and disagreement rules |
| Source-selection rule | The rule that chooses which stores to search | It prevents an undefined multi-source path |
| Query transformation Φ | The operation applied to a query before search | The design must name the operation and when it fires |
| Identity transformation | Searching with the query unchanged | It is one allowed query transformation |
| Query compression | Shortening a query before search | It is one allowed query transformation |
| Query expansion | Adding search terms to a query | It is one allowed query transformation |
| Query rewriting | Rephrasing a query for retrieval | Conversational rewrites must resolve referents beyond the current turn |
| Query decomposition | Splitting a query into smaller search questions | It is one allowed query transformation |
| Conversational referent | A word whose meaning depends on earlier turns | A rewrite that misses it can search for the wrong subject |
| Chunking scheme | The rule that divides content into retrievable units | It needs evidence from the actual corpus |
| Semantic chunking | Chunking based on meaning boundaries | Its value must be measured on the target corpus, not borrowed from a benchmark |
| Scoring function | The formula that ranks retrieved items | It defines what the search engine considers a good match |
| Lexical channel | Search based on words or exact terms | Dense-only search needs justification for long-tail and exact-match queries |
| Dense-only retrieval | Retrieval that uses only vector similarity | It may miss query types served by a lexical channel |
| Long-tail query | A rare query pattern | It is a specific stress case for dense-only retrieval |
| Exact-match query | A query that depends on matching a precise term | It is another stress case for dense-only retrieval |
| Hybrid retrieval | Retrieval that combines dense and lexical channels | It requires a named fusion method and constant |
| Fusion method | The rule that combines rankings from retrieval channels | An unnamed fusion rule leaves ranking behavior undefined |
| Fusion constant | The fixed parameter used by the fusion rule | It makes the hybrid design reproducible |
| Retrieval depth k′ | The number of candidates retrieved before later processing | It differs from rerank depth and generator context count |
| Rerank depth | The number of retrieved candidates sent to the reranker | It controls reranking work and candidate coverage |
| Generator k | The number of chunks sent to the generator | It determines evidence count and prefill tokens |
| Index family | The data structure used for nearest-neighbor search | It trades recall, latency, memory, and rebuild cost |
| Recall target | The required fraction of exact neighbors found | It must be paired with a named latency |
| Metadata filter | A rule that limits search by document fields | It needs a strategy and an over-filtering fallback |
| Over-filtering fallback | The action taken when filters remove too many candidates | It prevents filters from silently starving retrieval |
| Prefill token count | Tokens processed before generation begins | Chunk size multiplied by generator k makes this cost visible |
| Evidence ordering | The placement of retrieved evidence in the prompt | The design must address evidence that lands in the middle of context |
| Serialization format | The structure used to place retrieved text in the prompt | It fixes where evidence sits relative to instructions |
| Attribution mechanism | The process that connects answer claims to evidence | Generating citations with the answer differs from attaching them later |
| Vector precision | The bytes used to store each vector value | It is part of vector storage sizing |
| N | The number of chunks in the index | It is a required input to capacity sizing |
| d | The number of dimensions in each stored vector | It is stated with N and vector precision before computing vector bytes |
| Vector bytes b_vec | The storage used by one vector | The indexing checklist requires this number before other sizing |
| Graph-index overhead b_link | Per-vector storage for graph links | It must be counted separately from vector bytes |
| Inverted file (IVF) | An index family that uses postings and searched partitions | Its posting identifiers and search controls affect storage and recall |
| Posting identifier | A stored reference inside an IVF posting list | It adds index overhead beyond vector bytes |
| Compression code size | Bytes left after vector compression | The resulting recall cost must be measured, not assumed |
| Rebuild headroom h | Extra capacity reserved for rebuilding | An in-place rebuild holds two indexes at once |
| Replication factor R | The number of stored copies | It multiplies fleet capacity needs |
| Payload store | Chunk text plus filterable metadata | It can dominate after roughly 30x vector compression |
| Shard count | The number of index partitions | It is the ceiling of total footprint divided by usable memory per node |
| Random access memory (RAM) | Usable memory on an index node | It limits how much index footprint one node can hold |
| Recall@k′ | Recall measured at the retrieval depth actually used | It evaluates candidate retrieval against exact search |
| Exact search | A search that establishes the neighbor ground truth | It is the comparison target for recall |
| Held-out sample | Data reserved for evaluation | Recall must be measured on data outside the tuning path |
| Relevance judgment | A label about result usefulness | It measures a different question from exact-neighbor recall |
| ef | A per-query graph-index search control | It is reversible and should be tried before rebuilding |
| n_probe | The number of IVF partitions searched per query | It is a reversible search-time control |
| Build-time knob | An index setting that requires a rebuild to change | Its cost includes the full rebuild duration |
| Production concurrency | The real number of simultaneous requests | Latency measured without it can misrepresent deployed behavior |
| Tombstone | A deletion marker that leaves index structure behind | Deletion does not repair the index |
| Tombstone fraction | The share of entries marked deleted | Its measured recall effect sets the rebuild trigger |
| Rebuild cadence | How often the index is rebuilt | Operations must know its duration and placement |
| Hot-swap | Replacing an old index with a separately rebuilt one | It is an alternative to rebuilding in place |
| Embedding model version | The exact model tied to stored vectors | A model change invalidates every vector and has no partial migration |
| Judgment set | The queries, judges, relevance scale, and agreement used for evaluation | It defines the denominator and labeling process |
| Inter-annotator agreement | Agreement among human judges | It shows whether relevance labels are stable |
| Training-data contamination | Evaluation examples appearing in generator training data | It can make the test set uninformative |
| Retrieval benchmark wearing RAG clothing | A test the generator can answer without retrieval | It measures nothing about retrieval |
| Normalized Discounted Cumulative Gain at k (nDCG@k) | A ranked relevance score at the depth sent to the generator | It answers a different question from Recall@k′ |
| Ceiling check | End-to-end accuracy with a perfect retriever | It bounds all downstream improvement |
| Large language model (LLM) judge | A model that assigns evaluation labels | Its agreement with humans must be known on a sample |
| Macro average | An average that gives each class equal weight | It prevents large classes from hiding weak judge agreement |
| Faithfulness | Whether an answer follows the supplied evidence | It can be high even when the evidence itself is wrong |
| Factuality | Whether an answer is true | It must be reported separately from faithfulness |
| Claim-level decomposition | Scoring individual claims instead of a whole answer | It exposes which claims lack support |
| Unverifiable-claim fraction | The share of claims that cannot be checked | It keeps unsupported content visible |
| Accuracy conditioned on answering | Accuracy only among non-abstained answers | It must be paired with abstention rate to show coverage |
| Length dependence | Error rates changing with answer length | It can invalidate comparisons across systems |
| Stage attribution | Assigning each failure to its owning design stage | It localizes quality drops |
| Macro, micro, and mezzo views | Three evaluation views at different aggregation levels | All three are needed because one end-to-end score cannot localize failure |
| Remove-the-evidence ablation | Rerunning evaluation without retrieved evidence | It checks whether the system actually uses retrieval |
| Closed-book baseline | Performance without retrieved evidence | It must appear beside the RAG result |
| Gold-context ceiling | Performance with ideal evidence | It shows the best downstream result under perfect context |
| Shuffled-context control | Performance with context order or association disrupted | It is a sanity case for evidence use |
| Self-consistency | Stability across repeated runs | It is a system property beyond average quality |
| Corrupted-document robustness | Behavior when one document is damaged or wrong | It tests whether one bad source can destabilize the system |
| Denominator | The population behind a reported number | Every headline number needs one |
| Source reliability signal | Evidence-based trust information for each source | It should come from agreement, provenance, or recency, not a one-time hand label |
| Cross-source agreement | Support shared across sources | It can contribute to a reliability signal |
| Editorial provenance | The editorial origin and handling of a source | It can contribute to a reliability signal |
| Update recency | How recently a source changed | It can contribute to a reliability signal |
| k - 1 other documents | The remaining retrieved documents when one document conflicts with a set of k | The design must name a mechanism for resolving that contradiction |
| Temporal validity | Whether a fact remains valid at retrieval time | An old but once-correct document can produce a cited factual error |
| Credibility laundering | A weak claim gaining apparent authority through quotation by a stronger source | Source reputation alone does not prevent it |
| Post-hoc citation | A citation attached after answer generation | The source says not to call that system grounded |
| Attributable claim | A claim supported by the cited evidence | It is one class in the attribution taxonomy |
| Extrapolatory claim | A claim that goes beyond the cited evidence | It is one class in the attribution taxonomy |
| Contradictory claim | A claim opposed by the cited evidence | It is one class in the attribution taxonomy |
| Prompt injection | Retrieved content trying to act as an instruction | Every datastore writer is a potential source |
| Structural separation | Keeping retrieved data distinct from prompt instructions | It helps the model treat content as data rather than commands |
| Blast radius | The worst measured effect of one poisoned chunk | It turns a security intention into a bounded test |
| Authenticated ingestion | Verifying who supplied content | It supports provenance policy at write time |
| Content credentials | Provenance information for media | Missing credentials are common and need a policy |
| Red-team test | An adversarial test of the retrieval path | Testing only the model misses retrieval-specific attacks |
| Entitlement | A user's right to access content | It must be enforced during retrieval |
| Tenant boundary | The separation between customers or user groups | A filter can fail open under bugs, while a separate index fails closed |
| End-to-end removal | Deleting a document from retrieval, caches, summaries, and graphs | Removal is incomplete if derived copies remain |
| Approximate nearest neighbor (ANN) search | The approximate vector-search stage | It is one of the five measured latency stages |
| Rerank | Reorder retrieved candidates with a later scoring stage | It is one of the five measured latency stages |
| Prefill | Process the prompt before answer generation | In most text RAG systems it dominates together with decode |
| Decode | Generate answer tokens | In most text RAG systems it dominates together with prefill |
| p95 and p99 | Latencies below which 95 or 99 percent of requests fall | The chosen production percentile matters more than a single-threaded median |
| Dominant stage | The stage with the largest share of latency | Optimization should start there |
| Key-value (KV) cache | Reusable generator state for repeated retrieved chunks | Reuse can reduce repeated work |
| Coarse-to-fine cascade | A sequence that sends few candidates to the expensive stage | It reduces expensive-stage work |
| Central processing unit and graphics processing unit (CPU and GPU) pipeline | Overlapping work across processors | Embedding and search can run in an overlapped pipeline |
| Cost per query C_q | Total query-serving cost across all five stages | It must include embedding and vector-store cost, not only generation tokens |
| Amortized indexing cost | Build cost spread across the refresh cadence | A graph build is a recurring capital expense |
| Priced gate | Retrieval cost attributed to the decision to retrieve | Not retrieving is the cheapest available optimization for part of the traffic |
| Agentic or iterative loop | A design that retrieves over multiple rounds | It needs expected-round and tail-cost estimates |

## Core mechanics

These checklists are written to be run, not read. Each line must produce a concrete number or a named decision. A line that produces only an adjective remains unanswered.

The retrieval checklist is the interview checklist to internalize. Reproducing its five-decision skeleton and sizing questions verbally in under two minutes is a reasonable preparation target. The other four checklists are job-side design-review instruments.

Each checklist ends with exit criteria. If a design cannot meet them, report that the design is not finished.

### C.1 The Retrieval Design Checklist

Run this checklist in ten minutes. It contains five decisions. Give one number or named choice for every line. A vague answer is a finding, not a pass.

#### Phase 0: Size the problem, 2 minutes

**What**

1. State corpus size in chunks and the chunk size that produced it. These two numbers drive memory. Source pointer: section 16.5.
2. State median and peak QPS. Query rate drives compute and is separate from corpus size.
3. Split the latency budget into time-to-first-token and total latency. Name which one the product cares about.
4. State how stale an answer may be. Minutes, hours, and days require three different architectures. Source pointer: section 17.1.
5. State the accuracy bar as a metric with a cutoff, not as an adjective.

**Why**

This phase turns scale, load, responsiveness, freshness, and quality into testable requirements.

**Failure without it**

The design cannot size memory or compute. It also cannot prove that latency, freshness, or accuracy passes.

**Cost and complexity**

The source gives this phase two minutes. It separates two sizing axes, corpus size and query rate, and two latency measures, time-to-first-token and total.

#### Phase 1: When to retrieve, 2 minutes

**What**

1. State gate g(x) explicitly, even if it always retrieves. Always-retrieve has a measured cost and is not a neutral default. Source pointer: section 1.5.
2. Name the gating family. Choose a query classifier, generator confidence, or self-reflective token. Source pointer: section 25.1.
3. State what the closed-book path does. Include whether the system may abstain. Source pointer: section 11.1.
4. Name how controller drift will be detected. Every learned gate degrades under query distribution shift. Source pointer: section 25.7.

**Why**

The gate controls which queries pay retrieval cost and which queries rely on the closed-book path.

**Failure without it**

Retrieval becomes an unmeasured default. A shifted query mix can silently degrade a learned controller.

**Cost and complexity**

The source gives this phase two minutes. A learned gate also needs an ongoing drift-detection plan.

#### Phase 2: Where and what, 2 minutes

**What**

1. Enumerate the stores. If there is more than one, state the source-selection rule and what happens when two stores disagree. Source pointer: section 25.3.
2. State query transformation Φ. Choose identity, compression, expansion, rewriting, or decomposition. State which queries trigger it. Source pointer: chapter 24.
3. For conversational traffic, confirm that rewriting resolves referents outside the current turn. Source pointer: section 24.5.
4. State the chunking scheme and its evidence. Semantic chunking needs a measurement on the target corpus, not a benchmark number. Source pointer: section 13.6.

**Why**

This phase fixes the searched sources, transformed query, conversation behavior, and retrievable unit.

**Failure without it**

Multi-store disagreement has no policy. Rewrites can lose the subject, and chunking becomes an unsupported label.

**Cost and complexity**

The source gives this phase two minutes. It requires corpus-specific chunking evidence and query-specific transformation rules.

#### Phase 3: How to retrieve, 2 minutes

**What**

1. Name the scoring function and whether a lexical channel exists. If retrieval is dense-only, justify it against long-tail and exact-match queries. Source pointer: section 18.5.
2. If retrieval is hybrid, state the fusion method and its constant. Source pointer: section 21.6.
3. State retrieval depth k′ and rerank depth separately from generator k. Source pointer: section 22.2.
4. State the index family and its recall target at a named latency. Source pointer: section 15.6.
5. If metadata filters exist, state the filter strategy and the over-filtering fallback. Source pointer: section 17.5.

**Why**

This phase makes ranking channels, depth, index behavior, and filtering reproducible.

**Failure without it**

The design can hide exact-match weaknesses, conflate three depths, or over-filter until no useful evidence remains.

**Cost and complexity**

The source gives this phase two minutes. Hybrid fusion adds a method and constant. Recall must be tied to a measured latency.

#### Phase 4: How to present it, 2 minutes

**What**

1. State generator k and the prefill token count it implies. Multiply chunk size by k out loud.
2. State evidence ordering. If evidence lands in the middle of context, state the response. Source pointer: section 30.5.
3. State the serialization format and where retrieved text sits relative to the instruction.
4. State the attribution mechanism. Say whether attribution is generated with the answer or attached afterward. Source pointer: section 31.3.

**Why**

This phase connects retrieved candidates to prompt cost, evidence position, instruction boundaries, and citations.

**Failure without it**

Context cost stays hidden. Evidence can land in a weak position, instructions can blur with data, and citation timing remains ambiguous.

**Cost and complexity**

The source gives this phase two minutes. Prefill tokens equal chunk size multiplied by generator k.

#### C.1 exit criteria

**What**

1. Every one of the five decisions has an answer, and at least two carry a number.
2. Name one thing the design gives up without being prompted.
3. State how to find which stage broke when quality drops. Source pointer: chapter 34.

**Why**

These gates test completeness, trade-off awareness, and debuggability.

**Failure without it**

The retrieval design remains vague, one-sided, or impossible to diagnose.

**Cost and complexity**

The exit gate requires five answered decisions, at least two numeric decisions, one volunteered sacrifice, and one diagnostic plan.

### C.2 The Indexing and Capacity Checklist

Run this checklist before provisioning and before every migration. Every line should produce a number. The source points to section A.8 for the arithmetic.

#### Sizing

**What**

1. State N chunks, d dimensions, and stored-vector precision. Compute b_vec before anything else.
2. State the index family and its per-vector overhead. Use b_link for a graph index or posting identifiers for IVF. Keep this overhead separate from vector bytes. Source pointer: section 15.2.
3. State the compression decision, resulting code size, and measured recall cost. Do not assume the recall cost. Source pointer: section 16.1.
4. State rebuild headroom h and replication factor R. An in-place rebuild holds two indexes at once.
5. State payload-store bytes for chunk text and filterable metadata. Past roughly 30x vector compression, payload storage dominates. Source pointer: section 17.4.
6. Compute shard count as a ceiling division of total footprint by usable RAM per node. Source pointer: section 17.2.

**Why**

Sizing must include vectors, index overhead, compressed codes, rebuild copies, replicas, payloads, and usable node memory.

**Failure without it**

Fleet memory can be understated. Rebuilds can exceed capacity, and aggressive vector compression can hide a dominant payload store.

**Cost and complexity**

An in-place rebuild needs capacity for two indexes. Replication multiplies storage. Payloads may dominate past roughly 30x vector compression.

#### Recall and latency

**What**

1. State the recall target at a named k. Measure it against exact search on a held-out sample, not against relevance judgments.
2. State the search-time knob and current value. Use ef for a graph index or n_probe for IVF. These controls are per-query and reversible.
3. State the build-time knobs. State that changing them requires a full rebuild and give its duration.
4. Measure latency at target recall under realistic concurrency, not as a single query.
5. For a recall shortfall, change search-time controls first, build-time controls second, and index family last. Source pointer: section 15.6.

**Why**

This order tries reversible controls before expensive rebuilds or an index-family change.

**Failure without it**

Recall can be measured against the wrong target. Latency can look good only because the test ignored concurrency.

**Cost and complexity**

Search-time controls are per-query and reversible. Build-time changes require a full rebuild. Changing index family is the last step.

#### Churn and operations

**What**

1. State insert, update, and delete rates. A deletion creates a tombstone. It does not repair the index. Source pointer: section 17.1.
2. Measure the tombstone fraction where recall starts falling. Derive the rebuild trigger from that measurement.
3. State rebuild cadence and duration. Say whether rebuilding happens in place or on a separate box with a hot-swap.
4. State what a query returns during a rebuild. Say whether that path has ever been tested.
5. Pin the embedding model version to the index. A model change invalidates every vector, and no partial migration exists.

**Why**

The index is an operated system. Churn, deletion markers, rebuild behavior, and model versions change its live state.

**Failure without it**

Recall can decay without a trigger. Queries can hit an untested rebuild path, and a model change can invalidate the whole index unexpectedly.

**Cost and complexity**

Rebuild cadence comes from a measured tombstone threshold. Model migration replaces every vector rather than a partial subset.

#### C.2 exit criteria

**What**

1. Derive total fleet memory rather than copying a vendor sizing-calculator result.
2. State what fraction of the index is graph structure and therefore incompressible.
3. Give the rebuild path a runbook and a measured duration.

**Why**

These gates prove that capacity, incompressible overhead, and operations are understood.

**Failure without it**

Provisioning depends on an opaque estimate, and the rebuild path remains unmeasured.

**Cost and complexity**

Passing requires one derived fleet-memory number, one graph-overhead fraction, and one timed rebuild runbook.

### C.3 The Evaluation Checklist

An evaluation that cannot localize a failure is a dashboard, not an instrument. This checklist builds an instrument. The source develops the method in chapter 34.

#### Before measuring anything

**What**

1. Write down correct answers for three real queries by hand before choosing a metric.
2. State the judgment set. Include query count, judges, relevance scale, and inter-annotator agreement. Source pointer: section 32.4.
3. Confirm that the evaluation set is absent from generator training data. State how this was confirmed. Source pointer: section 34.6.
4. Confirm that the set is not a retrieval benchmark wearing RAG clothing. A task the generator answers closed-book measures nothing about retrieval.

**Why**

This phase fixes the intended behavior, evaluation population, label process, and contamination checks before metric selection.

**Failure without it**

A metric can reward the wrong behavior. Contamination or closed-book solvability can make retrieval look useful when it was not tested.

**Cost and complexity**

The source requires three hand-worked real queries and a documented judgment set. It gives no fixed dataset size.

#### Retrieval layer

**What**

1. Report Recall@k′ at the actual retrieval depth and nDCG@k at the depth given to the generator. Report both because they answer different questions. Source pointer: section 32.2.
2. Run the ceiling check. Measure end-to-end accuracy with a perfect retriever. This number bounds every downstream improvement.
3. If an LLM judges relevance, report its agreement with human labels on a sample. Macro-average agreement across classes. Source pointer: section 32.3.

**Why**

The layer needs a candidate-recall measure, a ranked-relevance measure, a downstream ceiling, and a calibrated judge.

**Failure without it**

One retrieval metric can hide the other question. An unvalidated model judge can make the dashboard unreliable.

**Cost and complexity**

The source requires exact-search comparison on held-out data, a perfect-retriever run, and a human-agreement sample when an LLM judges relevance.

#### Generation layer

**What**

1. Report faithfulness and factuality separately. An answer can be perfectly faithful to a wrong document. Source pointer: section 33.1.
2. Decompose answers into claims rather than scoring whole answers. Report the unverifiable-claim fraction. Source pointer: section 33.3.
3. Report abstention rate and accuracy conditioned on answering. A system that refuses more may look better on precision and perform worse in production.
4. Check length dependence. Error rates that vary with answer length invalidate cross-system comparisons. Source pointer: section 33.5.

**Why**

These measures separate evidence use, truth, unsupported claims, coverage, and answer-length effects.

**Failure without it**

A wrong source can look faithful, refusals can inflate precision, and different answer lengths can invalidate comparisons.

**Cost and complexity**

Claim-level scoring adds decomposition work. Conditional accuracy must be paired with abstention rate, and length must be checked across systems.

#### System layer

**What**

1. Attribute a sample of failures to the owning one of the five retrieval decisions. Source pointer: section 34.1.
2. Show macro, micro, and mezzo views. One end-to-end number cannot localize failure. Source pointer: section 34.2.
3. Run the remove-the-evidence ablation to confirm that the system uses retrieval. Source pointer: section 34.4.
4. Run the closed-book baseline, gold-context ceiling, and shuffled-context control.
5. Measure system properties beyond quality. Include latency at a percentile, self-consistency across repeated runs, and robustness to a corrupted document. Source pointer: section 34.5.

**Why**

System-level tests connect headline quality to stages, evidence use, baselines, ceilings, controls, latency, stability, and robustness.

**Failure without it**

A quality drop stays unlocalized. The system may ignore retrieval, and one average can hide unstable or fragile behavior.

**Cost and complexity**

The checklist adds three sanity cases, one ablation, repeated runs, percentile latency, and a corrupted-document test.

#### C.3 exit criteria

**What**

1. Given a two-point drop, name the responsible stage within one working day.
2. Give every headline number a stated denominator.
3. Put the closed-book baseline on the same chart as the RAG number.

**Why**

These gates test localization speed, measurement transparency, and retrieval value.

**Failure without it**

The dashboard cannot assign a quality drop, explain its population, or show improvement over no retrieval.

**Cost and complexity**

The stated diagnostic service level is one working day for a two-point drop.

### C.4 The Credibility and Robustness Checklist

Retrieval places text the team did not write into a context the model treats as authoritative. This checklist covers unreliable sources, hostile sources, and sources that disagree. The source develops it across chapters 35 and 36.

#### Source quality

**What**

1. For any answer, name the store that supplied each retrieved chunk. If this is impossible, later controls are not enforceable.
2. Give each source a reliability signal. Derive it from cross-source agreement, editorial provenance, or update recency rather than assigning it by hand once. Source pointer: section 35.3.
3. State what happens when one retrieved document contradicts the other k - 1. Name the mechanism, not the intention. Source pointer: section 35.2.
4. Represent temporal validity. A document that was correct in 2021 but is retrieved today can create a factual error with a citation. Source pointer: section 35.7.
5. Check for credibility laundering. A low-quality claim may gain authority by being quoted in a high-quality source.

**Why**

Source identity, evidence-based reliability, conflict handling, time validity, and laundering checks control what the model treats as authoritative.

**Failure without it**

Controls cannot be enforced by source. One contradiction, stale fact, or laundered claim can become a confident cited answer.

**Cost and complexity**

The checklist requires a reliability signal per source and a concrete contradiction mechanism. It gives no fixed numeric threshold.

#### Attribution

**What**

1. State whether citations are produced with the answer or attached afterward. If they are attached afterward, do not describe the system as grounded. Source pointer: section 31.3.
2. Measure attribution quality on a sample against the attributable, extrapolatory, and contradictory taxonomy. Source pointer: section 31.4.
3. If an automatic judge scores attribution, measure its agreement with humans. Source pointer: section 31.5.

**Why**

Citation timing, claim categories, and judge agreement determine what the system can honestly claim about grounding.

**Failure without it**

Product language can overstate post-hoc citations. An automatic score can look precise without known human agreement.

**Cost and complexity**

The source requires a human-scored sample for attribution and a human-agreement check for any automatic judge. It gives no fixed sample size.

#### Adversarial surface

**What**

1. Name everyone who can write to the datastore. Every writer is a potential prompt injector. Source pointer: section 36.4.
2. Structurally separate retrieved text from prompt instructions. State in the system prompt that retrieved content is data, not instruction.
3. Measure the blast radius of one poisoned chunk rather than assuming it. Source pointer: section 36.5.
4. Authenticate ingestion. Content credentials cover media provenance. Missing credentials are common and need a policy. Source pointer: section 36.3.
5. Red-team the retrieval path specifically rather than testing only the model. Source pointer: section 36.6.

**Why**

These checks cover write authority, instruction boundaries, single-document impact, provenance, and retrieval-specific attacks.

**Failure without it**

Untrusted content can act like an instruction. One poisoned chunk can have an unknown impact, and model-only tests can miss the retrieval path.

**Cost and complexity**

The source requires a measured one-chunk blast radius, authenticated ingestion policy, and a retrieval-specific red-team exercise.

#### Privacy and exposure

**What**

1. Identify content that the requesting user is not entitled to see. Enforce entitlement during retrieval rather than generation. Source pointer: section 36.8.
2. State whether the tenant boundary is a filter or a separate index. Filters fail open under bugs. Separate indexes fail closed. Source pointer: section 38.4.
3. Support end-to-end document removal. Include caches, derived summaries, and any graph.

**Why**

The retrieval layer must stop unauthorized evidence before it reaches the generator and must remove every derived copy.

**Failure without it**

Private content can enter context. A filter bug can expose another tenant, and deletion can leave cached or derived material behind.

**Cost and complexity**

Separate indexes fail closed but require a separate boundary. Removal spans the datastore, caches, summaries, and graphs.

#### C.4 exit criteria

**What**

1. State the worst effect one attacker-controlled document can cause.
2. Support document removal as an operation with a measured completion time.
3. Keep product grounding claims within what evaluation demonstrates.

**Why**

These gates bound single-document harm, make deletion operational, and constrain product language.

**Failure without it**

The design cannot state its blast radius, complete removal, or defend its grounding claim.

**Cost and complexity**

Passing requires one bounded attacker-document outcome and one measured end-to-end removal time.

### C.5 The Latency and Cost Checklist

Run this checklist with a stopwatch on a real query rather than on a diagram. The source points to section 37.1 and section A.7 for stage arithmetic.

#### Build the budget

**What**

1. Write and measure five stages. They are query embedding, ANN search, reranking, prefill, and decode. Measure rather than estimate because most latency intuitions in this field are wrong by an order of magnitude.
2. Report the percentile that matters, usually p95 or p99, under production concurrency. A single-threaded median describes nothing.
3. Identify the dominant stage before proposing an optimization. In most text RAG systems, prefill plus decode dominates rather than search.
4. State time-to-first-token separately from total latency. Know which measure judges the product.

**Why**

The budget exposes each stage, the production tail, the dominant constraint, and the product-facing latency measure.

**Failure without it**

An estimate can miss by an order of magnitude. A median can hide the production tail, and an optimization can target the wrong stage.

**Cost and complexity**

The source requires five timed stages at production concurrency. It calls for p95 or p99 when that percentile matters.

#### Reduce it in the right order

**What**

1. Cut context before cutting stages. Prefill is quadratic in context length. Fewer documents can improve quality as well as latency. Source pointer: section 30.6.
2. Reuse the KV cache for retrieved chunks that repeat across queries. Source pointer: section 37.2.
3. Use a coarse-to-fine cascade so the expensive stage sees few candidates. Source pointer: section 37.6.
4. Overlap work that can overlap. Embedding and search can form a CPU and GPU pipeline. Source pointer: section 37.5.
5. Only then consider a smaller generator or cheaper index. Both trade quality.

**Why**

This order reduces avoidable work before replacing quality-bearing components.

**Failure without it**

The design can sacrifice quality while leaving context, repeated work, candidate count, and overlap opportunities untouched.

**Cost and complexity**

Context cutting changes prefill work. Cache reuse needs repeated chunks. Cascades and pipelines add serving coordination. Smaller generators and cheaper indexes trade quality.

#### Cost per query

**What**

1. Compute C_q across all five stages. Include the embedding call and vector store, not only generation tokens. Source pointer: section 37.8.
2. Separate indexing cost from query cost. Amortize indexing over refresh cadence. A graph build is a recurring capital expense. Source pointer: section 40.1.
3. Price the retrieval gate. Not retrieving is the cheapest available optimization and improves accuracy on part of the traffic. Source pointer: section 1.5.
4. For an agentic or iterative loop, state expected retrieval rounds and tail cost rather than only the mean. Source pointer: section 26.8.

**Why**

The calculation exposes full serving cost, recurring build cost, gate value, and multi-round tail cost.

**Failure without it**

Generation tokens can hide embedding, vector-store, indexing, and repeated-retrieval costs.

**Cost and complexity**

One derived C_q must cover five query stages. Indexing is amortized over refresh cadence, and iterative retrieval is priced at the tail as well as the expectation.

#### C.5 exit criteria

**What**

1. Name the dominant stage and its budget share as a percentage.
2. Derive one cost-per-query number with the stages broken out.
3. For every proposed optimization, name the constraint it addresses and what it trades away.

**Why**

These gates tie optimization to measured dominance, complete cost, and explicit trade-offs.

**Failure without it**

The design can optimize a minor stage, omit costs, or hide a quality sacrifice.

**Cost and complexity**

Passing requires one percentage, one staged cost-per-query total, and one constraint-and-trade-off statement per optimization.

## Diagrams

The source appendix contains zero figures and zero tables. No captioned source visual is recreated or invented here.

## Whiteboard pack

### What to draw

1. Draw one large box labeled "Design review."
2. Draw five cards inside it from left to right.
3. Label the cards "Retrieval," "Indexing," "Evaluation," "Credibility," and "Latency and cost."
4. Under Retrieval, write "size, gate, sources, search, presentation."
5. Under Indexing, write "memory, recall, churn, rebuild."
6. Under Evaluation, write "test set, retrieval, generation, system."
7. Under Credibility, write "sources, attribution, attacks, privacy."
8. Under Latency and cost, write "five stages, optimize, price."
9. Draw an arrow from every card to one bottom box labeled "Exit criteria."
10. Inside the bottom box, write "number or named choice."

### Spoken script

Appendix C turns a RAG design into five runnable cards. First, the retrieval card fixes scale, the retrieval gate, sources, search, and evidence presentation. The indexing card derives memory, recall, churn, and rebuild needs. The evaluation card proves the test set is valid and localizes failures across retrieval, generation, and the full system. The credibility card traces sources, tests attribution, bounds poisoned content, and enforces access. The latency card measures five stages on real traffic, then prices each query. Every card ends with exit criteria. If a line lacks a number or named choice, the design is not finished.

## Interview traps

### Probe 1: Why is "always retrieve" not a complete retrieval design?

Always-retrieve is an explicit gate with measured cost, not a neutral default. A complete answer also names the closed-book path, abstention behavior, controller-drift detection, sources, transformations, search depths, index target, filters, prompt placement, and attribution timing.

### Probe 2: Why can vector compression fail to solve capacity planning?

The checklist sizes vector bytes, index overhead, rebuild headroom, replication, payloads, and shards separately. Past roughly 30x vector compression, chunk text and filterable metadata can dominate, while graph structure remains incompressible.

### Probe 3: Why is one end-to-end quality number insufficient?

It cannot localize retrieval, generation, or system failure. The evaluation checklist pairs retrieval metrics, claim-level generation measures, abstention, stage attribution, macro, micro, and mezzo views, ablations, sanity controls, latency, consistency, and corrupted-document robustness.

### Probe 4: When is a cited answer still not safely grounded?

It can use a stale, contradictory, laundered, or attacker-controlled source. Citations attached after generation do not justify a grounding claim, so the design also needs claim-category evaluation, judge agreement, source identity, access enforcement, and end-to-end removal.

### Probe 5: Why not optimize search latency first?

Measure all five stages at the relevant production percentile before choosing a target. In most text RAG systems, prefill plus decode dominates, so the stated order cuts context, reuses cache, cascades candidates, and overlaps work before choosing a smaller generator or cheaper index that trades quality.

## Key numbers

| Number, threshold, or trade-off | Source commitment | Design meaning |
|---|---|---|
| 5 checklists | Retrieval, indexing and capacity, evaluation, credibility and robustness, latency and cost | The appendix covers five review surfaces |
| 1 interview checklist | Internalize the retrieval checklist | The other four primarily serve on-the-job design reviews |
| Under 2 minutes | Reasonable target for verbally reproducing the retrieval skeleton and sizing questions | Interview recall should be concise |
| 10 minutes | Total retrieval design checklist time | The checklist is a timed design round |
| 5 decisions | Size, retrieval timing, sources and transformations, search, presentation | Every decision needs an answer |
| 2 minutes per phase | Time for each of the five retrieval phases | Five equal phases fill the ten-minute checklist |
| At least 2 numeric decisions | Minimum numeric content in the C.1 exit criteria | Naming choices alone is insufficient |
| Corpus size versus query rate | Memory and compute are different sizing axes | Both must be stated |
| Minutes, hours, days | Three freshness scales | The source says they imply three different architectures |
| 2 latency measures | Time-to-first-token and total latency | The product must name which measure matters |
| Always retrieve versus a selective gate | Always retrieving has measured cost and is not a neutral default | State g(x) explicitly |
| Closed-book answer versus abstention | The no-retrieval path must name its behavior | Coverage is a design decision |
| Multiple stores versus one store | Multiple stores need a selection rule and disagreement behavior | Source routing cannot remain implicit |
| Semantic label versus corpus measurement | Semantic chunking needs evidence on the target corpus | A benchmark number does not answer the checklist line |
| Dense-only versus a lexical channel | Dense-only retrieval needs justification for long-tail and exact-match queries | Channel choice has query-specific risk |
| Hybrid retrieval | The design must state the fusion method and its constant | Combining channels adds a reproducibility requirement |
| k′, rerank depth, k | Retrieval candidates, reranked candidates, and generator chunks | The three depths must be stated separately |
| Recall target at named latency | Index recall and latency must be committed together | Neither metric stands alone |
| Metadata filters versus fallback | Filters need an over-filtering fallback | Filtering can remove too much evidence |
| Chunk size x k | Implied prefill token count | State this multiplication aloud |
| Generated attribution versus attached attribution | State whether citations are produced with the answer or added later | Timing changes what the system can claim |
| 2 indexes | Storage held during an in-place rebuild | Rebuild headroom must cover both |
| Compression versus measured recall | State resulting code size and measured recall cost | Do not assume the quality loss |
| Roughly 30x | Vector-compression point beyond which payload storage dominates | Compression does not remove text and metadata cost |
| Ceiling division | Total footprint divided by usable RAM per node, rounded up | This gives shard count |
| Exact-neighbor recall versus relevance judgments | The source says these measure different things | Use exact search for the recall target |
| Search-time, then build-time, then index family | Required order for fixing a recall shortfall | Try reversible controls before a rebuild or family change |
| In-place rebuild versus separate hot-swap | State where rebuilding happens | Query behavior during rebuild must also be tested |
| Full embedding migration | A model change invalidates every vector | The source allows no partial migration |
| 3 real queries | Hand-written correct-answer examples before metric selection | Evaluation starts from concrete intended behavior |
| Recall@k′ and nDCG@k | Two retrieval-layer measures that must both be reported | They answer different questions |
| 3 attribution classes | Attributable, extrapolatory, contradictory | Attribution quality is measured at claim level |
| Faithfulness versus factuality | Report them separately | A faithful answer can follow a wrong document |
| Abstention versus production coverage | Report abstention rate and accuracy conditioned on answering | More refusal can improve precision while worsening production behavior |
| Answer length versus error rate | Length-dependent errors invalidate cross-system comparison | Check length dependence |
| 3 evaluation views | Macro, micro, mezzo | One end-to-end number cannot localize failure |
| 3 sanity cases | Closed-book baseline, gold-context ceiling, shuffled-context control | They test retrieval value and context use |
| 2-point drop | Quality regression in the C.3 exit criterion | The system must localize its owning stage |
| 1 working day | Maximum localization time for that two-point drop | This is the evaluation diagnostic target |
| 2021 | Example year for a once-correct but now stale document | A citation does not repair temporal invalidity |
| k - 1 | Other documents contradicted by one retrieved document | The design must name a conflict mechanism |
| 1 poisoned chunk | Unit used for the blast-radius check | Security impact must be measured at single-document scale |
| 1 attacker-controlled document | Unit used in the C.4 exit criterion | The design must state its worst possible effect |
| Retrieval filter versus separate tenant index | Filters fail open under bugs, while separate indexes fail closed | State the tenant-boundary mechanism |
| 5 latency stages | Query embedding, ANN search, rerank, prefill, decode | Measure every stage on a real query |
| p95 or p99 | Usually relevant latency percentiles | Report the product-relevant tail at production concurrency |
| 1 order of magnitude | The source says most latency intuitions in this field are wrong by this amount | Measure instead of estimating |
| Quadratic prefill | Prefill cost as context length grows | Cut context before cutting stages |
| Context reduction before component replacement | First cut context, reuse cache, cascade candidates, and overlap work | Delay quality-bearing substitutions |
| Smaller generator or cheaper index | Both reduce cost and trade quality | Consider them only after earlier reductions |
| Query cost versus indexing cost | Separate the two and amortize indexing over refresh cadence | A graph build is a recurring capital expense |
| Expected rounds versus tail rounds | Price both for agentic or iterative retrieval | Mean cost alone misses the tail |
| 1 cost per query C_q | Derived total across all five stages | Break the total into its stage costs |
