---
title: Limits and quotas
sidebar_label: Limits & Quotas
description: What AI Code Review does and does not bound at beta, and what that means for large pull requests.
sidebar_position: 30
keywords:
  - ai code review
  - limits
  - quotas
tags:
  - ai-code-review
  - resources
  - reference
---

AI Code Review ships no hard limits. Diff size, repository size, review concurrency, and rate limiting are all unbounded.

That is deliberate, not an oversight, and it has a practical consequence worth understanding before you turn it on across an organization.

---

## What is not limited

None of the following are bounded:

- Pull request or diff size. No threshold skips or rejects a review.
- Repository size.
- Review concurrency across repositories.
- Number of review criteria per scope.
- Criterion title and description length.
- Number of MCP servers or tools per server.
- Number of repositories onboarded in one request.

:::warning No limit is not the same as no ceiling

A very large pull request is not rejected by AI Code Review, but it can still fail at the model or in the pipeline. When that happens the failure surfaces as a criterion in the `error` state rather than as a clear message about size.

If large pull requests fail inconsistently while small ones succeed, treat size as the first hypothesis rather than looking for a limit to raise.

:::

---

## Enforced limits

Only two constraints are enforced, and neither is a quota:

| Constraint | Value | Behaviour |
| --- | --- | --- |
| Status check identifier length | 127 characters | The criterion title portion is truncated silently. The criterion id is appended after truncation, so checks stay distinct. |
| Space path depth | 3 segments | A path with four or more segments is rejected. |

The repository listing API pages at 30 results by default and 100 at most, but that is pagination rather than a limit on what you can configure.

---

## Concurrency within one pull request

One review runs per pull request at a time. A new commit aborts the review still running and starts a fresh one, so only the latest commit is reviewed.

---

## Upstream limits that still apply

AI Code Review applies no rate limiting of its own. Two limits outside it still bite:

- **Model capacity.** Sustained review volume across many repositories is bounded by your account model capacity rather than by AI Code Review.
- **Provider API limits.** On the source control side, the status comment is best effort and is dropped rather than retried, so a provider rejecting it means the comment does not appear while the checks and findings still do.

---

## Cost

Reviews consume model tokens on every run. With no hard limits at beta, cost is the real constraint, and it scales with where a criterion is defined rather than with how often it finds something: a criterion at organization level runs on every pull request in the organization whether it fires or not.

Go to [Review criteria best practices](/docs/ai-code-review/workflows/review-criteria-best-practices) to retire criteria that never fire.

---

## Related concepts

- [What is supported](/docs/ai-code-review/whats-supported): Platforms, models, and known boundaries.
- [FAQs](/docs/ai-code-review/resources/faqs): Common failures and questions.
- [Connectors and models](/docs/ai-code-review/configure/llm-connectors-and-models): Model choice and cost.
