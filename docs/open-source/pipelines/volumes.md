---
sidebar_position: 3
---

# Volumes 

Pipeline steps can mount various [volumes](../reference/pipelines/yaml/volume.md) types into the running container. 

## Temporary Volumes

Temporary mounts are docker volumes that are created before the pipeline starts and destroyed when the pipeline completes. This can be used to share files or folders among pipeline steps.

```yaml {} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      volumes:
      - name: cache
        spec: {}
        type: temp
      steps:
      - name: test
        type: run
        spec:
          container: golang
          mount:
          - name: cache
            path: /go
          script: |-
            go install
            go test
      - name: build
        type: run
        spec:
          container: golang
          mount:
          - name: cache
            path: /go
          script: |-
            go build
```