---
title: Encrypted Files API
description: Sample GraphQL queries to read and delete Harness secrets that rely on encrypted files.
sidebar_position: 240
helpdocs_topic_id: jvhzdi1ztj
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists sample queries that read, create, update and delete [Harness secrets](../../security/secrets-management/secret-management.md) that rely on encrypted files.


This API is currently in Beta. It supports only Get and Delete operations. For Create and Update operations, use the cURL commands given in this topic and update the parameters as needed. The `!` character at the end of a parameter's name indicates that it is a required parameter.
## Get a Secret by ID

This sample retrieves an existing file secret by its ID:


```
query{  
  secret(secretId:"txZMBymoS5KLTF2vUs2p0Q",secretType:ENCRYPTED_FILE){  
	... on EncryptedFile{  
      name  
      secretManagerId  
      id  
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

This sample uses a `secretByName` query to retrieve an existing file secret by its name:


```
query{  
  secretByName(name:"000-azure-b22-",secretType:ENCRYPTED_FILE){  
	... on EncryptedFile{  
      name  
      secretManagerId  
      id  
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
## Create a Secret

This sample creates a file secret.

The UI doesn't support file upload for Create and Update. To do this, use the below cURL commands. You must pass **query** and **file** as two form parameters as shown in the below samples.

### Usage Scope

The required `CreateSecretInput` input must include a `SecretType`.


```
mutation ($secret: CreateSecretInput!) {  
  createSecret(input: $secret) {  
    secret {  
      id  
      name  
      ... on EncryptedFile {  
        name  
        secretManagerId  
        id  
      }  
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
#### Query Variables

For the above query, these sample variables specify the `SecretType`, and include an inline `name` value.


```
{  
 "secret": {  
   "secretType": "ENCRYPTED_FILE",  
   "encryptedFile": {  
     "name": "sample-file-name",  
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
#### Sample cURL:


```
curl --location --request POST '[https://app.harness.io/gateway/api/graphql?accountId=](https://app.harness.io/gateway/api/graphql?accountId=px7xd_BFRCi-pfWPYXVjvw)<account-id>' \  
--header 'authorization: <Bearer-token>' \  
--form 'file=@"/Users/sampleusername/Downloads/examplefile"' \  
--form 'query="{  
   \"query\":\"  mutation($secret: CreateSecretInput!){    createSecret(input: $secret){      secret{        id,        name        ... on EncryptedFile{          name          secretManagerId          id        }        usageScope{          appEnvScopes{            application{              filterType              appId            }            environment{              filterType              envId            }          }        }      }    }  }  \",  
   \"variables\":{  
      \"secret\":{  
         \"secretType\":\"ENCRYPTED_FILE\",  
         \"encryptedFile\":{  
            \"name\":\"fileSecretName\",  
            \"usageScope\":{  
               \"appEnvScopes\":[  
                  {  
                     \"application\":{  
                        \"filterType\":\"ALL\"  
                     },  
                     \"environment\":{  
                        \"filterType\":\"PRODUCTION_ENVIRONMENTS\"  
                     }  
                  }  
               ]  
            }  
         }  
      }  
   }  
}"'
```
### Inherit Scope

The required `CreateSecretInput` input must include a `SecretType`. 


```
mutation ($secret: CreateSecretInput!) {  
  createSecret(input: $secret) {  
    secret {  
      id  
      name  
      ... on EncryptedFile {  
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
#### Query Variables

For the above query, these sample variables specify the `SecretType`, and include an inline `name` value.


```
{  
 "secret": {  
   "secretType": "ENCRYPTED_FILE",  
   "encryptedFile": {  
     "name": "file-name",  
     "secretManagerId": "abcdSmUISabcRrAB6NL73w",  
     "scopedToAccount": false,  
     "inheritScopesFromSM": true,  
     "usageScope": null  
   }  
 }  
}
```
#### Sample cURL:


```
curl --location --request POST '[https://app.harness.io/gateway/api/graphql?accountId=](https://app.harness.io/gateway/api/graphql?accountId=px7xd_BFRCi-pfWPYXVjvw)<account-id>' \  
--header 'authorization: <Bearer-token>' \  
--form 'file=@"/Users/sampleusername/Downloads/examplefile"' \  
--form 'query="{  
   \"query\":\"mutation($secret: CreateSecretInput!){    createSecret(input: $secret){      secret{        id,        name        ... on EncryptedFile{          name          secretManagerId          id          inheritScopesFromSM          scopedToAccount        }      }    }  }\",  
   \"variables\":{  
      \"secret\":{  
         \"secretType\":\"ENCRYPTED_FILE\",  
         \"encryptedFile\":{  
            \"name\":\"fileSecretName\",  
            \"scopedToAccount\":false,  
            \"inheritScopesFromSM\":true,  
            \"usageScope\":null  
         }  
      }  
   }  
}"'
```
## Update a Secret

This sample updates an existing secret.

### Usage Scope

The required `UpdateSecretInput` input must supply an `id` and a `secretType`.


```
mutation ($secret: UpdateSecretInput!) {  
  updateSecret(input: $secret) {  
    secret {  
      id  
      name  
      ... on EncryptedFile {  
        name  
        secretManagerId  
        id  
      }  
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
#### Query Variables

For the above query, these sample variables specify the `SecretType`, and include an inline `name` value.


```
{  
 "secret": {  
   "secretId": "5ZeaabAaaSCS5gVJH9aabAaa",  
   "secretType": "ENCRYPTED_FILE",  
   "encryptedFile": {  
     "name": "azure-secrets",  
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
#### Sample cURL:


```
curl --location --request POST 'https://app.harness.io/gateway/api/graphql?accountId=<account-id>' \  
--header 'x-api-key: <api-key>' \  
--form 'file=@"/path/to/secret/file"' \  
--form 'query="  
{  
    \"query\": \"  mutation($secret: UpdateSecretInput!){    updateSecret(input: $secret){      secret{        id        name        ... on EncryptedFile{          name          secretManagerId          id        }        usageScope{          appEnvScopes{            application{              filterType              appId            }            environment{              filterType              envId            }          }        }      }    }  }  \",  
    \"variables\": {  
        \"secret\": {  
            \"secretType\": \"ENCRYPTED_FILE\",  
            \"secretId\": \"<secretId>\",  
            \"encryptedFile\": {  
                \"name\": \"<secretName>\",  
                  
                \"usageScope\": {  
                    \"appEnvScopes\": [  
                        {  
                            \"application\": {  
                                \"filterType\": \"ALL\"  
                            },  
                            \"environment\": {  
                                \"filterType\": \"PRODUCTION_ENVIRONMENTS\"  
                            }  
                        }  
                    ]  
                }  
            }  
        }  
    }  
}"'  


