---
title: Use an external self-managed Redis database with your installation
description: Learn how to use an external self-managed Redis database with Self-Managed Enterprise Edition installations.
sidebar_label: External self-managed Redis
# sidebar_position: 37
---

Self-Managed Enterprise Edition requires you to install a database by default. You can optionally use an external database with your Self-Managed Enterprise Edition installation. This enables you to separate your data from node execution. To use an external self-managed Redis database with your Harness Self-Managed Enterprise Edition installation, you must ensure that your hardware, software, and network meet the minimum requirements for installation and configuration.

Redis offers an enterprise on-premise solution to deploy an HA solutions that functions like a single server. You can install Redis on your preferred choice of virtual machines and provide the endpoint in your Harness Helm charts. Harness recommends this solution to install Redis in HA mode.

This tutorial describes how to configure an external self-managed Redis database for your installation.

## Hardware requirements

Harness recommends a Redis configuration with the following minimum hardware:

- 3 VMs
- 8 cores per machine
- 8GB memory per machine
- 64GB disk per machine (SSD preferred)
- 1GB/s minimum network bandwidth

## Software requirements

External database setup requires the following software:

- Supported OS: Ubuntu 20.04 LTS

## Prerequisites

The following prerequisites are needed:

- A Redis Labs account. To sign up, go to the [Redis Cloud Console](https://app.redislabs.com/#/).

- Redis Enterprise. To download Redis for Ubuntu 20.04, go to [Redis enterprise](https://redis.com/redis-enterprise-software/download-center/software/).

- A public or internal domain name, for example `harness-redis-abc.com`.

## Firewall rules

External Redis requires firewall rule setup to add ports to your allowlist. 

To create a firewall rule, do the following:

1. Select the network you want to use for your Redis nodes, for example Default.

2. Go to the **Firewall** tab, and create a new rule using the below configurations.

   Protocol| Port| Description | 
   | ----------------------------------------------------------------- | ---------------------------- | ----------- |
   | ICMP| * | Redis gossip protocol|
   | UDP| 53, 5353 | Redis DNS|
   | TCP| 10000-20000 | Redis connectivity|
   | TCP| 8443 | Secure (HTTPS) access to the web management UI|

4. For testing purposes, keep the Source IP ranges set to 0.0.0.0/0.

## Install Redis

After you configure your firewall rules, you must install Redis. To install Redis, you must create three VMs, create DNS records, configure your Redis cluster, configure your Redis database, and test your connectivity.

### Create your VMs

To create your VMs, do the following:

1. Select the machine type based on the hardware requirements above.

2. Change the boot disk to Ubuntu 20.04 LTS.

3. Reserve internal and external static IP addresses for the VM.

4. SSH into the VM.

5. Run the following commands.

     ```shell
     wget <redis-download-url>
     ```
    
    ```shell
    tar xf <redis-file-name>
    ```

6. Disable port 53. For more information, go to [Ensure port availability](https://docs.redis.com/latest/rs/installing-upgrading/install/prepare-install/port-availability/#port-53) in the Redis documentation.

    Output:
    ```shell
    sudo: unable to resolve host <hostname>: Temporary failure in name resolution
    ```

7. Run the following command.

    ```shell
    sudo ./install.sh -y
    ```

8. Check the installation logs for errors.

9. Repeat the steps to configure your other two VMs.

### Create DNS records

To create DNS records, do the following:

1. Go to the DNS portal of your domain registrar.

2. Create three type A records with subdomains for the public domain name, for example, `node1.harness-redis-abc.com`, `node2.harness-redis-abc.com`, and `node3.harness-redis-abc.com`.

3. Add the internal IP and external IP for each VM in their respective A records.

4. Create one NS record with a different subdomain, for example `redis.harness-redis.com`.

5. Add the subdomains of all your nodes, for example `node1.harness-redis.com`, `node2.harness-redis.com`, and `node3.harness-redis.com`.

### Configure your Redis cluster

To configure your Redis cluster, do the following:

1. Open `https://<EXTERNAL_IP_OF_NODE1>:8443` in your browser, and then complete the following on the node setup page. 

   1. Enable Flash Storage.

   2. Select **+** next to the IP, add the external IP, and then select **Save**.

   3. Disable external traffic on the internal IP.

   4. Add the DNS record subdomain in the **FQDN** field used in the NS record, for example, `redis.harness-redis.com`.

   5. Create your admin credentials.

   6. Select **Create Cluster**.

   7. Select **Next**.

     :::info
     You can skip the cluster key for now if the page opens. (You can procure a license key from Redis Labs later, if required.)
     :::

3. Open `https://<EXTERNAL_IP_OF_NODE2>:8443` in your browser, and then complete the following on the node setup page. 

   1. Enable Flash Storage.

   2. Select **+** next to the IP, add the external IP, and then select **Save**.

   3. Disable external traffic on the internal IP.

   4. Select **Join cluster**.

   5. Add the internal IP of your first node.

   6. Enter your admin credentials.

   7. Select **Create**.

3. Open `https://<EXTERNAL_IP_OF_NODE3>:8443` in your browser, and then complete the following on the node setup page. 

   1. Enable Flash Storage.

   2. Select **+** next to the IP, add the external IP, and then select **Save**.

   3. Disable external traffic on the internal IP.

   4. Select **Join cluster**.

   5. Add the internal IP of your first node.

   6. Enter your admin credentials.

   7. Select **Create**.

### Configure your Redis database

To configure your Redis database, do the following:

1. Open `https://<YOUR_NODE1_EXTERNAL_IP>:8443` in your browser.

2. Select the **Databases** tab.

3. Select **Single region Redis database**.

4. Select runs on RAM.

5. Enable replication.

6. Set the database memory to 2GB.

7. Skip the database password. 

8. Select **Create**.

9. Copy the **Internal Endpoint** for later use.

### Test connectivity

You can test your connectivity using the Redis CLI.

To test your connectivity using, do the following:

1. Run the following command.

   ```shell
   redis-cli -h <YOUR_INTERNAL_ENDPOINT> -p <port>
   ```

2. Run the following.
  
   ```shell
   ping
   ```

  The expected response is `pong`.

3. Run the following.
   
   ```shell
   set foo bar
   ```

4. Run the following.

   ```shell
   get foo
   ```

   The expected response is `bar`.

## Configure your Harness environment and Helm chart

After you've tested your connectivity, you're ready to configure your Harness environment.

To configure your Harness environment and Helm chart, do the following:

- Add the following override entries to your newly-installed Harness Redis instance.

   ```yaml
   global:
     database:
       redis:
         installed: false
         hosts:
         - <YOUR_INTERNAL_ENDPOINT_AND_PORT>
         secretName: ""
         userKey: ""
         passwordKey: ""
   ```
