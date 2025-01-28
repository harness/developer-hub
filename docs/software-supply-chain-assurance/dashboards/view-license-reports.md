---
title: View License Reports using Harness SCS
sidebar_label: View License Reports
description: View License Reports using Harness SCS
sidebar_position: 2
---

Building software involves usage of third-party components, libraries, frameworks, and code snippets, each subject to specific rights and obligations. While open-source software is free to use, it comes with conditions defined by its software license. These licenses specify how the code can be used, modified, and shared. If a company reuses a component without a proper license or fails to comply with the license terms, the copyright holder may take legal action.


Software licenses generally fall into different categories or families, each with its own set of rules and obligations. The four common types of license families are

* **Permissive Licenses:** Use, modify, and share software with minimal restrictions. You can keep changes private.
  
  **Examples:** MIT, Apache, BSD.

* **Reciprocal Licenses:** Use, modify, and share, but changes must be open-sourced under the same license.

  **Examples:** GPL, AGPL.

* **Weak Reciprocal Licenses:** Use, modify, but share modifications to open-source code only; proprietary code can remain private.

  **Examples:** MPL, EPL.

* **Unknown Licenses:** No clear license or ambiguous terms. Default copyright laws apply.


## License Reports - Artifacts:

With Harness License Reports Dashboards, you can easily access detailed information about the licenses and license families associated with your shipped artifacts or code repositories and all the relevant data in one place, eliminates the need to manually check each component’s license individually.

Harness supports License Reports for the following Targets

* Artifacts 
* Code Repositories


Follow the below steps to view the License Dashboards for the artifacts

1) Click on the ellipsis in the top-left menu. Select Dashboards from the dropdown, then choose Supply Chain.

<DocImage path={require('./static/dashboard.png')} width="80%" height="100%" title="Click to view full size image" />

2) To access the License Report for Artifacts, simply click on the card.

<DocImage path={require('./static/artifacts-dashboard.png')} width="80%" height="100%" title="Click to view full size image" />

3) You will be able to see the License Report with all the data.

<DocImage path={require('./static/licensereports-artifact.png')} width="80%" height="100%" title="Click to view full size image" />

4) You can filter out the License Reports dashboard based on individual licenses or license family by selecting any of the artifacts.

* **License:** Filter the artifacts based on specific license types (e.g., MIT, GPL, Apache). This helps to track and analyze each and individual components of the artifact.

* **License Family:** Group licenses into families to easily identify their category, making it simpler to filter them based on your specific requirement

  **Example**: If you only want to allow permissive licenses, such as MIT or Apache 2.0, you can easily filter out any licenses from other families like Reciprocal (GPL) or Weak Reciprocal (LGPL).

* **Artifacts:** Select any artifact to view and manage its components and to access the detailed information.

<DocImage path={require('./static/overview-dashboard.png')} width="80%" height="100%" title="Click to view full size image" />

:::note

Whenever you apply a new filter, make sure to click on **Refresh** icon at the top-right corner to pull the latest data onto the dashboard.

:::

5) Click on ellipsis which is on the top right corner of your  dashboard for more actions

* **Clear Cache & Refresh:** Performs a hard refresh, clears the cache, and updates the dashboard with the latest changes.
* **Download:** Download the license report in any of the format ( PDF,CSV )to easily share with stakeholders and executives.
* **Schedule Delivery:** Set up automatic delivery of your license report—daily, weekly, or monthly—so you never have to manually check the dashboard again.

<DocImage path={require('./static/apply-filters-dashboard.png')} width="80%" height="100%" title="Click to view full size image" />


:::note
The steps to access and manage License Reports for Code Repositories are identical to those for Artifacts
:::