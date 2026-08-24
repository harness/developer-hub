---
title: Blank canvas Helm deployment
description: Build a Helm stage from scratch using the Helm Basic Deploy step, without a managed canary or blue-green strategy.
sidebar_position: 4
---

The managed deployment strategies (canary and blue-green) add opinionated step sequences to your stage. The blank canvas approach uses the **Helm Basic Deploy** step directly. You compose only the steps you need, in the order that fits your workflow. There is no automatic rollback unless you add a **Helm Rollback** step yourself.

Use the blank canvas approach when:

- You are deploying a Helm chart without needing canary validation or blue-green traffic switching.
- You want full control over step ordering and do not want Harness to pre-populate a step sequence.
- You need to run `helm test` or custom pre/post-deploy operations around the install.

---

## Before you begin

Before you configure a blank canvas stage, make sure you have the following in place:

- **A Helm service:** Go to [Helm services](/3k-docs/continuous-delivery/v1-deployments/helm/helm-services) to set up a service with a Helm chart source and an artifact.
- **A Helm infrastructure:** Go to [Helm infrastructure](/3k-docs/continuous-delivery/v1-deployments/helm/helm-infrastructure) to connect a cluster and namespace.
- **A Harness delegate in the target cluster:** The delegate runs the deployment steps against your cluster.
- **Runtime configuration:** Every Helm stage requires a `runtime` block specifying the connector and namespace. Go to [Helm runtime configuration](/3k-docs/continuous-delivery/v1-deployments/helm/overview#helm-runtime-configuration) to understand the required fields.

---

## How it works

When you select **Deploy without a strategy** (or start with a blank stage and add steps manually), Harness does not pre-populate any steps. You add a Helm Basic Deploy step as the primary deploy action, then layer in any rollback, testing, or cleanup steps your workflow requires.

The **Helm Basic Deploy** step runs `helm upgrade --install`. It:

- Resolves the chart source, values files, and artifact image tag from your service definition.
- Runs `helm upgrade --install <release-name> <chart-path>` with all resolved values files and command flags.
- Waits for all deployed workloads to reach ready status unless **Skip Steady State Check** is enabled.
- Does not support automatic rollback unless you add a **Helm Rollback** step to the rollback group.

---

## Configure the Helm Basic Deploy step

Click **Helm Basic Deploy** in the stage canvas to open its configuration panel.

The following fields are available:

| Field | Description | Required |
|-------|-------------|----------|
| **Name** | Display name for this step in the stage canvas. Default: `Helm Basic Deploy`. | Required |
| **Ignore Failed Release History** | When enabled, proceeds with deployment even if the previous Helm release is in a failed state. Default: `false`. | Optional |
| **Skip Steady State Check** | When enabled, skips waiting for all deployed workloads to reach ready status after `helm upgrade --install`. Default: `false`. | Optional |
| **Run Chart Tests** | When enabled, runs `helm test` against the release after a successful deployment. Default: `false`. | Optional |
| **Skip Cleanup** | When enabled, skips cleanup of a failed first release. Use to inspect resources left behind by a failed initial install. Default: `false`. | Optional |
| **Print Manifests** | When enabled, logs the full rendered chart manifest in the step output with secrets redacted. Default: `false`. | Optional |
| **Server-Side Rendering** | When enabled, passes `--server` to `helm template` so manifests are rendered against the live cluster rather than locally. Default: `false`. | Optional |
| **Command Flags** | Additional flags appended to the `helm upgrade` command, for example `--atomic` or `--cleanup-on-fail`. | Optional |

Go to [Helm Basic Deploy step library](../step-library/helm-basic-deploy.md) for the full field reference.

---

## Pipeline YAML

The minimal blank canvas stage uses a single **Helm Basic Deploy** step:

```yaml
pipeline:
  stages:
    - name: helm-deploy
      id: helm_deploy
      service:
        type: helm
        items:
          - id: <your-service-id>
      environment:
        id: <your-environment-id>
        deploy-to: <your-infrastructure-id>
      steps:
        - name: Helm Basic Deploy
          id: helmBasicDeployStep
          template:
            uses: helmDeployBasicStep
      runtime:
        kubernetes:
          namespace: <target-namespace>
          connector: <your-kubernetes-connector-id>
```

---

## Add a rollback step

To support rollback, add a **Helm Rollback** step to the rollback group of the stage. Without this step, a failed deployment cannot be automatically reverted.

```yaml
rollback:
  - group:
      steps:
        - name: Helm Rollback
          id: helmRollbackStep
          template:
            uses: helmRollbackStep
```

Go to [Helm Rollback step library](../step-library/helm-rollback.md) for the full field reference.

---

## Steps to add before the deploy step

### Helm Delete (pre-clean)

If a previous release is in a failed state and **Ignore Failed Release History** is insufficient, you can explicitly uninstall the release before deploying. Go to [Helm Delete step library](../step-library/helm-delete.md) for configuration details.

```yaml
- name: Pre-clean
  id: helmDeleteStep
  template:
    uses: helmDeleteStep
    with:
      release: my-release
```

---

## Steps to add after the deploy step

### Helm Delete (post-clean)

Use the **Helm Delete** step after a successful deploy to uninstall a previous or temporary release. Go to [Helm Delete step library](../step-library/helm-delete.md) for configuration details.

```yaml
- name: Uninstall old release
  id: helmDeleteStep
  template:
    uses: helmDeleteStep
    with:
      release: my-old-release
```

---

## Example: deploy with chart tests

This stage installs a Helm chart and runs `helm test` after deployment to validate the release:

```yaml
pipeline:
  stages:
    - name: helm-deploy
      id: helm_deploy
      service:
        type: helm
        items:
          - id: my-helm-service
      environment:
        id: production
        deploy-to: production-infra
      steps:
        - name: Helm Basic Deploy
          id: helmBasicDeployStep
          template:
            uses: helmDeployBasicStep
            with:
              deploy_test: true
      rollback:
        - group:
            steps:
              - name: Helm Rollback
                id: helmRollbackStep
                template:
                  uses: helmRollbackStep
      runtime:
        kubernetes:
          namespace: production
          connector: my-k8s-connector
```

---

## Example: pre-clean and deploy

This stage uninstalls any broken previous release before installing fresh:

```yaml
pipeline:
  stages:
    - name: helm-fresh-install
      id: helm_fresh_install
      service:
        type: helm
        items:
          - id: my-helm-service
      environment:
        id: staging
        deploy-to: staging-infra
      steps:
        - name: Delete Previous Release
          id: helmDeleteStep
          template:
            uses: helmDeleteStep
        - name: Helm Basic Deploy
          id: helmBasicDeployStep
          template:
            uses: helmDeployBasicStep
      runtime:
        kubernetes:
          namespace: staging
          connector: my-k8s-connector
```

---

## Next steps

- Go to [Helm canary deployment](./canary) for incremental traffic validation before full promotion.
- Go to [Helm blue-green deployment](./blue-green) for zero-downtime deployments with instant rollback.
- Go to [Helm Basic Deploy step library](../step-library/helm-basic-deploy.md) for the full field reference.
