# 00.03 Preface

This preface explains how the book turns Retrieval-Augmented Generation (RAG)
from a component list into a production reasoning discipline for artificial
intelligence systems.

## TL;DR

- The source calls RAG the most widely deployed pattern in applied artificial
  intelligence and the least rigorously understood. A design answer must explain
  when to retrieve, not only how.
- Retrieval can damage a correct answer, so more context is not automatically
  safer.
- Production failures require stage-by-stage diagnosis across retrieval,
  generation, and the full system.
- The book joins ideas that usually live in separate retrieval, language-model,
  vector-database, and framework sources.
- Each section teaches one idea through first principles, a number, an example,
  a production decision, and interview questions.
- The book covers the path from model memory through retrieval, context
  assembly, evaluation, trust, cost, and scaling.
- The central skill is re-deriving an answer when constraints change instead of
  memorizing one benchmark number. The book favors attributed or derived
  evidence, especially when that evidence contradicts common RAG advice.

## The story

Imagine a hospital where a physician answers questions from memory and a records
clerk fetches patient charts. The physician is the language model. The records
clerk is the retriever. Together they form the RAG team.

A weak description says that the clerk labels every chart, finds the most
similar labels, and hands the physician the top k charts, meaning the k
highest-ranked results. That description names the staff and the steps. It does
not answer the most important question. Should the clerk fetch a chart at all?

Sometimes the physician already knows the right answer. A distracting chart can
then reverse a correct decision. Mallen et al. (2023) measured retrieval
changing roughly 10% of otherwise-correct answers into wrong answers. More
charts can also give the physician more misleading material and increase
hallucination, which means unsupported content in the answer.

The hospital must diagnose failures across the full care path. A quality drop
can begin with the question, the chart search, the ranking, the packet given to
the physician, or the final answer. Knowing that the team uses retrieval does
not reveal which stage caused an end-to-end accuracy regression, which means a
decline in the final measured answer quality.

The knowledge needed to run this hospital sits in separate departments.
Information retrieval studies search and ranking. Language-model research
studies the physician but often treats the archive as a black box.
Vector-database documentation explains archive controls. Framework tutorials
assemble a small demonstration. None of those departments alone follows the
patient from the first question through evidence, answer, evaluation, trust, and
cost.

This book acts like a complete residency program. Its 12 rotations contain 41
chapters and 247 teaching stations. Every station uses the same routine. It
starts from first principles, works through a measured or derived number, solves
a concrete numeric case, makes a production decision, and tests the answer at
three levels of seniority.

The residency assumes that the trainee can already code and knows basic machine
learning. It does not teach deep-learning foundations, transformers, or
backpropagation. It is not a complete retrieval survey. It also avoids training
the reader on one vendor, framework, embedding application programming interface
(API), or company interview process because those details can change every
quarter.

The rotations follow the whole patient journey. They begin with what the
physician already memorized and when that memory fails. They cover
representation, indexing, ranking, question routing, repeated retrieval,
training, context assembly, citation, evaluation, credibility, security, cost,
and scale. The final rotation uses end-to-end design drills, including the hard
case where the system became worse without an obvious cause.

The archive provides the clearest lesson. A Hierarchical Navigable Small World
(HNSW) index keeps vectors, which are numeric chart labels, and a graph, which
is a shortcut map through the archive. Shrinking the labels with quantization
reduces vector memory. The shortcut map does not shrink. Once the labels are
small enough, the map becomes most of what remains.

A trainee who memorizes that one archive needs 32 gigabytes knows one case. A
trainee who understands the memory formula can recompute the answer when vector
dimension or compression changes. The book trains that second habit.

The residency also has a strict evidence rule. It attributes numbers to named
sources or derives them in view. It omits numbers that it cannot attribute or
derive. It starts rounds with cases that challenge familiar advice, such as
retrieval losing to a closed-book answer on popular facts or citations failing
to prove that an answer is grounded in its evidence.

The hospital metaphor ends with one operating principle. A fluent description of
the staff is not enough. A strong engineer decides when each staff member should
act, measures what happened, finds the failing stage, and recomputes the plan
when the constraints change.

## Decoder table

