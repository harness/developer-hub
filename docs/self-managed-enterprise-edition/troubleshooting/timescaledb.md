---
title: Timescaledb Failure
description: Learn how to debug and fix timescaledb errors
sidebar_position: 50
---

# How to Disable ReadinessProbe in TimescaleDB Helm Chart

## Overview

This document explains how to disable the readinessProbe in the TimescaleDB Helm chart. The readinessProbe is used by Kubernetes to determine when a pod is ready to serve traffic, but there might be scenarios where you need to disable it.

## Default Configuration

By default, the TimescaleDB chart has readinessProbe enabled with the following configuration in `values.yaml`:

```yaml
readinessProbe:
  enabled: true
  initialDelaySeconds: 5
  periodSeconds: 30
  timeoutSeconds: 5
  failureThreshold: 6
  successThreshold: 1
```

When enabled, this probe runs the `pg_isready` command to check if the PostgreSQL database is ready to accept connections.

## How to Disable ReadinessProbe

1. Update your override file with the following content:

   ```yaml
   platform:
    bootstrap:
      database:
        timescaledb:
          readinessProbe:
            enabled: false
   ```

## Understanding the StatefulSet Deadlock Scenario

A common issue with TimescaleDB in a StatefulSet configuration is a potential deadlock scenario during initialization. This scenario occurs as follows:

1. The TimescaleDB StatefulSet has `podManagementPolicy: OrderedReady` (default configuration).
2. With OrderedReady policy, Kubernetes creates pods sequentially, starting with pod-0 (timescaledb-0).
3. Pod-0 starts, but the readinessProbe fails because:
   - It's trying to establish itself as the master, but cannot complete initialization
   - Or, it's expecting to find an existing master to connect to as a replica, but no master exists yet
4. Because pod-0 never passes its readinessProbe, Kubernetes blocks the creation of pod-1.
5. This creates a deadlock: pod-0 can't become ready without a master, but no other pods can start to potentially become the master.

### Why This Happens

This situation commonly occurs when:
- A cluster is being initialized for the first time
- A cluster is restarting after all pods were terminated
- The persistent volumes contain data that confuses the initial leader election process

### How Disabling ReadinessProbe Helps

Disabling the readinessProbe temporarily allows all pods to start, regardless of their actual readiness state. This gives the Patroni clustering system (which manages TimescaleDB high availability) the chance to perform proper leader election among all available instances.

Once the cluster is established with a proper master-replica relationship, you can re-enable the readinessProbe for normal operation.

### Alternative Solution

1. **Using Parallel Pod Management**: Change the `podManagementPolicy` to `Parallel` to allow all pods to start simultaneously:

   ```yaml
   podManagementPolicy: Parallel
   ```
