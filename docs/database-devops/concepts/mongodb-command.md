---
title: Liquibase MongoDB Basic Commands Reference
description: A quick reference for MongoDB changesets in Liquibase, including collection, index, document operations, and custom run commands with best practices.
keywords: ["liquibase mongodb", "mongodb migration", "mongodb changesets", "database migration", "nosql migrations", "mongodb index", "mongodb schema validation", "dbdevops"]
tags: ["liquibase", "mongodb", "nosql", "database migration", "dbdevops", "schema validation", "indexes", "collections"]
sidebar_label: MongoDB Commands Reference
sidebar_position: 10
---

This guide provides examples of commonly used Liquibase MongoDB changesets, including collection management, indexing, document operations, and custom run commands.  For end-to-end guidance, see [Generate MongoDB Changelog](../get-started/mongodb-changelog-generation.md) and [MongoDB Changelog Example](../get-started/get-started-with-changelogs.md).  


## Collection Operations
Manage MongoDB collections with changesets.  

### Create Collection
```yml
- changeSet:
    id: create-collection-1
    author: devteam@company.com
    changes:
      - createCollection:
          collectionName: users
```

### Drop Collection
```yml
- changeSet:
    id: drop-collection-1
    author: devteam@company.com
    changes:
      - dropCollection:
          collectionName: users
```

## Index Operations
Define and manage indexes for optimized query performance.

### Create Index
```yml
- changeSet:
    id: create-index-1
    author: devteam@company.com
    changes:
      - createIndex:
          collectionName: users
          keys: '{email: 1}'
          options: '{unique: true, name: "idx_email_unique"}'
```

### Drop Index
```yml
- changeSet:
    id: drop-index-1
    author: devteam@company.com
    changes:
      - dropIndex:
          collectionName: users
          keys: '{email: 1}'
```


## Document Operations
Insert or manage documents directly in MongoDB collections.

### Insert One Document
```yaml
- changeSet:
    id: insert-user-1
    author: devteam@company.com
    changes:
      - insertOne:
          collectionName: users
          document: >
            {
              "name": "John Doe",
              "email": "john@example.com",
              "age": 30
            }
```

### Insert Many Documents
```yaml
- changeSet:
    id: insert-users-bulk
    author: devteam@company.com
    changes:
      - insertMany:
          collectionName: users
          documents: >
            [
              {
                "name": "Jane Smith",
                "email": "jane@example.com",
                "age": 25
              },
              {
                "name": "Bob Johnson",
                "email": "bob@example.com",
                "age": 35
              }
            ]
```

## Generic Run Command
Execute raw MongoDB commands when no direct Liquibase abstraction exists.

### Basic Run Command
```yaml
- changeSet:
    id: run-command-1
    author: devteam@company.com
    changes:
      - runCommand:
          command: >
            {
              "createIndexes": "users",
              "indexes": [
                {
                  "key": {"name": 1},
                  "name": "idx_name"
                }
              ]
            }
```

### Run Command with Validation
```yaml
- changeSet:
    id: add-validation-schema
    author: devteam@company.com
    changes:
      - runCommand:
          command: >
            {
              "collMod": "users",
              "validator": {
                "$jsonSchema": {
                  "bsonType": "object",
                  "required": ["name", "email"],
                  "properties": {
                    "name": {"bsonType": "string"},
                    "email": {"bsonType": "string"}
                  }
                }
              }
            }
```

## Complete Example Changelog
A full example demonstrating collections, indexes, inserts, and schema validation.

```yaml
databaseChangeLog:
  - changeSet:
      id: devteam:1
      author: devteam@company.com
      comment: Create users collection
      changes:
        - createCollection:
            collectionName: users
      
  - changeSet:
      id: devteam:2
      author: devteam@company.com
      comment: Create indexes
      changes:
        - createIndex:
            collectionName: users
            keys: '{name: 1}'
            options: '{name: "idx_name"}'
        - createIndex:
            collectionName: users
            keys: '{email: 1}'
            options: '{unique: true, name: "idx_email_unique"}'

  - changeSet:
      id: devteam:3
      author: devteam@company.com
      comment: Insert initial data
      changes:
        - insertOne:
            collectionName: users
            document: >
              {
                "name": "John Doe",
                "age": 30,
                "email": "john@example.com"
              }

  - changeSet:
      id: devteam:4
      author: devteam@company.com
      comment: Add validation using runCommand
      changes:
        - runCommand:
            command: >
              {
                "collMod": "users",
                "validator": {
                  "$jsonSchema": {
                    "bsonType": "object",
                    "required": ["name", "email"],
                    "properties": {
                      "name": {"bsonType": "string"},
                      "email": {"bsonType": "string"}
                    }
                  }
                }
              }
```

## Best Practices & Usage Notes
1. **Rollback Considerations** - MongoDB operations like `insertOne` and `insertMany` are not automatically reversible. Always plan rollbacks explicitly e.g., by including a corresponding delete or drop changeset if needed.
2. **Index Naming Conventions** - Use clear, descriptive index names (`idx_email_unique`, `idx_name`) to avoid collisions and simplify debugging. MongoDB auto-generates index names if not provided, which can make schema management inconsistent across environments.
3. **Idempotency** - Liquibase tracks applied changesets by ID and author. Re-running the same changelog will not re-apply changes, which makes migrations safer across multiple environments. Ensure your changeset IDs remain unique and descriptive.
4. **Environment-Specific Data** - Avoid inserting environment-specific data (like test users or secrets) directly in production changelogs. Instead, use Liquibase contexts to conditionally run certain changesets.
5. **Use runCommand Wisely** - `runCommand` is powerful but bypasses Liquibase’s higher-level abstractions. It does not support automatic rollbacks (hence the RollbackImpossibleException).