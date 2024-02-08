---
title: License issues
description: Troubleshoot license issues in the on-prem Harness Self-Managed Enterprise Edition.
sidebar_position: 70
---

License issues can happen even after you have applied the license via a Helm values file. Use the following processes to identify and troubleshoot license issues.

## Check for a NextGen license

Use the following steps to confirm that your Harness installation includes a NextGen license:

1. Use the `kubectl get secret` command to retrieve your MongoDB password:

   ```
   kubectl get secret -n <namespace> mongodb-replicaset-chart -o jsonpath={.data.mongodb-root-password} | base64 --decode | awk '{print $1}'
   ```

2. Use `kubectl exec` to open an interactive shell session in the MongoDB container:

   ```
   kubectl exec -it mongodb-replicaset-chart-0 -n <namespace> -- /bin/sh
   ```
3. Connect to the MongoDB instance:

   ```
   mongo
   ```

4. Use the following commands to authenticate to the database in the `admin` role: 

   ```
   use admin
   db.auth(`admin`, <password>)
   ```
   
5. Set the context to Harness NextGen and run the `find` operation to locate the license for Harness NextGen:
   
   ```
   use ng-harness
   db.moduleLicenses.find({})
   ```
   
6. If the licenses are present in the database, then proceed with `Refresh a NextGen license`.

## Refresh a NextGen license

Use the following strategies to refresh a NextGen license.

### Discard the redis cache for the NextGen license

Use the following commands to discard the `redis` cache for the NG license.

1. Retrieve the `redis` master host:

   ```
   kubectl exec -it redis-sentinel-harness-server-0 -n <namespace> -- redis-cli info | grep master_host | cut -c 13-
   ```

2. Find the `redis` master service:

   ```
   kubectl get svc -n <namespace> | grep <IP-From-Previous-Command>
   ```
   
   Copy the service name.
   
3. Delete the license keys:

   ```
   kubectl exec -it <Service-From-Previous-Step> -n <namespace> -- redis-cli del "hCache/NGLicense" "jcache_timeout_set:{hCache/NGLicense}"
   ```

4. Reload the UI.

If this does not refresh the license:

   - Repeat the process a second time.
   - Wait 5 minutes before you reload the UI.

If the license does not refresh, use the following process to temporarily disable caching in `ng-manager`.

### Disable NG cache

If discarding the `redis` cache does not refresh the NextGen license, use the following process to temporarily disable caching in `ng-manager`.

1. Use the `kubectl edit configmap` command to open the `ng-manager` **ConfigMap** for editing. Replace the `<namespace>` placeholder with your Harness installation namespace.

   ```
   kubectl edit configmap ng-manager -n <namespace>
   ```

2. Change the value of `CACHE_BACKEND` to `NOOP`.

3. Restart your `ng-manager` pods:

   ```
   kubectl rollout restart deploy ng-manager -n <namespace>
   ```
