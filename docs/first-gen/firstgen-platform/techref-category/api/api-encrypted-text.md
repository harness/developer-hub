---
title: Encrypted Text API
description: Sample GraphQL queries to create, read, update, and delete Harness secrets that rely on encrypted text.
sidebar_position: 230
helpdocs_topic_id: omnfccj1n0
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists sample queries for CRUD operations that create, read, update, and delete [Harness secrets](../../security/secrets-management/secret-management.md) and [Custom Secrets](../../security/secrets-management/add-and-use-a-custom-secrets-manager.md), that rely on encrypted text.

:::note
The `!` following the type means that this field is *required*.
:::

## Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)
* [Scope Secret Managers to Applications and Environments](../../security/secrets-management/scope-secret-managers-to-applications-and-environments.md)
* [Restrict Secrets Usage](../../security/secrets-management/restrict-secrets-usage.md)

## Get a Secret by ID

This sample retrieves an existing encrypted-text secret by its ID.


```
query{  
  secret(secretId: "abCDEF6jQO6tQnB9xxYxxx", secretType: ENCRYPTED_TEXT) {  
    ... on EncryptedText {  
      id  
      name  
      secretManagerId  
      usageScope {  
        appEnvScopes {  
          application {  
            filterType  
            appId  
          }  
          environment {  
            filterType  
            envId  
          }  
        }  
      }  
      inheritScopesFromSM  
      scopedToAccount  
    }  
  }  
}
```
## Get a Secret by Name

This sample uses a `secretByName` query to retrieve an existing secret by its name.


```
query{  
  secretByName(name:"anz-csr-reader",secretType:ENCRYPTED_TEXT){  
... on EncryptedText{  
      id  
      name  
      secretManagerId  
    }  
 }  
}
```
This second sample adds elements to also retrieve the secret's Application and Environment scope.


```
query{  
  secretByName(name: "awstest5_AWS_secretKey", secretType: ENCRYPTED_TEXT) {  
    ... on EncryptedText {  
      id  
      name  
      secretManagerId  
      usageScope {  
        appEnvScopes {  
          application {  
            filterType  
            appId  
          }  
          environment {  
            filterType  
            envId  
          }  
        }  
      }  
      inheritScopesFromSM  
      scopedToAccount  
    }  
  }  
}
```
## Get Secrets Manager IDs

