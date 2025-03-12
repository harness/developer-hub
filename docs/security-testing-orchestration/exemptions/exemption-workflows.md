---
title: Request an issue exemption
description: Steps to submit an issue exemption request
sidebar_label: Request issue exemption
sidebar_position: 60
redirect_from: 
  - docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/exemption-workflows
---

import request_exemption from '../use-sto/static/request-exemption.png'
import open_exemption_details from '../use-sto/static/open-exemption-details.png'
import baseline_not_defined from '../use-sto/static/exemption-workflows-no-baseline-defined.png'

When a security scan detects issues of varying severities and an enforced OPA policy blocks them, it can cause pipeline execution to fail. To prevent the pipeline from being blocked due to specific issues, you can request an exemption. Once approved, these exemptions are applied in subsequent scans, allowing the pipeline to proceed without interruption.

:::note
To raise an issue exemption, you must have **Security Testing Developer** or **Security Testing SecOps** user permissions.
:::

Follow these steps to request an exemption for a security issue:

### Step 1: Access the build executions

1. From the **left navigation**, select **Executions**.
2. Locate and click on the build for which you want to request an exemption.

### Step 2: Navigate to the issue for exemption

1. Within the build execution details, select the **Security Tests** tab.
2. Find the issue you want to exempt and click on it. The **Issue Details** pane will open on the right side of the screen.

### Step 3: Request the exemption

In the **Issue Details** pane, click on the **Request Exemption** button.  
<DocImage path={require('./static/request-exemption.png')} width="60%" height="60%" title="Click to view full size image" />

A form will open titled **Request Exemption for Issue**. Complete the following fields:
<DocImage path={require('./static/request-exemption-form.png')} width="80%" height="80%" title="Click to view full size image" />

#### Where do you want this issue to be exempted?
You can select one of the following options to specify the scope of the exemption:
   - **This Target** – This exemption applies only to the specific target, meaning that the issue will be ignored across all pipelines using that target within the project. However, if the issue is detected in other targets, it will still be reported.
   - **This Pipeline** – Exempts the issue only for this specific pipeline. Future scans in other pipelines or projects will still report the issue.  
   - **This Project** – Exempts the issue across all pipelines and targets within the project. Use this option only if you are certain that the issue should be ignored across the entire project.  

#### For how long?
   - Choose the shortest practical time window for the exemption to limit the exposure to the identified risk.

#### Reason
- Select one of the following reasons for the exemption and provide relevant details:

   **Compensating controls** 
   Your organization has infrastructure and policies in place to mitigate the security risks of this vulnerability. For example, suppose a scan detects a vulnerability with a specific service. This vulnerability might be mitigated because:
   - The service is behind a firewall that requires authorized access, or
   - The network may have host- or network-based intrusion prevention systems in place.
   
   **Acceptable use**
   The scanner identified this practice as a vulnerability, but this practice is acceptable based on your organization's security guidelines. For example, anonymous FTP access may be a deliberate practice and not a vulnerability.
   
   **Acceptable risk**
   The security risk of this vulnerability is low and remediation would require too much effort or expense:
   - Applying a specific patch for a vulnerability might prevent a service from functioning.
   - The vulnerability is minimal and the remediation would require too much time, money, or resources.

   **False positives**
   The scanner identifies this as a vulnerability but it is, in fact, a false positive. Requesting an exemption based on approval from a Qualified Security Assessor (QSA) or Approved Scanning Vendor (ASV).

   **Fix unavailable**
   There are currently no known fixes or remediation steps available for the detected vulnerability.

   **Other**
   If none of the above reasons fit, provide a detailed technical explanation of why the issue should be exempted.

#### Further Description
   Include any additional context to help the reviewer understand why this exemption is safe. This could include technical details, potential mitigations, or any other relevant information.

#### URL Reference  
   Paste any relevant URL (e.g., to a documentation page or a GitHub repository) that provides additional context or information about the issue. For example, if the issue is already addressed in your code, link to the relevant section.


After filling out the form, click **Create Request** to submit the exemption request.

### Step 4: Notify the Security Testing SecOps reviewer

After creating the exemption request:

1. Manually notify your **Security Testing SecOps** reviewer with the details of the exemption request.
2. Provide any necessary context and ensure the reviewer has all the information to assess the exemption.
