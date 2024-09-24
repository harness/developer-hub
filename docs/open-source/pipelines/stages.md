---
sidebar_position: 3
---

# Stages

A stage contains one or more [steps](/category/steps). 

## Single

This pipeline has one stage named `test`.

```yaml {4} showLineNumbers
kind: pipeline
spec:
  stages:
  - name: test
    type: ci
    spec:
      steps:
      - name: rake
        type: run
        spec:
          container: ruby
          script: |-
            bundle install --jobs=3 --retry=3
            rake
```

## Multiple

Piplines can contain multiple stages. The overall build status is determined by the successful completion of all stages.

:::note

Stages do not share state. It is not possible for two stages to access the same underlying file system or generated files.

:::

This pipeline has two stages named `backend` and `frontend`.

```yaml {4,16} showLineNumbers
kind: pipeline
spec:
  stages:
  - name: backend
    type: ci
    spec:
      steps:
      - name: go
        type: run
        spec:
          container: golang
          script: |-
            go build
            go test

  - name: frontend
    type: ci
    spec:
      steps:
      - name: node
        type: run
        spec:
          container: node
          script: |-
            npm install
            npm test
```