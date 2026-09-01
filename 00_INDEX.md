# The RAG Interview: Markdown Study Edition

This index maps every Retrieval-Augmented Generation (RAG) manifest unit to an archive-relative Markdown file, gives a one-sentence purpose summary, estimates reading time at 200 words per minute, and offers focused reading paths for interview preparation and production design.

## Suggested reading order

### Fast interview loop

1. Start with 00.05 For Interview Candidates and Chapter 1 to calibrate what strong answers must demonstrate.
2. Read Chapter 3 for the reusable design framework.
3. Read Chapters 15 through 18 for vector search, compression, operations, and classical information retrieval.
4. Read Chapters 21, 22, 24, 25, and 26 for hybrid retrieval, reranking, reformulation, routing, and iterative control.
5. Read Chapters 30 through 34 for context use and evaluation.
6. Read Chapters 35 through 38 for credibility, provenance, systems, and federation.
7. Finish with Chapter 41, then rehearse with Appendices A1, A2, A3, and A6.

### Complete technical path

1. Read front matter units 00.01 through 00.09 for scope, navigation, notation, and study method.
2. Read Chapters 1 through 14 for design framing, generator behavior, prompting, chunking, parsing, and embedding.
3. Read Chapters 15 through 29 for indexes, retrieval, ranking, reformulation, control, and training data.
4. Read Chapters 30 through 41 for context, attribution, evaluation, credibility, adversarial robustness, systems, federation, multimodality, graphs, and design drills.
5. Use Appendices A1 through A7 as formula, practice, checklist, reporting, reading, notation, and glossary references.

### Production system path

1. Begin with Chapters 3, 12, 13, and 14 to set retrieval decisions and ingestion boundaries.
2. Continue with Chapters 15, 16, 17, 21, and 22 to size and operate the retrieval stack.
3. Add Chapters 24, 25, 26, and 30 to control queries, routing, loops, and generator context.
4. Validate with Chapters 31 through 38 and Appendix A4.
5. Use Chapters 39 and 40 only when modality or graph structure changes the problem.
6. Run Chapter 41 and Appendix A3 as the final design review.

### Evaluation and trust path

1. Read Chapters 5, 10, and 11 for legal boundaries, prompt sensitivity, and hallucination.
2. Read Chapters 27 through 29 for generator tuning, retriever training, and synthetic data limits.
3. Read Chapters 31 through 36 for attribution, retrieval metrics, generation metrics, end-to-end diagnosis, credibility, provenance, and attacks.
4. Read Chapters 37 and 38 for operational cost and distributed governance.
5. Complete Appendix A4 before a production handoff.

## Unit index

### 00.01. Title Page

Archive entry: `chapters/00_01_title_page.md`
Summary: Record the title page's exact scope, provenance, version, visual layout, and contact channels while defining Retrieval-Augmented Generation (RAG) and artificial intelligence and machine learning (AI/ML) for this guide.
Source span: Physical PDF pages 1 to 1. Printed pages unnumbered.
Estimated reading time: 8 minutes at 200 words per minute.

### 00.02. Contents

Archive entry: `chapters/00_02_contents.md`
Summary: This unit turns printed contents pages i through x into an interview-oriented navigation map for Retrieval-Augmented Generation (RAG).
Source span: Physical PDF pages 2 to 11. Printed pages i to x.
Estimated reading time: 26 minutes at 200 words per minute.

### 00.03. Preface

Archive entry: `chapters/00_03_preface.md`
Summary: This preface explains how the book turns Retrieval-Augmented Generation (RAG) from a component list into a production reasoning discipline for artificial intelligence systems.
Source span: Physical PDF pages 12 to 13. Printed pages xi to xii.
Estimated reading time: 27 minutes at 200 words per minute.

### 00.04. How to Use This Book

