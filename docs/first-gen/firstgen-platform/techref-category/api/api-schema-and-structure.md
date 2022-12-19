---
title: API Schema and Structure
description: Describes about Harness API schema and structure.
sidebar_position: 30
helpdocs_topic_id: kn8wsu80n4
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness' schema determines what parameters your queries can specify as arguments, and what data can be returned.

Following GraphQL conventions, Harness schema is represented in terms of *fields, types, enums, nodes, edges,* and *connections.*

:::note
The `!` following the type means that this field is *required*.
:::


### Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)

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

* [Use API to Retrieve IDs by Name](use-api-to-retrieve-i-ds-by-name.md)
* [Use Cloud Providers API](use-cloud-providers-api.md)
* [Use Audit Trails API](use-audit-trails-api.md)
* [Use Workflows API](use-workflows-api.md)
* [Use Users and Groups API](sample-queries-create-users-user-groups-and-assign-permissions.md)
* [Use Harness Applications API](use-harness-applications-api.md)
* [Use Pipelines API](use-pipelines-api.md)
* [Use Services API](use-services-api.md)
* [Encrypted Text API](api-encrypted-text.md)
* [Encrypted Files API](api-encrypted-files.md)
* [SSH Credentials API](api-ssh-credentials.md)
* [WinRM Credentials API](api-win-rm-credentials.md)

