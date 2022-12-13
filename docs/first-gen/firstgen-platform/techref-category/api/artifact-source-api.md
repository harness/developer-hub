---
title: Fetch Artifact Source Details Using GraphQL APIs
description: This topic describes how to add connections for Artifacts in ArtifactSources.
sidebar_position: 70
helpdocs_topic_id: 0z2b5a1x4x
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to fetch Artifact Source details using GraphQL APIs. The Artifact Source defines where the Artifact Collection step will look for the built artifact during the Build Workflow. The Artifact Source for the Service lists the file(s) that you want to be copied to the target host(s). 


### Before You Begin

* [Harness API](harness-api.md)
* [Service Types and Artifact Sources](../../../continuous-delivery/model-cd-pipeline/setup-services/service-types-and-artifact-sources.md)

### Step: Fetch Artifact Source from a Service

Use this sample query to get the `Artifact Source` and `Artifact History` from a Harness Service. [Provide a Service ID](artifact-source-api.md#step-fetch-the-service-id) to fetch the details.

The Artifact History pulls artifact build and version metadata from the Artifact Source.

##### Request


```
query{  
  service(serviceId: "UsEvUFxdRSegoaSFxIx2mA"){  
    artifactSources{  
      id  
      name  
      artifacts(limit:10, offset:0){  
        nodes {  
          id  
          buildNo  
        }  
      }  
    }  
  }  
}
```
##### Response


```
{  
  "data": {  
    "service": {  
      "artifactSources": [  
        {  
          "id": "a7UvFSviR92l4iwlektDrA",  
          "name": "generic-local_todolist-",  
          "artifacts": {  
            "nodes": [  
              {  
                "id": "KyettoTRQ06CdHZ3XrXY5w",  
                "buildNo": "todolist-1.7.war"  
              },  
              {  
                "id": "ztLQZMCqS0ef5k0f6BxkuA",  
                "buildNo": "todolist-1.6.war"  
              }  
            ]  
          }  
        }  
      ]  
    }  
  }  
}
```
### Step: Fetch Artifact Source ID from an Artifact

Use this sample query to get the `Artifact Source ID` from an Artifact.

##### Request


```
{  
  artifacts(filters:[  
    {  
      artifact: {  
        operator: EQUALS,  
        values: ["g6dahNXYTwCNxnk90as1fA"]  
      }  
    }  
  ], limit:10, offset:0){  
    nodes {  
      id  
      artifactSource {  
        id  
      }  
      buildNo  
    }  
  }  
}
```
##### Response


```
{  
  "data": {  
    "artifacts": {  
      "nodes": [  
        {  
          "id": "g6dahNXYTwCNxnk90as1fA",  
          "artifactSource": {  
            "id": "bIXY2b0kQFWnTVYLxB4FQg"  
          },  
          "buildNo": "1.19"  
        }  
      ]  
    }  
  }  
}
```
### Step: Fetch the Service ID

 Use this sample query to get the `id` and the `name` of a Service.

##### Request


```
{  
  services(  
    filters: [  
      { application: { operator: EQUALS, values: ["-XZGAqR6QIeBRXz-VuwIzA"] } }  
    ]  
    limit: 1000  
  ) {  
    pageInfo {  
      total  
    }  
    nodes {  
      id  
      name  
    }  
  }  
}
```
##### Response


```
{  
  "data": {  
    "services": {  
      "pageInfo": {  
        "total": 1  
      },  
      "nodes": [  
        {  
          "id": "_s-PY38LQlansoS73vHzUA",  
          "name": "To-Do List K8s"  
        }  
      ]  
    }  
  }  
}
```
### 

