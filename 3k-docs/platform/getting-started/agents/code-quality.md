---
title: Code Quality Agents
sidebar_label: Code Quality
description: AI-powered agents for code review, test coverage, and CI failure remediation, powered by Claude AI and integrated into your Harness pipelines.
sidebar_position: 2
---

Harness provides three AI-powered agents focused on code quality: Code Review for intelligent PR feedback, Code Coverage for automated test generation, and Autofix for automatic CI failure remediation. These agents use Claude AI to analyze code, generate improvements, and submit changes via pull requests.

---

## Code Review Agent

The Code Review agent automatically reviews code changes in pull requests and posts intelligent feedback directly to the PR. It uses a three-stage process for comprehensive analysis.

### How it works

1. **Review Prompt Generation** — An analysis agent examines the PR diff and generates a targeted review prompt
2. **AI Code Review** — Claude AI (up to 50 iterations) performs comprehensive code review following the generated prompt
3. **Comment Posting** — Review comments are posted directly to the PR via Harness SCM

### Key inputs

| Input | Type | Description |
|---|---|---|
| `anthropicKey` | secret | Anthropic API key for Claude AI |
| `harnessKey` | secret | Harness API key for SCM operations |
| `repo` | string | Repository name |
| `pullReq` | string | Pull request number |

### Pipeline configuration

```yaml title="pipeline.yaml"
pipeline:
  clone:
    depth: 1000
    ref:
      type: pull-request
      number: <+inputs.pullReq>
    repo: <+inputs.repo>
  stages:
    - name: review
      steps:
        - name: review_prompt_generation_agent
          run:
            container:
              image: abhinavharness/drone-ai-review:latest
            with:
              output_file: /harness/.../task.txt
              review_output_file: /harness/.../review.json
              working_directory: /harness
        - name: coding_agent
          run:
            container:
              image: anewdocker25/mydockerhub:coding-agent
            with:
              detailed_logging: "true"
              max_iterations: "50"
              task_file_path: /harness/.../task.txt
              working_directory: /harness
              show_diff: "false"
            env:
              ANTHROPIC_API_KEY: <+inputs.anthropicKey>
        - name: post_comments
          run:
            container:
              image: abhinavharness/comment-plugin:latest
            with:
              comments_file: /harness/.../review.json
              repo: <+inputs.repo>
              pr_number: <+inputs.pullReq>
            env:
              TOKEN: <+inputs.harnessKey>
      platform:
        os: linux
        arch: arm64
  inputs:
    anthropicKey:
      type: secret
      default: account.autofix_anthropic_api_key
    harnessKey:
      type: secret
      default: account.harness_api_key
    repo:
      type: string
      required: true
    pullReq:
      type: string
      required: true
  name: codereview
```

:::info Deep Clone for Context
The Code Review agent uses a deep clone depth (1000 commits) to provide better context for PR diff analysis. This ensures the AI can understand the full history of changes.
:::

---

## Code Coverage Agent

The Code Coverage agent analyzes codebases and generates comprehensive unit tests to achieve 90%+ code coverage. It creates a detailed COVERAGE.md report, pushes changes to a new branch, and posts coverage results as a PR comment.

### How it works

1. **Codebase Analysis** — Scans source files and identifies coverage gaps
2. **Test Generation** — Claude AI (up to 300 iterations) generates comprehensive unit tests
3. **Coverage Verification** — Runs tests and verifies coverage targets are met
4. **Report Generation** — Creates a COVERAGE.md with per-file coverage breakdown
5. **PR Creation** — Pushes to a unique branch and creates a PR with coverage report as a comment

### Coverage targets

- 90% overall code coverage target
- 80% minimum per-file coverage
- Auto-posted coverage reports on PR
- Go language support with verification enabled

### Key inputs

| Input | Type | Description |
|---|---|---|
| `llmConnector` | connector | LLM connector for AI operations |
| `harnessKey` | secret | Harness API key |
| `gitConnector` | connector | Git connector for repository access |
| `repo` | string | Repository name |
| `branch` | string | Target branch |

