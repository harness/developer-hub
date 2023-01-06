---
title: Use the Setting API
description: Configure settings to enable authentication of SCIM APIs through JWT tokens.
sidebar_position: 3
---

You can use JWT Tokens to access Harness SCIM APIs. To do this, you must first configure the settings corresponding to JWT token using the [Setting API](https://apidocs.harness.io/tag/Setting#operation/updateSettingValue)

## Prerequisites

- Make sure you have the **View** and **Edit** permissions for the **Default Settings** at the account scope.
- Make sure you have an active API key and a corresponding token. For more information, see [Create an API Key](../4_Role-Based-Access-Control/7-add-and-manage-api-keys.md#create-personal-access-token)
  
## Create a service account in Harness

1. In Harness, click **Account Settings**.
2. Click **Access Control**.
3. Click **Service Accounts** and then click **New Service Account**.
4. Enter a name and email address for this account.
5. Click **Save**.
   For more information, see Create a [service account](../4_Role-Based-Access-Control/6-add-and-manage-service-account.md).
6. Your service account now appears in **Service Account**. Click ** Manage Roles** against the service account you just created to assign role bindings to the service account you just created.
7. Assign the following permissions to the service account:
    - **View**, **Manage**, and **Invite** users.
    - **View** and **Manage** user groups.
  For more information on assigning permissions, see [Create a Custom Resource Group](../4_Role-Based-Access-Control/10-set-up-rbac-pipelines.md#step-2-create-a-custom-resource-group), [Create a Custom Role](../4_Role-Based-Access-Control/10-set-up-rbac-pipelines.md#step-3-create-a-custom-role), and [Role-based access control quick start](../4_Role-Based-Access-Control/10-set-up-rbac-pipelines.md).

## Configure settings to enable JWT token authentication

   Use the following curl command to update the settings corresponding to the JWT Token authentication:
            
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