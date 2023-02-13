---
title: Delegate requirements
description: This topic lists the requirements for the Harness Delegate. 
# sidebar_position: 2
helpdocs_topic_id: k7sbhe419w
helpdocs_category_id: vm60533pvt
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists the requirements for the Harness Delegate.

## Important notes

Note the following important information about delegates:

* Deployment limits are set by account type.

* You might need to install multiple delegates depending on how many continuous delivery tasks you do concurrently, and on the number of compute resources you provide to each delegate. Typically, you need one delegate for every 300-500 service instances across your applications.  

	A service instance is when you use Harness to deploy the underlying infrastructure for the instance.  

	For example, an instance of a Kubernetes workload where Harness creates the pods, or an instance of an ECS task where Harness creates the service for the task.

* The delegate is installed in your network and connects to the Harness Manager.

* One delegate size does not fit all use cases, so Harness lets you pick from several options:

	![](./static/delegates-overview-01.png)

	The memory and CPU requirements are for the delegate only. Your delegate host, pod, or container will need more computing resources for its operations systems and other services such as Docker or Kubernetes.

* The delegate runs on a Linux/UNIX server or container.

* The minimum memory for the delegate must be provided in addition to enough memory for the host/node system. For example, an AWS EC2 instance type such as m5a.xlarge has 16GB of RAM; 8 for the delegate and 8 for the remaining operations.

* The ​Shell Script delegate requires cURL 7.64.1 or later.

* Access to artifact servers, deployment environments, and cloud providers is required, as shown in the following illustration:

![](./static/delegate-requirements-and-limitations-01.png)

## Allowlist Harness domains and IPs

Harness SaaS delegates only need outbound access to the Harness domain name, most commonly, **app.harness.io**, and optionally, to **logging.googleapis.com**. The URL **logging.googleapis.com** is used to provide logs to Harness Support.

Go to [Allowlist Harness Domains and IPs](/docs/platform/20_References/whitelist-harness-domains-and-ips.md).

## Network requirements

The following network requirements are for connectivity between the Harness delegate you run in your network and the **Harness Manager** (SaaS or on-prem), and for your browser connection to the Harness Manager.

:::note
All network connections from your local network to Harness SaaS are outbound-only.
:::

* HTTPS port 443 outbound from the delegate to Harness.
* HTTP/2 for gRPC (gRPC Remote Procedure Calls)
* The delegate requires API/SSH/HTTP access to the providers you add to Harness, such as:
	+ Cloud providers
	+ Verification providers
	+ Artifact servers (repos)
	+ Source repositories.
	+ Collaboration providers
	+ SSH access to target physical and virtual servers

### gRPC limitations

If you do not enable gRPC connections, the following limitations apply:

* [Cloud Cost Management (CCM)](/docs/category/cloud-cost-management) does not collect events.
* If the `ARTIFACT_PERPETUAL_TASK` feature flag is enabled in your account, Harness performs perpetual artifact collection. If you do not enable gRPC connections, this does not work.

Contact [Harness Support](mailto:support@harness.io) to enable or disable feature flags.

## Permissions and ports

Go to [Permissions and Ports for Harness Connections](/docs/platform/20_References/permissions-and-ports-for-harness-connections.md).

## Add certificates and other software to the delegate

For steps on adding certificates or other software to the delegate, go to [Common Delegate Initialization Scripts](/docs/platform/2_Delegates/delegate-reference/common-delegate-profile-scripts.md).

## Delegate access requirements

The Harness delegate does NOT require root account access, but the Kubernetes and Docker delegates run as root by default. If you do not need to install applications using Delegate Profiles, then you can use a non-root account or install the application without the delegate.  

For more information, go to [Non-Root Delegate Installation](/docs/platform/2_Delegates/advanced-installation/non-root-delegate-installation.md).

If you do not run the delegate as root, be aware that you cannot install any software using a [Delegate Initialization Script](/docs/platform/2_Delegates/delegate-reference/common-delegate-profile-scripts.md).

