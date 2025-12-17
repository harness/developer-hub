---
title: Harness Proxy
sidebar_label: Harness Proxy
sidebar_position: 7
description: Learn about the Harness Forward Proxy, which allows you to establish a single connection point from your FME SDKs to Harness services by using a forward or reverse proxy mode.
---

## Overview

Enterprise customers often operate in environments with controlled egress points, where all outgoing network traffic must pass through approved gateways. Without a proxy, each new delegate or SDK instance may require individual firewall exceptions and cross-team approvals, creating operational friction at scale.

Harness Proxy simplifies this by acting as a single, authorized egress point for all Harness-related traffic. The Harness Proxy also supports reverse proxy mode, which allows SDK traffic or other client requests to be routed from your infrastructure to Harness services through a centralized entry point. 

This allows you to:

- Centralize and control inbound and outbound traffic from your infrastructure
- Maintain compliance with enterprise security policies
- Enable advanced authentication and authorization, including mTLS and JWT validation
- Support long-lived connections and encrypted payloads without additional proxy-side configuration
- Expose Harness endpoints through a centralized reverse proxy for simplified client access

The Harness Proxy is fully customer-deployed, giving you flexibility to run it in your preferred environment (Docker, Kubernetes, or custom deployments) while keeping sensitive configuration and certificates under your control.

## How Harness Proxy works

The Harness Proxy runs on OpenResty, an NGINX-based platform chosen for its scalability, reliability, and flexibility. All configuration is externalized, allowing you to mount volumes into the container for:

- TLS certificates and private keys for secure tunnels
- JWKS files for JWT validation

The proxy supports forward and reverse proxy modes:

- **Forward Proxy**: SDKs establish opaque tunnels through the proxy to Harness FME servers. Once deployed, SDKs establish opaque tunnels through the proxy to the Harness FME servers, and all traffic is securely forwarded without inspecting payloads.
- **Reverse Proxy**: Clients or SDKs can connect to pre-defined URLs exposed by the proxy, which forwards requests to the appropriate Harness backend services. Reverse proxy supports mTLS and location presets, including a built-in FME preset or custom location mappings. The proxy performs local TLS termination and re-establishes a secure upstream connection, handling routing while forwarding traffic without inspecting payloads.

### Security

Harness Proxy provides a layered, opt-in security model:

- **TLS/mTLS**: Secure tunnels are established using X.509 certificates and private keys that you provide. The proxy can request and validate client certificates, rejecting connections that fail validation.
- Authorization schemes: Each server instance can be configured with one of the following authentication methods.
  - **Basic Auth**: Credentials sent in the Proxy-Authorization header (requires TLS).
  - **Digest Auth**: Credentials hashed with server-provided parameters to avoid sending plaintext credentials.
  - **Bearer Auth**: JWT-based tokens signed by the user and validated with JWKS files.

This allows flexible deployment scenarios while maintaining enterprise-grade security.

### Supported Transport and Protocols

The proxy supports HTTP and HTTPS tunnels, including long-lived connections such as [server-sent events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events). Traffic remains opaque to the proxy, meaning payloads are encrypted end-to-end, and no additional proxy-side configuration is required to support new endpoints.

## Setup

To get started with Docker:

1. Pull the prebuilt image: `docker pull splitsoftware/fme-proxy`.
1. Run the container with your desired configuration: `docker run --rm --name some-fme-proxy -e HP_PROXIES=main -e HP_main_PORT=3128 -p 3128:3128 splitsoftware/fme-proxy:ubuntu`.
1. Test the connectivity by running a cURL command: `curl -v --proxy http://127.0.0.1:3128 -XGET https://sdk.split.io/api/version`. 

This starts the proxy with a single server instance. The `HFP_PROXIES` environment variable allows multiple server instances with different TLS/auth settings.

## Configuration

Harness Proxy is fully configurable and supports multiple server instances, each with its own port, SSL, authentication, and proxy requirements. Servers are defined in the `HP_PROXIES` variable as a comma-separated list of identifiers (e.g., `server_mtls,server_basic_auth`). All server-specific configuration variables follow the pattern `HP_<server_name>_<config_option>`.

