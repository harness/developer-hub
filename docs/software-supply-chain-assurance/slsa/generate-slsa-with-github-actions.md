---
title: Generate SLSA Provenance with Harness GitHub Actions
description: Use Harness GitHub Actions to Generate SLSA Provenance
sidebar_position: 11
redirect_from:
---

Harness GitHub Actions provide a seamless way to integrate Harness's Software Supply Chain Security (SCS) capabilities directly into GitHub workflows. You can use this GitHub Action to perform various supply chain security tasks. 
The Harness GitHub Action includes multiple sub-actions, each designed for specific tasks. This document focuses on the `harness/github-actions/slsa-generation` sub-action, which is used to generate an SBOM and attest it if needed.

The `harness/github-actions/slsa-generation` is responsible for generating SLSA provenance and optionally attesting it. If attestation is enabled, the `.att` attestation file will be pushed to the configured container registry. The generated SLSA provenance can be found in the **Artifacts** section of the Harness **SCS (Software Supply Chain Security)** module.

:::info
The signing key must be Cosign generated and stored in HashiCorp Vault. Currently, only HashiCorp Vault is supported, but more Key Management Systems (KMS) will be supported in the near future.
:::

### Requirements

import GHActionReq from '/docs/software-supply-chain-assurance/shared/requirements-gh-actions.md';

<GHActionReq />

### Usage Example

```yaml
- name: SLSA Provenance Generation
  uses: harness/github-actions/slsa-generation
  with:
    HARNESS_ACCOUNT_URL: https://myaccount.harness.io
    HARNESS_ACCOUNT_ID: my_account_id_9YpRharzPs
    HARNESS_ORG_ID: my_org_id_default
    HARNESS_PROJECT_ID: example_project_id
    HARNESS_API_KEY: ${{ secrets.API_KEY_SAVED_AS_GH_SECRET }}
    VAULT_ADDR: ${{ secrets.VAULT_URL }}
    TARGET: example_image:latest
    ATTEST: true
    KMS_KEY: path/to/your/key
```

### Configuration

Make sure to include the required configurations from the [Requirements](#requirements) section in your workflow. Below are the specific configurations for the `slsa-generation` sub-action.

| **Key**           | **Value Example**         | **Description**                                                                      | **Required** |
|-------------------|---------------------------|--------------------------------------------------------------------------------------|-------------|
| `TARGET`          | `example_image:latest`    | The target artifact (Docker image) for generating SLSA provenance.                  | Yes         |
| `ATTEST`          | `true` or `false`           | Boolean flag to determine if attestation is required.                               | No          |
| `KMS_KEY`         | `path/to/your/key`        | Path to the Private key used for signing the attestation.                                   | No          |

### Sample workflow

Here's a sample workflow using the `harness/github-actions/slsa-generation`

```yaml
name: SLSA Provenance Generation Workflow

on:
  push:
    branches:
      - main

jobs:
  slsa-generation-job:
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

      # Step 3: Build and Tag Docker Image
      - name: Build and Tag Docker Image
        run: |
          docker build -t harness/github-service:latest -f ./stable/alpine/Dockerfile .
          echo "Docker image built and tagged as harness/github-service:latest."

      # Step 4: Push Docker Image to Docker Hub
      - name: Push Docker Image
        run: |
          docker push harness/github-service:latest
          echo "Docker image pushed to Docker Hub."

      # Step 5: Log in to Vault
      - name: Log in to Vault
        uses: hashicorp/vault-action@v2
        with:
          url: ${{ secrets.VAULT_URL }}
          method: token
          token: ${{ secrets.VAULT_TOKEN }}

      # Step 6: Run SLSA Provenance Generation
      - name: Run SLSA Provenance Action
        uses: harness/github-actions/slsa-generation
        with:
          TARGET: 'harness/github-service:latest'
          ATTEST: true
          KMS_KEY: 'cosign'

```