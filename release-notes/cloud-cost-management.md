---
title: Cloud Cost Management
tags: [NextGen, "cloud cost management"]
date: 2023-01-04T10:00
sidebar_position: 5
---

Harness Cloud Cost Management is updated regularly in Harness SaaS. Review the notes below for details about recent changes.

:::note
Harness deploys updates progressively to different Harness SaaS clusters. You can identify the cluster hosting your account in your Account Overview page. The features and fixes in the release notes may not be available in your cluster immediately.

Additionally, the release notes below are only for NextGen SaaS. FirstGen SaaS release notes are available [here](/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes) and Self-Managed Enterprise Edition release notes are available [here](/release-notes/self-managed-enterprise-edition).
:::
## January 4, 2023

### What's new
This release does not include new features.


### Early access
* Standardize your currency across Harness CCM (CCM-9280)

  This release introduces Currency Preference that enables you to view the entire CCM application in your preferred currency for different cloud providers. This feature is behind a feature flag CCM_CURRENCY_PREFERENCES.

* API implementation for the Currency Preferences feature (CCM-9632)

  You can now use the Currency Preference API to select the currency in which you want to view your entire CCM application across different cloud providers. Go to [Harness API Documentation](https://apidocs.harness.io/) for more information.


### Fixed issues
This release does not include fixed issues.



## December 16, 2022

### What's new

* Introducing support to list the label keys that contain the string node-pool-name. (CCM-10203)
  
    While adding a node pool name, Harness CCM looked only for the exact match. Now, CCM has introduced support to check if the node label key contains the string node-pool-name. CCM falls back to _contains_ if an exact match is not found. See [Labels for node pool recommendations](https://developer.harness.io/docs/cloud-cost-management/use-cloud-cost-management/ccm-recommendations/node-pool-recommendations#prerequisites) for more information.

  
### Early access

This release does not include early access features.


### Fixed issues

- The messages in budget alert notification emails were misleading. Now, the emails convey more meaningful and dynamic messages. They provide the cost type and the period for which the alert is created. (CCM-9291)


## December 7, 2022, version 77716

### What's new

This release does not include new features.

### Early access

This release does not include early access features.

### Fixed issues

- First-time users could not launch the Kubernetes cluster creation workflow by using the Quick Create option on the Cloud Integration page. (CCM-9953)

  Now, this issue is fixed.

- When you clicked **Explore all plans** on the Cloud Cost Management Getting Started page, you were directed to the old onboarding page instead of the new one. (CCM-9638)

  Now, this issue is fixed.

- On the Recommendations page, when you clicked the Copy icon, a confirmation message was not displayed to be sure the metrics were copied. Also, the copied message contained unwanted strings such as null. (CCM-10009)

  Now, a confirmation message is displayed when you click the Copy icon and the format of the copied message is improved.

- The anomaly tooltip in the Perspective details chart was not displayed properly if it extended beyond the chart. (CCM-9336)

  Now, this issue is fixed.

## November 29, 2022, version 77608

### What's new

NA

### Early access

NA

### Fixed issues

- The bars in the Perspectives chart grouped by cost categories were not rendering properly. (CCM-9502)

  This issue is fixed by applying a limit on the number of cost buckets in the cost category. Now, when you group by cost categories in a Perspective, it returns the top 12 cost buckets instead of all cost buckets.

- The GCP load balancer modal was showing undefined while creating a new load balancer. (CCM-9825)

  This issue is fixed. Now, it shows the term Load Balancer.

- Azure VM inventory dashboards showed duplicate cost entries because every API call to pull VM data inserted a new row in the dashboard if the time of creation (creationTime) was different from the existing row of that VM. (CCM-9842)

  Now, this issue is fixed.

## November 6, 2022, version 77317

### What's new

NA

### Early access

NA

### Fixed issues

- When the Harness account ID of the customer begins with a hyphen, sts assume-role step in the data ingestion pipeline interpreted it as an additional argument, and thus failed to run the command.

  The account ID value is now assigned to role-session-name by explicitly using '='. This works with session names starting with a hyphen as well. (CCM-9481)

- Clicking Save Cost Category more than once resulted in the creation of multiple cost categories with the same name.

  Now, the Cost category name is unique. You can't have two Cost categories with the same name. If you enter an existing Cost category name while updating or creating a Cost category, an error message is displayed — Invalid request: Cost category name already exists. (CCM-8934)

## October 21, 2022, version 77221

### What's new

You can now add labels to enable node pool recommendations. `kops cluster` node label has been added for node pool recommendations. See [Labels for node pool recommendations](https://developer.harness.io/docs/cloud-cost-management/use-cloud-cost-management/ccm-recommendations/node-pool-recommendations#prerequisites) for more information. (CCM-9309)

### Early access

NA

### Fixed issues

The AWS cost shown in the Perspective section and the dashboard mismatched. Duplicate account name entries that belonged to the same account ID caused this issue in the dashboards. (CCM-9344)

This issue is resolved.

## October 7, 2022, version 77025

Delegate version: 77021

### What's new

NA

### Early access

NA

### Fixed issues

- The cluster data displayed in the Perspective preview section and the Perspective section were different because data was retrieved from two different tables. (CCM-8961)

  Now, you can apply one of the following rules in the Perspective preview section and the relevant table is queried:

  - Cluster only

  - Cluster + Common

  - Cluster + Label

  - Cluster + Label + Common

- Users weren't able to download the YAML file while performing the Kubernetes cost reporting workflow. (CCM-9141)

  This issue is fixed now.

- In the recommendation filter API, the labels were not handled properly. (CCM-9193)

  Now, Harness supports labels in the recommendation filter API for ECS and workloads only.

- In the recommendation filter API, cost categories were not handled properly. (CCM-8808)

  In the recommendation filter APIs, now the following cases are supported:

  - Considering Business Mapping cluster rules while recommending.

  - Supporting the following cluster fields for the recommendation:

    - clusterName

    - namespace

    - workloadName

    - instanceName (node)

    - cloudServiceName (ECS)

- Renaming the CD connector resulted in creating two cluster entries in the billing data, but both belong to the same cluster. (CCM-9195)

  Now, while updating the connector name, the cluster name is also updated to fix this issue. However, it isn't recommended to update the connector name.

## September 29, 2022, version 76921​

### What's new

- First-class Support for Istio is released with version 1.0.8 of autostopping-controller.​ (CCM-8386)
  You can now onboard Istio virtualservices-based workloads to AutoStopping without editing the virtualservice manually​.

- Now, you can sort perspective filters while creating cost categories, perspectives, etc. You can search for a filter quickly and apply it easily.​ (CCM-8597)​​

### Early access​

NA

### Fixed issues

NA

## September 14, 2022, version 76708

### What's new

NA

### Early access

N/A

### Fixed issues

- A validation error occurred while entering the URL with space. (CCM-8832)
  To fix this issue, the URL is now truncated before validation.

## September 7th, 2022, version 76619

### Fixed issues

- Round off Anomaly Slack Alerts to 2 Decimal Places (CCM-8769)
- Refresh recommendation resources and instance details (CCM-8720)

## August 31st, 2022, version 76518

### Enhancements

- Azure Connector Validations (CCM-7650)

  As part of Azure Connector validations for Inventory and AutoStopping, we're now checking whether the service principal has the required roles for these features: Reader role for Inventory and Contributor role for AutoStopping. These checks will run whenever `Test Connector` APIs are hit for CeAzure connectors.

  See Set Up Cloud Cost Management for Azure.

### Fixed issues

- Getting exceptions while fetching filter values for GCP and AWS (CCM-8738, ZD-33142, ZD-33948)
  In the Perspective preview section, we are now checking both `ruleFilters` and `idFilters` to deduce whether it's a cluster perspective or not and based on querying the correct table (`clusterDataAggregated` or `unifiedTable`).
- API Docs were incorrect (CCM-8336, ZD-31845)
  Return the list of Recommendations API doc updated.

## August 25th, 2022, version 76425

### Fixed issues

- The Perspective recommendation filter is incorrect (CCM-8632)
  When you click on recommendations shown on the Perspective page, you will now see only the list of recommendations filtered for the Perspective that you are reviewing instead of listing the full list of recommendations unfiltered.

- Account name updates in AWS don't cascade to CCM DB (CCM-8598)
  We were not updating the account name in daily sync. Now updating account name in daily sync.

- Cluster Costs missing for since 5th August (CCM-8535, ZD-33355)
  Now, we are checking AWS Cluster data in `billing_table` for last 3 days and if data does not exist, we will run `INSTANCE_BILLING` batchJob. So, we are no longer dependent on AWS cluster data to run batchJob.

## August 18th, 2022, version 76321

### What's new

- Cluster Perspective - Total Cost, Table values UX improvement (CCM-7968, ZD-31764)

- Difficulty "Grouping By" Cost Category within Perspectives (CCM-7784)

  You can now search Cost Categories in your chart.

- List BI Dashboards API (CCM-7649)
  You can now query a new API to list all the BI Dashboards specific to CCM: Cloud Cost BI Dashboards.
  Example query:
  curl -i -X GET \
   'https://app.harness.io/gateway/ccm/api/bi-dashboards?accountIdentifier=H5W8ioxxxA2MXg' \
   -H 'x-api-key: pat.H5xxxA2MXg.6xxxmD'

Example response:
{
"status": "SUCCESS",
"data": [
{
"dashboardName": "AWS Cost Dashboard",
"dashboardId": "226",
"cloudProvider": "AWS",
"description": "Discover and track analytical insights into your AWS cloud costs",
"serviceType": "",
"redirectionURL": "#/account/H5W8ioxxxA2MXg/dashboards/folder/shared/view/226"
},
...
{
"dashboardName": "AWS RDS Inventory Cost Dashboard",
"dashboardId": "3309",
"cloudProvider": "AWS",
"description": "Overview of cloud spend across RDS instances, breakdown by accounts, regions, instance types etc.",
"serviceType": "AWS RDS",
"redirectionURL": "#/account/H5W8ioxxxA2MXg/dashboards/folder/shared/view/0000"
}
],
"metaData": null,
"correlationId": "bc71c537-048f-4d53-80cd-8462158e1471"
}

### Fixed issues

- Fix labels null value (CCM-8558)

  When we were sending label.key IN [""] -> Empty Array, BE is setting the empty array to null. Now to handle it, we have added a null check while converting conditions values to filter values.

- CCM Perspectives seem to be broken in new UI (CCM-8484, ZD-33142)

In the Perspective Preview section, we were not considering whether it’s a cluster perspective or not. Therefore, we always query unifiedtable. This issue has been resolved. Now, in Perspective Preview section, we are checking whether it’s a cluster perspective or not and based on that querying the correct table.

- Azure Existing connector validation is failing at test connection (CCM-8423)

Something was changed in the base image for Docker files. Azcopy utility needs access to create .azcopy folder to keep job plan log files. It was not able to do so. Fix is to give an explicit path for it in which it has access.

## August 8th, 2022, version 76128

### Fixed issues

- RDS Instance data in Dashboards don't reflect changes in InstanceClass (CCM-8411, ZD-32945, ZD-32995)

  The RDS inventory dashboards did not reflect the updated DBInstanceClass when RDS instance class was updated. Due to a bug in our RDS data-load CloudFunction, the DBInstanceClass column was not being updated in the awsRdsInventory table. The dashboards query this awsRdsInventory table, which is why the updated DBInstanceClass couldn't be seen in the dashboard. The issue has been resolved. The RDS Inventory dashboard now displays the updated instance-class as expected. Also, there was a discrepancy in data due to a bug in the join condition of our looker query. We have updated the join and the data looks correct now.

- Azure Connectors are failing (CCM-8298, ZD-32605, ZD-32612)
  We had a regression in the data pipeline. Fix is deployed.

## August 1, 2022, version 76030

### What's new

CCM Perspective Preferences.

When you create a CCM Perspective you can now set Preferences for Include Others and Unallocated Costs.

For details, go to Perspective Preferences in Create Cost Perspectives.

### Early access

N/A

### Enhancements

Perspective Preferences: Unallocated and Include Others cost support added (CCM-7436)

Now while creating a perspective, you will see a Preferences tab to select the preferences for a particular Perspective. And on the Perspective page, you can toggle the preferences options to see their cost in the Perspective chart section.

### Fixed issues

- CCM missing data for our production cluster (CCM-8214, ZD-32384)

  Usually, the node resource values from instanceType are displayed in the format custom-8-24576, but the format was different and looked like n2d-custom-8-220160-ext.

- Cost Category-based perspective does not showcase cost breakdown (CCM-8068)

  During Perspective save, Cost Category was not identified as a separate data source and the grid API call was failing. Added Cost Category in data sources if Cost Category rules are present in Perspective.

- Not including Others and Unallocated costs in perspectiveTimeSeriesStats (CCM-7973)

  You can include Others and Unallocated Cost for a Perspective Time Series Chart.

- CCM dashboards database errors (CCM-7791)

  Converting queries to Batch queries. Removing certain Alter statements as they are no longer required.

## July 18th, 2022, version 75921

### What's new

N/A

### Early access

N/A

### Enhancements

N/A

### Fixed issues

- AWS CCM Connector failing after previous successful connections (CCM-8143)

  A function was running out of memory because of a large volume of inventory data and could not execute fully. We have increased the memory for that function for now and the EC2 data is now being ingested.

- Some ECS clusters do not show Tasks/Services (CCM-8126)

  The instance type filters were incorrect when grouping by task/service. Fixed the instance type filter.

- Some Dashboards not working (CCM-8124, ZD-32035)

  Fixed the merge query in the load cloudfunction for AWS RDS.

- CCM GCP connector showing no error when testing connection (CCM-8076)

  Make use of gcpConnectorInfo table for non-US regions and correct the error messages for framework to render them.

- Azure perspective GCP Anomalies (CCM-7882)
  Azure perspective rules were not imposed on anomaly APIs. Added Azure rule enforcements.

## July 11th, 2002, version 75829

### What's new

- Resource name display enhancement (CCM-8079)

  Resource names were truncating values in a column. Resources names are now shown in full if possible.

- ECS recommendations enhancement (CCM-8009)

  We were showing $0.00 recommendation savings for ECS. Now only recommendations with minimum savings amount > $1 are shown on the list page.

  For more information, refer to Optimize AWS ECS Costs with Recommendations.

- Perspectives CSV download improvement (CCM-7908)

  Perspectives CSV was downloading 2 times on first download.

  For more information, refer to Create Cost Perspectives.

- More descriptive browser tab titles were added (CCM-7869)

- Slack notifications for Budgets (CCM-7816)
  You can now set the notification channel to Slack and add multiple webhook URLs when creating a budget.
  For more information, refer to Create a Budget.

### Early access

n/a

### Fixed issues

- Changed the APIs related to Recommendations and Anomaly recently as part of adding Filter Panels (CCM-7999, ZD-31845)

  In the updated API, the filterType field is required. Without this field, an "Unable to process JSON" response error appears.

- CCM AWS Connector failing connection (CCM-7964)
  Added the following ways for dealing with large volumes of customer billing data: optimized data sync configuration, increased sync timeout minutes, and handled truncated response from AWS API.

- Add-hoc Perspective Filters not accepting values (CCM-7941, ZD-31977)

  Users can now filter perspectives AWS account by accountName.
