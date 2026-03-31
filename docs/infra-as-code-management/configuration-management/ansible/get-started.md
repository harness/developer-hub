---
title: Get Started with Ansible
description: Create inventories and playbooks, then run Ansible from an IaCM pipeline using the IACMAnsiblePlugin step.
keywords:
  - ansible
  - configuration management
  - inventory
  - playbook
  - IaCM
  - IACMAnsiblePlugin
tags:
  - iacm
  - ansible
  - configuration
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

This guide walks you through registering an inventory, attaching a Git-backed playbook, and running both from a Harness IaCM pipeline using the **`IACMAnsiblePlugin`** step. For concepts and how Ansible fits next to Terraform or OpenTofu, read the [Ansible in IaCM overview](/docs/infra-as-code-management/configuration-management/ansible/overview) first.

### What will you learn?

- **Inventories:** Create and configure static, dynamic, or plugin-based inventories and use the Hosts, Variables, and Activity History tabs.
- **Playbooks:** Register a playbook from Git so Harness can fetch it at pipeline run time.
- **Pipelines:** Add the `IACMAnsiblePlugin` step to an **IACM** stage with your playbooks and inventories.

For step-by-step patterns such as web fleet configuration or rolling patches, continue to [Example Ansible use cases](/docs/infra-as-code-management/configuration-management/ansible/example-use-cases) after you finish this guide.

---

## Prerequisites

Before you begin, make sure the following are in place:

- **Harness account with IaCM enabled:** IaCM must be enabled on your account. If you don't see it in the navigation, see [Get started with IaCM](/docs/infra-as-code-management/get-started/) or contact your account administrator or [Harness Support](mailto:support@harness.io).
- **IaCM Pipeline permissions:** You need **View**, **Create/Edit**, and **Execute** permissions for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). To get these, an administrator must assign you a role that includes them. See [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles).
- **Git connector configured (for playbooks):** Your playbooks must be stored in a Git repository (Harness Code Repository or a third-party provider such as GitHub or GitLab). Ensure you have a [Harness connector](/docs/platform/connectors/code-repositories/connect-to-code-repo) with read access to that repository.
- **Kubernetes delegate (for pipeline execution):** The `IACMAnsiblePlugin` step runs inside a Kubernetes-based pipeline infrastructure. Ensure a Harness Kubernetes Delegate is installed and accessible. See [Install a Kubernetes Delegate](/docs/platform/delegates/install-delegates/overview/).
- **Ansible container (optional override):** The step uses a default image with Ansible. Supply your own image only if you need extra tools, collections, or baked-in credentials for your playbooks.
- **SSH access to target hosts:** Your delegate and Ansible container must be able to reach target hosts over SSH (or WinRM for Windows). Ensure security groups, firewall rules, and SSH keys are configured appropriately.

---

## Step 1: Create an Inventory

An inventory defines the machines and groups that your playbooks will target. Harness IaCM supports three inventory types: **Static** (manually specified hosts), **Dynamic** (hosts derived from various sources including Terraform/OpenTofu workspaces), and **Plugin** (hosts populated via native Ansible inventory plugins).

To create a new inventory, do the following:

1. In the Harness UI, navigate to the **IaCM** module.
2. In the left sidebar under **Configuration**, select **Inventories**.
3. Click **+ New Inventory**. The **Create an Inventory** dialog opens.
4. Enter a **Name** for your inventory. An Id is auto-generated.
5. Under **How do you want to set up the inventory?**, select one of the three types:
   - **Static** — Define a list of hosts manually.
   - **Dynamic** — Derive hosts dynamically from different sources (for example, a Terraform or OpenTofu workspace).
   - **Plugin** — Use Ansible inventory plugins to populate hosts.
6. Click **Save**.

After saving, you land directly on the inventory's **Hosts** tab.

:::tip
Choose **Dynamic** when your infrastructure is provisioned by Terraform or OpenTofu — Harness will automatically resolve hosts from workspace outputs, so you never need to manually update host lists as your infrastructure scales. Choose **Plugin** when you want to use an existing Ansible inventory plugin (for example, `aws_ec2` or `azure_rm`) that your team already maintains.
:::

---

## Step 2: Configure an Inventory

Once created, you configure your inventory using three tabs: **Hosts**, **Variables**, and **Activity History**.

### Add Groups and Hosts

The **Hosts** tab uses a two-column layout: groups appear in the left panel, and the hosts belonging to the selected group appear on the right. You can add groups and hosts in any order.

To add a group, do the following:

1. In the **Hosts** tab, click **+ New Group**. A **Group Configuration** panel slides in from the right.
2. Enter a **Group name**.
3. Optionally, select any existing hosts that belong to this group using the **Select hosts that belong to this group** search.
4. Click **Apply Changes**.

To add a host, do the following:

1. Click **+ New Host**. A **Host Configuration** panel slides in from the right.
2. Enter the **Host Address** (for example, `web1.example.com` or `10.0.1.25`).
3. Optionally, use **Select groups (optional)** to assign the host to one or more existing groups.
4. Click **Apply Changes**.

