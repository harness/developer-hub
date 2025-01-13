This document outlines the platforms, features, and integrations supported by Harness SCS.
The Supply Chain Security (SCS) module is available on the following platforms:
- [Harness SaaS](#scs-on-harness-saas)
- [Harness Self-Managed Enterprise Edition](#connected-environment)
- [Harness Self-Managed Enterprise Edition in Air-gapped/Offline Environments](#air-gapped-environment)

### SCS on Harness SaaS
- Repository Security Posture Management - [RSPM](../repository-security-posture-management-rspm.md)
- [Generate](../sbom/generate-sbom.md) or [ingest](../sbom/ingest-sbom-data.md) SBOM, followed by SBOM drift detection and scoring.
- [Enforce OSS usage with SBOM governance policies](../sbom-policies/enforce-sbom-policies.md).
- Generate [SLSA](../slsa/overview.md) provenance and achieve Build [Levels 1](../slsa/overview.md#how-to-comply-with-slsa-level-1), [2](../slsa/overview.md#how-to-comply-with-slsa-level-2), and [3](../slsa/overview.md#how-to-comply-with-slsa-level-3).
- [Verify SLSA provenance](../slsa/verify-slsa.md) with [SLSA governance policies](../slsa/verify-slsa.md#enforce-policies-on-slsa-provenance).
- Attest and verify SBOM and SLSA Provenance with Cosign.
- Create and manage [Remediation Trackers](../remediation-tracker/overview.md).

### SCS on Harness Self-Managed Enterprise Edition (SMP)

#### Connected Environment
All features of '[SCS on Harness SaaS](#scs-on-harness-saas)' are available in an SMP environment, with the following exceptions:

- Creating a Remediation tracker will require manually adding the CVE details as auto-population is linked with STO module. However, if you are using Harness STO SMP, this limitation does not apply.
- Achieving [SLSA Level 3](../slsa/overview.md#how-to-comply-with-slsa-level-3) compliance is not possible in SMP, as it requires Harness hosted build infrastructure. This capability is available through '[SCS on Harness SaaS](#scs-on-harness-saas)'.


#### Air-gapped Environment
All features of '[SCS on Harness SaaS](#scs-on-harness-saas)' are available in an air-gapped or offline environment, with the following exceptions:

- Repository Security Posture Management is not supported in air-gapped environments.
- In the generated SBOMs, the license data for certain dependencies will be marked as "NOASSERTION", leading to a reduced [SBOM quality score](../sbom/sbom-score.md). However, this does not impact the SBOM generation or any other features of [SBOM Orchestration](../sbom/generate-sbom.md).
- Logging the attestation record in the Sigstore public [Rekor](https://docs.sigstore.dev/logging/overview/) will not be performed during the SBOM and SLSA Provenance attestation process, but this will not impact the attestation itself.
- Creating a Remediation tracker will require manually adding the CVE details as auto-population is linked with STO module. However, if you are using Harness STO SMP, this limitation does not apply.
- Achieving [SLSA Level 3](../slsa/overview.md#how-to-comply-with-slsa-level-3) compliance is not possible in SMP, as it requires Harness hosted build infrastructure. This capability is available through '[SCS on Harness SaaS](#scs-on-harness-saas)'.

## Integrations
### Code Repositories

* Harness Code Repository

The following code repository providers are integrated using 3rd party Git Connectors:

* GitHub 
* GitLab
* BitBucket
* Azure Code Repos

### CI/CD Pipelines

* Harness CI - as native steps in Harness Pipeline's Build Stage
* Harness CD & GitOps - as native steps in Harness Pipeline's Deploy Stage
* SCS steps are also available in Harness Pipeline's Security stage

The following CI/CD pipeline providers are integrated using [Pipeline Triggers](/docs/platform/triggers/triggering-pipelines.md).

* GitHub
* GitLab
* BitBucket 
* Azure Code Repos

### Artifact Repositories

* Docker Hub
* GCR
* Amazon ECR
* Microsoft ACR
* GAR

### SBOM Generation Tools

* [Syft](/docs/software-supply-chain-assurance/sbom/generate-sbom.md)
* [Cdxgen](https://github.com/CycloneDX/cdxgen/)
* [Blackduck](/docs/software-supply-chain-assurance/sbom/generate-sbom-blackduck.md)
* [Aqua Trivy](/docs/software-supply-chain-assurance/sbom/generate-sbom-aqua-trivy.md)
* [Snyk](/docs/software-supply-chain-assurance/sbom/generate-sbom-snyk.md)

### SBOM Formats

* SPDX 
* CycloneDX

### SLSA Build Level
You can achieve SLSA Build Level 1, Level 2 and Level 3 using Harness SCS. Refer to [SLSA Overview](../slsa/overview.md)
* [SLSA Build L1](../slsa/overview.md#how-to-comply-with-slsa-level-1)
* [SLSA Build L2](../slsa/overview.md#how-to-comply-with-slsa-level-2)
* [SLSA Build L3](../slsa/overview.md#how-to-comply-with-slsa-level-3)


### Attestation/Provenance Generation & Verification Tools

* [Sigstore Cosign with built-in in-toto attestations](https://docs.sigstore.dev/cosign/verifying/attestation/)

### Policy Enforcement Attributes

* Component name
* Component version
* License
* Supplier
* PURL


