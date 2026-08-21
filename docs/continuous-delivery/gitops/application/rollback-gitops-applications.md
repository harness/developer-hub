---
title: Rollback GitOps applications
sidebar_label: Rollback GitOps Applications
description: Roll back a GitOps application to a previous revision from the History & Rollback tab or a GitOps Rollback pipeline step.
sidebar_position: 4
keywords:
  - gitops rollback
  - history and rollback
  - GitOpsRollback
  - argo cd rollback
tags:
  - gitops
---

Harness GitOps supports the same rollback operation as Argo CD (`argocd app rollback`). You can restore a previous deployment revision from the application **History & Rollback** tab, automate the same action with a **GitOps Rollback** pipeline step, or trigger a post-production rollback from the **Services** dashboard after a successful deployment.

---

## What will you learn in this topic?

- How to [trigger a post-production rollback](#post-production-rollback-from-the-services-dashboard) from the Services dashboard after a successful deployment.
- How to [manually roll back](#roll-back-from-the-history-and-rollback-tab) a GitOps application to a previous revision from the History and Rollback tab.
- How to [automate rollback](#roll-back-with-the-gitops-rollback-step) with the GitOps Rollback pipeline step.
- How [revisions work](#how-revisions-work) and what settings affect rollback availability.

---

## Before you begin

- **GitOps Application:** Create and sync a GitOps Application that has at least one previous deployment revision. Go to [Add a Harness GitOps Application](/docs/continuous-delivery/gitops/get-started/harness-cd-git-ops-quickstart#step-4-add-a-harness-gitops-application) to create one.
- **Deployment history:** Rollback is available only for previous revisions. The current revision does not show a 'Rollback' action.
- **Successful pipeline deployment (post-production rollback only):** The **Rollback** button only appears for GitOps applications that were successfully deployed through a pipeline. Failed or in-progress deployments do not show the button.
- **Rollback steps configured (post-production rollback only):** Your pipeline must have rollback steps defined in the **Rollback** tab of the deployment stage. If no rollback steps are configured, the button still appears but the rollback execution will have no steps to run.
- **Pipeline access (post-production rollback only):** You need Execute permission on the pipeline that was used for the original deployment.
- **Pipeline stage (pipeline step only):** Use a deployment stage with GitOps enabled when you add the GitOps Rollback step.

---

## How revisions work

```yaml
- step:
    type: GitOpsRollback
    spec:
      revisionsToRollback: 1         # 1 = one sync ago, not one commit ago
                                     # check available revisions: app > History & Rollback tab
      applicationsList:
        - agentId: my-agent
          applicationName: payments-api
          historyId: 7               # pin to an exact revision ID
                                     # find the ID: History & Rollback tab > revision card
                                     # same commit SHA can appear under multiple IDs when
                                     # Helm values differ between syncs — ID is the version
                                     # key, not the SHA
```

```yaml
# Argo CD Application manifest — two settings that affect rollback availability
spec:
  revisionHistoryLimit: 10           # default — entries beyond this are evicted permanently
                                     # increase before you need a deeper rollback window
                                     # check/edit: app > App Details tab > spec.revisionHistoryLimit
  syncPolicy:
    automated: {}                    # rollback blocked while set
                                     # disable auto-sync first or the step fails with FailedPrecondition
```

:::note
Rollback does not touch Git or `spec.source`. The app shows OutOfSync after rollback — that is expected. New revisions are recorded on sync only, not on spec edits.
:::

:::warning Dynamic values re-resolve at rollback time
Harness expressions, Vault refs, and external secrets re-resolve with their current values when the rollback runs. The source snapshot is identical to the original deploy but rendered manifests may differ.
:::

---

## Roll back from the History and Rollback tab

1. In your GitOps project, go to **Deployments** > **GitOps** > **Applications**, and then select your application.
2. Select the **History & Rollback** tab.
3. Review the deployment history. Each card shows the revision number, deploy time, how long the revision was active, and who initiated the deploy.
4. On the revision you want to restore, select 'Rollback'.

The current revision is marked with a **Current** badge and does not include a 'Rollback' button.

![](./static/history-and-rollback.png)

---

## Roll back with the GitOps Rollback step

1. Select a pipeline and open the **Execution** tab of a GitOps-enabled deploy stage.
2. Select 'Add Step', and then select 'GitOps Rollback'.
3. Configure the step parameters (see [reference](#step-parameter-reference) below).
4. Select 'Apply Changes'.
5. Save and run the pipeline.

![](./static/gitops-rollback-step.png)

---

## Step parameter reference

```yaml
- step:
    type: GitOpsRollback
    name: GitOpsRollback
    identifier: GitOpsRollback
    spec:
      revisionsToRollback: 1           # step-level fallback, applied to any app with no historyId
                                       # or per-app revisionsToRollback — default: 1
      prune: false                     # prune resources absent from the rolled-back revision
      waitTillHealthy: true            # hold step until app reaches Healthy — default: false
      failOnTimeout: false             # when waitTillHealthy: true, fail if Healthy not reached
                                       # before timeout — default: false
      applicationsList:
        - applicationName: my-app
          agentId: my-agent
          historyId: 17                # highest precedence — rolls back to this exact entry
        - applicationName: another-app
          agentId: my-agent
          revisionsToRollback: 2       # per-app override — overrides step-level revisionsToRollback
        - applicationName: third-app
          agentId: my-agent            # no historyId or per-app override — inherits step-level: 1
    timeout: 10m
```

### Top-level parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| **Applications** (`applicationsList`) | `list<object>` | Yes | One entry per application to roll back. |
| **Revisions to roll back** (`revisionsToRollback`) | `integer` | No (`1`) | Steps N syncs back for any app that has no `historyId` or per-app `revisionsToRollback`. |
| **Prune** (`prune`) | `boolean` | No (`false`) | Prune resources absent from the rolled-back revision. |
| **Wait until healthy** (`waitTillHealthy`) | `boolean` | No (`false`) | Hold the step until every rolled-back app reaches `Healthy`. |
| **Fail if step times out** (`failOnTimeout`) | `boolean` | No (`false`) | When `waitTillHealthy: true`, fail the step if `Healthy` is not reached before timeout. When `false`, a successful rollback always passes the step. |

### Per-application target fields

| Parameter | Type | Required | Description |
|---|---|---|---|
| **Agent** (`agentId`) | `string` | Yes | Harness GitOps agent identifier. |
| **Application name** (`applicationName`) | `string` | Yes | Argo CD application name. |
| **History ID** (`historyId`) | `integer` | No | Exact history entry ID. Validated at runtime — a missing ID is a pre-flight error. Takes highest precedence over all `revisionsToRollback` settings. |
| **Revisions to roll back** (`revisionsToRollback`) | `integer` | No | Per-app revision offset. Overrides step-level `revisionsToRollback`. Ignored when `historyId` is set. |

### Target resolution precedence

`per-app historyId` > `per-app revisionsToRollback` > `step-level revisionsToRollback` > default `1`

---

## Post-production rollback from the Services dashboard

After a successful GitOps deployment through a pipeline, you can trigger a rollback directly from the **Services** dashboard. This capability executes the rollback steps that you configured in your pipeline.

:::note This feature requires a feature flag
This feature is behind the feature flag `CDS_GITOPS_POST_PROD_ROLLBACK`. Contact <a href="mailto:support@harness.io" target="_blank" rel="noopener noreferrer">Harness Support</a> to enable this feature.
:::

### Workflow

When you deploy a GitOps application using a Harness pipeline and the deployment succeeds, a **Rollback** button appears next to the application in the **Services** tab.

<div align="center">
  <DocImage path={require('./static/rollback-gitops-post-production.png')} alt="Rollback button in Instance Details for successful GitOps deployment" width="80%" />
</div>

When you select the button, Harness runs the rollback steps that you defined in the **Rollback** tab of the deployment stage that is linked to the service. The rollback uses the same stage configuration that was used for the original deployment to sync the GitOps applications linked to that service.

After the rollback completes, the Kubernetes instance state updates in the Harness UI to reflect the rollback. The **Rollback** button becomes inactive and you cannot perform another post-production rollback for that deployment. The pipeline execution history shows both the original deployment and the rollback execution.

### Trigger a post-production rollback

1. In your Harness project, go to **Deployments** > **Services**.
2. Locate the GitOps application that you want to roll back. The application must show a successful deployment status.
3. Select the **Rollback** button next to the application.

Harness runs the rollback steps configured in the stage that is linked to the service. You can monitor the rollback execution in the pipeline execution history. The rollback executes only the rollback steps defined in that specific stage, not the entire pipeline.

### Differences from other rollback methods

| Rollback Method | Trigger Location | What It Does | When to Use |
|---|---|---|---|
| **Post-production rollback** | Services dashboard | Runs the rollback steps defined in the stage linked to the service (one stage only, not the entire pipeline) | After a successful production deployment when you need to revert using your stage's rollback logic |
| **History and Rollback tab** | Application details | Argo CD rollback to a specific revision | When you want to restore a specific application revision manually |
| **GitOps Rollback step** | Pipeline execution | Automated Argo CD rollback during pipeline | When you want to automate rollback as part of your pipeline flow (for example, after verification fails) |

---

## Next steps

- Go to [Sync GitOps applications](/docs/continuous-delivery/gitops/application/sync-gitops-applications) to sync an application after a rollback when you need an explicit sync in the same pipeline.
- Go to [Manage GitOps Applications](/docs/continuous-delivery/gitops/application/manage-gitops-applications) to review the application dashboard tabs and other application operations.
- Go to [GitOps PR Pipelines](/docs/continuous-delivery/gitops/pr-pipelines/pr-pipelines-basics#gitops-pipeline-steps) to review all GitOps pipeline steps.
