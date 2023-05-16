---
title: Use Custom Secrets Manager API
description: This topic describes how to create, read, update, and delete Custom Secrets Manager using Harness API.
sidebar_position: 390
helpdocs_topic_id: 9grbkf5d1k
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness provides first-class support and built-in integration for the most common [secret managers](../../security/secrets-management/secret-management.md). If you're not using a secret manager that's supported, you can configure it by using the Harness Custom Secrets Manager.

This topic describes how to create, update, and delete a Custom Secrets Manager using the Harness API.

For steps on setting up a Custom Secret Manager using the Harness UI, see [Add and Use a Custom Secrets Manager](../../security/secrets-management/add-and-use-a-custom-secrets-manager.md).


## Before You Begin

* Review the [Harness API](harness-api.md)
* Review [Secrets Management Overview](../../security/secrets-management/secret-management.md)
* [Add and Use a Custom Secrets Manager](../../security/secrets-management/add-and-use-a-custom-secrets-manager.md)

## Review: Read-Only Secret Manager

Harness Custom Secrets Manager is a read-only Secrets Manager. Harness can read/decrypt secrets, but it cannot write secrets to the Custom Secrets Manager.

## Create a Custom Secrets Manager

A Custom Secrets Manager is created using a shell script.

You can choose to run the shell script on a **Harness Delegate** or on a **target host**. In either case, the API mutation remains the same., but the query variables are different.

Use this query to create a Custom Secrets Manager.

### Request

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
### Query Variables

Use these query variables if you want to run the shell script on a Harness Delegate. The `secretManagerType` parameter identifies the type of Secret Manager to create while the `executeOnDelegate` parameter identifies that the shell script will run on a Harness Delegate.


```
{  
        "secretManagerInput": {  
            "secretManagerType": "CUSTOM",  
            "customSecretManagerInput": {  
                "name": "DocExampleSecretManager",  
                "delegateSelectors": [],  
                "testVariables": [  
                    {  
                        "name": "key",  
                        "value": "xxxx"  
                    },  
                    {  
                        "name": "engineName",  
                        "value": "xxxx"  
                    },  
                    {  
                        "name": "path",  
                        "value": "xxxx"  
                    }  
                ],  
                "isConnectorTemplatized": false,  
                "executeOnDelegate": true,  
                "templateId": "xxxxxxxxxxxxxxxxxxxxxx",  
                "host": null,  
                "commandPath": "/tmp",  
                "connectorId": null,  
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
The following example shows the query variables to use if you want to run the shell script on a target host.


```
{  
    "secretManagerInput": {  
        "secretManagerType": "CUSTOM",  
        "customSecretManagerInput": {  
            "name": "DocExampleSecretManager",  
            "delegateSelectors": [],  
            "testVariables": [  
                {  
                    "name": "key",  
                    "value": "xxxx"  
                },  
                {  
                    "name": "engineName",  
                    "value": "xxxx"  
                },  
                {  
                    "name": "path",  
                    "value": "xxxx"  
                }  
            ],  
            "isConnectorTemplatized": false,  
            "executeOnDelegate": false,  
            "templateId": "xxxxxxxxxxxxxxxxxxxx",  
            "host": "10.0.0.17",  
            "commandPath": "/xxxx/xxxxxxx",  
            "connectorId": "xxxxxxxxxx",  
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
## Update a Custom Secrets Manager

Use this simple query to update your Custom Secrets Manager.

### Request

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
### Query Variables

The query variables use the following syntax, with `secretManagerId` parameter and `secretManagerType` parameter identifying the Secret Manager to update.


```
{  
    "input": {  
        "secretManagerId": "xxxxxxxxxx",  
        "secretManagerType": "CUSTOM",  
        "customSecretManagerInput": {  
            "name": "DocExampleSecretManager_updated1",  
            "delegateSelectors": [],  
            "testVariables": [  
                {  
                    "name": "key",  
                    "value": "xxxx"  
                },  
                {  
                    "name": "engineName",  
                    "value": "xxxx"  
                },  
                {  
                    "name": "path",  
                    "value": "xxxx"  
                }  
            ],  
            "isConnectorTemplatized": false,  
            "executeOnDelegate": true,  
            "templateId": "xxxxxxxxxxxxxxxxxxxxx",  
            "host": null,  
            "commandPath": "/tmp",  
            "connectorId": null,  
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
## Delete a Custom Secrets Manager

Use this simple query to delete a Custom Secrets Manager.

### Request

You delete a Secret Manager using the mutation `deleteSecretManager`.


```
mutation DeleteSecretManagerMutation($input: DeleteSecretManagerInput!){  
  deleteSecretManager(input: $input){  
   clientMutationId  
  }  
}
```
### Query Variables

The query variables use the following syntax, with `secretManagerId` parameter identifying the Secret Manager to delete.


```
{  
  "input": {  
    "clientMutationId": "xPxNsOusEaAsdQifDdGxx",  
    "secretManagerId": "xxxxxxxxxx"  
  }  
}
```
