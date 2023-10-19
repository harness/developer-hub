---
title: Early access features
date: 2023-10-16T10:00
sidebar_position: 2
---

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/early-access/rss.xml" />

These release notes describe early access (beta) features in Harness NextGen SaaS. Early access features can be released for the Harness Platform, delegate, or individual modules.

Early access features are behind feature flags. You can contact [Harness Support](mailto:support@harness.io) to enable a feature you're interested in.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## Platform early access features

The following early access (beta) features are available for the Harness Platform.

### FEATURE NAME with data

**Release date:** MONTH DD, YYYY

**Release version:** 1234

**Issue number:** ID-12345

**Feature flag:** `FEATURE_FLAG_ID`

**How to enable:** Contact [Harness Support](mailto:support@harness.io)

**Description:** Description with link to docs.

**Update (version 12345, DATE):** Added XYZ enhancement to this feature.

(Present info in short statements.

Pros: Brief, scan headings by feature name; provides more info up front rather than having to read the content under each date. Good for keeping information together when features are rolled back or updated over time; you can add the update to the existing section rather than create a new entry.

Cons: Not great for promoting updates to previously-released features. Not easy to skim by date. Not necessarily alphabetical. Can be hard to create short titles. Not the greatest if you want to include multi-paragraph description or pictures.)

### FEATURE NAME with data list

* **Release date:** MONTH DD, YYYY
* **Release version:** 1234
* **Issue numbers:** ID-12345, ID-13763, ID-13819
* **Feature flag:** `FEATURE_FLAG_ID`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)
* **Description:** Description with link to docs
* **Update (version 12356, DATE):** Added XYZ enhancement to this feature.
* **Update (version 12357, DATE):** Rolled back due to a bug that caused ABC.

(Same as above but use bullets.)

### VERSION (DATE) with subheadings

#### Short description of feature (ID-1234)

Description with link to docs.

This feature is behind the feature flag `FEATURE_FLAG_ID`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

(Organize by version number and date.

Pros: Free-form paragraph format allows for more creative presentation of information. Good for readers who like to browse by date.

Cons: When features are updated later, there may be no connection to previous entries. Not great for users who want to browse by summary rather than date. Due to "Date first", exciting features like AIDA are demoted under the date heading.)

### June 21, 2023

#### Harness launches Harness AI Development Assistant as a beta feature

The Harness platform leverages Harness AI Development Assistant (AIDA) to revolutionize software delivery processes. By combining AI capabilities with robust DevOps tools, features, and practices, the Harness platform streamlines and accelerates the software delivery lifecycle, and it empowers teams to deliver high-quality applications quickly and efficiently. Its AI-driven predictive analytics, continuous verification, and advanced release orchestration capabilities empower teams to drive innovation, improve efficiency, and ultimately deliver exceptional user experiences.

Following are some key benefits of Harness AIDA:

