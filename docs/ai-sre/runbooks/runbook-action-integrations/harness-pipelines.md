---
title: Harness Pipelines Integration for Runbooks
sidebar_label: Harness Pipelines
sidebar_position: 6
description: Learn how to integrate AI SRE Runbooks with Harness Pipelines for automated remediation and deployment control.
redirect_from:
- /docs/incident-response/runbooks/integrations/harness-pipelines
---


Harness AI SRE provides native integration with Harness Pipelines, enabling automated remediation actions and deployment control directly from your incident response workflows.

## Overview

Harness Pipelines integration enables your runbooks to:
- Execute deployment pipelines automatically
- Trigger rollback procedures
- Scale services during incidents
- Run diagnostic workflows
- Control deployment gates based on incident severity

## Prerequisites

- **Pipeline exists in Harness**: Target pipeline is created and working in Harness (CD or other module)
- **Pipeline inputs configured**: Pipeline defines inputs for incident data (service, environment, incidentId, changeId)
- **Shared account structure**: AI SRE project is in the same Harness account/org/project as the target pipeline
- **Proper permissions**: Users have permission to execute the target pipeline
- **RBAC configured**: AI SRE uses existing Harness identity and RBAC (no additional API keys needed)

## Runbook Configuration

### Create Runbook with Incident Context

1. Navigate to **Runbooks** and click **New runbook**
2. Provide a meaningful name and description, for example:
   - `P1 - Emergency Rollback`
   - `Scale Service - Production`
   - `Diagnostic Pipeline Execution`
3. Configure **Inputs/Outputs** section:
   - **Incident/Alert Context**: Choose context level
     - `Any Incident Type`: Exposes base incident fields (severity, status, summary)
     - `Custom Incident Type`: Exposes base fields plus custom fields from specific incident types
   - **Incident Type**: Select specific type for custom fields (Eg, Major Incident, Security Incident, etc.)

### Context Selection Guidelines
- Use `Any Incident Type` for runbooks requiring only generic incident data
- Use `Custom Incident Type` when runbook depends on custom fields from specific incident types

## Execution Patterns

### Manual Execution
Recommended for production deployments and rollback operations:

- No automatic triggers configured
- Incident commander manually executes from **Runbooks** tab
- Human oversight maintained for critical operations
- Pipeline executes with mapped incident context

### Automatic Execution
Use with caution for low-risk, well-tested actions:

1. Navigate to **Triggers** section
2. Add trigger type:
   - **Incident created**
   - **Incident updated**
3. Configure conditions:
   - Severity equals `P1` or `P0`
   - Service matches specific list
   - Custom fields, for example: `customer_facing = true`

## Pipeline Action Configuration

### Get Pipeline Input YAML

1. Open target pipeline in **Harness Pipelines**
2. Click **Run**
3. Switch to **YAML** tab in Run Pipeline modal
4. Copy the complete YAML block defining pipeline inputs

### Add Execute Harness Pipeline Action

1. Open runbook and navigate to **Workflow** section
2. Click **New action**
3. Select **Execute Harness Pipeline**
4. Configure settings:
   - **Account/Org/Project**: Match target pipeline location
   - **Pipeline**: Select the target pipeline

### Configure Pipeline Inputs

1. Locate **Inputs** or **Payload** area
2. Paste copied YAML from Harness Run modal
3. Verify structure matches pipeline expectations

### Map Input Variables

Replace `<+input.*>` placeholders in the YAML using one of three approaches:

```yaml
service: <+input.service>
environment: <+input.environment>
incidentId: <+input.incidentId>
```

#### Incident Context Mapping
Use data picker to bind incident fields:
- `service` ← `incident.service`
- `environment` ← `incident.environment`
- `incidentId` ← `incident.id`

#### Runtime User Input
Define runbook inputs for user selection:
- Environment selection from predefined list (`dev`, `qa`, `prod`)
- Service selection from available options
- Custom parameters based on incident type

#### Hardcoded Values
Set static values for consistent parameters:
- `environment: "production"`
- `rollbackType: "last_successful"`
- `timeout: "300"`

:::note
All `<+input.*>` placeholders must be resolved through incident data binding, user input, or hardcoded values.
:::

### Execution Mode Configuration

Configure how the runbook handles pipeline execution:

#### Fire and Forget
- AI SRE initiates pipeline without waiting for completion
- Suitable for non-critical or long-running operations
- Use when pipeline output is not required for subsequent actions

#### Wait for Completion
- AI SRE waits for pipeline completion and records status
- Enables conditional follow-up actions based on results
- Logs success/failure in incident timeline
- Required for dependent workflow steps

## Follow-up Actions

Chain additional actions after pipeline execution:

### Incident Timeline Updates
- Pipeline actions log start/finish automatically
- Add custom key events for failures or timeouts
- Include pipeline URLs and execution details

### External System Integration
- **Jira/ServiceNow Updates**: Post completion status with pipeline links
- **Conditional Actions**: Gate follow-up steps on pipeline success/failure
- **Status Synchronization**: Update external tickets with remediation results

### Team Notifications
- **Slack/Teams Integration**: Send pipeline status to incident channels
- **Email Notifications**: Alert stakeholders of completion
- **Custom Webhooks**: Integrate with additional monitoring tools

## Testing and Validation

### Pre-Production Testing
1. **Configure staging pipeline**: Point action to staging/QA pipeline or non-destructive path
2. **Create test incident**: Generate incident matching trigger conditions
3. **Execute manually**: Run runbook to verify behaviour

### Validation Checklist
- **Field mapping**: Incident fields correctly populate pipeline variables
- **Pipeline execution**: Pipeline runs successfully in Harness
- **Timeline logging**: Incident timeline captures pipeline events
- **Follow-up actions**: Downstream integrations (Jira, notifications) function properly

### Production Deployment
1. Update pipeline reference to production target
2. Adjust trigger conditions and permissions
3. Monitor initial executions closely
4. Refine based on operational feedback

## Use Cases

This integration pattern supports various incident response scenarios:
- **Emergency rollbacks**: Automated deployment reversions
- **Service scaling**: Dynamic resource adjustment during incidents
- **Deployment pausing**: Halt deployments during critical incidents
- **Diagnostic workflows**: Automated troubleshooting pipelines
- **Infrastructure remediation**: Automated infrastructure repairs

## Best Practices

- **Start with manual execution** for critical production operations
- **Use staging environments** for initial testing and validation
- **Implement proper RBAC** to control pipeline execution permissions
- **Monitor pipeline performance** and adjust timeouts accordingly
- **Document incident-to-pipeline mappings** for team reference
