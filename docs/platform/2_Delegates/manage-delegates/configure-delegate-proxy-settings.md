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

### Kubernetes Proxy Settings

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

#### In-Cluster Kubernetes Delegate with Proxy

If an in-cluster Kubernetes Delegate has a proxy configured, then `NO_PROXY` must contain the cluster master IP. This enables the delegate to skip the proxy for in-cluster connections.

### Subnet Masks not Supported

You cannot use delegate proxy settings to specify the Cluster Service Network CIDR notation and make the delegate bypass the proxy to talk to the Kubernetes API.

Harness does not allow any methods of representing a subnet mask.

The mask should be set in the cluster itself. For example:

```
kubectl -n default get service kubernetes -o json | jq -r '.spec.clusterIP'
```

:::info
Harness supports mTLS authentication on a case-by-case basis. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::
