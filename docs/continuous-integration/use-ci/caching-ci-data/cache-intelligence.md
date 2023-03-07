---
title: Cache Intelligence
description: Set up your pipeline to cache build dependencies automatically.
sidebar_position: 20
---

Caching dependencies is an effective way to speed up your build.

Modern continuous integration systems execute pipelines inside ephemeral environments, such as a container or virtual machine, that is provisioned solely for pipeline execution and is not reused from a prior execution. As builds often require downloading and installing many dependencies, such as libraries and other software components, caching these dependencies can save a significant amount of time.

There are several ways to configure caching, such as save/restore cache steps and mounting volumes, which require users to enable caching and manage the cache itself.

With Cache Intelligence, Harness can automatically cache and restore common dependencies, making it easy to start using caching in your pipelines. You don't need to bring your own storage, because we store the cache in Harness Cloud, our hosted environment.

## Supported build infrastructures and tools

Currently, Cache Intelligence is available only when using [Harness Cloud](/docs/continuous-integration/ci-quickstarts/hosted-builds-on-virtual-machines-quickstart), the Harness-hosted build environment.

Currently, Cache Intelligence supports Bazel, Maven, Gradle, Yarn, and Node build tools, if the dependencies are stored in the default location for the tool used.

If you are using a different build tool or a non-default cache location, you can still leverage our cache storage by [specifying the location(s) to cache](#customize-cache-paths).

## Cache storage

Harness Cloud allows up to 2GB of cache storage per account. All pipelines in the account use the same cache storage, and each build tool has a unique cache key that is used to restore the appropriate cache data at runtime.

The cache retention window is 15 days, which resets whenever the cache is updated.

## Enable Cache Intelligence

To enable Cache Intelligence on a CI Build stage, add the following lines to the `stage: spec:` in your pipeline's YAML:

```yaml
caching:
  enabled: true
```

For example:

```yaml
    - stage:
        name: Build Jhttp
        identifier: Build_Jhttp
        type: CI
        spec:
          caching:
            enabled: true
          cloneCodebase: true
...
```

### Customize cache paths

Cache Intelligence stores the data to be cached in the `/harness` directory by default. You can use `paths` to specify a list of locations to be cached. This is useful if:

* Cache Intelligence is not supported for your build tool.
* You have customized cache locations, such as with `yarn config set cache-folder`.

Add the `paths` list to your pipeline's YAML, for example:

```yaml
    - stage:
        name: Build
        identifier: Build
        type: CI
        spec:
          caching:
            enabled: true
            paths:
              - /harness/node-modules
              - /my_cache_directory/module_cache1
          cloneCodebase: true
...
```

If a path you want to cache is outside the `/harness` directory, you must also specify this as a shared path. In the Visual editor, you can add **Shared Paths** in the stage's **Overview** settings. In the YAML editor, add a list of `sharedPaths` to the `stage: spec:`, for example:

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
          execution:
            steps:
...
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          sharedPaths:
            - /my_cache_directory/module_cache1
```

## Cache Intelligence API

Use the Cache Intelligence API to get information about the cache or delete the cache.

:::note

You must have an API Key with [core_account_edit](/docs/platform/Role-Based-Access-Control/ref-access-management/api-permissions-reference#harness-api-permissions) permissions to invoke these APIs.

For information about API keys, go to [Add and Manage API Keys](/docs/platform/role-based-access-control/add-and-manage-api-keys). 

:::

### Get cache metadata

Get metadata about the cache, such as the size and path. 

```
curl --location --request GET 'https://app.harness.io/gateway/ci/cache/info?accountIdentifier=$HARNESS_ACCOUNT_ID' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer $AUTH_TOKEN'
```

### Delete cache

Delete the cache. You can include an optional `path` parameter to delete a specific sub-directory in the cache.

```
curl --location --request DELETE 'https://app.harness.io/gateway/ci/cache/info?accountIdentifier=$HARNESS_ACCOUNT_ID&path=/path/to/deleted/directory' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer $AUTH_TOKEN'
```
