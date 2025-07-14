---
title: Using GitHub App Tokens Securely in Harness CI Pipelines
description: Learn how to securely authenticate GitHub API calls in Harness CI pipelines using GitHub App tokens and the community plugin for ephemeral token generation.
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When interacting with GitHub from CI pipelines, authentication is required for actions like creating pull requests, committing code, or accessing private repositories. Traditionally, this was done using static personal access tokens (PATs), but this approach comes with significant drawbacks:

* **Rate limits** for user tokens are low.
* **Security risks** from hardcoded secrets or token exposure.
* **User binding** ties activity to a specific person rather than a system identity.

This guide walks through a modern, flexible solution that uses a GitHub App to generate short-lived tokens at runtime, powered by a [Harness-compatible plugin](https://github.com/harness-community/drone-github-app-token).

---

## Limitations of Static Tokens and Legacy Approaches

Earlier approaches involved scripting token generation by manually crafting JWTs, calling GitHub APIs, and injecting tokens into Harness pipelines via a custom secret manager. While functional, this method:

* Was **cumbersome and error-prone**.
* Required external scripts and secret manager setup.
* **Did not work reliably in Harness Cloud**, often failing silently or returning incorrect data.

For details on the previous approach, see [this KB article](/kb/continuous-integration/articles/github-app-pat-dispenser/).

---

## Recommended Solution: GitHub App Token Plugin

Harness now supports a more robust and cloud-compatible method using the open source [`drone-github-app-token`](https://github.com/harness-community/drone-github-app-token) plugin.

This plugin generates GitHub App installation tokens securely during pipeline execution. It eliminates the need for PATs or static secrets and enables you to use the token immediately in subsequent steps.

### Key Benefits

* Tokens are **ephemeral**, scoped to the pipeline.
* Securely injected as output variables.
* Works in **Harness Cloud environments** without special configuration.

---

## Example: Using GitHub App Token in a CI Pipeline

```yaml
- step:
    identifier: Generate_GitHub_Token
    type: Plugin
    name: Generate GitHub App Token
    spec:
      connectorRef: YOUR_DOCKER_CONNECTOR
      image: plugins/github-app-token:latest
      settings:
        app_id: "YOUR_GITHUB_APP_ID"
        private_key: <+secrets.getValue("YOUR_GITHUB_APP_KEY")>  # Secret of type "File"
        permission_contents: write

- step:
    identifier: Use_Token
    type: Run
    name: Use GitHub Token
    spec:
      shell: Sh
      command: |
        curl -H "Authorization: token <+execution.steps.Generate_GitHub_Token.output.outputVariables.GITHUB_APP_TOKEN>" \
             https://api.github.com/repos/YOUR_ORG/YOUR_REPO/contents
```

### Notes:

* `app_id`: GitHub App ID (numeric).
* `private_key`: Must be stored in Harness as a **File-type Secret**.
* `connectorRef`: Docker connector that can pull the plugin image.
* The token can also be passed as an environment variable (`GH_TOKEN`) if you're using the GitHub CLI.

---

## Best Practices

* Use Harness Secrets for all sensitive data.
* Use scoped permissions on your GitHub App to follow the principle of least privilege.
* Pass the generated token only between pipeline steps — avoid logging or persisting it.

---

## Troubleshooting

* Ensure your `private_key` secret is uploaded as **file type**, not plaintext.
* Confirm the plugin step succeeded by checking `output.outputVariables.GITHUB_APP_TOKEN`.
* Tokens expire after a short time (\~10 minutes). Use them immediately in the next step.

