---
title: Flaky Test Detection
description: Automatically identify tests that pass and fail inconsistently
sidebar_position: 3
---

:::info Prerequisites

Flaky Test Detection requires the feature flag `TI_POLICY_EVALUATION_ENABLED` to be enabled on your account. To use hcli commands for managing flaky tests, you must also set the environment variable `CI_ENABLE_HCLI_FOR_TESTS=true` in your pipeline.

Contact [Harness Support](mailto:support@harness.io) to enable the feature flag. Go to [Environment variables](/docs/continuous-integration/use-ci/run-step-settings/#environment-variables) to configure environment variables.

:::

# Flaky Test Detection

A flaky test is one that passes and fails inconsistently - without any code changes. Harness automatically detects these tests and marks them with a **FLAKY** badge so your team knows which tests are unreliable.

## How Detection Works

Harness automatically detects flaky tests by analyzing test results across pipeline executions. A test is identified by its **suite name + class name + repository + test name**.

### Detection Criteria

A test is marked flaky when **both conditions** are met:

1. **Same-commit inconsistency**: The test has both **passed AND failed** on the same commit
2. **Within the observation window**: The inconsistency occurred within the last **14 days**

**Example:** If a build for commit `abc123` ran twice - once where test passed and once where it failed - the test is marked flaky.

:::info Why 14 days?
The 14-day window defines how far back Harness looks when detecting flaky tests. Test behavior older than 14 days is ignored. This ensures flaky detection reflects recent, relevant behavior—not issues that were fixed weeks ago.
:::

### Auto-Recovery

Flaky status is automatically cleared in two ways:

1. **5 consecutive passes**: After 5 successful runs with no flaky occurrences, the status clears immediately
2. **Time expiry**: If no same-commit inconsistency occurs for 14 days, the flaky status naturally expires

### Detection Parameters

| Parameter | Value |
|-----------|-------|
| Observation window | 14 days |
| Flaky trigger | Pass + fail on same commit |
| Auto-recovery | 5 consecutive passes |
| Scope | Per repository |

## View Flaky Tests

### In the Harness UI

1. Open your pipeline execution
2. Click the **Tests** tab
3. Look for the **FLAKY** badge next to test names
4. Use **Filter → Flaky** to show only flaky tests


### Via CLI
List all flaky tests for a repository:

```bash
hcli test-management flaky get \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --repo="https://github.com/your-org/your-repo.git" \
  --api-key="$HARNESS_API_KEY" \
  --endpoint="https://app.harness.io/gateway/ti-service"
```

Example output:
```
Found 6 flaky test(s):
  - com.example.PaymentTest::testRefundTimeout
  - com.example.ApiTest::testWebhookRetry
  - tests.integration.test_api::test_concurrent_requests
```

## Manually Mark a Test

Sometimes you know a test is flaky before automatic detection catches it. Mark it manually:

```bash
hcli test-management flaky set \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --repo="https://github.com/your-org/your-repo.git" \
  --api-key="$HARNESS_API_KEY" \
  --endpoint="https://app.harness.io/gateway/ti-service" \
  --class-name="com.example.PaymentTest" \
  --test-name="testRefundTimeout" \
  --marking=true
```

### Marking Options

| `--marking` value | Effect |
|-------------------|--------|
| `true` | Force mark as flaky (overrides auto-detection) |
| `false` | Force mark as stable (overrides auto-detection) |
| `unset` | Remove manual marking, let auto-detection decide |

## Flaky vs Quarantine

| | Flaky | Quarantine |
|--|-------|------------|
| **Test runs?** | Yes | Yes |
| **Failure blocks pipeline?** | Yes (unless quarantined) | No |
| **Purpose** | Track unreliable tests | Unblock deployments |
| **Recovery** | Automatic (5 passes) | Manual removal or automatic via policies|

A test can be both flaky AND quarantined. When quarantined, the flaky test runs but doesn't block the pipeline.

## Common Causes of Flaky Tests

| Cause | Example | Fix |
|-------|---------|-----|
| **Race conditions** | Test depends on thread timing | Add synchronization or waits |
| **External services** | Test calls real APIs | Mock external dependencies |
| **Shared state** | Tests don't clean up after themselves | Isolate test data |
| **Time sensitivity** | Test checks "now" vs. expected time | Use fixed test clocks |
| **Resource contention** | Tests compete for ports/files | Use unique resources per test |

## Automate with Policies

Instead of manually managing flaky tests, use [policies](./ci-test-policies.md) to automate quarantine:

```json
[
  {
    "when": ["test is flaky", "test failed"],
    "action": ["mark quarantine"]
  }
]
```

This policy automatically quarantines any flaky test that fails, preventing it from blocking your pipeline while still tracking its status.

## Next Steps

- [Quarantine flaky tests](./ci-test-quarantine.md) to unblock deployments
- [Set up policies](./ci-test-policies.md) to automate test management
