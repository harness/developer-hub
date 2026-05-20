Custom images pre-install dependencies in a Docker image, eliminating installation time on every pipeline run. Execution environments are containerized runtime environments for executing Ansible playbooks in Harness IaCM. By building custom images, you can package Ansible Core, Python dependencies, system packages, and Ansible collections into a reusable container that runs faster and provides consistent, reproducible builds across all pipeline executions.

## Why build custom images

Custom execution environment images provide several benefits over installing dependencies at runtime:

- **Faster pipelines:** Pre-install dependencies once instead of downloading them on every pipeline run.
- **Python packages pre-installed:** Required by Ansible plugins, filters, and custom modules.
- **Ansible collections and roles bundled:** Include collections in the image instead of downloading at runtime.
- **Include system packages:** Add OS-level tools not in the base image, such as `sshpass`, `rsync`, or `jq`.
- **Reproducible builds:** Lock dependency versions for consistent environments across development, testing, and production.
- **Isolation:** Different projects can have different images with different dependencies.

## Build a custom image

This example demonstrates adding the `tabulate` Python package to format data as tables. The formatting code runs inside the Ansible container and requires the `tabulate` package.

### Create the Dockerfile

Create a `Dockerfile` that extends the Harness Ansible base image:

```dockerfile
# Start from Harness Ansible base image
FROM plugins/harness_ansible:<version>

# Switch to harness user (required for pip)
USER harness

# Install tabulate Python package
# Pin version for reproducibility
RUN pip install --user tabulate==0.9.0

# Verify it's installed
RUN python3.11 -c "import tabulate; print('✓ tabulate installed:', tabulate.__version__)"
```

### Build and push the image

Run the following commands to build, verify, and push your custom image:

```bash
# Build the image
docker build -t myorg/ansible-ee-tabulate:1.0.0 .

# Verify the package is installed
docker run --rm myorg/ansible-ee-tabulate:1.0.0 \
  python3.11 -c "import tabulate; print('✓ tabulate version:', tabulate.__version__)"

# Expected output:
# ✓ tabulate version: 0.9.0

# Push to your registry
docker push myorg/ansible-ee-tabulate:1.0.0
```

## Test the custom image locally (optional)

You can optionally test your custom image locally before using it in Harness to verify the package works correctly.

### Create a test playbook

Create `test-tabulate.yml` with the following content:

```yaml
---
- name: Test tabulate package
  hosts: localhost
  gather_facts: false
  
  tasks:
    - name: Format data as table using tabulate
      ansible.builtin.shell: |
        python3.11 << 'EOF'
        from tabulate import tabulate
        
        data = [
            ["Name", "Age", "City"],
            ["Alice", 30, "New York"],
            ["Bob", 25, "San Francisco"],
            ["Charlie", 35, "Boston"],
        ]
        
        print(tabulate(data, headers="firstrow", tablefmt="grid"))
        EOF
      register: table_output
      changed_when: false
    
    - name: Display formatted table
      ansible.builtin.debug:
        msg: "{{ table_output.stdout }}"
```

### Run the test with your custom image

Run the test playbook using your custom image:

```bash
# Test with custom image (should work)
docker run --rm \
  -v "$(pwd):/runner" \
  -w /runner \
  myorg/ansible-ee-tabulate:1.0.0 \
  ansible-playbook test-tabulate.yml
```

**Expected output:**

```
TASK [Display formatted table] *************************************************
ok: [localhost] => {
    "msg": "+----------+-------+-----------------+\n| Name     |   Age | City            |\n+==========+=======+=================+\n| Alice    |    30 | New York        |\n+----------+-------+-----------------+\n| Bob      |    25 | San Francisco   |\n+----------+-------+-----------------+\n| Charlie  |    35 | Boston          |\n+----------+-------+-----------------+"
}
```

### Verify it fails without the custom image

Confirm the package is required by testing with the base image:

```bash
# Test with base image (should fail)
docker run --rm \
  -v $(pwd):/runner \
  -w /runner \
  plugins/harness_ansible \
  ansible-playbook test-tabulate.yml
```

**Expected output:**

```
fatal: [localhost]: FAILED! => {
    "msg": "non-zero return code",
    "stderr": "Traceback (most recent call last):\n  File \"<stdin>\", line 1, in <module>\nModuleNotFoundError: No module named 'tabulate'"
}
```

This confirms your custom execution environment is working correctly.

## Use the custom image in Harness

After you verify your custom image works locally, reference it in your Harness pipeline.

### Update your pipeline YAML

In your pipeline YAML, update the `IACMAnsiblePlugin` step to reference your custom image:

```yaml
- step:
    type: IACMAnsiblePlugin
    name: Run Ansible with custom image
    identifier: run_ansible
    spec:
      command: run
      connectorRef: dockerhub
      image: myorg/ansible-ee-tabulate:1.0.0
```

Make sure your playbook in the Harness workspace uses the `tabulate` package as shown in the test example.
