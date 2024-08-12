---
title: Cloud Cost Management release notes
sidebar_label: Cloud Cost Management
date: 2024-06-06T10:00
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/cloud-cost-management/rss.xml" />

Review the notes below for details about recent changes to Harness Cloud Cost Management. For release notes for Harness Self-Managed Enterprise Edition, go to [Self-Managed Enterprise Edition release notes](/release-notes/self-managed-enterprise-edition). Additionally, Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.

:::info

Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features and fixes that these release notes describe may not be immediately available in your cluster. To identify the cluster that hosts your account, go to the **Account Overview** page.

:::

## July 2024

### Version 1.23.0

#### New features and enhancements
- Policy YAML Validation Enhancement in Asset Governance: Previously, we were not enabling the Dry Run and Run Once buttons if there were issues with policy YAML validation. This should now be resolved, allowing users to proceed with these actions even if there are validation issues. [CCM-18754]

- Regions Filter for Recommendations Page: We have added a Regions filter in the Recommendations Filter Panel on the Recommendations Page, enhancing the ability to filter recommendations by specific regions. [CCM-18591]

- Load Balancer Pagination Fixes: Some improvements have been made to the load balancer pagination:
      - The page index on the URL now matches the page in the list.
      - The first column is now wider based on the available space.
      - The last activity column now reads the updated_at value instead of calling a separate API. [CCM-18585]
  
#### Fixed issues

- Governance Evaluations List Page Pagination: Previously, on the Governance Evaluations List page, the page number was not resetting when changing the time filter, causing the current page to match the filters incorrectly and resulting in no results. This issue has now been resolved. [CCM-18571]

## June 2024

### Version 1.23.0

#### New features and enhancements
- Asset Governance Recommendations page enhancements: Previously, Governance Recommendations were grouped by Account and Region for AWS, Subscription and Region for Azure and Project for GCP. Now, each Account-Region pair, Subscription-Region pair and Project will have individual recommendations listed in the Recommendations Overview page. This would allow users to create individual Jira/ServiceNow tickets per pair and "Recommended Action" now shows the rule name that is recommended.

- Memory Metrics Tooltip for EC2 Recommendations: Added a tooltip to EC2 recommendations to give more information on memory metrics. This tooltip provides documentation on what users need to do to enable memory metrics, ensuring they understand how to gather necessary data for accurate recommendations, especially for memory-optimized instance families.

- Disabled Enforcements for Accounts without a Valid CCM License: We have disable Enforcements related to accounts that do not have a valid CCM license.

#### Early access features
- Early access to Commitment Orchestrator for RDS: We have introduced Commitment Orchestrator for RDS with support for Standard RI. Being in the very early stages, it is only available on request. If you would like to test it out, kindly reach out to [Harness support](mailto:support@harness.io)

### Version 1.22.0

#### New features and enhancements
- **Azure Data Sync Frequency Update:** The Azure data sync frequency has been changed from 1 day to 1 hour. This enhancement will allow data to flow faster for Azure customers, reducing wait times and improving data availability [CCM-18014]

### Version 1.21.0

#### New features and enhancements

- **Savings by Harness Integration Enhancement**: Last release we added "Savings by Harness" integration on Commitment Orchestrator. This release, we have added a minor enhancement with a loading state for savings and utilization widgets. [CCM-18212]

- **Azure VM Inventory Duplicate Entries Enhancement**: Duplicate entries within AzureVMInventory will now be handled better after this fix, ensuring appropriate data is displayed on the dashboards. [CCM-17313]

- **Autostopping Rule Search by VM ID**: Previously, users could not search their rule by VM ID. Now, users will be able to search their rule in the rule list using the ID of any VM managed by the rule. [CCM-16437]

### Version 1.20.3

#### New features and enhancements
- "Savings by Harness" Integration on Commitment Orchestrator : Added a new feature to display savings by Harness on the Commitment Orchestrator Overview page, providing users with detailed insights into savings achieved by using Harness Commitment Orchestrator. [CCM-17919]

## May 2024
### Version 1.19.1

#### New features and enhancements

- Asset Governance for AWS : Added new governance recommendations and cost computation support for AWS resources including `cache-cluster`, `S3`,`Redshift`, and `Redshift-snapshot`. [CCM-17852]
- Asset Governance for GCP : Added new governance recommendations and cost computation support for GCP resources including `redis`, `gke-cluster`, `bq-dataset`, `function`, `bucket`, `dataflow-job`, `loadbalancer-address`, `cloud-run-service` and also, added cost computation for `gcp.loadbalancer-forwarding-rule`. [CCM-17852]
- Editing Enforcements: Improved the enforcement editing process. Now, when viewing and editing an enforcement, it will no longer get enabled automatically if it was previously disabled. This ensures that the enforcement status remains consistent unless intentionally changed by the user. [CCM-18050]
- Email Validation Enhancement: We've introduced better validation for email addresses in the recipients list for perspectives report. This enhancement ensures that only correctly formatted email addresses are accepted in the recipients list, enhancing data integrity and security. [CCM-17850, ZD-63324]
- Azure Governance Subscription selection: In the Azure Rule window's Subscription drop-down menu, previously, only the Subscription ID was displayed. Now, both the Subscription Name and ID are shown for better clarity and ease of selection. [CCM-17650]
- Node New K8s Labelling: We have added support for the new K8s labels starting from K8s v1.17 for Instance Type, Operating System, Region, and Zone respectively. We use these labels to get the public pricing data for a given cloud provider. [CCM-17979]

| Old Label | New Label |
|------------|--------------|
| beta.kubernetes.io/instance-type | node.kubernetes.io/instance-type |
| beta.kubernetes.io/os | kubernetes.io/os |
| failure-domain.beta.kubernetes.io/region | topology.kubernetes.io/region |
| failure-domain.beta.kubernetes.io/zone | topology.kubernetes.io/zone |


#### Fixed issues
- Azure perspectives Previously, only fields in "group by" with available data were displayed in Azure perspectives, leading to incomplete views and unnecessary errors. With this update, all relevant fields, including those without data, will now be visible. This eliminates any unnecessary errors arising from missing data at the source level. [CCM-17573, ZD-62691]

### Version 1.18.1

#### New features and enhancements

- Governance JSON Viewer UI Improvement: We have moved the Copy button in the Governance's JSON viewer beside the Filter button for better accessibility and user experience. [CCM-17651]
- Cost Correlation Refresh Button: Expanded the functionality of the refresh button to include multi-policy evaluations, allowing users to update and refresh data related to savings for multi-policy evaluations. [CCM-17648]
- Time Filter Options for Recommendations: We have introduced UI changes to support time filter options for the last 60 days and 90 days in recommendations. This enhancement provides users with greater flexibility in analyzing recommendations over specific time periods. [CCM-17725]

#### Fixed issues

- Edit Flow for TCP-Based Autostopping Rule: Fixed the issue where users were unable to edit the auto-stopping proxy from the dropdown and proceed with the flow. Users can now see the preselected value of the proxy and complete the process as expected.
- Azure Data Fix: Resolved an issue where adding a perspective rule with Azure subscription ID set to null resulted in no data being displayed. [CCM-17414]
- Auto Stopping Page Filter: Added a fix for a minor issue where using filters on the auto-stopping page resulted in an unknown error. [CCM-16195]

### Version 1.17.0

#### New features and enhancements

- Commitment Active Actions Details Enhancements:
  - Added formatting to the expiry date for improved readability.
  - Aligned savings summary chart colors with graph colors for improved visual coherence.
  - Added option to expand details about a recommendation by clicking on it. This enhancement allows users to gain deeper insights into their recommendations. After clicking on it, users can view both the potential savings after applying the recommendation and the potential spend without applying the recommendation. Additionally, users can access details about the source Reserved Instance (RI).[CCM-17844, CCM-17474]

- Cloud Perspective Recommendation Display: Recommendations alongwith their total potential savings is now be displayed on the cloud perspective, providing users with actionable insights directly within their Perspectives overview page. [CCM-17639]

- Enhanced JSON Viewer: The same JSON Viewer used in the Evaluation details page has been added to the Governance Recommendation details page, providing users with consistent and user-friendly access to the output data with all the available filters. [CCM-17436]

