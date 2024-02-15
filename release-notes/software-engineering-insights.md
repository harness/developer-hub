---
title: Software Engineering Insights release notes
sidebar_label: Software Engineering Insights
tags: [NextGen, "software engineering insights"]
date: 2023-09-01T10:00:10
sidebar_position: 15
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/software-engineering-insights/rss.xml" />

These release notes describe recent changes to Harness Software Engineering Insights.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## February 2024

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
