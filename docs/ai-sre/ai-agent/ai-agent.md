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
The AI Scribe Agent is a specialized autonomous component of the Harness AI SRE platform that acts as a virtual scribe during incidents. It automatically documents communications, decisions, and actions across multiple channels to create comprehensive incident records without manual effort.
:::

The AI Scribe Agent serves as your dedicated incident management specialist, automatically capturing and organizing all incident response activities across communication platforms. By monitoring Slack channels, Zoom, and Microsoft Teams meetings, it ensures that no critical information is lost during high-pressure incident response situations.

## Key Capabilities

The AI Scribe Agent provides these specific autonomous functions:

### Automated Documentation
<!-- CHANGED (comment #8): Removed "Intelligent Filtering: Identifies and highlights important information" as a standalone bullet. The underlying feature is real (key event detection via LLM), but "Intelligent Filtering" implied a comprehensive categorization system. Replaced with a concrete description of what actually happens: transcript chunks are processed by an LLM to detect key events, which become timeline entries. -->
- **Continuous Recording**: Captures all communications without human intervention
- **Key Event Detection**: Processes transcript chunks through an LLM to identify notable events (decisions, status changes, actions) and adds them as timeline entries
<!-- CHANGED (comment #8): Removed "Structured Organization: Categorizes information by type (decisions, actions, updates)" for the same reason — the example taxonomy in the doc (STATUS_UPDATE, ROOT CAUSE IDENTIFIED, etc.) appeared illustrative rather than reflecting actual output labels from the code. -->

### Communication Analysis
<!-- CHANGED (comment #5): Rewrote "Context Preservation: Maintains the complete narrative of an incident" — this was presenting an implementation detail as a named feature. What actually happens is the agent persists state between invocations and processes messages incrementally. -->
- **Continuity Across the Incident**: The AI Scribe maintains context by tracking conversation state and processing new messages incrementally, ensuring events from early in the incident are available when later messages are analyzed.
- **Timeline Construction**: Creates chronological records of events

## Communication Platform Integrations

### Slack Integration
The AI SRE Scribe Agent actively monitors dedicated incident channels to:
- **Real-time Capture**: Records all conversations as they happen
- **Decision Tracking**: Identifies and highlights key decisions with timestamps
- **Action Item Detection**: Manually created via web UI and Slack commands
- **Timeline Construction**: Creates chronological event sequences
<!-- CHANGED (comment #5): Removed "Context Preservation: Maintains the narrative thread throughout the incident" as a standalone bullet here, consistent with the rewrite in Key Capabilities above. The behavior is real but should not be presented as a discrete named feature. -->

### Zoom Integration
<!-- CHANGED (comment #12): Added a note that meeting transcription relies on third-party services (Recall.ai for bot deployment, AssemblyAI for transcription). Customers evaluating data handling and privacy need this information. -->
:::note Third-Party Transcription Services
Zoom meeting transcription uses third-party services. Recall.ai deploys the meeting bot, and AssemblyAI handles audio transcription. Review the data handling and privacy policies for these services when evaluating this feature for your organization.
:::

The AI SRE Scribe Agent joins incident war room meetings to:
- **Meeting Transcription**: Converts spoken discussions into searchable text
- **Key Point Extraction**: Identifies and highlights critical information
- **Summary Generation**: Creates concise meeting summaries
- **Speaker Attribution**: Maintains record of who said what
- **Decision Documentation**: Captures decisions made during calls

### Microsoft Teams Integration
<!-- CHANGED (comment #12): Same third-party transcription note applies to Teams. Added equivalent disclosure. -->
:::note Third-Party Transcription Services
Microsoft Teams meeting transcription uses third-party services. Recall.ai deploys the meeting bot, and AssemblyAI handles audio transcription. Review the data handling and privacy policies for these services when evaluating this feature for your organization.
:::

The AI SRE Scribe Agent participates in Teams meetings to:
- **Conversation Monitoring**: Tracks all incident-related discussions
- **Insight Extraction**: Identifies important technical details
- **Meeting Minutes**: Creates structured records of discussions
- **Follow-up Tracking**: Flags items requiring further action
<!-- CHANGED (comment #5): Removed "Knowledge Preservation: Ensures critical information isn't lost" — this was a restatement of "Context Preservation" and similarly described an implementation detail as a named feature. -->

## Automated Documentation Features

### Comprehensive Event Capture
The AI SRE Scribe Agent automatically records and categorizes:
- **Communication Data**: Messages, calls, and meetings across platforms
- **Technical Details**: System states, error messages, and diagnostic information
- **Team Coordination**: Assignments, handoffs, and escalations
- **Resolution Steps**: Actions taken to mitigate and resolve issues
- **Business Impact**: Customer-facing effects and service degradations
- **Post-Incident Tasks**: Follow-up items and preventative measures

### Intelligent Timeline Generation

<!-- CHANGED (comment #8): Softened the framing around the documentation examples. The category labels shown (RECOVERY ACTION, ROOT CAUSE IDENTIFIED) are illustrative of the kind of information the LLM extracts — the actual output format may vary. Added a clarifying note so users don't treat these as fixed output strings. -->
The AI SRE Scribe Agent transforms raw communications into structured incident timelines. The following examples illustrate how the Scribe interprets messages — actual output labels may vary:

#### Examples of Automated Documentation:

**Status Update Detection** (Slack)  
```
[14:23 UTC] DevOps Engineer: Database failover completed successfully
```
↓ *AI SRE Scribe processes this as:*
```
14:23 UTC - RECOVERY ACTION: Database failover completed successfully
```

**Technical Decision Capture** (Zoom)  
```
"After reviewing metrics, we've identified a memory leak in the payment service."
```
↓ *AI SRE Scribe processes this as:*
```
15:07 UTC - ROOT CAUSE IDENTIFIED: Memory leak detected in payment service
```

## Post-Incident Review

<!-- CHANGED (comment #7): This section previously implied post-incident reports were generated automatically on incident close. The PostIncidentReview feature is actually a runbook action — it must be explicitly added to a runbook, configured with a template, and triggered (manually or via an on-close runbook trigger). Rewrote to reflect the actual setup required. -->
Post-incident documentation is generated via the **Post-Incident Review runbook action** — it does not run automatically when an incident closes. To use it:

1. **Add the action to a runbook**: In your runbook configuration, add the Post-Incident Review action.
2. **Configure a template**: Provide the template the action will use to structure the report. The action combines your template with key events and the incident timeline.
3. **Trigger the runbook**: Run the runbook manually at incident close, or configure an on-close runbook trigger to invoke it automatically.

The AI generates the report content — but the setup and trigger are human-configured.

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

| Aspect | AI Scribe Agent | Human Scribe |
|--------|---------------------|---------------|
<!-- CHANGED (comment #6): Changed "Captures 100% of communications" to an accurate scoped claim. The Scribe does not capture DMs, threads the bot isn't in, side conversations, phone calls, or in-person discussions. "100%" is indefensible. -->
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

## Summary

By leveraging the AI Scribe Agent, teams can focus on resolving incidents faster while maintaining comprehensive documentation automatically. This specialized agent handles the documentation burden so your technical teams can concentrate on what matters most: restoring service and resolving customer-impacting issues.