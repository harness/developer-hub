---
title: Use Variable Files with Ansible
description: Provide variable files to Ansible playbooks when running through Harness IaCM via repository conventions, plugin inventories, or dedicated variables repositories.
sidebar_label: Variable Files
keywords:
  - ansible
  - IaCM
  - variables
  - group_vars
  - host_vars
  - configuration management
  - ansible playbook
  - git clone
tags:
  - iacm
  - ansible
  - configuration
sidebar_position: 20
redirect_from:
  - /docs/infra-as-code-management/configuration-management/ansible/variable-files
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide explains how to provide variable files to Ansible playbooks when running through Harness Infrastructure as Code Management (IaCM). Variable files let you organize configuration by environment, host group, or role without embedding values directly in playbooks.

Harness IaCM supports three approaches for providing variable files to your Ansible playbooks. You can store variables alongside your playbook code, alongside dynamic inventory configurations, or maintain them in a dedicated repository. Each approach offers different benefits for organizing and managing your infrastructure configuration.

## What you will learn

- **Playbook repository variables:** Store variables alongside your playbook.
- **Plugin inventory repository variables:** Store variables alongside your dynamic inventory configuration.
- **Dedicated variables repository:** Clone a separate repository to make variables available to your playbook runs.

For core inventory and playbook setup, go to [Get started with Ansible in IaCM](/docs/infra-as-code-management/configuration-management/ansible/get-started) first.

---

## Before you begin

Before you begin, make sure the following are in place:

