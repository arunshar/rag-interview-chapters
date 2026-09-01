# RAG Interview Study Edition

A whiteboard-ready Markdown study guide for Retrieval-Augmented Generation (RAG) interviews, system design discussions, and production engineering reviews.

This repository converts the structure of *The RAG Interview* into 57 self-contained study units. Each unit helps a reader explain the material cold, draw the core system on a whiteboard, reason through trade-offs, and answer follow-up questions without relying on the original PDF during practice.

## Start here

- Browse the complete [study index](00_INDEX.md) for source spans, reading-time estimates, and focused reading paths.
- Open the [chapter directory](chapters/) to study one topic at a time.
- Download [rag-interview-chapters.zip](rag-interview-chapters.zip) for the verified portable package.
- Reuse the project-scoped [RAG Interview Study Edition skill](.agents/skills/rag-interview-study-edition/SKILL.md) from Codex or share its folder with Fable.
- Begin with [For Interview Candidates](chapters/00_05_for_interview_candidates.md), [Chapter 1](chapters/01_what_a_rag_interview_actually_tests.md), and [Chapter 3](chapters/03_a_repeatable_framework_for_any_rag_design_question.md) if an interview is close.
- Use [Chapter 41](chapters/41_end_to_end_design_drills.md) and [Appendix A2](chapters/A2_question_bank.md) for rehearsal after completing a technical path.

## What every study unit contains

Each unit follows the same interview-oriented structure:

1. A title and one-sentence purpose.
2. A `TL;DR` with five to eight plain-language takeaways.
3. A sustained explanatory story or analogy that translates the unit's technical ideas.
4. A three-column Decoder table for terminology, symbols, metrics, models, and named systems.
5. Core mechanics covering what each concept is, why it exists, what fails without it, and its stated cost or complexity when applicable.
6. Recreated figures and tables using Mermaid, Markdown tables, ASCII diagrams, or precise prose descriptions.
7. A Whiteboard pack with drawing order and a roughly 100 word spoken explanation.
8. Interview traps with concise two or three sentence answers.
9. A Key numbers table whenever the source commits to concrete values, thresholds, or trade-offs.

## Repository structure

```text
.
|-- README.md
|   Repository overview, navigation, chapter guide, and verification summary
|-- 00_INDEX.md
|   Complete 57-unit index with source spans, reading times, and study routes
|-- chapters/
|   |-- 00_01_title_page.md through 00_09_about_the_author.md
|   |   Front matter, study method, notation, and orientation
|   |-- 01_what_a_rag_interview_actually_tests.md through 41_end_to_end_design_drills.md
|   |   Forty-one technical and interview-practice chapters
|   `-- A1_formula_sheet.md through A7_glossary.md
|       Formula, question, checklist, reporting, reading, notation, and glossary references
|-- .agents/skills/rag-interview-study-edition/
|   |-- SKILL.md
|   |   Reusable workflow entrypoint for building, auditing, packaging, and publishing an edition
|   |-- references/ and assets/
|   |   Chapter contract, verification rules, handoff guidance, recap, and templates
|   `-- scripts/
|       Markdown, Mermaid, package, and README verification helpers
`-- rag-interview-chapters.zip
    Verified portable package containing 00_INDEX.md and chapters/
