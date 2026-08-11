---
title: Support and troubleshooting
sidebar_label: Troubleshooting
description: Resolve common issues with SMP Operator installations.
sidebar_position: 9
keywords:
  - troubleshooting
  - support
  - ImagePullBackOff
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

This topic describes the issues you are most likely to hit when you install the Harness SMP Operator, and how to resolve them.

---

## Common installation issues

Each entry names the usual cause, gives a command that confirms it, and states the fix. Run the **Check** command first to confirm that you are looking at the right problem, then apply the **Fix**.

### Operator pods stuck in ImagePullBackOff

- **Cause**: Images are not accessible from the cluster (wrong registry, missing credentials, or images not mirrored).
- **Check**: `kubectl describe pod -n harness platform-installer-0 | grep -A5 Events`
- **Fix**: Verify registry credentials and ensure all required images are pushed. Go to [Registry setup](/docs/self-managed-enterprise-edition/smp-operator/prerequisites/registry-setup) to review the registry requirements.

### DNS not resolving

- **Cause**: DNS record not pointing to the load balancer or ingress external IP.
- **Check**: `nslookup <YOUR_DNS>`
- **Fix**: Create an A or CNAME record pointing to the external IP of your ingress service (`kubectl get svc -n harness`).

### Platform PVCs stuck in Pending

- **Cause**: Storage class does not exist or no dynamic provisioner is available.
- **Check**: `kubectl get pvc -n harness`
- **Fix**: Verify the storage class exists (`kubectl get storageclass`) and matches the value passed through `--pi-set cluster.tfi.storageClass=<name>`. Go to [Storage classes](/docs/self-managed-enterprise-edition/smp-operator/prerequisites/storage-classes) to review the supported storage classes.

### Installer UI not accessible

- **Cause**: Ingress or VirtualService not configured correctly, or TLS certificate issue.
- **Check**: `kubectl get ingress -n harness` (nginx) or `kubectl get vs -n harness` (Istio)
- **Fix**: Verify the ingress resource exists and the external IP is reachable. Check the TLS secret with `kubectl get secret -n harness | grep tls`.

---

## Get support

Contact [Harness Support](mailto:support@harness.io) if the entries above do not resolve your issue.

---

## Related articles

- [Prerequisites](/docs/self-managed-enterprise-edition/smp-operator/prerequisites): Cluster, storage, registry, and DNS requirements to confirm before you install.
- [Post-installation checks](/docs/self-managed-enterprise-edition/smp-operator/install/post-installation-checks): Verify that each part of the deployment came up correctly.
- [CLI reference](/docs/self-managed-enterprise-edition/smp-operator/cli-reference): Installation parameters for the helm and clustermgr flows.
