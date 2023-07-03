---
title: Use an external database with your installation
description: Learn how to use an external Timescale database with Self-Managed Enterprise Edition installations. 
# sidebar_position: 37
---

Self-Managed Enterprise Edition requires you to install a database by default. You can optionally use an external database server with your Self-Managed Enterprise Edition installation. This enables you to separate your data from node execution. To use an external TimescaleDB server with your Harness Self-Managed Enterprise Edition installation, you must ensure that your hardware, software, and network meet the minimum requirements for installation and configuration. This topic describes how to configure an external TimescaleDB server for your installation.

## Set an external TimescaleDB service

To use TimescaleDB with your Self-Managed Enterprise Edition installation, you must set up an external TimescaleDB service.

To set up an external TimescaleDB service, do the following:

1. Create a [Timescale](https://portal.managed.timescale.com/login) account.

2. Set up virtual private cloud (VPC) peering with your cloud provider. 

3. In Timescale cloud, go to VPC in Timescale cloud, and create a new VPC connection. For more information, go to [Configure VPC peering](https://docs.timescale.com/mst/latest/vpc-peering/vpc-peering/) in the Timescale documentation.

   :::info note
   Ensure the IP CIDr range doesn't conflict with your cloud provider’s VPC range.
   :::

4. Go to your cloud provider, and initiate VPC peering by providing your project ID and VPC network.

5. In Timescale cloud, go to Services, and create a service in the same region. For more information, go to [Services](https://docs.timescale.com/mst/latest/about-mst/#services) in the Timescale documentation.

   :::info note
   You must select Timescale version 14 when you set up your service.
   :::

6. Set the IPv4 service range and cluster pod IPv4 range under **Allowed IP addresses** to allow traffic from your cluster to connect to TimescaleDB.

   :::info note
   TimescaleDB cloud only supports SSL. For more information, go to [Networking security](https://docs.timescale.com/use-timescale/latest/security/overview/#networking-security) in the Timescale documentation.

7. Create two databases, `harness` and `harnessti`.

## Configure Helm charts

1. Create two secrets, `tsdb-secret` with the username and password, and `tsdb-cert` with the certificate.

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: tsdb-cert
   type: Opaque
   data:
     cert: Base64_ENCODED_CERT
   ```

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: tsdb-secret
   type: Opaque
   data:
     username: USERNAME
     password: PASSWORD
   ```

2. In the Helm `override.yaml` file, edit the following.

   ```yaml
   global:
     database:
       timescaledb:
         installed: false
         # --  provide default values if mongo.installed is set to false
         hosts:
           - hostname.timescale-cloud.a.com:27597
         secretName: "TSDB_SECRET"
         userKey: "username"
         passwordKey: "password"
         certName: "TSDB_CERT"
         certKey: "cert"
    ```

   When you install or upgrade Helm, Self-Managed Enterprise Edition automatically connects to the external TimescaleDB service.
