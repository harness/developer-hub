---
title: Drift Detection and Ephemeral Workspaces
sidebar_label: Drift & Ephemeral Workspaces
description: Configure scheduled drift detection and automatic workspace lifecycle (ephemeral workspaces) at the workspace and project level in Harness IaCM.
sidebar_position: 85
keywords:
  - drift detection
  - ephemeral workspaces
  - workspace lifecycle
  - ttl
  - auto destroy
  - configuration levels
tags:
  - iacm
  - workspaces
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

<CTABanner
  buttonText="Contact Harness Support"
  title="Coming soon!"
  tagline="Drift Detection and Ephemeral Workspaces is currently pending release. Contact Harness Support to request access."
  link="mailto:support@harness.io"
  closable={true}
  target="_blank"
/>

:::warning Pending release
Drift Detection and Ephemeral Workspaces is currently pending release and is enabled per account. To request access for your account, contact [Harness Support](mailto:support@harness.io).
:::

Harness IaCM provides two native automation features that keep your infrastructure healthy and your workspace list clean: Drift Detection, which runs a scheduled check for infrastructure that has diverged from your state, and Ephemeral Workspaces, which automatically destroys (and optionally deletes) workspaces after a period of inactivity. Both features share one configuration model, so you set them up the same way at the workspace level or the project level.

---

## What you will learn

- What Drift Detection and Ephemeral Workspaces do, and how they relate.
- The two configuration levels (workspace and project, per provisioner) and how they override each other.
- How to configure each feature via the Harness UI or the REST API.
- The workspace lifecycle and the safety guards that protect against accidental deletion.

---

## Before you begin

- **IaCM enabled:** Your account must have Infrastructure as Code Management entitled. Go to [Get started with IaCM](/docs/infra-as-code-management/get-started) to confirm access.
- **Feature access:** This feature is pending release and is enabled per account. Contact [Harness Support](mailto:support@harness.io) to request access.
- **Permissions:** Workspace-level configuration requires workspace edit permission. Project-level configuration requires project settings edit permission. Go to [Workspace permissions](/docs/infra-as-code-management/workspaces/workspace-rbac) to review IaCM roles.
- **A default Destroy pipeline:** Ephemeral Workspaces runs your workspace or project Destroy default pipeline when a workspace expires. Configure it first. Go to [Default pipelines](/docs/infra-as-code-management/pipelines/default-pipelines) to set one up.
- **A drift pipeline:** Drift Detection runs a pipeline that performs a detect-drift operation. Go to [Drift detection](/docs/infra-as-code-management/pipelines/content/drift-detection) to build one.

---

## How the two features relate

Both features extend the same workspace lifecycle and reuse the same configuration surface, but they solve different problems and run on different schedulers.

| Aspect | Drift Detection | Ephemeral Workspaces |
| --- | --- | --- |
| Purpose | Detect infrastructure that no longer matches state. | Automatically destroy, and optionally delete, inactive workspaces. |
| Action | Runs a drift pipeline on a recurring schedule. | Runs a destroy pipeline once after inactivity, then optionally deletes the workspace record. |
| Schedule | Recurring (every N hours or days). | One-time action anchored to the last successful apply. |
| Scheduler | Harness scheduled pipeline trigger (cron). | Harness background finder jobs that scan periodically. |
| Workspace state | active or drifted. | active, then inactive, then deleted. |
| Configuration levels | Workspace and project (per provisioner). | Workspace and project (per provisioner). |

