---
title: Developer Productivity Agents
sidebar_label: Developer Productivity
description: AI-powered agents for feature flag cleanup, framework upgrades, and repository onboarding — automating common engineering workflows that are tedious and time-consuming.
sidebar_position: 4
---

Harness Developer Productivity agents automate common engineering workflows that are tedious and time-consuming. The Feature Flag Cleanup agent removes stale flags from codebases, the React Upgrade agent handles framework upgrades with custom prompts, and the Onboarding agent imports repositories and auto-generates CI pipelines.

---

## Feature Flag Cleanup Agent

The Feature Flag Cleanup agent removes stale feature flags from codebases. Given a feature flag name and the desired treatment (e.g., `on` or `off`), it uses Claude AI to find all flag references, remove evaluations while keeping only the selected treatment's code path, and clean up unused imports and variables.

### How it works

1. **Task Generation** — Generates a detailed cleanup prompt based on the flag name and desired treatment
2. **Code Analysis** — Claude AI (up to 50 iterations) scans the codebase for all flag references
3. **Flag Removal** — Removes flag evaluations, keeping only the code path for the selected treatment
4. **Cleanup** — Removes unused imports, variables, and dead code left by flag removal
5. **Draft PR** — Pushes changes and creates a draft PR via the Harness Code API

### Key inputs

| Input | Type | Description |
|---|---|---|
| `anthropicKey` | secret | Anthropic API key for Claude AI |
| `harnessApiKey` | secret | Harness API key for creating PRs |
| `featureFlag` | string | Name of the feature flag to remove |
| `treatment` | string | Desired treatment to keep (default: `on`) |
| `repo` | string | Repository name |
| `branch` | string | Target branch |

### Output artifacts

- `branch.txt` — Name of the created branch
- `commit.txt` — Commit SHA of the changes
- `pr_title.txt` — AI-generated PR title
- `pr_description.txt` — AI-generated PR description

### Pipeline configuration

```yaml title="pipeline.yaml"
pipeline:
  clone:
    depth: 1
    ref:
      name: <+inputs.branch>
      type: branch
    repo: <+inputs.repo>
  stages:
    - name: FFCleanup
      timeout: 10m
      cache:
        disabled: false
      platform:
        os: linux
        arch: arm64
      steps:
        - name: Agent prompt
          run:
            shell: bash
            script: >
              # Generate cleanup task prompt
        - name: coding_agent
          run:
            container:
              image: anewdocker25/mydockerhub:coding-agent
            with:
              detailed_logging: "true"
              max_iterations: "50"
              task_file_path: /harness/temp-pipeline/task.txt
              working_directory: /harness
            env:
              ANTHROPIC_API_KEY: <+inputs.anthropicKey>
        - name: createNetrc
          run:
            shell: sh
            script: |-
              cat <<EOF > ${HOME}/.netrc
                ...
              EOF
        - name: Pull Request Pusher
          run:
            shell: bash
            script: >
              # Push and create PR via Harness Code API
  inputs:
    anthropicKey:
      type: secret
      default: ffcleanup_anthropic_apikey
    harnessApiKey:
      type: secret
      default: ffcleanup_harness_apikey
    featureFlag:
      type: string
      label: Feature Flag
      required: true
      description: The feature flag to be cleaned up
    treatment:
      type: string
      label: Treatment
      description: The treatment to keep the branch code
      required: false
      default: "on"
    repo:
      type: string
    branch:
      type: string
      default: main
```

:::info Draft PR Review
The Feature Flag Cleanup agent creates draft PRs so your team can review the changes before merging. It generates both a PR title and description using AI, making the review process easy to understand.
:::

---

## React Upgrade Agent

The React Upgrade agent automates React version upgrades and code modifications using custom prompts. Despite its name, it's the most flexible agent — it accepts any free-form prompt, making it suitable for framework upgrades, refactoring, dependency updates, and performance optimization.

### Use cases

- Upgrade React from version 17 to 18
- Refactor class components to functional components with hooks
- Update deprecated API usage across the codebase
- Migrate from one state management library to another
- Apply performance optimizations based on custom criteria

### Key inputs

