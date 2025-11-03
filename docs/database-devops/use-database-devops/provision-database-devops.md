---
title: Provision Database DevOps
Description: Learn how to provision Database DevOps in Harness.
tags:
    - database devops
    - terraform
    - db schema
    - db schema migration
    - db schema versioning
    - db schema changes
    - db schema management
    - db schema automation
keywords:
    - database devops
    - terraform
    - db schema
    - db schema migration
    - db schema versioning
    - db schema changes
    - db schema management
    - db schema automation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Provisioning via Terraform">
This guide walks you through provisioning Database DevOps using Terraform and the Harness Terraform Provider. The configuration enables seamless schema management, database instance provisioning, and automation of schema changes as part of your CI/CD workflows.

## Prerequisites
Before proceeding, ensure you have:
- Terraform v1.3+ installed.
- Access to a Harness account with Database DevOps Licence. Contact [Harness Database DevOps Support](https://www.harness.io/demo/database-devops) if you need assistance.
- Properly configured connectors for your databases (e.g., CockroachDB, PostgreSQL).
- A valid [Harness Platform API Key](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys/#create-personal-api-keys-and-tokens).

## Step 1: Define a Database Schema
The `harness_platform_db_schema` resource allows you to define and manage a database schema.
```hcl
resource "harness_platform_db_schema" "my_schema" {
  identifier = "my_db_schema"        
  org_id     = "default"    
  project_id = "default_project"  
  name       = "My Database Schema" 
  tags       = ["env:prod", "team:backend"]
  schema_source {
    connector = "cockroachDB"    # database connector
    location  = "changelog.yaml" # schema changelog file
  }
}
```
In the above configuration:
- `schema_source.connector`: Connector type (e.g., CockroachDB, PostgreSQL).
- `schema_source.location`: Location of the migration file (e.g., Liquibase/YAML changelog).
- `tags`: Useful for environment/team attribution.

This ensures schema migrations are version-controlled and can be applied consistently across environments.

## Step 2: Provision a Database Instance
Next, use the `harness_platform_db_instance` resource to provision a database instance.
```hcl
resource "harness_platform_db_instance" "my_instance" {
  identifier = "my_db_instance"
  org_id     = "default"
  project_id = "default_project"
  name       = "My Database Instance"
  tags       = ["env:prod"]
  schema    = "my_db_schema"
  branch    = "main"                 
  connector = "pg"     
  context   = "production"           
}
```
In this configuration, you specify:
- `schema`: Binds the instance to the defined schema.
- `branch`: Ties schema changes to a Git branch (commonly main).
- `connector`: Database connector (PostgreSQL in this example).
- `context`: Logical environment (e.g., production).
- `depends_on`: Ensures schema creation before instance provisioning.

This setup allows you to manage database instances that automatically track schema changes.

## Example Terraform Configuration
Here’s a complete example combining both resources:
```hcl
terraform {  
  required_providers {  
    harness = {  
      source  = "harness/harness"  
      version = "<version>"  
    }  
  }  
}

provider "harness" {  
  endpoint         = "https://app.harness.io/gateway"  
  account_id       = "your_account_id"  
  platform_api_key = "pat_XXXXXXXXXXXXXXXX"  
}

resource "harness_platform_db_schema" "my_schema" {
  identifier = "my_db_schema"        
  org_id     = "default"    
  project_id = "default_project"  
  name       = "My Database Schema" 
  tags       = ["env:prod", "team:backend"]
  
  schema_source {
    connector = "cockroachDB"           # which type of database change tracking / connector type
    location  = "changelog.yaml"         # file / path where schema changes are defined
  }
}

resource "harness_platform_db_instance" "my_instance" {
  identifier = "my_db_instance"
  org_id     = "default"
  project_id = "default_project"
  name       = "My Database Instance"
  tags       = ["env:prod"]
  
  schema    = "my_db_schema"             # references the above schema
  branch    = "main"                     # branch in version control where migrations are tracked
  connector = "pg"                       # the database connector for the instance (PostgreSQL in this case)
  context   = "production"               # logical context / environment label

  depends_on = [harness_platform_db_schema.my_schema]
}
```
## Step 3: Apply the Configuration
To apply the configuration:
```bash
terraform init
terraform plan
terraform apply
```
This will provision:
- A database schema `my_db_schema` with versioned migrations.
- A database instance `my_db_instance` bound to the schema.

:::info
If you also want to set up a JDBC connection via Terraform, you can use the [harness_platform_connector_jdbc](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_connector_jdbc) resource.
:::


</TabItem>
<TabItem value="Provisioning via API">

This guide shows you how to create a database schema and then provision a database instance that tracks changes to the schema. This approach ensures your database objects are versioned and deployed consistently across environments.

## Prerequisites

Before you start, ensure you have:

- A valid **Harness account** and API key. Learn more about managing API keys [here](https://developer.harness.io/docs/platform/automation/api/add-and-manage-api-keys/#create-personal-api-keys-and-tokens).
- Organization (`orgIdentifier`) and Project (`projectIdentifier`) IDs.
- A pre-configured **DB Connector**. You can create one via the [Harness API](https://apidocs.harness.io/connectors/createconnector) as well or Harness UI. This connector allows Harness to connect to your database (e.g., PostgreSQL, MySQL, CockroachDB).
- An HTTP client such as `curl` or Postman.

:::note
If you are using Harness API to Create a Database Connector, `connector.type` should be set to `JDBC`. Learn more about creating a JDBC connector [here](https://developer.harness.io/docs/database-devops/use-database-devops/set-up-connectors/).
:::

In the cURL examples below, replace:
- `<org>` with your organization identifier. You can find this in the URL when logged into Harness: `https://app.harness.io/ng/org/<org>/...`
- `<project>` with your project identifier. You can find this in the URL when logged into Harness: `https://app.harness.io/ng/org/<org>/projects/<project>/...`
- `<account_id>` with your Harness account ID. You can find this in the URL when logged into Harness: `https://app.harness.io/ng/account/<account_id>/...`
- `<your_api_key>` with your Harness API key. You can find this under Profile Overview.

## Step 1: Create a Database Schema

Use the Harness Database DevOps API to define a schema that your instances will use.

### Request

**Endpoint:**

```
POST /v1/orgs/{org}/projects/{project}/dbschema
```

**Body Example**
```json
{
  "changeLogScript": {
    "command": "curl -X -o changeLog.yaml https://www.filestore.com/changeLog.yaml",
    "image": "plugins/image:latest",
    "location": "changelog.yaml",
    "shell": "Sh, Bash, <+pipeline.variables.shell>"
  },
  "changelog": {
    "connector": "cockroachDB",
    "location": "changelog.yaml",
    "repo": "changelog.yaml"
  },
  "identifier": "string",
  "migrationType": "Liquibase",
  "name": "string",
  "type": "Repository"
}
```
In the above request, we define a schema with the following parameters:
-  `identifier` : Unique identifier for the schema. Must be alphanumeric and can include `_` or `$`.
-  `name` : Friendly display name of the schema.
-  `branch` : Git branch where schema changes are tracked (e.g., `main`).
-  `description` : (Optional) Description for the schema.
-  `connector` : The pre-configured database connector to use (e.g., `postgres-connector`).
-  `tags` : Optional key-value pairs to categorize schemas (e.g., `{"env":"prod"}`).

:::tip
Creating a schema first ensures that all instances are properly linked and can track versioned changes via Git.
:::

#### Example Curl Request
```bash
curl -i -X POST \
  'https://app.harness.io/v1/orgs/<org>/projects/<project>/dbschema' \
  -H 'Content-Type: application/json' \
  -H 'Harness-Account: <account_id>' \
  -H 'x-api-key: <your_api_key>' \
  -d '{
    "changeLogScript": {
      "command": "curl -X -o changeLog.yaml https://www.filestore.com/changeLog.yaml",
      "image": "plugins/image:latest",
      "location": "changelog.yaml",
      "shell": "Sh, Bash, <+pipeline.variables.shell>"
    },
    "changelog": {
      "connector": "cockroachDB",
      "location": "changelog.yaml",
      "repo": "changelog.yaml"
    },
    "identifier": "my_db_schema",
    "migrationType": "Liquibase",
    "name": "My Database Schema",
    "type": "Repository"
  }'
```

Above command creates a new database schema, and you can now use it to provision instances. Below is the response:
```json
{
  "changelog": {
    "connector": "cockroachDB",
    "location": "changelog.yaml",
    "repo": "changelog.yaml"
  },
  "created": 1761120868,
  "identifier": "my_db_schema",
  "instanceCount": 0,
  "migrationType": "Liquibase",
  "name": "My Database Schema",
  "parentId": "UGHnTeYhRPOv_ttpbEQFKg",
  "schemaSourceType": "Git",
  "type": "Repository",
  "updated": 1761120868
}
```
:::info
The changelog must be provided for Repository type schemas and `instanceCount` starts at 0.
:::

## Step 2: Create a Database Instance
After the schema is ready, let's provision an instance for it.

### Request

**Endpoint:**
```
POST /v1/orgs/{org}/projects/{project}/dbschema/{dbschema}/instance
```

**Body Example**
```json
{
  "identifier": "customer_db_instance",
  "name": "Customer DB Instance",
  "connector": "pg",
  "branch": "main",
  "context": "dev",
  "substituteProperties": { "DB_NAME": "string" },
  "tags": { "env": "dev" }
}
```
In this request, we specify:
- `identifier`: Unique identifier for the database instance.
- `name`: Friendly name for the instance.
- `connector`: The database connector to use (e.g., `pg` for PostgreSQL).
- `branch`: Git branch to track schema changes (e.g., `main`).
- `context`: Logical environment label (e.g., `dev`, `prod`).
- `substituteProperties`: Key-value pairs for any schema property substitutions (e.g., database name).
- `tags`: Optional key-value pairs to categorize instances (e.g., `{"env":"dev"}`).

### Example Curl Request
```bash
curl -i -X POST \
  'https://app.harness.io/v1/orgs/<org>/projects/<project>/dbschema/<db_schema_identifier>/instance' \
  -H 'Content-Type: application/json' \
  -H 'Harness-Account: <account_id>' \
  -H 'x-api-key: <your_api_key>' \
  -d '{
    "identifier": "customer_db_instance",
    "name": "Customer DB Instance",
    "connector": "pg",
    "branch": "main",
    "context": "dev",
    "substituteProperties": { "DB_NAME": "my_db_schema" },
    "tags": { "env": "dev" }
  }'
```

When you run the above command, you'll get the following response:
```json
{
  "branch": "main",
  "connector": "pg",
  "context": "dev",
  "created": 1761122195,
  "identifier": "customer_db_instance",
  "lastDeployedChangeSetTag": "",
  "name": "Customer DB Instance",
  "schemaId": "47e6efdf-ff43-4c79-b319-d761b1c0b91d",
  "schemaIdentifier": "my_db_schema1",
  "substituteProperties": {
    "DB_NAME": "my_db_schema1"
  },
  "tags": {
    "env": "dev"
  },
  "toOnboard": true,
  "updated": 1761122195
}
```

## Things to Note
- **Schema first**: The changelog is mandatory for Repository-type schemas.
- **Instance second**: Instances reference an existing schema.
- **Branch**: Both schema and instance must point to the correct Git branch.
- **Connector**: Must match the DB type (Postgres, MySQL, etc.).
</TabItem>
</Tabs>