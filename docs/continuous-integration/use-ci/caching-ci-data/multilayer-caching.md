---
title: Multilayer caching
description: Use multiple Save and Restore Cache steps to achieve multilayer caching.
sidebar_position: 50
---

Multilayer caching allows your pipeline to retrieve or check multiple caches. This is useful in cases where you have a series of caches that you want to attempt to restore, or you want to use an outdated cache in addition to loading some new components.

For example, it is a common practice in Ruby builds to add or change gems. In a pipeline with single-layer caching, adding a gem causes the cache key to fail to find a matching cache to restore. Without a restored cache, the build reinstalls all gems. In contrast, multilayer caching can reduce build time by pulling the most recent cache, which has all gems except the new one, and then installing only the new gem.

## Requirements

Multilayer caching is an advanced pattern that requires you to be familiar with:

* [CI pipeline creation](../prep-ci-pipeline-components.md)
* **Save Cache** and **Restore Cache** steps
  * [Save and Restore Cache from S3](./saving-cache.md)
  * [Save and Restore Cache from GCS](./save-cache-in-gcs.md)
* [Failure strategies](/docs/platform/pipelines/define-a-failure-strategy-on-stages-and-steps/)
* [Conditional execution settings](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/), particularly [step conditions](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/#step-conditions).

## Pattern for multilayer caching in CI pipelines

The general pattern for multilayer caching in CI pipelines is as follows:

* Use multiple **Restore Cache** steps.
  * You need one step for each cache, as identified by a cache key, that you want to attempt to restore.
  * These steps represent a cadence of potential caches to restore. You want your pipeline to check if the first cache exists, and, if it doesn't, then check for the second cache, and so on.
* All **Restore Cache** steps except the last (`n-1`) must have **Fail if Key Doesn't Exist** and a [failure strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/) that ignores the failure so that the step failure doesn't cause the entire pipeline to fail.
* All **Restore Cache** steps after the first (`n+1`) have a [conditional execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/#step-conditions) so they only run if the preceding step failed.
* Use multiple **Save Cache** steps, which can run in parallel.
  * You need one step for each cache, as identified by a cache key, that you want to save.
  * The **Save Cache** steps don't need failure strategies or conditional execution conditions.

### YAML example

Here's an example of a pipeline with multilayer caching. It has one stage with two **Restore Cache** steps and two **Save Cache** steps.

<details>
<summary>YAML example: Multilayer caching</summary>

```yaml
pipeline:
  name: Cache Multilayer
  identifier: Cache_Multilayer
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
                  name: L1 Caching
                  identifier: L1_Caching
                  spec:
                    connectorRef: YOUR_GCP_CONNECTOR
                    bucket: YOUR_GCS_BUCKET_NAME
                    key: harness-cache-{{ checksum "pom.xml" }}
                    archiveFormat: Tar
                    failIfKeyNotFound: true
                  failureStrategies:
                    - onFailure:
                        errors:
                          - AllErrors
                        action:
                          type: Ignore
              - step:
                  type: RestoreCacheGCS
                  name: L2 Cache
                  identifier: L2_Cache
                  spec:
                    connectorRef: YOUR_GCP_CONNECTOR
                    bucket: YOUR_GCS_BUCKET_NAME
                    key: harness-cache-l2
                    archiveFormat: Tar
                  when:
                    stageStatus: Success
                    condition: <+execution.steps.L1_Caching.status> == "IGNORE_FAILED"
              - step: ## Between the Restore and Save Cache steps, add steps to build code, run tests, publish images, and so on.
                  type: Run
                  name: Run_1
                  identifier: Run_1
                  spec:
                    shell: Sh
                    command: |-
                      mvn clean install
              - parallel: ## This tells the pipeline to run the following two Save Cache steps in parallel.
                  - step:
                      type: SaveCacheGCS
                      name: Save L2 Cache
                      identifier: Save_L2_Cache
                      spec:
                        connectorRef: YOUR_GCP_CONNECTOR
                        bucket: YOUR_GCS_BUCKET_NAME
                        key: harness-cache-l2
                        sourcePaths:
                          - /.m2/repository/
                        archiveFormat: Tar
                  - step:
                      type: SaveCacheGCS
                      name: Save L1 Cache
                      identifier: Save_L1_Cache
                      spec:
                        connectorRef: YOUR_GCP_CONNECTOR
                        bucket: YOUR_GCS_BUCKET_NAME
                        key: harness-cache-{{ checksum "pom.xml" }}
                        sourcePaths:
                          - /.m2/repository/
                        archiveFormat: Tar
          sharedPaths: ## This setting shares directories that are outside the default workspace directory (/harness).
            - /.m2/repository/
  properties:
    ci:
      codebase:
        connectorRef: account.jhttp
        build: <+input>
```

:::tip sharedPaths

The `sharedPaths` setting is used to specify directories outside the default workspace directory (`/harness`).

In the above example, the `/.m2/repository/` directory is outside `/harness`, so it must be specified in `sharedPaths` for the steps to be able to access it.

For more information, go to [Share data between steps in a stage](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#share-data-between-steps-in-a-stage).

:::

</details>

## Configure multilayer caching

Follow these steps to configure multilayer caching in one stage of a CI pipeline.

:::tip

If you are using the visual editor in the Pipeline Studio, you can find **Conditional Execution** and **Failure Strategy** settings on the **Advanced** tab of your step settings.

:::

1. Add **Restore Cache** steps. You need one step for each cache, as identified by a cache key, that you want to attempt to restore.

   In this multilayer caching pattern, the cache keys represent a cadence of potential caches to restore, where you want your pipeline to check if the first cache exists, and, if it doesn't, then check for the second cache, and so on.

   For example, the following YAML adds two **Restore Cache from GCS** steps to a pipeline:

   ```yaml
                 - step:
                     type: RestoreCacheGCS
                     name: L1 Caching
                     identifier: L1_Caching
                     spec:
                       connectorRef: YOUR_GCP_CONNECTOR
                       bucket: YOUR_GCS_BUCKET_NAME
                       key: harness-cache-{{ checksum "pom.xml" }}
                       archiveFormat: Tar
                 - step:
                     type: RestoreCacheGCS
                     name: L2 Cache
                     identifier: L2_Cache
                     spec:
                       connectorRef: YOUR_GCP_CONNECTOR
                       bucket: YOUR_GCS_BUCKET_NAME
                       key: harness-cache-l2
                       archiveFormat: Tar
   ```

   For information about **Restore Cache** step settings, go to [Save and Restore Cache from S3](./saving-cache.md) and [Save and Restore Cache from GCS](./save-cache-in-gcs.md).

2. On each **Restore Cache** step *except the last*, enable **Fail if Key Doesn't Exist** and add a [failure strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/) where the step fails on **All Errors** and executes the **Ignore** action in response. For example:

   ```yaml
                 - step:
                     type: RestoreCacheGCS
                     ...
                     spec:
                       ...
                       failIfKeyNotFound: true
                     failureStrategies:
                       - onFailure:
                           errors:
                             - AllErrors
                           action:
                             type: Ignore
   ```
   This configuration causes the **Restore Cache** step to fail if the cache key doesn't exist, and the **Ignore** action allows the **Restore Cache** step to fail without causing the entire pipeline to fail.

   Here is the YAML for two **Restore Cache from GCS** steps with the failure strategy applied to the first step:

   ```yaml
                 - step:
                     type: RestoreCacheGCS
                     name: L1 Caching
                     identifier: L1_Caching
                     spec:
                       connectorRef: YOUR_GCP_CONNECTOR
                       bucket: YOUR_GCS_BUCKET_NAME
                       key: harness-cache-{{ checksum "pom.xml" }}
                       archiveFormat: Tar
                       failIfKeyNotFound: true
                     failureStrategies:
                       - onFailure:
                           errors:
                             - AllErrors
                           action:
                             type: Ignore
                 - step:
                     type: RestoreCacheGCS
                     name: L2 Cache
                     identifier: L2_Cache
                     spec:
                       connectorRef: YOUR_GCP_CONNECTOR
                       bucket: YOUR_GCS_BUCKET_NAME
                       key: harness-cache-l2
                       archiveFormat: Tar
   ```

3. On each **Restore Cache** step *except the first*, add a [conditional execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/#step-conditions) that runs the step only if the preceding step failed.

   Set the conditional execution to **Execute this step if the stage execution is successful thus far** (`stageStatus: Success`) and include the JEXL condition `<+execution.steps.L1_Caching.status> == "IGNORE_FAILED"`. For example:

   ```yaml
                 - step:
                     type: RestoreCacheGCS
                     ...
                     when:
                       stageStatus: Success
                       condition: <+execution.steps.L1_Caching.status> == "IGNORE_FAILED"
   ```

   Here is the YAML for two **Restore Cache from GCS** steps with the failure strategy applied to the first step and the conditional execution applied to the second step:

   ```yaml
                 - step:
                     type: RestoreCacheGCS
                     name: L1 Caching
                     identifier: L1_Caching
                     spec:
                       connectorRef: YOUR_GCP_CONNECTOR
                       bucket: YOUR_GCS_BUCKET_NAME
                       key: harness-cache-{{ checksum "pom.xml" }}
                       archiveFormat: Tar
                       failIfKeyNotFound: true
                     failureStrategies:
                       - onFailure:
                           errors:
                             - AllErrors
                           action:
                             type: Ignore
                 - step:
                     type: RestoreCacheGCS
                     name: L2 Cache
                     identifier: L2_Cache
                     spec:
                       connectorRef: YOUR_GCP_CONNECTOR
                       bucket: YOUR_GCS_BUCKET_NAME
                       key: harness-cache-l2
                       archiveFormat: Tar
                     when:
                       stageStatus: Success
                       condition: <+execution.steps.L1_Caching.status> == "IGNORE_FAILED"
   ```

4. Add **Save Cache** steps. You need one step for each cache, as identified by a cache key, that you want to save. The **Save Cache** steps don't need failure strategies or conditional executions.

   The following YAML example would add two **Save Cache to GCS** steps to a pipeline. This example uses `sharedPaths` to make the `/.m2/respository/` directory available to the **Save Cache** steps, because this directory is outside the default workspace directory (`/harness`). For more information, go to [Share data between steps in a stage](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#share-data-between-steps-in-a-stage).

   ```yaml
       - stage:
           name: build
           identifier: build
           type: CI
           spec:
             ...
             execution:
               steps:
               ...
               - step:
                   type: SaveCacheGCS
                   name: Save L2 Cache
                   identifier: Save_L2_Cache
                   spec:
                     connectorRef: YOUR_GCP_CONNECTOR
                     bucket: YOUR_GCS_BUCKET_NAME
                     key: harness-cache-l2
                     sourcePaths:
                       - /.m2/repository/
                     archiveFormat: Tar
               - step:
                   type: SaveCacheGCS
                   name: Save L1 Cache
                   identifier: Save_L1_Cache
                   spec:
                     connectorRef: YOUR_GCP_CONNECTOR
                     bucket: YOUR_GCS_BUCKET_NAME
                     key: harness-cache-{{ checksum "pom.xml" }}
                      sourcePaths:
                        - /.m2/repository/
                     archiveFormat: Tar
             sharedPaths:
               - /.m2/repository/
   ```

   For information about **Save Cache** step settings, go to [Save and Restore Cache from S3](./saving-cache.md) and [Save and Restore Cache from GCS](./save-cache-in-gcs.md).

5. Optionally, you can run your **Save Cache** steps in parallel, which can reduce your build time. To do this, use the `- parallel` flag in the YAML editor or manually arrange the steps in the visual editor.

   Here is the YAML for two **Save Cache to GCS** steps that run in parallel:

   ```yaml
       - stage:
           name: build
           identifier: build
           type: CI
           spec:
             ...
             execution:
               steps:
               ...
                 - parallel: ## This tells the pipeline to run the following steps in parallel.
                     - step:
                         type: SaveCacheGCS
                         ...
                     - step:
                         type: SaveCacheGCS
                         ...
             sharedPaths:
               - /.m2/repository/
   ```

   Here is how the parallel steps look in the visual editor:

   <!-- ![](./static/multilayer-caching-save-in-parallel.png) -->

   <docimage path={require('./static/multilayer-caching-save-in-parallel.png')} />

6. Add steps between your **Restore Cache** and **Save Cache** steps to complete your CI pipeline. These could include steps to build code, run tests, build and push images, upload artifacts, and so on.
