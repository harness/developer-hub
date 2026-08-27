---
title: Chat History and Memory
description: Using Harness AI's chat search and memory to build on previous context
sidebar_label: Chat History & Memory
sidebar_position: 15
---

# Chat History & Memory

## What This Feature Does

The Chat History & Memory feature gives you:

- **A searchable record of your past conversations** with Harness AI ("Chat History")
- **Automatic summarization of older chats** into a persistent "Memory" that helps the assistant recall relevant context over time
- **The ability to create new chats anytime**, while older ones are retained for a minimum period and then summarized

## How It Works

### Chat History

Every time you interact with Harness AI, your session is stored in your Chat History. You can search across your past chats by keywords, topics, or dates, and navigate back to past conversations to pick up where you left off.

**Retention:** Each conversation is kept for at least 30 days, measured from the last message in that conversation. After 30 days of inactivity (no new messages added to that chat), the conversation is eligible to be summarized into Memory. If you resume a chat by sending a message, the retention clock resets.

### Memory

When a conversation becomes "older" (past the retention threshold) or meets certain summarization criteria, the system automatically compresses that chat into a summary and stores it as a Memory.

These Memories persist beyond the Chat History retention period and are used to help Harness AI provide personalized, relevant answers in future interactions. Memories are not full chat transcripts—they are distilled insights that capture:

- Your role, preferences, and style
- Projects you work on and typical workflows
- Recurring patterns or "how you like to work"

## What You Will See and Control

In the UI, you will see your past chats listed (searchable, filterable). When you open an older chat, you'll be able to review the conversation, and possibly see a note that it has been summarized or archived into Memory (depending on UI design).

You will have settings to enable or disable the Memory feature (and Chat History search) according to your preferences. For organizational or enterprise accounts, admin controls may allow disabling or resetting memory for all users.

If you start a new chat, you begin fresh—the system will still reference relevant Memories (if enabled) to provide context.

## What the Assistant Remembers (and What It Doesn't)

### What It Does Remember

- Your role and chat context (e.g., "Rohan is a Product Director focused on AI-native software delivery")
- How you prefer to work (e.g., "Prefers markdown-formatted summaries", "Often works on pipelines in Kubernetes")
- Key patterns, workflows, and recurring tasks (e.g., "Uses GitOps pipelines for deployment", "Monitors CD events programmatically")

## FAQs

**Q: How long is chat data kept before it's summarized?**

The minimum retention period is 30 days from the last message in the conversation. After that, it may be summarized into Memory.

**Q: If I resume a conversation, does it still get summarized?**

If you send a new message to a chat, the retention clock resets, and it stays in Chat History rather than being summarized prematurely.

**Q: Is every chat automatically turned into a Memory?**

Not exactly. Only chats that meet summarization criteria (e.g., older than threshold, inactive, user initiatied) will be summarized. Also, only selected insights become Memory; full transcripts are not retained indefinitely.

**Q: Does Memory show up across different projects or teams?**

Memory is scoped by context to user. The memory isn't currently shared across the project.

