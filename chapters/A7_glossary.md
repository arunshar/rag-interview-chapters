# Appendix G: Glossary

This appendix decodes the overlapping vocabulary of Retrieval-Augmented Generation (RAG) and preserves the book's exact conventions, distinctions, qualifications, and source pointers.

## TL;DR

- Three literatures often give the same RAG object different names: information retrieval, representation learning, and systems.
- An alias is not always an exact synonym. A role, a product label, and one implementation can sound interchangeable while meaning different things.
- Faithfulness asks whether an answer follows the retrieved context. Factuality asks whether the answer is true of the world.
- Index recall compares approximate search with exact search under one scorer. Retrieval relevance compares results with human judgment.
- Retrieval depth k' feeds the reranker. The separate count k reaches the generator.
- Use the book's stated convention and source pointer when a term is contested. Do not average incompatible definitions.

## The story

Imagine a railway station shared by three rail companies. One company calls a boarding area a platform, another calls it a gate, and the third calls it a bay. The object stays the same, but a traveler can miss the train by treating a familiar object as unfamiliar.

The alias list is the station's translation board. It groups names that point to one object. It also posts warnings when a label is broader than the object. A reranker, for example, is a job at the station. A cross-encoder is one worker that can perform that job.

The glossary is the station handbook. Each entry gives the local meaning and the location of the full operating rule. The handbook follows this station's convention instead of averaging every railway's usage.

Three red warning cards prevent the worst transfers. The first separates a conductor who repeats the printed schedule faithfully from a train that actually arrives on time. That is faithfulness versus factuality.

The second separates a routing machine that reproduces its own exact route from a route that takes a passenger where people say they need to go. That is index recall versus retrieval relevance.

The third separates passengers sent to inspection from passengers allowed onto the train. Those counts are k' and k. They serve different objectives.

The traveler succeeds by reading the translation board, checking each warning card, and opening the handbook at the cited rule. Vocabulary then becomes a navigation tool instead of a trap.

## Decoder table

