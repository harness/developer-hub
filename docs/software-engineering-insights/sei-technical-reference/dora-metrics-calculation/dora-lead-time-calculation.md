---
title: DORA Lead Time Calculation
description: How is Lead Time calculated for DORA metrics on SEI?
sidebar_label: Lines of Code
sidebar_position: 10
---

### What is Lead Time?

The Lead Time calculation measures the total time taken from the moment a ticket is created to the point when it is released to production. Below are various use cases that demonstrate how Lead Time is calculated across different scenarios. 

### Calculation Example 1: One Pull Request associated with a Single Jira Ticket

<img
  src={require('./static/lead-time-example1.png').default}
  alt="Example banner" height="100%" width="100%" border="0"
/>

In this example, we consider a use case where a single pull request (PR) is associated with a single Jira ticket. The Lead Time calculation includes several stages as shown below.

The table provides details on the different stages, their descriptions, formulas, and an example calculation.

The Lead Time calculation in this case consists of the following stages:

| Stage | Description | Formula | Example |
|-------|--------------|----------|---------|
| Ticket In Progress Time | The time taken for a ticket to move from the `Created` state to the `In Progress` state. | `In Progress Time - Ticket Created Time` | 10:00 AM - 9:50 AM = 10 minutes |
| First Commit Time | The time taken to make the first commit after the ticket is in progress. | `First Commit Time - First In Progress Time` | 10:05 AM - 10:00 AM = 5 minutes |
| First Pull Request Creation Time | The time taken to create the first pull request (PR) after the first commit. | `First PR Creation Time - First Commit Time` | 10:10 AM - 10:05 AM = 5 minutes |
| First Pull Request Approval Time | The time taken for the first approval after the first pull request is created. | `First PR Approval Time - PR Creation Time` | 10:11 AM - 10:10 AM = 1 minute |
| Last Pull Request Merge Time | The time taken to merge the pull request after it is approved. | `Last PR Merged Time - First PR Approval Time` | 10:15 AM - 10:11 AM = 4 minutes |
| First Continuous Integration Time | The time taken for the first continuous integration (CI) process to complete after the last pull request is merged. | `First CI Time - Last PR Merged Time` | 10:16 AM - 10:15 AM = 1 minute |
| First Continuous Deployment Time | The time taken for the first continuous deployment (CD) process to complete after the CI process is finished. | `First CD Time - First CI Time` | 10:17 AM - 10:16 AM = 1 minute |
| First Issue Management Done Time | The time taken to mark the issue as `Done` in the Issue Management System (e.g., Jira) after the CD process is completed. | `First JIRA Done Time - First CD Time` | 10:20 AM - 10:17 AM = 3 minutes |
| First Release Time | The time taken to mark the issue as `Released` after it is marked as `Done` | Release Time - First JIRA Done Time | 11:00 AM - 10:20 AM = 40 minutes |

#### Total Lead Time

**Total Lead Time** is the sum of all the above stages:

```
Total Lead Time = 10 min + 5 min + 5 min + 1 min + 4 min + 1 min + 1 min + 3 min + 40 min
             = 70 minutes
```

Therefore, the Total Lead Time for Case 1 (1 PR to 1 Jira) is **70 minutes**.

### Calculation Example 2 - Two Sequential PRs associated with a Single Jira Ticket 

In the case where two pull requests (PRs) are associated with a single Jira ticket in a sequential manner, the Lead Time calculation can be broken down into the following stages.

The following table outlines the different stages, their descriptions, formulas, and example calculations.

