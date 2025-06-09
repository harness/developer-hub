---
title: View License Reports
sidebar_label: License Reports
description: View License Reports across the projects using Harness Dashboards
sidebar_position: 2
---

Software licenses generally fall into different categories or families, each with its own set of rules and obligations. Harness groups the licenses into four different categories which are called License Families.

* **Permissive Licenses:** Use, modify, and share software with minimal restrictions. You can keep changes private.        
  Examples: MIT, OpenSSL, Expat, etc.
* **Reciprocal Licenses:** Use, modify, and share, but changes must be open-sourced under the same license.            
  Examples: GPL (General Public License), AGPL (Affero General Public License), etc.

* **Weak Reciprocal Licenses:** Use, modify, but share modifications to open-source code only; proprietary code can remain private.    
  Examples: LGPL (Lesser General Public License), GFDL (GNU Free Documentation License), etc.

* **Unknown Licenses:** No clear license or ambiguous terms. Default copyright laws apply.


## View License reports for Artifacts and Code Repositories

With Harness License Reports Dashboards, you can easily access detailed information about the licenses and license families associated with your artifacts or code repositories and all the relevant data in one place, which eliminates the need to manually check each component’s license individually across all the projects.

Harness supports License Reports for the following Targets

* Artifacts 
* Code Repositories


Follow the steps below to view the License-Report for the artifacts. You can use the same process to view the license report for code repositories

1) Click on the Grid in the top-left menu, Select Dashboards, and then choose Supply Chain.

<DocImage path={require('./static/license-reporting.png')} width="80%" height="100%" title="Click to view full size image" /> 


2) Click on the **License Report - Artifacts** dashboard to view the license reports for artifacts. Similarly, you can view the license reports for code repositories by selecting **License Report - Repositories**.

<DocImage path={require('./static/artifacts-dashboard.png')} width="80%" height="100%" title="Click to view full size image" />

3) You will be able to see the License Report with all the data.

<DocImage path={require('./static/license-artifact-reports.png')} width="80%" height="100%" title="Click to view full size image" />

4) You can filter out the data based on individual licenses or license families by selecting any of the artifacts.

* **Harness Organization:** Filter the artifacts based on your selected organisation within the account.
* **Harness Project:** Filter the artifacts based on your selected project.
* **License:** Filter the artifacts based on specific license types (e.g., MIT, GPL, Apache) to track and analyze each and individual component of the artifact.
* **License Family:** Filter the artifacts based on specific license family types.
 **Example**: If you only want to allow permissive licenses, such as MIT or Apache 2.0, you can easily filter out any licenses from other families like Reciprocal (GPL) or Weak Reciprocal (LGPL).
* **Artifacts:** Select any artifact to view its components and to access the detailed information.

<DocImage path={require('./static/license-artifact-filter.png')} width="80%" height="100%" title="Click to view full size image" />

:::tip

Whenever you apply a new filter, make sure to click on **Refresh** icon at the top-right corner to pull the latest data onto the dashboard.

:::

5) Click on ellipsis which is on the top right corner of your dashboard for more actions.

* **Clear Cache & Refresh:** Performs a hard refresh, clears the cache, and updates the dashboard with the latest changes.
* **Download:** Download the license report in any of the format (PDF,CSV).
* **Schedule Delivery:** Set up automatic delivery of your license report (daily, weekly, or monthly) so you don’t have to check the dashboard manually.

<DocImage path={require('./static/apply-filters-dashboard.png')} width="80%" height="100%" title="Click to view full size image" />
