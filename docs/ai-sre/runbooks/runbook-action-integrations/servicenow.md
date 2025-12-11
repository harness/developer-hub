---
title: ServiceNow Integration for Runbooks
sidebar_label: ServiceNow
sidebar_position: 5
description: Learn how to integrate ServiceNow with Harness AI SRE Runbooks, including bidirectional synchronization and incident creation.
redirect_from:
- /docs/incident-response/runbooks/integrations/servicenow
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CreateIntegration from './static/create-integration.png';


Harness AI SRE offers comprehensive integration with ServiceNow, enabling both outbound (AI SRE to ServiceNow) and inbound (ServiceNow to AI SRE) incident management and tracking.

## Overview

ServiceNow integration enables your runbooks to:
- Create and update incidents
- Track incident progress
- Automate workflow transitions
- Sync incident updates bidirectionally

## Connector-Based Integration

### Prerequisites
- ServiceNow admin access
- Instance URL
- Service account credentials
- Harness Project Admin role

### Setup Steps
1. Navigate to **Settings** → **Connectors**
2. Click **+ New Connector**
3. Select **ServiceNow**
4. Configure authentication:
   - Instance URL
   - Username
   - Password/OAuth credentials
5. Test connection

### Required Permissions
- incident_manager role
- itil role
- rest_service role
- web_service_admin role

## Using ServiceNow in Runbooks

### Incident Creation
```yaml
- Action Type: ServiceNow
  Operation: Create Incident
  Category: "Infrastructure"
  Impact: "[incident.severity]"
  ShortDescription: "[incident.service] Incident"
  Description: |
    Impact: [incident.description]
    Service: [incident.service]
    Environment: [incident.environment]
```

### Update Incident
```yaml
- Action Type: ServiceNow
  Operation: Update Incident
  Number: "[servicenow.number]"
  Fields:
    Priority: "[incident.severity]"
    Assignment_group: "SRE Team"
    Comments: "Automated response initiated"
```

### State Management
```yaml
- Action Type: ServiceNow
  Operation: Update State
  Number: "[servicenow.number]"
  State: "In Progress"
  WorkNotes: "Incident response team engaged"
```

## Directional Synchronization with AI SRE

Harness AI SRE uses runbook triggers to update ServiceNow when incident fields change. When a field in AI SRE changes, a runbook can automatically update the corresponding ServiceNow incident.

### Field Change Triggers
Configure runbooks to trigger on field changes:
- State changes
- Priority updates
- Severity modifications
- Assignment changes

### Example: State Change Sync
```yaml
Trigger:
  Type: Field Change
  Field: state
  
Actions:
  - Action Type: ServiceNow
    Operation: Update State
    Number: "[servicenow.number]"
    State: "[incident.state]"
    WorkNotes: "State updated from AI SRE"
```

### Example: Priority Sync
```yaml
Trigger:
  Type: Field Change
  Field: priority
  
Actions:
  - Action Type: ServiceNow
    Operation: Update Incident
    Number: "[servicenow.number]"
    Fields:
      Priority: "[incident.priority]"
      WorkNotes: "Priority updated from AI SRE"
```

## Advanced Features

### Bidirectional Sync (Coming Soon)
:::note Future Capability
The following features are planned for future releases:
- Real-time incident synchronization
- Work notes mirroring
- CMDB integration
- Workflow state mapping
:::

#### Planned Capabilities
1. **Incident Sync**
   - ServiceNow → Harness AI SRE status mapping
   - Automatic state transitions
   - Priority synchronization

2. **Work Notes Sync**
   - Bidirectional updates flow
   - Attachment synchronization
   - User mapping

3. **CMDB Integration**
   - CI relationship mapping
   - Impact analysis
   - Service dependency tracking

## Best Practices

### Incident Management
- Use standard categorization
- Include business impact
- Link configuration items
- Maintain SLA tracking

### Workflow Integration
- Define clear state mappings
- Document transition rules
- Set up appropriate triggers
- Monitor sync status

### Field Configuration
- Map essential fields
- Use custom fields appropriately
- Document field purposes
- Validate field values

## Common Use Cases

### Major Incident Management
1. Create ServiceNow incident
2. Assign response teams
3. Track resolution progress
4. Update stakeholders

### Change Management
1. Create change requests
2. Track approvals
3. Document implementations
4. Update CMDB

### SLA Compliance
1. Monitor response times
2. Track resolution progress
3. Generate reports
4. Escalate as needed

## Troubleshooting

