---
title: Aurora RDS Blue/Green Deployment in Spinnaker Services
---

## Introduction
Since AWS announced the deprecation of the RDS/Aurora MySQL engine version 5.7, we have been working on a solution to migrate to the MySQL 8.0 engine.
For most customers, Administrators can change the engine version and successfully upgrade with less than 15 minutes of downtime. However, the pre-upgrade snapshot process can take hours for large databases and result in a database restart with unpredictable downtime.
For customers with stricter availability requirements, Armory proposes an alternative blue/green deployment approach to minimize downtime. For more information about the blue/green deployment, see [aws-rds-blue-green-deployments](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/blue-green-deployments-creating.html).

## Prerequisites
### RDS Binlog replication
Binlog replication must be enabled on the RDS instance. This can be done by setting the ```binlog_format``` parameter to ```ROW``` in the RDS parameter group.
See [AWS Documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_LogAccess.MySQL.BinaryFormat.html) on making this change
**Notes**
* Enabling binary logging increases the number of write disk I/O operations to the DB cluster.* Reader and writer instances must be restarted for the changes to the parameter group to take effect. For more information, see [RebootCluster documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_RebootCluster.html#aurora-reboot-db-instance):*With the read availability feature, you **can reboot the writer instance** of your Aurora cluster **without rebooting the reader instances** in the cluster. Doing so can help maintain the high availability of the cluster for read operations while you reboot the writer instance. You can reboot the reader instances later, on a schedule that's convenient for you.*
### Backup/Snapshot
Administrators should rely on the AWS Snapshots to have the latest snapshot available. During the creation of the Blue/Green deployment, AWS will take another snapshot of the clusters.
 

## Instructions
### How it works

The blue/green deployment process can be divided into 4 steps:
#### Step 1 - Create BLUE/GREEN Deployment
* Create Amazon RDS blue/green deployment, which will create a staging environment that copies the production environment and is called the GREEN environment.* The GREEN environment stays in sync with the current BLUE environment using logical replication.* The names of the copied DB cluster and DB instances are appended with "-green-random-characters".* BLUE cluster ACTIVE on version 5.7 and the GREEN cluster ACTIVE on version 8.0.
Now we have 2 clusters:
* BLUE cluster: ```spinnaker``` with endpoint ```spinnaker.cluster```* GREEN cluster: ```spinnaker-green-123456789``` with endpoint ```spinnaker-green-123456789.cluster```
#### Step 2 - Switchover
* Once the GREEN environment is ready, we can start the switchover process.* Switchover From BLUE to GREEN (AWS will handle [these steps](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/blue-green-deployments-switching.html#blue-green-deployments-switching-actions) automatically).* During the switchover, Administrators can expect [less than 1 minute of downtime](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/blue-green-deployments-overview.html#blue-green-deployments-major-steps), according to AWS.
After the switchover process is completed, we have 2 clusters:
* BLUE cluster: ```spinnaker-old1``` with endpoint ```spinnaker-old1.cluster```* GREEN cluster: ```spinnaker``` with endpoint ```spinnaker.cluster```
AWS renames the endpoints in the GREEN environment to match the corresponding endpoints in the BLUE environment so that **application changes aren't required.**
If the switchover starts and stops before finishing for any reason, any changes are rolled back, and no changes are made to either environment.
#### Step 3 - Cleanup
Clean up the blue/green deployment.
* Destroy/delete the BLUE cluster.

