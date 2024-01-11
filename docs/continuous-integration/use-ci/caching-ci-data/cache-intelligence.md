---
title: Cache Intelligence
description: Caching dependencies can improve build times.
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Modern continuous integration systems execute pipelines inside ephemeral environments that are provisioned solely for pipeline execution and are not reused from prior pipeline runs. As builds often require downloading and installing many library and software dependencies, caching these dependencies for quick retrieval at runtime can save a significant amount of time.

There are several ways to configure caching in Harness CI, such as Cache Intelligence, Save and Restore Cache steps, and mounting volumes. Save and Restore Cache steps and mounted volumes require you to manage the cache. With Cache Intelligence, Harness automatically caches and restores common dependencies. Cache Intelligence also doesn't require you to bring your own storage, because the cache is stored in the Harness-hosted environment, Harness Cloud.

<!-- Video: Cache Intelligence demo
https://www.loom.com/share/20703014b50042b5972e14cefea87f49?sid=d87d4bad-6482-44f2-a379-0b843c399a26-->
<DocVideo src="https://www.loom.com/share/20703014b50042b5972e14cefea87f49?sid=d87d4bad-6482-44f2-a379-0b843c399a26" />

## Supported build infrastructures

Currently, Cache Intelligence is only available for Linux and Windows platforms on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure), the Harness-hosted build environment.

For other build infrastructures, you can use Save and Restore Cache steps, such as [Save and Restore Cache from S3](./saving-cache.md), to include caching in your CI pipelines.

## Supported tools and paths

Cache Intelligence fully supports **Bazel**, **Maven**, **Gradle**, **Yarn**, **Go**, and **Node** build tools, _if the dependencies are stored in the default location for that tool_.

For other build tools or non-default cache locations, you can leverage Harness Cloud's cache storage by [enabling Cache Intelligence](#enable-cache-intelligence) and providing [custom cache paths](#customize-cache-paths).

## Cache storage

Harness Cloud allows up to 2GB of cache storage per account. All pipelines in the account use the same cache storage, and each build tool has a unique cache key that is used to restore the appropriate cache data at runtime.

The cache retention window is 15 days, which resets whenever the cache is updated.

## Enable Cache Intelligence

<Tabs>
  <TabItem value="Visual" label="Visual">

:::note

Currently, the Cache Intelligence Visual Editor fields are behind the feature flag `CI_CACHE_INTELLIGENCE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

1. Edit the pipeline, and select the **Build** stage where you want to enable Cache Intelligence.
2. Select the **Overview** tab for the stage.
3. Select **Enable Cache Intelligence**.
4. If you're using an unsupported build tool, a non-default cache location, or a Windows platform, then you must add [custom cache paths](#customize-cache-paths). For a list of supported tools, go to [Supported tools and paths](#supported-tools-and-paths).
5. Optionally, you can add a [custom cache key](#customize-cache-keys).

</TabItem>
  <TabItem value="YAML" label="YAML" default>

To enable Cache Intelligence in the YAML editor, add the following lines to the `stage.spec`:

```yaml
caching:
  enabled: true
```

For example:

```yaml
- stage:
    name: Build
    identifier: Build
    type: CI
    spec:
      caching:
        enabled: true
      cloneCodebase: true
```

If you're using an unsupported build tool, a non-default cache location, or a Windows platform, you must add [custom cache paths](#customize-cache-paths). For a list of supported tools, go to [Supported tools and paths](#supported-tools-and-paths).

Optionally, you can add a [custom cache key](#customize-cache-keys).

</TabItem>
</Tabs>

### Customize cache paths

Cache Intelligence stores the data to be cached in the `/harness` directory by default. You can use `paths` to specify a list of locations to be cached. This is useful if:

- Cache Intelligence is not supported for your build tool.
- You have customized cache locations, such as with `yarn config set cache-folder`.
- You're using a Windows platform.

<Tabs>
  <TabItem value="Visual" label="Visual">

:::note

Currently, the Cache Intelligence Visual Editor fields are behind the feature flag `CI_CACHE_INTELLIGENCE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

1. Edit the pipeline, and select the **Build** stage where you want to enable Cache Intelligence.
2. Select the **Overview** tab for the stage.
3. Make sure **Enable Cache Intelligence** is selected.
4. Add **Paths** to cache.

   Note that on Windows platforms, you might need to specify the cache path from `C:`, such as `C:\harness\node_modules`.

   <!-- ![](./static/cache_int_paths.png) -->

   <DocImage path={require('./static/cache_int_paths.png')} />

