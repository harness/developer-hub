---
title: Rollback deployments
description: Rollback your most recent successful deployment.
sidebar_position: 3
---

:::info

Currently, this feature is behind the feature flag, `POST_PROD_ROLLBACK`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Rollback deployment initiates a rollback of your most-recent successful deployment. This allows rapid, predictable recovery from a deployment that succeeded on technical criteria, but that you want to undo for other reasons.

## Important notes

* Rollback deployment is currently supported for the following deployment types only: 
  - Kubernetes
  - Tanzu Application Services (TAS)
  - Amazon Elastic Container Service (ECS)

    Harness anticipates expanding this feature to other deployment types in the future.
* You can rollback successful pipelines only. The rollback option is not available for failed pipelines.
* Only the rollback steps that are part of the stage can be rolled back.
* You cannot rollback the same pipeline multiple times. You can perform rollback if the pipeline is executed again.
* If the pipeline configuration has changed between executions, the previous execution YAML is used as reference to rollback.
* You can refer expressions used in a step executed during the pipeline execution in the deployment rollback step. The expressions are automatically resolved with values from the original execution in the deployment rollback step.
* The stages should rollback in reverse order when rollback deployment is triggered. 

## Rollback deployments

Harness assumes that you have created a pipeline with multiple deployments so that the rollback step can roll the pipeline back to the last successful deployment when triggered. For more details on creating a pipeline, go to [Create your first CD pipeline](/docs/continuous-delivery/get-started/create-first-pipeline).

1. Open your [services dashboard](https://developer.harness.io/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments#individual-service-dashboards).
2. In **Summary**, in the **Environments & Groups** panel, select the deployment you want to rollback, and then select the instances link.
   
   Let's see an example pipeline where the artifacts, `library/nginx:stable-perl` is deployed first, and `library/nginx:stable-bullseye-perl` is deployed next.

   ![](./static/rollback-deployments-1.png)
3. In **Instance Details**, select **Rollback**.
   
   ![](./static/rollback-deployments.png)

   Here, you're rolling back the deployed instance with the artifact, `library/nginx:stable-bullseye-perl` to the previously deployed instance with artifact, `library/nginx:stable-perl`.
4. In the **Rollback infrastructure** dialog, select **Confirm**.
   
   The pipeline execution for rollback stage appears in a new tab.
   ![](./static/rolling-deployments-2.png)

   Once the rollback is complete, your deployed instances will return to the state they were in before the most recent deployment.

   ![](./static/rollback-deployment-3.png)
