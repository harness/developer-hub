---
title: Software Engineering Insights release notes
sidebar_label: Software Engineering Insights
tags: [NextGen, "software engineering insights"]
date: 2023-09-01T10:00:10
sidebar_position: 15
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/software-engineering-insights/rss.xml" />

These release notes describe recent changes to Harness Software Engineering Insights.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## March 2024

### Version 202403.1

#### New features and enhancements

* Added support for displaying the latest pipeline execution link for the **CICD Job Count Report**, **CICD Pipeline Jobs Duration Trend Report**, **CICD Job Duration Report**, **CICD Pipeline Jobs Count Trend Report**, **CICD Pipeline Jobs Duration Report**, **DORA Deployment Frequency & Change Failure Rate** reports. <br /> <br />
You can now view the latest pipeline execution link as a column in the drill-down view of the reports. By clicking on the link, you will be redirected to the corresponding **GitLab** pipeline execution tab. Please note that this feature is only available for reports generated using a [GitLab Cloud integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-gitlab) and will be available for newer or updated pipelines. To receive older pipeline data, please contact [Harness Support](mailto:support@harness.io). (SEI-2683) (SEI-3546) (SEI-5825)
* In the **Activity Logs** tab we have added the support for adding `Type` as a **Filter**. This allows you to filter the activity logs using filters such as Action, Email, and more. (SEI-5157) (SEI-5343)
* Users on the SEI Harness Platform will now have an improved navigation experience, eliminating the need to select **Collection Category** and **Collections** to access **Insights**. 
  * Now, when users create a new **Project**, they will be directed to a landing page where they can choose to create a new **Insight**. 
  * After logging in, users will be automatically directed to the **first Collection** and **Insight**. 
  * For existing logged-in users, the application will maintain their latest state and navigate them to the recently viewed Collection and Insight, ensuring a seamless continuation of their workflow. (SEI-5203) (SEI-5690)
* Improved the user experience on the Insights tab by enabling users to redirect to the **Integration Configuration** page when they click on the **Integrations Monitoring** icon. Additionally, renamed the `Last updated at` field to `Last ingested at` in the **Integration Monitoring** tab. (SEI-5342)
* Added support for configuring the **Deployment Frequency** and **Change Failure Rate** using the `Issue Created` event in the DORA profile definition. This will enable users to define the settings when utilizing any **Issue Management** tool as a medium to calculate Deployment Frequency or Change Failure Rate. (SEI-5422) (SEI-5931) (SEI-5933)
* Activity Logs data can now be exported by clicking the Export button located in the Activity Logs tab of the SEI application. (SEI-5449)
* The default time range for all the Sprint Metric reports has been updated from 2 weeks to 30 days. (SEI-5787)
* Added the ability to display the `Custom Field Key ID` from **Azure Boards** while configuring the **Filters** on the **Report**, **Collection** and **Profile** settings. Now, when configuring custom field Filters, the Custom Field Key ID associated with the field is displayed for clarity. (SEI-5799) (SEI-5800) (SEI-5801)

#### Early access features

* A new **Diagnostics** page has been added to the application, which includes a system status section. Users can now access this page by selecting the Diagnostics tile in the Settings page. This new tab comprises of two sections: **Jobs status** and **Satellite status**, providing users with the most up-to-date health status information for both Jobs and Ingestion Satellite. (SEI-5818) <br /><br /> This new Diagnostics page feature is currently in `BETA` and is behind the Feature Flag `<SHOW_DIAGNOSTIC_TILE>`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.

#### Fixed issues

