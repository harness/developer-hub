---
title: AI Scribe Agent
description: Learn about the specialized AI Scribe Agent in Harness AI SRE that automates incident documentation by capturing and organizing communications from Slack, Zoom, and Microsoft Teams.
sidebar_label: AI Scribe
sidebar_position: 2
redirect_from:
- /docs/incident-response/ai-ir-agent/ai-agent
---

# AI Scribe Agent

:::info What is the AI Scribe Agent?
The AI Scribe Agent is a specialized autonomous component of the Harness AI SRE platform that acts as a virtual scribe during incidents. It automatically documents communications, decisions, and actions across multiple channels to create comprehensive incident records without manual effort.
:::

The AI Scribe Agent serves as your dedicated incident management specialist, automatically capturing and organizing all incident response activities across communication platforms. By monitoring Slack channels, Zoom, and Microsoft Teams meetings, it ensures that no critical information is lost during high-pressure incident response situations.

## Key Capabilities

The AI Scribe Agent provides these specific autonomous functions:

### 📝 Automated Documentation
- **Continuous Recording**: Captures all communications without human intervention
- **Intelligent Filtering**: Identifies and highlights important information
- **Structured Organization**: Categorizes information by type (decisions, actions, updates)

### 🔍 Communication Analysis
- **Context Preservation**: Maintains the complete narrative of an incident
- **Pattern Recognition**: Identifies recurring issues across incidents
- **Timeline Construction**: Creates chronological records of events

## Communication Platform Integrations

### 💬 Slack Integration
The AI SRE Scribe Agent actively monitors dedicated incident channels to:
- **Real-time Capture**: Records all conversations as they happen
- **Decision Tracking**: Identifies and highlights key decisions with timestamps
- **Action Item Detection**: Automatically flags and categorizes action items
- **Timeline Construction**: Creates chronological event sequences
- **Context Preservation**: Maintains the narrative thread throughout the incident

### 🎥 Zoom Integration
The AI SRE Scribe Agent joins incident war room meetings to:
- **Meeting Transcription**: Converts spoken discussions into searchable text
- **Key Point Extraction**: Identifies and highlights critical information
- **Summary Generation**: Creates concise meeting summaries
- **Speaker Attribution**: Maintains record of who said what
- **Decision Documentation**: Captures decisions made during calls

### 👥 Microsoft Teams Integration
The AI SRE Scribe Agent participates in Teams meetings to:
- **Conversation Monitoring**: Tracks all incident-related discussions
- **Insight Extraction**: Identifies important technical details
- **Meeting Minutes**: Creates structured records of discussions
- **Follow-up Tracking**: Flags items requiring further action
- **Knowledge Preservation**: Ensures critical information isn't lost

## Automated Documentation Features

### 📊 Comprehensive Event Capture
The AI SRE Scribe Agent automatically records and categorizes:
- **Communication Data**: Messages, calls, and meetings across platforms
- **Technical Details**: System states, error messages, and diagnostic information
- **Team Coordination**: Assignments, handoffs, and escalations
- **Resolution Steps**: Actions taken to mitigate and resolve issues
- **Business Impact**: Customer-facing effects and service degradations
- **Post-Incident Tasks**: Follow-up items and preventative measures

### ⏱️ Intelligent Timeline Generation

The AI SRE Scribe Agent transforms raw communications into structured incident narratives:

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

**Action Item Tracking** (Slack)  
```
@sarah can you update the monitoring thresholds for the database connection pool?
```
↓ *AI SRE Scribe processes this as:*
```
15:32 UTC - ACTION ITEM: Update monitoring thresholds for database connection pool (Assigned: Sarah)
```

## Maximizing the AI SRE Scribe Agent

### 🔧 Optimal Configuration
- **Dedicated Channels**: Create purpose-specific incident channels
- **Early Integration**: Add the AI SRE Scribe Agent at incident creation
- **Naming Conventions**: Use consistent, searchable channel naming
- **Access Management**: Ensure the agent has proper permissions
- **Platform Coverage**: Deploy across all communication platforms

### 🗣️ Communication Best Practices
- **Decision Markers**: Prefix key decisions with "DECISION:" for better detection
- **Action Formatting**: Use "ACTION ITEM:" to flag tasks clearly
- **Status Updates**: Structure updates with timestamps and service names
- **Handoff Documentation**: Clearly document shift changes and handoffs
- **Terminology Consistency**: Use standard terms across all communications

### 📝 Documentation Review
- **Verification**: Review AI-generated timelines for accuracy
- **Enrichment**: Add business context to technical details
- **Completion Check**: Ensure all critical events are captured
- **Annotation**: Add post-incident insights to the timeline
- **Knowledge Base**: Use documentation for training and process improvement

### 🤖 AI Scribe Capabilities vs. Human Scribes

| Aspect | AI Scribe Agent | Human Scribe |
|--------|---------------------|---------------|
| Coverage | Captures 100% of communications | May miss details during fast-paced incidents |
| Availability | Always available, no scheduling needed | Requires staffing and scheduling |
| Consistency | Uniform documentation format | Varies by individual |
| Cost | Fixed platform cost | Requires dedicated staff time |
| Analysis | Automatic pattern recognition | Requires manual analysis |

## Getting Started

### 🚀 Quick Setup
- [Configure Slack Integration](/docs/ai-sre/runbooks/integrations/slack)
- [Set Up Zoom Integration](/docs/ai-sre/runbooks/integrations/zoom)
- [Connect Microsoft Teams](/docs/ai-sre/runbooks/integrations/teams)

### 📚 Related Resources
- [Incident Management Overview](/docs/ai-sre/incidents/)
- [Runbook Automation](/docs/ai-sre/runbooks/)
- [Alert Integration](/docs/ai-sre/alerts/integrations)

## Summary

By leveraging the AI Scribe Agent, teams can focus on resolving incidents faster while maintaining comprehensive documentation automatically. This specialized agent handles the documentation burden so your technical teams can concentrate on what matters most: restoring service and resolving customer-impacting issues.
