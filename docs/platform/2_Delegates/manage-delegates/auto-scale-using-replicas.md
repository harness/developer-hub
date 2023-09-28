---
title: Autoscale using replicas
description: This topic describes how to autoscale the delegate using replicas for Helm chart deployments.
sidebar_position: 6
---

Autoscaling Harness Delegate using replicas for Helm chart deployments is a useful feature that can help ensure your deployments are executed efficiently, without downtime or resource overload.

To access the default Helm chart for the `values.yaml` file, go to [Harness Delegate Helm chart](https://github.com/harness/delegate-helm-chart/blob/main/harness-delegate-ng/values.yaml).

:::info note
You can also update the Harness Delegate YAML file in addition to the Helm chart.
:::

To auto scale the delegate, do the following:

1. In your `values.yaml` file, go to `autoscaling` parameters.

   ```yaml
   autoscaling:
     enabled: false
     minReplicas: 1
     maxReplicas: 10
     targetCPUUtilizationPercentage: 80
     # targetMemoryUtilizationPercentage: 80
   ```

2. Set `enabled` to `true`.

3. Specify the minimum and maximum number of replicas you want to use in the `minReplicas` and `maxReplicas` parameters.

4. To fine-tune your autoscaling, you can set the `targetCPUUtilizationPercentage` to add a new replica if CPU utilization exceeds this percentage.

5. (Optional) Set the `targetMemoryUtilizationPercentage` to add a new replica if memory utilization exceeds this percentage.

6. Save the file, and restart your pods.

When you create a deployment, Harness automatically spins up new replicas of your delegate as needed to ensure the deployment is completed.