| Technical term | Plain-English meaning | Why it matters |
|---|---|---|
| Chunk | Also called passage, segment, span, node, or document. It is the unit stored, embedded, and retrieved | Document can mean either the source file or the retrieval unit. Chunk size and overlap are design parameters. Chapter 13 |
| Datastore | Also called index, corpus, knowledge base, vector store, or non-parametric memory. It is the retrievable text plus its index and is written D | Index strictly means the search structure, not the text. A datastore is usually a union of stores. Section 1.1 |
| Embedding | Also called dense vector, representation, latent, or encoding | The aliases name the represented object under different literatures. The source states no extra caveat |
| Bi-encoder | Also called dual encoder, two-tower, siamese network, or dense retriever. It encodes query and document independently | Dense Passage Retrieval (DPR) is one instance, not a synonym. Precomputation gives efficiency but removes query-document interaction. Section 20.1 |
| Cross-encoder | Also called interaction model, joint encoder, reranker, or scorer. It scores query and document jointly | Reranker is a role. A cross-encoder is one way to fill it. Joint scoring is accurate but unindexable. Chapter 22 |
| Approximate nearest-neighbor (ANN) search | Also called vector search, similarity search, semantic search, or nearest-neighbor search. It trades exactness for speed | Semantic search is a product term for the whole pipeline. Approximation enables billion-scale retrieval and makes recall tunable. Chapter 15 |
| Retrieval depth k' | Also called candidate set size, fan-out, recall set, or first-stage depth | It feeds the reranker. It is distinct from k, the count reaching the generator |
| Query reformulation | Also called query rewriting, query expansion, query transformation, or query understanding | Expansion adds terms. Rewriting replaces terms. The umbrella name varies by paper |
| Relevance judgment | Also called query relevance judgment (qrel), label, annotation, ground truth, or gold | Retrieval relevance is measured against this human judgment, not against exact index search |
| Hard negative | Also called distractor, confusing negative, or mined negative. It is a non-relevant document that scores highly | In Retrieval-Augmented Fine-Tuning (RAFT), a distractor is deliberately trained on. Mining strategy dominates retriever quality. Section 20.3 |
| Faithfulness | Also called groundedness, consistency, or attribution to source. It asks whether an answer follows retrieved context | It is distinct from factuality, which asks about the world. Section 33.1 |
| Factuality | Also called correctness, truthfulness, or factual accuracy. It asks whether an answer is true of the world | An answer can be faithful to a wrong document and still be non-factual. Section 33.1 |
| Abstention | Also called refusal, deferral, rejection, or "I don't know." It means declining to answer a low-confidence question | Five mechanisms exist and fail differently. Chapter 11 |
| Retrieval gate | Also called adaptive retrieval, active retrieval, when-to-retrieve, or routing. It is g(x), which decides whether to retrieve | Routing usually also covers where to retrieve. The gate is decision one. Section 25.1 |
| Lost in the middle | Also called positional bias, serial position effect, or primacy and recency | Answer accuracy follows a U shape as supporting evidence moves through the context. Chapter 30 |
| Learned sparse | Also called sparse neural, expansion-based sparse, or Sparse Lexical and Expansion Model (SPLADE)-style retrieval | It predicts vocabulary-term importance while retaining sparse retrieval structure |
| Late interaction | Also called multi-vector retrieval, token-level matching, or ColBERT-style retrieval | The alias row states no separate caveat. The glossary definition explains the per-token representation. Section 21.3 |
| Prompt injection | Also called indirect injection, context injection, or instruction hijacking | Indirect means the instruction arrives through retrieval rather than through user input. Section 36.4 |
| Agentic RAG | A control flow where the generator decides at each step whether and what to retrieve | Tool calls and a stopping rule control the process. Cost grows with rounds, and tail behavior matters more than the mean. Section 26.8 |
| Attribution | The property that a statement is supported by a cited source | It differs from citation, which is the act of pointing. Chapter 31 |
| BM25 | The book's name for a lexical ranker using inverse document frequency (IDF) times saturating, length-normalized term frequency | It states the standard lexical scoring convention. Section A.1 |
| Calibration | Agreement between stated model confidence and observed accuracy | Failure prediction only needs to rank confidence, so it is a different requirement. Section 11.4 |
| Contrastive Language-Image Pre-training (CLIP) | Jointly trained image and text encoders place matching image-text pairs near each other | It is the default multimodal retriever in the source and carries three biases worth naming. Section 39.3 |
| Closed-book | Answering only from knowledge in model weights, with no retrieved context | It is the baseline every RAG evaluation needs and most omit. Section 30.2 |
| ColBERT | A late-interaction retriever that stores one vector per token and scores with maximum-similarity matching, called MaxSim | It recovers much cross-encoder accuracy at index-time cost. Section 21.3 |
| Generative retrieval | A model produces document identifiers directly instead of searching an index | It has constant-time lookup, a quality ceiling, and an unsolved incremental-indexing problem. Chapter 23 |
| Graph RAG | Retrieval over an extracted entity-relation graph rather than a flat chunk store | Its cost pays off for relational and global-sense-making queries, not otherwise. Chapter 40 |
| Hallucination | A generated statement unsupported by the context or the world | The useful taxonomy separates factuality from faithfulness and intrinsic from extrinsic. Section 4.4 |
| High-bandwidth memory (HBM) | Accelerator-attached memory that a decode step reads in full for every token | Decode becomes bandwidth-bound, and its cost does not fall merely because the model gets smarter. Section 37.1 |
| Hierarchical Navigable Small World (HNSW) | A graph index derived from a skip list with layered proximity graphs and greedy descent | It is fast and memory-hungry. Its link term cannot be compressed. Section 15.2 |
| HyDE | The source's name for generating a hypothetical answer and retrieving with it | It moves the query into document space. Section 24.6 |
| Hybrid retrieval | Lexical and dense retrieval run in parallel, then their ranked lists are fused | The source usually uses reciprocal rank fusion. Section 21.6 |
| In-context learning | A model conditions on examples or evidence in its prompt without weight updates | RAG depends on this mechanism. Chapter 7 |
| Inverted file index (IVF) | It partitions space into Voronoi cells around centroids | It searches only the nearest n_probe cells. Section 15.3 |
| Locality-sensitive hashing (LSH) | Hash functions collide more often when inputs are more similar | Retrieval becomes bucket lookup. It is sublinear in theory and usually loses to a graph index on memory in practice. Section 15.4 |
| Modularity | The objective maximized by community-detection algorithms | It defines a GraphRAG community. Section A.5 |
| Parametric memory | Knowledge stored in model weights | Capacity is fixed, updates are expensive, and there is no undo. Section 1.1 |
| Product quantization | Split a vector into subvectors and quantize each with its own codebook | It represents k^m vectors from km stored centroids. Section A.6 |
| Prompt injection, indirect | Instructions enter through retrieved content rather than direct user input | The source calls it RAG's native threat model. Section 36.4 |
| Recall@k | The fraction of relevant documents found in the top k | Index recall uses exact search as reference. Retrieval recall uses human judgment. Chapter 32 |
| Reranking | A second scoring stage over first-stage candidates | It trades compute for accuracy on a short list. Chapter 22 |
| Reciprocal rank fusion (RRF) | It sums 1 / (k + r_l(d)) across ranked lists | It combines rankings whose scores cannot be compared directly. Section A.2 |
| Self-RAG | A generator emits reflection tokens that control retrieval and critique its own output | The generator learns control as well as generation. Section 26.6 |
| Semi-parametric | A system combines parametric model weights with a non-parametric datastore | This is the frame behind every RAG design question in the source. Section 1.1 |
| SPLADE | The source's name for a learned sparse retriever with a masked language model head | It predicts term importance across the vocabulary and expands documents implicitly. Section 21.1 |
| Tombstone | A deletion marker in an index that cannot be repaired cheaply | Accumulation degrades recall and eventually forces a rebuild. Section 17.1 |
| Vocabulary mismatch | A user and a relevant document use different words | Query expansion, document expansion, and dense retrieval attack the gap differently. Section 24.1 |

