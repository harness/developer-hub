---
title: Use self-managed AWS ElastiCache 
sidebar_label: External self-managed AWS ElastiCache
description: Learn how to use self-managed AWS ElastiCache.
sidebar_position: 40
---

Self-Managed Enterprise Edition requires you to install a database by default. You can optionally use an external database with your Self-Managed Enterprise Edition installation. This enables you to separate your data from node execution. To use an Amazon ElastiCache Redis database with your Harness Self-Managed Enterprise Edition installation, you must ensure that your hardware, software, and network meet the minimum requirements for installation and configuration.

This tutorial describes how to configure an Amazon ElastiCache Redis database for your installation.

## Hardware requirements​

Harness recommends `cache.m7g.8xlarge` or higher nodes to ensure the following minimum requirements:

- 8 cores per machine

- 8GB memory per machine

- 64GB disk per machine (SSD preferred)

- 1GB/s minimum network bandwidth

## Software requirements​

External database setup requires the following software:

- Supported Redis Version: 6.2

## Supported Redis Configuration

- Primary nodes: 1

- Replica nodes: 2 (Optional)

- Sharding: Disabled

- Cluster mode: Disabled

- In-transit Encryption: Disabled

- Authentication: Optional

## Prerequisites

You must have permissions to create an an ElastiCache instance, security groups, and subnet groups.

## Set up Amazon ElastiCache for Redis

To set up Amazon ElastiCache for Redis, do the following:

1. Complete the steps in the [Getting started with Amazon ElastiCache for Redis](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/GettingStarted.html) guide in the AWS documentation. 

:::info important
Make sure you disable the cluster mode.
:::

2. Create a security group to allow a connection from your Kubernetes cluster to an ElastiCache instance.

## Configure your Harness environment and Helm chart​

After you've set up ElastiCache, you're ready to configure your Harness environment.

To configure your Harness environment and Helm chart, do the following:

1. If you enabled authentication during setup, create a Kubernetes secret in the namespace where Harness Self-Managed Enterprise Edition is installed with the following data.

   ```yaml
   data:
     root-password: <AUTH_TOKEN>
     root-username: ""
   ```

2. Update the following entries in your `override.yaml` file and then upgrade Harness.

   ```yaml
   global:
     database:
       redis:
         installed: false
         hosts:
         - <ELASTICACHE_PRIMARY_ENDPOINT_AND_PORT>
         secretName: "REDIS_SECRET_NAME_CREATED_IN_FIRST_STEP" #leave empty if auth is disabled
         userKey: "root-username"
         passwordKey: "root-password"
   ```
