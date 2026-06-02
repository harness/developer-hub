---
title: Upload Test Results
description: Send test results to Harness to enable flaky detection and test tracking
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Prerequisites

To use hcli commands for uploading test results, you must set the environment variable `CI_ENABLE_HCLI_FOR_TESTS=true` in your pipeline. Go to [Environment variables](/docs/continuous-integration/use-ci/run-step-settings/#environment-variables) to configure environment variables.

:::

# Upload Test Results

Uploading test results to Harness enables flaky test detection, test history tracking, and visibility in the **Tests** tab. This is the foundation for all test management features.

## Supported Formats

| Format | Languages |
|--------|-----------|
| JUnit XML | Java, Python, Go, Node.js, and most languages |

## Pipeline Examples

<Tabs>
  <TabItem value="python" label="Python" default>

```yaml
- run:
    script: |-
      # Install dependencies
      pip install pytest

      # Run tests with JUnit output
      hcli htx -- pytest tests/ --junitxml=test-results.xml -v

      # Upload to Harness
      hcli test-reports upload test-results.xml
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
        hcli htx -- ./gradlew clean test
        hcli test-reports upload "build/test-results/test/*.xml"
```

  </TabItem>
  <TabItem value="go" label="Go">

```yaml
- run:
    script: |-
      # Install JUnit reporter
      go install github.com/jstemmer/go-junit-report/v2@latest

      # Run tests and convert output to JUnit XML
      hcli htx -- go test -v ./... 2>&1 | go-junit-report > report.xml

      # Upload to Harness
      hcli test-reports upload report.xml
```

  </TabItem>
  <TabItem value="dotnet" label=".NET">

```yaml
- run:
    script: |-
      # Run tests with TRX output (converts to JUnit)
      dotnet test --logger "junit;LogFilePath=test-results.xml"

      # Upload to Harness
      hcli test-reports upload test-results.xml
```

  </TabItem>
</Tabs>

## View Results

After the stage uploading tests completes:

1. Open the pipeline execution
2. Click the **Tests** tab

You'll see:

| Column | Description |
|--------|-------------|
| Test Name | Fully qualified test name |
| Status | Pass, Fail, or Skip |
| Duration | How long the test took |
| **FLAKY** badge | Appears if the test has inconsistent results |

Use **Filter → Flaky** to show only flaky tests.

## Command Reference

```bash
hcli test-reports upload <file-or-glob>
```

| Parameter | Example | Description |
|-----------|---------|-------------|
| File path | `test-results.xml` | Single file |
| Glob pattern | `"**/test-results/*.xml"` | Multiple files (use quotes) |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests not appearing | Verify the file path is correct and the XML format is valid |
| Glob not matching | Use quotes around patterns: `"build/**/*.xml"` |
| Upload fails silently | Add `--verbose` flag to see detailed output |

## Next Steps

Once test results are uploading:
- [View flaky tests](./ci-flaky-tests.md) detected automatically
- [Enable quarantine](./ci-test-quarantine.md) to unblock deployments
- [Add code coverage](./ci-code-coverage.md) tracking
