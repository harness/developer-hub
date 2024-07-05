---
title: IaCM Security
description: Learn about security measures applied to Harness IaCM module.
sidebar_position: 60
sidebar_label: Security
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import InteractiveIaCMDiagram from "./components/interactive-svg";

Harness IaCM integrates robust security measures to safeguard your infrastructure state. It leverages the Harness Platform's functionalities, including Authentication, Role-Based Access Control (RBAC), Resource Groups, Pipelines, Audit Trail, Connectors, Secrets, and Licensing. These measures adhere to the stringent security protocols [outlined in the Security section](https://www.harness.io/security). For Infrastructure as Code Management (IaCM), Harness IaCM ensures:

- Data encryption in transit using TLS 1.3.
- Data encryption at rest with AES 256.
- Regular security testing and vulnerability scanning.
- Logical and physical data segmentation.

### Common Security Concerns

Harness protects customer infrastructure and data through rigorous security measures. Access to systems is restricted to authorized employees using secure connections, with all activities logged and reviewed regularly. State files and sensitive information are safeguarded with strong encryption (TLS 1.3 and AES 256) and controlled access. Customers can further enhance security by integrating their identity provider and setting IP allowlists.

During the planning and execution phases, Harness ensures compliance by checking changes against organizational policies and detecting any tampering with state files before execution. These measures maintain a secure and compliant environment for managing infrastructure changes.

--- 
The operational model flow is comprised of three components:
<Tabs>
<TabItem value="Defined backend">
All executed commands honor your defined backend, which determines where your infrastructure state is stored and how terraform and tofu operations such as `apply` or `destroy` are executed.

:::note default backend
If no plan file is specified, IaCM will apply its own backend implicitly.
:::

</TabItem>
<TabItem value="Pipeline Execution Environment">
In your pipeline environment, IaCM ensures that all Terraform or Tofu commands operate within a controlled and secure framework, handling:

	1. **Workspace and Configuration Setup:**
            - Harness IaCM retrieves the workspace configuration and associated files, including dependent IaC modules specified in your settings.
	2.  **Variable and Secret Integration:**
	     - Variables and secret values defined in your workspace are collected and resolved, adhering to Harness Platform security protocols.
	3. **Execution Preparation:**
	    - All relevant configuration files and dependent modules are cloned into the pipeline environment. Secrets are integrated to facilitate interaction with your IaC-managed resources.
	    - IaC applications are pulled to your environment just in time for execution, ensuring that the most up-to-date configurations are applied.
	4. **Data Management:**
	     - A read-only copy of essential files such as the plan and state files, is uploaded to Harness Cloud to enable IaCM functionalities.

:::tip External to Pipelines
IaCM runs Terraform/Tofu commands exclusively within the pipeline environment. When using an external backend, IaCM accesses it solely with the credentials provided within the pipeline.
:::
</TabItem>
<TabItem value="Harness Cloud: IaCM">
IaCM/Harness Cloud upholds the same rigorous security standards as the rest of the Harness Platform, as listed above. The `plan` step executes against your defined backend to estimate costs and validate your plan against policies. Once validated, the plan is securely stored in Harness Cloud.

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
        body: "The `plan` command is executed as a step in your pipeline environment, comparing your defined backend state with your proposed infrastructure changes."
        },
        "2": {
        title: "Step 2 & 3: Cost estimation and OPA policy checks",
        body: "As part of the `plan` step, a copy of the plan is passed to Harness Cloud to provide cost estimation data and also checked again your policies to enforce implicit policies set on the Plan File entity. Go to [add OPA policies](https://developer.harness.io/docs/infra-as-code-management/workspaces/project-setup/opa-workspace) for more information on configuring policies."
        },
        "4": {
        title: "Step 4: Plan is stored in IaCM/Harness Cloud",
        body: "IaCM stores a copy of the plan to provide pipeline & historical information on what has changed since the previous execution. When the apply/destroy command is executed at step 7, your infrastructure state will be stored here, adhering to Harness security protocols. "
        },
        "5": {
        title: "Step 5: Confirm apply/destroy parameters",
        body: "This step involves comparing your defined backend state with your proposed infrastructure updates."
        },
        "6": {
        title: "Step 6 & 7: Applying your proposed infrastructure changes",
        body: "During the apply/destroy step, IaCM confirms that your proposed infrastructure changes adhere to your set policies, once confirm your changes are applied and your new state is store in IaCM/Harness Cloud."
        },
    }}
groupDescriptions={{
        1: ['1', 'defined-backend', 'plan'],
        2: ['2', '3', 'plan', 'cost', 'policies'],
        3: ['2', '3', 'plan', 'cost', 'policies'],
        4: ['4', 'plan', 'iacm_stored_plan'],
        5: ['5', 'defined-backend', 'apply_destroy'],
        6: ['6', '7', 'apply_destroy', 'policies', 'iacm_stored_plan'],
    }}
startingPoint="1"
groupOnly="true"/>
</TabItem>
<TabItem value="Operational model flow steps">
  1. Plan command honors the defined backend & operates with that alone.
  2. A copy of the plan is passed to provide cost estimation data.
  3. A copy of the plan is passed to enforce implicit policies set on the Plan File entity.
  4. IaCM stores a copy of the plan to provide pipeline & historical information on what has changed.
  5. Apply/Destroy command honours the defined backed & operates with that alone.
  6. A copy of the state is passed to enforce implicit policies set on the State File entity.
  7. IaCM stores a copy of the state file to ensure historic state tracking, resource views etc in UI.
  </TabItem>
</Tabs>

