---
title: Delegate overview
description: Harness Delegate is a service you run in your local network or VPC to connect your artifact, infrastructure, collaboration, verification and other providers with Harness Manager.
sidebar_position: 10
helpdocs_topic_id: 2k7lnc7lvl
helpdocs_category_id: sy6sod35zi
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Delegate is a service you run in your local network or VPC to connect your artifacts, infrastructure, collaboration, verification and other providers, with Harness Manager.

The first time you connect Harness to a third-party resource, the delegate is installed in your target infrastructure, for example, a Kubernetes cluster. 

After the delegate is installed, you connect to third-party resources. The delegate performs all operations, including deployment and integration.

Harness Delegate is built for parallelism and performs tasks and deployments in parallel. The following table includes performance benchmarks for one NextGen delegate executing perpetual tasks and parallel deployments in a Kubernetes environment.



| **Delegate** | **Compute resources** | **Task type** | **Running in parallel** |
| :-- | :-- | :-- | :-- |
| NextGen Delegate | 0.5 CPU, 2 GiB | Perpetual | 40 tasks |
| NextGen Delegate | 0.5 CPU, 2 GiB | Kubernetes deployment | 10 deployments |
| NextGen Delegate | 1.0 CPU, 4 GiB | Kubernetes deployment | 20 deployments |

### Limitations and requirements

See [Delegate Requirements and Limitations](delegate-reference/delegate-requirements-and-limitations.md).

### Data the delegate sends to Harness Manager

Harness Delegate connects to Harness Manager over an outbound HTTPS/WSS connection.

![](./static/delegates-overview-00.png)

The delegate connects to Harness Manager (via SaaS) over a Secure WebSockets channel (WebSockets over TLS). The channel is used to send notifications of delegate task events and to exchange connection heartbeats. The channel is not used to send task data itself.

