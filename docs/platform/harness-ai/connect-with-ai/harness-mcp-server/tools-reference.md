---
title: Tools reference
description: The 11 MCP tools exposed by the Harness MCP Server, with request examples, the pipeline run workflow, and MCP resource URIs.
sidebar_label: Tools Reference
sidebar_position: 6
keywords:
  - harness_list
  - harness_get
  - harness_execute
  - harness_diagnose
  - mcp tools
tags:
  - harness-ai
  - mcp
---

The server exposes 11 MCP tools. Most accept `org_id` and `project_id` as optional overrides. If omitted, they fall back to `HARNESS_ORG` and `HARNESS_PROJECT` (or the deprecated `HARNESS_DEFAULT_ORG_ID` and `HARNESS_DEFAULT_PROJECT_ID`). Most tools also accept a `url` parameter, so you can paste a Harness UI URL and the server auto-extracts identifiers.

---

## Available tools

| Tool | Description |
|------|-------------|
| `harness_describe` | Discover available resource types, operations, and fields. No API call, because it returns local registry metadata. |
| `harness_schema` | Fetch JSON Schema definitions for creating and updating resources. Supports deep drilling via the `path` parameter |
| `harness_list` | List resources of a given type with filtering, search, and pagination |
| `harness_get` | Get a single resource by its identifier |
| `harness_create` | Create a new resource. Prompts for user confirmation via elicitation |
| `harness_update` | Update an existing resource. Prompts for user confirmation via elicitation |
| `harness_delete` | Delete a resource. Prompts for user confirmation via elicitation |
| `harness_execute` | Execute an action on a resource (run or retry a pipeline, toggle a flag, sync an app). Prompts for user confirmation via elicitation |
| `harness_search` | Search across multiple resource types in parallel with a single query |
| `harness_diagnose` | Diagnose pipeline, connector, delegate, and GitOps application resources with structured failure analysis |
| `harness_status` | Get a real-time project health dashboard with recent executions, failure rates, and deep links |

Each tool routes to a `resource_type`. Go to [Resource types](./resource-types.md) to review the 139 supported resource types and the operations each one accepts.

---

## Tool examples

**Discover available resources:**

```json
{ "resource_type": "pipeline" }
```

**List pipelines in a project:**

```json
{ "resource_type": "pipeline", "search_term": "deploy", "size": 10 }
```

**Get a specific service:**

```json
{ "resource_type": "service", "resource_id": "my-service-id" }
```

**Run a pipeline:**

```json
{
  "resource_type": "pipeline",
  "action": "run",
  "resource_id": "my-pipeline",
  "inputs": { "tag": "v1.2.3" }
}
```

**Toggle a feature flag:**

```json
{
  "resource_type": "feature_flag",
  "action": "toggle",
  "resource_id": "new_checkout_flow",
  "enable": true,
  "environment": "production"
}
```

**Search across all resource types:**

```json
{ "query": "payment-service" }
```

**Diagnose a failed execution:**

```json
{ "execution_id": "abc123XYZ" }
```

**Diagnose from a Harness URL:**

```json
{ "url": "https://app.harness.io/ng/account/.../pipelines/myPipeline/executions/abc123XYZ/pipeline" }
```

**Get project health status:**

```json
{ "org_id": "default", "project_id": "my-project", "limit": 5 }
```

---

## Pipeline run workflow

You can reduce execution-time input errors with the following:

1. **Discover required runtime inputs:**  
   `harness_get(resource_type="runtime_input_template", resource_id="<pipeline_id>")`  
   The returned template shows `<+input>` placeholders that need values.

2. **Choose input strategy:**
   - **Simple variables:** Pass flat key-value `inputs` (for example, `{"branch":"main","env":"prod"}`).
   - **Complex inputs:** Use `input_set_ids` for CI codebase or build blocks and nested template inputs.
   - **CI codebase shorthand keys:**

     | Shorthand key | Expanded structure |
     |---|---|
     | `branch` | `build.type=branch`, `build.spec.branch=<value>` |
     | `tag` | `build.type=tag`, `build.spec.tag=<value>` |
     | `pr_number` | `build.type=PR`, `build.spec.number=<value>` |
     | `commit_sha` | `build.type=commitSha`, `build.spec.commitSha=<value>` |

3. **Execute the run:**  
   `harness_execute(resource_type="pipeline", action="run", resource_id="<pipeline_id>", ...)`

If required fields are unresolved, the tool returns a pre-flight error with expected keys and suggested input sets.

---

## Pipeline storage modes

Harness MCP Server supports three storage modes that determine where a pipeline's YAML lives.

| Mode | Description | When to use |
|------|-------------|-------------|
| **Inline** | Pipeline YAML stored in Harness | Default. Simplest setup, no Git required |
| **Remote (External Git)** | Pipeline YAML in GitHub, GitLab, Bitbucket, or similar | Teams using Git-backed pipeline-as-code with an external provider |
| **Remote (Harness Code)** | Pipeline YAML in a Harness Code repository | Teams using the built-in Harness Git hosting |

For remote pipelines, pass `store_type`, `connector_ref` (or `is_harness_code_repo`), `repo_name`, `branch`, `file_path`, and `commit_msg` in the `params` object when you call `harness_create` or `harness_update`.

---

## MCP resources

In addition to tools, the server exposes MCP **resources**, which are read-only documents addressable by URI. These are a protocol primitive and are distinct from the Harness [resource types](./resource-types.md) that tools operate on.

| Resource URI | Description | MIME Type |
|--------------|-------------|-----------|
| `pipeline:///{pipelineId}` | Pipeline YAML definition | `application/x-yaml` |
| `pipeline:///{orgId}/{projectId}/{pipelineId}` | Pipeline YAML (with explicit scope) | `application/x-yaml` |
| `executions:///recent` | Last 10 pipeline execution summaries | `application/json` |
| `schema:///pipeline` | Harness pipeline JSON Schema | `application/schema+json` |
| `schema:///template` | Harness template JSON Schema | `application/schema+json` |
| `schema:///trigger` | Harness trigger JSON Schema | `application/schema+json` |

---

## Next steps

- [Resource types](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/resource-types): Review every resource type and its supported operations.
- [Prompt templates](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/prompt-templates): Start from a pre-built workflow instead of raw tool calls.
- [Approvals and safety](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/approvals-and-safety): Understand how write tools request confirmation.
