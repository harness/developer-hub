---
title: Use Infrastructure Definition API
description: Query the Harness Infrastructure Definition API.
# sidebar_position: 2
helpdocs_topic_id: 07vhqhs1xy
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists example queries that you can execute against the Harness Infrastructure Definition API.

See [Add an Infrastructure Definition](/article/v3l3wqovbe-infrastructure-definitions) for basic information.In this topic:

* [Before You Begin](https://docs.harness.io/article/07vhqhs1xy-use-infrastructure-definition-api#before_you_begin)
* [Query Multiple Infrastructure Definitions by Deployment](https://docs.harness.io/article/07vhqhs1xy-use-infrastructure-definition-api#query_multiple_infrastructure_definitions_by_deployment)
* [Query Infrastructure Definitions by Environment ID](https://docs.harness.io/article/07vhqhs1xy-use-infrastructure-definition-api#query_infrastructure_definitions_by_environment_id)
* [Query Infrastructure Definitions by Infrastructure Definition ID](https://docs.harness.io/article/07vhqhs1xy-use-infrastructure-definition-api#query_infrastructure_definitions_by_infrastructure_definition_id)
* [Query Infrastructure Definitions by Name](https://docs.harness.io/article/07vhqhs1xy-use-infrastructure-definition-api#query_infrastructure_definitions_by_name)
* [See Also](https://docs.harness.io/article/07vhqhs1xy-use-infrastructure-definition-api#see_also)

### Before You Begin

* [​Introduction to Harness GraphQL API](https://docs.harness.io/article/tm0w6rruqv-harness-api)
* [Harness API Explorer](https://docs.harness.io/article/2rmd5i0e0h-harness-api-explorer)
* [API Schema and Structure](https://docs.harness.io/article/kn8wsu80n4-api-schema-and-structure)

### Query Multiple Infrastructure Definitions by Deployment

Use the `deploymentType` parameter to query for all Infrastructure Definitions by their deployment type.

The deployment type is defined in the **Deployment Type** setting in an Infrastructure Definition.

![](https://files.helpdocs.io/kw8ldg1itf/articles/07vhqhs1xy/1616789736371/image.png)For example, here's a query for Kubernetes deployment types:


```
query{  
  infrastructureDefinitions(filters:{  
    deploymentType:{  
      values:"KUBERNETES"  
      operator:EQUALS  
    }  
  }  
  limit:10  
  offset:0){  
    nodes{  
      id  
      name  
      deploymentType  
    }  
  }  
}
```
The output will look something like this:


```
{  
  "data": {  
    "infrastructureDefinitions": {  
      "nodes": [  
        {  
          "id": "72arASCuTDai7_v2hXH96A",  
          "name": "k8s-infradef-2",  
          "deploymentType": "Kubernetes"  
        },  
        {  
          "id": "cIBZ5NGFTt2RuoSjZXtexA",  
          "name": "meenakshi-gcp-k8s",  
          "deploymentType": "Kubernetes"  
        },  
        {  
          "id": "2e1HPTeTTsGBfx_xW-aE5g",  
          "name": "meenakshi-k8s-infra-def",  
          "deploymentType": "Kubernetes"  
        }  
      ]  
    }  
  }  
}
```
### Query Infrastructure Definitions by Environment ID

You can query for all the Infrastructure Definitions that belong to a Harness Environment using the Environment ID and deployment type.


```
{  
  environment(environmentId: "KMoH2VGAQ3eP2ZWE2PMOng") {  
    id  
    name  
    infrastructureDefinitions(filters: {deploymentType: {values: "KUBERNETES", operator: EQUALS}}, limit: 10, offset: 0) {  
      nodes {  
        id  
        name  
        deploymentType  
      }  
    }  
  }  
}
```
The output will look something like this:


```
{  
  "data": {  
    "environment": {  
      "id": "KMoH2VGAQ3eP2ZWE2PMOng",  
      "name": "Development",  
      "infrastructureDefinitions": {  
        "nodes": [  
          {  
            "id": "25PERz2eQvS_y6P0Zsphfw",  
            "name": "nginx-tiny-webserver",  
            "deploymentType": "Kubernetes"  
          },  
          {  
            "id": "dvIxVMQQThCz59xnQ7ZftQ",  
            "name": "nginx-multiservice",  
            "deploymentType": "Kubernetes"  
          },  
          {  
            "id": "SBj-I6vhSxm8WqCGD40AWA",  
            "name": "istio-multiservice",  
            "deploymentType": "Kubernetes"  
          }  
        ]  
      }  
    }  
  }  
}
```
### Query Infrastructure Definitions by Infrastructure Definition ID

You can simply query for an Infrastructure Definition by its ID.


```
query{  
  infrastructureDefinition(infrastructureId:"25PERz2eQvS_y6P0Zsphfw"){  
    id  
    name  
    deploymentType  
  }  
}
```
The output will look something like this:


```
{  
  "data": {  
    "infrastructureDefinition": {  
      "id": "25PERz2eQvS_y6P0Zsphfw",  
      "name": "nginx-tiny-webserver",  
      "deploymentType": "Kubernetes"  
    }  
  }  
}
```
### Query Infrastructure Definitions by Name

You can simply query for an Infrastructure Definition by name.


```
{  
  infrastructureDefinitionByName(infrastructureName: "nginx-tiny-webserver", environmentId: "KMoH2VGAQ3eP2ZWE2PMOng") {  
    id  
    name  
    deploymentType  
  }  
}
```
The output will look something like this:


```
{  
  "data": {  
    "infrastructureDefinitionByName": {  
      "id": "25PERz2eQvS_y6P0Zsphfw",  
      "name": "nginx-tiny-webserver",  
      "deploymentType": "Kubernetes"  
    }  
  }  
}
```
### See Also

* [Harness StartExecution API Deep Dive](/article/ga3ccymwce-use-harness-start-execution-api)

