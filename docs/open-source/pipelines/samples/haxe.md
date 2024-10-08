---
sidebar_position: 1
description: Create a Pipeline for a Haxe codebase.
---

# Haxe

This guide covers configuring continuous integration pipelines for Haxe projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `haxelib` and `haxe` commands. These commands are executed inside the haxe Docker container, downloaded at runtime from DockerHub.

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
          container: haxe
          script: |-
            haxelib install build.hxml
            haxe build.hxml
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official haxe [images](https://hub.docker.com/r/_/haxe/), or your can bring your own.

## Test Multiple Versions

You can configure multiple, containerized steps to test against multiple versions of Haxe.

```yaml {10,18} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test 4.0
        type: run
        spec:
          container: haxe:4.0
          script: |-
            haxelib install build.hxml
            haxe build.hxml

      - name: test 3.4
        type: run
        spec:
          container: haxe:3.4
          script: |-
            haxelib install build.hxml
            haxe build.hxml
```