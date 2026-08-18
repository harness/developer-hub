---
title: Review a pull request end to end
sidebar_label: Review A Pull Request
description: Follow one change from opening a pull request to acting on an AI Code Review finding.
sidebar_position: 20
keywords:
  - ai code review
  - tutorial
  - pull request
tags:
  - ai-code-review
  - workflows
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

This walkthrough takes one pull request from open to merge with AI Code Review running against it. Follow it once on a low-stakes change to see every surface the feature touches before you turn it on for a team.

---

## Before you begin

- **A configured repository:** AI Code Review enabled with at least one enabled criterion. Go to [Define your first review criteria](/docs/ai-code-review/workflows/define-your-first-review-criteria) to add one.
- **A branch with a deliberate change:** Ideally one that should fail a criterion, so you can see a real finding rather than an empty pass.

---

## Open the pull request

Start from a branch that already has a commit on it, so the review has something to read.

1. Push your branch and open a pull request against the default branch.
2. The trigger fires on pull request creation. Confirm an execution of the `aicr` pipeline starts in the target project.

The trigger fires on create, update, and reopen. Opening a pull request that already existed before onboarding does not trigger a review until the next push.

---

## Watch the review start

Within a few moments the pull request shows a comment:

```text
🤖 Harness AI Code Review in progress… · [View results →](<link>)
```

This is the same comment that will be edited when the review completes. The pull request does not accumulate one comment per stage.

---

## Read the result

When the run completes, two things change.

The comment updates in place:

```text
✅ Harness AI Code Review complete · Risk: MEDIUM · [View results →](<link>)
```

And one status check appears per enabled criterion, named `aicr_<criterion-title>_<criterion-id>`, each in one of three states:

| State | What to do |
| --- | --- |
| `success` | Nothing. The criterion passed. |
| `failure` | Read the summary. This is the finding. |
| `error` | Treat as inconclusive rather than as a failure. The run did not produce a verdict for this criterion. |

The risk level is a judgement about the pull request as a whole and is separate from the individual checks. A pull request where every criterion passes can still carry a medium risk.

---

## Open the full results

Follow the `View results →` link to the AI Code Review page for the pull request in Harness. This is where the written overview lives; the comment carries only the state, the risk, and the link.

The link requires a Harness session with access to the project. Go to [GitHub sign-in and redirects](/docs/ai-code-review/platforms/github/sign-in-and-redirects) to understand what a GitHub-only reviewer sees.

---

## Act on a finding

Decide, per finding, whether it is right.

- **The finding is correct.** Fix it in a new commit.
- **The finding is wrong.** The criterion is usually the problem, not the agent. A finding that is technically accurate but irrelevant means the description is too broad; go to [Review criteria best practices](/docs/ai-code-review/workflows/review-criteria-best-practices) to tighten it.
- **The finding is correct but you are shipping anyway.** Whether you can merge past it is decided by your branch rules. AI Code Review reports checks; it does not block merges on its own.

The agent has no push permission, so it cannot commit a fix for you.

---

## Push a fix and re-run

A review is not a one-shot gate. Pushing again is the normal way to re-run it.

1. Commit the fix and push to the same branch.
2. The trigger fires again. Any review still running for this pull request is aborted, so only the newest commit is reviewed.
3. A new comment is posted for the new round. The earlier comment stays on the pull request rather than being removed.
4. The status checks update in place on the new head commit.

:::warning A force push clears the results from view

Results are recorded against a specific commit. A force push that moves the head past the reviewed commit means the stored results no longer match, and the pull request shows no results until the next run completes. This is expected during a rebase.

:::

---

## Troubleshooting

<Troubleshoot
  issue="A Harness AI Code Review run never completes and the pull request comment stays in the in-progress state"
  mode="fallback-only"
  fallback="Open the aicr pipeline execution in the target project and read the agent step logs. The comment is updated only when the agent writes an overview, so a failed or aborted execution leaves the in-progress comment in place."
/>

<Troubleshoot
  issue="Harness AI Code Review posts a second comment on the same pull request instead of updating the first"
  mode="fallback-only"
  fallback="A comment is posted per review round, keyed to the head commit. A new commit starts a new round and a new comment. Earlier comments are left in place because there is no delete step."
/>

<Troubleshoot
  issue="A Harness AI Code Review status check reports error rather than a pass or fail result"
  mode="fallback-only"
  fallback="Error means no verdict was produced for that criterion, and a check that is still pending or running also reads as error through the API. Check the pipeline execution completed, then re-run the review by pushing a commit."
/>

---

## Next steps

- [Review criteria best practices](/docs/ai-code-review/workflows/review-criteria-best-practices): Improve the findings you get.
- [GitHub results, comments, and checks](/docs/ai-code-review/platforms/github/results-comments-and-checks): The full reference for what is posted.
- [FAQs](/docs/ai-code-review/resources/faqs): Common questions and failures.
