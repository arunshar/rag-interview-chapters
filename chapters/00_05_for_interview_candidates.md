# For Interview Candidates

This guide turns Retrieval-Augmented Generation (RAG) interview preparation into a decision-first plan for design, derivation, debugging, pacing, and practice.

## TL;DR

- A retrieval-focused interview can include a screen, a design round, a deep dive, and a debugging round.

- Interviewers reward explicit decisions. A list of standard components does not show judgment.

- Support every useful number with a derivation. Rework that derivation when a constraint changes.

- Structure an open-ended design around five decisions. Ask when, where, what, how, and present, in that order.

- State the cost of every technique. Fetching documents, adding more input text, splitting text by meaning, and showing source citations can fail under identifiable conditions.

- A staff-level answer reframes the question, separates objectives, and states the condition that would reverse the answer.

- Size the problem before designing it. Collection size drives storage needs, while request rate drives processing needs. Practice actively. Re-derive formulas, change constants, speak answers aloud, and break a system on purpose.

## The story

Imagine that you are auditioning to run a restaurant kitchen. A user query is a customer's order. The retriever is a pantry runner who fetches ingredients. The generator is the cook who turns those ingredients into a finished dish.

The audition has four possible rounds. A kitchen manager first checks whether you know the tools and stations. The design round asks you to plan the whole service. The deep dive keeps you at one station until your reasoning runs out. The debugging round gives you a bad dish and asks where the service failed. Behavioral and project-history conversations may sit beside these rounds, but these source pages do not cover them.

The judges watch for four signals. First, they want decisions, not a recitation of stations. Saying "receive order, prepare ingredients, cook, and plate" names work that every kitchen performs. It does not explain a choice. Second, they want quantities you can derive. A pantry size or serving-time estimate must come from visible arithmetic. Third, they change the party size, pantry capacity, or time budget and watch you recalculate. Fourth, they expect you to name each technique's cost.

Your service plan follows five decisions. When asks whether the pantry runner should leave the kitchen at all. Where chooses the pantry and handles disagreements between sources. What rewrites the order into the request the runner can use. How chooses the search method, index, and candidate depth. Present decides which ingredients reach the cook, in what order, and in what format. You then measure the result and trace any regression, meaning a drop from earlier performance, back to one of those five decisions.

The top-k question asks how many retrieved items to keep. A core candidate says that more ingredients raise the chance of finding the needed one but cost input space and spread attention. A senior candidate computes the input-token cost and uses the U-curve, a pattern where quality rises and then falls as more context arrives. A staff candidate separates k-prime, the reranker's candidate count, from k, the cook's final evidence count. That candidate also states when a second pantry trip would beat a larger final pile.

Good pacing starts before the five decisions. You ask about pantry size, order rate, serving-time limit, ingredient freshness, and the required quality. You then move through the five choices, measurement, changed limits, and a short wrap-up. Skipping sizing can confuse pantry capacity with kitchen labor. In system terms, that mistake confuses memory, which stores the search structure, with compute, which processes requests.

Preparation should look like kitchen practice, not menu reading. With one week, learn the decision frame and rehearse two timed services. With four weeks, move from foundations through search components, rules that choose which steps run, measurement, trust, scale, and full drills. With three months, build a service, judge it, remove part of the pantry, reorder ingredients, poison one source, and test whether your checks catch the damage.

For each arithmetic section, read the recipe once, cover it, rewrite it from memory, and change one constant. Then answer the interview prompts aloud in a short form and a longer form. Finish by checking that every takeaway can be explained without the page.

The common failures now look concrete. Do not merely recite the kitchen line. Do not send the pantry runner on every order. Do not treat counter space as free. Do not quote a quality score without saying what it counts. Do not confuse consistency with a bad ingredient for truth about the world. Do not replace the runner before locating the broken station. Do not assume a label on the plate proves which ingredient actually shaped the dish.

## Decoder table

