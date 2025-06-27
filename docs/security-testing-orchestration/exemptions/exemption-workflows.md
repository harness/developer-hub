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

You can create exemption requests either for the entire issue or for specific occurrences within an issue:
- [**Create Exemption Request for an Issue**](#create-exemption-request-for-an-issue): When creating an exemption request for an entire issue, you can set the exemption scope at the [Project](#where-do-you-want-this-issue-to-be-exempted), [Pipeline](#where-do-you-want-this-issue-to-be-exempted), or [Target](#where-do-you-want-this-issue-to-be-exempted) level. Refer to this section for detailed instructions.
- [**Create Exemption Request for Occurrences within Issue**](#create-exemption-request-for-occurrences-within-issue): When creating exemption request for selected occurrences of an issue, the exemption scope is limited to the [Target](#where-do-you-want-this-issue-to-be-exempted) level. Refer to this section for step-by-step guidance.

Reviewers have the flexibility to approve exemption requests either at the requested scope or extend the scope to the **Organization** or **Account** level during the review process. For more details, refer to [Manage Issue Exemptions](/docs/security-testing-orchestration/exemptions/manage-exemptions). To view submitted requests, refer to [View Issue Exemptions](#view-issue-exemptions).

<DocImage path={require('./static/request-exemption-overview.png')} width="80%" height="80%" title="Click to view full-size image" />

:::note
To create an exemption request, you must have the necessary permissions (**Exemptions: View, Create/Edit**) at the Project level, or you can have the **Security Testing Developer** or **Security Testing AppSec** roles assigned. Refer [Permissions required for issue exemptions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) for more details.
:::

## Create Exemption Request for an Issue
To request an exemption for an entire issue, you can set the exemption scope at the [Project](#where-do-you-want-this-issue-to-be-exempted), [Pipeline](#where-do-you-want-this-issue-to-be-exempted), or [Target](#where-do-you-want-this-issue-to-be-exempted) level. To begin, [navigate to the **Vulnerabilities** tab](/docs/security-testing-orchestration/view-security-test-results/view-scan-results#navigate-to-security-test-results).

1. In the **Vulnerabilities** tab, locate and select the specific issue for which you want to request an exemption. This action opens the **Issue Details** pane on the right.

2. In the **Issue Details** pane, click **Request Exemption**.

<DocImage path={require('./static/request-exemption.png')} width="90%" height="90%" title="Click to view full-size image" />

### Submit Exemption Request

Fill out the **Request Exemption for Issue** form with the following fields:
<DocImage path={require('./static/request-exemption-form.png')} width="40%" height="40%" title="Click to view full-size image" />

#### Where do you want this issue to be exempted?

Specify where the exemption should apply:

- **This Target**: Exempts the issue only for the selected target. The issue remains reported in other targets or pipelines.  
- **This Pipeline**: Exempts the issue only in the current pipeline. The issue is still reported in other pipelines or projects.  
- **This Project**: Exempts the issue across all pipelines and targets within this project. Choose carefully, as the exemption applies broadly within the project.  

:::info
- While requests can only be created with the scopes mentioned above, reviewers can approve and apply them at the requested scope or at a higher scope - **Organization** or **Account**.
- As you create exemption request at the issue level, all the future occurrences part of this issues will be automatically exempted. For exemptions at occurrences level, refer to [Create Exemption Request for Occurrences within Issue](#create-exemption-request-for-occurrences-within-issue)
:::
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
Once the exemption request is submitted:
- Inform your **Security Testing AppSec** reviewer.  
- Ensure they have enough context and links to make a well-informed decision.

### Create Exemption Request for Occurrences within Issue

To request an exemption for selected occurrences of an issue, the exemption scope must be set to the [Target](#where-do-you-want-this-issue-to-be-exempted) level. To begin, [navigate to the **Vulnerabilities** tab](/docs/security-testing-orchestration/view-security-test-results/view-scan-results#navigate-to-security-test-results).

:::note
This feature is behind the feature flag `STO_OCCURRENCE_EXEMPTION`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

1. In the **Vulnerabilities** tab, locate and select the specific issue for which you want to request an exemption. This opens the **Issue Details** pane on the right.
2. In the **Issue Details** pane, click the **Occurrences** tab.
3. Select the occurrences for which you want to request the exemption.

<DocImage path={require('./static/request-occurrence-exemption.png')} width="700%" height="70%" title="Click to view full-size image" />

4. Review your selections and click the **Request Occurrence Exemption** button. This opens the **Request Exemption** dialog box.

<DocImage path={require('./static/exemption-at-occurrence-level.png')} width="40%" height="40%" title="Click to view full-size image" />

If you select **all** occurrences of the issue:
    - The option **Exempt all future occurrences discovered for this issue** at the bottom becomes available. Checking this option converts the request from an occurrence-level exemption to an issue-level exemption. This ensures all future occurrences of the issue will automatically be exempted.
    - If any occurrences in the list are already exempted, this option will be disabled to prevent conflicts. To enable it, cancel the existing exemption requests for those occurrences. Once done, select all occurrences again and recreate the exemption request, the option should now be available to check or uncheck.

Follow the steps in the [Submit Exemption Request](#submit-exemption-request) section to complete and submit your request.

## View Issue Exemptions

You can view all exemption requests from the **Exemptions** section in the left navigation. This section is accessible from your **Project**, **Organization**, and **Account** views. Each scope displays exemption requests relevant to that level:

- The **[Project-level Exemptions](#view-exemptions-at-the-project-level)** section shows requests submitted for that specific project.
- The **[Organization-level Exemptions](#view-exemptions-at-the-organization-level)** section shows requests across all projects within the organization.
- The **[Account-level Exemptions](#view-exemptions-at-the-account-level)** section lists requests across projects from multiple organizations under the account.

:::note
Exemption requests list you see at the **Organization** and **Account** views are still subject to your project-level view permissions. Refer to [Permissions for exemption requests](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) to learn more.
:::

In the **Exemptions** sections, the requests are displayed in tabs presenting their status, each request includes:

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

:::tip
For details on exemption request statuses and actions, refer [Exemption Request Lifecycle](/docs/security-testing-orchestration/exemptions/manage-exemptions#issue-exemption-lifecycle). To learn how to manage requests, [refer Manage Issue Exemptions](/docs/security-testing-orchestration/exemptions/manage-exemptions).
:::

Clicking on an exemption request opens the **Exemption Details** pane, which provides a detailed overview of the request along with available actions (based on your permissions).

<DocImage path={require('./static/exemption-details-side-pane.png')} width="80%" height="80%" title="Click to view full-size image" />

This pane includes the following details:

- **Issue Details:** Displays the issue title, severity, description, and scanner details.
- **Exemption Status and History:** Shows the current status of the exemption (e.g., Pending, Approved, Rejected, Expired) along with a history of events such as when it was requested, approved, or rejected, etc.
- **Occurrences:** Lists all the occurrences of the issue across different scans, and targets where it was detected.
- **Targets Impacted** Displays all targets affected by the issue and where the exemption would be applied if approved.
- **Response Actions:** If you have the [required permissions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions), you will see options to **Approve**, **Reject**, **Cancel**, or **Re-open** the request, depending on its current state.

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