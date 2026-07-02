---
title: Kubernetes & Helm Steps
sidebar_label: Kubernetes & Helm
description: Reference for all Kubernetes and Helm step templates in Harness 3.0 — rolling, blue-green, canary deployments, plus utility operations for scaling, patching, and traffic routing.
---

Harness 3.0 provides 36+ Kubernetes steps and 9+ Helm steps for comprehensive container orchestration. This reference covers rolling, blue-green, and canary deployment strategies, plus utility operations for scaling, patching, traffic routing, and manifest management.

:::info Infrastructure Inheritance
Kubernetes and Helm steps automatically inherit infrastructure settings (kubeconfig, namespace, release name) from the stage infrastructure configuration. Override these values in the step inputs when needed.
:::

---

## Kubernetes Rolling Deploy

**Template:** `k8sRollingDeployStep@1.0.0`

Prepares manifests, applies them to the cluster, and checks resource steady state. This is a composite step that orchestrates three sub-actions: prepare, apply, and steady-state check. It performs a rolling update of your Kubernetes workloads, gradually replacing old pods with new ones to ensure zero-downtime deployments.

| Input | Type | Description |
|---|---|---|
| `kubeconfig` | string | Path to kubeconfig file (default: from infrastructure) |
| `namespace` | string | Kubernetes namespace for deployment |
| `manifests` | array | List of manifest file paths |
| `release` | string | Helm-style release name |
| `service_id` | string | Service identifier |
| `environment_id` | string | Environment identifier |
| `infra_id` | string | Infrastructure identifier |
| `skip_dry_run` | boolean | Skip dry run (default: `false`) |
| `pruning` | boolean | Remove old resources (default: `false`) |
| `server_side_apply` | boolean | Use server-side apply (default: `false`) |
| `skip_steady_state_check` | boolean | Skip steady state check (default: `false`) |
| `flags` | array | Command flags (Apply/Describe with custom flags) |
| `log_level` | select | Log level (`warn`, `error`, `info`, `debug`, `trace`) |

```yaml title="k8s-rolling-deploy.yaml"
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

For rollback, use `k8sRollingRollbackStep` to revert a rolling deployment to its previous state.

---

## Kubernetes Blue-Green Deploy

Blue-green deployment maintains two identical environments. The new version is deployed to the inactive ("stage") environment, tested, and then traffic is switched over by swapping service selectors. This strategy provides instant rollback by simply swapping selectors back.

| Step | Description |
|---|---|
| `k8sBlueGreenDeployStep` | Creates services and pod sets for blue-green deployment |
| `k8sBlueGreenSwapServicesSelectorsStep` | Swaps service selectors to route traffic to the new version |
| `k8sBlueGreenStageScaleDownStep` | Scales down the inactive stage environment |

Also available as a managed strategy: `k8sBlueGreenDeployStrategy`, which orchestrates all three steps automatically.

**Workflow:** (1) Deploy the new version to the "stage" environment alongside the active "primary" environment. (2) Test the stage deployment to verify the new version is healthy. (3) Swap service selectors to route production traffic to the new version. (4) Scale down the old "primary" environment to free resources.

```yaml title="k8s-blue-green.yaml"
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

## Kubernetes Canary Deploy

Canary deployment gradually rolls out changes by first deploying a small subset of pods with the new version. This allows you to monitor metrics and health before promoting the change to the full fleet or rolling it back.

| Step | Description |
|---|---|
| `k8sCanaryDeployStep` | Deploys a subset of pods with the new version |
| `k8sCanaryDeleteStep` | Cleans up canary deployment after promotion or rollback |

Also available as a managed strategy: `k8sCanaryDeployStrategy`, which handles the canary lifecycle automatically.

**Workflow:** (1) Deploy a small percentage of pods with the new version. (2) Monitor metrics and health of the canary pods. (3) Either promote (trigger a full rolling deploy) or rollback (delete the canary pods).

```yaml title="k8s-canary.yaml"
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

## K8s Apply & Delete

These steps provide direct control over applying and removing Kubernetes resources, outside of a managed deployment strategy.

### k8sApplyStep

Apply manifests directly to the cluster. Supports dry run, pruning, server-side apply, and manifest printing for debugging.

| Input | Type | Description |
|---|---|---|
| `kubeconfig` | string | Path to kubeconfig file |
| `namespace` | string | Kubernetes namespace |
| `manifests` | array | List of manifest file paths |
| `skip_dry_run` | boolean | Skip dry run validation |
| `pruning` | boolean | Remove old resources not in manifests |
| `server_side_apply` | boolean | Use server-side apply |
| `print_manifests` | boolean | Print rendered manifests to logs |
| `flags` | array | Custom kubectl command flags |

```yaml title="k8s-apply.yaml"
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

### k8sDeleteStep

Delete Kubernetes resources by name, manifest path, or release name. Useful for cleaning up resources during teardown or rollback workflows.

