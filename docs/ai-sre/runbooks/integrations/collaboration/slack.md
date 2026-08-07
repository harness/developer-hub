---
title: Slack Integration for Runbooks
sidebar_label: Slack
sidebar_position: 3
description: Post messages, create channels, and run commands from runbooks.
keywords:
  - slack
  - collaboration
  - notifications
  - block kit
  - runbooks
tags:
  - ai-sre
  - integrations
  - slack
redirect_from:
- /docs/incident-response/runbooks/integrations/slack
- /docs/ai-sre/runbooks/integrations/slack
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness AI SRE integrates with Slack at the organization level, enabling automated incident communication and team collaboration across all projects.

## Overview

Slack integration enables your runbooks to do the following:
- Send automated notifications
- Create incident-specific channels
- Manage threaded discussions
- Coordinate response teams
- Track incident updates

---

## Set up the integration

### Prerequisites
- Slack Workspace Admin access
- Harness Organization Admin role

### Setup steps
1. Go to **Organization Settings**, then **Third Party Integrations (AI SRE)**.
2. Click **Connect** for Slack.
3. Follow the OAuth flow to authorize Harness.
4. Configure workspace permissions.

### Required Slack permissions
The Harness Slack bot requires these permissions:
- `channels:manage`: Create and manage channels
- `chat:write`: Send messages
- `groups:write`: Manage private channels
- `im:write`: Send direct messages

### Features
- Global Slack workspace access across all projects
- Unified authentication
- Centralized channel management
- Cross-project notifications

---

## Use Slack actions in runbooks

Slack actions are configured through the runbook action form in the UI:

1. **In your runbook**, click **New Step**, then **Action**.

   ![New Step Menu](../static/runbook-new-step-menu.png)

2. In the **Select Action** dialog, go to the **Communication** category.
3. Select the Slack action you need from the available options.

   ![Select Action Dialog](../static/action-create-slack-channel.png)

4. Configure the action through a form. The fields shown depend on the action type you select.

---

## Slack actions in runbooks

### Send Slack message action

Sends a message to a specified Slack channel.

