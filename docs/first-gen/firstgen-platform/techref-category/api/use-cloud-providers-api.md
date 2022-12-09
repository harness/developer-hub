---
title: Use Cloud Providers API
description: Use the Cloud Providers API
sidebar_position: 80
helpdocs_topic_id: dfx0qi1zf7
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

You can create, read, update, and delete [Harness Cloud Providers](../../account/manage-connectors/cloud-providers.md) using the Harness API.

This topic provides information on querying and managing all Cloud Provider types.


## Before You Begin

* Review the [Harness API](harness-api.md)
* [Add Cloud Providers](../../account/manage-connectors/cloud-providers.md)

## Step 1: Create a Cloud Provider

You create a Cloud Provider using the mutation `createCloudProvider`.

It has the following syntax:


```
mutation CreateCloudProviderMutation($cloudProvider: CreateCloudProviderInput!) {  
  createCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```
For each type of Cloud Provider you want to add, you use the **Query Variables** section to add its specific inputs.

The requirements for each Cloud Provider type can be found in their input arguments:

* `awsCloudProvider: AwsCloudProviderInput`
* `azureCloudProvider: AzureCloudProviderInput`
* `gcpCloudProvider: GcpCloudProviderInput`
* `k8sCloudProvider: K8sCloudProviderInput`
* `pcfCloudProvider: PcfCloudProviderInput`
* `physicalDataCenterCloudProvider: PhysicalDataCenterCloudProviderInput`
* `spotInstCloudProvider: SpotInstCloudProviderInput`

For example, to add a Google Cloud Platform (GCP) Cloud Provider, you would use something similar to the following:


```
{  
  "cloudProvider": {  
    "cloudProviderType": "GCP",  
    "gcpCloudProvider": {  
      "name": "gcp-api-test",  
      "serviceAccountKeySecretId":"xxxxxx"  
    }  
  }  
}
```
## Step 2: Update a Cloud Provider

The syntax for the **Query Variables** when updating is almost identical to the **Query Variables** when creating, with the addition of `cloudProviderId`. You simply need to enter the ID of the Cloud Provider you want to update.

For the required update arguments, see:

* `awsCloudProvider: UpdateAwsCloudProviderInput`
* `azureCloudProvider: UpdateAzureCloudProviderInput`
* `gcpCloudProvider: UpdateGcpCloudProviderInput`
* `k8sCloudProvider: UpdateK8sCloudProviderInput`
* `pcfCloudProvider: UpdatePcfCloudProviderInput`
* `physicalDataCenterCloudProvider: UpdatePhysicalDataCenterCloudProviderInput`
* `spotInstCloudProvider: UpdateSpotInstCloudProviderInput`

Query — This is the exact same query for all Cloud Provider types:


```
mutation UpdateCloudProviderMutation($cloudProvider: UpdateCloudProviderInput!) {  
  updateCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```
The Query Variables follow this syntax, with `cloudProviderId` identifying the Cloud Provider to update:


```
{  
  "cloudProvider": {  
    "cloudProviderType": "PCF",  
    "cloudProviderId": "fGPZikQkR2-pycuf4PzlQA",  
    "pcfCloudProvider": {  
      "name": "pcf-api-test",  
      "endpointUrl": "api.run.pivotal.io",  
      "userName": "john.doe@mycompany.com",  
      "passwordSecretId":"xxxxxx"     
    }  
  }  
}
```
## Step 3: Delete a Cloud Provider

Deleting a Cloud Provider requires its ID only.

Query — This is the exact same query for all Cloud Provider types:


```
mutation DeleteCloudProviderMutation($deleteCloudProvider: DeleteCloudProviderInput!) {  
  deleteCloudProvider(input: $deleteCloudProvider) {  
    clientMutationId  
  }  
}
```
Query Variables, with `cloudProviderId` identifying the Cloud Provider to delete:


```
{  
  "deleteCloudProvider": {  
    "cloudProviderId": "xxxxxxx"  
    }  
}
```
Output:


