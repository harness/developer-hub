---
title: Delegate overview
description: Harness Delegate is a service you run in your local network or VPC to connect your artifact, infrastructure, collaboration, verification, and other providers with Harness Manager.
sidebar_position: 1
helpdocs_topic_id: 2k7lnc7lvl
helpdocs_category_id: sy6sod35zi
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Delegate is a service you run in your local network or VPC to connect your artifacts, infrastructure, collaboration, verification, and other providers with Harness Manager. The first time you connect Harness to a third-party resource, Harness Delegate is installed in your target infrastructure, for example, a Kubernetes cluster. After the delegate is installed, you connect to third-party resources. The delegate performs all operations, including deployment and integration.

### System requirements

Go to [Delegate system requirements](./delegate-requirements.md).

### Communication with Harness Manager

Harness Delegate connects to Harness Manager over an outbound HTTPS/WSS connection.

![Harness Delegate overview](./static/harness-platform-architecture-00.png)

The delegate connects to Harness Manager (via SaaS) over a Secure WebSockets channel (WebSockets over TLS). The channel is used to send notifications of delegate task events and to exchange connection heartbeats. The channel is not used to send task data itself.

:::note
By default, the Harness Delegate makes outbound calls to the Harness platform (app.harness.io) and Google's Stackdriver Logging API. When you configure a Harness Connector with providers such as artifact servers, deployment environments, and cloud providers, the Harness Delegate will also make outbound calls to these external providers.

Harness recommends installing the delegate behind your firewall. The delegate must have network access to the artifact servers, deployment environments, and cloud providers it needs to interact with.

If you want to prevent the delegate from sending its logs to the Harness platform, or if your firewall blocks access to Google's Stackdriver Logging API, you should set the `STACK_DRIVER_LOGGING_ENABLED` environment variable to `false` for the delegate. This will disable all remote logging and prevent connectivity issues.
:::

Delegate communication includes the following functions:

