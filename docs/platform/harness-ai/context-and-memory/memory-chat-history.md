---
title: Chat History and Memory
description: Use Harness AI chat history and Memory to search past conversations and build on previous context.
sidebar_label: Chat History & Memory
sidebar_position: 2
keywords:
  - Harness AI chat history
  - AI memory
  - chat search
  - conversation retention
  - chat summarization
  - personalization
tags:
  - ai
  - memories
  - chat-history
redirect_from:
  - /docs/platform/harness-aida/memory-chat-history
  - /docs/platform/harness-ai/memory-chat-history
---

Harness AI chat history and Memory let you search past conversations and carry useful context into future chats. Chat history stores your conversations so you can return to them, and Memory distills older chats into concise, persistent insights that personalize future Harness AI responses.

---

## What you will learn in this topic

By the end of this topic, you will be able to:

- [Understand how chat history and Memory work together](#how-chat-history-and-memory-work).
- [View, search, and control your chat history](#view-and-control-chat-history).
- [Identify what Harness AI does and does not remember](#scope-of-memory).
- [Review common questions about retention and summarization](#faq).

---

## Before you begin

Before you use chat history and Memory, ensure you have the following:

- **Harness AI access**: Harness AI must be active for your account. Go to <a href="/docs/platform/harness-ai/overview#enable-ai" target="_blank">Overview of Harness AI</a> to enable Harness AI.
- **Chat access**: Access to Harness AI chat in the module where you work. Go to <a href="/docs/platform/harness-ai/overview" target="_blank">Overview of Harness AI</a> to confirm available modules.

---

## How chat history and Memory work

Chat history and Memory serve different purposes. Chat history preserves your full conversations for a retention period, and Memory stores distilled insights that persist beyond that period to personalize future responses.

### Chat history

Harness AI stores every session in your chat history. You can search past chats by keyword, topic, or date, and navigate back to previous conversations to pick up where you left off.

:::info Data retention
Harness keeps conversations for a minimum of 30 days from the last message. After 30 days of inactivity, Harness may summarize the conversation into Memory. When you resume a chat by sending a message, the retention clock resets.
:::

### Memory

When a conversation passes the retention threshold or meets summarization criteria, Harness AI automatically compresses that chat into a summary and stores it as Memory.

These Memories persist beyond the chat history retention period and help Harness AI provide personalized, relevant answers in future interactions. Memories are not full chat transcripts. They are distilled insights, such as:

- **Preferences and style**: Your role, preferences, and how you like responses formatted.
- **Projects and workflows**: Projects you work on and the workflows you use most often.
- **Recurring patterns**: Repeated tasks or approaches that describe how you work.

---

## View and control chat history

Use your chat history to review past conversations and manage what Harness AI stores. The interface displays your past chats in a searchable, filterable list, and you can control Memory and search behavior from your personal settings.

When you open an older chat, you can review the conversation and see whether Harness has summarized or archived it into Memory.

Your settings let you enable or disable the Memory feature and chat history search. Memory controls are personal, and account, organization, and project admins cannot view personal Memories. Go to <a href="/docs/platform/harness-ai/context-and-memory/harness-ai-memories" target="_blank">Harness AI Memories</a> to manage personal Memories.

When you start a new chat, you begin fresh. Harness AI still references relevant Memories, if enabled, to provide context.

---

## Scope of memory

Memory captures selected insights that improve future responses and deliberately excludes sensitive or transient data. Understand what Harness AI does and does not store so you know what context carries forward.

### What gets remembered

- **Role and context**: Your role and chat context, for example, "Rohan is a Product Director focused on AI-native software delivery".
- **Work preferences**: How you prefer to work, for example, "Prefers markdown-formatted summaries" or "Often works on pipelines in Kubernetes".
- **Patterns and workflows**: Key patterns, workflows, and recurring tasks, for example, "Uses GitOps pipelines for deployment" or "Monitors CD events programmatically".

### What does not get remembered

Memory does not store:

- **Full transcripts**: Complete chat conversations.
- **Sensitive data**: Information such as passwords or API keys.
- **Deleted content**: Conversations you explicitly delete.

---

## FAQ

<details>
<summary>How long is chat data kept before it is summarized?</summary>

Harness keeps chat data for a minimum of 30 days from the last message in the conversation. After that, Harness may summarize it into Memory.

</details>

<details>
<summary>If I resume a conversation, does it still get summarized?</summary>

When you send a new message to a chat, the retention clock resets, and the conversation stays in chat history rather than being summarized prematurely.

</details>

<details>
<summary>Is every chat automatically turned into a Memory?</summary>

No. Only chats that meet summarization criteria, such as chats older than the threshold, inactive, or user initiated, get summarized. Only selected insights become Memory. Harness does not retain full transcripts indefinitely.

</details>

<details>
<summary>Does Memory show up across different projects or teams?</summary>

Memory is scoped to each user. Harness does not share Memory across projects.

</details>

---

## Related articles

- <a href="/docs/platform/harness-ai/context-and-memory/harness-ai-memories" target="_blank">Harness AI Memories</a>: Manage the personal context Harness AI captures.
- <a href="/docs/platform/harness-ai/overview" target="_blank">Overview of Harness AI</a>: Review available AI features.
- <a href="/docs/platform/harness-ai/harness-ai-rules" target="_blank">Harness AI Rules</a>: Add rule-based guidance for AI output.