---
title: Pipeline Annotations
description: You can use annotations to summarize critical information on a pipeline execution
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Custom Summaries with Pipeline Annotations

Pipeline Annotations allow you to publish rich, structured insights directly into the Harness pipeline execution page.

Instead of sifting through thousands of lines of logs to find critical information like test summaries, security scan results, or deployment notes, you can use the `hcli annotate` command to push this data to a dedicated **Annotations** tab in the Harness UI.

This feature enables you to:
* **Improve Debugging:** Surface test failures, lint errors, or coverage reports inline.
* **Increase Confidence:** Review deployment summaries and changelogs at a glance before approval.
* **Reduce Toil:** Eliminate manual log parsing on an execution's console view for key metrics.

:::info Supported Infrastructure
Pipeline Annotations are currently supported on **Kubernetes** infrastructure. Support for all shell steps and stages across Harness platform is coming soon.
:::

## How It Works
Harness makes the `hcli` binary available out of the box. There’s nothing you need to install or configure. When your script runs hcli annotate, Harness automatically collects the data and publishes it to the Annotations tab.
### How to Create an Annotation
1.  **Generate Content:** In your shell (e.g. `Run` step in CI or `Shell` step in CD), your script generates necessary information (e.g., it runs tests and outputs a `results.md` file).
2.  **Run CLI:** You call `hcli annotate` within the same step, specifying a unique context and the content source (a markdown file or inline content).
3.  **Publish:** Harness securely captures this data and publishes it to the Pipeline.
4.  **View:** The annotation appears in the **Annotations** tab of the pipeline execution details.



### Syntax
```bash
hcli annotate --context <context-name> (--summary <string> | --summary-file <path>) [options]
```

#### Parameters
| **Parameter**                | **Required**                                       | **Default** | **Description** |
| ------------------------ | ------------------------------------------------ | -------------------- | --------------- |
| `--context` | Yes |               | A unique identifier for the annotation within this pipeline execution (e.g., test-summary, security-scan).  |
| `--summary-file` | Conditional |  | Path to a markdown file containing the annotation content. You must use either this or --summary. |
| `--summary` | Conditional | | A direct string containing the annotation content. Best for short messages. |
| `--style` | No | INFO | Visual style hint for the UI. Options: SUCCESS, INFO, WARNING, FAILURE. |
| `--priority` | No | 5 | Sets priority (1-10). Priority 1 is highest; priority 10 is lowest. Cards are sorted ascending. |
| `--mode` | No | replace |  Operational mode: replace, append, or delete. See [Modes](/docs/platform/pipelines/harness-annotations.md#modes-replace-append-and-delete). |

### Modes: replace, append, and delete
| **Mode**                | **Behavior**                                       |
| ------------------------ | ------------------------------------------------ | 
| `replace`  | Updates only the fields you specify and keeps all other annotation fields unchanged |	
| `append`	| Adds the new --summary or --summary-file content to the end of the existing summary, separated by a newline. If you provide --style or --priority while using append, those values are updated as well. | 
| `delete` | Removes the entire annotation document associated with the context. | 



## Example Usage
Here is a complete example of a Run step in a CI pipeline that generates several different markdown files and then uses hcli annotate to publish them as distinct annotations.

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
        # Step 1: Create markdown content for our reports
        # A comprehensive build report
        cat > build-results.md << 'EOF'
        # 🚀 Build Pipeline Results
        ![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
        > **Note:** View full build logs [here](https://example.com).
        ## 🧪 Test Summary
        - **Total Tests:** 247
        - **Passed:** ✅ **245**
        - **Failed:** ❌ **2**
        - **Coverage:** **92.4%**
        EOF

        # A detailed coverage report
        cat > coverage.md << 'EOF'
        # 📈 Coverage Summary
        - **Line:** 92.4%
        - **Branch:** 88.1%
        EOF

        # A linting report
        cat > lint-report.md << 'EOF'
        # 🧹 Lint Report
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

### Explanation
**Create Content**: The script first creates three markdown files: build-results.md, coverage.md, and lint-report.md.

**Publish Annotations**:
The build-validation annotation is published using the build-results.md file. It's given a warning style and a high priority of 8.
The unit-tests annotation is a simple success message passed directly using the --summary flag.
The coverage-report and lint-results annotations are created from their respective files, each with its own style and priority.

**Append to a Context**: The final command targets the same build-validation context but uses --mode "append". This adds the content of extra-notes.md to the bottom of the existing build report summary, rather than overwriting it.

### Viewing Annotations in the UI
After the pipeline run is complete, select the new Annotations tab on the execution details page.

The left panel lists all annotation contexts, sorted by priority (highest to lowest).

The right panel displays the rendered markdown summary for the selected context.

The UI supports standard CommonMark markdown, including headings, lists, links, code blocks, and bold/italic text.

:::note 
HTML is not supported for security reasons and will be stripped. Images are rendered as plain link text if they are not standard markdown images. 
:::

![](./static/pipeline-annotation-tab.png)

## Key Concepts
### Context
The --context parameter is the unique key for an annotation within a single pipeline execution.
Creating a new annotation: Use a context name that hasn't been used yet in the execution.
Updating an existing annotation: Re-run the hcli annotate command with the same context name. By default, this will replace the existing summary.


:::note
Each context can only have one active card in the Annotations tab.
Updating with the same context refreshes the same card.
:::

### Limits and Guardrails
| **Guardrail**                | **Limit**                                       | **Behavior on Exceeding** |
| ------------------------ | ------------------------------------------------ | --------------|
| **Summary Size**	| 64KB per annotation	| Truncation happens silently in the annotation, with a warning emitted to step logs. |
| **Annotation Count**	| 50 annotations per execution | The request is rejected with an error. |
| **Context Name** | Length	256 characters	| The annotation is skipped, and a warning is logged. |


## Best Practices and Troubleshooting
### Prevent Step Failures 
- Use meaningful context names (test-summary, coverage, deploy-notes)
- Prefer concise markdown (< 10 lines per card)
- Link to artifacts or dashboards instead of embedding large tables
- Avoid emojis in context keys (safe in content, not in key)
- Use append only for incremental updates; prefer replace for clarity

:::tip
It is highly recommended to append `|| true` to your hcli annotate command. This ensures that if the CLI encounters an error (e.g., file not found, permission issue), it won't cause your entire pipeline step to fail.
```bash
hcli annotate --context "my-report" --summary-file "report.md" || true
```
:::

## Common Errors
| **Error**                | **Cause**                                       | **Solution** |
| ------------------------ | ------------------------------------------------ | --------------|
| Summary file not found | The path provided to --summary-file is incorrect or the file doesn't exist. | Verify the file path is correct relative to the step's working directory. Use ls -l to debug. |
| Failed to read environment variable | The command is being run outside of a Harness CI step context. | Ensure the script is executing within a Harness stage with a valid shell and environment variables in a Harness pipeline. |
| Invalid style value | The value for --style is not one of the allowed options. | Use one of: SUCCESS, INFO, WARNING, FAILURE. |
| Priority out of range | The --priority value is not an integer between 1 and 10. | Annotations error: --priority must be between 1 and 10|