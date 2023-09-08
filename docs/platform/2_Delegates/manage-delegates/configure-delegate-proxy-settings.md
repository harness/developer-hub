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

```
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
  -e LOG_STREAMING_SERVICE_URL=https://<YOUR_LOG_STREAMING_SERVICE_URL> \
  -e MANAGER_HOST_AND_PORT=https://<YOUR_MANAGER_HOST_AND_PORT>/delegate:23.09.80505
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
