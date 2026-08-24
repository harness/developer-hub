---
title: Step library YAML reference
description: YAML examples for every Kubernetes and Helm step available in Harness Deployments.
sidebar_position: 10
---

Harness provides 16+ Kubernetes steps and 7+ Helm steps for container orchestration. This page collects the YAML for every step in one place, covering rolling, blue-green, and canary deployment strategies as well as utility operations for scaling, patching, traffic routing, and manifest management.

---

## Kubernetes steps

### Kubernetes Rolling Deploy

Template ID: `k8sRollingDeployStep`

Prepares manifests, applies them to the cluster, and checks resource steady state. Performs a rolling update, gradually replacing old pods with new ones to ensure zero-downtime deployments.

| Input | Type | Description |
|-------|------|-------------|
| `namespace` | string | Kubernetes namespace for deployment |
| `manifests` | array | List of manifest file paths |
| `release` | string | Release name |
| `skip_dry_run` | boolean | Skip dry run (default: `false`) |
| `pruning` | boolean | Remove old resources not in current manifests (default: `false`) |
| `server_side_apply` | boolean | Use server-side apply (default: `false`) |
| `skip_steady_state_check` | boolean | Skip steady state check (default: `false`) |
| `flags` | array | Additional command flags |
| `log_level` | select | Log level: `warn`, `error`, `info`, `debug`, `trace` |

For rollback, use `k8sRollingRollbackStep` to revert a rolling deployment to its previous state.

```yaml
steps:
  - name: Rolling Deploy
    uses: k8sRollingDeployStep@1.0.0
    with:
      namespace: production
      manifests:
        - k8s/deployment.yaml
        - k8s/service.yaml
      pruning: true
      log_level: info
```

---

### Kubernetes Rolling Rollback

Template ID: `k8sRollingRollbackStep`

Re-applies the manifests from the last successful release stored in the cluster release history secret. Harness runs this step automatically when a rolling or canary stage fails. You can also add it manually to a rollback group.

| Input | Type | Description |
|-------|------|-------------|
| `namespace` | string | Target namespace |
| `release` | string | Release name used to look up rollback target in the cluster secret |
| `enable_pruning` | boolean | Remove resources present in current release but absent from rollback release (default: `false`) |
| `kubeconfig_path` | string | Path to the kubeconfig file |

```yaml
steps:
  - name: Rolling Rollback
    uses: k8sRollingRollbackStep@1.0.0
    with:
      namespace: production
      release: my-release
```

---

### Kubernetes Blue-Green Deploy

Blue-green deployment maintains two identical environments. The new version is deployed to the inactive stage environment, tested, and traffic is switched by swapping service selectors. Provides instant rollback by re-swapping selectors.

| Step | Description |
|------|-------------|
| `k8sBlueGreenDeployStep` | Creates services and pod sets for blue-green deployment |
| `k8sBlueGreenSwapServicesSelectorsStep` | Swaps service selectors to route traffic to the new version |
| `k8sBlueGreenStageScaleDownStep` | Scales down the inactive stage environment |

Also available as a managed strategy: `k8sBlueGreenDeployStrategy`, which orchestrates all three steps automatically.

**Blue-green workflow:**

1. Deploy the new version to the stage environment alongside the active primary environment.
2. Test the stage deployment to verify the new version is healthy.
3. Swap service selectors to route production traffic to the new version.
4. Scale down the old primary environment to free resources.

```yaml
steps:
  - name: Blue-Green Deploy
    uses: k8sBlueGreenDeployStep@1.0.0
    with:
      namespace: production
      manifests:
        - k8s/deployment.yaml
        - k8s/service.yaml

  # After testing...
  - name: Swap Traffic
    uses: k8sBlueGreenSwapServicesSelectorsStep@1.0.0

  - name: Scale Down Old
    uses: k8sBlueGreenStageScaleDownStep@1.0.0
```

---

### Kubernetes Canary Deploy

Canary deployment gradually rolls out changes by first deploying a small subset of pods with the new version. Monitor metrics and health before promoting to the full fleet or rolling back.

| Step | Description |
|------|-------------|
| `k8sCanaryDeployStep` | Deploys a subset of pods with the new version |
| `k8sCanaryDeleteStep` | Cleans up canary deployment after promotion or rollback |

Also available as a managed strategy: `k8sCanaryDeployStrategy`, which handles the canary lifecycle automatically.

**Canary workflow:**

1. Deploy a small percentage of pods with the new version.
2. Monitor metrics and health of the canary pods.
3. Promote (trigger a full rolling deploy) or rollback (delete the canary pods).

```yaml
steps:
  - name: Canary Deploy
    uses: k8sCanaryDeployStep@1.0.0
    with:
      namespace: production
      manifests:
        - k8s/deployment.yaml
      instances: 1

  # After validation...
  - name: Promote / Cleanup
    uses: k8sCanaryDeleteStep@1.0.0
```

---

### Kubernetes Apply

Template ID: `k8sApplyStep`

