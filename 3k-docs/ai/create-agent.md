---
title: Building Custom Agents
sidebar_label: Building Custom Agents
description: Build, package, and register your own AI-powered agent plugins for Harness using Go and the Drone plugin architecture.
---

Learn how to build, package, and register your own AI-powered agent plugins for Harness. Agent plugins follow the Drone plugin architecture — a Go-based pattern where each plugin is a Docker container that receives configuration via environment variables and executes autonomous workflows.

| | |
|---|---|
| **Go** | Primary language |
| **Drone** | Plugin architecture |
| **Docker** | Containerized runtime |
| **Harness API** | Native integration |

---

## Plugin Architecture

Harness agent plugins follow the standard Drone plugin architecture. Each plugin is a Go binary that runs inside a Docker container. Configuration is passed via environment variables with a `PLUGIN_` prefix, and the plugin implements a `Plugin` struct with an `Exec()` method.

### Core Components

- **CLI Framework (`main.go`)** — Uses `urfave/cli` for command-line argument parsing. Defines flags that map to `PLUGIN_`-prefixed environment variables.
- **Business Logic (`plugin.go`)** — Contains the `Plugin` struct with all configuration fields and the `Exec()` method that implements the agent's core workflow.
- **Agent Binaries (`bin/`)** — Pre-compiled AI agent binaries (e.g., `ai-code-agent`, `remediation-agent`) that the plugin orchestrates.
- **Docker Container** — Multi-stage Dockerfile that builds the Go binary and packages it with runtime dependencies.

```go title="plugin.go"
package main

import (
    "os"
    "os/exec"
    "github.com/pkg/errors"
    "github.com/sirupsen/logrus"
)

type Plugin struct {
    // Required fields
    WorkingDirectory string
    AnthropicAPIKey  string
    // Optional features
    DetailedLogging  bool
    // Harness API integration
    HarnessAPIKey      string
    HarnessAccountID   string
    HarnessOrgID       string
    HarnessProjectID   string
    HarnessPipelineID  string
    HarnessExecutionID string
    HarnessBaseURL     string
}

func (p *Plugin) Exec() error {
    // 1. Validate configuration
    if p.WorkingDirectory == "" {
        return errors.New("working directory is required")
    }
    if p.AnthropicAPIKey == "" {
        return errors.New("Anthropic API key is required")
    }

    // 2. Setup logging
    if p.DetailedLogging {
        logrus.SetLevel(logrus.DebugLevel)
    }

    // 3. Execute agent binary
    cmd := exec.Command("/root/bin/ai-code-agent",
        "--working-dir", p.WorkingDirectory,
    )
    cmd.Dir = p.WorkingDirectory
    cmd.Stdout = os.Stdout
    cmd.Stderr = os.Stderr
    cmd.Env = append(os.Environ(),
        "ANTHROPIC_API_KEY="+p.AnthropicAPIKey,
    )

    if err := cmd.Run(); err != nil {
        return errors.Wrap(err, "agent execution failed")
    }
    return nil
}
```

:::info Drone Plugin Pattern
If you've built Drone plugins before, the same patterns apply to agent plugins.
:::

---

## Project Structure

Each agent plugin follows a standard directory layout:

```bash
my-agent-plugin/
├── main.go              # CLI entry point with flag definitions
├── plugin.go            # Plugin struct and Exec() business logic
├── go.mod               # Go module definition
├── go.sum               # Dependency checksums
├── Dockerfile           # Multi-stage Docker build
├── Makefile             # Build automation targets
├── README.md            # Plugin documentation
└── bin/                 # Pre-compiled agent binaries
    └── ai-code-agent    # AI coding agent binary
```

| File | Purpose |
|---|---|
| `main.go` | CLI entry point. Defines flags, maps to `PLUGIN_` env vars, constructs `Plugin` struct, and calls `Exec()` |
| `plugin.go` | Core business logic. Contains `Plugin` struct with configuration fields and the `Exec()` method |
| `go.mod` | Go module definition with required dependencies (`urfave/cli`, `logrus`, `godotenv`, `pkg/errors`) |
| `Dockerfile` | Multi-stage Docker build: compile Go binary, then copy to slim runtime image with agent binaries |
| `Makefile` | Build targets: `build` (local binary), `build-docker` (Docker image), `push` (Docker Hub) |
| `bin/` | Pre-compiled agent binaries that the plugin orchestrates at runtime |

