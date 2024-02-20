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

* GitHub
* GitLab
* Bitbucket(Except [Bitbucket Server](https://www.atlassian.com/migration/assess/journey-to-cloud))
* Azure Repos

:::warning

Backstage doesn't support SSH auth type for integrations, hence only HTTP connection is supported for all the git provider based connectors in IDP.

:::

## CI/CD providers that IDP supports

Harness IDP is agnostic to your CI/CD provider and works with tools such as GitLab, CircleCI, and GitHub Actions. You can use Harness CI/CD for a better out-of-the-box experience but it's not required.

For information about what's supported for other Harness modules and the Harness Platform overall, refer to [Supported platforms and technologies](/docs/get-started/supported-platforms-and-technologies.md).

:::info

Harness IDP requires some secrets to be set for **Plugins** and external integrations in **Catalog** to work. In that case we only support secrets stored in the **[Harness secret manager](https://developer.harness.io/tutorials/platform/secrets-management/#manage-secrets-with-built-in-harness-secret-manager)**.

:::

## Template Actions to Trigger Harness Pipeline

- The template actions currently supports only [IDP Stage](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage) along with the [custom stage](https://developer.harness.io/docs/platform/pipelines/add-a-stage/#add-a-custom-stage) and [codebase disabled](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase.md#disable-clone-codebase-for-specific-stages) CI stage with [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings).
- All input, except for [pipeline input as variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#pipeline), must be [fixed values](https://developer.harness.io/docs/platform/variables-and-expressions/runtime-inputs/#fixed-values).

:::info

Workflows in IDP use Harness Pipelines as Orchestrator, so any secret requirement in workflows for eg., write action in git providers, can be added by using the [third-party secret managers](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview#using-third-party-secret-managers) enabled through [Delegates](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview#harness-secret-management-process-overview) along with the Harness Secret manager supported in Harness Pipelines. 

:::