---
title: Generate and Attest SBOM with Harness GitLab CI/CD
description: Learn how to use Harness GitLab CI/CD to generate a Software Bill of Materials (SBOM) and attest it for supply chain verification.
sidebar_position: 11
sidebar_label: Generate SBOM with Harness GitLab CI/CD

redirect_from:
  - /docs/software-supply-chain-assurance/open-source-management/sbom-gitlab-ci-cd/generate-sbom-policies

tags:
  - harness-scs 
  - generate-sbom-with-gitlab-ci-cd
  - open-source-management
  - sbom
  - sbom-management
  - attestation
  - integrity 
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Modern applications rely on a large number of open-source and third-party components. Without an accurate inventory of these components, it becomes difficult to identify security vulnerabilities, understand license obligations, and maintain visibility into software dependencies across the software supply chain.

Harness Supply Chain Security (SCS) integrates with [GitLab CI/CD](https://gitlab.com/explore/catalog/harness-scs/gitlab-plugins?tab=components) to automate software supply chain security tasks within your CI/CD workflow. It enables you to generate a Software Bill of Materials (SBOM) during pipeline execution. The generated SBOM provides an inventory of software components used in your application. This helps improve software supply chain visibility and supports vulnerability management, license compliance, and governance throughout the software development lifecycle.

***

## What will you learn in this topic?

By the end of this topic, you will be able to:

* Set up Harness GitLab CI/CD integration from your SCS project.
* Configure SBOM generation in your GitLab CI/CD workflow using the **SBOM Orchestration** component.
* Configure optional SBOM attestation using keyless, key-based, or Secret Manager signing methods.
* Generate and upload an SBOM to the SCS module as part of your GitLab CI/CD pipeline.

***

## Before you begin

Make a note of the following before you proceed with generating an SBOM using GitLab CI/CD:

* Understand how to create Harness API keys using Personal API Keys or Service Account API Keys. For more information, go to [Manage API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys) and [Service Account API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens), respectively.
* If you're using key-based or Secret Manager signing or verification, create or configure a Cosign key pair before configuring the pipeline. For step-by-step instructions, see [Quickstart Signing and Verifying with Cosign](https://docs.sigstore.dev/quickstart/quickstart-cosign/#quickstart-signing-and-verifying-with-cosign), which explains how to generate a local key pair or create one using a supported KMS provider. The key should be generated using Cosign of type `ecdsa-P256`. You don't need to install Cosign on your GitLab runner. The `harness/ssca-plugin` container image used by the Harness GitLab CI/CD components includes Cosign, so no additional installation is required.
* If you plan to use Secret Manager attestation, store your signing key in a supported secret manager. Currently, Harness supports HashiCorp Vault. For GitLab CI/CD, you point the component at the key through pipeline variables such as `KMS_KEY` (and `VAULT_ADDR` when the key is stored in HashiCorp Vault), so you don't need to configure a Harness Secret Manager connector. For setup steps specific to HashiCorp Vault, see the [Add a HashiCorp Vault secret manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-hashicorp-vault/).
* Ensure that your GitLab runners support Docker-in-Docker (DinD). The component runs using the `docker:24-dind` service. For more information, go to [Use Docker-in-Docker](https://docs.gitlab.com/ci/docker/docker_in_docker/).

***

## Understand SBOM generation with Harness GitLab CI/CD

Harness SCS integrates with GitLab CI/CD through reusable GitLab CI/CD components. These components enable you to automate software supply chain security tasks as part of your GitLab pipelines, helping you build, verify, and govern software artifacts without adding custom implementation to your CI/CD workflow.

The SBOM generation capability creates an SBOM for a container image or a local (non-container) artifact during pipeline execution. The generated SBOM is uploaded to the SCS module, where you can review the software components included in your application. This helps you identify software dependencies, investigate vulnerabilities, review license information, and maintain visibility into your software supply chain.

You can also attest the generated SBOM to establish its authenticity and integrity. Harness GitLab CI/CD supports **keyless**, **key-based**, and **Secret Manager** attestation methods. With keyless attestation, SCS uses an OpenID Connect (OIDC) identity to sign the SBOM, eliminating the need for long-lived signing keys. With key-based attestation, SCS uses a cryptographic key that you manage through your preferred key management solution. With Secret Manager attestation, SCS uses a signing key stored in a supported secret manager. Key-based and Secret Manager container attestations are stored alongside the artifact in the configured container registry. Keyless container attestations and all local-artifact attestations are uploaded to the SCS module as bundles.

| **Why use it?** | **When to use it?** | **How can you leverage it?** |
| --- | --- | --- |
| Generate an inventory of the software components used in your application. | When you want to automatically generate an SBOM as part of your GitLab CI/CD pipeline. | Use the generated SBOM to gain visibility into software dependencies, identify vulnerabilities, review license information, attest software artifacts, and support governance and compliance initiatives. |

***

## Set up Harness GitLab CI/CD

Before configuring SBOM generation in your GitLab pipeline, set up Harness GitLab CI/CD from your SCS project. The setup guides you through creating or selecting a Harness API key and generates a project-specific YAML configuration with your Harness account ID, organization ID, project ID, and account URL already populated. You can copy this configuration into your GitLab workflow and update the remaining inputs as needed.

Complete the following steps to set up Harness GitLab CI/CD:

1. Navigate to the **Integrations** page under the **Manage** section from the sidebar navigation of your SCS account.
2. Click the `Add Integration` button to go to the **Configure Integration** page.<br />
   Alternatively, you can access this page by clicking **Get Started > Get Started** from the sidebar navigation of your SCS account.
3. Scroll down to the GitLab collapsible and click it to expand.
4. Click the `Configure` button under **Configure GitLab CI/CD in your pipeline to generate SBOM and SLSA, and sign artifacts** to open the **Configure Integration** page, where the Artifact Security feature cards are displayed.
5. Click the **Generate SBOM** card to open the **SBOM Generation** sidepanel.
6. Click the `Go to Key Generation` button to create the Harness API key required to configure Harness GitLab CI/CD.
    * Select **Using Service Account** from the dropdown to create the API key using a service account. For more information, see [Service Account API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens).
    * Select **Using Personal Account** from the dropdown to create a personal API key. Personal API keys are created at the account level and inherit the permissions assigned to your user account. For more information, see [Manage API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys).
7. Click **Copy** in the upper-right corner of the code block to copy the generated GitLab CI/CD configuration, and then paste it into your GitLab workflow file.

<DocImage path={require('./static/sbom-generation-gitlab.png')} width="100%" height="100%" title="Click to view full size image" />

***

## Configure SBOM generation in GitLab CI/CD

After setting up Harness GitLab CI/CD, configure the SBOM Orchestration component in your GitLab workflow file. Add the required GitLab CI/CD variables to your GitLab project, configure the component inputs, the attestation settings, and run the pipeline. During pipeline execution, the component generates an SBOM for the specified artifact and uploads it to the SCS module. For the authoritative list of component inputs and defaults, see the CI/CD Catalog at [SCS GitLab Plugins](https://gitlab.com/explore/catalog/harness-scs/gitlab-plugins?tab=components#sbom-orchestration).

Complete the following steps to configure SBOM generation:

1. [Add the required GitLab CI/CD variables](#step-1---add-the-required-gitlab-cicd-variables)
2. [Include the SBOM Orchestration component](#step-2---include-the-sbom-orchestration-component)
3. [(Optional) Configure SBOM attestation in the workflow](#optional-step-3---configure-sbom-attestation)
4. [Review the workflow](#step-4---review-the-workflow)
5. [Run the pipeline](#step-5---run-the-pipeline)

### Step 1 - Add the required GitLab CI/CD variables

Before configuring the SBOM Orchestration component, add the following variables to your GitLab project. For step by step instructions, see [Define a CI/CD Variable for a project](https://docs.gitlab.com/ci/variables/#for-a-project).

| **Variable** | **Description** | **Required** | **Example** | **Masked?** |
| --- | --- | --- | --- | --- |
| `HARNESS_API_KEY` | Harness Personal API Key or Service Account API Key used to authenticate with Harness. | Yes | `pat.xxxxxxxxxxxxxxxxxxxx` | Yes |
| `HARNESS_ACCOUNT_ID` | Harness account identifier. | Yes | `AbCdEf123456` | No |
| `HARNESS_ORG_ID` | Harness organization identifier. | Yes | `SCS_Org` | No |
| `HARNESS_PROJECT_ID` | Harness project identifier. | Yes | `SCS` | No |
| `HARNESS_ACCOUNT_URL` | Harness account URL. | Yes | `https://example.harness.io` | No |

:::note

Masked GitLab CI/CD variables cannot be passed through component inputs. For this reason, the Harness scope variables (`HARNESS_ACCOUNT_ID`, `HARNESS_ORG_ID`, `HARNESS_PROJECT_ID`, and `HARNESS_ACCOUNT_URL`) must remain unmasked so that they can be wired through the component `inputs`. `HARNESS_API_KEY` remains masked and is consumed directly from the job environment, not passed as a component input. These values are included in the generated YAML provided during the [Set up Harness GitLab CI/CD](#set-up-harness-gitlab-cicd) workflow.

:::

### Step 2 - Include the SBOM Orchestration component

Add an `scs` stage to your GitLab workflow file, or set the `stage` input on the component to an existing stage. Then, include the Harness **SBOM Orchestration** component in your GitLab workflow file.

The following code snippet demonstrates how to add the `scs` stage and include the SBOM Orchestration component in your GitLab workflow file. The snippet includes the minimum required component inputs because the component requires the Harness scope variables and the target artifact to run.

```yaml
stages: [scs]

include:
  - component: gitlab.com/harness-scs/gitlab-plugins/sbom-orchestration@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
```

Configure the component using the GitLab CI/CD variables created in the previous step and the following component inputs.

| **Input** | **Description** | **Required** | **Default** | **Example** |
| --- | --- | --- | --- | --- |
| `HARNESS_ACCOUNT_ID` | Harness account ID. Pass a non-masked CI/CD variable reference. | Yes | N/A | `$HARNESS_ACCOUNT_ID` |
| `HARNESS_ORG_ID` | Harness organization ID. Pass a non-masked CI/CD variable reference. | Yes | N/A | `$HARNESS_ORG_ID` |
| `HARNESS_PROJECT_ID` | Harness project ID. Pass a non-masked CI/CD variable reference. | Yes | N/A | `$HARNESS_PROJECT_ID` |
| `HARNESS_ACCOUNT_URL` | Harness base URL with scheme. Pass a non-masked CI/CD variable reference. | Yes | N/A | `$HARNESS_ACCOUNT_URL` |
| `TARGET` | Container image reference or local artifact path for which the SBOM is generated. | Yes | N/A | `$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA` |
| `SOURCE` | Source type. Supported values are `container` and `local`. | No | `container` | `local` |
| `TOOL` | SBOM generation tool. Supported values are `Syft` and `cdxgen`. | No | `Syft` | `cdxgen` |
| `FORMAT` | SBOM output format. Supported values are `spdx-json` and `cyclonedx-json`. | No | `spdx-json` | `cyclonedx-json` |
| `ATTEST` | Enables SBOM attestation. | No | `false` | `true` |
| `SBOM_OUTPUT_DIR` | Directory where the generated SBOM is stored. | No | `tmp` | `output` |
| `ARTIFACT_NAME` | Display name for a local artifact. Applicable when `SOURCE=local`. | No | File name from `TARGET` | `payment-service` |
| `ARTIFACT_VERSION` | Artifact version. Applicable when `SOURCE=local`. | No | N/A | `$CI_COMMIT_SHORT_SHA` |
| `stage` | GitLab pipeline stage in which the component runs. | No | `scs` | `security` |
| `job-name` | Name of the GitLab job created by the component. | No | `scs-sbom-orchestration` | `generate-sbom` |

:::note

By default, the component generates an SBOM for a container image. To generate an SBOM for a local artifact, set `SOURCE` to `local`. When using a local artifact, specify the artifact path in `TARGET` and provide an `ARTIFACT_VERSION`.

:::

To attest the generated SBOM, configure the attestation inputs (`ATTEST_WITH`, `OIDC_PROVIDER`, `FULCIO_URL`, `KMS_KEY`, and `VAULT_ADDR`) as described in [(Optional) Step 3 - Configure SBOM attestation](#optional-step-3---configure-sbom-attestation).

#### Override the generated job
 
Standard GitLab job keywords, such as `needs`, `before_script`, `script`, `after_script`, `allow_failure`, and `tags`, are not component inputs. To set them, redeclare the generated job (default name `scs-sbom-orchestration`, or the value of `job-name`) in your workflow file. GitLab merges your keys into the generated job.
 
```yaml
scs-sbom-orchestration:
  needs: [build-image]
  tags: [docker, linux]
  before_script:
    - echo "Starting SBOM orchestration"
  after_script:
    - echo "SBOM generation complete"
```

:::note

If you are generating an SBOM for an image in a private registry that is not the GitLab container registry, provide the registry credentials as masked GitLab CI/CD variables so that the component can access the image.

:::

### (Optional) Step 3 - Configure SBOM attestation

Harness supports the following attestation methods:

* **Keyless attestation** – Uses OpenID Connect (OIDC) identities to sign the generated SBOM without managing long-lived signing keys.
* **Key-based attestation** – Uses a cryptographic key managed through your organization's key management solution.
* **Secret Manager** – Uses signing keys stored in a supported secret manager.

:::note

SBOM attestation is disabled by default (`ATTEST: false`). The component generates and uploads the SBOM without signing it. If you plan to verify the SBOM attestation during [SBOM policy enforcement](/docs/software-supply-chain-assurance/open-source-management/sbom-gitlab-ci-cd/enforce-sbom-policies) (with `VERIFY: true`), set `ATTEST: true` to generate a signed attestation.

:::

Configure the appropriate attestation inputs based on the attestation method you want to use.

<Tabs>

<TabItem value="Configure keyless attestation" label="Configure keyless attestation"> 

If you enable SBOM attestation, you can configure **keyless attestation** to sign the generated SBOM using an OpenID Connect (OIDC) identity. For GitLab CI/CD, set `OIDC_PROVIDER` to `non-harness`. The `harness` OIDC provider is not supported as of now. Keyless attestation requires **GitLab 15.7** or later, because it depends on GitLab `id_tokens`. Configure the following inputs.
 
| Input | Description | Required |
| --- | --- | --- |
| `ATTEST_WITH` | Specifies the attestation method. Set the value to `keyless`. | Yes |
| `OIDC_PROVIDER` | OIDC provider used to obtain the signing identity. For GitLab CI/CD, set the value to `non-harness`. | Yes |
| `FULCIO_URL` | Fulcio certificate authority endpoint. Used when `OIDC_PROVIDER` is `non-harness`. Defaults to `https://fulcio.sigstore.dev`. | No |
 
Provide the OIDC token to the generated job using `id_tokens`. The component reads the token from `PLUGIN_NON_HARNESS_OIDC_TOKEN`.
 
```yaml
stages: [scs]
 
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/sbom-orchestration@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      ATTEST: "true"
      ATTEST_WITH: keyless
      OIDC_PROVIDER: non-harness

scs-sbom-orchestration:
  id_tokens:
    PLUGIN_NON_HARNESS_OIDC_TOKEN:
      aud: sigstore
```

</TabItem>

<TabItem value="Configure key-based attestation" label="Configure key-based attestation">

To sign the generated SBOM using a cryptographic key, set `ATTEST_WITH` to `keybased` and provide the Cosign key material as [masked GitLab CI/CD variables](https://docs.gitlab.com/ci/variables/#for-a-project) on the job. `KMS_KEY` isn't used for key-based attestation. It applies only to Secret Manager attestation.
 
| Input | Description | Required |
| --- | --- | --- |
| `ATTEST_WITH` | Specifies the attestation method. Set the value to `keybased`. | Yes |
 
Provide the following masked GitLab CI/CD variables on the job:
 
| Variable | Description | Required |
| --- | --- | --- |
| `SSCA_ORCHESTRATION_COSIGN_PRIVATE_KEY` | Cosign private key used to sign the SBOM attestation. | Yes |
| `SSCA_ORCHESTRATION_COSIGN_PASSWORD` | Password for the Cosign private key. | Yes |

</TabItem>

<TabItem value="Configure Secret Manager attestation" label="Configure Secret Manager attestation">

To use a signing key stored in a supported secret manager, configure the following inputs.
 
| Input | Description | Required |
| --- | --- | --- |
| `ATTEST_WITH` | Specifies the attestation method. Set the value to `secret-manager`. | Yes |
| `KMS_KEY` | KMS or Vault key URI for the signing key stored in the secret manager. | Yes |
| `VAULT_ADDR` | HashiCorp Vault address. Required when `KMS_KEY` uses a Vault URI. | Conditional |

</TabItem>

</Tabs>

### Step 4 - Review the workflow

After configuring the required GitLab CI/CD variables and component inputs, your GitLab workflow file should resemble the following example. This example generates an SBOM for a container image in Harness SCS and optionally attests the generated SBOM using Cosign with a key stored in HashiCorp Vault. The Harness scope variables are wired through `inputs`, `HARNESS_API_KEY` remains a masked GitLab CI/CD variable, and the Vault variables (`KMS_KEY` and `VAULT_ADDR`) are provided because attestation is enabled.
 
```yaml
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/sbom-orchestration@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      ATTEST: "true"
      ATTEST_WITH: secret-manager
      KMS_KEY: hashivault://cosign
      VAULT_ADDR: $VAULT_ADDR
```

### Step 5 - Run the pipeline

Commit your changes and run the GitLab pipeline. During pipeline execution, the SBOM Orchestration component analyzes the specified target, generates an SBOM, and uploads it to the SCS module. If SBOM attestation is enabled, the component also generates and signs an SBOM attestation using the configured attestation method. For more information on running a GitLab pipeline, see [Tutorial: Create and run your first GitLab CI/CD pipeline](https://docs.gitlab.com/ci/quick_start/).

After the pipeline completes, open the job execution logs and click the **Harness Artifact Details** link to view the generated artifact in SCS. For more information on viewing the status of a job and details of the pipeline, see [View the status of your pipeline and jobs](https://docs.gitlab.com/ci/quick_start/#view-the-status-of-your-pipeline-and-jobs).

<DocImage path={require('./static/sbom-generate-job.png')} width="100%" height="100%" title="Click to view full size image" />

The Artifact Details page displays the generated SBOM and its associated security results. The SBOM is also automatically recorded in the [Chain of Custody](https://developer.harness.io/docs/software-supply-chain-assurance/artifact-security/overview/#chain-of-custody), providing an immutable audit trail of the artifact lifecycle and the associated GitLab CI/CD pipeline execution. For more information on navigating through artifacts, see [Artifact Overview](/docs/software-supply-chain-assurance/artifact-security/overview/).

<DocImage path={require('./static/sbom-generation-artifact.png')} width="100%" height="100%" title="Click to view full size image" />

***

## Example SBOM generation workflow

<details>
  <summary>Example SBOM generation workflow for a container image</summary>
<div>

The following example demonstrates how to configure the SBOM Orchestration component in a GitLab workflow to generate an SBOM for a container image. The example also shows how to optionally attest the generated SBOM using Cosign with a key stored in HashiCorp Vault. `HARNESS_API_KEY` is consumed as a masked GitLab CI/CD variable and is not passed as a component input.
 
```yaml
stages:
  - build
  - scs
 
build-image:
  stage: build
  image: docker:24.0.5
  services:
    - docker:24.0.5-dind
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
 
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/sbom-orchestration@1.0.0
    inputs:
      stage: scs
      job-name: generate-sbom
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
 
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
 
      SOURCE: container
      TOOL: Syft
      FORMAT: spdx-json
 
      ATTEST: "true"
      ATTEST_WITH: secret-manager
      KMS_KEY: hashivault://cosign
      VAULT_ADDR: $VAULT_ADDR
```
</div>

</details>

<details>
  <summary>Example SBOM generation workflow for a local artifact</summary>
<div>
 
The following example generates an SBOM for a local artifact. It builds the artifact in an earlier job, passes it forward with `artifacts`, and uses `needs` so the SBOM job runs after the artifact is available. When `SOURCE` is `local`, `TARGET` is the artifact file path and `ARTIFACT_VERSION` is required.
 
```yaml
stages:
  - build
  - scs
 
build-artifact:
  stage: build
  script:
    - ./build.sh -o $CI_PROJECT_DIR/payment-service.jar
  artifacts:
    paths:
      - payment-service.jar
 
scs-sbom-orchestration:
  needs: [build-artifact]
 
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/sbom-orchestration@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
 
      SOURCE: local
      TARGET: $CI_PROJECT_DIR/payment-service.jar
      ARTIFACT_NAME: payment-service
      ARTIFACT_VERSION: $CI_COMMIT_SHORT_SHA
```
</div>

</details>

***

## Next steps

* [Ingest SBOM with GitLab CI/CD](/docs/software-supply-chain-assurance/open-source-management/sbom-gitlab-ci-cd/ingest-sbom) — Learn how to upload existing SBOMs generated by external tools or build processes to Harness SCS.
* [Enforce SBOM Policies with GitLab CI/CD](/docs/software-supply-chain-assurance/open-source-management/sbom-gitlab-ci-cd/enforce-sbom-policies) — Learn how to verify SBOM attestations and enforce software supply chain policies during pipeline execution.