## Core mechanics

### Introduction: why a glossary is needed

What: Two obstacles get in a reader's way. Only one is conceptual.

Why: Three independent literatures use different names for the same objects. All three vocabularies remain active.

Failure without the aliasing table: A familiar object can sound unfamiliar in a paper, vendor document, or interview question.

What the glossary adds: It gives a needed definition at the moment it is needed and points to the full argument.

Convention: Each definition states this book's usage. It does not average the field.

Qualifier: The source calls out contested distinctions instead of smoothing them over. These distinctions test whether the candidate's vocabulary is real.

Cost or complexity: The source states no numeric implementation cost for the glossary itself.

### G.1 The Same Idea Under Four Names

Retrieval-Augmented Generation sits where information retrieval, representation learning, and systems meet. The three literatures developed independently. Their names survive in current papers, vendor documentation, and interview questions.

The source uses a bi-encoder and a two-tower model as its example. A candidate who misses the alias hears a familiar question as an unfamiliar one.

Terms on one alias row denote the same broad idea. The caveat column preserves the places where that equivalence is incomplete.

#### Chunk

Also called: passage, segment, span, node, and document.

Qualifier: Document is ambiguous. It can mean the source file or the retrieval unit.

Failure without the qualifier: A design can confuse the stored unit with the original file.

Cost or complexity: No separate cost is stated in G.1.

#### Datastore

Also called: index, corpus, knowledge base, vector store, and non-parametric memory.

Qualifier: Index strictly means the search structure, not the text.

Failure without the qualifier: A discussion can merge retrievable content with the structure used to search it.

Cost or complexity: No separate cost is stated in G.1.

#### Embedding

Also called: dense vector, representation, latent, and encoding.

Qualifier: G.1 states no additional caveat for this row.

Failure without the aliases: Representation-learning vocabulary can hide a familiar vector object.

Cost or complexity: No separate cost is stated in G.1.

#### Bi-encoder

Also called: dual encoder, two-tower, siamese network, and dense retriever.

Qualifier: DPR is one instance, not a synonym.

Failure without the qualifier: One named implementation can be mistaken for the entire architecture class.

Cost or complexity: No separate cost is stated in G.1.

#### Cross-encoder

Also called: interaction model, joint encoder, reranker, and scorer.

Qualifier: Reranker is a role. A cross-encoder is one way to fill that role.

Failure without the qualifier: A pipeline position can be mistaken for one architecture.

Cost or complexity: No separate cost is stated in G.1.

#### ANN search

Also called: vector search, similarity search, semantic search, and nearest-neighbor search.

Qualifier: Semantic search is a product term that covers the whole pipeline.

Failure without the qualifier: A full product can be confused with its approximate search component.

Cost or complexity: No separate cost is stated in G.1.

#### Retrieval depth k'

Also called: candidate set size, fan-out, recall set, and first-stage depth.

