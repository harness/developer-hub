---
title: View License Reports using Harness SCS
sidebar_label: View License Reports
description: View License Reports using Harness SCS
sidebar_position: 2
---

Building software involves using third-party components, libraries, frameworks, and code snippets, each subject to specific rights and obligations. While open-source software is free to use, it comes with conditions defined by its software license. These licenses specify how the code can be used, modified, and shared. If a company reuses a component without a proper license or fails to comply with the license terms, the copyright holder may take legal action


Software licenses generally fall into different categories or families, each with its own set of rules and obligations. The four common types of license families are

* **Permissive Licenses:** Use, modify, and share software with minimal restrictions. You can keep changes private.
  
  Examples: MIT, Apache, BSD.

* **Reciprocal Licenses:** Use, modify, and share, but changes must be open-sourced under the same license.

  Examples: GPL, AGPL.

* **Weak Reciprocal Licenses:** Use, modify, but share modifications to open-source code only; proprietary code can remain private.

  Examples: MPL, EPL.

* **Unknown Licenses:** No clear license or ambiguous terms. Default copyright laws apply.


## License Reports - Artifacts:

With Harness License Reports, you can easily access detailed information about the licenses and license families associated with your shipped artifacts or code repositories. It brings together all the relevant data in one place, eliminates the need to manually check each component’s license individually. This streamlines license management by enabling efficient monitoring and enforcement of policies across the organization

Harness supports License Reports for the following

* Artifacts 
* Code Repositories


Follow the below steps to view the License Dashboards for the artifacts

1) Click the ellipsis in the top-left menu. Select Dashboards from the dropdown, then choose Supply Chain.

<DocImage path={require('./static/dashboard.png')} width="80%" height="100%" title="Click to view full size image" />

2) For this current docs we are going ahead with the License Report - Artifacts. Click over the card.

<DocImage path={require('./static/artifacts-dashboard.png')} width="80%" height="100%" title="Click to view full size image" />

3) You will be able to see the license Report with all the data - Artifacts overview.

<DocImage path={require('./static/licensereports-artifact.png')} width="80%" height="100%" title="Click to view full size image" />

4) You can filter out the License Reports dashboard based on individual licenses or license family for any of the artifacts.

* **Licenses:** Filter the artifacts based on specific license types (e.g., MIT, GPL, Apache). This helps to track and analyze compliance for each individual license.

* **License Family:** Group artifacts by their license families (e.g., Permissive, Weak Reciprocal, Reciprocal, Unknown). This allows for batch compliance checks for licenses with similar terms.

* **Artifacts:** Filter artifacts regardless of their associated licenses. Useful for managing and auditing individual components, regardless of the licensing details.

:::note

When you apply new filter, make sure to click on Refresh at the top-right corner to pull the latest data onto the dashboard.

:::

<DocImage path={require('./static/overview-dashboard.png')} width="80%" height="100%" title="Click to view full size image" />


5) Click on ellipsis which is on the top right corner of your  dashboard for more actions

* **Clear Cache & Refresh:** Performs a hard refresh, clears the cache, and updates the dashboard with the latest changes.
* **Download:** Download the license report in any of the format ( PDF,CSV )to easily share with stakeholders and executives.
* **Schedule Delivery:** Set up automatic delivery of your license report—daily, weekly, or monthly—so you never have to manually check the dashboard again.

<DocImage path={require('./static/apply-filters-dashboard.png')} width="80%" height="100%" title="Click to view full size image" />


The steps to access and manage License Reports for Code Repositories are identical to those for Artifacts