---
title: Get Started
description: A self-service onboarding guide for Harness Code
sidebar_position: 2
sidebar_label: Get Started
---

This guide explains what you need to know to get started with the Harness Code Repository module.

## Learn key concepts

- If you're new to Harness, review the [Harness Platform onboarding guide](/docs/platform/get-started/onboarding-guide) before onboarding to Code.
- Learn about the [Harness Code key concepts](./key-concepts.md).

## Set up repos

- [Create fresh repos](/docs/code-repository/config-repos/create-repo.md) in Harness Code.
- [Import repos](/docs/code-repository/config-repos/import-repo.md) to Harness Code from other Git SCM providers
- [Mirror repos](../config-repos/mirror.md) in any SCM provider.

## Work in repos

Work in your Harness Code repos as you would in other SCM tools:

- [Clone your repo to work locally](../work-in-repos/clone-repos.md).
- [Branch](../work-in-repos/branch.md), [commit](../work-in-repos/commit.md), and [tag](../work-in-repos/tag.md) by command line or directly in the Harness Platform.
- [Create, review, and merge pull requests](/docs/category/pull-requests). <!-- Maintain code quality: Conduct code reviews, configure status checks, define merge requirements, and select merge strategies. -->

## Configure pipelines

[Configure your pipelines to build, test, and deploy code from your Harness Code repos.](../pipelines/codebase-from-harness-code.md)

## Manage access

Within Harness Code, you can [configure branch rules and CODEOWNERS](/docs/code-repository/config-repos/rules.md) for individual repositories.

Broader access control for Harness Code is handled primarily through [Harness Platform RBAC](/docs/platform/role-based-access-control/rbac-in-harness.md).

Harness Code includes one [built-in role](/docs/platform/role-based-access-control/add-manage-roles.md), which is the **Code Admin** role. You can create additional roles as needed. Permissions for Harness Code include the ability to view, create/edit, delete, and push to repositories.

Check out this video to learn more about access control with Harness Code.

<DocVideo src="https://www.youtube.com/watch?v=SaH27_UgAxA" />
