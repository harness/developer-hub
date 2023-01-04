---
title: Use the Harness SCIM APIs through JWT Token
description: Access SCIM APIs through JWT Token.
---


:::note
Currently, this feature is behind the feature flags `NG_SETTINGS` and `PL_SUPPORT_JWT_TOKEN_SCIM_API`. Contact Harness Support to enable the feature.
:::


Harness SCIM APIs are accessible via JWT token. You can use your email addresses other than the ones you have registered in Harness, for identity provider authentication. After successful authentication, you can invoke the Harness SCIM APIs using the JWT token.

To be able to do this, you must enable the **SCIM JWT Token** in default settings through the Settings API.

:::note
Once you have configured the default settings, SCIM updates pick up the new settings after 120 secs.
:::

- Use the settings API to configure the following settings:
    - `keyField`: this is the distinguished field to match the JWT claims map.
    - `valueField`: this is the value that matches to the above keyField.
    - `publicJwtKeysUrl`: the endpoint for the JWT keys JSON data.
    - `ServiceAccountId`: the identifier string of a service account which is assigned to roles in Harness.
  For more information, see Use Settings API.

## Permissions
- Make sure you have the **Manage** permission for users and user groups. 

## Invoke SCIM API through JWT token
1. Enter your JWT Token in the Bearer header.
   Harness checks the following to complete the authentication:
   - Validate the authenticity of the issued JWT token using the public JWT Keys URL.
   - Validate the JWT token and match the claims to be those defined in the account settings.
2. Use the following curl command to fetch all the users using a JWT token: 
   
   
   
```
  curl --location --request GET 'https://app.harness.io/gateway/ng/api/scim/account/{accountidentifier}/Users' \
     --header 'Connection: keep-alive'\
     --header 'Accept: application/scim+json'\
     --header 'Authorization: Bearer {jwt-token}\
     --header 'Cookie: _cfuvid=COCyWepiLvyIhJDcwPeDdyn0O4d0izT_9RmsSBdZeto-1671543314445-0-604811088'
```
   
   Replace {accountidentifier} with your Harness account ID and {jwt-token} with your JWT token.



