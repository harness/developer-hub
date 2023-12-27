---
title: Continuous Error Tracking release notes
sidebar_label: Continuous Error Tracking
tags: [NextGen, "cet"]
date: 2023-11-02T17:20
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import delete_project from './static/delete-project.png'


<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/continuous-error-tracking/rss.xml" />

These release notes describe recent changes to Harness Continuous Error Tracking.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## December 2023

### Versions ET-Service 5.32.2 and ET-Collector 5.32.3

<!-- December 18, 2023 -->

#### New features and enhancements

- Improve the design of the format selection in the notification wizard. (CET-1944)

#### Fixed issues

- Incorrect characters were allowed in the name of the agent configuration. Now, only allowed characters can be used. (CET-1785)

- Events plotted by the Event Distribution graph did not refresh if an event was marked as hidden or resolved. Now, changes to the state of the events will display properly on the Event Distribution graph. (CET-1949)

- Improved input validation in the notification dialog box. Missing values or incorrect values would not be allowed. (CET-1990, CET-1989)

- Tiny links would direct to 404 if the event was missing. Now, if an event cannot be found, the tiny links direct to the CET page and show an error message. (CET-1991)

- Various dependencies were upgraded to prevent security issues. (CET-2032)

### Versions ET-Service 5.31.0 and ET-Collector 5.31.0

<!-- December 01, 2023 -->

#### Fixed issues

- The Events list would reset if an event that was not on the first page got resolved. Now, resolving an event that is not on the first page does not reset the list. (CET-1775)
  
- Events plotted by the Event Distribution graph did not represent newly occurred events. Now, recently occurred events display properly on the Event Distribution graph. (CET-1825)

- The Agents page did not show a refresh button when no agents were connected. Now, the refresh button appears even when no agents are connected. (CET-1829)

- Deletion of a saved search didn't delete the associated notifications. Now, when a saved search is deleted, all its notifications are deleted with it. (CET-1947)

- Logged Error events were incorrectly shown as Logged Warning events. Now, these events are displayed correctly. (CET-1971)

- Saved search notifications could fire even when the event count was 0. Now, saved search notifications do not fire if the event count is 0. (CET-1972)

- Tiny links would direct to 404 if the event was missing. Now, if an event cannot be found, the tiny links direct to the CET page and show an error message. (CET-1991)

### Version ET-Agent 5.7.0 

<!-- December 01, 2023 -->

#### Mac support (CET-59)

Added support for Mac. Support includes Intel and Apple M1/M2 chips. 

#### Fixed issues

- The CET Agent might continuously try to reconnect while using incorrect credentials. (CET-1793)
  
  This issue has been resolved. Now, the CET Agent would stop reconnecting if the wrong credentials are being used.

- The CET Agent (v5.6.0) was having some incompatibilities with some APM agents like AppDynamics and NewRelic. (CET-1863)
  
  This issue has been resolved. The CET Agent is again compatible with other APM agents.

- The CET Agent might cause a steep increase of memory in some scenarios. (CET-1867)
  
  This issue has been resolved. The CET Agent memory consumption have been substantially reduced.

## November 2023

### Versions ET-Service 5.30.0 and ET-Collector 5.30.0

<!-- 02 Nov 2023 -->

#### New features and enhancements

- The Summary page loads faster, ensuring a better user experience. (CET-1233)
- The event distribution chart now supports plotting a graph for new events. (CET-1610)
- Various dependencies were upgraded to prevent security issues. (CET-1880)

#### Fixed issues

