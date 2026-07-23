## July 2026

### Pipeline service 1.198.2

#### New features and enhancements

- Harness now detects **barrier reference cycles** and enforces unique barrier references within a stage or step group, preventing circular barrier dependencies that could deadlock a pipeline. The Barrier step documentation has also been revamped, including guidance on using multiple barriers and barriers within looping strategies. This validation is behind the feature flag `PIPE_DETECT_BARRIER_CYCLES`. Contact [Harness Support](mailto:support@harness.io) to enable. Go to [Synchronize deployments using barriers](/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/synchronize-deployments-using-barriers) to configure barriers. (**PIPE-34524**)

- Harness now provides an **Executions Management page** with account-level visibility into all queued and running pipeline executions. You can see where queued executions sit in the queue, monitor running executions through the **Status** column, and abort executions you no longer need. This feature requires the feature flag `PIPE_QUEUED_PIPELINE_OBSERVABILITY`. Contact [Harness Support](mailto:support@harness.io) to enable. Go to [Executions Management](/docs/platform/pipelines/executions-and-logs/executions-management) to learn more. (**PIPE-34977**)

#### Fixed issues

- Fixed an issue where a Kubernetes deployment pipeline timed out after the Apply step because the wait-for-steady-state task progress was not shown in the UI. The progress display could stall when the Apply step's command unit progress update arrived after the wait-for-steady-state update, due to network delays and a race in the underlying database updates. Harness now adds timestamps to the delegate messages so task progress is reported correctly. (**PIPE-34973**, **ZD-112099**)
- Fixed an issue where the Policy tile did not appear under account-level Security and Governance settings, which prevented users from enabling policies. (**PIPE-35694**, **ZD-118733**)
- Fixed an issue where changes made to a pipeline YAML in a Bitbucket repository were not reflected in Harness because the cached copy did not refresh. This fix requires the feature flag `PIPE_DISABLE_BITBUCKET_SERVER_GITX_WEBHOOK_GIT_SUFFIX_MATCH`. Contact [Harness Support](mailto:support@harness.io) to enable. (**PIPE-35731**, **ZD-118862**)
- Fixed an issue where a pipeline execution ID that began with a hyphen was interpreted as a command-line flag and caused evidence upload commands to fail. Harness now ensures execution IDs do not start with a hyphen. (**PIPE-35734**)
- Fixed an issue where steps in a matrix strategy displayed logs from only a single iteration. This fix is behind the feature flag `PIPE_ENABLE_STRATEGY_FOR_CHAINED_PIPELINE`. Contact [Harness Support](mailto:support@harness.io) to enable. (**PIPE-35726**)

### Pipeline service 1.197.1

#### New features and enhancements

- Harness now supports **DAG (Directed Acyclic Graph) pipelines (Beta)**, which let you define explicit dependencies between stages instead of relying on sequential or parallel stage order. Each stage declares the stages that must complete before it starts through the `dependsOn` field, so independent execution paths progress as soon as their own dependencies finish. This feature is in beta and requires the feature flag `PIPE_ENABLE_DEPENDENCY_BASED_EXECUTION`. Contact [Harness Support](mailto:support@harness.io) to enable. Go to [DAG pipelines](/docs/platform/pipelines/dag-pipelines) to configure dependency-based execution.

- Pipeline chaining now supports looping strategies when a parent pipeline calls a child pipeline, so you can run a child pipeline multiple times across a matrix or repeat configuration. Go to [Pipeline chaining](/docs/platform/pipelines/pipeline-chaining) to run a child pipeline in a loop.

- Matrix looping strategies now evaluate `exclude` conditions at the beginning of the loop, so excluded combinations are removed before iterations start rather than skipped during execution. Go to [Matrix looping strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) to configure matrix exclusions.

- Harness now documents the Bitbucket on-premise connector configuration for Self-Managed Platform (SMP). Go to [Bitbucket connector settings reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/bitbucket-connector-settings-reference) to configure a Bitbucket on-premise connector.

- Harness now documents the behavior of the GitHub connector when it retrieves branches, including how to work with repositories that contain a large number of branches. Go to [GitHub connector settings reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference) to review connector configuration.

#### Fixed issues

- Fixed an issue where a rollback step failure prevented subsequent rollback steps configured with the `Always` condition from executing in a CD stage. All rollback steps with the `Always` condition now run regardless of a failure in a previous rollback step. (**PIPE-34274**, **PIPE-35612**, **ZD-115229**)
- Fixed an issue where a stage remained stuck in the running state after its execution failed, which blocked other executions at the resource constraint step. (**PIPE-35548**, **ZD-118196**)
- Fixed an issue where failure strategy behavior was incorrect when the `PIPE_CACHE_CURRENT_STATUS` feature flag was enabled. Leaf steps skipped their immediate parent step group when updating cached status, which broke the execution hierarchy and prevented step group failure strategies from managing retries correctly. (**PIPE-35336**)
- Fixed an issue where remote template responses did not include the `cache_response_metadata` field required to display Git Sync status. Templates now return this field for parity with pipelines. (**PIPE-35685**)

