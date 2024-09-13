---
title: Elastic Search
description: Learn how to set up Elastic Search as a health source for CV
redirect_from: 
    - /docs/continuous-delivery/verify/configure-cv/verify-deployments-with-elastic-search
---

:::important
- Harness only supports the Lucene query language. 
- Use the Java-supported format when specifying dates in a query.
:::

import BeforeYouBegin from '/docs/continuous-delivery/verify/configure-cv/health-sources/static/before-you-begin.md';

<BeforeYouBegin />

Additionally, Elastic Search needs to be added as a verification provider in Harness.

## Add Elastic Search as a health source

To add a health source:

1. In the **Health Sources** section, select **+ Add New Health Source**.
   
   The Add New Health Source dialog appears.

2. On the **Define Health Source** tab, do the following:
      1. In the **Define Health Source** section, select **ElasticSearch** as health source type.
      2. In the **Health Source Name** field, enter a name for the health source.
      3. In the **Connect Health Source** section, select **Select Connector**.  
     The Create or Select an Existing Connector dialog appears.
      1. Select a connector for the Elasticsearch health source and then select **Apply Selected**.  
     The selected connector appears in the **Select Connector** dropdown.
      1. Select **Next**.  
      
         The **Configuration** tab appears.


:::info note
Currently, Harness supports only Elasticsearch logs. The **ElasticSearch Logs** option is selected by default in the **Select Feature** field.
:::

### Define log configuration settings

1. On the Configuration tab, select **+ Add Query**.  
   
   The Add Query dialog appears.

2. Enter a name for the query and then select **Submit**.  
   
   The query that you added gets listed under the Logs Group. The Custom Queries settings are displayed.
   These settings help you retrieve the desired logs from the Elasticsearch platform and map them to the Harness service. 

### Define a query

1. In the **Query Specifications and Mapping** section, select a log index from the **Log Indexes** list.
   
2. In the **Query** field, enter a log query and select **Run Query** to execute it.
   
    A sample record in the **Records** field. This helps you confirm the accuracy of the query you've constructed.
   
3. In the **Field Mapping** section, map the following identifiers to select the data that you want to be displayed from the logs.
   - **Timestamp Identifier**
   - **Service Instance Identifier**
   - **Message Identifier**
   - **Timestamp Format**

   To define mapping, in each identifier field, do the following:

   1. Select **+**. 
    
      The Select path for Service Instance Identifier page appears.

   2. Go to the identifier value that you want to map and choose **Select**.  
   
      The selected value gets mapped to the corresponding identifier field. 

4. Select **Get sample log messages**.  
   
   Sample logs are displayed that help you verify if the query you built is correct.

### Query syntax

| **Query type** | **Syntax** | **Description** |
| --- | --- | --- |
| Match | `message:error` | This query matches documents containing the term `error` in the `message` field. |
| Wildcard | `message:connect*` | This query matches documents where the `message` field contains words starting with `connect`. |
| Range | `@timestamp:[2022-01-01 TO 2022-01-10]` | This query matches documents with timestamps between January 1, 2022, and January 10, 2022. |
| Boolean | `message:(error AND timeout)` | This query matches documents containing both `error` and `timeout` in the `message` field. |
| Phrase | `message:"out of memory"` | This query matches documents containing the phrase `out of memory` in the `message` field. |
| Fuzzy | `message:warning~` | This query matches documents containing terms similar to `warning` in the `message` field. |
| Field Existence | `_exists_:status` | This query matches documents where the field `status` exists. |
| Wildcard Field | `res*` | This query matches documents where the field starts with `res`. |

#### Sample queries used to find errors

| **Error query type** | **Syntax** | **Description** |
| --- | --- | --- |
| Simple Error Search | `message:error` | Find documents where the message field contains the term `error`. |
| Search for Specific Error Types | `message:"404 Not Found"` <br/> `message:"500 Internal Server Error"` | Find documents where the message field contains specific error types, such as `404 Not Found` or `500 Internal Server Error`. |
| Search for Errors in a Specific Component | `message:(error AND database)` | Find documents where the message field contains the term `error` and another term specifying the component, for example, `database`. |
| Search for Critical Errors | `message:(fatal OR crash OR unrecoverable)` | Find documents where the message field contains terms indicating critical errors, such as `fatal`, `crash`, or `unrecoverable`. |
| Search for Errors with Specific Response Codes | `message:(500 OR 503)` | Find documents where the message field contains terms indicating errors with specific HTTP response codes, such as `500` or `503`. |
| Search for Errors in a Time Range | `message:error AND @timestamp:[2022-01-01 TO 2022-01-10]` | Find documents with errors that occurred within a specific time range, for example, between January 1, 2022, and January 10, 2022. |
| Search for Errors with Specific Keywords | `message:(exception OR failed OR "unable to")` | Find documents where the message field contains specific keywords associated with errors, such as `exception`, `failed`, or `unable to`. |
| Search for Errors with Stack Traces | `message:(at OR "caused by")` | Find documents where the message field contains terms indicative of stack traces, such as `at` or `caused by`. |

#### Infrastructure error queries

- Search for server errors: `message:(error OR "server error" OR "internal server error")`
- Search for network issues: `message:(timeout OR "network error" OR "connection refused")`
- Search for database errors: `message:(database OR SQL OR "query error" OR "database connection")`
- Search for disk space issues: `message:(disk OR "disk space" OR "disk error" OR "disk full")`
- Search for infrastructure configuration errors: `message:(configuration OR "config error" OR "invalid configuration")`
- Search for hardware failures: `message:(hardware OR "hardware error" OR "device failure")`
- Search for service unavailability: `message:(unavailable OR "service down" OR "service unavailable")`
- Search for performance issues: `message:(performance OR "slow response" OR "high latency")`

#### API error queries

- Search for HTTP status codes indicating errors: `message:(404 OR 500 OR 503 OR 403)`
- Search for API response error messages: `message:(error OR failed OR "unable to")`
- Search for specific API error codes: `message:(API_ERROR_CODE1 OR API_ERROR_CODE2)`
- Search for timeout errors: `message:(timeout OR "connection timed out" OR "request timeout")`
- Search for rate limit exceeded errors: `message:(rate OR "rate limit" OR "rate exceeded")`
- Search for authentication errors: `message:(unauthorized OR "authentication failed")`
- Search for API input validation errors: `message:(invalid OR "validation error")`
- Search for API gateway errors: `message:(gateway OR "proxy error" OR "gateway error")`

#### Performance error queries

- Search for slow requests: `message:(slow OR "slow response" OR "long duration")`
- Search for high latency: `message:(latency OR "high latency" OR "latency exceeded threshold")`
- Search for memory leaks: `message:(memory OR "out of memory" OR "memory exhausted")`
- Search for CPU usage errors: `message:(cpu OR "high CPU usage" OR "CPU overload")`
- Search for disk I/O issues: `message:(disk OR "disk I/O error" OR "slow disk I/O")`
- Search for database query performance issues: `message:(database OR "slow query" OR "database bottleneck")`
- Search for network latency: `message:(network OR "network latency" OR "network bottleneck")`
- Search for resource starvation: `message:(resource OR "resource starvation" OR "resource exhaustion")`