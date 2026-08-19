---
id: index
slug: /platform/getting-started/connectors
title: Connectors Overview
sidebar_label: Connectors Overview
description: Connectors are integration endpoints that enable pipelines and other Harness resources to communicate with external services; a secure, reusable abstraction for credentials and connection details.
keywords:
  - connectors
  - integrations
  - credentials
  - connector scope
  - authentication
  - Harness 3.0
tags:
  - connectors
  - platform
sidebar_position: 1
---

Connectors are integration endpoints that enable pipelines and other Harness resources to communicate with external services. They provide a secure, reusable abstraction for credentials and connection details across your organization. Understanding how connectors resolve, authenticate, and connect helps you configure integrations correctly the first time and diagnose failures quickly.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- <a href="#integration-categories">Identify the six integration categories that connectors cover</a>.
- <a href="#key-concepts">Describe the components and status values that make up a connector</a>.
- <a href="#connector-scope">Select the correct scope for a connector and reference it from another scope</a>.
- <a href="#connection-types">Choose an authentication mechanism for your external service</a>.
- <a href="#integration-architecture">Trace how Harness resolves and uses a connector during a pipeline run</a>.

---

## Before you begin

Before you create or reference a connector, ensure you have the following:

- **Harness account access**: Permissions to view and create connectors at the scope you intend to use. For more information on permissions, see <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a>.
- **External service credentials**: A token, key, or certificate for the service you want to integrate, stored as a Harness secret. For more information on creating secrets, see <a href="/3k-docs/platform/getting-started/secrets" target="_blank">Secrets management overview</a>.
- **Network reachability**: A <a href="/docs/platform/delegates/delegate-concepts/delegate-overview" target="_blank">Harness Delegate</a> with network access to the target service, if the service is not publicly reachable.

---

## Integration categories

Connectors cover six major integration categories. Each category maps to a distinct set of pipeline operations.

- **Source code access**: Clone repositories, fetch manifests, and read configuration files from Git providers such as GitHub, GitLab, Bitbucket, and Azure Repos.
- **Artifact retrieval**: Pull container images, Helm charts, and binary packages from registries like Docker Hub, Artifactory, Nexus, and Azure Artifacts.
- **Cloud resource management**: Provision and manage infrastructure across AWS, GCP, Azure, and other cloud platforms.
- **Secrets management**: Retrieve sensitive values from external secret managers such as HashiCorp Vault, AWS Secrets Manager, and GCP Secret Manager.
- **Observability**: Integrate with monitoring and logging platforms like Datadog, Splunk, Prometheus, and New Relic for verification and alerting.
- **Collaboration**: Send notifications and create tickets through Slack, Microsoft Teams, Jira, ServiceNow, and PagerDuty.

A connector encapsulates all the information Harness needs to integrate with an external system, including the endpoint URL, authentication credentials, and connection parameters. After you create a connector, any pipeline, trigger, or platform feature that interacts with that system can reference it.

| Benefit | Description |
|---|---|
| Reusability | Define a connector once, then reference it across multiple pipelines and projects without duplicating credentials. |
| Security | Credentials are stored in Harness Secret Manager (or an external vault) and are never exposed in pipeline YAML or logs. |
| Separation of concerns | Platform administrators manage connector configuration while developers focus on pipeline logic. |
| Validation | Each connector includes a test-connection capability that verifies credentials and network connectivity before pipeline execution. |
| Scope control | Connectors can be scoped to an account, organization, or project, providing fine-grained access control. |

---

## Key concepts

Understand the anatomy and lifecycle of a connector to manage and troubleshoot integrations effectively.

### Connector anatomy

Every connector consists of the following components.

| Component | Description |
|---|---|
| Name | Human-readable display name for the connector. |
| Identifier | Unique, immutable ID used in YAML and API references, for example, `my_github_connector`. |
| Type | The category and provider, for example, GitHub, AWS, or Vault. |
| Configuration | Type-specific settings such as URL, region, project, or repository name. |
| Credentials | Authentication details stored as Harness secrets, including tokens, passwords, keys, and certificates. |
| Status | Current connection health: `Active`, `Failed`, or `Unconfigured`. |
| Metadata | Created date, last modified date, tags, and description. |

### Connector lifecycle

Connectors transition through the following states.

- **Active or Success**: The connector is tested and the connection to the external service is healthy. Pipelines can use this connector without issues.
- **Failed**: The most recent connection test failed. This indicates expired credentials, network issues, or permission changes on the external service.
- **Unconfigured**: The connector is created but not yet tested, or required fields are missing. Configure and test the connector before you use it in a pipeline.

