---
title: Fetch Artifact Type Details Using GraphQL APIs
description: Describes how to fetch details of Artifact Type using GraphQL APIs.
sidebar_position: 170
helpdocs_topic_id: nrl5r5zj94
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

The Artifact Source defines where the Artifact Collection step will look for the build artifact during the Build Workflow. The Artifact Source for the Service lists the file(s) that you want to be copied to the target host(s).

To add an Artifact source to a Harness Service, you add an Artifact Server as a Harness Connector, and then use that Connector in your Service along with the specific details.

This topic describes how to fetch Artifact Type details using GraphQL APIs.


## Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)
* [Service Types and Artifact Sources](../../../continuous-delivery/model-cd-pipeline/setup-services/service-types-and-artifact-sources.md)
* [Fetch Artifact Source Details Using GraphQL APIs](artifact-source-api.md)

## Fetch Details of Jenkins Artifact Type

Use this request to get the details of `Jenkins Artifact Type` in your Service.

### Request


```
query{  
  service(serviceId:"Jw1sMNZ5QxCa69y1tYIjtQ"){  
    artifactType  
     artifactSources{  
      name  
      createdAt  
      __typename  
      ...on JenkinsArtifactSource{  
        artifactPaths  
        jenkinsConnectorId  
        jobName  
      }  
    }  
  }  
}  

```
### Response


```
 {  
  "data": {  
    "service": {  
      "artifactType": "WAR",  
      "artifactSources": [  
        {  
          "name": "jenkins sourc",  
          "createdAt": 1595231474582,  
          "__typename": "JenkinsArtifactSource",  
          "artifactPaths": null,  
          "jenkinsConnectorId": "5FOKeaR_T1u0aJqnJBVCMg",  
          "jobName": "garvit-test"  
        }  
      ]  
    }  
  }  
}
```
## Fetch Details of Bamboo Artifact Type

Use this request to get the details of `Bamboo Artifact Type` in your Service.

### Request


```
query{  
  service(serviceId:"p06KjT4XSQWYzvWT08wVuQ"){  
    artifactType  
     artifactSources{  
      name  
      createdAt  
      __typename  
      ...on BambooArtifactSource{  
        bambooConnectorId  
        planKey  
        artifactPaths  
      }  
    }  
  }  
}  

```
### Response


```
 {  
  "data": {  
    "service": {  
      "artifactType": "WAR",  
      "artifactSources": [  
        {  
          "name": "Azure",  
          "createdAt": 1592812060753,  
          "__typename": "AzureArtifactsArtifactSource"  
        },  
        {  
          "name": "bamb-art",  
          "createdAt": 1594412813789,  
          "__typename": "BambooArtifactSource",  
          "bambooConnectorId": "dgZR6uVcRkiXluv3AQGddg",  
          "planKey": "TES-GAR",  
          "artifactPaths": [  
            "metadata.json/metadata.json"  
          ]  
        }      ]  
    }  
  }  
}
```
## Fetch Details of Docker Registry Artifact Type

Use this request to get the details of `Docker Registry Artifact Type` in your Service.

### Request


```
query{  
  service(serviceId:"BYmnREO7TqS1FBDDScmTig"){  
    artifactType  
     artifactSources{  
      name  
      createdAt  
      __typename  
     ...on DockerArtifactSource{  
        dockerConnectorId  
        imageName  
      }  
    }  
  }  
}  
  
```
### Response


```
 {  
  "data": {  
    "service": {  
      "artifactType": "DOCKER",  
      "artifactSources": [  
        {  
          "name": "docker registry image",  
          "createdAt": 1595231711747,  
          "__typename": "DockerArtifactSource",  
          "dockerConnectorId": "GsON7vLBTmiPAUb5Esb_7g",  
          "imageName": "library/nginx"  
        }  
      ]  
    }  
  }  
}
```
## Fetch Details of Elastic Container Registry (ECR) Artifact Type

Use this request to get the details of `ECR Artifact Type` in your Service.

### Request


```
query{  
  service(serviceId:"s6hh7zepSEKW7SB5bEIjHA"){  
    artifactType  
     artifactSources{  
      name  
      createdAt  
      __typename  
     ...on ECRArtifactSource{  
        awsCloudProviderId  
        region  
      imageName  
      }  
    }  
  }  
}
```
### Response


```
 {  
  "data": {  
    "service": {  
      "artifactType": "PCF",  
      "artifactSources": [  
        {  
          "name": "kenngrepo",  
          "createdAt": 1595234322476,  
          "__typename": "ECRArtifactSource",  
          "awsCloudProviderId": "AGXNwNkGT8ye0XKDEbkd-A",  
          "region": "us-east-1",  
          "imageName": "kenngrepo"  
        }  
      ]  
    }  
  }  
}  

```
## Fetch Details of Google Cloud Container Registry (GCR) Artifact Type

