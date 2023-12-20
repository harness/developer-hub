---
title: Leverage service dependencies in Gradle daemon to improve performance
description: You can leverage service dependencies in Gradle daemon to improve build performance.
---

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

<details>
<summary>Deprecated: Run Grade daemon as a service dependency</summary>

The following YAML example shows a pipeline that runs a Gradle demon as a **Service Dependency**. This is now deprecated in favor of the [Background step](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings).

When this pipeline runs, the two **Run** steps that run `gradle check` and `gradle build` don't start additional daemon processes.

```yaml
pipeline:
  name: Gradle Example
  identifier: Gradle_Example
  allowStageExecutions: false
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_CODE_REPO_NAME
        build: <+input>
  stages:
    - stage:
        name: Build Gradle
        identifier: Build_Gradle
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_K8S_CLUSTER_CONNECTOR_ID
              namespace: YOUR_K8S_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          execution:
            steps:
              - step:
                  type: Run
                  name: Check Gradle
                  identifier: Check_Gradle
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    image: gradle
                    shell: Sh
                    command: |-
                      sleep 2
                      gradle --status
                      until (gradle --status | grep -q IDLE); do echo "Waiting for Gradle daemon..."; done
                  when:
                    stageStatus: Success
                  failureStrategies: []
              - step:
                  type: RestoreCacheGCS
                  name: Get Maven Deps from GCS
                  identifier: Get_Maven_Deps_from_GCS
                  spec:
                    connectorRef: YOUR_GCR_CONNECTOR_ID
                    bucket: YOUR_GCS_BUCKET_NAME
                    key: gradle-v2
                    archiveFormat: Tar
              - step:
                  type: Run
                  name: Build Car File
                  identifier: Build_Docker_Image
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    image: gradle
                    shell: Sh
                    command: |-
                      cd complete
                      gradle build --info --stacktrace
                      ls -ltra ~/.gradle/
                    privileged: false
                    imagePullPolicy: IfNotPresent
                    runAsUser: "0"
                    resources:
                      limits:
                        memory: 1Gi
                  failureStrategies: []
              - step:
                  type: SaveCacheGCS
                  name: Save Maven Dependencies
                  identifier: Save_Maven_Dependencies
                  spec:
                    connectorRef: YOUR_GCR_CONNECTOR_ID
                    bucket: YOUR_GCS_BUCKET_NAME
                    key: gradle-v2
                    sourcePaths:
                      - /harness/.gradle
                    archiveFormat: Tar
          sharedPaths:
            - /var/run
            - /root/.gradle
          serviceDependencies:
            - identifier: Gradle_Daemon
              name: Gradle Daemon
              type: Service
              spec:
                connectorRef: YOUR_DOCKER_CONNECTOR_ID
                image: gradle
                envVariables:
                  GRADLE_USER_HOME: /harness/.gradle
                  GRADLE_OPTS: "-Dorg.gradle.jvmargs=\"-Xms1024m -Xmx2048m\""
                entrypoint:
                  - gradle
                resources:
                  limits:
                    memory: 1G
        variables:
          - name: GRADLE_USER_HOME
            type: String
            description: ""
            value: /harness/.gradle
          - name: GRADLE_OPTS
            type: String
            description: ""
            value: "-Dorg.gradle.jvmargs=\"-Xms1024m -Xmx2048m\""
  notificationRules: []
  variables: []
```

</details>
