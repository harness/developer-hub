---
sidebar_position: 5
title: Pipeline Triggers
description: Tutorial to get started with Triggers in Harness Pipelines.
---

This tutorial will help you to get started with Docker Registry Artifact triggers in Harness pipelines.

:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-kubernetes-manifest).

:::

## Why use triggers?

Triggers in a Harness Continuous Delivery (CD) pipeline are used to automatically initiate pipeline stages or actions based on specific events or conditions, such as Git events, new Helm Charts, new artifacts, or specific time intervals. Triggers in Harness CD enable faster feedback cycles, enhanced efficiency, and decreased reliance on manual intervention during the deployment process.


## Before you begin

Verify the following:

- **Existing Harness CD pipeline.** If you are a new user or haven't created a pipeline yet, then kindly check our [CD tutorials](/tutorials/cd-pipelines) to create one.
- **Existing Docker connector with Credential Type Credential Type `Username and Password`**.
    - If you are a new user or haven't created a Docker connector yet, then kindly follow the steps in [Docker Connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) to create new one.

## Implement a trigger using Docker Hub Artifact


1. Log into [Harness](https://app.harness.io/).
2. Select **Projects**, and then select **Default Project**.

    :::caution

    For the pipeline to run successfully, please follow all of the following steps as they are, including the naming conventions.

    :::
3. In **Default Project**, select **Pipelines**.
    - Select an existing pipeline or create a new pipeline by following any of our CD tutorials.
    - Choose the CD Stage

### Let's Start by Making the Modifications to the CD Stage to Implement Docker Registry Artifact Trigger

4. Now, in the **Harness Service** to the CD stage, you can set the artifact tag to use in Artifacts Details.
    - Go to **Service** tab and click on edit icon of the Service where we want to add Artifact details.
    - Under **Artifacts**, ensure you have selected Artifact Repository Type **Docker Registry**.
    - Click **Continue** and choose the created **Docker Connector**
    - In the next step, enter a name for this artifact and enter the name of the artifact image you want to deploy.
        - Now for the **Tag**, change it to type **Expressions** and type `<+trigger.artifact.build>`
        - With `<+trigger.artifact.build>`, the pipeline will deploy the artifact image version that initiated the trigger.
    - To deploy this artifact image, you just need to reference it in the stage's service definition in your manifests using the expression `<+artifact.image>`. For more details, go to [Add Container Images as Artifacts for Kubernetes Deployments](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments/).

### Create a Docker Registry Artifact Trigger

5. Choosing the above modified pipeline, select **Triggers**.
    - Select **New Trigger** and choose **Docker Registry** under **Artifact**.
    - Now, toggle to **YAML** to use the YAML editor.
    - Copy the contents of [docker-trigger.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/triggers/docker-trigger.yml) and paste it into the YAML editor.
    - In the YAML, replace **ORGANIZATION_ID**, **PROJECT_ID**, **PIPELINE_ID**, **DOCKER_CONNECTOR**, **MAINTAINER/IMAGE**, **CD_STAGE_ID** and **ARTIFACT_ID** with the organization identifier, project identifier, pipeline identifier, Docker connector identifier, name of the artifact you want to deploy (eg: `library/nginx`), CD Stage identifier in the pipeline and the Artifact identifier which you'll get from the Service associated with the Pipeline.
    - Finally, select **Create Trigger** and observe that the status is in _pending_ state as Harness starts collecting the tags information from the registry.

        <docimage path={require('./static/triggers/docker-trigger.png')} width="80%" height="80%" title="Click to view full size image" />
    
    - You can also switch to the **Visual** editor and confirm the trigger steps.

        <docimage path={require('./static/triggers/docker-trigger-success.png')} width="80%" height="80%" title="Click to view full size image" />

6. Finally, build and push a new artifact image to the mentioned Docker registry, and voila! Observe the pipeline being triggered and deploying the new image.

### Congratulations!🎉

You've just learned how to implement triggers in a Harness CD pipeline.

#### What's Next?

- Keep learning about Harness CD.
- Visit the [Harness Developer Hub](https://developer.harness.io/) for more tutorials and resources.
