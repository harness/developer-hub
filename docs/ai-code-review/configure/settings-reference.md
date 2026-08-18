---
title: Settings reference
sidebar_label: Settings Reference
description: Every AI Code Review setting field, its validation rules, and how updates behave.
sidebar_position: 10
keywords:
  - ai code review
  - settings
  - criteria
  - mcp servers
tags:
  - ai-code-review
  - configure
  - reference
---

An AI Code Review setting holds everything the review agent needs for a scope: which model connector to use, an optional system prompt, the review criteria to evaluate, and any additional MCP servers the agent may call.

A setting belongs to exactly one space or exactly one repository, never both and never neither.

---

## Fields on a setting

| Field | Type | Notes |
| --- | --- | --- |
| `space_path` | String | Set only on space-scoped settings. At most three segments, `account/org/project`. |
| `repo_path` | String | Set only on repository-scoped settings. Validated by confirming the repository exists. |
| `connector_path` | String | The model connector the agent uses. Not validated. May be empty. |
| `system_prompt` | String | Instructions applied to every review in this scope. Not validated. May be empty. |
| `mcp_servers` | Object | Additional tools the agent may call. Defaults to `{}`. |
| `criteria` | Array | The review criteria evaluated on a pull request. |
| `connector_path_scope` | String | Read only. Which scope supplied the effective connector. |
| `system_prompt_scope` | String | Read only. Which scope supplied the effective system prompt. |
| `version` | Integer | Read only. Incremented on every update. |
| `id`, `created`, `created_by`, `updated`, `updated_by` | Read only | Audit fields. Timestamps are Unix milliseconds. |

Exactly one of `space_path` and `repo_path` must be supplied. Supplying both, or neither, is rejected.

---

## Criteria

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | Integer | On update only | Supply the existing id to update a criterion. Omit it to create one. |
| `title` | String | Yes | Rejected if empty. Forms the status check identifier. |
| `description` | String | Yes | Rejected if empty. The instruction the agent evaluates. |
| `enabled` | Boolean | No | Defaults to `false` when omitted. |
| `bypassable` | Boolean | No | Defaults to `false` when omitted. |
| `scope` | String | Read only | Which scope in the chain supplied this criterion. |

There is no limit on the number of criteria, no length limit on a title or description, and no uniqueness constraint on titles.

:::warning An update replaces the whole criteria set

An update is a full replacement, not a patch. Criteria present on the setting but absent from the update payload are deleted. Sending an empty criteria list deletes every criterion in that scope.

`enabled` and `bypassable` are plain booleans, so omitting one is indistinguishable from sending `false`. Restate every field on every update, or criteria silently become disabled.

:::

---

## MCP servers

`mcp_servers` is a JSON object mapping a server name to its configuration:

```json
{
  "internal-standards": {
    "connector_path": "account.standards_mcp",
    "tools": ["lookup_policy", "list_owners"]
  }
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `connector_path` | Yes | Rejected if empty. |
| `tools` | No | Each entry must be non-empty. |

Unknown keys are rejected. An entry submitted with an empty `tools` array is returned without the field, because empty lists are omitted on read.

---

## Update behaviour

Every write is a full replacement of the fields it carries:

- Omitting `connector_path` sets it to empty.
- Omitting `mcp_servers` resets it to `{}`.
- Omitting `criteria` deletes every criterion on the setting.

:::warning Blanking a field re-enables inheritance rather than clearing it

Inheritance fills any field that resolves to empty. Setting `connector_path` to an empty string at repository level does not mean "no connector", it means the nearest ancestor value is inherited instead.

There is no way to express "explicitly none" for `connector_path` or `system_prompt`. To stop inheriting a connector, set a different one rather than clearing it.

:::

---

## Read a setting

A read returns the setting for the scope you ask for. By default it returns only what that exact scope defines, and it fails if that scope has no setting of its own.

Add `recursive=true` to resolve the effective configuration, including everything inherited from ancestor spaces. A recursive read succeeds even when the scope defines nothing itself.

Inherited values carry a scope marker so you can always tell which level supplied them. Go to [Scope and inheritance](/docs/ai-code-review/configure/scope-and-inheritance) to review the merge rules.

---

## Concurrent edits

Settings carry a `version` that increments on each update, and an update fails if the stored version changed since it was read. The version cannot be supplied by a client, so this protects against two writes racing inside Harness rather than against a stale editor left open in a browser tab.

If two people edit the same scope from the UI, the last write wins.

---

## Related concepts

- [Scope and inheritance](/docs/ai-code-review/configure/scope-and-inheritance): How a repository resolves its effective configuration.
- [Define your first review criteria](/docs/ai-code-review/workflows/define-your-first-review-criteria): Create criteria in the UI or through the API.
- [API reference](/docs/ai-code-review/resources/api-reference): Request and response shapes for the settings endpoints.