:::info
For **Static** inventories, you enter host addresses manually. For **Dynamic** inventories, hosts are populated automatically from linked sources. You can still add groups and variables manually for dynamic inventories. For **Plugin** inventories, host population is driven by the plugin configuration.
:::

**Static inventory example — hosts:**

```
web1.example.com
web2.example.com
db1.example.com
```

**Dynamic inventory example:**

When a dynamic inventory is linked to a Terraform or OpenTofu workspace, each provisioned resource is automatically populated as a host with variables drawn from your configuration. For example, EC2 instances might expose the following automatically:

| Variable | Example Value |
|---|---|
| `ansible_host` | `54.23.145.10` |
| `public_ip` | `54.23.145.10` |
| `instance_type` | `t3.medium` |
| `environment` | `prod` |
| `availability_zone` | `us-east-1a` |

These are immediately usable in your playbook tasks without any manual configuration.

### Filter Hosts in Dynamic Inventories

When using a dynamic inventory, you can filter which hosts are included based on attribute values. This is useful when you only want to target a subset of provisioned infrastructure — for example, only production web servers in a specific region.

From a host's **Configuration** tab, you can add filters with the following logic:

- **Contains:** Include hosts where a field contains a specific string.
- **Does not contain:** Exclude hosts where a field contains a specific string.

Some common filter examples are:

- **Environment filter:** Only include hosts where `Name` contains `prod` (for example, `prod-web1`, `prod-db1`).
- **Role filter:** Exclude hosts where the `tags` field does not contain `webserver`.
- **Region filter:** Only include hosts where `availability_zone` contains `us-east-1`.

### Add Variables

Variables let you pass configuration values into your playbooks at runtime. In the **Variables** tab, variables are added as inline rows. Do the following:

1. Click **+ Add Variable**. A new row appears.
2. In the first column, select the variable type from the dropdown: **string** (for plain-text values) or **secret** (for sensitive values like passwords and tokens).
3. Enter the variable **key** in the second column.
4. Enter the variable **value** in the third column.
5. Repeat for additional variables, then click **Save Changes** at the top of the page to persist them.

:::tip
Use **secret** type for anything sensitive — API keys, database passwords, private tokens. Harness stores these in its secrets engine and masks them in logs.
:::

Variables defined here are available directly in your playbook tasks. For example, if you define `db_port: 5432`, you can reference it in a playbook as `{{ db_port }}`.

### View Activity History

The **Activity History** tab shows a log of all past executions against this inventory — including which playbook ran, when it ran, and whether it succeeded or failed. Use this for auditing and debugging.

---

## Step 3: Create a Playbook

A playbook describes the automation tasks to apply to your inventory. Playbooks are stored in a Git repository and referenced by Harness at runtime.

To create a new playbook, do the following:

1. In the **IaCM** module, navigate to **Playbooks** in the left sidebar under **Configuration**.
2. Click **+ New Playbook**. The **Create Playbook** dialog opens.
3. Enter a **Name** for the playbook.
4. Under **Repository**, configure the Git source:
   - **Select Git Provider:** Choose **Harness Code Repository** or **Third-party Git provider**.
   - **Git Connector:** Select the connector with access to your repository.
   - **Git Fetch Type:** Select how to fetch the code — for example, **Latest from Branch**.
   - **Git Branch:** Select or type the branch name.
   - **Folder Path (optional):** Enter a path within the repository if your playbook is not in the root.
5. Click **Save**.

Your playbook is now registered in Harness and ready to be used in a pipeline.

:::info
Harness does not store or modify playbook content — it reads directly from your Git repository at pipeline execution time. This means your playbooks follow your standard Git workflows: pull requests, code review, and versioned releases.
:::

<Tabs>
  <TabItem value="playbook" label="Example playbook" default>

**Web server firewall configuration (`site.yml` excerpt):**

```yaml
- name: Configure web server infrastructure
  hosts: webservers
  become: yes
  tasks:
    - name: Ensure firewall is installed
      apt:
        name: ufw
        state: present

    - name: Allow HTTP traffic
      ufw:
        rule: allow
        port: '80'
        proto: tcp

    - name: Allow HTTPS traffic
      ufw:
        rule: allow
        port: '443'
        proto: tcp

    - name: Ensure firewall is enabled
      ufw:
        state: enabled
```

  </TabItem>
  <TabItem value="output" label="Expected output">

Sample Ansible log when run against the `webservers` group:

```
PLAY [Configure web server infrastructure] **************************************

TASK [Gathering Facts] **********************************************************
ok: [web1.example.com]

TASK [Ensure firewall is installed] *********************************************
changed: [web1.example.com]

TASK [Allow HTTP traffic] *******************************************************
changed: [web1.example.com]

TASK [Allow HTTPS traffic] ******************************************************
changed: [web1.example.com]

TASK [Ensure firewall is enabled] ***********************************************
ok: [web1.example.com]

PLAY RECAP **********************************************************************
web1.example.com : ok=5    changed=3    unreachable=0    failed=0
```

  </TabItem>
