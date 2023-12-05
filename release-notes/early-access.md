---
title: Early access features
date: 2023-11-06T10:00
sidebar_position: 2
---

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/early-access/rss.xml" />

These early access (beta) features are available in Harness NextGen SaaS. Early access features can be released for the Harness Platform, delegate, or individual modules.

Early access features are behind feature flags. You can contact [Harness Support](mailto:support@harness.io) to enable a feature you're interested in.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## Platform early access features

The following early access (beta) features are available for the Harness Platform.

### Harness AI Development Assistant (AIDA:tm:)

* **Release date:** June 2023
* **Feature flag:** Yes
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

The Harness platform leverages Harness AI Development Assistant (AIDA) to revolutionize software delivery processes. By combining AI capabilities with robust DevOps tools, features, and practices, the Harness platform streamlines and accelerates the software delivery lifecycle, and it empowers teams to deliver high-quality applications quickly and efficiently. Its AI-driven predictive analytics, continuous verification, and advanced release orchestration capabilities empower teams to drive innovation, improve efficiency, and ultimately deliver exceptional user experiences.

Following are some key benefits of Harness AIDA:

- Auto-recognition of failures in pipelines: The root cause analysis (RCA) option generates recommendations for step failures in pipelines. Harness bases these recommendations on the step logs and the context of the failed step. For more information, go to [Troubleshooting with AIDA](/docs/continuous-integration/troubleshoot-ci/aida).

- Asset governance: The asset governance feature assists you in drafting rules that are based on your requirements and aligned with your governance goals. Harness AIDA governance support also offers detailed descriptions of built-in rules. When you are creating policies, this feature facilitates informed decision-making by clarifying the purpose, scope, and implications of each rule. For more information, go to [Asset governance with AIDA](/docs/category/harness-aida-for-asset-governance).

- Security: Harness AI identifies security vulnerabilities, describes them, and suggests remediation. For more information, go to [Remediations with AIDA](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/ai-based-remediations).

Review the following information for details about data privacy and terms of use:

