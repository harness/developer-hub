---
title: Use API to Retrieve IDs by Name
description: Describes how to use API to retrieve IDs by name.
sidebar_position: 220
helpdocs_topic_id: iuswbbvwnm
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

You can retrieve `applicationId`, `userIds`, and `userGroupId` object IDs (respectively) by using the `applicationByName`, `userByName`, and `userGroupByName` operations. Each of these queries takes a required `name` argument, as a string.

Below are the sample queries for each of these retrieval operations. It is followed by round-trip examples of looking up an ID by name and then passing it as an argument to a second query.


## Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)
* [API Schema and Structure](api-schema-and-structure.md)

## Fetch Application ID by Name

Use this sample query to get the `applicationId` for a Harness Application.

### Request


```
{  
  applicationByName(name:"Harness Sample App") {  
    id  
  }  
}
```
### Response


```
{  
  "data": {  
    "applicationByName": {  
      "id": "-XZGAqR6QIeBRXz-VuwIzA"  
    }  
  }  
}
```
## Fetch User ID and Details by Name

Use this sample query to retrieve the `userGroupId` value for a Harness User and to confirm the user's name and email verification status.

### Request


```
{  
  userByName(name:"test"){  
    name  
    id  
    isEmailVerified  
  }  
}
```
### Response


```
{  
  "data": {  
    "userByName": {  
      "name": "test",  
      "id": "XlbrFu5ARfGlpxfMFgE_Tw",  
      "isEmailVerified": true  
    }  
  }  
}
```
## Fetch User Group ID by Name

Use this sample query to retrieve the `userGroupId` value for a Harness User Group and to confirm the group's name.

### Request


```
{  
  userGroupByName(name:"Account Administrator"){  
    name  
    id  
  }  
}
```
### Response


```
{  
  "data": {  
    "userGroupByName": {  
      "name": "Account Administrator",  
      "id": "yeaF0GXZR9KzH2VViRdazg"  
    }  
  }  
}
```
## Round-Trip Example

After using one of the above queries to obtain an object's ID, you can pass this ID to queries that require an ID argument.

Use this sample query to get the `applicationId` .

**Request**


```
{  
  applicationByName(name:"Harness Sample App") {  
    id  
  }  
}
```
**Response**


```
{  
  "data": {  
    "applicationByName": {  
      "id": "xkZzxocSQ3-ne2m92mUVQw"  
    }  
  }  
}
```
Use the returned `id` as the `applicationId` argument in a query for fetching the list of Workflows in this Application.

**Request**


```
{  
  workflows(filters: {application: {values: ["xkZzxocSQ3-ne2m92mUVQw"], operator: IN}}, limit: 5) {  
    nodes {  
      id  
      name  
      createdAt  
    }  
  }  
}
```
**Response**


```
{  
  "data": {  
    "workflows": {  
      "nodes": [  
        {  
          "id": "xqZzrmcSQ3-ne2m53mUVQw",  
          "name": "Verification Service-simple",  
          "createdAt": 1582246743673  
        },  
        {  
          "id": "iPLNQBZATYKEB9Lgx_JyJQ",  
          "name": "Redis Sentinel PR",  
          "createdAt": 1581945346231  
        }  
      ]  
    }  
  }  
}
```
