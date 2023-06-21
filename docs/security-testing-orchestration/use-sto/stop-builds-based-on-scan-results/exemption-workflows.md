---
title: Exemptions ("ignore rules") for specific issues
description: You can specify exemptions (ignore rules) for specific security issues. An ignore rule allows pipeline builds to proceed even if a security scan detects an issue. 
sidebar_position: 60
---

The `fail_on_severity` setting causes a pipeline build to fail if a Security Scan step detects one or more issues with the specified severity (Critical, High, Medium, etc.). Your organization can create exemptions ("Ignore rules") for specific issues to override this behavior. If an exemption is approved, a build can proceed even if a scan detects that issue.  

:::note 
Developers and SecOps users can request exemptions, but only SecOps users can approve them.
::: 

## Before You Begin

This topic assumes that you have the following:

* An STO pipeline as described in [Set up Harness for STO](../../onboard-sto/set-up-harness-for-sto.md).
* The pipeline has a Security scan step with a configured `fail_on_severity` setting.
* At least one successful build with a set of detected security issues.  

## Request an exemption (_Developers or SecOps users_) 
     
1. Go to the Security Tests page for the build: In the Pipeline studio, click **Execution History** (top right) or **Pipeline Executions** (left menu). Then go to a successful build.  

2. Click **Security Tests** and then do the following:

   1. Select the issue you want to exempt.  The **Issue Details** pane opens on the right. 
   2. Click **Request Exemption**.

      ![](../static/request-exemption.png)
   
   3. In **Request Exemption for Issue**, specify:
      1. **Where do you want this issue to be Exempted?** 
      2. **For how long?** 
      3. **Reason this issue should be exempted** — Select one of the following reasons and provide any additional information for the SecOps approver:
         
         * **Compensating controls** — Your organization has infrastructure and policies in place to mitigate the security risks of this vulnerability. 

           For example, suppose a scan detects a vulnerability with a specific service. This vulnerability might be mitigated because:

           - The service is behind a firewall that requires authorized access, or

           - The network may have host- or network-based intrusion prevention systems in place.

         * **Acceptable use** — The scanner identified this practice as a vulnerability, but this practice is acceptable based on your organization's security guidelines. For example, anonymous FTP access may be a deliberate practice and not a vulnerability.

         * **Acceptable risk** — The security risk of this vulnerability is low and remediation would require too much effort or expense: 

           - Applying a specific patch for a vulnerability might prevent a service from functioning. 

           - The vulnerability is minimal and the remediation would require too much time, money, or resources.

         * **False positives** — The scanner identifies this as a vulnerability but it is, in fact, a false positive. Requesting an exemption based on approval from a Qualified Security Assessor (QSA) or Approved Scanning Vendor (ASV). 

         * **Fix unavailable** — There are currently no known fixes or remediation steps available for the detected vulnerability. 

         * **Other**

      4. **URL Reference** — Paste the link you copied in the previous request, or add a different link that provides information about the specific issue you want the pipeline to ignore. If your repo already addresses the issue, for example, you can include a link to the relevant code. 

   5. Click **Create Request**. 
  
      ![](../static/exemption-click-create-request.png)
     
3. Send a notification of your exemption request — via email, Slack, Jira, etc. — to your SecOps reviewer. Your notification should include the URL to the Security Tests page with the relevant issue selected.


## Review, Approve, and Reject Exemptions (_SecOps users only_)

An exemption, if approved, overrides the default behavior for running a pipeline build:

* If a pipeline includes a Security Tests step, the step scans the specified object and compiles a list of detected issues.
* Each issue has a specified severity: Critical, Major, Minor, etc.
* Each security step should have a `fail_on_severity` setting. If the step detects any issue with the specified severity or higher, the build fails. 
* Each exemption applies to one specific issue. The rule allows the pipeline to proceed even if the scan detects that issue.    

### Review an exemption

1. You should receive a notification from a developer that includes a URL to the relevant issue. Go to the URL provided.
 
   The notification URL should point to a Security Tests page in Harness with the issue selected in the **Issue Details** pane on the right. If the relevant issue isn't visible, notify the developer. 

2. Review the exemption request. The **Issue Details** pane includes a high-level summary of the issue, links to relevant documentation, and a list of all locations in the scanned object where the issue was detected. 

 :::note 
 The **Issue Details** pane is comprehensive, but might not include all the information you need. You might want to research the issue further before you approve the request.
 :::

  ![](../static/exemption-issue-details.png)  
          
### Review all exemptions

You can review all exemptions in the current project in the **Security Review** page. 

1. Click **Security Tests** (left menu) and then **Exemptions** (second-from-left menu).

2. In **Exemptions**, click the Approve, Reject, or Delete buttons for individual rules as needed.

   ![](../static/exemption-security-review.png)
