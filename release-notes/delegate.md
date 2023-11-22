---
title: Delegate release notes
sidebar_label: Delegate
tags: [NextGen, "Delegate"]
date: 2023-11-13T10:00
sidebar_position: 4
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/delegate/rss.xml" />

These release notes describe recent changes to Harness Delegate.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

### Deprecation notice

**Kustomize 3.4.5**

import Kustomizedep from '/release-notes/shared/kustomize-3-4-5-deprecation-notice.md'

<Kustomizedep />

## November 2023

### Harness version 816xx, Harness Delegate version 23.11.816xx

#### Fixed issues

- When shutdown is initiated, delegates will continue sending heartbeats until all tasks are completed, ensuring all running tasks return a response before shutting down. (PL-42171)

- There was an issue with Harness not properly handling delegate reconnects, which affected delegate metrics. During a disconnect, Harness would mark `delegate_connected` as 0, but after a reconnect, it failed to increment the `delegate_connected` to 1. (PL-42431, ZD-52829, ZD-53399, ZD-53878)

This issue has been resolved, and now Harness increments the `delegate_connected` to 1 during reconnection. As a result, the `io_harness_custom_metric_delegate_connected` and `io_harness_custom_metric_task_failed` metrics are now accurately reported.

- Fixed the following issues:

   - The delegate Stackdriver logger didn't work if the delegate token was base64-encoded format.
   - When the `DELEGATE_TYPE` was `KUBERNETES` and the delegate wasn't deployed in Kubernetes, the delegate failed to start. (PL-42452)

- Azure Key Vault's heartbeat check now creates a validation secret with a 30-minute expiration, addressing the issue of no expiration being set previously, which resulted in multiple secrets. (PL-42509, ZD-53700)

- User groups could be created via SCIM using identifiers with invalid characters. (PL-42535, ZD-53830)

   This issue is fixed. You can no longer create user groups with invalid characters.

### Harness version 81401, Harness Delegate version 23.11.81405

#### New features and enhancements 

- Harness has introduced stage-level timeouts for the following stage types: (CDS-81225)
  - Deploy
  - Build
  - Approval
  - Security Test
  - Pipeline
  - Custom Stage 

- Harness updated the delegate metrics count names to include the suffix `_total`. (PL-42354, ZD-52167)

   The following delegate metrics names are updated.

   - `io_harness_custom_metric_task_timeout` is now `io_harness_custom_metric_task_timeout_total`
   - `io_harness_custom_metric_task_completed` is now `io_harness_custom_metric_task_completed_total`
   - `io_harness_custom_metric_task_failed` is now `io_harness_custom_metric_task_failed_total`
   - `io_harness_custom_metric_task_rejected` is now `io_harness_custom_metric_task_rejected_total`

- Harness has updated our account data deletion period from 90 days to 60 days. (PL-41444)

#### Fixed issues

- Fetching a repository and attempting to read a file that did not exist on the file system resulted in an exception, and Harness failed to handle that exception appropriately. The console logs displayed the following message: "Exception in processing GitFetchFilesTask. Reason: Unable to checkout file: `<file-path>`." (CDS-82631) 

  This issue has been fixed.

- When using the Generic repository format to fetch artifacts from Artifactory, if you used an artifact filter and a non-Regex value for the artifact path, an issue occurred. The issue caused the metadata URL in the service outcome to be incorrect; the URL did not include the repository name. (CDS-82579)

  This issue is fixed.

- HorizontalPodAutoscaler (HPA) and PodDisruptionBudget (PDB) could not be used in Kubernetes deployments if they contained fields that are not supported by the Kubernetes schema. (CDS-82370)

  This issue has been fixed by the addition of support for such fields.

- Harness did not honor the working directories specified in script units in the Command steps used in WinRM deployments. Instead, Harness used the default directory configured for the user profile on the target VM. (CDS-82105)

  This issue has been fixed. Harness now uses the working directory that you specify in script units. However, the fix has been deployed behind the feature flag `CDS_PRESERVE_WINRM_WORKING_DIR_FOR_COMMAND_UNITS`. Contact [Harness Support](mailto:support@harness.io) to enable the fix.

- The services dashboard did not correctly show primary and canary instances in a Kubernetes deployment. (CDS-81869, ZD-52262, ZD-52930)

  The issue occurred because Harness treated the canary instances and primary instances as one set of instances. Consequently, during the canary deployment, Harness also updated the primary instances with current deployment details. This was not correct because primary deployment hadn't begun yet. This issue affected post-production rollbacks.

  This issue has been resolved. Now, Harness splits the canary instances and primary instances into two groups and updates each group with the deployment details that are relevant to them.

- If connectivity issues between Harness and the Git provider cause a file that existed in the repository to not be found on the file system after performing a fetch, the Update Release Repo step creates a new file. (CDS-80902, ZD-51818)

  This issue has been fixed. If Harness experiences a connectivity issue with a Git provider when executing a step, it fails the step after a few retries.

- Secrets that are referenced in a service variable are displayed on the secret's **References** tab but secrets that are referenced in an environment’s service overrides are not. (CDS-80615)

  This issue has been fixed.

- When the Update Release Repo step failed on the delegate, the error message was not propagated to the Harness user interface, and you had to search the delegate logs to determine the cause of the issue. 

  This issue has been fixed. The error message is now propagated from the delegate to the Harness user interface. (CDS-79094)

- The project admin role wasn't being assigned to a project created via an account or org scope service account. Now, when a project is created, the project admin role is automatically assigned to the service account. This is also reflected in the audit trails. (PL-41845, ZD-51918)

- Previously, if you had an SSH secret key with a **Text** reference pre-selected, you could only update it using YAML but not via the UI. The UI displayed only the **File** secret types. Harness has now added a dropdown menu in the **Create or Select an Existing Secret** dialog that allows you to select the **Secret type** as either **File** or **Text**. This simplifies the process of updating SSH secrets, making it easier for you to manage your secrets. (PL-41507, ZD-47600, ZD-51334)

