---
title: Explore plugins
description: Learn how, why, and when to use plugins
sidebar_position: 10
---

Plugins perform predefined tasks. They are essentially templated scripts that can be written in any programming language.

You can build your own plugins or use one of the many preexisting plugins from the [Drone Plugins Marketplace](https://plugins.drone.io/), [GitHub Actions Marketplace](https://github.com/marketplace?type=actions), or the [Bitrise Integrations library](https://bitrise.io/integrations/steps).

To include a plugin in a CI pipeline, you use either the generic **Plugin** step or a specialized plugin step.

## GitHub Actions

Use the [GitHub Action plugin step](../../ci-technical-reference/plugin-steps/ci-github-action-step.md) in pipelines that use Harness Cloud build infrastructure. For other build infrastructures, use the [Plugin step](./run-a-git-hub-action-in-cie.md).

## Bitrise Integrations

Use the [Bitrise plugin step](./ci-bitrise-plugin.md) in pipelines that use Harness Cloud build infrastructure. For other build infrastructures, use the [Plugin step](./plugin-step-settings-reference.md).

## Jira integrations

Use a **Plugin** step as explained in [Integrate Jira in a CI pipeline](./ci-jira-int-plugin.md).

## Custom plugins and other Drone plugins

Use the [Plugin step](./run-a-drone-plugin-in-ci.md).
