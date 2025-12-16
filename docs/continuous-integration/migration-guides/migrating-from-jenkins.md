---
title: Migrate from Jenkins CI to Harness CI
description: Learn how to migrate your existing Jenkins pipelines to Harness CI.
sidebar_position: 40
---

Harness CI and Jenkins both allow you to create pipelines that automatically build, test, publish, release, and deploy code.

This guide describes the important differences between Harness CI and Jenkins so that you can migrate your existing Jenkins pipelines to Harness CI.

## What makes Harness CI unique?

Harness CI provides proprietary technologies, like Cache Intelligence and Test Intelligence, which make Harness CI [four times faster](https://harness.io/blog/fastest-ci-tool) than other leading CI tools.

* Harness [Test Intelligence (TI)](../use-ci/run-tests/ti-overview.md) is a proprietary technology that accelerates test cycles by running only the tests necessary to confirm the quality of the code changes that triggered a build. Visualizations show which code changes caused which tests to be selected, and TI can help you identify gaps in your test plan. TI also detects negative trends and provides actionable insights to improve quality. With TI, it's possible to reduce build cycle times by up to 90% without compromising application quality.
* Harness [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence.md) is a proprietary technology that reduces pipeline execution time by automatically caching well-known directories for languages like Java and Node.js.

In addition, you can [use plugins](../use-ci/use-drone-plugins/explore-ci-plugins.md) to include GitHub Actions, Bitrise Workflow Steps, Jira updates, and more in your Harness CI pipelines.

Harness CI is part of The [Harness Platform](/docs/platform/get-started/key-concepts.md), which is a self-service CI/CD platform that enables end-to-end software delivery. The Harness Platform includes features, functionality, and additional modules to help you build, test, deploy, and verify software. For example:

* [Secrets management](/docs/category/secrets-management) through the [Harness secrets manager](/docs/platform/secrets/secrets-management/harness-secret-manager-overview) or an [external secrets manager](/docs/platform/get-started/tutorials/add-secrets-manager).
* Role-Based Access Control (RBAC) helps you control user and group access to Harness resources according to users' roles. Using RBAC increases security and improves efficiency.
* Harness Policy as Code is a centralized policy management and rules service that leverages the Open Policy Agent (OPA) to meet compliance requirements across software delivery and enforce governance policies.
* The Harness Enterprise Ready Self-Managed Edition is an end-to-end solution for continuous, self-managed delivery. You can install and update Harness Self-Managed Enterprise Edition using online or offline (air-gapped) methods.

## Comparison: Pipeline architecture

Both Harness CI and Jenkins use pipelines to organize builds. In both products, pipelines are made up of one or more stages, which represent major segments of the workflow. Each stage includes one or more steps, which in turn contain individual commands.

In Jenkins, pipelines are defined using either Declarative or Scripted Pipeline syntax in a `Jenkinsfile`. In Harness CI, pipelines are defined in YAML and can be stored inline or in Git repositories.

The following truncated examples provide a simple comparison of stage and step structure in Jenkins and Harness CI.


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>
  <TabItem value="jenkins" label="Jenkins">


```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'echo "Building on default agent"'
            }
        }
    }
}
```


</TabItem>
  <TabItem value="harness" label="Harness" default>


```yaml
    - stage:
        name: Build
        ...
            steps:
              - step:
                  type: Run
                  name: build
                  identifier: build
                  spec:
                    connectorRef: my-docker-hub-connector
                    image: maven:3.8-openjdk-17
                    shell: Bash
                    command: echo "Building on Harness"
```


</TabItem>
</Tabs>


For more information about Harness terminology, features, and pipeline components, go to the [CI key concepts](../get-started/key-concepts.md).

### Stages and steps

Stages in Jenkins are similar to stages in Harness CI. In both products, stages contain steps with commands. An important difference is that Jenkins Declarative Pipeline runs stages sequentially by default (unless using `parallel` blocks), similar to Harness CI where stages and steps also run sequentially by default. However, you can enable [parallelism and other looping strategies](#comparison-matrix-and-parallelism) in Harness CI.

:::info Root and non-root users

Steps run as the root user, generally. For example, with Harness Cloud build infrastructure, steps run directly on the host and, therefore, run as the root user.

For services running on containers (which are steps where you specify a **Container Registry** and **Image** to use to execute the step's commands), you can use the **Run as User** setting to specify a user to use for that container.

With Kubernetes cluster build infrastructure, you can use the **Run as User** setting to specify a user to use for individual steps, or you can [set a default user for all steps](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md#run-as-non-root-or-a-specific-user) and then override the default user as needed for individual steps.

:::

### Scripts in pipelines

Both Harness CI and Jenkins support running scripts or shell commands in steps. In Jenkins, you use `sh`, `bat`, or `powershell` steps to run scripts.

In Harness CI, scripts are supplied in the `command` key, and can be supplied for any step type that supports `command`. You specify the shell type using the `shell` key.

### Writing pipelines

Jenkins pipelines are written in Groovy-based DSL (either Declarative or Scripted syntax) and are stored in a `Jenkinsfile` in your code repository. Harness CI pipelines are written in YAML, and Harness provides you a choice of inline pipeline storage or [importing pipelines from Git](/docs/platform/git-experience/import-a-pipeline/). Harness also provides both visual and code-based pipeline editors.

* The Harness YAML editor includes schema validation and auto-complete recommendations to simplify and expedite pipeline configuration.
* The Harness visual editor provides a guided experience that enables anyone to easily build, debug, and run pipelines.
* You can switch back and forth between editors.

<details>
<summary>Complete pipeline comparison</summary>

Here are examples of complete pipelines in Jenkins and Harness CI.


<Tabs>
  <TabItem value="jenkins" label="Jenkins">


```groovy
pipeline {
    agent any
    
    environment {
        POSTGRES_USER = 'postgres'
        POSTGRES_PASSWORD = credentials('postgres-password')
        POSTGRES_DB = 'postgres'
    }
    
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'openjdk:17.0-jdk'
                }
            }
            steps {
                sh 'echo "Building on openjdk"'
            }
        }
        
        stage('Test') {
            agent {
                docker {
                    image 'node:13.0.0'
                }
            }
            steps {
                sh '''
                    echo "project level var: ${PROJ_VAR}"
                    echo "pipeline var: ${PIPELINE_VAR}"
                    echo "secret example: ${DB_PASSWORD}"
                '''
            }
        }
        
        stage('Matrix Build') {
            matrix {
                axes {
                    axis {
                        name 'PLATFORM'
                        values 'windows', 'mac', 'linux'
                    }
                }
                stages {
                    stage('Build Platform') {
                        steps {
                            sh 'echo "Testing on ${PLATFORM}"'
                        }
                    }
                }
            }
        }
    }
}
```


</TabItem>
  <TabItem value="harness" label="Harness" default>


```yaml
pipeline:
  name: jenkins migration test
  identifier: jenkins_migration_test
  projectIdentifier: jenkins_test
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Build
        identifier: build
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
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: postgres:10.8
                    envVariables:
                      POSTGRES_USER: postgres
                      POSTGRES_PASSWORD: <+secrets.getValue("DbPasswordSecret")>
                      POSTGRES_DB: postgres
              - step:
                  type: Run
                  name: build
                  identifier: build
                  spec:
                    connectorRef: myDockerHubConnector
                    image: openjdk:17.0-jdk
                    shell: Bash
                    command: echo "Building on openjdk"
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
    - stage:
        name: Test
        identifier: test
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: test
                  identifier: test
                  spec:
                    connectorRef: myDockerHubConnector
                    image: node:13.0.0
                    shell: Bash
                    command: |-
                      echo "pipeline var:" <+pipeline.variables.pipelinevar1>
                      echo "project level var:" <+variable.proj_var>
                      echo "secret example:" <+secrets.getValue("DbPasswordSecret")>
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
        variables: []
    - stage:
        name: matrix stage
        identifier: matrix_stage
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: platform_test
                  identifier: platform_test
                  spec:
                    shell: Bash
                    command: echo "Testing on <+matrix.platform>"
                  failureStrategies: []
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
        strategy:
          matrix:
            platform:
              - windows
              - mac
              - linux
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


</TabItem>
</Tabs>


</details>

## Comparison: Specify a Docker image

In Jenkins, you can specify Docker images using the `agent` directive with a `docker` block, for example:

```groovy
pipeline {
    agent {
        docker {
            image 'openjdk:17.0-jdk'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'echo "Running in Docker container"'
            }
        }
    }
}
```

In Harness CI, you specify *connectors* and images for each step, if necessary. Depending on the step type, the commands you are running, and your build infrastructure, you may not need to specify an image. For example, if a binary is already available on your build farm, you may not need to pull an image for that binary.

For example, the following step includes a `connectorRef` referencing a Docker connector. [Docker connectors](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) are platform-agnostic and can be used to connect to any Docker container registry.

```yaml
              - step:
                  type: Run
                  name: build
                  identifier: build
                  spec:
                    connectorRef: my-docker-hub-connector
                    image: openjdk:17.0-jdk
                    shell: Bash
                    command: echo "Running in Docker container"
```

:::info What are connectors?

Harness integrates with many different types of repositories and providers. A connection from Harness to other platforms is called a [connector](/docs/category/connectors). Connectors can connect to source control providers, cloud providers, container registries, and more.

:::

## Comparison: Define a multi-stage pipeline

Both Jenkins and Harness CI execute pipeline stages in a specific order based on the configuration.


<Tabs>
  <TabItem value="jenkins" label="Jenkins">


```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'run tests'
            }
        }
        stage('Build') {
            steps {
                sh 'run build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'deploy application'
            }
        }
    }
}
```


</TabItem>
  <TabItem value="harness" label="Harness" default>


```yaml
  stages:
    - stage:
        name: Test
        ...
    - stage:
        name: Build
        ...
    - stage:
        name: Deploy
        ...
