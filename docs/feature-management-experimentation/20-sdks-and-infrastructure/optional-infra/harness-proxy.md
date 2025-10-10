---
title: Harness Proxy
sidebar_label: Harness Proxy
sidebar_position: 7
description: Learn about the Harness Forward Proxy, which allows you to establish a single connection point from your FME SDKs to Harness FME services.
---

## Overview

Enterprise customers often operate in environments with controlled egress points, where all outgoing network traffic must pass through approved gateways. Without a proxy, each new delegate or SDK instance may require individual firewall exceptions and cross-team approvals, creating operational friction at scale.

Harness Proxy simplifies this by acting as a single, authorized egress point for all Harness-related traffic. This allows you to:

- Centralize and control outbound traffic from your infrastructure
- Maintain compliance with enterprise security policies
- Enable advanced authentication and authorization, including mTLS and JWT validation
- Support long-lived connections and encrypted payloads without additional proxy-side configuration

The Harness Proxy is fully customer-deployed, giving you flexibility to run it in your preferred environment (Docker, Kubernetes, or custom deployments) while keeping sensitive configuration and certificates under your control.

## How Harness Proxy works

The Harness Proxy runs on OpenResty, an NGINX-based platform chosen for its scalability, reliability, and flexibility. All configuration is externalized, allowing you to mount volumes into the container for:

- TLS certificates and private keys for secure tunnels
- JWKS files for JWT validation
- Optional NGINX config files for performance tuning and customization

Once deployed, SDKs establish opaque tunnels through the proxy to the Harness FME servers, and all traffic is securely forwarded without inspecting payloads.

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
1. Run the container with your desired configuration: `docker run --rm --name some-fme-proxy -e HFP_PROXIES=main -e HFP_main_PORT=3128 splitsoftware/fme-proxy`.
1. Test connectivity by running a cURL command: `curl -v --proxy https://harness-fproxy:3128 -XGET https://sdk.split.io`. 

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

| Variable | Context | Description | Default | Example |
|---|---|---|---|---|
| `HP__PORT` | Server | Port on which the server listens. | none / required | `443` |
| `HP__SSL` | Server | Enable TLS/mTLS for the server. | false | `true` |
| `HP__SSL_CERTIFICATE` | Server | Server certificate for TLS. | none / required if SSL enabled | `/my_volume/pki/server.crt` |
| `HP__SSL_PRIVATE_KEY` | Server | Private key for the server certificate. | none / required if SSL enabled | `/my_volume/pki/server.key` |
| `HP__SSL_CLIENT_CERTIFICATE` | Server | CA certificate for client verification (mTLS). | none | `/my_volume/pki/client_ca.crt` |
| `HP__AUTH` | Server | Enable authentication (`basic`, `digest`, `bearer`). | none | `bearer` |
| `HP__AUTH_BASIC_PASSWD` | Server | Password file for basic auth. | none / required if `auth=basic` | `/my_volume/passwd/basic.passwd` |
| `HP__AUTH_DIGEST_PASSWD` | Server | Password file for digest auth. | none / required if `auth=digest` | `/my_volume/passwd/digest.passwd` |
| `HP__AUTH_BEARER_JWKS` | Server | JWKS file for validating bearer tokens. | none / required if `auth=bearer` | `/my_volume/keys/keys.jwks` |
| `HP__PROXY_CHAIN` | Server | Upstream proxy to forward traffic. | none | `my-upstream-proxy:3128` |
| `HP__PROXY_CHAIN_SSL` | Server | Use TLS when connecting to upstream proxy. | disabled | true |
| `HP__PROXY_CHAIN_CA_CERT` | Server | CA cert to verify upstream TLS connection. | none / required if `PROXY_CHAIN_SSL` enabled | `/my_volume/pki/ca.crt` |
| `HP__RESOLVER` | Server | DNS server to resolve upstream hosts. | `8.8.8.8` | `127.0.0.53` |
| `HP__ALLOWED_TARGETS` | Server | Comma-separated list of `host:port` pairs allowed for tunnels. | `sdk.split.io:443,auth.split.io:443,streaming.split.io:443,events.split.io:443,telemetry.split.io:443` | `api.mycompany.com:443` |
| `HP__ALLOWED_TARGET_PORTS` | Server | Comma-separated list of ports allowed for tunnels. | `443` | `443,8443` |

Some best practices include the following:

- TLS/mTLS certificates: Use `HP_<server_name>_SSL`, `HP_<server_name>_SSL_CERTIFICATE`, `HP_<server_name>_SSL_PRIVATE_KEY`, and `HP_<server_name>_SSL_CLIENT_CERTIFICATE` to configure secure traffic and client verification.
- Bearer authentication: Use `HP_<server_name>_AUTH_BEARER_JWKS` for providing public keys to validate tokens.
- Outbound restrictions: Limit which hosts and ports the proxy can forward traffic to using `HP_<server_name>_ALLOWED_TARGETS` and `HP_<server_name>_ALLOWED_TARGET_PORTS`.
- Custom NGINX configuration: You may mount your own `nginx.conf` file to customize worker processes, buffers, timeouts, and other settings.
- Performance tuning: Adjust `HP_WORKER_PROCESSES`, `HP_WORKER_CONNECTIONS`, and `HP_LOG_LEVEL` to scale the proxy efficiently based on traffic and environment.
- Multiple servers: Each server instance can have unique TLS/authentication/port configurations.

For a full list of configuration options, see the [Harness Proxy GitHub repository](https://github.com/splitio/fme-proxy).

## Use FME SDKs with the Harness Proxy

Harness Proxy works with multiple FME SDKs to securely forward traffic from your infrastructure to Harness services. Once configured, the SDKs establish `CONNECT` tunnels through the proxy. Traffic is opaque to the proxy, so encrypted payloads and long-lived connections (such as SSE) are fully supported without additional configuration.

import { Section, proxySDKs } from '@site/src/components/Docs/data/fmeSDKSProxy';

<Section items={proxySDKs} />

To integrate an SDK with the proxy, configure the SDK to point to the proxy host and port by setting the proxy host/port in the SDK initialization. This ensures that all SDK requests are routed through a centralized, secure, and authenticated point.