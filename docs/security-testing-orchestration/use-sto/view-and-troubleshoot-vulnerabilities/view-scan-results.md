---
title: Discover and remediate issues in Security Tests
description: View, navigate, discover, and investigate detected issues from an individual scan 
sidebar_position: 10
sidebar_label: Discover and remediate detected issues
---

Every STO pipeline execution includes a **Security Tests** tab that shows the detected issues for that execution. This is the primary interface for navigating, analyzing, and remediating detected issues. 

![](./static/security-tests-tab.png)

In the **Security Testing Orchestration** left-hand menu, go to **Executions**. Then go to the execution and select **Security Tests**. 

The following steps describe the general workflow:

1. **Security Execution** filters are useful for complex pipelines that run multiple scans. You can use these filters to focus only on issues for specific targets, target types, stages, steps, and scanners. If you're only interested in DAST results, for example, you can hide all other issues. Focusing on a specific target can also make it easier to compare results with previous scans of that target. 

2. Select the [severity](/docs/security-testing-orchestration/get-started/key-concepts/severities) tiles to filter the lists by severity. You can also show or hide issues with exemptions.  

3. Drill down to the relevant issues list to view the issues found in the scan:

    - **Only in current scan** New issues not found in any previous scan.

    - **Common to <_target_>:<_variant_>** Issues also found in the last scan of the specified variant.

    - **Common to previous scan** 
      - Issues also found in the last scan (if the scanned target has no baseline), OR
      - Issues also found in the last scan of the baseline (if the scanned variant is the baseline).

    - **Common to previous / baseline scan** Issues also found in both the last scan of the specified variant AND the last scan of the baseline. 

   :::note

   For best results in STO, every target should have a baseline defined. For more information, go to [Targets, baselines, and variants in STO](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines).

   :::

3. To investigate an issue in detail, click the issue in the list to open **Issue Details** (right). 

4. The **Issue Details** pane includes known details and remediation steps for the detected issue. Note that this pane shows details for all occurrences of the detected issue, so scan down to ensure that you see all occurrences. 

   You can also do the following:

   - Request an [exemption](/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/exemption-workflows) so that pipeline executions can proceed even if the issue is detected.

   - Fix the issue using [AI-enhanced remediation steps](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/ai-based-remediations) (currently in beta).