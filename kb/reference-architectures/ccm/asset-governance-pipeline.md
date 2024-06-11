---
title: Asset Governance + Pipelines
description: Trigger a pipeline with Asset Governance
---

# Overview

Using the [webhook action](https://cloudcustodian.io/getting-started/actions/) from Cloud Custodian we can trigger a Harness pipeline to do additional actions on asset governance findings.

## Setup

This guide assumes you have CCM set up correctly for asset governance for at least one cloud account.

## Pipeline Setup

Create a pipeline in some Harness project. On the right hand side select "variables" and under "pipeline" and "custom variables" select "+ Add Variable". Create variables "account_id", "region", and "resource" all of type "runtime input". When creating a variable select the blue checkmark and select the purple "Runtime Input" icon to make it a runtime input.

![](../static/ccm_asset_governance_pipeline_runtime.png)

![](../static/ccm_asset_governance_pipeline_variables.png)

Create a new custom stage, and add a shell script step. In the script let's simply print out the variables we just created:

```
echo '<+pipeline.variables.account_id>'
echo '<+pipeline.variables.region>'
echo '<+pipeline.variables.resource>'
```

![](../static/ccm_asset_governance_pipeline_script.png)

Next click on "Triggers" in the top right and select "+ New Trigger" and select the 'Custom' Webhook type. Give the trigger a name and click continue. Skip the conditions section by clicking continue. For the inputs to our three variables, enter the following:

- account_id: `<+trigger.header['account-id']>`
- region: `<+trigger.header['region']>`
- resource: `<+eventPayload>`

![](../static/ccm_asset_governance_pipeline_trigger.png)

Click "Create Trigger". On the triggers screen, select the "WEBHOOK" icon and copy the webhook URL.  Store this URL somewhere, it will be used later.

![](../static/ccm_asset_governance_pipeline_webhook.png)

## Rule Setup

Navigate to CCM and select the "Asset Governance" feature. Select "Rules" in the top right and press "+ New Rule".

Let's take an example rule for detecting unattached EBS instances:

```
policies:
  - name: find-unattached-ebs
    resource: ebs
    filters:
      - Attachments: []
      - State: available
```

We want to add an action to call our pipeline webhook:

```
policies:
  - name: find-unattached-ebs
    resource: ebs
    filters:
      - Attachments: []
      - State: available
    actions:
      - type: webhook
        url: https://app.harness.io/gateway/pipeline/api/webhook/custom/v2
        batch: true
        method: POST
        body: resources
        headers:
          account-id: account_id
          region: region
```

In this example, we are:
    1. Calling our pipeline trigger
    2. Passing the account and region of our results in the headers
    3. Setting the body that includes all the resources found

Replace the url with the webhook url we copied earlier

If you instead want to call the webhook once for every resource found, simply set `batch` to `false`.

## Execute

Now when we run the rule (not in dry-run mode) and when a resource is found, asset governance will call our pipeline custom trigger and pass the metadata. Navigate to "Execution History" on the top right.  Click on one of the executions and see the information printed in the logs.

![](../static/ccm_asset_governance_pipeline_result.png)

From here you can expand your pipeline to do any number of actions based on the information received. 
