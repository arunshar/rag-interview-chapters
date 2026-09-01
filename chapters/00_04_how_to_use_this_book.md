# 00.04 How to Use This Book

This unit explains how to choose a reading route, use the book's recurring
section structure, interpret its interview tags and references, and turn its
appendices into preparation tools.

## TL;DR

- The book supports three uses: interview preparation, on-the-job reference,
  and systematic study of retrieval-augmented generation (RAG) systems.
- Read linearly when starting from scratch. Use an ordered targeted path for a
  specific role or a specific knowledge gap.
- Part I is the only mandatory part. It establishes the parametric,
  non-parametric, and semi-parametric vocabulary plus the five-decision skeleton
  assumed later.
- Five targeted paths cover retrieval quality, vector infrastructure, product
  delivery, trust and safety, and training or advanced variants.
- If the interview is one week away, begin with Chapters 3 and 34, follow the
  stated short chapter sequence, then complete two timed design drills.
- Six cross-cutting threads connect topics that candidates often learn
  separately and are especially likely to prompt follow-up questions.
- The source calls the recurring section format a six-move structure, but it
  names seven elements. Preserve the stated label and use every named element.
  Difficulty tags test mechanism knowledge, derivation from constraints, or
  judgment under changed constraints. They do not describe reading difficulty.

## The story

Think of the book as a rail network. Part I is the central station. It gives
every traveler the shared vocabulary and the five-decision map needed to
understand later signs. A first-time traveler stays on the full line because
each part depends on stops that came before it.

A traveler with a specific destination chooses one of five ordered service
lines. One line serves retrieval and ranking quality. Another serves vector
search infrastructure. Three more reach product delivery, trust and safety, and
advanced training. The stops on each line are ordered, so skipping ahead can
leave the traveler without the connection that makes the next stop useful.

The one-week path is the express train. It starts with the answer skeleton and
failure attribution, then stops only at the listed core chapters and timed
drills. It deliberately passes the rest of the network. The tradeoff is
explicit: a partial map that supports reasoning is better than a complete map
produced by skimming.

Six cross-cutting threads act like transfer stations. The recurring section
format is the signage inside every station. The three difficulty tags identify
what kind of ticket an interview answer must carry. The appendices are the
station toolkit, with formulas, self-tests, checklists, reporting templates,
readings, notation, and terminology.

## Decoder table

