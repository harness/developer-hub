---
title: Proxy configuration guide
description: Learn how to manage connectivity in environments where outbound traffic must go through a proxy. 
sidebar_position: 1
helpdocs_topic_id: 5ww21ewdt8
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

This article explains how to configure proxy settings to manage connectivity in environments where outbound traffic is restricted. 

By default, HTTP and HTTPS proxy schemes are supported.

:::warning Important Note
When using a HTTP Helm repositories, the [default setting](/docs/platform/settings/default-settings/) `Ignore status code for HTTP connections` must be set to `true` as socket connection tests conducted by Harness from the delegate do not account for proxy details.
:::

## Proxy Settings for Delegate 

### Kubernetes

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

### Docker 

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

## Proxy Settings for Delegate Upgrader

:::info Feature Availability 
  This feature is available from Delegate Upgrader [1.7.0](/release-notes/delegate#version-170-) and later.
:::

### Kubernetes 

To configure proxy for your Kubernetes Delegate Upgrader, add the proxy settings to the Delegate upgrader config in the manifest file. Below is an example for the same:

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
        accountId: XXXX_XXXXXXX_XXXX
        managerHost: https://<YOUR_VANITY_URL>
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

### Docker

To run the Docker Delegate Upgrader with proxy settings, set the required environment variables in the Docker command as shown in the example below.

```bash
docker run  --cpus=0.1 --memory=100m \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e ACCOUNT_ID=XXXX_XXXXXXX_XXXX \
  -e MANAGER_HOST_AND_PORT=https://<YOUR_VANITY_URL> \
  -e UPGRADER_WORKLOAD_NAME=docker-delegate \
  -e PROXY_HOST=YOUR_PROXY_HOST_IP \
  -e PROXY_PORT=YOUR_PROXY_PORT \
  -e PROXY_USER=MYUSER \
  -e PROXY_PASSWORD=****** \
  -e UPGRADER_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXX \
  -e CONTAINER_STOP_TIMEOUT=3600 \
  -e SCHEDULE="0 */1 * * *" us-west1-docker.pkg.dev/gar-setup/docker/upgrader:1.7.0
```

## Subnet masks not supported

You cannot use delegate proxy settings to specify the Cluster Service Network CIDR notation and make the delegate bypass the proxy to talk to the Kubernetes API.

Harness does not allow any methods of representing a subnet mask.

The mask should be set in the cluster itself. For example:

```
kubectl -n default get service kubernetes -o json | jq -r '.spec.clusterIP'
```

:::info
Harness supports mTLS authentication on a case-by-case basis. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::
