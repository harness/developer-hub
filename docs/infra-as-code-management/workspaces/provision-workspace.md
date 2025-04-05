---
title: Provision Workspaces
description: Learn how to provision workspaces using an interactive guide, step-by-step instructions, and YAML.
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

After you create a workspace, you can perform operations against the configuration, including provisioning. This guide walks you through how to create a provision pipeline to run the `init`, `plan` and `apply` command with OpenTofu or Terraform.

<Tabs>
<TabItem value="Interactive" label="Interactive Guide" default>
<iframe 
    src="https://app.tango.us/app/embed/c80ce1fe-cc35-45a4-9c7d-b36451567a97" 
    title="Provision workspaces" 
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

    ![Add infrastructure stage](static/select-stage.png)

4. Enter a stage name, optional description, and tag, then select **Set Up Stage**.
5. On the **Workspace** tab, select an existing workspace or click **+ Create New Workspace** to create one. 
:::note runtime input
If set to `runtime input`, you can specify the workspace at execution time..
:::
6. Go to the **Execution** tab. Under **Common Operations**, select **Provision**.
7. Optionally, select **Use Strategy** to automatically add `init`, `plan`, and `apply` steps, or customize the pipeline by adding steps manually.
8. Click **Save** and then **Run Pipeline** to execute.
</TabItem>
<TabItem value="YAML" label="YAML">
To provision a workspace via YAML, use the template below. Replace bracketed placeholders as needed.

```yaml
pipeline:
  name: <<PIPELINE NAME>>
  identifier: <<PIPELINE IDENTIFIER>>
  projectIdentifier: <<PROJECT IDENTIFIER>>
  orgIdentifier: <<ORG IDENTIFIER>>
  tags: {}
  stages:
    - stage:
        name: Provision Stage
        identifier: provision_stage
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
              - step:
                  type: IACMTerraformPlugin
                  name: plan
                  identifier: plan
                  spec:
                    command: plan
              - step:
                  type: IACMTerraformPlugin
                  name: apply
                  identifier: apply
                  spec:
                    command: apply
        tags: {}
```
:::note
Notice the three steps to execute your `init`, `plan` and `apply` commands. 
:::
</TabItem>
</Tabs>
---
:::tip review resources
After the plan is created, view resources and Terraform outputs on the **Resources** tab. Check which resources will be added, modified, or removed.
:::