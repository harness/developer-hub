---
title: Set Up Your First Incident Type
description: Define incident types to standardize your incident response process.
sidebar_label: Set Up Incident Types
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocVideo from '@site/src/components/DocVideo';

# Set Up Your First Incident Type

Define incident types for your teams to standardize your response process by defining severity levels, response teams, and escalation procedures.

## Create Incident Types

<Tabs groupId="ai-sre-setup" queryString>
  <TabItem value="Step by Step" label="Step by Step" default>

### Create an Incident Type

1. Navigate to **Incidents**
2. Click on **Incident Types**
3. Click on **Create Incident Type**
4. Fill details in the form with the incident type information
5. Click on **Save**

### Configure Incident Fields

Once the incident type is created, you can configure the incident fields:

1. Check the **Default Fields** and **Custom fields**, and update them as per the requirements
2. Click on the **edit icon** to check the default fields
3. You can set **Optional fields** as **Required**
4. Click on **Save**

### Add Custom Fields

Click on **Add Custom Field** to add any extra fields as part of the incident creation form:

1. Fill in the details of the additional field
2. Hit **Save**

### Configure Creation Form

Click on **Creation Form**:

1. By default, you will have a creation form for the selected fields from the left pane
2. Click on the **checkbox** to add any more fields to the form as per your requirements

### Test Your Incident Type

Test your incident type:

1. Fill in the details of the incident in text fields
2. Type or fill from the dropdown options
3. Click on **Create** to make a new incident of the new incident type
4. Hit **Save** from the top right

### Add Runbooks (Optional)

Additionally, you can add **runbooks** to your incident type for automated response workflows.

  </TabItem>
  <TabItem value="Interactive Guide" label="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/50543ebc-97c8-4b92-86c2-bc19cd4fc230?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Set up your incident types" />

Define incident types to standardize severity levels, responders, and escalation paths.

  </TabItem>
</Tabs>

---

## Next Steps

- Go to [Configure Webhooks](./configure-webhooks.md) to enable external tools to create alerts.
- Go to [Customize Severity & Priority Labels](/docs/ai-sre/incidents/severities-priorities) to customize severity and priority labels.
