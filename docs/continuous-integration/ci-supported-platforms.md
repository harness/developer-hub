---
title: What's supported by Harness CI
description: Platforms and technologies supported by Harness CI
sidebar_label: What's supported
sidebar_position: 10
---

This page describes supported platforms and technologies for Harness CI specifically.

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/platform/platform-whats-supported).

## Harness CI supported platforms and technologies

import Ci from '/docs/continuous-integration/shared/ci-supported-platforms.md';

<Ci />

## Harness CI features

For an overview of key CI features, go to [Harness CI overview](/docs/continuous-integration/get-started/overview.md) and [Harness CI key concepts](/docs/continuous-integration/get-started/key-concepts.md).

For information about upcoming and recently released features, go to the [CI product roadmap](https://developer.harness.io/roadmap/#ci), [CI release notes](/release-notes/continuous-integration).

### Harness CI early access features

Some Harness CI features are released behind feature flags to get feedback from a subset of customers before releasing the features to general availability.

You can opt-in to the early access (beta) features for Harness CI described in the following table. Contact [Harness Support](mailto:support@harness.io) to enable specific early access features in your Harness account. Include the feature flag or name with your request.

For more information about early access features, including early access features for the Harness Platform, delegate, and other Harness modules, go to [Early access features](/release-notes/early-access).

| Flag | Description | Availability |
| ---  | ----------- | ------------ |
| `CI_ENABLE_DLC_SELF_HOSTED`, `CI_ENABLE_CACHE_INTEL_SELF_HOSTED` | [Harness-managed Docker layer caching](/docs/continuous-integration/use-ci/caching-ci-data/docker-layer-caching.md) and [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) for self-managed build infrastructures. | Beta |
| `CIE_ENABLE_RUNTEST_V2` | [Tests V2 step.](/docs/continuous-integration/use-ci/run-tests/tests-v2.md) | Beta |
| `CI_ENABLE_OUTPUT_SECRETS`, `CI_SKIP_NON_EXPRESSION_EVALUATION` | Type selection for [output variables in Run steps](/docs/continuous-integration/use-ci/run-step-settings#output-variables). | Beta |
| `CI_USE_LESS_STRICT_EVALUATION_FOR_MAP_VARS` | Allows empty environment variables in CI pipelines. | Beta |
| `CI_ENABLE_RESOURCE_CLASSES` | Support for selecting [resource classes](/docs/continuous-integration/get-started/ci-subscription-mgmt/#harness-cloud-billing-and-build-credits) in Harness Cloud, which you can use to select specific infrastructure resources. | Beta |
| `CI_ENABLE_OUTPUT_SECRETS`, `CI_SKIP_NON_EXPRESSION_EVALUATION` | Type selection for [output variables in Run steps](/docs/continuous-integration/use-ci/run-step-settings#output-variables). | Beta |
| `CI_USE_LESS_STRICT_EVALUATION_FOR_MAP_VARS` | Allows empty environment variables in CI pipelines. | Beta |
| `CI_ENABLE_DLC`, `CI_HOSTED_CONTAINERLESS_OOTB_STEP_ENABLED` | [Docker layer caching for Harness Cloud](/docs/continuous-integration/use-ci/caching-ci-data/docker-layer-caching.md) | Beta |
| `CI_ENABLE_DLC_SELF_HOSTED`, `CI_ENABLE_CACHE_INTEL_SELF_HOSTED` | Default settings that enable you to configure s3-compatible caching in self-hosted build infrastructures. You can configure the endpoint URL, region, bucket name, access key, and secret key. (CI-11953) | Beta |
| `CI_ENABLE_VM_DELEGATE_SELECTOR` | Delegate selectors for self-managed VM build infrastructures (CI-11545).<br/>With this feature flag enabled, you can use [delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors) with [self-managed VM build infrastructure](/docs/category/set-up-vm-build-infrastructures). | Beta |
| `CI_SECURE_TUNNEL` | Secure Connect for Harness Cloud (CI-8922).<br/>[Secure Connect for Harness Cloud](/docs/continuous-integration/secure-ci/secure-connect) facilitates private networking with Harness Cloud runners. | Beta |
| `CI_CODEBASE_SELECTOR` | Delegate selectors for codebase tasks (CI-9980).<br/>Without this feature flag enabled, delegate selectors aren't applied to delegate-related CI codebase tasks.<br/>With this feature flag enabled, Harness uses your [delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors) for delegate-related codebase tasks. Delegate selection for these tasks takes precedence in order of [pipeline selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/#pipeline-delegate-selector) over [connector selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/#infrastructure-connector). | Beta |
| `CI_OUTPUT_VARIABLES_AS_ENV` | Output variables automatically become environment variables (CI-7817, ZD-39203).<br/>With this feature flag enabled, output variables from steps are automatically available as environment variables for other steps in the same Build (`CI`) stage. This means that, if you have a Build stage with three steps, an output variable produced from step one is automatically available as an environment variable for steps two and three.<br/>In other steps in the same stage, you can refer to the output variable by its key without additional identification. For example, an output variable called `MY_VAR` can be referenced later as simply `$MY_VAR`. Without this feature flag enabled, you must use an [expression](/docs/platform/variables-and-expressions/runtime-inputs/#expressions) to reference where the variable originated, such as `<+steps.stepID.output.outputVariables.MY_VAR>`.<br/>For more information on this feature, go to the documentation on [Output variables](/docs/continuous-integration/use-ci/run-step-settings#output-variables). | Beta |
| `CI_REMOTE_DEBUG` | Remote debugging (CI-8135, CI-8048)<br/>Harness CI now supports remote debugging in certain scenarios. You can re-run builds in debug mode through the **Builds**, **Execution**, and **Execution History** pages of the Harness UI. For more information, go to [Debug mode](/docs/continuous-integration/troubleshoot-ci/debug-mode).<br/>**Update (June 2023):** Debug mode now supports Python, PowerShell Core (`pwsh`), and debugging in local runner build infrastructures. Debug mode is not supported in the Self-Managed Enterprise Edition. For more information, go to [Debug with SSH](/docs/continuous-integration/troubleshoot-ci/debug-mode) | Beta |
| `TI_DOTNET` | [Test Intelligence for C# when using Test Intelligence v1 with Run Tests step.](/docs/continuous-integration/use-ci/run-tests/tests-v1/ti-for-csharp.md) | Beta |
| `CI_TI_DASHBOARDS_ENABLED` | [Test report dashboards.](/docs/continuous-integration/use-ci/run-tests/viewing-tests/#test-report-dashboard) | Beta |
| `CI_INDIRECT_LOG_UPLOAD` | Enables uploading of logs through log service for certain troubleshooting scenarios, for example, if [step logs disappear](https://developer.harness.io/kb/continuous-integration/continuous-integration-faqs#step-logs-disappear). | Beta |
| `CI_INCREASE_DEFAULT_RESOURCES` | Used to adjust [resource allocation limits](/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits/#override-resource-limits). This feature flag increases maximum CPU to 1000m and maximum memory to 3000Mi. | Beta |
| `CI_CONSERVATIVE_K8_RESOURCE_LIMITS` | Used to adjust [resource allocation limits](/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits/#override-resource-limits). This feature flag sets lite engine resource limits to the default minimum (100m CPU and 100Mi memory). | Beta |
| `CI_USE_BUILDX_ON_K8` | With this flag enabled, a Build and Push step, running on k8s, uses buildx rather than kaniko. You must run buildx on k8s with Privileged mode enabled.  | Beta |
| `CI_REMOVE_FQN_DEPENDENCY` | This flag is useful for steps that use a private Docker registry. With this flag enabled, the step uses the URI specified in the Docker connector. This means you don't need to specify the Fully Qualified Name in the Image field. This change applies to the following steps: **Plugin**, **Background**, **Run**, **Run Tests**, and **Test Intelligence**. | Beta |
| `CI_EXTRA_ADDON_RESOURCE` | Used to speed up CI builds by adding more resources for running 'addon`. | Beta |

<!-- In development: CI_YAML_VERSIONING, CI_ENABLE_TTY_LOGS, CIE_ENABLE_RUNTEST_V2, CI_ENABLE_INTELLIGENT_DEFAULTS  -->

<!-- Beta but not listed in table: CI_PIPELINE_VARIABLES_IN_STEPS (build & push env vars?), CI_VM_CONTAINERLESS_RUN_ASUSER

CI_INDIRECT_LOG_UPLOAD possibly moving to Account settings

Harness Cloud flags: CI_ENABLE_BARE_METAL, HOSTED_BUILDS, CIE_HOSTED_VMS

<!-- unknown: CI_DISABLE_RESOURCE_OPTIMIZATION, CI_EXTRA_ADDON_RESOURCE, DISABLE_CI_STAGE_DEL_SELECTOR, ENABLE_K8_BUILDS (probably remove since K8s is paid only), CI_PARSE_SAVINGS -->

### Harness CI features promoted to GA

Features promoted to general availability (GA) are removed from the early access features table and announced as new features in the [CI release notes](/release-notes/continuous-integration). The CI release notes also include features released directly to GA.

Here are some CI early access features that were recently promoted to GA:

| Flag | Description | GA date |
| ---  | ----------- | ------- |
| `CI_ENABLE_DLC`, `CI_HOSTED_CONTAINERLESS_OOTB_STEP_ENABLED` | [Harness-managed Docker layer caching](/docs/continuous-integration/use-ci/caching-ci-data/docker-layer-caching.md) for Harness Cloud build infrastructure. | May 2024 |
| `CI_CACHE_INTELLIGENCE` | You can [enable and configure Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) in the Pipeline Studio's Visual editor. Cache intelligence is GA for Harness Cloud build infrastructure. | May 2024 |
| `CI_BITBUCKET_STATUS_KEY_HASH` | Addresses an issue with [Harness build status updates in Bitbucket PRs](/docs/platform/connectors/code-repositories/ref-source-repo-provider/bitbucket-connector-settings-reference/#status-doesnt-update-in-bitbucket-cloud-prs) | April 2024 |
| `CI_LE_STATUS_REST_ENABLED` | Send status updates to Harness Manager directly by HTTP (CI-8338).<br/>This feature causes CI steps to send status updates to the [Harness Manager](/docs/platform/get-started/key-concepts.md#harness-manager) directly by HTTP, rather than through a delegate. | Early 2024 |
| `QUEUE_CI_EXECUTIONS`, `QUEUE_CI_EXECUTIONS_CONCURRENCY` | [Queue Intelligence for Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md#queue-intelligence) | Early 2024 |
| `CDS_GITHUB_APP_AUTHENTICATION` | GitHub App authentication for GitHub connectors (CI-8577).<br/>You can use a GitHub App as the [primary authentication method for a GitHub connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#credentials-settings). | December 2023 |
| `CI_AI_ENHANCED_REMEDIATIONS` | Harness AI Development Assistant (AIDA:tm:) for CI (CI-8599, CI-8735, CI-9102).<br/>The Harness platform leverages Harness AI Development Assistant (AIDA) to revolutionize software delivery processes. By combining AI capabilities with robust DevOps tools, features, and practices, the Harness platform streamlines and accelerates the software delivery lifecycle, and it empowers teams to deliver high-quality applications quickly and efficiently. Its AI-driven predictive analytics, continuous verification, and advanced release orchestration capabilities empower teams to drive innovation, improve efficiency, and ultimately deliver exceptional user experiences.<br/>In Harness CI, AIDA provides auto-recognition of failures in pipelines. The root cause analysis (RCA) option generates recommendations for step failures in pipelines. Harness bases these recommendations on the step logs and the context of the failed step.<br/>For more information, go to [Troubleshooting with AIDA](/docs/continuous-integration/troubleshoot-ci/aida). | October 2023 |
| `CI_DOCKER_INFRASTRUCTURE` | Local runner build infrastructure (CI-5680)<br/>A Harness Docker delegate that you can install directly on a host. For more information, go to [Set up a local runner build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure). | Early 2023 |

<!-- CI_LE_STATUS_REST_ENABLED: In July 2023, this feature was rolled back to early access and disabled by default due to a discovered instability that caused the [CD Container step] (/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/container-step) to fail. This feature flag was disabled by default and had to be re-enabled if CI-to-Harness-Manager communications needed to support client connections with additional certificates. In or before April 2024, it was globally enabled again. -->
<!-- Additional cache intelligence flags: CI_USE_S3_FOR_CACHE, CI_CACHE_OVERRIDE_FALSE, CI_USE_GCS_FOR_MACOS_CACHE (use GCS for Cache Intelligence for MacOS hosted if the flag is enabled) - To enable Cache Intelligence on Harness CI Cloud macOS platform need these flags: CIE_HOSTED_VMS_MAC, CI_HOSTED_CONTAINERLESS_OOTB_STEP_ENABLED -->