Apply manifests directly to the cluster. Supports dry run, pruning, server-side apply, and manifest printing for debugging.

| Input | Type | Description |
|-------|------|-------------|
| `namespace` | string | Kubernetes namespace |
| `manifests` | array | List of manifest file paths |
| `skip_dry_run` | boolean | Skip dry run validation |
| `pruning` | boolean | Remove old resources not in manifests |
| `server_side_apply` | boolean | Use server-side apply |
| `print_manifests` | boolean | Print rendered manifests to logs |
| `flags` | array | Custom kubectl command flags |

```yaml
steps:
  - name: Apply Manifests
    uses: k8sApplyStep@1.0.0
    with:
      namespace: production
      manifests:
        - k8s/configmap.yaml
        - k8s/secret.yaml
        - k8s/deployment.yaml
      server_side_apply: true
      print_manifests: true
```

---

### Kubernetes Delete

Template ID: `k8sDeleteStep`

Delete Kubernetes resources by name, manifest path, or release name. Useful for cleaning up resources during teardown or rollback workflows.

```yaml
steps:
  - name: Delete Resources
    uses: k8sDeleteStep@1.0.0
    with:
      namespace: staging
      manifests:
        - k8s/deployment.yaml
        - k8s/service.yaml

  # Or delete by release name
  - name: Delete Release
    uses: k8sDeleteStep@1.0.0
    with:
      namespace: staging
      release: my-release
```

---

### Kubernetes Scale

Template ID: `k8sScaleStep`

Scale Kubernetes workloads up or down by setting the desired replica count on a Deployment, StatefulSet, or other scalable resource.

```yaml
steps:
  - name: Scale Up
    uses: k8sScaleStep@1.0.0
    with:
      namespace: production
      workload: Deployment/my-app
      replicas: 5

  - name: Scale Down
    uses: k8sScaleStep@1.0.0
    with:
      namespace: production
      workload: Deployment/my-app
      replicas: 2
```

---

### Kubernetes Patch

Template ID: `k8sPatchStep`

Patch workload resources using strategic merge patch, JSON merge patch, or JSON patch operations. Useful for updating specific fields without a full redeployment.

```yaml
steps:
  - name: Patch Deployment
    uses: k8sPatchStep@1.0.0
    with:
      namespace: production
      resource: Deployment/my-app
      patch: |
        spec:
          template:
            spec:
              containers:
                - name: my-app
                  resources:
                    limits:
                      memory: "512Mi"
```

---

### Kubernetes Traffic Routing

Template ID: `k8sTrafficRoutingStep`

Shift traffic between different versions of services. Commonly used in canary and blue-green workflows to gradually route a percentage of traffic to the new version.

```yaml
steps:
  - name: Route 10% Traffic
    uses: k8sTrafficRoutingStep@1.0.0
    with:
      namespace: production
      service: my-app-svc
      destinations:
        - host: my-app-canary
          weight: 10
        - host: my-app-primary
          weight: 90

  # After validation, shift more traffic
  - name: Route 50% Traffic
    uses: k8sTrafficRoutingStep@1.0.0
    with:
      namespace: production
      service: my-app-svc
      destinations:
        - host: my-app-canary
          weight: 50
        - host: my-app-primary
          weight: 50
```

---

### Kubernetes Diff

Template ID: `k8sDiffStep`

Compare current cluster state with desired manifests to preview what would change before applying. Does not modify the cluster.

```yaml
steps:
  - name: Diff Manifests
    uses: k8sDiffStep@1.0.0
    with:
      namespace: production
      manifests:
        - k8s/deployment.yaml
```

---

### Kubernetes Dry Run

Template ID: `k8sDryRunStep`

Validate manifests against the cluster API without applying any changes. Catches schema errors and misconfigured resources before they reach the cluster.

```yaml
steps:
  - name: Dry Run
    uses: k8sDryRunStep@1.0.0
    with:
      namespace: production
      manifests:
        - k8s/deployment.yaml
```

---

### Kubernetes Steady State Check

Template ID: `k8sSteadyStateCheckStep`

Explicitly wait for workloads to reach steady state (all pods running and ready) at any point in the stage. Useful when you need a health gate between steps.

```yaml
steps:
  - name: Steady State Check
    uses: k8sSteadyStateCheckStep@1.0.0
    with:
      namespace: production
      workload: Deployment/my-app
      timeout: 5m
```

---

### Kubernetes Rollout

Template ID: `k8sRolloutStep`

Run `kubectl rollout` subcommands against workloads. Use `restart` to bounce pods after a ConfigMap or Secret update, `status` to wait for a rollout to complete, `undo` to revert to the previous revision, or `pause`/`resume` to control an in-progress rollout.

| Command | Description |
|---------|-------------|
| `restart` | Triggers a rolling restart of all pods in the workload |
| `status` | Waits for the rollout to complete and returns success or failure |
| `undo` | Rolls back the workload to the previous revision |
| `pause` | Pauses an in-progress rollout |
| `resume` | Resumes a paused rollout |
| `history` | Prints the rollout history to the step log |