### Pipeline service 1.196.2

#### Fixed issues

- Fixed an issue where links redirected to the IDP view in the Harness UI. Added priority handling in one of the flows behind a feature flag. This fix requires the feature flag `PIPE_HONOR_PIPELINE_SDK_PRIORITY_IN_EXECUTION_URL`. Contact [Harness Support](mailto:support@harness.io) to enable. (**PIPE-33955**, **ZD-114059**)
- Fixed an issue where the values displayed under **Input Sets Applied** did not match the actual values consumed by the input set. (**PIPE-35102**, **ZD-115611**)
- Fixed an issue where the **Insert Stage** functionality behaved inconsistently. This fix requires the feature flag `PIPE_INSERT_STAGE_EXTENDED_SUPPORT`. Contact [Harness Support](mailto:support@harness.io) to enable. (**PIPE-35108**, **ZD-116644**)
- Fixed an issue where pipelines failed to deserialize `ExecutionWrapperConfig` step nodes during plan creation for CI stages using flexible templates with insert nodes. The issue did not reproduce when the pipeline was loaded from saved YAML. (**PIPE-35174**, **ZD-117029**)
- Fixed an issue where the retention period was not taking effect for the `cacheentities` collection. The conditional logic was not handled properly after the introduction of the `CDS_CUSTOMIZE_PIPELINE_TTL` feature flag. The flow has been corrected. (**PIPE-35283**, **ZD-114524**)
- Fixed an issue where pressing Enter in the body field of an Email step configured as a runtime input triggered pipeline execution instead of inserting a newline. (**PIPE-35407**, **ZD-117195**)
- Fixed an issue where the Pipeline Studio became unresponsive, and keyboard controls (arrow and number keys) in the execution view stopped working. This issue affected multiple CDK users. (**PIPE-35436**, **ZD-117645**)
- Fixed an issue where re-running a CI pipeline threw platform `ClassCastException` errors during orchestration. The system now prevents pipelines with identity plan nodes from being saved and added validation checks to avoid the "IdentityPlanNode cannot be cast to PlanNode" error. (**PIPE-35450**, **ZD-117853**)
- Fixed an issue where the pipeline template creation page continuously refreshed or flickered and did not load. (**PIPE-35504**, **ZD-117915**)

## June 2026

### Pipeline service 1.195.4

#### New features and enhancements

- Harness now supports **6-month retention for Policy as Code evaluation data**. Policy evaluation data is retained for a default period of 6 months. If your account has a pipeline data retention policy that exceeds 6 months, your Policy as Code evaluations retention automatically aligns with your pipeline retention window. Go to [Policy evaluations retention](/docs/platform/governance/policy-as-code/opa-evaluations-retention) to download evaluations for compliance or to request a custom retention period. (**PIPE-34221**)

#### Fixed issues

- Fixed an issue where a template's "referencing entities" have some wrong entries (referencing entity no longer has reference). If pipeline no longer references a template, it will be removed from referencing entities of template. Similarly, if pipeline starts referring a template, it will show up in referencing entities. (**PIPE-33491**, **ZD-111733**)
- Fixed an issue where api to list all templates in an organization is throwing an error. Added validation in auto create flow and blocked the creation. (**PIPE-34760**, **ZD-115536**)
- Fixed an issue with selecting the input list during step runtime. (**PIPE-35004**, **ZD-115945**)
- Fixed an issue where Harness did not strip `.git` from the repo URL while comparing two repo URLs. Blocked customers will now be able to see webhook events of a corresponding webhook. (**PIPE-35024**, **ZD-114997**)
- Fixed an issue where a pipeline continued executing after the user marked it as failed due to a missing interrupt check. This fix requires the feature flag `PIPE_FAIL_USER_MARKED_FAIL_ALL_INTERRUPT_WITHOUT_LEAF_NODES`. Contact [Harness Support](mailto:support@harness.io) to enable. (**PIPE-35074**, **ZD-116355**, **ZD-116823**)
- Fixed an issue where unable to create template from pipeline. This fix requires the feature flag `PIPE_PIPELINE_STAGE_PIPELINE_TEMPLATE`. Contact [Harness Support](mailto:support@harness.io) to enable. (**PIPE-35106**, **ZD-114977**, **ZD-116644**)
- Fixed an issue where reconcile errors persist for failure strategies after successful save. (**PIPE-35111**, **ZD-116644**)

### Pipeline service 1.194.1

#### New features and enhancements