Qualifier: k' differs from k, the count that reaches the generator.

Failure without the qualifier: One depth can be optimized as if it served two separate objectives.

Cost or complexity: The source gives no fixed values for k' or k in this appendix.

#### Query reformulation

Also called: query rewriting, query expansion, query transformation, and query understanding.

Qualifier: Expansion adds terms. Rewriting replaces them. The umbrella term varies by paper.

Failure without the qualifier: Two different transformations can be treated as identical operations.

Cost or complexity: No separate cost is stated in G.1.

#### Relevance judgment

Also called: qrel, label, annotation, ground truth, and gold.

Qualifier: G.1 states no additional caveat for this row.

Failure without the aliases: Evaluation vocabulary can hide that each name denotes a relevance judgment.

Cost or complexity: No separate cost is stated in G.1.

#### Hard negative

Also called: distractor, confusing negative, and mined negative.

Qualifier: In RAFT, a distractor is deliberately trained on.

Failure without the qualifier: An ordinary distractor can be confused with a deliberately selected training example.

Cost or complexity: No separate cost is stated in G.1.

#### Faithfulness

Also called: groundedness, consistency, and attribution to source.

Qualifier: Faithfulness is distinct from factuality, which asks about the world.

Failure without the qualifier: Support from context can be mistaken for truth about the world.

Cost or complexity: No separate cost is stated in G.1.

#### Factuality

Also called: correctness, truthfulness, and factual accuracy.

Qualifier: An answer can be faithful and non-factual.

Failure without the qualifier: A wrong source can make a supported answer false.

Cost or complexity: No separate cost is stated in G.1.

#### Abstention

Also called: refusal, deferral, rejection, and "I don't know."

Qualifier: G.1 states no additional caveat for this row.

Failure without the aliases: Different labels can hide the same decision to decline an answer.

Cost or complexity: No separate cost is stated in G.1.

#### Retrieval gate

Also called: adaptive retrieval, active retrieval, when-to-retrieve, and routing.

Qualifier: Routing usually also covers where to retrieve.

Failure without the qualifier: A broader routing decision can be reduced to a yes-or-no gate.

Cost or complexity: No separate cost is stated in G.1.

#### Lost in the middle

Also called: positional bias, serial position effect, and primacy and recency.

Qualifier: G.1 states no additional caveat for this row.

Failure without the aliases: The position effect can look like several unrelated phenomena.

Cost or complexity: No separate cost is stated in G.1.

#### Learned sparse

Also called: sparse neural, expansion-based sparse, and SPLADE-style.

Qualifier: G.1 states no additional caveat for this row.

Failure without the aliases: A learned sparse method can be mistaken for a different retrieval family.

Cost or complexity: No separate cost is stated in G.1.

#### Late interaction

Also called: multi-vector retrieval, token-level matching, and ColBERT-style.

Qualifier: G.1 states no additional caveat for this row.

Failure without the aliases: A per-token retrieval architecture can sound like a separate method family.

Cost or complexity: No separate cost is stated in G.1.

#### Prompt injection

Also called: indirect injection, context injection, and instruction hijacking.

Qualifier: Indirect marks arrival through retrieval rather than through user input.

Failure without the qualifier: Retrieved instructions can be confused with instructions supplied directly by the user.

Cost or complexity: No separate cost is stated in G.1.

### Three distinctions worth keeping

Not every pair of terms is synonymous. The source identifies three collapses that can lose an interview exchange.

#### Faithfulness is not factuality

What: Faithfulness asks whether the answer follows from retrieved context. Factuality asks whether it is true of the world.

Example: A perfectly faithful answer to a wrong document is faithful and false.

Failure without the distinction: The two failure types receive the same diagnosis even though they require different fixes.

Cross-reference: Section 33.1.

#### Recall is not relevance

What: Index recall compares approximate search with exact search under the same scoring function. Retrieval relevance compares results with human judgment.

Example: An index with 0.99 recall against a bad scorer retrieves the wrong documents very reliably.

Failure without the distinction: Strong agreement with exact search can be misreported as strong agreement with people.

Cross-reference: Section 15.6.

#### k is not k'

What: Retrieval depth k' feeds the reranker. The separate count k reaches the generator.

Why: The two variables serve separate objectives.

Interview signal: The question "How do you choose k?" tests whether the candidate separates them.

Cross-reference: Section 22.2.