```


</TabItem>
</Tabs>


The following examples compare Jenkins and Harness CI pipelines with multiple stages.

<details>
<summary>YAML examples: Multi-stage pipelines</summary>


<Tabs>
  <TabItem value="jenkins" label="Jenkins">


```groovy
pipeline {
    agent any
    
    stages {
        stage('Test') {
            agent {
                docker {
                    image 'golang:latest'
                }
            }
            steps {
                sh 'go fmt $(go list ./... | grep -v /vendor/)'
                sh 'go vet $(go list ./... | grep -v /vendor/)'
                sh 'go test -race $(go list ./... | grep -v /vendor/)'
            }
        }
        
        stage('Build') {
            agent {
                docker {
                    image 'golang:latest'
                }
            }
            steps {
                sh 'mkdir -p mybinaries'
                sh 'go build -o mybinaries ./...'
            }
            post {
                success {
                    archiveArtifacts artifacts: 'mybinaries/**'
                }
            }
        }
    }
}
```

</TabItem>
  <TabItem value="harness" label="Harness" default>


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


</TabItem>
</Tabs>


</details>

## Comparison: Environment variables

In Jenkins, you can use environment variables to control the behavior of stages and pipelines, store values you want to reuse, or avoid hard-coding values in your `Jenkinsfile`. You can use predefined environment variables (like `BUILD_NUMBER`, `JOB_NAME`), define custom variables in the `environment` block, or use credentials.

This range of variable definition is also possible in Harness CI. In addition to built-in variables, you can define variables within individual pipelines, stages, and steps as well as at the project, organization, and account levels.


<Tabs>
  <TabItem value="jenkins" label="Jenkins">


This Jenkins example demonstrates use of pre-defined and custom variables.

```groovy
pipeline {
    agent any
    
    environment {
        MY_VAR = 'my-value'
        DB_PASSWORD = credentials('db-password-credential')
    }
    
    stages {
        stage('Test') {
            steps {
                sh 'echo "Build Number: ${BUILD_NUMBER}"'
                sh 'echo "Custom Var: ${MY_VAR}"'
                sh 'echo "Secret: ${DB_PASSWORD}"'
            }
        }
    }
}
```


</TabItem>
  <TabItem value="harness" label="Harness">


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
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: postgres:10.8
                    envVariables:
                      POSTGRES_USER: postgres
                      POSTGRES_PASSWORD: <+secrets.getValue("DbPasswordSecret")>
                      POSTGRES_DB: postgres
```

