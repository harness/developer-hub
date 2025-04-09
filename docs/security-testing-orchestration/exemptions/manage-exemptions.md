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

To approve or reject exemption requests, reviewers must have the necessary permissions at the scope where they intend to act. Their role must include **Approve/Reject** permissions for exemptions at the appropriate scope, whether at the project, organization, or account level.   Refer to [**Required permissions for issue exemptions**](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) to ensure you have the required privileges at the required scopes.

## Issue Exemption lifecycle
An Issue Exemption request in STO follows a defined lifecycle, with actions that can be taken at each stage. The actions to address exemption requests include **Approve**, **Reject**, **Cancel**, and **Re-open** (to re-open any expired, rejected requests).

The lifecycle stages are as follows:

1. **Pending:** The request is newly created and awaits review. At this stage, users can choose to approve, reject, or cancel the request.
2. **Approved:** The request has been reviewed and accepted. The issue is temporarily or permanently exempt from further action based on the exemption details.
3. **Rejected:** The request has been reviewed and denied. The issue remains active, and the pipeline may continue to block due to OPA policy enforcement failures. 
4. **Expired:** The exemption period has elapsed, or the exemption has been invalidated. Once expired, the issue returns to its original active state unless a new exemption is requested.

Expired and Rejected exemption requests with Organization or Account scope can only be moved to approved by approving; those with Project, Pipeline, or Target scope can be moved to Pending by re-opening.

<DocImage path={require('./static/exemption-lifecycle-and-events.png')} width="90%" height="90%" title="Click to view full size image" />

:::note
Users with the **Security Testing SecOps** role can approve or manage issue exemption requests, but only if they have the **Approve/Reject** permission at the relevant scope (Project, Organization, or Account). Refer [Required permissions for issue exemptions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) to learn more.
:::

## Approve, Reject, or Cancel an Exemption Request

Each exemption request is associated with a specific scope, either a **Pipeline**, **Target**, or **Project**. Reviewers can approve the exemption at the requested scope or at a broader level, such as **Organization** or **Account**, as long as they have the appropriate permissions. Refer to the [Required permissions for issue exemptions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) for more details.

<DocImage path={require('./static/manage-exemptions-overview.png')} width="90%" height="90%" title="Click to view full size image" />

You can act on exemption requests from the **Exemptions** section, available at the **[Project](/docs/security-testing-orchestration/exemptions/exemption-workflows#view-issue-exemptions)**, **[Organization](/docs/security-testing-orchestration/exemptions/exemption-workflows#view-issue-exemptions)**, and **[Account](/docs/security-testing-orchestration/exemptions/exemption-workflows#view-issue-exemptions)** levels.  

Reviewing from higher scopes (Organization or Account) gives you a broader view, enabling you to manage exemptions across more teams and projects.

:::warning
From the Exemption section in the Account or Organization levels, you can only view exemption requests from projects where you have the **View** permissions. However, if you have **Approve/Reject** permissions at the Organization or Account level, the exemption you apply can affect projects and organizations you may not have direct access to.
:::

### Approve an Exemption Request

To approve an exemption request:

1. Go to the **Pending** tab in the **Exemptions** section.
2. Click on the exemption you want to act on. The **Exemption Details** pane opens on the right.
3. Based on your [permissions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions), you will see the actions available to you.

You can approve the exemption at the requested scope or a higher one:

- **Approve for this target** – Applies the exemption only to the specific target where the issue was found.
- **Approve for this pipeline** – Applies the exemption only to the specific pipeline where the issue was detected.
- **Approve for this project** – Applies the exemption to all pipelines and targets in the current project.
- **Approve for this organization** – Applies the exemption across all projects in the organization (requires `Approve/Reject` permission at the Organization scope).
- **Approve for this account** – Applies the exemption across all organizations and projects in the account (requires `Approve/Reject` permission at the Account scope).

> Always review the **Exemption Details** and consider the **Requested Duration** before approving. The exemption remains active only for the specified time window (e.g., 7 days from the approval date).

<DocImage path={require('./static/approve-exemption-project-view.png')} width="100%" height="100%" title="Click to view full size image" />

#### Users Can Approve Their Own Exemptions

You can configure whether users are allowed to approve or reject their own exemption requests. This setting is available under **Exemption Settings** on the **Default Settings** page at the project, organization, and account levels.

:::note
This setting is controlled by the feature flag `STO_EXEMPTION_SETTING`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::


### Reject an Exemption Request

To reject an exemption request, you can use the **Reject** action directly from the Exemptions list, or open the **Exemption Details** pane for the request and click **Reject**.

Rejected requests move to the **Rejected** tab. The issue remains active and may continue to block pipelines due to OPA policy enforcement failures. Learn more in the [**Issue Exemption Lifecycle**](#issue-exemption-lifecycle).

### Cancel an Exemption Request

Clicking **Cancel** on an exemption request will immediately remove it from the system. Once canceled, it no longer appears in the exemption list. If the user still needs the exemption, they will need to submit a new request.

## Best Practices

- A user with the [Security Testing SecOps](/docs/security-testing-orchestration/get-started/onboarding-guide#add-security-testing-roles) role should periodically review all exemptions and update their statuses as needed.
  
- Always [define a baseline for every target](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines#every-target-needs-a-baseline). If a target doesn’t have a baseline, exemption details won’t be visible. Instead, you’ll see a link prompting you to define the target’s baseline.  
  <img src={baseline_not_defined} alt="Can't view exemption details because the target has no baseline" height="50%" width="50%" />

- You can view the **Time Remaining** for approved exemptions and the **Requested Duration** for pending, rejected, and expired requests.

