# For Practicing Engineers

This unit maps the technical content of Retrieval-Augmented Generation (RAG)
to the decisions, failures, costs, and trade-offs that practicing engineers
face.

## TL;DR

- Use corpus size to reason about memory and query rate to reason about
  compute. Sizing from only one axis can starve the cluster on the other.
- When recall misses its target under a latency budget, tune search-time
  parameters first, build parameters second, and the index family last.
- Route each symptom to its relevant decision area, including retrieval,
  context use, citations, freshness, evaluation, and datastore safety.
- Diagnose a quality regression at the stage that moved. A single end-to-end
  score cannot identify which of five stages caused it.
- Do not assume retrieval or more context always helps. Retrieval flips roughly
  10% of otherwise-correct answers to wrong, and middle-position evidence
  remains less reliable in a longer window.
- Start with Chapters 30, 34, 17, and 37 for context use, system evaluation,
  vector-store operations, and latency and cost.
- Keep stable principles separate from volatile tools. Ask which constraint a
  new technique addresses and what it trades away.

## The story

Picture a RAG system as a factory line viewed from one control room. The corpus
fills the warehouse, while the query rate sets the conveyor speed. Those two
gauges load different resources. A manager who sizes the factory from only one
gauge builds a line that stalls on the other.

The control panel has three levels of intervention. Search-time knobs sit on the
panel and can change per request. Build knobs stop the line for a rebuild.
Replacing the index family changes the operating model of the factory itself.
Downstream, an answer passes through five stations. When output quality drops,
the engineer must find the station that moved instead of repairing the station
the team knows best.

The factory also receives outside material. Retrieved text can be unreliable or
hostile, so the intake path can place untrusted material inside a privileged
process. A longer workbench does not ensure that workers use evidence placed in
its middle. A label attached after production may be topically related without
proving where the answer came from. The book is the control-room manual. It
routes each symptom to the right chapter, shows the measured cost of optimistic
defaults, and ends every new-tool review with two checks: the constraint
addressed and the trade-off accepted.

## Decoder table