### Version 23.11.81408

#### Hotfix

- A default tag is now included in the Auto Scaling Group (ASG) for the Name key. The tag value is set to match the ASG name and is automatically propagated upon instance launch. This feature is especially useful if you rely on instance names for managing metrics. (CDS-84681)

## October 2023

### Harness version 81205, Harness Delegate version 23.10.81202

Harness NextGen release 81205 includes the following changes for the Harness Delegate.

#### New features and enhancements

- When you [configure a Kubernetes build farm to use self-signed certificates](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates/), you can now use `DESTINATION_CA_PATH` instead of `CI_MOUNT_VOLUMES` and `ADDITIONAL_CERTS_PATH`. (CI-9707)
   * For `DESTINATION_CA_PATH`, provide a comma-separated list of paths in the build pod where you want the certs to be mounted, and mount your certificate files to `opt/harness-delegate/ca-bundle`.
   * Both CI build pods and the SCM client on the delegate support this method.
   * You can use either method (`DESTINATION_CA_PATH` or both `CI_MOUNT_VOLUMES` and `ADDITIONAL_CERTS_PATH`). If you specify both, `DESTINATION_CA_PATH` takes precedence. If Harness can't resolve `DESTINATION_CA_PATH`, it falls back to `CI_MOUNT_VOLUMES` and `ADDITIONAL_CERTS_PATH`.

- JGit library upgrade (CDS-80715, ZD-51149)

  Eclipse JGit libraries have been upgraded to version 6.6.1.202309021850-r.

- To improve security, Harness has introduced a feature that allows you to add domain allowlists for Email, Slack, Microsoft Teams, Webhook, and PagerDuty notification channels at the account level. Earlier, this was only supported for fixed URL domains. Now, support has been added for expression URLs. (PL-39481, ZD-43735)

#### Fixed issues

- Revised the error message that is shown when a pipeline fails due to lack of eligible delegates. (CI-9743)

- Optimized delegate logging related to the CI task handler to consume less space. (CI-9771)

- When saving secret files, Harness FirstGen and Harness NextGen encode the file content with the ISO_8859_1 character set. However, while Harness FirstGen correctly decodes the file content referenced by the `configFile.getAsBase64()` functor, Harness NextGen uses UTF-8. The issue caused additional padding bytes to be included in the P12 config file and authorization errors with GCP Pub/Sub in Harness NextGen. (CDS-81032, ZD-51928)

  This issue has been fixed. Now, Harness NextGen uses the ISO_8859_1 character set while decoding secrets from the secret store and subsequently uses Base64 encoding.

- Harness did not handle appropriately the failure status codes returned by the GitLab API for the Merge PR step. (CDS-80927)

  This issue has been fixed.

- The Tags field in the pipeline filter is now optional. This change allows you to filter either by tag name or a combination of tag name and value. (CDS-78992)

### Harness version 81008, Harness Delegate version 23.10.81010

Harness NextGen release 81008 includes the following changes for the Harness Delegate.

:::danger Breaking change

Harness implemented access checks to restrict unauthorized users from viewing delegate information on the delegate list page. Access checks are now enforced on the page for delegate view permissions. (PL-38958, ZD-50634)

:::

#### New features and enhancements

You can now reference secret values in JSON files by using XPATH. Support is available for AWS Secret Manager, Azure Key Vault, GCP Secret Manager, and HashiCorp Vault. For more information, go to [Reference existing secret manager secrets](/docs/platform/secrets/secrets-management/reference-existing-secret-manager-secrets/). (PL-41063, ZD-51651)

#### Fixed issues

- The Merge PR step fails with GitLab connectors. (CDS-79772)

  This issue has been fixed.

- Execution failure logs associated with an exception named `DuplicateKeyException` included the name of the Harness production server. (CDS-79514, ZD-50804)

  This issue has been fixed.

- Harness now supports the deployment of ECS services whose count is the same as the running instances in a blue-green strategy (CDS-79412)

- If a pipeline that includes the Terragrunt Apply step fails, the Terragrunt working directory is not removed from the file system. Consequently, the delegate container's disk usage gradually increases. The issue occurs when the working directory includes symbolic links. (CDS-79020, ZD-50532)

  This issue has been fixed.

- If a step in a WinRM deployment fails, Harness does not clean up temporary files created on the remote host. (CDS-78304, ZD-49543)

  This issue has been fixed.

- When a [code repo connector](/docs/platform/connectors/code-repositories/connect-to-code-repo) encounters a cert error, the error message shown in the Harness UI is now more informative. (CI-8509)

- Fixed an issue where some [code repo connectors](/docs/platform/connectors/code-repositories/connect-to-code-repo) didn't send the [build status](/docs/continuous-integration/use-ci/viewing-builds#source-code-repository-links) back to the SCM provider. This happened due to an issue in the Harness Delegate, and it occurred only for code repo connectors that [connected through a Harness Delegate](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#connectivity-mode-settings). Connectors connecting through the Harness Platform weren't impacted. (CI-9835, ZD-51754, ZD-51758, ZD-51763)

