---
title: Add a Helm Artifact Source Using the API
description: Describes how to create, read, update, and delete Helm Artifact Source using Harness GraphQL APIs.
sidebar_position: 300
helpdocs_topic_id: y5ngh9ktzj
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to create, read, update, and delete Helm Artifact Source using Harness GraphQL APIs.

## Before You Begin

* Read the [Create an Application](../../../continuous-delivery/model-cd-pipeline/applications/application-configuration.md) topic to get an overview of how Harness organizes Services.
* Read the [Add a Service](../../../continuous-delivery/model-cd-pipeline/setup-services/service-configuration.md) topic to understand the process to add a Service to an Application.
* Read [Configuration as Code](../../config-as-code/configuration-as-code.md) to see how you can quickly configure your Harness Service using your existing YAML in Git.
* [Add Helm Repository Artifact Servers](../../account/manage-connectors/add-helm-repository-servers.md)
* [Add Artifact Servers](../../account/manage-connectors/configuring-artifact-server.md)
* [Use Cloud Providers API](use-cloud-providers-api.md)

## Step: Create a Helm Artifact Source

Use this sample query to create a Helm Artifact Source. You can use the following hosting platforms:

* HTTP Server
* Amazon S3
* GCS (Google Cloud Storage)

If you select an option other than **HTTP Server**, such as **Amazon S3** or **GCS** (Google Cloud Storage), you will need a Cloud Provider for that account. For more information, see [AWS S3](../../account/manage-connectors/add-amazon-web-services-cloud-provider.md) and [Google Cloud Storage (GCS)](../../account/manage-connectors/add-google-cloud-platform-cloud-provider.md).

To fetch the `passwordSecretId` use:

