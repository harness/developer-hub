---
title: Harness Self-Managed Enterprise Edition Overview
sidebar_label: Overview
description: Learn about the on-premises Harness Self-Managed Enterprise Edition.
sidebar_position: 3
helpdocs_topic_id: tb4e039h8x
helpdocs_category_id: tvlmjozubh
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Self-Managed Enterprise Edition is an end-to-end solution for continuous, self-managed delivery. You can install and update Harness Self-Managed Enterprise Edition using online or offline (air-gapped) methods. This topic provides a summary comparison of Harness SaaS and self-managed offerings and describes the options for self-managed delivery.

For information about supported platforms, go to [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

## Compare Harness SaaS with self-managed

The following tables provide a summary of key differences between Harness SaaS and self-managed products.

**Table 1. Impacts**



|  | **Harness SaaS** | **Harness Self-Managed Enterprise Edition** |
| --- | --- | --- |
| **Platform Management** | Harness | Customer |
| **Hardware Cost** | — | ~$25,000 |
| **Hardware Maintenance** | — | Required |
| **Continuous Updates** | Daily | Weekly |
| **Security** | TLS/SSL Outbound | TLS/SSL Outbound |
| **Data Governance** | No Corporate Data Leaves Firewall | No Corporate Data Leaves Firewall |
| **Avg. Onboarding Time** | Days | Weeks |
| **Avg. Site Readiness** | Days | Weeks |
| **Avg. Support Res. Time** | Days | Weeks |



**Table 2. Modules and Features**

| **Module** | **Helm Install** | **KOTS Install** | **Notes** |
| --- | :-: | :-: | --- |
| Continuous Delivery (FirstGen and NextGen) | **✓** | **✓** |  |
| Security Testing Orchestration | **✓** | X |  |
| Service Reliability Management | **✓** | **✓** |  |
| Continuous Integration | **✓** | **✓** |  |
| Feature Flags | **✓** | **✓** |  |
| Cloud Costs Management | **✓** | X | This module is currently available in beta. Contact [Harness Support](mailto:support@harness.io) to enable it. |
| Continuous Error Tracking | **✓** | X | This module is currently available in beta. Contact [Harness Support](mailto:support@harness.io) to enable it. |
| Harness Chaos Engineering | **✓** | X | |
| Harness Platform | **✓** | **✓** |  |

## Architecture overview
Harness Self-Managed Enterprise Edition can be installed in a Kubernetes cluster or on virtual machines.

Review the following diagrams for your installation type.

### Kubernetes cluster configuration

Harness Self-Managed Enterprise Edition is installed in a Kubernetes cluster in the following configuration.

![](./static/harness-self-managed-enterprise-edition-overview-00.png)To install Harness Self-Managed Enterprise Edition in a Kubernetes cluster, use the following instructions:

1. For Self-Managed Enterprise Edition with Helm, go to [Install Harness Self-Managed Enterprise Edition Using Helm](../self-managed-helm-based-install/install-harness-self-managed-enterprise-edition-using-helm-ga.md).
2. For Self-Managed Enterprise Edition with KOTS, go to [Install Self-Managed Enterprise Edition Using KOTS](../deploy-with-kots/kubernetes-cluster-on-prem-kubernetes-cluster-setup.md).

**AWS architecture**

![](./static/aws_architecture_smpOverview.png) |
