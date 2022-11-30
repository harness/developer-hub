---
title: Configure delegate proxy settings
description: All of the Delegates include proxy settings you can use to change how the Delegate connects to the Harness Manager. By default, the Harness Delegate uses HTTP and HTTPS in its Proxy Scheme settings.…
# sidebar_position: 2
helpdocs_topic_id: 5ww21ewdt8
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

All of the Delegates include proxy settings you can use to change how the Delegate connects to the Harness Manager.

By default, the Harness Delegate uses HTTP and HTTPS in its Proxy Scheme settings.

### Kubernetes Proxy Settings

The proxy settings are in the **harness-delegate.yaml** file:


```
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
The `PROXY_MANAGER` setting determines whether the Delegate bypasses proxy settings to reach the Harness Manager in the cloud. If you want to bypass, enter `false`.

#### In-Cluster Kubernetes Delegate with Proxy

If an in-cluster Kubernetes Delegate has a proxy configured, then `NO_PROXY` must contain the cluster master IP. This enables the Delegate to skip the proxy for in-cluster connections.

### Subnet Masks not Supported

You cannot use Delegate proxy settings to specify the Cluster Service Network CIDR notation and make the Delegate bypass the proxy to talk to the K8s API.

Harness does not allow any methods of representing a subnet mask.

The mask should be set in the cluster itself. For example:


```
kubectl -n default get service kubernetes -o json | jq -r '.spec.clusterIP'
```
