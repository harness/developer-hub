---
title: AI Incident Response Agent
description: Learn about the AI Incident Response Agent in Harness IR and how it helps with incident summarization and documentation.
sidebar_label: AI Agent
sidebar_position: 2
---

# AI Incident Response Agent

The AI Incident Response Agent helps teams capture and summarize key events during incidents by analyzing communication channels and providing real-time documentation.

## Overview

The AI Agent serves as an automated incident scribe that:
- Monitors incident communications
- Extracts key events and decisions
- Provides real-time summaries
- Maintains incident timelines
- Suggests next actions

## Communication Analysis

### Slack Integration
```yaml
slack_analysis:
  capabilities:
    - Monitor incident channels
    - Extract key decisions
    - Capture action items
    - Document timeline events
    - Summarize discussions
```

### Microsoft Teams Integration
```yaml
teams_analysis:
  capabilities:
    - Track incident threads
    - Identify important updates
    - Document team decisions
    - Capture next steps
    - Generate meeting summaries
```

## Real-time Documentation

### Event Capture
The AI Agent automatically identifies and documents:
- Status changes
- Action items taken
- Team decisions
- Technical findings
- Follow-up tasks

### Timeline Generation
```yaml
timeline_events:
  - type: "status_update"
    source: "slack"
    content: "Database failover completed"
  - type: "decision"
    source: "teams"
    content: "Team decided to roll back deployment"
  - type: "action_item"
    source: "slack"
    content: "Update monitoring thresholds"
```

## AI Controls

### Basic Settings
```yaml
ai_settings:
  channels:
    - "#incident-[service]"
    - "incident-bridge-[id]"
  summarization:
    frequency: 15m
    format: "bullet_points"
  notifications:
    enabled: true
    channel: "#incident-summary"
```

### Customization
```yaml
customization:
  highlight_keywords:
    - "decided"
    - "agreed"
    - "action item"
    - "follow up"
  ignore_patterns:
    - "reacted with"
    - "joined channel"
```

## Best Practices

### Channel Setup
- Create dedicated incident channels
- Add AI agent at channel creation
- Use consistent channel naming
- Keep discussions focused

### Communication
- Use clear language
- Mark important decisions
- Flag action items
- Update status clearly
- Document next steps

### Documentation
- Review AI summaries
- Verify captured events
- Add missing context
- Correct any errors
- Save key findings

## Next Steps

### Documentation
- [Incident Management](../incidents/incidents.md)
- [Configure Integrations](../incidents/incident-integrations.md)

### Related Topics
- [Slack Integration](../runbooks/integrations/slack.md)
- [Teams Integration](../runbooks/integrations/teams.md)
