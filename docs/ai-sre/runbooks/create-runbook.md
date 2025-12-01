---
title: Create a Runbook
sidebar_label: Create a Runbook
sidebar_position: 2
description: Comprehensive guide on creating, configuring, and deploying automated runbooks in Harness AI SRE for incident response and operational workflows.
redirect_from:
- /docs/incident-response/runbooks/create-runbook
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a Runbook

Runbooks in Harness AI SRE enable you to automate incident response workflows, operational procedures, and remediation actions. This comprehensive guide walks you through creating, configuring, and deploying effective runbooks that can significantly reduce mean time to resolution (MTTR) and improve your team's operational efficiency.

## Before You Begin

### Prerequisites
Ensure you have the following before creating your first runbook:

- **Platform Access**: Active Harness AI SRE account with appropriate permissions.
- **User Permissions**: Required Account, Organisation and Project level permissions.
- **Integration Access**: Configured integrations for the tools you plan to use (Slack, Jira, ServiceNow, etc.).
- **Monitoring Setup**: Alert sources configured (Datadog, New Relic, PagerDuty, etc.).

### Key Concepts
Before diving into runbook creation, familiarize yourself with these core concepts:

- **Actions**: Individual tasks or operations within a runbook (notifications, API calls, pipeline executions).
- **Triggers**: Conditions that automatically initiate runbook execution.
- **Variables**: Dynamic values that can be passed between actions and customized per execution.
- **Sequences**: The order in which actions are executed within your workflow.

## Creating Your Runbook

<Tabs groupId="runbook-creation" queryString>
  <TabItem value="interactive-guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/f23544ee-c6cb-4a81-85b2-51fd968eae9d?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create a Runbook" />

Follow this interactive guide to create automated runbooks with actions, workflows, and integrations.

  </TabItem>
  <TabItem value="step-by-step" label="Step by Step">

### Step 1: Access Runbooks

1. Click on **Runbooks** from the left panel in your Harness AI SRE platform
2. This will take you to the runbooks management interface

### Step 2: Create New Runbook

1. Click **New Runbook** to start creating your automated workflow
2. This opens the runbook creation interface

### Step 3: Configure Basic Details

1. Fill in the essential details for your runbook:
   - **Name**: Use a descriptive name (e.g., "High CPU Alert Response", "Database Connection Recovery")
   - **Description**: Clearly explain the runbook's purpose and when it should be used
2. Provide clear, meaningful information that helps team members understand the runbook's function

<DocImage path={require('./static/create-runbook.png')} width="90%" height="90%" title="Create New Runbook Interface" />

### Step 4: Save Initial Configuration

1. Click **Save** to create the basic runbook structure
2. This establishes your runbook and opens the workflow designer

### Step 5: Add Your First Action

1. Click **New Action** to add steps to your runbook workflow
2. This opens the action selection interface where you can choose from various automation categories

### Step 6: Explore Action Categories

1. The **left panel** displays different action categories:
   - **Communication**: Slack, MS Teams, Zoom, and Email
   - **Harness**: Pipeline execution, feature flags, deployments
   - **Ticketing**: Jira, ServiceNow 
   - **Change**: GitHub pull requests, code changes
   - **Alerting and On-Call**: OpsGenie, PagerDuty
   - **Lifecycle**: Key events, managing incident timeline, resolving alerts, and closing incidents

2. Browse through categories to find the appropriate action for your workflow

### Step 7: Select and Configure Action

1. **Choose any action** from the available list in your selected category
2. Click **Select** to add the action to your workflow
3. Each action will have specific configuration requirements based on its functionality

<DocImage path={require('./static/add-action.png')} width="90%" height="90%" title="Adding Actions to Runbook Workflow" />

### Step 8: Configure Input/Output Context 

You can configure the context to determine which fields will be available in the data picker when setting up action parameters:

1. **Select Context Type**: Choose the Incident or Alert Context (Any/No/Custom) based on your runbook's purpose
2. **Choose Specific Type**: For Custom Incident or Alert Context:
   - Select the appropriate **Incident Type** from the dropdown for incident-based runbooks
   - Select the appropriate **Alert Type** from the dropdown for alert-based runbooks
3. **Field Availability Impact**:
   - **Basic Context (Any/No)**: Data picker shows only standard incident/alert fields
   - **Specific Incident Type**: Data picker displays both basic fields AND custom fields defined for that incident type
   - **Specific Alert Type**: Data picker displays both basic fields AND custom fields defined for that alert type