- Harness now supports **template labels** for referencing template versions using semantic names instead of fixed version numbers. This feature requires the feature flag `PIPE_TEMPLATE_LABELS_FEATURE`. Contact [Harness Support](mailto:support@harness.io) to enable.

- Harness now supports **AND/OR logic for filtering pipeline executions by tags**, enabling **Matches Any** (OR) or **Matches All** (AND) filtering options.

#### Fixed issues

- Fixed an issue where users were unable to import a template into a pipeline from Bitbucket. (**PIPE-34247**, **ZD-114955**)
- Fixed an issue where rollback step failure prevented subsequent steps with the **Always** condition from executing in CD stages. The rollback was not showing the **On rollback** condition, and by default it was using **Always**. Harness has corrected this behavior. (**PIPE-34274**, **ZD-115229**)
- Fixed an issue where selecting parallel environments without choosing a value in the input set caused unsaved changes to appear when just viewing the YAML (from visual view). For parallel environments and environment groups, Harness now sets the **Use from Stage** or equivalent field to `false` in the pipeline input set. (**PIPE-34316**)
- Fixed an issue where users were unable to create a template from a pipeline. This fix requires the feature flag `PIPE_PIPELINE_STAGE_PIPELINE_TEMPLATE`. Contact [Harness Support](mailto:support@harness.io) to enable this feature flag. (**PIPE-35106**, **ZD-114977**, **ZD-116644**)

### Pipeline service 1.193.3

#### Fixed issues

- Fixed an issue where the Terraform provider returned a misleading "file already exists" error during concurrent pipeline creation with Git Experience. (**PIPE-33810**, **ZD-113331**)
- Fixed an issue where `parentEntityRepo` was incorrectly set as the template repo instead of the pipeline repo. To apply this fix, enable the feature flag `PIPE_DISABLE_PARENT_REPO_NAME_CONTEXT_POPULATION_FOR_TEMPLATE`. Go to [Harness Support](mailto:support@harness.io) to enable this flag. (**PIPE-33917**, **ZD-113413**, **ZD-114657**)
- Fixed an issue where deployments no longer displayed service runtime inputs under the inputs section of pipeline executions. (**PIPE-34769**, **ZD-115520**, **ZD-115608**)

### Pipeline service 1.192.6

#### Fixed issues

- Fixed an issue where the Terraform provider returned a misleading "file already exists" error during concurrent pipeline creation with Git Experience. (**PIPE-33810**, **ZD-113331**)
- Fixed an issue where deployments no longer displayed service runtime inputs under the inputs section of pipeline executions. (**PIPE-34769**, **ZD-115520**, **ZD-115608**)

### Pipeline service 1.191.2

#### New features and enhancements

- Cron triggers now support AND semantics for complex scheduling where both date range and day-of-week conditions must be satisfied simultaneously. For example, the cron expression `0 3 16-22 * 1` executes at 3:00 AM UTC only on Mondays between the 16th and 22nd of the month, enabling precise scheduling for monthly maintenance windows, deployment schedules, and compliance tasks. This feature requires the feature flag `PIPE_CRON_TRIGGER_AND_SEMANTICS`. Contact [Harness Support](mailto:support@harness.io) to enable. Go to [Schedule pipelines using cron triggers](/docs/platform/triggers/schedule-pipelines-using-cron-triggers/) to learn about cron syntax and AND semantics.

#### Fixed issues

- Fixed an issue where frequent error pages appear when navigating links in Harness. (**PIPE-33938**, **ZD-113744**)
- Fixed an issue where pipelines no longer send Git configuration to Policy as Code. This fix requires the feature flag `PIPE_DISABLE_OPA_GITCONFIG_NEW_BRANCH_FIX`. Contact [Harness Support](mailto:support@harness.io) to enable. (**PIPE-33953**, **ZD-114085**)

## May 2026

### Pipeline service 1.189.2

#### Breaking Changes

- PR triggers now require the linked Git connector to have API access enabled. Previously, PR triggers created with a connector without API access could successfully execute pipelines. Pipeline executions fail with an error if the connector does not have API access enabled. This change is currently behind the feature flag `PIPE_TRIGGER_SCM_FETCH_THROW_EXCEPTION` and will be automatically enabled for all accounts after a 14-day rollout period. Contact [Harness Support](mailto:support@harness.io) to enable it before the automatic rollout. (**PIPE-30746**)

#### Fixed issues

- Fixed an issue where a `waiting_for_user_action` event was not sent on retries due to a deduplication check that incorrectly bypassed retry handling. (**PIPE-32878**)
- Fixed an issue where triggers with a `pipelineBranchName` set on inline pipelines could cause remote templates to resolve from the trigger branch instead of the default branch. Validation now runs at trigger creation and at trigger execution time. (**PIPE-33744**, **ZD-112780**)
- Fixed an issue where duplicate Bitbucket webhook registrations were created during high-throughput trigger updates. (**PIPE-33758**, **ZD-112635**, **ZD-113174**)
- Fixed an issue where container steps would get stuck when ZTS denial occurred. This fix requires the feature flag `PIE_CONTAINER_STEP_ABORT_USE_UPSERT`. Contact [Harness Support](mailto:support@harness.io) to enable. (**PIPE-33814**, **ZD-113380**)

