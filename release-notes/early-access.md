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

### GitHub App authentication for GitHub connectors

* **Release date:** August 2023
* **Release version:** Delegate version 80303 and CI version 5408
* **Issue number:** CI-8577
* **Feature flag:** `CDS_GITHUB_APP_AUTHENTICATION`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

With this feature flag enabled, you can use a GitHub App as the [primary authentication method for a GitHub connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#credentials-settings).

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

The following early access (beta) features are available for Harness Continuous Delivery and GitOps.

For a complete list of CD early access features, go to [Active CD feature flags](/docs/continuous-delivery/cd-integrations/#active-cd-feature-flags).

### Clean directory before deploying an Azure Web App

* **Release date:** October 2023
* **Release version:** 81008
* **Issue number:** CDS-76724
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

You can clean the target directory before deploying an Azure Web App. For more information, go to [Azure Web Apps deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial).

### Post-prod rollback for ASG and Native Helm deployments

* **Release date:** August 2023
* **Release version:** 80307
* **Issue number:** CDS-77450, CDS-76352, CDS-67121
* **Feature flag:** `CDS_POST_PROD_ROLLBACK`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Added support for Post Prod Rollback for ASG deployment types. For these Services, a Rollback to the previous version can be triggered from the Services Dashboard. For more information about this feature, go to [Post deployment rollback](/docs/continuous-delivery/manage-deployments/rollback-deployments).

* **Update (version 80711, September 2023):** Added support for post-prod rollback for Native Helm deployment types. For these Services, a Rollback to the previous version can be triggered from the Services Dashboard. For more information about this feature, go to [Rollback Deployments](/docs/continuous-delivery/manage-deployments/rollback-deployments).

### Helm Chart deployment info on Services Dashboard

* **Release date:** September 2023
* **Release version:** 80711
* **Issue number:** CDS-73310
* **Feature flag:** `CDC_SERVICE_DASHBOARD_REVAMP_NG`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

[The Services Dashboard includes new support for Helm Chart deployments.](/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments/#individual-service-dashboards) The following information appears only for services that were deployed using Helm charts:

- Tiles in the service overview (**Environments** tab) now show the Helm chart versions (if any) deployed in each environment.

   <docimage path={require('./static/cds-73310-environments-and-groups-tiles-callouts.png')} width="40%" height="40%" title="Click to view full size image" />

- The Environment and Artifacts tables now show Helm chart information about each instance.
- The **Chart Versions** tab shows tiles for each Helm chart used to deploy the service (and a tile for any non-Helm deployments). Each tile shows the instances/artifact, environment, and latest time for each deployment.

   <docimage path={require('./static/cds-77310-chart-tab-panels.png')} width="75%" height="75%" title="Click to view full size image" />

- The Pipeline Executions table for the service now shows the Helm chart version in the drilldown information for that execution.

### GitHub App authentication for GitHub connectors

* **Release date:** August 2023
* **Release version:** Delegate version 80303 and CI version 5408
* **Issue number:** CI-8577
* **Feature flag:** `CDS_GITHUB_APP_AUTHENTICATION`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

With this feature flag enabled, you can use a GitHub App as the [primary authentication method for a GitHub connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#credentials-settings).

### Multiple manifest and migration support

* **Release date:** August 2023
* **Release version:** 80120
* **Issue number:** CDS-73894, CDS-70209
* **Feature flag:** `CDS_HELM_MULTIPLE_MANIFEST_SUPPORT_NG`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

With this feature flag enabled, you can:

* Migrate Services with Helm Chart from Helm Repository stored Artifacts from CG to NG. This helps in migrations.
* Configure multiple Helm Charts in the manifests. This provides feature parity with Harness FirstGen. Helm Charts can now be configured from the Helm Repository as Artifacts that allow users to select the Helm chart for deployment. The UI also now differentiates between manifests and overrides in service.

<!-- ### Digest support for Nexus 3, GitHub, Artifactory artifact sources

* **Release date:** July 2023
* **Release version:** 79916
* **Issue number:** CDS-71711
* **Feature Flag:** REMOVED IN PR 4190

Digest support added for Nexus 3, Github, and Artifactory [artifact sources](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources).

The **Artifact Details** page has an optional **Digest** setting where you can specify the digest/SHA for a container image artifact.

Specifying an image by digest, rather than just tag, is useful when you want to ensure that the image you deploy for a service is fixed and immutable. If an image with the specified tag/digest combination does not exist in the artifact registry, the pipeline execution fails. -->

### Scheduled automatic approvals for manual approval steps

* **Release date:** June 2023
* **Release version:** 76906
* **Issue number:** CDS-69415
* **Feature flag:** `CDS_AUTO_APPROVAL`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

You can configure a manual approval step to automatically approve at a specific date and time.

<docimage path={require('./static/058d3e80cc8f95965e51010541d0c28f77865e484f8a84beea205b49172c658d.png')} width="60%" height="60%" title="Click to view full size image" />

For more details, go to [Automatic Approvals](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/#automatic-approvals).

### Kubernetes deployments support HPA and PDB

* **Release date:** June 2023
* **Release version:** CD version 76516 and Harness Delegate version 23.06.79503
* **Issue number:** CDS-59011
* **Feature flag:** `CDS_SUPPORT_HPA_AND_PDB_NG`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Kubernetes deployments support `HorizontalPodAutoscaler` and `PodDisruptionBudget` for Blue Green and Canary execution strategies. For more information, go to [PDB and HPA tracking](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes/#managed-workloads-table).

### New artifact and manifest triggers

* **Release date:** May 2023
* **Release version:** Delegate version 23.05.79306
* **Issue number:** CDS-68262, ZD-43588, ZD-43726
* **Feature flag:** `TRIGGER_FOR_ALL_ARTIFACTS`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

You can trigger all artifacts and manifests using **On New Artifact** and **On New Manifest** triggers, respectively. Without this feature enabled, you can trigger only the last pushed artifact or manifest using triggers. With this feature enabled, you can trigger all collected artifacts and manifests of perpetual tasks in one single execution using the **On New Artifact** or **On New Manifest** trigger options.

### TAS config files can be pulled from Github

* **Release date:** April 2023
* **Release version:** Delegate version 23.04.79111
* **Issue number:** CDS-56652, CDS-56452
* **Feature flag:** `CDS_GIT_CONFIG_FILES`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

For Harness services using the Tanzu deployment type, [config files can be configured using Git](/docs/continuous-delivery/x-platform-cd-features/services/cd-services-config-files), in addition to the Harness file store. Support for other deployment types in coming soon.

**Update (Delegate version 23.05.79214, May 2023):** You can add Tanzu Application Service (TAS) [config files](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/add-config-files) from GitHub.

<!-- ### Protect secrets in webhook triggers that use secret decryption on delegates

* **Release date:** April 2023
* **Release version:** Delegate version 23.04.79111
* **Issue number:** CDS-58488, ZD-42117
* **Feature flag:** REMOVED IN PR 4185

Github triggers that use a secret for authentication will now use the same delegate selectors saved in the secret's Harness secret manager. -->

### Variable expressions in plain text config files

* **Release date:** April 2023
* **Release version:** Delegate version 23.04.79111
* **Issue number:** CDS-58399
* **Feature flag:** `CDS_NG_CONFIG_FILE_EXPRESSION`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Variable expression support includes service, environment, pipeline, and stage variables. Any Harness expression is supported. Variable expressions are not supported for encrypted text config files because expressions impact the encoded secret.

### Harness removes comments when evaluating commented lines in manifests to avoid rendering failures

* **Release date:** April 2023
* **Release version:** Delegate version 23.04.79015
* **Issue number:** CDS-57721, ZD-41676
* **Feature flag:** `CDS_REMOVE_COMMENTS_FROM_VALUES_YAML`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Expressions in comments were causing issues for some customers as Harness was trying to evaluate the expressions and this was causing failures.

With this feature enabled, Harness removes comments from `values.yaml` files to prevent expressions in comments from being evaluated and causing failures.

### Large repo support for Azure Repos

* **Release date:** March 2023
* **Release version:** Delegate version 23.03.78712
* **Feature flag:** `OPTIMIZED_GIT_FETCH_FILES`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Large repositories are now supported for [Azure Repo](/docs/platform/connectors/code-repositories/connect-to-a-azure-repo).

Harness performs a `git clone` to fetch files. When fetching very large repositories, the network connection may time out. When this feature flag is enabled, Harness will use provider-specific APIs to improve performance.

### Convert imperative Kubernetes rollback to declarative rollback

* **Release date:** January 2023
* **Issue number:** CDS-2993, ZD-26855, ZD-27690, ZD-36563, ZD-36670
* **Feature flag:** `CDP_USE_K8S_DECLARATIVE_ROLLBACK_NG`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Harness applies Kubernetes manifest  using `kubectl apply`, which is a declarative way of creating Kubernetes objects. But when rolling back, Harness runs `kubectl rollout undo workloadType/workloadName --to-revision=<REVISION_NUMBER>`, which is an imperative way of rolling back. Using imperative and declarative commands together is not recommended and can cause issues.

In some instances, the workload spec was not updated properly when `rollout undo` was performed. Subsequent deployments then referred to an invalid spec of the workload and caused Kubernetes issues like [kubectl rollout undo should warn about undefined behavior with kubectl apply](https://github.com/kubernetes/kubernetes/issues/94698).

Enabling declarative rollback disables versioning (even if the **Skip Versioning** checkbox is left unchecked), since versioning was introduced with the imperative rollback design. However, versioning is not needed with [declarative rollback](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/#declarative-rollback).

The delegate's service account needs the permission to create, update, and read secrets in the defined infrastructure namespace. Typically, delegates already have these permissions, but if cluster roles are strictly scoped, this could cause failures. For information on cluster roles for the delegate, go to [Install Harness Delegate on Kubernetes](/tutorials/platform/install-delegate/).

#### ECS Run Task support

* **Release date:** October 2022
* **Issue number:** CDS-57721, ZD-41676
* **Feature flag:** `NG_SVC_ENV_REDESIGN` and `ECS_NG`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

For ECS deployments, you can deploy artifacts to your Amazon Elastic Container Service (ECS) clusters using a Rolling, Canary, and Blue Green strategies. For more information, go to the [ECS deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/).

**Update (October 2022):** In addition to deploying tasks as part of your standard ECS deployment, you can use the ECS Run Task step to run individual tasks separately as a step in your ECS stage. The ECS Run Task step is available in all ECS strategy types. An example of when you run a task separately is a one-time or periodic batch job that does not need to keep running or restart when it finishes. For more information, go to the [ECS tutorial's run task step](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/).

#### Enhancements for Secure Shell and WinRM deployments

* **Release date:** October 2022
* **Feature flag:** `NG_SVC_ENV_REDESIGN`, `SSH_NG`, and `PIPELINE_MATRIX`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Fpr traditional deployments using SSH or WinRM, you can deploy your artifacts to hosts located in Microsoft Azure, AWS, or any platform-agnostic Physical Data Center (PDC).

These deployments are called Traditional because they use Secure Shell and PowerShell scripts and a traditional runtime environment as opposed to containers and orchestration mechanisms, like Kubernetes.

For more information, go to [Secure Shell (SSH) deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng) and [WinRM deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial).

#### Custom deployments using Deployment Templates

* **Release date:** October 2022
* **Feature flag:** `NG_SVC_ENV_REDESIGN` and `NG_DEPLOYMENT_TEMPLATE`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

In some cases, you might use a platform that doesn't have first class support in Harness, such as OpenStack, WebLogic, WebSphere, Google Cloud functions, etc. Harness calls these non-native deployments. For non-native deployments, Harness provides a custom deployment option using Deployment Templates. For more information, go to the [Custom deployments using deployment templates tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial).

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

### GitHub App authentication for GitHub connectors

* **Release date:** August 2023
* **Release version:** Delegate version 80303 and CI version 5408
* **Issue number:** CI-8577
* **Feature flag:** `CDS_GITHUB_APP_AUTHENTICATION`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

With this feature flag enabled, you can use a GitHub App as the [primary authentication method for a GitHub connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#credentials-settings).

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

### CD features promoted to GA

For more information about CD early access features, go to [Active CD feature flags](/docs/continuous-delivery/cd-integrations/#active-cd-feature-flags).

#### Harness supports the deployment of AWS Lambda functions

* **GA date:** 2023
* **Early access release date:** April 2023
* **Early access release version:** Delegate version 23.04.79015
* **Feature flag:** `CDS_AWS_NATIVE_LAMBDA`

Harness supports the [deployment of AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments) functions.

#### Differentiate environments in Blue Green deployment release history

* **GA date:** November 2023
* **Early access release date:** June 2023
* **Early access release version:** CD version 79714 and Harness Delegate version 23.06.79707
* **Issue number:** CDS-69961
* **Feature flag:** `CDS_BG_STAGE_SCALE_DOWN_STEP_NG`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

Added a new field in the release history for Blue Green deployments to differentiate between environments.

This is an enhancement to the Kubernetes Blue Green Stage Scale Down step. You can now scale down your last successful stage environment only if the primary resources exist. This enhancement helps you efficiently manage your resources, and prevent deleting the important resources.

Make sure that the infrastructure definition of these resources and the Blue Green service are the same. This is necessary as Harness identifies resources from the release history, which is mapped to a release name. If you configure a different infrastructure definition, it might lead to scaling down important resources.

#### Selective stage executions for webhook triggers

* **GA date:** November 2023
* **Early access release date:** May 2023
* **Early access release version:** Delegate version 23.05.79214
* **Issue number:** CDS-56775, CDS-56774
* **Feature flag:** `CDS_NG_TRIGGER_SELECTIVE_STAGE_EXECUTION`

You can set webhook triggers to run specific pipeline stages using the [Allow selective stage(s) executions?](/docs/platform/pipelines/run-specific-stage-in-pipeline) option.

<details>
<summary>Run a specific stage in a pipeline</summary>

To run a particular stage of a pipeline:

1. Select the stage, then select **Advanced Options**.
2. In **Stage Execution Settings>** **Allow selective stages(s) executions?**, select **Yes**. This setting is selected by default.

   ![](./static/selective-stage-execution.png)

3. When you create a trigger, in **Configuration**, select the stages you want to execute.

   ![](./static/select-stage-to-execute.png)

Here is a sample trigger YAML:

```
trigger:
name: stage3Trigger
identifier: stage3Trigger
enabled: true
description: ""
tags: {}
stagesToExecute:
  - stage3
orgIdentifier: NgTriggersOrg
projectIdentifier: viniciusTest
pipelineIdentifier: ThreeStagesPipeline
source:
  type: Webhook
  spec:
    type: Custom
    spec:
      payloadConditions: []
      headerConditions: []
inputYaml: |
  pipeline:
    identifier: ThreeStagesPipeline
    stages:
      - stage:
          identifier: stage3
          type: Custom
          variables:
            - name: stage3var
              type: String
              value: stage3Var
```

</details>

#### ServiceNow custom table support

* **GA date:** November 2023
* **Early access release date:** April 2023
* **Early access release version:** Delegate version 23.04.79015
* **Issue number:** CDS-55046
* **Feature flag:** `CDS_SERVICENOW_TICKET_TYPE_V2`

Custom table support is now available in Harness' ServiceNow integration. Harness recommends that you only use a table extending task, or extend tables that indirectly extend the task. You can specify any custom table in Harness.

In ServiceNow, a table extending task is a task that involves creating a new table by extending an existing table. When a table is extended, a new child table is created that inherits all the fields, relationships, and other attributes of the parent table. The child table can then be customized further to meet the specific needs of the organization.

Itil roles are not mandatory for using these steps. When using the normal flow for custom tables, you should have sufficient permissions on the custom table, such as basic CRUD permissions, permissions to update desired fields, etc.

When using template flow, your user role is required along with cross scope privileges to the custom table.

The store app is only certified to be used with Incident, Problem, Change Request, and Change Task tables by the ServiceNow certification team.

The custom table being used should allow access to this table via web services.

#### Kubernetes Dry Run step added

* **GA date:** 2023
* **Early access release date:** February 2023
* **Issue number:** CDS-43839
* **Feature flag:** `K8S_DRY_RUN_NG`

You can add the Dry Run step for Kubernetes and Native Helm deployments.

![Dry Run step](static/bb64e94a2baf0858bbefe20ecede63ff1e4de692c15882c4f131df7e17c9906b.png)

The Dry Run step fetches the Kubernetes manifests or Helm charts in a stage and performs a dry run of those resources. This is the same as running a `kubectl apply --filename=manifests.yaml --dry-run`.

You can use the Dry Run step to check your manifests before deployment. You can follow the step with an [Approval](/docs/category/approvals/) step to ensure the manifests are valid before deployment.

You can reference the resolved manifest from the Dry Run step in subsequent steps using a Harness variable expression, for example:

```
<+pipeline.stages.[Stage_Id].spec.execution.steps.[Step_Id].k8s.ManifestDryRun>
```

For example, if the stage Id is `Deploy` and the Dry Run step Id is `Dry_Run` the expression would be:

```
<+pipeline.stages.Deploy.spec.execution.steps.Dry_Run.k8s.ManifestDryRun>
```

For more information, go to [Perform a Kubernetes dry run](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/k8s-dry-run).

#### Nexus 3 support for Azure Web App artifacts

* **GA date:** Early 2023
* **Release date:** December 2022
* **Issue number:** CDS-46372
* **Feature flag:** `AZURE_WEB_APP_NG_NEXUS_PACKAGE`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)

For more information, go to the [Azure Web Apps deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial).

#### Specify Terraform Backend Configuration in remote file repository

* **GA date:** Early 2023
* **Early access release date:** November 2022
* **Issue number:** CDS-39012, ZD-37065
* **Feature flag:** `TERRAFORM_REMOTE_BACKEND_CONFIG`

Terraform Backend Configuration file path in the Terraform Apply step now supports remote file repos. For more details, go to [Provision with the Terraform Apply Step](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/).

#### Simplified Git Experience

* **GA date:** Late 2022/Early 2023
* **Early access release date:** July 2022
* **Feature flag:** `NG_GIT_EXPERIENCE`

Harness Git Experience lets you store configurations for your resources like pipelines and input sets in Git. You can choose Git as the source of truth and use your Git credentials to access and modify your configurations.

With Harness Git Experience, you can select the repository and branch from where you want to execute your pipelines, hence simplifying your Pipeline execution by seamless access to your Harness resources and their configurations stored in Git.

For more information, go to [Harness Git Experience Overview](/docs/platform/git-experience/git-experience-overview/).

### CI features promoted to GA

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
`

The **Security Tests** tab includes a set of pull-down menus so you can filter the issues lists by Target, Target Type, Step, Stage, and Scanner.

![Click on a tile to filter issues by severity](./static/sto-pulldown-filters-sto-5212.png)

#### Use regex to define dynamic target baselines

* **GA date:** August 2023
* **Early access release date:** July 2023
* **Early access Release version:** 1.61.1  
* **Feature flag:** `STO_BASELINE_REGEX`

<!-- -->

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


##### Update (Version 1.72.1) 


- You can now provide feedback about the AIDA-generated remediation step for a selected issue. (STO-6593)

- You are now required to sign an end-user license agreement to access the Harness AI Development Assistant (AIDA) in the account and project scopes. You need to do this even if you could previously use AIDA without signing a EULA. This change was originally introduced in the 80505 platform release. (PL-39723)

  The EULA is displayed when you enable AIDA at the account scope (**Account Settings** > **Account Resources** > **Default Settings** > **Harness AI Developer Assistant**).

  Each account user must sign the EULA only once.

  The setting is inherited at the project scope.


##### Update (Version 1.61.1) 

* Fixed an issue that broke the capability to customize the code snippet for AIDA-augmented remediations in the Security Tests module. (STO-6181)

##### Update (Version 1.60.0)

- Reference Identifiers selected for AIDA enhancement in a Security Issue are now remembered, upon generation, and shown when revisited in the UI. (STO-6032)

#### Improved UI for configuring scan steps

* **GA date:** November 2023
* **Early access release date:** March 2023
* **Early access Release version:** 1.38.3
* **Feature flag:** Yes

This feature includes a set of Security steps with an improved UI for configuring scans. Each step shows only the settings that apply to the specific scan. Note the following:

- This release includes new steps for the following scanners: Aqua Trivy, Bandit, Black Duck, Checkmarx, Grype, Mend, Prisma Cloud, Snyk, SonarQube, and ZAP.  
- Docker-in-Docker is no longer required for these steps *unless* you're scanning a container image. If you're scanning a repository or running instance, you don't need to set up a Background step running DinD.    
- Support is currently limited to Kubernetes and Harness Cloud AMD64 build infrastructures only.
- For descriptions of all available UI settings, go to [Security step UI settings reference](/docs/security-testing-orchestration/sto-techref-category/security-step-ui-settings-reference).

![STO step palette](static/sto-step-palette.png)