### Common Issues
1. **Authentication Failures**
   - Verify credentials
   - Check roles/permissions
   - Confirm instance access

2. **Field Update Errors**
   - Validate field names
   - Check required fields
   - Verify field formats

3. **State Transition Issues**
   - Check workflow rules
   - Verify state mappings
   - Confirm permissions

## Creating Incidents in AI SRE from ServiceNow

This section walks you through setting up an integration in Harness AI SRE to receive incident data from ServiceNow. By following these steps, you'll be able to automatically create incidents in Harness AI SRE based on ServiceNow incidents.

### Integration Setup Process

#### 1. Create the Integration in AI SRE

1. Navigate to **Integrations** in AI SRE.
2. Click **New Integration**.
3. Set the following values:
   - **Name**: ServiceNow Incidents
   - **Type**: Incident
   - **Template**: ServiceNow Incident

<img src={CreateIntegration} width="600"/>

4. Copy the generated **Webhook URL**.

#### 2. Test the Integration with cURL

Use the following curl command to test sending incident data from ServiceNow. Replace `YOUR_URL` with the URL you copied from AI SRE.

![Test URL](./static/test-url.png)

```bash
curl -X 'POST' 'YOUR_URL' \
  -H 'host: IR' \
  -H 'user-agent: ServiceNow/1.0' \
  -H 'x-snc-integration-source: c9fdbaf8ebbce694c040fddacad0cd90' \
  -H 'content-type: application/json' \
  -d $'{
    "number": "INC0010166",
    "reported_by_email": "admin@example.com",
    "opened_at": "2025-07-08 18:08:05",
    "impact": "1",
    "urgency": "1",
    "short_description": "Testing SNOW Creation",
    "description": "Testing SNOW Creation",
    "category": "software",
    "priority": "1",
    "sys_id": "096654f28362ea10ea8ff3a6feaad338",
    "subcategory": null,
    "state": "2",
    "incident_url": "https://<INSTANCE>.service-now.com/nav_to.do?uri=/incident.do?sysparm_query=number=<INCIDENTID>"
  }'
```

#### 3. Configure Payload in AI SRE

1. In AI SRE, go to the newly created **ServiceNow Incidents** integration.
2. Click **Payload Configuration**.
3. Click **Refetch Payload** to load the fields.
4. Select all available values for use in AI SRE.

![Payload Configuration](./static/payload-configuration.png)

:::info custom fields
If custom ServiceNow fields are not showing up, update your ServiceNow Business Rule to include those fields in the payload.
:::

### Data Mapping: ServiceNow to AI SRE

<Tabs>
<TabItem value="state-mapping" label="State → Status Mapping">

| ServiceNow Value | ServiceNow Label | AI SRE Status |
|-----------------|------------------|---------------|
| 1               | New              | New           |
| 2               | In Progress      | Investigating |
| 3               | On Hold          | Monitoring    |
| 4               | Resolved         | Closed        |
| 5               | Closed           | Closed        |
| 6               | Canceled         | Closed        |

</TabItem>
<TabItem value="priority-mapping" label="Priority → Severity Mapping">

| ServiceNow Value | ServiceNow Label | AI SRE Severity |
|-----------------|------------------|----------------|
| 1               | Critical         | SEV0:Critical  |
| 2               | High             | SEV1:Major     |
| 3               | Moderate         | SEV2:Moderate  |
| 4               | Low              | SEV3:Minor     |
| 5               | Planning         | SEV4:Cosmetic  |

</TabItem>
</Tabs>

:::tip mapping usage
Use these mappings when parsing state and priority from the webhook payload to translate ServiceNow values into meaningful context within AI SRE.
:::


## Creating Webhooks in ServiceNow

Send data from ServiceNow to Harness AI SRE using a Business Rule and RESTMessageV2. This integration enables automatic incident creation and updates in Harness AI SRE when ServiceNow incidents are created or modified.

### Setup Instructions

1. **Navigate to Business Rules**
   - Go to **System Definition** > **Business Rules**
   - Click **New**

2. **Configure the Business Rule**
   - Name: `Send Incident to Harness AI SRE`
   - Table: `Incident`
   - Active: ✅
   - Advanced: ✅

3. **Set When to Run**
   - When: `After`
   - Insert: ✅
   - Update: ✅
   - (Optional) Add filter conditions to limit which incidents trigger the webhook

4. **Add Script**
   - Go to the **Advanced** tab and paste the following:

