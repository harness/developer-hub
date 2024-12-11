---
title: Overview
description: Use Harness SCS to comply with SLSA Levels
sidebar_position: 5
redirect_from:
  - /tutorials/secure-supply-chain/generate-slsa
---

Software supply chains, made up of all the code, people, systems, and processes that contribute to development and delivery of software artifacts,  are increasingly vulnerable to breaches and compromises, presenting significant security challenges for organizations. To protect against such breaches, The [Supply Chain Levels for Software Artifacts](https://slsa.dev) (SLSA, pronounced "salsa") provides an end-to-end framework for ensuring the integrity of software artifacts throughout software delivery. By adopting SLSA, organizations can proactively strengthen their software build and deployment processes and secure against critical tampering attacks. 

What makes a framework like SLSA effective is its focus on provenance, which is a record of where software comes from (source, ingest, where it was pulled from, what are the build parameters). Provenance can be analyzed and verified for security purposes to ensure that there is no tampering.

With Harness SCS, organizations can achieve **SLSA Level 1, Level 2 and Level 3** compliance, adhering to all the prescriptive requirements according to the build track of [SLSA v1.0](https://slsa.dev/spec/v1.0/) specification.

<DocImage path={require('./static/slsa-levels-with-harness.png')} width="100%" height="100%" />

* **Provenance Generation**: The Harness platform automatically generates detailed provenance, outlining the build platform, process, and top-level inputs involved in creating the artifact.
* **Provenance Attestation and Verification**: 
    * Following the [in-toto attestation](https://in-toto.io/) framework with [cosign](https://docs.sigstore.dev/verifying/attestation/), Harness digitally signs the generated provenance, ensuring its authenticity and integrity.
    * Downstream systems can verify provenance attestation, validate authenticity, and secure the supply chain against unauthorized changes.
* **Hosted Build Platform**: Organizations can connect their hosted infrastructure with Harness to execute builds.
* **Hardened Builds**: Your infrastructure for running the builds should be hardened, or you can use the [Harness cloud](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure/) environment. 


With these, compliance with SLSA is achieved in two phases. First, in your pipeline's build stage, you must configure it to generate and attest the provenance while using a hosted infrastructure to run your builds. This first phase ensures the creation and secure signing of the provenance. The next phase involves verifying the attested provenance and enforcing integrity checks through policy enforcement. This verification and policy enforcement can occur during the build or deployment stages. 

Here’s how it looks overall:

<DocImage path={require('./static/slsa-overview.png')} width="95%" height="95%" />

**SLSA Generation and Attestation**: When you configure your code to build and set up to push the image to a container registry, ensure you also configure the generation of SLSA provenance in the build stage. This stage will generate and attest the provenance with a private key and password, subsequently pushing the attested provenance to the container registry. For a detailed guide on implementing this process, please refer to the [Generate SLSA Provenance](https://developer.harness.io/docs/software-supply-chain-assurance/slsa/generate-slsa) documentation.

**SLSA Verification**: The SLSA verification step within the SCS module verifies the authenticity of provenance using a public key. After verification, you can enforce policy sets on the verified provenance. For more details on the implementation, refer to the [Verify SLSA Provenance](https://developer.harness.io/docs/software-supply-chain-assurance/slsa/verify-slsa) documentation.

## How to comply with SLSA Level 1
To meet the requirements of [Build L1](https://slsa.dev/spec/v1.0/levels#build-l1), Harness SCS enables you to generate detailed provenance, which documents the build process, including the build platform and the top-level inputs. This provenance can then be easily downloaded and shared as needed. Also, it's important that you follow a consistent build process.
- For generating SLSA Provenance, refer to [Generate SLSA Provenance](./generate-slsa.md)
- To view and download the SLSA Provenance, refer to [View pipeline execution results](../ssca-view-results.md#view-slsa-provenance-and-verification-status)


## How to comply with SLSA Level 2
To attain [Build L2](https://slsa.dev/spec/v1.0/levels#build-l2) compliance, adherence to [Build L1](https://slsa.dev/spec/v1.0/levels#build-l1) standards is a prerequisite. Additionally, your builds must be executed on a hosted infrastructure. As part of achieving L1, the provenance generated must now also be signed and verified to further enhance security.

Here are the steps to follow:

- Connect your hosted infrastructure with Harness for executing builds.
- Utilize Harness SCS to sign the generated provenance. Refer to [Attest SLSA Provenance](./generate-slsa.md#attest-slsa-provenance)
- Verify the provenance attestation to confirm its authenticity in the downstream. This step is crucial for protecting the supply chain from unauthorized alterations. Refer to [Verify SLSA Provenance](./verify-slsa.md)

## How to comply with SLSA Level 3

To achieve [Build L3](https://slsa.dev/spec/v1.0/levels#build-l3), you must be compliant to [L2](https://slsa.dev/spec/v1.0/levels#build-l2), and the infrastructure you are using to run your builds should be hardened, or you can use the [Harness cloud](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure/) environment, which is designed to isolate the build processes and prevent any potential influence between runs. Also, the hosted containerized step in Harness CI restricts build steps to access the provenance key information.