### Global Configuration

These variables allow the proxy to scale efficiently based on deployment environment and traffic load. 

| Variable                | Context | Description                                                   | Default         | Example                         |
| ----------------------- | ------- | ------------------------------------------------------------- | --------------- | ------------------------------- |
| `HP_PROXIES`            | Global  | Comma-separated list of server identifiers.                    | none / required | `server_mtls,server_basic_auth` |
| `HP_WORKER_PROCESSES`   | Global  | Number of NGINX worker processes. Ideally matches CPU threads. | 4               | 8                               |
| `HP_WORKER_CONNECTIONS` | Global  | Max connections per worker.                                    | 1024            | 2048                            |
| `HP_LOG_LEVEL`          | Global  | Maximum level of unfiltered logs.                              | info            | `debug`                           |

### Server-Specific Configuration

These variables allow you to tailor each proxy instance’s ports, TLS, authentication, and routing to meet your security and traffic requirements.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="forward-reverse-option">
<TabItem value="forward" label="Forward Proxy Server Configuration">

| Variable                                  | Description                                                                                   | Default                                                                                                | Example                           |
| ----------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `HP_<SERVER_NAME>_TYPE`                   | Must be `FORWARD`.                                                                            | `FORWARD`                                                                                              | `FORWARD`                         |
| `HP_<SERVER_NAME>_PORT`                   | Port on which this server listens.                                                            | Required                                                                                               | `3128`                            |
| `HP_<SERVER_NAME>_SSL`                    | Enable TLS/mTLS.                                                                              | False                                                                                                  | `true`                            |
| `HP_<SERVER_NAME>_SSL_CERTIFICATE`        | Server certificate for TLS.                                                                   | None / required if SSL enabled                                                                         | `/my_volume/pki/server.crt`       |
| `HP_<SERVER_NAME>_SSL_PRIVATE_KEY`        | Private key for TLS certificate.                                                              | None / required if SSL enabled                                                                         | `/my_volume/pki/server.key`       |
| `HP_<SERVER_NAME>_SSL_CLIENT_CERTIFICATE` | CA certificate to verify client certificates (mTLS).                                          | None                                                                                                   | `/my_volume/pki/client_ca.crt`    |
| `HP_<SERVER_NAME>_AUTH`                   | Authentication scheme (`basic`, `digest`, `bearer`).                                          | None                                                                                                   | `bearer`                          |
| `HP_<SERVER_NAME>_AUTH_BASIC_PASSWD`      | Password file for basic auth.                                                                 | None / required if `auth=basic`                                                                        | `/my_volume/passwd/basic.passwd`  |
| `HP_<SERVER_NAME>_AUTH_DIGEST_PASSWD`     | Password file for digest auth.                                                                | None / required if `auth=digest`                                                                       | `/my_volume/passwd/digest.passwd` |
| `HP_<SERVER_NAME>_AUTH_BEARER_JWKS`       | JWKS file to validate bearer tokens.                                                          | None / required if `auth=bearer`                                                                       | `/my_volume/keys/keys.jwks`       |
| `HP_<SERVER_NAME>_PROXY_THRU`             | Upstream proxy to forward traffic.                                                            | None                                                                                                   | `my-upstream-proxy:3128`          |
| `HP_<SERVER_NAME>_PROXY_THRU_SSL`         | Use TLS to connect to upstream proxy.                                                         | Disabled                                                                                               | `true`                            |
| `HP_<SERVER_NAME>_PROXY_THRU_CA_CERT`     | CA cert to verify upstream proxy TLS.                                                         | None / required if `PROXY_THRU_SSL` enabled                                                            | `/my_volume/pki/ca.crt`           |
| `HP_<SERVER_NAME>_RESOLVER`               | DNS server for upstream host resolution.                                                      | `8.8.8.8`                                                                                              | `127.0.0.53`                      |
| `HP_<SERVER_NAME>_ALLOWED_TARGETS`        | Comma-separated list of allowed `host:port` pairs. Requests outside these hosts are rejected. | `sdk.split.io:443,auth.split.io:443,streaming.split.io:443,events.split.io:443,telemetry.split.io:443` | `api.mycompany.com:443`           |
| `HP_<SERVER_NAME>_ALLOWED_TARGET_PORTS`   | Comma-separated list of allowed ports. Must include all ports in `ALLOWED_TARGETS`.           | `443`                                                                                                  | `443,8443`                        |

