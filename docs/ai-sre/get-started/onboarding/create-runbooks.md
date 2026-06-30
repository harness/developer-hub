---
title: Create Your First Runbook
description: Automate incident response actions and provide step-by-step guidance for responders.
sidebar_label: Create Runbooks
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocVideo from '@site/src/components/DocVideo';

# Create Your First Runbook

Runbooks automate incident response actions and provide step-by-step guidance for responders.

## Create a Runbook

<Tabs groupId="ai-sre-setup" queryString>
  <TabItem value="Step by Step" label="Step by Step" default>

### Create the Runbook

1. Navigate to **Runbooks** from the left pane
2. Click on **New Runbook**
3. Fill the creation form with the details:
   - Fill in the runbook details
   - Click on **Save**

### Add First Action

1. Click on **New Action**
2. Select the action from the categories you want to add in your runbook. The actions have been classified into different categories based on the use case
3. Select the action:
   - Select the action
   - Click on **Select**

### Configure Action

1. Fill the details for the selected action
2. Click on **Save**

### Add More Actions

Once saved, you can add more actions:

1. Click on **New Action**
2. Then, **Select Action** and repeat the steps and save

### Add Triggers (Optional)

Additionally, you can add triggers for your runbooks. Click on **Triggers** (this step is optional).

1. Click on **New Trigger**
2. Select the **Incident type** from the dropdown with which you want to attach the runbook
3. Define the **condition of the trigger**
4. Click on **Save** from the top right

  </TabItem>
  <TabItem value="Interactive Guide" label="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/48a2f0ca-d07f-4395-aa7b-9b5c2c7b9018?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create runbook in AI SRE" />

Automate response actions and guide responders step-by-step during incidents.

  </TabItem>
</Tabs>

---

## Next Steps

- Go to [Expression Languages](./expression-languages.md) to learn about CEL and Mustache for dynamic content.
- Go to [Create Runbooks](/docs/ai-sre/runbooks/create-runbook) for advanced runbook configuration.
- Go to [Configure Runbook Triggers](/docs/ai-sre/runbooks/triggers/overview) to automate runbook execution.
