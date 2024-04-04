---
title: Verify SLSA Provenance
description: Verify SLSA Provenance with Harness SSCA
sidebar_position: 20
---


In this document, we'll explore how to verify SLSA Provenance attestation and enforce policies to guarantee the provenance contents remain unaltered. Unlike the setup for SLSA provenance generation, the verification process can be conducted in both the Build and Deploy stages of your pipeline. Here’s an overview of the procedure:

<DocImage path={require('./static/overview-slsa-ver.png')} width="90%" height="90%" />


## Verify SLSA Attestation

In the Harness SSCA, the SLSA verification step is responsible for verifying the attested provenance and applying policies. To incorporate this, navigate to either the build or deploy stage of your pipeline and add the "SLSA Verification" step. When adding this to a deploy stage, ensure it's placed within a container step group.
    
<DocImage path={require('./static/slsa-ver-step.png')} width="50%" height="50%" />


The SLSA Verification step has the following settings:

* **Name**: Enter a name for the step.
* **Registry Type**: Choose your registry from the list of supported items.
* **Container Registry**: Select the [Docker Registry connector](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that is configured for the Docker-compliant container registry where the artifact is stored.
* **Image**: Enter the repo path (in your container registry) for the image that you want to verify, such as my-docker-repo/my-artifact.
* **Tag**: Enter the tag for the image, such as latest.
* **Public Key**: Choose the [Harness file secret](https://developer.harness.io/docs/platform/secrets/add-file-secrets) that holds the public key, which will be used to verify the attestation's authenticity. This key should correspond to the private key and password utilized during the attestation's generation.


## Enforce Policies on SLSA Provenance

Immediately following the verification of the provenance attestation, you have the option to configure the step to enforce policies on the provenance. This ensures that the contents of the provenance remain unchanged and have not been tampered with.

To enforce policies, navigate to the Advanced tab of the "SLSA Verification" step, expand the "Policy Enforcement" section, and specify the policy sets you wish to enforce.

<DocImage path={require('./static/slsa-ver-policy-enforce.png')} width="50%" height="50%" />

## Create SLSA policies

You must create a set of OPA policies that you want Harness SSCA to use for SLSA Provenance verification. You can create a dedicated SLSA Provenance verification policy set or use existing policy sets that you've already created. For more information about creating policies in Harness, go to the [Harness Policy As Code overview](/docs/platform/governance/policy-as-code/harness-governance-overview).

:::info

OPA policies used for SLSA Provenance verification are different from [SSCA policies](/docs/software-supply-chain-assurance/ssca-policies/create-ssca-policies) used for SSCA policy enforcement.

:::

1. In your Harness Project, under **Project Setup**, go to **Policies**. You can also create policies at the Account and Org scopes.
2. Select **Policies**, and then [create policies](/docs/platform/governance/policy-as-code/harness-governance-quickstart#create-the-policy) for the individual rules that you want to enforce. You can select from the policy library or write your own policies.
3. [Create policy sets](/docs/platform/governance/policy-as-code/harness-governance-quickstart#step-3-create-a-policy-set) to group related policies. You must have at least one policy set.

### SLSA policy example

Here's an example of an OPA policy that could be used to verify an [SLSA Provenance generated in Harness](./generate-slsa.md). If you are verifying provenance from a third-party build system provider, make sure your OPA policies reflect the provenance structure used by that build system provider. Different providers might use different SLSA Provenance structures.

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

For more examples, go to [Policy samples](/docs/platform/governance/policy-as-code/sample-policy-use-case).

## Run the pipeline

When the pipeline runs, the **SLSA Verification** step does the following:

* Verifies the authenticity of the attestation.
* Verifies the provenance data by applying the specified policy set.
* Records the policy evaluation results in the step's logs.
* Reports the overall pass/fail for SLSA verification on the **Supply Chain** tab.

For more information about inspecting SLSA verification results, go to [view pipeline execution results](../ssca-view-results.md#view-slsa-provenance-and-verification-status).

## Verify provenance from third-party build systems

You can use Harness SSCA to verify provenance generated by third-party build systems.

To do this:

1. Get the public key.
2. [Create SLSA policies](#create-slsa-policies) that verify the provenance data according to the provenance structure used by in the build system provider.
3. [Add SLSA Verification step](#verify-slsa-attestation).