| Input | Type | Description |
|---|---|---|
| `llmConnector` | connector | LLM connector for AI operations |
| `harnessKey` | secret | Harness API key |
| `gitConnector` | connector | Git connector for repository access |
| `repo` | string | Repository name |
| `branch` | string | Target branch |
| `prompt` | string | Custom prompt describing the upgrade/modification task (required) |

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
    - name: react_upgrade
      id: stage1
      steps:
        - name: coding_agent
          id: step1
          run:
            container:
              image: anewdocker25/mydockerhub:coding-agent
            with:
              detailed_logging: "true"
              max_iterations: "300"
              working_directory: /harness
              show_diff: "false"
              prompt: <+inputs.prompt>
              react_upgrade: "true"
            env:
              ANTHROPIC_API_KEY: <+inputs.llmConnector.token>
        - name: show_git_diff
          id: step2
          run:
            shell: bash
            script: |-
              git add -A
              git diff --cached
        - name: fix_env_variables
          id: step3
          run:
            shell: bash
            script: |-
              # Detect SCM provider and set credentials
              # Exports SCM_PROVIDER, TOKEN, NETRC_USERNAME, etc.
            env:
              HARNESS_API_KEY: <+inputs.harnessKey>
              SCM_TOKEN: <+inputs.gitConnector.token>
        - name: push_and_create_pr
          id: step4
          run:
            container:
              image: himanshu6956/create-pr-plugin:latest
            env:
              PLUGIN_SCM_PROVIDER: <+pipeline.stages.stage1.steps.step3.output.outputVariables.SCM_PROVIDER>
              PLUGIN_TOKEN: <+pipeline.stages.stage1.steps.step3.output.outputVariables.TOKEN>
              PLUGIN_REPO: ${{inputs.repo}}
              PLUGIN_SOURCE_BRANCH: ${{inputs.branch}}
              PLUGIN_BRANCH_SUFFIX: react-upgrade-code-agent
              PLUGIN_COMMIT_MESSAGE: "React upgrade: automated changes by Harness AI"
              PLUGIN_CREATE_PR: "true"
              PLUGIN_PR_TITLE: "React Upgrade: Automated changes by Harness AI"
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
    prompt:
      type: string
      required: true
      description: The prompt/task for the coding agent to execute
```

:::info Flexible Branching
The React Upgrade agent uses up to 300 AI iterations and creates branches with timestamps (e.g., `react-upgrade-code-agent-1706123456`) to avoid conflicts when running multiple upgrades.
:::

---

## Onboarding Agent

The Onboarding agent streamlines repository setup in Harness. It imports repositories from GitHub into Harness Code, analyzes the repo structure to detect technologies and build commands, and auto-generates a CI pipeline tailored to the project.

### How it works

1. **Repository Import** — Clones the source repository from GitHub and imports it into Harness Code
2. **Technology Detection** — Claude Sonnet analyzes the repo structure (languages, frameworks, build tools, dependencies)
3. **Pipeline Generation** — Claude Opus generates a complete CI pipeline based on the detected technology stack
4. **Pipeline Creation** — The generated pipeline is created in Harness via the API

### Unique architecture

- Uses two different Claude models: Sonnet for fast analysis, Opus for high-quality pipeline generation
- No clone step in the pipeline — the agent container itself handles repository cloning
- Runs on `linux/amd64` platform (unlike most agents that use `arm64`)

### Key inputs

| Input | Type | Description |
|---|---|---|
| `anthropicKey` | secret | Anthropic API key for Claude AI |
| `harnessKey` | secret | Harness API key for creating repos and pipelines |
| `scmToken` | secret | Optional SCM token for private repository access |
| `repoNamespace` | string | Source repository namespace/owner (e.g., `myorg`) |
| `repoName` | string | Source repository name |
| `connectorRef` | string | Harness connector reference for git operations (optional) |

### Pipeline configuration

```yaml title="pipeline.yaml"
pipeline:
  stages:
    - name: onboarding
      steps:
        - name: onboarding_agent
          run:
            container:
              image: colinharness/onboarding-agent:1.0.49
            env:
              ANTHROPIC_API_KEY: <+inputs.anthropicKey>
              HARNESS_API_KEY: <+inputs.harnessKey>
              REPO_NAME: <+inputs.repoName>
              REPO_NAMESPACE: <+inputs.repoNamespace>
              SCM_TOKEN: <+inputs.scmToken>
              CONNECTOR_REF: <+inputs.connectorRef>
      platform:
        os: linux
        arch: amd64
  inputs:
    anthropicKey:
      type: secret
      default: account.onboarding_anthropic_api_key
      description: Anthropic API key for Claude AI
    harnessKey:
      type: secret
      default: account.onboarding_harness_token_pat
      description: Harness API key for creating pipelines
    scmToken:
      type: secret
      description: GitHub token for accessing private repositories (optional)
    repoName:
      type: string
      required: true
      description: Name of repository to clone
    repoNamespace:
      type: string
      required: true
      description: Namespace of repository to clone (e.g., github username)
    connectorRef:
      type: string
      description: Harness connector reference for git operations (optional)
  name: onboarding
```

:::tip Migration Made Easy
The Onboarding agent is perfect for teams migrating to Harness. It can import existing GitHub repositories and automatically generate CI pipelines, dramatically reducing the time to get started with Harness CI.
:::