| Term | Meaning in this unit | Why it matters |
|---|---|---|
| RAG | Retrieval-Augmented Generation, evaluated by stage and as a whole | It anchors the system named throughout the engineering decision map. |
| Index | The search structure whose memory, build, freshness, and operational costs must be sized. | It anchors a term used in the engineering decision map. |
| Index memory arithmetic | The end-to-end calculation that turns corpus scale into index memory needs. | It anchors a term used in the engineering decision map. |
| Query rate | The workload axis that drives compute rather than corpus memory. | It anchors a term used in the engineering decision map. |
| Recall | Whether retrieval returns the needed material. It trades against latency and memory. | It anchors a term used in the engineering decision map. |
| Latency budget | The time constraint within which retrieval and the other system stages must operate. | It anchors a term used in the engineering decision map. |
| Search-time parameters | Per-request settings that should be tried first because they are reversible. | It anchors a term used in the engineering decision map. |
| Build parameters | Settings that should be tried second because changing them costs a rebuild. | It anchors a term used in the engineering decision map. |
| Index family | The underlying index choice. Changing it also changes the operational story. | It anchors a term used in the engineering decision map. |
| HNSW | Hierarchical Navigable Small World graph index | It anchors a graph-based index family in the engineering decision map. |
| IVF | Inverted File index | It anchors a partition-based index family in the engineering decision map. |
| Disk-resident index | An index family option that keeps the index on disk. | It anchors a term used in the engineering decision map. |
| Vocabulary mismatch | The case where user queries do not look like the documents they should retrieve. | It anchors a term used in the engineering decision map. |
| Query expansion and rewriting | A Chapter 24 route for vocabulary mismatch. | It anchors a term used in the engineering decision map. |
| doc2query | A Section 29.2 document-expansion route for vocabulary mismatch. | It anchors a term used in the engineering decision map. |
| Learned sparse model | A Section 21.1 model that expands implicitly. | It anchors a term used in the engineering decision map. |
| Hybrid lexical and dense channel | A retrieval design that combines lexical and dense results. | It anchors a term used in the engineering decision map. |
| RRF | Reciprocal Rank Fusion for lexical and dense channels | It identifies the rank-only fusion method in Section 21.6. |
| Context window | The generator input area where evidence position affects use. | It anchors a term used in the engineering decision map. |
| Top-k truncation | The decision about how many retrieved items to keep for context. | It anchors a term used in the engineering decision map. |
| U-curve | The measured pattern in which evidence at either end of context is used more reliably than evidence in the middle. | It anchors a term used in the engineering decision map. |
| Closed-book answer | An answer produced without retrieval. It can outperform a retrieval-augmented answer in a stated regime. | It anchors a term used in the engineering decision map. |
| Tombstone | The deletion mechanism discussed with freshness and graph degradation. | It anchors a term used in the engineering decision map. |
| Graph degradation | Index damage that can accumulate under deletion. | It anchors a term used in the engineering decision map. |
| Re-indexing | Rebuilding the index as the corpus changes. | It anchors a term used in the engineering decision map. |
| Sharding | A vector-store operating concern covered in Chapter 17. | It anchors a term used in the engineering decision map. |
| Replication | A vector-store operating concern covered in Chapter 17. | It anchors a term used in the engineering decision map. |
| Metadata filtering | A restriction on retrieval results that can silently empty a result set. | It anchors a term used in the engineering decision map. |
| Over-filtering | Applying metadata restrictions so strongly that useful results disappear. | It anchors a term used in the engineering decision map. |
| Reranking | Reordering retrieved candidates after retrieval. | It anchors a term used in the engineering decision map. |
| Rerank depth | How many candidates enter reranking, with a trade-off surface engineers must size. | It anchors a term used in the engineering decision map. |
| Engineering decision map | The source's two-column route from a live decision or problem to its primary chapters. | It anchors a term used in the engineering decision map. |
| Multi-hop retrieval | Retrieval that follows more than one step. | It anchors a term used in the engineering decision map. |
| Iterative retrieval | Retrieval that repeats as the system develops the answer. | It anchors a term used in the engineering decision map. |
| Grounding | Producing an answer from supporting retrieved material. | It anchors a term used in the engineering decision map. |
| Judgment set | The evaluation set named alongside retrieval metrics. | It anchors a term used in the engineering decision map. |
| Faithfulness | Whether an answer remains supported by its evidence. | It anchors a term used in the engineering decision map. |
| Macro -> micro -> mezzo | The Section 34.2 diagnostic sequence for attributing a regression. | It anchors a term used in the engineering decision map. |
| Remove-the-evidence ablation | The Section 34.4 diagnostic that tests behavior after evidence is removed. | It anchors a term used in the engineering decision map. |
| Adaptive gating | The decision about whether to retrieve for a query. The book treats it as the first design decision. | It anchors a term used in the engineering decision map. |
| High-popularity questions | The stated question regime where retrieval-augmented accuracy falls below closed-book accuracy. | It anchors a term used in the engineering decision map. |
| Learned controller | A router, retrieval gate, or confidence-triggered loop trained on a query distribution. | It anchors a term used in the engineering decision map. |
| Distribution shift | A change in query distribution that degrades learned controllers. | It anchors a term used in the engineering decision map. |
| Semantic chunking | A chunking method whose published benchmark advantage is tied here to manufactured topic discontinuities. | It anchors a term used in the engineering decision map. |
| Post-hoc citation | A citation added after generation. It shows topical similarity, not answer provenance. | It anchors a term used in the engineering decision map. |
| Indirect prompt injection | The threat created when retrieval places untrusted text into privileged context. | It anchors a term used in the engineering decision map. |
| Datastore poisoning | Hostile content written into the source that retrieval can expose to the system. | It anchors a term used in the engineering decision map. |
| Multi-tenancy | A Chapter 38 concern for serving multiple tenants. | It anchors a term used in the engineering decision map. |
| Residency | A Chapter 38 concern about where data or service state must remain. | It anchors a term used in the engineering decision map. |
| Federation | A Chapter 38 concern for routing across separated sources. | It anchors a term used in the engineering decision map. |
| PDF-shaped corpus | A Portable Document Format (PDF) corpus whose tables and layout need the Chapter 14 treatment | It routes layout-sensitive ingestion to the correct chapter. |
| LLM-based graph construction | Large language model (LLM) graph building whose million-document cost is compared with a vanilla vector index | It exposes the graph-construction cost decision. |
| Graph RAG | A graph-based retrieval design that must be justified by genuinely relational corpora. | It anchors a term used in the engineering decision map. |
| Static corpus | An index assumption that production workloads violate. | It anchors a term used in the engineering decision map. |
| RAG card | An Appendix D reporting template for what a system retrieves, how it was evaluated, and what it abstains on. | It anchors a term used in the engineering decision map. |
| Index datasheet | An Appendix D reporting template for what an index costs. | It anchors a term used in the engineering decision map. |
| Design checklist | An Appendix C artifact meant to be run during a design review. | It anchors a term used in the engineering decision map. |
| Cost per query | The stage-by-stage cost measure covered in Chapter 37. | It anchors a term used in the engineering decision map. |
| Stable layer | Geometry, arithmetic, token economics, and evaluation principles that the source says will not move. | It anchors a term used in the engineering decision map. |
| High-dimensional geometry | The geometry used to explain why exact search fails at scale. | It anchors a term used in the engineering decision map. |
| Exact search | The search approach that the stable layer says dies in high-dimensional space. | It anchors a term used in the engineering decision map. |
| Bandwidth arithmetic | The index calculation named alongside memory arithmetic. | It anchors a term used in the engineering decision map. |
| Token economics | The stable cost reasoning attached to token use. | It anchors a term used in the engineering decision map. |
| Volatile layer | Models, databases, frameworks, and rerankers that move every quarter. | It anchors a term used in the engineering decision map. |
| Orchestration framework | One volatile tool category that no book can track continuously. | It anchors a term used in the engineering decision map. |
| Constraint | The limitation a new technique claims to address. | It anchors a term used in the engineering decision map. |
| Trade-off | What the new technique gives up in exchange. | It anchors a term used in the engineering decision map. |
| k | The number of retrieved items kept for context. The source predicts this is probably the setting an engineer will change. | It anchors a term used in the engineering decision map. |
## Core mechanics

