---
title: Central Build Farm Workflow
description: Understand the Central Build Farm Workflow
sidebar_position: 3
---
# Harness Central Build Farm Setup

Harness Central Build Farm Setup configures the core components required for
Harness CI — build infrastructure, container registry, and source code manager.
A centralized build farm reduces Kubernetes cluster ownership costs and
simplifies operations by consolidating CI workloads into a single,
autoscaling cluster.

## Prerequisites

- HSF is deployed and post-deployment configuration is complete.
- You know which build infrastructure type you want to use
- If using **self-hosted Kubernetes infrastructure**: a delegate is already
  deployed with access to your Kubernetes cluster.
- If using **Harness Cloud with enterprise**: a Secure Connect proxy is
  configured.
- You have been added to the **HSF Users** or **HSF Admins** group.

## Inputs

| Input | Description | Notes |
|---|---|---|
| Build infrastructure type | Self-hosted Kubernetes, Harness Cloud, or both | See Step 1 below |
| Container registry URL | The URL of your container registry | e.g. `registry.example.com` |
| Source code manager | Your SCM type and URL | e.g. GitHub, GitLab, Bitbucket |
| Validation repository | A repo Harness can use to test the SCM connection | Must be accessible by the connector |

## Steps

### 1. Choose your infrastructure

Before executing the workflow, decide which build infrastructure type your
team will use:

| Option | When to use |
|---|---|
| **Harness Cloud** | You want Harness to manage build infrastructure. No Kubernetes connector is created. |
| **Self-hosted Kubernetes** | You want builds to run on your own cluster. A delegate with cluster access must already be deployed. |
| **Both** | You want to support both options and choose per pipeline. |

:::note
If you select Harness Cloud, the workflow will not create a Kubernetes
connector for the build farm — cloud infrastructure is managed by Harness
directly and requires no connector.
:::

:::warning
If you are using enterprise with Harness Cloud, you will need a Secure Connect
proxy configured before running this workflow. If you are using enterprise with
self-hosted infrastructure, your delegate must already be deployed and have
access to your cluster.
:::

### 2. Execute the workflow

Fill in the inputs above. Once submitted, HSF will provision the
`harness-central-build-farm-setup` IaCM workspace in the Solutions Factory
project.

## What gets created

| Resource | Details |
|---|---|
| Code repository connector | Connects Harness to your SCM |
| Artifact manager connector | Connects Harness to your container registry |
| Build infrastructure connector | Connects to your Kubernetes cluster (self-hosted only) |
| Secret: `build_farm_container_registry_password` | Container registry password |
| Secret: `build_farm_container_registry_username` | Container registry username |
| Secret: `build_farm_scm_password` | SCM password |
| Secret: `build_farm_scm_username` | SCM username |
| IaCM workspace | `harness-central-build-farm-setup` in Solutions Factory project |

:::note
Credentials are stored as Harness secrets rather than hardcoded into the
workspace state. This means they can be rotated independently without
affecting the workspace configuration.
:::

### Expected output

After the workflow completes:

- [ ] Connectors are visible under **Solutions Factory** → **Project
      Settings** → **Connectors**.S
- [ ] Secrets are visible under **Solutions Factory** → **Project
      Settings** → **Secrets**.
- [ ] The `harness-central-build-farm-setup` workspace appears in
      **IaCM** → **Workspaces**.
- [ ] An IDP catalog entry for the workspace is registered automatically.

### Post setup

Once the build farm is provisioned, update HSF to use it as the execution
infrastructure for Solutions Factory pipelines:

**Update the Harness Pilot Light workspace:**

1. Navigate to **IaCM** → **Workspaces** → **Harness Pilot Light**.
2. Under **Variables** → **OpenTofu Variables**, change `kubernetes_connector`
   from `skipped` to `account.buildfarm_infrastructure`.
3. Save the variable.
4. Run **Manage Pilot Light** to apply the change.

**Update the Harness Solutions Factory workspace:**

1. Navigate to **IaCM** → **Workspaces** → **Harness Solutions Factory**.
2. Under **Variables** → **OpenTofu Variables**, change `kubernetes_connector`
   from `skipped` to `account.buildfarm_infrastructure`.
3. Save the variable.
4. Run **Deploy Solutions Factory** to apply the change.

After both updates, all Solutions Factory pipelines will execute using your
build infrastructure.

#### Making changes

To update the build farm configuration after provisioning — for example, to
change the container registry URL or swap your SCM — navigate to
**IaCM** → **Workspaces** → `harness-central-build-farm-setup`, update the
relevant variable, and re-execute the workspace. The change will go through
the approval flow before being applied.