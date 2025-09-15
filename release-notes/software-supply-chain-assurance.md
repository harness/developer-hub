---
title: Supply Chain Security release notes
sidebar_label: Supply Chain Security
date: 2023-09-18T10:00
sidebar_position: 15
---

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/software-supply-chain-assurance/rss.xml" />

These release notes describe recent changes to Harness Supply Chain Security.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::


## September 2025

### Version: 1.41.0 , Plugin Version: 0.45.0

#### New Features and Enhancements

- [SBOM ingestion of non-container artifacts](/docs/software-supply-chain-assurance/open-source-management/ingest-sbom-data#non-container-images), the artifact path is now optional, allowing ingestion to be performed directly from the provided SBOM file. This makes it easier to manage artifact paths at scale.

- Added support to manage the [OWASP Top 10 risks](/docs/software-supply-chain-assurance/manage-risk-and-compliance/opensource-security-risk-management), enables you to easily identify outdated, unmaintained, close to end of life, and end of life components, and create Jira ticket to update package version.

<DocImage path={require('./static/scs/releasenotes.png')} width="90%" height="60%" title="Click to view full size image" />

#### Fixed Issues

- Fixed the search filters for code repositories and licenses on the SBOM page, which were previously not working accurately.

- The total vulnerabilities count on the code repository page is now the exact sum of critical, high, medium, and low severity issues (previously, info-level issues were also included).

- Fixed a Go-GitHub package parsing issue in GitHub Enterprise URLs ([ZD-92576](https://harnesssupport.zendesk.com/agent/tickets/92576)).


## August 2025

### Version: 1.39.0 , Plugin Version: 0.44.0



#### New features and enhancements

- Added support for [Ingestion of SBOM for non-container artifacts](/docs/software-supply-chain-assurance/open-source-management/ingest-sbom-data#non-container-images).
- Added support for secure connect for all the SCS plugins ([ZD-87724](https://harnesssupport.zendesk.com/agent/tickets/87724)).
- SBOM score for an artifact can now be downloaded via [API](https://apidocs.harness.io/openapi-merged/sbom/getsbomscoreforartifact).

#### Fixed Issues

- Artifact signing step was not working in air-gap mode. Support for Rekor in `air-gapped` mode has been added.
- SBOM orchestration for the code repos via syft used to show the source type as `file` not it is updated to `application`.



## July 2025

### Version: 1.36.0 , Plugin Version: 0.42.0

#### New features and enhancements

- Added support for AWS authentication - Assume IAM Role with delegate and IRSA, enabling compatibility with environments that restrict the use of AWS secret access keys.

#### Fixed Issues

- Fixed an issue where the [Delete Repos API on the repo listing page](https://apidocs.harness.io/tag/Delete-Repositories#operation/deleteRepositories) deleted all branches in the repository, even when a specific branch was provided. It now deletes only the specified branch. ([ZD-88336](https://harnesssupport.zendesk.com/agent/tickets/88336))

- Fixed `unsupported manifest format` error by dynamically fetching the architecture from the stage infrastructure at runtime instead of using a hardcoded value. ([ZD-86959](https://harnesssupport.zendesk.com/agent/tickets/86959))

### Version: 1.34.5 , Plugin Version: 0.40.0

#### New features and enhancements


- The [SBOM tab](https://developer.harness.io/docs/software-supply-chain-assurance/artifact-security/overview#sbom-tab) now displays component-level vulnerabilities by mapping STO Snyk scan results to SBOM components.
- Two new dashboards are now available:
   - [Component Violations for Artifacts and Code Repositories](/docs/software-supply-chain-assurance/open-source-management/dependencies/component-violations) to flag pipelines for SBOM violations across repositories in different projects.
   - [Component Summary for Artifacts and Code Repositories](/docs/software-supply-chain-assurance/open-source-management/dependencies/component-summary) to display all unique components across artifacts and repositories within your account
- SBOM now uses the repository name as the default application name. To override this and use `/harness` as the application name, set the stage variable `SYFT_SBOM_NO_SOURCE_NAME=TRUE`. ([ZD-87366](https://harnesssupport.zendesk.com/agent/tickets/87366))

#### Fixed Issues

- Fixed an issue where updating the integration to include all repositories still showed only the previously selected ones.
- Fixed an issue where STO container scan results (e.g., JFrog Xray) were not mapped to Artifact SBOM vulnerabilities due to a case mismatch. Now it has been updated to ensure accurate vulnerability mapping. ([ZD-84700](https://harnesssupport.zendesk.com/agent/tickets/84700))
- Fixed an issue where component searches returned incomplete results. Search is now consistent across all projects and organizations, improving visibility. ([ZD-84422](https://harnesssupport.zendesk.com/agent/tickets/84422))

## June 2025

### Version: 1.33.0 , Plugin Version: 0.39.1

#### New features and enhancements

- Registry domain URLs for artifacts stored in Docker registries, including GCR, ECR, ACR, JFrog Self-Hosted (On-Prem), and Kubernetes registries (Self-Hosted), no longer need to be specified, as the domain is already included in the connector URL. In all SCS steps, only the image name is required.

- Removed delegate selectors as a mandatory field from the API configuration for setting up the VM infra in [RSPM pipeline infra](https://apidocs.harness.io/tag/PipelineInfraConfig) configuration.([ZD-81509](https://harnesssupport.zendesk.com/agent/tickets/81509))

- For SBOM Drift, the **Detect drift from baseline** option has been removed from the SBOM orchestration step for artifacts.


#### Fixed Issues

- Fixed an issue where dependency searches across projects were incomplete, making it hard to assess zero-day attacks.([ZD-84422](https://harnesssupport.zendesk.com/agent/tickets/84422))


## May 2025

### Version: 1.31.0

#### New features and enhancements

- SLSA generation and verification steps now support both image tag and digest, enhancing traceability and artifact integrity validation across pipelines.

  **Note**: When modifying the existing SLSA steps, you must manually remove the digest from the YAML configuration to ensure compatibility with the updated functionality.

- Added [API support](https://apidocs.harness.io/tag/Integration-Step-Config) for the VM to configure step resources and settings (e.g., syft, cdxgen, CycloneDX, SPDX) at the account, org, or project level.

- Added support for Vault integration in Harness Cloud to securely manage secrets during pipeline executions.


#### Fixed Issues

- Fixed a bug where the license filters (e.g., contains, starts with) were not functioning as expected on the Artifacts page (SCS-3308).
- Fixed an issue where manually edited and saved integrations were skipping their scheduled next Iterations.This has been resolved by updating next Iterations upon manual edits. ( [ZD-82987](https://support.harness.io/hc/en-us/requests/82987), [ZD-83068](https://support.harness.io/hc/en-us/requests/83068)) (SCS-3708).
- Resolved issue where repositories onboarded via API were not being displayed on the integration page (SCS-3642).
- Fixed issue in the SBOM Orchestration step where, if an image name included a digest, the Supply Chain tab and Artifacts page displayed the digest in the corresponding tag field(SCS-3675).

## April 2025

### Version: 1.29.0

#### New features and enhancements

- Artifact signing and verification steps now support non-container artifacts (such as Helm charts, JARs, WARs, and manifest files) enhancing artifact integrity and security before deployment.
- Added [API support](https://apidocs.harness.io/tag/Integration-Step-Config) to configure step resources and settings (e.g., syft, cdxgen, CycloneDX, SPDX) at the account, org, or project level, with options to run steps in parallel or sequentially. 
- Registry domain URLs for artifacts stored in JFrog - Artifactory Cloud (Saas) and Kubernetes registries (cloud-hosted) no longer need to be specified, as the domain is already included in the connector URL. In all SCS steps only the image name is required.
 
Example:

JFrog: `</your-repo/test-image>:tag`

#### Fixed Issues

- Resolved an issue where signing an artifact using image name and digest created a new entry with an `@sha256` suffix instead of updating the existing entry (SCS-3404).
- Fixed a bug where the Delete Integration API responded with 200 OK even for invalid integration IDs; it now returns an appropriate error (SCS-3339).
- Fixed artifact verification failures caused by `signatureId` being overwritten during the verification step, causing the system to look for signature files in the wrong location (SCS-3509 , ZD-78728).
- Resolved CDXgen failures in restricted clusters by modifying the plugin to run in air-gapped mode, eliminating the need for external license fetch calls (SCS-3590).



## February 2025

### Version: 1.25.1

#### New features and enhancements

- Added [Dashboards for License and Compliance Reports](/docs/software-supply-chain-assurance/open-source-management/dependencies/view-licenses) to easily access detailed information about the licenses and compliance status associated with your software components at one place.
- Added [Artifact Signing and Verification](/docs/software-supply-chain-assurance/artifact-security/sign-verify/sign-artifacts) steps to sign artifacts and verify the signed artifacts before it gets deployed to ensure integrity and prevent tampering.
- With Harness Internal Developer Portal (IDP) workflow now you can use a single GitHub connector at the account level and selectively onboard repositories to the project of your choice and automatically create scan pipelines to scan those repositories.
- Secure attestation with Cosign using HashiCorp Vault, now supported via Vault Proxy with GCP Auth for enhanced security.
- Enabled SBOM and SLSA generation and verification via Harness GitHub Actions, integrating seamlessly with GitHub CI workflows.

#### Fixed Issues

- Added a link in the Supply Chain tab that redirects to the Artifacts/Repositories details page, for better traceability.
- Fixed the issue where clicking the back button on the Select Code Repo page after selecting a connector redirected the user to the login page.

## November 2024

### Version: 1.19.1
<!-- 2024-11-13 -->

#### New features and enhancements
- Launched a dedicated **SLSA Generation** step under the Supply Chain Security section in the step palette; removed the **SLSA Provenance** section from the stage Overview. You can now perform SLSA provenance generation and attestation using the new SLSA Generation step.
- [Chain of Custody](/docs/software-supply-chain-assurance/artifact-security/overview#chain-of-custody) in the Artifact section now logs events from the Security Testing Orchestration (STO) module.
- [Rule Definitions](/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions) section now has an expandable view, showing rule descriptions upon expansion; replaced the **Type** column with **Applicable On** to display the entity types to which rules apply, such as Code Repository or CI/CD, along with platform/Integration logo. For example, GitHub, GitHub Actions.

##### Enhancements in CI/CD section
- Added sorting option for pipelines based on **Risk and Compliance Issues** column.
- New filter for pipelines by **CI/CD Types**, allowing you to list GitHub workflows or Harness pipelines.

##### Enhancements in Compliance section
- Renamed **Rules** tab to **Evaluations**.
- Added **Applicable On** column in the **Evaluations** tab to display the entity types to which rules apply, such as Code Repository or CI/CD.
- Added a link to entity source in the [impacted entity details](/docs/software-supply-chain-assurance/manage-risk-and-compliance/manage-compliance-posture#view-impacted-entities) within the **Evaluations** tab. By clicking on an impacted entity, you can use the “Go to workflow/repository” link to navigate directly to the associated pipeline or repository.


## October 2024

### Version: 1.18.0
<!-- 2024-10-15 -->

#### New features and enhancements
- Added rule `2.3.9` from [OWASP CICD-SEC-6](/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions#cicd-sec-6-insufficient-credential-hygiene) for evaluation against Harness pipelines. For more information, refer to the [Standards and Rule Definitions](/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions) documentation.
- In the Evaluation details, links to the relevant GitHub workflows or Harness pipelines have been included.
- Introduced UI enhancements in the Compliance section.

## July 2024

### Version: 1.14.3

<!-- 2024-07-23 -->

#### **Announcements**

**SCS is now Generally Available (GA)**. We have moved from Limited GA (since January 2024) to GA. Read more on our [announcement blog](https://www.harness.io/blog/harness-ssca-now-features-repo-security-posture-management-rspm).

#### **New features**

* **Repository Security Posture Management**:
    * Connect your GitHub with Harness SCS to identify insecure configurations in code repositories and organization settings for comprehensive risk, compliance, and security posture management. Use the [Harness SCS GitHub app](https://github.com/apps/harness-ssca) for integration. Learn more in our [RSPM](/docs/software-supply-chain-assurance/manage-risk-and-compliance/repository-security-posture-management-rspm) documentation.
* **Manage Risk and Compliance**
    * **Compliance Section**: A new Compliance section to assess and understand the risk posture of your entire supply chain. Detailed information is available in the [Manage Compliance Posture](https://developer.harness.io/docs/software-supply-chain-assurance/manage-risk-and-compliance/manage-compliance-posture) documentation.
    * **Rule Definitions Section**: Access a complete list of all standards and associated rules supported by Harness SCS, including:
        * [CIS Benchmarks for GitHub](https://developer.harness.io/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions#cis-benchmarks)
        * [OWASP Top 10 CI/CD Risks for GitHub](https://developer.harness.io/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions#owasp-top-10-cicd-security-risks)
    
        More details can be found in the [Standards and Rule Definitions](https://developer.harness.io/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions) documentation.
* **Integrations and Permissions**
    * A new interface to manage your integrations with Harness SCS. Learn more about this in the Integrations and Permissions.


#### **Enhancements**

[Artifact view](/docs/software-supply-chain-assurance/artifact-security/overview#view-your-artifacts) will now support the following views

* [Chain of Custody](/docs/software-supply-chain-assurance/artifact-security/overview#chain-of-custody): Log the artifact's journey throughout the software supply chain.
* [Artifact Listing](/docs/software-supply-chain-assurance/artifact-security/overview#digests-for-your-artifact): View all container images, including their digests and tags.
* [Security Insights](/docs/software-supply-chain-assurance/artifact-security/overview#vulnerabilities-tab): Access detailed information on security vulnerabilities.
* [SLSA Provenance](/docs/software-supply-chain-assurance/artifact-security/overview#view-your-artifacts): View the provenance and verification status of artifacts following the SLSA framework.

## July 2024

### Version 1.12.0

#### New features and enhancements

- The "Repositories" tab previously located in the [Artifact View](/docs/software-supply-chain-assurance/artifact-security/overview) has been relocated and expanded into a separate section titled "[Code Repositories](https://developer.harness.io/docs/software-supply-chain-assurance/code-repositories-view)". All repository data will now be accessible from the [Code Repositories](https://developer.harness.io/docs/software-supply-chain-assurance/code-repositories-view) section, providing a more streamlined interface for managing repository  information.

## September 2023

The [Supply Chain Security module documentation](/docs/software-supply-chain-assurance) is live on the Harness Developer Hub. Check back soon for module release notes.
