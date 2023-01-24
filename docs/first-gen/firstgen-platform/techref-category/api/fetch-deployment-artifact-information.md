---
title: Fetch Deployment Artifact Information using GraphQL APIs
description: This topic explains how to fetch artifact information when deployments are successes, failures, or still running. You can use the WorkflowExecution API to obtain details on all of the artifacts in th…
sidebar_position: 180
helpdocs_topic_id: dhdq2nqxai
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic explains how to fetch artifact information when deployments are successes, failures, or still running.

You can use the **WorkflowExecution** API to obtain details on all of the artifacts in the deployment.


## Before You Begin

* [Harness API](harness-api.md)
* [Service Types and Artifact Sources](../../../continuous-delivery/model-cd-pipeline/setup-services/service-types-and-artifact-sources.md)

## Supported Platforms and Technologies

See [Supported Platforms and Technologies](../../../starthere-firstgen/supported-platforms.md).

## Step: Fetch Artifact Information from Deployments

Here is an example of a query that returns all of the artifacts for a deployment:


```
{  
  executions(filters: [{execution: {operator: EQUALS, values: "P03SSJ_9S2auQQwlejKtcg"}}], limit: 100) {  
    nodes {  
      id  
      application {  
        id  
      }  
      ... on WorkflowExecution {  
        artifacts {  
          id  
          buildNo  
          artifactSource {  
            id  
            name  
          }  
        }  
        rollbackArtifacts {  
          id  
          buildNo  
          artifactSource {  
            id  
            name  
          }  
        }  
      }  
    }  
  }  
}
```
The result will be something like this:


```
{  
  "data": {  
    "executions": {  
      "nodes": [  
        {  
          "id": "P03SSJ_9S2auQQwlejKtcg",  
          "application": {  
            "id": "BLnYajALQ9KA4ehnZZTHfA"  
          },  
          "artifacts": [  
            {  
              "id": "lfXxdMTaRGeTWH3_TPPQeA",  
              "buildNo": "stable-perl",  
              "artifactSource": {  
                "id": "U2AViUJ_R8aAuRVF53_FtA",  
                "name": "library_nginx"  
              }  
            }  
          ],  
          "rollbackArtifacts": []  
        }  
      ]  
    }  
  }  
}
```
Search for **WorkflowExecution** in the GraphQL Documentation Explorer to see all of the available fields.

For `values`, you enter in the execution ID for the deployment.

You can find the execution ID after executions in the deployment URL. You can see it as **P03SSJ\_9S2auQQwlejKtcg** here:

`https://app.harness.io/#/account/xxx/app/BLnYajALQ9KA4ehnZZTHfA/env/g717FtmBQreevuSCYcbixA/executions/``**P03SSJ\_9S2auQQwlejKtcg**``/details`

To get execution IDs, you can query for a Pipeline's executions using the Pipeline ID:


```
{  
  executions(filters: {pipeline: {operator: EQUALS, values: "Kn3X_70dQy-VY-Wt2b2qVw"}}, limit: 5) {  
    pageInfo {  
      total  
    }  
    nodes {  
      id  
      application {  
        id  
        name  
        description  
      }  
      createdAt  
      endedAt  
    }  
  }  
}
```
You can get a Pipeline ID by querying for a list of Pipelines:


```
{  
  pipelines(limit: 5, offset: 5) {  
    nodes {  
      id  
      name  
      description  
      createdAt  
    }  
    pageInfo {  
      total  
    }  
  }  
}
```
See [Use Pipelines API](use-pipelines-api.md).

## See Also

* [Use Workflows API](use-workflows-api.md)
* [Use Pipelines API](use-pipelines-api.md)

