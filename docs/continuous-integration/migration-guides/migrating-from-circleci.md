---
title: Migrate from CircleCI to Harness CI
description: Learn how to migrate your existing CircleCI workflows to Harness CI.
sidebar_position: 10
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness CI and CircleCI are both cloud-native CI products that help developers build and test code.

## What makes Harness CI unique?

Harness CI provides proprietary technologies, like Cache Intelligence and Test Intelligence, which make Harness CI [four times faster](https://harness.io/blog/fastest-ci-tool) than other leading CI tools.

* Harness [Test Intelligence (TI)](../use-ci/set-up-test-intelligence/set-up-test-intelligence.md) is a proprietary technology that accelerates test cycles by running only the tests necessary to confirm the quality of the code changes that triggered a build. Visualizations show which code changes caused which tests to be selected, and TI can help you identify gaps in your test plan. TI also detects negative trends and provides actionable insights to improve quality. With TI, it's possible to reduce build cycle times by up to 90% without compromising application quality.
* Harness [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence.md) is a proprietary technology that reduces pipeline execution time by automatically caching well-known directories for languages like Java and Node.js.

Harness CI is part of The [Harness Platform](/docs/getting-started/harness-platform-architecture), which is a self-service CI/CD platform that enables end-to-end software delivery. The Harness Platform includes features, functionality, and additional modules to help you build, test, deploy, and verify software. For example:

* Role-Based Access Control (RBAC) helps you control user and group access to Harness resources according to users' roles. Using RBAC increases security and improves efficiency.
* Harness Policy as Code is a centralized policy management and rules service that leverages the Open Policy Agent (OPA) to meet compliance requirements across software delivery and enforce governance policies.
* The Harness Enterprise Ready Self-Managed Edition is an end-to-end solution for continuous, self-managed delivery. You can install and update Harness Self-Managed Enterprise Edition using online or offline (air-gapped) methods.

## Comparison: Pipeline architecture

Both Harness CI and CircleCI use pipelines to organize workflows. CircleCI organizes steps and commands into _jobs_, and each pipeline has one or more jobs. Similarly, Harness CI organizes steps, which contain commands, into _stages_, and each each pipeline has one or more stages. The following truncated examples provide a simple comparison of pipeline structure in CircleCI and Harness CI.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
  <TabItem value="circleci" label="CircleCI">
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
  <TabItem value="harnessci" label="Harness CI" default>
```

```yaml
stages:
   - stage:
            steps:
              - step:
                  type: Run
```

```mdx-code-block
  </TabItem>
</Tabs>
```

For more information about Harness terminology, features, and pipeline components, go to [CI pipeline basics](/docs/continuous-integration/ci-quickstarts/ci-pipeline-basics).

When creating pipelines, CircleCI supports pipeline configuration as code only. In contrast, the Harness CI Pipeline Studio provides both a visual editor and a YAML code editor.

* The Harness YAML editor includes schema validation and auto-complete recommendations to simplify and expedite pipeline configuration.
* The Harness visual editor provides a guided experience that enables anyone to easily build, debug, and run pipelines.
* You can switch back and forth between editors.

<details>
<summary>Complete pipeline comparison</summary>

Here are YAML examples of complete pipelines in CircleCI and Harness CI.

```mdx-code-block
import Tabs2 from '@theme/Tabs';
import TabItem2 from '@theme/TabItem';
```

```mdx-code-block
<Tabs2>
  <TabItem2 value="circleci" label="CircleCI">
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
  </TabItem2>
  <TabItem2 value="harness" label="Harness" default>
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
                  type: Background
                  name: Postgress-Dependecy-Service
                  identifier: PostgressDependecyService
                  spec:
                    connectorRef: account.harnessImage
                    image: postgres:10.8
                    shell: Sh
                    envVariables:
                      POSTGRES_USER: postgres
                      POSTGRES_PASSWORD: <+secrets.getValue("DbPasswordSecret")>
                      POSTGRES_DB: postgres
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
  </TabItem2>
</Tabs2>
```

</details>

## Comparison: CircleCI orbs and Harness plugins

CircleCI _orbs_ are reusable shareable configuration packages that combine jobs, commands, and executors.

Harness CI has two options for reusable, pre-packaged functionality:

* [Use Plugin steps](/docs/category/use-plugins) to run GitHub Actions, Bitrise Integrations, Drone plugins, and other plugins in your CI pipelines. Drone Plugins are Docker containers that perform a predefined task.
* [Create standardized step templates](/docs/platform/Templates/run-step-template-quickstart) that can be reused across pipelines and teams in your Harness account.

## Comparison: Specify a codebase or Docker image

To clone a codebase in CircleCI, you use a _checkout_ step to check out source code to the configured path. In Harness CI, each pipeline has a codebase specification that identifies the code repo (input) that the pipeline uses to build an artifact (output). In Harness CI, [codebase configuration](../use-ci/codebase-configuration/create-and-configure-a-codebase.md) has two components:

* The codebase _connector_, which specifies the codebase URL and required credentials to access your code repos.
* A series of settings describing how you want the pipeline to clone and build the repo.

When you create a Harness CI pipeline, you specify a default codebase to use for all stages in the pipeline. By default, each stage automatically clones the designated code repo from your Git provider into the stage's build infrastructure when the pipeline runs.

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
                    connectorRef: my-docker-hub-connector
                    image: openjdk:17.0-jdk
                    shell: Bash
                    command: echo "this runs on openjdk"
```

:::

## Comparison: Define a multi-stage build pipeline

In this example, `Stage1` and `Stage2` run concurrently. Once they are done, `Stage3` runs. Once `Stage3` is done, `Stage4` runs.

CircleCI uses workflows to execute jobs in parallel, sequential, or mixed fashion.

In Harness CI, stages are executed in order of occurrence in the YAML config. Stages defined under the `- parallel` tag execute in a parallel fashion.

<details>
<summary>YAML examples: Multi-stage build pipelines</summary>

Here are YAML examples of multi-stage build pipelines in CircleCI and Harness CI.

```mdx-code-block
import Tabs3 from '@theme/Tabs';
import TabItem3 from '@theme/TabItem';
```

```mdx-code-block
<Tabs3>
  <TabItem3 value="circleci" label="CircleCI">
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
  </TabItem3>
  <TabItem3 value="harness" label="Harness" default>
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
  </TabItem3>
</Tabs3>
```

</details>

## Comparison: Environment variables

In CircleCI, you use the web app to define project-level environment variables, and then you can reference them in a pipeline. You can use _Context_ to use environment variables across multiple projects.

In Harness CI, you can define variables at the project, organization, and account levels. To reference these variables, you use variable expressions formatted as: `<+variable.[scope].[variable_id]>`. Here are the syntax formats for variables declared at different levels:

- Account-level variable reference: `<+variable.account.[var_id]>`
- Organization-level variable reference: `<+variable.org.[var_id]>`
- Project-level variable reference: `<+variable.[var_id]>`

```mdx-code-block
import Tabs4 from '@theme/Tabs';
import TabItem4 from '@theme/TabItem';
```

```mdx-code-block
<Tabs4>
  <TabItem4 value="circleci" label="CircleCI">
```

```yaml
jobs:
  job1:
    steps:
      - run: echo $MY_ENV_VAR
```

```mdx-code-block
  </TabItem4>
  <TabItem4 value="harness" label="Harness" default>
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

In addition to project, organization, and account variables, you can use built-in variables or define custom variables within individual pipelines, stages, and steps. To learn more about defining and fetching variables in Harness, go to:

* [Built-in and custom Harness variables reference](/docs/platform/variables-and-expressions/harness-variables/)
* [Add Account, Org, and Project-level variables](/docs/platform/variables-and-expressions/add-a-variable/)

```mdx-code-block
  </TabItem4>
</Tabs4>
```

## Comparison: Matrix jobs

In CircleCI, matrix jobs are achieved by using parameters and then referencing those parameters in the pipeline using the following expression syntax: `<< parameters.param >>`

In Harness, matrix looping strategies are one of several looping execution strategies. With matrix looping strategies, your pipelines can execute the same set of tasks multiple times for several different configurations. This is achieved by mentioning user-defined tags and referencing them in the pipeline using the following expression syntax: `<+matrix.usertag>`

To learn about the looping strategies available in Harness, go to [Looping Strategies Overview](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism)

```mdx-code-block
import Tabs5 from '@theme/Tabs';
import TabItem5 from '@theme/TabItem';
```

```mdx-code-block
<Tabs5>
  <TabItem5 value="circleci" label="CircleCI">
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
  </TabItem5>
  <TabItem5 value="harness" label="Harness" default>
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
  </TabItem5>
</Tabs5>
```

## Comparison: Triggers

CircleCI supports triggering a pipeline on push and PR to the code repository and scheduled triggers.

Harness CI supports webhook triggers and scheduled triggers. The two most commonly used triggers are webhook triggers based on Git events and scheduled triggers based on a `cron` expression. To learn more about creating a trigger, go to [Triggers](/docs/category/triggers).

:::info

CircleCI configurations are stored in the path `.CircleCI/config.yml` at the root of your source code repository on the counter.

Harness provides inline pipeline storage or storing [Pipeline YAML (Pipeline-as-Code) on Git](/docs/platform/Git-Experience/import-a-pipeline).

:::

## See also

Review the following information before proceeding with migration:

* [Caching in Harness CI](/docs/category/share-and-cache-ci-data)
* [Speed up Harness CI pipelines using parallelism](/docs/platform/Pipelines/speed-up-ci-test-pipelines-using-parallelism)
* [Harness Platform documentation](/docs/platform)
