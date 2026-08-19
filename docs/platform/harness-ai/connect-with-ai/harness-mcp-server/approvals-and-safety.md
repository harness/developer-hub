---
title: Approvals and safety
description: How the Harness MCP Server confirms write operations through MCP elicitation, how risk-based auto-approve works, and which safeguards the server enforces.
sidebar_label: Approvals and Safety
sidebar_position: 9
keywords:
  - elicitation
  - auto approve
  - read only
  - safety
  - guardrails
tags:
  - harness-ai
  - mcp
---

Every write tool asks for your approval. Harness MCP Server asks for confirmation before it changes anything, stops the operation when it cannot get that confirmation, and applies limits at both the transport and API layers. This topic walks through the approval flow and the safeguards that back it.

---

## Elicitation

Write tools (`harness_create`, `harness_update`, `harness_delete`, `harness_execute`) use [MCP elicitation](https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#elicitation) to prompt the user for confirmation before making changes.

1. The LLM calls a write tool (for example, `harness_create` with a pipeline body).
2. The server sends an elicitation request to the client with a summary of the operation.
3. The user sees the details and clicks **Accept** or **Decline**.
4. If accepted, the operation proceeds. If declined, it is blocked.

| Client | Elicitation Support |
|--------|---------------------|
| Cursor | Yes |
| VS Code (Copilot) | Yes |
| Claude Desktop | Not yet |
| Windsurf | Not yet |
| MCP Inspector | Yes |

For clients that do not support elicitation, `harness_create`, `harness_update`, and `harness_execute` proceed without a dialog, while `harness_delete` is blocked to prevent unintended destruction.

---

## Auto-approve for autonomous workflows

For fully autonomous agent workflows (CI/CD bots, headless agents, batch automation), set a risk threshold so operations at or below that level proceed without a confirmation prompt:

```bash
HARNESS_AUTO_APPROVE_RISK=low_write
```

Operations are evaluated against this threshold in ascending order of risk: `none` (default, always prompt), `low_write`, `medium_write`, `high_write`, `all`.

:::warning
`HARNESS_AUTO_APPROVE_RISK=all` skips confirmation for every operation, including destructive ones such as `harness_delete`. Pair it with `HARNESS_TOOLSETS` to restrict which resource types are available.
:::

`HARNESS_SKIP_ELICITATION` is deprecated. Setting it to `true` is equivalent to `HARNESS_AUTO_APPROVE_RISK=all`, and the server logs a deprecation warning to stderr. If both variables are set, `HARNESS_AUTO_APPROVE_RISK` takes precedence.

Sessions can also send an `x-harness-auto-approve-risk` header on the MCP `initialize` HTTP request to tighten (but not loosen) the deployment-level threshold configured through the environment variable.

---

## Platform safeguards

The following safeguards are always in effect, regardless of the client you connect from or the approval threshold you configure.

- **Secrets are never exposed.** The `secret` resource type returns metadata only. Secret values are never included in any response.
- **Write operations use elicitation when available.** `harness_create`, `harness_update`, `harness_delete`, and `harness_execute` prompt for user confirmation.
- **Destructive writes fail closed.** If confirmation cannot be obtained, `harness_delete` is blocked, unless `HARNESS_AUTO_APPROVE_RISK=all` is set.
- **CORS restricted to same-origin.** The HTTP transport prevents CSRF attacks from malicious websites.
- **Rate limiting.** HTTP transport enforces 60 requests per minute per IP. The API client enforces 10 requests per second to avoid upstream rate limits.
- **Pagination bounds enforced.** List queries are capped at 10,000 items total and 100 per page.
- **Retries with backoff.** Transient failures (HTTP 429, 5xx) are retried with exponential backoff and jitter.
- **Localhost binding.** The HTTP transport binds to `127.0.0.1` by default.
- **HTTPS enforced.** `HARNESS_BASE_URL` must use HTTPS. Set `HARNESS_ALLOW_HTTP=true` only for local development.

---

## Read-only deployments

Set `HARNESS_READ_ONLY=true` to block create, update, delete, and execute operations entirely. Only list and get operations are allowed, which makes this the safest configuration for shared, demo, or exploratory environments.

---

## Related articles

- [Environment variables](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/environment-variables): Review every access control and audit variable.
- [Self-hosted deployment](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/self-hosted-deployment): Apply per-session thresholds in multi-user mode.
- [Troubleshooting](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/troubleshooting): Resolve declined operations and read-only errors.