```
{  
  "data": {  
    "deleteCloudProvider": {  
      "clientMutationId": null  
    }  
  }  
}
```
## Step 4: Find all Cloud Providers by Type

The first step is usually to get a list of all Harness Cloud Providers by type using `cloudProviders()`.

The results are a list of all the matching Cloud Providers and their IDs and names.

You can then use the ID with `cloudProviderById()` later in this topic.

Here is an example of the list API with `cloudProviders()`.


```
{  
  cloudProviders(  
    filters: [{ cloudProviderType:{operator: EQUALS, values: [AWS]}  
    }]  
    limit: 10  
    offset: 0  
  ) {  
    nodes{  
      id  
      name  
    }  
  }  
}
```
Output example:


```
{  
  "data": {  
    "cloudProviders": {  
      "nodes": [  
        {  
          "id": "FOGeZTkeTLyH7Vo2zaPcwg",  
          "name": "harness-aws-prod",  
          "createdAt": 1498090708170,  
          "createdBy": {  
            "id": "igZG8TuNSoijwZ3ZsmiOOQ"  
          }  
        },  
        {  
          "id": "62q28QZmRO6vvw2UoWgU5Q",  
          "name": "harness_awd_nonprod",  
          "createdAt": 1496431015854,  
          "createdBy": {  
            "id": "BNxVi6x-R2SeFAGlxo2HtA"  
          }  
        }  
      ]  
    }  
  }  
}
```
Now you can use the ID with `cloudProviderById()` below.

## Step 5: Search for Cloud Provider by ID

Using the Cloud Providers ID, you can run `cloudProvider(cloudProviderId)` or `cloudProviderById()`.

First, let's run `cloudProvider(cloudProviderId)`:


```
{  
  cloudProvider(cloudProviderId: "7VquTr1tQmer76b8rIW_0w") {  
    id  
    name  
    type  
  }  
}
```
Output example:


```
{  
  "data": {  
    "cloudProvider": {  
      "id": "7VquTr1tQmer76b8rIW_0w",  
      "name": "aws",  
      "type": "AWS"  
    }  
  }  
}
```
Next, let use `cloudProviderById()`:


```
query cloudProviderById {  
  cloudProvider(  
    cloudProviderId: "jzt2wbM_T-O0gser40V8yg"  
  ){  
    id  
    name  
    type  
    createdAt  
    createdBy {  
      id  
    }  
  }  
}
```
Output example:


```
{  
  "data": {  
    "cloudProvider": {  
      "id": "jzt2wbM_T-O0gser40V8yg",  
      "name": "aws",  
      "type": "AWS",  
      "createdAt": 1508103092828,  
      "createdBy": {  
        "id": "m7akhDYLRG6dGFy4G6FEMw"  
      }  
    }  
  }  
}
```
## Step 6: Find Cloud Provider by Name

Using the Cloud Provider's name, run `cloudProviderByName`:


```
query cloudProviderByName {  
 cloudProviderByName(  
   name: "aws"  
 ){  
   id  
   name  
   type  
   createdAt  
   createdBy {  
     id  
   }  
 }  
}
```
Output example:


```
{  
 "data": {  
   "cloudProviderByName": {  
     "id": "jzt2wbM_T-O0gser40V8yg",  
     "name": "aws",  
     "type": "AWS",  
     "createdAt": 1508103092828,  
     "createdBy": {  
       "id": "m7akhDYLRG6dGFy4G6FEMw"  
     }  
   }  
 }  
}
```
## Examples

In this section are examples of creating and updating the different Harness Cloud Provider types.

Each type has different methods for entering credentials. The examples below simply provide a single credential method.

For all of the available methods and syntax, look up the following in the API Explorer **Docs**:

