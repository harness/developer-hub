---
title: Continuous Error Tracking release notes
sidebar_label: Continuous Error Tracking
tags: [NextGen, "cet"]
date: 2023-05-02T10:55
sidebar_position: 11
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
import delete_project from './static/delete-project.png'
```
Review the notes below for details about recent changes to Continuous Error Tracking.

:::info note
Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features and fixes that these release notes describe may not be immediately available in your cluster. To identify the cluster that hosts your account, go to the **Account Overview** page.
:::

## Latest - May 09, 2023, versions et-service 5.21.0 and et-collector 5.19.2

```mdx-code-block
<Tabs>
  <TabItem value="What's new">
```
This release does not include new features.

```mdx-code-block
  </TabItem>
  <TabItem value="Early access">
```
This release does not include any early access features.

```mdx-code-block
  </TabItem>
  <TabItem value="Fixed issues">
```

- The Events Summary page is taking longer (exceeding eight hours) to display the events. (CET-1356)  
  
    This issue has been resolved. Now, the events are being displayed on the Events Summary page within a couple of minutes.

- The Agent List page throws an error instead of displaying an empty table when a project has no connected agents. (CET-1282)  

    This issue has been resolved. Now, when a project has no connected agents, the Agent List page displays an empty table.

- The code error related pages and components do not refresh when changing projects. (CET-1235)  
  
    This issue has been resolved. Now, the code error related pages and components get automatically updated when changing projects.

- The search box on the Agent List page is not working. (CET-1299)  
  
    This issue has been fixed. Now, you can search for agents using the search box.

- Currently, the event list, when viewed from a CI pipeline, does not include the cards above the list that show the number of total, new, critical, and resurfaced events. (CET-1249)
  
    This issue has been fixed, and the cards are now displayed on the event list when viewed from a CI pipeline.

- The Impacted Services column is displayed in the event list when viewed from the CI pipeline. (CET-1232)  
  
    This issue has been fixed, and now the Impacted Services column is not being displayed.


```mdx-code-block
  </TabItem>
</Tabs>
```

## Previous releases

<details>
<summary>2023 releases</summary>


#### May 08, 2023, version 79111

Harness Continuous Error Tracking (CET) is now available for public preview to provide developer-first observability for modern applications. This is the first release of CET and the module is now available for Public Preview.
As the latest module in the Harness Platform, CET helps developers proactively identify and resolve errors across the entire software delivery lifecycle (SDLC).

Here are CET’s key features:

- Exception/error event summary: Provides a dashboard summary of all error events related to your monitored services.
- Event explorer: Provides a list of all error events for a specific monitored service and deployment version.
- Automated Root Cause Analysis (ARC) screen: Provides a powerful mechanism to view every exception’s source code, variables, and environment state.
- Hidden, resolved, and resurfaced events: Helps you manage and troubleshoot the events and exceptions by providing the ability to mark them as hidden, resolved, or resurfaced.
Critical events: Enables you to add a condition that specifies when an event should be marked as critical.
- Critical events: Allows you to add a condition that specifies when an event should be marked as critical.
- Source Attach: Connects your Git source repositories to Harness CET, allowing Harness CET to display the original source code in the ARC screen for an event.
- Shift Left with Harness CI integration: CET natively integrates into Harness Continuous Integration so that developers can run their unit tests and integration and detect errors early in the SDLC.
- JIRA integration: Allows you to create and view Jira tickets for a specific event.


</details>