- Fixed an issue where the latest delegate version was not reflected in the latest supported delegate version API. (PL-41151)

   For more information on the latest supported delegate version API, go to [Use automatic upgrade with custom delegate images](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#use-automatic-upgrade-with-custom-delegate-images).

### Version 81015

#### Hotfix

- The service dashboard did not show the new active instance count that resulted from updates made to workload replicas. The issue occurred in a few Helm deployment scenarios, when the updates were made after deployment. (CDS-82385, ZD-52612)

  This issue has been fixed. 

- When you [configure a Kubernetes build farm to use self-signed certificates](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates/), you can now use `DESTINATION_CA_PATH` instead of `CI_MOUNT_VOLUMES` and `ADDITIONAL_CERTS_PATH`. (CI-9707)
   * For `DESTINATION_CA_PATH`, provide a comma-separated list of paths in the build pod where you want the certs to be mounted, and mount your certificate files to `opt/harness-delegate/ca-bundle`.
   * Both CI build pods and the SCM client on the delegate support this method.
   * You can use either method (`DESTINATION_CA_PATH` or both `CI_MOUNT_VOLUMES` and `ADDITIONAL_CERTS_PATH`). If you specify both, `DESTINATION_CA_PATH` takes precedence. If Harness can't resolve `DESTINATION_CA_PATH`, it falls back to `CI_MOUNT_VOLUMES` and `ADDITIONAL_CERTS_PATH`.

## September 2023

### Harness version 80811, Harness Delegate version 23.09.80804

Harness NextGen release 80811 includes the following changes for the Harness Delegate.

#### New features and enhancements

- Upgraded the Bouncy Castle library to address potential vulnerabilities. (PL-40729, ZD-48823)

   - `org.bouncycastle:bcpg-jdk15on:jar:1.70` to `org.bouncycastle:bcpg-jdk18on:jar:1.76`
   - `org.bouncycastle:bcpkix-jdk15on:jar:1.70` to `org.bouncycastle:bcpkix-jdk18on:jar:1.76`
   - `org.bouncycastle:bcprov-ext-jdk15on:jar:1.70` to `org.bouncycastle:bcprov-ext-jdk18on:jar:1.76`
   - `org.bouncycastle:bcprov-jdk15on:jar:1.70` to `org.bouncycastle:bcprov-jdk18on:jar:1.76`

<!-- Add to 809xx or future release when feature is complete
- You can now reference secret values in JSON files by using XPATH. Support is available for AWS Secret Manager, Azure Key Vault, GCP Secret Manager, and HashiCorp Vault. (PL-41063)
-->

- Harness CD now supports auto-scaling of green services in the ECS Blue Green Swap Target step. (CDS-79414)

#### Fixed issues

- The Kustomize 3.5.4 binary is now removed from the immutable delegate, and all Kustomize tasks are routed via the Kubectl binary. (CDS-58893, ZD-48553)

- In certain scenarios for ECS Blue Green deployments, the Green application was not rolling back. We have added functionality to handle this scenario. We now consistently roll back the Green service in ECS Blue Green deployments. (CDS-76795, ZD-49005, ZD-49919)

- Fixed an issue where ShellScript WinRM deployments would not honor the configured timeout. For example, the step would time out by default in 30 minutes even when the configured timeout was 1 day. Now the WinRM session timeout will be set to 30 minutes or the timeout configured for the step (if more than 30 minutes). (CDS-78219, ZD-48180, ZD-49871)

- Fixed an issue with Artifactory artifact fetches in the pipeline, when the artifact path was in a nested directory and also a regex. (CDS-78278, ZD-50030)

- Resolved an issue when copying config files from BitBucket repositories if a folder path was specified instead of a file path. (CDS-78344, ZD-49489)

- The output of the Kubernetes Dry Run step did not generate a valid Kubernetes manifest due to the masking of the secrets values (CDS-78507).

  Harness was masking all the secrets values using the character set `***` for both stringData and data fields in Secrets Resources. Since the data field supports only Base64 encoded values, this resulted in an invalid manifest. With this fix, Harness uses a valid value to mask these data fields (`Kioq`, the Base64 value of `***`).

- Harness did not handle the `Unknown Host Exception` error appropriately and, consequently, showed the misleading "Delegates are not available for performing operation" message when you configured LDAP incorrectly (for example, you entered an incorrect host or port number). (PL-28077)

  This issue has been fixed.

- Harness showed JSON Web Token URLs in Delegate task logs associated with shell script task failures. (PL-39102)

  This issue has been fixed.

- Delegates failed to reauthenticate with the proxy after the initial proxy session expired. (PL-40630, ZD-48981, ZD-49626)

   The following updates to delegate communication with Harness Manager over proxy resolve this issue.

   - Removed `return null` when the delegate receives the required 407 proxy authentication.
   
   - Added the following variables for the `asyncHttpClient` to authenticate with the proxy.
      - `org.asynchttpclient.AsyncHttpClientConfig.proxy.user`
      - `org.asynchttpclient.AsyncHttpClientConfig.proxy.password`

- Harness Platform release 80504 did not allow you to create empty user groups. (PL-41005, ZD-50411, ZD-50475)

  This issue has been fixed.

- When steps timed out for aborted tasks that were previously assigned, the UI displayed an incorrect error message. (PL-41226, ZD-49908, ZD-50652)

  The UI now displays the correct error message.

- The UI allowed all users to select the **Copy token** option from the **More Options** (&vellip;) menu. (PL-41155)

   This issue has been resolved. Now, only users with the required permissions to copy tokens are able to select the **Copy token** option.

- Fixed an issue where build pods weren't cleaned up if Harness selected an invalid delegate for the cleanup task. This could happen if you used [delegate selectors](/docs/platform/Delegates/manage-delegates/select-delegates-with-selectors) based on [delegate tags](/docs/platform/Delegates/manage-delegates/select-delegates-with-selectors#delegate-tags), and multiple delegates had the same tags, but some of those delegates didn't have access to the cluster. Now Harness checks the selected delegate's connectivity to the cluster before assigning a task to that delegate. (CI-8831, ZD-47647)

- The execution logs from the Initialize step showed SSH keys used in the environment for the Command step. (CDS-79144, ZD-50623)
  
  This issue has been fixed.

### Version 23.10.80808

#### Hotfix

- For generic (non-Docker) artifacts available in Artifactory, you can use an expression to specify the path to the artifact. This filter works in the same way as the artifact filter in Harness FirstGen, and it is useful when you want to fetch artifacts from multiple paths. (CDS-78181)

- Updated the internal Jenkins library to support long IDs for Jenkins builds. Previously, supported IDs were limited to integer bounds. (CDS-79499, ZD-50718, ZD-50888)

- Fixed an issue where Git statuses were not being sent for pull requests. (CES-1376)

- Added support for referencing JSON secret keys with dots at the top level. Nested keys with dots are not supported. (PL-41715)

### Harness version 80504, Harness Delegate version 23.09.80505

Harness NextGen release 80504 includes the following changes for the Harness Delegate.

#### New features and enhancements

- Upgraded `io.netty:netty*` to version `4.1.94.final` to address vulnerabilities. (CI-8971, ZD-48488)

- API Call logs now include details such as response, size, duration, HTTP verb, and response code in the summary. (OIP-767)

- If the Email step failed to send a notification, the following message was displayed: “Failed to send the email. Check SMTP configuration.” The message did not include any additional information to help you debug the issue. (PL-40007, ZD-47524)

   Now, the message has been enhanced to show the cause of failure. It also identifies the delegate that executed the task.

- The OWASP Java HTML Sanitizer version is upgraded to 20220608.1. (PL-40807)

- The Mozilla Rhino library has been upgraded from version 1.7R4 to 1.7.14. (PL-40808)

- The Spring Boot library is upgraded to version 2.7.14. (PL-40810)

- The delegate expiration policy has been extended from 3 months to 6 months. You now only have to update delegates once every 6 months. (PL-39452)

#### Fixed issues

- Fixed a Nexus artifact issue where a fetch timed out when a single group contained more than 50 artifacts. (CDS-73884, ZD-45052, ZD-47206)

- Fixed an intermittent issue where Helm deployment pipelines would report the Helm repository as not found. (CDS-76919)

- Fixed an issue that resulted in Null Pointer Exceptions when running a pipeline manually with a `<+trigger.connectorRef>` expression. This expression gets its data from the trigger payload. With this fix, the pipeline correctly handles the case where the trigger payload is null. (CDS-77736, ZD-49685, ZD-49720, ZD-49722)

- Fixed an issue where the `ACCOUNT_SECRET` environment variable was overriding the `DELEGATE_TOKEN` value in the delegate's Docker container for delegates with an immutable image type (image tag `yy.mm.xxxxx`). (PL-40728)

### Version 23.09.80512

#### Hotfix

- ShellScript WinRM deployments didn't honor the configured timeout. For example, the step would time out by default in 30 minutes, even when the configured timeout was set to one day. (CDS-78219, ZD-48180, ZD-49871)

   The issue has been resolved. Now, the WinRM session timeout is set to the maximum of the step timeout configured plus 30 minutes.

### Version 23.09.80511

#### Hotfix

- Previously, there was an issue with the task capacity limiter for delegates where the counter didn't decrement when a task was aborted. (PL-41408)

   This issue has been fixed. Now, when you deploy a delegate and set the `DELEGATE_TASK_CAPACITY` environment variable, the number of concurrent tasks for the delegate is limited to the specified capacity. 

### Version 23.09.80510

#### Hotfix

- Added support for the Artifactory **Artifact Path** filter. (CDS-77244, CDS-79760)

- The task count did not decrease when a task was aborted and the `DELEGATE_TASK_CAPACITY` environment variable was enabled. (PL-41367)

   Harness recommends that you upgrade to delegate version 23.09.80511 to resolve this issue.

### Version 23.09.80507

#### Hotfix

- When escaping single quotes in environment variables, the same map was passed to subsequent command units which caused the escaped single quotes to escape again. (CDS-75775)

   This issue has been resolved. Subsequent command units do not escape single quotes again.

### Version 23.09.80506

#### Hotfix

- API calls made to Git providers during deployments caused rate limit errors. (CDS-78950)

  The issue has been resolved. Harness reduced the number of API calls made to Git providers during deployment.

## August 2023

### Harness version 80307, Harness Delegate version 23.08.80308

Harness NextGen release 80307 includes the following changes for the Harness Delegate.

#### New features and enhancements

- If you use the App Role authentication method in the HashiCorp Vault connector, you can choose to cache the vault token. The token is cached on the Harness Delegate for a time duration equal to the TTL of the vault token, with 1% leeway. 

  By default, caching is enabled for all existing connectors. To disable caching, go to the connector's YAML configuration and set the `enableCache` parameter to `false`. Harness UI support to enable and disable caching will be added in a subsequent release. (PL-39821)

- To safeguard your operations and protect against potential security vulnerabilities, Harness deprecated the Helm 2 binary from delegates with an immutable image type (image tag `23.08.80308`). For information on delegate types, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types). (PL-40409)

