---
title: Install Python Requirements
description: Install Python dependencies required by your Ansible playbooks in Harness IaCM.
sidebar_label: Python Requirements
keywords:
  - python
  - pip
  - requirements
  - ansible
  - dependencies
tags:
  - iacm
  - ansible
  - python
sidebar_position: 65
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Python dependencies for Ansible playbooks can be installed using either a `requirements.txt` file that installs packages at runtime, or by building a custom Docker image with dependencies pre-installed. Choose the requirements.txt approach for quick prototyping and frequently changing dependencies, or use custom images for production workloads requiring faster execution and strict reproducibility.

---

## Before you begin

Before you begin, make sure the following are in place:

- **Harness IaCM pipeline configured:** You need an existing pipeline with the `IACMAnsiblePlugin` step. Go to [Get started with Ansible](/docs/infra-as-code-management/configuration-management/ansible/get-started) to configure your first Ansible pipeline.
- **Playbook repository with Git connector:** Your playbooks must be stored in a Git repository with a configured Harness connector. Go to [Connect to a code repository](/docs/platform/connectors/code-repositories/connect-to-code-repo) to set up a Git connector.
- **Understanding of Python package names:** You should know which Python packages your playbooks require. Go to [PyPI](https://pypi.org/) to search for Python packages.

---

## Install using requirements.txt

This approach installs Python dependencies at the start of each pipeline run using a `requirements.txt` file in your playbook repository.

### Create requirements.txt

Create a `requirements.txt` file in your playbook repository with your required Python packages:

```
tabulate==0.9.0
netaddr==0.9.0
jmespath==1.0.1
```

Pin versions using `==` to ensure reproducibility across pipeline runs.

### Add pipeline variable

In your Harness pipeline, add a pipeline variable to point to your requirements file:

1. Open your pipeline in the Harness UI.
2. Select **Variables** in the pipeline editor.
3. Add a new variable with the following values:
   - **Name:** `ANSIBLE_REQUIREMENTS`
   - **Type:** String
   - **Value:** `requirements.txt`

If your requirements file is in a subdirectory, provide the relative path from the repository root:

```
path/to/requirements.txt
```

### Run your pipeline

When the pipeline runs, dependencies are installed automatically before your playbook executes. Check the pipeline logs to verify installation:

```
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  🧰 Install python requirements                                                                                        
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

ansible-playbook resolved to: /usr/local/bin/ansible-playbook
ansible-playbook interpreter: /usr/bin/python3.11
Installing python requirements from /harness/requirements.txt using /usr/bin/python3.11 (pip --user)
✓ ok: requirements installed
```

### Complete example

This example demonstrates using the `tabulate` package installed via `requirements.txt`:

**Directory structure:**

```
my-playbook-repo/
├── requirements.txt
├── playbook.yml
└── inventory.ini
```

**requirements.txt:**

```
tabulate==0.9.0
```

**playbook.yml:**

```yaml
---
- name: Test tabulate package
  hosts: localhost
  gather_facts: false
  
  tasks:
    - name: Use tabulate to format data
      ansible.builtin.shell: |
        python3.11 << 'EOF'
        from tabulate import tabulate
        data = [["Name", "Age"], ["Alice", 30], ["Bob", 25]]
        print(tabulate(data, headers="firstrow"))
        EOF
      register: result
    
    - name: Display result
      ansible.builtin.debug:
        msg: "{{ result.stdout }}"
```

**Pipeline variable:**

- **Name:** `ANSIBLE_REQUIREMENTS`
- **Value:** `requirements.txt`

The `ANSIBLE_REQUIREMENTS` variable is automatically detected and dependencies are installed before the playbook runs.

---

## Install using custom images

Custom images pre-install Python dependencies in a Docker image, eliminating installation time on every pipeline run. When using custom images, do not set the `ANSIBLE_REQUIREMENTS` variable because dependencies are already in the image.

Go to [Using custom images](/docs/infra-as-code-management/configuration-management/ansible/custom-images) to learn how to build and use custom execution environment images.

---

## Next steps

Now that you understand how to install Python requirements, explore related topics:

- Go to [Using custom images](/docs/infra-as-code-management/configuration-management/ansible/custom-images) to learn how to build custom execution environment images.
- Go to [Example Ansible use cases](/docs/infra-as-code-management/configuration-management/ansible/example-use-cases) to see real-world playbook patterns.
