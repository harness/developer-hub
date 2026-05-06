---
title: Configure Incident Types
description: Learn how to create and manage incident types in Harness AI SRE.
sidebar_label: Configure Incident Types
sidebar_position: 4
redirect_from:
- /docs/incident-response/incidents/incident-templates
---

# Configure Incident Types

Learn how to create and manage incident types in Harness AI SRE to standardize incident handling across your organization.

## Overview

Incident types help you:
- Standardize incident data collection with custom fields
- Create consistent incident creation workflows
- Enable automated runbook execution
- Support compliance requirements
- Speed up incident response

Incident types are configured through the AI SRE UI, not through YAML files. Each incident type defines:
- **Custom fields** - Additional fields specific to this type of incident
- **Creation form layout** - How fields are arranged when creating incidents
- **Pinned runbooks** - Runbooks that are automatically suggested for this incident type
- **Base activity type** - The underlying incident category (e.g., Incident, Alert)

## Creating an Incident Type

To create a new incident type:

1. Navigate to **Project Settings** → **Incident Types** (AI SRE)
2. Click **Create Incident Type**
3. Configure the following:
   - **Name** - Display name for this incident type (e.g., "Service Degradation", "Security Incident")
   - **Short ID** - Unique identifier used in URLs and APIs (e.g., "svc-deg", "sec-inc")
   - **Description** - What this incident type is used for
   - **Base Activity Type** - Select "Incident"

4. Add **Custom Fields**:
   - Click **Add Field**
   - Choose field type: Text, Number, Dropdown, User, Team, Service, etc.
   - Configure field properties:
     - Field name and label
     - Required vs. optional
     - Default value
     - Validation rules

5. Configure **Creation Form Layout**:
   - Drag and drop fields to arrange the incident creation form
   - Group related fields together
   - Set field order for optimal workflow

6. Pin **Recommended Runbooks** (optional):
   - Select runbooks that should be suggested when this incident type is created
   - Pinned runbooks appear at the top of the runbook list during incidents

7. Click **Save**

## Common Incident Type Patterns

### Service Incident Type

**Purpose**: Performance issues, outages, or degradation in a service

**Suggested Custom Fields**:
- **Service** (Service field, required) - Which service is impacted
- **Environment** (Dropdown: production, staging, development)
- **Impact** (Text area) - Description of user impact
- **Error Rate %** (Number) - Quantify the error rate increase

**Pinned Runbooks**: 
- Service Health Check
- Scale Service Instances
- Roll Back Deployment

### Security Incident Type

**Purpose**: Security alerts, vulnerabilities, or unauthorized access

**Suggested Custom Fields**:
- **Affected Service** (Service field)
- **Attack Vector** (Dropdown: injection, XSS, credential theft, DDoS, other)
- **Data Exposed** (Yes/No)
- **Compliance Impact** (Dropdown: PCI, SOC2, HIPAA, GDPR, none)

**Pinned Runbooks**:
- Security Incident Response
- Isolate Affected Resources
- Notify Security Team

### Infrastructure Incident Type

**Purpose**: Platform, networking, or infrastructure problems

**Suggested Custom Fields**:
- **Infrastructure Component** (Dropdown: compute, network, storage, database)
- **Affected Cluster/Region** (Text)
- **Resource Utilization** (Number) - CPU/memory percentage
- **Auto-Scaling Status** (Dropdown: enabled, disabled, failing)

**Pinned Runbooks**:
- Check Infrastructure Health
- Scale Infrastructure
- Failover to Secondary Region

## Field Types and When to Use Them

### Text Field
- Single-line text input
- Use for: titles, short descriptions, identifiers

### Text Area
- Multi-line text input
- Use for: detailed descriptions, impact summaries, notes

### Dropdown
- Single selection from predefined options
- Use for: environment, severity overrides, categorization

### Number
- Numeric input with optional validation
- Use for: percentages, counts, thresholds

### User
- Select a user from the organization
- Use for: incident commander, additional responders

### Team / User Group
- Select a team responsible for resolution
- Use for: owning team, escalation target

### Service
- Select from your service directory
- Use for: impacted service, related services

### Date/Time
- Calendar and time picker
- Use for: scheduled maintenance windows, deadline tracking

## Using Incident Types

### Create an Incident

When creating an incident:

1. Go to **Incidents** → **Create Incident**
2. Select the **Incident Type** from the dropdown
3. The creation form displays with all fields for that type
4. Fill in required fields (marked with *)
5. Optionally fill in additional custom fields
6. Click **Create Incident**

### Quick Start (AI-Powered)

AI SRE can auto-populate incident fields:

1. Click **Quick Start** on the incident creation form
2. Describe the incident in natural language
3. AI extracts relevant details and suggests:
   - Title
   - Severity
   - Service
   - Custom field values
4. Review and adjust the suggestions
5. Click **Create Incident**

### Select Incident Type via Slack

Use the `/harness new` command:

```
/harness new
```

Slack presents a form where you can:
1. Choose the incident type
2. Fill in fields interactively
3. Create the incident without leaving Slack

### Alert Rules Auto-Create Incidents

Configure alert rules to automatically create incidents of a specific type:

1. Navigate to **Alerts** → **Alert Rules**
2. Create or edit an alert rule
3. Under **Actions**, select **Create Incident**
4. Choose the incident type
5. Map alert fields to incident fields

When alerts match the rule, incidents are auto-created with the specified type.

## Managing Incident Types

### Edit an Incident Type

1. Navigate to **Project Settings** → **Incident Types**
2. Click the incident type to edit
3. Modify fields, layout, or pinned runbooks
4. Click **Save**

**Note**: Changes to incident types affect future incidents. Existing incidents retain their original field structure.

### Version Control

AI SRE tracks incident type versions:
- Each save creates a new version
- Version history is maintained
- Existing incidents reference their original type version
- API integrations use versioned type schemas

### Delete an Incident Type

1. Navigate to **Project Settings** → **Incident Types**
2. Click the incident type to delete
3. Click **Delete**
4. Confirm deletion

**Warning**: You cannot delete incident types that:
- Have active incidents
- Are referenced in alert rules
- Are referenced in runbook triggers

## Best Practices

### Keep Types Focused
- Create distinct incident types for different scenarios
- Avoid creating one "catch-all" type with too many optional fields
- Aim for 5-10 incident types per organization

### Design for Speed
- Put most critical fields first in the creation form
- Make only essential fields required
- Use dropdowns with sensible defaults to reduce typing

### Enable Automation
- Pin runbooks that are almost always needed for this incident type
- Use consistent field names across types (e.g., always call the service field "Service")
- Create alert rules that map to incident types automatically

### Review and Iterate
- Monitor which fields are actually used
- Remove rarely-used custom fields
- Gather feedback from incident responders
- Update types as your processes evolve

## Related Documentation

- [Incident Fields Reference](./incident-fields.md) - Standard fields available on all incidents
- [Create Incidents](../users/create-incidents.md) - User guide for creating incidents
- [Alert Rules](../alerts/alert-rules.md) - Configure alerts to auto-create incidents
- [Create a Runbook](../runbooks/create-runbook.md) - Build runbooks to pin to incident types
