---
title: Resource type reference
description: Resource type reference for Harness RBAC.
sidebar_position: 130
---

This topic lists resource types relevant to [RBAC in Harness](/docs/category/platform-access-control/rbac-in-harness). Each resource type has an identifier used in APIs and YAML, and a permission key used to construct permission strings such as `core_pipeline_view`.

---

## Resource types

Resource types are grouped by the Harness module or platform area that owns them. Platform resource types are available to every module, and module resource types require a license for that module.

### Harness Platform

These resource types apply across Harness and are not specific to a single module.

| Identifier | Permission key |
| --- | --- |
| `ACCOUNT` | account |
| `ORGANIZATION` | organization |
| `PROJECT` | project |
| `CONNECTOR` | connector |
| `DELEGATE` | delegate |
| `DELEGATECONFIGURATION` | delegateconfiguration |
| `SECRET` | secret |
| `AUDIT` | audit |
| `DASHBOARDS` | dashboards |
| `TEMPLATE` | template |
| `TICKET` | ticket |
| `FILE` | file |
| `VARIABLE` | variable |
| `SMTP` | smtp |
| `SETTING` | setting |
| `STREAMING_DESTINATION` | streamingDestination |
| `MODULE` | module |
| `GITX_WEBHOOKS` | gitxWebhooks |
| `CERTIFICATE` | certificate |
| `PROVIDER` | provider |
| `RELEASES` | releases |
| `INPUT_SET` | inputset |
| `BANNER` | banner |
| `OIDC_ID_TOKEN` | oidcIdToken |
| `DATA_SINK` | dataSink |
| `AI_RULES` | rules |
| `BRANDING` | branding |
| `LLM_GATEWAY` | llmgateway |
| `USER` | user |
| `SERVICEACCOUNT` | serviceaccount |
| `USERGROUP` | usergroup |
| `ROLE` | role |
| `RESOURCEGROUP` | resourcegroup |
| `LICENSE` | license |
| `AUTHSETTING` | authsetting |
| `ACCESS_POLICIES` | accessPolicies |
| `NOTIFICATION` | notification |
| `NOTIFICATION_CHANNEL` | notificationchannel |
| `NOTIFICATION_RULE` | notificationrule |
| `DEFAULT_NOTIFICATION_TEMPLATE_SET` | defaultNotificationTemplateSet |
| `GOVERNANCEPOLICY` | governancePolicy |
| `GOVERNANCEPOLICYSETS` | governancePolicySets |
| `NETWORK_MAP` | networkmap |

### Continuous Delivery and GitOps

These resource types apply to pipelines, deployments, and GitOps.

| Identifier | Permission key |
| --- | --- |
| `PIPELINE` | pipeline |
| `SERVICE` | service |
| `ENVIRONMENT` | environment |
| `ENVIRONMENT_GROUP` | environmentgroup |
| `GITOPS_AGENT` | agent |
| `GITOPS_APP` | application |
| `GITOPS_REPOSITORY` | repository |
| `GITOPS_CLUSTER` | cluster |
| `GITOPS_GPGKEY` | gpgkey |
| `GITOPS_CERT` | cert |
| `GITOPS_APPLICATIONSET` | applicationset |
| `DEPLOYMENTFREEZE` | deploymentfreeze |

### Code Repository

These resource types apply to Harness Code Repository.

| Identifier | Permission key |
| --- | --- |
| `CODE_REPOSITORY` | repo |

### Artifact Registry

These resource types apply to Harness Artifact Registry.

| Identifier | Permission key |
| --- | --- |
| `ARTIFACT_REGISTRY` | artregistry |
| `ARTIFACT_FIREWALL_EXCEPTIONS` | firewallexceptions |
| `HAR_REGISTRY` | harregistry |

### Security Testing Orchestration

These resource types apply to Harness STO.

| Identifier | Permission key |
| --- | --- |
| `STO_TESTTARGET` | testtarget |
| `STO_EXEMPTION` | exemption |
| `STO_ISSUE` | issue |
| `STO_SCAN` | scan |
| `STO_OVERRIDE` | override |

### Supply Chain Security

These resource types apply to Harness SCS.

| Identifier | Permission key |
| --- | --- |
| `SSCA_REMEDIATION_TRACKER` | remediationtracker |
| `SSCA_ENFORCEMENT_EXEMPTION` | enforcementexemption |

### Feature Flags