```yaml title="k8s-delete.yaml"
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

## K8s Scale & Patch

These steps allow you to modify existing Kubernetes workloads by scaling replica counts or patching resource specifications without redeploying the full manifest.

### k8sScaleStep

Scale Kubernetes workloads up or down by setting the desired replica count on a Deployment, StatefulSet, or other scalable resource.

```yaml title="k8s-scale.yaml"
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

### k8sPatchStep

Patch workload resources using strategic merge patch, JSON merge patch, or JSON patch operations. Useful for updating specific fields without a full redeployment.

```yaml title="k8s-patch.yaml"
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

## K8s Traffic Routing

**Template:** `k8sTrafficRoutingStep`

Shift traffic between different versions of services. Commonly used in canary and blue-green workflows to gradually route a percentage of traffic to the new version, enabling progressive delivery with fine-grained control over traffic distribution.

```yaml title="k8s-traffic-routing.yaml"
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

## Kubernetes Utility Steps

Harness provides several utility steps for inspecting, validating, and debugging Kubernetes resources without modifying the cluster state.

| Step | Description |
|---|---|
| `k8sDiffStep` | Compare the current cluster state with desired manifests to preview changes before applying |
| `k8sDryRunStep` | Validate manifests against the cluster API without applying any changes |
| `k8sSteadyStateCheckStep` | Check that workloads have reached a steady state (all pods running and ready) |
| `k8sHelmTemplateAction` | Render a Helm chart into Kubernetes manifests without deploying |

```yaml title="k8s-utilities.yaml"
steps:
  # Preview changes before applying
  - name: Diff Manifests
    uses: k8sDiffStep@1.0.0
    with:
      namespace: production
      manifests:
        - k8s/deployment.yaml

  # Validate without applying
  - name: Dry Run
    uses: k8sDryRunStep@1.0.0
    with:
      namespace: production
      manifests:
        - k8s/deployment.yaml

  # Check workload health
  - name: Steady State Check
    uses: k8sSteadyStateCheckStep@1.0.0
    with:
      namespace: production
      workload: Deployment/my-app
      timeout: 5m
```

---

## Helm Deploy Basic

**Template:** `helmDeployBasicStep@1.0.0`

Deploys a Helm chart using the basic (rolling) strategy. Uses the `harnessdev/helm-deploy:0.0.1` container to execute Helm operations including install, upgrade, rollback, and test.

| Input | Type | Description |
|---|---|---|
| `kubeconfig` | string | Path to kubeconfig file |
| `namespace` | string | Kubernetes namespace |
| `release` | string | Helm release name |
| `manifests` | string | Chart path (`.tgz` archive or directory) |
| `values` | array | Values file paths for overrides |
| `subchart` | string | Subchart path within the chart |
| `ignore_failed_release` | boolean | Ignore failed release state |
| `skip_deploy_steady_check` | boolean | Skip steady state check after deploy |
| `upgrade_with_install` | boolean | Always use `helm upgrade --install` |
| `deploy_test` | boolean | Run Helm chart tests after deploy |
| `deploy_flags` | array | Command flags (get_manifest, list, history, install, upgrade, rollback, uninstall, test, template) |
| `server_render` | boolean | Server-side rendering of templates |
| `deploy_log_level` | select | Log level (`warn`, `error`, `info`, `debug`, `trace`) |

```yaml title="helm-basic-deploy.yaml"
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

## Helm Blue-Green

Helm blue-green deployment uses Helm releases to maintain two environments. The new version is deployed as a separate Helm release, tested, and then traffic is swapped to the new release.

| Step | Description |
|---|---|
| `helmDeployBluegreenStep` | Deploy the new version as a Helm release to the stage environment |
| `helmBluegreenSwapStep` | Swap traffic from the primary to the stage release |

Also available as a managed strategy: `helmDeployBluegreenStrategy`.

```yaml title="helm-blue-green.yaml"
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

## Helm Canary

Helm canary deployment installs a canary Helm release with a subset of traffic routed to it. After validation, the canary is either promoted to full deployment or rolled back.

| Step | Description |
|---|---|
| `helmDeployCanaryStep` | Deploy a canary Helm release with a subset of traffic |

Also available as a managed strategy: `helmDeployCanaryStrategy`.

```yaml title="helm-canary.yaml"
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

## Helm Rollback & Delete

These steps provide lifecycle management for Helm releases, allowing you to revert to a previous revision or completely uninstall a release.

### helmRollbackStep

Roll back a Helm release to a previous revision. Harness automatically determines the previous healthy revision, or you can specify a target revision explicitly.

```yaml title="helm-rollback.yaml"
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

### helmDeleteStep

Uninstall a Helm release and remove all associated Kubernetes resources from the cluster.

```yaml title="helm-delete.yaml"
steps:
  - name: Uninstall Release
    uses: helmDeleteStep@1.0.0
    with:
      release: my-release
      namespace: production
```