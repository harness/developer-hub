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

## Limitations of Static Tokens and Legacy Approaches

Earlier approaches involved scripting token generation by manually crafting JWTs, calling GitHub APIs, and injecting tokens into Harness pipelines via a custom secret manager. While functional, this method:

* Was **cumbersome and error-prone**.
* Required external scripts and secret manager setup.
* **Did not work reliably in Harness Cloud**, often failing silently or returning incorrect data.

## Recommended Solution: GitHub App Token Plugin

Harness now supports a more robust and cloud-compatible method using the open source [`drone-github-app-token`](https://github.com/harness-community/drone-github-app-token) plugin.

This plugin generates GitHub App installation tokens securely during pipeline execution. It eliminates the need for PATs or static secrets and enables you to use the token immediately in subsequent steps.

***Key Benefits***

* Tokens are **ephemeral**, scoped to the pipeline.
* Securely injected as output variables.
* Works in **Harness Cloud environments** without special configuration.

## Example: Using GitHub App Token in a CI Pipeline

```yaml
- step:
    identifier: Generate_GitHub_Token
    type: Plugin
    name: Generate GitHub App Token
    spec:
      connectorRef: YOUR_DOCKER_CONNECTOR # Docker connector that can pull the plugin image.
      image: plugins/github-app-token:latest
      settings:
        app_id: "YOUR_GITHUB_APP_ID" # Numeric Value
        private_key: <+secrets.getValue("YOUR_GITHUB_APP_KEY")>  # File-type Secret on Harness
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

:::note

* The plugin exports several output variables — including the GitHub App token (`GITHUB_APP_TOKEN`), installation ID (`GITHUB_APP_INSTALLATION_ID`), and app slug (`GITHUB_APP_SLUG`). These variables can be referenced in subsequent steps using:
```bash
<+execution.steps.Generate_GitHub_Token.output.outputVariables.GITHUB_APP_TOKEN>
<+execution.steps.Generate_GitHub_Token.output.outputVariables.GITHUB_APP_INSTALLATION_ID>
<+execution.steps.Generate_GitHub_Token.output.outputVariables.GITHUB_APP_SLUG>
```
* The JWT is used to authenticate as the GitHub App and generate the installation token. The JWT expires after 10 minutes by design, but the installation token — which grants actual repo access — lasts for 60 minutes.
:::

## Best Practices

* Use Harness Secrets for all sensitive data.
* Use scoped permissions on your GitHub App to follow the principle of least privilege.
* Pass the generated token only between pipeline steps — avoid logging or persisting it.


