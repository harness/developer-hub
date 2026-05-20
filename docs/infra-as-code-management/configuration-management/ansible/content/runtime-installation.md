This approach installs Python dependencies at the start of each pipeline run using a `requirements.txt` file in your playbook repository.

## Create requirements.txt

Create a `requirements.txt` file in your playbook repository with your required Python packages:

```
tabulate==0.9.0
netaddr==0.9.0
jmespath==1.0.1
```

Pin versions using `==` to ensure reproducibility across pipeline runs.

## Add pipeline variable

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

## Run your pipeline

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

## Complete example

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
