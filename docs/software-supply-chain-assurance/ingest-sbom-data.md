---
title: Ingest Software Bill of Materials (SBOM) data into SSCA
description: You can easily ingest from any scanner that can generate an SBOM.
sidebar_label: Ingest SBOM
sidebar_position: 31
---

[Software Bill of Materials (SBOM)](https://cyclonedx.org/capabilities/sbom/) is a list of all the components, libraries, and other dependencies used in a software application. You can easily ingest a JSON [SPDX](https://spdx.dev/learn/overview/) or [CycloneDx](https://cyclonedx.org/specification/overview/) formatted SBOM from any tool that can generate these report formats.

### Important notes for ingesting SBOM data into SSCA

- This workflow is intended for scanners that have no supported integration in SSCA. Harness recommends that you always use the documented workflow for supported scanners. For a list of all SSCA-supported scanners, go to [What's supported](docs/security-testing-orchestration/whats-supported).

### Workflow for ingesting SBOM data into SSCA

The following workflow describes how to set up an ingestion pipeline for any scanner that supports generating an SBOM in [SPDX](https://spdx.dev/learn/overview/) or [CycloneDx](https://cyclonedx.org/specification/overview/) JSON format. 

1. In your Harness pipeline, go to the Overview tab of the security stage and enter a shared path such as `/shared/customer_artifacts`.
 
  # ![](../../docs/security-testing-orchestration/use-sto/static/ingesting-issues-from-other-scanners-00.png)

2. Configure a step to generate an SBOM using a Run, Plugin, or GHA Step. Here is an example of a Run step configured to generate an SBOM using [Aqua Trivy](https://aquasecurity.github.io/trivy/dev/docs/supply-chain/sbom/)

  # ![](static/ingesting-sbom-from-other-scanners-01.png)

   ```
    trivy image \
     --format spdx-json \
     --output /shared/customer_artifacts/result.spdx.json \
     ubuntu:22.04
   ```  

3. If the SBOM generator can't be configured to output to the SBOM, then copy the SBOM into the directory set in step one. 
   
5. Add an [SSCA Orchestration step](docs/software-supply-chain-assurance/generate-sbom#add-the-ssca-orchestration-step) configured to mode ingestion after the Run step and configure it as follows:
   1. Step Mode should be set to Ingestion
   2. Specify the SBOM File Path to match the file created in the prior step
   3. Configure the Container Registry and image where the SBOM should be attached
   4. Configure the SBOM Attestation Private Key and Password 

  # ![](static/ingesting-sbom-from-other-scanners-02.png)

## Example workflows for ingesting SBOM data into SSCA

The following topics describe end-to-end example pipelines for ingesting SBOM data:

- Using a [Blackduck STO Step](docs/software-supply-chain-assurance/generate-sbom-blackduck.md) to generate an SBOM