| Stage | Description | Formula | Example |
|-------|--------------|----------|---------|
| Ticket In-progress Time | The time taken for a ticket to move from the 'Created' state to the 'In-Progress' state. | `In-Progress Time - Ticket Created Time` | `10:00 AM - 9:50 AM = 10 minutes` |
| First Commit Time | The time taken to make the first commit after the ticket is in progress. | `First Commit Time - First In-Progress Time` | `10:05 AM - 10:00 AM = 5 minutes` |
| First Pull Request Creation Time | The time taken to create the first pull request (PR) after the first commit. | `First PR Creation Time - First Commit Time` | `10:10 AM - 10:05 AM = 5 minutes` |
| First Pull Request Approval Time | The time taken to approve the first pull request after it is created. | `First PR Approval Time - PR Creation Time` | `10:11 AM - 10:10 AM = 1 minute` |
| Last Pull Request Merge Time | The time taken to merge the last (second) pull request after it is approved. | `Last PR Merged Time - First PR Approval Time` | `10:45 AM - 10:11 AM = 34 minutes` |
| First Continuous Integration Time | The time taken for the first continuous integration (CI) process to complete after the last pull request is merged. | `First CI Time - Last PR Merged Time` | `10:16 AM - 10:45 AM = 0 minute` |
| First Continuous Deployment Time | The time taken for the first continuous deployment (CD) process to complete after the CI process is finished. | `First CD Time - First CI Time` | `10:17 AM - 10:16 AM = 1 minute` |
| First Issue Management Done Time | The time taken to mark the issue as 'Done' in the issue management system (e.g., Jira) after the CD process is completed. | `First JIRA Done Time - First CD Time` | `10:20 AM - 10:17 AM = 3 minutes` |
| First Release Time | The time taken to mark the issue as 'Released' after it is marked as 'Done'. | `Release Time - First JIRA Done Time` | `11:00 AM - 10:20 AM = 40 minutes` |

For the given example, the Total Lead Time is calculated as the sum of all the above stages:

```
Total Lead Time = 10 min + 5 min + 5 min + 1 min + 34 min + 0 min + 1 min + 3 min + 40 min
             = 99 minutes
```

Therefore, the Total Lead Time for Case 2 (Two Sequential PRs to Single Jira Ticket) is **99 minutes**.

### Calculation Example 3 - Two Overlapping PRs associated with a Single Jira Ticket

In the case where two pull requests (PRs) are associated with a single Jira ticket in an overlapping manner, the lead time calculation can be broken down into the various stages.

The following table outlines the different stages, their descriptions, formulas, and example calculations.

| Stage | Description | Formula | Example |
|-------|--------------|----------|---------|
| Ticket In-progress Time | The time taken for a ticket to move from the 'Created' state to the 'In-Progress' state. | `In-Progress Time - Ticket Created Time` | `10:00 AM - 9:50 AM = 10 minutes` |
| First Commit Time | The time taken to make the first commit after the ticket is in progress. | `First Commit Time - First In-Progress Time` | `10:05 AM - 10:00 AM = 5 minutes` |
| First Pull Request Creation Time | The time taken to create the first pull request (PR) after the first commit. | `First PR Creation Time - First Commit Time` | `10:08 AM - 10:05 AM = 3 minutes` |
| First Pull Request Approval Time | The time taken to approve the first pull request after it is created. | `First PR Approval Time - PR Creation Time` | `10:11 AM - 10:08 AM = 3 minutes` |
| Last Pull Request Merge Time | The time taken to merge the last (second) pull request after it is approved. | `Last PR Merged Time - First PR Approval Time` | `10:15 AM - 10:11 AM = 4 minutes` |
| First Continuous Integration Time | The time taken for the first continuous integration (CI) process to complete after the last pull request is merged. | `First CI Time - Last PR Merged Time` | `10:16 AM - 10:15 AM = 1 minute` |
| First Continuous Deployment Time | The time taken for the first continuous deployment (CD) process to complete after the CI process is finished. | `First CD Time - First CI Time` | `10:17 AM - 10:16 AM = 1 minute` |
| First Issue Management Done Time | The time taken to mark the issue as 'Done' in the issue management system (e.g., Jira) after the CD process is completed. | `First JIRA Done Time - First CD Time` | `10:20 AM - 10:17 AM = 3 minutes` |
| First Release Time | The time taken to mark the issue as 'Released' after it is marked as 'Done'. | `Release Time - First JIRA Done Time` | `11:00 AM - 10:20 AM = 40 minutes` |

For the given example, the Total Lead Time is calculated as the sum of all the above stages:

```
Total Lead Time = 10 min + 5 min + 3 min + 3 min + 4 min + 1 min + 1 min + 3 min + 40 min
             = 70 minutes
```

Therefore, the Total Lead Time for Case 3 (Two Overlapping PRs to Single Jira Ticket) is **70 minutes**.

### Calculation Example 4 - Two Overlapping PRs associated with a Single Jira Ticket with Jira Re-Entry

In this case, two pull requests (PRs) are associated with a single Jira ticket in an overlapping manner, and there is a re-entry into the Jira ticket after the initial completion.

