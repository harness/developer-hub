---
definition: Define a series of shell commands
sidebar_position: 1
---

# Run

[Run steps](../../reference/pipelines/yaml/step-run) define a series of shell commands.

## Editor

1. From the pipeline editor, select __Run__ from the __Select a step__ menu on the right
2. Enter a name for the step in the __Name__ field
3. Add the necessary commands in the __Script__ field
4. Optionally select a shell from the __Shell__ drop-down menu
5. Expand the __Container__ section and fill in the required fields, then select __Add__

The run step will be added in the pipeline editor.

:::info

Run step commands are executed inside the root directory of your git repository.

The root directory of your git repository, also called the workspace, is shared by all steps in your pipeline.

:::

## Manual

You can optionally add plugin steps directly to your pipeline file manually.

This pipeline runs `go build` and `go test` commands in the golang Docker image.

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