```
### Inherit Scope

The required `UpdateSecretInput` input must supply an `id` and a `secretType`.


```
mutation ($secret: UpdateSecretInput!) {  
  updateSecret(input: $secret) {  
    secret {  
      id  
      name  
      ... on EncryptedFile {  
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
#### Query Variables


```
{  
 "secret": {  
   "secretId": "5ZeaabAaaSCS5gVJH9aabAaa",  
   "secretType": "ENCRYPTED_FILE",  
   "encryptedFile": {  
     "name": "azure-secrets",  
     "scopedToAccount": false,  
     "inheritScopesFromSM": true,  
     "usageScope": null  
   }  
 }  
}  

```
#### Sample cURL:


```
curl --location --request POST '[https://app.harness.io/gateway/api/graphql?accountId=](https://app.harness.io/gateway/api/graphql?accountId=px7xd_BFRCi-pfWPYXVjvw)<account-id>' \  
--header 'authorization: <Bearer-token>' \  
--form 'file=@"/Users/shashanksingh/Downloads/hello"' \  
--form 'query="{  
   \"query\":\"mutation($secret: UpdateSecretInput!){    updateSecret(input: $secret){      secret{        id,        name        ... on EncryptedFile{          name          secretManagerId          id          inheritScopesFromSM          scopedToAccount        }      }    }  }\",  
   \"variables\":{  
      \"secret\":{  
         \"secretType\":\"ENCRYPTED_FILE\",  
         \"secretId\":\"tsOCZjLJRzembSBofpnVsA\",  
         \"encryptedFile\":{  
            \"name\":\"fileSecretName\",  
            \"scopedToAccount\":false,  
            \"inheritScopesFromSM\":true,  
            \"usageScope\":null  
         }  
      }  
   }  
}"'
```

## Delete a Secret

This sample deletes a specified secret. The required `DeleteSecretInput` input must supply a `secretId` and a `secretType`.


```
mutation($secret: DeleteSecretInput!){  
  deleteSecret(input: $secret){  
    clientMutationId  
  }  
}
```
### Query Variables

Here are query variables for the above `deleteSecret` operation.


```
{  
  "secret": {  
    "secretId": "Cu8ran5nSqOhxvlcfF2V6A",  
    "secretType": "ENCRYPTED_FILE"  
  }  
}
```

## Related Reference Material

* [Harness API](harness-api.md)
* [Encrypted Text API](api-encrypted-text.md)
* [SSH Credentials API](api-ssh-credentials.md)
* [WinRM Credentials API](api-win-rm-credentials.md)