| Source term | Plain meaning in this unit | How to use it |
|---|---|---|
| Interview preparation | One of the book's three intended uses | Choose a role path or the one-week path, then work the interview questions and drills. |
| On-the-job reference | One of the book's three intended uses | Open the relevant section and rely on its predictable internal structure. |
| Systematic study | One of the book's three intended uses | Read the parts in dependency order. |
| Linear reading order | Parts arranged by prerequisite | Use it when building the subject from scratch. |
| Part I | The RAG interview landscape | Read it before the other parts because it supplies shared vocabulary and the five-decision skeleton. |
| Five-decision skeleton | The organizing structure introduced in Part I and Chapter 3 | Use it as the frame on which later material hangs. |
| Targeted path | An ordered route for a role or knowledge gap | Read the selected path from top to bottom. |
| Path 1 | Retrieval and ranking quality | Use it for search-relevance and applied-science interviews focused on why the right document is not at rank 1. |
| Path 2 | Vector search and platform infrastructure | Use it for index ownership, capacity, recall, latency, and on-call concerns. |
| Path 3 | Shipping a RAG product | Use it for applied artificial intelligence (AI) and product-engineering interviews about the full loop and user-facing failures. |
| Path 4 | High-stakes, trust, and safety | Use it for regulated domains or questions about wrong or hostile retrieved documents. |
| Path 5 | Training the system and advanced variants | Use it for research-oriented interviews that move from component assembly to changing components. |
| One-week path | A deliberately narrow route for an interview next week | Follow its exact chapter order and timed drills, then skip everything else. |
| Adaptivity | The thread summarized as one size does not fit all | Start with Section 3.5 before following its later references. |
| Robustness as projection | A recurring robustness thread | Start with Section 27.3 before following its later references. |
| Model collapse or self-reinforcement | A recurring failure thread | Start with Section 11.3 before following its later references. |
| Out-of-distribution (OOD) fragility | The fragility of learned controllers outside their learned conditions | Start with Section 25.7 before following its later references. |
| Lost in the middle or positional bias | A recurring context-position thread | Start with Section 30.1 before following its later references. |
| Query <-> document as surrogates | A recurring relationship between query and document representations | Start with Section 29.1 before following its later references. |
| Motivation | The opening production setting for a section | Identify who asks the question, the cost of error, and why the obvious answer is insufficient. |
| Concept and derivation | The idea built from first principles | Track symbol definitions, units, the central claim, and the alternative that loses. |
| Italicized claim | Exactly one sentence per section that states the claim worth remembering | Use it as the section's memory anchor. |
| Alternative that loses | The defeated competitor named in a derivation | Use it to show judgment rather than a context-free design choice. |
| Figure | A pipeline, index structure, ranking funnel, decision tree, or comparison table | Read its caption for the takeaway and use shape or line style rather than hue when reproducing it. |
| Worked Example | A numeric end-to-end instance | Recalculate it, carry the units, and check its final sanity comparison. |
| What You Actually Decide in Practice | Four to six decisions with defaults and deviation triggers | Use it to move from discussion to shipping judgment. |
| How This Shows Up in Interviews | Three questions in increasing difficulty with answer-shape guidance | Practice what to say first, what to derive, and which follow-up to expect. |
| Key Takeaways | Four to six standalone lines | Use them to recover the chapter's argument, including at least one worked-example number. |
| `[core]` | A mechanism test | Treat it as expected knowledge for anyone who claims RAG experience. |
| `[senior]` | A derivation test | Produce a number from stated constraints rather than memory. |
| `[staff]` | A judgment test under changed constraints or team disagreement | Price both options, concede the other side's valid point, and state the reversal condition. |
| Question typography | Interview questions appear in italics inside quotation marks | Recognize these as practice prompts. |
| Notes and remarks | Sparse boxed material for misconceptions, version caveats, or edge cases | Do not treat a box as optional if you need the main argument, because main dependencies are never placed there. |
| Source attribution | Author and year placed in the prose | Use Appendix E for the collected source list. |
| Cross-reference | A pointer to a specific section when possible | Follow it to the derivation instead of searching a full chapter. |
| Appendix A | Formula collection for BM25, reciprocal rank fusion (RRF), mean reciprocal rank (MRR), normalized discounted cumulative gain (nDCG), modularity, product quantization (PQ) sizing, floating-point operations (FLOPs), and index memory | Keep it nearby during active preparation, then re-derive formulas if it remains necessary after two weeks. |
| Appendix B | Difficulty-organized question bank with answers separated | Use it for self-testing without seeing the answer directly below the question. |
| Appendix C | Retrieval, indexing, evaluation, credibility, and latency checklists | Internalize the retrieval checklist until it can be spoken in under two minutes. |
| Appendix D | RAG card and index datasheet templates | Use them as reporting standards and as an answer about handoff to the next team. |
| Appendix E | Annotated reading list keyed to chapters | Use it to locate the sources attributed in the prose. |
| Appendix F | Notation table | Use it as a compact symbol reference. |
| Appendix G | Glossary | Use it when one idea appears under several names. |
| BM25 | A retrieval topic derived in Chapter 18 and a formula collected in Appendix A | Study why saturation and length normalization exist, then use the formula reference when needed. |
| Dense passage retrieval (DPR) | A Chapter 20 topic paired with bi-encoders and hard negatives | Study it on the retrieval and ranking quality path. |
| Sparse lexical and expansion model (SPLADE) | A Chapter 21 topic | Study it with ColBERT and hybrid fusion. |
| ColBERT | A Chapter 21 topic | Study it with SPLADE and hybrid fusion. |
| Reciprocal rank fusion (RRF) | The named hybrid-fusion method in Chapter 21 and a formula in Appendix A | Study it on Path 1 and use Appendix A as its formula reference. |
| Hypothetical document embeddings (HyDE) | A Chapter 24 query-reformulation topic | Study it after reranking on Path 1. |
| Mean reciprocal rank (MRR) | A Chapter 32 metric and Appendix A formula | Derive it rather than merely quoting it. |
| Normalized discounted cumulative gain (nDCG) | A Chapter 32 metric and Appendix A formula | Derive it rather than merely quoting it. |
| Recall at k | A Chapter 32 metric | Derive it rather than merely quoting it. |
| Hierarchical navigable small world (HNSW) | A Chapter 15 index topic derived from a skip list | Study it with inverted file indexing and the recall, latency, and memory tradeoff. |
| Inverted file (IVF) | A Chapter 15 index topic | Study it with HNSW. |
| Product quantization (PQ) | A Chapter 16 memory topic and Appendix A sizing formula | Work its index-memory arithmetic end to end. |
| Key-value (KV) cache | A Chapter 37 latency and reuse topic | Study where milliseconds go and how cost per query is formed. |
| Queries per second (QPS) | The rate unit in the 100 million document design drill | Use the stated 500 QPS constraint in first-principles sizing. |
| SILO argument | The source's named privacy and copyright argument | Study its case for keeping risk in the datastore. The source does not expand the name in this unit. |
| Retrieval-augmented fine-tuning (RAFT) | A Chapter 27 generator-training topic | Study it with robustness to retrieval defects. |
| Fusion-in-Decoder (FiD) | A Chapter 28 advanced-variant topic | Study it with the four quadrants, REPLUG, and language-model-supervised retrieval. |
| REPLUG | A Chapter 28 advanced-variant topic | Study it with FiD and language-model-supervised retrieval. |
| Language model (LM)-supervised retrieval | A Chapter 28 training topic | Study it on the advanced-variants path. |
| Reinforcement learning (RL) for search | A Chapter 26 agentic-retrieval topic | Study it with iterative and recursive retrieval. |
| Floating-point operations (FLOPs) | One of the formulas collected in Appendix A | Use Appendix A as the reference during active preparation. |

