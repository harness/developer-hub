---
title: Incident Overview
description: Learn about incident management in Harness AI SRE, including incident creation, workflows, and best practices.
sidebar_label: Overview
sidebar_position: 1
redirect_from:
- /docs/incident-response/incidents/incidents
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Incident Management

Harness AI SRE's incident management system provides a comprehensive platform for tracking, coordinating, and resolving service disruptions. From incident creation to resolution, teams can manage the entire incident lifecycle with automated workflows, real-time collaboration, and intelligent response procedures.

## Overview

Incidents in Harness AI SRE help you:
- Create and track service disruptions with standardized incident types
- Coordinate response efforts across teams and stakeholders
- Document incident timelines with automated event tracking
- Execute automated remediation steps through integrated runbooks
- Generate comprehensive post-mortems and action items
- Integrate with monitoring tools for automatic incident creation
- Manage escalation policies and on-call notifications

## Key Features

### Intelligent Incident Creation
- AI-powered problem description analysis and field auto-population
- Multiple creation methods: manual, alert-based, and monitoring integration
- Standardized incident types with pre-configured fields and workflows
- Quick Start functionality for rapid incident creation

### Comprehensive Incident Management
- Real-time incident details page with editable fields
- Timeline tracking with automatic event logging
- Manual key event addition for important milestones
- Status updates and ownership management
- Integration with on-call schedules and escalation policies

### Automated Response Procedures
- Runbook execution directly from incident interface
- Action item creation and assignment with due dates
- Automated workflow triggers based on incident type
- Integration with monitoring tools and alert systems

### Collaboration and Communication
- Timeline-based messaging and updates
- Team notifications and stakeholder communication
- Action item tracking and assignment
- Post-incident analysis and documentation

## Creating an Incident

<Tabs groupId="incident-creation" queryString>
  <TabItem value="interactive-guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/500fd8d9-da9a-42b3-8006-94ecc9d5d8ff?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create an Incident" />

Follow this interactive guide to create and manage incidents with AI-powered assistance and automated workflows.

  </TabItem>
  <TabItem value="step-by-step" label="Step by Step">

### Step 1: Access Incident Creation

1. Navigate to **Incidents** from the left panel
2. Choose your creation method:
   - Click **New Incident** for a blank incident
   - Select an **Incident Type** from the dropdown next to "New Incident" for pre-configured templates

### Step 2: Select Incident Type

1. Choose the appropriate **Incident Type** from the available options
2. This will pre-populate relevant fields and associate appropriate runbooks
3. Incident types ensure consistent data collection and response procedures

### Step 3: Describe the Problem

1. Use the **Quick Start** block to describe the problem
2. Provide a clear, concise description of the issue
3. The AI system will analyze your description and suggest field values
4. Include relevant details like affected services, symptoms, and impact

### Step 4: Generate Incident Fields

1. Click the **up arrow** sign to process your description
2. AI will automatically populate incident fields based on your description
3. The system will suggest appropriate severity, priority, and other relevant fields

### Step 5: Review and Customize

1. Review all auto-generated field values
2. **Manually change** any field values that need adjustment:
   - Title and description
   - Severity and priority levels
   - Add Assignee 
   - Add values to any custom fields added as per the Incident type
3. Click **Save** to create the incident

### Step 6: Manage Incident Details

1. The **Incident Details** page will display with all incident information
2. Use the **pencil icon** to edit individual fields as needed
3. Click **Edit** to modify the **Incident Summary**
4. Click **Save** after making any changes

### Step 7: Add Key Events

1. Click **Add Key Event** to manually document important milestones
2. Type the key event description in the text box
3. Include relevant details about actions taken or status changes
4. Click the **check mark** to save the key event
5. Remember to **Save** from the top right

### Step 8: Monitor Timeline Activity

1. Navigate to the **Timeline** tab
2. View all incident-related activity in chronological order
3. Post messages to the timeline by typing in the text field and pressing Enter
4. All automated actions and manual updates appear here

### Step 9: Execute Runbooks (Optional)

1. Click on the **Runbooks** tab
2. Click **Execute Additional Runbook** to link automated response procedures
3. Select the appropriate runbook from available options
4. Click **Execute** to perform the runbook actions
5. Monitor execution progress and results
6. Click **Close** when execution is completed

### Step 10: Manage Action Items