<DocImage path={require('./static/custom-incident-type.png')} width="90%" height="90%" title="Defining Custom Incident Type" />

<DocImage path={require('./static/custom-alert-type.png')} width="90%" height="90%" title="Defining Custom Alert Type" />

**Why This Matters**: The context selection directly affects what data will be available when configuring your action parameters. Choosing a specific incident type ensures you have access to all custom fields defined for that type, making your runbook more powerful and context-aware.

#### Variable Configuration Details

When configuring Input/Output context, you can also define custom variables:

- **Input Variables**: Values provided when the runbook is triggered, must be defined based on the incident or alert context
- **Output Variables**: Results from action executions, must be defined based on the action execution
- **Required Fields**: Name, Display Name, Description, Type, and Default Value
- **Data Types**: String, Integer, Number, Boolean, Object, or Array
- **Requirement Level**: Variables can be defined as required or optional based on the use case

<DocImage path={require('./static/workflow-variables.png')} width="90%" height="90%" title="Defining Workflow Variables" />

#### Dynamic Parameter Sources Available

Once context is configured, the data picker will provide access to multiple dynamic data sources:

- **Runbook Inputs**: Variables defined in the Input/Output section
- **Action Outputs**: Results from previously executed actions  
- **Pipeline Outputs**: Data from Harness pipeline executions
- **Global Variables**: System-wide variables available to all runbooks
- **Key Events**: Event-driven data that can trigger specific behaviors

<DocImage path={require('./static/dynamic-parameter-selection.png')} width="90%" height="90%" title="Selecting Dynamic Parameter Sources" />

#### Key Event Integration Setup

For event-driven runbooks, you can configure Key Events directly:

1. **Select Key Event as Source**: When configuring an action parameter, choose "Key Event" as the data source
2. **Create Input and Set Value**: Create inputs directly without navigating to Input/Output section:
   - Click "Create Input and Set Value"
   - Provide a Display Name, Type, and Default Value
   - Save the new input variable
   - Select the Key Event text from the input dropdown

<DocImage path={require('./static/key-event-integration.png')} width="90%" height="90%" title="Key Event Integration" />

<DocImage path={require('./static/key-event-dynamic-input.png')} width="90%" height="90%" title="Key Event Dynamic Input" />

### Step 9: Configure Action Parameters

1. Click on the **Data picker** to fill in values for the action's input fields
2. The data picker will now show fields based on your Input/Output context selection:
   - **Basic fields** (always available): Standard incident/alert properties
   - **Custom fields** (if specific type selected): Additional fields defined for your chosen incident/alert type
3. Configure parameters specific to your chosen action:
   - **Static Values**: Enter fixed values for consistent behavior
   - **Dynamic Values**: Use variables for flexible, context-aware execution

<DocImage path={require('./static/configure-parameters.png')} width="90%" height="90%" title="Configuring Action Parameters" />

### Step 10: Use Dynamic Data Sources

1. Select from available data source options (now configured in Step 8):
   - **Runbook Input**: Variables defined for the runbook
   - **Action Outputs**: Results from previously executed actions
   - **Pipeline Outputs**: Data from Harness pipeline executions
   - **Global Values**: System-wide variables available to all runbooks
2. Choose the appropriate data source based on your workflow requirements

### Step 11: Build Complete Workflow

1. Click **New Action** to add more steps based on your workflow needs
2. Click **Action** to access the action library again
3. Click **Select** for each action you want to add
4. **Repeat the configuration process** for each action:
   - Configure parameters
   - Set up data sources
   - Define action sequences
5. Arrange actions in logical order for effective execution

<DocImage path={require('./static/action-sequences.png')} width="90%" height="90%" title="Configuring Action Execution Sequences" />

**Best Practices for Action Sequencing:**
- **Immediate Response**: Start with critical notifications and incident creation
- **Information Gathering**: Follow with diagnostic and monitoring actions
- **Remediation**: Execute fix actions based on gathered information
- **Validation**: Verify that remediation was successful
- **Closure**: Update stakeholders and close incidents

### Step 12: Save Your Runbook

1. Click **Save** from the top right corner to finalize your runbook configuration
2. Your runbook is now ready for testing and deployment
3. All configured actions and workflows are preserved for future execution

  </TabItem>
</Tabs>

## Advanced Configuration

### Trigger Configuration with Key Events

Once Key Events are configured in your action parameters (as covered in Step 8):

