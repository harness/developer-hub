---
title: Overview
description: Use Harness SSCA to comply with SLSA Level 3
sidebar_position: 5
redirect_from:
  - /tutorials/secure-supply-chain/generate-slsa
---

Software supply chains, made up of all the code, people, systems, and processes that contribute to development and delivery of software artifacts,  are increasingly vulnerable to breaches and compromises, presenting significant security challenges for organizations. To protect against such breaches, The [Supply Chain Levels for Software Artifacts](https://slsa.dev) (SLSA, pronounced "salsa") provides an end-to-end framework for ensuring the integrity of software artifacts throughout software delivery. By adopting SLSA, organizations can proactively strengthen their software build and deployment processes and secure against critical tampering attacks. 

What makes a framework like SLSA effective is its focus on provenance, which is a record of where software comes from (source, ingest, where it was pulled from, what are the build parameters). Provenance can be analyzed and verified for security purposes to ensure that there was no tampering.

With Harness SSCA, organizations can achieve **SLSA Level 3** compliance, adhering to all the prescriptive requirements according to the [SLSA v1.0](https://slsa.dev/spec/v1.0/) specification:



* **Provenance Generation**: The Harness platform automatically generates detailed provenance, outlining the build platform, process, and top-level inputs involved in creating the artifact.
* **Provenance Attestation and Verification**: 
    * Following the [in-toto attestation](https://in-toto.io/) framework with [cosign](https://docs.sigstore.dev/verifying/attestation/), Harness digitally signs the generated provenance, ensuring its authenticity and integrity.
    * Downstream systems can verify provenance attestation, validate authenticity, and secure the supply chain against unauthorized changes.
* **Hosted Build Platform**: Organizations can leverage the [Harness Cloud](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure/) to execute builds within a Harness-managed, pre-configured infrastructure, optimizing for security and efficiency. 
* **Hardened Builds**: The Harness cloud environment is designed to isolate build processes, preventing any potential influence between runs. The hosted containerized step in Harness CI restricts build steps to access the provenance key information in compliance with SLSA specifications.

With all these features in place complying with **SLSA Level 3**, the SSCA module ensures artifact integrity and strengthens the overall security of the supply chain.


## How to comply with SLSA Level 3 using Harness SSCA

In Harness SSCA, compliance with SLSA is achieved in two phases. First, in your pipeline's build stage, you must configure it to generate and attest the provenance and use the Harness cloud for your builds. This first phase ensures the creation and secure signing of the provenance. The next phase involves verifying the attested provenance and enforcing integrity checks through policy enforcement. This verification and policy application can occur during the build or deployment stages. 

Here’s how it looks overall:

<DocImage path={require('./static/slsa-overview.png')} width="100%" height="100%" />

**SLSA Generation and Attestation**: When you configure your code to build in the Harness cloud and set up to push the image to a container registry, ensure you also configure the generation of SLSA provenance in the build stage. This stage will generate and attest the provenance with a private key and password, subsequently pushing both the image and its attested provenance to the container registry. For a detailed guide on implementing this process, please refer to the [Generate SLSA Provenance](https://developer.harness.io/docs/software-supply-chain-assurance/slsa/generate-slsa) documentation.

**SLSA Verification**: The SLSA verification step within the SSCA module verifies the authenticity of provenance using a public key. After verification, you can enforce policy sets on the verified provenance. For more details on the implementation, refer to the [Verify SLSA Provenance](https://developer.harness.io/docs/software-supply-chain-assurance/slsa/verify-slsa) documentation.