### 1. Engineering focus

#### What

The book uses interview questions as its organization, but almost none of its
technical content is interview-specific. It covers index-sizing arithmetic, the
trade-off surface behind rerank depth, and stage attribution for end-to-end
accuracy regressions.

#### Why

Engineers perform the same calculations on the job under the same constraints
and usually with less time. This unit maps chapters to the decisions they
actually face.

#### Failure without it

An engineer can mistake the book for interview preparation and miss its direct
use in planning, diagnosis, design review, and operations.

#### Stated cost

The source states a time constraint rather than a numeric price. On-the-job
decisions usually allow less time.

### 2. When to Reach for This Book

#### You are sizing an index and someone asks how many machines

- **What:** Start with Section 16.5 for end-to-end index memory arithmetic.
  Then use Section 41.1 to turn corpus size and query rate into a node count
  without guessing.
- **Why:** Corpus size and query rate drive different resources. Corpus size
  drives memory, while query rate drives compute.
- **Failure without it:** Sizing for the number the product team repeats in
  planning meetings can produce a cluster starved on the other axis.
- **Stated cost:** No numeric cost is stated. The operational cost is an
  underprovisioned resource axis.

#### Recall is short of target and you have a latency budget

- **What:** Chapter 15 presents the recall, latency, and memory triangle. Turn
  search-time parameters first, build parameters second, and the index family
  last. Section 15.6 gives the decision procedure.
- **Why:** Search-time parameters are reversible per request. Build parameters
  require a rebuild. An index-family change alters the operational story.
- **Failure without it:** The team can choose a costly and disruptive change
  before trying a reversible one.
- **Stated cost:** A build-parameter change costs a rebuild. An index-family
  change costs an operational redesign.

#### Your users' queries do not look like your documents

- **What:** Treat this as vocabulary mismatch. Four routes address it. Chapter
  24 covers query expansion and rewriting. Section 29.2 covers document
  expansion with doc2query. Section 21.1 covers implicit expansion with a
  learned sparse model. Section 21.6 covers a hybrid lexical and dense channel
  fused with RRF. Chapter 24 opens with the taxonomy for choosing among them.
- **Why:** The mismatch has separate fixes rather than one universal remedy.
- **Failure without it:** The team can apply the wrong class of fix to the
  mismatch.
- **Stated cost:** The four fixes have four different costs. This section does
  not assign numeric amounts to them.

#### The retrieved document is right and the answer is still wrong

- **What:** Start with Chapter 30. Context position is measurable, and a longer
  window does not fix the failure. Chapter 31 covers the case where the answer
  is right but its citation does not support it.
- **Why:** Correct retrieval does not guarantee correct evidence use or correct
  attribution.
- **Failure without it:** The team can keep changing retrieval even though the
  failure lives in context use, generation, or citation support.
- **Stated cost:** No numeric cost is stated. The source identifies wasted
  intervention at the wrong stage as the practical failure.

#### The index has to stay fresh and the corpus will not sit still

