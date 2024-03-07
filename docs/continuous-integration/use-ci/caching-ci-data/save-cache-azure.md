---
title: Save and Restore Cache from Azure
description: Caching improves build times and enables you to share data across stages.
sidebar_position: 41
---

You can use the [drone-cache plugin](https://github.com/meltwater/drone-cache) in your CI pipelines to save and retrieve cached data from Azure storage.

This is the same plugin used by Harness for [S3 caching](./saving-cache.md) and [GCS caching](./save-cache-in-gcs.md) steps.

To run use this plugin for Azure caching, use [Plugin steps](../use-drone-plugins/run-a-drone-plugin-in-ci.md) to save and restore the cache.

You need access to Azure storage and a [CI pipeline](../prep-ci-pipeline-components.md) where you want to use Azure caching.

:::warning

You can't share access credentials or other [Text Secrets](/docs/platform/secrets/add-use-text-secrets) across stages.

:::

## Add save and restore cache steps

Add [Plugin steps](../use-drone-plugins/plugin-step-settings-reference.md) to your CI pipeline. Use separate steps for saving and restoring the cache.

### Determine cache step placement

Arrangement of save and restore cache steps depends on how you're using caching in a pipeline.

* If you use caching in a single stage, place the restore cache step before the save cache step.
* If you use caching across multiple stages, put the save cache step in the stage where you create the data you want to cache, and then put the restore cache step in the stage where you want to load the previously-cached data.
   * Multi-stage caching is useful for passing data from one stage to the next, because in Harness CI stages run in isolated workspaces.

### Configure restore cache step

To restore a cache from Azure, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) that uses the `drone-cache` plugin, for example:

```yaml
              - step:
                  type: Plugin
                  name: restore cache from Azure
                  identifier: restore_cache_from_Azure
                  spec:
                    connectorRef: account.harnessImage
                    image: meltwater/drone-cache
                    settings:
                      restore: true
                      cache_key: <+pipeline.variables.AZURE_CONTAINER>/<+pipeline.identifier>/{{ .Commit.Branch }}-{{ checksum "<+pipeline.variables.BUILD_PATH>/build.gradle" }}
                      archive_format: gzip
                      mount:
                        - <+pipeline.variables.GRADLE_HOME>/caches/
                      region: <+pipeline.variables.REGION>
                      account_key: <+pipeline.variables.AZURE_KEY>
                      account_name: <+pipeline.variables.AZURE_BLOB_ACCOUNT>
                      backend: azure
```

