---
title: Agent Proxy
sidebar_position: 3
description: Agent proxy installation and its usage.
---

This topic describes when an agent proxy is required and how you can install it.

When you have a restricted network, and you don't want to expose all the infrastructure of your application to the public, and when you want all the outbound connections to go from a single place, you can use your own proxy or an agent proxy.

The diagram below describes how the **Discovery Agent** and **Chaos Runner** communicate with Harness Control Plane.

    ![](./static/agent-proxy.png)

The diagram above describes the following:
- All the inbound connections go through the Delegate.
- If your cluster has connectivity with the Harness portal (Cluster A in the diagram), you won't need any proxy.
- If your cluster does not have connectivity with the Harness portal (Cluster B in the diagram), then such requests goes through the proxy.

:::tip
Chaos runner supports token-based authentication with the Harness Platform. If you want to add another authentication on top of Harness authentication, you can [enable mTLS](/docs/chaos-engineering/features/chaos-infrastructure/harness-infra/mtls-support) for the account.
:::

## Delegate-Driven Chaos Runner (DDCR)
You can enable proxy settings in DDCR that enables you to restrict all the outbound traffic to go through the proxy.

DDCR supports standard proxy variables `HTTP_PROXY` , `HTTPS_PROXY`, and `NO_PROXY`.

In general, the Harness portal connection goes through the proxy and you will need to specify `NO_PROXY` which is Kubernetes service IP in default namespace.

    ![](./static/proxy.png)

Instead, you can also provide `PROXY_URL` setting that is used to communicate with the Harness portal.

    ![](./static/mtls.png)

## Discovery Agent

You can enable proxy settings in Discovery Agent that enables you to restrict all the outbound traffic to go through the proxy.

Discovery Agent supports standard proxy variables `HTTP_PROXY` , `HTTPS_PROXY`, and `NO_PROXY`.

In general, the Harness portal connection goes through the proxy and you will need to specify `NO_PROXY` which is Kubernetes service IP in default namespace.

    ![](./static/proxy.png)

Instead, you can also provide `PROXY_URL` setting that is used to communicate with the Harness portal.

    ![](./static/mtls.png)
