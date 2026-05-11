---
title: Test Quarantine
description: Skip unstable tests to unblock deployments while you investigate
sidebar_position: 4
---

# Test Quarantine

When an unstable test blocks every deployment, quarantine lets you bypass it while you investigate. Quarantined tests still run, so you see if they're fixed, but their failures don't block the pipeline.

:::warning Quarantine is Temporary
Create a tracking issue with a deadline for every quarantined test. Quarantined tests represent untested code paths.
:::

## Prerequisites

Before using test quarantine commands, ensure you have:

- **Harness account access:** Account ID for your Harness account.
- **Personal Access Token (PAT):** Required for API authentication. Go to [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys) to create a PAT.
- **hcli installed:** Harness CLI tool must be available in your environment. Go to [Install and configure Harness CLI](/docs/platform/automation/cli/install) to download hcli for your operating system and architecture.

---

## Enable Quarantine in Your Pipeline

Many test steps are configured to fail the build when any test fails.
When quarantine is enabled, Harness evaluates the test results and **ignores failures from quarantined tests when determining the step status**.

Quarantined tests still run and their results are recorded, but they won’t cause the step to fail.

To enable this behavior, add the following environment variable to your test step:
```yaml
env:
  CI_ENABLE_QUARANTINED_TEST_SKIP: "true"
```

Full pipeline example:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="python" label="Python" default>

```yaml
- run:
    script: |-
      pytest --junitxml=test-results.xml -v
      hcli test-reports upload test-results.xml
    env:
      CI_ENABLE_QUARANTINED_TEST_SKIP: "true"
```

  </TabItem>
  <TabItem value="java" label="Java/Gradle">

```yaml
- step:
    type: Run
    name: Run Tests
    spec:
      shell: Sh
      command: |
        ./gradlew clean test
        hcli test-reports upload "build/test-results/test/*.xml"
      envVariables:
        CI_ENABLE_QUARANTINED_TEST_SKIP: "true"
```

  </TabItem>
</Tabs>

## When to Quarantine

| Situation | Quarantine? |
|-----------|-------------|
| Flaky test blocks every deployment | Yes |
| External service is temporarily down | Yes |
| Urgent release needed, will fix tomorrow | Yes |
| Test is slow but always passes | No, optimize it |
| Test fails consistently on all runs | No, fix the bug |

## How Quarantine Works

| Original Result | With Quarantine | Pipeline Impact |
|-----------------|-----------------|-----------------|
| FAIL | PASS (ignored) | Does not block |
| PASS | PASS | No change |
| SKIP | SKIP | No change |

The test still executes, you'll see if it passes or fails—but failures are ignored for pipeline status.

## Quarantine a Test

Use the `set` command with the `--quarantine=true` flag to quarantine a test:

```bash
hcli test-management set \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --repo="<URL_for_your_repo>" \
  --endpoint="https://<your-instance>/gateway/ti-service/" \
  --api-key="$HARNESS_PAT" \
  --class-name="com.example.PaymentTest" \
  --test-name="testRefundTimeout" \
  --quarantine=true
```

:::tip Repository URL Format
The `.git` suffix is optional. If omitted, it will be appended automatically.
:::

:::tip When to Use Suite Name
Use the `--suite-name` parameter when your JUnit XML reports include a test suite structure, and you need to uniquely identify a test within a specific suite. This is helpful when the same test name appears in multiple suites.
:::

:::info Endpoint Varies by Instance
The `--endpoint` value is based on your Harness instance domain: `https://<your-instance>/gateway/ti-service/`

For example, if you access Harness at `https://your-instance.harness.io`, use `https://your-instance.harness.io/gateway/ti-service/`.
:::

### Required Parameters

- `--account-id`: Your Harness account ID
- `--repo`: Repository URL (with or without `.git` suffix)
- `--endpoint`: TI service endpoint URL
- `--api-key`: Your Personal Access Token (PAT) starting with `pat.`
- `--class-name`: Test class name (must match the class name in your JUnit XML report)
- `--test-name`: Test method name (must match the test name in your JUnit XML report)
- `--quarantine`: Set to `true` to quarantine, `false` to remove from quarantine, or `unmark` to remove the marking entirely

