---
title: Use Tags API
description: Provides details on how to get details of resources that are associated with tags and their value using APIs.
sidebar_position: 360
helpdocs_topic_id: 80ppvv3a3p
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic shows you how to list tagged Harness resources using the Harness API.

## Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)
* [API Schema and Structure](api-schema-and-structure.md)
* [Manage Tags](../../account/tags/manage-tags.md)

## Fetch the List of Tags

You can get the list of Tags associated with all of your Harness [Application Entities,](../../../continuous-delivery/model-cd-pipeline/applications/application-configuration.md) such as:

* Services
* Environments
* Workflows
* Pipelines

This sample queries by `applicationByName` to return `name` and `value` of all the associated Tags.

### Request


```
{  
  applicationByName(name: "test") {  
    id  
    tags {  
      name  
      value  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "applicationByName": {  
      "id": "Xs4wuXRPRdKCxfffdQI9rA",  
      "tags": [  
        {  
          "name": "customTag",  
          "value": "1"  
        },  
        {  
          "name": "customTagNoValue",  
          "value": "12"  
        },  
        {  
          "name": "level",  
          "value": "2"  
        },  
        {  
          "name": "location",  
          "value": "NA"  
        }  
      ]  
    }  
  }  
}
```
## Fetch Details of the Tags

You can get the details of your tags in the following ways:

* Query by ID
* Query by Name

This query by `tagId` returns the ID and type values of the associated Harness Application entities.

### Request


```
{  
  tag(tagId: "Bq6q2jeKTMaCADV_RBCKuA") {  
    id  
    usages(limit: 4) {  
      nodes {  
        entityId  
        entityType  
      }  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "tag": {  
      "id": "Bq6q2jeKTMaCADV_RBCKuA",  
      "usages": {  
        "nodes": [  
          {  
            "entityId": "a1b43bKaTLmcQkKr_xipkg",  
            "entityType": "SERVICE"  
          },  
          {  
            "entityId": "Xs4wuXRPRdKCxfffdQI9rA",  
            "entityType": "APPLICATION"  
          },  
          {  
            "entityId": "-L2RM4gMRJG04P-NT3qkHw",  
            "entityType": "APPLICATION"  
          },  
          {  
            "entityId": "N9kk90wzSsWqr1fHLfPwLw",  
            "entityType": "PIPELINE"  
          }  
        ]  
      }  
    }  
  }  
}
```
This query by `tagByName` returns the ID and type values of the associated Harness Application entities.

### Request


```
{  
  tagByName(name: "level") {  
    id  
    usages(limit: 4) {  
      nodes {  
        entityId  
        entityType  
      }  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "tagByName": {  
      "id": "Bq6q2jeKTMaCADV_RBCKuA",  
      "usages": {  
        "nodes": [  
          {  
            "entityId": "a1b43bKaTLmcQkKr_xipkg",  
            "entityType": "SERVICE"  
          },  
          {  
            "entityId": "Xs4wuXRPRdKCxfffdQI9rA",  
            "entityType": "APPLICATION"  
          },  
          {  
            "entityId": "-L2RM4gMRJG04P-NT3qkHw",  
            "entityType": "APPLICATION"  
          },  
          {  
            "entityId": "N9kk90wzSsWqr1fHLfPwLw",  
            "entityType": "PIPELINE"  
          }  
        ]  
      }  
    }  
  }  
}
```
## Fetch List of all the Tags

This query by`limit` returns the ID and name values of all the Tags that you have created.

### Request


```
{  
  tags(limit: 10) {  
    nodes {  
      id  
      name  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "tags": {  
      "nodes": [  
        {  
          "id": "Diy3y4RgQqi92EmZkTNpoA",  
          "name": "CDC-Automation-TagAJv"  
        },  
        {  
          "id": "pnNjPvorQuGpYBgiiZih6w",  
          "name": "CDC-Automation-Tagwrf"  
        },  
        {  
          "id": "AMrSGBNVT7uASy-fH2rw9Q",  
          "name": "CDC-Automation-TagOmE"  
        },  
        {  
          "id": "xhzg-5uJRbi9C7d-WovIbg",  
          "name": "CDC-Automation-Tag7da"  
        },  
        {  
          "id": "4i-hQ8W3REWaq0sAeCCd2w",  
          "name": "CDC-Automation-TaghqJ"  
        },  
        {  
          "id": "tAWfX5tiSjigL9LmjKSrpA",  
          "name": "CDC-Automation-TagFqH"  
        },  
        {  
          "id": "SJknckcARr-sp0_lCQmw4Q",  
          "name": "CDC-Automation-TagenP"  
        },  
        {  
          "id": "DyViNhniQj-qa5EMfHZMig",  
          "name": "CDC-Automation-TagwFB"  
        },  
        {  
          "id": "2JoI3jZETW2yHkscwjzpKg",  
          "name": "CDC-Automation-TagF3k"  
        },  
        {  
          "id": "rP0nsMjWQjKcYm02xp0OTw",  
          "name": "CDC-Automation-TagvdX"  
        }  
      ]  
    }  
  }  
}
```
## Fetch Details of Tags by List of Tag IDs or Names

