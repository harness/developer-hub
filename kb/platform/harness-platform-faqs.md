---
title: Harness Platform FAQs
description: Frequently asked questions about Harness Platform.
sidebar_position: 2
---

<!--

Contributor Guidelines

Before you add new content, search for existing FAQs to avoid duplications.

Ensure that your contributions are organized according to the following categories:

- Subscriptions
- Access Control/RBAC
- API/Integration
- Authentication
- Automation
- Connectors
- Delegates
- Dashboards
- Feature Flags
- Git Experience
- Governance
- Notifications
- Organizations and Projects
- Platform rate limits
- References
- Secrets
- Security
- Settings
- Self-Managed Enterprise Edition
- Terraform
- Variables and Expressions
- Miscellaneous

You can search for a heading, for example, ## Access Control, and add your new FAQ under the category that's appropriate to keep the file's organizational structure.

-->

## Subscriptions

### For Developer 360 subscriptions, how do we remove users who left the company?

Delete the user(s) from the platform. The user will be removed from the Developer license count immediately.

:::note
This applies to Developer oriented modules: Continuous Integration (CI), Code Repository (CR), Feature Flags (FF), and Internal Developer Portal (IDP). For more information, go to [View and manage subscriptions](/docs/platform/get-started/subscriptions-licenses/subscriptions).
:::

## Access Control/RBAC

### What is RBAC and how do I manage users and roles?

Harness NextGen platform utilizes Role-Based Access Control (RBAC). For more information, go to this [blog post](https://www.harness.io/blog/user-role-management) and [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness/) in the documentation.

### Are there any built-in roles I can use?

Yes, for more information on built-in roles, go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness/).

### What is the best way to implement Harness RBAC?

Following a workflow can be a useful process for implementing and understanding RBAC:

To configure RBAC in Harness, you must:

1. Create roles.
2. Create resource groups and, optionally, apply RBAC.
3. Create user groups, create service accounts, and add users.
4. Assign roles and resource groups to users, user groups, and service accounts.
5. If you have not already done so, configure authentication.

### What are the main components of RBAC?

RBAC uses Principals, Resource Groups, and Roles to control access.

- Principals are entities taking action in the system. These include users, user groups, and service accounts.
- Resource Groups define what objects can be acted on. Objects include organizations, projects, pipelines, connectors, users, and more.
- Roles define what actions can be taken on objects. Actions include view, create, edit, delete, and so on.

### Are there any features in Harness that I can prevent a pipeline from re-running via RBAC?

Rerun shares the same RBAC as RUN features. Therefore, users who can run the pipeline can also re-run, as there is no separate RBAC for Rerun.

### Does Harness NextGen Free edition support RBAC?

