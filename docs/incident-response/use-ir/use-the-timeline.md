---
title: Use the Timeline
sidebar_label: Use the Timeline
description: Learn how to track incidents and automation progress using the timeline in Harness Incident Response.
---

# Use the Timeline

Once you've **created an incident** and performed activities such as **running an automation**, use the timeline for tracking and resolving incidents.

---

## Overview of the Timeline

The **incident timeline** provides a chronological view of all updates and activities related to the incident. It includes:

- System-generated logs of key events
- User comments and manual updates
- Status changes for automations and workflows
- Inputs and outputs from executed actions  

To the right of the timeline, you can:
- Filter on type of communication
- Sort by time

---

## Monitoring Automation Execution

When you **run an automation**, the timeline updates to show the progress and status of each step. Status indicators display whether an action:

- **Succeeded** – Completed successfully.
- **Failed** – Encountered an error.
- **In Progress** – Currently executing.

As defined in the automation:

- Automations start automatically based on **triggering conditions**, if configured.
- Actions execute, integrating with external services.
- Each action’s output can serve as the input for the next step.
- **User interactions** (buttons, prompts) may be required for input.
- The timeline **automatically records events**, creating a real-time audit trail.

---

## Next Steps

- [Use Slack Commands in IR](#)
- [Add Action Items](#)
- [Add Relationships](#)