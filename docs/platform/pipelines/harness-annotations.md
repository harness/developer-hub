---
title: Pipeline annotations
sidebar_label: Pipeline annotations
description: You can use annotations to summarize critical information on a pipeline execution
sidebar_position: 23
keywords:
  - pipeline annotations
  - hcli annotate
  - test summaries
tags:
  - pipelines
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Pipeline Annotations allow you to publish rich, structured insights directly into the Harness pipeline execution page.

Instead of searching through thousands of lines of logs to find critical information like test summaries, security scan results, or deployment notes, you can use the `hcli annotate` command to push this data to a dedicated **Annotations** tab in the Harness UI.

This feature enables you to:
* **Improve debugging:** Surface test failures, lint errors, or coverage reports inline.
* **Increase confidence:** Review deployment summaries and changelogs at a glance before approval.
* **Reduce toil:** Eliminate manual log parsing on an execution's console view for key metrics.

:::note Supported infrastructure
Pipeline Annotations are currently supported on **Kubernetes** infrastructure. You can publish annotations from supported shell-based steps, such as **Run** steps in CI and **Shell Script** steps in CD.
:::

## What you will learn from this topic

- How to verify [feature availability](#feature-availability) for Pipeline Annotations
- How [annotations work](#how-annotations-work) and how to create them
- How to use the [`hcli annotate` command](#annotation-syntax) with its parameters
- How to understand [annotation modes](#annotation-modes) for updating annotations
- How the [annotation lifecycle](#annotation-lifecycle) manages annotation updates
- How to [view annotations](#view-annotations-in-the-ui) in the pipeline execution UI
- What [annotation content](#annotation-content) formats are supported
- How to [use pipeline data in annotations](#use-pipeline-data-in-annotations) dynamically
- How to understand [key concepts](#key-concepts) like context uniqueness and limits
- How to apply [best practices](#best-practices) and resolve [common issues](#troubleshooting)

---

## Before you begin

- **Harness project access**: You need View and Execute permissions on <a href="/docs/platform/role-based-access-control/permissions-reference#pipelines" target="_blank" rel="noopener noreferrer">Pipelines</a>. An administrator must assign you a role that includes these permissions. For more information, refer to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" rel="noopener noreferrer">RBAC in Harness</a>.
- **Kubernetes infrastructure**: Pipelines must run on Kubernetes infrastructure. Other infrastructure types are not yet supported.
- **Existing pipeline**: You need a pipeline with steps that generate content you want to annotate. For more information, refer to <a href="/docs/platform/pipelines/add-a-stage" target="_blank" rel="noopener noreferrer">Add a stage</a>.

---

## Feature availability

Pipeline Annotations are available on supported pipeline infrastructure and execution environments.

This feature is currently behind the feature flags `CI_ENABLE_HARNESS_ANNOTATIONS` and `PIPE_HARNESS_ANNOTATIONS`.

If Pipeline Annotations are not available in your account, contact <a href="mailto:support@harness.io">Harness Support</a> to enable these feature flags.

---

## How annotations work

Harness makes the `hcli` binary available out of the box. There is nothing you need to install or configure. When your script runs `hcli annotate`, Harness automatically collects the data and publishes it to the **Annotations** tab.

Perform the following steps to create an annotation:

1. **Generate content:** In your shell (for example, `Run` step in CI or `Shell` step in CD), your script generates necessary information (for example, it runs tests and outputs a `results.md` file).
2. **Run CLI:** You call `hcli annotate` within the same step, specifying a unique context and the content source (a markdown file or inline content).
3. **Publish:** Harness securely captures this data and publishes it to the pipeline.
4. **View:** The annotation appears in the **Annotations** tab of the pipeline execution details.

---

## Annotation syntax

```bash
hcli annotate --context <context-name> (--summary <string> | --summary-file <path>) [options]
```

### Parameters

| **Parameter**                | **Required**                                       | **Default** | **Description** |
| ------------------------ | ------------------------------------------------ | -------------------- | --------------- |
| `--context` | Yes |               | A unique identifier for the annotation within this pipeline execution (for example, test-summary, security-scan).  |
| `--summary-file` | Conditional |  | Path to a markdown file containing the annotation content. You must use either this or `--summary`. |
| `--summary` | Conditional | | A direct string containing the annotation content. Best for short messages. |
| `--style` | No | INFO | Visual style hint for the UI. Options: SUCCESS, INFO, WARNING, FAILURE. |
| `--priority` | No | 5 | Sets priority (1-10). Priority 1 is highest; priority 10 is lowest. Cards are sorted ascending. |
| `--mode` | No | replace |  Operational mode: replace, append, or delete. For more information, refer to <a href="#annotation-modes">Annotation modes</a>. |

---

## Annotation modes

Use annotation modes to create, update, or remove annotations. The available modes are `replace`, `append`, and `delete`.

| **Mode**                | **Behavior**                                       |
| ------------------------ | ------------------------------------------------ | 
| `replace`  | Updates only the fields you specify and keeps all other annotation fields unchanged |	
| `append`	| Adds the new `--summary` or `--summary-file` content to the end of the existing summary, separated by a newline. If you provide `--style` or `--priority` while using append, those values are updated as well. | 
| `delete` | Removes the entire annotation document associated with the context. | 

---

## Annotation lifecycle

An annotation is identified by its **context** within a pipeline execution.

- The first `hcli annotate` command with a context creates the annotation.
- Running the command again with the same context updates the annotation according to the selected mode.
  - **Replace** updates the existing annotation.
  - **Append** adds content to the existing summary.
  - **Delete** removes the annotation associated with the context.
- A different context creates a separate annotation.

This makes the relationship between context and mode clear for managing annotations throughout pipeline execution.

---

## Example usage

Here is a complete example of a Run step in a CI pipeline that generates several different markdown files and then uses `hcli annotate` to publish them as distinct annotations.

```yaml
- step:
    identifier: build_and_test
    type: Run
    name: Build and Test
    spec:
      connectorRef: my-k8s-connector
      image: harness/ci-addon:latest
      shell: Bash
      command: |-
        # Step 1: Create markdown content for the reports
        # A comprehensive build report
        cat > build-results.md << 'EOF'
        # Build Pipeline Results
        ![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
        > **Note:** View full build logs [here](https://example.com).
        ## Test Summary
        - **Total Tests:** 247
        - **Passed:** 245
        - **Failed:** 2
        - **Coverage:** **92.4%**
        EOF

        # A detailed coverage report
        cat > coverage.md << 'EOF'
        # Coverage Summary
        - **Line:** 92.4%
        - **Branch:** 88.1%
        EOF

        # A linting report
        cat > lint-report.md << 'EOF'
        # Lint Report
        ![Lint Status](https://img.shields.io/badge/lint-fail-red.svg)
        - **Errors:** 3
        - **Warnings:** 12
        EOF

        # Step 2: Publish the annotations using hcli

        # Publish the main build report with a WARNING style and high priority
        hcli annotate --context "build-validation" --style "warning" --summary-file "build-results.md" --priority 8

        # Publish a simple, successful annotation with an inline summary
        hcli annotate --context "unit-tests" --style "success" --summary "All 245 unit tests passed." --priority 7

        # Publish the coverage and lint reports as separate annotations
        hcli annotate --context "coverage-report" --style "info" --summary-file "coverage.md" --priority 5
        hcli annotate --context "lint-results" --style "warning" --summary-file "lint-report.md" --priority 6

        # Step 3: Append additional notes to an existing context
        echo "Flaky tests have been quarantined." > extra-notes.md
        hcli annotate --context "build-validation" --summary-file "extra-notes.md" --mode "append"
```

**Create content:** The script first creates three markdown files: `build-results.md`, `coverage.md`, and `lint-report.md`.

**Publish annotations:**

- The `build-validation` annotation is published using the `build-results.md` file. It is given a warning style and a high priority of 8.
- The `unit-tests` annotation is a simple success message passed directly using the `--summary` flag.
- The `coverage-report` and `lint-results` annotations are created from their respective files, each with its own style and priority.

**Append to a context:** The final command targets the same `build-validation` context but uses `--mode "append"`. This adds the content of `extra-notes.md` to the bottom of the existing build report summary, rather than overwriting it.

---

## View annotations in the UI

During pipeline execution, select the **Annotations** tab on the execution details page.

The left panel lists all annotation contexts, sorted by priority (highest to lowest).

The right panel displays the rendered markdown summary for the selected annotation.

Annotations are updated as the pipeline executes and `hcli annotate` commands run.

---

## Annotation content

Annotation summaries use Markdown format for content displayed in the UI.

Supported content includes:

- Headings
- Lists
- Links
- Code blocks
- Bold and italic text
- Standard Markdown images

HTML is not supported and will be stripped for security reasons.

Keep annotation content concise and use links to external reports or artifacts if the content is large.

<div align="center"><DocImage path={require('./static/pipeline-annotation-tab.png')} alt="Annotations tab showing multiple annotation cards with rendered markdown content" width="90%" /></div>

---

## Key concepts

### Context

The `--context` parameter is the unique key for an annotation within a single pipeline execution.

- **Creating a new annotation:** Use a context name that has not been used yet in the execution.
- **Updating an existing annotation:** Re-run the `hcli annotate` command with the same context name. By default, this will replace the existing summary.

:::note
Each context can only have one active card in the Annotations tab. Updating with the same context refreshes the same card.
:::

#### Context uniqueness

A context identifies an annotation within a pipeline execution. Use a stable context name when you want subsequent commands to update the same annotation.

For example, repeatedly using:

```bash
hcli annotate --context "test-summary" ...
```

updates the `test-summary` annotation instead of creating a new annotation card.

This reinforces the most important concept behind `replace` and `append`.

### Limits and guardrails

| **Guardrail**                | **Limit**                                       | **Behavior on exceeding** |
| ------------------------ | ------------------------------------------------ | --------------|
| **Summary size**	| 64KB per annotation	| Truncation happens silently in the annotation, with a warning emitted to step logs. |
| **Annotation count**	| 50 annotations per execution | The request is rejected with an error. |
| **Context name length** | 256 characters	| The annotation is skipped, and a warning is logged. |

---

## Use pipeline data in annotations

Generate annotation content dynamically from values produced during pipeline execution.

For example, a script can use test results, build versions, deployment information, or pipeline variables to generate a Markdown summary before publishing it.

```bash
# Generate dynamic annotation content
VERSION="1.2.3"
TESTS_PASSED=245
TESTS_FAILED=2

cat > summary.md << EOF
# Build Summary

- **Version:** ${VERSION}
- **Tests passed:** ${TESTS_PASSED}
- **Tests failed:** ${TESTS_FAILED}
EOF

# Publish the annotation
hcli annotate \
  --context "build-summary" \
  --summary-file "summary.md"
```

This approach allows annotations to reflect the results of the current pipeline execution rather than using only static content.

---

## Best practices

- Use meaningful context names (`test-summary`, `coverage`, `deploy-notes`)
- Prefer concise markdown (less than 10 lines per card)
- Link to artifacts or dashboards instead of embedding large tables
- Avoid emojis in context keys (safe in content, not in key)
- Use append only for incremental updates; prefer replace for clarity

:::tip

If annotation publishing should not cause a pipeline step to fail, append `|| true` to the `hcli annotate` command. This is useful when annotations are informational and should not affect the pipeline result.

```bash
hcli annotate --context "my-report" --summary-file "report.md" || true
```

If annotation publishing is required for the pipeline to succeed, do not suppress the command's exit status so failures are reported normally.

:::

---

## Troubleshooting

<Troubleshoot
  issue="Summary file not found error when running hcli annotate with --summary-file"
  mode="docs"
  fallback="Verify the file path is correct relative to the step's working directory. Use ls -l to list files and confirm the markdown file exists at the specified path before running hcli annotate."
/>

<Troubleshoot
  issue="Failed to read environment variable error when running hcli annotate command"
  mode="docs"
  fallback="Ensure the script is executing within a Harness pipeline stage with a valid shell environment. The hcli command requires Harness pipeline context and environment variables to function properly."
/>

<Troubleshoot
  issue="Invalid style value error when using --style parameter in hcli annotate"
  mode="docs"
  fallback="Use one of the allowed style values: SUCCESS, INFO, WARNING, or FAILURE. The --style parameter is case-sensitive and must match exactly one of these options."
/>

<Troubleshoot
  issue="Priority out of range error when using --priority parameter in hcli annotate"
  mode="docs"
  fallback="Set --priority to an integer value between 1 and 10, where 1 is highest priority and 10 is lowest priority. Values outside this range are not accepted."
/>

---

## Next steps

- <a href="/docs/platform/pipelines/add-a-stage" target="_blank" rel="noopener noreferrer">Add a stage</a>: Learn about different stage types you can add to your pipelines.
- <a href="/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps" target="_blank" rel="noopener noreferrer">Define failure strategies</a>: Configure how steps handle annotation failures.
- <a href="/docs/platform/variables-and-expressions/harness-variables" target="_blank" rel="noopener noreferrer">Harness variables and expressions</a>: Use expressions to dynamically generate annotation content.
