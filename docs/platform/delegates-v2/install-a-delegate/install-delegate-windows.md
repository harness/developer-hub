---
title: Install a Local Delegate on Windows
description: Learn how to install and configure the Harness Delegate on a Windows machine
sidebar_position: 3
---

:::warning Closed Beta
The new Harness Delegate is currently in closed beta and available only to select users. Access is determined by the product team. See [Feature Parity](/docs/platform/delegates-v2/feature-parity) for current supported use cases.
:::

This guide walks you through installing the Harness Delegate on a Windows machine. The delegate runs under the LocalSystem account. Skip to the [End-to-End Demo](#end-to-end-demo) to watch video instructions instead. For supported connectors, CI steps, secret managers, and module support by deployment type, see the [Feature Parity](/docs/platform/delegates-v2/feature-parity) page — that's the single source of truth, kept up to date as support expands.

:::info
To learn more about the new delegate, including architecture and how it compares to the legacy delegate, see the [New Delegate Overview](../delegate-overview).
:::

## Quick Reference

| Command | Description |
|---------|-------------|
| `.\delegate install` | Install and register the service |
| `.\delegate start` | Start the delegate service |
| `.\delegate stop` | Stop the service gracefully |
| `.\delegate status` | Show delegate status and details |
| `.\delegate uninstall` | Uninstall service (preserves config/logs) |

**Important file locations:**

| Item | Path |
|------|------|
| **Config File** | `C:\HarnessDelegate\config.env` |
| **Logs** | `C:\HarnessDelegate\logs\` |
| **Service Definition** | Windows Service Control Manager |

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
Keep these values ready — you'll use them in the installation command.
:::

</TabItem>
</Tabs>

---

## Download and Install the Delegate

### Step 1: Download the Binary

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

### Step 2: Install with Credentials

Run the install command with the credentials you obtained from the [previous step](#get-harness-credentials):

```powershell
.\delegate install --account=[Your Account ID] `
                       --token=[Your Delegate Token] `
                       --url=[Your Harness URL] `
                       --name=[Your Delegate Name]
```

:::info
If you don't specify a name, the delegate defaults to `harness-delegate`.
:::

**Optional: Add tags for delegate selection**

Tags are useful for routing specific pipelines to this delegate:

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

- **`--account`:** Your Harness account ID **(required)**
- **`--token`:** Delegate authentication token **(required)**
- **`--url`:** Harness server URL **(required)**
- **`--name`:** Custom delegate name (default: `harness-delegate`)
- **`--tags`:** Comma-separated tags for delegate selection (optional)
- **`--env-file`:** Path to config file (default: `C:\HarnessDelegate\config.env`)
- **`--auto-restart-on-failure`:** Auto-restart on failure (default: true)

</details>

**What this command creates:**

- **Workspace directory:** `C:\HarnessDelegate`
- **Configuration file:** `C:\HarnessDelegate\config.env`
- **Windows service:** Registered in Service Control Manager

### Step 3: Start the Service

```powershell
.\delegate start
```

You should see a success message with the config location and log file path.

### Step 4: Verify Installation

Check the delegate status:

```powershell
.\delegate status
```

Or use Windows native commands:

```powershell
Get-Service "harness-delegate"
```

View logs in real time:

```powershell
Get-Content -Path "C:\HarnessDelegate\logs\delegate.log" -Tail 10 -Wait
```

Navigate to **Project Settings** > **Delegates** in the Harness UI. You should see your delegate with a **Connected** status.

---

## Additional Configuration

### Update Delegate Settings

1. **Stop the service:** `.\delegate stop`
2. **Edit the config:** `notepad C:\HarnessDelegate\config.env`
3. **Start the service:** `.\delegate start`

### Proxy Configuration

The delegate inherits system-level proxies by default, but you can set a custom proxy through the delegate config. There are several ways to configure this:

**1. Delegate Config (Recommended)**

Edit `C:\HarnessDelegate\config.env` and add:

```bash
PROXY_HOST=3.139.239.136
PROXY_PORT=3128
PROXY_SCHEME=http
PROXY_USER=proxy_user
PROXY_PASSWORD=password
NO_PROXY="localhost,127.0.0.1,.corp.local,10.0.0.0/8"
```

**2. Per-session (current PowerShell only)**

```powershell
$env:HTTP_PROXY  = "http://USER:PASSWORD@PROXY_HOST:PORT"
$env:HTTPS_PROXY = "http://USER:PASSWORD@PROXY_HOST:PORT"
$env:NO_PROXY    = "localhost,127.0.0.1,.corp.local,10.0.0.0/8"
```

**3. Persistent (system-wide) for all processes**

Run in elevated PowerShell:

```powershell
setx /M HTTP_PROXY  "http://USER:PASSWORD@PROXY_HOST:PORT"
setx /M HTTPS_PROXY "http://USER:PASSWORD@PROXY_HOST:PORT"
setx /M NO_PROXY    "localhost,127.0.0.1,.corp.local,10.0.0.0/8"
```

**4. Optional (WinHTTP stack for some Windows services)**

```powershell
netsh winhttp set proxy proxy-server="http=PROXY_HOST:PORT;https=PROXY_HOST:PORT" bypass-list="localhost;127.0.0.1;*.corp.local"
```

:::warning PowerShell Version Compatibility
PowerShell versions below 7 do not support environment proxy configurations such as `http_proxy`, which the delegate sets, and only work with WinHTTP proxy configurations. Windows 2019 and 2022 ship with PowerShell 5.1, which means the Run step will not work until the WinHTTP proxy is manually configured or PowerShell is upgraded to 7+.
:::

For more information, see [Configure Delegate Proxy Settings](/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings).

### Certificate Configuration

The delegate and containerless steps use the system-level trust store for HTTPS connectivity. Import the CA to the system store using this command:

```powershell
Import-Certificate -FilePath "C:\path\corp-root.cer" -CertStoreLocation Cert:\LocalMachine\Root
```

### Git Operations with Custom Certificates

For Git operations, two different SSL channels can be used:

**1. SChannel (Recommended)**

The native Windows provider integrates with the Windows Certificate Store. Windows performs a revocation check on certificates, so it fails if the cert lacks a CRL/OSCP URL. The check is best-effort — even if the URL is not working it may succeed, but a missing URL always throws an error.

```powershell
git config --global http.sslBackend schannel
```

Import your corporate CA into the Windows "Trusted Root Certification Authorities":

```powershell
Import-Certificate -FilePath "C:\path\corp-root.cer" -CertStoreLocation Cert:\LocalMachine\Root
```

You can also use `certmgr.msc` or `certlm.msc` to manage certificates manually. Git trusts what Windows trusts — no file path is needed.

**2. OpenSSL**

This is the standard Git SSL backend. It uses its own CA bundle stored at `C:/Program Files/Git/mingw64/etc/ssl/certs/ca-bundle.crt`.

```powershell
git config --global http.sslBackend openssl
```

If using the OpenSSL channel, append your CA certificate to `C:/Program Files/Git/mingw64/etc/ssl/certs/ca-bundle.crt`.

:::note
This configuration only affects Git clone operations. Other steps or tasks will not use this certificate, and Git API requests will not use it either.
:::

### Manual Plugin Installation

Some CI steps can run directly on the host. Harness automatically downloads required plugins, but manual installation is needed when your infrastructure lacks internet connectivity (e.g., behind a proxy or firewall).

1. **Download the plugin** from its source (e.g., [drone-git v1.7.6](https://github.com/wings-software/drone-git/releases/tag/v1.7.6)).
2. **Decompress:** `zstd.exe -d plugin-windows-amd64.zst -o plugin-windows-amd64.exe`
3. **Move to the plugins directory:**

   ```powershell
   New-Item -ItemType Directory -Force -Path "C:\HarnessDelegate\default\plugin\drone-git\"
   Move-Item plugin-windows-amd64.exe "C:\HarnessDelegate\default\plugin\drone-git\"
   ```

---

## Manage the Delegate

- **Stop:** `.\delegate stop` — The service auto-starts on system reboot.
- **Uninstall:** `.\delegate uninstall` — Removes service registration (preserves config, logs, and binary).
- **Upgrade:**
  1. **Download the new binary:** Replace the existing `delegate` file.
  2. **Stop the delegate:** `.\delegate stop`
  3. **Start the delegate:** `.\delegate start`

---

## Configure Pipeline Delegate

For the CI stages that you want to use the new delegate with, [define the stage variable](/docs/platform/variables-and-expressions/add-a-variable/#define-variables) `HARNESS_CI_INTERNAL_ROUTE_TO_RUNNER` and set it to `true`.

Then, [set your pipeline's build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure#set-the-pipelines-build-infrastructure) as usual. Ensure that you have set **Local** as the **Infrastructure** and that the **Operating System** and **Architecture** match the delegate you installed.

## Delegate Configuration

The `config.env` file location:

- **Default:** `C:\HarnessDelegate\config.env`
- **Custom workdir:** `{workdir}\config.env`

For configuration options that apply across all platforms — including stage capacity limits, graceful shutdown, containerless steps, init scripts, log rotation, metrics, and token management — see the [Delegate Configuration Reference](./configure-delegate).

### Configure Custom Working Directory

By default, the delegate stores its configuration files, logs, and cache in `C:\HarnessDelegate`.

Use the `--workdir` flag during installation:

```powershell
.\delegate install --account=[Account ID] `
                   --token=[Delegate Token] `
                   --url=[Harness URL] `
                   --name=[Your Delegate Name] `
                   --workdir=C:\custom\path\to\workdir
```

Or set the `HARNESS_WORKDIR` environment variable before running the binary directly:

```powershell
$env:HARNESS_WORKDIR="C:\custom\path\to\workdir"
.\delegate server --env-file config.env
```

The delegate automatically creates the directory and subdirectories. Ensure the delegate process has read/write permissions for this directory.

## Debugging

### Logs

You can find the delegate logs in the following locations:

- **Default:** `C:\HarnessDelegate\logs\delegate.log`
- **Custom workdir:** `{workdir}\logs\delegate.log`

**View logs in real time:**

```powershell
Get-Content -Path "C:\HarnessDelegate\logs\delegate.log" -Tail 20 -Wait
```

## Upgrading the Delegate

There is currently no automated upgrade mechanism for the new delegate. The upgrade process involves stopping the delegate, downloading the latest binary, and starting it again.

1. **Stop the delegate:** `.\delegate stop`
2. **Download the latest binary** from the [installation step](#step-1-download-the-binary), replacing the existing `delegate` file.
3. **Start the delegate:** `.\delegate start`
