---
title: Enforce OPA Policies on Ansible Pipelines
description: Use Harness Policy As Code to govern Ansible pipelines, including required approval steps, approved inventories, and mandatory timeouts.
sidebar_label: OPA Policies
keywords:
  - ansible
  - opa
  - policy as code
  - governance
  - rego
  - IaCM
tags:
  - iacm
  - ansible
  - configuration
sidebar_position: 65
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness Policy As Code evaluates OPA policies, written in Rego, against your pipeline configuration when a pipeline is saved or run. Because Ansible runs from IaCM pipelines, you can use policies to govern how Ansible executes: require an approval before any playbook runs, restrict which inventories a pipeline may target, or enforce timeouts on every Ansible step.

---

## What will you learn?

- **Policy model:** How Harness OPA policies apply to the pipelines that run Ansible.
- **Example policies:** Rego that requires approvals, restricts inventories, and enforces timeouts on the `IACMAnsiblePlugin` step.
- **Enforcement:** Attach a policy set to pipelines so violations warn or block on save or run.

---

## Before you begin

- **An Ansible pipeline:** A pipeline with an IACM stage that runs the `IACMAnsiblePlugin` step. Go to [Get started with Ansible](/docs/infra-as-code-management/configuration-management/ansible/get-started#step-4-integrate-ansible-with-a-pipeline) to create one.
- **Policy As Code concepts:** Familiarity with policies, policy sets, and Rego. Go to [Harness Policy As Code overview](/docs/platform/governance/policy-as-code/harness-governance-overview) to review the model.
- **Governance permissions:** You need **View**, **Create/Edit** permissions for Policies and Policy Sets. To get these, an administrator must assign you a role that includes them. See [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness).

---

### How policies apply to Ansible pipelines

Pipeline policies evaluate the pipeline definition as JSON. The Ansible-relevant fields sit on the IACM stage: `stage.spec.playbooks` and `stage.spec.inventories` name what runs and where, and `stage.spec.execution.steps` contains the `IACMAnsiblePlugin` step with its `command` and `timeout`. Your Rego rules match on those fields and return `deny` messages when the pipeline violates them.

Policies attach to the **Pipeline** entity through a policy set, with evaluation **On Save**, **On Run**, or both. On Save blocks non-compliant pipelines from being stored; On Run blocks executions, which also covers pipelines that predate the policy.

---

### Write Ansible pipeline policies

Create policies in the Harness UI under your project, organization, or account governance settings. Go to [Harness Policy As Code overview](/docs/platform/governance/policy-as-code/harness-governance-overview) for the policy creation workflow. The following examples cover common Ansible governance rules.

#### Require an approval before Ansible runs

This policy denies any IACM stage that runs the Ansible step without a preceding Harness approval step, so configuration changes to hosts always pass a human gate:

```rego
package pipeline

deny[msg] {
    stage := input.pipeline.stages[_].stage
    stage.type == "IACM"
    step := stage.spec.execution.steps[_].step
    step.type == "IACMAnsiblePlugin"
    not stage_has_approval(stage)
    msg := sprintf("IACM stage '%s' runs Ansible without an approval step", [stage.name])
}

stage_has_approval(stage) {
    step := stage.spec.execution.steps[_].step
    step.type == "HarnessApproval"
}
```

#### Restrict pipelines to approved inventories

This policy keeps playbooks from targeting inventories outside an approved list, for example to stop a test pipeline from running against production hosts:

```rego
package pipeline

allowed_inventories := {"web_fleet", "staging_inventory"}

deny[msg] {
    stage := input.pipeline.stages[_].stage
    stage.type == "IACM"
    inventory := stage.spec.inventories[_]
    not allowed_inventories[inventory]
    msg := sprintf("Inventory '%s' is not on the approved list for Ansible pipelines", [inventory])
}
```

#### Enforce a timeout on Ansible steps

This policy denies Ansible steps that do not set an explicit timeout, so a hung playbook cannot hold pipeline infrastructure indefinitely:

```rego
package pipeline

deny[msg] {
    stage := input.pipeline.stages[_].stage
    stage.type == "IACM"
    step := stage.spec.execution.steps[_].step
    step.type == "IACMAnsiblePlugin"
    not step.spec.timeout
    msg := sprintf("Ansible step '%s' must set an explicit timeout", [step.name])
}
```

---

### Attach and enforce the policy set

To enforce the policies, do the following:

1. Create a policy set scoped to the **Pipeline** entity.
2. Add your Ansible policies to the set.
3. Set the evaluation event to **On Run** (and optionally **On Save**).
4. Choose the severity per policy: **Warn & continue** surfaces violations without blocking; **Error and exit** blocks the save or execution.

After the set is enforced, a violating pipeline shows the policy evaluation failure with each deny message, and On Run violations stop the execution before the Ansible step starts.

---

## Troubleshooting

<Troubleshoot
  issue="OPA policy set does not block a non-compliant Ansible pipeline in Harness IaCM"
  mode="general"
  fallback="Confirm the policy set is enforced, scoped to the Pipeline entity, and set to evaluate On Run. Warn & continue severity reports violations without blocking; use Error and exit to block."
/>

<Troubleshoot
  issue="Rego policy for Harness pipeline does not match the IACMAnsiblePlugin step"
  mode="general"
  fallback="Policies evaluate the pipeline YAML as JSON. Check the path input.pipeline.stages[_].stage.spec.execution.steps[_].step.type and confirm the stage type is IACM. Test the policy against your pipeline JSON in the policy editor's testing terminal."
/>

---

## Next steps

Your Ansible pipelines now run under the same governance controls as the rest of your Harness delivery.

- Go to [OPA policies for workspaces](/docs/infra-as-code-management/policies-governance/opa-workspace) to govern the provisioning side of IaCM.
- Go to [Harness Policy As Code overview](/docs/platform/governance/policy-as-code/harness-governance-overview) to manage policy sets across scopes.
- Go to [Get started with Ansible](/docs/infra-as-code-management/configuration-management/ansible/get-started) to review the pipeline the policies evaluate.
