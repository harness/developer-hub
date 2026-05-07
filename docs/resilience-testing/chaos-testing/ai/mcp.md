---
title: Resilience Testing MCP Tools
sidebar_label: MCP
description: Use the Harness MCP Server to manage chaos experiments, probes, faults, load tests, DR tests, and more through AI-powered IDEs.
sidebar_position: 2
---

The [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server/) gives AI agents access to the full Harness platform, including resilience testing, through the [Model Context Protocol](https://modelcontextprotocol.io/introduction). Instead of module-specific tools, the server exposes **11 generic tools** (`harness_list`, `harness_get`, `harness_create`, `harness_delete`, `harness_execute`, etc.) that route to resource types using a `resource_type` parameter. For resilience testing, all resource types use the `chaos_` prefix.

This means DevOps, QA, and SRE teams can discover, configure, run, and analyze chaos experiments, load tests, DR tests, probes, faults, and more through natural language prompts in Claude Desktop, Cursor, Windsurf, VS Code, and other MCP-compatible tools.

- **Source code:** [github.com/harness/mcp-server](https://github.com/harness/mcp-server)
- **npm package:** [harness-mcp-v2 on npm](https://www.npmjs.com/package/harness-mcp-v2)

## Installation & Configuration

:::info
For full setup instructions across all supported AI clients, see the [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server/) documentation.
:::

### Prerequisites

- Access to Harness Platform with Resilience Testing (Chaos Engineering) enabled
- An MCP-compatible AI tool (Claude Desktop, Cursor, Windsurf, VS Code, Gemini CLI, etc.)
- A Harness API key (PAT format: `pat.<accountId>.<tokenId>.<secret>`)

### Quick start

No install required. Run directly with `npx`:

```bash
HARNESS_API_KEY=pat.xxx.xxx.xxx npx harness-mcp-v2@latest
```

### Configure your AI client

Add the Harness MCP server to your AI client's config. Example for Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "harness": {
      "command": "npx",
      "args": ["harness-mcp-v2"],
      "env": {
        "HARNESS_API_KEY": "pat.xxx.xxx.xxx"
      }
    }
  }
}
```

:::info
`HARNESS_ORG` and `HARNESS_PROJECT` are optional. Agents can discover orgs and projects dynamically. Set them only to pin a default scope.
:::

### Filter to chaos toolset only

To restrict the AI agent to only resilience testing resources, set the `HARNESS_TOOLSETS` environment variable:

```json
{
  "mcpServers": {
    "harness": {
      "command": "npx",
      "args": ["harness-mcp-v2"],
      "env": {
        "HARNESS_API_KEY": "pat.xxx.xxx.xxx",
        "HARNESS_TOOLSETS": "chaos"
      }
    }
  }
}
```

This reduces the resource types the LLM sees and improves tool-selection accuracy when you only need resilience testing capabilities.

### Verify installation

1. Open your AI tool and navigate to the Tools/MCP section.
2. Verify the 11 Harness tools are available (`harness_list`, `harness_get`, `harness_create`, etc.).
3. Test by asking: *"List my chaos experiments"*. The agent should call `harness_list(resource_type="chaos_experiment")`.

## Generic tools

The MCP server uses 11 generic tools for all Harness modules. For resilience testing, pass a `chaos_*` resource type.

| Tool | Description |
|------|-------------|
| `harness_describe` | Discover available resource types, operations, and fields (no API call) |
| `harness_schema` | Fetch JSON Schema definitions for creating/updating resources |
| `harness_list` | List resources with filtering, search, and pagination |
| `harness_get` | Get a single resource by identifier |
| `harness_create` | Create a new resource (with user confirmation) |
| `harness_update` | Update an existing resource (with user confirmation) |
| `harness_delete` | Delete a resource (with user confirmation) |
| `harness_execute` | Execute an action on a resource (run, stop, enable, etc.) |
| `harness_search` | Search across multiple resource types in parallel |
| `harness_diagnose` | Diagnose resources with structured failure analysis |
| `harness_status` | Get a real-time project health dashboard |

## Chaos resource types

The following resource types are available under the `chaos` toolset. Each supports a subset of CRUD operations and optional execute actions via the generic tools above.

### Chaos experiments

| Resource Type | Description | List | Get | Delete | Execute Actions |
|---------------|-------------|:----:|:---:|:------:|-----------------|
| `chaos_experiment` | Chaos experiment definitions | ✅ | ✅ | ✅ | `run`, `stop` |
| `chaos_experiment_run` | Results and details of experiment runs | ✅ | ✅ | - | - |
| `chaos_experiment_variable` | Runtime variables accepted by an experiment | ✅ | - | - | - |

### Chaos probes

| Resource Type | Description | List | Get | Delete | Execute Actions |
|---------------|-------------|:----:|:---:|:------:|-----------------|
| `chaos_probe` | Validation probes for steady-state checks | ✅ | ✅ | ✅ | `enable`, `verify`, `get_manifest` |
| `chaos_probe_in_run` | Probe results within a specific experiment run | ✅ | - | - | - |

### Chaos faults

| Resource Type | Description | List | Get | Delete | Execute Actions |
|---------------|-------------|:----:|:---:|:------:|-----------------|
| `chaos_fault` | Individual fault definitions (pod-delete, cpu-stress, etc.) | ✅ | ✅ | ✅ | `get_variables`, `get_yaml`, `list_experiment_runs` |

### Chaos actions

| Resource Type | Description | List | Get | Delete | Execute Actions |
|---------------|-------------|:----:|:---:|:------:|-----------------|
| `chaos_action` | Reusable action definitions used within experiments | ✅ | ✅ | ✅ | `get_manifest` |

### Experiment templates

| Resource Type | Description | List | Get | Delete | Execute Actions |
|---------------|-------------|:----:|:---:|:------:|-----------------|
| `chaos_experiment_template` | Reusable experiment blueprints | ✅ | ✅ | ✅ | `create_from_template`, `list_revisions`, `get_variables`, `get_yaml`, `compare_revisions` |

### Fault templates

| Resource Type | Description | List | Get | Delete | Execute Actions |
|---------------|-------------|:----:|:---:|:------:|-----------------|
| `chaos_fault_template` | Reusable fault blueprints with versioning | ✅ | ✅ | ✅ | `list_revisions`, `get_variables`, `get_yaml`, `compare_revisions` |

### Probe templates

| Resource Type | Description | List | Get | Delete | Execute Actions |
|---------------|-------------|:----:|:---:|:------:|-----------------|
| `chaos_probe_template` | Reusable probe blueprints | ✅ | ✅ | ✅ | `get_variables` |

### Action templates

| Resource Type | Description | List | Get | Delete | Execute Actions |
|---------------|-------------|:----:|:---:|:------:|-----------------|
| `chaos_action_template` | Reusable action blueprints with versioning | ✅ | ✅ | ✅ | `list_revisions`, `get_variables`, `compare_revisions` |

### ChaosHubs

| Resource Type | Description | List | Get | Create | Update | Delete |
|---------------|-------------|:----:|:---:|:------:|:------:|:------:|
| `chaos_hub` | Collection of reusable faults, probes, and action templates scoped at project, org, or account level | ✅ | ✅ | ✅ | ✅ | ✅ |
| `chaos_hub_fault` | Faults available within a ChaosHub | ✅ | - | - | - | - |

### ChaosGuard (governance)

| Resource Type | Description | List | Get | Delete | Execute Actions |
|---------------|-------------|:----:|:---:|:------:|-----------------|
| `chaos_guard_condition` | Conditions that define when experiments can run | ✅ | ✅ | ✅ | - |
| `chaos_guard_rule` | Rules that enforce governance policies on experiments | ✅ | ✅ | ✅ | `enable` |

### Infrastructure

| Resource Type | Description | List | Get | Execute Actions |
|---------------|-------------|:----:|:---:|-----------------|
| `chaos_k8s_infrastructure` | Kubernetes chaos infrastructure targets | ✅ | ✅ | `check_health` |
| `chaos_infrastructure` | Linux chaos infrastructure targets | ✅ | - | - |

### Input sets

| Resource Type | Description | List | Get | Delete |
|---------------|-------------|:----:|:---:|:------:|
| `chaos_input_set` | Saved sets of runtime inputs for experiments | ✅ | ✅ | ✅ |

### Load testing

| Resource Type | Description | List | Get | Create | Delete | Execute Actions |
|---------------|-------------|:----:|:---:|:------:|:------:|-----------------|
| `chaos_loadtest` | Load test definitions | ✅ | ✅ | ✅ | ✅ | `run`, `stop` |

### Network maps, recommendations, and risks

| Resource Type | Description | List | Get |
|---------------|-------------|:----:|:---:|
| `chaos_network_map` | Service dependency maps for targeted testing | ✅ | ✅ |
| `chaos_recommendation` | AI-generated resilience recommendations | ✅ | ✅ |
| `chaos_risk` | Risk assessments for services and environments | ✅ | ✅ |

### DR testing

DR tests are created and listed using chaos resource types. Once created, DR tests are backed by Harness pipelines, so you use the `pipeline` toolset for execution and management.

| Resource Type | Description | List | Get | Create | Update | Delete | Execute Actions |
|---------------|-------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `chaos_dr_test` | DR test definitions | ✅ | - | ✅ | - | - | - |
| `pipeline` | DR test pipeline (summary and YAML) | - | ✅ | - | ✅ | ✅ | `run` |
| `pipeline_summary` | DR test pipeline summary | - | ✅ | - | - | - | - |
| `execution` | DR test run details | - | - | - | - | - | `interrupt` |

:::info
The `pipeline`, `pipeline_summary`, and `execution` resource types belong to the `pipelines` toolset. If you are using `HARNESS_TOOLSETS=chaos`, also add `pipelines` to manage DR test runs: `HARNESS_TOOLSETS=chaos,pipelines`.
:::

## Usage examples

With the v2 MCP server, you interact using natural language. The AI agent translates your requests into the appropriate generic tool calls.

### Discovery & learning

**List all chaos experiments:**
> "What chaos experiments are available in my project?"

The agent calls `harness_list(resource_type="chaos_experiment")` and returns a filtered list.

**Get experiment details:**
> "Describe the pod-delete experiment and its resilience score"

The agent calls `harness_get(resource_type="chaos_experiment", resource_id="<experimentId>")`.

**Explore available faults:**
> "Show me all available chaos faults and their descriptions"

The agent calls `harness_list(resource_type="chaos_fault")`.

**Browse ChaosHub faults:**
> "List all faults available in the Enterprise ChaosHub"

The agent calls `harness_list(resource_type="chaos_hub_fault")`.

### Execution & monitoring

**Run a chaos experiment:**
> "Run the cart-service-pod-delete experiment"

The agent calls `harness_execute(resource_type="chaos_experiment", action="run", resource_id="<experimentId>")`.

**Stop a running experiment:**
> "Stop the currently running experiment"

The agent calls `harness_execute(resource_type="chaos_experiment", action="stop", resource_id="<experimentId>")`.

**Run a load test:**
> "Run the checkout-load-test"

The agent calls `harness_execute(resource_type="chaos_loadtest", action="run", resource_id="<loadtestId>")`.

**Check infrastructure health:**
> "Check the health of my chaos infrastructure"

The agent calls `harness_execute(resource_type="chaos_k8s_infrastructure", action="check_health", resource_id="<infraId>")`.

### Probes & validation

**List and describe probes:**
> "Show me all chaos probes and describe the HTTP probe"

The agent calls `harness_list(resource_type="chaos_probe")` followed by `harness_get(resource_type="chaos_probe", resource_id="<probeId>")`.

**Enable a probe:**
> "Enable the latency-check probe"

The agent calls `harness_execute(resource_type="chaos_probe", action="enable", resource_id="<probeId>")`.

**Verify a probe:**
> "Verify the http-health-check probe is working correctly"

The agent calls `harness_execute(resource_type="chaos_probe", action="verify", resource_id="<probeId>")`.

### Templates

**List experiment templates:**
> "Show me all experiment templates"

The agent calls `harness_list(resource_type="chaos_experiment_template")`.

**Create an experiment from a template:**
> "Create a new experiment from the pod-network-loss template"

The agent calls `harness_execute(resource_type="chaos_experiment_template", action="create_from_template", resource_id="<templateId>")`.

**Compare template revisions:**
> "Compare revisions of the cpu-stress fault template"

The agent calls `harness_execute(resource_type="chaos_fault_template", action="compare_revisions", resource_id="<templateId>")`.

### Analysis & reporting

**Get experiment run results:**
> "Summarize the results of the last run of the pod-delete experiment"

The agent calls `harness_get(resource_type="chaos_experiment_run", resource_id="<experimentId>")`.

**List probes in a run:**
> "Show me the probe results from the latest experiment run"

The agent calls `harness_list(resource_type="chaos_probe_in_run")`.

**Comprehensive resilience assessment:**
> "Scan all experiments run in the last week and summarize my project's resilience posture"

The agent uses `harness_list` and `harness_get` across experiments and runs to build a comprehensive report.

### Governance

**List ChaosGuard rules:**
> "Show me all ChaosGuard rules and their status"

The agent calls `harness_list(resource_type="chaos_guard_rule")`.

**Enable a ChaosGuard rule:**
> "Enable the production-window-only guard rule"

The agent calls `harness_execute(resource_type="chaos_guard_rule", action="enable", resource_id="<ruleId>")`.

## Next steps

- Start by asking *"What chaos experiments are available in my project?"*
- Use `HARNESS_TOOLSETS=chaos` to focus your agent on resilience testing resources only
- For full MCP server documentation (all modules, Docker, Kubernetes, prompt templates), see [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server/)
