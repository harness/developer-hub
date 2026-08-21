---
title: Rerun pipeline with no input changes
description: Configure pipelines to prevent input changes during rerun.
sidebar_position: 30
keywords:
  - rerun pipeline
  - fixed inputs
  - rerun settings
  - input editability
tags:
  - pipelines
  - execution
---

You can configure pipelines to prevent input changes during rerun. When you enable fixed inputs on rerun, the pipeline uses the same input values from the original execution and does not allow you to modify them. 

Use this feature when you need consistency in rerun behavior or when input changes should be restricted after the initial execution.

---

## What you will learn from this topic

- How to [enable fixed inputs on rerun](#enable-fixed-inputs-on-rerun) for a pipeline.
- How to [rerun a pipeline with fixed inputs](#rerun-pipeline-with-fixed-inputs) using different rerun options.
- How fixed inputs on rerun works with [pipeline templates](#pipeline-templates), [remote pipelines](#remote-pipelines), [pipeline chaining](#pipeline-chaining), and [API calls](#api-call-behavior).

---

## Before you begin

- **Harness project**: You need an existing project. For more information, refer to <a href="/docs/platform/organizations-and-projects/projects-and-organizations" target="_blank" rel="noopener noreferrer">Organizations and Projects</a>.
- **Pipeline**: You need an existing pipeline. For more information, refer to <a href="/docs/platform/pipelines/harness-yaml-quickstart" target="_blank" rel="noopener noreferrer">Create your first pipeline</a>.
- **Pipeline permissions**: You need **Pipeline: Create/Edit** permission to configure settings and **Pipeline: Execute** permission to rerun pipelines. For more information, refer to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" rel="noopener noreferrer">RBAC in Harness</a>.

---

## Enable fixed inputs on rerun

Perform the following steps to enable fixed inputs on rerun for a pipeline.

1. In Harness, open your pipeline in Pipeline Studio.
2. In the Pipeline Studio Visual Editor, select **Advanced Options**.
3. In the **Re-run Settings** section, select **Yes** for **Is Input Data uneditable when rerunning?**.

   <div align="center"><DocImage path={require('./static/re-run-option-advance-setting.png')} alt="Re-run Settings showing Is Input Data uneditable when rerunning option" width="80%" /></div>

4. Select **Save** to save the pipeline.

When you select **Yes**, Harness automatically adds the following field to your pipeline YAML:

<details>
<summary>YAML example</summary>

```yaml
pipeline:
  name: My Pipeline
  identifier: My_Pipeline
  fixedInputsOnRerun: true  # Prevent input changes during rerun
  stages:
    - stage:
        name: Build
        identifier: Build
        type: CI
        spec:
          # ... stage configuration ...
```
</details>

:::note Setting evaluation
The setting value is always determined based on the latest version of the pipeline YAML, not the YAML used during the original execution. If you modify the **Is Input Data uneditable when rerunning?** setting after the first execution, the change takes effect during the rerun, even if the original execution had a different configuration.
:::

---

## Rerun pipeline with fixed inputs

When you enable fixed inputs on rerun, the feature applies to all rerun types. When you rerun the pipeline, you see a banner message stating **Inputs to this Pipeline are not editable during reruns**, which indicates that you cannot change the inputs for the pipeline.

The following rerun options support fixed inputs:

### Rerun entire pipeline

When you rerun the entire pipeline, all inputs remain fixed and cannot be modified.

<div align="center"><DocImage path={require('./static/re-run-pipeline-no-input-change.png')} alt="Rerun Pipeline dialog showing fixed inputs banner" width="80%" /></div>

### Rerun from specific stage

When you rerun from a specific stage, all inputs remain fixed and cannot be modified.

<div align="center"><DocImage path={require('./static/re-run-from-specific-stage-no-input-change.png')} alt="Rerun from specific stage dialog showing fixed inputs banner" width="80%" /></div>

### Rerun from last failed stage

When you rerun from the last failed stage, all inputs remain fixed and cannot be modified.

<div align="center"><DocImage path={require('./static/re-run-from-last-failed-stage.png')} alt="Rerun from last failed stage dialog showing fixed inputs banner" width="80%" /></div>

---

## Pipeline templates

When using pipeline templates, you can enable fixed inputs on rerun while creating the pipeline template. You cannot add this setting in a pipeline that uses a pipeline template. The setting must be configured in the template itself.

---

## Remote pipelines

For remote pipelines, the behavior is the same as inline pipelines. Enable the **Is Input Data uneditable when rerunning?** setting in the **Re-run Settings** section to prevent input changes during rerun.

---

## Pipeline chaining

Pipeline chaining behavior depends on the parent pipeline settings. If the **Is Input Data uneditable when rerunning?** option in the parent pipeline is set to **No**, the inputs in the child pipeline remain editable, even if the child pipeline has the **Is Input Data uneditable when rerunning?** option set to **Yes**.

The parent pipeline settings override the child pipeline rerun input editability, allowing inputs to be modified in the child pipeline during a rerun.

---

## API call behavior

When fixed inputs on rerun is enabled, the <a href="https://apidocs.harness.io/pipeline-execution/rerun-stages-execution-of-pipeline" target="_blank" rel="noopener noreferrer">API call to rerun</a> the pipeline ignores any inputs provided in the request. 

During normal reruns, inputs are sent again in the API call. However, when fixed inputs on rerun is enabled, the API ignores any inputs provided in the request and uses the inputs from the original execution.

---

## Next steps

- <a href="/docs/platform/pipelines/run-specific-stage-in-pipeline" target="_blank" rel="noopener noreferrer">Run specific stages</a>: Select which stages to run during pipeline execution.
- <a href="/docs/platform/variables-and-expressions/runtime-inputs" target="_blank" rel="noopener noreferrer">Runtime inputs</a>: Learn how runtime inputs work in pipelines.
- <a href="/docs/platform/pipelines/re-run-with-original-definition-and-inputs" target="_blank" rel="noopener noreferrer">Rerun with original definition and inputs</a>: Rerun pipelines with their original YAML definition.

---
