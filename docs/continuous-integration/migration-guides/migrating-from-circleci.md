---
title: Migrating from CircleCI to Harness CI
description: Learn how to migrate your existing CircleCI workflows to Harness CI.
sidebar_position: 4
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
---

## Introduction

Harness CI and CircleCI are both cloud-native CI products that allow developers to build and test code.  

CircleCI and Harness CI share some similarities: 

- Harness CI Pipeline Studio allows you to create pipelines visually or using code, and switch back and forth as needed. CircleCI only allows pipeline configuration as code.
- Harness CI uses stages to run a collection of steps, while CircleCI uses jobs to group one or more steps or individual commands.

For more information, see [Harness CI Concepts](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/ci-concepts).

## Key differences

- Harness CI provides proprietary technologies like Cache Intelligence and Test Intelligence™, which make Harness CI [four times faster](https://harness.io/blog/fastest-ci-tool) than other leading CI tools.
    - Harness [Test Intelligence](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/test-intelligence-concepts) is a proprietary technology that speeds up test cycles by running only the tests required to confirm the quality of the code changes that triggered a build. It then ranks them in the best possible order to increase the rate of fault detection. It’s easy to see the code changes and gaps in the test plan. Test Intelligence also identifies negative trends and provides actionable insights to improve quality. Once the appropriate tests are identified, Harness CI runs split tests and runs them concurrently. It’s possible to reduce build cycle times by up to 90 percent without compromising application quality. This functionality is not built into CircleCI.
    - Harness Cache Intelligence is a proprietary technology that reduces pipeline execution time by automatically caching well-known directories for Java and Node.js with more languages to come. Manage and flush the cache in the Harness user interface.
- Harness CI allows executing GitHub Actions plugins, Drone Plugins, and Bitrise Plugins using the [Plugin step](https://developer.harness.io/docs/category/use-drone-plugins).
- The Harness YAML editor provides schema validation and auto-complete recommendations to simplify and expedite the configuration experience. Harness is also equipped with a visual editor providing a guided experience that enables anyone to build, debug, and run pipelines easily. Users can switch back and forth between the YAML and Visual Editor as required.
- Harness CI is part of The [Harness Platform](https://developer.harness.io/docs/getting-started/harness-platform-architecture), which is a self-service CI/CD platform that enables end-to-end software delivery. The Harness Platform includes modules to help you build, test, deploy, and verify software.
- Harness provides an Enterprise Ready Self-Managed Edition, which is an end-to-end solution for continuous, self-managed delivery. You can install and update Harness Self-Managed Enterprise Edition using online or offline (air-gapped) methods.
- Harness provides Role-Based Access Control (RBAC) that enables you to control user and group access to Harness resources according to the user's role. By using RBAC, users can increase security and improve efficiency.
- Harness Policy as Code is a centralized policy management and rules service that leverages the Open Policy Agent (OPA) to meet compliance requirements across software delivery and enforce governance policies.

### CircleCI orbs and the Harness plugin

- **HarnessCI**
    - Harness has a Plugin Step, which is a Docker container to perform a predefined task. Read more about Harness plugins [here](https://developer.harness.io/docs/continuous-integration/ci-technical-reference/plugin-step-settings-reference).
    - Harness also enables you to standardize and create step templates that can be reused across pipelines and teams that use Harness. Read more about step templates [here](https://developer.harness.io/docs/platform/Templates/run-step-template-quickstart).
- **CircleCI**
    - CircleCI orbs are reusable shareable configuration packages that combine jobs, commands, and executors.

### Specify a Docker image to use for a job

- **Codebase cloning**
    - Each Harness CI pipeline has a codebase that specifies the code repo (input) that the pipeline uses to build the artifact (output). You specify the codebase when you add the first build stage to the pipeline. This becomes the default input for all other stages in the pipeline. By default, a build stage clones the repo from your Git provider into your build infrastructure when the pipeline runs.
    - A codebase has two components, both of which you can edit:
        - The codebase connector, which specifies the codebase URL and required credentials.
        - A set of advanced options to configure how the Pppeline clones and builds the repo.
    - CircleCI checkout is a step used to check out source code to the configured path.

- **Connectors**
    - Harness integrates with many different types of repositories and providers. A connection to other platforms is called a [Connector](https://developer.harness.io/docs/platform/Connectors/ref-cloud-providers/docker-registry-connector-settings-reference). In the below example DOCKER_CONNECTOR_REF is a reference to the Docker connector. A Docker connector is platform-agnostic and can be used to connect to any Docker container registry.


```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="harness"
    values={[
        {label: 'CircleCI', value: 'circle'},
        {label: 'Harness', value: 'harness'},
    ]}>
<TabItem value="circle">
```


```yaml
jobs:
  job1:
    steps:
      - checkout
      - run: "execute-script-for-job1"
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

### Define a multi-stage build pipeline

Stage1 and Stage2 run concurrently. Once they are done, stage 3 is executed. Once stage 3 is done, stage 4 runs.
- CircleCI uses workflows to execute jobs in parallel, sequential, or mixed fashion.
- In Harness CI, stages are executed in order of occurrence in the YAML config. Stages defined under the `- parallel` tag execute in a parallel fashion.



```mdx-code-block

<Tabs
    defaultValue="harness"
    values={[
        {label: 'CircleCI', value: 'circle'},
        {label: 'Harness', value: 'harness'},
    ]}>
<TabItem value="circle">
```


```yaml
jobs:
  job1:
    docker:
      - image: cimg/node:17.2.0 
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  
    steps:
      - checkout 
      - run: echo "job1"
job2:
    docker:
      - image: cimg/node:17.2.0 
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  
    steps:
      - checkout 
      - run: echo "job2"
job3:
    docker:
      - image: cimg/node:17.2.0 
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  
    steps:
      - checkout 
      - run: echo "job3"
job4:
    docker:
      - image: cimg/node:17.2.0 
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  
    steps:
      - checkout 
      - run: echo "job4"      

workflows:
  version: 2
  jobs:
    - job1
    - job2
    - job3:
        requires:
          - job1
          - job2
    - job4:
        requires:
          - job3
```

```mdx-code-block
</TabItem>

<TabItem value="harness">
```

```yaml
  stages:
    - parallel:
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
                        connectorRef: ronakpatildocker
                        image: node:13.0.0
                        shell: Bash
                        command: echo "Downlaod file in parallel with stage 2 "
        - stage:
            name: Stage2
            identifier: stage2
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
                        connectorRef: ronakpatildocker
                        image: node:13.0.0
                        shell: Bash
                        command: echo "step1"
    - stage:
        name: Stage3
        identifier: Stage3
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
                    connectorRef: ronakpatildocker
                    image: node:13.0.0
                    shell: Bash
                    command: echo "step 1 in stage3 . stage 3 requires stage 1 and 2 "
    - stage:
        name: Stage4
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
                    connectorRef: ronakpatildocker
                    image: node:13.0.0
                    shell: Bash
                    command: echo "step 1 in stage4 . stage 4 requires stage 3"
                
```
```mdx-code-block
</TabItem>
</Tabs>
```

### Environment variables

- Project-level environment variables in CircleCI are set using the web app and then referenced in the pipeline. To use environment variables across multiple projects CircleCI uses Context.

- Harness allows users to add variables on project, organization, and account levels, and those can be referenced using the following expression:
`<+variable.[scope].[variable_id]>`

    - `* Account-level reference: <+variable.account.[var Id]>`
    - `* Org-level reference: <+variable.org.[var Id]>`
    - `* Project-level reference: <+variable.[var Id]>`

Read more about account, project, and organization-level variables [here](https://developer.harness.io/docs/platform/Variables-and-Expressions/add-a-variable)



```mdx-code-block

<Tabs
    defaultValue="harness"
    values={[
        {label: 'CircleCI', value: 'circle'},
        {label: 'Harness', value: 'harness'},
    ]}>
<TabItem value="circle">
```


```yaml
jobs:
  job1: 
    steps:
      - run: echo $MY_ENV_VAR
```

```mdx-code-block
</TabItem>

<TabItem value="harness">
```

```yaml
 - stage:
        name: Stagename
        identifier: Stagename
        spec:
          execution:
            steps:
              - step:
                  type: Run
                  name: step1
                  identifier: step1
                  spec:
                    command: echo "project var: " <+variable.proj_var>
                
```
```mdx-code-block
</TabItem>
</Tabs>
```
### Matrix

Matrix jobs in CircleCI are achieved using parameters and then referencing them in the pipeline using the following expression:

`<< parameters.param >>`

Matrix is 1 of 2 looping executing strategies provided by Harness. Matrix gives the ability to execute the same set of tasks multiple times for a bunch of different configurations. This is achieved by mentioning user-defined tags and referencing them in the pipeline using the following expression:

`<+matrix.usertag>`

To learn more about Matrix click [here](https://developer.harness.io/docs/platform/Pipelines/looping-strategies-matrix-repeat-and-parallelism#matrix)



```mdx-code-block

<Tabs
    defaultValue="harness"
    values={[
        {label: 'CircleCI', value: 'circle'},
        {label: 'Harness', value: 'harness'},
    ]}>
<TabItem value="circle">
```


```yaml
jobs:
  job1:
    docker:
      - image: cimg/node:17.2.0 
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  

    steps:
      - checkout 
      - run: << parameters.os >>
      

workflows:
  all-tests:
    jobs:
      - job1:
          matrix:
            parameters:
              os: [node,ubuntu ,python]
```

```mdx-code-block
</TabItem>

<TabItem value="harness">
```

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
                    command: echo “Testing on  <+matrix.testparam>”
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
### Triggers

- **HarnessCI**
   - Harness supports webhook triggers and scheduled triggers. The two most commonly used triggers are webhook triggers based on Git events and scheduled triggers based on a cron expression. To learn more about creating a trigger, go to [Harness Triggers](https://developer.harness.io/docs/category/triggers).

- **CircleCI**
    - CircleCI supports triggering a pipeline on push and PR to the code repository and scheduled triggers.

> Note: CircleCI configurations are stored in the path `.CircleCI/config.yml` at the root of your source code repository on the counter. Harness provides inline pipeline storage or storing [Pipeline YAML (Pipeline-as-Code)](https://developer.harness.io/docs/platform/Git-Experience/import-a-pipeline) on Git.

## Complete example




```mdx-code-block

<Tabs
    defaultValue="harness"
    values={[
        {label: 'CircleCI', value: 'circle'},
        {label: 'Harness', value: 'harness'},
    ]}>
<TabItem value="circle">
```


```yaml
version: 2.1


executors:
  linux: # a Linux VM running Ubuntu 20.04
    machine:
      image: ubuntu-2004:202107-02

jobs:
 
  job1:
      docker:
        # Primary Executor
        - image: openjdk:17.0

        # Dependency Service(s)
        - image: postgres:10.8
          environment:
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: postgres
            POSTGRES_DB: postgres
      steps:
        - checkout
        - run: echo "this is the build job"
  
  job2:
    docker:
      - image: cimg/base:2020.01
    steps:
      - checkout
      - run:
          name: "echo an env var that is part of our context"
          command: |
            echo $MY_ENV_VAR
            echo ${MY_ENV_VAR}
            
  job3:
    parameters:
      matrix-var:
        type: string     
    executor:
      name: linux
    steps:
      - checkout
      - run:
          shell: bash
          command: echo "matrix vaule << parameters.matrix-var >> "
          name: step1

workflows:
  all-tests:
    jobs:
      - job1
      - job2 :
          context: smaple-contex
          requires:
            - job1
      - job3:
          requires:
            - job2
          matrix:
            parameters:
              matrix-var: ["python", "java"]
```

```mdx-code-block
</TabItem>

<TabItem value="harness">
```

```yaml
pipeline:
  name: testpipeline
  identifier: testpipeline
  projectIdentifier: NgLabs
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
                    connectorRef: ronakpatildocker
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
                    connectorRef: ronakpatildocker
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
                    command: echo “Testing on  <+matrix.testparam>”
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


We recommend going through the following list to make you more comfortable before going ahead with complex configiguration and migration:
- [Caching](https://developer.harness.io/docs/category/share-and-cache-ci-data)
- [Parallelism](https://developer.harness.io/docs/platform/Pipelines/speed-up-ci-test-pipelines-using-parallelism)
- [Platform Concepts](https://developer.harness.io/docs/platform)