* **Heartbeat**. The delegate sends a [heartbeat](https://en.wikipedia.org/wiki/Heartbeat_(computing)) to notify Harness Manager that it is running.
* **Deployment data**. The delegate sends information retrieved from API calls to Harness Manager for display on the **Deployments** page.
* **Time series and log data for Continuous Verification**. The delegate connects to the verification providers you configure and sends the data retrieved from those providers to Harness Manager for display in Harness Continuous Verification.

### Where do I install the delegate?

* **Evaluating Harness**. When evaluating Harness, you might want to install the delegate locally. Ensure that it has access to the artifact sources, deployment environments, and verification providers you want to use with Harness.
* **Development, QA, and Production**. The delegate should be installed behind your firewall and in the same VPC as the micro-services you are deploying. The delegate must have access to the artifact servers, deployment environments, and cloud providers it needs.

### Root or non-root installation

Harness Delegate does not have a root image. There are two non-root images that use the same tag. For example:

* `harness/delegate:22.03.74411`
* `harness/delegate:22.03.74411.minimal`

The first image includes client tools like `kubectl`, Helm, and ChartMuseum. The second image, for which the `minimal` tag is appended, does not include those client tools.

If you want to add tools to the image, Harness recommends the creation of a custom image.

### Install Harness Delegate

For basic information on installing Harness Delegate, see the following topics:

* [Install Harness Delegate on Kubernetes](install-delegates/kubernetes-delegates/install-harness-delegate-on-kubernetes.md)
* [Install Harness Delegate Using Helm](install-delegates/kubernetes-delegates/install-harness-delegate-using-helm.md)
* [Install a Docker Delegate](install-delegates/docker-delegates/install-a-docker-delegate.md)
* [Install a Legacy Kubernetes Delegate](install-delegates/kubernetes-delegates/install-a-kubernetes-delegate.md)

For advanced installation topics, see the following:

* [Automate Delegate Installation](advanced-installation/automate-delegate-installation.md)
* [Non-Root Delegate Installation](advanced-installation/non-root-delegate-installation.md)
* [Install a Delegate with Third-Party Custom Tool Binaries](advanced-installation/install-a-delegate-with-3-rd-party-tool-custom-binaries.md)

### Delegate sizes

One delegate size does not fit all use cases, so Harness lets you pick from several options:

![](./static/delegates-overview-01.png)

The specified memory and CPU requirements support the delegate. The delegate host/pod/container requires additional compute resources for its operations systems and other services such as Docker or Kubernetes.

### How does Harness Manager identify delegates?

Delegates are identified by Harness account ID. Some types of delegates use additional identification.

For delegates running on virtual machines, such as the Shell Script and Docker Delegates running on an AWS EC2 instance, the delegate is identified by the combination of **Hostname** and **IP address**.

Therefore, if the hostname or IP address changes on the VM, the delegate cannot be identified by the Harness Manager. The IP address used is the private IP. The delegate connects to Harness Manager, but Harness Manager does not initiate a connection to the delegate. The delegate's public IP address is not typically required.

For Kubernetes delegates, the IP address can change if a pod is rescheduled. Consequently, Kubernetes delegates are identified by a suffix using a unique six-letter code in their **Hostname** (the first six letters that occur in your account ID).

### How does Harness Manager pick delegates?

Delegates are used by Harness for all operations. For example:

* **Connectors:** Connectors are used for third-party connections.
* **Pipeline Services and Infrastructure:** Connectors are used in Pipeline Service connections to repositories and Pipeline Infrastructure connections to target environments (deployment targets, build farms, and so on).
* **Pipeline Steps:** You can select a delegate in each pipeline step to ensure that the step only uses that delegate to perform its operation.

You can use delegate tags to assign specific delegates to operations. Otherwise, Harness assigns delegates their tasks.

#### Task assignment

In cases where you have selected specific delegates to perform the task, Harness uses those delegates only. If these delegates cannot perform the task, Harness does not use another delegate.

In cases where you do not select specific delegates, Harness uses any available delegate to perform the task. Harness uses the follow process and criteria to pick a delegate.

When a task is ready to be assigned, the Harness Manager first validates its lists of delegates to see which delegate should be assigned the task.

The following information describes how the Harness Manager validates and assigns tasks to a delegate:

* **Heartbeats**. Running delegates send heartbeats to the Harness Manager in one-minute intervals. If the Manager does not have a heartbeat for a delegate when a task is ready to be assigned, it will not assign the task to that Delegate.
* **Tags**. For more information, see [Select Delegates with Tags](delegate-guide/select-delegates-with-selectors.md).
* **Allowlisting**. Once a delegate is validated for a task, it is allow-listed for that task and will likely be used again for that task. The allow-listing criteria is the URL associated with the task, such as a connection to a cloud platform, repository, or API. A delegate is allow-listed for all tasks using that URL. The time-to-live (TTL) for the allow-listing is six hours, and the TTL is reset with each successful task validation.
* **Blocklisting**. If a delegate fails to perform a task that delegate is blocklisted for that task and will not be tried again. The TTL is 5 minutes. This is true if there is only one delegate and even if the delegate is selected for that task with a selector, such as with a shell script step in a stage.

#### Delegate selection in pipelines

As stated above, delegates are selected in Service and Infrastructure Connectors and in steps.

For example, in the **Infrastructure** section of a stage, there is a **Connector** setting. For Harness CD, this is the connector to the target infrastructure. For Harness CI, this is connector to the build farm.

![](./static/delegates-overview-02.png)

When you add connectors to Harness, you can select one or more delegates for the connector to use.

Each CD step in the stage execution has a **Delegate Selector** setting.

![](./static/delegates-overview-03.png)

Here you use delegate tags to select the delegates to use.

#### Which delegate is used during pipeline execution?

The delegates assigned to Connectors and steps are used during Pipeline execution.

If no Delegates are selected, then the Delegates are selected as described in [Task Assignment](delegates-overview.md#task-assignment).

If no delegates are selected for a CD step in its **Delegate Selector** setting, Harness prioritizes the delegate used successfully for the Infrastructure Connector.

Harness will try this Delegate first for the step task because this delegate was successful in the target environment.

Most CI steps use connectors to pull the image of the container where the step will run. The delegates that are used for the step connector are not necessarily used for running the step. In general, the delegate that is used for the connector in the **Infrastructure** build farm is used to run the step.

### Delegate high availability (HA)

You might need to install multiple delegates depending on how many Continuous Delivery tasks you do concurrently, and on the compute resources you provide to each delegate. Typically, one delegate is required for every 300 to 500 service instances across applications.

In addition to compute considerations, you can enable high availability (HA) for Harness Delegates. HA simply involves installing multiple delegates in your environment.

For example, your Kubernetes deployment could include two Kubernetes delegates, each running in its own pod in the same target cluster. To add delegates to your deployment, increase the desired count of delegate replica pods in the **spec** section of the harness-kubernetes.yaml file that you download from Harness:


```
...  
apiVersion: apps/v1beta1  
kind: StatefulSet  
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
...
```

For the Kubernetes delegate, you need only one delegate in the cluster. Simply increase the number of replicas, and nothing else. Do not add another delegate to the cluster in an attempt to achieve HA. If you want to install Kubernetes delegates in separate clusters, do not use the same **harness-kubernetes.yaml** and name for both delegates. Download a new application manifest for each Delegate you want to install. This strategy prevents name conflicts. Delegates must be identical in terms of permissions, keys, connectivity, and so on. With two or more delegates running in the same target environment, high availability is provided by default. One delegate can fail without impacting Harness' ability to perform deployments. If you want more availability, you can set up three delegates to handle the loss of two delegates, and so on.

Two delegates in different locations with different connectivity do not support high availability. For example, if you have a delegate in a development environment and another in a production environment, the development delegate will not communicate with the production delegate and vice versa. If one delegate fails, Harness ceases operation in that environment.

### Delegate scope

Delegates are scoped in two ways:

#### Project/Org/Accounts

You can add delegates at the Project, Org, and Account level. Delegate availability is then subject to Harness implicit Project, Org, and Account hierarchy.

For example, let's look at two users, Alex and Uri, and the delegates (D*n*) available to them:

![](./static/delegates-overview-04)

Alex's pipelines can use delegates D1, D2, or D4.

Uri's pipelines can use delegates D1, D3, or D5.

### Delegate tags

When Harness makes a connection using its delegates, it selects the best delegate as described in [How Does Harness Manager Pick Delegates?](#how_does_harness_manager_pick_delegates).

To ensure a specific delegate is used by a Harness entity, you can add tags to the delegate and then reference the tags in commands and connectors.

See [Select Delegates with Tags](delegate-guide/select-delegates-with-selectors.md).

### Delegate log file

The delegate creates a new log file each day, named **delegate.log**, and its maximum size is 50 MB.

Every day the log file is saved with the day's date and a new log file is created.

If a log file grows beyond 50 MB in a day, the log file is renamed with the current date and a new log file is created.

Harness keeps log files for the current day and the 10 previous days (up to one 1 GB).

### Delegate permissions

You can set permissions on delegates using [Harness RBAC](../4_Role-Based-Access-Control/1-rbac-in-harness.md).

You create roles and then assign them to Harness users.

There are role permissions for delegates:

The permissions are:

* **Delegate permissions:** Create/Edit, Delete, View.
* Delegate **View** permissions cannot be disabled. Every user has the permissions required to view the delegate.

Access to a delegate can also be restricted by downstream resource types:

* **Pipelines:** Execute
* **Secrets:** Access
* **Connectors:** Access

This means that if a role does not have these permissions, the user with that role cannot use the related delegates in pipelines, secrets, or connectors.

### Third-party tools installed with the delegate

See [Supported Platforms and Technologies](../../getting-started/supported-platforms-and-technologies.md).

