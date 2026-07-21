---
title: Centralized Policy Governance for IDP
description: Use Harness OPA policies to enforce configuration standards on IDP catalog entities, environment blueprints, environments, and CD pipelines.
sidebar_position: 30
sidebar_label: Centralized Policy Governance
redirect_from:
  - /docs/internal-developer-portal/environment-management/opa-governance
  - /docs/internal-developer-portal/governance/policy-as-a-code
---

import DocImage from '@site/src/components/DocImage';

Platform engineers lose visibility when development teams author blueprints. A blueprint that skips TTL, uses a wrong tag, or breaks a naming standard can slip through and affect every environment built from it. The same is true when development teams create and update catalog entities without guardrails.

A component that skips an owner, uses a reserved name, or ships with an unsupported lifecycle value can introduce inconsistency across the entire portal.

OPA policies let you catch and block these misconfigurations before they are saved, across all teams and projects. Harness IDP integrates with [Harness OPA Governance](/docs/platform/governance/policy-as-code/harness-governance-overview) to let you define and enforce policies on catalog entities (components, APIs, resources, and more), [environment blueprints](/docs/internal-developer-portal/environment-management/blueprints/env-blueprint-yaml), [environments](/docs/internal-developer-portal/environment-management/environments), and CD pipelines.

Policies run automatically every time a catalog entity is created or updated, or a CD pipeline is saved or run, ensuring each one meets your organization's standards.

## Before you begin

