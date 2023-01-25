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

For example, you could have a pipeline that deploys an application to a test environment. This is followed by another pipeline that runs a set of integration tests, and finally another pipeline that deploys the application to production. Each pipeline in the chain is triggered by the completion of the previous pipeline. The output of each pipeline is passed on to the next pipeline in the chain. This way you can easily automate the whole process and make sure that the application is deployed and tested properly before deploying to production.

## Important

- Make sure you have read permissions for the child pipeline and edit permissions for the parent pipeline to add a pipeline stage to a parent pipeline.

- Whenever you change the runtime input fields in a chained pipeline, select **Inputs** in the parent pipeline to see the changes.

- The run pipeline form does not support validation of child pipelines during the pre-flight check of the parent pipeline.

- At this point, there is no matrix on the parent pipeline at the pipeline stage.

- Pipeline stage does not support auto expressions in **Outputs**.



## Benefits of pipeline chaining

- Automation: Pipeline chaining allows you to automate the deployment process and make sure that the application is deployed and tested properly before deploying to production.
 
- Creation of complex workflows: It allows you to create complex workflows that involve multiple stages of deployment, testing, and verification.
 
- Error Handling: You can easily handle errors and rollback to previous stages in case of any issues.
 
- Visibility: It provides better visibility into the deployment process and makes it easier to identify and troubleshoot issues.
 
- Enhanced efficiency: By automating the deployment process, pipeline chaining can improve the efficiency and speed of deployments.
 
- Reusability: The pipelines can be reused across multiple applications and environments, reducing the need to recreate the same steps for each deployment.
 
- Better collaboration: By separating deployments into smaller, manageable stages, pipeline chaining allows different teams to work on different stages of the deployment process, improving collaboration and communication.
 
- Better compliance: By automating the deployment process, pipeline chaining can help to ensure compliance with regulatory requirements and industry best practices.

## Chain pipelines 
To chain pipelines in Harness, perform the following steps: 

1. Create a [pipeline](../8_Pipelines/add-a-stage.md#step-1-create-a-pipeline) and configure it with the desired settings, such as triggers, environment variables, and deployment steps.
   This is your parent pipeline.
2. Select **Add Stage** and then select **Pipeline**.
   
   ![](./static/pipeline-chain-option.png)

3. Select the pipeline from the list. You can select any pipeline across different orgs and projects corresponding to your access and permissions and chain it to your parent pipeline.
   
   For more information on access, see [Role-based access control](../4_Role-Based-Access-Control/1-rbac-in-harness.md)

   ![](./static/pipeline-chain-list.png)

4. Click **Apply Selected**.

5. You can use outputs from child pipelines in other stages in parent pipelines by clicking **Outputs**.
   The variables you select in the output tab can be referred to at a later stage.

   For example, you can use the build image in the subsequent deployment stage.
   
   :::note
   The outputs tab does not support auto suggestions. To use the child execution expression in the parent pipeline, you must manually copy it.
   :::
   

6. Repeat this process for any additional pipelines that you want to chain.

7. In the final pipeline, you can add a **Deploy** step to deploy the application to the desired environment.
   You can also add "Rollback" step in case of any failure.
   Once you have completed chaining the pipelines, you can run the parent pipeline to start the process.
   
Harness recommends testing the pipeline before executing it in production.
