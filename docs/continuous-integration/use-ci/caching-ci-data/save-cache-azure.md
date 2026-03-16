---
title: Save and Restore Cache from Azure Blob Storage
description: Caching improves build times and enables you to share data across stages.
sidebar_position: 41
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PreserveMetadata from '/docs/continuous-integration/shared/preserve-metadata.md';

You can use caching to share data across stages or run pipelines faster by reusing data from previous builds.

:::tip
Consider using [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence.md), a [Harness CI Intelligence](/docs/continuous-integration/use-ci/harness-ci-intelligence.md) feature, to automatically cache and restore software dependencies.
:::

You can cache data to an Azure Blob Storage container in one stage using the **Save Cache to Azure** step, and restore it in the same stage or a following stage using the **Restore Cache from Azure** step. You can't share access credentials or other [Text Secrets](/docs/platform/secrets/add-use-text-secrets) across stages.

This topic explains how to configure the **Save Cache to Azure** and **Restore Cache from Azure** steps in Harness CI.

## Azure Blob Storage and connector requirements

You need:

* A dedicated Azure Storage account for your Harness CI cache operations.
* A dedicated Azure Blob container for CI cache data.

   :::warning

   Use a dedicated container for cache data only. Do not save files to the container manually. The Restore Cache operation fails if the container includes files that do not have a Harness cache key.

   :::

* An [Azure connector](/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector) with read/write access to your target storage account and container.

## Add the Save Cache to Azure step

Add the **Save Cache to Azure** step after steps that build and test your code.

<Tabs>
  <TabItem value="Visual" label="Visual">

