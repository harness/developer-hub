---
title: Platform release notes
sidebar_label: Platform
tags: [NextGen, "platform"]
date: 2023-07-27T10:00:30
sidebar_position: 12
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
import delete_project from './static/delete-project.png'
```

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/platform/rss.xml" />

Review the notes below for details about recent changes to Harness Platform, NextGen SaaS. For release notes for Harness Self-Managed Enterprise Edition, go to [Self-Managed Enterprise Edition release notes](/release-notes/self-managed-enterprise-edition). For FirstGen release notes, go to [Harness SaaS Release Notes (FirstGen)](/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes).

Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.

:::info note
Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features and fixes that these release notes describe may not be immediately available in your cluster. To identify the cluster that hosts your account, go to the **Account Overview** page. 
:::

## Latest - July 27, 2023, version 80022


```mdx-code-block
<Tabs>
  <TabItem value="What's new">
```
- Earlier, when an administrator enabled the account-level two-factor authentication (2FA) setting, it affected users in the following manner:
  1. Users who had set that account as their default account received 2FA emails, and the user-level 2FA setting was enabled across all their profiles. The users were not allowed to disable the setting.
  2. Harness allowed users to modify the 2FA setting only when an administrator disabled the account-level setting subsequently. Even then, the user-level 2FA setting remained enabled, and users continued to receive a 2FA challenge until they manually disabled the user-level setting in their profiles. (PL-39507, ZD-46268)

  This behavior has been remediated. When an administrator enables the account-level 2FA setting, Harness sends the users 2FA emails but does not enable the user-level 2FA settings. Users are free to enable or disable the user-level setting in their profiles. When a user attempts to log in to their Harness account, Harness presents them with a 2FA challenge only if one or both of the settings (the account-level setting and the user-level setting) are enabled. If both settings are disabled, Harness does not present a 2FA challenge.

- If you attempt to delete a project or organization that includes resources from other Harness modules, Harness first prompts you to confirm the delete action and then prompts you to enter the name of the project or organization. This two-step procedure gives you an opportunity to consider the impact that your action might have on other modules. (PL-32376, ZD-42691)

- Delegate selection logs now include the `DelegateId`, `DelegateName`, and `hostname`. (PL-37913)
  This item is available with Harness Platform version 80022 and does not require a new delegate version. For information about Harness Delegate features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

- You can now configure the `create_namespace` Terraform parameter to disable default namespace creation. Set the parameter to `false` in the `main.tf` file to disable namespace creation. (PL-39822, ZD-47021)
  This item is available with Harness Platform version 80022 and does not require a new delegate version. For information about Harness Delegate features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

```mdx-code-block
  </TabItem>
  <TabItem value="Early access">
```
This release does not include any early access features.

```mdx-code-block
  </TabItem>
  <TabItem value="Fixed issues">

- API calls that requested role assignments filtered on user groups or service accounts (that is, API calls that used the `roleassignment/filter` endpoint with `principalTypeFilter` set to USER_GROUPS or SERVICE_ACCOUNTS, respectively) returned an empty body. (PL-39888, ZD-47208)

  This issue is now fixed, and you can use the API to fetch role assignments for user groups and service accounts in any scope.

- If you failed to specify the scope for a resource group that you created with the Harness API, Harness failed to apply a default scope, which it was expected to infer from the API request’s query parameters. (The Harness UI, on the other hand, behaves as expected: it sets the default scope of the resource group to the scope that you are in when creating the resource group.) This behavior led to eligible users being unable to perform operations on the resource group. (PL-39271, ZD-45488)

  This issue is now fixed. If you do not specify a scope for the resource group when using the API, Harness sets the default scope correctly, and eligible users should be able to perform operations on the resource group.

- API requests to update a remote template did not update the `lastUpdateAt` field in the template. (CDS-72098)

  This issue is now fixed.

- The user interface of the approval step is inconsistent with the saved contents of the User Groups field. Sometimes, the field omits some of the previously saved user groups but shows the correct count while, at other times, it lists all of the previously saved user groups but shows a lower count. (PL-39294, ZD-45548)

   This issue is now fixed.

