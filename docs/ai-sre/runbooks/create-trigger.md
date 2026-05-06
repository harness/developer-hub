---
title: Configure Runbook Triggers
sidebar_label: Configure Runbook Triggers
sidebar_position: 3
description: Learn how to configure triggers for automated runbook execution in Harness AI SRE based on incidents, alerts, and key events.
redirect_from:
- /docs/incident-response/runbooks/create-trigger
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import NeedHelpFooter from '../_snippets/need-help-footer.mdx';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

# Configure Runbook Triggers

Triggers determine when and how your runbooks execute automatically in Harness AI SRE. 

Proper trigger configuration ensures your runbooks respond to the right conditions at the right time, enabling seamless automation for incident response and operational workflows.

## Overview

Runbook triggers help you:
- Automate runbook execution based on specific conditions
- Respond to incidents, alerts, and key events automatically
- Set up event-driven workflows for faster incident resolution
- Configure conditional logic to prevent unnecessary executions
- Establish reliable automation that scales with your operations

## Trigger Configuration Basics

Runbook triggers can be created based on various conditions and events. The trigger system allows you to:

- **Incident-Based Automation**: Execute runbooks when incidents are created, updated, or when specific field changes occur
- **Key Event Responses**: Trigger runbooks when key events are created in the incident timeline
- **Conditional Logic**: Use ALL or ANY condition types with field comparisons to create precise trigger criteria
- **Field-Specific Triggers**: Monitor changes to specific incident fields and trigger based on old values, new values, or field changes

### Best Practices for Trigger Creation

Consider these scenarios when creating runbook triggers:
- **Incident Severity Changes**: Trigger escalation runbooks when incident severity increases
- **Assignment Changes**: Execute notification runbooks when incidents are assigned to specific teams
- **Status Updates**: Activate communication runbooks when incident status changes to resolved
- **Key Milestones**: Trigger documentation runbooks when key events are added to incident timelines

## Creating Triggers

<Tabs groupId="trigger-creation" queryString>
  <TabItem value="interactive-guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/edd0479d-8602-4f86-89a8-57029af64efb?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Configure Triggers for Runbooks" />

Follow this interactive guide to configure triggers that automatically execute your runbooks based on specific conditions and events.

  </TabItem>
  <TabItem value="step-by-step" label="Step by Step">

### Step 1: Access Trigger Configuration

1. Open your existing runbook in the Harness AI SRE platform
2. Click the **Triggers** tab in your runbook editor
3. This opens the trigger configuration interface

### Step 2: Create New Trigger

1. Click **+ New Trigger** to begin the trigger setup process
2. This opens the trigger creation wizard

### Step 3: Choose Trigger Template

1. Select the **Incident Type** template from the available options
2. Choose the specific **Incident Type** from the dropdown menu
3. The selected incident type determines which fields and values will be available for condition configuration
4. This selection affects what data you can use when setting up trigger conditions

### Step 4: Define Trigger Conditions

1. **Choose Condition Type**: Select either **ALL** or **ANY** for your condition logic:
   - **ALL**: All conditions must be met for the trigger to activate
   - **ANY**: Any one of the conditions can activate the trigger
2. **Set Frequency**: Choose when the trigger should evaluate:
   - **Activity Created**: Trigger when new incidents are created
   - **Activity Updated**: Trigger when incidents are updated
   - **Key Event Created**: Trigger when key events are added to incidents
3. **Add Conditions**: Click to add specific field-based conditions for more precise triggering

### Step 5: Configuring Additional Conditions 

To add more specific conditions beyond the basic frequency setting:

1. **Select Field**: Choose the incident field you want to monitor from the dropdown
   - Fields available depend on the incident type selected in Step 3
   - Options include standard incident fields and custom fields for that incident type
2. **Choose Comparison Type**: Select what aspect of the field to monitor:
   - **Old Values**: Compare against the previous value of the field
   - **New Values**: Compare against the current/new value of the field  
   - **Changed Field**: Trigger when the field value changes (regardless of specific values)
3. **Select Comparator**: Choose how to compare the field value:
   - **Equals**: Exact match with the specified value
   - **Contains**: Field contains the specified text
   - **Greater Than/Less Than**: Numeric comparisons
   - **Other operators**: Based on field type and requirements
