---
title: Enable TI for C#
description: Set up TI for C# codebases with .NET Core or NUnit.
sidebar_position: 20
---


## View test reports and test selection

For information about test reports for Test Intelligence, go to [View tests](../viewing-tests.md).







## Pipeline YAML examples

```mdx-code-block
<Tabs>
  <TabItem value="cloud" label="Harness Cloud" default>
```

This example shows a pipeline that uses Harness Cloud build infrastructure and runs tests on C# with .NET Core and Test Intelligence.

```yaml
pipeline:
  name: Test Intelligence Demo
  identifier: testintelligencedemo
  projectIdentifier: default
  orgIdentifier: default
  properties:
    ci:
      codebase:
        build: <+input>
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
  stages:
    - stage:
        type: CI
        identifier: Build_and_Test
        name: Build and Test
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: RunTests
                  identifier: runTestsWithIntelligence
                  name: runTestsWithIntelligence
                  spec:
                    language: Csharp
                    buildEnvironment: Core
                    frameworkVersion: "6.0"
                    buildTool: Dotnet ## Specify Dotnet or Nunit.
                    args: --no-build --verbosity normal ## Equivalent to 'dotnet test --no-build --verbosity normal' in a Run step or shell.
                    namespaces: aw,fc
                    runOnlySelectedTests: true ## Set to false if you don't want to use TI.
                    preCommand: |-
                      dotnet tool install -g trx2junit
                      export PATH="$PATH:/root/.dotnet/tools"
                      dotnet restore
                      dotnet build
                    postCommand: trx2junit results.trx
                    reports:
                        type: JUnit
                        spec:
                          paths:
                            - results.xml
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

This example shows a pipeline that uses a Kubernetes cluster build infrastructure and runs tests on C# with .NET Core and Test Intelligence.

```yaml
pipeline:
  name: Test Intelligence Demo
  identifier: testintelligencedemo
  projectIdentifier: default
  orgIdentifier: default
  properties:
    ci:
      codebase:
        build: <+input>
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
  stages:
    - stage:
        type: CI
        identifier: Build_and_Test
        name: Build and Test
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: RunTests
                  identifier: runTestsWithIntelligence
                  name: runTestsWithIntelligence
                  spec:
                    connectorRef: account.harnessImage ## Specify if required by your build infrastructure.
                    image: mcr.microsoft.com/dotnet/sdk:6.0 ## Specify if required by your build infrastructure.
                    language: Csharp
                    buildEnvironment: Core
                    frameworkVersion: "6.0"
                    buildTool: Dotnet ## Specify Dotnet or Nunit.
                    args: --no-build --verbosity normal ## Equivalent to 'dotnet test --no-build --verbosity normal' in a Run step or shell.
                    namespaces: aw,fc
                    runOnlySelectedTests: true ## Set to false if you don't want to use TI.
                    preCommand: |-
                      dotnet tool install -g trx2junit
                      export PATH="$PATH:/root/.dotnet/tools"
                      dotnet restore
                      dotnet build
                    postCommand: trx2junit results.trx
                    reports:
                        type: JUnit
                        spec:
                          paths:
                            - results.xml
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