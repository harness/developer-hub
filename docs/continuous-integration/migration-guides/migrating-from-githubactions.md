---
title: Migrate from GitHub Actions to Harness CI
description: Learn how to migrate your existing GitHub Actions workflows to Harness CI.
sidebar_position: 20
---

Harness CI and GitHub Actions both allow you to create workflows that automatically build, test, publish, release, and deploy code.

Harness does not require scripting, and configurations are passed to pipelines securely and pragmatically. In contrast, GitHub Actions provides third-party actions that you use with semi-plug-and-play functionality.

## What makes Harness CI unique?

Harness CI provides proprietary technologies, like Cache Intelligence and Test Intelligence, that make Harness CI [four times faster](https://harness.io/blog/fastest-ci-tool) than other leading CI tools.

* Harness [Test Intelligence (TI)](../use-ci/set-up-test-intelligence/set-up-test-intelligence.md) is a proprietary technology that accelerates test cycles by running only the tests necessary to confirm the quality of the code changes that triggered a build. Visualizations show which code changes caused which tests to be selected, and TI can help you identify gaps in your test plan. TI also detects negative trends and provides actionable insights to improve quality. With TI, it's possible to reduce build cycle times by up to 90% without compromising application quality.
* Harness [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence.md) is a proprietary technology that reduces pipeline execution time by automatically caching well-known directories for languages like Java and Node.js.

Harness CI is part of The [Harness Platform](/docs/getting-started/harness-platform-architecture), which is a self-service CI/CD platform that enables end-to-end software delivery. The Harness Platform includes features, functionality, and additional modules to help you build, test, deploy, and verify software. For example:

* Role-Based Access Control (RBAC) helps you control user and group access to Harness resources according to users' roles. Using RBAC increases security and improves efficiency.
* Harness Policy as Code is a centralized policy management and rules service that leverages the Open Policy Agent (OPA) to meet compliance requirements across software delivery and enforce governance policies.
* The Harness Enterprise Ready Self-Managed Edition is an end-to-end solution for continuous, self-managed delivery. You can install and update Harness Self-Managed Enterprise Edition using online or offline (air-gapped) methods.

### GitHub Actions plugins

Harness CI offers built-in support for GitHub Actions. You can use the [GitHub Action plugin step](../use-ci/use-drone-plugins/ci-github-action-step.md) in pipelines that use [Harness Cloud build infrastructure](../use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md). For other build infrastructures, you can use the [GitHub Actions Drone plugin in a Plugin step](../use-ci/use-drone-plugins/run-a-git-hub-action-in-cie.md).

### Other advantages

Harness CI offers the following additional advantages over GitHub Actions:

* Harness offers a variety of [build infrastructure options](../use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md), including Apple silicon and Linux arm64 options.
* Harness supports both [Terraform](/docs/platform/resource-development/terraform/harness-terraform-provider-overview/) and [CloudFormation](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/cloud-formation-provisioning-with-harness/) infrastructure provisioning with simpler structures and configurations than their corresponding GitHub Actions.
* GitHub Actions does not provide a native Accelerate metrics dashboard, whereas Harness offers both a dedicated dashboard and the ability to configure alerts.

## Comparison: Workflow architecture

Both Harness CI and GitHub Actions use workflows to organize builds. In Harness CI, these workflows are called pipelines. In both products, workflows are divided into major segments, which are called *stages* in Harness CI and *jobs* in GitHub Actions. Each stage or job includes one or more steps or individual commands.

In GitHub Actions, if a job has a lot of steps, those steps might be organized into groups, which are called *stages*. Similarly, in Harness CI, you can use [step groups](../use-ci/optimize-and-more/group-ci-steps-using-step-groups.md) to group steps within a stage.

The following truncated examples provide a simple comparison of stage and step structure in GitLab CI and Harness CI.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="github" label="GitHub Actions">
```

```yaml
jobs:
  job_1:
   name: job_1
   runs-on: ubuntu-latest
   steps:
      -  name: compile code
         container:
               image: python:3.10.6-alpine
         run: |
           python -m compileall ./
```

```mdx-code-block
  </TabItem>
  <TabItem value="harness" label="Harness" default>
```

```yaml
  stages:
    - stage:
        name: stage1
        ...
        spec:
          ...
          platform:
            os: Linux
            arch: Amd64
          ...
          execution:
            steps:
              - step:
                  type: Run
                  name: compile code
                  identifier: compile_code
                  spec:
                    connectorRef: myDockerHubConnector
                    image: python:3.10.6-alpine
                    shell: Sh
                    command: python -m compileall ./
```

```mdx-code-block
  </TabItem>
</Tabs>
```

For more information about Harness terminology, features, and pipeline components, go to [CI pipeline basics](../ci-quickstarts/ci-pipeline-basics.md).

Both Harness CI and GitHub Actions workflows are written in YAML. Whereas GitHub Actions workflow configurations are always stored in the `.github/workflows` directory in your code repo, Harness provides you a choice of inline pipeline storage or [importing pipelines from Git](/docs/platform/git-experience/import-a-pipeline/). Harness also provides both visual and code-based pipeline editors.

* The Harness YAML editor includes schema validation and auto-complete recommendations to simplify and expedite pipeline configuration.
* The Harness visual editor provides a guided experience that enables anyone to easily build, debug, and run pipelines.
* You can switch back and forth between editors.

<details>
<summary>Complete workflow comparison</summary>

Here are YAML examples of complete workflows in GitHub Actions and Harness CI.

```mdx-code-block
<Tabs>
  <TabItem value="gha" label="GitHub Actions">
```

```yaml
name: Github_actions
on:
  pull_request:
    branches:
      - main
jobs:
  job_1:
   name: job_1
   runs-on: ubuntu-latest
   steps:
      - name: Checkout code
        uses: actions/checkout@v2
        
      - name: login to docker hub
        uses: docker/login-action@v2
        with: 
          username: {{secrets.DOCKERHUB_USERNAME}}
          password: {{secrets.DOCKERHUB_TOKEN}}
          
      -  name: step_1 
         container:
               image: openjdk:17.0-jdk
         run: |
           echo "this runs on openjdk"
         services:
          postgres:
            image: postgres:10.8
            env:
              POSTGRES_USER: postgres
              POSTGRES_DB: postgres
              POSTGRES_PASSWORD: ""
  job_2:
     name: job_2
     runs-on: ubuntu-latest
     steps:
      - name: step_2 
        container:
              image: node:13.0.0
        run: |
            echo "pipeline var:" $pipeline_var
            echo "project level var:" $project_var
            echo "secret example :" ${{ secrets.Db_Password)}}
  job_3:
     name: job_3
     runs-on: ubuntu-latest
     strategy:
        matrix:
           version: ["node","python","ubuntu"]
     steps:
      - name: matrix
        run: |
           echo "Testing on ${{ matrix.version }}