### G.2 Glossary of Terms

The following entries keep the source's exact alphabetical order. Each definition uses the book's convention and retains its source pointer.

#### Abstention

What: Declining to answer instead of producing a low-confidence answer.

Why: It gives the system an alternative to an answer it does not support confidently.

Failure or qualifier: Five mechanisms exist, and each fails differently.

Cost or complexity: The appendix states the mechanism count but no shared cost.

Cross-reference: Chapter 11.

#### Agentic RAG

What: A control flow where the generator decides at each step whether and what to retrieve. It usually uses tool calls and a stopping rule.

Why: Retrieval becomes a per-step decision rather than a fixed single stage.

Failure or qualifier: The tail matters more than the mean.

Cost or complexity: Cost scales with the number of rounds.

Cross-reference: Section 26.8.

#### ANN search

What: Approximate nearest-neighbor search.

Why: Trading exactness for speed makes billion-scale retrieval possible.

Failure or qualifier: Approximation makes recall a tunable rather than a fixed guarantee.

Cost or complexity: The source states the speed-exactness trade but no numeric cost here.

Cross-reference: Chapter 15.

#### Attribution

What: The property that a statement is supported by a cited source.

Why: It tests support rather than merely displaying a pointer.

Failure or qualifier: Citation is the act of pointing. It is distinct from attribution.

Cost or complexity: No separate cost is stated.

Cross-reference: Chapter 31.

#### Bi-encoder

What: An architecture that encodes the query and document independently.

Why: Document vectors can be precomputed and indexed, which makes retrieval tractable.

Failure or qualifier: It has no query-document interaction.

Cost or complexity: Efficiency comes at the cost of that missing interaction.

Cross-reference: Section 20.1.

#### BM25

What: The standard lexical ranking function in the source.

Why: It combines inverse document frequency weighting with saturating, length-normalized term frequency.

Failure or qualifier: The appendix states no additional qualifier.

Cost or complexity: No numeric cost is stated.

Cross-reference: Section A.1.

#### Calibration

What: Agreement between stated model confidence and observed accuracy.

Why: A calibrated confidence value matches empirical outcomes.

Failure or qualifier: Failure prediction only needs to rank confidence. It is distinct from calibration.

Cost or complexity: No separate cost is stated.

Cross-reference: Section 11.4.

#### Chunk

What: The unit stored, embedded, and retrieved.

Why: It defines the object that moves through retrieval.

Failure or qualifier: Chunk size and overlap are design parameters, not defaults.

Cost or complexity: No fixed size or overlap is stated here.

Cross-reference: Chapter 13.

#### CLIP

What: Contrastive Language-Image Pre-training. An image encoder and a text encoder train together so matching image-text pairs land near each other in one shared space.

Why: It is the default multimodal retriever in the source.

Failure or qualifier: It is the source of three biases worth naming.

Cost or complexity: No numeric compute or storage cost is stated here.

Cross-reference: Section 39.3.

#### Closed-book

What: Answering from parametric knowledge with no retrieved context.

Why: It supplies the baseline every RAG evaluation needs.

Failure or qualifier: Most evaluations omit that baseline.

Cost or complexity: No separate cost is stated.

Cross-reference: Section 30.2.

#### ColBERT

What: A late-interaction retriever that keeps one vector per token and scores with maximum-similarity matching, called MaxSim.

Why: It recovers much of a cross-encoder's accuracy.

Failure or qualifier: The recovery comes with index-time cost.

Cost or complexity: One vector per token increases index work. The appendix gives no numeric factor.

Cross-reference: Section 21.3.

#### Cross-encoder

What: A model that scores a query and document jointly in one forward pass.

Why: Joint interaction makes the score accurate.

Failure or qualifier: The model is unindexable, so it belongs in the second stage.

Cost or complexity: It uses one forward pass for each scored query-document pair. No numeric cost is stated here.

Cross-reference: Chapter 22.

#### Datastore

What: The non-parametric component made of retrievable text plus its index. The source writes it as D.

Why: It holds knowledge outside model weights.

Failure or qualifier: It is usually a union of several stores.

Cost or complexity: No numeric storage cost is stated here.

Cross-reference: Section 1.1.

#### Faithfulness

What: Whether an answer follows from retrieved context.

Why: It tests support by the evidence given to the generator.

Failure or qualifier: It is not the same as factuality.

