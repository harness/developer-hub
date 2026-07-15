---
title: Integration Steps Reference
sidebar_label: Integration Steps
description: Reference for integration step templates in Harness 3.0 — HTTP, email, Jira, ServiceNow, Jenkins, Bamboo, SSH, WinRM, and AI Verify.
sidebar_position: 6
---

Harness 3.0 provides integration steps for HTTP requests, notifications, ticketing systems, CI tools, remote execution, and AI-based verification. These steps enable pipelines to interact with external systems and services.

---

## HTTP step

**Template:** `httpStep@1.0.0` · Module: CD/Custom

Execute HTTP requests with support for all methods, custom headers, mTLS authentication, response validation using CEL expressions, and output variable extraction. Runs in `harnessdev/harness-http:0.0.1`.

| Input | Type | Required | Description |
|---|---|---|---|
| `url` | string | Yes | URL for the HTTP request |
| `method` | select | Yes (default: `GET`) | HTTP method (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`, `TRACE`, `CONNECT`) |
| `headers` | string (textarea) | No | HTTP headers as JSON (e.g., `{"Content-Type":"application/json"}`) |
| `body` | string (textarea) | No | Request body content |
| `body_file` | string | No | Path to file containing body |
| `work_dir` | string | No | Working directory (default: workspace) |
| `assertion` | string (textarea) | No | CEL expression for validation (e.g., `response.code == 200`) |
| `output_vars` | string (textarea) | No | JSON mapping for output variables |
| `env_vars` | key-value-pairs | No | Environment variables |
| `client_cert` | string (secret) | No | Client certificate for mTLS |
| `client_key` | string (secret) | No | Private key for mTLS |
| `skip_verify` | boolean | No (default: `false`) | Skip SSL/TLS verification |
| `proxy` | string | No | HTTP/HTTPS proxy URL |
| `disable_redirect` | boolean | No (default: `false`) | Disable redirect following |
| `log_level` | select | No (default: `debug`) | Log level |

:::info CEL Expression Support
The HTTP step uses CEL (Common Expression Language) for response assertions and output variable extraction. Use `response.code` for status code, `response.body` for parsed JSON body, and `response.headers` for response headers.
:::

```yaml title="http-get.yaml"
steps:
  - name: Health Check
    uses: httpStep@1.0.0
    with:
      url: https://api.example.com/health
      method: GET
      assertion: response.code == 200
```

```yaml title="http-post.yaml"
steps:
  - name: Create Resource
    uses: httpStep@1.0.0
    with:
      url: https://api.example.com/resources
      method: POST
      headers: '{"Content-Type":"application/json","Authorization":"Bearer <+secrets.getValue(\"api_token\")>"}'
      body: '{"name":"new-resource","type":"production"}'
      assertion: response.code == 201
      output_vars: '{"resource_id":"response.body.id"}'
```

```yaml title="http-mtls.yaml"
steps:
  - name: Secure API Call
    uses: httpStep@1.0.0
    with:
      url: https://internal-api.example.com/data
      method: GET
      client_cert: <+secrets.getValue("client_cert")>
      client_key: <+secrets.getValue("client_key")>
```

---

## Email step

**Template:** `email@1.0.0` · Module: CD

Send email notifications to recipients and user groups. Runs in `harnessdev/email:0.0.1`.

| Input | Type | Required | Description |
|---|---|---|---|
| `email_ids` | string | Yes | Primary recipient email addresses |
| `subject` | string | Yes | Email subject line |
| `body` | string (textarea) | Yes | Email message content |
| `cc_email_ids` | string | No | CC email addresses |
| `to_user_groups` | string | No | Primary recipient user groups |
| `cc_user_groups` | string | No | CC user groups |
| `smtp_config` | string | No | SMTP configuration |
| `attachments` | list | No | Email attachments |
| `log_level` | select | No (default: `info`) | Log level |

```yaml title="email-example.yaml"
steps:
  - name: Notify Team
    uses: email@1.0.0
    with:
      email_ids: "team@example.com,lead@example.com"
      subject: "Deployment Complete - <+pipeline.name>"
      body: |
        Pipeline <+pipeline.name> has completed successfully.
        Environment: <+env.name>
        Build: <+pipeline.sequenceId>
```

---

## Jira integration steps

Three integration steps for creating, updating, and approving via Jira issues.

| Step | Template ID | Version | Description |
|---|---|---|---|
| Jira Create | `jiraCreate` | 1.0.0 | Create a new Jira issue |
| Jira Update | `jiraUpdate` | 1.0.0 | Update an existing Jira issue |
| Jira Approval | `jiraApproval` | 1.0.0 | Approve or reject via Jira issue |

**Key inputs (create step):**

| Input | Type | Required | Description |
|---|---|---|---|
| `connector` | connector (Jira) | Yes | Jira connector |
| `project` | string | Yes | Jira project key (e.g., `PROJ`) |
| `issue_type` | string | Yes | Issue type (`Story`, `Bug`, `Task`, etc.) |
| `fields` | key-value-pairs | No | Additional fields to set |

```yaml title="jira-create.yaml"
steps:
  - name: Create Bug Ticket
    uses: jiraCreate@1.0.0
    with:
      connector: account.jira
      project: PROJ
      issue_type: Bug
      fields:
        summary: "Deployment failed - <+pipeline.name>"
        description: "Pipeline execution <+pipeline.executionId> failed."
        priority: High
```

```yaml title="jira-approval.yaml"
steps:
  - name: Jira Approval
    uses: jiraApproval@1.0.0
    with:
      connector: account.jira
      issue_key: <+pipeline.variables.jira_ticket>
      approval_criteria:
        status: Approved
```

---

## ServiceNow integration steps

Four integration steps for creating, updating, approving, and importing records via ServiceNow.

| Step | Template ID | Version | Description |
|---|---|---|---|
| ServiceNow Create | `serviceNowCreate` | 1.0.0 | Create a ServiceNow ticket |
| ServiceNow Update | `serviceNowUpdate` | 1.0.0 | Update an existing ticket |
| ServiceNow Approval | `serviceNowApproval` | 1.0.0 | Approve or reject via ServiceNow |
| ServiceNow Import Set | `serviceNowImportSet` | 1.0.0 | Import a set of records |

```yaml title="servicenow-create.yaml"
steps:
  - name: Create Change Request
    uses: serviceNowCreate@1.0.0
    with:
      connector: account.servicenow
      table: change_request
      fields:
        short_description: "Deploy <+service.name> to production"
        category: Software
        priority: "2"
```

---

## Jenkins build

**Template:** `jenkinsBuild@1.0.0` · Module: CI

Execute a Jenkins job and monitor its progress.

| Input | Type | Required | Description |
|---|---|---|---|
| `connector` | connector (Jenkins) | Yes | Jenkins connector |
| `job` | string | Yes | Jenkins job name/path |
| `params` | key-value-pairs | No | Job parameters |

```yaml title="jenkins-build.yaml"
steps:
  - name: Trigger Jenkins Build
    uses: jenkinsBuild@1.0.0
    with:
      connector: account.jenkins
      job: my-project/main
      params:
        BRANCH: main
        DEPLOY_ENV: staging
```

---

## Bamboo build

**Template:** `bambooBuild@1.0.0` · Module: CI

Execute a Bamboo plan and monitor its progress.

| Input | Type | Required | Description |
|---|---|---|---|
| `connector` | connector (Bamboo) | Yes | Bamboo connector |
| `plan` | string | Yes | Bamboo plan key |
| `params` | key-value-pairs | No | Build parameters |

```yaml title="bamboo-build.yaml"
steps:
  - name: Trigger Bamboo Build
    uses: bambooBuild@1.0.0
    with:
      connector: account.bamboo
      plan: PROJ-PLAN
```

---

## SSH step

**Template:** `ssh@1.0.0` · Module: CD

Execute a shell script on a remote host using SSH. Runs in `harnessdev/ssh:0.0.1`.

| Input | Type | Required | Description |
|---|---|---|---|
| `host` | string | Yes | Target SSH host/IP |
| `script` | string | Yes | Shell script to execute |
| `port` | integer | No (default: `22`) | SSH port |
| `work_dir` | string | No | Remote working directory |
| `env_vars` | key-value-pairs | No | Environment variables |
| `out_vars` | key-value-pairs | No | Output variables to capture |
| `secret_out_vars` | key-value-pairs | No | Secret output variables |
| `script_timeout` | string | No (default: `30m`) | Execution timeout |
| `log_level` | select | No (default: `info`) | Log level |

```yaml title="ssh-deploy.yaml"
steps:
  - name: Deploy to Server
    uses: ssh@1.0.0
    with:
      host: 10.0.1.100
      port: 22
      script: |
        cd /opt/app
        docker pull myorg/myapp:latest
        docker-compose up -d
      env_vars:
        APP_VERSION: <+pipeline.sequenceId>
      out_vars:
        deploy_status: DEPLOY_STATUS
      script_timeout: 10m
```

---

## WinRM step

**Template:** `winrm@1.0.0` · Module: CD

Execute a PowerShell script on a remote Windows host using WinRM.

| Input | Type | Required | Description |
|---|---|---|---|
| `host` | string | Yes | Target WinRM host |
| `script` | string | Yes | PowerShell script to execute |
| `port` | integer | No (default: `5985`) | WinRM port |
| `env_vars` | key-value-pairs | No | Environment variables |
| `out_vars` | key-value-pairs | No | Output variables |
| `script_timeout` | string | No (default: `30m`) | Timeout |

```yaml title="winrm-deploy.yaml"
steps:
  - name: Deploy to Windows
    uses: winrm@1.0.0
    with:
      host: 10.0.1.200
      script: |
        Stop-Service -Name "MyApp"
        Copy-Item "\\share\builds\latest\*" "C:\MyApp\" -Recurse
        Start-Service -Name "MyApp"
      script_timeout: 15m
```

---

## AI Verify step

**Template:** `aiVerifyStep@2.0.0` · Module: CV

AI-based verification for continuous deployment with intelligent anomaly detection and log analysis. Supports multiple health source types including Datadog Metrics, Dynatrace Grail Logs, and generic log sources. Uses a matrix strategy to run verification across all configured health sources.

| Input | Type | Required | Description |
|---|---|---|---|
| `health_sources` | array | Yes | Health source identifiers to verify |
| `duration` | string | Yes (default: `5`) | Verification duration in minutes |
| `sensitivity` | select | Yes (default: `Medium`) | Anomaly detection sensitivity (`Low`, `Medium`, `High`) |
| `fail_no_data` | boolean | No (default: `true`) | Fail if no analysis data |
| `fail_metric` | boolean | No (default: `true`) | Fail if any metric has no analysis |
| `control_regex` | string | No | Regex for control nodes (e.g., `.*primary.*`) |
| `test_regex` | string | No | Regex for test nodes (e.g., `.*canary.*`) |
| `baseline_end` | string | Yes | End time of pre-deployment analysis window |
| `verify_start` | string | Yes | Start time of post-deployment analysis window |
| `context` | string | No | Natural language context for monitoring |
| `service` | string | No | Service identifier (default: from context) |
| `env` | string | No | Environment identifier |
| `infra` | string | No | Infrastructure identifier |

**Verification workflow:** (1) Maps health sources to appropriate data collection plugins (Datadog, Dynatrace, etc.). (2) Runs data collection in parallel using matrix strategy across health sources. (3) Compares baseline (pre-deployment) metrics with verification (post-deployment) metrics. (4) Uses AI to detect anomalies and analyze logs. (5) Reports pass/fail based on sensitivity configuration.

```yaml title="ai-verify.yaml"
steps:
  - name: AI Verification
    uses: aiVerifyStep@2.0.0
    with:
      health_sources:
        - datadog_metrics_prod
        - dynatrace_logs_prod
      duration: "10"
      sensitivity: Medium
      context: "Verify new deployment has no performance regression"
```

:::info Health Source Plugin Selection
AI Verify automatically selects the appropriate data collection plugin based on your health source type. Datadog Metrics uses the metrics plugin, Dynatrace Grail uses the log plugin, and other sources use the default log analysis plugin.
:::