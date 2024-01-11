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

* [View test reports on the Artifacts tab.](/docs/continuous-integration/use-ci/run-tests/viewing-tests#view-reports-on-the-artifacts-tab)
* [View code coverage reports on the Artifacts tab.](/docs/continuous-integration/use-ci/run-tests/code-coverage#view-code-coverage-reports-on-the-artifacts-tab)
* [View GCS artifacts on the Artifacts tab.](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings#view-artifacts-on-the-artifacts-tab)
* [View JFrog artifacts on the Artifacts tab.](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog#view-artifacts-on-the-artifacts-tab)
* [View Sonatype Nexus artifacts on the Artifacts tab.](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-sonatype-nexus#view-artifacts-on-the-artifacts-tab)
* [View S3 artifacts on the Artifacts tab.](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings#view-artifacts-on-the-artifacts-tab)

<!-- :::tip

Harness CI supports `DRONE_` environment variables. For more information, go to the CI environment variables reference ../optimize-and-more/ci-env-var.md .

:::-->

## Bitrise integrations

How you run [Bitrise integrations](https://bitrise.io/integrations/steps) in Harness CI pipelines depends on your [build infrastructure](../set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md).

* With Harness Cloud build infrastructure, use the [Bitrise step](./ci-bitrise-plugin.md).
* With other build infrastructures, you can use a [custom plugin](./custom_plugins.md).

## GitHub Actions

How you run [GitHub Actions](https://github.com/marketplace?type=actions) in Harness CI pipelines depends on your [build infrastructure](../set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md).

* With Harness Cloud build infrastructure, use the [GitHub Action step](./ci-github-action-step.md).
* With other build infrastructures, use the [GitHub Actions Drone plugin in a Plugin step](./run-a-git-hub-action-in-cie.md).

## Jira integrations

If you want your CI pipelines to update Jira issues, you can use a **Plugin** step as explained in [Integrate Jira in a CI pipeline](./ci-jira-int-plugin.md).

## Scanner integrations

The [Harness Security Testing Orchestration module](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference.md#harness-sto-scanner-support) provides first-class support for many security scanners. You can also use the [Drone SonarScanner plugin](https://plugins.drone.io/plugins/sonar-node-plugin) in a [Plugin step](./plugin-step-settings-reference.md), for example:

```yaml
              - step:
                  type: Plugin
                  name: Plugin_1
                  identifier: Plugin_1
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    image: kytay/sonar-node-plugin ## This is the sonarscanner plugin image.
                    settings:
                      sonar_host:
                        from_secret: sonar_host
                      sonar_token:
                        from_secret: sonar_token
                      use_node_version: 16.18.1
```

For information about SonarScanner plugin settings, go to the [Drone SonarScanner plugin documentation](https://plugins.drone.io/plugins/sonar-node-plugin).

For information about the Plugin step settings, go to the [Plugin step settings documentation](./plugin-step-settings-reference.md).