```yaml
steps:
  # Restart pods to pick up a new ConfigMap
  - name: Kubernetes Rollout
    uses: k8sRolloutStep@1.0.0
    with:
      command: restart
      resources:
        - default/Deployment/my-app

  # Restart all workloads in a release
  - name: Kubernetes Rollout
    uses: k8sRolloutStep@1.0.0
    with:
      command: restart
      release_name: my-release
```

---

## Helm steps

### Helm Basic Deploy

Template ID: `helmDeployBasicStep`

Deploys a Helm chart using `helm upgrade --install`, waits for all workloads to reach steady state, and optionally runs chart tests.

| Input | Type | Description |
|-------|------|-------------|
| `namespace` | string | Kubernetes namespace |
| `release` | string | Helm release name |
| `manifests` | string | Chart path (.tgz archive or directory) |
| `values` | array | Values file paths for overrides |
| `ignore_failed_release` | boolean | Proceed even if previous release is in failed state |
| `skip_deploy_steady_check` | boolean | Skip steady state check after deploy |
| `upgrade_with_install` | boolean | Always use `helm upgrade --install` |
| `deploy_test` | boolean | Run `helm test` after deploy |
| `server_render` | boolean | Server-side rendering of templates |
| `deploy_log_level` | select | Log level: `warn`, `error`, `info`, `debug`, `trace` |

```yaml
steps:
  - name: Deploy with Helm
    uses: helmDeployBasicStep@1.0.0
    with:
      release: my-release
      namespace: production
      values:
        - helm/values-prod.yaml
      upgrade_with_install: true
```

---

### Helm Blue-Green

Helm blue-green deployment uses Helm releases to maintain two environments. The new version deploys as a separate Helm release, is tested, then traffic swaps to the new release.

| Step | Description |
|------|-------------|
| `helmDeployBluegreenStep` | Deploy the new version as a Helm release to the stage environment |
| `helmBluegreenSwapStep` | Swap traffic from the primary to the stage release |

Also available as a managed strategy: `helmDeployBluegreenStrategy`.

```yaml
steps:
  - name: Helm Blue-Green Deploy
    uses: helmDeployBluegreenStep@1.0.0
    with:
      release: my-release
      namespace: production
      values:
        - helm/values-prod.yaml

  # After testing the stage release...
  - name: Swap Traffic
    uses: helmBluegreenSwapStep@1.0.0
```

---

### Helm Canary

Helm canary deployment installs a canary Helm release with a subset of traffic routed to it. After validation, the canary is promoted to full deployment or rolled back.

| Step | Description |
|------|-------------|
| `helmDeployCanaryStep` | Deploy a canary Helm release with a subset of traffic |

Also available as a managed strategy: `helmDeployCanaryStrategy`.

```yaml
steps:
  - name: Helm Canary Deploy
    uses: helmDeployCanaryStep@1.0.0
    with:
      release: my-release-canary
      namespace: production
      values:
        - helm/values-prod.yaml
        - helm/values-canary.yaml
```

---

### Helm Canary Delete

Template ID: `helmCanaryDeleteStep`

Uninstalls the canary Helm release after validation or on rollback. The `release` field is auto-populated from the Canary Deploy step output. The stable release is not affected.

In the rollback sequence, the step is pre-wired to `${{rollback.data.PLUGIN_CANARY_RELEASE_NAME}}` and runs only when a canary release was actually created.

```yaml
steps:
  - name: Helm Canary Delete
    uses: helmCanaryDeleteStep@1.0.0
    with:
      release: my-release-canary
      namespace: production
```

---

### Helm Rollback

Template ID: `helmRollbackStep`

Roll back a Helm release to a previous revision. Harness automatically determines the previous healthy revision, or you can specify a target revision explicitly.

```yaml
steps:
  - name: Rollback Release
    uses: helmRollbackStep@1.0.0
    with:
      release: my-release
      namespace: production

  # Or rollback to a specific revision
  - name: Rollback to Revision 3
    uses: helmRollbackStep@1.0.0
    with:
      release: my-release
      namespace: production
      revision: 3
```

---

### Helm Delete

Template ID: `helmDeleteStep`

Uninstall a Helm release and remove all associated Kubernetes resources from the cluster.

```yaml
steps:
  - name: Uninstall Release
    uses: helmDeleteStep@1.0.0
    with:
      release: my-release
      namespace: production
```

---

## Infrastructure inheritance

Kubernetes and Helm steps automatically inherit infrastructure settings from the stage infrastructure configuration.

| Inherited value | CEL expression | JEXL expression |
|-----------------|----------------|-----------------|
| Kubeconfig path | `${{infra.kube_config_path}}` | `<+infra.kube_config_path>` |
| Namespace | `${{infra.namespace}}` | `<+infra.namespace>` |
| Release name | `${{infra.releaseName}}` | `<+infra.releaseName>` |

Override these values in individual step inputs when you need to target a different namespace or release within the same stage.
