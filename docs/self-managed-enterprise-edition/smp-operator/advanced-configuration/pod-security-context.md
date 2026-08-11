---
title: Pod security context
sidebar_label: Pod Security Context
description: Configure pod and container security contexts for non-root container execution.
sidebar_position: 2
keywords:
  - pod security context
  - runAsNonRoot
  - seccomp
  - runAsUser
  - fsGroup
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The pod and container security contexts control the user and group the operator containers run as. The installer sets `runAsUser: 1000` and `fsGroup: 1000` by default, and you can override these values to meet your organization's security policies.

---

## Default security context

The installer applies the following configuration unless you override it. The containers run as non-root, privilege escalation is disabled, and the `RuntimeDefault` seccomp profile is applied.

```yaml
podSecurityContext:
  runAsUser: 1000
  fsGroup: 1000
  runAsNonRoot: true
  fsGroupChangePolicy: "OnRootMismatch"
  seccompProfile:
    type: RuntimeDefault

containerSecurityContext:
  runAsUser: 1000
  runAsGroup: 1000
  allowPrivilegeEscalation: false
  runAsNonRoot: true
```

---

## Customize the security context

Override the default user and group IDs when your security policies require different values. Select the tab that matches your installation method.

<Tabs>
<TabItem value="helm-t1" label="helm" default>

Override the default user and group IDs in `override.yaml`:

```yaml
podSecurityContext:
  runAsUser: 65532
  fsGroup: 65532
  runAsNonRoot: true
  fsGroupChangePolicy: "OnRootMismatch"
  seccompProfile:
    type: RuntimeDefault

containerSecurityContext:
  runAsUser: 65532
  runAsGroup: 65532
  allowPrivilegeEscalation: false
  runAsNonRoot: true
```

</TabItem>
<TabItem value="clustermgr-t1" label="clustermgr">

Pass the user and group IDs as input arguments on the install command:

```bash
./clustermgr install-pi \
  --dns platform.example.com \
  --version 0.43.0 \
  -i runAsUser=65532 \
  -i fsGroup=65532
```

The command sets the following values:

```yaml
podSecurityContext:
  runAsUser: 65532
  fsGroup: 65532

containerSecurityContext:
  runAsUser: 65532
  runAsGroup: 65532
```

</TabItem>
</Tabs>

---

## Apply security context

The security context is applied to multiple components, not to the installer pod alone. The following table lists each component and the context it receives.

| Component | Context applied |
| --- | --- |
| **Installer pod** | `podSecurityContext` and `containerSecurityContext` |
| **harness-nginx** | Controller pod and admission webhook patch job |
| **nfs-provisioner** | Provisioner pod |

---

## Related articles

- [Resource sizing](/docs/self-managed-enterprise-edition/smp-operator/advanced-configuration/resource-sizing): Default CPU and memory allocations for the operator and satellite.
- [CLI reference](/docs/self-managed-enterprise-edition/smp-operator/cli-reference): Installation parameters for the helm and clustermgr flows.
- [Installation](/docs/self-managed-enterprise-edition/smp-operator/install): Deploy the operator with Helm or clustermgr.
