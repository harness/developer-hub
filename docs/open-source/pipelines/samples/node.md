---
sidebar_position: 1
description: Create a Pipeline for a Node codebase.
---

# Node

This guide covers configuring continuous integration pipelines for Node projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `npm install` and `npm test` commands. These commands are executed inside the node Docker container, downloaded at runtime from DockerHub.

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
          container: node
          script: |-
            npm install
            npm test
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official node [images](https://hub.docker.com/r/_/node/), or your can bring your own.

## Test Multiple Versions

You can configure multiple, containerized steps to test against multiple versions of Node.

```yaml {10,18} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test 6
        type: run
        spec:
          container: node:6
          script: |-
            npm install
            npm test

      - name: test 8
        type: run
        spec:
          container: node:8
          script: |-
            npm install
            npm test
```