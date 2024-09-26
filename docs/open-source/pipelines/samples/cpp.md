---
sidebar_position: 1
description: Create a Pipeline for a C++ codebase.
---

# C++

This guide covers configuring continuous integration pipelines for C++ projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `make` and `make test` commands. These commands are executed inside the gcc Docker container, downloaded at runtime from DockerHub.

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
          container: gcc
          script: |-
            ./configure
            make
            make test
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official gcc [images](https://hub.docker.com/r/_/gcc/), or your can bring your own.