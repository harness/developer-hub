---
sidebar_position: 1
title: C# (.NET Core) application
description: Use a CI pipeline to build and test a C# (.NET Core) application.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/dotnet
---

```mdx-code-block
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<ctabanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/certifications/continuous-integration"
  closable={true}
  target="_self"
/>

You can build and test a [C#](https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/) and [.NET Core](https://learn.microsoft.com/en-us/dotnet/core/introduction) application using a Linux or Windows platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) or a [self-hosted Kubernetes cluster](/docs/category/set-up-kubernetes-cluster-build-infrastructures/) build infrastructure.

This guide assumes you've created a Harness CI pipeline. For more information about creating pipelines, go to:

* [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components)
* [Harness Cloud pipeline tutorial](/tutorials/ci-pipelines/fastest-ci)
* [Kubernetes cluster pipeline tutorial](/tutorials/ci-pipelines/build/kubernetes-build-farm)

<CISignupTip />

## Specify architecture

You can use a Linux or Windows platform to build and test C# (.NET Core) apps. These examples use Linux build infrastructure.

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

```yaml
 stages:
    - stage:
        name: build
        identifier: build
        type: CI
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64 ## Can be Amd64 or Arm64
          runtime:
            type: Cloud
            spec: {}
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

There are several self-hosted build infrastructure options. This example uses a [Kubernetes cluster build infrastructure](/docs/category/set-up-kubernetes-cluster-build-infrastructures).

```yaml
 stages:
    - stage:
        name: build
        identifier: build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Install dependencies

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

The .NET Core SDK and other .NET libraries are pre-installed on Harness Cloud runners. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications). You can use [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to install additional dependencies or run `dotnet restore`.

```yaml
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    shell: Sh
                    command: |-
                      dotnet add package Newtonsoft.json --version 12.0.1
```

```mdx-code-block
</TabItem>

<TabItem value="Self-hosted">
```

You can use [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to install dependencies or run commands such as `dotnet restore`.

```yaml
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:7.0
                    command: |-
                      dotnet add package Newtonsoft.json --version 12.0.1
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Cache dependencies

Add caching to your Build (`CI`) stage.

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

Cache your .NET dependencies with [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence). Add caching to your `stage.spec`:

```yaml
    - stage:
        spec:
          caching:
            enabled: true
            key: cache-{{ checksum "packages.lock.json" }}
            paths:
              - "~/.local/share/NuGet/cache"
          sharedPaths:
            - ~/.local/share/NuGet/cache
```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

With self-hosted build infrastructures, you can:

 * [Save and Restore Cache from S3](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/)
 * [Save and Restore Cache from GCS](/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs)

<details>
<summary>YAML example: Save and restore cache steps</summary>

Here's an example of a pipeline with **Save Cache to S3** and **Restore Cache from S3** steps.

```yaml
            steps:
              - step:
                  type: RestoreCacheS3
                  name: Restore Cache From S3
                  identifier: Restore_Cache_From_S3
                  spec:
                    connectorRef: YOUR_AWS_CONNECTOR_ID
                    region: us-east-1
                    bucket: YOUR_S3_BUCKET
                    key: cache-{{ checksum "packages.lock.json" }}
                    archiveFormat: Tar
              - step:
                  type: Run
                  ...
              - step:
                  type: BuildAndPushDockerRegistry
                  ...
              - step:
                  type: SaveCacheS3
                  name: Save Cache to S3
                  identifier: Save_Cache_to_S3
                  spec:
                    connectorRef: YOUR_AWS_CONNECTOR_ID
                    region: us-east-1
                    bucket: YOUR_S3_BUCKET
                    key: cache-{{ checksum "packages.lock.json" }}
                    sourcePaths:
                      - ~/.local/share/NuGet/cache
                    archiveFormat: Tar
```

</details>

```mdx-code-block
</TabItem>
</Tabs>
```

## Build and run tests

Add [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/) to build and run your tests.

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

```yaml
              - step:
                  type: Run
                  identifier: build_dotnet_app
                  name: Build DotNet App
                  spec:
                    shell: Sh
                    command: |-
                      dotnet restore
                      dotnet build --no-restore
                      dotnet test --no-build --verbosity normal
```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  identifier: build_dotnet_app
                  name: Build DotNet App
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:6.0
                    shell: Sh
                    command: |-
                      dotnet restore
                      dotnet build --no-restore
                      dotnet test --no-build --verbosity normal
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Visualize test results

You can [view test results](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/) on the **Tests** tab of your pipeline executions. Test results must be in JUnit XML format.

