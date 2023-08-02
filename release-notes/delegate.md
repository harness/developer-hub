---
title: Delegate release notes
sidebar_label: Delegate
tags: [NextGen, "Delegate"]
date: 2023-07-18T10:00
sidebar_position: 14
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/delegate/rss.xml" />

Review the notes below for details about recent changes to Harness Delegate (NextGen SaaS). For release notes for Harness Self-Managed Enterprise Edition, go to [Self-Managed Enterprise Edition release notes](/release-notes/self-managed-enterprise-edition). Additionally, Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.

:::info note
Harness Delegate (NextGen SaaS) releases every two weeks. On the other hand, Harness NextGen & FirstGen SaaS Platforms releases are weekly. New features, early access features, and fixes for Harness NextGen & FirstGen SaaS Platform that do not require a new delegate version are included in the Harness Platform release notes. For NextGen Platform release notes, go to [Harness Platform release notes](/release-notes/platform). For FirstGen Platform release notes, go to [Harness SaaS Release Notes (FirstGen)](/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes).

Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features and fixes that these release notes describe may not be immediately available in your cluster. To identify the cluster that hosts your account, go to the **Account Overview** page. 
:::

## Latest - July 18, 2023, Harness version 79916, Harness Delegate version 79904

Harness NextGen release 79916 includes the following changes for the Harness Delegate.

### Deprecation notices

#### Helm 2

import Helmdep from '/release-notes/shared/helm-2-deprecation-notice.md'

<Helmdep />

#### Kustomize 3.4.5

import Kustomizedep from '/release-notes/shared/kustomize-3-4-5-deprecation-notice.md'

<Kustomizedep />


```mdx-code-block
<Tabs>
  <TabItem value="What's new">
```

- The Splunk connector has been enhanced to include support for Bearer Token. (OIP-598)

- The List Tokens API now supports listing all the personal access tokens or service account tokens in the account. The API has been enhanced as follows:
   1. If you have user management permissions, you can list all the Personal Access Tokens in your account. You can also filter tokens belonging to a user or filter only active tokens.
   2. If you have service account management permissions, you can list all the service account tokens in your account. You can also filter tokens for a service account or filter only active tokens. (PL-31870, ZD-40110)

```mdx-code-block
  </TabItem>
  <TabItem value="Early access">
```

- Harness added the ability to acquire only the configured maximum number of tasks. This allows Harness Manager to use the task capacity to determine whether to assign a task to the delegate or queue it. You can configure the maximum number of tasks using the Env variable `DELEGATE_TASK_CAPACITY`. For example, if you set `DELEGATE_TASK_CAPACITY` to a value of 2 and execute 6 tasks in parallel, Harness Manager executes only 2 tasks at a time. If you don't configure `DELEGATE_TASK_CAPACITY`, Harness Manager executes all 6 tasks in parallel. (PL-39351)

   This functionality is behind a feature flag, `DELEGATE_TASK_CAPACITY_CHECK`. When the feature flag is enabled, the task is broadcast every minute in Harness Manager until it expires.

  
```mdx-code-block
  </TabItem>
  <TabItem value="Fixed issues">
```

- Cron triggers artifact setting failed when modified regex did not match any build. (CDS-72589, ZD-46323)

  Harness initially modifies the regex to see if it matches any build. The trigger was failing if it did not match. Now, if the regex does not match any build, Harness will use the original regex.

- Artifactory artifact source **Artifact Name** regex value was not working correctly. (CDS-73150)

  Harness has added support for regex values for generic type Artifactory artifacts.

- The sort order on the pipelines list page was incorrect. (CDS-73216)

   Now, Harness supports case-insensitive sorting for pipelines, input sets, and pipeline executions.

- The `<+configFile.getAsBase64()>` expression not resolving correctly when the content had new lines. (CDS-73424)

  The issue occurred with newline characters while encoding config files. This is fixed and Harness now replaces newline characters with unicode.

- There was an error collecting metric data when encountering  `null` values returned by metric queries. (OIP-551)

   This issue has been resolved by ignoring null data points and using valid data points in the window.

