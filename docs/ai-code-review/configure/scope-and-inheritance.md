---
title: Scope and inheritance
sidebar_label: Scope & Inheritance
description: How a repository resolves its effective AI Code Review configuration from the spaces above it.
sidebar_position: 20
keywords:
  - ai code review
  - scope
  - inheritance
  - space
tags:
  - ai-code-review
  - configure
---

AI Code Review settings are hierarchical. A setting belongs to exactly one space or one repository, and a repository resolves its effective configuration by walking up the space chain.

This is what lets a platform team define a review standard once and have it apply everywhere, and it is also the most common source of surprise, because the three field groups merge differently.

---

## What you will learn from this topic
- The order Harness walks when resolving a repository configuration.
- Which level wins, per field group.
- How to tell where an effective value came from.

---

## The inheritance chain

A space path has at most three segments, so the chain has at most three levels plus the repository itself:

```text
account
account/org
account/org/project
account/org/project/repo
```

For a repository, Harness collects the repository's own setting, then every ancestor space that has one, ordered shallowest first. A space that defines no setting is skipped rather than treated as empty.

Resolution only happens on a recursive read. A plain read returns exactly what the scope you named defines, and fails if that scope defines nothing. This is worth knowing before you conclude a repository has no criteria.

---

## Merge rules by field

The merge is per field, and the three groups do not behave the same way.

### Connector path and system prompt

The nearest non-empty value wins, and each field resolves independently.

| Level | `connector_path` | `system_prompt` |
| --- | --- | --- |
| Account | `account.shared_llm` | `Be concise.` |
| Organization | empty | `Flag missing tests.` |
| Repository | empty | empty |

The repository resolves `connector_path` from the account and `system_prompt` from the organization. The two fields can come from different levels, and normally do.

### Criteria

Criteria are combined, not replaced. Every level contributes.

| Level | Criteria defined | Criteria that run |
| --- | --- | --- |
| Organization | 2 | |
| Project | 3 | |
| Repository | 1 | 6 |

The order is the repository's own criteria first, then each ancestor shallowest first.

:::warning Criteria are not deduplicated

Two criteria with the same title at project and repository level both run, and both produce a status check. Nothing compares titles or descriptions.

If a team wants to override an inherited criterion, they cannot. They can only add another one. Plan criteria at the level where they belong rather than restating them lower down.

:::

### MCP servers

Entries are merged by server name, and the nearest scope wins on a collision. The whole named entry is taken as a unit, so a repository redefining a server replaces the ancestor's `tools` list rather than adding to it.

---

## Where a value came from

Every resolved value carries a scope marker naming the level that supplied it. On a setting the markers are `connector_path_scope` and `system_prompt_scope`, and each criterion and MCP server entry carries its own `scope`.

Use these to answer "why is this criterion running on my repository". A criterion whose scope is an organization path was not defined on the repository and cannot be removed there.

---

## Override protection

You cannot. An account or organization administrator can set a connector, a system prompt, or a criterion, but nothing stops a lower scope setting its own value and winning.

If you need a standard to hold today, the practical control is who has `repo_edit` at each scope. Go to [Permissions and RBAC](/docs/ai-code-review/resources/permissions-and-rbac) to review who can change what.

---

## Choose a scope

Place a setting at the highest scope where the statement it makes is true for everything beneath it.

- **Account or organization:** standards that apply to everything, such as security or compliance criteria. Changing one here changes every pull request in the account, so treat it as a production change.
- **Project:** conventions a single team owns.
- **Repository:** criteria that only make sense for one codebase, and the connector when a repository must use a different model.

:::info Blanking a field does not opt out

Because inheritance fills any empty field, clearing a connector at repository level causes the ancestor value to be inherited instead. To use a different connector, set it. There is no way to inherit nothing.

:::

---

## Related concepts

- [Settings reference](/docs/ai-code-review/configure/settings-reference): Every field and its validation.
- [Review criteria best practices](/docs/ai-code-review/workflows/review-criteria-best-practices): Where to define criteria and why.
- [Permissions and RBAC](/docs/ai-code-review/resources/permissions-and-rbac): Who can edit a setting at each scope.
