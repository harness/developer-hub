---
title: Cloud Cost Management release notes
sidebar_label: Cloud Cost Management
tags: [NextGen, "cloud cost management"]
date: 2023-08-02T10:00
sidebar_position: 5
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/cloud-cost-management/rss.xml" />

Review the notes below for details about recent changes to Harness Cloud Cost Management. For release notes for Harness Self-Managed Enterprise Edition, go to [Self-Managed Enterprise Edition release notes](/release-notes/self-managed-enterprise-edition). Additionally, Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.

:::info note
Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features and fixes that these release notes describe may not be immediately available in your cluster. To identify the cluster that hosts your account, go to the **Account Overview** page. 
:::


## Latest - August 02, 2023, version 80301

```mdx-code-block
<Tabs>
  <TabItem value="What's new">
```
* AWS AutoStopping proxy enhancement (CCM-13497)

  You can now select the subnet ID from the dropdown list for AWS AutoStopping proxy creation. 

    <docimage path={require('./static/ccm-subnet-proxy.png')} width="60%" height="60%" title="Click to view full size image" />

* **Perspective Preferences** enhancement (CCM-11145)

  Perspective preferences provide you the flexibility to control which cost factors are considered in your billing and CUR (Cost and Usage Report) reports within your perspective. You can now include cost factors such as discounts, taxes, and refunds. For more information, go to [Perspective Preferences](../docs/cloud-cost-management/3-use-ccm-cost-reporting/1-ccm-perspectives/perspective-preferences.md).

 
:::important note
 The current configurations for **Show others** and **Show unallocated cost in clusters** are preserved. This means that though the default settings have these preferences set to false, any _existing perspective_ with these preferences set to true will retain their current state and not be overridden.
:::

* Improved UI handling during the AutoStopping rule creation process (CCM-13527)

  The page on which users select either a load balancer or an AutoStopping Proxy has been enhanced to include an additional API that retrieves information about proxies created previously in shared VPCs. Now users can use a proxy created in a shared VPC across projects and connectors.

* **Overview** page enhancements (CCM-13326)

  - The pie chart now shows a hover state. 
  - The forecast trend in the widget is removed.
  - Added forecast time period in the forecast cost widget.
  - Changed the heading of the cloud cost widget from `Top AWS accounts` to `Top 10 AWS accounts`.

    <docimage path={require('./static/ccm-overview-1.png')} width="60%" height="60%" title="Click to view full size image" />
    <docimage path={require('./static/ccm-overview-2.png')} width="60%" height="60%" title="Click to view full size image" />
    <docimage path={require('./static/ccm-overview-3.png')} width="60%" height="60%" title="Click to view full size image" />




```mdx-code-block
  </TabItem>
  <TabItem value="Early access">
```

This release does not include any early access features.

```mdx-code-block
  </TabItem>
  <TabItem value="Fixed issues">
```
* Previously, configuring both the redirect URL and target port for redirection while creating a redirect-based AutoStopping rule led to an error. (CCM-13475)

  This issue has been resolved by modifying the validation process. Now, if the redirect URL is defined, the validation process checks whether the target port is greater than 0. Specifying both redirect URL and target port is not allowed as it is an invalid configuration. However, for ALBs, only redirect URLs are allowed.

* Users were unable to validate their YAML files when creating a Kubernetes AutoStopping rule. (CCM-13459)

  This issue has been resolved. Users will now be able to validate the YAML successfully.

* Previously, users experienced performance delays while editing cost categories with more than 50 buckets, and every subsequent action took several seconds to trigger. (CCM-13205)

  The issue has been resolved, and the overall user experience has been enhanced by streamlining the process of managing cost categories even with a large number of buckets.


```mdx-code-block
  </TabItem>
</Tabs>
```

## Previous releases

<details>
<summary>2023 releases</summary>

#### July 21, 2023, version 80202

##### What's new
This release does not include any new features.

##### Early access
This release does not include any early access features.

##### Fixed issues
This release does not include any fixed issues.


#### July 13, 2023, version 80102

##### What's new

