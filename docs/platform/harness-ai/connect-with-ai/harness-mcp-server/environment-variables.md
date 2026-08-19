---
title: Environment variables reference
description: Full configuration reference for the Harness MCP Server, including identity, reliability, access control, logging, semantic search, and toolset filtering.
sidebar_label: Environment Variables
sidebar_position: 5
keywords:
  - environment variables
  - configuration
  - toolsets
  - harness_toolsets
  - read only
tags:
  - harness-ai
  - mcp
---

Every server setting is supplied through an environment variable. Variables are grouped below by purpose. Only `HARNESS_API_KEY` is required, and only in `single-user` mode.

---

## Deployment and identity

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HARNESS_MCP_MODE` | No | `single-user` | Deployment mode: `single-user` (API key set once in server config, used for all sessions) or `multi-user` (HTTP transport only, per-session credentials supplied via the `x-harness-api-key` header and optional `x-harness-account-id` header) |
| `HARNESS_API_KEY` | Yes in `single-user` mode | -- | Harness personal access token or service account token. Required in `single-user` mode. Must not be set in `multi-user` mode, because the server holds no Harness credentials of its own |
| `HARNESS_ACCOUNT_ID` | No | *(from PAT/SAT)* | Harness account identifier. Auto-extracted from PAT or SAT tokens in `single-user` mode. In `multi-user` mode, sessions can supply their own account ID via the `x-harness-account-id` header when the API key does not embed one |
| `HARNESS_BASE_URL` | No | `https://app.harness.io` | Harness API and UI base URL for local stdio or self-hosted HTTP deployments. Set this to your own instance (for example, `https://harness0.harness.io`) when self-hosting. It has no effect on the managed `https://mcp.harness.io/mcp` hosted endpoint |
| `HARNESS_ORG` | No | -- | Organization ID used when `org_id` is not specified per tool call. If omitted, pass `org_id` explicitly, or let agents discover orgs dynamically via `harness_list(resource_type="organization")` |
| `HARNESS_PROJECT` | No | -- | Project ID used when `project_id` is not specified per tool call. If omitted, pass `project_id` explicitly, or let agents discover projects dynamically via `harness_list(resource_type="project")` |
| `HARNESS_DEFAULT_ORG_ID` (Deprecated) | No | -- | Deprecated alias for `HARNESS_ORG` |
| `HARNESS_DEFAULT_PROJECT_ID` (Deprecated) | No | -- | Deprecated alias for `HARNESS_PROJECT` |

---

## Feature Management & Experimentation

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HARNESS_FME_API_KEY` | No | -- | Optional Split or FME Admin API credential used for `fme_` resources in self-hosted deployments. Accepts a legacy Split admin key or an FME-entitled Harness PAT or SAT. FME calls go directly to `api.split.io`, so hosted OAuth or service-routing credentials for Harness platform APIs do not authenticate these requests. Must not be set in `multi-user` mode; FME uses each session's `x-harness-api-key` credential instead. If unset, FME falls back to a non-placeholder `HARNESS_API_KEY` for self-hosted sessions |
| `HARNESS_FME_BASE_URL` | No | `https://api.split.io` | Split or FME Admin API base URL used by `fme_` resources. HTTP URLs require `HARNESS_ALLOW_HTTP=true` for local development |

---

