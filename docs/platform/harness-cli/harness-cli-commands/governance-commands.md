---
title: Governance
sidebar_label: Governance
description: Use the Harness CLI to manage the Governance module, including OPA policies written in Rego, policy sets, and policy evaluation records.
sidebar_position: 7
keywords:
  - harness cli
  - governance
  - opa
  - rego
  - policy
  - policy set
  - policy evaluation
---

Harness Governance enforces Open Policy Agent (OPA) policies across your account. You author policies in Rego, group them into policy sets, and Harness evaluates those sets when a pipeline runs or a resource changes. The CLI lets you manage policies and policy sets as code and review the evaluations that Harness recorded.

This page covers all Governance resources and actions available in the CLI.

---

## What you will learn in this topic

By the end of this page, you will know how to:

- List, create, update, and delete OPA policies.
- Inspect the Rego source of a policy.
- Group policies into policy sets and control when those sets are evaluated.
- Review recorded policy evaluations.

---

## Before you begin

- **Harness CLI installed and authenticated:** For setup steps, see [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate).
- **Scope configured:** Governance resources resolve against the scope in your profile. Pass `--account`, `--org`, or `--project` to override it for a single command.
- **Rego knowledge:** Policies are written in Rego. For more information about the policy model, see [Harness Governance](/docs/platform/governance/policy-as-code/harness-governance-overview).

---

## Policies

A policy is a single Rego module that inspects a resource or pipeline payload and returns violations. A policy on its own does nothing until it belongs to a policy set.

### List policies

```sh
harness list policy
harness list policy --all --format json
harness list policy --columns "name,id,updated"
```

### Get policy details

The response includes the Rego source of the policy.

```sh
harness get policy <policy_id>
harness get policy <policy_id> --format json
```

### Create a policy

Supply the name and the Rego source inline, or pass the whole definition in a YAML file.

```sh
harness create policy <policy_id> \
  --set name="<policy_name>" \
  --set rego='package main

deny[msg] {
  msg := "<violation_message>"
}'

harness create policy <policy_id> -f <policy_file>.yaml
```

### Update a policy

Update the name, the Rego source, or both.

```sh
harness update policy <policy_id> --set name="<policy_name>"
harness update policy <policy_id> -f <policy_file>.yaml
```

### Delete a policy

```sh
harness delete policy <policy_id>
```

---

## Policy sets

A policy set groups policies and binds them to an entity type and an action, which is what makes them run. A set that is not enabled is stored but never evaluated.

### List and get policy sets

```sh
harness list policy_set
harness list policy_set --all --format json
harness get policy_set <policy_set_id>
```

### Create a policy set

The `type` field names the entity the set applies to, and `action` names the event that triggers evaluation.

```sh
harness create policy_set <policy_set_id> \
  --set name="<policy_set_name>" \
  --set type=pipeline \
  --set action=onrun \
  --set enabled=true
```

### Update a policy set

Update the name, the enabled state, or the member policies.

```sh
harness update policy_set <policy_set_id> --set name="<policy_set_name>"
harness update policy_set <policy_set_id> --set enabled=false
```

### Delete a policy set

```sh
harness delete policy_set <policy_set_id>
```

---

## Policy evaluations

Every time Harness evaluates a policy set against a resource it records the result. Use evaluations to audit which policies passed or failed and why.

```sh
harness list policy_evaluation
harness list policy_evaluation --all --format json
harness list policy_evaluation --limit 20
```

---

## Related articles

- [Audit](/docs/platform/harness-cli/harness-cli-commands/audit-commands): Review the audit trail for policy changes.
- [Continuous Delivery](/docs/platform/harness-cli/harness-cli-commands/cd-and-pipeline-commands): Manage the pipelines that policy sets evaluate.
- [Platform](/docs/platform/harness-cli/harness-cli-commands/platform-commands): Manage account resources, connectors, and secrets.