| Technical term | Plain-English meaning | Why it matters |
|---|---|---|
| Retrieval-Augmented Generation (RAG) | A system that retrieves external material and gives it to a generator | It is the system family discussed in these interview pages |
| Retrieval | Fetching material for a query | It can help or hurt, so the design must decide when to use it |
| Component | One standard stage or tool in a system | Listing components does not reveal the choices between them |
| Retriever | The component that searches for candidate material | Its query, scorer, index, and depth all affect the result |
| Generator | The component that produces the final answer from the query and presented material | Presentation choices shape what the generator can use |
| Generation | Producing the final answer | It is the last stage in the component walk |
| Ingest | Loading source material into the retrieval system | It begins the seven-stage component walk but is not a decision by itself |
| Corpus | The full document collection available for search | Its size drives index memory and affects system sizing |
| Datastore | The set of sources from which retrieval can draw | Conflicts between sources can create silent contradictions |
| Query | The request given to the retrieval system | The retriever may need a transformed version of the user's words |
| Query transformation | Changing the user's request before retrieval | It can make the request more useful to the retriever |
| Query compression | Removing parts of a query before retrieval | It is one possible transformation for selected queries |
| Query expansion | Adding material to a query before retrieval | It is one possible transformation for selected queries |
| Query rewriting | Restating a query before retrieval | It is one possible transformation for selected queries |
| Query decomposition | Splitting a query into smaller requests | It is one possible transformation for selected queries |
| Chunk | A document segment used as a retrieval unit | Chunk size affects how much evidence each retrieved item carries |
| Fixed-size chunking | Splitting text into segments of a set size | The source warns that semantic chunking does not always beat it |
| Semantic chunking | Splitting text by meaning rather than only by size | Its assumed advantage is false in identifiable conditions |
| Embedding | A numeric representation used for retrieval | Its dimension enters index-memory arithmetic |
| Embedder | The component that creates embeddings | Fine-tuning it before locating a regression may target the wrong stage |
| Vector | One numeric embedding stored in the index | Per-vector bytes determine total index memory |
| Vector database | A store used to search embeddings | Naming it alone does not constitute a design decision |
| Bi-encoder | A model family named as screen-level vocabulary | A candidate should distinguish it from a cross-encoder |
| Cross-encoder | A model family contrasted with a bi-encoder | The distinction is part of the vocabulary check |
| Best Matching 25 (BM25) | A lexical scorer whose saturation and length normalization matter | A candidate should explain both effects without notes |
| Saturation | A scoring effect where additional evidence stops adding the same gain | It is one BM25 behavior the screen can probe |
| Length normalization | Adjusting a lexical score for document length | It is another BM25 behavior the candidate should explain |
| Scorer | The rule that assigns relevance scores to candidates | It belongs in the how decision |
| Ranking | Ordering candidates by their relevance scores | It is a common deep-dive topic |
| Index | A search structure over the stored material | Its memory and recall at fixed latency require explicit trade-offs |
| Approximate index | An index that gives something up to search efficiently | The screen may ask what that sacrifice is |
| Hierarchical Navigable Small World (HNSW) | The graph index used in the source's memory example | Its height and per-vector bytes are derivation targets |
| HNSW height | The number of graph levels used by the HNSW index | The four-week plan asks candidates to derive it from scratch |
| Per-vector bytes | The storage used by one indexed vector | Multiplying this value by vector count gives total index memory |
| N | The number of stored vectors in sizing arithmetic | Changing N changes total index size |
| d | The embedding dimension | Doubling d changes the vector-memory term |
| M | The graph setting used in the HNSW memory expression | It contributes the graph-memory term |
| Gate g(x) | The rule that decides whether query x triggers retrieval | It makes do not retrieve an explicit option |
| Closed-book answer | An answer produced without retrieved material | Retrieval-augmented accuracy can fall below it in stated conditions |
| Retrieval-augmented accuracy | Accuracy when retrieved material is supplied | It can be worse than closed-book accuracy on high-popularity questions |
| Accuracy | How often answers meet the correctness target | A drop in it starts the debugging example |
| Source selection | Choosing which datastore source to trust or use | A bad choice can create a contradiction that the generator resolves silently |
| Retrieval depth k-prime | The number of candidates sent into reranking | It should be optimized for the reranker's objective |
| Top-k or generator depth k | The number of retrieved items presented to the generator | It trades answer presence against token cost and attention dilution |
| Reranker | A component that reorders retrieved candidates | Its candidate depth can differ from the generator's evidence depth |
| Rerank depth | The number of candidates considered by the reranker | It affects retrieval work and should be priced |
| Serialization | The format used to turn retrieved items into generator input | It belongs in the present decision |
| Prompt position | Where retrieved evidence is placed in the generator input | Evidence position can change whether the generator uses it well |
| Context | The retrieved material placed in the generator input | More context can cost tokens and make evidence harder to use |
| Context window | The available input space for the generator | A longer window is not an automatic fix for a recall problem |
| Prefill tokens | Input tokens processed before answer generation | A larger k directly raises this cost |
| Attention dilution | The spread of model attention across more context | Extra retrieved items can make useful evidence harder to use |
| U-curve | A pattern where quality improves and then declines as k grows | It shows that a marginal document can become harmful, not only costly |
| Precision at depth 3 | How accurate the first three reranked items are | High precision there can justify a smaller generator depth |
| Abstention threshold | The confidence boundary below which the system should decline to answer | It appears in the condition for preferring a second retrieval pass |
| Second retrieval pass | Another search step after an initial result | It can be a better use of budget than enlarging k |
| Queries per second (QPS) | The incoming query rate each second | It drives compute rather than corpus memory |
| Latency | The time needed to answer a query | Index recall and reranking must fit a latency budget |
| Constraint | A limit or requirement that the design must satisfy | Changed constraints test whether the candidate can re-derive |
| Binding constraint | The requirement that most strongly shapes the design | The sizing phase should identify it before components are chosen |
| Freshness | How current the searchable material must be | It is a required sizing question in the design round |
| Accuracy bar | The required answer-quality target | It helps identify the binding system constraint |
| Memory | Storage capacity used by the index | Corpus size drives this resource |
| Compute | Processing capacity used to answer requests | Query rate drives this resource |
| Node | One machine in the source's cluster-sizing example | Bad sizing can propose 10 nodes where 2 would do |
| Hybrid retrieval | Combining retrieval approaches | The four-week plan asks candidates to say what it fixes |
| Reciprocal rank fusion | A method named for combining ranked retrieval results | The four-week plan asks candidates to explain what it fixes |
| Control flow | The rules that decide which retrieval steps run | Each method should be tied to a failure mode and a trade-off |
| Macro, micro, mezzo | The source's three-level method for localizing a regression | It turns a broad accuracy drop into a ranked list of suspects |
| Evaluation | Measuring whether a system worked | It closes the design loop and supports regression localization |
| Regression | A decline from an earlier system result | The debugging round asks the candidate to find its stage |
| Failure attribution | Locating the stage that caused a regression | It should happen before a fix is proposed |
| Derivation | Rebuilding an answer from its reasoning or arithmetic | It lets the candidate adapt when a constraint changes |
| Metric | A numeric measure of system behavior | It needs a denominator and evaluation definition |
| Denominator | The set of cases counted under a reported rate | Without it, a recall value cannot be interpreted |
| Recall at k | The share of judged relevant material found within the first k results | The value is incomplete without k and a judgment definition |
| Judgment set | The examples used to decide what retrieval results are relevant | It supplies the denominator behind a recall claim |
| Relevance grading | The rule used to label degrees of relevance | A metric cannot be interpreted without it |
| Faithfulness | Agreement between an answer and its retrieved document | An answer can be faithful to a document that is wrong |
| Factuality | Agreement between an answer and what is actually true | It is a different failure from unfaithfulness |
| Grounding | Actual support of an answer by retrieved material | A citation does not by itself prove grounding |
| Post-hoc citation | A citation attached after the answer is produced | It may bear little relation to which source shaped the answer |
| Poisoned document | A deliberately harmful source item inserted for a test | It checks whether evaluation detects source corruption |
| Fine-tuning | Updating a model on additional training data | Doing it before attribution may spend effort on the wrong component |
| Component walk | Reciting ingest, chunk, embed, index, retrieve, rerank, and generate | Every design contains the chain, so it does not show judgment |

