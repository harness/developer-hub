---
title: Generate SLSA Provenance
description: Generate SLSA Provenance with Harness SSCA
sidebar_position: 10
redirect_from:
  - /tutorials/secure-supply-chain/generate-slsa
---

You can use Harness Software Supply Chain Assurance (SSCA) to achieve [**SLSA Level 3**](https://slsa.dev/spec/v0.1/levels) compliance by generating [SLSA Provenance](https://slsa.dev/spec/v1.0/provenance) according to the [SLSA v1.0 spec](https://slsa.dev/spec/v1.0/). You can also use SSCA to [verify SLSA Provenance](./verify-slsa.md).

Harness SSCA when used along with **Harness CI Hosted Builds** ensures that the resulting artifacts have SLSA Level 3 provenance that every consumer (including the following deployment stage) can verify for artifact integrity prior to making use of this artifact. 

Build hardening for Level 3 compliance is achieved through:

1. Built-in infrastructure isolation for every build where new infrastructure is created for every run and deleted after the run completes.
2. OPA policy enforcement on CI stage templates with non-privileged, hosted containerized steps that do not use volume mounts. This disallows the build steps to access the provenance key information in compliance with SLSA specifications. 

End result is that hackers cannot do tampering during the build process. This capability when coupled with open source governance through [SBOM lifecycle management](../sbom/generate-sbom.md) provides the most advanced shift-left supply chain security solution in the market today. 

<details>
<summary>Generate and verify SLSA Provenance architecture</summary>

To generate and verify SLSA Provenance with Harness SSCA, you need a pipeline with a [CI (build) stage](/docs/continuous-integration/use-ci/prep-ci-pipeline-components) and [CD (deploy) stage](/docs/continuous-delivery/get-started/key-concepts#stage). The stages must have these minimum steps:

- **Build** stage:
  - **Build and Push an image to Docker Registry** step: Build and push an image to a Docker registry.
  - SLSA generation enabled in the stage settings.
- **Deploy** stage:
  - [**SLSA Verification**](./verify-slsa.md) step: Verify the SLSA Provenance.
  - **Rolling deployment** step: Deploy the image.

<!-- ![](./static/slsa-pipeline-example.png) -->

<DocImage path={require('./static/slsa-pipeline-example.png')} />

</details>

## Prepare a pipeline

To generate SLSA Provenance in Harness, you need a pipeline with a [CI (build) stage](/docs/continuous-integration/use-ci/prep-ci-pipeline-components). Additionally, you must use the [Build and Push to Docker Registry step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry.md) to build and push your image. Support for other [Build and Push steps](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact.md) is coming soon.

## Generate a key pair

Keys are used to sign and verify provenance.

1. Generate a public and private key pair. For example, you can use [Cosign](https://docs.sigstore.dev/key_management/signing_with_self-managed_keys/) to generate key pairs.
2. Create two [Harness file secrets](/docs/platform/secrets/add-file-secrets), one for the private key file and one for the public key file.
3. Create a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) to store the password for the private key.

## Enable SLSA Provenance generation

Enable SLSA Provenance generation in the **Build** stage settings.

1. In your Harness pipeline, select the **Build** stage, and then select the **Overview** tab.
2. Under **SLSA Provenance**, enable **Generate SLSA Provenance**.
3. For **Private Key**, select the [Harness file secret](/docs/platform/secrets/add-file-secrets) containing the private key file to use to sign the attestation.
4. For **Password**, select the [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing the password for the private key.

<!-- ![](./static/slsa-build-stage-settings.png) -->

<DocImage path={require('./static/slsa-build-stage-settings.png')} />

:::info

* You must use the [Build and Push to Docker Registry step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry.md) to build and push your image. Support for other [Build and Push steps](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact.md) is coming soon.
* You can also add [provenance verification](./verify-slsa.md) to your pipeline.

:::

## Run the pipeline

When you run a pipeline with SLSA generation enabled, Harness SSCA:

* Generates an SLSA Provenance for the image created by the [Build and Push to Docker Registry step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry.md) in the **Build** stage.
* Generates and signs an attestation using the provided key and password.
* Stores the SLSA Provenance in Harness and uploads the `.att` file to your container registry alongside the image.

The signed attestation is stored, as an `.att` file, in the artifact repository along with the image. You can also find the SLSA Provenance on the **Supply Chain Assurance** tab on the **Execution details** page in Harness. For more information, go to [view pipeline execution results](../ssca-view-results.md).

## Provenance example

Here's an example of an SLSA Provenance generated by Harness SSCA. The information in your SLSA Provenance might vary depending on your build and changes to the provenance structure applied in SSCA updates. Identifiers, repo names, and other details in this example are anonymized or truncated.

```json
// Predicate:
{
  "predicateType": "https://slsa.dev/provenance/v1",
  "predicate": {
    "buildDefinition": {
      "buildType": "https://...",
      "externalParameters": {
        "codeMetadata": {
          "repositoryURL": "https://github.com/ORG_NAME/REPO_NAME.git",
          "branch": "main",
          "commitSha": "ff...c4a"
        },
        "triggerMetadata": {
          "triggerType": "MANUAL",
          "triggeredBy": "firstName lastName"
        },
        "buildMetadata": {
          "image": "DOCKER-ACCOUNT/IMAGE-NAME"
        }
      },
      "internalParameters": {
        "pipelineExecutionId": "BUILD-ID",
        "accountId": "HARNESS-ACCOUNT-ID",
        "pipelineIdentifier": "PIPELINE-ID"
      }
    },
    "runDetails": {
      "builder": {
        "id": "https://...",
        "version": {
          "ci-manager": "1.0.5801-000",
          "plugins/kaniko": "1.7.5"
        }
      },
      "runDetailsMetadata": {
        "invocationId": "P2...Q",
        "startedOn": "2023-09-15T08:17:49.673Z",
        "finishedOn": "2023-09-15T08:19:47.590Z"
      }
    }
  }
}
```

## Verify SLSA Provenance

After generating SLSA Provenance, you can [configure your pipeline to verify SLSA Provenance](./verify-slsa.md).