```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Previous releases

<details>
<summary>2023 releases</summary>

#### July 18, 2023, version 79916

##### What's new

- The Go library has been upgraded from 1.20.4 to 1.20.5. (PL-39700)

  The upgrade fixes the following CVEs:
  - [CVE-2023-29402](https://nvd.nist.gov/vuln/detail/CVE-2023-29402)
  - [CVE-2023-29405](https://nvd.nist.gov/vuln/detail/CVE-2023-29405)
  - [CVE-2023-29404](https://nvd.nist.gov/vuln/detail/CVE-2023-29404)
  - [CVE-2023-29403](https://nvd.nist.gov/vuln/detail/CVE-2023-29403)

- You can now view delegate logs when validating a connector that uses a delegate to establish connections. (PL-37919)

- Previously, when password-based authentication was used with OAuth, the functionality of auto-accepting invites was not available. Now, when Oauth is enabled for an account, invites are automatically accepted. (PL-31936, ZD-40182)

- User names cannot exceed 256 chars. (PL-21254)

- The List Tokens API now supports listing all the personal access tokens or service account tokens in the account. The API has been enhanced as follows:
1. If you have user management permissions, you can list all the personal access tokens in your account. You can also filter tokens belonging to a user or filter only active tokens.
2. If you have service account management permissions, you can list all the service account tokens in your account. You can also filter tokens for a service account or filter only active tokens. (PL-31870, ZD-40110)

This item requires Harness Delegate version 79904. For information about features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

##### Early access

This release does not include any early access features.

##### Fixed issues

- Previously, regardless of whether your account was on Harness NextGen or Harness FirstGen, Harness sent password reset emails from Harness FirstGen. This approach failed for accounts that are only on Harness NextGen. (PL-38735)

  Now, for accounts that are only on Harness NextGen, Harness sends password reset emails from Harness NextGen.

- You could not create Azure Key Vault connectors in Harness NextGen even when you used the service principal credentials that successfully created Azure Key Vault connectors in Harness FirstGen. After you entered the service principal credentials, the Vault setup window stopped responding. After several minutes, the following message was displayed: None of the active delegates were available to complete the task. ==> : 'Missing capabilities: [https:null.vault.azure.net]' (PL-39783, ZD-46756)

  This issue is now fixed.

  This item requires Harness Delegate version 79904. For information about features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

- The AWS connector widget's prefix field did not accept prefixes starting with a slash. Such slashes were stripped off, and this led to undesired behavior. (PL-39194, ZD-45104)

  Prefixes that begin with a slash are now supported. 

  This item requires Harness Delegate version 79904. For information about features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

- Account-level connectors with resource groups set to **Specified** were not available at the project-level. (PL-38828, ZD-44474). 

  This issue is now fixed. The connectors list shows the connectors for which users have resource group permissions set.

  This item requires Harness Delegate version 79904. For information about features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

#### July 06, 2023, version 79811

##### What's new

- Harness now allows special characters in usernames. (PL-39564, ZD-46487)

- You can now view delegate logs when validating a connector that uses delegates to establish connections. (PL-37919)

- When creating Azure Key Vault, you can now manually enter the vault name. (PL-32773, ZD-44045)

##### Early access

This release does not include any early access features.

##### Fixed issues

- It was possible to edit project identifiers. (PL-39609)

  A code enhancement has fixed this issue.

#### June 28, 2023, version 79714

##### Platform new features

- There is now a limit of 100 API Tokens per free and community account. (PL-39337)

- When configuring SMTP, you can now select specific delegates in **Delegates Setup**. (PL-39024)

- You can now sort pipelines in the pipelines list by selecting the sortable column headers or the sort dropdown. (PL-31527)

##### Early access

This release does not include any early access features.

##### Platform fixed issues

- SAML provider **Name** and **Friendly Name** fields allowed special characters. (PL-39070)

    This issue is fixed by `displayName` and `logoutURL` field validations. The `displayName` only allows alphanumeric characters, `_`, `-`, `.`, and spaces. The `logoutURL` must be a valid HTTPS URL format. 

- When creating a service account with the same name in a different scope, an error was thrown. (PL-38885)

  A code enhancement has fixed this issue.

- When **ALL** scope was selected on the **Role binding** page for a specific user, incorrect data was displayed. (PL-38426, ZD-43503)

  A code enhancement has fixed this issue.

- Deletion of vault connectors does not delete the corresponding perpetual tasks. (PL-27621)
  
  A code enhancement has fixed this issue.

- Account-level connectors with resource groups set to **Specified** were not available at the project-level. (PL-38828)

   This issue is fixed with a code enhancement. The connectors list now shows the connectors for which users have resource group permissions set.

   This item requires Harness Delegate version 79707. For information about features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

- The account-level **Session Timeout (in minutes)** allowed values greater than the 4320 minute maximum. (PL-32498)

   This issue has been resolved by adding a code validation. The field no longer accepts values above 4320 minutes.

   This item requires Harness Delegate version 79707. For information about features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

#### June 19, 2023, version 79606

##### Platform new features

- In earlier releases, users were allowed to include the following special characters in the user name field in their profile: colon (`:`), slash (`/`), less than sign (`<`), greater than sign (`>`), equal sign (`=`), and parentheses (`(` and `)`). Support for these special characters allowed malicious users to inject HTML and JavaScript code into deployment-related emails such as approval emails. (PL-39099)

  For enhanced security, Harness no longer allows a user to include these special characters in their name. If an existing user name has any of these special characters, Harness does not include the special characters when adding the name to emails.

- Free and Community accounts are now limited to 100 connectors. (PL-32654)

- The dialog for adding an encrypted text secret now includes an option to test a referenced secret. (PL-31083) 

- The dialog that enables you to select a connector did not list connectors in any order. (PL-27568)

  This release adds a menu that you can use to sort the listed connectors in various ways (for example, by name or by date).

- In earlier releases, you could change the Git branch only in Pipeline Studio. (CDS-68007)

  Starting with this release, you can also change the branch in the dialog for running a pipeline. You can also run the pipeline from any branch directly from the pipeline listing page. 

##### Early access

This release does not include any early access features.

##### Platform fixed issues

- Certain users see the following message when they select the Connectors page for their project: "You are not authorized to view default settings.
You are missing the following permission: "View default settings" in Account scope." (PL-39221, ZD-45360)

  This issue has been fixed by the removal of an account-level permission check that has been deemed unnecessary.

- SCIM PATCH requests for deleting a Harness user return a “user does not exist” message in a successful delete operation. (PL-38868, ZD-44150)

  This issue has been resolved by returning a NULL response in the Patch operation to delete a user.

- In earlier releases, the button for managing role bindings for users, user groups, and service accounts was named +Role. However, given that you can also remove role bindings in the Manage Role Bindings dialog, the button has been renamed to Manage Roles. (PL-28484)

- Improved randomness when there are multiple eligible delegates with no tasks running to avoid selecting the same delegate each time. (PL-39219)

  This item is available with Harness Platform version 79606 and does not require a new delegate version. For information about Harness Delegate features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

#### June 09, 2023, version 79516

##### Platform new features

- There is now an additional tab on the **Create or Select Existing Connector** dialog called `All` that lists connectors from all scopes (project, organization, and account). (PL-39029)

- The Go library has been upgraded from version 1.19.8 to 1.20.4. (PL-39026)

- You can now delete externally managed users from the Harness UI. (PL-38974)

  Harness recommends using this action with caution since it may result in data inconsistencies between Harness and the identity provider.

- The Go library for yq has been upgraded from version 1.19.8 to 1.20.4. (PL-38952)

- On your profile, you can now access projects by selecting project cards. (PL-38570)

- Secret references now have a validate button to verify if the path is valid. (PL-31083)

   This item is available with Harness Platform version 79516 and does not require a new delegate version. For information about Harness Delegate features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).


##### Early access

This release does not include any early access features.

##### Platform fixed issues

- The user invite API returned an HTTP status code of 200 if the invited user had an invalid TLD. (PL-38938)

  This has been fixed, and the API now returns a status code of 400.

- It was mandatory to enter email addresses even if **Send email to all users in a user group** was checked in **Notification Preferences**. (PL-38910)

  A code enhancement fixed this issue.

- Deprovisioning user accounts from Harness resulted in Okta errors. (PL-38868, ZD-44150)

  A code enhancement fixed this issue.

- An attempt to edit a secret sent repeated requests to the backend if the secret was not found. (PL-32313)
 
  A code enhancement fixed this issue.

- When SMTP was not configured, password reset did not throw an error. (PL-24542)
  
  A code enhancement fixed this issue.
  
- The expressions corresponding to objects like list, maps, and so on were incorrectly converted to string type using the Java String.valueOf method resulting in incorrect formatting. (CDS-71619)

  This issue is fixed and the output values for expressions are returned as JSON objects.

#### June 01, 2023, version 79411

- You can now fetch the list of delegates registered to an account using the Harness API. You can also filter these by scope, tags, status, and version. (PL-37981, ZD-40508,40688)

   This item is available with Harness Platform version 79411 and does not require a new delegate version. For information about Harness Delegate features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

- You can now use the legacy UI to create delegates. (PL-38937)

   This item is available with Harness Platform version 79411 and does not require a new delegate version. For information about Harness Delegate features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

- You can now see the total number of secrets in the secrets list and sort them by various columns. (PL-31528)

   This item is available with Harness Platform version 79411 and does not require a new delegate version. For information about Harness Delegate features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

##### Early access

This release does not include any early access features.

##### Fixed issues

- Delegate instances that do not shut down gracefully and do not come back online are removed from the UI after three hours. (PL-38755)

   This item is available with Harness Platform version 79411 and does not require a new delegate version. For information about Harness Delegate features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

- The SSH secret reference gets created even if secret creation fails due to a validation error. (PL-38549, ZD-44073)

  Reference creation now only occurs if the SSH secret is created.

- The error message displayed during pipeline execution when connector permissions are missing is unclear. (PL-32662)

  A code enhancement to display an appropriate error message fixed this issue.

- The creation of SSH or WinRM secrets in a project or organization after disabling Harness' built-in secret manager is not supported. (PL-32562)
  
  A code enhancement has fixed this issue.

- The comparison of email addresses during sign in is case-sensitive. (PL-32198)

  A code enhancement has fixed this issue.

- The error message displayed when permissions are missing during pipeline execution does not mention the corresponding resource Id. (PL-31350)

  A code enhancement to display the resource Id in the error message fixed this issue.

#### May 23, 2023, version 79306

##### What's new

- The **Connector Details** page now shows whether a connector is connected via a delegate or via Harness Platform. (PL-32673)

- When steps or stages fail with a **Ignore Failure** strategy, their status is displayed as **Success (Failure Ignored)** instead of **Failed**. (CDS-67670)

- You can now reject old executions waiting on approval when new ones are approved by using the **Auto-Reject previous deployments paused in this step on approval** option in the **Harness Approval** step. (CDS-58063)

- You can now view the most recent delegate task details and their corresponding selection logs for approvals.
The details of the latest delegate task are automatically updated. (CDS-57927)
  
  You can view task details for the following:
  - ServiceNow
  - Jira
  - Custom Approvals

- A warning now appears if you try to save a template with an existing identifier and an updated version label. This warns you that it will be merged with the existing template (upon confirmation). (CDS-47301)

- The Azure Key Vault secret manager now supports creating secrets with expiration dates. Select **Expires On** to set a secret expiration date. The Harness Delegate version 79307 is required for this feature. (PL-32708, ZD-42524)

- AuthZ now considers the SAML setting that the user logged in to when multiple SAML settings are present and the user belongs to more than one of them. The user will be removed from any other SAML settings that the same user might have been part of and synced with Harness through previous SAML logins.  (PL-32484)

##### Early access

This release does not include any early access feature.

##### Fixed issues

- The email address is displayed instead of the display name for users created through Okta. (PL-38479, ZD-43201)
  
  A code enhancement to populate name with the display name fixed the issue.

- The email step in the pipeline succeeds and is not marked as failed, even if email delivery fails. (PL-38440, ZD-43831)
  
  A code enhancement fixed this issue.

- The **LAST ACTIVITY** column in the **Connector List** page is not updated. (PL-32582, ZD-42966)
  
  This column has been removed, and the UI no longer displays this.

- The secrets list API return a status code of `200` when permissions are missing. (PL-26474)

  The API now returns a status code of `403` when permissions are missing on secrets.

- Conditional Execution's default value is incorrect in the UI. (CDS-68600)

  A code enhancement to remove the default selection fixed this issue.

- In Service Dashboards, tabular data does not appear for empty artifacts. (CDS-68100)

  A code enhancement fixed this issue.

- Fields in the Run Pipeline view are not aligned correctly. (CDS-67966)

  A code enhancement fixed this issue.

- The pipeline error message does not display the variable name when variable evaluation fails. (CDS-67559)
  
  A code enhancement to display the variable name in the error message fixed the issue.

- When an entity is not found in the Git experience, there is no detailed error message displayed. (CDS-67500)

  A code enhancement to display the repository and branch name in the error message fixed the issue.

- The interrupt functionality for chained pipelines does not work.  (CDS-59374)
  
  A code enhancement to pass the required parameters for the child pipeline fixed this issue.

- Custom Secret Manager creation does not consider the delegate selector. (PL-32260)

  In Custom SM configuration, decrypting secrets using the SSH connection to validate delegate selection fixed this issue.
  The Harness Delegate version 79307 is required for this fix.

- Invites to users fail with an unauthorized error while RBAC setup is still in progress. (PL-32117)

  A polling system ensures that RBAC setup has been completed. The Harness Delegate version 79307 is required for this fix.

#### May 04, 2023, version 79214

##### What's new

- You will now receive an alert on the default settings page when there are unsaved changes and you leave the page. (PL-32354)

##### Early access

This release does not include any early access feature.


##### Fixed issues

- In **Group Memberships**, the selected scope value does not match the scope of the displayed user groups. (PL-32552)
  
  A code enhancement to fetch data corresponding to the selected scope has fixed the issue.

- Pagination does not work correctly in the **Group memberships** page.(PL-32551, ZD-42803)
  
  A code enhancement fixed this issue.

- The option to remove a secret is hidden when it has a long name. (PL-32571)
  
  A code enhancement fixed this issue.

#### April 22, 2023, version 79111

##### What's new
- You can now configure session time-out in the UI. (PL-32258)
  In case of inactivity, Harness logs users out of their accounts after the configured session timeout.

- You can now add descriptions to pipeline and stage variables. (PIE-3336)

##### Early access
This release does not include any early access feature.

##### Fixed issues
- The creation of secrets on Custom Secret Manager validates the existence of those secrets. (PL-31715)
  A code enhancement to remove secret validation during Custom Secret Manager creation has fixed the issue.

- The tooltip for **Optional Configuration** in **Run Step** flashes in and out in a loop, making it difficult to read the text.(PL-32462, ZD-42201)
  A code enhancement fixed this issue.

- It is possible to delete an encrypted text or file secret, even if it is referenced by another secret. (PL-31037)
  A code enhancement fixed this issue.

- The cache response metadata gets added to YAML when an input set for a pipeline is edited. (PIE-9487, ZD-42516)
  A code enhancement to validate the input set YAML after integrating input set caching fixed the issue.

- Logs for chained pipelines are not visible. (PIE-9242, ZD-42050)
  A code enhancement fixed this issue.

#### April 10, 2023, version 79015

##### What's new
- You can now navigate to the parent organization by selecting its name on a project details page. (PL-32182, ZD-41785)

- Harness Git Experience now supports GitLab as a code repository. You can now select a Harness connector with any of the following Git providers to save entities in a repository: (PIE-9139)
  * Github
  * Bitbucket
  * AzureRepo 
  * Gitlab 

- You can now open the modal in the template studio to see all applicable metadata such as a description, tags, connector, and repository name. (PIE-8692)

##### Early access

This release does not include any early access feature.

##### Fixed issues

- Role assignments by **Scope** filter do not populate usernames or email addresses for existing users. (PL-32206)
  A code enhancement fixed this issue.

- When polling, the stage selection flickers on the pipeline execution page. (PIE-9360, ZD-42361)
  A code enhancement fixed this issue.

- During pipeline execution, failure strategies are prompted even when not configured as inputs. (PIE-9277, ZD-41602)
  The pipeline and template studio no longer display the failure strategy runtime panel when failure strategy is not marked as runtime. 


#### March 31, 2023, version 78914

##### What's new

- The favicon now dynamically changes based on pipeline execution status on the dashboard's execution view. (PL-31520)


##### Early access

This release does not include any early access feature.

##### Fixed issues

- JWT log sanitizer throws a null pointer exception when it receives null log messages. (PL-32136)

  A code enhancement to add an empty check before sanitizing a log line for secret and JWT masking has fixed this issue.

- When an author's GitLab profile does not include a public email, the email attribute in the webhook payload appears as `REDACTED`. (PL-31795)

  A code enhancement has fixed this issue.

- When creating Azure Key Vault and HashiCorp Vault connectors, selecting invalid delegate selectors displays an "UNKNOWN ERROR". (PL-30660)

  A code enhancement to display appropriate error message has fixed this issue. 


#### March 24, 2023, version 78817

##### What's new

- You can now add specific service accounts to your resource group. (PL-31867)
  
  By doing this, you can prevent accidental or deliberate misuse of API keys by restricting who can generate them from which service accounts.

- You can now enter usernames as a comma separated string while adding users in **Users(name or email)**. (PL-29630)
  
##### Early access

- By enabling the feature flag, `PL_NEW_SCIM_STANDARDS`, any CRUD operation on a user now returns the details of the user groups that the user is part of. (PL-31496)

  You can use this to verify what groups a given user belongs to.

##### Fixed issues

- A failed decryption of secrets managed by the Harness Secret Manager causes the secret value inside values.yaml to be resolved as null. (PL-32043)
  
  The pipeline execution now fails with an exception if there is a failure in decrypting secrets.

- Despite having an active license, the CD module is not visible. (PLG-2047)
  
  A code enhancement has fixed this issue.

- SMTP configurations with special characters in the SMTP configuration name throw an `Invalid request` error. This happens because the SMTP configuration name is used to construct the secret name, and secret names should not have any special characters. (PL-31774, ZD-40679)

  This issue has been fixed by replacing special characters in SMTP configuration names with `-` before creating secrets.

- User invites throw an `Invalid request` error when 2FA is enabled in the Account scope. (PL-31276)
 
  A code enhancement has fixed this issue.

- A Harness account link that doesn't contain `#` but includes an account Id without any routing Id details crashes the gateway with `HTTPHeader too long exception`. This results in an `HTTP 413` response code. (PL-31154)
 
  Addition of a cluster URL for remote entry files has fixed this issue.