Archive entry: `chapters/00_04_how_to_use_this_book.md`
Summary: This unit explains how to choose a reading route, use the book's recurring section structure, interpret its interview tags and references, and turn its appendices into preparation tools.
Source span: Physical PDF pages 14 to 18. Printed pages xiii to xvii.
Estimated reading time: 27 minutes at 200 words per minute.

### 00.05. For Interview Candidates

Archive entry: `chapters/00_05_for_interview_candidates.md`
Summary: This guide turns Retrieval-Augmented Generation (RAG) interview preparation into a decision-first plan for design, derivation, debugging, pacing, and practice.
Source span: Physical PDF pages 19 to 23. Printed pages xviii to xxii.
Estimated reading time: 35 minutes at 200 words per minute.

### 00.06. For Practicing Engineers

Archive entry: `chapters/00_06_for_practicing_engineers.md`
Summary: This unit maps the technical content of Retrieval-Augmented Generation (RAG) to the decisions, failures, costs, and trade-offs that practicing engineers face.
Source span: Physical PDF pages 24 to 27. Printed pages xxiii to xxvi.
Estimated reading time: 27 minutes at 200 words per minute.

### 00.07. Notation and Symbols

Archive entry: `chapters/00_07_notation_and_symbols.md`
Summary: This unit standardizes the symbols, abbreviations, overloads, and measurement conventions used throughout the retrieval-augmented generation (RAG) book.
Source span: Physical PDF pages 28 to 31. Printed pages xxvii to xxx.
Estimated reading time: 18 minutes at 200 words per minute.

### 00.08. Acknowledgments

Archive entry: `chapters/00_08_acknowledgments.md`
Summary: Explain who and what made the book possible, how those sources shaped its practical and evidence-based character, and why negative results matter to its honesty.
Source span: Physical PDF pages 32 to 32. Printed pages xxxi.
Estimated reading time: 15 minutes at 200 words per minute.

### 00.09. About the Author

Archive entry: `chapters/00_09_about_the_author.md`
Summary: This unit identifies Hao Hoang, explains his public writing practice and sole authorship, records why he wrote the book, and preserves the stated contact and correction routes.
Source span: Physical PDF pages 33 to 33. Printed pages xxxii.
Estimated reading time: 13 minutes at 200 words per minute.

### Chapter 1. What a RAG Interview Actually Tests

Archive entry: `chapters/01_what_a_rag_interview_actually_tests.md`
Summary: Retrieval-augmented generation (RAG) interviews test whether you can route knowledge to the right store, price that choice, and recognize when retrieval is the wrong tool.
Source span: Physical PDF pages 35 to 54. Printed pages 2 to 21.
Estimated reading time: 65 minutes at 200 words per minute.

### Chapter 2. The Competing Answers to the Same Problem

Archive entry: `chapters/02_the_competing_answers_to_the_same_problem.md`
Summary: Choose among continual learning, model editing, long context, generative retrieval, and retrieval-augmented generation by matching each method to the constraint and cost shape it actually serves.
Source span: Physical PDF pages 55 to 75. Printed pages 22 to 42.
Estimated reading time: 70 minutes at 200 words per minute.

### Chapter 3. A Repeatable Framework for Any RAG Design Question

Archive entry: `chapters/03_a_repeatable_framework_for_any_rag_design_question.md`
Summary: This chapter gives one repeatable way to turn an underspecified retrieval design prompt into explicit choices, priced trade-offs, and a defensible interview answer.
Source span: Physical PDF pages 76 to 95. Printed pages 43 to 62.
Estimated reading time: 64 minutes at 200 words per minute.

### Chapter 4. What the LLM Brings and What It Breaks

Archive entry: `chapters/04_what_the_llm_brings_and_what_it_breaks.md`
Summary: This chapter explains what the Large Language Model (LLM) contributes to Retrieval-Augmented Generation (RAG), what it breaks, and how to assign each failure to the right owner before choosing a fix.
Source span: Physical PDF pages 97 to 121. Printed pages 64 to 88.
Estimated reading time: 61 minutes at 200 words per minute.

### Chapter 5. Data, Privacy, and the Legal Surface

