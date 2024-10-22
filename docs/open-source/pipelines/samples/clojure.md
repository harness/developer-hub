---
sidebar_position: 1
description: Create a Pipeline for a Clojure codebase.
---

# Clojure

This guide covers configuring continuous integration pipelines for Clojure projects.

## Build and Test

In the below example we demonstrate a pipeline that executes the `lein test` command. These commands are executed inside the clojure Docker container, downloaded at runtime from DockerHub.

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
          container: clojure
          script: lein test
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official Clojure [images](https://hub.docker.com/r/_/clojure/), or your can bring your own.