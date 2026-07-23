---
title: MCP Connectors in Harness AI Chat
sidebar_label: MCP Connectors
description: Add third-party MCP connectors to Harness AI chat to give the assistant tools from external services such as GitHub, GitLab, and Jira.
sidebar_position: 19
keywords:
  - Harness AI MCP connectors
  - MCP connector
  - Model Context Protocol
  - AI chat tools
  - third-party MCP
tags:
  - ai
  - mcp
  - connectors
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocImage from '@site/src/components/DocImage';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness AI chat can use third-party MCP (Model Context Protocol) connectors to reach tools and data outside of Harness. When you attach an MCP connector to your chat settings, Harness AI can call that server's tools during a conversation, such as listing GitHub repositories, reading Jira issues, querying GitLab, or calling a custom internal service. MCP connectors are additive: they extend what Harness AI can do without changing your existing chat workflows.

---

:::note Feature flag
Currently, this feature is behind the feature flag `ML_ENABLE_CHAT_MCP_SETTINGS`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

---

## What you will learn

- **Connector purpose:** How third-party MCP connectors add tools to Harness AI chat.
- **Connector scope:** How account, organization, and project connectors apply.
- **Connector management:** How to add, pin, edit, and remove connectors from chat settings.
- **Tool permissions:** How to control which MCP tools Harness AI can call, and when it needs approval.
- **Tool usage:** How Harness AI calls MCP tools during a chat.
- **Supported servers:** Which third-party MCP servers you can connect, such as GitHub, GitLab, and Jira.

---

## Before you begin