* There was an issue which was causing the ingestion to fail for the **Jira** integration. This issue has been resolved now. (SEI-5213)
* In the **Activity Logs**, the `Email` data field is now case-insensitive. This means that records will show up when searched, regardless of the case used. (SEI-5872)
* Copying the widget to another Insights was not functioning properly, causing the application to freeze. This issue has now been fixed. (SEI-5879) (SEI ON HARNESS)
* The bug in the **Issue Hotspot Report**, which caused the drilldown to not display any value when the widget was configured with `Issue Type` as a **Filter**, has been resolved. (SEI-5906)
* The issue where **Jira's priority field** values were not appearing in the drill down when defined differently from P0, P1, etc., has been resolved to include various definitions of priority. (SEI-5949)
* The issue of making changes to the **Collection** definition and saving them not working as intended has been resolved. Now, when you save any new changes, an alert dialog will be displayed. Upon clicking on the save button, the changes will be saved successfully. (SEI-5983)
* In the **Collection** definition, when applying **Filters**, the expectation was for the **Azure Repos** and **Bitbucket** repository name to start with an uppercase letter. This issue has been fixed to ensure that the repository list no longer requires the first letter to be capitalized. This resolves the case sensitivity filter problem. (SEI-6018)
* The bug in the **Collection** definition that was causing a limitation on filtering repositories beyond the first 1000 has been resolved. This fix enables users to search for and select repositories from all available options when filtering the results. (SEI-6046)
* On SEI Harness Platform, the addition of notes on **Insights** was throwing an error. This has been resolved. (SEI-5880)

## February 2024

### Version 202402.2

#### New features and enhancements

* Added the ability to display the `Custom Field Key ID` from **Jira** while configuring the **Filters** on the **Report**, **Collection** and **Profile** settings. Now, when configuring custom field **Filters**, the `Custom Field Key ID` associated with the field is displayed for clarity. (SEI-5184) (SEI-5609)
* Added support to view files based on page size selection in the **Issue Hotspot** report and **Support Hotspot** report. (SEI-5546)
* In the **Sprint Reports**, support has been added to include all tickets that were initially committed at the beginning of the sprint irrespective of their final status in the sprint as part of the metric calculation. (SEI-5736)

#### Early access features
  
* Improved the ingestion logic to fetch information for the **Pull Request** related to the **Development Field** in the work item in **Azure Boards** for the **Azure DevOps** integration. Please note that this feature is currently in `BETA`. Contact [Harness Support](mailto:support@harness.io) to enable this feature. (SEI-2265) (SEI-5064) (SEI-5065)
* The release includes a new integration for the **Rally Software**.
  Rally is a web-based platform for managing and tracking the entire application development lifecycle, including project management, release planning, iteration planning, and defect tracking. (ECOE-3) <br/> <br/>
  To learn more, go to [Rally integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-rally). <br/> <br/>
  This feature is currently in `BETA` is accessible behind the entitlement `<RALLY>`. Please contact [Harness Support](mailto:support@harness.io) to enable this feature.

#### Fixed issues

* In the **Collection** definition, when applying **Filters**, the expectation was for the repository name to start with an uppercase letter. This issue has been fixed to ensure that the repository list no longer requires the first letter to be capitalized. This resolves the case sensitivity filter problem. (SEI-5804)

### Version 202402.1.1

#### Hotfix

* In the **Issues Report**, there was an existing bug where the `Worktype Exclude` filter was not allowing the addition of multiple values for a given custom field. This has been fixed and now the filter functions correctly. (SEI-5225)
* Renamed the label in the **Integration Monitoring** tab from `FAILED` to `WARNING` for ingestion jobs that have failed due to some reason in the past 7 days. (SEI-5415)
* There was an existing issue in the **Sprint Metric Single Stat** reports where clicking on `commit tickets` was causing the app to crash. This has been resolved now. (SEI-5372)
* Support has been added for displaying only items with an associated **Pull Request** in the **Issue Lead Time by Stage** report, **DORA Lead Time, and Mean Time** reports for the Jira integration. The **Ticket Details** page now displays a table of **Associated PRs**. This feature is currently supported only for Jira. (SEI-5604)(SEI-5667)
* Added the capability to ingest all types of pipeline data, including pipelines with the status `WAITING`, from **Azure Pipelines** for the **Azure DevOps** integration. (SEI-5378)
* Improved the ingestion logic for `commits` related to a **Pull Request** for the **GitHub** and **GitLab** integration. The maximum number of commits fetched for a pull request is now limited to 250. (SEI-5858)

