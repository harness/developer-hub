---
title: Network configuration
sidebar_label: Network configuration
sidebar_position: 40
description: Configure mTLS and Harness Network Proxy (HNP) for the chaos runner and Discovery Agent on Kubernetes chaos infrastructure.
keywords:
  - mTLS
  - proxy
  - HNP
  - harness network proxy
  - restricted network
  - DDCR
  - discovery agent
tags:
  - chaos-engineering
  - infrastructure
  - network
  - security
redirect_from:
  - /docs/chaos-engineering/features/chaos-infrastructure/harness-infra/mtls-support
  - /docs/chaos-engineering/features/chaos-infrastructure/harness-infra/proxy-support
  - /docs/chaos-engineering/concepts/explore-concepts/infrastructures/delegate/mtls-support
  - /docs/chaos-engineering/concepts/explore-concepts/infrastructures/delegate/proxy-support
  - /docs/chaos-engineering/guides/infrastructures/ddcr/mtls-support
  - /docs/chaos-engineering/guides/infrastructures/ddcr/proxy-support
  - /docs/chaos-engineering/guides/infrastructures/types/ddcr/mtls-support
  - /docs/chaos-engineering/guides/infrastructures/types/ddcr/proxy-support
  - /docs/resilience-testing/chaos-testing/infrastructure/types/ddcr/mtls-support
  - /docs/resilience-testing/chaos-testing/infrastructure/types/ddcr/proxy-support
  - /docs/resilience-testing/chaos-testing/infrastructure/network-config
  - /docs/resilience-testing/chaos-testing/infrastructure/kubernetes-harness/network-config
---

This page covers the two network settings the chaos runner (DDCR) and the Discovery Agent expose on **Kubernetes chaos infrastructure**: **mTLS** for stronger client authentication on top of Harness token auth, and **proxy** (your own proxy or Harness Network Proxy) for outbound traffic from restricted clusters.

---

## Before you begin

- **Familiarity with Delegate mTLS.** Go to [Delegate mTLS support](/docs/platform/delegates/secure-delegates/delegate-mtls-support) for the platform-level concepts.
- **An installed Delegate (DDCR).** Go to [Set up Kubernetes infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes) if you do not have one yet.
- **Cluster-side TLS material.** A client certificate and key, ideally stored in a Kubernetes secret on the cluster where the chaos runner executes.

---

## How traffic flows

The chaos runner authenticates to Harness with a token by default. The Discovery Agent runs in the same cluster and uses the same outbound path.

![Discovery Agent and Chaos Runner traffic flow](../static/delegate/agent-proxy.png)

- Inbound connections to the runner always come **through the Delegate**.
- Outbound calls go straight to the Harness control plane if the cluster has connectivity.
- If the cluster cannot reach the control plane directly, route outbound traffic through your own proxy or through Harness Network Proxy (HNP). Each is configured the same way: set `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` on the Delegate and the Discovery Agent.

:::tip
HNP supports custom certificates, so you can pin TLS material to the proxy rather than spread it across every target cluster.
:::

---

## Use mTLS with DDCR and the Discovery Agent

For both components, the configuration is the same: store the client cert and key in a Kubernetes secret in the cluster the component runs in, then point the component at that secret in the UI.

### Configure mTLS on DDCR

1. Create a Kubernetes secret containing the client certificate and key on the target cluster.
2. Edit the Kubernetes chaos infrastructure and reference the secret in the mTLS fields.

    ![mTLS fields on the infrastructure](../static/delegate/mtls-1.png)

If you do not want to provision a secret in every target cluster, [install HNP](#install-harness-network-proxy-hnp) with the cert and key, then point the chaos runner at the HNP URL instead.

![Proxy URL on the chaos runner](../static/delegate/proxy-2.png)

### Configure mTLS on the Discovery Agent

Same pattern. Create the secret on the cluster the Discovery Agent runs in, then reference it in the discovery agent settings under **Resilience Testing → Project Settings → Discovery**.

![mTLS fields on the discovery agent](../static/delegate/mtls-1.png)

The HNP fallback applies here too.

![Proxy URL on the discovery agent](../static/delegate/proxy-2.png)

---

## Configure proxy settings

If the cluster cannot reach the Harness control plane directly, the chaos runner and Discovery Agent can be put behind a proxy. Either use a proxy you already operate, or install [Harness Network Proxy (HNP)](#install-harness-network-proxy-hnp).

Both components understand the standard environment variables:

- `HTTP_PROXY`
- `HTTPS_PROXY`
- `NO_PROXY` (include the in-cluster `kubernetes` service IP in the `default` namespace so intra-cluster traffic bypasses the proxy)

You can also set `PROXY_URL` directly on the component, which has the same effect for Harness-portal communication.

### Set the proxy on DDCR

1. Go to **Resilience Testing → Project Settings → Environments** and pick the environment that hosts the Delegate.

    ![Environments list](../static/delegate/proj-env.png)

2. Open the Delegate, click the **⋮** menu, and select **Edit**.

    ![Edit the Delegate](../static/delegate/select-edit.png)

3. Set `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` (or `PROXY_URL`) and save.

    ![Proxy settings on the Delegate](../static/delegate/proxy.png)

    ![PROXY_URL on the Delegate](../static/delegate/mtls.png)

### Set the proxy on the Discovery Agent

1. Go to **Resilience Testing → Project Settings → Discovery**.

    ![Discovery in Project Settings](../static/delegate/proj-set.png)

2. Open the discovery agent and click **Edit**.

    ![Edit the discovery agent](../static/delegate/edit-discovery.png)

3. Set the proxy environment variables (or `PROXY_URL`) and save.

    ![Proxy settings on the discovery agent](../static/delegate/proxy.png)

    ![PROXY_URL on the discovery agent](../static/delegate/mtls.png)

---

## Install Harness Network Proxy (HNP)

HNP is an in-cluster proxy that consolidates outbound calls from the chaos runner and Discovery Agent. It can be deployed with or without mTLS.

```bash
helm repo add harness-chaos https://harness.github.io/chaos-infra-helm-chart
helm upgrade --install chaos-agent-proxy harness-chaos/chaos-infra \
  -n hce -f override.yaml
```

### Without mTLS

```yaml
tags:
  agentProxy: true
global:
  serverAddress: https://app.harness.io
```

### With mTLS

Create the client certificate first. Go to [Enable mTLS on delegate](/docs/platform/delegates/secure-delegates/delegate-mtls-support#enable-mtls-on-delegate).

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

Replace `<customer-name>` with the subdomain assigned to your Harness account.

---

## Next steps

- [Set up Kubernetes infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes): install the Delegate-driven runner.
- [Cluster permissions](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/permissions): review the Kubernetes RBAC the chaos service account needs.
- [Delegate mTLS support](/docs/platform/delegates/secure-delegates/delegate-mtls-support): platform-level mTLS reference.
