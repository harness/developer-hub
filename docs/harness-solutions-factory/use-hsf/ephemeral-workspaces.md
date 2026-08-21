---
title: Ephemeral vs Managed Workspaces
sidebar_label: Ephemeral vs Managed Workspaces
description: Decide when to set is_ephemeral on HSF workflows based on whether HSF will continue to maintain the resources it provisions.
sidebar_position: 3
redirect_from:
  - /docs/harness-solutions-factory/use-hsf/workflows/ephemeral-workflows
---

Every HSF workflow creates an IaCM workspace to provision and track the resources it manages. By default, that workspace is persistent. It holds the Terraform state, the input variables, and the history of every change made to that resource.

## What "ephemeral" means

`is_ephemeral` marks the **HSF IaCM workspace** as a one-shot delivery mechanism, not the Harness resources the workflow creates. Pipelines, services, input sets, and IaCM workspaces provisioned by the workflow remain in your account. HSF stops state-tracking them after the initial run so another team or process can own ongoing changes without fighting Terraform state.

---

## The core question

Before you choose ephemeral or managed, ask one thing:

**After this workflow runs, will you continue to maintain and update the provisioned resources through HSF?**


| If the answer is...                                                                      | Set `is_ephemeral` to | Why                                                                                                                                |
| ---------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Yes. You will re-configure or update these resources through HSF over time.              | `false` (default)     | HSF plans and applies diffs against existing Terraform state. Re-runs and workspace variable updates change resources in place.    |
| No. Another team, pipeline, or process owns ongoing changes after the initial provision. | `true`                | Downstream edits happen outside HSF. Keeping state forces every customization back into Terraform or into per-team template forks. |


---

## Use ephemeral workspaces

The ephemeral option supports **one-shot setups**: any deployment that should not be state-managed and uses Terraform as a **delivery mechanism**, not an ongoing state management solution.

In practice, HSF builds everything the team needs, then steps out of ownership. You can still maintain stage and step group templates centrally for governance; the application team manages the provisioned pipeline, service, or workspace configuration on their own.

### Example: onboard an application to a CI/STO/CD pipeline

Consider a workflow that onboards an application to a pipeline. It provisions:

- A pipeline with templates and pre-filled variables based on an IDP form
- Input sets with defaults and configurations
- Triggers associated with those input sets
- A service for the application to be deployed

HSF can provision all of this in one run. Application teams routinely make custom changes afterward, such as adding a database DevOps stage, wiring in IaCM provisioning for their own infrastructure, or other pipeline-specific configuration that is unique to their app.

If the workspace stays managed, every one of those custom changes must be reconciled against the original Terraform state. The historical state file becomes painful to maintain. In practice you must edit the Terraform template for every change, or maintain a custom template per team. At that point Terraform becomes an administrative burden rather than a delivery tool.

Set `is_ephemeral: true` so HSF delivers the starting configuration and the application team owns the pipeline from there.

### Example: provision an IaCM workspace for a team

Suppose a workflow provisions IaCM workspaces that teams use for their own infrastructure. If teams will configure and update those workspaces **outside** of HSF (directly in IaCM or through their own pipelines), a managed HSF workspace will drift from the live configuration. The next HSF apply can conflict with changes HSF does not know about.

This is the same hand-off pattern as pipeline onboarding. If HSF is not the ongoing owner, mark the workflow ephemeral. HSF provisions the workspace; the team manages it afterward without HSF tracking state.

### Other signs a workflow is a good ephemeral candidate

- **Hand-off ownership:** The workflow output is a starting point that another team owns and iterates on outside of HSF.
- **Pipeline-specific drift:** Teams need freedom to customize provisioned resources without reconciling every edit against Terraform state.
- **Template sprawl:** You would otherwise need a growing library of near-duplicate templates to accommodate small, team-specific customizations.

---

## Keep the managed default

Keep `is_ephemeral: false` (the default) when HSF will continue to maintain and update the provisioned resources.

### Example: org and project setup workflows

A workflow that creates a Harness org or project is a managed use case. Teams adjust OpenTofu variables in the workspace, re-run **Provision Workspace**, or submit the workflow again with updated inputs. The Terraform state file is the record of what exists; HSF applies incremental changes against that state.

### Example: build farm and delegate factory workflows

Workflows that provision shared platform infrastructure, such as a central build farm or delegate image factory, typically stay managed. Platform engineering teams update `RESOURCE_VARS`, re-run the workflow, or edit the workspace when connectors, secrets, or build infrastructure change. HSF remains the source of truth for that infrastructure.

### Example: IaCM workspaces HSF continues to manage

If a workflow provisions IaCM workspaces and **future configuration changes also flow through HSF** (re-running the workflow or editing the HSF-managed workspace), keep the default managed setting. HSF and the live resource stay in sync because there is only one place changes are made.

:::tip Avoiding drift

Drift happens when a resource has state tracked in one place but is changed in another. Ephemeral avoids drift by not tracking state after the hand-off. Managed avoids drift by routing all future changes through HSF. Decide up front who owns ongoing configuration; do not default to managed for every workflow.

:::

---

## Configure `is_ephemeral` in workflow YAML

In your IDP catalog template, set `is_ephemeral` under `solutions_factory_opts`. The value passes to the **Create and Manage IaCM Workspaces** pipeline as `IS_EPHEMERAL`.

```yaml
solutions_factory_opts:
  type: object
  required: [repo_source, workspace_type]
  properties:
    is_ephemeral:
      type: string
      default: "false"    # set to "true" for one-shot, hand-off workflows
      ui:widget: hidden
```

