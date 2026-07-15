---
id: index
slug: /platform/getting-started/connectors
title: Connectors Overview
sidebar_label: Connectors Overview
description: Connectors are integration endpoints that enable pipelines and other Harness resources to communicate with external services — a secure, reusable abstraction for credentials and connection details.
sidebar_position: 1
---

Connectors are integration endpoints that enable pipelines and other Harness resources to communicate with external services. They provide a secure, reusable abstraction for credentials and connection details across your organization.

---

## What are connectors?

A connector encapsulates all the information Harness needs to integrate with an external system — the endpoint URL, authentication credentials, and connection parameters. Once created, a connector can be referenced by any pipeline, trigger, or platform feature that needs to interact with that system.

### Purpose

Connectors cover six major integration categories:

**Source Code Access** — Clone repositories, fetch manifests, and read configuration files from Git providers such as GitHub, GitLab, Bitbucket, and Azure Repos.

**Artifact Retrieval** — Pull container images, Helm charts, and binary packages from registries like Docker Hub, Artifactory, Nexus, and Azure Artifacts.

**Cloud Resource Management** — Provision and manage infrastructure across AWS, GCP, Azure, and other cloud platforms.

**Secrets Management** — Retrieve sensitive values from external secret managers such as HashiCorp Vault, AWS Secrets Manager, and GCP Secret Manager.

**Observability** — Integrate with monitoring and logging platforms like Datadog, Splunk, Prometheus, and New Relic for verification and alerting.

**Collaboration** — Send notifications and create tickets via Slack, Microsoft Teams, Jira, ServiceNow, and PagerDuty.

### Benefits

| Benefit | Description |
|---|---|
| **Reusability** | Define a connector once, then reference it across multiple pipelines and projects without duplicating credentials. |
| **Security** | Credentials are stored in Harness Secret Manager (or an external vault) and never exposed in pipeline YAML or logs. |
| **Separation of Concerns** | Platform administrators manage connector configuration while developers focus on pipeline logic. |
| **Validation** | Each connector includes a test-connection capability that verifies credentials and network connectivity before pipeline execution. |
| **Scope Control** | Connectors can be scoped to an account, organization, or project, providing fine-grained access control. |

---

## Key concepts

Understanding the anatomy and lifecycle of a connector is essential for effective management and troubleshooting.

### Connector anatomy

Every connector consists of the following components:

| Component | Description |
|---|---|
| Name | Human-readable display name for the connector. |
| Identifier | Unique, immutable ID used in YAML and API references (e.g., `my_github_connector`). |
| Type | The category and provider (e.g., GitHub, AWS, Vault). |
| Configuration | Type-specific settings such as URL, region, project, or repository name. |
| Credentials | Authentication details stored as Harness secrets (tokens, passwords, keys, certificates). |
| Status | Current connection health (`Active`, `Failed`, or `Unconfigured`). |
| Metadata | Created date, last modified date, tags, and description. |

### Connector lifecycle

Connectors transition through the following states:

**Active / Success** — The connector has been tested and the connection to the external service is healthy. Pipelines can use this connector without issues.

**Failed** — The most recent connection test failed. This could indicate expired credentials, network issues, or permission changes on the external service.

**Unconfigured** — The connector has been created but not yet tested, or required fields are missing. It must be configured and tested before use in pipelines.

---

## Connector scope

Connectors in Harness 3.0 can be created at three hierarchical levels. The scope determines visibility and where the connector can be referenced.

| Scope | Visibility | Use Case |
|---|---|---|
| Account | Available to all organizations and projects within the account. | Shared cloud provider credentials, enterprise-wide secret managers, company-level SCM access. |
| Organization | Available to all projects within the organization. | Team-level artifact registries, department-specific monitoring integrations. |
| Project | Available only within the specific project. | Application-specific service accounts, project-scoped tokens, environment-specific connectors. |

### Referencing across scopes

When referencing a connector from a higher scope, use the scope prefix in the identifier. Use `account.my_connector` for account-level connectors or `org.my_connector` for organization-level connectors. Project-level connectors are referenced by their identifier alone.

---

## Connection types

Connectors support several connection and authentication mechanisms depending on the external service being integrated.

| Type | Description |
|---|---|
| HTTP / HTTPS | Standard web-based connections using REST APIs. Used by most code repositories, artifact registries, and cloud providers. Supports token-based and basic authentication. |
| SSH | Secure shell connections for Git operations. Requires an SSH key stored as a Harness secret. Commonly used for private Git repositories. |
| OAuth | Token-based authentication using the OAuth 2.0 protocol. Supported by GitHub, GitLab, Bitbucket, and other providers with OAuth app integration. |
| Username / Token | Basic authentication with a username and personal access token or password. Widely supported across all connector types. |
| Certificate-based | Mutual TLS (mTLS) authentication using client certificates. Used for Kubernetes clusters, Vault, and other services requiring certificate validation. |

---

## Integration architecture

Understanding how connectors interact with the Harness platform during pipeline execution is critical for troubleshooting and performance optimization. The following sequence describes the connector lifecycle during a pipeline run.

1. **Resolution** — Harness resolves the connector reference from the pipeline YAML, looking up the connector by identifier and scope (project, org, or account).

2. **Validation** — The connector configuration is validated to ensure all required fields are present and correctly formatted. Missing or invalid fields result in a pipeline error before execution begins.

3. **Authentication** — Credentials are retrieved from the configured secret manager and used to authenticate with the external service. Secrets are decrypted at runtime and never persisted in logs or pipeline output.

4. **Connection** — A connection is established to the external service using the resolved endpoint and authenticated credentials. The connection is routed through the Harness Delegate if required.

5. **Operation** — The requested operation is performed (e.g., clone a repo, pull an image, deploy to a cluster). The connector manages retries and error handling for transient failures.

6. **Monitoring** — The connection status, latency, and operation result are recorded for observability. Failed connections update the connector status and can trigger alerts.

### Loose coupling by design

Connectors decouple pipeline logic from infrastructure details. A pipeline does not need to know the specific credentials, endpoints, or authentication mechanism — it only needs the connector identifier. This means you can rotate credentials, change endpoints, or swap providers without modifying any pipeline YAML. The same pipeline can target different environments simply by referencing different connectors at runtime.

```yaml title="pipeline-connectors.yaml"
# Example: Connector reference in pipeline YAML
pipeline:
  name: Build and Deploy
  stages:
    - name: Build
      type: ci
      spec:
        codebase:
          connector: account.github_connector  # Account-scoped connector
          repo: my-org/my-app
        steps:
          - name: Build Image
            type: run
            spec:
              shell: sh
              command: |
                docker build -t my-app:latest .
    - name: Deploy
      type: deploy
      spec:
        service: my_service
        environment:
          name: production
          deploy-to: k8s_prod
          connector: org.k8s_connector  # Org-scoped connector
```