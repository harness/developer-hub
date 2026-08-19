---
title: Resource types
description: All 139 Harness MCP Server resource types organized by toolset, with the CRUD operations and execute actions each one supports.
sidebar_label: Resource Types
sidebar_position: 7
keywords:
  - resource types
  - toolsets
  - crud operations
  - execute actions
tags:
  - harness-ai
  - mcp
---

Harness MCP Server organizes 139 resource types across 30 toolsets. Every resource type supports a subset of CRUD operations, and some also support execute actions. You can pass the resource type name to any tool through the `resource_type` parameter, and call `harness_describe` at runtime to confirm what a specific deployment exposes.

You can limit which of these load at startup, see [Toolset filtering](./environment-variables.md#toolset-filtering).

---

## Platform

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `organization` | x | x | x | x | x | |
| `project` | x | x | x | x | x | |

---

## Agent Pipelines

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `agent` | x | x | x | x | x | |
| `agent_run` | x | | | | | |

---

## Pipelines

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `pipeline` | x | x | x | x | x | `run`, `retry` |
| `execution` | x | x | | | | `interrupt` |
| `trigger` | x | x | x | x | x | |
| `pipeline_summary` | | x | | | | |
| `input_set` | x | x | | | | |
| `runtime_input_template` | | x | | | | |
| `approval_instance` | x | | | | | `approve`, `reject` |

---

## Services

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `service` | x | x | x | x | x | |

---

## Environments

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `environment` | x | x | x | x | x | `move_configs` |

---

## Connectors

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `connector` | x | x | x | x | x | `test_connection` |
| `connector_catalogue` | x | | | | | |

---

## Infrastructure

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `infrastructure` | x | x | x | x | x | `move_configs` |

---

## Secrets

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `secret` | x | x | | | | |

Secret values are never returned. Go to [Approvals and safety](./approvals-and-safety.md) to review the full safeguard list.

---

## Execution logs

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `execution_log` | | x | | | | |

---

## Audit trail

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `audit_event` | x | x | | | | |

---

## Delegates

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `delegate` | x | | | | | |
| `delegate_token` | x | x | x | | x | `revoke`, `get_delegates` |

---

## Code repositories

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `repository` | x | x | x | x | | |
| `branch` | x | x | x | | x | |
| `commit` | x | x | | | | `diff`, `diff_stats` |
| `file_content` | | x | | | | `blame` |
| `tag` | x | | x | | x | |
| `repo_rule` | x | x | | | | |
| `space_rule` | x | x | | | | |

---

## Artifact registries

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `registry` | x | x | | | | |
| `artifact` | x | | | | | |
| `artifact_version` | x | | | | | |
| `artifact_file` | x | | | | | |

---

## Templates

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `template` | x | x | x | x | x | |

---

## Dashboards

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `dashboard` | x | x | | | | |
| `dashboard_data` | | x | | | | |

---

## Internal Developer Portal (IDP)

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `idp_entity` | x | x | | | | |
| `scorecard` | x | x | | | | |
| `scorecard_check` | x | x | | | | |
| `scorecard_stats` | | x | | | | |
| `scorecard_check_stats` | | x | | | | |
| `idp_score` | x | x | | | | |
| `idp_workflow` | x | | | | | `execute` |
| `idp_tech_doc` | x | | | | | |

---

## Pull requests

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `pull_request` | x | x | x | x | | `merge` |
| `pr_reviewer` | x | | x | | | `submit_review` |
| `pr_comment` | x | | x | | | |
| `pr_check` | x | | | | | |
| `pr_activity` | x | | | | | |

---

## Feature flags

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `fme_workspace` | x | | | | | |
| `fme_environment` | x | | | | | |
| `fme_feature_flag` | x | x | x | x | x | `kill`, `restore`, `archive`, `unarchive` |
| `fme_feature_flag_definition` | | x | | | | |
| `fme_rollout_status` | x | | | | | |
| `fme_rule_based_segment` | x | x | x | | x | |
| `fme_rule_based_segment_definition` | x | | | x | | `enable`, `disable`, `change_request` |
| `feature_flag` | x | x | x | | x | `toggle` |

---

## GitOps

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `gitops_agent` | x | x | | | | |
| `gitops_application` | x | x | | | | `sync` |
| `gitops_cluster` | x | x | | | | |
| `gitops_repository` | x | x | | | | |
| `gitops_applicationset` | x | x | | | | |
| `gitops_repo_credential` | x | x | | | | |
| `gitops_app_event` | x | | | | | |
| `gitops_pod_log` | | x | | | | |
| `gitops_managed_resource` | x | | | | | |
| `gitops_resource_action` | x | | | | | |
| `gitops_dashboard` | | x | | | | |
| `gitops_app_resource_tree` | | x | | | | |

---

## Chaos Engineering

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `chaos_experiment` | x | x | | | | `run` |
| `chaos_probe` | x | x | | | | `enable`, `verify` |
| `chaos_experiment_template` | x | | | | | `create_from_template` |
| `chaos_infrastructure` | x | | | | | |
| `chaos_experiment_variable` | x | | | | | |
| `chaos_experiment_run` | x | x | | | | |
| `chaos_loadtest` | x | x | x | | x | `run`, `stop` |
| `chaos_k8s_infrastructure` | x | x | | | | `check_health` |
| `chaos_hub` | x | x | | | | |
| `chaos_fault` | x | x | | | | |
| `chaos_network_map` | x | x | | | | |
| `chaos_guard_condition` | x | x | | | | |
| `chaos_guard_rule` | x | x | | | | |
| `chaos_recommendation` | x | x | | | | |
| `chaos_risk` | x | x | | | | |

---

## Cloud Cost Management (CCM)

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `cost_perspective` | x | x | x | x | x | |
| `cost_breakdown` | x | | | | | |
| `cost_timeseries` | x | | | | | |
| `cost_summary` | x | x | | | | |
| `cost_recommendation` | x | x | | | | `update_state`, `override_savings`, `create_jira_ticket`, `create_snow_ticket` |
| `cost_anomaly` | x | | | | | |
| `cost_anomaly_summary` | | x | | | | |
| `cost_category` | x | x | | | | |
| `cost_account_overview` | | x | | | | |
| `cost_filter_value` | x | | | | | |
| `cost_recommendation_stats` | | x | | | | |
| `cost_recommendation_detail` | | x | | | | |
| `cost_commitment` | | x | | | | |

---

## AI DLC Insights (AIDI)

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `sei_metric` | x | | | | | |
| `sei_productivity_metric` | | x | | | | |
| `sei_dora_metric` | | x | | | | Pass `metric`: deployment_frequency, change_failure_rate, mttr, lead_time |
| `sei_team` | x | x | | | | |
| `sei_team_detail` | x | | | | | Pass `aspect`: integrations, developers, integration_filters |
| `sei_org_tree` | x | x | | | | |
| `sei_org_tree_detail` | x | x | | | | Pass `aspect`: efficiency_profile, productivity_profile, business_alignment_profile, integrations, teams |
| `sei_business_alignment` | x | x | | | | |
| `sei_ai_usage` | x | x | | | | Pass `aspect`: metrics, breakdown, summary, top_languages |
| `sei_ai_adoption` | x | x | | | | Pass `aspect`: metrics, breakdown, summary |
| `sei_ai_impact` | | x | | | | Pass `aspect`: pr_velocity, rework |
| `sei_ai_raw_metric` | x | | | | | |

---

## Software Supply Chain Assurance (SCS)

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `scs_artifact_source` | x | | | | | |
| `artifact_security` | x | x | | | | |
| `scs_artifact_component` | x | | | | | |
| `scs_artifact_remediation` | | x | | | | |
| `scs_chain_of_custody` | | x | | | | |
| `scs_compliance_result` | x | | | | | |
| `code_repo_security` | x | x | | | | |
| `scs_sbom` | | x | | | | |

---

## Security Testing Orchestration (STO)

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `security_issue` | x | | | | | |
| `security_issue_filter` | x | | | | | |
| `security_exemption` | x | | | | | `approve`, `reject`, `promote` |

---

## Access control

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `user` | x | x | | | | |
| `user_group` | x | x | x | | x | |
| `service_account` | x | x | x | | x | |
| `role` | x | x | x | | x | |
| `role_assignment` | x | | x | | | |
| `resource_group` | x | x | x | | x | |
| `permission` | x | | | | | |

---

## Governance

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `policy` | x | x | x | x | x | |
| `policy_set` | x | x | x | x | x | |
| `policy_evaluation` | x | x | | | | |

---

## Deployment freeze

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `freeze_window` | x | x | x | x | x | `toggle_status` |
| `global_freeze` | | x | | | | `manage` |

---

## Service overrides

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `service_override` | x | x | x | x | x | |

---

## Settings

| Resource Type | List | Get | Create | Update | Delete | Execute Actions |
|---------------|:----:|:---:|:------:|:------:|:------:|-----------------|
| `setting` | x | | | | | |

---

## Visualizations

Inline PNG chart visualizations rendered from Harness data. Use `include_visual=true` on supported tools to generate charts.

| Resource Type | Description | How to generate |
|---------------|-------------|-----------------|
| `visual_timeline` | Gantt chart of pipeline stage execution | `harness_diagnose` with `visual_type: "timeline"` |
| `visual_stage_flow` | DAG flowchart of pipeline stages and steps | `harness_diagnose` with `visual_type: "flow"` |
| `visual_health_dashboard` | Project health overview with status indicators | `harness_status` with `include_visual: true` |
| `visual_pie_chart` | Donut chart of execution status breakdown | `harness_list` with `visual_type: "pie"` |
| `visual_bar_chart` | Bar chart of execution counts by pipeline | `harness_list` with `visual_type: "bar"` |
| `visual_timeseries` | Daily execution trend over 30 days | `harness_list` with `visual_type: "timeseries"` |
| `visual_architecture` | Pipeline YAML architecture diagram | `harness_diagnose` with `visual_type: "architecture"` |

---

## Related articles

- [Tools reference](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/tools-reference): Review the tools that operate on these resource types.
- [Environment variables](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/environment-variables): Filter which toolsets load at startup.
- [Prompt templates](/docs/platform/harness-ai/connect-with-ai/harness-mcp-server/prompt-templates): Use pre-built workflows that combine several resource types.
