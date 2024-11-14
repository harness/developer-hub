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

### Address common security concerns

Harness protects customer infrastructure and data through rigorous security measures. Access to systems is restricted to authorized employees using secure connections, with all activities logged and reviewed regularly. State files and sensitive information are safeguarded with strong encryption (TLS 1.3 and AES 256) and controlled access. Customers can further enhance security by integrating their identity provider and setting IP allowlists.

During the planning and execution phases, Harness ensures compliance by checking changes against organizational policies and detecting any tampering with state files before execution. These measures maintain a secure and compliant environment for managing infrastructure changes.

--- 
## Security components
The operational model flow is comprised of three components:
<Tabs>
<TabItem value="Manage state storage">
<div style={{ display: "none" }}>
### Manage state storage
</div>
All executed commands follow your defined backend, dictating where your infrastructure state is stored and managing [OpenTofu](https://opentofu.org/) or Terraform operations like `apply` and `destroy`.

:::note default backend
If no plan file is specified, IaCM defaults to its own backend implicitly.
:::

</TabItem>
<TabItem value="Secure Pipeline Execution">
<div style={{ display: "none" }}>
### Secure Pipeline Execution
</div>
IaCM operates OpenTofu or Terraform commands within a secure pipeline environment, handling setup, variable and secret management, execution preparation, and data management to protect sensitive configurations.

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
IaCM runs OpenTofu/Terraform commands exclusively within the pipeline environment. When using an external backend, IaCM accesses it solely with the credentials provided within the pipeline.
:::
</TabItem>
<TabItem value="Cloud-Based Security Measures">
<div style={{ display: "none" }}>
### Cloud-Based Security Measures
</div>
IaCM/Harness Cloud upholds security standards, storing summary data for workspaces and executions in a secure database. All state and plan files are kept in Google Cloud Storage (GCS) and accessed securely for real-time processing.

For data storage, summary information about workspaces and executions is aggregated in a secure database for easy access. State and plan files are kept in Google Cloud Storage (GCS) and are available for real-time processing, with a single bucket per customer account.
</TabItem>
</Tabs>
---

## Operational Model
In infrastructure management, security is paramount, as misconfigurations or unauthorized access can lead to significant vulnerabilities. Harness IaCM’s security model ensures that your infrastructure state, configurations, and sensitive data are protected at every stage of deployment. By encrypting data, controlling access, and integrating compliance checks, IaCM provides a secure and compliant environment that minimizes risks and maximizes operational confidence. This model is essential for organizations looking to protect their infrastructure while maintaining efficiency in managing and deploying IaC workflows.

The following diagram below illustrates the IaCM operational security flow and the key operations performed at each stage:

1. **Run the `plan` Command:** The plan command executes in your pipeline environment, where it compares your defined backend state with proposed infrastructure changes.
2. **Cost Estimation and Policy Checks:** During the plan step, a copy of the plan is sent to Harness Cloud for cost estimation and is checked against your OPA policies to enforce implicit policies on the Plan File entity. [Learn more about configuring OPA policies](https://developer.harness.io/docs/infra-as-code-management/project-setup/opa-workspace/).
3. **Plan Storage:** A copy of the plan is stored in IaCM/Harness Cloud, providing pipeline and historical tracking of changes over time.
4. **Confirm Apply/Destroy Parameters:** Before executing changes, IaCM verifies your proposed updates by comparing them against the defined backend state.
5. **Apply/Destroy Execution:** When applying or destroying infrastructure changes, IaCM ensures adherence to defined policies. After verification, changes are applied, and a new state is stored securely in IaCM/Harness Cloud.
6. **State Storage and Historical Tracking:** A copy of the state file is stored securely in IaCM/Harness Cloud, enabling historical tracking and visibility within the UI, including resource views and past states.

![IaCM Security Diagram: Flow from pipeline execution, through state storage, to Harness Cloud security](/iacm-security.svg)