---
title: "STO Overview Page"
description: The STO Overview page enables you to see all detected issues in your target baselines.
sidebar_position: 30
sidebar_label: "STO overview page"
redirect_from: 
  - /docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/sto-overview
  - /docs/security-testing-orchestration/dashboards/sto-overview
helpdocs_topic_id: 2ap1uol6ti
helpdocs_category_id: utstv3qzqt
helpdocs_is_private: false
helpdocs_is_published: true
---

The **Overview** page in Harness Security Testing Orchestration (STO) provides a quick, at-a-glance summary of the security test activities in your project. This page is useful for both **developers** and **security engineers** to monitor target baselines, identify failing builds, and track active builds in progress. The **Overview** page consolidates:

* **[Most Recent Baseline Scan Results](#target-baselines)**
* **[Latest Failed Pipeline Executions](#failed-builds)**
* **[Currently Active Builds](#active-builds)**

<DocImage path={require('/docs/security-testing-orchestration/view-security-test-results/static/sto-overview-page.png')} width="90%" height="90%" title="STO Overview page" />


### Target Baselines

**Target Baselines** shows the most recent scan results for each baseline target in the project.

<details>
<summary>Why you should define a baseline for every target</summary>

import StoWhyDefineBaselines from '/docs/security-testing-orchestration/get-started/shared/why-define-baselines.md';

<StoWhyDefineBaselines />

</details>


* Each baseline represents a specific target (such as a code repo, container image, or service) configured for scanning.
* The card for each baseline displays:

  * **Severity counts** (Critical, High, Medium, Low).
  * **Execution details** (who triggered the scan, how it was triggered — scheduled or manual, and when it was last run).
  * **Status** (success, failure, ignored, etc.).

This section helps you quickly understand the overall security posture of your targets. For a complete list of all issues found across target baselines, see the [**Issues page**](https://developer.harness.io/docs/security-testing-orchestration/view-security-test-results/issues).

:::info

 To see detected issues in a non-baseline variant, such as a feature or developer branch, go to a pipeline execution where the variant was scanned and then go to [**Vulnerabilities tab**](/docs/security-testing-orchestration/view-security-test-results/view-scan-results).

:::

### Failed Builds

**Failed Builds** shows the most recent failed builds that included scans of target baselines.
- Each card shows the pipeline name, branch, commit, who triggered the build, and when it ran.

### Active Builds

**Active Builds** shows the pipelines currently in progress that include scans of target baselines.

* Each active build card includes:

  * **Pipeline name**.
  * **Trigger details** (who triggered, when, and how).
  * **Current status** (e.g., *Waiting*, *Running*).
  * **Elapsed time** since the build started.

This section helps teams track ongoing activity and identify builds that are waiting or running.