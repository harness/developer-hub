---
title: Example Ansible Use Cases
description: Apply Harness IaCM Ansible integration to web fleets, database patching, multi-environment configuration, Kubernetes node bootstrap, and compliance hardening.
keywords:
  - ansible
  - IaCM
  - use cases
  - playbooks
  - dynamic inventory
tags:
  - iacm
  - ansible
  - configuration
sidebar_position: 30
---

import { FAQ } from '@site/src/components/AdaptiveAIContent';

The scenarios below are **patterns**, not product clicks: they show how inventories, playbooks, and `IACMAnsiblePlugin` fit problems teams hit after they complete [Get started with Ansible in IaCM](/docs/infra-as-code-management/configuration-management/ansible/get-started). Each use case explains **when it applies**, the moving parts, and a representative example so you can adapt the idea to your repositories and naming.

Go to [Ansible in IaCM overview](/docs/infra-as-code-management/configuration-management/ansible/overview) to review the conceptual map first.

---

## Use Case 1: Provision and Configure a Web Server Fleet

**When this applies:** Your compute tier is created by Terraform or OpenTofu (for example EC2 behind a load balancer), and you must install packages, deploy artifacts, and harden networking on those instances **every time** the fleet changes, without manual SSH.

You already use IaCM for the apply; the next stage is configuration that tracks infrastructure churn. A **dynamic inventory** linked to the same workspace keeps host lists aligned with state, and filters let you scope to a role such as `webserver` so databases are never touched by the web playbook.

**Scenario:** Your team uses Terraform to provision a fleet of EC2 instances behind an Application Load Balancer. After provisioning, you need to install and configure Nginx, deploy your application artifact, and enable the firewall, all without human intervention.

**Setup:**

1. Create a **dynamic inventory** linked to the Terraform workspace that manages your EC2 fleet.
2. Add a filter to include only hosts where `tags.Role` contains `webserver`.
3. Register a playbook stored at `playbooks/configure-web.yml` in your application repo.
4. Add the `IACMAnsiblePlugin` step immediately after the `IACMTerraformPlugin` (apply) step in your pipeline.

**Playbook (`configure-web.yml`):**

```yaml
- name: Configure web servers
  hosts: webservers
  become: yes
  vars:
    app_version: "{{ lookup('env', 'APP_VERSION') }}"
    app_artifact_url: "https://artifacts.example.com/app-{{ app_version }}.tar.gz"
  tasks:
    - name: Install Nginx
      apt:
        name: nginx
        state: present
        update_cache: yes

    - name: Download and extract application artifact
      unarchive:
        src: "{{ app_artifact_url }}"
        dest: /var/www/html
        remote_src: yes

    - name: Configure Nginx virtual host
      template:
        src: templates/nginx-vhost.conf.j2
        dest: /etc/nginx/sites-available/app
      notify: Reload Nginx

    - name: Enable site
      file:
        src: /etc/nginx/sites-available/app
        dest: /etc/nginx/sites-enabled/app
        state: link

    - name: Ensure Nginx is running
      service:
        name: nginx
        state: started
        enabled: yes

  handlers:
    - name: Reload Nginx
      service:
        name: nginx
        state: reloaded
```

**Result:** Every time the Terraform workspace provisions or replaces EC2 instances, the pipeline automatically configures them. Zero manual SSH sessions required.

<FAQ
  question="Why use a dynamic IaCM inventory for Ansible when Terraform or OpenTofu provisions the hosts?"
  mode="docs"
  fallback="A dynamic inventory reads workspace outputs so host lists stay aligned with what was just provisioned. Go to [Ansible in IaCM overview](/docs/infra-as-code-management/configuration-management/ansible/overview) to understand the mental model, and go to [create an inventory](/docs/infra-as-code-management/configuration-management/ansible/get-started#step-1-create-an-inventory) to configure one."
/>

<FAQ
  question="How do I pass values such as a build or application version into an Ansible playbook in IaCM?"
  mode="docs"
  fallback="Define keys on the inventory variables tab (including secrets) and reference them in the playbook as Ansible variables. Go to [add variables](/docs/infra-as-code-management/configuration-management/ansible/get-started#add-variables) to configure them. For pipeline-level values, use [runtime inputs](/docs/platform/variables-and-expressions/runtime-inputs) or [pipeline variables](/docs/platform/variables-and-expressions/add-a-variable)."
