# Copilot Instructions for shared-contracts

This repository is the shared source of truth for cross-repo contracts in the SDLC demo.

## Load order
1. Read `.github/instructions/global-engineering-standards.md`.
2. If the task changes schemas, validation, or shared examples, also read `.github/instructions/contracts-rules.md` when present.
3. Read the GitHub issue body and follow its task-specific constraints.

## Mandatory skill bootstrap (cloud and local)
1. Read `.github/skills/skills.lock.json`.
2. Read `.github/skills/skills-manifest.json`.
3. Load at least one relevant skill contract before implementation:
   - Issue shaping/triage: `.github/skills/issue-triage/v1/SKILL.md`
   - PR analysis/review: `.github/skills/pr-review/v1/SKILL.md`
   - Test strategy: `.github/skills/test-plan/v1/SKILL.md`
   - Contract or response-shape impact: `.github/skills/contract-impact/v1/SKILL.md`
   - Incident handling: `.github/skills/incident-response/v1/SKILL.md`
4. Follow the active skill output contract (`summary`, `evidence`, `risk`, `actions`) when posting issue/PR conclusions.
5. If required skill files are missing, stop and call out the gap instead of improvising.
6. Token discipline:
   - Read minimally: issue/PR body, changed files, and referenced constraints first.
   - Do not paste long logs/files; link them and summarize in bullets.
   - Keep working summaries concise and evidence-first.

## Repo intent
- Keep shared contracts explicit, stable, and easy for every repo to consume.
- Treat this repo as a coordination point, not a dumping ground for service logic.
- Prefer additive evolution and documented versioning over breaking churn.

## Architecture guardrails
- A contract change is a cross-repo event.
- Keep examples, schema intent, and validation rules aligned.
- Avoid product-specific branching inside shared artifacts.

## Safety boundaries
- Do not change contract meaning casually to satisfy one repo.
- Do not merge incompatible naming or shape changes without updating dependent issues.
- Escalate if a contract change needs repo-wide sequencing or migration planning.
