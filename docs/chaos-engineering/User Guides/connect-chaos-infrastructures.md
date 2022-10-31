---
title: Connect Chaos Infrastructures
---

Chaos infrastructure is a service that runs in your target environment and aids HCE in accessing and injecting chaos at cloud-native scale. There are different types of chaos infrastructures based on the target environments, such as Kubernetes, Linux VMs, AWS cloud, VMware, etc. Therefore, these chaos infrastructures might install as a Kubernetes service or a Linux daemon and so on, based on their type. All the chaos infrastructure services adhere to the principle of least privilege where they execute only with the minimum number of permissions required.

## Create Environment
To add a chaos infrastructure for your target environment, first we need to create a new environment as part of which the chaos infrastructures will exist. Head to the **Environments** page, which lists all the environments added as part of your project. Choose **New Environment**.

![Chaos Environments](./static/connect-chaos-infrastructures/chaos-environments.png)

In the **Create a new environment** modal, provide a name for the environment, optionally you can also add a description and tags. Then select an environment type i.e. **Production** or **Non-Production**. Then select **Create**. This will instantly create a new environment.

![New Environment](./static/connect-chaos-infrastructures/new-environment.png)

## Add Chaos Infrastructure
Now we can add a chaos infrastructure to our environment. Select **New Chaos Infrastructure**.

You can either setup a chaos infrastructure on existing infrastructures that uses a Harness cluster connector i.e. Harness Kubernetes connector or install the chaos infrastructure in a new infrastructure.

To use an existing Harness Kubernetes connector to install your chaos infrastructure, select **On Existing Infrastructures** in the modal. You can use any connector under the Project, Organization, and Account scope.

![Chaos Infrastructure in Existing Infra](./static/connect-chaos-infrastructures/chaos-infrastructure-in-existing-infra.png)

:::info
1. A Harness Kubernetes connector with cluster-wide read/write access can setup both cluster-scoped and namespaced-scoped chaos infrastructures.
2. A Harness Kubernetes connector with cluster-wide read access **can't** be used to setup a chaos infrastructures.
3. A Harness Kubernetes connector with specific namespace access can only be used to setup a namespace-scoped chaos infrastructure in that specific Kubernetes namespace.
:::

To install chaos infrastructure on a new infrastructure, select **On New Infrastructures**. Then, select **Continue**.
Provide a name for the infrastructure. Optionally, you can also provide a description and tags. Then, select **Next**. 

Under the installation mode, choose either **Cluster Wide** or **Namespace Mode** for installing the chaos infrastructure. By default the installation will take place in the `litmus` namespace and uses `litmus` service account, which can be configured under the K8s Cluster Details. Optionally, you can also specify node selectors and K8s tolerations for chaos infrastructure deployment.

- There can only be one cluster-wide chaos infrastructure per cluster.
- There may be multiple namespace-scoped chaos infrastructures per cluster.

![Configure Chaos Infrastructure](./static/connect-chaos-infrastructures/configure-chaos-infrastructure.png)

Then, select **Next**. In the final step, if you're deploying to an existing infrastructure with Harness Kubernetes Delegate, then Harness will install the chaos infrastructure on your behalf. Otherwise, if you're setting up the chaos infrastructure on a new infrastructure, then you will need to execute the given commands and/or download and apply the installation manifest.

![k8s Setup Infrastructure](./static/connect-chaos-infrastructures/k8s-setup-infrastructure.png)

Finally, select **Done**.

## Validating Chaos Infrastructure Installation
Upon applying the manifest, it will take a while to setup all the chaos infrastructure resources. After a while, the chaos infrastructure's connection state should reflect as `CONNECTED`.

If the chaos infrastructure remains in an `INACTIVE` or `PENDING` state, follow the suggestions on the **Troubleshooting** tab to resolve it.

![Infrastructure State](./static/connect-chaos-infrastructures/infrastructure-state.png)

That's it! Now you're ready to inject chaos into your infrastructure.
