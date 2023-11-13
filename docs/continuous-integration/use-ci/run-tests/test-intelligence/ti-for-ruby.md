---
title: Enable TI for Ruby
description: Set up TI for Ruby codebases.
sidebar_position: 50
---


## View test reports and test selection

For information about test reports for Test Intelligence, go to [View tests](../viewing-tests.md).

## Troubleshooting TI for Ruby

Test Intelligence results can be inaccurate for Ruby repos using dynamically generated code or Rails apps using [Spring](https://github.com/rails/spring).



## Pipeline YAML examples

```mdx-code-block
<Tabs>
  <TabItem value="cloud" label="Harness Cloud" default>
```

This example shows a pipeline that uses Harness Cloud build infrastructure and runs tests on Ruby with RSpec and Test Intelligence.

```yaml
pipeline:
  projectIdentifier: default
  orgIdentifier: default
  identifier: testintelligencedemo
  name: Test Intelligence Demo
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
        repoName: YOUR_CODE_REPO_NAME
        build: <+input>
  tags: {}
  stages:
    - stage:
        name: Ruby Tests
        identifier: rubytests
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run Ruby Tests
                  name: Run_Ruby_Tests
                  identifier: Run_Ruby_Tests
                  spec:
                    language: Ruby
                    buildTool: Rspec
                    args: "--format RspecJunitFormatter --out tmp/junit.xml" ## Optional.
                    runOnlySelectedTests: true ## Set to false if you don't want to use TI.
                    preCommand: bundle install
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - tmp/junit.xml
          platform:
            arch: Amd64
            os: Linux
          runtime:
            spec: {}
            type: Cloud
```

```mdx-code-block
  </TabItem>
  <TabItem value="sh" label="Self-hosted">
```

This example shows a pipeline that uses a Kubernetes cluster build infrastructure and runs tests on Ruby with RSpec and Test Intelligence.

```yaml
pipeline:
  projectIdentifier: default
  orgIdentifier: default
  identifier: testintelligencedemo
  name: Test Intelligence Demo
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
        repoName: YOUR_CODE_REPO_NAME
        build: <+input>
  tags: {}
  stages:
    - stage:
        name: Ruby tests
        identifier: rubytests
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run Ruby Tests
                  name: Run_Ruby_Tests
                  identifier: Run_Ruby_Tests
                  spec:
                    connectorRef: account.harnessImage ## Specify if required by your build infrastructure.
                    image: ruby:latest ## Specify if required by your build infrastructure.
                    language: Ruby
                    buildTool: Rspec
                    args: "--format RspecJunitFormatter --out tmp/junit.xml" ## Optional.
                    runOnlySelectedTests: true ## Set to false if you don't want to use TI.
                    preCommand: bundle install
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - tmp/junit.xml
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_KUBERNETES_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
```

```mdx-code-block
  </TabItem>
</Tabs>
```