Recommendations page UI enhancement (CCM-12693)

 The **Include** dropdown on the **Recommendations** page has been removed. Instead, the following toggle options have been added in the Filter panel as shown in the screenshots below: 

  - Show Recommendations on Parent resource
  - Show Recommendations on Child resource
  - Show Recommendations on resources added to the IgnoreList

By default, the first two options are enabled, and you can modify the toggles to customize the list filtering.

&nbsp <docimage path={require('./static/ccm-toggle-options-recommendations-filter.png')} width="40%" height="40%" title="Click to view full size image" />
   
  <docimage path={require('./static/ccm-tooltip-recommendations.png')} width="60%" height="60%" title="Click to view full size image" />

##### Early access

This release does not include any early access features.

##### Fixed issues

* The message displayed on the UI was incorrect when there were no recommendations for the account. (CCM-13250)

  This issue is fixed now.

    <docimage path={require('./static/ccm-incorrect-recommendations-msg-ui.png')} width="60%" height="60%" title="Click to view full size image" />


* Adding an invalid cost category in a perspective rule caused the Anomalies feature to not function as expected. (CCM-13218)

  Now, the cost category IDs are validated when added in the perspective rule.


#### July 07, 2023, version 80002

##### What's new

* Azure VM recommendations (CCM-13142)

  Now, the recommendations are computed based on both **Memory Utilization** data and the existing **CPU Utilization** tracking data.

* Budget Sorting Enhancement (CCM-10948)

  This enhancement allows you to conveniently sort budgets alphabetically in Harness CCM. You can now browse and navigate through budgets more efficiently.

* Recommendations enhancement (CCM-11665)

  You can now easily move recommendations from the **Applied** state back to the **Open** state. This enhancement allows you to easily rectify accidental closure of recommendations or marking Jira tickets as done by returning them to an actionable state.

##### Early access

This release does not include any early access features.

##### Fixed issues

* Nodepool recommendations displayed incorrect savings data. (CCM-12816)

 Implemented a check to exclude nodepools that have more than one instance family from generating recommendations. This is necessary as the current calculations for such nodepools result in incorrect recommendations. 

#### June 30, 2023, version 79906

##### What's new

* Azure inventory management (CCM-12676)

  As part of the Azure inventory management, now you can monitor the **Memory Utilization** data for virtual machines (VMs) along with the existing **CPU Utilization** tracking data.

* Clone AutoStopping rules (CCM-12337)

  You can now clone an AutoStopping rule. To clone a rule, navigate to the rule you want to replicate and select the **Clone** option from the more options menu. After selecting **Clone**, you can update the instance details according to your requirements. This allows you to create a new rule based on the existing one, saving you time and effort in setting up similar rules for different instances.

* Budget alert enhancements 

  - The cost alerts for daily budgets are now triggered on an hourly basis. Previously, cost alerts for daily budgets were triggered only at specific intervals, which could potentially result in delayed notifications if the threshold was crossed outside those intervals. However, with the increased frequency, you can now receive timely alerts as soon as the threshold is exceeded, regardless of the time of day. (CCM-12028)
  - Significant improvements have been made to the Slack budget alert messages for both budgets and budget groups. Now, when receiving a budget alert, you will find detailed information related to the perspective from which the budget was created, the allocated budget amount, the current spend, and the forecasted spend. (CCM-12647)

      <docimage path={require('./static/ccm-budget-slack-msg.png')} width="60%" height="60%" title="Click to view full size image" />

      <docimage path={require('./static/ccm-budget-grp-slack-msg.png')} width="60%" height="60%" title="Click to view full size image" />
##### Early access

This release does not include any early access features.

##### Fixed issues

* The cost data was not displayed on the **Perspectives** page. (CCM-12752)

  This was caused by the challenge of pushing large volumes of billing data into BigQuery. This issue has been resolved by adding support to upload and handle large datasets.
* Previously, users were unable to view and manage the ignored recommendations for EC2 instances. (CCM-13004) (ZD-46353)

 The payload for adding EC2 recommendations to the **Ignore List** was incorrect. Now, the issue is fixed, and the functionality is working as expected.