### Pipeline configuration

```yaml title="pipeline.yaml"
pipeline:
  clone:
    depth: 1
    ref:
      name: <+inputs.branch>
      type: branch
    repo: <+inputs.repo>
    connector: "<+inputs.gitConnector != null ? inputs.gitConnector.id : ''>"
  stages:
    - name: code-coverage
      steps:
        - name: coding_agent
          run:
            container:
              image: himanshu6956/codecov:coding-agent-with-go
            with:
              detailed_logging: "true"
              max_iterations: "300"
              working_directory: /harness
              show_diff: "false"
              prompt: "Analyze the current codebase and identify test coverage..."
              code_coverage: "true"
              verify: "true"
            env:
              ANTHROPIC_API_KEY: <+inputs.llmConnector.token>
        - name: show_git_diff
          run:
            shell: bash
            script: |-
              git add -A
              git diff --cached
        - name: fix_env_variables
          run:
            shell: bash
            script: |-
              # Detect SCM provider and set credentials
              # Exports SCM_PROVIDER, TOKEN, NETRC_USERNAME, etc.
            env:
              HARNESS_API_KEY: <+inputs.harnessKey>
              SCM_TOKEN: <+inputs.gitConnector.token>
        - name: push_and_create_pr
          run:
            container:
              image: himanshu6956/create-pr-plugin:latest
            env:
              PLUGIN_SCM_PROVIDER: <+pipeline.stages.codecoverage_1.steps.fix_env_variables_1.output.outputVariables.SCM_PROVIDER>
              PLUGIN_TOKEN: <+pipeline.stages.codecoverage_1.steps.fix_env_variables_1.output.outputVariables.TOKEN>
              PLUGIN_REPO: ${{inputs.repo}}
              PLUGIN_SOURCE_BRANCH: ${{inputs.branch}}
              PLUGIN_BRANCH_SUFFIX: code-coverage-agent
              PLUGIN_COMMIT_MESSAGE: "Code coverage: automated test additions by Harness AI"
              PLUGIN_CREATE_PR: "true"
              PLUGIN_PR_TITLE: "Code Coverage: Automated coverage increase by Harness AI"
        - name: prepare_coverage_comment
          run:
            shell: bash
            script: |-
              # Search for COVERAGE.md and prepare PR comment body
              COVERAGE_FILE=$(find . -name "COVERAGE.md" | head -n 1)
              if [ -n "$COVERAGE_FILE" ]; then
                COMMENT_FILE="/harness/coverage_comment_body.txt"
                echo "## Code Coverage Report" > "$COMMENT_FILE"
                cat "$COVERAGE_FILE" >> "$COMMENT_FILE"
                echo "COVERAGE_COMMENT_FILE=$COMMENT_FILE" >> $DRONE_OUTPUT
              fi
        - name: post_coverage_comment
          run:
            container:
              image: abhinavharness/comment-plugin:latest
            shell: sh
            script: |-
              # Post COVERAGE.md content as PR comment
            env:
              PLUGIN_REPO: ${{inputs.repo}}
              PLUGIN_PR_NUMBER: <+pipeline.stages.codecoverage_1.steps.push_and_create_pr_1.output.outputVariables.PR_NUMBER>
      platform:
        os: linux
        arch: arm64
  inputs:
    llmConnector:
      type: connector
    harnessKey:
      type: secret
      default: harness_api_key
    gitConnector:
      type: connector
    repo:
      type: string
    branch:
      type: string
      default: main
      description: The branch to clone from and create PR against (defaults to main)
```

:::info Thorough Analysis
The Code Coverage agent uses up to 300 AI iterations, making it one of the most thorough agents. It is designed to deeply analyze complex codebases and generate meaningful tests rather than superficial coverage.
:::

---

## Autofix Agent

The Autofix agent automatically diagnoses and fixes CI pipeline failures. When a CI build fails, the agent analyzes execution logs, generates a diagnosis, applies code fixes using Claude AI, and creates a PR with the solution.

