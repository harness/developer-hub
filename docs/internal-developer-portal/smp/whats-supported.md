---
title: What's Supported
sidebar_position: 1
sidebar_label: What's Supported
description: Guide for configuring and deploying Harness IDP in Self Managed Platform environments
---

:::info Harness IDP SMP Edition [BETA]
Harness IDP Self-Managed Platform (SMP) Edition is currently in **BETA**. Please refer to the [Harness IDP Release Notes](/release-notes/internal-developer-portal.md) to keep track of new feature updates and improvements.
:::

[Harness Self-Managed Enterprise Edition](https://developer.harness.io/docs/self-managed-enterprise-edition/smp-overview) is an on-premises solution that allows you to install and run Harness on your own infrastructure. It gives you full control over data, security, and compliance while leveraging Harness’s software delivery capabilities. **Harness IDP** is available for the **Self-Managed Enterprise Edition**. This means you can use Harness IDP with the SMP version on your own infrastructure.

:::info Only for IDP 2.0
Harness IDP on SMP is available only for **IDP 2.0**. **IDP 1.0** is **not supported** on SMP.
:::

## Supported Infrastructure
The Self-Managed Enterprise Edition runs within the customer’s environment alongside existing services. You must have a Kubernetes cluster with a configured load balancer. Harness IDP is supported on SMP only when the control plane is deployed on **Google Cloud Platform (GCP)** using **Google Kubernetes Engine (GKE)**. Deployments on AWS (EKS), Azure (AKS), on-prem, or OpenShift are **not supported**.

## Supported Features

The following features are supported for Harness IDP SMP Edition:

| **Feature**              | **Status in SMP** | **Notes**                    |
|--------------------------|-------------------|------------------------------|
| Catalog                  | ✅                |                              |
| Self Service Workflows   | ✅                |                              |
| Scorecards               | ✅                |                              |
| Git Experience           | ✅                |                              |
| Environment Management   | ❌                | Not supported in SMP edition |
| Plugins                  | ❌                | Not supported in SMP edition |
| TechDocs                 | ❌                | Not supported in SMP edition |
| RBAC                     | ✅                |                              |

## Next Steps
Go to [Onboarding Guide](/docs/internal-developer-portal/smp/idp-onboarding.md) to learn how to deploy Harness IDP on SMP.