```go title="main.go"
package main

import (
    "os"
    "github.com/joho/godotenv"
    "github.com/sirupsen/logrus"
    "github.com/urfave/cli"
)

func main() {
    app := cli.NewApp()
    app.Name = "my-agent-plugin"
    app.Usage = "Harness AI Agent Plugin"
    app.Action = run
    app.Flags = []cli.Flag{
        cli.StringFlag{
            Name:   "working-directory",
            Usage:  "path to the git repository",
            EnvVar: "PLUGIN_WORKING_DIRECTORY",
        },
        cli.StringFlag{
            Name:   "anthropic-api-key",
            Usage:  "Anthropic API key for Claude",
            EnvVar: "PLUGIN_ANTHROPIC_API_KEY,ANTHROPIC_API_KEY",
        },
        cli.BoolFlag{
            Name:   "detailed-logging",
            Usage:  "enable debug-level logging",
            EnvVar: "PLUGIN_DETAILED_LOGGING",
        },
        cli.StringFlag{
            Name:   "prompt",
            Usage:  "task prompt for the agent",
            EnvVar: "PLUGIN_PROMPT",
        },
    }
    if err := app.Run(os.Args); err != nil {
        logrus.Fatal(err)
    }
}

func run(c *cli.Context) error {
    if env := c.String("env-file"); env != "" {
        godotenv.Load(env)
    }
    plugin := Plugin{
        WorkingDirectory: c.String("working-directory"),
        AnthropicAPIKey:  c.String("anthropic-api-key"),
        DetailedLogging:  c.Bool("detailed-logging"),
    }
    return plugin.Exec()
}
```

---

## Building the Plugin

### Required Dependencies

```go title="go.mod"
module my-agent-plugin

go 1.24

require (
    github.com/joho/godotenv v1.5.1
    github.com/pkg/errors v0.9.1
    github.com/sirupsen/logrus v1.9.3
    github.com/urfave/cli v1.22.14
)
```

### Environment Variable Mapping

Each CLI flag maps to a `PLUGIN_`-prefixed environment variable. Harness also auto-populates platform context variables at runtime.

| CLI Flag | Environment Variable | Description |
|---|---|---|
| `--working-directory` | `PLUGIN_WORKING_DIRECTORY` | Path to the cloned git repository |
| `--anthropic-api-key` | `PLUGIN_ANTHROPIC_API_KEY` | Anthropic API key for Claude AI |
| `--detailed-logging` | `PLUGIN_DETAILED_LOGGING` | Enable debug-level logging |
| `--prompt` | `PLUGIN_PROMPT` | Task prompt for the agent |
| *(auto-populated)* | `HARNESS_ACCOUNT_ID` | Harness account identifier |
| *(auto-populated)* | `HARNESS_ORG_ID` | Harness organization identifier |
| *(auto-populated)* | `HARNESS_PROJECT_ID` | Harness project identifier |
| *(auto-populated)* | `HARNESS_EXECUTION_ID` | Pipeline execution identifier |

:::info Auto-Populated Variables
Harness automatically injects `HARNESS_ACCOUNT_ID`, `HARNESS_ORG_ID`, `HARNESS_PROJECT_ID`, and `HARNESS_EXECUTION_ID` when running plugins in CI pipelines — no manual configuration needed.
:::

### Build with Makefile

```makefile title="Makefile"
PLUGIN_NAME := my-agent-plugin
DOCKER_REPO := yourdockerhub/$(PLUGIN_NAME)

.PHONY: build build-docker push clean

build:
	CGO_ENABLED=0 GOOS=linux GOARCH=arm64 \
		go build -o $(PLUGIN_NAME) .

build-docker:
	docker build -t $(DOCKER_REPO):latest .

push:
	docker push $(DOCKER_REPO):latest

clean:
	rm -f $(PLUGIN_NAME)
```

---

## Docker Packaging

Agent plugins are packaged as Docker containers using a multi-stage build. The first stage compiles the Go binary; the second creates a minimal runtime image.

```dockerfile title="Dockerfile"
# Stage 1: Build the Go plugin binary
FROM golang:1.24 AS builder
WORKDIR /app
COPY go.mod go.sum* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=arm64 \
    go build -o my-agent-plugin .

# Stage 2: Create minimal runtime image
FROM --platform=linux/arm64 debian:bookworm-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ca-certificates git bash && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /root/
COPY --from=builder /app/my-agent-plugin .
COPY bin/* ./bin/
RUN chmod +x ./my-agent-plugin ./bin/*

ENTRYPOINT ["/root/my-agent-plugin"]
```

**Runtime dependencies:** `ca-certificates` for HTTPS API calls, `git` for repository operations, `bash` for shell script execution.

