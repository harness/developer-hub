---
sidebar_position: 1
description: Create a Pipeline for a R codebase.
---

# R

This guide covers configuring continuous integration pipelines for R projects.

## Build and Test

In the below example we demonstrate a pipeline that executes `R` commands to install dependencies and compile code. These commands are executed inside the r-base Docker container, downloaded at runtime from DockerHub.

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
          container: r-base
          script: |-
            R -e 'install.packages(c("package1","package2"))'
            R CMD build .
```

Please note that you can use any Docker image in your pipeline from any Docker registry. You can use the official r-base [images](https://hub.docker.com/r/_/r-base/), or your can bring your own.