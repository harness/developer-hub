---
title: What's New
date: 2022-12-22T10:00
sidebar_position: 1
---

Learn about the new features that are Generally Available (GA) in Harness SaaS across all Harness modules and the Harness Platform.

:::note
Harness deploys updates progressively to different Harness SaaS clusters. You can identify the cluster hosting your account in your Account Overview page. The features and fixes in the release notes may not be available in your cluster immediately.

Additionally, the release notes below are only for NextGen SaaS. FirstGen SaaS release notes are available [here](/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes) and Self-Managed Enterprise Edition release notes are available [here](/release-notes/self-managed-enterprise-edition).
:::

## January 17, 2023, version 78214

### Continuous Delivery

- YAML schema validation for environments. (CDS-48947)
  
  We have added YAML schema validation to environment entities. Similar validation already exists for our pipeline YAML, but environments are separate entities.
  If you try to save invalid YAML you will get an error like this:
  ```bash
  Invalid yaml: $.environment.overrides.manifests[0].manifest.spec: is missing but it is required.
  ```
- Improved error message when API calls fail while listing Helm **Chart Version** in **Run Pipeline**. (CDS-48436)
  
  If **Chart Version** is a runtime input, when you run the pipeline you are required to select a version from the **Chart Version** dropdown. If the Harness API is unable to fetch any versions, an improved error message is displayed.

  ![picture 21](static/8ca12a2c84cf95499024fd11b11c055bc13ec9de4e0e767ae6f8422aeb596d91.png)  
  
  Hover over the error message to see the full message.
  
### Platform

- A dedicated release notes page was introduced for Harness Delegate. You can find the delegate release notes at [Delegate](/release-notes/delegate).

## January 10, 2023, version 78105

### Continuous Delivery

