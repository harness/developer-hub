---
title: Troubleshoot failed triggers
description: Troubleshoot failures of your registered triggers in the Harness platform.
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


You can troubleshoot failures of your cURL or webhook initiated triggers in the Harness platform.

After a trigger runs, you can use the **Trigger Explorer** to troubleshoot cURL or webhook initiated failures. For cURL, you enter the `eventCorrelationId` from the response. For webhooks, you enter the `data` value from the webhook response payload.

## Troubleshoot webhook failures

To troubleshoot webhook failures, do the following:


<Tabs>
  <TabItem value="cURL trigger" label="cURL trigger">


1. Open your Harness pipeline in Pipeline Studio.
2. Select **Triggers**.
3. Select **Trigger Explorer**.
4. Select **Webhook**.
5. In **Enter Event Correlation id**, enter the `eventCorrelationId` value from the cURL response payload.

   ![](./static/trigger-explorer.png)

6. Select **Search**.

   Harness returns the following information:

   - **Event Correlation Id**
   - **Trigger Name**
   - **Trigger Status**
   - **Message**
   - **Payload**

### cURL example

**Sample cURL command**

```shell
~ % curl -X POST -H 'content-type: application/json' --url 'https://app.harness.io/gateway/pipeline/api/webhook/custom/v2?accountIdentifier=<YOUR_ACCOUNT_ID>&orgIdentifier=default&projectIdentifier=CD_Docs&pipelineIdentifier=tweety&triggerIdentifier=Custom' -d '{"sample_key": "sample_value"}'
```

**Sample response**

```json
{"status":"FAILED","data":{"eventCorrelationId":"64e3e215d2bb844cfab9e155","apiUrl":"https://app.harness.io/gateway/pipeline/api/webhook/triggerExecutionDetails/64e3e215d2bb844cfab9e155?accountIdentifier=<YOUR_ACCOUNT_ID>","uiUrl":"https://app.harness.io/ng/#/account/<YOUR_ACCOUNT_ID>/cd/orgs/default/projects/CD_Docs/deployments?pipelineIdentifier=tweety&page=0","uiSetupUrl":"https://app.harness.io/ng/#/account/<YOUR_ACCOUNT_ID>/cd/orgs/default"}}
```

In this example, you enter the `eventCorrelationId` value in the **Search** field.



</TabItem>
  <TabItem value="Webhook trigger" label="Webhook trigger">


1. Open your Harness pipeline in Pipeline Studio.
2. Select **Triggers**.
3. Select **Trigger Explorer**.
4. Select **Webhook**.
5. In **Enter Event Correlation id**, enter the `data` value from the webhook response payload.

   ![](./static/trigger-explorer.png)

6. Select **Search**.

   Harness returns the following information:

   - **Event Correlation Id**
   - **Trigger Name**
   - **Trigger Status**
   - **Message**
   - **Payload**

### Webhook example

The pipeline below runs when a repo has a PR.

This example uses the [tweety repo](https://github.com/michaelcretzman/linux_tweet_app).

**Sample pipeline URL**

`https://app.harness.io/ng/account/\<YOUR_ACCOUNT_ID>/cd/orgs/default/projects/CD_Docs/pipelines/tweety/executions?storeType=INLINE`

**Sample response**

```json
{"status":"FAILED","data":"64e3e5b58cdd8704d75bd99d","metaData":null,"correlationId":"1a75bbef-862c-469e-b8ab-e06dd95e4999"}
```

In this example, you enter the `data` value in the **Search** field.


</TabItem>
</Tabs>


## Troubleshoot Git event triggers

For more troubleshooting information specific to Git event triggers, go to [Trigger pipelines using Git events](/docs/platform/triggers/triggering-pipelines.md).