#### June 21, 2023, version 79803

##### What's new

* Added a tooltip on the **Cloud Integration** page. (CCM-12559)

  In the **Cloud Integration** page, if the connector data is unavailable, the **View costs** link is disabled. However, as soon as the data becomes available, the link is enabled. Now, a tooltip providing a concise explanation as to why the link is disabled appears when you hover over the disabled link. 
  
* Asset Governance filter panel enhancement. (CCM-12854)

  Previously, in the **Asset Governance** > **Evaluations** page, only the target accounts with `execute` permissions were included in the **Target Accounts** field in the filter panel. Now, this functionality is enhanced so that all target accounts with `view` permissions are also included in the list.

##### Early access

This release does not include any early access features.

##### Fixed issues

* The budget screen displayed inconsistent margins, leading to overlapping text in different columns. To address this issue, the columns in the budget list have been readjusted, ensuring that the text in each column no longer coincides with the text in adjacent columns. (CCM-10980)
  
* An error occurred with the HTTP AutoStopping rule. (CCM-12729)

  The detection of routing rules on the Azure Application Gateway was impacted due to the presence of an additional custom probe configuration. To address this issue, during the detection of routing rules for the specified port configuration, any custom probes are now ignored. However, the custom probe will continue to be utilized for the selected rule.

#### June 09, 2023, version 79701

##### What's new
This release does not include any new features.

##### Early access
**Propagate force cool down** (CCM-12338)
  
  You can now propagate force cool down from primary rule to dependent rules.

  Earlier, when stopping a rule from the UI, you had to stop its dependant rules one by one. With this enhancement, you can propagate the stop operation to dependant rules as well. 
  
  Propagating cool down to dependant rules is optional. You can stop the primary rule with or without propagating cool down to dependent rules.

##### Fixed issues

This release does not include any fixed issues.
  
#### June 06, 2023, version 79601

##### What's new

**Cost Category enhancement** (CCM-12585)

  When building a cost category, it is now possible to incorporate another cost category as a rule. However, there are important considerations to keep in mind when using a cost category within your rule. 
  
   * You cannot include a nested cost category as a rule within another cost category if either of these cost categories contains a shared bucket.
   * You cannot add the same cost category as a rule in the cost bucket.
   * You cannot create cyclic nested cost categories, where a cost category is nested within each other.
   * You can nest cost categories to a maximum of 20 levels.

##### Early access

This release does not include any early access features.

##### Fixed issues
  
* Budgets that contain the `/` character in their names were previously experiencing issues with correctly opening the budget details page. (CCM-12062)

  Previously, when the budget name appended to the URL contained the `/` character, it was treated as a separate route. This caused the browser to fail in loading the corresponding budget details. Now, before appending the budget name to the URL, it is properly encoded. This ensures that the browser handles the `/` character correctly, allowing the page to load as expected.

#### May 29, 2023, version 79505

##### What's new

**Azure VM recommendations**

  Introducing Azure VM recommendations that identifies idle or under utilized VMs, ensuring efficient resource allocation and significant cost savings. For more information, go to [Azure recommendations](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/azure-vm/).

##### Early access

This release does not include any early access features.

##### Fixed issues

* The recommendations for workloads with containers that do not have properly set limits and requests displayed a value of -1 or null. (CCM-11765).

  This issue has been resolved.

* The users encountered an issue where they were unable to toggle the **Hide progress** page and **Dry run** options. Each time the toggle button was clicked, an error was thrown, preventing them from enabling or disabling these options successfully. (CCM-12438)

  The UI was relying on a deprecated API to update the rule, causing issues with toggling the values. This issue has been resolved by replacing the older API with a new v2 API. This update restored the functionality, allowing users to toggle the values.

* The ALB that was created in AWS did not appear on the Harness AutoStopping rules creation page. (CCM-12517)

  This issue has been resolved.

