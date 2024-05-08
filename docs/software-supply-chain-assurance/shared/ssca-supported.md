The Harness SSCA module supports the following tools and standards.

### Code Repositories

* Harness Code Repository

The following code repository providers are integrated using 3rd party Git Connectors on Harness Pipeline's Security Stage.
* GitHub 
* GitLab
* BitBucket
* Azure Code Repos

### CI/CD Pipelines

* Harness CI (as native steps in Harness Pipeline's Build Stage) 
* Harness CD & GitOps (as native steps in Harness Pipeline's Deploy Stage)

The following CI/CD pipeline providers are integrated using Pipeline Triggers on Harness Pipeline's Security Stage.

* GitHub
* GitLab
* BitBucket 
* Azure Code Repos

### Artifact Repositories

* Docker Hub
* GCR
* Amazon ECR

### SBOM Generation Tools

* [Syft](/docs/software-supply-chain-assurance/sbom/generate-sbom.md)
* [Blackduck](/docs/software-supply-chain-assurance/sbom/generate-sbom-blackduck.md)
* [Aqua Trivy](/docs/software-supply-chain-assurance/sbom/generate-sbom-aqua-trivy.md)
* [Snyk](/docs/software-supply-chain-assurance/sbom/generate-sbom-snyk.md)

### SBOM Formats

* SPDX
* CycloneDX

### SLSA Build Level

* Level 3, when used along with Harness CI Hosted Builds.

You can generate and sign provenance as per the [SLSA v1.0 spec](https://slsa.dev/) to achieve Level 3 compliance.

### Attestation/Provenance Generation & Verification Tools

* [Sigstore Cosign with built-in in-toto attestations](https://docs.sigstore.dev/verifying/attestation/)

### Policy Enforcement Attributes

* Component name
* Component version
* License
* Supplier
* PURL
