---
title: Use mTLS with DDCR and Discovery Agent
sidebar_position: 4
description: Configure mTLS with with DDCR and Discovery Agent.
redirect_from:
- /docs/chaos-engineering/features/chaos-infrastructure/harness-infra/mtls-support
- /docs/chaos-engineering/concepts/explore-concepts/infrastructures/delegate/mtls-support
---

## Prerequisites

- [What is mTLS?](https://developer.harness.io/docs/platform/delegates/secure-delegates/delegate-mtls-support)
- [What is DDCR?](/docs/chaos-engineering/use-harness-ce/infrastructures/#what-is-ddcr)

This topic describes how you can configure mTLS with DDCR and Discovery Agent.

Chaos runner supports token-based authentication with the Harness Platform. If you want to add another authentication on top of Harness authentication, you can [enable mTLS](https://developer.harness.io/docs/platform/delegates/secure-delegates/delegate-mtls-support/) for the account.

## DDCR

To configure mTLS in the DDCR, create a Kubernetes secret with the certificate and key in the target cluster and provide the following details.

    ![](./static/delegate/mtls-1.png)

If you don't want to create Kubernetes secrets in multiple clusters, you can [install the agent proxy](/docs/chaos-engineering/use-harness-ce/infrastructures/proxy-support#installation) (aka Chaos Runner agent proxy) with mTLS key and certificate and provide the proxy URL in proxy setting.

    ![](./static/delegate/proxy-2.png)


## Discovery Agent

To configure mTLS in the Discovery Agent, create a Kubernetes secret with the certificate and key in the target cluster and provide the following details.

    ![](./static/delegate/mtls-1.png)

If you don't want to create Kubernetes secrets in multiple clusters, you can install the Chaos Runner agent proxy with mTLS key and certificate and provide the proxy URL in proxy setting.

    ![](./static/delegate/proxy-2.png)


