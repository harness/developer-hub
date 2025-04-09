---
title: Issue Exemption Workflow
description: Overview of issue exemption process in Harness STO.
sidebar_label: Issue exemption workflow
sidebar_position: 59
redirect_from: 
---

Issue Exemptions in STO provide developers and security teams a controlled method to handle security vulnerabilities detected in software delivery pipelines. When a security scan identifies a vulnerability that violates your pipeline's [OPA policies](/docs/security-testing-orchestration/policies/enforce-opa-policies), the pipeline will fail to prevent vulnerabilities from reaching production. In cases where immediate remediation isn't feasible or necessary, developers can [submit exemption requests](/docs/security-testing-orchestration/exemptions/exemption-workflows) for review. Exemptions can be applied at the **Project**, **Organization**, or **Account** level.

<DocImage path={require('./static/exemption-pipeline-status.png')} width="100%" height="100%" title="Click to view full size image" />

The issue exemption workflow typically includes two stages:

- **Requesting an Exemption**: Developers initiate exemption requests by providing relevant details, including justification and intended exemption duration. Refer to [Request Issue Exemption](/docs/security-testing-orchestration/exemptions/exemption-workflows).
- **Managing Exemptions(Approve/Reject)**: Security teams review exemption requests and choose to approve or reject. Refer to [Manage Issue Exemption](/docs/security-testing-orchestration/exemptions/manage-exemptions).

<DocImage path={require('./static/exemption-workflow.png')} width="70%" height="70%" title="Click to view full size image" />

:::note 
[Security Testing Developers](/docs/security-testing-orchestration/get-started/onboarding-guide#add-security-testing-roles) and [Security Testing SecOps](/docs/security-testing-orchestration/get-started/onboarding-guide#add-security-testing-roles) users can request exemptions, but only **Security Testing SecOps** users can approve them. Refer to [Permissions required for issue exemptions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow#required-permissions-for-issue-exemptions) for more details.
::: 

## When exemptions are useful

Here are some reasons wny your organization might want to exempt an issue:

- Your organization is aware of this issue and is actively working on a fix. In the meantime, they want to exempt it from blocking the pipeline.
- The issue is in compliance with your organization's acceptable use policies.
- The security risk is low and remediation would require too much effort or expense.
- The scanner detects an issue but it is, in fact, a false positive.
- You need to exempt an issue so you can deploy a hotfix. In this case, you can request a temporary exemption that expires within your organization's SLA for fixing security issues.
- There are currently no known fixes or remediation steps available for the detected vulnerability. You might want to enable [Harness AI Development Assistant (AIDA™)](/docs/security-testing-orchestration/remediations/ai-based-remediations) to help you remediate your issues using AI.


import request_exemption from '../use-sto/static/request-exemption.png'
import open_exemption_details from '../use-sto/static/open-exemption-details.png'
import baseline_not_defined from '../use-sto/static/exemption-workflows-no-baseline-defined.png'

## Required permissions for Issue Exemptions

The table below outlines the permissions required at each scope for performing various exemption-related actions. These permissions are part of the **Exemptions** category in the STO role permissions.

To configure these permissions:
1. Navigate to the **Project**, **Organization**, or **Account** settings in Harness.
2. Select **Roles**, then choose or create a role.
3. In the **Security Tests** section, look for the **Exemptions** category.
4. Assign the required permissions: `View`, `Create/Edit`, or `Approve/Reject`.

<DocImage path={require('./static/sto-developer-role-rbac.png')} width="60%" height="60%" title="Click to view full size image" />

### Exemption permissions matrix

| Action                     | Permission      | Project | Organization | Account | Notes                                                                                  |
|-----------------------------|-----------------|---------|--------------|---------|----------------------------------------------------------------------------------------|
| Create an Exemption Request         | Create/Edit     | ✅      | ❌           | ❌      | Can only be created at the project level.                                              |
| View Exemptions Requests             | View            | ✅      | ❌           | ❌      | Viewing depends on project-level View access.                                          |
| Approve or Reject Exemption Requests | View            | ✅      | ❌           | ❌      | Required to access exemption requests.                                                 |
|                             | Approve/Reject  | ✅      | ✅           | ✅      | Allows approving at project, org, or account level. Applies to all the projects and orgs even without direct access.         |
| Re-open an Exemption Request        | View, Create/Edit | ✅    | ❌           | ❌      | Only possible for project-level requests. Cannot reopen org/account scoped exemptions. |

:::warning
Assign `Approve/Reject` permissions carefully, especially at the **Organization** or **Account** level — since actions apply to all underlying scopes, even those the user may not directly manage.
:::

- **View** permissions at Organization or Account level are not functional for viewing exemptions.To view exemption requests across an entire organization or account, the user must have `View` permission on each individual project.
- **Create/Edit** is relevant only at the **Project** level. It is used for creating, cancelling, or reopening exemption requests.
- If an exemption with a scope of **Organization** or **Account** is **rejected or expired**, it **cannot be reopened**. It must be directly re-approved from the **Rejected** or **Expired** tab.
- **Approve/Reject** permissions are required at the level where the exemption should be applied:
  - **Project-level**: Can approve only for that project.
  - **Organization-level**: Can approve for all projects in the org, even without direct access.
  - **Account-level**: Can approve for all organizations and projects in the account, even without access to each.

:::tip
**Use "All Resources Including Child Scopes"**  
  Instead of assigning View permission to each project manually, assign the role with a [resource group that includes all resources and child scopes](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/). This automatically provides access to all projects and organizations under the account for exemption viewing.
:::

#### Default Roles and Permissions

- **Security Testing Developer**: Includes `View` and `Create/Edit` at the Project level. Use this role for developers who need to raise exemption requests.
- **Security Testing SecOps**: Includes `View`, `Create/Edit`, and `Approve/Reject` at all scopes. Use this role for users who review, approve, or reject exemption requests across projects, orgs, or the full account.

<!-- ## Important notes for exemptions in STO

This topic assumes that you have the following:

* An STO pipeline as described in [Set up Harness for STO](../get-started/onboarding-guide.md).
* The scan step has failure criteria specified.

  STO supports two methods for specifying failure criteria: 

   - [Fail on Severity](/docs/security-testing-orchestration/get-started/key-concepts/fail-pipelines-by-severity)  Every scan step has a Fail on Severity setting that fails the step if the scan detects any issues with the specified severity or higher. 

   - [OPA policies](/docs/security-testing-orchestration/policies/create-opa-policies) You can use Harness Policy as Code to write and enforce policies based on severity, reference ID, title, CVE age, STO output variables, and number of occurrences.

* At least one successful build with a set of detected security issues. 
* Security Testing Developer or [Security Testing SecOps](/docs/security-testing-orchestration/get-started/onboarding-guide#add-security-testing-roles)  user permissions are required to [request exemptions](#request-an-sto-exemption).
* Only Security Testing SecOps users can [review, approve, reject,](#review-an-sto-exemption) and [update](#good-practice-review-and-update-sto-exemptions-periodically) exemptions.   -->