Cost or complexity: No separate cost is stated.

Cross-reference: Section 33.1.

#### Generative retrieval

What: Producing document identifiers directly from a model instead of searching an index.

Why: Retrieval becomes direct identifier generation.

Failure or qualifier: It has a quality ceiling and an unsolved incremental-indexing problem.

Cost or complexity: The source calls it constant-time.

Cross-reference: Chapter 23.

#### Graph RAG

What: Retrieval over an extracted entity-relation graph instead of a flat chunk store.

Why: It serves relational and global-sense-making queries.

Failure or qualifier: It earns its cost on those query types and not otherwise.

Cost or complexity: The appendix names a cost but gives no numeric amount.

Cross-reference: Chapter 40.

#### Hallucination

What: A generated statement unsupported by the context or the world.

Why: The term names unsupported generation.

Failure or qualifier: The useful taxonomy separates factuality from faithfulness and intrinsic from extrinsic.

Cost or complexity: No separate cost is stated.

Cross-reference: Section 4.4.

#### Hard negative

What: A non-relevant document that scores highly.

Why: Training on it sharpens the decision boundary.

Failure or qualifier: Mining strategy dominates retriever quality.

Cost or complexity: No numeric mining cost is stated here.

Cross-reference: Section 20.3.

#### HBM

What: High-bandwidth memory attached to an accelerator.

Why: A decode step must read it in full for every token.

Failure or qualifier: Decode is bandwidth-bound. Its cost does not fall when the model becomes smarter.

Cost or complexity: The full memory read repeats for every generated token.

Cross-reference: Section 37.1.

#### HNSW

What: Hierarchical Navigable Small World. It is a graph index derived from the skip list, with layered proximity graphs and greedy descent.

Why: The layered graph supports fast search.

Failure or qualifier: It is memory-hungry and has an incompressible link term.

Cost or complexity: The source states memory pressure but gives no numeric amount here.

Cross-reference: Section 15.2.

#### HyDE

What: Generate a hypothetical answer and retrieve with it.

Why: The generated answer moves the query into document space.

Failure or qualifier: The appendix states no additional qualifier.

Cost or complexity: No numeric generation or retrieval cost is stated here.

Cross-reference: Section 24.6.

#### Hybrid retrieval

What: Run lexical and dense retrieval in parallel, then fuse their ranked lists.

Why: The pipeline combines the two retrieval paths.

Failure or qualifier: The source says it usually uses RRF.

Cost or complexity: It runs two retrieval paths. No numeric overhead is stated here.

Cross-reference: Section 21.6.

#### In-context learning

What: A model conditions on examples or evidence in the prompt without weight updates.

Why: RAG rides on this mechanism.

Failure or qualifier: The definition excludes weight updates.

Cost or complexity: No numeric prompt cost is stated here.

Cross-reference: Chapter 7.

#### IVF

What: Inverted file index. It partitions the space into Voronoi cells around centroids.

Why: Search visits only the nearest n_probe cells.

Failure or qualifier: The appendix states no additional qualifier beyond searching only the nearest cells.

Cost or complexity: n_probe controls the searched subset. No fixed value is stated here.

Cross-reference: Section 15.3.

#### Lost in the middle

What: A U-shaped relationship between answer accuracy and the position of supporting evidence in context.

Why: Evidence position can change whether the model uses it.

Failure or qualifier: Evidence in the middle can receive lower effective use than evidence near the ends.

Cost or complexity: No numeric accuracy gap is stated here.

Cross-reference: Chapter 30.

#### LSH

What: Locality-sensitive hashing. Its hash functions collide more often as inputs become more similar.

Why: Retrieval becomes a bucket lookup.

Failure or qualifier: It is sublinear in theory and usually beaten on memory by a graph index in practice.

Cost or complexity: The source states the theory-practice trade but no numeric memory amount here.

Cross-reference: Section 15.4.

#### Modularity

What: The objective maximized by community-detection algorithms.

Why: It defines a GraphRAG community.

Failure or qualifier: The definition follows the optimization objective rather than an informal grouping.

Cost or complexity: No numeric computation cost is stated here.

Cross-reference: Section A.5.

#### Parametric memory

What: Knowledge stored in model weights.

Why: It names the model-side store in the RAG frame.

Failure or qualifier: Capacity is fixed, there is no undo, and updates are expensive.

