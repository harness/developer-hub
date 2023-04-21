---
title: Migrate from GitHub Actions to Harness CI
description: Learn how to migrate your existing GitHub Actions workflows to Harness CI.
sidebar_position: 20
---

Harness CI and GitHub Actions both allow you to create workflows that automatically build, test, publish, release, and deploy code.

Harness does not require scripting, and configurations are passed to pipelines securely and pragmatically. In contrast, GitHub Actions provides third-party actions that you use with semi-plug-and-play functionality.

## What makes Harness CI unique?

Harness CI provides proprietary technologies, like Cache Intelligence and Test Intelligence, which make Harness CI [four times faster](https://harness.io/blog/fastest-ci-tool) than other leading CI tools.

* Harness [Test Intelligence (TI)](/docs/continuous-integration/ci-quickstarts/test-intelligence-concepts) is a proprietary technology that speeds up test cycles by running only the tests required to confirm the quality of the code changes that triggered a build. Visualizations show which code changes caused which tests to be selected, and it can help you identify gaps in your test plan. TI also identifies negative trends and provides actionable insights to improve quality. It's possible to reduce build cycle times by up to 90 percent without compromising application quality. This functionality is not built into CircleCI.
* Harness [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence.md) is a proprietary technology that reduces pipeline execution time by automatically caching well-known directories for languages like Java and Node.js.

Harness CI is part of The [Harness Platform](/docs/getting-started/harness-platform-architecture), which is a self-service CI/CD platform that enables end-to-end software delivery. The Harness Platform includes features, functionality, and additional modules to help you build, test, deploy, and verify software. For example:

* Role-Based Access Control (RBAC) helps you control user and group access to Harness resources according to users' roles. Using RBAC increases security and improves efficiency.
* Harness Policy as Code is a centralized policy management and rules service that leverages the Open Policy Agent (OPA) to meet compliance requirements across software delivery and enforce governance policies.
* The Harness Enterprise Ready Self-Managed Edition is an end-to-end solution for continuous, self-managed delivery. You can install and update Harness Self-Managed Enterprise Edition using online or offline (air-gapped) methods.

### GitHub Actions plugins

Harness CI offers built-in support for GitHub Actions. Use the [GitHub Action plugin step](../../ci-technical-reference/plugin-steps/ci-github-action-step.md) in pipelines that use [Harness Cloud build infrastructure](../use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md). For other build infrastructures, use the [Plugin step](./run-a-git-hub-action-in-cie.md).

### Other advantages

Harness CI offers the following additional advantages over GitHub Actions:

* Harness offers a variety of [build infrastructure options](../use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md), including Apple silicon and Linux arm64 options.
* Harness supports both [Terraform](/docs/platform/resource-development/terraform/harness-terraform-provider-overview/) and [CloudFormation](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/cloud-formation-provisioning-with-harness/) infrastructure provisioning with simpler structures and configurations than their corresponding GitHub Actions.
* GitHub Actions does not provide a native Accelerate metrics dashboard, whereas Harness offers both a dedicated dashboard and the ability to configure alerts.

## Comparison: Pipeline architecture

Harness CI and GitHub Actions share some similarities in workflow configuration:
- Workflow configuration files are written in YAML and stored in the repository. The YAML file for Github actions is stored in the .github/workflows folder in a repository and for Harness CI it’s stored on the Harness itself and can be created from UI or by importing it from a Git Source.
- Workflows include one or more stages/jobs.
- Stages include one or more steps or individual commands.
Steps or tasks can be reused and shared with the community.
For more information, see [Harness CI Concepts](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/ci-concepts).

- The Harness YAML editor provides schema validation and auto-complete recommendations to simplify and expedite the configuration experience. Harness is also equipped with a visual editor providing a guided experience that enables anyone to build, debug, and run pipelines easily. Users can switch back and forth between the YAML and Visual Editor as required.

### Define a stage that executes a single build step

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="harness"
    values={[
        {label: 'Github Actions', value: 'github'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="github">
```

```yaml
jobs:
  build_test_and_run:
   name: build test and run
```

```mdx-code-block
</TabItem>
<TabItem value="harness">
```

```yaml
stages:
    - stage:
        name: build test and run   
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Define a step inside a stage 

<Tabs
    defaultValue="harness"
    values={[
        {label: 'Github Actions', value: 'github-actions'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="github-actions">

```yaml
name: code compilation
   container:
         image: python:3.10.6-alpine
 run: |
        python -m compileall ./
```

```mdx-code-block
</TabItem>
<TabItem value="harness">
```

```yaml
 step:
      type: Run
      name: "code compilation "
      identifier: code_compilation
      spec:
          connectorRef: docker_Quickstart
          image: python:3.10.6-alpine
          shell: Sh
          command: python -m compileall ./ 
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Complete example

<!-- revise this to not use service dependency -->

<Tabs
    defaultValue="harness"
    values={[
        {label: 'Github Actions', value: 'github-actions'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="github-actions">

```yaml
name: Github_actions
on:
  pull_request:
    branches:
      - main
jobs:
  Stage_1:
   name: Stage_1
   runs-on: ubuntu-latest
   steps:
      - name: Checkout code
        uses: actions/checkout@v2
        
      - name: login to dockerhub
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
  Stage_2:
     name: Stage_2
     runs-on: ubuntu-latest
     steps:
      - name: step_2 
        container:
              image: node:13.0.0
        run: |
            echo "pipeline var:" $pipeline_var
            echo "project level var:" $project_var
            echo "secret example :" ${{ secrets.Db_Password)}}
  Stage_3:
     name: Stage_3
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
<TabItem value="harness">
```
```yaml
pipeline:
 name: react
 identifier: react
 projectIdentifier:NgLabs
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
                 type: Run
                 name: step1
                 identifier: step1
                 spec:
                   connectorRef: krishikaDocker
                   image: openjdk:17.0-jdk
                   shell: Bash
                   command: echo "this runs on openjdk"
         platform:
           os: Linux
           arch: Amd64
         runtime:
           type: Cloud
           spec: {}
         serviceDependencies:
           - identifier: PostgressDependecyService
             name: Postgress-Dependecy-Service
             type: Service
             spec:
               connectorRef: account.harnessImage
               image: postgres:10.8
               envVariables:
                 POSTGRES_USER: postgres
                 POSTGRES_PASSWORD: <+secrets.getValue("DbPasswordSecret")>
                 POSTGRES_DB: postgres
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
                   connectorRef: krishikaDocker
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
       connectorRef: gitforronak
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

## Comparison: Clone codebases

<Tabs
    defaultValue="harness"
    values={[
        {label: 'Github Actions', value: 'github-actions'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="github-actions">

```yaml
steps:
   - name: Checkout code
     uses: actions/checkout@v2
```
```mdx-code-block
</TabItem>
<TabItem value="harness">
```
```yaml
stage:
  name: build test and run
  identifier: build_test_and_run
  type: CI
      spec:
          cloneCodebase: true
```
```mdx-code-block
</TabItem>
</Tabs>
```
In Github Actions we use `actions/checkout@v2`, which is the action that checks out your repository to the computer that runs the action.

In Harness CI, we have to create a GitHub connector as part of the first step which is basically a configurable object that connects to an external source automatically.

Harness Code Repository Connectors connect your Harness account with your Git platform.

To learn more about creating a GitHub connector, go to [Add a GitHub connector](/docs/platform/connectors/code-repositories/add-a-git-hub-connector/).

Harness CI has a clone codebase option that is similar to that of the GitHub Actions `actions/checkout@v2`.

Each CI pipeline has a codebase that specifies the code repo (input) that the pipeline uses to build the artifact (output). You specify the codebase when you add the first Build stage to the pipeline. This becomes the default input for all other stages in the pipeline. By default, a Build stage clones the repo from your Git provider into your build infrastructure when the pipeline runs.

![](./static/clone-codebase.png)

## Comparison: Access Docker

Log in to Docker registry

A connector in Harness is a configurable object that connects to an external resource automatically. We reference a connector in your pipeline by using its Id in `connectorRef`.

In Harness CI we have connectors for logging into the Docker registry. To learn more about connectors, go to  [Connecting to Docker Registry](/docs/platform/connectors/connect-to-harness-container-image-registry-using-docker-connector/).

<Tabs
    defaultValue="harness"
    values={[
        {label: 'Github Actions', value: 'github-actions'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="github-actions">

```yaml
  name: login to dockerhub
   uses: docker/login-action@v2
   with: 
        username: {{ secrets.DOCKERHUB_USERNAME }}
        password: {{ secrets.DOCKERHUB_TOKEN }}
```

```mdx-code-block
</TabItem>
<TabItem value="harness">
```

```yaml
step:
    type: Run
    name: "code compilation "
    identifier: code_compilation
    spec:
        connectorRef: docker_Quickstart  
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Build and Push an image to Docker Registry

<Tabs
    defaultValue="harness"
    values={[
        {label: 'Github Actions', value: 'github-actions'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="github-actions">

```yaml
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
<TabItem value="harness">
```
```yaml
     - step:
          type: BuildAndPushDockerRegistry
          name: build and push to the docker registry
          identifier: build_and_push_to_the_docker_registry
          spec:
            connectorRef: docker_Quickstart
            repo: krishi0408/pythonsample
             tags:
                - latest
             dockerfile: pythondockerfile
```
```mdx-code-block
</TabItem>
</Tabs>
```

## Comparison: Environment variables

<Tabs
    defaultValue="harness"
    values={[
        {label: 'Github Actions', value: 'github-actions'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="github-actions">

```yaml
env:
  BUILD_PURPOSE: RELEASE
```
```mdx-code-block
</TabItem>
<TabItem value="harness">
```
```yaml
variables:
   - name: BUILD_PURPOSE
     type: String
     description: ""
     value: RELEASE 
```
```mdx-code-block
</TabItem>
</Tabs>
```

## Comparison: Matrix strategies

A matrix strategy lets you use variables in a single job definition to automatically create multiple job runs that are based on the combinations of the variables. For example, you can use a matrix strategy to test your code in multiple versions of a language or on multiple operating systems.

To learn more about matrix in Harness CI, go to [Looping strategies in Harness](https://docs.harness.io/article/eh4azj73m4-looping-strategies-matrix-repeat-and-parallelism).

<Tabs
    defaultValue="harness"
    values={[
        {label: 'Github Actions', value: 'github-actions'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="github-actions">

```yaml
jobs:
 example_matrix:
  strategy:
   matrix:
     python: [ 3.10.6-alpine,3.10.4-alpine]
```
```mdx-code-block
</TabItem>
<TabItem value="harness">
```
```yaml
 strategy:
    repeat:
      items:
        - 3.10.6-alpine
        - 3.10.4-alpine
    maxConcurrency: 2
```
```mdx-code-block
</TabItem>
</Tabs>
```


## Comparison: Triggers

<Tabs
    defaultValue="harness"
    values={[
        {label: 'Github Actions', value: 'github-actions'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="github-actions">

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
<TabItem value="harness">
```
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
In Harness CI, you can trigger pipelines in response to Git events that match specific payload conditions you set up in the Harness trigger.

For example, when a pull request or push event occurs on a Git repo and your trigger settings match the payload conditions, a CI pipeline can execute.

In Harness, you trigger a workflow using the trigger option in the pipeline studio.

To learn more about creating a trigger, go to [Trigger Pipelines using Git Event Payload Conditions](/docs/platform/triggers/trigger-pipelines-using-custom-payload-conditions/)

## See also

Review the following information before proceeding with migration:

* [Harness CI Concepts](/docs/continuous-integration/ci-quickstarts/ci-concepts)
* [Harness CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components.md)
* [Caching in Harness CI](/docs/category/share-and-cache-ci-data)
* [Speed up Harness CI pipelines using parallelism](/docs/platform/Pipelines/speed-up-ci-test-pipelines-using-parallelism)
* [Harness Platform documentation](/docs/platform)