Archive entry: `chapters/05_data_privacy_and_the_legal_surface.md`
Summary: This chapter prepares you to explain how Retrieval-Augmented Generation (RAG) architecture changes the cost, evidence, and reversibility of data decisions without claiming that it resolves the underlying legal questions.
Source span: Physical PDF pages 122 to 144. Printed pages 89 to 111.
Estimated reading time: 60 minutes at 200 words per minute.

### Chapter 6. Scaling Laws and the Economics of Retrieval vs Parameters

Archive entry: `chapters/06_scaling_laws_and_the_economics_of_retrieval_vs_parameters.md`
Summary: This chapter explains how to allocate training, serving, memory, and retrieval budgets for a Retrieval-Augmented Generation (RAG) system.
Source span: Physical PDF pages 145 to 167. Printed pages 112 to 134.
Estimated reading time: 47 minutes at 200 words per minute.

### Chapter 7. In-Context Learning - The Mechanism RAG Rides On

Archive entry: `chapters/07_in_context_learning_the_mechanism_rag_rides_on.md`
Summary: This chapter explains how Retrieval-Augmented Generation (RAG) uses in-context learning (ICL), when supervised fine-tuning (SFT) is the better tool, and how selection, format, order, inference theory, and cost shape the design.
Source span: Physical PDF pages 168 to 193. Printed pages 135 to 160.
Estimated reading time: 53 minutes at 200 words per minute.

### Chapter 8. Reading the Machine: Circuits, Induction Heads, and Attribution

Archive entry: `chapters/08_reading_the_machine_circuits_induction_heads_and_attribution.md`
Summary: Distinguish evidence about one model run from evidence about fixed model weights, then use residual streams, query-key circuits, output-value circuits, and induction heads to reason about Retrieval-Augmented Generation (RAG) failures without claiming more than the evidence supports.
Source span: Physical PDF pages 194 to 216. Printed pages 161 to 183.
Estimated reading time: 47 minutes at 200 words per minute.

### Chapter 9. Prompting for Retrieval-Augmented Systems

Archive entry: `chapters/09_prompting_for_retrieval_augmented_systems.md`
Summary: Explain where prompting ends, where retrieval begins, how reasoning scaffolds change decoding, and why more calls or more passages can reduce answer quality.
Source span: Physical PDF pages 218 to 235. Printed pages 185 to 202.
Estimated reading time: 43 minutes at 200 words per minute.

### Chapter 10. Prompt Sensitivity

Archive entry: `chapters/10_prompt_sensitivity.md`
Summary: This chapter explains how meaning-preserving prompt changes can alter Retrieval-Augmented Generation (RAG), how to measure the effect, and how to make defensible template and optimization decisions.
Source span: Physical PDF pages 236 to 256. Printed pages 203 to 223.
Estimated reading time: 53 minutes at 200 words per minute.

### Chapter 11. Abstention and Calibration

Archive entry: `chapters/11_abstention_and_calibration.md`
Summary: This chapter explains when a Retrieval-Augmented Generation (RAG) system should refuse, how to build a useful confidence signal, and how to keep that signal honest for short and long answers.
Source span: Physical PDF pages 257 to 283. Printed pages 224 to 250.
Estimated reading time: 50 minutes at 200 words per minute.

### Chapter 12. Text Representation

Archive entry: `chapters/12_text_representation.md`
Summary: This chapter explains how text representations trade exact matching, semantic reach, operational stability, training cost, and privacy in a Retrieval-Augmented Generation (RAG) system.
Source span: Physical PDF pages 285 to 306. Printed pages 252 to 273.
Estimated reading time: 55 minutes at 200 words per minute.

### Chapter 13. Chunking and Granularity

Archive entry: `chapters/13_chunking_and_granularity.md`
Summary: This chapter explains how to choose retrieval units, route across granularities, preserve enough context, and measure whether a chunker actually improved retrieval.
Source span: Physical PDF pages 307 to 332. Printed pages 274 to 299.
Estimated reading time: 60 minutes at 200 words per minute.

