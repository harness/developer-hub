---
title: Load Balancing
description: This topic contains information on how to use multiple Proxy's with a loadbalancer
sidebar_position: 70
---

# Load Balancing
As load increases you may want to horizontally scale your proxy instances to accommodate this. 

All connected sdks should make requests to the load balancer url instead of hitting the Relay Proxy directly. 

A sample docker compose for this architecture along with info on running is included in our [examples folder](https://github.com/harness/ff-proxy/tree/main/examples/load_balancing).

### Load balancing using in memory cache
When using an in memory cache instead of redis it's advised to use ip based routing instead of round-robin within your load balancer. This is because when targets authenticate we store their attributes in the in memory cache, so clients will only be able to correctly retrieve flags from the same Relay Proxy they authenticated with. An example of this config is included in the [example nginx config](https://github.com/harness/ff-proxy/blob/main/examples/load_balancing/config/default.conf).

### Load balancing using redis cache
When using redis as a cache either round-robin or ip based load balancing can be used. This is because all Relay Proxies share a common redis cache and can read target attributes written by other Relay Proxies.

### Architecture diagram
![Load Balance](./images/load_balance.png "Load Balance")
