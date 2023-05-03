---
title: Use an external database
description: Learn how to use an external database with Self-Managed Enterprise Edition installations. 
# sidebar_position: 10
---

To use MongoDB with Harness Self-Managed Enterprise Edition, you must ensure that your hardware, software, and network meet the minimum requirements for installation and configuration. This topic details the software, hardware, and network requirements to use an external database.

## Benefits of the MongoDB replica set

Below are some of the benefits of the MongoDB replica set:

- High availability
- Disaster recovery
- No maintenance downtime
- Secondary read support (read scaling)

## Hardware requirements

Harness recommends a MongoDB three member replica set configuration with the following minimum hardware:

- Three nodes
- Four CPU (3*4 = 12 CPU)
- 16GB RAM (3*16 = 48GB RAM)
- 100GB SSD data storage, depending on your requirements

## Software requirements

External database setup requires the following software:

- Supported OS (MongoDB supports most platforms, including Linux/MacOS/Windows)

    For details, go to the MongoDB documentation: [MongoDB Enterprise version support](https://www.mongodb.com/docs/v4.4/administration/install-enterprise/) and [MongoDB Community version support](https://www.mongodb.com/docs/v4.4/administration/install-community/).

- MongoDB supported versions 4.4.0 to 4.4.18

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

## SSL/TLS security communication

MongoDB supports SSL/TLS secure client/server communication. KOTS supports SSL/TLS communication between Harness Self-Managed Enterprise Edition and MongoDB. 

## FAQs

### How do I resolve an out of sync issue?

MongoDB automatically resolves out of sync issues, but manual intervention may be required for a full sync. For details, go to the MongoDB documentation: [Resync a member of a replica set](https://www.mongodb.com/docs/v4.4/tutorial/resync-replica-set-member/).

### Does MongoDB support non-blocking secondary reads?

Yes, MongoDB 4.0+ supports non-blocking secondary reads for analytic reports.

### Do I need to manually create the MongoDB collection?

No, Harness Self-Managed Enterprise Edition automatically creates any missing collection/indexes during each deployment.

### What are the data retention limits?

By default, Harness Self-Managed Enterprise Edition stores data for six months. Contact [Harness Support](mailto:support@harness.io) if you require longer data retention.
