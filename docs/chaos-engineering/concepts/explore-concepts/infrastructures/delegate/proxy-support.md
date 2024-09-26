---
title: Configure Proxy Settings
sidebar_position: 3
description: Configure DDCR and Discovery Agent Proxy settings.
redirect_from:
    - /docs/chaos-engineering/features/chaos-infrastructure/harness-infra/proxy-support
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic describes when an agent proxy is required, how you can install it, and configure DDCR and discovery agent proxy settings.

When you have a restricted network, and you don't want to expose all the infrastructure of your application to the public, and when you want all the outbound connections to go from a single place, you can use your own proxy or an agent proxy.

The diagram below describes how the **Discovery Agent** and **Chaos Runner** communicate with Harness Control Plane.

    ![](./static/agent-proxy.png)

The diagram above describes the following:
- All the inbound connections go through the Delegate.
- If your cluster has connectivity with the Harness portal (Harness Control Plane in the diagram), you won't need any proxy.
- If your cluster does not have connectivity with the Harness portal (Harness Control Plane in the diagram), then such requests goes through the proxy.
    - In case you already have a proxy set up, you can [provide the URL of the proxy in the UI](/docs/chaos-engineering/concepts/explore-concepts/infrastructures/delegate/proxy-support#delegate-driven-chaos-runner-ddcr).
    - In case you don't have a proxy set up, you can [install](#installation) chaos agent proxy.

:::tip
Chaos runner supports token-based authentication with the Harness Platform. If you want to add another authentication on top of Harness authentication, you can [enable mTLS](/docs/chaos-engineering/concepts/explore-concepts/infrastructures/delegate/mtls-support) for the account.
:::

## Installation

You can install agent proxy with or without using mTLS. Below are sample configurations for both of them.

<Tabs>
<TabItem value="Without mTLS">

```yaml
tags:
  agentProxy: true
global:
  serverAddress: https://app.harness.io
```

</TabItem>

<TabItem value="With mTLS">

Go to [create client certificate](/docs/platform/delegates/secure-delegates/delegate-mtls-support/#configure-mtls-on-delegate) before configuring with mTLS.

```yaml
tags:
  agentProxy: true
global:
  serverAddress: https://<customer-name>.agent.app.harness.io

agent-proxy:
  volumes:
  - name: client-certificate
    secret:
      secretName: client-certificate

  volumeMounts:
  - mountPath: /etc/mtls
    name: client-certificate
    readOnly: true

  env:
  - name: CLIENT_CERT_PATH
    value: /etc/mtls/client.crt
  - name: CLIENT_KEY_PATH
    value: /etc/mtls/client.key
```

</TabItem>
</Tabs>

You can execute the below Helm command to install agent proxy.

```bash
helm repo add harness-chaos https://harness.github.io/chaos-infra-helm-chart
```

```bash
helm upgrade --install chaos-agent-proxy harness-chaos/chaos-infra -n hce -f override.yaml
```

## Delegate-Driven Chaos Runner (DDCR)
You can enable proxy settings in DDCR that enables you to restrict all the outbound traffic to go through the proxy.

DDCR supports standard proxy variables `HTTP_PROXY` , `HTTPS_PROXY`, and `NO_PROXY`.

In general, the Harness portal connection goes through the proxy and you will need to specify `NO_PROXY` which is the `kubernetes` service IP in the `default` namespace.

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