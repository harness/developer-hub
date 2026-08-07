---
title: Create an Alert Rule
description: Route, filter, and enrich incoming alerts with rules.
sidebar_label: Create an Alert Rule
sidebar_position: 2
keywords:
  - alert rules
  - routing
  - incidents
  - on-call paging
tags:
  - ai-sre
  - alerts
redirect_from:
- /docs/incident-response/alerts/alert-rules/create-alert-rule
- /docs/ai-sre/alerts/alert-rules
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocVideo from '@site/src/components/DocVideo';

This guide walks you through creating alert rules that define how incoming alerts are processed and when incidents should be created.

## Configuration steps

<Tabs groupId="alert-rules-setup" queryString>
  <TabItem value="step-by-step" label="Step by Step" default>

### Step 1: Access alert rules

Open the alert rules list to start a new rule:

1. From the main menu, select **Alerts**.
2. Click **Alert Rules**.
3. Click **New Alert Rule**.

### Step 2: Configure integration and conditions

Select the source integration and define when the rule triggers:

1. Under **Integration & Conditions**, select the source integration from your connected monitoring tools.
2. Select your condition mode:
   - **Field-based conditions** (default): Visual builder with field comparisons.
   - **CEL expressions:** Advanced boolean expressions for complex logic.
3. **For field-based conditions:**
   - Click **New Condition** to define when alerts should trigger incidents.
   - Select the conditions on which you want alerts to be triggered:
     - Alert severity or priority
     - Service or application name
     - Environment
     - Alert message content
     - Custom alert fields
   - For each condition:
     - Select the **field** from your alert payload.
     - Select the **operator** (equals, contains, greater than, and others).
     - Enter the **value** to match against.
   - Click **Add Condition** to configure multiple conditions for the alert rule.
   - Use AND/OR operators to combine multiple conditions as needed.
4. **For CEL expressions:**
   - Toggle to **CEL mode** in the conditions section.
   - Go to [Use CEL to Route Alerts](/docs/ai-sre/alerts/alert-rules/use-cel-alert-rules) for detailed examples and configuration instructions.

### Step 3: Configure incident creation (optional)

Map matching alerts to incidents and their fields:

1. Click **Create Incident** to automatically create incidents from matching alerts.
2. Select the **Incident Type** that should be created.
3. Map alert fields to incident fields using the field mapper:
   - **Title:** Map the alert summary or message.
   - **Description:** Map detailed alert information.
   - **Severity:** Map alert severity levels.
   - **Priority:** Set incident priority based on alert data. Go to [Configure priority labels](/docs/ai-sre/incidents/severities-priorities#configure-priority-labels) to configure priority levels.
   - **Service:** Map affected service information.
   - **Environment:** Map environment details.
   - **Custom fields:** Map any additional alert data.

### Step 4: Configure on-call notifications

Page the on-call team when alerts match your conditions:

1. Click **Page Team** to automatically page the on-call team when alerts match your conditions.
2. Select the checkbox to **activate** on-call paging.
3. Select the **Impacted Services** from your service directory.
4. Select the specific **service** that will be impacted from the dropdown list.
5. Configure notification settings:
   - Which teams should be notified
   - Escalation policies to use
   - Response time expectations
   - Notification channels (email, SMS, phone, Slack, mobile app)

### Step 5: Associate runbooks (optional)

Attach automated response procedures to the rule:

1. Select the **Runbooks** tab to attach automated response procedures.
2. Click **Attach Runbook** to connect relevant runbooks to your alert rule.
3. Select the **runbook** that should be triggered when an alert or incident occurs.
4. Click **Attach Runbook** to confirm the selection.
5. These runbooks can be:
   - Automatically triggered when an incident is created
   - Suggested to responders during incident resolution
   - Used as reference documentation for AI SRE

### Step 6: Save and activate

Save the rule so it begins processing incoming alerts:

1. Review all your configurations.
2. Click **Save** from the top right corner.
3. The alert rule is created and available in your alert rules list.
4. The rule begins processing incoming alerts based on your configured conditions.

  </TabItem>
  <TabItem value="interactive-guide" label="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/a683fd0e-3783-4716-accb-304075677df1?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Route Alerts in Harness AI SRE" />

Follow this interactive guide to configure alert rules that automatically create incidents and page on-call teams.

  </TabItem>
</Tabs>

---

## Best practices

Keep these guidelines in mind when you create and maintain alert rules:

- Create specific rules for different types of alerts
- Use clear, descriptive names for your rules
- Test rules with sample alerts before activating
- Review and update rules as your services evolve
- Document your rule configurations for team reference

---

## Next steps

- [Use CEL to Route Alerts](/docs/ai-sre/alerts/alert-rules/use-cel-alert-rules): Apply advanced conditional logic.
- [Ingest Alerts](/docs/ai-sre/alerts/webhooks/overview): Receive alerts from any monitoring system.
- [Create Runbooks](/docs/ai-sre/runbooks/create-runbook): Automate alert responses.
