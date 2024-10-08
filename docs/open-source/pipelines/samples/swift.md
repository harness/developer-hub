---
sidebar_position: 1
description: Create a Pipeline for a Swift codebase.
---

# Swift

This guide covers configuring continuous integration pipelines for Swift projects.

## Build and Test

In the below example we demonstrate a pipeline that executes the project unit tests with the `swift build` and `swift test` commands. These commands are executed inside a Docker container, downloaded at runtime from DockerHub.

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
          container: swift:4
          script: |-
            swift build
            swift test
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official swift [images](https://hub.docker.com/r/_/swift/), or your can bring your own.


## Test Multiple Versions

You can configure multiple, containerized steps to test against multiple versions of Swift.

```yaml {10,18} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test 3
        type: run
        spec:
          container: swift:3
          script: |-
            swift build
            swift test

      - name: test 4
        type: run
        spec:
          container: swift:4
          script: |-
            swift build
            swift test
```