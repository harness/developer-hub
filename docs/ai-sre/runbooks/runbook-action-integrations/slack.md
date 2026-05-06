---
title: Slack Integration for Runbooks
sidebar_label: Slack
sidebar_position: 1
description: Learn how to integrate Slack with Harness AI SRE Runbooks for automated incident communication and collaboration.
redirect_from:
- /docs/incident-response/runbooks/integrations/slack
---

import DocImage from '@site/src/components/DocImage';

Harness AI SRE integrates with Slack at the organization level, enabling automated incident communication and team collaboration across all projects.

## Overview

Slack integration enables your runbooks to:
- Send automated notifications
- Create incident-specific channels
- Manage threaded discussions
- Coordinate response teams
- Track incident updates

## Integration Setup

### Prerequisites
- Slack Workspace Admin access
- Harness Organization Admin role

### Setup Steps
1. Navigate to **Organization Settings** → **Third Party Integrations (AI SRE)**
2. Click **Connect** for Slack
3. Follow the OAuth flow to authorize Harness
4. Configure workspace permissions

### Required Slack Permissions
The Harness Slack bot requires these permissions:
- `channels:manage` - Create and manage channels
- `chat:write` - Send messages
- `groups:write` - Manage private channels
- `im:write` - Send direct messages

### Features
- Global Slack workspace access across all projects
- Unified authentication
- Centralized channel management
- Cross-project notifications

## Using Slack Actions in Runbooks

When you add Slack actions to a runbook, you'll configure them through a form-based interface. The specific fields depend on the action type you select.

### Send Slack Message Action

Sends a message to a specified Slack channel.

**Form Fields:**
- **Channel**: Channel name or ID (e.g., `#incidents` or `{{Activity.slack_channel}}`)
- **Message**: Message text to send
  - Supports Mustache variables: `{{Activity.title}}`, `{{Activity.summary}}`
  - Can include Slack markdown formatting (bold, italics, links)
  - Supports Block Kit JSON format for rich message layouts (see Advanced Formatting below)

### Create Slack Channel Action

Creates a new Slack channel for incident coordination.

**Form Fields:**
- **Channel Name**: Name for the new channel (must follow Slack naming rules)
  - Example: `incident-{{Activity.id}}`
- **Description**: Channel topic/description
- **Is Private**: Whether to create a private channel

**Available Mustache Variables:**
- `{{Activity.title}}` - AI SRE incident title
- `{{Activity.id}}` - AI SRE incident ID
- `{{Activity.severity}}` - AI SRE incident severity
- `{{Activity.severity.id}}` - AI SRE incident severity ID (e.g., 1, 2, 3)
- `{{Activity.status}}` - AI SRE incident status
- `{{Activity.summary}}` - AI SRE incident summary
- Any custom incident fields configured in your incident template

## Advanced Message Formatting with Block Kit

Harness AI SRE supports Slack's Block Kit JSON format for rich message layouts. Block Kit allows you to create visually structured messages with different text sizes, colors, and formatting options beyond basic markdown.

### When to Use Block Kit

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

### Block Kit Format Overview

Block Kit messages are defined as JSON arrays containing block objects. Each block has a `type` that determines its appearance and behavior. The Message field in the Send Slack Message action accepts either plain text or Block Kit JSON.

### Section Block (Standard Formatting)

Use Section blocks for standard-sized text with markdown support. This is ideal for primary incident information and announcements.

<DocImage path={require('./static/block-kit-section-example.svg')} width="90%" height="90%" title="Placeholder: Block Kit Section Block Example in Slack" />

**Example: Incident Alert with Severity**

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "<!channel> :rotating_light: *There is a new SEV{{Activity.severity.id}} incident*"
    }
  }
]
```

**Rendered Output:**
- Standard text size
- Full markdown support (bold, italics, links, emoji)
- Black text on white background
- Suitable for primary content

**With Multiple Variables:**

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "<!channel> :rotating_light: *{{Activity.title}}*\n\n*Severity:* SEV{{Activity.severity.id}}\n*Status:* {{Activity.status}}\n*ID:* {{Activity.id}}"
    }
  }
]
```

### Context Block (Compact Formatting)

Use Context blocks for smaller, compact gray text. This is ideal for supplementary information, metadata, or instructions that should be visually de-emphasized.

<DocImage path={require('./static/block-kit-context-example.svg')} width="90%" height="90%" title="Placeholder: Block Kit Context Block Example in Slack" />

