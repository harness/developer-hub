---
title: Authenticate the Harness CLI
sidebar_label: Authenticate
description: Log in to the Harness CLI, manage named profiles, set up authentication for CI, and enable shell completions.
sidebar_position: 3
keywords:
  - harness cli
  - cli authentication
  - cli login
  - api key
  - profiles
  - shell completions
---

The Harness CLI must be authenticated before it can access Harness resources. You can authenticate interactively for local development, use environment variables in automated environments, or manage multiple accounts and environments with named profiles.

---

## What you will learn in this topic

By the end of this page, you will know how to:

- Log in and create your first profile.
- Log in through your browser with single sign-on (SSO), and refresh or inspect an SSO token.
- Pass credentials through environment variables for CI and scripts.
- Create, list, switch, and remove named profiles.
- Set a default organization and project for a profile.
- Print the active auth context and API token for use in other tooling.
- Enable tab-completion for Bash and Zsh.
- Troubleshoot a browser login flow with SSO debug logging.

---

## Before you begin

- **Harness CLI installed:** For installation steps, see [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade).
- **API key:** A Harness Personal Access Token (PAT) or Service Account token. Generate one from **My Profile** > **API Keys** or from a Service Account in the Harness UI.

---

## Log in

Run the login command to authenticate your CLI:

```sh
harness auth login
```

This command launches an interactive prompt to collect your API token, account ID, and optional default organization and project. The CLI stores credentials and profile configuration locally for future use.

Confirm your authentication:

```sh
harness auth status
```

To create a profile for a different account or environment, pass the `--profile` flag:

```sh
harness auth login --profile staging
harness auth login --profile prod
```

You can also log in without an interactive prompt by passing all values as flags:

```sh
harness auth login \
  --profile ci \
  --api-token "$HARNESS_API_KEY" \
  --account "$HARNESS_ACCOUNT_ID" \
  --org default \
  --project my_project
```

For a fully non-interactive login, pass the API URL and token together:

```sh
harness auth login --api-url "$HARNESS_API_URL" --api-token "$HARNESS_API_KEY"
```

:::note
The CLI resolves credentials in the following order: `--profile`, `HARNESS_API_KEY`, `HARNESS_PROFILE`, CI runner auto-detection, and the default profile in `~/.harness/config.yaml`. The first valid source is used.
:::

---

## Log in with single sign-on

Add `--sso` to authenticate through your browser with OAuth2 instead of pasting a token. Where the operating system provides a keychain, the CLI stores the resulting tokens there rather than on disk.

```sh
harness auth login --sso
harness auth login --sso --profile prod
```

### Check SSO token status

Show the token expiry and refresh status for the active profile.

```sh
harness auth sso_status
harness auth sso_status --profile prod
```

### Refresh an SSO token

Exchange the stored refresh token for a new access token. Run this when an SSO access token has expired but the session is still valid.

```sh
harness auth sso_refresh
```

### Troubleshoot a browser login

If a browser login does not complete, emit SSO auth debug events and retry the login.

```sh
harness debug sso-log
```

---

## Set environment variables

For CI pipelines, Docker containers, and automated scripts, set these environment variables instead of logging in interactively:

```sh
export HARNESS_API_KEY=pat.xxxxxxxxxxxxxxxxxx
export HARNESS_ACCOUNT_ID=ZJL7VBAhRq6Pf9G4f5OqLg
export HARNESS_DEFAULT_ORG=default
export HARNESS_DEFAULT_PROJECT=my_project

harness list pipeline
```

When `HARNESS_API_KEY` is set, it takes precedence over any saved profile.

:::tip
Environment variables are typically the preferred authentication method for CI/CD pipelines and other automated environments because they avoid storing credentials on disk.
:::

---

## Manage profiles

A profile is a named set of credentials and default organization and project settings. Most teams maintain separate profiles for development, staging, and production environments.

### List and inspect

```sh
harness auth profiles                       # List every saved profile
harness auth status                         # Show the active profile
harness auth status --profile staging       # Inspect a specific profile
```

### Switch between profiles

Use a profile for a single command:

```sh
harness list pipeline --profile prod
```

Pin a profile for the entire shell session:

```sh
export HARNESS_PROFILE=prod
harness list pipeline   # Uses the prod profile
```

### Set a default organization and project

Set the default organization and project for a profile so you do not need to pass them on every command:

```sh
harness auth setscope --org my-org --project my-project
harness auth setscope --org my-org --project my-project --profile staging
```

Run `harness auth setscope` without flags to launch an interactive picker.

### Log out

Remove a profile and its stored credentials:

```sh
harness auth logout
harness auth logout --profile staging
```

---

## Export the auth context

Two commands print the active credentials so that other tooling can consume them.

### Print environment variables

Print the environment variables for the current auth context. Add `--export` to produce output you can pass to `eval`.

```sh
harness auth env
eval "$(harness auth env --export)"
```

### Print the API token

Print the active API token to stdout. Use this to pipe the token into another tool, such as `curl`.

```sh
harness auth token
curl -H "x-api-key: $(harness auth token)" <harness_api_url>
```

:::warning
`harness auth token` writes a live credential to stdout. Do not log its output or store it in a file that is committed to version control.
:::

---

## Configuration files

| File | What it stores |
| --- | --- |
| `~/.harness/config.yaml` | Profiles, account IDs, default org and project |
| `~/.harness/credentials` | API tokens per profile (never logged or printed) |

Override the config directory with the `HARNESS_CONFIG_HOME` environment variable.

---

## Shell completions

Tab-completion covers actions, resources, flags, and live identifiers fetched from the API.

### Zsh

```sh
source <(harness completion zsh)
```

Add to `.zshrc` for persistence:

```sh
echo 'source <(harness completion zsh)' >> ~/.zshrc
```

### Bash

```sh
source <(harness completion bash)
```

Add to `.bashrc` for persistence:

```sh
echo 'source <(harness completion bash)' >> ~/.bashrc
```

Shell completion supports actions, resources, identifiers, flags, and valid flag values. Resource identifiers are retrieved dynamically from the Harness API.

---

## Related articles

- [Supported resources and actions](/docs/platform/harness-cli/supported-resources-and-actions): Review every supported resource and action.
- [Global flags and output](/docs/platform/harness-cli/global-flags-and-output): Understand output formats, filtering, and pagination.