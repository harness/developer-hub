---
sidebar_position: 3
---

# Variables

Variables can be set at [pipeline](#pipeline), [stage](#stage) and [step](#step) levels.

:::note

The order of precedence for environment variables with the same name is step > stage > pipeline.

:::

## Pipeline

[Pipeline](../reference/pipelines/yaml/pipeline.options.md) environment variables are available to all run steps in your pipeline.

```yaml {4-6} showLineNumbers
kind: pipeline
spec:
  options:
    envs:
      GOOS: linux
      GOARCH: amd64
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

## Stage

[Stage](../reference/pipelines/yaml/stage.type.ci.md) environment variables are available to all run steps in the stage.

```yaml {6-8} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      envs:
        GOOS: linux
        GOARCH: amd64
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

## Step

[Run step](../reference/pipelines/yaml/step-run.md) environment variables are only available to the step.

```yaml {11-13} showLineNumbers
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
          envs:
            GOOS: linux
            GOARCH: amd64
          script: |
            go build
            go test
```

[Background steps](../reference/pipelines/yaml/step-background.md) also support environment variables.

```yaml {11-13} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: database
        type: background
        spec:
          container: mariadb
          envs:
            MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
            MYSQL_DATABASE: test

      - name: test
        type: run
        spec:
          container: mariadb
          script: |-
            sleep 15
            mariadb -u root -h database --execute="SELECT VERSION();"
```