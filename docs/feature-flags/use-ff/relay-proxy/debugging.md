---
title: Debugging
description: This topic contains information on how to debug common issues with the Proxy
sidebar_position: 70
redirect_from:
  - /docs/feature-flags/relay-proxy/debugging
---

# Debugging

### Outbound requests
To learn more about what requests the Relay Proxy sends see [Endpoints](/docs/feature-flags/use-ff/relay-proxy/outbound_endpoints).

### Debug mode

To enable debug logging, set the environment variable `DEBUG=true`. For more information on configuration, go to [Configuration reference](/docs/feature-flags/use-ff/relay-proxy/configuration).

### Healthcheck endpoint
The Relay Proxy has a `/health` endpoint that can be queried to check the health of all the Relay Proxies dependencies. This can be hit using a request like this: 

`curl https://localhost:7000/health`

The response looks something like this:

```
{
  "environments": [
    {
      "id": "0000-0000-0000-0000-0000",
      "streamStatus": {
        "state": "CONNECTED",
        "since": 1687188451
      }
    },
    {
      "id": "0000-0000-0000-0000-0002",
      "streamStatus": {
        "state": "DISCONNECTED",
        "since": 1687188451
      }
    }

  ],
  "cacheStatus": "healthy"
}
```
- `id` is the environments ID.
- `state` represents the state of the Proxy -> SaaS feature flags stream for an environment:
    - `INITIALIZING` means the proxy is initializing a stream with SaaS feature flags for the environment.
    - `CONNECTED` means the proxy has a healthy stream connection with SaaS feature flags.
    - `DISCONNECTED` means the proxy has an healthy stream connection with SaaS feature flags and it will poll for changes.
- `since` represents the time that `state` was last updated.
- `cacheStatus` represents the state of the connection between the Proxy and the cache.


If you've configured a custom port using the PORT environment variable, your healthcheck should point at that port instead, for example, for port 10000 it would be set to:

`curl https://localhost:10000/health`

If using a [Redis cache](/docs/feature-flags/use-ff/relay-proxy/cache_options#redis-cache), the cache healthcheck verifies that Harness could successfully ping the Redis client.

There is a health entry for each environment you've configured the Relay Proxy with. This is displayed if your streaming connection for these environments is healthy. You can find which friendly environment identifier this UUID maps to by checking your proxy startup logs.

### CURL Requests

The Relay Proxy makes these requests to Harness SaaS on startup. Connected SDKs also make these requests to the Relay Proxy when they startup. As such, the requests can be used to help diagnose connection issues either outbound from the Relay Proxy, or inbound to it.

On startup, SDKS and the Relay Proxy make these four requests for each environment you have configured the proxy to connect to:

- /auth
- /feature-configs
- /target-segments
- /stream

You can find examples of how to send requests directly to these endpoints in our [Sample Requests](/docs/feature-flags/use-ff/relay-proxy/sample_curl_requests).

## Common Issues

### The Relay Proxy fetched flags but doesn't receive updates made on SaaS

This is usually due to firewall issues on your internal network. With more stringent rules, the `/stream` request can receive a 200 response, but the firewall blocks any of the SSE events from being sent down the open connection. You can test this using some of the sample curl requests above.

**Short term workaround:** The quickest solution is to disable streaming connections between the Relay Proxy and Harness SaaS. You can do this by setting the `FLAG_STREAM_ENABLED` config option to `false`. This forces the Relay Proxy to poll once every minute for updated flag/target group values, instead of receiving changes through the stream.  

**Long term fix:** The long term fix is to diagnose and resolve whatever firewall rules are causing the SSE events to be blocked before they can reach the Relay Proxy.
