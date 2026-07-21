---
title: Enforce policies with Harness GitLab CI/CD
description: Use SCS GitLab CI/CD to implement SBOM Verification and Policy Enforcement.
sidebar_position: 22


tags:
  - harness-scs 
  - enforce-sbom-policies
  - open-source-management
  - sbom
  - policy-enforcement
  - supply-chain-visibility 
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Modern software supply chains often rely on security policies to determine whether an artifact is safe to promote or deploy. Without automated policy enforcement, security and compliance checks can be inconsistent, allowing artifacts that violate organizational policies to progress through the software delivery lifecycle.

Harness Supply Chain Security (SCS) integrates with [GitLab CI/CD](https://gitlab.com/explore/catalog/harness-scs/gitlab-plugins?tab=components) to automate SBOM policy enforcement as part of your GitLab workflow. It enables you to verify SBOM attestations and evaluate software artifacts against policy sets defined in SCS during pipeline execution. Based on the evaluation results, the pipeline can help prevent artifacts that do not meet your organization's security and compliance requirements from progressing through the software delivery lifecycle.

***

## What will you learn in this topic?

By the end of this topic, you will be able to:

* Set up Harness GitLab CI/CD integration from your SCS project.
* Configure SBOM policy enforcement in your GitLab workflow using the **SBOM Policy Enforcement** component.
* Configure optional SBOM attestation verification using keyless, key-based, or Secret Manager verification methods.
* Enforce SBOM policies against software artifacts before promotion or deployment.

***

## Before you begin

Make a note of the following before you proceed with enforcing SBOM policies using GitLab CI/CD:

* Understand how to create Harness API keys using Personal API Keys or Service Account API Keys. For more information, go to [Manage API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys) and [Service Account API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens), respectively.
* If you're using key-based or Secret Manager signing or verification, create or configure a Cosign key pair before configuring the pipeline. For step-by-step instructions, see [Quickstart Signing and Verifying with Cosign](https://docs.sigstore.dev/quickstart/quickstart-cosign/#quickstart-signing-and-verifying-with-cosign), which explains how to generate a local key pair or create one using a supported KMS provider. The key should be generated using Cosign of type `ecdsa-P256`. You don't need to install Cosign on your GitLab runner. The `harness/ssca-plugin` container image used by the Harness GitLab CI/CD components includes Cosign, so no additional installation is required.
* If you plan to use Secret Manager attestation, store your verification key in a supported secret manager. Currently, Harness supports HashiCorp Vault. For GitLab CI/CD, you point the component at the key through pipeline variables such as `KMS_KEY` (and `VAULT_ADDR` when the key is stored in HashiCorp Vault), so you don't need to configure a Harness Secret Manager connector. For setup steps specific to HashiCorp Vault, see the [Add a HashiCorp Vault secret manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-hashicorp-vault/).
* Ensure that your GitLab runners support Docker-in-Docker (DinD). The component runs using the `docker:24-dind` service. For more information, go to [Use Docker-in-Docker](https://docs.gitlab.com/ci/docker/docker_in_docker/).
* Ensure that you create an Open Policy Agent (OPA) SBOM policy set in SCS before configuring the SBOM Policy Enforcement component. For more information, go to [Create SBOM Policies](https://developer.harness.io/docs/software-supply-chain-assurance/open-source-management/create-sbom-policies).

***

## Understand SBOM policy enforcement with Harness GitLab CI/CD

Harness SCS integrates with GitLab CI/CD through reusable GitLab CI/CD components. These components enable you to automate software supply chain security tasks in your GitLab pipelines, helping you build, verify, and govern software artifacts without adding custom implementation to your CI/CD workflow.

The **SBOM Policy Enforcement** component verifies the SBOM attestation associated with a container image or local artifact and evaluates the uploaded SBOM against the specified policy set configured in Harness SCS. During pipeline execution, the component validates the SBOM attestation using the configured verification method and then evaluates the artifact against the configured OPA policy set. Based on the policy evaluation results, the pipeline either continues or blocks the artifact from progressing to subsequent stages.

| **Why use it?** | **When to use it?** | **How can you leverage it?** |
| --- | --- | --- |
| Enforce security and compliance policies against software artifacts before release. | When you want to validate SBOM attestations and ensure artifacts comply with organizational policies before promotion or deployment. | Use policy evaluation results to prevent non-compliant artifacts from progressing through your software delivery lifecycle. |

***

## Set up Harness GitLab CI/CD

Before configuring SBOM policy enforcement in your GitLab pipeline, set up Harness GitLab CI/CD from your SCS project. The setup guides you through creating or selecting a Harness API key and generates a project-specific YAML configuration with your Harness account ID, organization ID, project ID, and account URL already populated. You can copy this configuration into your GitLab workflow and update the remaining inputs as needed.

Complete the following steps to set up Harness GitLab CI/CD:

1. Navigate to the **Integrations** page under the **Manage** section from the sidebar navigation of your SCS account.
2. Click the `Add Integration` button to go to the **Configure Integration** page.<br />
   Alternatively, you can access this page by clicking **Get Started > Get Started** from the sidebar navigation of your SCS account.
3. Scroll down to the GitLab collapsible and click it to expand.
4. Click the `Configure` button under **Configure GitLab CI/CD in your pipeline to generate SBOM and SLSA, and sign artifacts** to open the **Configure Integration** page, where the Artifact Security feature cards are displayed.
5. Click the **Verify SBOM** card to open the **SBOM Verification** sidepanel.
6. Click the `Go to Key Generation` button to create the Harness API key required to configure Harness GitLab CI/CD.
    * Select **Using Service Account** from the dropdown to create the API key using a service account. For more information, see [Service Account API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys#create-service-account-api-keys-and-tokens).
    * Select **Using Personal Account** from the dropdown to create a personal API key.
      Personal API keys are created at the account level and inherit the permissions assigned to your user account. For more information, see [Manage API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys).
7. Click **Copy** in the upper-right corner of the code block to copy the generated GitLab CI/CD configuration, and then paste it into your GitLab workflow file.

<DocImage path={require('./static/sbom-verification-gitlab.png')} width="100%" height="100%" title="Click to view full size image" />

***

## Configure SBOM policy enforcement in GitLab CI/CD

After setting up Harness GitLab CI/CD, configure the **SBOM Policy Enforcement** component in your GitLab workflow file. Add the required GitLab CI/CD variables to your GitLab project, configure the component inputs, configure the attestation verification settings if required, and run the pipeline. During pipeline execution, the component evaluates the specified artifact against the configured policy set and enforces the policy results. For the authoritative list of component inputs and defaults, see the CI/CD Catalog at [SCS GitLab Plugins](https://gitlab.com/explore/catalog/harness-scs/gitlab-plugins?tab=components#sbom-policy-enforcement).

Complete the following steps to configure SBOM policy enforcement:

1. [Add the required GitLab CI/CD variables](#step-1---add-the-required-gitlab-cicd-variables)
2. [Include the SBOM Policy Enforcement component](#step-2---include-the-sbom-policy-enforcement-component)
3. [Configure SBOM verification in the workflow](#step-3---configure-sbom-verification)
4. [Review the workflow](#step-4---review-the-workflow)
5. [Run the pipeline](#step-5---run-the-pipeline)

### Step 1 - Add the required GitLab CI/CD variables

Before configuring the SBOM Policy Enforcement component, add the following variables to your GitLab project. For step-by-step instructions, see [Define a CI/CD Variable for a project](https://docs.gitlab.com/ci/variables/#for-a-project).

| Variable | Description | Required | Example | Masked? |
| --- | --- | --- | --- | --- |
| `HARNESS_API_KEY` | Harness Personal API Key or Service Account API Key used to authenticate with Harness. | Yes | `pat.xxxxxxxxx` | Yes |
| `HARNESS_ACCOUNT_ID` | Harness account identifier. | Yes | `AbCdEf123456` | No |
| `HARNESS_ORG_ID` | Harness organization identifier. | Yes | `SCS_Org` | No |
| `HARNESS_PROJECT_ID` | Harness project identifier. | Yes | `SCS` | No |
| `HARNESS_ACCOUNT_URL` | Harness account URL. | Yes | `https://example.harness.io` | No |

:::note

Masked GitLab CI/CD variables cannot be passed through component inputs. For this reason, the Harness scope variables (`HARNESS_ACCOUNT_ID`, `HARNESS_ORG_ID`, `HARNESS_PROJECT_ID`, and `HARNESS_ACCOUNT_URL`) must remain unmasked so that they can be wired through the component `inputs`. `HARNESS_API_KEY` remains masked and is consumed directly from the job environment, not passed as a component input. These values are included in the generated YAML provided during the [Set up Harness GitLab CI/CD](#set-up-harness-gitlab-cicd) workflow.

:::

### Step 2 - Include the SBOM Policy Enforcement component

Add an `scs` stage to your GitLab workflow file, or set the `stage` input on the component to an existing stage. Then, include the Harness **SBOM Policy Enforcement** component in your GitLab workflow file.

The following code snippet demonstrates how to add the `scs` stage and include the SBOM Policy Enforcement component in your GitLab workflow file. The snippet includes the minimum required component inputs because the component requires the Harness scope variables and the target artifact to run.

```yaml
stages: [scs]

include:
  - component: gitlab.com/harness-scs/gitlab-plugins/sbom-policy-enforcement@1.0.0
    inputs:
        HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
        HARNESS_ORG_ID: $HARNESS_ORG_ID
        HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
        HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
        TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
        POLICY_SET_REF: account.my_policy_set
```

Configure the component using the GitLab CI/CD variables created in the previous step and the following component inputs.

| **Input** | **Description** | **Required** | **Default** | **Example** |
| --- | --- | --- | --- | --- |
| `HARNESS_ACCOUNT_ID` | Harness account ID. Pass a non-masked CI/CD variable reference. | Yes | N/A | `$HARNESS_ACCOUNT_ID` |
| `HARNESS_ORG_ID` | Harness organization ID. Pass a non-masked CI/CD variable reference. | Yes | N/A | `$HARNESS_ORG_ID` |
| `HARNESS_PROJECT_ID` | Harness project ID. Pass a non-masked CI/CD variable reference. | Yes | N/A | `$HARNESS_PROJECT_ID` |
| `HARNESS_ACCOUNT_URL` | Harness base URL with scheme. Pass a non-masked CI/CD variable reference. | Yes | N/A | `$HARNESS_ACCOUNT_URL` |
| `TARGET` | Container image reference when `SOURCE` is `container`, or artifact file path when `SOURCE` is `local`. | Yes | N/A | `$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA` |
| `POLICY_SET_REF` | Reference to the OPA policy set used for allow/deny enforcement. | Yes | N/A | `account.my_policy_set` |
| `VERIFY` | Verifies the SBOM attestation before policy evaluation. | No | `false` | `true` |
| `SOURCE` | Artifact source. Supported values are `container` and `local`. | No | `container` | `local` |
| `ARTIFACT_NAME` | Display name for a local artifact. Applicable when `SOURCE=local`. | No | File name from `TARGET` | `payment-service` |
| `ARTIFACT_VERSION` | Artifact version. Applicable when `SOURCE=local`. | No | N/A | `$CI_COMMIT_SHORT_SHA` |
| `stage` | GitLab pipeline stage in which the component runs. | No | `scs` | `security` |
| `job-name` | Name of the GitLab job created by the component. | No | `scs-sbom-policy-enforcement` | `enforce-sbom-policy` |

:::note

By default, the component enforces SBOM policies for a container image. To enforce SBOM policies for a local artifact, set `SOURCE` to `local`. When using a local artifact, specify the artifact path in `TARGET` and provide an `ARTIFACT_VERSION`.

:::

To verify the SBOM attestation before policy evaluation, configure the verification inputs (`VERIFY_WITH`, `OIDC_PROVIDER`, `FULCIO_URL`, `KMS_KEY`, and `VAULT_ADDR`) as described in [Step 3 - Configure SBOM verification](#step-3---configure-sbom-verification).

#### Override the generated job
 
Standard GitLab job keywords, such as `needs`, `before_script`, `script`, `after_script`, `allow_failure`, and `tags`, are not component inputs. To set them, redeclare the generated job (default name `scs-sbom-policy-enforcement`, or the value of `job-name`) in your workflow file. GitLab merges your keys into the generated job.
 
```yaml
scs-sbom-policy-enforcement:
  needs: [build-image]
  tags: [docker, linux]
  before_script:
    - echo "Starting policy enforcement"
  after_script:
    - echo "Policy evaluation complete"
```

:::note

If you are enforcing policies for an image in a private registry that is not the GitLab container registry, provide the registry credentials as masked GitLab CI/CD variables so that the component can access the image.

:::

### Step 3 - Configure SBOM verification

Harness supports the following verification methods:

* **Keyless verification** – Uses OpenID Connect (OIDC) identities to verify the signed SBOM without managing long-lived signing keys.
* **Key-based verification** – Uses a cryptographic key managed through your organization's key management solution.
* **Secret Manager** – Uses verification keys stored in a supported secret manager.

:::note

* By default, the component runs OPA policy evaluation only and does not verify the SBOM attestation (`VERIFY` defaults to `false`). In this mode, the `inputs` do not require `VERIFY_WITH` or `KMS_KEY`.
* To verify the SBOM attestation before policy evaluation, set `VERIFY: true`. `VERIFY_WITH` then selects the verification method; it defaults to `secret-manager`, which requires `KMS_KEY` (and `VAULT_ADDR` when `KMS_KEY` is a Vault URI).

:::

Configure the appropriate verification inputs based on the verification method you want to use.

<Tabs>

<TabItem value="Configure keyless verification" label="Configure keyless verification">

If you enable SBOM verification, you can configure **keyless verification** to verify the signed SBOM using an OpenID Connect (OIDC) identity. For GitLab CI/CD, set `OIDC_PROVIDER` to `non-harness`. The `harness` OIDC provider is not supported as of now. Keyless verification requires **GitLab 15.7** or later, because it depends on GitLab `id_tokens`. Configure the following inputs.
 
| Input | Description | Required |
| --- | --- | --- |
| `VERIFY_WITH` | Specifies the verification method. Set the value to `keyless`. | Yes |
| `OIDC_PROVIDER` | OIDC provider used to obtain the verification identity. For GitLab CI/CD, set the value to `non-harness`. | Yes |
| `FULCIO_URL` | Fulcio certificate authority endpoint. Used when `OIDC_PROVIDER` is `non-harness`. Defaults to `https://fulcio.sigstore.dev`. | No |
 
Provide the OIDC token to the generated job using `id_tokens`. The component reads the token from `PLUGIN_NON_HARNESS_OIDC_TOKEN`.
 
```yaml
stages: [scs]
 
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/sbom-policy-enforcement@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      POLICY_SET_REF: account.my_policy_set
      VERIFY: true
      VERIFY_WITH: keyless
      OIDC_PROVIDER: non-harness
 
scs-sbom-policy-enforcement:
  id_tokens:
    PLUGIN_NON_HARNESS_OIDC_TOKEN:
      aud: sigstore
```

</TabItem>

<TabItem value="Configure key-based verification" label="Configure key-based verification">

To verify the signed SBOM using a cryptographic key, set `VERIFY_WITH` to `keybased` and provide the Cosign key material as masked GitLab CI/CD variables on the job. `KMS_KEY` isn't used for key-based verification. It applies only to Secret Manager verification.
 
| Input | Description | Required |
| --- | --- | --- |
| `VERIFY_WITH` | Specifies the verification method. Set the value to `keybased`. | Yes |
 
Provide the following masked GitLab CI/CD variable on the job:
 
| Variable | Description | Required |
| --- | --- | --- |
| `SSCA_VERIFICATION_COSIGN_PUBLIC_KEY` | Cosign public key used to verify the SBOM attestation. | Yes |

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

After configuring the required GitLab CI/CD variables and component inputs, your GitLab workflow file should resemble the following example. This example verifies the SBOM attestation for a container image and evaluates it against the specified policy set in Harness SCS. The policy evaluation results determine whether the artifact complies with your organization's security and compliance requirements before it proceeds through the pipeline. The Harness scope variables are wired through `inputs`, `HARNESS_API_KEY` remains a masked GitLab CI/CD variable, and the Vault variables (`KMS_KEY` and `VAULT_ADDR`) are provided because attestation verification is enabled.
 
```yaml
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/sbom-policy-enforcement@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      POLICY_SET_REF: account.my_policy_set
      VERIFY: true
      VERIFY_WITH: secret-manager
      KMS_KEY: hashivault://cosign
      VAULT_ADDR: $VAULT_ADDR
```

To run policy evaluation without verifying the SBOM attestation, set `VERIFY: false` and omit the verification inputs:
 
```yaml
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/sbom-policy-enforcement@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      POLICY_SET_REF: account.my_policy_set
      VERIFY: false
```

### Step 5 - Run the pipeline

Commit and push your changes to trigger the GitLab pipeline. During pipeline execution, the SBOM Policy Enforcement component verifies the SBOM attestation, if verification is enabled, and evaluates the specified artifact against the configured policy set. Based on the policy evaluation results, the pipeline determines whether the artifact complies with your organization's security and compliance requirements before proceeding to subsequent stages. For more information on running a GitLab pipeline, see [Tutorial: Create and run your first GitLab CI/CD pipeline](https://docs.gitlab.com/ci/quick_start/).

After the pipeline completes, open the job execution logs and click the **Harness Artifact Details** link to view the generated artifact in SCS. For more information on viewing the status of a job and details of the pipeline, see [View the status of your pipeline and jobs](https://docs.gitlab.com/ci/quick_start/#view-the-status-of-your-pipeline-and-jobs).

<DocImage path={require('./static/sbom-enforce-job.png')} width="100%" height="100%" title="Click to view full size image" />

The Artifact Details page displays the SBOM policy evaluation results for the artifact. The policy evaluation is also recorded in the [Chain of Custody](https://developer.harness.io/docs/software-supply-chain-assurance/artifact-security/overview/#chain-of-custody), providing an immutable audit trail of the artifact lifecycle and the associated GitLab CI/CD pipeline execution. For more information on navigating through artifacts, see [Artifact Overview](/docs/software-supply-chain-assurance/artifact-security/overview/).

<DocImage path={require('./static/sbom-policy-enforce-artifact.png')} width="100%" height="100%" title="Click to view full size image" />

***

## Example SBOM policy enforcement workflow

<details>
  <summary>Example SBOM policy enforcement workflow for a container image</summary>
<div>

The following example demonstrates how to configure the SBOM Policy Enforcement component in a GitLab workflow to verify the SBOM attestation for a container image and evaluate it against a policy set configured in Harness Software Supply Chain Security (SCS). The example uses a verification key stored in HashiCorp Vault to verify the SBOM attestation before evaluating the artifact against the specified policy set.
 
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
  - component: gitlab.com/harness-scs/gitlab-plugins/sbom-policy-enforcement@1.0.0
    inputs:
      stage: scs
      job-name: enforce-sbom-policy
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
 
      TARGET: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      POLICY_SET_REF: account.my_policy_set
 
      VERIFY: true
      VERIFY_WITH: secret-manager
      KMS_KEY: hashivault://cosign
      VAULT_ADDR: $VAULT_ADDR
```
</div>

</details>

<details>
  <summary>Example SBOM policy enforcement workflow for a local artifact</summary>
<div>
 
The following example enforces policies for a local artifact. It builds the artifact in an earlier job, passes it forward with `artifacts`, and uses `needs` so the enforcement job runs after the artifact is available. When `SOURCE` is `local`, `TARGET` is the artifact file path and `ARTIFACT_VERSION` is required.
 
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
 
scs-sbom-policy-enforcement:
  needs: [build-artifact]
 
include:
  - component: gitlab.com/harness-scs/gitlab-plugins/sbom-policy-enforcement@1.0.0
    inputs:
      HARNESS_ACCOUNT_ID: $HARNESS_ACCOUNT_ID
      HARNESS_ORG_ID: $HARNESS_ORG_ID
      HARNESS_PROJECT_ID: $HARNESS_PROJECT_ID
      HARNESS_ACCOUNT_URL: $HARNESS_ACCOUNT_URL
 
      SOURCE: local
      TARGET: $CI_PROJECT_DIR/target/myapp.jar
      ARTIFACT_VERSION: $CI_COMMIT_SHORT_SHA
      POLICY_SET_REF: account.my_policy_set
      VERIFY: false
```
</div>

</details>

***

## Next steps

* [Generate SBOM with GitLab CI/CD](/docs/software-supply-chain-assurance/open-source-management/sbom-gitlab-ci-cd/generate-sbom) — Learn how to generate, attest, and upload SBOMs to Harness SCS during pipeline execution.
* [Ingest SBOM with GitLab CI/CD](/docs/software-supply-chain-assurance/open-source-management/sbom-gitlab-ci-cd/ingest-sbom) — Learn how to upload existing SBOMs generated by external tools or build processes to Harness SCS.
* [Generate SLSA with GitLab CI/CD](/docs/software-supply-chain-assurance/artifact-security/slsa/slsa-gitlab-ci-cd/generate-slsa) - Learn how to generate and attest SLSA provenance for software artifacts during pipeline execution.
* [Verify SLSA with GitLab CI/CD](/docs/software-supply-chain-assurance/artifact-security/slsa/slsa-gitlab-ci-cd/verify-slsa) - Learn how to verify SLSA provenance and validate the integrity of software artifacts before promotion or deployment.