- A [failure strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/) is now mandatory for all Deploy stages. (CDS-48951)  
  
  ![failure strategy](../static/3c690f9ba44e7cac1e6ccb605068b676ddd02f247f37c2d9b2524f30437c97ff.png)  

  A failure strategy is now a mandatory setting in the **Deploy** stage. Previously, a failure strategy was mandatory, but the check happened when the pipeline ran. 
  
  A failure strategy is also required for the **Deploy** stage in [stage templates](https://developer.harness.io/docs/platform/templates/add-a-stage-template/). With this release, all Deploy stages, including in stage templates, without failure strategies are considered invalid.

  No action required by users.
- UI enhancements for remote templates created in non-default or feature branches. (CDS-48308)
  
  If a remote template is created in a non-default or feature branch, Harness fetches the template details from the created branch and displays them on the template studio/listing page. You no longer need to manually select the correct branch.

  No action required by users.
- Absolute paths for Native Helm charts [Custom Remote Manifest](/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/add-a-custom-remote-script-and-manifests) are now supported. (CDS-47647, RN-37501)
  
  Previously, Harness CD looked for a path relative to the Harness working directory, which is a temporary directory that Harness creates. Now, you can specify an absolute path in **Extracted Manifest File Location** by starting with a forward slash `/`. For example: `/tmp/myChart1/custom-remote-test-repo/helm/todolist/`.

  ![Custom Remote Manifest](../static/b401a79386824c0b00a74ad4d9ec4576db712982f9371c8e80e0913d5e4aa14a.png)

  No action required by users.

### Harness Platform

- Secrets and connectors now have a character limit of 128 for the **Name** and **ID** fields. (PL-29887)
  
- The [Role-Assignments](https://apidocs.harness.io/tag/Role-Assignments/#operation/getFilteredRoleAssignmentByScopeList) API now fetches role assignments by scope. (PL-29496, ZD-36050)

  This helps you keep a track of the role assignments within a specific scope.
  
- The repository location of the Helm chart for the NextGen delegate is changing. (DEL-5576) 

  The repository is being deprecated. Updates to the chart will not be made to [https://app.harness.io/storage/harness-download/delegate-helm-chart/](https://app.harness.io/storage/harness-download/delegate-helm-chart/) and will not be available from that location. To ensure retrieval of the most recent Helm chart, update your repository references to [https://app.harness.io/storage/harness-download/harness-helm-charts/](https://app.harness.io/storage/harness-download/harness-helm-charts/).
  
## December 22, 2022, version 77908

### Harness Platform

-   You can now get the service provider configuration, schema, and a list of all the supported resource types corresponding to SCIM applications through API. (PL-29069)

    To facilitate the discovery of SCIM service provider features and schema, SCIM defines the following three HTTP GET endpoints:

    -   ServiceProviderConfig

    -   ResourceType

    -   Schemas

    Harness now supports these three API endpoints.

### Continuous Delivery

- [Deployment Templates](/docs/continuous-delivery/onboard-cd/cd-quickstarts/custom-deployment-tutorial) **Execution** tab now supports all steps in Command category (CDS-48030)
  - Earlier, only the Utilities steps were supported.
  - Now you can add any CD step.
+ Support for absolute paths in [Custom Remote Manifest](/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/add-a-custom-remote-script-and-manifests/) for Helm Charts (CDS-47647, ZD-37501) 
  - Previously, we were only looking for a path relative to Harness working directory (a temporary directory created by Harness).
  - Now, you can specify an absolute path in **Extracted Manifest File Location** by starting with a forward slash `/`.
  - Example: `/tmp/myChart1/custom-remote-test-repo/helm/todolist/`.
- **Referenced By** tab added to [Environments](/docs/continuous-delivery/onboard-cd/cd-concepts/services-and-environments-overview) (CDS-39989)
  - You can see which pipeline use any Environment in the Environment's **Referenced By** tab.

- The [Deployment Templates](/docs/continuous-delivery/onboard-cd/cd-quickstarts/custom-deployment-tutorial) **Execution** tab now supports all steps in the Command category. (CDS-48030)

  Earlier, only the Utilities steps were supported. Now you can add any CD step.

- Support for absolute paths in a [Custom Remote Manifest](/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/add-a-custom-remote-script-and-manifests/) for Helm Charts. (CDS-47647, ZD-37501) 

  Previously, we were only looking for a path relative to the Harness working directory (a temporary directory created by Harness). Now, you can specify an absolute path in **Extracted Manifest File Location** by starting with a forward slash `/`.

  Example: `/tmp/myChart1/custom-remote-test-repo/helm/todolist/`.

- The **Referenced By** tab was added to [Environments](/docs/continuous-delivery/onboard-cd/cd-concepts/services-and-environments-overview). (CDS-39989)

  You can see which pipeline uses any Environment in the Environment's **Referenced By** tab.

### Continuous Integration

* Customers on the free plan can now run 5 stages per day on the CI hosted infrastructure. Contact Harness Sales to upgrade your plan. (CI-6430)

* The onboarding workflow now caters to customers who do not have a codebase with which to connect. (CI-6348)

## December 13, 2022, version 77808

### Continuous Delivery

- ServiceNow Connector YAML has changed to include authentication details. (CDS-46672, CDS-45969)

  **The update is minor and requires no changes by users.**

- Harness Serverless Lambda and ECS support now supports AWS S3 (CDS-46204, CDS-45642)

  You can now use AWS S3 for your Serverless YAML and ECS configuration files (Task Definition, Service Definition, Scaling Policy, and Scalable Target JSON/YAML files).

- The <+rollbackArtifact...> expression is now available (CDS-46321)

  For example, if you used a publicly available Docker Hub NGINX image as the Artifact Source for a Service, then when the Service is rolled back, the <+rollbackArtifact.meta.image> expression output would be something like this: registry.hub.docker.com/library/nginx:stable-perl.

  The variables available in rollbackArtifact depends on the artifact and infrastructure type used in the deployment. They can be seen in Output tab of Infrastructure section of a CD stage.

  There are many different available, demonstrated in this script:

        echo <+rollbackArtifact.bucketName>

        echo <+rollbackArtifact.buildNo>

        echo <+rollbackArtifact.buildFullDisplayName>

        echo <+rollbackArtifact.ArtifactPath>

        echo <+rollbackArtifact.description>

        echo <+rollbackArtifact.displayName>

        echo <+rollbackArtifact.fileName>

        echo <+rollbackArtifact.key>

        echo <+rollbackArtifact.metadata.image>

        echo <+rollbackArtifact.metadata.tag>

        echo <+rollbackArtifact.source.registryUrl>

        echo <+rollbackArtifact.url>

### Harness Platform

- You can now refer to existing secrets of Azure Key Vault, AWS secret manager, and GCP secret manager. (PL-29915)

  With this enhancement, you need not create secrets in Harness. You can use expressions to reference the secrets already existing in the mentioned secrets managers. For more information, see [Reference Existing Secret Managers Secrets](https://developer.harness.iohttps://developer.harness.io/docs/platform/security/reference-existing-secret-manager-secrets/).

- You can now use the Git client to commit changes while creating or updating pipelines using Bitbucket on-prem as the Git provider. (PIE-6423)

  To do this, enable Use Git client for commits in the default settings at the account scope. Harness checks out the code on the delegate and uses the Git client to make the commits to your Git repository.

## December 7, 2022, version 77716

### Continuous Delivery

Helm steady state checks with Kubernetes version >= 1.16 (CDS-40269)

Harness will automatically perform steady state checks with Helm deployments using Kubernetes version >= 1.16.
This feature was previously behind the HELM_STEADY_STATE_CHECK_1_16 feature flag and is now GA.

### Harness Platform

Securing data through JSON Web Token (JWT) masking. (PL-29019, ZD-32004)

Harness now masks all JWTs in pipelines and delegate logs. This change prevents data leakage risks for the applications running in Harness.

## December 2, 2022, version 0.4.2

### Chaos Engineering

- Update feature for ChaosHub enables users to update details such as `Git Connector`, `Repository Name`, `Branch Name` and `Name` for an already connected ChaosHub.

- Adds CDN Support for Chaos module static artifacts thereby loading the UI with reduced latency on client devices.

- Adds version information in the ChaosDriver and ChaosManager. Hence, the versions are available over endpoints `/chaos/driver/api/version` and `/chaos/manager/api/version` for ChaosDriver and ChaosManager, respectively.

- Adds a range filter dropdown in the `Experiment Runs` bar graph under `Experiment overview` allowing you to set the range on the last runs shown in the graph.

- Adds support for all fault statuses in the `Experiment Runs` graph. Apart from `Failed` and `Passed` states being shown, faults in `Awaited`, `Stopped` and `N/A` states are also available under the `Experiment Runs` graph.

- Adds manifest download button in the UI for Chaos Infrastructures that enables you to have a seamless upgrade.

- Adds consistent loaders for all components and screens in the UI.

## November 29, 2022

### Harness Platform

- Fix to help you identify Harness in your two-factor authentication app. (PL-29563)

  The default name of the entry for Harness in two-factor authentication (2FA) apps such as Google Authenticator now begins with Harness\_. This change enables you to identify the correct entry, and to therefore use the correct code, for authenticating to Harness. If you configured 2FA for Harness before this change, remove the existing entry and reconfigure 2FA to see the new name.

- Direct use of email addresses in v2 APIs for creating and updating user groups. (PL-29018)

  You can now use email addresses in v2 APIs for creating or updating a user group. It is no longer required to first fetch the email addresses by using user IDs

- You can now create user groups inline when setting up the Approval stage in a pipeline. (PL-28022)

  This is helpful when the user group that needs to be sent notifications does not already exist. The scope of the user group is within the project corresponding to the pipeline.

  The Harness UI now lists the versions of services in your account settings. To see the versions, go to Account Settings > Overview, and then expand Platform Service Versions. (PL-26581)

- Approval messages in Harness approvals can now have expressions in multiple lines. (PIE-6238, ZD-36667,37069)

- Harness service variables now support dots (.). (PIE-4613)

  This is helpful when you have JSON/YAML files where you want to update the keys with some values. You can define variables for those keys in harness with (.) to access the keys. The expression to access a key would be:

  <+variables.get("example.key")>

- You can now drag the step details section and move it to the desired location. (PIE-3890)

- You need not enter the Tags or Description while importing an entity from Git. (PIE-6171)

  The corresponding information for these fields are fetched from Git.

## November 21, 2022

### Continuous Delivery

- Fetch Helm Chart Versions from Source on Run Pipeline UI (CDS-40390)

  Now you can set Helm Chart version using a runtime input (when using HTTP Helm, S3, and GCS stores), view the list of chart versions available at runtime, and select the required one.

  For Helm deployment information, go to [Helm Chart deployment tutorial](https://developer.harness.io/docs/continuous-delivery/onboard-cd/cd-quickstarts/helm-cd-quickstart/).

- Copy of Service and Environment variables (CDS-38870, ZD-37291)

  You can now copy the FQNs for Service and Environment variables. The Service variables use the format <+serviceVariables.[variable name]> and Environment variables use the format `<env.variables.[variable name]>`.

### Feature Flags

A new React Client SDK has been released for Feature Flags as version 1.0.0. For more information about this SDK and how to integrate with it, go to the [React Client Reference Guide](https://developer.harness.io/docs/category/client-sdk-guides/) and the [React Client GitHub repository](https://github.com/harness/ff-react-client-sdk).

## November 11, 2022

### Continuous Delivery

- Helm steady state checks with Kubernetes version >= 1.16 (CDS-40269)

  Harness will automatically perform steady state checks with Helm deployments using Kubernetes version >= 1.16.

  This feature was previously behind the HELM_STEADY_STATE_CHECK_1_16 feature flag and is now GA.

- Support for the Command step is added Deployment Template deployment types (CDS-45189)

  Now you can use the Command step in a Deployment Template pipeline. Using this step you can download/copy the artifact, copy the config files, or run scripts on the instances output by the Fetch Instances step.

  The Command step will always run on the Delegate, hence you need to enable the Run On Delegate option.

  The Command step should always be run after the the Fetch Instances step.

  See [Use the Command step to download, copy, or run scripts](https://developer.harness.io/docs/continuous-delivery/cd-execution/cd-general-steps/download-and-copy-artifacts-using-the-command-step).

### Harness Platform

- You can now send email notifications to all the members of a user group by selecting the Send email to all users part of the user group option.(PL-29434, ZD-32444)

  For existing user groups, this is the default option.

- The organization filter selection on the project listing page will now persist across user sessions and page navigations.(PL-29292)

  You can now see the versions of the services in Account Overview in Platform Service Versions.(PL-26581)

## November 6, 2022

### Harness Platform

The option to disable Harness Secret Manager is now a part of the core settings in Account Default Settings. (PL-27160)

### Continuous Integration

The Custom Git Connector now supports connection via the Harness Platform, in addition to the ability to connect through the Harness Delegate. Connecting through Harness Secrets Manager is required to use the generic git connector on the Harness Cloud build infrastructure hosted by Harness. (CI-5666)

## October 31, 2022

### Security Testing Orchestration

- New output variables – This release includes a new set of output variables you can use to determine the next stage of your pipeline. These variables show the number of new issues detected in the current scan compared to the last scan. If this is the first scan for the target, these variables reflect new issues compared to the baseline. You can use these variables to determine the next stage of your pipeline:

  - NEW_CRITICAL
  - NEW_HIGH
  - NEW_MEDIUM
  - NEW_LOW
  - NEW_UNASSIGNED (Reserved for future use)
  - NEW_TOTAL (STO-4866)

- STO Overview – The [STO Overview](https://developer.harness.io/docs/continuous-delivery/cd-execution/cd-general-steps/download-and-copy-artifacts-using-the-command-step) provides a single, interactive view of all baseline issues detected by all scans in your project. A time series chart shows the daily distribution of issues by severity over the past 30 or 90 days. A daily snapshot shows the sum of all baseline issues based on the latest scan of each baseline. You can also drill down into active, failed, and in-progress baseline scans. (STO-3629)

- STO scans on VMs using Docker delegates – You can now run builds with STO scans using Docker delegates running on Linux VMs in AWS and other cloud platforms. This extends the support for STO scans with Kubernetes delegates.

  For information about setting up a VM build infrastructure, see [Set Up Build Infrastructure](https://developer.harness.io/docs/category/set-up-build-infrastructure/) in the CI docs. (STO-4639)

- Two-step Exemption and Security Review – This release enhances support for a two-step process for requesting and approving security exemptions:

  - Developers can request (but not approve) exemptions to unblock pipeline builds for specific issues.
  - Only SecOps users can approve exemption requests and choose to mute or ignore specific issues. (STO-4479)

- AWS Security Hub – STO now supports scans in AWS Security Hub. (STO-4873)

- AWS ECR – STO now supports scans on AWS Elastic Container Registry (ECR). (STO-4969)

## October 21, 2022

### Cloud Cost Management

You can now add labels to enable node pool recommendations. kops cluster node label is added for node pool recommendations. See [Labels for node pool recommendations](https://developer.harness.io/docs/cloud-cost-management/use-cloud-cost-management/ccm-recommendations/node-pool-recommendations/) for more information. (CCM-9309)

### Harness Platform

You can now import Templates from your Git repo. (PL-28597)

See [Import a Template From Git](https://developer.harness.io/docs/platform/git-experience/import-a-template-from-git/).

## October 18, 2022

### Continuous Delivery

You can now send Approval Step notifications to multiple Users as part of the User Group (CDS-43667, ZD-32444)
Manual Approval email notifications configured for a User Group now send the approval emails to all Users of the User Group without having the need to specify a group email.

### Continuous Integration

The Infrastructure tab in Build steps has been updated to show only supported options when a Hosted build infrastructure is selected. (CI-5737)

## Harness Platform

- The functionality of the delegate auto-upgrade components was enhanced. On installation, the AutoUpgrade feature displays a status message of Synchronizing. If the component does not receive an API call from the upgrader within 90 minutes, the status message changes to OFF. This affects delegates that are installed with upgrader components.

  For more information about delegate auto-upgrade, see [Delegate Auto-Update](https://developer.harness.io/docs/platform/delegates/delegate-guide/delegate-auto-update/).

- A loader is now displayed on click of Run Pipeline to indicate that the Pipeline is running. (PIE-5396)

### Feature Flags

You can now add a default pipeline to your Feature Flags that will be applied when you add targeting rules, or when you enable or disable a Flag. This means that you can ensure your Flag changes go through the process you want them to, allowing for better security and more consistent operations. For example, you can add an approval step so all your production Flag changes must be approved before they are executed, or you can send a Slack notification every time a Flag changes.

For more information about how to use a default pipeline for your Flags, go to [Add a Default Pipeline for Flag Changes](https://developer.harness.io/docs/feature-flags/ff-using-flags/ff-build-pipeline/default-pipeline-ff/).

## October 7, 2022

### Harness Platform

You can now use a readOnly vault as a default SM. (PL-24491)

### Continuous Delivery

- ECS deployments: deploy artifacts to your Amazon Elastic Container Service (ECS) clusters using a Rolling, Canary, and Blue Green strategies.

  For more information, go to: [ECS deployment tutorial](https://developer.harness.io/docs/continuous-delivery/onboard-cd/cd-quickstarts/ecs-deployment-tutorial/).

- Traditional deployments using SSH or WinRM: deploy your artifacts to hosts located in Microsoft Azure, AWS, or any platform-agnostic Physical Data Center (PDC).

  These deployments are called Traditional because they use Secure Shell and PowerShell scripts and a traditional runtime environment as opposed to containers and orchestration mechanisms, like Kubernetes.

  For more information, go to:

  [Secure Shell (SSH) deployment tutorial](https://developer.harness.io/docs/continuous-delivery/onboard-cd/cd-quickstarts/ssh-ng/)

  [WinRM deployment tutorial](https://developer.harness.io/docs/continuous-delivery/onboard-cd/cd-quickstarts/win-rm-tutorial)

- Custom deployments using Deployment templates: In some cases, you might be using a platform that does not have first class support in Harness, such as OpenStack, WebLogic, WebSphere, Google Cloud functions, etc. We call these non-native deployments. For non-native deployments, Harness provides a custom deployment option using Deployment Templates.

  For more information, go to: [Custom deployments using Deployment Templates tutorial](https://developer.harness.io/docs/continuous-delivery/onboard-cd/cd-quickstarts/custom-deployment-tutorial).

- The ability to provision resources in a CD stage's deployment infrastructure using the CloudFormation Create Stack step is now GA. Previously, it was behind the CLOUDFORMATION_NG feature flag.

### Continuous Integration

- You can now select Kotlin and Scala as languages in the Run Tests step when setting up Test Intelligence. You can also select sbt as a build tool for Scala. (CI-5653, CI-3333)

- Run Step logs now show the commands that the step will run before it runs them. This functionality is limited to Kubernetes build infrastructures. (CI-5557)

## September 29, 2022

### Continuous Delivery

For [Native Helm deployments](https://developer.harness.io/docs/category/native-helm-deployments/), you can enable the new Ignore Release History Failed Status option to have Harness ignore when the Helm release is in a failed state. (CDS-43785)

By default, if the latest Helm release failed, Harness does not proceed with the install/upgrade and throws an error. Enable the Ignore Release History Failed Status option to have Harness ignore these errors and proceed with install/upgrade.

### Cloud Cost Management

- First-class Support for Istio is released with version 1.0.8 of autostopping-controller.​ (CCM-8386)

  You can now onboard Istio virtualservices-based workloads to AutoStopping without editing the virtualservice manually.​

- Now, you can sort perspective filters while creating cost categories, perspectives, etc. You can search for a filter quickly and apply it easily.​ (CCM-8597)​

### Continuous Integration

CI pipelines now support workflows that can run with some runtime inputs undefined. Previously a pipeline would fail if any runtime input was undefined for any field such as an environment variable, label, build argument, or port binding. (CI-5116, ZD-33893)

### Harness Platform

- The method that the log streaming task client uses to create thread pools was modified. Thread pools are now created one time in the client's lifetime instead of being created for each task the Delegate receives. (DEL-4328)

- When NG LDAP authorization is 'disabled', all LDAP SSO-linked Harness User Groups don't sync in NG. They sync with the users from LDAP when the LDAP settings have authorization enabled.​ (PL-27954)​​

## September 26, 2022

### Feature Flags

For self-serve customers, you can now create and upgrade a Feature Flags subscription directly through the Harness Platform instead of contacting our Sales team, meaning you can manage your subscription quickly, securely, and at any time.

For information about the current plans you can subscribe to, go to [Pricing & Plans](https://harness.io/pricing?module=ff#). For more information about how to use subscriptions, go to [Subscribe to Feature Flags](https://developer.harness.io/docs/category/subscribe-to-feature-flags/).

## September 22, 2022

### Harness Platform

- Harness Manager was changed to remove the edit and details UI for Immutable Delegates. These Delegates cannot be changed. (DEL-4756)

- Harness Manager UI was updated to ensure that Delegate version and associated information clarifies the difference between older immutable and legacy Delegates. (DEL-4826)

- A migration will run to remove the following Role Bindings directly assigned to users for accounts having ACCOUNT_BASIC_ROLE turned ON (PL-28284):​

  - At Account Scope, Account Basic/Account Viewer - All Account Resources​.​
  - At Organization scope, Organization Viewer - All Organization Resources.​​
  - At Project Scope, Project Viewer - All Project Resources.​​

- Harness now has a default User Group at each scope. ​These groups have all the users at the respective scope as their members. As a part of this change, Harness will stop assigning any roles to the User Groups by default.​ Users can assign roles to the default User Group at a specific scope, which becomes the default role for all the users in that group. (PL-26145)

  See [Harness Default User Groups](https://developer.harness.io/docs/platform/role-based-access-control/harness-default-user-groups/).

## September 14, 2022

### Continuous Delivery

- Shell Script Output Variables now allow the Secret type (CDS-41263, ZD-33761)

  You can select String or Secret for your output variable.

  When you select Secret and reference the output variable later in the Pipeline, Harness will automatically sanitize the resolved secret value in the logs.

  See [Using Shell Scripts in CD Stages](https://developer.harness.io/docs/continuous-delivery/cd-execution/cd-general-steps/using-shell-scripts/).

### Harness Platform

- The versioning scheme for the Immutable Delegate was changed from 1.0.`<build_number>` to year.month.`<buildNumber>`. (DEL-4338)

- Expiration was added for Immutable Delegate images. These images will now expire after three months. (DEL-4377)

- Fixed the display of an error message in the UI. The error message was not properly displayed when a pipeline selector was added using invalid characters. (DEL-4755)

- Login Settings is now renamed to Authentication Settings in Audit Trail. (PL-28048)

- You can now view your unsaved changes in the Pipeline Studio by clicking on Unsaved Changes. (PIE-5281)

- You can now use forecasting on your dashboards to help you create data predictions. (CDB-351)

## September 9, 2022

### Continuous Delivery

- Support for Gov Cloud for AWS Connectors in NG (CDS-42414).

  AWS Government Cloud is now supported.

- Support Jira 'user assignment' fields when using Jira integration (CDS-37792).

  Fields that manage users and issue links are now supported by Harness.

### Feature Flags

The Feature Flag PHP SDK has been released. This means you can now connect an application that uses PHP when using Harness Feature Flags.

For more information about the PHP SDK, go to the [PHP Reference Guide](https://developer.harness.io/docs/feature-flags/ff-sdks/server-sdks/php-sdk-reference/) or for general information about Feature Flag SDKs, go to our [SDK Overview](https://developer.harness.io/docs/category/sdks-overview).

To get the PHP SDK, go to our [PHP Git Repository](https://github.com/harness/ff-php-server-sdk).

## September 7, 2022

### Harness Platform

You can now inherit User Groups created at a higher scope by using Assign Roles.

See [Assign Roles](https://developer.harness.io/docs/platform/Role-Based-Access-Control/add-user-groups#step-assign-roles).

## August 31, 2022

### Harness Platform

- Git Experience in Next Gen is now enhanced and simplified.

  See [Git Experience](https://developer.harness.io/docs/category/git-experience/).

- You can now switch branches directly from the Pipeline execution history. This will make it easier to switch branches straight from execution history rather than going to the Pipeline studio first and then returning to execution history. (PIE-4985)

- You can now view the past 10 executions of the Pipelines and sort them from the table. You can also go to a specific execution by clicking on it. (PIE-4903)

## August 25, 2022

### Feature Flags

You can now configure the Relay Proxy for Feature Flags to load and use configuration data that is stored offline. This means in case of an outage, you can still use the Proxy with the configuration you set. To use this feature, you need to generate the offline configuration and then run the Proxy in offline mode. For more information about how to do this, go to the [Relay Proxy overview](https://developer.harness.io/docs/category/git-experience/) and [Run the Proxy in offline mode](https://developer.harness.io/docs/feature-flags/ff-using-flags/relay-proxy/deploy-relay-proxy#run-the-relay-proxy-in-offline-mode).

The Feature Flag Relay Proxy has been updated to version 0.9.7.

### Continuous Integration

- This release includes a new Git Clone step that clones a repo separate from the repo specified in the Codebase object. This step supports all the config options supported for Codebase objects. (CI-4692)

- You can now use a hosted delegate for Docker, Artifactory, AWS, GCP, BitBucket, GitLab, and Azure connectors. (CI-4828, CI-5241)

### Harness Platform

- Now you can add up to 50,000 users in the Harness Non-Community Edition. (PL-27300)

  See [Add and Manage Users](https://developer.harness.io/docs/platform/Role-Based-Access-Control/add-users).

- You can now use an enhanced Git Experience. (PL-26339)

  See [Harness Git Experience Overview](https://developer.harness.io/docs/platform/git-experience/git-experience-overview/).

Harness will continue to support users who have been using the old Git Experience.

## August 18, 2022

### Continuous Integration

You can now run connection tests for AWS, GCP, and Azure connectors. By default, executeOnDelegate field is true so that existing connectors remain backward-compatible. (CI-4980)

## August 8, 2022

### Continuous Integration

This release introduces validations for Custom Webhook events. The event handler now provides appropriate error messages if an event has incorrect values. (CI-4300, ZD-30121)

## August 2, 2022

### Security Testing Orchestration

The STO module launches its first GA product with the following capabilities:

- Pipeline-Driven STO:

  - Standalone STO:
    - Provision to create standalone STO Stages and secure Pipelines (Ex: Pipelines initiated via Gitlab or Github).
  - Orchestrate scanners inside Harness CI Pipeline:
    - Run scanners as an additional stage or steps within a Harness CI Pipeline.
  - Orchestrate scanners inside Harness CD Pipeline:
    - Run scanners as an additional Stage or Steps within a Harness CD Pipeline.

- Developer-first Remediation: Security testing results normalized, deduplicated, and prioritized across all scanners.

- Dedicated Security Exemptions Section: Ability to grant and manage security exemptions by SecOps owners on identified vulnerabilities or issues during security testing. Exemptions can also be made in the STO Pipeline against specific issues.

- Custom Dashboards & Reports: Ability to create custom visualizations and reports based on attributes related to STO and secure pipeline creation (40+ attributes).

- OPA based Governance Policies: Support for crafting governance policies for STO specific Pipelines and workflows.

- Platform Integration: Audit trails and other Enterprise Platform features like RBAC, Notifications, Pipeline Config-as-Code

  - Default RBAC roles for STO Developer & STO SecOps Personas
  - Notification Channels:
    - Email, Slack, PagerDuty, Microsoft Teams

- Self-Managed Platform (On-premise software)
  - Helm Chart package with bundled Harness CI and CD modules

See [Security Testing Orchestration Basics](https://developer.harness.io/docs/security-testing-orchestration/onboard-sto/security-testing-orchestration-basics).

### Continuous Integration

Users can now use Azure Repos connectors in pipeline codebase configuration and triggers. (CI-4825)

### Harness Platform

Role-based Access Control has been added to Custom Dashboards. To access Dashboards, users now must have the View Dashboards permissions.

## July 11, 2022

### Continuous Delivery

- AWS Connector Assume IAM Role on Delegate and Use IRSA credentials support for Serverless Lambda (CDS-38924)

  You can now use the Assume IAM Role on Delegate and Use IRSA credentials options when setting up an AWS Connector for Serverless Lambda deployments.

  For more information, refer to [AWS Connector Settings Reference](https://developer.harness.io/docs/platform/connectors/ref-cloud-providers/aws-connector-settings-reference/).

- Allow AWS ECR artifact for Serverless Lambda (CDS-38857)

  You can now use artifacts from an AWS ECR registry for Serverless Lambda deployments.

  For more information, refer to [Serverless Lambda Deployment Tutorial](https://developer.harness.io/docs/continuous-delivery/onboard-cd/cd-quickstarts/serverless-lambda-cd-quickstart/).

### Continuous Integration

The Build UI now shows a new VM icon. (CI-4630)

### Cloud Cost Management

- Resource names display enhancement (CCM-8079)

  Resource names were truncating values in a column. Resources name are now shown in full if possible.

- ECS recommendations enhancement (CCM-8009)

  We were showing $0.00 recommendation savings for ECS. Now only recommendations with minimum savings amount > $1 are shown on the list page.

  For more information, refer to [Optimize AWS ECS Costs with Recommendations](https://developer.harness.io/docs/cloud-cost-management/use-cloud-cost-management/ccm-recommendations/ecs-recommendations/).

- Perspectives CSV download improvement (CCM-7908)

  Perspectives CSV was downloading 2 times on first download.

  For more information, refer to [Create Cost Perspectives](https://developer.harness.io/docs/cloud-cost-management/use-cloud-cost-management/ccm-perspectives/create-cost-perspectives/).

- More descriptive browser tab titles were added (CCM-7869)

- Slack notifications for Budgets (CCM-7816)

  You can now set the notification channel to Slack and add multiple webhook URLs when creating a budget.

  For more information, refer to [Create a Budget](https://developer.harness.io/docs/cloud-cost-management/use-cloud-cost-management/ccm-budgets/create-a-budget/).

### Harness Platform

- Support for the use of secrets for notifications to be sent via the Delegate (PL-22129)

  You can now add your notification webhook URLs as Encrypted Texts in Harness and reference them for the following notification methods:

        * Slack Notifications
        * PagerDuty Notifications
        * Microsoft Teams Notifications

  For more information, refer to [Manage Notifications](https://developer.harness.io/docs/category/notifications-1/), [Add a Pipeline Notification Strategy](https://developer.harness.io/docs/continuous-delivery/cd-advanced/cd-notifications/notify-users-of-pipeline-events/).

- Improved error messages in the console view for Pipeline execution.​ (PIE-3915, ZD-31031)

- Improved console view for stages. (PIE-3886)

- Improved NextGen secret cache to store encryption Details​ (DEL-4288)

  The Secret cache in NextGen has been revamped to store Encryption details. These details are being fetched from NextGen manager via rest API calls from the FirstGen manager, which increases latency during task queuing. With this cache, we will substantially reduce this latency.​

- Hard Delete Delegates and linked entities when their parent Project or Organization is deleted​ (DEL-4202)

  Delegate entities will be hard deleted on deleting parent Org/Project. Users will be able to recreate these entities with the same identifier.​

- Remove OVERRIDE_CONNECTOR_SELECTOR​ (DEL-4159)

  Added support for scoping a single Delegate to an Environment, Pipeline, or Stage. For CD pipelines, the option to add Delegate selectors at Pipeline, Stage, and Step group levels is introduced along with the existing Step level and Connector level.

- Improved the logic of Delegate token validation to make it more performant​. (DEL-3998)

- Removed the io_netty_netty dependency from delegates​. (DEL-3798)
