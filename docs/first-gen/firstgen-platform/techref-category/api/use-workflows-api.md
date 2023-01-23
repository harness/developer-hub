---
title: Use Workflows API
description: Show queries that your applications can execute against the Harness Workflows API.
sidebar_position: 110
helpdocs_topic_id: ba4vs50071
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists example queries that you can execute against the Harness Workflows API.

## Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)
* [API Schema and Structure](api-schema-and-structure.md)

## Show Execution Details

This sample retrieves rich details on the parameters and results of (up to) 100 recent executions.

### Request


```
{  
  executions(limit: 5) {  
    pageInfo {  
      limit  
      offset  
      total  
    }  
    nodes {  
      id  
      application {  
        id  
        name  
      }  
      status  
      cause {  
        ... on ExecutedByUser {  
          user {  
            email  
          }  
        }  
        ... on ExecutedByTrigger {  
          trigger {  
            id  
            name  
          }  
        }  
      }  
      ... on PipelineExecution {  
        pipeline {  
          id  
          name  
        }  
      }  
      ... on WorkflowExecution {  
        workflow {  
          id  
          name        
        }  
        outcomes{  
          nodes{  
            ... on DeploymentOutcome{  
              service{  
                id  
                name  
              }  
              environment{  
                id  
                name  
              }  
            }  
          }  
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
    "executions": {  
      "pageInfo": {  
        "limit": 5,  
        "offset": 0,  
        "total": 20131  
      },  
      "nodes": [  
        {  
          "id": "-xxXXARHS9CPu-5YyYYy1jQ",  
          "application": {  
            "id": "-xxXXAAAAAa-5YyYYyJnQ",  
            "name": "Harness"  
          },  
          "status": "SUCCESS",  
          "cause": {  
            "user": {  
              "email": "xxx@test.io"  
            }  
          },  
          "workflow": {  
            "id": "1x1X1XxxXXedUdrlUxdfOw",  
            "name": "Ingress Controller"  
          },  
          "outcomes": {  
            "nodes": [  
              {  
                "service": {  
                  "id": "0-xw1xX0XXmXXzLgiE9bEg",  
                  "name": "ingress-controller"  
                },  
                "environment": {  
                  "id": "1xX1-xXXQnKI8Q-XxaOA8w",  
                  "name": "PR"  
                }  
              }  
            ]  
          }  
        },  
        {  
          "id": "1xxxXx69QC2rj38zxa11uQ",  
          "application": {  
            "id": "-jXxxxXXXoOLj2NEhrbJnQ",  
            "name": "Harness"  
          },  
          "status": "SUCCESS",  
          "cause": {  
            "user": {  
              "email": "yyy@test.io"  
            }  
          },  
          "workflow": {  
            "id": "Ko1KigXXXXa7WMcXXleE6w",  
            "name": "UI"  
          },  
          "outcomes": {  
            "nodes": [  
              {  
                "service": {  
                  "id": "XX8fn91XXXXxx8pS2_Vmg",  
                  "name": "ui"  
                },  
                "environment": {  
                  "id": "Xx2hXXXuTiqwn_MTbykXXX",  
                  "name": "Dev"  
                }  
              }  
            ]  
          }  
        },  
        {  
          "id": "xxALq5tdReyufXxQf_XXXX",  
          "application": {  
            "id": "-jXxxxXXXoOLj2NEhrbJnQ",  
            "name": "Harness"  
          },  
          "status": "RUNNING",  
          "cause": {  
            "user": {  
              "email": "xxy@test.io"  
            }  
          },  
          "pipeline": {  
            "id": "2XxXxKPrSMSnHTXvR1j0xX",  
            "name": "PR Harness"  
          }  
        },  
        {  
          "id": "x2x_Xxx-QymNF8WOWuwsIg",  
          "application": {  
            "id": "-jXxxxXXXoOLj2NEhrbJnQ",  
            "name": "Harness"  
          },  
          "status": "SUCCESS",  
          "cause": {  
            "user": {  
              "email": "xyy@test.io"  
            }  
          },  
          "pipeline": {  
            "id": "V_5CKgjsT3akXXXXXbM7lw",  
            "name": "PR Wakeup"  
          }  
        },  
        {  
          "id": "7FG-5x8XQKCiKrpvqXXdXx",  
          "application": {  
            "id": "-jRbnwXXXoOLj2NEhrbXxX",  
            "name": "Harness"  
          },  
          "status": "SUCCESS",  
          "cause": {  
            "trigger": {  
              "id": "ez-XXpCATZmybfpO2rxxxx",  
              "name": "Cleanup PR Namespaces"  
            }  
          },  
          "workflow": {  
            "id": "X3xxx_9CRbCshBAYfXXXXX",  
            "name": "PR Cleanup"  
          },  
          "outcomes": {  
            "nodes": [  
              {  
                "service": {  
                  "id": "XxxxxxxXX8GwK6fESr1BoQ",  
                  "name": "no-artifact"  
                },  
                "environment": {  
                  "id": "1xX1-jMXQnKI8Q-XxaOA8w",  
                  "name": "PR"  
                }  
              }  
            ]  
          }  
        }  
      ]  
    }  
  }  
}  

```
## Show Executions for a Given Workflow

