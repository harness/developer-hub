---
title: Add a Nexus Artifact Source Using API
description: Describes how to create, read, update, and delete Nexus Artifact Source using Harness GraphQL APIs.
# sidebar_position: 2
helpdocs_topic_id: 103heofz7o
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to create, read, update, and delete Nexus Artifact Source using Harness GraphQL APIs.

In this topic:

* [Before You Begin](https://docs.harness.io/article/103heofz7o-nexus-artifact-source-using-api#before_you_begin)
* [Step: Create a Nexus Artifact Source](https://docs.harness.io/article/103heofz7o-nexus-artifact-source-using-api#step_create_a_nexus_artifact_source)
* [Step: Update a Nexus Artifact Source](https://docs.harness.io/article/103heofz7o-nexus-artifact-source-using-api#step_update_a_nexus_artifact_source)
* [Step: Delete a Nexus Artifact Source](https://docs.harness.io/article/103heofz7o-nexus-artifact-source-using-api#step_delete_a_nexus_artifact_source)

### Before You Begin

* Read the [Create an Application](https://docs.harness.io/article/bucothemly-application-configuration) topic to get an overview of how Harness organizes Services.
* Read the [Add a Service](https://docs.harness.io/article/eb3kfl8uls-service-configuration) topic to understand the process to add a Service to an Application.
* Read [Configuration as Code](https://docs.harness.io/article/htvzryeqjw-configuration-as-code) to see how you can quickly configure your Harness Service using your existing YAML in Git.
* [Nexus Artifact Sources](/article/rdhndux2ab-nexus-artifact-sources)
* [Add Artifact Servers](https://docs.harness.io/article/7dghbx1dbl-configuring-artifact-server)

### Step: Create a Nexus Artifact Source

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
##### Query Variables

The Query Variables follow this syntax, with `connectorType` identifying the Nexus Artifact Source to create.

To fetch the `passwordSecretId` use:

* [Encrypted Text API](https://docs.harness.io/article/omnfccj1n0-api-encrypted-text#get_a_secret_by_name)
* [WinRM Credentials API](https://docs.harness.io/article/2rlo5zw321-api-win-rm-credentials#get_a_secret_by_name)
* [SSH Credentials API](https://docs.harness.io/article/v65okfwfl2-api-ssh-credentials#get_a_secret_by_name)


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
### Step: Update a Nexus Artifact Source

Use this sample query to update a Nexus Artifact Source.

##### Request

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
##### Query Variables

The Query Variables follow this syntax, with `connectorType` identifying the Nexus Artifact Source to update. See [Fetch the Connector ID](/article/103heofz7o-nexus-artifact-source-using-api#fetch_the_connector_id) to get the connector ID details.


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
##### Fetch the Connector ID

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
### Step: Delete a Nexus Artifact Source

You delete a Nexus Artifact Source using the mutation `deleteConnector`. Deleting a Nexus Artifact Source requires its `ID` only.


```
mutation DeleteConnectorMutation($connector: DeleteConnectorInput!) {  
  deleteConnector(input: $connector) {  
    clientMutationId  
  }  
}
```
##### Query Variables

Query Variables, with `connectorId` identifies the Nexus Artifact Source to delete.


```
{  
  "connector": {  
    "connectorId": "xxxxxx"  
  }  
}
```