- **Harness IaCM access:** Infrastructure as Code Management must be available under **Infrastructure**. Go to [Get started with IaCM](/docs/infra-as-code-management/get-started) to configure access.

    :::info Contact Harness support:

    If IaCM does not appear, see [Get started with IaCM](/docs/infra-as-code-management/get-started) or contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Ansible inventory and playbook configured:** You need a registered inventory and playbook in Harness IaCM. Go to [create an inventory](/docs/infra-as-code-management/configuration-management/ansible/get-started#step-1-create-an-inventory) and [create a playbook](/docs/infra-as-code-management/configuration-management/ansible/get-started#step-3-create-a-playbook) to configure these.
- **Git connector configured:** Your playbooks and variable files must be stored in Git repositories accessible via a Harness connector. A connector is a Harness resource that authenticates and connects to external systems like GitHub, GitLab, or Bitbucket. You need **View** and **Create/Edit** permissions for [Connectors](/docs/platform/role-based-access-control/permissions-reference#connectors). To get these permissions, an administrator must assign you a role that includes them. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to understand the permissions model and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to configure role assignments. To create a connector, go to [Connect to a code repository](/docs/platform/connectors/code-repositories/connect-to-code-repo).
- **Pipeline permissions:** If you are using the dedicated variables repository approach with Git Clone steps, you need **View**, **Create/Edit**, and **Execute** permissions for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). An administrator must assign these via a role. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to configure these permissions.

---

## Choose your approach

Select the approach that best fits your repository organization and workflow:

- **Playbook repository variables:** Store variables alongside your playbook code when you have a single playbook or want to keep configuration colocated with automation logic.
- **Plugin inventory repository variables:** Store variables alongside dynamic inventory configurations (AWS EC2, Azure, GCP) when your infrastructure is defined by inventory plugins.
- **Dedicated variables repository:** Maintain variables in a separate repository when you share configuration across multiple playbooks or want separation of concerns between automation logic and configuration data.

You can combine multiple approaches in a single pipeline. Ansible will load variables from all sources according to its standard precedence rules.

---

### Playbook repository variables

When you configure an Ansible workspace with a playbook repository, Harness clones the entire repository at pipeline runtime. Any variable files in the repository are automatically available to Ansible without additional configuration.

Ansible automatically detects and loads variables from standard directory conventions (`group_vars/` and `host_vars/`) within the cloned repository. The `group_vars/` directory contains variables applied to all hosts in a group, while `host_vars/` contains variables applied to specific hosts.

**Example repository structure:**

```
my-playbook-repo/
├── playbook.yaml
├── group_vars/
│   └── all.yml
├── host_vars/
│   └── 54.234.107.31/
│       └── all.yml
└── vars/
    └── custom.yml
```

Harness clones your playbook repository when the pipeline runs, making all files available to Ansible during execution. You can organize variable files using any structure that works with your playbooks. Go to the [examples](#examples) section to see how to reference these files in your playbooks.

---

### Plugin inventory repository variables

When using a plugin-based dynamic inventory (such as AWS EC2, Azure, or GCP), you can store variable files in the same repository as your inventory configuration. A plugin inventory is an Ansible inventory that queries cloud provider APIs to discover hosts dynamically rather than using static host lists.

Harness clones the repository containing your plugin inventory configuration when the pipeline runs. This approach is useful when your variable organization aligns with your infrastructure topology, such as grouping variables by AWS regions, Azure resource groups, or GCP zones.

**Example repository structure:**

```
my-inventory-repo/
├── aws_ec2.yml              # Plugin inventory configuration
├── group_vars/
│   ├── all.yml
│   ├── webservers.yml
│   └── databases.yml
└── host_vars/
    └── i-1234567890abcdef0/
        └── all.yml
```

All variable files in the cloned repository are available to Ansible during execution. You can organize variable files using any structure that works with your inventory and playbooks. Go to the [examples](#examples) section to see how to reference these files in your playbooks.

---

### Dedicated variables repository

You can maintain variables in a separate repository and clone it before running your playbook. This approach is useful when you share configuration across multiple playbooks or want to separate configuration data from automation logic. The cloned repository will be placed in `/harness/<repoName>` where `repoName` is the value you specify in the Git Clone step.

To use a dedicated variables repository, add a Git Clone step in your Harness pipeline before the Ansible run step. Go to **Pipelines** in your Harness project, select your pipeline, then select **Edit**. In the pipeline editor, add a Git Clone step before your Ansible execution step.

**Pipeline YAML example:**

```yaml
- stepGroup:
    name: Ansible Execution
    identifier: ansible_execution
    steps:
      - step:
          type: GitClone
          name: Clone Variables Repo
          identifier: clone_variables_repo
          spec:
            repoName: sideloadingvariables
            build:
              type: branch
              spec:
                branch: main
      - step:
          type: IACMAnsiblePlugin
          name: Run Playbook
          identifier: run
          spec:
            command: run
          timeout: 1h
```

**Variables repository structure:**

This example shows a minimal structure. You can organize your dedicated variables repository using any layout that works for your configuration management approach.

```
sideloadingvariables/
└── vars.yml
```

The Git Clone step clones your variables repository to `/harness/<repoName>/` where `repoName` matches the value from your Git Clone step configuration. In this example, the repository is cloned to `/harness/sideloadingvariables/`. All files in the cloned repository are available to Ansible during execution. You can reference these files using any standard Ansible method for loading variables. Go to the [examples](#examples) section to see how to load variables from a dedicated repository.

---

## Debug the file system

If you need to troubleshoot where files are being cloned or verify the file system structure, you can add a Run step to print the directory tree. This is useful when you are combining multiple approaches and need to confirm the file paths Ansible will search for variables.

**Pipeline YAML example:**

```yaml
- stepGroup:
    name: Ansible Execution
    identifier: ansible_execution
    steps:
      - step:
          type: GitClone
          name: Clone Variables Repo
          identifier: clone_variables_repo
          spec:
            repoName: sideloadingvariables
            build:
              type: branch
              spec:
                branch: main
      - step:
          type: Run
          name: Debug - Show File System
          identifier: debug_filesystem
          spec:
            shell: Sh
            command: ls -laR /harness
          timeout: 5m
      - step:
          type: IACMAnsiblePlugin
          name: Run Playbook
          identifier: run
          spec:
            command: run
          timeout: 1h
```

**Example output showing all three approaches combined:**

This example demonstrates the file system structure when using all three variable file approaches in a single pipeline.

```
/harness/
├── playbook.yaml
├── group_vars/
│   └── all.yml
├── host_vars/
│   ├── 54.234.107.31/
│   │   └── all.yml
│   └── ec2-54-242-127-117.compute-1.amazonaws.com/
│       └── all.yml
├── plugin-inventory/
│   ├── aws_ec2.yaml
│   └── host_vars/
│       └── ec2-54-234-107-31.compute-1.amazonaws.com/
│           └── all.yml
└── sideloadingvariables/
    └── vars.yml
```

This output shows three variable sources:
- **Playbook repository variables:** `playbook.yaml`, `group_vars/`, and `host_vars/` at the root
- **Plugin inventory repository variables:** Files under `plugin-inventory/`
- **Dedicated variables repository:** Files under `sideloadingvariables/`

When using multiple approaches, be aware of Ansible variable precedence. Variables defined in multiple locations will be resolved according to Ansible's precedence rules. Go to [Ansible variable precedence documentation](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_variables.html#variable-precedence-where-should-i-put-a-variable) to understand how Ansible resolves conflicts when the same variable is defined in multiple sources.

---

## Examples

The following examples show how to use variable files with different repository approaches.

<Tabs>
<TabItem value="standard" label="Standard directory conventions" default>

#### Use standard Ansible directory conventions

Ansible automatically detects and includes variable files stored in `group_vars/` and `host_vars/` directories within your playbook or inventory repository.

**Repository structure:**

```
my-playbook-repo/
├── playbook.yaml
├── group_vars/
│   └── all.yml
└── host_vars/
    └── 54.234.107.31/
        └── all.yml
```

When running the playbook against host `54.234.107.31`, Ansible automatically includes the following variables:
- Variables from `group_vars/all.yml` — applied to all hosts in the inventory
- Variables from `host_vars/54.234.107.31/all.yml` — applied only to this specific host

**`group_vars/all.yml`:**

```yaml
---
myvar: "my value"
mysecondvar: "my other value"
app_port: 8080
log_level: info
```

Go to [Ansible inventory guide on organizing variables](https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html#organizing-host-and-group-variables) to understand variable organization patterns.

</TabItem>
<TabItem value="dedicated" label="Dedicated variables repository">

#### Load variables from a dedicated repository

Once a dedicated variables repository is cloned to `/harness/<repoName>/`, you can reference the files using any standard Ansible method for loading variables. This example demonstrates using the `include_vars` module.

**Using `include_vars`:**

```yaml
---
- name: Example Playbook with External Variables
  hosts: all
  become: yes
  tasks:
    - name: Load variables from dedicated repo
      ansible.builtin.include_vars:
        file: ../sideloadingvariables/vars.yml
      
    - name: Use the included variables
      ansible.builtin.copy:
        dest: /tmp/demo.txt
        content: "{{ message }}\n"
    
    - name: Display variable value
      ansible.builtin.debug:
        msg: "Variable value: {{ myvar }}"
```

**`vars.yml`:**

```yaml
---
message: "Hello from sideloaded variables"
app_port: 8080
app_user: appuser
log_level: info
```

</TabItem>
</Tabs>

---

## Troubleshooting

<Troubleshoot
  issue="Ansible playbook cannot find variable files in group_vars or host_vars directories in Harness IaCM"
  mode="general"
  fallback="Verify the variable files are in the correct directory structure (group_vars/ or host_vars/) in your repository. Check the Debug file system section to confirm files were cloned to the expected paths."
/>

<Troubleshoot
  issue="Git Clone step fails with authentication error in Harness IaCM pipeline"
  mode="general"
  fallback="Verify your Git connector credentials are valid and the connector has access to the repository. Check that the branch specified in the Git Clone step exists in the remote repository."
/>

<Troubleshoot
  issue="Variables from dedicated repository not loading when using Git Clone step with Ansible in Harness IaCM"
  mode="general"
  fallback="Confirm the repoName value in your Git Clone step matches the path used in include_vars or other variable loading mechanisms. The repository is cloned to /harness/<repoName>/ so verify the relative path in your playbook is correct."
/>

<Troubleshoot
  issue="Variable precedence conflicts when combining multiple variable file approaches with Ansible in Harness IaCM"
  mode="general"
  fallback="Ansible resolves variable conflicts using precedence rules. Variables from include_vars have higher precedence than group_vars, which have higher precedence than inventory variables. Review the Ansible variable precedence documentation to understand the resolution order."
/>

---

## Next steps

You now understand the three approaches for providing variable files to Ansible playbooks in Harness IaCM. You can store variables alongside your playbook code, alongside dynamic inventory configurations, or maintain them in a dedicated repository.

- Go to [Example Ansible use cases](/docs/infra-as-code-management/configuration-management/ansible/examples/example-use-cases) to apply these patterns to web fleets, rolling patches, and multi-environment configurations.
- Go to [Ansible variable precedence documentation](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_variables.html#variable-precedence-where-should-i-put-a-variable) to understand how Ansible resolves conflicts when the same variable is defined in multiple sources.
- Go to [Ansible inventory guide](https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html) to learn more about organizing host and group variables.