**Example: Supplementary Instructions**

```json
[
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "<!channel> :rotating_light: *There is a new SEV{{Activity.severity.id}} incident* – Click *View Summary* above for details (will only be visible to you)."
      }
    ]
  }
]
```

**Rendered Output:**
- Smaller text size
- Gray text color
- Markdown support in each element
- Suitable for secondary information

**Key Difference from Section Block:**
- Context blocks use an `elements` array (can contain multiple text elements)
- Section blocks use a single `text` object
- Context blocks render in a more compact, muted style

### Combining Multiple Blocks

Create rich, multi-section messages by combining block types. Blocks are rendered in array order.

<DocImage path={require('./static/block-kit-combined-blocks.svg')} width="90%" height="90%" title="Placeholder: Combined Block Kit Blocks Example" />

**Example: Incident Notification with Details and Instructions**

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "<!channel> :rotating_light: *New SEV{{Activity.severity.id}} Incident Detected*"
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*Title:* {{Activity.title}}\n*Status:* {{Activity.status}}\n*Summary:* {{Activity.summary}}"
    }
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": ":point_right: View full incident details: <https://app.harness.io/incidents/{{Activity.id}}|Incident {{Activity.id}}>"
      }
    ]
  }
]
```

### Divider Blocks

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

### Markdown Formatting in Block Kit

Within `mrkdwn` text fields, you can use:
- **Bold**: `*text*`
- **Italics**: `_text_`
- **Strikethrough**: `~text~`
- **Code**: `` `code` ``
- **Code block**: `` ```code block``` ``
- **Links**: `<URL|link text>`
- **User mentions**: `<@USER_ID>`
- **Channel mentions**: `<!channel>`, `<!here>`, `<#CHANNEL_ID>`
- **Emoji**: `:emoji_name:`
- **Line breaks**: `\n`

### Variable Interpolation in Block Kit

Mustache variables work seamlessly within Block Kit JSON. Variables are replaced before the JSON is sent to Slack.

**Examples:**
- `{{Activity.severity.id}}` → `1`, `2`, `3`
- `{{Activity.title}}` → `Database Connection Failure`
- `{{Activity.status}}` → `Investigating`, `Resolved`

**Important:** Ensure variable values do not contain characters that would break JSON syntax (quotes, newlines). Variables are automatically escaped.

### Block Kit Templates for Common Scenarios

#### High Severity Incident Alert

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "<!channel> :red_circle: *CRITICAL: SEV{{Activity.severity.id}} Incident*\n\n*{{Activity.title}}*"
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*Status:* {{Activity.status}}\n*Impact:* {{Activity.summary}}"
    }
  },
  {
    "type": "divider"
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "Incident ID: {{Activity.id}} | <https://app.harness.io/incidents/{{Activity.id}}|View Details>"
      }
    ]
  }
]
```

#### Status Update Notification

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
    "text": {
      "type": "mrkdwn",
      "text": "*Incident:* {{Activity.title}}\n*New Status:* {{Activity.status}}"
    }
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "Updated at {{Activity.updated_at}} | SEV{{Activity.severity.id}}"
      }
    ]
  }
]
```

