---
title: Code Coverage
description: Track how much of your code is covered by tests
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Code Coverage

Code coverage shows what percentage of your code is exercised by tests. Harness displays coverage metrics in the **Coverage** tab of your pipeline execution, helping you identify untested code paths.

## What You'll See

| Metric | Description |
|--------|-------------|
| **Total Coverage** | Percentage of all lines covered by tests |
| **Patch Coverage** | Percentage of *changed lines* covered (PRs only) |
| **Per-File Breakdown** | Coverage percentage for each source file |

For pull requests, the diff view shows line-by-line coverage:
- **Green** - Line is covered
- **Red** - Line is not covered
- **Yellow** - Partially covered (some branches)

<DocImage path={require('./static/patch-coverage.png')} />

## Supported Formats

| Format | File Extension | Languages |
|--------|---------------|-----------|
| LCOV | `.info`, `.lcov` | Python, Node.js, C/C++ |
| JaCoCo XML | `.xml` | Java, Kotlin, Scala |
| Go Coverage | `.out` | Go |

## Pipeline Examples

<Tabs>
  <TabItem value="python" label="Python" default>

```yaml
- run:
    script: |-
      # Install dependencies
      pip install pytest pytest-cov

      # Run tests with coverage
      pytest tests/ \
        --junitxml=test-results.xml \
        --cov=src \
        --cov-report=lcov:lcov.info \
        -v

      # Upload test results
      hcli test-reports upload test-results.xml

      # Analyze coverage locally (optional)
      hcli cov analyze --file lcov.info

      # Upload coverage to Harness
      hcli cov upload \
        --file=lcov.info \
        --provider=github \
        --owner="$HARNESS_ORG_ID" \
        --identifier="my-repo"
```

  </TabItem>
  <TabItem value="java" label="Java/Gradle">

```yaml
- step:
    type: Run
    name: Run Tests with Coverage
    spec:
      shell: Sh
      command: |
        # Run tests with JaCoCo coverage
        ./gradlew test jacocoTestReport

        # Upload test results
        hcli test-reports upload "build/test-results/test/*.xml"

        # Upload coverage
        hcli cov upload \
          --file=build/reports/jacoco/test/jacocoTestReport.xml \
          --provider=github \
          --owner="$HARNESS_ORG_ID" \
          --identifier="my-repo"
```

  </TabItem>
  <TabItem value="go" label="Go">

```yaml
- run:
    script: |-
      # Install JUnit reporter
      go install github.com/jstemmer/go-junit-report/v2@latest

      # Run tests with coverage
      go test -v -coverprofile=coverage.out ./... 2>&1 | go-junit-report > report.xml

      # Upload test results
      hcli test-reports upload report.xml

      # Upload coverage
      hcli cov upload \
        --file=coverage.out \
        --provider=Harness \
        --owner="$HARNESS_ORG_ID" \
        --identifier="my-repo"
```

  </TabItem>
</Tabs>

## Analyze Coverage Locally

Before uploading, you can analyze coverage locally:

```bash
hcli cov analyze --file lcov.info
```

This outputs coverage statistics without uploading to Harness, useful for debugging or local development.

## Quality Gates

Enforce minimum coverage thresholds to fail pipelines that don't meet your standards. Use `hcli cov wait-until` to block the pipeline until coverage meets the specified thresholds:

```bash
hcli cov wait-until \
  --gt=70 \
  --patch-gt=80 \
  --timeout=1m \
  --endpoint="$HARNESS_TI_SERVICE_ENDPOINT/coverage"
```

This command:
1. Waits for coverage data to be available
2. Checks if total coverage exceeds the `--gt` threshold (70%)
3. Checks if patch coverage exceeds the `--patch-gt` threshold (80%)
4. Fails the pipeline if thresholds are not met

Example output when the quality gate fails:
```
Coverage: 84.53%
Lines: 579/685 covered
Patch Coverage: 78.57%
Patch Lines: 11/14 covered
Quality Gate FAILED:
  - patch coverage 78.57% is not > 80.00%
Error: quality gate failed: 1 threshold(s) not met
```

### Quality Gate Parameters

| Parameter | Description |
|-----------|-------------|
| `--gt` | Minimum total coverage percentage required |
| `--patch-gt` | Minimum patch coverage percentage required (for PRs) |
| `--timeout` | How long to wait for coverage data (e.g., `1m`, `30s`) |
| `--endpoint` | Coverage service endpoint |

## CLI Reference

### cov upload

```bash
hcli cov upload \
  --file=<coverage-file> \
  --provider=<provider> \
  --owner=<owner> \
  --identifier=<repo-name>
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--file` | Yes | Path to coverage file |
| `--provider` | Yes | Git provider: `github`, `gitlab`, `bitbucket`, or `Harness` |
| `--owner` | Yes | Organization or owner identifier |
| `--identifier` | Yes | Repository name |

### cov analyze

```bash
hcli cov analyze --file <coverage-file>
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--file` | Yes | Path to coverage file |

### cov wait-until

```bash
hcli cov wait-until \
  --gt=<total-threshold> \
  --patch-gt=<patch-threshold> \
  --timeout=<duration> \
  --endpoint=<endpoint>
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--gt` | No | Minimum total coverage percentage (e.g., `70`) |
| `--patch-gt` | No | Minimum patch coverage percentage (e.g., `80`) |
| `--timeout` | No | Wait timeout (e.g., `1m`, `30s`). Default: `30s` |
| `--endpoint` | Yes | Coverage service endpoint (`$HARNESS_TI_SERVICE_ENDPOINT/coverage`) |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Coverage shows 0% | Verify the coverage file path matches your tool's output |
| Patch coverage not showing | Ensure you're running on a pull request build |
| File not found | Confirm coverage file was generated before the upload step |
| Invalid format | Verify the file format matches supported types (LCOV, JaCoCo, Go) |

## Next Steps

- [Upload test results](./ci-test-reports.md) to see tests alongside coverage
- [View flaky tests](./ci-flaky-tests.md) to identify unreliable tests
