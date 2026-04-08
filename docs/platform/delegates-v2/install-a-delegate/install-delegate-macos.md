---
title: Install a Local Delegate on macOS
description: Learn how to install and configure the Harness Delegate on a macOS machine
sidebar_position: 1
redirect_from:
  - /docs/continuous-integration/use-ci/set-up-build-infrastructure/install-delegate-2-0
  - /docs/platform/delegates/delegate-v2/install-delegate-2-0
  - /docs/platform/delegates-v2/install-delegate-2-0
  - /docs/platform/delegates-v2/install-delegate/install-delegate-macos
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning Closed Beta
The new Harness Delegate is currently in closed beta and available only to select users. Access is determined by the product team. See [Feature Parity](/docs/platform/delegates-v2/feature-parity) for current supported use cases.
:::

This guide walks you through installing the Harness Delegate on a macOS machine. For other platforms, see the [Linux](./install-delegate-linux) and [Windows](./install-delegate-windows) installation guides. For supported connectors, CI steps, secret managers, and module support by deployment type, see the [Feature Parity](/docs/platform/delegates-v2/feature-parity) page — that's the single source of truth, kept up to date as support expands.

:::info
To learn more about the new delegate, including architecture and how it compares to the legacy delegate, see the [New Delegate Overview](../delegate-overview).
:::

## Quick Reference

| Command | Description |
|---------|-------------|
| `./delegate install` | Install and register the service |
| `./delegate start` | Start the delegate service |
| `./delegate stop` | Stop the service gracefully |
| `./delegate status` | Show delegate status and details |
| `./delegate uninstall` | Uninstall service (preserves config/logs) |

**Important file locations:**

| Mode | Config File | Logs | Service Definition |
|------|-------------|------|-------------------|
| **LaunchAgent** | `~/.harness-delegate/config.env` | `~/.harness-delegate/logs/` | `~/Library/LaunchAgents/harness-delegate.plist` |
| **LaunchDaemon** | `/opt/harness-delegate/config.env` | `/opt/harness-delegate/logs/` | `/Library/LaunchDaemons/harness-delegate.plist` |

---

## Get Harness Credentials

Before installation, obtain your Account ID, Delegate Token, and Harness URL.

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
Keep these values ready — you'll use them in the installation command.
:::

</TabItem>
</Tabs>

---

## Download and Install the Delegate

:::info Service Modes
The macOS delegate supports two installation modes:
- **LaunchAgent (User Service):** Default mode. Runs when you're logged in. Enable auto-login (see [Step 5](#step-5-enable-auto-login-launchagent-only)) to ensure it starts after reboots.
- **LaunchDaemon (System Service):** Available in version 1.34.0+. Runs at system boot without a GUI session. Recommended for EC2 macOS instances or environments where security policies prohibit auto-login.
:::

### Step 1: Download the Binary

Replace `<VERSION>` with the latest version (e.g., `1.34.0`).

For **arm64** (Apple Silicon):

```bash
curl -L "https://app.harness.io/public/shared/delegates/<VERSION>/delegate-darwin-arm64" -o delegate
chmod +x delegate
```

For **amd64** (Intel):

```bash
curl -L "https://app.harness.io/public/shared/delegates/<VERSION>/delegate-darwin-amd64" -o delegate
chmod +x delegate
```

Example using version 1.34.0:

```bash
curl -L "https://app.harness.io/public/shared/delegates/1.34.0/delegate-darwin-arm64" -o delegate
```

### Step 2: Install with Credentials

