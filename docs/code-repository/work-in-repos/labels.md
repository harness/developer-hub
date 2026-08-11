---
title: Labels
sidebar_label: Labels
description: Create, scope, and apply labels to categorize and filter pull requests in Harness Code Repository.
keywords:
  - labels
  - pull requests
  - filtering
  - label values
tags:
  - code-repository
  - work-in-repos
  - pull-requests
sidebar_position: 41
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Labels categorize and filter pull requests in Harness Code Repository. Use them to organize work and make ownership and priority visible in a long pull request list.

Labels support several patterns:

- **Simple categories:** Terms such as `bug`, `feature request`, or `docs`.
- **Priority or severity:** Name and value pairs such as `priority: urgent` or `priority: low`.
- **Ownership:** Labels such as `team: frontend` or `team: backend` that identify who owns the pull request.
- **Filtering:** Any label can narrow a large pull request list.

If you are looking for release tags rather than labels, go to [Tag](/docs/code-repository/work-in-repos/tag).

---

## Before you begin

- **Label permissions:** You need create and edit permission for Harness Code at the scope where you want the label to exist. Go to the [permissions reference](/docs/platform/role-based-access-control/permissions-reference#code-repository) to review the permission list, and to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles. If you lack the required permissions, ask your administrator to grant access or to create the label for you.

    <!-- TODO(SME): Name the specific permission required to create a label at each scope. "Create/edit permission for Harness Code" does not map to a single entry in the permissions reference, which lists View, Review, Edit, Create, Delete, Push, and Report Commit Check on the Repository resource. -->

---

## Types of labels

All labels in Harness Code are customizable, and you can create or modify them to fit your project or team.

A label can be a simple text value such as `Do not Merge`, or it can carry enumerated values such as `status: in progress`, `status: completed`, or `status: blocked`. You can limit a label to a predefined set of values, or allow users to add new values when they apply it.

---

## Create a label

You can define labels and their values at several scopes. The scope determines where the label is available:

| Scope | Availability |
| --- | --- |
| Repository | That repository only. |
| Project | Every repository in the project. |
| Organization | Every project and repository in the organization. |
| Account | Every repository in the account, for every user. |

:::tip

Create labels at the highest scope that makes sense, so they stay reusable across projects and repositories.

:::

### Create a repository scoped label

To create a label for a single repository, do the following:

1. Go to **Settings** in the repository.
2. Click **Labels**.
3. Click **+ Create Label**.

### Create a label at project, organization, or account scope

To create a label that spans repositories, do the following:

1. In the Code Repository module, go to **Manage Repositories**.
2. Click **Labels**.
3. Click **+ Create Label**.

<!-- TODO(SME): Both procedures stop at "+ Create Label" without documenting the create dialog itself: the name field, the description field, the color picker, and the checkbox that allows users to add values. Document the dialog fields so a reader can finish the task. -->

### Add a value to a label

When you create a label, you can define a list of allowed values that users select from when they apply it. Each value can carry its own color, so `priority: urgent` can render red and `priority: low` can render green.

### Allow users to add values

You can permit users to add new values to an existing label, so a labeling system can evolve with the project. Select the option to allow new values when you create or edit the label.

Every value a user adds joins the label definition and becomes available whenever that label is applied.

---

## Apply a label to a pull request

You apply labels when you create or edit a pull request. Any user with permission to create or review a pull request can add, remove, or update labels and values on it, and every change is recorded in the pull request activity.

- **Simple labels:** Start typing, then select the label.
- **Labels with values:** Find the label, then choose a value. A pull request can carry only one value per label.

Labels appear in the pull request list, so anyone who can view a pull request can see its labels.

### Add a new value when applying a label

If a label allows custom values, select the option to add a new value and enter it in the input field. The new value joins the label definition.

---

## Troubleshooting

<Troubleshoot
  issue="The + Create Label option is unavailable in Harness Code Repository settings"
  mode="docs"
  fallback="Creating a label requires create and edit permission at the scope you are working in. Ask an administrator to assign a role that includes it at the repository, project, organization, or account level."
/>

<Troubleshoot
  issue="A label created at organization or account scope does not appear on a Harness Code pull request"
  mode="docs"
  fallback="Confirm the pull request repository sits inside the scope where the label was defined. A repository-scoped label is not visible to other repositories."
/>

<Troubleshoot
  issue="A user cannot add a new value to an existing label in Harness Code"
  mode="docs"
  fallback="The label must be configured to allow users to add values. Edit the label and select the option that permits new values."
/>

---

## Next steps

You can now categorize pull requests consistently and filter a long list down to the work that matters.

- [PR Dashboard](/docs/code-repository/pull-requests/prs-of-interest): Filter pull requests by label across account, organization, and project scope.
- [Create a pull request](/docs/code-repository/pull-requests/create-pr): Apply labels as you open a pull request.
- [Tag](/docs/code-repository/work-in-repos/tag): Use Git tags for releases rather than labels.