Cost or complexity: Update expense is stated without a numeric amount here.

Cross-reference: Section 1.1.

#### Product quantization

What: Split a vector into subvectors and quantize each against its own codebook.

Why: The construction gives k^m representable vectors from km stored centroids.

Failure or qualifier: The representation depends on separate subvector codebooks.

Cost or complexity: Store km centroids to represent k^m combinations.

Cross-reference: Section A.6.

#### Prompt injection, indirect

What: An attack where instructions arrive through retrieved content rather than user input.

Why: It identifies the instruction channel unique to retrieved content.

Failure or qualifier: The source calls it RAG's native threat model.

Cost or complexity: No attack rate or defense cost is stated here.

Cross-reference: Section 36.4.

#### Recall@k

What: The fraction of relevant documents appearing in the top k.

Why: It measures coverage at a chosen retrieval depth.

Failure or qualifier: Index recall compares with exact search. Retrieval recall compares with human judgment. They are different numbers.

Cost or complexity: The source gives no fixed k in this definition.

Cross-reference: Chapter 32.

#### Reranking

What: A second scoring stage over the first stage's candidates.

Why: It improves accuracy on a short list.

Failure or qualifier: It does not replace first-stage candidate generation.

Cost or complexity: It trades compute for accuracy. No numeric budget is stated here.

Cross-reference: Chapter 22.

#### Retrieval gate

What: The function g(x) that decides whether to retrieve at all.

Why: It controls decision one in the retrieval flow.

Failure or qualifier: The definition covers whether to retrieve, while routing can also cover where.

Cost or complexity: No threshold or gate cost is stated here.

Cross-reference: Section 25.1.

#### RRF

What: Reciprocal rank fusion. It sums 1 / (k + r_l(d)) across lists.

Why: It fuses rankings whose raw scores are not comparable.

Failure or qualifier: The method operates on rank positions rather than shared score scales.

Cost or complexity: The appendix states the sum but no list-count limit.

Cross-reference: Section A.2.

#### Self-RAG

What: Train a generator to emit reflection tokens that control retrieval and critique its output.

Why: The generator learns when to retrieve and how to assess its response.

Failure or qualifier: Control depends on emitted reflection tokens.

Cost or complexity: No numeric training or serving cost is stated here.

Cross-reference: Section 26.6.

#### Semi-parametric

What: A system that combines parametric weights with a non-parametric datastore.

Why: This combination frames every RAG design question in the source.

Failure or qualifier: Neither store alone represents the full system.

Cost or complexity: No numeric cost is stated here.

Cross-reference: Section 1.1.

#### SPLADE

What: A learned sparse retriever that predicts term importance across the vocabulary with a masked language model head.

Why: It expands documents implicitly.

Failure or qualifier: The prediction remains vocabulary-based and sparse.

Cost or complexity: No numeric expansion or index cost is stated here.

Cross-reference: Section 21.1.

#### Tombstone

What: A deletion marker in an index that cannot be repaired cheaply.

Why: It records a deletion inside the index.

Failure or qualifier: Accumulating tombstones degrade recall and eventually force a rebuild.

Cost or complexity: Repair is not cheap. No numeric rebuild threshold is stated here.

Cross-reference: Section 17.1.

#### Vocabulary mismatch

What: The gap between the words a user types and the words a document uses.

Why: A relevant document can express the idea with different vocabulary.

Failure or qualifier: Query expansion, document expansion, and dense retrieval attack the gap differently.

Cost or complexity: No numeric mismatch rate or remedy cost is stated here.

Cross-reference: Section 24.1.

## Diagrams

The manifest lists zero figures and zero counted source tables for this appendix. The unnumbered G.1 table contains 18 alias rows, all preserved in the Decoder table and Core mechanics.

Source layout defect: The final two alias rows extend below the visible page boundary in the source Portable Document Format (PDF). The PDF content layer retains Late interaction and Prompt injection, so both clipped rows are preserved here. This does not change the manifest's numbered table count.

## Whiteboard pack

### What to draw

1. Draw one station labeled "RAG vocabulary."
2. Draw three rail lines entering it. Label them "information retrieval," "representation learning," and "systems."
3. Draw one shared object with several name tags around it.
4. Add a translation board labeled "alias rows plus caveats."
5. Draw two boxes labeled "faithfulness" and "factuality." Put "context" under the first and "world" under the second.
6. Draw two boxes labeled "index recall" and "retrieval relevance." Put "exact search" and "human judgment" beneath them.
7. Draw k' candidates entering a reranker, then k items reaching a generator.
8. Add a handbook arrow labeled "definition plus source pointer."

