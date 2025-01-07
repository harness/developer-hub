---
title: Generate and Attest SBOM with Harness GitHub Actions
description: Generate and Attest SBOM with Harness Github Actions
sidebar_position: 11
sidebar_label: Generate SBOM with Harness GitHub Actions
---

[Harness GitHub Actions](https://github.com/marketplace/actions/harness-github-actions) provide a seamless way to integrate Harness's Software Supply Chain Security (SCS) capabilities directly into GitHub workflows. You can use this GitHub Action to perform various supply chain security tasks. 
The Harness GitHub Action includes multiple sub-actions, each designed for specific tasks. This document focuses on the `harness/github-actions/sbom-generation` sub-action, which is used to generate an SBOM and attest it if needed.

The `harness/github-actions/sbom-generation` is responsible for generating the Software Bill of Materials (SBOM) and optionally attesting it. The generated SBOM is saved to the SCS module and can be found in the [**Artifact**](/docs/software-supply-chain-assurance/artifact-view) section. If attestation is enabled, the SBOM attestation will be signed, and the `.att` attestation file will be pushed to the configured container registry.

import NotesForKeysAndVault from '/docs/software-supply-chain-assurance/shared/note-key-gen-vault-support.md';

:::info
<NotesForKeysAndVault />
:::

### Requirements

import GHActionReq from '/docs/software-supply-chain-assurance/shared/requirements-gh-actions.md';

<GHActionReq />

### Usage Example

```yaml
- name: SBOM Generation
  uses: harness/github-actions/sbom-generation
  with:
    HARNESS_ACCOUNT_URL: https://myaccount.harness.io
    HARNESS_ACCOUNT_ID: my_account_id_9YpRharzPs
    HARNESS_ORG_ID: my_org_id_default
    HARNESS_PROJECT_ID: example_project_id
    HARNESS_API_KEY: ${{ secrets.API_KEY_SAVED_AS_GH_SECRET }}
    VAULT_ADDR: ${{ secrets.VAULT_URL }}
    TARGET: example_image:image_tag
    TOOL: Syft
    FORMAT: spdx-json
    ATTEST: true
    KMS_KEY: path_to_my_key_in_vault
```

### Configuration

Make sure to include the required configurations from the [Requirements](#requirements) section in your workflow. Below are the specific configurations for the `sbom-generation` sub-action.

| **Key**         | **Value Example**       | **Description**                                            | **Required** |
|-----------------|-------------------------|------------------------------------------------------------|-------------|
| `TOOL`         | `Syft` or `cdxgen`        | The tool used to generate the SBOM.                        | Yes         |
| `FORMAT`       | `spdx-json` or `cyclonedx`| The format of the generated SBOM.                          | Yes         |
| `TARGET`       | `image_name:image_tag`  | The target artifact (Docker image) for SBOM generation.    | Yes         |
| `ATTEST`       | `true` or `false`         | Boolean flag to determine if attestation is required.      | No          |
| `KMS_KEY`      | `path/to/my/key`        | Path to the Private key used for signing the attestation.          | No          |

### Sample workflow

Here's a sample workflow using the `harness/github-actions/sbom-generation`

```yaml

name: SBOM Generation Workflow

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

      # Step 6: Run SBOM Generation and Attestation
      - name: Run SBOM Generation Action
        uses: harness/github-actions/sbom-generation
        with:
          TOOL: 'Syft'
          FORMAT: 'spdx-json'
          TARGET: 'reetika1999/github-service:latest'
          ATTEST: true
          KMS_KEY: 'path/to/my/key/in/vault'

```

To verify the generated SBOM and enforce policies on it, refer to [Enforce SBOM Policies with GitHub Actions](/docs/software-supply-chain-assurance/sbom-policies/enforce-sbom-policies-with-github-actions) documentation.