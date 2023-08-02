---
title: ​Introduction to Harness GraphQL API
description: Query Harness' public GraphQL API using our API Explorer, Postman, or your custom applications.
sidebar_position: 10
helpdocs_topic_id: tm0w6rruqv
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

GraphQL is the API for Harness FirstGen only. Harness NextGen uses a **REST** API. For NextGet, go to [Get started with Harness APIs](/docs/platform/Resource-Development/APIs/api-quickstart). GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data. For more information, visit [GraphQL.org](https://graphql.org/) and [GitHub GraphQL API v4](https://developer.github.com/v4/).

Harness exposes its public API in GraphQL format. Virtually all of Harness' meaningful entities are exposed through the API, such as Applications, Services, Artifacts, Cloud Providers, Environments, Workflows, Pipelines, deployed instances, deployment data, etc.

Harness' public GraphQL API unlocks the Harness Continuous Delivery platform, enabling you to build third-party applications that leverage Harness' power to meet your needs. Your applications' queries can return a rich selection of Harness setup parameters and runtime data.

### Why GraphQL

GraphQL offers the following efficiency and reliability features for your consuming applications:

* **Scoping** – Each request can query for all the resources and data you want, and only the data you want.
* **Introspection** – Your client applications can query the API schema for details about the API.
* **Hierarchical Organization** – Your queries' nested fields mirror the organization of the JSON data that the queries return.
* **Strong Typing** – Applications can specify expected data types per field, and receive clear and specific error notifications.
* **Future-Proofing** – GraphQL allows us to incrementally expose new fields and types, and retire obsolete fields, without versioning the API or breaking your existing queries.

### Harness API Explorer

The Harness API Explorer allows you to construct and perform API queries and see their responses. You can use the Explorer to examine the API's structure, to build and test queries against your data, and to optimize your queries. For more information, see [Harness API Explorer](harness-api-explorer.md).

### API Endpoint

The API endpoint for the Harness GraphQL API is:


```
https://app.harness.io/gateway/api/graphql?accountId=<your-harness-account-id>
```
See [Building Applications Using Postman](graph-ql-apis-for-browser-based-automation.md).

### Fetch Data With Queries

Every GraphQL schema has a root type for both queries and mutations. The [query type](https://graphql.github.io/graphql-spec/June2018/#sec-Type-System) defines GraphQL operations that retrieve data from the server. GraphQL queries return only the data you specify. To form a query, you must specify [fields within fields](https://developer.github.com/v4/guides/intro-to-graphql#field) (also known as nested subfields).

Here is an example:


```
query {  
  applicationByName(name: "Harness GraphQL"){  
    id  
    name  
  }  
}
```
For more information, see [Queries](https://graphql.github.io/learn/queries/) and [Schema and Types](https://graphql.github.io/learn/schema/).

### Write Data With Mutations

Every GraphQL schema has a root type for both queries and mutations. The [mutation type](https://graphql.github.io/graphql-spec/June2018/#sec-Type-System) defines GraphQL operations that change data on the server. It is analogous to performing HTTP verbs such as `POST`, `PATCH`, and `DELETE`.

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
For more information, see [Mutations](https://graphql.github.io/learn/queries/) and [Schema and Types](https://graphql.github.io/learn/schema/).

#### Use clientMutationId (Optional)

This is a unique identifier (string) for the client performing the mutation.`clientMutationId` appears in both input and output types for mutations.

If present, the same value is intended to be returned in the response as well. The client can use this to indicate duplicate mutation requests to the server and avoid multiple updates for the same request.

This is helpful in the race conditions where the client fires a duplicate request. The original request times out, but the server had processed the original.

This is also required by some of the GraphQL clients like a relay.

### Variables

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
### Pagination

By default, results are limited to 100. For more than 100, you need to make multiple queries or use [aliases](https://graphql.org/learn/queries/#aliases).

To show less than 100, you can use pagination.

In such a case, the API will paginate the requested items. Here is an example:


```
{  
  pipelines(  
    ...  
    limit: 5  
    offset: 2  
  )   
...
```
You can specify pagination criteria as follows:

* `limit` is a throttler, specifying how many results to return per page.
* `offset` is an index from `0`.

For more information, see [Pagination](https://graphql.org/learn/pagination/).

### Nodes and IDs

Where a query returns a list of multiple objects, each returned object is treated as a GraphQL *node*. Several of the above sample queries use `nodes` sub-elements to reference, or iterate through, individual objects in your results. Here is an example:


```
 nodes {  
      id  
      name  
      description  
      createdAt  
    }
```
### Schema

Harness' schema determines what parameters your queries can specify as arguments, and what data we can return. Following GraphQL conventions, we represent our schema in terms of *fields, types, enums, nodes, edges,* and *connections.*

:::note
The `!` following the type means that this field is *required*.
:::

The Harness API's schema includes fields representing the following Harness entities. Use the API Explorer's search box to discover the available fields and their usage. For more information, see [API Schema and Structure](api-schema-and-structure.md).

### Rate/Data Limiting

The Harness API imposes a (sliding-window) rate limit of 30 requests per minute, per account. Each request is limited to a maximum query depth of 10 properties. Harness reserves the right to change these limits, in order to optimize performance for all API consumers.

Summary:

* **Deployments:** 100 per 24 hours (rolling, not reset at 12am).
* **GraphQL:** 30 requests per minute.
* **GraphQL custom dashboard:** 30 requests per minute per paid account, 5 per Community and Essentials Editions.
* **Delegate:** 200 tasks acquired per minute per account. 10000 tasks acquired per minute per pod.
* **Export Executions:** 25 exports per 24 hours (rolling).
* **Logins:** 300 request per minute per pod.

#### Cloudflare Rate Limiting

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
### Build Applications

You can use [Postman](https://www.getpostman.com/downloads/) (version 7.2 or higher) to run a GraphQL query, to use APIs in a web app, and to automatically regenerate your query in any programming language that Postman supports. For more information, see [Building Applications Using Postman](graph-ql-apis-for-browser-based-automation.md).

### API in Beta

API in beta allows you to try out new APIs and changes to the existing API methods before they become part of the official Harness GraphQL API.

During the beta phase, some changes might be made to the features based on the feedback.

### Feedback?

You can send us feedback on our APIs at [api-feedback@harness.io](mailto:api-feedback@harness.io). We'd love to hear from you.

### Next Steps

* [Harness API Explorer](harness-api-explorer.md)
* [API Schema and Structure](api-schema-and-structure.md)
* [Building Applications Using Postman](graph-ql-apis-for-browser-based-automation.md)
* [Deprecated API Features](deprecated-apis.md)

