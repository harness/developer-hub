---
title: Migrate from GitLab CI to Harness CI
description: Learn how to migrate your existing GitLab workflows to Harness CI.
sidebar_position: 30
---

Harness CI and GitLab CI both allow you to create workflows that automatically build, test, publish, release, and deploy code.

This guide describes the important differences between Harness CI and GitLab CI so that you can migrate your existing GitLab CI workflows to Harness CI.

## What makes Harness CI unique?

Harness CI provides proprietary technologies, like Cache Intelligence and Test Intelligence, which make Harness CI [four times faster](https://harness.io/blog/fastest-ci-tool) than other leading CI tools.

* Harness [Test Intelligence (TI)](../use-ci/set-up-test-intelligence/set-up-test-intelligence.md) is a proprietary technology that accelerates test cycles by running only the tests necessary to confirm the quality of the code changes that triggered a build. Visualizations show which code changes caused which tests to be selected, and TI can help you identify gaps in your test plan. TI also detects negative trends and provides actionable insights to improve quality. With TI, it's possible to reduce build cycle times by up to 90% without compromising application quality.
* Harness [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence.md) is a proprietary technology that reduces pipeline execution time by automatically caching well-known directories for languages like Java and Node.js.

In addition, you can [use plugins](../use-ci/use-drone-plugins/explore-ci-plugins.md) to include GitHub Actions, Bitrise Integrations, Jira updates, and more in your Harness CI pipelines.

Harness CI is part of The [Harness Platform](/docs/getting-started/harness-platform-architecture), which is a self-service CI/CD platform that enables end-to-end software delivery. The Harness Platform includes features, functionality, and additional modules to help you build, test, deploy, and verify software. For example:

* [Secrets management](/docs/category/secrets-management) through the [Harness secrets manager](/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview) or an [external secrets manager](/docs/platform/Secrets/Secrets-Management/add-secrets-manager).
* Role-Based Access Control (RBAC) helps you control user and group access to Harness resources according to users' roles. Using RBAC increases security and improves efficiency.
* Harness Policy as Code is a centralized policy management and rules service that leverages the Open Policy Agent (OPA) to meet compliance requirements across software delivery and enforce governance policies.
* The Harness Enterprise Ready Self-Managed Edition is an end-to-end solution for continuous, self-managed delivery. You can install and update Harness Self-Managed Enterprise Edition using online or offline (air-gapped) methods.

## Comparison: Workflow architecture

Both Harness CI and GitLab CI use workflows to organize builds. In Harness CI, these workflows are called pipelines. In both products, workflows are made up of one or more stages, which represent major segments of the workflow. Each stage include one or more jobs or steps, which in turn contain individual commands.

The following truncated examples provide a simple comparison of stage and step structure in GitLab CI and Harness CI.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="gitlab" label="GitLab CI">
```

```yaml
step1:
  stage: stage1
    image: openjdk:17.0-jdk
  only:
  - /^dev-.*$/
  except:
  - branches
  script:
  - echo "this runs on openjdk"
```

```mdx-code-block
  </TabItem>
  <TabItem value="harness" label="Harness" default>
```

```yaml
    - stage:
        name: Stage1
        ...
            steps:
              - step:
                  type: Run
                  name: step1
                  identifier: step1
                  spec:
                    connectorRef: my-docker-hub-connector
                    image: openjdk:17.0-jdk
                    shell: Bash
                    command: echo "this runs on openjdk"
```

```mdx-code-block
  </TabItem>
</Tabs>
```

For more information about Harness terminology, features, and pipeline components, go to [CI pipeline basics](../ci-quickstarts/ci-pipeline-basics.md).

### Jobs and steps

Jobs in GitLab CI are similar to steps in Harness CI. In both products, jobs/steps contain commands. Some commands are declared explicitly, whereas others run inherently based on the step type or configuration. An important difference is that GitLab CI jobs run in parallel by default, whereas in Harness CI steps run sequentially. However, you can enable [parallelism and other looping strategies](#comparison-matrix-and-parallelism) in Harness CI.

### Scripts in workflows

Both Harness CI and GitLab CI support running scripts or a shell commands in jobs/steps. In GitLab CI, you use the `script` key to declare a script step.

In Harness CI scripts are supplied in the `command` key, and can be supplied for any step type that supports `command`.

### Writing workflows

Both Harness CI and GitLab CI workflows are written in YAML. Whereas GitLab workflow configurations are always stored in the `.gitlab-ci.yml` file in your code repo's root directory, Harness provides you a choice of inline pipeline storage or [importing pipelines from Git](/docs/platform/git-experience/import-a-pipeline/). Harness also provides both visual and code-based pipeline editors.

* The Harness YAML editor includes schema validation and auto-complete recommendations to simplify and expedite pipeline configuration.
* The Harness visual editor provides a guided experience that enables anyone to easily build, debug, and run pipelines.
* You can switch back and forth between editors.

<details>
<summary>Complete workflow comparison</summary>

Here are YAML examples of complete workflows in GitLab CI and Harness CI.

```mdx-code-block
<Tabs>
  <TabItem value="gitlab" label="GitLab CI">
```

```yaml
image: docker:latest
variables:
  pipelinevar1: someval
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: "$POSTGRES_PASS"
  POSTGRES_DB: postgres

services:
- docker:postgres:10.8

stages:
- stage1
- stage2
- matrixstage

before_script:
- docker login $REGISTRY  -u $REGISTRY_USER -p $REGISTRY_USER_PASSWORD

step1:
  stage: stage1
    image: openjdk:17.0-jdk
  only:
  - /^dev-.*$/
  except:
  - branches
  script:
  - echo "this runs on openjdk"

step1:
  stage: stage2
    image: node:13.0.0
  only:
  - /^prod-.*$/
  except:
  - branches
  script:
echo "project level var:" "$PROJ_VAR"
echo "pipeline var:" "$PIPELINE_VAR"
echo "secret example :" "$DB_PASSWORD"
 
 
step1:
  stage: matrixstage
  only:
  - /^prod-.*$/
  except:
  - branches
  script:
echo "Testing matrix"
  parallel:
    matrix:
      - PLATFORM: [windows, mac, linux]
```

```mdx-code-block
  </TabItem>
  <TabItem value="harness" label="Harness" default>
```

```yaml
pipeline:
  name: gitlab test
  identifier: gitlab_test
  projectIdentifier: gitlab_test
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Stage1
        identifier: stage1
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Background
                  name: Background_1
                  identifier: Background_1
                  spec:
                    connectorRef: account.harnessImage
                    image: postgres:10.8
                    envVariables:
                      POSTGRES_USER: postgres
                      POSTGRES_PASSWORD: <+secrets.getValue("DbPasswordSecret")>
                      POSTGRES_DB: postgres
              - step:
                  type: Run
                  name: step1
                  identifier: step1
                  spec:
                    connectorRef: myDockerHubConnector
                    image: openjdk:17.0-jdk
                    shell: Bash
                    command: echo "this runs on openjdk"
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
    - stage:
        name: Stage2
        identifier: Stage2
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: step1
                  identifier: step1
                  spec:
                    connectorRef: myDockerHubConnector
                    image: node:13.0.0
                    shell: Bash
                    command: |-
                      echo "pipeline var:" <+pipeline.variables.pipelinevar1>
                      echo "project level var:" <+variable.proj_var>
                      echo "secret example :" <+secrets.getValue("DbPasswordSecret")>
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
        variables: []
    - stage:
        name: matrix stage
        identifier: Stage4
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: step1
                  identifier: step1
                  spec:
                    shell: Bash
                    command: echo "Testing on  <+matrix.testparam>"
                  failureStrategies: []
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
        strategy:
          matrix:
            testparam:
              - node
              - python
              - ubuntu
          maxConcurrency: 3
  properties:
    ci:
      codebase:
        connectorRef: account.myscm
        repoName: test
        build: <+input>
  variables:
    - name: pipelinevar1
      type: String
      description: ""
      value: someval
```

```mdx-code-block
  </TabItem>
</Tabs>
```

</details>

## Comparison: Specify a Docker image

In GitLab CI, images are defined at the job level, and you can specify global images that are used by jobs that don't have an image specified, for example:

```yaml
step1:
  stage: stage1
    image: openjdk:17.0-jdk
```

In Harness CI, you specify *connectors* and images for each step, if necessary. Depending on the step type, the commands you are running, and your build infrastructure, you may not need to specify an image. For example, if a binary is already available on your build farm, you may not need to pull an image for that binary.

For example, the following step includes a `connectorRef` referencing a Docker connector. [Docker connectors](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) are platform-agnostic and can be used to connect to any Docker container registry.

```yaml
              - step:
                  type: Run
                  name: step1
                  identifier: step1
                  spec:
                    connectorRef: my-docker-hub-connector
                    image: openjdk:17.0-jdk
                    shell: Bash
                    command: echo "this runs on openjdk"
```

:::info What are connectors?

Harness integrates with many different types of repositories and providers. A connection from Harness to other platforms is called a [connector](/docs/category/connectors). Connectors can connect to source control providers, cloud providers, container registries, and more.

:::

## Comparison: Define a multi-stage pipeline

Both GitLab CI and Harness CI execute workflow stages in a specific order based on the YAML configuration.

```mdx-code-block
<Tabs>
  <TabItem value="gitlab" label="GitLab CI">
```

```
stages:
  - test
  - build
  - deploy
```

```mdx-code-block
  </TabItem>
  <TabItem value="harness" label="Harness" default>
```

```yaml
  stages:
    - stage:
        name: Test
        ...
    - stage:
        name: Build
        ...
    - stage:
        name: Upload
        ...
```

```mdx-code-block
  </TabItem>
</Tabs>
```

The following examples compare GitLab CI and Harness CI workflows with multiple stages.

<details>
<summary>YAML examples: Multi-stage pipelines</summary>

```mdx-code-block
<Tabs>
  <TabItem value="gitlab" label="GitLab CI">
```

```yaml
image: golang:latest

stages:
  - test
  - build

format:
  stage: test
  script:
    - go fmt $(go list ./... | grep -v /vendor/)
    - go vet $(go list ./... | grep -v /vendor/)
    - go test -race $(go list ./... | grep -v /vendor/)

compile:
  stage: build
  script:
    - mkdir -p mybinaries
    - go build -o mybinaries ./...
  artifacts:
    paths:
      - mybinaries

```
```mdx-code-block
  </TabItem>
  <TabItem value="harness" label="Harness" default>
```

```yaml
 stages:
   - stage:
       name: test
       identifier: test
       description: ""
       type: CI
       spec:
         cloneCodebase: true
         platform:
           os: Linux
           arch: Amd64
         runtime:
           type: Cloud
           spec: {}
         execution:
           steps:
             - step:
                 type: Run
                 name: test-step
                 identifier: teststep
                 spec:
                   shell: Sh
                   command: |
                     go fmt $(go list ./... | grep -v /vendor/)
                     go vet $(go list ./... | grep -v /vendor/)
                     go test -race $(go list ./... | grep -v /vendor/)
   - stage:
       name: build
       identifier: build
       type: CI
       spec:
         cloneCodebase: true
         platform:
           os: Linux
           arch: Amd64
         runtime:
           type: Cloud
           spec: {}
         execution:
           steps:
             - step:
                 type: Run
                 name: build-step
                 identifier: buildstep
                 spec:
                   shell: Sh
                   command: |
                     mkdir -p mybinaries
                     go build -o mybinaries ./...
         sharedPaths:
           - mybinaries
```

```mdx-code-block
  </TabItem>
</Tabs>
```

</details>

## Comparison: Environment variables

In GitLab CI, you can use environment variables to control the behavior of jobs and pipelines, store values you want to reuse, or avoid hard-coding values in your `.gitlab-ci.yml` file. You can use predefined environment variables, define custom variables in the `.gitlab-ci.yml` file, or define variables at the project, group, or instance levels.

This range of variable definition is also possible in Harness CI. In addition to built-in variables, you can define variables within individual pipelines, stages, and steps as well as at the project, organization, and account levels.

```mdx-code-block
<Tabs>
  <TabItem value="gitlab" label="GitLab CI">
```

This GitLab example demonstrates use of a pre-defined variable as well as a custom variable definition.

```yaml
test_variable:
  stage: test
  script:
    - echo "$CI_JOB_STAGE" #Uses pre-defined variable

# Custom variable definition in .gitlab-ci.yml file

variables:
  SA_PASSWORD: $SA_PASSWORD
```

```mdx-code-block
  </TabItem>
  <TabItem value="harness" label="Harness">
```

To reference project, organization, and account variables, you use variable expressions formatted as: `<+variable.[scope].[variable_id]>`. Here are the syntax formats for variables declared at different levels:

- Account-level variable reference: `<+variable.account.[var_id]>`
- Organization-level variable reference: `<+variable.org.[var_id]>`
- Project-level variable reference: `<+variable.[var_id]>`

In this example, a step references a project-level environment variable called `ENV_VAR`.

```yaml
              - step:
                  type: Run
                  name: test-variable
                  identifier: test_variable
                  spec:
                    command: echo "environment variable: " <+variable.env_var>
```

Within a single pipeline, you can define variables at the step, stage, and pipeline levels. For example, this step includes environment variable definitions.

```yaml
              - step:
                  type: Background
                  name: Background_1
                  identifier: Background_1
                  spec:
                    connectorRef: account.harnessImage
                    image: postgres:10.8
                    envVariables:
                      POSTGRES_USER: postgres
                      POSTGRES_PASSWORD: <+secrets.getValue("DbPasswordSecret")>
                      POSTGRES_DB: postgres
```

To learn more about defining and fetching variables go to:

* [Built-in and custom Harness variables reference](/docs/platform/variables-and-expressions/harness-variables/)
* [Add Account, Org, and Project-level variables](/docs/platform/variables-and-expressions/add-a-variable/)

```mdx-code-block
  </TabItem>
</Tabs>
```

## Comparison: Matrix and parallelism

GitLab CI jobs run in parallel by default, whereas in Harness CI steps and stages run sequentially unless you enable parallelism. For example, this Harness CI YAML example shows a pipeline with two stages that run in parallel, as indicated by `- parallel`, and two stages that run sequentially after the two parallel stages.

```yaml
  stages:
    - parallel:
        - stage:
            name: Stage1
            ...
        - stage:
            name: Stage2
            ...
    - stage:
        name: Stage3
        ...
    - stage:
        name: Stage4
        ...
```

In addition to parallelism, you can use Harness CI's [looping strategies](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism) to make your pipelines more dynamic and versatile. These strategies allow your pipelines to execute the same set of tasks multiple times for several different configurations without requiring you to intentionally create unique steps or stages for each iteration. This is achieved by mentioning user-defined tags and referencing them in the pipeline using the following expression syntax: `<+matrix.usertag>`

As in GitLab CI, you also can combine parallelism and matrix strategies in Harness CI, as shown in the following examples.

```mdx-code-block
<Tabs>
  <TabItem value="gitlab" label="GitLab CI">
```

```yaml
test:
  stage: test
  script: run-test $PLATFORM
  parallel:
    matrix:
      - PLATFORM: [windows, mac, linux]
```

```mdx-code-block
  </TabItem>
  <TabItem value="harness" label="Harness" default>
```

The following example describes a stage in a Harness CI pipeline that includes one step with matrix and parallelism strategies. The looping strategies are defined in `strategy` at the stage level. One matrix strategy, called `testparam`, is defined in `matrix` and parallelism is defined by `maxConcurrency: 3`. The script in the `Run` step calls the inputs from the matrix strategy by using the expression `+matrix.testparam>`.

```yaml
  stages:
    - stage:
        name: Stage1
        identifier: Stage1
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: step1
                  identifier: step1
                  spec:
                    connectorRef: dockerconectorref
                    image: dockerimage:tag
                    shell: Bash
                    command: echo "Testing on  <+matrix.testparam>"
        strategy:
          matrix:
            testparam:
              - node
              - python
              - ubuntu
          maxConcurrency: 3
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Comparison: Triggers

Webhooks are a convenient way to trigger CI builds on demand by sending an HTTP post request to specialized URLs. This is particularly useful for event-based triggering, in which a webhook can be called whenever a specified event occurs.

In GitLab CI, pipelines can be triggered only through API.

Harness CI supports webhook, artifact, manifest and schedule triggers. The two most commonly used triggers are webhook triggers based on Git events and scheduled triggers based on `cron` expressions. To learn more about creating a trigger, go to [Triggers](https://developer.harness.io/docs/category/triggers).

```mdx-code-block
<Tabs>
  <TabItem value="gitlab" label="GitLab CI">
```

```yaml
trigger_pipeline:
  stage: deploy
  script:
    - 'curl --fail --request POST --form token=$MY_TRIGGER_TOKEN --form ref=main "https://gitlab.example.com/api/v4/projects/123456/trigger/pipeline"'
  rules:
    - if: $CI_COMMIT_TAG
  environment: production
```

```mdx-code-block
  </TabItem>
  <TabItem value="harness" label="Harness" default>
```


```yaml
trigger:
  name: make build
  identifier: make_build
  enabled: true
  orgIdentifier: default
  projectIdentifier: DhrubaCI
  pipelineIdentifier: Demo3
  source:
    type: Scheduled
    spec:
      type: Cron
      spec:
        expression: 45 13 13 09 2
  inputYaml: |
    pipeline:
      identifier: Demo3
      properties:
        ci:
          codebase:
            build:
              type: branch
              spec:
                branch: main
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## See also

Review the following information before proceeding with migration:

* [Harness CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components.md)
* [Caching in Harness CI](/docs/category/share-and-cache-ci-data)
* [Speed up Harness CI pipelines using parallelism](/docs/platform/Pipelines/speed-up-ci-test-pipelines-using-parallelism)
* [Harness Platform documentation](/docs/platform)
