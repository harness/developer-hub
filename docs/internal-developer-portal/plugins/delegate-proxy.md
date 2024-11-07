---
title: Architecture of IDP Plugins
sidebar_label: Architecture of IDP Plugins
description: This page describes the architecture of Plugins (including Custom Plugins) and talk about Configuration, Backend Proxy and Delegate Proxy.
sidebar_position: 200
---

This page describes the architecture of plugins in IDP, including custom plugins and explains the concepts such as Backend proxy and Delegate proxy.

## Types Of Plugins

Harness IDP supports the following the types pf plugins in terms of accessing the data through API:

1. **Frontend Plugins:** Usually you display the data that can be accessed using the API directly from a publicly available source without any authentication.
2. **Frontend Plugins with Proxy Enabled:** (Most Common) You can configure plugins using a Backend Proxy for an existing API. The Backend Proxy helps you to decorate the requests with authentication headers. It is based on the [Backstage proxy](https://backstage.io/docs/plugins/proxying/) feature.
3. **Plugins with both Frontend and Backend:** Some plugins also come with a backend of their own. We do not support adding custom backends as part of our [Custom Plugins](/docs/internal-developer-portal/plugins/custom-plugins/overview) feature.

## Backend Proxy vs Delegate Proxy

| Term               | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend Proxy**  | Harness IDP has a feature called Backend Proxy also known as [ Backstage Proxy ](https://backstage.io/docs/plugins/proxying/) or Plugin Proxy - that can be used to add proxy routes in the backend for third party APIs. A Backend Proxy is needed when a plugin requires authentication and the tokens need to be stored in the backend. This proxy can be used to handle tasks such as HTTP termination, CORS handling, injecting static secrets (e.g., Authorization headers), and leveraging other proxy features like retries, failover, health checks, routing, request logging, and rewrites. Take a look at an example of how the Backend Proxy looks in [Harness IDP plugin configurations](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/pagerduty/#application-configuration-yaml). |
| **Delegate Proxy** | Delegate Proxy in IDP is an HTTP interceptor in the backend which helps plugins connect to systems which are not accessible from the Harness SaaS platform. They use a [ Harness Delegate ](/docs/platform/delegates/delegate-concepts/delegate-overview/) which is a service you run in your local network or VPC to connect your artifacts, infrastructure, collaboration, verification, and other providers with Harness.                                                                                                                                                                                                                                                                                                                                                                                                            |

## When is a Delegate Proxy needed?

There are two scenarios when you need to add a Delegate Proxy when configuring an IDP plugin (including custom plugins).

1. A Delegate Proxy is needed when you have a plugin which needs to connect to an internal system of yours which is not accessible directly from the Harness SaaS platform. For example, [the Kubernetes plugin](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/kubernetes/#delegate-proxy).
2. A Delegate Proxy is also needed if the secrets used in the Plugin's configuration are not stored in Harness built-in secret manager, but are stored on your own infrastructure (e.g. Cloud Provider's secret manager, HashiCorp Vault, etc.)

## Architecture Diagrams

### No Proxy used, direct connection

In this case, the Plugin connects directly to a third party provider without using either Backend Proxy or a Delegate Proxy. This is rare since most third party providers require authenticated requests.

<DocImage path={require('./static/without-delegate-proxy.png')} />

### Backend Proxy used to access a public system. No Delegate Proxy needed.

In this case the user is trying to display data in the plugin, that is fetched using an API that requires authenticated calls. This is a common use-case.


<DocImage path={require('./static/backend-proxy.png')} />

### Backend Proxy used to access an internal system using a Delegate Proxy

In this case, the plugin connects to an internal system using both Backend Proxy and a Delegate Proxy. The request to delegate proxy goes through an interceptor which checks for the host as it is required by the delegate proxy. 

<DocImage path={require('./static/del-back-proxy.png')} />

## Note

:::info

For the delegate interceptor to work, the plugin must make requests to the backend proxy. If the plugin directly calls any third-party provider, the request will come from the developer's browser. As a result, IDP won't be able to intercept the request and pass it through the Delegate.

:::

Let's understand how the Delegate Proxy works, when you configure a plugin you get option to enable plugin proxy using a delegate, and once the proxy is enabled the Harness Interceptor sends the information provided as part of proxy configuration to Delegate Proxy which in-turn accesses the internal service of present behind a private network usually in customer's infrastructure using Delegate installed on that infrastructure. In case the API endpoints used in the plugins are publicly accessible, these are fetched directly into the Plugin UI. In case you have multiple delegates the delegate information is retrieved from the DB based on the selection user has done.