These resource types apply to the Harness Feature Flags module.

| Identifier | Permission key |
| --- | --- |
| `FEATUREFLAG` | featureflag |
| `FF_PROXYAPIKEY` | proxyapikey |
| `TARGET` | target |
| `TARGETGROUP` | targetgroup |

### Feature Management and Experimentation

These resource types apply to Harness FME.

| Identifier | Permission key |
| --- | --- |
| `FME_ENVIRONMENT` | fmeenvironment |
| `FME_TRAFFIC_TYPE` | fmetraffictype |
| `FME_FEATURE_FLAG` | fmefeatureflag |
| `FME_SEGMENT` | fmesegment |
| `FME_LARGE_SEGMENT` | fmelargesegment |
| `FME_METRIC` | fmemetric |
| `FME_EXPERIMENT` | fmeexperiment |
| `FME_CONFIG` | fmeconfig |
| `FME_AICONFIG` | fmeaiconfig |

### Cloud & AI Cost Management

These resource types apply to Harness CACM, including AutoStopping and Cloud Asset Governance.

| Identifier | Permission key |
| --- | --- |
| `CCM_OVERVIEW` | overview |
| `CCM_PERSPECTIVE` | perspective |
| `CCM_FOLDER` | folder |
| `CCM_BUDGET` | budget |
| `CCM_COSTCATEGORY` | costCategory |
| `CCM_UNIT_COST` | unitCost |
| `CCM_AUTOSTOPPINGRULE` | autoStoppingRule |
| `CCM_LOADBALANCER` | loadBalancer |
| `CCM_CURRENCYPREFERENCE` | currencyPreference |
| `CCM_CLOUD_ASSET_GOVERNANCE_RULE` | cloudAssetGovernanceRule |
| `CCM_CLOUD_ASSET_GOVERNANCE_RULE_SET` | cloudAssetGovernanceRuleSet |
| `CCM_CLOUD_ASSET_GOVERNANCE_RULE_ENFORCEMENT` | cloudAssetGovernanceEnforcement |
| `CCM_CLOUD_ASSET_GOVERNANCE_OVERVIEW` | cloudAssetGovernanceOverview |
| `CCM_CLOUD_ASSET_GOVERNANCE_ALERT` | cloudAssetGovernanceAlert |
| `CCM_DATA_SCOPE` | dataScope |
| `CCM_CLUSTER_ORCHESTRATOR` | clusterOrchestrator |
| `CCM_ANOMALIES` | anomalies |
| `CCM_RECOMMENDATIONS` | recommendations |
| `CCM_COMMITMENT_ORCHESTRATOR` | commitmentOrchestrator |
| `CCM_ANOMALIES_WHITELIST_RULE` | anomaliesWhitelistRule |

### Service Reliability Management

These resource types apply to Harness SRM.

| Identifier | Permission key |
| --- | --- |
| `MONITOREDSERVICE` | monitoredservice |
| `SLO` | slo |
| `DOWNTIME` | downtime |
| `MONITORING_AGENT` | monitoringagent |
| `METRIC_SOURCE` | metricsource |

### Incident Response

These resource types apply to Harness Incident Response.

| Identifier | Permission key |
| --- | --- |
| `IRO_MANAGER` | iromanager |
| `IRO_ALERT` | alert |
| `IRO_ALERT_RULE` | alertrule |
| `IRO_INCIDENT` | incident |
| `IRO_CONNECT_WORKSPACE` | iroworkspace |
| `IRO_RUNBOOK` | runbook |
| `IRO_SERVICE_DIRECTORY` | servicedirectory |
| `IRO_THIRD_PARTY_INTEGRATIONS` | thirdpartyintegrations |
| `IRO_ESCALATION_POLICY` | iroescalationpolicy |
| `IRO_SCHEDULE` | iroschedule |
| `IRO_SCHEDULE_OVERRIDE` | iroscheduleoverride |

### Resilience Testing

These resource types apply to Harness Resilience Testing.

| Identifier | Permission key |
| --- | --- |
| `CHAOS_HUB` | chaoshub |
| `CHAOS_INFRASTRUCTURE` | chaosinfrastructure |
| `CHAOS_EXPERIMENT` | chaosexperiment |
| `CHAOS_GAMEDAY` | chaosgameday |
| `CHAOS_PROBE` | chaosprobe |
| `CHAOS_FAULT` | chaosfault |
| `CHAOS_ACTION` | chaosaction |
| `CHAOS_IMAGE_REGISTRY` | chaosimageregistry |
| `CHAOS_SECURITY_GOVERNANCE` | chaossecuritygovernance |