## Core mechanics

### Opening use model

| Lens | Detail |
|---|---|
| What | Choose among interview preparation, on-the-job reference, and systematic study. Read linearly from scratch or follow a targeted route for a role or gap. |
| Why | The choice aligns the amount and order of reading with the reader's goal. |
| Failure without it | A reader can skim too broadly or enter a later topic without the vocabulary it assumes. |
| Stated cost or tradeoff | Linear reading covers dependencies but takes the full route. Targeted reading narrows the route but must still preserve its stated order. |

### Linear Reading Order

The parts are ordered by dependency. Each part assumes vocabulary developed in
prior parts.

| Part | Topic | Prerequisite |
|---|---|---|
| I | The RAG interview landscape | None |
| II | The generator side | None |
| III | Prompting and context construction | Part II |
| IV | Representing what you retrieve | Part II |
| V | Indexing and vector search | Part IV |
| VI | Retrieval and ranking | Parts IV and V |
| VII | Query understanding and control flow | Parts II and VI |
| VIII | Training the RAG system | Parts II and VI |
| IX | Generation and context assembly | Parts II, III, and VI |
| X | Evaluation | Parts VI and IX |
| XI | Trust, credibility, and adversarial robustness | Parts VI, IX, and X |
| XII | Scaling, advanced variants, and design drills | All prior parts |

| Lens | Detail |
|---|---|
| What | Follow the part dependencies from the RAG landscape through scaling and design drills. |
| Why | Later parts assume earlier vocabulary and concepts. Part I uniquely supplies the shared parametric, non-parametric, and semi-parametric vocabulary plus the five-decision skeleton. |
| Failure without it | Later material can appear disconnected because the reader lacks the terms and organizing skeleton the writing assumes. |
| Stated cost or tradeoff | Part I is mandatory. Other prerequisites vary by part, and Part XII requires all prior parts. |

