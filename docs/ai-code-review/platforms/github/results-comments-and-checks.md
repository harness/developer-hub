---
title: GitHub results, comments, and checks
sidebar_label: Results On GitHub
description: What AI Code Review posts to a GitHub pull request, including the summary comment, line-level findings, labels, reviewers, and check identifiers.
sidebar_position: 20
keywords:
  - ai code review
  - github checks
  - pull request comments
  - suggested reviewers
  - labels
tags:
  - ai-code-review
  - platforms
  - github
  - reference
---

AI Code Review reports to a pull request in three places: a summary comment, line-level comments on individual findings, and one status check per review criterion.

---

## What you will learn from this topic
- What the summary comment contains.
- How a criterion becomes a status check, and how the identifier is built.
- Where suggested labels and reviewers come from.
- What happens on a new commit or a force push.

---

## The summary comment

The agent posts one summary comment on the pull request. It carries:

- **A high-level overview** of the change and what the review found.
- **Suggested reviewers** for the pull request.
- **Suggested labels** for the pull request.
- **A collapsed details section**, so the comment stays readable on a long pull request.
- **A link back to the full detail** in Harness.

The summary is the part most reviewers read. Everything in it is also available on the AI Code Review page in Harness, which is what the link points at.

Alongside it, Harness maintains a short status comment that tracks the run itself and carries the overall risk once the review completes:

```text
🤖 Harness AI Code Review in progress… · [View results →](<link>)
```

```text
✅ Harness AI Code Review complete · Risk: LOW · [View results →](<link>)
```

The risk value is uppercased and is one of `LOW`, `MEDIUM`, or `HIGH`. That comment is edited in place as the review progresses rather than being reposted.

:::info The status comment is best effort

It never fails a review. If the Harness UI base URL is not configured, or the repository has no linked provider connector, it is not posted and the checks and findings appear as normal.

:::

---

## Line-level comments

Individual findings are posted as line-level comments on the diff, at the place the finding applies to. This is where a reviewer acts, rather than in the summary.

A finding is a suggestion, not a gate. The agent has no push permission, so it cannot commit the fix itself.

---

## Suggested labels and reviewers

| Signal | Source |
| --- | --- |
| Suggested labels | The labels that already exist in the repository. The agent picks from your set rather than inventing new ones. |
| Suggested reviewers | Primarily the git blame of the files in the patch, so the people who last touched the changed lines. |

Both are suggestions on the pull request. Neither overrides a CODEOWNERS rule or a required reviewer policy you already have.

Because reviewer suggestions come from git blame, they degrade in the same places blame does: a large reformatting commit, a file move, or a generated file will point at whoever last rewrote it rather than whoever owns it.

---

## Status checks

Every enabled criterion produces exactly one status check on the pull request head commit. There is no aggregate check.

The check identifier is derived from the criterion title:

```text
aicr_<slugified-title>_<criterion-id>
```

Characters outside `0-9`, `a-z`, `A-Z`, `-`, `_`, `.`, and `$` are replaced with a single underscore, and leading and trailing underscores are trimmed. The whole identifier is capped at 127 characters, and the title portion is truncated to fit. A title that slugifies to nothing produces `aicr_criterion_<criterion-id>`.

Two consequences worth knowing:

- **Renaming a criterion changes its check identifier.** Branch protection rules that require a check by name need updating when a title changes.
- **Long titles are truncated, not rejected.** Two criteria with long titles sharing a prefix still produce distinct checks, because the criterion id is appended after truncation.

### Result states

| State | Meaning |
| --- | --- |
| `success` | The criterion passed. |
| `failure` | The criterion did not pass. |
| `error` | No verdict was produced for this criterion. |

A check that is still pending or running is reported as `error` when read back through the API. There is no distinct pending state in the AI Code Review result model, so treat `error` as inconclusive rather than as a failure.

Re-running a review upserts the existing checks rather than adding new ones.

---

## Risk levels

| Risk | Meaning |
| --- | --- |
| `low` | The agent found nothing that should hold up the change. |
| `medium` | The agent found something worth a human decision. |
| `high` | The agent found something it considers serious. |

Risk is an overall judgement for the pull request, separate from the pass or fail state of any individual criterion. A pull request can have every criterion pass and still carry a medium risk.

---

## New commits and force pushes

Results are recorded against a specific head commit.

- **A new commit** aborts any review still running and starts a fresh one.
- **A force push past the reviewed commit** means the stored results no longer match the head, so the pull request shows no results until the next run completes.

---

## Without a Harness account

Comments and status checks are visible on GitHub to anyone who can see the pull request, with no Harness account required.

The linked detail page is in the Harness UI and does require an account. Go to [GitHub sign-in and redirects](/docs/ai-code-review/platforms/github/sign-in-and-redirects) to understand what that reviewer can and cannot reach.

---

## Related concepts

- [Review criteria](/docs/ai-code-review/overview): What produces each check.
- [Harness Code Repository](/docs/ai-code-review/platforms/harness-code-repository): The same surfaces on a Harness Code pull request.
- [Review criteria best practices](/docs/ai-code-review/workflows/review-criteria-best-practices): Reduce the number of checks a reviewer ignores.