## Core mechanics

The source says one distinction explains most of the gap between answers that advance and answers that stall. Strong candidates name decisions. Weak candidates name components. Every technique in this unit builds the decision habit before the interview.

### What the Loop Actually Looks Like

A retrieval-focused loop usually draws from four round types. The order can vary. A loop may omit some of them.

#### The screen

**What it is:** A 30 to 45 minute conversation. A hiring manager often conducts it rather than a specialist.

**Why it exists:** It tests whether the candidate's vocabulary is real. Example probes include the difference between a bi-encoder and cross-encoder, BM25 saturation, and the sacrifice made by an approximate index.

**What fails without the knowledge:** A candidate can name a term but cannot explain its behavior or trade-off. The book maps its core questions to this round.

#### The design round

**What it is:** A 45 to 60 minute open-ended prompt. Source examples include designing retrieval for a support assistant and serving 100 million documents at 500 QPS.

**Why it exists:** It tests whether the candidate can turn constraints into explicit choices. The five-decision skeleton supports this round. Chapter 41 drills it seven times.

**What fails without the structure:** The answer becomes a component list. It does not expose which choices respond to the binding constraint.

#### The deep dive

**What it is:** A specialist pushes one component until the candidate runs out of derivation. Common targets are indexing from Chapters 15 to 17, ranking from Chapters 18 to 22, and evaluation from Chapters 32 to 34.