/>

**Next steps for this pattern**

- Refine **filters** so only the intended role receives the play (for example by tag or Name).
- Add a **smoke test** stage after Ansible that hits the load balancer health check.
- Go to [Get started with Ansible in IaCM](/docs/infra-as-code-management/configuration-management/ansible/get-started) to register inventories or the plugin step if you have not done so yet.

---

## Use Case 2: Rolling OS Patch Across a Database Cluster

**When this applies:** You run a **small, stateful cluster** (for example PostgreSQL) where maintenance must happen **one node at a time**, with explicit ordering between replicas and primary. Static inventories mirror your known topology, and scheduled pipelines give predictable patch windows.

This pattern fits teams that value **controlled blast radius** over automatically discovered hosts; the playbook itself encodes order (`serial`, multiple plays) because orchestration is the hard part, not discovery.

**Scenario:** You maintain a three-node PostgreSQL cluster and need to apply monthly OS security patches with zero downtime. Hosts must be patched one at a time, with the primary gracefully relinquishing leadership before each patch cycle.

**Setup:**

1. Create a **static inventory** with three groups: `primary`, `replica_1`, `replica_2`.
2. Register a playbook at `ops/rolling-patch.yml`.
3. Schedule a monthly pipeline run using a Harness pipeline trigger with a cron expression.

**Playbook (`rolling-patch.yml`):**

```yaml
- name: Rolling patch - replicas first
  hosts: replica_1:replica_2
  serial: 1
  become: yes
  tasks:
    - name: Update package cache
      apt:
        update_cache: yes

    - name: Apply security patches
      apt:
        upgrade: dist
        only_upgrade: yes

    - name: Reboot if required
      reboot:
        reboot_timeout: 300

- name: Rolling patch - primary
  hosts: primary
  become: yes
  tasks:
    - name: Trigger failover to replica
      command: pg_ctl promote -D /var/lib/postgresql/data
      become_user: postgres
    - name: Trigger failover to replica
      command: pg_ctl promote -D /var/lib/postgresql/data
      become_user: postgres
      register: promote_result
      failed_when: promote_result.rc != 0 and 'already' not in promote_result.stderr

    - name: Wait for replica to assume primary
      pause:
        seconds: 30

    - name: Update package cache
      apt:
        update_cache: yes

    - name: Apply security patches
      apt:
        upgrade: dist
        only_upgrade: yes

    - name: Reboot
      reboot:
        reboot_timeout: 300
```

**Result:** Security patches are applied to each node in sequence, with the primary only patched after replicas are healthy. Full audit trail available in Harness pipeline logs.

<FAQ
  question="Can IaCM order patch waves without encoding serial in the playbook?"
  mode="fallback-only"
  fallback="Harness runs the playbook you supply; use Ansible directives like serial or separate plays (as in this example) to express ordering. Keep cluster-specific failover steps in the playbook or in wrapped roles your team owns."
/>

<FAQ
  question="How do I schedule a Harness pipeline on a cron (for example for monthly database patching)?"
  mode="docs"
  fallback="Go to [schedule pipelines using cron triggers](/docs/platform/triggers/schedule-pipelines-using-cron-triggers) to add a cron trigger on the pipeline. For production gates, go to [approval step](/docs/infra-as-code-management/pipelines/operations/approval-step) to add approval before the Ansible stage."
/>

**Next steps for this pattern**

- Add **approval** steps in front of the Ansible stage for production.
- Capture **pre- and post-patch** health checks as small play sections or separate pipeline steps.
- Go to [Ansible in IaCM overview](/docs/infra-as-code-management/configuration-management/ansible/overview) to understand how static inventories fit the mental model.

---

## Use Case 3: Multi-Environment Configuration with Variable Overrides

**When this applies:** You want **one playbook** and **different behavior per environment** (dev, staging, prod) without forking YAML. Inventory-level variables in Harness carry environment truth; the playbook stays generic Jinja2.

Choose this when drift between environments is mostly **configuration values**, not different task sequences.

**Scenario:** You have three environments (`dev`, `staging`, and `prod`), each requiring different application configurations (log levels, database endpoints, feature flags). You want a single playbook that adapts based on the target environment, driven by inventory-level variables.

**Setup:**

1. Create **separate inventories** for each environment with environment-specific variables set in each inventory's **Variables** tab.
2. Use a **single playbook** with Jinja2 variable references.
3. Create a pipeline per environment that selects the correct inventory.