**Image size notes:** Agent binaries are ~24–27 MB each. Use `debian:bookworm-slim` as the base and `CGO_ENABLED=0` for a statically-linked Go binary.

:::warning Multi-Stage Builds
Always use multi-stage Docker builds. Never include the Go toolchain, source code, or build artifacts in the runtime image.
:::

---

## Harness API Integration

Agent plugins can integrate with the Harness API to fetch pipeline execution data and retrieve logs from failed steps.

```bash
# Fetch pipeline execution details (includes step graph)
GET /pipeline/api/pipelines/execution/{executionId}
    ?accountIdentifier={accountId}
    &orgIdentifier={orgId}
    &projectIdentifier={projectId}

# Download step logs from the log service
POST /log-service/blob/download
    ?accountID={accountId}
    &prefix={logBaseKey}
```

**Failed step detection:** traverse the execution graph, look for steps with status `Failed` or `IgnoreFailed`, validate `failureInfo` for error messages, then extract the `logBaseKey` field for log retrieval.

```go title="plugin.go"
func (p *Plugin) fetchFailedStepLogs() (string, error) {
    url := fmt.Sprintf(
        "%s/pipeline/api/pipelines/execution/%s"+
        "?accountIdentifier=%s&orgIdentifier=%s&projectIdentifier=%s",
        p.HarnessBaseURL,
        p.HarnessExecutionID,
        p.HarnessAccountID,
        p.HarnessOrgID,
        p.HarnessProjectID,
    )
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Set("x-api-key", p.HarnessAPIKey)
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return "", errors.Wrap(err, "failed to fetch execution")
    }
    defer resp.Body.Close()
    // Parse response, find failed steps, extract logBaseKey, download logs...
    return logs, nil
}
```

---

## Template Registration

Once your Docker image is built and pushed, register it as a Harness Agent by creating a template in the agents repository.

### Step 1: Create Template Directory

```bash
templates/my-custom-agent/
├── metadata.json    # Required: name, description, version
├── pipeline.yaml    # Required: pipeline definition using your plugin
├── wiki.MD          # Optional: user-facing documentation
└── logo.svg         # Optional: icon for the Harness UI
```

### Step 2: Define metadata.json

```json title="metadata.json"
{
  "name": "my custom agent",
  "description": "Automatically performs custom analysis and code modifications",
  "version": "1.0.0"
}
```

### Step 3: Define pipeline.yaml

```yaml title="pipeline.yaml"
pipeline:
  clone:
    depth: 50
  stages:
    - name: my-agent
      steps:
        - name: run-agent
          run:
            container:
              image: yourdockerhub/my-agent-plugin:latest
            with:
              working_directory: /harness
              detailed_logging: "true"
            env:
              ANTHROPIC_API_KEY: <+inputs.anthropicKey>
              HARNESS_KEY: <+inputs.harnessKey>
        - name: show-diff
          run:
            shell: bash
            script: |
              git diff
        - name: create-pr
          run:
            container:
              image: himanshu6956/create-pr-plugin:latest
            env:
              HARNESS_KEY: <+inputs.harnessKey>
      platform:
        os: linux
        arch: arm64
  inputs:
    anthropicKey:
      type: secret
      description: Anthropic API key for Claude AI
    harnessKey:
      type: secret
      description: Harness API key for platform operations
    repo:
      type: string
      description: Target repository name
    branch:
      type: string
      description: Target branch
      default: main
```

### Step 4: Write wiki.MD

```markdown title="wiki.MD"
# My Custom Agent

## Overview
This agent automatically analyzes your codebase and applies
intelligent modifications using Claude AI.

## Inputs
| Input | Type | Required | Description |
|-------|------|----------|-------------|
| anthropicKey | secret | Yes | Anthropic API key |
| harnessKey | secret | Yes | Harness API key |
| repo | string | Yes | Repository name |
| branch | string | No | Target branch (default: main) |

## Troubleshooting
- Ensure your Anthropic API key has sufficient credits
- Verify the Harness API key has project-level permissions
```

### Metadata Validation Rules

- **Directory names:** lowercase with hyphens (e.g., `my-custom-agent`)
- **Metadata name:** lowercase with spaces (e.g., `"my custom agent"`)
- **Input names in `pipeline.yaml`:** camelCase (e.g., `anthropicKey`)
- **Version:** semantic versioning (e.g., `"1.0.0"`)

:::info Automated Review
Submit your template as a pull request to the agents repository. GitHub Actions runs automated Claude Code review to validate naming conventions, security rules, and cross-file consistency.
:::

