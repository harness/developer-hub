---
title: Harness Code Repository key concepts
sidebar_label: Key concepts
description: Basic terminology and concepts related to Harness Code
sidebar_position: 3
---

This topic covers basic terminology and concepts related to the Harness Code Repository (Code) module.

## Source code management

Harness Code is a source code management (SCM) tool. SCM tools are used for [**version control**](https://en.wikipedia.org/wiki/Version_control) or **source control**, which is a software engineering practice that facilitates collaboration and maintenance of code bases. Version control practices help maintain change history, resolve conflicts when multiple people work on the same file, and stage changes for future releases or separate projects. SCM tools often provide mechanism to facilitate peer reviews, approvals, and rollbacks.

## Git: Clone, branch, merge, commit, tag, and more

Harness Code provides Git-based repositories. [Git](https://en.wikipedia.org/wiki/Git) is a version control tool characterized by concepts such as cloning, branching, committing, and merging. If you aren't familiar with these concepts, there are many tutorials, courses, and videos online that can introduce you to the basics of Git-based version control, in addition to the complete [Git SCM documentation](https://git-scm.com/doc).

## Pull requests

While pull requests (PRs) aren't a feature of Git itself, they are often, if not always, a feature of SCM tools. Pull requests facilitate reviews by gathering a series of commits into a package that can be reviewed, approved, and then merged into the base branch.

You can assign reviewers to pull requests and configure mandatory requirements or checks that must pass before the PR can be merged.

<!-- To add: code owners, semantic search -->

## Harness Platform components

Harness Code integrates with other Harness modules and uses components that are common to the Harness Platform. For more information about Harness Platform terminology and concepts, go to [Harness key concepts](../../get-started/key-concepts.md).

### Pipelines

You can use [webhooks](../pipelines/webhooks.md) and [triggers](/docs/category/triggers) to run Harness pipelines in response to Git events in your Harness Code repositories.

A pipeline is an end-to-end workflow that, for example, pulls code from a codebase, builds an artifact, runs tests or other actions on the artifact or code, and then uploads or deploys the artifact to storage or a container registry.

To learn more about CI and CD pipelines go to:

* [CI key concepts](../../continuous-integration/get-started/key-concepts.md)
* [CD key concepts](../../continuous-delivery/get-started/key-concepts.md)

### Projects

Repositories you create in Harness Code each belong to a [Harness project](https://developer.harness.io/docs/platform/get-started/key-concepts#organizations--projects). This provides a measure of access control for your repositories.

### Access control

Access control for Harness Code is part of the [Harness Platform RBAC](/docs/platform/role-based-access-control/rbac-in-harness.md).

Harness Code includes one [built-in role](/docs/platform/role-based-access-control/add-manage-roles.md), which is the **Code Admin** role.
