---
title: What's supported
description: Supported dashboards features and integrations.
sidebar_position: 1
---

This topic lists the supported dashboard features and integrations you can use in Harness.

For a comprehensive list that includes all Harness modules, go to [Supported platforms and technologies](/docs/getting-started/supported-platforms-and-technologies).

## Custom Dashboards Harness module support

| Module | SaaS | Self-Managed Enterprise Edition |
| :--: |  :--: | :--: |
| CE | ✅ |  |
| CET| ✅ |  |
| CI | ✅ | ✅ |
| CCM| ✅ | ✅ (Beta) |
| CD | ✅ | ✅ |
| CV | ✅ |  |
| FF | ✅ | ✅ (Beta) |
| SEI|  |  |
| SRM| ✅ | ✅ (Beta) |
| STO| ✅ | ✅ (Beta) |

## Custom Dashboards Self-Managed Enterprise Edition support

| **Connected/Air-gapped** | **Network ingress**         | **Certificate**      | **Supported** |
| ----------------------- | ----------------------------- | -------------------- | ------------------------------- |
| Connected               | Istio strict mode             | Self-signed          | ✅           |
| Connected               | Istio strict mode             | Public          |            |
| Connected               | Nginx             | Self-signed          | ✅           |
| Connected               | Nginx             | Public          |            |
| Air-gapped               | Istio strict mode             | Self-signed          | ✅ (Beta)     |
| Air-gapped               | Istio strict mode             | Public          |            |
| Air-gapped                | Nginx             | Self-signed          | ✅ (Beta)    |
| Air-gapped               | Nginx             | Public          |            |

## Custom dashboards support known limitations

- CCM models have a query limit of 350GB per tile.

- Self-Managed Enterprise Edition:

   - Harness does not support FIPS compliant environments.

   - Air-gapped installations are in beta and require a license renewal every 365 days. 
