---
title: Platform
sidebar_label: Platform
description: Use the Harness CLI to manage the Harness Platform module, including organizations, projects, users, roles, connectors, secrets, delegates, OPA governance policies, and audit events.
sidebar_position: 1
keywords:
  - harness cli
  - platform commands
  - organizations
  - projects
  - connectors
  - secrets
  - delegates
  - rbac
  - governance
  - audit
---

The Platform module manages the foundational resources in your Harness account, including the organization-project hierarchy, RBAC, connectors, secrets, delegates, governance policies, and audit data. Most other Harness modules depend on these resources being configured correctly.

---

## What will you learn in this topic?

By the end of this page, you will know how to:

- List and inspect organizations, projects, and the account itself.
- View users, user groups, roles, and role assignments across scopes.
- Create, update, and delete connectors and secrets.
- Manage delegates and delegate tokens.
- Work with multi-level resources using the `--level` flag.
- Create, update, and enforce OPA governance policies and policy sets.
- Query the account-wide audit trail for historical actions.

---

## Before you begin

- **Harness CLI installed and authenticated:** Go to [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate) to set up the CLI.
- **Scope configured:** Ensure your profile has a default org and project set, or pass `--org` and `--project` on each command. Go to [Authenticate](/docs/platform/harness-cli/authenticate#set-default-scope) to configure scope.

---

## Account

Your Harness account is the top-level container that holds all organizations, projects, and resources. Use `get account` to view account details such as the account name, ID, and license information.

```sh
harness get account
harness get account --format json
```

---

## Organizations

Organizations group related projects under a shared administrative and governance boundary. They sit directly below the account level and provide a way to separate teams, business units, or product lines. Each organization has its own set of RBAC, connectors, and secrets that its child projects can inherit.

```sh
harness list organization
harness list organization --format json --all
harness get organization <org_id>
harness get organization <org_id> --format json
```

Create a new organization:

```sh
harness create organization \
  --set identifier=<org_id> \
  --set name="<org_name>"
```

Update an organization (the CLI fetches the current state, applies your changes, and saves the result):

```sh
harness update organization <org_id> --set description="<description>"
harness update organization <org_id> --set tags.<key>=<value>
harness update organization <org_id> --del tags.<key>
```

Delete an organization:

```sh
harness delete organization <org_id>
```

---

## Projects

Projects are the primary unit of work in Harness. They live inside an organization and contain your pipelines, services, environments, connectors, and other module-specific resources. Most day-to-day operations happen at the project level.

```sh
harness list project --org <org_id>
harness list project --org <org_id> --format json --all
harness get project <project_id> --org <org_id>
```

Create a project:

```sh
harness create project \
  --org <org_id> \
  --set identifier=<project_id> \
  --set name="<project_name>"
```

Update a project:

```sh
harness update project <project_id> --org <org_id> --set tags.<key>=<value>
```

Delete a project:

```sh
harness delete project <project_id> --org <org_id>
```

Projects support multi-level listing to view all projects across the account or narrow down to a specific org:

```sh
harness list project --level account
harness list project --level org --org <org_id>
```

---

## Users and user groups

Users are the individual identities that interact with your Harness account. User groups bundle users together for role assignments and notification preferences. 

Both are multi-level resources, meaning they can exist at account, org, or project scope.

```sh
harness list user --level account
harness list user --level org --org <org_id>
harness list user --level project --org <org_id> --project <project_id>

harness get user <user_email> --level account

harness list user_group --level account
harness get user_group <group_id> --level org --org <org_id>
```

---

## Roles, role assignments, and resource groups

Roles define a set of permissions (what actions are allowed). Role assignments bind a role to a user or user group at a specific scope. Resource groups define which resources a role can act on. Together, these three resources form the Harness RBAC model.

```sh
harness list role --level account
harness list role --level org --org <org_id>
harness get role <role_id> --level account

harness list role_assignment --level project --org <org_id> --project <project_id>
harness get role_assignment <assignment_id> --level project --org <org_id> --project <project_id>

harness list resource_group --level account
harness get resource_group <group_id> --level org --org <org_id>
```

List all available permissions in the system:

```sh
harness list permission
harness get permission <permission_id>
```

---

## Service accounts

Service accounts are non-human identities used for API access and automation. They hold their own API keys and role bindings, independent of individual users. 

Use service accounts for CI runners, scripts, and integrations that need long-lived credentials.

```sh
harness list service_account --level account
harness list service_account --level project --org <org_id> --project <project_id>
harness get service_account <service_account_id> --level project --org <org_id> --project <project_id>
```

---

## Connectors

Connectors are integrations that connect Harness to external services such as cloud providers, source code repositories, container registries, and secret managers. 

They are multi-level resources, meaning you can create them at account, organization, or project scope for different inheritance patterns.

```sh
harness list connector --level account
harness list connector --level project --org <org_id> --project <project_id>
harness list connector --level project --org <org_id> --project <project_id> --search "<search_term>"

harness get connector <connector_id> --level project --org <org_id> --project <project_id>
harness get connector <connector_id> --level project --org <org_id> --project <project_id> --format json
```

Create a connector:

```sh
harness create connector \
  --level project --org <org_id> --project <project_id> \
  --set identifier=<connector_id> \
  --set name="<connector_name>" \
  --set type=<connector_type> \
  --set spec.dockerRegistryUrl="<registry_url>" \
  --set spec.auth.type=<auth_type>
```

Update a connector:

```sh
harness update connector <connector_id> \
  --level project --org <org_id> --project <project_id> \
  --set description="<description>"
```

Test connector connectivity (verifies that Harness can reach the external service through a delegate):

```sh
harness execute connector:test <connector_id> \
  --level project --org <org_id> --project <project_id>
```

Delete a connector:

```sh
harness delete connector <connector_id> --level project --org <org_id> --project <project_id>
```

---

## Secrets

Secrets store sensitive values such as API tokens, passwords, certificates, and SSH keys. They are multi-level resources, so you can define them at account scope (shared across everything), organization scope (shared within an organization), or project scope (limited to one project).

Secrets are referenced by connectors, pipelines, and other resources that need credentials at runtime.

```sh
harness list secret --level account
harness list secret --level project --org <org_id> --project <project_id>
harness list secret --level project --org <org_id> --project <project_id> --search "<search_term>"

harness get secret <secret_id> --level project --org <org_id> --project <project_id>
```

Create a secret:

```sh
harness create secret \
  --level project --org <org_id> --project <project_id> \
  --set identifier=<secret_id> \
  --set name="<secret_name>" \
  --set type=<secret_type> \
  --set spec.value="<secret_value>" \
  --set spec.valueType=Inline
```

Update a secret:

```sh
harness update secret <secret_id> \
  --level project --org <org_id> --project <project_id> \
  --set description="<description>"
```

Delete a secret:

```sh
harness delete secret <secret_id> --level project --org <org_id> --project <project_id>
```

---

## Delegates

Delegates are lightweight agents that run in your infrastructure (Kubernetes cluster, VM, or Docker host) and execute tasks on behalf of Harness. They handle operations like deploying services, running pipelines, verifying connectivity, and pulling artifacts. 

Delegate tokens authenticate a delegate instance with your Harness account.

```sh
harness list delegate --level account
harness list delegate --level project --org <org_id> --project <project_id>
harness get delegate <delegate_id> --level account --format json
```

Manage delegate tokens:

```sh
harness list delegate_token
harness create delegate_token --set name=<token_name>
harness delete delegate_token <token_name>
```

---

## Settings

Account and project settings control platform-wide behaviors such as session timeout, default connectors, and feature toggles. Use the CLI to view current settings values. The `--category` flag is required when listing settings.

Available categories: `CD`, `CI`, `CE`, `CV`, `CF`, `STO`, `CORE`, `PMS`, `TEMPLATESERVICE`, `GOVERNANCE`, `CHAOS`, `SCIM`, `GIT_EXPERIENCE`, `CONNECTORS`, `NOTIFICATIONS`, `AR`.

```sh
harness list setting --level account --category <category>
harness list setting --level project --org <org_id> --project <project_id> --category <category>
harness get setting <setting_id> --level project --org <org_id> --project <project_id>
```

---

## Entity usage

Entity usage shows you where a specific resource is referenced across your account. Use it to check dependencies before deleting a connector, secret, or other shared resource. Pass the entity as `<type>/<identifier>`.

```sh
harness list entity_usage <entity_type>/<entity_id> --level account
harness list entity_usage <entity_type>/<entity_id> --level project --org <org_id> --project <project_id>
```

---

## Governance policies

Governance enforces organizational standards through OPA (Open Policy Agent) policies. A policy is a Rego rule that evaluates against Harness resources such as pipelines, connectors, or secrets at runtime. Use policies to codify your team's guardrails so they are automatically enforced rather than manually reviewed.

List policies:

```sh
harness list policy
harness list policy --all --format json
```

Get policy details:

```sh
harness get policy <policy_id>
harness get policy <policy_id> --format json
```

Create a policy:

```sh
harness create policy \
  --set identifier=<policy_id> \
  --set name="<policy_name>" \
  --set rego="<rego_code>"
```

Update a policy:

```sh
harness update policy <policy_id> \
  --set rego="<updated_rego_code>"
```

Delete a policy:

```sh
harness delete policy <policy_id>
```

---

## Policy sets

A policy set groups one or more policies and binds them to a trigger event (such as "on pipeline save" or "on pipeline run"). Use policy sets to control when and where your governance rules evaluate, and whether violations block the action or only warn.

List policy sets:

```sh
harness list policy_set
harness list policy_set --format json
```

Get policy set details:

```sh
harness get policy_set <policy_set_id>
harness get policy_set <policy_set_id> --format json
```

Create a policy set:

```sh
harness create policy_set \
  --set identifier=<policy_set_id> \
  --set name="<policy_set_name>" \
  --set action=<trigger_action> \
  --set type=<resource_type>
```

Update a policy set:

```sh
harness update policy_set <policy_set_id> --set enabled=true
```

Delete a policy set:

```sh
harness delete policy_set <policy_set_id>
```

---

## Policy evaluations

A policy evaluation is the recorded result of policies running against a resource. Every time a policy set fires, Harness stores the evaluation outcome. View evaluations to debug why a resource was blocked, confirm compliance, or investigate policy failures.

```sh
harness list policy_evaluation
harness list policy_evaluation --format json --limit 20
```

---

## Audit events

The audit trail records every action taken on any Harness resource across your entire account: creates, updates, deletes, logins, and pipeline executions. Use audit events for compliance investigations, security analysis, and debugging who changed what and when.

### List audit events

View recent audit events across your account or filter by time range, user, or resource type.

```sh
harness list audit_event
harness list audit_event --all --format json
harness list audit_event --limit 50
```

### Get audit event details

Retrieve the full details of a specific audit event, including the before and after state of the resource that was modified.

```sh
harness get audit_event <event_id>
harness get audit_event <event_id> --format json
```

---

## Next steps

- Go to [Continuous Delivery](/docs/platform/harness-cli/harness-cli-commands/cd-and-pipeline-commands) to manage pipelines and executions.
- Go to [Supported resources and actions](/docs/platform/harness-cli/supported-resources-and-actions) to see the full capability matrix.