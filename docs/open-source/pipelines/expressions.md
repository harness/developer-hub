---
sidebar_position: 3
---

# Expressions

Expressions provide dynamic values to your pipeline at runtime.

Harness Open Source provides [variables](../reference/pipelines/expression_variables.md) that can be referenced in expressions and [conditions](./conditions.md). Expressions are also used to reference [secrets](./secrets.md).

## Variables

Variables can be referenced throughout your pipeline with the expression syntax `${{ variable.name }}`.

This pipeline sends a message to slack containing the [build number](../reference/pipelines/expression_variables.md#buildnumber) after the `test` step completes.

```yaml {19} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: test
        type: run
        spec:
          container: maven:3-jdk-10
          script: |-
            mvn install -DskipTests=true -Dmaven.javadoc.skip=true -B -V

      - name: notify
        type: plugin
        spec:
          name: slack
          inputs:
            template: build number ${{ build.number }} completed
            webhook: ${{ secrets.get("slack_webhook") }}
```

This pipeline prints all files changed in the commit range based on the [before](../reference/pipelines/expression_variables.md#buildbefore) and [after](../reference/pipelines/expression_variables.md#buildafter) commits.

```yaml {12} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: print files changed
        type: run
        spec:
          container: alpine/git
          script: |-
            git diff --name-only ${{ build.before }}..${{ build.after }} > files_changed.txt

            for FILE in $(cat files_changed.txt); do
              echo $FILE was changed
            done
```