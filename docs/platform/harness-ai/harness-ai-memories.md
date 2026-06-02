---
title: Harness AI Memories
sidebar_label: Memories
description: Use Harness AI Memories to personalize AI responses with context captured from your chats.
sidebar_position: 18
keywords:
  - Harness AI Memories
  - AI memory
  - personalization
  - chat context
tags:
  - ai
  - memories
  - personalization
---

import DocImage from '@site/src/components/DocImage';

Harness AI Memories help Harness AI remember useful context from your chats so future responses can better match your preferences, projects, and workflows. Memories are private to you. They are not shared with account, organization, or project users, and they are not visible at those scopes.

---

## What you will learn

- **Memory purpose:** How Memories help Harness AI personalize responses.
- **Memory scope:** Why Memories are private to each user.
- **Memory sources:** How Harness AI captures Memories from chat activity.
- **Memory controls:** How to turn Memories on or off from personal settings.
- **Memory examples:** What types of context Harness AI can remember.

---

## Before you begin

- **Harness AI access:** Harness AI must be active for your account. Go to [Overview of Harness AI](/docs/platform/harness-ai/overview#enable-ai) to enable Harness AI.
- **Chat access:** You need access to Harness AI chat in the module where you work. Go to [Overview of Harness AI](/docs/platform/harness-ai/overview) to confirm available modules.

---

## Memory behavior

Harness AI uses Memories to reduce repeated context setup. Instead of asking you to restate the same preferences or project details in every chat, Harness AI can use relevant Memories when it responds.

Memories currently come from Harness AI chat activity. Harness AI can summarize useful details from chats, such as the project you work in, the types of pipelines you create, or the response style you prefer.

Memories help with these tasks:

- **Personalized responses:** Adapt answers to your role, experience level, and preferred level of detail.
- **Project context:** Recall projects, services, environments, dashboards, and pipelines that appear often in your chats.
- **Workflow continuity:** Preserve useful context across conversations, such as recent pipeline creation tasks or dashboard requests.
- **Operational patterns:** Reflect recurring deploy, build, cost, security, or troubleshooting patterns from prior chats.

:::info Personal privacy

Memories are scoped to the individual user. Harness does not expose your Memories at the account, organization, or project level.

:::

---

## Memory scope

Memories are personal. They help Harness AI respond to you, not to your whole team.

| Scope | Memory visibility |
| --- | --- |
| **Personal** | You can use Memories to personalize your Harness AI experience. |
| **Project** | Project users cannot view your Memories. |
| **Organization** | Organization users cannot view your Memories. |
| **Account** | Account users cannot view your Memories. |

Harness AI can still use context from the Harness page or resource you are working on, subject to your product access. Memories add personal context from your own AI interactions.

---

## What Memories can include

Harness AI can create concise Memories from chat activity. Memories are not full chat transcripts.

Examples include:

- **User preferences:** Preferred response length, communication style, or level of technical depth.
- **Frequent resources:** Projects, pipelines, services, environments, and dashboards that appear often in your chats.
- **DevOps patterns:** Pipeline types you create, deploy strategies you use, or build checks you ask for.
- **Operational context:** Common failures, recent fixes, or recurring troubleshooting paths discussed in chat.
- **Security and compliance context:** Standards or guardrails you mention in chat, such as scan requirements or approval expectations.

Harness AI uses relevant Memories when they can improve the response. Not every chat creates a Memory.

---

## Turn Memories on or off

Use personal Harness AI settings to control whether Harness AI learns preferences from your chats.

1. Open Harness AI.
2. Select the more options menu.
3. Select **Settings**.
4. Select the **Memories** tab.
5. Use the **Enable Memories** toggle to turn Memories on or off.

<DocImage path={require('./static/ai-settings-memories.png')} alt="Harness AI Settings Memories tab with the Enable Memories toggle and a list of personal memories" title="Click to view full size" />
<p align="center"><em>The Memories tab lets you turn Memories on or off and view personal Memories captured from chat.</em></p>

---

## View Memories

The **Memories** tab lists personal Memories that Harness AI has captured from your chats. Each Memory appears as a short summary of context that can help future AI responses.

Review Memories to understand what Harness AI may use for personalization. If the list is empty, continue to use Harness AI chat with Memories enabled. Harness AI creates Memories only when a chat contains useful context for future interactions.

---

## Memory and chat history

Memories and chat history are related, but they are not the same.

- **Chat history:** Stores conversations so you can return to previous chats.
- **Memories:** Stores concise context that helps Harness AI personalize future responses.

For example, chat history can show a prior conversation where you asked Harness AI to create a Go CI pipeline. A Memory can summarize that you often create Go CI pipelines with DockerHub integration.

---

## Write chats that create useful Memories

Harness AI can create better Memories when your chats include clear context.

- **Name the resource:** Include the pipeline, service, environment, dashboard, or project.
- **State your preference:** Tell Harness AI how you want responses structured.
- **Describe your standard:** Mention deploy, build, security, or cost patterns you use often.
- **Correct outdated context:** Tell Harness AI when a preference or workflow has changed.

---

## Next steps

Use Harness AI Memories to make chat responses more personal and continuous across your Harness work. Keep Memories enabled when you want Harness AI to learn from your chats, and turn them off when you do not want chat-based personalization.

- **Harness AI:** Go to [Overview of Harness AI](/docs/platform/harness-ai/overview) to review available AI features.
- **Chat history:** Go to [Chat History and Memory](/docs/platform/harness-ai/memory-chat-history) to understand chat history behavior.
- **Rules:** Go to [Harness AI Rules](/docs/platform/harness-ai/harness-ai-rules) to add rule-based guidance for AI output.