```javascript
(function executeRule(current, previous /*null when async*/ ) {
    try {
        var r = new sn_ws.RESTMessageV2();
        r.setEndpoint("https://app.harness.io/api/v1/incident/webhook");  // Replace with your Harness webhook URL
        r.setHttpMethod("post");
        r.setRequestHeader("Content-Type", "application/json");

        var usr = new GlideRecord('sys_user');
        usr.get('sys_id', current.getValue("caller_id"));
        var reported_by_email = usr.getValue('email');

        var number = current.getValue("number");
        var opened_at = current.getValue("opened_at");
        var impact = current.getValue("impact");
        var urgency = current.getValue("urgency");
        var short_description = current.getValue("short_description");
        var description = current.getValue("description");
        var category = current.getValue("category");
        var priority = current.getValue("priority");
        var sys_id = current.getValue("sys_id");
        var subcategory = current.getValue("subcategory");
        var state = current.getValue("state");

        var instanceUrl = gs.getProperty('glide.servlet.uri');
        var incident_url = instanceUrl + "nav_to.do?uri=/incident.do?sysparm_query=number=" + number;

        var obj = {
            "number": number,
            "reported_by_email": reported_by_email,
            "opened_at": opened_at,
            "impact": impact,
            "urgency": urgency,
            "short_description": short_description,
            "description": description,
            "category": category,
            "priority": priority,
            "sys_id": sys_id,
            "subcategory": subcategory,
            "state": state,
            "incident_url": incident_url
        };

        var body = JSON.stringify(obj);
        gs.info("AI SRE webhook payload: " + body);
        r.setRequestBody(body);

        var response = r.execute();
        gs.info("AI SRE webhook HTTP status: " + response.getStatusCode());
        gs.info("AI SRE webhook response: " + response.getBody());

    } catch (ex) {
        gs.error("Error sending webhook to AI SRE: " + ex.message);
    }

})(current, previous);
```

### Testing the Integration

1. **Create a Test Incident**
   - Create a new incident in ServiceNow to trigger the business rule

2. **Check System Logs**
   - Go to **System Logs** > **All**
   - Confirm log output containing "AI SRE webhook payload" and response information

3. **Verify in Harness AI SRE**
   - Log into your Harness AI SRE account
   - Navigate to the Incidents section
   - Confirm the incident was created with the correct data

:::info important fields
Ensure that all required fields are included in the webhook payload. The minimum fields needed for proper incident creation are: `number`, `short_description`, `state`, and `priority`.
:::

## Syncing from ServiceNow to AI SRE

To enable bidirectional synchronization where ServiceNow comments and work notes are automatically sent to AI SRE, you'll need to create an additional Business Rule that triggers when journal entries are added to incidents.

### Creating the Journal Entry Business Rule

This Business Rule will automatically push comments and work notes from ServiceNow to AI SRE, ensuring both systems stay synchronized even when updates are made directly in ServiceNow.

#### Setup Instructions

1. **Navigate to Business Rules**
   - Go to **System Definition** > **Business Rules**
   - Click **New**

2. **Configure the Business Rule**
   - Name: `Sync Comments to Harness AI SRE`
   - Table: `Journal Entry [sys_journal_field]`
   - Active: ✅
   - Advanced: ✅

3. **Set When to Run**
   - When: `After`
   - Insert: ✅
   - (Optional) Add filter conditions to limit to specific journal types

4. **Add the Script**
   - Go to the **Advanced** tab and paste the following script:

