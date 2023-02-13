---
title: Delegate requirements and limitations
description: This topic lists the limitations and requirements of the Harness Delegate. Before you begin. Delegates Overview. Delegate Limitations. Deployment limits --  Deployment limits are set by account type.. Y…
# sidebar_position: 2
helpdocs_topic_id: k7sbhe419w
helpdocs_category_id: vm60533pvt
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists the limitations and requirements of the Harness Delegate.

### Before you begin

* [Delegates Overview](/docs/platform/2_Delegates/get-started-with-delegates/delegates-overview.md)

### Delegate Limitations

* **Deployment limits:** Deployment limits are set by account type**.**
* You might need to install multiple Delegates depending on how many Continuous Delivery tasks you do concurrently, and on the compute resources you are providing to each Delegate. Typically, you will need one Delegate for every 300-500 service instances across your applications.  
A service instance is when you use Harness to deploy the underlying infrastructure for the instance.  
For example, an instance of a Kubernetes workload where Harness creates the pods, or an instance of an ECS task where Harness creates the service for the task.

### System Requirements

The Delegate is installed in your network and connects to the Harness Manager.

One Delegate size does not fit all use cases, so Harness let's you pick from several options:

![](./static/delegate-requirements-and-limitations-00
Remember that the memory and CPU requirements are for the Delegate only. You Delegate host/pod/container will need more computing resources for its operations systems and other services such as Docker or Kubernetes.

The Delegate runs on a Linux/UNIX container.

Access to artifact servers, deployment environments, and cloud providers. As shown in the following illustration:

![](./static/delegate-requirements-and-limitations-01.png)
### Allowlist Harness Domains and IPs

Harness SaaS Delegates only need outbound access to the Harness domain name (most commonly, **app.harness.io)** and, optionally, to **logging.googleapis.com**. The URL logging.googleapis.com is used to provide logs to Harness support.

See [Allowlist Harness Domains and IPs](/docs/platform/20_References/whitelist-harness-domains-and-ips.md).

### Network Requirements

The following network requirements are for connectivity between the Harness Delegate you run in your network and the **Harness Manager** (SaaS or On-Prem), and for your browser connection to the Harness Manager.

All network connections from your local network to Harness SaaS are outbound-only.* HTTPS port 443 outbound from the Delegate to Harness.
* Delegate requirements: The Delegate will need API/SSH/HTTP access to the providers you add to Harness, such as:
	+ Cloud Providers.
	+ Verification Providers.
	+ Artifact Servers (repos).
	+ Source repositories.
	+ Collaboration Providers.
	+ SSH access to target physical and virtual servers.

#### gRPC Limitations

If you do not enable gRPC connections, the following limitations apply:

* [Cloud Cost Management (CCM)](/docs/category/cloud-cost-management) will not collect events.

Contact [Harness Support](mailto:support@harness.io) to enable or disable feature flags.### Permissions and Ports

See [Permissions and Ports for Harness Connections](/docs/platform/20_References/permissions-and-ports-for-harness-connections.md).

### Add Certificates and Other Software to Delegate

For steps on adding certs or other software to the Delegate, see [Common Delegate Initialization Scripts](/docs/platform/2_Delegates/delegate-reference/common-delegate-profile-scripts.md).

### Delegate Access Requirements

* Delegates do not require root account access. Kubernetes and Docker delegates do, however, run as root by default. If you do not need to install applications during the initialization process (`INIT_SCRIPT`), you can use a non-root account or install the application without the delegate.  
See [Non-Root Delegate Installation](/docs/platform/2_Delegates/advanced-installation/non-root-delegate-installation.md).
* If you do not run the Delegate as root, be aware that you cannot install any software using a [Delegate Initialization Script](/docs/platform/2_Delegates/delegate-reference/common-delegate-profile-scripts.md).

