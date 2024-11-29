---
title: Set up Autoscaling
description: Learn how to set up autoscaling for Harness Self-Managed Enterprise Edition installations.
sidebar_position: 3
sidebar_label: Set Up Autoscaling
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can set up autoscaling for harness workloads using [HorizontalPodAutoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/). 
Harness helm chart supports configuring HPA for either all services at once or for selective services.

## Configure autoscaling for all services

You can configure autoscaling for all services using the global override of helm chart.

```
global:
  autoscaling:
    enabled: true      # Enables autoscaling for all services
    minReplicas: 1     # Set minimum replicas for all services
    maxReplicas: 5     # Set maximum replicas for all services
    targetCPU: 80      # Set target CPU for all services
    targetMemory: 80   # Set target Memory for all services
```

## Configure autoscaling for selective services

To configure autoscaling for selective services, you need to set `global.autoscaling.enabled` to `false` so that you can enable autoscaling for the services 
of your choice.

```
global:
  autoscaling:
    enabled: false     # Disables autoscaling for all services

platform:
  ng-manager:
    autoscaling:
      enabled: true
      minReplicas: 1     
      maxReplicas: 5     
      targetCPU: 80      
      targetMemory: 80  
```

Similar to above, you can configure the values of individual services.

## Configure autoscaling spec for selective services

If you want to change the autoscaling spec such as `minReplicas` for selective services, you can configure it like below.

```
global:
  autoscaling:
    enabled: false     # Disables autoscaling for all services
    minReplicas: 1     # Set minimum replicas for all services
    maxReplicas: 5     # Set maximum replicas for all services
    targetCPU: 80      # Set target CPU for all services
    targetMemory: 80   # Set target Memory for all services

platform:
  ng-manager:
    autoscaling:
      minReplicas: 3   # Takes precedence over global minReplicas     
```

The same applies for other spec fields `maxReplicas`, `targetCPU` and `targetMemory`.

## Configure autoscaling behaviour of selective services

You can set autoscaling behaviour of services through their individual overrides. For eg., to set the scaleDown policy of ng-manager, you can configure it like below.

```
platform:
  ng-manager:
    autoscaling:
      behavior:
        scaleDown:
          policies:
          - type: Pods
            value: 4
            periodSeconds: 60
          - type: Percent
            value: 10
            periodSeconds: 60    
```

To learn more about the HPA behavior, you can refer to its [Official Documentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#configurable-scaling-behavior)
