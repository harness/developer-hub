---
title: Keep your pipelines DRY
description: Use a DRY approach for efficiency and consistency.
sidebar_position: 7
---

DRY is an acronym used in software development that stands for *Don't Repeat Yourself*. It emphasizes the importance of avoiding redundancy to make the codebase easier to understand, maintain, and less prone to errors. For CI/CD pipelines, particularly in Harness, it is essential to have a DRY approach for efficiency and consistency.

## Understanding the importance of DRY

When your CI/CD pipelines are not DRY:

1. Changes have to be made in multiple places.
2. There’s an increased risk of errors due to inconsistencies.
3. Maintenance becomes a burden.

The following steps will help you maintain efficiency and consistency using the DRY approach.

## Use templates

Harness allows you to create templates for your steps, stages, and pipelines. [Templates](/docs/platform/templates/templates-best-practices) let you build out modular and reusable process that can be shared across various teams. Templates ensure that there is standardization among your pipelines and ensures that the same sequence of steps is used across teams.

- [Stage templates](/docs/platform/templates/add-a-stage-template): Allow you to define a sequence of deployment steps once and reuse it across multiple services or environments.
- [Pipeline templates](/docs/platform/templates/create-pipeline-template): Facilitates the creation of a sequence of stages so you can model your entire delivery process.

## Leverage service and environment overrides

Harness [overrides](/docs/continuous-delivery/x-platform-cd-features/overrides-v2) allow you to define certain pipeline specifications once and then override or extend them in specific services or environments. This reduces repetition by allowing you to specify common settings only once.

With overrides, you can define your service variable and overrides up front, and then at runtime, Harness will automatically compute the service variables, environment variables, secrets, and override files  that need to be applied during a deployment.

Overrides keep your service, environment, and pipelines generic and clean. They can be reused for any scenario and are flexible enough to handle any deployment with service and environment paring. 

<DocImage path={require('./static/e637428de249f033a7cda5a9ce74820db4de6f487c0dc6d2f4a8229eccc420e1.png')} width="60%" height="60%" title="Click to view full size image" />  

## Harness Git Experience

Harness [Git Experience](/docs/platform/git-experience/configure-git-experience-for-harness-entities) lets you define your pipeline, templates, and pipeline inputsets using code that can be stored in a version control system. 

By keeping configurations in code, you can reuse components and apply versioning, which promotes a DRY approach.

Let's look at two approaches for using a centralized Git repository for Harness configurations.

### Approach 1: Manage Git configuration in centralized repo

You can manage the Git configuration in a centralized repository where all the configuration files are reviewed and managed in a PR process. 

Pros:
- Gives ownership of the repository and the configurations to a centralized team and they can review and manage PRs for specific files and resources. 
- Any Harness resource file changes are certified by the central team and the hygiene of changes are consistent, keeping configurations dry and enforced.
- Easily merge and propagate changes out to the dev teams and to test them.

Cons:
- Centralized ownership also means one sub-team maintains an entire team's configuration. At scale, it can become difficult to keep up with the demand of changes being requested by the application teams to a specific pipeline or template.

<details>
<summary>Centralized deployment configuration modeled</summary>

```
├── .harness
│   ├── pipelines
│   │   ├── golden-pipeline.yaml
│   ├── templates
│   |   ├── k8s-deploy-stage.yaml
│   ├── input_sets
|   |   ├── dev-inputs-serviceA.yaml
└── .gitignore
```

</details>

### Approach 2: Manage Git configuration in dev team repo

You can manage the Git configuration in your dev team’s application repository where all the configurations files are reviewed and managed in a PR process.

Pros:
- Gives ownership of the repository and configurations to a dev team who can review and manage PRs to specific files and resources. 
- Any Harness resource file changes are certified by the team and the hygiene of changes are consistent keeping configurations dry and enforced. 
- Easily merge and propagate changes out to the team and test them.
- Your changes only impact your team, so the blast radius for risky changes is small.

Cons:
- Dev ownership means changes are only done for your specific team. This means that if other teams are configuring things in Harness and have similar use cases, you might see an increase in Harness file configurations in dev team Git repos.
- Maintenance and hygiene of changes are now managed by the dev team. This means they now own the release of changes to their pipelines, the quality of their changes, and the validation of the changes.

<details>
<summary>Manage Git and Harness CD configuration together</summary>

```
├── .harness
│   ├── pipelines
│   │   ├── golden-pipeline.yaml
│   ├── templates
│   |   ├── k8s-deploy-stage.yaml
│   ├── input_sets
|   |   ├── dev-inputs-serviceA.yaml
├── src
│   ├── controller
│   │   ├── **/*.css
│   ├── views
│   ├── model
│   ├── index.js
├── public
│   ├── css
│   │   ├── **/*.css
│   ├── images
│   ├── js
│   ├── index.html
├── dist (or build)
├── node_modules
├── package.json
├── package-lock.json 
└── .gitignore
```

</details>

## Variables and secrets

Harness supports the use of [variables](/docs/platform/variables-and-expressions/harness-variables) and [secrets](/docs/platform/Secrets/Secrets-Management/reference-existing-secret-manager-secrets).

Instead of hardcoding values, use variables that can be populated dynamically based on the environment or context.

[Secrets management](/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview) ensures that sensitive information (like API keys) is stored securely and can be referenced in workflows without repetition.

## Harness Terraform Provider, API, and CLI

Harness provides a [Terraform Provider](https://registry.terraform.io/providers/harness/harness/latest/docs), [APIs](https://apidocs.harness.io/) and a [Command Line Interface (CLI)](https://developer.harness.io/docs/platform/automation/cli/install). Most users leverage these capabilities to quickly automate and onboard their teams into Harness.

:::note

The most popular way to automate and manage Harness resources is via our Terraform Provider.

:::

Benefits:
- Automate the creation or update of pipelines, templates, and other configurations.
- Reuse automation scripts and commands for various operations, ensuring consistent and efficient updates.

See the [terraform-development-factory](https://github.com/harness-community/solutions-architecture/tree/main/terraform-development-factory) sample repository to learn how to manage and design your repository.

We designed the repository based of our engagements with our customer base.