### Spoken script

This glossary is a translation board for three literatures that named the same RAG objects differently. First, I map aliases but keep the caveats. A reranker is a role, while a cross-encoder is one way to perform it. Then I protect three distinctions. Faithfulness asks whether an answer follows the context, while factuality asks whether it is true. Index recall compares approximate with exact search, while relevance uses human judgment. Finally, k' feeds the reranker and k reaches the generator. Each glossary entry states this book's convention and points to the section with the full argument.

## Interview traps

### 1. Are all terms on an alias row perfect synonyms?

No. The rows identify one broad idea, but the caveats preserve scope. DPR is one bi-encoder instance, a reranker is a role rather than a cross-encoder synonym, and semantic search can name the whole product pipeline.

### 2. Can an answer be faithful and false?

Yes. Faithfulness asks whether the answer follows the retrieved context. If the retrieved document is wrong, an answer can follow it perfectly and still be non-factual about the world.

### 3. Does index recall of 0.99 prove relevant retrieval?

No. Index recall compares approximate search with exact search under the same scorer. A bad scorer can retrieve the wrong documents very reliably, while retrieval relevance still fails against human judgment.

### 4. Why does the source separate k' from k?

k' is the first-stage depth sent to the reranker. k is the count sent to the generator. They serve different objectives, so one shared depth hides a design decision.

### 5. When should you reject a field-wide average definition?

Use the book's convention when the literature contests a term. State the local definition, name the competing meaning, and use the source pointer. Smoothing over faithfulness versus factuality or recall versus relevance destroys the distinction the interviewer is testing.

## Key numbers

| Source item | Number or formula | Meaning and claim limit |
|---|---|---|
| Introduction obstacles | 2 obstacles, only 1 conceptual | Aliasing is conceptual. Point-of-need definition is ordinary navigation |
| Naming traditions | 3 literatures | Information retrieval, representation learning, and systems developed separate vocabularies |
| G.1 title | 4 names | The title emphasizes several names for one idea. It does not claim every row has exactly four aliases |
| G.1 alias inventory | 18 rows, final 2 clipped | The PDF content layer retains the two rows that extend below the visible page boundary |
| Explicit distinction tests | 3 | Faithfulness versus factuality, recall versus relevance, and k versus k' |
| Retrieval depths | k' to the reranker, k to the generator | The two depths serve separate objectives |
| Bad-scorer example | Index recall 0.99 | High agreement with exact search does not establish human relevance |
| Abstention | 5 mechanisms | The mechanisms fail differently. The appendix does not enumerate them here |
| Agentic RAG | Cost scales with rounds | Tail behavior matters more than the mean. No fixed round count is stated |
| ANN search | Billion-scale retrieval | Approximation enables this scale. No corpus size is fixed here |
| CLIP | 3 biases | The appendix says they are worth naming but does not enumerate them here |
| ColBERT | 1 vector per token | Late interaction recovers accuracy at index-time cost |
| Cross-encoder | 1 joint forward pass | Query and document interact directly, but the model is unindexable |
| Generative retrieval | Constant-time | The source also states a quality ceiling and unresolved incremental indexing |
| High-bandwidth memory | 1 full read per generated token | Decode remains bandwidth-bound |
| Hybrid retrieval | 2 parallel retrieval paths | Lexical and dense rankings are fused after retrieval |
| Inverted file index | n_probe nearest cells | The appendix gives no fixed probe count |
| Locality-sensitive hashing | Sublinear in theory | A graph index usually wins on memory in practice |
| Product quantization | k^m vectors from km stored centroids | The formula states representational combinations, not a fixed codebook size |
| Recall@k | Top k | Index and retrieval recall use different reference standards |
| Reranking | Stage 2 over stage 1 candidates | More scoring compute buys accuracy only on the short candidate list |
| Retrieval gate | g(x), decision 1 | The function decides whether to retrieve at all |
| Reciprocal rank fusion | Sum 1 / (k + r_l(d)) | The sum combines rank positions across lists with incomparable scores |
| Semi-parametric system | 2 stores | Parametric weights and a non-parametric datastore form the complete system |