* `awsCloudProvider: AwsCloudProviderInput`
* `azureCloudProvider: AzureCloudProviderInput`
* `gcpCloudProvider: GcpCloudProviderInput`
* `k8sCloudProvider: K8sCloudProviderInput`
* `pcfCloudProvider: PcfCloudProviderInput`
* `physicalDataCenterCloudProvider: PhysicalDataCenterCloudProviderInput`
* `spotInstCloudProvider: SpotInstCloudProviderInput`

### Encrypted Keys Requirements

Most of the Cloud Providers require encrypted text or files, which are created in Harness Secrets Management.

In the API, the `serviceAccountKeySecretId` argument is used to provide the ID of the Harness Encrypted Text or Files.

You can find this ID using the name of the encrypted text secret:


```
query{  
  secretByName(name:"<secret_name>",secretType:ENCRYPTED_TEXT){  
... on EncryptedText{  
      id  
      name  
      secretManagerId  
    }  
 }  
}
```
The output will give you the ID you need in `id`:


```
{  
  "data": {  
    "secretByName": {  
      "id": "xxxxxx",  
      "name": "my-secret",  
      "secretManagerId": "xxxxx"  
    }  
  }  
}
```
See [Encrypted Text API](api-encrypted-text.md), [Encrypted Files API](api-encrypted-files.md), [Use Encrypted Text Secrets](../../security/secrets-management/use-encrypted-text-secrets.md), and [Use Encrypted File Secrets](../../security/secrets-management/use-encrypted-file-secrets.md).

### GCP

The GCP Cloud Provider uses the `gcpCloudProvider: GcpCloudProviderInput` API.

#### Create

##### Query


```
mutation CreateCloudProviderMutation($cloudProvider: CreateCloudProviderInput!) {  
  createCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```

##### Query Variables (Using Encrypted Key)


```
{  
  "cloudProvider": {  
    "cloudProviderType": "GCP",  
    "gcpCloudProvider": {  
      "name": "gcp-api-test",  
      "serviceAccountKeySecretId":"xxxxxx"  
    }  
  }  
}
```

##### Query Variables (Using Inherit From Delegate)

Currently, this feature is behind a Feature Flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature. Feature Flags can only be removed for Harness Professional and Essentials editions. Once the feature is released to a general audience, it is available for Trial and Community Editions.
```
{  
  "cloudProvider": {  
    "cloudProviderType": "GCP",  
    "gcpCloudProvider": {  
      "name": "gcp-graphql-api-test1",  
      "useDelegate": true,  
      "delegateSelector": "primary",  
      "skipValidation": true  
    }  
  }  
}
```

##### Output


```
{  
  "data": {  
    "createCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "1MxfobsdSMmvogK_NMGrNg",  
        "name": "gcp-api-test",  
        "type": "GCP"  
      }  
    }  
  }  
}
```
#### Update


##### Query 


```
mutation UpdateCloudProviderMutation($cloudProvider: UpdateCloudProviderInput!) {  
  updateCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```

##### Query Variables (Using Encrypted Key)


```
{  
  "cloudProvider": {  
    "cloudProviderId": "1MxfobsdSMmvogK_NMGrNg",  
    "cloudProviderType": "GCP",  
    "gcpCloudProvider": {  
      "name": "gcp-api-test",  
      "serviceAccountKeySecretId":"xxxxx"  
    }  
  }  
}
```

##### Query Variables (Using Inherit From Delegate)

Currently, this feature is behind a Feature Flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature. Feature Flags can only be removed for Harness Professional and Essentials editions. Once the feature is released to a general audience, it is available for Trial and Community Editions.
```
{  
  "cloudProvider": {  
    "cloudProviderId": "d9-31Bl7Tj6oEjBf4ONCZw",  
    "cloudProviderType": "GCP",  
    "gcpCloudProvider": {  
      "name": "gcp-graphql-api-test1",  
      "useDelegate": true,  
      "delegateSelector": "cidelegate",  
      "skipValidation": true  
    }  
  }  
}
```

##### Output