- **What:** Section 17.1 covers tombstones, graph degradation under deletion,
  and the point where a rebuild becomes cheaper than continued patching. Section
  41.2 works the entire freshness design as a drill.
- **Why:** A production corpus is not static.
- **Failure without it:** Deletion and continued patching can degrade the graph
  while the team avoids a rebuild that has become cheaper.
- **Stated cost:** The decision compares continued patching with rebuilding. No
  numeric threshold is stated here.

#### Quality dropped and nobody changed anything

- **What:** Use Chapter 34. A single end-to-end number cannot identify which of
  five stages moved. Apply the macro -> micro -> mezzo method from Section 34.2
  and the remove-the-evidence ablation from Section 34.4. Section 41.6 runs both
  on a complete example.
- **Why:** RAG must be diagnosed by stage rather than only end to end.
- **Failure without it:** Teams fix the stage they know best instead of the
  stage that moved.
- **Stated cost:** No numeric cost is stated. The cost is misdirected
  regression work.

#### Someone can write into your datastore

- **What:** Use Chapter 36. Indirect prompt injection is RAG's native threat
  model because retrieval places untrusted text into privileged context. Section
  36.5 covers poisoning. Chapter 35 covers unreliable rather than hostile
  documents.
- **Why:** Datastore write access creates a direct path from untrusted content
  to privileged context.
- **Failure without it:** The system can treat hostile or unreliable retrieved
  text as privileged input.
- **Stated cost:** No numeric cost is stated. The source frames this as a
  vulnerability boundary.

### 3. Chapter Map by Engineering Decision

#### What

Use the following map to route an engineering decision to its primary chapters.

| Decision or problem | Primary chapters |
|---|---|
| Whether to retrieve at all | Chapters 1 and 25 |
| Choosing chunk size and overlap | Chapter 13 |
| Tables, layout, and PDF-shaped corpora | Chapter 14 |
| Choosing an embedding model | Chapters 12 and 20 |
| Index family, including HNSW, IVF, and disk-resident | Chapter 15 |
| Compression and index memory | Chapter 16 and Section 41.1 |
| Freshness, deletion, and re-indexing | Chapter 17 and Section 41.2 |
| Metadata filtering and over-filtering | Sections 17.5 and 17.6 |
| Adding a lexical channel and hybrid fusion | Chapter 18 and Section 21.6 |
| Reranking and rerank depth | Chapter 22 |
| Query rewriting and conversational turns | Chapter 24 |
| Routing across multiple sources | Chapters 25 and 38 |
| Multi-hop and iterative retrieval | Chapter 26 |
| Fine-tuning the generator for grounding | Chapter 27 |
| Training or adapting the retriever | Chapter 28 |
| Manufacturing retrieval training data | Chapter 29 |
| Context ordering and top-k truncation | Chapter 30 |
| Citations and attribution | Chapter 31 |
| Retrieval metrics and judgment sets | Chapter 32 |
| Faithfulness and answer-quality metrics | Chapter 33 |
| Attributing a regression to a stage | Chapter 34 |
| Conflicting or unreliable sources | Chapter 35 |
| Prompt injection and datastore poisoning | Chapter 36 |
| Latency budget and cost per query | Chapter 37 |
| Multi-tenancy, residency, and federation | Chapter 38 |
| Images, video, and non-text corpora | Chapter 39 |
| Entity-heavy and relation-heavy corpora | Chapter 40 |

#### Why

The map begins with the engineering problem rather than the book sequence. It
gives a direct path from a live decision to the relevant material.

#### Failure without it

An engineer must search the full chapter sequence instead of starting from the
problem at hand.

#### Stated cost

The map itself states no cost. Several routes point to cost-bearing decisions,
including index memory, rebuilds, rerank depth, latency, and cost per query.

### 4. If You Only Read Four Chapters

#### Chapter 30, Lost in the Middle

- **What:** It challenges the reflex that filling the context window is free
  and therefore good.
- **Why:** The U-curve is measured. A longer window does not remove it. A
  regime exists in which a retrieval-augmented answer is worse than a
  closed-book answer.
- **Failure without it:** A team can keep increasing context when reducing k is
  the legitimate quality intervention.
- **Stated cost:** Filling the window is not free. The source predicts that k
  is probably the one setting an engineer will change after reading the book.

#### Chapter 34, Evaluating the System

- **What:** It provides a mechanical method for locating the cause of a
  regression in exactly one of five stages.
- **Why:** A drop in answer accuracy is a symptom, not a stage diagnosis.
- **Failure without it:** Teams repair the stage they are most comfortable
  with.
