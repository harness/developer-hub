---
title: In Memory Cache
description: This topic provides an overview of how the Proxy's in memory cache functions
sidebar_position: 40
helpdocs_topic_id: q0kvq8nd2o
helpdocs_category_id: 0dqv0mh8xu
helpdocs_is_private: false
helpdocs_is_published: true
---

# In Memory Cache

By default, the Relay Proxy will store all flag data in memory on startup.

### What happens if network connection is lost?
If connection is lost to Harness servers the Relay Proxy will continue to serve the cached values to connected sdks. 

It will continue to attempt to reconnect and once connection is established will sync down the latest data then continue as normal. 

### What happens if changes are made on SaaS while connection is lost?
Once connection is reestablished with SaaS all flag data is pulled down again. This means even if changes were made on SaaS e.g. flag toggles during the outage they will be picked up once connection is reestablished.

### What happens if no network connection is available on startup?
The main potential issue with running in memory mode is that when the proxy is restarted it will lose all cached data. This means if no connection can be established at the time of startup the Relay Proxy won't be able to serve flags to connected sdks. 

This issue can be avoided by connecting to a redis cache for persistent storage, see [redis cache](redis_cache.md) for more details.