```
{  
  "data": {  
    "updateCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "1MxfobsdSMmvogK_NMGrNg",  
        "name": "gcp-api-test",  
        "type": "GCP"  
      }  
    }  
  }  
}
```
### AWS

The AWS Cloud Provider uses the `awsCloudProvider: AwsCloudProviderInput` API.

#### Create


##### Query 


```
mutation CreateCloudProviderMutation($cloudProvider: CreateCloudProviderInput!) {  
  createCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```

##### Query Variables


```
{  
  "cloudProvider": {  
    "cloudProviderType": "AWS",  
    "awsCloudProvider": {  
      "name": "aws-api-test",  
      "credentialsType": "MANUAL",  
      "manualCredentials": {  
        "accessKey": "xxxxxxx",  
        "secretKeySecretId": "xxxxxxx"  
      }  
    }  
  }  
}
```
The above example is for manual credentials. You can also use `ec2IamCredentials`. and other settings. See `AwsCloudProviderInput` the API Explorer **Docs**.

##### Output


```
{  
  "data": {  
    "createCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "VxnSK60OS8aLryPyBhV0RQ",  
        "name": "aws-api-test",  
        "type": "AWS"  
      }  
    }  
  }  
}
```
#### Update

##### Query 


```
mutation UpdateCloudProviderMutation($cloudProvider: UpdateCloudProviderInput!) {  
  updateCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```
##### Query Variables


```
{  
  "cloudProvider": {  
    "cloudProviderType": "AWS",  
    "cloudProviderId": "VxnSK60OS8aLryPyBhV0RQ",  
    "awsCloudProvider": {  
      "name": "aws-api-test",  
      "credentialsType": "MANUAL",  
      "manualCredentials": {  
        "accessKey": "xxxxxx",  
        "secretKeySecretId": "xxxxxx"  
      }  
    }  
  }  
}
```

##### Output


```
{  
  "data": {  
    "updateCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "VxnSK60OS8aLryPyBhV0RQ",  
        "name": "aws-api-test",  
        "type": "AWS"  
      }  
    }  
  }  
}
```
### Azure

The Azure Cloud Provider uses the `azureCloudProvider: AzureCloudProviderInput` API.

#### Create


##### Query


```
mutation CreateCloudProviderMutation($cloudProvider: CreateCloudProviderInput!) {  
  createCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```

##### Query Variables


```
{  
  "cloudProvider": {  
    "cloudProviderType": "AZURE",  
    "azureCloudProvider": {  
      "name": "azure-api-test",  
      "clientId": "xxxxx",  
      "tenantId": "xxxxx",  
      "keySecretId": "xxxxx"  
    }  
  }  
}
```

##### Output


```
{  
  "data": {  
    "createCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "fGPZikQkR2-pycuf4PzlQA",  
        "name": "azure-api-test",  
        "type": "AZURE"  
      }  
    }  
  }  
}
```
#### Update


##### Query


```
mutation UpdateCloudProviderMutation($cloudProvider: UpdateCloudProviderInput!) {  
  updateCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```

##### Query Variables


```
{  
  "cloudProvider": {  
    "cloudProviderType": "AZURE",  
    "cloudProviderId": "fGPZikQkR2-pycuf4PzlQA",  
    "azureCloudProvider": {  
      "name": "azure-api-test",  
      "clientId": "xxxxx",  
      "tenantId": "xxxxx",  
      "keySecretId": "xxxxx"  
    }  
  }  
}
```

##### Output


```
{  
  "data": {  
    "updateCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "fGPZikQkR2-pycuf4PzlQA",  
        "name": "azure-api-test",  
        "type": "AZURE"  
      }  
    }  
  }  
}
```
### Pivotal (PCF)

The PCF Cloud Provider uses the `pcfCloudProvider: PcfCloudProviderInput` API.

#### Create


##### Query


```
mutation CreateCloudProviderMutation($cloudProvider: CreateCloudProviderInput!) {  
  createCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```

##### Query Variables


