---
title: Cache Intelligence
description: Set up your pipeline to cache build dependencies automatically.
sidebar_position: 20
---

### Automatic caching

Caching dependencies is an effective way to speed up your build. 
Modern continuous integration systems execute pipelines inside ephemeral environments, such as a container or virtual machine, provisioned solely for pipeline execution, and not reused from a prior execution. As builds often require the the download and installation of a large number of dependencies such as libraries, and other software components, caching these dependencies can save a significant amount of time. 

While caching can already be configured in various ways (save/restore cache steps, mounting volumes, etc), the burden of confugring caching, as well as managing the cache itself, lies on the users. 

With Cache Intelligence, Harness will automatically cache and restore common dependencies , making it easy for anyone to use caching. The cache is stored in Harness Cloud, our hosted environment, so you don't need to worry about bringng your own storage. 


Note the following:  

* Cache Intelligence is currently avaiable only when using [Harness Cloud](/docs/continuous-integration/ci-quickstarts/hosted-builds-on-virtual-machines-quickstart), Harness hosted build environemnt
* Cache Intelligence currently supports Bazel, Maven, Gradle, Yarn, and Node build tools, assuming the dependencies are stored in the default location for the tool used.
* Harness Cloud can cache up to 2GB of data per account. All pipelines in the account use the same cache. 
* Cache retention window is 15 days, which resets whenever the cache gets updated.

* Cache Intelligence stores cache data in the `/harness` directory by default. 

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
curl --location --request DELETE 'https://app.harness.io/gateway/ci/cache/info?accountIdentifier=$HARNESS_ACCOUNT_ID&path=/path/to/deleted/directory' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer $AUTH_TOKEN'
```
