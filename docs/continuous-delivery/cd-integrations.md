---
title: What's supported
description: Supported CD features and integrations. 
sidebar_position: 1
---

This topic lists the supported CD features and integrations you can use in Harness for deploying and verifying your apps.

For a comprehensive list that includes all Harness modules, go to [Supported platforms and technologies](/docs/get-started/supported-platforms-and-technologies).

import PartialExample from '/docs/continuous-delivery/shared/cd-integrations-supported.md';

<PartialExample name="integrations" />

## Active CD Feature flags

Some Harness CD features are released behind feature flags to get feedback from specific customers before releasing the features to the general audience.

The following table describes each of the active feature flags relevant to Harness CD.

:::note

To enable a feature flag in your Harness account, contact [Harness Support](mailto:support@harness.io). For status of the feature flag, please see: [Beta, GA, Public Preview Feature Categorization](https://developer.harness.io/docs/get-started/beta-preview-ga/)

:::

<table width="900" cellspacing="0" cellpadding="0">
    <tr>
        <td width="300" word-wrap="break-word"><b>Flag</b></td>
        <td width="600"><b>Description</b></td>
    </tr>
    <tr>
        <td>PIE_EXPRESSION_CONCATENATION</td>
        <td>Removes the need to use &quot;,+,&quot; for strings in expression settings.</td>
    </tr>
    <tr>
        <td>CDS_HELM_STEADY_STATE_CHECK_1_16</td>
        <td>Allow users leveraging Kubernetes version 1.16 or later to perform steady state check for Helm deployments. This feature is in Public Preview.</td>
    </tr>
    <tr>
        <td>OPA_PIPELINE_GOVERNANCE</td>
        <td>Enables <a href="/docs/platform/governance/policy-as-code/harness-governance-overview">Policy as Code</a> for a Harness account.This feature is GA.</td>
    </tr>
    <tr>
        <td>CDS_HELM_VERSION_3_8_0</td>
        <td>Sets the default version of Helm to 3.8 when using the Harness Helm delegate. This feature in in Public Preview. </td>
    </tr>
    <tr>
        <td>NG_PIPELINE_TEMPLATE</td>
        <td>Enables <a href="https://developer.harness.io/tutorials/cd-pipelines/templates">Harness templates. This feature is GA. </a>.</td>
    </tr>
    <tr>
        <td>OPA_GIT_GOVERNANCE</td>
        <td>Store and fetch your <a href="/docs/platform/governance/policy-as-code/configure-gitexperience-for-opa">OPA policies in Git. This feature is GA. </a>.</td>
    </tr>
    <tr>
        <td>NG_SVC_ENV_REDESIGN</td>
        <td>Enables <a href="/docs/continuous-delivery/get-started/services-and-environments-overview">Service and Environment V2. This feature is GA. </a>
. V1 is <a href="/docs/continuous-delivery/get-started/upgrading/upgrade-cd-v2">deprecated</a>
.</td>
    </tr>
    <tr>
        <td>NG_EXECUTION_INPUT</td>
        <td>Users can <a href="/docs/platform/variables-and-expressions/runtime-inputs/#supply-runtime-input-during-execution">provide inputs at pipeline execution.This feature is in Public Preview.</a>.</td>
    </tr>
    <tr>
        <td>NG_CUSTOM_STAGE</td>
        <td>Enables the <a href="/docs/platform/pipelines/add-a-stage/#add-a-custom-stage">Custom stage. This feature is GA.</a>
 for use in a pipeline.</td>
    </tr>
    <tr>
        <td>NG_GIT_EXPERIENCE</td>
        <td>Enables <a href="/docs/platform/git-experience/configure-git-experience-for-harness-entities">Harness Git Experience</a> for a Harness account. Users can manage their Pipeline, Templates, Input Sets, Feature Flags via Git. This feature is GA.</td>
    </tr>
    <tr>
        <td>PIPELINE_QUEUE_STEP</td>
        <td>Enables the <a href="/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/control-resource-usage-with-queue-steps">Pipeline Queue</a> 
 step for an account This feature is in Public Preview.</td>
    </tr>
    <tr>
        <td>CDP_USE_OLD_GIT_SYNC</td>
        <td>Enables the previous, deprecated version of Git Experience. This flag is only enabled for customers who have not migrated over to <a href="/docs/platform/git-experience/configure-git-experience-for-harness-entities">Harness Git Experience</a>.</td>
    </tr>
    <tr>
        <td>CDS_DISABLE_HELM_REPO_YAML_CACHE</td>
        <td>Disables Helm repository caching on the Harness delegate. This should only be enabled if users are experiencing failures with Harness Delegate failing to fetch Helm Charts. Caching could be the source of the issue. This Feature is in Beta. </td>
    </tr>
    <tr>
        <td>CDS_MULTI_SERVICE_INFRA</td>
        <td>Enables the <a href="/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv">multi-service and multi-environment deployment</a> feature. This feature is GA.</td>
    </tr>
    <tr>
        <td>PIPELINE_ROLLBACK</td>
        <td>Enables <a href="/docs/continuous-delivery/manage-deployments/rollback-deployments">Post deployment rollback.</a> This feature is in public preview.
.</td>
    </tr>
    <tr>
        <td>CDS_ARTIFACT_SOURCE_TEMPLATE</td>
        <td>Enables <a href="/docs/continuous-delivery/x-platform-cd-features/templates/artifact-source-template">artifact source templates</a> This feature is GA.
.</td>
    </tr>
    <tr>
        <td>CD_GIT_WEBHOOK_POLLING</td>
        <td>Enables configurable polling for <a href="/docs/platform/triggers/triggering-pipelines/">GitHub Webhooks</a> This allows users to set polling interval for Harness Delegate to poll your GitHub instance. This feature is in Public Preview.
.</td>
    </tr>
    <tr>
        <td>CDS_DISABLE_WINRM_COMMAND_ENCODING_NG</td>
        <td>Prevents the encoding of WinRM commands. By default Harness encodes the winrm commands we run on hosts. User's can disable this behavior via this feature flag. This feature flag is in Public Preview.</td>
    </tr>
    <tr>
        <td>CDS_TERRAFORM_S3_SUPPORT</td>
        <td>Enables AWS S3 for Terraform plan storage. This feature flag is GA. </td>
    </tr>
    <tr>
        <td>PIE_PIPELINE_SETTINGS_ENFORCEMENT_LIMIT</td>
        <td>Enables pipeline settings and limits in project <b>Default Settings</b>. This feature lets you set certain pipeline settings and limits for all pipelines in a project. This feature is in Public Preview.</td>
    </tr>
    <tr>
        <td>CDP_USE_K8S_DECLARATIVE_ROLLBACK</td>
        <td>Enables the <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/#declarative-rollback">declarative rollback</a> behavior for services. This feature is in Beta. </td>
    </tr>
    <tr>
        <td>CDC_SERVICE_DASHBOARD_REVAMP_NG</td>
        <td>Provides new <a href="/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments/#individual-service-dashboards">dashboard views for services and environments</a> This feature is in Public Preview.
.</td>
    </tr>
    <tr>
        <td>CDS_TERRAFORM_CLOUD</td>
        <td>Enables <a href="/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-cloud-deployments">Terraform Cloud support in Harness</a> This feature is in Public Preview.
.</td>
    </tr>
    <tr>
        <td>CDS_BAMBOO_ARTIFACT_NG</td>
        <td>Enables the <a href="/docs/continuous-delivery/x-platform-cd-features/cd-steps/builds/run-bamboo-plans-in-cd">Bamboo Build step. This feature is Public Preview.</a>
.</td>
    </tr>
    <tr>
        <td>CDS_K8S_SOCKET_CAPABILITY_CHECK_NG</td>
        <td>Replaces the HTTP capability check for the Kubernetes connector with socket capability. This feature is in Beta</td>
    </tr>
    <tr>
        <td>PIE_GET_FILE_CONTENT_ONLY</td>
        <td>Optimizes the execution flow to fetch only file content for remote entities.</td>
    </tr>
    <tr>
        <td>CDS_SERVICE_CONFIG_LAST_STEP</td>
        <td>Allows users on the last step of manifest/artifact/config files, if these configs are in edit mode. This feature is in Public Preview</td>
    </tr>
    <tr>
        <td>PIE_USE_SECRET_FUNCTOR_WITH_RBAC</td>
        <td>Performs RBAC check on secrets when used in pipeline execution. This feature is in Beta</td>
    </tr>
    <tr>
        <td>CDS_TERRAGRUNT_PROVISION_NG</td>
        <td>Enables <a href="/docs/continuous-delivery/cd-infrastructure/terragrunt-howtos">Terragrunt provisioning steps</a> This feature is in Public Preview.
.</td>
    </tr>
    <tr>
        <td>CDS_RANCHER_SUPPORT_NG</td>
        <td>Enables the <a href="/docs/first-gen/firstgen-platform/account/manage-connectors/add-rancher-cloud-providers">Rancher connector</a> for Kubernetes deployments. This feature is Public Preview.</td>
    </tr>
    <tr>
        <td>CDS_SERVICENOW_TICKET_TYPE_V2</td>
        <td>Enables ServiceNow custom table support.</td>
    </tr>
    <tr>
        <td>CDS_NG_TRIGGER_AUTHENTICATION
        _WITH_DELEGATE_SELECTOR</td>
        <td>Forces trigger authentication use the same delegate selectors as the secrets manager.</td>
    </tr>
    <tr>
        <td>CDS_GIT_CONFIG_FILES</td>
        <td>Enables config files to be <a href="/docs/continuous-delivery/x-platform-cd-features/services/cd-services-config-files">managed in Git</a>
.</td>
    </tr>
    <tr>
        <td>CDS_USE_OLD_SERVICE_V1</td>
        <td>Keeps Harness accounts on Service V1. This feature flag is only for customers who have yet to migrate to V2.</td>
    </tr>
    <tr>
        <td>CDS_REMOVE_COMMENTS_FROM_VALUES_YAML</td>
        <td>Disables the resolving of comments in values.yaml files.</td>
    </tr>
    <tr>
        <td>CDS_NG_TRIGGER_SELECTIVE_STAGE_EXECUTION</td>
        <td>Lets you select specific pipeline stages for a trigger.</td>
    </tr>
    <tr>
        <td>CDS_BG_STAGE_SCALE_DOWN_STEP_NG</td>
        <td>Enables the <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment/#add-the-execution-steps">Blue Green Scale Down step</a> Kubernetes blue green deployments.This feature is Public Preview </td>
    </tr>
    <tr>
        <td>CDS_POST_PROD_ROLLBACK</td>
        <td>Enables <a href="/docs/continuous-delivery/manage-deployments/rollback-deployments">post deployment rollback</a> This feature is in Public Preview
.</td>
    </tr>
    <tr>
        <td>CDS_NEXUS_GROUPID_ARTIFACTID_DROPDOWN</td>
        <td>Adds <b>Group Id</b> and <b>Artifact Id</b> options in Nexus artifact source details. This feature is in Beta.</td>
    </tr>
    <tr>
        <td>NG_EXPRESSIONS_NEW_INPUT_ELEMENT</td>
        <td>Suggests probable expressions when selecting <b>Expression</b> for a setting using autocomplete.</td>
    </tr>
    <tr>
        <td>PIE_GITX_OAUTH</td>
        <td>Uses users' OAuth credentials to fetch and commit in Git. This feature is in Public Preview</td>
    </tr>
    <tr>
        <td>PIE_MULTISELECT_AND_COMMA_IN_ALLOWED_VALUES</td>
        <td>Enables the ability to <a href="/docs/platform/variables-and-expressions/runtime-inputs/#multiple-selection">choose multiple values from a list of allowed values</a>
.</td>
    </tr>
    <tr>
        <td>CDS_K8S_SERVICE_HOOKS_NG</td>
        <td>Enables the Kubernetes and Helm service hooks feature. Service hooks extend the Helm Chart and Kubernetes service <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#service-hooks">pre-deployment actions</a>
. </td>
    </tr>
    <tr>
        <td>CDS_NG_TRIGGER_MULTI_ARTIFACTS</td>
        <td>Allows creation of multi-region artifact triggers.</td>
    </tr>
    <tr>
        <td>CDS_AUTO_APPROVAL</td>
        <td>Support for scheduled approval configuration to let the Approval occur after a time window.</td>
    </tr>
    <tr>
        <td>GITOPS_IAM</td>
        <td>Enables users to create <a href="/docs/continuous-delivery/gitops/use-gitops/create-cluster-with-iam">GitOps clusters with an IAM role</a> and have Harness hook into that cluster for orchestration. This feature is in Public Preview </td>
    </tr>
    <tr>
        <td>CDS_OPA_TEMPLATE_GOVERNANCE</td>
        <td>Enables <a href="/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview/#template">OPA with templates</a>. This feature is in Public Preview</td>
    </tr>
    <tr>
        <td>CDS_ARTIFACTS_PRIMARY_IDENTIFIER</td>
        <td>Allows you to change the expression value for the primary artifact identifier. This feature is in Beta.</td>
    </tr>
    <tr>
        <td>CDS_TRIGGER_ACTIVITY_PAGE</td>
        <td>Enables the <a href="/docs/platform/triggers/troubleshoot-registered-triggers">Trigger Activity page</a> This feature is in Beta
.</td>
    </tr>
    <tr>
        <td>CDS_SUPPORT_HPA_AND_PDB_NG</td>
        <td>Enables <p><a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes/#managed-workloads-table">PDB and HPA tracking</a></p> as managed resources by Harness.This feature is in Public Preview.</td>
    </tr>
    <tr>
        <td>GITOPS_ORG_LEVEL</td>
        <td>Enables the GitOps agent to be configured at a Harness Organization level. This feature is in Public Preview.</td>
    </tr>
    <tr>
        <td>CDS_SSH_SSHJ</td>
        <td>Enables a library upgrade for SSH Deployments to use newer algorithms of SSH to connect to hosts. This feature is GA. All Delegates on 803xx Release will have the new upgraded library.</td>
    </tr>
    <tr>
        <td>CDS_SSH_CLIENT</td>
        <td>Enables a library upgrade for SSH Deployments  to use newer algorithms of SSH to connect to hosts. This feature is GA. All Delegates on 803xx Release will have the new upgraded library. </td>
    </tr>
    <tr>
        <td>CD_TRIGGER_CATALOG_API_ENABLED</td>
        <td>Fetches the list of Trigger options by an API call instead of from the UI.</td>
    </tr>
    <tr>
        <td>CDS_SERVICE_OVERRIDES_2_0</td>
        <td>Enables <a href="/docs/continuous-delivery/x-platform-cd-features/overrides-v2">overrides v2 experience</a> This feature is in Beta
.</td>
    </tr>
    <tr>
        <td>CDS_TEMPLATE_ERROR_HANDLING</td>
        <td>Adds enhanced error handling for templates by schema validation errors. This feature is in Public Preview.</td>
    </tr>
    <tr>
        <td>CDS_CONTAINER_STEP_GROUP</td>
        <td>Enables the <a href="/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups">container-based steps</a> for a CD stage. This feature is in public preview.</td>
    </tr>
    <tr>
        <td>CDS_HELM_STEADY_STATE_CHECK_1_16_V2_NG</td>
        <td>Enables steady state check for Helm deployments on Kubernetes clusters using 1.16 or higher. This feature is in beta. </td>
    </tr>
    <tr>
        <td>CDS_AZURE_WEBAPP_LISTING_APP_NAMES_AND_SLOTS</td>
        <td>Enables users to select Azure WebApps in a drop down for slot deployments. This feature is in Public Preview.</td>
    </tr>
    <tr>
        <td>CD_AI_ENHANCED_REMEDIATIONS</td>
        <td>Enables AIDA for CD steps to provide error handling support for CD AIDA.</td>
    </tr>
    <tr>
        <td>CDP_AWS_SAM</td>
        <td>Enables <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-sam-deployments">AWS SAM deployments</a> This feature is in Public Preview
.</td>
    </tr>
    <tr>
        <td>PIE_WEBHOOK_NOTIFICATION</td>
        <td>Enables Webhooks as a notification option. This feature is in Beta</td>
    </tr>
    <tr>
        <td>CDS_RESOLVE_OBJECTS_VIA_JSON_SELECT</td>
        <td>Support resolution of objects via the JSON Select Command in the HTTP step. This feature is in Beta.</td>
    </tr>
    <tr>
        <td>CDS_SUPPORT_SKIPPING_BG_DEPLOYMENT_NG</td>
        <td>Enables <b>Skip Unchanged Manifest</b> option in Kubernetes Blue Green Deploy step.this feature is in Public Preview</td>
    </tr>
    <tr>
        <td>CDS_AZURE_WEBAPP_NG_LISTING_APP_NAMES_AND_SLOTS</td>
        <td>Enables the <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial">fetching and listing of WebApp names and slots</a> This feature is in Public Preview.
.</td>
    </tr>
    <tr>
        <td>CDS_SERVERLESS_V2</td>
        <td>Enables *building* and packaging serverless packages in Harness CD. For Serverless deployments, this feature spins up an environment for the Serverless package, validates the Serverless CloudFormation template, and then performs a Serverless deploy, all in the ephemeral environment. This feature is in Public Preview. </td>
    </tr>
    <tr>
        <td>CDS_SUPPORT_EXPRESSION_REMOTE
        _TERRAFORM_VAR_FILES_NG</td>
        <td>Enables Harness expressions in remote Terraform var files. This feature is in Beta. </td>
    </tr>
    <tr>
        <td>CDS_ENABLE_LOAD_FROM_CACHE_FOR_RETRY_FORM</td>
        <td>Enables a load from cache option on pipeline execution retry form. This feature is in Beta. </td>
    </tr>
    <tr>
        <td>CDS_GITHUB_APP_AUTHENTICATION</td>
        <td>Enables Github App authentication for users to fetch files and perform <a href="/docs/platform/connectors/code-repositories/git-hub-app-support">Harness Git Experience operations</a> This feature is in Public Preview
.</td>
    </tr>
    <tr>
        <td>CDS_ENV_PROPAGATION</td>
        <td>Enables environment propagation across CD stages. This feature is in Public Preview.</td>
    </tr>
    <tr>
        <td>CDS_GITHUB_PACKAGES</td>
        <td>Support for <a href="/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources">GitHub Packages as an artifact source</a> This feature is in Public Preview.
.</td>
    </tr>
    <tr>
        <td>CDS_HELM_SEND_TASK_PROGRESS_NG</td>
        <td>For Helm tasks, this enables the sending of task progress events via log streaming. This feature is in Beta.</td>
    </tr>
    <tr>
        <td>CDS_RECONFIGURE_JIRA_APPROVAL_TIMEOUT</td>
        <td>Reduces timeout for Jira from 5 minutes to 1 minute and allows pausing of approval. This feature is in Beta.</td>
    </tr>
    <tr>
        <td>CDS_HELM_MULTIPLE_MANIFEST_SUPPORT_NG</td>
        <td>Enables users to configure <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#using-multiple-helm-charts-in-one-harness-service">multiple Helm charts in a Harness service</a>
, treating the Helm Charts similar to artifacts. This feature is in Public Preview.</td>
    </tr>
    <tr>
        <td>CDS_HELM_FETCH_CHART_METADATA_NG</td>
        <td>Exposes <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts">Helm Chart expressions</a> for reference in other steps and settings. This feature is in Public Preview.</td>
    </tr>
    <tr>
        <td>PIE_EXPRESSION_PLAYGROUND</td>
        <td>Helps the user experiment with expressions to see what could be the expected/resolved value without running the pipeline. This feature is in Public Preview.</td>
    </tr>
    <tr>
        <td>CDS_NG_SERVICE_PRINCIPAL_FOR_CUSTOM_WEBHOOK</td>
        <td>Makes authenticated custom Webhook calls use the service principal instead of the principal inherited from the API key. This feature is in Beta.</td>
    </tr>
    <tr>
        <td>PIE_RETRY_STEP_GROUP</td>
        <td>Retries failed step group with default post-retry action set to <b>Mark as Failure</b>. This feature is in Public Preview.</td>
    </tr>
    <tr>
        <td>CDS_MERGED_RUN_AND_RETRY_PIPELINE_COMPONENT</td>
        <td>Enables the <b>Run Pipeline</b> form to be used for <b>Retry From (Failed) Stage</b>.</td>
    </tr>
    <tr>
        <td>CD_MAKE_CD_LICENSE_USAGE_ASYNC</td>
        <td>Enables CD License Usage dashboards to be asynchronous. This feature is in Beta. </td>
    </tr>
    <tr>
        <td>CDS_ENABLE_SHELL_SCRIPT_FILE_REFERENCE</td>
        <td>Enables the Shell Script step to support scripts from Harness File Store. This feature is in Beta. </td>
    </tr>
    <tr>
        <td>GITOPS_FLUX_FLAMINGO</td>
        <td>Enables the creation of Flux Agents in Harness GitOps. This feature is in Beta. </td>
    </tr>
    <tr>
        <td>CDS_ECS_BG_GREEN_SERVICE_ROLLBACK</td>
        <td>Enables the rollback of `green` service in ECS blue green deployments. This feature is in Beta. </td>
    </tr>
    <tr>
        <td>CDS_DISABLE_EVALUATE_EXPORT_VARIABLES</td>
        <td>Enables exporting variables without evaluating them in the Command step. This feature is in Beta.</td>
    </tr>
    <tr>
        <td>CDS_TERRAGRUNT_CLI_OPTIONS_NG</td>
        <td>Enables CLI options for Terragrunt steps. This feature is in Public Preview. </td>
    </tr>
    <tr>
        <td>CD_CONTAINER_STEP_DELEGATE_SELECTOR</td>
        <td>Makes the Container step to respect the delegate selector configured at the pipeline. This feature is in Beta.</td>
    </tr>
    <tr>
        <td>CDS_AWS_CDK</td>
        <td>Enables <a href="/docs/continuous-delivery/cd-infrastructure/aws-cdk">AWS CDK support</a>. This feature is in Public Preview.
.</td>
    </tr>
    <tr>
        <td>CDS_REMOVE_TIME_BUCKET_GAPFILL_QUERY</td>
        <td>Removes the usage of time bucket gapfill from CD. This feature is in Beta. </td>
    </tr>
    <tr>
        <td>GITOPS_UPDATE_APP_STEP</td>
        <td>Enables the GitOps pipeline Update GitOps App step. This feature is in Public Preview.</td>
    </tr>
    <tr>
        <td>CDS_MULTI_SERVICE_PROPAGATION</td>
        <td>Enables multi-service propagation for CD. This feature is in Beta. </td>
    </tr>
    <tr>
        <td>CDS_TERRAGRUNT_USE_UNIQUE
        _DIRECTORY_BASE_DIR_NG</td>
        <td>Enables a unique directory to support Terragrunt run-in-parallel. This feature is in Beta. </td>
    </tr>
    <tr>
        <td>OPA_AIDA_WIDGET</td>
        <td>Enables <a href="/docs/platform/governance/policy-as-code/aida-for-policies">AIDA for OPA</a> This feature is in Beta. 
.</td>
    </tr>
    <tr>
        <td>CDS_JIRA_APPROVAL_OPTIMIZATION</td>
        <td>Optimize Jira Approval stage/step to only fetch relevant fields. This feature is in Beta. </td>
    </tr>
    <tr>
        <td>CDS_JIRA_UPDATE_SELECT_FIELDS_ENABLED</td>
        <td>Enable Jira <b>Select Fields</b> setting for Jira Update step using project and issue type. This feature is in</td>
    </tr>
    <tr>
        <td>CDS_NG_UPDATE_MULTIPLE_SNOW_CHANGE_REQUEST</td>
        <td>Enable the option to update multiple tasks in ServiceNow.</td>
    </tr>
    <tr>
        <td>CDS_WEBAPP_ENABLE_CLEAN_OPTION</td>
        <td>Cleans the <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial">Azure WebApp target directory</a> prior to deployment.</td>
    </tr>
    <tr>
        <td>PIE_SIMPLIFY_LOG_BASE_KEY</td>
        <td>Reduces the length of the log base key.</td>
    </tr>
    <tr>
        <td>CDS_SHELL_VARIABLES_EXPORT</td>
        <td>Export variables in a shell script to either the step group, stage, or pipeline scope. The variable will be accessible using the scope of the variable. For example: <pre>functor.pipeline.&lt;exported_variable&gt;</pre> Exported variables are immutable.</td>
    </tr>
    <tr>
        <td>GITOPS_GITHUB_RESTRAINT_FOR_STEPS</td>
        <td>Throttles GitHub API calls to prevent breach of secondary rate limit. This is use for addressing a Github rate limit issue that users were facing when using multiple GitOps steps in parallel. It adds a default queuing for those steps so only one step executes at a time. This is only applicable for Update Release Repo, Merge PR, and Revert PR steps.</td>
    </tr>
    <tr>
        <td>PIE_ASYNC_FILTER_CREATION</td>
        <td>Sets pipeline CRUD calls to filter creation asynchronously. </td>
    </tr>
    <tr>
        <td>CDS_ASG_V2</td>
        <td>Enables support for <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg-tutorial">ASG features</a> like user data, instances, multiple load balancers, and base ASG.</td>
    </tr>
    <tr>
        <td>CDS_OCI_HELM_ECR_CONFIG_SUPPORT_NG</td>
        <td>Support for ECR as an OCI Helm repo but with temporary credentials.</td>
    </tr>
    <tr>
        <td>CDS_NG_BARRIER_STEPS_WITHIN_LOOPING_STRATEGIES</td>
        <td>Support Barrier steps within looping strategies.</td>
    </tr>
    <tr>
        <td>CDS_TF_TG_SKIP_ERROR_LOGS_COLORING</td>
        <td>Disable the coloring of execution logs that are coming form standart error output of process executor for Terraform and Terragrunt steps.</td>
    </tr>
</table>