### Targeted Reading Paths

Every path is ordered rather than ranked. Read the selected path from top to
bottom. Each starts at or near Chapter 3 because the later material hangs on the
five decisions.

#### Path 1: Retrieval and Ranking Quality

Use this path for search-relevance and applied-science roles where the interview
asks why the right document is not at rank 1.

1. Chapter 3, including Section 3.4 for sizing before design.
2. Chapter 12 on sparse versus dense retrieval and sentence-embedding contents.
3. Chapter 13 on chunking, granularity, and whether semantic chunking pays in
   Section 13.6.
4. Chapter 18 on BM25, saturation, and length normalization.
5. Chapter 20 on bi-encoders, DPR, and hard negatives.
6. Chapter 21 on SPLADE, ColBERT, and hybrid fusion with RRF.
7. Chapter 22 on reranking, cross-encoders, and rerank depth.
8. Chapter 24 on query reformulation and HyDE.
9. Chapter 32 on deriving MRR, nDCG, and recall at k.
10. Section 41.4, the multi-hop question-answering drill.

#### Path 2: Vector Search and Platform Infrastructure

Use this path for roles that own index capacity, recall targets, latency
budgets, and the on-call pager.

1. Chapter 3, Section 3.4, on sizing before design.
2. Chapter 15 on HNSW from a skip list, IVF, and the recall, latency, and
   memory tradeoff.
3. Chapter 16 on product quantization and end-to-end index-memory arithmetic.
4. Chapter 17 on tombstones, sharding, metadata, and over-filtering risk.
5. Chapter 37 on latency placement, KV-cache reuse, and cost per query.
6. Chapter 38 on federated search, source selection, and data residency.
7. Section 41.1, sizing 100 million documents at 500 QPS from first principles.
8. Section 41.2, a system that must stay fresh.

#### Path 3: Shipping a RAG Product

Use this path for applied-AI and product-engineering roles where the interview
covers the whole loop and failures users encounter.

1. Chapters 1 and 3 on what is tested and the answer skeleton.
2. Chapter 4 on hallucination taxonomy and five causes of factual error.
3. Chapter 9 on RAG prompting and Section 9.4 on why retrieving more can cause
   more hallucination.
4. Chapter 11 on abstention and calibration.
5. Chapter 13 on chunking and granularity.
6. Chapter 25 on when to retrieve, where to retrieve, and adaptive routing.
7. Chapter 30 on lost in the middle and why a longer context window does not
   fix it.
8. Chapter 31 on attribution and citation.
9. Chapters 33 and 34 on generation evaluation and stage-level regression
   attribution.
10. Section 41.6, debugging a RAG system that became worse.

#### Path 4: High-Stakes, Trust, and Safety

Use this path for regulated domains and for questions about a retrieved document
that is wrong or hostile.

1. Chapter 4 on what the model brings and what it breaks.
2. Chapter 5 on privacy, copyright, and the SILO argument for keeping risk in
   the datastore.
3. Chapter 11 on when the system should refuse and how each abstention
   mechanism fails.
4. Chapter 31 on attribution as the core promise of RAG and post-hoc citation
   as a false promise.
5. Chapter 35 on source credibility, one bad document among many good ones, and
   pluralism.
6. Chapter 36 on provenance, indirect prompt injection, and datastore
   poisoning.
7. Section 41.3, high-stakes RAG in medicine and law.
8. Section 41.7, retrofitting credibility onto an already shipped pipeline.

#### Path 5: Training the System and Advanced Variants

Use this path for research-oriented roles where the interview moves beyond
assembling components and asks how to change them.

1. Chapters 6 and 7 on retrieval versus parameters and the in-context-learning
   mechanism.
2. Chapter 8 on circuits, induction heads, and the limits of interpretability
   claims.
3. Chapter 27 on generator fine-tuning, RAFT, and robustness to retrieval
   defects.
