---
title: Service onboarding pipelines
description: Service onboarding pipelines use a software template and enable a developer to spawn new software applications easily while following the company's best practices.
sidebar_position: 1
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/internal-developer-portal/features/service-onboarding-pipelines
---
Service Onbaording in Harness IDP use Harness pipeline orchestrator and those could be trigerred through Software Templates. 

![](./static/service-onboarding.png)

In Harness IDP, a service onboarding pipeline (also known as a software template) enables platform engineers to automate the process of service creation. As a platform engineer, you can create a template that prompts developers for details and creates a repository with a basic setup that includes a CI/CD process. The template is defined in a YAML file named `template.yaml`. The [syntax](https://backstage.io/docs/features/software-templates/input-examples) of the template definition is owned by [backstage.io](https://backstage.io/docs/features/software-templates/writing-templates) while the workflow runs on a Harness pipeline of your choice.

<!-- See it in action: Demo video -->

**To get started, check out the tutorial to [create your first service onboarding pipeline](/tutorials/internal-developer-portal/service-onboarding-pipeline).**

## Template registration

A template is a kind of entity that exists in the software catalog. You can create a `template.yaml` file and register the URL with the catalog. For information about registering a template, go to [Add a new software component to the catalog](/docs/internal-developer-portal/get-started/register-a-new-software-component.md).

## Available template actions

:::info

The template actions currently supports only [custom stage](https://developer.harness.io/docs/platform/pipelines/add-a-stage/#add-a-custom-stage) and codebase disabled [CI stage with Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/#add-the-run-step), also all input, except for [pipeline input as variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#pipeline), must be of [fixed value](https://developer.harness.io/docs/platform/variables-and-expressions/runtime-inputs/#fixed-values). 

:::

Harness IDP ships the following Harness related built-in actions along with [some others](/docs/internal-developer-portal/flows/custom-actions.md) to be used in the software template steps.

- `trigger:harness-custom-pipeline`
- `harness:create-secret`
- `harness:delete-secret`

Learn more about how to use them in the [service onboarding tutorial](/tutorials/internal-developer-portal/using-secret-as-an-input).

## Available UI pickers

Harness IDP ships the following [custom UI pickers](/docs/internal-developer-portal/flows/custom-actions.md) that can be used in the template form for developers to select from.

- `HarnessOrgPicker`
- `HarnessProjectPicker`

You can use these UI fields in the `ui:field` option of your `template.yaml` file. Read more about how to use these [custom field extensions](https://backstage.io/docs/features/software-templates/writing-custom-field-extensions#using-the-custom-field-extension) or take a look at [this example](https://github.com/bhavya-sinha/scaffolder-sample-templates/blob/5f52718ec49cb2c27a87e2fbeae075873701911c/fieldExtension.yaml#L78-L85).
