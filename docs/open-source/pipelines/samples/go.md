---
sidebar_position: 1
description: Create a Pipeline for a Go codebase.
---

# Go

This guide covers configuring continuous integration pipelines for Go projects that use Go Modules.

## Build and Test

In the below example we demonstrate a pipeline that executes `go test` and `go build` commands. These commands are executed inside the golang Docker container, downloaded at runtime from DockerHub.

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
          container: golang
          script: |
            go build
            go test
```

## Test Multiple Versions

You can configure multiple, containerized steps to test against multiple versions of Go.

```yaml {10,18} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test 1.20
        type: run
        spec:
          container: golang:1.20
          script: |
            go build
            go test

      - name: test 1.21
        type: run
        spec:
          container: golang:1.21
          script: |
            go build
            go test
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official golang [images](https://hub.docker.com/r/_/golang/), or your can bring your own.