1. Navigate to the **Action Items** tab
2. Click **Create Action Item** to add follow-up tasks
3. Define the action item with:
   - Clear description of the task
   - **Assignee** responsible for completion
   - **Due date** for completion
4. Click the **check mark** to save the action item
5. Use the **pencil icon** to edit action item status as needed

### Step 11: Finalize and Save

1. Review all incident details, timeline events, and action items
2. Ensure all necessary information is documented
3. Click **Save** to finalize all changes
4. The incident is now ready for ongoing management and resolution

  </TabItem>
</Tabs>

## Best Practices

### Incident Creation and Classification
- **Choose Appropriate Incident Types**: Select the most specific incident type to ensure proper field configuration and runbook association
- **Provide Detailed Descriptions**: Use the Quick Start feature with comprehensive problem descriptions to enable accurate AI field population
- **Verify Auto-Generated Fields**: Always review and adjust AI-suggested field values to ensure accuracy
- **Set Correct Severity Levels**: Align severity with actual business impact and response time requirements

### Incident Response and Management
- **Acknowledge Quickly**: Respond to incidents promptly to minimize impact and meet SLA requirements
- **Assess Impact Thoroughly**: Evaluate affected services, user impact, and business consequences
- **Execute Relevant Runbooks**: Use associated runbooks for standardized response procedures
- **Document All Actions**: Record every action taken in the timeline for audit trails and learning
- **Update Status Regularly**: Keep incident status current to inform stakeholders and trigger appropriate workflows

### Timeline and Event Management
- **Add Key Events**: Document critical milestones, decisions, and turning points in the incident lifecycle
- **Use Timeline Messaging**: Communicate updates and coordination through the incident timeline
- **Maintain Chronological Order**: Ensure all events are properly timestamped and sequenced
- **Include Context**: Provide sufficient detail in timeline entries for future reference and analysis

### Action Item Management
- **Create Specific Action Items**: Define clear, actionable tasks with specific outcomes
- **Assign Ownership**: Ensure every action item has a designated owner and due date
- **Track Progress**: Regularly update action item status and completion
- **Follow Up**: Monitor action items through completion to prevent issues from recurring

### Communication and Collaboration
- **Use Structured Communication**: Follow incident communication templates and standards
- **Update Stakeholders Regularly**: Provide timely updates to affected teams and leadership
- **Leverage Integration Channels**: Use Slack, Teams, or other integrated communication tools
- **Maintain Professional Tone**: Keep all incident communication clear, factual, and professional

### Post-Incident Activities
- **Complete Action Items**: Ensure all follow-up tasks are completed within specified timeframes
- **Conduct Reviews**: Analyze incident response effectiveness and identify improvement opportunities
- **Update Documentation**: Refine runbooks, procedures, and incident types based on lessons learned
- **Share Knowledge**: Communicate insights and improvements with the broader team

## Benefits

- **Streamlined Response**: AI-powered incident creation reduces time to response and improves accuracy
- **Standardized Processes**: Incident types ensure consistent handling across all teams and services
- **Automated Workflows**: Integrated runbooks and action items automate response procedures
- **Complete Visibility**: Timeline tracking and event logging provide full incident lifecycle visibility
- **Enhanced Collaboration**: Built-in communication tools facilitate team coordination and stakeholder updates
- **Continuous Improvement**: Action item tracking and post-incident analysis drive process optimization
- **Integration Ready**: Seamless connection with monitoring tools, alert systems, and communication platforms

## Next Steps

### Getting Started
- [Configure Incident Types](./incident-types.md) to standardize incident classification
- [Set Up Alert Rules](../alerts/alert-rules.md) to automatically create incidents from monitoring alerts
- [Configure On-Call Schedules](../oncall/oncall.md) for proper incident assignment and escalation

### Advanced Configuration
- [Customize Incident Fields](./incident-fields.md) for specialized data collection
- [Set Up Incident Workflows](./incident-workflows.md) for advanced automation
- [Configure Incident Templates](./incident-templates.md) for consistent incident creation
- [Integrate Monitoring Tools](../alerts/integrations.md) for automatic incident generation

### Best Practices Resources
- [AI SRE Best Practices Guide](../resources/ai-sre-best-practices.md)
- [Incident Response Playbooks](../runbooks/create-runbook.md)
- [Team Training and Onboarding](../get-started/onboarding-guide.md)
