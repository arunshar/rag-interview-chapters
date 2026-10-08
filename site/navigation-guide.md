# The RAG Interview

## Book home and reading roadmap

This guide is the reading home for the Markdown study edition of *The RAG Interview*. It connects all 57 study units and shows how the twelve parts fit together. You can read the complete book in order or follow a route for an interview, a role, or a production problem.

[Book roadmap](#book-roadmap) · [Complete contents](#complete-contents) · [Reading routes](#reading-routes) · [Design drills](#design-drills) · [Study routine](#study-routine) · [Appendix map](#appendix-map)

Local reading: keep this file beside the `chapters/` folder. Chapter and practice links open the files in that folder, so the guide and chapters should move together.

You can begin with [How to Use This Book](chapters/00_04_how_to_use_this_book.md) or open [Chapter 3](chapters/03_a_repeatable_framework_for_any_rag_design_question.md) for the design framework. If your interview is next week, follow the [one-week path](#one-week-interview-path).

The edition contains nine front-matter units, 41 numbered chapters, and seven appendices. The existing index estimates 44 hours 19 minutes of reading at 200 words per minute. That total excludes calculations, exercises, and interview rehearsal.

## Book roadmap

The table follows the book order. Part I supplies the vocabulary and design framework used throughout the edition. The prerequisite column reproduces the technical dependencies in How to Use This Book, which also identifies Part I as the mandatory foundation.

| Part | Chapters | What this part prepares you to do | Prerequisites | Reading estimate |
|---|---|---|---|---:|
| [Front matter](#front-matter) | 00.01–00.09 | You learn the scope, study method, notation, and intended use of the edition. | Start here | 196 min |
| [I. The RAG Interview Landscape](#part-i-the-rag-interview-landscape) | 1–3 | You frame the problem, compare alternatives, and structure a design answer. | None listed | 199 min |
| [II. The Generator Side](#part-ii-the-generator-side) | 4–8 | You understand generator capabilities, failure ownership, and the economics of model capacity. | None listed | 268 min |
| [III. Prompting and Context Construction](#part-iii-prompting-and-context-construction) | 9–11 | You control instructions and assess prompt sensitivity, abstention, and calibration. | [II](#part-ii-the-generator-side) | 146 min |
| [IV. Representing What You Retrieve](#part-iv-representing-what-you-retrieve) | 12–14 | You choose representations, retrieval units, and ways to preserve document structure. | [II](#part-ii-the-generator-side) | 172 min |
| [V. Indexing and Vector Search](#part-v-indexing-and-vector-search) | 15–17 | You choose and operate an index within recall, latency, memory, and update budgets. | [IV](#part-iv-representing-what-you-retrieve) | 169 min |
| [VI. Retrieval and Ranking](#part-vi-retrieval-and-ranking) | 18–23 | You compare retrieval families and ranking stages by quality and serving cost. | [IV](#part-iv-representing-what-you-retrieve), [V](#part-v-indexing-and-vector-search) | 342 min |
| [VII. Query Understanding and Control Flow](#part-vii-query-understanding-and-control-flow) | 24–26 | You reformulate queries, route requests, and control repeated retrieval. | [II](#part-ii-the-generator-side), [VI](#part-vi-retrieval-and-ranking) | 177 min |
| [VIII. Training the RAG System](#part-viii-training-the-rag-system) | 27–29 | You decide what to train and how to obtain useful supervision. | [II](#part-ii-the-generator-side), [VI](#part-vi-retrieval-and-ranking) | 145 min |
| [IX. Generation and Context Assembly](#part-ix-generation-and-context-assembly) | 30–31 | You manage context position and check the evidence behind generated claims. | [II](#part-ii-the-generator-side), [III](#part-iii-prompting-and-context-construction), [VI](#part-vi-retrieval-and-ranking) | 97 min |
| [X. Evaluation](#part-x-evaluation) | 32–34 | You measure retrieval and generation separately, then diagnose the whole system. | [VI](#part-vi-retrieval-and-ranking), [IX](#part-ix-generation-and-context-assembly) | 133 min |
| [XI. Trust, Credibility, and Adversarial Robustness](#part-xi-trust-credibility-and-adversarial-robustness) | 35–36 | You assess evidence credibility and defend provenance and access boundaries. | [VI](#part-vi-retrieval-and-ranking), [IX](#part-ix-generation-and-context-assembly), [X](#part-x-evaluation) | 106 min |
| [XII. Scaling, Advanced Variants, and Design Drills](#part-xii-scaling-advanced-variants-and-design-drills) | 37–41 | You apply the earlier decisions to scale, federation, multimodality, graphs, and design drills. | All earlier parts | 226 min |
| [Appendices](#appendices) | A1–A7 | You look up formulas, test yourself, review designs, and prepare system documentation. | Use alongside the chapters | 283 min |

All reading estimates below come from [00_INDEX.md](00_INDEX.md). They are planning estimates for the existing study notes. The [original contents unit](chapters/00_02_contents.md) preserves the finer section map and printed-page references.

## Complete contents

Each title opens its full study unit. The chapter tables also link directly to the existing Core mechanics, Whiteboard pack, and Interview traps sections. The outcome column describes what you should be able to explain after working through the unit.

### Front matter

| Unit | Learning outcome | Minutes |
|---|---|---:|
| [00.01. Title Page](chapters/00_01_title_page.md) | You can identify the edition, its scope and provenance, and the basic RAG terminology. | 8 |
| [00.02. Contents](chapters/00_02_contents.md) | You can locate each topic in the original book through its complete section and printed-page map. | 26 |
| [00.03. Preface](chapters/00_03_preface.md) | You can explain why RAG design requires reasoning about production decisions and their consequences. | 27 |
| [00.04. How to Use This Book](chapters/00_04_how_to_use_this_book.md) | You can choose a reading route, follow its prerequisites, and use the recurring study sections. | 27 |
| [00.05. For Interview Candidates](chapters/00_05_for_interview_candidates.md) | You can prepare for design, derivation, and debugging questions with deliberate interview practice. | 35 |
| [00.06. For Practicing Engineers](chapters/00_06_for_practicing_engineers.md) | You can connect the material to engineering decisions, failure modes, and operational costs. | 27 |
| [00.07. Notation and Symbols](chapters/00_07_notation_and_symbols.md) | You can interpret the symbols, abbreviations, and measurement conventions used across the book. | 18 |
| [00.08. Acknowledgments](chapters/00_08_acknowledgments.md) | You can identify the contributions and sources that shaped the book and its treatment of negative results. | 15 |
| [00.09. About the Author](chapters/00_09_about_the_author.md) | You can identify Hao Hoang as the source author and locate the stated contact and correction channels. | 13 |

### Part I. The RAG Interview Landscape

| Chapter | Learning outcome | Minutes | Practice links |
|---|---|---:|---|
| [Chapter 1. What a RAG Interview Actually Tests](chapters/01_what_a_rag_interview_actually_tests.md) | You can choose where knowledge belongs, price that choice, and recognize when retrieval is the wrong tool. | 65 | [Mechanics](chapters/01_what_a_rag_interview_actually_tests.md#core-mechanics) · [Whiteboard](chapters/01_what_a_rag_interview_actually_tests.md#whiteboard-pack) · [Traps](chapters/01_what_a_rag_interview_actually_tests.md#interview-traps) |
| [Chapter 2. The Competing Answers to the Same Problem](chapters/02_the_competing_answers_to_the_same_problem.md) | You can compare RAG with continual learning, model editing, long context, and generative retrieval under stated constraints. | 70 | [Mechanics](chapters/02_the_competing_answers_to_the_same_problem.md#core-mechanics) · [Whiteboard](chapters/02_the_competing_answers_to_the_same_problem.md#whiteboard-pack) · [Traps](chapters/02_the_competing_answers_to_the_same_problem.md#interview-traps) |
| [Chapter 3. A Repeatable Framework for Any RAG Design Question](chapters/03_a_repeatable_framework_for_any_rag_design_question.md) | You can turn a design prompt into requirements, sizing estimates, component decisions, and measurable trade-offs. | 64 | [Mechanics](chapters/03_a_repeatable_framework_for_any_rag_design_question.md#core-mechanics) · [Whiteboard](chapters/03_a_repeatable_framework_for_any_rag_design_question.md#whiteboard-pack) · [Traps](chapters/03_a_repeatable_framework_for_any_rag_design_question.md#interview-traps) |

### Part II. The Generator Side

| Chapter | Learning outcome | Minutes | Practice links |
|---|---|---:|---|
| [Chapter 4. What the LLM Brings and What It Breaks](chapters/04_what_the_llm_brings_and_what_it_breaks.md) | You can distinguish generator capabilities from factual failures and assign each failure to the component responsible for fixing it. | 61 | [Mechanics](chapters/04_what_the_llm_brings_and_what_it_breaks.md#core-mechanics) · [Whiteboard](chapters/04_what_the_llm_brings_and_what_it_breaks.md#whiteboard-pack) · [Traps](chapters/04_what_the_llm_brings_and_what_it_breaks.md#interview-traps) |
| [Chapter 5. Data, Privacy, and the Legal Surface](chapters/05_data_privacy_and_the_legal_surface.md) | You can explain how RAG changes data risks, evidence, and reversibility without claiming that architecture settles legal questions. | 60 | [Mechanics](chapters/05_data_privacy_and_the_legal_surface.md#core-mechanics) · [Whiteboard](chapters/05_data_privacy_and_the_legal_surface.md#whiteboard-pack) · [Traps](chapters/05_data_privacy_and_the_legal_surface.md#interview-traps) |
| [Chapter 6. Scaling Laws and the Economics of Retrieval vs Parameters](chapters/06_scaling_laws_and_the_economics_of_retrieval_vs_parameters.md) | You can compare retrieval and model capacity through training, serving, memory, and compute budgets. | 47 | [Mechanics](chapters/06_scaling_laws_and_the_economics_of_retrieval_vs_parameters.md#core-mechanics) · [Whiteboard](chapters/06_scaling_laws_and_the_economics_of_retrieval_vs_parameters.md#whiteboard-pack) · [Traps](chapters/06_scaling_laws_and_the_economics_of_retrieval_vs_parameters.md#interview-traps) |
| [Chapter 7. In-Context Learning - The Mechanism RAG Rides On](chapters/07_in_context_learning_the_mechanism_rag_rides_on.md) | You can explain how in-context learning supports RAG and when supervised fine-tuning better serves the task. | 53 | [Mechanics](chapters/07_in_context_learning_the_mechanism_rag_rides_on.md#core-mechanics) · [Whiteboard](chapters/07_in_context_learning_the_mechanism_rag_rides_on.md#whiteboard-pack) · [Traps](chapters/07_in_context_learning_the_mechanism_rag_rides_on.md#interview-traps) |
| [Chapter 8. Reading the Machine: Circuits, Induction Heads, and Attribution](chapters/08_reading_the_machine_circuits_induction_heads_and_attribution.md) | You can use circuits, induction heads, and attribution to reason about failures while respecting the limits of interpretability evidence. | 47 | [Mechanics](chapters/08_reading_the_machine_circuits_induction_heads_and_attribution.md#core-mechanics) · [Whiteboard](chapters/08_reading_the_machine_circuits_induction_heads_and_attribution.md#whiteboard-pack) · [Traps](chapters/08_reading_the_machine_circuits_induction_heads_and_attribution.md#interview-traps) |

### Part III. Prompting and Context Construction

| Chapter | Learning outcome | Minutes | Practice links |
|---|---|---:|---|
| [Chapter 9. Prompting for Retrieval-Augmented Systems](chapters/09_prompting_for_retrieval_augmented_systems.md) | You can choose prompting and reasoning scaffolds while accounting for the costs and failures of extra calls or passages. | 43 | [Mechanics](chapters/09_prompting_for_retrieval_augmented_systems.md#core-mechanics) · [Whiteboard](chapters/09_prompting_for_retrieval_augmented_systems.md#whiteboard-pack) · [Traps](chapters/09_prompting_for_retrieval_augmented_systems.md#interview-traps) |
| [Chapter 10. Prompt Sensitivity](chapters/10_prompt_sensitivity.md) | You can measure changes caused by equivalent prompt wording before selecting a template. | 53 | [Mechanics](chapters/10_prompt_sensitivity.md#core-mechanics) · [Whiteboard](chapters/10_prompt_sensitivity.md#whiteboard-pack) · [Traps](chapters/10_prompt_sensitivity.md#interview-traps) |
| [Chapter 11. Abstention and Calibration](chapters/11_abstention_and_calibration.md) | You can design abstention rules and assess confidence calibration for short and long answers. | 50 | [Mechanics](chapters/11_abstention_and_calibration.md#core-mechanics) · [Whiteboard](chapters/11_abstention_and_calibration.md#whiteboard-pack) · [Traps](chapters/11_abstention_and_calibration.md#interview-traps) |

### Part IV. Representing What You Retrieve

| Chapter | Learning outcome | Minutes | Practice links |
|---|---|---:|---|
| [Chapter 12. Text Representation](chapters/12_text_representation.md) | You can compare text representations through exact matching, semantic reach, training cost, and operational stability. | 55 | [Mechanics](chapters/12_text_representation.md#core-mechanics) · [Whiteboard](chapters/12_text_representation.md#whiteboard-pack) · [Traps](chapters/12_text_representation.md#interview-traps) |
| [Chapter 13. Chunking and Granularity](chapters/13_chunking_and_granularity.md) | You can choose retrieval granularity, preserve context, and test whether a chunking method improves retrieval. | 60 | [Mechanics](chapters/13_chunking_and_granularity.md#core-mechanics) · [Whiteboard](chapters/13_chunking_and_granularity.md#whiteboard-pack) · [Traps](chapters/13_chunking_and_granularity.md#interview-traps) |
| [Chapter 14. Beyond Plain Text - Tables, Layout, Documents](chapters/14_beyond_plain_text_tables_layout_documents.md) | You can preserve table and document structure and explain the assumptions and costs of layout-aware representations. | 57 | [Mechanics](chapters/14_beyond_plain_text_tables_layout_documents.md#core-mechanics) · [Whiteboard](chapters/14_beyond_plain_text_tables_layout_documents.md#whiteboard-pack) · [Traps](chapters/14_beyond_plain_text_tables_layout_documents.md#interview-traps) |

### Part V. Indexing and Vector Search

| Chapter | Learning outcome | Minutes | Practice links |
|---|---|---:|---|
| [Chapter 15. Approximate Nearest Neighbor Search](chapters/15_approximate_nearest_neighbor_search.md) | You can choose an approximate nearest neighbor index using recall, latency, memory, build time, and update constraints. | 66 | [Mechanics](chapters/15_approximate_nearest_neighbor_search.md#core-mechanics) · [Whiteboard](chapters/15_approximate_nearest_neighbor_search.md#whiteboard-pack) · [Traps](chapters/15_approximate_nearest_neighbor_search.md#interview-traps) |
| [Chapter 16. Compression and Index Economics](chapters/16_compression_and_index_economics.md) | You can calculate index memory and compare compression methods without confusing vector storage with the full system footprint. | 37 | [Mechanics](chapters/16_compression_and_index_economics.md#core-mechanics) · [Whiteboard](chapters/16_compression_and_index_economics.md#whiteboard-pack) · [Traps](chapters/16_compression_and_index_economics.md#interview-traps) |
| [Chapter 17. Operating a Vector Store](chapters/17_operating_a_vector_store.md) | You can plan vector-store deletion, growth, sharding, metadata filters, and query constraints. | 66 | [Mechanics](chapters/17_operating_a_vector_store.md#core-mechanics) · [Whiteboard](chapters/17_operating_a_vector_store.md#whiteboard-pack) · [Traps](chapters/17_operating_a_vector_store.md#interview-traps) |

### Part VI. Retrieval and Ranking

| Chapter | Learning outcome | Minutes | Practice links |
|---|---|---:|---|
| [Chapter 18. Classical IR You Are Expected to Know](chapters/18_classical_ir_you_are_expected_to_know.md) | You can derive lexical ranking behavior and explain why sparse retrieval remains valuable for rare and exact-match queries. | 55 | [Mechanics](chapters/18_classical_ir_you_are_expected_to_know.md#core-mechanics) · [Whiteboard](chapters/18_classical_ir_you_are_expected_to_know.md#whiteboard-pack) · [Traps](chapters/18_classical_ir_you_are_expected_to_know.md#interview-traps) |
| [Chapter 19. Learning to Rank](chapters/19_learning_to_rank.md) | You can connect ranking objectives to metrics and compare pointwise, pairwise, listwise, and neural ranking designs. | 58 | [Mechanics](chapters/19_learning_to_rank.md#core-mechanics) · [Whiteboard](chapters/19_learning_to_rank.md#whiteboard-pack) · [Traps](chapters/19_learning_to_rank.md#interview-traps) |
| [Chapter 20. Dense Retrieval](chapters/20_dense_retrieval.md) | You can train and serve dense retrieval, choose negatives, and combine semantic search with lexical search. | 60 | [Mechanics](chapters/20_dense_retrieval.md#core-mechanics) · [Whiteboard](chapters/20_dense_retrieval.md#whiteboard-pack) · [Traps](chapters/20_dense_retrieval.md#interview-traps) |
| [Chapter 21. Learned Sparse and Multi-Vector Retrieval](chapters/21_learned_sparse_and_multi_vector_retrieval.md) | You can compare learned sparse and multi-vector retrieval and price hybrid fusion, compression, and pruning. | 62 | [Mechanics](chapters/21_learned_sparse_and_multi_vector_retrieval.md#core-mechanics) · [Whiteboard](chapters/21_learned_sparse_and_multi_vector_retrieval.md#whiteboard-pack) · [Traps](chapters/21_learned_sparse_and_multi_vector_retrieval.md#interview-traps) |
| [Chapter 22. Reranking](chapters/22_reranking.md) | You can choose a reranker, size its candidate set, and separate retrieval failures from model failures. | 50 | [Mechanics](chapters/22_reranking.md#core-mechanics) · [Whiteboard](chapters/22_reranking.md#whiteboard-pack) · [Traps](chapters/22_reranking.md#interview-traps) |
| [Chapter 23. Generative Retrieval](chapters/23_generative_retrieval.md) | You can explain retrieval through generated document identifiers and its limits for quality and index updates. | 57 | [Mechanics](chapters/23_generative_retrieval.md#core-mechanics) · [Whiteboard](chapters/23_generative_retrieval.md#whiteboard-pack) · [Traps](chapters/23_generative_retrieval.md#interview-traps) |

### Part VII. Query Understanding and Control Flow

| Chapter | Learning outcome | Minutes | Practice links |
|---|---|---:|---|
| [Chapter 24. Query Reformulation](chapters/24_query_reformulation.md) | You can diagnose query failures and choose expansion, rewriting, conversational repair, or hypothetical-answer retrieval. | 59 | [Mechanics](chapters/24_query_reformulation.md#core-mechanics) · [Whiteboard](chapters/24_query_reformulation.md#whiteboard-pack) · [Traps](chapters/24_query_reformulation.md#interview-traps) |
| [Chapter 25. Routing and Adaptive Retrieval](chapters/25_routing_and_adaptive_retrieval.md) | You can decide when and where to retrieve and test how learned routing behaves on unfamiliar queries. | 67 | [Mechanics](chapters/25_routing_and_adaptive_retrieval.md#core-mechanics) · [Whiteboard](chapters/25_routing_and_adaptive_retrieval.md#whiteboard-pack) · [Traps](chapters/25_routing_and_adaptive_retrieval.md#interview-traps) |
| [Chapter 26. Iterative, Recursive, and Agentic Retrieval](chapters/26_iterative_recursive_and_agentic_retrieval.md) | You can compare repeated retrieval loops and set stopping rules that account for accuracy, latency, and context growth. | 51 | [Mechanics](chapters/26_iterative_recursive_and_agentic_retrieval.md#core-mechanics) · [Whiteboard](chapters/26_iterative_recursive_and_agentic_retrieval.md#whiteboard-pack) · [Traps](chapters/26_iterative_recursive_and_agentic_retrieval.md#interview-traps) |

### Part VIII. Training the RAG System

| Chapter | Learning outcome | Minutes | Practice links |
|---|---|---:|---|
| [Chapter 27. Fine-tuning the Generator](chapters/27_fine_tuning_the_generator.md) | You can decide when to fine-tune the generator and match training objectives to the retrieval defects it must handle. | 51 | [Mechanics](chapters/27_fine_tuning_the_generator.md#core-mechanics) · [Whiteboard](chapters/27_fine_tuning_the_generator.md#whiteboard-pack) · [Traps](chapters/27_fine_tuning_the_generator.md#interview-traps) |
| [Chapter 28. Training the Retriever](chapters/28_training_the_retriever.md) | You can connect generator utility to retriever training and account for index refresh costs. | 46 | [Mechanics](chapters/28_training_the_retriever.md#core-mechanics) · [Whiteboard](chapters/28_training_the_retriever.md#whiteboard-pack) · [Traps](chapters/28_training_the_retriever.md#interview-traps) |
| [Chapter 29. Bootstrapping Training Data](chapters/29_bootstrapping_training_data.md) | You can build retrieval supervision from generated data while checking relevance, distribution shift, and the teacher ceiling. | 48 | [Mechanics](chapters/29_bootstrapping_training_data.md#core-mechanics) · [Whiteboard](chapters/29_bootstrapping_training_data.md#whiteboard-pack) · [Traps](chapters/29_bootstrapping_training_data.md#interview-traps) |

### Part IX. Generation and Context Assembly

| Chapter | Learning outcome | Minutes | Practice links |
|---|---|---:|---|
| [Chapter 30. Lost in the Middle](chapters/30_lost_in_the_middle.md) | You can diagnose position-dependent context failures and compare changes to ordering, truncation, training, and architecture. | 50 | [Mechanics](chapters/30_lost_in_the_middle.md#core-mechanics) · [Whiteboard](chapters/30_lost_in_the_middle.md#whiteboard-pack) · [Traps](chapters/30_lost_in_the_middle.md#interview-traps) |
| [Chapter 31. Attribution and Citation](chapters/31_attribution_and_citation.md) | You can distinguish attribution from citation appearance and evaluate whether evidence supports each claim. | 47 | [Mechanics](chapters/31_attribution_and_citation.md#core-mechanics) · [Whiteboard](chapters/31_attribution_and_citation.md#whiteboard-pack) · [Traps](chapters/31_attribution_and_citation.md#interview-traps) |

### Part X. Evaluation

| Chapter | Learning outcome | Minutes | Practice links |
|---|---|---:|---|
| [Chapter 32. Evaluating Retrieval](chapters/32_evaluating_retrieval.md) | You can derive retrieval metrics and assess evaluation based on relevance labels, human judgments, or LLM judges. | 39 | [Mechanics](chapters/32_evaluating_retrieval.md#core-mechanics) · [Whiteboard](chapters/32_evaluating_retrieval.md#whiteboard-pack) · [Traps](chapters/32_evaluating_retrieval.md#interview-traps) |
| [Chapter 33. Evaluating Generation](chapters/33_evaluating_generation.md) | You can assess generation through faithfulness, factuality, claim coverage, and response-length effects. | 45 | [Mechanics](chapters/33_evaluating_generation.md#core-mechanics) · [Whiteboard](chapters/33_evaluating_generation.md#whiteboard-pack) · [Traps](chapters/33_evaluating_generation.md#interview-traps) |
| [Chapter 34. Evaluating the System](chapters/34_evaluating_the_system.md) | You can locate failures by stage and design ablations, sanity checks, and system-level evaluation. | 49 | [Mechanics](chapters/34_evaluating_the_system.md#core-mechanics) · [Whiteboard](chapters/34_evaluating_the_system.md#whiteboard-pack) · [Traps](chapters/34_evaluating_the_system.md#interview-traps) |

### Part XI. Trust, Credibility, and Adversarial Robustness

| Chapter | Learning outcome | Minutes | Practice links |
|---|---|---:|---|
| [Chapter 35. Source Credibility](chapters/35_source_credibility.md) | You can evaluate source credibility while considering freshness, conflicting evidence, pluralism, and fair exposure. | 50 | [Mechanics](chapters/35_source_credibility.md#core-mechanics) · [Whiteboard](chapters/35_source_credibility.md#whiteboard-pack) · [Traps](chapters/35_source_credibility.md#interview-traps) |
| [Chapter 36. Provenance and Adversarial Robustness](chapters/36_provenance_and_adversarial_robustness.md) | You can separate attribution from authenticity and address provenance, prompt injection, poisoning, and access boundaries. | 56 | [Mechanics](chapters/36_provenance_and_adversarial_robustness.md#core-mechanics) · [Whiteboard](chapters/36_provenance_and_adversarial_robustness.md#whiteboard-pack) · [Traps](chapters/36_provenance_and_adversarial_robustness.md#interview-traps) |

### Part XII. Scaling, Advanced Variants, and Design Drills

| Chapter | Learning outcome | Minutes | Practice links |
|---|---|---:|---|
| [Chapter 37. Latency, Cost, and Systems](chapters/37_latency_cost_and_systems.md) | You can build stage-level latency and cost budgets and evaluate caching, pipelining, and retrieval cascades. | 43 | [Mechanics](chapters/37_latency_cost_and_systems.md#core-mechanics) · [Whiteboard](chapters/37_latency_cost_and_systems.md#whiteboard-pack) · [Traps](chapters/37_latency_cost_and_systems.md#interview-traps) |
| [Chapter 38. Distributed and Federated RAG](chapters/38_distributed_and_federated_rag.md) | You can design retrieval across independently governed sources while accounting for tenancy, residency, and shared infrastructure. | 43 | [Mechanics](chapters/38_distributed_and_federated_rag.md#core-mechanics) · [Whiteboard](chapters/38_distributed_and_federated_rag.md#whiteboard-pack) · [Traps](chapters/38_distributed_and_federated_rag.md#interview-traps) |
| [Chapter 39. Multimodal RAG](chapters/39_multimodal_rag.md) | You can compare multimodal encoding, retrieval, fusion, attribution, and evaluation across text, images, audio, and video. | 53 | [Mechanics](chapters/39_multimodal_rag.md#core-mechanics) · [Whiteboard](chapters/39_multimodal_rag.md#whiteboard-pack) · [Traps](chapters/39_multimodal_rag.md#interview-traps) |
| [Chapter 40. Graph RAG](chapters/40_graph_rag.md) | You can decide when a graph earns its cost and compare graph construction, retrieval, generation, and failure modes. | 43 | [Mechanics](chapters/40_graph_rag.md#core-mechanics) · [Whiteboard](chapters/40_graph_rag.md#whiteboard-pack) · [Traps](chapters/40_graph_rag.md#interview-traps) |
| [Chapter 41. End-to-End Design Drills](chapters/41_end_to_end_design_drills.md) | You can answer seven design prompts with explicit constraints, measurable architectures, and defensible trade-offs. | 44 | [Mechanics](chapters/41_end_to_end_design_drills.md#core-mechanics) · [Whiteboard](chapters/41_end_to_end_design_drills.md#whiteboard-pack) · [Traps](chapters/41_end_to_end_design_drills.md#interview-traps) |

### Appendices

The repository uses A1–A7 as file identifiers. The source book calls the same appendices A through G. The [appendix map](#appendix-map) shows the exact correspondence.

| Unit | Learning outcome | Minutes |
|---|---|---:|
| [Appendix A1. Formula Sheet](chapters/A1_formula_sheet.md) | You can rehearse formulas for lexical scoring, rank fusion, ranking metrics, modularity, quantization, compute, and memory. | 30 |
| [Appendix A2. Question Bank](chapters/A2_question_bank.md) | You can test mechanism knowledge, derivation, and judgment with Core, Senior, and Staff questions and separate answer spines. | 75 |
| [Appendix A3. Design Checklists](chapters/A3_design_checklists.md) | You can review a design using retrieval, capacity, evaluation, credibility, and latency checklists. | 43 |
| [Appendix A4. The RAG Card and Index Datasheet](chapters/A4_the_rag_card_and_index_datasheet.md) | You can document system behavior and index properties using the RAG Card and Index Datasheet templates. | 32 |
| [Appendix A5. Annotated Reading List](chapters/A5_annotated_reading_list.md) | You can find chapter-linked readings and identify the result each reading supports. | 58 |
| [Appendix A6. Notation Quick Reference](chapters/A6_notation_quick_reference.md) | You can look up symbols and calculation conventions while working through derivations. | 14 |
| [Appendix A7. Glossary](chapters/A7_glossary.md) | You can reconcile overlapping RAG terms and recognize when different names refer to the same idea. | 31 |

## Reading routes

The routes preserve the order given in the existing edition. Chapter numbers are clickable, and decimal numbers open specific sections. The one-week path and five role routes come from [How to Use This Book](chapters/00_04_how_to_use_this_book.md#targeted-reading-paths). The broader interview, production, and complete routes come from [00_INDEX.md](00_INDEX.md#suggested-reading-order).

The source identifies [Part I](#part-i-the-rag-interview-landscape) as the mandatory foundation for its vocabulary and design framework. Some targeted routes assume that foundation and begin later in the book. The one-week path follows its own explicit sequence for a short preparation window.

### One-week interview path

This express route focuses on an answer framework, failure diagnosis, core retrieval mechanisms, and two timed design drills. The source explicitly limits this route to the following stops.

1. You establish the answer framework with [Chapter 3](chapters/03_a_repeatable_framework_for_any_rag_design_question.md) and the debugging framework with [Chapter 34](chapters/34_evaluating_the_system.md).
2. You read the core chapters in order, [1](chapters/01_what_a_rag_interview_actually_tests.md) → [15](chapters/15_approximate_nearest_neighbor_search.md) → [18](chapters/18_classical_ir_you_are_expected_to_know.md) → [22](chapters/22_reranking.md) → [25](chapters/25_routing_and_adaptive_retrieval.md) → [30](chapters/30_lost_in_the_middle.md) → [32](chapters/32_evaluating_retrieval.md).
3. You rehearse [41.1 Enterprise RAG](chapters/41_end_to_end_design_drills.md#411-enterprise-rag-over-100m-documents-at-500-qps) and [41.6 Debugging a RAG system that got worse](chapters/41_end_to_end_design_drills.md#416-debugging-a-rag-system-that-got-worse) as timed drills.

### Retrieval and ranking quality

This route serves search-relevance and applied-science preparation. It follows the question of why the right document is missing or ranked too low.

| Stop | Reading | Focus |
|---:|---|---|
| 1 | [3](chapters/03_a_repeatable_framework_for_any_rag_design_question.md) including [3.4](chapters/03_a_repeatable_framework_for_any_rag_design_question.md#34-size-the-problem-before-selecting-the-architecture) | Design framework and sizing |
| 2 | [12](chapters/12_text_representation.md) | Sparse and dense representations |
| 3 | [13](chapters/13_chunking_and_granularity.md) including [13.6](chapters/13_chunking_and_granularity.md#136-does-semantic-chunking-actually-pay) | Chunking and whether semantic chunking pays |
| 4 | [18](chapters/18_classical_ir_you_are_expected_to_know.md) | BM25, saturation, and length normalization |
| 5 | [20](chapters/20_dense_retrieval.md) | Bi-encoders, DPR, and hard negatives |
| 6 | [21](chapters/21_learned_sparse_and_multi_vector_retrieval.md) | SPLADE, ColBERT, and reciprocal rank fusion |
| 7 | [22](chapters/22_reranking.md) | Cross-encoders and rerank depth |
| 8 | [24](chapters/24_query_reformulation.md) | Query reformulation and HyDE |
| 9 | [32](chapters/32_evaluating_retrieval.md) | MRR, nDCG, and recall at k |
| 10 | [41.4](chapters/41_end_to_end_design_drills.md#414-multi-hop-question-answering) | Multi-hop question-answering drill |

### Vector search and platform infrastructure

This route serves index owners who must defend capacity, recall targets, latency budgets, and operational choices.

[3.4](chapters/03_a_repeatable_framework_for_any_rag_design_question.md#34-size-the-problem-before-selecting-the-architecture) → [15](chapters/15_approximate_nearest_neighbor_search.md) → [16](chapters/16_compression_and_index_economics.md) → [17](chapters/17_operating_a_vector_store.md) → [37](chapters/37_latency_cost_and_systems.md) → [38](chapters/38_distributed_and_federated_rag.md) → [41.1](chapters/41_end_to_end_design_drills.md#411-enterprise-rag-over-100m-documents-at-500-qps) → [41.2](chapters/41_end_to_end_design_drills.md#412-a-rag-system-that-must-stay-fresh).

You begin with sizing, then cover index choice, compression, and vector-store operations. The route continues through latency and federation before the enterprise-scale and freshness drills.

### Shipping a RAG product

This route serves applied-AI and product-engineering preparation. It follows the complete product loop and failures that affect users.

[1](chapters/01_what_a_rag_interview_actually_tests.md) → [3](chapters/03_a_repeatable_framework_for_any_rag_design_question.md) → [4](chapters/04_what_the_llm_brings_and_what_it_breaks.md) → [9](chapters/09_prompting_for_retrieval_augmented_systems.md) → [11](chapters/11_abstention_and_calibration.md) → [13](chapters/13_chunking_and_granularity.md) → [25](chapters/25_routing_and_adaptive_retrieval.md) → [30](chapters/30_lost_in_the_middle.md) → [31](chapters/31_attribution_and_citation.md) → [33](chapters/33_evaluating_generation.md) → [34](chapters/34_evaluating_the_system.md) → [41.6](chapters/41_end_to_end_design_drills.md#416-debugging-a-rag-system-that-got-worse).

Chapter 9 includes the source route's emphasis on [Section 9.4](chapters/09_prompting_for_retrieval_augmented_systems.md#94-retrieving-more-can-hallucinate-more), which examines why more retrieved material can increase hallucination. The final drill asks you to diagnose a system that became worse.

### High-stakes, trust, and safety

This route serves preparation for regulated settings and questions about wrong or hostile retrieved documents. It assumes the Part I foundation.

[4](chapters/04_what_the_llm_brings_and_what_it_breaks.md) → [5](chapters/05_data_privacy_and_the_legal_surface.md) → [11](chapters/11_abstention_and_calibration.md) → [31](chapters/31_attribution_and_citation.md) → [35](chapters/35_source_credibility.md) → [36](chapters/36_provenance_and_adversarial_robustness.md) → [41.3](chapters/41_end_to_end_design_drills.md#413-high-stakes-rag-medicine-and-law) → [41.7](chapters/41_end_to_end_design_drills.md#417-retrofitting-credibility-onto-an-existing-pipeline).

You connect generator failures and data boundaries to abstention, attribution, credibility, and adversarial robustness. The two drills apply those ideas to high-stakes use and an existing pipeline.

### Training the system and advanced variants

This route serves research-oriented preparation about how to change the components of a RAG system. It assumes the Part I foundation.

[6](chapters/06_scaling_laws_and_the_economics_of_retrieval_vs_parameters.md) → [7](chapters/07_in_context_learning_the_mechanism_rag_rides_on.md) → [8](chapters/08_reading_the_machine_circuits_induction_heads_and_attribution.md) → [27](chapters/27_fine_tuning_the_generator.md) → [28](chapters/28_training_the_retriever.md) → [29](chapters/29_bootstrapping_training_data.md) → [23](chapters/23_generative_retrieval.md) → [26](chapters/26_iterative_recursive_and_agentic_retrieval.md) → [39](chapters/39_multimodal_rag.md) → [40](chapters/40_graph_rag.md).

You begin with retrieval economics and in-context learning, then study interpretability and training. The route continues through generative and iterative retrieval before multimodal and graph variants.

### Production system path

This route follows the repository index from system framing through a final design review. Chapters 39 and 40 are conditional additions when modality or graph structure changes the problem.

1. You establish system and ingestion decisions with [3](chapters/03_a_repeatable_framework_for_any_rag_design_question.md) → [12](chapters/12_text_representation.md) → [13](chapters/13_chunking_and_granularity.md) → [14](chapters/14_beyond_plain_text_tables_layout_documents.md).
2. You size and operate retrieval with [15](chapters/15_approximate_nearest_neighbor_search.md) → [16](chapters/16_compression_and_index_economics.md) → [17](chapters/17_operating_a_vector_store.md) → [21](chapters/21_learned_sparse_and_multi_vector_retrieval.md) → [22](chapters/22_reranking.md).
3. You control queries and context with [24](chapters/24_query_reformulation.md) → [25](chapters/25_routing_and_adaptive_retrieval.md) → [26](chapters/26_iterative_recursive_and_agentic_retrieval.md) → [30](chapters/30_lost_in_the_middle.md).
4. You validate behavior and operations with [31](chapters/31_attribution_and_citation.md) → [32](chapters/32_evaluating_retrieval.md) → [33](chapters/33_evaluating_generation.md) → [34](chapters/34_evaluating_the_system.md) → [35](chapters/35_source_credibility.md) → [36](chapters/36_provenance_and_adversarial_robustness.md) → [37](chapters/37_latency_cost_and_systems.md) → [38](chapters/38_distributed_and_federated_rag.md) → [A4](chapters/A4_the_rag_card_and_index_datasheet.md).
5. You add [39](chapters/39_multimodal_rag.md) and [40](chapters/40_graph_rag.md) when multimodal or graph requirements apply.
6. You finish the design review with [41](chapters/41_end_to_end_design_drills.md) and [A3](chapters/A3_design_checklists.md).

### Broad interview loop

This is the longer fast-interview loop from the repository index. It covers more of the retrieval, evaluation, and systems stack than the separate one-week path.

1. You calibrate interview expectations with [00.05 For Interview Candidates](chapters/00_05_for_interview_candidates.md) → [1](chapters/01_what_a_rag_interview_actually_tests.md) → [3](chapters/03_a_repeatable_framework_for_any_rag_design_question.md).
2. You review vector search and classical retrieval with [15](chapters/15_approximate_nearest_neighbor_search.md) → [16](chapters/16_compression_and_index_economics.md) → [17](chapters/17_operating_a_vector_store.md) → [18](chapters/18_classical_ir_you_are_expected_to_know.md).
3. You study hybrid retrieval and query control with [21](chapters/21_learned_sparse_and_multi_vector_retrieval.md) → [22](chapters/22_reranking.md) → [24](chapters/24_query_reformulation.md) → [25](chapters/25_routing_and_adaptive_retrieval.md) → [26](chapters/26_iterative_recursive_and_agentic_retrieval.md).
4. You review context use and evaluation with [30](chapters/30_lost_in_the_middle.md) → [31](chapters/31_attribution_and_citation.md) → [32](chapters/32_evaluating_retrieval.md) → [33](chapters/33_evaluating_generation.md) → [34](chapters/34_evaluating_the_system.md).
5. You cover credibility, provenance, systems, and federation with [35](chapters/35_source_credibility.md) → [36](chapters/36_provenance_and_adversarial_robustness.md) → [37](chapters/37_latency_cost_and_systems.md) → [38](chapters/38_distributed_and_federated_rag.md).
6. You finish with [41](chapters/41_end_to_end_design_drills.md), then rehearse with [A1](chapters/A1_formula_sheet.md), [A2](chapters/A2_question_bank.md), [A3](chapters/A3_design_checklists.md), and [A6](chapters/A6_notation_quick_reference.md).

### Complete technical path

You can read the full edition in the order shown in the [complete contents](#complete-contents). The index divides that route into the following stages.

1. You read [front matter 00.01–00.09](#front-matter) for scope, study method, and notation.
2. You read [Parts I–IV](#part-i-the-rag-interview-landscape), Chapters 1–14, for framing, generator behavior, prompting, and representation.
3. You read [Parts V–VIII](#part-v-indexing-and-vector-search), Chapters 15–29, for indexing, retrieval, control flow, and training.
4. You read [Parts IX–XII](#part-ix-generation-and-context-assembly), Chapters 30–41, for context, evaluation, trust, systems, and design drills.
5. You use [Appendices A1–A7](#appendices) for formulas, practice, review, reporting, and terminology.

### Evaluation and trust path

The repository index also offers this focused route for evaluation and production handoff.

1. You establish data boundaries, prompt sensitivity, and abstention with [5](chapters/05_data_privacy_and_the_legal_surface.md) → [10](chapters/10_prompt_sensitivity.md) → [11](chapters/11_abstention_and_calibration.md).
2. You study training limits with [27](chapters/27_fine_tuning_the_generator.md) → [28](chapters/28_training_the_retriever.md) → [29](chapters/29_bootstrapping_training_data.md).
3. You connect attribution to evaluation and trust with [31](chapters/31_attribution_and_citation.md) → [32](chapters/32_evaluating_retrieval.md) → [33](chapters/33_evaluating_generation.md) → [34](chapters/34_evaluating_the_system.md) → [35](chapters/35_source_credibility.md) → [36](chapters/36_provenance_and_adversarial_robustness.md).
4. You examine operating costs and distributed governance with [37](chapters/37_latency_cost_and_systems.md) → [38](chapters/38_distributed_and_federated_rag.md).
5. You complete [Appendix A4](chapters/A4_the_rag_card_and_index_datasheet.md) for the production handoff.

## Design drills

Chapter 41 contains seven separate drills. You can open the relevant scenario directly after its prerequisite route or use the entire chapter for a final rehearsal.

| Drill | Scenario | What you practice |
|---|---|---|
| [41.1](chapters/41_end_to_end_design_drills.md#411-enterprise-rag-over-100m-documents-at-500-qps) | Enterprise RAG over 100M documents at 500 QPS | You size an architecture from corpus scale and request load. |
| [41.2](chapters/41_end_to_end_design_drills.md#412-a-rag-system-that-must-stay-fresh) | A RAG system that must stay fresh | You design ingestion and index updates around a freshness requirement. |
| [41.3](chapters/41_end_to_end_design_drills.md#413-high-stakes-rag-medicine-and-law) | High-stakes RAG: medicine and law | You reason about evidence, uncertainty, and high-stakes system constraints. |
| [41.4](chapters/41_end_to_end_design_drills.md#414-multi-hop-question-answering) | Multi-hop question answering | You control retrieval when later queries depend on earlier evidence. |
| [41.5](chapters/41_end_to_end_design_drills.md#415-multimodal-enterprise-search) | Multimodal enterprise search | You design retrieval across different document and media types. |
| [41.6](chapters/41_end_to_end_design_drills.md#416-debugging-a-rag-system-that-got-worse) | Debugging a RAG system that got worse | You isolate the stage responsible for a regression. |
| [41.7](chapters/41_end_to_end_design_drills.md#417-retrofitting-credibility-onto-an-existing-pipeline) | Retrofitting credibility onto an existing pipeline | You improve trust while working within an existing architecture. |

## Study routine

Each unit uses a consistent structure. You can use the sequence below for a focused session, then return to your reading route.

| Step | Existing section | Your task |
|---:|---|---|
| 1 | TL;DR and The story | You state the problem and explain the central idea in plain language. |
| 2 | Decoder table and Core mechanics | You define the terms and work through the mechanism, trade-offs, and failure cases. |
| 3 | Diagrams and Key numbers | You redraw the system and reproduce the important calculations with units. |
| 4 | Whiteboard pack | You draw the system from memory and give the spoken explanation. |
| 5 | Interview traps | You answer the questions before reading the supplied answers. |
| 6 | Question Bank and Design Checklists | You test recall and review whether your design decisions are complete. |

The source uses three question tags. Core questions test mechanisms, Senior questions test derivations from constraints, and Staff questions test judgment when constraints change. You can practice those levels in [Appendix A2](chapters/A2_question_bank.md) and use [Appendix A3](chapters/A3_design_checklists.md) for design review.

A useful stopping point is an explanation you can give without looking at the text. Your answer should state the choice, its cost, a likely failure mode, and the condition that would change your decision.

## Appendix map

Source references to Appendix A through Appendix G correspond to the following repository files. For example, the source Formula Sheet is Appendix A, while its local file identifier is A1.

| Source label | Repository ID | Reference | Use |
|---|---|---|---|
| Appendix A | A1 | [Formula Sheet](chapters/A1_formula_sheet.md) | Calculations and derivation practice |
| Appendix B | A2 | [Question Bank](chapters/A2_question_bank.md) | Self-testing and timed rehearsal |
| Appendix C | A3 | [Design Checklists](chapters/A3_design_checklists.md) | System design and review |
| Appendix D | A4 | [The RAG Card and Index Datasheet](chapters/A4_the_rag_card_and_index_datasheet.md) | Documentation and handoff |
| Appendix E | A5 | [Annotated Reading List](chapters/A5_annotated_reading_list.md) | Chapter-linked research follow-up |
| Appendix F | A6 | [Notation Quick Reference](chapters/A6_notation_quick_reference.md) | Symbol lookup |
| Appendix G | A7 | [Glossary](chapters/A7_glossary.md) | Terminology and overlapping names |

## Edition and provenance

This navigation guide covers the existing Markdown study edition. It is not a fresh audit of the underlying book or its technical claims. Chapter outcomes, part groupings, dependencies, and reading routes are grounded in the edition's README, index, contents, study-method unit, and chapter headings.

The source snapshot is [repository commit 8e30b4b](https://github.com/arunshar/rag-interview-chapters/commit/8e30b4bb99cc004a3d1b5b75b64fe204e1cdb50e). The [repository README](README.md) records the edition's scope and prior verification, while [00_INDEX.md](00_INDEX.md) retains source page spans and the original reading estimates.

[Return to the top](#the-rag-interview) · [Open the contents](#complete-contents) · [Choose a reading route](#reading-routes)