- [AIDA Terms](https://www.harness.io/legal/aida-terms)
- [AIDA Privacy](https://www.harness.io/legal/aida-privacy)

**Update (November 2023):** AIDA for STO is now generally available. You must accept the AIDA EULA to enable AIDA in your Harness account. For more information, go to [Use AI to fix security issues](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/ai-based-remediations).

**Update (October 2023):** AIDA for CI is now generally available. You must accept the AIDA EULA to enable AIDA in your Harness account. For more information, go to [Troubleshooting with AIDA](/docs/continuous-integration/troubleshoot-ci/aida).

### SCIM user provisioning enhancements

* **Release date:** March 2023
* **Release version:** 78712
* **Issue number:** PL-31498, PL-31497, PL-31496
* **Feature flag:** `PL_NEW_SCIM_STANDARDS`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Harness populates `givenName` and `familyName` for users via SCIM and returns the same when a GET, CREATE, or UPDATE request is made.

The response of a CRUD operation on a user or user group contains the following meta fields as per the SCIM 2.0 standards:

- createdAt
- lastUpdated
- version
- resourceType

**Update (version 78817, March 2023):** Any CRUD operation on a user now returns the details of the user groups that the user is part of. You can use this to verify what groups a given user belongs to.

### Delete users provisioned in Harness through SCIM

* **Release date:** February 2023
* **Issue number:** PL-23577
* **Feature flag:** `PL_USER_DELETION_V2`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

You can delete a user provisioned in Harness through SCIM in NextGen and retain the user in FirstGen.

### Create remote templates and save them in a Git repo

* **Release date:** October 2022. This feature was released for early access in 2022. Early access features from past releases might have been promoted to GA since their original release.
* **Issue number:** PL-28573
* **Feature flag:** `NG_TEMPLATE_GITX`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

You can create remote templates in Harness and save them in your Git repo. For more information, go to [Create a remote step template](/docs/platform/Templates/create-a-remote-step-template), [Create a remote stage template](/docs/platform/Templates/create-a-remote-stage-template), and [Create a remote pipeline template](/docs/platform/Templates/create-a-remote-pipeline-template).

### Use expressions to reference secrets in Vaults

* **Release date:** October 2022. This feature was released for early access in 2022. Early access features from past releases might have been promoted to GA since their original release.
* **Issue number:** PL-28352
* **Feature flag:** Yes
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

You can use expressions to reference pre-existing secrets in Vault using a fully-qualified path. For more information, go to [HashiCorp Vault Secrets](/docs/platform/secrets/secrets-management/reference-existing-secret-manager-secrets#option-hashicorp-vault-secrets).

### Toggle email notifications for user invites

* **Release date:** October 2022. This feature was released for early access in 2022. Early access features from past releases might have been promoted to GA since their original release.
* **Issue number:** PL-26218, ZD-32152, ZD-35287
* **Feature flag:** `AUTO_ACCEPT_SAML_ACCOUNT_INVITES` or `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Harness sends email notification for user invites when the feature flag `AUTO_ACCEPT_SAML_ACCOUNT_INVITES` is enabled.

Harness doesn't send emails for user invites when the feature flag `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` is enabled.

## Delegate early access features

The following early access (beta) features are available for the Harness Delegate.

### Delegate task capacity check

* **Release date:** July 2023
* **Release version:** 79904
* **Issue number:** PL-39351
* **Feature flag:** `DELEGATE_TASK_CAPACITY_CHECK`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Harness added the ability to acquire only the configured maximum number of tasks. This allows Harness Manager to use the task capacity to determine whether to assign a task to the delegate or queue it. You can configure the maximum number of tasks using the Env variable `DELEGATE_TASK_CAPACITY`. For example, if you set `DELEGATE_TASK_CAPACITY` to a value of 2 and execute 6 tasks in parallel, Harness Manager executes only 2 tasks at a time. If you don't configure `DELEGATE_TASK_CAPACITY`, Harness Manager executes all 6 tasks in parallel. When this feature flag is enabled, the task is broadcast every minute in Harness Manager until it expires.

### Capture delegate agent metrics for delegates shipped on immutable image types

* **Release date:** May 2023
* **Release version:** 79307
* **Issue number:** PL-37908, PL-38538
* **Feature flag:** `DELEGATE_ENABLE_DYNAMIC_HANDLING_OF_REQUEST`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Harness can capture delegate agent metrics for delegates shipped on immutable image types. The following delegate agent metrics are available with this feature flag enabled:

* `task_completed`: The number of tasks completed.
* `task_failed`: The number of failed tasks.
* `task_rejected`: The number of tasks rejected because of a high load on the delegate.
* `delegate_connected`: Indicates whether the delegate is connected. Values are 0 (disconnected) and 1 (connected).
* `resource_consumption_above_threshold`: Delegate cpu/memory is above a threshold (defaults to 80%). Provide `DELEGATE_RESOURCE_THRESHOLD` as the env variable in the delegate YAML to configure the threshold.

<!-- ## CE early access features

No early access (beta) features are available for the Harness Chaos Engineering module. -->

## CCM early access features

The following early access (beta) features are available for the Harness Cloud Cost Management module.

### Propagate force cool down

* **Release date:** June 2023
* **Release version:** 79701
* **Issue number:** CCM-12338
* **Feature flag:** Yes
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

You can now propagate force cool down from primary rule to dependent rules. Without this feature flag enabled, when stopping a rule from the UI, you had to stop its dependant rules one by one. With this enhancement, you can propagate the stop operation to dependant rules as well. Propagating cool down to dependant rules is optional. You can stop the primary rule with or without propagating cool down to dependant rules.

## CD & GitOps early access features

For information about early access (beta) features for Harness Continuous Delivery and GitOps, go to [Active CD feature flags](/docs/continuous-delivery/cd-integrations/#active-cd-feature-flags) and the [CD and GitOps release notes](./continuous-delivery).

<!-- ## CET early access features

No early access (beta) features are available for the Harness Continuous Error Tracking module. -->

## CI early access features

The following early access (beta) features are available for the Harness Continuous Integration module.

### Delegate selectors for codebase tasks

* **Release date:** November 2023
* **Release version:** 6501
* **Issue number:** CI-9980
* **Feature flag:** `CI_CODEBASE_SELECTOR`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Without this feature flag enabled, delegate selectors aren't applied to delegate-related CI codebase tasks.

With this feature flag enabled, Harness uses your [delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors) for delegate-related codebase tasks. Delegate selection for these tasks takes precedence in order of [pipeline selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/#pipeline-delegate-selector) over [connector selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/#infrastructure-connector).

### Cache Intelligence in the Visual editor

* **Release date:** July 2023
* **Release version:** 5106
* **Issue number:** CI-8571, CI-8917
* **Feature flag:** `CI_CACHE_INTELLIGENCE`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

You can enable [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) in the Pipeline Studio's Visual editor. Previously, you could only enable Cache Intelligence through the YAML editor. For more information, go to the [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) documentation. This enhancement only applies to Harness Cloud build infrastructure.

**Update (Version 5301, August 2023):** You can now also configure [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) in the Pipeline Studio's Visual editor. Previously, you could enable Cache Intelligence through the Visual editor, but you had to configure it in the YAML editor. For more information, go to the [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) documentation. This enhancement only applies to Harness Cloud build infrastructure.

### Send status updates to Harness Manager directly by HTTP (Rolled back)

* **Release date:** July 2023 (rollback from GA)
* **Release version:** 5003
* **Issue number:** CI-8338
* **Feature flag:** `CI_LE_STATUS_REST_ENABLED`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

This feature causes CI steps to send status updates to the [Harness Manager](/docs/get-started/harness-platform-architecture#harness-platform-components) directly by HTTP, rather than through a delegate.

**Update (Version 5003, July 2023):** This feature was rolled back to early access and disabled by default due to a discovered instability that caused the [CD Container step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/container-step) to fail. This feature flag is now disabled by default and must be re-enabled if your CI-to-Harness-Manager communications need to support client connections with additional certificates.

### Output variables automatically become environment variables

* **Release date:** June 2023
* **Release version:** 4204
* **Issue number:** CI-7817, ZD-39203
* **Feature flag:** `CI_OUTPUT_VARIABLES_AS_ENV`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

With this feature flag enabled, output variables from steps are automatically available as environment variables for other steps in the same Build (`CI`) stage. This means that, if you have a Build stage with three steps, an output variable produced from step one is automatically available as an environment variable for steps two and three.

In other steps in the same stage, you can refer to the output variable by its key without additional identification. For example, an output variable called `MY_VAR` can be referenced later as simply `$MY_VAR`. Without this feature flag enabled, you must use an [expression](/docs/platform/variables-and-expressions/runtime-inputs/#expressions) to reference where the variable originated, such as `<+steps.stepID.output.outputVariables.MY_VAR>`.

For more information on this feature, go to the documentation on [Output variables](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings#output-variables).

### Remote debugging

* **Release date:** May 2023
* **Release version:** 3805
* **Issue number:** CI-8135, CI-8048
* **Feature flag:** `CI_REMOTE_DEBUG`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Harness CI now supports remote debugging. This feature was initially released in January 2023 and subsequently reverted for further development.

Debug mode is available if all of the following conditions are met:

* You have the feature flag `CI_REMOTE_DEBUG` enabled.
* The build infrastructure uses a Linux-based OS.
* The build fails at a **Run** step with a Bash or Shell script in a **Build** (`CI`) stage.
* The build runs in Harness Cloud, on a virtual machine, or in Kubernetes.

You can re-run builds in debug mode through the **Builds**, **Execution**, and **Execution History** pages of the Harness UI. For more information, go to the [debug mode](/docs/continuous-integration/troubleshoot-ci/debug-mode) documentation.

**Update (version 4204, June 2023):** Debug mode now supports Python and PowerShell Core (`pwsh`). You can also now use debug mode for local runner build infrastructures. For more information, go to [Debug with SSH](/docs/continuous-integration/troubleshoot-ci/debug-mode)

<!-- ## FF early access features

The following early access (beta) features are available for the Harness Feature Flags module. -->

<!-- ## IDP early access features

No early access (beta) features are available for Harness Internal Developer Portal. -->

## Code early access features

Currently, the entire [Code Repository module](/docs/code-repository/get-started/overview) is behind a feature flag. Contact [Harness Support](mailto:support@harness.io) if you're interested in this module.

## STO early access features

The following early access (beta) feature is available for the Harness Security Testing Orchestration module.

### STO Jira integration

* **Release date:** March 2023
* **Issue number:** STO-5467
* **Feature flag:** `STO_JIRA_INTEGRATION`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

STO includes a Jira integration that enables you to create Jira tickets for issues detected during an STO build. For more information, go to [Create Jira tickets for detected issues](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/jira-integrations).

## SRM early access features

The following early access (beta) features are available for the Harness Service Reliability Management module.

### Continuous Verification (CV) fails if the data for configured deployment strategy is not available (SRM-12731)

* **Release date:** December 13, 2022. This feature was released for early access in 2022. Early access features from past releases might have been promoted to GA since their original release.
* **Release version:** Delegate version 77808
* **Feature flag:** `SRM_LOG_HOST_SAMPLING_ENABLE`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Harness was automatically applying an alternate deployment strategy even if the required data for the deployment configured in the Verify step was not available. Now, Harness does not automatically apply an alternate deployment strategy if the required data is not available. Instead, Harness fails the CV. Harness automatically applies an alternate deployment strategy only if you choose the Auto option in the Continuous Verification Type dropdown list when configuring the Verify step.

<!-- ## SSCA early access features

No early access (beta) features are available for the Harness Software Supply Chain Assurance module. -->

## Features promoted to GA

These features were released as early access (beta) features, and they have since been promoted to GA. This list is not exhaustive.

### Platform features promoted to GA

#### Google Cloud Secret Manager

* **GA date:** Early 2023
* **Early access release date:** November 2022
* **Issue number:** PL-28978, SPG-153

You can now create secrets using the Google Cloud Secret Manager in Harness. For more information, go to [Add a Google Cloud Secret Manager](/docs/platform/secrets/secrets-management/add-a-google-cloud-secret-manager)

#### Customize navigation

* **GA date:** Early 2023
* **Early access release date:** November 2022
* **Issue number:** SPG-153

You can select modules and configure your own navigation in Harness.

Also, Projects is a new option in the left navigation. Click Projects to view the project-specific overview, pipeline, connector, and other details.

#### Optimized performance for remote pipelines

* **GA date:** Early 2023
* **Early access release date:** November 2022
* **Issue number:** PL-29459
* **Feature flag:** `USE_GET_FILE_V2_GIT_CALL`

You can get optimized performance on remote pipelines if you are on delegate version 772xx or higher. If you are on an older delegate version, you can upgrade your delegate for optimized performance.

#### Create a Harness Custom Secret Manager in NextGen

* **GA date:** Late 2022/Early 2023
* **Early access release date:** September 2022
* **Issue number:** PL-25545
* **Feature flag:** `CUSTOM_SECRET_MANAGER_NG`

You can onboard any secret manager with Harness and reference their secrets in Harness. For more information, go to [Add a custom secret manager](/docs/platform/secrets/secrets-management/custom-secret-manager).

### Delegate features promoted to GA

#### GitHub App authentication for GitHub connectors

* **GA date:** December 2023
* **Early access release date:** August 2023
* **Early access release version:** Delegate version 80303 and CI version 5408
* **Issue number:** CI-8577
* **Feature flag:** `CDS_GITHUB_APP_AUTHENTICATION`

You can use a GitHub App as the [primary authentication method for a GitHub connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#credentials-settings).

### CD & GitOps features promoted to GA

For information about early access (beta) features for Harness Continuous Delivery and GitOps, go to [Active CD feature flags](/docs/continuous-delivery/cd-integrations/#active-cd-feature-flags) and the [CD and GitOps release notes](./continuous-delivery).

### CI features promoted to GA

#### GitHub App authentication for GitHub connectors

* **GA date:** December 2023
* **Early access release date:** August 2023
* **Early access release version:** Delegate version 80303 and CI version 5408
* **Issue number:** CI-8577
* **Feature flag:** `CDS_GITHUB_APP_AUTHENTICATION`

You can use a GitHub App as the [primary authentication method for a GitHub connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#credentials-settings).

#### Harness AI Development Assistant (AIDA:tm:) for CI

* **GA date:** October 2023
* **Early access release date:** June 2023
* **Early access release version:** 4301
* **Issue numbers:** CI-8599, CI-8735, CI-9102
* **Feature flag:** `CI_AI_ENHANCED_REMEDIATIONS`

The Harness platform leverages Harness AI Development Assistant (AIDA) to revolutionize software delivery processes. By combining AI capabilities with robust DevOps tools, features, and practices, the Harness platform streamlines and accelerates the software delivery lifecycle, and it empowers teams to deliver high-quality applications quickly and efficiently. Its AI-driven predictive analytics, continuous verification, and advanced release orchestration capabilities empower teams to drive innovation, improve efficiency, and ultimately deliver exceptional user experiences.

In Harness CI, AIDA provides auto-recognition of failures in pipelines. The root cause analysis (RCA) option generates recommendations for step failures in pipelines. Harness bases these recommendations on the step logs and the context of the failed step. For more information, go to [Troubleshooting with AIDA](/docs/continuous-integration/troubleshoot-ci/aida).

**Update (Version 4901, July 2023):** Applied scrolling to long remediation messages when troubleshooting with AIDA.

**Update (Version 5106, July 2023):** Fixed an issue where step details for other steps were shown when using AIDA to troubleshoot a pipeline with multiple failed steps.

**Update (Version 5902, September 2023):** When troubleshooting with AIDA, stage-level error analysis is available for failed stages without steps. If a stage has steps, step-level error analysis occurs instead.

**Update (October 2023):** AIDA for CI is now generally available. You must accept the AIDA EULA in your Harness account to enable AIDA. For more information, go to [Troubleshooting with AIDA](/docs/continuous-integration/troubleshoot-ci/aida).

#### Local runner build infrastructure

* **GA date:** Early 2023
* **Early access release date:** October 7, 2022
* **Issue number:** CI-5680
* **Feature flag:** `CI_DOCKER_INFRASTRUCTURE`
* **Description:** Docker delegate that you can install directly on a host. For more information, go to [Set up a local runner build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure).

### FF features promoted to GA

#### Beta version of an Apex SDK for Feature Flags

* **GA date:** Late 2022/Early 2023
* **Early access release date:** October 20, 2022

Harness released a beta version of an Apex SDK for Feature Flags. For more information and to access this SDK, see the [Apex SDK reference guide](/docs/feature-flags/ff-sdks/server-sdks/apex-sdk-reference) and the [GitHub repository](https://github.com/harness/ff-apex-server-sdk).

### STO features promoted to GA

#### UI enhancements for working with exemptions

* **GA date:** November 2023
* **Early access release date:** October 2023
* **Early access Release version:** 1.69.3
* **Feature flag:** `STO_EXEMPTION_DETAILS`

This feature includes the following UI enhancements for working with exemptions:

- You can click on a row in the **Exemptions** table to view details for the issue associated with that exemption.

   ![](static/sto-click-row-to-view-exemptions.png)

- For best results in STO, you should [specify a baseline for every target](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines). To encourage this, the **Exemption Details** pane hides details for an issue if there is no baseline detected. To specify the baseline, select **Set in Targets**.

   ![](static/sto-exemption-details-no-baseline-selected.png)

#### Security Tests filters

* **GA date:** November 2023
* **Early access release date:** August 2023
* **Early access Release version:** 1.64.1
* **Feature flag:** `STO_DROPDOWN_FILTERS`

The **Security Tests** tab includes a set of pull-down menus so you can filter the issues lists by Target, Target Type, Step, Stage, and Scanner.

![Click on a tile to filter issues by severity](./static/sto-pulldown-filters-sto-5212.png)

#### Use regex to define dynamic target baselines

* **GA date:** August 2023
* **Early access release date:** July 2023
* **Early access Release version:** 1.61.1
* **Feature flag:** `STO_BASELINE_REGEX`

You can now define dynamic target baselines using regular expressions. Dynamic baselines more accurately reflect the current "root" element in the context of a real-world software development life cycle. Dynamic baselines also make it easier to track the introduction and remediation of specific vulnerabilities.

For more information about this feature, go to [Set up target baselines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/set-up-baselines).

#### Scanner templates for Burp integration

* **GA date:** August 2023
* **Early access release date:** July 2023
* **Early access Release version:** 1.60.0
* **Feature flag:** `STO_STEP_PALETTE_BURP_ENTERPRISE`

The [Burp integration](/docs/security-testing-orchestration/sto-techref-category/burp-scanner-reference) now supports scanner templates, which make it much easier to set up a scan step.

#### CodeQL integration

* **GA date:** September 2023
* **Early access release date:** July 2023
* **Early access Release version:** 1.60.0
* **Feature flag:** `STO_STEP_PALETTE_CODEQL`

You can scan your code repositories using [CodeQL](/docs/security-testing-orchestration/sto-techref-category/codeql-scanner-reference), an analysis engine used by developers to automate security checks, and by security researchers to perform variant analysis.

#### Fossa integration

* **GA date:** August 2023
* **Early access release date:** July 2023
* **Early access Release version:** 1.60.0
* **Feature flag:** `STO_STEP_PALETTE_FOSSA`

You can scan container images and repositories using [Fossa](/docs/security-testing-orchestration/sto-techref-category/fossa-scanner-reference), a scanner that detects security vulnerabilities and other issues in open-source projects.

#### Semgrep integration

* **GA date:** September 2023
* **Early access release date:** July 2023
* **Early access Release version:** 1.60.0
* **Feature flag:** `STO_STEP_PALETTE_SEMGREP`

You can scan container images and repositories using [Semgrep](/docs/security-testing-orchestration/sto-techref-category/semgrep-scanner-reference), a scanner that detects security vulnerabilities and other issues in open-source projects.

#### Harness AI Development Assistant (AIDA:tm:) for STO

* **GA date:** November 2023
* **Early access release date:** June 2023
* **Early access release version:** 1.58.3
* **Issue numbers:** STO-5882, STO-6593, STO-6181, PL-39723
* **Feature flag:** `STO_AI_ENHANCED_REMEDIATIONS`

```mdx-code-block
import Intro from '/docs/security-testing-orchestration/use-sto/shared/sto-aida-overview-partial.md';
```

<Intro />

**Update (Version 1.60.0):** Reference Identifiers selected for AIDA enhancement in a Security Issue are now remembered, upon generation, and shown when revisited in the UI. (STO-6032)

**Update (Version 1.61.1):** Fixed an issue that broke the capability to customize the code snippet for AIDA-augmented remediations in the Security Tests module. (STO-6181)

**Update (Version 1.72.1):**

- You can now provide feedback about the AIDA-generated remediation step for a selected issue. (STO-6593)

- You are now required to sign an end-user license agreement to access the Harness AI Development Assistant (AIDA) in the account and project scopes.

   You need to do this even if you could previously use AIDA without signing a EULA. This change was originally introduced in the 80505 platform release. (PL-39723)

   The EULA is displayed when you enable AIDA at the account scope (**Account Settings** > **Account Resources** > **Default Settings** > **Harness AI Developer Assistant**). Each account user must sign the EULA only once, and the setting is inherited at the project scope.

#### Improved UI for configuring scan steps

* **GA date:** November 2023
* **Early access release date:** March 2023
* **Early access Release version:** 1.38.3

This feature includes a set of Security steps with an improved UI for configuring scans. Each step shows only the settings that apply to the specific scan. Note the following:

- This release includes new steps for the following scanners: Aqua Trivy, Bandit, Black Duck, Checkmarx, Grype, Mend, Prisma Cloud, Snyk, SonarQube, and ZAP.
- Docker-in-Docker is no longer required for these steps *unless* you're scanning a container image. If you're scanning a repository or running instance, you don't need to set up a Background step running DinD.
- Support is currently limited to Kubernetes and Harness Cloud AMD64 build infrastructures only.
- For descriptions of all available UI settings, go to [Security step UI settings reference](/docs/security-testing-orchestration/sto-techref-category/security-step-ui-settings-reference).

![STO step palette](static/sto-step-palette.png)
