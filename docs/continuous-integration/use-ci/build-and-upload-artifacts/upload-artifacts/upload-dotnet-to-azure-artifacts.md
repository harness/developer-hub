---
title: Build, Push, and Deploy .NET Packages
description: Add steps to build, push, and deploy .NET packages using Harness CI pipelines.
sidebar_position: 13
helpdocs_is_private: false
helpdocs_is_published: true
---

Use the **Build, Push, and Deploy .NET Packages** steps in your CI pipelines to build, push, and deploy .NET packages to Azure Artifacts. 

To configure these steps, you need access to an Azure DevOps account with the necessary permissions to add sources and push packages to the feed.

## Prepare to build and push .NET packages

- **Obtain Azure DevOps personal access token with repo permissions.** - To configure, you need access to an Azure DevOps account with the necessary permissions to push packages to the feed. For steps, go to the Azure DevOps documentation on creating a [personal access token](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows).

## Add the Build, Push, and Deploy steps

- Log into [Harness](https://app.harness.io).
- Select your CI Project, and then click on `Pipelines`.
- Click `+ Create a Pipeline` and give it a name.
- Add the **Build and Package .NET**, **Push .NET Package**, and **Download .NET Package** be referring the below steps to your pipeline's Build stage.
  - You can also swtich to YAML editor and copy paste the below yaml to your Pipeline.
- `Run Steps` in the pipeline uses `mcr.microsoft.com/dotnet/sdk:8.0` image, ensuring build environment has the .NET SDK 8.0 binaries. You can specify the required .NET SDK version available in [docker-dotnet](https://hub.docker.com/r/microsoft/dotnet-sdk).
- Finally, create a secret with identifier `Azure_DevOps_PAT` to store the obtained Azure DevOps Pat. If you already created a secret, update `NUGET_PAT="<+secrets.getValue("Azure_DevOps_PAT")>"` line in the pipeline with the secret identifier.

```yaml
identifier: BuildPushDeploy_NET_Packages
name: BuildPushDeploy .NET Packages
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

> **Example Pipeline Notice:** This is an example pipeline, and the `dotnet new console` command is used here to create a `.csproj` file. In a production scenario, you may already have the `.csproj` file present, so this step may not be necessary.

The Build, Push, and Deploy .NET Packages steps have the following settings. Depending on the build infrastructure, some settings might be unavailable or optional.

When you run the pipeline, you can observe the step logs on the [build details page](../../viewing-builds.md).

If the steps succeed, you can find the package in your Azure Artifacts feed.
