---
title: Connector Types
sidebar_label: Connector Types
description: Reference for all connector types in Harness 3.0; code repositories, artifact registries, cloud providers, secret managers, infrastructure, monitoring, ticketing, and more.
keywords:
  - connector types
  - code repositories
  - artifact repositories
  - cloud providers
  - secret managers
  - monitoring
  - ticketing
tags:
  - connectors
  - platform
sidebar_position: 2
---

Harness 3.0 supports a wide range of connector types organized into categories. Each category serves a specific integration purpose within the platform, and each type exposes its own set of configuration properties. Use this reference to identify the connector you need and the properties you must supply before you configure it.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- <a href="#code-repositories">Select a source control connector and configure its connection and authentication properties</a>.
- <a href="#artifact-repositories">Identify the registry and build server connectors available for artifact retrieval</a>.
- <a href="#cloud-providers">Choose the correct credential type for each cloud platform</a>.
- <a href="#secret-managers">Integrate an external vault or key management service</a>.
- <a href="#infrastructure">Connect Kubernetes and Rancher deployment targets</a>.
- <a href="#monitoring-and-observability">Connect observability platforms for deployment verification and rollback</a>.

---

## Before you begin

Before you select a connector type, ensure you have the following:

- **Connectors overview**: Familiarity with connector scope and connection types. For more information on the connector model, see <a href="/3k-docs/platform/getting-started/connectors" target="_blank">Connectors overview</a>.
- **Provider account access**: An account on the external service with permission to create tokens, keys, or service accounts.
- **Delegate availability**: A <a href="/docs/platform/delegates/delegate-concepts/delegate-overview" target="_blank">Harness Delegate</a> with network access to the provider, for services hosted in a private network.

---

## Code repositories

Code repository connectors provide access to source code, manifests, and configuration files stored in version control systems. You can use these connectors during the CI build stage and to fetch Kubernetes manifests, Helm charts, and Terraform modules.

**Use cases:** CI/CD pipeline codebase configuration for build triggers, fetching Kubernetes manifests and Helm value files, Terraform module sources and remote state configuration, and webhook-based triggers that run pipelines automatically on push or pull request events.

**Supported platforms:** GitHub, GitLab, Bitbucket, Azure Repos, Generic Git

**Common configuration**

| Property | Description |
|---|---|
| Connection type | HTTP or SSH. |
| URL | Repository or account-level URL. |
| Authentication | Personal access token, OAuth, SSH key, or GitHub App. |
| API access | Enable API access for webhook triggers and status checks. |

---

## Artifact repositories

Artifact repository connectors integrate with registries and build servers to retrieve container images, Helm charts, and binary packages for deployment.

**Use cases:** Pulling container images for Kubernetes deployments, fetching Helm charts from chart museums or OCI registries, retrieving build artifacts from CI servers such as Jenkins or Bamboo, and artifact version selection for deployment and rollback.

**Supported platforms:** Docker Registry, Artifactory (JFrog), Nexus, Helm Chart Repository, Azure Artifacts, Bamboo, Jenkins

**Common configuration**

| Property | Description |
|---|---|
| Registry URL | The base URL of the artifact registry or build server. |
| Authentication | Username and password, token, or anonymous access. |
| Provider type | Docker Hub, ECR, GCR, ACR, or a custom registry. |

---

## Cloud providers

Cloud provider connectors authenticate and interact with major cloud platforms for infrastructure provisioning, deployment, and resource management.

**Use cases:** Infrastructure provisioning with Terraform, CloudFormation, or ARM templates; ECS, EKS, GKE, and AKS cluster deployments; Lambda, Cloud Functions, and Azure Functions serverless deployments; and cloud resource tagging, compliance checks, and cost management.

**Supported platforms:** AWS, Google Cloud Platform (GCP), Microsoft Azure, Terraform Cloud, VMware Tanzu, Spot, Physical Data Center, Salesforce

**Common configuration**

| Property | Description |
|---|---|
| Credential type | Identity and Access Management (IAM) role, service account key, service principal, access key and secret, or delegate-based credentials inherited from the delegate. |
| Region / zone | Target region or zone for resource operations. |
| Cross-account / cross-project | Security Token Service (STS) assume-role ARN for AWS, project ID for GCP, or subscription and tenant ID for Azure. |
| Delegate selectors | Target specific delegates for on-premise or private network access. |

---

## Secret managers

Secret manager connectors integrate with external vaults and key management services to store and retrieve sensitive data such as passwords, tokens, certificates, and encryption keys.

**Use cases:** Centralizing secrets storage across all Harness connectors and pipelines, meeting compliance requirements for external secret storage such as SOC 2 and HIPAA, rotating credentials without modifying connector or pipeline configurations, and encrypting sensitive data at rest using Key Management Service (KMS) backed encryption keys.

