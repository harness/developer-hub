---
title: Run health checks on background services
description: Use step groups to run health checks on separate background services.
sidebar_position: 40
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

In a CI pipeline, health checks confirm that services are running before the build runs other steps that need to interact with those services. This topic explains how to run a health check on services running in **Background** steps before running the rest of the steps in the stage. This example uses [step groups](../optimize-and-more/group-ci-steps-using-step-groups.md) to run health checks on multiple background services.

This example assumes you have a [CI pipeline](../prep-ci-pipeline-components.md) with a [Build stage](../set-up-build-infrastructure/ci-stage-settings.md) and at least one [Background step](./background-step-settings.md).

## Create step groups

Add one [step group](../optimize-and-more/group-ci-steps-using-step-groups.md) for each background service that you want to run a health check on. If you have multiple health check step groups, organize the step groups to run in parallel.

For example, if you want to run health checks on two services, create two step groups and run them in parallel, as shown in the following YAML example.

```yaml
 stages:
    - stage:
        identifier: build
        type: CI
        name: build
        spec:
          cloneCodebase: false
          execution:
            steps:
              - parallel: ## Parallel flag.
                  - stepGroup: ## First step group.
                      name: group 1
                      identifier: sg1
                      steps:
                        ...
                  - stepGroup: ## Second step group.
                      name: group 2
                      identifier: sg2
                      steps:
                        ...
```

## Add Background steps

Add a **Background** step to each step group. A **Background** step runs a service in the background. Required [Background step settings](./background-step-settings.md) depend on the service you're running and your build infrastructure. The following YAML examples use **Background** steps to [run multiple PostgreSQL instances](./multiple-postgres.md).

For a **Background** step to run a service, the build environment must have the necessary binaries. Depending on the stage's build infrastructure, **Background** steps can use binaries that exist in the build environment or pull an image, such as a public or private Docker image, that contains the required binaries. For more information about when and how to specify images, go to the [Background step Container Registry and Image settings](./background-step-settings.md#container-registry-and-image).

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

```yaml
    - stage:
        identifier: build
        type: CI
        name: build
        spec:
          cloneCodebase: false
          execution:
            steps:
              - parallel:
                  - stepGroup:
                      name: group 1
                      identifier: sg1
                      steps:
                        - step: ## This step is in the first step group.
                            identifier: Background_1
                            type: Background
                            name: background service 1
                            spec: ## Configure specs for the service you want to run.
                              shell: Sh
                              envVariables:
                                POSTGRES_USER: postgres
                                POSTGRES_DB: test1
                                POSTGRES_PASSWORD: password
                              entrypoint:
                                - docker-entrypoint.sh
                                - "-p 5433"
                  - stepGroup:
                      name: group 2
                      identifier: sg2
                      steps:
                        - step: ## This step is in the second step group.
                            identifier: Background_2
                            type: Background
                            name: Background service 2
                            spec: ## Configure specs for the service you want to run.
                              shell: Sh
                              envVariables:
                                POSTGRES_USER: postgres
                                POSTGRES_DB: test2
                                POSTGRES_PASSWORD: password
                              entrypoint:
                                - docker-entrypoint.sh
                                - "-p 5434"
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted Kubernetes cluster">
```

```yaml
    - stage:
        identifier: build
        type: CI
        name: build
        spec:
          cloneCodebase: false
          infrastructure:
            ...
          execution:
            steps:
              - parallel:
                  - stepGroup:
                      name: group 1
                      identifier: sg1
                      steps:
                        - step: ## This step is in the first step group.
                            identifier: Background_1
                            type: Background
                            name: background service 1
                            spec: ## Configure specs for the service you want to run.
                              connectorRef: account.harnessImage
                              image: postgres
                              shell: Sh
                              envVariables:
                                POSTGRES_USER: postgres
                                POSTGRES_DB: test1
                                POSTGRES_PASSWORD: password
                                PGDATA: /tmp/pgdata1
                              entrypoint:
                                - docker-entrypoint.sh
                                - "-p 5433"
                  - stepGroup:
                      name: group 2
                      identifier: sg2
                      steps:
                        - step: ## This step is in the second step group.
                            identifier: Background_2
                            type: Background
                            name: Background service 2
                            spec: ## Configure specs for the service you want to run.
                              connectorRef: account.harnessImage
                              image: postgres
                              shell: Sh
                              envVariables:
                                POSTGRES_USER: postgres
                                POSTGRES_DB: test2
                                POSTGRES_PASSWORD: password
                                PGDATA: /tmp/pgdata2
                              entrypoint:
                                - docker-entrypoint.sh
                                - "-p 5434"
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Add health checks

In each step group, after the **Background** step, add a [Run step](../run-ci-scripts/run-step-settings.md) that runs a health check on that service. The commands necessary for a health check depend on the service you're running. The following YAML examples use `psql` commands to run health checks on PostgreSQL services. For more information about this use case, go to [Run multiple PostgreSQL instances in Background steps](./multiple-postgres.md#test-the-services).

For the **Run** step to run the health check commands, the build environment must have the necessary binaries. Depending on the stage's build infrastructure, **Run** steps can use binaries that exist in the build environment or pull an image, such as a public or private Docker image, that contains the required binaries. For more information about when and how to specify images, go to the [Run step Container Registry and Image settings](../run-ci-scripts/run-step-settings.md#container-registry-and-image).


```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

