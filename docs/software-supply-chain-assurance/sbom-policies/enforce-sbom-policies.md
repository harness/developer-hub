---
title: Enforce SBOM policies
description: Use SCS to implement SBOM Policy Enforcement.
sidebar_position: 20
redirect_from:
  - /docs/software-supply-chain-assurance/ssca-policies/enforce-ssca-policies
---

Enforce SBOM policies in the CI and CD stages of your Harness pipelines to ensure that your artifacts only contain approved components.

## Requirements

To enforce SBOM policies in a Harness pipeline, you need:

* A pipeline with a [CI (build) stage](/docs/continuous-integration/use-ci/prep-ci-pipeline-components), a [CD (deploy) stage](/docs/continuous-delivery/get-started/key-concepts#stage), or both. You'll add the SBOM Enforcement step to one of these stages.
* [SBOM OPA policies that you want to enforce.](./create-sbom-policies.md)
* SBOM to compare policies against. For example, you can [use SCS to generate SBOM](../sbom/generate-sbom.md) or [import SBOM](../sbom/ingest-sbom-data.md).
* A [Harness file secret](/docs/platform/secrets/add-file-secrets) containing the public key from the [key pair used to sign and attest the SBOM](../sbom/generate-sbom.md#generate-a-key-pair).

## Add SBOM Policy Enforcement step

You can add the **SBOM Policy Enforcement** step to either the **Build** or **Deploy** stage of a Harness pipeline.

* In a **Build** stage, add the step after the [SBOM generation](../sbom/generate-sbom.md) step.
* In a **Deploy** stage, add the step before the deployment step.

:::info

SBOM Orchestration and Enforcement steps in deploy stage can only be used in the [Containerized Step Groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups.md)

:::

The **SBOM Policy Enforcement** step has the following settings:

* **Name:** Enter a name for the step.
* **Source:** Set the source, which can be DockerHub, ECR, GCR, ACR or Repository. Depending on your selection, a unique set of fields will appear, each specific to the source you've chosen. Address these fields as required, this is similar to configuring the source in **SBOM Orchestration step**. For more details of what each field entails, please refer to the [documentation on SBOM Orchestration](/docs/software-supply-chain-assurance/sbom/generate-sbom#add-the-sbom-orchestration-step). If you are using DockerHub, you can follow along. 
* **Container Registry:** Select the [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Docker-compliant container registry where your artifact is stored. Given that this step is to verify the attestation, read-level permissions should be adequate.
* **Image:** Enter the name of your image with tag, such as `my-docker-org/repo-name:tag`.
* **Public Key:** Select the [Harness file secret](/docs/platform/secrets/add-file-secrets) containing the public key to use to verify the authenticity of the attestation.
* **Policy Sets:** Select the policy set that you want to use for enforcement. You can select multiple policy sets from Account, Org or Project.

<DocImage path={require('./static/sbom-policy-enforcement-step.png')} width="50%" height="50%" />

## Run the pipeline

When the pipeline runs, the **SBOM Policy Enforcement** step does the following:

* With the artifact details, the step verifies the authenticity of the attestation.
* Applies policies defined in the specified policy set.
* If violations are detected based on the policy evaluation criteria, the pipeline may issue a warning and proceed, or it may generate an error and terminate.
* Records policy violations and shows them on the **Supply Chain** tab on the **Execution details** page.

SCS evaluates the components described in the artifact's SBOM against your [policy definitions](./define-sbom-policies.md). For a component to pass the evaluation, it must meet these conditions:

* The component *must not* be denied based on the rules in the `deny_list`.
* The component *must* be allowed based on the rules in the `allow_list`.
* If the `allow_list` has multiple sections, the component must be allowed by *all* sections. For example, if the `allow_list` has `licenses` and `suppliers` sections, then the component's license must be allowed according to the `licenses` section, and the component's supplier must be allowed according to the `suppliers` section. If the component fails to pass either section, the policy evaluation fails for that component.

All components must meet the conditions described in *both* the `allow_list` and `deny_list` to fully pass the policy evaluation.

You can review policy violations on the **Execution details** page in Harness. For more information, go to [view pipeline execution results](../ssca-view-results.md#view-policy-violations).