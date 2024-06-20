---
title: IaCM Security
description: Learn about security measures applied to Harness IaCM module.
sidebar_position: 60
sidebar_label: Security
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import InteractiveIaCMDiagram from "./components/interactive-svg";

Harness IaCM provides built-in security measures to protect your infrastructure state by utilizing several functionalities of the Harness Platform, such as Auth, RBAC, Resource Groups, Pipeline, Audit Trail, Connectors, Secrets, and Licensing, and adheres to the same security protocols [detailed in the Security section](https://www.harness.io/security), including Infrastructure as Code Management specifics, like:

- Encrypting data in transit (TLS 1.3).
- Encrypting data at rest (AES 256).
- Regular security testing and scanning.
- Logical data segmentation and physical data segmentation.

--- 
The operational model flow is comprised of three components:
<Tabs>
<TabItem value="Defined backend">
All executed commands honor your defined backend, which determines where your infrastructure state is stored and how operations such as `apply` or `destroy` are executed. 

:::note default backend
When no plan file is defined the IaCM backend is used implicitly as though you were running Terraform in `local` mode. Go to [Terraform local backend](https://developer.hashicorp.com/terraform/language/settings/backends/local) for more information, or go to [initialize your remote backend](https://developer.harness.io/docs/infra-as-code-management/remote-backends/init-configuration) to define your backend.
:::

</TabItem>
<TabItem value="Pipeline Execution Environment">
In your pipeline environment, IaCM ensures that all Terraform or Tofu commands operate within a controlled and secure framework, handling:

	1.	**Workspace and Configuration Setup:**
	- Harness IaCM retrieves the workspace configuration and all associated files, including any dependent Infrastructure as Code (IaC) modules specified in your settings.
	2.	**Variable and Secret Integration:**
	- Variables and secret values defined in your workspace are collected and resolved, adhering to Harness Platform security protocols.
	3.	**Execution Preparation:**
	- All relevant configuration files and dependent modules are cloned into the pipeline environment. Secrets are integrated to facilitate interaction with your IaC-managed resources.
	- IaC applications are pulled to your environment just in time for execution, ensuring that the most up-to-date configurations are applied.
	4.	**Data Management:**
	- A read-only copy of essential files such as the plan and state files, is uploaded to Harness Cloud to enable IaCM functionalities.

:::tip External to Pipelines
IaCM only runs Terraform/Tofu commands within the pipeline environment. When using an external backend, IaCM accesses it only with the credentials provided within the pipeline.
:::
</TabItem>
<TabItem value="Harness Cloud: IaCM">
IaCM/Harness Cloud upholds the same rigorous security standards as the rest of the Harness Platform, as listed above. Executing the `plan` step runs against your specified backend to estimate change costs and verify your plan against policies. This validated plan is then securely stored in Harness Cloud.

For data storage, summary information about workspaces and executions is aggregated in a secure database for easy access. State and plan files are kept in Google Cloud Storage (GCS) and are available for real-time processing, with a single bucket per customer account.
</TabItem>
</Tabs>
---

## Operational model

The following diagram highlights the operational model flow and operations carried out at each stage.

:::tip Interactive Diagram
Start by clicking on the first step node for more details.
:::

<Tabs>
<TabItem value="Interactive diagram">
<InteractiveIaCMDiagram
svgPath="/iacm-security.svg"
descriptions={{
        "1": {
        title: "Step 1: Run the `plan` command against your defined backend",
        body: "The `plan` command is executed as a step in your pipeline environment, comp"
        },
        "2": {
        title: "Step 2 & 3: The plan",
        body: "Plan to cost"
        },
        "4": {
        title: "Plan to iacm",
        body: "Plan to iacm"
        },
        "5": {
        title: "defined backend to apply/destroy",
        body: "defined backend to apply/destroy"
        },
        "6": {
        title: "apply/destroy to policies",
        body: "apply/destroy to policies"
        },
        "7": {
        title: "apply/destroy to iacm",
        body: "apply/destroy to iacm"
        },
    }}
groupDescriptions={{
        1: ['1', 'defined-backend', 'plan'],
        2: ['2', '3', 'plan', 'cost', 'policies'],
        3: ['2', '3', 'plan', 'cost', 'policies'],
        4: ['4', 'plan', 'iacm_stored_plan'],
        5: ['5', 'defined-backend', 'apply_destroy'],
        6: ['6', 'apply_destroy', 'policies'],
        7: ['7', 'apply_destroy', 'iacm_stored_plan']
    }}
startingPoint="1"
groupOnly="true"/>
</TabItem>
<TabItem value="Operational model flow steps">
  1. Plan command honors the defined backend & operates with that alone.
  2. A copy of the plan is passed to provide cost estimation data.
  3. A copy of the plan is passed to enforce implicit policies set on the Plan File entity.
  4. IaCM stores a copy of the plan to provide pipeline & historical information on what has changed.
      - I wonder should we differentiate between the JSON plan object we store and the textual plan that TF prints in the logs?
  5. Apply/Destroy command honours the defined backed & operates with that alone.
  6. A copy of the state is passed to enforce implicit policies set on the State File entity.
  7. IaCM stores a copy of the state file to ensure historic state tracking, resource views etc in UI.
  </TabItem>
</Tabs>

### Common Security Concerns

Harness protects customer infrastructure and data through rigorous security measures. Access to systems is restricted to authorized employees using secure connections, with all activities logged and reviewed regularly. State files and sensitive information are safeguarded with strong encryption (TLS 1.3 and AES 256) and controlled access. Customers can further enhance security by integrating their identity provider and setting IP allowlists.

During both the planning and execution phases, Harness ensures compliance by checking changes against organizational policies and detecting any tampering with state files before execution. These measures maintain a secure and compliant environment for managing infrastructure changes.