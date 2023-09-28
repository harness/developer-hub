---
sidebar_position: 9
title: Microsoft Windows application
description: Use a CI pipeline to build and test a Microsoft Windows application.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/windows
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

You can build and test a [Microsoft Windows](https://learn.microsoft.com/en-us/windows/apps/get-started/?tabs=net-maui%2Ccpp-win32) application using a Windows platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) or a [self-hosted Kubernetes cluster](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/run-windows-builds-in-a-kubernetes-build-infrastructure) build infrastructure.

This guide assumes you've created a Harness CI pipeline. For more information about creating pipelines, go to the [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components) and the [Harness Cloud pipeline tutorial](/tutorials/ci-pipelines/fastest-ci).

<CISignupTip />

## Specify architecture

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
            os: Windows
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

There are several self-hosted build infrastructure options. This example uses a Kubernetes cluster build infrastructure. For instructions and important information, go to [Run Windows builds in a Kubernetes cluster build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/run-windows-builds-in-a-kubernetes-build-infrastructure).

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
              connectorRef: YOUR_K8S_CLUSTER_CONNECTOR_ID
              namespace: YOUR_K8S_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector:
                kubernetes.io/os: windows
              os: Windows
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

Harness Cloud runners include pre-installed libraries and tools, and you can use [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to install additional dependencies or additional versions. For details about pre-installed tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

```yaml
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    shell: Powershell
                    command: |-
                      dotnet add package Newtonsoft.json --version 12.0.1
```

```mdx-code-block
</TabItem>

<TabItem value="Self-hosted">
```

You can use [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to install dependencies.

```yaml
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:7.0
                    shell: Powershell
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

Cache your Windows app dependencies with [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence). Add caching to your `stage.spec` and specify the `paths` to cache:

```yaml
    - stage:
        spec:
          caching:
            enabled: true
            key: cache-{{ checksum "packages.lock.json" }}
            paths:
              - C:\%LocalAppData%\NuGet\Cache
          sharedPaths:
            - C:\%LocalAppData%\NuGet\Cache
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
                      - C:\%LocalAppData%\NuGet\Cache
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
                    shell: Powershell
                    command: |-
                      dotnet restore
                      dotnet build --no-restore
                      dotnet test C:\path\to\project.tests.csproj --no-build --verbosity normal
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
                    shell: Powershell
                    command: |-
                      dotnet restore
                      dotnet build --no-restore
                      dotnet test C:\path\to\project.tests.csproj --no-build --verbosity normal
```

```mdx-code-block
</TabItem>
</Tabs>
```

:::tip Test Intelligence

For some languages, you can leverage Harness' [Test Intelligence](/docs/continuous-integration/use-ci/set-up-test-intelligence/) feature to reduce unit test time.

:::

### Visualize test results

You can [view test results](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/) on the **Tests** tab of your pipeline executions. Test results must be in JUnit XML format.

For your pipeline to produce test reports, you need to modify the **Run** step that runs your tests. Make sure the `command` generates JUnit XML reports and add the `reports` specification.

If your test tool doesn't produce JUnit XML formatted reports by default, you can use a converter to output compatible JUnit XML reports, such as [NUnit to JUnit](https://github.com/nunit/nunit-transforms/tree/master/nunit3-junit) or [.NET trx2JUnit](https://github.com/gfoidl/trx2junit).

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
                    shell: Powershell
                    command: |-
                      dotnet tool install -g trx2junit
                      export PATH="C:\Users\USER\.dotnet\tools"
              - step:
                  type: Run
                  identifier: build_dotnet_app
                  name: Build DotNet App
                  spec:
                    shell: Powershell
                    command: |-
                      dotnet restore
                      dotnet build
                      dotnet test C:\path\to\project.tests.csproj --no-build --verbosity normal
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
                    shell: Powershell
                    command: |-
                      dotnet tool install -g trx2junit
                      export PATH="C:\Users\USER\.dotnet\tools"
              - step:
                  type: Run
                  identifier: build_dotnet_app
                  name: Build DotNet App
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:6.0
                    shell: Powershell
                    command: |-
                      dotnet restore
                      dotnet build
                      dotnet test C:\path\to\project.tests.csproj --no-build --verbosity normal
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

## Install Visual Studio

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

Visual Studio 2019 Enterprise is pre-installed on Hosted Cloud runners. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

You can use a **Run** step to install a different version or edition of Visual Studio.

```yaml
              - step:
                  type: Run
                  identifier: install_vs2022
                  name: install vs2022
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/windows/servercore:ltsc2019
                    shell: Powershell
                    command: |-
                      winget install --id Microsoft.VisualStudio.2022.Enterprise
```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

If not already included on your build machine, you can specify a container image that has the necessary binaries or use a **Run** step to install Visual Studio.

```yaml
              - step:
                  type: Run
                  identifier: install_vs2022
                  name: install vs2022
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/windows/servercore:ltsc2019
                    shell: Powershell
                    command: |-
                      winget install --id Microsoft.VisualStudio.2019.Enterprise
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Specify shell

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

In steps that allow you to supply your own commands, such as [**Run** steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings#shell-and-command) and [**Background** steps](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#shell-entry-point-and-command), you specify the `shell` in the step's settings.

```yaml
              - step:
                  type: Run
                  identifier: dotnet restore
                  name: dotnet restore
                  spec:
                    shell: Powershell ## Set to Bash, Powershell, Pwsh (PowerShell Core), Python, or Sh.
                    command: |- ## Enter your script as you would in a command line shell.
                      dotnet restore
```

Several shell binaries are pre-installed on Hosted Cloud runners, including Bash and PowerShell. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

You can also use **Run** steps to install different shell tools into the build environment, or specify a container image that has the necessary binaries for the command you want to run.

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

In steps that allow you to supply your own commands, such as [**Run** steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings#shell-and-command) and [**Background** steps](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#shell-entry-point-and-command), you specify the `shell` in the step's settings.

```yaml
              - step:
                  type: Run
                  identifier: build_dotnet_app
                  name: Build DotNet App
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:6.0
                    shell: Powershell ## Set to Bash, Powershell, Pwsh (PowerShell Core), Python, or Sh.
                    command: |- ## Enter your script as you would in a command line shell.
                      dotnet restore
```

You can also use **Run** steps to install different shell tools into the build environment, or specify a container image that has the necessary binaries for the command you want to run.

```mdx-code-block
</TabItem>
</Tabs>
```

## Setup .NET SDK

For details about building and testing .NET with Harness CI, including how to setup different versions of the .NET SDK, go to the [C# (.NET Core) guide](/tutorials/ci-pipelines/build/dotnet).

## Full pipeline examples

The following full pipeline examples are based on the partial examples above.

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

If you copy this example, replace the placeholder values with appropriate values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors) and repository name. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

```yaml
pipeline:
  name: default
  identifier: default
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
  stages:
    - stage:
        name: build and test
        identifier: build_and_test
        type: CI
        spec:
          cloneCodebase: true
          caching:
            enabled: true
            key: cache-{{ checksum "packages.lock.json" }}
            paths:
              - C:\%LocalAppData%\NuGet\Cache
          execution:
            steps:
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    shell: Powershell
                    command: |-
                      dotnet add package Newtonsoft.json --version 12.0.1
              - step:
                  type: Run
                  identifier: install_converter
                  name: install converter
                  spec:
                    shell: Powershell
                    command: |-
                      dotnet tool install -g trx2junit
                      export PATH="C:\Users\USER\.dotnet\tools"
              - step:
                  type: Run
                  identifier: build_dotnet_app
                  name: Build DotNet App
                  spec:
                    shell: Powershell
                    command: |-
                      dotnet restore
                      dotnet build
                      dotnet test C:\path\to\project.tests.csproj --no-build --verbosity normal
                      trx2junit results.trx
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - results.xml
          sharedPaths:
            - C:\%LocalAppData%\NuGet\Cache
          platform:
            os: Windows
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

If you copy this example, replace the placeholder values with appropriate values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors), [Kubernetes cluster connector](/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector), Kubernetes namespace, and repository name. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

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
        name: build and test
        identifier: build_and_test
        type: CI
        spec:
          cloneCodebase: true
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
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:7.0
                    shell: Powershell
                    command: |-
                      dotnet add package Newtonsoft.json --version 12.0.1
              - step:
                  type: Run
                  identifier: install_converter
                  name: install converter
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:6.0
                    shell: Powershell
                    command: |-
                      dotnet tool install -g trx2junit
                      export PATH="C:\Users\USER\.dotnet\tools"
              - step:
                  type: Run
                  identifier: build_dotnet_app
                  name: Build DotNet App
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:6.0
                    shell: Powershell
                    command: |-
                      dotnet restore
                      dotnet build
                      dotnet test C:\path\to\project.tests.csproj --no-build --verbosity normal
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
                      - C:\%LocalAppData%\NuGet\Cache
                    archiveFormat: Tar
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_K8S_CLUSTER_CONNECTOR_ID
              namespace: YOUR_K8S_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector:
                kubernetes.io/os: windows
              os: Windows
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Next steps

Now that you have created a pipeline that builds and tests a Windows app, you could:

* Create [triggers](/docs/category/triggers) to automatically run your pipeline.
* Add steps to [build and upload artifacts](/docs/category/build-and-upload-artifacts).
* Add a step to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings/).