</TabItem>

<TabItem value="reverse" label="Reverse Proxy Server Configuration">

| Variable                                           | Description                                                                                                           | Default                                     | Example                            |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ---------------------------------- |
| `HP_<SERVER_NAME>_PORT`                            | Port on which this server listens.                                                                                    | Required                                    | `3129`                             |
| `HP_<SERVER_NAME>_SSL`                             | Enable TLS/mTLS.                                                                                                      | False                                       | `true`                             |
| `HP_<SERVER_NAME>_SSL_CERTIFICATE`                 | Server certificate for TLS.                                                                                           | None / required if SSL enabled              | `/my_volume/pki/server.crt`        |
| `HP_<SERVER_NAME>_SSL_PRIVATE_KEY`                 | Private key for TLS certificate.                                                                                      | None / required if SSL enabled              | `/my_volume/pki/server.key`        |
| `HP_<SERVER_NAME>_SSL_CLIENT_CERTIFICATE`          | CA certificate to verify client certificates (mTLS).                                                                  | None                                        | `/my_volume/pki/client_ca.crt`     |
| `HP_<SERVER_NAME>_PROXY_THRU`                      | Upstream proxy to forward traffic.                                                                                    | None                                        | `my-upstream-proxy:3128`           |
| `HP_<SERVER_NAME>_PROXY_THRU_SSL`                  | Use TLS to connect to upstream proxy.                                                                                 | Disabled                                    | `true`                             |
| `HP_<SERVER_NAME>_PROXY_THRU_CA_CERT`              | CA cert to verify upstream proxy TLS.                                                                                 | None / required if `PROXY_THRU_SSL` enabled | `/my_volume/pki/ca.crt`            |
| `HP_<SERVER_NAME>_RESOLVER`                        | DNS server for upstream host resolution.                                                                              | `8.8.8.8`                                   | `127.0.0.53`                       |
| `HP_<SERVER_NAME>_LOCATIONS`                       | Comma-separated list of reverse proxy locations. Can reference built-in presets (`PRESET:fme`) or custom JSONL files. | Required                                        | `PRESET:fme,PRESET:custom_service` |
| `HP_<SERVER_NAME>_LOCATIONS_SSL_VERIFICATION_CERT` | CA cert to validate SSL connections to upstream targets. Optional; TLS verification skipped if not provided.          | `443`                                        | `/my_volume/pki/ca.crt`            |

### Reverse Proxy locations

When using a reverse proxy server, you can define locations to map incoming paths to upstream services. Locations can reference built-in Harness module presets or be fully customized.

Built-in presets allow you to configure common Harness services. For example, include `PRESET:fme` for FME in the `HP_<SERVER_NAME>_LOCATIONS` variable. This maps the following paths automatically:

| Path             | Target                       |
| ---------------- | ---------------------------- |
| `/fme/sdk`       | `https://sdk.split.io`       |
| `/fme/events`    | `https://events.split.io`    |
| `/fme/auth`      | `https://auth.split.io`      |
| `/fme/streaming` | `https://streaming.split.io` |
| `/fme/telemetry` | `https://telemetry.split.io` |

These paths correspond to the URLs your Harness FME SDKs use when connecting through the reverse proxy.

### Custom locations

For external services or non-standard routes, create a JSONL file with one location definition per line. Each object must include at least `path` and `target`. Additional optional parameters include `buffer` and `read_timeout`.

