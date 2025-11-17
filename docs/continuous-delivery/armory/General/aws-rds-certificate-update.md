---
title: AWS RDS Certificate Update
---

## Introduction
Amazon announced that they are replacing their [SSL/TLS certificates for a variety of data services](https://aws.amazon.com/blogs/aws/urgent-important-rotate-your-amazon-rds-aurora-and-documentdb-certificates/).
This issue only impacts you if you have SSL/TLS enabled for Spinnaker’s connections to Aurora. Spinnaker services that can use Aurora are CloudDriver, Orca, and Front50. The update might require restarting your Aurora instance, which causes your Spinnaker deployment to be temporarily unavailable.During the downtime, any services that use Aurora will display errors. This is expected until the database is available again.
Aurora picks up the new certificate after a restart. You can update your certificates during planned downtime or immediately.

## Prerequisites
N/A

## Instructions
During Pre-Planned Set Maintenance Window (set within your RDS)
Run the following command via CLI:
```
aws rds modify-db-instance --db-instance-identifier database-1 \
--ca-certificate-identifier rds-ca-2019 
During the next maintenance window, the update occurs. 
Manually Triggering Update Immediately (SSL)
```

### You can update the certificates immediately, which will result in downtime.  Recommendation is to plan for an outage as a part of your maintenance.
Run the following command:
```
aws rds modify-db-instance --db-instance-identifier database-1 \
--ca-certificate-identifier rds-ca-2019 --apply-immediately
```

Manually Triggering Update Immediately (No SSL)
If you do not use SSL, you can update your certificates without restarting the database.
Run the following command:
```
aws rds modify-db-instance --db-instance-identifier database-1 \ 
--ca-certificate-identifier rds-ca-2019 --no-certificate-rotation-restart
```