- The Tokens list page returned a display error when tokens were present and there were multiple pages of results. (PL-36734)

  A code enhancement to reset the pagination on the Tokens list page after any token is deleted fixed this issue. Previously, if you deleted the last token on any page after the first page, the page displayed an empty result list.

- The `listDelegates` API failed when custom selectors were present in the delegate. (PL-39779)

   A code enhancement to update custom tags fixed this issue.

- The listing API failed with an `UnsupportedOperationException` when custom tags were present. Filter APIs failed with NPEs. (PL-39824)

   A code enhancement fixed these issues.

- The delegate token list result from the `DelegateTokenStatus` API endpoint displayed all values as `null`. (PL-39440)

   A code enhancement for the `DelegateTokenStatus` endpoint to return token values even when token details are not fetched by token name fixed this issue. Token values only populate when the user has edit delegate permission. If the user doesn't have edit delegate permission, the value remains `null`.

- The AWS connector widget's prefix field did not accept prefixes starting with a slash. Such slashes were stripped off, and this led to undesired behavior. (PL-39194, ZD-45104)

   Prefixes that begin with a slash are now supported.

- You could not create Azure Key Vault connectors in Harness NextGen even when you used the service principal credentials that successfully created Azure Key Vault connectors in Harness FirstGen. After you entered the service principal credentials, the Vault setup window stopped responding. After several minutes, the following message is displayed: `None of the active delegates were available to complete the task. ==> : 'Missing capabilities: [https:null.vault.azure.net]'` (PL-39783, ZD-46756)

   This issue is now fixed.

```mdx-code-block
  </TabItem>
  <TabItem value="Hotfix release">
```

## Hotfix version 79906

- Helm deployment steps timed out after the initial installation/upgrade phase, preventing the execution of a Helm rollback step. (CDS-73264)

   This issue is now fixed.

```mdx-code-block
  </TabItem>
</Tabs>
```

## Previous releases

<details>
<summary>Expand this section to view changes to previous releases</summary>

#### June 28, 2023, Harness version 79714, Harness Delegate version 79707

Harness NextGen release 79714 includes the following changes for the Harness Delegate.

##### What's new

- You can now see disconnected delegate details in selection logs and error messages when there are no eligible delegates in an active state to execute tasks. (PL-37900)

- The delegate JRE is upgraded to 11.0.19_7. (PL-37994)

- When a delegate token is revoked, Harness now sends `SELF_DESTRUCT` to all delegates that are using the revoked token. (PL-38957)

##### Early access

- Added a new field in the release history for Blue Green deployments to differentiate between environments. (CDS-69961)

  Enable the feature flag, `CDS_BG_STAGE_SCALE_DOWN_STEP_NG` to leverage this feature. 

  This is an enhancement to the Kubernetes Blue Green Stage Scale Down step. You can now scale down your last successful stage environment only if the primary resources exist. This enhancement helps you efficiently manage your resources, and prevent deleting the important resources.

  Make sure that the infrastructure definition of these resources and the Blue Green service are the same. This is necessary as Harness identifies resources from the release history, which is mapped to a release name. If you configure a different infrastructure definition, it might lead to scaling down important resources.

##### Fixed issues

- A project-level template crashed when opened. (CDS-71980, ZD-45950)

  The three hyphens, `---` used in the YAML as YAML document separator was being replaced by `---\n` with an empty string due to a logic in the code. This logic made the YAML invalid. 

  This issue is fixed by disabling `YAMLGenerator.Feature.WRITE_DOC_START_MARKER` in the YamlUtils to stop the YAML document separator `---` from being added to the YAML. 

- Fixed an issue where the applications created outside Harness were deleted during rollback if a Tanzu Application Services (TAS) Rolling deployment failed the first time. (CDS-71397)

- Pipeline execution failed when a variable whose required field is set to `TRUE` is passed as an expression. (CDS-71357, ZD-45615)

  Harness checks for the value of the variable whose required field is set to `TRUE`, and the pipeline failed if the value was empty. This issue occurred when Harness checked for the value of variables that were passed as expressions. The value of expressions cannot be resolved during pipeline creation. 

  This issue is fixed by ignoring the check for variables passed as an expression. 

