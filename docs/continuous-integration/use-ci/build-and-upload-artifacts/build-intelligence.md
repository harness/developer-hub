---
title: Build Intelligence Overview
description: Learn about the build intelligence feature in Harness CI.
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Build Intelligence is part of [Harness CI Intelligence](../../get-started/harness-ci-intelligence), a suite of features in Harness CI designed to improve build times. It saves time by reusing outputs from previous builds. BI works by storing these outputs locally or remotely and retrieving them when inputs haven't changed. This process avoids the need to regenerate outputs, significantly speeding up the build process and enhancing efficiency.

:::note
Build Intelligence is currently only offered to Harness Cloud, with support for self hosted coming soon. This feature is behind the feature flag `CI_CACHE_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

Build Intelligence in Harness CI is currently available for Gradle and Bazel with Maven support coming soon. Regardless of the programing language used in your projects, as long as you're building with a supported build tool, you can take advantage of Build Intelligence to optimize your builds.

## Build Intelligence Support for Gradle

[Gradle](https://gradle.org/) is the open source build system of choice for Java, Android, and Kotlin developers. Harness CI offers Build Intelligence support for Gradle to optimize build times by reusing outputs from previous builds.

### How it works?

1. **Plugin Integration**: The Build Intelligence plugin for Gradle is imported into your project. This plugin interacts with Gradle to handle cache pull and push operations.
2. **Cache Operations**: At the start of the build, the plugin registers with Gradle to check for cached build outputs. If available, it retrieves and provides them to Gradle, avoiding the need to regenerate them.

The above operation is transparent to you as a user and happens in the background. 

### Configuration for Gradle

1. Import the build cache plugin in `settings.gradle` file: Customers using **prod1** or **prod2** clusters don't need to configure the `endpoint` parameter in the settings below and it'll be populated by the plugin. The default value for this endpoint for **prod1** or **prod2** is `https://app.harness.io/gateway/cache-service`. For customers not using **prod1** or **prod2** clusters, they'll need to configure the `endpoint` parameter. 

```groovy
// import the plugin
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'io.harness:gradle-cache:0.0.2'
    }
}
...

// apply the plugin
apply plugin: 'io.harness.gradle-cache'

// build cache config

buildCache {
    local {
        // Local build cache is dangerous as it might produce inconsistent results
        // in case developer modifies files while the build is running
        enabled = false
    }
    remote(io.harness.Cache) {
        accountId = System.getenv('HARNESS_ACCOUNT_ID') 
        token = System.getenv('HARNESS_PAT') 
        push = "true"
        endpoint = System.getenv('HARNESS_CACHE_SERVICE_ENDPOINT') 
    }
}
```

For Build Intelligence, you'll need to turn on `CI_CACHE_ENABLED` FF.

<!--
:::note

The above configuration is only required for local builds. For hosted CI builds, Harness automatically configures the build cache configuration.

:::
-->

2. Enable build cache in `gradle.properties` file:

```properties
org.gradle.caching = true
```

### Sample pipeline for build intelligence for Gradle

```YAML
pipeline:
  projectIdentifier: SAMPLE_PROJECT
  orgIdentifier: SAMPLE_ORG
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: SAMPLE_CONNECTOR_ID
        build: <+input>
  stages:
    - stage:
        name: Build and Test
        identifier: Build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          caching:
            enabled: false
            paths: []
          execution:
            steps:
              - step:
                  identifier: SAMPLE_Test
                  type: Test
                  name: SAMPLE_Test
                  spec:
                    connectorRef: <+input>
                    image: <+input>
                    shell: Sh
                    command: gradle --build-cache unitTest -PmaxParallelForks=16 -PignoreFailures=true --profile
          platform:
            os: <+input>
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
  identifier: SAMPLE_REPO
  name: SAMPLE_REPO
  variables:
    - name: var1
      type: String
      description: ""
      required: false
      value: <+input>
```

## Build Intelligence Support for Bazel

[Bazel](https://bazel.build/) is an open-source build and test tool designed for high performance, scalability, and handling large codebases across multiple languages and platforms. Harness CI offers Build Intelligence support for Bazel to optimize build times by reusing outputs from previous builds.

### How it works?

1. Proxy binary: Download the proxy binary from `https://app.harness.io/storage/harness-download/harness-ti/cache-proxy/OS/ARCH/cache-proxy`. Replace **OS/ARCH** in the URL with one of the following options:

- linux/amd64
- linux/arm
- mac/amd64
- mac/arm
- windows/amd64

The cache proxy facilitates secure uploading and downloading of cache blobs by interacting with the cache service to obtain necessary access URLs.

2. Start the proxy server before the bazel command. You need to set the following environment variables:

```bash
HARNESS_CACHE_PROXY_ENABLED=true
HARNESS_CACHE_SERVER_URL=
HARNESS_CACHE_SERVER_API_TOKEN=
```

For `HARNESS_CACHE_SERVER_URL`, you can get the URL from FF or gateway endpoint if using prod1 or prod2 clusters.

For `HARNESS_CACHE_SERVER_API_TOKEN`, create a Harness [Personal Access Token or Service Account Token](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys) with `core_account_edit` permission.

Here is a sample script:

```bash
if [[ ! -z "${ENABLE_CI_CACHE// }" ]] && [[ "$ENABLE_CI_CACHE" == "true" ]]
then
    # Start the proxy server
    mkdir -p /tmp/cachebin
    curl -L -o /tmp/cachebin/harness-cache https://app.harness.io/storage/harness-download/harness-ti/cache-proxy/OS/ARCH/cache-proxy # Replace **OS/ARCH** in the URL
    chmod +x /tmp/cachebin/harness-cache
    echo "Starting cache proxy with account $HARNESS_ACCOUNT_ID"
    /tmp/cachebin/harness-cache server > /tmp/cachebin/server.log 2>&1 &
fi    
```

3. Add the build cache endpoint to the relevant `bazelrc` file: 

```bash
build --remote_cache=http://localhost:8082/cache/bazel 
```

You can also use a build command without rc files:

```bash
bazel build --remote_cache=http://localhost:8082/cache/bazel //...
```

