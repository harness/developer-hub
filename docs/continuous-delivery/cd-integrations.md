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

To enable a feature flag in your Harness account, contact [Harness Support](mailto:support@harness.io). For the status of a feature flag, please note [Beta, GA, Limited GA Feature Categorization](/docs/get-started/release-status/) in the descriptions below.

:::

<table width="900" cellspacing="0" cellpadding="0">
    <tr>
        <td width="300" word-wrap="break-word"><b>Flag</b></td>
        <td width="600"><b>Description</b></td>
    </tr>
    <tr>
        <td>CDS_ASG_SHIFT_TRAFFIC_STEP_NG</td>
        <td>Enables incremental traffic shifting for ASG blue green deployments.</td>
    </tr>
    <tr>
        <td>CDS_HELM_STEADY_STATE_CHECK_1_16</td>
        <td>Allow users leveraging Kubernetes version 1.16 or later to perform steady state check for Helm deployments. <b>This feature is in Limited GA.</b></td>
    </tr>
    <tr>
        <td>OPA_PIPELINE_GOVERNANCE</td>
        <td>Enables <a href="/docs/platform/governance/policy-as-code/harness-governance-overview">Policy as Code</a> for a Harness account.<b>This feature is GA.</b></td>
    </tr>
    <tr>
        <td>CDS_HELM_VERSION_3_8_0</td>
        <td>Sets the default version of Helm to 3.8 when using the Harness Helm delegate. This feature in in Limited GA. </td>
    </tr>
    <tr>
        <td>NG_PIPELINE_TEMPLATE</td>
        <td>Enables <a href="https://developer.harness.io/tutorials/cd-pipelines/templates">Harness templates.</a>. <b>This feature is Limited GA.</b> </td>
    </tr>
    <tr>
        <td>OPA_GIT_GOVERNANCE</td>
        <td>Store and fetch your <a href="/docs/platform/governance/policy-as-code/configure-gitexperience-for-opa">OPA policies in Git.</a>. <b>This feature is Limited GA.</b> </td>
    </tr>
    <tr>
        <td>NG_CUSTOM_STAGE</td>
        <td>Enables the <a href="/docs/platform/pipelines/add-a-stage/#add-a-custom-stage">Custom stage</a>
 for use in a pipeline. <b>This feature is GA.</b></td>
    </tr>
    <tr>
        <td>NG_GIT_EXPERIENCE</td>
        <td>Enables <a href="/docs/platform/git-experience/configure-git-experience-for-harness-entities">Harness Git Experience</a> for a Harness account. Users can manage their Pipeline, Templates, Input Sets, Feature Flags via Git. <b>This feature is GA.</b></td>
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
        <td>CD_GIT_WEBHOOK_POLLING</td>
        <td>Enables configurable polling for <a href="/docs/platform/triggers/triggering-pipelines/">GitHub Webhooks</a> This allows users to set polling interval for Harness Delegate to poll your GitHub instance. <b>This feature is in Limited GA.</b></td>
    </tr>
    <tr>
        <td>CDS_DISABLE_WINRM_COMMAND_ENCODING_NG</td>
        <td>Prevents the encoding of WinRM commands. By default Harness encodes the winrm commands we run on hosts. User's can disable this behavior via this feature flag. <b>This feature is in Limited GA.</b></td>
    </tr>
    <tr>
        <td>CDS_TERRAFORM_S3_SUPPORT</td>
        <td>Enables AWS S3 for Terraform plan storage. <b>This feature flag is Limited GA.</b> </td>
    </tr>
    <tr>
        <td>CDP_USE_K8S_DECLARATIVE_ROLLBACK</td>
        <td>Enables the <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/#declarative-rollback">declarative rollback</a> behavior for services. <b>This feature is in Beta.</b> </td>
    </tr>
    <tr>
        <td>CDC_SERVICE_DASHBOARD_REVAMP_NG</td>
        <td>Provides new <a href="/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments/#individual-service-dashboards">dashboard views for services and environments</a> <b>This feature is in Limited GA.</b></td>
    </tr>
    <tr>
        <td>CDS_K8S_SOCKET_CAPABILITY_CHECK_NG</td>
        <td>Replaces the HTTP capability check for the Kubernetes connector with socket capability. <b>This feature is in Beta.</b></td>
    </tr>
    <tr>
        <td>PIE_GET_FILE_CONTENT_ONLY</td>
        <td>Optimizes the execution flow to fetch only file content for remote entities.</td>
    </tr>
    <tr>
        <td>CDS_SERVICE_CONFIG_LAST_STEP</td>
        <td>Allows users on the last step of manifest/artifact/config files, if these configs are in edit mode. <b>This feature is in Limited GA.</b></td>
    </tr>
    <tr>
        <td>PIE_USE_SECRET_FUNCTOR_WITH_RBAC</td>
        <td>Performs RBAC check on secrets when used in pipeline execution. <b>This feature is in Beta.</b></td>
    </tr>
    <tr>
        <td>CDS_GIT_CONFIG_FILES</td>
        <td>Enables config files to be <a href="/docs/continuous-delivery/x-platform-cd-features/services/cd-services-config-files">managed in Git</a>
