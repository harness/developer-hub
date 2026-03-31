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

The scenarios below are **patterns**, not product clicks: they show how inventories, playbooks, and `IACMAnsiblePlugin` fit problems teams hit after they complete [Get started with Ansible in IaCM](/docs/infra-as-code-management/configuration-management/ansible/get-started). Each use case explains **when it applies**, the moving parts, and a representative playbook so you can adapt the idea to your repositories and naming.

If you need the conceptual map first, read [Ansible in IaCM — Overview](/docs/infra-as-code-management/configuration-management/ansible/overview).

---

## Use Case 1: Provision and Configure a Web Server Fleet

**When this applies:** Your compute tier is created by Terraform or OpenTofu (for example EC2 behind a load balancer), and you must install packages, deploy artifacts, and harden networking on those instances **every time** the fleet changes, without manual SSH.

You already use IaCM for the apply; the next stage is configuration that tracks infrastructure churn. A **dynamic inventory** linked to the same workspace keeps host lists aligned with state, and filters let you scope to a role such as `webserver` so databases are never touched by the web playbook.

**Scenario:** Your team uses Terraform to provision a fleet of EC2 instances behind an Application Load Balancer. After provisioning, you need to install and configure Nginx, deploy your application artifact, and enable the firewall — all without human intervention.

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
  fallback="A dynamic inventory reads workspace outputs so host lists stay aligned with what was just provisioned. See [Ansible in IaCM — Overview](/docs/infra-as-code-management/configuration-management/ansible/overview) and [Get started — Create an Inventory](/docs/infra-as-code-management/configuration-management/ansible/get-started#step-1-create-an-inventory)."
/>

<FAQ
  question="How do I pass values such as a build or application version into an Ansible playbook in IaCM?"
  mode="docs"
  fallback="Define keys on the inventory [Variables](/docs/infra-as-code-management/configuration-management/ansible/get-started#add-variables) tab (including secrets) and reference them in the playbook as Ansible variables. For pipeline-level values, use [runtime inputs](/docs/platform/variables-and-expressions/runtime-inputs) or [pipeline variables](/docs/platform/variables-and-expressions/add-a-variable)."
/>

**Next steps for this pattern**

- Refine **filters** so only the intended role receives the play (for example by tag or Name).
- Add a **smoke test** stage after Ansible that hits the load balancer health check.
- Return to [Get started with Ansible in IaCM](/docs/infra-as-code-management/configuration-management/ansible/get-started) if you still need to register inventories or the plugin step.

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
  fallback="Add a [Cron trigger](/docs/platform/triggers/schedule-pipelines-using-cron-triggers) on the pipeline. For production gates, use an [approval step](/docs/infra-as-code-management/pipelines/operations/approval-step) before the Ansible stage."
/>

**Next steps for this pattern**

- Add **approval** steps in front of the Ansible stage for production.
- Capture **pre- and post-patch** health checks as small play sections or separate pipeline steps.
- See [Ansible in IaCM — Overview](/docs/infra-as-code-management/configuration-management/ansible/overview) for how static inventories fit the mental model.

---

## Use Case 3: Multi-Environment Configuration with Variable Overrides

**When this applies:** You want **one playbook** and **different behavior per environment** (dev, staging, prod) without forking YAML. Inventory-level variables in Harness carry environment truth; the playbook stays generic Jinja2.

Choose this when drift between environments is mostly **configuration values**, not different task sequences.

**Scenario:** You have three environments — `dev`, `staging`, and `prod` — each requiring different application configurations (log levels, database endpoints, feature flags). You want a single playbook that adapts based on the target environment, driven by inventory-level variables.

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
  fallback="Secret-type variables on the inventory [Variables](/docs/infra-as-code-management/configuration-management/ansible/get-started#add-variables) tab store sensitive values in Harness and are masked in logs. You can combine this with your existing secrets tooling inside the Ansible image if required."
/>

<FAQ
  question="What if prod needs an extra task, not just different values?"
  mode="fallback-only"
  fallback="Use conditional tasks when differences are small; when task graphs truly diverge, separate playbooks or roles per environment are often clearer than heavy Jinja branching."
/>

**Next steps for this pattern**

- Name variables **consistently** across inventories so the same playbook never needs forked keys.
- Document required keys in your playbook repo README and fail fast with explicit checks.
- Revisit [Get started — Add Variables](/docs/infra-as-code-management/configuration-management/ansible/get-started#add-variables) for the product workflow.

---

## Use Case 4: Bootstrap New Kubernetes Worker Nodes

**When this applies:** Terraform provisions **Linux workers** that must join a cluster before scheduling workloads. The dynamic inventory picks up new nodes from the provisioning workspace; Ansible installs runtime and runs `kubeadm join` (or your approved bootstrap path).

Use this when **node bring-up** is repeatable and you want it tied to the same pipeline that created the instance.

**Scenario:** Your platform team provisions new worker nodes via Terraform and needs to bootstrap them — install the container runtime, configure kubelet, and join them to the cluster — before the node is available to receive workloads.

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
  fallback="Add them on the inventory [Variables](/docs/infra-as-code-management/configuration-management/ansible/get-started#add-variables) tab using the **secret** type (or **string** for non-secrets) so playbooks reference Ansible variables without storing credentials in Git."
/>

<FAQ
  question="Is dynamic inventory required for this pattern?"
  mode="fallback-only"
  fallback="No — static inventories work if your node set is fixed. Dynamic inventory reduces manual updates when Terraform scales the worker pool."
/>

**Next steps for this pattern**

- Align **Terraform outputs** (for example API endpoint, labels) with variable names your playbook expects.
- Add **idempotency** guards (such as `creates` on join) so reruns do not break joined nodes.
- Chain stages are documented in [Get started — Step 4](/docs/infra-as-code-management/configuration-management/ansible/get-started#step-4-integrate-ansible-with-a-pipeline).

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
  fallback="Use a [Cron trigger](/docs/platform/triggers/schedule-pipelines-using-cron-triggers) on the pipeline so hardening runs on its own cadence, separate from application deploy pipelines if you prefer."
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

## Next steps

- [Get started with Ansible in IaCM](/docs/infra-as-code-management/configuration-management/ansible/get-started) — Walk through inventory, playbook, and pipeline setup in the UI.
- [Ansible in IaCM — Overview](/docs/infra-as-code-management/configuration-management/ansible/overview) — Reinforce concepts and good practices.
- [IaCM Best Practices](/docs/infra-as-code-management/iacm-best-practices/) — Structure pipelines and workspaces at scale.
