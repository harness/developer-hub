---
title: Delegate (Closed Beta) release notes
sidebar_label: Delegate (Closed Beta)
tags: [NextGen, "Delegate"]
date: 2026-02-27T10:00
sidebar_position: 5
---

import ReleaseNotesSearch from '@site/src/components/ReleaseNotesSearch';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/delegate-v2/rss.xml" />

These release notes describe changes to the new Harness Delegate, currently in closed beta. The new delegate is a lightweight, binary-based runner optimized for CI workloads on local machines (macOS, Linux, and Windows).

For installation and configuration details, go to [Install Harness Delegate on a Local Machine](/docs/platform/delegates-v2/install-a-delegate/install-delegate-macos). For feature comparison with the legacy delegate, go to [Feature Parity](/docs/platform/delegates-v2/feature-parity).

:::info About the new delegate

The new Harness Delegate is currently in closed beta and available only to select customers. It supports CI pipelines with local (Docker), Kubernetes, and containerless infrastructure types. For release notes about the legacy delegate, go to [Delegate release notes](/release-notes/delegate).

:::

<ReleaseNotesSearch />

## February 27, 2026

### Latest binary versions

The new delegate ships as a per-platform binary. Each platform may be updated independently.

| Platform | Version | Download |
|----------|---------|----------|
| **macOS (arm64)** | 1.34.0 | `delegates/1.34.0/delegate-darwin-arm64` |
| **macOS (amd64)** | 1.34.0 | `delegates/1.34.0/delegate-darwin-amd64` |
| **Linux (arm64)** | 1.28.0 | `delegates/1.28.0/delegate-linux-arm64` |
| **Linux (amd64)** | 1.28.0 | `delegates/1.28.0/delegate-linux-amd64` |
| **Windows (amd64)** | 1.28.0 | `delegates/1.28.0/delegate-windows-amd64.exe` |

All binaries are available at `https://app.harness.io/public/shared/delegates/<VERSION>/`.

### What's new in macOS 1.34.0

#### Native LaunchDaemon mode for macOS

The macOS delegate now supports running as a system-level service (LaunchDaemon) in addition to the existing user-level service (LaunchAgent). LaunchDaemon mode starts the delegate at system boot without requiring a GUI session, making it suitable for EC2 macOS instances and environments where auto-login is prohibited by security policies.

To install in LaunchDaemon mode, use the `--mode=system` and `--user` flags with `sudo`:

```bash
sudo ./delegate install --account=[Your Account ID] \
                        --token=[Your Delegate Token] \
                        --url=[Your Harness URL] \
                        --name=[Your Delegate Name] \
                        --mode=system \
                        --user=[Your macOS Username]
```

All LaunchDaemon operations require `sudo` because the delegate interacts with the system domain (`/Library/LaunchDaemons/`) instead of the user domain. The workspace directory for daemon mode is `/opt/harness-delegate/`.

For complete installation instructions, go to [Install Harness Delegate on a Local Machine — LaunchDaemon mode](/docs/platform/delegates-v2/install-a-delegate/install-delegate-macos#option-b-launchdaemon-system-service--version-1340).