**Inventory variables (prod inventory):**

| Key | Type | Value |
|---|---|---|
| `log_level` | string | `error` |
| `db_host` | string | `prod-db.internal` |
| `db_port` | string | `5432` |
| `enable_feature_x` | string | `false` |
| `db_password` | secret | `<secret_ref>` |

**Playbook (`configure-app.yml`):**

```yaml
- name: Configure application
  hosts: all
  become: yes
  tasks:
    - name: Render application config
      template:
        src: templates/app-config.j2
        dest: /etc/myapp/config.yml
      vars:
        log_level: "{{ log_level | default('info') }}"
        db_host: "{{ db_host }}"
        db_port: "{{ db_port | default('5432') }}"
        enable_feature_x: "{{ enable_feature_x | default('false') }}"

    - name: Restart application service
      service:
        name: myapp
        state: restarted
```

**Result:** The same playbook handles all environments. Variable differences are managed through Harness inventory variables, keeping your playbook DRY and version-controlled.

<FAQ
  question="Why use Harness secret-type variables on an IaCM Ansible inventory?"
  mode="docs"
  fallback="Secret-type variables on the inventory variables tab store sensitive values in Harness and are masked in logs. Go to [add variables](/docs/infra-as-code-management/configuration-management/ansible/get-started#add-variables) to configure them. You can combine this with your existing secrets tooling inside the Ansible image if required."
/>

<FAQ
  question="What if prod needs an extra task, not just different values?"
  mode="fallback-only"
  fallback="Use conditional tasks when differences are small; when task graphs truly diverge, separate playbooks or roles per environment are often clearer than heavy Jinja branching."
/>

**Next steps for this pattern**

