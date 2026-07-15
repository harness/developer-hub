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

## What will you learn in this topic?

By the end of this page, you will know how to:

- Log in and create your first profile.
- Pass credentials through environment variables for CI and scripts.
- Create, list, switch, and remove named profiles.
- Set a default organization and project for a profile.
- Enable tab-completion for Bash and Zsh.

---

## Before you begin

- **Harness CLI installed:** Go to [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) to install the CLI.
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

:::note
The CLI resolves credentials in the following order: `--profile`, `HARNESS_API_KEY`, `HARNESS_PROFILE`, CI runner auto-detection, and the default profile in `~/.harness/config.yaml`. The first valid source is used.
:::

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

## Next steps

- Go to [Supported resources and actions](/docs/platform/harness-cli/supported-resources-and-actions) to view all supported resources and actions.
- Go to [Global flags and output](/docs/platform/harness-cli/global-flags-and-output) to learn about output formats, filtering, and pagination.