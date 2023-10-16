---
title: Helm upgrade failure
description: Troubleshoot a Helm upgrade failure in the on-prem Harness Self-Managed Enterprise Edition.
sidebar_position: 60
---

This topic provides solutions for upgrade problems related to Helm.

## MinIO password failure

Password failure happens when the current credentials are not used to authenticate. To avoid this problem, make sure you keep your old credentials after installation; they may be required to access data in persistent volume claims. You may encounter the following error.

:::info note
This error should not surface in charts 0.2.93 or newer.
:::

   ```
   UPGRADE FAILED: execution error at (harness-demo/charts/harness/charts/platform/charts/minio/templates/NOTES.txt:91:4): 
   PASSWORDS ERROR: You must provide your current passwords when upgrading the release.
                    Note that even after reinstallation, old credentials may be needed as they may be kept in persistent volume claims.
                    Further information can be obtained at https://docs.bitnami.com/general/how-to/troubleshoot-helm-chart-issues/#credential-errors-while-upgrading-chart-releases
   ```

### Solutions

#### Set the root password

Specify the `auth.rootPassword` value. This field must not be empty.

To set the root password, do the following:

1. Use the following command to get the current value:

   ```
   export ROOT_PASSWORD=$(kubectl get secret --namespace "harness-test" minio -o jsonpath="{.data.root-password}" | base64 -d)
   ```

2. Add the following instruction to the command. 

   ```
   --set auth.rootPassword=$ROOT_PASSWORD
   ```

   For example:

   ```
   helm upgrade <chartname> <chartsource> -n <namespace> -f override.yaml --set harness.platform.minio.auth.rootPassword=$ROOT_PASSWORD
   ```
   
#### Update the oldvalues.yaml file

If you've already set the `auth.rootPassword` value one time, you can update and remove the `oldvalues.yaml` file.

To update and remove the file, do the following:

1. Use the following command to retrieve the file:

   ```
   helm get values <chartname> -n <namespace> > oldvalues.yaml
   ```

2. Edit the `oldvalues.yaml` file to include the new values. The file should include the encrypted MinIO password.

3. Upgrade the file:

   ```
   helm upgrade <chartname> <chartsource> -n <namespace> -f oldvalues.yaml
   ```

4. Delete the `oldvalues.yaml` file.
