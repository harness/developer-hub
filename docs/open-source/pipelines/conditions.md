---
sidebar_position: 3
---

# Conditions

Conditions limit pipeline [step](/docs/category/steps-1) execution at runtime. Harness Open Source sets [variables](../reference/pipelines/expression_variables.md) that can be used in conditions.

:::tip

Harness Open Source supports multiple pipelines per repository. Creating a pipeline per [trigger](./triggers.md) (push, pull request, tag) can reduce the need for conditions.

:::

The following operators are supported:

| Type | Operator |           
|-|-|
| Comparison | `==`, `!=` |
| Logical | `not`, `and`, `or` |
| Regex | `matches` |
| String | `contains`, `startsWith`, `endsWith` |

The following functions are supported:

| Type | Syntax |           
|-|-|
| Always | `always()` |
| Failure | `failure()` |

This pipeline runs the `test` step only for pull request [events](../reference/pipelines/expression_variables.md#buildevent) where the [target branch](../reference/pipelines/expression_variables.md#buildtarget) is `main`.

```yaml {9-12} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test
        type: run
        when: |
          build.event == "pull_request"
          and
          build.target == "main"
        spec:
          container: ruby
          script: |-
            bundle install --jobs=3 --retry=3
            rake
```

This condition runs the step for pull request events where the target branch is not `main`.

```yaml {}
        when: |
          build.event == "pull_request"
          and
          build.target != "main"
```

This condition runs the step only when a pull request is created based on the [action](../reference/pipelines/expression_variables.md#buildaction).

```yaml {}
        when: build.action == "pullreq_created"
```

## Branch

Limit execution based on the [target branch](../reference/pipelines/expression_variables.md#buildtarget).

This pipeline runs the `build` step when the target branch is `main`, or starts with `feature/`.

```yaml {9-12} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: build
        type: run
        when: |
          build.target == "main"
          or
          build.target startsWith "feature/"
        spec:
          container: golang
          script: |-
            go build
            go test
```

This condition uses a regular expression to achieve the same behavior.

```yaml {}
        when: build.target matches "main|feature/.*"
```

## Event

Limit execution based on the [event](../reference/pipelines/expression_variables.md#buildevent).

This pipeline runs the `clean cache` step only for manually triggered pipelines.

```yaml {9} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: clean cache
        type: run
        when: build.event == "manual"
        spec:
          container: node:18
          script: |-
            npm cache clean --force
```

## Reference

Limit execution based on the git [reference](../reference/pipelines/expression_variables.md#buildref).

This pipeline runs the `build` step for branch names that start with `feature-`, or for tags.

```yaml {9-12} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: build
        type: run
        when: |
          build.ref startsWith "refs/heads/feature-"
          or
          build.ref startsWith "refs/tags/"
        spec:
          container: golang
          script: |-
            go build
            go test
```

## Status

Limit execution based on the pipeline status.

This pipeline runs the `notify` step only when the `test` step fails.

```yaml {17} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test
        type: run
        spec:
          container: gradle:jdk10
          script: |-
            gradle assemble
            gradle check

      - name: notify
        type: plugin
        when: failure()
        spec:
          name: slack
          inputs:
            webhook: ${{ secrets.get("slack_webhook") }}
```

This condition will always run the step.

```yaml
        when: always()
```