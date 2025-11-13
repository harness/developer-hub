---
title: Chat History and Memory
description: Using Harness AI's chat search and memory to build on previous context
sidebar_label: Chat History & Memory
sidebar_position: 15
---

# Chat History & Memory

## Overview

Chat History & Memory provides:

- **Searchable records** of past conversations with Harness AI
- **Automatic summarization** of older chats into persistent Memory
- **The ability to create** new chats while retaining older ones

## How it works

### Chat History

Harness AI stores every session in your Chat History. You can search past chats by keyword, topic, or date, and navigate back to previous conversations to pick up where you left off.

:::info Data retention
Harness keeps conversations for a minimum of 30 days from the last message. After 30 days of inactivity, Harness may summarize the conversation into Memory. When you resume a chat by sending a message, the retention clock resets.
:::

### Memory

When a conversation passes the retention threshold or meets summarization criteria, the system automatically compresses that chat into a summary and stores it as Memory.

These Memories persist beyond the Chat History retention period and help Harness AI provide personalized, relevant answers in future interactions. Memories are not full chat transcripts; they are distilled insights:

- Your role, preferences, and style
- Projects you work on and typical workflows
- Recurring patterns or how you like to work

## View and control chat history

The interface displays your past chats in a searchable, filterable list. When you open an older chat, you can review the conversation and see whether Harness has summarized or archived it into Memory.

Settings allow you to enable or disable the Memory feature and Chat History search according to your preferences. For organizational or enterprise accounts, admin controls may allow disabling or resetting memory for all users.

When you start a new chat, you begin fresh—the system still references relevant Memories (if enabled) to provide context.

## Scope of memory

### What gets remembered

- Your role and chat context (for example, "Rohan is a Product Director focused on AI-native software delivery")
- How you prefer to work (for example, "Prefers markdown-formatted summaries", "Often works on pipelines in Kubernetes")
- Key patterns, workflows, and recurring tasks (for example, "Uses GitOps pipelines for deployment", "Monitors CD events programmatically")

### What doesn't get remembered

Memory does not store:

- Full chat transcripts
- Sensitive information like passwords or API keys
- Conversations you explicitly delete

## FAQs

**Q: How long is chat data kept before it's summarized?**

Harness keeps chat data for a minimum of 30 days from the last message in the conversation. After that, Harness may summarize it into Memory.

**Q: If I resume a conversation, does it still get summarized?**

When you send a new message to a chat, the retention clock resets, and the conversation stays in Chat History rather than being summarized prematurely.

**Q: Is every chat automatically turned into a Memory?**

No. Only chats that meet summarization criteria (for example, older than threshold, inactive, or user initiated) get summarized. Only selected insights become Memory; Harness does not retain full transcripts indefinitely.

**Q: Does Memory show up across different projects or teams?**

Memory is scoped to each user. Harness does not share memory across projects.