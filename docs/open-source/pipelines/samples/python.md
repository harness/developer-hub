---
sidebar_position: 1
description: Create a Pipeline for a Python codebase.
---

# Python

This guide covers configuring continuous integration pipelines for Python projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `pip install` and `pytest` commands. These commands are executed inside a Docker container, downloaded at runtime from DockerHub.

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
          container: python
          script: |-
            pip install -r requirements.txt
            pytest
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official python [images](https://hub.docker.com/r/_/python/), or you can bring your own.

## Test Multiple Versions

You can configure multiple, containerized steps to test against multiple versions of Python.

```yaml {10,18,26} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test 2
        type: run
        spec:
          container: python:2
          script: |-
            pip install -r requirements.txt
            pytest

      - name: test 3.3
        type: run
        spec:
          container: python:3.3
          script: |-
            pip install -r requirements.txt
            pytest

      - name: test 3.4
        type: run
        spec:
          container: python:3.4
          script: |-
            pip install -r requirements.txt
            pytest
```