Both features attach to the workspace and project default pipelines and use the same override model described in [Configuration levels](#configuration-levels). You can enable one without the other.

---

## Configuration levels

Both features support two configuration levels.

| Level | Scope | Override behavior |
| --- | --- | --- |
| Workspace-level | A single workspace. | Takes precedence over project-level configuration. |
| Project-level (per provisioner) | All workspaces in the project that use the specified provisioner. | Acts as the fallback when a workspace has no workspace-level configuration. |

The supported provisioner values are `opentofu`, `terraform`, `terragrunt`, and `awscdk`.

Configuration resolves in this priority order:

| Priority | Source | Behavior |
| --- | --- | --- |
| 1 | Workspace-level | Highest priority. Always wins when present. |
| 2 | Workspace opt-out | A workspace that you explicitly disable stays disabled and does not inherit project-level configuration. |
| 3 | Project-level (specific provisioner) | Fallback when no workspace-level configuration exists. |
| 4 | None | The workspace is not drift-detected or ephemeral. |

:::info Workspace overrides are preserved
When you disable a feature at the workspace level, that workspace is explicitly opted out. A later project-level enable does not re-enable it. When you disable a feature at the project level, workspace-level settings remain untouched.
:::

---

## Drift Detection

Drift Detection runs a pipeline on a schedule to check whether your live infrastructure still matches your Terraform, OpenTofu, or Terragrunt state. When the scheduled run detects drift, the pipeline fails and the workspace is marked drifted.

Go to [Drift detection](/docs/infra-as-code-management/pipelines/operations-overview/#driftdetection) to understand how the drift detection operation works. This page covers the scheduled, native configuration. To run drift detection manually or as a step in a provision pipeline, go to [Drift detection (manual)](/docs/infra-as-code-management/pipelines/content/drift-detection).

### How drift detection works

1. You configure a drift pipeline and a schedule at the workspace or project level.
2. Harness creates a recurring scheduled trigger for the pipeline.
3. The trigger fires on the schedule and runs the drift pipeline.
4. The pipeline runs a plan, compares it against state, and reports the result.
5. Harness updates the workspace status to drifted when changes are detected, or keeps it active when no drift is found.

A random jitter of up to 15 minutes is applied to each schedule so that workspaces do not all run at the same moment.

### Schedule fields

| Field | Description | Required | Example |
| --- | --- | --- | --- |
| pipeline_id | The pipeline to run for drift detection. | Yes | my_drift_pipeline |
| run_every | The interval value. | Yes | 6 |
| run_every_unit | The interval unit: `hours` or `days`. | Yes | hours |
| provisioner | The provisioner this configuration applies to. Required at the project level. | Conditional | opentofu |

The schedule is converted to a cron expression automatically. For example, `run_every: 6` with `run_every_unit: hours` runs every six hours.

### Enable drift detection

<Tabs>
<TabItem value="ui" label="Harness UI" default>

**Workspace level**

1. Open your workspace and select the **Configuration** tab.
2. Scroll to the **Advanced** section and expand **Default Pipelines**.
3. Under **Check for Drift**, select your drift pipeline from the dropdown.
4. Select **Automated Check for Drift**.
5. In the **Run every** field, enter a number and select **Days** or **Hours**.
6. Select **Save Changes**.

**Project level**

1. Go to **Project Settings → IaCM Settings → IaCM Defaults**.
2. Expand the accordion for your provisioner (for example, **For OpenTofu**).
3. Under **Check for Drift**, select your drift pipeline from the dropdown.
4. Select **Automated Check for Drift**.
5. In the **Run every** field, enter a number and select **Days** or **Hours**.
6. Select **Save Changes**.

</TabItem>
<TabItem value="api" label="REST API">

**Workspace level**

Send a PUT request to the workspace `drift-config` endpoint. Replace `<harness_host>` with your Harness environment URL (`app.harness.io` for production SaaS, or your cluster-specific domain for self-managed).

```bash
curl -X PUT \
  'https://<harness_host>/gateway/iacm/api/orgs/<org>/projects/<project>/workspaces/<workspace>/drift-config' \
  -H 'Harness-Account: <account_id>' \
  -H 'x-api-key: <your_api_key>' \
  -H 'Content-Type: application/json' \
  -d '{
    "pipeline_id": "my_drift_pipeline",
    "run_every": 6,
    "run_every_unit": "hours",
    "provisioner": "opentofu"
  }'
```

To check the current configuration, send a GET request to the same path (add `?provisioner=<value>` as a query parameter). The response reports `enabled`, `pipeline_id`, `run_every`, `run_every_unit`, and `trigger_id`.

To disable drift detection for the workspace, send a DELETE request to the same path. This removes the scheduled trigger.

**Project level**

Send a PUT request to the settings `drift-config` endpoint. Project-level configuration is applied asynchronously — the request returns `202 Accepted` with a `job_id`. Workspaces that already have a workspace-level drift configuration are not overwritten.

```bash
curl -X PUT \
  'https://<harness_host>/gateway/iacm/api/orgs/<org>/projects/<project>/settings/drift-config' \
  -H 'Harness-Account: <account_id>' \
  -H 'x-api-key: <your_api_key>' \
  -H 'Content-Type: application/json' \
  -d '{
    "pipeline_id": "my_drift_pipeline",
    "provisioner": "opentofu",
    "run_every": 24,
    "run_every_unit": "hours"
  }'
```

To disable drift detection for the project, send a DELETE request to the settings `drift-config` endpoint.

</TabItem>
</Tabs>

### Drift status values

| Status | Meaning |
| --- | --- |
| active | Infrastructure matches state. |
| drifted | Differences were detected between infrastructure and state. |

View the workspace status on the workspace detail page or in the workspace list. When a workspace is marked drifted, run a new apply to reconcile the infrastructure and return the workspace to active status.

---

## Ephemeral Workspaces

Ephemeral Workspaces are time-limited environments that automatically destroy their infrastructure after a period of inactivity. Optionally, Harness deletes the workspace record itself after a further delay.

### How ephemeral workspaces work

1. You configure a destroy schedule, and optionally a delete schedule, at the workspace or project level.
2. Harness periodically scans for workspaces whose destroy time has passed.
3. When a workspace is eligible, Harness runs the workspace or project Destroy default pipeline.
4. After a successful destroy, the workspace status becomes inactive.
5. When you opt in to deletion, the workspace record is permanently removed after the delete delay passes. Deletion removes only the workspace record from Harness — infrastructure is already destroyed by the destroy pipeline in step 4.

The TTL is a sliding window anchored to the last successful apply, not to the workspace creation time. The clock resets each time a workspace transitions from inactive to active.

:::info TTL behavior
- Only a successful apply resets the TTL. Plan-only operations do not reset it.
- A workspace that has never been provisioned is never auto-destroyed.
- A failed apply blocks destruction until the workspace succeeds or you intervene.
:::

### Schedule fields

**Destroy schedule**

| Field | Description | Required | Example |
| --- | --- | --- | --- |
| provisioner | The provisioner this configuration applies to. Required at the project level. | Conditional | opentofu |
| destroy_delay_value | The relative delay after the last successful apply. Provide this with `destroy_delay_unit`, or use `destroy_on_date` instead. | Conditional | 7 |
| destroy_delay_unit | The delay unit: `hours` or `days`. | Conditional | days |
| destroy_on_date | An absolute destroy date in ISO 8601 format (`YYYY-MM-DD`). Use this instead of a delay. | Conditional | 2026-07-01 |

The destroy operation uses your configured Destroy default pipeline (workspace-level or project-level fallback).

**Delete schedule (optional)**

| Field | Description | Required | Example |
| --- | --- | --- | --- |
| delete_workspace | Whether to delete the workspace record after a successful destroy. | No | true |
| delete_delay_value | How long to wait after destroy before deletion. | Conditional | 7 |
| delete_delay_unit | The delay unit: `hours` or `days`. | Conditional | days |
| delete_on_date | An absolute delete date in ISO 8601 format (`YYYY-MM-DD`). | Conditional | 2026-07-15 |

### Enable ephemeral workspaces

<Tabs>
<TabItem value="ui" label="Harness UI" default>

**Workspace level**

1. Open your workspace and select the **Configuration** tab.
2. Scroll to the **Advanced** section and expand **Default Pipelines**.
3. Under **Destroy Infrastructure**, confirm your destroy pipeline is selected.
4. Select **Allow TTL (time-to-live) settings**.
5. Choose **Delayed** to set a relative delay, or **On a specific day** to set an absolute date.
   - For **Delayed**: enter a number in **Destroy infrastructure in** and select **Days** or **Hours**.
   - For **On a specific day**: enter a date using the date picker.
6. Optionally, select **Delete Workspace after destroying** and configure the delete delay in the same way.
7. Select **Save Changes**.

**Project level**

1. Go to **Project Settings → IaCM Settings → IaCM Defaults**.
2. Expand the accordion for your provisioner (for example, **For OpenTofu**).
3. Under **Destroy Infrastructure**, confirm your destroy pipeline is selected.
4. Select **Allow TTL (time-to-live) settings** and configure the destroy schedule.
5. Optionally, select **Delete Workspace after destroying** and configure the delete delay.
6. Select **Save Changes**.

:::info 
A scheduled destroy only applies to workspaces that have been in the Active state at least once. If an ephemeral workspace is not destroyed at its scheduled time, run any pipeline on the workspace once to transition it to the Active state. Future scheduled destroys will then execute as expected, even if the workspace later becomes Inactive.
:::

</TabItem>
<TabItem value="api" label="REST API">

**Workspace level**

Send a PUT request to the workspace `ephemeral-config` endpoint:

```bash
curl -X PUT \
  'https://<harness_host>/gateway/iacm/api/orgs/<org>/projects/<project>/workspaces/<workspace>/ephemeral-config' \
  -H 'Harness-Account: <account_id>' \
  -H 'x-api-key: <your_api_key>' \
  -H 'Content-Type: application/json' \
  -d '{
    "provisioner": "opentofu",
    "destroy_delay_value": 7,
    "destroy_delay_unit": "days",
    "delete_workspace": true,
    "delete_delay_value": 7,
    "delete_delay_unit": "days"
  }'
```

To check the current configuration, send a GET request to the same path (add `?provisioner=<value>` as a query parameter). The response reports `enabled`, `provisioner`, `source`, the destroy schedule (`ttl_value`/`ttl_unit` or `destroy_on_date`), `delete_workspace`, and the delete schedule.

To disable an ephemeral workspace, send a DELETE request to the same path.

**Project level**

Send a PUT request to the settings `ephemeral-config` endpoint:

```bash
curl -X PUT \
  'https://<harness_host>/gateway/iacm/api/orgs/<org>/projects/<project>/settings/ephemeral-config' \
  -H 'Harness-Account: <account_id>' \
  -H 'x-api-key: <your_api_key>' \
  -H 'Content-Type: application/json' \
  -d '{
    "provisioner": "opentofu",
    "destroy_delay_value": 7,
    "destroy_delay_unit": "days",
    "delete_workspace": true,
    "delete_delay_value": 10,
    "delete_delay_unit": "days"
  }'
```

To disable ephemeral workspaces for the project, send a DELETE request to the settings `ephemeral-config` endpoint.

</TabItem>
</Tabs>

### Workspace lifecycle

```plaintext
[inactive] ── successful apply ──▶ [active]
                                      │
                                      │  idle past destroy schedule
                                      ▼
                                 [destroying] ── destroy pipeline runs
                                      │
                        ┌────────────┴────────────┐
                   (success)                   (failure)
                        ▼                          ▼
                   [inactive]                  [failed]
                        │
                        │  delete schedule passes (if delete_workspace = true)
                        ▼
                 [workspace record deleted]
```

### Safety guards

Ephemeral Workspaces includes several safeguards against accidental teardown:

- **Re-validation at execution:** Before a destroy or delete runs, Harness re-checks that the workspace is still eligible. If you disabled the feature or the workspace became active again, the job is skipped.
- **Resource binding protection:** A workspace is not deleted while another resource still references it.
- **Explicit opt-out:** A workspace you disable stays disabled, even if the project later enables ephemeral workspaces.
- **Activity reset:** If a destroyed workspace becomes active again, any pending deletion is cancelled and the clock resets.
- **Failed destroy handling:** If a destroy pipeline fails, the workspace remains in a failed state. Investigate the failure, fix the underlying issue, and manually trigger a destroy operation or re-run the scheduled automation once the issue is resolved.

---

## Troubleshooting

<!--
TODO (reviewer): Mode choice was validated with a live Kapa query while the feature is pending release.
- The "no destroy pipeline" entry uses mode="docs": Kapa returns a good answer grounded in the existing
  Destroy-pipeline docs.
- The other three use mode="general" (Gemini, build-time): Kapa was uncertain and contradicted the
  unpublished feature (answered "this feature is not documented / cannot confirm it exists" and conflated
  it with IDP Environment TTL and the HSF PLUGIN_IS_EPHEMERAL flag). Gemini answers from the issue text
  alone, so it gives generic troubleshooting instead. Every entry keeps a code-accurate static fallback.
AFTER this page is published and re-indexed by Kapa, re-evaluate switching the general entries to mode="docs".
-->

<Troubleshoot
  issue="Enabling an ephemeral workspace in Harness IaCM fails because no destroy pipeline is configured."
  mode="docs"
  fallback="Configure a Destroy default pipeline for the workspace or project before you enable an ephemeral workspace. Ephemeral Workspaces runs your Destroy default pipeline when a workspace expires."
/>

<Troubleshoot
  issue="A Harness IaCM workspace is not auto-destroyed after its TTL appears to have passed."
  mode="general"
  fallback="The destroy schedule is anchored to the last successful apply, and a workspace that has never been provisioned or whose last apply failed is not destroyed. Confirm the workspace has a successful apply and is not in a failed state."
/>

<Troubleshoot
  issue="A project-level drift or ephemeral configuration did not apply to a specific workspace in Harness IaCM."
  mode="general"
  fallback="Workspace-level configuration takes precedence over project-level configuration. A workspace that you explicitly disabled stays opted out and does not inherit project-level settings."
/>

<Troubleshoot
  issue="An ephemeral workspace record is not deleted after a successful destroy in Harness IaCM."
  mode="general"
  fallback="Deletion runs only when you enable delete after destroy, the workspace is inactive, the delete schedule has passed, and no other resource references the workspace."
/>

---

## Next steps

You can now keep infrastructure in sync with Drift Detection and control workspace lifecycle with Ephemeral Workspaces.

- Go to [Drift detection](/docs/infra-as-code-management/pipelines/content/drift-detection) to run drift detection manually or during provisioning.
- Go to [Destroy workspaces](/docs/infra-as-code-management/workspaces/destroy-workspaces) to tear down infrastructure on demand.
- Go to [Default pipelines](/docs/infra-as-code-management/pipelines/default-pipelines) to configure the pipelines these features run.
