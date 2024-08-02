---
title: Infrastructure as Code Management release notes
sidebar_label: Infrastructure as Code Management
date: 2024-04-25T17:00
tags: [Infrastructure as Code Management]
sidebar_position: 17
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/infrastructure-as-code-management/rss.xml" />

These release notes describe recent changes to Harness Infrastructure as Code Management.

:::info About Harness Release Notes

- **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
- **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
- **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## June 2024

### Version 1.17.0
<!-- Released on 04 June 2024 -->

#### New features and enhancements
- **Support for commit SHA:** Introduced the ability to add commit SHA options to configuration and Terraform variable files. (IAC-1961)
- **Workspace expression:** Enabled setting expressions for workspace values within an IACM stage. (IAC-2002)

### Version 1.15.0
<!-- Released on 04 June 2024 -->

#### New features and enhancements
- **Filter persistence:** Enhanced filtering capabilities by ensuring the persistence of filter values. (IAC-1938)

#### Fixed issues
- **Workspace type setting:** Corrected default values to accurately set the workspace type. (IAC-1970)

## May 2024

### Version 1.10.0
<!-- Released on 02 May 2024 -->

#### New features and enhancements
- **Cost estimation breakdown:** Added the option to select multiple workspaces with associated costs in the cost estimation breakdown screen. (IAC-1835)

## April 2024

### Version 0.186.0
<!-- Released on 18 April 2024 -->
#### New features and enhancements
- **Copy resource values:** Improved the user experience of the resource review screen and added the ability to copy resource values. (IAC-589)
- **Approval screen - actioned by:** Displayed the user who actioned the approval in the IACM approval step when viewing and executing it. (IAC-1699)
- **Provider check for var file:** Implemented a provider check when editing a var file to ensure access to repositories and branches. (IAC-1701)

### Version 0.181.0
<!-- Released on: 04 April 2024 -->
#### Layout & Design Refinement:
  - **Enhanced Layout:** Increased spacing around store cards to prevent overlap of check marks and enhance readability and accessibility. (IAC-1601)
  - **Sensitive Field Icons:** The eye/hide icon is now exclusively used with sensitive fields to improve privacy and clarity. (IAC-1694)
---

## March 2024
### Version 0.178.0
<!-- Released on: 25 March 2024 -->
#### New features and enhancements
  - **Connector Validation Enhancement:** We've implemented a validation check for connectors when creating or editing workspaces. This update ensures that all connectors used are currently available and of the correct type before proceeding with the operation, to help prevent errors related to non-existent or incorrect type connectors, enhancing the reliability and efficiency of workspace management. (IAC-1602)

### Version 0.176.0
<!-- Released on: 21 March 2024 -->
#### New features and enhancements
  - **Enhanced Lock Icon Tooltips and Warnings:** We've updated the tooltips and warning messages for the **lock icon** in Workspace resources to improve clarity and accessibility. (IAC-1577)

### Version 0.175.0
<!-- Released on: 15 March 2024 -->
#### Fixed issues
  - **Improved Header Visibility:** We resolved the issue of overlapping headers in side-by-side workspace state comparisons, enhancing readability and accessibility for the **View Execution** and **filename** headers. (IAC-1573)
  - **Planned Changes Count Accuracy:** We refined the **Planned changes** count to include only **Added, Changed, and Deleted** resources, excluding **Unchanged** resources, for a more accurate reflection of significant changes. (IAC-1561)
---

## February 2024
### Version 0.152.0
<!-- Released on: 08 February 2024 -->
#### Fixed issues
- **Improved Variable Deletion Permissions:** Fixed an oversight where permissions for variable deletion were not checked during workspace updates. Previously, checks were only performed via the */variable* endpoint using the **DELETE method**. This update ensures that permissions are verified against both the individual deletions and the broader workspace variable updates, maintaining security without modifying the core architecture between **iac-server** and **sprox**. (IAC-1362)