---
title: Add Git Connectors Using API
description: Describes how to add Git connectors using Harness GraphQL APIs.
# sidebar_position: 2
helpdocs_topic_id: qwkg2khtr7
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to create, read, update, and delete [Git Connectors](/article/ay9hlwbgwa-add-source-repo-providers) using Harness GraphQL APIs.

In this document, GitHub Repo is used as an example. But you can use Harness GraphQL APIs for the other supported [Harness Source Repo Providers](/article/ay9hlwbgwa-add-source-repo-providers) as well.

In this topic:

* [Before You Begin](https://docs.harness.io/article/qwkg2khtr7-add-git-connectors-using-api#before_you_begin)
* [Step: Create a Git Connector](https://docs.harness.io/article/qwkg2khtr7-add-git-connectors-using-api#undefined)
* [Step: Update a Git Connector](https://docs.harness.io/article/qwkg2khtr7-add-git-connectors-using-api#step_update_a_git_connector)
* [Step: Delete a Git Connector](https://docs.harness.io/article/qwkg2khtr7-add-git-connectors-using-api#step_delete_a_git_connector)

### Before You Begin

* [​Introduction to Harness GraphQL API](/article/tm0w6rruqv-harness-api)
* [Harness API Explorer](/article/2rmd5i0e0h-harness-api-explorer)

### Step: Create a Git Connector

Use this sample query to create a Git Connector.

##### Request

You create a Git Connector using the mutation `createConnector`. You can use `passwordSecretId` or `sshSettingId` to authenticate to your Git connector.


```
mutation CreateConnector($connector: CreateConnectorInput!) {  
  createConnector(input: $connector) {  
    clientMutationId  
    connector {  
      id  
      name  
      ...on GitConnector{  
        userName  
        passwordSecretId  
        webhookUrl  
        customCommitDetails {  
          authorEmailId  
          authorName  
          commitMessage  
        }  
      }  
    }  
  }  
}
```
##### Query Variables

The Query Variables follow this syntax, with `connectorType` identifying the Git Connector to create.

To fetch the `passwordSecretId` or `sshSettingId` use:

* [Encrypted Text API](/article/omnfccj1n0-api-encrypted-text#get_a_secret_by_name)
* [WinRM Credentials API](/article/2rlo5zw321-api-win-rm-credentials#get_a_secret_by_name)
* [SSH Credentials API](/article/v65okfwfl2-api-ssh-credentials#get_a_secret_by_name)

The following sample query variable uses `passwordSecretId` to authenticate to the Git connector.


```
{  
  "connector": {  
    "connectorType": "GIT",  
    "gitConnector": {  
    "urlType": "ACCOUNT",  
    "name": "connectorName",  
    "generateWebhookUrl": true,  
    "URL": "https://github.com/abc-xyz/test",  
    "userName": "user-harness",  
    "passwordSecretId": "xxxxxx",  
    "branch": "testBranch",  
    "customCommitDetails": {  
        "authorName": "User Harness",  
        "authorEmailId": "user.harness@harness.io",  
        "commitMessage": "commit message"  
      }  
    }  
  }  
}
```
##### Response


```
{  
  "data": {  
    "createConnector": {  
      "clientMutationId": null,  
      "connector": {  
        "id": "xxxxxx",  
        "name": "connectorNameSample",  
        "userName": "test1",  
        "passwordSecretId": "xxxxxx",  
        "webhookUrl": "https://test.xyz.io/api/setup-as-code/yaml/webhook/xxxxxx?accountId=xxxxxx",  
        "customCommitDetails": {  
          "authorEmailId": "user.harness@harness.io",  
          "authorName": "User Harness",  
          "commitMessage": "test commit message"  
        }  
      }  
    }  
  }  
}
```
The following sample query variable uses `sshSettingId` to authenticate to the Git connector.


```
{  
  "connector": {  
    "connectorType": "GIT",  
    "gitConnector": {  
    "urlType": "ACCOUNT",  
    "name": "connectorName",  
    "generateWebhookUrl": true,  
    "URL": "git@github.com/abc-xyz/test",  
    "sshSettingId": "xxxxxx",  
    "branch": "testBranch",  
    "customCommitDetails": {  
        "authorName": "User Harness",  
        "authorEmailId": "user.harness@harness.io",  
        "commitMessage": "commit message"  
      }  
    }  
  }  
}
```
### Step: Update a Git Connector

Use this sample query to update a Git Connector.

##### Request

You update a Git Connector using the mutation `updateConnector`. You can use `passwordSecretId` or `sshSettingId` to authenticate to your Git connector.


```
mutation UpdateConnector($connector: UpdateConnectorInput!) {  
  updateConnector(input: $connector) {  
    clientMutationId  
    connector {  
      id  
      name  
      ...on GitConnector{  
        userName  
        passwordSecretId  
        webhookUrl  
        urlType  
        customCommitDetails {  
          authorEmailId  
          authorName  
          commitMessage  
        }  
      }  
    }  
  }  
}
```
##### Query Variables

The Query Variables follow this syntax, with `connectorType` identifying the Git Connector to update. See [Fetch the Connector ID](/article/qwkg2khtr7-add-git-connectors-using-api#fetch_the_connector_id) to get the connector ID details.


```
{  
  "connector": {  
    "connectorType": "GIT",  
    "connectorId": "xxxxxx",  
    "gitConnector": {  
    "name": "connectorName",  
    "generateWebhookUrl": true,  
    "URL": "https://github.com/abc-xyz/test",  
    "userName": "user-harness",  
    "passwordSecretId": "xxxxxx",  
    "branch": "testBranch",  
    "customCommitDetails": {  
        "authorName": "Test",  
        "authorEmailId": "abc@xyz.io",  
        "commitMessage": "test commit message"  
      }  
    }  
  }  
}
```
##### Response


```
{  
  "data": {  
    "updateConnector": {  
      "clientMutationId": null,  
      "connector": {  
        "id": "xxxxxx",  
        "name": "connectorNameSample1",  
        "userName": "test1",  
        "passwordSecretId": "xxxxxx",  
        "webhookUrl": "https://test.xyz.io/api/setup-as-code/yaml/webhook/xxxxxx?accountId=xxxxxx",  
        "urlType": "REPO",  
        "customCommitDetails": {  
          "authorEmailId": "abc@xyz.io",  
          "authorName": "Test",  
          "commitMessage": "test commit message updated"  
        }  
      }  
    }  
  }  

```
##### Fetch the Connector ID

Use the following query to fetch the `ID` of a connector. A list of connectors is returned based on the set filters. You can select the `ID` of the connector that you want to update.


```
query{  
  connectors(filters: [  
    {  
      connectorType: {  
        operator: EQUALS,  
        values: [GIT]  
      }  
    }  
  ],  
  limit: 10){  
    nodes{  
      id  
      name  
      ...on GitConnector {  
        branch  
        customCommitDetails{  
          authorEmailId  
          authorName  
          commitMessage  
        }  
      }  
    }  
  }  
}
```
### Step: Delete a Git Connector

You delete a Git Connector using the mutation `deleteConnector`. Deleting a Git Connector requires its `ID` only.

##### Request


```
mutation DeleteConnectorMutation($connector: DeleteConnectorInput!) {  
  deleteConnector(input: $connector) {  
    clientMutationId  
  }  
}
```
##### Query Variables

Query Variables, with `connectorId` identifies the Git Connector to delete.


```
{  
  "connector": {  
    "connectorId": "xxxxxx"  
  }  
}
```
