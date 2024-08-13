---
title: Using Delegate Proxy in Plugins
sidebar_label: Delegate Proxy
description: Learn about how you can use delegates to configure plugins.
sidebar_position: 200
---

Delegate Proxy can be used while configuring plugins to connect to systems that are behind a private network or can't be accessible publicly. 

Let's understand how this works, when you configure a plugin you get option to enable plugin proxy using a delegate, and once the proxy is enabled the Harness Interceptor sends the information provided as part of proxy configuration to Delegate Proxy which in-turn accesses the internal service of present behind a private network usually in customer's infrastructure using Delegate installed on that infrastructure. Incase the API endpoints used in the plugins are publicly accessible, these are fetched directly into the Plugin UI. 


<DocImage path={require('./static/delegate-proxy.png')} />