---

## Testing & Deployment

### Local Testing

```bash title="local-test.sh"
# Build the plugin binary
cd my-agent-plugin
make build

# Set required environment variables
export PLUGIN_WORKING_DIRECTORY="/path/to/test-repo"
export ANTHROPIC_API_KEY="sk-ant-xxxxx"
export PLUGIN_DETAILED_LOGGING="true"

# Run the plugin locally
./my-agent-plugin
```

### Docker Testing

```bash title="docker-test.sh"
# Build Docker image
make build-docker

# Run in Docker with mounted test repo
docker run --rm \
  -v /path/to/test-repo:/workspace \
  -e PLUGIN_WORKING_DIRECTORY=/workspace \
  -e ANTHROPIC_API_KEY=sk-ant-xxxxx \
  yourdockerhub/my-agent-plugin:latest
```

### Pipeline Testing

```yaml title="test-pipeline.yaml"
pipeline:
  clone:
    depth: 50
  stages:
    - name: test-agent
      steps:
        - name: run-agent
          run:
            container:
              image: yourdockerhub/my-agent-plugin:latest
            with:
              working_directory: /harness
              detailed_logging: "true"
            env:
              ANTHROPIC_API_KEY: <+secrets.getValue("anthropic_api_key")>
      platform:
        os: linux
        arch: arm64
```

### Deployment Checklist

- Plugin binary builds without errors
- Docker image builds and runs successfully
- All required inputs are validated in `Exec()`
- Sensitive values (API keys, tokens) are never logged
- Agent works correctly in a Harness CI pipeline
- Template passes `metadata.json` and `pipeline.yaml` validation
- `wiki.MD` provides clear documentation

:::warning Secret Masking
Always mask sensitive values in plugin logging. Never log the full value of secrets, tokens, or API keys.
:::

---

## Plugin Composition Patterns

Agents can be composed from multiple plugins in a single pipeline.

### Pattern 1: Two-Stage Analysis + Fix

```yaml title="two-stage-pattern.yaml"
steps:
  - name: analyze-failure
    run:
      container:
        image: yourdockerhub/remediation-agent:latest
      with:
        working_directory: /harness
      env:
        ANTHROPIC_API_KEY: <+inputs.anthropicKey>
        HARNESS_KEY: <+inputs.harnessKey>
  - name: apply-fix
    run:
      container:
        image: yourdockerhub/coding-agent:latest
      with:
        working_directory: /harness
        # Automatically discovers task.txt from step 1
      env:
        ANTHROPIC_API_KEY: <+inputs.anthropicKey>
  - name: create-pr
    run:
      container:
        image: himanshu6956/create-pr-plugin:latest
      env:
        HARNESS_KEY: <+inputs.harnessKey>
```

### Pattern 2: Standalone with Custom Prompt

```yaml title="standalone-pattern.yaml"
steps:
  - name: run-agent
    run:
      container:
        image: yourdockerhub/coding-agent:latest
      with:
        working_directory: /harness
        prompt: <+inputs.prompt>
        max_iterations: "300"
      env:
        ANTHROPIC_API_KEY: <+inputs.anthropicKey>
```

### Pattern 3: Multi-Model Pipeline

```yaml title="multi-model-pattern.yaml"
steps:
  # Fast analysis with Claude Sonnet
  - name: analyze
    run:
      container:
        image: agent-container:latest
      env:
        MODEL: claude-sonnet-4-5-20250929
        ANTHROPIC_API_KEY: <+inputs.anthropicKey>
      shell: bash
      script: |
        # Quick analysis of repo structure

  # Detailed generation with Claude Opus
  - name: generate
    run:
      container:
        image: agent-container:latest
      env:
        MODEL: claude-opus-4-6
        ANTHROPIC_API_KEY: <+inputs.anthropicKey>
      shell: bash
      script: |
        # High-quality code generation
```

### Shared Containers

| Container | Purpose | Used By |
|---|---|---|
| `anewdocker25/mydockerhub:coding-agent` | AI-powered code modification | Autofix, Code Review, Feature Flag Cleanup, React Upgrade |
| `anewdocker25/mydockerhub:remediation-agent` | Error analysis and diagnosis | Autofix, Manifest Remediator |
| `himanshu6956/create-pr-plugin:latest` | Multi-SCM pull request creation | Autofix, Code Coverage, React Upgrade |

:::tip Reusable Building Blocks
The `coding-agent` and `create-pr-plugin` containers are designed to be composed together in custom agent pipelines — you don't need to build them from scratch.
:::