### Pipeline service 1.188.2

#### Fixed issues

- Fixed an issue where account-level templates displayed duplicate cards in the template listing and incorrectly marked multiple versions as Stable on the deletion page. The API response was sending duplicate items for the same template, preventing users from deleting any version through the UI. This fix requires the feature flag `PIPE_DISABLE_TEMPLATE_STABLE_VERSION_RACE_CONDITION_FIX`. Contact [Harness Support](mailto:support@harness.io) to enable. (**PIPE-32979**, **ZD-104816**, **ZD-109677**, **ZD-112187**)
- Fixed an issue where input set overlays did not update when variable values in referenced input sets were changed. (**PIPE-32995**, **ZD-110073**)
- Fixed an issue where when using parent level connector to create a remote pipeline, the reference is not showing up in connector references. Added the scope of connector correctly instead of defaulting it to project scope. (**PIPE-33441**, **ZD-110735**)
- Fixed an issue where users were unable to create overlay input sets. This fix requires the feature flag `PIPE_DISABLE_DEFAULT_STORE_TYPE_TO_INLINE_FOR_INPUT_SET_CREATE_CHECK`. Contact [Harness Support](mailto:support@harness.io) to enable. (**PIPE-33489**, **ZD-112054**)
- Fixed an issue where pipeline executions were noticeably slower (not in step details), possibly due to redis lock issues. (**PIPE-33703**, **ZD-112720**)

### Pipeline service 1.187.3

#### New features and enhancements

- A new dry run validation API endpoint lets you validate pipeline YAML changes while editing files in Git before committing them to your repository. The endpoint performs YAML schema validation, template expansion, and OPA policy evaluation without executing the pipeline. The endpoint is available at `POST /pipeline/api/v1/orgs/{org}/projects/{project}/dry-run`.

#### Fixed issues

- Fixed an issue where account-level templates displayed duplicate cards in the template listing and incorrectly marked multiple versions as Stable on the deletion page. The API response was sending duplicate items for the same template, preventing users from deleting any version through the UI. This fix requires the feature flag `PIPE_DISABLE_TEMPLATE_STABLE_VERSION_RACE_CONDITION_FIX`. Contact [Harness Support](mailto:support@harness.io) to enable. (**PIPE-32979**, **ZD-104816**, **ZD-109677**, **ZD-112187**)
- Fixed an issue where input set overlays did not update when variable values in referenced input sets were changed. (**PIPE-32995**, **ZD-110073**)
- Fixed an issue where users were unable to create overlay input sets due to an incorrect store type validation error. This fix requires the feature flag `PIPE_DISABLE_DEFAULT_STORE_TYPE_TO_INLINE_FOR_INPUT_SET_CREATE_CHECK`. Contact [Harness Support](mailto:support@harness.io) to enable. (**PIPE-33489**, **ZD-112054**)
- Fixed an issue where GitLab triggers failed with "HTTP Error Status (400 - Invalid Format) received. Unable to process JSON." When processing GitLab webhooks, Harness was fetching all enabled GitLab triggers across the entire account without repo-level filtering, causing scope resolution failures when any trigger had null or invalid org/project identifiers. (**PIPE-33612**, **ZD-112508**)
- Fixed an issue where template resolution failed during pipeline retry when the template was stored in a non-default Git branch. The resolution logic was using deprecated checks from legacy flow. This fix requires the feature flag `PIE_USE_LEGACY_GIT_ENTITY_INFO` to be disabled (inverted flag). Contact [Harness Support](mailto:support@harness.io) to disable. (**PIPE-29964**)

## April 2026

### Pipeline service 1.182.2

#### Fixed issues

- Improved error messaging when a Bitbucket connector hits API rate limits. Previously, rate-limit responses from Bitbucket surfaced as a generic `SCM request failed with: UNKNOWN` error. The SCM service now detects Bitbucket rate-limit responses and returns a clear error message indicating the rate limit has been exceeded. (**PIPE-32774**, **ZD-109415**)

### Pipeline service 1.181.2

#### Fixed issues