- Auto-recognition of failures in pipelines: The root cause analysis (RCA) option generates recommendations for step failures in pipelines. Harness bases these recommendations on the step logs and the context of the failed step.
  For more information, go to [Troubleshooting with AIDA](http://developer.harness.io/docs/continuous-integration/troubleshoot-ci/aida).

- Asset governance: The asset governance feature assists you in drafting rules that are based on your requirements and aligned with your governance goals. Harness AIDA governance support also offers detailed descriptions of built-in rules. When you are creating policies, this feature facilitates informed decision-making by clarifying the purpose, scope, and implications of each rule.
  For more information, go to [Asset governance with AIDA](/docs/category/harness-aida-for-asset-governance).
  
- Security: Harness AI identifies security vulnerabilities, describes them, and suggests remediation.
  For more information, go to [Remediations with AIDA](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/ai-based-remediations).

Review the following information for details about data privacy and terms of use:

- [AIDA Terms](https://www.harness.io/legal/aida-terms)
- [AIDA Privacy](https://www.harness.io/legal/aida-privacy)

These features are behind features flags. Contact [Harness Support](mailto:support@harness.io) to enable these features.

### Version 78817 (March 24, 2023)

#### SCIM user provisioning enhancements (PL-31496)

Any CRUD operation on a user now returns the details of the user groups that the user is part of. You can use this to verify what groups a given user belongs to.

This feature, and the [previous enhancements released on March 15, 2023](#scim-user-provisioning-enhancements-pl-31498-pl-31497), are behind the feature flag `PL_NEW_SCIM_STANDARDS`. Contact [Harness Support](mailto:support@harness.io) to enable these features.

### Version 78712 (March 15, 2023)

#### SCIM user provisioning enhancements (PL-31498, PL-31497)

The following enhancements are behind the feature flag `PL_NEW_SCIM_STANDARDS`. Contact [Harness Support](mailto:support@harness.io) to enable these features.

* Harness now populates `givenName` and `familyName` for users via SCIM and returns the same when a GET, CREATE, or UPDATE request is made.
* The response of a CRUD operation on a user or user group now contains the following meta fields as per the SCIM 2.0 standards:
   - createdAt
   - lastUpdated
   - version
   - resourceType

### February 6, 2023

#### Delete users provisions in Harness through SCIM (PL-23577)

You can delete a user provisioned in Harness through SCIM in NextGen and retain the user in FirstGen by enabling the feature flag `PL_USER_DELETION_V2`.

## Delegate early access features

The following early access (beta) features are available for the Harness Delegate.

### GitHub App authentication for GitHub connectors

**Release date:** August 22, 2023

**Release version:** Delegate version 80303 and CI version 5408

**Issue number:** CI-8577

**Feature flag:** `CDS_GITHUB_APP_AUTHENTICATION`

**How to enable:** Contact [Harness Support](mailto:support@harness.io)

**Description:** With this feature flag enabled, you can use a GitHub App as the [primary authentication method for a GitHub connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#credentials-settings).

### Delegate task capacity check

**Release date:** July 18, 2023

**Release version:** 79904

**Issue number:** PL-39351

**Feature flag:** `DELEGATE_TASK_CAPACITY_CHECK`

**How to enable:** Contact [Harness Support](mailto:support@harness.io)

**Description:** Harness added the ability to acquire only the configured maximum number of tasks. This allows Harness Manager to use the task capacity to determine whether to assign a task to the delegate or queue it. You can configure the maximum number of tasks using the Env variable `DELEGATE_TASK_CAPACITY`. For example, if you set `DELEGATE_TASK_CAPACITY` to a value of 2 and execute 6 tasks in parallel, Harness Manager executes only 2 tasks at a time. If you don't configure `DELEGATE_TASK_CAPACITY`, Harness Manager executes all 6 tasks in parallel. When this feature flag is enabled, the task is broadcast every minute in Harness Manager until it expires.

### Delegate task capacity check

**Release date:** May 23, 2023

**Release version:** 79307

**Issue number:** PL-37908, PL-38538

**Feature flag:** `DELEGATE_ENABLE_DYNAMIC_HANDLING_OF_REQUEST`

**How to enable:** Contact [Harness Support](mailto:support@harness.io)

**Description:** Harness can capture delegate agent metrics for delegates shipped on immutable image types. The following delegate agent metrics are available with this feature flag enabled:

   | **Metric name** | **Description** |
   | :-- | :-- |
   | `task_completed` | The number of tasks completed. |
   | `task_failed` | The number of failed tasks. |
   | `task_rejected` | The number of tasks rejected because of a high load on the delegate. |
   | `delegate_connected` | Indicates whether the delegate is connected. Values are 0 (disconnected) and 1 (connected). |
   | `resource_consumption_above_threshold` | Delegate cpu/memory is above a threshold (defaults to 80%). Provide `DELEGATE_RESOURCE_THRESHOLD` as the env variable in the delegate YAML to configure the threshold. |

<!-- ## CE early access features

No early access (beta) features are available for the Harness Chaos Engineering module. -->

## CCM early access features

The following early access (beta) features are available for the Harness Cloud Cost Management module.

### Propagate force cool down

<!-- not sure this is actually early access -->

**Release date:** June 09, 2023

**Release version:** 79701

**Issue number:** CCM-12338

**Feature flag:** Yes

**How to enable:** Contact [Harness Support](mailto:support@harness.io)

**Description:** You can now propagate force cool down from primary rule to dependent rules. Earlier, when stopping a rule from the UI, you had to stop its dependant rules one by one. With this enhancement, you can propagate the stop operation to dependant rules as well. Propagating cool down to dependant rules is optional. You can stop the primary rule with or without propagating cool down to dependant rules.

## CD & GitOps early access features

The following early access (beta) features are available for Harness Continuous Delivery and GitOps.

### Clean directory before deploying an Azure Web App

**Release date:** October 16, 2023

**Release version:** 81008

**Issue number:** CDS-76724

**Feature flag:** `CDS_WEBAPP_ENABLE_CLEAN_OPTION`

**How to enable:** Contact [Harness Support](mailto:support@harness.io)

**Description:** You can clean the target directory before deploying an Azure Web App. For more information, go to [Azure Web Apps deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial).

### Version 80711 (September 19, 2023)

#### Post-prod rollback for Native Helm deployments (CDS-67121)

Added support for post-prod rollback for Native Helm deployment types. For these Services, a Rollback to the previous version can be triggered from the Services Dashboard.

This feature is behind the feature flag `POST_PROD_ROLLBACK`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

For more information about this feature, go to [Rollback Deployments](/docs/continuous-delivery/manage-deployments/rollback-deployments).

#### Helm Chart deployment info on Services Dashboard (CDS-73310)

The Services Dashboard includes new support for Helm Chart deployments. This feature is behind the feature flag `CDC_SERVICE_DASHBOARD_REVAMP_NG`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. (CDS-73310)

The following information appears only for services that were deployed using Helm charts:

- Tiles in the service overview (**Environments** tab) now show the Helm chart versions (if any) deployed in each environment.

   <docimage path={require('./static/cds-73310-environments-and-groups-tiles-callouts.png')} width="40%" height="40%" title="Click to view full size image" />

- The Environment and Artifacts tables now show Helm chart information about each instance.
- The **Chart Versions** tab shows tiles for each Helm chart used to deploy the service (and a tile for any non-Helm deployments). Each tile shows the instances/artifact, environment, and latest time for each deployment.

   <docimage path={require('./static/cds-77310-chart-tab-panels.png')} width="75%" height="75%" title="Click to view full size image" />

- The Pipeline Executions table for the service now shows the Helm chart version in the drilldown information for that execution.

### Version 80307 (August 22, 2023)

#### Post-prod rollback for ASG deployments (CDS-77450, CDS-76352)

Added support for Post Prod Rollback for ASG deployment types. For these Services, a Rollback to the previous version can be triggered from the Services Dashboard.

This feature is behind the feature flag `POST_PROD_ROLLBACK`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

For more information about this feature, go to [Post deployment rollback](/docs/continuous-delivery/manage-deployments/rollback-deployments).

### Version 80120 (August 4, 2023)

#### Multiple manifest and migration support (CDS-73894, CDS-70209)

The following features are behind the feature flag `CDS_HELM_MULTIPLE_MANIFEST_SUPPORT_NG`. Contact [Harness Support](mailto:support@harness.io) to enable the feature flag.

* You can migrate Services with Helm Chart from Helm Repository stored Artifacts from CG to NG. This will help in migrations.
* You can configure multiple Helm Charts in the manifests. This provides feature parity with Harness FirstGen. Helm Charts can now be configured from the Helm Repository as Artifacts that allow users to select the Helm chart for deployment. The UI also now differentiates between manifests and overrides in service.

### Version 79916 (July 18, 2023)

#### Digest support for Nexus 3, GitHub, Artifactory artifact sources (CDS-71711)

Digest support added for Nexus 3, Github, and Artifactory [artifact sources](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources).

The **Artifact Details** page has an optional **Digest** setting where you can specify the digest/SHA for a container image artifact.

Specifying an image by digest, rather than just tag, is useful when you want to ensure that the image you deploy for a service is fixed and immutable. If an image with the specified tag/digest combination does not exist in the artifact registry, the pipeline execution fails.

This feature is behind the feature flag `CD_NG_DOCKER_ARTIFACT_DIGEST`. Contact [Harness Support](mailto:support@harness.io) to enable the feature flag.

### Version 79714 (June 28, 2023)

import Earlyaccess from '/release-notes/shared/cd-79700-early-access.md'

<Earlyaccess />

### Version 76906 (June 19, 2023)

#### Scheduled automatic approvals added to manual approval steps (CDS-69415)

This functionality is behind the feature flag `CDS_AUTO_APPROVAL`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

You can configure a manual approval step to automatically approve at a specific date and time.

<docimage path={require('./static/058d3e80cc8f95965e51010541d0c28f77865e484f8a84beea205b49172c658d.png')} width="60%" height="60%" title="Click to view full size image" />

For more details, go to [Automatic Approvals](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/#automatic-approvals).

### Version 76516 (June 09, 2023)

<!--- Scale down the last successful stage environment created by using a Blue Green Deployment strategy. (CDS-68527)
  
  This functionality is behind a feature flag, `CDS_BG_STAGE_SCALE_DOWN_STEP_NG`. 

  This functionality helps you efficiently manage your resources. The scale down step can be configured within the same stage or different stage based on your requirement.

  During scale down, the `HorizontalPodAutoscaler` and `PodDisruptionBudget` resources are removed, and the Deployments, StatefulSets, DaemonSets and Deployment Configs resources are scaled down. Make sure that the infrastructure definition of these resources and the Blue Green deployment are the same. This is necessary as Harness identifies resources from the release history, which is mapped to a release name. If you configure a different infrastructure definition, it might lead to scaling down important resources.

  Harness Delegate version 79503 is required for this feature.-->

#### Kubernetes deployments support HPA and PDB (CDS-59011)

Kubernetes deployments support `HorizontalPodAutoscaler` and `PodDisruptionBudget` for Blue Green and Canary execution strategies.

This functionality is behind the feature flag `CDS_SUPPORT_HPA_AND_PDB_NG`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

Harness Delegate version 23.06.79503 is required for this feature.

### Platform version 79306 (May 23, 2023)

#### New artifact and manifest triggers (CDS-68262, ZD-43588, ZD-43726)

You can trigger all artifacts and manifests using **On New Artifact** and **On New Manifest** triggers, respectively. Earlier, you could trigger only the last pushed artifact or manifest using triggers. You can now trigger all collected artifacts and manifests of perpetual tasks in one single execution using the **On New Artifact** or **On New Manifest** trigger options.

This functionality is behind the feature flag `TRIGGER_FOR_ALL_ARTIFACTS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

### Platform version 79214 (May 04, 2023)

#### Selective stage executions for webhook triggers (CDS-56775, CDS-56774)

You can set webhook triggers to run specific pipeline stages using the [Allow selective stage(s) executions?](/docs/platform/pipelines/run-specific-stage-in-pipeline/) option.

This functionality is behind the feature flag `CDS_NG_TRIGGER_SELECTIVE_STAGE_EXECUTION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

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

#### TAS config files (CDS-56452)

You can add Tanzu Application Service (TAS) [config files](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/add-config-files) from GitHub.

This feature is behind the feature flag `CDS_GIT_CONFIG_FILES`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

### Platform version 79111 (April 21, 2023)

#### Protect secrets in webhook triggers that use secret decryption on delegates (CDS-58488, ZD-42117)

Github triggers that use a secret for authentication will now use the same delegate selectors saved in the secret's Harness secret manager.

This functionality is behind a feature flag, `CDS_NG_TRIGGER_AUTHENTICATION_WITH_DELEGATE_SELECTOR`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

#### Variable expressions in plain text config files (CDS-58399)

Variable expression support includes service, environment, pipeline, and stage variables. Any Harness expression is supported. Variable expressions are not supported for encrypted text config files because expressions impact the encoded secret.

This functionality is behind a feature flag, `CDS_NG_CONFIG_FILE_EXPRESSION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

#### Config files can be pulled from Github (CDS-56652)

For Harness services using the Tanzu deployment type, config files can be configured using Github, in addition to the Harness file store. Support for other deployment types in coming soon.

This functionality is behind a feature flag, `CDS_GIT_CONFIG_FILES`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

### Platform version 79015 (April 10, 2023)

#### Harness supports the deployment of AWS Lambda functions.

Harness supports the [deployment of AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments) functions.

This functionality is behind a feature flag, `CDS_AWS_NATIVE_LAMBDA`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

#### ServiceNow custom table support (CDS-55046)

This functionality is behind a feature flag, `CDS_SERVICENOW_TICKET_TYPE_V2`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

Custom table support is now available in Harness' ServiceNow integration.

Harness recommends that you only use a table extending task, or extend tables that indirectly extend the task. You can specify any custom table in Harness.

<details>
<summary>What is a table extending task?</summary>

In ServiceNow, a table extending task is a task that involves creating a new table by extending an existing table. When a table is extended, a new child table is created that inherits all the fields, relationships, and other attributes of the parent table. The child table can then be customized further to meet the specific needs of the organization.

</details>

Itil roles are not mandatory for using these steps. When using the normal flow for custom tables, you should have sufficient permissions on the custom table, such as basic CRUD permissions, permissions to update desired fields, etc.

When using template flow, your user role is required along with cross scope privileges to the custom table.

The store app is only certified to be used with Incident, Problem, Change Request, and Change Task tables by the ServiceNow certification team.

The custom table being used should allow access to this table via web services.

#### Harness removes comments when evaluating commented lines in manifests to avoid rendering failures (CDS-57721, ZD-41676)

This functionality is behind a feature flag, `CDS_REMOVE_COMMENTS_FROM_VALUES_YAML`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

Expressions in comments were causing issues for some customers as Harness was trying to evaluate the expressions and this was causing failures.

Harness will remove comments from values.yaml files to prevent expressions in comments from being evaluated and causing failures.

### Platform version 78712 (March 15, 2023)

#### Large repo support for Azure Repos

Large repositories are now supported for [Azure Repo](/docs/platform/connectors/code-repositories/connect-to-a-azure-repo).

This functionality is behind a feature flag, `OPTIMIZED_GIT_FETCH_FILES`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

Harness performs a `git clone` to fetch files. When fetching very large repositories, the network connection may time out. When this feature flag is enabled, Harness will use provider-specific APIs to improve performance.

### February 15, 2023

#### Kubernetes Dry Run step added (CDS-43839)

You can now add the Dry Run step for Kubernetes and Native Helm deployments. This functionality is behind a feature flag, `K8S_DRY_RUN_NG`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

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

### January 12, 2023

#### Convert imperative Kubernetes rollback to declarative rollback (CDS-2993, ZD-26855, ZD-27690, ZD-36563, ZD-36670)

This functionality is behind a feature flag: `CDP_USE_K8S_DECLARATIVE_ROLLBACK_NG`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

Harness applies Kubernetes manifest  using `kubectl apply`, which is a declarative way of creating Kubernetes objects. But when rolling back, we perform `kubectl rollout undo workloadType/workloadName --to-revision=<REVISION_NUMBER>`, which is an imperative way of rolling back. Using imperative and declarative commands together is not recommended and can cause issues.

In some instances, the workload spec was not updated properly when `rollout undo` was performed. Subsequent deployments then refered to an invalid spec of the workload and caused Kubernetes issues like [kubectl rollout undo should warn about undefined behaviour with kubectl apply](https://github.com/kubernetes/kubernetes/issues/94698).

* **What is the fix?**
   * We had to redesign our release history to store all rendered manifests in secrets, just like Helm does. While rolling back, we are now reapplying the last successful release's manifests. This solves this issue.
* **What is the impact on customers?**
   * Enabling declarative rollback disables versioning (even if the **Skip Versioning** checkbox is left unchecked), since versioning was introduced with the imperative rollback design. However, versioning is not needed anymore with declarative rollback.
   * The delegate's service account needs the permission to create, update, and read secrets in the defined infrastructure namespace. Typically, customers' delegates already have these permissions, but if cluster roles are strictly scoped, this could cause failures. For information on cluster roles for the delegate, go to [Install Harness Delegate on Kubernetes](/tutorials/platform/install-delegate/).

<!-- ## CET early access features

No early access (beta) features are available for the Harness Continuous Error Tracking module. -->

## CI early access features

The following early access (beta) features are available for the Harness Continuous Integration module.

### Harness AI Development Assistant (AIDA:tm:)

* **Release date:** June 21, 2023
* **Release version:** 4301
* **Issue numbers:** CI-8599, CI-8735, CI-9102
* **Feature flag:** `CI_AI_ENHANCED_REMEDIATIONS`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)
* **Description:** The Harness platform leverages Harness AI Development Assistant (AIDA) to revolutionize software delivery processes. By combining AI capabilities with robust DevOps tools, features, and practices, the Harness platform streamlines and accelerates the software delivery lifecycle, and it empowers teams to deliver high-quality applications quickly and efficiently. Its AI-driven predictive analytics, continuous verification, and advanced release orchestration capabilities empower teams to drive innovation, improve efficiency, and ultimately deliver exceptional user experiences. In Harness CI, AIDA provides auto-recognition of failures in pipelines. The root cause analysis (RCA) option generates recommendations for step failures in pipelines. Harness bases these recommendations on the step logs and the context of the failed step. For more information, go to [Troubleshooting with AIDA](http://developer.harness.io/docs/continuous-integration/troubleshoot-ci/aida).
* **Update (Version 4901, July 06, 2023):** Applied scrolling to long remediation messages when troubleshooting with AIDA.
* **Update (Version 5106, July 28, 2023):** Fixed an issue where step details for other steps were shown when using AIDA to troubleshoot a pipeline with multiple failed steps.
* **Update (Version 5902, September 29, 2023):** When troubleshooting with AIDA, stage-level error analysis is available for failed stages without steps. If a stage has steps, step-level error analysis occurs instead.

### GitHub App authentication for GitHub connectors

* **Release date:** August 22, 2023
* **Release version:** Delegate version 80303 and CI version 5408
* **Issue number:** CI-8577
* **Feature flag:** `CDS_GITHUB_APP_AUTHENTICATION`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)
* **Description:** With this feature flag enabled, you can use a GitHub App as the [primary authentication method for a GitHub connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#credentials-settings).

### Configure Cache Intelligence in the Visual editor

* **Release date:** August 10, 2023
* **Release version:** 5301
* **Issue number:** CI-8917
* **Feature flag:** `CI_CACHE_INTELLIGENCE`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)
* **Description:** You can enable and configure [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) in the Pipeline Studio's Visual editor. Previously, you could only enable Cache Intelligence through the YAML editor. For more information, go to the [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) documentation. This enhancement only applies to Harness Cloud build infrastructure.

### Enable Cache Intelligence in the Visual editor

* **Release date:** July 28, 2023
* **Release version:** 5106
* **Issue number:** CI-8571
* **Feature flag:** `CI_CACHE_INTELLIGENCE`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)
* **Description:** You can enable [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) in the Pipeline Studio's Visual editor. Previously, you could only enable Cache Intelligence through the YAML editor. For more information, go to the [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) documentation. This enhancement only applies to Harness Cloud build infrastructure.

### Send status updates to Harness Manager directly by HTTP (Rolled back)

* **Release date:** July 12, 2023 (rollback)
* **Release version:** 5003 (rollback)
* **Issue number:** CI-8338 (rollback)
* **Feature flag:** `CI_LE_STATUS_REST_ENABLED`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)
* **Description:** This feature causes CI steps to send status updates to the [Harness Manager](/docs/get-started/harness-platform-architecture#harness-platform-components) directly by HTTP, rather than through a delegate.
* **Update (Version 5003, July 12, 2023):** This feature was rolled back to early access and disabled by default due to a discovered instability that caused the [CD Container step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/container-step) to fail. This feature flag is now disabled by default and must be re-enabled if your CI-to-Harness-Manager communications need to support client connections with additional certificates.

### Output variables automatically become environment variables

* **Release date:** June 19, 2023
* **Release version:** 4204
* **Issue number:** CI-7817, ZD-39203
* **Feature flag:** `CI_OUTPUT_VARIABLES_AS_ENV`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)
* **Description:** With this feature flag enabled, output variables from steps are automatically available as environment variables for other steps in the same Build (`CI`) stage. This means that, if you have a Build stage with three steps, an output variable produced from step one is automatically available as an environment variable for steps two and three.
   * In other steps in the same stage, you can refer to the output variable by its key without additional identification. For example, an output variable called `MY_VAR` can be referenced later as simply `$MY_VAR`. Without this feature flag enabled, you must use an [expression](/docs/platform/variables-and-expressions/runtime-inputs/#expressions) to reference where the variable originated, such as `<+steps.stepID.output.outputVariables.MY_VAR>`.
   * For more information on this feature, go to the documentation on [Output variables](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings#output-variables).

### Remote debugging

* **Release date:** May 23, 2023
* **Release version:** Platform version 79306
* **Issue number:** CI-8135, CI-8048
* **Feature flag:** `CI_REMOTE_DEBUG`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)
* **Description:** Harness CI now supports remote debugging. This feature was initially released in January 2023 and subsequently reverted for further development.

   Debug mode is available if all of the following conditions are met:

      * You have the feature flag `CI_REMOTE_DEBUG` enabled.
      * The build infrastructure uses a Linux-based OS.
      * The build fails at a **Run** step with a Bash or Shell script in a **Build** (`CI`) stage.
      * The build runs in Harness Cloud, on a virtual machine, or in Kubernetes.

   You can re-run builds in debug mode through the **Builds**, **Execution**, and **Execution History** pages of the Harness UI. For more information, go to the [debug mode](/docs/continuous-integration/troubleshoot-ci/debug-mode) documentation.

* **Update (CI Manager version 4204, June 19, 2023):** **Re-run in Debug Mode** now supports Python and PowerShell Core (`pwsh`). You can also now use debug mode for local runner build infrastructures. For more information, go to [Debug with SSH](/docs/continuous-integration/troubleshoot-ci/debug-mode).

## FF early access features

The following early access (beta) features are available for the Harness Feature Flags module.

### Beta version of an Apex SDK for Feature Flags

* **Release date:** October 20, 2022. This feature was released for early access in 2022. Early access features from past releases might have been promoted to GA since their original release.
* **Description:** We've released a beta version of an Apex SDK for Feature Flags. For more information and to access this SDK, see the [Apex SDK reference guide](/docs/feature-flags/ff-sdks/server-sdks/apex-sdk-reference/) and the [GitHub repository](https://github.com/harness/ff-apex-server-sdk).

<!-- ## IDP early access features

No early access (beta) features are available for Harness Internal Developer Portal. -->

## STO early access features

The following early access (beta) features are available for the Harness Security Testing Orchestration module.

### Version 1.69.3 (October 5, 2023)

#### UI enhancements for working with exemptions (STO-6078, STO-5056)

This release includes UI enhancements for working with exemptions. These features are behind the feature flag `STO_EXEMPTION_DETAILS`. Contact [Harness Support](mailto:support@harness.io) to enable these features.

- You can click on a row in the **Exemptions** table to view details for the issue associated with that exemption.

   ![](static/sto-click-row-to-view-exemptions.png)

- For best results in STO, you should [specify a baseline for every target](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines). To encourage this, the **Exemption Details** pane hides details for an issue if there is no baseline detected. To specify the baseline, select **Set in Targets**.

   ![](static/sto-exemption-details-no-baseline-selected.png)

### Version 1.64.1 (August 9, 2023)

#### Security Tests filters (STO-5056, STO-5212)

The **Security Tests** tab includes a set of pull-down menus so you can filter the issues lists by Target, Target Type, Step, Stage, and Scanner. This feature is behind the Feature Flag `STO_DROPDOWN_FILTERS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

![Click on a tile to filter issues by severity](./static/sto-pulldown-filters-sto-5212.png)

### Version 1.61.1 (July 12, 2023)

#### Use regex to define dynamic target baselines (STO-5896)

You can now define dynamic target baselines using regular expressions. Dynamic baselines more accurately reflect the current "root" element in the context of a real-world software development life cycle. Dynamic baselines also make it easier to track the introduction and remediation of specific vulnerabilities.

This feature is behind the Feature Flag `STO_BASELINE_REGEX`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

For more information about this feature, go to [Set up target baselines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/set-up-baselines).

### Version 1.60.0 (July 5, 2023)

#### Scanner templates for Burp integration (STO-5056)

The [Burp integration](/docs/security-testing-orchestration/sto-techref-category/burp-scanner-reference) now supports scanner templates, which make it much easier to set up a scan step.

This integration is behind the Feature Flag `STO_STEP_PALETTE_BURP_ENTERPRISE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

#### CodeQL integration (STO-5366)

You can scan your code repositories using [CodeQL](/docs/security-testing-orchestration/sto-techref-category/codeql-scanner-reference), an analysis engine used by developers to automate security checks, and by security researchers to perform variant analysis.

This integration is behind the Feature Flag `STO_STEP_PALETTE_CODEQL`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

#### Fossa integration (STO-5111)

You can scan container images and repositories using [Fossa](/docs/security-testing-orchestration/sto-techref-category/fossa-scanner-reference), a scanner that detects security vulnerabilities and other issues in open-source projects.

This integration is behind the Feature Flag `STO_STEP_PALETTE_FOSSA`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

#### Semgrep integration (STO-5886)

You can scan container images and repositories using [Semgrep](/docs/security-testing-orchestration/sto-techref-category/semgrep-scanner-reference), a scanner that detects security vulnerabilities and other issues in open-source projects.

This integration is behind the Feature Flag `STO_STEP_PALETTE_SEMGREP`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

### March 2, 2023

#### Improved UI for configuring scan steps (STO-4867)

This release includes a set of Security steps with an improved UI for configuring scans. Each step shows only the settings that apply to the specific scan. Note the following:

- This release includes new steps for the following scanners: Aqua Trivy, Bandit, Black Duck, Checkmarx, Grype, Mend, Prisma Cloud, Snyk, SonarQube, and ZAP.  
- Docker-in-Docker is no longer required for these steps *unless* you're scanning a container image. If you're scanning a repository or running instance, you don't need to set up a Background step running DinD.    
- These steps are currently available in Security stages only. 
- Support is currently limited to Kubernetes and Harness Cloud AMD64 build infrastructures only.
- For descriptions of all available UI settings, go to [Security step UI settings reference](/docs/security-testing-orchestration/sto-techref-category/security-step-ui-settings-reference).

![STO step palette](static/sto-step-palette.png)

#### STO Jira integration (STO-5467)

This release includes a Jira integration that enables you to create Jira tickets for issues detected during an STO build. For more information, go to [Create Jira tickets for detected issues](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/jira-integrations).

This integration is behind the Feature Flag `STO_JIRA_INTEGRATION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

## SRM early access features

The following early access (beta) features are available for the Harness Service Reliability Management module.

### Continuous Verification (CV) fails if the data for configured deployment strategy is not available (SRM-12731)

* **Release date:** December 13, 2022. This feature was released for early access in 2022. Early access features from past releases might have been promoted to GA since their original release.
* **Feature flag:** `SRM_LOG_HOST_SAMPLING_ENABLE`
* **How to enable:** Contact [Harness Support](mailto:support@harness.io)
* **Description:**  Harness was automatically applying an alternate deployment strategy even if the required data for the deployment configured in the Verify step was not available. Now, Harness does not automatically apply an alternate deployment strategy if the required data is not available. Instead, Harness fails the CV. Harness automatically applies an alternate deployment strategy only if you choose the Auto option in the Continuous Verification Type dropdown list when configuring the Verify step.

<!-- ## SSCA early access features

No early access (beta) features are available for the Harness Software Supply Chain Assurance module. -->

## Features promoted to GA

(Including this section requires us to know when features are GA'd. We don't always get notified in a timely manner.)

These features were released as early access (beta) features, and they have since been promoted to GA.

### CI features promoted to GA

#### Local runner build infrastructure

(Add GA date, GA version. Add "Early access" to release date and release version. Remove "how to enable".)

* **GA date:** Early 2023 <!-- ideally we would provide the exact date -->
* **GA version:** <!-- ideally we would provide a version -->
* **Early access release date:** October 7, 2022
* **Early access release version:** <!-- ideally this would be populated -->
* **Issue number:** CI-5680
* **Feature flag:** `CI_DOCKER_INFRASTRUCTURE`
* **Description:** This release includes a new Docker delegate that you can install directly on a host. For more information, go to [Set up a local runner build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure).

#### Local runner build infrastructure (info box version)

(Add info with GA version and date. Add "Early access" to release date and release version. Remove "How to enable".)

:::info

This feature was promoted to GA in version 12345 on DATE.

This feature was promoted to GA in early 2023.

:::

* **Early access release date:** October 7, 2022
* **Early access release version:** <!-- ideally this would be populated -->
* **Issue number:** CI-5680
* **Feature flag:** `CI_DOCKER_INFRASTRUCTURE`
* **Description:** This release includes a new Docker delegate that you can install directly on a host. For more information, go to [Set up a local runner build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure).

## 2022 early access features

These features were released for early access in 2022. Early access features from past releases might have been promoted to GA since their original release.

(Ideally we should move away from this unclear date-based structure for beta features. A feature should be clearly beta or GA. Once it is GA, we need to mark it as such on this list - as demonstrated in [Features promoted to GA](#features-promoted-to-ga). See FF and SDK for example of notation to use if you aren't sure if an old feature has been promoted to GA yet.)

<details>
<summary>Harness Platform</summary>

#### November 11, 2022

You can now create secrets using the Google Cloud Secret Manager in Harness. (PL-28978)

- For more information, see [Add a Google Cloud Secret Manager](/docs/platform/secrets/secrets-management/add-a-google-cloud-secret-manager/)

- You can now select modules and configure your own navigation in Harness. (SPG-153)

Also, Projects is a new option in the left navigation. Click Projects to view the project-specific overview, pipeline, connector, and other details.

#### November 6, 2022

You can now get optimized performance on remote pipelines by enabling the feature flag USE_GET_FILE_V2_GIT_CALL if you are on delegate version 772xx or higher. (PL-29459)

If you are on an older delegate version, you can upgrade your delegate for optimized performance.

#### October 7, 2022

- You can now create remote Templates in Harness and save it in your Git repo by enabling the feature flag NG_TEMPLATE_GITX. (PL-28573)

For more information, see [Create a remote step template](/docs/platform/Templates/create-a-remote-step-template), [Create a remote stage template](/docs/platform/Templates/create-a-remote-stage-template), and [Create a remote pipeline template](/docs/platform/Templates/create-a-remote-pipeline-template).

- You can now use expressions to reference pre-existing secrets in Vault using a fully-qualified path. (PL-28352)

For more information, see [HashiCorp Vault Secrets](/docs/platform/secrets/secrets-management/reference-existing-secret-manager-secrets#option-hashicorp-vault-secrets).

- Harness will now send email notification for user invites when the feature flag AUTO_ACCEPT_SAML_ACCOUNT_INVITES is enabled. (PL-26218, ZD-32152,35287)

Harness will not send any emails for user invites when the feature flag PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES is enabled.

#### September 7, 2022

You can now create a Harness Custom Secret Manager in Next Gen. (PL-25545)

You can onboard any secret manager with Harness and reference their secrets in Harness using a Shell Script.

This is behind the feature flag CUSTOM_SECRET_MANAGER_NG.

See [Add a custom secret manager](/docs/platform/secrets/secrets-management/custom-secret-manager).

#### July 7, 2022

Simplified Git Experience

Harness Git Experience lets you store configurations for your resources like Pipelines, Input Sets in Git. You can choose Git as the source of truth and use your Git credentials to access and modify your configurations.

With Harness Git Experience, you can select the repository and branch from where you want to execute your Pipelines, hence simplifying your Pipeline execution by seamless access to your Harness resources and their configurations stored in Git.

For more information, refer to [Harness Git Experience Overview](/docs/platform/git-experience/git-experience-overview/).

This functionality is behind a feature flag: NG_GIT_EXPERIENCE

</details>

<details>
<summary>Continuous Delivery</summary>

#### December 7, 2022

Nexus 3 is now supported for Azure Web App artifacts. (CDS-46372)

For more information, see [Azure Web Apps deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial)

This functionality is behind a feature flag: AZURE_WEB_APP_NG_NEXUS_PACKAGE.

#### November 29, 2022

Terraform Backend Configuration file path in the Terraform Apply step now supports remote file repos. (CDS-39012, ZD-37065)

Terraform Backend Configuration now can be specified in the remote file repository.

For more details, go to [Provision with the Terraform Apply Step](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/).

This functionality is behind a feature flag: TERRAFORM_REMOTE_BACKEND_CONFIG.

#### October 18, 2022

ECS Run Task support

In addition to deploying tasks as part of your standard ECS deployment, you can use the ECS Run Task step to run individual tasks separately as a step in your ECS stage. The ECS Run Task step is available in all ECS strategy types. An example of when you run a task separately is a one-time or periodic batch job that does not need to keep running or restart when it finishes.

This functionality is behind feature flags: NG_SVC_ENV_REDESIGN and ECS_NG

For more information, go to the [ECS tutorial's run task step](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/).

#### October 7, 2022

- ECS deployments: deploy artifacts to your Amazon Elastic Container Service (ECS) clusters using a Rolling, Canary, and Blue Green strategies.

Enable Feature Flags NG_SVC_ENV_REDESIGN and ECS_NG.

For more information, go to the [ECS deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/).

- Traditional deployments using SSH or WinRM: deploy your artifacts to hosts located in Microsoft Azure, AWS, or any platform-agnostic Physical Data Center (PDC).

These deployments are called Traditional because they use Secure Shell and PowerShell scripts and a traditional runtime environment as opposed to containers and orchestration mechanisms, like Kubernetes.

Enable Feature Flags NG_SVC_ENV_REDESIGN, SSH_NG, and PIPELINE_MATRIX.

For more information, go to [Secure Shell (SSH) deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng) and [WinRM deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial).

- Custom deployments using Deployment templates: In some cases, you might be using a platform that does not have first class support in Harness, such as OpenStack, WebLogic, WebSphere, Google Cloud functions, etc. We call these non-native deployments. For non-native deployments, Harness provides a custom deployment option using Deployment Templates.

Enable Feature Flags NG_SVC_ENV_REDESIGN and NG_DEPLOYMENT_TEMPLATE.

For more information, go to the [Custom deployments using deployment templates tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial).

</details>