- In a monitored service, back end license checks and Terraform live monitoring are always on. (SRM-15255)

   Now, monitored services can be enabled only from the user interface (through toggle buttons) and the enable API. Monitored services will always be disabled when created and during subsequent updates to them.

#### Early access features

**GitHub App authentication for GitHub connectors (CI-8577, CI-8367)**

This feature is behind the feature flag `CDS_GITHUB_APP_AUTHENTICATION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature flag.

With this feature flag enabled, you can use a GitHub App as the [primary authentication method for a GitHub connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#credentials-settings), and you can use GitHub connectors with GitHub App authentication in the [Git Clone step](/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline).

#### Fixed issues

- Fixed an issue where Azure webhook triggers did not work as expected because the delegate could not parse repository URLs in the format `https://{ORG}@dev.azure.com/{ORG}/{PROJECT}/_git/{REPO}`. With this fix, the delegate can parse these URLs and Azure webhook triggers work as expected. (CDS-59023)

- Fixed the behavior of delegate selectors in Jira, ServiceNow and Bamboo build steps. Delegate selectors at the step, stage, and pipeline levels did not override the connector's selector. This meant that both delegate selectors were checked during step execution. With this fix, any selector at the step, stage, or pipeline level overrides the connector's selector. This matches the default behavior in all other step types. (CDS-71025)

- Fixed a UI issue where pipelines, input sets, and executions were ordered incorrectly due to case-sensitive sorting of the element list. With this release, the UI now uses case-insensitive sorting when it lists pipelines, input sets, and pipeline executions. (CDS-73216)

- Fixed an issue where a `<+configFile.getAsBase64(content)>` expression would get parsed incorrectly if it contained multiple lines. (CDS-73424)

- Fixed an issue observed in pipeline executions with service overrides. If an encrypted config file was deleted, a log message would show the path to the deleted file. (CDS-75153, ZD-47557) 

