---
title: What Harness creates during onboarding
sidebar_label: What Harness Creates
description: Every Harness resource AI Code Review onboarding creates, by name, and what offboarding removes.
sidebar_position: 30
keywords:
  - ai code review
  - onboarding
  - service account
  - pipeline
  - trigger
tags:
  - ai-code-review
  - configure
  - reference
---

Turning on AI Code Review creates real, named resources in your Harness account. This page lists every one of them so an administrator can account for what appeared, and so a security reviewer can see exactly what the agent is allowed to do.

Onboarding is idempotent. Resources that already exist are reused rather than duplicated.

---

## Account-level identity

The first onboarding in an account creates a dedicated identity for the review agent. The agent never runs as the person who opened the pull request.

| Resource | Identifier | Name |
| --- | --- | --- |
| Service account | `aicr_service_account` | AI Code Review |
| Custom role | `aicr_agent_role` | AI Code Review Agent |
| API key | `aicr_api_key` | AI Code Review API Key |
| Token | `aicr_token` | AI Code Review Token |
| Secret | `aicr_token_secret` | AI Code Review Token |

The service account email is `aicr_service_account@service.harness.io`.

The token is created with a validity of 15 years and stored as an inline secret in the Harness built-in secret manager. The pipeline reads it as the `HARNESS_TOKEN` stage variable.

:::warning The token is long lived

A 15 year token is not rotated automatically. Treat `aicr_token_secret` as a standing credential in your account and include it in whatever credential review process you already run.

:::

---

## Agent permissions

`aicr_agent_role` grants exactly four permissions:

| Permission | What it allows |
| --- | --- |
| `code_repo_view` | Read AI Code Review settings, list and read status checks, and clone the repository. |
| `code_repo_review` | Add pull request comments, assign labels, and add pull request reviewers. |
| `code_repo_reportCommitCheck` | Report and update status checks. |
| `core_user_view` | Resolve users, such as reviewers and authors. |

`code_repo_push` is deliberately excluded. The agent cannot write to your branches.

The role is bound to the service account through a resource group matching the onboarding scope:

| Onboarding scope | Resource group |
| --- | --- |
| Project | `_all_project_level_resources` |
| Organization | `_all_organization_level_resources` |
| Account | `_all_account_level_resources` |

A second, account-level binding grants the service account the built-in `_llm_gateway_user` role against `_all_resources_including_child_scopes`, which is what lets the agent call a model.

---

## The review pipeline

One pipeline is created per target project.

| Property | Value |
| --- | --- |
| Identifier | `aicr` |
| Name | AI Code Review |
| Stage type | CI |
| Infrastructure | Harness Cloud, Linux, Amd64 |
| Clone codebase | Enabled |
| Caching | Disabled |
| Build intelligence | Disabled |
| Step | One step of type `Agent`, named AI Code Review Agent, running agent `aiCodeReviewAgent` |

The stage declares the permissions the agent step needs:

```yaml
permissions:
  code_repository: view|push|review
  user: view
  ai_llm_gateway: access
```

The repository name and build are runtime inputs supplied by the trigger, so the same pipeline serves every repository in the project.

:::info The pipeline is created inline

The pipeline is stored in Harness, not in your repository. The pipeline record carries a config path of `.harness/aicr.yaml`, but nothing reads or writes that file. Do not treat it as a configuration-as-code hook.

:::

---

## The pull request trigger

One trigger is created per repository, per target project.

| Property | Value |
| --- | --- |
| Identifier and name | `aicr_pr_trigger_<repository>` |
| Source type | Webhook, Harness |
| Event | Pull request |
| Actions | Create, Update, Reopen |
| Auto abort previous executions | Enabled |
| Payload and header conditions | None |

The identifier is derived from the repository name. Characters outside `0-9`, `a-z`, `A-Z`, `_`, and `$` are replaced with an underscore, and the result is truncated to 64 characters.

Because the trigger has no payload or header conditions, every pull request in the repository is reviewed. There is no branch or author filtering.

Re-running onboarding updates an existing trigger rather than failing, so a connector change is picked up on the next onboard call.

---

## Per-repository records

For each onboarded repository, Harness also creates:

- A pipeline record scoped to the repository, identifier `aicr`, config path `.harness/aicr.yaml`.
- An AI Code Review setting anchored to the repository path, with empty criteria and an empty MCP server map. This setting is the installation record. Without it, the repository does not appear in pull request listings.
- The repository-level AI pull request review flag, set to enabled.

For GitHub repositories, a linked Harness Code repository is created and its connector reference is stored alongside the provider path.

---

## What offboarding removes

Offboarding a repository removes two things:

- The pull request trigger for that repository.
- The repository-level AI pull request review flag, which is set back to disabled.

Everything else is left in place:

- The `aicr` pipeline in each project.
- The service account, role, and both role bindings.
- The API key, token, and secret.
- The repository pipeline record.
- The AI Code Review setting for the repository, including its criteria.
- The linked repository and its connector metadata, for GitHub repositories.

:::warning Offboarding does not fan out

Onboarding at an organization or account scope creates triggers across every project. Offboarding removes the trigger only in the project derived from the repository path. If you onboarded broadly, remove the remaining triggers yourself.

:::

---

## Related concepts

- [Get started with AI Code Review](/docs/ai-code-review/get-started): The onboarding walkthrough.
- [Permissions and RBAC](/docs/ai-code-review/resources/permissions-and-rbac): What a person needs, as opposed to what the agent has.
- [API reference](/docs/ai-code-review/resources/api-reference): The onboard and offboard endpoints.
