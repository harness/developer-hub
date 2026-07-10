---
title: Create Ansible Inventories
description: Create static and dynamic Ansible inventories in Harness IaCM, configure dynamic sources from workspace resources, and filter hosts with attribute conditions.
sidebar_label: Inventories
keywords:
  - ansible
  - inventory
  - static inventory
  - dynamic inventory
  - dynamic sources
  - IaCM
tags:
  - iacm
  - ansible
  - configuration
sidebar_position: 10
slug: /infra-as-code-management/configuration-management/ansible/inventories
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

An inventory defines the machines your playbooks target and the variables those machines carry. This guide shows you how to create a static inventory with manually defined hosts, a dynamic inventory that derives hosts from the resources in a Terraform or OpenTofu workspace, and a plugin inventory that fetches hosts from a cloud provider through an Ansible inventory plugin.

---

## What will you learn?

- **Inventory types:** When to choose a static, dynamic, or plugin inventory.
- **Static setup:** Create an inventory and define hosts and groups manually.
- **Dynamic setup:** Add a source that resolves hosts from workspace resources, select the host address attribute, and filter hosts with conditions.
- **Plugin setup:** Point Harness at a Git-stored inventory plugin configuration and a cloud connector.
- **Variables:** Attach inventory-level variables and environment variables, including secrets.

---

## Before you begin

- **Harness account with IaCM enabled:** You need **Infrastructure as Code Management** under **Infrastructure** in Harness. For how to access or create a Harness account, see [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide).

    :::info Contact Harness support:

    If IaCM does not appear, see [Get started with IaCM](/docs/infra-as-code-management/get-started) or contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Ansible concepts:** Familiarity with hosts, groups, and inventories. Go to the [Ansible in IaCM overview](/docs/infra-as-code-management/configuration-management/ansible/overview) to review the concepts.
- **A provisioned workspace (dynamic inventories only):** Dynamic sources resolve hosts from the resources of an IaCM workspace, so the workspace must exist and hold state. Go to [Get started with IaCM](/docs/infra-as-code-management/get-started) to create and provision a workspace.
- **Git and cloud connectors (plugin inventories only):** The plugin configuration file lives in a Git repository, and provider credentials come from a cloud connector. Go to [Connect to a code repository](/docs/platform/connectors/code-repositories/connect-to-code-repo) and [Cloud connectors](/docs/category/cloud-providers) to set these up.

---

### Choose an inventory type

Harness IaCM supports three inventory types. Choose based on how your hosts come into existence:

- **Static:** You define a list of hosts and groups manually. Best for fixed fleets, bastion hosts, and small stateful clusters where the topology is known and stable.
- **Dynamic:** Hosts are derived dynamically from different sources, such as the resources of a Terraform or OpenTofu workspace. Best when provisioning creates or replaces hosts, because the inventory tracks state without manual updates.
- **Plugin:** Hosts are fetched from a cloud provider by an Ansible inventory plugin, with the plugin configuration file stored in your Git repository. Best when your team already standardizes on plugins such as `aws_ec2` or `azure_rm`.

---

### Create an inventory

Follow the interactive guide or the step-by-step instructions to create an inventory.

<Tabs>
<TabItem value="Interactive guide">

<DocVideo src="https://app.tango.us/app/embed/458abc24-16d1-4684-81ae-866ad750cbed?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create New Inventory in Harness" />

</TabItem>
<TabItem value="Step-by-step">

To create an inventory, do the following:

1. In the Harness UI, navigate to the **IaCM** module.
2. In the left sidebar under **Configuration**, select **Inventories**.
3. Select **+ New Inventory**. The **New Inventory** dialog opens on the **About Inventory** step.
4. Enter a **Name**. An Id is generated automatically and cannot be changed after creation. **Description** and **Tags** are optional.
5. Under **How do you want to set up the inventory?**, select **Static**, **Dynamic**, or **Plugin**.
6. For Static and Dynamic, select **Create**. For Plugin, select **Next** and complete the extra steps described in the Plugin tab below.

