---
title: Configure delegate proxy settings
description: All delegates include proxy settings you can use to change how the delegate connects to the Harness Manager. By default, the Harness Delegate uses HTTP and HTTPS in its Proxy Scheme settings.…
sidebar_position: 1
helpdocs_topic_id: 5ww21ewdt8
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

All delegates include proxy settings you can use to change how the delegate connects to the Harness Manager.

By default, the Harness Delegate uses HTTP and HTTPS in its Proxy Scheme settings.

:::warning
When using a HTTP Helm repositories, the [default setting](/docs/platform/settings/default-settings/) `Ignore status code for HTTP connections` must be set to `true` as socket connection tests conducted by Harness from the delegate do not account for proxy details.
:::

### Kubernetes delegate proxy settings

The proxy settings are in the `harness-delegate.yaml` file:

```yaml
...
        - name: PROXY_HOST
          value: ""
        - name: PROXY_PORT
          value: ""
        - name: PROXY_SCHEME
          value: ""
        - name: NO_PROXY
          value: ""
        - name: PROXY_MANAGER
          value: "true"
        - name: PROXY_USER
          valueFrom:
            secretKeyRef:
              name: doc-example-proxy
              key: PROXY_USER
        - name: PROXY_PASSWORD
          valueFrom:
            secretKeyRef:
              name: doc-example-proxy
              key: PROXY_PASSWORD
...
```

The `PROXY_MANAGER` setting determines whether the delegate bypasses proxy settings to reach the Harness Manager in the cloud. If you want to bypass, enter `false`.

#### In-Cluster Kubernetes delegate with proxy

If an in-cluster Kubernetes delegate has a proxy configured, then `NO_PROXY` must contain the cluster master IP. This enables the delegate to skip the proxy for in-cluster connections.

### Sample Docker delegate installation script with a proxy scheme

The following script installs a Docker delegate with an HTTP proxy scheme.

```bash
docker run --cpus=1 --memory=2g \
  -e DELEGATE_NAME=docker-delegate \
  -e RUNNER_URL=https://<YOUR_RUNNER_URL> \
  -e DELEGATE_TAGS=macos-amd64 \
  -e PROXY_HOST=YOUR_PROXY_HOST_IP \
  -e PROXY_PORT=YOUR_PROXY_PORT \
  -e PROXY_SCHEME=http \
  -e NEXT_GEN="true" \
  -e DELEGATE_TYPE="DOCKER" \
  -e ACCOUNT_ID=YOUR_ACCOUNT_ID \
  -e DELEGATE_TOKEN=YOUR_DELEGATE_TOKEN \
  -e MANAGER_HOST_AND_PORT=https://<YOUR_MANAGER_HOST_AND_PORT>/delegate:23.09.80505
```

### Kubernetes Delegate Upgrader with proxy settings

:::note
  This feature is available from 1.7.0 and later.
:::

To configure a proxy for your Kubernetes Delegate Upgrader, ensure that you update the manifest file. Download the `harness-delegate.yaml`, find the `kind: ConfigMap` section, and add your proxy settings (i.e., proxyHost, proxyPort, proxymanager, proxyUser, ProxyPassword) as shown below.

```yaml
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: kubernetes-delegate-upgrader-config
    namespace: harness-delegate-ng
  data:
    config.yaml: |
      mode: Delegate
      dryRun: false
      workloadName: kubernetes-delegate
      namespace: harness-delegate-ng
      containerName: delegate
      delegateConfig:
        accountId: px7xd_XXXXXXX_Vjvw
        managerHost: https://vanityurl.harness.io
      proxyHost: XX.XX.XX.XX
      proxyPort: 3128
      proxyManager: true
      proxyUser: MYUSER
      proxyPassword: ******
```

Once updated, apply the configuration using the command below.

```bash
kubectl apply -f harness-delegate.yaml
```

### Docker delegate upgrader with proxy settings

To run the Docker Delegate Upgrader with proxy settings, use the command below with the required environment variables:

```bash
docker run  --cpus=0.1 --memory=100m \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e ACCOUNT_ID=px7xd_XXXXXXX_Vjvw \
  -e MANAGER_HOST_AND_PORT=https://vanityurl.harness.io \
  -e UPGRADER_WORKLOAD_NAME=docker-delegate \
  -e PROXY_HOST=YOUR_PROXY_HOST_IP \
  -e PROXY_PORT=YOUR_PROXY_PORT \
  -e PROXY_USER=MYUSER \
  -e PROXY_PASSWORD=****** \
  -e UPGRADER_TOKEN=NWExNWY3MGU4YXXXXXXXXXXXA5YzhlZjAzZDgwMDY= \
  -e CONTAINER_STOP_TIMEOUT=3600 \
  -e SCHEDULE="0 */1 * * *" us-west1-docker.pkg.dev/gar-setup/docker/upgrader:1.7.0
```

### Subnet masks not supported

You cannot use delegate proxy settings to specify the Cluster Service Network CIDR notation and make the delegate bypass the proxy to talk to the Kubernetes API.

Harness does not allow any methods of representing a subnet mask.

The mask should be set in the cluster itself. For example:

```
kubectl -n default get service kubernetes -o json | jq -r '.spec.clusterIP'
```

:::info
Harness supports mTLS authentication on a case-by-case basis. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::
