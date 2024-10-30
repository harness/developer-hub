---
title: pipeline
sidebar_position: 1
---

# Pipeline

Pipeline defines the pipeline execution.

## Properties
<!-- properties / start -->
* __stages__ - _Stage_<br/>
  Stages defines a list of pipeline stages.

* __inputs__ - _map[string]Input_<br/>
  Inputs defines the pipeline input parameters.

* __options__ - _Default_<br/>
  Options defines global configuration options.

<!-- properties / end -->

## Examples

Example pipeline.

```yaml {} showLineNumbers
version: 1
kind: pipeline
spec:
  stages:
  - name: build
    type: ci
    spec:
      steps:
      - name: compile
        type: run
        spec:
          container: golang
          script: |-
            go build
            go test
```

Example pipeline with inputs.

```yaml {} showLineNumbers
version: 1
kind: pipeline
spec:
  inputs:
    version:
      description: golang version
      default: 1.20

  stages:
  - name: build
    type: ci
    spec:
      steps:
      - name: compile
        type: run
        spec:
          container: golang:${{ inputs.version }}
          script: |-
            go build
            go test
```