- Connectors are not sorted alphabetically on the **Connectors** page. (PL-27510)

  A code enhancement has fixed this issue.
  
- Clicking **Retry** does not display the list of pipelines in the **Pipelines** page.  (PIE-8874)

  A code enhancement has fixed this issue.



#### March 15, 2023, version 78712

##### What's new

- The Harness UI now supports editing the email domain when creating a Service Account. Previously, the email domain was auto-generated and there was no option to edit it. (PL-31769)
  
- You can now migrate only the admin users of FirstGen to NextGen by enabling the feature flag `PL_DO_NOT_MIGRATE_NON_ADMIN_CG_USERS_TO_NG`. Previously, all FirstGen users were migrated to NextGen along with the admins. (PL-31648)
  
- The [List Role Assignments by scope filter](https://apidocs.harness.io/tag/Role-Assignments/#operation/getFilteredRoleAssignmentByScopeList) API now supports the following filters:

  - Principal Type Filter: Filters role assignments based on principal type.

  - Harness Managed Filter: Filters role assignments based on roles managed by Harness. For example, an Account Administrator. 

  - Disabled Filter: Filters disabled role assignments. (PL-31352)

- Filters for audit trails are now listed alphabetically. (PL-31204)

- Template expressions now support `when` conditions. (PIE-8762)

##### Early access

- Harness now populates `givenName` and `familyName` for users via SCIM and returns the same when a GET, CREATE, or UPDATE request is made. (PL-31498)

  This is behind the feature flag `PL_NEW_SCIM_STANDARDS`.

- The response of a CRUD operation on a user or user group now contains the following meta fields as per the SCIM 2.0 standards:

  - createdAt

  - lastUpdated

  - version

  - resourceType (PL-31497)
  
    This is behind the feature flag `PL_NEW_SCIM_STANDARDS`.


##### Fixed issues

- The template service APIs do not have trace filters. (PL-31829)

  Template service now includes an open telemetry trace filter and the responses have `X-Harness-Trace-ID` in the header.

- The sorting of updated projects fails since the **CreatedAt** field is null when updates are saved. (PL-31794, ZD-40783)
  
  A code enhancement has fixed this issue. You can fix this issue in older projects by making a dummy update like adding a comment.

- Harness UI allows creation of inline secrets in a read-only vault secret manager. (PL-31646, ZD-40401)

  A code enhancement has fixed this issue.

- The enterprise HashiCorp vault's namespace feature does not delete secrets. (PL-31456, ZD-39470)
  
  A code enhancement has fixed this issue.

- User alerts are enabled even when notification preferences are disabled. (PL-31144)
  
  A code enhancement has fixed this issue.

- Recently added roles are not displayed in the manage role assignment settings. (PL-30560)
  
  A code enhancement has fixed this issue.

- Secrets and connectors have different YAML views. (PL-27721)

  UI enhancements have fixed this issue.

- A chained pipeline fails to run because the user cannot enter the codebase branch. (PIE-8720, ZD-40821)
  
  A code enhancement has fixed this issue.

- A pipeline becomes unresponsive when invalid YAML is pasted in the run pipeline form. (PIE-8668)
  
  The issue has been fixed by adding a check for invalid pipeline YAML when pipeline is added via the YAML pipeline studio. 

- The table view on the pipelines list page is reset to page 1 when a pipeline is deleted. (PIE-8572)
  
  A code enhancement has fixed this issue.

- Pre-flight check does not work with selective stage execution and pipeline YAML validation fails. (PIE-8476)

  Users can now skip or select pre-flight checks and the pipeline runs successfully.

- After pipeline failure, the console view does not show error details. (PIE-8229)
  
  A code enhancement has fixed this issue.

- The API to retrieve filtered pipeline executions does not return executions that are successful in the UI, but failed in the backend. (PIE-8042)

  A code enhancement has fixed this issue.


##### Important announcement

- The following API endpoints have been deprecated:
  - https://apidocs.harness.io/tag/Harness-Resource-Group#operation/createResourceGroup
  - https://apidocs.harness.io/tag/Harness-Resource-Group#operation/deleteResourceGroup
  - https://apidocs.harness.io/tag/Harness-Resource-Group#operation/getResourceGroup
  - https://apidocs.harness.io/tag/Harness-Resource-Group#operation/getResourceGroupList
  - https://apidocs.harness.io/tag/Harness-Resource-Group#operation/getFilterResourceGroupList
  - https://apidocs.harness.io/tag/Harness-Resource-Group#operation/updateResourceGroup

  The following API endpoints must be used: 
  - https://apidocs.harness.io/tag/Harness-Resource-Group#operation/createResourceGroupV2
  - https://apidocs.harness.io/tag/Harness-Resource-Group#operation/deleteResourceGroupV2
  - https://apidocs.harness.io/tag/Harness-Resource-Group#operation/getResourceGroupV2
  - https://apidocs.harness.io/tag/Harness-Resource-Group#operation/getResourceGroupListV2
  - https://apidocs.harness.io/tag/Harness-Resource-Group#operation/getFilterResourceGroupListV2
  - https://apidocs.harness.io/tag/Harness-Resource-Group#operation/updateResourceGroupV2 (PL-31211, ZD-37398)

#### March 08, 2023, version 78619

##### What's new

- Sorting functionality is available on the triggers listing page. (PL-31530)
  
  You can sort triggers according to the following: 
  - Name
  - Creation date
  
- The [List User Groups API](https://apidocs.harness.io/tag/User-Group/#operation/getUserGroupList) now supports `INCLUDE_CHILD_SCOPE_GROUPS` as an additional filter type value. (PL-31353)
  
  This filter allows API responses to include child-scoped user groups.

- You can now access your account immediately after resetting your password. (PL-30878)

- You can configure the HashiCorp Vault connector to use AWS Auth authentication without providing `X-Vault-AWS-IAM-Server-ID`. (PL-30628, ZD-36826,39745)
  
  It is now an optional field.

- In the execution view, failed stages are now sorted before success stages when parallel stages are used. (PIE-2518)
  
  This makes it easier to choose failed stages.

- The feature flag `FF_ALLOW_OPTIONAL_VARIABLE` now lets you make runtime variables optional in pipelines and stages. (PIE-8209)


##### Early access

This release does not include any early access feature.

##### Fixed issues
- The encryption type for GCP Secrets Manager in the Terraform plan step is incorrect. (PL-31684,ZD-40381)
  
  The encryption type is correct now.

- The execution of a chained pipeline with triggers fails with the error "User is not authorized". (PL-31594,ZD-39808,39954,40294,40337,40662)
  
  A code enhancement has fixed this issue.

- There is a conflict between the schema names for `InviteDTO` and `SecretManagerMetadataRequestDTO`, causing an issue with Terraform Provider. (PL-31626)

  Renaming the schema name of `SecretManagerMetatadataRequestDTO` has fixed the issue.
  
- During search, an incorrect message is displayed in the pipeline chaining selection window if no pipeline matches the selection criteria. (PIE-8526)
  
  The message now includes information about the scope and repository.
  
- On the **Input Sets** page, the **Clone** option is disabled. (PIE-8373)
  
  The option has been removed. 

#### February 23, 2023, version 78507

##### What's new

- The new delegate installation wizard is now generally available. (PL-31305)
  
  You also have the option to revert to the previous installation method if desired.


- A warning message now appears in the UI when you delete a project or organization. Deletions require confirmation from the user. (PL-31292)
  
  ```mdx-code-block
  <img src={delete_project} alt="delete-project" height="150" width="400"></img>
  ```

  This enhancement prevents the accidental deletion of important projects or organizations and provides an extra layer of caution for users.

- The entities reference page has been improved to provide detailed information about each reference. (PL-31247)

  The following details were added to the existing reference pages:

  - Date or timestamp 
  - Name and type of entity
  - Scope of reference

  These enhancements provide comprehensive information about each reference.

- Sorting functionality is available on the project listing page and the project selector dropdown. (PL-27493)
  With this enhancement, you can easily sort and find projects you need and organize them according to your preferences.

- You can now change stages without losing the values you enter in the **Run Pipeline** form. (PIE-4663)

##### Early access

This release does not include any early access feature.

##### Fixed issues

-  HTML injection occurs due to a lack of server-side validation. (PLG-657)
  
   Server-side validation now occurs. 

- The UI does not display an error message when the referred connector in infra does not exist.(PL-30130)
  
  An enhancement to the error-handling system enables an error message to appear when the connector API fails.

- The warning corresponding to permissions does not display properly in organization settings. (PL-31278)

  An enhancement to the width of the warning fixed the issue.

- Removing the default value from a variable in a service results in the addition of `.nan` as the default value in the YAML. (PIE-8129)
  
  In the absence of a value, the default value is now removed from the YAML.

#### February 15, 2023, version 78421

##### What's new

- The Redisson client library has been upgraded to version 3.17.7 across all services for enhanced performance and bug resolution. (PL-31136)
  This update will not affect any business operations.

- The [Role Assignment](https://apidocs.harness.io/tag/Role-Assignments/#operation/getFilteredRoleAssignmentByScopeList) API now includes the principal's name and email address in the response.(PL-31064, ZD-36050)

- Harness now supports the integration of GCP Secrets Manager for all users. (PL-31051)
  
  For more information, see [Add a Google Cloud Secret Manager](https://developer.harness.io/docs/platform/Security/add-a-google-cloud-secret-manager)

- There is a limit on the number of entities that can be created for **FREE** and **COMMUNITY** users in Harness. (PL-30838)
  
  Following are the entity creation limits: 

  - Project - 100
  - Secrets - 100
  - Variables - 100
  - User groups -100
  - Service accounts - 100

- You can now add policy sets under the **Advanced** section of each step. (PIE-7794)

  In this way, you can validate step outputs generated during pipeline execution without explicitly requesting a payload. Policy sets receive the steps and their outputs as payloads, with a pre-defined schema for every step.

- Accessing the CD module redirects you to one of the following: 

  - Get Started: If you don't have any pipelines in your project.

  - Deployment list page: This is the default selection page. (PIE-7625)

##### Early access

No early access features are available in this release.


##### Fixed issues

- The **Remove** option is disabled for the first user added to a user group through SCIM. A code check prevents the deletion of a user from a user group if the user is externally managed. (PL-31125, ZD-39358)

  ![](./static/remove-scim-user-issue.png)

  This issue has now been resolved and users can now remove any user from a user group created through the Harness UI.

- Deletion of externally managed users from organizations and projects is disabled. (PL-31104, ZD-39109,39110)
  
  ![](./static/delete-scim-user-issue.png)

  A code enhancement has fixed this issue.

- Capitalization of user emails in SCIM impacts SAML authentication. (PL-31038)
  
  A code enhancement has fixed this issue.

- When trying to delete or update an externally managed user group in Harness, the error message is unclear. (PL-30641)
  
  It has been enhanced to "User is externally managed by your Identity Provider and cannot be deleted via UI / API. To delete the user from Harness, delete it from your Identity Provider."

- The default secret manager does not appear in the **Secrets Manager** list when there are more than 100 secret managers.(PL-29635)
  
  A code enhancement has fixed this issue. The default secret manager is now displayed if you enter its name in the **Secrets Manager** field.

- Deletion of vault connectors does not delete the corresponding perpetual tasks. (PL-27621)
  
  A code enhancement has fixed this issue.

- When using Firefox, the YAML Difference is not displayed in the audit trail summary. (PL-25659)

  ![](./static/audittrail-chrome-issue.png)

  A change in the configuration to load the web workers fixed this issue.

- When the pipeline is not saved in the default branch in Git, the retry pipeline does not work. (PIE-8132)
  
  A code enhancement has fixed this issue.

- In pipeline execution, the YAML builder does not support read-only operations and throws an error. (PIE-8040)
  
  A code enhancement has fixed this issue.

- The pipeline execution details page does not have a **View Compiled YAML** option.(PIE-7967)
  
  This option is now available on the execution page.

- Creating an input set results in an error. (PIE-7849, ZD-39180,39240,39250)
  
  ![](./static/inputset-create-error.png)

  A code enhancement has fixed this issue.



#### February 6, 2023, version 78321

##### What's new

- The pages in app.harness.io autofocus the search input box by default. (PL-30656)
  
  This results in a seamless search experience.

- Entities in Harness can now have `/` for the Name. (PL-29929)

- [Looping strategies](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/), including matrix and parallelism strategies, are no longer behind a feature flag. (PIE-5010)

##### Early access

- You can delete a user provisioned in Harness through SCIM in NextGen and retain the user in FirstGen by enabling the feature flag `PL_USER_DELETION_V2`. (PL-23577)

##### Fixed issues

- In the SCIM API, the Groups endpoint returns all the user groups associated with an account. The ResourceTypes endpoint also returns incorrect information. (PL-30862)

  A code enhancement has fixed this issue. The Groups endpoint returns only externally managed user groups and the ResourceTypes endpoint returns details   as per the schema.

- The user group details page in the project and org scope does not display correctly when opened using the **Open in new tab** option. (PL-30911)
  
  An enhancement to the code has fixed this issue.

- The email update for SCIM users does not work. (PL-30439)
  
  A code enhancement to support user metadata updates has fixed this issue.
  
- Force deletion of a secret used for the creation of a secrets manager throws an incorrect error. (PL-29983)

  This has been fixed by displaying the appropriate error message.

- Pipelines with input sets and triggers chained together do not display input set fields correctly. (PIE-7681)
  
  An enhancement to the code has fixed this issue.

- If an execution has a matrix strategy, the text on the pipeline execution page overlaps. (PIE-7429)
  
  An adjustment to the height of the matrix wrapper has fixed this issue.

- API PUT operations for Bitbucket SaaS and on-prem connectors return an incorrect status code when there are no changes. (PIE-6230)
  
  A modification to the error message to display an appropriate explanation of the error has fixed this issue.
  

#### January 17, 2023, version 78214

##### What's new

This release introduces a dedicated release notes page for Harness Delegate &mdash; SaaS. You can find release notes for the NextGen delegate at [Delegate](/release-notes/delegate).

##### Early access

No early access features are available in this release.


##### Fixed issues
- The Harness APIs return a status code of HTTP 400 instead of HTTP 401 for an invalid or expired token. (PL-30757, ZD-38494,38547)

  An enhancement to the code has fixed this issue.
  
- The project selector component selects multiple projects with the same project name across different organization IDs.(PL-30663)
  
  The project selection code has been enhanced to select projects corresponding to specific organization IDs.

- The error message displayed when creating the GitHub connector and selecting **Harness Platform** as the connectivity option is not clear and informative. (PL-29953)
  
  Modifying the error message to indicate that the secret manager being used is not Harness' built-in secret manager fixed the problem.

#### January 10, 2023, version 78105

Delegate version: 78100

##### Important announcements

**Update repository references to the NextGen Helm delegate** 

The location of the repository that contains the NextGen Helm chart is changing. Change your references to the repository location from [https://app.harness.io/storage/harness-download/delegate-helm-chart/](https://app.harness.io/storage/harness-download/delegate-helm-chart/) to [https://app.harness.io/storage/harness-download/harness-helm-charts/](https://app.harness.io/storage/harness-download/harness-helm-charts/). Updates to the chart will not be made to the deprecated repository.

**The following role-assignments are removed for all the existing users across all the accounts:**(PL-28848)

  - **Account Viewer - All Account Level Resources**: This was a role-assignment within the account scope and has been removed for all the users.
  This does not apply in the following scenarios: 
    - If an account has enabled the feature flag `ACCOUNT_BASIC_ROLE_ONLY`.
    - If an account does not have the **Account Viewer - All Account Level Resources** role-assignment for the default user group `All Account Users`.
- **Organization Viewer - All Organization Level Resources**: This was a role-assignment within the organization scope and has been removed for all the users.
- **Project Viewer - All Project Level Resources**: This was a role-assignment within the project scope and has been removed for all the users.

For more information, see [Default User Group](/docs/platform/User-Management/harness-default-user-groups)


##### What's new

- Secrets and connectors now have a character limit of 128 for the **Name** and **ID** fields. (PL-29887)
  
- The [Role-Assignments](https://apidocs.harness.io/tag/Role-Assignments/#operation/getFilteredRoleAssignmentByScopeList) API now fetches role assignments by scope. 
(PL-29496, ZD-36050)
  This helps you keep a track of the role assignments within a specific scope.

- The repository location of the Helm chart for the NextGen delegate is changing. (DEL-5576) 

  The repository is being deprecated. Updates to the chart will not be made to [https://app.harness.io/storage/harness-download/delegate-helm-chart/](https://app.harness.io/storage/harness-download/delegate-helm-chart/) and will not be available from that location. To ensure retrieval of the most recent Helm chart, update your repository references to [https://app.harness.io/storage/harness-download/harness-helm-charts/](https://app.harness.io/storage/harness-download/harness-helm-charts/).

##### Early access

No early access features are available in this release.

##### Fixed issues
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

</details>

<details>
<summary>2022 releases</summary>

#### December 22, 2022, version 77908

Delegate version: 77802

##### What's new

-   API support for discovery of SCIM service provider features and schema. (PL-29069)
    
    Harness now supports the following three HTTP GET API endpoints to facilitate the discovery of SCIM service provider features and schema. These endpoints are defined in SCIM 2.0:

    -   ServiceProviderConfig

    -   ResourceType

    -   Schemas

##### Early access

No early access features are available in this release.

##### Fixed issues

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


#### December 13, 2022, version 77808

##### What's new

- You can now refer to existing secrets of Azure Key Vault, AWS secret manager, and GCP secret manager. (PL-29915)

  With this enhancement, you need not create secrets in Harness. You can use expressions to reference the secrets already existing in the mentioned secrets managers. For more information, see [Reference Existing Secret Managers Secrets](https://developer.harness.io/docs/first-gen/firstgen-platform/security/secrets-management/reference-existing-secrets/).

- You can now use the Git client to commit changes while creating or updating pipelines using Bitbucket on-prem as the Git provider. (PIE-6423)

  To do this, enable Use Git client for commits in the default settings at the account scope. Harness checks out the code on the delegate and uses the Git client to make the commits to your Git repository.

##### Early access

No early access features are available in this release.

##### Fixed issues

- Executing a pipeline with multiple states causes issues and results in incomplete execution. (PIE-6893)

  This happens when one of the steps of the pipeline deploys a single service to multiple environments with GitOps.

  An enhancement in the logic has fixed this issue and the pipeline now executes completely.

- When running a preflight check with an empty field in input sets, the error message displays incorrectly. (PIE-5788)

  A correction to the error message has fixed this issue.

#### December 7, 2022, version 77716

Delegate: 77800

##### What's new

- Securing data through JSON Web Token (JWT) masking. (PL-29019, ZD-32004)

  Harness now masks all JWTs in pipelines and delegate logs. This change prevents data leakage risks for the applications running in Harness.

##### Early access

No early access features are available in this release.

##### Fixed issues

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

#### November 29, 2022, version 77608

Delegate: 77431

##### What's new

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

##### Fixed issues

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

#### November 11, 2022, version 77433

Delegate version: 77431

##### What's new

**Platform**

- You can now send email notifications to all the members of a user group by selecting the Send email to all users part of the user group option.(PL-29434, ZD-32444)

  For existing user groups, this is the default option.

- The organization filter selection on the project listing page will now persist across user sessions and page navigations.(PL-29292)
  You can now see the versions of the services in Account Overview in Platform Service Versions.(PL-26581)

##### Early access

- You can now create secrets using the Google Cloud Secret Manager in Harness. (PL-28978)

  For more information, see [Add a Google Cloud Secret Manager](https://developer.harness.io/docs/platform/security/add-a-google-cloud-secret-manager/).

- You can now select modules and configure your own navigation in Harness. (SPG-153)

  Also, Projects is a new option in the left navigation. Click Projects to view the project-specific overview, pipeline, connector, and other details.

##### Fixed issues

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

#### November 6, 2022, version 77317

##### What's new

**Platform**

The option to disable Harness Secret Manager is now a part of the core settings in Account Default Settings. (PL-27160)

##### Early access

**Platform**

You can now get optimized performance on remote pipelines if you are on delegate version 772xx or higher,
by enabling the feature flag USE_GET_FILE_V2_GIT_CALL . (PL-29459)

If you are on an older delegate version, you can upgrade your delegate and then enable the feature flag for optimized performance.

##### Fixed issues

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

#### October 21, 2022, version 77221

Delegate version: 77221

##### What's new

**Platform**

- The method that the log streaming task client uses to create threadpools was modified. Threadpools are now created one time in the client's lifetime instead of being created for each task the delegate receives. (DEL-4328)

- You can now import Templates from your Git repo. (PL-28597)

  See [Import a Template From Git](https://developer.harness.io/docs/platform/git-experience/import-a-template-from-git/).

##### Fixed issues

**Platform**

- Users were receiving two 2FA emails when the feature flags AUTO_ACCEPT_SAML_ACCOUNT_INVITES and PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES were enabled. (PL-29081)

  This is now fixed by restricting notification with 2FA QR code email to just one.

- Editing secrets in Azure Key Vault with minimum permissions was failing. (PL-29025)

- Some fields were missing in the GET Pipeline CRUD endpoint. (PL-28918)

- The status code for GET API was incorrect when the role assignments were absent. (PL-28779)

- When 2FA was enabled in the Account scope, the user invitation emails did not contain a 2FA token. (PL-28549)

- The conditional skip option in the Pipeline Studio was not displayed consistently across various browsers. (PIE-5712)

  This is fixed by making the skip icon SVG as

#### October 18, 2022, version 77116

Delegate version: 77021

##### What's new

**Platform**

The functionality of the delegate auto-upgrade components was enhanced. On installation, the AutoUpgrade feature displays a status message of Synchronizing. If the feature does not receive an API call from the upgrade within 90 minutes, the status message changes to OFF. This affects delegates that are installed with the upgrader components.

A loader is now displayed on click of Run Pipeline to indicate that the Pipeline is running. (PIE-5396)

##### Early access

N/A

##### Fixed issues

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

#### October 7, 2022, version 77025

Delegate version: 77021

##### What's new

**Platform**

- You can now use a readOnly vault as a default secret manager. (PL-24491)

- The console colors are now updated for better readability. (PIE-4369)

##### Early access

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

##### Fixed issues

**Platform**

- Introduced a new method for the Docker delegate to provide proxy configuration. This method provides additional support for scenarios in which delegates running on VMs experience difficulties referencing Kubernetes secrets. (DEL-4813)

- Changed the UI to ensure the correct API was invoked. This corrects a functional problem that involved the Add Delegates list. (DEL-4833)

- User invites were not sent for the configured SMTP. (PL-28208)

  This is now fixed by creating SMTP in Next Gen.

- Incorrect auth mechanism was displayed when switching from LDAP to username password. (PL-27887)

- Incorrect error message was displayed when the Project or Org or Account name did not exist in the APIs. (PL-27587, ZD-33846)

#### September 29, 2022, version 76921

Delegate version: 76810

##### What's new

**Platform**

- The method that the log streaming task client uses to create threadpools was modified. Threadpools are now created one time in the client's lifetime instead of being created for each task the Delegate receives. (DEL-4328)

- UI changes were implemented to support enabling or disabling Delegate run-as-root capabilities. (DEL-4836)

- When NG LDAP authorization is 'disabled', all LDAP SSO-linked Harness User Groups don't sync in NG. They sync with the users from LDAP when the LDAP settings have authorization enabled.​ (PL-27954)​

##### Early access

N/A

##### Fixed issues

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

#### September 22, 2022, version 76817

##### What's new

**Platform**

- Harness Manager was changed to remove the edit and details UI for Immutable Delegates. These Delegates cannot be changed. (DEL-4756)

- A migration will run to remove the following Role Bindings directly assigned to users for accounts having ACCOUNT_BASIC_ROLE turned ON (PL-28284):

  - At Account Scope, Account Basic/Account Viewer -All Account Resources​.
  - At Organization scope, Organization Viewer - All Organization Resources.​
  - At Project Scope, Project Viewer - All Project Resources.​

  Harness now has a default User Group at each scope. These groups have all the users at the respective scope as their members. As a part of this change, Harness will stop assigning any roles to the User Groups by default.​ Users can assign roles to the default User Group at a specific scope, which becomes the default role for all the users in that group. (PL-26145)

  See [Harness Default User Groups](/docs/platform/User-Management/harness-default-user-groups).

##### Early access

N/A

##### Fixed issues

**Platform**

- Harness Manager UI was updated to ensure that Delegate version and associated information clarifies the difference between older immutable and legacy Delegates. (DEL-4826)

- There was no limit on the number of visible execution stages shown. (PIE-5320​)

  This is fixed by adding a limit of showing 3 executions.

#### September 14, 2022, version 76708

##### What's new

**Custom Dashboards**

You can now use forecasting on your dashboards to help you create data predictions. (CDB-351)

**Platform**

- The versioning scheme for the Immutable Delegate was changed from 1.0.`<build_number>` to year.month.`<buildNumber>`. (DEL-4338)

- Expiration was added for Immutable Delegate images. These images will now expire after three months. (DEL-4377)

- Login Settings is now renamed to Authentication Settings in Audit Trail. (PL-28048)

- You can now view your unsaved changes in the Pipeline Studio by clicking on Unsaved Changes. (PIE-5281)

##### Early access

N/A

##### Fixed issues

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

##### Important Announcements

**Platform**

Harness now has a default User Group at each scope. These groups have all the users at the respective scope as their members.

As a part of this change, Harness will stop assigning any roles to the User Groups by default.

Users can assign roles to the default User Group at a specific scope, which becomes the default role for all the users in that group.

For more information on default User Group, see [Harness Default User Groups](/docs/platform/User-Management/harness-default-user-groups).

#### September 7, 2022, version 76619

##### What's new

- You can now inherit User Groups created at a higher scope by using Assign Roles. (PL-27237)

  See [Assign Roles](https://developer.harness.io/docs/platform/User-Management/add-user-groups#step-assign-roles).

- You can now view the past 10 executions of the Pipelines and sort them from the table. You can also go to a specific execution by clicking on it. (PIE-4903)

##### Early access

- You can now create a Harness Custom Secret Manager in Next Gen. (PL-25545)

  You can onboard any secret manager with Harness and reference their secrets in Harness using a Shell Script.

  This is behind the feature flag CUSTOM_SECRET_MANAGER_NG.

See [Add a Custom Secret Manager](https://developer.harness.io/docs/platform/Secrets/Secrets-Management/custom-secret-manager).

##### Fixed issues

- Fixed the display of an error message in the UI. The error message was not properly displayed when a pipeline selector was added using invalid characters. (DEL-4755)

- The Description of User Groups in Access Control was not wrapped and was resulting in inconsistent UI. (PL-27733, ZD-34043)

- Error was thrown when importing a Pipeline from Git which was already in use. (PL-27598)

  This is fixed now by displaying a confirmation message.

- Pipeline was not being triggered while setting up a trigger for a Bitbucket repo. (PIE-4827, ZD-33190)

  This is fixed by fixing the order of commit hashes being passed from delegate to SCM service.

#### August 31, 2022, version 76515

##### What's new

- Git Experience in Next Gen is now enhanced and simplified. (PL-26339)

  See [Git Experience](https://developer.harness.io/docs/category/git-experience/).

- You can now switch branches directly from the Pipeline execution history. This will make it easier to switch branches straight from execution history rather than going to the Pipeline studio first and then returning to execution history. (PIE-4985)

##### Early access

No early access features are available in this release.

##### Fixed issues

- Email notification for approval was not to SCIM groups with "\_" in the group name. (PL-26457)

- Multiple error toasts occurred when there was network failure because the error toast condition was at the component level, hence getting re-rendered every time. (PIE-5019)

- Users without appropriate permissions were able to create Pipeline and add Stage and Steps. (PIE-5008)

  The Add Stage and Add Step options are now hidden for users with View permission.

- The existing Input Sets were not getting updated. (PIE-4855)
  To fix this, Save as Input Set is changed to Save as New Input Set to indicate the correct behaviour.

#### August 25th, 2022, version 76425

##### What's new

- Now you can add up to 50,000 users in the Harness Non-Community Edition. (PL-27300)

  See [Add and Manage Users](/docs/platform/User-Management/add-users).

- You can now use an enhanced Git Experience. (PL-26339)

  See [Harness Git Experience Overview](https://developer.harness.io/docs/platform/git-experience/git-experience-overview/).

  Harness will continue to support users who have been using the old Git Experience.

##### Early access

N/A

##### Fixed issues

- Error messages were not displayed while creating a HashCorp Vault Connector. (PL-27383​)

  This was happening for App Role based login because the value of the namespace was not sent as part of the vault config.

  As a part of this fix, the namespace value is now added.

- Errors were blocking users from creating a secret even after clicking the back button and updating the correct values. (PL-26169​)

  This is now fixed by sending the updated data when the back button is clicked.

- Unsaved changes were retained even after clicking Discard in the Pipeline Studio. (PIE-4880​)

- The loading indicator was not displayed when filters were applied. (PIE-4829​)

  The resource constraint endpoint returned an empty response when the Pipeline Service threw an exception.

  Now the case is handled and the response is returned as expected. (PIE-4727)​

#### August 18th, 2022, version 76319

##### What's new

- The versioning scheme for immutable Delegates was changed from 1.0.`<build_number>` to year.month.`<buildNumber>`. (DEL-4338)

- ReactDOM unstable_bacthedupdates ​will now be used for batch updates. (PIE-4555)

##### Early access

N/A

##### Fixed issues

- Changed error messaging for NextGen task failures to display a specific error message, if one exists. These errors usually occur when there is no available Delegate to perform a task. (DEL-3933)

- The creation of the HashiCorp Vault Connector was failing. (PL-27140, ZD-32981)

- The alignment of the Import Pipeline option was not correct. (PL-26644)

- The error type was not correct for an empty encrypted file name or Id. (PL-25268)

- Polling was not working at regular intervals. (PIE-4751)

- Triggering a Pipeline was throwing an error. (PIE-4680, ZD-33179,33187)

#### August 8th, 2022, version 76128

Delegate Version: 76128

##### What's new

You will now see a quicker account load when attempting to switch accounts. (PL-21667)

##### Early access

N/A

##### Fixed issues

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

#### August 1st, 2022, version 76030

Delegate Version: 76127

##### What's new

- Role-based Access Control has been added to Custom Dashboards. To access Dashboards, users now must have the View Dashboards permissions. (CDB-227)

- Stream logs' performance has improved.​ (PIE-4447)

##### Early access

N/A

##### Fixed issues

- On Custom Dashboards, the filters for Deployments and CG Deployments have been merged into a single Deployments filter tag. (CDB-259)

- Git Experience was throwing an error for file updates via Bitbucket. (PL-26564, ZD-32559)

- Notification Preference for the SCIM provisioned User Groups was not getting saved. (PL-26324, ZD-32246,32444)

- SAML SSO setup was throwing errors. (PL-26303, ZD-32097)

- Git Experience was throwing an error while updating Azure Connector in a Project. (PL-26216, ZD-32129)

- Deletion of the stage strategy was not working. (PIE-4475)

- Selecting selective stages before running a Pipeline was resulting in errors. (PIE-4437)

- Adding allowed values for the Timeout field as part of Input Sets was throwing an error in Pipelines. (PIE-3831)

#### July 20th, 2022, version 75921

##### What's new

- Resource constraint blocking in approval state (PIE-3195)

  The infrastructure resource constraint now has the Stage scope to unblock the operations of other Pipelines.

##### Early access

N/A

##### Fixed issues

- Create File API was not working correctly in Git Experience. (PL-26360)

- Branch listing was failing in Git Experience. (PL-26275)

- Pipelines were executed even if a wrong selector was passed at the Pipeline level. (DEL-4424)

- The Audit Trail for Delegate creation was not captured properly. (DEL-4321, ZD-31813)

#### July 11th, 2022, version 75829

##### What's new

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

##### Early access

N/A

##### Fixed issues

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

</details>
