---
title: Use Services API
description: Provides detail of some common basic queries that your applications can execute against the Harness API.
sidebar_position: 100
helpdocs_topic_id: lbw6cny911
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides examples of how to get Services information using APIs.

### Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)
* [API Schema and Structure](api-schema-and-structure.md)

### Fetch the List of Services for a Given Application

This sample queries by `applicationId` to return `id` and `name` values for up to 1,000 Services.

##### Request


```
{  
  services(  
    filters: [  
 { application: { operator: EQUALS, values: ["<applicationId>"] } }  
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
### Show Services for a Given Application

This nested query by `applicationId` returns the names of the specified Application's contained Services.

##### Request


```
{  
  application(applicationId:"<applicationId>") {  
    services(limit:100, offset:0) {  
      pageInfo{  
        total  
      }  
      nodes{  
        name  
      }  
    }  
  }  
}
```
##### Response


```
{  
  "data": {  
    "application": {  
      "services": {  
        "pageInfo": {  
          "total": 1  
        },  
        "nodes": [  
          {  
            "name": "To-Do List K8s"  
          }  
        ]  
      }  
    }  
  }  
}
```