#### Resolution Notification

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
    "text": {
      "type": "mrkdwn",
      "text": "*Incident:* {{Activity.title}}\n*Severity:* SEV{{Activity.severity.id}}\n*Duration:* {{Activity.duration}}"
    }
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "All systems operational | <https://app.harness.io/incidents/{{Activity.id}}/postmortem|View Post-Mortem>"
      }
    ]
  }
]
```

### Block Kit Limitations in AI SRE

When using Block Kit in Harness AI SRE, be aware of these constraints:

- **Block limit**: Slack allows up to 50 blocks per message
- **Text length**: Section and context text fields have a 3,000 character limit
- **JSON validation**: Invalid JSON will cause the action to fail. Validate syntax before deploying.
- **Interactive elements**: While Slack supports buttons and interactive elements in Block Kit, these are not currently interactive when sent from AI SRE runbooks (they are displayed but do not trigger callbacks).
- **Variable escaping**: Mustache variables are automatically escaped, but ensure your incident data does not contain malformed JSON characters.

### Testing Block Kit Messages

Before deploying runbooks with Block Kit messages:

1. **Use Slack's Block Kit Builder**: Test your JSON at [api.slack.com/block-kit](https://api.slack.com/block-kit/building) to preview the rendered output.
2. **Test with static data**: Replace Mustache variables with example values to validate JSON syntax.
3. **Run in a test channel**: Execute the runbook in a non-production Slack channel first.
4. **Verify variable rendering**: Check that all `{{Activity.*}}` variables are replaced correctly in the execution logs.

### Migrating from Plain Text to Block Kit

If you have existing runbooks with plain text messages, you can migrate them to Block Kit:

**Before (Plain Text):**
```
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
      "text": ":warning: *New SEV{{Activity.severity.id}} incident: {{Activity.title}}*\n*Status:* {{Activity.status}}"
    }
  }
]
```

**Benefits:**
- Better visual hierarchy
- Consistent formatting
- Easier to add sections without breaking layout

## Best Practices

### Channel Naming
- Use consistent prefixes: `incident-`, `alert-`, `sev1-`
- Include incident IDs: `incident-{{Activity.id}}-api`
- Keep names descriptive: `sev{{Activity.severity.id}}-{{Activity.service}}`
- Follow workspace conventions: lowercase, hyphens, no spaces
- Document naming patterns in runbook descriptions

### Message Structure
- **Use clear formatting**: Structure messages with headers, sections, and spacing
- **Include severity indicators**: Use emoji (🔴, ⚠️, ℹ️) or text prefixes (SEV1, SEV2)
- **Link to relevant resources**: Dashboards, runbooks, incident details, monitoring tools
- **Mention appropriate teams**: Use `<!channel>`, `<!here>`, or `<@USER_ID>` for targeted notifications
- **Prioritize readability**: Use Block Kit for complex messages, plain text for simple updates
- **Keep messages concise**: Slack messages should be scannable; avoid large blocks of text

### Block Kit Best Practices
- **Test before deploying**: Always preview Block Kit messages in Slack Block Kit Builder
- **Use Section blocks for primary content**: Main incident information, alerts, announcements
- **Use Context blocks for metadata**: Timestamps, IDs, supplementary instructions
- **Add dividers for visual separation**: Break up long messages into logical sections
- **Validate JSON syntax**: Use a JSON validator before saving runbook actions
- **Limit block count**: Keep messages under 20 blocks for best performance
- **Store templates**: Save common Block Kit patterns as runbook templates for reuse
- **Consider accessibility**: Ensure emoji and formatting convey meaning even without color

### Variable Usage
- **Validate variable names**: Ensure custom fields exist before using in messages
- **Use consistent naming**: Match variable names exactly (case-sensitive)
- **Provide context**: Include labels with variables (`*Severity:* {{Activity.severity.id}}`)
- **Test with sample data**: Replace variables with realistic values during testing
- **Handle missing data**: Consider what happens if a custom field is empty

### Permissions
- Use least privilege access: Only grant permissions needed for specific actions
- Regularly audit permissions: Review bot permissions quarterly
- Document access requirements: Maintain list of channels and permissions needed
- Monitor usage patterns: Track message volume and runbook execution frequency
- Rotate credentials: Update OAuth tokens according to security policies

## Common Use Cases

### Incident Coordination

**Workflow:**
1. Create incident-specific channel
2. Notify stakeholders with severity and context
3. Share initial assessment and runbook
4. Track response actions in threaded conversations

**Example Runbook Actions:**

**Action 1: Create Channel**
- **Action Type**: Create Slack Channel
- **Channel Name**: `incident-{{Activity.id}}-{{Activity.service}}`
- **Description**: `SEV{{Activity.severity.id}} - {{Activity.title}}`
- **Is Private**: False

**Action 2: Notify Team (Block Kit)**
- **Action Type**: Send Slack Message
- **Channel**: `#incidents`
- **Message**:
```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "<!channel> :rotating_light: *SEV{{Activity.severity.id}} Incident Detected*\n\n*{{Activity.title}}*"
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*Service:* {{Activity.service}}\n*Status:* {{Activity.status}}\n*Channel:* <#incident-{{Activity.id}}-{{Activity.service}}>"
    }
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "Join <#incident-{{Activity.id}}-{{Activity.service}}> for coordination | <https://app.harness.io/incidents/{{Activity.id}}|View Details>"
      }
    ]
  }
]
```

### Status Updates

**Workflow:**
1. Send periodic updates to incident channel
2. Track resolution progress with structured messages
3. Share metrics, graphs, and monitoring links
4. Document action items and next steps

