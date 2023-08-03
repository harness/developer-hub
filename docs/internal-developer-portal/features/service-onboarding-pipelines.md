---
title: Service onboarding pipelines
description: Service onboarding pipelines use a software template and enable a developer to spawn new software applications easily while following the company's best practices.
sidebar_position: 20
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
---

![](../getting-started/static/pipelines-screenshot.png)

In Harness IDP, a service onboarding pipeline (also known as a software template) enables platform engineers to automate the process of service creation. As a platform engineer, you can create a template that prompts developers for details and creates a repository with a basic setup that includes a CI/CD process. The template is defined in a YAML file named `template.yaml`. The syntax of the template definition is owned by [backstage.io](https://backstage.io/docs/features/software-templates/writing-templates) while the workflow runs on a Harness pipeline of your choice.

<!-- See it in action: Demo video -->

**To get started, check out the tutorial to [create your first service onboarding pipeline](/tutorials/internal-developer-portal/service-onboarding-pipeline).**

## Template registration

A template is a kind of entity that exists in the software catalog. You can create a `template.yaml` file and register the URL with the catalog. For information about registering a template, go to [Add a new software component to the catalog](../getting-started/register-a-new-software-component.md).

## Available template actions

Harness IDP ships the following actions to be used in the software template steps.

- `trigger:harness-custom-pipeline`
- `harness:create-secret`
- `harness:delete-secret`

Learn more about how to use them in the [service onboarding tutorial](/tutorials/internal-developer-portal/using-secret-as-an-input).
