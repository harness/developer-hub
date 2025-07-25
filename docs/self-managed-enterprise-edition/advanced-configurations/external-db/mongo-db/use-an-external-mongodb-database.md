---
title: Use an external cloud-based MongoDB with your installation
description: Learn how to use an external cloud-based MongoDB with Harness Self-Managed Enterprise Edition installations.
sidebar_label: External cloud-based MongoDB
sidebar_position: 1
redirect_from:
  - /tutorials/self-managed-enterprise-edition/use-an-external-mongodb-database
---

Harness Self-Managed Enterprise Edition requires you to install a database by default. You can optionally use an external database with your installation. This enables you to separate your data from node execution. To use an external MongoDB with your Harness Self-Managed Enterprise Edition installation, you must ensure that your hardware, software, and network meet the minimum requirements for installation and configuration. This tutorial describes how to configure an external cloud-based MongoDB for your installation.

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

## Setting Up Percona Server for MongoDB

This guide explains how to deploy Percona Server for MongoDB (PSMDB) on Kubernetes using Helm charts and validate its integration with an external MongoDB client or platform by securely sharing secrets and configuring Helm values.

### 1. Add & Update Percona Helm Repository

```bash
helm repo add percona https://percona.github.io/percona-helm-charts/
helm repo update
```

For chart details and configuration options, refer to the official [Percona Helm Charts documentation](https://percona.github.io/percona-helm-charts/), specifically the [`psmdb-operator`](https://github.com/percona/percona-helm-charts/blob/main/charts/ps-operator/README.md) and [`psmdb-db`](https://github.com/percona/percona-helm-charts/blob/main/charts/psmdb-db/README.md) charts.


### 2. Install the PSMDB Operator

```bash
helm install <OPERATOR-RELEASE-NAME> percona/psmdb-operator \   
--version 1.20.1 \   
--namespace <MONGO-NAMESPACE>
```

This should give you output similar to:

```bash
NAME: <OPERATOR-RELEASE-NAME>
LAST DEPLOYED: Thu Jul 24 15:44:48 2025
NAMESPACE: <MONGO-NAMESPACE>
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
1. Percona Operator for MongoDB is deployed.
  See if the operator Pod is running:

    kubectl get pods -l app.kubernetes.io/name=psmdb-operator --namespace <MONGO-NAMESPACE>

  Check the operator logs if the Pod is not starting:

    export POD=$(kubectl get pods -l app.kubernetes.io/name=psmdb-operator --namespace <MONGO-NAMESPACE> --output name)
    kubectl logs $POD --namespace=<MONGO-NAMESPACE>

2. Deploy the database cluster from psmdb-db chart:

    helm install <RELEASE-NAME> percona/psmdb-db --namespace=<MONGO-NAMESPACE>

Read more in our documentation: https://docs.percona.com/percona-operator-for-mongodb/
```

### 3. Deploy MongoDB Cluster

Deploy a development-ready PSMDB cluster using the following command. This setup disables backups and sharding for simplicity:

```bash
helm install <RELEASE-NAME> percona/psmdb-db \   
--namespace <MONGO-NAMESPACE> \   
--set runUid=1001 \   
--set "replsets.rs0.volumeSpec.pvc.resources.requests.storage=3Gi" \   
--set backup.enabled=false \   
--set sharding.enabled=false
```

:::note
Backups and sharding are disabled in this setup to simplify the deployment for development or testing environments, where data durability and scalability are not critical concerns.

For production environments, it is strongly recommended enabling both `backup.enabled=true` and `sharding.enabled=true` to ensure data protection and horizontal scaling.
:::

### 4. Retrieve MongoDB Admin Credentials and Connect to the Cluster

Use the admin credentials to verify that the MongoDB cluster is running correctly and can be accessed by external services.

Fetch the admin username and password from the Kubernetes secret:

```bash
ADMIN_USER=$(kubectl -n <MONGO-NAMESPACE> get secrets <RELEASE-NAME>-psmdb-db-secrets -o jsonpath="{.data.MONGODB_USER_ADMIN_USER}" | base64 --decode)
ADMIN_PASSWORD=$(kubectl -n <MONGO-NAMESPACE> get secrets <RELEASE-NAME>-psmdb-db-secrets -o jsonpath="{.data.MONGODB_USER_ADMIN_PASSWORD}" | base64 --decode)
```

Connect to the MongoDB cluster using the Percona client:

```bash
kubectl run -i --rm --tty percona-client --image=percona/percona-server-mongodb:7.0 --restart=Never \
-- mongosh "mongodb+srv://${ADMIN_USER}:${ADMIN_PASSWORD}@<RELEASE-NAME>-psmdb-db-rs0.<MONGO-NAMESPACE>.svc.cluster.local/admin?replicaSet=rs0&ssl=false"
```

### 5. Share MongoDB Credentials with SMP Namespace

If your Harness SMP platform is running in a different namespace (but within the same Kubernetes cluster), follow these steps to copy the MongoDB user credentials:

```bash
# Step 1: Get all secrets from the MongoDB namespace
kubectl get secret -n <MONGO-NAMESPACE>

# Step 2: View the specific MongoDB user secret in base64 format
kubectl get secret <MONGO-SECRET-NAME> -n <MONGO-NAMESPACE> -o yaml
```

Now, copy the MongoDB user secret to the SMP namespace:

```bash
kubectl get secret <MONGO-SECRET-NAME> -n <MONGO-NAMESPACE> -o yaml \
| sed 's/namespace: <MONGO-NAMESPACE>/namespace: <SMP-NAMESPACE>/' \
| kubectl apply -n <SMP-NAMESPACE> -f -
```

:::note
* This method works when both SMP and MongoDB are deployed in the same Kubernetes cluster.
* If SMP is deployed in a different cluster, you'll need to manually create the secret manifest and apply it in the SMP cluster.
:::

### 6. Update Helm Values for External MongoDB

To connect Harness SMP with your deployed Percona MongoDB cluster, update the `values.yaml` file with the external MongoDB configuration as shown below.

```bash
global:
  database:
    mongo:
      extraArgs: "replicaSet=rs0&authSource=admin"
      hosts:
        - "<RELEASE-NAME>-psmdb-db-rs0.<MONGODB-NAMESPACE>.svc.cluster.local:27017"
        - "<RELEASE-NAME>-psmdb-db-rs1.<MONGODB-NAMESPACE>.svc.cluster.local:27017"
        - "<RELEASE-NAME>-psmdb-db-rs2.<MONGODB-NAMESPACE>.svc.cluster.local:27017"
      installed: false
      protocol: mongodb
      secretName: "<MONGODB-SECRET-NAME>"
      userKey: "MONGODB_DATABASE_ADMIN_USER"
      passwordKey: "MONGODB_DATABASE_ADMIN_PASSWORD"

platform:
  access-control:
    mongoHosts:
      - "<RELEASE-NAME>-psmdb-db-rs0.<MONGODB-NAMESPACE>.svc.cluster.local:27017"
      - "<RELEASE-NAME>-psmdb-db-rs1.<MONGODB-NAMESPACE>.svc.cluster.local:27017"
      - "<RELEASE-NAME>-psmdb-db-rs2.<MONGODB-NAMESPACE>.svc.cluster.local:27017"
```

### 7. Apply Configuration and Upgrade SMP

Use the following command to apply your configuration and upgrade your SMP instance:

```bash
helm upgrade <SMP-RELEASE> <SMP-CHART-PATH> \
--namespace <SMP-NAMESPACE> \
-f override-small.yaml
```

## TLS support

TLS is supported for Harness Self-Managed Enterprise Edition 0.13.0 or later with MongoDB Atlas using the `mongodb+srv` protocol. No additional change is required in the `override.yaml` file to enable TLS for MongoDB Atlas.

## FAQs

### How do I resolve an out of sync issue?

MongoDB automatically resolves out of sync issues, but manual intervention may be required for a full sync. For details, go to [Resync a member of a replica set](https://www.mongodb.com/docs/v4.4/tutorial/resync-replica-set-member/) in the MongoDB documentation.

### Does MongoDB support non-blocking secondary reads?

Yes, MongoDB 4.0+ supports non-blocking secondary reads for analytic reports.

### Do I need to manually create the MongoDB collection?

No, Harness Self-Managed Enterprise Edition automatically creates any missing collection/indexes during each deployment.

### What are the data retention limits?

By default, Harness Self-Managed Enterprise Edition stores data for six months. Contact [Harness Support](mailto:support@harness.io) if you require longer data retention.
