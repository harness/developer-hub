---
title: Output variables for Ansible
sidebar_label: Output Variables for Ansible
description: Configure output variables to export data from Ansible playbooks to other pipeline steps.
keywords:
  - ansible
  - output variables
  - drone output
  - pipeline variables
tags:
  - Configuration Management
  - Ansible
---

Output variables allow you to export data from Ansible playbook execution to other steps in the stage or anywhere in the pipeline. This page explains how to configure output variables for Ansible playbooks in Harness.

---

## Export variables from an Ansible playbook

To export variables from an Ansible playbook, write key-value pairs to the `DRONE_OUTPUT` file using the `ansible.builtin.lineinfile` module.

### Example playbook

```yaml
---
- name: Fetch system info from remote host and export to Harness
  hosts: all
  gather_facts: true

  tasks:
    - name: Show remote OS info
      ansible.builtin.debug:
        msg: "Remote host {{ inventory_hostname }} is running {{ ansible_distribution }} {{ ansible_distribution_version }}"

    - name: Export OS to Harness output variable
      ansible.builtin.lineinfile:
        path: "{{ lookup('ansible.builtin.env', 'DRONE_OUTPUT') }}"
        line: "REMOTE_OS={{ ansible_distribution }} {{ ansible_distribution_version }}"
        create: true
        insertafter: EOF
      delegate_to: localhost
      run_once: true
```

**Key points:**

- **DRONE_OUTPUT path:** Use `lookup('ansible.builtin.env', 'DRONE_OUTPUT')` to get the output file path.
- **Format:** Write variables as `VARIABLE_NAME=value`.
- **delegate_to:** Use `delegate_to: localhost` to write to the file on the control node, not remote hosts.
- **run_once:** Use `run_once: true` when exporting from multiple hosts to avoid duplicate writes.

---

## Export multiple variables

You can export multiple variables by writing additional lines to `DRONE_OUTPUT`:

```yaml
- name: Export multiple variables
  ansible.builtin.lineinfile:
    path: "{{ lookup('ansible.builtin.env', 'DRONE_OUTPUT') }}"
    line: "{{ item }}"
    create: true
    insertafter: EOF
  loop:
    - "REMOTE_OS={{ ansible_distribution }} {{ ansible_distribution_version }}"
    - "REMOTE_IP={{ ansible_default_ipv4.address }}"
    - "REMOTE_ARCH={{ ansible_architecture }}"
    - "REMOTE_MEMORY_MB={{ ansible_memtotal_mb }}"
  delegate_to: localhost
  run_once: true
```

Each variable will be available as a separate output variable in Harness.

---

## Reference output variables

Once exported, output variables can be referenced in subsequent pipeline steps using Harness expressions.

**Within the same stage:**

```
<+execution.steps.[step_id].output.outputVariables.[output_variable_name]>
```

**Anywhere in the pipeline:**

```
<+pipeline.stages.[stage_id].spec.execution.steps.[step_id].output.outputVariables.[output_variable_name]>
```

**When step is inside a step group:**

```
<+pipeline.stages.[stage_id].spec.execution.steps.[step_group_id].steps.[step_id].build.[output_variable_name]>
```

To find the expression to reference your output variables, find the step in the pipeline execution, and click the **Output** tab.

---

## Example usage

After running the playbook above, you can reference the `REMOTE_OS` variable in a subsequent step:

```yaml
- step:
    type: ShellScript
    name: Display Remote OS
    identifier: display_os
    spec:
      shell: Bash
      source:
        type: Inline
        spec:
          script: |
            echo "Deployed to: <+execution.steps.ansible_deploy.output.outputVariables.REMOTE_OS>"
```
