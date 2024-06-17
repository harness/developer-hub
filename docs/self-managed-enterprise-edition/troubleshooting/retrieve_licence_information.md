---
title: Retrieve License Information
description: Learn how to troubleshoot when you get the "Failed to Retrieve License Information" error.
sidebar_position: 100
---

This topic provides solutions for troubleshooting the "Failed to Retrieve License Information" error.

### Step 1: Rule Out Browser Cache Issues
1. **Try Logging In Through Incognito Mode or a Different Browser:**
   - If this resolves the issue, proceed to clear the browser cache.
2. **Hard Refresh the Page:**
   - Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux) to perform a hard refresh.
3. **Clear Browser Cache and Cookies:**
   - Go to your browser settings and clear the cache and cookies for the affected webpage.

### Step 2: Verify Services Status
1. **Check All Services:**
   - Run the following command to ensure all services are running correctly:
     ```sh
     kubectl get pods -n <namespace>
     ```
   - If any services are in an unhealthy state, it may cause missing data in the database.

### Step 3: Delete License Cache
1. **Retrieve Redis Master Host:**
   - Execute the command to get the Redis master host:
     ```sh
     kubectl exec -it redis-sentinel-harness-server-0 -n <namespace> -- redis-cli info | grep master_host | cut -c 13-
     ```

2. **Identify Redis Master Service:**
   - Find the Redis master service using the IP from the previous command:
     ```sh
     kubectl get svc -n <namespace> | grep <IP-From-Previous-Command>
     ```
   - Copy the service name from the result.

3. **Delete License Keys:**
   - Execute the following command to delete the license keys:
     ```sh
     kubectl exec -it <Pod-Name-From-Previous-Step> -n <namespace> -- redis-cli del "hCache/NGLicense" "jcache_timeout_set:{hCache/NGLicense}"
     ```

### Step 4: Restart Services
1. **Restart `ng-manager`:**
   - Run the following command to restart `ng-manager`:
     ```sh
     kubectl rollout restart deploy ng-manager -n <namespace>
     ```

2. **Restart `harness-manager`:**
   - Run the following command to restart `harness-manager`:
     ```sh
     kubectl rollout restart deploy harness-manager -n <namespace>
     ```

### Step 5: Reload the UI
- Try loading the UI again to check if the issue is resolved.

### Step 6: Contact Support
- If the issue persists, generate a support bundle by following the instructions at [Support Bundle Utility](https://developer.harness.io/docs/self-managed-enterprise-edition/support-bundle-utility).
- Contact Harness Support with the generated support bundle for further assistance.