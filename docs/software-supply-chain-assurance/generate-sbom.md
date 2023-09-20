---
title: Generate and manage SBOM
description: Generate and manage SBOM with Harness SSCA
sidebar_position: 30
sidebar_label: Generate SBOM
---

```mdx-code-block
import SbomAbout from '/docs/software-supply-chain-assurance/shared/sbom-about.md';
```

<SbomAbout />

## Generate SBOM in Harness

:::tip Tutorial

For a step-by-step walkthrough, try this tutorial: [Generate SBOM and enforce policies](/tutorials/secure-supply-chain/generate-sbom).

:::

### Prepare a pipeline

To generate SBOM in Harness, you need a pipeline with a [CI (build) stage](/docs/continuous-integration/use-ci/prep-ci-pipeline-components), a [CD (deploy) stage](/docs/continuous-delivery/get-started/key-concepts#stage), or both.

### Generate a key pair

Keys are used to sign and verify attestations.

1. Generate a public and private key pair. For example, you can use [Cosign](https://docs.sigstore.dev/key_management/signing_with_self-managed_keys/) to generate key pairs.
2. Create two [Harness file secrets](/docs/platform/secrets/add-file-secrets), one for the private key file and one for the public key file.
3. Create a [Harness text secret](/docs/platform/Secrets/add-use-text-secrets) to store the password for the private key.

### Add the SSCA Orchestration step

Use the **SSCA Orchestration** step to generate an SBOM in either the **Build** or **Deploy** stage of a Harness pipeline.

* In a **Build** stage, add the **SSCA Orchestration** step after the artifact (image) has been pushed to an artifact repository.
* In a **Deploy** stage, add the **SSCA Orchestration** step before the deployment step.

The **SSCA Orchestration** step has the following settings:

* **Name:** Enter a name for the step.
* **SBOM Tool:** Select the tool to use to generate the SBOM, such as **Syft**.
* **SBOM Format:** Select **SPDX** or **CycloneDX**.
* **Artifact Type:** Select **Image**.
* **Container Registry:** select the [Docker Registry connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Docker-compliant container registry where the artifact is stored, such as Docker Hub, Amazon ECR, or GCR.
* **Image:** The repo path (in your container registry) and tag for the image for which you're generating an SBOM, such as `my-docker-repo/my-artifact:latest`.
* **Private Key:** The [Harness file secret](/docs/platform/secrets/add-file-secrets) containing the private key to use to sign the attestation.
* **Password:** The [Harness text secret](/docs/platform/Secrets/add-use-text-secrets) containing the password for the private key.

<!-- ![](./static/sbom-ssca-orch-step.png) -->

<docimage path={require('./static/sbom-ssca-orch-step.png')} />

:::info ECR and GCR repos

If you're using Docker-compliant ECR or GCR repositories, you must:

1. Configure your [Docker Registry connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) as a valid [artifact source](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources).
   * For ECR, go to [Use Docker Registry for ECR](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#amazon-elastic-container-registry-ecr).
   * For GCR, go to [Use Docker Registry for GCR](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#google-container-registry-gcr)
2. Use the full URI for the **Image** in your **SSCA Orchestration** step, such as `1234567890.dkr.ecr.REGION.amazonaws.com/IMAGE_NAME:TAG`.

:::

### Run the pipeline

When the pipeline runs, the **SSCA Orchestration** step does the following:

* Generates an SBOM in the specified format.
* Generates and signs an attestation using the provided key and password.
* Stores the SBOM in Harness and uploads the `.att` file to your container registry alongside the image.

The signed attestation is stored, as an `.att` file, in the artifact repository along with the image. You can also find the SBOM on the **Artifacts** tab on the **Execution details** page in Harness. For more information, go to [View attestations and violations](./ssca-view-results.md).

:::tip

After generating an SBOM, you can use it to [enforce SSCA policies](./ssca-policies/enforce-ssca-policies.md).

:::
