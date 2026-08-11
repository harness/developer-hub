---
title: Post-installation checks
sidebar_label: Post-Installation Checks
description: Verify that the SMP Operator was deployed successfully.
sidebar_position: 6
keywords:
  - post-install checks
  - verification
  - health check
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

After the installation completes, you can verify that the Harness SMP Operator deployed successfully before you use it.

Run the checks against the namespace you installed the operator in. Work through the sections in order to confirm the pod, StatefulSet, logs, Helm release, and ingress, then sign in to the Installer UI. The examples use the `harness` namespace, so substitute your own namespace if you installed into a different one.

---

## Verify Operator Pod

Confirm that the operator pod is running.

```bash
# Check pods
kubectl get pods -n harness | grep platform-installer

# Expected: platform-installer-0  1/1  Running
```

---

## Verify StatefulSet

Confirm that the `StatefulSet` that manages the operator pod reports its replica as ready.

```bash
kubectl get statefulset -n harness

# Expected: platform-installer  1/1
```

---

## Check Operator Logs

Read the logs from the `pi` container in the operator pod.

```bash
kubectl logs -n harness platform-installer-0 -c pi
```

---

## Verify Helm Release

Confirm that the `platform-installer` Helm release is present and note the version it deployed.

```bash
helm list -n harness

# Expected: platform-installer  harness  1  <version>
```

---

## Verify Ingress

Check the ingress resources for the ingress type you installed with.

### nginx (default)

Confirm the ingress resource and the nginx service exist.

```bash
kubectl get ingress -n harness
kubectl get svc -n harness | grep nginx
```

### Istio

Check the Istio pods, Helm releases, Gateway, and VirtualService, then retrieve the external IP of the ingress gateway.

```bash
# Check Istio pods
kubectl -n harness get pods -l app=istiod
kubectl -n harness get pods -l app=istio-ingressgateway

# Check Helm releases
helm list -n harness | grep istio

# Check Gateway
kubectl -n harness get gateway

# Check VirtualService
kubectl -n harness get vs

# Get ingress gateway external IP
kubectl -n harness get svc istio-ingressgateway
```

---

## Access the Installer UI

After the checks above pass, sign in to the Installer UI.

Open in a browser:

```text
https://<YOUR_DNS>/pi
```

Login with the admin email and password provided during installation.

For more information on troubleshooting common issues, see [Troubleshooting & Support](/docs/self-managed-enterprise-edition/smp-operator/troubleshooting).
