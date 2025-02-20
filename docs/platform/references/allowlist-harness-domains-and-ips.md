---
title: Allowlist Harness domains and IPs
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

## Add Harness hosted IPs to the allowlist

Access to Kubernetes clusters that are behind strict firewalls and are not accessible from the public internet is controlled through authorized IP addresses. To allow access to these clusters, Harness provides a list of IP addresses that need to be configured on the clusters.

### Harness hosted GitOps IPs

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
```

### Whitelisting for Access to On-Prem Services (Mac Platform)

To allow access from our Mac baremetal CI machines to your on-prem services, please ensure that the following CIDR block is whitelisted:

	•	CIDR: 207.254.53.128/25

This will enable seamless communication between our Mac-based CI infrastructure and your on-prem services.

### Harness hosted Feature Flags IPs

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

