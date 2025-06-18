---
title: Enforce SBOM policies
description: Use SCS to implement SBOM Policy Enforcement.
sidebar_position: 20
redirect_from:
  - /docs/software-supply-chain-assurance/ssca-policies/enforce-ssca-policies
  - /docs/software-supply-chain-assurance/ssca-policies/overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The creation of a Software Bill of Materials (SBOM) significantly enhances software transparency. The comprehensive view not only brings visibility but also opens up the opportunity to improve security and ensure compliance. It enables organizations to define and implement specific rules governing the use of open source components, including the criteria to allow or deny components. By applying these rules, organizations can effectively mitigate security risks, comply with licensing obligations, and exert greater control over their software supply chain.

The Harness SCS module enables you to create these rules as policies that align with your organization's security regulations and legal compliance requirements. These policies can then be enforced on SBOMs. This entire process is facilitated through the **SBOM Policy Enforcement** step.


Enforce SBOM policies in the CI and CD stages of your Harness pipelines to ensure that your artifacts only contain approved components.

<DocImage path={require('./static/sbom-enforcement-overview.png')} width="100%" height="100%" />

Here's a breakdown of the overall steps involved:



1. Create an [OPA policy set](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview/)
2. [Write policy definitions](docs/software-supply-chain-assurance/open-source-management/define-sbom-policies)
3. [Enforce the policies on SBOM](/docs/software-supply-chain-assurance/open-source-management/enforce-sbom-policies#policy-configuration)
4. View [policy violations](/docs/software-supply-chain-assurance/open-source-management/enforce-sbom-policies#view-policy-violations) and take actions

## Requirements

To enforce SBOM policies in a Harness pipeline, you need:

* A pipeline with a [CI (build) stage](/docs/continuous-integration/use-ci/prep-ci-pipeline-components), a [CD (deploy) stage](/docs/continuous-delivery/get-started/key-concepts#stage), or both. You'll add the SBOM Enforcement step to one of these stages.
* [SBOM OPA policies that you want to enforce.](/docs/software-supply-chain-assurance/open-source-management/create-sbom-policies#creating-an-sbom-policy)
* SBOM to compare policies against. For example, you can [use SCS to generate SBOM](/docs/software-supply-chain-assurance/open-source-management/generate-sbom-for-repositories) or [import SBOM](/docs/software-supply-chain-assurance/open-source-management/ingest-sbom-data).
* A [Harness file secret](/docs/platform/secrets/add-file-secrets) containing the public key from the [key pair used to sign and attest the SBOM](/docs/software-supply-chain-assurance/open-source-management/generate-sbom-for-repositories).

:::info
For SBOM Policy Enforcement, an SBOM needs to be generated or ingested beforehand through the SBOM Orchestration step. Refer to the dedicated [SBOM generation document](/docs/software-supply-chain-assurance/open-source-management/generate-sbom-for-repositories) for further details.
:::

## Add SBOM Policy Enforcement step

<DocImage path={require('./static/sbom-policy-enforce.png')} width="50%" height="50%" />

You can add the **SBOM Policy Enforcement** step to either the **Build** or **Deploy** stage of a Harness pipeline.

* In a **Build** stage, add the step after the [SBOM generation](/docs/software-supply-chain-assurance/open-source-management/generate-sbom-for-repositories) step.
* In a **Deploy** stage, add the step before the deployment step.

:::info

SBOM Orchestration and Enforcement steps in deploy stage can only be used in the [Containerized Step Groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups.md)

:::

The **SBOM Policy Enforcement** step has the following settings:

* **Name:** Enter a name for the step.

* **Source**: Select the Source by choosing either a supported container registry from the list or Repository.

import ArtifactSource from '/docs/software-supply-chain-assurance/shared/artifact-source.md';

<ArtifactSource />

### Verify the SBOM Attestation
To verify the SBOM attestation, in addition to the above configuration, you need to enable the Verify SBOM Attestation checkbox in the SBOM Policy Enforcement step. Enabling this is optional and not required for SBOM policy enforcement.

The attestation verification process requires the corresponding **public key** of the private key used for SBOM attestation. You can perform the verification by providing the public key through the **Cosign** option or **Cosign with Secret Manager**

import CosignVerificationOptions from '/docs/software-supply-chain-assurance/shared/cosign-verification-options.md';

<CosignVerificationOptions />


### Policy Configuration
You can configure the step to enforce policies on the SBOM by selecting the appropriate policy set.

- **Policy Sets:** Choose the policy sets you want to use for enforcement. You can select multiple policy sets from the **Account**, **Org**, or **Project** levels. For more details, refer to [Creating SBOM Policies](/docs/software-supply-chain-assurance/open-source-management/create-sbom-policies#creating-an-sbom-policy) and [Writing SBOM Policy Definitions](/docs/software-supply-chain-assurance/open-source-management/define-sbom-policies).


## Run the pipeline

When the pipeline runs, the **SBOM Policy Enforcement** step does the following:

* With the artifact details, the step verifies the authenticity of the attestation.
* Applies policies defined in the specified policy set.
* If violations are detected based on the policy evaluation criteria, the pipeline may issue a warning and proceed, or it may generate an error and terminate.
* Records policy violations and shows them on the **Supply Chain** tab on the **Execution details** page.

SCS evaluates the components described in the artifact's SBOM against your [policy definitions](/docs/software-supply-chain-assurance/open-source-management/define-sbom-policies). For a component to pass the evaluation, it must meet these conditions:

* The component *must not* be denied based on the rules in the `deny_list`.
* The component *must* be allowed based on the rules in the `allow_list`.
* If the `allow_list` has multiple sections, the component must be allowed by *all* sections. For example, if the `allow_list` has `licenses` and `suppliers` sections, then the component's license must be allowed according to the `licenses` section, and the component's supplier must be allowed according to the `suppliers` section. If the component fails to pass either section, the policy evaluation fails for that component.

All components must meet the conditions described in *both* the `allow_list` and `deny_list` to fully pass the policy evaluation.




## View Policy Violations

The policy violations arising from the SBOM Policy Enforcement step in your pipeline are accessible under the "Policy Violations" section of the artifact list. Also, the Policy Violations card in the overview displays a cumulative count of all the allow list and deny list items across all artifacts.

<DocImage path={require('./static/scs-policy-violation.png')} width="100%" height="80%" />