---
title: Cache Intelligence
description: Set up your pipeline to cache build dependencies automatically.
sidebar_position: 20
---

### Automatic caching

You can set up your pipeline to cache build dependencies automatically. Note the following:  

* Cache Intelligence is currently supported for the following:
  - [Harness Cloud](/docs/continuous-integration/ci-quickstarts/hosted-builds-on-virtual-machines-quickstart) build infrastructure
  - Bazel, Maven, Gradle, Yarn, and Node build tools
  - The build tool must store cache data in the default location for that tool.  

* Harness Cloud can cache up to 2GB of data per account. All pipelines in the account use the same cache. 
* Cache Intelligence stores cache data in the `/harness` folder by default. 
* Cache retention window is 15 days, which resets whenever the cache gets updated.

To enable Cache Intelligence on a CI Build stage, add the following lines to the stage YAML definition: 

```yaml
    - stage:
        name: Build Jhttp
        identifier: Build_Jhttp
        description: ""
        type: CI
        spec:
          caching:            # --------------- ADD LINE
            enabled: true     # ----------------ADD LINE
          cloneCodebase: true
```
### Cache Intelligence API

Use the Cache Intelligence API to get information about the cache or delete the cache.

:::note

You must have an API Key with [core_account_edit](/docs/platform/Role-Based-Access-Control/ref-access-management/api-permissions-reference#harness-api-permissions) permissions to invoke these APIs.

For information about API keys, go to [Add and Manage API Keys](/docs/platform/role-based-access-control/add-and-manage-api-keys). 

:::

#### Get cache metadata

Get metadata about the cache, such as the size and path. 

```
curl --location --request GET 'https://app.harness.io/gateway/ci/cache/info?accountIdentifier=$HARNESS_ACCOUNT_ID' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer $AUTH_TOKEN'
```

#### Delete cache

Delete the cache. You can include an optional `path` parameter to delete a specific sub-directory in the cache.

```
curl --location --request DELETE 'https://app.harness.io/gateway/ci/cache/info?accountIdentifier=$HARNESS_ACCOUNT_ID&path=/path/to/deleted/folder' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer $AUTH_TOKEN'
```
