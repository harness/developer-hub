---
title: Allowlist Harness Platform IPs and CIDR
description: Harness SaaS Delegates only need outbound access to the Harness domain name (most commonly, app.harness.io) and, optionally, to logging.googleapis.com.
sidebar_position: 1
helpdocs_topic_id: ooelo06uy5
helpdocs_category_id: fb16ljb8lu
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/platform/references/whitelist-harness-domains-and-ips
  - /docs/continuous-delivery/gitops/gitops-ref/gitops-allowlist/
  - /docs/continuous-delivery/gitops/gitops-allowlist
---

Harness SaaS delegates only need outbound access to the Harness domain name (typically **app.harness.io**) and, optionally, to **logging.googleapis.com** (used to provide logs to Harness support).

The URL `logging.googleapis.com` is used to send log files to Harness support. Use the environment variable `STACK_DRIVER_LOGGING_ENABLED` to disable this functionality.

For more information, go to [Delegate environment variables](/docs/platform/delegates/delegate-reference/delegate-environment-variables/#stack_driver_logging_enabled).

## Harness Manager

Users of the Harness Manager browser client need access to **app.harness.io** and **static.harness.io**. This is not a Harness Delegate requirement. It's simply for users to use the browser-based Harness Manager.

## Vanity URL

If you are using a Harness vanity URL, like **mycompany.harness.io**, you can allowlist it also.

## Allowlist Harness SaaS IPs

The following list is optional. You can allowlist these IPs if needed.

```
35.201.91.229
34.120.225.85
34.110.203.189
34.149.33.161
34.160.153.7
34.82.155.149
34.168.179.66
```

:::warning
Harness will not change IPs without 30 days notice to all customers. If a security emergency requires a change, all customers are notified.
:::

## Add Harness Platform IPs to the allowlist

Access to Kubernetes clusters that are behind strict firewalls and are not accessible from the public internet is controlled through authorized IP addresses. To allow access to these clusters, Harness provides a list of IP addresses that need to be configured on the clusters.

### Harness Platform GitOps IPs

If you are using hosted GitOps agents to deploy on managed clusters, you must configure these clusters with a specific set of IP addresses to authorize access.

All the IPs are cloud NAT gateways and need to enable specific IPs instead of ranges.

```bash
34.168.25.119/32
35.247.93.45/32
34.82.210.106/32
34.83.159.16/32
```

### Harness Platform IPs

All the IPs are cloud NAT gateways and need to enable specific IPs instead of ranges.

```bash
35.237.119.232/32
34.82.155.149/32
34.83.51.28/32
35.230.70.231/32
34.105.92.100/32
35.233.187.42/32
35.247.6.7/32
34.83.106.43/32
34.168.179.66/32
34.145.10.183/32
35.197.78.109/32
35.247.11.84/32
34.168.91.26/32
35.230.82.250/32
35.247.57.139/32
34.83.191.187/32
34.127.8.91/32
35.247.40.237/32
35.236.117.224/32
35.236.112.238/32
34.94.29.95/32
34.94.190.229/32
104.196.251.84/32
34.94.191.198/32
34.106.170.77/32
34.38.153.209/32
35.189.94.200/32
34.141.112.174/32
```
### Harness Cloud Allowlisting for accessing resources in your private network

When running pipeline stages on Harness Cloud, you may need to connect to internal resources that are not publicly accessible — such as artifact repositories, source code management systems (SCMs), or internal APIs. To enable secure communication between Harness Cloud infrastructure and your private network, your networking or security team can allowlist the relevant IP ranges used by Harness Cloud. 

This page provides the list of IP ranges to allowlist for both macOS and Linux hosted platforms. Alternatively, if allowlisting is not feasible or permitted by your security team, you can use [Secure Connect](/docs/continuous-integration/secure-ci/secure-connect) to establish a secure tunnel to your environment.

#### Harness Cloud Allowlisting for Mac Platform

Harness Cloud users utilizing hosted **macOS** infrastructure, who rely on allowlisting for on-premises resource access, are requested to allowlist the following CIDR block:  `207.254.53.128/25`


#### Harness Cloud Allowlisting for Linux Platform

Harness Cloud users utilizing hosted **Linux** infrastructure, who rely on allowlisting for on-premises resource access, are requested to update their configuration.

CIDR Blocks:

```
15.204.17.0/24, 15.204.19.0/24, 15.204.23.0/24, 15.204.69.0/24, 15.204.70.0/24, 15.204.71.0/24, 51.81.128.0/24, 51.81.189.0/24
```

##### Additional IPs to add to allowlist:

```
34.94.194.45, 34.133.164.105, 35.184.10.123, 34.171.8.178, 34.172.44.211, 34.28.94.170, 34.75.255.154, 34.139.54.93, 35.231.172.154,  
35.227.126.5, 35.231.234.224, 34.139.103.193, 34.139.148.112, 35.196.119.169, 34.73.226.43, 35.237.185.165, 34.162.90.200, 34.162.31.112,  
34.162.177.5, 34.162.189.244, 34.162.184.1, 34.125.74.8, 34.125.80.89, 34.16.190.122, 34.125.82.12, 34.125.11.217, 35.197.35.30,  
35.233.237.208, 34.83.94.29, 34.168.158.33, 34.168.20.8, 34.82.156.127, 34.83.1.152, 34.168.60.254, 34.82.65.138, 34.82.140.146,  
34.127.6.209, 35.185.226.205, 35.247.24.71, 34.168.30.50, 35.233.132.196, 34.168.214.255, 34.102.103.7, 34.102.40.149, 34.102.16.205,  
34.127.65.210, 35.233.172.173, 34.143.191.93, 34.142.250.64, 34.126.140.239, 34.124.243.76, 34.124.141.152, 34.141.177.40, 34.32.206.247
35.204.0.244, 34.13.223.178, 34.91.227.239
```
If you have any questions or need assistance with the allowlisting process, please [contact Harness Support](https://support.harness.io/).

### Harness Platform Feature Flags IPs

With Feature Flags, the following IP can be added to the allowlist as needed.

```bash
35.244.167.62
```

For Flutter Web users only, you can use the following IP address:

```bash
35.190.29.75
```

If you'd like to install the JavaScript SDK needed for the Flutter Web IP, you can refer to the [Feature Flags Javascript SDK Documentation](../../feature-flags/use-ff/ff-sdks/client-sdks/java-script-sdk-references.md) or the [Flutter GitHub repo](https://github.com/harness/ff-flutter-client-sdk#sdk-installation-for-flutter-web).

### Configure clusters

To ensure proper functionality, configure your clusters with API access to the authorized Harness IP addresses.

If you have not yet configured your clusters with the required IP addresses, use the links provided below to complete the configuration for the listed clusters.

- [GKE (Google Kubernetes Engine)](https://cloud.google.com/kubernetes-engine/docs/how-to/authorized-networks)
- [EKS (Amazon Elastic Container Service)](https://repost.aws/knowledge-center/eks-lock-api-access-IP-addresses)
- [AKS (Azure Kubernetes Service)](https://learn.microsoft.com/en-us/azure/aks/api-server-authorized-ip-ranges)

