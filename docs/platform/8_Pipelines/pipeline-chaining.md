---
title: Pipeline chaining in Harness
description: Chain your pipelines in Harness to create complex workflows.
sidebar_position: 12
---


:::note
Currently, this feature is behind the feature flag `PIPELINE_CHAINING`. Contact Harness Support to enable the feature.
:::


Pipeline chaining involves using the output of one pipeline as input for another. You can link multiple processing steps together and execute them sequentially, creating a more complex workflow.

In Harness, you can create a pipeline chain by linking pipelines together using a pipeline trigger. A pipeline trigger is a specific event or condition that triggers the next pipeline in the chain. 

For example, you could have a pipeline that deploys an application to a test environment. This is followed by another pipeline that runs a set of integration tests, and finally another pipeline that deploys the application to production. Each pipeline in the chain is triggered by the completion of the previous pipeline. The output of each pipeline is passed on to the next pipeline in the chain. This way, you can automate the whole process and make sure that the application is deployed and tested properly before deploying to production.

## Important

- Make sure you have read permissions for the child pipeline and edit permissions for the parent pipeline to add a pipeline stage to a parent pipeline.

- Whenever you change the runtime input fields in a chained pipeline, select **Inputs** in the parent pipeline to see the changes.

- The run pipeline form does not support validation of child pipelines during the pre-flight check of the parent pipeline.

- At this time, you cannot define a matrix strategy in the pipeline stage of the parent pipeline.

- The pipeline stage does not support auto expressions in **Outputs**.



## Benefits of pipeline chaining

Chaining pipelines in Harness offers the following benefits:

- Development of complex workflows involving multiple stages of deployment, testing, and verification.

- Ease of handling errors. Visibility into the deployment process makes it easier to identify and troubleshoot issues.

- Faster and more efficient deployment.

- Reusability of the pipeline across multiple applications and environments, reducing the need to recreate the same steps for each deployment.

- Improved collaboration and communication by allowing different teams to work on different stages of the deployment process. 

- Enable greater compliance with regulatory requirements and industry best practices through automatic deployments.

## Chain pipelines 
To chain pipelines in Harness, perform the following steps: 

1. Create your parent [pipeline](../8_Pipelines/add-a-stage.md#step-1-create-a-pipeline) and configure it with the desired settings, such as triggers, environment variables, and deployment steps.

2. Select **Add Stage** and then select **Pipeline**.
   
   ![](./static/pipeline-chain-option.png)

3. Select the pipeline from the list. You can select any pipeline across different orgs and projects corresponding to your access and permissions and chain it to your parent pipeline.
   
   For more information on access, see [Role-based access control](../4_Role-Based-Access-Control/1-rbac-in-harness.md)

   ![](./static/pipeline-chain-list.png)

4. Click **Apply Selected**.

5. To use the output of a child pipeline in subsequent stages of the parent pipeline, click **Outputs**.

   The variables you select in the output tab can be referred to at a later stage.

   For example, you can use the build image in a subsequent deployment stage.
   
   :::note
   The outputs tab does not support auto suggestions. To use the child execution expression in the parent pipeline, you must manually copy it.
   :::
   

6. Repeat this process for any additional pipelines that you want to chain.

7. In the final chained pipeline, you can add a **Deploy** step to deploy the application to the desired environment.
   After you have chained the pipelines, you can run the parent pipeline.
   
Harness recommends testing the pipeline before executing it in production.
