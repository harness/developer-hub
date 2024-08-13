---
title: What's supported
description: Supported CD features and integrations. 
sidebar_position: 1
---

This topic lists the supported CD features and integrations you can use in Harness for deploying and verifying your apps.

For a comprehensive list that includes all Harness modules, go to [Supported platforms and technologies](/docs/platform/platform-whats-supported.md).

import PartialExample from '/docs/continuous-delivery/shared/cd-integrations-supported.md';

<PartialExample name="integrations" />

## Harness Integration Upgrade Policy

At Harness, we are committed to providing our customers with the most reliable and efficient integration experiences. To achieve this, we ensure that our integrations are consistently updated to the latest versions. Our policy is designed to align with the rapid pace of technological advancements and to offer you the most up-to-date capabilities.

### Quarterly Integration Updates

Harness updates its integrations on a quarterly basis. This schedule is determined by the release velocity of the integrated tools. By adhering to a routine update cycle, we ensure that our integrations always leverage the latest features and improvements. This enables our users to maximize the potential of the tools offered by Harness, ensuring that they remain at the forefront of technological innovation.

### Comprehensive Tooling Updates

Tooling updates apply to all integrations, irrespective of the product. We are committed to ensuring that all our integrations are up to date with the latest version available on the market. This comprehensive approach guarantees that you benefit from the most recent advancements across all your tools and integrations.

### Testing and Quality Assurance

Harness will test integration updates against the corresponding and impacted deployment types to ensure there is no loss in functionality or regression. Our rigorous testing process aims to maintain the highest quality standards, providing you with reliable and efficient integrations that seamlessly fit into your existing workflows.

### Current State of Our Tooling

Below is a table that shows the current state of our integrations, demonstrating our commitment to updating them to the latest versions:

| Connector   | Integration         | Supported Version | Latest Version | Upgrade Cycle |
|-------------|----------------------|-------------------|----------------|---------------|
| Kubernetes  | Kubernetes           | 1.27.4            | 1.30.3         | Quarterly     |
| Helm        | Helm                 | 3.8.x             | 3.14.x         | Quarterly     |
| Tanzu       | Tanzu                | cf cli v7         | cf cli v8      | Quarterly     |
| Terraform   | NaN                  | 1.3.5             | 1.9.4          | Quarterly     |
| Terragrunt  | NaN                  | 0.40.x            | 0.66.4         | Quarterly     |
| NaN         | Serverless.com       | 3.x               | 4.x            | Quarterly     |
| Jenkins     | Jenkins Build Step   | 2.432             | 2.471          | Quarterly     |
| NaN         | ArgoCD               | 2.8.x             | 2.12.x         | Quarterly     |
| AWS         | AWS SAM              | 1.84.0            | 1.121.0        | Quarterly     |

### Benefits of Routine Updates

- **Enhanced Capabilities:** By staying current with the latest releases, Harness ensures that users have access to cutting-edge features and enhancements. This allows you to take full advantage of the powerful functionalities provided by the integrated tools.

- **Security Assurance:** Regular updates help protect your systems from potential security vulnerabilities that can emerge in older versions of software. By maintaining up-to-date integrations, we provide an added layer of security, ensuring a safer experience for our users.

- **Improved Performance:** Newer versions often come with performance improvements that can enhance the overall efficiency and reliability of the integrations.

### Release Notes and Impact Assessment

With every update to an SDK, CLI, or integration, Harness will publish detailed release notes. These notes will outline the changes made, the benefits of the new version, and any potential impacts on existing workflows. By providing transparent and comprehensive documentation, we aim to ensure a smooth transition for our users during each upgrade cycle.

### Continuous Improvement and Feedback

Harness is dedicated to continuous improvement. We encourage our users to provide feedback on their integration experiences. This feedback is invaluable in helping us refine our processes and deliver even better solutions. Our goal is to work collaboratively with our users to create a seamless and powerful integration environment.

### Conclusion

Harness’s integration upgrade policy reflects our commitment to innovation, security, and user satisfaction. By maintaining the latest versions of our integrations, we strive to provide a superior product that empowers our users to achieve their goals effectively and efficiently.

For further details or assistance, please contact [Harness Support](mailto:support@harness.io).

## Active CD Feature flags

Some Harness CD features are released behind feature flags to get feedback from specific customers before releasing the features to the general audience. Feature development statuses are categorized as [Beta, GA, or Limited GA](/docs/platform/get-started/release-status).

The following table describes active feature flags relevant to Harness CD.

To enable a feature flag in your Harness account, contact [Harness Support](mailto:support@harness.io).

