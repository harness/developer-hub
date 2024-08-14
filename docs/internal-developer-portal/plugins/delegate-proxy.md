---
title: Architecture of IDP Plugins
sidebar_label: Architecture of IDP Plugins
description: This page describes the architecture of Plugins (including Custom Plugins) and talk about Configuration, Backend Proxy and Delegate Proxy.
sidebar_position: 200
---

## Types Of Plugins
Harness IDP supports the following the types pf plugins in terms of accessing the data through API:

1. **Frontend Plugins:** Usually you display the data that can be accessed using the API directly from a publicly available source without any authentication. 
2. **Frontend Plugins with Proxy Enabled:** You can configure Plugins using Delegate to use Backstage proxy for an already existing API
3. **Plugins with both Frontend and Backend:** You can create a backend plugin if you are implementing the API alongside your frontend plugin

## Why is backend proxy needed?

IDP has a proxy for the backend, that can be used to easily add proxy routes to downstream APIs. A proxy is required when plugins require authentication or in cases like tokens cannot be stored on the frontend. This proxy can be used to handle tasks such as HTTPS termination, CORS handling, injecting static secrets (e.g., Authorization headers), and leveraging other proxy features like retries, failover, health checks, routing, request logging, and rewrites.

## When do you need a delegate proxy?

### Without Using Delegate Proxy

In this case the user is trying to display data in the plugin, that is fetched using an API that doesn't requires any authentication. 

<DocImage path={require('./static/without-delegate-proxy.png')} />

### Using Backend Proxy with Delegate to access External Systems

In this case the user is trying to display data in the plugin, that is fetched using an API that requires authenticated calls. 

<DocImage path={require('./static/backend-proxy.png')} />


### Using Backend Proxy with Delegate to access Internal Systems

In this case the user is trying to display data in the plugin, that is already present in their own infrastructure, so they just need delegate to relay those information to the plugin using backend proxy. 

<DocImage path={require('./static/del-back-proxy.png')} />


## How does delegate proxy work?

:::info

For the delegate interceptor to work, the plugin must make requests to the backend proxy. If the plugin directly calls any third-party provider, the request will come from the developer's browser. As a result, IDP won't be able to intercept the request and pass it through the Delegate.

:::

Let's understand how this works, when you configure a plugin you get option to enable plugin proxy using a delegate, and once the proxy is enabled the Harness Interceptor sends the information provided as part of proxy configuration to Delegate Proxy which in-turn accesses the internal service of present behind a private network usually in customer's infrastructure using Delegate installed on that infrastructure. Incase the API endpoints used in the plugins are publicly accessible, these are fetched directly into the Plugin UI. In case you have multiple delegates the delegate information is retrieved from the DB based on the selection user has done. 

