---
sidebar_position: 2
description: Use SSCA module steps to generate and verify SLSA Provenance in Harness pipelines.
keywords: [SSCA]
title: Generate and verify SLSA Provenance
slug: /secure-supply-chain/generate-slsa
---

This tutorial explains how you can use the Harness SSCA steps in Harness CI/CD pipelines to generate and verify [SLSA Provenance](https://slsa.dev/spec/v1.0/provenance).

To complete this tutorial, you need a pipeline with a [CI (build) stage](/docs/continuous-integration/use-ci/prep-ci-pipeline-components) and [CD (deploy) stage](/docs/continuous-delivery/get-started/key-concepts#stage). For example, the pipeline created in this tutorial has a **Build** stage with one step and a **Deploy** stage with two steps.

* **Build** stage:
  * **Build and Push an image to Docker Registry** step: Build and push an image to a Docker registry.
  * SLSA generation is enabled in the stage settings.
* **Deploy** stage:
  * **SLSA Verification** step: Verify the SLSA Provenance.
  * **Rolling deployment** step: Deploy the image.

<!-- ![](./static/slsa-pipeline-example.png) -->

<docimage path={require('./static/slsa-pipeline-example.png')} />

This tutorial explains how to enable SLSA Provenance generation and configure an **SLSA Verification** step.

## Generate a key pair

Keys are used to sign and verify provenance.

1. Generate a public and private key pair. For example, you can use [Cosign](https://docs.sigstore.dev/key_management/signing_with_self-managed_keys/) to generate key pairs.
2. Create two [Harness file secrets](/docs/platform/secrets/add-file-secrets), one for the private key file and one for the public key file.
3. Create a [Harness text secret](/docs/platform/Secrets/add-use-text-secrets) to store the password for the private key.

When your pipeline runs, the private key is used to sign the SLSA Provenance, and the public key is used to verify the provenance.

## Generate SLSA Provenance

Enable SLSA Provenance generation in the **Build** stage settings.

1. In your Harness pipeline, select the **Build** stage, and then select the **Overview** tab.
2. Under **SLSA Provenance**, enable **Generate SLSA Provenance**.
3. For **Private Key**, select the [Harness file secret](/docs/platform/secrets/add-file-secrets) containing the private key file to use to sign the attestation.
4. For **Password**, select the [Harness text secret](/docs/platform/Secrets/add-use-text-secrets) containing the password for the private key.

<!-- ![](./static/slsa-build-stage-settings.png) -->

<docimage path={require('./static/slsa-build-stage-settings.png')} />

When you run a pipeline with SLSA generation enabled, Harness SSCA:

* Generates an SLSA Provenance for the image created in the **Build** stage.
* Generates and signs an attestation using the provided key and password.
* Stores the SLSA Provenance in Harness and uploads the `.att` file to your container registry alongside the image.

## Create policies

You must create a set of OPA policies that you want Harness SSCA to use for SLSA Provenance verification. You can create a dedicated SLSA Provenance verification policy set or use existing policy sets that you've already created. For more information about creating policies in Harness, go to the [Harness Policy As Code overview](/docs/platform/Governance/Policy-as-code/harness-governance-overview).

:::info

OPA polices used for SLSA Provenance verification are different from [SSCA policies](/docs/software-supply-chain-assurance/ssca-policies/create-ssca-policies) used for SSCA policy enforcement.

:::

1. In your Harness Project, go to **Policies** under **Project Setup**. You can also create policies at the Account and Org scopes.
2. Select **Policies**, and then [create policies](/docs/platform/Governance/Policy-as-code/harness-governance-quickstart#create-the-policy) for the individual rules that you want to enforce.

   You can select from the policy library or write your own policies. This tutorial enforces the following policies:

   ```
   package slsa

   # Build repo must be 'https://github.com/abc/abc-sample'. SLSA verification fails if a different repo is detected.
   deny[msg]{
     input[0].outcome.stepArtifacts.provenanceArtifacts[0].predicate.buildDefinition.externalParameters.codeMetadata.repositoryURL != "https://github.com/abc/abc-sample"
     msg := "Repository verification failed in Provenance"  
   }

   # Build branch must be 'main'. SLSA verification fails if a different branch is detected.
   deny[msg]{
     input[0].outcome.stepArtifacts.provenanceArtifacts[0].predicate.buildDefinition.externalParameters.codeMetadata.branch != "main"
     msg := "Branch verification failed in provenance"  
   }
   ```

   For more examples, go to [Policy samples](/docs/platform/Governance/Policy-as-code/sample-policy-use-case).

3. [Create policy sets](/docs/platform/Governance/Policy-as-code/harness-governance-quickstart#step-3-create-a-policy-set) to group related policies. You must have at least one policy set.

## Verify provenance

1. Add the **SLSA Verification** step to your **Deploy** stage. This is a container step that must be inside a [container group](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups).
2. Configure the **SLSA Verification** settings as follows:

   * **Name:** Enter a name for the step.
   * **Artifact Source:** Provide information about the artifact that needs SLSA Provenance verification.
      * **Container Registry:** Select the [connector](/docs/category/connectors) for the container registry where the relevant artifact is stored. For example, if the image is on Docker Hub, you need a [Docker connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
      * **Image:** The repo path, in your container registry, for the image to verify, such as `my-docker-repo/my-artifact`.
      * **Tag:** The tag for the image, such as `latest`.
   * **Public Key:** A [Harness file secret](/docs/platform/secrets/add-file-secrets) containing the public key to use to verify the authenticity of the attestation.

   <!-- ![](./static/slsa-verify-step-basic.png) -->

   <docimage path={require('./static/slsa-verify-step-basic.png')} />

3. On the **Advanced** tab for the **SLSA Verification** step, expand the **Policy Enforcement** section, and then add your SLSA Provenance verification OPA policies.

   <!-- ![](./static/slsa-verify-step-adv.png) -->

   <docimage path={require('./static/slsa-verify-step-adv.png')} />

When the pipeline runs, the **SLSA Verification** step does the following:

* Verifies the authenticity of the attestation.
* Verifies the provenance data by applying the specified policy set.
* Records the evaluation results for each policy and shows them in the step's logs.
* Shows an overall pass/fail for SLSA verification on the **Artifacts** tab.

## View attestations and violations

When the pipeline runs, the SLSA Provenance is generated and the attestation is signed. The signed attestation is stored, as an `.att` file, in the artifact repository along with the image.

<!-- ![](./static/view-result-att-in-docker-hub.png) -->

<docimage path={require('./static/view-result-att-in-docker-hub.png')} />

When viewing the **Execution details** page in Harness, you can view and download the SLSA Provenance from **Artifact Type** column on the **Artifacts** tab.

<!-- ![](./static/view-result-slsa-artifact.png) -->

<docimage path={require('./static/view-result-slsa-artifact.png')} />

:::tip

If your pipeline has multiple stages, the **Artifacts** tab is filtered by stage. Use the dropdown menu to select the relevant stage.

:::

In the **SLSA Verification** column on the **Artifacts** tab, you can see if the verification passed or failed.

<!-- ![](./static/view-result-slsa-verify-pass-fail.png) -->

<docimage path={require('./static/view-result-slsa-verify-pass-fail.png')} />

To inspect which policies failed, select the **Pipeline** tab, select the **SLSA Verification** step, and then select the **Policy Enforcement** tab.

<!-- ![](./static/view-result-slsa-policy-violations.png) -->

<docimage path={require('./static/view-result-slsa-policy-violations.png')} />
