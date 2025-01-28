---
title: Manage API key roles and scopes
sidebar_label: Manage API key roles and scopes
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/20685635523981-Managing-API-key-roles-and-scopes <br /> ✘ images still hosted on help.split.io </button>
</p>

Managing Admin API key roles and scopes

Split enables you to restrict the access level of API keys in two ways:

1. Specifying **roles** for the API key: This limits what resource types an API key can access
2. Specifying a **scope** for the API key: This limits the reach of the API key across [environments](https://help.split.io/hc/en-us/articles/360019915771), a [project](https://help.split.io/hc/en-us/articles/360023534451-Projects), or the whole account.

While Split client-side and server-side SDK API keys are always scoped to a specific _environment_, Admin API keys can be tuned to granular access levels by creating them with a **role** and **scope** [using the Split API](https://docs.split.io/reference/create-an-api-key). This page describes the roles and scopes that can be applied when creating **_Admin API keys_**.


## Choose the right role

The role given to an Admin API key aims to limit the access and operations a key can perform within Split within two functional areas: Administrative Permissions and Resource (Feature Flag & Segment) Permissions.

|                                         | Role                     | String Identifier       | Permission Granted                                                                                                                                                                                                                                          | 
|-----------------------------------------|--------------------------|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Administrative Permissions              | Full Permissions Role    | API_ALL_GRANTED         | A key with this role grants access to all of your Account’s settings and resources via Split API.                                                                                                                                                      |
|                                         | Api Key Role             | API_APIKEY              | A key with this role allows the creation and deletion of other API Keys.                                                                                                                                                                                    |
|                                         | Account Administrator Role      | API_ADMIN               | Reduced Admin capabilities. This role enables administration of the account from the API. However, this role excludes permission to manage API keys and the following resources: feature flags segments, change requests, tags, and rollout statuses.  |
|                                         | Project Administrator Role                         | API_WORKSPACE_ADMIN     | Admin capabilities within a project (formerly called a workspace), similar to API_ADMIN, but excluding permission to manage users and groups.                                                                                                                                           |
| **Resource Permissions:** Feature Flags | Feature Flag Viewer Role | API_FEATURE_FLAG_VIEWER | View-only access to feature flags, including permission to view associated change requests  and rollout-board information.                                                                                                                                  |
|                                         | Feature Flag Owner Role  | API_FEATURE_FLAG_EDITOR | Grants access to all feature flag operations including operations related to associated tags, change requests and rollout-board information.                                                                                                                |
| **Resource Permissions:** Segments      | Segment Viewer Role      | API_SEGMENT_VIEWER      | View-only access to segments including associated tags and change requests.                                                                                                                                                                                 |
|                                         | Segment Owner Role       | API_SEGMENT_EDITOR      | Grants access to all segment operations including operations related to associated tags and change requests.                                                                                                                                                |

Note that roles can be combined together at the time an API key is created to provide the appropriate set of permissions needed to accomplish specific tasks.


## Choose the right scope

An API key can be scoped to limit its reach to:

- Specific environment(s): The API key will grant access to manage the resources (flags, segments, etc.) only within the specific set of environments that are enumerated at the time the API key is created.
- A specific project: The API key will grant access to manage the resources (flags, segments, traffic types, etc.) within only a single project. Access is also granted to manage future environments created within that project.
- The whole account: The API key will grant access to reach resources across the whole Split account. Granted access is effectively unscoped.


## Create a restricted API key

You can use the ___Split API___ to create an Admin API key that has a restricted role or that leverages project and environment scopes. You can also restrict scope of an Admin API key to specific environments in the ___Split UI___. Both approaches are described below.


### Using the Split API to manage roles and scopes

Roles and scopes are assigned to an `Admin` API key (`"apiKeyType": "admin"`) at the moment of its creation via the Split API. Go to [Create an API key](https://docs.split.io/reference/create-an-api-key) to learn more.

Some important considerations:

- Roles and scopes are not editable. A role or scope cannot be changed for an API key after it is created.
- An Admin API Key cannot be used to create another with a broader scope than its own. When creating a new API key, the API key used to [authenticate the request](https://docs.split.io/v2-dev/reference/authentication) must have an equal or greater scope than the scope of the new API key.
- In order to create a new API key, the API key used to [authenticate the request](https://docs.split.io/v2-dev/reference/authentication) must have either the **API\_ALL\_GRANTED** and/or the **API\_APIKEY** role assigned.
- If no value is specified, by default the **API\_ALL\_GRANTED** role is assigned.
- If no scope is specified, by default the account-wide scope is assigned.

The POST API Key endpoint takes a JSON attribute, used to pass in the desired role. For an **_Admin key with full permissions_**, here’s a sample payload you can send to create the role and its expected response.

```
POST: /internal/api/v2/apiKeys
{
  "name": "my_first_restricted_apikey",
  "apiKeyType": "admin",
  "workspace": null,
  "environments": [],
  "roles": ["API_ALL_GRANTED"] 
}
```
```
Response:
{
  "organization": {
    "type": "Organization",
    "id": "your-account-id"
  },
  "environments": [
    {
      "type": "Environment",
      "id": "<<GLOBAL>>"
    }
  ],
  "name": "my_first_restricted_apikey",
  "createdBy": {
    "type": "api_key",
    "id": "641mm**********************"
  },
  "createdAt": 1682722168424,
  "apiKeyType": "admin",
  "roles": [
    "API_ALL_GRANTED"
  ],
  "type": "api_key",
  "key": "b9lnhf***************************"
}
```
Be sure to copy your Admin API key (Line 34 in above example) once it's generated. For security purposes, you won't see the key again.

This is another example of a request to create an **_Admin API key that is scoped to a project_**. 

```
POST: /internal/api/v2/apiKeys`
{
  "name": "my_project_admin_api_key",
  "apiKeyType": "admin",
  "workspace": {
     "type": "workspace",
     "id": "your-project-id"
  },
  "environments": [],
  "roles": ["API_WORKSPACE_ADMIN"]
}
```
```
Response:
{
  "organization": {
    "type": "Organization",
    "id": "your-account-id",
  },
  "environments": [
     {
       "type": "environment",
       "id": "<<GLOBAL>>"
     }
  ],
  "name": "my_project_admin_api_key",
  "createdBy": {
    "type": "api_key",
    "id": "641mm**********************"
  },
  "createdAt": 1691762215442,
  "apiKeyType": "admin",
  "workspace": {
    "type": "workspace",
    "id": "Your-Project-id"
  },
  "roles": [
    "API_WORKSPACE_ADMIN"
  ],
  "type": "api_key",
  "key": "b9lnhf***************************"
}
```

### Using the Split UI to manage scopes

You can also use the Admin settings section in the Split UI to create an Admin API key that is scoped to specific environment(s). At this time, you cannot use this UI to specify a specific role or project scope. Note that all SDK API keys are inherently scoped to a single environment.

<p>
  <img src="https://help.split.io/hc/article_attachments/30838480167437" alt="managing_api_key_roles_and_scopes_create_admin_api_key.png" />
</p>

## Manage a restricted API key

You can revoke and clone restricted Admin API keys using the Split UI as you would an unrestricted key.

<p>
  <img src="https://help.split.io/hc/article_attachments/30838471257869" alt="managing_api_key_roles_and_scopes_api_keys.png" />
</p>

## Ensure your key has the appropriate role to use the API endpoints

Each Split API endpoint has a list of accepted roles that the endpoint will look for on the bearer key that you used to [authorize your API request](https://docs.split.io/v2-dev/reference/authentication). You can see the list of accepted roles by navigating to a specific resource in our [API documentation](https://docs.split.io/v2/reference/create-an-api-key). Additionally, [error codes](https://docs.split.io/v2/reference/error-codes) have been created for cases where requests do not have the appropriate role in the bearer token that was used.