```
{  
  "cloudProvider": {  
    "cloudProviderType": "PCF",  
    "pcfCloudProvider": {  
      "name": "pcf-api-test",  
      "endpointUrl": "api.run.pivotal.io",  
      "userName": "john.doe@mycompany.com",  
      "passwordSecretId":"xxxxxx"  
    }  
  }  
}
```

##### Output


```
{  
  "data": {  
    "updateCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "fGPZikQkR2-pyucf4PzlQA",  
        "name": "pcf-api-test",  
        "type": "PCF"  
      }  
    }  
  }  
}
```
#### Update


##### Query


```
mutation UpdateCloudProviderMutation($cloudProvider: UpdateCloudProviderInput!) {  
  updateCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```

##### Query Variables


```
{  
  "cloudProvider": {  
    "cloudProviderType": "PCF",  
    "cloudProviderId": "fGPZikQkR2-pycuf4PzlQA",  
    "pcfCloudProvider": {  
      "name": "pcf-api-test",  
      "endpointUrl": "api.run.pivotal.io",  
      "userName": "john.doe@mycompany.com",  
      "passwordSecretId":"xxxxxx"     
    }  
  }  
}
```

##### Output


```
{  
  "data": {  
    "updateCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "fGPZikQkR2-pyucf4PzlQA",  
        "name": "pcf-api-test",  
        "type": "PCF"  
      }  
    }  
  }  
}
```
### Spotinst

The Spotinst Cloud Provider uses the `spotInstCloudProvider: SpotInstCloudProviderInput` API.

#### Create

##### Query 


```
mutation CreateCloudProviderMutation($cloudProvider: CreateCloudProviderInput!) {  
  createCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```
##### Query Variables 


```
{  
  "cloudProvider": {  
    "cloudProviderType": "SPOT_INST",  
    "spotInstCloudProvider": {  
      "name": "spotinst-api-test",  
      "accountId": "xxxxxx",  
      "tokenSecretId": "xxxxxx"  
    }  
  }  
}
```
##### Output 


```
{  
  "data": {  
    "createCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "oFrVUcq7RTm7h23JK5FJ1g",  
        "name": "spotinst-api-test",  
        "type": "SPOT_INST"  
      }  
    }  
  }  
}
```
#### Update

##### Query: 


```
mutation UpdateCloudProviderMutation($cloudProvider: UpdateCloudProviderInput!) {  
  updateCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```
##### Query Variables 


```
{  
  "cloudProvider": {  
    "cloudProviderType": "SPOT_INST",  
    "cloudProviderId": "oFrVUcq7RTm7h23JK5FJ1g",  
    "spotInstCloudProvider": {  
      "name": "spotinst-api-test",  
      "accountId": "xxxxxx",  
      "tokenSecretId": "xxxxxx"  
    }  
  }  
}
```
##### Output 


```
{  
  "data": {  
    "updateCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "oFrVUcq7RTm7h23JK5FJ1g",  
        "name": "spotinst-api-test",  
        "type": "SPOT_INST"  
      }  
    }  
  }  
}
```
### Kubernetes

The Kubernetes Cloud Provider uses the `k8sCloudProvider: K8sCloudProviderInput` API

#### Create

##### Query 


```
mutation CreateCloudProviderMutation($cloudProvider: CreateCloudProviderInput!) {  
  createCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```
##### Query Variables 


```
{  
  "cloudProvider": {  
    "cloudProviderType": "KUBERNETES_CLUSTER",  
    "k8sCloudProvider": {  
      "name": "k8s-api-test",  
      "skipValidation": true,  
      "clusterDetailsType": "INHERIT_CLUSTER_DETAILS",  
      "inheritClusterDetails": {  
        "delegateName": "harness-dev-delegate"  
      }  
    }  
  }  
}
```
The example above inherits credentials from a Harness Delegate (typically running in the target cluster). For manual cluster credential details, use `manualClusterDetails: UpdateManualClusterDetails`.

##### Output 


