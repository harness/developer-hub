---
title: Discover an existing Harness SMP installation
sidebar_label: Discovery
description: Extract configuration from an existing Harness SMP installation so the SMP Operator can discover it.
sidebar_position: 4
keywords:
  - discovery
  - migration
  - generate-harness-values
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you have an existing Harness SMP installation and want it to be discovered by the Harness SMP Operator, use the script `generate-harness-values.sh` to extract your current configuration.

This topic covers what the script does, how to run it, the two files it generates, how to install with those files using either helm or clustermgr, and how to verify the result in the Installer UI.

---

## What the Script Does

The `generate-harness-values.sh` script connects to your running cluster, reads the existing Harness Helm release values and Kubernetes secrets, and generates the files needed for Operator to discover your existing installation.

---

## Usage

Download the script: [generate-harness-values.sh](./static/generate-harness-values.sh), and execute the following commands in your terminal.

```bash
# outputs two files: tfi-values.yaml and harness-values.yaml

# option 1: after downloading the script from this page
chmod +x generate-harness-values.sh
./generate-harness-values.sh

# option 2: if running from extracted clustermgr package
./values-migrator/generate-harness-values.sh
```

| Flag | Default | Description |
| --- | --- | --- |
| `-n, --namespace` | `harness` | Kubernetes namespace of existing Harness install |
| `-r, --release` | `harness` | Helm release name |

---

## Generated Files

The script generates two files:

1. **`tfi-values.yaml`** - Contains `cluster.tfi.*` values extracted from the existing install:

    ```yaml
    cluster:
      tfi:
        ci: false
        cd: true
        ccm: false
        sto: false
        srm: false
        ff: false
        chaos: false
        scs: false
        dbops: false
        code: false
        iacm: false
        idp: false
        harnessLicense: "..."
        postgresqlPassword: "..."
        mongodbPassword: "..."
        minioPassword: "..."
        additionalFeatureFlags: |
          FEATURE_FLAG_1
          FEATURE_FLAG_2
    ```

2. **`harness-values.yaml`** - Contains Helm values (`global:` and `harness:` sections, excluding module flags and license which are in `tfi-values.yaml`).

---

## Install with Discovered Values

After the script generates the two files, pass them to your install command. In this step, the install command supplies your existing configuration to the operator.

<Tabs>
<TabItem value="helm-t1" label="helm" default>

```bash
helm install platform-installer ./platform-installer-<VERSION>.tgz -n harness --create-namespace \
  -f tfi-values.yaml \
  --set-file cluster.helmValues.harness=harness-values.yaml \
  -f override.yaml \
  -f override-<ingress>.yaml
```

- Use the generated `tfi-values.yaml` and `harness-values.yaml` with `helm install`.
- Reference the appropriate override and ingress files from the [Configure and Install](/docs/self-managed-enterprise-edition/smp-operator/install/install-with-smp-operator#step-2-configure-and-install) section.

</TabItem>
<TabItem value="clustermgr-t1" label="clustermgr">

After running the script, use the generated files with `clustermgr install-pi`:

```bash
./clustermgr install-pi \
  --dns <your-dns> \
  --namespace harness \
  --email <admin-email> \
  --password '<password>' \
  --version <version> \
  --multi-node \
  --pi-set cluster.triggerInstall=false \
  --pi-set cluster.tfi.storageClass=<storage-class> \
  --pi-set cluster.profile=<profile-type> \
  --pi-values tfi-values.yaml \
  --pi-set-file cluster.helmValues.harness=harness-values.yaml
```

For air-gapped environments, add the registry flags:

```bash
./clustermgr install-pi \
  --dns <your-dns> \
  --namespace harness \
  --registry-host registry.example.com \
  --registry-prefix your-prefix \
  --registry-user <user> \
  --registry-password '<password>' \
  --email <admin-email> \
  --password '<password>' \
  --version <version> \
  --multi-node \
  --pi-set cluster.triggerInstall=false \
  --pi-set cluster.tfi.storageClass=<storage-class> \
  --pi-set cluster.profile=<profile-type> \
  --pi-values tfi-values.yaml \
  --pi-set-file cluster.helmValues.harness=harness-values.yaml
```

</TabItem>
</Tabs>

---

## Post-Discovery Verification

1. Access the Installer UI at `https://<YOUR_DNS>/pi`
2. Navigate to **Global Variables** and verify that modules, license, and database passwords are populated correctly
3. Navigate to **Helm Releases → harness → user/values.yaml** and verify the values from `harness-values.yaml` are populated
