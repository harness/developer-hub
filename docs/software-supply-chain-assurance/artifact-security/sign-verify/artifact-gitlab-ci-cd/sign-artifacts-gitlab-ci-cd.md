---
title: Sign Artifacts with Harness GitLab CI/CD
description: Use Harness GitLab CI/CD to sign artifacts
sidebar_position: 10

tags:

  - harness-scs 
  - sign-artifacts-with-gitlab-ci-cd
  - artifact-security
  - attestation
  - integrity
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Software artifacts are often shared across multiple environments before they reach production. Without a trusted way to prove who created an artifact and whether it has been modified, organizations cannot confidently establish its authenticity or detect unauthorized changes during the software delivery process.

Harness Supply Chain Security (SCS) integrates with [GitLab CI/CD](https://gitlab.com/explore/catalog/harness-scs/gitlab-plugins?tab=components) to automate artifact signing as part of your GitLab workflow. It enables you to digitally sign container images and local artifacts during pipeline execution using Cosign. The generated signature is uploaded to the SCS module, helping you establish artifact authenticity, detect tampering, and strengthen trust across your software supply chain.

***

## What will you learn in this topic?

By the end of this topic, you will be able to:

* Set up Harness GitLab CI/CD integration from your SCS project.
* Configure artifact signing in your GitLab workflow using the **Artifact Signing** component.
* Configure artifact signing using keyless, key-based, or Secret Manager signing methods.
* Sign container images or local artifacts and upload the signature bundle to the SCS module.

***

## Before you begin

Make a note of the following before you proceed with signing artifacts using GitLab CI/CD:

* Understand how to create Harness API keys using Personal API Keys or Service Account API Keys. For more information, go to [Manage API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys) and [Service Account API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens), respectively.
* If you're using key-based or Secret Manager signing or verification, create or configure a Cosign key pair before configuring the pipeline. For step-by-step instructions, see [Quickstart Signing and Verifying with Cosign](https://docs.sigstore.dev/quickstart/quickstart-cosign/#quickstart-signing-and-verifying-with-cosign), which explains how to generate a local key pair or create one using a supported KMS provider. The key should be generated using Cosign of type `ecdsa-P256`. You don't need to install Cosign on your GitLab runner. The `harness/ssca-plugin` container image used by the Harness GitLab CI/CD components includes Cosign, so no additional installation is required.
* If you plan to use Secret Manager attestation, store your signing key in a supported secret manager. Currently, Harness supports HashiCorp Vault. For GitLab CI/CD, you point the component at the key through pipeline variables such as `KMS_KEY` (and `VAULT_ADDR` when the key is stored in HashiCorp Vault), so you don't need to configure a Harness Secret Manager connector. For setup steps specific to HashiCorp Vault, see the [Add a HashiCorp Vault secret manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-hashicorp-vault/).
* Ensure that your GitLab runners support Docker-in-Docker (DinD). The component runs using the `docker:24-dind` service. For more information, go to [Use Docker-in-Docker](https://docs.gitlab.com/ci/docker/docker_in_docker/).

***

## Understand artifact signing with Harness GitLab CI/CD

Harness SCS integrates with GitLab CI/CD through reusable GitLab CI/CD components. These components enable you to automate software supply chain security tasks in your GitLab pipelines, helping you build, verify, and govern software artifacts without adding custom implementation to your CI/CD workflow.

The **Artifact Signing** capability enables you to digitally sign container images and local artifacts during pipeline execution using Cosign. The generated signature establishes the authenticity and integrity of an artifact by creating verifiable proof that it was signed using a trusted identity or signing key. It supports keyless, key-based, and Secret Manager signing, allowing you to choose the signing approach that best fits your organization's security requirements. The signature bundle is uploaded to the SCS module, where it can be used for subsequent downstream verification and policy enforcement workflows.

By incorporating artifact signing into your GitLab pipeline, you can build trust in software artifacts before they are distributed or deployed and help ensure that only authenticated artifacts move through your software delivery lifecycle.

| **Why use it?** | **When to use it?** | **How can you leverage it?** |
| --- | --- | --- |
| Digitally sign software artifacts to establish their authenticity and integrity. | When you want to ensure that artifacts can be verified before distribution or deployment. | Use artifact signatures to support provenance verification, policy enforcement, and trusted software delivery across your software supply chain. |

***

## Set up Harness GitLab CI/CD

Before configuring artifact signing in your GitLab pipeline, set up Harness GitLab CI/CD from your SCS project. The setup guides you through creating or selecting a Harness API key and generates a project-specific YAML configuration with your Harness account ID, organization ID, project ID, and account URL already populated. You can copy this configuration into your GitLab workflow and update the remaining inputs as needed.

Complete the following steps to set up Harness GitLab CI/CD:

1. Navigate to the **Integrations** page under the **Manage** section from the sidebar navigation of your SCS account.
2. Click the `Add Integration` button to go to the **Configure Integration** page.<br />
   Alternatively, you can access this page by clicking **Get Started > Get Started** from the sidebar navigation of your SCS account.
3. Scroll down to the GitLab collapsible and click it to expand.
4. Click the `Configure` button under **Configure GitLab CI/CD in your pipeline to generate SBOM and SLSA, and sign artifacts** to open the **Configure Integration** page, where the Artifact Security feature cards are displayed.
5. Click the **Sign Artifacts** card to open the **Sign Artifacts** sidepanel.
6. Click the `Go to Key Generation` button to create the Harness API key required to configure Harness GitLab CI/CD.
    * Select **Using Service Account** from the dropdown to create the API key using a service account. For more information, see [Service Account API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens).
    * Select **Using Personal Account** from the dropdown to create a personal API key.
      Personal API keys are created at the account level and inherit the permissions assigned to your user account. For more information, see [Manage API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys).
7. Click **Copy** in the upper-right corner of the code block to copy the generated GitLab CI/CD configuration, and then paste it into your GitLab workflow file.

<DocImage path={require('./static/artifact-signing-gitlab.png')} width="100%" height="100%" title="Click to view full size image" />

***

## Configure artifact signing in GitLab CI/CD

After setting up Harness GitLab CI/CD, configure the **Artifact Signing** component in your GitLab workflow file. Add the required GitLab CI/CD variables to your GitLab project, configure the component inputs, configure the signing method, and run the pipeline. During pipeline execution, the component signs the specified artifact and uploads the generated signature bundle to the SCS module. For the authoritative list of component inputs and defaults, see the CI/CD Catalog at [SCS GitLab Plugins](https://gitlab.com/explore/catalog/harness-scs/gitlab-plugins?tab=components#artifact-signing).

Complete the following steps to configure Artifact Signing:

1. [Add the required GitLab CI/CD variables](#step-1---add-the-required-gitlab-cicd-variables)
2. [Include the Artifact Signing component](#step-2---include-the-artifact-signing-component)
3. [Configure the signing method](#step-3---configure-the-signing-method)
4. [Review the workflow](#step-4---review-the-workflow)
5. [Run the pipeline](#step-5---run-the-pipeline)

### Step 1 - Add the required GitLab CI/CD variables

Before configuring the Artifact Signing component, add the following variables to your GitLab project. For step-by-step instructions, see [Define a CI/CD Variable for a project](https://docs.gitlab.com/ci/variables/#for-a-project).

| **Variable** | **Description** | **Required** | **Example** | **Masked?** |
| --- | --- | --- | --- | --- |
| `HARNESS_API_KEY` | Harness Personal API Key or Service Account API Key used to authenticate with Harness. | Yes | `pat.xxxxxxxxx` | Yes |
| `HARNESS_ACCOUNT_ID` | Harness account identifier. | Yes | `AbCdEf123456` | No |
| `HARNESS_ORG_ID` | Harness organization identifier. | Yes | `SCS_Org` | No |
| `HARNESS_PROJECT_ID` | Harness project identifier. | Yes | `SCS` | No |
| `HARNESS_ACCOUNT_URL` | Harness account URL. | Yes | `https://example.harness.io` | No |

:::note

Masked GitLab CI/CD variables cannot be passed through component inputs. For this reason, the Harness scope variables (`HARNESS_ACCOUNT_ID`, `HARNESS_ORG_ID`, `HARNESS_PROJECT_ID`, and `HARNESS_ACCOUNT_URL`) must remain unmasked so that they can be wired through the component `inputs`. `HARNESS_API_KEY` remains masked and is consumed directly from the job environment, not passed as a component input. These values are included in the generated YAML provided during the [Set up Harness GitLab CI/CD](#set-up-harness-gitlab-cicd) workflow.

:::

### Step 2 - Include the Artifact Signing component

Add an `scs` stage to your GitLab workflow file, or set the `stage` input on the component to an existing stage. Then, include the Harness **Artifact Signing** component in your GitLab workflow file.

The following code snippet demonstrates how to add the `scs` stage and include the Artifact Signing component in your GitLab workflow file. The snippet includes the minimum required component inputs because the component requires the Harness scope variables and the target artifact to run.

```yaml
stages: [scs]

include:
  - component: gitlab.com/harness-scs/gitlab-plugins/artifact-signing@1.0.0
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
| `SOURCE` | Artifact source. Supported values are `container` and `local`. | No | `container` | `local` |
| `ARTIFACT_NAME` | Display name for a local artifact. Applicable when `SOURCE=local`. | No | File name from `TARGET` | `payment-service` |
| `ARTIFACT_VERSION` | Artifact version. Applicable when `SOURCE=local`. | No | N/A | `$CI_COMMIT_SHORT_SHA` |
| `stage` | GitLab pipeline stage in which the component runs. | No | `scs` | `security` |
| `job-name` | Name of the GitLab job created by the component. | No | `scs-artifact-signing` | `sign-artifact` |

:::note

By default, the component signs a container image. To sign a local artifact, set `SOURCE` to `local`. When using a local artifact, specify the artifact path in `TARGET` and provide an `ARTIFACT_VERSION`.

:::

To choose a signing method, configure the signing inputs (`SIGN_WITH`, `OIDC_PROVIDER`, `FULCIO_URL`, `KMS_KEY`, and `VAULT_ADDR`) as described in [Step 3 - Configure the signing method](#step-3---configure-the-signing-method).
 
#### Override the generated job
 
Standard GitLab job keywords, such as `needs`, `before_script`, `script`, `after_script`, `allow_failure`, and `tags`, are not component inputs. To set them, redeclare the generated job (default name `scs-artifact-signing`, or the value of `job-name`) in your workflow file. GitLab merges your keys into the generated job.
 
```yaml
scs-artifact-signing:
  needs: [build-image]
  tags: [docker, linux]
  before_script:
    - echo "Starting artifact signing"
  after_script:
    - echo "Artifact signing complete"
```
 
:::note

If you are signing an image in a private registry that is not the GitLab container registry, provide the registry credentials as masked GitLab CI/CD variables so that the component can access the image.

:::

### Step 3 - Configure the signing method

Harness supports the following signing methods:

* **Keyless signing** – Uses OpenID Connect (OIDC) identities to sign artifacts without managing long-lived signing keys.
* **Key-based signing** – Uses a cryptographic key managed through your organization's key management solution.
* **Secret Manager** – Uses signing keys stored in a supported secret manager.

:::note

Artifact signing always runs, and `SIGN_WITH` selects the signing method. It defaults to `secret-manager`, which requires `KMS_KEY` and `VAULT_ADDR`. Configure one of the signing methods below before running the pipeline.

:::

Configure the appropriate signing inputs based on the signing method you want to use.

<Tabs>

<TabItem value="Configure keyless signing" label="Configure keyless signing">

Configure the following inputs to sign artifacts using **keyless signing**. This method uses an OpenID Connect (OIDC) identity to authenticate the signing operation without requiring long-lived signing keys. For GitLab CI/CD, set `OIDC_PROVIDER` to `non-harness`. The `harness` OIDC provider is not supported as of now. Keyless signing requires **GitLab 15.7** or later, because it depends on GitLab `id_tokens`.
 
| Input | Description | Required |
| --- | --- | --- |
| `SIGN_WITH` | Specifies the signing method. Set the value to `keyless`. | Yes |
| `OIDC_PROVIDER` | OIDC provider used to obtain the signing identity. For GitLab CI/CD, set the value to `non-harness`. | Yes |
| `FULCIO_URL` | Fulcio certificate authority endpoint. Used when `OIDC_PROVIDER` is `non-harness`. Defaults to `https://fulcio.sigstore.dev`. | No |
 
Provide the OIDC token to the generated job using `id_tokens`. The component reads the token from `PLUGIN_NON_HARNESS_OIDC_TOKEN`.
 
```yaml
stages: [scs]
 
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/artifact-signing@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      SIGN_WITH: keyless
      OIDC_PROVIDER: non-harness
 
scs-artifact-signing:
  id_tokens:
    PLUGIN_NON_HARNESS_OIDC_TOKEN:
      aud: sigstore
```

</TabItem>

<TabItem value="Configure key-based signing" label="Configure key-based signing">

To sign artifacts using a **key-based signing** method, set `SIGN_WITH` to `keybased` and provide the Cosign key material as masked GitLab CI/CD variables on the job. `KMS_KEY` isn't used for key-based signing. It applies only to Secret Manager signing.
 
| Input | Description | Required |
| --- | --- | --- |
| `SIGN_WITH` | Specifies the signing method. Set the value to `keybased`. | Yes |
 
Provide the following masked GitLab CI/CD variables on the job:
 
| Variable | Description | Required |
| --- | --- | --- |
| `SSCA_ARTIFACT_SIGNING_COSIGN_PRIVATE_KEY` | Cosign private key used to sign the artifact. | Yes |
| `SSCA_ARTIFACT_SIGNING_COSIGN_PASSWORD` | Password for the Cosign private key. | Yes |

</TabItem>

<TabItem value="Configure Secret Manager signing" label="Configure Secret Manager signing">

Configure the following inputs to sign artifacts using a **Secret Manager**. This method uses a signing key stored in a supported secret manager, such as HashiCorp Vault.
 
| Input | Description | Required |
| --- | --- | --- |
| `SIGN_WITH` | Specifies the signing method. Set the value to `secret-manager`. | Yes |
| `KMS_KEY` | KMS or Vault key URI for the signing key stored in the secret manager (for example, `hashivault://cosign`, `gcpkms://projects/…`, or `awskms://…`). | Yes |
| `VAULT_ADDR` | HashiCorp Vault address. Required when `KMS_KEY` uses a Vault URI. | Conditional |

</TabItem>

</Tabs>

### Step 4 - Review the workflow

After configuring the required GitLab CI/CD variables and component inputs, your GitLab workflow file should resemble the following example. This example signs a container image using Cosign with a signing key stored in HashiCorp Vault and uploads the generated signature to Harness SCS. The Harness scope variables are wired through `inputs`, `HARNESS_API_KEY` remains a masked GitLab CI/CD variable, and the Vault variables (`KMS_KEY` and `VAULT_ADDR`) are provided for Secret Manager signing.
 
```yaml
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/artifact-signing@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      SIGN_WITH: secret-manager
      KMS_KEY: hashivault://cosign
      VAULT_ADDR: $VAULT_ADDR
```

### Step 5 - Run the pipeline

Commit and push your changes to trigger the GitLab pipeline. During pipeline execution, the Artifact Signing component signs the specified artifact and uploads the generated signature bundle to the SCS module. The signed artifact can then be verified as part of subsequent software supply chain security workflows. For more information on running a GitLab pipeline, see [Tutorial: Create and run your first GitLab CI/CD pipeline](https://docs.gitlab.com/ci/quick_start/).

After the pipeline completes, open the job execution logs and click the **Harness Artifact Details** link to view the generated artifact in SCS. For more information on viewing the status of a job and details of the pipeline, see [View the status of your pipeline and jobs](https://docs.gitlab.com/ci/quick_start/#view-the-status-of-your-pipeline-and-jobs).

<DocImage path={require('./static/artifact-sign-job.png')} width="100%" height="100%" title="Click to view full size image" />

The Artifact Details page displays the artifact signature and its associated security results. The signing operation is also recorded in the [Chain of Custody](https://developer.harness.io/docs/software-supply-chain-assurance/artifact-security/overview/#chain-of-custody), providing an immutable audit trail of the artifact lifecycle and the associated GitLab CI/CD pipeline execution. For more information on navigating through artifacts, see [Artifact Overview](/docs/software-supply-chain-assurance/artifact-security/overview/).

<DocImage path={require('./static/artifact-sign-harness.png')} width="100%" height="100%" title="Click to view full size image" />

***

## Example artifact signing workflow

<details>
  <summary>Example Artifact signing workflow for a container image</summary>
<div>

The following example demonstrates how to configure the Artifact Signing component in a GitLab workflow to sign a container image. The example uses Cosign with a signing key stored in HashiCorp Vault and uploads the generated signature bundle to Harness SCS.
 
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
```

</div>

</details>

<details>
  <summary>Example Artifact signing workflow for a local artifact</summary>
<div>
 
The following example signs a local artifact. It builds the artifact in an earlier job, passes it forward with `artifacts`, and uses `needs` so the signing job runs after the artifact is available. When `SOURCE` is `local`, `TARGET` is the artifact file path and `ARTIFACT_VERSION` is required.
 
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
 
scs-artifact-signing:
  needs: [build-artifact]
 
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/artifact-signing@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
 
      SOURCE: local
      TARGET: $CI_PROJECT_DIR/target/myapp.jar
      ARTIFACT_VERSION: $CI_COMMIT_SHORT_SHA
      SIGN_WITH: secret-manager
      KMS_KEY: hashivault://cosign
      VAULT_ADDR: $VAULT_ADDR
```
</div>

</details>

***

## Next steps

* [Verify Artifacts with GitLab CI/CD](/docs/software-supply-chain-assurance/artifact-security/sign-verify/artifact-gitlab-ci-cd/verify-artifacts-gitlab-ci-cd) - Learn how to verify artifact signatures to confirm the authenticity and integrity of software artifacts before deployment.
* [Generate SLSA with Harness GitLab CI/CD](/docs/software-supply-chain-assurance/artifact-security/slsa/slsa-gitlab-ci-cd/generate-slsa) - Learn how to generate and attest SLSA provenance for software artifacts during pipeline execution.
* [Verify SLSA with GitLab CI/CD](/docs/software-supply-chain-assurance/artifact-security/slsa/slsa-gitlab-ci-cd/verify-slsa) - Learn how to verify SLSA provenance and validate the integrity of software artifacts before promotion or deployment.