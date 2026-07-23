## July 2026

### Version 1.159.1

#### New features and enhancements

- Harness now supports **progressive canary deployments for Kubernetes**, a sub-type of the Canary strategy that rolls out a new version in percentage-based phases (for example, 25%, 50%, and 100%) while keeping the total pod count within a fixed budget. Harness maintains two Deployments and shifts replicas between them, with verification or approval gates between phases. This feature requires the feature flag `CDS_K8S_PROGRESSIVE_CANARY`. Contact [Harness Support](mailto:support@harness.io) to enable. (**CDS-123216**)

- The Shell Script step now supports **Harness ID tokens**. You can declare one or more named identities on the step, and Harness generates an independent OIDC ID token for each and injects it into the script at runtime as an environment variable, so a script can authenticate as the workload itself instead of through a connector. This feature requires the feature flag `PIPE_PIPELINE_IDENTITY`. Contact [Harness Support](mailto:support@harness.io) to enable. Go to [Shell Script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step) to configure named identities. (**CDS-125872**)

- AWS Auto Scaling Group (ASG) redeployments now **preserve unchanged properties** instead of deleting and recreating them. Harness compares lifecycle hooks, scaling policies, scheduled actions, load balancers, and target groups against your configuration and updates only what changed, keeping in-flight instances and their lifecycle hooks intact. This feature requires the feature flag `CDS_ASG_SKIP_UNCHANGED_PROPERTIES` and a delegate version that includes this behavior. Contact [Harness Support](mailto:support@harness.io) to enable. Go to [ASG deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg/asg-tutorial) to learn more. (**CDS-124833**)

- Harness now supports **bulk post-production rollback across multiple infrastructures**. From the service dashboard you can select multiple infrastructures where a service is deployed and roll them back together, choosing the target execution for each infrastructure before you confirm. This feature requires the feature flag `CDS_BULK_POST_PROD_ROLLBACK`, with `CDC_SERVICE_DASHBOARD_REVAMP_NG` as a prerequisite. Contact [Harness Support](mailto:support@harness.io) to enable. Go to [Rollback deployments](/docs/continuous-delivery/manage-deployments/rollback-deployments) to learn more. (**CDS-125628**)

#### Fixed issues

- Fixed an issue where disabling the artifact in a stage still enforced a primary artifact reference, which prevented affected pipelines from running. (**CDS-125804**, **ZD-116383**)
- Fixed an issue where secret override references generated a malformed URL when opened from the secrets page in the unified view. The links resolved correctly in the Continuous Delivery module but broke in the unified view. (**CDS-127486**, **ZD-118858**)
- Fixed an issue where saving or cloning a service or environment to Git failed because the dialog closed unexpectedly, which also prevented moving these entities from inline to Git. (**CDS-127728**, **ZD-119243**)

### Version 1.158.4

#### New features and enhancements

- AWS CDK steps now run on ECS-based delegates, so you can execute CDK synth and deploy steps without a Kubernetes delegate runtime. This feature requires feature flags. Contact [Harness Support](mailto:support@harness.io) to enable. Go to [AWS CDK provisioning](/docs/continuous-delivery/cd-infrastructure/aws-cdk/aws-cdk-provisioning) to run CDK steps on ECS delegates.

- Google Cloud Run and GKE deployments now support pause and rollout control, so you can deploy without traffic, shift a percentage of traffic, run validations, and insert a manual approval step before you shift the remaining traffic. This feature requires feature flags. Contact [Harness Support](mailto:support@harness.io) to enable. Go to [Google Cloud Run](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-cloud-run) to configure staged rollouts.

- Harness now supports **Git Experience for monitored services**, so you can store and manage monitored service configurations in your Git repository. Go to [Git Experience for monitored services](/docs/platform/git-experience/gitx-monitored-services) to manage monitored services in Git.

#### Breaking changes

- The Service Overrides API (`PUT /ng/api/serviceOverrides`) now enforces the `core_environment_edit` permission on the target environment for environment-scoped override operations. This change was made as part of a security fix addressing a privilege-escalation issue in the NG APIs. Previously, some override operations completed without this permission. Requests made by a user, service account, or API token that lacks `core_environment_edit`, including calls made through the **Update Service Overrides** pipeline step, now fail with `403 NG_ACCESS_DENIED`, even when no configuration, token, or role binding has changed. Grant `core_environment_edit` on the affected environment(s) to the relevant user, service account, or role to restore access. (**CDS-127611**)

#### Fixed issues

- Fixed an issue where the Harness Terraform Provider returned an unclear error when a delegate token name was still reserved by a revoked token. When you reapply a configuration that uses the `harness_platform_delegatetoken` resource with the same token name, the error message now clearly states that the name is reserved by a revoked token. (**CDS-126825**, **ZD-117850**)
- Fixed an issue where a Helm rollback ran against the wrong revision when the deploy step failed during pipeline execution. The rollback now targets the correct previous revision instead of the revision before it. (**CDS-124532**)

### Version 1.157.4

#### New features and enhancements

- AWS Auto Scaling Group (ASG) deployments now support **MixedInstancesPolicy** for optimizing cost and improving availability. You can configure a MixedInstancesPolicy in the ASG configuration JSON to allow AWS to select from multiple instance types, enabling spot instance usage and automatic fallback during capacity constraints. Harness automatically detects and updates the launch template version within the MixedInstancesPolicy configuration during deployments. (**CDS-109802**)

- Kubernetes Blue Green deployments now support **automatic scale-up during rollback** to restore the previous deployment to its original replica count. When a deployment fails and triggers a rollback, the system automatically scales up the previous (stable) deployment after swapping services, ensuring traffic routes to active pods instead of scaled-down deployments. (**CDS-107483**)

#### Fixed issues

- Fixed an issue where deployments failed due to freeze even though there were no active freeze windows. The retry execution helper did not consider freeze-failed stages as failures, so it never reran those stages. The system now correctly reruns freeze-failed stages. (**CDS-126767**, **ZD-117787**)

## June 2026

### Version 1.155.6

#### New features and enhancements

- Harness now supports **adding Approval steps inside Container Step Groups** in CD pipelines. When stage timeout exceeds 24 hours, pod TTL automatically extends to support longer approval response times. This feature requires the feature flag `CDS_CONTAINER_STEP_GROUP_STAGE_TIMEOUT`. Contact [Harness Support](mailto:support@harness.io) to enable.

- Harness now supports **automatic skipping of AWS CDK Deploy steps** when no infrastructure changes are detected by a preceding CDK Diff step, reducing deployment time. This feature requires the feature flag `CDS_SKIP_CDK_DEPLOY_IF_NO_DIFF`. Contact [Harness Support](mailto:support@harness.io) to enable.

