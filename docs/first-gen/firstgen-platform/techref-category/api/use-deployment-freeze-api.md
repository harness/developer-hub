---
title: Use Deployment Freeze API
description: This topic explains how to freeze Harness deployments using API.
sidebar_position: 430
helpdocs_topic_id: vwu8tynfc4
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

Deployment Freeze is a Harness Governance feature that stops all Harness deployments. To learn more on this, see [Deployment Freeze](../../security/governance-howtos/deployment-freeze.md).

Currently, this feature is behind a Feature Flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature. Feature Flags can only be removed for Harness Professional and Essentials editions. Once the feature is released to a general audience, it is available for Trial and Community Editions.This topic shows how to use the Deployment Freeze API to freeze Harness deployments.


## Before You Begin

* [Deployments Overview](/docs/category/general-deployment-features)
* [Deployment Freeze Overview](../../security/governance-howtos/deployment-freeze.md#deployment-freeze-overview)
* [Workflows](../../../continuous-delivery/model-cd-pipeline/workflows/workflow-configuration.md)
* [Create a Pipeline](../../../continuous-delivery/model-cd-pipeline/pipelines/pipeline-configuration.md)
* Make sure you have **manage deployment freezes** permission to use this API.

## Create a Deployment Freeze Window

### Request

You can create a Deployment Freeze Window using the mutation `createDeploymentFreezeWindow`.


```
mutation createDeploymentFreezeWindow($x: CreateDeploymentFreezeWindowInput!) {  
  createDeploymentFreezeWindow(input: $x) {  
    clientMutationId  
    deploymentFreezeWindow {  
      id  
      name  
      description  
      applicable  
      freezeWindows {  
        appFilter  
        appIds  
        envFilterType  
        envIds  
      }  
      setup {  
        isDurationBased  
        duration  
        from  
        to  
        freezeOccurrence  
        untilForever  
        endTime  
      }  
      notifyTo  
    }  
  }  
}
```
### Query Variables

Use these query variables to create a Deployment Freeze Window. The `freezeWindows` parameter specifies the appropriate Application(s), Environment(s), and Service(s) applicable to the Deployment Freeze Window.


```
{  
  "x": {  
    "name": "create-api-example",  
    "description": "description",  
    "freezeWindows": [{  
      "appFilter": "ALL",  
      "envTypeFilter": "ALL"  
    }],  
    "setup": {  
      "isDurationBased": true,  
      "duration": 3600000  
    },  
    "notifyTo": "aVLbx7uzR4aOsBCMAlmp3w"  
  }  
}
```
## Get Deployment Freeze Window by ID

### Request

Use this sample query to get the Deployment Freeze Window details by its ID.


```
{  
  deploymentFreezeWindow(id : "basruIExQOW1BfclFRdiRQ"){  
    id  
      name  
      description  
      applicable  
      freezeWindows{  
        appFilter  
        appIds  
        envFilterType  
        envIds  
      }  
      setup{  
        isDurationBased  
        duration  
        from  
        to  
        freezeOccurrence  
        untilForever  
        endTime  
      }  
      notifyTo  
  }  
}
```
### Response


```
{  
  "data": {  
    "deploymentFreezeWindow": {  
      "id": "basruIExQOW1BfclFRdiRQ",  
      "name": "Example",  
      "description": "Example",  
      "applicable": false,  
      "freezeWindows": [  
        {  
          "appFilter": "CUSTOM",  
          "appIds": [  
            "CmXetIV2Sc2Nuxi9TmisDQ"  
          ],  
          "envFilterType": "CUSTOM",  
          "envIds": [  
            "NLlPLa6PRdyC21ZcHZIK6g"  
          ]  
        }  
      ],  
      "setup": {  
        "isDurationBased": false,  
        "duration": null,  
        "from": "1629976662092",  
        "to": "1639976662092",  
        "freezeOccurrence": "DAILY",  
        "untilForever": true,  
        "endTime": "1790262497549"  
      },  
      "notifyTo": [  
        "aVLbx7uzR4aOsBCMAlmp3w"  
      ]  
    }  
  }  
}
```
## Get Deployment Freeze Window by Name

### Request

Use this sample query to get the Deployment Freeze Window details by its Name.


```
{  
  deploymentFreezeWindowByName(name: "CDC-Automation-DepFreeze2ZRgqzbhqa") {  
    id  
    name  
    description  
    applicable  
    freezeWindows {  
      appFilter  
      appIds  
      envFilterType  
      envIds  
    }  
    setup {  
      isDurationBased  
      duration  
      from  
      to  
      freezeOccurrence  
      untilForever  
      endTime  
    }  
    notifyTo  
  }  
}
```
### Response


```
{  
  "data": {  
    "deploymentFreezeWindowByName": {  
      "id": "basruIExQOW1BfclFRdiRQ",  
      "name": "Example1",  
      "description": "Example",  
      "applicable": false,  
      "freezeWindows": [  
        {  
          "appFilter": "CUSTOM",  
          "appIds": [  
            "CmXetIV2Sc2Nuxi9TmisDQ"  
          ],  
          "envFilterType": "CUSTOM",  
          "envIds": [  
            "NLlPLa6PRdyC21ZcHZIK6g"  
          ]  
        }  
      ],  
      "setup": {  
        "isDurationBased": false,  
        "duration": null,  
        "from": "1629976662092",  
        "to": "1639976662092",  
        "freezeOccurrence": "DAILY",  
        "untilForever": true,  
        "endTime": "1790262497549"  
      },  
      "notifyTo": [  
        "aVLbx7uzR4aOsBCMAlmp3w"  
      ]  
    }  
  }  
}
```
## List Deployment Freeze Windows

### Request

Use this sample query to get the list of Deployment Freeze Windows.


```
{  
  listDeploymentFreezeWindows(listEnabled: false, limit: 100, offset: 1) {  
    nodes {  
      id  
      name  
      description  
      applicable  
      freezeWindows {  
        appFilter  
        appIds  
        envFilterType  
        envIds  
      }  
      setup {  
        isDurationBased  
        duration  
        from  
        to  
        freezeOccurrence  
        untilForever  
        endTime  
      }  
      notifyTo  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "listDeploymentFreezeWindows": {  
      "nodes": [  
        {  
          "id": "D_lOvmQ-SZSVsTfLX9sYoA",  
          "name": "Example1",  
          "description": "Example1",  
          "applicable": false,  
          "freezeWindows": [  
            {  
              "appFilter": "CUSTOM",  
              "appIds": [  
                "los_-ZCRQ7WZkBlX9jemmw"  
              ],  
              "envFilterType": "ALL",  
              "envIds": []  
            }  
          ],  
          "setup": {  
            "isDurationBased": false,  
            "duration": null,  
            "from": "1626094140347",  
            "to": "1628603340349",  
            "freezeOccurrence": null,  
            "untilForever": true,  
            "endTime": null  
          },  
          "notifyTo": [  
            "aVLbx7uzR4aOsBCMAlmp3w"  
          ]  
        },  
        {  
          "id": "t__2hBruTS6vox81MLHRWw",  
          "name": "Example2",  
          "description": Example,  
          "applicable": false,  
          "freezeWindows": [  
            {  
              "appFilter": "CUSTOM",  
              "appIds": [  
                "eRP6q-GNSTiR-8XSuIXnqQ"  
              ],  
              "envFilterType": "ALL",  
              "envIds": []  
            }  
          ],  
          "setup": {  
            "isDurationBased": true,  
            "duration": "3600000",  
            "from": "1631174245407",  
            "to": "1631177845407",  
            "freezeOccurrence": null,  
            "untilForever": true,  
            "endTime": null  
          },  
          "notifyTo": [  
            "aVLbx7uzR4aOsBCMAlmp3w"  
          ]  
        },  
        {  
          "id": "NTEfLQpGSp-RG0XxkkgT9A",  
          "name": "Example3",  
          "description": Example,  
          "applicable": false,  
          "freezeWindows": [  
            {  
              "appFilter": "CUSTOM",  
              "appIds": [  
                "VaUOlOc7RVKIJBqv-fGi7Q"  
              ],  
              "envFilterType": "ALL",  
              "envIds": []  
            }  
          ],  
          "setup": {  
            "isDurationBased": false,  
            "duration": null,  
            "from": "1632465660329",  
            "to": "1632469260329",  
            "freezeOccurrence": null,  
            "untilForever": true,  
            "endTime": null  
          },  
          "notifyTo": [  
            "aVLbx7uzR4aOsBCMAlmp3w"  
          ]  
        },  
        {  
          "id": "fTnAJADESzykxR4APkMrrw",  
          "name": "Example4",  
          "description": Example,  
          "applicable": false,  
          "freezeWindows": [  
            {  
              "appFilter": "CUSTOM",  
              "appIds": [  
                "3FE-2Qa5RUC2U287XJ-ycA"  
              ],  
              "envFilterType": "ALL",  
              "envIds": []  
            }  
          ],  
          "setup": {  
            "isDurationBased": true,  
            "duration": "36000000",  
            "from": "1632463941033",  
            "to": "1632499941033",  
            "freezeOccurrence": null,  
            "untilForever": true,  
            "endTime": null  
          },  
          "notifyTo": [  
            "aVLbx7uzR4aOsBCMAlmp3w"  
          ]  
        },  
        {  
          "id": "Nbyw9428TiOotwWYDeLKWQ",  
          "name": "Example5",  
          "description": Example,  
          "applicable": false,  
          "freezeWindows": [  
            {  
              "appFilter": "CUSTOM",  
              "appIds": [  
                "eIOnkF8WTLq8jBQcKbwCVQ"  
              ],  
              "envFilterType": "ALL",  
              "envIds": []  
            }  
          ],  
          "setup": {  
            "isDurationBased": false,  
            "duration": null,  
            "from": "1757835901723",  
            "to": "1758271501723",  
            "freezeOccurrence": "WEEKLY",  
            "untilForever": false,  
            "endTime": "1790232300861"  
          },  
          "notifyTo": [  
            "aVLbx7uzR4aOsBCMAlmp3w"  
          ]  
        },  
        {  
          "id": "basruIExQOW1BfclFRdiRQ",  
          "name": "Example5",  
          "description": "Example",  
          "applicable": false,  
          "freezeWindows": [  
            {  
              "appFilter": "CUSTOM",  
              "appIds": [  
                "CmXetIV2Sc2Nuxi9TmisDQ"  
              ],  
              "envFilterType": "CUSTOM",  
              "envIds": [  
                "NLlPLa6PRdyC21ZcHZIK6g"  
              ]  
            }  
          ],  
          "setup": {  
            "isDurationBased": false,  
            "duration": null,  
            "from": "1629976662092",  
            "to": "1639976662092",  
            "freezeOccurrence": "DAILY",  
            "untilForever": true,  
            "endTime": "1790262497549"  
          },  
          "notifyTo": [  
            "aVLbx7uzR4aOsBCMAlmp3w"  
          ]  
        }  
      ]  
    }  
  }  
}
```
## Update a Deployment Freeze Window

### Request

You can update a Deployment Freeze Window using the mutation `updateDeploymentFreezeWindow`.


```
mutation updateDeploymentFreezeWindow($x: UpdateDeploymentFreezeWindowInput!) {  
  updateDeploymentFreezeWindow(input: $x) {  
    clientMutationId  
    deploymentFreezeWindow {  
      id  
      name  
      description  
      applicable  
      freezeWindows {  
        appFilter  
        appIds  
        envFilterType  
        envIds  
      }  
      setup {  
        isDurationBased  
        duration  
        from  
        to  
        freezeOccurrence  
        untilForever  
        endTime  
      }  
      notifyTo  
    }  
  }  
}
```
### Query Variables

Use these query variables to update a Deployment Freeze Window. The `freezeWindows` parameter specifies the appropriate Application(s), Environment(s), and Service(s) applicable to the Deployment Freeze Window.


```
{  
  "x": {  
    "id": "F01IAeL_Tj-4YcdnV2DAOA",  
    "name": "update-api-example",  
    "description": "update_example",  
    "freezeWindows": [{  
      "appFilter": "ALL",  
      "envTypeFilter": "ALL"  
    }],  
    "setup": {  
      "isDurationBased": true,  
      "duration": 3600000  
    },  
    "notifyTo": "aVLbx7uzR4aOsBCMAlmp3w"  
  }  
}
```
## Delete a Deployment Freeze Window

### Request

You can delete a Deployment Freeze Window using the mutation `deleteDeploymentFreezeWindow`.


```
mutation deleteDeploymentFreezeWindow($x: DeleteDeploymentFreezeWindowInput!) {  
  deleteDeploymentFreezeWindow(input: $x) {  
    clientMutationId  
  }  
}
```
### Query Variables

Use these query variables to delete a Deployment Freeze Window. The `id` parameter specifies the Deployment Freeze Window to be deleted.


```
{  
  "x": {  
    "id": "F01IAeL_Tj-4YcdnV2DAOA"  
  }  
}
```
## Enable/Disable a Deployment Freeze Window

### Request

You can toggle a Deployment Freeze Window using the mutation `toggleDeploymentFreezeWindow`.


```
mutation toggleDeploymentFreezeWindow($x: ToggleDeploymentFreezeWindowInput!) {  
  toggleDeploymentFreezeWindow(input: $x) {  
    clientMutationId  
    deploymentFreezeWindow {  
      id  
      name  
      description  
      applicable  
      freezeWindows {  
        appFilter  
        appIds  
        envFilterType  
        envIds  
      }  
      setup {  
        isDurationBased  
        duration  
        from  
        to  
        freezeOccurrence  
        untilForever  
        endTime  
      }  
      notifyTo  
    }  
  }  
}
```
### Query Variables

Use these query variables to toggle a Deployment Freeze Window. The `id` parameter specifies the Deployment Freeze Window to be toggled.


```
{  
  "x": {  
    "id": "dtB-5gB-QrSavmouVZKUug",  
    "applicable": true  
  }  
}
```