---

## Connector scope

Connectors in Harness 3.0 can be created at three hierarchical levels. The scope determines visibility and where the connector can be referenced.

| Scope | Visibility | Use case |
|---|---|---|
| **Account** | Available to all organizations and projects within the account. | Shared cloud provider credentials, enterprise-wide secret managers, company-level SCM access. |
| **Organization** | Available to all projects within the organization. | Team-level artifact registries, department-specific monitoring integrations. |
| **Project** | Available only within the specific project. | Application-specific service accounts, project-scoped tokens, environment-specific connectors. |

:::tip Referencing across scopes
When you reference a connector from a higher scope, include the scope prefix in the identifier. Use `account.my_connector` for **Account**-level connectors or `org.my_connector` for **Organization**-level connectors. **Project**-level connectors are referenced by their identifier alone.
:::

---

## Connection types

Connectors support several connection and authentication mechanisms, depending on the external service you integrate with.

| Type | Description |
|---|---|
| HTTP / HTTPS | Standard web-based connections using REST APIs. Used by most code repositories, artifact registries, and cloud providers. Supports token-based and basic authentication. |
| SSH | Secure Shell (SSH) connections for Git operations. Requires an SSH key stored as a Harness secret. Commonly used for private Git repositories. |
| OAuth | Token-based authentication using the <a href="https://oauth.net/2/" target="_blank">OAuth 2.0</a> protocol. Supported by GitHub, GitLab, Bitbucket, and other providers with OAuth app integration. |
| Username / Token | Basic authentication with a username and personal access token or password. Widely supported across all connector types. |
| Certificate-based | Mutual Transport Layer Security (mTLS) authentication using client certificates. Used for Kubernetes clusters, Vault, and other services that require certificate validation. |

---

## Integration architecture

Understand how connectors interact with the Harness platform during pipeline execution to troubleshoot failures and optimize performance. The following sequence describes the connector lifecycle during a <a href="/3k-docs/platform/getting-started/pipeline" target="_blank">pipeline</a> run.

**Step 1: Resolution**

Harness resolves the connector reference from the pipeline YAML, looking up the connector by identifier and scope (**Project**, **Organization**, or **Account**).

**Step 2: Validation**

The connector configuration is validated to confirm that all required fields are present and correctly formatted. Missing or invalid fields produce a pipeline error before execution begins.

**Step 3: Authentication**

Credentials are retrieved from the configured secret manager and used to authenticate with the external service. Secrets are decrypted at runtime and are never persisted in logs or pipeline output.

**Step 4: Connection**

A connection is established to the external service using the resolved endpoint and authenticated credentials. The connection is routed through the <a href="/docs/platform/delegates/delegate-concepts/delegate-overview" target="_blank">Harness Delegate</a> if required.

**Step 5: Operation**

The requested operation runs, for example, clone a repository, pull an image, or deploy to a cluster. The connector manages retries and error handling for transient failures.

**Step 6: Monitoring**

The connection status, latency, and operation result are recorded for observability. Failed connections update the connector status and can trigger alerts.

:::tip Loose coupling by design
Connectors decouple pipeline logic from infrastructure details. A pipeline does not need to know the specific credentials, endpoints, or authentication mechanism; it only needs the connector identifier. You can therefore rotate credentials, change endpoints, or swap providers without modifying any pipeline YAML.

The same pipeline can target different environments by referencing different connectors at runtime.
:::

The following example shows how a pipeline references an **Account**-scoped connector for its codebase and an **Organization**-scoped connector for its deployment target, using only connector identifiers.

```yaml title="pipeline-connectors.yaml" showLineNumbers {9,25}
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

---

## Next steps

- <a href="/3k-docs/platform/getting-started/connectors/types" target="_blank">Connector types</a>: To review the supported providers and configuration properties for each category.
- <a href="/3k-docs/platform/getting-started/connectors/manage" target="_blank">Manage connectors</a>: To create, test, edit, and delete connectors in the Harness UI.
- <a href="/3k-docs/platform/getting-started/connectors/configure" target="_blank">Connector configuration reference</a>: To define connectors in YAML, Terraform, or the REST API.
- <a href="/3k-docs/platform/getting-started/connectors/troubleshooting" target="_blank">Connector troubleshooting</a>: To diagnose failed connections and authentication errors.
