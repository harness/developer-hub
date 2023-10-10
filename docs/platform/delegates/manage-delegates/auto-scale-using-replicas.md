---
title: Autoscale using replicas
description: This topic describes how to autoscale the delegate using replicas.
sidebar_position: 6
---

Autoscaling Harness Delegate using replicas is a useful feature that can help ensure your deployments are executed efficiently, without downtime or resource overload.

## Auto scale Harness Delegate using replicas for Helm chart deployments

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

   To fine-tune your autoscaling, you can set the `targetCPUUtilizationPercentage` to add a new replica if CPU utilization exceeds this percentage.

4. (Optional) Set the `targetMemoryUtilizationPercentage` to add a new replica if memory utilization exceeds this percentage.

5. Save the file, and restart your pods.

   When you create a deployment, Harness automatically spins up new replicas of your delegate as needed to ensure the deployment is completed.

## Auto scale Harness Delegate using replicas for Kubernetes

The HPA configuration setting is included in the default Kubernetes delegate YAML file. 

To auto scale the delegate, do the following:

1. In your `harness-delegate.yml` file, go to `autoscaling` parameters.

  ```yaml
   ---
   
   apiVersion: autoscaling/v1
   kind: HorizontalPodAutoscaler
   metadata:
      name: harness-delegate-hpa
      namespace: harness-delegate-ng
      labels:
          harness.io/name: harness-delegate
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: harness-delegate
     minReplicas: 1
     maxReplicas: 1
     targetCPUUtilizationPercentage: 99
   
   ---
   ```

2. Specify the minimum and maximum number of replicas you want to use in the `minReplicas` and `maxReplicas` parameters.

   To fine-tune your autoscaling, you can set the `targetCPUUtilizationPercentage` to add a new replica if CPU utilization exceeds this percentage.

3. (Optional) Set the `targetMemoryUtilizationPercentage` to add a new replica if memory utilization exceeds this percentage.

4. Save the file, and restart your pods.

   When you create a deployment, Harness automatically spins up new replicas of your delegate as needed to ensure the deployment is completed.