- Fixed an issue where HashiCorp Vault secrets with blank values produced a misleading error message stating the secret key path was invalid. When Vault returned a valid response with an empty string value, the error incorrectly read "Secret key path '...' is invalid" instead of indicating the actual problem. The error message now distinguishes between a missing or unreachable path and a path that resolves to an empty value, guiding users to check the secret's value in Vault. (**PL-69984**, **ZD-106017**)
- Improved error handling for a `NullPointerException` that could occur during pipeline execution. Under certain transient system conditions, an internal node failure surfaced as an unhandled NPE with no actionable details. The pipeline execution engine now catches this scenario and returns a meaningful error message. (**PIPE-32772**, **ZD-109378**)
- Fixed an issue where creating a remote template with a Git connector did not register the template as a reference on the connector. The connector's **References** tab now correctly lists remote templates that use it. (**PIPE-33397**, **ZD-110735**)
- Fixed an issue where a Barrier step inside an **Insert Step** (step template) in a child pipeline of a chained pipeline threw a `NullPointerException`. The barrier identifier was not resolved correctly in the chained pipeline execution context, causing `BarrierExecutionInstance` to be null. Barrier identifier resolution now propagates correctly through chained pipeline and step template contexts. (**PIPE-33169**, **ZD-110759**)
- Fixed an issue where saving a remote pipeline that used a Git connector backed by an AWS Secret Manager connector threw a `ClassCastException` (`java.lang.String cannot be cast to io.harness.encryption.SecretRefData`). The error occurred during secret reference resolution and surfaced as an unclear Java error instead of a meaningful validation message. The pipeline save flow now handles this scenario correctly and returns a user-friendly error. (**PIPE-33212**, **ZD-109620**)

### Pipeline service 1.179.0

#### Fixed issues

- Fixed an issue where the SCM service was unavailable for parsing webhook payloads. (**PIPE-32789**, **ZD-109306**)
- Fixed an issue where newly created version or template files in GitHub were not visible in the Harness UI, and auto-creation for templates was not working. (**PIPE-32938**, **ZD-109360**)
- Fixed an issue where GitX/GitSync did not handle a Git connector when the account-level Bitbucket URL was set to `https://bitbucket.org` without a workspace. As part of migrating `gitFileCache` to `repoURL`, the fallback has been removed since all records are now aligned with the new system. Cache upserts now use only `repoURL`. (**PIPE-33029**, **ZD-110158**)
- Fixed an issue where pipelines were being aborted unexpectedly by a system admin user. (**PIPE-33226**, **ZD-110865**, **ZD-111008**, **ZD-111013**)
- Fixed an issue where the compare pipeline executions view was hidden when unified UI styles loaded. (**PIPE-33237**)
- Fixed an issue where a direct connector secret reference with an incorrect value caused all secrets to fail rendering in `values.yaml` during Native Helm deployments. (**PIPE-33325**, **ZD-105341**)

### Pipeline service 1.178.1

#### Fixed issues

- Fixed an issue where barriers were stalling for 5 minutes. (**PIPE-32301**, **ZD-104566**, **ZD-104909**, **ZD-109528**)
- Fixed an issue where barriers were not working correctly. A barrier step with a skipped status could cause the barrier to be bypassed. (**PIPE-32701**, **ZD-105759**, **ZD-109743**)
- Fixed an issue where newly created version or template files in GitHub were not visible in the Harness UI, and auto-creation for templates was not working. (**PIPE-32938**, **ZD-109360**)

## March 2026

### Pipeline service 1.176.1

#### Fixed issues

- Fixed an issue where a failed pipeline execution remained stuck in a running state and could not be cancelled or aborted. The stalled execution continued to hold a resource constraint lock, blocking all subsequent deployments of the same service to the same environment due to queuing. Pipeline executions that reach a terminal state now correctly release resource constraints, and stuck executions can be force-aborted to unblock queued deployments. (**PIPE-32369**, **ZD-104970**, **ZD-105246**, **ZD-105761**)
- Fixed an issue where the **Barrier** step did not work correctly with looping strategies in concurrent stages. When two stages ran in parallel with a barrier in each, and one stage failed before reaching the barrier, the other stage skipped the barrier wait and continued execution instead of failing. The barrier now correctly detects when a paired stage has failed and propagates the failure to the waiting stage. (**PIPE-32701**, **ZD-105759**, **ZD-109743**)
- Fixed an issue where a pipeline execution remained stuck in an active state in the UI for over a week even though the backend had already marked it as succeeded. Attempting to abort the execution returned `Execution is already finished with status: [SUCCEEDED]`, and **Mark as Failed** was unavailable, leaving the execution in a stale state that could not be cleaned up from the UI. The auto-abort mechanism for stuck executions also did not remediate executions in this mismatched state. Execution state synchronization between the backend and the UI has been corrected, and the auto-abort process now handles these stale executions. (**PIPE-32702**, **ZD-109196**)
- Fixed an issue where the pipeline execution list did not display a clickable link to the commit ID in the trigger info column, even when the commit details were present in the execution trigger metadata. The trigger info cell now renders the commit ID as a hyperlink when commit information is available, making it easier to navigate directly to the source commit. (**PIPE-32799**, **ZD-105993**)
- Fixed an issue where the Harness UI crashed when interacting with input sets on a remote pipeline. Editing a trigger and selecting an input set for a specific pipeline caused the page to become unresponsive. The UI now handles input set loading for remote pipelines without crashing. (**PIPE-32837**, **ZD-109723**)

