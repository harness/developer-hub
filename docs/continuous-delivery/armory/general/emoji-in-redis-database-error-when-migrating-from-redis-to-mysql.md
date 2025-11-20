---
title: Emoji in REDIS Database error when Migrating from REDIS to MySQL
---

## Issue
Error returned when migrating from REDIS to MySQL:
org.springframework.jdbc.UncategorizedSQLException: jOOQ; uncategorized SQLException for SQL [insert into pipeline_stages (id, legacy_id, execution_id, status, updated_at, body) values (?, ?, ?, ?, ?, ?) on duplicate key update status = ?, updated_at = ?, body = ? -- agentClass: PipelineMigrationAgent]; SQL state [HY000]; error code [1366];
Incorrect string value: '\x\x\x\x...'

As an example, the incorrect string value will be an emoji icon, e.g. ```\xF0\x9F\x94\x90mT...```  which is a lock emoji

## Cause
Spinnaker doesn't parse the information properly, because it wasn't declared what kind of encoding it should process the data with