| Technical term | Plain-English meaning | Why it matters |
|---|---|---|
| Retrieval-Augmented Generation (RAG) | A system that fetches external material and gives it to a language model before the model answers | The book studies when this pattern helps, when it hurts, and how to design it |
| Machine learning | Systems that learn patterns from data | The book assumes the reader already knows its basics |
| Deep learning | The model family named as assumed background | The book does not teach it from the beginning |
| Transformer | A language-model architecture named as assumed background | The book does not explain it |
| Backpropagation | A model-training method named as assumed background | The book does not teach it |
| Language model | The component that produces the final text answer | Retrieval only helps if the model uses the added material well |
| Model memory | Knowledge reflected in the model before external retrieval | It affects the decision to retrieve or answer closed-book |
| Retriever | The component that searches for material related to a query | Its choices determine what evidence reaches the model |
| Embedding | A numeric representation of text | It lets a system compare queries and documents by location in a numeric space |
| Nearest neighbor | A stored vector judged most similar to a query vector | Nearest-neighbor search is the common retrieval step named in weak RAG descriptions |
| Top k | The k highest-ranked retrieved results | Choosing k controls how much retrieved material enters the prompt |
| Prompt | The instructions and context given to the language model | Retrieved documents influence the answer through the prompt |
| Context | The material available to the model while it creates an answer | Added context can help, distract, or increase unsupported output |
| Hallucination | Content in an answer that lacks support | Retrieval does not guarantee that hallucination will fall |
| Closed-book answer | An answer produced from the model's stored knowledge without retrieval | It can outperform retrieval for some high-popularity facts |
| Corpus | The collection of documents available for search | Changes to the corpus can degrade an index over time |
| Corpus churn | Documents being added, removed, or changed | Churn can weaken graph-based search behavior |
| Hierarchical Navigable Small World (HNSW) index | A graph-based structure for approximate nearest-neighbor search | Its graph can become the main memory cost after vector compression |
| Approximate nearest-neighbor index | A search structure that seeks likely close vectors instead of an exact full comparison | The book covers how these indexes work and what they cost in memory |
| Graph | The stored network of search shortcuts in HNSW | Its memory does not shrink when only vectors are compressed |
| Quantization | A way to store vectors with fewer bytes | It reduces vector memory and can expose the graph as the remaining cost |
| Product quantization | A compression method that stores a vector as a short code | The preface uses a 64-byte code to show how the memory balance changes |
| 32-bit floating point (fp32) | A vector format that uses four bytes for each dimension | It supplies the 4d term in the HNSW memory formula |
| Vector dimension | The number of numeric coordinates in an embedding | Increasing dimension raises vector memory directly |
| End-to-end accuracy | Final answer accuracy across the complete pipeline | A drop at the system output does not identify which stage failed |
| Regression | A measured decline in system performance | Engineers must locate the stage that owns it |
| Five-stage pipeline | The production path whose stages jointly produce an answer | Engineers must assign a regression to the correct stage |
| Five-decision skeleton | The structure used for design answers throughout the book | It forces a candidate to state decisions rather than list components |
| Information retrieval | The field that studies search, ranking, and retrieval evaluation | Its depth does not by itself explain how a generator uses retrieved text |
| Generator | The component that writes the answer | Generator behavior must be studied together with retrieval behavior |
| Index | The data structure used to find documents quickly | Treating it as a black box hides memory and quality trade-offs |
| Black box | A component whose internal choices are hidden from the surrounding explanation | It prevents end-to-end reasoning about the index or generator |
| Vector database | A system that stores and searches vector representations | Product documentation explains controls but not the whole RAG decision surface |
| Orchestration framework | Software that connects pipeline components | A short framework demo does not explain production-scale failure |
| Embedding application programming interface (API) | A software interface that produces embeddings | The book avoids tying its arithmetic to one changing product interface |
| Trade-off surface | The set of gains and losses created by a design choice | Knowing controls is not enough without knowing what each control sacrifices |
| Continual learning | Updating a model as new data arrives | The book compares it with retrieval as a way to add or refresh knowledge |
| Model editing | Changing selected knowledge inside a model | It is another competitor to retrieval |
| Long context | Giving the model a large amount of material directly | It can replace retrieval in some designs and creates its own costs |
| Generative retrieval | Using generation as part of identifying what to retrieve | It appears both as a retrieval alternative and as a later ranking approach |
| In-context learning | A model adapting its response from examples or information in its current prompt | Retrieval depends on this mechanism to influence generation |
| Parameter | A learned internal value in a model | The book compares the economics of model parameters with an external datastore |
| Datastore | The external collection that a retrieval system searches | It offers a different place to hold information than model parameters |
| Training data | The examples used to fit a model or retrieval system | The book covers its privacy, legal, and manufacturing questions |
| Confabulation | Producing plausible content that is not supported | The generator chapters contrast it with what the model memorized |
| Prompting | Choosing instructions and context for a model | It shapes how the generator responds to retrieved material |
| Sensitivity | The degree to which an answer changes when its input changes | It is part of the generator behavior covered by the book |
| Representation | The form used to encode text for search | Poor representation weakens every later retrieval stage |
| Chunking | Splitting documents into searchable pieces | Chunk boundaries affect what a retriever can return |
| Semantic chunking | Splitting text based on meaning | The preface says its measured advantage largely disappears on real data |
| Ranking | Ordering candidate documents by expected usefulness | The model often sees only the highest-ranked candidates |
| Best Matching 25 (BM25) | A term-based ranking method | It begins the ranking progression described in the book |
| Learning to rank | Training a model to order search results | It moves ranking from fixed formulas toward learned decisions |
| Dense bi-encoder | A retrieval model that separately encodes queries and documents as dense vectors | It is one step in the ranking progression described in the preface |
| Learned sparse retrieval | A learned retrieval method that uses sparse representations | It is one step in the ranking progression described in the preface |
| Multi-vector retrieval | Representing an item with more than one vector | It is one step in the ranking progression described in the preface |
| Reranking | Reordering an initial candidate set | It is one step in the ranking progression described in the preface |
| Query understanding | Interpreting what a question asks before retrieval | It shapes reformulation, routing, and control flow |
| Query reformulation | Rewriting a question to make search work better | A weak query can cause failure before document ranking begins |
| Routing | Choosing which retrieval path or resource should handle a query | Routing controls whether and where retrieval happens |
| Control flow | The order, branches, and repeated steps in a pipeline | It controls how many times the system retrieves |
| Iterative retrieval | Searching more than once while building an answer | Some questions need evidence gathered in several steps |
| Self-reflective loop | A control loop in which the system judges its own need for more work | It decides whether another retrieval step is needed |
| Agentic loop | A control loop in which a model selects and repeats actions | It can decide how many times to retrieve |
| Learned controller | Trained logic that chooses a pipeline action | The preface says this logic is fragile after query distribution shifts |
| Query distribution shift | A change in the kinds of questions a system receives | The preface says learned controllers become fragile under this shift |
| Context assembly | Selecting and arranging retrieved material for the model | Successful search can still fail if the final context is poorly built |
| Context window | The text positions available to the model for the current answer | The book covers positional bias inside this window |
| Positional bias | The model treating information differently because of where it appears in the context | Evidence placement can change how well retrieved content is used |
| Attribution | Connecting an answer claim to its supporting source | It helps users see where answer content came from |
| Citation | A reference to a source attached to an answer | A citation alone does not prove that the answer is grounded |
| Post-hoc citation | A citation attached after an answer has been produced | The preface says it has little relation to whether the answer is grounded |
| Grounding | Making answer claims depend on supplied evidence | It is a stronger requirement than merely displaying citations |
| Retrieval evaluation | Measuring whether search returned useful material | It tests one layer of the system |
| Generation evaluation | Measuring the quality of the produced answer | Good retrieval does not guarantee good generation |
| System evaluation | Measuring the combined behavior that users experience | The whole system is not simply the sum of separate retrieval and generation scores |
| Source credibility | The trustworthiness of retrieved material | Unreliable evidence can produce unreliable answers |
| Provenance | A record of where data or a claim came from | It supports traceability and trust |
| Prompt injection | Malicious instructions placed in content that reaches the model | Retrieved text can attack the system through its prompt |
| Datastore poisoning | Corrupting the collection that retrieval searches | Poisoned material can steer later answers |
| Memory bandwidth | The rate at which stored data can be moved for computation | The book treats it as a durable systems constraint |
| High-dimensional geometry | The behavior of vectors with many coordinates | It shapes the limits and choices of vector retrieval |
| Token economics | The cost consequences of processing pieces of text | Context and generation choices affect operating cost |
| Abstention | Choosing not to answer when confidence or evidence is inadequate | A system needs a safe option when retrieval or generation is unreliable |