- Creating a launch template for an AWS Auto Scale Group (ASG) deployment resulted in a null pointer exception. (CDS-71235)

  This issue is fixed by adding proper validation for the ASG launch template manifest content.

- Improved the error message for pipeline execution failures when running a pipeline that has nested [chained pipelines](/docs/platform/pipelines/pipeline-chaining/). (CDS-69578, ZD-44443)
- CloudFormation deployment failed with an unclear error message, `# Exception: Invalid request: Template format error: YAML not well-formed. (line 1, column 40) (Service: AmazonCloudFormation; Status Code: 400; Error Code: ValidationError; Request ID: 7685da0b-c14a-47e2-afe5-9e4ffde536c6; Proxy: null) while Updating stack: pipeline-demo.`. (CDS-68866, ZD-44165)

  When a multi-line string was passed as input for a child pipeline, the string was being converted to a single line. 

  This issue is fixed. Instead of passing data using YAML, Harness now uses JSON for data processing. This helps preserve multi-line strings and YAML structures properly to process pipeline YAML and user inputs. Enable the feature flag, `PIE_PROCESS_ON_JSON_NODE` to leverage this fix.

- Fixed an issue where the expression, `<+lastPublished.tag>.regex()` was not resolved properly when used as runtime input for artifacts. (CDS-68810)

- Quotations were added to execution YAML strings inconsistently when comparing pipeline YAMLs. (CDS-67637)

  This issue is fixed by enabling `MINIMIZE_QUOTES` for YamlUtils and YamlPipelineUtils classes. The compiled YAML no longer has quotations around strings where they are not needed, but only around numbers. Even if you had added quotations in the string values in the pipeline YAML, they'll be removed in the compiled YAML. Also, there won't be unnecessary audit trails where the diff only has quotations around strings.

- Account-level connectors with resource groups set to **Specified** were not available at the project-level. (PL-38828)

   This issue is now fixed. The connectors list shows the connectors for which users have resource group permissions set.

- The account-level **Session Timeout (in minutes)** allowed values greater than the 4320 minute maximum. (PL-32498)

   This issue has been resolved by adding a code validation. The field no longer accepts values above 4320 minutes.


#### June 9, 2023, Harness version 79516, Harness Delegate version 79503

Harness NextGen release 79516 includes the following changes for the Harness Delegate.

##### What's new

- Send emails to non-Harness users. (CDS-58625, ZD-42496)
  
  To send emails to non-Harness users, you must configure your own SMTP server and enable the **Enable Emails to be sent to non-Harness Users** default setting. This setting is available at Account, Org, and Project levels.

  For more information on how to send emails to non-Harness users, go to [Email step reference](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/email_step/).

- Converted Harness CD from an explicit to an implicit change source for Service Reliability Management. (SRM-14724)

##### Early access

- Scale down the last successful stage environment created by using a Blue Green Deployment strategy. (CDS-68527)
  
  This functionality is behind a feature flag, `CDS_BG_STAGE_SCALE_DOWN_STEP_NG`. 

  This functionality helps you efficiently manage your resources. The scale down step can be configured within the same stage or different stage based on your requirement.

  During scale down, the `HorizontalPodAutoscaler` and `PodDisruptionBudget` resources are removed, and the Deployments, StatefulSets, DaemonSets and Deployment Configs resources are scaled down. Make sure that the infrastructure definition of these resources and the Blue Green service are the same. This is necessary as Harness identifies resources from the release history, which is mapped to a release name. If you configure a different infrastructure definition, it might lead to scaling down important resources.

- Kubernetes deployments support `HorizontalPodAutoscaler` and `PodDisruptionBudget` for Blue Green and Canary execution strategies. (CDS-59011)

  This functionality is behind a feature flag, `CDS_SUPPORT_HPA_AND_PDB_NG`.

##### Fixed issues

- Enhanced handling and logging for the `No enum constant io.harness.delegate.message.MessengerType.WATCHEIN` exception to enable the actual malformed message. This error indicates that a message is malformed and only occurs when there is an error during writing, for example, out of disk, process killed, etc. (PL-38245)

- Unable to create SLO using SignalFX metrics. (OIP-406)

  This issue has been resolved. Now, SignalFX's health source supports SLI functionality, and you can create SLOs using SignalFX metrics.

