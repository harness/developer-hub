---
title: Open Source Security and Risk Management
description: Manage and mitigate security risks in your open source components effectively.
sidebar_position: 1
---


Open source software plays a critical role in today’s software landscape, as per studies it shows that over 90% of codebases contain open source components. While open source accelerates development and innovation, it can also introduce security risks if not managed carefully. By assessing the open source components listed in your Software Bill of Materials (SBOM) against OWASP Top 10 best practices, you can proactively identify and address potential vulnerabilities.

[Top 10 OWASP risks](/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions#oss-top-10-risks) helps to uncover risks such as outdated or unmaintained components, ensuring your OSS dependencies remain secure, reliable, and up to date. Running these checks plays a vital role in towards strengthening your software supply chain and maintaining trust in your applications.

After completing the SBOM Orchestration step for your artifacts or repositories, the [SBOM tab](/docs/software-supply-chain-assurance/artifact-security/overview#sbom-tab) will display the below components marked with specific icons that indicate their current status.

- Outdated Components ⚠️

- Unmaintained Components ❌

- Vulnerabilities associated with SBOM Components 


### Outdated Components (OSS Risk - 5):

A component is considered outdated when its current version is lower than the latest available version. In the SBOM tab, outdated components are indicated by a warning symbol next to their version. This helps address OSS Risk-5.

<DocImage path={require('./static/outdated.png')} width="80%" height="80%" title="Click to view full size image" />

### Unmaintained Components (OSS Risk - 4):
An unmaintained component is one that has not received any version upgrades in the past year. Components in this category are marked with an alert symbol in the SBOM tab. This helps identify and mitigate OSS Risk-4.

<DocImage path={require('./static/unmaintained.png')} width="80%" height="80%" title="Click to view full size image" />

### Vulnerabilities for Your SBOM Components (OSS Risk - 1):

You can view the vulnerabilities associated with each SBOM component, including those reported by the STO. This addresses OSS Risk-1.



You can also filter out the components, based on the OWASP OSS Top 10 Risks.

<DocImage path={require('./static/owasp-filters.png')} width="80%" height="80%" title="Click to view full size image" />

By selecting the unmaintained and outdated OSS components, you can create Jira ticket to fix the issue. Once ticket is created, the ticket number along with the current ticket state will show up. Any change in the ticket state changes should automatically sync and reflect in the side panel.

<DocImage path={require('./static/jira.png')} width="80%" height="80%" title="Click to view full size image" />

