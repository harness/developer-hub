---
title: Harness MCP Server
description: Use the Harness MCP Server to query IaCM workspaces, resources, and module registry from AI-powered tools via three exposed API endpoints.
tags: [mcp, ai, cli, infrastructure as code]
---

Harness **Infrastructure as Code Management (IaCM)** is integrated with the [Harness Model Context Protocol (MCP) Server](/docs/platform/harness-ai/harness-mcp-server). The MCP server lets AI-powered tools (such as Claude Desktop, Windsurf, Cursor, and VS Code) interact with your Harness account using natural language. IaCM has exposed **three API endpoint toolsets** to the Harness MCP so you can list and inspect workspaces, resources (including outputs), and module registry without leaving your IDE.

## Three IaCM API endpoints in the Harness MCP

IaCM exposes the following API endpoints as MCP toolsets. Each is read-only and respects your existing IaCM permissions.

| Endpoint | Path | Purpose |
|----------|------|---------|
| **Workspaces** | `/iacm/api/v1/workspaces` | List and get workspace metadata. |
| **Resources** | `/iacm/api/v1/workspaces/{workspaceId}/resources` | List and get resources for a workspace, including outputs. |
| **Module registry** | `/iacm/api/v1/modules` | List and get module registry entries. |

You can ask your AI assistant to list workspaces in a project, fetch resources (and outputs) for a given workspace, or explore the module registry. Authentication and RBAC are the same as for the IaCM UI and APIs: MCP reuses your existing IaCM credentials (API key or OAuth), and your permissions apply to all MCP operations.

## Prerequisites

- **Harness MCP Server installed and configured** for your IDE or CLI. See [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server) for installation and configuration (Windsurf, Cursor, VS Code, Claude, etc.).
- **Harness API key** with access to the IaCM project and workspaces you want to query. Create and manage keys under [API Keys](/docs/platform/automation/api/add-and-manage-api-keys/).
- **Harness AI enabled** at the account level (required for MCP). See [Enable Harness MCP Server](#enable-harness-ai-for-mcp) below.

## Enable Harness AI for MCP

1. **Open account settings:** Go to **Account Settings**.
2. **Open default settings:** Under **General**, select **Default Settings**.
3. **Turn on Harness AI:** Select the **Harness AI** tile and enable the **Harness AI** setting.
4. **Optional:** Enable **Allow Overrides** if you want to enable or disable Harness AI per project.

For UI navigation details, see [Harness navigation 2.0](/docs/platform/get-started/harness-ui-overview/#harness-navigation-version-20).

## Example usage

After the MCP server is running with IaCM toolset enabled and your API key is set, you can use prompts such as:

- **"List all workspaces in this project"** — Uses the Workspaces endpoint.
- **"Get the resources for the workspace 'my-workspace'"** — Uses the Resources endpoint for the given workspace (including outputs).
- **"List the modules in the module registry"** — Uses the Module registry endpoint.

Responses are based on the same IaCM APIs and respect your RBAC; you only see workspaces and resources you have permission to view.

## Troubleshooting

- **Authentication:** MCP uses the same IaCM authentication as the rest of Harness (API key or OAuth). Ensure your API key has the correct scope and is set in the MCP server environment (e.g. `HARNESS_API_KEY`).
- **Permissions:** Access is read-only and follows IaCM RBAC. If you get permission errors, confirm your role has at least Viewer (or equivalent) on the project and workspaces.
- **Audit:** All MCP calls to IaCM are logged under **API Activity** in IaCM audit logs, so you can trace and audit usage.

## Next steps

- [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server) — Full installation, toolsets, and environment variables.
- [Get started with IaCM](/docs/infra-as-code-management/get-started) — Set up workspaces and pipelines.
