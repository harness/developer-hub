---
title: Harness Worker Agents
sidebar_label: Worker Agents
description: Use the Harness CLI to list, inspect, create, and update Harness Worker Agents from a wrapper YAML definition.
sidebar_position: 9
keywords:
  - harness cli
  - worker agent
  - harness worker agents
  - automation worker
  - agent yaml
---

Harness Worker Agents are Harness-managed automation workers. Each agent is defined by a wrapper YAML file whose `spec` key carries the agent pipeline definition, which means you can keep agent definitions in version control and apply them from the CLI. The commands live in the `platform` module.

This page covers all Harness Worker Agent resources and actions available in the CLI.

---

## What you will learn in this topic

By the end of this page, you will know how to:

- List the Harness Worker Agents in scope.
- Retrieve an agent definition in a form you can edit and reapply.
- Create an agent from a wrapper YAML file.
- Update an existing agent definition.

---

## Before you begin

- **Harness CLI installed and authenticated:** For setup steps, see [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate).
- **Scope configured:** Worker Agents resolve against the scope in your profile. Pass `--account`, `--org`, or `--project` to override it for a single command.

---

## The wrapper YAML

An agent definition is a wrapper document with three parts:

- **`name`:** The display name of the agent.
- **`description`:** A short summary of what the agent does.
- **`spec`:** A string that carries the agent pipeline definition.

Because `spec` is a string, the agent pipeline is nested inside the wrapper rather than merged into it. Retrieve an existing agent with `-o yaml` to get a valid wrapper that you can edit and pass straight back to `create` or `update`.

---

## Worker Agents

### List agents

```sh
harness list agent
harness list agent --all --format json
harness list agent --columns "name,id"
```

### Get agent details

Use `-o yaml` to produce a valid wrapper document for editing.

```sh
harness get agent <agent_id>
harness get agent <agent_id> -o yaml
harness get agent <agent_id> --format json
```

### Create an agent

Create an agent from a wrapper YAML file.

```sh
harness create agent <agent_id> -f <agent_file>.yaml
```

### Update an agent

Update an agent from a wrapper YAML file. To round-trip a definition, retrieve it, edit it locally, and apply it back.

```sh
harness update agent <agent_id> -f <agent_file>.yaml
```

```sh
harness get agent <agent_id> -o yaml > <agent_file>.yaml
$EDITOR <agent_file>.yaml
harness update agent <agent_id> -f <agent_file>.yaml
```

---

## Related articles

- [Platform](/docs/platform/harness-cli/harness-cli-commands/platform-commands): Manage the connectors, secrets, and delegates an agent depends on.
- [Continuous Delivery](/docs/platform/harness-cli/harness-cli-commands/cd-and-pipeline-commands): Manage pipelines and executions.
