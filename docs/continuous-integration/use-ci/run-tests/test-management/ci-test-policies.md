---
title: Test Policies
description: Automate test management with rules that run after each pipeline execution
sidebar_position: 5
---

# Test Policies

Policies automate test management. Configure rules once, and Harness evaluates with every pipeline execution, automatically marking flaky tests or quarantining failures without manual intervention.

:::tip Who Manages Policies?
Policies are typically configured by **platform engineers or QA leads**—not individual developers. This separation ensures quality gates can't be bypassed. Administrators run policy commands locally or from a secure pipeline, while developers simply run their tests.
:::

---

## Prerequisites

Before using test policy commands, ensure you have:

- **Harness account access:** Account, organization, and project IDs.
- **Personal Access Token (PAT):** Required for API authentication. Go to [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys) to create a PAT.
- **hcli installed:** Harness CLI tool must be available in your environment. Go to [Install and configure Harness CLI](/docs/platform/automation/cli/install) to download hcli for your operating system and architecture.

---

## Quick Start

Create a policy that auto-quarantines any failing test:

```bash
# 1. Create policy file
cat > policies.json << 'EOF'
[
  {
    "when": ["test failed"],
    "action": ["mark quarantine"]
  }
]
EOF

# 2. Apply to repository
hcli test-management policy set \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --org-id="$HARNESS_ORG_ID" \
  --project-id="$HARNESS_PROJECT_ID" \
  --repo="<URL_for_your_repo>" \
  --endpoint="https://<your-instance>/gateway/ti-service/" \
  --api-key="$HARNESS_PAT" \
  --file=policies.json
```

:::tip Repository URL Format
The `.git` suffix is optional. If omitted, it will be appended automatically.
:::

:::info Endpoint Varies by Instance
The `--endpoint` value is based on your Harness instance domain: `https://<your-instance>/gateway/ti-service/`

For example, if you access Harness at `https://your-instance.harness.io`, use `https://your-instance.harness.io/gateway/ti-service/`.
:::

## Policy Format

```json
[
  {
    "when": ["condition"],
    "action": ["action"]
  }
]
```

| Field | Description |
|-------|-------------|
| `when` | Array of conditions (all must match—AND logic) |
| `action` | Array of actions to execute when conditions match |

You can define up to **10 policies** per repository.

## Available Conditions

| Condition | Scope | Description |
|-----------|-------|-------------|
| `test failed` | Current execution | Test failed in this pipeline run |
| `test is flaky` | Historical | Test was previously detected as flaky |
| `test is slow` | Current execution | Test execution time exceeded threshold |

## Available Actions

| Action | Effect |
|--------|--------|
| `mark flaky` | Force test as flaky (overrides auto-detection) |
| `unmark flaky` | Clear any manual override—let auto-detection decide flaky status |
| `mark unflaky` | Force test as stable—ignores auto-detection even if test behavior is inconsistent |
| `mark quarantine` | Quarantine the test—failures won't block pipeline |
| `unmark quarantine` | Remove from quarantine |

:::info Flaky Status is Tri-State
A test's flaky status has three possible values:
- **true** (flaky): Set by `mark flaky` or auto-detection
- **false** (stable): Set by `mark unflaky`—overrides detection
- **unset** (auto): Set by `unmark flaky`—lets detection decide
:::

## Policy Examples

### Auto-Quarantine Failing Tests

Immediately quarantine any test that fails:

```json
[
  {
    "when": ["test failed"],
    "action": ["mark quarantine"]
  }
]
```

### Mark Slow Tests as Flaky

Flag tests with timing issues:

```json
[
  {
    "when": ["test is slow"],
    "action": ["mark flaky"]
  }
]
```

### Quarantine Flaky Failures

Only quarantine tests that are already flaky AND fail:

```json
[
  {
    "when": ["test is flaky", "test failed"],
    "action": ["mark quarantine"]
  }
]
```

:::warning Policy Order Matters
Policies are evaluated in order. Place quarantine rules before flaky rules when combining conditions. If a test is marked flaky by an earlier policy, a later policy checking `test is flaky` will match.
:::

## View Current Policies

```bash
hcli test-management policy get \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --repo="<URL_for_your_repo>" \
  --endpoint="https://<your-instance>/gateway/ti-service/" \
  --api-key="$HARNESS_PAT"
```

### Required Parameters

