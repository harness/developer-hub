---
title: Trigger executor identity
sidebar_label: Trigger Executor Identity
description: Run trigger-started pipelines under a specific user or service account identity so their RBAC applies to secrets, environments, connectors, and other resources.
sidebar_position: 12
keywords:
  - trigger executor
  - executor identity
  - trigger RBAC
  - service account executor
  - system principal
tags:
  - triggers
  - pipelines
  - rbac
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

By default, a pipeline triggered by a trigger does not run with the identity of the user who created the trigger. Instead, it runs as the Harness system principal. Because the system principal is not subject to the same RBAC checks as users invoking pipelines through the UI or API, the pipeline can access any resource that the system principal is authorized to use, including secrets, environments, connectors, and other protected resources.

A trigger executor identity addresses this by allowing you to associate a user or service account with a trigger. When the trigger starts a pipeline, Harness executes the pipeline using that identity and enforces its RBAC permissions. Every resource the pipeline attempts to access is validated against the assigned user or service account, ensuring the same access controls apply as they do for pipelines started manually through the UI or API.

:::note
This feature is behind the feature flag `PIPE_ENFORCE_TRIGGER_EXECUTOR_IDENTITY`. Contact [Harness Support](mailto:support@harness.io) to enable it for your account.
:::

---

## What you will learn in this topic

