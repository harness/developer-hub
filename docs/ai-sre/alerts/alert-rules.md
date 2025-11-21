---
title: Configure Alert Rules
description: Learn how to configure alert rules in Harness AI SRE to route, filter, and enrich incoming alerts.
sidebar_label: Alert Rules
sidebar_position: 4
redirect_from:
- /docs/incident-response/alerts/alert-rules
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Alert Rules

Alert Rules define how incoming alerts are processed and when incidents should be created. This guide walks you through configuring alert rules in Harness AI SRE.

## Overview

Alert rules help you:
- Create incidents from incoming alerts
- Map alert data to incident fields
- Set up automated responses
- Configure Harness AI SRE on-call notifications and paging
- Associate relevant runbooks for automated response



## Configuration Steps

<Tabs groupId="alert-rules-setup" queryString>
  <TabItem value="interactive-guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/a683fd0e-3783-4716-accb-304075677df1?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Configure Alert Rules in Harness AI SRE" />

Follow this interactive guide to configure alert rules that automatically create incidents and page on-call teams.

  </TabItem>
  <TabItem value="step-by-step" label="Step by Step">

### Step 1: Access Alert Rules

1. From the main menu, select **Alerts**
2. Click **Alert Rules**
3. Click **New Alert Rule**

### Step 2: Configure Integration & Conditions

1. Under **Integration & Conditions**, select the source integration from your connected monitoring tools
2. Click **New Condition** to define when alerts should trigger incidents
3. Select the conditions on which you want alerts to be triggered:
   - Alert severity or priority
   - Service or application name
   - Environment
   - Alert message content
   - Custom alert fields
4. For each condition:
   - Select the **field** from your alert payload
   - Choose the **operator** (equals, contains, greater than, etc.)
   - Enter the **value** to match against
5. Click **Add Condition** to configure multiple conditions for the alert rule
6. Use AND/OR operators to combine multiple conditions as needed

### Step 3: Configure Incident Creation (Optional)

1. Click **Create Incident** to automatically create incidents from matching alerts
2. Select the **Incident Type** that should be created
3. Map alert fields to incident fields using the field mapper:
   - **Title**: Map alert summary or message
   - **Description**: Map detailed alert information
   - **Severity**: Map alert severity levels
   - **Priority**: Set incident priority based on alert data
   - **Service**: Map affected service information
   - **Environment**: Map environment details
   - **Custom fields**: Map any additional alert data

### Step 4: Configure On-Call Notifications

1. Click **Page Team** to automatically page the on-call team when alerts match your conditions
2. Select the checkbox to **activate** on-call paging
3. Select the **Impacted Services** from your service directory
4. Choose the specific **service** that will be impacted from the dropdown list
5. Configure notification settings:
   - Which teams should be notified
   - Escalation policies to use
   - Response time expectations
   - Notification channels (email, SMS, phone, Slack, mobile app)

### Step 5: Associate Runbooks (Optional)

1. Click on the **Runbooks** tab to attach automated response procedures
2. Click **Attach Runbook** to connect relevant runbooks to your alert rule
3. Select the **runbook** that should be triggered when an alert or incident occurs
4. Click **Attach Runbook** to confirm the selection
5. These runbooks can be:
   - Automatically triggered when an incident is created
   - Suggested to responders during incident resolution
   - Used as reference documentation for AI SRE

### Step 6: Save and Activate

1. Review all your configurations
2. Click **Save** from the top right corner
3. The alert rule will be created and available in your alert rules list
4. The rule will begin processing incoming alerts based on your configured conditions

  </TabItem>
</Tabs>

## Best Practices

- Create specific rules for different types of alerts
- Use clear, descriptive names for your rules
- Test rules with sample alerts before activating
- Review and update rules as your services evolve
- Document your rule configurations for team reference

## Next Steps

- [Configure Webhooks](./webhooks.md)
- [Create Runbooks](../runbooks/create-runbook.md)
