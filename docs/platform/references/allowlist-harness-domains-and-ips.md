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

Harness supports allowlisting of its SaaS infrastructure IPs to enable secure access to private networks. This is helpful when you want to connect Harness to internal systems such as Kubernetes clusters, artifact repositories, SCMs, or other internal services.

We recommend [contacting Harness Support](https://support.harness.io/) to receive the correct list of IPs and guidance based on your use case, region, and Harness modules in use.

## Outbound Access Requirements

Harness Delegates typically only require outbound access to the following domains:

- `app.harness.io` – Primary Harness platform endpoint.

- `logging.googleapis.com` – (Optional) Used to send logs to Harness Support. This can be disabled using the `STACK_DRIVER_LOGGING_ENABLED` environment variable. [Learn more](/docs/platform/delegates/delegate-reference/delegate-environment-variables/#stack_driver_logging_enabled).

## Allowlisting Harness IPs

To connect securely from Harness to your internal infrastructure — such as for:

- Pipeline execution using Harness Cloud

- Deployments via GitOps agents

- Feature Flags

- Hosted builds (Linux/macOS)

- Internal APIs or SCM access

You may need to allowlist specific IP ranges based on the Harness services you're using.

:::note
Harness provides region- and service-specific IPs for allowlisting. These are not publicly listed to avoid misuse. Please reach out to [Harness Support](https://support.harness.io/) to obtain the accurate IPs required for your setup.
:::

### Configure clusters

To ensure proper functionality, configure your clusters with API access to the authorized Harness IP addresses.

If you have not yet configured your clusters with the required IP addresses, use the links provided below to complete the configuration for the listed clusters.

- [GKE (Google Kubernetes Engine)](https://cloud.google.com/kubernetes-engine/docs/how-to/authorized-networks)
- [EKS (Amazon Elastic Container Service)](https://repost.aws/knowledge-center/eks-lock-api-access-IP-addresses)
- [AKS (Azure Kubernetes Service)](https://learn.microsoft.com/en-us/azure/aks/api-server-authorized-ip-ranges)

