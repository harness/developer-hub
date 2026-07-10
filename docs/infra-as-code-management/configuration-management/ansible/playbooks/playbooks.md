---
title: Create Ansible Playbooks
description: Register Git-backed Ansible playbooks in Harness IaCM, attach playbook variables, and install Ansible Galaxy dependencies from a requirements file.
sidebar_label: Playbooks
keywords:
  - ansible
  - playbook
  - ansible galaxy
  - requirements.yml
  - collections
  - IaCM
tags:
  - iacm
  - ansible
  - configuration
sidebar_position: 10
slug: /infra-as-code-management/configuration-management/ansible/playbooks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

A playbook in Harness IaCM is a pointer to automation you maintain in Git: Harness stores the repository coordinates and fetches the playbook content at pipeline run time. This guide shows you how to register a playbook, attach playbook-level variables, and enable Ansible Galaxy so collection dependencies install automatically before the playbook runs.

---

## What will you learn?

- **Registration:** Point Harness at the repository, branch or commit, and path where your playbook lives.
- **Variables:** Attach playbook-scoped variables and environment variables, including secrets.
- **Ansible Galaxy:** Enable automatic installation of collections from a `requirements.yml` file before execution.
- **Traceability:** Review the playbook's activity history.

---

## Before you begin

- **Playbook in Git:** Your playbook must be stored in a Git repository, either Harness Code Repository or a third-party provider. Go to [Connect to a code repository](/docs/platform/connectors/code-repositories/connect-to-code-repo) to set up a connector with read access.
- **An inventory to target:** Playbooks run against inventories at pipeline time. Go to [Create Ansible inventories](/docs/infra-as-code-management/configuration-management/ansible/inventories) to create one.
- **A requirements file (Galaxy only):** To install Galaxy dependencies automatically, the repository must contain a requirements file such as `requirements.yml` listing the collections your playbook needs.

---

### Register a playbook

Follow the interactive guide or the step-by-step instructions to register a playbook and enable Ansible Galaxy.

<Tabs>
<TabItem value="Interactive guide">

<DocVideo src="https://app.tango.us/app/embed/999adff7-0f97-4919-a387-e5f728f90050?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create Harness Ansible Galaxy Playbook" />

</TabItem>
<TabItem value="Step-by-step">

To register a playbook, do the following:

1. In the **IaCM** module, select **Playbooks** in the left sidebar under **Configuration**.
2. Select **+ New Playbook**. The **Create Playbook** dialog opens.
3. Enter a **Name** for the playbook. **Description** and **Tags** are optional.
4. Under **Repository**, configure the Git source:
   - **Select Git Provider:** Choose **Harness Code Repository** or **Third-party Git provider**.
   - **Git Connector:** Select the connector with access to your repository (third-party providers only).
   - **Repository:** Select or enter the repository name.
   - **Git Fetch Type:** Choose **Latest from Branch**, **Git Tag**, or **Commit SHA**, and supply the branch, tag, or SHA.
   - **File Path:** Enter the path to the playbook file within the repository, for example `site.yml` or `playbooks/site.yml`.
5. Select **Save**.

</TabItem>
</Tabs>

The playbook detail page opens with four tabs: **Playbook Definition**, **Variables**, **Activity History**, and **Configuration**.

Harness does not store or modify playbook content. Every pipeline run fetches from the configured Git coordinates, so pull requests, reviews, and tags on the playbook repository remain your source of truth.

:::tip
Pin production playbooks to a **Git Tag** or **Commit SHA** rather than a branch. Branch-based fetching always takes the latest commit, which means an unreviewed merge changes what production runs.
:::

---

### Add playbook variables

Playbook variables travel with the playbook rather than the inventory, which makes them the right place for values that belong to the automation itself, independent of which hosts it targets.

To add variables, do the following:

1. Open the playbook and select its **Variables** tab.
2. Select **+ Variables** and set the type (**string** or **secret**), key, and value.
3. Select **Save Changes**.

