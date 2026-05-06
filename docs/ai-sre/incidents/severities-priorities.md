---
title: Configure Severity and Priority Labels
description: Learn how to configure severity and priority labels for your organization
sidebar_label: Configure Severities & Priorities
sidebar_position: 6
---

# Configure Severity and Priority Labels

Configure severity levels for incidents and priority levels for alerts to match your organization's terminology and classification system.

## Overview

By default, Harness AI SRE uses standard severity and priority labels. You can configure these labels organization-wide to:
- Match your existing incident management terminology
- Provide clearer context for your team
- Align with your organization's severity classification standards
- Improve consistency across incident response workflows

**Important:** Custom labels only change the display text. The underlying severity/priority values remain the same, ensuring compatibility with integrations, APIs, and historical data.

## Access Custom Options

1. Navigate to **Organization Settings**
2. Under **Settings mainly used in AI SRE**, click **Severities & Statuses for AI SRE**
3. Use the tabs to configure:
   - **Incidents tab** - Configure severity levels
   - **Alerts tab** - Configure priority levels

## Configure Incident Severity Levels

### Default Severity Labels

| Level | ID  | Default Label     | Description           |
|-------|-----|-------------------|-----------------------|
| SEV0  | `"0"` | SEV0: Critical  | Highest severity      |
| SEV1  | `"1"` | SEV1: Major     | High severity         |
| SEV2  | `"2"` | SEV2: Moderate  | Moderate severity     |
| SEV3  | `"3"` | SEV3: Minor     | Low severity          |
| SEV4  | `"4"` | SEV4: Cosmetic  | Lowest severity       |

### Configure Severity Labels

To configure severity labels:

1. Go to **Organization Settings → Severities & Statuses for AI SRE**
2. Select the **Incidents** tab
3. Click the **Edit** icon next to any severity level
4. Update the:
   - **Label** - The display name (max 20 characters)
   - **Description** - Additional context for your team
5. Click **Save**

**Example customizations:**
- Change "SEV0: Critical" to "P0: Business Critical"
- Change "SEV1: Major" to "P1: Production Down"
- Change "SEV2: Moderate" to "P2: Degraded Service"

### Using Custom Severity in Workflows

Custom labels appear throughout AI SRE:
- Incident cards and detail pages
- Filters and search
- Status updates
- Reports and analytics
- Slack notifications
- Email notifications

**API and Integration Usage:**  
When using the API or configuring runbook triggers, always use the original ID values (`"0"`, `"1"`, `"2"`, `"3"`, `"4"`), not the custom labels.

```yaml
# Runbook trigger example
trigger:
  condition:
    field: severity
    operator: equals
    value: "0"  # Use ID, not custom label
```

Go to [Incident Fields](./incident-fields.md#severity-field-values) for more information about using severity values in integrations.

## Configure Alert Priority Levels

### Default Priority Labels

| Level | ID            | Default Label    | Description        |
|-------|---------------|------------------|--------------------|
| P1    | `p1_critical` | P1: Critical     | Critical priority  |
| P2    | `p2_error`    | P2: Error        | High priority      |
| P3    | `p3_warning`  | P3: Warning      | Medium priority    |
| P4    | `p4_info`     | P4: Info         | Low priority       |

### Configure Priority Labels

To configure priority labels:

1. Go to **Organization Settings → Severities & Statuses for AI SRE**
2. Select the **Alerts** tab
3. Click the **Edit** icon next to any priority level
4. Update the:
   - **Label** - The display name (max 20 characters)
   - **Description** - Additional context for your team
5. Click **Save**

**Example customizations:**
- Change "P1: Critical" to "Urgent"
- Change "P2: Error" to "High"
- Change "P3: Warning" to "Medium"
- Change "P4: Info" to "Low"

### Using Custom Priority in Workflows

Custom labels appear throughout AI SRE:
- Alert cards and detail pages
- Alert rules
- Filters and search
- Reports and analytics
- Slack notifications
- Email notifications

**API and Integration Usage:**  
When using the API or configuring alert rules, always use the original ID values (`p1_critical`, `p2_error`, `p3_warning`, `p4_info`), not the custom labels.

```yaml
# Alert rule example
alert_rule:
  condition:
    priority: p1_critical  # Use ID, not custom label
  action:
    create_incident: true
```

## Best Practices

### Label Design
- **Keep labels concise** - Maximum 20 characters
- **Use consistent naming** - Follow a standard pattern (e.g., "P0: Business Critical", "P1: Production Down")
- **Avoid abbreviations** - Unless universally understood in your organization
- **Include severity level** - Help users understand the hierarchy at a glance

### Descriptions
- **Add context** - Explain when to use each severity/priority level
- **Define impact** - Describe the typical impact for each level
- **Provide examples** - Include example scenarios
- **Update regularly** - Keep descriptions current as processes evolve

### Team Alignment
- **Document changes** - Announce custom labels to your team
- **Train responders** - Ensure everyone understands the new terminology
- **Update runbooks** - Reference custom labels in response procedures
- **Gather feedback** - Periodically review effectiveness with your team

### API and Integration Considerations
- **Test integrations** - Verify external systems work with custom labels
- **Document mappings** - Create a reference showing ID to label mappings
- **Update documentation** - Update internal runbooks and procedures
- **Monitor for issues** - Check that custom labels don't break workflows

## Important Notes

### What Changes
- Display labels throughout the UI
- Labels in notifications (Slack, email)
- Labels in exports and reports
- Labels in search and filters

### What Doesn't Change
- Underlying ID values
- API request/response formats
- Integration mappings
- Historical data
- Database storage format

### Organization-Wide Impact
Custom severity and priority labels apply to:
- All projects in the organization
- All teams and users
- All incidents and alerts (past and future)
- All integrations and workflows

## Troubleshooting

### Custom labels not appearing
- Refresh the page after saving changes
- Check browser cache (try incognito/private mode)
- Verify you have organization admin permissions

### Integrations sending incorrect severity
- Integrations send original severity values
- Custom labels are applied on display only
- Check integration mappings in [Incident Fields](./incident-fields.md#severity-field-values)

### API requests failing
- Always use ID values in API calls, never custom labels
- See [Incident Fields](./incident-fields.md#severity-field-values) for correct ID values

## Example Configurations

### Enterprise Standard
```
SEV0 → "P0: Business Critical"
SEV1 → "P1: Major Incident"  
SEV2 → "P2: Significant Issue"
SEV3 → "P3: Minor Issue"
SEV4 → "P4: Informational"
```

### SRE Team
```
SEV0 → "Critical: All hands"
SEV1 → "High: Oncall + Manager"
SEV2 → "Medium: Oncall"
SEV3 → "Low: Best effort"
SEV4 → "Info: Track only"
```

### Customer Impact Based
```
SEV0 → "Total Outage"
SEV1 → "Major Degradation"
SEV2 → "Partial Impact"
SEV3 → "Minimal Impact"
SEV4 → "No Customer Impact"
```

## Next Steps

### Documentation
- [Configure Incident Fields](./incident-fields.md)
- [Incident Types](./incident-types.md)
- [Alert Rules](../alerts/alert-rules.md)

### Related Topics
- [Incident Workflows](./incident-workflows.md)
- [Status Updates](./status-updates.md)
