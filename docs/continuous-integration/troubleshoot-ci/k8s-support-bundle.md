---
title: Kubernetes support bundle for CI
description: Diagnostic data Harness collects from Kubernetes build pods on stage failure, what it contains, how it is stored, who can access it, and how to opt out.
sidebar_position: 40
---

When a CI stage running on a Kubernetes build infrastructure fails, Harness can
collect a diagnostic **support bundle** from the build pod and upload it to
your account's CI log storage. Harness Support can then use the bundle, along
with your existing pipeline logs, to diagnose cluster-related failures such as
network policy denials, image pull errors, scheduling issues, OOM kills, and
volume mount failures faster than would be possible from pipeline logs alone.

This page describes exactly what is collected, the Kubernetes permissions
required, where the bundle is stored, who can access it, and how to disable
collection at the account and stage level.

:::info
This feature applies **only** to CI stages running on the
**Kubernetes cluster build infrastructure**. It is not used for Harness Cloud,
self-managed VM, or Local/Docker build infrastructures.
:::

---

## When the support bundle is collected

The collector only runs when **both** of the following are true:

1. The account-level feature flag `CI_SUPPORT_BUNDLE_COLLECTION` is enabled
   for your account by Harness.
2. The stage-level pipeline variable `HARNESS_CI_SUPPORT_BUNDLE_ENABLED` is
   set to `true` on the specific stage you want diagnostics for.

If either gate is disabled, **no data is collected** and the rest of this page
does not apply.

When collection is active for a stage, the build pod's step log output
includes a clearly visible line at the start of the stage so you can confirm
collection is on:

```
[Support Bundle] Diagnostic collection enabled for this stage.
On stage failure, a Kubernetes diagnostic bundle will be uploaded
to your account's CI log storage.
```

A bundle is only uploaded if the stage **fails**. Successful stages do not
produce a bundle.

---

## What is collected

On stage failure, the build pod's Lite Engine container queries the in-cluster
Kubernetes API for the diagnostic data listed below, packages it into a single
`support-bundle.tar.gz` archive (capped at 50 MB), and uploads it to your CI
log storage.

All Kubernetes API calls are read-only (`GET`) and are scoped to the build
pod's own namespace. Go to [Kubernetes permissions required](#kubernetes-permissions-required)
to review the single cluster-scoped exception.

| File in the bundle | Source | Sanitization applied before upload |
| --- | --- | --- |
| `metadata.json` | Pipeline / stage / run identifiers, container image references, K8s server version | None (identifiers only) |
| `pod.json` | Build pod spec and status | All container `env` variables replaced with a `REDACTED` marker; `envFrom` removed entirely |
| `all-pods.json` | List of pods in the build pod's namespace | Same env redaction applied to every pod |
| `node.json` | The single node the build pod is running on (capacity, conditions, kernel version) | None (node-level metadata only) |
| `events.json` | Kubernetes events in the build pod's namespace | None |
| `resourcequotas.json` | Resource quotas in the namespace | None |
| `limitranges.json` | Limit ranges in the namespace | None |
| `networkpolicies.json` | Network policies applied to the namespace | None |
| `persistentvolumeclaims.json` | PVCs in the namespace | None |
| `configmaps.json` | ConfigMaps in the namespace | `.data` and `.binaryData` are stripped. **Only key names are retained**, never values. |
| `serviceaccounts.json` | ServiceAccounts in the namespace | Default API response (metadata, labels, annotations, image-pull-secret references by name). **No tokens are read or included.** |
| `network-diagnostics.txt` | In-pod DNS config, route table, TCP reachability probes to common endpoints | None (diagnostic state only) |
| `logs/<container>.log` | The most recent **300 lines of stdout/stderr** from each container in the build pod | **None**. Refer to the warning below. |
| `logs/<container>-previous.log` | Previous container instance logs (when a container restarted) | **None**. Refer to the warning below. |

:::warning Container logs are included **without** content sanitization

