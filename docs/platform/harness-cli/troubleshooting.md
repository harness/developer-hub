---
title: Troubleshooting
sidebar_label: Troubleshooting
description: Learn how to diagnose and resolve common Harness CLI errors, understand exit codes, and enable debug logging for detailed request information.
sidebar_position: 7
keywords:
  - harness cli
  - troubleshooting
  - errors
  - exit codes
  - debug
  - authentication errors
---

Use this page to diagnose and resolve common Harness CLI issues. Most problems fall into one of four categories: authentication failures, scope and context issues, network connectivity problems, or incorrect resource identifiers.

---

## What will you learn in this topic?

By the end of this page, you will know how to:

* Interpret CLI exit codes and error messages.
* Collect diagnostic information using debug logging.
* Resolve common authentication, scope, and network issues.
* Troubleshoot resource identifier, YAML validation, and version-related errors.

---

## Before you begin

* **Harness CLI installed:** Go to [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) if the CLI is not yet installed.

---

## Quick troubleshooting workflow

When a command fails unexpectedly:

1. Re-run the command with `--debug`.
2. Verify authentication with `harness auth status`.
3. Confirm the correct organization, project, and resource level.
4. Verify that the resource exists using the corresponding `list` command.
5. Check your CLI version with `harness --version`.

---

## Exit codes

The CLI uses standard exit codes to indicate command status. You can use these exit codes in scripts and automation workflows to detect failures and take corrective action.

| Exit code | Meaning                                                               |
| --------- | --------------------------------------------------------------------- |
| `0`       | Command completed successfully                                        |
| `1`       | Command failed due to an API, validation, or resource error           |
| `2`       | Invalid command usage, such as missing arguments or unsupported flags |
| `124`     | Command exceeded the configured timeout value                         |

---

## Collect diagnostic information

When a command fails unexpectedly, enable debug logging to view the underlying API requests and responses.

```sh
harness list pipeline --debug
```

To enable debug logging for an entire shell session:

```sh
export HARNESS_DEBUG=1
harness list pipeline
```

Debug output includes request URLs, payloads, response status codes, and API error messages, which can help identify the root cause of failures.

---

## Authentication issues

### Unauthorized or invalid token

The API token is expired, revoked, invalid, or does not have permission to access the requested resource.

**Resolution**

1. Re-authenticate using a valid token.
2. Verify that `HARNESS_API_KEY` contains the expected value if you use environment-variable authentication.
3. Confirm that the token has permission to access the requested resource.

```sh
harness auth login
harness auth status
```

### Profile not found

The specified profile does not exist in your local configuration.

**Resolution**

1. Run `harness auth profiles` to view available profiles.
2. Verify the value passed through `--profile` or `HARNESS_PROFILE`.
3. Create a new profile if needed.

```sh
harness auth profiles
harness auth login --profile staging
```

---

## Scope and context issues

### Organization or project is required

The command targets a resource that requires organization and project context, but neither was provided through flags, profile defaults, or environment variables.

**Resolution**

Pass the required scope explicitly:

```sh
harness list pipeline --org my-org --project my-project
```

Or configure defaults for your profile:

```sh
harness auth setscope --org my-org --project my-project
```

### Resource not found

A resource may exist, but the CLI is querying a different account, organization, project, or resource level.

**Resolution**

1. Verify the organization and project.
2. Verify the resource level using `--level`.
3. Use `--debug` to inspect the request context.
4. Confirm the resource exists with a corresponding `list` command.

```sh
harness get secret my-secret --level account
harness get connector shared-github --level org --org platform

harness list pipeline --org my-org --project my-project
```

---

## Network issues

### Connection refused or timeout

The CLI cannot reach the Harness API endpoint. This can occur because of firewall restrictions, VPNs, proxy configuration, or network connectivity issues.

**Resolution**

1. Verify network connectivity.
2. If your environment uses a proxy, confirm the proxy variables are configured correctly.
3. For self-managed Harness deployments, verify the configured API URL.

```sh
export HTTPS_PROXY=http://your-proxy:8080
```

Check the configured API URL:

```sh
echo $HARNESS_API_URL
harness get account --debug
```

### TLS handshake failure

The CLI cannot establish a secure connection to the API endpoint. This is typically caused by missing or outdated CA certificates, or by corporate TLS interception.

**Resolution**

1. Update the system certificate store.
2. If your organization uses a custom certificate authority, add it to the system trust store.
3. Retry the command after updating certificates.

---

## Resource and configuration issues

### Invalid YAML

The YAML file supplied with `--file` or `-f` contains syntax errors or does not match the expected resource schema.

**Resolution**

Export a known-good resource and compare it with your changes:

```sh
harness get pipeline deploy-prod > current.yaml
diff current.yaml my-changes.yaml
```

Use `--debug` to inspect API validation errors returned by the server.

### Unknown command or unknown flag

The command or flag may not exist in your installed CLI version.

**Resolution**

Check your version and upgrade if necessary:

```sh
harness --version
harness install cli
```

Review available commands:

```sh
harness --help
harness list noun --matrix
```

---

## Upgrade issues

### Configuration migration

After a major CLI upgrade, configuration files may require migration. The CLI attempts to migrate configuration automatically.

**Resolution**

Back up your configuration:

```sh
cp -r ~/.harness ~/.harness.backup
```

Then trigger migration by running any CLI command or re-authenticating:

```sh
harness auth login
```

---

## Get help

If the issue persists:

* Run `harness <command> --help` to view command-specific usage and flags.
* Re-run the command with `--debug` and capture the output for troubleshooting.
* See [Supported resources and actions](/docs/platform/harness-cli/supported-resources-and-actions) to verify that the resource and action are supported.
* Contact Harness Support and include relevant error messages, debug output, and CLI version information.

---

## Next steps

* See [Supported resources and actions](/docs/platform/harness-cli/supported-resources-and-actions) for supported resources and actions.
* See [Global flags and output](/docs/platform/harness-cli/global-flags-and-output) for shared flags, output formats, and environment variables.
* See [Authenticate](/docs/platform/harness-cli/authenticate) to review profile and credential configuration.
