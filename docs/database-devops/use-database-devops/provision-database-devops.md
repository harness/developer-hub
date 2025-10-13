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