- **Harness AI access:** Harness AI must be active for your account. Go to [Overview of Harness AI](/docs/platform/harness-ai/overview#enable-ai) to enable Harness AI.
- **Feature flag:** The `ML_ENABLE_CHAT_MCP_SETTINGS` flag must be enabled. Contact [Harness Support](mailto:support@harness.io) to enable it.
- **An MCP Server connector:** You need an MCP Server connector, or permission to create one, at account, organization, or project scope. Go to [Configure MCP connectors](/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/configuration#configure-mcp-connectors) to set up the connector, or go to [Add an MCP connector](#add-an-mcp-connector) to create one during chat setup.
- **Server credential:** MCP Server connectors authenticate with the credential the server expects, such as a custom header or API key. Store the credential as a Harness secret. Go to [Add and reference text secrets](/docs/platform/secrets/add-use-text-secrets) to create one.

---

## How MCP connectors work in chat

Harness AI chat sends your prompt to the model along with the tools exposed by each connector you attach. When a request needs one of those tools, Harness AI calls the MCP server, uses the result, and continues the conversation.

- **Extra tools:** Each connector adds the tools its MCP server exposes, such as repository, issue, or ticket operations.
- **Live data:** Harness AI reads current data from the server at request time, not a cached copy.
- **Session scope:** Attached connectors apply to your chat sessions. Other users do not inherit your selection.
- **Governance still applies:** Harness AI Rules continue to shape and constrain responses. When a rule limits an action, Harness AI reports the constraint in its answer.

Harness AI Rules and Memories still apply when connectors are active. Go to [Harness AI Rules](/docs/platform/harness-ai/harness-ai-rules) to constrain AI output, and go to [Harness AI Memories](/docs/platform/harness-ai/harness-ai-memories) to personalize responses.

---

## Connector scopes

MCP connectors follow the Harness account, organization, and project hierarchy. The **Select MCP Connector** panel lists connectors under **Project**, **Organization**, and **Account** tabs so you can attach connectors from any scope you can access.

| Scope | Typical owner | Common use |
| --- | --- | --- |
| **Account** | Account admin | Shared servers for every team, such as an account-wide GitHub or Jira MCP server. |
| **Organization** | Organization admin | Servers shared across the projects in one organization. |
| **Project** | Project admin or user | Servers specific to one project, such as a project GitLab or Jira integration. |

---

## Connector status and management

The connector list shows the state of each connector so you can tell which servers are reachable before you attach them.

- **Connection status:** A colored indicator shows connector health. Green indicates a reachable, healthy connector. Red indicates a connection problem, such as an invalid URL or credential.
- **Pin:** Pin a connector to keep it at the top of the list for quick reuse.
- **Edit:** Select the edit icon to open the connector and update its URL, authentication, or other settings.
- **Search:** Use the search box to filter connectors by name within the selected scope.

If a connector shows a red status, open it with the edit icon and confirm the server URL and API key. Go to [Add an MCP connector](#add-an-mcp-connector) to review the required values.

<DocImage path={require('./static/ai-mcp-connectors-tab.png')} alt="Harness AI Settings MCP Connectors tab showing an attached connector with a delete icon and an Add MCP Connector button" title="Click to view full size" />
<p align="center"><em>The MCP Connectors tab lists attached connectors and lets you add or remove them before you select Save.</em></p>

---

## Add an MCP connector

Attach a connector from Harness AI chat settings. You can attach an existing connector or create a new one.

1. Open Harness AI.
2. Select the more options menu, then select **Settings**.
3. Select the **MCP Connectors** tab.
4. Select **Add MCP Connector**.
5. In the **Select MCP Connector** panel, choose **Existing** or **New**.

<DocImage path={require('./static/ai-mcp-settings-menu.png')} alt="Harness AI chat more options menu with History and Settings entries" title="Click to view full size" />
<p align="center"><em>Open Settings from the Harness AI more options menu to reach the MCP Connectors tab.</em></p>

<DocImage path={require('./static/ai-mcp-select-connector.png')} alt="Select MCP Connector panel with Existing and New options and Project, Organization, and Account tabs listing connectors" title="Click to view full size" />
<p align="center"><em>The Select MCP Connector panel lists connectors by scope and lets you use an existing connector or create a new one.</em></p>

<Tabs>
<TabItem value="existing" label="Use an existing connector" default>

1. Select **Existing**.
2. Select the **Project**, **Organization**, or **Account** tab for the scope that holds the connector.
3. Search for the connector by name, then select it.
4. Optionally pin the connector to keep it at the top of the list.
5. Close the panel to return to **MCP Connectors**, then select **Save**.

</TabItem>
<TabItem value="new" label="Create a new connector">

1. Select **New** to create an MCP Server connector.
2. Enter the **Server URL** for the third-party MCP server, such as your GitHub, GitLab, or Jira MCP endpoint.
3. Under **Authentication**, provide the credential the server expects, such as a custom header or API key, stored as a Harness secret.
4. Save the connector, then attach it and select **Save**.

</TabItem>
</Tabs>

:::warning
MCP Server connectors require both a valid server URL and a valid credential. A connector name alone is not sufficient. If either value is wrong, the connector shows a red status and its tools do not load.
:::

To create a connector outside of chat, or to review the full connector YAML, go to [Configure MCP connectors](/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/configuration#configure-mcp-connectors).

---

## Manage tool permissions

An MCP server exposes a set of tools, and each tool can read or change data in the connected system. The **Tools** step of the MCP Server Connector controls how Harness AI can invoke each tool, so you can allow safe read operations while gating anything that writes. Set these permissions when you create the connector, or open an existing connector and go to the **Tools** step to change them.

Each tool supports three permission levels:

- **Always allow:** Harness AI can call the tool without confirmation. Use this for low-risk, read-only tools, such as listing repositories or reading issues.
- **Blocked:** Harness AI cannot call the tool. Use this to hide tools you do not want available in chat.
- **Needs approval:** Harness AI must request your confirmation before it calls the tool. Use this for tools that create, update, or delete data, such as opening a pull request or commenting on an issue.

Use the **Set all tools to** selector at the top of the step to apply one permission level to every tool at once, then adjust individual tools as needed. The per-tool rows show the tool name and description so you can decide the right level for each one.

<DocImage path={require('./static/ai-mcp-tool-permissions.png')} alt="MCP Server Connector Tools step showing the Set all tools to selector and per-tool Always allow, Blocked, and Needs approval radio buttons" title="Click to view full size" />
<p align="center"><em>The Tools step sets a permission level for each tool the MCP server exposes, with a bulk selector to set all tools at once.</em></p>

Select **Save** to apply tool permissions. Harness AI enforces these permissions in every chat that uses the connector.

:::tip Start restrictive for write tools
Set write tools to **Needs approval** or **Blocked** until you trust a connector in chat. You can loosen permissions later without recreating the connector.
:::

---

## Remove an MCP connector

1. Open the **MCP Connectors** tab in Harness AI settings.
2. Select the delete icon next to the connector you want to remove.
3. Select **Save**.

Removing a connector detaches it from your chat sessions. It does not delete the underlying connector, so you can attach it again later.

---

## Use MCP tools in chat

After you attach a connector and save, ask Harness AI a question that needs one of its tools. Harness AI decides when to call the tool, runs it, and uses the result in its answer.

For example, with a GitHub MCP connector attached, you can ask:

```text
List the GitHub repositories in my GitHub account.
```

Harness AI calls the GitHub MCP server, retrieves your repositories, and returns them in the chat, along with a short note about any governance rules it applied to the request.

<DocImage path={require('./static/ai-mcp-chat-github-result.png')} alt="Harness AI chat response listing GitHub repositories in a table after calling the GitHub MCP connector" title="Click to view full size" />
<p align="center"><em>Harness AI calls the attached GitHub MCP connector and returns repository data directly in the chat.</em></p>

---

## Supported MCP servers

You can attach any third-party MCP Server connector that exposes a reachable endpoint and a valid credential. Common sources include:

- **GitHub:** Repositories, issues, and pull requests.
- **GitLab:** Projects, merge requests, and issues.
- **Jira:** Issues, projects, and tickets.
- **Other providers:** Any custom or third-party MCP server that follows the Model Context Protocol and exposes a reachable endpoint.

:::tip Harness-native tools
Harness AI already has built-in access to Harness data such as pipelines, executions, services, and environments, so you do not need an MCP connector for Harness-native workflows. Add MCP connectors when you want Harness AI to reach tools and data in external systems. Go to the [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server) page to review the Harness-native tools available.
:::

---

## Troubleshooting

<Troubleshoot
  issue="The MCP Connectors tab does not appear in Harness AI chat settings"
  mode="general"
  fallback="MCP connectors in Harness AI chat are behind the ML_ENABLE_CHAT_MCP_SETTINGS feature flag. Contact Harness Support to enable it for your account."
/>

<Troubleshoot
  issue="An MCP connector shows a red connection status in Harness AI chat settings"
  mode="general"
  fallback="A red status means the connector cannot reach its MCP server. Open the connector, confirm the server URL is correct and reachable, and verify the API key secret is valid and not expired."
/>

<Troubleshoot
  issue="Harness AI does not use the tools from an attached MCP connector"
  mode="general"
  fallback="Confirm you selected Save after attaching the connector, that the connector status is healthy, and that your prompt clearly asks for an action the server's tools support."
/>

---

## Next steps

Attach MCP connectors to give Harness AI chat the tools it needs for your workflows, then keep only the connectors you actively use to keep tool selection focused.

- **Harness AI:** Go to [Overview of Harness AI](/docs/platform/harness-ai/overview) to review available AI features.
- **Configure a connector:** Go to [Configure MCP connectors](/docs/platform/harness-ai/core-capabilities/in-your-pipelines/worker-agent/configuration#configure-mcp-connectors) to set up an MCP Server connector, including server URL, authentication, and connector YAML.
- **Harness MCP Server:** Go to [Harness MCP Server](/docs/platform/harness-ai/harness-mcp-server) to review Harness-native MCP tools and resource types.
- **Rules:** Go to [Harness AI Rules](/docs/platform/harness-ai/harness-ai-rules) to constrain AI output before Harness resources change.
- **Prompt quality:** Go to [Effective Prompting with Harness AI](/docs/platform/harness-ai/effective-prompting-ai) to write prompts that produce better tool calls.
