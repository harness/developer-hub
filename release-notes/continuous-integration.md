---
title: Continuous Integration release notes
sidebar_label: Continuous Integration
tags: [NextGen, "continuous integration"]
date: 2023-07-28T10:00:10
sidebar_position: 3
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/continuous-integration/rss.xml" />

Review the notes below for details about recent changes to Harness Continuous Integration. For release notes for Harness Self-Managed Enterprise Edition, go to [Self-Managed Enterprise Edition release notes](/release-notes/self-managed-enterprise-edition). Additionally, Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.

:::info note
Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features and fixes that these release notes describe may not be immediately available in your cluster. To identify the cluster that hosts your account, go to the **Account Overview** page.
:::

## Latest - July 28, 2023, version 5106

```mdx-code-block
<Tabs>
  <TabItem value="What's new">
```

* **Eliminate unnecessary connection tests for GitHub connectors. (CI-7902, ZD-43391)**
   * Harness regularly runs automatic connection tests for your GitHub connectors. Previously, Harness would continue to run these tests even if the tests were failing repeatedly. Now, if the connection test fails due to an authorization issues with GitHub credentials, Harness stops checking the connector until you update the connectors's credentials. This eliminates unnecessary testing that could cause LDAP user accounts in AD to become locked, due to excessive failed access attempts, if a connector's personal access token was associated with an specific user's account.
   * To restart the connection tests, you must edit the [GitHub connector settings](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference) to add new credentials or trigger a connection test with existing, reinstated credentials. Updating the connector settings triggers a connection test, and, if this connection test succeeds, Harness resumes regular testing.