**Supported platforms:** AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault, Azure Key Vault, AWS KMS, GCP KMS, Custom Secret Manager

**Common configuration**

| Property | Description |
|---|---|
| Vault URL / endpoint | Base URL of the secret manager service. |
| Authentication | Token, AppRole, IAM, service account, or certificate-based authentication. |
| Secret engine / path | The path prefix or engine name for secret storage. |
| Default | Whether this is the default secret manager for the scope. |

Every Harness account includes a built-in secret manager, <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview" target="_blank">Harness Secret Manager</a>, that uses Google KMS for encryption. You can configure an external secret manager as the default for any scope (**Account**, **Organization**, or **Project**). All new secrets created at that scope then use the external manager automatically.

---

## Infrastructure

Infrastructure connectors provide access to container orchestration platforms and cluster management systems that act as deployment targets.

**Use cases:** Kubernetes rolling deployments, canary releases, and blue/green deployments; Helm chart installations and upgrades across multiple clusters; and multi-cluster management with Rancher for fleet-wide deployments.

**Supported platforms:** Kubernetes, Rancher

**Common configuration**

| Property | Description |
|---|---|
| Cluster URL | The Kubernetes API server endpoint or Rancher management server URL. |
| Authentication | Service account token, client certificate, OpenID Connect (OIDC), or delegate-inherited credentials. |
| Namespace | Default namespace for deployment operations (optional). |

---

## Monitoring and observability

Monitoring connectors integrate with observability platforms for deployment verification, health checks, and automated rollback decisions based on real-time metrics and logs.

**Use cases:** Continuous Verification (CV) during canary and rolling deployments, automated rollback based on error rate, latency, or custom metric thresholds, incident alerting and on-call notification through PagerDuty and OpsGenie, and log analysis for deployment health assessment and anomaly detection.

**Supported platforms:** Datadog, Splunk, Dynatrace, Elastic (ELK), New Relic, AppDynamics, Prometheus, PagerDuty, SumoLogic, OpsGenie, Error Tracking, Custom Health Source

**Common configuration**

| Property | Description |
|---|---|
| API endpoint | The monitoring platform's API URL or data ingestion endpoint. |
| API key / token | Authentication credential stored as a Harness secret. |
| Application / service ID | Provider-specific identifiers that target the correct application or service. |

---

## Ticketing systems

Ticketing connectors integrate with issue tracking and IT Service Management (ITSM) platforms for change management, approval workflows, and deployment tracking.

**Use cases:** Creating and updating Jira tickets as part of deployment pipelines, ServiceNow change request approvals as pipeline gates, and automated deployment tracking and audit trails in ticketing systems.

**Supported platforms:** Jira, ServiceNow

**Common configuration**

| Property | Description |
|---|---|
| Instance URL | The Jira Cloud or Jira Server URL, or the ServiceNow instance URL. |
| Authentication | Username and API token for Jira, or username and password for ServiceNow. |
| Project / table | Default project key for Jira, or table name for ServiceNow. |

---

## Communication

Communication connectors integrate with messaging and collaboration platforms to send notifications about pipeline events, approval requests, and deployment status.

**Use cases:** Pipeline success and failure notifications to team channels, approval request notifications with actionable buttons, and deployment status updates and release announcements.

**Supported platforms:** Slack, Microsoft Teams, Zoom

**Common configuration**

| Property | Description |
|---|---|
| Webhook URL | Incoming webhook URL for the target channel or team. |
| Bot token | OAuth bot token for Slack API access. This is optional and enables richer integrations. |

---

## Other connectors

Additional connector types serve specialized integration needs within the Harness platform.

### Database (JDBC)

Java Database Connectivity (JDBC) connectors enable direct database connectivity for data validation steps, database migration scripts, and custom verification queries during deployments. JDBC connectors support MySQL, PostgreSQL, Oracle, SQL Server, and other JDBC-compatible databases.

### Documentation (Confluence)

Confluence connectors allow pipelines to read from or publish to Confluence pages, which enables automated documentation updates as part of the release process.

### MCP (GitHub MCP)

The GitHub <a href="https://modelcontextprotocol.io/" target="_blank">Model Context Protocol (MCP)</a> connector enables the Harness AI assistant (AIDA) to interact with GitHub repositories, issues, and pull requests through a structured tool interface for AI-driven development workflows.

---

## Next steps

- <a href="/3k-docs/platform/getting-started/connectors/manage" target="_blank">Manage connectors</a>: To create, test, and maintain connectors at the correct scope.
- <a href="/3k-docs/platform/getting-started/connectors/configure" target="_blank">Connector configuration reference</a>: To copy YAML, Terraform, and REST API examples for each connector type.
- <a href="/3k-docs/platform/getting-started/connectors/troubleshooting" target="_blank">Connector troubleshooting</a>: To diagnose authentication, network, and permission failures.
