---
title: Verify Artifacts with Harness GitLab CI/CD
description: Use Harness GitLab CI/CD to verify artifacts
sidebar_position: 20
tags:
  - harness-scs 
  - verify-artifacts-with-gitlab-ci-cd
  - artifact-verification
  - attestation
  - integrity
  - artifact-security
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Software artifacts are often distributed across multiple environments before they reach production. Even when an artifact has been digitally signed, organizations need a way to confirm that the signature is valid and that the artifact has not been modified after it was signed. Without signature verification, it becomes difficult to establish trust in released artifacts or detect unauthorized changes before deployment.

Harness Supply Chain Security (SCS) integrates with [GitLab CI/CD](https://gitlab.com/explore/catalog/harness-scs/gitlab-plugins?tab=components) to automate artifact signature verification as part of your GitLab workflow. It enables you to verify the Cosign signature bundle associated with container images or local artifacts during pipeline execution. By validating the artifact against a trusted verification key, you can confirm its authenticity and integrity before it progresses through your software delivery lifecycle.

***

## What will you learn in this topic?

By the end of this topic, you will be able to:

* Set up Harness GitLab CI/CD integration from your SCS project.
* Configure artifact verification in your GitLab workflow using the **Artifact Verification** component.
* Configure artifact verification using keyless, key-based, or Secret Manager verification methods.
* Verify the Cosign signature of container images or local artifacts before promoting or deploying them.

***

## Before you begin

Make a note of the following before you proceed with artifact verification using GitLab CI/CD:

* Understand how to create Harness API keys using Personal API Keys or Service Account API Keys. For more information, see [Manage API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys) and [Service Account API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens), respectively.
* If you're using key-based or Secret Manager signing or verification, create or configure a Cosign key pair before configuring the pipeline. For step-by-step instructions, see [Quickstart Signing and Verifying with Cosign](https://docs.sigstore.dev/quickstart/quickstart-cosign/#quickstart-signing-and-verifying-with-cosign), which explains how to generate a local key pair or create one using a supported KMS provider. The key should be generated using Cosign of type `ecdsa-P256`. You don't need to install Cosign on your GitLab runner. The `harness/ssca-plugin` container image used by the Harness GitLab CI/CD components includes Cosign, so no additional installation is required.
* If you plan to use Secret Manager attestation, store your verification key in a supported secret manager. Currently, Harness supports HashiCorp Vault. For GitLab CI/CD, you point the component at the key through pipeline variables such as `KMS_KEY` (and `VAULT_ADDR` when the key is stored in HashiCorp Vault), so you don't need to configure a Harness Secret Manager connector. For setup steps specific to HashiCorp Vault, see the [Add a HashiCorp Vault secret manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-hashicorp-vault/).
* Ensure that your GitLab runners support Docker-in-Docker (DinD). The component runs using the `docker:24-dind` service. For more information, go to [Use Docker-in-Docker](https://docs.gitlab.com/ci/docker/docker_in_docker/).

***

## Understand artifact verification with Harness GitLab CI/CD

Harness SCS integrates with GitLab CI/CD through reusable GitLab CI/CD components. These components enable you to automate software supply chain security tasks in your GitLab pipelines, helping you generate software metadata, establish artifact trust, and enforce security controls without adding custom implementation to your CI/CD workflow.

The **Artifact Verification** capability enables you to verify the Cosign signature bundle associated with container images or local artifacts during pipeline execution. The component validates the signature using the configured verification method to confirm that the artifact has not been modified since it was signed. It supports keyless, key-based, and Secret Manager verification methods to verify the signature against a trusted identity or verification key. Successful verification confirms that the artifact matches its signed state before allowing it to proceed through subsequent stages of the pipeline. This verification helps establish trust in software artifacts before they are promoted or deployed.

| **Why use it?** | **When to use it?** | **How can you leverage it?** |
| --- | --- | --- |
| Verify the authenticity and integrity of signed software artifacts. | When you want to confirm that an artifact has not been modified after it was signed. | Use signature verification as a deployment gate to ensure that only authenticated artifacts progress through your software delivery pipeline. |

***

## Set up Harness GitLab CI/CD

Before configuring artifact verification in your GitLab pipeline, set up Harness GitLab CI/CD from your SCS project. The setup guides you through creating or selecting a Harness API key and generates a project-specific YAML configuration with your Harness account ID, organization ID, project ID, and account URL already populated. You can copy this configuration into your GitLab workflow and update the remaining inputs as needed.

Complete the following steps to set up Harness GitLab CI/CD:

1. Navigate to the **Integrations** page under the **Manage** section from the sidebar navigation of your SCS account.
2. Click the `Add Integration` button to go to the **Configure Integration** page.<br />
   Alternatively, you can access this page by clicking **Get Started > Get Started** from the sidebar navigation of your SCS account.
3. Scroll down to the GitLab collapsible and click it to expand.
4. Click the `Configure` button under **Configure GitLab CI/CD in your pipeline to generate SBOM and SLSA, and sign artifacts** to open the **Configure Integration** page, where the Artifact Security feature cards are displayed.
5. Click the **Verify Artifacts** card to open the **Verify Artifacts** sidepanel.
6. Click the `Go to Key Generation` button to create the Harness API key required to configure Harness GitLab CI/CD.
    * Select **Using Service Account** from the dropdown to create the API key using a service account. For more information, see [Service Account API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens).
    * Select **Using Personal Account** from the dropdown to create a personal API key.
      Personal API keys are created at the account level and inherit the permissions assigned to your user account. For more information, see [Manage API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys).
7. Click **Copy** in the upper-right corner of the code block to copy the generated GitLab CI/CD configuration, and then paste it into your GitLab workflow file.

<DocImage path={require('./static/artifact-verification-gitlab.png')} width="100%" height="100%" title="Click to view full size image" />

***

## Configure artifact verification in GitLab CI/CD

After setting up Harness GitLab CI/CD, configure the **Artifact Verification** component in your GitLab workflow file. Add the required GitLab CI/CD variables to your GitLab project, configure the component inputs, configure the verification method, and run the pipeline. During pipeline execution, the component verifies the Cosign signature associated with the specified artifact before allowing the pipeline to continue. For the authoritative list of component inputs and defaults, see the CI/CD Catalog at [SCS GitLab Plugins](https://gitlab.com/explore/catalog/harness-scs/gitlab-plugins?tab=components#artifact-verification).

Complete the following steps to configure artifact verification:

1. [Add the required GitLab CI/CD variables](#step-1---add-the-required-gitlab-cicd-variables)
2. [Include the Artifact Verification component](#step-2---include-the-artifact-verification-component)
3. [Configure the verification method](#step-3---configure-the-verification-method)
4. [Review the workflow](#step-4---review-the-workflow)
5. [Run the pipeline](#step-5---run-the-pipeline)

### Step 1 - Add the required GitLab CI/CD variables

Before configuring the Artifact Verification component, add the following variables to your GitLab project. For step-by-step instructions, see [Define a CI/CD Variable for a project](https://docs.gitlab.com/ci/variables/#for-a-project).

| Variable | Description | Required | Example | Masked? |
| --- | --- | --- | --- | --- |
| `HARNESS_API_KEY` | Harness Personal API Key or Service Account API Key used to authenticate with Harness. | Yes | `pat.xxxxxxxxx` | Yes |
| `HARNESS_ACCOUNT_ID` | Harness account identifier. | Yes | `AbCdEf123456` | No |
| `HARNESS_ORG_ID` | Harness organization identifier. | Yes | `SCS_Org` | No |
| `HARNESS_PROJECT_ID` | Harness project identifier. | Yes | `SCS` | No |
| `HARNESS_ACCOUNT_URL` | Harness account URL. | Yes | `https://example.harness.io` | No |

:::note

These values are included in the generated YAML provided during the [Set up Harness GitLab CI/CD](#set-up-harness-gitlab-cicd) workflow.

:::

### Step 2 - Include the Artifact Verification component

Add an `scs` stage to your GitLab workflow file, or set the `stage` input on the component to an existing stage. Then, include the Harness **Artifact Verification** component in your GitLab workflow file.

The following code snippet demonstrates how to add the `scs` stage and include the Artifact Verification component in your GitLab workflow file. The snippet includes the minimum required component inputs because the component requires the Harness scope variables and the target artifact to run.

```yaml
stages: [scs]

include:
  - component: gitlab.com/harness-scs/gitlab-plugins/artifact-verification@1.0.0
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
| `TARGET` | Container image reference when `SOURCE` is `container`, or artifact file path when `SOURCE` is `local`. | Yes | N/A | `$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA` |
| `VERIFY` | Verifies the Cosign signature associated with the artifact. | No | `true` | `false` |
| `SOURCE` | Artifact source. Supported values are `container` and `local`. | No | `container` | `local` |
| `ARTIFACT_NAME` | Display name for a local artifact. Applicable when `SOURCE=local`. | No | File name from `TARGET` | `payment-service` |
| `ARTIFACT_VERSION` | Artifact version. Applicable when `SOURCE=local`. | No | N/A | `$CI_COMMIT_SHORT_SHA` |
| `stage` | GitLab pipeline stage in which the component runs. | No | `scs` | `security` |
| `job-name` | Name of the GitLab job created by the component. | No | `scs-artifact-verification` | `verify-artifact` |

:::note

By default, the component verifies the signature of a container image. To verify the signature of a local artifact, set `SOURCE` to `local`. When using a local artifact, specify the artifact path in `TARGET` and provide an `ARTIFACT_VERSION`.

:::

To verify the artifact signature, configure the verification inputs (`VERIFY_WITH`, `OIDC_PROVIDER`, `FULCIO_URL`, `KMS_KEY`, and `VAULT_ADDR`) as described in [Step 3 - Configure the verification method](#step-3---configure-the-verification-method).
 
#### Override the generated job
 
Standard GitLab job keywords, such as `needs`, `before_script`, `script`, `after_script`, `allow_failure`, and `tags`, are not component inputs. To set them, redeclare the generated job (default name `scs-artifact-verification`, or the value of `job-name`) in your workflow file. GitLab merges your keys into the generated job.
 
```yaml
scs-artifact-verification:
  needs: [scs-artifact-signing]
  tags: [docker, linux]
  before_script:
    - echo "Starting artifact verification"
  after_script:
    - echo "Artifact verification complete"
```
 
:::note

If you are verifying an image in a private registry that is not the GitLab container registry, provide the registry credentials as masked GitLab CI/CD variables so that the component can access the image.

:::

### Step 3 - Configure the verification method

Harness supports the following verification methods:

* **Keyless verification** – Uses OpenID Connect (OIDC) identities to verify artifact signatures without managing long-lived cryptographic keys.
* **Key-based verification** – Uses a verification key managed through your organization's key management service.
* **Secret Manager verification** – Uses a verification key stored in a supported secret manager.

:::note

Artifact verification always runs, and `VERIFY_WITH` selects the verification method. It defaults to `secret-manager`, which requires `KMS_KEY` and `VAULT_ADDR`. Configure one of the verification methods below before running the pipeline.

:::

Configure the appropriate verification inputs based on the verification method you want to use.

<Tabs>

<TabItem value="Configure keyless verification" label="Configure keyless verification">

To verify the signature using an OpenID Connect (OIDC) identity, configure **keyless verification**. For GitLab CI/CD, set `OIDC_PROVIDER` to `non-harness`. The `harness` OIDC provider is not supported as of now. Keyless verification requires **GitLab 15.7** or later, because it depends on GitLab `id_tokens`. Configure the following inputs.
 
| Input | Description | Required |
| --- | --- | --- |
| `VERIFY_WITH` | Specifies the verification method. Set the value to `keyless`. | Yes |
| `OIDC_PROVIDER` | OIDC provider used to obtain the verification identity. For GitLab CI/CD, set the value to `non-harness`. | Yes |
| `FULCIO_URL` | Fulcio certificate authority endpoint. Used when `OIDC_PROVIDER` is `non-harness`. Defaults to `https://fulcio.sigstore.dev`. | No |
 
Provide the OIDC token to the generated job using `id_tokens`. The component reads the token from `PLUGIN_NON_HARNESS_OIDC_TOKEN`.
 
```yaml
stages: [scs]
 
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/artifact-verification@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      VERIFY_WITH: keyless
      OIDC_PROVIDER: non-harness
 
scs-artifact-verification:
  id_tokens:
    PLUGIN_NON_HARNESS_OIDC_TOKEN:
      aud: sigstore
```

</TabItem>

<TabItem value="Configure key-based verification" label="Configure key-based verification">

To verify the signature using a cryptographic key, set `VERIFY_WITH` to `keybased` and provide the Cosign key material as masked GitLab CI/CD variables on the job. `KMS_KEY` isn't used for key-based verification. It applies only to Secret Manager verification.
 
| Input | Description | Required |
| --- | --- | --- |
| `VERIFY_WITH` | Specifies the verification method. Set the value to `keybased`. | Yes |
 
Provide the following masked GitLab CI/CD variable on the job:
 
| Variable | Description | Required |
| --- | --- | --- |
| `SSCA_ARTIFACT_VERIFICATION_COSIGN_PUBLIC_KEY` | Cosign public key used to verify the artifact signature. | Yes |

</TabItem>

<TabItem value="Configure Secret Manager verification" label="Configure Secret Manager verification">

To use a verification key stored in a supported secret manager, configure the following inputs.
 
| Input | Description | Required |
| --- | --- | --- |
| `VERIFY_WITH` | Specifies the verification method. Set the value to `secret-manager`. | Yes |
| `KMS_KEY` | KMS or Vault key URI for the verification key stored in the secret manager. | Yes |
| `VAULT_ADDR` | HashiCorp Vault address. Required when `KMS_KEY` uses a Vault URI. | Conditional |

</TabItem>

</Tabs>

### Step 4 - Review the workflow

After configuring the required GitLab CI/CD variables and component inputs, your GitLab workflow file should resemble the following example. This example verifies the signature of a container image in Harness SCS using Cosign with a verification key stored in HashiCorp Vault. The Harness scope variables are wired through `inputs`, `HARNESS_API_KEY` remains a masked GitLab CI/CD variable, and the Vault variables (`KMS_KEY` and `VAULT_ADDR`) are provided for Secret Manager verification.
 
```yaml
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/artifact-verification@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      VERIFY_WITH: secret-manager
      KMS_KEY: hashivault://cosign
      VAULT_ADDR: $VAULT_ADDR
```

### Step 5 - Run the pipeline

Commit and push your changes to trigger the GitLab pipeline. During pipeline execution, the Artifact Verification component validates the Cosign signature associated with the specified artifact. If the signature verification succeeds, the pipeline continues to the subsequent stages. For more information on running a GitLab pipeline, see [Tutorial: Create and run your first GitLab CI/CD pipeline](https://docs.gitlab.com/ci/quick_start/).

After the pipeline completes, open the job execution logs and click the **Harness Artifact Details** link to view the generated artifact in SCS. For more information on viewing the status of a job and details of the pipeline, see [View the status of your pipeline and jobs](https://docs.gitlab.com/ci/quick_start/#view-the-status-of-your-pipeline-and-jobs).

<DocImage path={require('./static/artifact-verify-job.png')} width="100%" height="100%" title="Click to view full size image" />

The Artifact Details page displays the artifact signature verification results. The verification results are also recorded in the [Chain of Custody](https://developer.harness.io/docs/software-supply-chain-assurance/artifact-security/overview/#chain-of-custody), providing an immutable audit trail of the artifact lifecycle and the associated GitLab CI/CD pipeline execution. For more information on navigating through artifacts, see [Artifact Overview](/docs/software-supply-chain-assurance/artifact-security/overview/).

<DocImage path={require('./static/artifact-verify-harness.png')} width="100%" height="100%" title="Click to view full size image" />

***

## Example artifact verification workflow

<details>
  <summary>Example Artifact verification workflow for a container image</summary>
<div>

The following example demonstrates how to configure the Artifact Verification component in a GitLab workflow to verify the signature of a container image. The artifact is signed earlier in the pipeline using the Artifact Signing component, and the verification job uses `needs` to run after the signing job. The example uses a verification key stored in HashiCorp Vault.
 
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
 
scs-artifact-verification:
  needs: [sign-artifact]
 
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/artifact-signing@1.0.0
    inputs:
      stage: scs
      job-name: sign-artifact
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      SIGN_WITH: secret-manager
      KMS_KEY: hashivault://cosign
      VAULT_ADDR: $VAULT_ADDR
 
  - component: gitlab.com/harness-scs/gitlab-plugins/artifact-verification@1.0.0
    inputs:
      stage: scs
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      VERIFY_WITH: secret-manager
      KMS_KEY: hashivault://cosign
      VAULT_ADDR: $VAULT_ADDR
```
</div>

</details>

<details>
  <summary>Example Artifact verification workflow for a local artifact</summary>
<div>
 
The following example verifies the signature of a local artifact. It builds the artifact in an earlier job, passes it forward with `artifacts`, and uses `needs` so the verification job runs after the artifact is available. When `SOURCE` is `local`, `TARGET` is the artifact file path and `ARTIFACT_VERSION` is required.
 
```yaml
stages:
  - build
  - scs
 
build-artifact:
  stage: build
  script:
    - ./build.sh -o $CI_PROJECT_DIR/target/myapp.jar
  artifacts:
    paths:
      - target/myapp.jar
 
scs-artifact-verification:
  needs: [build-artifact]
 
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/artifact-verification@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
 
      SOURCE: local
      TARGET: $CI_PROJECT_DIR/target/myapp.jar
      ARTIFACT_VERSION: $CI_COMMIT_SHORT_SHA
      VERIFY_WITH: secret-manager
      KMS_KEY: hashivault://cosign
      VAULT_ADDR: $VAULT_ADDR
```
</div>

</details>

***

## Next steps

* [Generate SLSA with Harness GitLab CI/CD](/docs/software-supply-chain-assurance/artifact-security/slsa/slsa-gitlab-ci-cd/generate-slsa) - Learn how to generate and attest SLSA provenance for software artifacts during pipeline execution.
* [Verify SLSA with GitLab CI/CD](/docs/software-supply-chain-assurance/artifact-security/slsa/slsa-gitlab-ci-cd/verify-slsa) - Learn how to verify SLSA provenance and validate the integrity of software artifacts before promotion or deployment.