---
title: Agent Proxy Installation
sidebar_position: 3
description: Agent proxy and its usage.
---

This topic describes how you can install agent proxy when you have restricted network condition.

## Agent Proxy for Harness Delegate
You can enable proxy settings in Harness Delegate driven chaos infrastructure (or Harness Delegate) that enables you to restrict all the outbound traffic to go through the proxy. In the context of Harness Delegate, the agent proxy is known as **Chaos Runner**.

When you have a restricted network, and you don't wish to expose all the infrastructure of your application to the public, and when you want all the outbound connections to go from a single place, you can use agent proxy.

Harness Delegate supports standard proxy variables `HTTP_PROXY` , `HTTPS_PROXY`, and `NO_PROXY`. It connects with the Kubernetes API server and the [Harness portal](https://app.harness.io).

In general, the Harness portal connection goes through the proxy and you will need to specify `NO_PROXY` which is Kubernetes service IP in default namespace.

You can also provide `PROXY_URL` setting that is used to communicate with the Harness portal.

    ![](./static/mtls.png)

    ![](./static/proxy.png)

You can install the agent proxy for one account and provide the URL of the agent proxy in the configuration file for the Harness Delegate.


    ![](./static/agent-proxy.png)

The diagram above describes the following:
- All the inbound connections go through the Delegate.
- If your cluster has connectivity with the Harness portal (Cluster A in the diagram), you won't need any proxy.
- If your cluster does not have connectivity with the Harness portal (Cluster B in the diagram), then such requests goes through the proxy.

:::tip
Chaos runner supports token-based authentication with the Harness Platform. If you want to add another authentication on top of Harness authentication, you can [enable mTLS](https://developer.harness.io/docs/platform/delegates/secure-delegates/delegate-mtls-support/) for the account.
:::

## Agent Proxy for Discovery Agent

In the context of Discovery agent, the agent proxy is known as **Discovery Collector**.

If you want to add another authentication on top of Harness authentication, you can achieve this using mTLS for both Chaos Runner and Discovery Collector.

You can configure mTLS in the Chaos Runner or Discovery Collector. Create a Kubernetes secret with the certificate and key in the target cluster and provide the following details.

    ![](./static/mtls-1.png)

If you don't want to create Kubernetes secrets in multiple clusters, you can install the Chaos Runner agent proxy with mTLS key and certificate and provide the proxy URL in proxy setting.

    ![](./static/proxy-2.png)