* The AutoStopping fixed schedule did not execute the rule as configured in the schedule settings. (CCM-12396)

  The issue was identified as missing triggers from Dkron, an external service, corresponding to the created schedule. To address this, a backup job was created. This backup job is designed to trigger the required operation in case the triggers from Dkron are missed. By implementing this solution, the system ensures that the necessary operation will still be executed even if the triggers from Dkron are not received.

* The users were not able to create an Azure Application Gateway successfully as the Azure function package was corrupt. (CCM-12550)

  Rolling back to the previous function package fixed this issue.


#### May 19, 2023, version 79400

##### What's new

This release does not include any new features.

##### Early access
This release does not include any early access features.


##### Fixed issues

* Budget group missing from the Budget page. (CCM-12334)

  Previously, updating a budget group rendered its history irrelevant due to its dependence on child entities. However, this issue has been resolved by introducing support for modifying the budget group history during updates. 

* An error occurred while attempting to save an AutoStopping rule with multiple proxy configurations and a custom domain in the GCP proxy. (CCM-12048)

  Saving the AutoStopping rule did not append custom domain providers for non-AWS cloud providers. This resulted in a validation error at the back-end. This issue has been resolved. The required field `custom_domain_provider` is now being set for all cloud providers.



#### May 05, 2023, version 79300

##### What's new

This release does not include any new features.


##### Early access

**Asset Governance**