**Form fields:**
- **Channel:** Channel name or ID (e.g., `#incidents` or `{{Activity.slack_channel}}`)
- **Message:** Message text to send
  - Supports Mustache variables: `{{Activity.title}}`, `{{Activity.summary}}`
  - Can include Slack markdown formatting (bold, italics, links)
  - Supports Block Kit JSON format for rich message layouts. Go to [Format messages with Block Kit](#format-messages-with-block-kit) to review examples.

### Create Slack channel action

Creates a new Slack channel for incident coordination.

**Form fields:**
- **Channel Name:** Name for the new channel (must follow Slack naming rules)
  - Example: `incident-{{Activity.id}}`
- **Description:** Channel topic/description
- **Is Private:** Whether to create a private channel

**Available Mustache variables:**
- `{{Activity.title}}`: AI SRE incident title
- `{{Activity.id}}`: AI SRE incident ID
- `{{Activity.severity}}`: AI SRE incident severity
- `{{Activity.severity.id}}`: AI SRE incident severity ID (e.g., 1, 2, 3)
- `{{Activity.status}}`: AI SRE incident status
- `{{Activity.summary}}`: AI SRE incident summary
- Any custom incident fields configured in your incident template

---

## Format messages with Block Kit

Harness AI SRE supports Slack's Block Kit JSON for rich layouts, including varied text sizes, colors, and formatting beyond basic markdown.

### When to use Block Kit

Use Block Kit when you need:
- Visually distinct severity indicators
- Multi-section messages with different formatting
- Compact supplementary information
- Consistent message layouts across incidents
- Rich interactive elements (buttons, menus)

Use simple text when you need:
- Quick notifications without special formatting
- Plain status updates
- Messages with only basic markdown

### Format overview

Block Kit messages are JSON arrays of block objects, each with a `type`. The Message field accepts plain text or Block Kit JSON.

:::note Line breaks in Block Kit JSON
The Message field is parsed as **strict JSON**. A string cannot span lines, so use the `\n` escape inside a value. A real newline or trailing backslash is invalid JSON and renders literally.

To keep the source readable, split content across multiple blocks or a section's `fields` array so each string stays short. The examples below use that approach.
:::

### Section block

Use Section blocks for standard text with markdown, ideal for primary incident info and announcements.

**Example: Incident alert with severity**

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*New SEV{{Activity.severity.id}} incident*"
    }
  }
]
```

**Rendered output in Slack:**

![Simple incident alert rendered in Slack](../static/block-kit-section-example.svg)

**Characteristics:**
- Standard text size
- Full markdown support (bold, italics, links, emoji)
- Black text on white background
- Suitable for primary content

**With multiple variables:**

A header section carries the title; a `fields` section holds metadata as label/value pairs, keeping each string short.
Use Context blocks for small, compact gray text, ideal for metadata or instructions that should be de-emphasized.
```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "<!channel> :rotating_light: *{{Activity.title}}*"
    }
  },
  {
    "type": "section",
    "fields": [
      {
        "type": "mrkdwn",
        "text": "*Severity:*\nSEV{{Activity.severity.id}}"
      },
      { "type": "mrkdwn", "text": "*Status:*\n{{Activity.status}}" },
      { "type": "mrkdwn", "text": "*ID:*\n{{Activity.id}}" }
    ]
  }
]
```

**Rendered output in Slack:**

![Incident alert with severity, status, and ID rendered in Slack](../static/block-kit-section-fields-example.svg)

:::tip
A `fields` array renders as a two-column grid, filling left to right. With three fields, the first two share a row and the third sits below.

To stack values in one column instead, use a single section's `text` with `\n` separators:

```json
"text": "*Severity:* SEV{{Activity.severity.id}}\n*Status:* {{Activity.status}}"
```
:::

### Context block

Use Context blocks for small, compact gray text, ideal for metadata or instructions that should be de-emphasized.

**Example: Supplementary instructions**

```json
[
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "*New SEV{{Activity.severity.id}} incident* – details above."
      }
    ]
  }
]
```

**Rendered output in Slack:**

![Supplementary instructions in a context block rendered in Slack](../static/block-kit-context-example.svg)

**Characteristics:**
- Smaller text size
- Gray text color
- Markdown support in each element
- Suitable for secondary information

**Key difference from Section block:**
- Context blocks use an `elements` array (can contain multiple text elements)
- Section blocks use a single `text` object
- Context blocks render in a more compact, muted style

### Combine blocks

Create rich, multi-section messages by combining block types. Blocks are rendered in array order.

**Example: Incident notification with details and instructions**

Metadata goes in a `fields` section; the link sits in its own context block.

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*New SEV{{Activity.severity.id}} Incident Detected*"
    }
  },
  {
    "type": "section",
    "fields": [
      { "type": "mrkdwn", "text": "*Title:*\n{{Activity.title}}" },
      { "type": "mrkdwn", "text": "*Status:*\n{{Activity.status}}" },
      { "type": "mrkdwn", "text": "*Summary:*\n{{Activity.summary}}" }
    ]
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "<{{Activity.url}}|Incident {{Activity.id}}>"
      }
    ]
  }
]
```

**Rendered output in Slack:**

![Incident notification with details and instructions rendered in Slack](../static/block-kit-combined-blocks.svg)

### Divider blocks

Add visual separation between sections using divider blocks.

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*Incident Alert*"
    }
  },
  {
    "type": "divider"
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "Details go here..."
    }
  }
]
```

### Format text with markdown

Within `mrkdwn` text fields, you can use:
- **Bold:** `*text*`
- **Italics:** `_text_`
- **Strikethrough:** `~text~`
- **Code:** `` `code` ``
- **Code block:** `` ```code block``` ``
- **Links:** `<URL|link text>`
- **User mentions:** `<@USER_ID>`
- **Channel mentions:** `<!channel>`, `<!here>`, `<#CHANNEL_ID>`
- **Emoji:** `:emoji_name:`
- **Line breaks:** `\n`

### Variable interpolation

Mustache variables work seamlessly within Block Kit JSON. Variables are replaced before the JSON is sent to Slack.

**Examples:**
- `{{Activity.severity.id}}` renders as `1`, `2`, `3`
- `{{Activity.title}}` renders as `Database Connection Failure`
- `{{Activity.status}}` renders as `Investigating`, `Resolved`