- Fixed an issue observed in Blue Green deployments of ASG services, where a repeat deployment incorrectly could result in a scaling down of instances to 0. (CDS-75560)

- Fixed an issue where exceptions happened due to Kubernetes `kubectl` “connection-refused” errors. With this fix, these exceptions are now classified as connectivity errors. This gives you proper control to implement failure strategies based on errors of type Connectivity. (CDS-75777, ZD-48380)

- Introduced a validation to ensure that only repos that are allowed on the basis of `repoAllowList` can be set for pipelines, InputSets, and templates while using the [Edit Git details](/docs/platform/git-experience/configure-git-experience-for-harness-entities/#edit-git-details-for-a-pipeline) feature. (CDS-75828)

- Fixed an issue where the Custom Remote Store did not clone a repo larger than 25Mb if provided in the execution script. With this fix, the Custom Remote Store now has a <=25Mb size validation on manifest files (not the entire repo). (CDS-75900)

- Removed unnecessary wait time at the end of the initialize step, saving approximately 30 seconds. (CI-9122)

- Fixed an issue where the token value was missing in the delegate token list API call. (PL-39790)

- Fixed an issue where some records did not trigger delegate task assignments. (PL-40148)

- The `publishedDelegateVersion` API incorrectly required edit permission. (PL-40322)

   This issue is fixed. The `publishedDelegateVersion` API now requires only view permission.

### Version 23.08.80313

#### Hotfix

- There were several `OverlappingFileLockException` errors caused by the version of the Chronicle Queue library used. (CCM-14174)

   The issue has been resolved. We upgraded the Chronicle Queue library to fix the errors.

### Version 23.08.80312

#### Hotfix

- In previous versions, when utilizing Artifactory as an artifact source, there was an issue where the retrieval of artifacts failed when the specified path included regular expressions, and the path structure was nested rather than flat. We are pleased to announce that this release addresses and resolves this issue.

### Version 23.08.80311

#### Hotfix

- In some scenarios for Amazon ECS blue/green deployments, the green application didn’t roll back consistently because the new service continued to run tasks in the `live-target-group`. To resolve this issue, Harness no longer fetches the count of running services in rollback tasks before rolling back the green service. The green service now rolls back consistently. (CDS-76795, ZD-49005)

   This fix is behind the feature flag `CDS_ECS_BG_GREEN_SERVICE_ROLLBACK`. Contact [Harness Support](mailto:support@harness.io) to enable the fix.

### Version 23.08.80310

#### Hotfix

- Due to intermittent issues with the cf CLI, the Tanzu Application Services (TAS) Rolling deployment step failed to create the application. (CDS-75250)

  Now, before performing a rolling deployment, the TAS Rolling deployment step first verifies that the application exists. If the application does not exist, it deploys the application without using the rolling deployment strategy. If the application exists, it performs a rolling upgrade. 

### Version 23.09.80309

#### Hotfix

- Do not evaluate service variables on the Bash shell when exporting them in Command step. (CDS-75775)

  If a service variable has bash-interpretable characters like dollar ($), they will remain as is when exported in the Command step. Previously, they were being 
  evaluated using the bash interpreter (for example, "abc$1abc" would actually be sent as "abc$bc").

### Version 23.08.80308

#### Hotfix

- In certain scenarios for Amazon ECS blue/green deployments, the green application was not rolling back. We have added functionality to handle this scenario. We now consistently roll back the green service in Amazon ECS blue/green deployments. (CDS-76795, ZD-49005)

   This fix is behind the feature flag `CDS_ECS_BG_GREEN_SERVICE_ROLLBACK`. Contact [Harness Support](mailto:support@harness.io) to enable the fix.

### Harness version 80120, Harness Delegate version 23.08.80104

#### What's new

- Removed Helm version 3.1 from from delegates with an immutable image type (image tag `yy.mm.xxxxx`). (CDS-58892, ZD-47520, ZD-48553)

   For information on delegate types, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types). 

- Upgraded go-template binary to version 0.4.3, which uses Go version 1.20. (CDS-58919)

- Upgraded the Helm binary from version 3.8 to 3.12. (CDS-58931)

- The `kubectl` command now includes retry logic to handle connection issues. (CDS-72869)

- The Execution Logs have been enhanced to include additional details such as duration, task ID, and more. These details help you understand and debug CV Steps, SRM Live monitoring, and SLI. (OIP-565)

- In manual Query mode, the Datadog Metrics Health source now provides support for formulas. (OIP-568)

   These formulas follow a specific format: Query `a` ; Query `b` ; Formula using `a`, `b`.

   Let's consider an example to illustrate this:

   - Query `a` is "Query-with-a"

   - Query `b` is "Query-with-a"

   - The formula is "(a/b) * 100 - 5"

   The resulting query would appear as follows: `kubernetes.memory.usage{cluster-name:chi-play};kubernetes.memory.total{cluster-name:chi-play};(a/b) * 100 - 5`

   In the above example, `a` and `b` represent the respective queries:

   - a = `kubernetes.memory.usage{cluster-name:chi-play}`

   - b = `kubernetes.memory.total{cluster-name:chi-play}`

   You can include any number of queries in the final formula using alphabetical variables, such as a, b, c, d, and so on.

- Error messages from health source providers are now included in API responses for improved user experience and debugging efficiency. (OIP-657)

- A new `getAzureKeyVaultClient` API is available to fetch the list of Azure vaults. This option reduces the time it takes for Harness to reflect a newly-created Azure vault. (PL-28392, ZD-44045)

#### Fixed issues

-  Fixed an issue with handling of new line characters in [GitHub App private key files](/docs/platform/connectors/code-repositories/git-hub-app-support) generated on Windows machines. (CI-8708)

- Fixed an issue in Artifactory deployments where the **Artifact Path** pull-down menu would populate even when the Artifactory connector failed to process a regular expression. Now, when a regex is supplied to an artifact tag in the pipeline for a service, the **Artifact Path** menu populates correctly based on the regex. (CDS-72737, ZD-46236)