## Core mechanics

### 1. The real first decision

- What it is: Decide whether to retrieve before choosing how to retrieve.
- Why it exists: The model may already hold a correct answer. Retrieved
  material can help or disrupt it.
- What breaks without it: A team always retrieves and assumes that extra
  context must improve quality.
- Evidence stated in the source: Mallen et al. (2023) measured retrieval
  changing roughly 10% of otherwise-correct answers into wrong answers.

The common recipe embeds documents, searches for nearest neighbors, and places
the top k results in the prompt. That recipe names components. It does not state
a decision rule.

The source says almost every team that ships a language-model product also ships
retrieval. It also says production interviewers stopped accepting the
component-only recipe some time ago.

Production interviews probe this gap. They ask when not to retrieve. They also
ask why more documents can increase hallucination.

### 2. Diagnose the full pipeline

- What it is: Trace a regression through the stages that turn a question into
  an answer.
- Why it exists: End-to-end accuracy only reveals the final effect.
- What breaks without it: The team sees a quality drop but cannot identify the
  owning stage.
- Scale stated in the source: The example uses a five-stage pipeline and a
  four-point overnight accuracy drop.

The preface names HNSW graph degradation under corpus churn as another
production question. It also asks why the graph becomes the incompressible term
after vector quantization. These questions test whether a candidate can reason
about a live system rather than repeat a demo recipe.

