---
title: Self-hosted deployment
description: Run the Harness MCP Server with Docker, Kubernetes, or an MCP gateway, and serve multiple users over HTTP transport.
sidebar_label: Self-Hosted Deployment
sidebar_position: 4
keywords:
  - docker
  - kubernetes
  - mcp gateway
  - http transport
  - multi-user
tags:
  - harness-ai
  - mcp
---

When more than one user or automation needs access, you can run Harness MCP Server as shared infrastructure. Docker and Kubernetes deployments both use **http** transport, which gives you session-based access, health checks, and per-session credentials.

---

## Run with Docker

To run Harness MCP server with Docker, execute the following command in your terminal:

```bash
docker run --rm -p 3000:3000 \
  -e HARNESS_API_KEY=pat.xxx.xxx.xxx \
  harness-mcp-server
```

By default, the container runs in HTTP mode on port 3000 and includes a built-in health check.

---

## Deploy to Kubernetes

To run Harness MCP server with Kubernetes, execute the following commands in your terminal:

```bash
# 1. Edit the Secret with your credentials
#    k8s/secret.yaml: replace HARNESS_API_KEY and HARNESS_ACCOUNT_ID

# 2. Apply all manifests
kubectl apply -f k8s/

# 3. Verify the deployment
kubectl -n harness-mcp get pods

# 4. Port-forward for local testing
kubectl -n harness-mcp port-forward svc/harness-mcp-server 3000:80
curl http://localhost:3000/health
```

You will receive two replicas, each with readiness and liveness probes, resource limits, and a non-root security context.

---

## Use MCP gateways

MCP gateways are reverse proxies that handle authentication, governance, tool routing, and observability in one place, and the server works with them. The server implements the standard MCP protocol over both stdio and HTTP transports, so it resides behind any MCP-compliant gateway.

Tested gateways include [Docker MCP Gateway](https://docs.docker.com/), [Portkey](https://portkey.ai/features/mcp), [LiteLLM](https://docs.litellm.ai/docs/mcp), [Envoy AI Gateway](https://aigateway.envoyproxy.io/), [Kong](https://developer.konghq.com/mcp/), and others. With a **stdio-based** gateway, you can stay on the default transport. With an **HTTP-based** gateway, you can start the server with `http` transport and point the gateway at the `/mcp` endpoint.

---

## HTTP transport

In HTTP mode, the server exposes the following endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/mcp` | `POST` | MCP JSON-RPC endpoint (initialize and session requests) |
| `/mcp` | `GET` | SSE stream for server-initiated messages (progress, elicitation) |
| `/mcp` | `DELETE` | Terminate an active MCP session |
| `/mcp` | `OPTIONS` | CORS preflight |
| `/health` | `GET` | Health check that returns `{ "status": "ok", "sessions": <count> }` |

The HTTP transport runs in session-based mode. An `initialize` request creates a new MCP session, the server hands back an `mcp-session-id` header, and every request after that must carry the same header. Sessions that sit idle for 30 minutes are cleared out.

---

## Serve multiple users

On a shared HTTP deployment where each client authenticates as a different Harness user, set `HARNESS_MCP_MODE=multi-user`:

- Leave `HARNESS_API_KEY` out of the server config. In this mode, the server holds no Harness credentials of its own.
- Every session sends `x-harness-api-key` on the `initialize` request. Add `x-harness-account-id` when the API key does not embed an account segment.
- A session can also send `x-harness-org` and `x-harness-project` to set its default scope, and `x-harness-auto-approve-risk` to tighten the deployment-level auto-approve threshold.
- The Harness API key travels with every Harness API call in that session, so the audit trail in Harness points back to the real user.
- `HARNESS_MCP_AUTH_TOKEN` stands apart from session credentials and still gates the transport layer.
- Set `HARNESS_SEARCH_PROVIDER` to `remote` in this mode, since multi-user deployments do not support the `local` provider.

---

## Next steps

- [Environment variables](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/environment-variables): Configure host validation, bearer tokens, rate limits, and audit logging.
- [Approvals and safety](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/approvals-and-safety): Set read-only mode or a risk threshold for shared environments.
- [Harness Hosted MCP](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/hosted-mcp): Use the Harness-managed endpoint instead of self-hosting.