To [create](#create) a secret, you need the secrets manager's Harness ID (`secretManagerId`). This sample retrieves 10 secrets managers' IDs and names.


```
query{  
  secretManagers(limit: 10, offset: 2) {  
    nodes {  
      id  
      name  
      usageScope {  
        appEnvScopes {  
          application {  
            filterType  
            appId  
          }  
          environment {  
            filterType  
            envId  
          }  
        }  
      }  
    }  
  }  
}
```
This sample uses a `secretManagerByName` query to retrieve the `secretManagerId` of a secret manager whose name you know.


```
query{  
  secretManagerByName(name: "Vault_App_Role"){  
    id  
    name  
    usageScope {  
      appEnvScopes {  
        application {  
          filterType  
          appId  
        }  
        environment {  
          filterType  
          envId  
        }  
      }  
    }  
  }  
}
```
This sample retrieves the name of a secrets manager whose ID you know.


```
query{  
  secretManager(secretManagerId: "abABc1qABC2VrFHqZ3E-Aa") {  
    id  
    name  
    usageScope {  
      appEnvScopes {  
        application {  
          filterType  
          appId  
        }  
        environment {  
          filterType  
          envId  
        }  
      }  
    }  
  }  
}
```
## Create an Encrypted Text Secret

This sample creates a secret.

### Usage Scope

 The required `CreateSecretInput` input must include a `SecretType`.


```
mutation($secret: CreateSecretInput!){  
  createSecret(input: $secret){  
    secret{  
      id,  
      name  
      ... on EncryptedText{  
        name  
        secretManagerId  
        id  
      }  
      usageScope{  
        appEnvScopes{  
          application{  
            filterType  
            appId  
          }  
          environment{  
            filterType  
            envId  
          }  
        }  
      }  
    }  
  }  
}
```
#### Query Variables: Inline Value

 For the above query, these sample variables specify the `SecretType`, and include an inline `name` value.


```
{  
  "secret": {  
    "secretType": "ENCRYPTED_TEXT",  
    "encryptedText": {  
      "name": "azure-secrets",  
      "value": "000-azure-b22",  
      "secretManagerId": "abcdSmUISabcRrAB6NL73w",  
      "usageScope": {  
        "appEnvScopes": [{  
          "application": {  
            "filterType": "ALL"  
          },  
          "environment": {  
            "filterType": "PRODUCTION_ENVIRONMENTS"  
          }  
        }]  
      }  
    }  
  }  
}
```
#### Query Variables: Reference

These sample variables specify the `SecretType`, but provide the `name` value by reference.


```
{  
  "secret": {  
    "secretType": "ENCRYPTED_TEXT",  
    "encryptedText": {  
      "name": "azure-secret-reference",  
      "secretReference":  "000-azure-b22",  
      "secretManagerId": "abcdSmUISabcRrAB6NL73w",  
      "scopedToAccount": false,  
      "inheritScopesFromSM": true,  
      "usageScope": {  
        "appEnvScopes": [{  
          "application": {  
            "filterType": "ALL"  
          },  
          "environment": {  
            "filterType": "NON_PRODUCTION_ENVIRONMENTS"  
          }  
        }]  
      }  
    }  
  }  
}
```
### Inherit Scope

The required `CreateSecretInput` input must include a `SecretType`. 


```
mutation($secret: CreateSecretInput!){  
  createSecret(input: $secret){  
    secret{  
      id,  
      name  
      ... on EncryptedText{  
        name  
        secretManagerId  
        id  
        inheritScopesFromSM  
        scopedToAccount  
      }  
    }  
  }  
}
```
#### Query Variables: Inline Value

For the above query, these sample variables specify the `SecretType`, and include an inline `name` value.


```
{  
  "secret": {  
    "secretType": "ENCRYPTED_TEXT",  
    "encryptedText": {  
      "name": "azure-secrets",  
      "value": "000-azure-b22",  
      "secretManagerId": "abcdSmUISabcRrAB6NL73w",  
      "scopedToAccount": false,  
      "inheritScopesFromSM": true,  
      "usageScope": null  
    }  
  }  
}
```
#### Query Variables: Reference

These sample variables specify the `SecretType`, but provide the `name` value by reference.


```
{  
  "secret": {  
    "secretType": "ENCRYPTED_TEXT",  
    "encryptedText": {  
      "name": "azure-secret-reference",  
      "secretReference":  "000-azure-b22",  
      "secretManagerId": "abcdSmUISabcRrAB6NL73w",  
      "scopedToAccount": true,  
      "inheritScopesFromSM": false,  
      "usageScope": null  
    }  
  }  
}
```
## Update a Secret

This sample updates an existing secret.

### Usage Scope

The required `UpdateSecretInput` input must supply an `id` and a `secretType`.


```
mutation($secret: UpdateSecretInput!){  
  updateSecret(input: $secret){  
    secret{  
      id,  
      name  
      ... on EncryptedText{  
        name  
        secretManagerId  
        id  
      }  
      usageScope{  
        appEnvScopes{  
          application{  
            filterType  
            appId  
          }  
          environment{  
            filterType  
            envId  
          }  
        }  
      }  
    }  
  }  
}
```
#### Query Variables: Inline Value


```
{  
  "secret": {  
    "secretId": "5ZeaabAaaSCS5gVJH9aabAaa",  
    "secretType": "ENCRYPTED_TEXT",  
    "encryptedText": {  
      "name": "azure-secrets",  
      "value": "000-azure-b22",  
      "usageScope": {  
        "appEnvScopes": [{  
          "application": {  
            "filterType": "ALL"  
          },  
          "environment": {  
            "filterType": "PRODUCTION_ENVIRONMENTS"  
          }  
        }]  
      }  
    }  
  }  
}
```
#### Query Variables: Reference


```
{  
  "secret": {  
    "secretId": "5ZeaabAaaSCS5gVJH9aabAaa",  
    "secretType": "ENCRYPTED_TEXT",  
    "encryptedText": {  
      "name": "azure-secret-update",  
      "secretReference": "000-azure-b22",  
      "usageScope": {  
        "appEnvScopes": [{  
          "application": {  
            "filterType": "ALL"  
          },  
          "environment": {  
            "filterType": "PRODUCTION_ENVIRONMENTS"  
          }  
        }]  
      }  
    }  
  }  
}
```
### Inherit Scope

The required `UpdateSecretInput` input must supply an `id` and a `secretType`.


```
mutation($secret: UpdateSecretInput!){  
  updateSecret(input: $secret){  
    secret{  
      id,  
      name  
      ... on EncryptedText{  
        name  
        secretManagerId  
        id  
        inheritScopesFromSM  
        scopedToAccount  
      }  
    }  
  }  
}
```
#### Query Variables: Inline Value


```
{  
  "secret": {  
    "secretId": "5ZeaabAaaSCS5gVJH9aabAaa",  
    "secretType": "ENCRYPTED_TEXT",  
    "encryptedText": {  
      "name": "azure-secrets",  
      "value": "000-azure-b22",  
      "scopedToAccount": false,  
      "inheritScopesFromSM": true,  
      "usageScope": null  
    }  
  }  
}
```
#### Query Variables: Reference


```
{  
  "secret": {  
    "secretId": "5ZeaabAaaSCS5gVJH9aabAaa",  
    "secretType": "ENCRYPTED_TEXT",  
    "encryptedText": {  
      "name": "azure-secret-update",  
      "secretReference": "000-azure-b22",  
      "scopedToAccount": true,  
      "inheritScopesFromSM": false,  
      "usageScope": null  
    }  
  }  
}
```
## Delete a Secret

This sample deletes a specified secret. The required `DeleteSecretInput` input must supply a `secretId` and a `secretType`.


```
mutation($secret: DeleteSecretInput!){  
  deleteSecret(input: $secret)  
}
```
### Query Variables

Here are query variables for the above `deleteSecret` operation.


```
{  
  "secret": {  
    "secretId": "cHP3nO_fTt2pWhjzu_lABc",  
    "secretType": "ENCRYPTED_TEXT"  
  }  
}
```
## Related Topics

* [Harness API](harness-api.md)
* [Encrypted Files API](api-encrypted-files.md)
* [SSH Credentials API](api-ssh-credentials.md)
* [WinRM Credentials API](api-win-rm-credentials.md)

