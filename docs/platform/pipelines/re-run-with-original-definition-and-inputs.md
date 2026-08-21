---
title: Rerun pipeline with original definition and inputs
description: Rerun a pipeline using the exact configuration and inputs from a specific execution.
sidebar_position: 30
keywords:
  - rerun pipeline
  - original definition
  - original inputs
  - pipeline snapshot
  - execution reproducibility
tags:
  - pipelines
  - execution
---

Harness allows you to rerun a pipeline using the exact same pipeline definition (YAML) and input variables used during the original execution. This ensures accurate reproducibility of past executions, even if the pipeline definition has changed since the original run.

:::note Important requirements
Before using this feature, note the following:

- **Feature flag required**: This feature requires the `PIPE_USE_ORIGINAL_YAML_FOR_EXECUTION` feature flag. Contact <a href="mailto:support@harness.io" target="_blank" rel="noopener noreferrer">Harness Support</a> to enable it.
- **Data retention**: Reruns are subject to data retention policies. By default, execution data is retained for 30 days, unless your account has a custom retention setting. You can only rerun executions that are still available within this retention window.
:::

---

## What you will learn from this topic

- How to [enable rerun with original definition](#enable-rerun-with-original-definition) for your account.
- How to [rerun a pipeline with original definition and inputs](#rerun-pipeline-with-original-definition-and-inputs) from execution history.
- How rerun with original definition [differs from regular rerun](#difference-from-regular-rerun).

---

## Before you begin

- **Harness project**: You need an existing project. For more information, refer to <a href="/docs/platform/organizations-and-projects/projects-and-organizations" target="_blank" rel="noopener noreferrer">Organizations and Projects</a>.
- **Pipeline**: You need an existing pipeline with at least one completed execution. For more information, refer to <a href="/docs/platform/pipelines/harness-yaml-quickstart" target="_blank" rel="noopener noreferrer">Create your first pipeline</a>.
- **Pipeline permissions**: You need **Pipeline: Execute** permission to rerun pipelines. For more information, refer to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" rel="noopener noreferrer">RBAC in Harness</a>.

---

## Enable rerun with original definition

Perform the following steps to enable rerun with original definition for your account.

1. In Harness, navigate to **Account Settings**.
2. Select **Default Settings**.
3. Select **Pipeline**.
4. In the **Allow using original pipeline YAML for reruns** setting, select **true**.
5. Select **Save**.

---

## Rerun pipeline with original definition and inputs

When you rerun a pipeline with original definition, Harness uses the compiled pipeline YAML from the original execution and auto-populates the original input values.

**Example:**

Imagine you have a pipeline that takes input variables (for example, environment name or version number). You run the pipeline with a specific set of inputs. This is **Execution ID: 1**.

A few days later, you modify the pipeline YAML by adding a new step or changing a stage name. You run the pipeline again with new input values. This is **Execution ID: 2**.

If you want to rerun the pipeline exactly as it was during Execution ID: 1, you can use rerun with original definition. This option uses:

- The original YAML that was in place during Execution ID: 1.
- The exact same inputs you provided during Execution ID: 1.

You do not need to worry about any changes made to the pipeline after Execution ID: 1. When you rerun using the original definition, Harness reproduces the pipeline exactly as it was during that execution.

:::note Point-in-time snapshot
Rerunning with original definition does not revert or affect the current pipeline state. The new YAML you used for Execution ID: 2 remains intact. You are running a point-in-time snapshot of the pipeline as it was during Execution ID: 1.
:::

Perform the following steps to rerun a pipeline with its original definition and inputs.

1. In Harness, navigate to your pipeline and select the **Execution History** tab.
2. Select the execution you want to rerun from.
3. Select **Re-run**.
4. Select **Re-run with original definition**.

   <div align="center"><DocImage path={require('./static/original-rerun-1.png')} alt="Re-run dropdown showing Re-run with original definition option" width="60%" /></div>

5. The **Run Pipeline** dialog opens with the original input values auto-populated.

   <div align="center"><DocImage path={require('./static/original-rerun-2.png')} alt="Run Pipeline dialog with original inputs pre-populated" width="80%" /></div>

6. Select **Re-run Pipeline**.

The pipeline executes using the original compiled pipeline YAML and input values from the selected execution.

---

## Difference from regular rerun

Rerun with original definition differs from regular rerun in how it handles pipeline YAML and input values.

- When you use the regular **Re-run Pipeline** or **Re-run from Specific Stage** options, Harness uses the latest version of the pipeline YAML. This means:

  - Any changes made to the pipeline after the original execution are included in the rerun.
  - You must manually re-enter input variables.

- When you use **Re-run with original definition**, Harness uses the pipeline YAML from the specific execution. This means:

  - The pipeline executes with the YAML definition that was in place during the original execution.
  - Input variables are automatically filled in with the values used during the original execution.

  This approach is especially helpful for debugging, validating reproducibility, or comparing past outcomes with current ones.

---

## Next steps

- <a href="/docs/platform/pipelines/run-specific-stage-in-pipeline" target="_blank" rel="noopener noreferrer">Run specific stages</a>: Select which stages to run during pipeline execution.
- <a href="/docs/platform/pipelines/re-run-with-no-input-changes" target="_blank" rel="noopener noreferrer">Rerun pipeline with no input changes</a>: Configure pipelines to prevent input changes during rerun.
- <a href="/docs/platform/variables-and-expressions/runtime-inputs" target="_blank" rel="noopener noreferrer">Runtime inputs</a>: Learn how runtime inputs work in pipelines.

---
