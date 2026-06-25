---
title: IaCM Security
description: Learn about security measures applied to Harness IaCM module.
sidebar_position: 90
sidebar_label: Security
keywords:
  - iacm security
  - infrastructure as code
  - encryption
  - rbac
  - audit trail
  - state storage
  - compliance
  - policy enforcement
tags: [iacm, security, encryption, compliance]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import InteractiveIaCMDiagram from "./components/interactive-svg";

Harness IaCM integrates security measures to safeguard your infrastructure state. It uses the Harness Platform’s **authentication**, **role-based access control (RBAC)**, **resource groups**, **pipelines**, **[Audit Trail](/docs/platform/governance/audit-trail)**, **connectors**, **secrets**, and licensing. For Infrastructure as Code Management (IaCM), Harness provides data encryption in transit (TLS 1.3) and at rest (AES 256), regular security testing and vulnerability scanning, and logical and physical data segmentation to isolate customer data.

The security model centers on three components: state storage (where your infrastructure state lives), pipeline execution (where OpenTofu or Terraform commands run), and cloud-based security measures (where Harness maintains copies of plans and state for visibility). Together, these components ensure that only authorized users can change infrastructure, secrets remain protected, and all actions are audited. Go to [Harness Trust & Security](https://www.harness.io/security) to review Harness-wide security practices.

---

## What you will learn

- **Security measures in IaCM:** The encryption, RBAC, and audit trail features that protect your infrastructure state and pipeline operations.
- **Three security components:** How state storage, pipeline execution, and Harness Cloud security measures work together to control access and maintain visibility.
- **Policy enforcement and cost governance:** How to enable OPA policies, plan/cost policies, and Infracost integration to prevent misconfigurations and enforce standards.
- **Network and delegate security:** The network requirements and allowlisting patterns for secure delegate deployment.
- **Data retention and audit streaming:** How long Harness retains audit logs and how to stream them to external SIEM systems for long-term storage.

---

## Security features and integrations

### Access controls and encryption

Harness protects customer infrastructure and data through access controls, encryption, and separation of customer data. You can integrate your identity provider, constrain access with role-based access control (RBAC), and use IP allowlisting and delegate networking so outbound and inbound patterns match your enterprise standards. Encryption is applied consistently: TLS 1.3 in transit for all network traffic between components, and AES-256 at rest for state and plan copies stored in Harness Cloud (Google Cloud Storage). Secrets (provider credentials, API keys) are never stored in Harness Cloud copies; they remain in your configured secret manager and are resolved only during pipeline execution.

Go to [IP allowlisting and delegate networking](/docs/platform/references/allowlist-harness-domains-and-ips) to configure network security patterns, and [Private network connectivity](/docs/platform/references/private-network-connectivity) to review private access options (VPN, PrivateLink, etc.).

### Policy enforcement and cost governance

During planning and execution, Harness can enforce policy on infrastructure changes and estimate costs before applying. Configure these features at the workspace or pipeline level:

- **[Open Policy Agent (OPA) policies](/docs/infra-as-code-management/policies-governance/opa-workspace):** Evaluate workspace configurations, Terraform plans, and state files against Rego policies. Policies can enforce version requirements, connector restrictions, resource tagging, and other governance rules. Add a policy step to your pipeline to block deployments that violate policy.
- **[Plan and cost policies](/docs/infra-as-code-management/policies-governance/terraform-plan-cost-policy):** Evaluate Terraform plan output (resource changes, cost impact) and fail the pipeline if thresholds are exceeded.
- **[Cost estimation (Infracost)](/docs/infra-as-code-management/workspaces/cost-estimation):** Estimate infrastructure costs for plan changes. Enable this feature per workspace; supported behavior and licensing are described in [What’s supported in IaCM](/docs/infra-as-code-management/whats-supported).

When a policy check fails, the pipeline stops and displays the policy violation in the execution logs. Manual approval can be required to override policy failures if configured in the pipeline.

### Ongoing security posture

[Drift detection](/docs/infra-as-code-management/pipelines/operations-overview) and IaC security scanning extend the core plan/apply flow. Drift detection compares live infrastructure state against your Terraform configuration to identify manual changes. IaC security scanning uses Security Testing Orchestration (STO) to scan Terraform code for misconfigurations and vulnerabilities before deployment. Go to [What’s supported in IaCM](/docs/infra-as-code-management/whats-supported#security-scanners) to review supported STO scanners.

Platform AI and automation features (such as [Harness AI agents](/docs/platform/harness-ai/harness-agents)) use the same RBAC and pipeline audit patterns as other Harness execution. For current IaCM-specific integrations (such as the [MCP Server](/docs/infra-as-code-management/platform-integrations/iacm-mcp)), go to [What’s supported in IaCM](/docs/infra-as-code-management/whats-supported) to review the latest capabilities.

---

## Security components

The operational security model is comprised of three components that work together: state storage (where your infrastructure state lives), pipeline execution (where commands run), and cloud-based security measures (where Harness maintains copies for visibility). Each component has distinct security responsibilities and data flows.

<Tabs>
<TabItem value="state" label="Manage state storage" default>

All executed commands follow your defined backend, dictating where your infrastructure state is stored and managing OpenTofu or Terraform operations like `apply` and `destroy`. You control the backend configuration (S3, GCS, Azure Blob, Terraform Cloud, etc.), which determines where the authoritative state lives. IaCM reads from and writes to this backend during plan and apply operations.

:::note Default backend
When no backend block is configured in your OpenTofu or Terraform code, IaCM automatically uses Harness-managed state storage. To use an external remote backend (for example S3, GCS, or Azure Blob Storage) instead, add a `backend` block in your repository. Go to [State migration](/docs/infra-as-code-management/remote-backends/state-migration) and [Use existing remote state](/docs/infra-as-code-management/remote-backends/use-backends) to migrate state or connect an existing backend.
:::

</TabItem>
<TabItem value="pipeline" label="Secure pipeline execution">

IaCM runs OpenTofu or Terraform commands within a pipeline environment, handling setup, variable and secret resolution, execution preparation, and data handling according to Harness Platform security protocols.

1. **Workspace and configuration setup:** Harness IaCM retrieves the workspace configuration and associated files, including dependent IaC modules specified in your settings.
2. **Variable and secret integration:** Variables and secrets defined in the workspace (and via [connectors](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables) and [secret managers](/docs/category/secrets-management)) are collected and resolved before execution.
3. **Execution preparation:** Configuration files and dependent modules are brought into the pipeline execution environment. Secrets are available only as needed for your IaC operations and are never persisted in logs or state copies.
4. **Data management:** Read-only copies of artifacts such as plan and state files are sent to Harness Cloud so IaCM features (history, UI, policy evaluation, cost estimation) can operate.

:::tip External backends
When you use an external remote backend (S3, GCS, etc.), IaCM accesses it with the credentials supplied in your workspace or connector configuration. The external backend remains the authoritative source; Harness Cloud receives a read-only copy for product features only.
:::

</TabItem>
<TabItem value="cloud" label="Cloud-based security measures">

Harness Cloud maintains summary data for workspaces and executions in a secure data store. State and plan files for IaCM are stored in Google Cloud Storage (GCS) with per-customer separation (one bucket per customer account, enforced by IAM policies) and are accessed over secure channels (TLS 1.3) for product features that depend on them. All data at rest in GCS is encrypted with AES-256. Customers cannot access these buckets directly; data is surfaced through the Harness UI and APIs only.

Harness-managed retention: plan and state copies are retained for the lifetime of the workspace (they are deleted when the workspace is deleted). Secrets are never stored in these copies; only the Terraform state structure and resource attributes are retained.

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

Harness [Audit Trail](/docs/platform/governance/audit-trail) records many configuration and lifecycle actions (who did what, when, and on which resource). The UI supports filtered views and date ranges; audit data is retained up to two years in Harness (the retention period is not configurable). After two years, audit logs are deleted. To keep logs longer or feed a Security Information and Event Management (SIEM) system, use [audit log streaming](/docs/platform/governance/audit-trail/audit-streaming) to send audit events to an external destination (S3, Splunk, Datadog, etc.) in real time.

Pipeline execution events are optional: enable **Pipeline Execution Audit Events** at account scope if you need start/end and stage events in the audit trail (see the Audit Trail overview). IaCM workspace and module changes appear under the **Infrastructure as Code Manager** category in audit documentation. Policy evaluation results (pass/fail) are logged in pipeline execution events if Pipeline Execution Audit Events is enabled.

---

## Security operational flow

In infrastructure management, security depends on controlling who can change state, what runs in the pipeline, and how plans and policies are evaluated before apply. The operational flow below shows how the three security components (state storage, pipeline execution, cloud security) interact during a typical plan/apply cycle.

The diagram below illustrates the core plan/apply security flow. Harness continues to add capabilities (additional scanners, drift workflows, policies, and integrations). Go to [Get started with IaCM](/docs/infra-as-code-management/get-started) to understand the full workflow, and [What’s supported](/docs/infra-as-code-management/whats-supported) to review the latest security integrations.

1. **Run the `plan` command:** The plan runs in your pipeline environment (on a delegate) and compares proposed changes with state from your configured backend (S3, GCS, Terraform Cloud, etc.). The delegate must have network access to the backend and your cloud provider APIs.
2. **Cost estimation and policy checks:** When enabled, plan output is used for [cost estimation](/docs/infra-as-code-management/workspaces/cost-estimation) (Infracost-based) and evaluated against [OPA policies](/docs/infra-as-code-management/policies-governance/opa-workspace) and [plan/cost policies](/docs/infra-as-code-management/policies-governance/terraform-plan-cost-policy). If a policy check fails, the pipeline stops and displays the violation. Manual approval may be required to proceed if configured.
3. **Plan storage:** A read-only copy of the plan is sent to Harness Cloud (Google Cloud Storage) for pipeline history and UI display. Secrets in the plan are never stored; only resource attributes and proposed changes are retained.
4. **Confirm apply/destroy parameters:** Before mutating infrastructure, IaCM validates the proposed operation against the expected backend state to prevent state conflicts or out-of-band changes.
5. **Apply/destroy execution:** After checks pass, changes run in the pipeline environment. The delegate applies changes to your cloud provider using credentials from your connector or secret manager. Policies and manual approvals you configure still apply during this phase.
6. **State storage and historical tracking:** State is written to your configured backend (the authoritative source). Harness also retains a read-only copy in Harness Cloud (as described in Cloud-based security measures) for product features like drift detection and resource visualization.

**Failure scenarios:**
- If policy checks fail (step 2), the pipeline stops and no infrastructure changes are applied.
- If Harness Cloud cannot store a copy of state or plan (step 3 or 6), the pipeline still succeeds; only UI features like history and drift detection are affected.
- If the delegate cannot reach Harness Manager during execution, the pipeline fails immediately (no queuing or retries).

![IaCM Security Diagram: Flow from pipeline execution, through state storage, to Harness Cloud security](/img/iacm-security.svg)

---

## Related concepts

Now that you understand IaCM security measures and operational flow, explore related topics:

- [OPA workspace policies](/docs/infra-as-code-management/policies-governance/opa-workspace): Write and enforce Rego policies against workspace configurations, Terraform plans, and state files.
- [Terraform plan and cost policies](/docs/infra-as-code-management/policies-governance/terraform-plan-cost-policy): Evaluate plan output and block deployments that exceed cost or change thresholds.
- [Drift detection](/docs/infra-as-code-management/pipelines/operations-overview): Compare live infrastructure state against Terraform configuration to identify manual changes.
- [Cost estimation (Infracost)](/docs/infra-as-code-management/workspaces/cost-estimation): Estimate infrastructure costs for plan changes before applying.
- [What's supported in IaCM](/docs/infra-as-code-management/whats-supported): Review supported STO security scanners, MCP integrations, and other IaCM capabilities.
- [Harness RBAC overview](/docs/platform/role-based-access-control/rbac-in-harness): Understand how RBAC controls access to IaCM resources and pipelines.
- [Audit Trail](/docs/platform/governance/audit-trail): View audit logs for IaCM workspace and module changes.
- [Audit log streaming](/docs/platform/governance/audit-trail/audit-streaming): Stream audit events to external SIEM systems for long-term retention.
