---
title: Use an external Redis database with your installation
description: Learn how to use an external Redis database with Self-Managed Enterprise Edition installations.
sidebar_label: Use an external Redis database
# sidebar_position: 37
---

Self-Managed Enterprise Edition requires you to install a database by default. You can optionally use an external database server with your Self-Managed Enterprise Edition installation. This enables you to separate your data from node execution. To use an external Redis database with your Harness Self-Managed Enterprise Edition installation, you must ensure that your hardware, software, and network meet the minimum requirements for installation and configuration.

Redis offers an enterprise on-premise solution to deploy an HA solutions that functions like a single server. You can install Redis on your preferred choice of virtual machines and provide the endpoint in your Harness Helm charts. Harness recommends this solution to install Redis in HA mode.

This topic describes how to configure an external Redis server on GCP for your installation and lists the software, hardware, and network requirements.

## Benefits of a Redis external database

Below are some of the benefits of using a Redis external database:

- High availability
- Disaster recovery
- No maintenance downtime
- Secondary read support (read scaling)

## Hardware requirements

Harness recommends a Redis configuration with the following minimum hardware:

- 3 virtual machines
- 8 cores per machine
- 8GB memory per machine
- 64GB disk per machine (SSD preferred)
- 1GB/s minimum network bandwidth

## Software requirements

External database setup requires the following software:

- Supported OS (Ubuntu 20.04 LTS)
- [Redis enterprise download URL](https://redis.com/redis-enterprise-software/download-center/software/)

## Firewall rules

External Redis requires firewall rule setup. 

To create a firewall rule in GCP, do the following:

1. Go to your [GCP networks list](https://console.cloud.google.com/networking/networks/list).

2. Select the network you want to use for your Redis nodes, for example Default.

3. Go to the Firewall tab, and create a new rule using the below configurations.

   Protocol| Port| Description | 
   | ----------------------------------------------------------------- | ---------------------------- | ----------- |
   | ICMP| * | Redis gossip protocol|
   | UDP| 53, 5353 | Redis DNS|
   | TCP| 10000-20000 | Redis connectivity|
   | TCP| 8443 | Secure (HTTPS) access to the web management UI|

4. For testing purposes, keep the Source IP ranges set to 0.0.0.0/0.

## Install Redis on GCP

After you configure your firewall rules, you must install Redis on GCP.To install Redis on GCP, you must create three VMs, create a public zone, configure your Redis cluster, configure your Redis database, and test your connectivity.

### Create your VMs

To create your VMs, do the following:

1. Go to your [GCP VM instances page](https://console.cloud.google.com/compute/instances).

2. Select **Create Instance**.

3. Select the machine type based on the hardware requirements above.

4. Change the boot disk to Ubuntu 20.04 LTS.

5. Select the default networking interface list under **Advanced Option > Networking**.

6. Select the **Internal IP** list, and then select **Reserve Static IP**.

7. Select the **External IP** list, and then select **Reserve Static IP**.

8. Enable **Control VM access through IAM permissions** under **Advanced Options > Security > Manage Access**.

9. Select **Create**.

10. SSH into the VM.

11. Run the following commands.

     ```shell
     wget <redis-download-url>
     ```
    
    ```shell
    tar xf <redis-file-name>
    ```

12. Disable port 53. For more information, go to [Ensure port availability](https://docs.redis.com/latest/rs/installing-upgrading/install/prepare-install/port-availability/#port-53) in the Redis documentation.

    Output:
    ```shell
    sudo: unable to resolve host <hostname>: Temporary failure in name resolution
    ```

13. Run the following command.

    ```shell
    sudo ./install.sh -y
    ```

14. Review the installation logs, checking for errors.

15. Repeat the steps to configure your other two VMs.

### Create a public zone

To create a public zone, do the following:

1. Go to GCP Cloud DNS and create a public zone with any domain name. eg. harness-redis.com

2. Open the public zone page. 

3. Create three type A records with subdomains for the public domain name, for example, `node1.harness-redis.com`, `node2.harness-redis.com`, and `node3.harness-redis.com`.

4. Add the internal IP and external IP for each VM in their respective A records.

5. Create one NS record with a different subdomain, for example `redis.harness-redis.com`.

6. Add the subdomains of all your nodes, for example `node1.harness-redis.com`, `node2.harness-redis.com`, and `node3.harness-redis.com`.

### Configure your Redis cluster

To configure your Redis cluster, do the following:

1. Open https://<EXTERNAL_IP_OF_NODE1>:8443 in your browser, and then complete the following on the node setup page. 

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

3. Open https://<EXTERNAL_IP_OF_NODE2>:8443 in your browser, and then complete the following on the node setup page. 

   1. Enable Flash Storage.

   2. Select **+** next to the IP, add the external IP, and then select **Save**.

   3. Disable external traffic on the internal IP.

   4. Select **Join cluster**.

   5. Add the internal IP of your first node.

   6. Enter your admin credentials.

   7. Select **Create**.

3. Open https://<EXTERNAL_IP_OF_NODE3>:8443 in your browser, and then complete the following on the node setup page. 

   1. Enable Flash Storage.

   2. Select **+** next to the IP, add the external IP, and then select **Save**.

   3. Disable external traffic on the internal IP.

   4. Select **Join cluster**.

   5. Add the internal IP of your first node.

   6. Enter your admin credentials.

   7. Select **Create**.

### Configure your Redis database

To configure your Redis database, do the following:

1. Open https://<YOUR_NODE1_EXTERNAL_IP>:8443 in your browser.

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
