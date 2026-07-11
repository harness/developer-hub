---
title: AI-assisted dashboards
description: Generate dashboards and widgets from natural language descriptions using Harness AI.
sidebar_position: 2
keywords:
  - dashboards
  - AI
  - natural language
  - dashboard intelligence
  - ai chat
  - harness ai
tags:
  - dashboards
  - harness-ai
---

Harness Dashboards include an AI chat assistant that generates dashboards and widgets from natural language descriptions. Describe what metrics you need and the assistant creates the widgets, queries, and layout based on your request. The AI chat panel appears on the left side of the page and is ready to use as soon as you navigate to **Dashboards**.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- <a href="#ai-chat-panel">Understand the AI chat panel interface and controls</a>.
- <a href="#ai-chat-history">Access and manage your chat history</a>.
- <a href="#ai-chat-settings">Configure AI assistant behavior with rules and memories</a>.
- <a href="#generate-a-dashboard-with-ai-chat">Generate complete dashboards using natural language</a>.
- <a href="#create-a-widget-with-ai">Add individual widgets to existing dashboards</a>.

---

## Before you begin

Before you use AI-assisted dashboards, ensure you have the following:

- **Harness AI enabled**: Harness AI must be active for your account. Go to <a href="/docs/platform/harness-ai/overview#enable-ai" target="_blank">Overview</a> for more information on activating Harness AI.
- **Dashboard access**: Permission to view and create dashboards in your Harness project. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> for more information on permissions.
- **Supported data sources**: AI-assisted dashboards support CI, CD, STO, Pipeline, and Artifact Registry (AR) modules as data sources. Ensure you have access to at least one of these modules to generate dashboards.

---

## AI chat panel

Use the AI chat panel to generate dashboards and widgets through natural language conversations.

<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe
    src="https://app.tango.us/app/embed/video/be2d53e3-a73d-4b9b-8138-c5c40610ed46?narrationType=voice1"
    title="AI assisted Dashboard Overview"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
    sandbox="allow-scripts allow-same-origin allow-popups"
  />
</div> <br> </br>

The AI chat panel includes the following elements:

- **Text input field:** A text box at the bottom of the panel with the placeholder "What would you like to know?" Type your request here.

- **Quick-action buttons:** Pre-built actions that let you get started without typing a query. The available quick actions are:
  - **List pipelines** : View a list of pipelines in your account.
  - **Ask a support question** : Ask a general question about Harness features or configuration.
  - **Analyze Pipeline Errors** : Get a summary of recent pipeline failures and their causes.

- **Send button:** Select the blue arrow icon to submit your request.

- **Context indicator:** The AI chat automatically maintains context based on what you’re viewing to the right of the chat panel. For example, when you open a dashboard, its name appears in the text input field. If you select a specific widget within that dashboard, the widget name is also reflected in the input field, ensuring the conversation stays relevant to your current view.

The top of the AI chat panel also includes the following controls:

- **New Chat** (edit icon) : Start a new conversation. This clears the current chat and opens a fresh session.
- **More options** (three-dot menu **...**) : Access additional features such as [History](#chat-history) and [Settings](#settings).

---

## AI Chat history

Access previous conversations to continue where you left off or review past dashboard generation sessions.

<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe
    src="https://app.tango.us/app/embed/video/13014ceb-4cd8-4d81-968e-fef8e5f2c81c?narrationType=voice1"
    title="Dashboard AI chat History"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
    sandbox="allow-scripts allow-same-origin allow-popups"
  />
</div> <br> </br>

The AI assistant saves your previous conversations so you can return to them later. To access your chat history:

1. Select the three-dot menu (**...**) at the top of the AI chat panel.
2. Select **History**.

The History panel displays a list of your previous conversations, each with its title and the time it was last active (for example, "3 hr ago" or "4 days ago").

You can perform the following actions on each conversation:

  - **Resume:** Select a conversation to reopen it and continue where you left off.
  - **Rename:** Select the three-dot menu (**...**) next to a conversation and choose **Rename** to give it a more descriptive title.
  - **Delete:** Select the three-dot menu (**...**) next to a conversation and choose **Delete** to permanently remove it.

Use the **Search your chats...** bar at the top of the History panel to find a specific conversation by name.

---

## AI Chat Settings

Configure how the AI assistant behaves with rules and memory settings.

To open Settings:

1. Select the three-dot menu (**...**) at the top of the AI chat panel.
2. Select **Settings**.

The Settings panel has two tabs: **Rules** and **Memories**.

### Rules

Rules let you customize the behavior of the AI assistant by providing instructions it follows during conversations. For example, you can create a rule such as "Always use camelCase for variable names in JavaScript code."

The rule takes effect immediately and applies to all future conversations at the selected level.

### Memories

Memories allow the AI assistant to remember context from your previous conversations. The assistant automatically creates memories as you interact with it over time, so it can provide more relevant and personalized responses in future sessions.

When Memories is enabled, the AI assistant learns your preferences and applies them to future conversations without you needing to repeat yourself.

---

## Generate a dashboard with AI Chat

Create complete dashboards with multiple widgets using natural language descriptions. 

<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe
    src="https://app.tango.us/app/embed/video/435c5d21-3a79-4094-99c7-b5bb006c1403?narrationType=voice1"
    title="Create Pipeline Dashboard with AI"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
    sandbox="allow-scripts allow-same-origin allow-popups"
  />
</div> <br> </br>

To generate a dashboard using the AI assistant:

1. Navigate to **Dashboards**.
2. In the AI chat panel on the left, type a description of the dashboard you want in the text input field. For example: "Show me a dashboard with daily deployment counts and failure rates for the last 30 days."
3. Click the send button (blue arrow) to submit your request.
4. Review the generated dashboard with widgets, queries, and layout based on your description.
5. Refine the dashboard if needed. The AI is designed to get you most of the way there, but you may need to make additional adjustments to achieve your exact requirements. Send a follow-up message in the chat or use the dashboard builder to refine the results.

---

## Create a widget with AI

Add individual widgets to existing dashboards through natural language requests.

<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe
    src="https://app.tango.us/app/embed/video/64a7dc9e-ef4e-4ecf-9e7f-dafcf7a64837?narrationType=voice1"
    title="Create a widget using AI"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
    sandbox="allow-scripts allow-same-origin allow-popups"
  />
</div> <br> </br>

Add individual widgets to existing dashboards using natural language requests.

1. Open the dashboard where you want to add the widget.
2. Enter your request in natural language, including the widget description, type, and module. For example: "Create a widget for total builds over time for the last 30 days."
3. Review the generated widget and click **Add Widget** to save it to your dashboard.
4. Enter another request to add more widgets.


---

## Supported visualization types

Request specific chart types in your natural language descriptions to control how data is visualized.

The AI assistant selects the most appropriate visualization type based on your request. To choose a specific type, include it in your description. For example: "What is my monthly deployment count? Filter for the past 12 months. Make this a line chart."

The following visualization types are supported:

- Bar
- Column
- Line
- Pie
- Scatterplot
- Single Value
- Table

:::info
The AI assistant does not support customizing visualization styles such as titles or colors within the request itself. You can adjust these settings manually after the widget is created.
:::

---

## Next steps

- <a href="./overview" target="_blank">Dashboards overview</a>: Browse and manage dashboards.
- <a href="./create-widgets" target="_blank">Create widgets</a>: Manually configure widgets and queries.
- <a href="/docs/platform/harness-ai/overview" target="_blank">Overview of Harness AI</a>: Explore AI features across Harness.
