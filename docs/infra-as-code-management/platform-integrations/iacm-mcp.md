---
title: Harness MCP Server
sidebar_label: Platform
description: Use the Harness MCP Server to query IaCM workspaces, resources, and module registry from AI-powered tools via three exposed API endpoints.
sidebar_position: 10
keywords:
  - mcp
  - model context protocol
  - ai
  - iacm
  - workspaces
  - module registry
tags: [mcp, ai, cli, infrastructure as code]
redirect_from:
  - /docs/infrastructure-as-code-management/iacm-features/mcp-server-support
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness **Infrastructure as Code Management (IaCM)** is integrated with the [Harness Model Context Protocol (MCP) Server](/docs/platform/harness-ai/harness-mcp-server), which lets AI-powered tools (such as Claude Desktop, Windsurf, Cursor, and VS Code) query Harness APIs using natural language. IaCM exposes **three API endpoint toolsets** to the Harness MCP Server so you can list and inspect workspaces, resources (including outputs), and the module registry without leaving your IDE.

The MCP Server acts as a local proxy between your IDE and Harness APIs. When you ask your AI assistant a question about IaCM data, the MCP Server translates your request into a REST API call using your API key, retrieves the data from Harness, and returns it formatted by the AI assistant (not raw JSON). All queries respect your existing IaCM role-based access control (RBAC) permissions.

---

## What you will learn

- **IaCM API endpoints in MCP:** The three IaCM endpoints exposed via the Harness MCP Server (workspaces, resources, module registry) and what data each provides.
- **Natural language queries:** How to query IaCM data using natural language prompts instead of writing API calls directly.
- **Authentication and permissions:** How the MCP Server uses your existing Harness API key and RBAC permissions to control access.
- **Example queries:** Sample prompts for listing workspaces, fetching resources and outputs, and exploring the module registry.

---

## IaCM API endpoints in the Harness MCP

IaCM exposes the following API endpoints as MCP toolsets. Each is read-only and respects your existing IaCM permissions.

| Endpoint | Path | Purpose |
|----------|------|---------|
| **Workspaces** | `/iacm/api/v1/workspaces` | List and get workspace metadata (name, provider, provisioner version, connector, state location). |
| **Resources** | `/iacm/api/v1/workspaces/{workspaceId}/resources` | List and get resources for a workspace, including Terraform outputs. |
| **Module registry** | `/iacm/api/v1/modules` | List and get entries from the Harness IaCM private module registry. |

Authentication and RBAC are the same as for the IaCM UI and APIs. The MCP Server uses your Harness API key (configured in the MCP Server environment), and your permissions apply to all MCP operations. If you have View permission on Project A but not Project B, queries return only Project A data.

### How to query workspaces

Ask your AI assistant to list workspaces in a project or get details about a specific workspace.

**Example prompt:**
```
List all workspaces in project "my-project"
```

**What the AI returns:**
The AI assistant formats the response as a readable summary (not raw JSON), typically showing workspace names, provisioner types (Terraform/OpenTofu), versions, and connectors. You can then ask follow-up questions like "Show me details for workspace X" to see the full metadata (state backend configuration, repository, branch, etc.).

### How to query resources and outputs

Ask your AI assistant to fetch resources for a specific workspace. You need the workspace ID from a prior "list workspaces" query. To extract a workspace ID, ask the AI to list workspaces first, then copy the ID from the response and use it in your resource query.

**Example prompt:**
```
Get resources for workspace "my-workspace" (ID: ws-abc123)
```

**What the AI returns:**
The AI assistant shows Terraform resources managed by that workspace (resource type, name, attributes) and any Terraform outputs defined in the configuration. Outputs are key-value pairs you can reference in other pipelines or tools (for example, a database endpoint URL or an S3 bucket name).

### How to query the module registry

Ask your AI assistant to list modules in the Harness IaCM private module registry or get details about a specific module.

**Example prompt:**
```
List modules in the module registry
```

**What the AI returns:**
The AI assistant shows module names, versions, and metadata. The module registry stores reusable Terraform modules you have published to Harness (not the public Terraform Registry). You can ask follow-up questions like "Show me versions for module X" to see available versions and their publish dates.

---

## Before you begin

This guide assumes basic familiarity with IaCM workspaces and resources. If you are new to IaCM, go to [Get started with IaCM](/docs/infra-as-code-management/get-started) to learn core concepts.

**Setup prerequisites:**

- **Harness AI enabled** at the account level (required for MCP). This is a platform-level feature that gates the MCP Server. Go to [Enable Harness AI](#enable-harness-ai) below.
- **Harness MCP Server installed and configured** for your IDE or CLI. This is a local installation on your machine. Go to [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server) to install and configure MCP for your IDE (Windsurf, Cursor, VS Code, Claude Desktop, etc.).
- **Harness API key** with access to the IaCM project and workspaces you want to query. Go to [Add and manage API keys](/docs/platform/automation/api/add-and-manage-api-keys/) to create a key with IaCM access.

### Enable Harness AI

The Harness AI setting must be enabled at the account level before the MCP Server can connect to Harness APIs.

1. Go to **Account Settings**.
2. Under **General**, select **Default Settings**.
3. Select the **Harness AI** tile and enable the **Harness AI** setting.
4. Optional: Enable **Allow Overrides** to control Harness AI per project.

For UI navigation details, go to [Harness navigation 2.0](/docs/platform/get-started/harness-ui-overview/#harness-navigation-version-20) to understand how to access account settings.

---

## Troubleshooting

<Troubleshoot
  issue="MCP query to IaCM fails with authentication error"
  mode="docs"
  fallback="The MCP Server uses your Harness API key (set in the MCP Server environment, e.g. HARNESS_API_KEY). Ensure the key is valid, has not expired, and has access to the IaCM project. Go to Account Settings > API Keys to verify the key scope and regenerate if needed."
/>

<Troubleshoot
  issue="MCP query returns no workspaces or resources even though they exist in IaCM"
  mode="docs"
  fallback="Access is read-only and follows IaCM RBAC. If you have View permission on Project A but not Project B, queries return only Project A data. If you get permission errors, confirm your role has at least Viewer permission on the project and workspaces. Go to the Harness RBAC documentation to understand role assignments."
/>

<Troubleshoot
  issue="Where to view IaCM MCP query audit logs in Harness"
  mode="docs"
  fallback="All MCP calls to IaCM are logged in the Harness audit logs under API Activity. To view them, go to your project in Harness, select Activity (or Audit Trail, depending on your Harness version), and filter by API calls. The logs show the timestamp, user, endpoint queried, and result count."
/>

---

## Related concepts

Now that you understand how IaCM integrates with the Harness MCP Server, explore related topics:

- [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server): Install and configure the MCP Server for your IDE, manage API keys, and explore other Harness modules exposed via MCP.
- [Get started with IaCM](/docs/infra-as-code-management/get-started): Set up workspaces and pipelines to manage your infrastructure as code.
- [IaCM workspaces](/docs/infra-as-code-management/workspaces/workspace-tabs): Learn how workspaces store Terraform state, connect to infrastructure providers, and manage resources.
- [IaCM module registry](/docs/infra-as-code-management/registry/module-registry): Publish and manage reusable Terraform modules in the Harness private module registry.
