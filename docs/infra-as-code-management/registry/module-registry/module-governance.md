---
title: Govern Module Usage
description: Use Harness OPA policies to enforce governance on the modules and versions used in IaCM workspaces, controlling allowed sources, required versions, and resource provisioning rules.
sidebar_position: 40
sidebar_label: Govern Module Usage
redirect_from:
  - /docs/infra-as-code-management/registry/module-registry/content/module-governance
keywords:
  - IaCM
  - Module Registry
  - OPA policies
  - module governance
  - allowed modules
  - module versioning policy
tags:
  - IaCM
  - registry
---

With Harness Infrastructure as Code and OPA policies, you can govern which modules and versions are used in IaCM workspaces. Policies are evaluated when Harness evaluates the workspace configuration, allowing you to enforce rules rather than relying on conventions.

You can create policies to:
- Allow or block specific module sources.
- Allow specific versions of a module.
- Require sensitive resource types to be provisioned through approved modules.

:::note Governance and version lifecycle are separate
Governance policies control which modules and versions workspaces can use. Version lifecycle management identifies the current or preferred versions of a module. You can use either feature independently.
:::

---

## What you will learn

By the end of this page, you will understand:

- **Policy evaluation**: How OPA policies are evaluated against IaCM workspace configurations when Harness resolves module calls.
- **Common governance patterns**: How to write Rego policies that allow or deny specific module sources, version constraints, and resource types.
- **Applying policies**: How to create and attach OPA policies to IaCM workspaces using the Harness policy workflow.

---

## Before you begin

- **Policy Management permission**: You need the **Manage** permission on Policies in Harness to create and attach OPA policies. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.
- **IaCM workspace**: Policies are evaluated on workspaces that reference modules. Go to [Register a Module](/docs/infra-as-code-management/registry/module-registry) to add a module to the registry first.

---

## Governance rules at a glance

| Governance rule | Use it to |
|---|---|
| Allow specific modules | Restrict which module sources teams can use. |
| Allow specific module versions | Restrict a module to approved versions. |
| Require resources to come from modules | Prevent sensitive resource types from being declared directly in a workspace. |

To govern module usage, create OPA policies that inspect the module calls and resources in the workspace configuration and deny configurations that do not meet your requirements. The examples below show common governance patterns.

---

## Common policy helpers

The examples use the following helper functions to find module calls and check whether a value appears in an allowed list.

```rego
# Collect all module calls in a TF Plan
module_calls[call] {
  walk(input.configuration.root_module, [p, v])
  p[count(p)-1] == "module_calls"
  mc := v[_]
  call := mc
}
```

```rego
# Check if an array contains an element
contains(arr, elem) {
  arr[_] = elem
}
```

---

## Allow specific modules

Use this policy when you want to restrict module sources to an approved set of registries, repositories, or local paths.

A registered Harness module uses an `app.harness.io/<account-id>/<module-name>/<provider>` source address.

```rego
deny[msg] {
  call := module_calls[_]

  not startswith(call.source, "../")
  not startswith(call.source, "./")
  not startswith(call.source, "app.harness.io/")
  not startswith(call.source, "terraform-aws-modules/")

  msg := sprintf(
    "Module source %q is not allowed",
    [call.source],
  )
}
```

---

## Allow specific module versions

Use this policy when you want to restrict a module to a set of approved versions. The policy compares the module's declared version constraint against an allowlist of approved versions.

```rego
deny[msg] {
  allowed_versions := ["2.2.0", "2.3.0"]

  call := module_calls[_]

  call.source == "terraform-aws-modules/kms/aws"

  not contains(allowed_versions, call.version_constraint)

  msg := sprintf(
    "Module %s version %s is not allowed, must be one of: %s",
    [call.source, call.version_constraint, allowed_versions],
  )
}
```

---

## Require resources to come from modules

Use this policy when certain resource types must only be provisioned through approved modules. This policy checks resources directly declared in the workspace's root module.

```rego
deny[msg] {
  disallowed_types := ["aws_instance"]

  r = input.planned_values.root_module.resources[_]

  contains(disallowed_types, r.type)

  msg := sprintf(
    "Resource of type %s is not allowed outside a module",
    [r.type],
  )
}
```

---

## Apply OPA policies

Create and attach these policies using the Harness OPA policy workflow. Once attached to an IaCM workspace, the policy evaluates the workspace configuration during policy evaluation. If a configuration violates the policy, the policy returns a `deny` message and the configuration fails policy evaluation.

Go to [Policy and Governance](/docs/category/policy--governance) to create and apply OPA policies across IaCM.

---

## Next steps

- Go to [Manage Version Lifecycle](/docs/infra-as-code-management/registry/module-registry/module-version-lifecycle-management) to understand how lifecycle status differs from governance.
- Go to [Policy and Governance](/docs/category/policy--governance) to learn how to create and apply OPA policies across IaCM.
- Go to [Explore and Use a Module](/docs/infra-as-code-management/registry/module-registry/registered-module-settings) to review module source addresses and version references.
