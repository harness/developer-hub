---
title: Generate and Manage Software Bill of Materials (SBOM)
description: Generate SBOM for Artifacts using Harness SCS
sidebar_position: 9
sidebar_label: Generate SBOM for Artifacts
redirect_from:
  - /docs/software-supply-chain-assurance/sbom/generate-sbom
  - /tutorials/secure-supply-chain/generate-sbom
  - /docs/software-supply-chain-assurance/sbom/sbom-drift
  - /docs/software-supply-chain-assurance/sbom/sbom-score
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


A Software Bill of Materials (SBOM) is an exhaustive list of all components, libraries, and other dependencies utilized in a software application. The **SBOM Orchestration** step within Harness SCS facilitates the generation of SBOMs for your software artifacts and code repositories[/docs/software-supply-chain-assurance/open-source-management/generate-sbom-for-repositories].

If you already possess an SBOM and wish to ingest it, please refer to the [Ingest SBOM](./ingest-sbom-data.md) section.

<DocVideo src="https://youtu.be/k5TAO1RLJvY?si=y_mC2cq5YD8MziK-" />

## Requirements

### Generate the keys for SBOM Attestation - optional

import GenerateKeysPrerequisite from '/docs/software-supply-chain-assurance/shared/generate-consign-keys-prerequisite.md';

<GenerateKeysPrerequisite />

## SBOM Orchestration step configuration

<DocImage path={require('./static/sbomm-overvieww.png')} width="50%" height="50%" />

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

      By setting these variables, Syft can more effectively fetch and populate the licensing data for the components in your SBOM. This not only enhances the quality of the SBOM but also improves its overall SBOM score. If your SBOM contains `NOASSERTIONS`, it indicates that Syft was unable to retrieve necessary data.

  </details>

- **Registry Type**: Select **Harness Artifact Registry** or **Third-Party Artifact Registry**, based on where your artifact is stored.
- **Source**: Select the **Source** by choosing either a supported container registry from the list or Repository if you are generating the SBOM for source code.


import ArtifactSource from '/docs/software-supply-chain-assurance/shared/artifact-source.md';

<ArtifactSource />

With this configuration, the step generates the SBOM and stores it in the Artifact section of SCS. Optionally, you can attest to the generated SBOM, follow the instructions in the section below.

:::info

The SBOM generation step supports all registry types, including JFrog, Harbor, and Kubernetes registries. Select the [Docker Registry Connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Docker Registry where the artifact is stored.

Enter the name of your image with tag, such as:

JFrog: `</your-repo/test-image>:tag`

Harbor: `</your-project/test-image>:tag`

:::

### Attest the SBOM
To configure attestation, in addition to the above configuration, you need to enable the SBOM Attestation checkbox in the SBOM Orchestration step. Enabling SBOM Attestation is optional and not required for SBOM generation. 

Attestation process requires a key pair generated using Cosign. You can perform the attestation with **Cosign** or **Cosign with Secret Manager**

import CosignAttestationOptions from '/docs/software-supply-chain-assurance/shared/cosign-attestation-options.md';

<CosignAttestationOptions />




### Configure SBOM Drift

This feature allows you to track changes in SBOMs by comparing against the last generated SBOM. It provides a detailed analysis of addition or removal of components and licenses, helping you manage and oversee software artifacts more effectively. However, this is optional and not required for SBOM generation. If you prefer not to detect changes in SBOMs, leave this option unchecked.

<DocImage path={require('./static/sbom-drift.png')} width="70%" height="70%" />



## Run the pipeline

When the pipeline runs, the **SBOM Orchestration** step performs the following actions:

- Generates an SBOM in the chosen format for both Containers and Repositories.
- Specifically for Containers:
  - Generates and signs an attestation using the provided private key and password.
  - Stores the SBOM in Harness and uploads the `.att` file to your container registry. 

SBOMs for both Containers and Code Repositories are accessible in the [Artifacts view](/docs/software-supply-chain-assurance/artifact-security/overview#sbom-tab). Additionally, you can locate the SBOM for any artifact on the **Supply Chain** tab within the **Execution Details** page in Harness.


<DocImage path={require('./static/scs-sbom-drift.png')} width="100%" height="100%" />

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


### View vulnerabilities in the SBOM


After you run the SBOM orchestration step followed by the STO Snyk scan, the [SBOM tab](/docs/software-supply-chain-assurance/artifact-security/overview#sbom-tab) on the Artifacts page displays vulnerabilities for the components identified by Snyk. This helps you effectively identify and prioritize open source risks


### Publish SBOM

After you run the SBOM Orchestration step, you can download or publish SBOM through multiple ways depending on your workflow:

- Via [Harness API](https://apidocs.harness.io/tag/SBOM#operation/downloadSbomForArtifact) 
- Use the Download SBOM button available on the Artifacts page.
- Access the SBOM file directly from the pipeline output at the specified path `/harness/sbom/{sbom_<sbom_orchestration_step_execution_id>}.json`.

## Next steps

After generating an SBOM, you can apply [SBOM Policy Enforcement](/docs/software-supply-chain-assurance/open-source-management/enforce-sbom-policies) to achieve open source governance.