The examples below link with `{{Activity.url}}` and `{{Activity.postmortem_url}}`, which are example custom fields holding the incident and post-mortem links. Use whatever link fields your incident template provides, or a full URL.

**Important:** Variables are auto-escaped, but ensure values contain no characters that break JSON (quotes, newlines).

### Common templates

#### High-severity incident alert

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ":red_circle: *CRITICAL: SEV{{Activity.severity.id}} Incident*"
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*{{Activity.title}}*"
    }
  },
  {
    "type": "section",
    "fields": [
      { "type": "mrkdwn", "text": "*Status:*\n{{Activity.status}}" },
      { "type": "mrkdwn", "text": "*Impact:*\n{{Activity.summary}}" }
    ]
  },
  {
    "type": "divider"
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "ID: {{Activity.id}} | <{{Activity.url}}|Details>"
      }
    ]
  }
]
```

**Rendered output in Slack:**

![Critical high-severity incident alert rendered in Slack](../static/block-kit-high-severity-example.svg)

#### Status update notification

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ":information_source: *Incident Status Update*"
    }
  },
  {
    "type": "section",
    "fields": [
      { "type": "mrkdwn", "text": "*Incident:*\n{{Activity.title}}" },
      { "type": "mrkdwn", "text": "*New Status:*\n{{Activity.status}}" }
    ]
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "{{Activity.updated_at}} | SEV{{Activity.severity.id}}"
      }
    ]
  }
]
```

**Rendered output in Slack:**

![Incident status update notification rendered in Slack](../static/block-kit-status-update-example.svg)

#### Resolution notification

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ":white_check_mark: *Incident Resolved*"
    }
  },
  {
    "type": "section",
    "fields": [
      { "type": "mrkdwn", "text": "*Incident:*\n{{Activity.title}}" },
      {
        "type": "mrkdwn",
        "text": "*Severity:*\nSEV{{Activity.severity.id}}"
      },
      { "type": "mrkdwn", "text": "*Duration:*\n{{Activity.duration}}" }
    ]
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "Resolved | <{{Activity.postmortem_url}}|Post-Mortem>"
      }
    ]
  }
]
```

**Rendered output in Slack:**

![Incident resolution notification rendered in Slack](../static/block-kit-resolution-example.svg)

### Limitations

When using Block Kit in Harness AI SRE, be aware of these constraints:

- **Block limit**: Slack allows up to 50 blocks per message
- **Text length**: Section and context text fields have a 3,000 character limit
- **JSON validation**: Invalid JSON will cause the action to fail. Validate syntax before deploying.
- **Interactive elements**: Buttons and menus display but are not interactive from AI SRE runbooks, they do not trigger callbacks.
- **Variable escaping**: Variables are auto-escaped, but ensure incident data has no malformed JSON characters.

### Test messages

Before deploying runbooks with Block Kit messages:

1. **Use Block Kit Builder:** Preview your JSON at [api.slack.com/block-kit](https://api.slack.com/block-kit/building).
2. **Test with static data:** Replace Mustache variables with example values to validate JSON syntax.
3. **Run in a test channel:** Execute the runbook in a non-production Slack channel first.
4. **Verify variable rendering:** Check that all `{{Activity.*}}` variables are replaced correctly in the execution logs.

### Migrate from plain text

If you have existing runbooks with plain text messages, you can migrate them to Block Kit:

**Before (plain text):**
```text
⚠️ New SEV{{Activity.severity.id}} incident: {{Activity.title}}
Status: {{Activity.status}}
```

**After (Block Kit):**

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*New SEV{{Activity.severity.id}} incident: {{Activity.title}}*"
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*Status:* {{Activity.status}}"
    }
  }
]
```

**Rendered output in Slack:**

![Plain-text alert migrated to Block Kit rendered in Slack](../static/block-kit-migration-example.svg)

**Benefits:**
- Better visual hierarchy
- Consistent formatting
- Easier to add sections without breaking layout

---

## Best practices

### Name channels consistently

Follow these conventions when naming incident channels:

- Use consistent prefixes: `incident-`, `alert-`, `sev1-`
- Include incident IDs: `incident-{{Activity.id}}-api`
- Keep names descriptive: `sev{{Activity.severity.id}}-{{Activity.service}}`
- Follow workspace conventions: lowercase, hyphens, no spaces
- Document naming patterns in runbook descriptions