### Chapter 14. Beyond Plain Text - Tables, Layout, Documents

Archive entry: `chapters/14_beyond_plain_text_tables_layout_documents.md`
Summary: This chapter explains why table cells and document blocks lose meaning when they are flattened, how table and layout encoders restore structure, and which costs, invariance limits, metrics, and layout priors matter in a Retrieval-Augmented Generation (RAG) interview.
Source span: Physical PDF pages 333 to 355. Printed pages 300 to 322.
Estimated reading time: 57 minutes at 200 words per minute.

### Chapter 15. Approximate Nearest Neighbor Search

Archive entry: `chapters/15_approximate_nearest_neighbor_search.md`
Summary: This chapter explains how to choose and defend an Approximate Nearest Neighbor (ANN) index for Retrieval-Augmented Generation (RAG) under recall, latency, memory, build, and update constraints.
Source span: Physical PDF pages 357 to 383. Printed pages 324 to 350.
Estimated reading time: 66 minutes at 200 words per minute.

### Chapter 16. Compression and Index Economics

Archive entry: `chapters/16_compression_and_index_economics.md`
Summary: Build a defensible retrieval index budget from code length, scoring error, scan shape, and fleet multipliers without confusing a smaller stored vector with a smaller system.
Source span: Physical PDF pages 384 to 406. Printed pages 351 to 373.
Estimated reading time: 37 minutes at 200 words per minute.

### Chapter 17. Operating a Vector Store

Archive entry: `chapters/17_operating_a_vector_store.md`
Summary: This chapter prepares you to operate the retrieval layer of a Retrieval-Augmented Generation (RAG) system under deletion, growth, metadata, filtering, and natural-language constraints.
Source span: Physical PDF pages 407 to 434. Printed pages 374 to 401.
Estimated reading time: 66 minutes at 200 words per minute.

### Chapter 18. Classical IR You Are Expected to Know

Archive entry: `chapters/18_classical_ir_you_are_expected_to_know.md`
Summary: This chapter prepares you to explain how classical lexical ranking supports a Retrieval-Augmented Generation (RAG) system, where its assumptions fail, and why sparse retrieval still protects rare queries.
Source span: Physical PDF pages 436 to 459. Printed pages 403 to 426.
Estimated reading time: 55 minutes at 200 words per minute.

### Chapter 19. Learning to Rank

Archive entry: `chapters/19_learning_to_rank.md`
Summary: Explain how Learning to Rank (LTR) aligns training gradients with ranked-list metrics, then choose among pointwise, pairwise, listwise, representation, interaction, and hybrid designs under real serving constraints.
Source span: Physical PDF pages 460 to 481. Printed pages 427 to 448.
Estimated reading time: 58 minutes at 200 words per minute.

### Chapter 20. Dense Retrieval

Archive entry: `chapters/20_dense_retrieval.md`
Summary: This chapter prepares a Retrieval-Augmented Generation (RAG) candidate to explain dense retrieval, train it, price it, combine it with lexical search, and extend it across languages.
Source span: Physical PDF pages 482 to 504. Printed pages 449 to 471.
Estimated reading time: 60 minutes at 200 words per minute.

### Chapter 21. Learned Sparse and Multi-Vector Retrieval

Archive entry: `chapters/21_learned_sparse_and_multi_vector_retrieval.md`
Summary: This chapter prepares you to explain how learned lexical weights, token-level matching, compression, pruning, and rank fusion trade retrieval quality against index size and latency.
Source span: Physical PDF pages 505 to 531. Printed pages 472 to 498.
Estimated reading time: 62 minutes at 200 words per minute.

### Chapter 22. Reranking

