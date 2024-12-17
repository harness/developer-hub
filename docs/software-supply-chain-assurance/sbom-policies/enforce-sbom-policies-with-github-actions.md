---
title: Verify SBOM and Enforce policies with GitHub Actions
description: Use SCS GitHub Actions to implement SBOM Verification and Policy Enforcement.
sidebar_position: 22
---

Harness GitHub Actions provide a seamless way to integrate Harness's Software Supply Chain Security (SCS) capabilities directly into GitHub workflows. You can use this GitHub Action to perform various supply chain security tasks. 
The Harness GitHub Action includes multiple sub-actions, each designed for specific tasks. This document focuses on the `harness/github-actions/sbom-policy-enforcement` sub-action, which is used to generate an SBOM and attest it if needed.

The `harness/github-actions/sbom-policy-enforcement` verifies the SBOM attestation and enforces policies on the SBOM. The policies applied are *Harness SBOM Policies*. For more information on creating and managing SBOM policies, refer to the [Harness SBOM Policies Documentation](https://developer.harness.io/docs/software-supply-chain-assurance/sbom-policies/create-sbom-policies).

import NotesForKeysAndVault from '/docs/software-supply-chain-assurance/shared/note-key-gen-vault-support.md';

:::info
<NotesForKeysAndVault />
:::

### Requirements

import GHActionReq from '/docs/software-supply-chain-assurance/shared/requirements-gh-actions.md';

<GHActionReq />

### Usage Example

```yaml
- name: SBOM Policy Enforcement
  uses: harness/github-actions/sbom-policy-enforcement
  with:
    HARNESS_ACCOUNT_URL: https://myaccount.harness.io
    HARNESS_ACCOUNT_ID: my_account_id_9YpRharzPs
    HARNESS_ORG_ID: my_org_id_default
    HARNESS_PROJECT_ID: example_project_id
    HARNESS_API_KEY: ${{ secrets.API_KEY_SAVED_AS_GH_SECRET }}
    VAULT_ADDR: ${{ secrets.VAULT_URL }}
    TARGET: example_image:latest
    VERIFY: true
    POLICY_SET_REF: github_opa_policy
    KMS_KEY: path/to/your/key
```

### Configuration

Make sure to include the required configurations from the [Requirements](#requirements) section in your workflow. Below are the specific configurations for the `sbom-policy-enforcement` sub-action.

| **Key**            | **Value Example**            | **Description**                                                                 | **Required** |
|--------------------|------------------------------|---------------------------------------------------------------------------------|-------------|
| `TARGET`           | `example_image:latest`       | The target artifact (Docker image) for SBOM verification and policy enforcement.| Yes         |
| `VERIFY`           | `true` or `false`              | Boolean flag to determine if attestation verification is required.              | Yes         |
| `POLICY_SET_REF`   | `github_opa_policy`          | The reference to the Harness SBOM policy set to be enforced.                    | Yes         |
| `KMS_KEY`          | `path/to/your/key`           | Path to the Public key used for verifying the attestation.                             | Yes          |

### Sample workflow

Here's a sample workflow using the `harness/github-actions/sbom-policy-enforcement`

```yaml
name: SBOM Verification and Policy Enforcement Workflow

on:
  push:
    branches:
      - main

jobs:
  sbom-generation-job:
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

      # Step 6: Run SBOM Verification and Policy Enforcement
      - name: Run SBOM Policy Enforcement Action
        uses: harness/github-actions/sbom-policy-enforcement
        with:
          TARGET: 'harness/github-service:latest'
          VERIFY: true
          KMS_KEY: 'cosign'
          POLICY_SET_REF: 'github_opa_policy'

```
