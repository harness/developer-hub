---
title: Build Intelligence Overview
description: Learn about the build intelligence feature in Harness CI.
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Build Intelligence is part of [Harness CI Intelligence](/docs/continuous-integration/get-started/harness-ci-intelligence), a suite of features in Harness CI designed to improve build times. It saves time by reusing outputs from previous builds. BI works by storing these outputs locally or remotely and retrieving them when inputs haven't changed. This process avoids the need to regenerate outputs, significantly speeding up the build process and enhancing efficiency.

:::note
* Build Intelligence is currently only offered to Harness Cloud, self hosted Kubernetes Infra with support for other self hosted Infras coming soon. This feature is behind the feature flag `CI_CACHE_ENABLED` when the infrastructure is Harness Cloud. 
* 'Build intelligence' CI stage property, which enables automatic setup of Build Intelligence on Harness Cloud when using supported build tools in Run and Test steps is behind the feature flag `CI_ENABLE_BUILD_CACHE_HOSTED_VM`.

Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::


Build Intelligence in Harness CI is currently available for Gradle and Bazel with Maven support coming soon. Regardless of the programming language used in your projects, as long as you're building with a supported build tool, you can take advantage of Build Intelligence to optimize your builds.


## Auto-setup of Build Intelligence

The Build Intelligence stage property simplifies the setup of Build Intelligence in Harness Cloud. When enabled, it automatically configures Build Intelligence for supported build tools (currently Gradle and Bazel) in Run and Test steps without requiring any additional configuration. This automation is particularly beneficial in CI pipelines, as it eliminates the need for developers to modify project settings in their git repository (such as Gradle’s settings.gradle) to configure the cache.

Build Intelligence setup is fully automated when the `CI_ENABLE_BUILD_CACHE_HOSTED_VM` (for harness cloud) and `CI_ENABLE_BUILD_CACHE_K8` (for self-hosted Kubernetes Infrastructure) feature flags are enabled. However, for local development (e.g., on a developer's laptop), manual configuration is necessary to take advantage of caching.

### Enabling Auto-setup 
* Via Visual editor: To enable Build Intelligence, go to the CI Stage Overview tab and toggle Build Intelligence to true.
* In yaml, set build intelligence with `buildIntelligence` property, as you can see below

```YAML
    - stage:
        identifier: build
        name: build
        type: CI
        spec:
          cloneCodebase: true
          buildIntelligence: 
            enabled: true # Build intelligence enabled
          execution:
            steps:
              - step:
                  type: Action
                  name: Set up Gradle
                  identifier: Set_up_Gradle
                  spec:
                    uses: gradle/gradle-build-action@v2
                    with:
                      gradle-version: "8.5"
              - step:
                  type: Run
                  name: build
                  identifier: build
                  spec:
                    shell: Sh
                    command: ./gradlew build 
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}

```

## Build Intelligence configuration

For local development (e.g., running build commands on a developer's laptop), manual configuration is necessary to take advantage of the remote cache. 
Manual configuration may also be needed in case you run your build in Harness CI but would not like to use auto-setup.  

Please follow the instructions below, for either Bazel or Gradle, in case manual configuration is needed.


### Build Intelligence Support for Gradle

[Gradle](https://gradle.org/) is the open source build system of choice for Java, Android, and Kotlin developers. Harness CI offers Build Intelligence support for Gradle to optimize build times by reusing outputs from previous builds.

#### How it works?

1. **Plugin Integration**: The Build Intelligence plugin for Gradle is imported into your project. This plugin interacts with Gradle to handle cache pull and push operations.
2. **Cache Operations**: At the start of the build, the plugin registers with Gradle to check for cached build outputs. If available, it retrieves and provides them to Gradle, avoiding the need to regenerate them.

The above operation is transparent to you as a user and happens in the background. 
**Harness Cloud**:
When you enable Build Intelligence in the UI, it automatically injects a background step responsible for bringing up the proxy server, autodetecting the build tool, and injecting the configuration. If the Run or Tests steps are executed in a container, we will also automatically re-inject the configuration there.

**Kubernetes**:
When you enable Build Intelligence in the UI, it automatically injects a background step responsible for bringing up the proxy server. For every Run or Test step, we will autodetect the build tool and auto-inject the appropriate configuration based on it.

Currently the proxy server is running on port: `8082`

#### Configuration for Gradle

1. Import the build cache plugin in the `settings.gradle` file. Alternatively, if you enable Build Intelligence in the UI, the configuration below is automatically injected into the following directories:

- $GRADLE_HOME/init.d/init.gradle
- $GRADLE_USER_HOME/init.d/init.gradle
- $HOME/.gradle/init.d/init.gradle (if `GRADLE_HOME` and `GRADLE_USER_HOME` are set in your environment variables).
2. If you want to use a custom Maven repository, you should set `MAVEN_URL` as a stage variable. Otherwise, it will pull from mavenCentral(), where the HarnessGradlePlugin is hosted. (For reference: https://central.sonatype.com/artifact/io.harness/gradle-cache/overview).
3. To use your own Maven repository, download the latest version of the plugin dependencies from Maven Central. (As of now, the latest version is 0.0.4).
4. The variables `HARNESS_ACCOUNT_ID` and `HARNESS_CACHE_SERVICE_ENDPOINT` will be automatically set when you enable Build Intelligence.

```groovy
// import the plugin
buildscript {
    repositories {
		if (System.getenv('MAVEN_URL')) {
            maven {
                url System.getenv('MAVEN_URL')
            }
        } else {
			mavenCentral()
		}       
    }
    dependencies {
        classpath 'io.harness:gradle-cache:0.0.4'
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
        push = "true"
        endpoint = System.getenv('HARNESS_CACHE_SERVICE_ENDPOINT') 
    }
}
```


<!--
:::note

The above configuration is only required for local builds. For hosted CI builds, Harness automatically configures the build cache configuration.

:::
-->

2. Enable build cache in `gradle.properties` file:

```properties
org.gradle.caching = true
```

#### Sample pipeline for build intelligence for Gradle

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
                    command: gradle build unitTest -PmaxParallelForks=16 -PignoreFailures=true --profile
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

### Build Intelligence Support for Bazel

[Bazel](https://bazel.build/) is an open-source build and test tool designed for high performance, scalability, and handling large codebases across multiple languages and platforms. Harness CI offers Build Intelligence support for Bazel to optimize build times by reusing outputs from previous builds.


#### How it works?
If you enable BuildInteligence on UI, the below configuration automatically injects in the `~/.bazelrc` directory.
```bash
fmt.Sprintf(`build --remote_cache=%s/cache/bazel`, cacheProxyEndpoint)
```
cacheProxyEndpoint for steps running in a container: http://harnesscache:8082
cacheProxyEndpoint for steps running on the host: http://localhost:8082

