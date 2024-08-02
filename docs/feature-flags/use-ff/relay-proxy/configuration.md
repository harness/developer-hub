---
title: Configuration reference
description: This topic describes how to configure the Relay Proxy.
sidebar_position: 30
redirect_from:
  - /docs/feature-flags/relay-proxy/configuration
---

## General configuration guidelines

The following is general configuration information.

### Docker container
When running the docker container, you must pass configuration as environment variables. This is most commonly done by passing a `.env` file when starting the container.

### Compiled exe's
When running a compiled exe you can run either passed flags or environment variables.

### File format for .env
The format of the `.env` file is a standard `variable=value` format. See the examples directory for a  [sample `.env` file](https://github.com/harness/ff-proxy/tree/main/examples/tls_reverse_proxy/.env)

### Passing .env file
When running as a docker container the `.env` file can be passed like this:

`docker run -d -p 7000:7000 --env-file .env ff-proxy`

### Passing flags
When running the compiled exe's flags can be passed like this:

`./ff-proxy.exe --admin-service-token=${TOKEN} --auth-secret=${SECRET} --account-identifier=${ACCOUNT_IDENTIFIER} --org-identifier=${ORG_IDENTIFIER} --api-keys=${API_KEYS}`

## Configuration options

### Required configuration

When running in online mode, these configuration options are the minimum required to run the relay proxy.

| Environment Variable | Flag                | Description                                                                                                                           | Type   | Default |
|----------------------|---------------------|---------------------------------------------------------------------------------------------------------------------------------------|--------|---------|
| ACCOUNT_IDENTIFIER   | account-identifier  | An account identifier to load remote config.                                                                                          | string |         |
| ADMIN_SERVICE_TOKEN  | admin-service-token | Token to use to communicate with the ff service                                                                                       | string |         |
| ORG_IDENTIFIER       | org-identifier      | An org identifier to load remote config.                                                                                              | string |         |
| API_KEYS             | api-keys            | API keys to connect with ff-server for each environment. Requires only one server API key per environment in a comma separated string | string |         |

### Redis cache

These are the configuration opitons to connect to redis. Only `REDIS_ADDRESS` is required to connect, the others only need to be set if they differ from the defaults.

| Environment Variable | Flag           | Description                                                        | Type   | Default |
|----------------------|----------------|--------------------------------------------------------------------|--------|---------|
| REDIS\_ADDRESS<br />_(Required)_        | redis-address  | Redis host:port address. See below for info on connecting via TLS  | string |         |
| REDIS_PASSWORD       | redis-db       | (Optional) Database to be selected after connecting to the server. | string |         |
| REDIS_DB             | redis-password | (Optional) Redis password.                                         | int    | `0`       |

**Connecting to Redis via TLS:** 

To connect to a redis instance that has TLS enabled, you prepend `rediss://` to the beginning of your REDIS_ADDRESS URL, for example, `rediss://localhost:6379`.

### Logging

Control the log level.

| Environment Variable | Flag  | Description            | Type    | Default |
|----------------------|-------|------------------------|---------|---------|
| LOG_LEVEL            | log-level | Controls the log level. Valid options are `INFO`, `DEBUG`, and `ERROR` | string | `INFO`   |

### Offline mode

These are the configuration options applicable for running in offline mode

| Environment Variable    | Flag                    | Description                                                                                                    | Type    | Default |
|-------------------------|-------------------------|----------------------------------------------------------------------------------------------------------------|---------|---------|
| GENERATE_OFFLINE_CONFIG | generate-offline-config | if set to true, the proxy produces an offline configuration in the mounted /config directory, then terminates. | boolean | `false`   |
| CONFIG_DIR              | config-dir              | Specify a path for the offline config directory. The default is /config.                                       | string  | `/config` |
| OFFLINE                 | offline                 | Enables side loading of data from the config directory.                                                        | boolean | `false`   |


### Port

Adjust the port the relay proxy runs on.

| Environment Variable | Flag | Description                                | Type | Default |
|----------------------|------|--------------------------------------------|------|---------|
| PORT                 | port | Port that the proxy service is exposed on. | int  | `7000`    |

:::info note
When running the docker container PORT cannot be set to 8000 as it is reserved for an internal service.
:::

### Connection mode between Relay Proxy and Harness SaaS

Some corporate networks may be highly restrictive on allowing SSE connections. If you find that the Relay Proxy starts successfully but fails to receive any updates you may want to use these settings to force the Relay Proxy to poll for changes instead of streaming them.

| Environment Variable | Flag                 | Description                                                                                                                 | Type    | Default |
|----------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------|---------|---------|
| FLAG_STREAM_ENABLED  | flag-stream-enabled  | Specifies whether the proxy connects to Harness in streaming mode to get flag changes. Set to `false` if your network absorbs SSE events. | boolean | `true`    |
| FLAG_POLL_INTERVAL   | flag-poll-interval   | How often in seconds the proxy should poll for flag updates (if stream not connected)                                       | int     | `1`       |

### Adjust timings

Adjust how often certain actions are performed.

| Environment Variable | Flag                 | Description                                                                                 | Type | Default |
|----------------------|----------------------|---------------------------------------------------------------------------------------------|------|---------|
| TARGET_POLL_DURATION | target-poll-duration | How often in seconds the proxy polls feature flags for Target changes. Set to 0 to disable. | int  | `60`      |
| METRIC_POST_DURATION | metric-post-duration | How often in seconds the proxy posts metrics to Harness. Set to 0 to disable.               | int  | `60`      |
| HEARTBEAT_INTERVAL   | heartbeat-interval   | How often in seconds the proxy polls pings it's health function. Set to 0 to disable.       | int  | `60`      |

### TLS

| Environment Variable | Flag        | Description                                                                 | Type   | Default |
|----------------------|-------------|-----------------------------------------------------------------------------|--------|---------|
| TLS_ENABLED          | tls-enabled | If `true`, the proxy will use the tlsCert and tlsKey to run with https enabled. | boolean   | `false`   |
| TLS_CERT             | tls-cert    | Path to TLS cert file. Required if TLS enabled is true.                     | string |         |
| TLS_KEY              | tls-key     | Path to TLS key file. Required if TLS enabled is `true`.                      | string |         |

### Harness URLs

You may need to adjust these if you pass all your traffic through a filter or proxy rather than sending the requests directly. 

| Environment Variable | Flag           | Description                                 | Type   | Default                              |
|----------------------|----------------|---------------------------------------------|--------|--------------------------------------|
| ADMIN_SERVICE        | admin-service  | URL of the ff admin service                 | string | `https://app.harness.io/gateway/cf`    |
| CLIENT_SERVICE       | client-service | URL of the ff client service                | string | `https://config.ff.harness.io/api/1.0` |
| METRIC_SERVICE       | metric-service | URL of the ff metric service                | string | `https://events.ff.harness.io/api/1.0` |
| SDK_BASE_URL         | sdk-base-url   | URL for the embedded SDK to connect to      | string | `https://config.ff.harness.io/api/1.0` |
| SDK_EVENTS_URL       | sdk-events-url | URL for the embedded SDK to send metrics to | string | `https://events.ff.harness.io/api/1.0` |

### Auth

| Environment Variable | Flag        | Description                                                                  | Type    | Default |
|----------------------|-------------|------------------------------------------------------------------------------|---------|---------|
| BYPASS_AUTH          | bypass-auth | Bypasses authentication for connecting sdks                                  | boolean | `false`   |
| AUTH_SECRET          | auth-secret | The secret used for signing the authentication token generated by the Proxy. | string  | `secret`  |

### Development

Flags that can help when developing the proxy.

| Environment Variable | Flag                 | Description                    | Type    | Default |
|----------------------|----------------------|--------------------------------|---------|---------|
| PPROF                | pprof                | Enables pprof on port 6060     | boolean | `false`   |
| GCP_PROFILER_ENABLED | gcp-profiler-enabled | Enables the gcp cloud profiler | boolean | `false`   |
