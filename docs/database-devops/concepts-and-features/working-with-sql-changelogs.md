---
title: Working with SQL Changelogs and Directory Structure
description: Learn how to effectively manage SQL file directories, structure complex changelogs, and implement best practices for database change management.
sidebar_position: 4
---

# Working with SQL Changelogs and Directory Structure

This guide explains how to effectively manage SQL file directories, structure complex changelogs, and implement best practices for database change management in Harness Database DevOps.

## SQL File Directory Organization

A well-organized SQL file directory structure is crucial for maintaining database changes. Here's a recommended structure:

```
db/
 ├── master.xml                  # Main changelog file
 ├── changelog.properties        # Properties file for database connections
 ├── changes/
 │   ├── release-1/
 │   │   ├── 001-create-users-table.sql
 │   │   ├── 002-add-email-column.sql
 │   │   └── 003-create-orders-table.sql
 │   └── release-2/
 │       ├── 001-add-payment-table.sql
 │       └── 002-alter-users-table.sql
 └──
```

## Onboarding to Changelog Management

## Structuring Complex Changelogs

The `includeAll` directive allows you to automatically include all SQL files from a directory. This is particularly useful for managing large projects with multiple changes.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
    xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.9.xsd">

    <!-- Include all changes from the releases directory -->
    <includeAll path="releases-1/"/>
    
    <!-- Include all changes from the features directory -->
    <includeAll path="releases-2/"/>
    
    <!-- Include specific hotfixes -->
    <includeAll path="hotfixes/"/>
</databaseChangeLog>
```

### Benefits of Using includeAll

- Automatic discovery of new changelog files
- Simplified management of multiple changelog files
- Consistent ordering based on file names
- Reduced risk of manual inclusion errors


## Creating Your First Changelog

```xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                   http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-latest.xsd">

    <!-- Add your changesets here -->
    <changeSet id="20250307-initial" author="John Snow">
        <comment>Initial schema creation</comment>
        <sql>
            CREATE TABLE example (
                id INT PRIMARY KEY,
                name VARCHAR(255)
            );
        </sql>
    </changeSet>

</databaseChangeLog>

```

### Configuration
Create a `liquibase.properties` file in your project root:
```configuration
changeLogFile=db/master.xml
url=jdbc:postgresql://localhost:5432/mydb
username=dbuser
password=dbpassword
classpath=/path/to/changelog-file
```

### Running Database Updates
``` bash
# Update to the latest version
liquibase update

# Update to a specific tag
liquibase update --tag=release-1

# Update with a specific context
liquibase update --contexts=development

# changelog file specified by the --changelog-file parameter
liquibase update --changelog-file=example-changelog.xml
```

## Working with Existing Databases

The `generate-changelog` command is used to automatically generate a changelog file that represents the current state of your database schema. This is especially useful when you are starting with an existing database that already has tables and structures, and you want to create a version-controlled changelog to track further changes.

<!-- todo  generate changelog with reference of harness -->

```bash
liquibase generate-changelog \
    --url=jdbc:postgresql://localhost:5432/mydb \
    --username=admin \
    --password=secret \
    --changelog-file=generated-changelog.xml
```

### Configuration Options
- `--diffTypes`: Specify object types to include
- `--includeObjects`: Filter specific database objects
- `--excludeObjects`: Exclude specific database objects

```bash
   liquibase generate-changelog \
    --url=jdbc:postgresql://localhost/mydb \
    --username=admin \
    --diffTypes=tables,indexes \
    --includeObjects="public.*" \
    --excludeObjects="public.temp_*,public.log_tables"
   ```

## Changelog Synchronization

The `changelog-sync` command is used to mark all changes in the changelog as executed against the database without actually executing the changes. This is particularly useful when:

- Starting version control on an existing database
- Reconciling the changelog with the actual database state
- Resolving inconsistencies between the changelog and the database

### Basic Usage

```bash
# Sync the changelog with the database
liquibase changelog-sync

# Sync specific changesets
liquibase changelog-sync --changeset="id:author"

# Sync with specific contexts
liquibase changelog-sync --contexts="production"
```

### Common Scenarios

1. **New Database Implementation**
```bash
# First, generate the changelog from existing database
liquibase generate-changelog

# Then, mark all changes as executed
liquibase changelog-sync
```

2. **Selective Synchronization**
```bash
# Sync up to a specific tag
liquibase changelog-sync --tag=version_1.0

# Sync specific contexts only
liquibase changelog-sync --contexts="schema,data"
```


## Changelog Validation

Use the validate command to detect if there are any issues with a changelog before running the update command. Validation helps you avoid a partial update, where only some changesets are applied due to an error in your changelog file.

```bash
# Validate the changelog
liquibase --changeLogFile=db/changelog/master.xml validate  

# Validate the changelog with a specific URL
liquibase --changeLogFile=db/changelog/master.xml --url=jdbc:postgresql://localhost:5432/mydb --username=user --password=pass validate

# Validate the changelog using a properties file
liquibase --defaultsFile=liquibase.properties validate
```

### Error Output
``` text
Validation Failed:
     1 changes have validation failures
          changelog-file.xml::1::author: Changeset references non-existent column 'missing_column'
```


### Use the validate command to ensure
   - The XML, YAML, JSON, or formatted SQL is structured correctly
   - Referenced files can be found
   - Any attributes you specify in your changelog match the XSD
   - There are no duplicated id, author, and file combinations
   - There are no checksum errors


### Steps
- **Run the Command**: To generate the Changelog
- **Sync Changelog**: To synchronize the changes in the changelog with the database
- **Review the ouput**: The output will be a changelog file in XML, YAML, or JSON format.
- **Modify the Changelog**: Edit the Changelog as needed.


### Version Control Integration
   - Commit changes to version control
   - Create pull/merge request
   - Review and approve changes
   - Merge to main branch