* **Build status links on Azure Repos PRs. (CI-8356, ZD-45085)**
   * Builds triggered by PRs in Azure Repos now include a **Details** link in the PR that you can follow to the [Build details page](/docs/continuous-integration/use-ci/viewing-builds#source-code-repository-links) in Harness.
* **Upload artifacts to Sonatype Nexus.**
   * You can use the **Nexus Publish** Drone plugin to [upload artifacts to Sonatype Nexus](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-sonatype-nexus).

```mdx-code-block
  </TabItem>
  <TabItem value="Early access">
```

**Enable Cache Intelligence in the Visual editor. (CI-8571)**

The **Enable Cache Intelligence** UI field is behind the feature flag `CI_CACHE_INTELLIGENCE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

You can enable [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) in the Pipeline Studio's Visual editor. Previously, you could only enable Cache Intelligence through the YAML editor. For more information, go to the [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) documentation. This enhancement only applies to the Harness Cloud build infrastructure.

```mdx-code-block
  </TabItem>
  <TabItem value="Fixed issues">
```

* Fixed an issue where the active developer count was not reported for builds triggered by cron jobs, custom webhooks, and other triggers. (CI-8502, ZD-46409)
* Fixed an issue where step details for other steps were shown when using [AIDA](/docs/continuous-integration/troubleshoot-ci/aida) to troubleshoot a pipeline with multiple failed steps. (CI-8735)

<!-- CI 5200 release
* Fixed an issue that caused [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) to be incompatible with Maven 3.9. (CI-8891)
* Fixed pagination for [license usage](/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt#license-usage) tables. (CI-8857)
* If a build started by a [PR webhook](/docs/platform/Triggers/triggering-pipelines) fails, you can manually rerun the build. However, previously, the manual rerun could also fail due to a missing `DRONE_COMMIT_REF` environment variable. Now, this has been fixed, and the expected variable is included in case of manual reruns. (CI-8794, ZD-47417)
* Fixed an issue with handling of new line characters in [GitHub App private key files](/docs/platform/Connectors/Code-Repositories/git-hub-app-support) generated on Windows machines. The [Harness Delegate version 801xx or later](/release-notes/delegate) is required for this fix. (CI-8708) -->

```mdx-code-block
  </TabItem>
</Tabs>
```

## Previous releases

<details>
<summary>2023 releases</summary>

#### July 18, 2023, version 5003

##### What's new

This release does not include new features.

##### Early access

The `CI_LE_STATUS_REST_ENABLED` feature has been rolled back to early access and disabled by default due to a discovered instability that caused the [CD Container step](docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/container-step/) to fail. This feature causes CI steps to send status updates to the [Harness Manager](/docs/getting-started/harness-platform-architecture#harness-platform-components) directly by HTTP, rather than through a delegate.

This feature flag is now disabled by default and must be re-enabled if your CI-to-Harness-Manager communications need to support client connections with additional certificates. (CI-8338)

##### Fixed issues

* [Test Intelligence](/docs/continuous-integration/use-ci/set-up-test-intelligence/) now reads packages from files for all changed files, instead of relying on the file path to determine the package. This fixes an issue where tests were missed due to the test package not following the order of folders, because Test Intelligence previously determined the package from the class path. (CI-8692)
* The `CI_LE_STATUS_REST_ENABLED` feature has been rolled back to early access due to a discovered instability that caused the [CD Container step](docs/continuous-delivery/x-platform-cd-features/executions/cd-general-steps/container-step/) to fail. This feature causes CI steps to send status updates to the [Harness Manager](/docs/getting-started/harness-platform-architecture#harness-platform-components) directly by HTTP, rather than through a delegate. This feature flag is now disabled by default and must be re-enabled if your CI-to-Harness-Manager communications need to support client connections with additional certificates. (CI-8338)

#### July 06, 2023, version 4901

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

* Applied scrolling to long remediation messages when [troubleshooting with AIDA](/docs/continuous-integration/troubleshoot-ci/aida). (CI-8599)
* The [Builds page](/docs/continuous-integration/use-ci/viewing-builds) now shows the correct user's avatar for manual builds. For scheduled builds, it now shows the schedule trigger name, instead of the latest commit author's name. (CI-8531, ZD-46409)
* If you chose to [run a specific stage](/docs/platform/pipelines/run-specific-stage-in-pipeline/) in a pipeline that had multiple stage types (such as UAT, Build/CI, CD, and so on), and you bypassed a Build stage, then the pipeline could fail due to a backend value being set to an empty string, rather than an object. This is fixed so that this backend value is always an object, even when empty. (CI-8418, ZD-45768)

#### June 28, 2023, version 4301

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

* Fixed an issue where Artifactory connector credentials weren't correctly passed to [Upload Artifacts to JFrog Artifactory steps](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog) in nested [step groups](/docs/continuous-integration/use-ci/optimize-and-more/group-ci-steps-using-step-groups). (CI-8351, ZD-45611)
* BitBucket Cloud limits the key size for sending status updates to PRs, and this can cause incorrect status updates in PRs due to some statuses failing to send. If you encounter this issue with BitBucket Cloud, contact [Harness Support](mailto:support@harness.io) to troubleshoot this issue by enabling a feature flag, `CI_BITBUCKET_STATUS_KEY_HASH`. (CI-8302, ZD-45441)
* Artifacts produced by **Build and push** steps inside a [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) now appear on the **Artifacts** tab on the [Build details page](/docs/continuous-integration/use-ci/viewing-builds). (CI-7970)
* When configuring a [Background step](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings), the **Entry Point** field is now located under **Additional Configuration** if the stage uses the Harness Cloud, local runner, or self-hosted VM build infrastructure. (CI-6993)
* When creating a step template, the labels for **Configure Run Tests step** and **Configure Run step** have been shorted to **Run Tests** and **Run** respectively. This change follows labeling conventions used elsewhere in Harness CI. (CI-4771)

#### June 19, 2023, version 4204

##### What's new

The Harness Cloud Linux amd64 image has new major and minor versions for multiple components. Major version upgrades are described below. For a complete list of component versions, go to the [Harness Cloud image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure/#platforms-and-image-specifications). (CI-7537)

:::caution

If you have pipelines running on Harness Cloud that rely on specific component versions, you might need to [lock versions or install additional tools](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure/#lock-versions-or-install-additional-tools) to prevent your pipeline from failing due to image changes.

:::

<details>
<summary>Major version upgrades for the Harness Cloud Linux amd64 image</summary>

| Component | Previous version | Current version |
| --------  | ---------------- | --------------- |
| Homebrew | 3.6.3 | 4.0.17 |
| Miniconda | 4.12.0 | 23.3.1 |
| Lerna | 5.5.2 | 6.6.2 |
| Bazel | 5.3.1 | 6.1.2 |
| Docker-Moby Client | 20.10.18 | 23.0.6 |
| Docker-Moby Server | 20.10.18 | 23.0.6 |
| Heroku | 7.63.4 | 8.1.3 |
| Kustomize | 4.5.7 | 5.0.2 |
| Google Cloud SDK | 403.0.0 | 428.0.0 |
| Netlify CLI | 12.0.0 | 15.0.2 |
| ORAS CLI | 0.15.0 | 1.0.0 |
| Vercel CLI | 28.4.4 | 29.1.1 |
| Google Chrome | 106.0.5249.61 | 113.0.5672.92 |
| ChromeDriver | 106.0.5249.21 | 113.0.5672.63 |
| Chromium | 106.0.5235.0 | 113.0.5672.0 |
| Microsoft Edge | 105.0.1343.53 | 113.0.1174.35 |
| Microsoft Edge WebDriver | 105.0.1343.53 | 113.0.1774.35 |
| Android Command Line Tools | 7.0 | 9.0 |
| Android Emulator | 31.3.11 | 32.1.12 |
| Android SDK Platform-Tools | 33.0.3 | 34.0.1 |

</details>

##### Early access

* **Output variables automatically become environment variables (CI-7817, ZD-39203)**
  * Output variables from steps can be available as environment variables for other steps in the same Build (`CI`) stage. This functionality is behind a feature flag, `CI_OUTPUT_VARIABLES_AS_ENV`.
  * This means that, if you have a Build stage with three steps, an output variable produced from step one is automatically available as an environment variable for steps two and three. In other steps in the same stage, you can refer to the output variable by its key without additional identification. For example, an output variable called `MY_VAR` can be referenced later as simply `$MY_VAR`. Without this feature flag enabled, you must use an [expression](/docs/platform/references/runtime-inputs/#expressions) to reference where the variable originated, such as `<+steps.stepID.output.outputVariables.MY_VAR>`.
  * For more information on this feature, go to the documentation on [Output variables](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings#output-variables).
* **Remote debugging enhancements (CI-8135, CI-8048)**
  * **Re-run in Debug Mode** now supports Python and PowerShell Core (`pwsh`). You can also now use debug mode for local runner build infrastructures. The remote debugging functionality is behind a feature flag, `CI_REMOTE_DEBUG`. For more information, go to [Debug with SSH](/docs/continuous-integration/use-ci/debug-mode).

##### Fixed issues

* Improved error messages for [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) using [AWS connectors](/docs/platform/Connectors/Cloud-providers/add-aws-connector) with invalid credentials in [VM build infrastructures](/docs/category/set-up-vm-build-infrastructures). (CI-7942, ZD-44039)
* Fixed an issue where the active developer count was not reported for builds triggered manually. (CI-8025)
* Fixed an issue related to logs for Background steps. (CI-7615, ZD-44501)

##### Hotfix versions 4205, 4206

Released June 22, 2023 - These hotfixes addressed regressions that caused existing pipelines to fail.

#### June 12, 2023, version 4006

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

Fixed an issue where Git status updates failed if the Azure repository/project name had white space. Harness now decodes white spaces in URLs so the Git status update request can succeed. The [Harness Delegate version 79503 or later](/release-notes/delegate) is required for this fix. (CI-8105, ZD-44679)

#### June 01, 2023, version 3903

##### What's new

This release does not include new features.

##### Early access

This release does not include early access features.

##### Fixed issues

* Previously, in situations where a build pod wasn't created, an error occurred when the cleanup event couldn't find details of a pod to cleanup. Now, handling has been added to avoid this error. (CI-8065)
* Fixed an issue where running multiple [Build and Push an image to Docker Registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings) steps [in parallel](/docs/platform/Pipelines/looping-strategies-matrix-repeat-and-parallelism) could result in multiple copies of the same image being pushed to the Docker repository. While the image names were different, the underlying image was the same. (CI-8039)
* Fixed an issue where passing an empty runtime input value for the **Dockerfile** setting in a [Build and Push an image to Docker Registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings) step didn't resolve properly. (CI-7912, ZD-43490)

##### Hotfix version 3904

This hotfix was released on June 5, 2023. This hotfix does not include customer-facing changes.

#### May 23, 2023, version 3805

Starting with the May 04, 2023 release, CI release notes use the CI Manager version number rather than the Harness Delegate version number.

##### What's new

Added support for showing artifacts on the **Artifacts** tab in Harness Cloud and VMs. (CI-7218)

Previously, this was supported only for Kubernetes builds. The artifacts are visible on the execution **Artifact** tab and the artifact details are visible on the step output window.

##### Early access

Harness CI now supports remote debugging. This feature was initially released in January 2023 and subsequently reverted for further development. Debug mode is available if all of the following conditions are met:

* You have the feature flag `CI_REMOTE_DEBUG` enabled. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
* The build infrastructure uses a Linux-based OS.
* The build fails at a **Run** step with a Bash or Shell script in a **Build** (`CI`) stage.
* The build runs in Harness Cloud, on a virtual machine, or in Kubernetes.

You can re-run builds in debug mode through the **Builds**, **Execution**, and **Execution History** pages of the Harness UI. For more information, go to the [debug mode](/docs/continuous-integration/troubleshoot-ci/debug-mode) documentation.

##### Fixed issues

* Fixed the [license usage](/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt) sort function. (CI-7945)
* [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) now supports caching subdirectory builds. (CI-7853)
* In step templates for **Run**, **Run Tests**, and **Background** steps, the `connectorRef` and `image` settings are now optional because these settings are not required for all build infrastructures. Validations are triggered when you use these templates in a pipeline that requires these settings. (CI-7845)
* Previously, test splitting wouldn't work with step-level parallelism on a Kubernetes cluster build infrastructure due to the way certain environment variables were read. This is fixed. (CI-7800, CI-7803, ZD-43259, ZD-43272)
* If you run a pipeline that uses a Kubernetes cluster build infrastructure and step templates with empty `connectorRef` and `image` values, the resulting error message is more accurate and informative. (CI-7785)
* When manually running a pipeline, you can chose to run specific stages, rather than the entire pipeline. Previously, if you chose to run only stages with **Clone Codebase** disabled, you were blocked by a field validation error requiring you to populate the **Git Branch** and **Repository** fields, which weren't visible. This has been fixed so that you are only asked to provide codebase information if **Clone Codebase** is enabled for at least one of the selected stages. (CI-7559, CI-7934 ZD-41974, ZD-43980, ZD-44041)
* If the GitLab SCM URL is of the form of anything other than `https://<domain>/project/repo.git`, then the API access fails for the connector. To fix this, a new field called `apiUrl` was added to the connector YAML. You can specify the new field to be used for all API requests. (CI-7838)

#### May 04, 2023, version 3506

Starting with this release, CI release notes use the CI Manager version number rather than the Harness Delegate version number.

##### What's new

* The CI Getting Started workflow now saves the pipeline remotely (in your Git repository) by default. Previously, the pipeline was stored inline (in Harness) unless you manually selected remote storage. The Getting Started workflow also automatically creates two [input sets](/docs/platform/pipelines/input-sets/) for [Git event triggers](/docs/platform/Triggers/triggering-pipelines): one for a PR trigger and one for a Push trigger. (CI-7602)
* You can now reference [output variables produced by Plugin steps](/docs/continuous-integration/use-ci/use-drone-plugins/plugin-step-settings-reference#output-variables) in pipelines that use Kubernetes cluster build infrastructures. This is an addition to previously-existing support for Harness Cloud and self-hosted Cloud provider VM build infrastructures. (CI-7491)
* [Local runner](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) and [Kubernetes cluster](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure) build infrastructures now support pipeline- and stage-level [delegate selectors](/docs/platform/Delegates/manage-delegates/select-delegates-with-selectors). You can use pipeline and stage-level delegate selectors to override the platform or connector delegate. This level of delegate selection isn't supported for Harness Cloud or self-hosted Cloud provider VM build infrastructures. (CI-6237)

##### Early access

This release does not include early access features.

##### Fixed issues

* Fixed an issue where the [SSL Verify setting](/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline#ssl-verify) in the **Git Clone** step always treated the value as false. (CI-7721, ZD-42483)

#### April 22, 2023, version 79111

##### What's new

* The CI Getting Started workflow leads you through creating an SCM connector and a pipeline. This workflow has been improved to generate a pipeline based on the repository you select. (CI-7603)
* The **Run as User** setting is now available for [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings), [Run Tests steps](/docs/continuous-integration/use-ci/set-up-test-intelligence/#add-the-run-tests-step), and [Plugin steps](/docs/continuous-integration/use-ci/use-drone-plugins/plugin-step-settings-reference) in stages that use [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure). This setting allows you to specify a user ID to use for processes running in containerized steps. (CI-7493)
* Added validations for pipelines that use the [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) macOS build infrastructure, which doesn't support containerized steps. The new validations produce an error message if any applicable steps, such as [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings), have the **Image** and either **Container Registry** or **Connector** fields populated. (CI-7221)

##### Early access

This release does not include early access features.

##### Fixed issues

* Build statuses are now updated as expected in BitBucket if the [BitBucket connector's Authentication settings](/docs/platform/connectors/code-repositories/ref-source-repo-provider/bitbucket-connector-settings-reference/#authentication) use a text secret for the **Username**. (CI-7576, ZD-41969)
* Fixed an issue where looping strategies were not working for some steps. (CI-7499, ZD-41659)
* When you [create a step template](/docs/continuous-delivery/x-platform-cd-features/templates/create-a-remote-step-template) for a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings), the **Container Registry** and **Image** fields are now optional because these fields are not required for all build infrastructures. (CI-7594, ZD-42131, ZD-43027)
* Fixed an issue where [GCP connectors](/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp/) that inherit credentials from a Delegate were erroneously reporting failed connection tests. (CI-7538)

#### April 10, 2023, version 79015

##### What's new

* Your CI pipelines can automatically update Jira issues when builds and deployments occur. For more information, go to [Explore plugins](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins). (CI-7222)
* The following features are now generally available. These were enabled by default for all users, but they were behind features flags until they were deemed stable. (CI-6537)
  * `CI_LE_STATUS_REST_ENABLED`: All CI steps send status updates to the [Harness Manager](/docs/getting-started/harness-platform-architecture#harness-platform-components) directly by HTTP rather than through a Delegate.
  * `CI_DISABLE_GIT_SAFEDIR`: To facilitate `git config` operations, [Run](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) and [Run Tests](/docs/continuous-integration/use-ci/set-up-test-intelligence/#add-the-run-tests-step) steps automatically run a [Git safe.directory](https://git-scm.com/docs/git-config#Documentation/git-config.txt-safedirectory) script.

##### Early access

This release does not include early access features.

##### Fixed issues

* You can now successfully use [references to secrets in non-Harness Secret Managers](/docs/platform/Secrets/Secrets-Management/reference-existing-secret-manager-secrets) in CI pipelines. Previously, these references failed because CI handles secrets as environment variables and some characters in these types of secret references aren't supported for environment variables. Now, CI automatically replaces unsupported characters with supported ones so it can process these references as environment variables. (CI-7443, ZD-41124)
* In the Get Started wizard, selecting **Learn more about Harness CI** now only scrolls the body of the screen, rather than the entire UI. (CI-7522)
* When creating a [stage template](/docs/platform/templates/add-a-stage-template), the UI no longer crashes if you select the [expression input type](/docs/platform/references/runtime-inputs) for the **Shell** field in a **Run** step. (CI-7510)
* Fixed a minor UI issue where selecting the **Commits** tab on the [Build details page](/docs/continuous-integration/use-ci/viewing-builds) caused the navigation menu to expand. (CI-6274)

#### March 31, 2023, version 78914

##### What's new

* When you [use a GitHub App in a GitHub connector](/docs/platform/Connectors/Code-Repositories/git-hub-app-support#step-5-use-github-app-and-secret-in-harness-github-connector), you can now use encrypted text secrets for the **Installation ID** and **Application ID**. (CI-7380)
* Added a [codebase expression](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference) for commit messages: `<+codebase.commitMessage>`. (CI-7222)

##### Early access

This release does not include early access features.

##### Fixed issues

Fixed an issue related to secrets resolution in the [GitHub Action plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step). (CI-6969, CI-7300)

#### March 24, 2023, version 78817

##### What's new

* [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) is now generally available. With Cache Intelligence, Harness automatically caches and restores common dependencies. You don't need to bring your own storage because Harness stores the cache in the Harness-hosted environment, Harness Cloud. (CI-7127)
* [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) build infrastructure now supports **Run as User** for [Plugin](/docs/continuous-integration/use-ci/use-drone-plugins/plugin-step-settings-reference) and [Run](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) steps that are running on containers. (CI-7320)

##### Early access

This release does not include early access features.

##### Fixed issues

* You can now use [variable expressions](/docs/platform/references/runtime-inputs) for the **Shell** and **Image Pull Policy** settings. Previously, selecting the **Expression** input type for **Shell** caused a UI-breaking error, and providing an expression for **Image Pull Policy** caused a field validation error. (CI-7071, ZD-40277)
* If a CI pipeline fails at the **Initialize** step due to an [Azure Repos connector](/docs/platform/Connectors/Code-Repositories/connect-to-a-azure-repo) having an on-premises **Azure Repos Project URL**, the error message clearly describes the root cause. This failure occurs because CI doesn't support Azure DevOps Server Repositories (also known as _on-premises Azure Repos_). (CI-6322)
* If you configure a [code repo connector](/docs/category/code-repo-connectors) where the **URL Type** is **Account**, the **Connection Test** now shows the full test repo URL, which is the URL used to test the connection, rather than the account URL. (CI-4398)
* Attempting to manually clone a PR through a Git connector that doesn't have API access enabled now returns an error message indicating that the connector doesn't have the required API access. (CI-7192)
* The deprecated Harness images warning banner no longer appears when there are no deprecated images in use. (CI-7335)

#### March 15, 2023, version 78712

##### What's new

* The [Base Image Connector setting](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-ecr-step-settings#base-image-connector) for the **Build and Push to ECR** step now supports all Docker-compliant registries. Previously, this setting only supported Docker Hub registries. (CI-7153, CI-7091, ZD-40319)
* You can now call pipeline-level variables in steps as environment variables. This is an extension of existing functionality that allows you to call stage-level variables in steps as environment variables. (CI-6709, ZD-39203)
* When configuring [SCM connectors](/docs/category/code-repo-connectors):
  * Failed connection tests now return more detailed error messages. (CI-7089)
  * The placeholder text in the **Repository URL** field shows a complete repo URL example. (CI-5750)

##### Early access

This release does not include early access features.

##### Fixed issues

* When configuring [local build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure), it was not possible to select the Windows operating system. This issue has been resolved and the Windows OS is available again. (CI-7111, ZD-40311)
* Builds no longer fail if steps in different step groups have the same `identifier`. Additionally, to prevent steps in step groups from producing artifacts with identical artifact IDs, when steps in step groups produce artifacts, the resulting artifact IDs now use a unique identifier that reflects the step's presence in a step group. (CI-7115)
* If a pipeline's [codebase clone depth](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase) was set to `0`, manually triggered builds would override this setting and clone at a depth of 50 instead. This issue did not occur for depth settings other than `0`, and it did not occur for non-manual triggers. Now, manually triggered builds won't override the depth setting when it is set to `0`. (CI-7083, ZD-40306)
* When manually triggering a build, the default repository is populated for on-prem Git connectors. (CI-6814)
* If you change a stage's build infrastructure after adding steps to the stage, field validations for step settings are now triggered as expected when building and saving pipelines. This is important for settings that are unavailable or optional with some build infrastructures but required for others. (CI-6209)
* Fixed an issue where builds triggered by issue comments had the incorrect PR status or link for some SCM providers. (CI-6978)
* Fixed several issues related to error messages on the [Build details page](/docs/continuous-integration/use-ci/viewing-builds#build-details):
  * If the Docker runner was down for a build using local build infrastructure, the error message now contains the correct wording corresponding with the local build infrastructure, rather than wording relevant to a Kubernetes build infrastructure. (CI-6854)
  * An `unsupported image` warning banner incorrectly appeared for builds that did not use Kubernetes build infrastructure. (CI-7098, ZD-40428)
  * The `unsupported image` warning banner no longer pushes the bottom of the log region outside the scrollable area. (CI-7098, ZD-40428)
* Unresolved stage-level and pipeline-level environment variables generated exception errors in cases where those variables were expected to receive a value at a later point in the pipeline. These variables now supplement a default (`null`) value if no initial value is available. (CI-7125)

#### February 23, 2023, version 78507

##### What's new

In addition to fixed values and runtime inputs, you can now use [expressions](/docs/platform/references/runtime-inputs#expressions) for the **Repository Name** in your pipelines' input sets, triggers, and codebase configuration settings. This is useful for pipelines that you use with multiple repositories. (CI-6657, ZD-38657)

![The CI pipeline codebase configuration settings window.](static/ci-pipeline-codebase-reponame-exp.png)

##### Early access

This release does not include early access features.

##### Fixed issues

Modifying a step template's **Step Parameters** no longer removes failure strategies from the template's **Advanced** settings. (CI-6801, ZD-39108)
<!-- Alternate longer version: When you edit a step template that includes a failure strategy, modifying the template's **Step Parameters** no longer removes the **Failure Strategy** configuration from the template's **Advanced** settings. -->

#### February 15, 2023, version 78421

##### What's new

* Microsoft Windows (amd64) is now a supported [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) build infrastructure option. (CI-5455)
* **Python** is now available as a built-in **Shell** option for [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings). (CI-6692)
* [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) can now reference images in GCR through [GCP connectors](/docs/platform/Connectors/Cloud-providers/connect-to-google-cloud-platform-gcp) that use inherited credentials. (CI-5758, ZD-38986)
  * GCP connectors are authenticated through either a GCP service account key or by inheriting credentials from the Harness delegate running in GCP. This change improves how you can use GCP connectors with inherited credentials in your pipelines.
  * Previously, if you wanted a Run step to call an image in GRC, the GCP connector attached to your Run step had to use service account key authentication. Now, the GCP connector can use either authentication method.
* Use [Background steps](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings) to configure service dependencies. (CI-5580)
  * The Background step allows for better control and configuration of services than the now-deprecated Configure Service Dependency step.
  * Pipelines with Configure Service Dependency steps remain backwards compatible, but this step is not available for new pipelines.
  * Replace Configure Service Dependency steps with Background steps to take advantage of the more robust control and configuration option.
* [Pipeline execution status links](/docs/continuous-integration/use-ci/viewing-builds) in Git pull requests now direct you to the associated stage within the pipeline, rather than the pipeline as a whole. (CI-6813)
* Improved handling of Azure repo URLs in [Git webhook pipeline triggers](/docs/platform/triggers/triggering-pipelines). (CI-5720)

##### Early access

This release does not include early access features.

##### Deprecations

The Configure Service Dependency step is deprecated in favor of the [Background step](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings), which allows for better control and configuration of services. Pipelines with Configure Service Dependency steps remain backwards compatible, but this step is not available for new pipelines. Replace Configure Service Dependency steps with Background steps to take advantage of the more robust control and configuration options. (CI-5580)

##### Fixed issues

* With the feature flag `NEW_LEFT_NAV_BAR` enabled, you can view build details at the project level without drilling down into individual modules. When viewing build details from the project level, the **Commits** tab produced a `404` error. This is fixed. (CI-6817)
* Expressions used in pipeline codebase properties unexpectedly resolved to `null`, which caused builds to fail due to missing variable input. These expressions now resolve to their expected values. (CI-6679, ZD-38122, ZD-38241, ZD-38698, ZD-39088)

   ![The CI Codebase Configuration window with the fields set to accept variable expression input.](static/ci-codebase-config-exp-values.png)

* The CI Getting Started workflow leads you through creating an SCM connector and a pipeline. Previously, exiting the Getting Started workflow before creating a pipeline resulted in incomplete connector configuration, and attempting to use the incomplete connector in a pipeline produced the following error: `Invalid argument(s): Both plain text and secret value cannot be null for the field`. If you encounter this error, replace the pipeline's SCM connector with a new one. (CI-6443)

#### February 6, 2023, version 78321

##### What's new

* Linux ARM is now supported in [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) build infrastructures. (CI-5787)
* The Harness UI now shows a detailed warning when a CI build uses unsupported versions of any CI build images. (CI-6721)

##### Early access features

This release does not include early access features.

##### Fixed issues

* Improved the error message that appears in the UI when a Git test connection fails. (CI-6889)
* Fixed an issue where feature flags would sometimes not work with CI due to a backwards-compatibility issue. (CI-6687)
* Fixed an issue where the Commits tab would show a 404 error in the CD build UI. (CI-6632)

#### January 17, 2023, version 78215

##### What's new

* This release includes two new CI steps for integrating your Harness CI pipelines with GitHub Actions and Bitrise. The following steps are available in Harness Cloud build infrastructures only.
   - An Actions step to run GitHub Actions.
   - A Bitrise step to run Bitrise steps and workflows. (CI-6479)
* *The remote debugging feature announced in this release was reverted due to a security concern.* (CI-6350)
* You can now specify hostnames instead of IPs in Kubernetes build infrastructures. This enables your pipelines to communicate with external services using hostnames. The following Harness YAML snippet shows how to set up aliases for your cluster in the CI stage **Infrastructure** section. (CI-5996, ZD-36578)

##### Defining hostnames to use in a Kubernetes build infrastructure

``` yaml
infrastructure:
    type: KubernetesDirect
    spec:
      connectorRef: account.test
      namespace: harness-delegate
    hostNames:
      - abc.com
      - xyz.com
```

##### Early access features

This release does not include early access features.

##### Fixed issues

This release does not include fixed issues.

#### January 10, 2023, version 78105

##### What's new

This release does not include new features.

##### Early access features

This release does not include early access features.

##### Fixed issues

* Fixed an issue in the onboarding UI. In some cases, the web UI did not connect with the specified git account immediately after OAuth setup. (CI-6518)
* You can now use codebase fields as expressions. Previously, when the codebase repository name was defined by `<+pipeline.name>`, the built-in variables `<+codebase.branch>` and `<+codebase.commitSha>` returned null. (CI-6478, ZD-38122, ZD-38241)
* Fixed an issue that prevented Azure connectors from connecting to repos with URLs that contained spaces or `%20`. (CI-6465)
* Fixed an issue where CI reported an upload to an S3 as successful even if the upload failed. (CI-6420, ZD-37931)
* Fixed an issue in the onboarding UI where the **Select Your Repository** progress bar was incorrect. (CI-6335)
* Fixed an issue where a build did not run when a user selected **Run** in the **Pipeline Editor** UI. To run the build, the user needed to go to the YAML editor, save, and then run. (CI-6239)
* Added a log entry when a CI step skips a directory when uploading to an S3 bucket. (CI-6205)

</details>

<details>
<summary>2022 releases</summary>


#### December 22, 2022, version 77908

##### What's new

* Customers on the free plan can now run 5 stages per day on the CI hosted infrastructure. Contact Harness Sales to upgrade your plan. (CI-6430)
* The onboarding experience for new users has been enhanced. You can now create a sample "Hello-world" pipeline even without a repository selected/created.  (CI-6348)

##### Early access features

This release does not include early access features.

##### Fixed issues

This release does not include fixed issues.

#### December 13, 2022, version 77808

##### What's new

This release does not include new features.

##### Early access features

This release does not include early access features.

##### Fixed issues

- Recently, Harness added a new background step to allow CI users to easily set service dependencies instead of using the stage setting for service dependencies. However, since the feature flag stage still relies on the stage service dependencies, this capability was added back to the UI with this fix. (CI-6308)
- An unnecessary view appeared momentarily in the new CI Get Started flow. This issue has been fixed. (CI-6103)
- Previously, users were unable to apply changes after updating the Language field in the Configure Run Tests Step because the Build Tool and Arguments fields were required. The Build Tool and Arguments can now be set dynamically using inputs, allowing users to add and edit the Configure Run Tests Step and save it as a template. (CI-4868)

#### December 7, 2022, version 77716

##### What's new

This release does not include new features.

##### Early access features

This release does not include early access features.

##### Fixed issues

This release does not include fixed issues.

#### November 29, 2022, version 77608

##### What's new

- New Subscription ID field. (CI-6032)
  An Azure subscription ID is now required in the Build and Push ACR step to enable the display of artifacts uploaded by the steps on the Artifacts tab.

- New background step to define the service dependency. (CI-5580)
  A new background step has been added to define the service dependency in CI. The previous stage settings of service dependency are now deprecated. The new background step allows for better control and configuration of services.

##### Early access features

This release does not include early access features.

##### Deprecated features

- AWS Code Commit (CI-5665)
  The AWS Code Commit Git connector has been deprecated. Going forward, use the generic Git connector to integrate with AWS Code Commit.

- Service dependency stage settings. (CI-5580)
  The option to create service dependency has been deprecated. Going forward, use the background step.

##### Fixed issues

This release does not include fixed issues.

#### November 11, 2022, version 77433

##### What's new

This release does not include new features.

##### Early access features

This release does not include early access features.

##### Fixed issues
When building and pushing an image to ACR using a built-in step, the artifact does not appear on the Artifacts tab. (CI-5727)

This issue has been fixed. The artifact now appears on the Artifacts tab.

##### Miscellaneous updates

The number of parallel step executions with matrix are now limited on the free plan. (CI-6061)

#### November 6, 2022, version 77317

##### What's new

The Custom Git Connector now supports connection via the Harness Platform, in addition to the ability to connect through the Harness Delegate. Connecting through Harness Secrets Manager is required to use the generic git connector on the Harness Cloud build infrastructure hosted by Harness. (CI-5666)

##### Early access features

This release does not include early access features.

##### Fixed issues

- Retrying a failed pipeline crashes for PR codebase type. (CI-5974)
  This issue has been fixed.

- Windows PowerShell commands do not start on a new line. (CI-5961)
  Commands now start on a new line.

- When creating a connector for an API authentication Personal Access Token, the All tab does not display. (CI-5960)
  This issue has been fixed.
- Empty trigger data for non-CI pipelines does not show a message. (CI-5879)
  A static message now appears for CD manual executions.

- A file artifact URL does not show for artifact type File. (CI-5872)
  A colon (:) appears instead of the file artifact URL.
  This issue has been fixed.

- Unable to run the Google Cloud Function Drone plugin (CI-5869)
  The issue occurs because unexpected \_uuid elements were being added to the settings.
  To resolve this issue, the \_uuid attribute was removed from the nested setting attribute in the CI plugin step type.

- Intermittent issue in which a hosted build cannot fetch a code repo due to an internal exception. (CI-5622)
  This issue has been fixed.

#### October 21, 2022, version 77221

##### What's new

This release does not include new features.

##### Early access features

This release does not include early access features.

##### Fixed issues

- Fixed an intermittent issue in which a hosted build could not fetch a code repo due to an internal exception. (CI-5622)
- Improved the validation error message that appears when user tries to include an unsupported character in a step name. (CI-5693)

#### October 18, 2022, version 77116

##### What's new

The Infrastructure tab in Build steps has been updated to show only supported options when a Hosted build infrastructure is selected. (CI-5737)

##### Early access features

This release does not include early access features.

##### Fixed issues

- Fixed an issue in which tags for a Build and Push Artifact step would resolve to NULL because the tag string had a dash (-) rather than an underscore (\_). (CI-5305)
- Fixed an issue where the PR build status would not get updated in GitHub consistently. (CI-5411, ZD-33910, ZD-34304, ZD-34547, ZD-35359)
- Fixed an issue where artifacts would not get listed in the Artifacts tab. (CI-5736)
- Fixed a UI issue where the Repo Name width was incorrect when specifying a runtime input. (CI-5744)

#### October 7, 2022, version 77025

##### What's new

- Run Step logs now show the commands that the step will run before it runs them. This functionality is limited to Kubernetes build infrastructures. (CI-5557)
- You can now select Kotlin and Scala as languages in the Run Tests step when setting up Test Intelligence. You can also select sbt as a build tool for Scala. (CI-5653, CI-3333)

##### Early access features

This release includes a new Docker delegate that you can install and run directly on a host. This feature is behind a Feature Flag CI_DOCKER_INFRASTRUCTURE. (CI-5680)

##### Fixed issues

- UI fix: Improved alignment of the Repository Name field in the Build Stage setup wizard. (CI-5509)
  Fixed a back-end issue to ensure that a Bitbucket Connector with API enabled updates the status in Bitbucket as intended. (CI-5625)

- UI fix: When configuring a Service Dependency in an AWS or other cloud infrastructure, the UI should not show Kubernetes-only settings (Run as user, Privileged, and Resource Limits). CI-5628
  Previously added the Actor UUID in Sender for PR Comment webhook event for Bitbucket. Including this information in the other webhooks events as well. Now that the UUID is added, CI Manager can use this. (CI-5657)

- Fixed an issue that could cause CI builds to stall if the build process could not access the binary /usr/local/bin/split_tests. (CI-5664)
  Reverted a previous code change to ensure that a build on a VM infrastructures deletes the VM if the build gets aborted. (CI-5691)

#### September 29, 2023, version 76921

##### What's New

- CI pipelines now support workflows that can run with some runtime inputs undefined. Previously a pipeline would fail if any runtime input was undefined for any field such as an environment variable, label, build argument, or port binding. (CI-5116 , ZD-33893, ZD-34255)

##### Early access features

This release does not include early access features.

##### Fixed issues

- Fixed a UI issue when adding a new build stage to a new pipeline: when the user enters a name in the Repository Name field, the UI should show the repo URL getting generated under the field. (CI-5579)
- Fixed a back-end pipeline issue in which the namespace field that was undefined in an infrastructure definition might be undetected and result in a Null Pointer Exception. (CI-4788)

#### September 22, 2022, version 76817

##### What's new

This release does not include new features.

##### Early access features

This release does not include early access features.

##### Fixed issues

- Fixed a UI issue to ensure that a hint appears in a Git Clone step if there is a connectivity issue with the Delegate. (CI-4518)
- Fixed an issue in which CRUD events were not getting processed and acknowledged. (CI-5556)
- Fixed an issue where an update to a Matrix looping strategy did not persist in the UI after saving a step. (CI-5523)
- Added back-end validation to ensure that a user cannot create a Bitbucket connector with different usernames for standard and API Authentication access. (CI-5504, ZD-34241)
- Improved handling of GitHub registration requests and responses, which prevents trigger webhook creation failures in hosted build infrastructures. (CI-5251)
- Added logic to prevent a Null Pointer Exception if a user adds a AWS_ACCESS_KEY_ID variable with no value to a pipeline. (CI-4884)
- Fixed an issue in the Run Tests step that could cause a manual build to fail if a Git branch was not specified. (CI-4581, ZD-34734)

#### September 14, 2022, version 76708

##### What's new

This release does not include new features.

##### Early access features

This release does not include early access features.

##### Fixed issues

- Added UI validation to ensure the Limit Memory and Limit CPU fields have the required formats. Previously, incorrect values for these fields were flagged during a build, which would cause the build to fail. (CI-5463)
- Added a force-kill flag to ensure that CI pods are deleted during a build cleanup. This ensures that pods get cleaned up even if they are in an Unknown or Not-Ready state. (CI-5377)
- Changed the "exit x" button that appears when creating a connector to make it more visible. (CI-5323)
- Added a validation to ensure that a user provides a repo name when setting up a trigger with an account-level Git connector. Without this validation, the UI would allow users to click Save without a repo name but the trigger would not get created. (CI-5315)
- Improved the error message that appears when a connection test fails because an account-level resource is trying to use a project-level secret. (CI-4705)
- Fixed an issue in the Run Tests step that could cause a manual build to fail if a Git branch was not specified. (CI-4581)

#### September 7, 2022, version 76619

##### What's new

This release does not include new features.

##### Early access features

This release does not include early access features.

##### Fixed issues

Improved the Harness UI to make it easier to search for a specific test under the 'Tests" tab. (CI-3777)

#### August 31, 2022, version 76515

##### What's new

This release does not include new features.

##### Early access features

This release does not include early access features.

##### Fixed issues

- Added a validation to ensure that the Bitbucket Account URL has the correct syntax when setting up a connector. (CI-5235)
- Fixed an issue where some users did not see existing Git connectors when setting up a pipeline in a hosted build infrastructure. (CI-5309)
- Fixed the Overview page refresh rate to ensure that the page fully loads with each refresh. (CI-5322)
- Added the feature flag CI_TI_DASHBOARDS_ENABLED back after it was deleted previously. (CI-4324)

#### August 25, 2022, version 76426

##### What's new

- This release includes a new Git Clone step that clones a repo separate from the repo specified in the Codebase object. This step supports all the config options supported for Codebase objects. (CI-4692)

- You can now use a hosted delegate for Docker, Artifactory, AWS, GCP, BitBucket, GitLab, and Azure connectors. (CI-4828, CI-5241)

##### Early access features

This release does not include early access features.

##### Fixed issues

- Bitbucket behavior on Self-Managed Platforms is improved when downloading large repos using the OPTIMIZED_GIT_FETCH_FILES feature. (CI-5019)
- Fixed an issue that could result in an NPE when fetching trigger status and updating webhook registration status when processing older triggers. (CI-5242)
- Fixed an issue where Restore from GCS didn't work if a step was in a step group. (CI-5298)

#### August 18, 2022, version 76319

##### What's new

You can now run connection tests for AWS, GCP, and Azure connectors. By default, executeOnDelegate field is true so that existing connectors remain backward-compatible. (CI-4980)

##### Early access features

This release does not include early access features.

##### Fixed issues

- Fixed issue: Author ID is not getting populated from Bitbucket webhook trigger. (CI-5183)
- Added target_url parameter in gitlab status update API. (CI-5130)
- Refactored cache saving to remove unnecessary logs ("gc storage credentials from api-key err=unexpected end of JSON input") (CI-4933, ZD-32349, ZD-32627)

#### August 8, 2022, version 76128

##### What's new

This release introduces validations for Custom Webhook events. The event handler now provides appropriate error messages if an event has incorrect values. (CI-4300, ZD-30121)

##### Early access features

This release does not include early access features.

##### Fixed issues

- Added validation for PR build numbers. (CI-3726)
- The CI build graph was not styled consistently with other graphs in the UI. This is now fixed. (CI-3957)
- Fixed issue: Git provider url placeholders were incorrect. (CI-3991)
- Fixed Issue: Active Committers should not count cron and manual execution. (CI-4881)
- You will now see the "CI Codebase" input form only if the selected stage has "cloneCodebase" set as true (in case of a selective stage execution) or at least one stage in the pipeline has "cloneCodebase" set as true (in case of complete pipeline execution). (CI-4894)
- Steps inside Step Groups are now being renamed to <step*group_id>*<step_id>. (CI-5002)
- Fixed JFrog Artifactory Artifact publishing so that build/ and libs/ folders are not included in the artifactory path target. (CI-5023, ZD-32723)
- Parallelism fix: For classnames, testsuites, and testcases, you need to provide a file that includes these values. The test splitter will use these values rather than the glob result. (CI-5049)
- Fixed an intermittent issue where an OAuth error message would appear when new users tried to set up a hosted build. (CI-5060)
- Fixed Issue: Active Committers should not count cron and manual execution. (CI-4841)
- This release introduces validations for Custom Webhook events. The event handler now provides appropriate error messages if an event has incorrect values. (CI-4300)
- Logs were creating issues with multiple stages (CI, CD) and stage names which are prefixes of one another. (CI-5038, ZD-32651)

#### August 2, 2022, version 76030

##### What's new

Users can now use Azure Repos connectors in pipeline codebase configuration and triggers. (CI-4825)

##### Early access features

This release does not include early access features.

##### Fixed issues

- Fixed issue: OAuth failure messages appear incorrectly. (CI-4971)
- Fixed issue: If a user has resources in region other than us-east-1, ECR step was failing for VM's. With this fix, a missing env variable is added which fixes it. (CI-4945, ZD-32398)
- OSX CI builds were failing randomly in case multiple builds are running in parallel. Issue was builds were executing on the incorrect vms. This issue has been resolved. The OSX VM builds now works correctly in runner 1.0.0-rc.7 or above tag. (CI-4935)
- Fix to ensure that pushing to ECR works as intended. Build and Push step when set up with IAM role now works as intended during build pipeline execution step. (CI-4921, ZD-30346, ZD-32243, ZD-32333, ZD-32398, ZD-33155)
- Fixed an issue where Harness Bitbucket hook did not publish the build status back to the Bitbucket repository. (CI-4898, ZD-32133)
- UI fix: When a user switches between Stages, the selected tab is persistent between the previous and the current stage. (CI-4882)
- Fixed an issue where the CI pipeline could not schedule pod due to memory allocation. (CI-4880, ZD-32118)

#### July 18, 2022, version 75921

##### What's new

This release does not include new features.

##### Early access features

This release does not include early access features.

##### Fixed issues

- OAuth updates to support trial user logins. (CI-4918)
- Improved log messages for kaniko build errors. (CI-4513)

#### July 11, 2022, version 75829

##### What's new

The Build UI now shows a new VM icon. (CI-4630)

##### Early access features

This release does not include early access features.

##### Fixed issues

- TI pipeline is failing with error: "no account ID in query params" (CI-4792)
- Active Committers should not count cron and manual execution. (CI-4841)
- Users will see "Start Provisioning" button now only if previously provisioned delegate is unavailable. (CI-4761)

</details>