- Fixed an issue where Harness was unable to retrieve the Git status or push updates to Azure repos with project names with white spaces. (CI-8105, ZD-44679)

  This issue is fixed.

- Spot Elastigroup deployments failed to fetch instance health and expired. (CDS-56451, ZD-41436)
  
  Harness improved the handling mechanism for the Spot `instanceHealthiness` API to fix this issue.

- A force delete option appeared when deleting a template referenced by another template. This deleted the referenced template, but the remaining versions were no longer visible on the UI. (CDS-68683)
  
  Added additional test coverage for some workflows to resolve this issue.

- Fixed an issue where error logs were removed to stop error flooding into GCP logs when Git authentication fails. (CDS-68760)

- Fixed an issue where strings were interpreted as scientific notations. (CDS-69063, ZD-44206)

- Input values needed in steps or stages for execution failed with the error: `Cannot update execution status for the PlanExecution [execution Id] with RUNNING`. (CDS-69342, ZD-44344)
  
  This error occurred when converting YAML to JSON. A code enhancement fixed this issue. With this enhancement, quotes inside the field YAML are escaped, resulting in valid YAML.

- The pipeline execution error message for YAML related errors was unclear. (CDS-69576)
  
  Improved error message handling for YAML processing failures. The error message now display files that contain errors and points to the problematic part of the file. 

- Bamboo triggers were not working properly. (CDS-69605)
  
  Adding the Bamboo build to the delegate response resolved this issue. 

- Certificate issues in Harness Delegate version 23.05.79307. (CDS-70410, ZD-45105, ZD-45110, ZD-45128)
  
  The HTTP step was failing due to absence of the `certificate` value in the step. In previous delegate versions, the delegate would bypass the absence of this field. However, in delegate version 23.05.79307, this field was incorrectly set as mandatory for HTTP step execution for validations against servers that had self-signed certificates. This issue is fixed.

- Fixed an issue where the `eventPayload` expressions were not resolving when rerunning a failed pipeline that was previously fired by using a trigger. (CDS-70559)

#### May 23, 2023, Harness version 79306, Harness Delegate version 79307

Harness NextGen release 79306 includes the following changes for the Harness Delegate.

##### What's new

- Added support to provide quartz cron expressions for scheduled triggers. (CDS-59261, CDS-59260)

- Added support for accessing connector attributes for Deployment Templates. (CDS-54247)
    
  The connector attributes for Secret Manager connectors can be accessed in Deployment Templates using the following expressions. 
  
  * [AWS KMS](/docs/platform/Secrets/Secrets-Management/add-an-aws-kms-secrets-manager): `<+infra.variables.AwsKms.spec.credential.type>`
  * [AWS Secrets Manager](/docs/platform/Secrets/Secrets-Management/add-an-aws-secret-manager): `<+infra.variables.AwsSecretsManager.spec.region>`
  * [Azure Key Vault](/docs/platform/Secrets/Secrets-Management/azure-key-vault): `<+infra.variables.AzureKeyVault.spec.vaultName>`
  * [Google KMS](/docs/platform/Secrets/Secrets-Management/add-google-kms-secrets-manager): `<+infra.variables.GcpKms.spec.keyName>`
  * [Google Cloud secret manager](/docs/platform/Secrets/Secrets-Management/add-a-google-cloud-secret-manager): `<+infra.variables.GcpSecMan.spec.credentialsRef.identifier>`
  * [Custom secret manager](/docs/platform/Secrets/Secrets-Management/custom-secret-manager): `<+infra.variables.CustomSecMan.spec.isDefault>`
  * [HashiCorp Vault](/docs/platform/Secrets/Secrets-Management/add-hashicorp-vault): `<+infra.variables.HashiCorp.spec.vaultUrl>`

- Git polling tasks for triggers are executed on the same delegate selector used in the Git connector. (CDS-58115)
  
  Previously, triggers used the round robin algorithm to select any available delegate within a project or account. Now, the delegate-based trigger polling selects the same delegate you used in the connectors for triggers. 

- The Azure Key Vault secret manager now supports creating secrets with expiration dates. Select **Expires On** to set a secret expiration date. (PL-32708, ZD-42524)

