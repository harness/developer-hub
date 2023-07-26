---
title: Use a JWT token for Harness SCIM API authentication
description: Access SCIM APIs through JWT Token.
sidebar_position: 4
---


:::note
Currently, this feature is behind the feature flag, `PL_SUPPORT_JWT_TOKEN_SCIM_API`. Contact Harness Support to enable the feature.
:::


You can access the Harness SCIM API by using a JWT token. You can use email addresses other than the ones you have registered with Harness, for identity provider authentication. After successful authentication, you can invoke the Harness SCIM APIs by using the JWT token.

To do this, you must enable the **SCIM JWT** token settings through the [Setting API](https://apidocs.harness.io/tag/Setting).

:::note
These settings become effective 120 seconds after you update them.
:::

- Use the settings API to configure the following settings:
    - `keyField`: Distinguished field to match the JWT claims map.
    - `valueField`: Value corresponding to the keyField.
    - `publicJwtKeysUrl`: Endpoint for the JWT keys JSON data.
    - `ServiceAccountId`: Identifier string of a service account that is assigned to roles in Harness.
  For more information, see [Use the Settings API](../../Resource-Development/16_APIs/api-quickstart.md).

## Permissions
- Make sure you have the **Manage** and **View** permissions for users and user groups. 

## Invoke the SCIM API by using a JWT token
1. Enter your JWT token in the `Bearer header`.
  Harness validates the following to complete the authentication:
  - Authenticity of the issued JWT token. For this validation, Harness uses the public JWT keys URL.
  - Claims in the JWT token. Harness matches the claims in the token to those defined in the account settings.
2. Use the following curl command to fetch all the users by using a JWT token: 
   
   
   
```
  curl --location --request GET 'https://app.harness.io/gateway/ng/api/scim/account/{accountidentifier}/Users' \
     --header 'Connection: keep-alive'\
     --header 'Accept: application/scim+json'\
     --header 'Authorization: Bearer {jwt-token}\
     --header 'Cookie: _cfuvid=COCyWepiLvyIhJDcwPeDdyn0O4d0izT_9RmsSBdZeto-1671543314445-0-604811088'
```
   
   Replace {accountidentifier} with your Harness account ID and {jwt-token} with your JWT token.



