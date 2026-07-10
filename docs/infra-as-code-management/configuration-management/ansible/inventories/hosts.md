---
title: Manage Hosts and Groups
description: Add hosts to Ansible inventories in Harness IaCM, organize them into groups, and attach host, group, and connection variables.
sidebar_label: Hosts
keywords:
  - ansible
  - hosts
  - host groups
  - host variables
  - inventory
  - IaCM
tags:
  - iacm
  - ansible
  - configuration
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Hosts are the machines your playbooks configure, and groups let a playbook target a logical tier such as `webservers` instead of individual addresses. This guide shows you how to add hosts to an inventory, organize them into groups, and attach the variables Ansible needs to connect and configure each machine.

---

## What will you learn?

- **Hosts:** Add, edit, and delete hosts, and assign them to groups.
- **Groups:** Create groups, manage membership, and attach group-level variables.
- **Host variables:** Set per-host values, including connection settings such as `ansible_user`.
- **Navigation:** Use the group side panel and host table to work with large inventories.

---

## Before you begin

- **An existing inventory:** Hosts live inside an inventory. Go to [Create Ansible inventories](/docs/infra-as-code-management/configuration-management/ansible/inventories) to create one.
- **Host connectivity details:** The address, SSH or WinRM connection method, and credentials for each machine you plan to add. Go to [Connect Windows hosts over WinRM](/docs/infra-as-code-management/configuration-management/ansible/examples/example-use-cases#use-case-7-connect-windows-hosts-over-winrm) for Windows-specific settings.

---

### Navigate the Hosts tab

Open your inventory from **IaCM** > **Inventories** to land on the **Hosts** tab. The inventory detail page has four tabs: **Hosts**, **Variables**, **Activity History**, and **Configuration**. The Hosts tab uses a two-panel layout:

- **Left panel:** Groups in the inventory, plus **All Hosts**. Selecting a group filters the table to its members. Dynamic inventories list each source here as a group.
- **Right panel:** The host table for the current selection, showing each host address and its group membership.

---

### Add a host

Follow the interactive guide or the step-by-step instructions to add hosts and groups.

<Tabs>
<TabItem value="Interactive guide">

<DocVideo src="https://app.tango.us/app/embed/70d709cc-80a3-471c-b741-ea3d78ae6785?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Add an Ansible Host" />

</TabItem>
<TabItem value="Step-by-step">

To add a host to a static inventory, do the following:

1. On the **Hosts** tab, select **+ New Host**. The **Host Configuration** panel opens.
2. Enter the **Host Address**. Use a DNS name (`web1.example.com`) or an IP address (`10.0.1.25`).
3. Optionally, under **Select groups (optional)**, assign the host to one or more existing groups.
4. Select **Apply Changes**.

</TabItem>
</Tabs>

:::info
In dynamic inventories, hosts are resolved from sources at run time and cannot be added manually. Go to [Create Ansible inventories](/docs/infra-as-code-management/configuration-management/ansible/inventories) to configure dynamic sources. You can still create groups and variables manually in a dynamic inventory.
:::

---

### Add host variables

Host variables apply to one machine and take precedence over group and inventory variables, which makes them the right place for per-host connection settings and overrides.

To add variables to a host, do the following:

1. In the host table, select the **⋮** menu on the host row, then select **Edit**. The **Host Configuration** panel opens with two tabs: **Configuration** and **Variables**.
2. Open the **Variables** tab.
3. Select **+ Add Variable** and fill in the row: a **Type** (**String** or **Secret**), a **Key**, and a **Value**.
4. Select **Apply Changes**.

Common host variables include connection settings (`ansible_host`, `ansible_user`, `ansible_port`) and role-specific values a playbook consumes with `{{ variable_name }}`. Store credentials such as private keys or passwords as **secret**-type variables so Harness masks them in logs. Go to [Add and reference text secrets](/docs/platform/secrets/add-use-text-secrets) to manage the underlying secrets.

---

### Create a group

Groups map to the `hosts:` directive in your playbooks. A play with `hosts: webservers` runs against every member of the `webservers` group.

To create a group, do the following:

1. On the **Hosts** tab, select **+ New Group**. The **Group Configuration** panel opens.
2. Enter a **Group name**.
3. Under **Select hosts that belong to this group**, search for and select member hosts.
4. Select **Apply Changes**.

A host can belong to multiple groups, and membership can be managed from either side: assign groups when editing a host, or assign hosts when editing a group.

---

### Add group variables

Group variables apply to every member of the group and sit between inventory variables and host variables in precedence. Use them for tier-wide settings, for example `http_port: 8080` on `webservers`.

To add group variables, select the group in the left panel, open its configuration, and add variable rows the same way as host variables. Secret-type values are supported.

:::tip
Follow Ansible's own precedence intuition: put broad defaults on the inventory, tier-specific values on groups, and machine-specific exceptions on hosts. This keeps playbooks free of hardcoded environment details.
:::

---

### Delete hosts and groups

To remove a host or group, select the **⋮** menu on its row, select **Delete**, and confirm. Deleting a group does not delete its member hosts; they remain in the inventory and in any other groups. In a static inventory you can delete the final variable on a group without deleting the group itself.

---

## Troubleshooting

<Troubleshoot
  issue="Ansible playbook skips hosts because the group name in the play does not match the Harness IaCM inventory group"
  mode="general"
  fallback="The hosts: value in the play must match the group name in the inventory exactly, including case. For dynamic inventories, the group name is the source identifier."
/>

<Troubleshoot
  issue="Host variable not applied during Ansible run in Harness IaCM pipeline"
  mode="general"
  fallback="Check precedence: host variables override group variables, which override inventory variables. Confirm the key is spelled identically to the reference in the playbook, which is case-sensitive."
/>

<Troubleshoot
  issue="SSH connection failure from Harness IaCM Ansible plugin to a newly added host"
  mode="general"
  fallback="Confirm the delegate can reach the host address on port 22, the ansible_user is correct, and the private key is supplied as a secret-type variable. For first-time connections, manage host key verification with ansible_ssh_common_args or ssh-keyscan."
/>

---

## Next steps

Your inventory now describes real machines with the variables Ansible needs to reach and configure them.

- Go to [Create Ansible playbooks](/docs/infra-as-code-management/configuration-management/ansible/playbooks) to register the automation that targets these hosts.
- Go to [Create Ansible inventories](/docs/infra-as-code-management/configuration-management/ansible/inventories) to add dynamic sources alongside manual groups.
- Go to [Get started with Ansible](/docs/infra-as-code-management/configuration-management/ansible/get-started) to run your first playbook against this inventory from a pipeline.
