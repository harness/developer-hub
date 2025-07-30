---
title: Get Started with Changelogs
description: Learn how to define changelogs for SQL and MongoDB in Harness Database DevOps.
sidebar_position: 3
sidebar_label: Get Started with Changelogs
hide_table_of_contents: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Started with Changelogs

Harness Database DevOps supports changelogs in various formats to manage schema changes across environments. Below are examples of SQL and MongoDB changelogs to help you get started quickly.

## Example Changelogs

<Tabs>
<TabItem value="sql" label="SQL Changelog" default>

```yaml
databaseChangeLog:
  - changeSet:
      id: product-table-v2
      author: john-doe
      labels: products-api 
      comment: Creating product table for REST API
      changes:
        - createTable:
            tableName: product
            columns:
              - column:
                  name: id
                  type: SERIAL
                  constraints:
                    primaryKey: true
              - column:
                  name: name
                  type: VARCHAR(100)
                  constraints:
                    nullable: false
              - column:
                  name: price
                  type: NUMERIC(10,2)
                  defaultValue: 0.00
                  constraints:
                    nullable: false
      rollback:
        - dropTable:
            tableName: product
  - changeSet:
      id: product-table-indexes-v2
      author: john-doe
      labels: products-api
      comment: Adding indexes for the products table
      changes:
        - createIndex:
            tableName: product
            columns:
              - column:
                  name: name
            indexName: idx_products_name
      rollback:
        - dropIndex:
            indexName: idx_products_name
            tableName: product
  - changeSet:
      id: product-sample-data-initial
      author: john-doe
      labels: products-api-v2
      comment: Inserting initial sample data for non-production environments
      changes:
        - insert:
            tableName: product
            columns:
              - column:
                  name: name
                  value: "Wireless Bluetooth Headphones"
              - column:
                  name: price
                  value: 89.99
        - insert:
            tableName: product
            columns:
              - column:
                  name: name
                  value: "USB-C Charging Cable"
              - column:
                  name: price
                  value: 15.99
      rollback:
        - delete:
            tableName: product
            where: name in ('Wireless Bluetooth Headphones', 'USB-C Charging Cable')
  - changeSet:
      id: product-sample-data-accessories
      author: john-doe
      labels: products-api
      comment: Inserting accessories sample data for non-production environments
      changes:
        - insert:
            tableName: product
            columns:
              - column:
                  name: name
                  value: "Wireless Mouse Pad"
              - column:
                  name: price
                  value: 12.50
        - insert:
            tableName: product
            columns:
              - column:
                  name: name
                  value: "Ergonomic Laptop Stand"
              - column:
                  name: price
                  value: 65.99
      rollback:
        - delete:
            tableName: product
            where: name in ('Wireless Mouse Pad', 'Ergonomic Laptop Stand')
```

</TabItem>
<TabItem value="mongodb" label="MongoDB Changelog">

```yaml
databaseChangeLog:
  - changeSet:
      id: devteam:1
      author: john-doe
      comment: Create users collection
      changes:
        - createCollection:
            collectionName: users
            options: '{"validator": {"$jsonSchema": {"bsonType": "object", "required": ["name", "email"], "properties": {"name": {"bsonType": "string", "description": "User''s full name"}, "email": {"bsonType": "string", "description": "User''s email address"}, "status": {"bsonType": "string", "enum": ["active", "inactive", "pending"], "description": "Account status"}}}}, "validationAction": "warn", "validationLevel": "strict"}'
  - changeSet:
      id: devteam:2
      author: john-doe
      comment: Add unique index on email
      changes:
        - createIndex:
            collectionName: users
            keys: '{email: 1}'
            options: '{unique: true, name: "idx_email_unique"}'
  - changeSet:
      id: devteam:3
      author: john-doe
      ignore: false
      context: production
      comment: Add compound index for user queries
      changes:
        - createIndex:
            collectionName: users
            keys: '{status: 1, createdAt: -1}'
            options: '{name: "idx_status_created", background: true}'
  - changeSet:
      id: devteam:4-base
      author: john-doe
      ignore: false
      changes:
        - createCollection:
            collectionName: orders
  - changeSet:
      id: devteam:4-index
      author: john-doe
      ignore: false
      changes:
        - createIndex:
            collectionName: orders
            keys: '{"userId": 1, "status": 1, "orderDate": -1, "totalAmount": 1}'
            options: '{name: "orders_user_status_idx"}'
  - changeSet:
      id: devteam:5
      author: john-doe
      comment: Create products collection
      changes:
        - createCollection:
            collectionName: products
```
</TabItem>
</Tabs>
