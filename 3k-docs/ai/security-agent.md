---
title: Security Agents
sidebar_label: Security Agents
sidebar_position: 6
description: AI-powered agents for vulnerability remediation and deployment failure analysis — Zero Day Remediation and Manifest Remediator.
---

Harness Security agents help teams identify and remediate vulnerabilities and deployment failures using AI. The **Zero Day Remediation** agent scans for and fixes critical CVEs across multiple repositories, while the **Manifest Remediator** analyzes Kubernetes and Helm deployment failures to generate remediation YAML.

---

## Zero Day Remediation Agent

The Zero Day Remediation agent identifies and remediates critical vulnerabilities across multiple repositories. It scans codebases and vulnerability databases, validates package safety, and generates fix PRs to downgrade or upgrade to safe versions.

### Capabilities

- Scans across multiple repositories (controlled by `maxRepos` parameter)
- CVE-based or component-based remediation
- Validates package rollout states, targeting rules, and activity patterns
- Supports Java, JavaScript, TypeScript, Python, Go, and C#
- Creates fix PRs with version updates to safe releases
- Requires the Harness Supply Chain Security module

### Key Inputs

| Input | Type | Description |
|---|---|---|
| `anthropicKey` | secret | Anthropic API key for Claude AI |
| `harnessKey` | secret | Harness API key for platform operations |
| `repoAccessToken` | secret | Token for repository access across orgs |
| `cveId` | string | CVE identifier to remediate (e.g., `CVE-2024-1234`) |
| `componentName` | string | Package/component name (alternative to `cveId`) |
| `fixedVersion` | string | Target safe version to upgrade/downgrade to |
| `currentVersion` | string | Current vulnerable version |
| `harnessOrgId` | string | Harness organization identifier |
| `harnessProjectId` | string | Harness project identifier |
| `targetBranch` | string | Branch to target for PRs (default: `main`) |
| `maxRepos` | string | Maximum number of repositories to scan (default: `0` = unlimited) |
| `branchPrefix` | string | Prefix for fix branches (default: `fix/`) |
| `authorName` | string | Git author name for commits (default: `AI Workflow`) |
| `authorEmail` | string | Git author email for commits (default: `ai-workflow@harness.io`) |
| `search` | string | Filter repositories by name pattern |

### Supported Languages

| Language | Package Manager | File |
|---|---|---|
| Java | Maven / Gradle | `pom.xml` / `build.gradle` |
| JavaScript | npm / yarn | `package.json` |
| TypeScript | npm / yarn | `package.json` |
| Python | pip / poetry | `requirements.txt` / `pyproject.toml` |
| Go | go modules | `go.mod` |
| C# | NuGet | `*.csproj` |

### Pipeline Configuration

```yaml title="pipeline.yaml"
pipeline:
  stages:
    - name: zero_day_remediation
      steps:
        - name: remediate_vulnerabilities
          run:
            container:
              image: harness/vulnerability-remediation-plugin:latest
            with:
              cve_id: <+inputs.cveId>
              component_name: <+inputs.componentName>
              fixed_version: <+inputs.fixedVersion>
              current_version: <+inputs.currentVersion>
              harness_org_id: <+inputs.harnessOrgId>
              harness_project_id: <+inputs.harnessProjectId>
              target_branch: <+inputs.targetBranch>
              branch_prefix: <+inputs.branchPrefix>
              author_name: <+inputs.authorName>
              author_email: <+inputs.authorEmail>
              max_repos: <+inputs.maxRepos>
              search: <+inputs.search>
              working_directory: /harness
              detailed_logging: "true"
            env:
              ANTHROPIC_API_KEY: <+inputs.anthropicKey>
              HARNESS_API_KEY: <+inputs.harnessKey>
              REPO_ACCESS_TOKEN: <+inputs.repoAccessToken>
      platform:
        os: linux
        arch: amd64
  inputs:
    anthropicKey:
      type: secret
      description: Anthropic API key for Claude LLM analysis
    harnessKey:
      type: secret
      description: Harness PAT token for API operations
    repoAccessToken:
      type: secret
      description: Git access token for repository operations
    cveId:
      type: string
      description: CVE identifier to remediate (e.g., CVE-2021-44228)
    componentName:
      type: string
      description: Vulnerable component name to upgrade
    fixedVersion:
      type: string
      description: Target version to upgrade to
    currentVersion:
      type: string
      description: Current vulnerable version
    harnessOrgId:
      type: string
      required: true
      description: Harness organization ID
    harnessProjectId:
      type: string
      required: true
      description: Harness project ID
    targetBranch:
      type: string
      default: main
      description: Target branch for pull requests
    branchPrefix:
      type: string
      default: "fix/"
      description: Prefix for fix branches
    authorName:
      type: string
      default: "AI Workflow"
      description: Git author name for commits
    authorEmail:
      type: string
      default: "ai-workflow@harness.io"
      description: Git author email for commits
    maxRepos:
      type: string
      default: "0"
      description: Maximum repositories to process (0 for unlimited)
    search:
      type: string
      description: Filter repositories by name pattern
```