### Message structure
- **Use clear formatting:** Structure messages with headers, sections, and spacing
- **Include severity indicators:** Use emoji (🔴, ⚠️, ℹ️) or text prefixes (SEV1, SEV2)
- **Link to relevant resources:** Dashboards, runbooks, incident details, monitoring tools
- **Mention appropriate teams:** Use `<!channel>`, `<!here>`, or `<@USER_ID>` for targeted notifications
- **Prioritize readability:** Use Block Kit for complex messages, plain text for simple updates
- **Keep messages concise:** Slack messages should be scannable; avoid large blocks of text

### Block Kit tips
- **Test before deploying:** Always preview Block Kit messages in Slack Block Kit Builder
- **Use Section blocks for primary content:** Main incident information, alerts, announcements
- **Use Context blocks for metadata:** Timestamps, IDs, supplementary instructions
- **Use `fields` for label/value pairs:** Keeps strings short and renders metadata in a tidy two-column grid
- **Add dividers for visual separation:** Break up long messages into logical sections
- **Validate JSON syntax:** Use a JSON validator before saving runbook actions
- **Use `\n` for line breaks:** Only the `\n` escape produces a line break, never a real newline or trailing backslash
- **Limit block count:** Keep messages under 20 blocks for best performance
- **Store templates:** Save common Block Kit patterns as runbook templates for reuse
- **Consider accessibility:** Ensure emoji and formatting convey meaning even without color

### Variable usage
- **Validate variable names:** Ensure custom fields exist before using in messages
- **Use consistent naming:** Match variable names exactly (case-sensitive)
- **Provide context:** Include labels with variables (`*Severity:* {{Activity.severity.id}}`)
- **Test with sample data:** Replace variables with realistic values during testing
- **Handle missing data:** Consider what happens if a custom field is empty

### Permissions
- Use least privilege access: Only grant permissions needed for specific actions
- Regularly audit permissions: Review bot permissions quarterly
- Document access requirements: Maintain list of channels and permissions needed
- Monitor usage patterns: Track message volume and runbook execution frequency
- Rotate credentials: Update OAuth tokens according to security policies

---

## Common use cases

### Incident coordination

**Workflow:**
1. Create incident-specific channel
2. Notify stakeholders with severity and context
3. Share initial assessment and runbook
4. Track response actions in threaded conversations

**Example runbook actions:**

**Action 1: Create channel**
- **Action Type:** Create Slack Channel
- **Channel Name:** `incident-{{Activity.id}}-{{Activity.service}}`
- **Description:** `SEV{{Activity.severity.id}} - {{Activity.title}}`
- **Is Private:** False

**Action 2: Notify team (Block Kit)**
- **Action Type:** Send Slack Message
- **Channel:** `#incidents`
- **Message:**
```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*SEV{{Activity.severity.id}} Incident Detected*"
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*{{Activity.title}}*"
    }
  },
  {
    "type": "section",
    "fields": [
      { "type": "mrkdwn", "text": "*Service:*\n{{Activity.service}}" },
      { "type": "mrkdwn", "text": "*Status:*\n{{Activity.status}}" },
      {
        "type": "mrkdwn",
        "text": "*Channel:*\n<#incident-{{Activity.id}}-{{Activity.service}}>"
      }
    ]
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "Coordinate above | <{{Activity.url}}|Details>"
      }
    ]
  }
]
```

**Rendered output in Slack:**

![Incident coordination team notification rendered in Slack](../static/block-kit-coordination-example.svg)

### Status updates

**Workflow:**
1. Send periodic updates to incident channel
2. Track resolution progress with structured messages
3. Share metrics, graphs, and monitoring links
4. Document action items and next steps

**Example runbook action:**

**Action: Status update (Block Kit)**
- **Action Type:** Send Slack Message
- **Channel:** `#incident-{{Activity.id}}-{{Activity.service}}`
- **Message:**
```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ":information_source: *Status Update*"
    }
  },
  {
    "type": "section",
    "fields": [
      {
        "type": "mrkdwn",
        "text": "*Current Status:*\n{{Activity.status}}"
      },
      {
        "type": "mrkdwn",
        "text": "*Progress:*\n{{Activity.progress_description}}"
      },
      {
        "type": "mrkdwn",
        "text": "*Next Steps:*\n{{Activity.next_steps}}"
      }
    ]
  },
  {
    "type": "divider"
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "Updated by {{Activity.updated_by}} at {{Activity.updated_at}}"
      }
    ]
  }
]
```

