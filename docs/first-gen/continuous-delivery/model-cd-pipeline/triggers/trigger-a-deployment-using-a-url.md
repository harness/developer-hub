---
title: Trigger a Deployment using a URL
description: For Build Workflows or a Build and Deploy Pipeline , you can trigger deployments in response to a Git event using Webhooks. This is described in Trigger Deployments using Git Events. Once you have cr…
sidebar_position: 90
helpdocs_topic_id: 3key6nybou
helpdocs_category_id: weyg86m5qp
helpdocs_is_private: false
helpdocs_is_published: true
---

For [Build Workflows](https://docs.harness.io/article/wqytbv2bfd-ci-cd-with-the-build-workflow) or a  [Build and Deploy Pipeline](https://docs.harness.io/article/0tphhkfqx8-artifact-build-and-deploy-pipelines-overview), you can trigger deployments in response to a Git event using Webhooks. This is described in [Trigger Deployments using Git Events](trigger-a-deployment-on-git-event.md).

Once you have created a Harness [On Webhook Event](trigger-a-deployment-on-git-event.md) Trigger, Harness creates a Manual Trigger for it.

You can do the following with a Manual Trigger:

* Start a deployment using a curl command. See [Trigger a Deployment using cURL](trigger-a-deployment-using-c-url.md).
* Use a REST call to get deployment status. See [Get Deployment Status using REST](get-deployment-status-using-rest.md).
* Start a deployment using a URL provided by Harness.

In this topic, we will cover triggering a deployment using a URL provided by Harness.

This option is used to execute a Build Workflow or a Build Pipeline only.

### Before You Begin

* [API Keys](https://docs.harness.io/article/smloyragsm-api-keys)
* [Build Workflows](https://docs.harness.io/article/wqytbv2bfd-ci-cd-with-the-build-workflow)
* [Build and Deploy Pipeline](https://docs.harness.io/article/0tphhkfqx8-artifact-build-and-deploy-pipelines-overview)
* [Add a Service](../setup-services/service-configuration.md)
* [Workflows](../workflows/workflow-configuration.md)
* [Add Environment](../environments/environment-configuration.md)
* [Create a Pipeline](../pipelines/pipeline-configuration.md)

### Limitations

In the **Actions** section of the Trigger, the **Deploy only if files have changed** option is available for Workflows deploying Kubernetes or Native Helm Services only.

### Step 1: Create the Git Webhook Trigger

Follow the steps in [Trigger Deployments using Git Events](trigger-a-deployment-on-git-event.md).

When you are finished, the Trigger is displayed in the Triggers list, and includes a Manual Trigger option.

![](./static/trigger-a-deployment-using-a-url-16.png)

### Step 3: Show cURL Command

The cURL command for executing a deployment is provided by every Trigger of type **On Webhook Event**.

In Triggers, locate the Trigger you want run.

Click **Manual Trigger**.

In the Manual Trigger settings, click **Show Curl Command**. The cURL command is displayed.

When you created a Trigger, if you selected values for parameters that are represented by placeholders in the cURL command, you do not need to add values for the cURL placeholders.

If you add values for the cURL placeholders, you will override manual settings in the Trigger.

This is also true for Triggers that execute templated Workflows and Pipelines. If you create a Trigger that executes a templated Workflow or Pipeline, you can select values for the templated settings in the Trigger, but you can still override them in the cURL command.

Let's look at a placeholder example:


```
curl -X POST -H 'content-type: application/json' \  
 --url https://app.harness.io/api/webhooks/xxxxxx \  
 -d '{"application":"xxxxxx","artifacts":[{"service":"micro-service","buildNumber":"micro-service_BUILD_NUMBER_PLACE_HOLDER"}]}'
```
For `service`, enter the name of the Harness Service.

For `buildNumber`, enter the artifact build number from the Artifact History in the Service.

[![](./static/trigger-a-deployment-using-a-url-17.png)](./static/trigger-a-deployment-using-a-url-17.png)

For example:


```
curl -X POST -H 'content-type: application/json' \  
 --url https://app.harness.io/api/webhooks/xxxxxx \  
 -d '{"application":"xxxxxx","artifacts":[{"service":"Service-Example","buildNumber":"1.17.8-perl"}]}'
```
### Step 3: Run the cURL Command

Once you have replaced the placeholders, run the cURL command.

The output will be something like this (private information has been replaced with **xxxxxx**):


```
{  
 "requestId":"-tcjMxQ_RJuDUktfl4AY0A",  
 "status":"RUNNING",  
 "error":null,  
 "uiUrl":"https://app.harness.io/#/account/xxxxxx/app/xxxxxx/pipeline-execution/-xxxxxx/workflow-execution/xxxxxx/details",  
 "apiUrl":"https://app.harness.io/gateway/api/external/v1/executions/-xxxxxx/status?accountId=xxxxxx&appId=xxxxxx"  
 }  

```
The **uiUrl** can be used directly in a browser. **apiUrl** can be used to track deployment status programmatically, such as using a REST call.

### Step 4: View Deployment Using the URL

The **uiUrl** from the cURL command output can be used directly in a browser.

To run a deployment from a browser, paste the URL from **uiUrl** into the browser location field and hit **ENTER**.

The browser will open **app.harness.io** and display the running deployment.

### Configure As Code

To see how to configure the settings in this topic using YAML, configure the settings in the UI first, and then click the **YAML** editor button.

### Related Topics

* [Passing Variables into Workflows from Triggers](../expressions/passing-variable-into-workflows.md)
* For information on using Triggers as part of Harness Git integration, see [Onboard Teams Using Git](../../harness-git-based/onboard-teams-using-git-ops.md).
* [Trigger Deployments When a New Artifact is Added to a Repo](trigger-a-deployment-on-new-artifact.md)
* [Schedule Deployments using Triggers](trigger-a-deployment-on-a-time-schedule.md)
* [Trigger Deployments when Pipelines Complete](trigger-a-deployment-on-pipeline-completion.md)
* [Get Deployment Status using REST](get-deployment-status-using-rest.md)
* [Trigger a Deployment when a File Changes](trigger-a-deployment-when-a-file-changes.md)
* [Trigger Deployments using Git Events](trigger-a-deployment-on-git-event.md)
* [Trigger a Deployment using cURL](trigger-a-deployment-using-c-url.md)
* [Pause All Triggers using Deployment Freeze](freeze-triggers.md)

