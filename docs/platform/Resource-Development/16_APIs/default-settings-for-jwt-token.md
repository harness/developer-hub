---
title: Use the Setting API to enable SCIM API authentication through JWT
description: Enable SCIM API authentication through JSON Web Tokens.
sidebar_position: 3
---

You can use JSON Web Tokens (JWT) for authentication with Harness SCIM APIs. To do this, you use the [Harness Setting API](https://apidocs.harness.io/tag/Setting) to configure the settings corresponding to JWT.

## Requirements

- You need **View** and **Edit** [permissions](../../role-based-access-control/permissions-reference.md) for **Default Settings** at the account [scope](../../role-based-access-control/rbac-in-harness.md#permissions-hierarchy-scopes).
- You must be able to create service accounts.
- You need an [API key and an unexpired token](/docs/platform/Resource-Development/APIs/add-and-manage-api-keys).
- You need your [Harness account ID](./api-quickstart.md#get-your-account-id).

## Prepare the service account

A Harness service account is necessary to authorize access to the API. The service account must have these permissions:

* Users: **View**, **Manage**, and **Invite**.
* User groups: **View** and **Manage**.

You can create a new service account or use an existing one. For more information, go to [Manage service accounts](../../role-based-access-control/add-and-manage-service-account.md).

To create a service account:

1. In Harness, select **Account Settings**, and then select **Access Control**.
3. Select **Service Accounts** in the header, and then select **New Service Account**.
4. Enter a **Name** and **Email** for the service account.
5. Make note of the **Id** that is generated based on the **Name**. You need the **Id** to [Enable JWT authentication](#enable-jwt-authentication).
6. Select **Save**.
7. Select **Manage Roles** next to the new service account and select a role and resource group that provide the following permissions:

   * Users: **View**, **Manage**, and **Invite**.
   * User groups: **View** and **Manage**.

   For more information on roles, resource groups, and permissions, go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness).

## Enable JWT authentication

The following `curl` command to send a request to the [Setting API](https://apidocs.harness.io/tag/Setting) to update the settings required to enable JWT authentication. To use this command:

* Replace `SERVICE_ACCOUNT_ID` with the ID for your [Harness service account](#prepare-the-service-account).
* Replace `ACCOUNT_ID` with your [Harness account ID](./api-quickstart.md#get-your-account-id).
* Replace `API_KEY_TOKEN` with your [personal access token](./add-and-manage-api-keys.md#create-personal-api-keys-and-tokens).
* Replace `KEY_FIELD_VALUE` with the identifier for a field corresponding to the JWT claims map.
* Replace `VALUE_FIELD_VALUE` with the value corresponding with the key field.
* Replace `JWT_KEYS_URL_VALUE` with the endpoint for the JWT keys JSON data.

```
        curl --location --request PUT 'https://app.harness.io/gateway/ng/api/settings?accountIdentifier=ACCOUNT_ID' \
            --header 'Connection: keep-alive' \
            --header 'x-api-key: API_KEY_TOKEN' \
            --header 'Accept: */*' \
            --header 'Accept-Language: en-US,en;q=0.9' \
            --header 'Content-Type: application/json' \
            --data-raw '[
                {
                    "identifier": "scim_jwt_token_jwks_keys_url",
                    "value": "JWT_KEYS_URL_VALUE",
                    "allowOverrides": false,
                    "updateType": "UPDATE"
                },
                {
                    "identifier": "scim_jwt_token_key_field",
                    "value": "KEY_FIELD_VALUE",
                    "allowOverrides": false,
                    "updateType": "UPDATE"
                },
                {
                    "identifier": "scim_jwt_token_value_field",
                    "value": "VALUE_FIELD_VALUE",
                    "allowOverrides": false,
                    "updateType": "UPDATE"
                },
                {
                    "identifier": "scim_jwt_token_service_account_id",
                    "value": "SERVICE_ACCOUNT_ID",
                    "allowOverrides": false,
                    "updateType": "UPDATE"
            }
        ]'
```

Settings take effect 120 seconds after a successful request.

## Use a JWT for Harness SCIM API authentication

:::note

Currently, this feature is behind the feature flag `PL_SUPPORT_JWT_TOKEN_SCIM_API`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

You can access the Harness SCIM API by using JSON Web Tokens (JWT). This allows you to use email addresses, other than the ones you have registered with Harness, for IdP authentication. After successful authentication, you can use a JWT to invoke the Harness SCIM APIs.

1. Make sure you have permission to **Manage** and **View** users and user groups.
2. [Enable JWT authentication](#enable-jwt-authentication).
3. Use your JWT in `Bearer` headers in SCIM API requests, such as `--header 'Authorization: Bearer JWT_TOKEN'`.

For example, the following `curl` command fetches a list of all users in your Harness account, and it uses the JWT for authentication. To use this command, you must replace `JWT_TOKEN` in the `Bearer` header with your JWT, and you need to replace `ACCOUNT_ID` with your Harness account ID.

```
  curl --location --request GET 'https://app.harness.io/gateway/ng/api/scim/account/ACCOUNT_ID/Users' \
     --header 'Connection: keep-alive' \
     --header 'Accept: application/scim+json' \
     --header 'Authorization: Bearer JWT_TOKEN' \
     --header 'Cookie: _cfuvid=CO...88'
```

To complete authentication, Harness validates the following:

* The authenticity of the issued JWT. To do this, Harness uses the public JWT keys URL specified when you [enabled JWT authentication](#enable-jwt-authentication).
* The claims in the JWT token. Harness matches the claims in the token to those defined in the account settings when you [enabled JWT authentication](#enable-jwt-authentication).