1. **Set Trigger Condition**: In the Triggers section, set the condition to "Key Event Created"
2. **Map Event to Input**: The input field that was configured with the Key Event text can now be automatically populated when the trigger fires
3. **Dynamic Execution**: When the specified Key Event occurs, the runbook will execute with the event data automatically mapped to your configured inputs

<DocImage path={require('./static/key-event-trigger.png')} width="90%" height="90%" title="Configuring Key Event Triggers" />

This approach allows for seamless integration between event detection and automated response, without requiring manual configuration of input variables for each execution.

## Available Actions and Integrations

Harness AI SRE provides a comprehensive library of pre-built actions across multiple categories. Choose the right combination of actions to build effective automation workflows.

### Communication & Collaboration Tools
Establish immediate communication channels and keep stakeholders informed throughout incident resolution.

#### **[Slack Integration](./integrations/slack.md)**
- **Send Notifications**: Broadcast alerts to channels or direct messages.
- **Create Channels**: Automatically create incident-specific channels.
- **Start Threads**: Organize discussions and updates.
- **Add Members**: Add members to the channel.
- **Archive Channels**: Clean up after incident resolution.

#### **[Microsoft Teams Integration](./integrations/teams.md)**
- **Send Messages**: Send alerts to specific teams or channels.
- **Create Meetings**: Automatically create Teams meeting, optionally attaching an AI transcription bot.

#### **[Zoom Integration](./integrations/zoom.md)**
- **Create Meetings**: Instantly set up incident response calls, optionally attaching an AI transcription bot.
- **End Meetings**: End an active Zoom meeting.


### Incident Response & Ticketing Systems
Automate incident tracking, assignment, and resolution workflows across your preferred ticketing platforms.

#### **[Jira Integration](./integrations/jira.md)**
- **Issue Creation**: Automatically create tickets with relevant context.
- **Status Updates**: Progress incidents through workflow states.
- **Update Tickets**: Updates an existing Jira issue's summary, description, issue type, or adds a comment with relevant context.

#### **[ServiceNow Integration](./integrations/servicenow.md)**
- **Incident Management**: Create and manage ServiceNow incidents.
- **Change Requests**: Initiate emergency or standard changes.
- **Update Incidents**: Updates an existing ServiceNow incident's summary, description, issue type, or adds a comment with relevant context.


### Automation & Pipeline Execution
Execute remediation actions, deploy fixes, and trigger operational workflows.

#### **[Harness Pipelines Integration](./integrations/harness-pipelines.md)**
- **Pipeline Execution**: Trigger deployment or remediation pipeline.
- **Feature Flag Management**: Deploy specific versions or rollback changes.
- **Environment Management**: Manage infrastructure scaling or configuration.


## Configure Triggers

Triggers determine when and how your runbooks execute automatically. Proper trigger configuration ensures your runbooks respond to the right conditions at the right time.

### Setting Up Triggers
1. **Access Trigger Configuration**: Click the **Triggers** tab in your runbook editor.
2. **Add Trigger**: Click **+ New Trigger** to begin the trigger setup process.
3. **Choose Trigger Template**: Select the type from available templates.
4. **Define Conditions**: Set specific conditions for runbook activation based on the frequency of events or changes to specific resources.
5. **Test Triggers**: Validate trigger logic before deployment.

:::info
**Note**: A user can add more than one trigger to a runbook based on the use case.
:::

<DocImage path={require('./static/trigger-configuration.png')} width="95%" height="95%" title="Configuring Runbook Triggers" />


### Trigger Configuration Best Practices
- **Avoid Trigger Overlap**: Ensure multiple runbooks don't trigger simultaneously for the same event.
- **Use Appropriate Delays**: Add delays between related triggers to prevent conflicts.
- **Test Thoroughly**: Validate trigger conditions in non-production environments.
- **Monitor Execution**: Track trigger effectiveness and adjust conditions as needed.

## Test Your Runbook

Thorough testing is essential before deploying runbooks to production. A well-tested runbook prevents failures during critical incidents and ensures reliable automation.

### Testing Steps
1. **Select an Alert or Incident**: Go to **AI SRE** → **Alerts** or **Incidents** in your Harness platform, then select the alert or incident you want to test.
2. **Select a Runbook**: Click the **Runbooks** tab and select the runbook you want to test.
3. **Execute Runbook**: In case of no associated runbooks, click **Execute Runbook** to begin the testing process.
4. **Test Runbook**: Click **Execute** to begin the testing process.

<DocImage path={require('./static/test-runbook.png')} width="95%" height="95%" title="Testing Runbook Functionality" />