The bundle includes the most recent 300 lines of stdout/stderr from each
container in the build pod. **No regex-based scanning or scrubbing is applied
to log content** before it is packaged.

If your build steps print, echo, or otherwise output sensitive values to
stdout/stderr (for example, `echo "$GITHUB_TOKEN"`, a tool that prints an
authorization header on failure, or a startup banner that includes a
connection string), that content will appear in the bundle as-is.

The same content is already visible in the standard pipeline log viewer in
the Harness UI, and bundle access is gated by the same authorization as those
logs. Go to [Who can access the bundle](#who-can-access-the-bundle) to review
access controls. It does, however, give Harness Support an additional analysis
path against the same content.

If you want to ensure no log content is captured, **do not enable**
`HARNESS_CI_SUPPORT_BUNDLE_ENABLED` on stages that print sensitive values.
Go to [How to disable collection](#how-to-disable-collection) to opt out.
:::

### What is **never** collected

For clarity, the collector contains no path that reads or transmits any of
the following:

- **Kubernetes Secrets:** There is no `GET`, `LIST`, or `WATCH` call against
  the `secrets` resource in any namespace.
- **ServiceAccount tokens:** No calls against the `serviceaccounts/token`
  subresource or the `tokenrequests` API. Token values held in Secrets are
  never read because Secrets themselves are never read.
- **ConfigMap values:** Only key names are retained, never values.
- **Pod environment variable values:** Replaced with a `REDACTED` marker
  in every container of every pod that appears in the bundle.
- **Resources from any namespace other than the build pod's own:** Every
  namespaced API call is pinned to the build pod's namespace.

---

## Kubernetes permissions required

The build pod's ServiceAccount needs the following permissions for the
collector to operate. If a permission is not granted, the collector
**fails open**: the corresponding artifact is omitted from the bundle and a
warning is logged, but the build itself is not affected.

### Namespaced permissions (in the build pod's own namespace)

| API group | Resource | Verbs |
| --- | --- | --- |
| (core) | `pods` | `get`, `list` |
| (core) | `pods/log` | `get` |
| (core) | `events` | `list` |
| (core) | `resourcequotas` | `list` |
| (core) | `limitranges` | `list` |
| (core) | `persistentvolumeclaims` | `list` |
| (core) | `configmaps` | `list` |
| (core) | `serviceaccounts` | `list` |
| `networking.k8s.io` | `networkpolicies` | `list` |

### Cluster-scoped permission

| API group | Resource | Verbs | Why |
| --- | --- | --- | --- |
| (core) | `nodes` | `get` | Reads the **single** node that the build pod is running on, to capture node conditions (memory/disk/PID pressure), capacity, allocatable resources, and kernel version. These fields are needed to diagnose eviction, OOM, and ephemeral-storage failures and are not exposed to the pod through any other Kubernetes API. |

The cluster-scoped permission is restricted to a single verb (`get`) on a
single resource type (`nodes`). No wildcard verbs, wildcard resources, or
group-level bindings are used. The `ClusterRoleBinding` references a single
ServiceAccount.

If your cluster's RBAC policy does not permit cluster-scoped node reads, you
can omit this binding. The bundle will still be produced; it will simply not
include `node.json`. All other diagnostic capability is preserved.

---

## Where bundles are stored

| | |
| --- | --- |
| **Storage backend** | The same object storage backend (Google Cloud Storage on Harness Cloud; S3-compatible storage on Harness Self-Managed) used for your account's CI step logs. |
| **Object key path** | Account-prefixed under your existing CI log storage prefix, scoped per pipeline run. |
| **Access boundary** | Identical to your CI step logs. The bundle is part of the same authenticated log-service access path. No separate bucket and no new access control surface. |
| **Encryption in transit** | TLS for all uploads. |
| **Encryption at rest** | Provided by the underlying object storage backend (GCS default encryption on Harness Cloud; per-tenant configuration on Self-Managed). |

---

## Retention

Support bundles inherit the same retention policy as your CI step logs.
Retention varies by plan and deployment model.

| Deployment | Retention |
| --- | --- |
| Harness Cloud (SaaS) | The same retention period that applies to your CI step logs. Contact [Harness Support](mailto:support@harness.io) to confirm the exact retention period configured for your account. |
| Harness Self-Managed | Determined by your local log-service object-storage lifecycle configuration. |

If you need a specific bundle deleted before its retention period expires
(for example, after a support case is closed), open a request with
[Harness Support](mailto:support@harness.io) and include the pipeline,
run, and stage identifiers.

---

## Who can access the bundle

Bundles are stored at the same access boundary as CI step logs. Concretely:

- **Customer users**: any user in your account who has read access to the
  pipeline's CI step logs through the Harness UI or API also has read access
  to the corresponding bundle. No additional role or permission is granted by
  enabling support bundle collection.
- **Harness employees**: when you engage Harness Support on a CI issue,
  Support engineers can download the bundle for the failing run as part of
  the existing customer-data access process. Access uses each engineer's own
  Harness API key and is subject to Harness's standard access auditing on
  customer log data. There is no shared service account or shared credential
  with elevated bundle access.

Harness debugging tooling that consumes the bundle uses the same
authentication path as the Harness UI log download. There is no
separate, broader access channel.

---

## How to disable collection

You can disable support bundle collection at either of two layers. Either
layer is sufficient to stop collection.

### Disable for a specific stage

Remove the stage variable, or set it to `false`:

```yaml
stages:
  - stage:
      name: build
      type: CI
      spec:
        # ... infrastructure, cloneCodebase, etc.
        variables:
          - name: HARNESS_CI_SUPPORT_BUNDLE_ENABLED
            type: String
            value: "false"   # or simply omit this variable entirely
```

Stages without `HARNESS_CI_SUPPORT_BUNDLE_ENABLED=true` set are never
collected from, regardless of the account-level feature flag.

### Disable for the entire account

Contact [Harness Support](mailto:support@harness.io) and request that the
`CI_SUPPORT_BUNDLE_COLLECTION` feature flag be turned off for your account.

When the account-level feature flag is off, the collector does not run for
**any** stage in your account, regardless of stage variables.

### Verify collection is off

When collection is enabled and active for a stage, the build pod's step log
output includes the line shown in
[When the support bundle is collected](#when-the-support-bundle-is-collected).
If you do not see that line in your build's step output, no collection
occurred.

---

## Recommended practices

1. **Enable collection per stage, not blanket-on**. Treat the
   `HARNESS_CI_SUPPORT_BUNDLE_ENABLED` variable as something you turn on for
   stages you actively want diagnostics from. These are typically stages that
   have been failing intermittently and are hard to triage from logs alone.
2. **Avoid printing secrets to stdout**. Container logs are included in the
   bundle without content sanitization. If a build step would echo a
   sensitive value to stdout, redirect or mask it the same way you would for
   the standard pipeline log view.
3. **Use Harness secrets, not pipeline variables, for credentials**. Values
   injected through Harness Secrets are referenced by name in the pod spec
   (`envFrom`/`secretKeyRef`), and the collector strips both `env` and
   `envFrom` from the pod spec before upload. Plaintext values in pipeline
   variables, by contrast, may end up in container logs if a step echoes
   them.
4. **Disable when not needed**. If you have stages with sensitive output
   that you cannot fully sanitize, leave `HARNESS_CI_SUPPORT_BUNDLE_ENABLED`
   unset on those stages.

---

## Related resources

- Go to [Troubleshoot CI](/docs/continuous-integration/troubleshoot-ci/troubleshooting-ci) to review common CI issues and solutions.
- Go to [Debug with SSH](/docs/continuous-integration/troubleshoot-ci/debug-mode) to troubleshoot remote builds interactively.
- Go to [Troubleshoot builds with Harness AI](/docs/continuous-integration/troubleshoot-ci/ai) to use AI-assisted diagnostics.
