---
title: Inbound Endpoints
description: This topic provides an overview of the endpoints sdks use when connecting to the Proxy.
sidebar_position: 55
---

These are the endpoints requested by sdks when they communicate with the Relay Proxy. These differ depending on if a client or server sdk is used.

Your protocol, domain and port may differ depending on your configuration. The urls below are for a Relay Proxy running locally on the default port 7000 in HTTP mode.

### Server SDK
* `POST http://localhost:7000/client/auth` - authenticates api key

* `GET http://localhost:7000/client/client/env/${ENV_ID}/feature-configs` - fetches flag data

* `GET http://localhost:7000/client/env/${ENV_ID}/target-segments` - fetches target group data 

* `GET http://localhost:7000/client/env/${ENV_ID}/stream` - initialises long-lived stream to listen for events

* `GET http://localhost:7000/client/env/${ENV_ID}/feature-configs/${FLAG_NAME}` - fetches updated flag data after a flag stream event comes in

* `GET http://localhost:7000/client/env/${ENV_ID}/target-segments/${GROUP_NAME}` - fetches updated target group data after a target group stream event comes in

* `POST http://localhost:7000/metrics` - sends sdk metrics to the Relay Proxy which then collects and forwards these to Harness SaaS

### Client SDK
* `POST http://localhost:7000/client/auth` - authenticates api key

* `GET http://localhost:7000/client/client/env/${ENV_ID}/target/${TARGET_IDENTIFIER}/evaluations` - fetches all evaluations for this target

* `GET http://localhost:7000/client/env/${ENV_ID}/stream` - initialises long lived stream to listen for events

* `GET http://localhost:7000/client/env/${ENV_ID}/target/${TARGET_IDENTIFIER}/evaluations/${FLAG_IDENTIFIER}` - fetches updated flag evaluation after a flag stream event is received 

* `POST http://localhost:7000/metrics` - sends sdk metrics to the Relay Proxy which then collects and forwards these to Harness SaaS

### Other Endpoints
Other endpoints you may need to allow.

* `GET http://localhost:7000/health` - returns details on the health of the Relay Proxy instance and it's dependencies


## Protocols
By default all requests to the proxy are made using HTTP on port 7000. This can be configured, see [Configuration](./configuration.md) for details.

The /stream request is a long lived SSE connection that receives messages over time and may need special network configuration to be allowed in corporate environments. Optionally sdks can disable streaming and poll on an interval for updates instead, see docs for your particular sdk for details.

## Domains
This will depend on where you run your Relay Proxy. 