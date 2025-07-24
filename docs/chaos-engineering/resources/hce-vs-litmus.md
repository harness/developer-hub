---
title: Harness Chaos vs LitmusChaos
description: Compare Harness Chaos Engineering with open-source LitmusChaos
sidebar_position: 1
---

# Harness Chaos Engineering vs LitmusChaos

**LitmusChaos** is an open-source CNCF incubation project that provides a comprehensive chaos engineering platform for Kubernetes environments. **Harness Chaos Engineering** is the enterprise-ready, feature-rich version built on top of LitmusChaos.

:::info Key Relationship
- **Harness is the original creator of LitmusChaos** which was donated to CNCF and is now hosted as a CNCF incubation project. Harness continues to be the primary sponsor of LitmusChaos.
- **Harness Chaos Engineering is built on the LitmusChaos foundation** with many additional enterprise features
:::

## Why Choose Harness Chaos Engineering?

**Harness Chaos Engineering** is perfect for:
- Enterprise teams needing advanced governance and security
- Multi-cloud and hybrid infrastructure environments
- Organizations requiring comprehensive platform integrations
- Teams wanting a fully managed SaaS solution with enterprise support
- Large-scale deployments requiring enterprise-grade scalability and performance

## Comprehensive Feature Comparison

| Category | Feature | LitmusChaos | Harness Chaos Engineering |
|----------|---------|-------------|---------------------------|
| **Chaos Orchestration** | Centralized chaos portal | ✅ | ✅ |
| | Resilience probes | ✅ | ✅ |
| | Chaos hubs | Public hub | Enterprise hub |
| | Prometheus metrics | ✅ | ✅ |
| | Direct ChaosHub launches | ✅ | ✅ |
| | YAML-based experiments | ✅ | ✅ |
| | Parallel fault execution | ✅ | ✅ |
| | UI experiment controls | ❌ | ✅ |
| | Event-driven chaos | ✅ | ✅ (via webhooks) |
| | Ready-to-use templates | ❌ | ✅ |
| | Experiment halt capability | ❌ | ✅ |
| | BYOC support | ✅ | ✅ |
| | UI tagging for targets | ❌ | ✅ |
| | Cross-cluster experiments | ❌ | ✅ |
| **Deployment & Agents** | SaaS deployment | ❌ | ✅ |
| | Self-managed platform | ✅ | ✅ |
| | Kubernetes native agent | ✅ | ✅ |
| | Linux native agent | ❌ | ✅ |
| | Windows native agent | ❌ | ✅ |
| | Scope-based isolation | ✅ | ✅ |
| **Advanced Management** | UI CRUD operations | ✅ | ✅ |
| | Multi-cluster experiments | ❌ | ✅ (GameDays/pipelines) |
| | Parallel experiments | ❌ | ✅ (GameDays/pipelines) |
| | Out-of-box experiments | ❌ | ✅ |
| | Chaos experiment templates | ✅ | ✅ |
| | Experiment scheduling | ✅ | ✅ |
| | Advanced scheduling (cron) | ✅ | ✅ |
| | GameDays | ❌ | ✅ |
| | Pipelines | ❌ | ✅ |
| | Resilience score | ✅ | ✅ |
| | Experiment analytics | ✅ | ✅ |
| | Advanced analytics | ❌ | ✅ |
| | Chaos experiment comparison | ❌ | ✅ |
| | ChaosHub export | ❌ | ✅ |
| | Direct hub scheduling | ❌ | ✅ |
| | GameDay portal | ❌ | ✅ |
| | ChaosGuard governance | ❌ | ✅ |
| **Authentication & Authorization** | Username authentication | ✅ | ✅ |
| | LDAP provider | ❌ | ✅ |
| | SAML provider | ❌ | ✅ |
| | OAuth providers | ❌ | ✅ |
| | Role-based access control | ✅ | ✅ |
| | Okta provisioning (SCIM) | ❌ | ✅ |
| | Azure AD provisioning | ❌ | ✅ |
| | OneLogin provisioning | ❌ | ✅ |
| | Multiple projects | ❌ | ✅ |
| | Multiple organizations | ❌ | ✅ |
| **Security Features** | Two-factor authentication | ❌ | ✅ |
| | Kubernetes secrets | ✅ | ✅ |
| | External secret managers | ✅ | ✅ |
| | Built-in RBAC roles | Basic | ✅ |
| | Custom RBAC roles | ❌ | ✅ |
| | Audit trail (2-year retention) | ❌ | ✅ |
| | Integrated secrets management | ❌ | ✅ |
| | IP allowlist management | ❌ | ✅ |
| **Discovery & Recommendations** | Auto-discover Kubernetes services | ❌ | ✅ |
| | Auto-create experiments | ❌ | ✅ |
| | Service map visualization | ❌ | ✅ |
| | Manual experiment recommendations | ❌ | ✅ |
| | Traffic-based recommendations | ❌ | ✅ |
| | Resilience recommendations | ❌ | ✅ |
| **Governance Controls** | ChaosHub RBACs | ✅ | ✅ |
| | Infrastructure RBACs | ✅ | ✅ |
| | Experiment CRUD RBACs | ✅ | ✅ |
| | GameDay RBACs | ❌ | ✅ |
| | Target-specific RBACs | ❌ | ✅ |
| | Fault-specific RBACs | ❌ | ✅ |
| | User-specific RBACs | ❌ | ✅ |
| | Time-window RBACs | ❌ | ✅ |
| | ServiceAccount RBACs | ❌ | ✅ |
| **Platform Integrations** | Harness CD integration | ❌ | ✅ |
| | Terraform provider | ❌ | ✅ |
| **APM Integrations** | Prometheus probe | ✅ | ✅ |
| | Datadog probe | ❌ | ✅ |
| | Dynatrace probe | ❌ | ✅ |
| | Splunk Observability probe | ❌ | ✅ |
| | AppDynamics probe | ❌ | ✅ |

