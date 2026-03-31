---
title: IaCM Security
description: Learn about security measures applied to Harness IaCM module.
sidebar_position: 90
sidebar_label: Security
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import InteractiveIaCMDiagram from "./components/interactive-svg";

Harness IaCM integrates security measures to safeguard your infrastructure state. It uses the Harness Platform’s **authentication**, **[RBAC](/docs/platform/role-based-access-control/rbac-in-harness)**, **resource groups**, **pipelines**, **[Audit Trail](/docs/platform/governance/audit-trail)**, **connectors**, **secrets**, and licensing, consistent with the practices summarized on **[Harness Trust & Security](https://www.harness.io/security)**. For Infrastructure as Code Management (IaCM), Harness provides the following:

- Data encryption in transit using TLS 1.3.
- Data encryption at rest with AES 256.
- Regular security testing and vulnerability scanning.
- Logical and physical data segmentation.

## Addressing common security concerns

Harness protects customer infrastructure and data through access controls, encryption (TLS 1.3 in transit and AES-256 at rest where applicable), and separation of customer data. You can integrate your identity provider, constrain access with RBAC, and use **[IP allowlisting and delegate networking](/docs/platform/references/allowlist-harness-domains-and-ips)** so outbound and inbound patterns match your enterprise standards. For broader connectivity options (including private access patterns), see **[Private network connectivity](/docs/platform/references/private-network-connectivity)**.

During planning and execution, Harness can enforce **policy** on infrastructure changes (for example via **[Open Policy Agent (OPA)](/docs/infra-as-code-management/policies-governance/opa-workspace)** and **[plan and cost policies](/docs/infra-as-code-management/policies-governance/terraform-plan-cost-policy)**) and maintain copies of **plan** and **state** for visibility and controls as described below.

For **cost estimation**, Harness can use **[Infracost](/docs/infra-as-code-management/workspaces/cost-estimation)** when the feature is enabled on the workspace; supported behavior and licensing follow that topic and **[What’s supported in IaCM](/docs/infra-as-code-management/whats-supported)**.

**[Drift detection](/docs/infra-as-code-management/pipelines/operations/drift-detection)** and **[IaC security scanning (STO)](/docs/infra-as-code-management/whats-supported#security-scanners)** are complementary capabilities for ongoing posture and code review — they extend the core plan/apply flow rather than replacing it.

Platform **[AI and automation](/docs/platform/harness-ai/harness-agents)** features evolve on their own roadmap; they use the same RBAC and pipeline audit patterns as other Harness execution. For current IaCM-specific integrations (for example **MCP**), see **[What’s supported in IaCM](/docs/infra-as-code-management/whats-supported)**.

---

## Security components

The operational model is comprised of three components:

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
### Secure pipeline execution
</div>

IaCM runs OpenTofu or Terraform commands within a pipeline environment, handling setup, variable and secret resolution, execution preparation, and data handling according to Harness Platform security protocols.

1. **Workspace and configuration setup:** Harness IaCM retrieves the workspace configuration and associated files, including dependent IaC modules specified in your settings.
2. **Variable and secret integration:** Variables and secrets defined in the workspace (and via **[connectors and secret managers](/docs/category/secrets-management)**) are collected and resolved before execution.
3. **Execution preparation:** Configuration files and dependent modules are brought into the pipeline execution environment. Secrets are available only as needed for your IaC operations.
4. **Data management:** Read-only copies of artifacts such as **plan** and **state** files are made available to Harness Cloud so IaCM features (history, UI, policy, and cost steps where enabled) can operate.

:::tip External to pipelines
IaCM runs OpenTofu/Terraform commands in the pipeline execution environment. When you use an **external** remote backend, IaCM accesses it with the credentials supplied for that run (for example connector or workspace configuration).
:::

</TabItem>
<TabItem value="Cloud-Based Security Measures">
<div style={{ display: "none" }}>
### Cloud-based security measures
</div>

Harness Cloud maintains summary data for workspaces and executions in a secure data store. **State** and **plan** files for IaCM are stored in **Google Cloud Storage (GCS)** with per-customer separation (for example **one bucket per customer account**) and are accessed over secure channels for product features that depend on them.

</TabItem>
</Tabs>

---

## Network egress and allowlisting

IaCM execution typically runs on infrastructure you control (for example a **[Kubernetes delegate](/docs/platform/delegates/install-delegates/overview)**). Plan your network so that:

- Delegates meet **[delegate network requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements#network-requirements)** (outbound to Harness Manager, and paths to your Git providers, cloud APIs, and remote state endpoints as configured).
- Any **[IP allowlisting](/docs/platform/references/allowlist-harness-domains-and-ips)** or **[private connectivity](/docs/platform/references/private-network-connectivity)** policies you use align with how those delegates reach Harness and your internal systems.

Contact **[Harness Support](mailto:support@harness.io)** for region- and product-specific allowlist guidance if you are locking down egress or ingress.

---

## Audit trail, retention, and export

Harness **[Audit Trail](/docs/platform/governance/audit-trail)** records many configuration and lifecycle actions (who did what, when, and on which resource). The UI supports filtered views and date ranges; audit data is retained **up to two years** in Harness. To keep logs longer or feed a SIEM, use **[audit log streaming](/docs/platform/governance/audit-trail/audit-streaming)**.

Pipeline execution events are optional: enable **Pipeline Execution Audit Events** at account scope if you need start/end and stage events in the audit trail (see the Audit Trail overview). IaCM workspace and module changes appear under the **Infrastructure as Code Manager** category in audit documentation.

---

## Operational model

In infrastructure management, security depends on controlling who can change state, what runs in the pipeline, and how plans and policies are evaluated before apply.

The diagram below illustrates the high-level **operational security flow**. Harness continues to add capabilities (additional scanners, drift workflows, policies, and integrations); treat this as the **core** plan/apply path — refer to **[Get started with IaCM](/docs/infra-as-code-management/get-started)** and **[What’s supported](/docs/infra-as-code-management/whats-supported)** for the latest feature set.

1. **Run the `plan` command:** The plan runs in your pipeline environment and compares proposed changes with state from your configured backend.
2. **Cost estimation and policy checks:** When enabled, plan output can be used for **[cost estimation](/docs/infra-as-code-management/workspaces/cost-estimation)** (Infracost-based) and evaluated against **[OPA policies](/docs/infra-as-code-management/policies-governance/opa-workspace)** and **[plan / cost policies](/docs/infra-as-code-management/policies-governance/terraform-plan-cost-policy)** on the plan entity.
3. **Plan storage:** A copy of the plan can be stored in Harness Cloud for pipeline history and tracking.
4. **Confirm apply/destroy parameters:** Before mutating infrastructure, IaCM validates the proposed operation against the expected backend state.
5. **Apply/destroy execution:** After checks pass, changes run in the pipeline environment; policies and approvals you configure still apply.
6. **State storage and historical tracking:** State is maintained per your backend; Harness also retains copies as described in **Cloud-based security measures** for product features.

![IaCM Security Diagram: Flow from pipeline execution, through state storage, to Harness Cloud security](/img/iacm-security.svg)
