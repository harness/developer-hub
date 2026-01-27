---
title: Install Harness Delegate
description: Learn how to install a Delegate for local machines
sidebar_position: 2
redirect_from:
  - /docs/continuous-integration/use-ci/set-up-build-infrastructure/install-delegate-2-0
  - /docs/platform/delegates/delegate-v2/install-delegate-2-0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<style>
{`
  .tabs--full-width {
    width: 100%;
  }
  .tabs--full-width .tabs__item {
    flex: 1;
    text-align: center;
    justify-content: center;
  }
`}
</style>

:::warning Closed Beta

The new Harness Delegate is currently in closed beta and is available to select customers only. Access is determined by the product team, and is based on current [supported use cases and steps](#whats-supported).

:::

This guide describes how to install the new Harness Delegate to local machines. Skip to the [End to End Demo](#end-to-end-demo) if you want to watch video instructions for the new delegate installation.

:::info
To learn more about the new delegate, including architecture, capabilities, and how it compares to the legacy delegate, go to:
- [New Delegate Overview](./delegate-overview) - Complete guide to the new delegate
- [Feature Parity](./feature-parity) - Detailed feature comparison
:::

:::info Important

The new Harness Delegate is under **Beta** and can only be used for Mac Build, Android Build, and CI Stage Pipelines with limited sets of steps and connector support.

:::

## What's Supported

### Supported Connectors

| Connector          | Caveats                                                                 |
|--------------------|-------------------------------------------------------------------------|
| Docker Registry    | Only the DockerHub provider type                                        |
| Github             | Does not work with Github App OAuth.                                    |
| HashiCorp Vault    | Only AppRole and Token Auth; set Renewal Interval to 0 (zero)           |
| AWS Secrets Manager| Only Access Key and IAM Role Credential Type                            |

### Supported CI Steps

| Step Name  | Caveats              |
|------------|----------------------|
| Git Clone  | Github and Bitbucket |
| Run        |                      |
| Background |                      |
| Run Tests  |                      |
| Upload to Artifactory | Requires `jfrog` CLI on host |
| Upload to GCS |                   |
| Upload to S3 |                    |
| Upload Artifacts to Harness Artifact Registry|     |
| Save Cache to S3 |                |
| Save Cache to GCS |               |
| Restore Cache from S3 |           |
| Restore Cache from GCS |          |

## Delegate Installation Instructions

## Quick Reference

| Command | Description |
|---------|-------------|
| `./delegate install` | Install and register the service |
| `./delegate start` | Start the delegate service |
| `./delegate stop` | Stop the service gracefully |
| `./delegate status` | Show delegate status and details |
| `./delegate uninstall` | Uninstall service (preserves config/logs) |

**Important file locations:**

| OS | Config File | Logs | Service Definition |
|----|-------------|------|-------------------|
| **MacOS** | `~/.harness-delegate/config.env` | `~/.harness-delegate/logs/` | `~/Library/LaunchAgents/harness-delegate.plist` |
| **Linux** | `./config.env` | `./nohup-delegate.out` | N/A (runs in foreground/background) |
| **Windows** | `C:\HarnessDelegate\config.env` | `C:\HarnessDelegate\logs\` | Windows Service Control Manager |

---

### Get Harness Credentials

Before installation, obtain your Account ID, Delegate Token, and Harness URL:

<Tabs className="tabs--full-width">
<TabItem value="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/Get-Delegate-2-0-Credentials-41d069778e3e421d8791dd4dcc8ab793" title="Get credentials for the new delegate" />

</TabItem>
<TabItem value="Step-by-Step" default>

1. In the left nav, click **Project Settings**.
2. Under **Project-level Resources**, click **Delegates**.
3. Click **+ New Delegate**.
4. Choose **Docker** as your delegate type.
5. Copy the values from the `docker run` command:
   - `ACCOUNT_ID` → Your Account ID
   - `DELEGATE_TOKEN` → Your Delegate Token  
   - `MANAGER_HOST_AND_PORT` → Your Harness URL

   ![](./static/ui-delegate-installer.png)

:::tip
Keep these values ready - you'll use them in the installation command.
:::

</TabItem>
</Tabs>

### Download and Install the Delegate

Download and install the correct binary for your OS.

<Tabs className="tabs--full-width">
<TabItem value="MacOS">

:::info
The delegate runs as a user service (LaunchAgent), not a system service. It only runs when you're logged in. Enable auto-login (see step 5) to ensure it starts after system reboots.
:::

1. **Download the delegate binary**

   Replace `<VERSION>` with the latest version (e.g., `1.28.0`):

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

   Example using version 1.28.0:
   ```bash
   curl -L "https://app.harness.io/public/shared/delegates/1.28.0/delegate-darwin-arm64" -o delegate
   ```

2. **Install the delegate with your credentials**

   Run the install command with the credentials you obtained from the [previous step](#get-harness-credentials):

   ```bash
   ./delegate install --account=[Your Account ID] \
                      --token=[Your Delegate Token] \
                      --url=[Your Harness URL] \
                      --name=[Your Delegate Name]
   ```

   :::info
   If you don't specify a name, the delegate will default to `harness-delegate`.
   :::

   **Optional: Add tags for delegate selection**
   
   Tags are optional but useful for routing specific pipelines to this delegate:
   
   ```bash
   ./delegate install --account=[Your Account ID] \
                      --token=[Your Delegate Token] \
                      --url=[Your Harness URL] \
                      --name=[Your Delegate Name] \
                      --tags="production,macos"
   ```

   <details>
   <summary>View all available installation options</summary>

   ```bash
   ./delegate install --help
   ```

   Available options:
   - `--account` - Your Harness account ID **(required)**
   - `--token` - Delegate authentication token **(required)**
   - `--url` - Harness server URL **(required)**
   - `--name` - Custom delegate name (default: `harness-delegate`)
   - `--tags` - Comma-separated tags for delegate selection (optional)
   - `--env-file` - Path to config file (default: `~/.harness-delegate/config.env`)
   - `--graceful-exit-timeout` - Shutdown timeout in seconds (default: 300)
   - `--auto-restart-on-failure` - Auto-restart on failure (default: true) 

   </details>

   **What this command creates:**
   - Workspace directory: `~/.harness-delegate`
   - Configuration file: `~/.harness-delegate/config.env`
   - LaunchAgent service: `~/Library/LaunchAgents/harness-delegate.plist`

3. **Start the delegate service**

   ```bash
   ./delegate start
   ```

   You should see a success message with the config location and log file path.

   ![](./static/mac-delegate-start.png)

4. **Verify the delegate is running**

   Check the status:

   ```bash
   ./delegate status
   ```

   ![](./static/mac-delegate-status.png)

   View logs in real-time:

   ```bash
   tail -f ~/.harness-delegate/logs/delegate.log
   ```

   Navigate to **Project Settings** > **Delegates** in Harness UI. You should see your delegate with a **Connected** status.

   ![](./static/delegate-listing.png)

5. **Enable auto-login (Recommended)**

   Since the delegate runs as a user service, enable auto-login to ensure it starts after system reboots:

   1. Open **System Settings** (or **System Preferences** on older macOS)
   2. Go to **Users & Groups**
   3. Click the lock icon and authenticate
   4. Select **Login Options**
   5. Set **Automatic login** to your user account

#### Additional Configuration

**Update delegate settings:**

1. Stop the service: `./delegate stop`
2. Edit the config: `nano ~/.harness-delegate/config.env`
3. Start the service: `./delegate start`

**Docker configuration for container-based steps:**

If you plan to use Docker with container-based CI steps on macOS, you need to configure your Docker Desktop or Rancher Desktop settings to avoid permission-related issues. The delegate requires proper filesystem access between your local machine and the Docker VM.

For optimal compatibility, configure the following settings in your Docker runtime preferences:

1. **Filesystem Mount Type**: Select **reverse-sshfs** as your mount type
   - In Rancher Desktop: Go to **Preferences** > **Virtual Machine** > **Volumes** tab  
   - Choose reverse-sshfs instead of 9p or virtiofs

2. **Virtual Machine Type**: Select **QEMU** as your emulation type
   - In Rancher Desktop: Go to **Preferences** > **Virtual Machine** > **Emulation** tab
   - Choose the QEMU option instead of VZ (Apple Virtualization framework)

![Rancher Desktop Preferences Configuration](./static/rancher-desktop-preferences.png)

These settings ensure proper permission mapping between your local filesystem and the Docker VM. Without them, you may encounter "Permission denied" errors when running containerized steps, as the default mount configurations don't always map filesystem permissions correctly.

**Proxy configuration:**

If you need proxy settings, add them to `~/.harness-delegate/config.env`. See [Configure Delegate Proxy Settings](/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings).

**Manual plugin installation:**

Some CI steps can run directly on the host. Harness automatically downloads required plugins, but manual installation is needed when your infrastructure lacks internet connectivity (e.g., behind a proxy or firewall).

To manually install a plugin:

1. Download the plugin from its source (e.g., [drone-git v1.7.6](https://github.com/wings-software/drone-git/releases/tag/v1.7.6))
2. Decompress: `zstd -d plugin-darwin-arm64.zst` (or `plugin-darwin-amd64.zst` for Intel)
3. Move to plugins directory:
   ```bash
   mkdir -p ~/.harness-delegate/default/plugin/drone-git/
   mv plugin-darwin-* ~/.harness-delegate/default/plugin/drone-git/
   chmod +x ~/.harness-delegate/default/plugin/drone-git/plugin-darwin-*
   ```

#### Manage the Delegate

**Stop:** `./delegate stop` - Gracefully shuts down (waits up to 5 minutes for tasks to complete)

**Uninstall:** `./delegate uninstall` - Removes service registration (preserves config, logs, and binary)

**Upgrade:**
1. Download new binary (replace existing `delegate` file)
2. `./delegate stop`
3. `./delegate start`

</TabItem>

<TabItem value="Linux">

1. **Download the delegate binary**

   For **arm64**:
   ```bash
   curl -L "https://app.harness.io/public/shared/delegates/1.28.0/delegate-linux-arm64" -o delegate
   chmod +x delegate
   ```

   For **amd64**:
   ```bash
   curl -L "https://app.harness.io/public/shared/delegates/1.28.0/delegate-linux-amd64" -o delegate
   chmod +x delegate
   ```

2. **Create configuration file**

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
   If you don't specify `HARNESS_NAME`, the delegate will default to `harness-delegate`.
   :::

   **Optional: Add tags**
   
   Tags are optional but useful for routing specific pipelines:
   
   ```bash
   cat > config.env <<EOF
   HARNESS_ACCOUNT_ID="[Your Account ID]"
   HARNESS_TOKEN="[Your Delegate Token]"
   HARNESS_URL="[Your Harness URL]"
   HARNESS_NAME="[Your Delegate Name]"
   HARNESS_TAGS="production,linux"
   EOF
   ```

3. **Start the delegate**

   Run in the background:

   ```bash
   nohup ./delegate server --env-file config.env > nohup-delegate.out 2>&1 &
   ```

4. **Verify the delegate is running**

   Check the logs:

   ```bash
   tail -f nohup-delegate.out
   ```

   Navigate to **Project Settings** > **Delegates** in Harness UI. You should see your delegate with a **Connected** status.

#### Additional Configuration

**Proxy configuration:**

If you need proxy settings, add them to `config.env`. See [Configure Delegate Proxy Settings](/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings).

**Manual plugin installation:**

Some CI steps can run directly on the host. Harness automatically downloads required plugins, but manual installation is needed when your infrastructure lacks internet connectivity (e.g., behind a proxy or firewall).

To manually install a plugin:

1. Download the plugin from its source (e.g., [drone-git v1.7.6](https://github.com/wings-software/drone-git/releases/tag/v1.7.6))
2. Decompress: `zstd -d plugin-linux-arm64.zst` (or `plugin-linux-amd64.zst`)
3. Move to plugins directory:
   ```bash
   mkdir -p ./default/plugin/drone-git/
   mv plugin-linux-* ./default/plugin/drone-git/
   chmod +x ./default/plugin/drone-git/plugin-linux-*
   ```

#### Manage the Delegate

**Stop:** Find and kill the process using `ps` and `kill` commands

**Upgrade:**
1. Download new binary (replace existing `delegate` file)
2. Kill the existing process
3. Start with the command from step 3

</TabItem>
<TabItem value="Windows">

:::info
The delegate runs under the LocalSystem account.
:::

1. **Download the delegate binary**

   Open **PowerShell as Administrator**:
   - Press **Windows Key + X**
   - Select **"Windows PowerShell (Admin)"** or **"Terminal (Admin)"**

   Replace `<VERSION>` with the latest version (e.g., `1.28.0`):

   ```powershell
   Invoke-WebRequest -Uri "https://app.harness.io/public/shared/delegates/<VERSION>/delegate-windows-amd64.exe" -o delegate
   ```

   :::note
   In Command Prompt, use: `curl -L "https://app.harness.io/public/shared/delegates/<VERSION>/delegate-windows-amd64.exe" -o delegate`
   :::

2. **Install the delegate with your credentials**

   Run the install command with the credentials you obtained from the [previous step](#get-harness-credentials):

   ```powershell
   .\delegate install --account=[Your Account ID] `
                          --token=[Your Delegate Token] `
                          --url=[Your Harness URL] `
                          --name=[Your Delegate Name]
   ```

   :::info
   If you don't specify a name, the delegate will default to `harness-delegate`.
   :::

   **Optional: Add tags for delegate selection**
   
   Tags are optional but useful for routing specific pipelines to this delegate:
   
   ```powershell
   .\delegate install --account=[Your Account ID] `
                     --token=[Your Delegate Token] `
                     --url=[Your Harness URL] `
                     --name=[Your Delegate Name] `
                     --tags="production,windows"
   ```

   <details>
   <summary>View all available installation options</summary>

   ```powershell
   .\delegate install --help
   ```

   Available options:
   - `--account` - Your Harness account ID **(required)**
   - `--token` - Delegate authentication token **(required)**
   - `--url` - Harness server URL **(required)**
   - `--name` - Custom delegate name (default: `harness-delegate`)
   - `--tags` - Comma-separated tags for delegate selection (optional)
   - `--env-file` - Path to config file (default: `C:\HarnessDelegate\config.env`)
   - `--auto-restart-on-failure` - Auto-restart on failure (default: true)

   </details>

   **What this command creates:**
   - Workspace directory: `C:\HarnessDelegate`
   - Configuration file: `C:\HarnessDelegate\config.env`
   - Windows service registered in Service Control Manager

3. **Start the delegate service**

   ```powershell
   .\delegate start
   ```

   You should see a success message with the config location and log file path.

4. **Verify the delegate is running**

   Check the status:

   ```powershell
   .\delegate status
   ```

   Or use Windows native commands:

   ```powershell
   Get-Service "harness-delegate"
   ```

   View logs in real-time:

   ```powershell
   Get-Content -Path "C:\HarnessDelegate\logs\delegate.log" -Tail 10 -Wait
   ```

   Navigate to **Project Settings** > **Delegates** in Harness UI. You should see your delegate with a **Connected** status.

#### Additional Configuration

**Update delegate settings:**

1. Stop the service: `.\delegate stop`
2. Edit the config: `notepad C:\HarnessDelegate\config.env`
3. Start the service: `.\delegate start`

**Proxy configuration:**

The delegate inherits system-level proxies by default, but you can set a custom proxy configuration through the delegate config.

There are different ways to set up a proxy:

1. **Delegate Config (Recommended)**

   Edit `C:\HarnessDelegate\config.env` and add:

   ```bash
   PROXY_HOST=3.139.239.136
   PROXY_PORT=3128
   PROXY_SCHEME=http
   PROXY_USER=proxy_user
   PROXY_PASSWORD=password
   NO_PROXY="localhost,127.0.0.1,.corp.local,10.0.0.0/8"
   ```

2. **Per-session (current PowerShell only):**

   ```powershell
   $env:HTTP_PROXY  = "http://USER:PASSWORD@PROXY_HOST:PORT"
   $env:HTTPS_PROXY = "http://USER:PASSWORD@PROXY_HOST:PORT"
   $env:NO_PROXY    = "localhost,127.0.0.1,.corp.local,10.0.0.0/8"
   ```

3. **Persistent (system-wide) for all processes:**

   Run in elevated PowerShell:

   ```powershell
   setx /M HTTP_PROXY  "http://USER:PASSWORD@PROXY_HOST:PORT"
   setx /M HTTPS_PROXY "http://USER:PASSWORD@PROXY_HOST:PORT"
   setx /M NO_PROXY    "localhost,127.0.0.1,.corp.local,10.0.0.0/8"
   ```

4. **Optional (WinHTTP stack for some Windows services):**

   ```powershell
   netsh winhttp set proxy proxy-server="http=PROXY_HOST:PORT;https=PROXY_HOST:PORT" bypass-list="localhost;127.0.0.1;*.corp.local"
   ```

:::warning PowerShell Version Compatibility

PowerShell versions below 7 do not support environment proxy configurations like `http_proxy`, which the delegate sets up, and they only work with WinHTTP proxy configurations. Windows 2019 and 2022 ship with PowerShell 5.1, which means the Run step will not work until the WinHTTP proxy is manually configured or Powershell is upgraded to >7

:::

For more information, see [Configure Delegate Proxy Settings](/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings).

**Certificate configuration:**

The delegate and containerless steps use the system-level trust store for HTTPS connectivity. In Windows, import the CA to the system store using this command:

```powershell
Import-Certificate -FilePath "C:\path\corp-root.cer" -CertStoreLocation Cert:\LocalMachine\Root
```

**Git operations with custom certificates:**

For Git operations, two different SSL channels can be used, with varying configurations:

1. **SChannel (Recommended):**

   The native Windows provider integrates with the Windows Certificate Store. Windows performs a revocation check on certificates, so it will fail if the cert lacks a CRL/OSCP URL. However, the check is best-effort; even if the URL is not working, it may still succeed, but a missing URL will always throw an error.

   To use SChannel:

   ```powershell
   git config --global http.sslBackend schannel
   ```

   Import your corporate CA into Windows "Trusted Root Certification Authorities":

   ```powershell
   Import-Certificate -FilePath "C:\path\corp-root.cer" -CertStoreLocation Cert:\LocalMachine\Root
   ```

   Or use `certmgr.msc` or `certlm.msc` to manage certificates manually. Git will trust what Windows trusts; no file path is needed.

2. **OpenSSL:**

   This is the standard Git used everywhere. It employs its own CA bundle for validation, stored at `C:/Program Files/Git/mingw64/etc/ssl/certs/ca-bundle.crt`.

   To use OpenSSL:

   ```powershell
   git config --global http.sslBackend openssl
   ```

   If using the OpenSSL channel, append your CA certificate to `C:/Program Files/Git/mingw64/etc/ssl/certs/ca-bundle.crt`.

   :::note
   This configuration only affects Git clone operations. Other steps or tasks will not utilize this certificate, and Git API requests will not use it.
   :::

**Manual plugin installation:**

Some CI steps can run directly on the host. Harness automatically downloads required plugins, but manual installation is needed when your infrastructure lacks internet connectivity (e.g., behind a proxy or firewall).

To manually install a plugin:

1. Download the plugin from its source (e.g., [drone-git v1.7.6](https://github.com/wings-software/drone-git/releases/tag/v1.7.6))
2. Decompress: `zstd.exe -d plugin-windows-amd64.zst -o plugin-windows-amd64.exe`
3. Move to plugins directory:
   ```powershell
   New-Item -ItemType Directory -Force -Path "C:\HarnessDelegate\default\plugin\drone-git\"
   Move-Item plugin-windows-amd64.exe "C:\HarnessDelegate\default\plugin\drone-git\"
   ```

#### Manage the Delegate

**Stop:** `.\delegate stop` - The service will auto-start on system reboot

**Uninstall:** `.\delegate uninstall` - Removes service registration (preserves config, logs, and binary)

**Upgrade:**
1. Download new binary (replace existing `delegate` file)
2. `.\delegate stop`
3. `.\delegate start`

</TabItem>

</Tabs>
---

Navigate to **Project Settings** > **Delegates**. You should see your new delegate in the delegates list.

:::info

If you don't set a name for your delegate, it will default to `harness-delegate`

:::

### Configure Pipeline Delegate

For the CI stages that you want to use the new delegate with, [define the stage variable](/docs/platform/variables-and-expressions/add-a-variable/#define-variables) `HARNESS_CI_INTERNAL_ROUTE_TO_RUNNER` and set it to `true`.

Then, in order for the pipeline to select this delegate, [set your pipeline's build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure#set-the-pipelines-build-infrastructure) as normal.

Most importantly, ensure that you have set `Local` as the **Infrastructure** and that the **Operating System** and **Architecture** match the delegate you installed in the [download and install delegate step](#download-and-install-the-delegate).

## Delegate Configuration

The `config.env` file location:
- **macOS**:
  - Default: `~/.harness-delegate/config.env`
  - Custom workdir: `{workdir}/config.env`
- **Linux**:
  - Default: Location where you created it
  - Custom workdir: `{workdir}/config.env`
- **Windows**:
  - Default: `C:\HarnessDelegate\config.env`
  - Custom workdir: `{workdir}/config.env`

### Set Max Stage Capacity

With the new Harness Delegate, you can configure a limit for the maximum number of stages the delegate will be executing at a given time. When the delegate is handling tasks at full capacity, new tasks will be queued and picked up once the delegate's capacity is freed.

In order to configure a max limit for number of stages executed by a delegate, you should add a `MAX_STAGES` variable in the delegate's `config.env` file. The value of the `MAX_STAGES` should be a positive integer.

#### Example config.env

If you wanted the delegate to only execute up to 5 stages a time, set `MAX_STAGES=5`. For example:

```
ACCOUNT_ID="<ACCOUNT_ID>"
TOKEN="<DELEGATE_TOKEN>"
TAGS="<your delegate tags>"
URL="<MANAGER_HOST_AND_PORT>"
NAME="<your delegate name>"
...
MAX_STAGES=5
```

### Set Graceful Shutdown

:::info Available in version 1.25.2+

The new Harness Delegate supports transaction-aware graceful shutdown. This feature allows the delegate to complete active transactions before shutting down when it receives a termination signal.

:::

With the new Harness Delegate, you can configure graceful shutdown behavior in two ways:

1. **Container and process cleanup** - Configure a grace period to allow for a clean shutdown of running containers and processes when a pipeline execution is aborted. This ensures that any resources started by the pipeline are given time to terminate gracefully before being forcefully removed.

   To configure this grace period, add the `CLEANUP_GRACE_PERIOD_SECONDS` variable to the delegate's config.env file. The value should be a non-negative integer representing the number of seconds to wait before forcefully terminating resources.

   If the grace period is set to 0 (default), the delegate will immediately send a SIGKILL signal to stop containers and processes. If a positive value is configured, the delegate will first send a SIGTERM signal. After the grace period expires, any resources that are still running will be terminated with a SIGKILL.

2. **Delegate shutdown behavior** - Configure how the delegate itself shuts down when it receives a SIGTERM signal using the `IDLE_WAIT_SECS_BEFORE_STOP` option. When the delegate receives a SIGTERM signal, it immediately stops accepting new transactions and continues executing active transactions. Once all transactions complete and the delegate becomes idle (no active tasks), it waits for the configured idle period before shutting down.

   Add `IDLE_WAIT_SECS_BEFORE_STOP` to your delegate's `config.env` file. The value should be a non-negative integer representing the number of seconds to wait in an idle state before shutting down.
   
   - **Default value:** `0` (immediate shutdown after SIGTERM, no idle wait period)
   - **Recommended value:** `60` seconds

:::important Configuration changes require restart

All configuration options, including `CLEANUP_GRACE_PERIOD_SECONDS` and `IDLE_WAIT_SECS_BEFORE_STOP`, are only read on startup. You must restart the delegate service after modifying these settings for the changes to take effect.

:::

#### Example config.env

If you want the delegate to wait up to 30 seconds before forcefully stopping any running containers or processes, and wait 60 seconds in an idle state before shutting down, configure both options:

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

### Task Abort Configuration for Local Execution

When a task runs directly on the delegate's host machine (such as a Run step without containers), subprocesses are started on the host to handle the task. When a stage is aborted or encounters an error, the delegate will clean up these subprocesses.

:::note
This feature is only available on Unix-based platforms (macOS and Linux). For Windows, the process is terminated by invoking `taskkill.exe /t /f` directly (forceful kill).
:::

You can control the cleanup behavior by configuring the following environment variables in the delegate's `config.env` file:

- `HARNESS_SUBPROCESS_KILL_PROCESS_GROUP_MAX_SIGTERM_ATTEMPTS` (non-negative integer, default: `1`): Specifies the number of SIGTERM signals sent to subprocesses before sending a SIGKILL.

- `HARNESS_SUBPROCESS_KILL_PROCESS_GROUP_RETRY_INTERVAL_SECS` (positive integer, default: `10`): Specifies the time (in seconds) between successive SIGTERM signals sent to the subprocesses.


#### Example config.env

To configure the delegate to send up to 3 SIGTERM attempts with a 15-second interval before forcefully killing subprocesses:

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

### Containerless Steps Support

By default, most CI steps (except Run, Run Tests, Background, GitHub Action, and Bitrise Plugin) run inside containers. With containerless mode enabled, plugin-compatible steps can execute directly on the delegate's host machine without container dependencies. This provides better performance and simplifies infrastructure requirements.

Plugin-compatible steps are steps that can run both in containers and directly on the host. This capability is already available on Harness-hosted infrastructure and is now supported with the new delegate.

To enable containerless execution, add the `HARNESS_CI_INTERNAL_CONTAINERLESS` stage variable to your pipeline:

1. In your pipeline, navigate to the CI stage where you want to enable containerless execution
2. Go to **Advanced** > **Stage Variables**
3. Add a new variable:
   - **Name**: `HARNESS_CI_INTERNAL_CONTAINERLESS`
   - **Type**: String
   - **Value**: `true`

:::info
Containerless mode is currently in beta and supports a limited set of CI steps.
:::

### Configure Custom Working Directory

By default, the delegate stores its configuration files, logs, and cache in a standard location. You can customize this location using the `HARNESS_WORKDIR` variable.

**Default locations:**

- **Windows**: `C:\HarnessDelegate`
- **Linux/macOS**: `~/.harness-delegate`

**How to configure:**

<Tabs className="tabs--full-width">
<TabItem value="Service Installation">

Use the `--workdir` flag during installation:

```bash
./delegate install --account=[Account ID] \
                   --token=[Delegate Token] \
                   --url=[Harness URL] \
                   --name=[Your Delegate Name] \
                   --workdir=/custom/path/to/workdir
```

</TabItem>
<TabItem value="Direct Binary Execution">

Set the `HARNESS_WORKDIR` environment variable before running the binary:

Linux/macOS:
```bash
export HARNESS_WORKDIR=/custom/path/to/workdir
./delegate server --env-file config.env
```

Windows (PowerShell):
```powershell
$env:HARNESS_WORKDIR="C:\custom\path\to\workdir"
.\delegate server --env-file config.env
```


</TabItem>
</Tabs>

**Notes:**

- The delegate automatically creates the directory and subdirectories. Ensure the delegate process has read/write permissions for this directory.


## Debugging

### Logs

You can find the delegate logs in the following locations:
- **macOS**:
  - Default: `~/.harness-delegate/logs/delegate.log`
  - Custom workdir: `{workdir}/logs/delegate.log`
- **Linux**:
  - Default: `nohup-delegate.out`
  - Custom workdir: `{workdir}/logs/delegate.log`
- **Windows**:
  - Default: `C:\HarnessDelegate\logs\delegate.log`
  - Custom workdir: `{workdir}/logs/delegate.log`

#### Log File Configuration

The delegate supports automatic log rotation and sanitization. Configure these using environment variables in your `config.env`:

```bash
# Enable/disable file logging
LOG_ENABLE_FILE_LOGGING=true


# Log rotation settings
LOG_MAX_SIZE_MB=100        # Rotate at 100MB
LOG_MAX_BACKUPS=3          # Keep 3 old files
LOG_MAX_AGE_DAYS=28        # Delete after 28 days
LOG_COMPRESS=false         # Compress rotated logs
```

**View logs in real-time:**

MacOS:
```bash
tail -f ~/.harness-delegate/logs/delegate.log
```

Linux:
```bash
tail -f nohup-delegate.out
```

Windows:
```powershell
Get-Content -Path "C:\HarnessDelegate\logs\delegate.log" -Tail 20 -Wait
```

### Metrics

The New Delegate exposes metrics on the `/metrics` endpoint for monitoring and observability. By default, the metrics endpoint is available at `http://localhost:3000/metrics`.

## End to End Demo

This video walks through an end to end demo of the delegate installation, including usage and a pipeline execution.

<DocVideo src="https://www.loom.com/share/1e292d0f51004882bfd5462ef0553222?sid=487e23cb-28fc-4d2e-ac66-07197fa7dafe" />