### Continuous Error Tracking

These resource types apply to Harness CET.

| Identifier | Permission key |
| --- | --- |
| `CET_AGENT` | agents |
| `CET_TOKEN` | token |
| `CET_CRITICAL_EVENT` | criticalevent |

### Internal Developer Portal

These resource types apply to Harness IDP.

| Identifier | Permission key |
| --- | --- |
| `IDP_CATALOG` | catalog |
| `IDP_ENVIRONMENT` | idpenvironment |
| `IDP_ENVIRONMENT_BLUEPRINT` | environmentblueprint |
| `IDP_WORKFLOW` | workflow |
| `IDP_PLUGIN` | plugin |
| `IDP_SCORECARD` | scorecard |
| `IDP_LAYOUT` | layout |
| `IDP_CATALOG_ACCESS_POLICY` | catalogaccesspolicy |
| `IDP_INTEGRATION` | integration |
| `IDP_ADVANCED_CONFIGURATION` | advancedconfiguration |
| `IDP_AGGREGATION_RULE` | aggregationrule |

### Infrastructure as Code Management

These resource types apply to Harness IaCM.

| Identifier | Permission key |
| --- | --- |
| `IAC_WORKSPACE` | workspace |
| `IAC_REGISTRY` | registry |
| `IAC_PROVIDER_REGISTRY` | providerregistry |
| `IAC_VARIABLE_SET` | variableset |

### AI DLC Insights and Software Engineering Insights

Every resource type in this group uses the `SEI_` identifier prefix and the `sei` permission key prefix, because AI DLC Insights (AIDI) evolved from Software Engineering Insights (SEI). The prefix does not tell you which capability a resource type belongs to, so the following tables separate them.

Note that an identifier does not always match the label you see in the product. For example, `SEI_CANVAS` controls Studio.

#### AI DLC Insights

These resource types apply to Harness AIDI. Go to [Harness RBAC for AI DLC Insights](/docs/ai-dlc-insights/get-started/rbac) to review the scopes and out-of-the-box roles that use them.

| Identifier | Permission key | Product label |
| --- | --- | --- |
| `SEI_CANVAS` | seicanvas | Studio |
| `SEI_INSIGHTS_CATEGORY` | seiinsightscategory | Insights Categories |
| `SEI_TEAMS` | seiteams | Teams |
| `SEI_DATA_SETTINGS` | seidatasettings | Data Settings |
| `SEI_DEVELOPERS` | seidevelopers | Data Settings, developer records |
| `SEI_INTEGRATIONS` | seiintegrations | Data Settings, integrations |
| `SEI_PROFILES` | seiprofiles | Profiles |

#### Software Engineering Insights

These resource types apply to Harness SEI 1.0. Go to [SEI roles and permissions](/docs/software-engineering-insights/propelo-sei/setup-sei/access-control/sei-roles-and-permissions) to review the roles that use them.

| Identifier | Permission key | Product label |
| --- | --- | --- |
| `SEI_COLLECTIONS` | seicollections | Collections |
| `SEI_INSIGHTS` | seiinsights | Insights |
| `SEI_CONFIGURATION_SETTINGS` | seiconfigurationsettings | Configuration Settings |

The `SEI_PANORAMA` (seipanorama) and `SEI_GOALS` (seigoals) resource types also exist in this namespace.

{/* HDH: SEI_PANORAMA and SEI_GOALS are not yet attributed to AIDI or SEI 1.0. Confirm ownership with the SEI team and move each into the correct table above. SEI_PROFILES and SEI_INTEGRATIONS are listed under AIDI per docs/ai-dlc-insights/get-started/rbac.md, but SEI 1.0 also exposes Profiles and Integrations resources, so confirm whether these identifiers are shared across both capability sets. */}

### Database DevOps

These resource types apply to Harness Database DevOps.

| Identifier | Permission key |
| --- | --- |
| `DB_SCHEMA` | schema |
| `DB_INSTANCE` | instance |

### Cloud Development Environments

These resource types apply to Harness CDE Gitspaces.

| Identifier | Permission key |
| --- | --- |
| `CDE_GITSPACE` | gitspace |
| `CDE_INFRAPROVIDER` | infraprovider |
