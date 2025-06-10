---
title: Harness Self-Managed Enterprise Edition reference architectures
sidebar_label: Reference architectures
description: Review Harness Self-Managed Enterprise Edition reference architectures.
sidebar_position: 2
redirect_from:
  - /docs/self-managed-enterprise-edition/user-profiles
  - /docs/self-managed-enterprise-edition/advanced-configurations/reference-architecture
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Self-Managed Enterprise Edition brings a robust and flexible software delivery platform to organizations seeking control over their deployment infrastructure. This topic describes user profiles and reference architectures, outlining the key components and best practices for implementing Harness Self-Managed Enterprise Edition. Organizations can optimize their software delivery platform with these architectures, ensuring reliability, scalability, and consistent software deployments.

## User profiles

There are four user profiles for Harness Self-Managed Enterprise Edition.

- **Demo:** This profile for up to 10 users is for demonstration purposes to allow you to test Harness Self-Managed Enterprise Edition before onboarding. This profile enables you to run up to four simultaneous executions across two modules, CI and CD.
- **Small:** This profile for up to 200 users requires a licensed version of Harness Self-Managed Enterprise Edition. This profile enables you to run up to 100 simultaneous executions across two modules, CI and CD.
- **Medium:** This profile for up to 1000 users requires a licensed version of Harness Self-Managed Enterprise Edition. This profile enables you to run up to 500 simultaneous executions across two modules, CI and CD.
- **Large:** This profile for up to 3000 users requires a licensed version of Harness Self-Managed Enterprise Edition. This profile enables you to run up to 1000 simultaneous executions across two modules, CI and CD.

### Profile size and module execution details

| **Size** | **# of users** | **Parallel executions (CD)** | **Parallel executions (CI)** |
| :-- | :-- | :-- | :--
| Demo|Up to 10|2|2
| Small|Up to 200|50|50
| Medium|Up to 1000|250|250
| Large|Up to 3000|500|500

### Demo user requirements

Core CPU and memory requirements depend on the modules you use for demo purposes. CI and CD require a minimum of 3 core CPUs and 14-Gi of memory.

### Override files

Override files are available in the Harness [Helm chart repo](https://github.com/harness/helm-charts/blob/main/src/harness/).

- Demo: `override-demo.yaml`
- Small: `override-small.yaml`
- Medium: `override-medium.yaml`
- Large: `override-large.yaml`

#### Example installation and upgrade commands

You can use the following commands to upgrade/install via Helm for each profile. For complete Helm installation instructions, go to [Install using Helm](/docs/self-managed-enterprise-edition/install/install-using-helm).

##### Demo

   ```
   helm install my-release harness/harness-prod -n <namespace> -f your-override.yaml -f override-demo.yaml
   ```

   ```
   helm upgrade my-release harness/harness-prod -n <namespace> -f your-override -f override-demo.yaml
   ```

##### Small

```
helm install my-release harness/harness-prod -n <namespace> -f your-override -f override-small.yaml
```

```
helm upgrade my-release harness/harness-prod -n <namespace> -f your-override -f override-small.yaml
```

#### Medium

```
helm install my-release harness/harness-prod -n <namespace> -f your-override -f override-medium.yaml
```

```
helm upgrade my-release harness/harness-prod -n <namespace> -f your-override -f override-medium.yaml
```

##### Large

```
helm install my-release harness/harness-prod -n <namespace> -f your-override -f override-large.yaml
```

```
helm upgrade my-release harness/harness-prod -n <namespace> -f your-override -f override-large.yaml
```
