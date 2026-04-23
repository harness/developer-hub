---
title: Resource tags
description: Add tags to repositories, filter the repository list by tag, and control access with tag-based RBAC.
sidebar_position: 35
sidebar_label: Resource Tags
---

Resource tags are arbitrary key-value pairs you can attach to repositories in Harness Code. They act as metadata for organization and search, and they drive [Role-Based Access Control (RBAC)](/docs/platform/role-based-access-control/rbac-in-harness) so you can grant access to a set of repositories by tag instead of by name.

Resource tags are different from Git tags. Git tags mark a specific commit and are typically used for releases. Resource tags are Harness-managed metadata on the repository itself. Go to [Tag](/docs/code-repository/work-in-repos/tag) to manage Git tags.

A resource tag can be:

- **Key-value pair:** for example, `env: prod` or `team: platform`.
- **Key-only flag:** for example, `dev_only` or `experimental`.

## Add tags when you create a repository

You can attach resource tags during repository creation so that filters and access policies apply from day one.

1. Go to **Code Repository** and select **'+ New Repository'**.
2. Enter the repository **Name** and **Description**.
3. In the **Tags** field, type a tag as `key:value` (for example, `env:prod`) or as a flag (for example, `dev_only`) and press Enter to add it. Add as many tags as you need.
4. Complete the rest of the form and select **'Create Repository'**.

## Edit tags on an existing repository

You can add, change, or remove resource tags at any time from the repository's general settings.

1. Open the repository and select **Settings**.
2. On the **General** tab, locate the **Tags** field.
3. Add new tags, or remove existing ones, then save your changes.

Tag changes take effect immediately and are reflected in the repository list, the **Tags** filter, and any tag-based resource group.

## Filter the repository list by tag

The repository list page supports a **Tags** filter so you can scope the view to repositories that carry a specific tag.

1. Go to the **Repositories** page.
2. Open the filter bar and select **Tags**.
3. Enter the tag key, value, or `key:value` pair you want to filter by.

The list updates to show only repositories whose tags match. The **Resource Tags** column on the list view also displays each repository's tags inline, so you can scan them at a glance.

## Use tags for repository RBAC

You can grant access to repositories based on their tags rather than enumerate every repository in a resource group. This is useful when:

- The set of repositories a team needs access to changes often, for example when a new service repository is added.
- You want repository owners, not RBAC admins, to control whether a repository falls into an existing access policy by editing its tags.
- You want a single resource group to cover dozens or hundreds of repositories without naming each one.

### How tag-based access works

Tag-based access is configured on a [resource group](/docs/platform/role-based-access-control/add-resource-groups). When you add the **Code Repositories** resource type to a resource group, you choose how repositories are matched:

- **All:** Grants access to every repository within the resource group's scope.
- **Specified:** Grants access only to the repositories you select by name.
- **By Tag:** Grants access to every repository whose tags match the tags you list here.

If a repository's tags later change to match or stop matching the resource group's tag list, that repository is automatically added to or removed from the group. You do not need to edit the resource group when you onboard or offboard a repository.

### Configure a tag-based resource group

1. Go to the [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes) (account, organization, or project) where you want to define access, and open **Resource Groups**.
2. Select **'+ New Resource Group'**, enter a **Name**, and choose a **Resource Scope**.
3. Under **Resources**, add **Code Repositories**.
4. Select **'By Tag'**.
5. Enter the tags that should match. For example, `env:prod` or `team:platform`. You can add multiple tags. A repository is included if it matches **any** of the listed tags.
6. Save the resource group.

### Bind the resource group to a role

A resource group only defines *which* repositories are in scope. To grant *what* a user can do with them, assign the resource group together with a [role](/docs/platform/role-based-access-control/add-manage-roles) to a user, user group, or service account.

Two common patterns:

- **Team-scoped admin:** A user group **Platform Engineers** with the **Code Repository Admin** role and a resource group that selects repositories **By Tag** `team:platform`. Every repository tagged `team:platform`, including new ones, is automatically administered by this group.
- **Environment-scoped editor:** A user group **Frontend Devs** with a custom **Code Repository Editor** role and a resource group that selects repositories **By Tag** `env:dev`. New `env:dev` repositories show up in the group automatically; promoted repositories drop out the moment the tag changes to `env:prod`.

Go to [Add user groups](/docs/platform/role-based-access-control/add-user-groups) to set up groups, and to [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to define role permissions.

## Things to know

- **Exact match only:** A resource group with the tag `env:prod` does not match a repository tagged `env:production`. Pick a tag vocabulary up front and apply it consistently.
- **Match is OR across tags:** A repository is included in the resource group if it carries *any* of the tags listed in the **By Tag** selection, not all of them.
- **Tag changes are immediate:** Removing a tag from a repository removes that repository from every tag-based resource group that depends on the tag. That can revoke a user's access to the repository on the next request.
- **Tags live on the Harness record:** Resource tags are stored on the Harness repository entity, not in Git history. Changes to the underlying Git data do not affect resource tags.

:::tip Make tags your primary access lever

When you manage many repositories, prefer **By Tag** over **Specified**. A small, well-chosen tag set such as `env`, `team`, and `tier` usually replaces dozens of explicit resource group memberships and stays accurate as repositories come and go.

:::

:::warning Avoid accidental access

Because tag matches are computed at access time, an editor who can change a repository's tags can also change which resource groups apply to that repository. Restrict edit access to repository settings to the same audience that you trust to manage access policy.

:::

## Next steps

- Go to [Manage resource groups](/docs/platform/role-based-access-control/add-resource-groups) to understand resource group scopes and refinement.
- Go to [Tag-based RBAC for pipelines](/docs/platform/role-based-access-control/tag-based-rbac-for-pipelines) to apply the same pattern to pipelines.
- Go to [Enable rules](/docs/code-repository/config-repos/rules) to combine resource tags with branch and tag rules for layered governance.