</Tabs>

---

## Step 4: Integrate Ansible with a Pipeline

Harness pipelines connect inventories and playbooks so you can run Ansible automation as part of your CI/CD workflows. The `IACMAnsiblePlugin` step handles execution — it runs your Ansible container, resolves the inventory, fetches the playbook from Git, and streams output to the pipeline logs.

To add Ansible to a pipeline stage, do the following:

1. Navigate to **Pipelines** in the left sidebar.
2. Open an existing pipeline or click **+ New Pipeline**.
3. Add a new stage of type **IACM**.
4. Under **Infrastructure**, select **Kubernetes Direct** and choose your delegate connector and namespace.
5. In the **Execution** tab, click **Add Step**.
6. Select the step type **IACMAnsiblePlugin**.
7. Configure the step with the following fields:
   - **Name:** A descriptive label (for example, `Run Ansible Configuration`).
   - **Command:** Set to `run`.
   - **Playbooks:** Select one or more registered playbooks to run.
   - **Inventories:** Select one or more registered inventories to target.

   Optional overrides (defaults apply if you leave them unchanged): container **image**, **image pull policy**, and **timeout**.
8. Click **Apply Changes**, then **Save** the pipeline.

**Full pipeline YAML example:**

```yaml
- stage:
    name: Ansible
    identifier: Ansible
    description: ""
    type: IACM
    spec:
      infrastructure:
        type: KubernetesDirect
        spec:
          connectorRef: account.k8connector
          namespace: harness-delegate
          volumes: []
          annotations: {}
          labels: {}
          automountServiceAccountToken: true
          nodeSelector: {}
          containerSecurityContext:
            capabilities:
              drop: []
              add: []
          os: Linux
          hostNames: []
      execution:
        steps:
          - step:
              type: IACMAnsiblePlugin
              name: Run
              identifier: Run
              spec:
                command: run
              playbooks:
                - test-playbook
              inventories:
                - test-inventory
    tags: {}
```

**How it works:**

The pipeline resolves the named inventory at runtime — building the host list from your static entries, workspace outputs, or plugin — and fetches the playbook from your Git repository at the specified branch and path. It runs the playbook inside the Ansible container via the delegate, streaming all output (task results and play recap) to the pipeline logs for full traceability.

:::tip
To run Ansible configuration immediately after a Terraform/OpenTofu apply, chain the `IACMAnsiblePlugin` step after your `IACMTerraformPlugin` step in the same pipeline stage. A dynamic inventory will automatically reflect the newly provisioned hosts.
:::

---

## Troubleshooting

<Troubleshoot
  issue="Hosts missing from dynamic inventory in Harness IaCM Ansible after workspace refresh"
  mode="docs"
  fallback="Verify your workspace has been refreshed and that your filter criteria match the attribute names and values in your Terraform/OpenTofu configuration outputs."
/>

<Troubleshoot
  issue="Ansible playbook variables not resolving — undefined variable error in Harness IaCM pipeline"
  mode="docs"
  fallback="Check the Variables tab on your inventory and confirm the variable key names exactly match what is referenced in your playbook (case-sensitive)."
/>

<Troubleshoot
  issue="Playbook not found error in Harness IaCM pipeline — repository or path incorrect"
  mode="docs"
  fallback="Verify that the Git connector, branch name, and folder path are correct in the playbook configuration. Confirm the connector has read access to that branch."
/>

<Troubleshoot
  issue="SSH connection failure when Ansible runs against target hosts in Harness IaCM pipeline"
  mode="general"
  fallback="Confirm SSH keys are correctly configured in the Ansible container image, that the delegate can reach the target host on port 22, and that security groups or firewall rules allow inbound SSH from the delegate's IP range."
/>

<Troubleshoot
  issue="IACMAnsiblePlugin step times out during large playbook execution in Harness IaCM"
  mode="docs"
  fallback="Increase the step timeout value (for example, from 30m to 1h or 2h) in the step configuration. For very large inventories, consider using Ansible's serial keyword to batch execution."
/>

---

## Next steps

You've connected Ansible inventories and playbooks to your Harness IaCM pipelines and can now automate configuration management as a first-class step in your CI/CD workflows.

- **[Example Ansible use cases](/docs/infra-as-code-management/configuration-management/ansible/example-use-cases)** — Apply these patterns to web fleets, rolling patches, multi-environment configs, Kubernetes worker bootstrap, and compliance hardening.
- [IaCM Best Practices](/docs/infra-as-code-management/iacm-best-practices/) — Learn recommended patterns for structuring workspaces, pipelines, and configuration at scale.
- [IaCM Module Registry](/docs/infra-as-code-management/registry/module-registry/module-registry-overview) — Package and reuse your Terraform and OpenTofu modules across projects.
- [Harness IaCM Upcoming Features](/docs/infra-as-code-management/whats-supported/) — See what's coming next for IaCM, including expanded Ansible support.