4. Chapter 28 on the four quadrants, FiD, REPLUG, and LM-supervised retrieval.
5. Chapter 29 on bootstrapping training data and the teacher ceiling.
6. Chapter 23 on generative retrieval and its unresolved tension with RAG.
7. Chapter 26 on iterative, recursive, and agentic retrieval, including RL for
   search.
8. Chapters 39 and 40 on multimodal RAG and graph RAG.

| Lens | Detail |
|---|---|
| What | Select one of five role-focused routes and keep its listed order. |
| Why | The paths concentrate preparation around the kind of judgment a role is likely to test. |
| Failure without it | Treating a path as a ranked menu can remove the setup needed by later stops. |
| Stated cost or tradeoff | Focus increases relevance but omits material outside the chosen route. The path order remains binding. |

### The One-Week Path

1. Read Chapter 3 first for the answer skeleton.
2. Read Chapter 34 second for attributing a failure to a stage.
3. Read Chapters 1, 15, 18, 22, 25, 30, and 32 in that order.
4. Work Sections 41.1 and 41.6 as timed drills.
5. Skip everything else.

| Lens | Detail |
|---|---|
| What | Use the source's express sequence when the interview is next week. |
| Why | It prioritizes an answer frame, a debugging frame, core mechanisms, metrics, and two design drills. |
| Failure without it | Broad skimming can produce a complete-looking map that the candidate cannot reason from. |
| Stated cost or tradeoff | The route is intentionally partial. The source prefers a partial map that supports reasoning over a complete map built by skimming. |

### The Cross-Cutting Threads

Each idea is introduced once in full, then cross-referenced rather than
re-explained.

| Thread | Introduced | Recurs in |
|---|---|---|
| Adaptivity, one size does not fit all | 3.5 | 13.3, 25.1-25.6, 26.4, 35.6, 39.4 |
| Robustness as projection | 27.3 | 5.4, 7.4, 11.3, 20.3, 39.2 |
| Model collapse or self-reinforcement | 11.3 | 26.6, 29.7, 34.6, 35.4 |
| OOD fragility of learned controllers | 25.7 | 26.5, 34.1, 35.6, 38.3 |
| Lost in the middle or positional bias | 30.1 | 22.5, 30.6, 39.9, 40.7 |
| Query <-> document as surrogates | 29.1 | 21.1, 23.4, 24.6, 32.1 |

| Lens | Detail |
|---|---|
| What | Follow the introducing section whenever a later section names a thread without explaining it. |
| Why | The design avoids repeating full explanations and exposes connections across separately learned topics. |
| Failure without it | A reader can mistake a cross-reference for an unsupported claim or miss the shared idea that links chapters. |
| Stated cost or tradeoff | The reader must move back to the introducing section. The benefit is less repetition and stronger conceptual connection. These six ideas are especially likely to earn interview follow-ups. |

### Conventions in Every Section

The source says all 247 sections follow the same six-move structure. It then
names seven recurring elements. This unit preserves both statements rather than
silently changing the count.

| Named element | What it contains | Why it exists | Failure without active use | Stated cost or requirement |
|---|---|---|---|---|
| Motivation | Two paragraphs about who asks, production cost, and why the obvious answer is insufficient | Places the reader in the room | The reader can know a term without knowing when or why it matters | It explicitly includes the production cost of getting the issue wrong |
| Concept and derivation | First-principles construction, symbol definitions, units, one italicized claim, and the defeated alternative | Teaches both mechanism and judgment | A choice without its losing alternative teaches nothing about judgment | Carry units through arithmetic and retain exactly one memory claim |
| A figure | At least one pipeline, index structure, ranking funnel, decision tree, or comparison table | Makes structure visible and printable in grayscale | A color-dependent or content-only rendering can hide the intended takeaway | Vary shape and line style rather than hue. The caption states the takeaway |
| A Worked Example | A numeric end-to-end instance with real configurations and orders of magnitude | Converts an idea into memory, latency, cost, or recall arithmetic | Passive reading is the single most common way to finish a chapter having learned nothing | Use a calculator and end with a sanity check against a published figure or known system |
| What You Actually Decide in Practice | Four to six decisions with defaults and triggers to deviate | Bridges discussion and shipping judgment | The reader can discuss a technique without being able to choose a default or departure condition | It is the part the source calls most directly useful on the job |
| How This Shows Up in Interviews | Three increasingly difficult questions with strong-answer shape | Trains ordering, derivation, and follow-up handling without supplying a recitation script | The candidate can memorize text without learning answer structure | At least one question explicitly contrasts a strong and weak answer |
| Key Takeaways | Four to six standalone lines, including at least one worked-example number | Preserves the chapter argument in compressed form | Skimming cannot recover the argument or its quantitative anchor | At least one line must carry a number from the worked example |