**Rendered output in Slack:**

![Incident status update with progress and next steps rendered in Slack](../static/block-kit-status-update-usecase-example.svg)

### Post-incident communication

**Workflow:**
1. Send resolution notification
2. Share incident summary and timeline
3. Schedule retrospective meeting
4. Archive incident channel
5. Document lessons learned

**Example runbook actions:**

**Action 1: Resolution notice (Block Kit)**
- **Action Type:** Send Slack Message
- **Channel:** `#incident-{{Activity.id}}-{{Activity.service}}`
- **Message:**
```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ":white_check_mark: *Incident Resolved*"
    }
  },
  {
    "type": "section",
    "fields": [
      { "type": "mrkdwn", "text": "*Incident:*\n{{Activity.title}}" },
      {
        "type": "mrkdwn",
        "text": "*Duration:*\n{{Activity.duration}}"
      },
      {
        "type": "mrkdwn",
        "text": "*Impact:*\n{{Activity.impact_summary}}"
      }
    ]
  },
  {
    "type": "section",
    "fields": [
      {
        "type": "mrkdwn",
        "text": "*Resolution:*\n{{Activity.resolution_summary}}"
      },
      {
        "type": "mrkdwn",
        "text": "*Root Cause:*\n{{Activity.root_cause}}"
      },
      {
        "type": "mrkdwn",
        "text": "*Retro:*\n{{Activity.retro_date}}"
      }
    ]
  },
  {
    "type": "divider"
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "<{{Activity.postmortem_url}}|Post-Mortem>"
      }
    ]
  }
]
```

**Rendered output in Slack:**

![Post-incident resolution notice with root cause rendered in Slack](../static/block-kit-resolution-usecase-example.svg)

**Action 2: Archive channel**
- **Action Type:** Archive Slack Channel
- **Channel:** `incident-{{Activity.id}}-{{Activity.service}}`

### Maintenance notifications

**Example runbook action:**

**Action: Maintenance alert (Block Kit)**
- **Action Type:** Send Slack Message
- **Channel:** `#engineering`
- **Message:**
```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ":construction: *Scheduled Maintenance*"
    }
  },
  {
    "type": "section",
    "fields": [
      { "type": "mrkdwn", "text": "*Service:*\n{{Activity.service}}" },
      {
        "type": "mrkdwn",
        "text": "*Start Time:*\n{{Activity.maintenance_start}}"
      },
      {
        "type": "mrkdwn",
        "text": "*Duration:*\n{{Activity.maintenance_duration}}"
      },
      {
        "type": "mrkdwn",
        "text": "*Expected Impact:*\n{{Activity.expected_impact}}"
      }
    ]
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "<https://status.example.com|Status page> | <#sre-team>"
      }
    ]
  }
]
```

**Rendered output in Slack:**

![Scheduled maintenance alert rendered in Slack](../static/block-kit-maintenance-example.svg)

---

## Troubleshooting

<Troubleshoot
  issue="A runbook message does not appear in the Slack channel"
  mode="docs"
  fallback="Verify the Slack integration is connected in Organization Settings, confirm the channel name or ID, ensure the Harness bot is added to the channel (private channels require an explicit invite), and confirm the bot has chat:write permission."
/>

<Troubleshoot
  issue="A Block Kit JSON message fails to send from a Slack runbook action"
  mode="docs"
  fallback="Validate the JSON syntax, replace Mustache variables with sample values to confirm the structure, and use the \n escape for line breaks instead of real newlines or trailing backslashes."
/>

<Troubleshoot
  issue="Mustache variables do not render in Slack Block Kit messages"
  mode="docs"
  fallback="Confirm the variable name matches the incident field exactly (case-sensitive), ensure custom fields are populated before the runbook runs, and use the correct {{variable}} syntax."
/>

<Troubleshoot
  issue="A Slack Block Kit message appears but the formatting is wrong"
  mode="docs"
  fallback="Set the text object type to mrkdwn (not plain_text), use the <URL|link text> link syntax, and confirm Section blocks use a text object while Context blocks use an elements array."
