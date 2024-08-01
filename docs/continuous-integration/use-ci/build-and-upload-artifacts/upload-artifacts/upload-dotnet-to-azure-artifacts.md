---
title: Build, Package and Push .NET packages
description: Add steps to build and package a .NET application and then push the package to Azure Artifacts using Harness CI pipelines.
sidebar_position: 13
helpdocs_is_private: false
helpdocs_is_published: true
---

## Overview

This article will guide you through the following steps:

1. Building and packaging .NET applications.
2. Pushing packages to Azure Artifacts.
3. Downloading and using packages from Azure Artifacts.

## Prerequisites

- **Obtain Azure DevOps personal access token (PAT) with repo permissions:** To configure, you need access to an Azure DevOps account with the necessary permissions to push packages to Azure Artifacts. For steps, refer to the documentation on creating an [Azure DevOps PAT](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows).

- **Store the Azure DevOps PAT as a Harness Secret**
Create a [Harness secret]((https://developer.harness.io/docs/platform/secrets/add-use-text-secrets)) to store the obtained Azure DevOps PAT. In the example below, a secret with the identifier `Azure_DevOps_PAT` is used. If you have already created a secret, update the `NUGET_PAT="<+secrets.getValue('Azure_DevOps_PAT')>"` line in the pipeline with the secret identifier.

## Add the Build, Package, and Push steps to your pipeline

In your pipeline's **Build** stage, add these **Run** steps to build, package, and push packages. Here is a YAML example:

:::note
The **Run** steps in this pipeline uses `mcr.microsoft.com/dotnet/sdk:8.0` image, ensuring build  environment has the .NET SDK 8.0 binaries. You can specify the required .NET SDK version available in [docker-dotnet](https://hub.docker.com/r/microsoft/dotnet-sdk).
:::

```yaml
identifier: BuildPackagePush_NET_Packages
name: Build Package and Push .NET Packages
pipeline:
  tags: {}
  stages:
    - stage:
        name: Build and Push .NET Package
        identifier: Pull_and_Push
        description: ""
        type: CI
        spec:
          cloneCodebase: false
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
                  name: Build and Package DOTNET
                  identifier: Build_and_Package_DOTNET
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:8.0
                    shell: Sh
                    command: |-
                      dotnet new console --framework net8.0 --use-program-main

                      dotnet build --configuration Release

                      dotnet pack -c Release --version-suffix <+pipeline.sequenceId>
              - step:
                  type: Run
                  name: Push DOTNET Package
                  identifier: Run_1
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:8.0
                    shell: Sh
                    command: |-
                      # Add Azure Artifacts Feed Nuget Source
                      NUGET_PAT="<+secrets.getValue("Azure_DevOps_PAT")>"
                      NUGET_SOURCE="https://pkgs.dev.azure.com/AZURE_ORGANIZATION/_packaging/AZURE_ARTIFACTS_FEED/nuget/v3/index.json"

                      dotnet nuget add source $NUGET_SOURCE -n azuresource -u user -p $NUGET_PAT --store-password-in-clear-text

                      # Push the .NET package
                      dotnet nuget push ./bin/Release/PACKAGE_NAME.1.0.0-<+pipeline.sequenceId>.nupkg --source azuresource --api-key AzureDevOps
              - step:
                  type: Run
                  name: Download DOTNET Package
                  identifier: Run_3
                  spec:
                    connectorRef: account.harnessImage
                    image: mcr.microsoft.com/dotnet/sdk:8.0
                    shell: Sh
                    command: |-
                      mkdir newproject && cd newproject
                      dotnet new console
                      # Download the .NET package
                      dotnet add package Harness -v 1.0.0-<+pipeline.sequenceId>
          caching:
            enabled: false
            paths: []
```

:::tip
This is a sample pipeline, and the `dotnet new console` command is used here to create a `.csproj` file. In a production scenario, you may already have the `.csproj` file present, so this step may not be necessary.
:::

When you run the pipeline, you can observe the step logs on the [build details page](../../viewing-builds.md).

If the steps succeed, you can find the package in your Azure Artifacts feed.
