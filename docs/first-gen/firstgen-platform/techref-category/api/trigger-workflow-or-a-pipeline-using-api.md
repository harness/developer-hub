---
title: Trigger Workflows or Pipelines Using GraphQL API
description: Describes how to trigger a Workflow or a Pipeline using GraphQL API.
sidebar_position: 50
helpdocs_topic_id: s3leksekny
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to trigger a Workflow or a Pipeline using Harness GraphQL APIs.

You can also deploy Workflow to multiple infrastructures simultaneously. See [Deploy Multiple Services Simultaneously using Barriers](../../../continuous-delivery/concepts-cd/deployments-overview/deploy-to-multiple-infrastructures.md).

### Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)

### Step 1: Fetch the Application ID

Ensure that you provide details of the correct Environment, for example, Prod, QA, or dev.This sample returns Application `ID`. You can use either ID or name. In this sample, `name` is used.

##### Request


```
{  
  applicationByName(name: "Test App") {  
    id  
    name  
  }  
}
```
##### Response


```
{  
  "data": {  
    "applicationByName": {  
      "id": "naNJDKrUTZKKdKycL5Tx4g",  
      "name": "Test App"  
    }  
  }  
}
```
### Step 2: Fetch the Workflow or Pipeline ID

This sample returns Workflow `ID` and `variables`. These details are needed to start the execution.

You can also trigger Pipeline using the same API, but use `pipelineByName` API to fetch the Pipeline ID and Pipeline Variables.

##### Request


```
{  
  workflowByName(applicationId: "naNJDKrUTZKKdKycL5Tx4g", workflowName: "multi service graphql test") {  
    id  
    name  
    workflowVariables {  
      name  
      type  
      required  
    }  
  }  
}  

```
##### Response


```
{  
  "data": {  
    "workflowByName": {  
      "id": "bhI2FyPrTpupdzL4QEk0_A",  
      "name": "multi service graphql test",  
      "workflowVariables": [  
        {  
          "name": "Environment",  
          "type": "Environment",  
          "required": true  
        },  
        {  
          "name": "InfraDefinition_Kubernetes",  
          "type": "Infrastructure definition",  
          "required": true  
        },  
        {  
          "name": "InfraDefinition_Kubernetes2",  
          "type": "Infrastructure definition",  
          "required": true  
        }  
      ]  
    }  
  }  
}
```
### Step 3: Fetch the Execution Input

Currently, only Services need Artifacts inputs to start Workflow or Pipeline execution.This sample returns `Services`that require artifacts to trigger your Workflow.

##### Request


```
query {  
  executionInputs(applicationId: "naNJDKrUTZKKdKycL5Tx4g"  
    entityId: "bhI2FyPrTpupdzL4QEk0_A"  
  executionType: WORKFLOW,  
  variableInputs: [  
    {  
      name: "Environment"  
      variableValue: {  
        type: NAME  
        value: "Prod"  
      }  
    },  
    {  
      name: "InfraDefinition_Kubernetes"  
      variableValue: {  
        type: NAME  
        value: "k8s"  
      }  
    },  
    {  
      name: "InfraDefinition_Kubernetes2"  
      variableValue: {  
        type: NAME  
        value: "k8s"  
      }  
    }  
  ]){  
    serviceInputs{  
      id  
      name  
      artifactType  
    }  
  }  
}  

```
##### Response


```
{  
  "data": {  
    "executionInputs": {  
      "serviceInputs": [  
        {  
          "id": "XceFDCA7QgirrO8LJRphZQ",  
          "name": "test",  
          "artifactType": "DOCKER"  
        },  
        {  
          "id": "kqf9rA1dQ4SluU54K-ouOw",  
          "name": "k8s",  
          "artifactType": "DOCKER"  
        }  
      ]  
    }  
  }  
}
```
### Step 4: Start the Execution

This sample shows how to start executing your Workflow.

The values for `serviceInputs` can be found using the response in [Step 3: Fetch Execution Input](#step_3_fetch_execution_input) and the steps in [Fetch Artifact Source Details Using GraphQL APIs](artifact-source-api.md).

You can also see them in the Harness Manager Service using [Manually Select an Artifact](../../../continuous-delivery/model-cd-pipeline/setup-services/service-configuration.md#manually-select-an-artifact).

##### Request


```
mutation {  
  startExecution(input: {  
    applicationId: "naNJDKrUTZKKdKycL5Tx4g"  
    entityId: "bhI2FyPrTpupdzL4QEk0_A"  
    executionType: WORKFLOW,  
    variableInputs: [  
    {  
      name: "Environment"  
      variableValue: {  
        type: NAME  
        value: "Prod"  
      }  
    },  
    {  
      name: "InfraDefinition_Kubernetes"  
      variableValue: {  
        type: NAME  
        value: "k8s"  
      }  
    },  
    {  
      name: "InfraDefinition_Kubernetes2"  
      variableValue: {  
        type: NAME  
        value: "k8s"  
      }  
    }  
    ],   
    serviceInputs: [ {  
      name: "test",   
      artifactValueInput: {  
        valueType: BUILD_NUMBER  
        buildNumber: {  
          buildNumber: "stable-perl"  
          artifactSourceName: "library_nginx"  
        }  
      }  
    },  
      {  
      name: "k8s",   
      artifactValueInput: {  
        valueType: BUILD_NUMBER  
        buildNumber: {  
          buildNumber: "latest"  
          artifactSourceName: "docker_hello-world"  
        }  
      }  
    }  
    ]  
  }  
  ){  
    clientMutationId  
    execution{  
      id  
      status  
    }  
  }  
}
```
##### **Response**


```
{  
  "data": {  
    "startExecution": {  
      "clientMutationId": null,  
      "execution": {  
        "id": "s7QEfVP7SL-3ZUt8FBrnzQ",  
        "status": "RUNNING"  
      }  
    }  
  }  
}
```
### Notes

If you use the [Artifact Collection](../../../continuous-delivery/build-deploy/3-build-workflow.md) step in a Build Workflow and template the **Artifact Source** setting by clicking the **[T]** button, you create a [Workflow variable](../../../continuous-delivery/model-cd-pipeline/workflows/add-workflow-variables-new-template.md). When you deploy the Workflow, you can provide a value for the variable. 

By default, the name of the Workflow variable is `ArtifactStream`:


```
...  
variableInputs: [  
    {  
      name: "ArtifactStream"  
      variableValue: {  
        type: NAME  
        value: "library_nginx"  
      }  
    },  
...
```