The following table outlines the different stages, their descriptions, formulas, and example calculations.

| Stage | Description | Formula | Example |
|-------|--------------|----------|---------|
| Ticket In-progress Time | The time taken for a ticket to move from the 'Created' state to the 'In-Progress' state. | `In-Progress Time - Ticket Created Time` | `10:00 AM - 9:50 AM = 10 minutes` |
| First Commit Time | The time taken to make the first commit after the ticket is in progress. | `First Commit Time - First In-Progress Time` | `10:05 AM - 10:00 AM = 5 minutes` |
| First Pull Request Creation Time | The time taken to create the first pull request (PR) after the first commit. | `First PR Creation Time - First Commit Time` | `10:08 AM - 10:05 AM = 3 minutes` |
| First Pull Request Approval Time | The time taken to approve the first pull request after it is created. | `First PR Approval Time - PR Creation Time` | `10:11 AM - 10:08 AM = 3 minutes` |
| Last Pull Request Merge Time | The time taken to merge the last (second) pull request after it is approved. | `Last PR Merged Time - First PR Approval Time` | `10:50 AM - 10:11 AM = 39 minutes` |
| First Continuous Integration Time | The time taken for the first continuous integration (CI) process to complete after the last pull request is merged. | `First CI Time - Last PR Merged Time` | `10:16 AM - 10:50 AM = 0 minute` |
| First Continuous Deployment Time | The time taken for the first continuous deployment (CD) process to complete after the CI process is finished. | `First CD Time - First CI Time` | `10:17 AM - 10:16 AM = 1 minute` |
| First Issue Management Done Time | The time taken to mark the issue as 'Done' in the issue management system (e.g., Jira) after the CD process is completed. | `First JIRA Done Time - First CD Time` | `10:20 AM - 10:17 AM = 3 minutes` |
| First Release Time | The time taken to mark the issue as 'Released' after it is marked as 'Done'. | `Release Time - First JIRA Done Time` | `11:00 AM - 10:20 AM = 40 minutes` |

For the given example, the Total Lead Time is calculated as the sum of all the above stages:

```
Total Lead Time = 10 min + 5 min + 3 min + 3 min + 39 min + 0 min + 1 min + 3 min + 40 min
             = 104 minutes
```

Therefore, the Total Lead Time for Case 4 (Two Overlapping PRs to Single Jira Ticket with Jira Re-Entry) is **104 minutes**.

### Calculation Example 5 - Two PRs associated with a Single Jira Ticket and Jira Ticket was re-opened after Release

In this case, two pull requests (PRs) are associated with a single Jira ticket, and the Jira ticket is reopened after the initial release.

The following table outlines the different stages, their descriptions, formulas, and example calculations.

| Stage | Description | Formula | Example |
|-------|--------------|----------|---------|
| Ticket In-progress Time | The time taken for a ticket to move from the 'Created' state to the 'In-Progress' state. | `In-Progress Time - Ticket Created Time` | `10:00 AM - 9:50 AM = 10 minutes` |
| First Commit Time | The time taken to make the first commit after the ticket is in progress. | `First Commit Time - First In-Progress Time` | `10:05 AM - 10:00 AM = 5 minutes` |
| First Pull Request Creation Time | The time taken to create the first pull request (PR) after the first commit. | `First PR Creation Time - First Commit Time` | `10:08 AM - 10:05 AM = 3 minutes` |
| First Pull Request Approval Time | The time taken to approve the first pull request after it is created. | `First PR Approval Time - PR Creation Time` | `10:11 AM - 10:08 AM = 3 minutes` |
| Last Pull Request Merge Time | The time taken to merge the last (second) pull request after it is approved. | `Last PR Merged Time - First PR Approval Time` | `11:50 AM - 10:11 AM = 99 minutes` |
| First Continuous Integration Time | The time taken for the first continuous integration (CI) process to complete after the last pull request is merged. | `First CI Time - Last PR Merged Time` | `10:16 AM - 11:50 AM = 0 minute` |
| First Continuous Deployment Time | The time taken for the first continuous deployment (CD) process to complete after the CI process is finished. | `First CD Time - First CI Time` | `10:17 AM - 10:16 AM = 1 minute` |
| First Issue Management Done Time | The time taken to mark the issue as 'Done' in the issue management system (e.g., Jira) after the CD process is completed. | `First JIRA Done Time - First CD Time` | `10:20 AM - 10:17 AM = 3 minutes` |
| First Release Time | The time taken to mark the issue as 'Released' after it is marked as 'Done'. | `Release Time - First JIRA Done Time` | `11:00 AM - 10:20 AM = 40 minutes` |

