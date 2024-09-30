---
sidebar_position: 3
---

# Triggers

When code is pushed to a repository, a pull request is opened, or a tag is created, Harness Open Source can automatically trigger pipeline execution.

When creating a pipeline, Harness Open Source automatically creates a default trigger for you. You can customize this trigger, or create additional triggers.

## Create a trigger

1. Navigate to your pipeline, then select **Pipeline Settings**
2. Open the **Triggers** tab and select **New Trigger**
3. Give the trigger a name and select your desired trigger options
4. Select **Create**

Your trigger will appear in the list.

## Conditions

By default, all steps in your pipeline will run when triggered. You can limit pipeline step execution at runtime with [conditions](./conditions.md).

:::tip

Harness Open Source supports multiple pipelines per repository. Creating a pipeline per trigger event (push, pull request, tag) can reduce the need for conditions.

:::

This pipeline runs the `test` step only for pull request [events](../reference/pipelines/expression_variables.md#buildevent).

```yaml {9} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test
        type: run
        when: build.event == "pull_request"
        spec:
          container: golang
          script: |-
            go build
            go test
```

This pipeline runs the `test` step only for pull request created [actions](../reference/pipelines/expression_variables.md#buildaction).

```yaml {9} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test
        type: run
        when: build.action == "pullreq_created"
        spec:
          container: golang
          script: |-
            go build
            go test
```