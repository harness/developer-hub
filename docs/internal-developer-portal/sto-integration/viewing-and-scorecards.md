---
title: Viewing STO Vulnerabilities in IDP
description: Learn how to view security vulnerabilities from Harness STO, use the security tab, and create Scorecards in the Internal Developer Portal (IDP) to measure the security posture of your software components.
sidebar_position: 3
tags:
  - Harness STO
  - IDP
  - Vulnerability Management
  - Scorecards
  - Security Insights
  - DevSecOps
  - Security Visualization
keywords:
  - view sto vulnerabilities in idp
  - harness idp security tab guide
  - create security scorecards harness
  - sto vulnerability summary card
  - measure software security posture
  - developer portal security dashboard
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocImage from '@site/src/components/DocImage';

# Viewing Vulnerabilities in IDP

After configuring the STO integration, Harness IDP begins to surface security insights directly within the Software Catalog. This allows developers and security teams to view vulnerabilities, track remediation progress, and measure security posture without leaving the developer portal.

In this document, we will explore how Harness Security Testing Orchestration (STO) integrates with the Internal Developer Portal (IDP) to deliver end-to-end visibility of vulnerabilities — from the moment they’re detected in a pipeline, to tracking them over time with scorecards.

#### STO Pipeline Context – The Source of Truth

We have a Security Test Orchestration (STO) pipeline that runs scans using Snyk and Aqua Trivy to detect vulnerabilities in our services. Once the scans are completed, the findings are processed and stored within STO and the pipelinehas some vulnerabilities which will bocome source of truth for us. With the integration of STO with IDP in place, these vulnerability insights we will view directly inside IDP. 

<DocImage path={require('./static/sto-pipeline-vul.png')} />

## Vulnerability Visibility in IDP

### Catalog View – High-Level Visibility

Once STO is integrated with IDP entities, the first place you will notice its impact is in the **Software Catalog**. This view lists all registered services in your ecosystem, but now with **real-time security indicators** right alongside them. Just select Tags as `STO`.

Without opening a single service page, you can immediately spot which components may have critical or high-severity vulnerabilities.

<DocImage path={require('./static/sto-catalog.png')} />


### Entity View – Service-Level Detail

Clicking on a service in the Catalog which has STO integrated, and the entity overview page will show up with a vulnerability  card.

Here, you will see:

* A **summary card** showing vulnerability counts by severity (Critical, High, Medium, Low, Info).
* Percentage of each vulnerabilities.
* Quick-glance totals that make it easy to prioritise which issues need immediate attention

This view bridges the gap between high-level visibility and actionable insight.

<DocImage path={require('./static/sto-vul-summary.png')} />



### Vulnerabilities Tab of Entity View

When it’s time to dig deeper, the **Vulnerabilities tab** provides a complete list of STO scan results for that service.

<DocImage path={require('./static/vulnerabilities.png')} />

From here, you can:

* Filter vulnerabilities by **severity**, **scanner** (e.g., Snyk, Aqua Trivy), or **issue type**
* Click into any vulnerability for **detailed remediation guidance**
<DocImage path={require('./static/sto-vul-details.png')} />

<!-- * Jump straight to the **source code** if it’s a Git-based issue, making fixes faster and more accurate -->

This is where developers get exact, actionable details, and security teams can verify fixes directly against scan data.

#### How to Add or Remove the STO Vulnerabilities Tab

You can customize whether the STO Vulnerabilities tab appears for your catalog entities by modifying the layout configuration in the IDP admin UI.

Navigate to **Layout**, then select the appropriate entity kind (e.g., `component`) and entity type (e.g., `service`). Here, you can add or remove tabs for all services.

To **add** the STO Vulnerabilities tab, include the following in your layout YAML:

```yaml
- name: EntitySecurityIssueContent
  path: /security
  title: Vulnerabilities
  contents:
    - component: EntitySecurityIssueContent
```

To **remove** the tab, simply delete or comment out this section from the layout configuration.

<DocImage path={require('./static/vul-tab.png')} />

The highlighted section in the image above shows the configuration for the Vulnerabilities tab. Once added, developers will see a dedicated tab for STO security findings directly on each service's entity page, making it easy to review and act on vulnerabilities in context.

## Scorecards – Measuring Vulnerability

Harness IDP Scorecards let you track your security posture automatically, using data from STO scans. You can set up custom vulnerability checks—like thresholds on critical vulnerabilities—and see compliance at a glance for all your services.

To configure a scorecard check, select the STO data source, choose the metric (e.g., number of active critical vulnerabilities), set your threshold, and apply severity filters as needed.

<DocImage path={require('./static/sto-scorecard-setup.png')} />

Once configured, the Scorecard tab displays the results for all components, showing how many pass or fail your policy, the current status, and improvement trends over time. This makes it easy to prioritize remediation and track progress across your organization.

<DocImage path={require('./static/scorecard.png')} />

By integrating these automated checks into the Software Catalog, security becomes a visible, shared responsibility across development and platform teams.
