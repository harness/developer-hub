---
title: Load Test Infrastructure
sidebar_label: Infrastructure
sidebar_position: 3
description: Set up and manage Linux infrastructure to run load tests in Harness Resilience Testing
---

Load tests run on **Linux Chaos Infrastructure** with load testing enabled. This is the same Harness-managed agent used for chaos testing, installed on a Linux host, that also executes your Locust-based load tests and streams results back to the platform.

## Overview

Each load test must be associated with an infrastructure. The infrastructure agent:

- Receives test execution commands from the Harness control plane
- Runs the Locust load generator process locally
- Streams real-time metrics and logs back during execution
- Supports multiple concurrent test runs depending on host capacity

## Prerequisites

- A Linux host (bare metal, VM, or local VM via tools like [Multipass](https://multipass.run/) or [Lima](https://lima-vm.io/)) with network access to your target application
- The host must be able to reach Harness endpoints for agent registration
- `sudo` or root access to install the agent
- An **environment** configured in your Harness project (you will select it when creating the infrastructure)

:::info Feature Flag
Load Testing requires the `CHAOS_LOAD_TESTING_ENABLED` feature flag. Contact your Harness sales representative to get it enabled for your account.
:::

## Set Up Load Test Infrastructure

### 1. Create an Environment

If you don't already have an environment for load testing:

1. During the infrastructure creation flow, click **+ New Environment**
2. Enter a **Name** (e.g., `load-test-env`)
3. Select the **Environment Type** (Pre-Production or Production)
4. Choose **Inline** storage (stored in Harness) or **Remote** (stored in Git)
5. Click **Save**

### 2. Create a Linux Chaos Infrastructure

1. Go to **Resilience Testing** > **Project Settings** > **Infrastructures**
2. Select the **Linux** tab
3. Click **+ New Infrastructure**

The setup wizard has three steps:

**Step 1: Overview**
- Enter a **Name** for the infrastructure
- Select the **Environment** you created
- Choose **Root User** for root configuration (required for load testing)

**Step 2: Configure Options**
- **Log file max size (in MB)**: Maximum size per log file (default: 5)
- **Log file max backups**: Number of rotated log files to retain (default: 2)
- **Experiment log file max age (in days)**: How long to keep experiment logs (default: 30)
- **Infrastructure log file directory**: Where logs are stored on the host (default: `/var/log/linux-chaos-infrastructure`)
- **HTTP Proxy**: (Optional) Proxy URL if the host requires one for outbound access
- **HTTP Client Timeout**: (Optional) Timeout in seconds for HTTP requests

**Step 3: Deploy the Setup**

Harness generates a one-time install command. Copy and run it on your Linux host:

```bash
curl https://app.harness.io/public/shared/tools/chaos/linux/<VERSION>/install.sh \
  | sudo bash /dev/stdin \
  --infra-id <YOUR_INFRA_ID> \
  --access-key <YOUR_ACCESS_KEY> \
  --account-id <YOUR_ACCOUNT_ID> \
  --server-url <YOUR_SERVER_URL> \
  --load
```

The `--load` flag enables load testing support and installs Locust alongside the chaos agent.

:::warning
The access key is **one-time use**. If the install fails, refresh the command in the Harness UI to generate a new access key before retrying.
:::

### 3. Verify Connection

Once the script completes, the infrastructure status in Harness should change from **Pending** to **Connected**. If it remains in a pending state, check:

- Outbound connectivity from the host to Harness endpoints (the host must reach `app.harness.io` on port 443)
- Firewall or VPN rules blocking the agent's egress traffic
- That the install command ran without errors (check the script output)
- If a previous agent was installed on the same host, clean up leftover directories (`/var/log/linux-chaos-infrastructure`, `/etc/linux-chaos-infrastructure`, `/opt/linux-chaos-infrastructure`) before retrying

## Infrastructure Sizing Guidelines

The right host size depends on your target load:

| Virtual Users | Recommended Host | Notes |
|---|---|---|
| Up to 50 | 2 vCPU / 4 GB RAM | Light API testing |
| 50–500 | 4 vCPU / 8 GB RAM | Typical API and web workloads |
| 500–2000 | 8 vCPU / 16 GB RAM | High-throughput or complex scenarios |
| 2000+ | 16+ vCPU / 32+ GB RAM | Consider distributed load generation |

:::note
These are starting-point estimates. Actual resource usage depends on request complexity, response sizes, and scenario logic in your Locust script.
:::

## Managing Infrastructure

### View Registered Infrastructure

Existing infrastructure is listed in the **Infrastructure** dropdown when creating or editing a load test. The dropdown shows the infrastructure name and current connection status. Only infrastructure installed with the `--load` flag appears in the load test infrastructure dropdown.

### Multiple Infrastructure

You can register multiple Linux hosts in the same project. This lets you:

- Isolate staging and production load test environments
- Run tests from different network locations (e.g., on-premises vs. cloud)
- Dedicate infrastructure to specific teams or services

### Remove Infrastructure

To deregister an infrastructure:

1. Navigate to **Resilience Testing** > **Project Settings** > **Infrastructures** > **Linux** tab
2. Select the infrastructure entry and delete it

To uninstall the agent from the host:

```bash
sudo systemctl stop linux-chaos-infrastructure
sudo systemctl disable linux-chaos-infrastructure
sudo rm -f /etc/systemd/system/linux-chaos-infrastructure.service
sudo systemctl daemon-reload
sudo rm -rf /etc/linux-chaos-infrastructure /opt/linux-chaos-infrastructure /var/log/linux-chaos-infrastructure
sudo rm -f /usr/local/bin/linux-chaos-infrastructure
```

## Next Steps

- [Get Started with Load Testing](./get-started): Create and run your first load test
- [Concepts](./concepts): Understand virtual users, ramp-up, assertions, and load profiles