You can use a converter to output compatible JUnit XML reports, such as [NUnit to JUnit](https://github.com/nunit/nunit-transforms/tree/master/nunit3-junit) or [.NET trx2JUnit](https://github.com/gfoidl/trx2junit).

For your pipeline to produce test reports, you need to modify the **Run** step that runs your tests. Make sure the `command` generates JUnit XML reports and add the `reports` specification.

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

```yaml
              - step:
                  type: Run
                  identifier: install_converter
                  name: install converter
                  spec:
                    shell: Sh
                    command: |-
                      dotnet tool install -g trx2junit
                      export PATH="$:/root/.dotnet/tools"
              - step:
                  type: Run
                  identifier: build_dotnet_app
                  name: Build DotNet App
                  spec:
                    shell: Sh
                    command: |-
                      dotnet restore
                      dotnet build
                      dotnet test --no-build --verbosity normal
                      trx2junit results.trx
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - results.xml
```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  identifier: install_converter
                  name: install converter
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:6.0
                    shell: Sh
                    command: |-
                      dotnet tool install -g trx2junit
                      export PATH="$:/root/.dotnet/tools"
              - step:
                  type: Run
                  identifier: build_dotnet_app
                  name: Build DotNet App
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:6.0
                    shell: Sh
                    command: |-
                      dotnet restore
                      dotnet build
                      dotnet test --no-build --verbosity normal
                      trx2junit results.trx
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - results.xml
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Run tests with Test Intelligence

[Test Intelligence](docs/continuous-integration/use-ci/set-up-test-intelligence/) is available for C# (.NET Core), however, it is behind the feature flag `TI_DOTNET`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

With this feature flag enabled, you can use [Run Tests steps](/docs/continuous-integration/use-ci/set-up-test-intelligence/configure-run-tests-step-settings) to run unit tests with Test Intelligence.

```mdx-code-block
<Tabs>
  <TabItem value="Harness Cloud" default>
```

```yaml
              - step:
                  type: RunTests
                  identifier: runTestsWithIntelligence
                  name: runTestsWithIntelligence
                  spec:
                    language: Csharp
                    buildEnvironment: Core
                    frameworkVersion: "6.0"
                    buildTool: Dotnet
                    args: dotnet test --no-build --verbosity normal
                    namespaces: aw,fc
                    runOnlySelectedTests: true
                    preCommand: |-
                      dotnet tool install -g trx2junit
                      export PATH="$:/root/.dotnet/tools"
                      dotnet restore
                      dotnet build
                    postCommand: trx2junit results.trx
                    reports:
                        type: JUnit
                        spec:
                          paths:
                            - results.xml
```

```mdx-code-block
  </TabItem>
  <TabItem value="Self-Hosted">
```

```yaml
              - step:
                  type: RunTests
                  identifier: runTestsWithIntelligence
                  name: runTestsWithIntelligence
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:6.0
                    language: Csharp
                    buildEnvironment: Core
                    frameworkVersion: "6.0"
                    buildTool: Dotnet
                    args: dotnet test --no-build --verbosity normal
                    namespaces: aw,fc
                    runOnlySelectedTests: true
                    preCommand: |-
                      dotnet tool install -g trx2junit
                      export PATH="$:/root/.dotnet/tools"
                      dotnet restore
                      dotnet build
                    postCommand: trx2junit results.trx
                    reports:
                        type: JUnit
                        spec:
                          paths:
                            - results.xml
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Specify version

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

The .NET SDK is pre-installed on Hosted Cloud runners. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

If you need a specific .NET Core SDK version that isn't already installed, you can use a **Run** step to install it, or you can use the [setup-dotnet](https://github.com/actions/setup-dotnet) action in a [GitHub Action plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step/).

<details>
<summary>Install one .NET SDK version</summary>

```yaml
              - step:
                  type: Action
                  name: Install dotnet
                  identifier: install_dotnet
                  spec:
                    uses: actions/setup-dotnet@v3
                    with:
                      dotnet-version: '3.1.x'
```

</details>

<details>
<summary>Install multiple .NET SDK versions</summary>

1. Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
        strategy:
          matrix:
            dotnetVersion:
              - 7.0.x
              - 5.0.x
```

2. Reference the matrix variable in your steps.

```yaml
              - step:
                  type: Action
                  name: Install dotnet
                  identifier: install_dotnet
                  spec:
                    uses: actions/setup-dotnet@v3
                    with:
                      dotnet-version: <+matrix.dotnetVersion>
```

</details>

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

Specify the desired [.NET SDK image](https://hub.docker.com/_/python) tag in your steps. There is no need for a separate install step when using Docker.

<details>
<summary>Use one .NET SDK version</summary>

```yaml
              - step:
                  type: Run
                  name: dotnet version
                  identifier: dotnet_version
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:7.0
                    shell: Sh
                    command: |-
                      dontet --info
```

</details>

<details>
<summary>Use multiple .NET SDK versions</summary>

1. Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
    - stage:
        strategy:
          matrix:
            dotnetVersion:
              - 7.0
              - 6.0
```

2. Reference the matrix variable in the `image` field of your steps.

```yaml
              - step:
                  type: Run
                  name: dotnet Version
                  identifier: dotnet_version
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:<+stage.matrix.dotnetVersion>
                    shell: Sh
                    command: |-
                      dotnet --info
```

</details>

```mdx-code-block
</TabItem>
</Tabs>
```

## Full pipeline examples

The following full pipeline examples are based on the partial examples above.

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

If you copy this example, replace the placeholder values with appropriate values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors) and repository name. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

<details>
<summary>YAML example</summary>

```yaml
pipeline:
  name: default
  identifier: default
  projectIdentifier: default
  orgIdentifier: default
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
  tags: {}
  stages:
    - stage:
        name: build
        identifier: build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          caching:
            enabled: true
            key: cache-{{ checksum "packages.lock.json" }}
            paths:
              - "~/.local/share/NuGet/cache"
          execution:
            steps:
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    shell: Sh
                    command: |-
                      dotnet add package Newtonsoft.json --version 12.0.1
              - step:
                  type: Run
                  identifier: install_converter
                  name: install converter
                  spec:
                    shell: Sh
                    command: |-
                      dotnet tool install -g trx2junit
                      export PATH="$:/root/.dotnet/tools"
              - step:
                  type: Run
                  identifier: build_dotnet_app
                  name: Build DotNet App
                  spec:
                    shell: Sh
                    command: |-
                      dotnet restore
                      dotnet build
                      dotnet test --no-build --verbosity normal
                      trx2junit results.trx
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - results.xml
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          sharedPaths:
            - ~/.local/share/NuGet/cache
```

</details>

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

If you copy this example, replace the placeholder values with appropriate values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors), [Kubernetes cluster connector](/docs/platform/Connectors/Cloud-providers/add-a-kubernetes-cluster-connector), Kubernetes namespace, and repository name. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

<details>
<summary>YAML example</summary>

```yaml
pipeline:
  name: default
  identifier: default
  projectIdentifier: default
  orgIdentifier: default
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
  tags: {}
  stages:
    - stage:
        name: build
        identifier: build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          execution:
            steps:
              - step:
                  type: RestoreCacheS3
                  name: Restore Cache From S3
                  identifier: Restore_Cache_From_S3
                  spec:
                    connectorRef: YOUR_AWS_CONNECTOR_ID
                    region: us-east-1
                    bucket: YOUR_S3_BUCKET
                    key: cache-{{ checksum "packages.lock.json" }}
                    archiveFormat: Tar
              - step:
                  type: Run
                  name: dotnet version
                  identifier: dotnet_version
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:7.0
                    shell: Sh
                    command: |-
                      dontet --info
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:7.0
                    command: |-
                      dotnet add package Newtonsoft.json -- version 12.0.1
              - step:
                  type: Run
                  identifier: install_converter
                  name: install converter
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:7.0
                    shell: Sh
                    command: |-
                      dotnet tool install -g trx2junit
                      export PATH="$:/root/.dotnet/tools"
              - step:
                  type: Run
                  identifier: build_dotnet_app
                  name: Build DotNet App
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:7.0
                    shell: Sh
                    command: |-
                      dotnet restore
                      dotnet build
                      dotnet test --no-build --verbosity normal
                      trx2junit results.trx
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - results.xml
              - step:
                  type: SaveCacheS3
                  name: Save Cache to S3
                  identifier: Save_Cache_to_S3
                  spec:
                    connectorRef: YOUR_AWS_CONNECTOR_ID
                    region: us-east-1
                    bucket: YOUR_S3_BUCKET
                    key: cache-{{ checksum "packages.lock.json" }}
                    sourcePaths:
                      - ~/.local/share/NuGet/cache
                    archiveFormat: Tar
```

</details>

```mdx-code-block
</TabItem>
</Tabs>
```

## Next steps

Now that you have created a pipeline that builds and tests a C# (.NET Core) app, you could:

* Create [triggers](/docs/category/triggers) to automatically run your pipeline.
* Add steps to [build and upload artifacts](/docs/category/build-and-upload-artifacts).
* Add a step to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings/).
