---
title: Explore plugins
description: Learn how, why, and when to use plugins
sidebar_position: 10
---

Plugins perform predefined tasks. They are essentially templated scripts that can be written in any programming language.

You can build your own plugins or use one of the many preexisting plugins from the [Drone Plugins Marketplace](https://plugins.drone.io/), [GitHub Actions Marketplace](https://github.com/marketplace?type=actions), or the [Bitrise Integrations library](https://bitrise.io/integrations/steps).

To include a plugin in a CI pipeline, you use either the generic **Plugin** step or a specialized plugin step.

## Custom plugins

You can [write your own plugins](./custom_plugins.md) and use the **Plugin** step to run them in your Harness CI pipelines.

## Drone plugins

You can use the [Plugin step](./run-a-drone-plugin-in-ci.md) to run [Drone plugins](https://plugins.drone.io/) in Harness CI pipelines.

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

## View artifacts

You can use plugins to view artifacts on the [Artifacts tab](../viewing-builds.md). The plugin you use depends on where you upload artifacts.

* **GCS:** Use the Artifact Metadata Publisher plugin. For instructions, go to [Upload artifacts to GCS: View artifacts on the Artifacts tab](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings#view-artifacts-on-the-artifacts-tab).
* **JFrog:** Use the Artifact Metadata Publisher plugin. For instructions, go to [Upload Artifacts to JFrog: View artifacts on the Artifacts tab](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog#view-artifacts-on-the-artifacts-tab).
* **S3:** Use either the Artifact Metadata Publisher plugin or the S3 Upload and Publish plugin. For instructions, go to [Upload Artifacts to S3: View artifacts on the Artifacts tab](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings#view-artifacts-on-the-artifacts-tab).

## View test reports

If your test reports can't be uploaded to the **Tests** tab, you can use plugins to view them on the **Artifacts** tab.

* You can use the Artifact Metadata Publisher plugin to upload any test report to the **Artifacts** tab. For instructions, go to [View tests: View reports on the Artifacts tab](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests#view-reports-on-the-artifacts-tab).
* If you use JaCoCo for code coverage, you can use the JaCoCo Drone plugin. For instructions, go to [Code coverage by language: Java](/docs/continuous-integration/use-ci/set-up-test-intelligence/code-coverage#java).
* For other code coverage tools, you can use either the Artifact Metadata Publisher plugin or the S3 Upload and Publish plugin. For instructions, go to [Code coverage: View code coverage reports on the Artifacts tab](/docs/continuous-integration/use-ci/set-up-test-intelligence/code-coverage#view-code-coverage-reports-on-the-artifacts-tab).

## Build and Push images

All [Build and Push steps](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact) use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md) by default (except when used with [self-hosted VM build infrastructures](/docs/category/set-up-vm-build-infrastructures), which use Docker). This tool requires root access to build the Docker image. It doesn't support non-root users. If your security policy doesn't allow running as root, you must use the Buildah Drone plugin to [build and push with non-root users](../build-and-upload-artifacts/build-and-push-nonroot.md).