**Why it exists:** It tests depth rather than broad vocabulary. The book calibrates its senior questions to this round.

**What fails without derivation:** Memorized conclusions stop working when the specialist changes a number or asks where a term came from.

#### The debugging round

**What it is:** The candidate receives a system that regressed and must decide what to inspect. The source says this round is increasingly common and receives the least preparation.

**Why it exists:** It tests end-to-end failure attribution. Chapter 34 supplies the macro, micro, mezzo method. Section 41.6 supplies the worked instance.

**What fails without attribution:** The candidate jumps to a favorite fix before finding the broken stage.

Behavioral and project-history rounds can sit beside these four. The source pages do not cover them.

### What the Interview Actually Tests

Interviewers collect three general signals at once. They also collect a fourth signal specific to retrieval.

#### Signal 1: Decisions instead of components

**What it is:** The candidate chooses among alternatives. The candidate does not merely say, "chunk, embed, store, and retrieve the top 5."

**Why it matters:** Those components appear in every design. Their names have no discriminative power. A component vocabulary also lacks a component named do not retrieve.

**What fails without it:** The answer cannot express the system's highest-leverage choice. Section 3.1 develops a complete decision-based alternative.

#### Signal 2: Numbers with derivations

**What it is:** The candidate gives a number and explains every term. The source contrasts "HNSW uses a lot of memory" with a worked statement using d = 768 and M = 16.

The stated expression is 4d + 8M = 3,200 bytes per vector. Ten million vectors then need 32 gigabytes (GB). The 128-byte graph term does not compress.

**Why it matters:** Appendix A supplies formulas as vocabulary. The chapters explain where the terms come from.

**What fails without it:** An interviewer who hears a number will almost always ask where it came from. Saying "I read it somewhere" costs more than not giving the number.

#### Signal 3: Re-derivation under a changed constraint

**What it is:** The interviewer changes a dimension, corpus size, or latency budget. Source examples raise the embedding dimension to 1,536, multiply corpus size by 50 on one machine, or halve the latency budget.

**Why it matters:** The source calls this the most reliable signal in a live interview. A candidate who derived the first answer can rerun the arithmetic in about 30 seconds.

**What fails without it:** A candidate who memorized an architecture must start over while the interviewer watches.

#### Signal 4: Technique cost

**What it is:** The candidate says when a method harms the system or spends a resource.

**Why it matters:** This retrieval-specific signal is the one the source leans on hardest. RAG folklore assumes retrieval helps, more context is better, citations imply grounding, and semantic chunking beats fixed-size chunking. The source says each assumption is measurably false in identifiable conditions.

**What fails without it:** The answer repeats optimistic defaults. It does not identify the conditions that reverse the recommendation. A candidate who knows those conditions can give an answer nobody else in the loop gave.

### The Answer Skeleton

Nearly every open-ended RAG design can be organized around five decisions. They are not a checklist assembled from experience. Section 3.1 derives them as the complete set of free parameters in `y = GEN_θ(x, RET(x, D))`. Here, `GEN` is the generator, `RET` is retrieval, x is the query, and D is the datastore.

Use the five decisions in order. Say the order aloud.

#### 1. When

**What it is:** State the retrieval gate g(x) first. The gate decides whether query x should trigger retrieval.

**Why it exists:** Retrieval is neither free nor neutral. Mallen et al. (2023) measured retrieval flipping roughly 10 percent of otherwise-correct answers to wrong. Retrieval-augmented accuracy on high-popularity questions sits below closed-book accuracy outright. Section 1.5 gives these results.

**What fails without it:** Always retrieve becomes an unexamined default. The design cannot express the option that retrieval should not run.

**Stated cost:** Retrieval can reverse an otherwise-correct answer. Section 25.1 develops the retrieval gate. Naming and pricing it first is the cheapest way to signal that the candidate has run one of these systems.

