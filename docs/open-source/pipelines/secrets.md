---
sidebar_position: 3
---

# Secrets

Secrets are used to store and manage sensitive information, such as passwords, tokens, and ssh keys. Storing this information in a secret is considered safer than storing it in your configuration file in plain text.

:::note

Secrets are managed at the project level.

:::

## Create a secret

1. Select the **Secrets** view in you project, then select **New Secret**
2. Enter the secret name, value, and optional description, then select **Create Secret**

You will see your secret in the list.

## Use a secret in a pipeline

Reference the secret in a pipeline with `${{ secrets.get("secret_name") }}` expression syntax, for example:

```yaml {12} showLineNumbers
kind: pipeline
spec:
  stages:
  - type: ci
    spec:
      steps:
      - name: notify
        type: plugin
        spec:
          name: slack
          inputs:
            webhook: ${{ secrets.get("slack_webhook") }}
```