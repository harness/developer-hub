---
title: Save and Restore Cache from Azure
description: Caching improves build times and enables you to share data across stages.
sidebar_position: 41
---

You can use the [Cache plugin](https://github.com/drone-plugins/drone-meltwater-cache) in your CI pipelines to save and retrieve cached data from Azure storage.

:::warning

You can't share access credentials or other [Text Secrets](/docs/platform/secrets/add-use-text-secrets) across stages.

:::

## Requirements

You need:

* Access to Azure storage.
* A [CI pipeline](../prep-ci-pipeline-components.md) where you want to use Azure caching.

## Add save and restore cache steps

To use the Cache plugin for Azure caching, you use [Plugin steps](../use-drone-plugins/plugin-step-settings-reference.md).

You must use separate Plugin steps to save and restore the cache.

### Determine cache step placement

Where you place the save and restore steps depends on how you [use caching in your pipeline](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages):

* Caching in one stage: Place the restore cache step *before* the save cache step.
* Caching across multiple stages: Place the save cache step in the stage where you create the data you want to cache, and then place the restore cache step in the stage where you want to load the previously-cached data.

### Restore Azure cache

To restore a cache from Azure, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) that uses the `cache` plugin, for example:

```yaml
              - step:
                  type: Plugin
                  name: restore cache from Azure
                  identifier: restore_cache_from_Azure
                  spec:
                    connectorRef: account.harnessImage ## Specify a Docker connector to pull the plugin image.
                    image: plugins/cache ## Must be 'plugins/cache'. This is the Cache plugin image.
                    settings:
                      restore: true ## You must include 'restore: true' to use the Cache plugin to restore a cache.
                      cache_key: <+pipeline.variables.AZURE_CONTAINER>/<+pipeline.identifier>/{{ .Commit.Branch }}-{{ checksum "<+pipeline.variables.BUILD_PATH>/build.gradle" }} ## Specify the Azure container and the identifier of the cache to restore. Review notes about this setting below.
                      archive_format: gzip ## Specify the archive format.
                      mount: ## Provide paths to directories to restore.
                        - <+pipeline.variables.GRADLE_HOME>/caches/
                      region: <+pipeline.variables.REGION> ## The Azure bucket region
                      account_key: <+pipeline.variables.AZURE_KEY> ## Azure token to access the bucket
                      account_name: <+pipeline.variables.AZURE_BLOB_ACCOUNT> ## Azure bucket name
                      backend: azure ## Hardcoded backend type
```

:::tip

Harness recommends storing sensitive values, such as tokens, as [Harness secrets](/docs/platform/secrets/add-use-text-secrets). You can then use [Harness expressions](/docs/platform/variables-and-expressions/harness-variables) to reference these secrets, such as `<+secrets.getValue("azure_key")>`.

:::

#### cache_key

When using the `cache` plugin to restore an Azure cache, the `cache_key` is the Azure container and the identifier of the cache to restore. Note the following additional information about this setting:

* The cache plugin can accept a `blob_container_name` value; however, this is not needed because the Azure container name is referenced in the `cache_key`.
* For pipelines stored in Git repos, the cache plugin attempts to find an Azure container named after your Git repo.
* For the cache identifier, you can use a checksum for a build tool or a static identifier. Usually the identifier is some form of a variable value based on the build number or a checksum.
* This example [uses stage variables](#use-stage-variables) to populate parts of the cache key:

```
<+pipeline.variables.AZURE_CONTAINER>/<+pipeline.identifier>/{{ .Commit.Branch }}-{{ checksum "<+pipeline.variables.BUILD_PATH>/build.gradle" }}
```

### Save Azure cache

To save a cache to Azure, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) that uses the `cache` plugin, for example:

```yaml
              - step:
                  type: Plugin
                  name: save cache to Azure
                  identifier: save_cache_to_Azure
                  spec:
                    connectorRef: account.harnessImage ## Specify a Docker connector to pull the plugin image.
                    image: plugins/cache ## Must be 'plugins/cache'. This is the Cache plugin image.
                    settings:
                      rebuild: true ## You must include 'rebuild: true' to use the Cache plugin to save a cache.
                      cache_key: <+pipeline.variables.AZURE_CONTAINER>/<+pipeline.identifier>/{{ .Commit.Branch }}-{{ checksum "<+pipeline.variables.BUILD_PATH>/build.gradle" }} ## Specify the Azure container and the identifier of the cache to save. Review notes about this setting below.
                      archive_format: gzip ## Specify the archive format.
                      mount: ## Provide paths to directories to cache relative to the workspace root '/harness'. You must add 'sharedPaths' for cache locations outside the stage workspace.
                        - <+pipeline.variables.GRADLE_HOME>/caches/
                      region: <+pipeline.variables.REGION> ## The Azure bucket region
                      account_key: <+pipeline.variables.AZURE_KEY> ## Azure token to access the bucket
                      account_name: <+pipeline.variables.AZURE_BLOB_ACCOUNT> ## Azure bucket name
                      backend: azure ## Hardcoded backend type
```

:::tip

Harness recommends storing sensitive values, such as tokens, as [Harness secrets](/docs/platform/secrets/add-use-text-secrets). You can then use [Harness expressions](/docs/platform/variables-and-expressions/harness-variables) to reference these secrets, such as `<+secrets.getValue("azure_key")>`.

