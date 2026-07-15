---
title: Connector Types
sidebar_label: Connector Types
description: Reference for all connector types in Harness 3.0 — code repositories, artifact registries, cloud providers, secret managers, infrastructure, monitoring, ticketing, and more.
sidebar_position: 2
---

Harness 3.0 supports a wide range of connector types organized into categories. Each category serves a specific integration purpose within the platform.

---

## Code repositories

Code repository connectors provide access to source code, manifests, and configuration files stored in version control systems. These connectors are used during the CI build stage, for fetching Kubernetes manifests, Helm charts, and Terraform modules.

**Supported platforms:** GitHub, GitLab, Bitbucket, Azure Repos, Generic Git

**Common configuration:**

| Property | Description |
|---|---|
| Connection Type | HTTP or SSH. |
| URL | Repository or account-level URL. |
| Authentication | Personal access token, OAuth, SSH key, or GitHub App. |
| API Access | Enable API access for webhook triggers and status checks. |

**Use cases:** CI/CD pipeline codebase configuration for build triggers, fetching Kubernetes manifests and Helm value files, Terraform module sources and remote state configuration, webhook-based triggers for automated pipeline execution on push or PR events.

---

## Artifact repositories

Artifact repository connectors integrate with registries and build servers to retrieve container images, Helm charts, and binary packages for deployment.

**Supported platforms:** Docker Registry, Artifactory (JFrog), Nexus, Helm Chart Repository, Azure Artifacts, Bamboo, Jenkins

**Common configuration:**

| Property | Description |
|---|---|
| Registry URL | The base URL of the artifact registry or build server. |
| Authentication | Username/password, token, or anonymous access. |
| Provider Type | Docker Hub, ECR, GCR, ACR, or custom registry. |

**Use cases:** Pulling container images for Kubernetes deployments, fetching Helm charts from chart museums or OCI registries, retrieving build artifacts from CI servers like Jenkins or Bamboo, artifact version selection for deployment pipelines and rollback.

---

## Cloud providers

Cloud provider connectors authenticate and interact with major cloud platforms for infrastructure provisioning, deployment, and resource management.

**Supported platforms:** AWS, Google Cloud Platform (GCP), Microsoft Azure, Terraform Cloud, VMware Tanzu, Spot, Physical Data Center, Salesforce

**Common configuration:**

| Property | Description |
|---|---|
| Credential Type | IAM role, service account key, service principal, access key/secret, or delegate-based (inherit from delegate). |
| Region / Zone | Target region or zone for resource operations. |
| Cross-Account / Cross-Project | STS assume-role ARN (AWS), project ID (GCP), or subscription/tenant ID (Azure). |
| Delegate Selectors | Target specific delegates for on-premise or private network access. |

**Use cases:** Infrastructure provisioning with Terraform, CloudFormation, or ARM templates; ECS, EKS, GKE, and AKS cluster deployments; Lambda, Cloud Functions, and Azure Functions serverless deployments; cloud resource tagging, compliance checks, and cost management.

---

## Secret managers

Secret manager connectors integrate with external vaults and key management services to store and retrieve sensitive data such as passwords, tokens, certificates, and encryption keys.

**Supported platforms:** AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault, Azure Key Vault, AWS KMS, GCP KMS, Custom Secret Manager

**Common configuration:**

| Property | Description |
|---|---|
| Vault URL / Endpoint | Base URL of the secret manager service. |
| Authentication | Token, AppRole, IAM, service account, or certificate-based authentication. |
| Secret Engine / Path | The path prefix or engine name for secret storage. |
| Default | Whether this is the default secret manager for the scope. |

**Use cases:** Centralizing secrets storage across all Harness connectors and pipelines, meeting compliance requirements for external secret storage (SOC 2, HIPAA), rotating credentials without modifying connector or pipeline configurations, encrypting sensitive data at rest using KMS-backed encryption keys.