Archive entry: `chapters/22_reranking.md`
Summary: This chapter explains why Retrieval-Augmented Generation (RAG) needs a second ranking stage, how to price and size it, and how cross-encoders, large language model (LLM) ranking modes, ranking losses, sliding-window prompting, instruction-aware scoring, and document-bound versus model-bound diagnosis support that choice.
Source span: Physical PDF pages 532 to 562. Printed pages 499 to 529.
Estimated reading time: 50 minutes at 200 words per minute.

### Chapter 23. Generative Retrieval

Archive entry: `chapters/23_generative_retrieval.md`
Summary: This chapter explains when a model can retrieve by generating document identifiers, what that relocation costs, why updates remain hard, and how recitation can complement Retrieval-Augmented Generation (RAG).
Source span: Physical PDF pages 563 to 580. Printed pages 530 to 547.
Estimated reading time: 57 minutes at 200 words per minute.

### Chapter 24. Query Reformulation

Archive entry: `chapters/24_query_reformulation.md`
Summary: This chapter prepares you to explain how Retrieval-Augmented Generation (RAG) systems diagnose weak queries, expand or rewrite them, train retrieval-aware representations, repair conversational context, and search with hypothetical answers.
Source span: Physical PDF pages 582 to 607. Printed pages 549 to 574.
Estimated reading time: 59 minutes at 200 words per minute.

### Chapter 25. Routing and Adaptive Retrieval

Archive entry: `chapters/25_routing_and_adaptive_retrieval.md`
Summary: This chapter explains how a Retrieval-Augmented Generation (RAG) system decides when to retrieve, where to look, which operation to run, and how to fail safely on unfamiliar queries.
Source span: Physical PDF pages 608 to 636. Printed pages 575 to 603.
Estimated reading time: 67 minutes at 200 words per minute.

### Chapter 26. Iterative, Recursive, and Agentic Retrieval

Archive entry: `chapters/26_iterative_recursive_and_agentic_retrieval.md`
Summary: Explain why a single retrieval call fails when the useful query appears only after reasoning begins, then compare the retrieval-augmented generation (RAG) control loops that retrieve again, critique evidence, learn search behavior, fan out across sources, and stop before extra rounds reduce value.
Source span: Physical PDF pages 637 to 674. Printed pages 604 to 641.
Estimated reading time: 51 minutes at 200 words per minute.

### Chapter 27. Fine-tuning the Generator

Archive entry: `chapters/27_fine_tuning_the_generator.md`
Summary: Decide when Retrieval-Augmented Generation (RAG) errors belong to the generator, choose a training objective that matches the retrieval defects seen in production, and size the resulting fine-tuning job without confusing behavior, knowledge, robustness, invariance, or memory efficiency.
Source span: Physical PDF pages 676 to 696. Printed pages 643 to 663.
Estimated reading time: 51 minutes at 200 words per minute.

### Chapter 28. Training the Retriever

Archive entry: `chapters/28_training_the_retriever.md`
Summary: decide which Retrieval-Augmented Generation (RAG) component to train, connect generator utility to a discrete retriever, and price the index work that retriever updates create.
Source span: Physical PDF pages 697 to 727. Printed pages 664 to 694.
Estimated reading time: 46 minutes at 200 words per minute.

### Chapter 29. Bootstrapping Training Data

Archive entry: `chapters/29_bootstrapping_training_data.md`
Summary: explain how to manufacture useful retrieval supervision when query logs or expert labels are scarce, while preserving the task's relevance relation, filtering known failure modes, measuring distribution shift, and locating the teacher ceiling.
Source span: Physical PDF pages 728 to 759. Printed pages 695 to 726.
Estimated reading time: 48 minutes at 200 words per minute.

### Chapter 30. Lost in the Middle

Archive entry: `chapters/30_lost_in_the_middle.md`
Summary: This chapter prepares you to diagnose and mitigate position-dependent failures in Retrieval-Augmented Generation (RAG) systems.
Source span: Physical PDF pages 761 to 790. Printed pages 728 to 757.
Estimated reading time: 50 minutes at 200 words per minute.

### Chapter 31. Attribution and Citation