### Optional Parameters

- `--suite-name`: Test suite name (if the test belongs to a specific suite in your JUnit XML report)
- `--org-id`: Organization ID (if scoped to an organization)
- `--project-id`: Project ID (if scoped to a project)

## View Quarantined Tests

```bash
hcli test-management get \
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

- `--org-id`: Organization ID (filters results to a specific organization)
- `--project-id`: Project ID (filters results to a specific project)

Example output:
```
Found 6 quarantined test(s):
  - com.taskmanager.FlakyTest::flakyTest1
  - com.taskmanager.FlakyTest::Flaky Test 2: Timing sensitive
  - com.taskmanager.FlakyTest::Flaky Test 3: Random number comparison
  - com.taskmanager.service.WorkItemServiceTest::Flaky test that randomly fails
Page 1 of 1 (total: 6 tests)
```

## Remove from Quarantine

After fixing the test, use the `set` command with `--quarantine=false`:

```bash
hcli test-management set \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --repo="<URL_for_your_repo>" \
  --endpoint="https://<your-instance>/gateway/ti-service/" \
  --api-key="$HARNESS_PAT" \
  --class-name="com.example.PaymentTest" \
  --test-name="testRefundTimeout" \
  --quarantine=false
```

---

## Advanced: Set Multiple Test Statuses

The `set` command can update both flaky and quarantine status in a single command:

```bash
hcli test-management set \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --repo="<URL_for_your_repo>" \
  --endpoint="https://<your-instance>/gateway/ti-service/" \
  --api-key="$HARNESS_PAT" \
  --class-name="com.example.PaymentTest" \
  --test-name="testRefundTimeout" \
  --flaky=true \
  --quarantine=true
```

### Available Values

`--flaky` and `--quarantine` accept `true`, `false`, and `unmark`:

- **true:** Mark the test with the status
- **false:** Remove the status from the test
- **unmark:** Remove any manual override and let auto-detection decide

### Examples

Mark a test as flaky only:
```bash
hcli test-management set \
  --class-name="tests.TestSuite" \
  --test-name="test_method" \
  --flaky=true \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --repo="<URL_for_your_repo>" \
  --endpoint="https://<your-instance>/gateway/ti-service/" \
  --api-key="$HARNESS_PAT"
```

Quarantine a test with suite name:
```bash
hcli test-management set \
  --class-name="com.example.PaymentTest" \
  --test-name="testRefundTimeout" \
  --suite-name="com.example.PaymentTestSuite" \
  --quarantine=true \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --repo="<URL_for_your_repo>" \
  --endpoint="https://<your-instance>/gateway/ti-service/" \
  --api-key="$HARNESS_PAT"
```

Remove quarantine marking entirely:
```bash
hcli test-management set \
  --class-name="tests.TestSuite" \
  --test-name="test_method" \
  --quarantine=unmark \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --repo="<URL_for_your_repo>" \
  --endpoint="https://<your-instance>/gateway/ti-service/" \
  --api-key="$HARNESS_PAT"
```

---

## Automate with Policies

Instead of manually quarantining tests, use [policies](./ci-test-policies.md) to automate:

```json
[
  {
    "when": ["test failed"],
    "action": ["mark quarantine"]
  }
]
```

This automatically quarantines any test that fails in the current pipeline execution.

## Best Practices

| Practice | Why |
|----------|-----|
| Create a tracking issue | Every quarantined test needs an owner |
| Set a deadline | Quarantine should be temporary (7 days max) |
| Review weekly | Prevent accumulation of quarantined tests |
| Fix the root cause | Don't just quarantine—investigate and fix |

## Next Steps

- [Set up policies](./ci-test-policies.md) to automate quarantine decisions
- [View flaky tests](./ci-flaky-tests.md) to find quarantine candidates
