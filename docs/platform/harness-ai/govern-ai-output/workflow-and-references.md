---
title: Workflows and reference
description: Chain Harness Skills into end-to-end workflows, and review skill file anatomy, MCP tools, and the harness-skills repository structure.
keywords:
  - harness skills
  - end-to-end workflows
  - skill anatomy
  - MCP tools
  - project structure
tags:
  - ai
  - automation
  - developer-tools
sidebar_label: Workflows and reference
sidebar_position: 10
---

Skills chain together for multi-step workflows, and each skill file follows a consistent internal structure. This page covers common workflow sequences and the reference material for authoring or extending skills.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Chain skills together](#end-to-end-workflows) for multi-step workflows.
- [Understand skill anatomy](#skill-anatomy) to read or author a skill.
- [Reference the MCP tools](#mcp-tools) skills use to call the Harness platform.
- [Navigate the repository layout](#project-structure) for skills, references, and examples.

---

## End-to-end workflows

Resources that depend on other resources must be created in the correct order.

### New microservice setup

Use these skills in order:

1. `/create-connector`: Git, Docker registry, and Kubernetes cluster connectors.
2. `/create-secret`: Credentials for connector authentication.
3. `/create-service`: Service definition referencing connectors.
4. `/create-environment`: Target environment configuration.
5. `/create-infrastructure`: Infrastructure definition for the target cluster.
6. `/create-pipeline`: CI/CD pipeline referencing the service, environment, and infrastructure.
7. `/create-trigger`: Webhook or schedule trigger to automate the pipeline.

### Debug a failed deployment

Typical sequence:

1. `/run-pipeline`: Identify the latest execution or reproduce the issue.
2. `/debug-pipeline`: Classify the failure and inspect the root cause.
3. `/template-usage`: Check if shared templates propagated the issue.
4. `/manage-delegates`: Investigate delegate capacity or connectivity if relevant.

### Codebase-aware pipeline generation

The `/create-pipeline` skill includes codebase analysis capabilities. It scans your project files to auto-detect:

- **Language and runtime** from source files (`package.json` maps to Node.js, `go.mod` maps to Go).
- **Build tools** from build configuration (`Dockerfile`, `webpack.config.js`, `pom.xml`).
- **Test frameworks** from test configuration (`jest.config.*`, `pytest.ini`).
- **Deployment targets** from manifests (`Chart.yaml` maps to Helm, `task-definition.json` maps to ECS).

This allows the skill to generate pipeline YAML tailored to your project without manual configuration.

---

## Skill anatomy

Each skill lives in `skills/<skill-name>/SKILL.md` and follows a consistent structure. Knowing this structure helps you read existing skills and author your own.

```
skills/create-pipeline/
├── SKILL.md              # Skill definition (required)
└── references/           # Supplementary docs (optional)
    ├── native-steps.md
    ├── v0-pipeline-schema.md
    └── codebase-analysis.md
```

The `SKILL.md` file contains:

- **Frontmatter**: Name, description, version, MCP server dependency, and license metadata.
- **Instructions**: Phase-based steps with MCP tool calls and parameters.
- **Examples**: Real invocation scenarios and worked examples.
- **Performance notes**: Validation checks, tradeoffs, and optimization guidance.
- **Troubleshooting**: Common errors and recovery steps.

Reference files in the `references/` subdirectory provide supplementary knowledge, such as schema definitions, decision trees, and template libraries, that the AI loads on demand.

---

## MCP tools

Skills use the <a href="/docs/platform/harness-ai/harness-mcp-server" target="_blank">Harness MCP Server</a>, which provides 11 generic tools dispatched by `resource_type`.

| Tool | Purpose |
|------|---------|
| `harness_list` | List resources. |
| `harness_get` | Get resource details. |
| `harness_create` | Create a resource. |
| `harness_update` | Update a resource. |
| `harness_delete` | Delete a resource. |
| `harness_execute` | Execute an action. |
| `harness_search` | Search across resources. |
| `harness_describe` | Get resource schema. |
| `harness_schema` | Fetch JSON Schema definitions. |
| `harness_diagnose` | Diagnose issues. |
| `harness_status` | Check system status. |

---

## Project structure

The repository groups skills, shared references, and examples into a predictable layout.

```
harness-skills/
├── skills/
│   ├── create-pipeline/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── create-template/
│   │   └── SKILL.md
│   ├── debug-pipeline/
│   │   └── SKILL.md
│   └── ...
├── references/              # Shared repo-level playbooks
├── templates/               # Shared repo-level output templates
├── examples/
│   ├── v0/                  # v0 pipeline examples
│   ├── v1/                  # v1 pipeline examples
│   ├── templates/
│   ├── triggers/
│   ├── services/
│   ├── environments/
│   ├── connectors/
│   └── ...
├── .cursor/rules/harness.mdc
├── .github/copilot-instructions.md
├── AGENTS.md
├── CLAUDE.md
└── CONTRIBUTING.md
```

---

## Related articles

- <a href="https://github.com/harness/harness-skills" target="_blank">Harness Skills repository</a>: Browse the full skill source code and contribute new skills.
- <a href="/docs/platform/harness-ai/harness-mcp-server" target="_blank">Harness MCP Server</a>: Configure the MCP server that skills use to execute actions against Harness.
- <a href="https://github.com/harness/harness-skills/blob/main/CONTRIBUTING.md" target="_blank">Contributing guide</a>: Learn the conventions for submitting a new skill to the repository.
- <a href="/docs/platform/harness-ai/govern-ai-output/overview" target="_blank">Harness Skills overview</a>: Prerequisites and editor setup.