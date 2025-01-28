---
title: Setting Up the Backend with Harness Pipeline
description: 
sidebar_position: 3
sidebar_label: Configuring Harness Pipelines
---
Self-service workflows in Harness IDP are powered by **Harness Pipelines**. Each workflow’s backend is configured using Actions and Harness Pipelines. Below is a detailed guide to setting this up in Harness IDP.

## Harness Pipelines: Backend Orchestration
Harness Pipeline acts as a robust orchestration engine for self-service workflows in Harness IDP. It is directly connected to executing specific tasks in your workflow via defined actions and pipelines.

### Connecting Inputs, Actions and Harness Pipelines
When a workflow is executed, users provide input details required for pipeline execution. These inputs are passed into the pipeline through a workflow action, which triggers specific steps in the pipeline. These steps can perform tasks such as launching a CI/CD process, registering a service in the catalog, setting up infrastructure, etc. 

The action accepts the **Harness Pipeline URL** as input, along with an authentication token that is automatically inserted into the parameters section. This seamless integration is enabled by Harness IDP being part of the broader Harness SaaS ecosystem. Users can also manage workflows via pipelines’ RBAC.

### IDP Stage
Harness IDP includes a native IDP Stage where all IDP-specific tasks required for pipeline execution are pre-configured as pipeline steps within the stage. This enables quick and efficient creation of self-service workflows. 

The IDP Stage provides built-in support for:
- Git cloning
- Cookiecutter templating
- Repository creation
- Catalog creation and registration
- Slack notifications
- Resource creation using Harness IaCM powered by OpenTofu

Currently, Harness-specific workflow actions support:
- IDP Stage
- Custom Stage (Available with Harness CD License or Free Tier)
- Codebase-disabled CI Stage with Run Step (Available with Harness CI License)

## Create a Harness Pipeline from Harness IDP
To create a Harness Pipeline using the IDP Stage, follow these steps:
1. In your Harness IDP, go to **Admin -> Select Project**.
2. Now start with **Create a Pipeline**.

![](./static/navigate-pipeline.gif)

3. Add a **Name**, select the type as **Inline** and **Continue**.

![](static/name-pipeline.png)

4. Now **Select Stage Type** as **Developer Portal** and add a [name for your stage](https://developer.harness.io/docs/platform/pipelines/add-a-stage/#stage-names) to **Set Up Stage**.

![](./static/dev-portal-stage-selection.png)

![](./static/set-up-stage.png)

5. Under **Infrastructure** tab, Harness recommends [Harness Cloud](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#use-harness-cloud), but you can also use a [Kubernetes cluster](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure), [local runner](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) or [self-managed AWS/GCP/Azure VM](/docs/category/set-up-vm-build-infrastructures) build infrastructure.

![](./static/infrastructure.png)







