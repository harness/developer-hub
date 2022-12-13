---
title: Use Users and Groups API
description: Provides examples of how to create Harness users and user groups, and how to assign permissions to the users and User Groups, using API calls.
sidebar_position: 200
helpdocs_topic_id: p9ssx4cv5t
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides examples of how to create Harness users and user groups, and how to assign permissions to the users and User Groups, using API calls.


## Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)
* [API Schema and Structure](api-schema-and-structure.md)

## Create a User

This sample shows how to create a user in your Harness account, and assigns the user to up to five Harness User Groups.

See [clientMutationId](harness-api.md#use-client-mutation-id-optional) and [userGroupId](use-api-to-retrieve-i-ds-by-name.md#fetch-user-group-id-by-name).  



```
mutation createUser($user: CreateUserInput!) {  
  createUser(input: $user) {  
    user {  
      id  
      email  
      name  
      userGroups(limit: 5) {  
        nodes {  
          id  
          name  
        }  
      }  
    }  
    clientMutationId  
  }  
}
```
### Sample Query Variables for Create User

Values are required for the `email`, `name`, and `userGroupIds` variables.


```
{  
  "user": {  
    "name": "Joyce Silva",  
    "email": "jsilva@example.com",  
    "clientMutationId": "ssdsdsecved",  
    "userGroupIds": ["7mejLPDtRvOCF8K3roIEVg"]  
  }  
}
```
## Delete a User

Update:


```
mutation ($input: DeleteUserInput!) {  
  deleteUser(input: $input) {  
    clientMutationId  
  }  
}
```
Variables, where you supply a user ID, such as `Gh4P71mhQkCydNbKtUIiJg`:


```
query variables:  
{  
  "input": {  
    "id": "<user_ID>"  
  }  
}
```
## Create a User Group

This sample shows how to create a User Group in your Harness account, and (optionally) assign users to the new group.


```
mutation($userGroup: CreateUserGroupInput!){  
  createUserGroup (input:$userGroup) {  
    userGroup {  
      id  
      name  
      description  
      isSSOLinked  
      importedByScim  
      users(limit: 190, offset: 0) {  
        pageInfo {  
          total  
        }  
        nodes {  
          name  
          email  
        }  
      }  
      notificationSettings {  
        sendNotificationToMembers  
        sendMailToNewMembers  
        slackNotificationSetting {  
          slackChannelName  
          slackWebhookURL  
        }  
        groupEmailAddresses  
      }  
    }  
  }  
}
```
### Sample Query Variables for Create Group

The `name` variable requires a value, which must be unique in your Harness account.


```
{  
  "userGroup": {  
    "name" : "Notification",  
    "userIds": ["SArz5MsSS8y2PNbwhc8INw","W_zq_nwvTCm50wX3cI6Nhw","Pbx8egtqTMCClUGNg00PTw"]  
  }  
}
```
## Assign Permissions

This sample shows how to assign permissions to Harness User Groups.


```
mutation($userGroup: UpdateUserGroupPermissionsInput!){  
  updateUserGroupPermissions (input:$userGroup) {  
      permissions {  
        accountPermissions{  
          accountPermissionTypes  
        }  
        appPermissions {  
          permissionType  
          applications {  
            filterType  
            appIds  
          }  
          services {  
            filterType  
            serviceIds  
          }  
          environments {  
            filterTypes  
            envIds  
          }  
          workflows {  
            filterTypes  
            envIds  
          }  
          deployments {  
            filterTypes  
            envIds  
          }  
          pipelines {  
            filterTypes  
            envIds  
          }  
          provisioners {  
            filterType  
            provisionerIds  
          }  
          actions  
        }  
      }  
    }  
  }
```
### Sample Query Variables for Assign Permissions

A value is required for the `userGroupId` variable. 


```
{  
  "userGroup": {  
    "userGroupId": "KYppi5LjSdCYH8DLT34exA",  
    "permissions": {  
      "accountPermissions": {  
       "accountPermissionTypes":  ["READ_USERS_AND_GROUPS","MANAGE_USERS_AND_GROUPS","MANAGE_TAGS","ADMINISTER_OTHER_ACCOUNT_FUNCTIONS","MANAGE_TEMPLATE_LIBRARY","VIEW_AUDITS"]  
      },  
      "appPermissions": [  
        {  
          "permissionType": "ALL",  
          "applications": {  
            "appIds": ["A0M4nZJJTQekFfp4lX71Zw","g7sJZKmMRd-oHWdjsjF0ZQ"]  
          },  
          "actions": ["CREATE","DELETE","READ","UPDATE"]  
        },  
        {  
          "permissionType": "SERVICE",  
          "applications": {  
            "filterType": "ALL"  
          },  
          "services": {  
            "filterType": "ALL"  
          },  
          "actions": ["CREATE","DELETE","READ","UPDATE"]  
        },  
        {  
          "permissionType": "ENV",  
          "applications": {  
            "appIds": ["A0M4nZJJTQekFfp4lX71Zw","g7sJZKmMRd-oHWdjsjF0ZQ"]  
          },  
          "environments": {  
            "envIds":  ["hRCUcsHmSPaHA7LXKzosAw","m7d7Kg2TQlKrrlbcnPUY5A"]  
          },  
          "actions": ["READ","UPDATE"]  
        }  
      ]  
    }  
  }  
}
```
The JSON in the above example sets three sets of permissions:

* Enables the User Group's members to perform all four CRUD operations on two Applications, specified by `appId`s:

  ```
  {  
    "permissionType": "ALL",  
    "applications": {  
      "appIds": [  
        "A0M4nZJJTQekFfp4lX71Zw",  
        "g7sJZKmMRd-oHWdjsjF0ZQ"  
      ]  
    },  
    "actions": ["CREATE", "DELETE", "READ", "UPDATE"]  
  }
  ```

* Grants permission to perform all CRUD operations on all Services, across all Applications:

  ```
   {  
    "permissionType": "SERVICE",  
    "applications": {  
      "filterType": "ALL"  
    },  
    "services": {  
      "filterType": "ALL"  
    },  
    "actions": ["CREATE", "DELETE", "READ", "UPDATE"]  
  }
  ```

* Grants permission to perform the specified operations on the specified Environments:

  ```
  {  
    "permissionType": "ENV",  
    "applications": {  
      "appIds": [  
        "A0M4nZJJTQekFfp4lX71Zw",  
        "g7sJZKmMRd-oHWdjsjF0ZQ"  
      ]  
    },  
    "environments": {  
      "envIds": [  
        "hRCUcsHmSPaHA7LXKzosAw",  
        "m7d7Kg2TQlKrrlbcnPUY5A"  
      ]  
    },  
    "actions": ["READ","UPDATE"]  
  }
  ```
  
### Notes on updateUserGroupPermissions

Beyond the `userGroupId` requirement, note these usage details for the `updateUserGroupPermissions` operation:

1. This API completely overwrites any permissions previously set for the specified User Groups.
2. To scope the Harness Applications on which you are granting permission, you should either supply specific `appId`s, or supply a `filterType`.
3. You cannot set the `MANAGE_USERS_AND_GROUPS` permission without first setting `READ_USERS_AND_GROUPS`.

For information on deprecated API features with their replacements, see [Deprecated API Features](deprecated-apis.md).

## Querying Users

Here is a simple way to query for users:


```
{  
  users(limit: 10) {  
    nodes {  
      email  
      id  
      isEmailVerified  
      isImportedFromIdentityProvider  
      isPasswordExpired  
      isTwoFactorAuthenticationEnabled  
      isUserLocked  
      name  
      userGroups(limit: 10) {  
        nodes {  
          id  
          name  
        }  
      }  
    }  
  }  
}
```

Here is a simply query that shows user names and demonstrates pagination:

```
{  
  users(limit: 20, offset: 0) {  
    pageInfo {  
      total  
      limit  
      hasMore  
      offset  
    }  
    nodes {  
      name  
    }  
  }  
}
```
