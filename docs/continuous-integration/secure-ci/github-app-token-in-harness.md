---
title: Using GitHub App Tokens Securely in Harness CI Pipelines
description: Learn how to securely authenticate GitHub API calls in Harness CI pipelines using GitHub App tokens and the Drone plugin for ephemeral token generation.
sidebar_position: 20
---

When interacting with GitHub from CI pipelines, authentication is required for actions like creating pull requests, committing code, or accessing private repositories. Traditionally, this was done using static personal access tokens (PATs), but this approach comes with significant drawbacks:

- **Rate limits:** User tokens have low rate limits compared to GitHub App installation tokens.
- **Security risks:** Hardcoded secrets or token exposure increase your attack surface.
- **User binding:** Activity ties to a specific person rather than a system identity.

This guide walks through a modern, flexible solution that uses a GitHub App to generate short-lived tokens at runtime, powered by a [Harness-compatible plugin](https://github.com/harness-community/drone-github-app-token).

---

## Before you begin

- **GitHub App:** A registered GitHub App with the specific permissions your pipeline requires (for example, Contents: Read & Write). Go to [GitHub's documentation on creating GitHub Apps](https://docs.github.com/en/apps/creating-github-apps) to register one if you have not already.
- **App installation:** The GitHub App must be installed on the target organization or repository. Note the numeric **App ID** from the app's settings page.
- **Private key:** A private key generated for the GitHub App, stored as a **file-type secret** in Harness. Go to [Add file secrets](/docs/platform/secrets/add-file-secrets) to store the key.
- **Docker connector:** A Harness Docker connector that can pull the plugin image from Docker Hub.

---

## Limitations of static tokens and legacy approaches

Earlier approaches involved scripting token generation by manually crafting JWTs, calling GitHub APIs, and injecting tokens into Harness pipelines via a custom secret manager. While functional, this method:

- Was **cumbersome and error-prone**.
- Required external scripts and secret manager setup.
- **Did not work reliably in Harness Cloud**, often failing silently or returning incorrect data.

---

## Recommended solution: GitHub App token plugin

Harness supports a robust and cloud-compatible method using the open source [`drone-github-app-token`](https://github.com/harness-community/drone-github-app-token) plugin.

This plugin generates GitHub App installation tokens securely during pipeline execution. It eliminates the need for PATs or static secrets and enables you to use the token immediately in subsequent steps.

**Key benefits:**

- Tokens are **ephemeral** and scoped to the pipeline execution.
- Securely injected as output variables.
- Works in **Harness Cloud environments** without special configuration.

---

## Example: Use a GitHub App token in a CI pipeline

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
        private_key: <+secrets.getValue("YOUR_GITHUB_APP_KEY")>
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

:::important
The `permission_*` settings fields must match permissions that your GitHub App was granted during installation. The plugin requests an installation token from GitHub scoped to exactly the permissions you specify. If you pass a permission the app was not granted, the GitHub API rejects the request and token generation fails.

Common permission fields include `permission_contents`, `permission_issues`, `permission_pull_requests`, `permission_checks`, and `permission_statuses`. Each accepts a value of `read` or `write`. Go to the [full permission settings reference](#permission-settings-reference) below for the complete list.

If you omit all `permission_*` fields, the token inherits every permission the app installation was granted.
:::

:::note
The plugin exports several output variables that you can reference in subsequent steps:

```
<+execution.steps.Generate_GitHub_Token.output.outputVariables.GITHUB_APP_TOKEN>
<+execution.steps.Generate_GitHub_Token.output.outputVariables.GITHUB_APP_INSTALLATION_ID>
<+execution.steps.Generate_GitHub_Token.output.outputVariables.GITHUB_APP_SLUG>
```
:::

---

## Permission settings reference

You can specify the permissions to grant the generated token. Each permission field corresponds to a GitHub App permission and accepts a value of `read` or `write` (some accept `admin`).

| Setting | Description |
|---------|-------------|
| `permission_actions` | GitHub Actions workflows, workflow runs, and artifacts |
| `permission_administration` | Repository creation, deletion, settings, teams, and collaborators |
| `permission_checks` | Checks on code |
| `permission_codespaces` | Create, edit, delete, and list Codespaces |
| `permission_contents` | Repository contents, commits, branches, downloads, releases, and merges |
| `permission_dependabot_secrets` | Manage Dependabot secrets |
| `permission_deployments` | Deployments and deployment statuses |
| `permission_environments` | Manage repository environments |
| `permission_issues` | Issues and related comments, assignees, labels, and milestones |
| `permission_members` | Organization teams and members |
| `permission_metadata` | Search repositories, list collaborators, and access repository metadata |
| `permission_packages` | Packages published to GitHub Packages |
| `permission_pages` | Retrieve Pages statuses, configuration, and builds |
| `permission_pull_requests` | Pull requests and related comments, assignees, labels, milestones, and merges |
| `permission_repository_hooks` | Manage the post-receive hooks for a repository |
| `permission_secret_scanning_alerts` | View and manage secret scanning alerts |
| `permission_secrets` | Manage repository secrets |
| `permission_security_events` | View and manage security events like code scanning alerts |
| `permission_statuses` | Commit statuses |
| `permission_vulnerability_alerts` | Manage Dependabot alerts |
| `permission_workflows` | Update GitHub Actions workflow files |

:::tip
For the complete list including organization-level permissions, go to the [plugin repository README](https://github.com/harness-community/drone-github-app-token#permission-settings).
:::

---

## Best practices

- Store the GitHub App private key as a Harness file secret. Do not inline private key content in pipeline YAML.
- Use scoped permissions on your GitHub App and reflect only the required permissions in the plugin's `permission_*` settings fields. The plugin requests only what you explicitly pass, so follow the principle of least privilege in both places.
- Pass the generated token only between pipeline steps. Do not log or persist it.
