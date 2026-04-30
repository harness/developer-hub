---
title: AI-assisted dashboards
description: Generate dashboards and widgets from natural language descriptions using Harness AI.
sidebar_position: 2
keywords:
  - dashboards
  - AI
  - natural language
  - dashboard intelligence
tags:
  - Dashboards
---

import DocImage from '@site/src/components/DocImage';

## Overview

Harness Dashboards include an AI chat assistant that helps you create dashboards and widgets using natural language. Instead of manually configuring every widget, you can describe what you need and let the assistant generate it for you.

The AI chat panel appears on the left side of the page and is ready to use as soon as you navigate to **Dashboards**.

## AI chat panel

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
  - **List pipelines** — View a list of pipelines in your account.
  - **Ask a support question** — Ask a general question about Harness features or configuration.
  - **Analyze Pipeline Errors** — Get a summary of recent pipeline failures and their causes.

- **Send button:** Select the blue arrow icon to submit your request.

- **Context indicator:** The AI chat automatically maintains context based on what you’re viewing to the right of the chat panel. For example, when you open a dashboard, its name appears in the text input field. If you select a specific widget within that dashboard, the widget name is also reflected in the input field, ensuring the conversation stays relevant to your current view.

The top of the AI chat panel also includes the following controls:

- **New Chat** (edit icon) — Start a new conversation. This clears the current chat and opens a fresh session.
- **More options** (three-dot menu **...**) — Access additional features such as [History](#chat-history) and [Settings](#settings).

## AI Chat history

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

## AI Chat Settings

The Settings panel lets you configure how the AI assistant behaves. To open Settings:

1. Select the three-dot menu (**...**) at the top of the AI chat panel.
2. Select **Settings**.

The Settings panel has two tabs: **Rules** and **Memories**.

### Rules

Rules let you customize the behavior of the AI assistant by providing instructions it follows during conversations. For example, you can create a rule such as "Always use camelCase for variable names in JavaScript code."

The rule takes effect immediately and applies to all future conversations at the selected level.

### Memories

Memories allow the AI assistant to remember context from your previous conversations. The assistant automatically creates memories as you interact with it over time, so it can provide more relevant and personalized responses in future sessions.

When Memories is enabled, the AI assistant learns your preferences and applies them to future conversations without you needing to repeat yourself.

## Generate a dashboard with AI Chat 

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

1. Go to **Dashboards**.
2. In the AI chat panel on the left, type a description of the dashboard you want in the text input field. For example: "Show me a dashboard with daily deployment counts and failure rates for the last 30 days."
3. Select the send button (blue arrow) to submit your request.
4. The AI creates a dashboard with widgets, queries, and layout based on your description.
5. Review the results generated by the AI chat. While it is designed to get you most of the way there, you may need to make additional adjustments to achieve your exact requirements. If the dashboard doesn’t match your expectations, refine it using the builder or send a follow-up message in the chat.

## Create a widget with AI

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

You can also use the AI assistant to add individual widgets to an existing dashboard.

1. Open the Dashboard where you want to add the widget.
2. Enter your request in natural language, including the widget’s description, type, and module. For example: "Create a widget for total builds over time for the last 30 days."
3. The AI generates the widget. Review it and click "Add Widget" to save it to your dashboard.
4. To add more widgets, enter another request.


## Supported visualization types

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

## Next steps

- [Dashboards overview](./overview.md) — Learn how to browse and manage dashboards.
- [Create widgets](./create-widgets.md) — Manually configure widgets and queries.
- [Overview of Harness AI](/docs/platform/harness-ai/overview) — Learn about AI features across Harness.