```javascript
(function executeRule(current) {
  gs.info("[Harness IR] BR triggered for journal entry: " + current.getValue('sys_id'));

  // Determine note type (e.g., comments or work_notes)
  var type = current.getValue('element');

  // Only continue for work_notes or comments
  // if (type !== "work_notes" && type !== "comments") {
  //   gs.info("[Harness IR] Skipped (not a supported journal type)");
  //   return;
  // }

  // Fetch the related Incident record
  var incidentId = current.getValue('element_id');
  var inc = new GlideRecord('incident');
  if (!inc.get(incidentId)) {
    gs.info("[Harness IR] Skipped (incident not found): " + incidentId);
    return;
  }

  // Detect instance URL dynamically
  var instanceUrl = gs.getProperty('glide.servlet.uri'); // e.g. https://dev319566.service-now.com/
  var incidentNumber = inc.getValue('number');
  var incidentUrl = instanceUrl + "nav_to.do?uri=/incident.do?sysparm_query=number=" + incidentNumber;

  // Build payload
  var payload = {
    snow_incidentId: incidentNumber,                     // e.g. INC0010234
    snow_incidentSysId: inc.getUniqueValue(),            // Stable sys_id
    note_type: type,                                     // "comments" | "work_notes"
    note_text: current.getValue('value') || '',
    author: current.getValue('sys_created_by') || '',
    created_on: current.sys_created_on.getGlideObject().getNumericValue(), // epoch numeric
    priority: inc.getValue('priority') || '',
    short_description: inc.getValue('short_description') || '',
    note_id: current.getValue('sys_id'),                 // journal entry sys_id
    incident_url: incidentUrl                            // Deep link to incident
  };

  gs.info("[Harness IR] Payload prepared: " + JSON.stringify(payload));

  try {
    var r = new sn_ws.RESTMessageV2();
    
    // Replace with your AI-SRE project/org/template webhook endpoint:
    r.setEndpoint('https://app.harness.io/ir/tp/api/v1/mc/account/<ACCOUNT_ID>/orgs/<ORG_ID>/projects/<PROJECT_ID>/incidentTemplate/<TEMPLATE_ID>/servicenow/webhook');
    r.setHttpMethod('POST');
    r.setRequestHeader("Content-Type", "application/json");
    r.setRequestBody(JSON.stringify(payload));

    var response = r.execute();
    var status = response.getStatusCode();
    var body = response.getBody();

    if (status === 200) {
      gs.info("[Harness IR] Webhook successfully sent. Status: " + status);
    } else {
      gs.error("[Harness IR] Webhook returned non-200 response. Status: " + status + " Body: " + body);
    }
  } catch (ex) {
    gs.error("[Harness IR] Webhook failed: " + ex.getMessage());
  }
})(current);
```

#### Configuration Notes

1. **Optional Filtering**
   - The script includes commented lines that filter for only `work_notes` and `comments`
   - Uncomment these lines (remove `//`) if you want to limit synchronization to these specific journal types:
   ```javascript
   if (type !== "work_notes" && type !== "comments") {
     gs.info("[Harness IR] Skipped (not a supported journal type)");
     return;
   }
   ```

2. **Table Configuration**
   - This Business Rule must be created on the `sys_journal_field` table
   - It triggers when journal entries (comments, work notes, etc.) are added to any record
   - The script filters for incident-related entries automatically

#### Endpoint Substitution Guide

Use this guide to correctly substitute the placeholders in the webhook endpoint used by the Business Rule:

```text
https://app.harness.io/ir/tp/api/v1/mc/account/<ACCOUNT_ID>/orgs/<ORG_ID>/projects/<PROJECT_ID>/incidentTemplate/<TEMPLATE_ID>/servicenow/webhook
```

- **`<ACCOUNT_ID>`**: Your Harness account identifier.
- **`<ORG_ID>`**: The organization identifier in which AI SRE is configured.
- **`<PROJECT_ID>`**: The project identifier that contains your AI SRE runbooks/incidents.
- **`<TEMPLATE_ID>`**: The incident template identifier used for this ServiceNow sync.

Recommended ways to obtain values:
- **Copy from AI SRE**: In AI SRE, open the relevant integration/template and copy the generated webhook URL. It already includes all identifiers. Paste it into `r.setEndpoint(...)`.
- **From UI URLs/settings**: When viewing your org or project in Harness, the URL path shows `orgs/<ORG_ID>/projects/<PROJECT_ID>`. Account ID is available in account settings. The template ID is visible in the incident template details or within the generated webhook URL.

Example (for illustration only):

```text
https://app.harness.io/ir/tp/api/v1/mc/account/acc_123456/orgs/engineering/projects/sre/incidentTemplate/incident_default/servicenow/webhook
```

#### Testing the Integration

1. **Create a Test Comment**
   - Open an existing incident in ServiceNow
   - Add a comment or work note
   - Check the system logs for webhook activity

2. **Verify System Logs**
   - Go to **System Logs** > **All**
   - Look for entries containing "[Harness IR]" to track the webhook execution
   - Confirm successful HTTP 200 responses

3. **Check AI SRE**
   - Navigate to the corresponding incident in AI SRE
   - Verify that the comment or work note appears in the incident timeline

:::tip best practices
- Test the integration in a development environment first
- Monitor system logs regularly to ensure webhook reliability
- Consider adding additional filtering based on your organization's needs
- Document any custom fields or modifications for future reference
:::

## Next Steps

- [Configure Jira Integration](./jira.md)
- [Configure Teams Integration](./teams.md)
- [Return to Runbook Overview](../runbooks.md)