### Difficulty Tags

The tags describe what a question tests, not how hard it is to read.

| Tag | What it tests | Strong-answer shape | Failure consequence or weakness |
|---|---|---|---|
| `[core]` | Knowledge of the mechanism | Explain the mechanism directly | Failing one can end a phone screen for someone who claims RAG on a resume |
| `[senior]` | Ability to derive | Produce a number from a stated memory budget, latency budget, or recall target | A memorized number does not satisfy the tag |
| `[staff]` | Judgment under a changed constraint or a dispute between partly correct teams | Price options, concede the other side's real point, choose, and state the reversal condition | Taking a side without pricing or a reversal condition misses the judgment test |

### Typography and Cross-References

| Lens | Detail |
|---|---|
| What | Interview questions use italics inside quotation marks. Notes and remarks appear sparingly in boxes. Sources appear by author and year at the point where each claim is made. The book collects them in Appendix E. Cross-references point to specific sections when possible. |
| Why | The typography separates practice questions and caveats, while precise references route the reader to the actual derivation. |
| Failure without it | A reader can confuse a caveat with a dependency or search through an entire chapter for one derivation. |
| Stated cost or tradeoff | Boxes are reserved for misconceptions, version caveats, and edge cases. They never hold material required by the main argument. |

### Using the Appendices

| Appendix | What | Why | Failure without it | Stated cost or trigger |
|---|---|---|---|---|
| A | Formulas for BM25, RRF, MRR, nDCG, modularity, PQ sizing, FLOPs, and index memory | Supports active derivation work | Re-reading formulas can replace the derivation practice the book expects | Print it for active preparation. If still needed after two weeks, re-derive every formula from scratch |
| B | Question bank organized by difficulty with answers held separately | Enables genuine self-testing | Chapter questions reveal the strong answer directly below the prompt | Use it when testing what is actually known |
| C | Design checklists for retrieval, indexing, evaluation, credibility, and latency | Makes system checks reproducible | A candidate can omit a critical design dimension | Reproduce the retrieval checklist verbally in under two minutes |
| D | RAG card and index datasheet templates | Supplies reporting standards for a shipped system and a handoff answer | The next team may not know what the system does | Use the templates for systems actually shipped |
| E | Annotated reading list keyed to chapters | Collects prose attributions | Source follow-up becomes harder | Follow chapter keys to the attributed reading |
| F | Notation table in reference form | Centralizes symbols | Repeated symbol lookup interrupts derivation | Use it as a reference |
| G | Glossary | Reconciles a field where one idea can travel under four names | Terminology can make equivalent ideas look different | Use it when names differ |

## Diagrams

The manifest lists zero figures and zero tables for this unit. There are no
manifest captions to reproduce or normalize.

The source pages contain two unnumbered reference matrices. The part-dependency
matrix and the cross-cutting-thread matrix are preserved as Markdown tables in
Core mechanics. They are not manifest figures or tables.

## Whiteboard pack

### What to draw

1. Draw one central box labeled `Part I: vocabulary + five decisions` .
2. From it, draw a full dependency line labeled `Linear route` .
3. Add five ordered branches labeled `Retrieval` , `Infrastructure` , `Product`
   , `Trust` , and `Advanced variants` .
