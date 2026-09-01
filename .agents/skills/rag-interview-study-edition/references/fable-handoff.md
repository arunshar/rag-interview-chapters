# Fable handoff

## Canonical skill

Fable should read this file first:

```text
.agents/skills/rag-interview-study-edition/SKILL.md
```

The repository `.agents/skills` location is project-scoped. Copy the same skill folder to the user-level `.agents/skills` directory when it must be available outside this repository. Supporting references, scripts, and templates live in the same folder.

## Copy-paste prompt for Fable

```text
Load and follow the skill at .agents/skills/rag-interview-study-edition/SKILL.md. Read only the references required for my request. The completed case study is documented in references/session-recap.md, and the public study repository is https://github.com/arunshar/rag-interview-chapters. Preserve the evidence boundaries, do not include the original PDF in a repository, do not add an open-source license without confirmed rights, and require current authorization before any GitHub mutation or public visibility change. Tell me which skill mode you selected before acting.
```

## Codex invocation

In a new Codex session, invoke:

```text
Use $rag-interview-study-edition to continue the existing RAG study edition.
```

For a new book conversion:

```text
Use $rag-interview-study-edition to convert this RAG book PDF into a manifest-driven, whiteboard-ready Markdown study package. Independently verify every unit, build the index and minimal ZIP, and stop before GitHub publication unless I authorize it.
```

For an audit-only run:

```text
Use $rag-interview-study-edition to audit this existing package without changing files. Do not rebuild the ZIP, publish, or change repository visibility.
```

## Completed example

- Repository root: the checkout containing `README.md`, `00_INDEX.md`, `chapters/`, and the portable ZIP
- Public repository: `https://github.com/arunshar/rag-interview-chapters`
- Initial expanded README commit: `51b65e61af66ad6b5543f1f6db9ad53f8371f712`
- ZIP SHA-256: `ccba472284b229b73b890530340663c591b0ad1bdceef18cb34be103a082d819`
- Current Mermaid verification: 175 of 175 blocks in both the default and dark themes
- Current hardcoded Mermaid color count: 0

## Authority boundary

The completed session authorized the current public repository state only. It does not provide standing permission to push future edits, create releases, publish a different source book, or change visibility elsewhere. Obtain current user direction for each external mutation.