## Requests and reliability

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HARNESS_API_TIMEOUT_MS` | No | `30000` | HTTP request timeout in milliseconds |
| `HARNESS_MAX_RETRIES` | No | `3` | Retry count for transient failures (429, 5xx) |
| `HARNESS_MAX_BODY_SIZE_MB` | No | `10` | Max HTTP request body size in MB for `http` transport |
| `HARNESS_RATE_LIMIT_RPS` | No | `10` | Client-side request throttle (requests per second) to Harness APIs |
| `HARNESS_ALLOW_HTTP` | No | `false` | Allow non-HTTPS URLs for `HARNESS_BASE_URL`, `HARNESS_FME_BASE_URL`, and `HARNESS_AUDIT_WEBHOOK_URL`. The server enforces HTTPS by default; set to `true` only for local development against non-TLS endpoints |

---

## Tool and access control

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HARNESS_TOOLSETS` | No | *(defaults)* | Comma-separated toolset list. Empty loads the default toolsets. Supports `+name` to include an opt-in toolset and `-name` to remove a default toolset. Go to [Toolset filtering](#toolset-filtering) to review the toolset catalog |
| `HARNESS_READ_ONLY` | No | `false` | Block all mutating operations (create, update, delete, execute). Only list and get operations are allowed. Useful for shared or demo environments |
| `HARNESS_AUTO_APPROVE_RISK` | No | `none` | Risk-based auto-approve threshold for autonomous workflows. Operations at or below this risk level proceed without user confirmation. Values: `none`, `low_write`, `medium_write`, `high_write`, `all` |
| `HARNESS_SKIP_ELICITATION` (Deprecated) | No | `false` | Superseded by `HARNESS_AUTO_APPROVE_RISK`. Setting `true` is equivalent to `HARNESS_AUTO_APPROVE_RISK=all` and logs a deprecation warning to stderr. If both are set, `HARNESS_AUTO_APPROVE_RISK` takes precedence |
| `HARNESS_PIPELINE_VERSION` | No | `0` | **(Alpha)** Pipeline YAML version. `0` loads the `pipeline` resource type and excludes `pipeline_v1`; `1` loads `pipeline_v1` and excludes `pipeline`. HTTP sessions can override this at initialize time with the `x-harness-pipeline-version` header set to `0` or `1` |

---

## HTTP transport and multi-user access

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HARNESS_MCP_ALLOWED_HOSTS` | No | -- | Comma-separated hostnames allowed by HTTP transport Host-header validation. `mcp.harness.io` is allowed by default for localhost binds; add proxy or custom domains here |
| `HARNESS_MCP_AUTH_TOKEN` | Yes for non-loopback HTTP binds | -- | Bearer token required on `/mcp` HTTP routes when set. Required by default when HTTP transport binds to a non-loopback host, unless `HARNESS_MCP_ALLOW_UNAUTHENTICATED_HTTP=true` |
| `HARNESS_MCP_ALLOW_UNAUTHENTICATED_HTTP` | No | `false` | Explicitly allow unauthenticated HTTP transport on non-loopback binds. Use only behind another authenticated control |

---

## Logging and audit

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `LOG_LEVEL` | No | `info` | Log verbosity: `debug`, `info`, `warn`, `error` |
| `HARNESS_MCP_LOG_FILE` | No | `~/.claude/harness-mcp.log` | File used for stdio disconnect and crash diagnostics when stderr is no longer available |
| `HARNESS_AUDIT_FILE` | No | -- | Append audit events to a newline-delimited JSON file for durable local collection |
| `HARNESS_AUDIT_WEBHOOK_URL` | No | -- | HTTPS endpoint that receives batched audit events. HTTP URLs require `HARNESS_ALLOW_HTTP=true` for local development |
| `HARNESS_AUDIT_WEBHOOK_TOKEN` | No | -- | Optional bearer token sent to the audit webhook |
| `HARNESS_AUDIT_WEBHOOK_BATCH_SIZE` | No | `10` | Number of audit events to batch before webhook flush |
| `HARNESS_AUDIT_WEBHOOK_FLUSH_MS` | No | `5000` | Max time to hold audit events before webhook flush |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | No | -- | Enables OpenTelemetry audit spans when the optional OpenTelemetry packages are installed |

---

## Semantic search

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HARNESS_SEARCH_PROVIDER` | No | `local` | Semantic search backend for `harness_search`: `local` (in-process ONNX embeddings), `remote` (external search service over HTTP, required for `multi-user` mode), or `none` (disable semantic search and fall back to keyword scatter-gather only). Use `none` in air-gapped environments or when startup model loading is undesirable |
| `HARNESS_SEARCH_SERVICE_URL` | Yes when `HARNESS_SEARCH_PROVIDER=remote` | -- | Base URL of the remote search service when `HARNESS_SEARCH_PROVIDER=remote` (for example, `http://search-svc:8080`) |
| `HARNESS_SEARCH_SERVICE_HEADERS` | No | -- | JSON object of headers sent with every request to the remote search service. Supports any auth scheme, for example `{"Authorization":"Bearer tok"}` or `{"x-api-key":"key"}` |
| `HARNESS_HF_CACHE_DIR` | No | `/tmp/hf-cache` | Directory for the `@huggingface/transformers` model cache used by the `local` search provider. The Docker image pre-bakes the model into `/app/.cache/hf` to avoid runtime downloads. Set to a persistent volume path in production deployments |

---

## Toolset filtering

By default, all 30 toolsets (and their 139 resource types) are enabled. Use `HARNESS_TOOLSETS` to expose only the toolsets you need, which reduces the resource types the LLM sees and improves tool-selection accuracy.

```bash
# Only expose pipelines, services, and connectors
HARNESS_TOOLSETS=pipelines,services,connectors
```

| Toolset | Resource Types |
|---------|---------------|
| `agent-pipelines` | agent, agent_run |
| `platform` | organization, project |
| `pipelines` | pipeline, execution, trigger, pipeline_summary, input_set, runtime_input_template, approval_instance |
| `services` | service |
| `environments` | environment |
| `connectors` | connector, connector_catalogue |
| `infrastructure` | infrastructure |
| `secrets` | secret |
| `logs` | execution_log |
| `audit` | audit_event |
| `delegates` | delegate, delegate_token |
| `repositories` | repository, branch, commit, file_content, tag, repo_rule, space_rule |
| `registries` | registry, artifact, artifact_version, artifact_file |
| `templates` | template |
| `dashboards` | dashboard, dashboard_data |
| `idp` | idp_entity, scorecard, scorecard_check, scorecard_stats, scorecard_check_stats, idp_score, idp_workflow, idp_tech_doc |
| `pull-requests` | pull_request, pr_reviewer, pr_comment, pr_check, pr_activity |
| `feature-flags` | fme_workspace, fme_environment, fme_feature_flag, fme_feature_flag_definition, fme_rollout_status, fme_rule_based_segment, fme_rule_based_segment_definition, feature_flag |
| `gitops` | gitops_agent, gitops_application, gitops_cluster, gitops_repository, gitops_applicationset, gitops_repo_credential, gitops_app_event, gitops_pod_log, gitops_managed_resource, gitops_resource_action, gitops_dashboard, gitops_app_resource_tree |
| `chaos` | chaos_experiment, chaos_probe, chaos_experiment_template, chaos_infrastructure, chaos_experiment_variable, chaos_experiment_run, chaos_loadtest, chaos_k8s_infrastructure, chaos_hub, chaos_fault, chaos_network_map, chaos_guard_condition, chaos_guard_rule, chaos_recommendation, chaos_risk |
| `ccm` | cost_perspective, cost_breakdown, cost_timeseries, cost_summary, cost_recommendation, cost_anomaly, cost_anomaly_summary, cost_category, cost_account_overview, cost_filter_value, cost_recommendation_stats, cost_recommendation_detail, cost_commitment |
| `sei` | sei_metric, sei_productivity_metric, sei_dora_metric, sei_team, sei_team_detail, sei_org_tree, sei_org_tree_detail, sei_business_alignment, sei_ai_usage, sei_ai_adoption, sei_ai_impact, sei_ai_raw_metric |
| `scs` | scs_artifact_source, artifact_security, scs_artifact_component, scs_artifact_remediation, scs_chain_of_custody, scs_compliance_result, code_repo_security, scs_sbom |
| `sto` | security_issue, security_issue_filter, security_exemption |
| `access_control` | user, user_group, service_account, role, role_assignment, resource_group, permission |
| `governance` | policy, policy_set, policy_evaluation |
| `freeze` | freeze_window, global_freeze |
| `overrides` | service_override |
| `settings` | setting |
| `visualizations` | visual_timeline, visual_stage_flow, visual_health_dashboard, visual_pie_chart, visual_bar_chart, visual_timeseries, visual_architecture |

---

## Next steps


- [Resource types](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/resource-types): Review what each toolset exposes and which operations it supports.
- [Approvals and safety](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/approvals-and-safety): Combine toolset filtering with auto-approve thresholds.
- [Configure your AI client](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/configure-ai-clients): Set variables in a client configuration file.