##### Early access

- New delegate metrics are available. This functionality is behind a feature flag, `DELEGATE_ENABLE_DYNAMIC_HANDLING_OF_REQUEST`. (PL-37908, PL-38538)

   Harness captures delegate agent metrics for delegates shipped on immutable image types. The following new delegate agent metrics are available with the feature flag:
  
   | **Metric name** | **Description** |
   | :-- | :-- |
   | `task_completed` | The number of tasks completed. |
   | `task_failed` | The number of failed tasks. |
   | `task_rejected` | The number of tasks rejected because of a high load on the delegate. |
   | `delegate_connected` | Indicates whether the delegate is connected. Values are 0 (disconnected) and 1 (connected). |
   | `resource_consumption_above_threshold` | Delegate cpu/memory is above a threshold (defaults to 80%). Provide `DELEGATE_RESOURCE_THRESHOLD` as the env variable in the delegate YAML to configure the threshold. |

   Enable the feature flag, `DELEGATE_ENABLE_DYNAMIC_HANDLING_OF_REQUEST` to use the new delegate agent metrics. When this feature flag is enabled, Harness will capture the metrics. For more information, go to [Configure delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics/).


##### Fixed issues

- Fixed an issue where the expressions of tags were not rendered properly. (CDS-68703, ZD-43797)

- Executions were failing with `Canary failed: [Canary Deployment failed - NoSuchMethodError: org.yaml.snakeyaml.constructor.SafeConstructor: method 'void <init>()' not found ]` error message. (CDS-68293, ZD-43753, ZD-43769)
  
  The Fabric8 library used by Harness is upgraded from version 5.x to 6.x. Harness was explicitly using snake.yaml version 2.x due to vulnerabilities present in the 1.x version.
  
  Harness' usages of Fabric8 library were throwing the above mentioned because Fabric8 library version 5.12.1 uses the old snake.yaml library version 1.x.

  Customers who were using the following were affected:
    - FirstGen Kubernetes deployments that contain Istio's VirtualService/DestinationRule objects.
    - FirstGen Traffic Split step.
    - FirstGen Native Helm deployments with Kubernetes cluster version 1.16 or earlier.
    - NextGen Kubernetes deployments that contain Istio's VirtualService/DestinationRule objects.
    - NextGen Native Helm deployments with Kubernetes cluster version 1.16 or earlier.

  This change does not create any behavioral changes.

- The access denied exception was saving the OAuth secret in the Harness Source Code Manager (SCM) user profile. (CDS-68144)
  
  This issue is fixed by passing the context correctly from the SCM service to the Git service.

- Pipelines with multi-level templates displayed Java errors because a secret was referenced by another secret. (CDS-68094)
  
  This issue is fixed in by improving the error messages.
  
- Fixed an issue by eliminating NPE during ASG pipeline execution. (CDS-59383)

- The Canary Delete step during rollback did not delete all canary resources when the forward Canary Delete step expired. The Canary Delete step uses Harness release history when the Canary Deployment step expires. An API call issue prevented Harness release history from being updated in time and available for the Canary Delete step during rollback. (CDS-58702)

   This issue has been resolved. The Canary Delete step now properly deletes canary workloads when the forward Canary Deployment step expires.

- Fixed an issue by adding support for retrying `sockettimeoutExceptions` as they can occur due to intermittent issues during a Kubernetes deployment. (CDS-57688)

- Invites to users fail with an unauthorized error while RBAC setup is still in progress. (PL-32117)

  A polling system ensures that RBAC setup has been completed.

- Custom Secret Manager creation does not consider the delegate selector. (PL-32260)

  In Custom SM configuration, decrypting secrets using the SSH connection to validate delegate selection fixed this issue.

- Deployments consistently failed during the same stage. (PL-38247, ZD-42721)

   This issue was fixed by updating the delegate YAML. Delegate startup now fails when you use a legacy delegate image with an immutable delegate.


#### April 22, 2023, Harness version 79111, Harness Delegate version 79106

Harness NextGen release 79111 includes the following changes for the Harness Delegate.

##### What's new