#### Fixed issues

- Updated Messaging in Commitment Orchestrator: In Commitment Orchestrator, we have improved the UI by adding appropriate messaging about recent actions once they are completed, and for actions that do not require user intervention, ensuring clarity and accuracy in the displayed information. [CCM-17655]

### Version 1.16.0

#### New features and enhancements

- Expanded Azure Region Options: We have introduced a new `allregions` option in Azure regions, allowing users to execute any Rule or establish an Enforcement across all regions with just one Evaluation for a Subscription. This boosts efficiency and helps prevent exceeding Azure API limits when executing a Rule for a Subscription across multiple regions. Instead of running on multiple regions it will now run only on one single region i.e `allregions`. [CCM-17185, CCM-16771]

- Anomaly Drilldown Support: We have introduced support for Anomaly drilldown, allowing users to precisely view anomalies on the Anomaly List Page that were visible on the Perspective Details Page. [CCM-17137]

- Perspective List Page Enhancement: We have added a minor change on the Perspective List Page of removing the total cost and changing the default view to list format. [CCM-17380]

#### Fixed issues

- Label Adjustment for Clarity: We have added a minor change to update label from "Active Rules" to "Total Rules" for enhanced clarity and accuracy in Autostopping UI. [CCM-16450]

- SMP Overview Screen Total Cost: We have updated the query used to retrieve active spend on the overview page for SMP to ensure accurate data representation. This fix ensures alignment between the total cost displayed on the SMP Overview Screen and the data presented in perspectives. [CCM-17380]

- Perspective Dashboard Optimization: As part of this fix, we have disabled redundant parentheses from BigQuery SQL query to optimize the perspective and cost category queries, enhancing query efficiency and performance.
  
### Version 1.14.3

#### New features and enhancements

- RBAC Support for Active Recommendations: To enhance security and control over active recommendations, we have implemented Role-Based Access Control (RBAC) support. With this update, only admin users with edit access or commitments can approve or reject recommendations. This feature ensures that sensitive actions related to active recommendations are limited to authorized users to improve overall security. [CCM-17337]

- Introduction of Anomaly Workflows: We have added Anomaly Workflows to enhance anomaly management within the CCM platform. With this feature, when a user marks an anomaly as a False Anomaly, it will be automatically moved to the Ignore list within the Anomaly Settings drawer. Furthermore, users now have the option to undo this action directly from the Anomaly Settings drawer, providing greater flexibility and control over anomaly management processes. [CCM-17311]
  
- Multi-Select Cloud Providers Filter: We have enhanced the Recommendations and Governance Evaluations filter panel by adding a multi-select Cloud Providers filter. This addition allows users to select multiple cloud providers simultaneously, providing more flexibility with governance evaluations. [CCM-17150]

- Child Account Exclusion in Commitment Orchestrator: With this functionality, users can selectively exclude child accounts from commitment utilization calculations, allowing for more precise management of Reserved Instances (RIs) and Savings Plans (SPs) across their organisation. [CCM-17184]

- Audit Trail Integration for changes in Commitments: Commitment orchestration flow changes like change of coverage or split between SP & RI and commitment actions approval or rejection is now captured in audit trails. [CCM-17267]

#### Fixed issues

- Governance Rules List Pagination: We have added a minor fix on the Governance Rules List page where the page number now resets properly when applying either the cloud provider or rule type filter. [CCM-17279]

- Granularity Adjustment for Cluster Data Retrieval: With this fix, we have ensured that data retrieval aligns with the specified granularity settings: fetching from the daily data table for DAILY granularity and from the hourly table for HOURLY granularity. [CCM-16061]

## April 2024

### Version 1.13.0

#### Fixed issues
- Improved Governance Enforcement: We have added a minor fix for governance enforcement when recommendations contain multiple accounts or subscriptions so that the enforcement is created efficiently. [CCM-17192]
  
- Improved Precision in Perspective Reports: Previously, when choosing the current month during perspective setup, the report would present data from the past 7 days. We have promptly added a fix so that it accurately portrays data for the entire current month. [CCM-17100]

### Version 1.12.0

