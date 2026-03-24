---
title: Delegate Configuration Reference
description: Common configuration options for the new Harness Delegate across all platforms
sidebar_position: 5
---

This page covers the configuration options that apply to the new Harness Delegate regardless of which operating system it runs on. For OS-specific installation and setup instructions, see the individual guides:

- [Install Delegate on macOS](./install-delegate-macos)
- [Install Delegate on Linux](./install-delegate-linux)
- [Install Delegate on Windows](./install-delegate-windows)
- [Install Delegate on Kubernetes](./install-kubernetes-delegate)

## Configure Pipeline Delegate

For the CI stages that you want to use the new delegate with, [define the stage variable](/docs/platform/variables-and-expressions/add-a-variable/#define-variables) `HARNESS_CI_INTERNAL_ROUTE_TO_RUNNER` and set it to `true`.

Then, [set your pipeline's build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure#set-the-pipelines-build-infrastructure) as usual. Ensure that you have set **Local** as the **Infrastructure** and that the **Operating System** and **Architecture** match the delegate you installed.

## Set Max Stage Capacity

You can configure a limit for the maximum number of stages the delegate executes at a given time. When the delegate is at full capacity, new tasks queue and are picked up once capacity frees up.

Add a `MAX_STAGES` variable in the delegate's `config.env` file with a positive integer value:

```
ACCOUNT_ID="<ACCOUNT_ID>"
TOKEN="<DELEGATE_TOKEN>"
TAGS="<your delegate tags>"
URL="<MANAGER_HOST_AND_PORT>"
NAME="<your delegate name>"
...
MAX_STAGES=5
```

For a deeper look at queuing behavior, use cases, and how stages are distributed across delegates, go to [Capacity-Based Stage Queuing](../capacity-based-stage-queuing).

## Set Graceful Shutdown

:::info Available in version 1.25.2+
:::

The delegate supports transaction-aware graceful shutdown. You can configure this behavior in two ways:

1. **Container and process cleanup:** Configure a grace period to allow for a clean shutdown of running containers and processes when a pipeline execution is aborted. Add the `CLEANUP_GRACE_PERIOD_SECONDS` variable to your `config.env`. If set to 0 (default), the delegate immediately force-stops containers and processes. If set to a positive value, it first sends a graceful stop signal and waits before escalating to a forced termination.

2. **Delegate shutdown behavior:** Configure how the delegate itself shuts down when it receives a termination signal using `IDLE_WAIT_SECS_BEFORE_STOP`. The delegate stops accepting new transactions, finishes active ones, waits for the configured idle period, then shuts down. The default value is `0` (immediate shutdown); the recommended value is `60` seconds.

:::important Configuration changes require restart
All configuration options are only read on startup. Restart the delegate service after modifying these settings.
:::

### Example config.env

```
ACCOUNT_ID="<ACCOUNT_ID>"
TOKEN="<DELEGATE_TOKEN>"
TAGS="<your delegate tags>"
URL="<MANAGER_HOST_AND_PORT>"
NAME="<your delegate name>"
...
CLEANUP_GRACE_PERIOD_SECONDS=30
IDLE_WAIT_SECS_BEFORE_STOP=60
```

## Task Abort Configuration for Local Execution

When a task runs directly on the delegate's host machine (such as a Run step without containers), subprocesses are started on the host. When a stage is aborted or encounters an error, the delegate cleans up these subprocesses.

:::note
This feature is only available on Unix-based platforms (macOS and Linux). On Windows, the process is terminated by invoking `taskkill.exe /t /f` directly (a forceful kill).
:::

Configure the cleanup behavior using these environment variables in `config.env`:

- **`HARNESS_SUBPROCESS_KILL_PROCESS_GROUP_MAX_SIGTERM_ATTEMPTS`:** (non-negative integer, default: `1`) — Number of SIGTERM signals sent before SIGKILL.
- **`HARNESS_SUBPROCESS_KILL_PROCESS_GROUP_RETRY_INTERVAL_SECS`:** (positive integer, default: `10`) — Time in seconds between successive SIGTERM signals.

### Example config.env

```
ACCOUNT_ID="<ACCOUNT_ID>"
TOKEN="<DELEGATE_TOKEN>"
TAGS="<your delegate tags>"
URL="<MANAGER_HOST_AND_PORT>"
NAME="<your delegate name>"
...
HARNESS_SUBPROCESS_KILL_PROCESS_GROUP_MAX_SIGTERM_ATTEMPTS=3
HARNESS_SUBPROCESS_KILL_PROCESS_GROUP_RETRY_INTERVAL_SECS=15
```

## Containerless Steps Support

By default, most CI steps (except Run, Run Tests, Background, GitHub Action, and Bitrise Plugin) run inside containers. With containerless mode enabled, plugin-compatible steps execute directly on the delegate's host machine without container dependencies. This provides better performance and simplifies infrastructure requirements.

To enable containerless execution:

1. **Navigate to the CI stage** where you want to enable containerless execution.
2. **Go to Advanced > Stage Variables.**
3. **Add a new variable:**
   - **Name:** `HARNESS_CI_INTERNAL_CONTAINERLESS`
   - **Type:** String
   - **Value:** `true`

:::info
Containerless mode is currently in beta and supports a limited set of CI steps.
:::

## Configure Init Script

The INIT_SCRIPT feature allows you to execute a pre-startup script before the delegate makes its registration call and loads configurations. This is useful for installing tools, setting up environment variables, and performing other initialization tasks.

For complete documentation on configuring and using init scripts, including command-line flags, environment variables, and Kubernetes deployment examples, see [Run Initialization Scripts Before Delegate Startup](../configure-init-script).

## Log File Configuration

The delegate supports automatic log rotation and sanitization. Configure these using environment variables in your `config.env`:

```bash
LOG_ENABLE_FILE_LOGGING=true
LOG_MAX_SIZE_MB=100
LOG_MAX_BACKUPS=3
LOG_MAX_AGE_DAYS=28
LOG_COMPRESS=false
```

For the log file location on your specific OS, refer to the installation guide for [macOS](./install-delegate-macos#logs), [Linux](./install-delegate-linux#logs), or [Windows](./install-delegate-windows#logs).

## Metrics

The delegate exposes metrics on the `/metrics` endpoint for monitoring and observability. By default, the metrics endpoint is available at `http://localhost:3000/metrics`.

## Token Management

### Token Creation

The delegate token is automatically generated when a project is created. You can view it by navigating to **Project Settings** > **Delegates** > **Tokens** in the Harness UI.

### Token Storage

The token is stored in the delegate's `config.env` file as the `HARNESS_TOKEN` value. For Kubernetes-based delegates, the token is stored as a Kubernetes secret. If someone gains access to the machine or pod, they can view the token.

### Token Rotation

Harness does not handle secret rotation. It is your responsibility to rotate delegate tokens and update the corresponding `config.env` file or Kubernetes secret.

## End-to-End Demo

This video walks through an end-to-end demo of the delegate installation, including usage and a pipeline execution.

<DocVideo src="https://www.loom.com/share/1e292d0f51004882bfd5462ef0553222?sid=487e23cb-28fc-4d2e-ac66-07197fa7dafe" />
