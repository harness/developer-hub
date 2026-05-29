---
title: Test Management Overview
description: Automatically detect flaky tests, quarantine failures, and keep your pipelines green
sidebar_position: 1
---

# Test Management

CI pipelines generate large volumes of test data, but most teams lack visibility and control over test health. Unstable tests block releases, resulting in failing pipelines, slow delivery and limited insights into coverage making it hard to understand real risk.

Harness Test Management turns test results into a **complete test health system**. After you upload test results, Harness continuously analyzes execution history to detect flaky tests, enforce automated policies, enable safe quarantine, and provide coverage insights across builds and pull requests.

This allows teams to keep pipelines fast and reliable while continuously improving test quality and release confidence.

## Test Management Workflow

Test Management follows a simple lifecycle:

1. Upload test results from your pipeline.
2. Build historical test intelligence across executions.
3. Detect instability automatically (flaky tests).
4. Apply governance rules with policies.
5. Unblock pipelines safely using quarantine.
6. Measure test effectiveness with code coverage.

Once enabled, this workflow runs continuously without requiring changes from developers.

## Key Features


| Capability          | What It Does                                                                                                                                  | Value                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Flaky Detection** | Continuously analyzes historical test results to identify tests with inconsistent pass/fail behavior across runs and environments             | Eliminates trust issues in CI by surfacing unreliable tests early and reducing wasted debugging time  |
| **Quarantine**      | Automatically isolates identified flaky tests from pipeline pass/fail status while continuing to execute and track them           | Preserves delivery velocity without hiding risk, enabling teams to ship while fixing test instability |
| **Policies**        | Applies user-defined rules to automatically mark or quarantine tests based on failures, flakiness, or performance signals | Automates governance and enforces consistent quality standards without manual intervention            |
| **Code Coverage**   | Collects and visualizes test coverage for you builds, to show how much code is exercised by tests                  | Increases release confidence by quantifying risk and guiding targeted improvements to test quality    |


## How It Works

Test Management is powered by the Harness CLI (`hcli`) and supports the following functions:

1. Stores test execution history per repository
2. Analyzes test behavior within a 14-day observation window
3. Detects flaky tests when the same test passes and fails on the same commit
4. Evaluates policies during pipeline test execution
5. Tracks quarantined tests without blocking releases
6. Displays coverage insights in pipeline executions and PRs


### Key CLI Commands

Test Management is powered by the Harness CLI (`hcli`). 

Some commands are typically used inside your CI pipelines (for example uploading test results or coverage on every PR), while others are usually run by platform or QA teams from a local environment or admin pipeline (for example managing policies).

| CLI Endpoint                      | Purpose                                           | Example                                     |
| --------------------------------- | ------------------------------------------------- | ------------------------------------------- |
| `hcli test-reports`               | Upload and manage test result data from pipelines | `hcli test-reports upload test-results.xml` |
| `hcli cov`                        | Analyze and upload code coverage reports          | `hcli cov upload --file=coverage.out ...`   |
| `hcli test-management flaky`      | View and manage flaky test status                 | `hcli test-management flaky get ...`        |
| `hcli test-management quarantine` | Manage quarantined tests                          | `hcli test-management quarantine set ...`   |
| `hcli test-management policy`     | Configure automated test policies                 | `hcli test-management policy set ...`       |

To explore all available commands and options, use `--help`:
```
hcli --help
hcli test-management --help
hcli cov --help
```

### Installing hcli

**`hcli` is available automatically when running builds through Harness using any build infrastructure.** 

For **local usage**, download the binary:

```bash
# macOS (Apple Silicon)
curl -fsSL -o hcli "https://storage.googleapis.com/harness-ti/hcli/v0.16/hcli-darwin-arm64"
chmod +x hcli

# macOS (Intel)
curl -fsSL -o hcli "https://storage.googleapis.com/harness-ti/hcli/v0.16/hcli-darwin-amd64"
chmod +x hcli

# Linux (amd64)
curl -fsSL -o hcli "https://storage.googleapis.com/harness-ti/hcli/v0.16/hcli-linux-amd64"
chmod +x hcli

# Linux (arm64)
curl -fsSL -o hcli "https://storage.googleapis.com/harness-ti/hcli/v0.16/hcli-linux-arm64"
chmod +x hcli

# Windows (amd64)
curl -fsSL -o hcli.exe "https://storage.googleapis.com/harness-ti/hcli/v0.16/hcli-windows-amd64.exe"
```

Move to your PATH or use directly: `./hcli --help`

## Quick Setup
Automatic Flaky Test detection will be enabled by default. 
1. Run tests in you pipeline. 
2. Upload test results to Harness.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="python" label="Python" default>

```yaml
- run:
    script: |-
      pytest --junitxml=test-results.xml -v
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
        ./gradlew clean test
        hcli test-reports upload "build/test-results/test/*.xml"
```

  </TabItem>
  <TabItem value="go" label="Go">

```yaml
- run:
    script: |-
      go install github.com/jstemmer/go-junit-report/v2@latest
      go test -v ./... 2>&1 | go-junit-report > report.xml
      hcli test-reports upload report.xml
```

  </TabItem>
</Tabs>


## Learn More

* [Upload Test Results](./ci-test-reports.md)
* [Flaky Test Detection](./ci-flaky-tests.md) 
* [Test Quarantine](./ci-test-quarantine.md)
* [Test Policies](./ci-test-policies.md) 
* [Code Coverage](./ci-code-coverage.md) 

