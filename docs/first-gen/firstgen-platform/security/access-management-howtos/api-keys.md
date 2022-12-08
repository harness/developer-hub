---
title: API Keys
description: Provide a Harness API key to integrate Harness with third-party applications via REST calls.
# sidebar_position: 2
helpdocs_topic_id: smloyragsm
helpdocs_category_id: 49yov609ez
helpdocs_is_private: false
helpdocs_is_published: true
---

To integrate Harness with some third-party apps, you need to register Harness with the app and then supply a Harness API key. The API key is a simple encrypted string that other applications can use to access Harness without a private Harness account.

Once you have generated an API key in Harness, deployment status can be tracked by making a REST call to Harness. For more information, see [Get Deployment Status using REST](../../../continuous-delivery/model-cd-pipeline/triggers/get-deployment-status-using-rest.md).

### Create an API Key

The following procedure creates, copies, and deletes an API Key.

To use a Harness API key, do the following:

1. In Harness Manager, click **Security**, and then click **Access Management**.
2. Click **API Keys**.
3. Click **Add API Key**.
4. In the **Add API Key** settings, enter a name and select your User Group.
5. Click **Submit**. The new API key is created.
6. To copy the API key, first click the Eye icon to reveal the key's value.
7. Next, click the Copy icon beside the key. This copies the key's value to your clipboard.
8. To delete an API key, click the **Delete** icon.

### Edit an API Key

To edit a Harness API key, do the following:

1. In Harness Manager, click **Security**, and then click **Access Management**.
2. Click **API Keys**.
3. Click the **Edit** icon beside the key. The **Edit API Key** settings appear.
4. Edit the API key and click **Submit**.

### Use an API Key and REST

You can use a RESt call to track the details of your Harness deployments. An API key is required in the call header in the REST call to Harness. The API key uniquely identifies your Harness account and authorizes access to your account data.

Once you have generated an API key in Harness, deployment status can be tracked by making a REST call to Harness. For more information, see [Get Deployment Status using REST](../../../continuous-delivery/model-cd-pipeline/triggers/get-deployment-status-using-rest.md).

### Troubleshooting

The Harness API has a usage rate limit of **1 query per second per API Key**. If the rate limit is reached, you will receive this response in the API call:


```
Too Many requests. Throttled. Max QPS: 1.0
```
