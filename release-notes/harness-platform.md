---
title: Harness Platform
tags: [NextGen, "platform"]
date: 2022-12-22T10:00
sidebar_position: 10
---

Harness Platform is updated regularly in Harness SaaS. Review the notes below for details about recent changes.

:::note
Harness deploys updates progressively to different Harness SaaS clusters. You can identify the cluster hosting your account in your Account Overview page. The features and fixes in the release notes may not be available in your cluster immediately.

Additionally, the release notes below are only for NextGen SaaS. FirstGen SaaS release notes are available [here](/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes) and Self-Managed Enterprise Edition release notes are available [here](/release-notes/self-managed-enterprise-edition).
:::

## January 17, 2023, version 78214

### What's new

This release introduces a dedicated release notes page for Harness Delegate &mdash; SaaS. You can find release notes for the NextGen delegate at [Delegate](/release-notes/delegate).

### Early access

No early access features are available in this release.


### Fixed issues
- The Harness APIs return a status code of HTTP 400 instead of HTTP 401 for an invalid or expired token. (PL-30757, ZD-38494,38547)

  An enhancement to the code has fixed this issue.
  
- The project selector component selects multiple projects with the same project name across different organization IDs.(PL-30663)
  
  The project selection code has been enhanced to select projects corresponding to specific organization IDs.

- The error message displayed when creating the GitHub connector and selecting **Harness Platform** as the connectivity option is not clear and informative. (PL-29953)
  
  Modifying the error message to indicate that the secret manager being used is not Harness' built-in secret manager fixed the problem.

## January 10, 2023, version 78105

Delegate version: 78100

### Important announcements

**Update repository references to the NextGen Helm delegate** 