```

```mdx-code-block
  </TabItem>
  <TabItem value="harness" label="Harness" default>
```

```yaml
pipeline:
  name: gha-test
  identifier: ghatest
  projectIdentifier: gha_test
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: account.myscm
        repoName: test
        build: <+input>
  stages:
    - stage:
        name: stage1
        identifier: stage1
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
                  type: Background
                  name: postgres-dependency
                  identifier: postgresdependency
                  spec:
                    connectorRef: myDockerHubConnector
                    image: postgres:10.8
                    shell: Sh
                    envVariables:
                      POSTGRES_USER: postgres
                      POSTGRES_PASSWORD: <+secrets.getValue("DbPasswordSecret")>
                      POSTGRES_DB: postgres
              - step:
                  type: Run
                  name: Run_1
                  identifier: Run_1
                  spec:
                    connectorRef: myDockerHubConnector
                    image: openjdk:17.0-jdk
                    shell: Bash
                    command: echo "this runs on openjdk"
    - stage:
        name: stage2
        identifier: stage2
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: Run_2
                  identifier: Run_2
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
    - stage:
        name: matrix stage
        identifier: matrix_stage
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
                  name: Run_3
                  identifier: Run_3
                  spec:
                    shell: Bash
                    command: echo "Testing on  <+matrix.testparam>"
        strategy:
          matrix:
            testparam:
              - node
              - python
              - ubuntu
          maxConcurrency: 3
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