/>

<Troubleshoot
  issue="A Slack runbook action fails with an authentication error"
  mode="docs"
  fallback="Verify the OAuth tokens in Organization Settings under Third Party Integrations (AI SRE), confirm the permission scopes and workspace access, and re-authorize the Slack integration if necessary."
/>

<Troubleshoot
  issue="Creating a Slack channel from a runbook fails"
  mode="docs"
  fallback="Confirm the channel name follows Slack naming conventions (lowercase, no spaces, hyphens allowed), check that the workspace channel limit is not reached, and ensure the bot has channels:manage permission."
/>

<Troubleshoot
  issue="A Slack runbook action fails with a rate limit error"
  mode="docs"
  fallback="Add delays between message actions, consolidate multiple messages into a single Block Kit message, and use conditional logic to reduce message frequency."
/>

---

## Quick reference

### Structure comparison

| Feature | Section Block | Context Block |
|---------|--------------|---------------|
| **Text Size** | Standard | Smaller, compact |
| **Text Color** | Black | Gray |
| **Use Case** | Primary content | Supplementary info |
| **Structure** | Single `text` object | Array of `elements` |
| **Markdown** | ✅ Supported | ✅ Supported |

### Common patterns

**Simple alert:**
```json
[
  {
    "type": "section",
    "text": { "type": "mrkdwn", "text": "Alert message" }
  }
]
```

**Alert with metadata:**
```json
[
  {
    "type": "section",
    "text": { "type": "mrkdwn", "text": "Main message" }
  },
  {
    "type": "context",
    "elements": [
      { "type": "mrkdwn", "text": "Metadata" }
    ]
  }
]
```

**Multi-section with divider:**
```json
[
  {
    "type": "section",
    "text": { "type": "mrkdwn", "text": "Section 1" }
  },
  { "type": "divider" },
  {
    "type": "section",
    "text": { "type": "mrkdwn", "text": "Section 2" }
  }
]
```

**Label/value metadata (two-column):**
```json
[
  {
    "type": "section",
    "fields": [
      {"type": "mrkdwn", "text": "*Label A:*\nValue A"},
      {"type": "mrkdwn", "text": "*Label B:*\nValue B"}
    ]
  }
]
```

### Essential variables

These Mustache variables are commonly used in Slack messages:

| Variable | Description | Example Output |
|----------|-------------|----------------|
| `{{Activity.id}}` | Incident ID | `INC-12345` |
| `{{Activity.title}}` | Incident title | `Database Connection Failure` |
| `{{Activity.severity.id}}` | Severity level number | `1`, `2`, `3` |
| `{{Activity.status}}` | Current status | `Investigating`, `Resolved` |
| `{{Activity.service}}` | Affected service | `api-gateway` |

### Slack markdown

| Format | Syntax | Example |
|--------|--------|---------|
| Bold | `*text*` | `*Critical*` |
| Italic | `_text_` | `_investigating_` |
| Strike | `~text~` | `~resolved~` |
| Code | `` `text` `` | `` `error_code` `` |
| Link | `<URL\|text>` | `<https://example.com\|Dashboard>` |
| Mention | `<@USER>` | `<@U12345>` |
| Channel | `<!channel>` | `<!channel>` |

### Resources

Use these Slack references when building Block Kit messages:

- **Slack Block Kit Builder:** [api.slack.com/block-kit/building](https://api.slack.com/block-kit/building)
- **Block Kit Reference:** [api.slack.com/reference/block-kit](https://api.slack.com/reference/block-kit)
- **Slack Markdown Reference:** [api.slack.com/reference/surfaces/formatting](https://api.slack.com/reference/surfaces/formatting)
- **JSON Validator:** [jsonlint.com](https://jsonlint.com)

---

## Next steps

- [Slack Commands](/docs/ai-sre/get-started/slack-commands): Use Slack slash commands for incident management.
- [Microsoft Teams Integration](/docs/ai-sre/runbooks/integrations/collaboration/teams): Set up Microsoft Teams notifications.
- [Zoom Integration](/docs/ai-sre/runbooks/integrations/collaboration/zoom): Create incident war rooms.
- [Create a Runbook](/docs/ai-sre/runbooks/create-runbook): Build automated response workflows.