Run the install command with the credentials you obtained from the [previous step](#get-harness-credentials). Choose the service mode that matches your environment.

#### Option A: LaunchAgent (User Service) — Default

The delegate runs as a user-level service. It starts when you log in and stops when you log out.

```bash
./delegate install --account=[Your Account ID] \
                   --token=[Your Delegate Token] \
                   --url=[Your Harness URL] \
                   --name=[Your Delegate Name]
```

#### Option B: LaunchDaemon (System Service) — Version 1.34.0+

The delegate runs as a system-level service that starts at boot without requiring a GUI session. This mode is recommended for EC2 macOS instances and environments where security policies prohibit auto-login.

All LaunchDaemon operations require `sudo` because the delegate interacts with the system domain (`/Library/LaunchDaemons/`) instead of the user domain. The `--user` flag specifies the macOS user account the delegate process runs as.

```bash
sudo ./delegate install --account=[Your Account ID] \
                        --token=[Your Delegate Token] \
                        --url=[Your Harness URL] \
                        --name=[Your Delegate Name] \
                        --mode=system \
                        --user=[Your macOS Username]
```

:::info
If you don't specify a name, the delegate defaults to `harness-delegate`.
:::

**Optional: Add tags for delegate selection**

Tags are useful for routing specific pipelines to this delegate:

```bash
./delegate install --account=[Your Account ID] \
                   --token=[Your Delegate Token] \
                   --url=[Your Harness URL] \
                   --name=[Your Delegate Name] \
                   --tags="production,macos"
```

For LaunchDaemon mode, add `sudo`, `--mode=system`, and `--user`:

```bash
sudo ./delegate install --account=[Your Account ID] \
                        --token=[Your Delegate Token] \
                        --url=[Your Harness URL] \
                        --name=[Your Delegate Name] \
                        --mode=system \
                        --user=[Your macOS Username] \
                        --tags="production,macos"
```

<details>
<summary>View all available installation options</summary>

```bash
./delegate install --help
```

- **`--account`:** Your Harness account ID **(required)**
- **`--token`:** Delegate authentication token **(required)**
- **`--url`:** Harness server URL **(required)**
- **`--name`:** Custom delegate name (default: `harness-delegate`)
- **`--tags`:** Comma-separated tags for delegate selection (optional)
- **`--mode`:** Service mode: `system` for LaunchDaemon, omit for default LaunchAgent (optional, version 1.34.0+)
- **`--user`:** macOS user account the delegate process runs as (required when `--mode=system`)
- **`--env-file`:** Path to config file (default: `~/.harness-delegate/config.env`)
- **`--graceful-exit-timeout`:** Shutdown timeout in seconds (default: 300)
- **`--auto-restart-on-failure`:** Auto-restart on failure (default: true)

</details>

**What this command creates:**

LaunchAgent mode:
- **Workspace directory:** `~/.harness-delegate`
- **Configuration file:** `~/.harness-delegate/config.env`
- **Service definition:** `~/Library/LaunchAgents/harness-delegate.plist`

LaunchDaemon mode:
- **Workspace directory:** `/opt/harness-delegate`
- **Configuration file:** `/opt/harness-delegate/config.env`
- **Service definition:** `/Library/LaunchDaemons/harness-delegate.plist`

### Step 3: Start the Service

For LaunchAgent mode:

```bash
./delegate start
```

For LaunchDaemon mode:

```bash
sudo ./delegate start
```

You should see a success message with the config location and log file path.

![](../static/mac-delegate-start.png)

### Step 4: Verify Installation

Check the delegate status:

```bash
./delegate status
```

![](../static/mac-delegate-status.png)

View logs in real time:

```bash
tail -f ~/.harness-delegate/logs/delegate.log
```

For LaunchDaemon mode:

```bash
tail -f /opt/harness-delegate/logs/delegate.log
```

Navigate to **Project Settings** > **Delegates** in the Harness UI. You should see your delegate with a **Connected** status.

![](../static/delegate-listing.png)

### Step 5: Enable Auto-Login (LaunchAgent Only)

:::tip Skip for LaunchDaemon
If you installed the delegate as a LaunchDaemon (system service), skip this step. The daemon starts automatically at boot without requiring a user session.
:::

Since the LaunchAgent delegate runs as a user service, enable auto-login to ensure it starts after system reboots:

1. **Open System Settings** (or System Preferences on older macOS).
2. **Navigate to Users & Groups.**
3. **Click the lock icon** and authenticate.
4. **Select Login Options.**
5. **Set Automatic login** to your user account.

---

## Additional Configuration

### Update Delegate Settings

For LaunchAgent mode:

1. **Stop the service:** `./delegate stop`
2. **Edit the config:** `nano ~/.harness-delegate/config.env`
3. **Start the service:** `./delegate start`

For LaunchDaemon mode:

1. **Stop the service:** `sudo ./delegate stop`
2. **Edit the config:** `sudo nano /opt/harness-delegate/config.env`
3. **Start the service:** `sudo ./delegate start`

### Docker Configuration for Container-Based Steps

If you plan to use Docker with container-based CI steps on macOS, configure your Docker runtime settings to avoid permission-related issues. The delegate requires proper filesystem access between your local machine and the Docker VM.

#### Docker / Rancher Desktop

For optimal compatibility, configure the following settings in your Docker/Rancher Desktop preferences:

1. **Filesystem Mount Type:** Select **reverse-sshfs** as your mount type. Go to **Preferences** > **Virtual Machine** > **Volumes** tab and choose reverse-sshfs instead of 9p or virtiofs.

2. **Virtual Machine Type:** Select **QEMU** as your emulation type. Go to **Preferences** > **Virtual Machine** > **Emulation** tab and choose QEMU instead of VZ (Apple Virtualization framework).

![Rancher Desktop Preferences Configuration](../static/rancher-desktop-preferences.png)

These settings ensure proper permission mapping between your local filesystem and the Docker VM. Without them, you may encounter "Permission denied" errors when running containerized steps.

#### Colima

If you are using [Colima](https://github.com/abiosoft/colima) as your Docker runtime on macOS, start it with the following recommended settings:

```bash
colima start --vm-type qemu --mount-type sshfs --cpu 8 --memory 20 --mount ~:w --mount /private/tmp:/private/tmp:w
```

This ensures the VM uses QEMU emulation and sshfs mounts, which provide the correct filesystem permission mapping needed by the delegate. The `--mount ~:w` flag grants write access to your home directory, and `--mount /private/tmp:/private/tmp:w` mounts the engine's temporary directory so the delegate can read output files written by containerized steps.

:::warning Mounting /private/tmp is required
Unlike Rancher Desktop, which automatically maps system directories into the VM, Colima only mounts your home directory by default. The delegate uses `/tmp/` (which resolves to `/private/tmp/` on macOS) to exchange output files between containerized steps and the host. Without this mount, pipelines that export output variables from container-based steps will fail with an error like:

```
stat /tmp/engine/<hash>-output.env: no such file or directory
```

If you still encounter this error after adding the mount flag, SSH into the Colima VM and create the directory manually:

```bash
colima ssh -- sudo mkdir -p /private/tmp/engine
```
:::

### Proxy Configuration

The delegate inherits system-level proxies by default, but you can set a custom proxy through the delegate config. Edit the delegate's `config.env` file (see [file locations](#quick-reference) for the path based on your service mode) and add:

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
2. **Decompress:** `zstd -d plugin-darwin-arm64.zst` (or `plugin-darwin-amd64.zst` for Intel).
3. **Move to the plugins directory:**

   ```bash
   mkdir -p ~/.harness-delegate/default/plugin/drone-git/
   mv plugin-darwin-* ~/.harness-delegate/default/plugin/drone-git/
   chmod +x ~/.harness-delegate/default/plugin/drone-git/plugin-darwin-*
   ```

---

## Manage the Delegate

- **Stop:** `./delegate stop` — Gracefully shuts down (waits up to 5 minutes for tasks to complete). Use `sudo ./delegate stop` for LaunchDaemon mode.
- **Uninstall:** `./delegate uninstall` — Removes service registration (preserves config, logs, and binary).
- **Upgrade:**
  1. **Download the new binary:** Replace the existing `delegate` file.
  2. **Stop the delegate:** `./delegate stop`
  3. **Start the delegate:** `./delegate start`

---

## Configure Pipeline Delegate

For the CI stages that you want to use the new delegate with, [define the stage variable](/docs/platform/variables-and-expressions/add-a-variable/#define-variables) `HARNESS_CI_INTERNAL_ROUTE_TO_RUNNER` and set it to `true`.

Then, [set your pipeline's build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure#set-the-pipelines-build-infrastructure) as usual. Ensure that you have set **Local** as the **Infrastructure** and that the **Operating System** and **Architecture** match the delegate you installed.

## Delegate Configuration

The `config.env` file location depends on your service mode:

- **LaunchAgent (default):** `~/.harness-delegate/config.env`
- **LaunchDaemon:** `/opt/harness-delegate/config.env`
- **Custom workdir:** `{workdir}/config.env`

For configuration options that apply across all platforms — including stage capacity limits, graceful shutdown, containerless steps, init scripts, log rotation, metrics, and token management — see the [Delegate Configuration Reference](./configure-delegate).

### Configure Custom Working Directory

By default, the delegate stores its configuration files, logs, and cache in a standard location.

**Default locations:**

- **LaunchAgent:** `~/.harness-delegate`
- **LaunchDaemon:** `/opt/harness-delegate`

**How to configure:**

Use the `--workdir` flag during installation:

```bash
./delegate install --account=[Account ID] \
                   --token=[Delegate Token] \
                   --url=[Harness URL] \
                   --name=[Your Delegate Name] \
                   --workdir=/custom/path/to/workdir
```

Or set the `HARNESS_WORKDIR` environment variable before running the binary directly:

```bash
export HARNESS_WORKDIR=/custom/path/to/workdir
./delegate server --env-file config.env
```

The delegate automatically creates the directory and subdirectories. Ensure the delegate process has read/write permissions for this directory.

## Debugging

### Logs

You can find the delegate logs in the following locations:

- **LaunchAgent (default):** `~/.harness-delegate/logs/delegate.log`
- **LaunchDaemon:** `/opt/harness-delegate/logs/delegate.log`
- **Custom workdir:** `{workdir}/logs/delegate.log`

**View logs in real time:**

LaunchAgent:

```bash
tail -f ~/.harness-delegate/logs/delegate.log
```

LaunchDaemon:

```bash
tail -f /opt/harness-delegate/logs/delegate.log
```

## Upgrading the Delegate

There is currently no automated upgrade mechanism for the new delegate. The upgrade process involves stopping the delegate, downloading the latest binary, and starting it again.

1. **Stop the running delegate.**
2. **Download the latest binary** from the [installation step](#step-1-download-the-binary), replacing the existing `delegate` file.
3. **Start the delegate.**

## Troubleshooting

### Docker Client Not Initialized

If your Local (Docker) infrastructure stages fail with a **"docker client is not initialized"** error, the delegate is likely using the wrong Docker socket path. This commonly occurs when using Rancher Desktop as your Docker runtime, where the Docker socket symlink must be recreated after every restart.

Identify the correct Docker socket path for your runtime:

```bash
docker context ls
```

This outputs a table showing each configured Docker context and its socket endpoint:

```
NAME                DESCRIPTION                               DOCKER ENDPOINT                                   ERROR
default             Current DOCKER_HOST based configuration   unix:///var/run/docker.sock
desktop-linux       Docker Desktop                            unix:///Users/myUser/.docker/run/docker.sock
rancher-desktop *   Rancher Desktop moby context              unix:///Users/myUser/.rd/docker.sock
```

Find the context that matches your active Docker runtime (marked with `*`), and copy its `DOCKER ENDPOINT` value. Then add it to `config.env`:

```bash
DOCKER_HOST="unix:///Users/myUser/.rd/docker.sock"
```

Replace the path with the correct socket endpoint for your setup. Restart the delegate for the change to take effect.

:::tip Rancher Desktop users
If you're using Rancher Desktop and see this error after restarting it, the Docker socket symlink may need to be recreated:

```bash
sudo rm /var/run/docker.sock
sudo ln -s ~/.rd/docker.sock /var/run/docker.sock
```
:::

### Output Variable Errors with Colima

If a pipeline step running inside a container exports an output variable and you see an error like:

```
stat /tmp/engine/<hash>-output.env: no such file or directory
```

The delegate writes output `.env` files to `/tmp/engine/` on the host, which resolves to `/private/tmp/engine` on macOS. Colima only mounts your home directory into the underlying Lima VM by default, so the host cannot read files written by the container to this path.

Restart Colima with an explicit mount for the engine directory:

```bash
colima start --vm-type qemu --mount-type sshfs --mount ~:w --mount /private/tmp/engine:/private/tmp/engine:w
```

If the error persists, the `/private` directory may not exist inside the Linux VM. Create it manually:

```bash
colima ssh -- sudo mkdir -p /private/tmp/engine
```

For full Colima configuration details, see the [Colima section](#colima) under Additional Configuration.