### Version 202402.1

#### New features and enhancements

* Added the support to enable the addition of stages based on **Jira Status** categories as a filter in the **Velocity Lead Time type Workflow profile** setting. As a result, all the statuses that fall under each category will belong to a particular stage. This feature can be linked to the [Lead Time in Stages report](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/lead-time-reports#lead-time-by-time-spent-in-stages-report) and the [Jira releases report](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/issues-reports#configure-the-jira-releases-report). (SEI-5040) (SEI-5108)
* Improved the calculation logic for the average field across various **Single Stat reports**. Now the field is calculated based on the configured/selected calendar date. (SEI-5072)
* In the **SCM PRs Single Stat report**, we have added the support to select any time range by using the calendar component to view the PRs based on the selected metric. (SEI-5073)
* Added the support for a **New Propel node** that gets the data for a GitHub team (repositories and its members) from GitHub. (SEI-5136)
* In the **SCM Files report** we have added the ability to view the files as per the configured page size selection in the report settings. (SEI-5158)
* Added the capability for users to select only those items that have **Associated Pull Requests (PRs)** in the widget-level settings of the following reports - **Issue Lead Time by Stage report**, **DORA Lead Time** and **DORA Mean Time report**. This improvement will enable the calculation of the lead time metric for only those tickets that have associated PRs. (SEI-5424)
* Improved the UX on the Collections definition page by allowing for better visibility of the integration name. (SEI-5298)
* Improved the user experience on the Insights page. Now if a user clicks on the integration, it will redirect to its integration configuration page. The terminology for `Last Updated At` is changed to `Last Ingested At`. (SEI-5342)

#### Early access features

* Added the support for re-authentication for [Jira](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-jira-easyonboarding) and [GitHub](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-github-easyonboarding) integrations. The new experience for the re-authentication flow for the Jira and GitHub integration is accessible behind the entitlement `<SHOULD_ENABLE_REAUTH>`. Please contact [Harness Support](mailto:support@harness.io) to enable this feature. (SEI-5188)

#### Fixed issues

* In the **Issue Backlog Trend Report**, there was a bug where the `Ticket Lifetime` field appeared the same for all tickets. This has been fixed and now the field has been replaced with the `Resolution Time` column. (SEI-1999)
* There was an existing bug in the **Issue Hygiene Report** where removing the criteria did not update the hygiene score in the widget. This has been resolved and now the data is displayed correctly in the report. (SEI-4645)
* There was some inconsistency in the data displayed on the **Sprint Metrics Trend Report** when using [Azure DevOps](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-azure-devops) as the integration for the **Issue Management Tool**. This has been fixed now. (SEI-4690)
* In the **Lead time by Time Spent in Stages report** there was an issue where in the extended drill-down view the data was displayed incorrectly. This has been resolved now. (SEI-4753)
* In the [Jira](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-jira) integration, there was a bug where the **Custom Hygienes** were displayed as blank and were only showing story points as the criteria to define the hygiene misses. This has been fixed now. (SEI-5076)
* There was a bug where integrations created using the [GitHub App](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-github-easyonboarding#configure-the-integration-using-the-github-app) were not ingesting data due to repositories not being selected during the integration creation. This has been fixed and now the ingestion should start automatically as the integration is created. (SEI-5223)
* In the **Issue Backlog Trend report** and the **SCM Issues Resolution Time Report** drill-down, there was an issue where the `Ticket Lifetime (Resolution Time)` column data was not visible in the downloaded CSV file. This issue has been resolved now. (SEI-5237) (SEI-5269)
* There were two known issues in the **Sprint Metrics Report** related to how certain Jira tasks/items were being counted.
  * Some Jira tasks were still appearing in the report even after they had been removed during the middle of the sprint. This happened because these tasks were included when generating metrics for the report. This has been fixed and now any tasks which are deleted mid-sprint will not appear in the Report. (SEI-5259)
  * The report incorrectly identified some tasks as falling outside of their designated sprint period. This has been resolved to identify issues added in the sprint based on the `Start Date` and `End Date` of the sprint. (SEI-5406)

### Version 202401.2.1

#### Hotfix

* In the **Issues Report**, there was an existing bug where the `Worktype Exclude` filter was not allowing the addition of multiple values for a given custom field. This has been fixed and now the filter functions correctly. (SEI-5225)
* Renamed the label terminology in the **Integration Monitoring** tab from `FAILED` to `WARNING` for ingestion jobs that have failed due to some reason in the past 7 days. (SEI-5415)
* There was an existing issue in the **Sprint Metric Single Stat reports** where clicking on commit tickets was causing the app to crash. This has been resolved now. (SEI-5372)

## January 2024

### Version 202401.2

#### New features and enhancements

* Added the support for partial match functionality to the Code Area filter at the widget-level and collection-level settings. Now, you can apply the filter and select repositories using the `Starts With` and `Contains` conditions. (SEI-4812) (SEI-4873)
* Added exclude support for the code area filter to all widgets. (SEI-4943)
* Improved tooltip messaging for the configuration settings on the Code Area filter. (SEI-5006)
* In the Lead Time in Stages report, the filter name `'RELEASE DATE IN'` has been renamed to `'Jira Release Date In'` (SEI-4947) (SEI-5156).

#### Early access features

* The release includes a new user onboarding flow for the Jira and GitHub integration, focused on simplifying and streamlining the user journey (SEI-3727). The following support has been added as part of this change:
  * Added support for configuring the Jira Cloud integration using the new Jira Connect App.
  * Added support for configuring the GitHub Cloud integration using the new GitHub App.
  * Improved the user experience for configuring the Jira integration on Cloud and Jira Data Centers.
  * Enhanced the user experience for configuring the GitHub integration on Cloud and Enterprise.
  
  
  The new experience for the Jira integration is accessible behind the Feature Flag `<SEI_EASY_ONBOARDING_JIRA>`, and the new experience for the GitHub integration is available behind the Feature Flag `<SEI_EASY_ONBOARDING_GITHUB>`. Please contact Harness Support to enable this feature.

#### Fixed issues

* The bug in the Trellis score by Collections report, where the scorecard hyperlink for the collection was broken, has now been fixed. (SEI-5019)
* There was an existing issue where the report was showing as not being supported when more than one Trend Report was added to the Insight. This has been resolved. Now, you can add multiple trend reports to the Insight (SEI-5128)
* In the Jira integration settings there was a bug where users were unable to save custom hygiene fields. This has been fixed now. (SEI-5152)

### Version 202401.1

#### New features and enhancements

* Added correlation support for mapping Jenkins CI artifacts with Harness CD. Now when configuring stages for a workflow profile, selecting Jenkins as the CI provider now allows you to define Harness CD in the subsequent stage for mapping artifact data. (SEI-2848) (SEI-4623) (SEI-4624) (SEI-4625) (SEI-4626)
* Optimized the [Sprint Metrics Trend Report](/docs/software-engineering-insights/sei-metrics-and-reports/velocity-metrics-reports/planning-sprint-metrics) to update the extended view and display data only when a new filter is applied. (SEI-4739) (SEI-4702) (SEI-4876)
* Added the support for configuring stages and steps as a filter for Azure DevOps pipelines in the Deployment Frequency and Change Failure Rate report settings. (SEI-4814)
* Improved the ingestion logic for the [HarnessNG Integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-harnessng) to support data retrieval for non-container type artifact deployments. (SEI-4912)
* Enhanced the Lead Time by Time Spent in Stages report to make `ISSUE RESOLVED IN` a mandatory filter when the associated profile in the report settings has a Jira Release stage configured. (SEI-4668)

#### Fixed issues

* There was a bug associated with the Azure DevOps integration that caused incorrect redirection for commit links in the reports. This issue has been resolved now. (SEI-4768)

## December 2023

Software Engineering Insights documentation is live on the Harness Developer Hub. Check back soon for module release notes.