#### 2. Where

**What it is:** Name the datastore sources. State what happens when two sources disagree.

**Why it exists:** A datastore is not a single undifferentiated thing. Source choice controls which evidence reaches the generator. Section 25.3 develops source selection.

**What fails without it:** The generator receives a silent contradiction and resolves it on its own.

**Stated cost:** The main cost of wrong source selection is not latency. It is an unresolved contradiction.

#### 3. What

**What it is:** Choose the query that the retriever sees. Options named in the source are compression, expansion, rewriting, and decomposition.

**Why it exists:** The useful retrieval request may differ from the string typed by the user. Chapter 24 covers these transformations.

**What fails without it:** The design assumes one transformation fits every query. It also fails to say which queries receive the change.

#### 4. How

**What it is:** Choose the scorer, index, and retrieval depth k-prime.

**Why it exists:** This decision ties implementation choices to arithmetic. The candidate should discuss index memory, recall at a fixed latency, and rerank depth.

**What fails without it:** The answer names an index but does not price its memory, recall, or latency behavior. Chapters 15 to 22 supply the relevant stack.

#### 5. Present

**What it is:** Decide ordering, truncation from k-prime to k, serialization, and position in the prompt.

**Why it exists:** Retrieved material must be shaped before the generator sees it. Chapters 30 and 31 cover these choices.

**What fails without it:** The generator receives too much, badly ordered, badly formatted, or poorly positioned material.

**Stated cost:** The field discusses presentation least and pays for it most.

#### Close the loop

**What it is:** State how to measure success. State how to locate a future failure among the five stages.

**Why it exists:** A design needs both evaluation and diagnosis. Chapter 34 provides the localization approach.

**What fails without it:** The candidate cannot show that the system worked or identify the stage that later stopped working.

Chapter 41 applies the full skeleton seven times against seven binding constraints.

### What Separates Core, Senior, and Staff Answers

The difference is not the amount of knowledge. It is how the candidate reshapes a question. The source uses "How do you choose top-k?" as the example.

| Level | What the answer does |
|---|---|
| Core | Names both sides of the trade-off. A larger k raises the chance that the answer is present, costs prefill tokens, and dilutes attention across the context. |
| Senior | Derives the trade-off. At 512-token chunks, k = 20 gives 10,240 prefill tokens. The candidate prices this against latency and cost, then uses the U-curve from Section 30.1 to show that a marginal document can become harmful. |
| Staff | Rejects the premise that one k serves every stage. The candidate separates k-prime for the reranker from k for the generator. If reranker precision at depth 3 already exceeds the abstention threshold, the candidate cuts k and spends the budget on a second retrieval pass. |

**Why the distinction matters:** A staff answer is not longer. It changes the shape of the question and says what condition would make the answer wrong.

**What fails without it:** More detail can still leave the premise untested. The answer never exposes different objectives or reversal conditions.

### Timing a 45-Minute Design Round

The source gives this rough pacing plan.

| Phase | Time | What you are doing |
|---|---|---|
| Requirements and sizing | 4 to 6 min | Ask about corpus size, QPS, latency, freshness, and the accuracy bar. Ask which constraint binds. |
| Decision 1: when | 2 to 3 min | State the gate. Price retrieval rather than assuming it. |
| Decisions 2 to 4 | 12 to 15 min | Cover sources, query transformation, scorer, and index. Derive memory or latency. |
| Decision 5: present | 5 to 7 min | Cover ordering, truncation, format, and position. |
| Evaluation | 5 to 7 min | Name the measurements. Explain how to localize a regression to one stage. |
| Constraint changes | 5 to 8 min | Re-derive answers after interviewer follow-ups. |
| Wrap-up | 2 min | Summarize the five decisions and invite feedback. |

#### Requirements and sizing

**What it is:** Gather corpus size, query rate, latency, freshness, and accuracy requirements before selecting components.

**Why it exists:** Corpus size and query rate drive different resources. Corpus size drives memory. Query rate drives compute.

**What fails without it:** The source calls this the most commonly skipped and most damaging phase. Collapsing the two sizing numbers into one instinct can produce a 10-node cluster where 2 nodes would do.

### Preparation Plans

#### One Week

**What to do:** Follow the one-week path in the source's How to Use This Book section. Read Chapters 3 and 34 first. Then read Chapters 1, 15, 18, 22, 25, 30, and 32.

