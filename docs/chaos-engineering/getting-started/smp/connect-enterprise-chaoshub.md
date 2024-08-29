---
title: Connect Enterprise ChaosHub via proxy
sidebar_position: 2
description: Connect Enterprise ChaosHub in an air-gapped setup via proxy
---

This topic describes the method to connect Enterprise ChaosHub (https://github.com/) in an air-gapped setup via proxy

If you don't have access to [GitHub](https://github.com/), you will not be able to deploy Harness SMP in an air-gapped cluster completely. As a consequence, the Enterprise ChaosHub will be in a `DISCONNECTED` state.

To address this,
1. Use a proxy that can access [GitHub](https://github.com/);
2. Provide the configuration under chaos manager deployment;
3. Use this setup in the `override.yaml` file of the Helm chart before deployment.

An example of changes to the `override.yaml` file:

```
chaos-manager:
    config:
     HTTP_PROXY:
     HTTPS_PROXY:
     NO_PROXY:
     GIT_SSL_NO_VERIFY:
```

where:

- `HTTP_PROXY` is set only if you are trying to connect to an SCM server deployed over HTTP (optional for Enterprise ChaosHub).

- `HTTPS_PROXY` is set only if you are trying to connect to an SCM server deployed over HTTPS or [GitHub](https://github.com) (required for Enterprise ChaosHub).

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

- `GIT_SSL_NO_PROXY` is set when you are using self-signed certificates to skip SSL certificate validation.