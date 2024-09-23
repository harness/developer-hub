---
sidebar_position: 1
description: Create a Pipeline for a Gradle codebase.
---

# Gradle

This guide covers configuring continuous integration pipelines for Gradle projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `gradle assemble` and `gradle check` commands. These commands are executed inside a Docker container, downloaded at runtime from DockerHub.

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
          container: gradle:jdk10
          script: |-
            gradle assemble
            gradle check
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official gradle [images](https://hub.docker.com/r/_/gradle/), or your can bring your own.

