---
title: PR Dashboard
description: A personalized pull request dashboard showing relevant PRs, with enhanced filtering and visibility across Account, Org, and Project levels.
sidebar_position: 40
---

The user-centric pull request page is available at the account, organization, and project levels, displaying pull requests relevant to the logged-in user.

:::note
This feature is behind a feature flag `CODE_SPACE_PULLREQ`.
:::

<DocImage path={require('/docs/code-repository/pull-requests/static/pr-overview.png')} />

The page includes two sections:

- **My Pull Requests** – Displays all PRs created by the logged-in user.
- **Review Requested** – Displays PRs where the logged-in user has been requested to review.

## PR Dashboard

The **PR Dashboard** provides a complete view of pull requests across the selected scope—Account, Organization, or Project—regardless of author. This enables teams to track all ongoing work, not just PRs tied to the current user.

### Key capabilities

- View **all pull requests** across the selected scope, including PRs created by other users.
- Supports advanced filtering by:
  - **Author** – Filter PRs by who opened them.
  - **Labels** – Filter by tags such as `bug`, `feature`, `needs-review`, etc.
  - **PR Status** – Open, Merged, or Closed.

For PRs assigned to you for review, you can filter further by **Review Status**:
- **Pending** – You haven't reviewed yet.
- **Approved** – You’ve approved the PR.
- **Changes Requested** – You’ve requested updates from the author.

<DocImage path={require('/docs/code-repository/pull-requests/static/pr-dashboard.png')} />

This dashboard is especially useful for leads, reviewers, and teams working across multiple projects or repos who need visibility into all in-flight changes.