Use this request to get the details of `GCR Artifact Type` in your Service.

### Request


```
query{  
  service(serviceId:"SBZ6P2kKTpWnWERJNVNs0Q"){  
    artifactType  
     artifactSources{  
      name  
      createdAt  
      __typename  
      ...on GCRArtifactSource{  
        gcpCloudProviderId  
        dockerImageName  
        registryHostName  
      }  
    }  
  }  
}
```
### Response


```
 {  
  "data": {  
    "service": {  
      "artifactType": "DOCKER",  
      "artifactSources": [  
        {  
          "name": "us-gcr-io_qa-target_todolist",  
          "createdAt": 1594717525639,  
          "__typename": "GCRArtifactSource",  
          "gcpCloudProviderId": "BYAMglynSUy5HPF7qgZgAA",  
          "dockerImageName": "qa-target/todolist",  
          "registryHostName": "us.gcr.io"  
        }  
      ]  
    }  
  }  
}
```
## Fetch Details of Azure Container Registry (ACR) Artifact Type

Use this request to get the details of `ACR Artifact Type` in your Service.

### Request


```
query{  
  service(serviceId:"21DHLvJpRRedwtPPPr9VCA"){  
    artifactType  
     artifactSources{  
      name  
      createdAt  
      __typename  
     ...on ACRArtifactSource{  
        azureCloudProviderId  
        subscriptionId  
      registryName  
      repositoryName  
        
      }  
    }  
  }  
}
```
### Response


```
 {  
  "data": {  
    "service": {  
      "artifactType": "DOCKER",  
      "artifactSources": [  
        {  
          "name": "azure reg",  
          "createdAt": 1595232155101,  
          "__typename": "ACRArtifactSource",  
          "azureCloudProviderId": "qoCIKr94RhSm6b1OIjNw8w",  
          "subscriptionId": "20d6a917-99fa-4b1b-9b2e-a3d624e9dcf0",  
          "registryName": "harnessqa",  
          "repositoryName": "hello-world-server"  
        }  
      ]  
    }  
  }  
}
```
## Fetch Details of Nexus Artifact Type

Use this request to get the details of `Nexus Artifact Type` in your Service.

### Request


```
query{  
  service(serviceId:"VsCTz0rFT_u6H_VZLePtLQ"){  
    artifactType  
     artifactSources{  
      name  
      createdAt  
      __typename  
     ...on NexusArtifactSource{  
       properties{  
        nexusConnectorId  
        repositoryFormat  
        repository  
        ...on NexusDockerProps{dockerImageName dockerRegistryUrl}  
      }  
      }  
    }  
  }  
}  
  
  
```
### Response


```
 {  
  "data": {  
    "service": {  
      "artifactType": "DOCKER",  
      "artifactSources": [  
        {  
          "name": "nexus 3 docker image",  
          "createdAt": 1595233491249,  
          "__typename": "NexusArtifactSource",  
          "properties": {  
            "nexusConnectorId": "FzHdv_IiScGGwzIoFtNLow",  
            "repositoryFormat": "DOCKER",  
            "repository": "docker-group",  
            "dockerImageName": "alpine",  
            "dockerRegistryUrl": null  
          }  
        }  
      ]  
    }  
  }  
}
```
## Fetch Details of Artifactory Artifact Type

Use this request to get the details of `Artifactory Artifact Type` in your Service.

### Request


```
query{  
  service(serviceId:"iomToipURcuAii_6rithdw"){  
    artifactType  
     artifactSources{  
      name  
      createdAt  
      __typename  
     ...on ArtifactoryArtifactSource{  
       properties{  
        artifactoryConnectorId  
        repository  
        ...on ArtifactoryFileProps{artifactPath}  
      }  
      }  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "service": {  
      "artifactType": "AWS_CODEDEPLOY",  
      "artifactSources": [  
        {  
          "name": "artifactory - other aws code",  
          "createdAt": 1595232990161,  
          "__typename": "ArtifactoryArtifactSource",  
          "properties": {  
            "artifactoryConnectorId": "Lvgm7o5jS6SVtiYxpnKI1A",  
            "repository": "delegate",  
            "artifactPath": "/"  
          }  
        }  
      ]  
    }  
  }  
} 
```
## Fetch Details of Amazon S3 Artifact Type

Use this request to get the details of `Amazon S3 Artifact Type` in your Service.

### Request


```
query{  
  service(serviceId:"09YzQa1ZTz23Dj8uaY94jQ"){  
    artifactType  
     artifactSources{  
      name  
      createdAt  
      __typename  
     ...on AmazonS3ArtifactSource{  
        awsCloudProviderId  
        bucket  
      artifactPaths  
      }  
    }  
  }  
}
```
### Response


