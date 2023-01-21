---
title: Add a Nexus Artifact Source Using API
description: Describes how to create, read, update, and delete Nexus Artifact Source using Harness GraphQL APIs.
sidebar_position: 290
helpdocs_topic_id: 103heofz7o
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to create, read, update, and delete Nexus Artifact Source using Harness GraphQL APIs.


## Before You Begin

* Read the [Create an Application](../../../continuous-delivery/model-cd-pipeline/applications/application-configuration.md) topic to get an overview of how Harness organizes Services.
* Read the [Add a Service](../../../continuous-delivery/model-cd-pipeline/setup-services/service-configuration.md) topic to understand the process to add a Service to an Application.
* Read [Configuration as Code](../../config-as-code/configuration-as-code.md) to see how you can quickly configure your Harness Service using your existing YAML in Git.
* [Nexus Artifact Sources](../cd-ref/artifacts-ref/nexus-artifact-sources.md)
* [Add Artifact Servers](../../account/manage-connectors/configuring-artifact-server.md)

## Step: Create a Nexus Artifact Source

Use this sample query to create a Nexus Artifact Source.

##### Request

You create a Nexus Artifact Source using the mutation `createConnector`.


```
mutation CreateConnector($connector: CreateConnectorInput!) {  
  createConnector(input: $connector) {  
    clientMutationId  
    connector {  
      ...on NexusConnector{  
      name  
      id  
      }  
    }  
  }  
}
```
#### Query Variables

The Query Variables follow this syntax, with `connectorType` identifying the Nexus Artifact Source to create.

To fetch the `passwordSecretId` use:

* [Encrypted Text API](api-encrypted-text.md#get-a-secret-by-name)
* [WinRM Credentials API](api-win-rm-credentials.md#get-a-secret-by-name)
* [SSH Credentials API](api-ssh-credentials.md#get-a-secret-by-name)


```
{  
  "connector": {  
    "connectorType": "NEXUS",  
    "nexusConnector":  {  
      "name":"NexusConnector",  
      "URL":"https://nexus.test.harness.io",  
      "version":"V2",  
      "passwordSecretId": "xxxxxxxYYzzz",  
      "userName": "harnesstest"  
    }  
  }  
}
```
## Step: Update a Nexus Artifact Source

Use this sample query to update a Nexus Artifact Source.

#### Request

You update a Nexus Artifact Source using the mutation `updateConnector`.


```
mutation UpdateConnector($connector: UpdateConnectorInput!) {  
  updateConnector(input: $connector) {  
    clientMutationId  
    connector {  
      name  
      id  
    }  
  }  
}
```
#### Query Variables

The Query Variables follow this syntax, with `connectorType` identifying the Nexus Artifact Source to update. See [Fetch the Connector ID](nexus-artifact-source-using-api.md#fetch-the-connector-id) to get the connector ID details.


```
{  
  "connector": {  
    "connectorType": "NEXUS",  
    "connectorId": "xxxxxyxxxaaaqqq",  
    "nexusConnector":  {  
      "name":"NexusConnector",  
      "URL":"https://nexus.test.harness.io",  
      "version":"V2",  
      "passwordSecretId": "xxxxxxxYYzzz",  
      "userName": "harnesstest"  
    }  
  }  
}
```
#### Fetch the Connector ID

Use the following query to fetch the `ID` of a connector. A list of connectors is returned based on the set filters. You can select the `ID` of the connector that you want to update.


```
query  
{  
  connectors(filters: [{connectorType: {operator: EQUALS, values: NEXUS}}], limit: 20) {  
    nodes {  
      name  
      id  
    }  
  }  
}
```
## Step: Delete a Nexus Artifact Source

You delete a Nexus Artifact Source using the mutation `deleteConnector`. Deleting a Nexus Artifact Source requires its `ID` only.


```
mutation DeleteConnectorMutation($connector: DeleteConnectorInput!) {  
  deleteConnector(input: $connector) {  
    clientMutationId  
  }  
}
```
#### Query Variables

Query Variables, with `connectorId` identifies the Nexus Artifact Source to delete.


```
{  
  "connector": {  
    "connectorId": "xxxxxx"  
  }  
}
```
