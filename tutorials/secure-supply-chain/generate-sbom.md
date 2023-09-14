---
sidebar_position: 1
description: Use SSCA module steps to generate SBOM and enforce policies in Harness pipelines.
keywords: [SSCA]
title: Generate SBOM and enforce policies
slug: /secure-supply-chain/generate-sbom
---

You can use the Harness SSCA steps in Harness CI/CD pipelines to generate SBOM and enforce software supply chain security policies.

To generate SBOM in Harness, you need a pipeline with a [CI (build) stage](/docs/continuous-integration/use-ci/prep-ci-pipeline-components) and [CD (deploy) stage](/docs/continuous-delivery/get-started/key-concepts#stage). For example, the pipeline created in this tutorial has a **Build** stage with three steps and a **Deploy** stage with two steps.

* **Build** stage:
  * **Run** step: Build and test an artifact (image).
  * **Build and Push an image to Docker Registry** step: Build and push the image to a Docker registry.
  * **SSCA Orchestration** step: Generate the SBOM.

<!-- ![](./static/sbom-build-stage.png) -->

<docimage path={require('./static/sbom-build-stage.png')} />

* **Deploy** stage:
  * **SSCA Enforcement** step: Enforce SSCA policies.
  * **Rolling deployment** step: Based on the results of the policy evaluation, deploy the image.

<!-- ![](./static/sbom-deploy-stage.png) -->

<docimage path={require('./static/sbom-deploy-stage.png')} />

This tutorial explains how to configure the **SSCA Orchestration** and **SSCA Enforcement** steps.

## Generate a key pair

Keys are used to sign and verify attestations.

1. Generate a public and private key pair. For example, you can use [Cosign](https://docs.sigstore.dev/key_management/signing_with_self-managed_keys/) to generate key pairs.
2. Create two [Harness file secrets](/docs/platform/secrets/add-file-secrets), one for the private key file and one for the public key file.
3. Create a [Harness text secret](/docs/platform/Secrets/add-use-text-secrets) to store the password for the private key.

The SSCA steps in your Harness pipelines use the private key to sign attestations and the public key to verify the authenticity of the attestations.

## Generate an SBOM

You can use the **SSCA Orchestration** step to generate an SBOM in either the **Build** or **Deploy** stage.

* In a **Build** stage, add the **SSCA Orchestration** step after the artifact (image) has been pushed to an artifact repository.
* In a **Deploy** stage, add the **SSCA Orchestration** step before the deployment step.

The **SSCA Orchestration** step has the following settings:

* **Name:** Enter a name for the step.
* **SBOM Tool:** Select the tool to use to generate the SBOM, such as **Syft**.
* **SBOM Format:** Select **SPDX** or **CycloneDX**.
* **Artifact Type:** Select the type of artifact that the SBOM is for, such as **Image**.
* **Container Registry:** Select the [connector](/docs/category/connectors) for the container registry where your artifact is stored. For example, if the image is on Docker Hub, you need a [Docker connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
* **Image:** The repo path, in your container registry, and tag for the image for which you're generating an SBOM, such as `my-docker-repo/my-artifact:latest`.
* **Private Key:** The [Harness file secret](/docs/platform/secrets/add-file-secrets) containing the private key to use to sign the attestation.
* **Password:** The [Harness text secret](/docs/platform/Secrets/add-use-text-secrets) containing the password for the private key.

<!-- ![](./static/sbom-ssca-orch-step.png) -->

<docimage path={require('./static/sbom-ssca-orch-step.png')} />

:::info ECR and GCR repos

If you're using Docker-compliant ECR or GCR repositories, you must:

1. Use a [Docker Registry connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
2. Configure the connector as a valid [artifact source](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources).
   * For ECR, refer to [Use Docker Registry for ECR](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#amazon-elastic-container-registry-ecr).
   * For GCR, refer to [Use Docker Registry for GCR](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#google-container-registry-gcr)
3. Use the full URI for the **Image** in your **SSCA Orchestration** step, such as `1234567890.dkr.ecr.REGION.amazonaws.com/IMAGE_NAME:TAG`

:::

When the pipeline runs, the **SSCA Orchestration** step does the following:

* Generates an SBOM in the specified format.
* Generates and signs an attestation using the provided key and password.
* Stores the SBOM in Harness and uploads the `.att` file to your container registry alongside the image.

## Create policies

You must [create SSCA policies](/docs/software-supply-chain-assurance/ssca-policies/create-ssca-policies) that you want Harness SSCA to enforce. Create these policies in the Harness File Store.

1. In your Harness Project, go to **File Store** under **Project Setup**. You can also create policies at the Account and Org scopes.
2. Select **New**, and select the manifest as file usage type.
3. Enter the policy definitions, and then select **Save**.

<!-- ![](./static/ssca-policy-file-store.png) -->

<docimage path={require('./static/ssca-policy-file-store.png')} />

## Enforce policies

You can use the **SSCA Enforcement** step to enforce SSCA policies in either the **Build** or **Deploy** stage.

* In a **Build** stage, add the **SSCA Enforcement** step after the artifact (image) has been pushed to an artifact repository.
* In a **Deploy** stage, add the **SSCA Enforcement** step before the deployment step.

The **SSCA Enforcement** step has the following settings:

* **Name:** Enter a name for the step.
* **Artifact Type:** Select the type of artifact, such as **Image**.
* **Container Registry:** Select the [connector](/docs/category/connectors) for the container registry where your artifact is stored. For example, if the image is on Docker Hub, you need a [Docker connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
* **Image:** The repo path, in your container registry, and tag for the image for which you're generating an SBOM, such as `my-docker-repo/my-artifact:latest`.
* **Public Key:** The [Harness file secret](/docs/platform/secrets/add-file-secrets) containing the public key to use to verify the authenticity of the attestation.
* **File Path:** Path to the [policy file](#create-policies) to use for enforcement. You must create and store policies in the Harness File Store.
* **Password:** The [Harness text secret](/docs/platform/Secrets/add-use-text-secrets) containing the password for the private key.

<!-- ![](./static/policy-ssca-enforce-step.png) -->

<docimage path={require('./static/policy-ssca-enforce-step.png')} />

:::info ECR and GCR repos

If you're using Docker-compliant ECR or GCR repositories, you must:

1. Use a [Docker Registry connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
2. Configure the connector as a valid [artifact source](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources).
   * For ECR, refer to [Use Docker Registry for ECR](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#amazon-elastic-container-registry-ecr).
   * For GCR, refer to [Use Docker Registry for GCR](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#google-container-registry-gcr)
3. Use the full URI for the **Image** in your **SSCA Enforcement** step, such as `1234567890.dkr.ecr.REGION.amazonaws.com/IMAGE_NAME:TAG`

:::

When the pipeline runs, the **SSCA Enforce** step does the following:

* Verifies the authenticity of the attestation.
* Applies policies defined in the specified policy file.
* Records policy violations and shows them on the **Artifacts** tab on the **Execution details** page.

## View attestations and violations

When the pipeline runs, the SBOM is generated and the attestation is signed. The signed attestation is stored, as an `.att` file, in the artifact repository along with the image.

<!-- ![](./static/view-result-att-in-docker-hub.png) -->

<docimage path={require('./static/view-result-att-in-docker-hub.png')} />

When viewing the **Execution details** page in Harness, you can view and download the SBOM from **SBOM** column on the **Artifacts** tab.

<!-- ![](./static/view-result-sbom-artifact.png) -->

<docimage path={require('./static/view-result-sbom-artifact.png')} />

:::tip

If your pipeline has multiple stages, the **Artifacts** tab is filtered by stage. Use the dropdown menu to select the relevant stage.

:::

You can see the number of policy violations in the **Violations** column on the **Artifacts** tab.

<!-- ![](./static/view-result-policy-violations.png) -->

<docimage path={require('./static/view-result-policy-violations.png')} />

Select the number to inspect the details of the violations.

<!-- ![](./static/view-result-policy-violations-detail.png) -->

<docimage path={require('./static/view-result-policy-violations-detail.png')} />
