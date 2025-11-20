---
title: Clouddriver agent names too long for the columns in Database
---

## Issue
Logs and names that are created and sent to the database are too long to fit inside the column in the database leading to truncated names and compiling errors. This causes CloudDriver-Caching log errors.

## Cause
This can be caused by adding resource names into logs, or any situation where an individual resource or artifact being logged is too long to fit in the columns of the databse. which can go over the column limitations in databases (RDS, MySQL, Redis)This issue currently relates to a known Spinnaker Issue and has a Github Issue raised. [https://github.com/spinnaker/spinnaker/issues/5600](https://github.com/spinnaker/spinnaker/issues/5600) 

