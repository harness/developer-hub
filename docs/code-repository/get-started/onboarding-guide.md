---
title: Get Started
description: A self-service onboarding guide for Harness Code Repository.
sidebar_position: 20
sidebar_label: Get Started
---

This guide walks you through the essential steps to start using the Harness Code Repository module. You'll learn how to set up repositories, configure access, work with your code, and integrate with pipelines.

If you're new to Harness, review the [Get started with Harness Platform](/docs/platform/get-started/onboarding-guide) before onboarding to Code. To understand core SCM concepts and how Harness Code integrates with the Harness Platform, see [Overview & Key Concepts](/docs/code-repository/get-started/overview).

## Prerequisites

- A Harness account with Code Repository enabled
- Appropriate permissions to create and manage repositories in your Harness project
- Basic familiarity with Git concepts (cloning, branching, committing)

## Step 1: Set up repositories

Choose how you want to bring code into Harness Code based on your needs:

- [**Create fresh repos**](/docs/code-repository/config-repos/create-repo): Start a new repository from scratch in Harness Code for new projects or microservices.
- [**Import repos**](/docs/code-repository/config-repos/import-repo): Migrate existing repositories from other Git SCM providers like GitHub, GitLab, or Bitbucket to Harness Code.
- [**Mirror repos**](/docs/code-repository/config-repos/mirror): Create read-only mirrors of repositories from any SCM provider to enable CI/CD integration while keeping your source code in its original location.

## Step 2: Work in repositories

Once your repositories are set up, you can work with them just like any other Git-based SCM tool:

- [**Clone your repo to work locally**](/docs/code-repository/work-in-repos/clone-repos): Download your repository to your local machine using Git clone commands to develop and test changes offline.
- [**Branch, commit, and tag**](/docs/code-repository/work-in-repos/branch): Create branches for feature development, commit changes via command line or the Harness UI, and tag releases for version management. See also: [commit](/docs/code-repository/work-in-repos/commit), [tag](/docs/code-repository/work-in-repos/tag).
- [**Create, review, and merge pull requests**](/docs/category/pull-requests) — Collaborate with your team through pull requests that enable code reviews, automated checks, and controlled merging to maintain code quality.

:::tip
You can perform many Git operations directly in the Harness Platform UI without using the command line, making it easier for team members who prefer a visual interface.
:::

## Step 3: Configure pipelines

Connect your Harness Code repositories to CI/CD pipelines to automate your software delivery:

- [**Configure pipelines to use Harness Code repos**](/docs/code-repository/pipelines/codebase-from-harness-code): Set up your Harness CI or CD pipelines to automatically build, test, and deploy code from your Harness Code repositories whenever changes are pushed or pull requests are merged.

## Step 4: Manage access and security

Control who can access your repositories and what actions they can perform:

- [**Configure branch rules and CODEOWNERS**](/docs/code-repository/config-repos/rules): Set up branch protection rules to require reviews, status checks, or approvals before merging. Use CODEOWNERS files to automatically assign reviewers based on which files are changed.
- [**Set up role-based access control**](/docs/platform/role-based-access-control/rbac-in-harness): Manage broader access control through Harness Platform RBAC. Use the built-in **Code Admin** role or create custom roles with specific permissions (view, create/edit, delete, push) for your repositories.

Check out this video to learn more about access control with Harness Code:

<DocVideo src="https://www.youtube.com/watch?v=SaH27_UgAxA" />

## Next steps

You've successfully set up Harness Code Repository and are ready to manage your code with enterprise-grade security and compliance. You can now collaborate with your team through code reviews, automate builds and deployments, and integrate seamlessly with other Harness modules.

- [Learn about pull request workflows and code review best practices](/docs/category/pull-requests)
- [Explore Code Repository integrations](/docs/category/code-repository-integrations)
- [Understand subscription usage limits and storage](/docs/code-repository/get-started/cr-subscription-mgmt)
