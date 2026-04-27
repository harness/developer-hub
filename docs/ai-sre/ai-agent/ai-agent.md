---
title: Use AI Scribe Agent
description: Learn about the specialized AI Scribe Agent in Harness AI SRE that automates incident documentation by capturing and organizing communications from Slack, Zoom, and Microsoft Teams.
sidebar_label: Use AI Scribe Agent
sidebar_position: 2
redirect_from:
- /docs/incident-response/ai-ir-agent/ai-agent
---

# Use AI Scribe Agent

:::info What is the AI Scribe Agent?
The AI Scribe Agent is a specialized autonomous component of the Harness AI SRE platform that acts as a virtual scribe during incidents. It automatically documents communications, decisions, and actions across multiple channels to create comprehensive incident records without manual effort. The AI Scribe Agent works in conjunction with the [RCA Change Agent](/docs/ai-sre/ai-agent/rca-change-agent) — the Scribe captures the incident narrative, and the RCA Change Agent uses that structured data to identify root causes and drive corrective action.
:::

The AI Scribe Agent serves as your dedicated incident management specialist, automatically capturing and organizing all incident response activities across communication platforms. 

By monitoring Slack channels, Zoom, and Microsoft Teams meetings, it ensures that no critical information is lost during high-pressure incident response situations.

![AI Scribe Agent timeline](./static/ai-scribe-agent-timeline.png)

## Key Capabilities

The AI Scribe Agent provides these specific autonomous functions:

### Automated Documentation
- **Continuous Recording**: Captures all communications without human intervention
- **Key Event Detection**: Processes transcript chunks through an LLM to identify significant events and adds them as timeline entries. The system focuses on executive-level updates including:
  - Major discoveries about root cause or impact
  - Significant changes in incident scope, severity, or customer impact
  - Key mitigation actions like rollbacks or deployments
  - Important timeline milestones (incident start, resolution, etc.)
  - Deliberately excludes routine activities like creating tickets, standard investigation steps, team coordination, and minor configuration changes

