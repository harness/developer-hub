---
sidebar_position: 1
description: Create a Pipeline for a Groovy codebase.
---

# Groovy

This guide covers configuring continuous integration pipelines for Groovy projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `./gradlew assemble` and `./gradlew check` commands. These commands are executed inside a Docker container, downloaded at runtime from DockerHub.

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
          container: gradle:2.5-jdk8
          script: |-
            ./gradlew assemble
            ./gradlew check
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official groovy [images](https://hub.docker.com/r/_/groovy/), or your can bring your own.