---
title: Customize the PodSpec in Kubernetes build infrastructure
description: You can customize the build pod's Kubernetes spec using a Pod Spec Overlay field in Harness CI.
sidebar_position: 50
---

Harness CI supports advanced customization of the Kubernetes PodSpec used for your build pods. You can use this to apply configurations like projected volumes, custom security contexts, node selectors, and topology spread constraints.

:::note Feature Flag Required
This feature is gated by the feature flag `CI_K8S_OVERLAY_YAML` and requires Harness Delegate version `863xx` or higher.
:::

## Overview

Once the `CI_K8S_OVERLAY_YAML` flag is enabled, you can reuse the **Pod Spec Overlay** field in the build infrastructure settings to pass a partial Kubernetes Pod YAML that overrides the default pod created by Harness CI.

- The YAML must follow the standard Kubernetes PodSpec structure.
- You only need to specify the fields you want to override.
- Fields like `spec.containers` and `spec.initContainers` are **ignored** if passed — you can't override them.

## Examples

### Add a projected volume

```yaml
spec:
  volumes:
    - name: projected-vol
      projected:
        sources:
          - configMap:
              name: my-config
          - secret:
              name: my-secret
```

### Set a primary group ID for the build container
```yaml
spec:
  securityContext:
    runAsGroup: 15
```

## Transition from legacy format

Previously, the Pod Spec Overlay field only supported `topologySpreadConstraints`, and you could pass them without nesting under `spec:`. That changes with the feature flag.

### Before (feature flag OFF)

When the feature flag is off, you can pass fields directly like this:

```yaml
topologySpreadConstraints:
  - maxSkew: 3
    minDomains: 2
    topologyKey: topology.kubernetes.io/zone
    whenUnsatisfiable: DoNotSchedule
    labelSelector:
      matchExpressions:
        - key: app
          operator: In
          values:
            - my-app
```

Harness automatically injected this into the pod under the hood.

### After (feature flag ON)

Once the feature flag is on, Harness expects a proper PodSpec YAML structure. You must wrap your fields inside a `spec:` block:

```yaml
spec:
  topologySpreadConstraints:
    - maxSkew: 3
      minDomains: 2
      topologyKey: topology.kubernetes.io/zone
      whenUnsatisfiable: DoNotSchedule
      labelSelector:
        matchExpressions:
          - key: app
            operator: In
            values:
              - my-app
```

:::warning
If you leave out the `spec:` wrapper while the feature flag is on, the pod override will fail and your build will likely error out.
:::

Best Practices
- Only include the fields you want to override.

- Always use the `spec:` wrapper if the feature flag is enabled.

- Do not pass `spec.containers` or `spec.initContainers` — they are not overrideable.

- Invalid YAML or unsupported fields can cause your build to fail.

For more background, check out [Topology Spread Constraints](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure/#topology-spread-constraints) which were previously supported without this feature flag.