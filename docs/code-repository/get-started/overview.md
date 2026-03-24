---
title: Overview & Key Concepts
description: Learn about Harness Code Repository and essential concepts for source code management.
sidebar_position: 11
sidebar_label: Overview & Key Concepts
canonical_url: https://www.harness.io/harness-devops-academy/what-is-a-code-repository
redirect_from:
  - /docs/code-repository/get-started/key-concepts
---

The [Harness Code Repository module](/docs/code-repository/code-supported) (Code) is a source code management (SCM) tool that fosters developer collaboration and accelerates innovation while keeping security and compliance in mind. Harness Code seamlessly integrates Git-based repositories across your software delivery processes in Harness.

Harness Code provides Git-based repositories with collaborative code reviews, checks, and rules enforcement to maintain code quality while reducing risk. It integrates seamlessly with other Harness modules to provide an end-to-end software delivery platform.

Whether you're new to Git-based version control or experienced with other SCM tools, this guide will help you understand the core concepts and capabilities of Harness Code.

## Source code management

Harness Code is a source code management (SCM) tool. SCM tools are used for [**version control**](https://en.wikipedia.org/wiki/Version_control) or **source control**, which is a software engineering practice that facilitates collaboration and maintenance of code bases. Version control practices help maintain change history, resolve conflicts when multiple people work on the same file, and stage changes for future releases or separate projects. SCM tools often provide mechanism to facilitate peer reviews, approvals, and rollbacks.

### Git: Clone, branch, merge, commit, tag, and more

Harness Code provides Git-based repositories. [Git](https://en.wikipedia.org/wiki/Git) is a version control tool characterized by concepts such as cloning, branching, committing, and merging. If you aren't familiar with these concepts, there are many tutorials, courses, and videos online that can introduce you to the basics of Git-based version control, in addition to the complete [Git SCM documentation](https://git-scm.com/doc).

### Pull requests

While pull requests (PRs) aren't a feature of Git itself, they are often, if not always, a feature of SCM tools. Pull requests facilitate reviews by gathering a series of commits into a package that can be reviewed, approved, and then merged into the base branch.

You can assign reviewers to pull requests and configure mandatory requirements or checks that must pass before the PR can be merged.

## Harness Platform integration

Harness Code integrates with other Harness modules and uses components that are common to the Harness Platform. For more information about Harness Platform terminology and concepts, go to [Harness key concepts](/docs/platform/get-started/key-concepts).

### Pipelines

You can use [triggers](/docs/code-repository/pipelines/code-triggers) to run Harness pipelines in response to push events in your Harness Code repositories.

A pipeline is an end-to-end workflow that, for example, pulls code from a codebase, builds an artifact, runs tests or other actions on the artifact or code, and then uploads or deploys the artifact to storage or a container registry.

To learn more about CI and CD pipelines go to:

* [CI key concepts](/docs/continuous-integration/get-started/key-concepts)
* [CD key concepts](/docs/continuous-delivery/overview#key-concepts)

### Projects

Repositories you create in Harness Code each belong to a [Harness project](/docs/platform/get-started/key-concepts#organizations-and-projects). This provides a measure of access control for your repositories.

### Access control

Access control for Harness Code is part of the [Harness Platform RBAC](/docs/platform/role-based-access-control/rbac-in-harness). Permissions for Harness Code include the ability to view, create/edit, delete, and push to repositories.

Harness Code includes one [built-in role](/docs/platform/role-based-access-control/add-manage-roles), which is the **Code Admin** role.

## Next steps

Now that you understand the key concepts, you're ready to start using Harness Code.

- [Get Started with Harness Code](/docs/code-repository/get-started/onboarding-guide)
- [Supported features and functionality](/docs/code-repository/code-supported)
- [Harness Code API reference](https://apidocs.harness.io/tag/repository)