4. Add a short express branch labeled
   `One-week path: 3 -> 34 -> 1 -> 15 -> 18 -> 22 -> 25 -> 30 -> 32 -> 41.1 + 41.6`
   .
5. Mark six transfer circles for the cross-cutting threads.
6. Draw one repeated station card for the named section elements, then place
   the three difficulty tags and Appendices A through G beside it.

### Spoken script

Start at Part I, the central station, because it supplies the shared vocabulary
and five-decision skeleton. From there, choose the full dependency line or one
of five ordered role paths. If the interview is next week, take the express
route through Chapters 3 and 34, then the listed core chapters and two timed
drills. Mark six transfer points for the cross-cutting threads. Inside every
stop, expect the same recurring section pattern, then use core, senior, and
staff tags to judge the question. Finish with the appendices for formulas,
self-testing, checklists, reporting templates, readings, notation, and
terminology.

## Interview traps

### 1. Are all twelve parts mandatory before targeted preparation?

No. Part I alone is genuinely mandatory because it supplies the vocabulary and
five-decision skeleton assumed by later writing. After Part I, use the
dependency table or an ordered targeted path.

### 2. Can I treat a targeted path as a ranked list and pick only the highest items?

No. The source says each path is ordered, not ranked. Read it from top to bottom
because later stops depend on the setup provided earlier in the route.

### 3. What should I do if the interview is next week?

Read Chapter 3 first and Chapter 34 second. Then read Chapters 1, 15, 18, 22,
25, 30, and 32 in order. Work Sections 41.1 and 41.6 as timed drills, then skip
everything else.

### 4. Do `[core]`, `[senior]`, and `[staff]` mean easy, medium, and hard reading?

No. The tags test mechanism knowledge for core, derivation from stated
constraints for senior, and priced judgment under a changed constraint or
disagreement for staff. They identify capability rather than reading difficulty.

### 5. Should Appendix A become a permanent formula crutch?

No. Print it and keep it nearby during active preparation. After two weeks, if
it is still needed, spend a session re-deriving every formula from scratch
instead of re-reading the appendix.

## Key numbers

| Number | Source meaning |
|---|---|
| 3 | Intended uses: interview preparation, on-the-job reference, and systematic study |
| 12 | Dependency-ordered parts |
| 1 | Part I is the only genuinely mandatory part |
| 5 | Decisions in the skeleton introduced by Part I and Chapter 3 |
| 5 | Targeted reading paths |
| 10, 8, 10, 8, and 8 | Listed stops in Paths 1 through 5, respectively |
| Rank 1 | Retrieval-quality position used to frame Path 1 |
| 5 | Causes of factual error named for Chapter 4 on Path 3 |
| 1 bad document | Credibility case named for Chapter 35 on Path 4 |
| 4 | Quadrants named for Chapter 28 on Path 5 |
| 1 week | Trigger for the express preparation path |
| 2 | Opening chapters on the express path: Chapter 3 first and Chapter 34 second |
| 7 | Core chapters that follow the opening pair on the express path |
| 2 | Timed design drills on the express path |
| 6 | Cross-cutting threads |
| 247 | Sections said to follow the recurring format |
| 6 and 7 | The source calls the format six moves but names seven elements |
| 2 paragraphs | Length of the motivation element in each section |
| 1 | Italicized claim per section |
| At least 1 | Figure per section |
| 4 to 6 | Practical decisions per section and standalone takeaway lines per section |
| 3 | Interview questions per section and difficulty tags in the book |
| At least 1 of 3 | Interview questions that include a strong-answer versus weak-answer contrast |
| At least 1 | Key Takeaway line that carries a number from the Worked Example |
| 2 teams | Disagreement frame used by the staff tag |
| 100 million documents at 500 QPS | The scale and request rate in the Section 41.1 drill |
| 20 pages | Search span avoided by a specific section cross-reference |
| Under 2 minutes | Target time for verbally reproducing the retrieval checklist |
| 2 weeks | Point after which Appendix A should no longer be needed |
| 4 names | Possible terminology burden for one idea in the glossary |