```yaml
    - stage:
        identifier: build
        type: CI
        name: build
        spec:
          cloneCodebase: false
          execution:
            steps:
              - parallel:
                  - stepGroup: ## First step group.
                      name: group 1
                      identifier: sg1
                      steps:
                        - step: ## First background service.
                            identifier: Background_1
                            type: Background
                            name: background service 1
                            spec:
                              shell: Sh
                              envVariables:
                                POSTGRES_USER: postgres
                                POSTGRES_DB: test1
                                POSTGRES_PASSWORD: password
                              entrypoint:
                                - docker-entrypoint.sh
                                - "-p 5433"
                        - step: ## First health check.
                            identifier: Run_1
                            type: Run
                            name: health check 1
                            spec: ## Configure specs according to the service you're checking.
                              shell: Sh
                              command: |
                                sleep 15
                                psql -U postgres -d test1 -h Background_1 -p 5433
                  - stepGroup: ## Second step group.
                      name: group 2
                      identifier: sg2
                      steps:
                        - step: ## Second background service.
                            identifier: Background_2
                            type: Background
                            name: Background service 2
                            spec:
                              shell: Sh
                              envVariables:
                                POSTGRES_USER: postgres
                                POSTGRES_DB: test2
                                POSTGRES_PASSWORD: password
                              entrypoint:
                                - docker-entrypoint.sh
                                - "-p 5434"
                        - step: ## Second health check.
                            type: Run
                            name: health check 2
                            identifier: Run_2
                            spec: ## Configure specs according to the service you're checking.
                              shell: Sh
                              command: |-
                                sleep 15
                                psql -U postgres -d test2 -h Background_2 -p 5434
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted Kubernetes cluster">
```

