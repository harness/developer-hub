---
title: Run Initialization Scripts Before Delegate Startup
description: Learn how to run custom initialization scripts before the Delegate 2.0 registers with Harness
sidebar_position: 3
---

When deploying the Harness Delegate, you often need to prepare the environment before the delegate starts processing tasks. Initialization scripts address this need by allowing you to run custom setup commands that execute before the delegate registers with Harness.

This guide explains how to configure and use initialization scripts to customize your delegate environment during startup.

## Overview

Harness Delegate supports running an initialization script before it makes its registration call and loads configurations. This early execution window gives you the opportunity to install required tools, configure environment variables, and perform other setup tasks that need to be in place before the delegate becomes active.

Common scenarios where initialization scripts are useful include:

- Installing CLI tools or SDKs required by your pipelines
- Setting up environment variables for authentication or configuration
- Configuring system settings specific to your infrastructure
- Downloading and installing custom binaries

## Key Features

The init script feature is designed to be flexible and work across different deployment scenarios:

- **Cross-platform support:** Works on Linux, macOS, and Windows, automatically adapting to each platform's scripting conventions.

- **Dual input methods:** Supports both environment variable (`INIT_SCRIPT` or `HARNESS_INIT_SCRIPT`) and file-based (`HARNESS_INIT_SCRIPT_PATH`) approaches, so you can choose the method that best fits your deployment workflow.

- **Early execution:** Runs before registration and configuration loading, ensuring your setup is complete before the delegate connects to Harness.

- **Non-blocking:** Errors are logged but do not block startup, allowing you to monitor issues without preventing the delegate from running.

## Configuration Methods

You can configure init scripts using command-line flags, environment variables, or during service installation. Choose the method that aligns with your deployment process.

### Command-Line Flags (Direct Mode)

When running the runner directly from the command line, you can specify the init script using flags. This approach is straightforward and works well for manual deployments or testing.

Use the `--init-script` flag to specify the path to your initialization script:

```bash
./runner server --init-script /path/to/init.sh
```

Alternatively, use the `--workdir` flag to set the delegate's working directory. When you use this flag, the delegate automatically looks for an init script with a default name in that directory—`init.sh` on Linux and macOS, or `init.ps1` on Windows:

```bash
./runner server --workdir /path/to/workdir
```

This approach simplifies configuration when you want to keep your init script alongside other delegate files in a dedicated directory.

### Environment Variables

Environment variables provide a flexible way to configure init scripts, particularly useful in containerized environments or when managing configurations through orchestration tools.

#### Providing Script Content Directly

You can pass the script content directly using the `HARNESS_INIT_SCRIPT` or `INIT_SCRIPT` environment variable. This method is convenient for simple scripts that you want to define inline:

```bash
export HARNESS_INIT_SCRIPT="apt-get update && apt-get install -y docker"
./runner server
```

#### Specifying a Script File Path

For more complex scripts or when you prefer to maintain your script as a separate file, use the `HARNESS_INIT_SCRIPT_PATH` environment variable to point to the script location:

```bash
export HARNESS_INIT_SCRIPT_PATH=/path/to/init.sh
./runner server
```

### Service Installation

When installing the delegate as a system service, you can configure the init script during the installation process. The service manager stores these settings and applies them each time the service starts.

Include the `--init-script` and `--workdir` flags with the `./runner install` command:

```bash
./runner install \
  --workdir /opt/harness-runner \
  --init-script /opt/harness-runner/init.sh \
  --account <account-id> \
  --token <token> \
  --url <harness-url> \
  --name <runner-name>
```

After installation, start the service normally and the init script runs automatically before the delegate registers.

## Kubernetes Deployment

In Kubernetes environments, ConfigMaps provide an effective way to manage your init scripts alongside your delegate deployment manifests.

Start by creating a ConfigMap that contains your initialization script:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: delegate-init-script
data:
  init.sh: |
    #!/bin/bash
    export CUSTOM_VAR=value
    # Install tools
    apt-get update && apt-get install -y docker git
```

Next, configure your delegate deployment to mount this ConfigMap and reference the script path through the `HARNESS_INIT_SCRIPT_PATH` environment variable:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: delegate
spec:
  template:
    spec:
      containers:
      - name: delegate
        env:
        - name: HARNESS_WORKDIR
          value: /opt/harness-runner
        - name: HARNESS_INIT_SCRIPT_PATH
          value: /scripts/init.sh
        volumeMounts:
        - name: init-script
          mountPath: /scripts
      volumes:
      - name: init-script
        configMap:
          name: delegate-init-script
```

This setup allows you to version control your init scripts and update them independently of the delegate image.

## Viewing Logs

The delegate logs init script execution to the main `delegate.log` file, making it easy to troubleshoot any issues that occur during initialization.

Default log locations:

- **macOS/Linux:** `~/.harness-delegate/logs/delegate.log`
- **Windows:** `C:\HarnessDelegate\logs\delegate.log`

If you configured a custom working directory using `--workdir` or `HARNESS_WORKDIR`, find the logs at `{workdir}/logs/delegate.log`.

Review these logs to verify your init script executed successfully or to diagnose any errors that occurred during startup.

## See Also

- [Install Delegate on macOS](./install-a-delegate/install-delegate-macos) - Complete installation guide
- [Delegate Overview](./delegate-overview) - Architecture and capabilities
- [Configure Custom Working Directory](./install-a-delegate/install-delegate-macos#configure-custom-working-directory) - macOS working directory configuration