```

The ZIP intentionally contains only the study index and the 57 unit files. The repository README and reusable skill remain outside that portable study package.

## Reuse the workflow

This repository includes the project-scoped [RAG Interview Study Edition skill](.agents/skills/rag-interview-study-edition/SKILL.md). A new Codex session opened anywhere in this checkout can invoke it with:

```text
Use $rag-interview-study-edition to audit this study edition without changing files.
```

To install the same skill for use outside this repository, ask Codex:

```text
Use $skill-installer to install the skill from https://github.com/arunshar/rag-interview-chapters/tree/main/.agents/skills/rag-interview-study-edition
```

For Fable, share the `.agents/skills/rag-interview-study-edition/` folder and ask it to read `SKILL.md` first. The skill does not grant standing permission for pushes, releases, repository creation, or visibility changes. Each external mutation still requires current authorization.

## Suggested reading paths

### Fast interview loop

Read the interview guide, Chapters 1 and 3, and the retrieval stack in Chapters 15 through 18. Continue with Chapters 21, 22, 24, 25, and 26 for hybrid retrieval, reranking, query reformulation, routing, and iterative control. Add evaluation in Chapters 30 through 34 and trust and systems in Chapters 35 through 38. Finish with Chapter 41 and Appendices A1, A2, A3, and A6.

### Complete technical path

Read the nine front-matter units first. Continue through Chapters 1 through 41 in book order, then use Appendices A1 through A7 as calculation, practice, review, and terminology references.

### Production system path

Start with Chapters 3, 12, 13, and 14 for system framing and ingestion. Continue with Chapters 15 through 17, 21, and 22 for retrieval infrastructure. Add Chapters 24 through 26 and 30 for query control and context assembly. Validate with Chapters 31 through 38 and Appendix A4.

### Evaluation and trust path

Read Chapters 5, 10, and 11 for data boundaries, prompt sensitivity, and abstention. Continue with Chapters 27 through 29 for training limits, then Chapters 31 through 38 for attribution, evaluation, credibility, attacks, operations, and distributed governance.

The [full index](00_INDEX.md) gives the exact sequence for each path and an estimated reading time for every unit.

## Book map at a glance

| Source part | Chapters | Main focus |
|---|---:|---|
| I. The RAG Interview Landscape | 1 to 3 | What interviews test, alternatives to retrieval, and a repeatable design framework |
| II. The Generator Side | 4 to 8 | Generator capabilities, failure ownership, privacy, economics, in-context learning, and model circuits |
| III. Prompting and Context Construction | 9 to 11 | Prompting boundaries, prompt sensitivity, abstention, and calibration |
| IV. Representing What You Retrieve | 12 to 14 | Text representations, chunking, tables, layout, and document structure |
| V. Indexing and Vector Search | 15 to 17 | Approximate nearest neighbors, compression, index economics, and vector-store operations |
| VI. Retrieval and Ranking | 18 to 23 | Classical information retrieval, learning to rank, dense and sparse retrieval, reranking, and generative retrieval |
| VII. Query Understanding and Control Flow | 24 to 26 | Reformulation, routing, adaptive retrieval, and iterative agentic control |
| VIII. Training the RAG System | 27 to 29 | Generator tuning, retriever training, and bootstrapped supervision |
| IX. Generation and Context Assembly | 30 to 31 | Position-dependent context failures, attribution, and citation |
| X. Evaluation | 32 to 34 | Retrieval, generation, and end-to-end system evaluation |
| XI. Trust, Credibility, and Adversarial Robustness | 35 to 36 | Source credibility, provenance, hostile content, and access boundaries |
| XII. Scaling, Advanced Variants, and Design Drills | 37 to 41 | Latency, cost, federation, multimodality, graph RAG, and full design exercises |

## Detailed chapter guide

### Front matter: orientation and study strategy

| Unit | What it prepares you to explain |
|---|---|
| [00.01. Title Page](chapters/00_01_title_page.md) | Establishes the edition's scope, provenance, version, contact routes, and foundational RAG and artificial intelligence terminology. |
| [00.02. Contents](chapters/00_02_contents.md) | Turns the full contents into an interview-oriented navigation map for locating concepts and planning study sessions. |
| [00.03. Preface](chapters/00_03_preface.md) | Frames RAG as a production reasoning discipline rather than a simple list of components. |
| [00.04. How to Use This Book](chapters/00_04_how_to_use_this_book.md) | Explains reading routes, recurring unit structure, interview tags, references, and effective appendix use. |
| [00.05. For Interview Candidates](chapters/00_05_for_interview_candidates.md) | Provides a decision-first plan for design reasoning, derivations, debugging, pacing, and deliberate practice. |
| [00.06. For Practicing Engineers](chapters/00_06_for_practicing_engineers.md) | Maps technical material to engineering decisions, failure modes, costs, and operational trade-offs. |
| [00.07. Notation and Symbols](chapters/00_07_notation_and_symbols.md) | Defines symbols, abbreviations, overloaded terms, and measurement conventions used across the guide. |
| [00.08. Acknowledgments](chapters/00_08_acknowledgments.md) | Records the people and sources that shaped the work and its emphasis on practical evidence and negative results. |
| [00.09. About the Author](chapters/00_09_about_the_author.md) | Introduces Hao Hoang, the book's motivation and authorship, and its stated contact and correction channels. |

### Part I: The RAG Interview Landscape

| Chapter | What it prepares you to explain |
|---|---|
| [1. What a RAG Interview Actually Tests](chapters/01_what_a_rag_interview_actually_tests.md) | How to route knowledge to the right store, estimate the cost of that choice, and recognize when retrieval is not the right solution. |
| [2. The Competing Answers to the Same Problem](chapters/02_the_competing_answers_to_the_same_problem.md) | How continual learning, model editing, long context, generative retrieval, and RAG fit different constraints and cost structures. |
| [3. A Repeatable Framework for Any RAG Design Question](chapters/03_a_repeatable_framework_for_any_rag_design_question.md) | How to turn an underspecified prompt into explicit requirements, component choices, measurable trade-offs, and a defensible answer. |

### Part II: The Generator Side

| Chapter | What it prepares you to explain |
|---|---|
| [4. What the LLM Brings and What It Breaks](chapters/04_what_the_llm_brings_and_what_it_breaks.md) | How to separate useful generator behavior from failure modes and assign each failure to the component that should own the fix. |
| [5. Data, Privacy, and the Legal Surface](chapters/05_data_privacy_and_the_legal_surface.md) | How RAG changes the cost, evidence, and reversibility of data decisions without replacing legal judgment. |
| [6. Scaling Laws and the Economics of Retrieval vs Parameters](chapters/06_scaling_laws_and_the_economics_of_retrieval_vs_parameters.md) | How to allocate training, serving, memory, and retrieval budgets across a RAG system. |
| [7. In-Context Learning: The Mechanism RAG Rides On](chapters/07_in_context_learning_the_mechanism_rag_rides_on.md) | How RAG uses in-context learning, when supervised fine-tuning is better, and how selection, format, order, and cost shape the design. |
| [8. Reading the Machine: Circuits, Induction Heads, and Attribution](chapters/08_reading_the_machine_circuits_induction_heads_and_attribution.md) | How residual streams, attention circuits, induction heads, and attribution support careful diagnosis without overstating model-level evidence. |

### Part III: Prompting and Context Construction

| Chapter | What it prepares you to explain |
|---|---|
| [9. Prompting for Retrieval-Augmented Systems](chapters/09_prompting_for_retrieval_augmented_systems.md) | Where prompting ends, where retrieval begins, how reasoning scaffolds change decoding, and why extra calls or passages can reduce quality. |
| [10. Prompt Sensitivity](chapters/10_prompt_sensitivity.md) | How meaning-preserving prompt changes alter a RAG system and how to measure sensitivity before choosing a template. |
| [11. Abstention and Calibration](chapters/11_abstention_and_calibration.md) | How to make refusal decisions, build confidence signals, and keep those signals calibrated for short and long answers. |

### Part IV: Representing What You Retrieve

| Chapter | What it prepares you to explain |
|---|---|
| [12. Text Representation](chapters/12_text_representation.md) | How text representations trade exact matching, semantic reach, operational stability, training cost, and privacy. |
| [13. Chunking and Granularity](chapters/13_chunking_and_granularity.md) | How to choose retrieval units, preserve context, route across granularities, and measure whether chunking improved retrieval. |
| [14. Beyond Plain Text: Tables, Layout, Documents](chapters/14_beyond_plain_text_tables_layout_documents.md) | What structure is lost during flattening and how encoders, layout priors, metrics, invariance limits, and costs address that loss. |

### Part V: Indexing and Vector Search

| Chapter | What it prepares you to explain |
|---|---|
| [15. Approximate Nearest Neighbor Search](chapters/15_approximate_nearest_neighbor_search.md) | How to choose and defend an approximate nearest neighbor index under recall, latency, memory, build-time, and update constraints. |
| [16. Compression and Index Economics](chapters/16_compression_and_index_economics.md) | How to build an index budget from code length, scoring error, scan behavior, and fleet multipliers without confusing vector size with system footprint. |
| [17. Operating a Vector Store](chapters/17_operating_a_vector_store.md) | How deletion, growth, metadata, filtering, and natural-language constraints affect the retrieval layer after deployment. |

### Part VI: Retrieval and Ranking

| Chapter | What it prepares you to explain |
|---|---|
| [18. Classical IR You Are Expected to Know](chapters/18_classical_ir_you_are_expected_to_know.md) | How lexical ranking works, where its assumptions fail, and why sparse retrieval protects rare and exact-match queries. |
| [19. Learning to Rank](chapters/19_learning_to_rank.md) | How ranking objectives connect to ranked-list metrics and how pointwise, pairwise, listwise, representation, interaction, and hybrid designs differ. |
| [20. Dense Retrieval](chapters/20_dense_retrieval.md) | How to train and serve dense retrieval, combine it with lexical search, price it, and extend it across languages. |
| [21. Learned Sparse and Multi-Vector Retrieval](chapters/21_learned_sparse_and_multi_vector_retrieval.md) | How learned lexical weights, token-level interaction, compression, pruning, and rank fusion trade quality against index size and latency. |
| [22. Reranking](chapters/22_reranking.md) | Why a second ranking stage helps, how to size its candidate set, and how cross-encoders and language-model ranking modes affect cost and diagnosis. |
| [23. Generative Retrieval](chapters/23_generative_retrieval.md) | What changes when a model retrieves by generating document identifiers, why updates remain hard, and how recitation can complement RAG. |

### Part VII: Query Understanding and Control Flow

| Chapter | What it prepares you to explain |
|---|---|
| [24. Query Reformulation](chapters/24_query_reformulation.md) | How to diagnose weak queries, expand or rewrite them, repair conversational context, and search through hypothetical answers. |
| [25. Routing and Adaptive Retrieval](chapters/25_routing_and_adaptive_retrieval.md) | How a system decides whether to retrieve, where to search, which operation to invoke, and how to handle unfamiliar queries safely. |
| [26. Iterative, Recursive, and Agentic Retrieval](chapters/26_iterative_recursive_and_agentic_retrieval.md) | How repeated retrieval loops critique evidence, learn search behavior, fan out across sources, and stop before more rounds reduce value. |

### Part VIII: Training the RAG System

| Chapter | What it prepares you to explain |
|---|---|
| [27. Fine-tuning the Generator](chapters/27_fine_tuning_the_generator.md) | How to decide whether an error belongs to the generator and choose training objectives without conflating behavior, knowledge, robustness, and memory efficiency. |
| [28. Training the Retriever](chapters/28_training_the_retriever.md) | How to connect generator utility to a discrete retriever and account for the index work created by retriever updates. |
| [29. Bootstrapping Training Data](chapters/29_bootstrapping_training_data.md) | How to create retrieval supervision when logs or expert labels are scarce while measuring distribution shift and identifying the teacher ceiling. |

### Part IX: Generation and Context Assembly

| Chapter | What it prepares you to explain |
|---|---|
| [30. Lost in the Middle](chapters/30_lost_in_the_middle.md) | How to diagnose and reduce position-dependent failures in long retrieved contexts. |
| [31. Attribution and Citation](chapters/31_attribution_and_citation.md) | Why attribution is a defining RAG capability and how to test, route, and measure cited claims. |

### Part X: Evaluation

| Chapter | What it prepares you to explain |
|---|---|
| [32. Evaluating Retrieval](chapters/32_evaluating_retrieval.md) | How to measure evidence coverage and ordering, including cases without an established relevance set or with unreliable judges. |
| [33. Evaluating Generation](chapters/33_evaluating_generation.md) | How generation metrics change with oracle access, claim coverage, response length, and summarization behavior. |
| [34. Evaluating the System](chapters/34_evaluating_the_system.md) | How to combine component measurements into end-to-end diagnosis, validation, and stress testing before launch. |

### Part XI: Trust, Credibility, and Adversarial Robustness

| Chapter | What it prepares you to explain |
|---|---|
| [35. Source Credibility](chapters/35_source_credibility.md) | How to estimate credibility, respond to weak evidence, and preserve freshness, pluralism, and fair exposure. |
| [36. Provenance and Adversarial Robustness](chapters/36_provenance_and_adversarial_robustness.md) | How to verify evidence, resist hostile retrieved content, track provenance, harden the model, and protect access boundaries. |

### Part XII: Scaling, Advanced Variants, and Design Drills

| Chapter | What it prepares you to explain |
|---|---|
| [37. Latency, Cost, and Systems](chapters/37_latency_cost_and_systems.md) | How stage-level latency and cost models guide caching, batching, pipelining, kernel work, retrieval cascades, and multi-resolution indexes. |
| [38. Distributed and Federated RAG](chapters/38_distributed_and_federated_rag.md) | How to design RAG across independently governed sources, regions, tenants, and shared public infrastructure. |
| [39. Multimodal RAG](chapters/39_multimodal_rag.md) | How to index, retrieve, fuse, generate from, attribute, and evaluate text, images, tables, audio, and video. |
| [40. Graph RAG](chapters/40_graph_rag.md) | How graph construction, grounded retrieval, generation, costs, and failure boundaries shape the GraphRAG versus LightRAG choice. |
| [41. End-to-End Design Drills](chapters/41_end_to_end_design_drills.md) | How to turn seven interview prompts into measurable architectures that begin with the binding constraint and expose explicit trade-offs. |

### Appendices: formulas, practice, and implementation references

| Appendix | What it gives you |
|---|---|
| [A1. Formula Sheet](chapters/A1_formula_sheet.md) | Eight formula groups covering lexical scoring, rank fusion, ranking metrics, modularity, product quantization, compute, latency, and index memory. |
| [A2. Question Bank](chapters/A2_question_bank.md) | A timed self-test with Core, Senior, and Staff prompts plus compact answer spines for rehearsal. |
| [A3. Design Checklists](chapters/A3_design_checklists.md) | Five operational checklists that turn a review into named decisions, measured quantities, and explicit exit criteria. |
| [A4. The RAG Card and Index Datasheet](chapters/A4_the_rag_card_and_index_datasheet.md) | Two handoff templates for system scope, retrieval decisions, behavior, failures, index composition, footprint, performance, and lifecycle. |
| [A5. Annotated Reading List](chapters/A5_annotated_reading_list.md) | A chapter-mapped reading route that identifies the result an interview candidate should be ready to explain or reproduce. |
| [A6. Notation Quick Reference](chapters/A6_notation_quick_reference.md) | A compact reference for symbols, overloaded notation, calculation conventions, and pointers to the fuller notation discussion. |
| [A7. Glossary](chapters/A7_glossary.md) | Definitions for overlapping RAG vocabulary with the distinctions, qualifications, and source pointers used across the edition. |

## Verification and package integrity

### Current repository snapshot

| Check | Result |
|---|---:|
| Markdown study units | 57 |
| Front-matter units | 9 |
| Technical chapters | 41 |
| Appendices | 7 |
| Total lines across unit files | 44,918 |
| Unit line-count range | 405 to 900 |
| Numbered figure headings | 246 |
| Numbered table headings | 9 |
| Mermaid diagram blocks | 175 |
| Files inside the ZIP | 58 |
| ZIP size | 1,142,408 bytes |
| GitHub-blocked `\operatorname` macros | 0 |
| Repaired display-math blocks parsed | 72 of 72 |

### Creation-time quality record

| Check | Recorded result |
|---|---:|
| Manifest units represented | 57 of 57 |
| Numbered figures reconciled | 246 of 246 |
| Numbered source tables reconciled | 9 of 9 |
| Mermaid diagrams parsed | 175 of 175 |
| Independently reviewed units | 57 of 57 |
| Final audit errors | 0 |
| Final audit warnings | 0 |

The reusable verification scripts are included under `.agents/skills/rag-interview-study-edition/scripts/`. The manifest and verifier tracker are not included, so the creation-time source-reconciliation records are not fully reproducible from this checkout. The current README and repository-structure checks can be rerun directly.

ZIP SHA-256:

```text
171b477340d406f765d7a230d8447a47578cf130e718c1653426d79235f02fac
```

The archive was extracted during creation-time verification. All 58 extracted files matched their source files byte for byte.

## Source and rights boundary

This repository is an unofficial set of study notes derived from a user-provided technical book. The original PDF is not included, and no affiliation with or endorsement by the book's author or publisher is claimed. Rights in the source work remain with their respective owner.

The Markdown units retain source page spans and numbered figure and table references for study provenance. The explanatory prose, diagrams, decoder tables, whiteboard scripts, and interview questions were prepared as study material.

This repository does not include an open-source license. Public access does not grant reuse rights to the original publication or its protected content. Confirm the applicable rights before redistributing or adapting these materials.