### Pipeline service 1.175.1

#### Fixed issues

- Fixed an issue where the pipeline's **Advanced Option** did not show the delegate selector configured in the pipeline template. For pipelines created from a template with a pipeline-level delegate selector (for example, `<+pipeline.variables.delegate>`), the template's Advanced Option displayed the value correctly, but the pipeline's Advanced Option sometimes did not—depending on template version—even though the underlying YAML was correct. Advanced context was not passed correctly to the UI when rendering the pipeline. The pipeline's Advanced Option now correctly reflects the delegate selector and other advanced settings from the template. (**PIPE-32408**, **ZD-105256**)
- Fixed an issue where the **Insert Step** in CD pipelines was incorrectly marked as failed (red) when no steps were injected. When the Insert Step injected zero steps, the execution logic did not handle empty executable responses and treated the step as failed even though there was no actual failure. The Insert Step now passes and displays green when no steps are injected. (**PIPE-32582**, **ZD-105701**)
- Fixed an issue where **nested Harness expressions** failed to resolve on the first execution but succeeded on retry. When using expressions such as `<+execution.steps.StepGroup.steps.Step.spec.environmentVariables>` where the referenced values (for example, environment variables) are themselves Harness expressions, the inner expressions were left unresolved on the first run. Resolution could halt partway due to concurrent modification while traversing map structures, so steps received raw expression syntax (for example, `<+...>`) and failed—for example, when Bash interpreted it as redirection. On retry, resolution used partially saved values and succeeded. Nested expression resolution now completes correctly on the first execution. (**PIPE-32599**, **ZD-106076**)

### Pipeline service 1.174.0

#### Fixed issues

- Fixed an issue where a failure to retrieve the execution graph from PostgreSQL caused unexpectedly long queue times for pipeline stages. During reruns, the system could fail to fetch the complete execution graph from the database, causing subsequent stages (such as a canary deployment stage) to stall in a queued state without an explicit queue step. Graph retrieval from PostgreSQL is now more resilient, preventing stages from stalling due to incomplete data. (**PIPE-32347**, **ZD-105168**)
- Fixed an issue where `json.select()` JEXL expressions did not resolve correctly inside pipeline notification templates, even though the same expressions worked in Shell Script steps. Expressions that used `json.select` with output variable references failed to evaluate in notification context. The expression evaluation logic in notification templates now correctly resolves `json.select()` expressions. (**PIPE-32372**, **ZD-104817**)
- Fixed an issue where pipeline executions triggered via Git triggers did not display Git details (codebase details) on the execution list page. Manually triggered executions showed the details correctly, but Git-triggered executions appeared without any codebase information. The execution metadata now correctly captures and displays Git details for trigger-based executions. (**PIPE-32483**, **ZD-105715**, **ZD-105993**, **ZD-106003**, **ZD-106057**, **ZD-106080**, **ZD-106101**)
- Fixed an issue where selective stage execution failed with a `NullPointerException` when the pipeline contained Insert Block (injected stage templates). Running a subset of stages produced an `INVALID_REQUEST` error with the message `Cannot invoke "YamlField.getNode()" because the return value of "YamlNode.getField(String)" is null`, giving no indication of the root cause. Selective stage execution now correctly handles pipelines that use Insert Block stages. (**PIPE-32512**, **ZD-105316**)
- Fixed an issue where Pipeline Studio displayed random strings in the UI, making the editor unusable. The stray text rendered over pipeline components and blocked normal interaction with the studio. The rendering logic has been corrected to prevent unintended strings from appearing in the Pipeline Studio. (**PIPE-32540**, **ZD-105914**)

### Pipeline service 1.173.1

#### Fixed issues

