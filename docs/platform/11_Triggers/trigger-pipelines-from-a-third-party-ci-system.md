---
title: Trigger pipelines from a third-party CI system
description: Trigger pipelines from a non-Harness CI system.
sidebar_position: 6
---

Run pipleines from any third-party CI system using a custom webhook trigger cURL command. 

## Requirements

Make sure you have: 
* A pipeline with a CD stage.
* An artifact in an artifact repository.

## Configure runtime input for your artifact tag and image path for a stage

1. Select the pipeline you want to trigger and select the appropriate stage.
2. On the **Service** tab, select the pencil icon next to the service name.
3. On the **Edit Service** dialog, scroll down to the **Artifacts** section and select the pencil icon.
  
   ![](./static/edit-artifacts.png)
   
4. Verify if the appropriate artifact repository type is selected, then select **Continue**.
5. Verify if the appropriate artifact connector is selected, then select **Continue**. 
6. In **Artifact Location** > **Artifact Details**, select **Runtime input** for the **Image Path** and **Tag** fields.
   
   ![](./ctatic/../static/edit-artifact-details.png)

7. Select **Submit**.
   
## Create a custom trigger

1. In your pipeline, select **Triggers** at the top right portion of the page.

    ![](./static/pipeline-trigger.png)
   
2. Select **New Trigger**.
3. In **Webhook**, select **Custom**.
   
    ![](./static/trigger-deployments-using-custom-triggers-01.png)

4. Name the new trigger, then select **Continue**.
   
    ![](./static/custom-webhook-trigger-configuration.png)

5. **(Optional)** Specify the **Conditions** for running the pipeline and select **Continue**. 
   
    For example, execute the pipeline if the source or target branch name matches a pattern.

    ![](./static/custom-webhook-trigger-conditions.png)

6. In the **Pipeline Input** tab, define payloads for the **Image Path** and **Tag** fields so that Harness can map them later when running the trigger.

    ![](./static/custom-webhook-trigger-piepline-input.png)

7. Select **Create Trigger**. 
   
## Trigger the pipeline from a thrid-party CI system

1. Locate the trigger you created, select the link in the **Webhook** column and select **Copy as cURL Command**.

    ![](./static/webhook-trigger-copy-curl-command.png)
    
2. Paste the cURL command in an editor and edit the body fields to provide the payload information.

   To avoid format issues, we recommend that you use VS Code or Sublime Text to edit the payload information before running the command in a Terminal.

   Below is a sample cURL command with image and tag fields.
   
    ```
    curl -X POST -H 'content-type: application/json' -H 'X-Api-Key: sample_api_key' --url 'https://app.harness.io/gateway/pipeline/api/webhook/custom/v2?accountIdentifier=<your_account_identifier>&orgIdentifier=default&projectIdentifier=CD_Docs&pipelineIdentifier=Container&triggerIdentifier=Trigger_to_CI' -d '{"image": "library/nginx", "tag":"stable"}'
    ```

    The `-H 'X-Api-Key: sample_api_key'` parameter is used to authorize custom triggers. You can use [Harness API keys](../4_Role-Based-Access-Control/7-add-and-manage-api-keys.md) with this parameter. For more information, go to [Custom trigger authorization using API keys](#custom-trigger-authorization-using-api-keys).

2. Run the updated cURL command in a Terminal. 

    Sample success message:
 
    ```
    {
        "status":"SUCCESS",
        "data":{
            "eventCorrelationId":"<event_correlation_id>",
            "apiUrl":"https://app.harness.io/gateway/pipeline/api/webhook/triggerExecutionDetails/<event_correlation_id>?accountIdentifier=<account_identifier>",
            "uiUrl":"https://app.harness.io/ng/#/account/<account_identifier>/cd/orgs/default/projects/CD_Docs/deployments?pipelineIdentifier=<pipeline_name>&page=0",
            "uiSetupUrl":"https://app.harness.io/ng/#/account/<account_identifier>/cd/orgs/default/projects/CD_Docs/pipelines/<pipeline_name>/pipeline-studio/"
        },
        "metaData":null,
        "correlationId":"<correlation_id>"
    }
    ```
   
3. Go to **Deployments** to see the pipeline triggered by your custom webhook trigger.
