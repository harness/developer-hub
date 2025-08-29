---
title: Ansible Support
description: Learn how to use Ansible inventories and playbooks with Harness IaCM to manage infrastructure in your CI/CD workflows.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Infrastructure as Code Management (IaCM) integrates with Ansible so you can define your target machines (**inventories**) and apply automation tasks (**playbooks**) as part of your CI/CD pipelines.
- **Inventories** define where your automation runs.
- **Playbooks** define what automation is applied.

---

## Inventories
An inventory defines the machines and groups that your playbooks will target.

### Create a new inventory
1. In the IaCM module, navigate to **Inventories** and click **New Inventory**. 
2. Name your inventory and select either **Static** or **Dynamic**. 
   - **Static inventories** let you provide a list of host addresses directly in the UI. 
   - **Dynamic inventories** automatically populate hosts from your Terraform/OpenTofu configuration in the selected workspace.

### Configure inventory
:::info Add groups and hosts
From the new inventory page, you can create inventory groups, add hosts, and variables and review activity history such as executions. 
There is no specific order to add groups and hosts, as you can add hosts to groups and groups to hosts at any time.
:::

In the **Hosts** tab:
- **Add Group** → Name the group and assign hosts.
- **Add Host** → Enter host address, assign to one or more groups.

In the **Variables** tab:
- **Add Variable** → Enter variable type (string/secret), key, and value.

In the **Activity History** tab:
- View activity history, such as executions.

## Example inventories
<Tabs>
<TabItem value="static" label="Static">

### Static inventory example
When you create a static inventory in the UI, you manually enter host addresses.

**Example hosts list:**
- `web1.example.com`
- `db1.example.com`

The resulting inventory groups and hosts are visible in the **Hosts** tab.

</TabItem>
<TabItem value="dynamic" label="Dynamic">

### Dynamic inventory example
When you create a dynamic inventory, hosts are automatically pulled from the Terraform/OpenTofu configuration in your selected workspace.

For example, if your Terraform config defines two EC2 instances, the dynamic inventory shows those instances as hosts in the **Hosts** tab.

</TabItem>
</Tabs>

---

## Playbooks
A playbook describes the automation tasks to apply to your inventory.

<Tabs>
<TabItem value="interactive-guide" label="Interactive guide">

<DocVideo src="https://app.tango.us/app/embed/459c9186-6b20-461a-99ce-fe4aa725a8c9?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add an Ansible Playbook in Harness IaCM" />
</TabItem>
<TabItem value="step-by-step" label="Step-by-step">

1. From IaCM, navigate to **Playbooks** and click **New Playbook**.
2. **Name** your playbook.
3. Select a Git provider source of **Harness Code Repository** or Third-party Git provider.
4. Select your repository along with the Git fetch type, branch, and optional folder path.

Once your new playbook is added, you can run it against your selected inventory to automate tasks across your infrastructure. See the [example playbook](#example-playbook) below.
</TabItem>
</Tabs>


### Example playbook
<Tabs>
<TabItem value="sample-playbook" label="Sample playbook">

```yaml
- name: Configure web server infrastructure
  hosts: webservers
  become: yes
  tasks:
    - name: Ensure firewall is installed
      apt:
        name: ufw
        state: present

    - name: Allow HTTP traffic
      ufw:
        rule: allow
        port: '80'
        proto: tcp

    - name: Ensure firewall is enabled
      ufw:
        state: enabled
```
</TabItem>
<TabItem value="expected-output" label="Expected output">

Expect the output from the above playbook when you run it against the `webservers` group.

```bash
PLAY [Configure web server infrastructure] **************************************

TASK [Gathering Facts] **********************************************************
ok: [web1.example.com]

TASK [Ensure firewall is installed] *********************************************
changed: [web1.example.com]

TASK [Allow HTTP traffic] *******************************************************
changed: [web1.example.com]

TASK [Ensure firewall is enabled] ***********************************************
ok: [web1.example.com]

PLAY RECAP **********************************************************************
web1.example.com   : ok=4   changed=2   unreachable=0   failed=0
```
</TabItem>
</Tabs>

## Pipeline integration
Harness pipelines connect inventories and playbooks so you can run automation as part of your CI/CD workflows.

### Example pipeline:
```yaml
- step:
    type: Ansible
    name: Configure Firewall
    spec:
      inventory: "iacm-ansible-inventory"
      playbook: "infrastructure.yml"
```

### How it works:
- The pipeline uses the `iacm-ansible-inventory` inventory.
- It runs the `infrastructure.yml` playbook from your Git repo.
- Output is captured in the pipeline logs for traceability.

---

## Summary
- [Inventories](#inventories) define where your automation runs.  
- [Playbooks](#playbooks) define what automation is applied.  
- [Harness IaCM pipelines](#pipeline-integration) bring these together, making Ansible a first-class citizen in your CI/CD workflows.  

## Next steps
- Learn more about [IaCM best practices](/docs/infra-as-code-management/iacm-best-practices).
- Create and use infrastructure modules with [IaCM Module Registry](/docs/category/module-registry).
- Check out Harness IaCM [upcoming features](/roadmap/#iacm).