---
sidebar_position: 1
description: Create a Pipeline for a D lang codebase.
---

# D

This guide covers configuring continuous integration pipelines for D projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `dub test` command to compile and test your code. These commands are executed inside a Docker container, downloaded at runtime from DockerHub.

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
          container: dlanguage/dmd
          script: dub test
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official dmd [images](https://hub.docker.com/r/dlanguage/dmd/), or your can bring your own.