- **Stated cost:** The chapter pays for itself the first time something
  regresses.

#### Chapter 17, Operating a Vector Store

- **What:** It removes the static-corpus assumption behind the index
  derivations in Chapter 15. It covers tombstones, graph degradation, sharding,
  replication, metadata filtering that silently empties a result set, and the
  fact that no vector database wins on every axis.
- **Why:** Production never has a static corpus.
- **Failure without it:** Static-corpus reasoning misses the operational
  effects of change.
- **Stated cost:** The chapter makes the cost of the static-corpus assumption
  explicit through deletion, degradation, distribution, filtering, and rebuild
  concerns.

#### Chapter 37, Latency, Cost, and Systems

- **What:** It shows where milliseconds and dollars go, stage by stage.
- **Why:** Most latency intuitions are wrong by an order of magnitude in one
  direction or the other.
- **Failure without it:** The team can watch the wrong component while another
  dominates cost per query.
- **Stated cost:** Cost per query is usually dominated by a component the team
  is not watching.

### 5. Where This Book Disagrees with the Consensus

#### What

The book treats retrieval folklore as unusually optimistic. It attaches
measurements to positions that cut against that folklore so engineers can check
them.

| Position | Why it matters | Failure without it | Stated cost |
|---|---|---|---|
| Retrieval is not a free improvement | Section 1.5 reports that it flips roughly 10% of otherwise-correct answers to wrong. On high-popularity questions, retrieval-augmented accuracy falls below closed-book accuracy. | "Always retrieve" becomes an unexamined default. Adaptive gating is deferred even though it is decision one in Section 25.1. | Retrieval has a measured accuracy cost rather than a neutral effect. |
| More context is not better | Evidence in the middle is used less reliably than evidence at either end. Sections 30.1 to 30.3 show that a longer window does not fix this. | A team treats retrieving fewer documents as only a cost compromise. | Section 30.6 treats fewer documents as a quality intervention. |
| Semantic chunking's benchmark advantage mostly does not transfer | Section 13.6 explains that published gains come from corpora made by stitching unrelated documents together. That construction manufactures the topic discontinuities the method detects. | A team assumes those gains transfer to its corpus even when its corpus lacks those discontinuities. | No numeric cost is stated. The benchmark advantage can fail to transfer. |
| Post-hoc citations are close to worthless as grounding evidence | Section 31.3 explains that a citation added after generation identifies topical similarity, not the document from which the answer came. | A team mistakes topical similarity for attribution. | If attribution matters, it must be built into answer production. |
| Every learned controller shares one weakness | Section 25.7 explains that routers, retrieval gates, and confidence-triggered loops train on a query distribution and degrade when that distribution shifts. | A team budgets for building the controller but not for detecting distribution shift. | Distribution-shift detection needs its own budget. |
| A graph has to earn its place | Section 40.1 shows that Graph RAG fits genuinely relational corpora. | A team applies graph construction where relationships do not justify it. | LLM-based graph construction over a million-document corpus can cost about 475 times the build cost of a vanilla vector index before any query runs. |

#### Why

Each disagreement converts an optimistic default into a decision with a
measurable failure mode or explicit trade-off.

#### Failure without it

Teams can always retrieve, always add context, trust benchmark gains, attach
citations after generation, ignore query shift, or build a graph without testing
whether the corpus justifies those choices.

#### Stated cost

The source gives two explicit magnitudes. Retrieval flips roughly 10% of
otherwise-correct answers to wrong. Million-document LLM-based graph
construction can cost about 475 times a vanilla vector-index build.

### 6. Artifacts You Can Take to Work

#### What

Appendix C provides design checklists for retrieval, indexing, evaluation,
credibility, and latency. They are written for use in a design review rather
than passive reading.

Appendix D provides the RAG card and index datasheet. These reporting templates
state what a system retrieves from, how it was evaluated, what it abstains on,
and what its index costs.

#### Why

Retrieval systems pass between teams more often than they are rewritten. A new
owner's questions are predictable enough to answer in advance.

#### Failure without it

A handoff can omit the system's sources, evaluation boundary, abstention
behavior, or index cost.

#### Stated cost

No numeric cost is stated. The artifacts reduce repeated ownership questions and
missing handoff information.

### 7. Staying Current

#### What

The stable layer is smaller than it looks, and the book focuses on it. It
includes high-dimensional geometry and why exact search dies in it, index memory
and bandwidth arithmetic, token economics, and the requirement to evaluate
retrieval and generation separately and then together. The source says this
layer will not move.