- Harness now supports **storing Policy as Code evaluation input payloads in cloud storage** (GCS/S3) to optimize database performance and support larger inputs. Evaluation input data (pipeline YAML, Terraform plans, IaCM stacks) is stored in cloud storage, while evaluation results and metadata remain in the database for fast access. A new signed URL API endpoint (`GET /api/v1/evaluations/evaluation-input-signed-url/{id}`) allows you to retrieve input data from cloud storage. Go to [Policy evaluations retention](/docs/platform/governance/policy-as-code/opa-evaluations-retention#how-evaluation-data-is-stored) to understand how evaluation data is stored and retrieved. (**PIPE-34221**)

#### Fixed issues

- Fixed an issue where the runtime YAML of a stage type ECS deployment template is not rendering fully for OPA testing framework. (**CDS-125948**, **ZD-113014**)
- Fixed an issue where the curl progress meter in the inbuilt download artifacts command step was shown in red (stderr) even though the step succeeds. Changed output from stderr to stdout. (**CDS-126051**, **ZD-116716**)

### Version 1.154.7

#### New features and enhancements

- Harness now supports **storing monitored services in Git using GitX**, enabling version control and code review workflows for verification configurations. This feature requires the feature flag `CDS_CV_MS_GITX`. Contact [Harness Support](mailto:support@harness.io) to enable.

- Harness now supports **Fire and Forget** email notifications for the Email step, allowing pipeline execution to continue immediately without waiting for delivery confirmation.

- Harness now supports **Preserve Directory Structure** when copying config files in the Command step. The Copy command now includes a **Preserve Directory Structure** option that maintains the original directory hierarchy when copying config files to target hosts. This prevents data loss from file overwrites when multiple files share the same name but exist in different subdirectories (for example, `env1/config.properties` and `env2/config.properties`).

- Harness now supports **command flags for the Kubernetes Dry Run step**. You can pass additional kubectl flags (such as `--server-side` and `--force-conflicts`) to the dry run validation command. This ensures your dry run output accurately reflects the actual deployment behavior, making approval gates more reliable for teams using server-side apply or strict validation modes.

#### Fixed issues

- Fixed an issue where custom artifact polling failed intermittently under concurrent parallel stage execution. When multiple custom artifact sources were defined on a single service (for example, primary and sidecar artifacts), delegate tasks responsible for fetching each artifact's versions ran concurrently but shared the same temporary script file path. This caused a race condition where one task would overwrite the other's script, leading to the failing task being unable to find its expected output file. The Custom Artifact resolution now generates unique temporary file names for each concurrent task, ensuring that multiple custom artifact sources on the same service are resolved independently without interfering with each other. You do not need to take any action. The fix takes effect automatically upon delegate upgrade. (**CDS-123500**, **ZD-113475**)
- Fixed an issue where the GitOps UpdateReleaseRepo step intermittently appeared stuck when many concurrent URR steps were in progress. Under high concurrency, the mechanism to take a lock on the GitHub token to avoid concurrent updates and prevent secondary rate limiting by GitHub caused the step to appear stuck while waiting for the lock to be acquired. Harness has added a new command unit in URR for git restraint logs to provide better visibility into lock contention. To resolve this issue, enable the `disableGitRestraint` flag on the pipeline to bypass the GitHub token lock mechanism, or use different git tokens to ensure the UpdateReleaseRepo step works efficiently in high-concurrency environments. (**CDS-125451**, **ZD-115644**)
- Fixed an issue where Kubernetes Apply failed for large GitHub CRD manifests (approximately 1.21 MB) due to SCM fetch JSON unmarshal errors, resulting in empty compiled manifests during dry run. (**CDS-125617**, **ZD-115404**)

### Version 1.153.0

#### Fixed issues

- Fixed an issue where the Terraform Cloud Apply step succeeded but triggered a retry due to loss of log streaming, potentially causing the apply to run more than once. The step now correctly marks a successful apply as complete and does not retry. (**CDS-125110**, **ZD-115187**)
- Fixed an issue where Google Cloud Functions Gen2 rollback failed with a 401 error due to lost invoker permissions after rollback. (**CDS-125272**, **ZD-115421**)
- Fixed an issue where the feature flag `CDS_ENABLE_PIPELINE_SCOPED_OIDC_SUB` did not include the pipeline ID in the OIDC sub claim for containerized step groups. The sub claim now correctly includes the pipeline ID for containerized step group executions. (**CDS-125413**, **ZD-115447**)
- Fixed an issue where ECS scheduled scaling configurations with timezone offsets in `start_time` or `end_time` fields (for example, `+05:30`) caused deserialization errors in the prepare rollback step. The step now correctly parses timezone-offset values. (**CDS-125473**, **ZD-115819**)
- Fixed an issue where the GitOps step returned an incomplete `RolloutStatusResponse`, omitting some fields. The step now correctly returns all `RolloutStatusResponse` fields. (**CDS-125476**)

### Version 1.152.5

#### New features and enhancements

- You can now use OCI-based Helm charts stored in Google Artifact Registry (GAR) as a manifest source for Helm deployments. (**CDS-125775**)

### Version 1.152.0

#### New features and enhancements

- The Artifactory connector now supports OIDC authentication, enabling credential-free federated authentication with JFrog Artifactory using short-lived JWT tokens. This feature requires the feature flag `CDS_ARTIFACTORY_OIDC_AUTHENTICATION`. Contact [Harness Support](mailto:support@harness.io) to enable. For more information, go to [Artifactory connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/artifactory-connector-settings-reference#oidc-authentication). (**CDS-121048**)

- Harness AI for OPA policies now provides enhanced policy generation capabilities powered by the unified Harness AI agent, offering more accurate and context-aware policy suggestions through specialized skills trained on OPA and REGO best practices. The AI assistant helps you write OPA policies without deep REGO knowledge and provides detailed descriptions of existing policies in plain language. This feature requires the feature flag `OPA_ENABLE_CANARY_AI`. Contact [Harness Support](mailto:support@harness.io) to enable. For more information, go to [Build policies using Harness AI](/docs/platform/governance/policy-as-code/ai-for-policies). (**PIPE-34241**)

- Istio traffic routing steps now support configurable AND/OR match logic for route rules through the **Match all rules** option. When enabled, all configured route rules (URI, headers, method, port) must match for a request to be routed to the destination. When disabled, a request matching any single rule will be routed. For more information, go to [Traffic shifting step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/traffic-shifting-step#match-all-rules). (**CDS-122246**)

- AWS connectors with OIDC authentication now include environment identifiers as session tags in OIDC tokens, enabling environment-specific IAM policy enforcement for resources and secrets. This allows you to restrict production secrets to production pipelines while using shared delegate pools across environments. This feature requires the feature flag `CDS_OIDC_AWS_SESSION_TAGS`. Contact [Harness Support](mailto:support@harness.io) to enable. For more information, go to [OIDC environment-based session tags for AWS](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference#oidc-environment-based-session-tags-for-aws). (**CDS-123292**)

- Approval steps now support enabling visibility for non-approvers, allowing users without approval permissions to view approval step details during pipeline execution while keeping approval actions disabled. This setting is configured at the project level under **Default Settings** and is disabled by default. For more information, go to [Enable approval visibility for non-approvers](/docs/platform/approvals/adding-harness-approval-stages#enable-approval-visibility-for-non-approvers). (**CDS-125606**)

#### Fixed issues

- Fixed an issue where Helm canary deployments failed with delegate selector AND-collision when using delegate-pinned Git connectors. This fix requires the feature flag `CDS_ASYNC_EXECUTABLE_USE_SELECTORS`. Contact [Harness Support](mailto:support@harness.io) to enable. (**CDS-124714**, **ZD-114569**)
- Fixed an issue where Git configuration was missing in the OPA request payload when initially creating service, infrastructure, or environment entities. The system now includes Git configuration in OPA requests for entity creation. (**CDS-124756**, **ZD-114085**)
- Fixed an issue where an invalid or empty cluster name in Amazon EKS infrastructure caused a misleading JSON marshalling error instead of a validation failure. The error message now clearly indicates the empty cluster in EKS infrastructure. (**CDS-124973**, **ZD-114328**)

### Version 1.151.4

#### New features and enhancements

- You can now use OCI-based Helm charts stored in Google Artifact Registry (GAR) as a manifest source for Helm deployments. (**CDS-125775**)

### Version 1.151.1

#### New features and enhancements

- ECS Rolling deployments now support skipping AWS Application Auto Scaling API interactions through the **Skip application auto scaling** option, allowing you to manage auto-scaling externally and prevent API rate limit issues when deploying multiple services in parallel. This feature requires the feature flag `CDS_ECS_SKIP_APPLICATION_SCALING` and delegate version `26.05.89205` or later. Contact [Harness Support](mailto:support@harness.io) to enable. Go to [Skip application auto scaling](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial/#skip-application-auto-scaling) to configure this option.

- Published new Docker images for AWS CDK deployments with CDK version 2.1125.0. The updated images are available at [harness/aws-cdk-plugin](https://hub.docker.com/r/harness/aws-cdk-plugin/tags).

- Published new Docker images for AWS SAM deployments with SAM CLI version 1.161.1. The updated images are available at [harness/aws-sam-plugin](https://hub.docker.com/r/harness/aws-sam-plugin/tags).

#### Fixed issues

- Fixed an issue where the Terraform provider validates AWS Secrets Manager connectors using the executing delegate instead of the connector's delegate selector, breaking environment IAM isolation. This fix requires the feature flags `CDS_SECRET_MANAGER_DELEGATE_SELECTOR_PRECEDENCE` and `PIE_GITX_EVALUATE_ENCRYPTED_CAPABILITIES`. When enabled, the secret manager's delegate selector takes precedence over the connector's delegate selector during connector validation and Git file operations. Contact [Harness Support](mailto:support@harness.io) to enable both feature flags. (**CDS-118093**, **ZD-100682**)
- Fixed an issue where artifact triggers permanently fail when the artifact source does not exist at trigger creation time. The solution is to not take the absence of Google Artifact Registry (GAR) package as a failure. (**CDS-123495**, **ZD-113576**)
- Fixed an issue where custom artifact polling fails intermittently when a service has multiple custom artifact sources (for example, primary and sidecar) configured simultaneously under concurrent parallel stage execution. The error displayed was: `Failed to fetch artifacts. Failed to transform results to the Custom Repository Response. Reason: FileNotFoundException`. The fix takes effect automatically upon delegate upgrade. (**CDS-123500**, **ZD-113475**)
- Fixed an issue where custom webhook triggers silently fail to execute pipelines when `projectIdentifier` is empty in the URL (regression). Added validation for case when `orgId` or `projectId` is empty when the feature flag is enabled. (**CDS-124554**, **ZD-114388**)
- Fixed an issue where delegate selection logs in console view were unresponsive. The **Details** button in the log view for a failed step did not open the details panel. (**CDS-124585**)
- Fixed an issue where AWS Secrets Manager defaults URL to region name instead of URL. The AWS KMS fallback returned the region ID instead of the URL for newer regions, leading to a malformed URL exception. This has been fixed and the newer regions are added as well. (**CDS-124845**, **ZD-114730**)
- Fixed an issue where service accounts are unable to list project environments with view permission. This fix requires the feature flag `CDS_ENV_LISTING_RBAC_IMPROVEMENT`. Contact [Harness Support](mailto:support@harness.io) to enable. (**CDS-124866**, **ZD-114080**)

## May 2026

### Version 1.150.3

#### Fixed issues

- Fixed an issue where downloading configuration files from Amazon S3 intermittently took more than 30 minutes. (**CDS-123003**, **ZD-112705**)
- Fixed an issue where OCI Helm chart validation for pulling Helm charts from Amazon ECR did not work until a dummy chart with base path '/' was created. The chart version listing in the service YAML and Helm deployment of OCI Helm ECR manifest used to fail until a dummy repository was created. OCI Helm ECR in Native Helm Deployment now works as expected without the dummy repository workaround. (**CDS-123082**, **ZD-113172**)
- Fixed an issue where Amazon S3 artifact triggers failed with `invalid_artifact_server` after a delegate upgrade from version 26.01.88303 to 26.05.89101. The AwsS3 migration from v1 to v2 has been fixed. (**CDS-123533**, **ZD-114070**)
- Fixed an issue where a blank image (`""`) in Cloud Run deployments produced an `InvalidImageName` error and caused an infinite retry loop. (**CDS-124717**, **ZD-112702**)
- Fixed an issue where a null pointer exception occurred in Cloud Run deployments when no manifests were configured. (**CDS-124718**, **ZD-112702**)

### Version 1.149.7

#### Fixed issues

- Fixed an issue where the saved value in YAML was not shown correctly for the **Disable Artifact Validation** setting in multi-service pipelines. (**CDS-122779**, **ZD-112051**)
- Fixed an issue where artifact image SHA256 validation failed after moving a project to a different organization or account. The validation now checks if the digest is valid before performing mismatch operations. This fix requires the feature flag `CDS_SKIP_INVALID_SHA_DIGEST_CHECK`. Contact [Harness Support](mailto:support@harness.io) to enable. (**CDS-122990**)
- Fixed an issue where the dashboard loaded slowly for some accounts. (**CDS-122817**, **ZD-111610**)
- Fixed an issue where ASG rolling deploy defaulted to launch template version 1 on empty ASGs when instance refresh desired configuration was enabled. (**CDS-122831**, **ZD-112737**)
- Fixed an issue where Cloud Run resource configuration was not honored when only a memory limit was set, and a null pointer error occurred when resource strings were blank. (**CDS-122882**, **ZD-112702**)
- Fixed an issue where Amazon S3 artifact triggers failed with `invalid_artifact_server` after a delegate upgrade. (**CDS-123533**, **ZD-114070**)

### Version 1.148.3

#### New features and enhancements

- OIDC Delegate Selectors for AWS Connectors enables customers to pass delegate selector information as AWS session tags in OIDC tokens, allowing them to enforce IAM policies based on which Harness delegates execute tasks. This provides environment-level secret isolation without relying on environment naming conventions, working across all scenarios including connector validation, deployment stages, and custom stages.

#### Fixed issues

- Fixed an issue where artifact fetching from JFrog Artifactory Edge nodes would fail to retrieve artifacts that exist in upstream repositories. The system now automatically falls back to transitive search queries when standard queries return no results, ensuring reliable artifact resolution across distributed Artifactory deployments with geo-replicated Edge nodes. This fix requires the feature flag `CDS_USE_CACHED_REPOSITORY_SUFFIX`. Contact [Harness Support](mailto:support@harness.io) to enable. (**CDS-121537**, **ZD-111212**)
- Fixed an issue with the child pipeline service selector in the run pipeline form. (**CDS-122298**, **ZD-111817**)

:::info
Wondering where versions 1.145.xx, 1.146.xx, and 1.147.xx are? Those releases were rolled into 1.148.xx and upgrades will skip directly from 1.144.xx to 1.148.xx. Don't worry, you're not missing a thing!
:::

### Version 1.144.0

#### Fixed issues

- Improved validation and UI behavior for the Azure Container Apps deployment step. Revision traffic details now validate minimum and maximum traffic values (0-100) and prevent multiple tags per traffic configuration. (**CDS-122522**)
- Fixed an issue in the Continuous Verification (CV) AI Verify feature by removing the unnecessary requests field from the data collection infrastructure and wiring up backend APIs for Health Sources V2 and Config Agent flow for Datadog metrics and log health sources. This feature requires the feature flag `CDS_CV_HEALTH_SOURCES_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable. (**CDS-122674**)
- Improved performance for the Azure Container Apps managed environments API by optimizing it to be called only when its dependencies (resource group or subscription ID) change. The API now triggers on input focus during edit flows. (**CDS-122787**)

## April 2026

### Version 1.143.1

#### New features and enhancements

- You can now deploy to **Azure Container Apps** directly from Harness CD. Ship microservices and containerized applications to Azure's fully managed serverless platform without managing infrastructure. Run canary deployments with progressive traffic shifting (for example, 20% to 70% to 100%), roll back instantly with automatic pre-deployment state capture, and authenticate with OIDC (keyless) or Service Principal credentials across subscriptions. Harness supports both Azure Container Registry (ACR) and Docker Hub as artifact sources. This feature requires the feature flag `CDS_AZURE_CONTAINER_APPS`. Contact [Harness Support](mailto:support@harness.io) to enable. For more information, go to [Azure Container Apps deployments](/docs/category/azure-container-apps-deployments). (**CDS-106121**)

- Pipeline YAML and input sets stored in Git can now be referenced using Git tags in addition to branch names during trigger-based executions. You can specify a tag in the **Pipeline Reference Branch** or **Input Set Source** fields using the `$tag:<tag-name>` format (for example, `$tag:v1.0.0`) or use `<+"$tag:"+<expression>>` to dynamically resolve tag names from expressions like `<+"$tag:"+<+trigger.tag>>`. In your trigger YAML, use the `pipelineBranchName` and `inputSetBranchName` properties with the `$tag:` prefix to load both pipeline and input sets from the same Git tag. This enables version-controlled pipeline and input set management through Git tagging, making it easier to maintain stable configurations alongside your release workflow and enabling reliable rollbacks to previous versions. This feature supports all Git providers including GitHub, GitLab, and Bitbucket. This feature requires delegate version **26.04.89002** or later. For more information, go to [Git tag support for pipeline and input set source](/docs/platform/pipelines/input-sets#git-tag-support-for-pipeline-and-input-set-source).

- Harness now supports OIDC authentication for AWS GovCloud regions. The delegate automatically routes STS (Security Token Service) requests to the appropriate regional endpoint when using OIDC with AWS connectors in GovCloud. The STS region is resolved using the following priority: connector's default region, cluster/resource region, `AWS_DEFAULT_REGION` environment variable on the delegate host, or fallback to `us-east-1`. For GovCloud deployments, set the `AWS_DEFAULT_REGION` environment variable on your delegate to specify the GovCloud region (for example, `us-gov-west-1`). This feature requires delegate version **88904** or later.

- A new **Executions Management** page gives you account-level visibility into queued pipeline executions. View queue positions, filter by organization or project, and cancel individual or bulk executions from **Account Settings** > **Security and Governance** > **Executions Management**. This feature requires the feature flag `PIPE_QUEUED_PIPELINE_OBSERVABILITY`. Contact [Harness Support](mailto:support@harness.io) to enable.

- WinRM session pooling is now available for traditional Windows deployments. Harness maintains a delegate-wide session pool grouped by host and username. Command steps reuse idle sessions with matching credentials instead of opening new connections, saving 30 seconds to over a minute per connection in environments with high session initialization costs. Session pooling supports NTLM authentication only. This feature requires the feature flag `CDS_SHARED_SESSION_WINRM_NTLM_NG` and delegate version 889xx or later. Contact [Harness Support](mailto:support@harness.io) to enable. For more information, go to [WinRM session reuse](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial#winrm-session-reuse).

### Version 1.142.0

#### Fixed issues

- Fixed an issue where large Terraform plans caused a `NullPointerException` or socket timeout when the manager attempted to decrypt the plan output. The decryption process now handles large payloads correctly, preventing timeouts and NPEs during Terraform plan retrieval. (**CDS-108748**, **ZD-110657**)
- Fixed an intermittent `FLOW_CONTROL_ERROR` (`stream was reset: FLOW_CONTROL_ERROR`) that occurred during Terraform plan and apply steps. The error was triggered by an HTTP/2 flow-control issue in the delegate-to-manager communication when decrypting Terraform plan content via the Harness Secret Manager. The HTTP/2 stream handling has been stabilized to prevent these transient resets. (**CDS-122091**, **ZD-111505**)
- Fixed an issue where AWS ECS deployments did not honor Service Connect configuration defined in the ECS service definition. The deployment completed without errors but Service Connect was not enabled on the deployed service. ECS deployments now correctly apply Service Connect settings from the service definition. (**CDS-121374**, **ZD-111056**)

:::info
Wondering where versions 1.140.xx and 1.141.xx are? Those releases were rolled into 1.142.xx and upgrades will skip directly from 1.139.xx to 1.142.xx. Don't worry, you're not missing a thing!
:::

### Version 1.139.3

#### New features and enhancements

- The pipeline execution listing page now displays an improved card-based layout. The **Service** and **Environment** columns have been replaced by an **Update Summary** column that shows service-to-environment mappings for CD stages and schema-to-instance mappings for Database DevOps stages. You can hover over entries to view artifact details and infrastructure information, and expand execution cards for stage-level breakdowns. This feature was previously behind the feature flag `CDS_EXECUTION_LIST_CARD_VIEW` and is now generally available. For more information, go to [Pipeline execution history](/docs/continuous-delivery/x-platform-cd-features/executions/execution-history/#execution-reference).

#### Fixed issues

- Fixed an issue where a dashboard query failed with a PostgreSQL error: "the postgresql 9.5+ database encountered an error while running this query." (**CDS-120074**, **ZD-109608**)
- Fixed an issue where the WinRM credential **Verify Connection** displayed an incorrect default port in the error message, stating "if the port is not specified with the host, it will default to 22." (**CDS-120290**, **ZD-110062**)
- Fixed an issue where runtime values for GitOps clusters and environment inputs were not being cleared correctly in GitOps stages. (**CDS-120345**, **ZD-109942**)
- Fixed an issue with the context value sent in the artifact list for the Service step. (**CDS-120967**, **ZD-110383**)
- Fixed an issue where the Helm chart version fetch did not correctly identify third-party authentication errors. When fetching Helm chart versions, if the upstream provider or connector returned a 401 (Unauthorized) or 403 (Forbidden) error, the exception was propagated as-is to the client. This caused the client to interpret the error as their own authentication failure with the Harness platform, rather than a credentials issue with the external Helm chart provider (for example, an OCI registry or HTTP Helm repo). The Helm chart version fetch now detects authentication-related errors from upstream providers and wraps them as an application-level invalid credentials exception, correctly signaling that the credentials issue is with the third-party connector. (**CDS-120992**, **ZD-110182**)
- Fixed an issue where the overrides variable field went blank when editing it. (**CDS-121117**, **ZD-109880**)
- Fixed an issue where an active freeze window could be edited via API. The freeze API service did not check for active windows during edits, even though the UI does not permit it. Editing active freeze windows via API is now blocked by default. To restore the previous behavior, enable the feature flag `CDS_ALLOW_ACTIVE_FREEZE_EDIT`. Contact [Harness Support](mailto:support@harness.io) to enable this feature flag. (**CDS-114114**)

### Version 1.138.5

#### Fixed issues

- Fixed an issue where a direct connector secret reference with an incorrect value caused all secrets to fail rendering in `values.yaml` during Native Helm deployments. (**CDS-119546**, **ZD-105341**)
- Fixed an issue where pipelines failed to pull Helm files after a delegate upgrade. When using the **Fetch files from Git using provider-specific APIs** setting, the system encountered failures for repositories with numerous files. Recent changes added additional context to gRPC responses, causing the total response size to exceed the 16KB gRPC call limit, resulting in failed file fetches and incomplete repository data retrieval. The Git file fetching feature now implements pagination, automatically splitting large file lists into batches of up to 35 files per request, ensuring each gRPC call stays within the 16KB limit while maintaining full repository access. (**CDS-120124**, **ZD-109714**)
- Fixed an issue where GitOps steps (MergePR, RevertPR, UpdateReleaseRepo) failed with "no eligible delegates available" when delegate selectors were configured at both the connector and step/stage/pipeline levels. Delegate selector precedence now works correctly, prioritizing step-level selectors over connector-level selectors. (**CDS-120333**, **ZD-110105**)
- Fixed an issue where runtime values for GitOps clusters and environment inputs were not being cleared correctly in GitOps stages. (**CDS-120345**, **ZD-109942**)
- Fixed an issue where auto-synced ArgoCD applications hung at the GitOps Sync step. The Sync step now detects already-running syncs (manual or auto-syncs) and tracks those syncs accurately. (**CDS-120358**, **ZD-110163**)

### Version 1.137.0

#### New features and enhancements

- AWS connector validation no longer requires the `ec2:DescribeRegions` IAM permission when the feature flag `CDS_AWS_DESCRIBE_REGIONS_OPTIONAL` is enabled. Harness switches to `sts:GetCallerIdentity`, which requires no IAM permissions. Requires delegate version 889xx or later. Contact [Harness Support](mailto:support@harness.io) to enable. (**CDS-92587**)

- Terraform output fields marked as `sensitive = true` in your `main.tf` file are now automatically masked in the pipeline **Output** tab during a [Terraform Apply](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step#mask-sensitive-terraform-outputs) step execution. Non-sensitive outputs continue to appear as plain text, and sensitive outputs remain accessible in downstream steps using standard Harness expressions. (**CDS-83382**)

#### Fixed issues

- Fixed an issue where connector validation and pipeline Git operations failed in multi-account AWS setups when a Git connector and its secret manager used different delegate selectors pointing to delegates in separate AWS accounts. The secret manager's delegate selector now takes precedence over the connector's delegate selector, ensuring the chosen delegate can decrypt secrets before Git operations proceed. This fix is behind the feature flags `PIE_GITX_EVALUATE_ENCRYPTED_CAPABILITIES` and `CDS_SECRET_MANAGER_DELEGATE_SELECTOR_PRECEDENCE`. Contact [Harness Support](mailto:support@harness.io) to enable. (**CDS-118093**, **ZD-100682**)
- Fixed an issue where a direct connector secret reference with an incorrect value caused all secrets to fail rendering in `values.yaml` during Native Helm deployments. (**CDS-119546**, **ZD-105341**)
- Fixed an issue where Canary verification failed with "verification could not complete due to an unknown error." Prometheus queries were generated with `by (null)` during Canary verification because metrics lacking a `serviceInstanceFieldName` were silently included in the deployment data collection. A null guard has been added in `formGroupByQuery()` along with a filter in `PrometheusDataCollectionInfoMapper` to exclude metrics without a `serviceInstanceField`. (**CDS-119650**, **ZD-106048**)
- Fixed an issue where environment group selection was broken. (**CDS-119736**, **ZD-109324**)
- Fixed an issue where the "Get List of Executions" API documentation had undocumented or inconsistent request filters, including a missing required `filterType`, ambiguous branch fields, and a broken status enum/type. (**CDS-119814**, **ZD-104905**)
- Fixed an issue where the Jenkins trigger stage intermittently failed because the Harness pipeline did not receive the Jenkins success status. (**CDS-119843**, **ZD-106159**)
- Fixed an issue where non-default branches were not accessible for monitored service templates. (**CDS-119852**)

## March 2026

### Version 1.136.0

#### New Features and Enhancements

- Harness now supports a **Waiting for User Action** notification event for both pipeline-level and centralized notifications. A notification is sent whenever a pipeline pauses for user input, such as an Approval step, Manual Intervention, or runtime execution input.

- Harness now supports **ECS Scheduled Actions** as a new manifest type (`EcsScheduledActionDefinition`) in ECS Service deployments, enabling you to define time-based auto-scaling policies. This feature is behind the feature flag `CDS_ECS_SCHEDULED_ACTIONS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

#### Fixed issues

- Fixed an issue where the Harness Terraform Provider validated AWS Secrets Manager connectors using the executing delegate's IAM role instead of respecting the connector's configured delegate selector. In multi-account AWS setups with environment-level IAM isolation, running `terraform apply` from an automation delegate in one account caused connector validation to fail with an `AccessDenied` error because the automation delegate lacked cross-account trust to assume the target environment's role — even though testing the same connector in the Harness UI succeeded by routing to the correct delegate. Connector validation now respects the delegate selector configured on the connector, routing validation requests to the appropriate delegate and preserving IAM isolation across accounts. This fix is behind the feature flag `PIE_GITX_EVALUATE_ENCRYPTED_CAPABILITIES`. (**CDS-118093**, **ZD-100682**)
- Fixed an issue where logs for the Kubernetes rollout deployment step stopped streaming in the Harness UI while the rollout was still in progress. The step appeared stuck with no new log output, even though the underlying rollout continued on the cluster. Log streaming now remains active throughout the rollout step until it completes or times out. (**CDS-119456**, **ZD-105726**, **ZD-106000**)
- Fixed an issue where the Harness deploy step intermittently failed when copying an artifact. A locally cached artifact could be reused even when its size did not match the expected size, leading to corrupted or incomplete artifact transfers. The step now validates that the cached artifact size matches the expected size before reuse, falling back to a fresh download on mismatch. (**CDS-119737**, **ZD-105015**)
- Fixed an issue where the Google Cloud Run step did not accept Docker connectors as a runtime registry connector. Users who configured a Docker connector for the registry received a validation error. The step now supports the Docker connector type for runtime registry configuration. (**CDS-119769**, **ZD-108876**)
- Fixed an issue where the Istio **Traffic Shift** step in Kubernetes Blue/Green deployments silently dropped `destination.port` values from the generated VirtualService patch. The INHERIT configuration path rebuilt route destinations using only `host` and `weight`, discarding any port defined in the step inputs or on the cluster's existing VirtualService. Port is now preserved using a combined lookup from the cluster resource and step configuration, with step input taking precedence. (**CDS-120027**, **ZD-105736**)

### Version 1.135.2

#### New Features and Enhancements

- **Native Helm** deployments can now expose Harness values overrides to **service hooks** before Helm runs, so you can decrypt overrides (for example with SOPS) in a **Fetch files** post-hook. Overrides are written to a per-task directory; hooks can use `VALUES_OVERRIDE_DIRECTORY` or `$MANIFEST_FILES_DIRECTORY/values-overrides`, and optionally export `OVERRIDE_FILES` with comma-separated paths for additional YAML overrides. This requires delegate version `26.03.88700` or later and is behind the feature flag `CDS_HELM_IMPROVED_SOPS_SUPPORT_FOR_SERVICE_HOOKS`. For more information, go to [SOPS and values overrides in Native Helm service hooks](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-sops-overrides-service-hooks).

#### Fixed issues

- Fixed a UI issue where the **Skip Resource Versioning** checkbox appeared greyed out and unchecked when **Enable Declarative Rollback** was enabled. This was inconsistent with the documented behavior: when declarative rollback is on, resource versioning is not supported, so the UI should show Skip Resource Versioning as checked and disabled to make the effective behavior clear. The checkbox is now checked and disabled when Enable Declarative Rollback is enabled, so the UI correctly reflects that versioning is skipped in this case. (**CDS-118092**, **ZD-102047**)
- Fixed an issue where GitOps links in **Project Settings** returned a 404 error when opened from **Admin Settings** at project scope. Links under GitOps (for example, Agents, Clusters, Repositories) worked at account and organization scope from Admin Settings but failed when navigating into a project and selecting the same links. The missing redirection for project-level GitOps settings has been added, so these links now resolve correctly when accessed from Admin Settings. (**CDS-118353**)
- Fixed an issue where the Helm chart version dropdown for **Harness Artifact Registry (HAR)** OCI-based charts displayed versions in the wrong order. The OCI Distribution API returns tag names as unsorted strings, and versions were shown in lexicographical ascending order (for example, 0.1.0, 0.10.0, 0.2.0, 1.0.0), forcing users to scroll to the bottom to select the latest chart. The version list for HAR is now sorted in alphanumeric descending order so the newest versions appear first (for example, 1.0.0, 0.10.0, 0.2.0, 0.1.0). This sorting applies only to Harness Artifact Registry and does not affect other OCI Helm registries. (**CDS-118749**, **ZD-104284**)
- Fixed an issue where the EKS cluster list API used a hardcoded STS endpoint region (us-east-1) when listing clusters with a **cross-account AWS connector**. The STS AssumeRole call for assuming the cross-account role always targeted us-east-1 instead of the region specified by the user in the infrastructure configuration, which could cause failures or incorrect behavior in other regions. The API now uses the user-defined region for the STS endpoint when listing EKS clusters with a cross-account connector. Update your delegate to pick up this fix. (**CDS-119087**, **ZD-104755**)
- Fixed an issue where the **Deploy to environment or infrastructure in parallel** checkbox appeared twice in the Run Pipeline UI when using environment groups. Incorrect parameters were passed for environment groups, causing the parallel-deploy field to be rendered in duplicate. The Run Pipeline form now receives the correct parameters, so the checkbox is shown only once. (**CDS-119757**, **ZD-105232**)

### Version 1.134.3

#### New Features and Enhancements

- Harness now supports a dedicated **ECS Scale** step that lets you scale ECS services up or down without running a full deployment stage. You can specify the target instance count or percentage, and optionally provide AWS connector, region, and cluster details at the step level or inherit them from the environment configuration. This feature requires delegate version `26.02.88503` or later. (**CDS-118048**)

- Harness now supports **Host Groups** for Physical Data Center (PDC) WinRM deployments, letting you assign independent WinRM credentials to different groups of hosts within a single infrastructure definition. This removes the previous limitation of a single shared credential and enables environments using Just Enough Administration (JEA) with distinct endpoint configurations per server group. This feature is behind the feature flag `CDS_ENABLE_INFRA_HOST_GROUPS`. Contact [Harness Support](mailto:support@harness.io) to enable it. (**CDS-115563**)

- Google Managed Instance Group (MIG) deployments now support **Google Cloud Storage** as a manifest source for storing MIG manifests and templates.

#### Fixed issues

- Fixed an issue where Jenkins build logs were not visible due to incorrect job URL construction. For multi-branch pipelines, branch names in the job URL were not encoded correctly, causing log retrieval to fail. The logic for constructing job URLs now directly uses the URL returned by Jenkins, which preserves the correct encoding for branch names. Update your delegate to pick up this fix. (**CDS-118936**,**ZD-104616**, **ZD-106159**)
- Fixed an issue where Artifactory connectors could not be used as a plugin connector reference. Users who needed to route plugin images through Artifactory instead of public Docker Hub had to work around this limitation by using a variable reference to define the connector, which prevented the UI from displaying it and broke connector dependency tracking. Artifactory connectors are now accepted as valid plugin connector references. (**CDS-118978**)
- Fixed an issue where the Update Release Repo and Merge PR steps took significantly longer than expected, impacting deployment times. For large repositories, these steps were slow even after the delegate received the task. The performance of these steps has been optimized to reduce execution time. This fix is behind the feature flag `CDS_GITOPS_DELEGATE_USE_SCM_FOR_COMMIT`. Contact [Harness Support](mailto:support@harness.io) to enable it. (**CDS-119144**, **ZD-104872**)

### Version 1.133.5

#### Fixed issues

- Fixed an issue where output variables captured from PowerShell Shell Script steps did not preserve newline characters (`\r\n` / `\n`). Multi-line strings set via `$env:varName` in PowerShell were flattened to a single line when referenced downstream (for example, in Approval step messages), while the equivalent Bash step using `export` preserved newlines correctly. The delegate's output variable capture mechanism for PowerShell now retains newline characters, bringing behavior in line with Bash Shell Script steps. (**CDS-118883**, **ZD-104328**)
- Fixed an issue where the Azure Create ARM Resource provisioning step failed with an `IllegalStateException: Unexpected token to begin object deserialization: STRING` error during JSON deserialization. The step could not process valid ARM templates that deployed successfully through the Azure CLI. The deserialization logic now correctly handles the ARM template and parameter formats returned by the Azure API. (**CDS-118917**, **ZD-104638**)
- Fixed an issue where creating a service override for a specific environment failed with an "Oops, something went wrong on our end" error in the UI and timed out via the Terraform provider. This occurred when a project was deleted and recreated — orphaned records from the original project caused a `DuplicateKeyException` in MongoDB during the upsert operation. The service override upsert logic now correctly handles pre-existing records from previously deleted projects. (**CDS-119084**, **ZD-104999**)
- Fixed an issue where the OCI Helm connector with anonymous authentication failed to fetch charts with an `invalid_reference: invalid repository` error. The internal URL construction added an extra trailing slash to the repository URL, producing a malformed OCI reference (for example, `oci://ghcr.io:443//chartpath` instead of `oci://ghcr.io:443/chartpath`). The connector now correctly constructs repository URLs without the extra slash. Update your delegate to pick up this fix. (**CDS-119172**, **ZD-105268**)

## February 2026

### Version 1.132.4

#### Fixed issues

- Fixed an issue where Harness dashboards failed to load data, returning a PostgreSQL error when attempting to retrieve dashboard information. (**CDS-117508**, **ZD-97705**)
- Fixed an issue where saving a freeze window with email notifications configured in delegate mode failed with a YAML validation error. The UI-generated YAML for delegate selectors was incorrectly formatted, causing the save operation to fail even though no manual YAML edits were made. (**CDS-118870**, **ZD-104033**)

### Version 1.131.0

#### Breaking changes

- **Google MIG Blue-Green deployment updates**: All Blue-Green deployment plugin images have been updated from `0.0.1` to `0.1.0`. This release includes the following changes:
  - The `targetSize` field in the Blue-Green Deploy step no longer defaults to `1`. If not specified, Harness automatically fetches the current instance count from the stable MIG and applies it to the stage MIG. If an autoscaler is configured, the autoscaler controls the final instance count. Existing pipelines with an explicit `targetSize` value are not affected.
  - A new `downsizeOldMig` flag is available in the Google MIG Traffic Shift step. When enabled, Harness scales the old MIG to zero instances after the label swap at 100% traffic shift, optimizing costs by removing unused instances. Associated autoscalers are managed automatically during the downsize operation.
  - The `GoogleMigBlueGreenDeployOutcome.rollbackData.deploymentMetadata.stage.instanceTemplate` output now refers to the pre-deploy version of the instance template instead of the deployed one. To reference the currently deployed instance template, use `GoogleMigBlueGreenDeployOutcome.stageTemplate`.
  
  For more details, go to [Blue-Green Deployment for MIG](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/mig/mig-blue-green-deployment).

#### Fixed issues

- Fixed an issue where Harness ASG deployments did not fail when an AWS instance refresh was manually moved to a rollback state (e.g., `RollbackInProgress`) from the AWS Console. Although Harness detected the rollback state in the execution logs, it continued the deployment instead of treating it as a failure condition. Harness now correctly fails the deploy step when an externally initiated rollback is detected during an instance refresh. (**CDS-118529**, **ZD-101769**)

### Version 1.130.4

#### Fixed issues

- Fixed an issue where the Jenkins step stopped working after upgrading to 2.516.1.28665. Added query params (tree) to Jenkins API calls to unblock API calls in the latest CloudBees Jenkins integration. (**CDS-117294**, **ZD-99947**)
- Fixed an issue where the WinRM service artifact source displayed every artifact as a Docker artifact in the UI. The artifact source template now shows the actual artifact type in the icon if the user has not provided a custom icon. (**CDS-117751**, **ZD-101243**)
- Fixed an issue where the tag dropdown was not populating with any tags generated in the last day. (**CDS-117808**, **ZD-101214**)
- Fixed an issue where Google Cloud Run deployments did not work on rerun when a service was scaled to zero. (**CDS-118269**)

### Version 1.129.5

#### Fixed issues

- Fixed an issue where delegates encountered 404 errors during deployment, specifically when attempting to locate pods that were no longer available after a canary deployment phase. The system now avoids retrying pod lookups for non-existent pods during the event phase, preventing unnecessary errors and improving deployment stability. (**CDS-117947**, **ZD-101883**)
- Fixed an issue where service tags were failing to load in the pipeline when deploying the scn-pdm service, preventing users from selecting a tag during deployment. This was due to an error retrieving tags from the artifact repository. A null check was added to return a 400 error instead of a 500 error when encountering an incorrect YAML configuration. (**CDS-118014**, **ZD-101621**)
- Fixed an issue where the Service Deployment GitOps step failed when the `agentIdentifier` was not explicitly provided in the GitOps cluster configuration. The step now correctly utilizes the `agentIdentifier` passed in the environment, restoring previous functionality and preventing errors such as "No G..." when deploying. (**CDS-118321**, **ZD-102880**, **ZD-103034**)

## January 2026

### Version 1.128.1

#### New Features and Enhancements

- Harness now supports Blue-Green deployments to [**Google Cloud Platform Managed Instance Groups**](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/mig). Deploy GCP VM workloads with zero downtime, gradual traffic shifting using Cloud Service Mesh, and instant rollback. (**CDS-114547**)

- Harness now supports **multi-account deployments for AWS CDK**, allowing you to deploy to different AWS accounts using a single connector by overriding the region and assuming a different IAM role at the step level. (**CDS-114915**)

- Harness now supports **GCP connector credentials for Terraform steps**, enabling authentication with Google Cloud Platform using Manual Credentials, Inherit From Delegate, or OIDC Authentication methods. This feature requires delegate version 88303 or later. (**CDS-115648**)

- Harness now supports **cross-project access for Google Cloud Operations health sources**. You can now specify a GCP Project ID to query metrics and logs from a different project than your connector's default, eliminating the need to create separate connectors for each GCP project. (**CDS-114447**)

#### Fixed issues

- Fixed an issue where nexus connector experiencing 504 errors due to socket exhaustion potentially related to `http/2 → http/1.1` traffic handling. Added env variable to `DISABLE_NEXUS_DOCKER_V2_CATALOG`, `DISABLE_NEXUS_DOCKER_ARTIFACT_VALIDATION`, and `MAX_BUILD_NEXUS_TRIGGERS` to restrict the api calls to `/v2/_catalog`. (**CDS-118102**, **ZD-101720**, **ZD-102180**)

### Version 1.127.0

#### New Features and Enhancements

- **Harness Artifact Registry now supported as an artifact source** for all CD deployment types (except Helm). HAR provides native integration for both container images and packaged artifacts (Maven, npm, NuGet, generic). For more information, go to [Harness Artifact Registry](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#harness-artifact-registry).

- Continuous Verification now supports custom webhook notifications for verification sub-tasks, providing real-time updates on data collection, analysis, and verification status with correlation IDs for event tracking. This feature is behind the feature flag `CDS_CV_SUB_TASK_CUSTOM_WEBHOOK_NOTIFICATIONS_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable it. For more information, go to [Sub-Task Notifications](/docs/continuous-delivery/verify/configure-cv/verify-deployments#sub-task-notifications).

#### Fixed issues

- Fixed an issue where sensitive information was being stored in ConfigMaps within Kubernetes clusters, making it potentially accessible to unauthorized users with cluster view access. To resolve this, the release history storage logic has been updated to store release history in Secrets when pruning is enabled, providing a more secure storage mechanism. Currently, this fix is governed by the feature flag `CDS_STORE_PRUNING_RELEASE_HISTORY_IN_SECRET`. Contact [Harness Support](mailto:support@harness.io) to enable it. (**CDS-117631**)
- Fixed an issue where navigating between search results in pipeline execution logs would scroll to the log row but not to the precise location of the highlighted match. For log lines with content extending beyond the visible area, users had to manually scroll to locate the highlighted text; the search now automatically scrolls the highlighted match into view, ensuring visibility regardless of its position within long log lines. (**CDS-117728**, **ZD-101156**)
- Fixed an issue where the environment service override API displayed a misleading error when Environment YAML was stored on a non-default Git branch. The error incorrectly stated the file was missing from the master branch, even though it existed on the selected branch. (**CDS-117803**, **ZD-101368**)

### Version 1.126.2

#### Fixed issues

- Fixed an issue where the service dashboard displayed an incorrect instance count in the final detail view compared to the summary rows when GitOps was enabled. (**CDS-117222**, **ZD-99969**)

### Version 1.125.4

#### New Features and Enhancements

- Continuous Verification now supports custom webhook notifications for verification sub-tasks, enabling real-time monitoring of data collection, analysis, and verification results. Notifications include correlation IDs for tracking related events and can be delivered via Platform or Delegate with custom headers support. This feature is behind the feature flag `CDS_CV_SUB_TASK_CUSTOM_WEBHOOK_NOTIFICATIONS_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable it. For more information, go to [Sub-Task Notifications](/docs/continuous-delivery/verify/configure-cv/verify-deployments#sub-task-notifications).

#### Fixed issues

- Fixed an issue where the *Deploy to All* setting appeared as an unsaved change in the UI, even after being initially set. (**CDS-116815**, **ZD-72196**, **ZD-98671**)
- Fixed an issue where the *Services* page for some customers loaded very slowly on the first visit. The initial loading time has been significantly improved, even with a large number of services. (**CDS-116985**, **ZD-99097**)
- Fixed an issue where the Fetch Linked App step didn't provide details about why applications were filtered out, making it difficult to troubleshoot linked service configurations with agent identifier mismatches. Logs now include information about applications filtered out due to agent identifier mismatches, improving troubleshooting. (**CDS-117383**, **ZD-100157**)
- Fixed an issue where artifact paths were not being listed for artifacts configured with the production Artifactory instance, preventing users from selecting the correct artifact during runtime. (**CDS-116713**, **ZD-98601**)
- Fixed an issue where the *Create Github Repo* step failed with an error when used within an insert step in a templated pipeline, preventing users from templating approval flows. (**CDS-117231**, **ZD-99763**)

:::info
Wondering where version 1.122.xx, 1.123.xx and 1.124.xx are? Those releases was rolled into 1.125.xx and upgrades will skip directly from 1.121.xx to 1.125.xx. Don't worry, you're not missing a thing!
:::