**Example Runbook Action:**

**Action: Status Update (Block Kit)**
- **Action Type**: Send Slack Message
- **Channel**: `#incident-{{Activity.id}}-{{Activity.service}}`
- **Message**:
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
    "text": {
      "type": "mrkdwn",
      "text": "*Current Status:* {{Activity.status}}\n*Progress:* {{Activity.progress_description}}\n*Next Steps:* {{Activity.next_steps}}"
    }
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

### Post-Incident Communication

**Workflow:**
1. Send resolution notification
2. Share incident summary and timeline
3. Schedule retrospective meeting
4. Archive incident channel
5. Document lessons learned

**Example Runbook Actions:**

**Action 1: Resolution Notice (Block Kit)**
- **Action Type**: Send Slack Message
- **Channel**: `#incident-{{Activity.id}}-{{Activity.service}}`
- **Message**:
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
    "text": {
      "type": "mrkdwn",
      "text": "*Incident:* {{Activity.title}}\n*Duration:* {{Activity.duration}}\n*Impact:* {{Activity.impact_summary}}"
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*Resolution:* {{Activity.resolution_summary}}\n*Root Cause:* {{Activity.root_cause}}"
    }
  },
  {
    "type": "divider"
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "<https://app.harness.io/incidents/{{Activity.id}}/postmortem|View Post-Mortem> | Retrospective scheduled for {{Activity.retro_date}}"
      }
    ]
  }
]
```

**Action 2: Archive Channel**
- **Action Type**: Archive Slack Channel
- **Channel**: `incident-{{Activity.id}}-{{Activity.service}}`

### Scheduled Maintenance Notifications

**Example Runbook Action:**

**Action: Maintenance Alert (Block Kit)**
- **Action Type**: Send Slack Message
- **Channel**: `#engineering`
- **Message**:
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
    "text": {
      "type": "mrkdwn",
      "text": "*Service:* {{Activity.service}}\n*Start Time:* {{Activity.maintenance_start}}\n*Duration:* {{Activity.maintenance_duration}}\n*Expected Impact:* {{Activity.expected_impact}}"
    }
  },
  {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "Status page: <https://status.example.com|status.example.com> | Questions? Ask in <#sre-team>"
      }
    ]
  }
]
```

## Troubleshooting

<details>
<summary><strong>Message does not appear in Slack channel</strong></summary>

**Check the following:**

1. Verify the Slack integration is connected in **Organization Settings**
2. Confirm the channel name or ID is correct
3. Ensure the Harness bot has been added to the channel
4. Check runbook execution logs for error messages
5. Verify the bot has `chat:write` permission

**If using a private channel**, the bot must be explicitly invited to the channel before it can post messages.

</details>

<details>
<summary><strong>Block Kit JSON message fails to send</strong></summary>

**Possible causes:**

- Invalid JSON syntax (missing brackets, commas, quotes)
- Mustache variable rendering breaks JSON structure
- Block type not supported or misspelled
- Text length exceeds 3,000 character limit

**Resolution:**

1. Validate JSON syntax using [jsonlint.com](https://jsonlint.com)
2. Test Block Kit structure in [Slack Block Kit Builder](https://api.slack.com/block-kit/building)
3. Replace Mustache variables with sample values to test JSON validity
4. Check runbook execution logs for specific JSON parsing errors
5. Ensure all text fields use `\n` for line breaks (not actual newlines)

**Common JSON errors:**
```json
❌ Wrong: "text": "Line 1
Line 2"