The source does not call these exotic questions. It frames them as ordinary
Tuesday on-call work when answer quality falls four points overnight.

### 3. Join the separated literatures

- What it is: Treat model memory, retrieval, generation, context, evaluation,
  trust, and cost as one path.
- Why it exists: Each existing source family explains only part of that path.
- What breaks without it: Engineers optimize one component while treating
  neighboring components as black boxes.
- Scale stated in the source: Information retrieval contributes 50 years of
  depth. A framework demo may fit in 20 lines but fail to explain behavior at 10
  million documents.

Information-retrieval literature has 50 years of depth on ranking and evaluation
but almost nothing to say about generators. Language-model literature goes deep
on generators but often hides the index. Vector-database documentation explains
product controls. Framework tutorials create working demonstrations. None alone
assembles the entire production argument.

### 4. Use a fixed learning skeleton

- What it is: Teach each idea through first principles, evidence, a numeric
  example, a production decision, and interview framing.
- Why it exists: The repeated structure makes the material useful for both
  study and fast reference.
- What breaks without it: A reader may memorize vocabulary without gaining the
  flexibility to reason under changed constraints.
- Scale stated in the source: The skeleton repeats across 247 sections and
  frames questions at three seniority levels.

The intended reader already knows how to code and understands basic machine
learning. The book can be read from start to finish or opened at one relevant
page.

### 5. Keep the boundary explicit

- What it is: Define what the book does not try to teach.
- Why it exists: A precise boundary protects depth on production RAG reasoning.
- What breaks without it: The guide becomes a deep-learning primer, a broad
  literature survey, a vendor manual, or a company-specific interview guide.
- Change rate stated in the source: Product and framework details can change
  every quarter. The underlying arithmetic does not.

The book does not explain transformers or teach backpropagation. It does not
cover the entire retrieval literature. It does not target one vector database,
orchestration framework, embedding API, or employer.

Its generic reasoning rests on constraints that remain relevant across products.
The preface names memory bandwidth, high-dimensional geometry, and token
economics.

### 6. Cover the complete RAG path

- What it is: Organize the subject into 12 parts and 41 chapters.
- Why it exists: A design answer must connect model behavior, retrieval
  behavior, control, evaluation, trust, and scale.
- What breaks without it: A candidate can discuss a local component but cannot
  reason about the system around it.
- Scale stated in the source: Part XII closes with seven end-to-end design
  drills.

Part I maps the interview and compares retrieval with continual learning, model
editing, long context, and generative retrieval. It introduces the five-decision
skeleton for later design answers.

Parts II and III cover the generator. Topics include memorized knowledge,
confabulation, training-data privacy and law, parameter versus datastore
economics, in-context learning, prompting, sensitivity, and abstention.

Parts IV through VI build the retrieval stack. They cover representation,
chunking, approximate nearest-neighbor indexes, index memory, and ranking. The
ranking path runs from BM25 through learning to rank, dense bi-encoders, learned
sparse retrieval, multi-vector retrieval, reranking, and generative retrieval.

Part VII covers query understanding and control flow. It includes reformulation,
routing, iterative retrieval, self-reflective loops, and agentic loops that
choose how many times to retrieve.

