---
title: Harness GraphQL API FAQs
description: This article addresses some frequently asked questions about Harness GraphQL APIs.
sidebar_position: 50
helpdocs_topic_id: jbjam276xn
helpdocs_category_id: 85qz9mdf0y
helpdocs_is_private: false
helpdocs_is_published: true
---

This article addresses some frequently asked questions about Harness GraphQL APIs.

<!-- TOC start -->
- [Before You Begin](#before-you-begin)
- [General](#general)
  * [Why Harness uses GraphQL APIs?](#why-harness-uses-graphql-apis)
  * [Where do I construct API queries and see responses?](#where-do-i-construct-api-queries-and-see-responses)
  * [How do I fetch data using GraphQL APIs?](#how-do-i-fetch-data-using-graphql-apis)
  * [How do I write data using GraphQL APIs?](#how-do-i-write-data-using-graphql-apis)
  * [Is `clientMutationId` a mandatory parameter?](#is-clientmutationid-a-mandatory-parameter)
  * [How does Harness GraphQL API factor dynamic values out of the query?](#how-does-harness-graphql-api-factor-dynamic-values-out-of-the-query)
  * [Does Harness impose Rate/Data Limiting?](#does-harness-impose-ratedata-limiting)
    + [Cloudflare Rate Limiting](#cloudflare-rate-limiting)
  * [What does API in beta mean?](#what-does-api-in-beta-mean)
  * [Where can I find a list of deprecated API features?](#where-can-i-find-a-list-of-deprecated-api-features)
  * [How do I share any feedback on Harness GraphQL APIs?](#how-do-i-share-any-feedback-on-harness-graphql-apis)
- [Building Applications Using Postman](#building-applications-using-postman)
  * [Can I query Harness GraphQL in Postman?](#can-i-query-harness-graphql-in-postman)
  * [How do I convert my query into the programming language of my choice in Postman?](#how-do-i-convert-my-query-into-the-programming-language-of-my-choice-in-postman)
- [Authentication](#authentication)
  * [How do I authenticate in Harness API Explorer?](#how-do-i-authenticate-in-harness-api-explorer)
- [Cloud Provider APIs](#cloud-provider-apis)
  * [Can I create, read, update, and delete Harness Cloud Providers using Harness GraphQL APIs?](#can-i-create-read-update-and-delete-harness-cloud-providers-using-harness-graphql-apis)
  * [How to search for Cloud Provider by ID?](#how-to-search-for-cloud-provider-by-id)
  * [Can I find all Cloud Providers by type using Harness API?](#can-i-find-all-cloud-providers-by-type-using-harness-api)
  * [How to find Cloud Provider by name?](#how-to-find-cloud-provider-by-name)
- [Artifact Source APIs](#artifact-source-apis)
  * [Can I fetch Artifact Source details using GraphQL APIs?](#can-i-fetch-artifact-source-details-using-graphql-apis)
  * [How to fetch Artifact Source from a Service using APIs?](#how-to-fetch-artifact-source-from-a-service-using-apis)
  * [What is the query used to fetch Artifact Source ID from an Artifact?](#what-is-the-query-used-to-fetch-artifact-source-id-from-an-artifact)
- [Artifact Type APIs](#artifact-type-apis)
  * [Can I fetch Artifact Type details using GraphQL APIs?](#can-i-fetch-artifact-type-details-using-graphql-apis)
  * [What are the supported Artifact Types?](#what-are-the-supported-artifact-types)
- [Harness Applications API](#harness-applications-api)
  * [What are the different actions that I can perform using Harness Applications API?](#what-are-the-different-actions-that-i-can-perform-using-harness-applications-api)
  * [How do I use API to retrieve IDs by name?](#how-do-i-use-api-to-retrieve-ids-by-name)
- [Workflow APIs](#workflow-apis)
  * [Can I get Workflow details using GraphQL APIs?](#can-i-get-workflow-details-using-graphql-apis)
  * [How to see executions for a given Workflow using Harness APIs?](#how-to-see-executions-for-a-given-workflow-using-harness-apis)
  * [How can I trigger a Workflow using GraphQL API?](#how-can-i-trigger-a-workflow-using-graphql-api)
  * [Can I fetch a user by email address using the Harness API?](#can-i-fetch-a-user-by-email-address-using-the-harness-api)
- [Pipeline APIs](#pipeline-apis)
  * [What is the query used to fetch Pipeline ID?](#what-is-the-query-used-to-fetch-pipeline-id)
  * [Can I see details of a Pipeline using Harness API?](#can-i-see-details-of-a-pipeline-using-harness-api)
- [Service APIs](#service-apis)
  * [How to fetch the list of Services for a given Application using Services API?](#how-to-fetch-the-list-of-services-for-a-given-application-using-services-api)
- [Trigger APIs](#trigger-apis)
  * [How to create, read, update, and delete [Triggers](../continuous-delivery/model-cd-pipeline/triggers/add-a-trigger-2.md) using the Harness API?](#how-to-create-read-update-and-delete-triggerscontinuous-deliverymodel-cd-pipelinetriggersadd-a-trigger-2md-using-the-harness-api)
- [Users and Groups API](#users-and-groups-api)
  * [Can I create a user and assign them to the Harness User Groups?](#can-i-create-a-user-and-assign-them-to-the-harness-user-groups)
  * [How to assign permissions to Harness user groups using APIs?](#how-to-assign-permissions-to-harness-user-groups-using-apis)
  * [How do I use API to retrieve IDs by name?](#how-do-i-use-api-to-retrieve-ids-by-name-1)
- [Harness Tags](#harness-tags)
  * [How do I filter Harness entities using Harness Tags?](#how-do-i-filter-harness-entities-using-harness-tags)
- [Secrets Management](#secrets-management)
  * [What are the different secret types supported using API?](#what-are-the-different-secret-types-supported-using-api)
- [Git Connectors](#git-connectors)
  * [Can I create, read, update, and delete (CRUD) Git Connectors using Harness GraphQL API?](#can-i-create-read-update-and-delete-crud-git-connectors-using-harness-graphql-api)
<!-- TOC end -->


### Before You Begin

* [​Introduction to Harness GraphQL API](../firstgen-platform/techref-category/api/harness-api.md)
* [Harness API Explorer](../firstgen-platform/techref-category/api/harness-api-explorer.md)

### General

#### Why Harness uses GraphQL APIs?

GraphQL offers the following efficiency and reliability features for your consuming applications:

* Scoping – Each request can query for all the resources and data you want, and only the data you want.
* Introspection – Your client applications can query the API schema for details about the API.
* Hierarchical Organization – Your queries' nested fields mirror the organization of the JSON data that the queries return.
* Strong Typing – Applications can specify expected data types per field, and receive clear and specific error notifications.
* Future-Proofing – GraphQL allows us to incrementally expose new fields and types, and retire obsolete fields, without versioning the API or breaking your existing queries.

#### Where do I construct API queries and see responses?

The **Harness API Explorer** allows you to construct and perform API queries and see their responses. You can use API Explorer to examine the API's structure, to build and test queries against your data, and to optimize your queries. For more information, see [Harness API Explorer](../firstgen-platform/techref-category/api/harness-api-explorer.md).

#### How do I fetch data using GraphQL APIs?

Every GraphQL schema has a root type for both queries and mutations. The [query type](https://graphql.github.io/graphql-spec/June2018/#sec-Type-System) defines GraphQL operations that retrieve data from the server. GraphQL queries return only the data you specify. To form a query, you must specify [fields within fields](https://developer.github.com/v4/guides/intro-to-graphql#field) (also known as nested subfields).

Here is an example:


```
query {  
  applicationByName(name: "Harness GraphQL"){  
    id  
    name  
  }  
}
```
For more information, see [Queries](https://graphql.github.io/learn/queries/) and [Schema and Types](https://graphql.github.io/learn/schema/).

#### How do I write data using GraphQL APIs?

Every GraphQL schema has a root type for both queries and mutations. The [mutation type](https://graphql.github.io/graphql-spec/June2018/#sec-Type-System) defines GraphQL operations that change data on the server. It is analogous to performing HTTP verbs such as `POST`, `PATCH`, and `DELETE`.

There are generally three kinds of mutations:

* creating new data
* updating existing data
* deleting existing data

Mutations follow the same syntactical structure as queries, but they always need to start with the `mutation` keyword. 

Here is an example:


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
For more information, see [Mutations](https://graphql.github.io/learn/queries/) and [Schema and Types](https://graphql.github.io/learn/schema/).

#### Is `clientMutationId` a mandatory parameter?

No. This is a unique identifier (string) for the client performing the mutation.`clientMutationId` appears in both input and output types for mutations. If present, the same value is intended to be returned in the response as well. The client can use this to indicate duplicate mutation requests to the server and avoid multiple updates for the same request.

#### How does Harness GraphQL API factor dynamic values out of the query?

GraphQL has a first-class way to factor dynamic values out of the query, and pass them as a separate dictionary. These values are called [variables](https://graphql.github.io/learn/queries/#variables).

Here is an example:


```
query($thisPipeline: String!) {  
  pipeline(pipelineId: $thisPipeline) {  
    id  
    name  
    description  
  }  
}
```
#### Does Harness impose Rate/Data Limiting?

Yes. Harness GraphQL API imposes the following limits:

* **Deployments:** 100 per 24 hours (rolling, not reset at 12am).
* **GraphQL:** 30 requests per minute.
* **GraphQL custom dashboard:** 30 requests per minute per paid account, 5 per Community and Essentials Editions.
* **Delegate:** 200 tasks acquired per minute per account. 10000 tasks acquired per minute per pod.
* **Export Executions:** 25 exports per 24 hours (rolling).
* **Logins:** 300 request per minute per pod.

##### Cloudflare Rate Limiting

Harness uses Cloudflare as part of its platform. As a result, the following limitations apply:

* 500 queries per minute per Harness account Id.
* If the limit is reached, queries are blocked for one minute.

If the limit is reached, you will see a 429 status code with the following response:


```
{  
  "code": "TOO_MANY_REQUESTS",  
  "message": "Too many requests received, please try again later - Rate-Limit Limit 500 reached",  
  "status": "Error"  
}
```
#### What does API in beta mean?

API in beta allows you to try out new APIs and changes to the existing API methods before they become part of the official Harness GraphQL API. During the beta phase, some changes might be made to the features based on the feedback.

#### Where can I find a list of deprecated API features?

See [Deprecated API Features](../firstgen-platform/techref-category/api/deprecated-apis.md).

#### How do I share any feedback on Harness GraphQL APIs?

You can send us feedback on our APIs at **api-feedback@harness.io**. We'd love to hear from you.

### Building Applications Using Postman

#### Can I query Harness GraphQL in Postman?

Yes. See [Query Harness GraphQL in Postman](../firstgen-platform/techref-category/api/graph-ql-apis-for-browser-based-automation.md#query-harness-graph-ql-in-postman).

#### How do I convert my query into the programming language of my choice in Postman?

See [Build Language-Specific Queries in Postman](../firstgen-platform/techref-category/api/graph-ql-apis-for-browser-based-automation.md#build-language-specific-queries-in-postman).

### Authentication

#### How do I authenticate in Harness API Explorer?

You can authenticate using the **Logged-in User Session** or **Use API Key**. The authentication determines what data you can query and retrieve via the API. By default, when you launch the **API Explorer**, you authenticate using a session key. See [Harness API Explorer](../firstgen-platform/techref-category/api/harness-api-explorer.md).

### Cloud Provider APIs

#### Can I create, read, update, and delete Harness Cloud Providers using Harness GraphQL APIs?

Yes, you can create, read, update, and delete [Harness Cloud Providers](../firstgen-platform/account/manage-connectors/cloud-providers.md) using the Harness API. See [Use Cloud Providers API](../firstgen-platform/techref-category/api/use-cloud-providers-api.md).

#### How to search for Cloud Provider by ID?

Using the Cloud Providers ID, you can run `cloudProvider(cloudProviderId)` or `cloudProviderById()`. See [Search for Cloud Provider by ID](../firstgen-platform/techref-category/api/use-cloud-providers-api.md#step-5-search-for-cloud-provider-by-id).

#### Can I find all Cloud Providers by type using Harness API?

Yes. For more information, see [Find all Cloud Providers by Type](../firstgen-platform/techref-category/api/use-cloud-providers-api.md#step-4-find-all-cloud-providers-by-type).

#### How to find Cloud Provider by name?

Using the Cloud Provider's name, run `cloudProviderByName`. See [Find Cloud Provider by Name](../firstgen-platform/techref-category/api/use-cloud-providers-api.md#step-6-find-cloud-provider-by-name).

### Artifact Source APIs

#### Can I fetch Artifact Source details using GraphQL APIs?

Yes. For details, see [Fetch Artifact Source Details Using GraphQL APIs](../firstgen-platform/techref-category/api/artifact-source-api.md).

#### How to fetch Artifact Source from a Service using APIs?

Use this sample query to get the `Artifact Source` and `Artifact History` from a Harness Service. [Provide a Service ID](../firstgen-platform/techref-category/api/artifact-source-api.md#step-fetch-the-service-id) to fetch the details.


```
query{  
  service(serviceId: "ABEvYYxdRSegoaSFxIx2xX"){  
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
#### What is the query used to fetch Artifact Source ID from an Artifact?


```
{  
  artifacts(filters:[  
    {  
      artifact: {  
        operator: EQUALS,  
        values: ["a9xxxABCDwCNxnk90as1fA"]  
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
### Artifact Type APIs

#### Can I fetch Artifact Type details using GraphQL APIs?

Yes. See [Fetch Artifact Type Details Using GraphQL APIs](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md).

#### What are the supported Artifact Types?

You can fetch the following Artifact Type details using GraphQL APIs. For more information, see the following topics:

* [Fetch Details of Jenkins Artifact Type](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md#fetch-details-of-jenkins-artifact-type)
* [Fetch Details of Bamboo Artifact Type](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md#fetch-details-of-bamboo-artifact-type)
* [Fetch Details of Docker Registry Artifact Type](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md#fetch-details-of-docker-registry-artifact-type)
* [Fetch Details of Elastic Container Registry (ECR) Artifact Type](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md#fetch-details-of-elastic-container-registry-ecr-artifact-type)
* [Fetch Details of Google Cloud Container Registry (GCR) Artifact Type](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md#fetch-details-of-google-cloud-container-registry-gcr-artifact-type)
* [Fetch Details of Azure Container Registry (ACR) Artifact Type](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md#fetch-details-of-azure-container-registry-acr-artifact-type)
* [Fetch Details of Nexus Artifact Type](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md#fetch-details-of-nexus-artifact-type)
* [Fetch Details of Artifactory Artifact Type](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md#fetch-details-of-artifactory-artifact-type)
* [Fetch Details of Amazon S3 Artifact Type](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md#fetch-details-of-amazon-s3-artifact-type)
* [Fetch Details of AMI Artifact Type](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md#fetch-details-of-ami-artifact-type)
* [Fetch Details of GCS Artifact Type](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md#fetch-details-of-gcs-artifact-type)
* [Fetch Details of SMB Artifact Type](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md#fetch-details-of-smb-artifact-type)
* [Fetch Details of Azure Artifact Type](../firstgen-platform/techref-category/api/fetch-artifact-type-using-graph-ql-apis.md#fetch-details-of-azure-artifact-type)

### Harness Applications API

#### What are the different actions that I can perform using Harness Applications API?

You can perform the following actions using Harness Application APIs:

* [Create Applications](../firstgen-platform/techref-category/api/use-harness-applications-api.md#create-applications)
* [Update Applications](../firstgen-platform/techref-category/api/use-harness-applications-api.md#update-applications)
* [Enable Git Sync for an Application](../firstgen-platform/techref-category/api/use-harness-applications-api.md#enable-git-sync-for-an-application)
* [Show Pipelines for a Given Application](../firstgen-platform/techref-category/api/use-harness-applications-api.md#show-pipelines-for-a-given-application)
* [Show Services for a Given Application](../firstgen-platform/techref-category/api/use-harness-applications-api.md#show-services-for-a-given-application)
* [Fetch the List of Services for a Given Application](../firstgen-platform/techref-category/api/use-harness-applications-api.md#fetch-the-list-of-services-for-a-given-application)
* [Filter Harness Applications using Harness Tags in the API](../firstgen-platform/techref-category/api/use-harness-applications-api.md#filter-harness-applications-using-harness-tags-in-the-api)

For more information, see [Use Harness Applications API](../firstgen-platform/techref-category/api/use-harness-applications-api.md).

#### How do I use API to retrieve IDs by name?

You can retrieve `applicationId`, `userIds`, and `userGroupId` object IDs (respectively) by using the `applicationByName`, `userByName`, and `userGroupByName` operations. Each of these queries takes a required `name` argument, as a string. See [Use API to Retrieve IDs by Name](../firstgen-platform/techref-category/api/use-api-to-retrieve-i-ds-by-name.md).

### Workflow APIs

#### Can I get Workflow details using GraphQL APIs?

Yes, you can get [Workflow](../firstgen-platform/techref-category/api/use-workflows-api.md) information using APIs.

#### How to see executions for a given Workflow using Harness APIs?

This sample queries by `workflowId` to return up to 30 deployments.


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
#### How can I trigger a Workflow using GraphQL API?

Perform the following steps:

* [Step 1: Fetch the Application ID](../firstgen-platform/techref-category/api/trigger-workflow-or-a-pipeline-using-api.md#step-1-fetch-the-application-id)
* [Step 2: Fetch the Workflow or Pipeline ID](../firstgen-platform/techref-category/api/trigger-workflow-or-a-pipeline-using-api.md#step-2-fetch-the-workflow-or-pipeline-id)
* [Step 3: Fetch the Execution Input](../firstgen-platform/techref-category/api/trigger-workflow-or-a-pipeline-using-api.md#step-3-fetch-the-execution-input)
* [Step 4: Start the Execution](../firstgen-platform/techref-category/api/trigger-workflow-or-a-pipeline-using-api.md#step-4-start-the-execution)

For details, see [Trigger Workflows or Pipelines Using GraphQL API](../firstgen-platform/techref-category/api/trigger-workflow-or-a-pipeline-using-api.md).

#### Can I fetch a user by email address using the Harness API?

Yes, you can fetch a user by email address using the Harness API, including users that have not accepted invites. See [Fetch Users By Email Address](../firstgen-platform/techref-category/api/fetch-users-by-email-address.md).

### Pipeline APIs

#### What is the query used to fetch Pipeline ID?

Use this query to get `pipelineId` .


```
query{pipelineByName(applicationId: "-XXXXqR6QIeXXXz-VuwIzA" pipelineName: "Test Pipeline"  
) {  
  id  
}}
```
#### Can I see details of a Pipeline using Harness API?

Yes. This example returns basic information about a specified Pipeline. It corresponds to a `GET` operation in a REST API.


```
{  
  pipeline(pipelineId: "<pipelineId>") {  
    id  
    name  
    description  
  }  
}
```
For more information, see [Use Pipelines API](../firstgen-platform/techref-category/api/use-pipelines-api.md).

### Service APIs

#### How to fetch the list of Services for a given Application using Services API?

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
For more information, see [Use Services API](../firstgen-platform/techref-category/api/use-services-api.md).

### Trigger APIs

#### How to create, read, update, and delete [Triggers](../continuous-delivery/model-cd-pipeline/triggers/add-a-trigger-2.md) using the Harness API?

Triggers automate deployments using a variety of conditions, such as Git events, new Artifacts, schedules, and the success of other Pipelines.

* Create a Trigger using the mutation `createTrigger`. You can select any of the following conditions to execute a Trigger:
	+ On Pipeline Completion
	+ On New Artifact
	+ On Time Schedule
	+ On Webhook Event
* Update a Trigger using the mutation `updateTrigger`.
* Delete a Trigger using the mutation `deleteTrigger`. You need to enter the ID of the Trigger that you want to delete

See [Use Trigger APIs](../firstgen-platform/techref-category/api/use-trigger-apis.md).

### Users and Groups API

#### Can I create a user and assign them to the Harness User Groups?

Yes. See [Create a user](../firstgen-platform/techref-category/api/sample-queries-create-users-user-groups-and-assign-permissions.md#create-a-user).

#### How to assign permissions to Harness user groups using APIs?

For details, see [Assign Permissions](../firstgen-platform/techref-category/api/sample-queries-create-users-user-groups-and-assign-permissions.md#assign-permissions).

#### How do I use API to retrieve IDs by name?

You can retrieve `applicationId`, `userIds`, and `userGroupId` object IDs (respectively) by using the `applicationByName`, `userByName`, and `userGroupByName` operations. Each of these queries takes a required `name` argument, as a string. See [Use API to Retrieve IDs by Name](../firstgen-platform/techref-category/api/use-api-to-retrieve-i-ds-by-name.md).

### Harness Tags

#### How do I filter Harness entities using Harness Tags?

Harness provides advanced tagging features for all of your Harness [Application entities](../continuous-delivery/model-cd-pipeline/applications/application-configuration.md) (Services, Environments, Workflows, etc), as described in [Assign Metadata Using Tags](../firstgen-platform/account/tags/tags.md) and [Apply Filters Using Tags](../firstgen-platform/account/tags/apply-filters-using-tags.md).

You can use Tags to search for entities, ensuring that you only return the entities tagged with a specific name and value. Perform the following steps:

1. Assign Tags to your Harness Entities.
2. Use `TagFilter`.

For details, see [Filter Harness Entities using Harness Tags in the API](../firstgen-platform/techref-category/api/filter-api-queries-using-harness-tags.md).

### Secrets Management

#### What are the different secret types supported using API?

Harness GraphQL API includes:

* [Encrypted Text API](../firstgen-platform/techref-category/api/api-encrypted-text.md)
* [Encrypted Files API](../firstgen-platform/techref-category/api/api-encrypted-files.md)
* [SSH Credentials API](../firstgen-platform/techref-category/api/api-ssh-credentials.md)
* [WinRM Credentials API](../firstgen-platform/techref-category/api/api-win-rm-credentials.md)

### Git Connectors

#### Can I create, read, update, and delete (CRUD) Git Connectors using Harness GraphQL API?

Yes. For more information, see [Add Git Connectors Using API](../firstgen-platform/techref-category/api/add-git-connectors-using-api.md).

