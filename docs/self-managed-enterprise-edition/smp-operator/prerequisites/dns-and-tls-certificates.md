---
title: DNS and TLS certificates
sidebar_label: DNS and TLS Certificates
description: Set up DNS resolution and certificate management before you install with the SMP Operator.
sidebar_position: 4
keywords:
  - dns
  - tls
  - certificates
  - istio
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## DNS configuration

The Harness Installer requires an externally resolvable DNS hostname that points to your load balancer or ingress controller.

### Requirements

Your DNS hostname must meet both of the following conditions.

- DNS must be **externally resolvable** from client browsers
- Points to a **load balancer** configured for TLS pass-through (port 443)

### Set the DNS

Set the DNS hostname with whichever method you use to install.

<Tabs>
<TabItem value="helm-t1" label="helm" default>

```yaml
cluster:
  tfi:
    dns: platform.example.com
```

</TabItem>
<TabItem value="clustermgr-t1" label="clustermgr">

```bash
--dns platform.example.com 
```

</TabItem>
</Tabs>

## TLS certificates

You either let the operator generate a self-signed certificate or supply your own.

### Auto-generated self-signed certificates (default)

By default, the operator generates a self-signed TLS certificate with the following characteristics.

- Stored as a Kubernetes Secret named after the DNS hostname (e.g., `platform.example.com`)
- Used for TLS termination at the ingress controller

### Bring your own certificates

To use your own TLS certificate, provide the certificate and private key:

<Tabs>
<TabItem value="helm-t2" label="helm" default>

```bash
  --set-file cluster.tfi.private_key=/path/to/tls_private_key.pem 
  --set-file cluster.tfi.tls_cert=/path/to/tls_cert.crt 
  --set-file cluster.tfi.root_ca_cert=/path/to/root_ca.crt 
```

</TabItem>
<TabItem value="clustermgr-t2" label="clustermgr">

```bash
  --pi-set-file cluster.tfi.private_key="</path/to/tls_private_key.pem>" 
  --pi-set-file cluster.tfi.tls_cert="</path/to/tls_cert.crt>" 
  --pi-set-file cluster.tfi.root_ca_cert="</path/to/root_ca.crt>"
```

</TabItem>
</Tabs>

### Istio TLS considerations

If you use Istio ingress, the TLS secret must be in the **same namespace as the Istio ingress gateway pod**. 

#### Scenario 1: Harness SMP Operator installs Istio

When the operator deploys Istio, it manages the TLS secret automatically.

- The TLS secret is created in the operator namespace (e.g., `harness`)
- The Istio ingress gateway pod also runs in the operator namespace

The operator creates a TLS secret named `platform.example.com` in the `harness` namespace.

For more information, see [Install with Istio - Scenario 1](/docs/self-managed-enterprise-edition/smp-operator/install/install-with-smp-operator#scenario-1-fresh-istio-install).


#### Scenario 2: You have existing Istio

If you use an existing Istio deployment, the operator does **not** manage the TLS secret. Ensure the following:

- A TLS secret exists in the namespace where the Istio ingress gateway pod runs
- The TLS secret name must match the DNS value only when the operator creates the Istio Gateway (see [Install with Istio - Scenario 2](/docs/self-managed-enterprise-edition/smp-operator/install/install-with-smp-operator#scenario-2-existing-istio-no-gatewayvirtualservice))
- In [Install with Istio - Scenario 3](/docs/self-managed-enterprise-edition/smp-operator/install/install-with-smp-operator#scenario-3-existing-istio--gateway), the operator creates only the VirtualService, so TLS secret naming is handled by your existing Gateway configuration