### Pre-Production Testing
#### **1. Environment Preparation**
- **Test Environment**: Set up a dedicated testing environment that mirrors production.
- **Test Data**: Prepare realistic test scenarios and data sets.
- **Integration Sandboxes**: Use test instances of integrated tools (Slack, Jira, etc.).
- **Mock Services**: Create mock endpoints for external dependencies.

#### **2. Functional Testing**
- **Action Validation**: Verify each action executes correctly with expected parameters.
- **Sequence Testing**: Confirm actions execute in the correct order.
- **Variable Passing**: Validate that variables are correctly passed between actions.
- **Error Handling**: Test failure scenarios and error recovery mechanisms.

#### **3. Integration Testing**
- **Notification Delivery**: Confirm all notifications reach intended recipients.
- **Pipeline Executions**: Verify that triggered pipelines complete successfully.
- **API Responses**: Check that external API calls return expected results.
- **Authentication**: Ensure all integrations authenticate properly.

#### **4. End-to-End Testing**
- **Complete Workflows**: Execute full runbook scenarios from trigger to completion.
- **Multiple Scenarios**: Test various input combinations and edge cases.
- **Performance Testing**: Measure execution times and resource usage.
- **Concurrent Execution**: Test behavior when multiple instances run simultaneously.

### Testing Checklist
- [ ] All actions execute without errors.
- [ ] Notifications are delivered to correct channels/recipients.
- [ ] Variables are properly populated and passed.
- [ ] External integrations respond as expected.
- [ ] Error conditions are handled gracefully.
- [ ] Execution logs provide sufficient detail for troubleshooting.
- [ ] Performance meets acceptable thresholds.
- [ ] Security permissions are correctly enforced.

## Deploy and Monitor

Once testing is complete, deploy your runbook to production and establish monitoring to ensure continued effectiveness.

### Deployment Process
1. **Final Review**: Conduct a final review of runbook configuration and testing results.
2. **Stakeholder Approval**: Obtain necessary approvals from the team.
3. **Production Deployment**: Activate the runbook in your production environment.
4. **Documentation Update**: Update operational documentation with runbook details.


## Best Practices for Runbook Creation

### Design Principles
- **Start Simple**: Begin with basic workflows and gradually add complexity as you gain experience.
- **Modular Design**: Create reusable actions and workflows that can be combined for different scenarios.
- **Clear Naming**: Use descriptive names for runbooks, actions, and variables that clearly indicate their purpose.


### Operational Excellence
- **Regular Updates**: Review and update runbooks regularly to reflect changes in infrastructure and processes.
- **Timeout Configuration**: Set appropriate timeouts to prevent runbooks from hanging indefinitely.
- **Conditional Logic**: Use conditional statements to avoid unnecessary action execution.


## Troubleshooting Common Issues

### Execution Failures
#### Problem: Runbook actions fail to execute
- **Solution**: Check integration credentials and network connectivity.
- **Prevention**: Implement health checks and credential rotation.

#### Problem: Variables not passing between actions
- **Solution**: Verify variable names and data types match expectations.
- **Prevention**: Use consistent naming conventions and validate variable mappings.

### Performance Issues
#### Problem: Runbooks execute slowly
- **Solution**: Optimize action sequences and enable parallel execution where possible.
- **Prevention**: Regular performance testing and monitoring.


## Next Steps

### Advanced Configuration
- **[Configure Authentication](./configure-authentication.md)**: Set up secure access to integrated tools and services.
- **[Configure Incident Fields](./configure-incident-fields.md)**: Customize incident data collection and processing.
- **[Return to Overview](./runbooks.md)**: Explore additional runbook capabilities and features.

### Integration Setup Guides
#### Communication & Collaboration
- **[Slack Integration](./integrations/slack.md)**: Complete setup guide for Slack automation.
- **[Microsoft Teams Integration](./integrations/teams.md)**: Configure Teams notifications and collaboration.
- **[Zoom Integration](./integrations/zoom.md)**: Set up automated meeting creation and management.

#### Incident Management
- **[Jira Integration](./integrations/jira.md)**: Automate issue tracking and project management.
- **[ServiceNow Integration](./integrations/servicenow.md)**: Integrate with enterprise service management.

#### Automation & Pipelines
- **[Harness Pipelines Integration](./integrations/harness-pipelines.md)**: Execute deployment and remediation pipelines.

---

:::info
**Need Help?** Contact our support team or visit the [Harness Documentation](https://docs.harness.io) for additional resources and troubleshooting guides.
:::