The Asset Governance feature now includes support for access control through Role-Based Access Control (RBAC). This enhancement allows more granular control and management of permissions. For more information, go to [Asset Governance RBAC](https://developer.harness.io/docs/cloud-cost-management/getting-started-ccm/access-control/rbac-asset-gov). 

This feature is behind the feature flag, `CCM_ENABLE_CLOUD_ASSET_GOVERNANCE_UI`.
##### Fixed issues

* Previously, the budget amount in the monthly fields did not default to zero when selecting the yearly budget period. (CCM-12289)

  This issue is resolved. Now, when choosing the budget type as **Specified amount**, the budget amount for individual months correctly defaults to zero.

  <docimage path={require('./static/ccm-set-budget-amount.png')} width="60%" height="60%" title="Click to view full size image" />

* Users couldn't dismiss the "How to get started with creating rules?" modal on the **Cost Category** page. (CCM-12278)

  The issue is resolved. Now, you can collapse the modal if you don't want to see it on the screen.

* Updated the default **Budget Type** as **Specified amount**. You could select **Last period spend** if you like to set up budget based on that budget type. (CCM-12254)
  
* A stopped AutoStopping rule displayed **Scale down** on the rule **Details** page. A stopped rule must display **Scale up** and a running rule must display **Scale down**. (CCM-11920)

  This issue is resolved now.

    <docimage path={require('./static/ccm-rule-scaledown.png')} width="60%" height="60%" title="Click to view full size image" />

* The escape character `&amp` rendered incorrectly in the budget dashboard. (CCM-11683)

 The issue is resolved now.


#### April 19, 2023, version 79104

##### What's new

* Recommendations enhancement (CCM-11769)

  A new filter has been added to recommendations, which allows the selection of the age of the recommendations. This filter allows you to specify how many days old recommendations should be included in the results. 

##### Early access

  This release does not include any early access features.

##### Fixed issues

* The **Recommendations** page displayed incorrect savings value. (CCM-12082)

  This issue has been resolved. The value in the grid now matches with the widgets.

* Spike in BigQuery cost. (CCM-12027)

  Limited the data queried by users with restricted access (granular RBAC enabled) by implementing a time filter of 30 days. These users can retrieve recommendations only from the past 30 days, effectively reducing the overall size of the query results.
* Modifying individual budgets within a budget group resulted in inconsistencies within the budget group as a whole. (CCM-11854)

  To fix this issue, you are allowed to modify only the budget type, budget amount, and configure alerts for individual budgets. You cannot modify other parameters.
* While configuring budget groups, you cannot add a negative integer in the **Cascading** > **Proportionally** field. The total sum of the proportions should always be 100. (CCM-11852)

    <docimage path={require('./static/budget-group-release-note.png')} width="60%" height="60%" title="Click to view full size image" />

#### April 05, 2023, version 79001

##### What's new
* Workload recommendations enhancement. (CCM-9161)(Zendesk Ticket ID 34658)

  Introduced support for 100th percentile in workload recommendations.  Recommendations will be displayed for 100% usage of workloads.

##### Early access

  This release does not include any early access features.

##### Fixed issues

* Updated the default perspective names from `Aws` to `AWS` and `Gcp` to `GCP`. (CCM-11770)
* Discrepancy in the number of EC2 recommendations. (CCM-11730)
 
   The Terminate-type recommendations were not being saved, and certain EC2 recommendations were disappearing after a specific interval of time. This issue has been resolved.

* The link to the perspective on the **Anomalies** page was incorrect. (CCM-11403)

  This issue has been fixed, and the link now directs to the correct perspective.

#### March 21, 2023, version 78903

##### What's new
* Enabled audit trail for budget groups. (CCM-11387)

  With this enhancement, you can track all CRUD operations such as Create, Delete, and Update related to budget groups.

* Display the AWS account ID and name on the **Recommendations** page. (CCM-11666)

  The AWS Account ID has been added to the ECS Services on the Recommendations list page.

* Cost category enhancement (CCM-10580)

  Introduced support to allocate the cost of shared cost buckets by a fixed percentage among each cost bucket. A new user interface has been developed. 
  
    ![](./static/cost-category-builder-2.png)

  
  For more information, go to [Use Cost Categories](https://developer.harness.io/docs/cloud-cost-management/use-cloud-cost-management/ccm-cost-categories/use-ccm-cost-categories).

##### Early access
This release does not include any early access features.

##### Fixed issues
* The error message displayed while creating a Jira ticket to apply recommendations was not meaningful. (CCM-10822)

  A comprehensive Jira error message will be displayed in the user interface whenever it is feasible. However, there may be instances where only a generic message such as "Error creating issue" will be displayed when the Jira error is not parsed.




#### March 13, 2023

##### What's new
* Cost Category enhancements (CCM-10280)

  - When calculating the cost for `Unattributed`, the rules present in the shared cost bucket are not considered to eliminate duplicate costs.
  - If **Cost Category** is `NOT NULL` in a perspective, it means all cost buckets are considered. `Unattributed` is not taken into account.
  - If the **Cost Category** is `NULL`, it indicates that the cost buckets are not considered in the perspective. `Unattributed` is taken into account.
  - Previously, all shared cost buckets were displayed as `No Groupby`. Now, when you apply a GroupBy option other than the cost category, the cost of the rules present in the shared cost bucket are displayed in a separate entity based on the GroupBy selection you have made. However, it is important to note that this change will be effective only if you have incorporated cost category with shared buckets in perspective rules.


##### Early access
This release does not include any early access features.


##### Fixed issues

* Previously, deleting a cost category caused the perspectives that utilized the cost category in their rule or GroupBy to crash. (CCM-9902)

  This issue has been fixed. Now, before the cost category is deleted, you will receive a prompt to perform one of the following actions:
   - Delete any perspectives that depend on the cost category.
   - Remove the cost category from the perspective's rule or GroupBy.

* When you edit an AutoStopping rule in which the **Health Check** option is disabled, it is enabled when the client-side data is fetched. (CCM-11472)
 
  This issue has been fixed. Now, the Health Check option remains disabled when you edit the AutoStopping rule.

#### March 06, 2023

##### What's new
This release does not include any new features.


##### Early access
This release does not include any early access features.


##### Fixed issues
* The ECS service billing data was missing in the Perspectives. (CCM-11464)

   This issue has been fixed, and all data is now accurately reflected on the **Perspectives** page without any errors.


* The `ANOMALY_DETECTION_CLOUD` job responsible for displaying cloud anomalies was not being executed in accounts without a cluster connector.  (CCM-11228)
  
   This issue has been fixed, and anomalies are now computed even in the absence of a cluster connector.
* Previously, when attempting to delete a Recommendation filter, an error message would appear.(CCM-11300)

   This issue has been fixed now, and you can successfully delete a Recommendation filter without any error messages. 


#### March 01, 2023

##### What's new

* Introducing support for adding more than one CCM GCP connector when you have two or more billing export tables with different billing account IDs in the same dataset. (CCM-11244)
* Introducing support for assigning a custom static port as the source port in the port configuration of the TCP traffic-based AutoStopping rule. (CCM-11264)


##### Early access

This release does not include any early access features.


##### Fixed issues

* Previously, the **Start Date** selected when creating a budget was not being saved and instead the date of budget creation was being displayed as the **Start Date**. (CCM-10952)
  
  This issue is fixed now, and the **Start Date** selected during budget creation is now being saved correctly.
* Previously, even when the **Cascading** option was turned off, the budget amount was being equally divided among all the budgets in the group.  (CCM-10950)

  This issue is fixed now. The budget amount is no longer being distributed among individual budgets, ensuring that the budget amount of each budget remains unchanged.
* If a health check status code is not entered for the AutoStopping proxy, Harness falls back to using the default range of 200-299. (CCM-11007)

#### February 20, 2023

##### What's new

* AutoStopping Proxy for HTTPS and TCP connections.

 Harness CCM introduces **AutoStopping Proxy** to support AutoStopping for HTTPS and TCP connections. For more information, go to [Add load balancers](https://developer.harness.io/docs/category/add-load-balancer-for-autostopping-rules) and [Create AutoStopping rules](https://developer.harness.io/docs/category/create-autostopping-rules).

##### Early access

This release does not include any early access features.


##### Fixed issues

* The potential monthly savings displayed on the UI did not match with the Spot or On-Demand recommendations. (CCM-10698)

  The logic to calculate the potential monthly cost displayed on the UI has been fixed. Now, the savings match with the Spot or On-Demand recommendations.

* Added the missing instance family types for Azure node pool recommendations. (CCM-10246)

* When you create a budget with an invalid **Period Starts from** date with respect to the **Budget Period**, the error message displayed was unclear - "Invalid request: Error in create budget operation. Start time of budget is invalid." (CCM-10487)

 Now, the message clarifies why the date is invalid - "Invalid request: Budget Period and Period Start date cannot add up to be in the past."

* The cost details API was returning only the AWS account ID without the account name. (CCM-10573)

 Now, the API returns both account name and ID.



#### January 31, 2023

##### What's new

  This release does not include any new features.

##### Early access

  This release does not includeany early access features.

##### Fixed issues

* Hourly data on the **Perspectives** page showed an incorrect billing amount for multiple accounts. CloudFunction was unable to delete the existing records but continued ingesting a new entry in clusterDataHourly in BigQuery. (CCM-10711)

  This issue is fixed. Now, the Instance_Billing_Hourly job execution is limited to 5 times per minute to avoid CloudFunction failure.

* The total costs displayed on the **Overview** page and the **license-util** page (or API) were incorrect in accounts with at least one Azure connector. (CCM-10678)

  A bug fix in the ingestion of aggregated costs for Azure resolved this issue. 




#### January 18, 2023


##### What's new

  This release does not include any new features.

##### Early access

  This release does not include any early access features.

##### Fixed issues

* While creating a Jira ticket to apply EC2 recommendations, the **Account Name** field in the Jira description incorrectly displayed the Account ID. (CCM-10507)

  Now, the issue is fixed, and the account name is displayed correctly. 



#### January 04, 2023

##### What's new
This release does not include any new features.


##### Early access
* Standardize your currency across Harness CCM (CCM-9280)

  This release introduces Currency Preference that enables you to view the entire CCM application in your preferred currency for different cloud providers. This feature is behind a feature flag CCM_CURRENCY_PREFERENCES.

* API implementation for the Currency Preferences feature (CCM-9632)

  You can now use the Currency Preference API to select the currency in which you want to view your entire CCM application across different cloud providers. Go to [Harness API Documentation](https://apidocs.harness.io/) for more information.


##### Fixed issues
This release does not include any fixed issues.
</details>


<details>
<summary>2022 releases</summary>


#### December 16, 2022

##### What's new

* Introducing support to list the label keys that contain the string node-pool-name. (CCM-10203)
  
    While adding a node pool name, Harness CCM looked only for the exact match. Now, CCM has introduced support to check if the node label key contains the string node-pool-name. CCM falls back to _contains_ if an exact match is not found. See [Labels for node pool recommendations](https://developer.harness.io/docs/cloud-cost-management/use-cloud-cost-management/ccm-recommendations/node-pool-recommendations#prerequisites) for more information.

  
##### Early access

  This release does not include any early access features.
  

##### Fixed issues

- The messages in budget alert notification emails were misleading. Now, the emails convey more meaningful and dynamic messages. They provide the cost type and the period for which the alert is created. (CCM-9291)


#### December 07, 2022, version 77716

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

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

##### What's new

NA

##### Early access

NA

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

##### Early access

NA

##### Fixed issues

- When the Harness account ID of the customer begins with a hyphen, sts assume-role step in the data ingestion pipeline interpreted it as an additional argument, and thus failed to run the command.

  The account ID value is now assigned to role-session-name by explicitly using '='. This works with session names starting with a hyphen as well. (CCM-9481)

- Clicking Save Cost Category more than once resulted in the creation of multiple cost categories with the same name.

  Now, the Cost category name is unique. You can't have two Cost categories with the same name. If you enter an existing Cost category name while updating or creating a Cost category, an error message is displayed — Invalid request: Cost category name already exists. (CCM-8934)

#### October 21, 2022, version 77221

##### What's new

You can now add labels to enable node pool recommendations. `kops cluster` node label has been added for node pool recommendations. See [Labels for node pool recommendations](https://developer.harness.io/docs/cloud-cost-management/use-cloud-cost-management/ccm-recommendations/node-pool-recommendations#prerequisites) for more information. (CCM-9309)

##### Early access

NA

##### Fixed issues

The AWS cost shown in the Perspective section and the dashboard mismatched. Duplicate account name entries that belonged to the same account ID caused this issue in the dashboards. (CCM-9344)

This issue is resolved.

#### October 07, 2022, version 77025

Delegate version: 77021

##### What's new

NA

##### Early access

NA

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

#### September 29, 2022, version 76921​

##### What's new

- First-class Support for Istio is released with version 1.0.8 of autostopping-controller.​ (CCM-8386)
  You can now onboard Istio virtualservices-based workloads to AutoStopping without editing the virtualservice manually​.

- Now, you can sort perspective filters while creating cost categories, perspectives, etc. You can search for a filter quickly and apply it easily.​ (CCM-8597)​​

##### Early access​

NA

##### Fixed issues

NA

#### September 14, 2022, version 76708

##### What's new

NA

##### Early access

N/A

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

##### Fixed issues

- Fix labels null value (CCM-8558)

  When we were sending label.key IN [""] -> Empty Array, BE is setting the empty array to null. Now to handle it, we have added a null check while converting conditions values to filter values.

- CCM Perspectives seem to be broken in new UI (CCM-8484, ZD-33142)

In the Perspective Preview section, we were not considering whether it’s a cluster perspective or not. Therefore, we always query unifiedtable. This issue has been resolved. Now, in Perspective Preview section, we are checking whether it’s a cluster perspective or not and based on that querying the correct table.

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

##### Early access

N/A

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

##### What's new

N/A

##### Early access

N/A

##### Enhancements

N/A

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

##### Early access

n/a

##### Fixed issues

- Changed the APIs related to Recommendations and Anomaly recently as part of adding Filter Panels (CCM-7999, ZD-31845)

  In the updated API, the filterType field is required. Without this field, an "Unable to process JSON" response error appears.

- CCM AWS Connector failing connection (CCM-7964)
  Added the following ways for dealing with large volumes of customer billing data: optimized data sync configuration, increased sync timeout minutes, and handled truncated response from AWS API.

- Add-hoc Perspective Filters not accepting values (CCM-7941, ZD-31977)

  Users can now filter perspectives AWS account by accountName.

</details>
