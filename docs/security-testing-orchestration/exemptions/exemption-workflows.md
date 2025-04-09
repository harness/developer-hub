---
title: Request Issue Exemption
description: Steps to submit an issue exemption request
sidebar_label: Request issue exemption
sidebar_position: 60
redirect_from: 
  - docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/exemption-workflows
---

import request_exemption from '../use-sto/static/request-exemption.png'
import open_exemption_details from '../use-sto/static/open-exemption-details.png'
import baseline_not_defined from '../use-sto/static/exemption-workflows-no-baseline-defined.png'

Issue exemptions help unblock pipelines by allowing security teams to temporarily bypass specific security issues that would otherwise fail the build. To understand how exemptions fit into your security workflow, refer to the [issue exemptions workflow](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow).

You can raise exemption requests at the [Project](#where-do-you-want-this-issue-to-be-exempted), [Pipeline](#where-do-you-want-this-issue-to-be-exempted), or [Target](#where-do-you-want-this-issue-to-be-exempted) level. While requests can only be raised at these specific scopes, reviewers have the option to approve them at the requested scope or at a broader scope, such as **Organization** or **Account**, during the approval process. For more details, refer to [Manage Issue Exemptions](/docs/security-testing-orchestration/exemptions/manage-exemptions). To learn how to create a request, follow the steps in the sections below. To view submitted requests, see [View Issue Exemptions](#view-issue-exemptions).


<DocImage path={require('./static/request-exemption-overview.png')} width="80%" height="80%" title="Click to view full-size image" />

:::note
Your role must have the necessary permissions (**Exemptions: View, Create/Edit**) to request exemptions. Refer [Permissions required for issue exemptions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) for more details.
:::

## Create Issue Exemptions

### Navigate to the build execution

1. From the **left navigation**, select **Executions**.  
2. Locate and click on the specific build execution containing the issue you want to exempt.

### Identify the issue to exempt

1. Within the build execution details, select the **Security Tests** tab.  
2. Find and click on the specific issue you want to exempt. This opens the **Issue Details** pane on the right.

### Submit the exemption request

In the **Issue Details** pane, click **Request Exemption**.  
<DocImage path={require('./static/request-exemption.png')} width="40%" height="40%" title="Click to view full-size image" />

Fill out the **Request Exemption for Issue** form with the following fields:  
<DocImage path={require('./static/request-exemption-form.png')} width="40%" height="40%" title="Click to view full-size image" />

#### Where do you want this issue to be exempted?

Specify where the exemption should apply:

- **This Target**: Exempts the issue only for the selected target. The issue remains reported in other targets or pipelines.  
- **This Pipeline**: Exempts the issue only in the current pipeline. The issue is still reported in other pipelines or projects.  
- **This Project**: Exempts the issue across all pipelines and targets within this project. Choose carefully, as the exemption applies broadly within the project.  

> **Note:** While requests are limited to the above scopes, reviewers can approve exemptions at the **Organization** or **Account** level if needed.

#### For how long?

Select the shortest practical time window for the exemption to limit the risk exposure.

#### Reason

Select one of the following reasons and provide relevant details:

- **Compensating controls**: Your organization has controls (e.g., firewall, IPS) in place that reduce the risk posed by this issue.  
- **Acceptable use**: The flagged practice is acceptable based on internal security policies.  
- **Acceptable risk**: The risk is low, and remediation would require significant resources or impact functionality.  
- **False positives**: The scanner flagged a non-issue. Confirmed by a security assessor or internal review.  
- **Fix unavailable**: No known fix or remediation steps currently exist for the issue.  
- **Other**: Provide a detailed technical explanation for why the issue should be exempted.

#### Further Description

Add any technical context, mitigations, or supporting information that will help the reviewer understand why the exemption is justified.

#### URL Reference

Add a link to supporting documentation, source code, or any relevant resource that provides additional context.

After completing the form, click **Create Request** to submit the exemption.

### Notify reviewers

Once the exemption request is submitted:

- Inform your **Security Testing SecOps** reviewer.  
- Ensure they have enough context and links to make a well-informed decision.

## View Issue Exemptions

You can view all exemption requests from the **Exemptions** section in the left navigation. This section is accessible from your **Project**, **Organization**, and **Account** views. Each scope displays exemption requests relevant to that level:

- The **[Project-level Exemptions](#view-exemptions-at-the-project-level)** section shows requests submitted for that specific project.
- The **[Organization-level Exemptions](#view-exemptions-at-the-organization-level)** section shows requests across all projects within the organization.
- The **[Account-level Exemptions](#view-exemptions-at-the-account-level)** section lists requests across projects from multiple organizations under the account.

:::note
The exemption requests you see at the Organization and Account levels are still subject to your project-level view permissions. Refer to [**Permissions for exemption requests**](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) to learn more.
:::

In the Exemptions sections, the requests are displayed in tabs presenting their status, each request includes:

- **Severity**: e.g., High  
- **Issue**: e.g., `json5@2.2.0: Prototype Pollution`  
- **Scope**: Requested exemption scope – Project, Pipeline, or Target  
- **Reason**: e.g., False Positive, Acceptable Use  
- **Exemption Duration**: e.g., Exempted for all time  
- **Requested by**: User who submitted the request  
- **Actions**: Based on your permissions and request status — Approve, Reject, Cancel, Reopen

<DocImage path={require('./static/view-exemptions.png')} width="100%" height="100%" title="Click to view full-size image" />

Here are the columns that are specific to status tab.
- **Pending**: Displays severity, issue, scope, reason, exemption duration, requested by, and action buttons such as *Approve*, *Reject*, or *Cancel*.
- **Approved**: Shows *Approved by*, *Time remaining*, *Approved at*, *Requested by*, with
actions to *Reject* or *Cancel*.
- **Rejected**: Displays *Requested by*, *Rejected by*, and options to *Reopen*, or *Approve* and *Cancel*.
- **Expired**: Displays *Requested by*, with options to *Approve*, *Reopen*, or *Cancel*.

For more information on how each request status and actions, refer to [Exemption Request Lifecycle](/docs/security-testing-orchestration/exemptions/manage-exemptions#issue-exemption-lifecycle). To learn how to act on these requests, see [Manage Issue Exemptions](/docs/security-testing-orchestration/exemptions/manage-exemptions).

Clicking on an exemption request opens the **Exemption Details** pane, which provides a detailed overview of the request along with available actions (based on your permissions).

<DocImage path={require('./static/exemption-details-side-pane.png')} width="80%" height="80%" title="Click to view full-size image" />

This pane includes the following sections:

- **Issue Details:** Displays the issue ID, description, severity, and reason for exemption.
- **Status and History:** Shows the current status of the exemption (e.g., Pending, Approved, Rejected, Expired) along with a history of events such as when it was requested, approved, or rejected.
- **Occurrences:** Lists all the occurrences of the issue across different scans, and targets where it was detected.
- **Targets Impacted** Displays all targets affected by the issue and where the exemption would be applied if approved.
- **Response Actions:** If you have the [required permissions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions), you will see options to **Approve**, **Reject**, **Cancel** the request, depending on its current state.

Use this view to fully assess the impact of the issue before taking action on the request.

### View exemptions at the Project level

- Make sure you have the [required permissions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) to view the requests.
- In your Harness project, go to the **left navigation** and click **Exemptions**.

This page displays exemption requests from the selected project.

### View exemptions at the Organization level

To view all exemption requests across projects in an organization:

- Make sure you have the [required permissions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) to view the requests.
- In Harness, select the **Organization** from the top breadcrumb.
- In the left navigation, click **Exemptions**.

This page displays exemption requests from all projects within the selected organization that you have access to.

<DocImage path={require('./static/view-exemptions-org.png')} width="100%" height="100%" title="Click to view full-size image" />

### View exemptions at the Account level

To view exemption requests across the entire account:

- Make sure you have the [required permissions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) to view the requests.
- In Harness, select the **Account** from the top breadcrumb.
- In the left navigation, click **Exemptions**.

This page displays exemption requests from all projects across the organizations you have access to.

<DocImage path={require('./static/view-exemptions-account.png')} width="100%" height="100%" title="Click to view full-size image" />
