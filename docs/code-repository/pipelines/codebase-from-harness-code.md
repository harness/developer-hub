---
title: Set default codebase
description: Configure your Harness pipelines to build, test, and deploy code from Harness Code repositories.
sidebar_position: 10
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


You can configure your Harness pipelines to build, test, and deploy code from your Harness Code repositories.

## Build and test code from a Harness Code repo

Build (`CI`) stages usually build from a pipeline's [default codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase). When creating or editing a pipeline, you can set the default codebase to a Harness Code repository.

In the Visual editor, in the pipeline's **Codebase** settings, select **Harness Code Repository** as the Git provider, and then select your repository.

In the YAML editor, use `codebase.repoName` to specify a Harness Code repo, for example:

```yaml
pipeline:
  name: default
  identifier: default
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        repoName: YOUR_HARNESS_CODE_REPO_NAME
        build: <+input>
```

To edit an existing pipeline, replace `codebase.connectorRef` with `codebase.repoName`, for example:

```yaml
pipeline:
  name: default
  identifier: default
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID ## Replace this setting with 'repoName: YOUR_HARNESS_CODE_REPO_NAME'
        build: <+input>
```

You can also [clone multiple repos](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline) into a stage workspace by using Git commands in Run steps to clone the additional repos.

## Deploy services from a Harness Code repo

You can use Harness Code Repository with the [Harness Git Experience](/docs/platform/git-experience/git-experience-overview).

For details about codebase configuration for services and the Harness CD module, go to the CD documentation, such as the documentation for [deploying services](/docs/category/deploy-services-on-different-platforms).

## Automate builds and deployments

You can [set up triggers](./code-triggers.md) to automatically run builds or deployments in response to push events in your Harness Code repositories.
