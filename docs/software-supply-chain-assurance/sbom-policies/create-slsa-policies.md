---
title: Create SLSA policies
description: Create SLSA policies using OPA.
sidebar_position: 13
---


This document provides a step-by-step guide on how to create SLSA Policies. For guidance on how to write these policies, please refer to the section on [write policy definitions](/docs/software-supply-chain-assurance/sbom-policies/define-sbom-policies). To learn about implementing SLSA policies, follow the instructions in the section on [enforcing SLSA policies](/docs/software-supply-chain-assurance/artifact-security/slsa/verify-slsa#enforce-policies-on-slsa-provenance).

### Before you begin

As you learn to create SLSA policies, ensure you thoroughly review


* [Harness Policy as Code - Overview](https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview/)
* [Harness Policy as Code - Quickstart](https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-quickstart/)

The Harness Policy Library provides sample policies that simplify the process of creating and enforcing them against SLSA. Here's a guide on how to utilize these samples for policy creation.

:::info
Policies can be created at the account, organization, and project levels, this guide will focus on creating a policy at the account level. For instructions on crafting policies for the organization and project levels, please refer to the linked [overview guide](https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview/), which outlines a similar process.


:::


## Create SLSA policies

You must create a set of OPA policies that you want Harness SCS to use for SLSA Provenance verification. You can create a dedicated SLSA Provenance verification policy set or use existing policy sets that you've already created. For more information about creating policies in Harness, go to the [Harness Policy As Code overview](/docs/platform/governance/policy-as-code/harness-governance-overview).

:::info

OPA policies used for SLSA Provenance verification are different from [SBOM policies](/docs/software-supply-chain-assurance/sbom-policies/create-sbom-policies) used for SBOM policy enforcement.

:::

1. In your Harness Project, under **Project Setup**, go to **Policies**. You can also create policies at the Account and Org scopes.
2. Select **Policies**, and then [create policies](/docs/platform/governance/policy-as-code/harness-governance-quickstart#create-the-policy) for the individual rules that you want to enforce. You can select from the policy library or write your own policies.
3. [Create policy sets](/docs/platform/governance/policy-as-code/harness-governance-quickstart#step-3-create-a-policy-set) to group related policies. You must have at least one policy set.

### SLSA policy example

Here's an example of an OPA policy that could be used to verify an [SLSA Provenance generated in Harness](/docs/software-supply-chain-assurance/artifact-security/slsa/generate-slsa). If you are verifying provenance from a third-party build system provider, make sure your OPA policies reflect the provenance structure used by that build system provider. Different providers might use different SLSA Provenance structures.


#### Validate Repo and Branch:

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

#### Validate Trigger type:

```

package slsa

deny[msg] {
  input[0].outcome.stepArtifacts.provenanceArtifacts[0].predicate.buildDefinition.externalParameters.trigger != "push"
  msg := "Invalid trigger type: only 'push' is allowed"
}


```

#### Validate Pipeline Identifier:

```

package slsa

deny[msg] {
  input[0].outcome.stepArtifacts.provenanceArtifacts[0].predicate.buildDefinition.buildType != "https://example.com/ci-pipeline@v1"
  msg := "Pipeline identifier does not match expected value"
}


```

For more examples, go to [Policy samples](/docs/platform/governance/policy-as-code/sample-policy-use-case).