For the given example, the Total Lead Time is calculated as the sum of all the above stages:

```
Total Lead Time = 10 min + 5 min + 3 min + 3 min + 99 min + 0 min + 1 min + 3 min + 40 min
             = 164 minutes
```

Therefore, the Total Lead Time for Case 5 (Two PRs to Single Jira Ticket with Jira Reopen after Release) is **164 minutes**.

### Calculation Example 6 - No Associated PR or Commit (No Ticket ID Mentioned in PRs)

In this case, there are no pull requests (PRs) or commits associated with the Jira ticket, as the ticket ID was not mentioned in the PRs.

The following table outlines the different stages, their descriptions, formulas, and example calculations.

| Stage | Description | Formula | Example |
|-------|--------------|----------|---------|
| Ticket In-progress Time | The time taken for a ticket to move from the 'Created' state to the 'In-Progress' state. | `In-Progress Time - Ticket Created Time` | `10:00 AM - 9:50 AM = 10 minutes` |
| First Commit Time | The time taken to make the first commit after the ticket is in progress. | `First Commit Time - First In-Progress Time` | `0 - 0 = 0 minutes` |
| First Pull Request Creation Time | The time taken to create the first pull request (PR) after the first commit. | `First PR Creation Time - First Commit Time` | `0 - 0 = 0 minutes` |
| First Pull Request Approval Time | The time taken to approve the first pull request after it is created. | `First PR Approval Time - PR Creation Time` | `0 - 0 = 0 minutes` |
| Last Pull Request Merge Time | The time taken to merge the last pull request after it is approved. | `Last PR Merged Time - First PR Approval Time` | `0 - 0 = 0 minutes` |
| First Continuous Integration Time | The time taken for the first continuous integration (CI) process to complete after the last pull request is merged. | `First CI Time - Last PR Merged Time` | `0 - 0 = 0 minutes` |
| First Continuous Deployment Time | The time taken for the first continuous deployment (CD) process to complete after the CI process is finished. | `First CD Time - First CI Time` | `0 - 0 = 0 minutes` |
| First Issue Management Done Time | The time taken to mark the issue as 'Done' in the issue management system (e.g., Jira) after the CD process is completed. | `First JIRA Done Time - First CD Time` | `10:20 AM - 0 = 20 minutes` |
| First Release Time | The time taken to mark the issue as 'Released' after it is marked as 'Done'. | `Release Time - First JIRA Done Time` | `11:00 AM - 10:20 AM = 40 minutes` |

In this case, since there are no pull requests (PRs) or commits associated with the Jira ticket, several stages in the lead time calculation have zero values. The lead time calculation in this case gets computed based on the time taken for the ticket to move through the "In Progress," "Done," and "Released" states in the issue management system (e.g., Jira).

For the given example, the Total Lead Time is calculated as the sum of all the above stages:

```
Total Lead Time = 10 min + 0 min + 0 min + 0 min + 0 min + 0 min + 0 min + 20 min + 40 min
             = 70 minutes
```

Therefore, the Total Lead Time for Case 6 (No Attached PR or Commit) is **70 minutes**.

### Calculation Example 7 - Same Job for CI and CD

In this case, a single job is responsible for both the continuous integration (CI) and continuous deployment (CD) processes.

The following table outlines the different stages, their descriptions, formulas, and example calculations.