| Property       | Description                                                      | Default   | Example                     |
| -------------- | ---------------------------------------------------------------- | --------- | --------------------------- |
| `path`         | Local path clients use to reference the proxied host.            | Required  | `/custom/api`               |
| `target`       | URL of the upstream host where requests are forwarded.           | Required  | `https://api.myservice.com` |
| `buffer`       | Whether responses should be buffered.                            | `true`    | `false`                     |
| `read_timeout` | Socket read timeout in seconds (useful for streaming endpoints). | `30`      | `120`                       |

The following code snippet demonstrates an example JSONL file for FME SDKs:

```json
{ "path": "/fme/sdk", "target": "https://sdk.split.io" }
{ "path": "/fme/events", "target": "https://events.split.io" }
{ "path": "/fme/auth", "target": "https://auth.split.io" }
{ "path": "/fme/streaming", "target": "https://streaming.split.io", "read_timeout": 120, "buffer": false }
{ "path": "/fme/telemetry", "target": "https://telemetry.split.io" }
```

</TabItem>
</Tabs>

Harness recommends following these best practices:

<details>
<summary>TLS and mTLS</summary>

- TLS is recommended when using plain-text authentication schemes (Basic or Bearer/JWT). These mechanisms exchange credentials in clear text and rely on TLS for confidentiality.
- If the proxy operates in forward mode behind a reverse proxy/ingress, enabling TLS helps avoid host header conflicts by relying on SNI instead of the `Host` header (common in ingress setups such as CITI).
- mTLS can be used for strong client identity verification when the proxy is deployed inside a PKI. This approach requires issuing certificates to each client but provides higher security than password or token-based methods.

</details>
<details>
<summary>Worker and Performance Settings</summary>

- Set `HP_WORKER_PROCESSES` to the number of vCPUs available to the container. This should be a whole integer.
- `HP_WORKER_CONNECTIONS` controls the number of simultaneous connections and has a large memory impact and a small CPU impact.

  * `1024` is a reliable default for most deployments.
  * Increase only when handling high concurrency, and monitor CPU and memory usage.

</details>
<details>
<summary>Outbound Restrictions (Forward Proxy)</summary>

- Use `HP_<server_name>_ALLOWED_TARGETS` and `HP_<server_name>_ALLOWED_TARGET_PORTS` to strictly limit what upstream services can be reached. This prevents tunnels from being abused for non-Harness traffic.

</details>
<details>
<summary>Authentication (Forward Proxy)</summary>

- Use `HP_<server_name>_AUTH_BEARER_JWKS` when enabling bearer authentication to validate JWTs using a trusted key set.

</details>
<details>
<summary>Reverse Proxy Locations</summary>

- Use `HP_<server_name>_LOCATIONS` to expose pre-defined Harness endpoints (e.g., using `PRESET:fme`) or to inject custom mappings.
- To provide custom locations, create a JSONL file following the documented location schema, mount it into the container, and reference it using the `CUSTOM:` prefix, for example:

  ```ruby
  HP_<server_name>_LOCATIONS=CUSTOM:/path/to/file.jsonl
  ```

- Optionally, use `HP_<server_name>_LOCATIONS_SSL_VERIFICATION_CERT` to validate TLS connections to the upstream targets.

</details>
<details>
<summary>Multiple Servers</summary>

- Each configured server (forward or reverse) can have independent TLS, authentication, and port settings, allowing fine-grained traffic control.

</details>

## Use FME SDKs with the Harness Proxy

Harness Proxy works with multiple FME SDKs to securely forward traffic from your infrastructure to Harness services. SDKs can connect via forward proxy tunnels or through reverse proxy endpoints defined by the proxy server. Traffic is opaque to the proxy, so encrypted payloads and long-lived connections (such as SSE) are fully supported without additional configuration.

import { Section, proxySDKs } from '@site/src/components/Docs/data/fmeSDKSProxy';

<Section items={proxySDKs} />

To integrate an SDK with the proxy, configure the SDK to point to the proxy host and port by setting the proxy host/port in the SDK initialization. This ensures that all SDK requests are routed through a centralized, secure, and authenticated point.