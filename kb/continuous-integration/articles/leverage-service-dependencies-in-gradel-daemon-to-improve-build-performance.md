---
description: KB - How can you leverage service dependencies in Gradle daemon to improve build performance? 
---
# How can you leverage service dependencies in Gradle daemon to improve build performance?

## Introduction

"Harness CI build" refers to the process of leveraging a continuous integration (CI) system provided by the Harness platform to automate the build and testing of software applications. 

Version Control Integration: Harness integrates with version control systems like Git, automatically triggering CI builds when new code changes are pushed to the repository.

Build Automation: The CI system in Harness automatically initiates the build process, where the source code is compiled and built into executable artifacts.

Testing Automation: After the build is complete, the CI system can run various automated tests, such as unit tests, integration tests, and even user acceptance tests, to ensure the quality and functionality of the application.

By automating the build and testing process through Harness CI, teams can achieve faster and more reliable software delivery, reducing the manual overhead and risk of human errors.

More information on this is here: https://developer.harness.io/docs/continuous-integration

## Problem statement

In the Harness build pipeline each step runs in different containers. When multiple steps utilize Gradle via CLI run, each step initiates a separate Gradle daemon (unless explicitly set with --no-daemon).

If you are interested in optimizing the build process to improve its overall speed. What is the possibility of using a service dependency or any alternative method to create the Gradle daemon only once and then reuse it across all subsequent Gradle steps? 

By doing so, you can reduce the overhead of daemon startup and enhance the efficiency of the entire build pipeline.

## Steps to achieve this usecase :
Below is an example of a running Gradle daemon in a Service Dependency. In the Gradle check and the Gradle build step, it does not start the daemon again.

```
pipeline:
  name: GradleCacheExample
  identifier: GradleCacheExample
  allowStageExecutions: false
  projectIdentifier: xxxxxxxxxx
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: account.General_Github
        repoName: xxxxxxxxxxxx
        build: <+input>
  stages:
    - stage:
        name: Build Gradle
        identifier: Build_Micro_Integrator
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: xxxxxxxxxx
              namespace: harness-delegate-ng-immutable-75326
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
                    connectorRef: DockerHubfjunior87
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
                    connectorRef: GCR
                    bucket: mybucket
                    key: gradle-v2
                    archiveFormat: Tar
              - step:
                  type: Run
                  name: Build Car File
                  identifier: Build_Docker_Image
                  spec:
                    connectorRef: DockerHubfjunior87
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
                    connectorRef: GCR
                    bucket: mybucket
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
                connectorRef: DockerHubfjunior87
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

This is how you can use leverage service dependencies in Gradle daemon to improve build performance.
 