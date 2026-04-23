---
title: Harness MCP Server
description: Give AI agents full access to the Harness platform through 11 consolidated tools and 139 resource types using the Model Context Protocol (MCP).
sidebar_label: MCP Server
sidebar_position: 10
redirect_from:
  - /docs/platform/harness-aida/harness-mcp-server
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

The Harness MCP Server is an open-source [Model Context Protocol](https://modelcontextprotocol.io/introduction) server that gives AI agents full access to the Harness platform. It uses a registry-based dispatch system that routes 11 consolidated tools (`harness_list`, `harness_get`, `harness_create`, etc.) to 139 resource types across 30 toolsets, covering CI/CD, GitOps, Feature Management & Experimentation, Cloud Cost Management, Security Testing, Chaos Engineering, Internal Developer Portal, Software Supply Chain, and more.

Unlike MCP servers that map one tool per API endpoint (which degrades LLM tool-selection accuracy as tool count grows), this server keeps the tool count small and the schema footprint minimal. Agents discover organizations and projects dynamically, so multi-project workflows work out of the box without hardcoded environment variables. Twenty-seven pre-built prompt templates cover common workflows like debugging failed pipelines, reviewing DORA metrics, triaging vulnerabilities, and optimizing cloud costs.

- **Source code:** [github.com/harness/mcp-server](https://github.com/harness/mcp-server)
- **npm package:** [harness-mcp-v2 on npm](https://www.npmjs.com/package/harness-mcp-v2)

## Prerequisites

- **Harness API key:** A personal access token (PAT) in the format `pat.<accountId>.<tokenId>.<secret>`. The account ID is auto-extracted from PAT tokens.  
  To create one, go to **My Profile** > **API Keys** > **+ New API Key** > create a **Token**. For detailed instructions, see [Manage API Keys](/docs/platform/automation/api/add-and-manage-api-keys/).
- **Node.js:** Required when using `npx` or `npm install`. Not needed for Docker.

## Quick start

No install required — run directly with `npx`:

```bash
HARNESS_API_KEY=pat.xxx.xxx.xxx npx harness-mcp-v2@latest
```

The server defaults to **stdio** transport (for Claude Desktop, Cursor, Windsurf, etc.). Use **http** for remote or shared deployments:

```bash
# Stdio transport (default)
HARNESS_API_KEY=pat.xxx npx harness-mcp-v2

# HTTP transport
HARNESS_API_KEY=pat.xxx npx harness-mcp-v2 http --port 8080
```

### Alternative installation methods

#### Global install

```bash
npm install -g harness-mcp-v2
harness-mcp-v2
```

#### Build from source

```bash
git clone https://github.com/harness/mcp-server.git
cd mcp-server
pnpm install
pnpm build

pnpm start              # Stdio transport
pnpm start:http         # HTTP transport
pnpm inspect            # Test with MCP Inspector
```

### CLI usage

```bash
harness-mcp-v2 [stdio|http] [--port <number>]
```

| Option | Description |
|--------|-------------|
| `--port <number>` | Port for HTTP transport (default: `3000`, or `PORT` env var) |
| `--help` | Show help message and exit |
| `--version` | Print version and exit |

## Configure your AI client

:::info
`HARNESS_ORG` and `HARNESS_PROJECT` are optional. Agents can discover orgs and projects dynamically using `harness_list(resource_type="organization")` and `harness_list(resource_type="project")`. Set them only if you want to pin a default scope. The deprecated names `HARNESS_DEFAULT_ORG_ID` and `HARNESS_DEFAULT_PROJECT_ID` are still accepted for backward compatibility.
:::

:::tip Troubleshooting `npx ENOENT` or `node: No such file or directory`
GUI apps (Cursor, Claude Desktop, Windsurf, VS Code) don't inherit your shell's `PATH`, so they often can't find `npx` or `node`. Fix this by using absolute paths and explicitly setting `PATH` in the `env` block:

```json
{
  "mcpServers": {
    "harness": {
      "command": "/absolute/path/to/npx",
      "args": ["-y", "harness-mcp-v2"],
      "env": {
        "HARNESS_API_KEY": "pat.xxx.xxx.xxx",
        "PATH": "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
      }
    }
  }
}
```

Find your paths with `which npx` and `which node` in a terminal. Common locations:
- **Homebrew (macOS):** `/opt/homebrew/bin/npx`
- **nvm:** `~/.nvm/versions/node/v20.x.x/bin/npx` (run `nvm which current` for the exact path)
- **System Node:** `/usr/local/bin/npx`
:::

### Claude Desktop

Config file location:
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%/Claude/claude_desktop_config.json`

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

### Claude Code

```bash
claude mcp add harness -- npx harness-mcp-v2
```

Then set `HARNESS_API_KEY` in your environment or `.env` file.

### Cursor

Add to `.cursor/mcp.json`:

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

### VS Code

Add to your VS Code settings or `.vscode/mcp.json`:

```json
{
  "mcp": {
    "servers": {
      "harness": {
        "command": "npx",
        "args": ["harness-mcp-v2"],
        "env": {
          "HARNESS_API_KEY": "pat.xxx.xxx.xxx"
        }
      }
    }
  }
}
```

### Windsurf

Add to `~/.windsurf/mcp.json`:

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

### Gemini CLI

Add to `~/.gemini/settings.json`:

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

Or install using Gemini CLI Extensions:

```bash
gemini extensions install https://github.com/harness/mcp-server
export HARNESS_API_KEY="pat.xxx.xxx.xxx"
gemini
```

### Amazon Q Developer CLI

Add to `~/.aws/amazonq/mcp.json`:

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

## Harness Hosted MCP (SaaS, OAuth) {#harness-hosted-mcp-saas-oauth}

Harness provides a **hosted MCP** endpoint for **Harness SaaS** customers. You add the hosted URL to your MCP-compatible client; when you first connect, you complete **OAuth through Harness ID** (browser or embedded sign-in, depending on the client). After authentication, the server runs MCP **on your behalf** using your Harness user identity, including **RBAC** and permissions from the platform. You do **not** configure a Harness API key in the client for this flow.

:::warning OAuth must be enabled on your account

Hosted MCP requires **OAuth to be enabled** on your Harness account. Contact **[Harness Support](https://support.harness.io)** to enable OAuth before using Hosted MCP. Without OAuth enabled, you will receive authentication errors even if your Harness login credentials are valid.

:::

:::note SaaS only

Hosted MCP with OAuth is available for **Harness SaaS** accounts. If you run the MCP server self-hosted or open source, use an API key as described earlier on this page. **OAuth for open source and self-hosted MCP is coming soon.**

:::

### Hosted endpoint

For the primary Harness SaaS control plane, use:

`https://mcp.harness.io/mcp`

If your organization uses a dedicated SaaS cluster or a non-default region, confirm the MCP base URL with Harness support. The MCP path is typically `/mcp` on that host.

### Authentication flow

1. Save the hosted MCP configuration in your client using the URL above.
2. When prompted, sign in with your **Harness email and password** through Harness ID.
3. You may be asked to **confirm your password** on a second Harness ID screen.
4. After a successful login, you return to your editor or terminal. The client loads MCP tools exposed for your account. **Which tools appear depends on your Harness licensing**, consistent with the capabilities of the open source MCP server.

### OAuth client ID

When a client asks for an OAuth **client ID** for Harness hosted MCP, use **`mcp-client`** (for example with Claude Code's `--client-id` flag or in Cursor's `auth` block).

### Cursor (Hosted MCP)

Add a hosted MCP entry in Cursor's MCP settings (for example **Settings → MCP**), using the HTTP URL and client ID:

```json
{
  "mcpServers": {
    "harness-hosted": {
      "url": "https://mcp.harness.io/mcp",
      "auth": {
        "CLIENT_ID": "mcp-client"
      }
    }
  }
}
```

After you enable the server, Cursor prompts you to connect and complete Harness ID authentication. See the [Cursor MCP documentation](https://cursor.com/docs/context/mcp).

### Claude Code (Hosted MCP)

```bash
claude mcp add --transport http \
  --client-id mcp-client \
  harness-hosted-mcp https://mcp.harness.io/mcp
```

See the [Claude Code MCP documentation](https://docs.claude.com/en/docs/claude-code/mcp).

### Windsurf (Hosted MCP)

In your Windsurf MCP configuration (for example `~/.codeium/windsurf/mcp_config.json` on macOS and Linux, or `%USERPROFILE%\.codeium\windsurf\mcp_config.json` on Windows), add a server entry that points at the hosted URL and supplies the client ID:

```json
{
  "mcpServers": {
    "harness-hosted": {
      "url": "https://mcp.harness.io/mcp",
      "auth": {
        "CLIENT_ID": "mcp-client"
      }
    }
  }
}
```

See the [Windsurf MCP documentation](https://docs.windsurf.com/windsurf/cascade/mcp#model-context-protocol-mcp).

### Visual Studio Code (Hosted MCP)

Add an HTTP MCP server in `.vscode/mcp.json` (workspace) or your [user MCP configuration](https://code.visualstudio.com/docs/copilot/chat/mcp-servers). VS Code negotiates OAuth with the server when supported:

```json
{
  "servers": {
    "harness-hosted": {
      "type": "http",
      "url": "https://mcp.harness.io/mcp"
    }
  },
  "inputs": []
}
```

Accept any trust prompt for the server, then follow Copilot chat prompts to sign in with Harness when authentication is required. See the [VS Code MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration).

### Troubleshooting Hosted MCP

#### Invalid credentials error

If you receive an **invalid credentials** error when connecting via OAuth—even though you can log in to your Harness account with the same credentials—OAuth has **not been enabled** for your account. This is the most common issue when first setting up Hosted MCP.

For example, a configuration like the following will fail with an authentication error if OAuth is not enabled on the account:

```json
{
  "mcpServers": {
    "harness-hosted": {
      "url": "https://mcp.harness.io/mcp",
      "auth": {
        "CLIENT_ID": "mcp-client"
      }
    }
  }
}
```

**Resolution:** Contact **[Harness Support](https://support.harness.io)** to request OAuth enablement and account data migration for your Harness account. Once support confirms the migration is complete, retry the connection.

## Run with Docker

```bash
docker run --rm -p 3000:3000 \
  -e HARNESS_API_KEY=pat.xxx.xxx.xxx \
  harness-mcp-server
```

The container runs in HTTP mode on port 3000 by default with a built-in health check.

## Deploy to Kubernetes

```bash
# 1. Edit the Secret with your credentials
#    k8s/secret.yaml — replace HARNESS_API_KEY and HARNESS_ACCOUNT_ID

# 2. Apply all manifests
kubectl apply -f k8s/

# 3. Verify the deployment
kubectl -n harness-mcp get pods

# 4. Port-forward for local testing
kubectl -n harness-mcp port-forward svc/harness-mcp-server 3000:80
curl http://localhost:3000/health
```

The deployment runs two replicas with readiness/liveness probes, resource limits, and a non-root security context.

## Use MCP gateways

The server is compatible with MCP gateways — reverse proxies that provide centralized authentication, governance, tool routing, and observability. Since the server implements the standard MCP protocol with both stdio and HTTP transports, it works behind any MCP-compliant gateway.

Tested gateways include [Docker MCP Gateway](https://docs.docker.com/), [Portkey](https://portkey.ai/features/mcp), [LiteLLM](https://docs.litellm.ai/docs/mcp), [Envoy AI Gateway](https://aigateway.envoyproxy.io/), [Kong](https://developer.konghq.com/mcp/), and others. For **stdio-based** gateways, use the default transport. For **HTTP-based** gateways, start the server with `http` transport and point the gateway at the `/mcp` endpoint.

## Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HARNESS_API_KEY` | Yes | -- | Harness personal access token or service account token |
| `HARNESS_ACCOUNT_ID` | No | *(from PAT)* | Harness account identifier. Auto-extracted from PAT tokens; only needed for non-PAT API keys |
| `HARNESS_BASE_URL` | No | `https://app.harness.io` | Base URL (override for self-managed Harness) |
| `HARNESS_ORG` | No | `default` | Default organization identifier (preferred) |
| `HARNESS_PROJECT` | No | -- | Default project identifier (preferred) |
| `HARNESS_DEFAULT_ORG_ID` | No | `default` | Deprecated alias for `HARNESS_ORG` |
| `HARNESS_DEFAULT_PROJECT_ID` | No | -- | Deprecated alias for `HARNESS_PROJECT` |
| `HARNESS_API_TIMEOUT_MS` | No | `30000` | HTTP request timeout in milliseconds |
| `HARNESS_MAX_RETRIES` | No | `3` | Retry count for transient failures (429, 5xx) |
| `HARNESS_MAX_BODY_SIZE_MB` | No | `10` | Max HTTP request body size in MB for `http` transport |
| `HARNESS_RATE_LIMIT_RPS` | No | `10` | Client-side request throttle (requests per second) |
| `LOG_LEVEL` | No | `info` | Log verbosity: `debug`, `info`, `warn`, `error` |
| `HARNESS_TOOLSETS` | No | *(all)* | Comma-separated list of enabled toolsets (see [Toolset filtering](#toolset-filtering)) |
| `HARNESS_READ_ONLY` | No | `false` | Block all mutating operations (create, update, delete, execute) |
| `HARNESS_SKIP_ELICITATION` | No | `false` | Skip confirmation prompts for write operations. Enables fully autonomous agent workflows |
| `HARNESS_ALLOW_HTTP` | No | `false` | Allow non-HTTPS `HARNESS_BASE_URL`. Set to `true` only for local development |
| `HARNESS_FME_BASE_URL` | No | `https://api.split.io` | Base URL for Feature Management & Experimentation (Split) API |
| `HARNESS_PIPELINE_VERSION` | No | `0` | Default pipeline YAML version (`0` or `1`) |

## HTTP transport

When running in HTTP mode, the server exposes:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/mcp` | `POST` | MCP JSON-RPC endpoint (initialize + session requests) |
| `/mcp` | `GET` | SSE stream for server-initiated messages (progress, elicitation) |
| `/mcp` | `DELETE` | Terminate an active MCP session |
| `/mcp` | `OPTIONS` | CORS preflight |
| `/health` | `GET` | Health check — returns `{ "status": "ok", "sessions": <count> }` |

The HTTP transport runs in session-based mode. A new MCP session is created on `initialize`, the server returns an `mcp-session-id` header, and subsequent requests must include the same header. Idle sessions are reaped after 30 minutes.

## Tools reference

The server exposes 11 MCP tools. Most accept `org_id` and `project_id` as optional overrides — if omitted, they fall back to `HARNESS_ORG` and `HARNESS_PROJECT` (or the deprecated `HARNESS_DEFAULT_ORG_ID` and `HARNESS_DEFAULT_PROJECT_ID`). Most tools also accept a `url` parameter — paste a Harness UI URL and the server auto-extracts identifiers.

| Tool | Description |
|------|-------------|
| `harness_describe` | Discover available resource types, operations, and fields. No API call — returns local registry metadata |
| `harness_schema` | Fetch JSON Schema definitions for creating/updating resources. Supports deep drilling via `path` parameter |
| `harness_list` | List resources of a given type with filtering, search, and pagination |
| `harness_get` | Get a single resource by its identifier |
| `harness_create` | Create a new resource. Prompts for user confirmation via elicitation |
| `harness_update` | Update an existing resource. Prompts for user confirmation via elicitation |
| `harness_delete` | Delete a resource. Prompts for user confirmation via elicitation |
| `harness_execute` | Execute an action on a resource (run/retry pipeline, toggle flag, sync app). Prompts for user confirmation via elicitation |
| `harness_search` | Search across multiple resource types in parallel with a single query |
| `harness_diagnose` | Diagnose pipeline, connector, delegate, and GitOps application resources with structured failure analysis |
| `harness_status` | Get a real-time project health dashboard — recent executions, failure rates, and deep links |

### Tool examples

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

### Pipeline run workflow

Use this sequence to reduce execution-time input errors:

1. **Discover required runtime inputs:**  
   `harness_get(resource_type="runtime_input_template", resource_id="<pipeline_id>")`  
   The returned template shows `<+input>` placeholders that need values.

2. **Choose input strategy:**
   - **Simple variables:** Pass flat key-value `inputs` (for example `{"branch":"main","env":"prod"}`).
   - **Complex inputs:** Use `input_set_ids` for CI codebase/build blocks and nested template inputs.
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

### Pipeline storage modes

| Mode | Description | When to use |
|------|-------------|-------------|
| **Inline** | Pipeline YAML stored in Harness | Default. Simplest setup, no Git required |
| **Remote (External Git)** | Pipeline YAML in GitHub, GitLab, Bitbucket, etc. | Teams using Git-backed pipeline-as-code with an external provider |
| **Remote (Harness Code)** | Pipeline YAML in a Harness Code repository | Teams using Harness's built-in Git hosting |

For remote pipelines, pass `store_type`, `connector_ref` (or `is_harness_code_repo`), `repo_name`, `branch`, `file_path`, and `commit_msg` in the `params` object when calling `harness_create` or `harness_update`.

## Resource types

139 resource types organized across 30 toolsets. Each resource type supports a subset of CRUD operations and optional execute actions.

### Platform

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `organization` | x | x | x | x | x | |
| `project` | x | x | x | x | x | |

### Agent Pipelines

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `agent` | x | x | x | x | x | |
| `agent_run` | x | | | | | |

### Pipelines

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `pipeline` | x | x | x | x | x | `run`, `retry` |
| `execution` | x | x | | | | `interrupt` |
| `trigger` | x | x | x | x | x | |
| `pipeline_summary` | | x | | | | |
| `input_set` | x | x | | | | |
| `runtime_input_template` | | x | | | | |
| `approval_instance` | x | | | | | `approve`, `reject` |

### Services

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `service` | x | x | x | x | x | |

### Environments

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `environment` | x | x | x | x | x | `move_configs` |

### Connectors

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `connector` | x | x | x | x | x | `test_connection` |
| `connector_catalogue` | x | | | | | |

### Infrastructure

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `infrastructure` | x | x | x | x | x | `move_configs` |

### Secrets

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `secret` | x | x | | | | |

### Execution logs

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `execution_log` | | x | | | | |

### Audit trail

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `audit_event` | x | x | | | | |

### Delegates

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `delegate` | x | | | | | |
| `delegate_token` | x | x | x | | x | `revoke`, `get_delegates` |

### Code repositories

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `repository` | x | x | x | x | | |
| `branch` | x | x | x | | x | |
| `commit` | x | x | | | | `diff`, `diff_stats` |
| `file_content` | | x | | | | `blame` |
| `tag` | x | | x | | x | |
| `repo_rule` | x | x | | | | |
| `space_rule` | x | x | | | | |

### Artifact registries

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `registry` | x | x | | | | |
| `artifact` | x | | | | | |
| `artifact_version` | x | | | | | |
| `artifact_file` | x | | | | | |

### Templates

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `template` | x | x | x | x | x | |

### Dashboards

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `dashboard` | x | x | | | | |
| `dashboard_data` | | x | | | | |

### Internal Developer Portal (IDP)

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `idp_entity` | x | x | | | | |
| `scorecard` | x | x | | | | |
| `scorecard_check` | x | x | | | | |
| `scorecard_stats` | | x | | | | |
| `scorecard_check_stats` | | x | | | | |
| `idp_score` | x | x | | | | |
| `idp_workflow` | x | | | | | `execute` |
| `idp_tech_doc` | x | | | | | |

### Pull requests

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `pull_request` | x | x | x | x | | `merge` |
| `pr_reviewer` | x | | x | | | `submit_review` |
| `pr_comment` | x | | x | | | |
| `pr_check` | x | | | | | |
| `pr_activity` | x | | | | | |

### Feature flags

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `fme_workspace` | x | | | | | |
| `fme_environment` | x | | | | | |
| `fme_feature_flag` | x | x | x | x | x | `kill`, `restore`, `archive`, `unarchive` |
| `fme_feature_flag_definition` | | x | | | | |
| `fme_rollout_status` | x | | | | | |
| `fme_rule_based_segment` | x | x | x | | x | |
| `fme_rule_based_segment_definition` | x | | | x | | `enable`, `disable`, `change_request` |
| `feature_flag` | x | x | x | | x | `toggle` |

### GitOps

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `gitops_agent` | x | x | | | | |
| `gitops_application` | x | x | | | | `sync` |
| `gitops_cluster` | x | x | | | | |
| `gitops_repository` | x | x | | | | |
| `gitops_applicationset` | x | x | | | | |
| `gitops_repo_credential` | x | x | | | | |
| `gitops_app_event` | x | | | | | |
| `gitops_pod_log` | | x | | | | |
| `gitops_managed_resource` | x | | | | | |
| `gitops_resource_action` | x | | | | | |
| `gitops_dashboard` | | x | | | | |
| `gitops_app_resource_tree` | | x | | | | |

### Chaos Engineering

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `chaos_experiment` | x | x | | | | `run` |
| `chaos_probe` | x | x | | | | `enable`, `verify` |
| `chaos_experiment_template` | x | | | | | `create_from_template` |
| `chaos_infrastructure` | x | | | | | |
| `chaos_experiment_variable` | x | | | | | |
| `chaos_experiment_run` | x | x | | | | |
| `chaos_loadtest` | x | x | x | | x | `run`, `stop` |
| `chaos_k8s_infrastructure` | x | x | | | | `check_health` |
| `chaos_hub` | x | x | | | | |
| `chaos_fault` | x | x | | | | |
| `chaos_network_map` | x | x | | | | |
| `chaos_guard_condition` | x | x | | | | |
| `chaos_guard_rule` | x | x | | | | |
| `chaos_recommendation` | x | x | | | | |
| `chaos_risk` | x | x | | | | |

### Cloud Cost Management (CCM)

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `cost_perspective` | x | x | x | x | x | |
| `cost_breakdown` | x | | | | | |
| `cost_timeseries` | x | | | | | |
| `cost_summary` | x | x | | | | |
| `cost_recommendation` | x | x | | | | `update_state`, `override_savings`, `create_jira_ticket`, `create_snow_ticket` |
| `cost_anomaly` | x | | | | | |
| `cost_anomaly_summary` | | x | | | | |
| `cost_category` | x | x | | | | |
| `cost_account_overview` | | x | | | | |
| `cost_filter_value` | x | | | | | |
| `cost_recommendation_stats` | | x | | | | |
| `cost_recommendation_detail` | | x | | | | |
| `cost_commitment` | | x | | | | |

### Software Engineering Insights (SEI)

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `sei_metric` | x | | | | | |
| `sei_productivity_metric` | | x | | | | |
| `sei_dora_metric` | | x | | | | Pass `metric`: deployment_frequency, change_failure_rate, mttr, lead_time |
| `sei_team` | x | x | | | | |
| `sei_team_detail` | x | | | | | Pass `aspect`: integrations, developers, integration_filters |
| `sei_org_tree` | x | x | | | | |
| `sei_org_tree_detail` | x | x | | | | Pass `aspect`: efficiency_profile, productivity_profile, business_alignment_profile, integrations, teams |
| `sei_business_alignment` | x | x | | | | |
| `sei_ai_usage` | x | x | | | | Pass `aspect`: metrics, breakdown, summary, top_languages |
| `sei_ai_adoption` | x | x | | | | Pass `aspect`: metrics, breakdown, summary |
| `sei_ai_impact` | | x | | | | Pass `aspect`: pr_velocity, rework |
| `sei_ai_raw_metric` | x | | | | | |

### Software Supply Chain Assurance (SCS)

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `scs_artifact_source` | x | | | | | |
| `artifact_security` | x | x | | | | |
| `scs_artifact_component` | x | | | | | |
| `scs_artifact_remediation` | | x | | | | |
| `scs_chain_of_custody` | | x | | | | |
| `scs_compliance_result` | x | | | | | |
| `code_repo_security` | x | x | | | | |
| `scs_sbom` | | x | | | | |

### Security Testing Orchestration (STO)

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `security_issue` | x | | | | | |
| `security_issue_filter` | x | | | | | |
| `security_exemption` | x | | | | | `approve`, `reject`, `promote` |

### Access control

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `user` | x | x | | | | |
| `user_group` | x | x | x | | x | |
| `service_account` | x | x | x | | x | |
| `role` | x | x | x | | x | |
| `role_assignment` | x | | x | | | |
| `resource_group` | x | x | x | | x | |
| `permission` | x | | | | | |

### Governance

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `policy` | x | x | x | x | x | |
| `policy_set` | x | x | x | x | x | |
| `policy_evaluation` | x | x | | | | |

### Deployment freeze

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `freeze_window` | x | x | x | x | x | `toggle_status` |
| `global_freeze` | | x | | | | `manage` |

### Service overrides

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `service_override` | x | x | x | x | x | |

### Settings

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `setting` | x | | | | | |

### Visualizations

Inline PNG chart visualizations rendered from Harness data. Use `include_visual=true` on supported tools to generate charts.

| Resource Type | Description | How to generate |
|---------------|-------------|-----------------|
| `visual_timeline` | Gantt chart of pipeline stage execution | `harness_diagnose` with `visual_type: "timeline"` |
| `visual_stage_flow` | DAG flowchart of pipeline stages and steps | `harness_diagnose` with `visual_type: "flow"` |
| `visual_health_dashboard` | Project health overview with status indicators | `harness_status` with `include_visual: true` |
| `visual_pie_chart` | Donut chart of execution status breakdown | `harness_list` with `visual_type: "pie"` |
| `visual_bar_chart` | Bar chart of execution counts by pipeline | `harness_list` with `visual_type: "bar"` |
| `visual_timeseries` | Daily execution trend over 30 days | `harness_list` with `visual_type: "timeseries"` |
| `visual_architecture` | Pipeline YAML architecture diagram | `harness_diagnose` with `visual_type: "architecture"` |

## Toolset filtering

By default, all 30 toolsets (and their 139 resource types) are enabled. Use `HARNESS_TOOLSETS` to expose only the toolsets you need, which reduces the resource types the LLM sees and improves tool-selection accuracy.

```bash
# Only expose pipelines, services, and connectors
HARNESS_TOOLSETS=pipelines,services,connectors
```

| Toolset | Resource Types |
|---------|---------------|
| `agent-pipelines` | agent, agent_run |
| `platform` | organization, project |
| `pipelines` | pipeline, execution, trigger, pipeline_summary, input_set, runtime_input_template, approval_instance |
| `services` | service |
| `environments` | environment |
| `connectors` | connector, connector_catalogue |
| `infrastructure` | infrastructure |
| `secrets` | secret |
| `logs` | execution_log |
| `audit` | audit_event |
| `delegates` | delegate, delegate_token |
| `repositories` | repository, branch, commit, file_content, tag, repo_rule, space_rule |
| `registries` | registry, artifact, artifact_version, artifact_file |
| `templates` | template |
| `dashboards` | dashboard, dashboard_data |
| `idp` | idp_entity, scorecard, scorecard_check, scorecard_stats, scorecard_check_stats, idp_score, idp_workflow, idp_tech_doc |
| `pull-requests` | pull_request, pr_reviewer, pr_comment, pr_check, pr_activity |
| `feature-flags` | fme_workspace, fme_environment, fme_feature_flag, fme_feature_flag_definition, fme_rollout_status, fme_rule_based_segment, fme_rule_based_segment_definition, feature_flag |
| `gitops` | gitops_agent, gitops_application, gitops_cluster, gitops_repository, gitops_applicationset, gitops_repo_credential, gitops_app_event, gitops_pod_log, gitops_managed_resource, gitops_resource_action, gitops_dashboard, gitops_app_resource_tree |
| `chaos` | chaos_experiment, chaos_probe, chaos_experiment_template, chaos_infrastructure, chaos_experiment_variable, chaos_experiment_run, chaos_loadtest, chaos_k8s_infrastructure, chaos_hub, chaos_fault, chaos_network_map, chaos_guard_condition, chaos_guard_rule, chaos_recommendation, chaos_risk |
| `ccm` | cost_perspective, cost_breakdown, cost_timeseries, cost_summary, cost_recommendation, cost_anomaly, cost_anomaly_summary, cost_category, cost_account_overview, cost_filter_value, cost_recommendation_stats, cost_recommendation_detail, cost_commitment |
| `sei` | sei_metric, sei_productivity_metric, sei_dora_metric, sei_team, sei_team_detail, sei_org_tree, sei_org_tree_detail, sei_business_alignment, sei_ai_usage, sei_ai_adoption, sei_ai_impact, sei_ai_raw_metric |
| `scs` | scs_artifact_source, artifact_security, scs_artifact_component, scs_artifact_remediation, scs_chain_of_custody, scs_compliance_result, code_repo_security, scs_sbom |
| `sto` | security_issue, security_issue_filter, security_exemption |
| `access_control` | user, user_group, service_account, role, role_assignment, resource_group, permission |
| `governance` | policy, policy_set, policy_evaluation |
| `freeze` | freeze_window, global_freeze |
| `overrides` | service_override |
| `settings` | setting |
| `visualizations` | visual_timeline, visual_stage_flow, visual_health_dashboard, visual_pie_chart, visual_bar_chart, visual_timeseries, visual_architecture |

## Prompt templates

The server includes 27 pre-built prompt templates for common workflows.

### DevOps

| Prompt | Description |
|--------|-------------|
| `build-deploy-app` | End-to-end CI/CD: scan a repo, generate CI pipeline, create CD pipeline, deploy with auto-retry |
| `debug-pipeline-failure` | Analyze a failed execution with stage/step breakdown, failure details, and root cause analysis |
| `create-pipeline` | Generate a new pipeline YAML from natural language requirements |
| `create-agent` | Create a custom AI agent definition with YAML spec, rules, skills, and MCP servers |
| `onboard-service` | Walk through onboarding a new service with environments and a deployment pipeline |
| `dora-metrics-review` | Review DORA metrics with Elite/High/Medium/Low classification and improvement recommendations |
| `setup-gitops-application` | Guide through onboarding a GitOps application |
| `chaos-resilience-test` | Design a chaos experiment to test service resilience |
| `feature-flag-rollout` | Plan and execute a progressive feature flag rollout with safety gates |
| `migrate-pipeline-to-template` | Analyze a pipeline and extract reusable stage/step templates |
| `delegate-health-check` | Check delegate connectivity, health, and token status |
| `developer-portal-scorecard` | Review IDP scorecards and identify gaps |
| `pending-approvals` | Find executions waiting for approval and offer to approve or reject |

### FinOps

| Prompt | Description |
|--------|-------------|
| `optimize-costs` | Analyze cloud cost data, surface recommendations and anomalies |
| `cloud-cost-breakdown` | Deep-dive into cloud costs by service, environment, or cluster |
| `commitment-utilization-review` | Analyze reserved instance and savings plan utilization |
| `cost-anomaly-investigation` | Investigate cost anomalies and determine root cause |
| `rightsizing-recommendations` | Review and prioritize rightsizing recommendations |

### DevSecOps

| Prompt | Description |
|--------|-------------|
| `security-review` | Review security issues and suggest remediations by severity |
| `vulnerability-triage` | Triage vulnerabilities across pipelines and artifacts |
| `sbom-compliance-check` | Audit SBOM and compliance posture for artifacts |
| `supply-chain-audit` | End-to-end software supply chain security audit |
| `security-exemption-review` | Review pending security exemptions for batch decisions |
| `access-control-audit` | Audit user permissions and enforce least-privilege |

### Harness Code

| Prompt | Description |
|--------|-------------|
| `code-review` | Review a pull request with structured feedback on bugs, security, performance, and style |
| `pr-summary` | Auto-generate a PR title and description from commit history and diff |
| `branch-cleanup` | Analyze branches and recommend stale or merged branches to delete |

## MCP resources

| Resource URI | Description | MIME Type |
|--------------|-------------|-----------|
| `pipeline:///{pipelineId}` | Pipeline YAML definition | `application/x-yaml` |
| `pipeline:///{orgId}/{projectId}/{pipelineId}` | Pipeline YAML (with explicit scope) | `application/x-yaml` |
| `executions:///recent` | Last 10 pipeline execution summaries | `application/json` |
| `schema:///pipeline` | Harness pipeline JSON Schema | `application/schema+json` |
| `schema:///template` | Harness template JSON Schema | `application/schema+json` |
| `schema:///trigger` | Harness trigger JSON Schema | `application/schema+json` |

## Elicitation

Write tools (`harness_create`, `harness_update`, `harness_delete`, `harness_execute`) use [MCP elicitation](https://modelcontextprotocol.io/specification/2025-03-26/server/utilities/elicitation) to prompt the user for confirmation before making changes.

1. The LLM calls a write tool (for example, `harness_create` with a pipeline body).
2. The server sends an elicitation request to the client with a summary of the operation.
3. The user sees the details and clicks **Accept** or **Decline**.
4. If accepted, the operation proceeds. If declined, it is blocked.

| Client | Elicitation Support |
|--------|---------------------|
| Cursor | Yes |
| VS Code (Copilot) | Yes |
| Claude Desktop | Not yet |
| Windsurf | Not yet |
| MCP Inspector | Yes |

For clients that don't support elicitation, `harness_create`, `harness_update`, and `harness_execute` proceed without a dialog, while `harness_delete` is blocked to prevent unintended destruction.

### Skip elicitation for autonomous workflows

For fully autonomous agent workflows (CI/CD bots, headless agents, batch automation), disable elicitation prompts:

```bash
HARNESS_SKIP_ELICITATION=true
```

When enabled, **all** write and delete operations proceed without user confirmation. Consider pairing with `HARNESS_TOOLSETS` to restrict which resource types are available.

## Safety

- **Secrets are never exposed.** The `secret` resource type returns metadata only — secret values are never included in any response.
- **Write operations use elicitation when available.** `harness_create`, `harness_update`, `harness_delete`, and `harness_execute` prompt for user confirmation.
- **Destructive writes fail closed.** If confirmation cannot be obtained, `harness_delete` is blocked.
- **CORS restricted to same-origin.** The HTTP transport prevents CSRF attacks from malicious websites.
- **Rate limiting.** HTTP transport enforces 60 requests per minute per IP. The API client enforces 10 requests/second to avoid upstream rate limits.
- **Pagination bounds enforced.** List queries are capped at 10,000 items total and 100 per page.
- **Retries with backoff.** Transient failures (HTTP 429, 5xx) are retried with exponential backoff and jitter.
- **Localhost binding.** The HTTP transport binds to `127.0.0.1` by default.
- **HTTPS enforced.** `HARNESS_BASE_URL` must use HTTPS. Set `HARNESS_ALLOW_HTTP=true` only for local development.

## Architecture

```
             +------------------+
             |   AI Agent       |
             |  (Claude, etc.)  |
             +--------+---------+
                      |  MCP (stdio or HTTP)
             +--------v---------+
             |    MCP Server     |
             | 11 Generic Tools  |
             +--------+---------+
                      |
             +--------v---------+
             |    Registry       |  <-- Declarative resource definitions
             |  30 Toolsets      |
             |  139 Resource Types|
             +--------+---------+
                      |
             +--------v---------+
             |  HarnessClient    |  <-- Auth, retry, rate limiting
             +--------+---------+
                      |  HTTPS
             +--------v---------+
             |  Harness REST API |
             +-------------------+
```

1. **Tools** are generic verbs (`harness_list`, `harness_get`, etc.) that accept a `resource_type` parameter to route to the correct API endpoint.
2. **The Registry** maps each `resource_type` to a declarative `ResourceDefinition` specifying the HTTP method, URL path, parameter mappings, and response extraction.
3. **Dispatch** resolves the resource definition, builds the HTTP request, calls the Harness API, and extracts the relevant response data.
4. **Toolset filtering** controls which resource definitions load at startup.
5. **Deep links** are automatically appended to responses, providing direct Harness UI URLs.
6. **Compact mode** strips verbose metadata from list results to minimize token usage.

## Debug with MCP Inspector

Use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector) to debug the server interactively:

```bash
npx @modelcontextprotocol/inspector npx harness-mcp-v2
```

The Inspector displays a URL you can open in your browser to inspect tool calls and responses.

## Troubleshooting

<Troubleshoot
  issue="HARNESS_ACCOUNT_ID is required when the API key is not a PAT"
  mode="fallback-only"
  fallback="Your API key is not in PAT format (pat.<accountId>.<tokenId>.<secret>), so the account ID cannot be auto-extracted. Set the HARNESS_ACCOUNT_ID environment variable explicitly."
/>

<Troubleshoot
  issue="npx ENOENT or node: No such file or directory when using GUI clients"
  mode="fallback-only"
  fallback="GUI apps (Cursor, Claude Desktop, Windsurf, VS Code) don't inherit your shell's PATH. Use absolute paths for the command and explicitly set PATH in the env block of your MCP config. Run 'which npx' and 'which node' in a terminal to find the correct paths."
/>

<Troubleshoot
  issue="Unknown resource_type error from tools"
  mode="fallback-only"
  fallback="The resource type is misspelled or filtered out via HARNESS_TOOLSETS. Call harness_describe (with optional search_term) to discover valid resource types."
/>

<Troubleshoot
  issue="Missing required field for path parameter"
  mode="fallback-only"
  fallback="A project or org scoped call is missing identifiers. Set HARNESS_DEFAULT_ORG_ID and HARNESS_DEFAULT_PROJECT_ID environment variables, or pass org_id and project_id per tool call."
/>

<Troubleshoot
  issue="Read-only mode is enabled — write operations are not allowed"
  mode="fallback-only"
  fallback="HARNESS_READ_ONLY=true blocks create, update, delete, and execute operations. Set HARNESS_READ_ONLY=false if write operations are intended."
/>

<Troubleshoot
  issue="Pipeline run fails with unresolved required inputs"
  mode="fallback-only"
  fallback="Your inputs did not cover all required runtime placeholders. Fetch the runtime_input_template first, then supply missing keys via inputs or use input_set_ids for structural inputs."
/>

<Troubleshoot
  issue="HARNESS_BASE_URL must use HTTPS"
  mode="fallback-only"
  fallback="The server enforces HTTPS by default. If you need HTTP for local development, set HARNESS_ALLOW_HTTP=true."
/>

<Troubleshoot
  issue="Operation declined by user"
  mode="fallback-only"
  fallback="The user declined the elicitation confirmation dialog. Verify the operation details and retry if intended."
/>

<Troubleshoot
  issue="HTTP mcp-session-id header is required or Session not found"
  mode="fallback-only"
  fallback="Send an initialize request first to create a session, then include the mcp-session-id header on all subsequent POST, GET, and DELETE requests to /mcp. Sessions expire after 30 minutes of idle time."
/>

## Next steps

The Harness MCP Server pairs well with [Harness Skills](https://github.com/harness/harness-skills) — a collection of ready-made Claude Code slash commands for common Harness workflows like `/deploy`, `/rollback`, and `/triage`.

- [Model Context Protocol specification](https://modelcontextprotocol.io/introduction)
- [Harness MCP Server source code](https://github.com/harness/mcp-server)
- [Manage API Keys](/docs/platform/automation/api/add-and-manage-api-keys/)
