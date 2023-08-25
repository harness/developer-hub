---
title: Confirm cache before installing dependencies
description: Use conditional executions to run steps only if the cache wasn't restored.
sidebar_position: 60
---

This topic demonstrates how you can use failure strategies and conditional executions in CI pipelines to run steps based on the outcome of other steps. As an example, this topic explains how to configure a CI pipeline to check if a cache was restored and then install dependencies only if the cache *was not* restored. Specifically, this pattern requires the following configurations:

* The **Restore Cache** step must have **Fail if Key Doesn't Exist** and a [failure strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/) that ignores the failure so that the step failure doesn't cause the entire pipeline to fail.
* The steps that run only if the cache wasn't restored must have a [conditional execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/#step-conditions) so they only run if the **Restore Cache** step failed.

You can modify this pattern as needed to perform a variety of checks with subsequent conditional executions, such as [multilayer caching](./multilayer-caching.md).

## Requirements

This is an advanced pattern that requires you to be familiar with:

* [CI pipeline creation](../prep-ci-pipeline-components.md).
* **Save Cache** and **Restore Cache** steps:
  * [Save and Restore Cache from S3](./saving-cache.md)
  * [Save and Restore Cache from GCS](./save-cache-in-gcs.md)
* [Failure strategies](/docs/platform/pipelines/define-a-failure-strategy-on-stages-and-steps/).
* [Conditional execution settings](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/), particularly [step conditions](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/#step-conditions).

## Configuration

Follow these steps to configure failure strategies and conditional executions in one stage of a CI pipeline. Specifically, these steps:

* Add a failure strategy to a **Restore Cache** step that checks if a cache was restored.
* Add a conditional execution to a **Run** step so that the **Run** step installs dependencies if the cache wasn't restored. If the cache was restore, the **Run** step is skipped.

:::tip

If you are using the visual editor in the Pipeline Studio, you can find **Conditional Execution** and **Failure Strategy** settings on the **Advanced** tab of your step settings.

:::

1. On your **Restore Cache** step, enable **Fail if Key Doesn't Exist**, and add a [failure strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/) where the step fails on **All Errors** and executes the **Ignore** action in response. For example:

   ```yaml
                 - step:
                     type: RestoreCacheGCS
                     name: gemfile cache
                     identifier: gemfile_cache
                     spec:
                       connectorRef: YOUR_GCP_CONNECTOR
                       bucket: YOUR_GCS_BUCKET_NAME
                       key: harness-cache-gemfile
                       archiveFormat: Tar
                       failIfKeyNotFound: true
                     failureStrategies:
                       - onFailure:
                           errors:
                             - AllErrors
                           action:
                             type: Ignore
   ```

   This configuration causes the **Restore Cache** step to fail if the cache key doesn't exist, which means there is no cache to restore. The **Ignore** action allows the **Restore Cache** step to fail without causing the entire pipeline to fail.

   For information about configuring **Restore Cache** steps, go to [Save and Restore Cache from S3](./saving-cache.md) and [Save and Restore Cache from GCS](./save-cache-in-gcs.md).

2. On your **Run** step that installs dependencies, add a [conditional execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/#step-conditions) that causes the step to run only if the **Restore Cache** step failed.

   Set the conditional execution to **Execute this step if the stage execution is successful thus far** (`stageStatus: Success`) and include the JEXL condition `<+execution.steps.RESTORE_CACHE_STEP_ID.status> == "IGNORE_FAILED"`. For example:

   ```yaml
                 - step: ## This step will install the dependencies if the cache wasn't restored. Otherwise, this step doesn't run.
                     type: Run
                     name: install dependencies
                     identifier: install_dependencies
                     spec:
                       shell: Sh
                       command: |-
                         bundle check || bundle install
                     when:
                       stageStatus: Success
                       condition: <+execution.steps.gemfile_cache.status> == "IGNORE_FAILED" ## Replace 'gemfile_cache' with your Restore Cache step's ID.
   ```

3. Include other steps in your pipeline as needed to complete your CI pipeline. These could include steps to build code, run tests, build and push images, upload artifacts, and so on. Make sure to include a **Save Cache** step. You can make other steps dependent on the restored cache using the same conditional execution settings as were applied to the **Run** step.

## YAML example

Here's an example of a pipeline that attempts to restore a cache from GCS and installs dependencies only if the cache is not restored.

```yaml
pipeline:
  name: Cache confirm
  identifier: Cache_confirm
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: build
        identifier: build
        type: CI
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: RestoreCacheGCS
                  name: gemfile cache
                  identifier: gemfile_cache
                  spec:
                    connectorRef: YOUR_GCP_CONNECTOR
                    bucket: YOUR_GCS_BUCKET_NAME
                    key: harness-cache-gemfile
                    archiveFormat: Tar
                    failIfKeyNotFound: true
                  failureStrategies:
                    - onFailure:
                        errors:
                          - AllErrors
                        action:
                          type: Ignore
              - step: ## This step will install the dependencies if the cache wasn't restored. Otherwise, this step doesn't run.
                  type: Run
                  name: install dependencies
                  identifier: install_dependencies
                  spec:
                    shell: Sh
                    command: |-
                      bundle check || bundle install
                  when:
                    stageStatus: Success
                    condition: <+execution.steps.L2_Cache.status> == "IGNORE_FAILED"
              - step: # Add other steps to the pipeline as needed.
                ...
              - step:
                  type: SaveCacheGCS
                  name: save gemfile cache
                  identifier: save_gemfile_cache
                  spec:
                    connectorRef: YOUR_GCP_CONNECTOR
                    bucket: YOUR_GCS_BUCKET_NAME
                    key: harness-cache-gemfile
                    sourcePaths:
                      - /vendor/bundle
                    archiveFormat: Tar
          sharedPaths: ## This setting shares directories that are outside the default workspace directory (/harness).
            - /vendor/bundle
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        build: <+input>
```

:::tip sharedPaths

The `sharedPaths` setting is used to specify directories outside the default workspace directory (`/harness`).

In the above example, the `/vendor/bundle` directory is outside `/harness`, so it must be specified in `sharedPaths` for the steps to be able to access it.

For more information, go to [Share data between steps in a stage](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#share-data-between-steps-in-a-stage).

:::
