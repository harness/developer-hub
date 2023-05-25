---
title: Upgrade the Helm chart
description: Learn how to upgrade the Helm chart for Harness Self-Managed Enterprise Edition. 
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

4. Use the `helm upgrade` command to update the chart. 

   ```
   $ helm upgrade my-release harness/harness-demo -n <namespace> -f old_values.yaml
   ```