.</td>
    </tr>
    <tr>
        <td>PIE_GITX_OAUTH</td>
        <td>Uses users' OAuth credentials to fetch and commit in Git. <b>This feature is in Limited GA.</b></td>
    </tr>
    <tr>
        <td>PIE_MULTISELECT_AND_COMMA_IN_ALLOWED_VALUES</td>
        <td>Enables the ability to <a href="/docs/platform/variables-and-expressions/runtime-inputs/#multiple-selection">choose multiple values from a list of allowed values</a>
.</td>
    </tr>
    <tr>
        <td>CDS_AUTO_APPROVAL</td>
        <td>Support for scheduled approval configuration to let the Approval occur after a time window.</td>
    </tr>
    <tr>
        <td>CDS_ARTIFACTS_PRIMARY_IDENTIFIER</td>
        <td>Allows you to change the expression value for the primary artifact identifier. <b>This feature is in Beta.</b></td>
    </tr>
    <tr>
        <td>CDS_SUPPORT_HPA_AND_PDB_NG</td>
        <td>Enables <p><a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes/#managed-workloads-table">PDB and HPA tracking</a></p> as managed resources by Harness.<b>This feature is in Limited GA.</b></td>
    </tr>
    <tr>
        <td>CDS_SSH_SSHJ</td>
        <td>Enables a library upgrade for SSH Deployments to use newer algorithms of SSH to connect to hosts. All Delegates on 803xx Release will have the new upgraded library. <b>This feature is Limited GA.</b></td>
    </tr>
    <tr>
        <td>CDS_SSH_CLIENT</td>
        <td>Enables a library upgrade for SSH Deployments  to use newer algorithms of SSH to connect to hosts. All Delegates on 803xx Release will have the new upgraded library. <b>This feature is Limited GA</b> </td>
    </tr>
    <tr>
        <td>CD_TRIGGER_CATALOG_API_ENABLED</td>
        <td>Fetches the list of Trigger options by an API call instead of from the UI.</td>
    </tr>
    <tr>
        <td>CDS_SERVICE_OVERRIDES_2_0</td>
        <td>Enables <a href="/docs/continuous-delivery/x-platform-cd-features/overrides-v2">overrides v2 experience</a>. <b>This feature is in Beta
