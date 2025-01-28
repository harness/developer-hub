---
title: Overview
description: Understanding the process of generate and manage SBOMs with Harness SCS
sidebar_position: 9
sidebar_label: Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In today's software development landscape, applications are built from a complex mix of internal code, third-party libraries, and open-source components. This creates a challenge in understanding the exact makeup of the software and its potential vulnerabilities. Here's where a [Software Bill of Materials (SBOM)](https://security.cms.gov/learn/software-bill-materials-sbom) comes in. An SBOM is essentially a detailed list of all the components and dependencies used to build a software product. It includes information like the name, version, and license of each component, providing organizations with a clear picture of their software's composition, which in turn enables organizations to manage open-source component risks effectively.

The Harness SCS module provides comprehensive capabilities for generating, managing, and analyzing SBOM for software artifacts. Here’s how the **SBOM Orchestration** step in the SCS module helps you achieve it:


<DocImage path={require('./static/sbom-orch-overview.png')} width="80%" height="80%" title="Click to view full size image" />



* **Generate or Ingest SBOMs**: The step allows you to easily generate SBOMs for your software artifact or Ingest existing ones from external sources. Refer to the following docs for detailed implementation
    * [Generate SBOM](/docs/software-supply-chain-assurance/sbom/generate-sbom)
    * [Ingest SBOM](/docs/software-supply-chain-assurance/sbom/ingest-sbom-data)
* **SBOM Quality Score**: The step will generate a [quality score](/docs/software-supply-chain-assurance/sbom/sbom-score) for the SBOM which helps in assessing the completeness and quality of your SBOM.
* **Attestation**: The step will sign the SBOM and securely store it in the artifact’s repository for added trust and verification.
* **SBOM Drift Tracking**: You can use [SBOM Drfit](/docs/software-supply-chain-assurance/sbom/sbom-drift) feature to monitor changes in your software composition over time and identify potential security risks or licensing issues.


## Integration with SBOM tools

The SCS Module integrates with SBOM generation tools such as **[syft](https://github.com/anchore/syft)** and **[cdxgen](https://cyclonedx.github.io/cdxgen/#/)**, and is accessible to use from the SBOM Orchestration step This flexibility allows you to utilize your preferred tools or adhere to standards. 

Moving forward, Harness will add support for additional SBOM generation tools.


## SBOM formats

SCS can generate SBOM in popular standard formats, such as **[SPDX](https://spdx.dev/)** and **[CycloneDX](https://cyclonedx.org/)**. As there are multiple SBOM formats and standards, the SCS module normalizes your SBOM to extract the relevant information, such as component name, version, supplier, and licensing data. This normalization process ensures that your SBOM data is consistent, easy to manage, and can be used for policy enforcement and further analysis.


## Ingest SBOM data

While Harness SCS enables you to generate SBOMs, it also supports the ingestion of SBOMs produced by third-party tools. Please refer to the [SBOM ingestion documentation](https://developer.harness.io/docs/software-supply-chain-assurance/sbom/ingest-sbom-data) for more details.


## Attest and store the SBOM

For enhanced trust and verification of your SBOM's integrity, you can optionally configure the SBOM Orchestration step to sign it and generate an attestation. This attestation is then stored as a `.att` file within your artifact's repository for easy access. The generated SBOMs are also readily available for download within the Harness Platform.

:::info
While Harness is capable of generating SBOMs for both Container Images and Code Repositories, it is important to note that SBOM attestation is supported only for Container Images.
:::

## Next steps

* [Generate](https://developer.harness.io/docs/software-supply-chain-assurance/sbom/generate-sbom) or [Ingest](https://developer.harness.io/docs/software-supply-chain-assurance/sbom/ingest-sbom-data) SBOM
* [Enforce SBOM Policies](https://developer.harness.io/docs/software-supply-chain-assurance/sbom-policies/overview) on the SBOM