- **Heartbeat:** The delegate sends a [heartbeat](<https://en.wikipedia.org/wiki/Heartbeat_(computing)>) to notify Harness Manager that it is running.
- **Deployment data:** The delegate sends information retrieved from API calls to Harness Manager for display on the **Deployments** page.
- **Time series and log data for Continuous Verification:** The delegate connects to the verification providers you configure and sends the data retrieved from those providers to Harness Manager for display in Harness Continuous Verification.

### Where to install?

- **Evaluating Harness:** When evaluating Harness, you might want to install the delegate locally. Ensure that it has access to the artifact sources, deployment environments, and verification providers you want to use with Harness.
- **Development, QA, and Production:** The delegate should be installed behind your firewall and in the same VPC as the micro-services you are deploying. The delegate must have access to the artifact servers, deployment environments, and cloud providers it needs.

### Delegate images

Harness Delegate does not have a root image. There are two non-root images that use similar tags. For example:

- `harness/delegate:yy.mm.verno`: Includes client tools like `kubectl`, Helm, and ChartMuseum.
- `harness/delegate:yy.mm.verno.minimal`: Does not include client tools. If you want to add tools to the image, Harness recommends that you create a custom image.

### Install a delegate

The video below shows how to install a delegate.

 <DocVideo src="https://www.loom.com/embed/a935f18296ee4156900efcf60f20f224" width="100%" height="600" />

For basic information on installing Harness Delegate, go to the following:

- [Delegate installation overview](../install-delegates/overview.md)
- [Install a legacy Kubernetes delegate](../install-delegates/install-a-kubernetes-delegate.md)

For advanced installation topics, go to the following:

- [Automate delegate installation](../install-delegates/automate-delegate-installation.md)
- [Install a delegate with third-party custom tool binaries](../install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries.md)

### Delegate sizes

:::danger delegate resources
Memory and CPU requirements are for the delegate only. Your delegate host/pod/container requires additional computing resources for its operating system and other services, such as Docker or Kubernetes.

The resource requirements for the delegate container depend on the type of tasks or executions. For instance, CI-only delegates can handle hundreds of parallel pipelines. However, for CD Terraform tasks, a single task might require a 2Gi container due to Terraform's memory requirements. Each Terraform command needs at least 500MB of memory.
 :::

One delegate size does not fit all use cases, so Harness lets you pick from several options:

| Replicas | Required memory / CPU | Maximum parallel deployments and builds across replicas |
| :------: | :-------------------: | :-----------------------------------------------------: |
|    1     |    2 GB / 0.5 CPU     |                           10                            |
|    2     |     4 GB / 1 CPU      |                           20                            |
|    4     |     8 GB / 2 CPU      |                           40                            |
|    8     |     16 GB / 4 CPU     |                           80                            |

Remember that the memory and CPU requirements are for the delegate only. Your delegate host/pod/container will need more computing resources for its operations systems and other services, such as Docker or Kubernetes.

Harness recommends adhering to the below guidelines when using the delegate with Harness Cloud Cost Management (CCM).

**Baseline Configuration:** For clusters with up to 200 nodes and 4000 pods, each delegate should be configured with 2 vCPUs and 8 GB of memory.

**Incremental Scaling:** For every additional 50 nodes and 1000 pods, the delegate capacity should be increased by 0.5 vCPUs and 2 GB of memory. This scaling ensures that the delegate can handle the increased load and continue to collect metrics efficiently.

**Single replica requirement:**

All specified resource requirements pertain to a single replica of the delegate.
Instead of utilizing Horizontal Pod Autoscaler (HPA) to increase the number of smaller-sized replicas Harness recommends provisioning each delegate with the necessary resources to handle the specified number of nodes and pods.

### Delegates list page

You can view a list of your delegates at the account, project, and org level.

- In Harness, select an account, a project, or an organization, then select **Settings**. Under **Resources**, select **Delegates**. The Delegates list page opens.

  Here's an Account Resources example:

  ![](./static/delegates-list-page.png)

The Delegates list page displays the following information:

- **Delegate:** The delegate name.
- **Connectivity Status:** The current connectivity status of the delegate. When Harness Manager receives the heartbeat, the **Connectivity Status** is **Connected**. If Harness Manager is not receiving a heartbeat from the installed delegate, the **Connectivity Status** is **Not Connected**.
- **Tags:** A delegate tag with the same name as your delegate is automatically added to your delegate during the configuration process. You can add additional tags. For more information, go to [Delegate tags](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors#delegate-tags).
- **Version:** The delegate version. For delegates with an immutable image type, the version number format is _`yy.mm.verno`_, the release year, month, and version in dot-separated format. For more information, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types/).
- **Instance Status:** Displays when your delegate expires. For more information, go to [Determine when your delegate expires](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration#determine-when-your-delegate-expires).
- **Last Heartbeat:** Displays the time (in seconds) since Harness Manager received the last delegate heartbeat.
- **Auto Upgrade:** The auto upgrade status of the delegate. When the delegate is first installed, the Delegates list page displays an **Auto Upgrade** status of **SYNCHRONIZING**. For more information, go to [Determine if automatic upgrade is enabled](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration#determine-if-automatic-upgrade-is-enabled).

### How Harness Manager picks delegates

Harness uses delegates for all operations. For example:

- **Connectors:** Connectors are used for all third-party connections.
- **Pipeline Services and Infrastructure:** Connectors are used in Pipeline Service connections to repos and Pipeline Infrastructure connections to target environments (deployment targets, build farms, etc).
- **Pipeline Steps:** You can select a delegate in each pipeline step to ensure that the step only uses that delegate to perform its operation.

In the case of all these delegate uses, you can select one or more specific delegates to perform the operation (using delegate tags). If you do not specify specific delegates, Harness assigns the task to a delegate.

#### Task assignment

In cases where you select specific delegates to perform the task, Harness uses those delegates only. If the delegates cannot perform the task, Harness does not use another delegate.

In cases where you do not select specific delegates, Harness selects an available delegate to perform the task based on the following:

- **Heartbeats:** Running delegates send heartbeats to the Harness Manager in one minute intervals. If the Manager does not have a heartbeat for a delegate when a task is ready to be assigned, it does not assign the task to that delegate.
- **Tags:** For more information, go to [Delegate tags](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors#delegate-tags).
- **Capability:** The delegate checks connectivity to your external systems to determine whether it can carry out the task. This process allows other delegates to assist in case access issues are found.

#### Delegate selection in pipelines

Delegates are selected in **Service** and **Infrastructure** connectors and in steps.

For example, in the **Infrastructure** section of a stage, there is a **Connector** setting. For Harness CD, this is the connector to the target infrastructure. For Harness CI, this is the connector to the build farm.

![](./static/delegates-overview-02.png)

When you add connectors to Harness, you can select several or all delegates for the connector to use.

Each CD step in the stage execution has a **Delegate Selector** setting.

![](./static/delegates-overview-03.png)

Here you use delegate tags to select the delegate(s) to use.

#### Which delegate is used during pipeline execution?

The delegates assigned to connectors and steps are used during pipeline execution.

If no delegates are selected, then the delegates are selected as described in [Task assignment](/docs/platform/delegates/delegate-concepts/delegate-overview.md#task-assignment).

If no delegates are selected for a CD step in its **Delegate Selector** setting, Harness prioritizes the delegate used successfully for the infrastructure connector.

Harness will try this delegate first for the step task because this delegate has been successful in the target environment.

import Selector from '/docs/platform/shared/selector-infrastructure.md'

<Selector />

Most CI steps use connectors to pull the image of the container where the step will run. The delegates used for the step's connector are not necessarily used for running the step. In general, the delegate(s) used for the connector in the **Infrastructure** build farm is used to run the step.

### Delegate high availability (HA)

You might need to install multiple delegates depending on how many Continuous Delivery tasks you do concurrently, and on the compute resources you are providing to each delegate. Typically, you will need one delegate for every 300-500 service instances across your applications.

In addition to compute considerations, you can enable HA for Harness Delegates. HA involves installing multiple delegates in your environment.

For example, your Kubernetes deployment could include two Kubernetes delegates, each running in its own pod in the same target cluster.

To add delegates to your deployment, increase the desired count of delegate replica pods in the **spec** section of the `harness-kubernetes.yaml` file that you download from Harness:

```yaml

---
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  labels:
    harness.io/app: harness-delegate
    harness.io/account: xxxx
    harness.io/name: test
  name: test-zeaakf
  namespace: harness-delegate
spec:
  replicas: 2
  selector:
    matchLabels:
      harness.io/app: harness-delegate
```

You only need one Kubernetes delegate in a cluster. Do not install additional delegates to create HA. Instead, you should increase the number of replicas pods.

If you want to install Kubernetes delegates in separate clusters, make sure they do not use the same `harness-kubernetes.yaml` file and name. Download a new Kubernetes YAML `spec` from Harness for each delegate you want to install. This avoids name conflicts.

In every case, delegates must be identical in terms of permissions, keys, connectivity, and so on. With two or more delegates running in the same target environment, you get HA by default. One delegate can go down without impacting Harness' ability to perform deployments. If you want more availability, you can set up three delegates to handle the loss of two delegates, and so on.

Two delegates in different locations with different connectivity do not support HA. For example, if you have a delegate in a Dev environment and another in a Prod environment, there is no communication between the two delegates. If either delegate fails, Harness stops operating in that environment.

### Delegate scope

Delegates are scoped in the following way:

#### Project/Org/Accounts

You can add delegates at the Project, Org, and Account level. Delegate availability then becomes subject to Harness implicit Project, Org, and Account hierarchy.

For example, let's look at two users, Alex and Uri, and the delegates (D*n*) available to them:

![](./static/delegates-overview-04.png)

Alex's Pipelines can use delegates D1, D2, or D4.

Uri's Pipelines can use delegates D1, D3, or D5.

### Delegate tags

When Harness makes a connection via its delegates, it selects the best delegate according to [How Harness Manager picks delegates](#how-harness-manager-picks-delegates).

To ensure a specific delegate is used by a Harness entity, you can add tags to delegates and then reference the tags in commands and connectors.

For more information, go to [Use delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors.md).

### Delegate logs

The delegate creates a new log daily, named `delegate.log`, and its maximum size is 50MB.

The log file is saved with the day's date. If a log file exceeds 50MB in a day, it is renamed with today's date, and a new log file is created.

Harness keeps log files for today and the previous 10 days (up to one 1GB).

The delegate logs are available in the Harness UI. When a pipeline runs and an error occurs due to the delegate, the **View Delegate Tasks Logs** option becomes available.

![](./static/view-delegate-task-logs.png)

Delegate logs are also sent to Harness by default. These Stackdriver logs are stored in Harness's GCP account.

:::warning
**Not Recommended:** If you want to prevent the delegate from sending its logs to the Harness platform, or if your firewall blocks access to Google's Stackdriver Logging API, you should set the `STACK_DRIVER_LOGGING_ENABLED` environment variable to `false` for the delegate. This will disable all remote logging and prevent connectivity issues.
:::

You can configure the delegate logging level by setting the `LOGGING_LEVEL` environment variable. Valid values are `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, and `OFF`. If an invalid value is specified, the logging level defaults to `DEBUG`. If no value is specified, the logging level defaults to `INFO`.

You can also customize delegate logging if the default setup doesn't fit your needs. For example, you can customize the layout, verbosity, and destination of the messages. For more information, go to [Customize delegate logging](/docs/platform/delegates/manage-delegates/customize-delegate-logging).

### Delegate permissions

You can set permissions on delegates using [Harness RBAC](/docs/platform/role-based-access-control/rbac-in-harness).

You create roles and then assign them to Harness users.

Delegate role permissions are Create/Edit, Delete, and View.

:::info note
You cannot disable the delegate View permission. Every user has the permission to view the delegate.
:::

Access to a delegate can also be restricted by downstream resource types:

- **Pipelines:** Execute
- **Secrets:** Access
- **Connectors:** Access

This means that if a role does not have these permissions, the user with that role cannot use the related delegates in these pipelines, secrets, or connectors.

### Delegate task capacity

:::note
This functionality is currently behind the feature flag `DELEGATE_TASK_CAPACITY_CHECK` and is available for Harness NextGen only. Contact [Harness Support](mailto:support@harness.io) to enable the feature. When the feature flag is enabled, the task is broadcast every minute in Harness Manager until it expires.
:::

Harness enables you to configure a maximum number of tasks for each delegate. This allows Harness Manager to use the task capacity to determine whether to assign a task to the delegate or queue it.

Delegate task capacity is only supported for CD tasks executed as child processes of a delegate (for example, it does not work for CI builds or CD Container step tasks that spin up new pods).

You can configure the maximum number of tasks using the environment variable, `DELEGATE_TASK_CAPACITY`.

```yaml
env:
  - name: DELEGATE_TASK_CAPACITY
    value: "2"
```

For example, if you set `DELEGATE_TASK_CAPACITY` to a value of 2 and execute 6 tasks in parallel, Harness Manager only executes 2 tasks at a time. If you don't configure `DELEGATE_TASK_CAPACITY`, Harness Manager executes all 6 tasks in parallel.

For more information about available delegate environment variables, go to [Delegate environment variables](/docs/platform/delegates/delegate-reference/delegate-environment-variables/).

### Third-party tools installed with the delegate

For details about the SDKs and third-party tools installed with the delegate, go to [Third-party tools included in the delegate image type](/docs/platform/delegates/delegate-concepts/delegate-image-types/#third-party-tools-included-in-the-delegate-image-type).
