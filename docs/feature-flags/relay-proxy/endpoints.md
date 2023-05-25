---
title: Endpoints
description: This topic provides an overview of the endpoints the Proxy uses when it connects to SASS Feature Flags
5idebar_position: 60
---

These are the endpoints requested by the Relay Proxy. These are listed in the order they're used:
- [Startup](#basic-startup)
- [Start SDK per API key](#start-sdks)
- [Periodic requests/polls](#periodic-requestspolls)

The base URL  of these endpoints is configurable if you need to pass it through a filter or another proxy. See [Configuration reference](/docs/feature-flags/relay-proxy/configuration) for details.

## Basic startup

This is the basic data fetched on startup. This fetches the account, project, and environment information required for the Relay Proxy to initialise. This will page through all projects and environments in an account, so it may make multiple requests.

* `GET https://app.harness.io/gateway/cf/admin/projects` - fetches account projects

* `GET https://app.harness.io/gateway/cf/admin/environments` - fetches account environments

* `GET https://app.harness.io/gateway/cf/admin/targets` - fetches environment target data (optional - see TARGET_POLL_DURATION config option). This pages through the targets so may make multiple requests.

## Start SDKs

These requests run per each valid API  key configured. This authenticates, fetches flag/target group data and sets up the stream. These are required to start up correctly.

* `POST https://config.ff.harness.io/api/1.0/client/auth` - authenticates API  key

* `GET https://config.ff.harness.io/api/1.0/client/env/${ENV_ID}/feature-configs` - fetches flag data

* `GET https://config.ff.harness.io/api/1.0/client/env/${ENV_ID}/target-segments` - fetches target group data

* `GET https://config.ff.harness.io/api/1.0/client/env/${ENV_ID}/stream` - initialises long lived stream to listen for events

* `GET https://config.ff.harness.io/api/1.0/client/env/${ENV_ID}/feature-configs/${FLAG_NAME}` - fetches updated flag data after a flag stream event comes in

* `GET https://config.ff.harness.io/api/1.0/client/env/${ENV_ID}/target-segments/${GROUP_NAME}` - fetches updated target group data after a target group stream event comes in


## Periodic requests/polls

These requests happen either on demand or by various timers while the Relay Proxy is running.

* `GET https://app.harness.io/gateway/cf/admin/targets` - polls the latest environment target data (optional - see TARGET_POLL_DURATION config option). This pages through the targets so may make multiple requests.

* `POST https://events.ff.harness.io/api/1.0/metrics` - sends metrics (optional - see METRIC_POST_DURATION config option).

* `POST https://config.ff.harness.io/api/1.0/client/auth` - when a client authenticates with the Relay Proxy, Harness forwards this request to the remote server to register the target.

## Sequence diagram for proxy requests

Here is a sequence diagram describing the proxy calls:

![Call Flow](./images/call_flow.png "Call Flow")
