---
title: Use HashiCorp Vault Secrets Manager API
description: Harness includes a built-in Secrets Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness Applications. This topic describes how to create,…
sidebar_position: 320
helpdocs_topic_id: ehovbje4p1
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness includes a built-in Secrets Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness Applications.

This topic describes how to create, read, update, and delete HashiCorp Vault Secrets Manager using Harness API.

### Before You Begin

* Review the [Harness API](harness-api.md)
* Review [Secrets Management Overview](../../security/secrets-management/secret-management.md)
* [Add a HashiCorp Vault Secrets Manager](../../security/secrets-management/add-a-hashi-corp-vault-secrets-manager.md)

### Create a Secret Manager Using HashiCorp Vault

Use this sample query to create a Secret Manager.

#### Request

You create a Secret Manager using the mutation `createSecretManager`.


```
mutation CreateSecretManagerMutation($secretManagerInput: CreateSecretManagerInput!) {  
  createSecretManager(input: $secretManagerInput) {  
    secretManager {  
      id  
    }  
  }  
}
```
#### Query Variables

The Query Variables follow this syntax, with `secretManagerType` identifying the Secret Manager to create.

* **Authentication**: To get the authentication token, you can use [Token](../../security/secrets-management/add-a-hashi-corp-vault-secrets-manager.md#option-token) or [App Role](../../security/secrets-management/add-a-hashi-corp-vault-secrets-manager.md#option-app-role-method) method.
* **Secret Engine**: Identify the engine name and version of the Secret Manager in Vault. See [Manually Enter Secret Engine](../../security/secrets-management/add-a-hashi-corp-vault-secrets-manager.md#manually-enter-secret-engine).


```
{  
  "secretManagerInput": {  
    "secretManagerType": "HASHICORP_VAULT",  
    "hashicorpVaultConfigInput": {  
      "name": "abc test 222",  
      "vaultUrl": "https://vaultqa.test.io",  
      "basePath": "harness",  
      "secretEngineName": "harness-test",  
      "secretEngineVersion": 1,  
      "secretEngineRenewalInterval": 60,  
      "authDetails": {  
        "authToken": "s.xxxxxxxxxxxxx11"  
      },  
      "usageScope": {  
        "appEnvScopes": [  
          {"application": {  
            "filterType": "ALL"  
          },  
          "environment": {  
            "filterType": "PRODUCTION_ENVIRONMENTS"  
          }  
        }  
      ]  
    }  
  }  
}
```
### Update a Secret Manager Using HashiCorp Vault

Use this sample query to update a Secret Manager.

#### Request

You update a Secret Manager using the mutation `updateSecretManager`.


```
mutation UpdateSecretManagerMutation($input: UpdateSecretManagerInput!) {  
  updateSecretManager(input: $input) {  
    secretManager {  
      name  
      id  
    }  
  }  
}  

```
#### Query Variable

The Query Variables follow this syntax, with `secretManagerId` and `secretManagerType` identifying the Secret Manager to update.


```
{  
  "input": {  
    "secretManagerId": "xxxxxxxxxxxxxxxx",  
    "secretManagerType": "HASHICORP_VAULT",  
    "hashicorpVaultConfigInput": {  
      "name": "new name",  
      "isDefault": true,  
      "secretEngineRenewalInterval": 120  
    }  
  }  
}
```
### Delete a Secret Manager Using HashiCorp Vault

Use this sample query to delete a Secret Manager.

#### Request

You delete a Secret Manager using the mutation `deleteSecretManager`.


```
mutation DeleteSecretManagerMutation($input: DeleteSecretManagerInput!){  
  deleteSecretManager(input: $input){  
   clientMutationId  
  }  
}
```
#### Query Variable

The Query Variables follow this syntax, with `secretManagerId`  identifying the Secret Manager to delete.


```
{  
  "input": {  
    "clientMutationId": "xPxNsOusEaAsdQifDdGxx",  
    "secretManagerId": "ZZZ07Kh4SC2sI_unqKqXxX"  
  }  
}
```
