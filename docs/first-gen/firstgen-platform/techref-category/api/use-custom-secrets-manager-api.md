---
title: Use Custom Secrets Manager API
description: This topic describes how to create, read, update, and delete Custom Secrets Manager using Harness API.
# sidebar_position: 2
helpdocs_topic_id: 9grbkf5d1k
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the Feature Flag `CUSTOM_SECRETS_MANAGER`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.Harness provides first-class support and built-in integration for the most common secret managers. If you are using a [secret manager](/article/au38zpufhr) that Harness does provide first-class support for, you can configure and use your secret manager by using the Harness Custom Secrets Manager.

This topic describes how to create, update, and delete a Custom Secrets Manager using the Harness API.

For steps on setting up a Custom Secret Manager using the Harness UI, see [Add and Use a Custom Secrets Manager](/article/ejaddm3ddb).

In this topic:

* [Before You Begin](/article/9grbkf5d1k-use-custom-secrets-manager-api#before_you_begin)
* [Review: Read-Only Secret Manager](#review_read_only_secret_manager)
* [Create a Custom Secrets Manager](/article/9grbkf5d1k-use-custom-secrets-manager-api#create_a_custom_secrets_manager)
	+ [Request](/article/9grbkf5d1k-use-custom-secrets-manager-api#request)
	+ [Query Variables](/article/9grbkf5d1k-use-custom-secrets-manager-api#query_variables)
* [Update a Custom Secrets Manager](/article/9grbkf5d1k-use-custom-secrets-manager-api#update_a_custom_secrets_manager)
	+ [Request](/article/9grbkf5d1k-use-custom-secrets-manager-api#request_2)
	+ [Query Variables](/article/9grbkf5d1k-use-custom-secrets-manager-api#query_variables_2)
* [Delete a Custom Secrets Manager](/article/9grbkf5d1k-use-custom-secrets-manager-api#delete_a_custom_secrets_manager)
	+ [Request](/article/9grbkf5d1k-use-custom-secrets-manager-api#request_3)
	+ [Query Variables](/article/9grbkf5d1k-use-custom-secrets-manager-api#query_variables_3)

### Before You Begin

* Review the [Harness API](/article/tm0w6rruqv)
* Review [Secrets Management Overview](/article/au38zpufhr)
* [Add and Use a Custom Secrets Manager](/article/ejaddm3ddb)

### Review: Read-Only Secret Manager

Harness Custom Secrets Manager is a read-only Secrets Manager. Harness can read/decrypt secrets, but it cannot write secrets to the Custom Secrets Manager.

### Create a Custom Secrets Manager

A Custom Secrets Manager is created using a shell script.

You can choose to run the shell script on a **Harness Delegate** or on a **target host**. In either case, the API mutation remains the same., but the query variables are different.

Use this query to create a Custom Secrets Manager.

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
### Update a Custom Secrets Manager

Use this simple query to update your Custom Secrets Manager.

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
#### Query Variables

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
### Delete a Custom Secrets Manager

Use this simple query to delete a Custom Secrets Manager.

#### Request

You delete a Secret Manager using the mutation `deleteSecretManager`.


```
mutation DeleteSecretManagerMutation($input: DeleteSecretManagerInput!){  
  deleteSecretManager(input: $input){  
   clientMutationId  
  }  
}
```
#### Query Variables

The query variables use the following syntax, with `secretManagerId` parameter identifying the Secret Manager to delete.


```
{  
  "input": {  
    "clientMutationId": "xPxNsOusEaAsdQifDdGxx",  
    "secretManagerId": "xxxxxxxxxx"  
  }  
}
```
