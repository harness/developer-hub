---
title: Basic install
sidebar_label: Basic install
description: Standard install of the Harness Delegate on the target cluster, using the default cluster-admin role.
---

import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Basic" targetPage="/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/dedicated-delegate" />

Use this install when you can grant the Delegate the default `cluster-admin` role. The chaos runner inherits that role and can target any namespace in the cluster.

## Install the Harness Delegate

Follow the platform install guide at [Install Delegate](/docs/platform/delegates/install-delegates/overview). The recommended path is the Helm chart with the **standard Delegate image** (it ships `kubectl` and `go-template`, both of which chaos needs).

:::info Using the minimal Delegate image
The minimal Delegate image does not include `kubectl` or `go-template`, so chaos and discovery do not work on it out of the box. Go to [Using the minimal Delegate image](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes#using-the-minimal-delegate-image) for the two install options (`INIT_SCRIPT` or custom image).
:::

## Create a Kubernetes infrastructure

1. Go to **Resilience Testing → Project Settings → Resilience Testing Infrastructures**.
2. Select the **Kubernetes (Harness Infrastructure)** tab.
3. Click **+ New Infrastructure**. The **Create a Chaos Infrastructure with a Harness Delegate** dialog opens.
4. Pick the **environment** the infrastructure belongs to. The environment picker lists project, organization, and account-scoped environments. Click **+ New Environment** if you need one. Click **Continue**.
5. In the **Create New Infrastructure** form:

    - **Name, Description, Tags.** Standard Harness metadata.
    - **Storage:** choose **Inline** (definition stored in Harness) or **Remote** (definition stored in a Git repository).
    - **Deployment Type:** Kubernetes.
    - **Infrastructure Type:** Direct Connection (Kubernetes) or **Via Cloud Provider**.
    - **Cluster Details:**
      - **Connector:** the Kubernetes connector that reaches the target cluster.
      - **Namespace:** where the chaos runner and fault pods are created.
      - **Release name (Advanced):** default `release-<+INFRA_KEY_SHORT_ID>`. Leave unchanged unless you have a naming convention.
    - **Map Dynamically Provisioned Infrastructure:** enable when the target cluster is provisioned through an upstream pipeline.
    - **Scope to Specific Services:** enable to limit chaos to a subset of services within the namespace.
    - **Allow simultaneous deployments on the same infrastructure:** leave off unless you knowingly need parallel runs.

6. Click **Save**. The new infrastructure appears in the list with status **Inactive** until you enable chaos on it.

:::tip YAML mode
The Visual form has a **YAML** toggle. Switching to YAML shows the `infrastructureDefinition.yaml` produced by the form, which you can edit directly or commit to Git.
:::

:::tip Terraform alternative
To create a Kubernetes infrastructure through Terraform instead, use the [`harness_chaos_infrastructure_v2` resource](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_infrastructure_v2) in the [Harness Terraform provider](/docs/platform/automation/terraform/harness-terraform-provider-overview).
:::

## Create chaos experiments on the new infrastructure

After you save the infrastructure, the **Create Chaos Experiments on your Infrastructure** wizard opens with Step 1 (Select Infrastructure) already complete.

1. In Step 2, pick the creation mode:
   - **Beginner:** Harness creates a small set of Application Maps and recommended chaos experiments for you. You can edit them later.
   - **Expert:** multi-step guided creation. Pick fault types per workload.
2. Click **Go!** to continue with the defaults. To override defaults for the [chaos runner and Discovery Agent](/docs/platform/service-discovery/customize-agent), click **Configure Advanced Settings (Optional)** first.

The infrastructure status flips to **Active** when the Delegate registers the chaos runner and the discovery agent finishes its first sweep.
