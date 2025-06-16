---
title: Drift Detection 
description: Learn how to detect and get notified on drift 
sidebar_position: 60
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Drift occurs when the actual resources in your cloud environment differ from those defined in your OpenTofu or Terraform state file. This usually happens when someone makes manual changes — for example, modifying a resource directly in the cloud console instead of updating it through code.

Harness IaCM helps detect and highlight these discrepancies, enabling you to quickly reconcile the real infrastructure with your configuration. This is typically done using a provisioning pipeline, which ensures that your Git-based configuration is the source of truth.

:::info Example: Detecting manually created resources
Suppose you have a pipeline that provisions an **SQS queue**. The pipeline runs `init`, `plan`, and `apply`, and the queue is successfully created.
Later, someone manually adds an **EC2 instance** in the same environment. When you re-run the pipeline or execute a **Detect Drift** operation, Harness identifies that the EC2 instance is not in your code or state and flags it as drift.

As an operator, you have a few options:
- **Import** the EC2 instance into your state file if you want to manage it as code.
- **Delete** it if it was created unintentionally.
- **Ignore** it if it’s a known but unmanaged resource.

If you want to reconcile the state without applying pending configuration changes, use a `plan-refresh-only` step.
:::

---
## Detect drift
To detect drift, follow these steps:
1. Create a Pipeline with an Infrastructure as Code Management stage, as described [here](/docs/infra-as-code-management/workspaces/provision-workspace).
2. Choose a Workspace or set it as a runtime input.
3. Select **Detect Drift** when prompted to choose an operation.

![Resources](static/drift-pipeline.png)

4. To schedule drift detection regularly, define a [cron trigger for the pipeline](/docs/platform/triggers/schedule-pipelines-using-cron-triggers/).

---
## Review drift details
When drift is detected, the pipeline fails and highlights the affected resources. Check out how to review drift details in your pipeline and workspace.

<Tabs>
<TabItem value="pipeline" label="Pipeline">
Go to the **Resources** tab. The **Drift Changes** section outlines all resources where drift was detected. Click a resource to see which attributes have changed.

![Resources](static/drift-pipeline-detected.png)

</TabItem>
<TabItem value="workspace" label="Workspace">
Drifted resources are also visible in the Workspace view. Under the **Resources** tab, look for resources marked as **Drifted**.

![Resources](static/ws-drift.png)

Click a resource to view its drifted attributes.

![Resources](static/drift-attributes.png)
</TabItem>
<TabItem value="yaml" label="YAML">
You can also run drift detection by configuring a plugin step in your pipeline YAML. This is useful when you're customizing pipeline execution outside the UI.

```yaml
- step:
    name: Drift or Refresh
    identifier: drift_or_refresh
    type: Plugin
    spec:
      connectorRef: <your_tofu_or_terraform_image_connector>
      image: plugins/harness-tofu # or plugins/harness-terraform
      settings:
        command: detect-drift # plan-refresh-only
      environmentVariables:
        PLUGIN_WORKSPACE: <your_workspace_id>
```
</TabItem>
</Tabs>

---
## Detect drift during provisioning
Harness IaCM can also detect drift during provisioning. If a provisioning pipeline identifies drift, that information is displayed in the **Approval** step and the **Resources** tab.

![Resources](static/provision-drift.png)

---
## Resolve drift
To promote best practices, always treat your IaC repository as the source of truth. If drift occurs, consider the following options:

- **Reconcile the infrastructure** using a provision pipeline to bring resources back in sync.
- **Use `plan-refresh-only`** to refresh the state without applying new configuration changes.
- **Manually import or delete** the drifted resources depending on your intent.

:::tip When to use `plan-refresh-only`
Use `plan-refresh-only` if there are drifted resources in your environment, but your code also has unreviewed changes. This ensures only the state is updated to match the real environment, without applying unrelated code updates.
:::

### Resolve drift using `plan-refresh-only`
This pipeline shows how to handle drift without applying pending changes:

![plan-refresh-only](static/plan-refresh-only.png)