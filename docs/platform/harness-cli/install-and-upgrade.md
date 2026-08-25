---
title: Install and upgrade the Harness CLI
sidebar_label: Install and Upgrade
description: Install the Harness CLI on macOS or Linux, upgrade to new versions, and uninstall cleanly.
sidebar_position: 2
---

The Harness CLI is distributed as a self-contained binary for macOS and Linux (amd64 and arm64). This guide explains how to install, upgrade, and uninstall the CLI.

---

## What you will learn in this topic

By the end of this guide, you will be able to:

* Install the Harness CLI using the automated installer or a release archive.
* Customize the installation for CI/CD systems, containers, and non-standard installation paths.
* Upgrade to the latest release or install a specific version.
* Install or upgrade an individual module or external plugin.
* Inspect what an in-place upgrade would do before you run it.
* Remove the CLI and its local configuration.

---

## Before you begin

Make sure you have:

* macOS or Linux (amd64 or arm64).
* Bash or Zsh.
* Network access to download binaries and release metadata.

--- 

## Install the CLI

:::info Open source
**The Harness CLI is open source.**

- View the source code on [GitHub](https://github.com/harness/cli).
- For the complete list of supported commands, see the [command reference](https://github.com/harness/cli/wiki/Command-Reference).
- Download specific versions from the [releases](https://github.com/harness/cli/releases) page.

We welcome contributions. To report bugs or request features, open an [issue](https://github.com/harness/cli/issues). To contribute code, submit a [pull request](https://github.com/harness/cli/pulls).
:::

Run the installer:

```sh
curl -fsSL https://raw.githubusercontent.com/harness/cli/main/install.sh | sh
```

The installer:

* Installs the `harness` and `harness-har` binaries.
* Adds the installation directory to your `PATH` if necessary.
* Configures shell completions for supported shells.

Verify the installation:

```sh
harness version
```

If the `harness` command is not available immediately after installation, restart your shell or reload your shell configuration:

```sh
source ~/.zshrc
# or
source ~/.bashrc
```

---

## Customize the installation

Pass installer options after `sh -s --`:

```sh
# Install only the core CLI
curl -fsSL https://raw.githubusercontent.com/harness/harness-unified-cli/main/install.sh | \
  sh -s -- --core

# Install to a custom location without prompts
curl -fsSL https://raw.githubusercontent.com/harness/harness-unified-cli/main/install.sh | \
  sh -s -- --non-interactive --install-dir /usr/local/bin
```

| Flag                   | Description                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------- |
| `--install-dir <path>` | Installs the binaries to a custom directory.                                          |
| `--core`               | Installs only the `harness` binary.                                                   |
| `--non-interactive`    | Suppresses prompts for automated environments such as CI/CD pipelines and containers. |
| `--no-verify`          | Skips checksum verification after download.                                           |

---

## Install manually

If you prefer not to use the installer, download the appropriate release archive from [GitHub Releases](https://github.com/harness/harness-unified-cli/releases), extract the archive, and place the binaries in a directory that is included in your `PATH`.

---

## Upgrade the CLI

The CLI can update itself without rerunning the installer:

```sh
# Upgrade to the latest release
harness install cli

# Install a specific version
harness install cli --version v1.2.3

# Check for the latest available version
harness install cli --check
```

`harness install cli` upgrades the `harness` binary and every installed module in one shot. Add `--core-only` to upgrade the core binary and leave the modules untouched.

```sh
harness install cli --core-only
```

| Flag                   | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| `--version <tag>`      | Installs a specific release version.                                |
| `--install-dir <path>` | Overrides the installation directory.                               |
| `--force`              | Reinstalls the CLI even if the target version is already installed. |
| `--check`              | Displays the latest available version without installing it.        |
| `--core-only`          | Installs or upgrades only the core binary, not the modules.         |

:::note
`--install-dir` must match the path of the executable that is currently running. If it does not, the command exits with an error rather than installing a second copy elsewhere.
:::

---

## Install a module or plugin

Modules and external plugins ship as separate binaries that `harness` dispatches to transparently. Install or upgrade them individually when you do not want to touch the rest of the installation.

```sh
harness install module <module_name>
harness install plugin <plugin_name>
```

For example, install the Artifact Registry module on its own:

```sh
harness install module har
```

`harness install plugin` is an alias for `harness install module`, so either form works for an external plugin binary.

To review what is installed:

```sh
harness list module
harness list plugin
harness get plugin <plugin_name>
```

---

## Check what an upgrade would do

Probe the release manifest and report the actions an in-place upgrade would take, without changing anything on disk.

```sh
harness debug update_check
```

---

## Uninstall the CLI

Remove the binaries:

```sh
rm "$(command -v harness)" "$(command -v harness-har)" 2>/dev/null
```

Remove the CLI configuration directory:

```sh
rm -rf ~/.harness
```

Removing the configuration directory also deletes saved profiles, credentials, and CLI settings.

---

## Next steps

With the CLI installed, log in and set up a profile before you run your first command.

- [Authenticate](/docs/platform/harness-cli/authenticate): Log in and set up your first profile.
- [Harness CLI overview](/docs/platform/harness-cli/harness-cli-overview): Understand the command structure.
