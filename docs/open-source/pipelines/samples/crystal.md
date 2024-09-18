---
sidebar_position: 1
description: Create a Pipeline for a Crystal codebase.
---

# Crystal

This guide covers configuring continuous integration pipelines for Crystal projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `shards install` and `crystal spec` commands. These commands are executed inside the crystal Docker container, downloaded at runtime from DockerHub.

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
          container: crystallang/crystal
          script: |-
            shards install
            crystal spec
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official crystal [images](https://hub.docker.com/r/crystallang/crystal/), or your can bring your own.