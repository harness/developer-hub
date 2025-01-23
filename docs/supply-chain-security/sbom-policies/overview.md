---
title: Overview
description: learn to create SBOM policies and enforce them.
sidebar_position: 1
redirect_from:
  - /docs/software-supply-chain-assurance/ssca-policies/overview
---

The creation of a Software Bill of Materials (SBOM) significantly enhances software transparency. The comprehensive view not only brings visibility but also opens up the opportunity to improve security and ensure compliance. It enables organizations to define and implement specific rules governing the use of open source components, including the criteria to allow or deny components. By applying these rules, organizations can effectively mitigate security risks, comply with licensing obligations, and exert greater control over their software supply chain.

The Harness SCS module enables you to create these rules as policies that align with your organization's security regulations and legal compliance requirements. These policies can then be enforced on SBOMs. This entire process is facilitated through the "SBOM Policy Enforcement" step.

Here's a breakdown of the overall steps involved:



1. Create an [OPA policy set](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview/)
2. [Write policy definitions](/docs/software-supply-chain-assurance/sbom-policies/define-sbom-policies)
3. [Enforce the policies on SBOM](./enforce-sbom-policies.md)
4. View [policy violations](/docs/software-supply-chain-assurance/ssca-view-results) and take actions

Here’s the overview of SBOM Policy Enforcement step in Harness SCS:

<DocImage path={require('./static/sbom-enforcement-overview.png')} width="100%" height="100%" />


:::info
For SBOM Policy Enforcement, an SBOM needs to be generated or ingested beforehand through the SBOM Orchestration step. Refer to the dedicated [SBOM generation document](https://developer.harness.io/docs/software-supply-chain-assurance/sbom/generate-sbom) for further details.
:::

The SBOM Policy Enforcement step operates in two stages:

**Attestation Verification:**



* Signed attestations created during [SBOM Orchestration](../sbom/generate-sbom.md) and stored in the artifact repository are verified using a public key.
* If verification is successful, policy enforcement proceeds.

**Policy Enforcement on SBOM:**



* With the artifact details, the step retrieves the SBOM of the given artifact.
* From the policy sets, the rules are evaluated against each component within the artifact's SBOM.
* If violations are detected based on the Policy evaluation criteria, the pipeline may issue a warning and proceed further, or it may generate an error and terminate.
* Finally, a detailed list of all the policy violations is generated.