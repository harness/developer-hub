---
title: Overview
description: Understand how Ansible fits into Harness IaCM, core concepts for newcomers, and how inventories, playbooks, and pipelines work together.
keywords:
  - ansible
  - configuration management
  - inventory
  - playbook
  - IaCM
  - infrastructure as code
tags:
  - iacm
  - ansible
  - configuration
sidebar_position: 10
redirect_from:
  - /docs/infra-as-code-management/configuration/ansible
  - /docs/infra-as-code-management/configuration-management/ansible
---

Infrastructure as Code Management (IaCM) in Harness is built around provisioning and ongoing configuration. **OpenTofu and Terraform** excel at declaring and creating infrastructure: networks, compute, storage, and the relationships between them. **Ansible** focuses on what happens *inside* that infrastructure once it exists: packages, services, configuration files, users, and security posture, usually over SSH or WinRM.

Harness treats Ansible as a peer to your provisioning workflow rather than a separate toolchain. Inventories describe *where* automation runs; playbooks describe *what* to do; pipelines orchestrate *when* it runs and tie outputs from provisioning to configuration. That division of labor is intentional: you keep declarative infra code in one place and imperative or idempotent configuration in another, while still shipping both through the same CI/CD controls you already use in Harness.

---

## Why Ansible belongs in your IaCM practice

Provisioning leaves you with empty or minimally configured resources. Configuration management closes that gap without ad hoc login sessions. When Terraform or OpenTofu finishes an apply, host IPs, instance IDs, and tags often exist only in state and outputs. Ansible consumes that information as inventory data so the next logical step—installing an agent, opening firewall ports, or laying down application config—can run automatically.

Running Ansible from Harness also gives you a single audit story: who ran what, against which inventory, from which Git revision of a playbook, with logs retained alongside your other pipeline stages.

---

## Concepts to understand

If you are new to Ansible, the ideas below build on each other. Later concepts assume you are comfortable with the earlier ones.

### 1. Hosts and groups

Ansible runs tasks **against hosts**. Hosts are often grouped (for example `webservers`, `databases`) so a playbook can target a logical tier instead of a long list of machine names. In Harness, you still think in terms of groups and hosts when you read playbook `hosts:` lines; the UI reflects that same model on the **Hosts** tab.

### 2. Inventories

An **inventory** is the set of hosts (and variables attached to them) that a playbook run will see. Harness supports **static** inventories (you define hosts explicitly), **dynamic** inventories (hosts are populated from sources such as a linked Terraform or OpenTofu workspace), and **plugin** inventories (Ansible’s inventory plugins supply hosts from cloud or custom APIs).

Static inventories are the simplest mental model. Dynamic inventories are the natural fit when Terraform or OpenTofu creates the resources you want to configure: host facts and outputs flow forward into Ansible without copy-paste. Plugin inventories help when your organization already standardizes on an Ansible plugin for a given cloud or directory.

### 3. Variables and secrets

