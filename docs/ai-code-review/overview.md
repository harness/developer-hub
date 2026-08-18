---
title: AI Code Review overview and key concepts
sidebar_label: Overview & Key Concepts
description: What Harness AI Code Review does, how a review runs, and the concepts you need before you turn it on.
sidebar_position: 10
keywords:
  - ai code review
  - aicr
  - pull request review
  - review criteria
  - review agent
tags:
  - ai-code-review
  - overview
---

Harness AI Code Review runs an AI agent against every pull request and reports what it finds as status checks and comments. It works on GitHub repositories and on Harness Code repositories.

AI review tools are not scarce. What Harness adds is the governance around them: review standards defined as criteria and inherited down your account hierarchy, the same role-based access control as the rest of the platform, and your own model provider rather than someone else's. On top of that, because the agent runs inside a Harness pipeline, it can reach Harness delivery data that a diff-only reviewer cannot.

---

## What you will learn from this topic
- What a review criterion is, and why criteria are the unit of configuration.
- Where AI Code Review settings live, and how a repository inherits them.
- What a review run produces on a pull request.
- What AI Code Review does not do today.

---

## Review criteria

A review criterion tells the agent what to check. Each one is a free text title and description plus a few settings, so you write review standards in plain language rather than configuring rules.

A worked example, and a good model for your own:

| Field | Value |
| --- | --- |
| Title | `Do not leak PII` |
| Description | `Ensure PII like names and emails do not get stored unnecessarily in places like log statements. They should be sanitized.` |

The full field list:

| Field | Required | Notes |
| --- | --- | --- |
| Title | Yes | Names the criterion, and forms the identifier of the status check it produces. |
| Description | Yes | The instruction the agent evaluates against. |
| Enabled | No | Whether the criterion runs. |
| Bypassable | No | Whether the criterion can be bypassed. |
| Scope | Read only | Records which scope in the inheritance chain supplied this criterion. |

Every enabled criterion produces exactly one status check on the pull request. There is no aggregate check. A pull request with six criteria receives six checks.

Criteria are how review policy is expressed, so they are also what makes the feature governable: an organization can hold every repository beneath it to the same standard without asking each team to configure anything.

Go to [Review criteria best practices](/docs/ai-code-review/workflows/review-criteria-best-practices) to write criteria that produce findings your team acts on.

---

## Settings, scope, and inheritance

An AI Code Review setting belongs to exactly one space or exactly one repository, never both. A space setting applies to every repository beneath it. The four scopes are account, organization, project, and repository.

When a repository resolves its configuration, Harness walks the space chain from shallowest to deepest and merges what it finds. The merge is per field, and the three field groups behave differently:

- **Connector and system prompt:** the nearest non-empty value wins, and each field resolves independently. A repository can inherit its connector from the account and its system prompt from the project.
- **Criteria:** criteria from every level are combined, not replaced. A repository with two criteria under a project that defines three runs all five.
- **MCP servers:** entries are merged by server name, and the nearest scope wins on a name collision.

Every inherited value carries a scope marker recording where it came from, so you can always tell which level supplied it.

Go to [Scope and inheritance](/docs/ai-code-review/configure/scope-and-inheritance) to work through the precedence rules in detail.

---

## How a review runs

Every review follows the same sequence, whichever platform the pull request lives on.

1. A pull request is opened, updated, or reopened in a connected repository.
2. A Harness trigger fires the `aicr` pipeline for that repository. A new push aborts any review still running for the same pull request.
3. The pipeline runs a worker agent on Harness Cloud infrastructure.
4. The agent pulls in its context: the diff, the review criteria, the system prompt, and the configuration for that scope.
5. The agent explores the files, the diff, the repository metadata, and the git history, evaluating each criterion.
6. The agent posts results back through the connector: a summary comment on the pull request, line-level comments for individual findings, and one status check per criterion.

For a GitHub repository, step 1 works because onboarding created a linked Harness Code repository that mirrors your code. For a Harness Code repository there is no linking and no connector: it is a trigger, a pipeline, and the agent.

Results are always tied to a specific commit. If the pull request is force-pushed past the reviewed commit, the results for that commit no longer apply.

Go to [What Harness creates](/docs/ai-code-review/configure/what-harness-creates) to review the pipeline, trigger, and service account this depends on.

---

## Results and risk

Each criterion resolves to one of three states:

| State | Meaning |
| --- | --- |
| `success` | The criterion passed. |
| `failure` | The criterion did not pass. |
| `error` | The run did not produce a verdict for this criterion. A check that is still pending or running also reports as `error` through the API. |

Alongside the per-criterion checks, the agent posts a summary to the pull request carrying a high-level overview, the individual findings, suggested reviewers, suggested labels, and a link back to the full detail in Harness. An overall risk level of `low`, `medium`, or `high` is recorded for the pull request.

Go to [GitHub results, comments, and checks](/docs/ai-code-review/platforms/github/results-comments-and-checks) to review exactly what appears on a pull request.

---

## The agent and Harness context

Because the review runs inside Harness, the agent can reach Harness data through the Harness MCP server rather than reading the diff alone. Two examples of what that makes possible:

- **Do not repeat a past incident.** Harness AI SRE maintains your incident history, so the agent can surface incidents relevant to the change being proposed.
- **Catch configuration that will not work.** The agent can check deployment configuration to confirm that variables referenced by the change are actually set.

The two examples above are what the agent supports today.

---

## The agent and its permissions

The agent runs as a dedicated Harness service account, not as the person who opened the pull request. Onboarding creates that service account and grants it four permissions and nothing more:

| Permission | What it allows |
| --- | --- |
| `code_repo_view` | Read AI Code Review settings, list and read status checks, and clone the repository. |
| `code_repo_review` | Add pull request comments, assign labels, and add pull request reviewers. |
| `code_repo_reportCommitCheck` | Report and update status checks. |
| `core_user_view` | Resolve users, such as reviewers and authors. |

Push permission is deliberately excluded. The agent cannot write to your branches.

---

## What AI Code Review does not do

These are deliberate boundaries rather than gaps waiting to be filled, and each one changes how you roll the feature out.

- **It does not merge or block on its own.** Checks are reported to the pull request. Whether a failing check blocks a merge is decided by your branch protection rules.
- **It does not push code.** The agent has no push permission, so it cannot commit a fix for you.
- **It does not store criteria in Git.** Criteria, the connector, and the system prompt live in Harness and are managed through the UI or the API. There is no configuration-as-code path for them today.
- **It does not let an administrator lock a setting.** A lower scope can always override an inherited connector or system prompt.
- **It does not deduplicate criteria across scopes.** Two criteria with the same title at project level and repository level both run, and both produce a check.

---

## Related concepts

- [Get started with AI Code Review](/docs/ai-code-review/get-started): Turn it on for a GitHub or Harness Code repository.
- [What is supported](/docs/ai-code-review/whats-supported): Platforms, models, and current boundaries.
- [Settings reference](/docs/ai-code-review/configure/settings-reference): Every setting field and its behaviour.