Part VIII trains both retrieval and generation and creates training data. Parts
IX and X cover positional bias, attribution, citation, retrieval evaluation,
generation evaluation, and full-system evaluation.

Part XI covers source credibility, provenance, prompt injection, and datastore
poisoning. Part XII covers scale and seven design drills. One drill asks how to
diagnose a system that became worse without an obvious cause. The source calls
that drill the one most likely to appear in a real loop.

### 7. Derive the memory answer

- What it is: Compute HNSW memory from vector storage and graph storage.
- Why it exists: Interviewers change constraints after the first answer.
- What breaks without it: A memorized capacity number cannot adapt to a new
  dimension or compression choice.
- Cost stated in the source: An HNSW index with fp32 vectors costs 4d + 8M
  bytes per vector, where d is vector dimension and M controls stored graph
  links.

For d = 768 and M = 16, the vector term is 3,072 bytes and the graph term is 128
bytes. The total is 3,200 bytes per vector. Ten million vectors need 3.2 x 10^10
bytes, or 32 gigabytes.

At d = 1,536 with the same graph setting, the index costs 6,272 bytes per vector
and 62.7 gigabytes. The vector size nearly doubles. The graph term stays fixed.

With a 64-byte product-quantized code, the total falls to 192 bytes per vector
and 1.92 gigabytes for ten million vectors. The 128-byte graph is then two
thirds of each record. Compressing vectors further buys little because the graph
now dominates.

The lesson comes from three constraint changes, three re-derivations, and one
formula. The target skill is flexible reasoning rather than recall of the
32-gigabyte case.

### 8. Enforce an evidence rule

- What it is: Attribute each number to a named source or derive it in the
  prose.
- Why it exists: Evidence makes a surprising claim checkable.
- What breaks without it: Folklore and fluent explanation can pass as measured
  fact.
- Source policy stated in the source: Numbers without attribution or derivation
  are omitted.

Claims are attributed by author and year where they appear. The annotated
reading list in Appendix E collects the sources.

### 9. Lead with contradictions

- What it is: Put measured challenges to common RAG advice near the front.
- Why it exists: Counterexamples reveal whether a candidate understands
  conditions and trade-offs.
- What breaks without it: The candidate repeats a popular technique without
  asking whether it pays on the real data.
- Evidence posture stated in the source: The supporting number appears beside a
  claim that rejects common advice.

The preface gives four examples. Retrieval can be worse than a closed-book
answer on high-popularity facts. The measured advantage of semantic chunking
largely disappears on real data. Post-hoc citations have little relation to
whether an answer is actually grounded. Learned controllers become fragile when
the query distribution shifts.

The source says these contradictions separate a real answer from a fluent one.
It closes with the dateline Los Angeles, California, August 2026.

## Diagrams

The source pages contain no figures or tables. The following source-derived map
summarizes the prose coverage and does not replace an original visual.

```text
[What the model memorized]
             |
             v
[Representation and chunking]
             |
             v
[Indexing and ranking]
             |
             v
[Query routing and control flow]
             |
             v
[Context assembly and generation]
             |
             v
[Attribution and three-layer evaluation]
             |
             v
[Credibility, security, cost, and scale]
             |
             v
[End-to-end design drills]
```

## Whiteboard pack

### What to draw

1. Draw a box labeled `Question` on the far left.
2. Draw a decision diamond labeled `Retrieve?` to its right.
3. Draw a bypass arrow labeled `No` from the diamond to a box labeled
   `Model answer` .
4. Draw a downward arrow labeled `Yes` to a box labeled `Represent and search`
   .
5. Add boxes labeled `Index` , `Rank` , and `Assemble context` in a row after
   search.
6. Connect `Assemble context` to the same `Model answer` box.
7. Draw three boxes below the pipeline labeled `Retrieval evaluation` ,
   `Generation evaluation` , and `System evaluation` .
8. Add a side box labeled `Trust, security, cost, scale` with arrows into the
   full pipeline.
9. Write `Derive when constraints change` across the top.

### Spoken script

Retrieval-Augmented Generation is not just embed, search, and put the top
results in a prompt. The first decision is whether retrieval should happen at
all, because added documents can overturn a correct answer or increase
unsupported content. Then I trace the full path from representation and indexing
through ranking, context assembly, and generation. I evaluate retrieval,
generation, and the combined system separately. I also check credibility,
security, cost, and scale. The key interview skill is to derive the answer from
current constraints, such as vector dimension and compression, instead of
repeating one memorized capacity number.

