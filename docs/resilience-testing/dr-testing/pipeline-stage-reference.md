---
title: Pipeline Stage Reference
sidebar_label: Pipeline Stage Reference
sidebar_position: 30
description: Field reference for DR test creation, Disaster Recovery stage tabs, Chaos Probe, Chaos Fault, Chaos Action, and Rollback.
keywords:
  - DR test
  - Disaster Recovery stage
  - Chaos Probe
  - Chaos Fault
  - Chaos Action
  - rollback
  - pipeline stage
tags:
  - disaster-recovery
  - resilience-testing
---

Complete field reference for Disaster Recovery (DR) test pipelines. For a step-by-step walkthrough, go to [Get Started with DR Testing](./get-started).

:::info Feature Flag
DR Testing is currently behind a feature flag (`CHAOS_DR_TESTING_ENABLED`). Contact your Harness sales representative to get it enabled for your account.
:::

---

## DR Tests list

Go to **Resilience Testing → DR Tests**. The list shows pipelines that contain at least one Disaster Recovery stage.

| Column | Description |
|---|---|
| **Pipeline name** | Display name and auto-generated identifier. |
| **DR test stages** | Names of the `DRTest` stages in the pipeline. |
| **Recent executions** | Sparkline of recent run statuses. |
| **Last execution** | Status and timestamp of the most recent run, or **Never**. |
| **Last modified** | Timestamp and user who last saved the pipeline. |

Filterable by **Search** and **Tag(s)**. Default sort: **Last Modified (New -> Old)**.

---

## Create new DR Test dialog

Shown when you select **+ New DR Test**.

| Field | Required | Description |
|---|---|---|
| **Name** | Yes | Display name for the Disaster Recovery stage. Also used to derive the pipeline name (`<Name> Pipeline`). |
| **Id** | Auto-generated | Unique identifier derived from the name. Editable via the pencil icon. Must be unique within the project. |
| **Description** | No | Free-text description of the disaster scenario. |
| **Tags** | No | Key or `key:value` labels for organizing and filtering. |
| **Objective** | No | Goal or success criteria for this DR test. |

Select **Continue in Pipeline Studio** to create the pipeline and open it. Select **Cancel** to discard the dialog without creating anything.

Harness creates:

- A pipeline with identifier derived from the name and tag `module: drtest`.
- A stage of type `DRTest` whose name and identifier match the dialog values.
- An empty Execution canvas, so you add Chaos Probe, Chaos Fault, Chaos Action, and other steps yourself.

---

## Pipeline Studio: Overview tab

The stage overview is pre-populated from the create dialog. All fields remain editable.

### Stage overview fields

| Field | Description |
|---|---|
| **Name** | Stage display name. |
| **Id** | Stage identifier. Auto-derived from name, editable. |
| **Description** | Optional stage description. |
| **Tags** | Optional labels. |
| **Objective** | Optional objective for this disaster recovery test. |

### Advanced section (within Overview)

| Field | Description |
|---|---|
| **Timeout** | Maximum allowed runtime for the stage. Accepts duration format: `w`, `d`, `h`, `m`, `s`. Example: `2h 30m`. |
| **Stage Variables** | Key-value variables scoped to this stage. Select **+ New Variable** to add. Reference them in steps with Harness expressions. |

---

## Pipeline Studio: Environment tab

### Configuration section

| Field | Description |
|---|---|
| **Specify Environment** | Select the Harness environment for the stage, or select **+ New Environment** to create one. |

Chaos infrastructure is **not** selected on this tab. Each Chaos Fault, Chaos Probe, or Chaos Action step selects its own infrastructure.

### Failure Strategy section

Defines how the pipeline responds when the stage encounters an error. You can add multiple strategies for different error types.

#### On failure of type

Select one or more failure types, or check **All Errors**:

