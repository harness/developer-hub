---
title: Create a Runbook
sidebar_label: Create a Runbook
sidebar_position: 2
description: Comprehensive guide on creating, configuring, and deploying automated runbooks in Harness AI SRE for incident response and operational workflows.
redirect_from:
- /docs/incident-response/runbooks/create-runbook
---

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

## Step 1: Initialize Your Runbook

### Create a New Runbook
1. **Navigate to Runbooks**: Go to **AI SRE** → **Runbooks** in your Harness platform
2. **Start Creation**: Click **+ New Runbook** to begin the creation process
3. **Basic Information**: Provide essential details for your runbook:
   - **Name**: Use a descriptive name (e.g., "High CPU Alert Response", "Database Connection Recovery").
   - **Description**: Clearly explain the runbook's purpose and when it should be used.

<DocImage path={require('./static/create-runbook.png')} width="90%" height="90%" title="Create New Runbook Interface" />

### Design Your Workflow
Once your runbook is created, you'll enter the workflow designer where you can build your automation sequence.

#### 1. Add Actions to Your Workflow
Actions are the building blocks of your runbook. Each action performs a specific task in your incident response or operational workflow.

**Common Action Types:**
- **Communication**: Send notifications, create Slack channels, start Zoom or Microsoft Teams meetings.
- **Harness**: Execute pipelines, run scripts, trigger deployments, or add a feature flag.
- **Ticketing**: Create Jira or ServiceNow incident tickets, update status, assign teams, or update incident tickets.
- **Change**: Manage GitHub pull requests, create or revert changes.
- **Custom**: Build your own actions using custom HTTP actions or custom scripts.

<DocImage path={require('./static/add-action.png')} width="90%" height="90%" title="Adding Actions to Runbook Workflow" />

#### 2. Configure Action Parameters
Each action requires specific configuration to function correctly. Parameters vary by action type but typically include:

**Example: Slack Channel Creation**
- **Channel Name**: Use variables like `${incident.id}` for dynamic naming.
- **Channel Privacy**: Configure privacy with public or private channels.

<DocImage path={require('./static/configure-parameters.png')} width="90%" height="90%" title="Configuring Action Parameters" />

#### 3. Arrange Action Sequences
The order of actions is crucial for effective runbook execution. Drag and drop actions in the left panel according to the order of execution to create logical sequences.

<DocImage path={require('./static/action-sequences.png')} width="90%" height="90%" title="Configuring Action Execution Sequences" />

**Best Practices for Sequencing:**
- **Immediate Response**: Start with critical notifications and incident creation.
- **Information Gathering**: Follow with diagnostic and monitoring actions.
- **Remediation**: Execute fix actions based on gathered information.
- **Validation**: Verify that remediation was successful.
- **Closure**: Update stakeholders and close incidents.

#### 4. Define Workflow Variables
Variables make your runbooks dynamic and reusable across different scenarios.

#### Variable Configuration Steps
1. **Select Context Type**: Choose the Incident or Alert Context (Any/No/Custom) based on which you want to define the variables.
2. **Choose Specific Type**: For Custom Incident or Alert Context, select the appropriate Incident or Alert Type from the dropdown depending on the use case.

<DocImage path={require('./static/custom-incident-type.png')} width="90%" height="90%" title="Defining Custom Incident Type" />

<DocImage path={require('./static/custom-alert-type.png')} width="90%" height="90%" title="Defining Custom Alert Type" />

#### Variable Types
- **Input Variables**: Values provided when the runbook is triggered.
- **Output Variables**: Results from action executions.

#### Variable Configuration Details
- **Input Variables**: Must be defined based on the incident or alert context.
- **Output Variables**: Must be defined based on the action execution.
- **Required Fields**: Name, Display Name, Description, Type, and Default Value.
- **Data Types**: String, Integer, Number, Boolean, Object, or Array.
- **Requirement Level**: Variables can be defined as required or optional based on the use case.

<DocImage path={require('./static/workflow-variables.png')} width="90%" height="90%" title="Defining Workflow Variables" />

#### Dynamic Parameter Selection

When configuring actions, you can use dynamic parameters from various sources to make your runbooks more flexible and powerful.

1. **Select an Action**: After adding an action to your workflow, configure its parameters.
2. **Choose Dynamic Parameter Source**: For applicable fields, click the data picker icon to access dynamic data sources:
   - **Runbook Inputs**: Variables defined in the Input/Output section.
   - **Action Outputs**: Results from previously executed actions.
   - **Pipeline Outputs**: Data from Harness pipeline executions.
   - **Global Variables**: System-wide variables available to all runbooks.
   - **Key Events**: Event-driven data that can trigger specific behaviors.

<DocImage path={require('./static/dynamic-parameter-selection.png')} width="90%" height="90%" title="Selecting Dynamic Parameter Sources" />

#### Key Event Integration

Key Events provide a powerful way to create event-driven runbooks that respond to specific triggers.

1. **Select Key Event as Source**: When configuring an action parameter, choose "Key Event" as the data source.
2. **Create Input and Set Value**: Instead of navigating to the Input/Output section, you can create inputs directly:
   - Click "Create Input and Set Value".
   - Provide a Display Name, Type, and Default Value.
   - Save the new input variable.
   - Select the Key Event text from the input dropdown.

<DocImage path={require('./static/key-event-integration.png')} width="90%" height="90%" title="Key Event Integration" />

<DocImage path={require('./static/key-event-dynamic-input.png')} width="90%" height="90%" title="Key Event Dynamic Input" />

#### Trigger Configuration with Key Events

Once Key Events are configured in your action parameters:

1. **Set Trigger Condition**: In the Triggers section, set the condition to "Key Event Created".
2. **Map Event to Input**: The input field that was configured with the Key Event text can now be automatically populated when the trigger fires.
3. **Dynamic Execution**: When the specified Key Event occurs, the runbook will execute with the event data automatically mapped to your configured inputs.

<DocImage path={require('./static/key-event-trigger.png')} width="90%" height="90%" title="Configuring Key Event Triggers" />

This approach allows for seamless integration between event detection and automated response, without requiring manual configuration of input variables for each execution.

## Step 2: Available Actions and Integrations

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


## Step 3: Configure Triggers

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

## Step 4: Test Your Runbook

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

## Step 5: Deploy and Monitor

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