## Interview traps

### 1. Why is `embed, search, add top k` an incomplete RAG design answer?

It names components but omits the decision that controls whether the system
should retrieve. A strong answer starts with when retrieval helps, when it can
hurt, and how the system will make or evaluate that choice.

### 2. When would you not retrieve?

Do not assume retrieval helps when the model already knows a high-popularity
fact. The preface cites Mallen et al. (2023), who measured retrieval changing
roughly 10% of otherwise-correct answers into wrong answers.

### 3. Why can adding documents increase hallucination?

Retrieved text becomes context, not guaranteed truth. Distracting or misleading
material can steer the generator away from a supported answer, so the system
must evaluate evidence selection and answer grounding.

### 4. Why can the HNSW graph dominate after quantization?

Quantization shrinks the vector term while the graph term stays fixed. In the
preface's example, a 64-byte vector code plus a 128-byte graph costs 192 bytes
per vector, so the graph occupies two thirds of the remaining memory.

### 5. A RAG system lost four accuracy points overnight. Where do you look first?

Do not guess from the end-to-end score. Check the five-stage pipeline and
separate retrieval, generation, and system evaluation so the evidence can
identify the stage that owns the regression.

## Key numbers

| Number | Context | Meaning |
|---|---|---|
| 2023 | Mallen et al. attribution | The year attached to the retrieval-harm result |
| Roughly 10% | Otherwise-correct answers | Retrieval changed this share into wrong answers in the cited measurement |
| Five stages | Production pipeline | The example asks which stage owns an end-to-end regression |
| Four points | Overnight answer-quality drop | The production example uses this regression size |
| 50 years | Information-retrieval literature | The preface describes this depth in ranking and evaluation |
| 20 lines | Framework tutorial | A small demonstration can fit in this amount of code without explaining production behavior |
| 10 million documents | Framework scale test | The preface uses this size to expose what a small tutorial does not explain |
| One idea | Per section | Each section develops the reasoning behind one idea |
| Three seniority levels | Interview framing | Each section frames its idea for three levels of interview question |
| 247 sections | Book structure | The same teaching skeleton repeats across all sections |
| One page | Reference use | The book can be opened at one relevant page instead of read only in sequence |
| Every quarter | Product change rate | Vendor, framework, and embedding API details can change at this cadence |
| 12 parts | Book structure | The parts span the full RAG path |
| 41 chapters | Book structure | The chapters organize the material inside the 12 parts |
| Five decisions | Design-answer skeleton | Part I introduces this structure for later system designs |
| Three evaluation layers | Retrieval, generation, and system | The combined system requires its own evaluation layer |
| Seven drills | End-to-end design practice | Part XII closes with this many design drills |
| 4d + 8M bytes | HNSW storage per vector | The vector term is 4d and the graph term is 8M |
| d = 768 | First HNSW case | The vector term is 3,072 bytes |
| M = 16 | First HNSW case | The graph term is 128 bytes |
| 3,200 bytes per vector | First HNSW total | This is 3,072 vector bytes plus 128 graph bytes |
| 10 million vectors | First HNSW capacity case | The collection size used for all total-memory comparisons |
| 3.2 x 10^10 bytes | First HNSW total | The raw total for ten million vectors |
| 32 gigabytes | First HNSW total | The stated capacity result for d = 768 and M = 16 |
| d = 1,536 | Second HNSW case | The larger embedding dimension nearly doubles vector memory |
| 6,272 bytes per vector | Second HNSW total | The total with the larger dimension and the same graph setting |
| 62.7 gigabytes | Second HNSW total | The stated capacity for ten million larger vectors |
| 64 bytes | Product-quantized vector code | Compression reduces each vector to this size |
| 192 bytes per vector | Compressed HNSW total | The 64-byte vector code plus the 128-byte graph |
| 1.92 gigabytes | Compressed HNSW total | The stated capacity for ten million compressed vectors |
| Two thirds | Graph share after compression | The 128-byte graph is this share of the 192-byte total |
| Three constraint changes | Derivation exercise | The example changes constraints three times |
| Three re-derivations | Derivation exercise | Each changed case is recomputed |
| One formula | Derivation exercise | All three cases follow the same storage formula |
| August 2026 | Preface dateline | The month and year printed at the end of the source unit |