- Added the following metrics for immutable delegates that you can scrape via Prometheus: (DEL-5363)

    - io_harness_delegate_connected
    - io_harness_delegate_disconnected 

- Upgraded the following libraries: (DEL-6069)

    - org.yaml:snakeyaml from 1.33 -> 2.0
    - com.fasterxml.jackson.core:jackson-annotations from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.core:jackson-core from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.dataformat:jackson-dataformat-cbor from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.dataformat:jackson-dataformat-smile from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.dataformat:jackson-dataformat-xml from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.dataformat:jackson-dataformat-yaml from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.datatype:jackson-datatype-guava from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.datatype:jackson-datatype-jdk8 from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.datatype:jackson-datatype-joda from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.datatype:jackson-datatype-jsr310 from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.jaxrs:jackson-jaxrs-base from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.jaxrs:jackson-jaxrs-json-provider from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.jaxrs:jackson-jaxrs-yaml-provider from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.module:jackson-module-afterburner from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.module:jackson-module-jaxb-annotations from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.module:jackson-module-jsonSchema from 2.13.4 -> 2.14.2
    - com.fasterxml.jackson.module:jackson-module-parameter-names from 2.13.4 -> 2.14.2
    - io.kubernetes:client-java-api from 16.0.0 -> 18.0.0
    - io.kubernetes:client-java-extended from 16.0.0 -> 18.0.0
    - io.kubernetes:client-java-proto from 16.0.0 -> 18.0.0
    - io.kubernetes:client-java from 16.0.0 -> 18.0.0
    - io.kubernetes:client-java-api-fluent from 16.0.0 -> 18.0.0
    - org.springframework.boot:spring-boot-autoconfigure from 2.1.6.RELEASE -> 2.7.10
    - org.springframework.boot:spring-boot-loader from 2.4.5 -> 2.7.10
    - org.springframework.boot:spring-boot-starter-batch from 2.1.6.RELEASE -> 2.7.10
    - org.springframework.boot:spring-boot from 2.3.2.RELEASE -> 2.7.10

- Added APIs to enable auto upgrading with custom delegate images. (DEL-6183)

    - `SupportedDelegateVersion` returns the maximum delegate version number to install.
    - `overrideDelegateImageTag` changes the tag the upgrader uses to upgrade delegates when auto upgrade is on.

- Upgraded the following libraries: (DEL-6198)

    - org.springframework:spring-aop from 5.3.23 -> 5.3.26
    - org.springframework:spring-beans from 5.3.25 -> 5.3.26
    - org.springframework:spring-context from 5.3.25 -> 5.3.26
    - org.springframework:spring-core from 5.3.25 -> 5.3.26
    - org.springframework:spring-expression from 5.3.25 -> 5.3.26
    - org.springframework:spring-jcl from 5.3.25 -> 5.3.26
    - org.springframework:spring-messaging from 5.3.25 -> 5.3.26
    - org.springframework:spring-test from 5.3.25 -> 5.3.26
    - org.springframework:spring-tx from 5.3.25 -> 5.3.26
    - org.springframework:spring-web from 5.3.25 -> 5.3.26

##### Early access

This release does not include any early access features.

##### Fixed issues

- Added WebSocket reconnect logic for when the Harness Manager does not receive a heartbeat from the Harness Delegate for more than five minutes. (DEL-5954)

- Set the delegate `LANG` environment variable to en_US.UTF-8 by default. (DEL-6221)

#### March 31, 2023, Harness version 78914, Harness Delegate version 78904

Harness release 78914 includes the following changes for the Harness Delegate.

##### What's new

- Added support for the latest Git CLI in the delegate maximal image. (DEL-6121)
  - The latest Git CLI is now included by default.

##### Early access

This release does not include any early access features.

##### Fixed issues

This release does not include any fixed issues.

#### March 24, 2023, Harness version 78817, Harness Delegate version 78705

Harness NextGen release 78817 includes the following changes for the Harness Delegate.

##### What's new

This release does not include any new features. 
 
##### Early access

This release does not include any early access features.

##### Fixed issues

Minor fixes to the delegate installation wizard. (DEL-6073)

