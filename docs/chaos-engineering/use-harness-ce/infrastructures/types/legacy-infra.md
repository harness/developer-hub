---
title: Dedicated Chaos Infrastructure
sidebar_position: 1
redirect_from:
- /docs/category/harness-dedicated-infrastructure
- /docs/chaos-engineering/onboarding/harness-infra
- /docs/chaos-engineering/features/chaos-infrastructure/harness-infra/
- /docs/chaos-engineering/get-started/prerequisites/#chaos-infrastructure-requirements
---

This topic describes the following:
  - [What is Dedicated Chaos Infrastructure?](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra#what-is-harness-chaos-infrastructure)
  - [Resource Requirements](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra#chaos-infrastructure-requirements)
  - [Installation steps](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra#install-dedicated-chaos-infrastructure)
  - [Validate the installation](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra#validate-installation)
  - [Disable the infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra#disable-infrastructure)

## What is Harness Chaos Infrastructure?

Harness Chaos Infrastructure (also known as Legacy Kubernetes Infrastructure) uses a dedicated infrastructure to facilitate and execute chaos experiments.

:::tip
Unless specified, chaos infrastructure refers to the dedicated chaos infrastructure (or legacy chaos infrastructure), and **NOT** DDCR.
:::

## Chaos infrastructure requirements

The table below lists the chaos infrastructure execution plane components and the required resources for Legacy Kubernetes Infrastructure. You can install these components in your target cluster, allowing the chaos infrastructure to run experiments here. Chaos infrastructure runs within your target environment to aid HCE in accessing the target resources and injecting chaos at a cloud-native scale.

| Deployment | Container | CPU<br />required | Memory<br />required | Image |
|------------|-----------|-------------------|----------------------|-------|
| chaos-operator-ce  | chaos-operator-ce     | 125m | 300M | chaosnative/chaos-operator          |
| chaos-exporter     | chaos-exporter        | 125m | 300M | chaosnative/chaos-exporter          |
| subscriber         | subscriber            | 125m | 300M | chaosnative/harness-chaos-subscriber|
| workflow-controller| workflow-controller   | 125m | 300M | chaosnative/workflow-controller     |


## Install Dedicated Chaos Infrastructure

You can enable chaos **on existing infrastructure** that uses a Harness cluster connector (also known as Harness Kubernetes connector) or **on new infrastructure**.

:::tip
You can choose between Kubernetes and Kubernetes (Harness infrastructure). The former refers to a dedicated infrastructure whereas the latter refers to Harness Delegate.
:::

### On Existing Infrastructure
To enable chaos on an existing Harness Kubernetes connector:

1. Go to **Chaos > Environments**, and then select the environment you want to add chaos infrastructure to.

1. On the environment details page, select **+ Enable Chaos**.

1. On the next screen, select where to add chaos infrastructure, and then select **Continue**.

4. If you selected **On Existing Infrastructures**, on the next screen, select any connector under the **Project**, **Organization**, or **Account** scope. Select **Continue**.

    ![Chaos Infrastructure in Existing Infra](./static/chaos-infrastructure-in-existing-infra.png)

  :::info note
  A Harness Kubernetes connector with:
    * **Cluster-wide read/write access** can be used to set up chaos infrastructure in cluster scope and namespace scope.
    * **Specific namespace access** can be used to set up a chaos infrastructure in that specific Kubernetes namespace scope only.
    * **Cluster-wide read access** cannot be used to set up a chaos infrastructure.
  :::

5. The **Configure Chaos Infrastructure** screen appears. Select the installation type, access type, namespace, and service account name. Select **Next**.

  Under **Choose Access Type**, choose one of the following modes.

    * **Cluster Wide:** This mode of infrastructure installation allows targeting resources across the entire cluster, in all the namespaces, as part of an experiment.
    * **Namespace Mode:** This mode of infrastructure installation allows targeting resources only in the namespace where the chaos infrastructure is deployed.

  By default, chaos is installed in the `hce` namespace and uses `hce` service account, which you can configure under the K8s cluster details.

  Optionally, you can specify the node selectors and Kubernetes toleration for chaos infrastructure deployment.

:::tip
- There can only be one cluster-wide chaos infrastructure per cluster.
- There may be multiple namespace-scoped chaos infrastructures per cluster.
:::

    ![Configure Chaos Infrastructure](./static/existing-2.png)

6. The **Deploying your Infrastructure** screen appears. If you're deploying **on existing infrastructure**, select **Done**. This is your final step. Harness installs the chaos infrastructure on your behalf.


### On New Infrastructure

1. If you're deploying on **new infrastructure**, provide a name for the new infrastructure, a **Description** (optional) and a **Tag** (optional). Select **Next**.

2. On the **Configure Chaos Infrastructure** screen, provide details like the installation type, access type, namespace, and service account name. Select **Next**.

3. Copy the given command(s), download the installation manifest YAML and run it on the terminal, based on cluster-wide or namespace access.

    * **For cluster-wide access:**

      1. Select **Download**, and then copy and run the `kubectl` command shown on your screen to install the chaos infrastructure. Select **Done**.

          ![Cluster Wide Setup Infrastructure](./static/cluster-wide-setup-infrastructure.png)

    * **For namespace access:**

      1. Run the first `kubectl` command to create the target namespace.
      1. Run the second `kubectl` command to apply the chaos CRDs.
      1. Select **Download**, and then copy and run the third command to install the chaos infrastructure. Select **Done**.

          ![Namespace Mode Setup Infrastructure](./static/ns-mode-setup-infrastructure.png)


## Validate Installation

After adding chaos infrastructure, Harness takes some time to set up all the chaos infrastructure resources. On the UI, if you navigate to **Environments** -> **Kubernetes**, you can see the connection status is `CONNECTED`.

  ![](./static/confirm-3.png)

That's it! Now you have a dedicated chaos infrastructure and you're all set to inject chaos into your infrastructure.

## Disable Infrastructure

1. Select the `⋮` icon against the chaos infrastructure name and select **Disable**.

    ![Delete Chaos Infra](./static/delete-chaos-infra-short.png)

2. Execute the commands displayed in the modal from your terminal to remove the chaos infrastructure components. Finally, select **Confirm**.

## Next Steps

- [Delegate-Driven Chaos Infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/types/ddcr/)
- [Dedicated versus Delegate Driven Infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/ddcr-vs-dedicated)