</TabItem>
</Tabs>

After creation, Harness opens the inventory detail page with four tabs: **Hosts**, **Variables**, **Activity History**, and **Configuration**. The remaining setup differs by type.

<Tabs>
<TabItem value="static" label="Static" default>

A static inventory starts empty. You add groups and hosts manually on the **Hosts** tab.

1. Select **+ New Group** to add a group, or **+ New Host** to add a host directly.
2. For a group, enter a **Group name** and optionally select existing hosts that belong to it, then select **Apply Changes**.
3. For a host, enter the **Host Address** (for example, `web1.example.com` or `10.0.1.25`), optionally assign it to groups, then select **Apply Changes**.

Go to [Manage hosts and groups](/docs/infra-as-code-management/configuration-management/ansible/inventories/hosts) for the full host and group workflow, including host-level variables and connection settings.

</TabItem>
<TabItem value="dynamic" label="Dynamic">

A dynamic inventory resolves hosts from one or more **sources**. Each source points at an IaCM workspace and selects resources from its state.

To add a source, do the following:

1. On the inventory's **Hosts** tab, select **+ Source**. The **Source Configuration** panel opens with three tabs: **Configuration**, **Static Variables**, and **Dynamic Variables**.
2. On the **Configuration** tab, enter a **Name**. The source identifier becomes the Ansible group name for the hosts it resolves.
3. Select the **Workspace** that provisions the hosts you want to configure.
4. Select the **Resource Type** to match (for example, `aws_instance`). The list is populated from the resource types present in the workspace state.
5. Select the **Host Address Attribute**. This is the resource attribute Ansible uses to connect to each host (for example, `public_dns` or `public_ip`).
6. Optionally, under **Filters (optional)**, select **+ Add Filter** to narrow which resources become hosts. Go to [Filter hosts with conditions](#filter-hosts-with-conditions).
7. Select **Apply Changes**.

At pipeline run time, Harness queries the workspace state, applies your filters, and renders each matching resource as a host in the source's group.

:::tip
Add one source per logical tier. For example, a `webservers` source that selects `aws_instance` resources tagged `Role=web`, and a `databases` source that selects instances tagged `Role=db`. Playbooks can then target each group by the source identifier.
:::

</TabItem>
<TabItem value="plugin" label="Plugin">

A plugin inventory uses an Ansible inventory plugin to fetch hosts from a cloud provider. The plugin configuration file (for example, `aws_ec2.yml`) lives in your Git repository, and a cloud connector supplies the provider credentials. Selecting **Plugin** extends the dialog into a three-step wizard.

1. On the **About Inventory** step, enter the name and select **Plugin**, then select **Next**.
2. On the **Source** step, define where the inventory configuration is stored:
   - **Select Git Provider:** Choose **Harness Code Repository** or **Third-party Git provider**.
   - **Git Connector:** Select the connector with read access to the repository (third-party providers only).
   - **Repository:** Select or enter the repository name.
   - **Git Fetch Type:** Choose **Latest from Branch**, **Git Tag**, or **Commit SHA**, and supply the branch, tag, or SHA.
   - **Folder Path (optional):** Enter the path to the folder containing your plugin configuration.
3. Select **Next**. On the **Provider** step, select a cloud provider for first-class integration (**AWS**, **GCP**, or **Azure**) or select **Custom** to use any other inventory plugin.
4. Select the **Cloud Connector** that holds the provider credentials.
5. Select **Create**.

At pipeline run time, the plugin queries the provider API through the connector credentials and renders the hosts your configuration file selects.

A plugin inventory's detail page differs from the other types: instead of a **Hosts** tab, it opens on a **Plugin Definition** tab that renders your plugin configuration file from Git. A typical `aws_ec2.yaml` looks like this:

```yaml
plugin: amazon.aws.aws_ec2
regions:
  - us-east-1
filters:
  "tag:infra": "ansibleHost"
  instance-state-name: running
hostnames:
  - tag:Name
compose:
  ansible_host: public_ip_address
```

</TabItem>
</Tabs>

---

### Filter hosts with conditions

Filters control which workspace resources a dynamic source turns into hosts. Each filter is a condition made of an attribute, an operator, and a value. Multiple filters combine with **AND** logic, so a resource must match every condition to be included.

To add a filter in the **Source Configuration** panel, do the following:

1. Select **Add Filter**.
2. Select the resource **attribute** to evaluate (for example, `tags.environment`).
3. Select an operator: **equals**, **not equals**, **contains**, **does not contain**, **starts with**, or **ends with**.
4. Enter the **value** to compare against (for example, `prod`).

Some common filter patterns are:

- **Environment scoping:** `tags.environment` **equals** `prod` so only production resources are configured.
- **Role scoping:** `tags.Role` **contains** `web` so database instances never receive the web playbook.
- **Naming conventions:** `tags.Name` **starts with** `edge-` to select a named subset of a larger fleet.

---

### Use dynamic variables from resource attributes

Dynamic sources can attach variables to every host they resolve, with values drawn from each resource's attributes or the workspace outputs. Use Harness expressions in the value field:

- `<+attributes.ATTRIBUTE_NAME>` reads an attribute from the matched resource, for example `<+attributes.private_ip>`.
- `<+outputs.OUTPUT_NAME>` reads an output from the workspace, for example `<+outputs.cluster_endpoint>`.

For example, a dynamic variable with key `region` and value `<+attributes.availability_zone>` gives every resolved host a `region` host variable your playbook can reference as `{{ region }}`. Static values are also allowed and apply unchanged to every host in the source.

---

### Add inventory variables

Inventory-level variables apply to every host in the inventory and are the right place for connection settings and shared configuration. In the inventory's **Variables** tab, do the following:

1. Select **+ Variables**. A new variable row appears.
2. Select the variable type: **string** for plain-text values or **secret** for sensitive values.
3. Enter the variable key and value.
4. Select **Save Changes** to persist the rows.

A common baseline for SSH-based fleets stores the connection user as a string (for example, `ansible_user: ubuntu`) and the private key as a **secret**-type variable (`ansible_ssh_private_key_file`) referencing a [Harness secret](/docs/platform/secrets/secrets-management/harness-secret-manager-overview). Secret values are masked in pipeline logs.

Environment variables defined on the inventory are injected into the Ansible process environment at run time rather than becoming Ansible variables.

---

### View activity history

The **Activity History** tab lists past executions that used this inventory, including the playbook, the pipeline execution, and the run status. Use it to correlate configuration runs with provisioning events and to audit who changed what, when.

---

## Troubleshooting

<Troubleshoot
  issue="Dynamic inventory source resolves no hosts from workspace resources in Harness IaCM Ansible"
  mode="general"
  fallback="Confirm the workspace holds state with resources of the selected Resource Type, and that every filter condition matches. Filters combine with AND logic, so one non-matching condition excludes the resource."
/>

<Troubleshoot
  issue="Host address is empty or wrong for hosts resolved by a dynamic inventory source in Harness IaCM"
  mode="general"
  fallback="Check the Host Address Attribute on the source. The selected attribute must exist on the matched resource type and contain a reachable address, for example public_dns or public_ip."
/>

<Troubleshoot
  issue="Cannot edit the inventory identifier after creating an inventory in Harness IaCM"
  mode="fallback-only"
  fallback="Inventory identifiers are immutable after creation. Create a new inventory with the desired identifier and delete the old one."
/>

---

## Next steps

You created an inventory and connected it to real hosts, either manually or from workspace state.

- Go to [Manage hosts and groups](/docs/infra-as-code-management/configuration-management/ansible/inventories/hosts) to add host-level variables, groups, and connection settings.
- Go to [Create Ansible playbooks](/docs/infra-as-code-management/configuration-management/ansible/playbooks) to register the playbook that will run against this inventory.
- Go to [Example Ansible use cases](/docs/infra-as-code-management/configuration-management/ansible/examples/example-use-cases) to apply inventories to web fleets, patching, and compliance patterns.
