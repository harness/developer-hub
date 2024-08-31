---
title: Labels
description: Create and manage Labels in Harness Code.
sidebar_position: 41
---

Labels are a way to categorize and filter Pull Requests in Harness Code. Labels are essential for organizing work and improving collaboration within teams.

* Categorize items using simple terms such as `bug` , `feature request`, or `docs`.
* Communicate priority or severity of items with name value pairs like `priority: urgent` or `priority: low`.
* Quickly identify the team who owns the pull request with labels like `team: frontend` or `team: backend`.
* Dynamically filter and manage pull requests in a large list.

## Types of Labels

All labels in Harness Code are customizable and can be created or modified to fit the specific needs of your project or team. Labels may be simple text values such as `Do not Merge` or include enumerated values like `status: in progress`, `status: completed`, or `status: blocked`. The list of values for a label may be limited to a pre-defined set, or users may be allowed to add new values as needed.

# Create a label

Labels, and their values, may be defined at various scopes within Harness Code. Labels can be created at the repository level, project level or even at the organization or account level, depending on your needs and permissions. Labels defined at the repository level will only apply to that specific repository, while project-level labels can be shared across multiple repositories within the same project. Organization-level labels are accessible across all projects and repositories within the organization. Labels created at the Account level are global to the account and available for every user, providing a consistent labeling system.

:::tip 

Create labels at the highest scope possible to make them reusable across multiple projects and repositories.

:::

:::info Permissions

To create a label, you must have the appropriate permissions set at the desired scope. 
Ensure that you have create/edit permission for Harness Code at the repository, project, organization, or account level. If you lack the required permissions, you may need to contact your administrator to gain access or request the creation of labels. 

:::

## Add a value to a label

When creating a label, you can optionally define a list of allowed values that users can select from when applying the label. Each value can be a different color to help visually distinguish it, e.g., red for `priority: urgent` and green for `priority: low`.

## Allow users to add values

Users can be granted permission to add new values to existing labels. This flexibility allows teams to adapt their labeling system as project requirements evolve. Simply check the box to allow users to add new values to labels when applying them. 

All values added by users are added to the label definition and become available options whenever this label is applied.

# Apply a label to a pull request.

Labels are applied to pull requests when creating or editing them. Any user who has permission to create or review a pull request may add, remove, or update labels and values on a pull request. Any change to a label or value will be recorded in the pull request's activity.

For simple labels, start typing and select the desired label.  For labels with several values, find the desired label and choose the appropriate value. Only one value for a specific label can be applied to a pull request.

Labels are visible in the list of pull requests so anyone who can view the pull request can see the applied labels.

## Add a new value for a label

If a label allows custom values to be added when applying the label, users can select the option to add a new value and submit a new value in the input field for inclusion in the label's definition.