```
 {  
  "data": {  
    "service": {  
      "artifactType": "AWS_CODEDEPLOY",  
      "artifactSources": [  
        {  
          "name": "amazon s3",  
          "createdAt": 1595231820940,  
          "__typename": "AmazonS3ArtifactSource",  
          "awsCloudProviderId": "AGXNwNkGT8ye0XKDEbkd-A",  
          "bucket": "ankita-harness-bucket",  
          "artifactPaths": [  
            "echo-1.0.war"  
          ]  
        }  
      ]  
    }  
  }  
}
```
## Fetch Details of AMI Artifact Type

Use this request to get the details of `AMI Artifact Type` in your Service.

### Request


```
query{  
  service(serviceId:"FOQ-BzY_Se64wt5eT-gwwQ"){  
    artifactType  
     artifactSources{  
      name  
      createdAt  
      __typename  
     ...on AMIArtifactSource{  
        awsCloudProviderId  
        region  
      awsTags{key value}  
      amiResourceFilters{key value}  
        
        
        
      }  
    }  
  }  

```
### Response


```
 {  
  "data": {  
    "service": {  
      "artifactType": "AMI",  
      "artifactSources": [  
        {  
          "name": "us-east-1-ptask-testing-true",  
          "createdAt": 1595240550667,  
          "__typename": "AMIArtifactSource",  
          "awsCloudProviderId": "AGXNwNkGT8ye0XKDEbkd-A",  
          "region": "us-east-1",  
          "awsTags": [  
            {  
              "key": "ptask-testing",  
              "value": "true"  
            }  
          ],  
          "amiResourceFilters": []  
        }  
      ]  
    }  
  }  
}
```
## Fetch Details of GCS Artifact Type

Use this request to get the details of `GCS Artifact Type` in your Service.

### Request


```
query{  
  service(serviceId:"9lYbjqwAS9Wnk8EWP9kwKA"){  
    artifactType  
     artifactSources{  
      name  
      createdAt  
      __typename  
      ...on GCSArtifactSource{  
        gcpCloudProviderId  
        projectId  
        artifactPaths  
        bucket  
      }  
    }  
  }  
}
```
### Response


```
 {  
  "data": {  
    "service": {  
      "artifactType": "IIS_APP",  
      "artifactSources": [  
        {  
          "name": "us-artifacts-qa-target-appspot-com_containers_images_sha256-03384474141d1c5a03cac57f042ccc81dcab541d2a5e9bf82bf1bc6813ebdb85",  
          "createdAt": 1594717632927,  
          "__typename": "GCSArtifactSource",  
          "gcpCloudProviderId": "BYAMglynSUy5HPF7qgZgAA",  
          "projectId": "qa-target",  
          "artifactPaths": [  
            "containers/images/sha256:03384474141d1c5a03cac57f042ccc81dcab541d2a5e9bf82bf1bc6813ebdb85"  
          ],  
          "bucket": "us.artifacts.qa-target.appspot.com"  
        }  
      ]  
    }  
  }  
}
```
## Fetch Details of SMB Artifact Type

Use this request to get the details of `SMB Artifact Type` in your Service.

### Request


```
query{  
  service(serviceId:"cXCcKAgkSyGq-WqAJ-GNGQ"){  
    artifactType  
     artifactSources{  
      name  
      createdAt  
      __typename  
     ...on SMBArtifactSource{  
        smbConnectorId  
        artifactPaths           
      }  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "service": {  
      "artifactType": "AWS_CODEDEPLOY",  
      "artifactSources": [  
        {  
          "name": "smb",  
          "createdAt": 1595234192053,  
          "__typename": "SMBArtifactSource",  
          "smbConnectorId": "sBQXNHMDS32NQR08dU4gpg",  
          "artifactPaths": [  
            "tmp.reg"  
          ]  
        }  
      ]  
    }  
  }  
} 
```
## Fetch Details of Azure Artifact Type

Use this request to get the details of `Azure Artifact Type` in your Service.

### Request


```
query{  
  service(serviceId:"GuJQsvFKTCSHu6Vz3FqKjg"){  
    artifactType  
     artifactSources{  
      name  
      createdAt  
      __typename  
     ...on AzureArtifactsArtifactSource{  
        azureConnectorId  
        packageType  
      packageName  
      scope  
      project  
      feedName  
        
      }  
    }  
  }  
}
```
### Response


```
 {  
  "data": {  
    "service": {  
      "artifactType": "AWS_CODEDEPLOY",  
      "artifactSources": [  
        {  
          "name": "azure devopps artifact",  
          "createdAt": 1595232253980,  
          "__typename": "AzureArtifactsArtifactSource",  
          "azureConnectorId": "NKlOj_GPSd2Tlov3iFsYnA",  
          "packageType": "maven",  
          "packageName": "com.mycompany.app:other-app",  
          "scope": "PROJECT",  
          "project": "sample-project",  
          "feedName": "other-feed"  
        }  
      ]  
    }  
  }  
}
```