- `--account-id`: Your Harness account ID
- `--repo`: Repository URL (with or without `.git` suffix)
- `--endpoint`: TI service endpoint URL
- `--api-key`: Your Personal Access Token (PAT) starting with `pat.`

### Optional Parameters

- `--org-id`: Organization ID (filters policies to a specific organization)
- `--project-id`: Project ID (filters policies to a specific project)

Example output:
```
Found 1 policy(ies):
[
  {
    "when": ["test failed"],
    "action": ["mark quarantine"]
  }
]
```

## Update Policies

`policy set` **replaces all policies**. Always include every policy you want active:

```bash
# Add a new policy to existing ones
cat > policies.json << 'EOF'
[
  {
    "when": ["test failed"],
    "action": ["mark quarantine"]
  },
  {
    "when": ["test is slow"],
    "action": ["mark flaky"]
  }
]
EOF

hcli test-management policy set \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --org-id="$HARNESS_ORG_ID" \
  --project-id="$HARNESS_PROJECT_ID" \
  --repo="<URL_for_your_repo>" \
  --endpoint="https://<your-instance>/gateway/ti-service/" \
  --api-key="$HARNESS_PAT" \
  --file=policies.json
```

## Clear All Policies

```bash
echo '[]' | hcli test-management policy set \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --org-id="$HARNESS_ORG_ID" \
  --project-id="$HARNESS_PROJECT_ID" \
  --repo="<URL_for_your_repo>" \
  --endpoint="https://<your-instance>/gateway/ti-service/" \
  --api-key="$HARNESS_PAT" \
  --file=-
```

## Running hcli Locally vs In Pipelines

### In Harness Pipelines

Most environment variables are automatically available:

```bash
hcli test-management policy get \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --org-id="$HARNESS_ORG_ID" \
  --project-id="$HARNESS_PROJECT_ID" \
  --repo="$DRONE_GIT_HTTP_URL" \
  --endpoint="$HARNESS_TI_SERVICE_ENDPOINT" \
  --api-key="<+secrets.getValue('harness_pat')>"
```

:::tip Endpoint Configuration
The `HARNESS_TI_SERVICE_ENDPOINT` environment variable is automatically configured based on your cluster. For self-managed installations or custom endpoints, go to [Configure OIDC with GCP WIF for Harness Cloud builds](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs/#how-do-i-configure-oidc-with-gcp-wif-for-harness-cloud-builds) to understand endpoint configuration.
:::

:::info Store PAT as a Secret
Store your Personal Access Token in Harness Secrets Manager and reference it using the expression syntax shown above. Never hardcode tokens in pipeline YAML.
:::

### Running Locally (Administrators)

You must provide all parameters explicitly:

```bash
hcli test-management policy set \
  --account-id="px7xd_BFRCi-pfWPYXVjvw" \
  --org-id="default" \
  --project-id="my-project" \
  --repo="https://github.com/my-org/my-repo" \
  --endpoint="https://<your-instance>/gateway/ti-service/" \
  --api-key="pat.ACCOUNT_ID.RANDOM_STRING.TOKEN_VALUE" \
  --file=policies.json
```

## CLI Reference

### policy set

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--account-id` | Yes | Harness account ID |
| `--org-id` | Yes | Organization ID |
| `--project-id` | Yes | Project ID |
| `--repo` | Yes | Repository URL (`.git` suffix optional, auto-appended) |
| `--endpoint` | Yes | TI service endpoint URL |
| `--api-key` | Yes | Personal Access Token (PAT) starting with `pat.` |
| `--file` | Yes | Path to JSON file (use `-` for stdin) |

### policy get

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--account-id` | Yes | Harness account ID |
| `--repo` | Yes | Repository URL (`.git` suffix optional, auto-appended) |
| `--endpoint` | Yes | TI service endpoint URL |
| `--api-key` | Yes | Personal Access Token (PAT) starting with `pat.` |
| `--org-id` | No | Organization ID (filters results to specific org) |
| `--project-id` | No | Project ID (filters results to specific project) |

## Best Practices

| Practice | Why |
|----------|-----|
| Version control your policies | Track changes, enable code review |
| Start conservative | Begin with lenient policies, tighten as needed |
| Review policy effects weekly | Ensure policies aren't over-quarantining |
| Document policy rationale | Help future admins understand intent |

## Next Steps

- [View quarantined tests](./ci-test-quarantine.md) affected by policies
- [View flaky tests](./ci-flaky-tests.md) detected by the system
