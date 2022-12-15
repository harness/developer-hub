---
title: Use Audit Trails API
description: Lists common audit trail queries.
sidebar_position: 210
helpdocs_topic_id: k9d2zjdnw8
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists common audit trail queries.



## Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)
* [API Schema and Structure](api-schema-and-structure.md)

## Generic Change Set

This query shows how to retrieve the 100 most recent audit records and generic change set information.


```
{  
  audits(limit: 100, offset: 0) {  
    nodes {  
      id  
      changes {  
        appId  
        resourceName  
        operationType  
      }  
      triggeredAt  
      ... on GenericChangeSet {  
        request {  
          resourcePath  
          remoteIpAddress  
          responseStatusCode  
        }  
      }  
    }  
  }  
}
```
## User Change Set

This query shows how to retrieve the 100 most recent audit records and user change set information.


```
{  
  audits(limit: 100, offset: 0) {  
    nodes {  
      id  
      changes{  
        appId  
        resourceName  
        operationType  
      }  
      triggeredAt  
      request{  
        resourcePath  
        remoteIpAddress  
        responseStatusCode  
      }  
      ... on UserChangeSet {  
        triggeredBy {  
          name  
          id  
          userGroups(limit: 5, offset: 0) {  
            nodes {  
              name  
            }  
          }  
        }  
      }  
    }  
  }  
}
```
## API Key Change Set

This query shows how to retrieve the 100 most recent audit records and API key change set information.


```
{  
  audits(limit: 100, offset: 0) {  
    nodes {  
      id  
      changes {  
        appId  
        resourceName  
        operationType  
      }  
      triggeredAt  
      request {  
        resourcePath  
        remoteIpAddress  
        responseStatusCode  
      }  
      ... on ApiKeyChangeSet {  
        id  
        apiKeyId  
        changes {  
          createdAt  
          resourceName  
          resourceType  
        }  
      }  
    }  
  }  
}
```
## Git Change Set

This query shows how to retrieve the 100 most recent audit records and Git change set information.


```
{  
  audits(limit: 100, offset: 0) {  
    nodes {  
      id  
      changes {  
        appId  
        resourceName  
        operationType  
      }  
      triggeredAt  
      request {  
        resourcePath  
        remoteIpAddress  
        responseStatusCode  
      }  
      ... on GitChangeSet{  
        gitCommitId  
        author  
        repoUrl  
      }  
    }  
  }  
}
```
## Other Examples

The `audits` API enables you to retrieve and export records from Harness' Audit Trail. This first sample query has no time filters.


```
{  
  audits(limit:5){  
    nodes{  
      id  
      triggeredAt  
      request{  
        url  
        resourcePath  
        requestMethod  
        remoteIpAddress  
        requestMethod  
      }  
      changes{  
        appId  
        appName  
        operationType  
      }  
    }  
    pageInfo{  
      hasMore  
      limit  
      total  
      offset  
    }  
  }  
}
```
This second query shows filtering by a specific time range (UNIX epochs).


```
{  
  audits(  
    filters:{  
      time: {  
        specific:{  
          from:1577567777550  
          to: 1577567829417  
        }  
      }  
    }  
    limit:20){  
    nodes{  
      id  
      triggeredAt  
      request{  
        url  
        resourcePath  
        requestMethod  
        remoteIpAddress  
        requestMethod  
      }  
      changes{  
        appId  
          
        resourceId  
        appName  
        operationType  
      }  
    }  
    pageInfo{  
      hasMore  
      limit  
      total  
      offset  
    }  
  }  
}
```
This third query demonstrates filtering by a relative time offset.


```
{  
  audits(  
    filters:{  
      time: {  
        relative:{  
          timeUnit:WEEKS  
          noOfUnits: 2  
        }  
      }  
    }  
    limit:20){  
    nodes{  
      id  
      triggeredAt  
      request{  
        url  
        resourcePath  
        requestMethod  
        remoteIpAddress  
        requestMethod  
      }  
      changes{  
        appId  
        resourceId  
        appName  
        operationType  
      }  
    }  
    pageInfo{  
      hasMore  
      limit  
      total  
      offset  
    }  
  }  
}
```
