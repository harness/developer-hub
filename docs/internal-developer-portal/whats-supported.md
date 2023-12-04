---
title: What's supported in Harness IDP
description: Lists the plugins, git providers, and third-party integrations supported in IDP.
sidebar_label: What's Supported
sidebar_position: 1
---

Harness Internal Developer Portal integrates with a number of third-party providers to provide a single pane of glass for developers.

## Plugins for IDP

Harness IDP supports a number of plugins to integrate the software catalog with third-party providers. Please find the growing list of [supported plugins](/docs/category/available-plugins). This is a subset of the [Backstage plugin marketplace](https://backstage.io/plugins).

## Git providers that IDP supports

Any software component can be registered in the catalog by using a YAML file stored in the following Git providers:

* GitHub
* GitLab
* Bitbucket
* Azure Repos

:::caution

Backstage doesn't support SSH auth type for integrations, hence only HTTP connection is supported for all the git provider based connectors in IDP 

:::

## CI/CD providers that IDP supports

Harness IDP is agnostic to your CI/CD provider and works with tools such as GitLab, CircleCI, and GitHub Actions. You can use Harness CI/CD for a better out-of-the-box experience but it's not required.

For information about what's supported for other Harness modules and the Harness Platform overall, refer to [Supported platforms and technologies](/docs/get-started/supported-platforms-and-technologies.md).

:::info

Harness IDP requires some secrets to be set for plugins and external integrations to work. We only support secrets stored in the [Harness secret manager](https://developer.harness.io/tutorials/platform/secrets-management/#manage-secrets-with-built-in-harness-secret-manager).

:::

## Template Actions to Trigger Harness Pipeline 

- Currently only single stage Harness Pipeline is supported. 

- The template actions currently supports only [custom stage](https://developer.harness.io/docs/platform/pipelines/add-a-stage/#add-a-custom-stage) and codebase disabled [CI stage with Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/#add-the-run-step), also all input, except for [pipeline input as variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#pipeline), must be of [fixed value](https://developer.harness.io/docs/platform/variables-and-expressions/runtime-inputs/#fixed-values). 
