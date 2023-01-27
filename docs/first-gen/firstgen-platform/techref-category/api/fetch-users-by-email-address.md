---
title: Fetch Users By Email Address
description: You can fetch a user by email address using the Harness API, including users that have not accepted invites. In this topic --  Before You Begin. Step 1 --  Fetch Users by Email Address. Limitations. See Al…
sidebar_position: 310
helpdocs_topic_id: 0a9x29s5ym
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

You can fetch a user by email address using the Harness API, including users that have not accepted invites.


### Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)
* [Managing Users and Groups (RBAC)](../../security/access-management-howtos/users-and-permissions.md)
* [Use Users and Groups API](sample-queries-create-users-user-groups-and-assign-permissions.md)

### Step 1: Fetch Users by Email Address

Here is an example of a query fetching a user by email address:


```
{  
  userByEmail(email:"john.smith@example.io"){  
    id,  
    name,  
    isPasswordExpired,  
    isEmailVerified,  
    isImportedFromIdentityProvider,  
    isTwoFactorAuthenticationEnabled  
    userGroups(limit: 10, offset: 0) {  
      nodes {  
        id  
        name  
      }  
    }  
  }  
}
```
Here is the output:


```
{  
  "data": {  
    "userByEmail": {  
      "id": "8posiNJdThedZOCBlrfv4g",  
      "name": "John Smith",  
      "isPasswordExpired": false,  
      "isEmailVerified": true,  
      "isImportedFromIdentityProvider": false,  
      "isTwoFactorAuthenticationEnabled": false,  
      "userGroups": {  
        "nodes": [  
          {  
            "id": "xxxxxx",  
            "name": "Account Administrator"  
          },  
          {  
            "id": "xxxxxx",  
            "name": "CS Dev Mgr"  
          },  
          {  
            "id": "xxxxxx",  
            "name": "Demo"  
          },  
          {  
            "id": "xxxxxx",  
            "name": "PagerDuty"  
          },  
          {  
            "id": "xxxxxx",  
            "name": "admin-se-group"  
          }  
        ]  
      }  
    }  
  }  
}
```
### Limitations

Queries do not support wildcards in email addresses at this time.

### See Also

* [Use Users and Groups API](sample-queries-create-users-user-groups-and-assign-permissions.md)

### Configure As Code

To see how to configure the settings in this topic using YAML, configure the settings in the UI first, and then click the **YAML** editor button.

