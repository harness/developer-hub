---
title: License issues
description: Troubleshoot license issues in the on-prem Harness Self-Managed Enterprise Edition.
sidebar_position: 70
---

License issues can occur even after you apply the license via a Helm values file. Use the following processes to identify and troubleshoot license issues.

## Check for a NextGen license

Follow these steps to confirm that your Harness installation includes a NextGen license:

1. Retrieve the MongoDB password:
   ```sh
   kubectl get secret -n <namespace> mongodb-replicaset-chart -o jsonpath={.data.mongodb-root-password} | base64 --decode | awk '{print $1}'
   ```

2. Open an interactive Shell session in the MongoDB container:
   ```sh
   kubectl exec -it mongodb-replicaset-chart-0 -n <namespace> -- /bin/sh
   ```

3. Connect to the MongoDB instance:
   ```sh
   mongo
   ```

4. Authenticate to the database in the `admin` role:
   ```sh
   use admin
   db.auth('admin', <password>)
   ```

5. Set the context to Harness NextGen and locate the license:
   ```sh
   use ng-harness
   db.moduleLicenses.find({})
   ```

6. If the licenses are present, proceed with refreshing the license.

## Refresh a NextGen license

Use the following strategies to refresh a NextGen license.

### Discard the Redis cache for the NextGen license

1. Retrieve the Redis master host:
   ```sh
   kubectl exec -it redis-sentinel-harness-server-0 -n <namespace> -- redis-cli info | grep master_host | cut -c 13-
   ```

2. Find the Redis master service:
   ```sh
   kubectl get svc -n <namespace> | grep <IP-From-Previous-Command>
   ```
   Copy the service name from the result.

3. Delete license keys:
   ```sh
   kubectl exec -it <Pod-Name-From-Previous-Step> -n <namespace> -- redis-cli del "hCache/NGLicense" "jcache_timeout_set:{hCache/NGLicense}"
   ```

4. Reload the UI.

   If this does not refresh the license:
   - Repeat the process a second time.
   - Wait 5 minutes before you reload the UI.

## Additional troubleshooting for "Failed to Retrieve License Information"

### Step 1: Rule Out Browser Cache Issues
1. Try logging in through Incognito Mode or a different browser:
   - If this resolves the issue, proceed to clear the browser cache.
2. Hard refresh the page:
   - Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux) to perform a hard refresh.
3. Clear browser cache and cookies:
   - Go to your browser settings and clear the cache and cookies for the affected webpage.

### Step 2: Verify services status
Check all services:
   - Run the following command to ensure all services are running correctly:
     ```sh
     kubectl get pods -n <namespace>
     ```
   - If any services are in an unhealthy state, it might cause missing data in the database.

### Step 3: Delete license cache

You can delete the license keys:
   ```sh
   kubectl exec -it <Service-From-Previous-Step> -n <namespace> -- redis-cli del "hCache/NGLicense" "jcache_timeout_set:{hCache/NGLicense}"
   ```

### Step 4: Restart services
1. Restart `ng-manager`:
   ```sh
   kubectl rollout restart deploy ng-manager -n <namespace>
   ```

2. Restart `harness-manager`:
   ```sh
   kubectl rollout restart deploy harness-manager -n <namespace>
   ```

### Step 5: Reload the UI
- Try loading the UI again to check if the issue is resolved.

### Step 6: Contact Support
- If the issue persists, generate a support bundle and send it to [Harness Support](mailto:support@harness.io). For more information, go to [Support Bundle Utility](https://developer.harness.io/docs/self-managed-enterprise-edition/support-bundle-utility).