:::

#### cache_key

When using the `cache` plugin to save an Azure cache, the `cache_key` is the Azure container and the identifier of the cache to save. Note the following additional information about this setting:

* The cache plugin can accept a `blob_container_name` value; however, this is not needed because the Azure container name is referenced in the `cache_key`.
* For pipelines stored in Git repos, the cache plugin attempts to find an Azure container named after your Git repo.
* For the cache identifier, you can use a checksum for a build tool or a static identifier. Usually the identifier is some form of a variable value based on the build number or a checksum.
* This example [uses stage variables](#use-stage-variables) to populate parts of the cache key:

```
<+pipeline.variables.AZURE_CONTAINER>/<+pipeline.identifier>/{{ .Commit.Branch }}-{{ checksum "<+pipeline.variables.BUILD_PATH>/build.gradle" }}
```

### Set shared paths for cache locations outside the stage workspace

In a Harness pipeline, all steps in a given stage share the same [workspace](/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#workspace), which is `/harness`.

If your steps need to use data in locations outside the root workspace, you must add these as [shared paths](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#share-data-between-steps-in-a-stage).

:::warning

Shared paths are required if you want to cache directories outside `/harness`.

:::

For example:

```yaml
  stages:
    - stage:
        spec:
          sharedPaths:
            - /example/path # Directory outside workspace to share between stages
```

### Use stage variables (optional)

The cache plugin requires several settings, including secrets and other sensitive values. You might find it useful to provide these values through [stage variables](../set-up-build-infrastructure/ci-stage-settings.md#advanced-stage-variables), rather than placing the literal values directly in the Plugin steps.

These examples use Gradle. Your variables and values might differ depending on your build tool, caching needs, and where you choose to use variables.

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

## Pipeline YAML example

Here's an example of a pipeline that builds and tests a Go app. It includes steps to restore and save a cache to Azure storage.

```yaml
  stages:
    - stage:
        identifier: testgo
        type: CI
        name: testGo
        description: ""
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
                  identifier: go_env
                  type: Run
                  name: go env
                  spec:
                    shell: Sh
                    command: go env
              - step:
                  identifier: setupgo
                  type: Action
                  name: Setup Go
                  spec:
                    uses: actions/setup-go@v4
                    with:
                      go-version: 1.21.x
                  timeout: ""
              - step:
                  identifier: Azure_restore_cache
                  type: Plugin
                  name: Azure restore cache
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/cache
                    settings:
                      backend: azure
                      restore: true
                      account_key: <+secrets.getValue("azureblobkey")>
                      account_name: azureAccountName
                      archive_format: gzip
                      region: westus2
                      mount:
                        - /home/harness/.cache/go-build
                        - /home/harness/go/pkg/mod
                      cache_key: "<+pipeline.identifier>/cache-{{ .Commit.Branch }}-{{\
                        \ checksum \"go.mod\" }}-{{ checksum \"go.sum\" }}"
              - step:
                  identifier: rununittests
                  type: Run
                  name: Run unit tests
                  spec:
                    command: |-
                      export PATH=$(go env GOPATH)/bin:$PATH
                      go install github.com/jstemmer/go-junit-report/v2@latest
                      go test -v ./... -coverprofile cover.out | tee report.out
                      cat report.out | go-junit-report -set-exit-code > report.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report.xml
              - step:
                  identifier: debug
                  type: Run
                  name: debug
                  spec:
                    shell: Sh
                    command: |-
                      go env
                      ls /home/harness/.cache/go-build
                      ls /home/harness/go/pkg/mod
              - step:
                  identifier: Azure_write_cache
                  type: Plugin
                  name: Azure write cache
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/cache
                    settings:
                      rebuild: true
                      cache_key: "<+pipeline.identifier>/cache-{{ .Commit.Branch }}-{{\
                        \ checksum \"go.mod\" }}-{{ checksum \"go.sum\" }}"
                      archive_format: gzip
                      mount:
                        - /home/harness/.cache/go-build
                        - /home/harness/go/pkg/mod
                      region: westus2
                      account_key: <+secrets.getValue("azureblobkey")>
                      account_name: azureAccountName
                      backend: azure
          sharedPaths:
            - /home/harness
```

## Cache step logs

When you run a pipeline with caching steps, you can observe and review build logs on the [Build details page](../viewing-builds.md).

## Troubleshoot caching

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to caching, data sharing, dependency management, workspaces, shared paths, and more. For example:

* [Why are changes made to a container image filesystem in a CI step is not available in the subsequent step that uses the same container image?](/kb/continuous-integration/continuous-integration-faqs/#why-are-changes-made-to-a-container-image-filesystem-in-a-ci-step-is-not-available-in-the-subsequent-step-that-uses-the-same-container-image)
* [How can I use an artifact in a different stage from where it was created?](/kb/continuous-integration/continuous-integration-faqs/#how-can-i-use-an-artifact-in-a-different-stage-from-where-it-was-created)
* [How can I check if the cache was restored?](/kb/continuous-integration/continuous-integration-faqs/#how-can-i-check-if-the-cache-was-restored)
* [How can I share cache between different OS types (Linux/macOS)?](/kb/continuous-integration/continuous-integration-faqs/#how-can-i-share-cache-between-different-os-types-linuxmacos)