---
title: Configure Delegate Proxy Settings
description: All of the Delegate settings include proxy settings you can use to change how the Delegate connects to the Harness Manager. By default, the Harness Delegate uses HTTP and HTTPS in its Proxy Scheme se…
sidebar_position: 210
helpdocs_topic_id: pfim3oig7o
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

All of the Delegate settings include proxy settings you can use to change how the Delegate connects to the Harness Manager.

By default, the Harness Delegate uses HTTP and HTTPS in its Proxy Scheme settings.

In this topic:

* [Shell Script Proxy Settings](configure-delegate-proxy-settings.md#shell-script-proxy-settings)
* [Docker Proxy Settings](configure-delegate-proxy-settings.md#docker-proxy-settings)
* [Kubernetes Proxy Settings](configure-delegate-proxy-settings.md#kubernetes-proxy-settings)

## Shell Script Proxy Settings

Run the **setup-proxy.sh** script included in the Delegate download and provide the proxy information.

* **Proxy URL** - The syntax for the proxy URL must be of the form `http[s]://<host>[:port]`.

The following settings are optional:

* **Username** - Enter username if required.
* **Password** - Enter password.
* **Suffixes** - Enter a comma-separated list of suffixes that do not need the proxy. For example, `.company.com,hostname,etc`. Do not use leading wildcards.
* **Manager** - Select Yes or No to have the Delegate bypass proxy settings to reach the Harness Manager.

The output will look something like this:


```
PROXY_HOST=example.company.com  
PROXY_PORT=9091  
PROXY_SCHEME=https  
PROXY_USER=foo  
PROXY_PASSWORD_ENC=9uQekvDG8fU=  
NO_PROXY=.company.com  
PROXY_MANAGER=false
```
`PROXY_MANAGER=false` means that we selected Yes in response to the **Bypass proxy settings to reach Harness manager?** question.

`PROXY_SCHEME` is for the Delegate to reach the proxy server, not for Delegate connections beyond that.

Do not edit the **setup-proxy.sh** script. Simply run the script and provide the proxy information.

## Docker Proxy Settings

The proxy settings are in the **launch-harness-delegate.sh** file:


```
-e PROXY_HOST= \  
-e PROXY_PORT= \  
-e PROXY_SCHEME= \  
-e PROXY_USER= \  
-e PROXY_PASSWORD= \  
-e PROXY_MANAGER= \  
-e NO_PROXY= \
```
## Kubernetes Proxy Settings

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

## In-Cluster Kubernetes Delegate with Proxy

If an in-cluster Kubernetes Delegate has a proxy configured, then `NO_PROXY` must contain the cluster master IP. This enables the Delegate to skip the proxy for in-cluster connections.

The `NO_PROXY` environment variable takes an IP only, not a CIDR.

