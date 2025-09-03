---
title: SCS FAQs
description: Frequently asked questions about SCS
sidebar_position: 56
sidebar_label: FAQs
---


## General Questions

### 1. In which Harness stages can I use SCS steps?

- You can use SCS steps in the Harness CI, CD, and Security stages.


### 2. Can we use Harness SCS via GitHub Actions?

- Yes, [Harness GitHub Actions](https://github.com/harness/github-actions) provide a seamless way to integrate Harness SCS capabilities directly into GitHub workflows. You can use this GitHub Action to perform various supply chain security tasks which includes multiple sub-actions, each designed for specific tasks

### 3. After we sign or attest the artifacts, do the existing .sig or .att files get overridden?

- After you attest an artifact, the `.att` file is not overwritten; each new attestation is appended to the existing file.

- After you sign an artifact, the `.sig` file is not overwritten; each new signature is appended to the existing file, but only if Attach Signature to Artifact Registry is enabled.

### 4. What is the difference between Attestation and Signing?

- Attestation provides cryptographic proof of an artifact’s origin based on how and where it was created. It captures metadata about the build environment and verifies the artifact’s integrity before it is signed. Attestation serves as a trusted statement regarding the artifact’s provenance and the conditions under which it was produced.

- Signing involves applying a cryptographic signature to the artifact to ensure that the artifact has not been altered or tampered with after it was created.


### 5. What does Cosign do behind the scenes during the time of attestation and signing?

- Behind the scenes, Cosign computes a digest (fingerprint) of the artifact, creates a digital signature or attestation using a private key, and then stores that signature/attestation as an OCI artifact in the registry. It also records the event in Rekor’s transparency log (for keyless signing), ensuring the artifact’s authenticity, integrity, and provenance can later be verified.

### 6. How does the SLSA/SBOM verification steps identify the appropriate attestation file from the artifact registry?

- The SLSA/SBOM verification step uses the artifact’s digest as a key to automatically locate and pull the corresponding `.att` file from the artifact registry.


### 7. What are the cosign key types do you support?

- Harness SCS supports Cosign key type `ecdsa-p256`.

### 8.  How to enable the rekor logs in the Artifact Signing step ?

- Rekor logs are disabled by default. To enable them, click on `Project Settings`, navigate to `Default Settings`, and disable Airgap mode in Supply Chain Security.


## SMP


### 1. Does Harness SCS support SMP?

- Yes, Harness SCS supports SMP. Please refer the [docs](/docs/software-supply-chain-assurance/ssca-supported#scs-on-harness-self-managed-enterprise-edition-smp) to see all the features that SCS supports on SMP.


### 2. How do I verify that all required SCS microservices are running on SMP?

- Once you run this command, `kubectl get pods -n <your-namespace>`.  You should see both the `ssca-manager` and `ssca-ui` pods running.

### 3. Where are my uploaded SBOMs and artifact signing signatures stored?


- First, you need to setup the minio: 

- Then exec into minio pod `kubectl exec -it <minio-pod-name> -n <namespace>` -- /bin/sh

- Then type `ls /data`, will show all the buckets created inside minio. `sbom-store`  should be one of them.
if not then create it with these command

- ` mc --help` this is to validate if `mc client` is present in pod.

- If `mc client` is not present you can install it with `mc alias set myminio http://localhost:9000 MINIO_ACCESS_KEY MINIO_SECRET_KEY`

- Once mc is installed, create the bucket using the command `mb myminio/sbom-store`

### 4. Installed SMP via Harness Helm charts, How do I add other modules?

- The Harness Helm chart installs only the core platform components. To add other modules (like SCS, STO, etc.), you need to edit the `override.yaml` file and enable them explicitly.


