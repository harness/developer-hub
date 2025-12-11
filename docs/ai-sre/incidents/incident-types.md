---
title: Incident Types
description: Learn how to create and configure incident types in Harness AI SRE to standardize incident classification and response procedures.
sidebar_label: Incident Types
sidebar_position: 2
redirect_from:
- /docs/incident-response/incidents/incident-types
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Incident Types

Incident Types in Harness AI SRE provide a standardized framework for classifying and managing different categories of incidents. By defining incident types, teams can ensure consistent response procedures, appropriate field configurations, and automated workflows tailored to specific incident scenarios.

## Overview

Incident Types help you:
- Standardize incident classification across your organization
- Define custom fields and default values for different incident categories
- Establish consistent response procedures and workflows
- Automate incident creation with pre-configured templates
- Associate relevant runbooks and response procedures
- Ensure appropriate escalation paths and team assignments

## Key Features

### Standardized Classification
- Custom incident type creation for organization-specific needs
- Consistent incident handling across teams and services
- Automated incident routing based on type classification

### Response Procedure Configuration
- Set default values and custom fields to streamline incident creation
- Configure field validation and requirements (required vs optional) per incident type
- Associate runbooks with specific incident types for automated response procedures
- Integrate with monitoring tools and alert rules for automatic incident creation
- Create standardized workflows combining custom fields and runbook automation

### Template Management
- Pre-configured incident creation forms
- Standardized incident descriptions and procedures
- Consistent data collection across incident types
- Streamlined incident reporting and analysis

## Configuration Steps

<Tabs groupId="incident-types-setup" queryString>
  <TabItem value="interactive-guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/f4e2db0e-38ba-4278-bb16-7fde8c9fa24e?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create and Configure Incident Types" />

Follow this interactive guide to create and configure incident types with custom fields and runbook associations.

  </TabItem>
  <TabItem value="step-by-step" label="Step by Step">

### Step 1: Access Incident Types

1. Navigate to **Incidents** from the left panel
2. Click **Incident Types** from the top right corner
3. Click **Create Incident Type** to start configuration

### Step 2: Configure Basic Details

1. Fill in the required details for your incident type:
   - **Name**: Descriptive name for the incident type (e.g., "Security Incident", "Major Incident")
   - **Short ID**: Unique identifier for the incident type
   - **Description** (Optional): Brief explanation of when this type should be used
2. Click **Save** to create the basic incident type

### Step 3: Configure Default Fields

1. Click **Show Default Fields** to view available incident fields
2. Click the **pencil icon** to edit field configurations
3. For each field, you can:
   - Set **default values** to pre-populate incident creation forms
   - Configure **field visibility** and requirements
   - Define **validation rules** for data entry
4. Click **Save** after configuring each field

### Step 4: Set Required Fields

1. Review optional fields that should be mandatory for this incident type
2. Select fields to mark as **Required** for incident creation
3. This ensures critical information is always collected
4. Click **Save** to apply the requirements

### Step 5: Add Custom Fields

1. Click **Add Custom Field** to create incident-type-specific fields
2. Configure the custom field properties:
   - **Field Name**: Descriptive name for the field
   - **Field Type**: Text, number, dropdown, date, etc.
   - **Default Value**: Pre-populated value (if applicable)
   - **Validation Rules**: Data format requirements
3. Click **Save** to add the custom field

### Step 6: Configure Creation Form

1. Navigate to the **Creation Form** tab
2. Select checkboxes to include fields in the incident creation form
3. Arrange fields in the desired order for optimal user experience

### Step 7: Associate Runbooks (Optional)

1. Navigate to the **Runbooks** tab
2. Click **Pin Runbook** to associate automated response procedures
3. Select the runbook you want to link with this incident type:
   - Choose from existing runbooks in your library
   - Runbooks will be automatically suggested during incident response
4. Click **Pin Runbook** to confirm the association
5. Repeat for multiple runbooks as needed

### Step 8: Save and Activate

1. Review all configurations across all tabs
2. Click **Save** from the top right to finalize the incident type
3. The incident type will be available for:
   - Manual incident creation
   - Automated incident generation from alerts
   - Integration with monitoring tools and alert rules

  </TabItem>
</Tabs>

## Best Practices

### Incident Type Design
- Create specific types for different service categories
- Use clear, descriptive names that teams will understand
- Align incident types with your organization's service structure
- Consider severity levels and response time requirements

### Field Configuration
- Include only essential fields to avoid form fatigue
- Set sensible default values to speed up incident creation
- Make critical fields required to ensure data completeness
- Use custom fields sparingly and only when necessary

### Runbook Association
- Link relevant runbooks to automate response procedures
- Ensure runbooks are up-to-date and tested regularly
- Consider different runbooks for different severity levels
- Document runbook usage and maintenance procedures

### Workflow Integration
- Align incident types with your alert rules and monitoring setup
- Configure automatic incident creation for critical alerts
- Test incident type configurations with sample scenarios
- Train teams on proper incident type selection and usage


## Common Incident Types

### Security Incidents
- **Purpose**: Handle security breaches, vulnerabilities, and threats
- **Key Fields**: Threat level, affected systems, containment status
- **Runbooks**: Security response procedures, forensic analysis

### Performance Issues
- **Purpose**: Address application and infrastructure performance problems
- **Key Fields**: Performance metrics, affected services, user impact
- **Runbooks**: Performance troubleshooting, scaling procedures

### Infrastructure Outages
- **Purpose**: Manage hardware failures, network issues, and service disruptions
- **Key Fields**: Affected infrastructure, estimated recovery time, backup status
- **Runbooks**: Failover procedures, recovery workflows

### Application Errors
- **Purpose**: Handle software bugs, deployment issues, and application failures
- **Key Fields**: Error messages, affected features, rollback requirements
- **Runbooks**: Debugging procedures, rollback workflows


## Benefits

- **Consistency**: Standardized incident handling across all teams and services
- **Efficiency**: Pre-configured fields and workflows reduce response time
- **Automation**: Automated incident creation and response procedure execution
- **Visibility**: Clear incident categorization for reporting and analysis
- **Compliance**: Structured data collection for audit and regulatory requirements
- **Learning**: Historical data analysis for continuous improvement

## Next Steps

- [Configure Alert Rules](../alerts/alert-rules.md) to automatically create incidents
- [Create Runbooks](../runbooks/create-runbook.md) for automated response procedures
- [Set Up Incident Workflows](./incident-workflows.md) for advanced automation
- [Configure Custom Fields](./incident-fields.md) for specialized data collection
