---
title: What's supported in Harness IDP
description: Lists the plugins, git providers, and third-party integrations supported in IDP.
sidebar_label: What's Supported
sidebar_position: 1
---

Harness Internal Developer Portal integrates with a number of third-party providers to provide a single pane of glass for developers.

## Plugins for IDP

Harness IDP supports a number of plugins to integrate the software catalog with third-party providers. Please find the growing list of [supported plugins](/docs/category/available-plugins). This is a subset of the [Backstage plugin marketplace](https://backstage.io/plugins).

Any URLs behind any firewall or private URLs used in plugins should be accessed through [Harness Delegate](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/). 

## Git providers that IDP supports

Any software component can be registered in the catalog by using a YAML file stored in the following Git providers:

* [Harness Code Repository (Default)](https://www.harness.io/products/code-repository) 
* GitHub
* GitLab
* Bitbucket
* Azure Repos

We support multiple connectors with different hostname for a single git provider to fetch `catalog-info.yaml` at once. E.g., Users can use connectors for both `github.com` and `github enterprise` and fetch entity YAML at the same time.

:::warning

Backstage doesn't support SSH auth type for integrations, hence only HTTP connection is supported for all the git provider based connectors in IDP.

API calls in IDP are used to fetch YAML data, last commit SHA, and detect any new changes. SSH authentication cannot be used for making these API calls; it is only used for cloning repositories. Therefore, the main Git connector for IDP Git integration must support API requests, hence HTTP is only supported

:::

## CI/CD providers that IDP supports

Harness IDP is agnostic to your CI/CD provider and works with tools such as GitLab, CircleCI, and GitHub Actions. You can use Harness CI/CD for a better out-of-the-box experience, but it's not required.

For information about what's supported for other Harness modules and the Harness Platform overall, refer to [Supported platforms and technologies](/docs/platform/platform-whats-supported.md).

:::info

Harness IDP requires some secrets to be set for plugins and external integrations in Catalog to work. In these cases, we support all kind of [secret managers](https://developer.harness.io/docs/category/secrets-management). 

:::

## Workflow Actions to Trigger Harness Pipeline

### [trigger:harness-custom-pipeline](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#1-triggerharness-custom-pipeline)

- This action currently supports [IDP Stage](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage) along with the [Deploy Stage](https://developer.harness.io/docs/platform/pipelines/add-a-stage#add-a-stage), [Custom Stage](https://developer.harness.io/docs/platform/pipelines/add-a-stage/#add-a-custom-stage)(**Available with Harness CD License or Free Tier usage**), Pipelines using [Pipeline Templates](https://developer.harness.io/docs/platform/templates/create-pipeline-template/) and [codebase disabled](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase.md#disable-clone-codebase-for-specific-stages) **Build Stage(Only Available with Harness CI License)** with [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings).
- All input, except for [pipeline expressions](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#pipeline-expressions), must be [fixed values](https://developer.harness.io/docs/platform/variables-and-expressions/runtime-inputs/#fixed-values).

### [trigger:trigger-pipeline-with-webhook](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#2-triggertrigger-pipeline-with-webhook)

- This action supports all types of pipeline with a webhook based trigger. It triggers a pipeline execution based on the input-set identifier and a webhook name. 

:::info

Workflows in IDP use Harness Pipelines as Orchestrator, so any secret requirement in workflows for eg., write action in git providers, can be added by using the [third-party secret managers](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview#using-third-party-secret-managers) enabled through [Delegates](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview#harness-secret-management-process-overview). 

You can use Harness Secret Manager as well for the above described function. 

:::

## Miscellaneous

| **What do we Support?**              | **Links**                                                                                                                                                                                                                                                        |
|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Custom Plugins                   | We support only [Frontend Backstage Plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/build-a-frontend-plugin) as [Custom Plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/custom-plugins/overview)   |
| Scorecard Data Sources            | These are the list of available Scorecard [Data Sources](https://developer.harness.io/docs/internal-developer-portal/scorecards/checks-datasources)                                                                                                           |
| Backstage Plugins                | [Available Backstage Plugins](https://developer.harness.io/docs/category/available-plugins)                                                                                                                                                                  |
| Custom Theming And Branding      | Not supported.                                                                                                                                                                                                                                         |
| Developer Homepage Customisation | You can customize the Homepage for a personalized experience.                                                                                                                                                                                                |
| API support to update entities   | We support [Ingestion APIs](https://developer.harness.io/docs/internal-developer-portal/catalog/custom-catalog-properties) to update entities in the catalog.                                                                                           |
