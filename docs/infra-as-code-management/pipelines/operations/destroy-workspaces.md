---
title: Destroy Workspaces
description: Learn how to destroy workspaces using an interactive guide, step-by-step instructions, and YAML.
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can perform specific operations against your workspace configuration. Similarly to [provisioning a workspace](https://developer.harness.io/docs/infra-as-code-management/pipelines/operations/provision-workspace), you can tear down the infrastructure state from a workspace without deleting the workspace itself. This guide walks you through how to create a Destroy pipeline to run the `init`, `plan` and `destroy` commands with OpenTofu or Terraform.

<Tabs>
<TabItem value="Interactive" label="Interactive Guide" default>
<iframe 
    src="https://app.tango.us/app/embed/c80ce1fe-cc35-45a4-9c7d-b36451567a97" 
    title="Destroy workspaces" 
    style={{ minHeight: '640px' }}
    width="100%" 
    height="100%"
    referrerpolicy="strict-origin-when-cross-origin"
    frameborder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowfullscreen="true"
></iframe>
</TabItem>
<TabItem value="Step-by-Step" label="Step-by-Step">
Follow these instructions to provision a workspace within the Harness Visual Editor.

1. In the Harness project pane, select **Pipelines**.
2. Click **+ Create a Pipeline** to set up a new pipeline.
3. Click **Add Stage** and select **Infrastructure** from the **Select Stage Type** pane.
4. Enter a stage name, optional description, and tag, then select **Set Up Stage**.
5. On the **Workspace** tab, select an existing workspace or click **+ Create New Workspace** to create one. Note: If set to `runtime input`, the workspace can be specified during execution.
6. Go to the **Execution** tab. Under **Common Operations**, select **Destroy** to configure the workspace destruction process.
7. Select **Use Strategy** to automatically add `init`, `plan`, and `destroy` steps, or customize the pipeline by adding steps manually.
8. Click **Save** and then **Run Pipeline** to execute.

:::note
The plan-destroy step generates a Terraform plan. This Terraform plan is accessible to all the steps after the IaCM Terraform plan, and can be referenced using the expression `<+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_ID.output.outputVariables.parsedPlan>`.
:::
</TabItem>
<TabItem value="YAML" label="YAML">
To provision a workspace via YAML, use the template below. Replace bracketed placeholders as needed.

```yaml
pipeline:
  name: <<PIPELINE NAME>>
  identifier: <<PIPELINE IDENTIFIER>>
  projectIdentifier: <<PROJECT IDENTIFIER>>
  orgIdentifier: <<ORG IDENTIFER>>
  tags: {}
  stages:
    - stage:
        name: iacstage
        identifier: iacstage
        description: ""
        type: IACM
        spec:
          workspace: <<WORKSPACE ID>>
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: IACMTerraformPlugin
                  name: init
                  identifier: init
                  spec:
                    command: init
                  timeout: 5m
              - step:
                  type: IACMTerraformPlugin
                  name: plan
                  identifier: plandestroy
                  spec:
                    command: plan-destroy
                  description: plan destroy
              - step:
                  type: IACMTerraformPlugin
                  name: destroy
                  identifier: destroy
                  spec:
                    command: destroy
                  description: destroy
                  timeout: 5m
        tags: {}
```
:::note
Notice the three steps to apply your `init`, `plan` and `destroy` commands. 
:::
</TabItem>
</Tabs>
---
After the plan is created, view resources and Terraform outputs on the **Resources** tab. Check which resources will be added, modified, or removed.

:::tip pipeline chaining
Currently, IaCM doesn't support multiple Workspaces in the same pipeline. If you'd like to provision several Workspaces altogether, consider using [Pipeline Chaining](https://developer.harness.io/docs/platform/pipelines/pipeline-chaining/).
:::