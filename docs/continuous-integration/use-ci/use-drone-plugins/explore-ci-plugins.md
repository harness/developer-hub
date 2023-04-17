---
title: Explore plugins
description: Learn how, why, and when to use plugins
sidebar_position: 10
---

Plugins perform predefined tasks. They are essentially templated scripts that can be written in any programming language. Examples of plugins include:

* Drone Plugins
* GitHub Actions
* Bitrise Integrations

You can build your own plugins or use one of the many preexisting plugins from the [Drone Plugins Marketplace](https://plugins.drone.io/), [GitHub Actions Marketplace](https://github.com/marketplace?type=actions), or the [Bitrise Integrations library](https://bitrise.io/integrations/steps).

There are several ways to incorporate plugins in your CI pipelines:

* Drone Plugins: Use the [Plugin step](./run-a-drone-plugin-in-ci.md).
* GitHub Actions: Use the [GitHub Action plugin step](../../ci-technical-reference/ci-github-action-step.md) with the Harness Cloud build infrastructure. Use the [Plugin step](./run-a-git-hub-action-in-cie.md) with other build infrastructures.
* Bitrise Integrations: Use the [Bitrise plugin step](../../ci-technical-reference/ci-bitrise-plugin.md) with the Harness Cloud build infrastructure. Use the [Plugin step](../../ci-technical-reference/plugin-step-settings-reference.md) with other build infrastructures.