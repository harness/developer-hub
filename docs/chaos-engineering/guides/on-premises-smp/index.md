---
title: Overview
sidebar_position: 1
description: Understand the features facilitated by SMP.
redirect_from:
- /docs/chaos-engineering/get-started/ce-on-smp/ce-smp-roadmap
- /docs/category/ce-on-harness-self-managed-enterprise-edition
---

This topic describes features of SMP (Self-Managed Platform).

Feature availability on HCE SaaS and SMP are on par, with minor timeline changes in the SMP feature releases.

The table below outlines the roadmap for the Harness Self-Managed Enterprise Edition of Chaos Engineering:

| **Release version**| **Feature set** | **Deployment infrastructure** | **Supported platforms** | **Supported ingress** |
| --- | --- | --- | --- | --- |
| Limited GA (Current version)| Feature parity with SaaS | <ul><li> Cloud</li><li>Connected</li><li>Airgapped</li><li>Signed certificates</li></ul> | Kubernetes clusters | <ul><li>NGINX</li><li>Istio virtual services</li></ul> |
| General Availability (Coming soon)| Feature parity with SaaS |

:::info note
To install SMP in an air-gapped environment, go to [SMP in air-gapped environment](/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment).
:::

For more information, go to [What's supported](/docs/chaos-engineering/whats-supported).

For information on feature releases, go to [SMP Release Notes](/release-notes/self-managed-enterprise-edition).

## Prerequisites

This section describes the prerequisites to fulfill before using Enterprise ChaosHub.

The table below describes the SMP version and its equivalent chaos manager image required to connect to Enterprise ChaosHub.
Use the equivalent of the image mentioned here from your image registry. 

<table>
    <thead>
        <tr>
            <th>Version</th>
            <th>Chaos Manager Image</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0.26.x</td>
            <td>docker.io/harness/smp-chaos-manager-signed:1.54.1</td>
        </tr>
        <tr>
            <td>0.25.x</td>
            <td>docker.io/harness/smp-chaos-manager-signed:1.53.2</td>
        </tr>
        <tr>
            <td>0.24.x</td>
            <td>docker.io/harness/smp-chaos-manager-signed:1.49.3</td>
        </tr>
        <tr>
            <td>0.23.x</td>
            <td>docker.io/harness/smp-chaos-manager-signed:1.47.7</td>
        </tr>
    </tbody>
</table>

Update the chaos-manager image tag in the helm-override:

```yaml
chaos:
  chaos-manager:
    image:
      tag: "1.47.7" #Update the tag of chaos-manager image here
```

