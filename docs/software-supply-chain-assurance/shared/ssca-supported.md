This document outlines the platforms, features, and integrations supported by Harness SSCA.
The Software Supply Chain Assurance (SSCA) module is available on the following platforms:
- [Harness SaaS](#ssca-on-harness-saas)
- [Harness Self-Managed Enterprise Edition](#connected-environment)
- [Harness Self-Managed Enterprise Edition in Air-gapped/Offline Environments](#air-gapped-environment)

### SSCA on Harness SaaS
- [Generate](../sbom/generate-sbom.md) or [ingest](../sbom/ingest-sbom-data.md) SBOM, followed by SBOM drift detection and scoring.
- [Enforce OSS usage with SBOM governance policies](../sbom-policies/enforce-sbom-policies.md).
- Generate [SLSA](../slsa/overview.md) provenance and achieve Build [Levels 1](../slsa/overview.md#how-to-comply-with-slsa-level-1), [2](../slsa/overview.md#how-to-comply-with-slsa-level-2), and [3](../slsa/overview.md#how-to-comply-with-slsa-level-3).
- [Verify SLSA provenance](../slsa/verify-slsa.md) with [SLSA governance policies](../slsa/verify-slsa.md#enforce-policies-on-slsa-provenance).
- Attest and verify SBOM and SLSA Provenance with Cosign.
- Create and manage [Remediation Trackers](../remediation-tracker/overview.md).

### SSCA on Harness Self-Managed Enterprise Edition (SMP)

#### Connected Environment
In a connected environment, all features of '[SSCA on Harness SaaS](#ssca-on-harness-saas)' are supported in SMP.

#### Air-gapped Environment
All features of '[SSCA on Harness SaaS](#ssca-on-harness-saas)' are available in an air-gapped or offline environment, with the following exceptions:

- During the SBOM generation process, the system cannot fetch certain license data of dependencies, affecting the SBOM quality score.
- During the SBOM attestation and SLSA Provenance process, the system cannot record the attestation logs in the Sigstore public [Rekor](https://docs.sigstore.dev/logging/overview/).
- In the Remediation Tracker, the system cannot fetch vulnerability details by entering the CVE number. You can still manually enter the details and continue tracker creation. If you are using Harness STO SMP, this exception does not apply.

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
* SSCA steps are also available in Harness Pipeline's Security stage

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
You can achieve SLSA Build Level 1, Level 2 and Level 3 using Harness SSCA. Refer to [SLSA Overview](../slsa/overview.md)
* [SLSA Build L1](../slsa/overview.md#how-to-comply-with-slsa-level-1)
* [SLSA Build L2](../slsa/overview.md#how-to-comply-with-slsa-level-2)
* [SLSA Build L3](../slsa/overview.md#how-to-comply-with-slsa-level-3)


### Attestation/Provenance Generation & Verification Tools

* [Sigstore Cosign with built-in in-toto attestations](https://docs.sigstore.dev/verifying/attestation/)

### Policy Enforcement Attributes

* Component name
* Component version
* License
* Supplier
* PURL
