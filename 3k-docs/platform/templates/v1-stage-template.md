---
title: Create a V1 stage template
sidebar_label: V1 Stage Template
description: Define a reusable stage template in V1 pipelines, including inputs, and reference it from any pipeline.
sidebar_position: 19
keywords:
  - stage template
  - v1 pipelines
  - templates
tags:
  - templates
  - v1-pipelines
---

A stage template defines an entire stage, including its steps and any inputs the stage needs at runtime. Use it to standardize a complete unit of pipeline execution, such as a release stage, a scanning stage, or an AI-driven failure analysis stage.

---

## Before you begin

- **V1 pipeline access:** A project with V1 pipelines enabled. Go to the [V1 pipelines overview](/docs/platform/pipelines) to enable V1 in your project.
- **Secrets and connectors:** Any secrets the template references (for example, API keys) and a connector for each container image used by its steps. Go to the [secrets reference](/docs/platform/secrets) and the [connectors reference](/docs/platform/connectors) to configure them.
- **Permissions:** Create and Edit on Templates. Go to the [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.

---

## Author the stage template

Define the template under the top-level `template` key with a `stage` block. Declare runtime inputs under `template.inputs`. The body of `stage` matches a stage you would write inline in a pipeline.

```yaml
template:
  inputs:
    executionUrl:
      required: true
      type: string
  stage:
    steps:
      - id: analyze_execution_failure
        name: Analyze Execution Failure
        run:
          container:
            image: pkg.harness.io/vrvdt5ius7uwygso8s0bia/harness-agents/claude-code-plugin:main
          env:
            ANTHROPIC_API_KEY: <+secrets.getValue("rohan_llm_key")>
          with:
            allowed_tools: mcp__harness__*
            log_file: .agent/output/harness-error-analyzer-v3-log.jsonl
            max_turns: "100"
            mcp_servers: '{"harness":{"allowed":["harness_diagnose","harness_get"],"headers":{"X-Api-Key":"<+secrets.getValue(\"rohan_pat\")>"},"type":"http","url":"https://unifiedpipeline.harness.io/mcp-server-external/mcp"}}'
            task: |
              You are a Pipeline Failure Analyzer. Your job is to analyze a failed Harness pipeline execution and provide a clear, actionable summary.

              Input: Harness Execution URL: <+inputs.executionUrl>

              Workflow:
              1. Parse the execution URL to extract identifiers: account, org, project, pipeline, and execution ID.
              2. Use the Harness MCP tools to fetch execution details.
              3. Identify the specific step or steps that failed.
              4. Extract the relevant error messages and short log snippets.
              5. Analyze the root cause of the failure.
              6. Output a clean text summary with these fields:
                 - Pipeline, Failed Stage, Failed Step, Error, Root Cause, Suggested Fix.
version: 1
```

Inputs declared under `template.inputs` are referenced inside the stage with `<+inputs.<name>>` (or `${{ inputs.<name> }}` in expression-style fields). Mark inputs as `required: true` when the stage cannot run without them.

---

## Store the template

Choose where the template is versioned.

- **Harness-managed:** Save the template in the Harness platform. Versions are created and promoted in Harness.
- **Git-stored:** Commit the template to a Git repository. The Git tag, branch, or commit determines the resolved version.

Go to the [V1 Template Library overview](/docs/platform/templates/v1-template-library-overview) to compare storage modes.

---

## Reference the template from a pipeline

Reference a stage template from inside the `stages` list with the `template` block. Set `uses` to `<scope>.<name>@<version>` and supply input values under `with`.

```yaml
pipeline:
  stages:
    - template:
        uses: account.analyze-failure@1.0.0
        with:
          executionUrl: <+pipeline.triggeredExecutionUrl>
```

If you omit the version suffix, the pipeline resolves to the latest stable version at execution time.

```yaml
pipeline:
  stages:
    - template:
        uses: account.golang
        with:
          version: "1.19"
          goos: linux
          goarch: amd64
          cgo-enabled: true
```

A stage template can be combined with other inline stages. Each `template` entry in `stages` expands into one stage at runtime.

---

## Next steps

A stage template standardizes a complete stage, including its inputs. When you only need to share a smaller unit, use a step or step group template instead. Go to the [step template guide](/docs/platform/templates/v1-step-template) to share a single step. Go to the [step group template guide](/docs/platform/templates/v1-step-group-template) to share an ordered set of steps.