1. Go to the pipeline and stage where you want to add the **Save Cache to Azure** step.
2. Select **Add Step**, select **Add Step** again, and then select **Save Cache to Azure** in the Step Library.
3. Configure the [Save Cache to Azure step settings](#save-cache-to-azure-step-settings).
4. Select **Apply changes** to save the step.

</TabItem>
  <TabItem value="YAML" label="YAML" default>

To add a **Save Cache to Azure** step in the YAML editor, add a `type: SaveCacheAzure` step, then define the [Save Cache to Azure step settings](#save-cache-to-azure-step-settings). The following are required:

* `connectorRef`: The Azure connector ID.
* `storageAccount`: The Azure Storage account name.
* `containerName`: The Azure Blob container name.
* `key`: The cache key to identify the cache.
* `sourcePaths`: Files and folders to cache. Specify each file or folder separately.
* `archiveFormat`: The archive format. The default format is `Tar`.

Here is a YAML example of a **Save Cache to Azure** step.

```yaml
              - step:
                  type: SaveCacheAzure
                  name: Save Cache to Azure
                  identifier: Save_Cache_to_Azure
                  spec:
                    connectorRef: account.azure_connector
                    containerName: ci-cache
                    storageAccount: yourstorageaccount
                    key: cache-{{ checksum "pom.xml" }}
                    sourcePaths:
                      - /shared
                    archiveFormat: Tar
...
```

</TabItem>
</Tabs>

### Save Cache to Azure step settings

The **Save Cache to Azure** step has the following settings. Depending on the stage's build infrastructure, some settings might be unavailable or optional. Settings specific to containers, such as **Set Container Resources**, are not applicable when using the step in a stage with VM or Harness Cloud build infrastructure.

#### Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](/docs/platform/references/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

#### Azure Connector

The Harness Azure connector to use when saving the cache to Azure Blob Storage.

#### Key

The key to identify the cache.

You can use the checksum macro to create a key based on a file's checksum, for example: `myApp-{{ checksum filePath1 }}`

With this macro, Harness checks if the key exists and compares the checksum. If the checksum matches, Harness does not save the cache. If the checksum is different, Harness saves the cache.

The backslash character is not allowed as part of the checksum value here. This is a limitation of the Go language (golang) template. You must use a forward slash instead.

* Incorrect format: `cache-{{ checksum ".\src\common\myproj.csproj" }`
* Correct format: `cache-{{ checksum "./src/common/myproj.csproj" }}`

#### Storage Account

The Azure Storage account where you want to save the cache.

#### Container Name

The Azure Blob container where the cache is stored.

#### Source Paths

A list of the files/folders to cache. Add each file/folder separately.

#### Archive Format

Select the archive format. The default archive format is Tar.

#### Override Cache

Select this option if you want to override the cache when a cache with a matching **Key** already exists.

By default, the **Override Cache** option is set to false (unselected).

#### Run as User

Specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

#### Set Container Resources

Maximum resources limits for the resources used by the container at runtime:

* **Limit Memory:** Maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number with the suffixes `G` or `M`. You can also use the power-of-two equivalents, `Gi` or `Mi`. Do not include spaces when entering a fixed value. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed. For example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

#### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](/docs/platform/pipelines/step-skip-condition-settings.md)
* [Step Failure Strategy settings](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)

<PreserveMetadata/>

## Add the Restore Cache from Azure step

Add the **Restore Cache from Azure** step before steps that build and test your code.

<Tabs>
  <TabItem value="Visual" label="Visual">

1. Go to the pipeline and stage where you want to add the **Restore Cache from Azure** step.
2. Select **Add Step**, select **Add Step** again, and then select **Restore Cache from Azure** in the Step Library.
3. Configure the [Restore Cache from Azure step settings](#restore-cache-from-azure-step-settings). The storage account, container, and key must correspond with the settings in the **Save Cache to Azure** step.
4. Select **Apply changes** to save the step, and then select **Save** to save the pipeline.

</TabItem>
  <TabItem value="YAML" label="YAML" default>

To add a **Restore Cache from Azure** step in the YAML editor, add a `type: RestoreCacheAzure` step, and then define the [Restore Cache from Azure step settings](#restore-cache-from-azure-step-settings). The following settings are required:

* `connectorRef`: The Azure connector ID.
* `storageAccount`: The Azure Storage account name. This must correspond with the Save Cache to Azure `storageAccount`.
* `containerName`: The Azure Blob container name. This must correspond with the Save Cache to Azure `containerName`.
* `key`: The cache key. This must correspond with the Save Cache to Azure `key`.
* `archiveFormat`: The archive format, corresponding with the Save Cache to Azure `archiveFormat`.

Here is a YAML example of a **Restore Cache from Azure** step.

```yaml
              - step:
                  type: RestoreCacheAzure
                  name: Restore Cache from Azure
                  identifier: Restore_Cache_from_Azure
                  spec:
                    connectorRef: account.azure_connector
                    containerName: ci-cache
                    storageAccount: yourstorageaccount
                    key: cache-{{ checksum "pom.xml" }}
                    archiveFormat: Tar
...
```

</TabItem>
</Tabs>

### Restore Cache from Azure step settings

The **Restore Cache from Azure** step has the following settings. Depending on the stage's build infrastructure, some settings might be unavailable or optional. Settings specific to containers, such as **Set Container Resources**, are not applicable when using the step in a stage with VM or Harness Cloud build infrastructure.

#### Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](/docs/platform/references/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

#### Azure Connector

The Harness connector to use when restoring the cache from Azure Blob Storage. If your pipeline also has a **Save Cache to Azure** step, these steps typically use the same connector.

#### Key

The key identifying the cache that you want to retrieve. If your pipeline also has a **Save Cache to Azure** step, the key value must be the same to restore the previously-saved cache.

The backslash character is not allowed as part of the checksum value here. This is a limitation of the Go language (golang) template. You must use a forward slash instead.

* Incorrect format: `cache-{{ checksum ".\src\common\myproj.csproj" }`
* Correct format: `cache-{{ checksum "./src/common/myproj.csproj" }}`

#### Storage Account

The Azure Storage account where the target cache is saved.

#### Container Name

The Azure Blob container where the target cache is saved.

#### Archive Format

Select the archive format. The default archive format is Tar.

#### Fail if Key Doesn't Exist

Select this option to fail the step if the specified **Key** does not exist.

By default, this option is set to false (unselected).

#### Run as User

Specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

#### Set Container Resources

Maximum resources limits for the resources used by the container at runtime:

* **Limit Memory:** Maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number with the suffixes `G` or `M`. You can also use the power-of-two equivalents, `Gi` or `Mi`. Do not include spaces when entering a fixed value. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed. For example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

#### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](/docs/platform/pipelines/step-skip-condition-settings.md)
* [Step Failure Strategy settings](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)

## Set shared paths for cache locations outside the stage workspace

Steps in the same stage share the same [workspace](/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#workspace), which is `/harness`. If your steps need to use data in locations outside the stage workspace, you must specify these as [shared paths](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#share-data-between-steps-in-a-stage). This is required if you want to cache directories outside `/harness`. For example:

```yaml
  stages:
    - stage:
        spec:
          sharedPaths:
            - /example/path # directory outside workspace to share between steps
```

## Use the Cache Plugin step

You can also save and restore Azure caches using the [Cache Plugin](https://github.com/drone-plugins/drone-meltwater-cache) in a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md). Harness recommends the native **Save Cache to Azure** and **Restore Cache from Azure** steps described above.

<details>
<summary>Save and restore Azure cache with the Cache Plugin step</summary>

You must use separate Plugin steps to save and restore the cache.

#### Restore cache with the Cache Plugin step

```yaml
              - step:
                  type: Plugin
                  name: restore cache from Azure
                  identifier: restore_cache_from_Azure
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: plugins/cache
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

#### Save cache with the Cache Plugin step

```yaml
              - step:
                  type: Plugin
                  name: save cache to Azure
                  identifier: save_cache_to_Azure
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: plugins/cache
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

#### Configure stage variables for the Cache Plugin step

These stage variables help you avoid hardcoding values in Plugin step YAML:

```yaml
  variables:
    - name: AZURE_CONTAINER
      type: String
      value: somecontainer
    - name: AZURE_BLOB_ACCOUNT
      type: String
      value: someaccount
    - name: REGION
      type: String
      value: westus2
    - name: AZURE_KEY
      type: String
      value: <+secrets.getValue("azureblobkey")>
    - name: GRADLE_HOME
      type: String
      value: /harness/gradle
    - name: BUILD_PATH
      type: String
      value: gradle-examples/some-gradle-examples
```

:::tip

Store sensitive values, such as tokens, as [Harness secrets](/docs/platform/secrets/add-use-text-secrets). You can then use [Harness expressions](/docs/platform/variables-and-expressions/harness-variables) to reference these secrets, such as `<+secrets.getValue("azure_key")>`.

:::

</details>

## Troubleshoot caching

Go to the [CI Knowledge Base](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs) for questions and issues related to caching, data sharing, dependency management, workspaces, shared paths, and more. For example:

* [Why are changes made to a container image filesystem in a CI step is not available in the subsequent step that uses the same container image?](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#why-are-changes-made-to-a-container-image-filesystem-in-a-ci-step-is-not-available-in-the-subsequent-step-that-uses-the-same-container-image)
* [How can I use an artifact in a different stage from where it was created?](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#how-can-i-use-an-artifact-in-a-different-stage-from-where-it-was-created)
* [How can I check if the cache was restored?](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#how-can-i-check-if-the-cache-was-restored)
* [How can I share cache between different OS types (Linux/macOS)?](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#how-can-i-share-cache-between-different-os-types-linuxmacos)