- The ARC screen displayed variables that appeared expandable but were unresponsive. This issue has been resolved. Now, variables display the expansion arrow only if there is data to display. (CET-1116)
- Events plotted by the Event Distribution graph did not consistently represent the top occurring events. This issue has been resolved. Now, the events on the Event Distribution graph are consistently the top occurring events. (CET-1745)
- After implementing Saved Filters, the event distribution chart was not functioning properly, preventing the filtering of events by type or status. This issue has been resolved. Now, filtering on the chart is working as expected. (CET-1784)
- The event distribution chart allowed zooming in up to the seconds, which caused confusion with the displayed numbers. This issue has been resolved. Now, zooming is limited to the minute, ensuring consistency with the graph axis. (CET-1810)
- Filters could be saved without any actual filtering. This issue has been resolved. Now, filters can be saved only with applied criteria. (CET1844)
- It was difficult to identify the managed filters button in the saved searches drop-down compared to other filters. This issue has been resolved. Now, the managed filters button is easier to identify and use. (CET-1847)
- Editing a saved filter redirects to the Events list. This issue has been resolved. Now, editing a saved filter redirects to the 'Manage saved filters' dialog. (CET-1848)
- Leaving the Events page does not prompt a warning about unsaved changes. This issue has been resolved. Now, when there are unsaved changes, a warning message appears. (CET-1850)
- The CET integration with CD was broken, resulting in no events appearing when using CET in a deployment pipeline. This issue has been resolved. Now, events appear as expected when using CET in a deployment pipeline. (CET-1895)

## October 2023

### Versions ET-Service 5.29.3 and ET-Collector 5.29.0

<!-- 19 Oct 2023 -->

#### Fixed issues

- The total number of new, resurfaced, and critical events displayed on the Event Summary page did not match the counts on the Event List page. This issue has been resolved. Now, the total number of new, resurfaced and critical events is consistent across both the Event Summary and Event List pages.
 (CET-1233)
- Previously, when new events were marked as hidden or resolved and moved to their respective **Hidden** or **Resolved** tabs, the total event count on the event list remained the same. Now, when new events are marked as hidden or resolved and moved to their respective **Hidden** or **Resolved** tabs, the **New** label is removed, and these events no longer contribute to the event count on the Events page. (CET-1747)
- Previous, you had to select **Add** or **Delete** multiple times when adding or deleting a critical event. This issue has been resolved. Now, you can add and delete events with a single click. (CET-1877)

### Versions ET-Service 5.28.2 and ET-Collector 5.28.0

<!-- 07 Oct 2023 -->

#### New features and enhancements

Event filtering has been enhanced by removing event type selector boxes and displaying event counts above the events list. Additionally, a multi-select dropdown for event types has been introduced for improved usability. (CET-1698)

#### Fixed issues

Previously, there was no confirmation prompt when deleting a notification rule. This issue has been resolved. Now, a confirmation window is displayed when deleting a notification rule. (CET-1713)

## September 2023

### Versions ET-Service 5.27.1 and ET-Collector 5.27.0

<!-- 29 Sept 2023 -->

#### Fixed issues

Previously, when the monitored service information was incorrect, the agent logs did not provide a clear error message. This issue has been resolved. Now, the error message has been improved to indicate the monitored service details. (CET-1533)

### Version ET-Agent 5.6.0

<!-- 26 Sept 2023 -->

#### Fixed issues

- The CET Agent was causing the app to not close properly in specific scenarios when events needed to be collected during shutdown. This issue has been resolved. Now, the CET Agent no longer interferes with the proper app shutdown process. (CET-344)
- The CET Agent was experiencing degraded performance during application startup when used in conjunction with APM agents such as AppDynamics, New Relic, Datadog, and so on. This issue has been resolved. The CET Agent's performance during application start-up is now optimized and no longer degrades when used with APM agents. (CET-1675)
- Applications with CET Agents installed experienced start-up delays. This issue has been resolved by updating the predefined filters. Now, start-up delays have been substantially reduced. (CET-1738)

### Version ET-Service 5.26.1

<!-- 14 Sept 2023 -->

#### New features and enhancements

- On the ARC screen, variables now display their values on hover. Additionally, when you select a variable, it is highlighted in the variables panel for easy identification. (CET-970)
- CET now provides an audit trail feature for Agent Tokens and Critical Event definitions. You can view the audit trail for create, update, and delete operations, enhancing visibility and security in token management. (CET-1364)

#### Fixed issues

