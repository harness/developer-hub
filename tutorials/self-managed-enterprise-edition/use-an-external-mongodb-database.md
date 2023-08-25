---
title: Use an external cloud-based MongoDB with your installation
description: Learn how to use an external cloud-based MongoDB with Self-Managed Enterprise Edition installations.
sidebar_label: External cloud-based MongoDB
# sidebar_position: 2
---

Self-Managed Enterprise Edition requires you to install a database by default. You can optionally use an external database with your Self-Managed Enterprise Edition installation. This enables you to separate your data from node execution. To use an external MongoDB with your Harness Self-Managed Enterprise Edition installation, you must ensure that your hardware, software, and network meet the minimum requirements for installation and configuration. This tutorial describes how to configure an external cloud-based MongoDB for your installation.

## Hardware requirements

Harness recommends a MongoDB three member replica set configuration with the following minimum hardware:

- Three nodes
- Four CPU (3*4 = 12 CPU)
- 16GB RAM (3*16 = 48GB RAM)
- 100GB SSD data storage, depending on your requirements

## Software requirements

External database setup requires the following software:

- Supported OS (MongoDB supports most platforms, including Linux/MacOS/Windows)

    For details, go to [MongoDB Enterprise version support](https://www.mongodb.com/docs/v4.4/administration/install-enterprise/) and [MongoDB Community version support](https://www.mongodb.com/docs/v4.4/administration/install-community/) in the MongoDB documentation.

- MongoDB supported versions 4.4.0 to 4.4.19

## Network requirements

External database setup includes the following network requirements:

- Your port must be open for bidirectional replication.

  :::info note
  MongoDB uses default port 27017 to communicate between Harness Self-Managed Enterprise Edition and the database. MongoDB supports a wide range of ports, and you can use any supported MongoDB port range.
  :::

- Your Kubernetes cluster and MongoDB backend must be on the same subnet.

- You must have a reliable network connection between your MongoDB replica sets if your implementation is across multiple data centers.

## Monitoring tools

For MongoDB Enterprise Edition versions, Harness recommends Ops Manager for replica set management. Ops Manager is a MongoDB database management tool to monitor alerts, backup, and replica set management.

For MongoDB Community Editions versions, Harness recommends the following third-party monitoring tools: 

- Datadog/App Dynamics (alerts)
- Percona (MongoDB management tool)
- Mongodump/Mongorestore (backups)
- Rubrik (cloud backups)
- Custom tools

## Required Helm configuration updates

For external MongoDB support, update the following fields in your Helm `values.yaml` configuration files:

### Global configuration

```yaml
global:
# -- provide overrides to use in-cluster database or configure to use external databases
  database:
    # -- settings to deploy mongo in-cluster or configure to use external mongo source
    mongo:
      # -- set false to configure external mongo and generate mongo uri protocol://hosts?extraArgs
      installed: true
      # -- set the protocol for mongo uri
      protocol: mongodb
      # --   set the mongo hosts if mongo.installed is set to false
      hosts: []
      # -- provide the secret name to reference mongo username and password
      secretName: ""
      # -- provide the userKey to reference mongo username
      userKey: ""
      # -- provide the passwordKey to reference mongo password
      passwordKey: ""
      # -- set additional arguments to mongo uri
      extraArgs: ""
```

### Platform configuration

```yaml
platform:
  # -- Access control settings (taints, tolerations, and so on)
  access-control:
    # -- set mongoHosts for external database hosts
    # -- mongoHosts:
    # -- - replica1.host.com:27017
    # -- - replica2.host.com:27017
    # -- - replica3.host.com:27017
    mongoHosts: []
    # -- enable mongoSSL for external database connections
    mongoSSL:
      enabled: false
```

## FAQs

### How do I resolve an out of sync issue?

MongoDB automatically resolves out of sync issues, but manual intervention may be required for a full sync. For details, go to [Resync a member of a replica set](https://www.mongodb.com/docs/v4.4/tutorial/resync-replica-set-member/) in the MongoDB documentation.

### Does MongoDB support non-blocking secondary reads?

Yes, MongoDB 4.0+ supports non-blocking secondary reads for analytic reports.

### Do I need to manually create the MongoDB collection?

No, Harness Self-Managed Enterprise Edition automatically creates any missing collection/indexes during each deployment.

### What are the data retention limits?

By default, Harness Self-Managed Enterprise Edition stores data for six months. Contact [Harness Support](mailto:support@harness.io) if you require longer data retention.
