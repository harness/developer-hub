---
title: Caching options
description: This topic provides an overview of how the Proxy's in memory cache functions
sidebar_position: 40
redirect_from:
  - /docs/feature-flags/relay-proxy/cache_options
---

## In memory cache

By default, the Relay Proxy will store all flag data in memory on startup.

### FAQs

* **What happens if network connection is lost?**

	If connection is lost to Harness servers, the Relay Proxy will continue to serve the cached values to connected SDKs. 

	It will continue to attempt to reconnect, and once connection is established, will sync down the latest data then continue as normal. 

* **What happens if changes are made on SaaS while connection is lost?**

	Once connection is reestablished with SaaS all flag data is pulled down again. This means even if changes were made on SaaS e.g. flag toggles during the outage they will be picked up once connection is reestablished.

* **What happens if no network connection is available on startup?**

	The main potential issue with running in memory mode is that when the proxy is restarted it will lose all cached data. This means if no connection can be established at the time of startup the Relay Proxy won't be able to serve flags to connected sdks. 

	This issue can be avoided by connecting to a redis cache for persistent storage, see [Redis cache](#redis-cache) below for more details.

## Redis cache

You can optionally configure the Relay Proxy to store flag data in redis. See [configuration](./configuration.md) for details on setting this up.

The Relay Proxy does not currently support clustered Redis or Redis Sentinel.

### FAQs

#### Can the Relay Proxy be connected to an Elasticache redis instance?
Yes. Relay Proxy can connect to Elasticache redis instances as long as cluster mode is disabled. 

#### Can I connect to Redis instances which have TLS enabled?
Yes. To connect to a redis instance which has TLS enabled you just need to prepend the REDIS_ADDRESS location with `rediss://` e.g. `rediss://localhost:6379`.

#### What happens if network connection is lost?
If connection is lost to Harness servers the Relay Proxy will continue to serve the cached values to connected sdks.

It will continue to attempt to reconnect and once connection is established will sync down the latest data then continue as normal.

#### What happens if changes are made on SaaS while connection is lost?
Once connection is reestablished with SaaS all flag data is pulled down again. This means even if changes were made on SaaS e.g. flag toggles during the outage they will be picked up once connection is reestablished.

#### What happens if no network connection is available on startup?
If the Relay Proxy has previously store flag data in redis then even with no connection to Harness servers it will startup successfully using the cached data and serve connected sdks.

This will essentially launch the Relay Proxy in offline mode, as it will not regain connection once internet connection is restored.