Yes, Harness NextGen Free edition supports RBAC. For a feature comparison and supported functionality, go to the [pricing](https://www.harness.io/pricing) page on `Harness.io`.

### What is a Resource Group?

Resource groups are an RBAC component that defines the objects that a user or service account can access. Objects are any Harness resource, including projects, pipelines, connectors, secrets, delegates, environments, users, and more.

For more information, go to [Add resource groups](/docs/platform/role-based-access-control/add-resource-groups).

### Does Harness support provisioning users and user groups via GitHub?

No. Harness currently supports the following provisioning methods:

- Okta SCIM
- Microsoft Entra ID SCIM
- OneLogin SCIM
- Just-in-time provisioning

### I'm a user of multiple accounts. Why am I getting an error when I try to redirect to a specific account?

Use the direct URL with the `accountId` for the desired account, such as `https://app.harness.io/ng/account/:accountId/settings/overview`.

You can then sign in and change your default account from your profile.

### Currently, Azure only supports view access at the project level. However, documentation suggests that view access is only available at the account level. How can we achieve project-level view access using Azure AD?

The access depends on how and where you have added the user. If the user is added at the account level manually or via SCIM, they are automatically part of the All Account Users group, inheriting permissions associated with that group.

However, if the user is only added at the project level, they are added to the All Project Users group, and permissions associated with that user group apply.

Additionally, you can add a user at the account level and manage project-level permissions through Access Control at the project level. The same principle applies to organization-level access.

### What is Role Binding, and how does it relate to Harness RBAC?

Role binding refers to the process of assigning roles and resource groups to principals (users, user groups, and service accounts). Role binding can be configured at all scopes.

### Is there an overview doc on Harness RBAC and permissions?

Yes, for more information, go to [Permissions reference](https://developer.harness.io/docs/platform/role-based-access-control/permissions-reference).


### Can I configure RBAC for the environment based on the stage?

No, you can only configure RBAC for the environment based on environment type.

### Does Harness log GET Calls in the audit logs?

No, Harness doesn't support audit trails for read API requests like GET.

### Why are RBAC checks different for pipelines stored inline vs. Git?

You can set Harness to by default, before running any pipeline, check whether the user has access to all of the environments and other resources that the pipeline accesses. This check is run only for inline pipelines, not those stored in Git or other repositories.

:::note
Currently, this feature is behind the feature flags `CDS_PIPELINE_ABORT_RBAC_PERMISSION_MIGRATION` and `CDS_PIPELINE_ABORT_RBAC_PERMISSION`. Contact Harness Support to enable the feature.
:::

Turn off this setting if the check isn't required. Turning this off can cause pipelines to fail partway through execution (since later stages could have permission issues that haven't been checked beforehand).

For more information, go to [Run RBAC Validation before executing Inline Pipelines](/docs/platform/pipelines/pipeline-settings/#run-rbac-validation-before-executing-inline-pipelines).

### What is the purpose of linkedSsoDisplayName?

`LinkedSsoDisplayName` is the same SSO setting name in Harness. For SAML, the value provided for both `ssoGroupId` and `ssoGroupName` must be the same.

### Will creating an administrator role at the account level and assigning it to a resource group with specific scope for a Harness organization grant admin access only to that organization?

To achieve your use case, it is recommended that you create a user with limited access at the account level. Then, add the same user to the organization level where you require admin access. This way, you can have control over user RBAC at the organization level scope.

### How can I view the de-factor roles/permissions assigned to a user?

You can view all permissions for a user by going to **Access Control**. Search for and then select the user. Select **Role Bindings** to view permissions for the user at all scopes.

If you want to review permissions within a role like Account Viewer or any custom-created role, as well as within a Resource Group, you must select each role or resource group individually, as they are not displayed on the User Permissions page.

Harness solely displays permissions at the Account/Project/Organization level along with the assigned role and resource group, whether assigned through a user group or directly. However, you can view all permissions together by selecting the scope as **All** instead of **Individual**.

### How do we provision users with pre-defined or custom roles?

With Harness, users and groups can be created automatically via SCIM. Permissions in Harness are granted via roles. You can use built-in roles or create your own at every Harness scope (account, organization, and project). You can assign roles to groups, and assigning roles to groups gives all the users in the group the permissions spelled out in the role. For more information, go to [Role-Based Access Control (RBAC) in Harness](/docs/platform/role-based-access-control/rbac-in-harness/).

### Can an admin user assume the same role as an alternate user for testing permission issues?

No, there is no such option currently. To debug permission related issues, check the groups and roles assigned to user.

### Can a ORG service account token access the connectors at account level?

No, In harness RBAC, child scope does not have permissions to access the parent resources. If you want to run any pipeline that has account level resources used, you have to create a account level service account token.

## API/Integration

### How can you update a secret file using binary file content through an API request?

To update a secret file using binary file content, you can use the following cURL command:

```bash
curl -X PUT 'https://app.harness.io/gateway/ng/api/v2/secrets/files/filesecret?accountIdentifier=px7xd_BFRCi-pfWPYXVjvw&projectIdentifier=Nishant_Test_Project&orgIdentifier=Nishant_Test_2' \
  -H 'Harness-Account: <account_id>' \
  -H 'x-api-key: replace_this_with_token' \
  -F 'spec={"secret":{"type":"SecretFile","name":"<file_secret>","identifier":"<file_secret>","description":"","tags":{},"orgIdentifier":"<org_name>","projectIdentifier":"<proj_name>","spec":{"secretManagerIdentifier":"harnessSecretManager"}}}' \
  -F 'file=@/path/to/the/file'
```

Replace `<account_id>`, `<file_secret>`, `<org_name>`, `<proj_name>`, and `/path/to/the/file` with your actual data. This command sends a PUT request to update a secret file in Harness, specifying the file path and necessary headers.

### Does Harness utilize the nodename Kubernetes API endpoint within the delegate to obtain the node metrics data of a worker node?

Harness itself does not directly utilize the `/api/v1/nodes/<nodename>/proxy/stats/summary` endpoint for gathering node metrics data of a worker node within the delegate. However, if there is a specific need to access this data, users have the option to employ a shell script to query this endpoint and obtain the desired metrics.

### What is the extent of Harness' integration with Microsoft Graph API and its permissions requirements for controlling access to resources like users, groups, mail, etc.?

The Harness application utilizes Microsoft Graph API for fetching a list of security groups when users exceed attribute limits in AAD (Microsoft Entra ID). Additionally, there's integration for SAML Group Authorization. It's important to note that there might be a need to pass the x-api-key header with a token (SAT/PAT) for invoking the Harness API from Microsoft tools.

### When retrieving audit logs for ingestion into a SIEM tool, what are the considerations for using Audit Streaming via S3 bucket versus Audit trail via API?

The choice between Audit Streaming and Audit trail primarily depends on convenience and infrastructure support. If you are already using S3, you can seamlessly publish audit logs to it. Conversely, API-based access necessitates building state management to handle querying for the latest logs and manage failures. However, in terms of the data itself, there is no difference between the two methods.

### How can I get all services using a cURL command?

To get all services using a cURL command, you can use the `getServiceList` API and make a cURL request using a valid token. For more information, go to [getServiceList](https://apidocs.harness.io/tag/Services#operation/getServiceList) in the API documentation.

### Is there an API to create overrides?

To create overrides via the Harness API, you can use the service override API. For more information, go to [ServiceOverrides](https://apidocs.harness.io/tag/ServiceOverrides) in the API documentation.

### Is there a Harness API to create overrides?

You can use the `createServiceOverride` API to create overrides. For more information, go to [Create a ServiceOverride Entity](https://apidocs.harness.io/tag/ServiceOverrides#operation/createServiceOverride) in the API documentation.

### Are there any JEXL expressions to get all projects environment?

Harness doesn't currently don't have a JEXL expression to retrieve all environments, but you can utilize the get environments API endpoint to fetch all environments. For more information, go to [getEnvironments](https://apidocs.harness.io/tag/Monitored-Services#operation/getEnvironments) in the API documentation.

### How is the ingress.yaml file used?

In Kubernetes, an Ingress resource is used to manage external access to services within a cluster. The Ingress resource allows you to define how external HTTP/S traffic should be directed to your services, enabling you to expose services to the external world and define routing rules.

An Ingress resource is typically defined in a YAML file, often named `ingress.yaml`. This file specifies the configuration for routing external traffic to different services based on rules such as hostnames, paths, and backend services.

By using Ingress, you can manage external access to your services more flexibly than using raw services or NodePort services. It provides a way to route traffic based on various criteria and allows you to handle SSL termination and other features. Keep in mind that the actual implementation of Ingress may vary depending on the Kubernetes cluster, as different cluster providers may have different Ingress controllers.

### Why am I getting an error when adding users in the Harness UI?

Sometime when you try to add a Harness user in the UI, you might get an error. You can open the developer tools and check the API call for the error to see the response. The error might be due to user creation limits. You can either resolve it by removing unused users from your account or contacting [Harness Support](mailto:support@harness.io) to validate the limit for your license.

### How do I get an x-api-key for making an API call?

You need to create a new token under API key. For more information, go to [Authentication](https://apidocs.harness.io/#section/Introduction/Authentication) in the API documentation.

### Does Harness support authorization with API tokens?

APIs token are used for both authentication and authorization. For more information, go to [Manage API keys](https://developer.harness.io/docs/platform/role-based-access-control/add-and-manage-service-account#manage-api-keys).

### Is there documentation for permissions references?

Yes, for more information, go to:

- [API permissions reference](https://developer.harness.io/docs/platform/automation/api/api-permissions-reference/)
- [RBAC permissions reference](https://developer.harness.io/docs/platform/role-based-access-control/permissions-reference/)

### Can you link the docs to the API endpoint used to authorize a user with API token?

Harness has an API to to check whether you perform authorization using bearer or API key token. For more information, go to [Get access control list](https://apidocs.harness.io/tag/Access-Control-List#operation/getAccessControlList) in the API documentation. For API token categories: Service Account vs. Personal access tokens, go to [Add and manage API keys](/docs/platform/automation/api/add-and-manage-api-keys/).

### How can I set my API key to expire in 24 hours?

An API key is created with a minimum duration of 30 days. You can rotate the token at any time.

### What does 'parentIdentifier' refer to during the creation of an API key?

The `parentIdentifier` in the context of creating an API key refers to the Parent Entity Identifier of the API key. This identifier indicates the entity or resource to which the API key is associated or belongs. It helps organize and manage API keys within the system by specifying their parent entity, such as a user, organization, application, or another relevant entity. When creating an API key, providing the appropriate `parentIdentifier` ensures that the key is properly linked to the intended entity, allowing for effective access control and management.

### How can I get a list of all users and their roles?

You can use the Get aggregated users API. This will provide with complete details of the users including the role they have. For more information, go to [Get aggregated users](https://apidocs.harness.io/tag/User#operation/getAggregatedUsers) in the API documentation.

### We have hundreds of users that were granted the admin role on the account level as individuals. How can we remove this role?

You can use this [API](https://apidocs.harness.io/tag/Account-Roles#operation/update-role-acc) and create a script to update the user roles.

### Is there any documentation for APIs we can use to fetch user details for a given userId?

Yes for more information, go to [getUsers](https://apidocs.harness.io/tag/User#operation/getUsers) in the API documentation.

### How can we export users from Harness?

Currently, Harness doesn't support direct functionality for exporting all users. To export users from Harness, you can utilize the getUsers API. For more information, go to [getUsers](https://apidocs.harness.io/tag/User#operation/getUsers) in the API documentation.

### Does Harness AIDA support APIs for developers to create custom AI/ML solutions?

No. AIDA does not offer Rest APIs to be used by Harness users.

### How can I export all AutoStopping rules?

Currently, Harness doesn't support direct functionality for exporting all AutoStopping rules. To create a report of all your AutoStopping rules, Harness recommends using the `List AutoStopping Rules` API method.

### How can CCM Admin roles be removed from users who were directly assigned these roles?

In the past, as part of our product strategy, Harness granted all users the CCM Admin role by default. This policy has since been changed. If you want to revoke these role assignments, you must identify the affected users, retrieve their role assignments via API, and then proceed to bulk delete the specific role assignments.

### Can I update my role with the core_governancePolicySets_delete  permission using the UI (it is working through API)?

Yes, you're able to set these permissions through API because these are onboarded, but the backend is currently not using them in the intended way. Hence Harness removed them from the UI and is working to release this feature soon.

### When making service-to-service calls, is it recommended to reuse the Bearer token received from the calling service's API in the Authorization Header for the destination service's platform API?

In service-to-service scenarios, a best practice is to transmit only the principal information without including the Authorization Header. This allows the destination service to handle authorization based on the provided principal details. Additionally, users have the flexibility to designate whether the call is Privileged or non-Privileged. For non-Privileged access, maintaining the principal as the end user is often suitable. Users are encouraged to refer to the platform's official documentation for comprehensive guidance on token creation and authentication for platform API calls. If further assistance is needed, contacting the platform's support team is recommended.

### Does Harness have documentation to implement ACL checks in log-service?

Yes, for more information, go to [getAccessControlList](https://apidocs.harness.io/tag/Access-Control-List#operation/getAccessControlList) in the API documentation.

### Can I access the Harness API from a React app, and how can I handle CORS issues when making API calls with the x-api-key header?

Yes, the Harness API is accessible from the React (or any JavaScript library) app. However, when encountering Cross-Origin Resource Sharing (CORS) issues, it's crucial to understand that browsers make pre-flight CORS requests, especially when the host origin and the server origin are different.

To resolve CORS issues:

- **Same Origin:** If your UI and API share the same origin (for example, UI and API both on `app.harness.io`), there won't be CORS calls.
- **Different Origin:** If your app is on a different origin (for example, `example.com/harness`) and makes non-GET requests to `app.harness.io/api/`, the browser initiates a pre-flight request.
- **Server Configuration:** Ensure your API server includes the necessary CORS headers, such as access-control-allow-origin and access-control-allow-headers, to explicitly allow the requesting origin and any custom headers like x-api-key.

By configuring your server to allow the necessary origins and headers, you can address CORS issues when making API calls from your React app. This ensures a smooth interaction with the Harness API while securing your application.

### Does Harness plan to support AsyncAPI specs (for messaging) in Harness APIs?

This has not been planned yet.

### Is there a way to obtain data on monthly active users (MAU) on the Harness Platform?

You can retrieve information about user logins from the audit log. If you need to do this through an API, an audit log API is available. However, Harness doesn't have a consolidated view or report of all the users who have accessed the Harness Platform.

### Can I safely use API endpoints marked as beta?

API endpoints labeled as beta have been tested by our teams and are generally safe for consumption. However, Harness cautions against using them for critical workloads, as they are not classified as stable yet.

### How can I find the status (failed/pass) and reason for a verification step using the graphQL API?

You can use the workflow/pipeline grapnel API for execution. The `failureDetails` field provides the information.

### What is the API used to pull a list of users and their roles from a specific project?

The List role assignments API enables you to pull a list of users and their roles from a specific project. For more information, go to [List role assignments](https://apidocs.harness.io/tag/Project-Role-Assignments#operation/get-project-scoped-role-assignments) in the API documentation.

### How are Create APIs supposed to work as if we are creating API it won't be having permission and will return false? How do we restrict creation of resources?

There are two types of scope, one is complete scope(which indicates ALL) and the other is specific.

- To allow creation of entity in certain scope, it means allowing to creation that entity at complete Scope level (which indicates ALL).
- If the use case is to allow Create Governance policy at scope and restrict edit to specific policies, then ideally you should split it into specific Create and Edit permissions.
- And then define 2 Role Assignments.
  One with Create and All Governance policy.
  One with Edit and Specific selected Governance policies.

### Are there RBAC permissions on Audit Trail in NextGen like there are in FirstGen?

This feature is not currently in NextGen, but Harness does have viewer permissions in place.

### What are the NextGen default project admin permissions?

When you create a project using the API, by default the Project inherits the project admin permissions on creation from the Service Account where the API token was generated.

### How do I check Harness API token validity?

When you create a token in Harness under Service Account, the validity of the token is determined based on how it was created. If you have specified an expiry date, the token will expire on that date. However, if you want the token to never expire, you can select the **No Expiration** option.

### How do I fetch delegate disconnected status via the API?

```
{delegateList(filters: [{accountId: "xxxxx"}], limit: 10) {

    nodes {
      delegateName
      ip
      status
      disconnected
      version
      hostName
      lastHeartBeat
     }
   }
 }

```

### Why do I get a 400 error when creating a connector via the Create Connector API?

When using the [Create Connector API](https://apidocs.harness.io/tag/Connectors/#operation/createConnector), invalid characters (such as parenthesis) in the name can cause Bad Request (400) errors, such as:

```
requests.exceptions.HTTPError: 400 Client Error: Bad Request for url https://app.harness.io/gateway/ng/api/connectors?accountIdentifier=\<ACCOUNT_IDENTIFIER>?
```

### What rate limiting policy does Harness employ for API requests?

Harness imposes a rate-limiting policy on API requests to ensure system stability. This policy sets a limit of 350 queries per minute (QPM) and 5.833 queries per second (QPS) for all external-facing APIs. For more information, go to [Platform rate limits](/docs/platform/rate-limits).

### Can I get user group and user lists in CSV or Excel?

No, Harness doesn't currently support this functionality.

You can use the 'getUsers` API to get a list of users that you can parse to create a CSV file. For more information, go to [Get users](https://apidocs.harness.io/tag/User#operation/getUsers) in the API documentation.

### How many types of API tokens are there?

There are two types of API tokens, one can be created at the user profile level. These are prefixed with `pat.xxxx....`, meaning personal account token. The second one can be created at the service account level, which is prefixed as `sat.xxxxx....`, meaning service account token.

### How do we assign permission to the API tokens?

Harness doesn't assign permission directly to the account tokens. They inherit permissions from the user if they are created at the user profile level, or the service account if they are created at service account level.

### How can I revert the "externally managed" status of user groups if they were managed by SCIM earlier?

If user groups were previously provisioned via SCIM and marked as "externally managed," you can update it by updating the "externally managed" field back to false via Terraform or API.

### Which API fetches all users in Harness?

You can use the following to fetch all users in Harness.

```bash
curl --location --request GET 'https://app.harness.io/gateway/api/users?accountId=enter_accountid_here&limit=3000&offset=0' \
--header 'authority: app.harness.io' \
--header 'accept: application/json, text/plain, */*' \
--header 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
--header 'adrum: isAjax:true' \
--header 'authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxx' \
--header 'referer: https://vanitytest.harness.io/' \
--header 'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'sec-ch-ua-platform: "macOS"' \
--header 'sec-fetch-dest: empty' \
--header 'sec-fetch-mode: cors' \
--header 'sec-fetch-site: same-origin'
```

### I have a large list of users to fetch, but the API has a limit of 100 and takes lot of time. Do I have an alternative?

To retrieve the list of users from API, you can use the following curl command.

```bash
curl --location --request GET 'https://app.harness.io/gateway/api/users?accountId=<AccountId>&limit=3000&offset=0' \
--header 'accept: application/json, text/plain, */*' \
--header 'authorization: Bearer ${token}' \
```

### Why am I getting an error when I try to create an API key?

```
Invalid request: Maximum limit has reached
```

This error indicates that you've reached the maximum amount of API keys available for your user. Harness has a limit of 5 API keys per user. To resolve this error, delete one of your existing API keys or use a service account instead.

### Is there an API call to fetch an API key?

There's no API to get an api-key value as Harness does not store the API token for future reference.

## Authentication

### As I migrate from FirstGen to NextGen and use Okta for SCIM, I've noticed our user groups haven't migrated. Is there an additional step I need to take?

Yes, to ensure that your user groups migrate correctly when moving from FirstGen to NextGen platforms and continue using Okta for SCIM, you must configure a new SCIM app specifically for the NextGen platform.

### Can we obtain the account's private key from the delegate without resorting to a PAT token?

No, it is not possible to obtain the account's private key from the delegate, even with a valid Personal Access Token (PAT). The delegate uses a secure token for encrypted communication with Harness Manager. However, this communication framework does not provide a method for accessing the account's private key directly through the delegate.

This limitation is by design to uphold security protocols. Delegates often operate with scoped permissions at the organization or project level, and allowing access to the account's private key via a delegate would pose a significant security risk. Therefore, regardless of the delegate's ability to communicate with Harness Manager, access to the account's private key is strictly controlled and not available through delegate operations.

### Does Harness SAML work with any SSO provider?

Yes, Harness provides support for Okta and Azure OneLogin out of the box, but you can add any custom SSO with Harness. All you need is the Harness SAML endpoint URL and SAML metadata file.

### How do I resolve Okta provisioning errors due to user limits?

Perform a sync within Okta to resolve the user limit error during Harness provisioning.

### Why do I get an error for my Jit-provisioned user when I try to update via SCIM?

If you're utilizing SCIM, Harness recommends that you provision your users exclusively through SCIM rather than Just-In-Time (JIT) provisioning. This is because when a user is initially provisioned, their fields are updated according to the method of initial provisioning.

To resolve the issue, remove and then re-add the user, ensuring that they are now managed by SCIM.

### What could be the potential reasons for encountering errors when utilizing a Harness-created user group Single Sign-On (SSO) link, particularly when the identical group is pushed from SCIM?

This is expected behavior because the user group is linked to an SSO group through group authorization, making it unmanageable via SCIM.

### How can I update SAML-connected groups with a new name via API?

Set `samlSettings` to `null` in the API call to update SAML-connected groups with new names.

### Can I use multiple SAML and SCIM apps with Harness?

:::note
Currently, this feature is behind the feature flag `PL_ENABLE_MULTIPLE_IDP_SUPPORT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

Harness supports multiple identity providers (IdPs) for user authentication using SAML. You can configure a mix of various SAML providers and enable or disable them for user authentication. For more information, go to [Multiple identity providers](/docs/platform/authentication/multiple-identity-providers/).

### Why is Harness redirecting to a stage/dev account upon a successful Azure SAML login for a prod account?

Ensure that the entity ID is set correctly if you are using multiple accounts. If you are using a vanity URL, the entity ID needs to be set accordingly when setting up SAML in Harness and on the Azure side.

### Where is the attribute for Group Claim in Microsoft Entra ID?

For SAMl with Microsoft Entra ID (formerly Azure), under **Enterprise Applications**, select **SSO Settings**, then select **Edit User and Group properties**. Edit the **Group Claim** and validate that the attribute is set to Group ID. If it is set to any other attribute, you must provide that value when linking the Harness user group with the Microsoft Entra ID group using the authorization.

### When creating multiple Harness apps in Microsoft Entra ID, why can't I use the app.harness.io entity ID?

The entity is unique for each application. You can use any entity ID and add it in the Harness UI when setting up SSO.

### When we have a user group established through SCIM and others connected via SSO within the same IDP, how do both methods populate the users?

When a user group is created through SCIM, it synchronizes and directly creates the user groups and users within the IDP as they exist. However, for SSO-linked user groups, users are populated only when they sign in to Harness using SAML.

### We removed users from a user group in our SSO app, why are they still in the Harness UI?

The synchronization with SSO-linked groups occurs exclusively upon user login to Harness. Whether it involves adding or removing users, these updates only take place during a login operation.

### Which cron expression builder builder does Harness use for the LDAP sync schedule?

Harness uses Quartz for the cron expression builder in the LDAP sync schedule.

###  Does the HTTP step support EdgeGrid authentication?

You can pass the Client token, Access token, and Nonce as the header for the HTTP step for EdgeGrid authorization.

### Why am I receiving a 400 status code error with an "unsuccessful HTTP call" message when using a Jira step in Harness?

The following 400 Invalid format error typically occurs when using a Jira step in Harness:

```
"Unsuccessful HTTP call: status code = 400, \
message = {"errorMessages": [,"errors": {"customfield_54321":"Invalid format. \
 Expected an array of objects with either an Option ID or an existing value."}]}"
```

Often, this is related to the configuration of a custom field. In this case, the custom field `customfield_54321` is an array field, and the provided value didn't match the expected format. It can also indicate that the Jira plugin in your Jira step isn't compatible with Harness because Harness doesn't provide the data in the required format for the plugin.

The error arises because the value that gets passed to Jira doesn't match the expected format. Jira expects the value to be in the format of an array of objects, and in the following example it has a string as its value:

```json
"customfield_54321": [
    {
        "id": "12345",
        "value": "Test Operations"
    }
]
```

The error message indicates that Harness doesn't support this specific Jira plugin, leading to the formatting issue.

If you encounter a similar problem with this Jira plugin or any other plugin, it is recommended to reach out to your Jira support team to explore potential solutions. They can provide the necessary guidance and support to ensure the smooth and efficient operation of your Jira instance.

### How does SCIM work in Harness, and what are its limitations?

SCIM in Harness is primarily used for user provisioning and de-provisioning. It simplifies user management but has limitations. SCIM does not handle role bindings or permissions directly. Admins must manage role bindings and permissions within Harness separately, even when using SCIM for user provisioning.

### Why won't my user group SSO providers sync?

When you've connected your user group in the Harness UI with a Single Sign-On (SSO) provider like Okta, Microsoft Azure, and so on, you might encounter an issue where a user, present in the designated user group is unable to sign in.

The initial step is to verify if the synchronization process is functioning properly. The validation of group membership doesn't occur during the login process itself, as SSO login operates differently from group authorization.

Verify that the entity ID is correct and matches across both your SSO application and the Harness UI. Additionally, verify that the group attribute being utilized is correctly configured to ensure integration between the SSO provider and Harness UI.

### What happens if a user's email domain changes and the user is provisioned via SCIM in Harness?

Harness will automatically detect the change and update the email address in Harness using the SCIM app. You won't need to manually update the user's email address.

### How do I sync LDAP groups manually if the linked user group isn't syncing?

You can Navigate to the **Authentication** tab, go to the LDAP setting, and try the **Synchronize User Group** option.

### I'm trying to link a SSO group. Why don't I see the option for my user group?

Confirm that group authorization is enabled for the configured SAML setup.

### Why does my demo account receive a "SSO not enabled" message when attempting to sign in via SSO?

To verify whether your account has SSO enabled, do the following:

1. Sign in to `https://app.harness.io/auth/#/signin` with your username and password.
   If you have forgotten your password, use the reset password option. After you log in, you can access your demo account.
2. Use the switch option. For more information, go to [Switch account](/docs/platform/authentication/switch-account/). Harness will prompt you for for SSO.
3. Set the account as the default. The next time you sign in, you can use the SSO option.

### How do I capture SAML Tracer information?

You can install the SAML Tracer extension in your browser.

With the SAML-tracer extension running, do the following:

1. On the login page, select "X Clear" in the SAML tracer (top left) and then try to sign in.
2. When the login session is captured, select Export and then attach this export to the ticket.

### I have multiple Harness instances and use the Azure SAML app. Why is SAML redirecting to a different Harness instance instead of the one I intended?

If you have multiple Harness instances and use the Azure SAML app, it is possible that the SAML app may redirect to a different Harness instance than the one you intended.

To prevent this, make sure to specify the Entity ID below the Authorization when creating the SAML app integration in the Harness UI. This is especially important if you have both sandbox and production Harness instances.

### How does JIT provisioning work for SAML SSO users?

Harness supports Just-in-Time (JIT) provisioning, automatically provisioning new users when they sign in with their SAML SSO credentials for the first time. To use JIT provisioning, ensure the feature flag `PL_ENABLE_JIT_USER_PROVISION` is enabled for the account. For more information, go to [Just-in-time user provisioning](https://developer.harness.io/docs/platform/role-based-access-control/provision-use-jit/).

### Do user permissions in Harness with JIT provisioning and SAML authentication inherit from the SAML provider, or do they require separate configuration in the Harness Account?

No, user permissions in Harness with JIT provisioning and SAML authentication do not inherit from the SAML provider. Permissions need to be explicitly configured in the Harness Account. The JIT provisioning process ensures that users are dynamically created in Harness based on SAML authentication, but their permissions within Harness need to be set up independently.

### Does Harness support permission mapping or inheritance from external systems in any Single Sign-On (SSO) model?

No, Harness does not support permission mapping or inheritance from external systems, including in various Single Sign-On (SSO) models. User permissions must be explicitly configured within the Harness Account, and as of now, there is no support for permission discovery or synchronization from external systems. All permissions need to be manually configured within the Harness Account.

### When I switch my Harness account, I get a login prompt, captcha, and the message "too many invalid login attempts, account blocked" despite having no invalid login attempts. Why does this happen?

This issue may arise due to several reasons:

- Authentication Requirement: If you are not a part of the Harness Support group, you may need to re-authenticate while switching accounts. This is a standard security measure.
- Resetting Password: It is possible that when you attempt to reset your password, it only affects the login attempt value in one cluster and not the other one. This discrepancy in the reset process can lead to login issues.

Ensure you are properly authenticated when switching accounts.

### Why can't users log in the first time  after adding Just in time (JIT) user provisioning?

The issue occurs after a user is set up via JIT the first time and tries to sign in via the Harness URL (`app.harness.io`) directly.

First, the user needs to go to the SAML SSO app and select the Harness icon tile. This provisions the user in the Harness UI.

For more information, go to [Just-in-time user provisioning](/docs/platform/role-based-access-control/provision-use-jit/).

### Why does a user lose access to user groups when they sign in to Harness using SAML?

This situation can occur with SAML-based linked user groups because the SAML-based user group synchronization always occurs when the user logs in. Therefore, if there were any changes made from the SAML SSO Group Claims or if the group was removed from the app, the synchronization will take place at the next login.

### If a user is blocked because entry wasn't cleared for their prod2 account from gateway, how can the user log in?

The user can directly log in using the `https://app.harness.io/ng/account/AccountId/main-dashboard` deep link.

### I'm a user with multiple accounts. Why can't I access some of my accounts?

Sometimes, this might happen due to an edge case. You can try to get to your account (not the default account) by using the deep link.

`https://app.harness.io/ng/account/**accountidhere**/main-dashboard`

### What is linkedSsId in SSO groups?

`linkedSsoId` is the UUID of SSO setting creating in Harness.

### What is the Harness hosted GitOps IP address?

Access to Kubernetes clusters that are behind strict firewalls and not reachable from the public internet is restricted to authorized IP addresses only. To enable access to these clusters, Harness provides a list of IP addresses that must be configured on the clusters. For more information, go to [GitOps allowlist](https://developer.harness.io/docs/continuous-delivery/gitops/gitops-ref/gitops-allowlist/).

### Can I update an email address in a user account?

If users are provisioned via SCIM, then you can update the email in the SSO provider, and it will be updated in Harness.

If the users were added manually, you must remove them and add the new emails.

### I have SSO enabled on my account. Why can't I log in?

It's common for users to encounter an issue while logging in. A user might have signed up for a personal account, or the user's default account might not have SSO enabled. In cases like this, the user can still log in using their username and password. If they have forgotten their password, they can use the **Forgot Password?** option and then try to log in again.

### Does Harness support workload identity federation for authentication?

Harness supports workload identify for Google Secret Manager.

### How do I set up 2FA in Harness?

You can use the QR code sent in the email to setup 2FA. You will also receive a secret key for your user in the same email. Use the code to set up the 2fa or use a third-party [token generator](https://totp.danhersam.com/) to enter your 2FA secret key and have it generates a login code for you. For more information, go to [Set up two-factor authentication](/docs/platform/authentication/two-factor-authentication/#set-up-two-factor-authentication).

### Why can't I set up/reset MFA?

When 2FA is set as force-enabled on the account level by an admin of the account, users must set up the 2FA for their profile.
It can be enabled by scanning the QR code sent in the email or using the secret key also sent in the same email using any authenticator app.

For more information, go to [Set up two-factor authentication](https://developer.harness.io/docs/platform/authentication/two-factor-authentication/#set-up-two-factor-authentication) and [Reset two-factor authentication](https://developer.harness.io/docs/platform/authentication/two-factor-authentication/#reset-two-factor-authentication).

### How can I disable 2FA for a user?

Currently there is no easy way for Harness to disable the 2FA for a user. The user can disable 2FA in their profile if they lost access to the auth app. The user must reach out to their account admin and ask them to resend the 2fa code. Then the user can reset the 2FA auth app, sign in to the account, and disable 2FA from their profile.

### How can I change my identity provider to OKTA from another other provider?

When you set up a new OKTA SAML and then migrate your users to it, you must set additional configurations in Harness. Harness requires the metadata XML file from OKTA with the configuration.

The permissions for Harness are managed by the User Groups present in Harness. In case of authorization, the user groups from SAML app are linked to Harness Local User groups.

For more information, go to [Single Sign-On (SSO) with SAML](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/).

### Which authentication method should we use when setting up a vault connector for delegates hosted on an Azure VM?

For Hashicorp Vault, there are 5 types of Auth supported. Except AWS Auth and Token (not recommended because they need periodic renewal), any of other 3 work, depending on your setup and preference. For more information, go to [Add Hashicorp Vault step 2 overview](/docs/platform/secrets/secrets-management/add-hashicorp-vault#step-2-overview).

### Why does the reset password link keep sending me back to the login page?

The account password authentication might be disabled with another auth enabled, such as Active Directory. Reach out to your Active Directory Administrator to reset it.

### How can I prevent lockouts when using SSO for login?

To prevent lockouts or in the case of OAuth downtime, a user in the Harness Administrators Group can use the [Local Login](https://developer.harness.io/docs/platform/authentication/single-sign-on-sso-with-oauth/#harness-local-login) URL `http://app.harness.io/auth/#/local-login` to log in and update the OAuth settings.

For the Harness production cluster _prod-3_, the local login URL is `https://app3.harness.io/auth/#/local-login`.

### Can I pull from multiple Okta providers for different teams with unique RBAC/group needs?

No, Harness only supports one SSO provider at a time, which you configure at the account scope.

### What is the required permission to add a SMTP configuration? I am getting a "Missing permission core_smtp_edit on smtp" error when I try to add Authentication Settings or Account Settings.

The permission needed for this Account Admin. Currently, only an Account Admin can edit the SMTP configuration.

### Is there functionality to auto-accept invites for username/password login?

No. This option is available for SAML-based logins because authentication is handled by the SAML provider. For username/password logins, you must create a password in Harness.

### I have 2FA enabled. Why can't I log in?

Send a request to your admin to resend the 2FA. You can reset the 2FA in your authenticator app or use `https://totp.danhersam.com/` to enter the secret key and generate the code to log in.

### What are the required permissions for SCIM tokens?

To perform SCIM operation with a token, the Service Account needs to have the mandatory permission in the role. Only the User/User Group permission should be assigned to the service account to perform SCIM operations with the created token.

### How can I disable Local Login in my Harness account?

Contact [Harness Support](mailto:support@harness.io) to enable the feature flag `DISABLE_LOCAL_LOGIN` to disable local login for the account.

### Why don't I have the Launch NextGen button in the FirstGen UI after logging in?

There are permissions for the User group **Hide NextGen Button** under Account Permission in any User Group. Make sure this is toggled to **Off**, or you won't see the **Launch Next Gen** option in the UI.

### What causes user login issues when users are part of multiple accounts?

If you have multiple accounts and one of them uses SAML login while the others use username and password, you need to ensure that the SAML account is set as the default account. Otherwise, the SAML login mechanism won't work as Harness considers the login mechanism of the default account only.

### If there are some users that were manually added to the account, will they be removed once the SCIM integration is configured/enabled for the account?

No, manually added users will not be removed after SCIM integration is added, they continue to be part of account.

### What happens if the same user was manually added first and is part of the SCIM?

If a user is added manually first and then pushed from SCIM, the user will be marked as externally managed. From that point forward, SCIM will be responsible for updating the user's information such as name and email.

### I have set up SAML successfully. Why doesn't the link populate to SSO inside the user group?

You need to enable authorization in your SAML.

### Is SAML single logout URL supported?

Yes it is supported. You can configure this when setting up SAML.

### Is there an expiry for 2FA secrets?

No, there is no expiry for 2FA secrets.

### Is there any way to automatically accept an invite for local login users?

No, it's not possible because initially, the user must use the invite email to set their password. This is only possible when using SAML authentication.

### What causes the "User is not authorized to access the account. Please contact your admin" error when trying to accept the invite and set up a local login password?

The most common reason for this failure is your account has domain allowlisting applied, and the domain used in your username is not in the allowed list. In this case, you can see the `DOMAIN_WHITELIST_FILTER_CHECK_FAILED` on the **Network** tab.

### Why do I receive errors with Okta SCIM provisioning?

Below are the steps you can use to troubleshoot SCIM provisioning with Okta.

Validate the SCIM Connector Base URL. This can be mistaken with the SAMl URL.

`https://app.harness.io/gateway/ng/api/scim/account/<YOUR_ACCOUNT_ID>`

Also, when you create the personal access token, make sure it has the required role bindings (admin).

### Where is the currently set session inactive timeout value located?

You can find this value on the Authentication page (right below the Overview menu on the left). The field will be at the bottom of the page: ```Session Inactivity Timeout (in minutes)```.

### Why is LDAP sync not working for some groups despite working fine for others, and even manual sync isn't helping?

The most probable root cause is that there is a difference in query for this user group/user (like DC), so check and confirm and add the corresponding user query.

## Automation

### How can I use Harness CD with Google Cloud Functions?

Harness CD pipelines help you to orchestrate and automate your Google Cloud Function deployments and push updated functions to Google Cloud.

For more information, go to [Google Cloud Functions](/docs/continuous-delivery/get-started/cd-tutorials/gcp-cloud-func).

### Is a create-namespace option available in Harness when deploying chart?

You can create a Kubernetes YAML file that defines only the namespace you want to use for your application and point to a manifest file containing just the namespace YAML. This means that using a shell script step in your deployment process to apply the namespace YAML file is straightforward.

Even a shell script step would be simple enough in this case, and you can use the kubectl command directly in the shell script to create the namespace.

### What is the Perpetual Task (PT) iterator delay (Max delay from PT created, to PT being assigned if delegate is available)?

The max delay is 60 seconds. Harness runs the PT iterator every 60 seconds for task assignment.

### What is the delegate poll interval for new PT tasks. (Max delay from PT being assigned to delegate picking it up and executing it, say there is only 1 delegate)?

It depends on task to task, you can find the interval for your task in the `perpetualTaskScheduleConfig` in the dms db.

## Connectors

### Can Vault's dynamic AWS credential generation integrate smoothly with Harness's AWS Connector? Can this be done by importing a secret directly from Vault?

No, the Harness AWS Connector does not support direct integration with Vault for on-the-fly AWS credential generation, including for services like AWS ECR. The `aws ecr login` command implies a potential for token generation, but integrating this process directly with the AWS Connector is not feasible. However, Harness does offer a Custom Secret Manager feature, which allows for the development of custom scripts to dynamically retrieve AWS credentials from Vault. This option provides greater flexibility but requires setting up custom logic rather than simply importing a secret's path from Vault.

### What steps can we take to prevent encountering 429 errors when using DockerHub connectors in Harness?

 If you are facing 429 rate limiting errors when attempting to pull Docker images from DockerHub using Harness, you can mitigate this issue by adjusting your authentication settings:

1. **Authentication Method:** By default, Harness utilizes anonymous access to the Harness Docker Hub for image pulls.

2. **Switch to Username and Password Authentication:** To overcome rate limiting issues, select "Username and Password" as your authentication method in your Docker connector configuration.

3. **Provide Login Details:** Once you've selected "Username and Password" authentication, enter your DockerHub login credentials (username and password) in the connector settings.

By configuring Harness to use your DockerHub credentials, you ensure that you have the necessary access privileges to pull images without encountering rate limiting issues.

These adjustments will help you avoid 429 errors and ensure a smoother experience when working with DockerHub connectors in Harness.

### How can I retrieve a specific type of connector across multiple accounts, organizations, and projects using the API?

Unfortunately, it's only possible to retrieve all connectors within a specific scope, the following attribute `includeAllConnectorsAvailableAtScope` allows you to retrieve easily all connectors above the project scope using the API Method `Fetches the list of Connectors corresponding to the request's filter criteria`.

### How do I setup SMTP with AWS SES?

Go to the [AWS documentation on SMTP credentials](https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html) to create SMTP credentials using the SES console. Then, supply those SMTP credentials in your [Harness SMTP connector configuration](/docs/platform/notifications/add-smtp-configuration).

### Create Connector API seems to not work for orgs and failing with the error INVALID_IDENTIFIER_REF while trying to create a vault connector.

Confirm that the token is correct and that you're using the org or account prefix before passing the secret reference.

### Are trial accounts able to use the GitHub connector to attach their GitHub account?

Trial accounts are able to use the same functionality as paid accounts during the trial time period.

### Is there a feature to route info/error diagnostics through the Harness network?

At this time, the feature is not yet available. The delegate sends information and error diagnostic logs directly to the Harness Stackdriver in the Google Cloud. This traffic does not go through the Harness network, but directly to the Google Cloud network. However, if you prefer not to send diagnostic logs, there is an option to disable this feature.

For more information, go to [Delegate logs](/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-logs).

### Will the Cloud Connector propagate the tags to AWS calls?

No, The cloud connector will not propagate the tags to AWS while making calls.

### Where can we view AWS call logs?

Harness has limited logging for AWS calls.

### How do delegate selectors work in connectors?

The delegate selector in a connector always works as AND and not OR. Let's say you have delegate A named "ABC" and delegate B named "BCD".

In the connector selector options, you will need to give only 1 tag, either "ABC" or "BCD". If you need to have multiple delegates, you must add custom tags to the delegate and specify the common one in the selector.

### Why can't I delete a connector referenced by an entity that is no longer present?

You can delete a connector referenced by an entity that is no longer present by enabling the **Force Delete** option in default settings.

## Delegates

### Is there documentation where we can see examples of payloads/data the delegates send to Harness?

There isn't exhaustive documentation available that describes all the types of data that delegates send to the Harness Manager. All data is secured via HTTPS and varies depending on the use case. For Continuous Delivery (CD), examples include variables, context data, logs viewed in the UI, status updates of tasks/steps, and general health checks.

It's important to note that sensitive data, such as secrets, are not directly sent; instead, secret expressions are evaluated at runtime by the delegate to ensure security. To obtain specific examples of delegate payloads, customers can set up a man-in-the-middle (MITM) proxy on a delegate to log the data being transmitted during pipeline executions. This approach allows customers to see the exact data being communicated.

### Does Harness have account-level delegates?

Yes, Harness offers account-level delegates. You can create them by navigating to **Account Settings** > **Account Resources** > **Delegates**.

You can install delegates at the account, org, or project level.

### What is the base image of the Harness Delegate?

Harness Delegate is a Red Hat Enterprise Linux (RHEL)-based image. A Windows-based image is not available. For more information, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types).

### Does the DELEGATE_RESOURCE_THRESHOLD check the memory threshold on the request resource or limit resources of the delegate pod?

The `DELEGATE_RESOURCE_THRESHOLD` environment variable is deprecated. Use `DELEGATE_MEMORY_THRESHOLD` and `DELEGATE_CPU_THRESHOLD` instead. For more information, go to [Configure delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics/).

### Why does the Helm CLI install fail for the minimal delegate?

Helm now recommends using the `get_helm.sh` file to download the Helm binaries, which requires openssl. The minimal delegate doesn't include openssl, so it must be installed before installing Helm.

### Can we install multiple versions of Helm on the delegate?

Yes, you can have multiple versions of Helm on the delegate, but only the Helm CLI to which the environment points at delegate startup can be used in the default step.

### Are there any differences between minimal and non-minimal delegate images besides third-party binaries?

No, from a Harness delegate code perspective, the only difference between minimal and non-minimal delegate images is the bundled third-party binaries.

### Why did step logs disappear?

If step logs disappear from pipelines that are using a Kubernetes cluster build infrastructure, you must either allow outbound communication with `storage.googleapis.com` or contact [Harness Support](mailto:support@harness.io) to enable the `CI_INDIRECT_LOG_UPLOAD` feature flag.

You must restart your delegate after you enable the `CI_INDIRECT_LOG_UPLOAD` feature flag.

For more information about configuring connectivity, go to:

- [Delegate system requirements - Network requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements/#network-requirements)
- [Allowlist Harness Domains and IPs](/docs/platform/references/allowlist-harness-domains-and-ips)

### Does the default Harness Delegate include jq?

Harness keeps the delegate image as minimal as possible so, it does not include `jq` by default. To install `jq` on the delegate, you must add it to the `INIT_SCRIPT` in the delegate manifest. For more information, go to [Add your custom tools](https://developer.harness.io/docs/platform/delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries/#add-your-custom-tools).

### What is the delegate minimal image?

The delegate minimal image serves a crucial role in vulnerability mitigation. By design, it excludes third-party client tools, thereby significantly reducing the potential for Common Vulnerabilities and Exposures (CVEs). This ensures a lean and secure environment, minimizing the attack surface and enhancing overall system integrity.

The delegate image has a minimal tag. For example, `yy.mm.verno.minimal`.

### Why isn't my delegate starting with a "Failed to build trust key store" message?

The default Java truststore uses a default password. If this password is changed, it must be provided to the JVM using JVM args. Otherwise, the JVM will attempt to read the truststore with the default password and fail with the message `Failed to build trust key store`.

### Why am I getting a retry failed message in my delegate logs?

You might get the following error in your delegate logs.

```io.harness.delegate.task.citasks.vm.helper.HttpHelper - Retrying failed to check pool owner.```

The logs are standard and won't impact functionality. Harness conducts capability checks before assigning tasks to delegates to verify their connection to the VM runner. If a delegate fails to connect, it's skipped for that task. You can disregard these logs.

### Does the Docker delegate also show expiry message in UI if the image is older than the expiry threshold?

Yes, Docker delegates also show the expiry status in the UI if the image is beyond the expiry threshold.

### How do I check the logs for commands specified in the INIT_SCRIPT?

During pod initialization, the commands in the `INIT_SCRIPT` are executed. Check the Kubernetes pod log to see all command execution logs.

### Is it possible to configure the delegate to continue running tasks for an additional 1-2 minutes after revoking the delegate?

No. After revoking the token, the delegate will disconnect within 5 minutes. If there are any tasks running, those that can complete within 5 minutes will finish successfully, but tasks taking longer than 5 minutes will fail.

For more information, go to [Revoke tokens](/docs/platform/delegates/secure-delegates/secure-delegates-with-tokens#option-revoke-tokens).

### Why would a Helm delegate fail to start, as indicated by the error message: Pod "xxxxxx" is invalid: spec.containers[0].resources.requests: Invalid value: "1": must be less than or equal to cpu limit?

The error message suggests that the pod for the Helm delegate failed to start due to an invalid CPU resource request, indicating that the CPU request exceeds the limit set for the container.

To resolve the issue:

- Identify the cause: The error indicates an invalid CPU resource request, possibly exceeding the container's CPU limit.
- Check Helm chart modifications: If modifications were made to the Helm chart locally, they might have caused discrepancies in deployed values. Utilize the Helm template to inspect YAML values for debugging.
- Adjust namespace limits: If applicable, ensure that there are no namespace limits conflicting with the Helm delegate installation. If found, consider changing the namespace to resolve the issue.

### How can I check the current customized version of a delegate using APIs, and how does the delegate upgrader access custom images?

Harness an API to get the latest delegate version for an account and one to override the latest for the upgrader. Currently, there isn't an externally exposed API to retrieve custom images. However, the delegate upgrader accesses a specific API to fetch the custom image when needed.

### Can I use an earlier Harness Delegate version?

Yes, but Harness doesn't recommend using delegate images that are not current. However, if you require an earlier image version, check the [repository on Docker Hub](https://hub.docker.com/r/harness/delegate/tags).

### Is the delegate upgrade schedule configurable?

Yes, you can configure the delegate upgrade schedule. For more information, go to [Configure the delegate upgrade schedule](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#configure-the-delegate-upgrade-schedule).

### Does the execution of INIT_SCRIPT commands get logged in delegate logs?

No, `INIT_SCRIPT` commands are run before the delegate process comes up and are not part of the delegate log.

### Can delegates have HA if they're in different locations?

If there are delegates in different locations, they don't have HA. For example, if you have one delegate in a test environment and another in a production environment, the test delegate does not communicate with the production delegate. If a delegate in the production environment stops running, this stops production executions as there is no other delegate in production.

### Can I run the apt-get command on the delegate pod?

No, the delegate is based on the RHEL. You can use the dnf or microdnf-based commands.

### How do I install zip on the delegate?

You can run the following command to install zip on the delegate:

```
microdnf install yum
yum install -y zip
```

### Is the DelegateManagerGrpcClientModule used for delegate connection to the manager over gRPC?

The `DelegateManagerGrpcClientModule` streamlines gRPC communication between the delegate and Harness Manager. Its responsibilities include dispatching task executions and acting as a failsafe for transmitting task responses. For guidance on its optimal utilization, contact Contact [Harness Support](mailto:support@harness.io) to ensure alignment with any supplementary or alternative configurations that might be in effect.

### Where is the Kubernetes configuration (KubeConfig) stored on the delegate if it's being utilized for Terraform (TF) Kubernetes steps?

The Kubernetes configuration (KubeConfig) on the delegate is typically stored at `${HARNESS_KUBE_CONFIG_PATH}`. For more information, go to [Harness Kubernetes expressions](/docs/platform/variables-and-expressions/harness-variables/#kubernetes-deployment-expressions).

However, if you're unable to locate it at the specified path or within the delegate pod, it's important to confirm whether you're using built-in Terraform steps or running the Terraform CLI in a script and what stage type is being employed. For Terraform dynamic provisioning of infrastructure, you must create a Terraform file without the kube_config specification. In this scenario, since the Kubernetes connector is utilized, the delegate autonomously determines the context for Terraform.

### How do I rename a Kubernetes delegate?

To change the name of a Kubernetes delegate, modify the following fields:

```
Secret.metadata.name
Deployment.metadata.labels.harness.io/name
Deployment.metadata.name
Deployment.spec.selector.matchLabels.harness.io/name
Deployment.spec.template.metadata.labels.harness.io/name
Deployment.spec.containers.envFrom.secretRef
Deployment.metadata.spec.template.spec.env.name: DELEGATE_NAME
Service.metadata.selector.harness.io/name
CronJob.metadata.labels.harness.io/name
CronJob.metadata.name
```

The `DELEGATE_NAME` environment variable is specified as a YAML list item:

```yaml
        - name: DELEGATE_NAME
          value: string
```

### How do I rename a Docker delegate?

To change the name of a Docker delegate, set the `DELEGATE_NAME` environment variable to the new name:

```
    - DELEGATE_NAME = newnamedelegate
```

### What are the Harness gRPC limitations?

If you do not enable gRPC connections, the following limitation applies:

Cloud Cost Management (CCM) does not collect events.

gRPC connections are not required for delegate version 23.12.81803 and later.

### Do we run Harness Delegate as root?

Harness Delegates do not require root account access. Kubernetes and Docker delegates do, however, run as root by default. If you do not need to install applications during the initialization process (`INIT_SCRIPT`), you can use a non-root account or install the application without the delegate.


### Is the minimal delegate free of critical vulnerabilities?

Harness aims to minimize critical/high vulnerabilities within this image. Achieving complete mitigation isn't always possible due to the continual discovery of vulnerabilities in third-party libraries/tools without immediate remediation.

### Where can we see validate the Harness minimal delegate vulnerabilities been addressed?

You can go to the [Harness Trust Center](https://trust.harness.io/). Harness publishes advisories for the latest delegate image.

### How do I delete a Kubernetes delegate?

To delete the delegate from your Kubernetes cluster, you delete the Deployment object that represents its deployment.

```
kubectl delete deployment -n harness-delegate-ng <YOUR_DEPLOYMENT_NAME>
```

### What is delegate allowlist verification?

Delegate allowlist verification is currently behind the feature flag `PL_ENFORCE_DELEGATE_REGISTRATION_ALLOWLIST`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

When the feature flag is enabled, delegates with an immutable image type can register if their IP/CIDR address is included in the allowed list received by Harness Manager. Without this feature flag enabled, delegates with an immutable image type can register without allowlist verification. The IP address/CIDR should be that of the delegate or the last proxy between the delegate and Harness Manager in the case of a proxy. Harness Manager verifies registration requests by matching the IP address against an approved list and allows or denies registration accordingly.

### How do I configure the delegate grace period?

Open the delegate manifest file and locate the container `spec` (`spec.containers`). Change the `terminationGracePeriodSeconds` as shown in the following YAML. In the example below, `terminationGracePeriodSeconds` is set to 10 minutes.

```yaml
 spec:
     terminationGracePeriodSeconds: 600
     restartPolicy: Always
     containers:
     - image: example/org:custom-delegate
       imagePullPolicy: Always
       name: delegate
       securityContext:
         allowPrivilegeEscalation: false
         runAsUser: 0
```

### Is mTLS supported between the delegate and connectors in Harness?

No, mTLS isn't supported between the delegate and connectors in Harness. While mTLS is implemented between the delegate and Harness Manager, connectors act as logical entities facilitating connections between Harness Manager and external systems via the delegate. As such, there's no direct connection between connectors and the delegate that requires securing via mTLS.

### When the NextGen delegate updater job terminates a delegate, does it consider whether jobs are running, and what is the associated grace period?

Yes, the NextGen delegate updater job accounts for running jobs before terminating a delegate. A termination grace period of 10 minutes is set. For more information, go to [Graceful delegate shutdown process](/docs/platform/delegates/delegate-concepts/graceful-delegate-shutdown-process/).

Upon updating the delegate image, the updater will spin up a new delegate, wait for it to become healthy, and then terminate the old pod. The old pod will stop accepting new tasks, allowing currently executing tasks to finish within the 10-minute grace period before force termination.

### How are inactive delegates managed in Harness NextGen, and what is the behavior of Kubernetes deployments when a node is shut down and restarted?

In Harness NextGen, inactive delegates are automatically removed from the UI either immediately (if gracefully shut down) or within 6 hours (if not). Kubernetes deployments running on a shutdown node will spin up on another available node upon restart, following Kubernetes deployment controller behavior. When the node restarts, Kubernetes will start the pod, which will register and then reappear in the UI.

It's important to note that during the period of node shutdown, the delegate will not be visible in the UI. Delegates that are entirely deleted from a node will also disappear from the UI within 6 hours, and this timing cannot be changed.

### Can priorityClassName be set on delegate pods using the delegate Helm chart field to assign appropriate priorities?

Currently, you can't set the `priorityClassName` on delegate pods using the delegate **Helm Chart** field.

### Why might a customer experience issues with their delegate unable to find the Helm utility, which resolves after delegate restarts, and could this be related to frequent gRPC Quota exceeded errors?

The issue of the delegate being unable to find the Helm utility could be related to the binary being deleted or a change in the PATH environment variable. It's worth investigating if any steps or pipelines running on the delegate might be causing this. Additionally, the frequent gRPC Quota exceeded errors are likely unrelated and do not result in any loss of functionality.

### Is there a way to disable auto-upgrade for legacy delegates in Harness?

No, you can't disable auto-upgrade for legacy delegates. However, Harness recommends that you use delegates with an immutable image type, which has the auto-upgrade off feature. For legacy delegates, in case of incidents or emergencies, you can temporarily use an older delegate version until the underlying issue is resolved, but this is only for a limited time.

For more information on turning off auto-upgrade for Kubernetes immutable image type delegates, go to [Disable automatic upgrade on an installed delegate image](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#disable-automatic-upgrade-for-installed-delegate-image).

### How does the DELEGATE_TASK_CAPACITY feature flag affect the behavior of CI run steps in Harness?

The `DELEGATE_TASK_CAPACITY` feature flag allows you to configure the maximum number of tasks that can run simultaneously. For instance, if `DELEGATE_TASK_CAPACITY` is set to 2 and there are 6 tasks running in parallel, Harness Manager will execute only 2 tasks at a time. However, if `DELEGATE_TASK_CAPACITY` is not configured, all 6 tasks will run in parallel. Contact [Harness Support](mailto:support@harness.io) to enable the feature flag.

### When do delegates expire, and how does expiration affect their compatibility?

Six months after a delegate image is released, the delegate reaches End of Support (EOS). Eight months after a delegate image is released, the delegate is End of Life (EOL). Delegates expire if not upgraded 6 months after the image is released. If delegates are past their EOS date, Harness does not support them. Expired delegates might not work as intended. For issues with expired delegates, Harness Support will request that you upgrade your delegate(s).

If you do not have automatic upgrade enabled, Harness recommends upgrading the delegate at least once per quarter. You must update the delegate every 8 months.

For more information, go to [Delegate expiration policy](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration#delegate-expiration-policy).

### Can I do additional encoding of the Harness Delegate token?

No, additional encoding is not supported for delegate tokens.

### I can see that a legacy delegate is a statefulset object. What does this mean? What's the major difference from Deployment type?

**StatefulSet:**

- **Purpose:** StatefulSets are designed for stateful applications that require stable network identities and stable storage.
Instances: StatefulSets maintains a sticky identity for each pod. Each pod has a unique and stable hostname, allowing for persistent storage and network identities.

- **Naming:** Pods in a StatefulSet get named predictably and consistently, which is often based on an index.

- **Scaling:** Scaling stateful applications may involve more complex operations due to the need for stable identities. Pods are typically created in sequential order, and scaling may involve specific considerations for data migration or coordination.

**Key Difference:**
The major difference between a Deployment and a StatefulSet lies in how they handle the identity and state of the pods:

- **StatefulSet** provides stable identities: Pods in a StatefulSet have stable and predictable identities, making them suitable for applications that require persistent storage and network identifiers.

- **Deployment** is more suitable for stateless applications: Deployments are well-suited for applications where each instance is interchangeable, and statelessness is a design principle.

### What is exit status 127 in a delegate pod?

In a Kubernetes context, when you see an exit code of 127, it is typically associated with issues related to the execution of container commands within a pod. Here are some common scenarios in a Kubernetes context:

**Command or Binary Not Found:**
- The container might be trying to execute a command or binary that is not installed or not available in the container's filesystem. Ensure that the necessary commands or binaries are included in the container image.

**Incorrect Path or Command Name:**
- If there's a mistake in the path or the name of the command specified in the Kubernetes pod definition, it could result in a 127 exit code. Double-check the command configuration in your pod specification.

**Permissions Issues:**
- Ensure that the container has the necessary permissions to execute the specified command. This includes both file system permissions within the container and the user permissions under which the container is running.

**Image or Container Initialization Failures:**
- If the container fails to start or initialize properly, it might result in a 127 exit code. Check the container logs for any error messages that might indicate initialization issues.
When debugging a pod with an exit code of 127, you can inspect the pod logs to get more details about what went wrong. Use the following command to view the logs for a specific pod:

```
kubectl logs <pod-name>
```

Replace `<pod-name>` with the actual name of your pod. Examining the logs can provide insights into the specific command or process that failed and help you diagnose and resolve the issue.

### How can I receive a notification when the delegate's heartbeat connectivity fails?

Harness doesn't currently support direct notifications for failures in the delegate's heartbeat connectivity. However, you can monitor your delegates using Prometheus metrics.

For more information, go to [Configure delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics).

### How can I extend the time before a delegate is disconnected from the manager when the API token is revoked?

This is not configurable; once the token is revoked, the delegate will get disconnected immediately. However, you can have a delegate in the account running continuously, which can execute all tasks. This way, when you revoke tokens for other delegates for testing, there will be at least one delegate in the account available to run the task.

### Can we use persistent volume as tmpdir for delegates?

Yes, use persistent volume as tmpdir for delegates.

### How can we remove a legacy delegate and use a delegate with an immutable image type?

You can stop the legacy delegate and download new YAML from the Harness UI to install a delegate with an immutable image type. For more information, go to [Delegate installation options](/docs/platform/delegates/install-delegates/overview).

### Is there documentation to install delegates and add GCP connectors?

Yes, for more information, go to:

- [Delegate installation options](https://developer.harness.io/docs/platform/delegates/install-delegates/overview).
- [Connect to GCP](https://developer.harness.io/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp/).

### When will the kubectl version be updated in the default Harness Delegate image?

Harness is in the process of upgrading the Kubectl version. The version upgrade will be completed soon.

### What does DELEGATE_CPU_THRESHOLD do?

 By default, delegate task capacity is based on the number of tasks. Some tasks consume far fewer resources than others. Enabling `DELEGATE_CPU_THRESHOLD` allows the delegate to take tasks based on available resources (CPU) instead. If the delegate is overloaded, it will reject tasks.

 For more information, go to [Configure delegate resource threshold](/docs/platform/delegates/manage-delegates/delegate-metrics/#configure-delegate-resource-threshold).

### How can I fix the delegate out-of-memory error?

The delegate throws an error indicating `java.lang.OutOfMemoryError` or that the delegate has run out of heap space. The container has run out of memory or the delegate has exceeded heap space.

Review the container's memory usage. Harness recommends that you use `Xms` and `Xmx` or `MinRAMPercentage` and `MaxRAMPercentage` JVM arguments to adjust the heap size of the delegate. You can provide these arguments via the `JAVA_OPTS` environment variable when you set up the delegate.

### How can I remove a single disconnected delegate pod?

Delegate pods are automatically removed 7 days after they're disconnected.

### Is there a way users can run all the pipeline steps on one specific delegate pod?

Yes, you can run all the steps on one specific delegate pod. For more information, go to [Run all pipeline steps in one pod](/docs/platform/delegates/manage-delegates/run-all-pipeline-steps-in-one-pod/).

### How do I install a Harness Delegate using Azure ACI?

You can use the following repository as a sample to install it through Terraform. (Terraform Example)[https://gist.github.com/rssnyder/40ebf23bc352a2fbf75005239367abcd].

### How often does Harness upgrade the kubectl binary version within the delegate?

Harness doesn't have a regular upgrade schedule. For more information about delegate binaries, go to [Supported platforms and technologies](/docs/platform/platform-whats-supported).

You can also customize the kubectl binary version using `INIT_SCRIPT`.

### Can we add a Custom Selector in the Harness Delegate chart for legacy delegates?

For legacy delegates, Harness doesn't have a way to specify a delegate selector or delegate tags in the delegate Helm chart. There is an [API to get and update selectors for the delegates](https://developer.harness.io/docs/first-gen/firstgen-platform/techref-category/api/use-delegate-selector-api).

### Why isn't the task_failed_total delegate metric reporting data despite step failure?

The task failed is when something unhandled happens, like a NPE in a task or issue at framework level. A valid failure like shell script exited with error code is not a task failure. Prometheus only shows the metric which are at least once recorded.

### Why do we need core_delegate_delete permission to revoke delegate tokens?

When Harness makes an API call to revoke a delegate token, the delegates who are using it stop registering, thus necessitating the "delete delegate" permission for token revocation.

### Does Harness provide customized Docker delegate images?

Harness doesn't provide custom Docker images for delegates; however, there is a [Docker delegate file](https://github.com/harness/delegate-dockerfile/tree/main) in the public Harness repo. You can use this as a sample reference to add any utility to the image.

### Can we use delegates with an immutable image type in the statefulset deployment YAML for delegates?

You can't use the immutable image type in the statefulset deployment YAML for legacy delegates. The delegates are architecturally different. Delegates with an immutable image type must be used with their own deployment YAML. For more information, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types).

### Can I enable more granular delegate logs?

There are no additional (non-default) log level settings for delegates.

### Can we use custom temp space for delegates?

You can use the environment variable `TMPDIR` on the delegate to add your directory path for temp storage.

```yaml
- name: TMPDIR
  value: /opt/harness-delegate/deployvol/tmp

```

### How is the version of the immutable image type Docker delegate image managed and released to SMP?

The release of the Immutable Delegate version to SMP involves setting the `IMMUTABLE_DELEGATE_DOCKER_IMAGE` version as an environment variable in the manager. When users download the YAML, this version is read from the environment variable, and SaaS utilizes pipelines to update MongoDB entries. During pod startup in SMP, the environment values are populated in the database, facilitating the direct retrieval of the Immutable Delegate version.

### If the DELEGATE_CPU_THRESHOLD is set to zero, does the delegate reject all tasks?

No, if `DELEGATE_CPU_THRESHOLD` is set to zero, it behaves as if the feature is off, and the delegate acquires tasks as normal without rejection.

### How do I inspect my certificates for delegate certificate issues?

The below commands will hep you inspect your certificates.

Inspect a certificate chain - x509 PEM file

```
Keytool -printcert -file /path/to/cert
```

```
openssl x509 -text -noout -in certificate.pem
```

Inspect a truststore file

```
keytool -list -v -keystore /path/to/truststore
```

### How do I run a Harness Docker delegate in detached mode?

Docker provides a `-d` flag option to run containers in detached mode. When you run the Harness Delegate Docker run command, you can add the option to get the console back, and the container will continue to run in detached mode. Here is a sample delegate run command:

```
docker run  --cpus=1 --memory=2g \
  -e DELEGATE_NAME=docker-delegate \
  -e NEXT_GEN="true" \
  -e DELEGATE_TYPE="DOCKER" \
  -e ACCOUNT_ID=xxx \
  -e DELEGATE_TOKEN=xxx= \
  -e DELEGATE_TAGS="" \
  -e LOG_STREAMING_SERVICE_URL=https://app.harness.io/log-service/ \
  -e MANAGER_HOST_AND_PORT=https://app.harness.io harness/delegate:23.11.81406 -d
```

### Why isn't the task_failed_total metric for delegate reporting data despite step failure?

The `task_failed_total` metric measures unhandled errors such as a Null Pointer Exception in a task or an issue at the framework level. A valid failure such as shell script exiting with an error code is not a task failure. Prometheus only shows this metric when it records at least one instance.

### Why did my delegate fail to register with handshake exceptions?

When creating a delegate, it might start to register and then fail with a `SSLHandshakeException`.

To resolve the handshake exception, do the following:

Run to the command below to test the certificate chain you used to install Harness Manager.

```
curl -cacerts path/to/ca-certs/file https://<MANAGER_HOST>/api/account/<ACCOUNT_ID>/status
```

Then install the certificate on the delegate.

For more information, go to [Handshake exception](https://developer.harness.io/docs/platform/delegates/troubleshooting/certificate-issues#handshake-exception).

### Why am I experiencing delegate connectivity issues with my proxy IP?

When configuring the delegate proxy, you might specify the Proxy Host IP and not the `PROXY_HOST`.

Harness recommends using the `PROXY_HOST`, not the Proxy Host IP. If your IP changes, your delegate will start to fail, causing issues.

### How can I build an image to debug the delegate?

You can build and push from local to `gcr-play` or any other place you want.

 - Copy the `delegate.jar` from the local machine (change Dockerfile-minimal in Harness core)

   ```
   COPY delegate.jar delegate.jar
   ```

- Build image:

   ```./scripts/bazel/build_bazel_delegate.sh immutable
   cd dockerization/delegate/
   docker build -t us.gcr.io/gcr-play/delegate:<give your tag> -f Dockerfile-minimal .
   docker push us.gcr.io/gcr-play/delegate:<your-tag>
   ```

If you want to publish this in Docker Hub, then in place of gcr, use your private Docker Hub, do a Docker login before pushing the image.
There is also a GitHub PR trigger to publish an immutable image type delegate from your changes: `trigger publish-delegate`.

### Why is kinit (from the krb5-workstation package) not included in our immutable image for non-root users, leading customers to bake it in themselves?

The decision to exclude kinit from our immutable image is primarily driven by concerns related to image bloat. Harness includes required SDKs and other essential binaries in the delegate to address the specific use cases of our Continuous Delivery (CD) customers. By excluding non-essential binaries, Harness aims to optimize image size and streamline the image for CD workflows.

For more information, go to [Delegate required SDKs](/docs/platform/delegates/delegate-reference/delegate-required-sdks).

### Can customers enable root privileges to add the kinit binary to the image?

Enabling root privileges to add the kinit binary is an option, but it may pose security concerns for some customers. The exclusion of kinit in the immutable image aligns with security considerations and is designed to provide a minimal and secure image for CD use cases. If customers have specific security requirements, they may consider installing the required binaries, such as kinit from the krb5-workstation package, manually, even in an air-gapped environment.

For more information, go to [Enable root user privileges to add custom binaries](https://developer.harness.io/docs/platform/delegates/install-delegates/enable-root-user-privileges-to-add-custom-binaries).

### Are metrics for the Docker delegate published? How can I configure Prometheus scraping?

Yes, metrics for the Docker delegate are published. To enable Prometheus scraping, you must open a port on the container and bind it to the delegate metric port. This allows Prometheus, running separately, to scrape and collect metrics from the Docker delegate. For more information, go to [Configure delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics).

### How do delegates share information like Helm chart contents within the same stage?

The process of sharing information between delegates within the same stage in Harness follows this flow:

1. **Task T1 - Downloading values.yaml File:**
   - Harness Manager creates Task T1, instructing it to download the `values.yaml` file.
   - Delegate1 is assigned Task T1, and it retrieves the `values.yaml` file from the designated source (for example, Git/Remote).
   - Delegate1 then sends the contents of the `values.yaml` file back to Harness Manager.

2. **Task T2 - Downloading and Applying Manifest Files:**
   - After receiving the `values.yaml` file content, Harness Manager creates Task T2.
   - Task T2 includes the content of the `values.yaml` file.
   - Delegate2 is assigned Task T2.

3. **Delegate2's Actions:**
   - Delegate2 executes the following actions:
     - Downloads the manifest files from the specified source (for example, Git, Remote, Helm Artifact Source).
     - Utilizes the content of the `values.yaml` file to render the manifest files, customizing them as needed.
     - Applies the rendered manifest files to the target cluster.

**Important Note:** The output of Task T1 (values Fetch task) is the content of the `values.yaml` file. This content is then passed to Task T2, enabling Delegate2 to use it in rendering and applying the manifest files.

This process ensures that delegates effectively share information and utilize it as required for the deployment process within the same stage.

### How can I share delegates between projects?

You can install the delegate at the org scope if the projects are under same organization. Otherwise, you must install the delegate at the account scope. Delegates installed at the project scope are limited to the same project.

### Is it possible to attach a delegate to a custom IAM role during installation in the EKS cluster?

Yes. For more information, go to [Harness AWS connector settings](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#harness-aws-connector-settings).

### Can you provide information on the tasks that delegates are responsible for and what those tasks entail?

The tasks are internal and vary depending on the pipeline. Harness frequently introduces new task types and retire old ones, so documenting each type isn't practical.

### Do build_source tasks use the delegate task quota?

Build source tasks do use the quota. These are tasks for artifact collections and are only present in CurrentGen and NextGen these tasks are never fired.

### How can I perform a load test on a Kubernetes delegate?

You can implement Autoscale using replicas. For more information, go to [Auto scale using replicas](/docs/platform/delegates/manage-delegates/delegate-metrics/#auto-scale-using-replicas/). Autoscaling is based on load, not on the number of tasks. It doesn't control deployments or run shell scripts that use CPU and memory.

- Based on the metrics you use for HPA (Harness recommends CPU/memory), Kubernetes will scale up/down the pod.
- When the pod is scaled down, it will stop taking new tasks and finish the tasks its executing before terminating.

### Can I set up audit log streaming without using a delegate agent? Are there options to stream logs directly from the cloud platform using IAM roles or other methods?

For the current streaming workflow, the primary option is to use the AWS connector, which requires the use of a Delegate. Unfortunately, audit log streaming is currently only supported via Delegate, and there is no direct option to stream logs from the cloud platform using IAM roles or other methods.

For more information, go to [AWS connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/).

### Will Harness push the Ubuntu immutable image type delegate to Docker Hub?

No, our Dockerfiles are made public on GitHub so that you have the option to modify and build them according to your needs. Harness doesn't push the Ubuntu immutable image type delegate to Docker Hub; instead, you can access and customize the Dockerfiles from our GitHub repository.

### How can we disable version override from a specific delegate?

Version override is not controlled in the Harness UI. If you disable version override, it will apply to the entire account. For more information, go to [Delegate upgrades and expiration](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/).

### Can I configure an alternate location for delegate logs?

It is not possible to configure the delegate logs path. However, you can create a symlink for the `delegate.log` files and store them in a different directory using the `INIT_SCRIPT` environment variable. To do this, simply replace `YOUR_PATH` with the directory where you want to store your log files in the example below.

```yaml
- name: INIT_SCRIPT
          value: "mkdir YOUR_PATH && ln -s YOUR_PATH/newdelegate.log delegate.log"
```

After you create your delegate, you can verify your log file path.

### Why is the Helm binary path not added to the system's PATH by default for delegates with an immutable image type?

There are two versions of the Helm binary installed on the delegate, but neither is set to the system's PATH by default. This behavior is currently specific to the Ubuntu image. However, you can set the PATH as desired using the `INIT_SCRIPT` in the delegate YAML. You can also install custom binaries or create your own delegate image.

### Is there a standard default user access experience across all delegate installation flows (Kubernetes, Docker, Helm, Terraform)?

No, installations vary. Kubernetes delegates default to root with `securityContext`. Docker delegates use a non-root default user (user 1001).

### Can I access a secret manager with a different delegate selector than my connector's delegate selector?

Our priorities are configured as follows: [Step > Step Group > Stage > Pipeline > Connector]. In this scenario, the user can override at the pipeline (or any higher level), but without that override, it will result in a failure.

### How do I upgrade a legacy Docker delegate to use a new image version?

You can get the image tag from `https://hub.docker.com/r/harness/delegate/tags` and provide it in your Docker run command.

### How do I check to see if the delegate is set to auto upgrade?

Go to the Delegates list page and check under the **AUTO UPGRADE** column. For more information, go to [Delegates list page](/docs/platform/delegates/delegate-concepts/delegate-overview#delegates-list-page).

### How do I check which delegate was assigned for a task?

You can select the step under any stage. Under the **Details** tab, you can view the delegate assigned to the task as well the delegate selection task logs. The logs provide more details: delegates that were eligible for selection, where the selector originated, and so on.

### How do I pass xmx and pms value for delegate to use max and min memory allocation pool?

```yaml
env:
    - name: JAVA_OPTS
      value: "-Xms64M -Xmx2G"
```

### Can we manually reset the delegate metrics being scraped by Prometheus?

Manual reset is not supported. However, all metrics reset when the delegate restarts.

### What types of tasks are included in delegate monitoring and reporting?

The task types are internal tasks for various tasks a pipeline generates. For example, a pipeline can generate tasks for secret decryption during the shell script execution and they are internal to Harness. Harness continues to add new task types and remove old ones.

### Do build_source tasks use the delegate task quota?

Build source tasks do use the quota. These are tasks for artifact collections. They are only present in FirstGen. In NextGen, these tasks are never fired.

### How does the system differentiate between delegate name and tag?

A delegate name is a unique identifier for a registered delegate in Harness Manager, while delegate tags are descriptors that are added to the delegate before the registration process. All delegates with the tag are selected when a tag is common for two or more delegates.

### Why aren't new delegates considered during task execution, leading to potential inefficiencies in scaling for matrix/parallel deployments?

Tasks currently poll for delegates at the start, and if initial delegates are unavailable, they won't be redirected to new ones created by scaling policies. The system broadcasts to eligible delegates determined during task processing. However, not repolling for available delegates during task execution may limit true "task-based scaling for Kubernetes delegates." Consideration for dynamically scaling with new delegates during ongoing tasks could enhance efficiency.

### Does Harness have a Grafana dashboard in SMP to monitor delegate tasks?

No, these dashboards are not available in SMP yet.

### Can I set an auto cleanup TTL to remove disconnected delegates from the UI?

The TTL (Time To Live) for legacy delegates is set to 7 days. For delegates with an immutable image type, deletion occurs automatically upon delegate shutdown.

### What is the impact of having one less delegate instance during a task with a long terminationGracePeriodSeconds for reasons other than upgrades?

Having one less delegate instance during a task with a long `terminationGracePeriodSeconds` for reasons other than upgrades can impact the availability of delegate resources. Other tasks may fail to get scheduled because there are not enough delegates available to handle them. This can lead to inefficiencies and delays in task processing. It's crucial to consider the potential impact on the overall system and task scheduling when using extended termination grace periods.

### If we enable proxy in delegate does that mean it is including all communication of "Connectors" - Artifact Servers, Source Repo Providers, Collaboration Providers, and Cloud Providers?

Yes that's correct any outbound connection made via delegate through Harness will use that proxy.

### What are the delegate size guidelines?

For more information, go to [Delegate sizes](/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-sizes) and [Delegate requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements/).

### Can we point auto update to our Helm chart. Can we point auto update to a different registry?

You can set auto upgrade to true in the Helm command and control the upgrade and the repository. For more information, go to [Use automatic upgrade with custom delegate images](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#use-automatic-upgrade-with-custom-delegate-images).

### Why isn't dnf or yum working with my delegate?

You can try using microdnf. The delegate is a RHEL-based image. Harness Delegates don't include dnf or apt by default.

### Can we create a delegate token with the name using which it was previously created and then deleted?

No it is not possible as same name is not possible within 30 days once it is revoked. There is a ttl for 30 days for deletion after revoke of token.

### How can I automatically start a delegate when running as a Docker container?

Docker provides restart policies to control whether your containers start automatically when they exit, or when Docker restarts. Restart policies start linked containers in the correct order. Docker recommends that you use restart policies, and avoid using process managers to start containers.

Including the flag `--restart` in the docker run command will configure it to always restart, unless the container is explicitly stopped, or the daemon restarts.

If restart policies don't suit your needs, such as when processes outside Docker depend on Docker containers, you can use a process manager such as upstart, systemd, or supervisor instead.

To use a process manager, configure it to start your container or service using the same docker start or docker service command you would normally use to start the container manually. Consult the documentation for the specific process manager for more details.

**Warning:** Don't combine Docker restart policies with host-level process managers, as this creates conflicts.

For more information, go to [Start containers automatically](https://docs.docker.com/config/containers/start-containers-automatically/) in the Docker documentation.

### Why wasn't a perpetual task assigned to my delegate?

Generally, when a perpetual task wasn't assigned to any delegates, probably you have a conflicting delegate selector. When you use connectors like secret manager, git connector along with a delegate selector in the step, mind that the manager can combine selectors from those connectors and step in order to select the most appropriate delegate selector. Review your configurations in order to make sure the selectors are matching.

### Is there a difference between NextGen delegates and FirstGen delegates?

Harness has many architectural changes between our legacy delegate, which was deployed as a StatefulSet, in comparison to the new-generation delegates, also known as immutable delegates, which are deployed as Deployment-type resources.

Legacy delegates used to have both a watcher and a delegate process; however, immutable delegates only have one delegate process. The base OS has also changed. It was Ubuntu for legacy delegate images, but now it is RHEL for immutable delegate images.

Immutable delegates work with the first generation as well. If you have an immutable delegate installation in your first generation, you can reuse it with your next-generation instance. You will need to regenerate the token in the next generation and enable the "next gen" attribute of the delegate to true.

However, if you have legacy delegates in your first generation, you will require new delegate installations.

### How do I support Docker in Docker for Harness Delegates?

To support Docker in Docker for Harness Delegates, follow these steps:

Check Kubernetes Cloud Provider Compatibility: Ensure that your Kubernetes Cloud Provider supports this configuration. For instance, note that Amazon EKS has ended support for Dockershim, which might affect this approach.

**Set up Delegate Image:**

- Utilize the INIT_SCRIPT variable or build a custom delegate image.
- Install necessary packages in the image. Here's an example of installations:

```
microdnf install yum
yum install -y yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

**Update delegate YAML:**

- Add volume mounts to enable Docker functionality within the delegate container.

```yaml
volumes:
  - name: docker-sock
    hostPath:
      path: '/var/run/docker.sock'
  - name: docker-directory
    hostPath:
      path: '/var/lib/docker'
```

**Configure volume mounts in the YAML file:**

```yaml
volumeMounts:
  - mountPath: /var/run/docker.sock
    name: docker-sock
    readOnly: false
  - mountPath: '/var/lib/docker'
    name: docker-directory
    readOnly: false
```

By following these steps, your delegate container should be able to execute Docker commands successfully by utilizing the `docker.sock` from your node hosts. This setup allows for Docker in Docker functionality within your Harness Delegate container.

### Is it possible to access vault secrets across different regions?

As long as your vault server in a specific region permits access from a delegate in another region, it should function properly. You can even attempt to retrieve secrets directly from this delegate host outside of Harness to resolve any access issues, and it should work with Harness as well. Additionally, you have the option to create separate connectors for each region.

### How can I install a delegate without root permission?

Delegates are installed without root permissions by default. Changes are not required.

### Can I install a Docker delegate with rootless Docker?

Yes, you can install the rootless Docker and then install the Docker delegate.

### Can we have multiple Docker delegates under the same delegate name?

When you have the same name for multiple delegates, they appear under one group and are treated as multiple instances of that specific delegate. Whenever that delegate names get selected, any instance registered under the name can be picked to execute the task.

### Can Docker delegates be auto upgraded?

Delegate auto upgrade occurs through the cron job that gets created when deploying a helm or a Kubernetes delegate. Harness doesn't have a cron job for Docker delegates. You must upgrade Docker delegates manually.

### What is the base OS for delegates with an immutable image type?

Immutable image type delegates are based on the RHEL UBI8 minimal image. Legacy delegate were based on Ubuntu.

### Does Harness have delegate metrics for legacy delegates?

Custom delegate metrics are only available for delegates with immutable image type. There aren't custom metrics for legacy delegates. Custom metrics are available for delegates with an immutable image type version 23.05.79311 and later.

### Where do delegates look for third-party client utilities?

The immutable delegates look for the third-party client utilities in the PATH location during startup. Hence any third-party utility that is installed in delegate is expected to be either present in the default PATH location or the path to the binary added in the environment variable PATH.

### How can I find out which user is running the delegate?

You can exec into the pod and run the command below to find out which user is currently owning the delegate process:

```
ps -ef | grep delegate
```

### How do I check the custom metrics currently being published by delegate?

Delegates have a metrics API endpoint you can access on the delegate host to check for available metrics. Below is the sample cURL:

```
curl localhost:30109/api/metrics
```

### What is the health API endpoint for the delegates with an immutable image type?

Immutable image type delegates have a health API endpoint for delegate health-related information. Below is the sample cURL:

```
curl localhost:30109/api/health
```

### How do I pass JVM arguments for watcher process?

Watcher process for delegates uses JVM options from the environment variable `WATCHER_JAVA_OPTS`. Any custom JVM argument that you want to pass to watcher process can be configured in the `WATCHER_JAVA_OPTS` variable in the init script.

### How do I pass JVM arguments for delegates process?

The delegate process picks JVM options from `JVM_OPTS` environment variable. To pass any custom JVM arguments for the delegate process, you can configure it in the `JVM_OPTS` environment variable. One example is below:

```yaml
env:
  - name: JAVA_OPTS
    value: "-Xms2G"

```

### Does the delegate process write GC logs by default?

The delegate JVM process is not configured to write GC logs by default. If you need to configure gc logs, you must pass the JVM arguments. Below is a sample argument you can modify for GC logs.

```
JAVA_OPTS='-Xlog:gc*=debug:file=/var/jvm/gc.log'
```

### Can a delegate be connected to FirstGen and NextGen at the same time?

No, a delegate can only be connected to one manager instance. Hence the same delegate cannot be connected to both the FirstGen and NextGen instance of the same account.

### Do proxy settings apply to both HTTP delegate commands and raw socket connects during capability checks?

Proxy settings typically work for HTTP delegate commands, enabling you to route HTTP traffic through a proxy server. However, in the case of capability checks, such as raw socket connects, proxy settings might not apply.
`CDS_USE_HTTP_CHECK_IGNORE_RESPONSE_INSTEAD_OF_SOCKET_NG` this feature flag should be enabled to solve the issue.

### Are automatic upgrades available for ECS delegates?

No, auto upgrade is not available for Docker delegates.

### What do I do if the production delegate is down because of using legacy delegate and a old watcher version?

- Re-deploy the legacy delegate by pulling the latest image. This ensures that you get most recent watcher.
- Revert the delegate version in the ring to unblock.
- Use an immutable image type delegate.

### How can I resolve the error "not supported by windows" when working in CCM POV?

If this is a mixed-node cluster then the delegate needs to run on Linux nodes. You can use selector in your delegate yaml to make sure that Linux nodes are selected. For more information, go to [Assign pod node](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) in the Kubernetes documentation.

### Can the delegate's StatefulSet be scaled?

Yes, you can scale the delegate StatefulSet. For more information, go to [Autoscale using replicas](/docs/platform/delegates/manage-delegates/delegate-metrics/#auto-scale-using-replicas).

### Why is the delegate image based on UBI instead of Ubuntu?

1. Security: UBI is considered a more secure option compared to Ubuntu in today's landscape. It benefits from Red Hat's rigorous security practices and is designed to be more resilient against vulnerabilities.
2. Compatibility: When you are running workloads on OpenShift, using UBI-based images is often the preferred choice. In some scenarios, Red Hat may even mandate the use of UBI-based images. This ensures compatibility and support within the OpenShift environment.
3. Customer Demand: Harness has received numerous requests from our customers to provide UBI-based images due to their security and compatibility advantages. In response to these requests, Harness published UBI-based legacy delegate images.
4. Consistency: Harness is not only transitioning our delegate to UBI but also all of our SaaS offerings. This provides a consistent and unified environment across our services.
   While UBI is the preferred choice, a Dockerfile is available to build an Ubuntu-based delegate image if you have specific requirements.

### How can I install Terraform on the delegate?

1. microdnf install yum
2. yum install unzip
3. curl -O -L https://releases.hashicorp.com/terraform/1.6.1/terraform_1.6.1_linux_amd64.zip
4. unzip terraform_1.6.1_linux_amd64.zip
5. mv ./terraform /usr/bin/
6. terraform --version

### How can I install the AWS CLI on the delegate?

1. curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

2. microdnf install yum

3. yum install unzip

4. unzip awscliv2.zip

5. ./aws/install

### Which Prometheus metrics are exposed on the delegate?

For a list of Prometheus metrics exposed on the Harness Delegate, go to [Delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics/).

### Why didn't the Harness Delegate trigger a notification via Prometheus after it went down?

When the Harness Delegate pod goes down, its exposed metrics endpoint also goes down. These metrics can be helpful in notifying you of lost connectivity between Harness Manager and the delegate pod. However, it should be noted that your Prometheus server can also notify you of the same issue.

### What API can I use to check the delegate connectivity status?

You can use the [list delegates API](https://apidocs.harness.io/tag/Delegate-Setup-Resource#operation/listDelegates).

### What should I do if Legacy delegates aren't starting up and creating a .hprof file in the container?

For the statefulset, updating the environment variable `WATCHER_JAVA_OPTS` with `-Xmx512m` might help.

### How do I deploy a delegate in Amazon ECS for Harness NextGen?

The Harness Delegate is a software that gets installed in your environment which connects to Harness Manager and performs Continuous Delivery/Continuous Integration tasks.

In Harness NextGen, ECS the delegate can be deployed as a Docker delegate both for ECS and ECS Fargate. This [tutorial](https://discuss.harness.io/t/how-to-deploy-delegate-in-amazon-ecs-for-harness-ng/13056) shows you how to install the Harness Delegate in an ECS cluster as an ECS service to enable the delegate to connect to your AWS resources.

### How can we forcibly disconnect a delegate and delete it as an admin?

As Harness Delegates are managed by customers in their own infrastructure, Harness can't control the delegates on your infrastructure. You will need to stop the delegate service in your infrastructure.

In Harness's architecture, the delegates in your infrastructure connect to Harness Manager. For more information, go to [Harness Platform components](/docs/platform/get-started/key-concepts).

Another way to remove a delegate is to revoke its token, which will disconnect and auto-delete it in 7 days.

### How do I make config changes to increase memory consumption in the delegate YAML?

You must make config changes in your delegate YAML to increase memory consumption. This can be done by setting the value in `JAVA_OPTS` to increase the `Xmx` value.

### What steps should I take to ensure that my current configuration is retained during the delegate installation process?

Harness recommends that you keep your existing Java KeyStore in place during the installation process. Updating the KeyStore may cause issues with your delegate. For more information, go to [Install delegates with custom certs](/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/).

### Is it possible to generate delegate tokens via API calls and use them in a personalized way?

Yes there is way to create delegate tokens via API calls. For more information, go to [Create delegate token](https://apidocs.harness.io/tag/Delegate-Token-Resource#operation/createDelegateToken) in the API documentation.

### Can we use alphanumeric characters in delegate names?

Yes, you can use alphanumeric characters, but the name can't start or end with a number.

### Can we use expressions in delegate tags in NextGen like we used custom selectors for FirstGen delegates?

Yes, expressions in delegate selections are supported. You can pass expressions during delegate selection in a pipeline. This will be resolved to the value of that variable. If that value is present as a tag in a delegate, then that delegate will be selected.

### How can I resolve an Error [IOException: Unexpected response code for CONNECT: 403] when enabling mTLS?

When mTLS has been enabled for your delegates, you might get 403 errors. This could be due to the proxy not resolving the Harness `app.harness.io` domain from the delegate.

### How do I revoke delegate tokens?

When a token is revoked, it is done on the server-side. The server has a 20-minute cache, after which the delegate will be disconnected. The token is used in the heartbeat and is loaded during the delegate startup process. If the token needs to be changed on the delegate-side, the delegate process will need to be restarted.

For more information, go to [Revoke tokens](/docs/platform/delegates/secure-delegates/secure-delegates-with-tokens/#option-revoke-tokens).

### What is difference between terminationGracePeriodSeconds and preStopHook?

- `TerminationGracePeriodSeconds`: This is used to allow the main process (delegate) to delay the shutdown so that this process can perform some cleanup. The key here is that container shutdown is delayed by **up to** the specified duration. This works by delegate specifically handling SIGTERM kill signal.

- `preStopHook`: This is used to allow any other kind of cleanup outside of the main process (to save files, make database backup, and so on). This hook runs **parallel** to the `terminationGracePeriodSeconds` not before, but before delegate process shutdown is triggered (before delegate process receives SIGTERM). So if the grace period expires, the hook is killed as well.

### How do I know when my delegate is connected to Harness?

The delegate initiates communication on its startup to the Harness Platform. There is also a heartbeat connection every 60 seconds from the delegate to the delegate Harness to notify that it is running.

For more information, go to [Delegates list page](/docs/platform/delegates/secure-delegates/secure-delegates-with-tokens/#option-revoke-tokens).

### What is the six-letter account identifier that Harness uses it creates the delegate?

This identifier is required for Harness to link old and new pod life cycles properly. Without it, they will be treated differently as pod names and IPs change.

### How does Harness prevent tampering of artifacts and instructions? Is TLS used? What is the integrity checking approach to ensure instructions are not altered in-flight?

Protection details are below for artifact sources related to SSH/WinRm in NextGen:

#### Artifactory

To download artifacts from Artifactory to the delegate, Harness uses `org.jfrog.artifactory.client:artifactory-java-client-api:jar:2.9.1`.

This is the [Maven repo](https://mvnrepository.com/artifact/org.jfrog.artifactory.client/artifactory-java-client-services/2.9.1). There are reported vulnerabilities for this lib version. We are working to update the above lib to the version without vulnerabilities. If the Artifactory URL is HTTPS, the calls are secure with TLS.

#### AWS S3

To download artifacts from AWS S3 to the delegate, Harness uses `com.amazonaws:aws-java-sdk-s3:1.12.261`.

This is the [Maven repo](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-s3/1.12.261). There are no reported vulnerabilities. This lib is secure. The AWS SDK makes HTTP calls in a secure way using TLS.

#### Azure

To download artifacts from Azure to the delegate, Harness uses `okhttp-4.9.2.jar`. This is the [Maven repo](https://mvnrepository.com/artifact/com.squareup.okhttp3/okhttp/4.9.2). There are reported vulnerabilities for this lib version. We are working to update the above lib to the version without vulnerabilities. This update is a significant process, which might take several weeks.

#### Jenkins

To download artifacts from Jenkins to the delegate, Harness uses `com.offbytwo.jenkins:jenkins-client:0.3.9`. There are no known vulnerabilities.

#### Nexus

To download artifacts from Nexus to the delegate, Harness uses `javax.net.ssl.HttpsURLConnection` from the Java SDK. When downloading artifacts, Harness uses SSL, which is secure.

Artifacts are downloaded on the delegate, and it is safe if the network where the delegates are running is secure.

The chosen cipher suites depend on the remote server. During the SSL handshake, the "server hello" message contains the cipher suite chosen by the server from the list provided on the client-side.

### How do I check for the listen ports on the delegate if netstat is not installed?

You can run the command `lsof -nP -iTCP -sTCP:LISTEN`, install netstat, or bake it into the delegate image.

### At what port are the delegate Prometheus metrics exposed?

The delegate Prometheus metrics are exposed on port 3460 in the running delegate container.

### How do I scale delegate replicas?

You can update autoscaling parameters in your `values.yaml` file.

```yaml
autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
```

For more information, go to [Autoscale using replicas](/docs/platform/delegates/manage-delegates/delegate-metrics/#auto-scale-using-replicas/).

### The Harness Delegate config-watcher is causing heavy usage of disk space and causing alerts in prod nodes. How can we increase the watcher memory settings?

You can overwrite the watcher memory setting via `WATCHER_JAVA_OPTS`. If you want to increase the memory for watcher, you can add the following in the delegate YAML env section.

```yaml
- name: WATCHER_JAVA_OPTS
    value: "-Xmx512M"
```

### Can scope creation happen during delegate installation?

Delegate scope is decided by the scope of delegate token. For more information, go to [Delegate scope](/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-scope).

### Is it possible to increase the client side timeout when getting pods for a Kubernetes delegate?

Yes, you can increase the step timeout.

### How do I use a custom Helm3 version in the FirstGen legacy delegate?

You can install the latest version and set the env variable to the binary path `HELM3_PATH=/opt/harness-delegate/client-tools/helm`.

### Can I use the delegate image from my immutable image type delegate and replace it in the YAML for the statefulset from the legacy delegate?

This is not supported. Delegates with an immutable image type should be run with delegate YAML generated from the UI, which will generate a deployment if the delegate is enabled for the account. For more information, go to [Is immutable delegate enabled](https://apidocs.harness.io/tag/Accounts#operation/isImmutableDelegateEnabled) in the API documentation.

Here is an [example manifest file for NextGen](/docs/platform/delegates/install-delegates/overview/#example-manifest-file).

### Where can I find the delegate Helm chart source?

[Here is the source](https://app.harness.io/storage/harness-download/delegate-helm-chart/) of the Helm chart for the delegate.

### Where can I find delegate release notes?

For information about Harness Delegate features, go to the [Delegate release notes](/release-notes/delegate).

### Why is automatic upgrade turned off for my delegate?

It could be it was disabled through `kubectl patch cronjobs <job-name> -p '{"spec" : {"suspend" : true }}' -n <namespace>`, or the cron job was deleted, or the cron job never existed. Kubernetes audit logs can help you determine if it exists.

### How can I avoid pulling Harness delegate images from a public repo?

You can add a special Harness Container Image Registry connector to your Harness account. With this connector, the delegate pulls these images from the Harness Container Image Registry only.

For more information, go to [Connect to the Harness container image registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/)

### What are delegate rings?

Harness uses the ring methodology, which is a popular approach in software release management for delegate releases. There are four rings, and to mitigate any adverse effects that may arise from new delegate releases, each Harness account is assigned a specific ring that corresponds to the latest delegate version for that account.

### I have automatic upgrade on in my delegate. Why is my delegate version behind what's listed as the latest version in Docker Hub?

Harness uses the ring methodology commonly used in software release management for delegate releases. The version for your account can be overridden to use the latest in Docker Hub using the [override delegate image tag API](https://apidocs.harness.io/tag/Delegate-Setup-Resource#operation/overrideDelegateImageTag).

### How can I update an existing User Group in Harness when encountering an error while saving changes?

If you encounter an error when attempting to save changes to an existing User Group in Harness, particularly an error related to the Harness Identifier, it may be due to a restriction on naming Entity identifiers. According to Harness design specifications, certain characters, such as hyphens (-), are not allowed in Entity identifiers.

For more information, go to [Id naming](/docs/platform/references/harness-entity-reference/#id-naming).

### Why is the Harness Delegate instance status showing Expiring in 2 months but the latest version is valid for 3 months?

For the delegates with an immutable image type, the instance status will show Expiring in 2 months only. This is the expected behavior.

### When does Harness recommend setting POLL_FOR_TASKS to true in a non-production environment?

If you face any infrastructure challenges while taking the web socket path, Harness recommends enabling `POLL_FOR_TASKS` as an alternative. With polling enabled, the delegate checks with Harness at intervals set by the user to check for any task to execute, instead of web socket communication which happens immediately.

### Does polling mode only work for legacy delegates and not delegates with an immutable image type?

By default, polling is only supported for legacy delegates and not for delegates with an immutable type. However, polling mode works for immutable delegates if `POLL_FOR_TASK` is set to `true` in the delegate YAML.

### What does Delegate Identifier=DETECTING mean?

`Delegate Identifier=DETECTING` is for auto upgrade, which you can turn on or off. For more information, go to [Determine if automatic upgrade is enabled](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#determine-if-automatic-upgrade-is-enabled).

### My delegate shows that it will expire in 2 months. Will it shut down after it expires?

Harness follows an N-3 support policy for delegates, which means we support the current version and the three preceding versions. With a new version released approximately every two weeks, each update brings enhanced features and general fixes. For instance, if you have version `24.03.XXXXX` installed, all images from `24.01.XXXXX` to `24.03.XXXXX` are supported. Delegate expiration doesn't imply that the delegate ceases to function. However, it may lead to potential issues if the backend advances significantly, causing the delegate to lose backward compatibility. To avoid this, we recommend upgrading the delegate at least once per quarter if you don't have [automatic upgrades](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#how-automatic-upgrade-works-in-the-kubernetes-manifest) enabled.

### How can I autoscale a delegate using HPA?

By default, Helm delegates have autoscaling disabled, which you can enable by setting the value `autoscaling.enabled=true`. For Kubernetes delegates, you need to write an HPA manifest to scale the delegate's replicas.

### What are the Kubernetes version requirements for delegate installations?

Harness tries to support all active Kubernetes releases (that's the last 3 releases according to our versioning policy). Harness supports anything that's not EOL.

### Are secrets in values.yaml files rendered in Harness Manager?

No, these secrets are never rendered in Harness Manager. They are only rendered in the delegate.

### Are customer files stored in Harness Manager during execution while delegate 1 is communicating directly with delegate 2?

Harness doesn't store customer manifest files in Harness Manager. Only `values.yaml` files are passed through Harness Manager.

### How do delegates share information like a Helm chart and its contents on the same stage?

To share information like a Helm chart and its contents among delegates, there are two steps. First, download the `values.yaml` files on any of the delegates (one or more depending upon how many `values.yaml` files have been configured) and pass them to the next step. Then, the delegate downloads the Helm chart and uses the `values.yaml` files that were passed by the previous step. For instance, delegate 1 can execute Fetch Files and pass the values/manifests to delegate 2 that will execute the Helm Install/Apply.

### How do delegates communicate with each other when they are sharing information?

Delegates don't communicate with each other. They go through Harness Manager to retrieve the result of the tasks performed by another delegate.

### Why are delegates added to the blocklist?

The purpose behind the blocklisting of delegates is to ensure that every delegate task undergoes one or more validation/capability checks. When a task is assigned, Harness checks if the delegate's capabilities were previously validated. If the validation was done within the past 6 hours, it is considered valid.

However, if it has been more than 6 hours or if it's the first time, Harness performs the validation again. If the validation fails, the delegate is blocklisted for 5 minutes for the same criteria. If another task with the same criteria is assigned during these 5 minutes, the delegate will be blocklisted for it as well. So, it's important to check which validation criteria were added to the task and which validation is failing.

### What are the differences between delegate tag formats?

- *`yy.mm.xxxxx.minimal`*: This tag represents the minimal image format, which is recommended for production usage. It stands out due to its absence of high or critical vulnerabilities, making it a secure choice. Furthermore, this image format is lighter than the default option because it doesn't have the default binaries installed.
- *`yy.mm.xxxxx`*: This format corresponds to the standard delegate image. It includes all the default binaries and is a suitable choice for users who are relatively new to Harness and do not have stringent security requirements. This image provides a comprehensive set of tools and functionalities for general usage.
- `1.0.8XXXX`: This format denotes an older version of the delegate, often referred to as the legacy delegate. New Harness accounts no longer include this delegate version, and users are strongly encouraged to migrate to the standard delegate for better compatibility, performance, and security.

For more information, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types).

### Is there a way to check which delegates are running at a particular time?

You can review the delegate logs to find the task that it was executing around a given time frame.

### Why am I getting an "IllegalArgumentException: kubectl is not installed for version V1_13. Available versions are: []" error?

You might receive this error if you are using minimal delegate images. Install the kubectl version and check to see if the $PATH is updated correctly.

### Why is the delegate not coming up and returning a no space left error?

When starting delegates, Harness installs some third party binaries(kubectl, Helm, and so on). These binaries require space. Make sure the delegate machine has sufficient disk space remaining.

### Where can we add the env attributes for delegates during Helm chart installation?

Delegate deployment for Helm chart installation is configured to pick the environment variable from ConfigMap. Check the name of the ConfigMap in the chart deployment YAML, the attribute is envFrom and edit the ConfigMap to add the corresponding environment variables.

### How does a delegate identify its scope for registration?

When installing a delegates, Harness doesn't explicitly configure it to connect at the account, organization, or project scope. It is decided based on the scope of the delegate token. If the token is from the project scope, the delegate will register at the project level. This also applies to the organization and account level.

### Will the delegate continue to work if we delete its token?

The delegate registration is only valid until the delegate token with which it has registered is available and not expired/revoked. If the delegate token is deleted, the delegate registration will no longer be valid, and it will fail authorization.

### Can I set the delegate upgrader job to point to a custom private registry?

Yes, the delegate `upgrader` job can be set to point to a custom private registry. For more information, go to [Use automatic upgrade with custom delegate images](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#use-automatic-upgrade-with-custom-delegate-images).

### Can I set SCM_SKIP_SSL while working on Docker delegate?

Yes, you can add `SCM_SKIP_SSL=true` to the `environment` section of the delegate YAML.

For example, here is the `environment` section of a `docker-compose.yml` file with the `SCM_SKIP_SSL` variable:

```yaml
environment:
      - ACCOUNT_ID=XXXX
      - DELEGATE_TOKEN=XXXX
      - MANAGER_HOST_AND_PORT=https://app.harness.io
      - LOG_STREAMING_SERVICE_URL=https://app.harness.io/log-service/
      - DEPLOY_MODE=KUBERNETES
      - DELEGATE_NAME=test
      - NEXT_GEN=true
      - DELEGATE_TYPE=DOCKER
      - SCM_SKIP_SSL=true
```

### Is the io_harness_custom_metric_task_execution_time in seconds or milliseconds?

The time it takes to complete a task (in seconds). For more information, go to [Configure delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics/#configure-delegate-resource-threshold).

### Do all delegate have mTLS support?

Currently, mTLS is only supported for Kubernetes delegates. Harness plans to add support for Helm and Docker delegates in the future. Harness supports both Loose and Strict mode.

### Where can we download the Helm chart for delegates manually instead of using Helm commands?

The delegate Helm chart is available [here](https://github.com/harness/delegate-helm-chart/tree/main/harness-delegate-ng).

### How can I execute a script as a non-root user in a custom delegate?

In the delegate YAML, modify the `runAsUser` field, which is set to 0, indicating that the script runs as the root user.

### How can I list all delegates in my account?

You can use the [list delegate API](https://apidocs.harness.io/tag/Delegate-Setup-Resource/#operation/listDelegates).

### Does Harness support auto-upgrade for Docker delegates?

No, auto-upgrade is not an option for Docker delegates. You can update your Docker delegate image when Harness releases a newer version.

### Does Harness have documentation to install a custom certificate in a Kubernetes delegate?

Yes, you can install custom certificates for Kubernetes delegates. For more information, go to [Install delegates with custom certs](/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/).

### What happens to tasks rejected by the delegate?

Delegates reject tasks when the CPU reaches a certain threshold if the `DELEGATE_CPU_THRESHOLD` env variable is set in the delegate YAML. Rejected tasks can be acquired by other eligible delegates or by the same delegate when its resources drop below the threshold. For more information, go to [Configure delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics/).

### Can we set the delegate to reject new tasks if x% of memory is being consumed?

No, this is not possible at the moment.

### What is the naming convention used when creating a default delegate token?

The default token is named using the convention of the level at which it is being called, for example, `default_token/org/project`.

### Can I delete my delegate token?

The delegate token cannot be deleted, it can be only revoked. Revoked tokens are deleted after 30 days. For more information, go to [Revoke tokens](/docs/platform/delegates/secure-delegates/secure-delegates-with-tokens/#option-revoke-tokens).

### When we add a delegate tag via API, why does the tag disappear when the delegate is restarted?

The delegate tags disappear because they are not in the original delegate YAML that was used to start the delegate.

### When my delegate is restarting, why do I see "Failed to find field for io.kubernetes.client.openapi.models.V1JSONSchemaProps.x-kubernetes-list-map-keys" in logs?

You should create the delegate with the minimum recommended resources to solve this issue. For more information, go to [Delegate sizes](/docs/platform/delegates/delegate-concepts/delegate-overview#delegate-sizes).

### Are delegate tokens stored in MongoDB?

Yes, the delegate tokens are stored in MongoDB.

### What is the Helm delegate chart name?

The Helm chart name is `harness-delegate-ng`. You can access the metadata and the repos below.

- [Harness Helm charts](https://app.harness.io/storage/harness-download/harness-helm-charts/)
- [Delegate Helm chart](https://github.com/harness/delegate-helm-chart)

### Can I verify if delegates were available at a specific time and check their past connectivity?

Yes, you can check delegate logs for this information.

### Is there a notification when delegates enter an expired state in NextGen?

Harness doesn't currently support this feature. However, it is included in our roadmap for future development.

### Is there a dashboard where I can track the current status of my delegate?

Yes, you can set up Prometheus to get the metrics. For more information, go to [Configure delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics).

### Can I query delegate logs in my cloud logging system, or are they only sent to Harness?

By default, delegate logs are only sent to Harness. Logs can be enabled/disabled using the env variable `STACK_DRIVER_LOGGING_ENABLED`. For more information, go to [Delegate environment variables](/docs/platform/delegates/delegate-reference/delegate-environment-variables/#stack_driver_logging_enabled).

### Is auto-upgrade available for ECS delegates?

No, Harness only supports auto upgrade for Kubernetes and Helm delegates.

### When are the old replicas removed after being disconnected for delegates with an immutable image type?

They are cleared out in 6 hours after they're disconnected. For more information, go to [Delete replica pods](/docs/platform/delegates/manage-delegates/delete-a-delegate/#delete-replica-pods).

### Does Harness support auto upgrade for Helm delegates?

Yes, Harness supports auto upgrade for Helm delegates. This can be achieved by following `upgrader.enabled=true` while running the install command.

### Is there a way to exclude a delegate from taking a task?

Delegates cannot be excluded from picking up tasks for other pipelines at this time.

### What is the difference between the delegate YAML account,org, and project?

Harness differentiates the delegate YAML based on the value of `DELEGATE_TOKEN`.

### There are Delegate Profiles for delegates in the FirstGen with a 'Startup Script' in it. What is the equivalent in NextGen?

You can use `INIT_SCRIPT` when launching the delegate. For more information, go to [Install a delegate with third-party tool custom binaries](/docs/platform/delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries/).

### How can I securely store my delegate tokens?

You can store delegate tokens as Kubernetes secrets. For more information, go to [Store delegate tokens as secrets](/docs/platform/delegates/secure-delegates/store-delegate-tokens-as-secrets/).

You can also store the token in vault and reference the token in YAML. For more information, go to [Rotate tokens](/docs/platform/delegates/secure-delegates/secure-delegates-with-tokens/#option-rotate-tokens).

### How do I install the Azure client for the delegate?

Add the below commands in the `INIT_SCRIPT` to download and install the Azure client for the delegate.

```yaml
- name: INIT_SCRIPT
  value: |
    rpm --import https://packages.microsoft.com/keys/microsoft.asc
    rpm -Uvh 'https://packages.microsoft.com/config/rhel/8/packages-microsoft-prod.rpm'
    microdnf install azure-cli
 ```

### How are deployments handled when delegates are scaled down for HPA?

Once the shutdown hook is triggered on the delegate, the delegate won't accept new tasks, and it will wait until the existing tasks finish running or the `terminationGracePeriodSeconds` runs out. For more information, go to [Grace period](/docs/platform/delegates/delegate-concepts/graceful-delegate-shutdown-process#grace-period).

### How do I turn off the logging.googleapi.com URL? Do I need to provide any other commands in the delegate startup?

Delegates send logs to Harness by default. Harness uses these logs for debugging and support. To disable this functionality, you must set the `STACK_DRIVER_LOGGING_ENABLED` env variable to `false`. For more information, go to [Delegate environment variables](/docs/platform/delegates/delegate-reference/delegate-environment-variables/#stack_driver_logging_enabled).

### How can I validate the configuration of Harness Delegates?

Harness Delegates are primarily configured through variables, which can be adjusted during the deployment of a new delegate. There are several ways to ensure the correctness of these configurations:

- **Pre-Deployment Validation:** Before deploying the delegate, you can validate the variables to ensure they meet your requirements.

- **Describe Commands:** Execute `Describe` commands on your cluster where the delegate pod is deployed. These commands provide detailed information about all configured variables for the delegate.

- **Configmaps Inspection:** Delegate configurations can also be stored in configmaps. By checking for delegate-related configmaps in your cluster, you can verify and review the configurations associated with the delegate.

These approaches offer flexibility and reliability in ensuring that Harness delegates are configured correctly to meet your needs.

### Upgrader job is up and running but not identified as Upgrade is Turned ON also upgrade is not working

The name of the upgrader job workload needs to follow the delegate naming convention, so can you check and confirm if you have changed that manually or using the default name as you get while downloading the manifest.

## Dashboards

### Why isn't my project's Overview page showing deployments?

Check the time frame for the page. By default the time frame is set to 30 days. You can adjust this to a different time frame.

### Why isn't the Harness dashboard showing a previous deployment?

Check the time frame for the dashboard page. By default Harness sets this value at 30 days. It is possible that the deployment was executed before this time frame.

### How does the active service count show in License subscription?

Harness shows service usage account for the last 30 days.

## Feature Flags

### If I enable PIE_MULTISELECT_AND_COMMA_IN_ALLOWED_VALUES, can I choose when to allow multiple selections or will it always be enabled by default?

Once the `PIE_MULTISELECT_AND_COMMA_IN_ALLOWED_VALUES` flag is enabled for your account, the feature to allow multiple selections is always active for inputs where allowed values are specified. This means you won't have the flexibility to toggle the multiple selection feature on and off for individual inputs; it will consistently permit multiple inputs for any field where you have defined allowed values, aligning with the extension of the allowed values functionality.

### Is there a way to prevent email notifications when adding users to a group, even with the PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES feature flag enabled?

When the feature flag `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` is activated for an account that utilizes SSO (Single Sign-On) as its authentication mechanism, no email invitations are sent to users upon being onboarded. This applies regardless of whether users are added directly or through a user group, ensuring that email notifications are suppressed under these specific conditions.

### Is the flag DELEGATE_TASK_LOAD_DISTRIBUTION still valid for the fair distribution algorithm for delegates, or do we have to rely solely on delegate task thresholds?

It is enabled for all customers, hence the feature flag `DELEGATE_TASK_LOAD_DISTRIBUTION` is removed. It is set to true for all accounts across all clusters.

### How can I hide Harness built-in roles (Harness managed roles), and is it possible to hide account scope roles?

Enabling the flags (`PL_HIDE_PROJECT_LEVEL_MANAGED_ROLE` and `PL_HIDE_ORGANIZATION_LEVEL_MANAGED_ROLE`) will hide project and org scope roles. However, there is currently no way to hide account-level roles. This decision was not implemented due to the potential restriction that once we enable the feature flags for the account, nobody will be able to see managed roles, including account admin.

### Is it possible to hide Project/Org level default built-in roles?

Yes, this feature is currently behind the feature flags `PL_HIDE_PROJECT_LEVEL_MANAGED_ROLE` and `PL_HIDE_ORGANIZATION_LEVEL_MANAGED_ROLE`. Contact[Harness Support](mailto:support@harness.io) to enable the feature.

### What is Just-in-time (JIT) user provisioning?

Automated provisioning eliminates repetitive tasks related to manual provisioning and simplifies user management.

Just-in-time (JIT) provisioning in Harness lets you provision users automatically when they first sign-in to Harness through SAML SSO. Harness supports JIT provisioning only for new users logging in through an IdP, such as Okta.

JIT is currently behind the feature flag `PL_ENABLE_JIT_USER_PROVISION`.

### Is way to find the enabled and all available feature flags in the UI?

This feature will be available in an upcoming release.

### Is the feature flag PL_ENABLE_MULTIPLE_IDP_SUPPORT available and enabled to use?

Yes it is enabled. For more information, go to [Configure multiple SAML providers](https://developer.harness.io/docs/platform/authentication/multiple-identity-providers/#configure-multiple-saml-providers).

### Can we limit our account/org access only to our users and not to Harness users (even read-only access)?

This feature is currently available in FirstGen. You can use `Restrict users to email domains` feature and only and set your email domain only. You must enable the feature flag `LIMITED_ACCESS_FOR_HARNESS_USER_GROUP`.

### How can we enable the feature flag DELEGATE_TASK_CAPACITY?

For information about this feature flag, go to [Delegate task capacity](/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-task-capacity).

### What is the behavior when the DELEGATE_CPU_THRESHOLD env variable isn't set when CPU usage reaches 100%?

The delegate won't attempt to acquire any new tasks until the resource level increases. Delegates will not crash or shut down during this process.

### I have the PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES feature flag enabled, why am I still getting emails when I add a user in an Org/Project?

The `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` feature flag works for user invites. When a user is added as member to a user group, a separate notification is sent, which is not dependent on this feature flag.

## Git Experience

### Can we customize the SSH configuration when using a Git connector set by SSH?

For Git API-based communications, SSH is not used. Instead, Harness relies exclusively on token-based communication. Specifically for Git tasks, especially on GitX, tokens are utilized as they are executed through APIs. However, for other types of connections, SSH configurations are employed. It's important to note that for any connector, the standard practice involves selecting "API Access" and providing tokens exclusively.

### Can I store a Shell Script Provision in a Git provider?

At the moment, you can only store Shell Script provisions in two ways: either as inline code or within the Harness file store. An option to store them directly in a Git provider like GitHub or Bitbucket is not available.

### How do I identify files changed in a Git push event?

Harness doesn't support this feature natively, but you can write a script similar to the following:

```
# Get commits from the payload
commits='\<+trigger.payload.commits>'

# Extract the values of added, removed, and modified attributes using string manipulation
added=$(echo "$commits" | sed -n 's/.*"added":\s*\(\[[^]]*\]\).*/\1/p')
removed=$(echo "$commits" | sed -n 's/.*"removed":\s*\(\[[^]]*\]\).*/\1/p')
modified=$(echo "$commits" | sed -n 's/.*"modified":\s*\(\[[^]]*\]\).*/\1/p')

# Remove the square brackets and quotes from the extracted values
added=$(echo "$added" | tr -d '[],"')
removed=$(echo "$removed" | tr -d '[],"')
modified=$(echo "$modified" | tr -d '[],"')

# Concatenate the values into an array
array=($added $removed $modified)

# Print the concatenated array
for element in "${array[@]}"; do
    echo "$element"
done
```

### Why is my commitSha resolving as null on manual runs?

The expression `<+trigger.commitSha>` is available when the event comes from a Git operation. Instead, use the expression `<+codebase.commitSha>` to parse manual triggers.

### How do I retrieve the correct author's email on a GitHub Pull Request Event?

When you push commits from the command line, the email address that you have configured in [Git](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address) is associated with your commits. However, for web-based operations, GitHub provides an option to maintain privacy regarding your email address. To ensure that you can fetch the correct user email through the expression `<codebase.gitUserEmail>`, you will need to disable the ["Keep my email addresses private"](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/blocking-command-line-pushes-that-expose-your-personal-email-address) option in your GitHub settings.

### Can the same Github repository be used for different projects with GitX enabled?

Yes, you can add multiple projects to the same repository. GitX is entity-based, not project-based.

### I have environments at the Org/Project/Account levels, can I Git sync them?

No, this isn't currently supported.

## Governance

### Is there an option in NextGen to migrate secrets from one secret manager to another?

Currently, there is no built-in feature within NextGen that allows for the direct migration of secrets from one secret manager to another. This capability would be considered an enhancement request.

### Which resource currently incorporates Audit Trail RBAC?

Audit Trail Role-Based Access Control (RBAC) is included in the resource that allows you to edit the Audit View permission within a role. By default, the Audit view permission is enabled for managed roles such as Account Viewer, Account Admin, Org Viewer, and Org Admin. Suppose you want to disable Audit View for your users. In that case, you must create a role with Audit view permission disabled and all other view permissions enabled and change the role binding of All Organization Users or All Account Users user groups to the new role, thereby denying Audit View Permission for all users. If you want to enable Audit View for a user, you can assign the default Organization Viewer or Account Viewer role to the user or user group based on the scope.

### What is the process for restoring Harness deployment if the infrastructure is lost?

Back up and restore only covers specific Harness components and does not address infrastructure loss. In the event of infrastructure loss, a functioning Kubernetes cluster must be available to restore the Harness namespace.

### What is the process to add another admin user to our Harness account if the user with admin access gets locked out?

In case of emergencies such as SAML/LDAP issues, it is highly recommended to have a local admin user for account access. If a functional account gets locked, Harness can grant admin permissions to an existing account user, but it cannot create a new admin user. Therefore, it is advised to always maintain at least two local admin users. In situations where there is only one admin user and it gets locked, raising an urgent Harness ticket is necessary. This process will involve backend database updates and multiple approvals, which typically takes a couple of hours to grant admin permissions to an existing user.

### Does RBAC apply to Git Bi-Directional Sync in Harness?

 No, RBAC settings specific to Git Bi-Directional Sync are not available. The RBAC of the entity is used, and there are no individual role bindings for fine-grained control over bi-directional sync. As of now, the options for controlling bi-directional sync are limited to enabling or disabling it.

### Why am I getting an "Error Summary Invalid request: At least 1 valid user group is required in Approval"?

The variable being passed for the Approvers > User Groups is potentially invalid or at the wrong scope.

### What is the difference between staged and active permissions?

- Staging

  - Permission is added in the `permissions.yml` file with the status - STAGING. It cannot be added to roles nor it is shown in the UI.
    Access control check will always return true if asked whether this permission is available to the user (not enforced).

- Active
  - The status of the permission is changed to ACTIVE in the YAML file. The experimental flag is removed from the permission. Access control checks are now enforced on the new permission.

### Is it possible to hide account-level defaults for built-in roles?

No, it's not possible to disable roles for an account as doing so would make managed roles invisible to everyone, including the account admin.

### Why are "-" removed from UserGroup identifiers?

The removal of hyphens from UserGroup identifiers is in line with the Harness UI convention, where identifiers cannot contain hyphens. This practice ensures consistency and prevents the use of invalid characters in identifiers. While hyphens are allowed in UserGroup names, they are automatically removed from identifiers during creation through SCIM to adhere to the specified naming conventions.

### Our SCIM integration is currently connected to the First Gen instance/URL, and the NextGen console lacks user groups. Do we need a separate application for NextGen SCIM integration?

For NextGen SCIM integration and to enable user groups, it is recommended to create a separate SCIM application for the NextGen instance. This will ensure that the SCIM integration is correctly configured for the NextGen environment, enabling smooth management of user groups while remaining compatible with the FirstGen setup.

### How events are generated on the Harness Platform?

Audit Trail displays a record for each event of the Harness account, module, or entity. For more information, go to [Audit trail](/docs/platform/governance/audit-trail/).

### How can we export all information related to FirstGen deployments, services, environment, etc.?

Go to [Export deployment logs](/docs/first-gen/continuous-delivery/concepts-cd/deployments-overview/export-deployment-logs/) and [Use API audit trails](https://developer.harness.io/docs/first-gen/firstgen-platform/techref-category/api/use-audit-trails-api/).

### Is any documentation available regarding Harness allowlists for Google GCP?

Yes. For more information, go to [GitOps allowlist](https://developer.harness.io/docs/continuous-delivery/gitops/gitops-ref/gitops-allowlist/).

### How can I find user login activity?

You can filter and find user login activity in the Audit trail (in both FirstGen and NextGen).

### Is there a tool available for unit testing Harness rego policies before deployment?

No, Harness doesn't provide a dedicated tool for testing rego policies. However, you can use the general-purpose testing tool provided by Open Policy Agent (OPA) to test your policies. More details can be found in the Policy Testing with [OPA documentation](https://www.openpolicyagent.org/docs/latest/cli/#opa-eval).

### How can I see who's logged into my account?

You can use the audit trail. For more information, go to [Audit trail](/docs/platform/governance/audit-trail/).

### How can I access comprehensive information on Harness Security, including disaster recovery procedures, infrastructure details, and policies?

For in-depth insights into Harness' security practices, including disaster recovery procedures, infrastructure aspects, and policies, Harness recommends going to the [Trust Center](https://trust.harness.io/). This centralized resource is designed to provide you with all the necessary information regarding the security measures Harness has in place to safeguard your data and operations.

## Notifications

### What should I do if I don't receive an email to register my TOPT token?

[Harness Support](mailto:support@harness.io) to receive retrieve your TOPT token. After receiving the token, you can register it in any authenticator app. If you're not receiving the token via email, there may be an issue with your SMTP provider.

### Where are the settings for individual user email notifications?

Notifications are configured on the User Group to which the user is attached. All notification preferences are displayed there. For more information, go to [Edit notification preferences](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/#edit-notification-preferences).

### Why aren't my Slack notifications working?

If your Slack notifications are not working, you can start by troubleshooting and validating the webhook for Slack and then check how the notifications are configured at the pipeline or user group levels.
When executing the pipeline, don't select the option to notify only me.

### Why aren't approval notifications triggered when the correct user group is selected?

Verify that the selected user group selected has a channel (email, Slack, and so on) configured under **Notification Preferences**.

For more information, go to [Notification settings](/docs/platform/notifications/notification-settings/).

### What are Harness conditional alerts and notifications?

Conditional alerts are a useful tool, which you can use to trigger notifications on specific conditions that are met or exceeded.

For more information, go to [Create conditional alerts](/docs/platform/dashboards/create-conditional-alerts/).

### Do you have either a Splunk option or another public cloud option like GCS for audit log streaming?

Harness offers Splunk streaming. Currently, this feature is behind the feature flag `PL_AUDIT_STREAMING_USING_SPLUNK_HEC_ENABLE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

Splunk audit log streaming is compatible with Splunk enterprise and SaaS. For more information, go to [Configure audit streaming](/docs/platform/governance/audit-trail/audit-streaming/#configure-the-streaming-connector).

## Organizations and Projects

### Can I migrate projects from organizations and services from projects?

 There is ongoing work on a project migration feature allowing projects to be moved from one organization to another within an account, but it's not yet complete. However, a Clone entities script exists that enables you to clone your entities from one project in one organization to another project in another organization.

### Can a service account created at the project scope be assigned permissions to access an account-level resource?

It is not possible to create a service account at the project level and grant access to account-level resources. Therefore, this type of service account will not be able to access any account-level resources.

In case you want to use a service account, you can create an account-level service account and then provide project-level role bindings for it, corresponding to the project. You can also provide role binding for account-level templates.

### Why can't I view projects?

Check to be sure you have the required Role and permission granted to view Projects. Contact your account admin to confirm the permissions granted for your account.

### Why am I getting an error while creating a template using a service account token generated under a project?

You are likely using a token scoped to a project when creating a resource at the account level, the same applies to a project token while creating a resource at the organization level. To create resources across different levels (account/organization/project), your token must be at a higher level or at the same level as the scope.

### How do we provide project access to organization-level resources?

1. Under the organization, select **Access Control**, and then select **Resource Groups**.
2. Create a new resource group if none exists.
3. Under **Resource Scope**, select **Specified Projects**.
4. Select **Edit**, and then select the projects requiring access under the organization.
5. Select **Include Organization-level Resources**.
6. Select **Apply**, then **Save**.

Users within the project now have access to organization-level resources.

### How do we provide project access to account-level resources?

1. Under **Account Settings**, select **Access Control**, then go to **Resource Groups**.
2. Create a new resource group if necessary.
3. Under **Resource Scope**, select **Specified Organizations (and their Projects)**.
4. Select **Edit**.
5. Enable **Include Account-level Resources**.
6. Select the organization (and its projects) from the dropdown.
7. Enable **Include Project-level Resources**.
8. Select **Specified**, then select the projects that require account-level resources.
9. Select **Apply**, then **Save**.

Users within the project now have access to account-level resources.

### Can you manage org level entities at the account level?

This is a use case of user-group inheritance,

- Create User Group at account scope.
- Inherit User Group at each Organization scope and create appropriate role binding.
- When trying to onboard new user to all this Orgs, all you have to do is to add that user in User Group and that will provide you access to all Org.
- This UG would still be managed to Account Scope.

For more information, go to [Create groups by inheritance](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups#create-groups-by-inheritance).

### How can I restore user groups that I accidentally deleted?

There is no way to restore user groups from the Harness UI should you inadvertently delete them because they are also deleted from our backend collection. However, if the user groups were provisioned via SCIM, you can resynchronize them.

### Can I send a single invitation email to a user for both Account-level limited permissions and Organization-level admin privileges?

You can efficiently manage user invitations by combining Account-level limited permissions and Organization-level admin privileges in a single email. During the invitation process, grant the necessary permissions at the Account level, ensuring they encompass all child permissions, providing access to all organizations and projects. Simultaneously, grant admin permissions to the specific Organization at the Account level without the need for a separate invitation. This allows users to receive a unified invitation email when added to the Organization as Org Admins, streamlining the acceptance process.

### Can administrators bulk approve and activate users who are in a "Pending Invitation" status, transitioning them to "Active Users" collectively rather than individually?

Certainly. If the account authentication mechanism is configured as SSO, and the FF `PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES` is enabled, users will be automatically enabled upon invitation. However, if the account authentication mechanism is USER_PASSWORD, each individual user needs to accept the invite to set their login password, as automatic enabling is not applicable in this case. The method of account authentication determines the user activation process, with SSO streamlining the activation for users, while USER_PASSWORD requires individual acceptance for password setup.

### Can I see who invited a user?

Yes, you can find user invite actions in the audit trail.

### Is there any other way to remove a test user group created with externallyManaged=true other than remove it by a mongodb query set externallyManaged=false?

Yes, a more preferable approach is to update the user group in the database by changing the externally managed flag from true to false. Following this, you can delete the user group from the UI. Deleting directly from the database might not be the optimal solution, especially if the user group is part of the hierarchy, such as an account user group inside an Org/Project. Updating the flag and then deleting it through the UI ensures a more controlled and comprehensive handling of the user group removal, taking into account any dependencies in the hierarchy. This is not updatable using API, but soon deletion will be allowed from UI.

### Can I centrally identify and remove resources created by a user who had admin access but now has non-admin permissions?

This feature is not currently available. Harness plans to add it in a future release. However, you can leverage the Audit Trail feature to track all actions performed by the user over a specified time. This way, you can identify the resources they created when they had admin access.

Audit trails are available at the Account and Organization levels, allowing you to determine the resources created by the user. To restrict the user's admin access, you must remove their admin permissions for all scopes (account, org, project). After admin permissions are revoked, the user won't have the authority to perform admin operations.

### How can we implement an approval process to safeguard against accidental deletions and ensure only the correct accounts are marked for deletion?

The implementation of this feature is currently pending. Presently, the ability to mark accounts for deletion is allowed through the "update account" permission in the admin tool, which has been granted to a wide range of users.

### Do we need to provide both sso_group_id and sso_group_name, and if so, should they match?

Yes, you must provide both. The value provided for both `sso_group_id` and `sso_group_name` should be same.

### How can I restore deleted projects?

Harness doesn't employ soft deletion for entities; instead, Harness opts for hard deletion, making restoration difficult. However, certain entities can be restored using YAML retrieved from the audit trail.

### Why am I experiencing issues with User Groups provisioned via SCIM?

This issue can occur if a User Group was provisioned via SCIM (System for Cross-domain Identity Management) before October 2022, and it contained a hyphen ("-") in its name. At that time, the hyphen was allowed, but the design restrictions have since changed.

To resolve this issue, you need to de-provision the affected User Group from Harness and then provision the same User Group again. This will create a new Harness Identifier for the group, ensuring that any naming restrictions are applied correctly, and it should no longer contain hyphens or other disallowed characters.

### Does Harness have OOTB roles at the project level?

Yes, Harness has a Project Admin role built in and also no ability to delete built in roles. Org and Project specific built-in roles are available only after the corresponding entity is created, and they are only available in the respective scope.

### Can I delete a user in the UI that was provisioned via SCIM?

Admins can delete users from the Harness UI, even if the user is provisioned via SCIM. However, this feature should only be used if the user is in a state where the SCIM app was removed, and hence the user cannot be removed.

It's important to note that if the user is a part of multiple accounts, deleting them from one account will not remove their backend entry, and they may still exist in other accounts. If you try to re-provision the user from the SCIM app, you may encounter errors as the user is still present with the same user ID in the backend.

To avoid these issues, you will need to remove the user completely from the SCIM app and provision them again as a new user.

### Can I create another project under the project?

As per the current design, you can't create a project under the project. The project is a separate entity that can't be created inside another project.

### Can I rename the project identifier?

No, the project identifier can't be renamed because it is set when the project is created. You can rename the project, but not the identifier.

### Why don't I see data for a new user?

Check the user group assigned to the user. If the user isn't assigned to any user group/role, they will not be able to view or access any relevant data.

## Platform rate limits

### Is there a limit to how many users an account can have?

Yes, the number of allowed users is based on your license.

### What is the query to check the user limit for an account?

```
db.getCollection('allowedLimits').find({key: "CREATE_USER", accountId: "<account_id_of_customer>"})
```

### What is the default QPS limit?

The default QPS limit is: 50 QPM per manager* Num of managers(3) =>Total 50*3 QPM = 2.5 QPS.

### What rate limits are enforced for NextGen?

Rate limits for requests/day:

- Any call: Harness allows 5000 requests every 10 seconds (30,000 requests per minute) per IP address.
- API calls: Harness allows 1000 requests per API key per minute.
- Large requests (character size > 500,000): 1 payload every 10 seconds.

For more information, go to [Rate limits](/docs/platform/rate-limits/).

### Why am I getting an "Error: Rate limit reached for tasks with rank IMPORTANT. Current task count 5985 and max limit 5000"?

This could happen when manager iterator is not running, there is a limit of 5000 delegate tasks at a time per account, but if iterator is not running, it will not get deleted automatically, and this error is returned.

### How is the rate limit calculated?

The rate limit is imposed based on both Queries per Minute (QPM) and Queries per Second (QPS). If an account exceeds 350 QPM or 5.833 QPS, requests are throttled for all external-facing APIs.

### How does the Rate Limiter work within a minute?

Within a minute, the Rate Limiter dynamically allocates time intervals. For 50 seconds, it allows up to 6 QPS, and for the remaining 10 seconds, it restricts the rate to 5 QPS.

### What happens when the rate limit is exceeded?

If the rate limit is exceeded during API requests, you may encounter HTTP status code 429 (Server Errors) indicating that the rate limit has been exceeded. This is a temporary restriction, and it is recommended to wait until the rate limit resets before making additional requests.

### Can you increase the daily deployment limit to 10000?

Yes, Harness can increase the daily deployment limit > 10000 per day. Contact [Harness Support](mailto:support@harness.io) for assistance.

### Why am I receiving a 429 error response with regards to rate limits?

Harness has several rate limiters on the platform. Sending multiple requests in quick succession will generate the 429 response. For more information, go to [Rate limits](/docs/platform/rate-limits/).

### Is there a rate limit For FirstGen when exporting deployment logs? Can this be removed or modified per account?

Yes, Harness enforces rate limits. For more information, go to [Rate limits](/docs/platform/rate-limits). Harness cannot remove rate limits per account, but you can request an increase.

### How is rate limiting applied in Harness?

Harness internally imposed a limit to allow a certain number of requests per minute as well as per second.

The limit Harness has imposed is if an account exceeds 350 QPM or 350/60 = 5.833 QPS, then the requests will be throttled for all the external facing APIs.

There are 14 external facing API resources, and this limit applies to all those APIs.

```
350 QPM and 5.833 QPS
```

The limit gets imposed based on QPM as well as QPS.

The Ratelimiter decides on what seconds out of the 60 for every minute which 50 seconds it will allow 6 QPS and rest 10 seconds allow only 5.

While running queries you might sometimes observe 429s that is because of the above limit.

```
429 - Server Errors : The rate limit is exceeded.
```

### Are there static limits in NextGen like there are in FirstGen (pipeline/service creation, etc.)?

No, Harness doesn't have limits on pipeline creation. Harness does have a limit for entity creation for the free/community tier, but no limits for the enterprise tier.

### Can you raise the parallel stage limits?

No. These limits are important for the stability of our systems. The limit is set at 30 for parallel stages for enterprise customers.

## References

### What is the service ID naming convention?

The naming convention for all identifiers in Harness is case sensitive. Identifiers must start with a letter or underscore, followed by letters, numbers, underscores, or dollar signs. For more information, go to [Entity identifier reference](/docs/platform/references/entity-identifier-reference).

### Are there docs for the infrastructure requirements to install Harness Self-Managed Enterprise Edition?

Yes, for more information, go to [Production environment deployment infrastructure](/docs/self-managed-enterprise-edition/install/harness-helm-chart#production-environment-deployment-infrastructure).

### Is there documentation for network setup or Harness Deployment Architecture?

Yes, there is documentation for Harness deployment architecture. For more information, go to [Harness Deployment Architecture](https://medium.com/harness-engineering/harness-deployment-architecture-a667fe359342).

## Secrets

### Are AWS KMS secrets stored in AWS or Harness?

Harness stores the secret in its Harness store and retrieves the encryption keys from KMS.

### Can we use an encryption method other than the default with AWS secret manager?

No, while using AWS Secret Manager, default encryption will be used. If you have to use custom encryption, then you need to use AWS KMS Secret Manager.

### Why do I get a no secret found error when I have a valid secret and identifier?

`
 InvalidRequestException: No secret found with identifier + [atiitmsservicedbpasswordstage]
`

Verify if the secret with this identifier exists at the same project level. If the secret is stored at the organization or account level, add the prefix `org/account.identifier` when accessing it.

### Why am I experiencing issues when creating a secret with the same name that was recently deleted?

Previously, when attempting to delete a resource in Harness, it would be soft-deleted, rendering the identifier unusable for reuse. However, this behavior has been updated. If you encounter any issues, you have two options: you can retain the same name while modifying only the identifier, or you can enable Force Delete to remove the resource without encountering any existing reference issues in the process.

For more information, go to [Force delete](/docs/platform/references/entity-deletion-reference/#force-delete).

### What is ngSecretManager.obtain?

`{ngSecretManager.obtain}` is an internal reference of a secret. If you encounter any errors, it's likely that the secret reference isn't functioning properly. Validate both the script and the secret reference being used.

### Why can't I reference the Custom Secret Manager template stored in Git?

Harness doesn't currently support referencing the Custom Secret Manager template stored in Git. Create an inline template as a workaround.

### We've relocated our secrets from the Harness vault to another without altering the secrets themselves, only copying them to a new vault. What's the optimal method to ensure all our secrets now reference the new vault location?

Updating the secret itself to point to the new vault where it's stored might be the best approach, considering the default Harness vault may not be editable.

### Why can't secrets be exported from FirstGen to NextGen?

Exporting secrets from the Secrets Manager is not possible due to security reasons, as it would expose them to unauthorized users. Harness does not support exporting secrets. The only option is to manually compare entries between FirstGen and NextGen to confirm if they match.

### What is the default timeout for the Custom Secret Manager script? Is this timeout configurable?

By default, it's set to 60 seconds, and the timeout is not configurable.

### Is there retry logic in FirstGen custom secrets decrypt? Does Harness cache the secret value?

Harness executes three retries to fetch a secret. Harness doesn't cache the secret value for security reasons.

### Are there plans to enable a single Vault connector to accommodate multiple Vault secret engines simultaneously?

Currently, a Vault connector can only be configured for one Vault secret engine. While it's not currently possible, there might be future support for this functionality.

### How do I extend the timeout duration for a custom secret manager?

To increase the timeout duration in a custom secret manager, adjust the settings in the connector's details step. This timeout setting, measured in seconds, determines how long the system will wait to fetch secrets from the custom provider. If fetching the secret exceeds this duration, the process is interrupted and results in failure. The default timeout value is set to 20 seconds. To avoid such interruptions, you can modify this value to a higher number as per your requirements.

### Can secrets access be scoped by environments?

Currently, the functionality to restrict access to secrets based on individual environments is not available. However, a potential alternative is to structure your account by dividing environments across different organizational projects. This method won't directly scope secrets to specific environments, but it can help in managing access by associating secrets with the relevant organizational context, thus maintaining a level of separation and control.

### Is it possible to use Vault AWS Credentials generation along with AWS Connector?

Harness doesn't currently support this functionality. You can leverage a custom secret manager to get credentials on the fly, where you can write any logic.

### Can we store secrets from sources other than the Harness Secrets Manager in the Custom Secrets Manager (CSM)?

No, Currently, the Custom Secrets Manager (CSM) is designed to work exclusively with the Harness Secrets Manager. It does not support direct references to secrets from other external sources. The integration with the Harness Secrets Manager provides a secure and centralized way to manage and retrieve secrets within the Harness platform.

### Why is Harness designed to exclusively integrate with the Harness Secrets Manager and not allow direct references to secrets from external sources?

Our previous setup allowed configurations where credentials from one secret manager were stored within another, resulting in complexities that could be challenging to navigate. Moreover, these configurations might introduce vulnerabilities, posing potential security risks.

### How can we use the external secret managers to store secrets?

Harness uses connectors to external secret managers (for example Google Secret Manager or Hashicorp Vault) to resolve/store secrets used by pipelines and elsewhere in the Harness platform. To connect to a custom secret manger requires a secret credential stored in Harness secret manager.

### Does Harness support referencing a LDAP secret?

No, doesn't currently support LDAP secret engine.

### Why am I experiencing errors with core_secret_access messages?

This error occurs when a user possesses the permission to execute a pipeline, yet lacks access to the project/organization/account secrets. This issue becomes critical when the pipeline's configuration includes resources that rely on these secrets. Consequently, users attempting to trigger or view the execution without proper secret access will encounter this error message.

To fix it, you must grant the expected permissions to the User's group, for example, for secrets, there are View, Create/Edit, Delete, and Access permissions.

### How long is an invitation for workshop accounts valid?

Invitations are valid for 30 days.

### Does a Vault connector accept configuration for only one Vault secret engine?

Yes the support is only for one secret engine per connector.

### Is it now possible to have secrets and secret connectors in different scopes, or do they still need to be in the same scope?

It's possible to have secrets and secret connectors in different scopes. For example, you can have a secret manager at the account-level and the secret using the secret manager at the project-level.

### How does Harness handle sensitive information, such as secrets, to prevent exposure in logs?

When using secrets for sensitive information, the platform automatically obfuscates or masks the values in logs and other outputs. This measure ensures that sensitive information remains protected and is not exposed in plaintext within logs.

### How do I deactivate Harness Secrets Manager via API?

Unfortunately, at this time, there is no API or Terraform approach to achieve this configuration.

### How can I migrate GCP/AWS KMS secrets from FirstGen to NextGen?

To migrate encrypted records from an old KMS (FirstGen) to a new one (NextGen), fetch the Data Encryption Key (DEK) from the old KMS, decrypt the data, re-encrypt it with the new KMS, update the records, and ensure security and compliance. Connectivity between NextGen and the old KMS is required.

### Can a Golang service directly provide a secret reference to an internal API and receive the decrypted secret?

Yes, there is an internal Harness API for that, with the limitation that only the secrets stored in Harness Built in Secret manager can be retrieved. If the secret is stored in vault or your secret manager, this won't work.

### Is there an API to perform the operation of IP allowlist?

These are APIs to create/update IP allowlists. For more information, go to [Create IP allowlist config](https://apidocs.harness.io/tag/IP-Allowlist#operation/create-ip-allowlist-config) in the API documentation and [Add/manage IP allowlist](https://developer.harness.io/docs/platform/security/add-manage-ip-allowlist/).

### Can I use a "bindSecret" in Harness LDAP settings to avoid using an inline password, as suggested in the API documentation?

No, you cannot use a "bindSecret" in Harness LDAP settings to avoid using an inline password in NG LDAP. Currently, NextGen LDAP only allows for the use of an inline password. The appearance of "bindSecret" in the API documentation is due to a shared bean between FirstGen and NextGen. In FirstGen, support for secret references is available. However, NextGen LDAP still requires an inline password, and this limitation should be considered when configuring LDAP settings in your environment.

### Why can't I decrypt secrets from Harness Secret Manager?

When encountering decryption errors for a secret in your pipeline, it's recommended to test the same secret using a shell script and print it. The secret will always be displayed in encrypted form **\*\*\***, eliminating concerns about revealing its value. This process helps to isolate whether the issue lies with the secret itself or with the way it is referenced.

### How do I create an AWS Secrets Manager reference type secret?

To create an AWS Secrets Manager reference type secret, you'll use the `secret_manager_identifier`,which corresponds to the identifier of your AWS Secrets Manager added as a connector in Harness. Ensure that the secrets are stored within the same scope as the secret manager, such as account secrets stored in the account secret manager.

### How does the Vault agent secret manager work with vault?

The below discusses how secret manager works with vault:

https://discuss.harness.io/t/vault-how-to-use-the-new-vault-agent-integration-method-with-harness/784

### How can I view the values of secrets stored in the Harness Secrets Manager?

As the secrets stored in Harness are encrypted, their values cannot be directly viewed from the Harness UI. However, you can retrieve and display the secret values using a pipeline execution.

To achieve this:

Create a shell script execution with two separate shell script steps, both specifying the same delegate selector.

In the first Shell script:

```bash
echo "Secret text is: " \<+secrets.getValue("printsecret")> >> /tmp/abc.txt
```

Here, "printsecret" represents the name of the secret.

In the second shell script:

```bash
cat /tmp/abc.txt
```

The output of the first shell script will be:

```md
Secret text is: **************
```

However, the second script will print the actual value of the secret:

```md
Secret text is: hellohello
```

It's important to note that attempting to view the secret value directly in the first step won't reveal the plain text value.

### Is there documentation for adding and referencing text secrets?

Yes. For more information, go to [Reference the secret by identifier](/docs/platform/secrets/add-use-text-secrets/#reference-the-secret-by-identifier).

### What is the expression to use a secret in a script?

To use a secret in script, you can use the expression `<+secrets.getValue("account.mySecret")>`.

### When defining a secret with a dollar sign, why does the shell print the secret partially?

Harness doesn't allow the `$` symbol in your secret value. If your secret value includes this symbol, you must use single quotes when you use the expression in a script.

### What if my secret value starts with # for reference secrets?

If your secret value starts with # in case of reference secrets, always use double quotes. "#" is a special character to represent comments and it will work as expected.

Ex: The value for the secret is say "#7767test"
`echo "<+secrets.getValue("account.aaaatestaaatest")>" `

### Is there a way to get a secret as base64-encoded?

No there isn't support for getting secrets as base64, but you can store the value as a base64-encoded secret and then get the value using the expression `secrets.getValue("my_secret")`.

### What can I do to ensure project-level users can't access account-level secrets? How is this handled by RBAC when using expressions?

Enable the feature flag `PIE_USE_SECRET_FUNCTOR_WITH_RBAC`.

### How can we prevent users with project scope access to account-level secrets?

This can be changed by modifying the role bindings of the All Account Users user group and assigning any other Role and ResourceGroup as per their need.

### I have a secret that is connected to Vault. Do I need to connect to Vault to view it?

For security reasons, access to the secrets requires a connection to Vault. However, you are allowed to use them. For more information, go to the following:

- [Add a HashiCorp Vault secret manager](/docs/platform/secrets/secrets-management/add-hashicorp-vault/)

- [Reference existing secret manager secrets](/docs/platform/secrets/secrets-management/reference-existing-secret-manager-secrets/)

- [Harness secrets management overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview/)

You can reference the secrets using the following as a guide.

[Reference the secret by identifier](/docs/platform/secrets/add-use-text-secrets/#reference-the-secret-by-identifier)

### Should we store the token that hasn't been generally available yet in the secret manager?

No, Harness doesn't use the customer secret manager to encrypt delegate tokens. Rather than storing the token in plain text, Harness leverages an internal encryption mechanism. This mechanism enables Harness to store the token's encrypted value in the database. This approach enhances security and mitigates potential risks associated with storing sensitive information.

### Basic as string is getting masked although I am not using as secret or none of the secret has this value.

We do follow some rules for masking, like to mask any api key/token, we mask any string followed by Basic/Bearer, and that’s the reason if you try to print these will be masked.

## Security

### Does JIT provisioning still initiate an email to the user for confirmation or password creation?

No, the JIT provisioning feature does not send emails for confirmation or password creation. The sign up process is completed without the need for an invite.

### How is data stored between different tenants/accounts in Harness?

Data between different tenants/accounts in Harness is stored in isolated data stores, ensuring that each tenant's/account's data remains separate and secure. The multi-tenant architecture of Harness provides this isolation. Furthermore, data is encrypted at rest, meaning that the databases encrypt the data at the disk level to enhance security. This encryption ensures that even if physical access to the storage is obtained, the data would still be protected.

Regarding the handling of secrets, they are evaluated at runtime within the delegate's environment and are not sent back to the Harness Manager. This process maintains the confidentiality of secrets, whether they are used directly in tasks or referenced as output variables. The system is designed to ensure that sensitive information remains secure and is only accessible where and when it is needed, adhering to security best practices.

### In network security policies, which Harness IPs do I need to allowlist to connect to Harness?

For a list of Harness IPs to allow, go to [Allowlist Harness domains and IPs](https://developer.harness.io/docs/platform/references/allowlist-harness-domains-and-ips).

### What should we put (if anything) in the "JIT Validation Key" and "JIT Validation Value" fields when JIT provisioning is enabled in SAML?

You have the option to leave this field blank since it's not mandatory. Alternatively, you can specify a Key (also known as a SAML attribute) along with its expected value. This flexibility allows for selective user provisioning via JIT authentication, accommodating users who may or may not provide this defined attribute.

### What is the default entityID (audience restriction) the Service Provider endpoint (ACS URL) uses when not defined?

The default entityID is `app.harness.io` unless otherwise specified.

### What does the promql query specifically check, and why is it still non-zero even after a successful token renewal?

The query checks for failed tasks related to token renewal.

```
io_harness_custom_metric_task_failed{task_type="NG_VAULT_RENEW_TOKEN"} > 0
```

The non-zero value may persist as it represents the count of failed tasks, which doesn't reset after successful renewals.

### What environment variable or Java option should be configured to stop exposure in the Gateway container when JWT is getting exposed?

Create a ConfigMap containing the new `logback.xml` file (everything set to `level=WARN`). Mount it wherever and pass the following to the JVM via `JAVA_OPTS` in the config.

  ```
  -Dlogging.config=file:/path/to/mounted/logback.xml
  ```

### How do I reset 2FA?

If a user loses the QR Code, an account admin can reset two-factor authentication and email them a new QR Code and secret key.

For more information, go to [Reset 2FA](/docs/platform/authentication/two-factor-authentication/#reset-two-factor-authentication).

### Is root user access required by default for adding custom binaries?

Custom binaries do not mandate root access; users can acquire them via cURL and subsequently integrate them into the system's executable path.

### What is the account name in the authenticator app when setting up 2FA?

The account name shown in the authenticator app when setting up 2FA is from the company name set for your account. To set a different name, update your company name.

### How do I enable/disable 2FA at the user and account levels?

2FA is enabled by default for the account, and individual users also have the option to enable it specifically for their own accounts via their user profile settings.

However, once 2FA is enabled by a user, only that specific user can disable it. Account administrators are unable to disable 2FA for individual users once it has been activated by the user themselves.

### Why am I prompted for 2FA when other users aren't?

You can manage 2FA in two ways:

**Individual user:** you can set up 2FA for your own User Profile without impacting other user accounts.

**All account users:** if you have Create/Edit permissions for Authentication Settings, you can enforce 2FA for all users in Harness. First, you set up 2FA for your own account, and then you can enforce 2FA account-wide in the Harness account's Login Settings.

To check whether 2FA is enabled for your user account, select your User Profile. You can toggle the **Two-Factor Authentication** indicator. For more information, go to [Two-factor authentication](/docs/platform/authentication/two-factor-authentication/).

### Does Harness Support ever have write access to our account?

No, Harness never has write access to your account.

### Is it a standard practice to notify customers 30 days in advance of IP address changes?

We don't change IPs without 30 days notice to customers. If a security emergency requires a change, Harness will notify you. For more information, go to [Allowlist Harness SaaS IPs](https://developer.harness.io/docs/platform/references/allowlist-harness-domains-and-ips/#allowlist-harness-saas-ips).

### Do we need to enable authorization for SSO to work while setting up SAML?

Authorization is used for group mapping. It's optional and not required for SSO login to work.

### Doe Harness support TLS 1.3?

Both the Harness Delegate & SaaS support TLS 1.3, the default TLS version. It is worth noting that each specific task implementation can create its own separate HTTP client, which can advertise any TLS version of its choice. The connector check uses the task-specific HTTP client rather than the delegate's HTTP client. Some tasks prefer to use TLSv1.2 in certain use cases, perhaps due to legacy reasons. However, it is possible that this might change in the future, and full TLS 1.3 support might eventually be rolled out. As of now, certain connectors still prefer TLS 1.2.

## Settings

### Can I format emails using the first letter of the first and last name in caps (FirstnameLastname@company.com) when I add them?

When adding emails, the specific formatting of uppercase letters, such as the first letter of the first and last name, does not impact the operation. This is because Harness performs a case-insensitive search for emails, converting all email addresses to lowercase during user creation operations. Therefore, regardless of how you format the capitalization in the email, it will be standardized to lowercase for processing.

### During the migration of SecretEngines from FirstGen to NextGen platforms, we encountered an issue where the secretEngineVersion was set to 0 in a Vault example. However, NextGen presents a constraint where secretEngineVersion cannot be 0. Is there a specific reason for this constraint, and should we resolve it by increasing the version number to 1?

Yes, the constraint you're encountering is due to validation rules that were introduced in the NextGen platform after its initial development. These validations are in place to ensure consistency and correctness across configurations.

To migrate Secret Engines from the FirstGen to the NextGen platform, it is recommended to adjust the `secretEngineVersion` from 0 to 1. The behavior of versions 0 and 1 will be the same, with version 1 being the supported configuration in NextGen. This change is necessary to comply with NextGen's validation requirements and will facilitate a smooth transition of your Secret Engines to the new platform.

### Is it possible to change the company name for my Harness Account?

Yes, you can open a support ticket to request the name change.

### Why am I redirected after login to FirstGen when I enabled NextGen?

Make sure you set the Default Experience as NextGen on the Account overview page.

### Is the Harness FirstGen/NextGen SAML setting shared?

Yes, if you have configured SAML on FirstGen, the same setting is used for login to NextGen.

### How do I migrate a user from FirstGen to NextGen?

Users are migrated automatically once NextGen is enabled.

### How can I add an admin in a newly-enabled NextGen account?

Users from your FirstGen Administrators group are automatically assigned as admin role in NextGen. You can then create/update other roles in NextGen.

### What is the role of PROXY_HOST in the proxy.config?

This is the host address of the proxy that you want to configure.

### How can I resolve vanity URL issues?

When a vanity URL is enabled for an account using SAML login, you must update your ACS URL with your vanity URL. For example, if your original ACS URL is `https://app.harness.io/gateway/api/users/saml-login?accountId=xxxxxxxxxxxxxxxx`, after enabling a vanity URL, you must update it to something like `https://VANITYURL.harness.io/gateway/api/users/saml-login?accountId=xxxxxxxxxxxxxx`.

### What are the different ways I can add users to the Harness Platform?

You can create users in the following ways:

- UI: Account admins can add user directly via the UI.
- SCIM: You can set up SCIM to provision users.
- Terraform Provider: You can use the [Harness terraform provider](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_user).

### What is the Xmx value in the JAVA_OPTS setting?

The Xmx value is a parameter used to specify the maximum heap size for a JVM when running a Java application. It determines the amount of memory the application can use for its operations.

```yaml
name: JAVA_OPTS
value: "-Xms64M -Xmx8192M"
```

### Why does the Okta login go to the FirstGen interface?

Change the Default Experience to Harness Next generation under **Account Overview**.

### How do I create a custom URL for my Harness account?

If you want a vanity URL, you can contact [Harness Support](mailto:support@harness.io) and request to create a custom subdomain, for instance: `mycompany.harness.io`.

### Is it possible to define per User Groups who can/can't open support tickets?

Currently anyone in the account can open a ticket, and access is not restricted.

### How do I check the version in Harness Self-Managed Enterprise Edition?

You can check the version by running the command below.

```
helm list -n namespace
```

It will show the app version, which is the version of your Harness edition.

### Is there a reason why members of the "Test" user group, who have been granted access to edit cloud providers and have the "Manage Cloud Provider" option enabled, are unable to perform edits?

Review the usage scope. Despite permissions granted to the user group, if the usage scope includes applications not specified, users may be unable to edit the cloud providers.

### What is the Idle Session Timeout? Is it configurable?

The idle session timeout is 24 hours. You can configure the session timeout via **Account Settings**.

## Self-Managed Enterprise Edition

### Is there an SMP database query to validate whether a user was provisioned via SCIM or manually?

Yes, you can use the following queries. Replace the `accountid` with the actual account ID.

This query returns results for users that were provisioned via SCIM.

```
db.getCollection('users').find({"userAccountLevelDataMap.xxxxxxxaccountidxxxxxx.sourceOfProvisioning.NG":"SCIM"})
```

This query for `MANUAL` returns results for users provisioned that were provisioned through the UI.

```
db.getCollection('users').find({"userAccountLevelDataMap.xxxxxxxaccountidxxxxxx.sourceOfProvisioning.NG":"MANUAL"})
```

### How do I enable GitOps in Harness Self-Managed Enterprise Edition?

Set `global.gitops` to `true` in your `values.yaml` file and then re-apply the file.

### Is there a hard technical limit for entities in NextGen?

There are no hard technical limit for entities in NextGen. For more information, go to [Harness entity reference](https://developer.harness.io/docs/platform/references/harness-entity-reference). Harness has performance data on the specified test environment. For more information, go to [Performance reports](https://developer.harness.io/docs/self-managed-enterprise-edition/performance-reports/).

### What do we need to backup to recover quickly when Harness infrastructure is lost?

Harness recommends that you perform a full backup of the Harness namespace at least once a week, preferably every 24 hours. Back up recommendation is to use Velero tool. For more information, go to [Back up and restore Helm](https://developer.harness.io/docs/self-managed-enterprise-edition/back-up-and-restore-helm).

### Can I do individual backups of SMP instead of full backups?

Harness recommends that you perform a full backup of the Harness namespace at least once a week, preferably every 24 hours.

### How do you perform SMP backups?

Harness recommends you use the Velero tool for backups. For more information, go to [Back up and restore Harness Self-Managed Enterprise Edition Helm installations](/docs/self-managed-enterprise-edition/back-up-and-restore-helm).

### Is there a way to upgrade the volumes created when installing Harness with Helm from gp2 to gp3?

Volume types are controlled by storage class, its not Harness controlled.

You can modify the [storage class](https://kubernetes.io/docs/concepts/storage/storage-classes/#aws-ebs), but you would lose the data if AWS doesn't support direct upgrade from gp2 to gp3.

### Is there a plan to integrate Git into SMP?

Yes, this feature is planned and will be part of a future release.

### Does Harness plan to add support for multiple account Ids for SMP?

Currently SMP is single account only, multiple account support is yet to come.

### Where can I find details about recent changes to Harness Self-Managed Enterprise Edition?

For information about fixes and enhancements, go to the [release notes](/release-notes/self-managed-enterprise-edition).

### Why don't I see Dashboards in my Harness Self-Managed Enterprise Edition installation?

Dashboards are a licensed functionality. If you don't have a current license, dashboards are not available in your installation.

### Is there documentation on installing and upgrading the Harness Self-Managed Enterprise Edition cluster?

Yes. For more information, go to [Install using Helm](/docs/self-managed-enterprise-edition/install/install-using-helm) and [Upgrade the Helm chart](/docs/self-managed-enterprise-edition/install/upgrade-helm-chart).

## Terraform

### Why is my Terraform plugin crashing when using the Harness provider?

Generally, this issue is related to a bug in our provider. Before opening a ticket, try using the latest provider version. Run your script again to see if the problem persists. If the issue continues, contact [Harness Support](mailto:support@harness.io) for assistance.

### We don't have certain projects, but the Harness Terraform modules continue to read them. How can we remove unwanted data that exists in Harness?

This data could be in the state file if changes were made outside of the it. Inspect your state file.

### Why am I getting a "missing expected [" error when I didn't get it before?

You might get the error below because Harness standardized to move from using maps to sets of strings for tags.

```
Planning failed. Terraform encountered an error while generating this plan.
Error: missing expected [
...
Error: Terraform exited with code 1.
Error: Process completed with exit code 1.
```

To fix this, update your state file to change the tags field from a map to a set of strings, for example `"tags": {}` to `"tags": []`.

### Why am I getting the "Unsupported block type with the Run on Remote Workspace" error?

It might be due to the configuration. Try this instead for the Terraform config file:

```
terraform {
  backend "remote" {
    hostname     = "http://app.terraform.io "
    organization = "your-organization"
    workspaces {
      name = "your-workspace"
    }
  }
}
```

For more information, go to [Run on remote workspace](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/#run-on-remote-workspace).

## Variables and Expressions

### Can I create an input variable as a checkbox?

To create an input variable as a checkbox, use allowed values to provide a fixed range of acceptable values for a runtime input. Use multiple selections if you want to choose one or more values from the list of allowed values

### What's the Harness variable replacement for a service name?

To replace the service name with a Harness variable, use `<+service.name>`.

### How should complex expressions be correctly utilized?

When using a complex expression, ensure the expression is wrapped within `<+ >`. For example: `<+<+org.name>.toLowerCase()>/<+<+project.name>.toLowerCase()>>`.

### What is the purpose of the liveStatus expression in Harness, and how does it differ from stageStatus?

The `liveStatus` expression is designed for use within step groups under a matrix. Unlike stageStatus, which doesn't consider running or completed steps under a matrix, liveStatus calculates the status of steps, including those in the running or completed state

### What are Harness built-in and custom variables?

They are a way to refer to something in Harness such as an entity name or a configuration setting.

### What is the correct syntax for the Regex Extract built-in variable?

`regex.extract("v[0-9]+.[0-9]+", artifact.fileName)` is the correct syntax.

### What are the statuses of nodes using the Harness looping Strategy?

Running, Failed, and Success.

### How can I see all available variables?

You can rely on our [Built-In variables](/docs/platform/variables-and-expressions/harness-variables/) that will be available during your pipeline executions.

### How can I resolve environment variables in JEXL conditions?

Unfortunately, JEXL conditions do not support the direct usage of environment variables. The conditions in JEXL only allow the use of variable expressions that can be resolved before the stage is executed. Since environment variables are resolved during runtime, it is not possible to utilize variable expressions that cannot be resolved until the stage is run.

### Variable is interpreted as integer although passing as a string (enclosed with single or double quotes).

Can you check if your string has underscore as a value  because underscores are ignored in strings.


## Miscellaneous

### Does the Harness Platform support localization?

No, localization is not currently supported.

### What is the entity ID for an on-prem setup or vanity URL?

In the scenario of an on-prem setup or when using a vanity URL, the entity ID should correspond to the domain utilized to access Harness, for instance, `vanity.harness.io`.

### What integration does Harness offer with SCIM providers?

Harness integrates with multiple third-party SCIM providers

- [Okta SCIM](https://developer.harness.io/docs/platform/role-based-access-control/provision-users-with-okta-scim)
- [Azure AD SCIM](https://developer.harness.io/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim)
- [OneLogin SCIM](https://developer.harness.io/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim)

### How do I sign out of Harness?

To sign out of Harness, select **My Profile**, and then select **Sign Out** at the bottom left of the screen.

### Can I enable feature flags for organizations and projects without enabling them for the account scope?

Currently, feature flags are only enabled at the account-level.

### How can I resolve serialization errors when integrating NextGen Audits for ModuleLicense collection with multiple child classes in YAML DTOs?

The serialization issue in NG Audits for ModuleLicense collection arises when using entity objects instead of DTOs in the YAML for Audit Service. The problem is that entity objects lack JsonSubTypes, causing the Jackson ObjectMapper to struggle with determining the appropriate subType for conversion. The resolution is to utilize DTOs, which inherently possess the JsonSubTypes property, ensuring smooth serialization and deserialization processes in the Audit Service.

It's essential to note that the Audit Service doesn't directly serialize or deserialize YAML; instead, it expects the old and new YAML as strings. However, the choice of using DTOs over entity objects is crucial for resolving any potential serialization challenges. Always ensure that the service generating audits has access to all required DTOs to prevent code duplication and facilitate efficient integration with NG Audits.

### How do I delete an earlier template version?

To delete a template you no longer use, do the following:

1. In Harness, go to **Account Settings**, **Organization Settings**, or **Project Settings**, depending on the [scope](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#permissions-hierarchy-scopes) at which you want to delete a template.
2. Select **Templates**.
3. Select **More Options** (&vellip;) corresponding to the template you want to delete.
4. Select **Delete Template**.
5. Select the template version(s) you want to delete.

You can't delete the stable template version.

### When a template version is removed but is referenced within a pipeline, is reconciliation required to move the template to a new version?

When you delete a template version, the version is removed from the template in the pipeline where you have referenced that template with the particular pipeline.

If reconciliation doesn't help, you must select another template version.

### Why does the artifact section of the UI only display the first 30 branches from a GitHub repository instead of retrieving all branches?

This is a limitation of the GitHub API. To increase the number of results, you must define the query string `per_page=100`.

For more information, go to [List branches](https://docs.github.com/en/rest/branches/branches?apiVersion=2022-11-28#list-branches) in the GitHub documentation.

### How can I force delete a resource that I no longer use?

Only an account-level admins have the ability to force delete a resource.

1. Select **Account Settings**.
2. Select **Account Resources**.
3. Click on the **General** section to give you the option to enable this feature.

### How do we identify pipelines using a specific template?

1. Navigate to the **Templates** section in the project.
2. Select the desired template.
3. Open the **Referenced By** section.

A list of entities will display, showing the pipelines utilizing the template.

### How can I execute a simple Shell or Bash script step?

With a custom stage, you don't need to define a service. This is the preferred method to execute a shell or bash script step.

### How can we manage access to Harness from different locations?

Harness allows organizations to manage an IP allow list, enabling approved IP addresses, including office and VPN IP addresses, to access the platform. Contact [Harness Support](mailto:support@harness.io) for assistance.

### How does Harness handle data retention for exiting customers?

Harness manages data retention for exiting customers by implementing a straightforward process. Upon the expiration or offboarding of a customer account, all associated data is promptly removed from the system.

### Is there a timeline of when I need to upgrade to NextGen?

Yes. For more information, go to [Timeline](https://developer.harness.io/docs/continuous-delivery/get-started/upgrading/upgrade-nextgen-cd/#timeline).

### Is there a tool to migrate from FirstGen to NextGen?

Yes. You can use the [migrator tool](https://harness.github.io/migrator/).

### What is cron job in the Kubernetes manifest, and why is it needed?

The Kubernetes manifest has a component called upgrader. The upgrader is a cron job that runs every hour. Every time it runs, it makes a call to Harness Manager to determine which delegate version is published for the account. The cron job is required for the auto upgrade flow.

### Can I subscribe to Harness at the org level?

We don't support licenses at the org-level, only at the account-level.

### Does Harness allow you to set 2 AMIs with different CPU architecture?

Harness doesn't allow this in the same ASG.

### How can you control on-demand or spot provisioning within ASG group / target?

Harness supported spotinst ASG in FirstGen and also supports spotinst for NextGen. For more information, go to [Spot deployment](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/spot-deployment).

### How can I disable a cron job?

If you need to disable auto upgrade, first run the following command to suspend auto-upgrade on the installed image:

```
kubectl patch cronjobs <job-name> -p '{"spec" : {"suspend" : true }}' -n <namespace>
```

Then, in the delegate manifest, locate the `CronJob` resource. In the resource spec, set the suspend field to true `spec: --suspend: true`.

### Does Harness support Google cloud functions in FirstGen and NextGen?

Yes, Harness supports Google cloud functions in both FirstGen and NextGen.

For more information, go to [Google cloud functions](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-functions-faqs).

### Updating the LDAP cron schedule results in an error (Failed to fetch: 400). What are the possible causes?

This happens due to an incorrect cron expression. Harness uses Java cron-utils to run to define, parse, and validate cron expressions. Use the below expression to generate the expressions.

https://www.javainuse.com/cron#google_vignette

### How can I resolve the error: "Oops, something went wrong on our end. Please contact Harness Support."?

This error message typically indicates an unexpected failure in a backend API call related to the operation you're attempting.

To address this issue effectively:

- **Collect HAR File:** When you encounter this error, gather a HAR (HTTP Archive) file that captures the network traffic and interactions during the operation you were performing.

- **Open a Support Ticket:** With the HAR file in hand, open a ticket with [Harness Support](mailto:support@harness.io). Provide detailed information about the error along with the attached HAR file. This enables our support team to investigate the issue thoroughly.

By following these steps, our support team can promptly review the situation, diagnose the underlying cause, and provide you with the necessary assistance to resolve the error swiftly. Your cooperation in providing the HAR file greatly facilitates our troubleshooting efforts and ensures a timely issue resolution.

### What does "Exit code 137" mean?

"Exit code 137" typically indicates an out-of-memory error. When a process in a system exhausts its allocated memory resources, the operating system sends a termination signal to the process. In the case of "Exit code 137," this signal signifies that the process was terminated due to running out of memory. This error commonly occurs when a program or container attempts to allocate more memory than is available, leading to termination by the system to prevent resource exhaustion and potential system instability.

### Will the delegate start if there is a failure in the commands provided in INIT_SCRIPT?

No, the delegate will not start if there is any failure while executing the commands in the `INIT_SCRIPT`.

### How can I pass a custom logback XML for Docker delegates?

Mount the custom logback XML file in the Docker container and use the `JAVA_OPTS` variable to provide the path.

```bash
docker run  --cpus=1 --memory=2g --mount type=bind,source=/Users/amitjha/Downloads/utility/temp/custom-logback.xml,target=/opt/harness-delegate/custom-logback.xml \
  -e DELEGATE_NAME=docker-delegate \
  -e NEXT_GEN="true" \
  -e DELEGATE_TYPE="DOCKER" \
  -e ACCOUNT_ID=xxx \
  -e DELEGATE_TOKEN=xxxx \
  -e JAVA_OPTS="-Dlogback.configurationFile=/opt/harness-delegate/custom-logback.xml" \
  -e DELEGATE_TAGS="" \
  -e LOG_STREAMING_SERVICE_URL=https://app.harness.io/log-service/ \
  -e MANAGER_HOST_AND_PORT=https://app.harness.io harness/delegate:yy.mm.verno
```

#### Does Harness NextGen Community Edition support LDAP login?
No, Harness NextGen Community Edition does not support LDAP login.

### How can I download a JKS file that has been uploaded to Harness Secrets?

You can utilize the following steps to work with the JKS file: decode the file secret, write it to a temporary file, and then access it through that temporary file.

```
echo <+secrets.getValue("filejksasbase64")> > /values.jksbase64
cat /values.jksbase64
cat /values.jksbase64 | base64 -d
```

### What is the minimum supported screen resolution?

The minimum supported screen resolution is 1440x900.

### Can I adjust the default width of step logs in the browser GUI? They currently open at around 25% of the screen width.

Currently, there are no settings to modify the default GUI view setup. You can manually expand and adjust it as needed, but it resets to default when you refresh or switch to another execution.


### How to revoke an account token in Harness?

You can revoke an account token by going to the Access Control section in Harness and selecting the token you want to revoke.


### Is it possible to extend the expiration date of a token that has already expired?
No, you cannot extend the expiration date of an expired token. You will need to create a new token with a new expiration date or rotate the token.


### What time zone is used to determine the expiration time of a token?
The token expiration time zone will be UTC.

### If I have a service account token like ```sat.w8EaJoerQcqqkZwcb*****************mqXIHzgFq```, is there any way to identify which service account it is associated with?
No, there is no way to find out which service account is associated with a service account token just by looking at the token itself. 

### How can I restrict a Harness secret so that it can only be accessed and used by a specific pipeline?
You can use our RBAC and create a resource group and role so it can be used only in the required pipeline https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups/#create-a-resource-group

### If there is a pipeline in progress when we upgrade the delegate. Will the pipeline fail and need to be re-run?
Delegate upgrades do not affect pipelines unless the shutdown timeout is reached. Before an upgrade is performed, the delegate finishes the underway tasks. The delegate then shuts down. There is a 10-minute timeout by default as part of the shutdown process. You can configure this setting, by updating the terminationgraceperiod in delegate yaml.

### How to check latest harness manager version?
To check latest harness manager version or any other services version, Go to `Account setting > Account Details > Platform Service Versions`

### Can we configure audit log streaming to S3?
Yes, you can configure log stream to s3 using the following doc - https://developer.harness.io/docs/platform/governance/audit-trail/audit-streaming/
