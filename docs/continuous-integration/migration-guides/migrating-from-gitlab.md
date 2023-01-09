---
title: Migrating from GitLab CI to Harness CI
description: Learn how to migrate your existing GitLab workflows to Harness CI.
sidebar_position: 4
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
---
## Introduction

Harness CI and GitLab CI both allow you to create workflows that automatically build, test, publish, release, and deploy code. GitLab CI and Harness CI share some similarities in workflow configuration:

- Workflow configuration files are written in YAML and are stored in the code's repository.
- Workflows include one or more stages.
- Stages include one or more jobs / steps or individual commands.

There are a few differences, and this guide will show you the important differences so that you can quickly migrate your existing Gitlab workflows to Harness CI.
For more information, see [Harness CI Concepts](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/ci-concepts).

## Key differences

- Gitlab configurations are stored in the .gitlab-ci.yml file in the root directory of your repository while Harness provides inline pipeline storage or importing [pipeline YAML (Pipeline-as-Code)](https://docs.harness.io/article/q1nnyk7h4v-import-a-pipeline) from Git option.
- Harness CI provides proprietary technologies like Cache Intelligence and Test Intelligence™ enabling [four times faster](https://harness.io/blog/fastest-ci-tool) than other leading CI tools 
- Harness CI allows executing Github Actions plugins, Drone Plugins, and Bitrise Plugins using the [Plugin steps](https://docs.harness.io/category/ei5fgqxb0j-use-drone-plugins)
- **Testing and Verification:** GitLab CI comes with a set of test suites which apply to any language. Harness CI goes beyond that. Test Intelligence is one of Harness CI's most advanced features which dramatically reduces build times. It does so by running incremental builds which allows Harness to run relevant tests and bypass unnecessary tests.
- **Secrets Management:** GitLab does not offer native secrets management capabilities. They have selected Vault by HashiCorp as their first supported secrets management partner which means you must first configure your Vault server. Harness includes a built-in Secrets Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness applications.

### Harness Cache Intelligence

Harness Cache Intelligence is another proprietary technology that reduces pipeline execution time by automatically caching well-known directories for Java and Node.js support as of now with more languages support coming in the future. It manages and flushes the cache in the Harness user interface.

### Test Intelligence

Harness [Test Intelligence](https://developer.harness.io/docs/continuous-integration/ci-quickstarts/test-intelligence-concepts) is a proprietary technology that speeds up test cycles by running only the tests required to confirm the quality of the code changes that triggered a build. It then ranks them in the best possible order to increase the rate of fault detection. It’s easy to see the code changes and gaps in the test plan. Test Intelligence also identifies negative trends and provides actionable insights to improve quality. Once the appropriate tests are identified, Harness CI runs split tests and runs them concurrently. It’s possible to reduce build cycle times by up to 90 percent without compromising application quality. This functionality is not built into GitHub Actions.

## Define a stage that executes a single build step

In GitLab jobs are a fundamental element in the configuration file. Jobs in GitLab CI/CD are very similar to steps in Harness CI. In both systems it has the following characteristics: 

- Jobs in Gitlab contain a series of steps or scripts that run sequentially similar to the steps in Harness CI
- Jobs run in parallel by default in Gitlab, but can be configured to run sequentially.
- A Stage in Harness CI is a subset of the Pipeline that contains the logic to perform one major segment of the Pipeline process. 
- Stages are based on the different milestones of the Pipeline, such as building, approving etc

You can run a script or a shell command in a job. In GitLab CI/CD script steps are specified using the script key.

In Harness CI all scripts are specified using the command key for the steps inside the stage configuration.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="harness"
    values={[
        {label: 'GitLab CI', value: 'gitlab'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="gitlab">
```

```yaml
job1:
  variables:
    GIT_CHECKOUT: "true"
  script:
    - echo "Run your script here"
```

```mdx-code-block
</TabItem>
<TabItem value="harness">
```

```yaml
   - stage:
       name: stagedemo
       identifier: stagedemo
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
                 name: build and test
                 identifier: build_and_test
                 spec:
                   shell: Sh
                   command: echo "Run your script here"
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Docker image definition

Gitlab CI defines images at the job level and allows or supports setting this to be used by all jobs globally that don’t have a docker image defined.
In Harness CI you add a docker image by connecting to your repository using an Harness Docker Connector. You can configure different types of artifact source connectors in Harness. 

For more information go to the documentation [here](https://developer.harness.io/docs/platform/Connectors/connect-to-harness-container-image-registry-using-docker-connector). 

<Tabs
    defaultValue="harness"
    values={[
        {label: 'GitLab CI', value: 'gitlab'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="gitlab">

```yaml
job1:
  image: ruby:2.6
```

```mdx-code-block
</TabItem>
<TabItem value="harness">
```

```yaml
 - stage:
  name: stage1 
  identifier: stage1
  type: CI
  spec:
    cloneCodebase: true # Connector clones the repository 
    execution:
      steps:
        - step:
            type: Run
            name: step1
            identifier: step1
            spec:
              connectorRef: Dhruba-Connector
              image: node:17.2.0 #the primary container, where your job's commands are run
              shell: Bash
              command: echo "successful" # run the `echo` command
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Define a multi-stage test & build pipeline

Gitlab CI defines images at the job level and allows or supports setting this to be used by all jobs globally that don’t have a docker image defined.
In Harness CI Stages are executed in order of occurrence in the YAML config. Stages defined under the “- parallel” tag execute in a parallel fashion.

<Tabs
    defaultValue="harness"
    values={[
        {label: 'GitLab CI', value: 'gitlab'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="gitlab">

```yaml
image: golang:latest

stages:
  - test
  - build
  - deploy

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
<TabItem value="harness">
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
## Environment Variables
 
Environment Variables defines in Gitlab can used to:
- Control the behavior of jobs and pipelines.
- Store values you want to reuse.
- Avoid hard-coding values in your `.gitlab-ci.yml` file.

You can use predefined env variables or define custom:
- Variables in the `.gitlab-ci.yml` file.
- Project CI/CD variables.
- Group CI/CD variables.
- Instance CI/CD variables.

Harness CI supports users to add Variables on Project, Organization, and Account levels and allows them to be referenced using the following expression: `<+variable.[scope].[variable_id]>`
- Account-level reference: <+variable.account.[var Id]>
- Org-level reference: <+variable.org.[var Id]>
- Project-level reference: <+variable.[var Id]>

Find more information on Account, project, and Org level Variables [here](https://docs.harness.io/article/f3450ye0ul-add-a-variable)



<Tabs
    defaultValue="harness"
    values={[
        {label: 'GitLab CI', value: 'gitlab'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="gitlab">

```yaml
test_variable:
  stage: test
  script:
    - echo "$CI_JOB_STAGE" #Pre-defined Env Variable


# Definition of variables in .gitlab-ci.yml file

variables:
  SA_PASSWORD: $SA_PASSWORD
```

```mdx-code-block
</TabItem>
<TabItem value="harness">
```

```yaml
- stage:
        name: Stage Variable
        identifier: Stagevariable
        spec:
          execution:
            steps:
              - step:
                  type: Run
                  name: test-variable
                  identifier: test_variable
                  spec:
                    command: echo "environment variable: " <+variable.env_var>
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Matrix

Parallel matrix jobs in Harness CI allows you to create jobs at runtime based on specified variables. Here to run multiple instances of a job with different variables values for each instance can be accomplished with a combination of `parallel:` and `matrix:`

Matrix in Harness CI is one of the two looping executing strategies provided by Harness. Matrix gives the ability to execute the same set of tasks multiple times for a bunch of different configurations. This is achieved by mentioning user-defined tags and referencing them in the pipeline using the following expression:

`<+matrix.usertag>`

To learn more about Matrix check out the [documentation here](https://docs.harness.io/article/eh4azj73m4#matrix)

<Tabs
    defaultValue="harness"
    values={[
        {label: 'GitLab CI', value: 'gitlab'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="gitlab">

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

## Triggers

Gitlab CI Trigger: Through API 

Webhooks are a convenient way to trigger CI/CD on demand by sending an HTTP post request to specialized URLs. This is particularly useful for event-based triggering, in which a webhook can be called whenever a specified event occurs.

Harness CI Harness supports Webhooks triggers, Artifacts triggers, Manifest triggers, and scheduled triggers. The two most commonly used triggers are webhook triggers based on Git events and Scheduled Triggers based on corn expression. 

To know more about creating a trigger visit [Harness Triggers](https://developer.harness.io/docs/category/triggers)

<Tabs
    defaultValue="harness"
    values={[
        {label: 'GitLab CI', value: 'gitlab'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="gitlab">

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
<TabItem value="harness">
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

## Complete example

<Tabs
    defaultValue="harness"
    values={[
        {label: 'GitLab CI', value: 'gitlab'},
        {label: 'Harness CI', value: 'harness'},
    ]}>
<TabItem value="gitlab">

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
<TabItem value="harness">
```

```yaml
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
                    connectorRef: DhrubajyotiDocker
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
                    connectorRef: DhrubajyotiDocker
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
        connectorRef: dhrubaaccountconnector
        repoName: go-pipeline-sample
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