## Comparison: Clone a codebase

```mdx-code-block
<Tabs>
  <TabItem value="gha" label="GitHub Actions" default>
```

Github Actions workflows are inherently associated with a code repo because the workflow YAML exists in the `.github/workflows` directory in the target code repo. The workflow can use [actions/checkout](https://github.com/actions/checkout) in a step to clone the associated codebase into the workflow workspace.

```yaml
name: Github_actions
on:
  pull_request:
    branches:
      - main
jobs:
  job_1:
   name: job_1
   ...
   steps:
      - name: Checkout code
        uses: actions/checkout@v2
```

```mdx-code-block
  </TabItem>
  <TabItem value="harness" label="Harness">
```

In Harness CI, each pipeline has a codebase specification that identifies the code repo (input) that the pipeline uses to build an artifact (output). [Codebase configuration](../use-ci/codebase-configuration/create-and-configure-a-codebase.md) has two components:

* The codebase _connector_, such as a [GitHub connector](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference), that specifies the codebase URL and required credentials to access your code repos.
* A series of settings describing how you want the pipeline to clone and build the repo.

When you create a Harness CI pipeline, you specify a default codebase to use for all stages in the pipeline. By default, each stage automatically clones the designated code repo from your Git provider into the stage's build infrastructure when the pipeline runs.

```yaml
pipeline:
  ...
      codebase:
        connectorRef: account.myscm ## Codebase connector ID.
        repoName: test ## A repo name. If set to <+input>, you can specify a repo when the pipeline runs.
        build: <+input> ## This value means you'll specify the branch to pull when the pipeline runs.
  stages:
    - stage:
        name: stage1
        ...
        spec:
          cloneCodebase: true ## Indicates that this stage will clone the pipeline's default codebase. If set to false, the stage won't clone the codebase.
```

:::info What are connectors?

Harness integrates with many different types of repositories and providers. A connection from Harness to other platforms is called a [connector](/docs/category/connectors). Connectors can connect to source control providers, cloud providers, container registries, and more.

In addition to codebase configuration, you can also use connectors in individual steps to specify Docker images or even [clone additional codebases](../use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline.md) in the same pipeline.

For example, in the following YAML example, the `connectorRef` references a Docker connector. [Docker connectors](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) are platform-agnostic and can be used to connect to any Docker container registry.

```yaml
              - step:
                  type: Run
                  name: step1
                  identifier: step1
                  spec:
                    connectorRef: my-dockerhub-connector
                    image: openjdk:17.0-jdk
                    shell: Bash
                    command: echo "this runs on openjdk"
```

:::

```mdx-code-block
  </TabItem>
</Tabs>
```

## Comparison: Access Docker

```mdx-code-block
<Tabs>
  <TabItem value="gha" label="GitHub Actions" default>
```

To log in to Docker Hub in a GitHub Actions workflow, you use `docker/login-action` in a step. You then use other `docker` actions in other steps to pull images, push images, and so on.

```yaml
  name: login to docker hub
    uses: docker/login-action@v2
    with:
      username: {{ secrets.DOCKERHUB_USERNAME }}
      password: {{ secrets.DOCKERHUB_TOKEN }}

  name: build and push docker image
    uses: docker/build-push-action@v3
    with:
      context:
        file: ./pythondockerfile
        push: true
        tags: user/pythonsample:latest
```

```mdx-code-block
  </TabItem>
  <TabItem value="harness" label="Harness">
```

To interact with Docker registries in Harness, you use a [Docker connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference). In the following YAML example, the `connectorRef` references a Docker connector and the `image` indicates the image to pull. You do not need an extra step to connect to Docker - Harness handles the login/connection through the connector configuration.

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

In the previous example, a Docker connector was used to pull an image for a script. You can also use Docker connectors to do other Docker-related actions, such as [building and pushing images to Docker registries](../use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings.md).

```yaml
     - step:
          type: BuildAndPushDockerRegistry
          name: build and push to the docker registry
          identifier: build_and_push_to_the_docker_registry
          spec:
            connectorRef: myDockerConnector
            repo: myrepo/pythonsample
             tags:
                - latest
             dockerfile: pythondockerfile
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Comparison: Environment variables

In GitHub Actions, you can use predefined environment variables, define custom variables within a single workflow, or define custom variables at the organization, account, and environment levels. You can use predefined environment variables or define custom variables.

This range of variable definition is also possible in Harness CI. In addition to built-in variables, you can define variables within individual pipelines, stages, and steps as well as at the project, organization, and account levels.

```mdx-code-block
<Tabs>
  <TabItem value="gha" label="GitHub Actions">
```

This GitHub Actions example defines environment variables at the workflow and job levels.

```yaml
env:
  ENV_VAR: value1

jobs:
  job_1:
    runs-on: ubuntu-latest
    env:
      JOB_VAR: value2
    steps:
      - name: simple script
        run: echo "$JOB_VAR $ENV_VAR"
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

## Comparison: Matrix jobs

In both Harness CI and GitHub Actions, you can define matrix strategies for your jobs to iterate over a series of inputs. In both products, you define a matrix strategy and then call the strategy by it's tag or other identifier when you want to use it in a command or step.

In Harness, matrix looping strategies are one of several looping execution strategies. To learn about the looping strategies available in Harness, go to [Looping Strategies Overview](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism)

```mdx-code-block
<Tabs>
  <TabItem value="gha" label="GitHub Actions">
```

```yaml
jobs:
  example_matrix:
    strategy:
      matrix:
        testparam: [node, python, ubuntu]
    steps:
      - name: simple script
        run: echo "Testing on ${{ matrix.testparam }}"
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
        ...
            steps:
              - step:
                  type: Run
                  name: step1
                  identifier: step1
                  spec:
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

In GitHub Actions, triggers are defined in the workflow based on Git events against specified branches or conditions.

Harness CI supports webhook, artifact, manifest and schedule triggers. The two most commonly used triggers are webhook triggers based on Git events and scheduled triggers based on `cron` expressions. To learn more about creating triggers, go to:

* [Trigger Pipelines using Git Event Payload Conditions](/docs/platform/triggers/triggering-pipelines/)
* [Triggers](https://developer.harness.io/docs/category/triggers)
* [Built-in CI codebase variables reference](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference)

```mdx-code-block
<Tabs>
  <TabItem value="gha" label="GitHub Actions" default>
```

This GitHub Actions trigger listens for specific words in the name of pull requests against the `main` branch.

```yaml
on:
  pull_request:
    branches:
      - main
jobs:
  gobuild:
    if: contains(github.event.pull_request.labels.*.name, 'go') || contains(github.event.pull_request.labels.*.name, 'gojava')
```

```mdx-code-block
  </TabItem>
  <TabItem value="harness" label="Harness">
```

This Harness CI example shows a `cron` trigger on the `main` branch.

```yaml
trigger:
  name: trigger
  identifier: trigger
  enabled: true
  orgIdentifier: default
  projectIdentifier: UNIQUE_IDENTIFIER
  pipelineIdentifier: Project_Name
  source:
    type: Scheduled
    spec:
      type: Cron
      spec:
        expression: 45 13 13 09 2
  inputYaml: |
    pipeline:
      identifier: Project_Name
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
