---
title: Create a cleanup rule
sidebar_label: Create a Cleanup Rule
description: Create a lifecycle cleanup rule to automatically soft-delete artifact versions based on age, version count, or download activity.
sidebar_position: 2
---

A cleanup rule soft-deletes artifact versions that match your cleanup criteria on a recurring schedule. Deleted artifacts remain recoverable during the configured recovery period.

---

## Before you begin

- **Artifact Registry access:** Project Admin or Artifact Registry Administrator role. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> to configure roles.
- **At least one registry:** You need an existing registry to attach the rule to. Go to <a href="/docs/artifact-registry/manage-registries/create-registry" target="_blank">Create a Registry</a> to set one up.

---

## Name the rule

1. Go to **Artifact Registry** > **Registries Settings** > **Lifecycle Rules**.
2. Select **+ New Lifecycle Rule**.
3. Enter a **Name** for the rule.
4. Add a **Description** (optional).
5. Under **Target**, select **Cleanup Rule**.
6. Select **Next**.

<DocImage
  path={require('./static/cleanup-step1-about-rule.png')}
  alt="About Rule step showing name, description, and target selection with Cleanup Rule selected"
  title="Step 1: Name the rule and select Cleanup Rule as the target"
  width="100%"
/>

---

## Configure scope and criteria

Configure what gets retained and what gets cleaned.

<DocImage
  path={require('./static/cleanup-step2-scope-criteria.png')}
  alt="Scope And Criteria step showing registry scope, package type, pattern filters, and cleanup criteria"
  title="Step 2: Define scope, filters, and cleanup criteria"
  width="100%"
/>

### Registry scope

Select which registries this rule applies to:

- **All Registries:** Applies to all registries under the current scope.
- **Specific Registries:** Select individual registries to apply the rule to. When you choose this option, a **Registries** field appears where you search and select registries. Selected registries appear as tags in the field.

<DocImage
  path={require('./static/cleanup-step2-specific-registries.png')}
  alt="Scope And Criteria step with Specific Registries selected, showing swift-repo tag and Keep last 4 enabled"
  title="Scope and Criteria with specific registry selection"
  width="100%"
/>

### Package type

Select **All Package Types** or choose a specific format (Docker, Maven, npm, etc.) to narrow the rule to a single package type.

### Pattern filters

Optionally restrict which packages and versions the rule evaluates:

- **Package Name Patterns:** Wildcard patterns for package names (for example, `frontend-*`, `*-service`). Use `*` as a wildcard and press enter to add multiple patterns.
- **Version Patterns:** Wildcard patterns for version strings (for example, `1.0.*`, `*-SNAPSHOT`). Use `*` as a wildcard and press enter to add multiple patterns.

### Cleanup criteria

You must select at least one criterion.

:::note AND logic

When multiple criteria are enabled, **all** conditions must be true for a version to be deleted. For example, "Keep last 10" and "Older than 30 days" means a version is only deleted if it is beyond the 10 most recent **and** older than 30 days.

:::

- **Keep last N versions:** Retain the most recent N versions on the package. Versions beyond this count become deletion candidates.
- **Delete artifacts older than X days:** Target versions created before the specified threshold.
- **Delete if not downloaded in last X days:** Target versions with no download activity within the specified window.

Select **Next**.

---

## Set the schedule

Define when the rule executes.

<DocImage
  path={require('./static/cleanup-step3-schedule.png')}
  alt="Schedule step showing timezone, frequency tabs, time picker, and generated cron expression"
  title="Step 3: Configure the execution schedule"
  width="100%"
/>

1. Select a **Timezone** (default: UTC).
2. Choose a frequency tab:
   - **Daily:** Set the time (hour, minute, AM/PM).
   - **Monthly:** Select the day of month and time.
   - **Yearly:** Select the month, day, and time.
   - **Custom:** Enter a cron expression directly.
3. Review the generated **Cron Expression** displayed below the time picker.
4. Select **Submit**.

The cleanup rule is created and executes as per the cron schedule. You can verify the rule on the Lifecycle Rules tab, where it shows the criteria summary, last run, and next run time.

:::tip

Use Dry Run from the rule actions menu (**⋮**) before the first scheduled execution to verify which artifacts would be affected.

:::

---

## Next steps

- Go to [Lifecycle rules overview](/docs/artifact-registry/lifecycle-rules/overview) to understand rule evaluation logic, dry runs, and execution history.
- Go to [Create a retention rule](/docs/artifact-registry/lifecycle-rules/create-retention-rule) to protect specific artifacts from cleanup.
- Go to [Delete Artifacts](/docs/artifact-registry/manage-artifacts/soft-delete) to understand soft-delete recovery.
