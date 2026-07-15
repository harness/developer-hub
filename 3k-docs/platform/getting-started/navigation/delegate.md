---
title: Delegate 2.0
sidebar_label: Delegate 2.0
description: Learn about Delegate 2.0, a unified lightweight agent that serves all Harness products from a single installation, replacing separate per-product delegates.
sidebar_position: 5
---

Delegate 2.0 is a unified, lightweight agent that serves all Harness products from a single installation. It replaces the previous model of separate delegates per product with a single binary that runs across all supported platforms. For the latest documentation, installation guides, and release notes, see the [Delegate (Closed Beta) documentation](https://developer.harness.io/docs/category/delegate-closed-beta).

:::info Key Change
In previous versions of Harness, each product (CI, CD, Feature Flags, etc.) required its own delegate installation. Delegate 2.0 consolidates all of these into a single agent, dramatically simplifying installation and maintenance.
:::

## What Has Changed

Delegate 2.0 represents a significant architectural change from the previous delegate model. The following table summarizes the key differences.

| Aspect | Before (NG Delegate) | After (Delegate 2.0) |
|---|---|---|
| **Size** | Large footprint, heavy resource consumption | Significantly smaller binary, reduced resource usage |
| **Products** | Separate delegate per product (CI, CD, FF, etc.) | One delegate for all products |
| **Platforms** | Limited platform support | Windows, macOS, Linux, and Kubernetes |
| **Management** | Multiple delegates to install, update, and monitor | Single unified delegate to manage |

## Supported Platforms

Delegate 2.0 supports a broad range of operating systems and architectures. Native binaries are provided for each platform, eliminating the need for containerization on non-Kubernetes environments.

| Platform | Architecture | Status |
|---|---|---|
| Linux | x64 (amd64) | Supported |
| Linux | ARM64 (aarch64) | Supported |
| macOS | Intel (x64) | Supported |
| macOS | Apple Silicon (ARM64) | Supported |
| Windows | Server | Supported |
| Windows | Desktop | Supported |
| Kubernetes | Any cluster | Supported |

## Unified Experience

The previous delegate model required separate installations for each Harness product. Delegate 2.0 replaces all of these with a single agent.

```yaml title="Before (Separate Delegates)"
# NG Delegate Model (Before)
Harness Account
  |
  |-- CI Delegate        (Java-based, large image)
  |-- CD Delegate        (Java-based, large image)
  |-- Feature Flags Delegate
  |-- Cloud Cost Delegate
  |-- STO Delegate
  |-- Chaos Delegate
  |
  # Each requires separate:
  #   - Installation
  #   - Version management
  #   - Resource allocation
  #   - Monitoring
  #   - Upgrade scheduling
```

```yaml title="After (Single Delegate 2.0)"
# Delegate 2.0 Model (After)
Harness Account
  |
  |-- Delegate 2.0   (single lightweight binary)
        |
        |-- Serves CI workloads
        |-- Serves CD workloads
        |-- Serves Feature Flags
        |-- Serves Cloud Cost Management
        |-- Serves Security Testing
        |-- Serves Chaos Engineering
        |-- Serves all other modules
        |
        # Single installation covers everything
```

### Key Benefits

- **No delegate updates for step updates**: Pipeline step logic is decoupled from the delegate. Step updates are delivered independently without requiring a delegate upgrade.
- **Opt-in when ready**: Teams can migrate to Delegate 2.0 on their own schedule. Existing NG delegates continue to function alongside Delegate 2.0.
- **Version pinning**: Pin the delegate to a specific version for stability. Upgrade when your change control process allows.
- **Faster innovation**: Decoupling step execution from the delegate allows the Harness team to ship new step types and capabilities without waiting for delegate release cycles.

:::tip Migration Strategy
You do not need to remove existing NG delegates to adopt Delegate 2.0. Install Delegate 2.0 alongside your existing delegates, route new pipelines to it using delegate selectors, and decommission NG delegates as workloads are migrated.
:::