This sample queries by `workflowId` to return up to 30 deployments.

### Request


```
{  
  executions(  
    filters: [  
      { workflow: { operator: EQUALS, values: ["<workflowId>"] } }   
    ]  
    limit: 30  
  ) {  
    pageInfo {  
      total  
    }  
    nodes {  
      id  
    }  
  }  
} 
```
### Response


```
{  
  "data": {  
    "executions": {  
      "pageInfo": {  
        "total": 3  
      },  
      "nodes": [  
        {  
          "id": "qliQv1XXXXa4bXXXxLPy4A"  
        },  
        {  
          "id": "rVwS1cXXXXXgdYIzwEKtCw"  
        },  
        {  
          "id": "TFO2a5XxXxXxkbPfsfDklg"  
        }  
      ]  
    }  
  }  
}
```
## Show Manifest as Artifact and Version for a Given Workflow Execution

This sample queries by `serviceId` and `environmentId` to return up to 1000 deployments.

### Request


```
{  
  executions(filters: [{service: {operator: EQUALS, values: "<SERVICE_ID>"}}, {environment: {operator: EQUALS, values: "<ENV_ID>"}}], limit: 1000) {  
    nodes {  
      id  
      application {  
        id  
        name  
        tags {  
          name  
          value  
        }  
      }  
      ... on WorkflowExecution {  
        startedAt  
        endedAt  
        status  
        artifacts {  
          id  
          buildNo  
          artifactSource {  
            id  
            name  
          }  
        }  
        manifests {  
          id  
          applicationManifestId  
          createdAt  
          description  
          name  
          version  
        }  
      }  
      ... on PipelineExecution {  
        memberExecutions {  
          nodes {  
            id  
            ... on WorkflowExecution {  
              startedAt  
              endedAt  
              status  
              artifacts {  
                id  
                buildNo  
                artifactSource {  
                  id  
                  name  
                }  
              }  
              manifests {  
                id  
                applicationManifestId  
                createdAt  
                description  
                name  
                version  
              }  
            }  
          }  
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
    "executions": {  
      "nodes": [  
        {  
          "id": "Fo-JkFhBSNmfw0zntYBSMw",  
          "application": {  
            "id": "JywU2x9eRXKxHzbwVNpNUQ",  
            "name": "Helm Native and K8s Labs",  
            "tags": []  
          },  
          "startedAt": 1648663401775,  
          "endedAt": 1648663416827,  
          "status": "SUCCESS",  
          "artifacts": [],  
          "manifests": [  
            {  
              "id": "WPJO33aYQpa9pb2P1K_Lkw",  
              "applicationManifestId": "dTw9qQ2PRh620q_UtLugwg",  
              "createdAt": "1648510919244",  
              "description": "A Helm chart for Kubernetes",  
              "name": "nginx-with-version-page",  
              "version": "2.8.0+master-gabs"  
            }  
          ]  
        }  
      ]  
    }  
  }  
}
```
