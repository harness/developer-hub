---
title: Stuck Pipeline - Orca with MySQL Editing the Database
---

## Issue
After going through and attempting other [resolutions for stuck pipelines](https://kb.armory.io/s/article/Cancel-a-stuck-pipeline), the pipeline may still remain and still continue to exist. Therefore, it is then necessary to take a look at the SQL backend and touch the database to remove the stuck execution

## Cause
The execution is in such a state that executions from outside of Orca (e.g. the Swagger UI fix) cannot resolve the state of the pipeline. As a result, direct intervention on the MySQL Database backend for Orca is necessary.

