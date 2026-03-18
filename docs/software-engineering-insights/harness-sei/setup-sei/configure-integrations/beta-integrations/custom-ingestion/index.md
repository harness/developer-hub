---
title: Custom Ingestion Integration
description: Set up the custom ingestion integration to ingest external data sources into SEI 2.0.
sidebar_label: Custom Ingestion
---

:::tip
The Custom Ingestion integration is in beta. To request access, contact [Harness Support](/docs/software-engineering-insights/sei-support).
:::

The Custom Ingestion integration allows teams to ingest external data into SEI 2.0 from any system or data source. This enables organizations to extend SEI analytics beyond out-of-the-box integrations by incorporating product or engineering metrics from other platforms. 

For example, teams can ingest metrics from platforms such as [Aternity](https://help.aternity.com/), [Datadog](http://docs.datadoghq.com/), internal databases, or other proprietary systems. Once ingested, this data becomes available as a **Canvas data source**, enabling you to build custom dashboards, queries, and insights using HQL.

Custom ingestion works by defining a JSON schema that describes the structure of the data you will ingest. Before creating your schema, review the [Custom Data Schema](/docs/software-engineering-insights/harness-sei/setup-sei/configure-integrations/beta-integrations/custom-ingestion/schema-design) to understand field types, validation rules, and best practices. After the schema file is uploaded, Harness SEI generates an ingestion endpoint that can receive data from external pipelines or scheduled jobs.

Data is typically pushed into Harness SEI using scheduled pipelines, ETL jobs, or server-side scripts that send JSON records to the ingestion endpoint.

### Prerequisites

Before you get started, ensure that you have the following requirements:

- The [**SEI Admin** role](/docs/software-engineering-insights/harness-sei/get-started/rbac#out-of-the-box-roles) in Harness
- Access to the external data source that will send data to Harness SEI
- An API key with the [**SEI Ingestion** role](/docs/software-engineering-insights/harness-sei/manage/api-keys#create-an-sei-api-key) to push data into Harness SEI
- A JSON schema file defining the structure of the data you plan to ingest

<details>
<summary>Sample JSON Schema Template</summary>

The schema defines the structure of the records that will be ingested into Harness SEI, including field names, data types, and required attributes.

```json
{
  "schema": {
    "columns": [
      {
        "name": "product",
        "type": "string",
        "required": false,
        "nullable": true,
        "description": "Product identifier",
        "allowedValues": ["checkout", "payments", "auth"]
      },
      {
        "name": "team",
        "type": "string",
        "required": true,
        "nullable": false,
        "description": "Team identifier"
      },
      {
        "name": "application",
        "type": "string",
        "required": true,
        "nullable": false,
        "description": "Application name"
      },
      {
        "name": "environment",
        "type": "string",
        "required": false,
        "nullable": true,
        "allowedValues": ["production", "staging", "development"],
        "description": "Deployment environment"
      },
      {
        "name": "availability",
        "type": "double",
        "unit": "percentage",
        "required": false,
        "nullable": true,
        "requiredWith": ["team", "application"],
        "min": 0,
        "max": 100,
        "description": "Application availability percentage"
      },
      {
        "name": "response_time",
        "type": "double",
        "unit": "milliseconds",
        "required": false,
        "nullable": true,
        "requiredWith": ["team", "application"],
        "min": 0,
        "description": "Average response time"
      },
      {
        "name": "error_rate",
        "type": "double",
        "unit": "percentage",
        "required": false,
        "nullable": true,
        "requiredWith": ["team", "application"],
        "min": 0,
        "max": 100,
        "description": "Error rate percentage"
      },
      {
        "name": "throughput",
        "type": "double",
        "unit": "requests_per_second",
        "required": false,
        "nullable": true,
        "requiredWith": ["team", "application"],
        "min": 0,
        "description": "Request throughput"
      },
      {
        "name": "numerator",
        "type": "long",
        "required": false,
        "nullable": true,
        "requiredWith": ["denominator"],
        "min": 0,
        "description": "Numerator for calculated metrics"
      },
      {
        "name": "denominator",
        "type": "long",
        "required": false,
        "nullable": true,
        "requiredWith": ["numerator"],
        "min": 0,
        "mustBeGreaterThan": 0,
        "description": "Denominator for calculated metrics"
      },
      {
        "name": "error_count",
        "type": "long",
        "unit": "count",
        "required": false,
        "nullable": true,
        "min": 0
      },
      {
        "name": "total_requests",
        "type": "long",
        "unit": "count",
        "required": false,
        "nullable": true,
        "min": 0,
        "mustBeGreaterThanOrEqual": "error_count"
      },
      {
        "name": "cpu_usage",
        "type": "double",
        "unit": "percentage",
        "required": false,
        "nullable": true,
        "min": 0,
        "max": 100
      },
      {
        "name": "memory_usage",
        "type": "double",
        "unit": "megabytes",
        "required": false,
        "nullable": true,
        "min": 0
      },
      {
        "name": "metadata",
        "type": "json",
        "required": false,
        "nullable": true,
        "description": "Additional metadata for drill-down details and context"
      }
    ]
  }
}
```
</details>

## Setup

To configure the Custom Ingestion integration:

1. From the SEI navigation menu, click **Account Management**.
1. From the **Integrations** page, navigate to the **Available Integrations** tab.
1. Locate the Custom Ingestion integration tile under `Custom Ingestion` and click **Add Integration**.
1. In the **Overview** section, provide a name for the integration and optionally, add tags to identify the integration. 

   :::tip Naming a Custom Ingestion Integration
   The integration name is automatically prefixed with `custom_` and becomes the table identifier for the data sources menu in custom Canvas dashboards. 

   For example, an integration named `aternity_fme` will appear in Canvas as `custom_aternity_fme`.
   :::

1. Click **Continue**.
1. In the **Upload Schema** section, upload a schema JSON file describing the structure of the records that will be ingested. To understand the expected structure, you can click **Download Sample Template** and use it as a starting point for your schema definition.
1. Once you've uploaded your schema file, click **Continue**.
1. After uploading the schema, SEI generates a **Schema Preview** showing:
   
   - The generated Canvas data source
   - The number of fields
   - Required fields
   - Record types and their required attributes

1. Review the schema preview to confirm the structure is correct. If everything looks correct, click **Continue**. The integration is created successfully.
   
## Configure the integration

Once the integration is created, SEI 2.0 generates the ingestion endpoint URL (for example, `https:localhost:8181/sei/api/v2/external-data/112/ingestions`) and the Canvas data source table name (for example, `custom_aternity_fme`). This table name is used when querying the data in custom Canvas dashboards.

To push data to SEI 2.0:

1. Use an API key with the [**SEI Ingestion role**](/docs/software-engineering-insights/harness-sei/manage/api-keys/#sei-api-key-roles). To create an API key, click **Create/Manage API Keys**.
1. Send data to the ingestion endpoint using your configured schema.
1. Once ingestion succeeds, click **Finish**. The data becomes available as a Canvas data source.

Harness recommends scheduling **periodic batch ingestion jobs** to push data into SEI.

For optimal performance and reliability:

- Schedule ingestion during off-peak hours (for example, 2-5 AM)
- Use batch sizes of 500–1000 records per request
- Aggregate daily data into single batch ingestion jobs

These practices help reduce API load, improve ingestion performance, and enables more efficient monitoring and troubleshooting.

## Integration monitoring

To monitor the status of the qTest integration, navigate to the **Monitoring** tab. This page provides visibility into ingestion activity and integration health.

You can use the time range selector to switch between **Last 7 Days** and **Last 30 Days**. 

### Records Ingested

Displays the number of records successfully ingested from the external data source during the selected time window and total records ingested since the integration was created.

### API Calls

Shows the number of ingestion API calls made during the selected time window.

### Last Ingestion Status

Displays the status of the most recent ingestion attempt. Options include `Successful`, `Failed`, or `Pending`.

### Ingestion Jobs

Provides a history of ingestion jobs, including timestamps, processing results, and messages for validation or troubleshooting.

| Column | Description |
|--------|-------------|
| **ID** | Unique identifier for the ingestion job. For example, `7ffd5c20`. Use this ID when referencing or investigating a specific run. |
| **Timestamp** | Date and time when the ingestion job executed. For example, `2026-03-05 22:45:39`. |
| **Status** | Outcome of the ingestion job: `completed`, `failed`, or `validation failed`. This shows whether the job succeeded, encountered errors, or did not pass schema validation. |
| **Records** | Summary of records processed. Shows counts of valid vs. total records. For example, `2 valid (2 total)` or `0 valid / 3 invalid (3 total)`. |
| **Message** | Detailed information about the job result, including success confirmations or error messages. For example, `Successfully processed 2 records` or `MISSING_REQUIRED_FIELD: Required field 'id' is missing`. |

### Data Availability

The **Data Availability** timeline visualizes the health of data ingestion during the selected time range. Each segment reflects the integration status at a given point in time:

- **Healthy**: Data was successfully ingested.
- **Unhealthy**: Ingestion failed or encountered errors.
- **Pending**: Ingestion is in progress.
- **No Data**: No data was received for the time window.

:::tip
Use this view to confirm that data pipelines are actively sending records to Harness SEI and identify ingestion failures or delays.
:::
