---
title: Add a Docker Artifact Source Using API
description: Describes how to add a Docker Artifact Source using Harness GraphQL API.
sidebar_position: 280
helpdocs_topic_id: 4jobsef2vx
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to create, read, update, and delete Docker Artifact Source using Harness GraphQL APIs.


## Before You Begin

* Read the [Create an Application](../../../continuous-delivery/model-cd-pipeline/applications/application-configuration.md) topic to get an overview of how Harness organizes Services.
* Read the [Add a Service](../../../continuous-delivery/model-cd-pipeline/setup-services/service-configuration.md) topic to understand the process to add a Service to an Application.
* Read [Configuration as Code](../../config-as-code/configuration-as-code.md) to see how you can quickly configure your Harness Service using your existing YAML in Git.
* [Add Artifact Servers](../../account/manage-connectors/configuring-artifact-server.md)
* [Add a Docker Artifact Source](../../../continuous-delivery/model-cd-pipeline/setup-services/add-a-docker-image-service.md)

## Step: Create a Docker Artifact Source

Use this sample query to create a Docker Artifact Source.

### Request

You create a Docker Artifact Source using the mutation `createConnector`.


```
mutation CreateConnector($connector: CreateConnectorInput!) {  
  createConnector(input: $connector) {  
    clientMutationId  
    connector {  
      ...on DockerConnector{  
      name  
      id  
      }  
    }  
  }  
}
```
### Query Variables

The Query Variables follow this syntax, with `connectorType` identifying the Docker Artifact Source to create.

To fetch the `passwordSecretId` use:

* [Encrypted Text API](api-encrypted-text.md#get-a-secret-by-name)
* [WinRM Credentials API](api-win-rm-credentials.md#get-a-secret-by-name)
* [SSH Credentials API](api-ssh-credentials.md#get-a-secret-by-name)


```
{  
  "connector": {  
    "connectorType": "DOCKER",  
    "dockerConnector":  {  
      "name":"DockerConnector",  
      "URL":"https://registry.hub.docker.com/v2/",  
      "passwordSecretId": "xxxyyy1aa_zzzaa1aa",  
      "userName": "wingsplugins"  
    }  
  }  
}  

```
## Step: Update a Docker Artifact Source

Use this sample query to update a Docker Artifact Source.

### Request

You update a Docker Artifact Source using the mutation `updateConnector`.


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
### Query Variables

The Query Variables follow this syntax, with `connectorType` identifying the Docker Artifact Source to update. See [Fetch the Connector ID](artifact-connectors-docker-using-api.md#fetch-the-connector-id) to get the connector ID details.


```
{  
  "connector": {  
    "connectorType": "DOCKER",  
    "connectorId": "xxxxxx",  
    "dockerConnector":  {  
      "name":"Updated name docker",  
      "URL":"https://registry.hub.docker.com/v2/",  
      "passwordSecretId": "xxxxxx",  
      "userName": "wingsplugins2"  
    }  
  }  
}
```
### Fetch the Connector ID

Use the following query to fetch the `ID` of a connector. A list of connectors is returned based on the set filters. You can select the `ID` of the connector that you want to update.


```
query  
{  
  connectors(filters: [{connectorType: {operator: EQUALS, values: DOCKER}}], limit: 20) {  
    nodes {  
      name  
      id  
    }  
  }  
}
```
## Step: Delete a Docker Artifact Source

You delete a Docker Artifact Source using the mutation `deleteConnector`. Deleting a Docker Artifact Source requires its `ID` only.


```
mutation DeleteConnectorMutation($connector: DeleteConnectorInput!) {  
  deleteConnector(input: $connector) {  
    clientMutationId  
  }  
}
```
### Query Variables

Query Variables, with `connectorId` identifies the Docker Artifact Source to delete.


```
{  
  "connector": {  
    "connectorId": "xxxxxx"  
  }  
}
```
