---
title: Enable TLS
description: This topic contains information on how to enable TLS in the Proxy
sidebar_position: 35
redirect_from:
  - /docs/feature-flags/relay-proxy/tls
---

There are two ways to configure the Relay Proxy to accept HTTPS requests:

* **External TLS (recommended)**

	The recommended way to connect to the Relay Proxy using TLS is to place a reverse proxy, such as nginx, in front of the Relay Proxy. Then all connected SDKs must make requests to the reverse proxy URL instead of hitting the Relay Proxy directly.

	![TLS Setup](images/TLS.png?raw=true)

	A sample docker compose for this architecture is included in this [examples folder](https://github.com/harness/ff-proxy/tree/main/examples/tls_reverse_proxy) in GitHub.

* **Native TLS**

	You can configure the Relay Proxy to start with HTTPS enabled. This can be configured using the [TLS configuration options](/docs/feature-flags/use-ff/relay-proxy/configuration#tls). 

	This does not provide every fine-grained configuration option available to secure servers. If you require more control, the best option is to use a program made for this purpose, and use the **External TLS** option.

	![TLS Setup](images/native_tls.png?raw=true)

