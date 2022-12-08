---
title: WinRM Credentials API
description: Sample queries to create, read, update, and delete Harness Secrets that manage WinRM credentials.
# sidebar_position: 2
helpdocs_topic_id: 2rlo5zw321
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists sample queries for CRUD operations that create, read, update, and delete [Harness secrets](../../security/secrets-management/secret-management.md) that manage WinRM credentials.

The `!` following the type means that this field is *required*.In this topic:

* [Before You Begin](api-win-rm-credentials.md#before-you-begin)
* [Get a Secret](api-win-rm-credentials.md#get-a-secret)
* [Get a Secret by Name](api-win-rm-credentials.md#get-a-secret-by-name)
* [Create a WinRM Credentials Secret](api-win-rm-credentials.md#create-a-win-rm-credentials-secret)
* [Update a Secret](api-win-rm-credentials.md#update-a-secret)
* [Delete a Secret](api-win-rm-credentials.md#delete-a-secret)
* [Related Topics](api-win-rm-credentials.md#related-topics)

### Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)

### Get a Secret

This sample retrieves an existing WinRM Credentials secret by its ID:


```
query{  
  secret(secretId:"WGFzE4bmRgWBYSUyXsZWHQ",secretType:WINRM_CREDENTIAL){  
    ... on WinRMCredential{  
      id  
      name  
      userName  
      domain  
	  skipCertCheck  
      authenticationScheme  
      useSSL  
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
### Get a Secret by Name

This sample uses a `secretByName` query to retrieve an existing secret by its name:


```
query{  
  secretByName(name:"Test WinRM Connection",secretType:WINRM_CREDENTIAL){  
    ... on WinRMCredential{  
      id  
      name  
      userName  
      domain  
			skipCertCheck  
      authenticationScheme  
      useSSL  
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
### Create a WinRM Credentials Secret

This sample creates a secret. The required `CreateSecretInput` input must include a `SecretType`:


```
mutation($secret: CreateSecretInput!){  
  createSecret(input: $secret){  
    secret{  
      id,  
      name  
	  ... on WinRMCredential{  
        id  
        name  
        userName  
      }  
    }  
  }  
}
```
#### Query Variables: Inline Value

 For the above query, these sample variables supply the `SecretType`, along with several other values:


```
{  
  "secret": {  
    "secretType": "WINRM_CREDENTIAL",  
    "winRMCredential": {  
      "name": "create_winrm_test",  
      "useSSL": true,  
      "authenticationScheme": "NTLM",  
      "port": 5986,  
      "userName": "testingWinRM",  
      "passwordSecretId": "Password",  
      "useSSL": false,  
      "skipCertCheck": false,  
      "usageScope": {  
        "appEnvScopes": [  
          {  
            "application": {  
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
}
```
### Update a Secret

This sample updates an existing secret. The required `UpdateSecretInput` input must supply a `secretType` and an `id`. The `updateSecret` operation will update all fields supplied in the request.


```
mutation($secret: UpdateSecretInput!){  
  updateSecret(input: $secret){  
    secret{  
      id,  
      name  
	... on WinRMCredential{  
        id  
        name  
        userName  
      }  
    }  
  }  
}
```
#### Query Variables

These query variables supply the required `secretType` and `id`, along with updated values for several other fields:


```
{  
  "secret": {  
    "secretId": "hudhudeidwjiwd",  
    "secretType": "WINRM_CREDENTIAL",  
    "winRMCredential": {  
      "name": "create_winrm_test",  
      "useSSL": true,  
      "authenticationScheme": "NTLM",  
      "port": 5986,  
      "userName": "testingWinRM",  
      "passwordSecretId": "Password",  
      "useSSL": false,  
      "skipCertCheck": false,  
      "usageScope": {  
        "appEnvScopes": [  
          {  
            "application": {  
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
}
```
### Delete a Secret

This sample deletes a specified secret. The required `DeleteSecretInput` input must supply a `secretId` and a `secretType`:


```
mutation($secret: DeleteSecretInput!){  
  deleteSecret(input: $secret)  
}
```
Query Variables


```
{  
  "secret": {  
    "clientMutationId": "DevX-Delete-",  
    "secretId": "IG-4ppX7QQuZmD67mkoW-A",  
 "secretType": "WINRM_CREDENTIAL"  
  }  
}
```
### Related Topics

* [Harness API](harness-api.md)
* [Encrypted Text API](api-encrypted-text.md)
* [Encrypted Files API](api-encrypted-files.md)
* [SSH Credentials API](api-ssh-credentials.md)

