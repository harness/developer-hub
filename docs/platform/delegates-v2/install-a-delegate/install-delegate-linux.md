---
title: Install a Local Delegate on Linux
description: Learn how to install and configure the Harness Delegate on a Linux machine
sidebar_position: 2
---

:::warning Closed Beta
The new Harness Delegate is currently in closed beta and available only to select users. Access is determined by the product team. See [Feature Parity](/docs/platform/delegates-v2/feature-parity) for current supported use cases.
:::

This guide walks you through installing the Harness Delegate on a Linux machine. Skip to the [End-to-End Demo](#end-to-end-demo) to watch video instructions instead. For supported connectors, CI steps, secret managers, and module support by deployment type, see the [Feature Parity](/docs/platform/delegates-v2/feature-parity) page — that's the single source of truth, kept up to date as support expands.

:::info
To learn more about the new delegate, including architecture and how it compares to the legacy delegate, see the [New Delegate Overview](../delegate-overview).
:::

## Quick Reference

| Command | Description |
|---------|-------------|
| `./delegate server --env-file config.env` | Start the delegate |
| `nohup ./delegate server --env-file config.env > nohup-delegate.out 2>&1 &` | Start in the background |

**Important file locations:**

| Item | Path |
|------|------|
| **Config File** | `./config.env` (where you created it) |
| **Logs** | `./nohup-delegate.out` |

---

## Get Harness Credentials

Before installation, obtain your Account ID, Delegate Token, and Harness URL.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/Get-Delegate-2-0-Credentials-41d069778e3e421d8791dd4dcc8ab793" title="Get credentials for the new delegate" />

</TabItem>
<TabItem value="Step-by-Step" default>

1. **Open Delegate settings:** In the left nav, click **Project Settings**, then under **Project-level Resources**, click **Delegates**.
2. **Create a new delegate:** Click **+ New Delegate** and choose **Docker** as your delegate type.
3. **Copy the credentials** from the `docker run` command:
   - `ACCOUNT_ID` → Your Account ID
   - `DELEGATE_TOKEN` → Your Delegate Token
   - `MANAGER_HOST_AND_PORT` → Your Harness URL

   ![](../static/ui-delegate-installer.png)

:::tip
Keep these values ready — you'll use them in the configuration file.
:::

</TabItem>
</Tabs>

---

## Download and Install the Delegate

### Step 1: Download the Binary

For **arm64**:

```bash
curl -L "https://app.harness.io/public/shared/delegates/1.35.0/delegate-linux-arm64" -o delegate
chmod +x delegate
```

For **amd64**:

```bash
curl -L "https://app.harness.io/public/shared/delegates/1.35.0/delegate-linux-amd64" -o delegate
chmod +x delegate
```

### Step 2: Create Configuration File

Create a `config.env` file with the credentials you obtained from the [previous step](#get-harness-credentials):

```bash
cat > config.env <<EOF
HARNESS_ACCOUNT_ID="[Your Account ID]"
HARNESS_TOKEN="[Your Delegate Token]"
HARNESS_URL="[Your Harness URL]"
HARNESS_NAME="[Your Delegate Name]"
EOF
```

:::info
If you don't specify `HARNESS_NAME`, the delegate defaults to `harness-delegate`.
:::

**Optional: Add tags**

Tags are useful for routing specific pipelines to this delegate:

```bash
cat > config.env <<EOF
HARNESS_ACCOUNT_ID="[Your Account ID]"
HARNESS_TOKEN="[Your Delegate Token]"
HARNESS_URL="[Your Harness URL]"
HARNESS_NAME="[Your Delegate Name]"
HARNESS_TAGS="production,linux"
EOF
```

### Step 3: Start the Delegate

Run in the background:

```bash
nohup ./delegate server --env-file config.env > nohup-delegate.out 2>&1 &
```

### Step 4: Verify Installation

Check the logs:

```bash
tail -f nohup-delegate.out
```

Navigate to **Project Settings** > **Delegates** in the Harness UI. You should see your delegate with a **Connected** status.

---

## Additional Configuration

### Proxy Configuration

The delegate inherits system-level proxies by default, but you can set a custom proxy through the delegate config. Edit `config.env` and add:

```bash
PROXY_HOST=3.139.239.136
PROXY_PORT=3128
PROXY_SCHEME=http
PROXY_USER=proxy_user
PROXY_PASSWORD=password
NO_PROXY="localhost,127.0.0.1,.corp.local,10.0.0.0/8"
```

Alternatively, set environment variables:

```bash
export HTTP_PROXY="http://USER:PASSWORD@PROXY_HOST:PORT"
export HTTPS_PROXY="http://USER:PASSWORD@PROXY_HOST:PORT"
export NO_PROXY="localhost,127.0.0.1,.corp.local,10.0.0.0/8"
```

### Manual Plugin Installation

Some CI steps can run directly on the host. Harness automatically downloads required plugins, but manual installation is needed when your infrastructure lacks internet connectivity (e.g., behind a proxy or firewall).

1. **Download the plugin** from its source (e.g., [drone-git v1.7.6](https://github.com/wings-software/drone-git/releases/tag/v1.7.6)).
2. **Decompress:** `zstd -d plugin-linux-arm64.zst` (or `plugin-linux-amd64.zst`).
3. **Move to the plugins directory:**

   ```bash
   mkdir -p ./default/plugin/drone-git/
   mv plugin-linux-* ./default/plugin/drone-git/
   chmod +x ./default/plugin/drone-git/plugin-linux-*
   ```

---

## Manage the Delegate

- **Stop:** Find and kill the process using `ps` and `kill` commands.
- **Upgrade:**
  1. **Download the new binary:** Replace the existing `delegate` file.
  2. **Kill the existing process.**
  3. **Start with the command** from [Step 3](#step-3-start-the-delegate).

---

## Configure Pipeline Delegate

For the CI stages that you want to use the new delegate with, [define the stage variable](/docs/platform/variables-and-expressions/add-a-variable/#define-variables) `HARNESS_CI_INTERNAL_ROUTE_TO_RUNNER` and set it to `true`.

Then, [set your pipeline's build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure#set-the-pipelines-build-infrastructure) as usual. Ensure that you have set **Local** as the **Infrastructure** and that the **Operating System** and **Architecture** match the delegate you installed.

## Delegate Configuration

The `config.env` file location:

- **Default:** Location where you created it
- **Custom workdir:** `{workdir}/config.env`

For configuration options that apply across all platforms — including stage capacity limits, graceful shutdown, containerless steps, init scripts, log rotation, metrics, and token management — see the [Delegate Configuration Reference](./configure-delegate).

### Configure Custom Working Directory

By default, the delegate stores its configuration files, logs, and cache in the current working directory.

Set the `HARNESS_WORKDIR` environment variable before running the binary:

```bash
export HARNESS_WORKDIR=/custom/path/to/workdir
./delegate server --env-file config.env
```

The delegate automatically creates the directory and subdirectories. Ensure the delegate process has read/write permissions for this directory.

## Debugging

### Logs

You can find the delegate logs in the following locations:

- **Default:** `nohup-delegate.out`
- **Custom workdir:** `{workdir}/logs/delegate.log`

**View logs in real time:**

```bash
tail -f nohup-delegate.out
```

## Upgrading the Delegate

There is currently no automated upgrade mechanism for the new delegate. The upgrade process involves stopping the delegate, downloading the latest binary, and restarting it.

1. **Stop the running delegate** (kill the process).
2. **Download the latest binary** from the [installation step](#step-1-download-the-binary), replacing the existing `delegate` file.
3. **Start the delegate** using the command from [Step 3](#step-3-start-the-delegate).
