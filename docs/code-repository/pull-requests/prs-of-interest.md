---
title: PR Dashboard
description: A personalized pull request dashboard showing relevant PRs, with enhanced filtering and visibility across Account, Org, and Project levels.
sidebar_position: 40
---

The user-centric pull request page is available at the account, organization, and project levels, displaying pull requests relevant to the logged-in user.

:::note
This feature is behind a feature flag `CODE_SPACE_PULLREQ`.
:::

The page includes three pre-defined queries:

- **All** – Displays all pull requests in the selected scope.
- **Created** – Displays all PRs created by the logged-in user.
- **Review Requested** – Displays PRs where the logged-in user has been requested to review.

The **PR Dashboard** provides a complete view of pull requests across the selected scope—Account, Organization, or Project—regardless of author. This enables teams to track all ongoing work, not just PRs tied to the current user.

### Key capabilities

- View **all pull requests** across the selected scope, including PRs created by other users.
- Supports advanced filtering by:
  - **Author** – Filter PRs by who opened them.
  - **Status** – Filter PRs by status (Open, Closed, etc.)
  - **Labels** – Filter PRs by labels such as `bug`, `feature`, `needs-review`, etc.
  - **Your Reviews** – For PRs assigned to you for review, you can filter further by **Review Status**:`Pending`, `Approved`, or `Changes Requested`.

<DocImage path={require('/docs/code-repository/pull-requests/static/pr-dashboard.png')} />

This dashboard is especially useful for leads, reviewers, and teams working across multiple projects or repos who need visibility into all in-flight changes.