:::info Default Secret Manager
Every Harness account includes a built-in secret manager (Harness Secret Manager) that uses Google KMS for encryption. You can configure an external secret manager as the default for any scope (account, organization, or project), and all new secrets created at that scope will automatically use it.
:::

---

## Infrastructure

Infrastructure connectors provide access to container orchestration platforms and cluster management systems for deployment targets.

**Supported platforms:** Kubernetes, Rancher

**Common configuration:**

| Property | Description |
|---|---|
| Cluster URL | The Kubernetes API server endpoint or Rancher management server URL. |
| Authentication | Service account token, client certificate, OpenID Connect, or delegate-inherited credentials. |
| Namespace | Default namespace for deployment operations (optional). |

**Use cases:** Kubernetes rolling deployments, canary releases, and blue/green deployments; Helm chart installations and upgrades across multiple clusters; multi-cluster management with Rancher for fleet-wide deployments.

---

## Monitoring and observability

Monitoring connectors integrate with observability platforms for deployment verification, health checks, and automated rollback decisions based on real-time metrics and logs.

**Supported platforms:** Datadog, Splunk, Dynatrace, Elastic (ELK), New Relic, AppDynamics, Prometheus, PagerDuty, SumoLogic, OpsGenie, Error Tracking, Custom Health Source

**Common configuration:**

| Property | Description |
|---|---|
| API Endpoint | The monitoring platform's API URL or data ingestion endpoint. |
| API Key / Token | Authentication credential stored as a Harness secret. |
| Application / Service ID | Provider-specific identifiers for targeting the correct application or service. |

**Use cases:** Continuous Verification (CV) during canary and rolling deployments, automated rollback based on error rate, latency, or custom metric thresholds, incident alerting and on-call notification through PagerDuty and OpsGenie, log analysis for deployment health assessment and anomaly detection.

---

## Ticketing systems

Ticketing connectors integrate with issue tracking and IT service management platforms for change management, approval workflows, and deployment tracking.

**Supported platforms:** Jira, ServiceNow

**Common configuration:**

| Property | Description |
|---|---|
| Instance URL | The Jira Cloud/Server URL or ServiceNow instance URL. |
| Authentication | Username/API token (Jira) or username/password (ServiceNow). |
| Project / Table | Default project key (Jira) or table name (ServiceNow). |

**Use cases:** Creating and updating Jira tickets as part of deployment pipelines, ServiceNow change request approvals as pipeline gates, automated deployment tracking and audit trail in ticketing systems.

---

## Communication

Communication connectors integrate with messaging and collaboration platforms to send notifications about pipeline events, approval requests, and deployment status.

**Supported platforms:** Slack, Microsoft Teams, Zoom

**Common configuration:**

| Property | Description |
|---|---|
| Webhook URL | Incoming webhook URL for the target channel or team. |
| Bot Token | OAuth bot token for Slack API access (optional, for richer integrations). |

**Use cases:** Pipeline success/failure notifications to team channels, approval request notifications with actionable buttons, deployment status updates and release announcements.

---

## Other connectors

Additional connector types that serve specialized integration needs within the Harness platform.

### Database (JDBC)

JDBC connectors enable direct database connectivity for data validation steps, database migration scripts, and custom verification queries during deployments. Supports MySQL, PostgreSQL, Oracle, SQL Server, and other JDBC-compatible databases.

### Documentation (Confluence)

Confluence connectors allow pipelines to read from or publish to Confluence pages, enabling automated documentation updates as part of the release process.

### Cloud cost

Cloud cost connectors for AWS, GCP, and Azure enable the Cloud Cost Management (CCM) module to ingest billing data, resource utilization metrics, and cost allocation tags.

:::note Work in Progress
Cloud cost connectors are currently a work in progress.
:::

### MCP (GitHub MCP)

The GitHub MCP (Model Context Protocol) connector enables the Harness AI assistant (AIDA) to interact with GitHub repositories, issues, and pull requests through a structured tool interface for AI-driven development workflows.