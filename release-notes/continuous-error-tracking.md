---
title: Continuous Error Tracking release notes
sidebar_label: Continuous Error Tracking
tags: [NextGen, "cet"]
date: 2023-07-21T17:20
sidebar_position: 11
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
import delete_project from './static/delete-project.png'
```

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/continuous-error-tracking/rss.xml" />

Review the notes below for details about recent changes to Continuous Error Tracking. For release notes for Harness Self-Managed Enterprise Edition, go to [Self-Managed Enterprise Edition release notes](/release-notes/self-managed-enterprise-edition). Additionally, Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.


:::info note
Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features and fixes that these release notes describe may not be immediately available in your cluster. To identify the cluster that hosts your account, go to the **Account Overview** page.
:::

## Latest - July 14, 2023, version ET-Agent 5.5.0

```mdx-code-block
<Tabs>
  <TabItem value="What's new">
```


This release does not include new features and enhancements.


```mdx-code-block
  </TabItem>
  <TabItem value="Early access">
```


This release does not include any early access features.


```mdx-code-block
  </TabItem>
  <TabItem value="Fixed issues">
```


- The CET Agent had missing tiny links on some logs when using Log4j2. (CET-894)
  
  This issue has been resolved. Now, the tiny links appear consistently in Log4j2 logs.


```mdx-code-block
  </TabItem>
</Tabs>
```


## Previous releases

<details>
<summary>2023 releases</summary>

#### July 21, 2023, Hotfix version ET-Service 5.24.7

- The Events Summary page timed out in some instances when events marked as resolved caused slowness while fetching summary data. (CET-1569)  

   This issue has been resolved. Now, the Events Summary page loads faster and does not time out.

#### June 27, 2023, versions ET-Service 5.24.3 and ET-Collector 5.24.3

##### What's new

This release does not include new features and enhancements.

##### Early access

This release does not include any early access features.

##### Fixed issues

- Notifications created in the SRM module could not be edited when using the CET module.(CET-1295)

  This issue has been resolved. Now, you can edit notifications within the CET module, even if they were originally created in the SRM module.

- The configured notification count on the Monitored Services listing page of the CET module displays notifications for all types of alerts related to a particular monitored service. (CET-1294)
  
  This issue has been resolved. Now, the notification list on the Monitored Services page of the CET module shows only the notifications for Code Errors.

- The events list disappears from the Events Summary page, despite having multiple agents running. (CET-1517)

  The issue was caused when the same event occurred across two deployments and environments. This issue has been resolved. The Events Summary page now accurately renders the events list, regardless of the occurrence of the same event across multiple deployments.


#### June 09, 2023, Hotfix version ET-Service 5.23.1

- CET Agents that were started without providing an agent token are not appearing on the list of running agents. (CET-1411)  
  
  This issue has been resolved. Now, all running agents, regardless of the presence of an agent token, are properly displayed on the running agents list.


#### June 09, 2023, versions ET-Service 5.23.0 and ET-Collector 5.23.0

##### What's new

- Now, when you create a Jira ticket for an event, CET prompts you to complete any mandatory fields that do not have a default value. (CET-1231)

- You can now conveniently access a comprehensive list of all active agents running across your entire account directly from the subscription page. (CET-1225)

##### Early access

This release does not include any early access features.

##### Fixed issues

- Caught exceptions are displayed as uncaught exceptions on the event list. (CET-1388)  
  
  This issue has been resolved. Now, the caught exceptions are being displayed correctly.

- Agents are being incorrectly displayed as **Registered** or **Peer closed** on the status page while still in the process of connecting. (CET-1359)  
  
  This issue has been fixed. The status page now correctly reflects the actual status of agents.


#### May 25, 2023, versions ET-Service 5.22.0 and ET-Collector 5.22.0

##### What's new

This release does not include new features and enhancements.

##### Early access

This release does not include any early access features.

##### Fixed issues

- The CET Agent list is failing to load correctly when running in SMP installations with Postgres. (CET-1279)   
  
  The issue has been resolved. The CET Agent list now loads properly in SMP installations with Postgres.
  

#### May 09, 2023, versions ET-Service 5.21.0 and ET-Collector 5.19.2

- The Events Summary page is taking longer (exceeding eight hours) to display the events. (CET-1356)  
  
    This issue has been resolved. Now, the events are being displayed on the Events Summary page within a couple of minutes.

- The Agent List page throws an error instead of displaying an empty table when a project has no connected agents. (CET-1282)  

    This issue has been resolved. Now, when a project has no connected agents, the Agent List page displays an empty table.

- The code error related pages and components do not refresh when changing projects. (CET-1235)  
  
    This issue has been resolved. Now, the code error related pages and components get automatically updated when changing projects.

- The search box on the Agent List page is not working. (CET-1299)  
  
    This issue has been fixed. Now, you can search for agents using the search box.

- The event list, when viewed from a CI pipeline, does not include the cards above the list that show the number of total, new, critical, and resurfaced events. (CET-1249)
  
    This issue has been fixed, and the cards are now displayed on the event list when viewed from a CI pipeline.

- The Impacted Services column is displayed in the event list when viewed from the CI pipeline. (CET-1232)  
  
    This issue has been fixed, and now the Impacted Services column is not being displayed.

#### May 08, 2023, version 79111

Harness Continuous Error Tracking (CET) is now available for public preview to provide developer-first observability for modern applications. This is the first release of CET and the module is now available for Public Preview.
As the latest module in the Harness Platform, CET helps developers proactively identify and resolve errors across the entire software delivery lifecycle (SDLC).

Here are CET’s key features:

- Exception/error event summary: Provides a dashboard summary of all error events related to your monitored services.
- Event explorer: Provides a list of all error events for a specific monitored service and deployment version.
- Automated Root Cause Analysis (ARC) screen: Provides a powerful mechanism to view every exception’s source code, variables, and environment state.
- Hidden, resolved, and resurfaced events: Helps you manage and troubleshoot the events and exceptions by providing the ability to mark them as hidden, resolved, or resurfaced.
- Critical events: Enables you to add a condition that specifies when an event should be marked as critical.
- Source Attach: Connects your Git source repositories to Harness CET, allowing Harness CET to display the original source code in the ARC screen for an event.
- Shift Left with Harness CI integration: CET natively integrates into Harness Continuous Integration so that developers can run their unit tests and integration and detect errors early in the SDLC.
- JIRA integration: Allows you to create and view Jira tickets for a specific event.


</details>
