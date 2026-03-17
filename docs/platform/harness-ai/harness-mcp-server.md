---
title: Harness MCP Server
description: A unified interface for AI agents to interact with Harness tools and services using the Model Context Protocol (MCP).
sidebar_label: MCP Server
sidebar_position: 10
redirect_from:
  - /docs/platform/harness-aida/harness-mcp-server
---

The Harness Model Context Protocol (MCP) Server enables integration with Harness tools, providing endpoints for pipelines, pull requests, and more. This guide outlines the installation, configuration, and usage of the MCP server.

## Harness MCP V2 Server (Early Preview)

:::info Early Preview — Open Source
The Harness MCP V2 Server is available as an **Early Preview** release. It is fully open source and community feedback is encouraged. If you encounter issues or have suggestions, please open an issue on the [GitHub repository](https://github.com/thisrohangupta/harness-mcp-v2).

- **NPM Package:** [harness-mcp-v2 on npm](https://www.npmjs.com/package/harness-mcp-v2)
- **Source Code:** [https://github.com/harness/mcp-server](https://github.com/harness/mcp-server)
:::

The Harness MCP V2 Server is a ground-up redesign of the Harness MCP Server, built in TypeScript and distributed as an npm package. It takes a fundamentally different approach to how AI agents interact with the Harness platform.

### What changed from V1 to V2

| Area | MCP V1 (Current) | MCP V2 (Early Preview) |
|------|-------------------|------------------------|
| **Architecture** | One tool per API endpoint — the tool count grows with every new Harness API | 10 consolidated tools (`harness_list`, `harness_get`, `harness_create`, etc.) with a registry-based dispatch system routing to 119+ resource types |
| **LLM efficiency** | Large tool schemas can fill context windows and degrade tool-selection accuracy as tool count increases | Fewer tools means smaller schemas, less context usage, and more reliable tool selection by the LLM |
| **Platform coverage** | Covers core modules (CI/CD, CCM, STO, Chaos, IDP, etc.) across 20+ toolsets | 25 toolsets covering CI/CD, GitOps, Feature Flags, Cloud Cost Management, Security Testing, Chaos Engineering, IDP, Software Supply Chain, and more |
| **Multi-project support** | Requires `HARNESS_DEFAULT_ORG_ID` and `HARNESS_DEFAULT_PROJECT_ID` environment variables | Agents discover organizations and projects dynamically — no hardcoded env vars needed. Cross-project queries work out of the box |
| **Prompt templates** | N/A | 26 pre-built prompt templates for common workflows: debug failed pipelines, review DORA metrics, triage vulnerabilities, optimize cloud costs, audit access control, and more |
| **Installation** | Go binary (build from source) or Docker image | `npx harness-mcp-v2` — zero-install, single command. Also available via npm global install, Docker, and Kubernetes manifests |
| **Runtime** | Go | TypeScript / Node.js |
| **Transport** | stdio and HTTP server modes | stdio (default) and Streamable HTTP with session management, SSE support, and health checks |
| **Extensibility** | Adding a new resource requires new tool code, schema, and registration | Adding a new Harness resource means adding a declarative data file — no new tool registration or schema changes |
| **Safety** | `--read-only` flag | `HARNESS_READ_ONLY` mode plus user confirmation prompts (elicitation) before any mutating operation (create, update, delete, execute) |
| **Diagnostics** | Download execution logs | `harness_diagnose` tool provides structured failure analysis with stage/step breakdown, timing, bottlenecks, and automatic chained pipeline failure tracking |
| **Gateway support** | Standard MCP protocol | Tested with Docker MCP Gateway, Portkey, LiteLLM, Envoy AI Gateway, Kong, and other MCP-compliant gateways |

### Quick start with V2

No install required — run directly with npx:

```bash
npx harness-mcp-v2
```

Configure with your AI client by providing your Harness API key. Account ID is auto-extracted from PAT tokens, so only `HARNESS_API_KEY` is required:

```bash
HARNESS_API_KEY=pat.xxx npx harness-mcp-v2
```

For full V2 configuration details, client setup guides, and tool reference, see the [Harness MCP V2 README](https://github.com/thisrohangupta/harness-mcp-v2#readme).

## Introduction

### What is MCP?

MCP (Model Context Protocol) is an open standard for AI agents to interact with tools and services using a unified protocol. Instead of building custom adapters or connectors for each tool, MCP provides a consistent interface that allows AI agents to communicate seamlessly with various tools, including Harness services.

In simpler terms: MCP standardizes how AI agents talk to software tools, enabling interoperability without requiring custom code for each integration.

### Why MCP?

Harness is building a diverse set of AI agents that need access to platform data and services. Additionally, customers may have their own agents that require interaction with Harness entities to perform specific tasks.

MCP solves this problem by:

* **Standardizing communication:** A single interface for connecting agents to Harness tools, reducing implementation complexity.
* **Supporting external tools:** Seamless integration with third-party tools like **Windsurf, Cursor, and Claude Desktop**, eliminating the need for custom adapters.
* **Ensuring consistency:** A common interface reduces duplication and potential inconsistencies across different agents and tools.

### MCP vs. Tool/Function Calling

Why not just use function calls for each API?

1. **Limited Support for External Tools:** Function calling is often restricted to the model's internal tools. MCP enables integration with external tools like Windsurf, Cursor, and Claude Desktop.
2. **Inconsistent Implementations:** Without MCP, each agent would need to implement the same logic in different languages/frameworks, increasing the risk of errors.
3. **Scalability and Reuse:** MCP provides a standardized protocol, allowing reusable implementations across various agents and tools.

## Requirements

* **Harness API Token:** Generate one through the Harness UI. Learn more: [Manage API Keys](/docs/platform/automation/api/add-and-manage-api-keys/)
* **Go 1.23 or later:** Ensure **Go** is installed on your system (required only when building from source).

### Video Walkthrough (Installation and Setup)

<DocVideo src="https://www.loom.com/share/b7c5d77b1f7f4f55a779758971eefe78?sid=146f737a-3922-4bf2-8485-9c7c51154cc8" />


## Configuration

The MCP server supports two modes:
- **stdio mode:** For local integrations with AI assistants (default)
- **http-server mode:** For running as an HTTP server

### Windsurf Configuration

#### Using Source

```json
{
  "mcpServers": {
    "harness": {
      "command": "/path/to/harness-mcp-server",
      "args": ["stdio"],
      "env": {
        "HARNESS_API_KEY": "your_api_key",
        "HARNESS_DEFAULT_ORG_ID": "your_org_id",
        "HARNESS_DEFAULT_PROJECT_ID": "your_project_id",
        "HARNESS_BASE_URL": "<if-needed>"
      }
    }
  }
}
```

#### Using Docker

```json
{
  "mcpServers": {
    "harness": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "HARNESS_API_KEY",
        "-e",
        "HARNESS_DEFAULT_ORG_ID",
        "-e",
        "HARNESS_DEFAULT_PROJECT_ID",
        "-e",
        "HARNESS_BASE_URL",
        "harness/mcp-server",
        "stdio"
      ],
      "env": {
        "HARNESS_API_KEY": "<YOUR_API_KEY>",
        "HARNESS_DEFAULT_ORG_ID": "<YOUR_ORG_ID>",
        "HARNESS_DEFAULT_PROJECT_ID": "<YOUR_PROJECT_ID>",
        "HARNESS_BASE_URL": "<YOUR_BASE_URL>"
      }
    }
  }
}
```

[Windsurf MCP Guide](https://docs.windsurf.com/windsurf/cascade/mcp#model-context-protocol-mcp)

### Cursor Configuration

```json
{
  "mcpServers": {
    "harness": {
      "command": "/path/to/harness-mcp-server",
      "args": ["stdio"],
      "env": {
        "HARNESS_API_KEY": "your_api_key",
        "HARNESS_DEFAULT_ORG_ID": "your_org_id",
        "HARNESS_DEFAULT_PROJECT_ID": "your_project_id",
        "HARNESS_BASE_URL": "<if-needed>"
      }
    }
  }
}
```

[Cursor MCP Guide](https://docs.cursor.com/context/model-context-protocol#configuring-mcp-servers)

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-light.svg)](https://cursor.com/install-mcp?name=harness&config=eyJjb21tYW5kIjoiZG9ja2VyIHJ1biAtaSAtLXJtIC1lIEhBUk5FU1NfQVBJX0tFWSAtZSBIQVJORVNTX0RFRkFVTFRfT1JHX0lEIC1lIEhBUk5FU1NfREVGQVVMVF9QUk9KRUNUX0lEIC1lIEhBUk5FU1NfQkFTRV9VUkwgaGFybmVzcy9tY3Atc2VydmVyIHN0ZGlvIiwiZW52Ijp7IkhBUk5FU1NfQVBJX0tFWSI6IjxZT1VSX0FQSV9LRVk%2BIiwiSEFSTkVTU19ERUZBVUxUX09SR19JRCI6IjxZT1VSX09SR19JRD4iLCJIQVJORVNTX0RFRkFVTFRfUFJPSkVDVF9JRCI6IjxZT1VSX1BST0pFQ1RfSUQ%2BIiwiSEFSTkVTU19CQVNFX1VSTCI6IjxZT1VSX0JBU0VfVVJMPiJ9fQ%3D%3D)

### VS Code Configuration

```json
{
  "mcp": {
    "servers": {
      "harness": {
        "command": "docker",
        "args": [
          "run",
          "-i",
          "--rm",
          "-e",
          "HARNESS_API_KEY",
          "-e",
          "HARNESS_DEFAULT_ORG_ID",
          "-e",
          "HARNESS_DEFAULT_PROJECT_ID",
          "-e",
          "HARNESS_BASE_URL",
          "harness/mcp-server",
          "stdio"
        ],
        "env": {
          "HARNESS_API_KEY": "<YOUR_API_KEY>",
          "HARNESS_DEFAULT_ORG_ID": "<YOUR_ORG_ID>",
          "HARNESS_DEFAULT_PROJECT_ID": "<YOUR_PROJECT_ID>",
          "HARNESS_BASE_URL": "<YOUR_BASE_URL>"
        }
      }
    }
  }
}
```

[VS Code MCP Guide](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)

### Claude Desktop Configuration

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "harness": {
      "command": "/path/to/harness-mcp-server",
      "args": ["stdio"],
      "env": {
        "HARNESS_API_KEY": "<YOUR_API_KEY>",
        "HARNESS_DEFAULT_ORG_ID": "<YOUR_ORG_ID>",
        "HARNESS_DEFAULT_PROJECT_ID": "<YOUR_PROJECT_ID>"
      }
    }
  }
}
```

### Claude Code Configuration

```bash
claude mcp add harness -- docker run -i --rm \
  -e HARNESS_API_KEY=your_api_key \
  -e HARNESS_DEFAULT_ORG_ID=your_org_id \
  -e HARNESS_DEFAULT_PROJECT_ID=your_project_id \
  -e HARNESS_BASE_URL=your_base_url \
  harness/mcp-server stdio
```

[Claude Code MCP Guide](https://docs.claude.com/en/docs/claude-code/mcp)

### Gemini CLI Configuration

Add the server configuration to your Gemini config file at: `~/.gemini/settings.json`

```json
{
  "mcpServers": {
    "harness": {
      "command": "/path/to/harness-mcp-server",
      "args": ["stdio"],
      "env": {
        "HARNESS_API_KEY": "<YOUR_API_KEY>",
        "HARNESS_DEFAULT_ORG_ID": "<YOUR_ORG_ID>",
        "HARNESS_DEFAULT_PROJECT_ID": "<YOUR_PROJECT_ID>"
      }
    }
  }
}
```

You can also install using Gemini CLI Extensions:

```bash
gemini extensions install https://github.com/harness/mcp-server
export HARNESS_API_KEY="your_api_key_here"
gemini
```

### Amazon Q Developer CLI Configuration

Add the server configuration to your Amazon Q config file at: `~/.aws/amazonq/mcp.json`

```json
{
  "mcpServers": {
    "harness": {
      "command": "/path/to/harness-mcp-server",
      "args": ["stdio"],
      "env": {
        "HARNESS_API_KEY": "<YOUR_API_KEY>",
        "HARNESS_DEFAULT_ORG_ID": "<YOUR_ORG_ID>",
        "HARNESS_DEFAULT_PROJECT_ID": "<YOUR_PROJECT_ID>",
        "HARNESS_BASE_URL": "<YOUR_BASE_URL>"
      }
    }
  }
}
```

### Building from Source

1. Clone the repository:

```bash
git clone https://github.com/harness/mcp-server
cd mcp-server
```

2. Build the binary:

```bash
go build -o cmd/harness-mcp-server/harness-mcp-server ./cmd/harness-mcp-server
```

3. Run the server in stdio mode:

```bash
HARNESS_API_KEY=your_api_key \
HARNESS_BASE_URL="https://app.harness.io" \
./cmd/harness-mcp-server/harness-mcp-server stdio
```

4. Or run in HTTP server mode:

```bash
HARNESS_API_KEY=your_api_key \
HARNESS_BASE_URL="https://app.harness.io" \
./cmd/harness-mcp-server/harness-mcp-server http-server
```

### Use Docker Image

#### Stdio Mode

```bash
docker run -i --rm \
  -e HARNESS_API_KEY=your_api_key \
  -e HARNESS_DEFAULT_ORG_ID=your_org_id \
  -e HARNESS_DEFAULT_PROJECT_ID=your_project_id \
  -e HARNESS_BASE_URL=your_base_url \
  harness/mcp-server stdio
```

#### HTTP Server Mode

```bash
docker run -i --rm \
  -e HARNESS_API_KEY=your_api_key \
  -e HARNESS_BASE_URL=your_base_url \
  harness/mcp-server http-server
```

## Authentication

Set the `HARNESS_API_KEY` environment variable for authentication. The Account ID is automatically extracted from the API key. Learn more: [Manage API Keys](/docs/platform/automation/api/add-and-manage-api-keys/).

```bash
export HARNESS_API_KEY=<your_api_key>
```

## Command Line Arguments

The Harness MCP Server supports the following command line arguments:

| Argument | Description |
|----------|-------------|
| `--toolsets` | Comma-separated list of toolsets to enable. Use `--toolsets=all` to enable all available toolsets. If not set, only the default toolset is enabled. |
| `--read-only` | Run the server in read-only mode |
| `--log-file` | Path to log file for debugging |
| `--log-level` | Set the logging level (debug, info, warn, error) |
| `--version` | Show version information |
| `--help` | Show help message |
| `--base-url` | Base URL for Harness (default: `https://app.harness.io`) |
| `--output-dir` | Directory where the tool writes output files (e.g., pipeline logs) |

For more details, visit the [Harness MCP Server Command Line Arguments documentation](https://github.com/harness/mcp-server#command-line-arguments).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `HARNESS_API_KEY` | Harness API key (required). Account ID is automatically extracted from the API key. |
| `HARNESS_DEFAULT_ORG_ID` | Default Harness organization ID (optional). If not specified, it must be passed in the request when required. |
| `HARNESS_DEFAULT_PROJECT_ID` | Default Harness project ID (optional). If not specified, it must be passed in the request when required. |
| `HARNESS_TOOLSETS` | Comma-separated list of toolsets to enable (default: `default`). Example: `pipelines,sei,scs,sto` |
| `HARNESS_READ_ONLY` | Set to `true` to run in read-only mode |
| `HARNESS_LOG_FILE` | Path to log file |
| `HARNESS_LOG_LEVEL` | Logging level (debug, info, warn, error) |
| `HARNESS_BASE_URL` | Base URL for Harness (default: `https://app.harness.io`) |

For more details, visit the [MCP Environment Variables documentation](https://github.com/harness/mcp-server#environment-variables).

## MCP Server Toolsets

[MCP Tools](https://modelcontextprotocol.io/docs/concepts/tools#overview) allow servers to expose executable functions that can be invoked by clients and used by LLMs to perform actions.

To enable specific toolsets, use the `HARNESS_TOOLSETS` environment variable or the `--toolsets` command line argument:

```bash
HARNESS_TOOLSETS="pipelines,ccm,sto,scs" ./harness-mcp-server stdio
```

### Default Toolset

Toolset name: `default`

The default toolset contains essential tools from various services:

| Tool | Description |
|------|-------------|
| `get_connector_details` | Get details of a specific connector |
| `list_connector_catalogue` | List the Harness connector catalogue |
| `list_connectors` | List connectors with filtering options |
| `list_pipelines` | List pipelines in a repository |
| `get_pipeline` | Get details of a specific pipeline |
| `get_execution` | Get details of a specific pipeline execution |
| `list_executions` | List pipeline executions |
| `fetch_execution_url` | Fetch the execution URL for a pipeline execution |
| `list_dashboards` | List all available Harness dashboards |
| `get_dashboard_data` | Retrieve data from a specific Harness dashboard |

### Pipelines Toolset

Toolset name: `pipelines`

| Tool | Description |
|------|-------------|
| `get_pipeline` | Get details of a specific pipeline |
| `list_pipelines` | List pipelines in a repository |
| `get_execution` | Get details of a specific pipeline execution |
| `list_executions` | List pipeline executions |
| `fetch_execution_url` | Fetch the execution URL for a pipeline execution |
| `list_input_sets` | List input sets for a pipeline |
| `get_input_set` | Get details of a specific input set for a pipeline |
| `get_pipeline_summary` | Get a concise summary of a pipeline's structure and execution info |
| `list_triggers` | List triggers in a Harness pipeline |

### Pull Requests Toolset

Toolset name: `pullrequests`

| Tool | Description |
|------|-------------|
| `get_pull_request` | Get details of a specific pull request |
| `list_pull_requests` | List pull requests in a repository |
| `get_pull_request_checks` | Get status checks for a specific pull request |
| `get_pull_request_activities` | Get activities and comments for a specific pull request |
| `create_pull_request` | Create a new pull request |

### Services Toolset

Toolset name: `services`

| Tool | Description |
|------|-------------|
| `get_service` | Get details of a specific service |
| `list_services` | List services |

### Environments Toolset

Toolset name: `environments`

| Tool | Description |
|------|-------------|
| `get_environment` | Get details of a specific environment |
| `list_environments` | List environments |
| `move_environment_configs` | Move environment YAML from inline to remote |

### Infrastructure Toolset

Toolset name: `infrastructure`

| Tool | Description |
|------|-------------|
| `list_infrastructures` | List infrastructure definitions |
| `move_infrastructure_configs` | Move infrastructure YAML between inline and remote |

### Connectors Toolset

Toolset name: `connectors`

| Tool | Description |
|------|-------------|
| `list_connector_catalogue` | List the Harness connector catalogue |
| `get_connector_details` | Get details of a specific connector |
| `list_connectors` | List connectors with filtering options |

### Secrets Toolset

Toolset name: `secrets`

| Tool | Description |
|------|-------------|
| `list_secrets` | List secrets from Harness with filtering and pagination options |
| `get_secret` | Get a secret by identifier from Harness |

### Delegate Tokens Toolset

Toolset name: `delegatetokens`

| Tool | Description |
|------|-------------|
| `list_delegate_tokens` | List delegate tokens with filtering and pagination options |
| `get_delegate_token` | Get a delegate token by name |
| `create_delegate_token` | Create a new delegate token |
| `revoke_delegate_token` | Revoke a delegate token |
| `delete_delegate_token` | Delete a revoked delegate token |
| `core_get_delegate_by_token` | Get all delegates using a given delegate token name |

### Delegate Toolset

Toolset name: `delegate`

| Tool | Description |
|------|-------------|
| `core_list_delegates` | List all delegates filtered by status, name, type, and version status |

### Repositories Toolset

Toolset name: `repositories`

| Tool | Description |
|------|-------------|
| `get_repository` | Get details of a specific repository |
| `list_repositories` | List repositories |

### Registries Toolset

Toolset name: `registries`

| Tool | Description |
|------|-------------|
| `get_registry` | Get details of a specific registry in Harness artifact registry |
| `list_artifact_files` | List files for a specific artifact version |
| `list_artifact_versions` | List artifact versions in a registry |
| `list_artifacts` | List artifacts in a registry |
| `list_registries` | List registries in Harness artifact registry |

### Dashboards Toolset

Toolset name: `dashboards`

| Tool | Description |
|------|-------------|
| `list_dashboards` | List all available Harness dashboards |
| `get_dashboard_data` | Retrieve data from a specific Harness dashboard |

### Cloud Cost Management (CCM) Toolset

Toolset name: `ccm`

| Tool | Description |
|------|-------------|
| `get_ccm_overview` | Retrieve the cost overview for an account |
| `list_ccm_cost_categories` | List all cost category names for an account |
| `list_ccm_perspectives_detail` | List all perspectives for an account |
| `get_ccm_perspective` | Retrieve a perspective by ID |
| `create_ccm_perspective` | Create a perspective |
| `update_ccm_perspective` | Update a perspective |
| `delete_ccm_perspective` | Delete a perspective |
| `list_ccm_recommendations` | List cost-optimization recommendations |
| `get_ccm_anomalies_summary` | Get a summary of cost anomalies |
| `list_ccm_anomalies` | List cost anomalies |

For the complete list of CCM tools, visit the [Harness MCP toolsets documentation](https://github.com/harness/mcp-server#cloud-cost-management-toolset).

### Chaos Engineering Toolset

Toolset name: `chaos`

| Tool | Description |
|------|-------------|
| `chaos_experiments_list` | List chaos experiments based on scope and filters |
| `chaos_experiment_describe` | Get details of a specific chaos experiment |
| `chaos_experiment_run` | Run a specific chaos experiment |
| `chaos_experiment_run_result` | Get the result of a chaos experiment run |
| `chaos_probes_list` | List chaos probes based on scope and filters |
| `chaos_probe_describe` | Get details of a specific chaos probe |
| `chaos_create_experiment_from_template` | Create a chaos experiment from a template |
| `chaos_experiment_template_list` | List chaos experiment templates |
| `chaos_experiment_variables_list` | List variables for a specific chaos experiment |

### Supply Chain Security (SCS) Toolset

Toolset name: `scs`

| Tool | Description |
|------|-------------|
| `scs_list_artifact_sources` | List artifact sources in Harness SCS |
| `scs_list_artifacts_per_source` | List artifacts within a specific artifact source |
| `scs_get_artifact_overview` | Get metadata, security findings, SBOM, and compliance status |
| `scs_get_artifact_component_view` | Retrieve component view including dependencies and license info |
| `scs_get_artifact_component_remediation` | Get remediation recommendations for a component |
| `scs_get_artifact_chain_of_custody` | Retrieve the full chain of custody for an artifact |
| `scs_list_code_repos` | List code repositories scanned by Harness SCS |
| `scs_create_opa_policy` | Create an OPA policy based on denied licenses |
| `scs_download_sbom` | Get the download URL for SBOM |

### Security Test Orchestration (STO) Toolset

Toolset name: `sto`

| Tool | Description |
|------|-------------|
| `get_all_security_issues` | List and filter security issues by target, pipeline, tool, severity |
| `global_exemptions` | List all global exemptions |
| `promote_exemption` | Promote an exemption to global |
| `approve_exemption` | Approve a specific exemption |

### Logs Toolset

Toolset name: `logs`

| Tool | Description |
|------|-------------|
| `download_execution_logs` | Download logs for a pipeline execution |

### Templates Toolset

Toolset name: `templates`

| Tool | Description |
|------|-------------|
| `list_templates` | List templates at a given scope |

### Internal Developer Portal (IDP) Toolset

Toolset name: `idp`

| Tool | Description |
|------|-------------|
| `get_entity` | Get details of a specific entity in the IDP Catalog |
| `list_entities` | List entities in the IDP Catalog |
| `get_scorecard` | Get details of a specific scorecard |
| `list_scorecards` | List scorecards in the IDP Catalog |
| `get_score_summary` | Get score summary for scorecards |
| `get_scores` | Get scores for scorecards |
| `execute_workflow` | Execute a workflow in the IDP Catalog |
| `search_tech_docs` | Search documentation related to Harness entities |

### Audit Trail Toolset

Toolset name: `audit`

| Tool | Description |
|------|-------------|
| `list_user_audits` | Retrieve the complete audit trail for a specified user |

### Feature Management and Experimentation (FME) Toolset

Toolset name: `fme`

| Tool | Description |
|------|-------------|
| `list_fme_workspaces` | List all FME workspaces |
| `list_fme_environments` | List environments for a specific workspace |
| `list_fme_feature_flags` | List feature flags for a specific workspace |
| `get_fme_feature_flag_definition` | Get the definition of a specific feature flag |

### SEI Toolset

Toolset name: `sei`

| Tool | Description |
|------|-------------|
| `sei_productivity_feature_metrics` | Get productivity metrics for a collection |
| `sei_efficiency_lead_time` | Get lead time for a project |
| `sei_deployment_frequency` | Get deployment frequency metrics |
| `sei_change_failure_rate` | Get change failure rate metrics |
| `sei_mttr` | Get Mean Time to Restore metrics |
| `sei_get_team` | Get team information by team reference ID |
| `sei_get_teams_list` | Get list of teams with pagination |

For the complete list of SEI tools, visit the [Harness MCP toolsets documentation](https://github.com/harness/mcp-server#sei-toolset).

### GitOps Toolset

Toolset name: `gitops`

| Tool | Description |
|------|-------------|
| `gitops_list_agents` | List all GitOps agents (ArgoCD instances) |
| `gitops_get_agent` | Get detailed information about a GitOps agent |
| `gitops_list_applications` | List all GitOps applications |
| `gitops_get_application` | Get detailed information about a GitOps application |
| `gitops_get_app_resource_tree` | Get the resource tree for a GitOps application |
| `gitops_list_clusters` | List all clusters connected to GitOps agents |
| `gitops_list_repositories` | List all Git repositories configured in GitOps |
| `gitops_get_dashboard_overview` | Get GitOps dashboard overview with sync statistics |

For the complete list of GitOps tools, visit the [Harness MCP toolsets documentation](https://github.com/harness/mcp-server#gitops-toolset).

## Tool Usage Guide

### Download Execution Logs

#### Using Docker

Mount the logs directory to the container to download logs to your host machine:

```bash
docker run -d --name mcp-server -p 8080:8080 \
  -v /path/to/logs/on/host:/logs \
  harness/mcp-server --output-dir=/logs
```

Sample MCP configuration with logs toolset:

```json
{
  "mcpServers": {
    "harness": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-v",
        "/Users/testuser/logs:/logs",
        "-e",
        "HARNESS_API_KEY",
        "-e",
        "HARNESS_DEFAULT_ORG_ID",
        "-e",
        "HARNESS_DEFAULT_PROJECT_ID",
        "-e",
        "HARNESS_BASE_URL",
        "harness/mcp-server",
        "stdio",
        "--output-dir=/logs",
        "--toolsets=logs"
      ],
      "env": {
        "HARNESS_API_KEY": "<YOUR_API_KEY>",
        "HARNESS_DEFAULT_ORG_ID": "<YOUR_ORG_ID>",
        "HARNESS_DEFAULT_PROJECT_ID": "<YOUR_PROJECT_ID>",
        "HARNESS_BASE_URL": "<YOUR_BASE_URL>"
      }
    }
  }
}
```

Example tool input:

```json
{
  "logs_directory": "pipeline-logs",
  "org_id": "<YOUR_ORG_ID>",
  "plan_execution_id": "<YOUR_PLAN_EXECUTION_ID>",
  "project_id": "<YOUR_PROJECT_ID>"
}
```

#### Using Local Binary

```bash
./harness-mcp-server stdio --toolsets=logs --output-dir=/Users/testuser/log-files
```

## Use Cases

### Using Tools Demo

Watch the use case demo for a walkthrough of MCP server functionality:

<DocVideo src="https://www.loom.com/share/be336ce0d64649299a4631e81e1405f7?sid=6a68772b-e65d-4b22-ae38-e1ebb1fc6552" />

### Using Artifact Registry Tools Demo

Watch this demo to see the use of Artifact Registry tools in action.

<DocVideo src="https://www.loom.com/share/1fb5694359204d7ab62688f899cd427e?sid=669f2ec4-9170-4804-88ea-d357ad38cb44" />

## Debugging

Since MCP servers run over stdio, debugging can be challenging. For the best debugging experience, use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```bash
npx @modelcontextprotocol/inspector /path/to/harness-mcp-server stdio
```

The Inspector will display a URL that you can access in your browser to begin debugging.

## References

* [Harness MCP Server Repo](https://github.com/harness/mcp-server)
* [Harness MCP V2 Server Repo (Early Preview)](https://github.com/thisrohangupta/harness-mcp-v2)
* [Harness MCP V2 on npm](https://www.npmjs.com/package/harness-mcp-v2)
* [Model Context Protocol Overview](https://modelcontextprotocol.io/introduction)
