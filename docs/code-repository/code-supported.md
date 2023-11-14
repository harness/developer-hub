---
title: What's supported for Harness Code Repository
description: The Code module has these features and functionality.
sidebar_label: What's supported
sidebar_position: 10
---

:::note

Currently, the Code Repository module is in beta and behind a feature flag. Contact [Harness Support](mailto:support@harness.io) if you're interested in this module.

:::

The [Harness Code Repository module](/docs/code-repository/code-supported.md) (Code) is a source code management (SCM) tool that fosters developer collaboration and accelerates innovation while keeping security and compliance in mind. Harness Code seamlessly integrates Git-based repositories across your software delivery processes in Harness.

The Harness Code supports these features:

* [Create repositories.](./config-repos/create-repo.md)
* [Import repositories.](./config-repos/import-repo.md)
* [Collaborate and develop](/docs/category/collaborate-and-develop):
   * Clone repositories to work locally.
   * Commit, branch, and tag directly in the Harness Platform.
* Create, review, and merge [pull requests](/docs/category/pull-requests)
   * Conduct code reviews.
   * Implement status checks.
   * Define merge requirements.
   * Specify merge strategies.
* Use Harness Code repositories in your [Harness pipelines](./pipelines/codebase-from-harness-code.md).
* [Configure webhooks](./config-repos/webhooks.md) to get notifications or automatically run pipelines in response to specific Git events in your repos.

These features are in pre-beta or in development:

* [Code owners](./config-repos/rules.md)
* Notifications
* [Branch rules](./config-repos/rules.md)
* AI-powered semantic search <!-- keyword search, add to AIDA section of platform docs -->

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/get-started/supported-platforms-and-technologies.md).
