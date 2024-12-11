---
title: Generate and Manage Software Bill of Materials (SBOM)
description: Generate and Manage SBOM with Harness SCS
sidebar_position: 10
sidebar_label: Generate SBOM
redirect_from:
  - /docs/software-supply-chain-assurance/generate-sbom
  - /tutorials/secure-supply-chain/generate-sbom
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


A Software Bill of Materials (SBOM) is an exhaustive list of all components, libraries, and other dependencies utilized in a software application. The **SBOM Orchestration** step within Harness SCS facilitates the generation of SBOMs for your software artifacts.

This document elaborates on utilizing the SBOM Orchestration step for SBOM generation. If you already possess an SBOM and wish to ingest it, please refer to the [Ingest SBOM](./ingest-sbom-data.md) section.

<DocVideo src="https://youtu.be/k5TAO1RLJvY?si=y_mC2cq5YD8MziK-" />

## Requirements
### Prepare a pipeline

You can generate the SBOM in both the **Build** and **Deploy** stages of your Harness pipeline.

<details>
<summary>Example Pipeline for SBOM generation</summary>

These example demonstrate how you could set up Build and Deploy stages to generate SBOM.

<Tabs>
<TabItem value="build" label="Build stage" default>

This example **Build** stage has three steps:

- **Run** step: Build and test an artifact (image).
- **Build and Push an image to Docker Registry** step: Build and push the image to a Docker registry.
- **SBOM Orchestration** step: Generate the SBOM.


<DocImage path={require('./static/sbom-gen-build-stage.png')} width="60%" height="60%" title="Click to view full size image" />


</TabItem>
<TabItem value="deploy" label="Deploy stage">

SBOM Orchestration in deploy stage can only be used in the [Containerized Step Groups](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups)
This example **Deploy** stage has two steps:

- **SBOM Orchestration** step: Generate the SBOM.
- **Rolling deployment** step: Deploy the image.

<DocImage path={require('./static/sbom-gen-deploy-stage.png')} width="60%" height="60%" title="Click to view full size image" />

</TabItem>
</Tabs>

</details>

### Generate the keys for SBOM Attestation - optional
For enhanced trust and verification of your SBOM's integrity, the SBOM Orchestration step offers optional signing and attestation generation feature. This functionality requires a private key, password for attestation and corresponding public key for attestation verification. If you choose to skip the SBOM attestation, you can proceed without generating the and storing these keys.

1. **Generate the keys**: Begin by generating the keys using [Cosign](https://docs.sigstore.dev/signing/quickstart).  
    1. [Install Cosign](https://docs.sigstore.dev/system_config/installation/)
    2. Run the command `cosign generate-key-pair` to generate the key pairs.
    3. Make sure to note the password used for generating the key pairs. This password is needed along with the private key for performing the attestation.
    4. This command will generate a private key as a `.key` file and a public key as a `.pub` file.

2. **Securely store the keys**: Safeguard the generated keys by securely storing them as [Harness file secrets](https://developer.harness.io/docs/platform/secrets/add-file-secrets/). The SCS module also supports **HashiCorp Vault**, allowing you to use your keys from the vault.


## SBOM Orchestration step configuration

You can use **SBOM Orchestration** step to generate an SBOM in either the **Build** or **Deploy** stage of a Harness pipeline.

* In a **Build** stage, add the **SBOM Orchestration** step after the artifact (image) has been pushed to an artifact repository.
* In a **Deploy** stage, add the **SBOM Orchestration** step before the deployment step.

:::info 

**SBOM Orchestration** step in deploy stage can only be used in the [Containerized Step Groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups.md)

:::

Using SBOM Orchestration step you can generate the SBOM for both Container images and and Repositories. Follow the steps to configure the fields for each supported type.

* **Name:** Enter a name for the step.

* **Step Mode:** Select **Generation**.

* **SBOM Tool:** Select **Syft** or **cdxgen**. For other SBOM tools, go to [Ingest SBOM](./ingest-sbom-data.md).

* **SBOM Format:** Select **SPDX** or **CycloneDX**.

  If you're using **Syft** to generate the SBOM and want to ensure it includes all component licenses with high accuracy, you'll need to set specific environment variables based on your project's programming language. Here are the relevant variables:

  <details>
    <summary>Set variables for enhanced SBOM</summary>

      | Programming Language | Name of Variable | Value         | 
      |----------------------|----------------|-----------------|
      | Go          | `SYFT_GOLANG_SEARCH_REMOTE_LICENSES`             | true
      | Java                 | `SYFT_JAVA_USE_NETWORK`         | true    |
      | JavaScript                  | `SYFT_JAVASCRIPT_SEARCH_REMOTE_LICENSES`           | true     |

      To add a new environment variable, go to **Overview** section of your Build stage, and expand the **Advanced** section.

      <DocImage path={require('./static/syft-flags.png')} width="50%" height="50%" title="Click to view full size image" />

      By setting these variables, Syft can more effectively fetch and populate the licensing data for the components in your SBOM. This not only enhances the quality of the SBOM but also improves its overall [SBOM score](./sbom-score.md). If your SBOM contains `NOASSERTIONS`, it indicates that Syft was unable to retrieve necessary data.

  </details>

- **Registry Type**: Select **Harness Artifact Registry** or **Third-Party Artifact Registry**, based on where your artifact is stored.
- **Source**: Select the **Source** by choosing either a supported container registry from the list or Repository if you are generating the SBOM for source code.

import ArtifactSource from '/docs/software-supply-chain-assurance/shared/artifact-source.md';

<ArtifactSource />

With this configuration, the step generates the SBOM and stores it in the Artifact section of SCS. Optionally, you an attest to the generated SBOM, follow the instructions in the section below.


### Attest the SBOM
To configure attestation, in addition to the above configuration, you need to enable the SBOM Attestation checkbox in the SBOM Orchestration step. Enabling SBOM Attestation is optional and not required for SBOM generation. 

Attestation process requires a key pair generated using Cosign. You can perform the attestation with **Cosign** or **Cosign with Secret Manager**

import CosignAttestationOptions from '/docs/software-supply-chain-assurance/shared/cosign-attestation-options.md';

<CosignAttestationOptions />


### Configure SBOM Drift
This feature allows you to track changes in SBOMs, it can detect the changes by comparing the generated SBOM against a specified one. For an in-depth understanding of this functionality, please refer to the [SBOM Drift documentation](/docs/software-supply-chain-assurance/sbom/sbom-drift/). If you prefer not to detect any changes in SBOMs, leave this option unchecked. Also, enabling SBOM Drift is optional and not required for SBOM generation

Enabling this feature provides the following capabilities:

- **Detect drift from the last generated SBOM**: Compare the current SBOM with the most recently generated SBOM to identify changes.
- **Detect drift from a baseline**: Compare the current SBOM against a predefined baseline SBOM to detect deviations.


## Run the pipeline

When the pipeline runs, the **SBOM Orchestration** step performs the following actions:

- Generates an SBOM in the chosen format for both Containers and Repositories.
- Specifically for Containers:
  - Generates and signs an attestation using the provided private key and password.
  - Stores the SBOM in Harness and uploads the `.att` file to your container registry. 

SBOMs for both Containers and Code Repositories are accessible in the [Artifacts view](../artifact-view.md). Additionally, you can locate the SBOM for any artifact on the **Supply Chain** tab within the **Execution Details** page in Harness. For detailed insights, please refer to the [view pipeline execution results](../ssca-view-results.md#view-sbom-and-drift-analysis) documentation.


## Next steps

After generating an SBOM, you can apply [SBOM Policy Enforcement](../sbom-policies/overview.md) to achieve open source governance.