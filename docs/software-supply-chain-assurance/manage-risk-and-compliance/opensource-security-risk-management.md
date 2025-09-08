---
title: Open Source Security and Risk Management
description: Manage and mitigate security risks in your open source components effectively.
sidebar_position: 1

tags:
  - harness-scs 
  - risk-and-compliance
  - top-10-oss-risks
  - owasp
---


Open source software plays a critical role in the software landscape, with studies showing that over 90% of codebases contain open source components. While it accelerates development and innovation, it can also introduce security risks if not managed carefully. By assessing the components listed in your Software Bill of Materials (SBOM) against [OWASP Top 10 risks](/docs/software-supply-chain-assurance/manage-risk-and-compliance/standards-and-rule-definitions#oss-top-10-risks) helps to uncover risks such as outdated or unmaintained components, ensuring your OSS dependencies remain secure, reliable, and up to date. Running OSS risk checks plays a vital role in strengthening your software supply chain and maintaining trust in your applications.

After completing the SBOM Orchestration step for your [artifacts](/docs/software-supply-chain-assurance/open-source-management/generate-sbom-for-artifacts) or [repositories](/docs/software-supply-chain-assurance/open-source-management/generate-sbom-for-repositories), the [SBOM tab](/docs/software-supply-chain-assurance/artifact-security/overview#sbom-tab) will display the below components marked with specific icons that indicate their current status.

- Outdated Components ⚠️

- Unmaintained Components ❌

- Vulnerabilities in SBOM Components 

:::note

We set the refresh interval for OSS component data to every 2 days. After you run the SBOM Orchestration step, the data is updated asynchronously within 5 – 10 minutes.

:::


### Outdated Components (OSS Risk - 5):

A component is considered outdated when its current version is lower than the latest available version. In the SBOM tab, outdated components are indicated by a warning symbol next to their version. Create a [Jira ticket](/docs/software-supply-chain-assurance/manage-risk-and-compliance/opensource-security-risk-management#create-jira-ticket) to update the component version to the latest available version.

<DocImage path={require('./static/outdated.png')} width="80%" height="80%" title="Click to view full size image" />

### Unmaintained Components (OSS Risk - 4):

An unmaintained component is one that has not received any version upgrades in the past year. In the SBOM tab, such components are marked with an alert symbol. Create a [Jira ticket](/docs/software-supply-chain-assurance/manage-risk-and-compliance/opensource-security-risk-management#create-jira-ticket) to replace it with an alternative component.

<DocImage path={require('./static/vulnerabilities.png')} width="80%" height="80%" title="Click to view full size image" />

### Vulnerabilities in SBOM Components (OSS Risk - 1):

After you run the SBOM orchestration step followed by the STO Snyk scan, the SBOM tab displays vulnerabilities for the components identified by Snyk. This helps you effectively identify and prioritize open source risks



You can also filter out the components, based on the OWASP Top 10 Risks.

<DocImage path={require('./static/owasp-filters.png')} width="80%" height="80%" title="Click to view full size image" />

### Create Jira Ticket

As a prerequisite, configure a [Jira connector](/docs/platform/connectors/ticketing-systems/connect-to-jira/). Click on the module selector at the top left of the side bar, go to Unified View, and create the connector at the project level.

- Select the outdated/unmaintained dependency, which will open a side panel. Click on Create Ticket.
- **Create in Project:** Select the Jira project where the issue should be created. This list is populated based on your configured Jira connector.
- **Issue Type:** Choose the type of Jira issue to create.
- **Title:** The field will be auto-populated in the format below:
    - **For outdated components** - Outdated Component Identified - Upgrade `<component_name>` from `<current_version>` to `<latest_version>`
    - **For unmaintained components** - Unmaintained Component Identified - `<component_name>` version `<current_version>`
- **Description:** Add the details that you want to include in the Jira ticket description.

 Once the ticket is created, its number and current status will be displayed. Any changes to the status of the ticket will automatically synced and be reflected in the side panel.

<DocImage path={require('./static/jira.png')} width="80%" height="80%" title="Click to view full size image" />