| Failure type | Description |
|---|---|
| Authentication Errors | Invalid or expired credentials. |
| Connectivity Errors | Network or connectivity issues reaching a target. |
| Timeout Errors | Operations that exceed their configured timeout. |
| Authorization Errors | Insufficient permissions. |
| Verification Failures | Step or probe verification conditions not met. |
| Delegate Provisioning Errors | Failures provisioning or connecting a Harness Delegate. |
| Unknown Errors | Errors that do not match any other category. |
| Policy Evaluation Failures | Governance policy checks that fail. |
| Execution-time Inputs Timeout Errors | Runtime input prompts that were not fulfilled in time. |
| Approval Rejection | An approval step was explicitly rejected. |
| Delegate Restart | The Delegate restarted during execution. |
| User Marked Failure | A step was manually marked as failed. |

#### Perform Action

| Action | Description |
|---|---|
| **Rollback Pipeline** | Roll back all stages in the pipeline that support rollback. |
| **Retry Step** | Retry the failed step a configured number of times. |
| **Abort** | Stop pipeline execution immediately. |
| **Mark As Failure** | Mark the stage as failed. |
| **Rollback Stage** | Roll back only this stage, using the Rollback path on the Execution tab. |

---

## Pipeline Studio: Execution tab

The Execution tab has two canvases, toggled with **Execution \| Rollback**:

- **Execution:** The forward recovery workflow.
- **Rollback:** Compensating steps for when a failure strategy selects **Rollback Stage** or **Rollback Pipeline**. Harness does not enter this path automatically on probe failure unless your failure strategy invokes rollback.

Select **Add Step**, then choose **Add Step**, **Add Step Group**, **Use template**, or **Create with AI**.

In the **Step Library**, open **Resilience Testing** to add Chaos Fault, Chaos Probe, Chaos Action, or Chaos Experiment. Open **Approval** to add Harness Approval or other approval steps. An empty Disaster Recovery stage can be saved; approval, fault, and probe steps are available but not required by schema validation before save.

### Chaos Probe

Validates a condition against your system for a configured duration.

| Field | Required | Description |
|---|---|---|
| **Name** | Yes | Display name for the step. |
| **Id** | Auto-generated | Step identifier. |
| **Chaos Probe** | Yes | The probe identity to run, such as an HTTP or Kubernetes health probe from your project. |
| **Select Chaos Infrastructure** | Yes | Target infrastructure in the form `<environment>/<infrastructure>`. |
| **Duration** | Yes | How long the probe runs (for example `1m`, `10m`). Placeholder text shows examples such as `10s`, `1m`, `1h`. |
| **Runtime Inputs** | Depends on probe | Name and value pairs the selected probe exposes. Required inputs are marked. Pin a field to supply the value at run time. |

YAML shape:

```yaml
- step:
    type: ChaosProbe
    name: ChaosProbe_1
    identifier: ChaosProbe_1
    spec:
      identity: ad-http-test-1
      duration: 10m
      infraReference: env91x/infra91xadvanced
      tasks:
        - identifier: ad-http-test-1
          values:
            - name: VARIABLES_URL
              value: https://example.com
```

### Chaos Fault

Injects a failure into the target system.

| Field | Required | Description |
|---|---|---|
| **Name** | Yes | Display name for the step. |
| **Id** | Auto-generated | Step identifier. |
| **Chaos Fault** | Yes | Fault identity to inject. This can be a project fault or a template-backed identity such as `custom.<template-id>`. |
| **Select Chaos Infrastructure** | Yes | Target infrastructure in the form `<environment>/<infrastructure>`. |
| **Runtime Inputs** | Depends on fault | Inputs the selected fault exposes. Pin fields you want prompted at run time. |

YAML shape:

```yaml
- step:
    type: ChaosFault
    name: ChaosFault_1
    identifier: ChaosFault_1
    spec:
      identity: custom.template-scope-test-eps
      infraReference: env91x/infra91xadvanced
```