✅ Correct: "text": "Line 1\nLine 2"
```

</details>

<details>
<summary><strong>Mustache variables do not render in Block Kit messages</strong></summary>

**Possible causes:**

- Variable name is misspelled or does not exist
- Custom incident field is not populated
- Variable syntax is incorrect

**Resolution:**

1. Verify the variable name matches exactly (case-sensitive): `{{Activity.severity.id}}` not `{{activity.severity.id}}`
2. Check that custom incident fields are populated before the runbook executes
3. Use correct Mustache syntax: `{{variable}}` not `{variable}` or `$variable`
4. Test with standard variables first (`{{Activity.id}}`, `{{Activity.title}}`)
5. Review runbook execution logs to see rendered output

</details>

<details>
<summary><strong>Block Kit message appears but formatting is wrong</strong></summary>

**Possible causes:**

- Using wrong block type for desired layout
- Markdown not enabled (`plain_text` instead of `mrkdwn`)
- Emoji codes not recognized by Slack
- Link formatting incorrect

**Resolution:**

1. Ensure `"type": "mrkdwn"` is set in text objects (not `"plain_text"`)
2. Test emoji codes in Slack directly (`:rotating_light:`, `:red_circle:`)
3. Use correct link syntax: `<URL|link text>` not `[link text](URL)`
4. Preview in Block Kit Builder before deploying
5. Check that Section blocks use `text` object, Context blocks use `elements` array

</details>

<details>
<summary><strong>Authentication failures</strong></summary>

**Possible causes:**

- OAuth token expired or revoked
- Slack workspace admin disabled the app
- Bot removed from workspace

**Resolution:**

1. Verify OAuth tokens in **Organization Settings** → **Third Party Integrations (AI SRE)**
2. Check permission scopes match required permissions
3. Confirm workspace access for the authorized user
4. Re-authorize the Slack integration if necessary

</details>

<details>
<summary><strong>Channel creation errors</strong></summary>

**Possible causes:**

- Channel name violates Slack naming conventions
- Workspace channel limit reached
- Bot lacks `channels:manage` permission

**Resolution:**

1. Check naming conventions: lowercase, no spaces, hyphens allowed
2. Verify channel limits in Slack workspace settings
3. Confirm bot has `channels:manage` permission
4. Ensure channel name does not already exist

</details>

<details>
<summary><strong>Rate limit errors</strong></summary>

**Possible causes:**

- Runbook sending too many messages in short period
- Multiple runbooks executing simultaneously
- Slack API rate limits exceeded

**Resolution:**

1. Add delays between message actions in runbook
2. Consolidate multiple messages into single Block Kit message
3. Review Slack API rate limits: [api.slack.com/docs/rate-limits](https://api.slack.com/docs/rate-limits)
4. Implement conditional logic to reduce message frequency

</details>

## Quick Reference

### Block Kit Structure Comparison

| Feature | Section Block | Context Block |
|---------|--------------|---------------|
| **Text Size** | Standard | Smaller, compact |
| **Text Color** | Black | Gray |
| **Use Case** | Primary content | Supplementary info |
| **Structure** | Single `text` object | Array of `elements` |
| **Markdown** | ✅ Supported | ✅ Supported |

### Common Block Kit Patterns

**Simple Alert:**
```json
[{"type": "section", "text": {"type": "mrkdwn", "text": "Alert message"}}]
```

**Alert with Metadata:**
```json
[
  {"type": "section", "text": {"type": "mrkdwn", "text": "Main message"}},
  {"type": "context", "elements": [{"type": "mrkdwn", "text": "Metadata"}]}
]
```

**Multi-Section with Divider:**
```json
[
  {"type": "section", "text": {"type": "mrkdwn", "text": "Section 1"}},
  {"type": "divider"},
  {"type": "section", "text": {"type": "mrkdwn", "text": "Section 2"}}
]
```

### Essential Variables

| Variable | Description | Example Output |
|----------|-------------|----------------|
| `{{Activity.id}}` | Incident ID | `INC-12345` |
| `{{Activity.title}}` | Incident title | `Database Connection Failure` |
| `{{Activity.severity.id}}` | Severity level number | `1`, `2`, `3` |
| `{{Activity.status}}` | Current status | `Investigating`, `Resolved` |
| `{{Activity.service}}` | Affected service | `api-gateway` |

### Useful Slack Markdown

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

- **Slack Block Kit Builder**: [api.slack.com/block-kit/building](https://api.slack.com/block-kit/building)
- **Block Kit Reference**: [api.slack.com/reference/block-kit](https://api.slack.com/reference/block-kit)
- **Slack Markdown Reference**: [api.slack.com/reference/surfaces/formatting](https://api.slack.com/reference/surfaces/formatting)
- **JSON Validator**: [jsonlint.com](https://jsonlint.com)

## Next Steps

- Go to [Slack Commands](/docs/ai-sre/get-started/slack-commands) to learn about Slack slash commands for incident management.
- Go to [Configure Microsoft Teams Integration](./teams.md) to set up Microsoft Teams notifications.
- Go to [Configure Zoom Integration](./zoom.md) to create incident war rooms.
- Go to [Create a Runbook](../create-runbook) to build automated response workflows.