4. **Enter Value**: Provide the value to compare against
5. **Repeat**: Add multiple conditions as needed using the ALL/ANY logic set in Step 4

### Step 6: Save and Activate

1. **Review Configuration**: Verify all trigger settings are correct
2. **Save Trigger**: Click **Save** to create the trigger
3. **Test Trigger**: Test the trigger by creating dummy conditions that match your configuration
4. **Monitor Execution**: Track trigger performance and effectiveness once activated

  </TabItem>
</Tabs>

## Field-Specific Configuration

### Severity Field

The severity field requires special attention when configuring trigger conditions because severity values are stored as numeric strings, not numbers.

#### Severity Field Values

Harness AI SRE uses numeric string values for severity levels. When configuring trigger conditions, use these exact string values:

| Value | Label | Severity Level |
|-------|-------|----------------|
| `"0"` | SEV0:Critical | Highest severity |
| `"1"` | SEV1:Major | High severity |
| `"2"` | SEV2:Moderate | Moderate severity |
| `"3"` | SEV3:Minor | Low severity |
| `"4"` | SEV4:Cosmetic | Lowest severity |

**Example trigger condition:**

To trigger on critical incidents, use:
```
severity = "0"
```

To trigger on major incidents, use:
```
severity = "1"
```

#### Supported Comparison Operators

Because severity values are strings, only certain comparison operators work correctly.

**Supported operators for severity (string field):**

- **`=` (Equals)**: Match exact severity level
- **`!=` (Does not equal)**: Match all except specified severity level
- **`CONTAINS`**: Match if severity string contains specified text
- **`DOES_NOT_CONTAIN`**: Match if severity string does not contain specified text

**Unsupported operators for severity (string field):**

- **`>` (Greater than)**: Does not work with string values
- **`<` (Less than)**: Does not work with string values
- **`>=` (Greater than or equal to)**: Does not work with string values
- **`<=` (Less than or equal to)**: Does not work with string values

You cannot use `severity > "2"` to match SEV0 and SEV1. This comparison will not work because severity is stored as a string, not a number.

#### Match Multiple Severity Levels

To trigger on multiple severity levels (for example, SEV0 OR SEV1), use one of these approaches:

**Option 1: Multiple conditions with OR logic**

Create separate conditions and set the condition match type to **Match Any** (OR):

1. Add first condition: `severity = "0"`
2. Add second condition: `severity = "1"`
3. Set match type to **Match Any** (OR)

The trigger will activate when the incident severity is either "0" or "1".

**Option 2: Multiple triggers**

Create separate triggers for each severity level within the same runbook assignment. Each trigger handles one severity level independently.

#### Alternative Severity Naming Conventions

The system accepts alternative severity names from integrations like FireHydrant and PagerDuty. These values are automatically mapped to numeric severity strings:

| Alternative Names | Mapped Value |
|-------------------|--------------|
| `SEV0`, `SECURITY0`, `CUSTOMER-P0` | `"0"` |
| `SEV1`, `INTERNAL-PROD`, `SECURITY1`, `CUSTOMER-P1` | `"1"` |
| `SEV2`, `DEPLOYMENT`, `SECURITY2` | `"2"` |
| `SEV3`, `INTERNAL-NONPROD`, `MAINTENANCE` | `"3"` |
| Any other value | `"4"` |

When incidents are created from external integrations, the severity value is normalized to the numeric string format automatically.

## Trigger Configuration Best Practices

### Design Principles
- **Specific Conditions**: Create precise trigger conditions to avoid false positives
- **Logical Grouping**: Organize related triggers for easier management
- **Performance Optimization**: Design efficient conditions that don't overload the system
- **Clear Naming**: Use descriptive names that clearly indicate trigger purpose

### Operational Excellence
- **Avoid Trigger Overlap**: Ensure multiple runbooks don't trigger simultaneously for the same event
- **Use Appropriate Delays**: Add delays between related triggers to prevent conflicts
- **Test Thoroughly**: Validate trigger conditions in non-production environments first
- **Monitor Execution**: Track trigger effectiveness and adjust conditions as needed

