---
title: Harness Self-Managed Enterprise Edition overview
description: Learn about the on-premises Harness Self-Managed Enterprise Edition.
# sidebar_position: 10
helpdocs_topic_id: tb4e039h8x
helpdocs_category_id: tvlmjozubh
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Self-Managed Enterprise Edition is an end-to-end solution for continuous, self-managed delivery. You can install and update Harness Self-Managed Enterprise Edition using online or offline (air-gapped) methods. This topic provides a summary comparison of Harness SaaS and self-managed offerings and describes the options for self-managed delivery.

For information about supported platforms, go to [Support platforms and technologies](../../getting-started/supported-platforms-and-technologies.md)

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
| Cloud Costs Management | X | X |  |
| Harness Chaos Engineering | X | X |  |
| Harness Platform | **✓** | **✓** | Custom Dashboard is not included. |

