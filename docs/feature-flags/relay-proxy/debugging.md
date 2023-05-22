---
title: Debugging
description: This topic contains information on how to debug common issues with the Proxy
sidebar_position: 50
---

# Debugging

### Outbound requests
To learn more about what requests the Relay Proxy sends see [Endpoints](./endpoints.md).

### Debug mode
See [Configuration](./configuration.md) for instructions on enabling debug mode for more detailed logging on requests being sent and handled by the Relay Proxy.

### Healthcheck endpoint
The Relay Proxy has a `/health` endpoint that can be queried to check the health of all the Relay Proxies dependencies. This can be hit using a request like this: 

`curl https://localhost:7000/health`

The response will look something like this:

`{"cache":"healthy","env-0000-0000-0000-0000-0000":"healthy", "env-0000-0000-0000-0000-0002":"healthy"}`

If you've configured a custom port using the PORT environment variable your healthcheck should point at that port instead e.g. for port 10000 it would be set to:

`curl https://localhost:10000/health`

If using a Redis cache the cache healthcheck will verify that we could successfully ping the Redis client.

You will have a health entry for each environment you've configured the Relay Proxy with. This will display if your streaming connection for these environments is healthy. You can find which friendly environment identifier this UUID maps to by checking your proxy startup logs.


### Sample CURL Requests
These requests are made by the Relay Proxy to Harness SaaS on startup. They are also made by connected sdks to the Relay Proxy when they startup. As such they can be used to help diagnose connection issues either outbound from the Relay Proxy or inbound to it.

On startup SDKS make 4 requests, the Relay Proxy makes these 4 requests for each environment you have configured it to connect to:
- /auth
- /feature-configs
- /target-segments
- /stream

You can find examples of how to send requests directly to these endpoints in our [Sample Requests](./sample_curl_requests.md).

## Common Issues
### The Relay Proxy has fetched flags but doesn't receive any updates made on SaaS
This is usually due to firewall issues on your internal network. With more stringent rules what can happen is that the `/stream` request receives a 200 response but the firewall blocks any of the sse events from being sent down the open connection. This can be tested using some of the sample curl requests provided above.

**Short term workaround:** The quickest solution is to disable streaming connections between the Relay Proxy and Harness SaaS. This can be done by setting the `FLAG_STREAM_ENABLED` config option to false. This will force the Relay Proxy to poll once every minute for updated flag/target group values instead of receiving changes through the stream.  

**Long term fix:** The longest term fix is to diagnose and resolve whatever firewall rules are causing the sse events to be blocked before they can reach the Relay Proxy.