### Security Considerations
- **Access Control**: Ensure triggers have appropriate permissions for their actions
- **Data Validation**: Validate all input data before trigger execution
- **Audit Logging**: Maintain comprehensive logs of trigger activations
- **Error Handling**: Implement robust error handling for failed trigger executions

## Advanced Trigger Scenarios

### Multi-Condition Triggers
Configure complex triggers that respond to multiple conditions:
- **Incident Severity + Service**: Trigger only for high-severity incidents affecting critical services
- **Time + Alert Volume**: Activate during business hours when alert volume exceeds thresholds
- **Team Assignment + Escalation**: Execute when incidents are escalated to specific teams

### Conditional Execution
Implement smart trigger logic:
- **Environment-Specific**: Different triggers for production vs. development environments
- **Service-Aware**: Triggers that behave differently based on affected services
- **Context-Sensitive**: Triggers that adapt based on incident context and history

## Troubleshooting Triggers

<Troubleshoot
  issue="Trigger not activating for severity-based conditions"
  mode="docs"
  fallback="Verify you are using numeric string values for severity (for example, severity = '0' for SEV0:Critical, not severity = 0 or severity = 'SEV0'). Check that you are using supported comparison operators (=, !=, CONTAINS, DOES_NOT_CONTAIN) and not numeric operators (>, <, >=, <=) which do not work with string fields."
/>

<Troubleshoot
  issue="Trigger with severity greater than condition does not work"
  mode="docs"
  fallback="Severity values are stored as strings, not numbers. You cannot use > or < operators with severity. To trigger on multiple severity levels (for example, SEV0 or SEV1), create separate conditions with severity = '0' and severity = '1', then set the match type to Match Any (OR)."
/>

<Troubleshoot
  issue="Trigger not activating for any incidents despite correct configuration"
  mode="docs"
  fallback="Verify trigger conditions match actual event data. Check the incident type selected in the trigger matches the incidents you are creating. Test triggers with realistic scenarios before deployment. Review the trigger execution logs for error messages."
/>

<Troubleshoot
  issue="Trigger activating too frequently or causing performance issues"
  mode="docs"
  fallback="Optimize trigger conditions and reduce evaluation frequency. Add more specific conditions to narrow the trigger scope. Consider using Activity Updated frequency only when necessary, as it evaluates on every field change. Review and refine conditions regularly based on trigger execution patterns."
/>

## Integration with Key Events

### Key Event Trigger Configuration

When using Key Events as trigger sources:

1. **Set Trigger Condition**: In the Triggers section, set the condition to "Key Event Created"
2. **Map Event to Input**: Configure how event data maps to runbook input variables
3. **Dynamic Execution**: Enable automatic execution when specified Key Events occur
4. **Data Validation**: Ensure event data meets runbook input requirements

<DocImage path={require('./static/key-event-trigger.png')} width="90%" height="90%" title="Configuring Key Event Triggers" />

This approach allows for seamless integration between event detection and automated response, without requiring manual configuration of input variables for each execution.

## Benefits

- **Automated Response**: Immediate response to incidents and alerts without manual intervention
- **Consistent Execution**: Standardized response procedures triggered by specific conditions
- **Scalable Operations**: Handle increasing incident volumes without additional manual effort
- **Reduced MTTR**: Faster incident resolution through automated trigger-based responses
- **Operational Efficiency**: Free up team members to focus on complex issues requiring human intervention
- **Audit Trail**: Complete tracking of automated actions and their triggers
- **Flexible Configuration**: Adapt trigger behavior to changing operational requirements

## Next Steps

### Getting Started
- [Create a Runbook](./create-runbook.md) to attach triggers to
- [Configure Authentication](./configure-authentication.md) for secure trigger execution
- [Set Up Incident Types](../incidents/incident-types.md) to configure the fields available for trigger conditions

### Advanced Configuration
- [Configure Incident Fields](./configure-incident-fields.md) for trigger condition data
- [Set Up Project Connectors](./configure-project-connectors.md) for external system integration
- [Return to Runbook Overview](./runbooks.md) for additional automation capabilities

### Best Practices Resources
- [AI SRE Best Practices Guide](../resources/ai-sre-best-practices.md)
- [Incident Response Workflows](../incidents/incident-workflows.md)
- [Alert Management Best Practices](../alerts/alert-rules.md)

<NeedHelpFooter />
