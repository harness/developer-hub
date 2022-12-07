---
title: Harness Delegate Overview
description: Installing the Harness Delegate is the first step in setting up Harness.
# sidebar_position: 2
helpdocs_topic_id: h9tkwmkrm7
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](https://docs.harness.io/article/1fjmm4by22). Switch to [NextGen](/article/2k7lnc7lvl-delegates-overview).The Harness Delegate is a service you run in your local network or VPC to connect all of your artifact, infrastructure, collaboration, verification and other providers with the Harness Manager.

As explained in [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts), when you set up Harness for the first time, you install a Harness Delegate in your target infrastructure (for example, Kubernetes cluster, ECS cluster, EC2 subnet, Pivotal Cloud Foundry space, etc). Once the Delegate is installed, you can set up the resources and model your release process.

Most importantly, the Delegate performs all deployment operations.

For all the topics related to the Harness Delegate, see [Manage Harness Delegates](/category/gyd73rp7np-manage-delegates).In this article:

* [Limitations and Requirements](#limitations_and_requirements)
* [What Data does the Delegate Send to the Harness Manager?](#what_data_does_the_delegate_send_to_the_harness_manager)
* [Where do I Install the Delegate?](#where_do_i_install_the_delegate)
* [Install the Harness Delegate](#install_the_harness_delegate)
* [How Does Harness Manager Identify Delegates?](#how_does_harness_manager_identify_delegates)
* [How Does Harness Manager Pick Delegates?](#how_does_harness_manager_pick_delegates)
* [Delegate High Availability (HA)](#delegate_high_availability_ha)
* [Delegate Proxy Settings](#delegate_proxy_settings)
* [Delegate Scope](#delegate_scope)
* [Delegate Profiles](#delegate_profiles)
* [Delegate Selectors](#delegate_selectors)
* [Delegate Log File](#delegate_log_file)
* [Add Self-Signed Certificates for Delegate Connections](#add_self_signed_certificates_for_delegate_connections)
* [Troubleshooting](#troubleshooting)

### Limitations and Requirements

See [Delegate Requirements and Limitations](/article/lwynqsgxt9-delegate-requirements-and-limitations).

### What Data does the Delegate Send to the Harness Manager?

The Delegate and the Harness Manager (via SaaS) establish a Secure WebSocket channel (WebSocket over TLS) to send new Delegate task event notifications (not the tasks themselves) and exchange connection heartbeats. 

* **Heartbeat** - The Delegate sends a [heartbeat](https://en.wikipedia.org/wiki/Heartbeat_(computing)) to let the Harness Manager know that it is running.
* **Deployment data** - The information from the API executions the Delegate performs are sent to the Manager for display in the **Deployments** page.
* **Time series and log data for Continuous Verification** - The Delegate connects to the verification providers you have configured and sends their data to the Manager for display in Harness Continuous Verification.

### Where do I Install the Delegate?

* **Evaluating Harness** - When evaluating Harness, you might want to install the Delegate locally. Ensure that it has access to the artifact sources, deployment environments, and verification providers you want to use with Harness.
* **Development, QA, and Production** - The Delegate should be installed behind your firewall and in the same VPC as the micro-services you are deploying. The Delegate must have access to the artifact servers, deployment environments, and cloud providers it needs.

### Install the Harness Delegate

See the following topics:

* [Delegate Installation Overview](/article/igftn7rrtg-delegate-installation-overview)
* [Install the Harness Kubernetes Delegate](/article/0hn6vdpeqz-install-kubernetes-delegate)
* [Install the Harness Shell Script Delegate](/article/8o4cwqj1kv-install-shellscript-delegate)
* [Install the Harness ECS Delegate](/article/oiy5fxawzq-install-ecs-delegate)
* [Install the Harness Helm Delegate](/article/6n7fon8rit-using-the-helm-delegate)
* [Install the Harness Docker Delegate](/article/hnvvwbhbdu-install-docker-delegate)

### How Does Harness Manager Identify Delegates?

All Delegates are identified by your Harness account ID. But, depending on the type of Delegate, there are additional factors.

For Delegates running on virtual machines, such as the Shell Script and Docker Delegates running on an AWS EC2 instance, the Delegate is identified by the combination of **Hostname** and **IP**:

![](https://files.helpdocs.io/kw8ldg1itf/articles/h9tkwmkrm7/1560383229070/image.png)Therefore, if the hostname or IP changes on the VM, the Delegate cannot be identified by the Harness Manager. The IP used is the private IP. The Delegate connects to the Harness Manager, but the Harness Manager does not initiate a connection to the Delegate, and so the public IP address of the Delegate is not needed, typically.

For Kubernetes and ECS Delegates, the IP can change if a pod is rescheduled, for example. Consequently, Kubernetes Delegates are identified by a suffix using a unique six letter code in their **Hostname** (the first six letters that occur in your account ID):

![](https://files.helpdocs.io/kw8ldg1itf/articles/h9tkwmkrm7/1560383507971/image.png)ECS Delegates are identified by the **Hostname** entered when the ECS Delegate Task Spec is downloaded:

![](https://files.helpdocs.io/kw8ldg1itf/articles/h9tkwmkrm7/1560465943276/image.png)### How Does Harness Manager Pick Delegates?

When a task is ready to be assigned, the Harness Manager first validates its lists of Delegates to see which Delegate should be assigned the task.

The following information describes how the Harness Manager validates and assigns tasks to a Delegate:

* **Heartbeats** - Running Delegates send heartbeats to the Harness Manager in 1 minute intervals. If the Manager does not have a heartbeat for a Delegate when a task is ready to be assigned, it will not assign the task to that Delegate.
* **Selectors and Scoping** - For more information, see [Delegate Selectors](#delegate_selectors), [Delegate Scope](https://harness.helpdocs.io/article/h9tkwmkrm7-delegate-installation#delegate_scope), and [Map Tasks to Delegates and Profiles](/article/nzuhppobyg-map-tasks-to-delegates-and-profiles).
* **Whitelisting** - Once a Delegate has been validated for a task, it is whitelisted for that task and will likely be used again for that task. The whitelisting criteria is the URL associated with the task, such as a connection to a cloud platform, repo, or API. A Delegate is whitelisted for all tasks using that URL. The Time-To-Live (TTL) for the whitelisting is 6 hours, and the TTL is reset with each successful task validation.
* **Blacklisting** - If a Delegate fails to perform a task that Delegate is blacklisted for that task and will not be tried again. TTL is 5 minutes. This is true if there is only one Delegate and even if the Delegate is selected for that task with a Selector, such as with a Shell Script command in a Workflow.

### Delegate High Availability (HA)

You might need to install multiple Delegates depending on how many Continuous Delivery tasks you do concurrently, and on the compute resources you are providing to each Delegate. Typically, you will need one Delegate for every 300-500 service instances across your applications.

In addition to compute considerations, you can enable High Availability (HA) for Harness Delegates. HA simply involves installing multiple Delegates in your environment.

For example, in Kubernetes deployments, you can set up two Kubernetes Delegates, each in its own pod in the same target K8s cluster. Simply edit the Kubernetes Delegate spec you download from Harness, **harness-kubernetes.yaml**, to have multiple replicas:


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
For the Kubernetes Delegate, you only need one Delegate in the cluster. Simply increase the number of replicas, and nothing else. Do not add another Delegate to the cluster in an attempt to achieve HA.If you want to install Kubernetes Delegates in separate clusters, do not use the same **harness-kubernetes.yaml** and name for both Delegates. Download a new Kubernetes YAML spec from Harness for each Delegate you want to install. This will avoid name conflicts.For ECS deployments, set up two ECS Delegates as separate services in the same target ECS cluster. For Shell Script Delegates in AWS for example, set up two Delegate instances in the same target VPC.

In every case, the Delegates need to be identical in terms of permissions, keys, connectivity, etc.With two or more Delegates running in the same target environment, HA is provided by default. One Delegate can go down without impacting Harness' ability to perform deployments. If you want more availability, you can set up three Delegates to handle the loss of two Delegates, and so on.

Two Delegates in different locations with different connectivity do not support HA. For example, if you have a Delegate in a Dev environment and another in a Prod environment, the Dev Delegate will not communicate with the Prod Delegate or vice versa. If either Delegate went down, Harness would not operate in their environment.

### Delegate Proxy Settings

See [Configure Delegate Proxy Settings](/article/pfim3oig7o-configure-delegate-proxy-settings).

### Delegate Scope

See [Scope Delegates to Harness Components and Commands](/article/hw56f9nz7q-scope-delegates-to-harness-components-and-commands).

### Delegate Profiles

A Delegate Profile is mandatory. The [Primary Profile](/article/2uhtcqzaio-approve-or-reject-harness-delegates) is the default and contains no script. You can add a script to it, or create and apply new Profiles for your Delegate.A Delegate Profile enables you to run a startup script on the host/container/pod for a Harness Delegate when the Delegate is installed. You can create a single Delegate Profile and apply it to multiple Delegates.

See the following Delegate Profile topics:

* [Run Scripts on the Delegate using Profiles](/article/yd4bs0pltf-run-scripts-on-the-delegate-using-profiles)
* [Use Secrets in a Delegate Profile](/article/imzgiz9h41-use-a-secret-in-a-delegate-profile)
* [Common Delegate Profile Scripts](/article/nxhlbmbgkj-common-delegate-profile-scripts)
* [Approve or Reject Harness Delegates](/article/2uhtcqzaio-approve-or-reject-harness-delegates)

### Delegate Selectors

Delegate Selectors were formerly called Tags. Now, *Tags* refers only to tagging Harness Application components as described in [Using Tags](/article/nrxfix3i58-tags).When Harness makes a connection via its Delegates, it will select the best Delegate according to [How Does Harness Manager Pick Delegates?](#how_does_harness_manager_pick_delegates).

To ensure a specific Delegate is used by a Harness entity, you can add Selectors to Delegates and then reference the Selectors in commands and configurations.

See [Select Delegates with Selectors](/article/c3fvixpgsl-select-delegates-for-specific-tasks-with-selectors) and [Map Tasks to Delegates and Profiles](/article/nzuhppobyg-map-tasks-to-delegates-and-profiles).

### Delegate Log File

The Delegate creates a new log file each day, named **delegate.log**, and its maximum size is 50MB.

Every day the log file is saved with the day's date and a new log file is created.

If a log file grows beyond 50MB in a day, the log file is renamed with today's date and a new log file is created.

Harness keeps log files for today and the previous 10 days (up to one 1GB).

#### Delegate Log Parameters

Here are some examples of the common Delegate log parameters and what they mean:

* **CPU Process:** current CPU load of the Delegate JVM process (0% - 100%).
* **CPU System:** current CPU load of the overall system (0% - 100%).
* **Max Executing Task Count:** maximum number of parallel executing tasks since the last performance printout (not including validation tasks).
* **Max Executing Future Count:** same as **Max Executing Task Count**, but holds different data used by Harness.
* **Max Validating Task Count:** maximum number of validation tasks since last performance printout.
* **Max Validating Future Count:** same **Max Validating Task Count**, but holds different data used by Harness.

### Add Self-Signed Certificates for Delegate Connections

See [Add Self-Signed Certificates for Delegate Connections](/article/8bj3v5jqzk-add-self-signed-certificates-for-delegate-connections).

### Troubleshooting

See [Troubleshooting](/article/g9o2g5jbye-troubleshooting-harness).

