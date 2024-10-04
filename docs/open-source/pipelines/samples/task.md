---
sidebar_position: 1
description: Use Task in pipelines.
---

# Task

This guide covers configuring continuous integration pipelines to use [Task](https://taskfile.dev/).

## Example Task file

Here is an example `Taskfile.yml`.

```yaml {} showLineNumbers title="Taskfile.yml"
version: '3'

tasks:

  first:
    cmds:
      - echo "this is the {{.TASK}} task"

  second:
    deps: [first]
    cmds:
      - echo "this is the {{.TASK}} task"

  third:
    cmds:
      - echo "this is the {{.TASK}} task"
```

:::info

The below examples assume this file is checked in to the root of your repository.

:::

## Pipeline with one step

You can [install](https://taskfile.dev/installation/) Task and run `task` commands in a step.

```yaml {} showLineNumbers
kind: pipeline
spec:
  stages:
    - name: task example
      type: ci
      spec:
        steps:
          - name: run tasks
            type: run
            spec:
              container: node:20
              script: |
                npm install -g @go-task/cli
                task second
                task third
```

## Pipeline with multiple steps

If your pipeline has multiple steps, each step that runs tasks will need the `task` binary.

Here is a pipeline that installs the task binary to `./bin` in the workspace, then runs tasks in separate steps.

```yaml {} showLineNumbers
kind: pipeline
spec:
  stages:
    - name: task example
      type: ci
      spec:
        steps:
          - name: install task
            type: run
            spec:
              container: alpine
              script: |
                apk add curl
                sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d
                ./bin/task --version

          - name: second task
            type: run
            spec:
              container: alpine
              script: |
                ./bin/task second

          - name: third task
            type: run
            spec:
              container: alpine
              script: |
                ./bin/task third
```

## Temporary volume

If you don't want to install the `task` binary in the workspace, you can install it in a temporary volume.

```yaml {} showLineNumbers
kind: pipeline
spec:
  stages:
    - name: task example
      type: ci
      spec:
        volumes:
          - name: shared
            type: temp
            spec: {}
        steps:
          - name: install task
            type: run
            spec:
              mount:
                - name: shared
                  path: /shared
              container: alpine
              script: |
                apk add curl
                sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b /shared

          - name: task version
            type: run
            spec:
              mount:
                - name: shared
                  path: /shared
              container: alpine
              script: |
                /shared/task --version
```