- Previously, when a fixed value was specified to a pipeline build, the Service step used pattern matching to verify the value.  Now, the Service step verifies the value using an exact match. (CDS-72911)

  For example, suppose the **Jenkins Build** field is set to 1. Previously, the check would pass even if build 1 was absent and build 41 was present. With this fix, the check passes only if build 1 is present. 

- Fixed an issue where Helm deployment steps timed out after the initial installation/upgrade phase, preventing the execution of a Helm rollback step. (CDS-73264, ZD-46163)

- Fixed an issue where WinRM deployments would not honor the configured timeout. For example, the step would time out out by default in 30 minutes even when the configured timeout was 1 day. Now, the WinRM session timeout will be set to maximum of step timeout configured and 30 minutes. (CDS-73641, ZD-46904, ZD-48180)

  This fix is behind the feature flag `DISABLE_WINRM_COMMAND_ENCODING`. Contact [Harness Support](mailto:support@harness.io) to enable this fix.

- Fixed an issue where the Override Image Connector did not properly configure the image path in the container step. (CDS-73727, ZD-43089, ZD-46916, ZD-47578, ZD-47716)

   This issue has been resolved. The Override Image Connector now correctly configures the image path, including the hostname. 

-  Fixed an issue where command execution logs were incomplete even though the pipeline ran successfully. This issue was observed when using Command steps in SSH or WinRM deployments. (CDS-74042, ZD-46904)

- Fixed an issue where the Terraform Plan step would exit with code 0 even when there was a change as per the generated plan. This would happen when using the **Export JSON representation of Terraform Plan** option. Now, the step exits with the correct code (2) based on the `terraform plan` command. (CDS-74144, ZD-47379)

- Fixed an issue that resulted in failures when deploying a Tanzu service with a `vars.yaml` file. (CDS-74163, ZD-47412)

  You can now provide routes as variables in your TAS manifest, like this:

  Sample TAS manifest:

  ```yaml
  applications:
  - name: ((NAME))
      memory: 500M
      instances: 1
      routes: ((ROUTES))
  ```
  Sample vars manifest:
  ```yaml
  NAME: harness_<+service.name>_app
  ROUTES:
      - route: route1.apps.tas-harness.com
      - route: route2.apps.tas-harness.com
  ```

- Fixed an issue where users could not use the Blue Green Stage Scale Down step with a manifest kind that was not present in the Kind list used by Harness. Now, the Blue Green Stage Scale Down Step will not fail for unknown manifest kinds. (CDS-74259, ZD-47431)

- Incorrect ordering of execution logs and API call logs. (OIP-661)

   This issue has been resolved. Now, the execution logs and API call logs are displayed in the correct order.

- Earlier, even though you could use the `JAVA_OPTS` environment variable to specify JVM options for the delegate, you could not override the default JVM options that Harness used, namely `-XX:MaxRAMPercentage=70.0` and `-XX:MinRAMPercentage=40.0`. The option to override the defaults was unavailable because the value of JAVA_OPTS was prepended to the default JVM options. (PL-38839)

   This issue has been fixed. The value of JAVA_OPTS is now appended to the default JVM options, thus allowing you to override the default options.

- You were allowed to create resource groups with the same identifier as a built-in resource group. (PL-39503)

  This issue has been fixed. Validation in the API that creates resource groups now checks whether an existing resource group has the same identifier.

- If the delegates that were eligible to execute a pipeline task (delegates that were within the account-organization-project scope of the pipeline and matched any configured delegate selectors) did not have the required tools or connectivity to execute the task, the task timeout message included delegates that did not meet the eligibility criteria. (PL-39624, ZD-46460, ZD-46513)

  This issue has been fixed. The message displayed on task timeout has been improved for scenarios in which no delegate matches specified selectors and no delegates are found in the account.

- Delegates showed high CPU usage caused by a large number of threads that perform read operations being generated and abandoned. (PL-39797)

   This issue has been resolved through improved message read performance and an increased read timeout.

## July 2023

### Harness version 79916, Harness Delegate version 23.07.79904

Harness NextGen release 79916 includes the following changes for the Harness Delegate.

#### What's new

- The Splunk connector has been enhanced to include support for Bearer Token. (OIP-598)

- The List Tokens API now supports listing all the personal access tokens or service account tokens in the account. The API has been enhanced as follows:
   1. If you have user management permissions, you can list all the Personal Access Tokens in your account. You can also filter tokens belonging to a user or filter only active tokens.
   2. If you have service account management permissions, you can list all the service account tokens in your account. You can also filter tokens for a service account or filter only active tokens. (PL-31870, ZD-40110)

#### Early access

- Harness added the ability to acquire only the configured maximum number of tasks. This allows Harness Manager to use the task capacity to determine whether to assign a task to the delegate or queue it. You can configure the maximum number of tasks using the Env variable `DELEGATE_TASK_CAPACITY`. For example, if you set `DELEGATE_TASK_CAPACITY` to a value of 2 and execute 6 tasks in parallel, Harness Manager executes only 2 tasks at a time. If you don't configure `DELEGATE_TASK_CAPACITY`, Harness Manager executes all 6 tasks in parallel. (PL-39351)

   This functionality is behind a feature flag, `DELEGATE_TASK_CAPACITY_CHECK`. When the feature flag is enabled, the task is broadcast every minute in Harness Manager until it expires.

#### Fixed issues

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

### Version 23.08.79910

#### Hotfix

- The delegate stopped trying to reconnect to the WebSocket if the infrastructure experienced a network outage for over five minutes. (PL-40547)

  This issue is fixed. The delegate keeps trying to reconnect to the WebSocket until it's successful.
                               
### Version 23.08.79909

#### Hotfix

- The pipeline console did not show any logs to indicate that Kubernetes infrastructure container initialization and completion tasks were in progress.

  Now, to improve your experience, the console shows logs to indicate when the task begins and ends. (CDS-74522, ZD-47616)

