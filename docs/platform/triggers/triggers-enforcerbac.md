---
title: Enforcing Authorization RBAC on Custom Triggers
description: An overview on setting RBAC and enforcing RBAC on custom triggers
sidebar_position: 11
---

Harness has the capability of adding additional security to triggers by enforcing this security into generated API Tokens.  This topic covers how to add this enforcement to your triggers.  For more information about generating API tokens, both for users and service accounts, please visit our document on [Managing API Keys](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys/)

Users who attempt to access the trigger without an API key declared, will be provided the following error message:
```
{"status":"ERROR","code":"INVALID_REQUEST","message":"Invalid request: Authorization is mandatory for custom triggers in px7xd_BFRCi-pfWPYXVjvw:default:Docs. Please add X-Api-Key header in the request","correlationId":"465d6463-152b-4211-8cb5-6bcc2538afa8","detailedMessage":null,"responseMessages":[{"code":"INVALID_REQUEST","level":"ERROR","message":"Invalid request: Authorization is mandatory for custom triggers in px7xd_BFRCi-pfWPYXVjvw:default:Docs. Please add X-Api-Key header in the request","exception":null,"failureTypes":[]}],"metadata":null}
```

## Requirements

Make sure you have:
* An account (service or user) [API key](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys/).

## Mandate Authorization in Default Settings
Customers can set the following authorization on the Account, Organization, or Project level. 

1. Go to the appropriate setting for the scope (in this example, **Account Settings**)
2. Click on the **Default Settings** and go to the **Pipeline** section
3. In the section, there is a setting labelled *Mandate Authroization for Custom Webhook Triggers*.  Set this to True.
   ![](./static/mandateauthorization.png)
4. When the Allow Overrides box is selected at the account level, Harness users will be able to select a different value for this setting at project level.  For example a project, in Default Settings > Pipeline may have a a different value for Mandate Authorization for Custom Webhook Triggers, when compared to the Account or Organization settings.
Remove the ability to **override** this setting to ensure that the authorization is enforced and cannot be adjusted.


## Set up appropriate RBAC Permissions for the API Key
The account (service or user) must have enough permissions to perform the actions.  If permissions are not set properly, Harness will advise about the lack of access due to missing permissions.  Administrators should generally need to provide  access for the pipeline, the services, and the environment.

For more information about setting appropriate permissions, please visit [the Harness documentation on Role-Based Access Control](https://developer.harness.io/docs/internal-developer-portal/rbac/resources-roles/)
   ![](./static/trigger-accessdenied.png)

## Set up the appropriate Custom Trigger for the pipeline
Customers can then set up their Custom Trigger as [outlined in the Harness Documentation](https://developer.harness.io/docs/platform/triggers/trigger-deployments-using-custom-triggers/)

It is highly recommended that teams test their Custom Trigger settings to ensure the appropriate amount of access has been provided to the accounts in question.  This can be accomplished by cURLing the webhook and utilizing the appropriate API token
   ![](./static/trigger-curl.png)