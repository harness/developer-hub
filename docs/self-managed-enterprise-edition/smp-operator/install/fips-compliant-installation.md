---
title: FIPS-compliant installation
sidebar_label: FIPS Install
description: Configure Istio components to enforce FIPS cryptographic standards.
sidebar_position: 5
keywords:
  - fips
  - compliance
  - istio
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

FIPS-compliant mode configures Istio components to enforce FIPS cryptographic standards. This is required for deployments in regulated environments.

This topic covers how you enable FIPS mode with either helm or clustermgr, and how you override the default compliance policy.

:::warning Review both constraints before you enable FIPS

- **Istio ingress is mandatory**: FIPS mode requires **Istio** as the ingress type. The default nginx ingress controller does not support FIPS-compliant operation.
- **Enablement is permanent**: Once FIPS mode is enabled (`fips: true`), reverting it to `false` is not supported.

:::

---

## Enabling FIPS Mode

Enable FIPS mode at install time by setting the ingress type to Istio and turning on the `fips` input.

<Tabs>
<TabItem value="helm-t1" label="helm" default>

FIPS mode requires **Istio** ingress. Reuse the same Istio scenario files from [Install with Istio](/docs/self-managed-enterprise-edition/smp-operator/install/install-with-smp-operator#install-with-istio), and add FIPS in your base `override.yaml`:

```yaml
cluster:
  tfi:
    ingressType: istio
    fips: true
```

</TabItem>
<TabItem value="clustermgr-t1" label="clustermgr">

FIPS mode requires **Istio** ingress. Reuse the same Istio scenario parameters from [Install with Istio](/docs/self-managed-enterprise-edition/smp-operator/install/install-with-smp-operator#install-with-istio), and add `-i fips=true`:

```bash
./clustermgr install-pi \
  --dns <DNS> \
  --email <EMAIL> \
  --password '<PASSWORD>' \
  --version <WORKFLOW_VERSION> \
  -i ingressType=istio \
  -i fips=true
```

</TabItem>
</Tabs>

When Istio is deployed by the Harness SMP Operator, this sets the `COMPLIANCE_POLICY` environment variable on both `istiod` (pilot) and `istio-ingressgateway` pods. The default compliance policy is `fips-140-2`.

### Overriding the Compliance Policy

If your environment requires a standard other than the `fips-140-2` default, set the compliance policy explicitly.

<Tabs>
<TabItem value="helm-t2" label="helm" default>

Set a different compliance policy in `values.yaml`:

```yaml
cluster:
  tfi:
    fipsCompliancePolicy: fips-140-3
```

</TabItem>
<TabItem value="clustermgr-t2" label="clustermgr">

Pass the desired compliance policy:

```bash
-i fipsCompliancePolicy=fips-140-3
```

</TabItem>
</Tabs>

| Input | Helm value | clustermgr input | Default | Description |
| --- | --- | --- | --- | --- |
| `fips` | `cluster.tfi.fips` | `-i fips=true` | `false` | Enable FIPS-compliant mode |
| `fipsCompliancePolicy` | `cluster.tfi.fipsCompliancePolicy` | `-i fipsCompliancePolicy=<policy>` | `fips-140-2` | FIPS compliance policy for Istio components |


For more information on FIPS compliance in Harness, see [Harness FIPS Overview](https://developer.harness.io/docs/self-managed-enterprise-edition/smp-fips-overview/).
