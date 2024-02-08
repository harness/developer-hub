---
title: Check MongoDB health 
description: Learn how to check for MongoDB health before using Helm to install the on-prem Harness Self-Managed Enterprise Edition.
sidebar_position: 50
---

Use these instructions to check the health of MongoDB before using Helm to install Harness Self-Managed Enterprise Edition.

In the following command sequence, replace `harness-smp1` with your namespace. 

```
ns=<namespace>
MONGODB_USERNAME=admin;
MONGODB_PASSWORD=$(echo `kubectl -n $ns get secret mongodb-replicaset-chart -o yaml |grep mongodb-root-password |cut -d : -f2 | head -1 |base64 -d`)
MONGO_URI="mongodb://$MONGODB_USERNAME:$MONGODB_PASSWORD@mongodb-replicaset-chart-0.mongodb-replicaset-chart.$ns.svc,mongodb-replicaset-chart-1.mongodb-replicaset-chart.$ns.svc,mongodb-replicaset-chart-2.mongodb-replicaset-chart.$ns.svc:27017/harness?replicaSet=rs0&authSource=admin"
kubectl exec -it mongodb-replicaset-chart-0 -n $ns -- mongo "$MONGO_URI" --quiet --eval "db.printSecondaryReplicationInfo()"
```

The expected response is as follows:

```
source: mongodb-replicaset-chart-1.mongodb-replicaset-chart.harness-smp1.svc.cluster.local:27017
	syncedTo: Fri Jan 13 2023 13:16:48 GMT+0000 (UTC)
	2 secs (0 hrs) behind the primary 
source: mongodb-replicaset-chart-2.mongodb-replicaset-chart.harness-smp1.svc.cluster.local:27017
	syncedTo: Fri Jan 13 2023 13:16:49 GMT+0000 (UTC)
	1 secs (0 hrs) behind the primary 
```

In this example, the first source is two seconds behind the primary; the second source is one second behind the primary. If the `syncedTo` value is excessive, consider troubleshooting your installation of MongoDB.