## Comprehensive Fault Coverage Comparison

| Category | Fault Type/Service | LitmusChaos | Harness Chaos Engineering |
|----------|-------------------|-------------|---------------------------|
| **Kubernetes Pod Faults** | Container kill | ✅ | ✅ |
| | Pod delete | ✅ | ✅ |
| | Pod autoscaler | ✅ | ✅ |
| | Disk fill | ✅ | ✅ |
| | Filesystem fill | ❌ | ✅ |
| | Pod CPU hog | ✅ | ✅ |
| | Pod memory hog | ✅ | ✅ |
| | Pod network latency | ✅ | ✅ |
| | Pod network loss | ✅ | ✅ |
| | Pod network corruption | ✅ | ✅ |
| | Pod network duplication | ✅ | ✅ |
| | Pod network partition | ✅ | ✅ |
| | Pod network rate limit | ❌ | ✅ |
| | Pod DNS error | ✅ | ✅ |
| | Pod DNS spoof | ✅ | ✅ |
| | Pod HTTP latency | ✅ | ✅ |
| | Pod HTTP status code | ✅ | ✅ |
| | Pod HTTP modify body | ✅ | ✅ |
| | Pod HTTP modify header | ✅ | ✅ |
| | Pod HTTP reset peer | ✅ | ✅ |
| | Pod API block | ❌ | ✅ |
| | Pod API latency | ❌ | ✅ |
| | Pod API modify body | ❌ | ✅ |
| | Pod API modify header | ❌ | ✅ |
| | Pod API status code | ❌ | ✅ |
| | Pod I/O stress | Partial | ✅ |
| | Pod I/O error | ❌ | ✅ |
| | Pod I/O latency | ❌ | ✅ |
| | Pod I/O attribute override | ❌ | ✅ |
| | Pod I/O mistake | ❌ | ✅ |
| | Time chaos | ❌ | ✅ |
| | JVM CPU stress | ❌ | ✅ |
| | JVM method exception | ❌ | ✅ |
| | JVM method latency | ❌ | ✅ |
| | JVM modify return | ❌ | ✅ |
| | JVM trigger GC | ❌ | ✅ |
| | JVM MongoDB faults | ❌ | ✅ |
| | JVM Solace faults | ❌ | ✅ |
| | JVM SQL faults | ❌ | ✅ |
| | Redis cache expire | ❌ | ✅ |
| | Redis cache limit | ❌ | ✅ |
| | Redis cache penetration | ✅ | ✅ |
| **Kubernetes Node Faults** | Node CPU hog | ✅ | ✅ |
| | Node memory hog | ✅ | ✅ |
| | Node I/O stress | ✅ | ✅ |
| | Node network latency | ❌ | ✅ |
| | Node network loss | ❌ | ✅ |
| | Node restart | ✅ | ✅ |
| | Node drain | ✅ | ✅ |
| | Node taint | ✅ | ✅ |
| | Kubelet service kill | ✅ | ✅ |
| | Kubelet density stress | ❌ | ✅ |
| **AWS Cloud Faults** | EC2 stop by ID/tag | ✅ | ✅ |
| | EC2 CPU hog | ❌ | ✅ |
| | EC2 memory hog | ❌ | ✅ |
| | EC2 I/O stress | ❌ | ✅ |
| | EC2 network latency | ❌ | ✅ |
| | EC2 network loss | ❌ | ✅ |
| | EC2 process kill | ❌ | ✅ |
| | EC2 DNS chaos | ❌ | ✅ |
| | EC2 HTTP faults | ❌ | ✅ |
| | Windows EC2 faults | ❌ | ✅ |
| | EBS loss by ID/tag | ❌ | ✅ |
| | ECS agent stop | ❌ | ✅ |
| | ECS task stop/scale | ❌ | ✅ |
| | ECS instance stop | ❌ | ✅ |
| | ECS container faults | ❌ | ✅ |
| | ECS Fargate faults | ❌ | ✅ |
| | ECS network restrict | ❌ | ✅ |
| | ECS update limits | ❌ | ✅ |
| | Lambda inject latency | ❌ | ✅ |
| | Lambda status code | ❌ | ✅ |
| | Lambda modify response | ❌ | ✅ |
| | Lambda update memory/timeout | ❌ | ✅ |
| | Lambda delete concurrency | ❌ | ✅ |
| | Lambda event mapping | ❌ | ✅ |
| | Lambda role permission | ❌ | ✅ |
| | RDS instance delete | ❌ | ✅ |
| | RDS instance reboot | ❌ | ✅ |
| | DynamoDB replication pause | ❌ | ✅ |
| | ALB/CLB/NLB AZ down | ❌ | ✅ |
| | AZ blackhole | ❌ | ✅ |
| | VPC route misconfiguration | ❌ | ✅ |
| | Resource access restrict | ❌ | ✅ |
| | SSM chaos by ID/tag | ❌ | ✅ |
| **GCP Cloud Faults** | VM instance stop | ✅ | ✅ |
| | VM instance stop by label | ✅ | ✅ |
| | VM disk loss | ✅ | ✅ |
| | VM disk loss by label | ✅ | ✅ |
| | VM service kill | ❌ | ✅ |
| | SQL instance failover | ❌ | ✅ |
| **Azure Cloud Faults** | VM basic operations | ✅ | ✅ |
| | VM resource stress | ❌ | ✅ |
| | Web apps | ❌ | ✅ |
| **VMware Infrastructure** | VM power operations | ✅ | ✅ |
| | Resource stress | ❌ | ✅ |
| | Network chaos | ❌ | ✅ |
| | Windows-specific | ❌ | ✅ |
| **Linux OS Faults** | CPU stress | ❌ | ✅ |
| | Memory stress | ❌ | ✅ |
| | Disk fill | ❌ | ✅ |
| | Filesystem fill | ❌ | ✅ |
| | Disk I/O stress | ❌ | ✅ |
| | Network latency | ❌ | ✅ |
| | Network loss | ❌ | ✅ |
| | Network corruption | ❌ | ✅ |
| | Network duplication | ❌ | ✅ |
| | Network rate limit | ❌ | ✅ |
| | Process kill | ❌ | ✅ |
| | Service restart | ❌ | ✅ |
| | DNS error/spoof | ❌ | ✅ |
| | Time chaos | ❌ | ✅ |
| | API faults (block/latency/modify) | ❌ | ✅ |
| | JVM faults | ❌ | ✅ |
| | Redis faults | ❌ | ✅ |
| **Windows OS Faults** | All Linux equivalents | ❌ | ✅ |
| **SSH-based Faults** | Remote system chaos | ❌ | ✅ |
| **Cloud Foundry Faults** | CF application faults | ❌ | ✅ |
| **Kube-Resilience Faults** | Advanced K8s scenarios | ❌ | ✅ |
| **Load Testing** | K6 load generation | ❌ | ✅ |
| | Locust load generation | ❌ | ✅ |
