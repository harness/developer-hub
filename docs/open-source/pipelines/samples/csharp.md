---
sidebar_position: 1
title: C#
description: Create a Pipeline for a C# codebase.
---

# C#

This guide covers configuring continuous integration pipelines for C# projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `dotnet publish` and `dotnet test` commands. These commands are executed inside a Docker container, downloaded at runtime from DockerHub.

```yaml {} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test
        type: run
        spec:
          container: mcr.microsoft.com/dotnet/sdk:6.0
          script: |-
            dotnet build
            dotnet test
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official [dotnet sdk](https://hub.docker.com/_/microsoft-dotnet-sdk/) or [aspnet](https://hub.docker.com/_/microsoft-dotnet-aspnet/) images, or your can bring your own.