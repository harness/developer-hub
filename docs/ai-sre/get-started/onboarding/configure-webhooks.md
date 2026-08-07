---
title: Configure Your First Webhook
description: Enable external tools to automatically create alerts and incidents in AI SRE.
sidebar_label: Configure Webhooks
sidebar_position: 4
keywords:
  - webhooks
  - integrations
  - alerts
  - onboarding
tags:
  - ai-sre
  - getting-started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocVideo from '@site/src/components/DocVideo';

Webhooks enable external tools to automatically create alerts and incidents in AI SRE.

## Before you begin

- **AI SRE access:** A Harness project with AI SRE enabled. Go to the [AI SRE onboarding guide](/docs/ai-sre/get-started/onboarding/overview) to review prerequisites.
- **External tool access:** Permission to configure webhook notifications in the tool that sends events.

## Create a webhook

<Tabs groupId="ai-sre-setup" queryString>
  <TabItem value="Step by Step" label="Step by Step" default>

### Create the integration

Create the webhook integration in AI SRE:

1. Click on **Integrations**
2. Click on **New Integration**
3. Fill in the details for the webhook:
   - You can select the type, **Incident**, **Alert**, **Deployment**, **Build**
   - Select the **Template type** from the dropdown list
   - Click on **Save**

### Copy the webhook URL

Once the integration is saved, you will receive a **URL** that you can configure on the application with which you want the integration to happen. This step varies from tool to tool, and can be checked in the documentation of those applications.

### Configure the payload

Next, click on **Payload Configuration**:

1. You will get the default values of the payload configuration for the template you have selected
2. You can wish to add more data from the configuration by clicking on the **checkbox** and extracting it
3. Click on **Next** on the bottom of the page

### Map fields

You will be able to view the **Mapped Fields** which you have selected in the previous step:

1. You can fill in the values on the mapped fields simply by **dragging and dropping** from the saved fields pane

### Add custom fields (optional)

You can also add any **custom fields** that you want in your integration payload:

1. Just simply scroll down and select **Add Field**
2. Fill the details of the custom field and hit **Save**
3. **Drag and drop** the values from the saved fields to the custom field placeholder added. You can choose to manually add it or use the **Data picker** too
4. Click on **Next**

### Test the integration

You can now **test the integration** with the cURL command. The POST request contains the endpoint URL which will be used for the integration.

### Save the integration

Finally, click on **Save** on the top right. The integration is ready.

  </TabItem>
  <TabItem value="Interactive Guide" label="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/f14f004b-3405-4384-baae-48a035a8eb12?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Configure webhooks in Harness AI SRE" />

Send events from external tools, like alerts, builds, deployments, and config changes. Categorize them to track and respond effectively.

  </TabItem>
</Tabs>

---

## Next steps

- Go to [Create Runbooks](/docs/ai-sre/get-started/onboarding/create-runbooks) to automate incident response workflows.
- Go to [Configure Webhooks](/docs/ai-sre/alerts/webhooks/overview) for detailed webhook configuration.