### Version 23.07.79906

#### Hotfix

- Helm deployment steps timed out after the initial installation/upgrade phase, preventing the execution of a Helm rollback step. (CDS-73264)

   This issue is now fixed.

## June 2023

### Harness version 79714, Harness Delegate version 23.06.79707

Harness NextGen release 79714 includes the following changes for the Harness Delegate.

#### What's new

- You can now see disconnected delegate details in selection logs and error messages when there are no eligible delegates in an active state to execute tasks. (PL-37900)

- The delegate JRE is upgraded to 11.0.19_7. (PL-37994)

- When a delegate token is revoked, Harness now sends `SELF_DESTRUCT` to all delegates that are using the revoked token. (PL-38957)

#### Early access

- Added a new field in the release history for Blue Green deployments to differentiate between environments. (CDS-69961)

  Enable the feature flag, `CDS_BG_STAGE_SCALE_DOWN_STEP_NG` to leverage this feature. 

  This is an enhancement to the Kubernetes Blue Green Stage Scale Down step. You can now scale down your last successful stage environment only if the primary resources exist. This enhancement helps you efficiently manage your resources, and prevent deleting the important resources.

  Make sure that the infrastructure definition of these resources and the Blue Green service are the same. This is necessary as Harness identifies resources from the release history, which is mapped to a release name. If you configure a different infrastructure definition, it might lead to scaling down important resources.

#### Fixed issues

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


### Harness version 79516, Harness Delegate version 23.06.79503

Harness NextGen release 79516 includes the following changes for the Harness Delegate.

#### What's new

- Send emails to non-Harness users. (CDS-58625, ZD-42496)
  
  To send emails to non-Harness users, you must configure your own SMTP server and enable the **Enable Emails to be sent to non-Harness Users** default setting. This setting is available at Account, Org, and Project levels.

  For more information on how to send emails to non-Harness users, go to [Email step reference](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/email_step/).

- Converted Harness CD from an explicit to an implicit change source for Service Reliability Management. (SRM-14724)

#### Early access

- Scale down the last successful stage environment created by using a Blue Green Deployment strategy. (CDS-68527)
  
  This functionality is behind a feature flag, `CDS_BG_STAGE_SCALE_DOWN_STEP_NG`. 

  This functionality helps you efficiently manage your resources. The scale down step can be configured within the same stage or different stage based on your requirement.

  During scale down, the `HorizontalPodAutoscaler` and `PodDisruptionBudget` resources are removed, and the Deployments, StatefulSets, DaemonSets and Deployment Configs resources are scaled down. Make sure that the infrastructure definition of these resources and the Blue Green service are the same. This is necessary as Harness identifies resources from the release history, which is mapped to a release name. If you configure a different infrastructure definition, it might lead to scaling down important resources.

- Kubernetes deployments support `HorizontalPodAutoscaler` and `PodDisruptionBudget` for Blue Green and Canary execution strategies. (CDS-59011)

  This functionality is behind a feature flag, `CDS_SUPPORT_HPA_AND_PDB_NG`.

#### Fixed issues

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

## May 2023

### Harness version 79306, Harness Delegate version 23.05.79307

Harness NextGen release 79306 includes the following changes for the Harness Delegate.

#### What's new

- Added support to provide quartz cron expressions for scheduled triggers. (CDS-59261, CDS-59260)

- Added support for accessing connector attributes for Deployment Templates. (CDS-54247)
    
  The connector attributes for Secret Manager connectors can be accessed in Deployment Templates using the following expressions. 
  
  * [AWS KMS](/docs/platform/secrets/secrets-management/add-an-aws-kms-secrets-manager): `<+infra.variables.AwsKms.spec.credential.type>`
  * [AWS Secrets Manager](/docs/platform/secrets/secrets-management/add-an-aws-secret-manager): `<+infra.variables.AwsSecretsManager.spec.region>`
  * [Azure Key Vault](/docs/platform/secrets/secrets-management/azure-key-vault): `<+infra.variables.AzureKeyVault.spec.vaultName>`
  * [Google KMS](/docs/platform/secrets/secrets-management/add-google-kms-secrets-manager): `<+infra.variables.GcpKms.spec.keyName>`
  * [Google Cloud secret manager](/docs/platform/secrets/secrets-management/add-a-google-cloud-secret-manager): `<+infra.variables.GcpSecMan.spec.credentialsRef.identifier>`
  * [Custom secret manager](/docs/platform/secrets/secrets-management/custom-secret-manager): `<+infra.variables.CustomSecMan.spec.isDefault>`
  * [HashiCorp Vault](/docs/platform/secrets/secrets-management/add-hashicorp-vault): `<+infra.variables.HashiCorp.spec.vaultUrl>`

- Git polling tasks for triggers are executed on the same delegate selector used in the Git connector. (CDS-58115)
  
  Previously, triggers used the round robin algorithm to select any available delegate within a project or account. Now, the delegate-based trigger polling selects the same delegate you used in the connectors for triggers. 

- The Azure Key Vault secret manager now supports creating secrets with expiration dates. Select **Expires On** to set a secret expiration date. (PL-32708, ZD-42524)

#### Early access

- New delegate metrics are available. This functionality is behind a feature flag, `DYNAMIC_REQUEST_HANDLING`. (PL-37908, PL-38538)

   Harness captures delegate agent metrics for delegates shipped on immutable image types. The following new delegate agent metrics are available with the feature flag:
  
   | **Metric name** | **Description** |
   | :-- | :-- |
   | `io_harness_custom_metric_task_rejected` | The number of tasks rejected because of a high load on the delegate. |
   | `io_harness_custom_metric_resource_consumption_above_threshold` | Delegate cpu/memory is above a threshold (defaults to 80%). Provide `DELEGATE_RESOURCE_THRESHOLD` as the env variable in the delegate YAML to configure the threshold. |

   Enable the feature flag, `DYNAMIC_REQUEST_HANDLING` to use the new delegate agent metrics. When this feature flag is enabled, Harness will capture the metrics. For more information, go to [Configure delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics/).