* [Encrypted Text API](api-encrypted-text.md#get-a-secret-by-name)
* [WinRM Credentials API](api-win-rm-credentials.md#get-a-secret-by-name)
* [SSH Credentials API](api-ssh-credentials.md#get-a-secret-by-name)

### HTTP Server

It is the type of server where the repo is hosted.

#### Request

You create a Helm Artifact Source using the mutation `createConnector`.


```
mutation CreateConnector($connector: CreateConnectorInput!) {  
  createConnector(input: $connector) {  
    clientMutationId  
    connector {  
      ...on HttpHelmRepoConnector{  
      name  
      id  
      }  
    }  
  }  
}
```
#### Query Variables

The Query Variables follow this syntax, with `connectorType` identifying the Helm Artifact Source to create.


```
{  
    "connector": {  
      "connectorType": "HTTP_HELM_REPO",  
      "helmConnector":  {  
        "name":"$name",  
        "httpServerPlatformDetails": {  
          "URL": "https://nexus.test.harness.io/repository/helm/",  
          "passwordSecretId": "$passwordSecretId",  
          "userName": "harnessadmin"  
        }  
      }  
    }  
  }
```
### GCS (Google Cloud Storage)

It is the type of server where the repo is hosted.

#### Request

You create a Helm Artifact Source using the mutation `createConnector`.


```
mutation CreateConnector($connector: CreateConnectorInput!) {  
  createConnector(input: $connector) {  
    clientMutationId  
    connector {  
      ...on GCSHelmRepoConnector{  
      name  
      id  
      }  
    }  
  }  
}
```
#### Query Variables

The Query Variables follow this syntax, with `connectorType` identifying the Helm Artifact Source to create.

To get the cloud provider ID, see [Find Cloud Provider by Name](use-cloud-providers-api.md#step-6-find-cloud-provider-by-name).


```
 {  
    "connector": {  
      "connectorType": "GCS_HELM_REPO",  
      "helmConnector":  {  
        "name":"$name",  
        "gcsPlatformDetails": {  
          "googleCloudProvider": "$googleCloudProvider",  
          "bucketName" : "$bucketName"  
        }  
      }  
    }  
  }
```
### Amazon S3

It is the type of server where the repo is hosted. For more information, see

#### Request

You create a Helm Artifact Source using the mutation `createConnector`.


```
mutation CreateConnector($connector: CreateConnectorInput!) {  
  createConnector(input: $connector) {  
    clientMutationId  
    connector {  
      ...on AmazonS3HelmRepoConnector{  
      name  
      id  
      }  
    }  
  }  
}
```
#### Query Variables

The Query Variables follow this syntax, with `connectorType` identifying the Helm Artifact Source to create.


```
{  
  "connector": {  
    "connectorType": "AMAZON_S3_HELM_REPO",  
    "helmConnector":  {  
      "name":"$name",  
      "amazonS3PlatformDetails": {  
        "awsCloudProvider": "$awsCloudProvider",  
        "bucketName" : "$bucketName",  
        "region" : "$region"  
      }  
    }  
  }  
}
```
### Helm OCI Registries

#### Request

You create a Helm Artifact Source using the mutation `createConnector`.


```
mutation CreateConnector($connector: CreateConnectorInput!) {  
  createConnector(input: $connector) {  
    clientMutationId  
    connector {  
      ...on OciHelmRepoConnector{  
      name  
      id  
      }  
    }  
  }  
}
```
#### Query Variables

The Query Variables follow this syntax, with `connectorType` identifying the Helm Artifact Source to create.


```
{  
    "connector": {  
      "connectorType": "OCI_HELM_REPO",  
      "helmConnector":  {  
        "name":"$name",  
        "ociPlatformDetails": {  
          "URL": "acr-server.azurecr.io",  
          "passwordSecretId": "$passwordSecretId",  
          "userName": "harnessadmin"  
        }  
      }  
    }  
  }
```
#### Authentication Supported

For GCR as an OCI registry, Harness support authentication using the following:

* Access token
* A JSON key file where username is `_json_key_base64` and password is base64-encoded JSON key file content.

Harness does not support a username of `_json_key` and password as unencrypted JSON key file content.

## Step: Update a Helm Artifact Source

Use this sample query to update a Helm Artifact Source.

### HTTP

It is the type of server where the repo is hosted.

#### Request

You update a Helm Artifact Source using the mutation `updateConnector`.


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

The Query Variables follow this syntax, with `connectorType` identifying the Helm Artifact Source to update. See [Fetch the Connector ID](add-a-helm-artifact-source-using-api.md#fetch-the-connector-id) to get the connector ID details.


```
{  
  "connector": {  
    "connectorType": "HTTP_HELM_REPO",  
    "connectorId": "$connectorId",  
    "helmConnector": {  
      "name": "$name",  
      "httpServerPlatformDetails": {  
        "URL": "https://nexus.test.harness.io/repository/helm/",  
        "passwordSecretId": "$passwordSecretId",  
        "userName": "harnesstest"  
      }  
    }  
  }  
}  

```
#### Fetch the Connector ID

Use the following query to fetch the `ID` of a connector. A list of connectors is returned based on the set filters. You can select the `ID` of the connector that you want to update.


```
query  
{  
  connectors(filters: [{connectorType: {operator: EQUALS, values: HTTP_HELM_REPO}}], limit: 20) {  
    nodes {  
      name  
      id  
    }  
  }  
}
```
### GCS

It is the type of server where the repo is hosted.

#### Request

You update a Helm Artifact Source using the mutation `updateConnector`.


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

The Query Variables follow this syntax, with `connectorType` identifying the Helm Artifact Source to update. See [Fetch the Connector ID](add-a-helm-artifact-source-using-api.md#fetch-the-connector-id-2) to get the connector ID details.


```
{  
  "connector": {  
    "connectorType": "GCS_HELM_REPO",  
    "connectorId": "$connectorId",  
    "helmConnector": {  
      "name": "$name",  
      "gcsPlatformDetails": {  
        "googleCloudProvider": "Test GCP",  
        "bucketName" : "test-gcs"  
      }  
    }  
  }  
}  

```
#### Fetch the Connector ID

Use the following query to fetch the `ID` of a connector. A list of connectors is returned based on the set filters. You can select the `ID` of the connector that you want to update.


```
query  
{  
  connectors(filters: [{connectorType: {operator: EQUALS, values: GCS_HELM_REPO}}], limit: 20) {  
    nodes {  
      name  
      id  
    }  
  }  
}
```
### Amazon S3

#### Request

You update a Helm Artifact Source using the mutation `updateConnector`.


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

The Query Variables follow this syntax, with `connectorType` identifying the Helm Artifact Source to update. See [Fetch the Connector ID](add-a-helm-artifact-source-using-api.md#fetch-the-connector-id-3) to get the connector ID details.


```
{  
  "connector": {  
    "connectorType": "AMAZON_S3_HELM_REPO",  
    "connectorId": "$connectorId",  
    "helmConnector": {  
      "name": "$name",  
      "amazonS3PlatformDetails": {  
        "awsCloudProvider": "Test GCP",  
        "bucketName" : "test-gcs",  
        "region" : "us-east-1"  
      }  
    }  
  }  
}
```
#### Fetch the Connector ID

Use the following query to fetch the `ID` of a connector. A list of connectors is returned based on the set filters. You can select the `ID` of the connector that you want to update.


```
query  
{  
  connectors(filters: [{connectorType: {operator: EQUALS, values: AMAZON_S3_HELM_REPO}}], limit: 20) {  
    nodes {  
      name  
      id  
    }  
  }  
}
```
### Helm OCI Registries

#### Request

You update a Helm Artifact Source using the mutation `updateConnector`.


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

The Query Variables follow this syntax, with `connectorType` identifying the Helm Artifact Source to update. See [Fetch the Connector ID](add-a-helm-artifact-source-using-api.md#fetch-the-connector-id-3) to get the connector ID details.


```
{  
  "connector": {  
    "connectorType": "OCI_HELM_REPO",  
    "connectorId": "$connectorId",  
    "helmConnector": {  
      "name": "$name",  
      "ociPlatformDetails": {  
        "URL": "acr-server.azurecr.io",  
        "passwordSecretId": "$passwordSecretId",  
        "userName": "harnesstest"  
      }  
    }  
  }  
}
```
#### Fetch the Connector ID

Use the following query to fetch the `ID` of a connector. A list of connectors is returned based on the set filters. You can select the `ID` of the connector that you want to update.


```
query  
{  
  connectors(filters: [{connectorType: {operator: EQUALS, values: OCI_HELM_REPOgrgr}}], limit: 20) {  
    nodes {  
      name  
      id  
    }  
  }  
}
```
## Step: Delete a Helm Artifact Source

You delete a Helm Artifact Source using the mutation `deleteConnector`. Deleting a Helm Artifact Source requires its `ID` only.


```
mutation DeleteConnectorMutation($connector: DeleteConnectorInput!) {  
  deleteConnector(input: $connector) {  
    clientMutationId  
  }  
}
```
#### Query Variables

Query Variables, with `connectorId` identifies the Helm Artifact Source to delete.


```
{  
  "connector": {  
    "connectorId": "xxxxxx"  
  }  
}
```
