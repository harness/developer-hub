---
title: PR Dashboard
sidebar_label: PR Dashboard
description: A pull request dashboard that shows relevant and in-flight pull requests across account, organization, and project scope.
keywords:
  - pull request dashboard
  - PR dashboard
  - review requested
  - pull request filters
tags:
  - code-repository
  - pull-requests
sidebar_position: 40
---

The PR Dashboard is a user-centric pull request page available at account, organization, and project scope. It shows the pull requests relevant to the signed-in user, and it can widen to every pull request in the selected scope regardless of author.

The dashboard suits leads, reviewers, and teams working across several projects or repositories who need visibility into all in-flight changes rather than only their own.

---

## What you will learn

- **Predefined queries:** The three built-in views and what each returns.
- **Scope:** How account, organization, and project scope change the result set.
- **Filters:** How to narrow the list by author, status, label, and review status.

---

## Before you begin

- **Feature flag:** The PR Dashboard is behind the feature flag `CODE_SPACE_PULLREQ`. Contact [Harness Support](mailto:support@harness.io) to enable it on your account.

    <!-- TODO(SME): Confirm whether CODE_SPACE_PULLREQ still gates the PR Dashboard, or whether it reached GA after 2025-06-26. -->

- **Repository permissions:** You see only the pull requests in repositories you can access. Go to the [permissions reference](/docs/platform/role-based-access-control/permissions-reference#code-repository) to review the permission list.

---

## Predefined queries

The dashboard includes three predefined queries:

- **All:** Every pull request in the selected scope.
- **Created:** Pull requests created by the signed-in user.
- **Review Requested:** Pull requests where the signed-in user has been requested as a reviewer.

---

## Key capabilities

The dashboard gives a complete view of pull requests across the selected scope, whether that is account, organization, or project, and regardless of author. Teams can therefore track all ongoing work rather than only the pull requests tied to the current user.

You can filter the list by:

- **Author:** Narrow to the users who opened the pull requests.
- **Status:** Narrow by pull request status, such as open or closed.
- **Labels:** Narrow by labels such as `bug`, `feature`, or `needs-review`. Go to [Labels](/docs/code-repository/work-in-repos/labels) to create them.
- **Your Reviews:** For pull requests assigned to you, narrow further by review status: `Pending`, `Approved`, or `Changes Requested`.

<DocImage path={require('/docs/code-repository/pull-requests/static/pr-dashboard.png')} alt="PR Dashboard showing pull requests filtered by scope and review status" title="Click to view full size" />
<p align="center"><em>Switch between the All, Created, and Review Requested queries, then narrow the result set with filters.</em></p>

<!-- TODO(SME): Document how the dashboard is reached in the UI. The page describes what the dashboard shows but never states where a user navigates to open it at each scope. -->

---

## Related concepts

You can now find the pull requests that need your attention across every repository you can reach.

- [Labels](/docs/code-repository/work-in-repos/labels): Create the labels the dashboard filters on.
- [Review pull requests](/docs/code-repository/pull-requests/review-pr): Act on the pull requests assigned to you.
- [Create a pull request](/docs/code-repository/pull-requests/create-pr): Open a pull request that appears under Created.
