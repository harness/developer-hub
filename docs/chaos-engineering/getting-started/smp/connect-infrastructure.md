---
title: Connect chaos infrastructure via proxy
sidebar_position: 1
description: Connect chaos infrastructure to the control plane via proxy.
redirect_from:
    - /docs/chaos-engineering/get-started/ce-on-smp/configure-proxy/connect-infrastructure
---

This topic describes the method to connect your chaos infrastructure to the control plane on [app.harness.io](https://app.harness.io) or Self-Managed Platform (SMP) via proxy.

If you want to deploy a chaos infrastructure in an air-gapped cluster that accesses [app.harness.io](https://app.harness.io) or SMP control plane via proxy, you need to add `HTTP_PROXY` , `HTTPS_PROXY`, and `NO_PROXY` environment variables for the subscriber, where:

- `HTTP_PROXY` is set if you deploy the SMP control plane over HTTP.

- `HTTPS_PROXY` is set if you deploy the SMP control plane over HTTPS or if you want to connect to [app.harness.io](https://app.harness.io).

The above environment variables are set without providing any credentials. An example of a proxy without credentials:
```
http://<proxy-ip>:<proxy-port>
```

:::tip
- You can provide `HTTP_PROXY` and `HTTPS_PROXY` with endpoints that have credentials. For this, you have to first URL Encode the username and the password and provide them.
- An example of a proxy with credentials:

```
http://<url-encoded-username>:<url-encoded-password>@<proxy-ip>:<proxy-port>
```
:::

- `NO_PROXY` is set with the cluster IP of the cluster where you deploy the chaos infrastructure. This allows requests to be directed to the Kube API server directly instead of going through a proxy. In addition, the proxy may not be able to connect to the Kube API server if it is deployed outside the cluster.

You can provide these environment variables directly on the subscriber deployment or with the help of ConfigMap subscriber configuration in the chaos infrastructure manifest that is generated from the UI.
