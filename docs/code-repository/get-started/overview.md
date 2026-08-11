---
title: Overview and key concepts
sidebar_label: Overview & Key Concepts
description: Learn about Harness Code Repository and the source code management concepts it builds on.
keywords:
  - source code management
  - SCM
  - Git
  - pull requests
  - key concepts
tags:
  - code-repository
  - get-started
  - concepts
sidebar_position: 11
canonical_url: https://www.harness.io/harness-devops-academy/what-is-a-code-repository
redirect_from:
  - /docs/code-repository/get-started/key-concepts
---

The [Harness Code Repository module](/docs/code-repository/code-supported) (Code) is a source code management (SCM) tool that supports developer collaboration while keeping security and compliance in scope. Harness Code provides Git-based repositories with collaborative code reviews, checks, and rule enforcement, and integrates those repositories across your software delivery processes in Harness.

This page explains the SCM concepts Harness Code builds on and how the module fits into the wider Harness Platform. It suits readers who are new to Git-based version control as well as readers moving from another SCM tool.

---

## What you will learn

- **Source code management:** What version control is and what an SCM tool provides beyond Git itself.
- **Git fundamentals:** The clone, branch, commit, merge, and tag model that Harness Code repositories use.
- **Pull requests:** How pull requests package commits for review, approval, and merge.
- **Platform integration:** How repositories relate to Harness projects, pipelines, and role-based access control.

---

## Source code management

Harness Code is a source code management tool. SCM tools provide [version control](https://en.wikipedia.org/wiki/Version_control), also called source control, which is the engineering practice of tracking and coordinating changes to a codebase. Version control maintains change history, resolves conflicts when several people edit the same file, and stages changes for future releases or separate projects. SCM tools add mechanisms for peer review, approval, and rollback on top of that history.

### Git concepts

Harness Code provides Git-based repositories. [Git](https://en.wikipedia.org/wiki/Git) is a version control tool built around cloning, branching, committing, and merging. Go to the [Git SCM documentation](https://git-scm.com/doc) to learn these fundamentals if they are new to you.

### Pull requests

Pull requests are not a feature of Git itself, but they are a feature of nearly every SCM tool. A pull request gathers a series of commits into a package that reviewers can inspect, approve, and merge into the base branch.

You can assign reviewers to a pull request and configure mandatory requirements or checks that must pass before the pull request can merge. Go to [Rules](/docs/code-repository/config-repos/rules) to configure those requirements.

---

## Harness Platform integration

Harness Code uses components that are common to the Harness Platform and integrates with other Harness modules. Go to [Harness key concepts](/docs/platform/get-started/key-concepts) to review Platform terminology.

### Pipelines

A pipeline is an end-to-end workflow that, for example, pulls code from a codebase, builds an artifact, runs tests or other actions against the artifact or code, and then uploads or deploys the artifact to storage or a container registry.

You can use [triggers](/docs/code-repository/pipelines/code-triggers) to run Harness pipelines in response to push events in your Harness Code repositories.

Go to the following pages to review pipeline concepts in each module:

- [CI key concepts](/docs/continuous-integration/get-started/key-concepts): Build and test pipeline concepts.
- [CD key concepts](/docs/continuous-delivery/overview#key-concepts): Deployment pipeline concepts.

### Projects

Every repository you create in Harness Code belongs to a [Harness project](/docs/platform/get-started/key-concepts#organizations-and-projects). The project boundary provides the first layer of access control for your repositories.

### Access control

Access control for Harness Code is part of [Harness Platform RBAC](/docs/platform/role-based-access-control/rbac-in-harness). The **Repository** resource supports the following permissions:

- **View:** Read repository contents.
- **Review:** Review pull requests.
- **Edit:** Change repository configuration and settings.
- **Create:** Create repositories in the scope.
- **Delete:** Delete repositories.
- **Push:** Push commits to repositories.
- **Report Commit Check:** Publish a commit status check back to a repository.

Go to the [permissions reference](/docs/platform/role-based-access-control/permissions-reference#code-repository) to review the permission identifiers, and to [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to assign them.

Harness Code includes a built-in **Code Admin** role.

<!-- TODO(SME): Confirm that Code Admin is still the only built-in role shipped with Harness Code Repository, and state which of the seven Repository permissions it grants. -->

---

## Related concepts

Now that you understand the key concepts, you are ready to start using Harness Code.

- [Get started with Harness Code](/docs/code-repository/get-started/onboarding-guide): Set up repositories, access, and pipelines.
- [Supported features and functionality](/docs/code-repository/code-supported): Review what Harness Code supports today.
- [Harness Code API reference](https://apidocs.harness.io/tag/repository): Automate repository management.