- Fixed an issue where pipeline executions failed with a `CIStageExecutionException: Unable to get secret information` error that displayed an obfuscated secret identifier, making it impossible to determine which secret was missing or misconfigured. The error message now includes the original secret name and scope, enabling users to quickly identify and resolve the issue. This fix is behind the feature flag `PIPE_DISABLE_THROWING_ENGINE_EXPRESSION_EVALUATION_EXCEPTION`. Contact [Harness Support](mailto:support@harness.io) to enable it. (**PIPE-31311**, **ZD-90976**)
- Fixed an issue where the execution URL in Git status checks from Custom stages always pointed to a CI module path, causing a blank page for accounts without a CI license. The status check URL is now module-agnostic and resolves to the correct pipeline execution page regardless of the licensed modules on the account. This fix is behind the feature flag `PIPE_USE_DYNAMIC_MODULE_TYPE_IN_BUILD_DETAILS_URL`. Contact [Harness Support](mailto:support@harness.io) to enable it. (**PIPE-31593**, **ZD-100070**)
- Fixed an issue where the `notification.errormessage` expression in notification templates caused the template engine to fall back to the default template, and using `default()` returned the literal string `"null"` instead of the specified fallback value. Special characters in the error message were breaking the YAML parser during expression evaluation. The error message is now parsed with a dedicated object mapper that handles special characters correctly. (**PIPE-32051**, **ZD-101534**, **ZD-104538**)
- Fixed an issue where the **Referencing Entities** button for organization-level step templates showed "no references found" even when references existed, and the **Compare Versions** feature failed to load the comparison side with a "template does not exist or has been deleted" error despite the version being valid. Both features now correctly resolve template references and version metadata across scopes. (**PIPE-32351**, **PIPE-32353**, **ZD-104288**)
- Fixed an issue where files uploaded via the File Upload step remained downloadable for up to 7 days after deletion through the API or UI, due to a soft-delete policy on the underlying GCS bucket. Deleting an uploaded file now removes it from storage immediately, so it is no longer accessible for download after a successful delete operation. Note that the GCS bucket has a 37-day lifecycle rule — files that are not explicitly deleted are automatically removed after 37 days. (**PIPE-32337**, **ZD-104827**)

## February 2026

### Pipeline service 1.172.0

#### Fixed issues

- Fixed an issue where the **Triggered by** column in the pipeline executions list displayed a generic `Webhook(<id>)` label instead of the configured trigger name after adding a CI stage to an existing CD pipeline. The trigger name now displays consistently regardless of the stage types present in the pipeline. (**PIPE-31572**, **ZD-100883**)
- Fixed an issue where `send status back to git` does not publish commit status when the pipeline is triggered via the Harness code trigger in custom stages. Status handling was missing in the Harness code repository because it lacks a connectorRef. Added proper handling for the code repository. (**PIPE-31736**, **ZD-100597**)
- Fixed an issue where executing a pipeline directly from an input set failed with a validation error for a required variable, even though the variable value was already populated. This was caused by an empty pipeline identifier being sent in the input set API call. (**PIPE-32073**, **ZD-102863**)
- Fixed an issue where the **Updated Time** column on the pipeline template's referencing entities tab displayed time in 24-hour format with an incorrect AM/PM suffix (for example, `14:11 PM`). The timestamp now uses a consistent and valid time format. (**PIPE-32114**, **ZD-104150**)
- Fixed an issue where the **Start** button in the Infra Workspace Template creation flow was unresponsive on prod2, preventing users from creating new templates. This occurred even though the workspace templates feature was GA and enabled for the account. (**PIPE-32258**, **ZD-103995**)
- Fixed a race condition where the built-in expression `<+project.identifier>` failed to resolve in time during parallel HTTP steps, causing a 400 error. The expression now resolves consistently across all parallel steps during pipeline execution. (**PIPE-32334**, **ZD-102702**)

### Pipeline service 1.171.0

#### Fixed issues

- Fixed an issue where the Service step in pipelines took significantly longer than expected to complete, sometimes exceeding five minutes for operations that typically finish in under 15 seconds. This inconsistent delay affected multiple services across different projects and produced no logs during the wait period. The root cause was in the wait-notify mechanism, which has been optimized for scenarios involving more than one `notifyId`. (**PIPE-31895**, **ZD-100546**)
- Fixed an issue where the "Enforce OAuth For Commits" setting incorrectly blocked pipeline saves for users with Bitbucket OAuth configured through a custom provider (Bitbucket Server). The enforce OAuth flow relied on the connector type (`BITBUCKET`) to fetch user OAuth profiles, but on-prem setups registered profiles as `BITBUCKET_SERVER`, preventing the correct profile from being matched. Users with Bitbucket OAuth configured can now successfully save pipelines when "Enforce OAuth For Commits" is enabled. (**PIPE-31586**, **ZD-95814**, **ZD-100787**)

### Pipeline service 1.170.0

#### Fixed issues

- Fixed an issue where bulk reconciliation of pipelines referencing shared templates and stored in remote repositories could fail. The error occurred when the system incorrectly attempted to access a "HARNESS" branch in the remote repository. Improved logging has been added to provide better visibility into the Git branch and repository being accessed during reconciliation. (**PIPE-31123**, **ZD-98783**)
- Fixed an issue where the account-level "Skip Git Webhook Registration" setting incorrectly restricted administrators from enabling or disabling Git webhooks. Administrators can now manage all Git webhooks, regardless of the "Skip Git Webhook Registration" setting, respecting their administrative permissions. (**PIPE-31922**, **ZD-102235**)
- Fixed an issue where the log viewer would unexpectedly jump to the bottom, interrupting users while reviewing logs during pipeline executions. The log viewer now maintains the user's scroll position when manually scrolling or when a log section is collapsed, preventing unwanted auto-scrolling behavior. (**PIPE-32017**, **ZD-101156**)

