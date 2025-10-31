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
| `CI_ENABLE_OUTPUT_SECRETS`, `CI_SKIP_NON_EXPRESSION_EVALUATION` | Type selection for [output variables in Run steps](/docs/continuous-integration/use-ci/run-step-settings#output-variables). | Beta |
| `CI_USE_LESS_STRICT_EVALUATION_FOR_MAP_VARS` | Allows empty environment variables in CI pipelines. | Beta |
| `CI_ENABLE_OUTPUT_SECRETS`, `CI_SKIP_NON_EXPRESSION_EVALUATION` | Type selection for [output variables in Run steps](/docs/continuous-integration/use-ci/run-step-settings#output-variables). | Beta |
| `CI_USE_LESS_STRICT_EVALUATION_FOR_MAP_VARS` | Allows empty environment variables in CI pipelines. | Beta |
| `CI_ENABLE_VM_DELEGATE_SELECTOR` | Delegate selectors for self-managed VM build infrastructures (CI-11545).<br/>With this feature flag enabled, you can use [delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors) with [self-managed VM build infrastructure](/docs/category/set-up-vm-build-infrastructures). | Beta |
| `CI_SECURE_TUNNEL` | Secure Connect for Harness Cloud (CI-8922).<br/>[Secure Connect for Harness Cloud](/docs/continuous-integration/secure-ci/secure-connect) facilitates private networking with Harness Cloud runners. | Limited GA |
| `CI_CODEBASE_SELECTOR` | Delegate selectors for codebase tasks (CI-9980).<br/>Without this feature flag enabled, delegate selectors aren't applied to delegate-related CI codebase tasks.<br/>With this feature flag enabled, Harness uses your [delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors) for delegate-related codebase tasks. Delegate selection for these tasks takes precedence in order of [pipeline selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/#pipeline-delegate-selector) over [connector selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/#infrastructure-connector). | Beta |
| `CI_OUTPUT_VARIABLES_AS_ENV` | Output variables automatically become environment variables (CI-7817, ZD-39203).<br/>With this feature flag enabled, output variables from steps are automatically available as environment variables for other steps in the same Build (`CI`) stage. This means that, if you have a Build stage with three steps, an output variable produced from step one is automatically available as an environment variable for steps two and three.<br/>In other steps in the same stage, you can refer to the output variable by its key without additional identification. For example, an output variable called `MY_VAR` can be referenced later as simply `$MY_VAR`. Without this feature flag enabled, you must use an [expression](/docs/platform/variables-and-expressions/runtime-inputs/#expressions) to reference where the variable originated, such as `<+steps.stepID.output.outputVariables.MY_VAR>`.<br/>For more information on this feature, go to the documentation on [Output variables](/docs/continuous-integration/use-ci/run-step-settings#output-variables). | Beta |
| `CI_REMOTE_DEBUG` | Remote debugging (CI-8135, CI-8048)<br/>Harness CI now supports remote debugging in certain scenarios. You can re-run builds in debug mode through the **Builds**, **Execution**, and **Execution History** pages of the Harness UI. For more information, go to [Debug mode](/docs/continuous-integration/troubleshoot-ci/debug-mode).<br/>**Update (June 2023):** Debug mode now supports Python, PowerShell Core (`pwsh`), and debugging in local runner build infrastructures. Debug mode is not supported in the Self-Managed Enterprise Edition. For more information, go to [Debug with SSH](/docs/continuous-integration/troubleshoot-ci/debug-mode) | Beta |
| `CI_INCREASE_DEFAULT_RESOURCES` | Used to adjust [resource allocation limits](/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits/#override-resource-limits). This feature flag increases maximum CPU to 1000m and maximum memory to 3000Mi. | Beta |
| `CI_CONSERVATIVE_K8_RESOURCE_LIMITS` | Used to adjust [resource allocation limits](/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits/#override-resource-limits). This feature flag sets lite engine resource limits to the default minimum (100m CPU and 100Mi memory). | Beta |
| `CI_REMOVE_FQN_DEPENDENCY` | This flag is useful for steps that use a private Docker registry. With this flag enabled, the step uses the URI specified in the Docker connector. This means you don't need to specify the Fully Qualified Name in the Image field. This change applies to the following steps: **Plugin**, **Background**, **Run**, **Run Tests**, and **Test Intelligence**. | Beta |
| `CI_EXTRA_ADDON_RESOURCE` | Used to speed up CI builds by adding more resources for running 'addon`. | Beta |
| `CI_OVERRIDE_SERVICE_URLS` | Using this flag overrides all Harness service URLs (e.g. TI Service, Log Service, etc.). These URLs will be derived from the [manager URL](/docs/platform/delegates/delegate-reference/delegate-environment-variables#manager_host_and_port) | Beta | 
| `CI_POPULATE_CI_VARIABLE` | Enforces that the environment variable `CI` is always `true` for all builds. | Beta |

<!-- In development: CI_YAML_VERSIONING, CI_ENABLE_TTY_LOGS, CIE_ENABLE_RUNTEST_V2, CI_ENABLE_INTELLIGENT_DEFAULTS  -->

<!-- Beta but not listed in table: CI_PIPELINE_VARIABLES_IN_STEPS (build & push env vars?), CI_VM_CONTAINERLESS_RUN_ASUSER

CI_INDIRECT_LOG_UPLOAD possibly moving to Account settings

Harness Cloud flags: CI_ENABLE_BARE_METAL, HOSTED_BUILDS, CIE_HOSTED_VMS

<!-- unknown: CI_DISABLE_RESOURCE_OPTIMIZATION, CI_EXTRA_ADDON_RESOURCE, DISABLE_CI_STAGE_DEL_SELECTOR, ENABLE_K8_BUILDS (probably remove since K8s is paid only), CI_PARSE_SAVINGS -->