```
{  
  "data": {  
    "createCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "OmvkypLgQwCdaTvV4JexIg",  
        "name": "k8s-api-test",  
        "type": "KUBERNETES_CLUSTER"  
      }  
    }  
  }  
}
```
#### Update

##### Query: 


```
mutation UpdateCloudProviderMutation($cloudProvider: UpdateCloudProviderInput!) {  
  updateCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```
##### Query Variables 


```
{  
  "cloudProvider": {  
    "cloudProviderType": "KUBERNETES_CLUSTER",  
    "cloudProviderId": "OmvkypLgQwCdaTvV4JexIg",  
    "k8sCloudProvider": {  
      "name": "k8s-api-test",  
      "skipValidation": true,  
      "clusterDetailsType": "INHERIT_CLUSTER_DETAILS",  
      "inheritClusterDetails": {  
        "delegateName": "harness-qa-delegate"  
      }  
    }  
  }  
}
```
##### Output 


```
{  
  "data": {  
    "updateCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "OmvkypLgQwCdaTvV4JexIg",  
        "name": "k8s-api-test",  
        "type": "KUBERNETES_CLUSTER"  
      }  
    }  
  }  
}
```
### Physical Data Center

The Physical Data Center Cloud Provider uses the `physicalDataCenterCloudProvider: PhysicalDataCenterCloudProviderInput` API.

#### Create

##### Mutation 


```
mutation CreateCloudProviderMutation($cloudProvider: CreateCloudProviderInput!) {  
  createCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```
#####  Query Variables 

Physical Data Center is the only Cloud Provider that uses `usageScope`:


```
{  
 "cloudProvider": {  
   "cloudProviderType": "PHYSICAL_DATA_CENTER",  
   "physicalDataCenterCloudProvider": {  
     "name": "phys-api-test",  
     "usageScope": {  
       "appEnvScopes": {  
         "application": {  
           "appId": "kk-J4MUAR2qcaIjZ2HanYg"  
         },  
         "environment": {  
           "envId": null,  
           "filterType": "NON_PRODUCTION_ENVIRONMENTS"  
         }  
       }  
     }  
   }  
 }  
}
```
Note that the `appId` is used in `application`. You can use `filterType` instead, but you cannot use `appId` and `filterType` together. If you do, you will receive this error:

`Exception while fetching data (/createCloudProvider) : Invalid request: Cannot set both appId and filterType in the app filter`

##### Output 


```
{  
  "data": {  
    "createCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "Prmk_uaKTXqhSO_ZxtGaDQ",  
        "name": "phys-api-test",  
        "type": "PHYSICAL_DATA_CENTER"  
      }  
    }  
  }  
}
```
#### Update

##### Query  


```
mutation UpdateCloudProviderMutation($cloudProvider: UpdateCloudProviderInput!) {  
  updateCloudProvider(input: $cloudProvider) {  
    clientMutationId  
    cloudProvider {  
      id  
      name  
      type  
    }  
  }  
}
```
##### Query Variables 


```
{  
 "cloudProvider": {  
   "cloudProviderType": "PHYSICAL_DATA_CENTER",  
  "cloudProviderId": "Prmk_uaKTXqhSO_ZxtGaDQ",  
   "physicalDataCenterCloudProvider": {  
     "name": "phys-api-test",  
     "usageScope": {  
       "appEnvScopes": {  
         "application": {  
           "appId": "kk-J4MUAR2qcaIjZ2HanYg"  
         },  
         "environment": {  
           "envId": null,  
           "filterType": "NON_PRODUCTION_ENVIRONMENTS"  
         }  
       }  
     }  
   }  
 }  
}
```
##### Output 


```
{  
  "data": {  
    "updateCloudProvider": {  
      "clientMutationId": null,  
      "cloudProvider": {  
        "id": "Prmk_uaKTXqhSO_ZxtGaDQ",  
        "name": "phys-api-test",  
        "type": "PHYSICAL_DATA_CENTER"  
      }  
    }  
  }  
}
```
