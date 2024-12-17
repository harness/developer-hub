---
title: Ingest and Attest SBOM with Harness GitHub Actions
description: Ingest and Attest SBOM with Harness Github Actions
sidebar_position: 21
sidebar_label: Ingest SBOM with Harness GitHub Actions
---

Harness GitHub Actions provide a seamless way to integrate Harness's Software Supply Chain Security (SCS) capabilities directly into GitHub workflows. You can use this GitHub Action to perform various supply chain security tasks. 
The Harness GitHub Action includes multiple sub-actions, each designed for specific tasks. This document focuses on the `harness/github-actions/sbom-ingestion` sub-action, which is used to ingest an SBOM and attest it if needed.

The `harness/github-actions/sbom-ingestion` is responsible for feeding the Software Bill of Materials (SBOM) data to SCS and optionally attesting it. The SBOM will be saved to Harness and can be found in the Artifacts section. If attestation is enabled, the SBOM attestation will be signed, and the `.att` attestation file will be pushed to the configured container registry.

:::info
The signing key must be Cosign generated and stored in HashiCorp Vault. Currently, only HashiCorp Vault is supported, but more Key Management Systems (KMS) will be supported in the near future.
:::

### Requirements

import GHActionReq from '/docs/software-supply-chain-assurance/shared/requirements-gh-actions.md';

<GHActionReq />

### Usage Example

```yaml
- name: SBOM Ingestion
  uses: harness/github-actions/sbom-ingestion
  with:
    HARNESS_ACCOUNT_URL: https://myaccount.harness.io
    HARNESS_ACCOUNT_ID: my_account_id_9YpRharzPs
    HARNESS_ORG_ID: my_org_id_default
    HARNESS_PROJECT_ID: example_project_id
    HARNESS_API_KEY: ${{ secrets.API_KEY_SAVED_AS_GH_SECRET }}
    VAULT_ADDR: ${{ secrets.VAULT_URL }}
    TARGET: <image>:<tag>
    SBOM_FILE_PATH: <path_to_sbom_file>
    ATTEST: true
    KMS_KEY: <path_to_your_key>
```

### Configuration

Make sure to include the required configurations from the [Requirements](#requirements) section in your workflow. Below are the specific configurations for the `sbom-ingestion` sub-action.

| **Key**           | **Value Example**         | **Description**                                               | **Required** |
|-------------------|---------------------------|---------------------------------------------------------------|-------------|
| `TARGET`          | `example_image:latest`    | The target artifact (Docker image) for SBOM ingestion.        | Yes         |
| `SBOM_FILE_PATH`  | `path/to/sbom.json`       | The file path to the SBOM that needs to be ingested.          | Yes         |
| `ATTEST`          | `true` or `false`           | Boolean flag to determine if attestation is required.         | No          |
| `KMS_KEY`         | `path/to/your/key`        | Path to the Private key used for signing the attestation.             | No          |

### Sample workflow

Here's a sample workflow using the `harness/github-actions/sbom-ingestion`

```yaml

name: SBOM Generation Workflow

on:
  push:
    branches:
      - main

jobs:
  sbom-ingestion-job:
    runs-on: self-hosted

    env:
      HARNESS_ACCOUNT_URL: 'https://myaccount.harness.io'
      HARNESS_ACCOUNT_ID: '_myaccount_rzPs_JtWT7g'
      HARNESS_ORG_ID: 'SCS'
      HARNESS_PROJECT_ID: 'SCS_ID'
      HARNESS_API_KEY: ${{ secrets.SCS_API_KEY }}
      VAULT_ADDR: ${{ secrets.VAULT_URL }}

    steps:
      # Step 1: Checkout the main repository
      - name: Checkout Main Repository
        uses: actions/checkout@v3

      # Step 2: Log in to Docker Hub
      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      # Step 5: Log in to Vault
      - name: Log in to Vault
        uses: hashicorp/vault-action@v2
        with:
          url: ${{ secrets.VAULT_URL }}
          method: token
          token: ${{ secrets.VAULT_TOKEN }}

      # Step 6: Run SBOM Ingestion
      - name: Run SBOM Ingestion Action
        uses: harness/github-actions/sbom-ingestion
        with:
          TARGET: image/myimagetag
          SBOM_FILE_PATH: '/harness/shared/sbom.json'
          ATTEST: true
          KMS_KEY: 'path/to/my/key/in/vault'


```