**Variables** separate environment-specific values from playbook logic. You might use the same playbook in dev and prod while changing `db_host`, `log_level`, or feature flags. Harness lets you define inventory-scoped variables (including **secret** types) so sensitive values stay in the secrets layer and out of Git — see [Add Variables](/docs/infra-as-code-management/configuration-management/ansible/get-started#add-variables) and [Harness Secret Manager](/docs/platform/secrets/secrets-management/harness-secret-manager-overview). Playbooks reference them with Ansible’s usual templating (for example `{{ db_port }}`).

Variables tie inventories to playbooks: the playbook stays reusable; the inventory supplies the context.

### 4. Playbooks and Git

A **playbook** is a YAML file (or set of files) that declares ordered tasks and optional handlers. Harness does not store playbook content; it **reads from your Git repository** at execution time. That preserves pull-request review, branching, and tagging as your source of truth.

Understanding this boundary matters: Harness wires **which repo, branch, and path** to use; Ansible inside your pipeline image still executes the playbook you maintain in Git.

### 5. The Ansible pipeline step and runtime

The **`IACMAnsiblePlugin`** step runs Ansible inside a **Kubernetes** pipeline infrastructure you select ([Kubernetes delegate](/docs/platform/delegates/install-delegates/overview), namespace). The step uses a **container image** you provide that contains Ansible and any tooling your playbooks need (for example SSH client, collections). The delegate must be able to reach target hosts on the network paths your playbooks require (commonly SSH port 22).

So the chain is: **pipeline stage** → **plugin step** → **container** → **Ansible** → **inventory + playbook from Harness/Git** → **target hosts**.

### 6. Activity and traceability

Harness records **activity** against inventories (what ran, when, success or failure). That complements Ansible’s per-task output in logs and helps when you are correlating provisioning events with configuration runs.

---

## How the pieces fit together

A typical mental flow for someone new to Ansible in IaCM is:

1. **Provision** infrastructure with OpenTofu or Terraform (optionally in the same pipeline).
2. **Resolve targets** into an inventory—statically, dynamically from workspace outputs, or via a plugin.
3. **Attach context** with inventory variables and secrets your playbook expects.
4. **Point** a registered playbook at the right Git coordinates.
5. **Run** the `IACMAnsiblePlugin` step so configuration happens in the same controlled pipeline as provisioning.

Dynamic inventories shine when step 2 automatically picks up new hosts after step 1. Variables in step 3 keep step 4 DRY across environments.

---

## Best practices

- **Match inventory type to how hosts appear in real life.** If [OpenTofu or Terraform](/docs/infra-as-code-management/get-started/) creates them, a [dynamic inventory](/docs/infra-as-code-management/configuration-management/ansible/get-started#step-1-create-an-inventory) reduces drift between state and Ansible targets. If you have a fixed bastion or small static fleet, static inventories stay clear and simple.

- **Keep secrets out of Git.** Prefer **secret**-type [inventory variables](/docs/infra-as-code-management/configuration-management/ansible/get-started#add-variables) backed by [Harness Secret Manager](/docs/platform/secrets/secrets-management/harness-secret-manager-overview) (or another [supported secret manager](/docs/category/secrets-management)); use Ansible-native patterns that pull from secure stores your image supports only when that fits your standard. Avoid baking long-lived passwords into playbooks.

- **Prefer idempotent playbooks.** Tasks that declare desired state (packages present, file content, service running) are easier to rerun in pipelines than one-off scripts.

- **Align networking with the delegate.** The [Kubernetes delegate](/docs/platform/delegates/install-delegates/overview) that runs the Ansible image must reach targets; plan connectivity using [Delegate network requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements#network-requirements) (for example SSH from the delegate’s network to your hosts). For step configuration, see [Integrate Ansible with a pipeline](/docs/infra-as-code-management/configuration-management/ansible/get-started#step-4-integrate-ansible-with-a-pipeline).

- **Use the same Git discipline as application code.** Register playbooks with a [code repository connector](/docs/platform/connectors/code-repositories/connect-to-code-repo) and keep branch protections and reviews on playbook repos to reduce surprise changes during pipeline execution.

- **Size timeouts and batching for reality.** Long-running plays or huge host sets may need a higher **Timeout** on the `IACMAnsiblePlugin` step, see [Integrate Ansible with a pipeline](/docs/infra-as-code-management/configuration-management/ansible/get-started#step-4-integrate-ansible-with-a-pipeline), or Ansible strategies such as rolling batches (`serial`) for subsets of hosts.

---

## Next steps

When you are ready to work through the product steps in order, go to [Get started with Ansible in IaCM](/docs/infra-as-code-management/configuration-management/ansible/get-started).

For pattern-style inspiration after you have the basics, see [Example Ansible use cases](/docs/infra-as-code-management/configuration-management/ansible/example-use-cases).