- Why [trigger executor identity](#executor-identity-and-access-control) matters and the security risk it addresses.
- How the [feature flag and the account setting](#feature-flag-and-enforcement-setting) interact to make the executor optional or mandatory.
- Who you can [set as an executor](#supported-executor-identities) and the permissions each option requires.
- How Harness [applies the executor identity](#apply-the-executor-identity) when a trigger creates, updates, or runs a pipeline.
- The [limitations](#limitations) to know before you enable this feature.

---

## Executor identity and access control

When a pipeline is started from the UI or the API, Harness executes it using the identity of the user who initiated the run. Harness then evaluates that user's RBAC permissions for every resource the pipeline accesses, including secrets, environments, services, connectors, and variables. If the user is not authorized to access a required resource, the pipeline run is blocked.

By default, a trigger-started pipeline does not run under a user identity. For webhook triggers, Harness validates only the API key used to invoke the trigger. After that validation succeeds, the pipeline runs as the Harness system principal. Because the system principal is not subject to the same RBAC restrictions as an end user, the pipeline can access any resource available to the system principal. This creates a potential privilege escalation path if a trigger is configured without an executor identity.

Assigning an executor identity closes this gap. The pipeline runs using the RBAC permissions of the selected user or service account, ensuring that trigger-started pipeline executions are subject to the same access checks as manually started runs.

---

## Feature flag and enforcement setting

Two controls determine whether you can configure an executor identity and whether it is required.

- **Feature flag `PIPE_ENFORCE_TRIGGER_EXECUTOR_IDENTITY`**: Enables the executor identity feature for your account. When enabled, the **Run pipeline as** field is available in both the trigger UI and API, allowing you to configure an executor identity.
- **Enforce Executor Identity for Triggers**: Makes an executor identity mandatory for triggers. This setting is available at the account, organization, and project scopes. It is available only when the `PIPE_ENFORCE_TRIGGER_EXECUTOR_IDENTITY` feature flag is enabled, and has no effect unless the feature flag is enabled. To configure it at the account scope, go to **Account Settings** > **Account Resources** > **Default Settings** > **Pipeline**, and set **Enforce Executor Identity for Triggers** to **True**. Use the organization or project **Default Settings** to configure it at those scopes.

<div align="center">
  <DocImage path={require('./static/trigger-enforce-executor-setting.png')} width="90%" height="90%" title="Click to view full size image" />
</div>

The following table describes the behavior for each combination of the feature flag and enforcement setting.

| Feature flag | Setting: Enforce Executor Identity for Triggers | Behavior |
| --- | --- | --- |
| Off | Any | This is the legacy behavior. The executor field is not processed on create. An existing executor is preserved on update. Execution uses the executor if one is already stored, otherwise the system or webhook principal. |
| On | Off | The executor identity is optional. If you configure one, Harness validates and uses it to execute the pipeline. If you do not configure one, the trigger uses the legacy execution behavior. |
| On | On | The executor identity is required. Creating or updating a trigger without an executor identity fails validation, and any trigger without a valid executor identity cannot execute a pipeline. |

---

## Supported executor identities

You set the executor in the **Run pipeline as** field on the trigger. You can select one of two identity types. You cannot set any other user as the executor, even as an administrator.

<div align="center">
  <DocImage path={require('./static/trigger-run-pipeline-as.png')} width="90%" height="90%" title="Click to view full size image" />
</div>

| Executor type | Who you can select | Permission required |
| --- | --- | --- |
| **User** | Only yourself (the current user). | The user must be active and have permission to run the pipeline. |
| **Service account** | A service account you are allowed to manage. | You must have the `core_serviceaccount_manageapikey` permission on that service account. |

Harness prevents trigger configuration from being used to escalate privileges. You can assign only identities that you already control.

- **User:** You can assign only your own user identity (`uuid`). The selected user ID must match the current authenticated user. Even account, organization, or project administrators cannot assign another user as the executor.
- **Service account:** You can set a service account only if you have permission to manage its API keys. The reasoning is that if you can already generate an API key for that service account, assigning it to a trigger is not an escalation. In the **Run pipeline as** selector, you can browse service accounts across the account, organization, project, and all scopes, and search or page through the accounts you can manage.

To clear a selected identity, remove it from the **Run pipeline as** field.

The **Run pipeline as** selector is available on all trigger types: webhook, scheduled, artifact, manifest, and system event triggers. The selected identity is shown on the trigger detail page.

<div align="center">
  <DocImage path={require('./static/trigger-executor-detail.png')} width="90%" height="90%" title="Click to view full size image" />
</div>

---

## Apply the executor identity

The executor identity affects trigger creation, updates, and execution. Behavior depends on whether the enforcement setting is on.

### Create a trigger

You set the executor in the **Run pipeline as** field when you create the trigger. Enforcement decides whether the field is optional or required:

- **Feature flag on, setting off:** The executor is optional. If you provide one, Harness validates it. Go to [Supported executor identities](#supported-executor-identities) to review the rules. If you omit it, the trigger is created without an executor.
- **Feature flag on, setting on:** The executor is mandatory. You must select an executor before you can save the trigger, including when you save from the YAML editor. Harness does not auto-default to the logged-in user, so creation fails if the executor is missing.

### Update a trigger

- **Executor omitted, trigger already has an executor:** Harness preserves the existing executor.
- **Executor omitted, legacy trigger with no executor, setting on:** Harness auto-sets the editing user as the executor. This is the migration path, and it applies to user callers only.
- **Executor provided:** Harness validates it the same way as on create.

Enabling or disabling a trigger preserves its stored executor. This preservation happens only when the feature flag is on.

### Execute a trigger

- **Executor set on the trigger:** The pipeline runs under that user or service account's RBAC. Every resource the pipeline accesses is checked against that identity, not the system or webhook principal.
- **Feature flag and setting both on, trigger has no executor:** Execution fails with an error asking you to update the trigger. Harness does not fall back to the system principal.
- **Feature flag off, or setting off:** No enforcement failure. If an executor is present, its RBAC is used. If not, legacy behavior applies (system or webhook principal).

---

## Executor identity storage

Harness stores the executor details in the trigger metadata (`executorInfo` on the trigger entity), not in the trigger YAML. Because the executor is contextual to the API caller rather than part of the trigger definition, storing it as metadata avoids extending the trigger YAML schema for an RBAC concern and requires no YAML parsing or merging.

When the feature flag is on, trigger create and update requests use the trigger V2 API. The request body is JSON that carries the YAML alongside the executor:

```json
{
  "yaml": "<trigger YAML>",
  "executorInfo": {
    "uuid": "string",
    "name": "string",
    "email": "string",
    "type": "USER | SERVICE_ACCOUNT",
    "accountIdentifier": "string",
    "orgIdentifier": "string",
    "projectIdentifier": "string"
  }
}
```

`executorInfo` is omitted when no executor is selected. For a **user** executor, Harness stores `uuid`, `name`, `email`, and `type`. For a **service account** executor, the request also includes the account, organization, and project identifiers, and Harness stores the resolved scope for use at execution time.

When the feature flag is off, trigger create and update use the existing V1 API with a YAML string body, `executorInfo` is not sent, and existing trigger behavior is unchanged.

---

## Limitations

- **Only two executor types are supported.** You can set a user (yourself only) or a service account you can manage. You cannot set another user as the executor under any role.
- **User executor is self only.** The stored user ID must match the current user. Administrators cannot assign a different user.
- **Service account executor requires manage permission.** You can assign only a service account you have `core_serviceaccount_manageapikey` on.
- **Enforcement requires the feature flag.** The "Enforce Executor Identity for Triggers" setting has no effect unless `PIPE_ENFORCE_TRIGGER_EXECUTOR_IDENTITY` is on.
- **No auto-default on create.** When enforcement is on, creating a trigger fails if no executor is provided. Harness does not silently set the logged-in user on create; it auto-sets the editing user only when updating a legacy trigger.
- **Executor lives in metadata, not YAML.** The executor is not part of the trigger YAML and does not appear when you view or export the trigger definition.

---

## Troubleshooting

<Troubleshoot
  issue="Trigger execution fails with an error asking to update the trigger executor"
  mode="general"
  fallback="When the PIPE_ENFORCE_TRIGGER_EXECUTOR_IDENTITY feature flag and the Enforce Executor Identity for Triggers setting are both on, a trigger with no executor fails at execution. Edit the trigger and set a valid user or service account as the executor."
/>

<Troubleshoot
  issue="Cannot select a service account as the trigger executor"
  mode="general"
  fallback="You can assign a service account as an executor only if you have the core_serviceaccount_manageapikey permission on it. Confirm your permission on the service account, then reopen the executor selector."
/>

<Troubleshoot
  issue="Creating a trigger fails because the executor is required"
  mode="general"
  fallback="When the Enforce Executor Identity for Triggers setting is on, the executor is mandatory on create and is not auto-defaulted. Provide a valid user or service account executor in the trigger create request."
/>

---

## Next steps

- [Triggers overview](/docs/platform/triggers/triggers-overview): Understand how triggers start pipelines and the event types Harness supports.
- [Enforce authorization RBAC on custom triggers](/docs/platform/triggers/triggers-enforcerbac): Require API key tokens on custom webhook triggers.
- [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness): Review how Harness checks access to secrets, environments, and connectors.
