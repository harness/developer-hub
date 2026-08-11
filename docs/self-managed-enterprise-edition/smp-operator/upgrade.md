---
title: Upgrade
sidebar_label: Upgrade
description: Upgrade the SMP Operator and the Harness Platform through the Installer UI.
sidebar_position: 4
keywords:
  - upgrade
  - operator upgrade
  - platform upgrade
  - installer ui
  - workflow bundle
  - air-gapped upgrade
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

You can upgrade the Harness SMP Operator and the Harness Platform separately, and perform both upgrades through the Installer UI. An operator upgrade updates the `platform-installer` Helm release, and a platform upgrade updates Harness SMP itself.

There are two upgrade types, and each one targets a different component.

- **Operator upgrade**: Upgrades the `platform-installer` Helm release.
- **Platform upgrade**: Upgrades the Harness SMP.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Upgrade the operator](#upgrade-the-operator) to a newer Harness Operator version.
- [Upgrade the platform](#upgrade-the-platform) by uploading and applying a workflow bundle.

---

## Before you begin

Before you upgrade, ensure you have the following:

- **A running installation**: A deployed SMP Operator that passes the verification checks. For more information, see <a href="/docs/self-managed-enterprise-edition/smp-operator/install/post-installation-checks" target="_blank">Post-installation checks</a>.
- **Installer UI access**: The admin email and password you supplied during installation, and the DNS hostname you installed with.
- **Target versions**: The operator version or workflow version you upgrade to. For more information, see <a href="/docs/self-managed-enterprise-edition/smp-operator/releases" target="_blank">Releases</a>.
- **Private registry contents (air-gapped only)**: The target operator version mirrored into your private registry.


---

## Upgrade the operator

An operator upgrade updates the `platform-installer`. Trigger it from the Installer UI by supplying the version you want.

1. Open the Installer UI at `https://<YOUR_DNS>/pi`
2. Navigate to **Upgrade Cluster** → **Upgrade Operator**
3. Enter the Harness Operator version you want to upgrade to
4. Click **Trigger Upgrade**

:::note Air-gapped environments

For air-gapped customers, the operator version you want to upgrade to must already be available in your private registry before initiating the upgrade.

:::

---

## Upgrade the platform

A workflow upgrade is performed when upgrading Harness SMP. Download the workflow bundle for the target version, upload it through the Installer UI, and then apply it.

### Step 1: Download the workflow bundle

Retrieve the workflow bundle for the version you upgrade to.

```bash
curl -L -o workflow-<VERSION>.tgz \
  "https://pkg.harness.io/pkg/G_iX-gJ_SiSGIITUoe06eQ/platform-installer/files/harness-clustermgr/<VERSION>/workflow-<VERSION>.tgz"
```

### Step 2: Upload via the Installer UI

Make the downloaded bundle available to the operator.

1. Open the Installer UI at `https://<YOUR_DNS>/pi`
2. Navigate to **Upgrade Cluster**
3. Click **Upload Workflow Version** and upload the `workflow-<VERSION>.tgz` file

### Step 3: Apply the upgrade

Select the version you uploaded and confirm the changes to start the upgrade.

1. Select the uploaded version from the dropdown
2. Click **Next**
3. Review the changes
4. Click **Apply**

---

## Related articles

- <a href="/docs/self-managed-enterprise-edition/smp-operator/releases" target="_blank">Releases</a>: Look up the latest operator and workflow versions.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/install/post-installation-checks" target="_blank">Post-installation checks</a>: Verify the deployment after an upgrade completes.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/troubleshooting" target="_blank">Troubleshooting and support</a>: Resolve common issues.
