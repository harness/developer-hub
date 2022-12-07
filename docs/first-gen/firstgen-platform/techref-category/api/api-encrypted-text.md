---
title: Encrypted Text API
description: Sample GraphQL queries to create, read, update, and delete Harness secrets that rely on encrypted text.
# sidebar_position: 2
helpdocs_topic_id: omnfccj1n0
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists sample queries for CRUD operations that create, read, update, and delete [Harness secrets](/article/au38zpufhr-secret-management) and [Custom Secrets](/article/ejaddm3ddb), that rely on encrypted text.

The `!` following the type means that this field is *required*.In this topic:

* [Before You Begin](https://docs.harness.io/article/omnfccj1n0-api-encrypted-text#before_you_begin)
* [Get a Secret](https://docs.harness.io/article/omnfccj1n0-api-encrypted-text#get_a_secret)
* [Get a Secret by Name](https://docs.harness.io/article/omnfccj1n0-api-encrypted-text#get_a_secret_by_name)
* [Get Secrets Manager IDs](https://docs.harness.io/article/omnfccj1n0-api-encrypted-text#get_secrets_manager_i_ds)
* [Create an Encrypted Text Secret](https://docs.harness.io/article/omnfccj1n0-api-encrypted-text#create_an_encrypted_text_secret)
* [Update a Secret](https://docs.harness.io/article/omnfccj1n0-api-encrypted-text#update_a_secret)
* [Delete a Secret](https://docs.harness.io/article/omnfccj1n0-api-encrypted-text#delete_a_secret)
* [Related Topics](https://docs.harness.io/article/omnfccj1n0-api-encrypted-text#related_topics)

### Before You Begin

* [​Introduction to Harness GraphQL API](/article/tm0w6rruqv-harness-api)
* [Harness API Explorer](/article/2rmd5i0e0h-harness-api-explorer)
* [Scope Secret Managers to Applications and Environments](/article/e4ikpd00f6-scope-secret-managers-to-applications-and-environments)
* [Restrict Secrets Usage](/article/e5q9qcho4y-restrict-secrets-usage)

### Get a Secret by ID

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
### Get a Secret by Name

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
### Get Secrets Manager IDs

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
### Create an Encrypted Text Secret

This sample creates a secret.

#### Usage Scope

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
##### Query Variables: Inline Value

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
##### Query Variables: Reference

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
#### Inherit Scope

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
##### Query Variables: Inline Value

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
##### Query Variables: Reference

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
### Update a Secret

This sample updates an existing secret.

#### Usage Scope

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
##### Query Variables: Inline Value


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
##### Query Variables: Reference


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
#### Inherit Scope

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
##### Query Variables: Inline Value


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
##### Query Variables: Reference


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
### Delete a Secret

This sample deletes a specified secret. The required `DeleteSecretInput` input must supply a `secretId` and a `secretType`.


```
mutation($secret: DeleteSecretInput!){  
  deleteSecret(input: $secret)  
}
```
#### Query Variables

Here are query variables for the above `deleteSecret` operation.


```
{  
  "secret": {  
    "secretId": "cHP3nO_fTt2pWhjzu_lABc",  
    "secretType": "ENCRYPTED_TEXT"  
  }  
}
```
### Related Topics

* [Harness API](/article/tm0w6rruqv-harness-api)
* [Encrypted Files API](/article/jvhzdi1ztj-api-encrypted-files)
* [SSH Credentials API](/article/v65okfwfl2-api-ssh-credentials)
* [WinRM Credentials API](/article/2rlo5zw321-api-win-rm-credentials)

