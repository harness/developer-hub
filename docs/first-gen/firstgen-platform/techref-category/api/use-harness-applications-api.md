---
title: Use Harness Applications API
description: Shows how to create and update Harness Applications using API calls.
# sidebar_position: 2
helpdocs_topic_id: 0wmvn5dgzn
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to use Harness Application APIs.

The `!` following the type means that this field is *required*.In this topic:

* [Before You Begin](https://docs.harness.io/article/0wmvn5dgzn-use-harness-applications-api#undefined)
* [Create Applications](https://docs.harness.io/article/0wmvn5dgzn-use-harness-applications-api#create_applications)
* [Update Applications](https://docs.harness.io/article/0wmvn5dgzn-use-harness-applications-api#update_applications)
* [Enable Git Sync for an Application](https://docs.harness.io/article/0wmvn5dgzn-use-harness-applications-api#enable_git_sync_for_an_application)
* [Show Pipelines for a Given Application](https://docs.harness.io/article/0wmvn5dgzn-use-harness-applications-api#show_pipelines_for_a_given_application)
* [Show Services for a Given Application](https://docs.harness.io/article/0wmvn5dgzn-use-harness-applications-api#show_services_for_a_given_application)
* [Fetch the List of Services for a Given Application](https://docs.harness.io/article/0wmvn5dgzn-use-harness-applications-api#fetch_the_list_of_services_for_a_given_application)
* [Filter Harness Applications using Harness Tags in the API](https://harness.helpdocs.io/article/0wmvn5dgzn-use-harness-applications-api#filter_harness_applications_using_harness_tags_in_the_api)

### Before You Begin

* [​Introduction to Harness GraphQL API](/article/tm0w6rruqv-harness-api)
* [Harness API Explorer](/article/2rmd5i0e0h-harness-api-explorer)
* [API Schema and Structure](/article/kn8wsu80n4-api-schema-and-structure)

### Create Applications

This sample creates an Application in Harness. It returns an `id`, which you can use as the `applicationId` value in other Application operations.


```
mutation createapp($app: CreateApplicationInput!) {  
  createApplication(input: $app) {  
    clientMutationId  
    application {  
      name  
      id  
    }  
  }  
}
```
Here are sample query variables for the above operation. The `name` variable requires a value, which must be unique in your Harness account.


```
{  
  "app": {  
    "clientMutationId": "req9",  
    "name": "AMI App",  
    "description": "Application to deploy AMIs"  
  }  
}
```
Values for other variables are optional. In this and other mutation requests, a `clientMutationId` is needed only when multiple clients make updates to the same entity, and each client needs a way to identify the request-response. In this case, each update should supply an arbitrary, unique `clientMutationId`.### Update Applications

This sample updates an existing Application.


```
mutation updateApp($app: UpdateApplicationInput!) {  
  updateApplication(input: $app) {  
    clientMutationId  
    application {  
      name  
      id  
      description  
    }  
  }  
}
```
Here are sample query variables for the above operation. You must supply an `applicationId`, corresponding to an existing Harness Application.


```
{  
  "app": {  
    "clientMutationId": "req9",  
    "applicationId": "1YO5rmoaTdSyqnfvLOgb7g",  
    "name": "AMI App",  
    "description": "Deploy AMIs with a better description"  
  }  
}
```
### Enable Git Sync for an Application

This sample enables Git sync on a Harness Application.


```
mutation updateGitConfig($gitConfig: UpdateApplicationGitSyncConfigInput!) {  
  updateApplicationGitSyncConfig(input: $gitConfig) {  
    clientMutationId  
    gitSyncConfig {  
      branch  
      repositoryName  
      syncEnabled  
      gitConnector {  
        id  
        name  
        description  
        createdAt  
        createdBy {  
          id  
          name  
        }  
      }  
    }  
  }  
}
```
Here are sample query variables for the above operation. You must supply an `applicationId` corresponding to an existing Harness Application, and a `gitConnectorId` corresponding to an existing Git Connector on your Harness account.

If your Harness Source Repo Provider is an Account type Git connector specify the repositoryName.


```
  
{  
  "gitConfig": {  
    "clientMutationId": "req321",  
    "applicationId": "xxxxxxxxxxxxxg",  
    "gitConnectorId": "yyyyyyyyyyyyy",  
    "repositoryName" : "repoName"  
    "branch": "temp_branch",  
    "syncEnabled": true,  
  }  
}
```
### Show Pipelines for a Given Application

This sample queries by `applicationId` to return details about corresponding Pipelines.


```
{  
  pipelines(  
    filters: [  
 { application: { operator: EQUALS, values: ["<ApplicationID>"] } }  
 ]  
    limit: 5  
    offset: 2  
  ) {  
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
### Show Services for a Given Application

This nested query by `applicationId` returns the names of the specified Application's contained Services.


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
### Fetch the List of Services for a Given Application

This sample queries by `applicationId` to return `id` and `name` values for up to 1,000 Services.


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
### Filter Harness Applications using Harness Tags in the API

Harness provides advanced tagging features for your Harness [Applications](https://docs.harness.io/article/bucothemly-application-configuration) as described in [Assign Metadata Using Tags](https://docs.harness.io/article/nrxfix3i58-tags) and [Apply Filters Using Tags](https://docs.harness.io/article/nyxf7g8erd-apply-filters-using-tags).

You can use Tags to search associated Harness Applications.


```
query{  
  applications(filters:{  
    application:{  
      operator: EQUALS  
      values: "4eYcK7CaTsmYD5kUQJ8pRg"  
    }  
    tag:{  
      entityType: APPLICATION  
      tags:[  
        {  
          name:"tag1"  
          value:"val1"  
        }  
        {  
          name:"tag2"  
          value:"val2"  
        }  
      ]  
    }  
  }  
    limit: 10  
    offset: 0  
  )  
  {  
    nodes{  
      id  
      name  
      description  
      createdAt  
    }  
  }  
}
```
