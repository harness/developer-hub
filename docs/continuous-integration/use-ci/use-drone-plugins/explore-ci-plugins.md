---
title: Explore plugins
description: Learn how, why, and when to use plugins
sidebar_position: 10
---

Plugins perform predefined tasks. They are essentially templated scripts that can be written in any programming language.

You can build your own plugins or use one of the many preexisting plugins from the [Drone Plugins Marketplace](https://plugins.drone.io/), [GitHub Actions Marketplace](https://github.com/marketplace?type=actions), or the [Bitrise Integrations library](https://bitrise.io/integrations/steps).

To include a plugin in a CI pipeline, you use either the generic **Plugin** step or a specialized plugin step.

## Custom plugins

You can [write your own plugins](./custom_plugins.md) and use **Plugin** steps to run them in your Harness CI pipelines.

## Drone plugins

You can use [Plugin steps](./run-a-drone-plugin-in-ci.md) to run [Drone plugins](https://plugins.drone.io/) in Harness CI pipelines.

For example, you can use the Artifact Metadata Publisher plugin to publish any artifact URL to the [Artifacts tab](../viewing-builds.md). For instructions, go to:

* [View test reports on the Artifacts tab.](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests#view-reports-on-the-artifacts-tab)
* [View code coverage reports on the Artifacts tab.](/docs/continuous-integration/use-ci/set-up-test-intelligence/code-coverage#view-code-coverage-reports-on-the-artifacts-tab)
* [View GCS artifacts on the Artifacts tab.](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings#view-artifacts-on-the-artifacts-tab)
* [View JFrog artifacts on the Artifacts tab.](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog#view-artifacts-on-the-artifacts-tab)
* [View Sonatype Nexus artifacts on the Artifacts tab.](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-sonatype-nexus#view-artifacts-on-the-artifacts-tab)
* [View S3 artifacts on the Artifacts tab.](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings#view-artifacts-on-the-artifacts-tab)

## Bitrise Integrations

How you run [Bitrise Integrations](https://bitrise.io/integrations/steps) in Harness CI pipelines depends on your [build infrastructure](../set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md).

* With Harness Cloud build infrastructure, use the [Bitrise plugin step](./ci-bitrise-plugin.md).
* With other build infrastructures, you can use a [custom plugin](./custom_plugins.md).

## GitHub Actions

How you run [GitHub Actions](https://github.com/marketplace?type=actions) in Harness CI pipelines depends on your [build infrastructure](../set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md).

* With Harness Cloud build infrastructure, use the [GitHub Action plugin step](./ci-github-action-step.md).
* With other build infrastructures, use the [GitHub Actions Drone plugin in a Plugin step](./run-a-git-hub-action-in-cie.md).

## Jira integrations

If you want your CI pipelines to update Jira issues, you can use a **Plugin** step as explained in [Integrate Jira in a CI pipeline](./ci-jira-int-plugin.md).
