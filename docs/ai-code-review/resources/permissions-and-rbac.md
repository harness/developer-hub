---
title: Permissions and RBAC
sidebar_label: Permissions & RBAC
description: Which Harness permissions gate each AI Code Review action, and what the review agent itself can do.
sidebar_position: 20
keywords:
  - ai code review
  - rbac
  - permissions
tags:
  - ai-code-review
  - resources
  - reference
---

There are two distinct permission questions in AI Code Review: what a person needs in order to configure it, and what the review agent itself is allowed to do. This page covers both.

---

## Permissions for people

Every AI Code Review action is authorized against a space. For a repository-scoped action, the space is the repository parent.

| Action | Permission | Evaluated at |
| --- | --- | --- |
| Onboard repositories | `repo_edit` | The space named in the request |
| Check onboarding status | `repo_edit` | The space named in the request |
| Offboard a repository | `repo_edit` | The specific repository |
| Create or update a setting | `repo_edit` | The space, or the repository parent space |
| List repositories with settings | `repo_view` | The space |
| List pull requests | `repo_view` | The space |
| Read review results | `repo_view` | The repository parent space |
| Report review results | `repo_reportCommitCheck` | The repository parent space |

:::warning Setting edits are evaluated at the space, not the repository

Editing a repository-scoped setting is checked against the parent space rather than against that specific repository. Anyone who can edit repositories in a space can edit AI Code Review settings for every repository in it.

If you need per-repository separation of review configuration, split the repositories across spaces.

:::

Viewing results in the Harness UI requires a Harness session with access to the project. A GitHub-only reviewer sees the pull request comment and the status checks but cannot open the full overview. Go to [GitHub sign-in and redirects](/docs/ai-code-review/platforms/github/sign-in-and-redirects) for what that reviewer can act on.

---

## Permissions for the review agent

The agent runs as a dedicated service account created during onboarding, not as the pull request author. Its role grants four permissions:

| Permission | What it allows |
| --- | --- |
| `code_repo_view` | Read AI Code Review settings, list and read status checks, and clone the repository. |
| `code_repo_review` | Add pull request comments, assign labels, and add pull request reviewers. |
| `code_repo_reportCommitCheck` | Report and update status checks. |
| `core_user_view` | Resolve users, such as reviewers and authors. |

`code_repo_push` is deliberately excluded. The agent cannot write to your branches, and cannot commit a fix on your behalf.

A second binding grants the service account the built-in `_llm_gateway_user` role at account scope so the agent can call a model.

Go to [What Harness creates](/docs/ai-code-review/configure/what-harness-creates) to review the service account, role, and token in full.

---

## Common role configurations

**Platform administrator.** Needs `repo_edit` at the account or organization space to onboard repositories and to set the criteria every team inherits. This is the only role that should hold `repo_edit` high in the hierarchy, because a criterion added at organization level reaches every pull request in the organization.

**Team lead.** Needs `repo_edit` on their project space to add criteria for their own repositories, and to onboard repositories within it. They cannot change what they inherit from above.

**Reviewer.** Needs `repo_view` on the project to open results in Harness. A reviewer who only works in GitHub needs nothing in Harness to see the comment and the checks.

---

## Related concepts

- [Scope and inheritance](/docs/ai-code-review/configure/scope-and-inheritance): Which scope owns a setting.
- [What Harness creates](/docs/ai-code-review/configure/what-harness-creates): The agent identity and its role.
- [API reference](/docs/ai-code-review/resources/api-reference): The permission each endpoint requires.