Spend the last two days on Sections 41.1 and 41.6. Run them as timed drills without references.

**Why this plan exists:** It prioritizes a partial map that supports reasoning.

**What fails without it:** Skimming a complete map does not create the same ability to derive an answer.

#### Four Weeks

Study actively for roughly two hours each day. Keep the sequence fixed. Adjust time per topic as needed.

##### Week 1: Foundation

**Coverage:** Parts I to III, Chapters 1 to 11, and Appendix A.

**Practice:** Close the book after each chapter and re-derive the key formulas on paper.

**Targets:** State the five decisions cold. Explain why retrieval can make an answer worse. Derive index memory for any N, d, and M given verbally.

##### Week 2: The retrieval stack

**Coverage:** Parts IV to VI, Chapters 12 to 23.

**Practice:** Work every example with a calculator.

**Targets:** Derive HNSW height and per-vector bytes from scratch. Explain BM25 saturation and length normalization without notes. Describe hybrid retrieval and reciprocal rank fusion, then say what each fixes.

##### Week 3: Control flow and evaluation

**Coverage:** Parts VII to X, Chapters 24 to 34.

**Practice:** For every control-flow method, write one sentence naming the failure it addresses and what it trades away.

**Targets:** Run macro, then micro, then mezzo on a described regression. Produce a ranked list of suspects.

##### Week 4: Trust, scale, and drills

**Coverage:** Parts XI to XII, Chapters 35 to 41, at one chapter per day.

**Practice:** Spend the last three days on Sections 41.1, 41.3, and 41.6. Run 45-minute mock interviews on paper or a whiteboard without references.

**Targets:** Compare each attempt against the chapter. Record which constraints appeared late and which numbers could not be derived. Those two lists become the remaining study plan.

#### Three Months

**What to do:** Read linearly at roughly three sections per day. Build a system alongside the reading. Index a corpus you care about. Write your own relevance judgments. Measure recall at k.

Break the system deliberately. Delete one third of the index. Shuffle context order. Poison one document. Check whether evaluation catches each break.

**Why this plan exists:** Candidates who have watched their own system fail answer debugging questions differently from candidates who have only read about failure.

**What fails without it:** Passive knowledge does not supply observed failure behavior or tested evaluation.

### How to Drill a Section

Passive reading does not build a derivation habit. Use this loop for every section that contains arithmetic.

1. Read the section once. Follow the derivation with a pencil.

2. Cover the page. Write the key formula from memory.

3. Change one constant. Double d, halve the latency budget, or multiply N by 50. Re-derive the result.

4. Answer the three How This Shows Up in Interviews questions aloud. Target 90 seconds first. Then expand to a full five-minute version.

5. Read the Key Takeaways. Verify that you can explain every line without the book.

**Why it exists:** Step 3 rehearses the exact move an interviewer will make.

**What fails without it:** Familiarity with a derivation can be mistaken for the ability to reproduce and adapt it.

Use Appendix B when you want to test retention. Its questions are held apart from their answers. The chapters deliberately do not hold them apart.

### Common Failure Modes

#### The component walk

**Failure:** The candidate recites ingest, chunk, embed, index, retrieve, rerank, and generate.

**Why it fails:** Every design contains all seven stages. The list conveys no decision. Section 3.1 supplies the replacement.

#### Never questioning whether to retrieve

**Failure:** The candidate treats always retrieve as the neutral default.

**Why it fails:** Always retrieve is a design choice with a measured cost. Candidates who raise the choice without prompting are rare enough that interviewers remember it.

#### Treating context as free

**Failure:** The candidate proposes a larger k or longer context as the automatic fix for poor recall.

**Why it fails:** Chapter 30 supplies the counterargument. A retrieval-augmented answer can be worse than a closed-book answer when evidence appears in the middle of a long context.

#### Quoting a metric without its denominator

**Failure:** The candidate says, "Recall is 0.9," without stating k, the judgment set, or the relevance grading rule.

**Why it fails:** The number cannot be interpreted. Chapter 32 derives the metrics so the candidate can state their denominators precisely.

#### Confusing faithfulness with factuality

**Failure:** The candidate treats agreement with retrieved text as proof that the answer is true.

**Why it fails:** An answer can be perfectly faithful to a retrieved document that is wrong. Chapters 4 and 33 keep the two failures and their fixes separate.

