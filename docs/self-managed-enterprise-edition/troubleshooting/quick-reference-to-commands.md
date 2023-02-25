---
title: Quick command reference
description: Commands that come in useful for troubleshooting
---

This page provides a short list of commands that come in useful for troubleshooting Harness Self-Managed Platform Edition.

:::note
Variables are enclosed in angle brackets (< >).
:::

## Retrieve your MongoDB password

To print your MongoDB password to the command line, use `kubectl get secret`:

```
kubectl get secret -n <namespace> mongodb-replicaset-chart -o jsonpath={.data.mongodb-root-password} | base64 --decode | awk '{print $1}'
```

## Shell into MongoDB 

Use the `kubectl exec` command to start a shell session in the container that is running MongoDB. Modify the command for your MongoDB configuration:

   ```
   kubectl exec -it mongodb-replicaset-chart-0 -n <namespace> -- /bin/sh
   ```

- If the MongoDB replica is SECONDARY, try `mongodb-replicaset-chart-1` or `mongodb-replicaset-chart-2`. 

- If the MongoDB replica is PRIMARY, use `admin`:

  ```
  db.auth('admin', <password>)
  ```

## Shell into TimescaleDB

Use the following commands to access your installation of TimescaleDB:

:::note
Check the name of the TimescaleDB pod. 
:::

1. Use the `kubectl exec` command to open a shell session in the TimescaleDB pod:

   ```
   kubectl exec -it harness-timescale-0 -n <namespace> -- /bin/sh 
   ```

2. Connect using the default user role:

   ```
   psql -U postgres
   ```

3. Enter your password and return.

## Shell into postgres

Use the `kubectl exec` command to open a shell session in your postgres pod:

```
kubectl exec --stdin --tty postgres-0 -n <namespace> -- /opt/bitnami/scripts/postgresql/entrypoint.sh /bin/bash
```