To learn more about defining and fetching variables go to:

* [Use Harness expressions](/docs/platform/variables-and-expressions/harness-variables)
* [Define variables](/docs/platform/variables-and-expressions/add-a-variable)


</TabItem>
</Tabs>


## Comparison: Matrix and parallelism

In Jenkins, you can use the `matrix` directive for matrix builds and `parallel` blocks for parallel execution. In Harness CI, steps and stages run sequentially unless you enable parallelism. For example, this Harness CI YAML example shows a pipeline with two stages that run in parallel, as indicated by `- parallel`, and two stages that run sequentially after the two parallel stages.

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

In addition to parallelism, you can use Harness CI's [looping strategies](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) to make your pipelines more dynamic and versatile. These strategies allow your pipelines to execute the same set of tasks multiple times for several different configurations without requiring you to intentionally create unique steps or stages for each iteration. This is achieved by mentioning user-defined tags and referencing them in the pipeline using the following expression syntax: `<+matrix.usertag>`

As in Jenkins, you also can combine parallelism and matrix strategies in Harness CI, as shown in the following examples.


<Tabs>
  <TabItem value="jenkins" label="Jenkins">


```groovy
pipeline {
    agent any
    stages {
        stage('Matrix Build') {
            matrix {
                axes {
                    axis {
                        name 'PLATFORM'
                        values 'windows', 'mac', 'linux'
                    }
                }
                stages {
                    stage('Test') {
                        steps {
                            sh 'echo "Testing on ${PLATFORM}"'
                        }
                    }
                }
            }
        }
    }
}
```


