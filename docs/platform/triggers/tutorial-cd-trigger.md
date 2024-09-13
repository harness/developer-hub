---
sidebar_position: 5
title: Tutorial - Pipeline Triggers
description: Tutorial to get started with Triggers in Harness Pipelines.
redirect_from:
  - /tutorials/cd-pipelines/trigger
canonical_url: https://www.harness.io/blog/automate-your-ci-cd-pipeline-using-triggers
---

This tutorial demonstrates how to use triggers by creating a Docker Registry Artifact trigger for a Harness CD pipeline.

## Why use triggers?

Triggers in a Harness Continuous Delivery (CD) pipeline are used to automatically initiate pipeline stages or actions based on specific events or conditions, such as Git events, new Helm Charts, new artifacts, or specific time intervals. Triggers in Harness CD enable faster feedback cycles, enhanced efficiency, and decreased reliance on manual intervention during the deployment process.

## Before you begin

You need the following for this tutorial:

- **Existing Harness CD pipeline.** If you are a new user or haven't created a pipeline yet, try the [get started with CD tutorial](/docs/continuous-delivery/get-started/cd-tutorials/manifest).
- **Existing Docker connector with Credential Type `Username and Password`**. Create a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) if you don't have one yet.

## Implement a trigger using Docker Hub Artifact

:::warning

For the pipeline to run successfully, you must follow all of the following steps as they are, including the naming conventions.

:::

1. Log in to your Harness instance.
2. Select **Projects**, and then select **Default Project**.
3. In **Default Project**, select **Pipelines**.
   - Select an existing pipeline or create a new pipeline by following any of our CD tutorials.
   - Choose the CD stage.

### Prepare the CD Stage for the trigger

In the **Harness Service** to the CD stage, you can set the artifact tag to use in Artifacts Details.
   - Go to **Service** tab and click on edit icon of the Service where you want to add Artifact details.
   - Under **Artifacts**, ensure you have selected Artifact Repository Type **Docker Registry**.
   - Click **Continue** and choose the created **Docker Connector**.
   - In the next step, enter a name for this artifact, and enter the name of the artifact image you want to deploy.
     - For the **Tag**, change it to type **Expressions** and enter `<+trigger.artifact.build>`.
     - With `<+trigger.artifact.build>`, the pipeline will deploy the artifact image version that initiated the trigger.
   - To deploy this artifact image, you simply need to reference it in the stage's service definition in your manifests using the expression `<+artifact.image>`. For more details, go to [Add Container Images as Artifacts for Kubernetes Deployments](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments/).

### Create a Docker Registry Artifact Trigger

In your CD pipeline, select **Triggers**.
   - Select **New Trigger** and choose **Docker Registry** under **Artifact**.
   - Now, toggle to **YAML** to use the YAML editor.
   - Copy the contents of [docker-trigger.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/triggers/docker-trigger.yml) and paste it into the YAML editor.
   - In the YAML, replace the following fields:
     - **ORGANIZATION_ID** = your organization identifier
     - **PROJECT_ID** = your project identifier
     - **PIPELINE_ID** = your pipeline identifier
     - **DOCKER_CONNECTOR** = your Docker connector identifier
     - **MAINTAINER/IMAGE** = the name of the artifact you want to deploy (eg: `library/nginx`)
     - **CD_STAGE_ID** = the CD Stage identifier in the pipeline
     - **ARTIFACT_ID** the Artifact identifier, which you'll get from the Service associated with the Pipeline.
   - Finally, select **Create Trigger** and observe that the status is in _pending_ state as Harness starts collecting the tags information from the registry.
   - You can also switch to the **Visual** editor and confirm the trigger steps.

## Test the trigger

Test the trigger by building and pushing a new artifact image to the chosen Docker registry. You can observe the pipeline being triggered and deploying the new image in the execution details in Harness.
