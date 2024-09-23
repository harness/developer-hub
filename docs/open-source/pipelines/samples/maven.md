---
sidebar_position: 1
description: Create a Pipeline for a Maven project.
---

# Maven

This guide covers configuring continuous integration pipelines for Maven projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `mvn install` and `mvn test` commands. These commands are executed inside a Docker container, downloaded at runtime from DockerHub.

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
          container: maven:3-jdk-10
          script: |-
            mvn install -DskipTests=true -Dmaven.javadoc.skip=true -B -V
            mvn test -B
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official maven [images](https://hub.docker.com/r/_/maven/), or your can bring your own.