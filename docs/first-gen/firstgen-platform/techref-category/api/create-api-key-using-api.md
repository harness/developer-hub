---
title: Manage API Keys using the Harness API
description: This topic describes how to create an API Key using Harness API.
sidebar_position: 410
helpdocs_topic_id: o0bsjt966y
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

To integrate Harness with some third-party apps, you need to register Harness with the app and then supply a Harness API key. The API key is a simple encrypted string that other applications can use to access Harness without a private Harness account.

This topic lists sample queries that create, update, and delete Harness API keys using the Harness API. For steps to create, edit, and delete API keys from Harness UI, see [Harness API Keys](../../security/access-management-howtos/api-keys.md).

## Before You Begin

* Review the [Harness API](harness-api.md)
* [Harness API Keys](../../security/access-management-howtos/api-keys.md)

## Create an API Key

Harness API key uniquely identifies your Harness account and authorizes access to your account data.

For steps to create API Key from Harness UI, see [Create an API Key](../../security/access-management-howtos/api-keys.md#create-an-api-key).

### Request

You can create a Harness API Key using the mutation `createApiKey`.

It has the following syntax:


```
mutation ($input: CreateApiKeyInput!) {  
  createApiKey(input: $input) {  
    name  
    clientMutationId  
    uuid  
  }  
}
```
### Query Variables

Use the following query variables to create an API Key. The `accountId` parameter specifies the account where you are creating the API Key.


```
{  
  "input": {  
  "accountId": "rIeFDjoySXqrDQcIZ9ltDA",  
  "clientMutationId": "gafs",  
  "name": "example",  
  "userGroupIds": ["QkV4F3RRRiCIU-MgXaK2ZQ"]  
  }  
}
```
This will give you an output with the UUID for the newly created API key which you can use for updating or deleting this API Key.


```
{  
  "data": {  
    "createApiKey": {  
      "name": "example1",  
      "clientMutationId": "example",  
      "uuid": "4L2X2JLSQe2DnjOwBXj0TQ"  
    }  
  }  
}
```
## Update an API Key

You can update an existing API key to add or remove User Groups from which it inherits the permissions.

For steps to edit an API key from Harness UI, see [Edit an API Key](../../security/access-management-howtos/api-keys.md#edit-an-api-key).

### Request

You can update a Harness API Key using the mutation `updateApiKey`. 

It has the following syntax:


```
mutation($input: UpdateApiKeyInput!){  
    updateApiKey(input: $input){  
    clientMutationId  
    name  
    uuid  
    }  
}
```
### Query Variables

Use these query variables to create an API Key. The `uuid` specifies the id of the API Key you want to update. For steps to get the **UUID** for the API Key, See [Create an API Key](create-api-key-using-api.md#create-an-api-key).


```
{  
    "input": {  
    "uuid": "k-dLWJuFQ9izcC70jRZBpA",  
    "accountId": "rIeFDjoySXqrDQcIZ9ltDA",  
     "name": "doc_example_update",  
     "clientMutationId": "gafs",  
     "userGroupIds": ["QkV4F3RRRiCIU-MgXaK2ZQ"]  
     }  
}
```
## Delete an API Key

You can delete an existing API key at any point in time. 

For steps to delete an API key from Harness UI see [API Keys](../../security/access-management-howtos/api-keys.md#api-keys).

### Request

You can delete a Harness API Key using the mutation `deleteApiKey`.

It has the following syntax:


```
mutation ($input: DeleteApiKeyInput!) {  
  deleteApiKey(input: $input) {  
    clientMutationId  
  }  
}  

```
### Query Variables

Use these query variables to create an API Key. The `uuid` specifies the id of the API Key you want to delete. For steps to get the **UUID** for the API Key, See [Create an API Key](create-api-key-using-api.md#create-an-api-key).


```
{  
    "input": {  
     "uuid": "k-dLWJuFQ9izcC70jRZBpA",  
    "accountId": "rIeFDjoySXqrDQcIZ9ltDA"  
     }  
}
```