| Flag | Description |
| --- | --- |
| CDS_HELM_STEADY_STATE_CHECK_1_16 | Allow users leveraging Kubernetes version 1.16 or later to perform steady state check for Helm deployments. <b> This feature is in Limited GA. </b> |
| OPA_PIPELINE_GOVERNANCE | Enables [Policy as code](/docs/platform/governance/policy-as-code/harness-governance-overview) for a Harness account. <b> This feature is GA. </b> |
| CDS_HELM_VERSION_3_8_0 | Sets the default version of Helm to 3.8 when using the Harness Helm delegate. <b> This feature is in Limited GA. </b> |
| NG_PIPELINE_TEMPLATE | Enables [Harness templates](https://developer.harness.io/docs/platform/templates/create-pipeline-template). <b> This feature is Limited GA. </b> |
| OPA_GIT_GOVERNANCE | Store and fetch your <a href="/docs/platform/governance/policy-as-code/configure-gitexperience-for-opa">OPA policies in Git.</a>. <b> This feature is Limited GA. </b> |
| NG_CUSTOM_STAGE | Enables the[Custom stage](/docs/platform/pipelines/add-a-stage/#add-a-custom-stage) for use in a pipeline. <b> This feature is GA. </b> |
| NG_GIT_EXPERIENCE | Enables <a href="/docs/platform/git-experience/configure-git-experience-for-harness-entities">Harness Git Experience</a> for a Harness account. Users can manage their Pipeline, Templates, Input Sets, Feature Flags via Git. <b>This feature is GA.</b> |
| CDP_USE_OLD_GIT_SYNC | Enables the previous, deprecated version of Git Experience. This flag is only enabled for customers who have not migrated over to <a href="/docs/platform/git-experience/configure-git-experience-for-harness-entities">Harness Git Experience</a>. |
| CDS_DISABLE_HELM_REPO_YAML_CACHE | Disables Helm repository caching on the Harness Delegate. This should only be enabled if users are experiencing failures with Harness Delegate failing to fetch Helm Charts. Caching could be the source of the issue. <b> This Feature is in Beta. </b> |
| CD_GIT_WEBHOOK_POLLING | Enables configurable polling for <a href="/docs/platform/triggers/triggering-pipelines/">GitHub Webhooks</a> This allows users to set polling interval for Harness Delegate to poll your GitHub instance. <b>This feature is in Limited GA.</b> |
| CDS_DISABLE_WINRM_COMMAND_ENCODING_NG | Prevents the encoding of WinRM commands. By default Harness encodes the winrm commands we run on hosts. User's can disable this behavior via this feature flag. <b>This feature is in Limited GA.</b> |
| CDS_TERRAFORM_S3_SUPPORT | Enables AWS S3 for Terraform plan storage. <b>This feature flag is Limited GA.</b> |
| CDP_USE_K8S_DECLARATIVE_ROLLBACK | Enables the <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/#declarative-rollback">declarative rollback</a> behavior for services. <b>This feature is in Beta.</b> |
| CDS_K8S_SOCKET_CAPABILITY_CHECK_NG | Replaces the HTTP capability check for the Kubernetes connector with socket capability. <b>This feature is in Beta.</b> |
| PIE_GET_FILE_CONTENT_ONLY | Optimizes the execution flow to fetch only file content for remote entities. |
| CDS_SERVICE_CONFIG_LAST_STEP | Allows users on the last step of manifest/artifact/config files, if these configs are in edit mode. <b>This feature is in Limited GA.</b> |
| PIE_USE_SECRET_FUNCTOR_WITH_RBAC | Performs RBAC check on secrets when used in pipeline execution. <b>This feature is in Beta.</b> |
| CDS_GIT_CONFIG_FILES | Enables config files to be <a href="/docs/continuous-delivery/x-platform-cd-features/services/cd-services-config-files">managed in Git.</a> |
| PIE_GITX_OAUTH | Uses users' OAuth credentials to fetch and commit in Git. <b>This feature is in Limited GA.</b> |
| PIE_MULTISELECT_AND_COMMA_IN_ALLOWED_VALUES | Enables the ability to <a href="/docs/platform/variables-and-expressions/runtime-inputs/#multiple-selection">choose multiple values from a list of allowed values.</a> |
| CDS_ARTIFACTS_PRIMARY_IDENTIFIER | Allows you to change the expression value for the primary artifact identifier. <b>This feature is in Beta.</b> |
| CDS_SUPPORT_HPA_AND_PDB_NG | Enables [PDB and HPA tracking](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes/#managed-workloads-table) as managed resources by Harness. <b>This feature is in Limited GA.</b> |
| CDS_SSH_SSHJ | Enables a library upgrade for SSH Deployments to use newer algorithms of SSH to connect to hosts. All Delegates on 803xx Release will have the new upgraded library. <b>This feature is Limited GA.</b> |
| CDS_SSH_CLIENT | Enables a library upgrade for SSH Deployments  to use newer algorithms of SSH to connect to hosts. All Delegates on 803xx Release will have the new upgraded library. <b>This feature is Limited GA.</b> |
| CD_TRIGGER_CATALOG_API_ENABLED | Fetches the list of Trigger options by an API call instead of from the UI. |
| CDS_SERVICE_OVERRIDES_2_0 | Enables <a href="/docs/continuous-delivery/x-platform-cd-features/overrides-v2">overrides v2 experience</a>. <b>This feature is in Beta.</b> |
| CDS_TEMPLATE_ERROR_HANDLING | Adds enhanced error handling for templates by schema validation errors. <b>This feature is in Limited GA.</b> |
| CDS_HELM_STEADY_STATE_CHECK_1_16_V2_NG | Enables steady state check for Helm deployments on Kubernetes clusters using 1.16 or higher. <b>This feature is in Beta.</b> |
| CDS_AZURE_WEBAPP_LISTING_APP_NAMES_AND_SLOTS | Enables users to select Azure WebApps in a drop down for slot deployments. <b>This feature is in Limited GA.</b> |
| CDS_RESOLVE_OBJECTS_VIA_JSON_SELECT | Support resolution of objects via the JSON Select Command in the HTTP step. <b>This feature is in Beta.</b> |
| CDS_SUPPORT_EXPRESSION_REMOTE_TERRAFORM_VAR_FILES_NG | Enables Harness expressions in remote Terraform var files. <b>This feature is in Beta.</b> |
| CDS_ENABLE_LOAD_FROM_CACHE_FOR_RETRY_FORM | Enables a load from cache option on pipeline execution retry form. <b>This feature is in Beta.</b> |
| CDS_ENV_PROPAGATION | Enables environment propagation across CD stages. <b>This feature is in Limited GA.</b> |
| CDS_RECONFIGURE_JIRA_APPROVAL_TIMEOUT | Reduces timeout for Jira from 5 minutes to 1 minute and allows pausing of approval. <b>This feature is in Beta.</b> |
| CDS_NG_SERVICE_PRINCIPAL_FOR_CUSTOM_WEBHOOK | Makes authenticated custom Webhook calls use the service principal instead of the principal inherited from the API key. <b>This feature is in Beta.</b> |
| CD_MAKE_CD_LICENSE_USAGE_ASYNC | Enables CD License Usage dashboards to be asynchronous. <b>This feature is in Beta.</b> |
| CDS_ENABLE_SHELL_SCRIPT_FILE_REFERENCE | Enables the Shell Script step to support scripts from Harness File Store. <b>This feature is in Beta.</b> |
| CDS_DISABLE_EVALUATE_EXPORT_VARIABLES | Enables exporting variables without evaluating them in the Command step. <b>This feature is in Beta.</b> |
| CD_CONTAINER_STEP_DELEGATE_SELECTOR | Makes the Container step to respect the delegate selector configured at the pipeline. <b>This feature is in Beta.</b> |
| CDS_REMOVE_TIME_BUCKET_GAPFILL_QUERY | Removes the usage of time bucket gapfill from CD. <b>This feature is in Beta.</b> |
| CDS_TERRAGRUNT_USE_UNIQUE_DIRECTORY_BASE_DIR_NG | Enables a unique directory to support Terragrunt run-in-parallel. <b>This feature is in Beta.</b> |
| OPA_AIDA_WIDGET | Enables <a href="/docs/platform/governance/policy-as-code/aida-for-policies">AIDA for OPA</a>. <b>This feature is in Beta.</b> |
| PIE_SIMPLIFY_LOG_BASE_KEY | Reduces the length of the log base key. <b>This feature is in Beta.</b><br/>This feature requires delegate version 23.10.81010 or later.<br/>After enabling this feature flag, you must re-run your pipelines to apply the change.<br/>For more information, go to <a href="/docs/platform/pipelines/executions-and-logs/download-logs">Download execution logs</a>. |
| PIE_ASYNC_FILTER_CREATION | Sets pipeline CRUD calls to filter creation asynchronously. <b>This feature is in Beta.</b> |
| CDS_AWS_OIDC_AUTHENTICATION | Enables the option to connect to AWS with OIDC. Currently, this option is only supported for Kubernetes, Helm, Terraform, ECS, and Cloudformation. <b>This is a Beta feature.</b> |
| CV_NEWRELIC_NEW_API | Enable this feature if you want to use the NerdGraph API for the NewRelic Health Source. <b>This is a Beta feature.</b> |
| CDS_CONTAINER_STEP_GROUP_RUN_AS_USER_AND_PRIVILEGED_FIX | Enable this feature if you want updated logic for permissions inheritance between steps and their step groups. To learn more go to [Step Group Inheritance Logic](/kb/continuous-delivery/articles/configuration-inheritance-stepgroup-step). <b>This is a Beta feature.</b> |
| CV_MONITORED_SERVICE_TEMPLATIZATION | Enable this feature if you want to select a monitored service template as a runtime input. To learn more, go to [Select a monitored service template during runtime](/docs/continuous-delivery/verify/cv-getstarted/configure-first-cv#select-a-monitored-service-template-during-runtime). <b>This is a Beta feature.</b> |

