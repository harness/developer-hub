---
title: Use the setting API to enable SCIM API authentication through JWT
description: Enable SCIM API authentication through JSON Web Tokens.
sidebar_position: 2
---

You can use JWT to access Harness SCIM APIs. To do this, you must first configure the settings corresponding to JWT using the [Setting API](https://apidocs.harness.io/tag/Setting#operation/updateSettingValue)

## Prerequisites

- Make sure you have the **View** and **Edit** permissions for the **Default Settings** at the account scope.
  For more information on assigning permissions, see [Create a Custom Resource Group](../../4_Role-Based-Access-Control/10-set-up-rbac-pipelines.md#step-2-create-a-custom-resource-group), [Create a Custom Role](../../4_Role-Based-Access-Control/10-set-up-rbac-pipelines.md#step-3-create-a-custom-role), and [Role-based access control quick start](../../4_Role-Based-Access-Control/10-set-up-rbac-pipelines.md).
- Make sure you have an active API key and a corresponding token. For more information, see [Create an API Key](../../3_User-Management/7-add-and-manage-api-keys.md#create-personal-access-token).
  
## Create a service account in Harness

You must have a service account in Harness to authorize access to the API. You can either create a new service account or use an existing service account in Harness.

To create a new service account, perform the following steps:

1. In app.harness.io, click **Account Settings**.
2. Select **Access Control**.
3. Select **Service Accounts** and then select **New Service Account**.
4. Enter your name and email address for this account.
5. Select **Save**.
   For more information, see Create a [service account](../../3_User-Management/6-add-and-manage-service-account.md).
6. Your service account now appears in the **Service Account** list. Select ** Manage Roles** next to the service account you just created to assign role bindings to the service account you just created.
7. Assign the following permissions to the service account:
    - **View**, **Manage**, and **Invite** users.
    - **View** and **Manage** user groups.
  For more information on assigning permissions, see [Create a Custom Resource Group](../../4_Role-Based-Access-Control/10-set-up-rbac-pipelines.md#step-2-create-a-custom-resource-group), [Create a Custom Role](../../4_Role-Based-Access-Control/10-set-up-rbac-pipelines.md#step-3-create-a-custom-role), and [Role-based access control quick start](../../4_Role-Based-Access-Control/10-set-up-rbac-pipelines.md).

## Configure settings to enable JWT authentication

   Use the following curl command to update the settings corresponding to the JWT authentication:
            
        curl --location --request PUT 'https://app.harness.io/gateway/ng/api/settings?accountIdentifier={accountidentifier}' \
            --header 'Connection: keep-alive' \
            --header 'x-api-key: {pat}' \
            --header 'Accept: */*' \
            --header 'Accept-Language: en-US,en;q=0.9' \
            --header 'Content-Type: application/json' \
            --data-raw '[
                {
                    "identifier": "scim_jwt_token_jwks_keys_url",
                    "value": "{value}",
                    "allowOverrides": false,
                    "updateType": "UPDATE"
                },
                {
                    "identifier": "scim_jwt_token_key_field",
                    "value": "{value}",
                    "allowOverrides": false,
                    "updateType": "UPDATE"
                },
                {
                    "identifier": "scim_jwt_token_value_field",
                    "value": "{value}t",
                    "allowOverrides": false,
                    "updateType": "UPDATE"
                },
                {
                    "identifier": "scim_jwt_token_service_account_id",
                    "value": "{serviceaccountid}",
                    "allowOverrides": false,
                    "updateType": "UPDATE"
            }
        ]'


Replace {serviceaccountid} with the ID for the service account you created in the previous section.
