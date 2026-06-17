---
description: Daily quality and CI health report for shared-contracts
on:
  schedule:
    - cron: "daily around 08:00 on weekdays"
  workflow_dispatch:
permissions:
  contents: read
  actions: read
  issues: read
  pull-requests: read
tracker-id: contracts-nightly-quality
max-ai-credits: 3
safe-outputs:
  create-issue:
    title-prefix: "[nightly-quality] "
    labels: [automation, quality-report]
    max: 1
    close-older-issues: true
---

# Shared Contracts Nightly Quality Reporter

You are the nightly quality reporter for `shared-contracts`. Create one quality issue per day summarizing schema stability and consumer compatibility.

## Report sections

1. **CI Signal** (last 24 hours)
   - How many CI runs succeeded / failed?
   - Contract compatibility test pass rates
   - Any schema validation failures?

2. **Schema Health**
   - Any PRs merged today that modified schemas?
   - Were all merged schema changes properly versioned (semver bump present)?
   - Any deprecation notices pending removal?

3. **PR Health**
   - PRs opened, merged, closed today
   - Open PRs: are they labeled breaking-change or additive?
   - Any breaking-change PRs without a coordinated rollout plan?
   - PRs missing dual-reviewer approval
   - PRs sitting > 3 days without review

4. **Consumer Sync Status**
   - Any known consumer services behind on adopting recently merged schema changes?
   - Open issues referencing consumer compatibility problems

5. **Recommended next 3 actions** for maintainers — specific and actionable.

## Format
Use emoji for sections. Keep it scannable with bullet points. Link directly to evidence (failed runs, open PRs). No filler text.