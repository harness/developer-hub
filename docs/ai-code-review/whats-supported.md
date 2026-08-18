---
title: What is supported
sidebar_label: What's Supported
description: Supported source control platforms, models, scopes, and current boundaries for AI Code Review.
sidebar_position: 30
keywords:
  - ai code review
  - supported platforms
  - github
  - harness code
  - anthropic
tags:
  - ai-code-review
  - reference
---

This page lists what AI Code Review supports today. Support changes during beta, so check this page before you file an issue.

---

## Source control platforms

| Platform | Status | Notes |
| --- | --- | --- |
| Harness Code Repository | Supported | No connector required. Enabled by feature flag, then per repository. |
| GitHub Cloud | Supported | Uses a standard Harness GitHub connector. |
| GitHub Enterprise Server | Supported | Same connector model as GitHub Cloud. |
| GitLab | Coming soon | Not available today. |
| Bitbucket | Coming soon | Not available today. |

GitHub repositories are reviewed through a linked Harness Code repository rather than in place. This is why GitHub onboarding waits for an import to finish and Harness Code onboarding does not.

---

## Connectors

AI Code Review uses standard Harness GitHub connectors. There is no separate AI Code Review GitHub App to install, and most teams already have a suitable connector.

| Property | Supported |
| --- | --- |
| Authentication | Any type the Harness GitHub connector supports, including personal access token and OAuth |
| Connector scope | Account-level or repository-level |
| Provider repository identifier | Required in `owner/repo` form for account-level connectors, must be empty for repository-level connectors |

Go to [GitHub integration](/docs/ai-code-review/platforms/github/github-integration) to review the connector requirements in detail.

---

## Models

| Provider | Models | Notes |
| --- | --- | --- |
| Anthropic | Any Anthropic model, including Sonnet, Opus, and Fable | Opus is recommended |
| Anthropic on Amazon Bedrock | Any Anthropic model available in your Bedrock account | For accounts that require models to stay inside AWS |

Anthropic is the only provider supported at beta. Bring your own key, or use the Harness AI gateway.

---

## Configuration scopes

A setting belongs to exactly one space or exactly one repository, never both.

| Scope | Path form | Applies to |
| --- | --- | --- |
| Account | `account` | Every project in the account |
| Organization | `account/org` | Every project in the organization |
| Project | `account/org/project` | Every repository in the project |
| Repository | `account/org/project/repo` | That repository only |

A space path has at most three segments. A path with four or more segments is rejected.

---

## Review triggers

| Event | Reviewed |
| --- | --- |
| Pull request created | Yes |
| Pull request updated with a new commit | Yes |
| Pull request reopened | Yes |
| Pull request closed or merged | No |
| Comment or label added | No |
| Manual re-run | Through the pipeline, not through the pull request |

A new push aborts a review still running for the same pull request, so only the latest commit is reviewed.

There is no branch, author, or label filtering on the trigger. Every pull request in an onboarded repository is reviewed.

---

## Result states

| State | Meaning |
| --- | --- |
| `success` | The criterion passed. |
| `failure` | The criterion did not pass. |
| `error` | No verdict was produced. Pending and running checks also report as `error` through the API. |

There is no `pending` or `running` result state in the API. If you are polling for completion, treat `error` as inconclusive rather than as a failure.

---

## Risk levels

| Risk | Appears as |
| --- | --- |
| `low` | `Risk: LOW` |
| `medium` | `Risk: MEDIUM` |
| `high` | `Risk: HIGH` |

While a review is running, no risk level is shown.

---

## Known boundaries

None of the following are defects. They are the shape of the beta, and each one has a practical consequence.

- **No hard limits.** Diff size, repository size, review concurrency, and rate limiting are unbounded. Go to [Limits and quotas](/docs/ai-code-review/resources/limits-and-quotas) to understand what that means in practice.
- **One check per criterion.** There is no aggregate check to require in branch protection. Requiring AI Code Review on a merge means requiring the individual checks.
- **Criteria are not deduplicated across scopes.** A criterion defined at both project and repository level produces two checks.
- **A setting cannot be locked against override.** An account administrator cannot prevent a lower scope changing an inherited value.
- **Criteria cannot be stored in Git.** There is no configuration-as-code path for review criteria, the connector, or the system prompt.
- **The agent cannot push.** It has no push permission, so it cannot commit a fix.
- **A Harness account is required to see full results.** Comments and checks are visible on GitHub without one, but the detail page is not.
- **Offboarding is partial.** Removing a repository deletes its trigger and disables review on it. The pipeline, service account, role, token, secret, and stored settings remain.
- **Results are per commit.** A force push past the reviewed commit removes the results from view.

---

## Related concepts

- [AI Code Review overview and key concepts](/docs/ai-code-review/overview): What the agent evaluates and how a review runs.
- [Connectors and models](/docs/ai-code-review/configure/llm-connectors-and-models): Choose a model.
- [Get started with AI Code Review](/docs/ai-code-review/get-started): Turn it on for a repository.
