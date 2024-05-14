The Harness SSCA module supports the following tools and standards.

### Code Repositories

* Harness Code Repository

The following code repository providers are integrated using 3rd party Git Connectors on Harness Pipeline's Security Stage.
* GitHub 
* GitLab
* BitBucket
* Azure Code Repos

### CI/CD Pipelines

* Harness CI - as native steps in Harness Pipeline's Build Stage
* Harness CD & GitOps - as native steps in Harness Pipeline's Deploy Stage
* Harness STO - as native steps in Harness Pipeline's Security Stage

The following CI/CD pipeline providers are integrated using Pipeline Triggers on Harness Pipeline's Security Stage.

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
* Achieve [SLSA Build L1](../slsa/overview.md#how-to-comply-with-slsa-level-1)
* Achieve [SLSA Build L2](../slsa/overview.md#how-to-comply-with-slsa-level-2)
* Achieve [SLSA Build L3](../slsa/overview.md#how-to-comply-with-slsa-level-3)


### Attestation/Provenance Generation & Verification Tools

* [Sigstore Cosign with built-in in-toto attestations](https://docs.sigstore.dev/verifying/attestation/)

### Policy Enforcement Attributes

* Component name
* Component version
* License
* Supplier
* PURL