Previously, Helm was not pre-selected when you switched from Docker to Kubernetes. This has been fixed. Additionally, values that need to be copied in the Kubernetes manifest were moved into a copy block. 


#### March 15, 2023, Harness version 78712, Harness Delegate version 78705

Harness NextGen release 78712 includes the following changes for the Harness Delegate.

##### What's new

- Integrated **Logs** API in the **Executed Details** page where the delegate task ID is available. (DEL-6035)

  You can now view logs for delegate tasks for pipeline steps that are running or finished. This can help with debugging issues. 

- Set an expiry for delegate tokens. (DEL-5652)

  When you create a delegate token through APIs, you can provide an optional parameter `revokeAfter`. This is the epoch time in milliseconds after which the token is marked as revoked. There can be a delay of up to one hour from when the epoch value is provided to when the token is revoked. 
 
##### Early access

This release does not include any early access features.

##### Fixed issues

A pipeline stalled with only one ServiceNow task running. (DEL-6042)

This issue was fixed with the following updates:

- Tasks that were never assigned to a delegate explicitly fail after 4 successful broadcast attempts per delegate, to all eligible delegates in the account. 
- Fail one minute after the last rebroadcast attempt. 


#### March 8, 2023, Harness version 78619, Harness Delegate version 78500

Harness NextGen release 78619 includes the following changes for the Harness Delegate.

##### What's new