</TabItem>
  <TabItem value="harness" label="Harness" default>


The following example describes a stage in a Harness CI pipeline that includes one step with matrix and parallelism strategies. The looping strategies are defined in `strategy` at the stage level. One matrix strategy, called `testparam`, is defined in `matrix` and parallelism is defined by `maxConcurrency: 3`. The script in the `Run` step calls the inputs from the matrix strategy by using the expression `<+matrix.testparam>`.

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


</TabItem>
</Tabs>


## Comparison: Triggers

Both Jenkins and Harness CI support various methods to trigger pipeline execution.

In Jenkins, pipelines can be triggered through:
- SCM polling
- Webhooks
- Timer/cron triggers (using `triggers { cron(...) }`)
- Manual triggers
- Upstream/downstream project triggers

Harness CI supports webhook, artifact, manifest and schedule triggers. The two most commonly used triggers are webhook triggers based on Git events and scheduled triggers based on `cron` expressions. To learn more about creating a trigger, go to [Triggers](/docs/category/triggers).


<Tabs>
  <TabItem value="jenkins" label="Jenkins">


```groovy
pipeline {
    agent any
    
    triggers {
        cron('45 13 * * 2')
        pollSCM('H/5 * * * *')
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'echo "Building..."'
            }
        }
    }
}
```


</TabItem>
  <TabItem value="harness" label="Harness" default>



```yaml
trigger:
  name: scheduled build
  identifier: scheduled_build
  enabled: true
  orgIdentifier: default
  projectIdentifier: JenkinsCI
  pipelineIdentifier: Demo
  source:
    type: Scheduled
    spec:
      type: Cron
      spec:
        expression: 45 13 * * 2
  inputYaml: |
    pipeline:
      identifier: Demo
      properties:
        ci:
          codebase:
            build:
              type: branch
              spec:
                branch: main
```


</TabItem>
</Tabs>


## Comparison: Plugins and shared libraries

Jenkins uses plugins and shared libraries to extend functionality. Harness CI uses plugins to add functionality to pipelines.

In Jenkins, you can:
- Install plugins through the Jenkins Plugin Manager
- Use shared libraries for reusable pipeline code
- Use community-contributed plugins for various integrations

In Harness CI:
- You can [use plugins](../use-ci/use-drone-plugins/explore-ci-plugins.md) to include GitHub Actions, Bitrise Workflow Steps, Jira updates, and more
- Drone plugins are supported natively
- Custom plugins can be created using Docker containers

## Comparison: Agents and build infrastructure

In Jenkins, you define where jobs run using `agent` directives, which can specify:
- `any` - Run on any available agent
- `none` - No global agent; each stage must define its own
- `label` - Run on an agent with a specific label
- `docker` - Run inside a Docker container
- `kubernetes` - Run in a Kubernetes pod

In Harness CI, you configure the build infrastructure at the stage level using the `platform` and `runtime` settings. Harness supports several build infrastructure options:

- **Harness Cloud**: Harness-managed infrastructure
- **Kubernetes cluster**: Your own Kubernetes cluster
- **Local runner**: Docker runner on your own machine
- **Self-managed VMs**: AWS, GCP, or Azure VMs


<Tabs>
  <TabItem value="jenkins" label="Jenkins">


```groovy
pipeline {
    agent {
        kubernetes {
            yaml '''
                apiVersion: v1
                kind: Pod
                spec:
                  containers:
                  - name: maven
                    image: maven:3.8.1-jdk-11
                    command:
                    - cat
                    tty: true
            '''
        }
    }
    stages {
        stage('Build') {
            steps {
                container('maven') {
                    sh 'mvn clean install'
                }
            }
        }
    }
}
```


</TabItem>
  <TabItem value="harness" label="Harness" default>


```yaml
    - stage:
        name: Build
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
                  name: maven-build
                  identifier: maven_build
                  spec:
                    connectorRef: myDockerHubConnector
                    image: maven:3.8.1-jdk-11
                    shell: Bash
                    command: mvn clean install
```


</TabItem>
</Tabs>


## See also

Review the following information before proceeding with migration:

* [Harness CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components.md)
* [Caching in Harness CI](/docs/category/share-and-cache-ci-data)
* [Split tests in Run steps](/docs/continuous-integration/use-ci/run-tests/speed-up-ci-test-pipelines-using-parallelism)
* [Harness Platform documentation](/docs/platform)
