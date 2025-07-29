---
title: Configure Percona Server for MongoDB
sidebar_label: Configure Percona Server for MongoDB
description: Step-by-step guide to configure Harness SMP to connect with an external Percona MongoDB instance. Includes instructions for retrieving credentials, sharing secrets, and updating Helm configuration.
keywords:
  - Harness SMP
  - MongoDB
  - Percona
  - External Database
  - Integration
sidebar_position: 5
---

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
--set "replsets.rs0.volumeSpec.pvc.resources.requests.storage=100Gi" \   
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
