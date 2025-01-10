---
title: Harness Helm Charts Provenance
sidebar_label: Harness Helm Charts Provenance
date: 2025-01-09T23:00
sidebar_position: 12
---

# Harness Helm Charts Provenance

Harness Helm charts are now signed to ensure they are secure and trustworthy. 

Starting with version [0.24.0](/release-notes/self-managed-enterprise-edition), you can verify the integrity and origin of the charts using GPG keys with Helm's provenance feature.

## How to Verify Signed Helm Charts

### Step 1: Install GnuPG
First, ensure you have GnuPG installed to handle the GPG keys.

```bash
apk add --no-cache gnupg
```

### Step 2: Import the GPG Public Key
Import the Harness public key used to sign the charts. This key will be used to verify the signature.

```bash
gpg --keyserver hkps://keys.openpgp.org --receive-keys '6117ED4CA5F4605DBF4353F41F6E943934E6D138'
```

### Step 3: Convert Keyring to Legacy Format
Convert the GPG keyring to a legacy format to be recognized by Helm provenance verification.

```bash
gpg --export >~/.gnupg/pubring.gpg
gpg --export-secret-keys >~/.gnupg/secring.gpg
```

### Step 4: Verify the Helm Chart
Helm charts can be verified by downloading the chart or pulling it from the Helm repository.

#### a. Verify Downloaded Chart
Download the Helm chart and its corresponding provenance file from the GitHub releases page (`*.tgz` and `*.tgz.prov` under Assets).

```bash
helm verify harness-0.24.0.tgz
```

#### b. Verify Using Helm Repository
1. Add the Harness Helm repository:

   ```bash
   helm repo add harness https://harness.github.io/helm-charts/
   ```

2. Update the Helm repository:

   ```bash
   helm repo update
   ```

3. Pull the chart and verify it with the specified chart version:

   ```bash
   helm pull --verify harness/harness --version=0.24.0
   ```

### Step 5: Successful Verification
A successful verification will display output similar to the following:

```plaintext
Signed by: Harness Inc. (Main key for Helm chart signing) <secops@harness.io>
Using Key With Fingerprint: 6117ED4CA5F4605DBF4353F41F6E943934E6D138
Chart Hash Verified: sha256:a1af3a0b8b54050070e15953c1c964a595720be2640c59fb2df947c259d18247
```
***

:::info Additional Information
For more details on Helm chart signing and verification, please refer to the [official Helm documentation](https://helm.sh/docs/topics/provenance/).
:::