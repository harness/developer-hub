---
description: Perform pre-defined tasks as steps in your pipeline
sidebar_position: 1
---

# Plugin

[Plugin steps](../../reference/pipelines/yaml/step-plugin) perform pre-defined tasks as steps in your pipeline.

Plugins can build and publish artifacts, send notifications, and more.

## Editor

1. From the pipeline editor, select __Plugins__ from the __Select a step__ menu on the right
2. Scroll through the available plugins, or use the __Search__ field, then select a plugin
3. Enter the necessary inputs in the fields provided, then select __Add__

The plugin step will be added in the pipeline editor.

## Manual

You can optionally add plugin steps directly to your pipeline file manually.

This pipeline executes a `test` run step followed by a `notify` plugin step that uses the Slack plugin.

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
          container: node
          script: |-
            npm install
            npm test

      - name: notify
        type: plugin
        spec:
          name: slack
          inputs:
            webhook: ${{ secrets.get("slack_webhook") }}
```