:::warning Supply Chain Security Required
The Zero Day Remediation agent requires the Harness Supply Chain Security module. Ensure this module is enabled in your account before configuring this agent.
:::

---

## Manifest Remediator Agent

The Manifest Remediator agent analyzes Kubernetes and Helm deployment failures by examining execution logs from failed pipelines. It uses AI to identify root causes and generates a `manifest_remediation_results.yaml` file with specific fixes and step-by-step remediation instructions.

### How It Works

1. **Fetch Logs** — Retrieves execution logs from the failed `K8sRollingDeploy` or `HelmDeploy` steps via the Harness API.
2. **AI Analysis** — Claude AI analyzes the logs to identify the root cause of the deployment failure.
3. **Generate Remediation** — Produces a structured YAML file with root cause analysis, recommended fixes, and configuration updates.

:::info Unique Characteristics
The Manifest Remediator does **not** clone a repository — it works purely from pipeline execution logs and outputs structured remediation guidance as a YAML file.
:::

### Key Inputs

| Input | Type | Description |
|---|---|---|
| `anthropicKey` | secret | Anthropic API key for Claude AI |
| `harnessKey` | secret | Harness API key for fetching execution logs |
| `harnessExecutionId` | string | Failed pipeline execution ID |
| `harnessPipelineId` | string | Pipeline identifier |
| `harnessBaseUrl` | string | Harness API base URL |
| `harnessProjectId` | string | Harness project identifier |
| `harnessOrgId` | string | Harness organization identifier |
| `harnessAccountId` | string | Harness account identifier |

### Pipeline Configuration

```yaml title="pipeline.yaml"
pipeline:
  stages:
    - name: manifest_remediation
      steps:
        - name: PrintEnv
          run:
            shell: bash
            script: |
              echo "Harness Execution ID: <+inputs.harnessExecutionId>"
              echo "Harness Pipeline ID: <+inputs.harnessPipelineId>"
              echo "Harness Base URL: <+inputs.harnessBaseUrl>"
              echo "Harness Project ID: <+inputs.harnessProjectId>"
              echo "Harness Org ID: <+inputs.harnessOrgId>"
              echo "Harness Account ID: <+inputs.harnessAccountId>"
              printenv
        - name: Manifest Remediator
          run:
            container:
              image: rajpatel2/manifest-remediator:manifest-remediator
            with:
              detailed_logging: "true"
              harness_api_key: <+inputs.harnessKey>
              working_directory: /harness
              harness_execution_id: <+inputs.harnessExecutionId>
              harness_pipeline_id: <+inputs.harnessPipelineId>
              harness_base_url: <+inputs.harnessBaseUrl>
              harness_project_id: <+inputs.harnessProjectId>
              harness_org_id: <+inputs.harnessOrgId>
              harness_account_id: <+inputs.harnessAccountId>
            env:
              ANTHROPIC_API_KEY: <+inputs.anthropicKey>
        - name: Output
          run:
            shell: bash
            script: |-
              echo "=== Manifest Remediation Results ==="
              cat /harness/manifest_remediation_results.yaml
      platform:
        os: linux
        arch: arm64
  inputs:
    anthropicKey:
      type: secret
      default: autofix_anthropic_api_key
    harnessKey:
      type: secret
      default: harness_api_key
    harnessExecutionId:
      type: string
    harnessPipelineId:
      type: string
    harnessBaseUrl:
      type: string
    harnessProjectId:
      type: string
    harnessOrgId:
      type: string
    harnessAccountId:
      type: string
```

### Example Output

```yaml title="manifest_remediation_results.yaml"
root_cause:
  type: ImagePullBackOff
  description: "Container image 'myapp:v2.1.0' not found in registry"
  affected_resource: deployment/myapp
  namespace: production
recommended_fixes:
  - action: "Update image tag to existing version"
    manifest: deployment.yaml
    path: spec.template.spec.containers[0].image
    current_value: "myapp:v2.1.0"
    suggested_value: "myapp:v2.0.9"
    confidence: high
  - action: "Add imagePullSecret for private registry"
    manifest: deployment.yaml
    path: spec.template.spec.imagePullSecrets
    suggested_value:
      - name: registry-credentials
    confidence: medium
remediation_steps:
  - "Verify image 'myapp:v2.1.0' exists in the container registry"
  - "Check registry authentication credentials"
  - "Update deployment manifest with correct image tag"
  - "Re-run the deployment pipeline"
```

:::tip Post-Incident Analysis
Configure the Manifest Remediator to trigger automatically when K8s or Helm deployments fail for immediate, actionable remediation guidance — no manual log diving required.
:::