### Communication Analysis
<!-- CHANGED (comment #5): Rewrote "Context Preservation: Maintains the complete narrative of an incident" — this was presenting an implementation detail as a named feature. What actually happens is the agent persists state between invocations and processes messages incrementally. -->
- **Continuity Across the Incident**: The AI Scribe maintains context by tracking conversation state and processing new messages incrementally, ensuring events from early in the incident are available when later messages are analyzed.
- **Timeline Construction**: Creates chronological records of events

## Communication Platform Integrations

### Slack Integration
The AI SRE Scribe Agent actively monitors dedicated incident channels to:
- **Real-time Capture**: Records all conversations as they happen
- **Key Event Detection**: Automatically identifies significant events from conversations and adds them to the timeline (major discoveries, key decisions, mitigation actions)
- **Timeline Construction**: Creates chronological event sequences
- **Manual Action Items**: Action items can be created manually via web UI and Slack commands

### Zoom Integration
<!-- CHANGED (comment #12): Added a note that meeting transcription relies on third-party services (Recall.ai for bot deployment, AssemblyAI for transcription). Customers evaluating data handling and privacy need this information. -->
:::note Third-Party Transcription Services
Zoom meeting transcription uses third-party services. Recall.ai deploys the meeting bot, and AssemblyAI handles audio transcription. Review the data handling and privacy policies for these services when evaluating this feature for your organization.
:::

The AI SRE Scribe Agent joins incident war room meetings to:
- **Meeting Transcription**: Converts spoken discussions into searchable text
- **Key Point Extraction**: Identifies and highlights critical information from transcripts using the same criteria as Slack messages (major discoveries, significant changes, key mitigation actions)
- **Speaker Attribution**: Maintains record of who said what in the transcript
- **Timeline Integration**: Adds significant discussion points to the incident timeline as key events
- **Action Item Detection**: Automatically extracts action items from meeting transcripts where someone explicitly commits to a task, including assignee and due date if mentioned

### Microsoft Teams Integration
<!-- CHANGED (comment #12): Same third-party transcription note applies to Teams. Added equivalent disclosure. -->
:::note Third-Party Transcription Services
Microsoft Teams meeting transcription uses third-party services. Recall.ai deploys the meeting bot, and AssemblyAI handles audio transcription. Review the data handling and privacy policies for these services when evaluating this feature for your organization.
:::

The AI SRE Scribe Agent participates in Teams meetings to:
- **Conversation Monitoring**: Tracks all incident-related discussions
- **Insight Extraction**: Identifies important technical details from transcripts using the same key event detection criteria
- **Speaker Attribution**: Maintains record of who said what in the transcript
- **Timeline Integration**: Adds significant discussion points to the incident timeline as key events
- **Action Item Detection**: Automatically extracts action items from meeting transcripts where someone explicitly commits to a task, including assignee and due date if mentioned

## Automated Documentation Features

### Comprehensive Event Capture
The AI SRE Scribe Agent captures two levels of information:

**Full Transcript** (stored for reference):
- All messages, calls, and meeting transcripts across platforms
- Complete conversation history with timestamps and speaker attribution

**Key Events** (highlighted in timeline):
- Major discoveries about root cause or technical issues
- Significant changes in incident scope, severity, or customer impact
- Key mitigation actions like rollbacks, deployments, or configuration changes
- Important timeline milestones (incident start, resolution, etc.)

The Scribe deliberately focuses key events on executive-level updates, excluding routine activities like ticket creation, standard investigation commands, team coordination logistics, and minor configuration changes. This keeps the timeline focused on what matters for incident understanding and post-incident review.

**Action Items** (automatically detected from meeting transcripts):
- Concrete tasks where someone explicitly committed to doing something
- Assigned person's name (if mentioned in the transcript)
- Due date or deadline (if mentioned)
- Automatically deduplicated to avoid creating the same action item multiple times when mentioned repeatedly

Action items can also be created manually via the web UI or Slack commands.

### Intelligent Timeline Generation

The AI SRE Scribe Agent transforms raw communications into structured incident timelines. Key events are expressed as executive-level status updates. The following examples illustrate how the Scribe interprets messages:

#### Examples of Automated Documentation:

**Recovery Action Detection** (Slack)
```
[14:23 UTC] DevOps Engineer: Database failover completed successfully
```
↓ *AI SRE Scribe adds to timeline as key event:*
```
Database failover completed successfully
```

**Root Cause Discovery** (Zoom transcript)
```
"After reviewing metrics, we've identified a memory leak in the payment service."
```
↓ *AI SRE Scribe adds to timeline as key event:*
```
Memory leak identified in payment service after metric review
```

Note: Key events are concise, executive-level summaries. The complete messages and full context remain available in the conversation transcript.

## Post-Incident Review

<!-- CHANGED (comment #7): This section previously implied post-incident reports were generated automatically on incident close. The PostIncidentReview feature is actually a runbook action — it must be explicitly added to a runbook, configured with a template, and triggered (manually or via an on-close runbook trigger). Rewrote to reflect the actual setup required. -->
Post-incident documentation is generated via the **Post-Incident Review runbook action** — it does not run automatically when an incident closes. To use it:

1. **Add the action to a runbook**: In your runbook configuration, add the Post-Incident Review action.
2. **Configure a template**: Provide the template the action will use to structure the report. The action combines your template with key events and the incident timeline.
3. **Trigger the runbook**: Run the runbook manually at incident close, or configure an on-close runbook trigger to invoke it automatically.

The AI generates the report content — but the setup and trigger are human-configured.

### RCA Change Agent Integration

The timeline and event data produced by the AI Scribe Agent serves as a primary input to the [RCA (Root Cause Analysis) Change Agent](/docs/ai-sre/ai-agent/rca-change-agent). The RCA Change Agent runs in realtime as the incident collects new data, ingesting the Scribe's structured timeline alongside alert and telemetry data to identify causal chains and recommend likely root cause candidates so that engineers can focus on long term remediation.

You can configure an on-close runbook trigger to invoke both the Post-Incident Review action which leverages data collected by the RCA Change Agent, giving you a complete close-of-incident workflow: the Scribe provides the timeline, the Post-Incident Review generates the human-readable report, and the RCA Change Agent produces actionable remediation recommendations.

## Maximizing the AI SRE Scribe Agent

### Optimal Configuration
- **Dedicated Channels**: Create purpose-specific incident channels
- **Early Integration**: Add the AI SRE Scribe Agent at incident creation
- **Naming Conventions**: Use consistent, searchable channel naming
- **Access Management**: Ensure the agent has proper permissions
- **Platform Coverage**: Deploy across all communication platforms

### Communication Best Practices
<!-- CHANGED (comment #16): Reframed the keyword prefix tips. Previously the framing implied the AI requires these cues to function, which undermines the "intelligent" positioning. Changed to present them as tips that help the AI Scribe capture intent accurately — useful guidance without suggesting the NLP falls back to keyword matching. -->
These tips help the AI Scribe capture your intent more accurately. The Scribe uses NLP to interpret messages in context, but clear formatting makes it easier to detect what matters most:
- **Decision Markers**: Prefix key decisions with "DECISION:" to help the Scribe identify them reliably
- **Action Formatting**: Use "ACTION ITEM:" to flag tasks clearly
- **Status Updates**: Structure updates with timestamps and service names
- **Handoff Documentation**: Clearly document shift changes and handoffs
- **Terminology Consistency**: Use standard terms across all communications

### Documentation Review
- **Verification**: Review AI-generated timelines for accuracy
- **Enrichment**: Add business context to technical details
- **Completion Check**: Ensure all critical events are captured
- **Annotation**: Add post-incident insights to the timeline
- **Knowledge Base**: Use documentation for training and process improvement

### AI Scribe Capabilities vs. Human Scribes

<!-- CHANGED (comment #6): Changed "Captures 100% of communications" to an accurate scoped claim. The Scribe does not capture DMs, threads the bot isn't in, side conversations, phone calls, or in-person discussions. "100%" is indefensible. -->

| Aspect | AI Scribe Agent | Human Scribe |
|--------|---------------------|---------------|
| Coverage | Captures all communications in monitored channels and transcribed meetings | May miss details during fast-paced incidents |
| Availability | Always available, no scheduling needed | Requires staffing and scheduling |
| Consistency | Uniform documentation format | Varies by individual |
| Cost | Fixed platform cost | Requires dedicated staff time |

## Getting Started

### Quick Setup
- [Configure Slack Integration](/docs/ai-sre/runbooks/runbook-action-integrations/slack)
- [Set Up Zoom Integration](/docs/ai-sre/runbooks/runbook-action-integrations/zoom)
- [Connect Microsoft Teams](/docs/ai-sre/runbooks/runbook-action-integrations/teams)

### Related Resources
- [Incident Management Overview](/docs/ai-sre/incidents/)
- [Runbook Automation](/docs/ai-sre/runbooks/)
- [Alert Integration](/docs/ai-sre/alerts/integrations)
- [RCA Change Agent](/docs/ai-sre/ai-agent/rca-change-agent)

## Summary

By leveraging the AI Scribe Agent, teams can focus on resolving incidents faster while maintaining comprehensive documentation automatically. This specialized agent handles the documentation burden so your technical teams can concentrate on what matters most: restoring service and resolving customer-impacting issues.