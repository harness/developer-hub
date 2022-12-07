---
title: API Schema and Structure
description: Describes about Harness API schema and structure.
# sidebar_position: 2
helpdocs_topic_id: kn8wsu80n4
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness' schema determines what parameters your queries can specify as arguments, and what data can be returned.

Following GraphQL conventions, Harness schema is represented in terms of *fields, types, enums, nodes, edges,* and *connections.*

The `!` following the type means that this field is *required*.In this topic:

* [Before You Begin](https://docs.harness.io/article/kn8wsu80n4-api-schema-and-structure#before_you_begin)
* [Fields](https://docs.harness.io/article/kn8wsu80n4-api-schema-and-structure#fields)
* [Next Steps](https://docs.harness.io/article/kn8wsu80n4-api-schema-and-structure#next_steps)

### Before You Begin

* [​Introduction to Harness GraphQL API](/article/tm0w6rruqv-harness-api)
* [Harness API Explorer](/article/2rmd5i0e0h-harness-api-explorer)

### Fields

The Harness API's schema includes fields representing the following Harness entities. Note that many of these `<entityId>` or `<entity>` fields are also transformed within the schema into an `<entity>Aggregation`, `<entity>Connection`, and/or `<entity>Filter`. Use the API Explorer's search box to discover the available fields and their usage.



|  |  |
| --- | --- |
| **Field Name** | **Harness Entity/Notes** |
| `applicationId` | Harness Application. |
| `serviceId` | Harness Service. |
| `environmentId` | Harness Environment. |
| `workflowId` | Harness Workflow. |
| `pipelineId` | Harness Pipeline. |
| `executionId` | A Harness deployment (execution). |
| `artifactId` | Artifact deployed via Harness. |
| `cloudProviderId` | Cloud Provider configured in Harness. |
| `Instance` | Instance deployed via Harness. |
| `connectorId` | Connector configured in Harness. |
| `description` | Description of a Workflow, Pipeline, etc. |
| `id` | Unique ID of a Harness entity. |
| `name` | Name of a Workflow, Pipeline, etc. |
| `total` | Total number of a parent Harness entity. |
| `status`, `ExecutionStatus` | Deployment's execution status. |
| `createdAt` | Time when deployment was queued in Harness. |
| `startedAt` | Time when deployment's execution began. |
| `TimeSeriesAggregation` | Used to group returned statistics (on deployments, instances, etc.) by time. |
| `TriggerFilter` | One or more Harness Triggers. |
| `limit` | Pagination throttler. |
| `offset` | Pagination pointer. |

### Next Steps

* [Use API to Retrieve IDs by Name](/article/iuswbbvwnm-use-api-to-retrieve-i-ds-by-name)
* [Use Cloud Providers API](/article/dfx0qi1zf7-use-cloud-providers-api)
* [Use Audit Trails API](/article/k9d2zjdnw8-use-audit-trails-api)
* [Use Workflows API](/article/ba4vs50071-use-workflows-api)
* [Use Users and Groups API](/article/p9ssx4cv5t-sample-queries-create-users-user-groups-and-assign-permissions)
* [Use Harness Applications API](/article/0wmvn5dgzn-use-harness-applications-api)
* [Use Pipelines API](/article/rfqmu6cejy-use-pipelines-api)
* [Use Services API](/article/lbw6cny911-use-services-api)
* [Encrypted Text API](/article/omnfccj1n0-api-encrypted-text)
* [Encrypted Files API](/article/jvhzdi1ztj-api-encrypted-files)
* [SSH Credentials API](/article/v65okfwfl2-api-ssh-credentials)
* [WinRM Credentials API](/article/2rlo5zw321-api-win-rm-credentials)

