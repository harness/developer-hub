---
title: Build Intelligence Overview
description: Learn about the build cache feature in Harness CI.
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Build Intelligence, or Build Cache, is part of the suite of intelligent features in Harness CI designed to improve build times. It saves time by reusing outputs from previous builds. BI works by storing these outputs locally or remotely and retrieving them when inputs haven't changed. This process avoids the need to regenerate outputs, significantly speeding up the build process and enhancing efficiency.

Build Cache in Harness CI is currently available for **Gradle** and **Bazel** with **Maven** support coming soon.

## Build Cache Support for Gradle

[Gradle](https://gradle.org/) is the open source build system of choice for Java, Android, and Kotlin developers. Harness CI offers Build Cache support for Gradle to optimize build times by reusing outputs from previous builds.

### How it works?

1. **Plugin Integration**: The Build Cache plugin for Gradle is imported into your project. This plugin interacts with Gradle to handle cache pull and push operations.
2. **Cache Operations**: At the start of the build, the plugin registers with Gradle to check for cached build outputs. If available, it retrieves and provides them to Gradle, avoiding the need to regenerate them.

The above operation is transparent to you as a user and happens in the background. 

### Configuration for Gradle

1. Import the build cache plugin in `settings.gradle` file:

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

:::note

The above configuration is only required for local builds. For hosted CI builds, Harness automatically configures the build cache configuration.

Customers using **prod1** or **prod2** clusters don't need to configure the `endpoint` parameter in the above settings and it'll be populated by the plugin. The default value for this endpoint for **prod1** or **prod2** is `https://app.harness.io/gateway/cache-service`. 

For customers not using **prod1** or **prod2** clusters, they'll need to configure the `endpoint` parameter in the above settings. 
:::

2. Enable build cache in `gradle.properties` file:

```properties
org.gradle.caching = true
```

### Sample pipeline for build cache for Gradle

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
                    envVariables:
                      HARNESS_PAT: <+secrets.getValue("HARNESS_API_TOKEN")>
                      CI: "true"
                    intelligenceMode: true
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

## Build Cache Support for Bazel

[Bazel](bazel.build) is an open-source build and test tool designed for high performance, scalability, and handling large codebases across multiple languages and platforms. Harness CI offers Build Cache support for Bazel to optimize build times by reusing outputs from previous builds.

### How it works?

