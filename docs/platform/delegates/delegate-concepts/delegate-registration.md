---
title: Delegate registration and verification
description: To set up a Harness Delegate, you install the delegate in your environment and the delegate automatically registers with your Harness account. The Delegate config file (for example, Kubernetes Delega…
sidebar_position: 4
helpdocs_topic_id: 39tx85rekj
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

To set up a Harness Delegate, you install the delegate in your environment and the delegate automatically registers with your Harness account.

The delegate config file (for example, Kubernetes delegate YAML file) contains your Harness account Id. That's how the delegate knows where to register.

### Install and register delegates

To install a delegate, follow the steps in the delegate installation topic, such as [Install a Docker delegate](/docs/platform/delegates/install-delegates/overview.md).

Once you have installed the delegate in your environment, select **Verify** in the delegate wizard, and Harness will verify that it is receiving heartbeats from the delegate.

![](static/delegate-registration-01.png)

This means Harness is waiting for the delegate you installed to register. Registration can take a few minutes. Once the delegate registers, the **Verify** screen will indicate that the delegate is running.

:::danger Important Note

After installation, if the delegate goes into a disconnected state, Harness applies a Time-To-Live (TTL) policy:

- Delegate – 6 hours: If a delegate remains disconnected and does not send heartbeats for 6 hours, it is considered expired and will no longer appear on the Delegate page in Harness.

- Delegate Group – 7 days: If no delegates in a group are active for 7 consecutive days, the entire group will be removed from the Delegate page in Harness.

:::

### Verify delegate registration manually

The Verify screen also includes troubleshooting steps. Here are a few of the steps for the Kubernetes delegate.

Check the status of the delegate on your cluster:

```
kubectl describe pod <your-delegate-pod> -n harness-delegate-ng
```

Check the delegate logs:

```
kubectl logs -f <harness-delegate> -n harness-delegate-ng
```

If the pod isn't up, you might see the following error in your cluster:

```
CrashLoopBackOff: Kubernetes Cluster Resources are not available.
```

Make sure the Kubernetes Cluster Resources (CPU, memory) are sufficient.

If the delegate didn't reach a healthy state, run the following:

```
kubectl describe pod <your-delegate-pod> -n harness-delegate-ng
```

### Allowlist verification

:::note

Currently, allowlist verification for delegate registration is behind the feature flag `PL_ENFORCE_DELEGATE_REGISTRATION_ALLOWLIST`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

With this feature flag enabled, delegates with an immutable image type can register if their IP/CIDR address is included in the allowed list received by Harness Manager.

Without this feature flag enabled, delegates with an immutable image type can register without allowlist verification.

The IP address/CIDR should be that of the delegate or the last proxy between the delegate and Harness Manager in the case of a proxy.

Harness Manager verifies registration requests by matching the IP address against an approved list and allows or denies registration accordingly. For more information, go to [Add and manage IP allowlists](/docs/platform/security/add-manage-ip-allowlist/).