- On the ARC screen, some variables were not displaying values. This issue has been resolved. Now, values are displayed for all variables on the ARC screen. (CET-1122)
- When configuring notifications for code errors and selecting the **Any** option, the **Timeout Error** type was incorrectly listed as one of the choices in the dropdown menu. This issue has been resolved. Now, when configuring notifications for code errors and selecting the **Any** option, the **Timeout Error** type is not listed in the dropdown menu. (CET-1514)
- Clear filters button on the Event Summary screen was enabled, even though it was supposed to be disabled when nothing is filtered yet. This issue has been resolved. Now, the Clear filters button on the Event Summary screen is correctly disabled when no filters are applied. (CET-1613)
- Role-Based Access Control (RBAC) was missing at both the Project and Organization levels. This issue has been resolved. Now, RBAC has been implemented at both the Project and Organization levels. (CET-1701)
- Previously, child events within a group were not displayed according to the filter criteria, leading to inconsistent filtering. This issue has been resolved. Now, child events within a group are correctly displayed according to the selected filter criteria, ensuring accurate event list filtering. (CET-1744)

## August 2023

### Version ET-Service 5.25.10

<!-- 30 Aug 2023 -->

#### Hotfix

- The search functionality in the events list was not working. This issue has been resolved. Now, when you enter a value in the Search field, CET searches the Description and the Location columns in the Events List for matching values. (CET-1618)
- New events did not appear in the events list. This issue has been resolved. Now, the Events List displays all events. (CET-1632)

### Versions ET-Service 5.25.9 and ET-Collector 5.25.3

<!-- 21 Aug 2023 -->

#### New features and enhancements

- Various dependencies were upgraded to prevent security issues. (CET-1571)
- The default time period on the Events Summary page has been adjusted to one hour. (CET-1576)

#### Fixed issues

- When a monitored service was created with spaces or special characters in the name, the monitored service was not appearing in the list. This issue has been resolved. Now, you can create monitored services with names containing spaces, hyphens (`-`), or underscores (`_`). However, if you attempt to use any other special characters, an error message will appear. (CET-1551)
- The Events Summary page was timing out when fetching data, especially for events marked as resolved. This issue has been resolved. The Events Summary page now loads significantly faster. (CET-1569)
- Previously, you wouldn't receive notifications when relevant events were generated. This issue has been resolved. Now, notifications are sent when relevant events occur. (CET-1585)
- The ARC screen was unable to fetch source attach data. This issue has been resolved. You can now view source attach data directly on the ARC screen. (CET-1685)
- The Events Summary page was not displaying the event status for new, resurfaced, and critical events. This issue has been resolved. On the Events Summary page, you will now see the appropriate status indicators for new, resurfaced, and critical events. (CET-1686)

## July 2023

### Version ET-Service 5.24.7

<!-- 21 July 2023 -->

#### Hotfix

The Events Summary page timed out in some instances when events marked as resolved caused slowness while fetching summary data. This issue has been resolved. Now, the Events Summary page loads faster and does not time out. (CET-1569)

### Version ET-Agent 5.5.0

<!-- 14 July 2023 -->

#### Fixed issues

The CET Agent had missing tiny links on some logs when using Log4j2. This issue has been resolved. Now, the tiny links appear consistently in Log4j2 logs. (CET-894)

## June 2023

### Versions ET-Service 5.24.3 and ET-Collector 5.24.3

<!-- 27 June 2023 -->

#### Fixed issues

- Notifications created in the SRM module could not be edited when using the CET module. This issue has been resolved. Now, you can edit notifications within the CET module, even if they were originally created in the SRM module. (CET-1295)
- The configured notification count on the Monitored Services listing page of the CET module displays notifications for all types of alerts related to a particular monitored service. This issue has been resolved. Now, the notification list on the Monitored Services page of the CET module shows only the notifications for Code Errors. (CET-1294)
- The events list disappears from the Events Summary page, despite having multiple agents running. The issue was caused when the same event occurred across two deployments and environments. This issue has been resolved. The Events Summary page now accurately renders the events list, regardless of the occurrence of the same event across multiple deployments. (CET-1517)

