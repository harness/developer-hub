---
title: Upgrade the Helm chart
description: Learn how to upgrade the Helm chart for the on-prem Harness Self-Managed Enterprise Edition. 
sidebar_position: 6
---

Use the following instructions to upgrade the chart to a new release. 

1. Use the following command to obtain the release name for the earlier release. 

   ``` 
   $ helm ls -n <namespace>
   ```

2. Retrieve the values for the earlier release.

   ```
   $ helm get values my-release > old_values.yaml
   ```

3. Change the values of the `old\_values.yaml` file as required.

4. Use the `helm upgrade` command to update the chart for your `override-demo.yaml` file or `override-prod.yaml` file. 

   ```
   $ helm upgrade my-release harness/harness -n <namespace> -f override-demo.yaml -f old_values.yaml
   ```

   ```
   $ helm upgrade my-release harness/harness -n <namespace> -f override-prod.yaml -f old_values.yaml
   ```
