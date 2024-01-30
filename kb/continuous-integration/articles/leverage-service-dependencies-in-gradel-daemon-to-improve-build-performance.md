---
title: Use service dependencies to improve performance
description: You can use service dependencies in Gradle daemon to improve build performance.
---

# Use service dependencies in Gradle daemon to improve performance

A *Harness CI build* is a workflow that uses the Harness Continuous Integration (CI) module to automate building and testing of software applications. Harness integrates with version control systems like Git, and Harness can automatically trigger CI builds when you push new code changes to your repository. The build process compiles your code to create executable artifacts. Harness CI also supports running tests on your code and artifacts, such as unit tests, integration test, and user acceptance tests. To learn more about Harness CI features, go to the [Harness CI overview](https://developer.harness.io/docs/continuous-integration/get-started/overview).

## Manage dependencies to optimize performance

In Harness CI builds, each step runs in a separate container. If your pipeline has multiple steps that utilize Gradle through CLI, each step initiates a separate Gradle daemon (unless you explicitly set `--no-daemon`). To optimize the build process and improve performance, use a [Background step](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings) to create a single Gradle daemon that can be used by all subsequent steps in the stage. This reduces the overhead of daemon startup and enhances the efficiency of the entire pipeline.

```yaml
              - step:
                  type: Background
                  name: Gradle_Daemon
                  identifier: Gradle_Daemon
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    image: gradle
                    shell: Sh
                    entrypoint:
                      - gradle
                    envVariables:
                      GRADLE_USER_HOME: /harness/.gradle
                      GRADLE_OPTS: "-Dorg.gradle.jvmargs=\"-Xms1024m -Xmx2048m\""
                    resources:
                      limits:
                        memory: 1G
```

<!-- Service dependency option removed due to Service Dependency step deprecation. -->
