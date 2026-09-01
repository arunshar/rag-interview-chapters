# GitHub publication workflow

Use this reference only when the user asks for repository creation, pushes, visibility changes, or README maintenance.

## Authority and visibility

- Verify the signed-in GitHub account before mutation.
- Check whether the proposed repository name already exists.
- Treat repository creation, push, private visibility, and public visibility as separate choices.
- If visibility is not specified and the edition closely reconstructs a source book, create a private repository or ask. Do not make it public by inference.
- A later explicit request to make it public authorizes the visibility change. It does not authorize an open-source license.

## Isolate the publication repository

If the source artifacts live inside a dirty repository, create a standalone repository directory. Copy only the intended study artifacts.

Recommended public repository contents:

```text
README.md
00_INDEX.md
chapters/
rag-interview-chapters.zip
.agents/skills/rag-interview-study-edition/  # when the user requests the reusable skill
```

Exclude:

- original PDF
- manifest and verifier tracker unless the user wants reproducible audit evidence
- temporary page renders
- extraction text
- unrelated source-repository changes
- credentials and private paths

When publishing the skill, sanitize its public copy. Replace machine-specific absolute paths, remove private identity or checksum details that are unnecessary for reuse, and keep repository-relative instructions.

## README contract

Use [../assets/README_TEMPLATE.md](../assets/README_TEMPLATE.md) as a starting point. A strong README contains:

- audience and purpose
- direct starting links
- the repeated study-unit anatomy
- repository tree
- suggested reading paths
- source-part map
- linked summary for every unit
- current repository counts separated from creation-time QA records
- ZIP checksum
- source and rights boundary

Validate every relative link. Keep tables narrow enough for GitHub. Do not claim audit records are reproducible when the runner or evidence is absent.

Do not add an open-source license to a derivative study edition unless the user confirms the necessary rights and requests a license.

## Commit and push

Use ordinary Git identity. Do not add a Codex co-author footer.

Example sequence:

```text
git init -b main
git add README.md 00_INDEX.md chapters rag-interview-chapters.zip
# Add .agents/skills/rag-interview-study-edition only when the user requested it.
git commit -m "Add RAG interview study edition"
gh repo create OWNER/REPOSITORY --private --source . --remote origin --push
```

Before a later public change, finish and push the public-facing README first.

## Verify the push

Do not rely only on `git push` output. Verify:

- local HEAD
- `origin/main`
- GitHub's reported default branch
- remote commit SHA and message
- README blob SHA versus `git hash-object README.md`
- remote file count and absence of the PDF

## Change and verify visibility

After explicit authorization:

```text
gh repo edit OWNER/REPOSITORY --visibility public --accept-visibility-change-consequences
```

Then verify through both authenticated and anonymous paths:

```text
gh repo view OWNER/REPOSITORY --json visibility,isPrivate,url
curl -sS https://api.github.com/repos/OWNER/REPOSITORY
curl -sS -o /dev/null -w '%{http_code}' https://github.com/OWNER/REPOSITORY
curl -sS -o /dev/null -w '%{http_code}' https://raw.githubusercontent.com/OWNER/REPOSITORY/main/README.md
```

Public completion requires `visibility: public`, `private: false`, and anonymous HTTP 200 readback.

## Source and rights boundary

Use careful factual wording:

```text
This repository is an unofficial set of study notes derived from a user-provided technical book. The original PDF is not included, and no affiliation with or endorsement by the book's author or publisher is claimed. This repository does not include an open-source license. Public access does not grant reuse rights to the original publication or its protected content.
```

This wording is a boundary statement, not a legal conclusion or a substitute for permission.
