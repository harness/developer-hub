---
title: Get Started with DR Testing
sidebar_label: Get Started
sidebar_position: 10
description: Create a disaster recovery test from Resilience Testing, open it in Pipeline Studio, and run a probe-fault-probe recovery workflow.
keywords:
  - disaster recovery
  - DR test
  - DR stage
  - chaos probe
  - chaos fault
  - pipeline studio
tags:
  - disaster-recovery
  - resilience-testing
---

Disaster Recovery (DR) Testing validates that your systems can recover from catastrophic failures. Each DR test is a Harness pipeline with a **Disaster Recovery** stage (`DRTest`), so you orchestrate failover, validation, and notification in a repeatable, auditable workflow.

You start from **Resilience Testing → DR Tests**. Harness creates the pipeline, then hands you into Pipeline Studio to build the recovery steps.

:::info Feature Flag
DR Testing is currently behind a feature flag (`CHAOS_DR_TESTING_ENABLED`). Contact your Harness sales representative to get it enabled for your account.
:::

---

## Before you begin

- **DR Tests access:** View and Create / Edit permissions on DR Tests. Go to [RBAC in Resilience Testing](/docs/resilience-testing/access-control/rbac) to configure roles.
- **A Harness environment:** The DR stage targets an environment. Go to [Environments](/docs/continuous-delivery/x-platform-cd-features/environments/create-environments) to create one if needed.
- **A Kubernetes chaos infrastructure:** Chaos Fault, Chaos Probe, and Chaos Action steps select an infrastructure in the form `<environment>/<infrastructure>`. Go to [Set up Kubernetes infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes) to connect one.
- **Pipeline permissions:** View, Create / Edit, and Execute on pipelines so you can open Pipeline Studio and run the test.

---

## Review the DR Tests list

Go to **Resilience Testing → DR Tests**. The list shows pipelines that contain a Disaster Recovery stage.

| Column | What it shows |
|---|---|
| **Pipeline name** | The pipeline display name and identifier. |
| **DR test stages** | The Disaster Recovery stage names inside that pipeline. |
| **Recent executions** | Recent run statuses for the pipeline. |
| **Last execution** | Status and time of the most recent run, or **Never** if it has not run. |
| **Last modified** | Who last saved the pipeline and when. |

Use **Search** and **Tag(s)** to narrow the list. **Reset** clears active filters. The sort control defaults to **Last Modified (New -> Old)**.

Select a pipeline name to open it in Pipeline Studio. Recent execution links open that run in the Continuous Delivery execution view.

---

## Create your first DR test

### Enter the details

1. Go to **Resilience Testing → DR Tests**.
2. Select **+ New DR Test**.
3. In **Create new DR Test**, fill in the **DR Test Details**:

| Field | Description |
|---|---|
| **Name** | Display name for the DR stage. Harness derives the **Id** from it. |
| **Description** | Optional details about the disaster scenario. |
| **Tags** | Optional labels for filtering. |
| **Objective** | Optional goal or success criteria for the test. |

4. Select **Continue in Pipeline Studio**.

Harness creates a pipeline (named `<Name> Pipeline`), adds a stage of type `DRTest` with the details you entered, tags the pipeline with `module: drtest`, and opens Pipeline Studio in the Continuous Delivery module.

### Configure the stage

Pipeline Studio shows four tabs on the Disaster Recovery stage: **Overview**, **Environment**, **Execution**, and **Advanced**.

1. On **Overview**, confirm the stage **Name**, **Id**, **Description**, **Tags**, and **Objective**. Expand **Advanced** to set a stage **Timeout** or **Stage Variables** if you need them. Select **Continue**.
2. On **Environment**, select **Specify Environment**, or create one with **+ New Environment**. Configure a **Failure Strategy** if you want stage-level error handling. Select **Continue**.

:::info Infrastructure lives on the step
The Environment tab does not ask for chaos infrastructure. Each Chaos Fault, Chaos Probe, or Chaos Action step selects its own infrastructure as `<environment>/<infrastructure>`.
:::

3. On **Execution**, build the recovery workflow. Select **Add Step**, then choose **Add Step** from the menu to open the **Step Library**. Under **Resilience Testing**, add the steps you need:

| Step type | What it does |
|---|---|
| **Chaos Probe** | Validates a condition against your system, such as pod health or an HTTP response. Use before and after a fault to verify baseline and recovery. |
| **Chaos Fault** | Injects a failure, such as pod delete or network loss, to simulate the disaster. |
| **Chaos Action** | Runs a predefined chaos action from Resilience Testing. |

The same menu also offers **Add Step Group**, **Use template** (insert a step or step group template), and **Create with AI**. Under **Approval**, you can add **Harness Approval** or other approval steps when a human gate belongs in the workflow. An empty Disaster Recovery stage can be saved; Harness does not require approval, fault, and probe steps to be present before save.

A typical first workflow follows **Probe → Fault → Probe**:

1. **Chaos Probe** to confirm baseline health.
2. **Chaos Fault** to inject the failure.
3. **Chaos Probe** to confirm the system recovers.

You can also add standard Harness steps (shell script, HTTP, notification) alongside Resilience Testing and Approval steps.

For each Chaos Probe, Chaos Fault, or Chaos Action step:

1. Select the probe, fault, or action (the step **identity**).
2. Select **Select Chaos Infrastructure** (`<environment>/<infrastructure>`).
3. Set **Duration** when the step requires it.
4. Fill any **Runtime Inputs** the selected resource exposes. Pin a field when you want Harness to prompt for the value at run time.
5. Select **Apply Changes**.

To reuse a configured step later, select **Save as Template** on the step drawer. To insert an existing template, use **Use template** from the Add Step menu and pick a step or step group template.

Open **Variables** in Pipeline Studio to add pipeline-level or stage-level variables, and reference them from step inputs with Harness expressions.

Go to [Pipeline Stage Reference](./pipeline-stage-reference) for the full field list.

### Use the Rollback path

The Execution tab offers an **Execution \| Rollback** toggle. **Execution** is the forward recovery workflow. **Rollback** is the path Harness can run when a failure strategy selects **Rollback Stage** or **Rollback Pipeline**. Add compensating steps on the Rollback canvas the same way you add Execution steps. Configure the failure strategy on the Environment or Advanced tab to invoke rollback; Harness does not automatically switch to Rollback solely because a probe fails unless your failure strategy says so.

### Save and run

1. Select **Save** to persist the pipeline.
2. Select **Run** to execute it.
3. Monitor progress in Pipeline Studio, then open **Execution History** for past runs.

---

## Add a Disaster Recovery stage to an existing pipeline

You do not have to start from **+ New DR Test**. From any pipeline in Pipeline Studio:

1. Select **Add Stage**.
2. Choose **Disaster Recovery**.
3. Configure Overview, Environment, and Execution as above.

This is the same stage type the DR Tests entrypoint creates. Pipelines that contain it appear on the **DR Tests** list.

---

## Review probe results after a run

Open a pipeline execution and select the **Resilience Tests** tab. The tab lists the Resilience Testing steps from the run and surfaces **Probe Results** for probe outcomes. Use step **Details**, **Step Logs**, and **Console View** for Chaos Fault and Chaos Action failures. The tab is not a fault catalog.

---

## Next steps

- [Pipeline Stage Reference](./pipeline-stage-reference): Complete field reference for the create dialog, stage tabs, and DR steps.
- [Concepts](./concepts): RTO, RPO, environments, and failure strategies.
- [Chaos Testing](/docs/resilience-testing/chaos-testing/get-started): Combine DR testing with chaos experiments and services.
