---
title: Use an external PostgreSQL database with your installation
description: Learn how to use an external PostgreSQL database with Self-Managed Enterprise Edition installations.
sidebar_label: Use an external PostgreSQL database
# sidebar_position: 37
---

Self-Managed Enterprise Edition requires you to install a database by default. You can optionally use an external database server with your Self-Managed Enterprise Edition installation. This enables you to separate your data from node execution. To use an external PostgreSQL database with your Harness Self-Managed Enterprise Edition installation, you must ensure that your hardware, software, and network meet the minimum requirements for installation and configuration. This topic describes how to configure an external PostgreSQL server for your installation and lists the software, hardware, and network requirements.

## Benefits of a PostgreSQL external database

Below are some of the benefits of using a PostgreSQL external database:

- High availability
- Disaster recovery
- No maintenance downtime
- Secondary read support (read scaling)

## Hardware requirements

Harness recommends a PostgreSQL three-member replica set configuration with the following minimum hardware:

- Three nodes
- Four CPU (3*4 = 12 CPU)
- 24GB RAM (3*16 = 48GB RAM)
- 300GB SSD data storage, depending on your requirements

## Software requirements

External database setup requires the following software:

- Supported OS (Postgres supports most platforms, including Linux, MacOS, Windows, FreeBSD, OpenBSD, NetBSD, AIX, HP/UX, and Solaris)

    For details, go to [PostgreSQL supported platforms](https://www.postgresql.org/docs/current/supported-platforms.html) in the PostgreSQL documentation.

- PostgreSQL supported version 14

## Network requirements

PostgreSQL uses 5432 as the default communication port. To enable communication between Harness services running in a Self-Managed Enterprise Edition cluster and a self-managed PostgreSQL cluster, add the port to the NAT firewall settings allow list. For vendor-managed PostgreSQL service, add the PostgreSQL cluster to VPC peering.

## Self-managed PostgreSQL

Several third-party tools are available for self-managed PostgreSQL configurations.

[Bitnami PostgreSQL-ha](https://github.com/bitnami/charts/tree/main/bitnami/postgresql-ha/) is an actively-managed chart that is widely used for self-managed PostgreSQL.

This stack consists of:

- `bitnami/postgresql`: The PostgreSQL database.

- `bitnami/postgresql-repmgr`: An open-source tool suite to manage replication and failover in a cluster of PostgreSQL servers. This tool enhances PostgreSQL's built-in hot-standby capabilities and includes tools to set up standby servers, monitor replication, and perform administrative tasks, such as failover or manual switchover operations.

- `Pgpool-II`: Pgpool-II is middleware that works between PostgreSQL servers and a PostgreSQL database client. It provides Connection Pooling, Watchdog, Replication, In Memory Query Cache, and Load Balancing. For more information, go to the [Pgpool-II documentation](https://pgpool.net/mediawiki/index.php/Main_Page).

## Vendor-managed PostgreSQL

Many cloud providers include options to manage PostgreSQL services, including Amazon RDS for PostgreSQL, Google Cloud SQL for PostgreSQL, and Azure Database for PostgreSQL. These managed PostgreSQL services handle tasks such as backup, replication, automatic failover, and version upgrades. 

Let's look at an example that shows how to create Google CloudSQL for PostgreSQL for Harness Self-Managed Enterprise Edition.

1. Sign in to your Google console.

2. Select the project for which you want to create your CloudSQL database.

3. Search for cloudsql, and then select the **SQL Managed MySQL, PostgreSQL, SQL Server** option. 

4. Select **Create Instance**.

5. Select **Choose PostgreSQL**.

6. Enter the following in **Create a PostgreSQL instance**:

   - **Instance ID** and **Password**. 

   :::info note
   Save your instance ID and password. You will use these credentials as a secret when you deploy your Self-Managed Enterprise Edition cluster.
   :::

   - In the **Database version** list, select PostgreSQL 14.

   - In the configuration options, select **Production** to enable HA and disaster recovery for PostgreSQL.

7. Select the **Region** where you want to deploy your PostgreSQL instance. You can also configure HA by selecting a different zone for secondary replicas.

8. Select a **Machine type** based on your utilization. Select at least 4vCPU and 26GB of RAM.  

9. Select a **Storage type**. Harness recommends SSD for better performance.

10. Select your **Storage capacity**. Harness recommends a minimum capacity of 100 GB.

11. Select **Enable automatic storage increases**.

12. Select **Private IP** to ensure your CloudSQL instance is paired with your Self-Managed Enterprise Edition cluster using a private pairing.

13. Select the NAT of your Self-Managed Enterprise Edition cluster. This creates a VPC with your cluster and allows Harness services running inside the cluster to access CloudSQL.

14. Select **Create Instance**.

    GCP creates and initializes your CloudSQL instance.

## Configure Helm charts

Follow the steps below to set up a Harness Self-Managed Enterprise Edition cluster with an external PostgreSQL database.

1. Run the following command using the PostgreSQL database name and password for your PostgreSQL to encode the credentials.

   ```zsh, bash
   echo -n 'YOUR_POSTGRES-USERNAME' | base64
   echo -n 'YOUR_POSTGRES_PASSWORD' | base64
   ```
2. Create a `postgres-secret.yaml` file.

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: postgres-secret
   type: Opaque
   data:
     user: BASE64_ENCODED_USERNAME
     password: BASE64_ENCODED_PASSWORD
   ```

3. Run the following command to create a `postgres-secret` in your Harness Self-Managed Enterprise Edition cluster.
   
   ```
   kubectl apply -f postgres-secret.yaml -n <namespace>
   ```

4. Update your `override-prod.yaml` file with the following fields.

   ```yaml
   global:
      database:
         postgres:
         ## - Set this to false to use an external postgres cluster
         installed: false
         ## - set the protocol for postgres
         protocol: postgres
         ## - host array for external
   hosts:
      - postgres:5432
        ## - provide the secret name to reference postgres username and password
        secretName: "postgres-secret"
        ## - provide the userKey within secret containing username
        userKey: "user"
        ## - provide the passwordKey to reference postgres password
        passwordKey: "password"
        ## - set additional arguments to connection string
        extraArgs: ""
   ```

5. Run Helm install.

   ```
    helm install <release-name> harness/harness-prod -n <namespace> -f override-prod.yaml
   ```

## Backup and restore

Most cloud providers support data backup and restore strategies. For vendor-managed PostgreSQL, refer to your vendor-specific documentation to backup and restore data. 

For self-managed PostgreSQL clusters, you can use PostgreSQL dump and restore.

```
pg_dump -h <source_host> -U <source_username> -d <source_database> > /data/dump.sql
```
```
psql -h <destination_host> -U <destination_username> -d <destination_database> < /data/dump.sql
```

You can also use storage backup or cluster backup with tools like Velero or similar third-party solutions for periodic cluster backup. Third-party solutions, including WAL-E, enable you to configure continuous PostgreSQL archiving.