#### Proposing a fix before attributing the failure

**Failure:** The candidate hears that accuracy dropped and immediately proposes fine-tuning the embedder.

**Why it fails:** The proposal skips the question of which stage regressed. Chapter 34 gives the attribution method. Section 41.6 works through it end to end.

#### Citations as an attribution story

**Failure:** The candidate promises source citations and assumes that they prove grounding.

**Why it fails:** Post-hoc citations bear little relation to whether the answer was actually grounded in those sources. Section 31.3 gives this result. The source calls it a reliable senior-level trap.

## Diagrams

The manifest records zero figures and zero tables for physical source pages 19 to 23. The source contains no numbered figure or table captions to normalize.

The two unnumbered tabular layouts are preserved under Core mechanics. They compare answer levels and give the 45-minute pacing plan.

## Whiteboard pack

### Numbered drawing order

1. Write the open-ended design prompt at the upper left.

2. Draw a requirements box beside it. Label it corpus size, QPS, latency, freshness, and accuracy bar.

3. Draw five boxes in one row. Label them When, Where, What, How, and Present.

4. Under When, write gate g(x) and retrieval cost.

5. Under Where, write sources, disagreement, and silent contradiction.

6. Under What, write compress, expand, rewrite, and decompose.

7. Under How, write scorer, index, k-prime, memory, recall, and latency.

8. Under Present, write k, order, truncation, format, and prompt position.

9. Draw an arrow from Present to an Evaluation and Debugging box. Draw a return arrow to the five decisions and label it localize the regression.

10. Add a side box labeled Staff lens. Inside it, write separate objectives, change a constraint, state the cost, and name the reversal condition.

### 90-100 word script

A strong RAG answer starts with constraints, not a component list. I first size the corpus, query rate, latency, freshness, and accuracy bar. Then I make five decisions in order. I decide when retrieval should run, where evidence comes from, what query reaches the retriever, how scoring and indexing work, and how evidence reaches the generator. I attach a number and a cost to each choice. Then I close the loop with evaluation and stage-level debugging. If a constraint changes, I re-derive the design. That decision-first structure shows judgment, arithmetic, trade-offs, and failure attribution.

## Interview traps

### 1. Why is a component walk a weak design answer?

Every retrieval design includes ingest, chunk, embed, index, retrieve, rerank, and generate. Reciting the chain does not expose a decision, a constraint, or the option not to retrieve.

### 2. When would you not use retrieval?

Do not assume retrieval is neutral. The source reports that it flipped roughly 10 percent of otherwise-correct answers to wrong, and retrieval-augmented accuracy fell below closed-book accuracy on high-popularity questions.

### 3. What should follow any number you state?

Show where every term came from and rerun the arithmetic when a constraint changes. A memorized number invites a derivation question that the candidate cannot answer.

### 4. How should you answer "How do you choose top-k?"

Separate k-prime for the reranker from k for the generator because the stages optimize different objectives. Price answer presence, prefill tokens, and attention dilution, then state the condition that would favor a smaller k or a second retrieval pass.

### 5. Why do citations not prove grounding?

A post-hoc citation can be attached without showing that the cited source shaped the answer. Faithfulness to retrieved text, factual correctness, citation presence, and actual grounding must remain separate claims.

## Key numbers