```yaml
    - stage:
        identifier: build
        type: CI
        name: build
        spec:
          cloneCodebase: false
          infrastructure:
            ...
          execution:
            steps:
              - parallel:
                  - stepGroup: ## First step group.
                      name: group 1
                      identifier: sg1
                      steps:
                        - step: ## First background service.
                            identifier: Background_1
                            type: Background
                            name: background service 1
                            spec:
                              connectorRef: account.harnessImage
                              image: postgres
                              shell: Sh
                              envVariables:
                                POSTGRES_USER: postgres
                                POSTGRES_DB: test1
                                POSTGRES_PASSWORD: password
                                PGDATA: /tmp/pgdata1
                              entrypoint:
                                - docker-entrypoint.sh
                                - "-p 5433"
                        - step: ## First health check.
                            identifier: Run_1
                            type: Run
                            name: health check 1
                            spec: ## Configure specs according to the service you're checking.
                              connectorRef: account.harnessImage
                              image: postgres:9-alpine
                              shell: Sh
                              command: |
                                sleep 15
                                psql -U postgres -d test1 -h localhost -p 5433
                  - stepGroup: ## Second step group.
                      name: group 2
                      identifier: sg2
                      steps:
                        - step: ## Second background service.
                            identifier: Background_2
                            type: Background
                            name: Background service 2
                            spec:
                              connectorRef: account.harnessImage
                              image: postgres
                              shell: Sh
                              envVariables:
                                POSTGRES_USER: postgres
                                POSTGRES_DB: test2
                                POSTGRES_PASSWORD: password
                                PGDATA: /tmp/pgdata2
                              entrypoint:
                                - docker-entrypoint.sh
                                - "-p 5434"
                        - step: ## Second health check.
                            type: Run
                            name: health check 2
                            identifier: Run_2
                            spec: ## Configure specs according to the service you're checking.
                              connectorRef: account.harnessImage
                              image: postgres:9-alpine
                              shell: Sh
                              command: |-
                                sleep 15
                                psql -U postgres -d test2 -h localhost -p 5434
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Test and finalize the pipeline

Run your pipeline to test your background services and health checks. You can monitor and review build logs on the [Build details page](../viewing-builds.md).

Once you've confirmed that the background services and health checks are functioning as expected, configure any remaining steps in this stage, as necessary. Make sure these steps *are not* in your background service step groups or in parallel with the step groups.

:::info

**Background** steps don't persist across stages.

:::

## Pipeline YAML examples

These pipeline YAML examples use two step groups to run health checks on two PostgreSQL services.

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

```yaml
pipeline:
  name: default
  identifier: default
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        identifier: build
        type: CI
        name: build
        spec:
          cloneCodebase: false
          execution:
            steps:
              - parallel: ## This flag causes the two step groups to run in parallel. The steps within each group run sequentially, but the two groups start at the same time.
                  - stepGroup: ## First step group.
                      name: group 1
                      identifier: sg1
                      steps:
                        - step: ## This is the background service in the first group.
                            identifier: Background_1
                            type: Background
                            name: background service 1
                            spec: ## This example runs PostgreSQL. Configure your step's specs for the service you want to run.
                              shell: Sh
                              envVariables:
                                POSTGRES_USER: postgres
                                POSTGRES_DB: test1
                                POSTGRES_PASSWORD: password
                              entrypoint:
                                - docker-entrypoint.sh
                                - "-p 5433"
                        - step: ## This is the health check in the first group.
                            identifier: Run_1
                            type: Run
                            name: health check 1
                            spec: ## This example uses PostgreSQL. Configure your step's specs according to the service you're checking.
                              shell: Sh
                              command: |
                                sleep 15
                                psql -U postgres -d test1 -h Background_1 -p 5433
                  - stepGroup: ## Second step group.
                      name: group 2
                      identifier: sg2
                      steps:
                        - step: ## This is the background service in the second group.
                            identifier: Background_2
                            type: Background
                            name: Background service 2
                            spec: ## This example runs PostgreSQL. Configure your step's specs for the service you want to run.
                              shell: Sh
                              envVariables:
                                POSTGRES_USER: postgres
                                POSTGRES_DB: test2
                                POSTGRES_PASSWORD: password
                              entrypoint:
                                - docker-entrypoint.sh
                                - "-p 5434"
                        - step: ## This is the health check in the second group.
                            type: Run
                            name: health check 2
                            identifier: Run_2
                            spec: ## This example uses PostgreSQL. Configure your step's specs according to the service you're checking.
                              shell: Sh
                              command: |-
                                sleep 15
                                psql -U postgres -d test2 -h Background_2 -p 5434
              - step: ## Add other steps to your stage as needed. Make sure they are not in the step groups or under the step groups' parallel flag.
                  identifier: Run_3
                  type: Run
                  name: Run_3
                  spec:
                   ...
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted Kubernetes cluster">
```

```yaml
pipeline:
  name: default
  identifier: default
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        identifier: build
        type: CI
        name: build
        spec:
          cloneCodebase: false
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_KUBERNETES_NAMESPACE
              volumes: ## This example uses mounted volumes for PostgreSQL data.
                - mountPath: /tmp/pgdata1
                  type: EmptyDir
                  spec:
                    medium: ""
                - mountPath: /tmp/pgdata2
                  type: EmptyDir
                  spec:
                    medium: ""
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          execution:
            steps:
              - parallel: ## This flag causes the two step groups to run in parallel. The steps within each group run sequentially, but the two groups start at the same time.
                  - stepGroup: ## First step group.
                      name: group 1
                      identifier: sg1
                      steps:
                        - step: ## This is the background service in the first group.
                            identifier: Background_1
                            type: Background
                            name: background service 1
                            spec: ## This example runs PostgreSQL. Configure your step's specs for the service you want to run.
                              connectorRef: account.harnessImage
                              image: postgres
                              shell: Sh
                              envVariables:
                                POSTGRES_USER: postgres
                                POSTGRES_DB: test1
                                POSTGRES_PASSWORD: password
                                PGDATA: /tmp/pgdata1
                              entrypoint:
                                - docker-entrypoint.sh
                                - "-p 5433"
                        - step: ## This is the health check in the first group.
                            identifier: Run_1
                            type: Run
                            name: health check 1
                            spec: ## This example uses PostgreSQL. Configure your step's specs according to the service you're checking.
                              connectorRef: account.harnessImage
                              image: postgres:9-alpine
                              shell: Sh
                              command: |
                                sleep 15
                                psql -U postgres -d test1 -h localhost -p 5433
                  - stepGroup: ## Second step group.
                      name: group 2
                      identifier: sg2
                      steps:
                        - step: ## This is the background service in the second group.
                            identifier: Background_2
                            type: Background
                            name: Background service 2
                            spec: ## This example runs PostgreSQL. Configure your step's specs for the service you want to run.
                              connectorRef: account.harnessImage
                              image: postgres
                              shell: Sh
                              envVariables:
                                POSTGRES_USER: postgres
                                POSTGRES_DB: test2
                                POSTGRES_PASSWORD: password
                                PGDATA: /tmp/pgdata2
                              entrypoint:
                                - docker-entrypoint.sh
                                - "-p 5434"
                        - step: ## This is the health check in the second group.
                            type: Run
                            name: health check 2
                            identifier: Run_2
                            spec: ## This example uses PostgreSQL. Configure your step's specs according to the service you're checking.
                              connectorRef: account.harnessImage
                              image: postgres:9-alpine
                              shell: Sh
                              command: |-
                                sleep 15
                                psql -U postgres -d test2 -h localhost -p 5434
              - step: ## Add other steps to your stage as needed. Make sure they are not in the step groups or under the step groups' parallel flag.
                  identifier: Run_3
                  type: Run
                  name: Run_3
                  spec:
                   ...
```

```mdx-code-block
  </TabItem>
</Tabs>
```
