---
title: Get started with Harness Code Repository
sidebar_label: Get Started
description: A self-service onboarding guide that takes you from an empty project to repositories connected to pipelines and governed by access controls.
keywords:
  - onboarding
  - get started
  - code repository
  - quickstart
tags:
  - code-repository
  - get-started
sidebar_position: 20
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

This guide walks you through the essential steps to start using the Harness Code Repository module. You set up repositories, work with your code, connect repositories to pipelines, and configure access and security.

If you are new to Harness, go to [Get started with Harness Platform](/docs/platform/get-started/onboarding-guide) to create an account before you onboard to Code. Go to [Overview and key concepts](/docs/code-repository/get-started/overview) to review core SCM concepts and how Harness Code integrates with the Harness Platform.

---

## What you will learn

- **Set up repositories:** Create, import, or mirror repositories into Harness Code.
- **Work in repositories:** Clone, branch, commit, tag, and raise pull requests.
- **Configure pipelines:** Connect repositories to Harness CI and CD pipelines.
- **Manage access and security:** Apply branch rules, CODEOWNERS, and role-based access control.

---

## Before you begin

- **Code Repository enabled:** You need a Harness account with Code Repository entitled. Go to [Get started with Harness Platform](/docs/platform/get-started/onboarding-guide) to create or access an account.

    :::info Contact Harness support:

    If Code Repository does not appear, contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Repository permissions:** You need **Create** and **Edit** on **Repository** in your Harness project. Go to the [permissions reference](/docs/platform/role-based-access-control/permissions-reference#code-repository) to review the permission list, and to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.
- **Git familiarity:** You should be comfortable with cloning, branching, and committing. Go to the [Git SCM documentation](https://git-scm.com/doc) to review the basics.

---

## Step 1: Set up repositories

Choose how you want to bring code into Harness Code:

- [Create fresh repos](/docs/code-repository/config-repos/create-repo): Start a new repository from scratch for new projects or microservices.
- [Import repos](/docs/code-repository/config-repos/import-repo): Migrate existing repositories from another Git provider, such as GitHub, GitLab, or Bitbucket.
- [Mirror repos](/docs/code-repository/config-repos/mirror): Create mirrors of repositories from any provider so you can use Harness CI and CD while the source of truth stays where it is.

---

## Step 2: Work in repositories

Once your repositories exist, you work with them as you would with any other Git-based SCM tool:

- [Clone your repo to work locally](/docs/code-repository/work-in-repos/clone-repos): Download the repository to your machine to develop and test changes offline.
- [Branch, commit, and tag](/docs/code-repository/work-in-repos/branch): Create branches for feature development, then [commit](/docs/code-repository/work-in-repos/commit) changes from the command line or the Harness UI and [tag](/docs/code-repository/work-in-repos/tag) releases.
- [Create, review, and merge pull requests](/docs/category/pull-requests): Collaborate through pull requests that carry code reviews, automated checks, and controlled merging.

:::tip
You can perform many Git operations directly in the Harness UI without the command line, which helps team members who prefer a visual interface.
:::

---

## Step 3: Configure pipelines

Connect your Harness Code repositories to CI and CD pipelines to automate delivery:

- [Configure pipelines to use Harness Code repos](/docs/code-repository/pipelines/codebase-from-harness-code): Set your Harness CI or CD pipeline to build, test, and deploy code from a Harness Code repository when changes are pushed or pull requests merge.
- [Configure triggers](/docs/code-repository/pipelines/code-triggers): Run a pipeline automatically in response to repository events.

---

## Step 4: Manage access and security

Control who can reach your repositories and what they can do:

- [Configure rules and CODEOWNERS](/docs/code-repository/config-repos/rules): Require reviews, status checks, or approvals before a merge, and use a `CODEOWNERS` file to assign reviewers based on which files changed.
- [Enable security](/docs/code-repository/config-repos/security): Turn on secret scanning, vulnerability scanning, and committer email verification.
- [Set up role-based access control](/docs/platform/role-based-access-control/rbac-in-harness): Manage broader access through Harness Platform RBAC, using the built-in **Code Admin** role or a custom role.

The following video walks through access control in Harness Code:

<DocVideo src="https://www.youtube.com/watch?v=SaH27_UgAxA" />

---

## Troubleshooting

<Troubleshoot
  issue="Code Repository does not appear in the Harness module list"
  mode="docs"
  fallback="Code Repository must be entitled on your account. Contact your account administrator or Harness Support to confirm entitlement."
/>

<Troubleshoot
  issue="Cannot create a repository in a Harness project because the option is unavailable"
  mode="docs"
  fallback="Creating a repository requires the Create permission on the Repository resource. Ask an administrator to assign a role that includes it."
/>

<Troubleshoot
  issue="A Harness pipeline cannot find the Harness Code repository when configuring the codebase"
  mode="docs"
  fallback="The pipeline and the repository must be in the same Harness project. Confirm the project scope, then reselect the repository in the codebase configuration."
/>

---

## Next steps

You have set up Harness Code Repository and can manage your code with the access controls and security scanning your organization requires. You can now collaborate through code reviews, automate builds and deployments, and integrate with other Harness modules.

- [Pull request workflows](/docs/category/pull-requests): Review, approve, and merge changes.
- [Code Repository integrations](/docs/category/code-repository-integrations): Connect Harness Code to tools such as Jira.
- [Subscriptions and licenses](/docs/code-repository/get-started/cr-subscription-mgmt): Understand storage and bandwidth limits.
