---
title: Unlock the DATABASECHANGELOGLOCK Table
---

## Introduction
There may be instances where the Spinnaker pods may be crashing and there are errors in the log showing something similar to:
```Error executing SQL UPDATE orca.DATABASECHANGELOGLOCK SET `LOCKED` = 1, LOCKEDBY = 'spin-orca-6755dcb97b-psszz (10.42.5.22)', LOCKGRANTED = '2020-10-16 15:34:11.084' WHERE ID = 1 AND `LOCKED` = 0: Lock wait timeout exceeded; try restarting transaction```
Or
```2020-04-22 15:47:14.200  INFO 1 --- [           main] liquibase.executor.jvm.JdbcExecutor      : SELECT `LOCKED` FROM clouddriver.DATABASECHANGELOGLOCK WHERE ID=1```
The lock can be caused because Liquibase reads from the [DATABASECHANGELOG table](https://docs.liquibase.com/concepts/basic/databasechangelog-table.html) to determine which changeset*s* need to run, If Liquibase does not exit cleanly, the lock row may be left as locked. The solution is to clear out the current lock.

## Prerequisites
Run the following command to confirm what the status of the table is in:
```select * from DATABASECHANGELOGLOCK;```
If the LOCKED field is set to 1, then the table is currently locked as Liquibase is running against this database.  You can also see what pod has caused the issue, but often, the pod has already been replaced.An example of the output would be:
+----+--------+---------------------+-------------------------------------------------+
| ID | LOCKED | LOCKGRANTED         | LOCKEDBY                                        |
+----+--------+---------------------+-------------------------------------------------+
|  1 |        | 2020-04-18 12:34:08 | spin-clouddriver-7xx7x09x97-x9xc2 (10.10.0.20) |
+----+--------+---------------------+-------------------------------------------------+


## Instructions
* Connect to the SQL serverRun the command:
```UPDATE DATABASECHANGELOGLOCK SET LOCKED=0, LOCKGRANTED=null, LOCKEDBY=null;​```
***** Make take some time for the table to unlock *** ** This can take a few minutesNote: Also the command ```liquibase releaseLocks``` will run ```UPDATE DATABASECHANGELOGLOCK SET LOCKED=0```
You can then run the select command again to confirm.
```select * from DATABASECHANGELOGLOCK;​```
Which should provide the following table:
+----+--------+-------------+----------+
| ID | LOCKED | LOCKGRANTED | LOCKEDBY |
+----+--------+-------------+----------+
|  1 |        | NULL        | NULL     |
+----+--------+-------------+----------+​


