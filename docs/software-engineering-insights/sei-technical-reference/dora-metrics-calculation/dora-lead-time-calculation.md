---
title: DORA Lead Time Calculation
description: How is Lead Time calculated for DORA metrics on SEI?
sidebar_label: Lines of Code
sidebar_position: 10
---

### What is Lead Time?

The Lead Time calculation measures the total time taken from the moment a ticket is created to the point when it is released to production. Below are various use cases that demonstrate how Lead Time is calculated across different scenarios. 

### Calculation Example 1: One Pull Request to One Jira

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