Archive entry: `chapters/31_attribution_and_citation.md`
Summary: This chapter explains why attribution is the defining promise of Retrieval-Augmented Generation (RAG) and how to test, route, and measure cited claims.
Source span: Physical PDF pages 791 to 809. Printed pages 758 to 776.
Estimated reading time: 47 minutes at 200 words per minute.

### Chapter 32. Evaluating Retrieval

Archive entry: `chapters/32_evaluating_retrieval.md`
Summary: Build a retrieval evaluation that measures both coverage and ordering, remains computable when no relevance set exists yet, and exposes judge failures that accuracy can hide.
Source span: Physical PDF pages 811 to 825. Printed pages 778 to 792.
Estimated reading time: 39 minutes at 200 words per minute.

### Chapter 33. Evaluating Generation

Archive entry: `chapters/33_evaluating_generation.md`
Summary: This chapter explains how to choose and interpret generation metrics for a Retrieval-Augmented Generation (RAG) system when oracle access, claim coverage, output length, and summarization behavior all affect the result.
Source span: Physical PDF pages 826 to 847. Printed pages 793 to 814.
Estimated reading time: 45 minutes at 200 words per minute.

### Chapter 34. Evaluating the System

Archive entry: `chapters/34_evaluating_the_system.md`
Summary: This chapter is for diagnosing, validating, and stress-testing a Retrieval-Augmented Generation (RAG) system before a launch decision.
Source span: Physical PDF pages 848 to 870. Printed pages 815 to 837.
Estimated reading time: 49 minutes at 200 words per minute.

### Chapter 35. Source Credibility

Archive entry: `chapters/35_source_credibility.md`
Summary: This chapter explains how Retrieval-Augmented Generation (RAG) systems measure source credibility, act on weak evidence, and preserve freshness, pluralism, and fair exposure.
Source span: Physical PDF pages 872 to 902. Printed pages 839 to 869.
Estimated reading time: 50 minutes at 200 words per minute.

### Chapter 36. Provenance and Adversarial Robustness

Archive entry: `chapters/36_provenance_and_adversarial_robustness.md`
Summary: This chapter explains how a Retrieval-Augmented Generation (RAG) system can verify evidence, resist hostile content, harden its model, and protect access boundaries.
Source span: Physical PDF pages 903 to 933. Printed pages 870 to 900.
Estimated reading time: 56 minutes at 200 words per minute.

### Chapter 37. Latency, Cost, and Systems

Archive entry: `chapters/37_latency_cost_and_systems.md`
Summary: Build a stage-level model of Retrieval-Augmented Generation (RAG) latency and cost, then use caching, batching, kernel design, pipelining, retrieval cascades, and multi-resolution indexing only where the measured bottleneck justifies them.
Source span: Physical PDF pages 935 to 965. Printed pages 902 to 932.
Estimated reading time: 43 minutes at 200 words per minute.

### Chapter 38. Distributed and Federated RAG

Archive entry: `chapters/38_distributed_and_federated_rag.md`
Summary: This chapter is for designing Retrieval-Augmented Generation (RAG) across independently governed sources, regions, tenants, and shared public infrastructure.
Source span: Physical PDF pages 966 to 984. Printed pages 933 to 951.
Estimated reading time: 43 minutes at 200 words per minute.

### Chapter 39. Multimodal RAG

Archive entry: `chapters/39_multimodal_rag.md`
Summary: This chapter explains how Retrieval-Augmented Generation (RAG) systems index, retrieve, fuse, generate from, attribute, and evaluate text, images, tables, audio, and video.
Source span: Physical PDF pages 985 to 1019. Printed pages 952 to 986.
Estimated reading time: 53 minutes at 200 words per minute.

### Chapter 40. Graph RAG

Archive entry: `chapters/40_graph_rag.md`
Summary: This chapter prepares you to defend every stage, cost, failure, and claim boundary of graph-based Retrieval-Augmented Generation (RAG), from construction and grounded retrieval through generation and the GraphRAG versus LightRAG choice.
Source span: Physical PDF pages 1020 to 1054. Printed pages 987 to 1021.
Estimated reading time: 43 minutes at 200 words per minute.

