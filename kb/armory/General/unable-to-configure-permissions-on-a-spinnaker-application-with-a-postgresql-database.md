---
title: Unable to configure permissions on a Spinnaker application with a PostgreSQL database
---

## Issue
With authentication and authorization enabled, when a user selects a role for a new or existing Spinnaker application, and presses the ```Create``` or ```Update``` button - an error similar to the following comes up on the form:
```jOOQ; bad SQL grammar [insert into applications (id, body, created_at, last_modified_at, last_modified_by, is_deleted) values (?, ?, ?, ?, ?, ?) on duplicate key update body =?, last_modified_at = ?, last_modified_by = ?, is_deleted = ? --executionId:  user: ; nested exception is org.postgressql/util.PSQLException: ERROR: syntax error at or near "duplicate" Position 132```
This prevents the user from configuring application permissions.

## Cause
Database ```dialect``` settings for either or all of the following services may not have been configured: Front50, Orca and Clouddriver. 
If not explicitly set, Spinnaker defaults to ***MySQL dialect*** syntax.

