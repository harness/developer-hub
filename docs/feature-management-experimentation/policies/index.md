---
title: Using Harness Policy As Code with Feature Management & Experimentation
id: index
slug: /feature-management-experimentation/policies
sidebar_label: Overview
description: Learn how to create and enforce Harness Policy As Code (OPA) policies for Feature Management & Experimentation (FME) feature flags and definitions.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Policy As Code lets FME administrators define governance rules that are automatically evaluated whenever feature flags or feature flag definitions are created, updated, deleted, or archived.

Policies are authored in [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/) and evaluated using [Open Policy Agent (OPA)](https://www.openpolicyagent.org/). Harness Policy As Code supports the **FeatureFlag** and **FeatureFlagDefinition** entity types and evaluates policies on the **On Save** trigger.

### Prerequisites

- Familiarity with [Harness Policy As Code](/docs/platform/governance/policy-as-code/harness-governance-overview) concepts such as policies, policy sets, and enforcement.
- You need the **Governance Policies** and **Governance Policy Sets** permissions to create and enforce policies. The built-in [FME Administrator role](/docs/feature-management-experimentation/permissions/rbac) includes these permissions, or you can assign them through a [custom role](/docs/platform/role-based-access-control/permissions-reference/#policies).
- Policies are written in Rego. If you're new to Rego, see the [Open Policy Agent documentation](https://www.openpolicyagent.org/docs).

### Input payload reference

When a policy is evaluated, Harness sends an input payload to OPA containing the entity data and metadata. The payload structure depends on the entity type.

<details>
<summary>FeatureFlag payload</summary>

```json
{
  "featureFlag": {
    "name": "enable_dark_mode",
    "status": "ACTIVE",
    "description": "Enable dark mode for end users",
    "trafficTypeName": "user",
    "tags": ["ui", "frontend"],
    "keyMetrics": ["metric_login_success_rate"],
    "supportingMetrics": ["metric_error_rate"],
    "rolloutStatusName": "rollout_in_progress",
    "pendingChangeRequests": 0,
    "hasPendingStatusChange": false,
    "lastTrafficDate": "2025-02-08T00:00:00Z",
    "governanceType": "fmeFeatureFlag"
  },
  "entityMetadata": {
    "actor": {
      "type": "user",
      "name": "Jane Smith"
    },
    "account": {
      "accountId": "abc123",
      "organizationId": "org_456"
    },
    "project": {
      "id": "mobile_shopping_app"
    },
    "owners": [
      {
        "ownerType": "team",
        "ownerId": "team_frontend",
        "ownerName": "Frontend Team"
      }
    ],
    "changeTrigger": "update"
  }
}
```

</details>

<details>
<summary>FeatureFlagDefinition payload</summary>

```json
{
  "featureFlagDefinition": {
    "name": "enable_dark_mode",
    "environmentName": "Production",
    "status": "ACTIVE",
    "killed": false,
    "trafficTypeName": "user",
    "description": "Enable dark mode for end users",
    "definition": [
      {
        "conditionType": "ROLLOUT",
        "matcherGroup": {
          "combiner": "AND",
          "matchers": [
            {
              "matcherType": "ALL_KEYS",
              "negate": false
            }
          ]
        },
        "partitions": [
          {
            "treatment": "off",
            "size": 100
          }
        ],
        "label": "Default treatment"
      }
    ],
    "treatments": [
      {
        "name": "on",
        "description": "Enable dark mode",
        "baseline": false,
        "defaultTreatment": false
      },
      {
        "name": "off",
        "description": "Keep dark mode disabled",
        "baseline": true,
        "defaultTreatment": true
      }
    ],
    "trafficAllocation": 100,
    "flagSets": []
  },
  "entityMetadata": {
    "actor": {
      "type": "user",
      "name": "Jane Smith"
    },
    "account": {
      "accountId": "abc123",
      "organizationId": "org_456"
    },
    "project": {
      "id": "mobile_shopping_app"
    },
    "owners": [
      {
        "ownerType": "team",
        "ownerId": "team_frontend",
        "ownerName": "Frontend Team"
      }
    ],
    "changeTrigger": "update"
  }
}
```

</details>

### Example: Require a description for feature flags

The following policy denies creating or updating a feature flag if the description is missing or empty. It uses `changeTrigger` to skip validation on delete, so that flags with missing descriptions can still be cleaned up. For more examples, see [FME policy samples](/docs/platform/governance/policy-as-code/sample-policy-use-case#fme-feature-flag-policies).

```rego
package fme_feature_flags

deny[msg] {
  input.entityMetadata.changeTrigger != "delete"
  not input.featureFlag.description
  msg := sprintf(
    "Feature flag '%s' must include a description before it can be saved",
    [input.featureFlag.name]
  )
}

deny[msg] {
  input.entityMetadata.changeTrigger != "delete"
  input.featureFlag.description == ""
  msg := sprintf(
    "Feature flag '%s' must include a non-empty description",
    [input.featureFlag.name]
  )
}
```

### Example: Require flag sets for production definitions

The following policy ensures that every feature flag definition saved in a production environment belongs to at least one flag set. For additional examples, see [FME Feature Flag Definition policy samples](/docs/platform/governance/policy-as-code/sample-policy-use-case#fme-feature-flag-definition-policies).

```rego
package fme_feature_flag_definitions

deny[msg] {
  input.featureFlagDefinition.environmentName == "Production"
  count(input.featureFlagDefinition.flagSets) == 0
  msg := sprintf(
    "Feature flag '%s' in Production must belong to at least one flag set",
    [input.featureFlagDefinition.name]
  )
}
```

### The Policies page

When you navigate to the **Policies** page from **Project**, **Account**, or **Organization Settings**, you can manage policies, policy sets, and evaluations across the following tabs.

<Tabs queryString="policies-view">
<TabItem value="overview" label="Overview">

The **Overview** tab displays a high-level view of policy health across your project, account, or organization. This includes charts for policy evaluations, summary counts for policy sets and total evaluations, and the total number of policies.

![Policy health overview dashboard](../static/policies-1.png)

Click the dropdown menu to view the policy health in the `Last 24 hours`, `Last 7 days`, and `Last 30 days`. Use this view to understand how policies are performing and whether violations are increasing or decreasing.

</TabItem>
<TabItem value="policy" label="Policies">

The **Policies** tab displays a list view of individual policies. To create a policy, click **+ New Policy**.

![Policies list view](../static/policies-2.png)

Each row represents a single policy and includes the following information:

| Column                | Description                                      |
|-----------------------|--------------------------------------------------|
| **Policy**                | Name of the policy                               |
| **Policy Store**          | Inline or Remote (Git-backed)                    |
| **Referenced Policy Sets** | Number of policy sets using the policy           |
| **Created At**            | Policy creation timestamp                        |
| **Last Modified**         | Most recent update                               |

Use the search bar to search for policies by name, and the dropdown menu to sort policies using filters such as `Last Updated`, `A-Z, 0-9`, or `Z-A, 9-0`. To manage your policies, click on the kebab menu (⋮) in a policy and select **Edit** or **Delete**.

</TabItem>
<TabItem value="policy-set" label="Policy Sets">

The **Policy Sets** tab shows a list view of policy sets, which group one or more policies and define enforcement behavior. To create a policy set, click **+ New Policy Set**.

![Policy sets list view](../static/policies-3.png)

Each row represents a single policy set and includes the following information:

| Column       | Description                                      |
|--------------|--------------------------------------------------|
| **Policy Set**   | Name of the policy set                           |
| **Environment**  | Environment where the policy set applies (for FME, this is `Harness`)         |
| **Action**       | Trigger event (for FME, this is **On Save**)     |
| **Enforced**     | Whether enforcement is enabled                   |
| **Entity Type**  | Type of entity (`FeatureFlag` or `FeatureFlagDefinition`)                                |
| **Created At**   | Creation timestamp                               |
| **Last Modified** | Most recent update                               |

Use the search bar to search for policy sets by name, and the dropdown menu to sort policy sets using filters such as `Last Updated`, `A-Z, 0-9`, or `Z-A, 9-0`. To manage your policy sets, click on the kebab menu (⋮) in a policy set and select **Edit** or **Delete**.

</TabItem>
<TabItem value="evaluations" label="Evaluations">

The **Evaluations** tab provides a list view of individual policy evaluations, allowing you to audit policy enforcement results.

![Evaluations list view](../static/policies-4.png)

You can filter evaluations using the time range dropdown menu (for example, `Last 7 days`). Each evaluation includes the following information:

| Column        | Description                                      |
|---------------|--------------------------------------------------|
| **Entity**        | Name of the evaluated entity                     |
| **Entity Type**   | Type of entity (`FeatureFlag` or `FeatureFlagDefinition`)   |
| **Execution**     | Internal execution identifier                    |
| **Evaluated On**  | When the evaluation occurred                     |
| **Action**        | Trigger event (for FME, this is **On Save**)     |
| **Status**        | Evaluation result: **Success**, **Failed**, or **Warning** |

This view is useful for troubleshooting failed saves and validating that policies are being enforced as expected.

</TabItem>
</Tabs>

## Create and enforce a policy

To create a policy:

1. From the Harness FME navigation menu, click on **Project**, **Account**, or **Organization Settings**.
1. Under **Security and Governance**, select **Policies**. This directs you to the **Overview** tab which displays overall policy health over a selected time range.
1. Navigate to the **Policies** tab and click **+ New Policy**. Optionally, you can [import a policy from Git](/docs/platform/governance/policy-as-code/configure-gitexperience-for-opa) by clicking the dropdown menu and selecting **Import from Git**.
1. Enter a name for the policy and select the setup option:

   * **Inline** to author the policy in the Harness editor.
   * **Remote** to reference a Rego policy stored in a Git repository. Select a connector, repository, branch, and Rego path, then click **Apply**.

1. This opens the Policy Editor view, where you can author your own policy or use an out-of-the-box sample. You can also select **Harness AIDA** to generate or assist with [writing Rego policy logic](/docs/platform/governance/policy-as-code/ai-for-policies).

   ![Policy editor view](../static/policies-6.png)

   The editor includes a code editor for writing or modifying Rego, a **Testing Terminal** tab to validate policy behavior, and a **Library** tab containing sample policies.

   <Tabs queryString="policy-editor">
   <TabItem value="rego" label="Write Your Rego Policy">

    * In the policy editor, write or paste your Rego logic.
    * Use the **Testing Terminal** to test the policy against sample inputs.
    * Click **Save**.

   </TabItem>
   <TabItem value="library" label="Use the Harness Policy Library">

    * Open the **Library** tab.
    * Search for the **FeatureFlag** or **FeatureFlagDefinition** entity type.
    * Select a policy to populate the library editor.
    * Click **Test** to validate the policy logic.
    * Click **Use This Sample** to copy the policy into your policy editor.
    * Click **Save**.

    </TabItem>
    </Tabs>

1. Test the policy by opening the **Testing Terminal** tab.
1. Click **Select Input**.
1. Choose the appropriate inputs, including the entity type (**FeatureFlag** or **FeatureFlagDefinition**), organization, project, and action (**On Save**). Then, select an entity from the list of results.

   ![Select input for policy testing](../static/policies-7.png)

1. Click **Apply**, then click **Test**. Review the output to confirm the policy behaves as expected.
1. Click **Next: Enforce Policy**.
1. Configure the following enforcement settings:

   * **Scope**: Select the appropriate scope, for example: `Account`.
   * **Trigger event**: Select **On Save**.
   * **Severity**:

     * **Warn and Continue**: Violations generate a warning, but the entity is saved.
     * **Error and Exit**: Violations block the save operation.

1. Click **You're all set!** to save and enforce the policy.

:::info Policies do not apply retroactively
Existing FME entities are not automatically evaluated against new policies. A policy runs only when a feature flag or feature flag definition is created, updated, deleted, or archived. To evaluate an existing entity, save it again.
:::

## Add the policy to a policy set

Once you've created an individual policy, you must add it to a policy set before you can apply it to your feature flags. Policy sets allow you to group policies and configure where they will be enforced.

To add a policy set:

1. Navigate to the **Policy Sets** tab.
1. Click **+ New Policy Set**.
1. In the **Overview** section, enter a name and optionally, include a description.
1. Select the entity type that this policy set applies to: **FeatureFlag** or **FeatureFlagDefinition**.
1. Select **On Save** as the trigger event.
1. Click **Continue**.

   ![New policy set configuration](../static/policies-8.png)

1. In the **Policy evaluation criteria** section, click **+ Add Policy**.
1. Select a policy from a project, organization, or account.

   ![Add policy to a policy set](../static/policies-9.png)

1. To the right of the policy, select **Warn and Continue** or **Error and Exit**.

   - **Warn and Continue**: If a policy isn't met when an entity is evaluated, you receive a warning but the entity is saved.
   - **Error and Exit**: If a policy isn't met when an entity is evaluated, you receive an error and the entity is not saved.

1. Click **Apply**.
1. To add an additional policy, click **+ Add Policy**. When you're done adding policies to a policy set, click **Finish**.

   ![Policy set with policies added](../static/policies-10.png)

1. In the **Policy Sets** list, click the **Enforced** checkbox for the policy set you created.

   ![Enforced checkbox for policy set](../static/policies-11.png)

## How policies are evaluated

Policies are evaluated whenever a **FeatureFlag** or **FeatureFlagDefinition** entity is created, updated, deleted, or archived. The input payload sent to OPA includes an `entityMetadata.changeTrigger` field (`create`, `update`, `delete`, or `archive`) so you can write policies that apply to specific change types.

<Tabs queryString="evaluation-example">
<TabItem value="feature-flag" label="FeatureFlag">

A **FeatureFlag** policy is evaluated when you change a feature flag's metadata. Examples of changes that trigger evaluation:

- Creating a new feature flag
- Updating a flag's name, description, tags, or metrics
- Archiving or deleting a feature flag

</TabItem>
<TabItem value="feature-flag-definition" label="FeatureFlagDefinition">

A **FeatureFlagDefinition** policy is evaluated when you change a feature flag's targeting configuration in a specific environment. Examples of changes that trigger evaluation:

- Adding or modifying targeting rules
- Changing rollout percentages or traffic allocation
- Updating the default treatment
- Killing or restoring a flag in an environment

</TabItem>
</Tabs>

On success, the change is applied. On failure, the result depends on the severity you configured:

- **Warn and Continue**: The change is applied, but you receive a warning message.
- **Error and Exit**: The change is blocked, and you receive an error message.

:::tip Use changeTrigger to scope your policies
The `entityMetadata.changeTrigger` field in the input payload lets you target specific operations. For example, you might skip name convention checks on `delete` to avoid blocking cleanup of legacy flags. See the [example policy](#example-require-a-description-for-feature-flags) for a pattern that excludes delete operations.
:::

## Manage policy evaluations

Navigate to the **Evaluations** tab to view all successful, warning, and failed policy set evaluations. Use the **Type** dropdown menu to filter by **FeatureFlag** or **FeatureFlagDefinition** entities, and the **Action** dropdown menu to filter by **On Save** events.

![Evaluations filtered by entity type](../static/policies-5.png)

Use the **Status** dropdown menu to filter evaluations by **Success**, **Failed**, or **Warning**. You can also use the time range selector to switch to a custom time range or a preset such as the past week, past month, or past three months.

![Evaluations filtered by status](../static/policies-12.png)

Click on an evaluation in the list to access the policy set that was evaluated. You can then click into the policy set details and see associated policies, or click into the policy definition itself.

<Tabs queryString="evaluations">
<TabItem value="policy-set" label="Policy Set">

![Policy set evaluation details](../static/policies-13.png)

From here, you can review which policies were applied and their evaluation results.

</TabItem>
<TabItem value="policy" label="Policy">

![Policy definition details](../static/policies-14.png)

From here, you can review the Rego logic that was evaluated and update it if needed.

</TabItem>
</Tabs>

## See also

- [Harness Policy As Code overview](/docs/platform/governance/policy-as-code/harness-governance-overview)
- [Harness Policy As Code quickstart](/docs/platform/governance/policy-as-code/harness-governance-quickstart)
- [FME FeatureFlag policy samples](/docs/platform/governance/policy-as-code/sample-policy-use-case#fme-feature-flag-policies)
- [FME FeatureFlagDefinition policy samples](/docs/platform/governance/policy-as-code/sample-policy-use-case#fme-feature-flag-definition-policies)
- [Configure Git Experience for OPA](/docs/platform/governance/policy-as-code/configure-gitexperience-for-opa)