| Number or range | Context | Meaning or trade-off |
|---|---|---|
| 4 round types | Retrieval-focused loop | Screen, design, deep dive, and debugging can appear in varying order, and a loop may omit some |
| 30 to 45 min | Screen | Typical source-stated duration |
| 45 to 60 min | Design round | Typical source-stated duration |
| 100 million documents and 500 QPS | Example design prompt | Forces the candidate to size storage and query processing separately |
| 7 drills | Chapter 41 | Applies the five-decision skeleton seven times |
| 3 general signals plus 1 retrieval-specific signal | Interview evaluation | Decisions, derived numbers, changed constraints, and technique cost |
| Top 5 | Weak component-list example | A retrieval depth stated without a choice or derivation has little discriminative value |
| d = 768 and M = 16 | HNSW memory example | Inputs to the source's per-vector calculation |
| 4d + 8M = 3,200 bytes per vector | HNSW memory example | Derived storage per vector in the stated case |
| 10 million vectors and 32 GB | HNSW memory example | Total index memory in the stated case |
| 128 bytes | HNSW memory example | Graph term that the source says does not compress |
| d = 1,536 | Changed-constraint example | Tests whether the candidate can recompute for a larger embedding |
| Corpus multiplied by 50 | Changed-constraint example | Tests whether the design can remain on one machine |
| Latency budget divided by 2 | Changed-constraint example | Tests whether the candidate can re-derive under tighter time |
| About 30 seconds | Changed-constraint response | Expected arithmetic rerun for a candidate who derived the original answer |
| 5 decisions | Answer skeleton | When, where, what, how, and present |
| Decisions versus components | Interview answer shape | Decisions expose judgment, while a standard component list does not |
| Retrieve versus do not retrieve | When decision | Retrieval can help, but it is neither free nor neutral |
| Roughly 10 percent | Retrieval gate evidence | Otherwise-correct answers flipped to wrong in the cited Mallen et al. (2023) result |
| Source choice versus latency | Where decision | A wrong source can create a silent contradiction, which is more important here than latency |
| k-prime to k | Presentation | Truncate the reranker candidate set to the generator evidence set |
| Larger k | Top-k trade-off | Raises the chance that evidence is present but costs prefill tokens and dilutes attention |
| 512 tokens times k = 20 gives 10,240 tokens | Senior top-k answer | Prices generator prefill before latency and cost trade-offs |
| Depth 3 | Staff top-k condition | If reranker precision already exceeds the abstention threshold here, cut k and consider a second pass |
| One k versus two depths | Staff top-k answer | The reranker and generator have different objectives, so k-prime and k should be separated |
| More context versus useful context | Presentation trade-off | A marginal document can become harmful rather than merely expensive |
| 45 min | Design-round pacing frame | Total round named by the pacing section |
| 4 to 6 min | Requirements and sizing | Gather corpus size, QPS, latency, freshness, and accuracy bar |
| 2 to 3 min | Decision 1 | State and price the retrieval gate |
| 12 to 15 min | Decisions 2 to 4 | Cover sources, query transformation, scorer, index, and arithmetic |
| 5 to 7 min | Decision 5 | Cover ordering, truncation, format, and position |
| 5 to 7 min | Evaluation | Name measurements and regression localization |
| 5 to 8 min | Constraint changes | Re-derive after interviewer follow-ups |
| 2 min | Wrap-up | Summarize the five decisions and invite feedback |
| 2 sizing numbers | Requirements | Corpus size drives memory, while query rate drives compute |
| 10 nodes versus 2 nodes | Sizing failure | Example cost of collapsing memory and compute into one instinct |
| 1 week | Short preparation plan | Read Chapters 3 and 34 first, then Chapters 1, 15, 18, 22, 25, 30, and 32 |
| Last 2 days | One-week plan | Drill Sections 41.1 and 41.6 without references |
| 4 weeks and roughly 2 hours per day | Medium preparation plan | Fixed sequence with flexible time by topic |
| Week 1, Parts I to III, Chapters 1 to 11 | Four-week foundation | Re-derive formulas and learn the five decisions, retrieval harm, and index sizing |
| Week 2, Parts IV to VI, Chapters 12 to 23 | Four-week retrieval stack | Derive HNSW properties and explain BM25, hybrid retrieval, and reciprocal rank fusion |
| Week 3, Parts VII to X, Chapters 24 to 34 | Four-week control flow and evaluation | Name each failure and trade-off, then run macro, micro, mezzo |
| Week 4, Parts XI to XII, Chapters 35 to 41 | Four-week trust, scale, and drills | Read one chapter per day |
| Last 3 days and 45 min per mock | Week 4 drills | Work Sections 41.1, 41.3, and 41.6 on paper or a whiteboard without references |
| 3 months and roughly 3 sections per day | Long preparation plan | Read linearly while building and testing a system |
| Delete 1 third of the index | Deliberate break | Test whether evaluation catches missing indexed material |
| 5 drill steps | Arithmetic practice | Read, reproduce, change, speak, and verify |
| Double d, halve latency, or multiply N by 50 | Drill perturbations | Force a fresh derivation instead of recall |
| 3 interview questions, 90 seconds, then 5 min | Spoken drill | Start with a short answer and expand it |
| 7 component stages | Component-walk failure | Ingest, chunk, embed, index, retrieve, rerank, and generate appear in every design |
| Recall = 0.9 | Metric failure example | The claim is incomplete without k, a judgment set, and relevance grading |
