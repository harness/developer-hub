---
title: Use Custom Images
description: Build custom Docker images with pre-installed dependencies for your Ansible playbooks in Harness IaCM.
sidebar_label: Custom Images
keywords:
  - execution environment
  - docker
  - ansible
  - custom image
  - python packages
tags:
  - iacm
  - ansible
  - docker
sidebar_position: 60
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Execution environments are containerized runtime environments for executing Ansible playbooks in Harness IaCM. By building custom images, you can package Ansible Core, Python dependencies, system packages, and Ansible collections into a reusable container that runs faster and provides consistent, reproducible builds across all pipeline executions.

---

## Before you begin

Before you begin, make sure the following are in place:

- **Container registry access:** You need push access to a container registry (Docker Hub, GCR, ECR, or similar). Go to [Connect to an artifact registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector) to configure a Harness connector.
- **Familiarity with Docker:** You should understand basic Dockerfile syntax and how to build and push images. Go to [Dockerfile reference](https://docs.docker.com/reference/dockerfile/) to learn Dockerfile basics.
- **Harness IaCM pipeline configured:** You need an existing pipeline with the `IACMAnsiblePlugin` step. Go to [Get started with Ansible](/docs/infra-as-code-management/configuration-management/ansible/get-started) to configure your first Ansible pipeline.
- **Docker installed locally (optional):** If you want to test your custom image locally before using it in Harness, install Docker. Go to [Get Docker](https://docs.docker.com/get-docker/) to install Docker Desktop or Docker Engine.

---

## Why build custom images

Custom execution environment images provide several benefits over installing dependencies at runtime:

- **Faster pipelines:** Pre-install dependencies once instead of downloading them on every pipeline run.
- **Python packages pre-installed:** Required by Ansible plugins, filters, and custom modules.
- **Ansible collections and roles bundled:** Include collections in the image instead of downloading at runtime.
- **Include system packages:** Add OS-level tools not in the base image, such as `sshpass`, `rsync`, or `jq`.
- **Reproducible builds:** Lock dependency versions for consistent environments across development, testing, and production.
- **Isolation:** Different projects can have different images with different dependencies.

---

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

---

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

---

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

---

## Troubleshooting

<Troubleshoot
  issue="ModuleNotFoundError: No module named 'package_name'"
  mode="docs"
  fallback="Verify the package is installed in your custom image by running: docker run --rm your-image:tag python3.11 -c 'import package_name; print(package_name.__version__)'"
/>

<Troubleshoot
  issue="pip install fails with permission denied"
  mode="general"
  fallback="Make sure you switch to USER harness before running pip install, and use the --user flag: RUN pip install --user package-name"
/>

<Troubleshoot
  issue="Custom image not being pulled in pipeline"
  mode="docs"
  fallback="Verify your connectorRef in the pipeline YAML matches a configured Docker connector with access to your registry, and confirm the image name and tag are correct."
/>

<Troubleshoot
  issue="Playbook works locally but fails in Harness with missing package"
  mode="general"
  fallback="Confirm the pipeline step references your custom image in the image field. Check the pipeline logs to see which image was actually pulled."
/>

---

## Next steps

Now that you understand custom execution environments, explore related topics:

- Go to [Example Ansible use cases](/docs/infra-as-code-management/configuration-management/ansible/example-use-cases) to see real-world playbook patterns.
- Go to [Managing large outputs](/docs/infra-as-code-management/configuration-management/ansible/managing-large-outputs) to handle verbose Ansible output.