Playbook variables and environment variables behave like their inventory counterparts: string values pass through as Ansible variables, secret values reference Harness secrets and are masked in logs, and environment variables are injected into the Ansible process environment. Go to [Authenticate private Ansible Galaxy content](/docs/infra-as-code-management/configuration-management/ansible/playbooks/authenticate-private-collections) for how secret-typed playbook variables reach the plugin at run time.

---

### Install Ansible Galaxy dependencies

Playbooks that use community or private collections need those collections installed in the execution container before the playbook runs. Instead of baking collections into a custom image, you can have Harness install them at run time from a requirements file in your playbook repository.

To enable Galaxy dependency installation on a playbook, do the following:

1. Open the playbook and select its **Configuration** tab.
2. Under the **Ansible Galaxy** section, turn on the **Enable Ansible Galaxy** toggle.
3. In **Requirements File**, enter the path to your requirements file in the connected repository, for example `requirements.yml`. The requirements file path is required when the toggle is on.
4. Select **Apply Changes**.

At pipeline run time, the Harness Ansible plugin runs `ansible-galaxy collection install -r <requirements file>` as a pre-flight step, after cloning the repository and before executing the playbook.

A typical `requirements.yml` looks like this:

```yaml
collections:
  - name: community.general
  - name: ansible.posix
    version: ">=1.5.0"
  - name: my_namespace.my_collection
```

:::info
Collections hosted on a private Galaxy server, Red Hat Automation Hub, or a private Git repository need credentials at install time. Go to [Authenticate private Ansible Galaxy content](/docs/infra-as-code-management/configuration-management/ansible/playbooks/authenticate-private-collections) to configure `ANSIBLE_GALAXY_SERVER_*` settings, Git credential triples, or `.netrc` authentication.
:::

:::tip
Runtime installation adds time to every pipeline run and depends on the Galaxy server being reachable. For production pipelines with stable dependencies, consider a pre-built image with collections baked in. Go to [Manage playbook dependencies](/docs/infra-as-code-management/configuration-management/ansible/playbooks/manage-dependencies) to compare both approaches.
:::

---

### View activity history

The playbook's **Activity History** tab lists executions that used this playbook, with the inventory, pipeline execution, and status of each run. Use it together with the inventory activity history to answer what ran, where, and when.

---

## Troubleshooting

<Troubleshoot
  issue="Ansible Galaxy requirements file must be set error when saving a playbook in Harness IaCM"
  mode="general"
  fallback="When the Ansible Galaxy option is enabled, the requirements file path is required. Enter the path relative to the repository root, for example requirements.yml, or disable the option."
/>

<Troubleshoot
  issue="ansible-galaxy collection install fails during the pre-flight phase in a Harness IaCM pipeline"
  mode="general"
  fallback="Check that the requirements file path is correct relative to the repository root and that the execution environment can reach the Galaxy server. For private servers, configure ANSIBLE_GALAXY_SERVER_* authentication settings."
/>

<Troubleshoot
  issue="Playbook not found error in Harness IaCM pipeline because repository, branch, or path is incorrect"
  mode="docs"
  fallback="Verify the Git connector, repository, branch or commit, and folder path on the playbook configuration, and confirm the connector has read access to that branch."
/>

---

## Next steps

Your playbook is registered with its dependencies handled, ready to run against an inventory.

- Go to [Get started with Ansible](/docs/infra-as-code-management/configuration-management/ansible/get-started#step-4-integrate-ansible-with-a-pipeline) to run the playbook from a pipeline with the `IACMAnsiblePlugin` step.
- Go to [Authenticate private Ansible Galaxy content](/docs/infra-as-code-management/configuration-management/ansible/playbooks/authenticate-private-collections) to authenticate private collection sources.
- Go to [Output variables for Ansible](/docs/infra-as-code-management/configuration-management/ansible/runtime/output-variables-for-ansible) to export values from playbook runs to later pipeline steps.
