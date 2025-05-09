---
title: Manage Issue Exemption Requests
description: Procedures and best practices for handling issue exemption requests.
sidebar_label: Manage issue exemptions
sidebar_position: 62
---

import request_exemption from '../use-sto/static/request-exemption.png'
import open_exemption_details from '../use-sto/static/open-exemption-details.png'
import baseline_not_defined from '../use-sto/static/exemption-workflows-no-baseline-defined.png'


This document details how issue exemption requests can be reviewed and processed by security teams(reviewers). It walks through the complete lifecycle of an exemption request, the permissions required to take action, and how exemptions can be applied at different scope - **Project**, **Organization**, or **Account**.

The reviewer's role must include **Approve/Reject** permissions for Exemptions at the appropriate scope, whether at the **Project**, **Organization**, or **Account** level.   Refer to [Required permissions for issue exemptions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) and ensure you have the required privileges at the required scopes.

:::note
Support for **Exemptions** at **Organization** and **Account** level is controlled by the feature flag  `STO_GLOBAL_EXEMPTIONS`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

## Issue Exemption lifecycle
An Issue Exemption request in STO follows a defined lifecycle, with actions that can be taken at each stage. The actions to address exemption requests include **Approve**, **Reject**, **Cancel**, and **Re-open** (to re-open any expired, rejected requests).

The lifecycle stages are as follows:

1. **Pending:** The request is newly created and awaits review. At this stage, users can choose to approve, reject, or cancel the request.
2. **Approved:** The request has been reviewed and accepted. The issue is temporarily or permanently exempt from further action based on the exemption details.
3. **Rejected:** The request has been reviewed and denied. The issue remains active, and the pipeline may continue to block due to OPA policy enforcement failures. 
4. **Expired:** The exemption period has elapsed. Once expired, the issue returns to its original active state unless a new exemption is requested.

**Expired** and **Rejected** exemption requests with **Organization** or **Account** scope can only be moved to **Approved** by approving; those with **Project**, **Pipeline**, or **Target** scope can be moved to Pending by re-opening.

<DocImage path={require('./static/exemption-lifecycle-and-events.png')} width="90%" height="90%" title="Click to view full size image" />

:::note
Users with the **[Security Testing SecOps](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#default-roles-and-permissions)** role can approve or manage issue exemption requests. Refer to [Required permissions for issue exemptions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) to learn more.
:::

## Approve, Reject, or Cancel an Exemption Request

Each exemption request is associated with a specific scope, either a **Pipeline**, **Target**, or **Project**. Reviewers can approve the exemption at the requested scope or at a broader level, such as **Organization** or **Account**, as long as they have the appropriate permissions. Refer to the [Required permissions for issue exemptions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) for more details.

<DocImage path={require('./static/manage-exemptions-overview.png')} width="90%" height="90%" title="Click to view full size image" />

You can act on exemption requests from the **Exemptions** section, available at the **[Project](/docs/security-testing-orchestration/exemptions/exemption-workflows#view-exemptions-at-the-project-level)**, **[Organization](/docs/security-testing-orchestration/exemptions/exemption-workflows#view-exemptions-at-the-organization-level)**, and **[Account](/docs/security-testing-orchestration/exemptions/exemption-workflows#view-exemptions-at-the-account-level)** levels.   Reviewing from higher scopes (**Organization** or **Account**) provides a broader view, allowing you to manage exemptions across all organizations and projects within.

:::warning
In the **Exemptions** section at the **[Organization](/docs/security-testing-orchestration/exemptions/exemption-workflows#view-exemptions-at-the-organization-level)** or **[Account](/docs/security-testing-orchestration/exemptions/exemption-workflows#view-exemptions-at-the-organization-level)** level, you can only see exemption requests from projects where you have View permissions. 
However, if you have **Approve/Reject** permissions at the **[Organization](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions)** or **[Account](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions)** level and you approve an exemption at that scope, it will be applied to all organizations and projects under it, even to those you don’t have access to.
:::

### Approve an Exemption Request

To approve an exemption request:

1. Go to **Exemptions** section from the left navigation.
1. Select **Pending** tab.
2. Click on the exemption request you want to act on. The **Exemption Details** pane opens on the right.
3. Based on your [permissions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions), you will see the actions available to you.

You can approve the exemption at the requested scope or a higher one:

- **Approve for this target** – Applies the exemption only to the specific target where the issue was found.
- **Approve for this pipeline** – Applies the exemption only to the specific pipeline where the issue was found.
- **Approve for this project** – Applies the exemption to all pipelines and targets in the current project.
- **Approve for this organization** – Applies the exemption across all projects in the organization requires [`Approve/Reject`](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions)` permission at the Organization scope.
- **Approve for this account** – Applies the exemption across all organizations and projects in the account requires [`Approve/Reject`](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) permission at the Account scope).

:::tip
Always review the **Exemption Details** and consider the **Requested Duration** before approving. The exemption remains active only for the specified time window (e.g., 7 days from the approval date).
:::

<DocImage path={require('./static/approve-exemption-project-view.png')} width="100%" height="100%" title="Click to view full size image" />

#### Users Can Approve Their Own Exemptions

You can control whether users are allowed to approve or reject their own exemption requests. This option is available under **Exemption Settings** on the **Default Settings** page at the **Project**, **Organization**, and **Account** levels. To configure this setting, you must have Admin-level permissions at the respective scope.

### Reject an Exemption Request

To reject an exemption request, you can either use the **Reject** action directly from the **Exemptions** section or click the request to open the **Exemption Details** pane, where you can review the request thoroughly before choosing to **Reject** it.

Once rejected, the request moves to the **Rejected** tab. The associated issue remains active and may continue to block pipelines due to OPA policy enforcement failures. For more information, see the [**Issue Exemption Lifecycle**](#issue-exemption-lifecycle).

### Cancel an Exemption Request

Clicking **Cancel** on an exemption request immediately removes it from the system. Once canceled, the request no longer appears in the **Exemptions** section. If the exemption is still needed, a new request must be created.

## Best Practices

- A user with the [Security Testing SecOps](/docs/security-testing-orchestration/get-started/onboarding-guide#add-security-testing-roles) role should periodically review all exemptions and update their statuses as needed.
  
- Always [define a baseline for every target](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines#every-target-needs-a-baseline). If a target doesn’t have a baseline, exemption details won’t be visible. Instead, you’ll see a link prompting you to define the target’s baseline.  
  <img src={baseline_not_defined} alt="Can't view exemption details because the target has no baseline" height="50%" width="50%" />

- You can view the **Time Remaining** for approved exemptions and the **Requested Duration** for pending, rejected, and expired requests.