| Stage | Description | Formula | Example |
|-------|--------------|----------|---------|
| Ticket In-progress Time | The time taken for a ticket to move from the 'Created' state to the 'In-Progress' state. | `In-Progress Time - Ticket Created Time` | `10:00 AM - 9:50 AM = 10 minutes` |
| First Commit Time | The time taken to make the first commit after the ticket is in progress. | `First Commit Time - First In-Progress Time` | `10:05 AM - 10:00 AM = 5 minutes` |
| First Pull Request Creation Time | The time taken to create the first pull request (PR) after the first commit. | `First PR Creation Time - First Commit Time` | `10:10 AM - 10:05 AM = 5 minutes` |
| First Pull Request Approval Time | The time taken to approve the first pull request after it is created. | `First PR Approval Time - PR Creation Time` | `10:11 AM - 10:10 AM = 1 minute` |
| Last Pull Request Merge Time | The time taken to merge the last pull request after it is approved. | `Last PR Merged Time - First PR Approval Time` | `10:15 AM - 10:11 AM = 4 minutes` |
| First CI and CD Completion Time | The time taken for the single job to complete both the continuous integration (CI) and continuous deployment (CD) processes after the last pull request is merged. | `First CI and CD Time - Last PR Merged Time` | `10:20 AM - 10:15 AM = 5 minutes` |
| First Issue Management Done Time | The time taken to mark the issue as 'Done' in the issue management system (e.g., Jira) after the CI and CD processes are completed. | `First JIRA Done Time - First CI and CD Time` | `10:20 AM - 10:20 AM = 0 minutes` |
| First Release Time | The time taken to mark the issue as 'Released' after it is marked as 'Done'. | `Release Time - First JIRA Done Time` | `11:00 AM - 10:20 AM = 40 minutes` |

For the given example, the Total Lead Time is calculated as the sum of all the above stages:

```
Total Lead Time = 10 min + 5 min + 5 min + 1 min + 4 min + 5 min + 0 min + 40 min
             = 70 minutes
```

Therefore, the Total Lead Time for Case 7 (Same Job for CI and CD) is **70 minutes**.

In this case, a single job handles both the CI and CD processes, so the "First CI and CD Completion Time" stage represents the time taken for this single job to complete both processes. The "First Issue Management Done Time" is zero because the issue is marked as 'Done' immediately after the CI and CD processes are completed by this single job.

### Calculation Example 8 - Different Jobs for CI and CD

In this case, there are separate jobs for the continuous integration (CI) and continuous deployment (CD) processes.

The following table outlines the different stages, their descriptions, formulas, and example calculations.

| Stage | Description | Formula | Example |
|-------|--------------|----------|---------|
| Ticket In-progress Time | The time taken for a ticket to move from the 'Created' state to the 'In-Progress' state. | `In-Progress Time - Ticket Created Time` | `10:00 AM - 9:50 AM = 10 minutes` |
| First Commit Time | The time taken to make the first commit after the ticket is in progress. | `First Commit Time - First In-Progress Time` | `10:05 AM - 10:00 AM = 5 minutes` |
| First Pull Request Creation Time | The time taken to create the first pull request (PR) after the first commit. | `First PR Creation Time - First Commit Time` | `10:10 AM - 10:05 AM = 5 minutes` |
| First Pull Request Approval Time | The time taken to approve the first pull request after it is created. | `First PR Approval Time - PR Creation Time` | `10:11 AM - 10:10 AM = 1 minute` |
| Last Pull Request Merge Time | The time taken to merge the last pull request after it is approved. | `Last PR Merged Time - First PR Approval Time` | `10:15 AM - 10:11 AM = 4 minutes` |
| First Continuous Integration Time | The time taken for the continuous integration (CI) process to complete after the last pull request is merged. | `First CI Time - Last PR Merged Time` | `10:18 AM - 10:15 AM = 3 minutes` |
| First Continuous Deployment Time | The time taken for the continuous deployment (CD) process to complete after the CI process is finished. | `First CD Time - First CI Time` | `10:20 AM - 10:18 AM = 2 minutes` |
| First Issue Management Done Time | The time taken to mark the issue as 'Done' in the issue management system (e.g., Jira) after the CD process is completed. | `First JIRA Done Time - First CD Time` | `10:30 AM - 10:20 AM = 10 minutes` |
| First Release Time | The time taken to mark the issue as 'Released' after it is marked as 'Done'. | `Release Time - First JIRA Done Time` | `11:00 AM - 10:30 AM = 30 minutes` |

For the given example, the Total Lead Time is calculated as the sum of all the above stages:

```
Total Lead Time = 10 min + 5 min + 5 min + 1 min + 4 min + 3 min + 2 min + 10 min + 30 min
             = 70 minutes
```

Therefore, the Total Lead Time is **70 minutes**.

In this case, the "First Continuous Integration Time" and "First Continuous Deployment Time" stages represent the separate times taken for the CI and CD processes, respectively, as they are handled by different jobs.