- The delegate installation UI experience is now updated with a new installation method: the Terraform Helm provider. Also, the installation experience has been enhanced for the existing methods (Helm chart, Kubernetes manifest, and Docker). This new experience is more developer friendly. For example, it enables cutting and pasting of relevant commands. You can also automate the commands and use new values when necessary. 

  Additionally, the following new features are available:
    - The **Terraform Helm Provider** method is based on the open source [Terraform Harness Delegate module](https://registry.terraform.io/modules/harness/harness-delegate/kubernetes/latest) and the open source [Harness Delegate Helm chart](https://github.com/harness/delegate-helm-chart). Auto upgrade is set to `OFF` with an option to enable it in the command.
    - The updated method for **Helm Chart** is also based on the same open source [Harness Delegate Helm chart](https://github.com/harness/delegate-helm-chart) as the Terraform Helm provider. Auto upgrade is set to OFF with an option to enable it in the command. You can also download the [default values.yaml](https://github.com/harness/delegate-helm-chart/blob/main/harness-delegate-ng/values.yaml) for the Helm option and edit that to set your own long-lived configuration values.
    - The updated flow for **Kubernetes Manifest** has the following options for creating a manifest YAML file specific to your Harness account.          
      - **Basic**: Provides a **Download YAML** option. The downloaded YAML has all the configuration variables set to values that are specific to your Harness account. 
      - **Custom** - Create your own YAML from a [Kubernetes manifest template](https://github.com/harness/delegate-kubernetes-manifest/blob/main/harness-delegate.yaml) by replacing the placeholders with the values provided in the method.
      Given the need to have a fully qualified YAML, the auto upgrade configuration is set to ON in both the above options. Consequently, the delegate version that is installed always remains in sync with the version available on Harness Manager.
    - The **Docker** delegate installation method has now been simplified to a copy-and-paste action on the `docker run` command, with the option to modify the preset values. The auto upgrade is set to OFF for this method, with an option to enable it in the command. (DEL-6037)

- The secrets manager cache was moved from Redis to the Harness Manager's local pod. (DEL-5884)

 This move further enhances security because the secrets manager configuration no longer goes outside of the Harness Manager's pod.
 
##### Early access

This release does not include any early access features.

##### Fixed issues

The new delegate installation wizard is now available in all delegate installation worfklows. (DEL-5989)


#### February 23, 2023, Harness version 78507, Harness Delegate version 78500

Harness NextGen release 78507 includes the following changes for the Harness Delegate.

:::note
The repository location of the Helm chart for the NextGen delegate is changing. (DEL-5576)

The repository at https://app.harness.io/storage/harness-download/harness-helm-charts/ is being deprecated. The Helm chart will no longer be available from the repository at https://app.harness.io/storage/harness-download/harness-helm-charts/. To ensure retrieval of the most recent Helm chart, update your repository references to https://app.harness.io/storage/harness-download/delegate-helm-chart/.
:::

##### What's new

This release introduces the following new features and enhancements:

You can dynamically select delegates by hostname during pipeline runs. To do so, select delegates by hostname from your delegate groups. (DEL-5052)

##### Fixed issues

This release includes the following fixes:

- Fixed an issue that interfered with the delegate installation process. Delegate API requests did not include the context that was required; organization and project ID information was not being sent with requests. The required context is now included. (DEL-5951)

#### February 15, 2023, Harness version 78421, Harness Delegate version 78306

Harness NextGen release 78421 includes the following changes for the Harness Delegate.

:::note
The repository location of the Helm chart for the NextGen delegate is changing. (DEL-5576)

The repository at https://app.harness.io/storage/harness-download/delegate-helm-chart/ is being deprecated. The Helm chart will no longer be available from the repository at https://app.harness.io/storage/harness-download/delegate-helm-chart/. To ensure retrieval of the most recent Helm chart, update your repository references to https://app.harness.io/storage/harness-download/harness-helm-charts/.
:::

##### What's new

This release introduces the following new features and enhancements:

- Added the `helm repo update` command to the delegate installer. The command is included in the instructions that apply the delegate manifest. This change reduces the chance of retrieving the wrong file from the repository. (DEL-5540)

##### Fixed issues

This release includes the following fixes:

- Resolved a problem that caused SCM log information to be displayed in the Watcher. The information was redirected to the delegate `slf4j` stream for display in the delegate logs. (DEL-5744)


#### February 6, 2023, Harness version 78321, Harness Delegate version 78306

Harness NextGen release 78321 includes the following changes for the Harness Delegate.

:::note
The repository location of the Helm chart for the NextGen delegate is changing. (DEL-5576)

The repository is being deprecated. Updates to the chart will not be made to https://app.harness.io/storage/harness-download/delegate-helm-chart/ and will not be available from that location. To ensure retrieval of the most recent Helm chart, update your repository references to https://app.harness.io/storage/harness-download/harness-helm-charts/.
:::

##### What's new

This release introduces the following new features and enhancements:

- A REST-based operation to fetch a delegate token value was introduced. The operation requires the Harness user role permission `Delegate: Create/Edit`. For information about other delegate token operations, see [Delegate Token Resource](https://apidocs.harness.io/tag/Delegate-Token-Resource). (DEL-5634)

- The delegate installation UI was changed to include the `helm repo update harness` command as an option on the **Apply YAML and verify connection** page. Use this option to obtain the latest version information on the charts in the Harness Helm repository. For more information about the `update` command, see [Helm Repo Update](https://v3-1-0.helm.sh/docs/helm/helm_repo_update/) in the Helm Docs. (DEL-5540)

##### Fixed issues

This release includes the following fixes:

- Added error checking to ensure that delegates immediately reject tasks that are not supported. (DEL-5602)

##### Security enhancements

This release introduces the following security enhancements:

- The immutable delegate image was refreshed with updated versions of client tools. This reduces security vulnerabilities for the delegate and enhances security. The following table details the updates. (DEL-5688)
  
  | **Third-party tool** | **78101 and earlier** | **78306 and later** |
  | :-- | :-: | :-: |
  | kubectl | 1.13.2, 1.19.2 | 1.24.3 |
  | go-template | 0.4, 0.4.1 | 0.4.1 |
  | harness-pywinrm | 0.4-dev | 0.4-dev |
  | helm | 2.13.1, 3.1.2, 3.8.0 | 2.13.1, 3.1.2, 3.8.0 |
  | chartmuseum | 0.8.2, 0.12.0 | 0.15.0 |
  | tf-config-inspect | 1.0, 1.1 | 1.1 |
  | oc | 4.2.16 | 4.2.16 |
  | kustomize | 3.5.4, 4.0.0  | 4.5.4 |
  | scm | The Harness-generated library and version are changed with every fix. | The Harness-generated library and version are changed with every fix. |


#### January 17, 2023, Harness version 78214, Harness Delegate version 78101

Harness NextGen release 78214 includes no changed features or fixes for the Harness Delegate.

</details>