The Plugin step requires the following settings. For more information about the drone-cache settings, go to the [drone-cache GitHub repository](https://github.com/meltwater/drone-cache).

* `connectorRef` - Use the built-in Docker connector or specify a Docker connector to pull the plugin image.
* `image: meltwater/drone-cache` - Indicates the drone-cache plugin image.
* `restore: true` - Indicates that you want to use the plugin to restore a cache.
* `cache_key` - Specify the Azure container and the identifier of the cache to restore.
   * The drone-cache plugin can accept a `blob_container_name` value; however, this is not needed because the Azure container name is referenced in the `cache_key`.
   * For pipelines stored in Git repos, the drone-cache plugin attempts to find an Azure container named after your Git repo.
   * For the cache identifier, you can use a checksum for a build tool or a static identifier. Usually the identifier is some form of a variable value based on the build number or a checksum.
   * This example [uses stage variables](#use-stage-variables) to populate parts of the cache key:

   ```
   <+pipeline.variables.AZURE_CONTAINER>/<+pipeline.identifier>/{{ .Commit.Branch }}-{{ checksum "<+pipeline.variables.BUILD_PATH>/build.gradle" }}
   ```

* `archive_format` - Specify the archive format.
* `mount` - Path to directories to restore.
* `region` - The Azure bucket region.
* `account_key` - An [expression referencing a secret](/docs/platform/secrets/add-use-text-secrets#step-3-reference-the-encrypted-text-by-identifier) containing an Azure token to access the bucket, such as `<+secrets.getValue("azure_key")>`.
* `account_name` - Azure bucket name.
* `backend: azure` - Hardcoded backend type.

### Configure save cache step

To save a cache to Azure, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) that uses the `drone-cache` plugin, for example:

```yaml
              - step:
                  type: Plugin
                  name: save cache to Azure
                  identifier: save_cache_to_Azure
                  spec:
                    connectorRef: account.harnessImage
                    image: meltwater/drone-cache
                    settings:
                      rebuild: true
                      cache_key: <+pipeline.variables.AZURE_CONTAINER>/<+pipeline.identifier>/{{ .Commit.Branch }}-{{ checksum "<+pipeline.variables.BUILD_PATH>/build.gradle" }}
                      archive_format: gzip
                      mount:
                        - <+pipeline.variables.GRADLE_HOME>/caches/
                      region: <+pipeline.variables.REGION>
                      account_key: <+pipeline.variables.AZURE_KEY>
                      account_name: <+pipeline.variables.AZURE_BLOB_ACCOUNT>
                      backend: azure
```

The Plugin step requires the following settings. For more information about the drone-cache settings, go to the [drone-cache GitHub repository](https://github.com/meltwater/drone-cache).

* `connectorRef` - Use the built-in Docker connector or specify a Docker connector to pull the plugin image.
* `image: meltwater/drone-cache` - Indicates the drone-cache plugin image.
* `rebuild: true` - Indicates that you want to use the plugin to save a cache.
* `cache_key` - Specify the Azure container and the identifier of the cache to save.
   * The drone-cache plugin can accept a `blob_container_name` value; however, this is not needed because the Azure container name is referenced in the `cache_key`.
   * For pipelines stored in Git repos, the drone-cache plugin attempts to find an Azure container named after your Git repo.
   * For the cache identifier, you can use a checksum for a build tool or a static identifier. Usually the identifier is some form of a variable value based on the build number or a checksum.
   * This example [uses stage variables](#use-stage-variables) to populate parts of the cache key:

   ```
   <+pipeline.variables.AZURE_CONTAINER>/<+pipeline.identifier>/{{ .Commit.Branch }}-{{ checksum "<+pipeline.variables.BUILD_PATH>/build.gradle" }}
   ```

* `archive_format` - Specify the archive format.
* `mount` - Path to directories to cache relative to the workspace root, `/harness`. You need to [set shared paths for cache locations outside the stage workspace](#set-shared-paths-for-cache-locations-outside-the-stage-workspace).
* `region` - The Azure bucket region.
* `account_key` - An [expression referencing a secret](/docs/platform/secrets/add-use-text-secrets#step-3-reference-the-encrypted-text-by-identifier) containing an Azure token to access the bucket, such as `<+secrets.getValue("azure_key")>`.
* `account_name` - Azure bucket name.
* `backend: azure` - Hardcoded backend type.

### Set shared paths for cache locations outside the stage workspace

Steps in the same stage share the same [workspace](/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#workspace), which is `/harness`. If your steps need to use data in locations outside the stage workspace, you must specify these as [shared paths](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#share-data-between-steps-in-a-stage). This is required if you want to cache directories outside `/harness`. For example:

```yaml
  stages:
    - stage:
        spec:
          sharedPaths:
            - /example/path # directory outside workspace to share between steps
```

### Use stage variables

The drone-cache plugin requires several settings, including secrets and other sensitive values. You might find it useful to provide these values through [stage variables](../set-up-build-infrastructure/ci-stage-settings.md#advanced-stage-variables), rather than placing the literal values directly in the Plugin steps.

These examples uses Gradle. Your variables and values might differ depending on your build tool, caching needs, and where you choose to use variables.

```yaml
  variables:
    - name: AZURE_CONTAINER
      type: String
      description: "Used in the cache key. Specifies the container within the bucket."
      value: somecontainer
    - name: AZURE_BLOB_ACCOUNT
      type: String
      description: "Azure account name."
      value: someaccount
    - name: REGION
      type: String
      description: "Azure bucket location."
      value: us-west-2
    - name: AZURE_KEY
      type: String
      description: "Reference a Harness text secret containing your Azure account key."
      value: <+secrets.getValue("azureblobkey")>
    - name: GRADLE_HOME
      type: String
      description: "Used in mount path. Build-specific Gradle home location and the child cache folder beneath."
      value: /harness/gradle
    - name: BUILD_PATH
      type: String
      description: "Used in the cache key checksum. Optional path to build.gradle within a Git repo."
      value: gradle-examples/some-gradle-examples
```

## Cache step logs

You can observe and review build logs on the [Build details page](../viewing-builds.md).

## Troubleshoot caching

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to caching, data sharing, dependency management, workspaces, shared paths, and more. For example:

* [Why are changes made to a container image filesystem in a CI step is not available in the subsequent step that uses the same container image?](/kb/continuous-integration/continuous-integration-faqs/#why-are-changes-made-to-a-container-image-filesystem-in-a-ci-step-is-not-available-in-the-subsequent-step-that-uses-the-same-container-image)
* [How can I use an artifact in a different stage from where it was created?](/kb/continuous-integration/continuous-integration-faqs/#how-can-i-use-an-artifact-in-a-different-stage-from-where-it-was-created)
* [How can I check if the cache was restored?](/kb/continuous-integration/continuous-integration-faqs/#how-can-i-check-if-the-cache-was-restored)
