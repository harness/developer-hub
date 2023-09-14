A Software Bill of Materials (SBOM) is essential for understanding the components and dependencies within an application, which in turn enables organizations to manage open-source component risks effectively.

The Harness SSCA module provides comprehensive capabilities for generating, managing, and analyzing SBOM for software artifacts.

### Integration with other Harness modules and third-party tools

The SSCA module integrates with the CI and CD stages of Harness pipelines, ensuring that an SBOM is generated for every build of your software artifacts and, optionally, before deployment, as well. This helps you maintain up-to-date information about the components used in your applications at all times. Additionally, you have the flexibility to use your preferred SBOM generation tool.

The SSCA module can also integrate with third-party SBOM generation tools, such as Syft and FossID. In the SSCA module, this is referred to as *orchestrating* with a tool, and it allows you to use your preferred SBOM generation tools or tools standardized and approved by security and governance teams

### SBOM formats

SSCA can generate SBOM in popular standard formats, such as CycloneDX and SPDX.

Because there are multiple SBOM formats and standards, the SSCA module normalizes your SBOM to extract the relevant information, such as component name, version, supplier, and licensing data. This normalization process ensures that your SBOM data is consistent, easy to manage, and can be used for policy enforcement and further analysis.

### Attest and store

When an SBOM is generated, the SSCA module generates and signs the attestation, ensuring that the information is accurate and trustworthy. The attestations are then securely stored in your artifact repository, where you can access and analyze them as needed. SBOM are also stored in the Harness Platform so that you can download, analyze, and share them as needed.

Attestations are stored as `.att` files in the artifact repository, specified in your build or deploy stage, along with the image. You can also find the SBOM on the **Execution details** page in Harness. For more information, go to [View attestations and violations](/docs/software-supply-chain-assurance/ssca-view-results.md).