### How it works

1. **Log Analysis** — Fetches execution logs from the failed CI pipeline
2. **Diagnosis** — A remediation agent analyzes the failure and identifies the root cause
3. **Fix Generation** — A coding agent (Claude AI, up to 50 iterations) applies code changes to fix the issue
4. **Branch & PR** — Pushes fixes to an `ai-autofix` branch and creates a pull request

### Two-stage AI process

- **Remediation Agent** — Specializes in diagnosing CI failures from logs and error messages
- **Coding Agent** — Takes the diagnosis and applies targeted code fixes

### Key inputs

| Input | Type | Description |
|---|---|---|
| `llmConnector` | connector | LLM connector for AI operations |
| `harnessKey` | secret | Harness API key |
| `gitConnector` | connector | Git connector for repository access |
| `repo` | string | Repository name |
| `branch` | string | Target branch |
| `executionId` | string | Failed pipeline execution ID |

### Pipeline configuration

```yaml title="pipeline.yaml"
pipeline:
  clone:
    depth: 1
    ref:
      name: <+inputs.branch>
      type: branch
    repo: <+inputs.repo>
    connector: "<+inputs.gitConnector != null ? inputs.gitConnector.id : ''>"
  stages:
    - name: autofix
      steps:
        - name: remediation_agent
          run:
            container:
              image: anewdocker25/mydockerhub:remediation-agent
            with:
              detailed_logging: "true"
              harness_api_key: <+inputs.harnessKey>
              output_dir: /harness/.../autofix
              working_directory: /harness
              harness_execution_id: <+inputs.executionId>
            env:
              ANTHROPIC_API_KEY: <+inputs.llmConnector.token>
        - name: coding_agent
          run:
            container:
              image: anewdocker25/mydockerhub:coding-agent
            with:
              detailed_logging: "true"
              max_iterations: "50"
              task_file_path: /harness/.../autofix/task.txt
              working_directory: /harness
              show_diff: "false"
            env:
              ANTHROPIC_API_KEY: <+inputs.llmConnector.token>
        - name: show_git_diff
          run:
            shell: bash
            script: |-
              git add -A
              git diff --cached
        - name: fix_env_variables
          run:
            shell: bash
            script: |-
              # Detect SCM provider and set credentials
              # Exports SCM_PROVIDER, TOKEN, NETRC_USERNAME, etc.
            env:
              HARNESS_API_KEY: <+inputs.harnessKey>
              SCM_TOKEN: <+inputs.gitConnector.token>
        - name: push_and_create_pr
          run:
            container:
              image: himanshu6956/create-pr-plugin:latest
            env:
              PLUGIN_SCM_PROVIDER: <+pipeline.stages.autofix_1.steps.fix_env_variables_1.output.outputVariables.SCM_PROVIDER>
              PLUGIN_TOKEN: <+pipeline.stages.autofix_1.steps.fix_env_variables_1.output.outputVariables.TOKEN>
              PLUGIN_REPO: ${{inputs.repo}}
              PLUGIN_SOURCE_BRANCH: ${{inputs.branch}}
              PLUGIN_BRANCH_SUFFIX: ai-autofix
              PLUGIN_COMMIT_MESSAGE: "Autofix: harness-auto-fix created this fix"
              PLUGIN_CREATE_PR: "true"
              PLUGIN_PR_TITLE: "Autofix: AI automated fixes by Harness"
      platform:
        os: linux
        arch: arm64
  inputs:
    llmConnector:
      type: connector
    harnessKey:
      type: secret
      default: harness_api_key
    gitConnector:
      type: connector
    repo:
      type: string
    branch:
      type: string
      default: main
    executionId:
      type: string
```

:::tip Self-Healing Workflows
The Autofix agent can be configured to trigger automatically when a CI pipeline fails, creating a seamless self-healing workflow. Connect it to pipeline failure notifications for hands-free remediation.
:::