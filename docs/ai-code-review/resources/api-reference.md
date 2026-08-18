---
title: API reference
sidebar_label: API Reference
description: AI Code Review REST endpoints for onboarding, settings, review results, and pull request overviews.
sidebar_position: 10
keywords:
  - ai code review
  - api
  - rest
  - openapi
tags:
  - ai-code-review
  - resources
  - reference
---

AI Code Review exposes a REST API under `/aicr/`. Every endpoint is authorized against a Harness space, derived from the `space_path` or `repo_path` query parameter on the request.

A generated OpenAPI specification is served at `/aicr/openapi.yaml`.

---

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/v1/onboard` | Turn on AI Code Review for one or more repositories |
| `POST` | `/v1/onboard/status` | Check which repositories are already onboarded |
| `POST` | `/v1/offboard` | Remove the trigger and disable review for one repository |
| `GET` | `/v1/settings` | Read a setting, optionally resolving inheritance |
| `POST` | `/v1/settings` | Create a setting for a space or repository |
| `PUT` | `/v1/settings` | Replace a setting |
| `GET` | `/v1/repos` | List repositories with AI Code Review settings in a space |
| `GET` | `/v1/prs` | List pull requests across a space, with risk where available |
| `GET` | `/v1/pullreqs/{pr_number}/review` | Read per-criterion results for a pull request |
| `POST` | `/v1/pullreqs/{pr_number}/review` | Report per-criterion results |
| `GET` | `/v1/pullreqs/{pr_number}/overview` | Read the pull request overview |
| `POST` | `/v1/pullreqs/{pr_number}/overview` | Write the pull request overview |

The `review` and `overview` write endpoints are how the review agent reports back. You do not normally call them yourself.

---

## Onboard and offboard

### Onboard repositories

`POST /v1/onboard?space_path=<space>`

```json
{
  "type": "github",
  "connector_ref": "account.my_github_connector",
  "repositories": [
    {
      "repo_path": "myaccount/myorg/myproject/payments-api",
      "repo_identifier": "acme/payments-api"
    }
  ]
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `type` | Yes | `github` or `harness_code` |
| `connector_ref` | GitHub only | Identifies the connector that creates and syncs the linked repository |
| `repositories[].repo_path` | Yes | Must be prefixed with `space_path` followed by `/` |
| `repositories[].repo_identifier` | Conditional | Provider path in `owner/repo` form. Required for account-level connectors, must be empty for repository-level connectors |

`space_path` must have one to three segments.

The response reports, per repository, whether each resource exists now. A repository that failed carries an `error` string while the request still returns `200`, so read the per-repository results rather than the overall status.

Onboarding is idempotent. Existing resources are reused, and supplying a different `connector_ref` updates the linked repository and trigger.

### Check onboarding status

`POST /v1/onboard/status?space_path=<space>`

```json
{ "repositories": ["myaccount/myorg/myproject/payments-api"] }
```

Returns `onboarded` and `has_trigger` per repository. Both reflect whether AI Code Review has recorded a pipeline for the repository.

### Offboard a repository

`POST /v1/offboard?repo_path=<repo>`

Returns `204` with no body. Deletes the pull request trigger and disables the repository review flag. Go to [What Harness creates](/docs/ai-code-review/configure/what-harness-creates) to review what is deliberately left in place.

---

## Settings

### Read a setting

`GET /v1/settings?repo_path=<repo>&recursive=true`

Supply exactly one of `space_path` or `repo_path`.

| Parameter | Default | Notes |
| --- | --- | --- |
| `recursive` | `false` | `true` resolves inheritance from ancestor spaces |

Without `recursive=true` the request returns only what that exact scope defines, and fails if the scope has no setting of its own.

:::warning Unrecognised values fall back silently

An unparseable `recursive` value is treated as `false` rather than rejected. A typo changes the result without an error.

:::

### Create a setting

`POST /v1/settings`

```json
{
  "space_path": "myaccount/myorg/myproject",
  "connector_path": "account.shared_llm",
  "system_prompt": "",
  "mcp_servers": {},
  "criteria": [
    {
      "title": "Public API changes are versioned",
      "description": "Flag any change to a request or response shape under src/api/ that does not add a new version.",
      "enabled": true,
      "bypassable": false
    }
  ]
}
```

Exactly one of `space_path` and `repo_path` must be supplied. Returns `201`.

### Replace a setting

`PUT /v1/settings?repo_path=<repo>`

The body carries the fields only; the target comes from the query parameter. Criteria may include an `id` to update an existing criterion, or omit it to create one.

:::warning PUT replaces, it does not patch

Fields omitted from the body are reset. Omitting `criteria` deletes every criterion on the setting. Read the setting, modify it, and write the whole object back.

:::

Go to [Settings reference](/docs/ai-code-review/configure/settings-reference) for every field and its validation rules.

---

## List repositories and pull requests

### Repositories

`GET /v1/repos?space_path=<space>&query=<substring>&page=1&limit=30`

| Parameter | Default | Maximum |
| --- | --- | --- |
| `page` | 1 | |
| `limit` | 30 | 100 |

`query` is a case-insensitive substring match on the repository path. It matches anywhere after the space prefix, including intermediate path segments, not only the repository name.

Results carry no criteria and no scope markers. Read the setting directly for those.

### Pull requests

`GET /v1/prs?space_path=<space>`

Supports `state`, `query`, `source_branch`, `target_branch`, `author_id`, `sort`, `order`, `page`, and `limit`.

A risk level is returned only when the stored overview matches the pull request head commit, so a stale overview is suppressed rather than shown.

A space with no AI Code Review repositories returns an empty list rather than an error.

:::warning Filter values fall back silently

An unrecognised `state` falls back to `open` rather than returning an error. `author_id` is the exception and rejects a non-positive value with `400`.

:::

---

## Review results

### Read results

`GET /v1/pullreqs/{pr_number}/review?repo_path=<repo>`

Returns per-criterion results recorded against the pull request current head commit. A pull request force-pushed past the reviewed commit returns no results rather than an error.

Each result carries a status of `success`, `failure`, or `error`. A check that is still pending or running reads as `error`.

### Report results

`POST /v1/pullreqs/{pr_number}/review?repo_path=<repo>`

Used by the review agent. Requires `commit_sha`, `agent_run_id`, and at least one entry in `criteria_results`. Each entry needs the criterion `id` and a valid `status`.

The `commit_sha` must match the pull request current head, and each criterion id must resolve against the repository criteria or those inherited from an ancestor space.

---

## Pull request overview

### Read the overview

`GET /v1/pullreqs/{pr_number}/overview?repo_path=<repo>`

Returns the stored overview: `content`, `risk`, and the `commit_sha` it was written against.

:::info Staleness is the caller's job on read

The response is not marked stale and is not filtered. Compare the returned `commit_sha` against the pull request head commit yourself.

:::

### Write the overview

`POST /v1/pullreqs/{pr_number}/overview?repo_path=<repo>`

Used by the review agent. Requires `commit_sha` and `content`. `risk` is optional and must be `low`, `medium`, or `high` when present; omitting it publishes the in-progress state. Returns `201`.

Writing an overview also posts or updates the pull request comment. That step is best effort and never fails the request.

---

## Related concepts

- [Settings reference](/docs/ai-code-review/configure/settings-reference): The setting object in detail.
- [Permissions and RBAC](/docs/ai-code-review/resources/permissions-and-rbac): What each endpoint requires.
- [What Harness creates](/docs/ai-code-review/configure/what-harness-creates): What onboarding builds.