1. Familiarity with [Harness Policy As Code](/docs/platform/governance/policy-as-code/harness-governance-overview).
2. Review the [Harness Governance Quickstart](/docs/platform/governance/policy-as-code/harness-governance-quickstart) to set up your first policy and policy set.
3. Policies use the OPA authoring language Rego. Go to [OPA Policy Authoring](https://academy.styra.com/courses/opa-rego) to learn the Rego language.

:::info Feature Flag
This feature requires the feature flag `IDP_OPA_CATALOG_ENTITY_GOVERNANCE` to be enabled for your account. Contact [Harness Support](mailto:support@harness.io) to enable it. When disabled, no OPA evaluation occurs and existing behavior is unchanged.
:::

---

## Setup

### Create a policy

<DocImage path={require('./static/opa-policy-create.gif')} />

1. In Harness, navigate to **Account Settings** (or Org Settings / Project Settings) → **Security and Governance** → **Policies** and click the **Policies** tab on the top-right.

2. Click **+ New Policy**.

3. Give the policy a name, select **Inline** (stored in Harness) or **Remote** (stored in your Git repository), and click **Apply**.

4. In the policy editor, write your Rego policy. The policy receives the full entity payload under `input.idpEntity` for IDP entity policies, and under `input.pipeline` for CD pipeline policies. See the [Policy input schema](#policy-input-schema) section for available fields.

:::tip
The **Library** tab on the right panel includes ready-to-use IDP sample policies (for example, `IDP - Blueprint Require TTL`). You can load any of these directly instead of writing from scratch.

Use the **Testing Terminal** tab to test your policy against a sample entity payload before enforcing it. Paste a JSON representation of your entity under **Input** and click **Test**.
:::

### Create a policy set

:::info Difference between 'Policy' and 'Policy Set'
A policy is a single Rego rule that defines one check. A policy set groups one or more policies together and defines what entity type they apply to, when they run, and what to do when a check fails. A policy works only after adding it to a policy set.
:::

<DocImage path={require('./static/create-policyset.gif')} />

1. On the same page as [Create a policy](#create-a-policy), click the **Policy Sets** tab on the top-right.

2. Click **+ New Policy Set** and fill in the **Overview**:
   * **Name**: Give the policy set a descriptive name.
   * **Entity Type**: Select **IDP Entity** for catalog entity and environment policies. Select **Pipeline** for CD pipeline policies.
   * **Event**: For IDP entities, select **On Save**, which covers create and update. For pipelines, select **On Save** or **On Run** depending on when enforcement should fire.

3. Click **Continue**.

4. In **Policy evaluation criteria**, click **+ Add Policy**.

5. Select the [policy you created earlier](#create-a-policy).

6. Set the failure behavior from the dropdown:
   | Option | What Happens |
   |---|---|
   | **Warn and continue** | The entity or pipeline is saved. The UI shows a warning but the action proceeds. |
   | **Error and exit** | The entity or pipeline is not saved. The UI shows an error with the exact policy and rule that failed. |

7. Click **Apply** and then **Finish**.

:::caution Remember
To enforce the policy set, make sure the **Enforced** toggle is enabled on the Policy Sets list page. When the toggle is off, the policy set is created but not evaluated.
:::

---

## Result of policy enforcement

Once the policy set is active, enforcement happens automatically. When a developer attempts to save an entity or pipeline that violates a policy, they will see a **Policy Set Evaluations** modal listing the failing policies and the specific violation messages defined in your Rego rules.

* **On Catalog Entity**

    <DocImage path={require('./static/policyset-eval2.gif')} />

* **On Environment**

    <DocImage path={require('./static/policyset-eval.gif')} />

---

## Policy input schema

Policies receive the full entity payload at evaluation time. The root key depends on the policy type.

**Common fields for IDP entity policies (root: `input.idpEntity`):**

```
input.idpEntity.kind                  # Entity kind: "component", "api", "resource", "group", "system", "environmentblueprint", "environment"
input.idpEntity.name                  # Display name
input.idpEntity.identifier            # Unique entity identifier
input.idpEntity.metadata.tags         # Array of tag strings
input.idpEntity.metadata.description  # Entity description
input.idpEntity.metadata.annotations  # Key-value annotation map
input.idpEntity.orgIdentifier         # Org scope identifier
input.idpEntity.projectIdentifier     # Project scope identifier
```

**Component, API, and Resource fields:**

```
input.idpEntity.spec.type             # Entity sub-type (e.g., "service", "website", "library" for components; "openapi", "grpc" for APIs)
input.idpEntity.spec.lifecycle        # Lifecycle stage: "experimental", "production", or "deprecated"
input.idpEntity.spec.owner            # Owner reference (e.g., "group:default/team-payments")
input.idpEntity.spec.system           # Parent system reference
```

**Environment Blueprint fields:**

```
input.idpEntity.spec.ttl              # TTL configuration object
input.idpEntity.spec.ttl.kind         # TTL mode: "fixed", "custom", or "none"
input.idpEntity.ttl_default_hours     # Computed: default TTL in hours
input.idpEntity.ttl_max_hours         # Computed: maximum TTL in hours
```

**Environment fields:**

```
input.idpEntity.spec.inputs.ttl       # TTL input value set by the user
input.idpEntity.ttl_hours             # Computed: TTL in hours
```

**CD pipeline fields (root: `input.pipeline`):**

```
input.pipeline.stages[_].stage        # Array of pipeline stages
input.pipeline.stages[_].stage.type   # Stage type (e.g., "Deployment")
input.pipeline.stages[_].stage.spec.idpScorecard.<serviceId>[_].name   # Scorecard name for the service
input.pipeline.stages[_].stage.spec.idpScorecard.<serviceId>[_].score  # Current scorecard score
```

The `ttl_default_hours`, `ttl_max_hours`, and `ttl_hours` fields are computed by the system at evaluation time. You do not need to calculate them yourself in Rego; use them directly in your deny or warn conditions.

---

## Sample policies for catalog entity

The following policies apply to catalog entities: components, APIs, resources, groups, and systems.

### Reserved names

Prevent entities from using their kind name as their display name. This stops placeholder values from reaching the catalog.

```rego
package idpEntity

deny[msg] {
    input.idpEntity.kind == "component"
    input.idpEntity.name == "Component"
    msg := sprintf("Component kind cannot be named '%v'.", [input.idpEntity.name])
}

deny[msg] {
    input.idpEntity.kind == "api"
    input.idpEntity.name == "API"
    msg := sprintf("Api kind cannot be named '%v'.", [input.idpEntity.name])
}

deny[msg] {
    input.idpEntity.kind == "resource"
    input.idpEntity.name == "Resource"
    msg := sprintf("Resource kind cannot be named '%v'.", [input.idpEntity.name])
}
```

### Approved lifecycle values

Deny components that use a lifecycle value outside the approved set. This prevents freeform values that break scorecard filters and reporting.

```rego
package idpEntity

approved_lifecycles := {"experimental", "production", "deprecated"}

deny[msg] {
    input.idpEntity.kind == "component"
    not approved_lifecycles[input.idpEntity.spec.lifecycle]
    msg := sprintf(
        "Component lifecycle '%v' is not valid. Allowed values: experimental, production, deprecated.",
        [input.idpEntity.spec.lifecycle]
    )
}
```

### APIs must belong to a system

Deny APIs that do not specify a parent system. Orphaned APIs cannot surface in system-level views and are harder for consumers to discover.

```rego
package idpEntity

deny[msg] {
    input.idpEntity.kind == "api"
    not input.idpEntity.spec.system
    msg := "APIs must be assigned to a system via spec.system."
}
```

## Sample policies for environment management

The following policies apply to environment blueprints and environments.

### Require TTL on all blueprints

Deny any blueprint that uses the `none` TTL mode.

```rego
package idpEntity

deny[msg] {
    input.idpEntity.kind == "environmentblueprint"
    input.idpEntity.spec.ttl.kind == "none"
    msg := "Blueprints must define a TTL. 'No TTL' mode is not permitted."
}
```

### Enforce a maximum TTL on blueprints

Deny blueprints whose default TTL exceeds 7 days (168 hours).

```rego
package idpEntity

deny[msg] {
    input.idpEntity.kind == "environmentblueprint"
    input.idpEntity.ttl_default_hours > 168
    msg := sprintf(
        "Blueprint default TTL of %.1f hours exceeds the maximum allowed 168 hours (7 days).",
        [input.idpEntity.ttl_default_hours]
    )
}
```

### Enforce a maximum TTL on environments

Deny environments whose TTL exceeds 7 days (168 hours).

```rego
package idpEntity

deny[msg] {
    input.idpEntity.kind == "environment"
    input.idpEntity.ttl_hours > 168
    msg := sprintf(
        "Environment TTL of %.1f hours exceeds the maximum allowed 168 hours (7 days).",
        [input.idpEntity.ttl_hours]
    )
}
```

### Warn when blueprint TTL exceeds 3 days

Warn (but allow) when a blueprint's default TTL exceeds 72 hours. Use this as a soft limit before enforcing a hard deny.

```rego
package idpEntity

warn[msg] {
    input.idpEntity.kind == "environmentblueprint"
    input.idpEntity.ttl_default_hours > 72
    msg := sprintf(
        "Blueprint default TTL of %.1f hours exceeds the recommended 72 hours (3 days). Consider reducing it.",
        [input.idpEntity.ttl_default_hours]
    )
}
```

---

## Sample policies for CD pipelines

The following policies apply to CD pipelines and use IDP scorecard data to gate pipeline saves and runs. Use `package pipeline` (not `package idpEntity`) and set the policy set **Entity Type** to **Pipeline**.

IDP scorecard data is accessed in Rego via `stage.spec.idpScorecard.<serviceId>`, where `<serviceId>` is the [Harness service ID](/docs/continuous-delivery/overview#service) from the annotation `harness.io/cd-serviceId: <SERVICE_IDENTIFIER>` on the catalog entity. This annotation is auto-ingested if you followed the onboarding guide; otherwise add it manually to your `catalog-info.yaml`.

### Pipeline on save, single service

When a pipeline is saved, deny it if the named service's scorecard score is below the required threshold. This prevents deploying underqualified services.

<DocImage path={require('./static/opa-ss.png')} />

```rego
package pipeline

# Deny pipelines that are configured for service name 'orderService'
# ... and score of 'Service Maturity' scorecard is less than 50.
# Absence of either of these will not halt the pipeline execution
deny[msg] {
    stage = input.pipeline.stages[_].stage      # Find all stages ...
    stage.type == "Deployment"                  # ... that are deployments

    scorecard := stage.spec.idpScorecard.orderService[_]
    scorecard.name == "Service Maturity"
    scorecard.score < 50

    msg := sprintf("orderService has score less than 50, current score: '%v'", [scorecard.score])
}
```

**Success:** The service score is at or above the threshold when the pipeline is saved. The policy rule is evaluated and returns success.

**Warning:** The service score is below 50. A warning appears but the save proceeds. If the pipeline is deployed, Harness will throw an error at run time.

**Failure:** The pipeline has a Deploy stage targeting a prod environment with a service whose score is below the threshold. Harness blocks the save and shows an error message indicating which rule was enforced.

### Pipeline on run, multiple services

On deployment, deny the run if any service used in the pipeline has a scorecard score below the threshold. This enforces quality gates across all services at deploy time.

<DocImage path={require('./static/opa-ms.png')} />

```rego
package pipeline

# Deny pipelines that are configured for all services
# ... if the score of 'Service Maturity' scorecard is less than 50.
# Absence of either of these will not halt the pipeline execution
deny[msg] {
    stage = input.pipeline.stages[_].stage      # Find all stages ...
    stage.type == "Deployment"                  # ... that are deployments

    some key                                   # run through all services
    scorecard = stage.spec.idpScorecard[key][_]
    scorecard.name == "Service Maturity"
    scorecard.score < 50

    msg := sprintf("service '%s' has score less than 50, Actual Score: '%v'", [key, scorecard.score])
}
```

**Success:** All services used in the pipeline have scores above the threshold during the dry run. Harness indicates the rule was evaluated and the action was valid.

**Failure:** One or more services have scores below the threshold. The dry run fails and Harness indicates which rule was enforced and the deployment is prevented.

---

## Policy scope

Policies can be scoped at **account**, **org**, or **project** level. The scope determines which entities the policy set applies to:

| Scope | Applies To |
|---|---|
| **Account** | All IDP catalog entities and pipelines across the entire account |
| **Org** | All entities and pipelines within all projects under the specified org |
| **Project** | Only entities and pipelines within the specified project |

A common pattern is to set hard deny rules at account scope for organization-wide standards, and layer project-scoped warn policies for team-specific limits.