- Name variables **consistently** across inventories so the same playbook never needs forked keys.
- Document required keys in your playbook repo README and fail fast with explicit checks.
- Go to [add variables](/docs/infra-as-code-management/configuration-management/ansible/get-started#add-variables) to review the product workflow for setting inventory variables.

---

## Use Case 4: Bootstrap New Kubernetes Worker Nodes

**When this applies:** Terraform provisions **Linux workers** that must join a cluster before scheduling workloads. The dynamic inventory picks up new nodes from the provisioning workspace; Ansible installs runtime and runs `kubeadm join` (or your approved bootstrap path).

Use this when **node bring-up** is repeatable and you want it tied to the same pipeline that created the instance.

**Scenario:** Your platform team provisions new worker nodes via Terraform and needs to bootstrap them (install the container runtime, configure kubelet, and join them to the cluster) before the node is available to receive workloads.

**Setup:**

1. Create a **dynamic inventory** linked to your node-provisioning Terraform workspace. Filter hosts by `role = worker`.
2. Store your bootstrap playbook in an ops repository.
3. Chain the Ansible step immediately after the Terraform apply step.

**Playbook (`bootstrap-worker.yml`):**

```yaml
- name: Bootstrap Kubernetes worker node
  hosts: all
  become: yes
  vars:
    kubernetes_version: "1.29"
    cluster_endpoint: "{{ k8s_api_endpoint }}"
  tasks:
    - name: Disable swap
      command: swapoff -a

    - name: Remove swap from fstab
      lineinfile:
        path: /etc/fstab
        regexp: '.*swap.*'
        state: absent

    - name: Install container runtime (containerd)
      apt:
        name: containerd
        state: present
        update_cache: yes

    - name: Configure containerd
      template:
        src: templates/containerd-config.toml.j2
        dest: /etc/containerd/config.toml
      notify: Restart containerd

    - name: Install kubeadm, kubelet, kubectl
      apt:
        name:
          - "kubeadm={{ kubernetes_version }}*"
          - "kubelet={{ kubernetes_version }}*"
          - "kubectl={{ kubernetes_version }}*"
        state: present

    - name: Join the cluster
    - name: Join the cluster
      command: "kubeadm join {{ cluster_endpoint }} --token {{ cluster_join_token }} --discovery-token-ca-cert-hash sha256:{{ cluster_ca_cert_hash }}"
      args:
        creates: /etc/kubernetes/kubelet.conf
      args:
        creates: /etc/kubernetes/kubelet.conf

  handlers:
    - name: Restart containerd
      service:
        name: containerd
        state: restarted
```

**Result:** New Kubernetes worker nodes are fully bootstrapped and joined to the cluster automatically within minutes of Terraform provisioning them, with no manual intervention from the platform team.

<FAQ
  question="How should I supply join tokens and API endpoints securely for Ansible in IaCM?"
  mode="docs"
  fallback="Add them on the inventory variables tab using the secret type (or string for non-secrets) so playbooks reference Ansible variables without storing credentials in Git. Go to [add variables](/docs/infra-as-code-management/configuration-management/ansible/get-started#add-variables) to configure them."
/>

<FAQ
  question="Is dynamic inventory required for this pattern?"
  mode="fallback-only"
  fallback="No, static inventories work if your node set is fixed. Dynamic inventory reduces manual updates when Terraform scales the worker pool."
/>

**Next steps for this pattern**

- Align **Terraform outputs** (for example API endpoint, labels) with variable names your playbook expects.
- Add **idempotency** guards (such as `creates` on join) so reruns do not break joined nodes.
- Go to [integrate Ansible with a pipeline](/docs/infra-as-code-management/configuration-management/ansible/get-started#step-4-integrate-ansible-with-a-pipeline) to review how to chain stages.

---

## Use Case 5: Compliance Hardening Across All Environments

**When this applies:** Security expects a **baseline posture** (for example CIS-style checks) on many Linux hosts on a **schedule**, with evidence in CI logs. Inventories can be broad dynamic sets or per-environment; the playbook encodes checks and remediations.

**Scenario:** Your security team requires all Linux hosts to conform to CIS Benchmark Level 1 hardening guidelines. You need to apply and verify hardening across hundreds of hosts, and surface any failures in the pipeline logs as a compliance record.

**Setup:**

1. Create a **dynamic inventory** that spans all environments, or run separate pipelines per environment using environment-specific inventories.
2. Store your hardening playbook in a dedicated `security` repository, versioned by release tag.
3. Run the pipeline on a nightly schedule and collect the output as a compliance report.

**Playbook (`cis-hardening.yml`, abbreviated):**

```yaml
- name: CIS Level 1 Hardening
  hosts: all
  become: yes
  tasks:
    - name: Ensure permissions on /etc/passwd are configured
      file:
        path: /etc/passwd
        owner: root
        group: root
        mode: '0644'

    - name: Ensure SSH root login is disabled
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: '^PermitRootLogin'
        line: 'PermitRootLogin no'
        state: present
      notify: Restart SSH

    - name: Ensure password expiration is 90 days or less
      lineinfile:
        path: /etc/login.defs
        regexp: '^PASS_MAX_DAYS'
        line: 'PASS_MAX_DAYS   90'

    - name: Ensure core dumps are restricted
      sysctl:
        name: fs.suid_dumpable
        value: '0'
        state: present
        reload: yes

  handlers:
    - name: Restart SSH
      service:
        name: sshd
        state: restarted
```

**Result:** Compliance hardening is applied consistently across all hosts with every pipeline run. Any host that fails a task is flagged in the pipeline logs, giving your security team a clear audit trail.

<FAQ
  question="How do I run an IaCM Ansible pipeline on a recurring schedule (for example nightly compliance checks)?"
  mode="docs"
  fallback="Go to [schedule pipelines using cron triggers](/docs/platform/triggers/schedule-pipelines-using-cron-triggers) to add a cron trigger so hardening runs on its own cadence, separate from application deploy pipelines if you prefer."
/>

<FAQ
  question="How do I avoid breaking SSH while testing sshd changes?"
  mode="fallback-only"
  fallback="Test sshd config with a parallel session before relying on handler restarts; in automation, use validated templates and staged rollouts (for example serial batches) for high-risk tasks."
/>

**Next steps for this pattern**

- Treat the playbook as **policy-as-code**: tag releases and pin Harness to known Git refs.
- Export or archive **pipeline logs** your auditors accept as evidence.
- Expand coverage with **profile-specific roles** maintained by your security team.

---

## Use Case 6: Manage SSH host key verification for dynamic or ephemeral hosts

**When this applies:** You're running Ansible against newly provisioned cloud instances, containers, or other short-lived hosts whose SSH fingerprints are not yet recorded on the delegate. SSH verifies a remote host's identity by checking its fingerprint against a `known_hosts` file on the machine initiating the connection. When a host is not in that file, SSH prompts the user to accept or reject the fingerprint. In automated pipelines there is no user to respond, so the run stalls or the connection fails.

This is especially common when running from a Harness delegate. The delegate is typically ephemeral: it starts with a clean environment and no existing `known_hosts` file. Target hosts provisioned in the same pipeline are also new, so every connection looks like a first-time attempt and triggers the authenticity prompt.

**Scenario:** Your pipeline provisions EC2 instances with Terraform and immediately runs Ansible against them. The delegate has no prior record of these hosts, so Ansible stalls at the SSH authenticity prompt and the playbook never starts.

**Option A: Disable strict host key checking**

Add the following variable to your inventory or host variables:

```yaml
ansible_ssh_common_args: '-o StrictHostKeyChecking=no'
```

This tells SSH to skip fingerprint verification and connect without prompting.

:::tip
Disabling strict host key checking removes SSH-level protection against host spoofing. Use this only in private networks or controlled environments where that risk is managed at the network layer.
:::

**Option B: Pre-populate the known_hosts file**

SSH trusts a host when its fingerprint already exists in `~/.ssh/known_hosts` before the connection. Add a setup step before your Ansible stage to scan each target host and write its fingerprint:

```bash
ssh-keyscan <host> >> ~/.ssh/known_hosts
```

For multiple hosts, iterate over the target list and run `ssh-keyscan` for each address. In automated environments this scan is typically a bootstrap or environment-prep step that runs before the Ansible stage, so all subsequent connections are trusted automatically. You can also connect to a host once manually and accept the fingerprint prompt to seed the file.

**Result:** Ansible connects to new or ephemeral hosts without blocking on fingerprint prompts, either by pre-loading fingerprints for strict SSH trust or by skipping verification in environments where network controls already limit that risk.

<FAQ
  question="Which approach should I use: disabling StrictHostKeyChecking or pre-populating known_hosts?"
  mode="docs"
  fallback="Disable StrictHostKeyChecking for ephemeral or internal environments where network-level controls manage man-in-the-middle risk. Pre-populate known_hosts when SSH-level host verification is required, for example in environments with stricter security policies."
/>

<FAQ
  question="Why does the Harness delegate not already have my hosts in known_hosts?"
  mode="docs"
  fallback="Harness delegates are often ephemeral, starting with a clean environment and no existing known_hosts file. Target hosts provisioned by the same pipeline are also new, so their fingerprints have never been recorded."
/>

**Next steps for this pattern**

- For dynamic host sets, combine Option B with a step that reads host IPs from Terraform outputs and runs `ssh-keyscan` across the full list before the Ansible stage.
- Go to [Get started with Ansible in IaCM](/docs/infra-as-code-management/configuration-management/ansible/get-started#add-variables) to add `ansible_ssh_common_args` as an inventory variable.
- Go to [Ansible in IaCM overview](/docs/infra-as-code-management/configuration-management/ansible/overview) to understand how inventory variables apply across hosts and host groups.

---

## Use Case 7: Connect Windows hosts over WinRM

**When this applies:** You need to run Ansible against Windows hosts. SSH is the standard connection method for Linux, but Windows uses WinRM (Windows Remote Management) as its native remote management protocol. WinRM lets Ansible connect to Windows hosts to run commands, execute PowerShell, and apply configuration changes.

The Ansible plugin image already has WinRM support built in. Setup is primarily on the inventory and host variables side, and on the Windows host itself. The Windows machine needs WinRM enabled and listening, and the authentication method you choose must also be enabled on that host. By default, Windows commonly has NTLM and Kerberos available; methods like Basic or CredSSP may need extra configuration.

**Scenario:** Your team provisions Windows Server instances and needs to apply configuration via Ansible: install software, apply registry settings, or run PowerShell scripts. The hosts are not Linux, so SSH is not available and WinRM is the connection method.

**Setup:**

1. Ensure WinRM is enabled and listening on each target Windows host. Run the following in PowerShell on the host: `Enable-PSRemoting -Force`.
2. In your Harness inventory, define these variables for each Windows host:

```yaml
ansible_connection: winrm
ansible_port: 5985
ansible_winrm_transport: ntlm
ansible_winrm_server_cert_validation: ignore
ansible_winrm_operation_timeout_sec: 60
ansible_winrm_read_timeout_sec: 60
ansible_user: Administrator
ansible_password: "{{ password }}"
```

3. Store `ansible_password` as a secret-type variable on the inventory **Variables** tab so it is masked in logs. Go to [add variables](/docs/infra-as-code-management/configuration-management/ansible/get-started#add-variables) to configure secret variables.

**Variable reference**

| Variable | Description |
|---|---|
| `ansible_connection: winrm` | Tells Ansible to use WinRM instead of SSH for this host. |
| `ansible_port` | `5985` for HTTP, `5986` for HTTPS. |
| `ansible_winrm_transport` | Authentication method. `ntlm` is a practical starting point for local accounts. |
| `ansible_winrm_server_cert_validation` | `ignore` when using self-signed or untrusted HTTPS certificates. Use `validate` with a properly trusted certificate in production. |
| `ansible_winrm_operation_timeout_sec` | How long the remote WinRM operation is allowed to run before timing out. |
| `ansible_winrm_read_timeout_sec` | How long Ansible waits for the overall response. Setting this slightly higher than the operation timeout avoids read errors on slower operations. |

**Transport options for `ansible_winrm_transport`**

- **`ntlm`:** A practical default for many starter setups, works well for local accounts and straightforward Windows connectivity.
- **`kerberos`:** Recommended for domain environments. Current Ansible guidance recommends Kerberos over HTTP in domain setups.
- **`basic`:** Simple, but credentials are not adequately protected at the transport layer without HTTPS.
- **`credssp`:** Useful in delegated-auth or double-hop scenarios. Use only when necessary as it carries added security risk.
- **`certificate`:** Certificate-based authentication, less common for initial setup but supported.

**A simple inventory example**

```yaml
all:
  hosts:
    winhost1:
      ansible_host: 10.0.0.25
      ansible_connection: winrm
      ansible_user: Administrator
      ansible_password: "{{ password }}"
      ansible_port: 5985
      ansible_winrm_transport: ntlm
      ansible_winrm_operation_timeout_sec: 60
      ansible_winrm_read_timeout_sec: 60
```

:::tip
For a first Windows setup: use `winrm` connection, `ntlm` transport, and port `5985` for HTTP. Set `ansible_winrm_server_cert_validation: ignore` while certificate validation is not yet configured. For domain-joined hosts, switch to `kerberos` over HTTP. For local accounts, `ntlm` or `basic` over HTTPS is the recommended route.
:::

**Result:** Ansible connects to Windows hosts over WinRM and can run PowerShell, apply configuration, and manage software the same way it manages Linux hosts over SSH.

<FAQ
  question="Which WinRM transport should I start with?"
  mode="docs"
  fallback="Start with ntlm for local accounts. For domain environments, kerberos over HTTP is preferred. For local accounts where you need HTTPS, ntlm or basic over HTTPS is recommended. Avoid basic without HTTPS as credentials are exposed at the transport layer."
/>

<FAQ
  question="Do I need to install WinRM libraries in my Ansible image?"
  mode="docs"
  fallback="The Harness Ansible plugin image already includes WinRM support. No additional installation is needed on the Harness side. The main requirement is enabling and configuring WinRM on the target Windows host itself."
/>

<FAQ
  question="When should I use ansible_winrm_server_cert_validation: ignore?"
  mode="fallback-only"
  fallback="Use ignore when connecting over HTTPS with a self-signed or untrusted certificate, typically during initial setup or testing. In production with a properly trusted certificate, use validate instead."
/>

**Next steps for this pattern**

- Go to [Get started with Ansible in IaCM](/docs/infra-as-code-management/configuration-management/ansible/get-started) to register your Windows inventory and add host variables.
- For domain environments, configure Kerberos on both the delegate and the target hosts before switching `ansible_winrm_transport` to `kerberos`.
- Go to [Ansible in IaCM overview](/docs/infra-as-code-management/configuration-management/ansible/overview) to understand how inventory variables and host groups work across mixed Linux and Windows targets.

---

## Next steps

- Go to [Get started with Ansible in IaCM](/docs/infra-as-code-management/configuration-management/ansible/get-started) to walk through inventory, playbook, and pipeline setup in the UI.
- Go to [Ansible in IaCM overview](/docs/infra-as-code-management/configuration-management/ansible/overview) to reinforce concepts and good practices.
- Go to [IaCM Best Practices](/docs/infra-as-code-management/iacm-best-practices/) to learn recommended patterns for structuring pipelines and workspaces at scale.