### Pipeline service 1.169.3

#### Fixed issues

- Fixed an issue where pipelines were intermittently becoming stuck and failing to proceed, impacting multiple customers. This fix ensures pipelines consistently progress through all stages as configured, resolving instances where execution stalled unexpectedly. (**PIPE-31510**, **ZD-100762**, **ZD-100766**, **ZD-100767**, **ZD-100768**, **ZD-100777**, **ZD-100778**, **ZD-100785**)
- Fixed an issue where validating Bitbucket Server (on-prem) connectors using Access Token authentication failed. This resulted in a "ClassCastException" error. Bitbucket Server connectors can now be successfully validated when using Access Token authentication. (**PIPE-31837**, **ZD-102262**)

## January 2026

### Pipeline service 1.168.5

#### New Features and Enhancements

- Harness now supports **Git-based pipeline YAMLs in Dynamic Stages**, allowing you to execute pipeline YAMLs stored in Git repositories in addition to inline and runtime-provided YAML. You can optionally specify a commit hash to use a specific version of the file. (**PIPE-30849**)

- Harness now supports a new **"Waiting for User Action" pipeline notification event**. You can configure pipeline notifications that are sent whenever a pipeline pauses for user input, such as approvals, manual interventions, or file uploads. (**PIPE-24734**)

- Harness has improved **trigger evaluation resilience**. A failure in one trigger no longer blocks or skips the evaluation of other triggers, ensuring all eligible triggers are evaluated independently when an event is received. (**PIPE-31331**)

#### Fixed issues

- Fixed an issue where a pipeline step's *When* condition was not re-evaluated on retry attempts after an initial evaluation failure. This could lead to the step incorrectly executing on a retry. Now, the *When* condition is always re-evaluated on each retry attempt, ensuring consistent and correct execution behavior. Currently, this fix is governed by the feature flag `PIPE_SKIP_EXECUTE_WHEN_CONDITION_ON_RETRY_STEP`. Contact [Harness Support](mailto:support@harness.io) to enable it.(**PIPE-31684**, **ZD-101561**)
- Fixed an issue where *send status back to git* does not publish commit status when pipeline is triggered via harness code trigger in custom stages. Status handling was missing in the Harness code repository because it lacks a connector reference. Added proper handling for the code repository. (**PIPE-31736**, **ZD-100597**)

### Pipeline service 1.166.3

#### Fixed issues

- Fixed an issue where child pipelines were incorrectly marked as failed and triggered failure notifications when the parent pipeline failed, even if the child pipeline completed successfully. This was due to the failure strategy propagating the parent pipeline's user-initiated failure status to the child pipeline. (**PIPE-30821**, **ZD-97666**, **ZD-99055**)
- Fixed an issue where pipelines were not correctly identified as CI or CD pipelines in the API and SDK, causing filtering and other operations based on module type to be inaccurate. (**PIPE-30921**, **ZD-98003**)
- Fixed an issue where interrupting a pipeline execution (for example, marking it as failed or expiring it) sometimes failed to stop all running tasks, leading to resource locking and potential pipeline stalls. The system now correctly handles these interruptions, ensuring all tasks are stopped and resources are released. This fix is behind the feature flag `PIPE_FAIL_USER_MARKED_FAIL_ALL_INTERRUPT_WITHOUT_LEAF_NODES`. Contact [Harness Support](mailto:support@harness.io) to enable it. (**PIPE-31334**, **ZD-99055**)
- Fixed an issue where pipelines failed to start with a generic error message when the pipeline YAML exceeded the size limit. A clear error message is now displayed indicating the size limit and suggesting mitigation steps. (**PIPE-31336**, **ZD-99604**, **ZD-100342**)
- Fixed an issue where pipelines were unexpectedly stuck and failing to proceed, preventing deployments from completing for some customers. (**PIPE-31510**, **ZD-100762**, **ZD-100766**, **ZD-100767**, **ZD-100768**, **ZD-100777**, **ZD-100778**, **ZD-100785**)

### Pipeline service 1.165.1

#### Fixed issues

- Fixed an issue where pipeline execution status was not being sent to Git, preventing users from monitoring pipeline progress within their Git repository. This was due to a Git connector configuration issue, which has now been resolved. (**PIPE-30761**, **ZD-97158**, **ZD-99034**)
- Fixed an issue where the repository list failed to populate when creating a new remote pipeline, requiring users to manually enter the repository name. (**PIPE-31217**, **ZD-98885**, **ZD-99375**, **ZD-99394**, **ZD-99657**, **ZD-99963**, **ZD-100020**)
