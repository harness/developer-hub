---
title: SCM Review Collaboration Report Calculation
description: How is the Review Collaboration report calculated on SEI?
sidebar_label: SCM Review Collaboration report
sidebar_position: 20
---

The report displays information about the **PR author** and the **Approver** details in each **Collaboration State**. The **Collaboration State** can be defined as the state in which the code is committed.

### Assigned Peer Approved

The count of pull requests (PRs) that have been approved by a peer who was assigned to review the Pull Request.

### Unapproved

The count of Pull Requests that have been closed without any peer approval.

### Unassigned Peer Approved

The count of Pull Requests that have been approved by a peer who was not explicitly assigned to review the PR.

:::info
Note that when a Pull Request is created, and if the repository maintainers are automatically added as reviewers, SEI categorizes such type of Pull Request as **Unassigned Peer Approved**.
:::

### Self Approved

The count of Pull Requests that have been approved by the creator of the PR.

### Self Approved With Review

The count of PRs that have been approved by the creator of the PR after some form of peer review.

The drill-down view shows data for each author based on the selected columns and collaboration state. The data is grouped by iterating over each record, and the color coding is based on the number of pull requests. This helps to visualize and understand the collaboration status of each author.