5. If a cache path is outside the `/harness` directory, you must _also_ specify this in **[Shared Paths](../set-up-build-infrastructure/ci-stage-settings.md#shared-paths)**.

   <!-- ![](./static/cache_int_shared_paths.png) -->

   <DocImage path={require('./static/cache_int_shared_paths.png')} />

</TabItem>
  <TabItem value="YAML" label="YAML" default>

In the YAML editor, add a list of `paths` to cache under `stage.spec.caching`, for example:

```yaml
- stage:
    name: Build
    identifier: Build
    type: CI
    spec:
      caching:
        enabled: true
        paths:
          - /harness/node_modules ## On a Windows platform, the path would be 'C:\harness\node_modules'.
      cloneCodebase: true
```

If a cache path is outside the `/harness` directory, you must _also_ specify this as a [shared path](../set-up-build-infrastructure/ci-stage-settings.md#shared-paths). In the YAML editor, add a list of `sharedPaths` under `stage.spec`, for example:

```yaml
- stage:
    name: Build
    identifier: Build
    type: CI
    spec:
      caching:
        enabled: true
        paths:
          - /harness/node_modules
          - /my_cache_directory/module_cache1
      cloneCodebase: true
---
platform:
  os: Linux
  arch: Amd64
runtime:
  type: Cloud
  spec: {}
sharedPaths:
  - /my_cache_directory/module_cache1
```

</TabItem>
</Tabs>

### Customize cache keys

Harness generates a cache key from a hash of the build lock file (such as `pom.xml`, `build.gradle`, or `package.json`) that Harness detects. If Harness detects multiple tools or multiple lock files, Harness combines the hashes to create the cache key.

<Tabs>
  <TabItem value="Visual" label="Visual">

:::note

Currently, the Cache Intelligence Visual Editor fields are behind the feature flag `CI_CACHE_INTELLIGENCE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

1. Edit the pipeline, and select the **Build** stage where you want to enable Cache Intelligence.
2. Select the **Overview** tab for the stage.
3. Make sure **Enable Cache Intelligence** is selected.
4. Enter the custom key value in **Key**. You can use [fixed values, runtime inputs, and expressions](/docs/platform/variables-and-expressions/runtime-inputs) for the key value.

   <!-- ![](./static/cache_int_custom_key.png) -->

   <DocImage path={require('./static/cache_int_custom_key.png')} />

</TabItem>
  <TabItem value="YAML" label="YAML" default>

To customize the cache key in the YAML editor, add `key: CUSTOM_KEY_VALUE` under `stage.spec.caching`. You can use [fixed values, runtime inputs, and expressions](/docs/platform/variables-and-expressions/runtime-inputs) for the key value.

The following YAML example uses `<+input>`, which prompts the user to supply a cache key value at runtime.

```yaml
- stage:
    name: Build
    identifier: Build
    type: CI
    spec:
      caching:
        enabled: true
        key: <+input>
      cloneCodebase: true
```

</TabItem>
</Tabs>

### Cache Intelligence in parallel stages

If you have multiple stages that run in parallel, you must use [custom cache keys](#customize-cache-keys) for each stage that uses Cache Intelligence. This prevents conflicts when the parallel stages attempt to save or retrieve caches concurrently.

If your stage uses a matrix or repeat [looping strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) that generates multiple stage instances, you can use a [Harness expression](/docs/platform/variables-and-expressions/harness-variables) to generate unique cache keys, such as `key: cachekey-<+strategy.iteration>`. The `<+strategy.iteration>` expressions references the stage's iteration index. Each instance of the stage generated by the matrix/repeat strategy has a different iteration index, starting from `0`.

## Cache Intelligence API

You can use the Cache Intelligence API to get information about the cache or delete the cache.

API key authentication is required. You need a [Harness API key](/docs/platform/automation/api/add-and-manage-api-keys) with [core_account_edit](/docs/platform/automation/api/api-permissions-reference) permission. For more information about API keys, go to [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys). For more information about authentication, go to the [Harness API documentation](https://apidocs.harness.io/#section/Introduction/Authentication).

### Get cache metadata

Get metadata about the cache, such as the size and path.

```
curl --location --request GET 'https://app.harness.io/gateway/ci/cache/info?accountIdentifier=$YOUR_HARNESS_ACCOUNT_ID' \
--header 'Accept: application/json' \
--header 'X-API-KEY: $API_KEY'
```

### Delete cache

Delete the entire cache, or use the optional `path` parameter to delete a specific subdirectory in the cache.

```
curl --location --request DELETE 'https://app.harness.io/gateway/ci/cache?accountIdentifier=$YOUR_HARNESS_ACCOUNT_ID&path=/path/to/deleted/directory' \
--header 'Accept: application/json' \
--header 'X-API-KEY: $API_KEY'
```
