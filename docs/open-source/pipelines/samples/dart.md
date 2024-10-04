---
sidebar_position: 1
description: Create a Pipeline for a Dart codebase.
---

# Dart

This guide covers configuring continuous integration pipelines for Dart projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `pub get` and `pub run test` commands. These commands are executed inside the dart Docker container, downloaded at runtime from DockerHub.

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
          container: google/dart
          script: |-
            pub get
            pub run test
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official Dart [images](https://hub.docker.com/r/google/dart/), or your can bring your own.