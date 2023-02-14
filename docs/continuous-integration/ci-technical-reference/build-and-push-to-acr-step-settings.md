---
title: Build and Push to ACR step settings
description: Settings you can use with the Build and Push to ACR step.
sidebar_position: 40
helpdocs_topic_id: 66ykcm0sf0
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the Build and Push to ACR step, which builds an image and pushes it to Azure Container Registry (ACR).

## Standard settings

* **Name:** The unique name for this step. Harness automatically generates an **Id** ([Entity Identifier](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can edit the Id. You can also use the Id to reference this step in other steps.
* **Azure Connector:** The Harness Azure Cloud connector to use for this step. For instructions on adding Azure Cloud connectors, go to [Add a Microsoft Azure Cloud Provider connector](../../platform/7_Connectors/add-a-microsoft-azure-connector.md). This step has been tested with Azure Cloud connectors that use access key authentication. Azure Cloud connectors that inherit delegate credentials may encounter problems during pipeline execution.
* **Repository:** The Azure Cloud registry and image name, such as `<container-registry-name>.azurecr.io/<image>`.
* **Subscription Id:** Optional. Identify a subscription within Azure.
* **Tags:** [Docker build tag](https://docs.docker.com/engine/reference/commandline/build/#tag-an-image--t) (`-t`). Add each tag separately.

## Optional settings

* **Dockerfile:** The name of the Dockerfile. If you don't provide a name, Harness assumes that the Dockerfile is in the root folder of the codebase.
* **Context:** Context represents a directory containing a Dockerfile that kaniko uses to build your image. For example, a`COPY` command in your Dockerfile should refer to a file in the build context.
* **Labels:** [Docker object labels](https://docs.docker.com/config/labels-custom-metadata/) to add metadata to the image.
* **Build Arguments:** [Docker build-time variables](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables---build-arg) (`--build-arg`).

   ![](./static/build-and-push-to-gcr-step-settings-23.png)

* **Target:** The [Docker target build stage](https://docs.docker.com/engine/reference/commandline/build/#specifying-target-build-stage---target) (`--target`) within the Dockerfile, such as `build-env`.
* **Timeout:** Timeout limit for the step. Once the timeout is reached, the step fails and pipeline execution continues.

## See also

* [Step Skip Condition settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
