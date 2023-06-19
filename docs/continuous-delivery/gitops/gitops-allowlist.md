---
title: Harness hosted GitOps IP addresses
description: IPs for using hosted GitOps agents.
sidebar_position: 10
---

Access to Kubernetes clusters that are behind strict firewalls and are not accessible from the public internet is controlled through authorized IP addresses. To allow access to these clusters, Harness provides a list of IP addresses that need to be configured on the clusters.

## Adding the Harness hosted GitOps IPs to the allowlist

If you are using hosted GitOps agents to deploy on managed clusters, you must configure these clusters with a specific set of IP addresses to authorize access.

### Harness hosted GitOps IPs 

All the IPs are Cloud NAT gateways and need to enable specific IPs instead of ranges.

```bash
34.168.25.119/32
35.247.93.45/32
34.82.210.106/32
34.83.159.16/32

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
```

### Cluster configuration

To ensure proper functionality, clusters must be configured with API access to the authorized Harness IP addresses.

If you have not yet configured your clusters with the required IP addresses, please use the links provided below to complete the configuration for the listed clusters.

- [GKE (Google Kubernetes Engine)](https://cloud.google.com/kubernetes-engine/docs/how-to/authorized-networks)
- [EKS (Amazon Elastic Container Service)](https://repost.aws/knowledge-center/eks-lock-api-access-IP-addresses)
- [AKS (Azure Kubernetes Service)](https://learn.microsoft.com/en-us/azure/aks/api-server-authorized-ip-ranges)