The location of the repository that contains the NextGen Helm chart is changing. Change your references to the repository location from [https://app.harness.io/storage/harness-download/delegate-helm-chart/](https://app.harness.io/storage/harness-download/delegate-helm-chart/) to [https://app.harness.io/storage/harness-download/harness-helm-charts/](https://app.harness.io/storage/harness-download/harness-helm-charts/). Updates to the chart will not be made to the deprecated repository.

**The following role-assignments are removed for all the existing users across all the accounts:**(PL-28848)

  - **Account Viewer - All Account Level Resources**: This was a role-assignment within the account scope and has been removed for all the users.
  This does not apply in the following scenarios: 
    - If an account has enabled the feature flag `ACCOUNT_BASIC_ROLE_ONLY`.
    - If an account does not have the **Account Viewer - All Account Level Resources** role-assignment for the default user group `All Account Users`.
- **Organization Viewer - All Organization Level Resources**: This was a role-assignment within the organization scope and has been removed for all the users.
- **Project Viewer - All Project Level Resources**: This was a role-assignment within the project scope and has been removed for all the users.

For more information, see [Default User Group](https://developer.harness.io/docs/platform/role-based-access-control/harness-default-user-groups/)


### What's new

- Secrets and connectors now have a character limit of 128 for the **Name** and **ID** fields. (PL-29887)
  
- The [Role-Assignments](https://apidocs.harness.io/tag/Role-Assignments/#operation/getFilteredRoleAssignmentByScopeList) API now fetches role assignments by scope. 
(PL-29496, ZD-36050)
  This helps you keep a track of the role assignments within a specific scope.

- The repository location of the Helm chart for the NextGen delegate is changing. (DEL-5576) 

  The repository is being deprecated. Updates to the chart will not be made to [https://app.harness.io/storage/harness-download/delegate-helm-chart/](https://app.harness.io/storage/harness-download/delegate-helm-chart/) and will not be available from that location. To ensure retrieval of the most recent Helm chart, update your repository references to [https://app.harness.io/storage/harness-download/harness-helm-charts/](https://app.harness.io/storage/harness-download/harness-helm-charts/).

### Early access

No early access features are available in this release.

### Fixed issues
- Inline selection does not display connectors and secrets according to their scope. (PL-30655)
  
  An enhancement in the pre-select logic has fixed this issue.

- In spite of selecting **Start TLS** in the UI, the SMTP configuration does not support StartTLS. (PL-30574)

  A code enhancement has resolved this issue.

- The Get Resource Group API returns an HTTP 200 response code when an entity is missing. (PL-30236)

  This has been fixed, and the API now returns an HTTP 404 response code if an entity is missing.

- Editing a connector through connector selection does not automatically select it. (PL-28175)

  Enhancing the connector selection component logic to pre-select the connector in the list if it is in edit mode fixed this issue.

- Unauthorized user login to a Harness account displays a white label error. This happens when the account has SAML enabled with restricted email domain access.(PL-15022)
  
  This has been fixed by displaying appropriate error message.

- The date format in Pipeline Studio is incorrect. (PIE-7040)

  Changing the date format to `DD/MM/YYYY` has fixed this issue.

- Input sets with expression set fields does not support autocomplete. (PIE-6990)

  The addition of pipeline variables context provider to the input set form has fixed this issue.

- A hover over the stage does not display the condition details for skipping the stage. (PIE-6987)

  A correction to the path used to collect the details has fixed this issue.
  
  -   Changed how the NextGen Docker delegate is identified in the delegate section log. The Docker delegate is now identified by the delegate ID, which is the concatenation of `delegateName` and `delegateHostName`. This replaces the use of the delegate name (`delegateHostName`), which was usually the `containerId` value. (DEL-5280) 

- Changed the behavior of the delegate dropdown menu. The UI core library was updated to add a parameter that prevents the reset of expanded states when new data loads in a table. This resolved an issue with the dropdown menu collapsing automatically. (DEL-5541)

- Fixed a problem that was causing the `kryo` component to fail. The problem was caused when nested `java.lang.RuntimeException` errors occurred during manager response. (DEL-5609)    

## December 22, 2022, version 77908

Delegate version: 77802

### What's new

-   API support for discovery of SCIM service provider features and schema. (PL-29069)
    
    Harness now supports the following three HTTP GET API endpoints to facilitate the discovery of SCIM service provider features and schema. These endpoints are defined in SCIM 2.0:

    -   ServiceProviderConfig

    -   ResourceType

    -   Schemas

### Early access

No early access features are available in this release.

### Fixed issues

-   Changed how the delegate handles secrets. Multiline secrets are now detected and masked appropriately. (DEL-5510)
 
-   Changed the display of delegate version information in Harness Manager to exclude minimum version information for delegates that are not connected. (DEL-5523)

-   The Create Resource Group API returns an HTTP 500 response code when the included scopes are blank. (PL-30195, ZD-37663)

    This has been fixed by adding a null check and throwing a null pointer exception when the included scopes are left blank.

-   Editing a connector through connector selection does not automatically select it. (PL-28175)

    Enhancing the connector selection component logic to pre-select the connector in the list if it is in edit mode fixed this issue.
    
-   Entering an invalid value for `tenant_id` does not throw any error and allows selection of previously loaded vaults in Azure Key Vault secret manager. (PL-28136)
    
    Displaying an appropriate error message and setting the vault value to empty when there is an error in fetching vaults has fixed this issue.

-   Searching for email addresses to add users to user groups does not show any results. (PL-27797)
    
    Changing the filter logic to search using the email address as well as the user name has fixed this issue.

-   The date format in Pipeline Studio is incorrect. (PIE-7040)

    Changing the date format to `DD/MM/YYYY` has fixed this issue.

-   Retrying a failed pipeline does not populate the start pipeline dialog with the input values from the previous execution. (PIE-6780, ZD-37648)
    
    Resetting the input set form with values from Formik has fixed this issue.

-   If the environment details are blank in the deploy stage settings, clicking the Service tab throws an error. (PIE-6240)
    
    Adding backward compatibility for the tabs has fixed this issue.


## December 13, 2022, version 77808

### What's new

- You can now refer to existing secrets of Azure Key Vault, AWS secret manager, and GCP secret manager. (PL-29915)

  With this enhancement, you need not create secrets in Harness. You can use expressions to reference the secrets already existing in the mentioned secrets managers. For more information, see [Reference Existing Secret Managers Secrets](https://developer.harness.io/docs/first-gen/firstgen-platform/security/secrets-management/reference-existing-secrets/).

- You can now use the Git client to commit changes while creating or updating pipelines using Bitbucket on-prem as the Git provider. (PIE-6423)

  To do this, enable Use Git client for commits in the default settings at the account scope. Harness checks out the code on the delegate and uses the Git client to make the commits to your Git repository.

### Early access

No early access features are available in this release.

### Fixed issues

- Executing a pipeline with multiple states causes issues and results in incomplete execution. (PIE-6893)

  This happens when one of the steps of the pipeline deploys a single service to multiple environments with GitOps.

  An enhancement in the logic has fixed this issue and the pipeline now executes completely.

- When running a preflight check with an empty field in input sets, the error message displays incorrectly. (PIE-5788)

  A correction to the error message has fixed this issue.

## December 7, 2022, version 77716

Delegate: 77800

### What's new

- Securing data through JSON Web Token (JWT) masking. (PL-29019, ZD-32004)

  Harness now masks all JWTs in pipelines and delegate logs. This change prevents data leakage risks for the applications running in Harness.

### Early access

No early access features are available in this release.

### Fixed issues

- Provisioning users through SCIM using Okta throws an error. This happens when a user is first staged in Okta and then activated with the Harness app. The GET API for SCIM does not return any result although the user exists in the Harness database. (PL-29702, ZD-36753)

  An enhancement in the fetch logic for the GET API has fixed this issue.

- The DELETE API for Harness entities does not throw an error when the entity identifier is invalid. The API response code is 200 and the data field in the response is False. (PL-27270)

  The API now returns an HTTP 404 response code and an appropriate error message.

- The drag-drop feature for nodes on the create node settings does not work. (PIE-6575)

  Adding event logic for improved handling of drag-and-drop actions on nodes has fixed the issue. You can now drag-drop a node on a new as well as existing node.

- The authorization header in the log streaming request is missing Bearer before the token. This issue causes log streaming to fail. (PIE-6554)

  Changing the signature of the authorization header to Authorization: Bearer `<token>` has fixed this issue.

- Clicking All Events when creating a notification for a pipeline does not select all the events. (PIE-6524)

  Selecting all the pipeline events on clicking All Events has fixed this issue. Now the All Events field also has an additional state indeterminate associated with it. The state indicates if all the pipeline events are neither included nor excluded for notifications.

- The HTML parsing for pipeline logs takes longer than expected and delays the display of the logs. (PIE-6538)

  An enhancement in the parsing technique and the introduction of caching has fixed this issue.

- When creating a pipeline, stage, or step, you are allowed to use the $ sign in the name or identifier even though the $ sign is invalid in those strings. (PIE-6078)

  A modification to the regex to remove the support for the $ sign has fixed this issue.

## November 29, 2022, version 77608

Delegate: 77431

### What's new

**Platform**

- Fix to help you identify Harness in your two-factor authentication app. (PL-29563)

  The default name of the entry for Harness in two-factor authentication (2FA) apps such as Google Authenticator now begins with Harness\_. This change enables you to identify the correct entry, and to therefore use the correct code, for authenticating to Harness. If you configured 2FA for Harness before this change, remove the existing entry and reconfigure 2FA to see the new name.

- Direct use of email addresses in v2 APIs for creating and updating user groups. (PL-29018)

  You can now use email addresses in v2 APIs for creating or updating a user group. It is no longer required to first fetch the email addresses by using user IDs

- You can now create user groups inline when setting up the Approval stage in a pipeline. (PL-28022)

  This is helpful when the user group that needs to be sent notifications does not already exist. The scope of the user group is within the project corresponding to the pipeline.

- The Harness UI now lists the versions of services in your account settings. To see the versions, go to Account Settings > Overview, and then expand Platform Service Versions. (PL-26581)

  Approval messages in Harness approvals can now have expressions in multiple lines. (PIE-6238, ZD-36667,37069)

- Harness service variables now support dots (.). (PIE-4613)

  This is helpful when you have JSON/YAML files where you want to update the keys with some values. You can define variables for those keys in harness with (.) to access the keys. The expression to access a key would be:
  <+variables.get("example.key")>

- You can now drag the step details section and move it to the desired location. (PIE-3890)

- You need not enter the Tags or Description while importing an entity from Git. (PIE-6171)

  The corresponding information for these fields are fetched from Git.

### Fixed issues

**Platform**

- Adopted the use of an immutable image for the delegate that is installed by default in newly created accounts. For more information on new delegate features including auto-update, see Delegate
  Overview. (DEL-4888)

- When provisioning users through SCIM, users receive two emails: one from FirstGen and the other from NextGen. (PL-29896)

  This happens when the account has two-factor authentication enabled and the authentication mechanism is SAML with SCIM. This has now been fixed to send a single email to the provisioned users.

- Referencing multiple secrets by using the dynamic secret expression for HashiCorp Vault causes issues. The value of the latest decrypted secret replaces the values of any previously decrypted secret. (PL-29554, ZD-36459)

  This has now been fixed and the secrets have the corresponding decrypted values.

- The list of environment groups does not appear in the runtime input settings. (PIE-6411)

  This has now been fixed and the list of environment groups is available in the runtime input settings.

- When the length of a variable expression is more than 2048 characters in a pipeline, saving the pipeline takes longer than expected. (PIE-6291, ZD-36820)

  Simplifying the regex for the variable value expressions has now fixed this.

- Clicking Run in pipeline studio navigates to the input sets section in Run Pipeline window. This happens even when you have no runtime inputs for a Pipeline.(PIE-6264).

  This has now been fixed. If a pipeline does not need any runtime inputs, clicking on Run starts the pipeline execution.

- Service V2 does not resolve the infrastructure definition parameters passed from the triggers. (PIE-6155, ZD-36720)

  When a trigger invokes a pipeline, the YAML definition of the trigger and the corresponding pipeline with runtime inputs are merged. In YAML files with a single node element, the infrastructure definition is not processed on the triggers and is not passed as a runtime value.

  This has now been fixed. The YAML processing on triggers now takes care of processing the single node elements and propagates the value to the respective pipeline.

- The frequency of polling to fetch the pipeline execution list is 20 seconds. Such a long polling interval means that the data fetched by one poll goes stale before the next poll. (PIE-6151)

  This has now been fixed by increasing the polling frequency to every 5 seconds.

- The Save as New Input Set settings does not close after you save the details. (PIE-5708)

  This issue occurs when you run a pipeline that requires runtime input sets. This has now been fixed and the Save as New Input Set settings close after you save the details.

- Selecting an event as Merge Request, the default selection for Build Type is not correct for GitLab webhook triggers.(PIE-5117)
  This has now been fixed by changing the default selection for Build Type to Git Pull Request for the Merge Request event.

## November 11, 2022, version 77433

Delegate version: 77431

### What's new

**Platform**

- You can now send email notifications to all the members of a user group by selecting the Send email to all users part of the user group option.(PL-29434, ZD-32444)

  For existing user groups, this is the default option.

- The organization filter selection on the project listing page will now persist across user sessions and page navigations.(PL-29292)
  You can now see the versions of the services in Account Overview in Platform Service Versions.(PL-26581)

### Early access

- You can now create secrets using the Google Cloud Secret Manager in Harness. (PL-28978)

  For more information, see [Add a Google Cloud Secret Manager](https://developer.harness.io/docs/platform/security/add-a-google-cloud-secret-manager/).

- You can now select modules and configure your own navigation in Harness. (SPG-153)

  Also, Projects is a new option in the left navigation. Click Projects to view the project-specific overview, pipeline, connector, and other details.

### Fixed issues

**Custom Dashboards**

- A bug causing some Dashboards to be displayed incorrectly based on their Feature Flags has been fixed. Dashboards are now correctly shown or hidden by their corresponding Feature Flags. (CDB-390)

- Users previously were able to only clone Dashboards either from the "Out Of The Box" Dashboards, or from folders where they had an EDIT permission assigned. Now, if the user has any folder in which they have the EDIT permission assigned, they can clone any available Dashboard into that folder. (CDB-415)

Dashboard alerts and schedules will now run at the specified time in the users local timezone. (CDB-434)

**Platform**

- Fixed critical vulnerability CVE-2022-42889 in the delegate image.

- Introduced vertical scaling capabilities for non-legacy delegates. The Xmx flag that specifies the maximum memory allocation for the Java process is set to 70% of the container allotment. (DEL-5150)

- Enhanced the information on delegate creation and listing in the delegate installation pages. (DEL-5098)

- When clicking Save in the Default settings, error messages do not appear for the radio buttons and checkboxes. (PL-29489)

  Introducing formik fields and external error message components for the non-formik fields has fixed this issue.

- Harness Audit Logs API is returning an incorrect error for an expired token. (PL-29425, ZD-36045)

  The API response now returns the correct error when the API token is invalid or expired.

- User Invite Auto Accept is not working when Oauth is enabled and the feature flag AUTO_ACCEPT_SAML_ACCOUNT_INVITES is enabled. (PL-28807)

  Removing the SAML condition for Auto Invite Accept has fixed this issue.

- Re-run Pipeline is not working as expected. (PIE-6134)

  This issue has now been fixed by checking if the values of the variables are missing from the variables map.

- When running the pipeline, the primary artifact source is not auto-selected and tags and buckets are not fetched. (PIE-6084)

  This issue has now been fixed.

- When clicking outside the step settings, there is no option to Apply Changes or Cancel. (PIE-4428)

  This issue has now been fixed.

## November 6, 2022, version 77317

### What's new

**Platform**

The option to disable Harness Secret Manager is now a part of the core settings in Account Default Settings. (PL-27160)

### Early access

**Platform**

You can now get optimized performance on remote pipelines if you are on delegate version 772xx or higher,
by enabling the feature flag USE_GET_FILE_V2_GIT_CALL . (PL-29459)

If you are on an older delegate version, you can upgrade your delegate and then enable the feature flag for optimized performance.

### Fixed issues

**Platform**

- The scope of a newly created connector in the account scope was incorrect. When a user tried to use a connector in the account scope, the project scope was displayed. (PL-29190)

  This has now been fixed to pick the scope information from the connector data.

- On clicking Import Template in Templates, the title of the settings was Import Templates from Git. (PL-29094)

  The title of the settings is now Import Template from Git.

- Users were receiving two 2FA emails when the feature flags AUTO_ACCEPT_SAML_ACCOUNT_INVITES and PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES were enabled. (PL-29081)

  This has now been fixed to restrict notifications with 2FA QR code emails to just one.

- Editing secrets in Azure Key Vault with minimum permissions was failing. (PL-29025)

- The Default Settings in the project scope displayed side navigation options for the account scope. (PL-28977)

  Harness now displays the scope-specific side navigation options while on the Default Settings.

- Audit logs were not generated when the authentication mechanism was changed. (PL-28680)

  No audit logs were available when the authentication mechanism was changed from:

  - SAML to LDAP and vice versa

  - User name and password to OAuth and vice versa

  This has now been fixed so that Audit logs are available for changes in the authentication mechanism.

- On creating a connector inline in the Pipeline studio, the connector was not listed in the connectors list and was not selected by default. (PL-27819)

  This has now been fixed so that the connector list refreshes and selects the inline connector by default.

- While editing a connector in the account scope, users were able to select secrets at the organization and project scope. (PL-25825)

  This has now been fixed to display secrets in the parent scope while editing a connector.

- The user was able to delete a Secret Manager in Harness after disabling the Harness Secret Manager. (PL-23148)

  Harness now checks if there is at least one active secret manager before deleting a secret manager while the Harness Secret Manager is disabled.

- On the secret details page, there was no option to delete the secret. (PL-15045)

  This has now been fixed to provide options to edit and delete a secret from the secret details page.

- In the Pipelines, when the commit message was left blank, the Pipeline Execution History threw an exception. (PIE-6017)

  This has now been fixed so that the Pipeline Execution History displays execution details.

- The Run pipeline YAML with K8s Apply step was incorrect when the input set data was undefined. (PIE-5998)

  This has now been fixed to pick the input set data from the parent component. Also, all fields path are now updated at runtime.

- In a Pipeline with input sets, the specified delegates were ignored while merging the input sets. (PIE-5879, ZD-35813)

  This has now been fixed to pick the delegates corresponding to the delegate selectors.

- In Pipeline Triggers, deleting variables from the YAML caused inconsistent behavior. (PIE-5737, ZD-35537)

  This has now been fixed to enable the deletion of variables from the YAML by fetching the base values from the Templates.

- The display of detail information for immutable delegates version 76300 and earlier was changed to indicate that autoUpgrade is OFF. These delegate versions do not include the autoUpgrade feature. (DEL-5096)

## October 21, 2022, version 77221

Delegate version: 77221

### What's new

**Platform**

- The method that the log streaming task client uses to create threadpools was modified. Threadpools are now created one time in the client's lifetime instead of being created for each task the delegate receives. (DEL-4328)

- You can now import Templates from your Git repo. (PL-28597)

  See [Import a Template From Git](https://developer.harness.io/docs/platform/git-experience/import-a-template-from-git/).

### Fixed issues

**Platform**

- Users were receiving two 2FA emails when the feature flags AUTO_ACCEPT_SAML_ACCOUNT_INVITES and PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES were enabled. (PL-29081)

  This is now fixed by restricting notification with 2FA QR code email to just one.

- Editing secrets in Azure Key Vault with minimum permissions was failing. (PL-29025)

- Some fields were missing in the GET Pipeline CRUD endpoint. (PL-28918)

- The status code for GET API was incorrect when the role assignments were absent. (PL-28779)

- When 2FA was enabled in the Account scope, the user invitation emails did not contain a 2FA token. (PL-28549)

- The conditional skip option in the Pipeline Studio was not displayed consistently across various browsers. (PIE-5712)

  This is fixed by making the skip icon SVG as

## October 18, 2022, version 77116

Delegate version: 77021

### What's new

**Platform**

The functionality of the delegate auto-upgrade components was enhanced. On installation, the AutoUpgrade feature displays a status message of Synchronizing. If the feature does not receive an API call from the upgrade within 90 minutes, the status message changes to OFF. This affects delegates that are installed with the upgrader components.

A loader is now displayed on click of Run Pipeline to indicate that the Pipeline is running. (PIE-5396)

### Early access

N/A

### Fixed issues

**Platform**

- No precedence was set when the auth mechanism was username and password and the feature flag PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES was enabled. (PL-28739)

  This is now fixed by adding a check to ensure the auth mechanism of username and password takes precedence.

- Deleting a Project was not deleting the referenced secrets. (PL-28613)

  This is fixed by deleting the secrets corresponding to a deleted Project.

- The repo name was null in the file path URL for Bitbucket On-Prem account level connector. (PL-28533)

- The hard delete for environment was not working as expected. (PL-28403, ZD-34833,35135)

- The audit trail displayed for vault \_authTokenRef secrets was not correct. (PL-26764, ZD-32596)

  This is fixed by not storing any dummy secret if the feature flag DO_NOT_RENEW_APPROLE_TOKEN is enabled for the vault app role.

- User was not able to edit the barrier name in the Pipeline's flow control section. (PIE-5621)

## October 7, 2022, version 77025

Delegate version: 77021

### What's new

**Platform**

- You can now use a readOnly vault as a default secret manager. (PL-24491)

- The console colors are now updated for better readability. (PIE-4369)

### Early access

**Platform**

- You can now create remote Templates in Harness and save it in your Git repo by enabling the feature flag NG_TEMPLATE_GITX. (PL-28573)

  For more information, see:

  [Create a Remote Step Template](https://developer.harness.io/docs/platform/templates/create-a-remote-step-template/)

  [Create a Remote Stage Template](https://developer.harness.io/docs/platform/Templates/create-a-remote-stage-template)

  [Create a Remote Pipeline Template](https://developer.harness.io/docs/platform/Templates/create-a-remote-pipeline-template)

- You can now use expressions to reference pre-existing secrets in Vault using a fully-qualified path. (PL-28352)

  For more information, see [HashiCorp Vault Secrets](https://developer.harness.io/docs/platform/security/add-hashicorp-vault/).

- Harness will now send email notification for user invites when the feature flag AUTO_ACCEPT_SAML_ACCOUNT_INVITES is enabled. (PL-26218, ZD-32152,35287)

  Harness will not send any emails for user invites when the feature flag PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES is enabled.

### Fixed issues

**Platform**

- Introduced a new method for the Docker delegate to provide proxy configuration. This method provides additional support for scenarios in which delegates running on VMs experience difficulties referencing Kubernetes secrets. (DEL-4813)

- Changed the UI to ensure the correct API was invoked. This corrects a functional problem that involved the Add Delegates list. (DEL-4833)

- User invites were not sent for the configured SMTP. (PL-28208)

  This is now fixed by creating SMTP in Next Gen.

- Incorrect auth mechanism was displayed when switching from LDAP to username password. (PL-27887)

- Incorrect error message was displayed when the Project or Org or Account name did not exist in the APIs. (PL-27587, ZD-33846)

## September 29, 2022, version 76921

Delegate version: 76810

### What's new

**Platform**

- The method that the log streaming task client uses to create threadpools was modified. Threadpools are now created one time in the client's lifetime instead of being created for each task the Delegate receives. (DEL-4328)

- UI changes were implemented to support enabling or disabling Delegate run-as-root capabilities. (DEL-4836)

- When NG LDAP authorization is 'disabled', all LDAP SSO-linked Harness User Groups don't sync in NG. They sync with the users from LDAP when the LDAP settings have authorization enabled.​ (PL-27954)​

### Early access

N/A

### Fixed issues

**Platform**

- The INIT_SCRIPT was changed to correct an issue that changed behavior. The issue was triggered with the use of the set -e command. (DEL-4898, ZD-34654)

- The Default value column is not yet available to users, but the column was added to the user interface. (PL-28215)

  Now, the Default value column is removed from the Variables list page since you can't provide a default value.​

- The field Variable on the Accounts and Organization pages wasn't consistent with the rest of the pages. (PL-28214)​

  The issue is fixed by removing the Validation text in the Variables form and replacing it with a simple text box and a tooltip that specifies 'Only Fixed Values' are supported in Scope Variables.​

- The error message displayed by GCP KMS was generic and not useful. (PL-28103)​

  Now, the error message displays details such as the error code, reason, etc., that would aid in resolving the issue causing the error.​

- When you enter invalid credentials, the Microsoft Azure Vault client authentication exception was logged, but not considered as an error, and proceeded to the next step where the execution failed. (PL-28017)​

  Now, this issue is fixed. The exception is logged as an error and doesn't proceed further.​

  The error message displayed when a Microsoft Azure Vault encryption failed was generic and not meaningful.​

  Now, the error message displays details such as the error code, account ID, secret name, etc., that would aid in resolving the issue causing the error.​​

## September 22, 2022, version 76817

### What's new

**Platform**

- Harness Manager was changed to remove the edit and details UI for Immutable Delegates. These Delegates cannot be changed. (DEL-4756)

- A migration will run to remove the following Role Bindings directly assigned to users for accounts having ACCOUNT_BASIC_ROLE turned ON (PL-28284):

  - At Account Scope, Account Basic/Account Viewer -All Account Resources​.
  - At Organization scope, Organization Viewer - All Organization Resources.​
  - At Project Scope, Project Viewer - All Project Resources.​

  Harness now has a default User Group at each scope. These groups have all the users at the respective scope as their members. As a part of this change, Harness will stop assigning any roles to the User Groups by default.​ Users can assign roles to the default User Group at a specific scope, which becomes the default role for all the users in that group. (PL-26145)

  See [Harness Default User Groups](https://developer.harness.io/docs/platform/role-based-access-control/harness-default-user-groups/).

### Early access

N/A

### Fixed issues

**Platform**

- Harness Manager UI was updated to ensure that Delegate version and associated information clarifies the difference between older immutable and legacy Delegates. (DEL-4826)

- There was no limit on the number of visible execution stages shown. (PIE-5320​)

  This is fixed by adding a limit of showing 3 executions.

## September 14, 2022, version 76708

### What's new

**Custom Dashboards**

You can now use forecasting on your dashboards to help you create data predictions. (CDB-351)

**Platform**

- The versioning scheme for the Immutable Delegate was changed from 1.0.`<build_number>` to year.month.`<buildNumber>`. (DEL-4338)

- Expiration was added for Immutable Delegate images. These images will now expire after three months. (DEL-4377)

- Login Settings is now renamed to Authentication Settings in Audit Trail. (PL-28048)

- You can now view your unsaved changes in the Pipeline Studio by clicking on Unsaved Changes. (PIE-5281)

### Early access

N/A

### Fixed issues

**Custom Dashboards**

- The Recently Viewed option for sorting dashboards was not functioning correctly. This has been fixed so that the most recently viewed dashboards now appear in the correct order. (CDB-314)

- When using a vanity URL, some dashboards were linking to the Harness URL instead of the vanity one. This has been fixed and your dashboards now link to your correct URL. (CDB-355)

**Platform**

- The Vault Renewal Perpetual Task corresponding to a deleted Vault Secret Manager was not getting deleted. (PL-27952)

- First Gen login Audit Events were being captured in Next Gen Audit Trail. (PL-22435, ZD-26366)

- Create via YAML Builder did not have a cancel option. (PL-20197)

- Git Management options were not displayed for Feature Flags. (PIE-5292)

  This was because it was using a Project level flag that was replaced. This is now fixed by using the replaced flag.

- The links for information on Looping Strategies was redirecting to incorrect docs. (PIE-5266, ZD-34311)

  This is fixed by updating the appropriate doc links.

**Pipelines**

- Git Management option was not available for Feature Flags. (PIE-5292)

- The link to the Looping Strategies doc was not correct. (PIE-5266, ZD-34311)

- Create/edit Triggers for Pipelines with Fixed Values was resulting in errors. (PIE-5242)

  The Pipeline variables were being added to the runtime variables and were getting reset. This is fixed by filtering the Fixed Values.

- Pipelines with multiple parallel stages were not rendered as expected. (PIE-5018, ZD-33844)

- Errors were encountered while executing a Pipeline after saving Input Sets to a new branch. (PIE-4981)
  This is fixed by by disabling the Commit to a new branch option for Input Sets.

### Important Announcements

**Platform**

Harness now has a default User Group at each scope. These groups have all the users at the respective scope as their members.

As a part of this change, Harness will stop assigning any roles to the User Groups by default.

Users can assign roles to the default User Group at a specific scope, which becomes the default role for all the users in that group.

For more information on default User Group, see [Harness Default User Groups](https://developer.harness.io/docs/platform/role-based-access-control/harness-default-user-groups/).

## September 7, 2022, version 76619

### What's new

- You can now inherit User Groups created at a higher scope by using Assign Roles. (PL-27237)

  See [Assign Roles](https://developer.harness.io/docs/platform/Role-Based-Access-Control/add-user-groups#step-assign-roles).

- You can now view the past 10 executions of the Pipelines and sort them from the table. You can also go to a specific execution by clicking on it. (PIE-4903)

### Early access

- You can now create a Harness Custom Secret Manager in Next Gen. (PL-25545)

  You can onboard any secret manager with Harness and reference their secrets in Harness using a Shell Script.

  This is behind the feature flag CUSTOM_SECRET_MANAGER_NG.

See [Add a Custom Secret Manager](https://developer.harness.io/docs/platform/security/custom-secret-manager/).

### Fixed issues

- Fixed the display of an error message in the UI. The error message was not properly displayed when a pipeline selector was added using invalid characters. (DEL-4755)

- The Description of User Groups in Access Control was not wrapped and was resulting in inconsistent UI. (PL-27733, ZD-34043)

- Error was thrown when importing a Pipeline from Git which was already in use. (PL-27598)

  This is fixed now by displaying a confirmation message.

- Pipeline was not being triggered while setting up a trigger for a Bitbucket repo. (PIE-4827, ZD-33190)

  This is fixed by fixing the order of commit hashes being passed from delegate to SCM service.

## August 31, 2022, version 76515

### What's new

- Git Experience in Next Gen is now enhanced and simplified. (PL-26339)

  See [Git Experience](https://developer.harness.io/docs/category/git-experience/).

- You can now switch branches directly from the Pipeline execution history. This will make it easier to switch branches straight from execution history rather than going to the Pipeline studio first and then returning to execution history. (PIE-4985)

### Early access

No early access features are available in this release.

### Fixed issues

- Email notification for approval was not to SCIM groups with "\_" in the group name. (PL-26457)

- Multiple error toasts occurred when there was network failure because the error toast condition was at the component level, hence getting re-rendered every time. (PIE-5019)

- Users without appropriate permissions were able to create Pipeline and add Stage and Steps. (PIE-5008)

  The Add Stage and Add Step options are now hidden for users with View permission.

- The existing Input Sets were not getting updated. (PIE-4855)
  To fix this, Save as Input Set is changed to Save as New Input Set to indicate the correct behaviour.

## August 25th, 2022, version 76425

### What's new

- Now you can add up to 50,000 users in the Harness Non-Community Edition. (PL-27300)

  See [Add and Manage Users](https://developer.harness.io/docs/platform/role-based-access-control/add-users/).

- You can now use an enhanced Git Experience. (PL-26339)

  See [Harness Git Experience Overview](https://developer.harness.io/docs/platform/git-experience/git-experience-overview/).

  Harness will continue to support users who have been using the old Git Experience.

### Early access

N/A

### Fixed issues

- Error messages were not displayed while creating a HashCorp Vault Connector. (PL-27383​)

  This was happening for App Role based login because the value of the namespace was not sent as part of the vault config.

  As a part of this fix, the namespace value is now added.

- Errors were blocking users from creating a secret even after clicking the back button and updating the correct values. (PL-26169​)

  This is now fixed by sending the updated data when the back button is clicked.

- Unsaved changes were retained even after clicking Discard in the Pipeline Studio. (PIE-4880​)

- The loading indicator was not displayed when filters were applied. (PIE-4829​)

  The resource constraint endpoint returned an empty response when the Pipeline Service threw an exception.

  Now the case is handled and the response is returned as expected. (PIE-4727)​

## August 18th, 2022, version 76319

### What's new

- The versioning scheme for immutable Delegates was changed from 1.0.`<build_number>` to year.month.`<buildNumber>`. (DEL-4338)

- ReactDOM unstable_bacthedupdates ​will now be used for batch updates. (PIE-4555)

### Early access

N/A

### Fixed issues

- Changed error messaging for NextGen task failures to display a specific error message, if one exists. These errors usually occur when there is no available Delegate to perform a task. (DEL-3933)

- The creation of the HashiCorp Vault Connector was failing. (PL-27140, ZD-32981)

- The alignment of the Import Pipeline option was not correct. (PL-26644)

- The error type was not correct for an empty encrypted file name or Id. (PL-25268)

- Polling was not working at regular intervals. (PIE-4751)

- Triggering a Pipeline was throwing an error. (PIE-4680, ZD-33179,33187)

## August 8th, 2022, version 76128

Delegate Version: 76128

### What's new

You will now see a quicker account load when attempting to switch accounts. (PL-21667)

### Early access

N/A

### Fixed issues

- Fixed an issue with the INSTALL_CLIENT_TOOLS_IN_BACKGROUND environment variable that prevented detection of client tools when download was disabled. (DEL-4246)

- Kubernetes Auth method for Vault connector was not functioning. (PL-26919, ZD-32763)

- Repo details were displayed while running a Pipeline with Input Set. (PL-26706)

- The Input Set error experience did not show the error response that were received from the back end. (PL-26686)

- Kubernetes Auth Endpoint was displayed even if the authentication type was Vault Agent. (PL-26600, ZD-32625)

- Email notifications were not sent for approvals. (PL-26457, ZD-32444)

- Connector status was not displayed correctly. (PL-25666)

- Appropriate error messages were not displayed for AWS Secret Manager. (PL-24942)

- Harness Terraform Provider was displaying incorrect error response when a specific Trigger was not found. (PIE-4632)

- Tags API did not have formik values wrapped with the Pipeline key. (PIE-4631)

- Editing Terraform Var file was throwing an error. (PIE-4618, ZD-32734)

## August 1st, 2022, version 76030

Delegate Version: 76127

### What's new

- Role-based Access Control has been added to Custom Dashboards. To access Dashboards, users now must have the View Dashboards permissions. (CDB-227)

- Stream logs' performance has improved.​ (PIE-4447)

### Early access

N/A

### Fixed issues

- On Custom Dashboards, the filters for Deployments and CG Deployments have been merged into a single Deployments filter tag. (CDB-259)

- Git Experience was throwing an error for file updates via Bitbucket. (PL-26564, ZD-32559)

- Notification Preference for the SCIM provisioned User Groups was not getting saved. (PL-26324, ZD-32246,32444)

- SAML SSO setup was throwing errors. (PL-26303, ZD-32097)

- Git Experience was throwing an error while updating Azure Connector in a Project. (PL-26216, ZD-32129)

- Deletion of the stage strategy was not working. (PIE-4475)

- Selecting selective stages before running a Pipeline was resulting in errors. (PIE-4437)

- Adding allowed values for the Timeout field as part of Input Sets was throwing an error in Pipelines. (PIE-3831)

## July 20th, 2022, version 75921

### What's new

- Resource constraint blocking in approval state (PIE-3195)

  The infrastructure resource constraint now has the Stage scope to unblock the operations of other Pipelines.

### Early access

N/A

### Fixed issues

- Create File API was not working correctly in Git Experience. (PL-26360)

- Branch listing was failing in Git Experience. (PL-26275)

- Pipelines were executed even if a wrong selector was passed at the Pipeline level. (DEL-4424)

- The Audit Trail for Delegate creation was not captured properly. (DEL-4321, ZD-31813)

## July 11th, 2022, version 75829

### What's new

- Support for the use of secrets for notifications to be sent via the Delegate (PL-22129)

- You can now add your notification webhook URLs as Encrypted Texts in Harness and reference them for the following notification methods:

  - Slack Notifications
  - PagerDuty Notifications
  - Microsoft Teams Notifications

  For more information, refer to Manage Notifications, Add a Pipeline Notification Strategy.

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

### Early access

N/A

### Fixed issues

- Sanitization of secrets with trailing spaces was not happening correctly. (PL-25784)

- Pipelines with Deploy stage templates are not listed on the Pipelines listing page​. (PIE-4298, ZD-29735,32185)

- Empty strategy metadata was being added in the parallel stages. Hence, runtimeId was added in the graph instead of setupId​. (PIE-4284)​

- Pipeline Cloning was not listing the current project​. (PIE-4279)

- The conditional execution icon was not visible on stages​ in the Execution view. (PIE-4277)

- The execution console view was showing parent matrix nodes​. (PIE-4271)

- Triggers were not deleted on the deletion of the Project when the HARD_DELETE_ENTITIES flag was set.​ (PIE-4234)

- Only the stage variable was getting saved when a user added the Pipeline variable as well as the Stage variable from the variable panel​. (PIE-4223)

- Rerun form for an already executed Pipeline rendered input set for the previous execution with stale data​. (PIE-4222)

- Builds page was blocking the entire UI​. (PIE-4213)

- Overlay InputSet Creation API did not have the correct parameters. (PIE-4210)

- The Input set was not showing the YAML file name correctly​. (PIE-4202)

- Pipeline inputs were not displayed. (PIE-4190, ZD-31636)

- Adding a when condition to the step broke the variable view​. (PIE-4179)

- Service settings were not displayed correctly in the Pipeline studio​. (PIE-4108)

- YAML Editor was not suggesting stage-specific options like Approval, Deployment​. (PIE-3703)

- Autocomplete​ was not displaying the full path of the vars. (PIE-3535)

- The Delegate token name was not saved in the Delegate collection​. (DEL-4384)

- The background task was not running when the user had an expired CG license, even if the NG license was active.​ (DEL-4309, ZD-31137)

- The Docker Delegate troubleshooting screen showed 'kubectl' tips​. (DEL-4275)

- The Delegate was performing automatic updates while explicitly disabling the ONE security mechanism that was in place to protect the supply chain.​ (DEL-4153)

- The GET Tags API was not returning the Delegate name in the list of tags associated with the Delegate​. (DEL-4045)

- The Delegate Filter API was not returning an accurate response as per selection for the Status field. (DEL-3427​)

- Users were not able to install Harness NG Delegate on Apple Laptop (with M1)​. (DEL-3252)