The volatile layer includes embedding models, vector databases, orchestration
frameworks, and the current best reranker. It moves every quarter, and no book
can track it.

#### Why

When a new technique appears, ask two questions. Which constraint does it
address? What does it trade away?

#### Failure without it

A technique that cannot answer the trade-off question has not been measured
properly yet.

#### Stated cost

No numeric cost is stated. The volatile layer requires recurring evaluation
because it changes every quarter.

## Diagrams

The manifest records zero numbered figures and zero numbered tables for this
unit. Page xxiv contains one unnumbered, two-column engineering decision map,
reproduced above as Markdown. It has no number or caption, so the manifest count
remains 0/0.

## Whiteboard pack

### Numbered draw order

1. Draw two input gauges labeled `corpus size -> memory` and
   `query rate -> compute` .
2. Draw a three-step knob ladder labeled `search time` , `build` , and
   `index family` .
3. Mark the costs beside the ladder as `reversible per request` , `rebuild` ,
   and `operational change` .
4. Draw a five-stage horizontal line and circle one unknown stage as the
   regression source.
5. Under the line, draw a U-curve with `context start` , `middle` , and
   `context end` .
6. Add an intake arrow labeled `untrusted retrieved text -> privileged context`
   .
7. Finish with two review questions labeled `constraint addressed?` and
   `trade-off accepted?` .

### 90 to 100 word script

Start with two dials because corpus size and query rate load different
resources. Then draw the three-knob ladder. Search-time settings come first
because each request can reverse them. Build settings come second because they
require a rebuild. Index family comes last because it changes operations. Next,
trace one answer through the five-stage line and circle the stage that moved.
Add the context U-curve to show why a longer window does not cure
middle-position loss. Finish with the safety gate. Retrieved text is untrusted,
citations must support claims, and every new technique must name its constraint
and trade-off.

## Interview traps

### 1. Why not make retrieval the default for every query?

Retrieval is not neutral. It flips roughly 10% of otherwise-correct answers to
wrong, and retrieval-augmented accuracy is below closed-book accuracy on
high-popularity questions. Adaptive gating is the first design decision, not a
later optimization.

### 2. If evidence is lost in the middle, why not use a longer context window?

A longer window does not remove the measured U-curve. Evidence in the middle
remains less reliably used than evidence at either end. Retrieving fewer
documents can improve quality.

### 3. What should you tune when recall misses its target under a latency budget?

Tune search-time parameters first because they are reversible per request. Tune
build parameters second because they require a rebuild. Change the index family
last because it changes the operational story.

### 4. Why is a post-hoc citation weak grounding evidence?

It identifies a document that is topically similar to the answer, not
necessarily the document from which the answer came. If attribution matters,
build it into answer production.

### 5. How do you diagnose a quality drop when nobody changed the system?

Do not rely on one end-to-end number. Find which of five stages moved with the
macro -> micro -> mezzo method and the remove-the-evidence ablation. Repair the
stage that moved rather than the stage the team knows best.

## Key numbers

| Number | Meaning |
|---|---|
| 7 reach cases | The source routes seven recurring engineering situations to specific chapters and sections. |
| 27 decision rows | The engineering decision map contains 27 problem-to-chapter mappings. |
| 4 fixes | Vocabulary mismatch has four routes with four different costs. |
| 5 stages | A single end-to-end score cannot identify which stage caused a quality regression. |
| 4 chapters | The recommended short path is Chapters 30, 34, 17, and 37. |
| 6 disagreements | The source gives six positions that cut against optimistic retrieval folklore. |
| Roughly 10% | Retrieval flips roughly this share of otherwise-correct answers to wrong. |
| Decision 1 | Adaptive gating is the first design decision rather than a later optimization. |
| 1 order of magnitude | Most latency intuitions are wrong by this amount in one direction or the other. |
| 1 million documents | The stated corpus scale for the graph-construction cost comparison. |
| About 475 times | LLM-based graph construction can cost this much relative to building a vanilla vector index before any query runs. |
| 5 checklist areas | Appendix C covers retrieval, indexing, evaluation, credibility, and latency. |
| 2 reporting templates | Appendix D provides the RAG card and the index datasheet. |
| 2 stages, then 1 system | Retrieval and generation must be evaluated separately and then together. |
| 2 review questions | Ask which constraint a new technique addresses and what it trades away. |
| Every quarter | The volatile layer of models, databases, frameworks, and rerankers changes at this cadence. |