#### Fixed issues

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

## April 2023

### Harness version 79111, Harness Delegate version 23.04.79106

Harness NextGen release 79111 includes the following changes for the Harness Delegate.

#### What's new

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

#### Fixed issues

- Added WebSocket reconnect logic for when the Harness Manager does not receive a heartbeat from the Harness Delegate for more than five minutes. (DEL-5954)

- Set the delegate `LANG` environment variable to en_US.UTF-8 by default. (DEL-6221)

## March 2023

### Harness version 78914, Harness Delegate version 23.03.78904

Harness release 78914 includes the following changes for the Harness Delegate.

#### What's new

- Added support for the latest Git CLI in the delegate maximal image. (DEL-6121)
  - The latest Git CLI is now included by default.

#### Fixed issues

This release does not include any fixed issues.

### Harness version 78817, Harness Delegate version 23.03.78705

Harness NextGen release 78817 includes the following changes for the Harness Delegate.

#### Fixed issues

Minor fixes to the delegate installation wizard. (DEL-6073)

Previously, Helm was not pre-selected when you switched from Docker to Kubernetes. This has been fixed. Additionally, values that need to be copied in the Kubernetes manifest were moved into a copy block. 

### Harness version 78712, Harness Delegate version 23.03.78705

Harness NextGen release 78712 includes the following changes for the Harness Delegate.

#### What's new

- Integrated **Logs** API in the **Executed Details** page where the delegate task ID is available. (DEL-6035)

  You can now view logs for delegate tasks for pipeline steps that are running or finished. This can help with debugging issues. 

- Set an expiry for delegate tokens. (DEL-5652)

  When you create a delegate token through APIs, you can provide an optional parameter `revokeAfter`. This is the epoch time in milliseconds after which the token is marked as revoked. There can be a delay of up to one hour from when the epoch value is provided to when the token is revoked.

#### Fixed issues

A pipeline stalled with only one ServiceNow task running. (DEL-6042)

This issue was fixed with the following updates:

- Tasks that were never assigned to a delegate explicitly fail after 4 successful broadcast attempts per delegate, to all eligible delegates in the account. 
- Fail one minute after the last rebroadcast attempt. 

### Harness version 78619, Harness Delegate version 23.03.78500

Harness NextGen release 78619 includes the following changes for the Harness Delegate.

#### What's new

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

#### Fixed issues

The new delegate installation wizard is now available in all delegate installation workflows. (DEL-5989)

## February 2023

### Harness version 78507, Harness Delegate version 23.02.78500

Harness NextGen release 78507 includes the following changes for the Harness Delegate.

:::note
The repository location of the Helm chart for the NextGen delegate is changing. (DEL-5576)

The repository at https://app.harness.io/storage/harness-download/harness-helm-charts/ is being deprecated. The Helm chart will no longer be available from the repository at https://app.harness.io/storage/harness-download/harness-helm-charts/. To ensure retrieval of the most recent Helm chart, update your repository references to https://app.harness.io/storage/harness-download/delegate-helm-chart/.
:::

#### What's new

This release introduces the following new features and enhancements:

You can dynamically select delegates by hostname during pipeline runs. To do so, select delegates by hostname from your delegate groups. (DEL-5052)

#### Fixed issues

This release includes the following fixes:

- Fixed an issue that interfered with the delegate installation process. Delegate API requests did not include the context that was required; organization and project ID information was not being sent with requests. The required context is now included. (DEL-5951)

### Harness version 78421, Harness Delegate 23.02.version 78306

Harness NextGen release 78421 includes the following changes for the Harness Delegate.

:::note
The repository location of the Helm chart for the NextGen delegate is changing. (DEL-5576)

The repository at https://app.harness.io/storage/harness-download/delegate-helm-chart/ is being deprecated. The Helm chart will no longer be available from the repository at https://app.harness.io/storage/harness-download/delegate-helm-chart/. To ensure retrieval of the most recent Helm chart, update your repository references to https://app.harness.io/storage/harness-download/harness-helm-charts/.
:::

#### What's new

This release introduces the following new features and enhancements:

- Added the `helm repo update` command to the delegate installer. The command is included in the instructions that apply the delegate manifest. This change reduces the chance of retrieving the wrong file from the repository. (DEL-5540)

#### Fixed issues

This release includes the following fixes:

- Resolved a problem that caused SCM log information to be displayed in the Watcher. The information was redirected to the delegate `slf4j` stream for display in the delegate logs. (DEL-5744)

### Harness version 78321, Harness Delegate version 23.02.78306

Harness NextGen release 78321 includes the following changes for the Harness Delegate.

:::note
The repository location of the Helm chart for the NextGen delegate is changing. (DEL-5576)

The repository is being deprecated. Updates to the chart will not be made to https://app.harness.io/storage/harness-download/delegate-helm-chart/ and will not be available from that location. To ensure retrieval of the most recent Helm chart, update your repository references to https://app.harness.io/storage/harness-download/harness-helm-charts/.
:::

#### What's new

This release introduces the following new features and enhancements:

- A REST-based operation to fetch a delegate token value was introduced. The operation requires the Harness user role permission `Delegate: Create/Edit`. For information about other delegate token operations, see [Delegate Token Resource](https://apidocs.harness.io/tag/Delegate-Token-Resource). (DEL-5634)

- The delegate installation UI was changed to include the `helm repo update harness` command as an option on the **Apply YAML and verify connection** page. Use this option to obtain the latest version information on the charts in the Harness Helm repository. For more information about the `update` command, see [Helm Repo Update](https://v3-1-0.helm.sh/docs/helm/helm_repo_update/) in the Helm Docs. (DEL-5540)

#### Fixed issues

This release includes the following fixes:

- Added error checking to ensure that delegates immediately reject tasks that are not supported. (DEL-5602)

#### Security enhancements

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

## January 2023

### Harness version 78214, Harness Delegate version 23.01.78101

Harness NextGen release 78214 includes no changed features or fixes for the Harness Delegate.
