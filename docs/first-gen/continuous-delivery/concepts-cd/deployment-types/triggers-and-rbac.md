---
title: Triggers and RBAC
description: This content is for Harness FirstGen. Switch to NextGen. A Trigger involves multiple settings, including Service, Environment, and Workflow specifications. Harness examines these components as you se…
# sidebar_position: 2
helpdocs_topic_id: su0wpdarqi
helpdocs_category_id: vbcmo6ltg7
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](../../../../platform/4_Role-Based-Access-Control/1-rbac-in-harness.md).A Trigger involves multiple settings, including Service, Environment, and Workflow specifications. Harness examines these components as you set up a Trigger.

You might be authorized for one component selected in a Trigger, such as a Service, but not another, such as an Environment. In these cases, an error message will alert you to missing authorizations.

To determine if you are authorized to create Triggers for a particular Environment or other components, review:

* All the permissions of your Harness User Group. The User Group Application Permissions should include the **Deployments** Permission Type and **Execute Workflow** and/or **Execute Pipeline** Action for the Harness Application(s) with the Triggers you want Users to execute.
* The Usage Scope of the Cloud Provider, and of any other Harness connectors you have set up.

For further details, see [Managing Users and Groups (RBAC)](../../../firstgen-platform/security/access-management-howtos/users-and-permissions.md) and [Connectors Overview](../../../firstgen-platform/account/manage-connectors/harness-connectors.md).

Below are some errors that can occur.

#### User does not have "Deployment: execute" permission

Error messages of the form `User does not have "Deployment: execute" permission` indicate that your user group's **Application Permissions** > **Action** settings do not include **execute** in the scope of the specified Application and/or Environment. To resolve this, see [Application Permissions](../../../firstgen-platform/security/access-management-howtos/users-and-permissions.md#application-permissions).

#### User not authorized

The following error message indicates that a non-Administrator has tried to submit a Trigger whose **Workflow Variables: Environment** field is configured with a variable, rather than with a static Environment name:

`User not authorized: Only members of the Account Administrator user group can create or update  Triggers with parameterized variables`

Submitting a Pipeline Trigger that includes such a Workflow will generate the same error.

One resolution is to set the **Environment** field to a static value. But if the **Environment** setting must be dynamic, a member of the Account Administrator user group will need to configure and submit the Trigger.

### See Also

* You can use settings to enforce authorization on some Triggers. See [Trigger a Deployment using cURL](../../model-cd-pipeline/triggers/trigger-a-deployment-using-c-url.md).