### Version ET-Service 5.23.1

<!-- 09 June 2023 -->

#### Hotfix

CET Agents that were started without providing an agent token are not appearing on the list of running agents. This issue has been resolved. Now, all running agents, regardless of the presence of an agent token, are properly displayed on the running agents list. (CET-1411)

### Versions ET-Service 5.23.0 and ET-Collector 5.23.0

<!-- 09 June 2023 -->

#### New features and enhancements

- Now, when you create a Jira ticket for an event, CET prompts you to complete any mandatory fields that do not have a default value. (CET-1231)
- You can now conveniently access a comprehensive list of all active agents running across your entire account directly from the subscription page. (CET-1225)

#### Fixed issues

- Caught exceptions are displayed as uncaught exceptions on the event list. This issue has been resolved. Now, the caught exceptions are being displayed correctly. (CET-1388)
- Agents are being incorrectly displayed as **Registered** or **Peer closed** on the status page while still in the process of connecting. This issue has been fixed. The status page now correctly reflects the actual status of agents. (CET-1359)

## May 2023

### Versions ET-Service 5.22.0 and ET-Collector 5.22.0

<!-- 25 May 2023 -->

#### Fixed issues

The CET Agent list is failing to load correctly when running in SMP installations with Postgres. The issue has been resolved. The CET Agent list now loads properly in SMP installations with Postgres. (CET-1279)

### Versions ET-Service 5.21.0 and ET-Collector 5.19.2

<!-- 09 May 2023 -->

#### Fixed issues

- The Events Summary page is taking longer (exceeding eight hours) to display the events. This issue has been resolved. Now, the events are being displayed on the Events Summary page within a couple of minutes. (CET-1356)
- The Agent List page throws an error instead of displaying an empty table when a project has no connected agents. This issue has been resolved. Now, when a project has no connected agents, the Agent List page displays an empty table. (CET-1282)
- The code error related pages and components do not refresh when changing projects. This issue has been resolved. Now, the code error related pages and components get automatically updated when changing projects. (CET-1235)
- The search box on the Agent List page is not working. This issue has been fixed. Now, you can search for agents using the search box. (CET-1299)
- The event list, when viewed from a CI pipeline, does not include the cards above the list that show the number of total, new, critical, and resurfaced events. This issue has been fixed, and the cards are now displayed on the event list when viewed from a CI pipeline. (CET-1249)
- The Impacted Services column is displayed in the event list when viewed from the CI pipeline. This issue has been fixed, and now the Impacted Services column is not being displayed. (CET-1232)

### Platform version 79111

<!-- 08 May 2023 -->

#### New features and enhancements

Harness Continuous Error Tracking (CET) is now available for public preview to provide developer-first observability for modern applications. This is the first release of CET and the module is now available for Public Preview.

As a new module in the Harness Platform, CET helps developers proactively identify and resolve errors across the entire software delivery lifecycle (SDLC).

CET's key features include:

- Exception/error event summary: Provides a dashboard summary of all error events related to your monitored services.
- Event explorer: Provides a list of all error events for a specific monitored service and deployment version.
- Automated Root Cause Analysis (ARC) screen: Provides a powerful mechanism to view every exception's source code, variables, and environment state.
- Hidden, resolved, and resurfaced events: Helps you manage and troubleshoot the events and exceptions by providing the ability to mark them as hidden, resolved, or resurfaced.
- Critical events: Enables you to add a condition that specifies when an event should be marked as critical.
- Source Attach: Connects your Git source repositories to Harness CET, allowing Harness CET to display the original source code in the ARC screen for an event.
- Shift Left with Harness CI integration: CET natively integrates into Harness Continuous Integration so that developers can run their unit tests and integration and detect errors early in the SDLC.
- JIRA integration: Allows you to create and view Jira tickets for a specific event.

<!-- Below commented content is a placeholder in preparation for Q1 2024: -->

<!-- ## Previous releases

### 2023 releases

<details>
<summary>2023 releases</summary>

</details>

-->
