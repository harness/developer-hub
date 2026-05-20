---
title: Manage Playbook Dependencies
description: Provide Python packages and other dependencies to your Ansible playbooks using runtime installation or pre-built images.
sidebar_label: Manage Dependencies
keywords:
  - python
  - pip
  - requirements
  - ansible
  - dependencies
  - custom images
  - execution environment
  - playbook packaging
tags:
  - iacm
  - ansible
  - python
sidebar_position: 55
redirect_from:
  - /docs/infra-as-code-management/configuration-management/ansible/python-requirements
  - /docs/infra-as-code-management/configuration-management/ansible/custom-images
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Many Ansible playbooks require dependencies beyond what the default Harness Ansible image provides. Python packages like `tabulate`, `netaddr`, and `jmespath` are common needs, but you may also need system tools (`sshpass`, `rsync`, `jq`), Ansible collections, or custom roles. You can provide these dependencies in two ways: install them at runtime using a `requirements.txt` file, or pre-build a custom Docker image with everything pre-installed.

Choose **runtime installation** for quick prototyping and frequently changing Python packages. Choose **pre-built images** for production workloads requiring faster execution, strict reproducibility, or non-Python dependencies like system packages and Ansible collections.

---

## Before you begin

Before you begin, make sure the following are in place:

- **Harness IaCM pipeline configured:** You need an existing pipeline with the `IACMAnsiblePlugin` step. Go to [Get started with Ansible](/docs/infra-as-code-management/configuration-management/ansible/get-started) to configure your first Ansible pipeline.
- **Playbook repository with Git connector:** Your playbooks must be stored in a Git repository with a configured Harness connector. Go to [Connect to a code repository](/docs/platform/connectors/code-repositories/connect-to-code-repo) to set up a Git connector.
- **Understanding of Python package names:** You should know which Python packages your playbooks require. Go to [PyPI](https://pypi.org/) to search for Python packages.
- **Container registry access (for pre-built images only):** If building custom images, you need push access to a container registry. Go to [Connect to an artifact registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector) to configure a Harness connector.
- **Docker installed locally (for pre-built images only):** If you want to test your custom image locally before using it in Harness, install Docker. Go to [Get Docker](https://docs.docker.com/get-docker/) to install Docker Desktop or Docker Engine.

---

<DynamicMarkdownSelector
  toc={toc}
  precedingHeadingID="before-you-begin"
  nextHeadingID="troubleshooting"
  options={{
    "Runtime installation (requirements.txt)": {
      path: "/infra-as-code-management/configuration-management/ansible/content/runtime-installation.md",
      description: "Install Python packages at the start of each pipeline run using a requirements.txt file. Best for prototyping and frequently changing dependencies."
    },
    "Pre-built images (custom execution environments)": {
      path: "/infra-as-code-management/configuration-management/ansible/content/pre-built-images.md",
      description: "Pre-install dependencies in a Docker image for faster execution. Best for production workloads and when you need system packages or Ansible collections."
    }
  }}
/>

---

## Troubleshooting

<Troubleshoot
  issue="ModuleNotFoundError: No module named 'package_name' in Harness IaCM Ansible pipeline"
  mode="general"
  fallback="Verify the package is installed. For runtime installation, check that ANSIBLE_REQUIREMENTS variable points to the correct file. For custom images, run: docker run --rm your-image:tag python3.11 -c 'import package_name; print(package_name.__version__)'"
/>

<Troubleshoot
  issue="pip install fails with permission denied when building custom Ansible image"
  mode="general"
  fallback="Make sure you switch to USER harness before running pip install, and use the --user flag: RUN pip install --user package-name"
/>

<Troubleshoot
  issue="Custom Ansible image not being pulled in Harness IaCM pipeline"
  mode="docs"
  fallback="Verify your connectorRef in the pipeline YAML matches a configured Docker connector with access to your registry, and confirm the image name and tag are correct."
/>

<Troubleshoot
  issue="Ansible playbook works locally but fails in Harness IaCM with missing Python package"
  mode="general"
  fallback="For runtime installation, confirm the ANSIBLE_REQUIREMENTS variable is set. For custom images, confirm the pipeline step references your custom image in the image field. Check the pipeline logs to see which image was actually pulled."
/>

<Troubleshoot
  issue="ANSIBLE_REQUIREMENTS variable set but packages not installing in Harness IaCM pipeline"
  mode="general"
  fallback="Verify the requirements.txt file exists at the path specified in the variable, relative to the repository root. Check the Debug file system section in the pipeline logs to confirm the file was cloned to the expected path."
/>

---

## Next steps

You now understand how to provide dependencies to Ansible playbooks in Harness IaCM. You can install packages at runtime using requirements.txt for flexibility, or pre-install them in a custom image for faster execution.

- Go to [Example Ansible use cases](/docs/infra-as-code-management/configuration-management/ansible/example-use-cases) to apply these patterns to web fleets, rolling patches, and multi-environment configurations.
- Go to [Managing large outputs](/docs/infra-as-code-management/configuration-management/ansible/managing-large-outputs) to handle verbose Ansible output.
- Go to [Variable files](/docs/infra-as-code-management/configuration-management/ansible/variable-files) to organize configuration by environment, host group, or role.
