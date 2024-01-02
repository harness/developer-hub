---
title: Set default codebase
description: Configure your Harness pipelines to build, test, and deploy code from Harness Code repositories.
sidebar_position: 10
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


You can configure your Harness pipelines to build, test, and deploy code from your Harness Code repositories.

## Set a pipeline's default codebase to a Harness Code repo

When creating or editing a pipeline, you can set the default codebase to a Harness Code repository.


<Tabs>
  <TabItem value="visual" label="Visual editor">


1. Edit the pipeline's **Codebase** settings.
2. For **Select Git Provider**, select **Harness**.
3. Enter your **Repository Name**.


</TabItem>
  <TabItem value="yaml" label="YAML editor">


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

If you are editing an existing pipeline, replace `codebase.connectorRef` with `codebase.repoName`, for example:

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


</TabItem>
</Tabs>


## Build and test code from a Harness Code repo

Build (`CI`) stages usually use the pipeline's default codebase. For more information about codebase configuration for the Harness CI module, go to the CI documentation on [configuring a codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase).

## Deploy services from a Harness Code repo

For details about codebase configuration for services and the Harness CD module, go to the CD documentation, such as the documentation for [deploying services](/docs/category/deploy-services-on-different-platforms).

## Automate builds and deployments

You can [set up triggers](./code-triggers.md) to automatically run builds or deployments in response to push events in your Harness Code repositories.