.</b></td>
    </tr>
    <tr>
        <td>CDS_TEMPLATE_ERROR_HANDLING</td>
        <td>Adds enhanced error handling for templates by schema validation errors. <b>This feature is in Limited GA.</b></td>
    </tr>
    <tr>
        <td>CDS_HELM_STEADY_STATE_CHECK_1_16_V2_NG</td>
        <td>Enables steady state check for Helm deployments on Kubernetes clusters using 1.16 or higher. <b>This feature is in Beta.</b> </td>
    </tr>
    <tr>
        <td>CDS_AZURE_WEBAPP_LISTING_APP_NAMES_AND_SLOTS</td>
        <td>Enables users to select Azure WebApps in a drop down for slot deployments. <b>This feature is in Limited GA.</b></td>
    </tr>
    <tr>
        <td>CDS_RESOLVE_OBJECTS_VIA_JSON_SELECT</td>
        <td>Support resolution of objects via the JSON Select Command in the HTTP step. <b>This feature is in Beta.</b></td>
    </tr>
    <tr>
        <td>CDS_SUPPORT_EXPRESSION_REMOTE
        _TERRAFORM_VAR_FILES_NG</td>
        <td>Enables Harness expressions in remote Terraform var files. <b>This feature is in Beta.</b> </td>
    </tr>
    <tr>
        <td>CDS_ENABLE_LOAD_FROM_CACHE_FOR_RETRY_FORM</td>
        <td>Enables a load from cache option on pipeline execution retry form. <b>This feature is in Beta.</b> </td>
    </tr>
    <tr>
        <td>CDS_ENV_PROPAGATION</td>
        <td>Enables environment propagation across CD stages. <b>This feature is in Limited GA.</b></td>
    </tr>
    <tr>
        <td>CDS_RECONFIGURE_JIRA_APPROVAL_TIMEOUT</td>
        <td>Reduces timeout for Jira from 5 minutes to 1 minute and allows pausing of approval. <b>This feature is in Beta.</b></td>
    </tr>
    <tr>
        <td>CDS_NG_SERVICE_PRINCIPAL_FOR_CUSTOM_WEBHOOK</td>
        <td>Makes authenticated custom Webhook calls use the service principal instead of the principal inherited from the API key. <b>This feature is in Beta.</b></td>
    </tr>
    <tr>
        <td>CD_MAKE_CD_LICENSE_USAGE_ASYNC</td>
        <td>Enables CD License Usage dashboards to be asynchronous. <b>This feature is in Beta.</b> </td>
    </tr>
    <tr>
        <td>CDS_ENABLE_SHELL_SCRIPT_FILE_REFERENCE</td>
        <td>Enables the Shell Script step to support scripts from Harness File Store. <b>This feature is in Beta.</b> </td>
    </tr>
    <tr>
        <td>CDS_DISABLE_EVALUATE_EXPORT_VARIABLES</td>
        <td>Enables exporting variables without evaluating them in the Command step. <b>This feature is in Beta.</b></td>
    </tr>
    <tr>
        <td>CD_CONTAINER_STEP_DELEGATE_SELECTOR</td>
        <td>Makes the Container step to respect the delegate selector configured at the pipeline. <b>This feature is in Beta.</b></td>
    </tr>
    <tr>
        <td>CDS_REMOVE_TIME_BUCKET_GAPFILL_QUERY</td>
        <td>Removes the usage of time bucket gapfill from CD. <b>This feature is in Beta.</b> </td>
    </tr>
    <tr>
        <td>CDS_TERRAGRUNT_USE_UNIQUE
        _DIRECTORY_BASE_DIR_NG</td>
        <td>Enables a unique directory to support Terragrunt run-in-parallel. <b>This feature is in Beta.</b> </td>
    </tr>
    <tr>
        <td>OPA_AIDA_WIDGET</td>
        <td>Enables <a href="/docs/platform/governance/policy-as-code/aida-for-policies">AIDA for OPA</a>. <b>This feature is in Beta.</b></td>
    </tr>
    <tr>
        <td>CDS_JIRA_APPROVAL_OPTIMIZATION</td>
        <td>Optimize Jira Approval stage/step to only fetch relevant fields. <b>This feature is in Beta.</b> </td>
    </tr>
    <tr>
        <td>CDS_NG_UPDATE_MULTIPLE_SNOW_CHANGE_REQUEST</td>
        <td>Enable the option to update multiple tasks in ServiceNow.</td>
    </tr>
    <tr>
        <td>PIE_SIMPLIFY_LOG_BASE_KEY</td>
        <td>Reduces the length of the log base key. <b>This feature is in Beta.</b><br/>This feature requires delegate version 23.10.81010 or later.<br/>After enabling this feature flag, you must re-run your pipelines to apply the change.<br/>For more information, go to <a href="/docs/platform/pipelines/download-logs">Download execution logs</a>.</td>
    </tr>
    <tr>
        <td>CDS_SHELL_VARIABLES_EXPORT</td>
        <td>Export variables in a shell script to either the step group, stage, or pipeline scope. The variable will be accessible using the scope of the variable. For example: <pre>functor.pipeline.&lt;exported_variable&gt;</pre> Exported variables are immutable. <b>This feature is in Limited GA.</b></td>
    </tr>
    <tr>
        <td>PIE_ASYNC_FILTER_CREATION</td>
        <td>Sets pipeline CRUD calls to filter creation asynchronously. <b>This feature is in Beta.</b> </td>
    </tr>
    <tr>
        <td>CDS_ECS_BG_VALIDATION</td>
        <td>If green services exist in your Blue Green deployment, you can configure Harness to update those services instead of deleting them and then re-creating them with a new manifest and artifact.<br/>For more information, go to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/#update-green-services">Update green services</a> and <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/#ecs-blue-green-service-validation">ECS blue/green service validations</a>.<br/><b>This feature is in Beta, and it requires Harness Delegate version 23.11.81820.</b> </td>
    </tr>
</table>