#### New features and enhancements
- Native User Approval in Commitment Orchestrator: We have implemented native user approval in Commitment Orchestrator. With this new feature, users can approve the recommendations generated by the orchestrator. This feature enhances the functionality of the orchestrator by enabling user actions such as approval or rejection of recommendations generated by the engine. Read more about it [here](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/commitment-orchestrator/overview/#native-user-approval). [CCM-16648]

- Pagination for Budgets: We have added pagination for our Budgets page. This allows users to navigate through multiple pages of budget entries, improving the overall user experience by making it easier to manage and access information efficiently. [CCM-16978]

- Asset Governance Overview Page Revamp: We have changed our Overview screen for Asset governance and introduced new UI enhancements such as:
  - Widget for All-time Evaluations
  - Widget for Savings in Timeframe
  - Widget for Evaluations in Timeframe
  - Widget for Evaluations trend (per day)
  - Resource count in recommendations
  - Cloud filters

#### Fixed issues
- Commitment Orchestrator UI Column Overlap: We have added a minor fix to address the issue of overlapping columns in Commitment Orchestrator overview page. [CCM-16971]

- Resolved Cluster Data Visibility Issue: We resolved a problem regarding inaccurate cost tracking within the specified date range due to a recent change in the primary node's TimescaleDB timeout configuration, which led to failures in the utilization data query. By rerouting read queries to a secondary node, we fixed the query performance issue. [CCM-17048]

### Version 1.11.3

#### New features and enhancements

- Updates in Output Terminal in Asset Governance:
    - Filter: We've added a new feature for filtering the JSON in Evaluations. Users can filter based on the keys of the output and use comparison operators like `==`, `<`, `>`, etc. for comparison against numeric fields and use the `LIKE` operator for comparison against alphabetic fields. 
    - Sort: Users can also sort the output based on a specific key in ascending or descending order. For showing outputs with only one particular key, they can use the `pick` option.
    - Search: Searching in the output terminal in Asset Governance is now available. Users can search for any piece of text in their output. [CCM-16309]

- JSON and CSV Zip Download for Multi Policy Evaluations: For multi-policy evaluations, users can now download them in zip files. Each policy would have a sub-directory inside the zipped directory. Also, we have added two new options to include log files and filters applied (to the original JSON) in the downloaded folder. [CCM-16774]

- Refresh Cost Impact for Evaluations: We've added a new option to "refresh" the cost impact for a particular evaluation for only supported resources. With this option, users can choose to refresh the cost impact to see updated savings. Please note, it can take up to 30 minutes to show the updated results. [CCM-16807]

- Pagination and Ignore Recommendations in Governance Overview Page: Users can now view 5 recommendations per page on the overview screen of Asset Governance. We now also show ignored recommendations in the list with the option to remove them from the `ignored list` in the overview page itself. [CCM-16824]


#### Early access features

- Introduction of `CloudAccountId` and VM `ResourceId` in `ClusterData` Table: This feature is a beta release behind a feature flag. We are introducing `cloudAccountId` and VM `resourceId` in the `clusterData` table. This addition enhances the capabilities of the system, providing more comprehensive data for analysis and management purposes. Please note that this feature is currently in early access and may undergo further improvements based on user feedback. [CCM-15506]
  
#### Fixed issues

- Enhanced Discount Calculation in Cloud Cost Management: To improve the accuracy of discount calculations, we've updated our data utilization strategy. Previously, discounts were calculated based on the `lineitemtype` column, leading to potential inaccuracies under specific filter scenarios. Now, we've integrated the use of `edpdiscount`, `bundleddiscount`, and `privaterateddiscount` columns from the Cost and Usage Report (CUR), ensuring discounts are accurately calculated at the service level. [CCM-20458]

- Enhanced Rendering of Timeseries Data for Shared Bucket Cost: Previously, when viewing shared bucket costs using the shared bucket filter, the timeseries data was not rendered correctly. We have implemented a fix to address this issue, ensuring that the timeseries data is now properly displayed. [CCM-16876]

- Improved Cluster Cost Calculation for Grouping by Cluster Cost Category: Previously, when grouping by cluster cost category, `Others` costs were calculated from pod cost, resulting in costs being displayed even if they were 0. To address this, we have enhanced the calculation process to derive costs from node cost instead of pod cost depending on the group by selected. This ensures accurate cost representation, eliminating discrepancies in cases where costs should be zero. [CCM-17050]

## March 2024

### Version 1.10.2

#### New features and enhancements

- Perspectives update: Added a new query parameter called `updateTotalCost` in the create and update perspective call. When set to false, the total cost that is displayed on the list perspective page will not be calculated. Instead,  only create/update operation for the perspective will be performed.[CCM-16724]
- New limits for cost categories: Per account, there can be up to 25 cost categories, 1000 cost buckets, and 10 shared buckets. Additionally, nested cost category hierarchy can extend up to 5 levels per cost category. [CCM-13843]

#### Fixed issues

- Fixed intermittent issues which resulted in failure in S3 data sync and data ingestion for seamless and on-time updating of data. [CCM-14988]

### Version 1.9.5

#### Fixed issues

- Previously the exported CSV was not reflecting the Perspective Preferences set by the user. Now it has been fixed and the rows of Perspective Grid and exported CSV should match. [CCM-16586]

## February 2024

### Version 1.8.1

#### Fixed issues

- We added a default value (CURRENT_MONTH) for the overviewTimeFilter parameter in the Overview Forecasting API, ensuring consistency and simplifying usage. [CCM-16458]
- We identified and resolved a high memory and CPU utilization issue in our delegate pods, traced back to improper handling of Chronicle libraries. The fix involved ensuring the StoreTailer objects are closed after each use, significantly improving system performance and stability. [CCM-16052]

### Version 1.7.3

#### New features and enhancements

- We have seamlessly integrated Azure preferences into the Account Settings. Users can conveniently configure your preferences there, and once the Azure preferences feature is launched, they will be applied across all Azure perspectives for enhanced customization and consistency. [ccm-15789]

#### Fixed issues

- In the Perspective UI, readability was previously compromised as the total cluster cost information overlapped behind the tile. With the latest update on the perspective details page, formatted cost will now be clearly visible, and users can access the full value through tooltips for enhanced clarity and usability. [CCM-16413]

### Version 1.6.5

#### New features and enhancements

- In the Azure connector flow, a new field named "billing type" has been incorporated to identify users' billing types. This enhancement sets the groundwork for enabling Azure cost preferences in future updates. [CCM-15978]
- We've implemented the edit flow for commitment orchestration, granting users the ability to modify their commitment orchestration details seamlessly. [CCM-11304]

#### Fixed issues

- The Filter API is paginated; however, the UI filter component lacked pagination support. To address this, we have implemented a result limit of 1000. Now users will be able to see all the saved filters in the recommendation filters. [CCM-16364]
- Previously, users faced limitations when attempting to adjust constituents within budget groups, hindering adaptability to organizational changes. Now, Budget group edit flow will not block the budgets or budget groups selected in that budget group eliminating constraints and enhancing flexibility. [CCM-16196]
- After upgrading to SMP version 0.120, users encountered issues with BI Dashboards loading, prompting them to add connectors despite existing connectors at the account level. In response, for SMP Environment, we've implemented redirects to the Dashboards module to facilitate viewing BI Dashboards seamlessly. [CCM-15995]

## January 2024

### Version 1.5.1

#### Fixed issues

- Previously, it was a bit difficult editing cost categories, especially on smaller monitors or when the web browser isn't maximized. To address this, we've implemented a fix in the layout of rules specifically for smaller windows. With this adjustment, users can now seamlessly edit cost categories even on smaller screens, ensuring a smoother experience across different viewing contexts. [CCM-15991]
- Upon clicking back from the shared cost screen, users encountered a non-functional continue button due to form validation issues. We have resolved this impediment from the UI side, ensuring users can proceed seamlessly without hindrance. [CCM-15990]

### Version 1.4.2

#### Fixed issues

- In Commitment Orchestrator, the exclusion of resource instances was found confusing sometimes, necessitating a clearer flow. We've made enhancements to the commitment orchestration setup flow. [CCM-15844]

### Version 1.3.0

#### Fixed issues

- While filtering for a GCP anomaly and clicking on the Anomaly link in perspectives redirected users to the Azure-based anomaly screen. To rectify this, we've implemented a solution to ensure that only relevant anomalies are displayed by adding an "EQUAL" case in the switch condition with the appropriate condition format for equal cases. [CCM-15649]

### Version 1.2.1

#### Fixed issues

- Users without edit permissions for perspectives were still able to see the "+ New Perspective" button, which was not grayed out, leading to confusion. Now, if users lack edit access on perspectives or folders, the "+ New Perspective" button will be disabled, preventing confusion. Furthermore, error messages have been refined to provide clearer feedback. [CCM-15611]
- When creating or updating a perspective with an "invalid" cost category. If a cost category shares the exact same name as the attribute "shared cost," attempting to include it in a perspective results in a failure message: "Oops, something went wrong on our end. Please contact Harness Support." We have improved the error message with details telling that the cost category name cannot be same as shared cost bucket name. [CCM-15536]
- Horizontal scrolling was absent from all pages except perspective-details. This has now been successfully addressed and resolved. [CCM-14720]

## Previous releases

<details>
<summary>2023 releases</summary>

#### December 2023

##### Version 81801

###### Fixed issues

- Previously, clicking on "Log Section" in the Review Screen redirected users to Compute Coverage instead of defaulting to the Events Logs Section as intended. Now, from the review section of commitment orchestration, the link for the log section correctly directs users to the Events Logs Section. This issue has been successfully resolved. [CCM-15189]
- Sometimes, changing filters in the default Perspective interface would reset the page but fail to display the table initially. This issue has now been resolved, with the table consistently appearing after filter and groupby adjustments. [CCM-14990]

#### November 2023

##### Version 81700

###### New features and enhancements

- Pagination for perspectives has been added for faster loading times of perspectives. By default only 20 perspectives will be shown. To see all the perspectives set the pageSize as 10,000 and pageNo as 0. By default all perspectives are ordered by most recent. (CCM-15124)

##### Version 81601

###### New features and enhancements

- RBAC (Role-Based Access Control) support has been implemented for the Commitment Orchestrator. CCM Admins now possess the authority to configure the Commitment Orchestrator for master accounts. On the other hand, CCM Viewers are granted access to visibility screens within the Commitment Orchestrator interface. (CCM-15040)
- Earlier, we didn't support adding relevant rule filters for perspectives created through cloud providers. As a result, all anomalies were being displayed on the cloud providers' perspective, regardless of whether they were relevant to that perspective or not. In this release, we have now added rule filters for cloud providers to address this issue. (CCM-15068)

###### Fixed issues

- Previously, entering connector names resulted in incorrect error message "Delegate with that name already exists." This hindered the quick connection setup. Now, the system accurately reflects the correct error message for when Delegate validation failures. (CCM-14963)

##### Version 81501

###### New features and enhancements

- The perspectives page has been enhanced with pagination for both the Card and List views. Each page will display a maximum of 20 perspectives, addressing the issue where some customers experienced lag during the initial rendering of the perspectives list pages. (CCM-14018)

###### Fixed issues

- In the updated functionality for K8s connectors, the "View Costs" feature is now enabled based on the presence of cluster data rather than relying solely on the last events received. This enhancement ensures that users retain the ability to view historical costs. (CCM-14984)

##### Version 81402

###### New features and enhancements

- Previously, there was no option to export Recommendations as CSV files. Now, we have added a new feature that enables users to export Recommendations as comma-separated values (CSV) files. (CCM-14274)

###### Fixed issues

- Previously, changing the project in JIRA didn't clear fields, causing potential creation failures. (CCM-14842)

However, now, the form (except Ticket Summary and Description) resets on project change, ensuring a smoother process.

- Previously, anomaly detection on K8s Services lacked a threshold, leading to excessive alerts. (CCM-14865)

Now, we have implemented a threshold of $3 for anomaly detection on K8s Services to refine the alerting process.

- Previously, incorrect entity types for Azure in anomalies caused misdirected notifications on Slack and email. (CCM-14864)

However, this issue is fixed now by changing the logic for Azure entity types.

#### October 26, 2023, version 81300

##### Fixed issues

- Previously, the search functionality in the perspective grid was nonfunctional when grouped by cost categories, causing inconvenience in data retrieval. (CCM-14384)

  This issue is fixed now, enabling users to efficiently search within the perspective grid, even when cost categories are applied as grouping criteria.

- Previously, Anomaly alert logic for default perspectives was not functioning correctly. (CCM-14670)

  This issue has been resolved, ensuring accurate anomaly notifications for default perspectives via Slack and email.

- Previously, the Budget explorer chart displayed lower costs due to a query issue. (CCM-14758)

  This issue is fixed by removing the "group by" from the budget time-series query, ensuring more accurate cost representation.

#### October 20, 2023, version 81202

##### Fixed issues

- Previously while creating and AutoStopping rule, the k8s cluster selection list only displayed top 100 records, which made it difficult to choose a cluster when the list had more than 100 entries. (CCM-14644)

  This is fixed by increasing the limit from 100 to 500 records. This will assist in retrieving every cluster that is accessible for selection.

- Previously, in autostopping rule creation flow for Azure cloud provider, there's an option to create one AutoStopping rule using AppGateway belonging to one subscription and VMs which restricted the selection of VMs belonging to another subscription. (CCM-14515)

  This is fixed by adding support for selecting multiple connectors, one for the AutoStopping rule and other for the VMs. This helps in having independent connectors for each subscription.

- To avoid any confusion, tooltips are added for Potential Monthly Cost and Potential Monthly Savings on EC2 Recommendation details page. (CCM-14613)

- A bug was identified during ingestion of AWS CUR data. The impact of the bug was causing AWS cost data from the current month to be dropped while ingesting AWS-CUR updates for the previous month. Since AWS updates CUR of previous months until the first few days of next month, this issue was hit in the initial days of the month.
  This bug got introduced recently while supporting ingestion of future-dated entries in any billing-period (i.e. supporting ingestion of costs which have usageDates beyond the current month). (CCM-14618)

  This is now fixed by considering billingperiodstartdate and billingperiodenddate during ingestion from AWS CUR.

- It was observed that the budget's cost was not matching with the costs in the underlying perspective, resulting in showing lesser cost in the budget explorer chart. (CCM-14758)

  This issue is fixed by making some changes in the underlying budget cost explorer query.

#### October 12, 2023, version 81100

##### Fixed issues

- Previously, attempting to edit a cost bucket with operands selected as "NOT NULL/NULL" led to an unexpected error, subsequently hindering the editing of other buckets. (CCM-14519)

  This issue has been fixed by introducing a custom validation to resolve the error.

- Previously, our application allowed fetching anomalies for perspectives created through labels. The queries used for fetching anomalies in these cases were based on the default groupBy field, leading to the display of numerous incorrect anomalies in the labeled perspective, which were unrelated to the labeled resources. (CCM-14242)

  As of this release, we have discontinued support for fetching anomalies in perspectives created solely through labels. This change is aimed at improving the accuracy of anomaly reporting and ensuring that only relevant anomalies are presented.

#### October 5, 2023, version 81000

##### Fixed issues

- Previously, For EC2 Recommendations, the monthly savings from crossFamilyRecommendation or sameFamilyRecommendation fields, based on the selected preferences, were used to display the savings amount in the widget. However, for Terminate Recommendations, as these values were not available, it resulted in showing $0 in the widget. (CCM-14544)

This is fixed by switching to totalMonthlyCost and totalMonthlySavings for the potential savings widget in EC2 Terminate Recommendations.

#### September 27, 2023, version 80904

##### New features and enhancements

- Previously, CCM displayed only the essential Jira or ServiceNow fields in Recommendation Workflows. However, with this enhancement, CCM introduces a new field _+ Fields_ that allows users to add optional fields as needed.

<DocImage path={require('./static/ccm-jira-ticket-enhancement.png')} width="40%" height="40%" title="Click to view full size image" />

##### Fixed issues

- Previously, CCM used to display all anomalies, including the new ones that were labeled as "N/A." (CCM-14275)

  However, now, anomalies will not be shown on the UI for newer entities. Newer entities are those having data for a duration of 15 days or less.

- In the AWS perspective, the cost calculation is based on the selected `Groupby` field, and CCM uses the SUM of `awsUnblendedCost`. However, when CCM detects anomalies for AWS, it is based on the SUM of `awsBlendedCost`. This led to a cost mismatch between what's displayed on the AWS perspective and the cost reported for anomalies.(CCM-14096)

  This issue is fixed by using SUM of `awsUnblendedCost` to detect AWS (Account, Service and UsageType) anomalies.

#### September 20, 2023, version 80804

##### Fixed issues

- Previously, on the AutoStopping details page, the dry-run flag did not invoke the savings API when turned on. (CCM-14232)

  This issue has been fixed. Now, the cost savings are correctly displayed in the dry-run mode.

#### September 7, 2023, version 80702

##### New features and enhancements

- Cost category enhancement (CCM-12879)

Implemented a new feature that enables users to copy cost buckets from one cost category to multiple cost categories simultaneously. You have the flexibility to choose any number of buckets for copying. Upon selection, a popup prompt appears, allowing you to specify the target cost categories for copying the selected buckets. Upon successful completion, you receive a success notification along with relevant details.

However, it's important to note that while copying you may encounter issues if the destination cost category already has a bucket with the same name as the copied one. In such cases, you can address the conflict by renaming the bucket before attempting the copy operation again.

<DocImage path={require('./static/ccm-copy-cost-buckets.gif')} width="60%" height="60%" title="Click to view full size image" />


##### Fixed issues

- An issue with the budget group warning message (CCM-14150)

  Previously, there was a discrepancy between the dates displayed in the warning message and those in the budget table column. This issue has been fixed now, and the dates are consistent on both the table and the warning message.

  <DocImage path={require('./static/ccm-budget-group-warning-msg.png')} width="60%" height="60%" title="Click to view full size image" />

- Previously, users were unable to schedule the same AutoStopping rule for the same time in different time zones, such as setting the rule to run at 8 PM - 9 PM IST and 8 PM - 9 PM EDT, which was considered an overlap. (CCM-14181)

  This issue has been resolved. Added validation to check for time zones to allow multiple schedules for a single rule.

- Multiple `OverlappingFileLockException` errors were occurring due to the Chronicle Queue library version used. Consequently, this issue led to Perspectives not displaying any data. (CCM-14174)

  The issue is resolved now. The Chronicle Queue library has been upgraded to a newer version, resolving the errors.

#### September 04, 2023, version 80606

##### New features and enhancements

- Display refunds or discounts on the graph within perspectives. (CCM-13443)

  Previously, our graph in perspectives didn't display refunds or discounts, resulting in empty spots when values were negative. This enhancement improves this by aggregating negative values into a red-colored bar chart. You can now toggle a button in **General Preferences** to view these previously hidden negative costs.

  <DocImage path={require('./static/aws-preferences-ccm13443.png')} width="60%" height="60%" title="Click to view full size image" />

##### Fixed issues

- After editing an existing cost category, previously, when attempting to create a new one, the drawer displayed the details for the last accessed cost category. (CCM-13973)

  This issue is fixed. The new cost category builder drawer now opens in the expected empty state, and the edit drawer will correctly display the details of the selected cost category. Even after editing a cost category, if you open the new cost category drawer, it correctly shows the empty state as intended.

- Previously, users were unable to select **This Quarter** in the **Overview** time range filter. Instead, the application defaulted to **This Month** upon selection. (CCM-13505)

  This issue has been fixed.

- An issue with onboarding an existing AutoStopping rule on Azure App Gateway version 1 (CCM-13903)

  This issue is resolved. Now the health check configurations of the AutoStopping rule are being used to detect the current backend settings associated with the rule.

- The screen went blank when deleting all characters in the AutoStopping Rule Name field while editing the rule. (CCM-13816)

  This issue has been resolved.

#### August 23, 2023, version 80500

##### New features and enhancements

- ServiceNow integration with Recommendations (CCM-11150)

  Introducing ServiceNow as a ticketing tool to create tickets for recommendations. You can use either Jira or ServiceNow as your ticketing tool. You need to configure this setting at the account level on the **Default Settings** page. For more information, go to [View and apply recommendations](/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/home-recommendations).

- AWS perspectives enhancement (CCM-13914)

  Introducing support for the following additional `Group By` options in AWS perspectives:

  - Billing entity
  - Line item type

  For more information, go to [Analyze AWS costs by using perspectives](/docs/cloud-cost-management/use-ccm-cost-reporting/root-cost-analysis/analyze-cost-for-aws).

##### Fixed issues

- Previously, within the budget **Edit** flow, the monthly breakdown values would reset to default values. However, currently, the resetting occurs only when there's a change in the **Budget Type**. (CCM-13763)

- Previously for ALB proxy HTTP route configuration, when it comes to redirect actions, only redirect URLs were supported. However, now, users have the flexibility to include either a redirect URL or specify a target port and protocol. (CCM-13702)

#### August 02, 2023, version 80301

##### What's new

- AWS AutoStopping proxy enhancement (CCM-13497)

  You can now select the subnet ID from the dropdown list for AWS AutoStopping proxy creation.

  <DocImage path={require('./static/ccm-subnet-proxy.png')} width="60%" height="60%" title="Click to view full size image" />

- **Perspective Preferences** enhancement (CCM-11145)

  Perspective preferences provide you the flexibility to control which cost factors are considered in your billing and CUR (Cost and Usage Report) reports within your perspective. You can now include cost factors such as discounts, taxes, and refunds. For more information, go to [Perspective Preferences](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/perspective-preferences).

:::info
The current configurations for **Show others** and **Show unallocated cost in clusters** are preserved. This means that though the default settings have these preferences set to false, any _existing perspective_ with these preferences set to true will retain their current state and not be overridden.
:::

- Improved UI handling during the AutoStopping rule creation process (CCM-13527)

  The page on which users select either a load balancer or an AutoStopping Proxy has been enhanced to include an additional API that retrieves information about proxies created previously in shared VPCs. Now users can use a proxy created in a shared VPC across projects and connectors.

- **Overview** page enhancements (CCM-13326)

  - The pie chart now shows a hover state.
  - The forecast trend in the widget is removed.
  - Added forecast time period in the forecast cost widget.
  - Changed the heading of the cloud cost widget from `Top AWS accounts` to `Top 10 AWS accounts`.

    <DocImage path={require('./static/ccm-overview-1.png')} width="60%" height="60%" title="Click to view full size image" />
    <DocImage path={require('./static/ccm-overview-2.png')} width="60%" height="60%" title="Click to view full size image" />
    <DocImage path={require('./static/ccm-overview-3.png')} width="60%" height="60%" title="Click to view full size image" />

##### Fixed issues

- Previously, configuring both the redirect URL and target port for redirection while creating a redirect-based AutoStopping rule led to an error. (CCM-13475)

  This issue has been resolved by modifying the validation process. Now, if the redirect URL is defined, the validation process checks whether the target port is greater than 0. Specifying both redirect URL and target port is not allowed as it is an invalid configuration. However, for ALBs, only redirect URLs are allowed.

- Users were unable to validate their YAML files when creating a Kubernetes AutoStopping rule. (CCM-13459)

  This issue has been resolved. Users will now be able to validate the YAML successfully.

- Previously, users experienced performance delays while editing cost categories with more than 50 buckets, and every subsequent action took several seconds to trigger. (CCM-13205)

  The issue has been resolved, and the overall user experience has been enhanced by streamlining the process of managing cost categories even with a large number of buckets.

#### July 13, 2023, version 80102

##### What's new

Recommendations page UI enhancement (CCM-12693)

The **Include** dropdown on the **Recommendations** page has been removed. Instead, the following toggle options have been added in the Filter panel as shown in the screenshots below:

- Show Recommendations on Parent resource
- Show Recommendations on Child resource
- Show Recommendations on resources added to the IgnoreList

By default, the first two options are enabled, and you can modify the toggles to customize the list filtering.

&nbsp <DocImage path={require('./static/ccm-toggle-options-recommendations-filter.png')} width="40%" height="40%" title="Click to view full size image" />

<DocImage path={require('./static/ccm-tooltip-recommendations.png')} width="60%" height="60%" title="Click to view full size image" />

##### Fixed issues

- The message displayed on the UI was incorrect when there were no recommendations for the account. (CCM-13250)

  This issue is fixed now.

  <DocImage path={require('./static/ccm-incorrect-recommendations-msg-ui.png')} width="60%" height="60%" title="Click to view full size image" />

- Adding an invalid cost category in a perspective rule caused the Anomalies feature to not function as expected. (CCM-13218)

  Now, the cost category IDs are validated when added in the perspective rule.

#### July 07, 2023, version 80002

##### What's new

- Azure VM recommendations (CCM-13142)

  Now, the recommendations are computed based on both **Memory Utilization** data and the existing **CPU Utilization** tracking data.

- Budget Sorting Enhancement (CCM-10948)

  This enhancement allows you to conveniently sort budgets alphabetically in Harness CCM. You can now browse and navigate through budgets more efficiently.

- Recommendations enhancement (CCM-11665)

  You can now easily move recommendations from the **Applied** state back to the **Open** state. This enhancement allows you to easily rectify accidental closure of recommendations or marking Jira tickets as done by returning them to an actionable state.

##### Fixed issues

- Nodepool recommendations displayed incorrect savings data. (CCM-12816)

Implemented a check to exclude nodepools that have more than one instance family from generating recommendations. This is necessary as the current calculations for such nodepools result in incorrect recommendations.

#### June 30, 2023, version 79906

##### What's new

- Azure inventory management (CCM-12676)

  As part of the Azure inventory management, now you can monitor the **Memory Utilization** data for virtual machines (VMs) along with the existing **CPU Utilization** tracking data.

- Clone AutoStopping rules (CCM-12337)

  You can now clone an AutoStopping rule. To clone a rule, navigate to the rule you want to replicate and select the **Clone** option from the more options menu. After selecting **Clone**, you can update the instance details according to your requirements. This allows you to create a new rule based on the existing one, saving you time and effort in setting up similar rules for different instances.

- Budget alert enhancements

  - The cost alerts for daily budgets are now triggered on an hourly basis. Previously, cost alerts for daily budgets were triggered only at specific intervals, which could potentially result in delayed notifications if the threshold was crossed outside those intervals. However, with the increased frequency, you can now receive timely alerts as soon as the threshold is exceeded, regardless of the time of day. (CCM-12028)
  - Significant improvements have been made to the Slack budget alert messages for both budgets and budget groups. Now, when receiving a budget alert, you will find detailed information related to the perspective from which the budget was created, the allocated budget amount, the current spend, and the forecasted spend. (CCM-12647)

    <DocImage path={require('./static/ccm-budget-slack-msg.png')} width="60%" height="60%" title="Click to view full size image" />

    <DocImage path={require('./static/ccm-budget-grp-slack-msg.png')} width="60%" height="60%" title="Click to view full size image" />

##### Fixed issues

- The cost data was not displayed on the **Perspectives** page. (CCM-12752)

  This was caused by the challenge of pushing large volumes of billing data into BigQuery. This issue has been resolved by adding support to upload and handle large datasets.

- Previously, users were unable to view and manage the ignored recommendations for EC2 instances. (CCM-13004) (ZD-46353)

The payload for adding EC2 recommendations to the **Ignore List** was incorrect. Now, the issue is fixed, and the functionality is working as expected.

#### June 21, 2023, version 79803

##### What's new

- Added a tooltip on the **Cloud Integration** page. (CCM-12559)

  In the **Cloud Integration** page, if the connector data is unavailable, the **View costs** link is disabled. However, as soon as the data becomes available, the link is enabled. Now, a tooltip providing a concise explanation as to why the link is disabled appears when you hover over the disabled link.

- Asset Governance filter panel enhancement. (CCM-12854)

  Previously, in the **Asset Governance** > **Evaluations** page, only the target accounts with `execute` permissions were included in the **Target Accounts** field in the filter panel. Now, this functionality is enhanced so that all target accounts with `view` permissions are also included in the list.

##### Fixed issues

- The budget screen displayed inconsistent margins, leading to overlapping text in different columns. To address this issue, the columns in the budget list have been readjusted, ensuring that the text in each column no longer coincides with the text in adjacent columns. (CCM-10980)
- An error occurred with the HTTP AutoStopping rule. (CCM-12729)

  The detection of routing rules on the Azure Application Gateway was impacted due to the presence of an additional custom probe configuration. To address this issue, during the detection of routing rules for the specified port configuration, any custom probes are now ignored. However, the custom probe will continue to be utilized for the selected rule.

#### June 09, 2023, version 79701

##### Early access

**Propagate force cool down** (CCM-12338)

You can now propagate force cool down from primary rule to dependent rules.

Earlier, when stopping a rule from the UI, you had to stop its dependant rules one by one. With this enhancement, you can propagate the stop operation to dependant rules as well.

Propagating cool down to dependant rules is optional. You can stop the primary rule with or without propagating cool down to dependent rules.

#### June 06, 2023, version 79601

##### What's new

**Cost Category enhancement** (CCM-12585)

When building a cost category, it is now possible to incorporate another cost category as a rule. However, there are important considerations to keep in mind when using a cost category within your rule.

- You cannot include a nested cost category as a rule within another cost category if either of these cost categories contains a shared bucket.
- You cannot add the same cost category as a rule in the cost bucket.
- You cannot create cyclic nested cost categories, where a cost category is nested within each other.
- You can nest cost categories to a maximum of 20 levels.

##### Fixed issues

- Budgets that contain the `/` character in their names were previously experiencing issues with correctly opening the budget details page. (CCM-12062)

  Previously, when the budget name appended to the URL contained the `/` character, it was treated as a separate route. This caused the browser to fail in loading the corresponding budget details. Now, before appending the budget name to the URL, it is properly encoded. This ensures that the browser handles the `/` character correctly, allowing the page to load as expected.

#### May 29, 2023, version 79505

##### What's new

**Azure VM recommendations**

Introducing Azure VM recommendations that identifies idle or under utilized VMs, ensuring efficient resource allocation and significant cost savings. For more information, go to [Azure recommendations](/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/azure-vm/).

##### Fixed issues

- The recommendations for workloads with containers that do not have properly set limits and requests displayed a value of -1 or null. (CCM-11765).

  This issue has been resolved.

- The users encountered an issue where they were unable to toggle the **Hide progress** page and **Dry run** options. Each time the toggle button was clicked, an error was thrown, preventing them from enabling or disabling these options successfully. (CCM-12438)

  The UI was relying on a deprecated API to update the rule, causing issues with toggling the values. This issue has been resolved by replacing the older API with a new v2 API. This update restored the functionality, allowing users to toggle the values.

- The ALB that was created in AWS did not appear on the Harness AutoStopping rules creation page. (CCM-12517)

  This issue has been resolved.

- The AutoStopping fixed schedule did not execute the rule as configured in the schedule settings. (CCM-12396)

  The issue was identified as missing triggers from Dkron, an external service, corresponding to the created schedule. To address this, a backup job was created. This backup job is designed to trigger the required operation in case the triggers from Dkron are missed. By implementing this solution, the system ensures that the necessary operation will still be executed even if the triggers from Dkron are not received.

- The users were not able to create an Azure Application Gateway successfully as the Azure function package was corrupt. (CCM-12550)

  Rolling back to the previous function package fixed this issue.

#### May 19, 2023, version 79400

##### Fixed issues

- Budget group missing from the Budget page. (CCM-12334)

  Previously, updating a budget group rendered its history irrelevant due to its dependence on child entities. However, this issue has been resolved by introducing support for modifying the budget group history during updates.

- An error occurred while attempting to save an AutoStopping rule with multiple proxy configurations and a custom domain in the GCP proxy. (CCM-12048)

  Saving the AutoStopping rule did not append custom domain providers for non-AWS cloud providers. This resulted in a validation error at the back-end. This issue has been resolved. The required field `custom_domain_provider` is now being set for all cloud providers.

#### May 05, 2023, version 79300

##### Early access

**Asset Governance**

The Asset Governance feature now includes support for access control through Role-Based Access Control (RBAC). This enhancement allows more granular control and management of permissions. For more information, go to [Asset Governance RBAC](/docs/cloud-cost-management/access-control/rbac-asset-gov).

This feature is behind the feature flag, `CCM_ENABLE_CLOUD_ASSET_GOVERNANCE_UI`.

##### Fixed issues

- Previously, the budget amount in the monthly fields did not default to zero when selecting the yearly budget period. (CCM-12289)

  This issue is resolved. Now, when choosing the budget type as **Specified amount**, the budget amount for individual months correctly defaults to zero.

  <DocImage path={require('./static/ccm-set-budget-amount.png')} width="60%" height="60%" title="Click to view full size image" />

- Users couldn't dismiss the "How to get started with creating rules?" modal on the **Cost Category** page. (CCM-12278)

  The issue is resolved. Now, you can collapse the modal if you don't want to see it on the screen.

- Updated the default **Budget Type** as **Specified amount**. You could select **Last period spend** if you like to set up budget based on that budget type. (CCM-12254)
- A stopped AutoStopping rule displayed **Scale down** on the rule **Details** page. A stopped rule must display **Scale up** and a running rule must display **Scale down**. (CCM-11920)

  This issue is resolved now.

  <DocImage path={require('./static/ccm-rule-scaledown.png')} width="60%" height="60%" title="Click to view full size image" />

- The escape character `&amp` rendered incorrectly in the budget dashboard. (CCM-11683)

The issue is resolved now.

#### April 19, 2023, version 79104

##### What's new

- Recommendations enhancement (CCM-11769)

  A new filter has been added to recommendations, which allows the selection of the age of the recommendations. This filter allows you to specify how many days old recommendations should be included in the results.

##### Fixed issues

- The **Recommendations** page displayed incorrect savings value. (CCM-12082)

  This issue has been resolved. The value in the grid now matches with the widgets.

- Spike in BigQuery cost. (CCM-12027)

  Limited the data queried by users with restricted access (granular RBAC enabled) by implementing a time filter of 30 days. These users can retrieve recommendations only from the past 30 days, effectively reducing the overall size of the query results.

- Modifying individual budgets within a budget group resulted in inconsistencies within the budget group as a whole. (CCM-11854)

  To fix this issue, you are allowed to modify only the budget type, budget amount, and configure alerts for individual budgets. You cannot modify other parameters.

- While configuring budget groups, you cannot add a negative integer in the **Cascading** > **Proportionally** field. The total sum of the proportions should always be 100. (CCM-11852)

  <DocImage path={require('./static/budget-group-release-note.png')} width="60%" height="60%" title="Click to view full size image" />

#### April 05, 2023, version 79001

##### What's new

- Workload recommendations enhancement. (CCM-9161)(Zendesk Ticket ID 34658)

  Introduced support for 100th percentile in workload recommendations. Recommendations will be displayed for 100% usage of workloads.

##### Fixed issues

- Updated the default perspective names from `Aws` to `AWS` and `Gcp` to `GCP`. (CCM-11770)
- Discrepancy in the number of EC2 recommendations. (CCM-11730)

  The Terminate-type recommendations were not being saved, and certain EC2 recommendations were disappearing after a specific interval of time. This issue has been resolved.

- The link to the perspective on the **Anomalies** page was incorrect. (CCM-11403)

  This issue has been fixed, and the link now directs to the correct perspective.

#### March 21, 2023, version 78903

##### What's new

- Enabled audit trail for budget groups. (CCM-11387)

  With this enhancement, you can track all CRUD operations such as Create, Delete, and Update related to budget groups.

- Display the AWS account ID and name on the **Recommendations** page. (CCM-11666)

  The AWS Account ID has been added to the ECS Services on the Recommendations list page.

- Cost category enhancement (CCM-10580)

  Introduced support to allocate the cost of shared cost buckets by a fixed percentage among each cost bucket. A new user interface has been developed.

  ![](./static/cost-category-builder-2.png)

  For more information, go to [Use Cost Categories](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/cost-categories-usage).

##### Fixed issues

- The error message displayed while creating a Jira ticket to apply recommendations was not meaningful. (CCM-10822)

  A comprehensive Jira error message will be displayed in the user interface whenever it is feasible. However, there may be instances where only a generic message such as "Error creating issue" will be displayed when the Jira error is not parsed.

#### March 13, 2023

##### What's new

- Cost Category enhancements (CCM-10280)

  - When calculating the cost for `Unattributed`, the rules present in the shared cost bucket are not considered to eliminate duplicate costs.
  - If **Cost Category** is `NOT NULL` in a perspective, it means all cost buckets are considered. `Unattributed` is not taken into account.
  - If the **Cost Category** is `NULL`, it indicates that the cost buckets are not considered in the perspective. `Unattributed` is taken into account.
  - Previously, all shared cost buckets were displayed as `No Groupby`. Now, when you apply a GroupBy option other than the cost category, the cost of the rules present in the shared cost bucket are displayed in a separate entity based on the GroupBy selection you have made. However, it is important to note that this change will be effective only if you have incorporated cost category with shared buckets in perspective rules.

##### Fixed issues

- Previously, deleting a cost category caused the perspectives that utilized the cost category in their rule or GroupBy to crash. (CCM-9902)

  This issue has been fixed. Now, before the cost category is deleted, you will receive a prompt to perform one of the following actions:

  - Delete any perspectives that depend on the cost category.
  - Remove the cost category from the perspective's rule or GroupBy.

- When you edit an AutoStopping rule in which the **Health Check** option is disabled, it is enabled when the client-side data is fetched. (CCM-11472)

  This issue has been fixed. Now, the Health Check option remains disabled when you edit the AutoStopping rule.

#### March 06, 2023

##### Fixed issues

- The ECS service billing data was missing in the Perspectives. (CCM-11464)

  This issue has been fixed, and all data is now accurately reflected on the **Perspectives** page without any errors.

- The `ANOMALY_DETECTION_CLOUD` job responsible for displaying cloud anomalies was not being executed in accounts without a cluster connector. (CCM-11228)

  This issue has been fixed, and anomalies are now computed even in the absence of a cluster connector.

- Previously, when attempting to delete a Recommendation filter, an error message would appear.(CCM-11300)

  This issue has been fixed now, and you can successfully delete a Recommendation filter without any error messages.

#### March 01, 2023

##### What's new

- Introducing support for adding more than one CCM GCP connector when you have two or more billing export tables with different billing account IDs in the same dataset. (CCM-11244)
- Introducing support for assigning a custom static port as the source port in the port configuration of the TCP traffic-based AutoStopping rule. (CCM-11264)

##### Fixed issues

- Previously, the **Start Date** selected when creating a budget was not being saved and instead the date of budget creation was being displayed as the **Start Date**. (CCM-10952)

  This issue is fixed now, and the **Start Date** selected during budget creation is now being saved correctly.

- Previously, even when the **Cascading** option was turned off, the budget amount was being equally divided among all the budgets in the group. (CCM-10950)

  This issue is fixed now. The budget amount is no longer being distributed among individual budgets, ensuring that the budget amount of each budget remains unchanged.

- If a health check status code is not entered for the AutoStopping proxy, Harness falls back to using the default range of 200-299. (CCM-11007)

#### February 20, 2023

##### What's new

- AutoStopping Proxy for HTTPS and TCP connections.

Harness CCM introduces **AutoStopping Proxy** to support AutoStopping for HTTPS and TCP connections. For more information, go to [Add load balancers](/docs/category/add-load-balancers-for-autostopping-rules) and [Create AutoStopping rules](/docs/category/create-autostopping-rules).

##### Fixed issues

- The potential monthly savings displayed on the UI did not match with the Spot or On-Demand recommendations. (CCM-10698)

  The logic to calculate the potential monthly cost displayed on the UI has been fixed. Now, the savings match with the Spot or On-Demand recommendations.

- Added the missing instance family types for Azure node pool recommendations. (CCM-10246)

- When you create a budget with an invalid **Period Starts from** date with respect to the **Budget Period**, the error message displayed was unclear - "Invalid request: Error in create budget operation. Start time of budget is invalid." (CCM-10487)

Now, the message clarifies why the date is invalid - "Invalid request: Budget Period and Period Start date cannot add up to be in the past."

- The cost details API was returning only the AWS account ID without the account name. (CCM-10573)

Now, the API returns both account name and ID.

#### January 31, 2023

##### Fixed issues

- Hourly data on the **Perspectives** page showed an incorrect billing amount for multiple accounts. CloudFunction was unable to delete the existing records but continued ingesting a new entry in clusterDataHourly in BigQuery. (CCM-10711)

  This issue is fixed. Now, the Instance_Billing_Hourly job execution is limited to 5 times per minute to avoid CloudFunction failure.

- The total costs displayed on the **Overview** page and the **license-util** page (or API) were incorrect in accounts with at least one Azure connector. (CCM-10678)

  A bug fix in the ingestion of aggregated costs for Azure resolved this issue.

#### January 18, 2023

##### Fixed issues

- While creating a Jira ticket to apply EC2 recommendations, the **Account Name** field in the Jira description incorrectly displayed the Account ID. (CCM-10507)

  Now, the issue is fixed, and the account name is displayed correctly.

#### January 04, 2023

##### Early access

- Standardize your currency across Harness CCM (CCM-9280)

  This release introduces Currency Preference that enables you to view the entire CCM application in your preferred currency for different cloud providers. This feature is behind a feature flag CCM_CURRENCY_PREFERENCES.

- API implementation for the Currency Preferences feature (CCM-9632)

  You can now use the Currency Preference API to select the currency in which you want to view your entire CCM application across different cloud providers. Go to [Harness API Documentation](https://apidocs.harness.io/) for more information.

</details>

<details>
<summary>2022 releases</summary>

#### December 16, 2022

##### What's new

- Introducing support to list the label keys that contain the string node-pool-name. (CCM-10203)

  While adding a node pool name, Harness CCM looked only for the exact match. Now, CCM has introduced support to check if the node label key contains the string node-pool-name. CCM falls back to _contains_ if an exact match is not found. See [Labels for node pool recommendations](/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/node-pool-recommendations#prerequisites) for more information.

##### Fixed issues

- The messages in budget alert notification emails were misleading. Now, the emails convey more meaningful and dynamic messages. They provide the cost type and the period for which the alert is created. (CCM-9291)

#### December 07, 2022, version 77716

##### Fixed issues

- First-time users could not launch the Kubernetes cluster creation workflow by using the Quick Create option on the Cloud Integration page. (CCM-9953)

  Now, this issue is fixed.

- When you clicked **Explore all plans** on the Cloud Cost Management Getting Started page, you were directed to the old onboarding page instead of the new one. (CCM-9638)

  Now, this issue is fixed.

- On the Recommendations page, when you clicked the Copy icon, a confirmation message was not displayed to be sure the metrics were copied. Also, the copied message contained unwanted strings such as null. (CCM-10009)

  Now, a confirmation message is displayed when you click the Copy icon and the format of the copied message is improved.

- The anomaly tooltip in the Perspective details chart was not displayed properly if it extended beyond the chart. (CCM-9336)

  Now, this issue is fixed.

#### November 29, 2022, version 77608

##### Fixed issues

- The bars in the Perspectives chart grouped by cost categories were not rendering properly. (CCM-9502)

  This issue is fixed by applying a limit on the number of cost buckets in the cost category. Now, when you group by cost categories in a Perspective, it returns the top 12 cost buckets instead of all cost buckets.

- The GCP load balancer modal was showing undefined while creating a new load balancer. (CCM-9825)

  This issue is fixed. Now, it shows the term Load Balancer.

- Azure VM inventory dashboards showed duplicate cost entries because every API call to pull VM data inserted a new row in the dashboard if the time of creation (creationTime) was different from the existing row of that VM. (CCM-9842)

  Now, this issue is fixed.

#### November 06, 2022, version 77317

##### What's new

This release adds validation to ensure that the load balancer domain name specified in the YAML file to create an AutoStopping rule is valid and exists in your Harness account. (CCM-9101)

##### Fixed issues

- When the Harness account ID of the customer begins with a hyphen, sts assume-role step in the data ingestion pipeline interpreted it as an additional argument, and thus failed to run the command.

  The account ID value is now assigned to role-session-name by explicitly using '='. This works with session names starting with a hyphen as well. (CCM-9481)

- Clicking Save Cost Category more than once resulted in the creation of multiple cost categories with the same name.

  Now, the Cost category name is unique. You can't have two Cost categories with the same name. If you enter an existing Cost category name while updating or creating a Cost category, an error message is displayed — Invalid request: Cost category name already exists. (CCM-8934)

#### October 21, 2022, version 77221

##### What's new

You can now add labels to enable node pool recommendations. `kops cluster` node label has been added for node pool recommendations. See [Labels for node pool recommendations](/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/node-pool-recommendations#prerequisites) for more information. (CCM-9309)

##### Fixed issues

The AWS cost shown in the Perspective section and the dashboard mismatched. Duplicate account name entries that belonged to the same account ID caused this issue in the dashboards. (CCM-9344)

This issue is resolved.

#### October 07, 2022, version 77025

Delegate version: 77021

##### Fixed issues

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

#### September 29, 2022, version 76921

##### What's new

- First-class Support for Istio is released with version 1.0.8 of autostopping-controller. (CCM-8386)
  You can now onboard Istio virtualservices-based workloads to AutoStopping without editing the virtualservice manually.

- Now, you can sort perspective filters while creating cost categories, perspectives, etc. You can search for a filter quickly and apply it easily. (CCM-8597)

#### September 14, 2022, version 76708

##### Fixed issues

- A validation error occurred while entering the URL with space. (CCM-8832)
  To fix this issue, the URL is now truncated before validation.

#### September 7th, 2022, version 76619

##### Fixed issues

- Round off Anomaly Slack Alerts to 2 Decimal Places (CCM-8769)
- Refresh recommendation resources and instance details (CCM-8720)

#### August 31st, 2022, version 76518

##### Enhancements

- Azure Connector Validations (CCM-7650)

  As part of Azure Connector validations for Inventory and AutoStopping, we're now checking whether the service principal has the required roles for these features: Reader role for Inventory and Contributor role for AutoStopping. These checks will run whenever `Test Connector` APIs are hit for CeAzure connectors.

  See Set Up Cloud Cost Management for Azure.

##### Fixed issues

- Getting exceptions while fetching filter values for GCP and AWS (CCM-8738, ZD-33142, ZD-33948)
  In the Perspective preview section, we are now checking both `ruleFilters` and `idFilters` to deduce whether it's a cluster perspective or not and based on querying the correct table (`clusterDataAggregated` or `unifiedTable`).
- API Docs were incorrect (CCM-8336, ZD-31845)
  Return the list of Recommendations API doc updated.

#### August 25th, 2022, version 76425

##### Fixed issues

- The Perspective recommendation filter is incorrect (CCM-8632)
  When you click on recommendations shown on the Perspective page, you will now see only the list of recommendations filtered for the Perspective that you are reviewing instead of listing the full list of recommendations unfiltered.

- Account name updates in AWS don't cascade to CCM DB (CCM-8598)
  We were not updating the account name in daily sync. Now updating account name in daily sync.

- Cluster Costs missing for since 5th August (CCM-8535, ZD-33355)
  Now, we are checking AWS Cluster data in `billing_table` for last 3 days and if data does not exist, we will run `INSTANCE_BILLING` batchJob. So, we are no longer dependent on AWS cluster data to run batchJob.

#### August 18th, 2022, version 76321

##### What's new

- Cluster Perspective - Total Cost, Table values UX improvement (CCM-7968, ZD-31764)

- Difficulty "Grouping By" Cost Category within Perspectives (CCM-7784)

  You can now search Cost Categories in your chart.

- List BI Dashboards API (CCM-7649)
  You can now query a new API to list all the BI Dashboards specific to CCM: Cloud Cost BI Dashboards.

  Example query:

  ```
  curl -i -X GET \
   'https://app.harness.io/gateway/ccm/api/bi-dashboards?accountIdentifier=H5W8ioxxxA2MXg' \
   -H 'x-api-key: pat.H5xxxA2MXg.6xxxmD'
  ```

Example response:

```
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
```

##### Fixed issues

- Fix labels null value (CCM-8558)

  When we were sending label.key IN [""] -> Empty Array, BE is setting the empty array to null. Now to handle it, we have added a null check while converting conditions values to filter values.

- CCM Perspectives seem to be broken in new UI (CCM-8484, ZD-33142)

In the Perspective Preview section, we were not considering whether it's a cluster perspective or not. Therefore, we always query unifiedtable. This issue has been resolved. Now, in Perspective Preview section, we are checking whether it's a cluster perspective or not and based on that querying the correct table.

- Azure Existing connector validation is failing at test connection (CCM-8423)

Something was changed in the base image for Docker files. Azcopy utility needs access to create .azcopy folder to keep job plan log files. It was not able to do so. Fix is to give an explicit path for it in which it has access.

#### August 8th, 2022, version 76128

##### Fixed issues

- RDS Instance data in Dashboards don't reflect changes in InstanceClass (CCM-8411, ZD-32945, ZD-32995)

  The RDS inventory dashboards did not reflect the updated DBInstanceClass when RDS instance class was updated. Due to a bug in our RDS data-load CloudFunction, the DBInstanceClass column was not being updated in the awsRdsInventory table. The dashboards query this awsRdsInventory table, which is why the updated DBInstanceClass couldn't be seen in the dashboard. The issue has been resolved. The RDS Inventory dashboard now displays the updated instance-class as expected. Also, there was a discrepancy in data due to a bug in the join condition of our looker query. We have updated the join and the data looks correct now.

- Azure Connectors are failing (CCM-8298, ZD-32605, ZD-32612)
  We had a regression in the data pipeline. Fix is deployed.

#### August 1, 2022, version 76030

##### What's new

CCM Perspective Preferences.

When you create a CCM Perspective you can now set Preferences for Include Others and Unallocated Costs.

For details, go to Perspective Preferences in Create Cost Perspectives.

##### Enhancements

Perspective Preferences: Unallocated and Include Others cost support added (CCM-7436)

Now while creating a perspective, you will see a Preferences tab to select the preferences for a particular Perspective. And on the Perspective page, you can toggle the preferences options to see their cost in the Perspective chart section.

##### Fixed issues

- CCM missing data for our production cluster (CCM-8214, ZD-32384)

  Usually, the node resource values from instanceType are displayed in the format custom-8-24576, but the format was different and looked like n2d-custom-8-220160-ext.

- Cost Category-based perspective does not showcase cost breakdown (CCM-8068)

  During Perspective save, Cost Category was not identified as a separate data source and the grid API call was failing. Added Cost Category in data sources if Cost Category rules are present in Perspective.

- Not including Others and Unallocated costs in perspectiveTimeSeriesStats (CCM-7973)

  You can include Others and Unallocated Cost for a Perspective Time Series Chart.

- CCM dashboards database errors (CCM-7791)

  Converting queries to Batch queries. Removing certain Alter statements as they are no longer required.

#### July 18th, 2022, version 75921

##### Fixed issues

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

#### July 11th, 2002, version 75829

##### What's new

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

##### Fixed issues

- Changed the APIs related to Recommendations and Anomaly recently as part of adding Filter Panels (CCM-7999, ZD-31845)

  In the updated API, the filterType field is required. Without this field, an "Unable to process JSON" response error appears.

- CCM AWS Connector failing connection (CCM-7964)
  Added the following ways for dealing with large volumes of customer billing data: optimized data sync configuration, increased sync timeout minutes, and handled truncated response from AWS API.

- Add-hoc Perspective Filters not accepting values (CCM-7941, ZD-31977)

  Users can now filter perspectives AWS account by accountName.

</details>