This query by `tagName` returns the entities and types matching the Tag names provided.

### Request


```
{  
  tags(limit: 10, filters: {tagName: {operator: IN, values: ["level", "location"]}}) {  
    nodes {  
      id  
      name  
      usages(limit: 4) {  
        nodes {  
          entityId  
          entityType  
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
    "tags": {  
      "nodes": [  
        {  
          "id": "kddxwiBIS5Kgxbhpo9jzRA",  
          "name": "location",  
          "usages": {  
            "nodes": [  
              {  
                "entityId": "lwesdQxcSkiVE5Kg7ilduA",  
                "entityType": "WORKFLOW"  
              },  
              {  
                "entityId": "Xs4wuXRPRdKCxfffdQI9rA",  
                "entityType": "APPLICATION"  
              },  
              {  
                "entityId": "-L2RM4gMRJG04P-NT3qkHw",  
                "entityType": "APPLICATION"  
              },  
              {  
                "entityId": "kpGGJI3TR3qQaHqw-ybyXw",  
                "entityType": "WORKFLOW"  
              }  
            ]  
          }  
        },  
        {  
          "id": "Bq6q2jeKTMaCADV_RBCKuA",  
          "name": "level",  
          "usages": {  
            "nodes": [  
              {  
                "entityId": "a1b43bKaTLmcQkKr_xipkg",  
                "entityType": "SERVICE"  
              },  
              {  
                "entityId": "Xs4wuXRPRdKCxfffdQI9rA",  
                "entityType": "APPLICATION"  
              },  
              {  
                "entityId": "-L2RM4gMRJG04P-NT3qkHw",  
                "entityType": "APPLICATION"  
              },  
              {  
                "entityId": "N9kk90wzSsWqr1fHLfPwLw",  
                "entityType": "PIPELINE"  
              }  
            ]  
          }  
        }  
      ]  
    }  
  }  
}
```
## Fetch Tag Usage Details by Tag ID, Name, or Harness Entity Type

This query by `tagName` returns the usage details of those Tags whose names match with the given list of names.

### Request


```
{  
  tags(limit: 10, filters: {tagName: {operator: IN, values: ["level", "location"]}}) {  
    nodes {  
      id  
      name  
      usages(limit: 4, filters: {entityType: {operator: EQUALS, values: SERVICE}}) {  
        nodes {  
          entityId  
          entityType  
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
    "tags": {  
      "nodes": [  
        {  
          "id": "kddxwiBIS5Kgxbhpo9jzRA",  
          "name": "location",  
          "usages": {  
            "nodes": []  
          }  
        },  
        {  
          "id": "Bq6q2jeKTMaCADV_RBCKuA",  
          "name": "level",  
          "usages": {  
            "nodes": [  
              {  
                "entityId": "a1b43bKaTLmcQkKr_xipkg",  
                "entityType": "SERVICE"  
              },  
              {  
                "entityId": "gWaLJ2XHRqORVjsA11Ro5w",  
                "entityType": "SERVICE"  
              }  
            ]  
          }  
        }  
      ]  
    }  
  }  
}
```
## Attach a Tag to a Harness Entity

You can attach a Tag to a Harness Entity using the mutation `attachTag`. In this example, the entity type is Service.


```
mutation {  
  attachTag(input: {clientMutationId: "1234", entityId: "iY0FgI1aRTiQ_I-GsR5bLA", entityType: SERVICE, name: "level", value: "1"}) {  
    clientMutationId  
    tagLink {  
      appId  
      entityId  
      entityType  
      name  
      value  
    }  
  }  
}
```
## Detach a Tag from a Harness Entity

You can detach a Tag from a Harness Entity using the mutation `detachTag`. In this example, the entity type is Service.


```
mutation {  
  detachTag(input: {clientMutationId: "1234", entityId: "iY0FgI1aRTiQ_I-GsR5bLA", entityType: SERVICE, name: "level"}) {  
    clientMutationId  
  }  
}
```