### Chapter 41. End-to-End Design Drills

Archive entry: `chapters/41_end_to_end_design_drills.md`
Summary: Turn seven Retrieval-Augmented Generation (RAG) interview prompts into measurable architectures, explicit trade-offs, and answers that start from the binding constraint rather than a product name.
Source span: Physical PDF pages 1055 to 1082. Printed pages 1022 to 1049.
Estimated reading time: 44 minutes at 200 words per minute.

### Appendix A1. Formula Sheet

Archive entry: `chapters/A1_formula_sheet.md`
Summary: This appendix is a compact derivation and interview-use guide for eight formula groups used in Retrieval-Augmented Generation (RAG) that preserves the source equations, numeric examples, conditions, and rules of thumb while translating Best Matching 25 (BM25), Reciprocal Rank Fusion (RRF), Mean Reciprocal Rank (MRR), normalized Discounted Cumulative Gain (nDCG), modularity, Product Quantization (PQ), floating-point operations (FLOPs) with latency, and end-to-end index memory into operational decisions.
Source span: Physical PDF pages 1083 to 1092. Printed pages 1050 to 1059.
Estimated reading time: 30 minutes at 200 words per minute.

### Appendix A2. Question Bank

Archive entry: `chapters/A2_question_bank.md`
Summary: This appendix turns the book's Retrieval-Augmented Generation (RAG) material into a timed self-test with Core, Senior, and Staff prompts plus compact answer spines.
Source span: Physical PDF pages 1093 to 1110. Printed pages 1060 to 1077.
Estimated reading time: 75 minutes at 200 words per minute.

### Appendix A3. Design Checklists

Archive entry: `chapters/A3_design_checklists.md`
Summary: Use these five operational checklists to turn a Retrieval-Augmented Generation (RAG) design review into named decisions, measured quantities, and explicit exit criteria.
Source span: Physical PDF pages 1111 to 1116. Printed pages 1078 to 1083.
Estimated reading time: 43 minutes at 200 words per minute.

### Appendix A4. The RAG Card and Index Datasheet

Archive entry: `chapters/A4_the_rag_card_and_index_datasheet.md`
Summary: This appendix supplies two handoff templates for a Retrieval-Augmented Generation (RAG) system, with the RAG Card documenting scope, retrieval decisions, measured behavior, and known failures while the Index Datasheet documents artifact composition, representation, structure, footprint, performance, and lifecycle.
Source span: Physical PDF pages 1117 to 1121. Printed pages 1084 to 1088.
Estimated reading time: 32 minutes at 200 words per minute.

### Appendix A5. Annotated Reading List

Archive entry: `chapters/A5_annotated_reading_list.md`
Summary: Use this curated, chapter-mapped reading list to connect each Retrieval-Augmented Generation (RAG) paper with the exact result a senior interview candidate should be able to reproduce.
Source span: Physical PDF pages 1122 to 1133. Printed pages 1089 to 1100.
Estimated reading time: 58 minutes at 200 words per minute.

### Appendix A6. Notation Quick Reference

Archive entry: `chapters/A6_notation_quick_reference.md`
Summary: This appendix provides a compact, calculation-oriented reference for the source's symbols, overload rules, and conventions while leaving the extended discussion to the front matter.
Source span: Physical PDF pages 1134 to 1135. Printed pages 1101 to 1102.
Estimated reading time: 14 minutes at 200 words per minute.

### Appendix A7. Glossary

Archive entry: `chapters/A7_glossary.md`
Summary: This appendix decodes the overlapping vocabulary of Retrieval-Augmented Generation (RAG) and preserves the book's exact conventions, distinctions, qualifications, and source pointers.
Source span: Physical PDF pages 1136 to 1141. Printed pages 1103 to 1108.
Estimated reading time: 31 minutes at 200 words per minute.