### Chaos Action

Runs a predefined chaos action from Resilience Testing.

| Field | Required | Description |
|---|---|---|
| **Name** | Yes | Display name for the step. |
| **Id** | Auto-generated | Step identifier. |
| **Chaos Action** | Yes | The action identity to run. |
| **Select Chaos Infrastructure** | Yes | Target infrastructure in the form `<environment>/<infrastructure>`. |
| **Duration** | Yes | How long the action runs. |
| **Runtime Inputs** | Depends on action | Inputs the selected action exposes, such as `VARIABLES_DURATION`. Pin fields for runtime prompts. |

YAML shape:

```yaml
- step:
    type: ChaosAction
    name: ChaosAction_1
    identifier: ChaosAction_1
    spec:
      identity: k8s-delay-variable
      duration: 10s
      infraReference: env91x/infra91xadvanced
      tasks:
        - identifier: k8s-delay-variable
          values:
            - name: VARIABLES_DURATION
              value: 10s
```

You can also add standard Harness steps (shell script, HTTP, Harness Approval, notification) in the same stage.

### Use templates and Save as Template

- **Use template:** From the Add Step menu, opens **Step and Step Group Templates**. Select a template to insert it into the Execution (or Rollback) canvas. Template-backed faults often appear as an `identity` such as `custom.<template-id>` in YAML.
- **Save as Template:** On a Chaos Probe, Chaos Fault, or Chaos Action drawer, saves the current step configuration as a reusable template.

### Variables

Open **Variables** in Pipeline Studio to manage:

- **Pipeline** variables (name, identifier, tags, custom variables).
- **Stage** variables for the Disaster Recovery stage (**Add Variable** under Stage Variables).

Reference them from step inputs with Harness expressions such as `<+stage.variables.myVar>`.

---

## Pipeline Studio: Advanced tab

### Delegate Selector

| Field | Description |
|---|---|
| **Define Delegate Selector** | Optional. Add selector tags to route this stage to a specific Harness Delegate. Leave empty to use any available Delegate. |

### Conditional Execution

| Option | Description |
|---|---|
| If the pipeline executes successfully up to this point | Default. Stage runs only if preceding stages passed. |
| If the previous pipeline or stage fails | Stage runs only if the immediately preceding stage failed. |
| Always | Stage always runs. |
| JEXL Condition | Stage runs only if the custom expression evaluates to `true`. |

### Looping Strategy

| Strategy | Description |
|---|---|
| **Matrix** | Run the stage for each combination of values across variable axes. |
| **Repeat** | Run the stage a fixed number of times, optionally with a concurrency limit. |
| **Parallelism** | Split stage iterations to run in parallel up to a configured maximum. |

### Failure Strategy (Advanced tab)

Same failure type options as the Environment tab. Additional actions available here:

| Action | Description |
|---|---|
| **Manual Intervention** | Pause and wait for a user to choose the next action. |
| **Ignore Failure** | Treat the failure as a warning and continue. |
| **Retry Step** | Retry the failed step. |
| **Mark As Success** | Override the failure and mark the step or stage as succeeded. |
| **Abort** | Stop execution immediately. |
| **Proceed with Default Values** | Continue using default values for unresolved inputs. |
| **Mark As Failure** | Mark the step or stage as failed. |
| **Rollback Pipeline** | Roll back all stages that support rollback. |

---

## Resilience Tests tab on execution

On a pipeline execution, open **Resilience Tests**. The tab lists Resilience Testing steps from the selected stage and reports **Probe Results** for probe outcomes.

- Use it to review probe pass or fail results after a DR run.
- For Chaos Fault and Chaos Action detail, use step **Details**, **Step Logs**, and **Console View**. The tab is not a fault catalog.

---

## Related

- [Get Started with DR Testing](./get-started): Create and run your first DR test.
- [Concepts](./concepts): RTO, RPO, environments, and failure strategies.
