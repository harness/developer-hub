---
title: CI/CD security posture management
description: Risk and compliance posture of your CI/CD
sidebar_position: 21
---

# CI/CD Security Posture Management with Harness SCS

Understanding the risk posture of your CI/CD pipelines is essential for maintaining a secure software delivery process and protecting the overall supply chain. Harness SCS's CI/CD SPM offers a comprehensive view of the potential risks associated with your pipelines. It identifies risk and compliance issues stemming from pipeline configurations, using industry-standard benchmarks like the [OWASP Top 10 CI/CD Security Risks](https://owasp.org/www-project-top-10-ci-cd-security-risks/) and Harness's own security standards.

<DocImage path={require('./static/cicdspm-overview.png')} width="100%" height="100%" title="Click to view full size image" />

:::info
To onboard your CI/CD pipelines, refer to the [Get Started](./get-started) guide.
:::

Navigate to the **CI/CD** section in Harness SCS to view a complete list of onboarded pipelines. This page displays all pipelines across integrations, providing an overview of their risk and compliance status, both collectively and individually.

<DocImage path={require('./static/cicdspm-home.png')} width="100%" height="100%" title="Click to view full size image" />

By selecting a pipeline from the **CI/CD** page, you can view all the details organized into different tabs.

## Overview Tab

The overview page provides a comprehensive summary of a specific pipeline’s risk posture. This page compiles all the crucial details in one place, offering a clear and concise view.

### What is an Evaluation?

Before diving into the details, it's essential to understand what an "evaluation" means in this context. An evaluation refers to applying specific compliance rules to the repository and obtaining the results of these checks. Each evaluation assesses the repository against these predefined rules and provides a pass or fail status.


The page offers detailed information about:

* **General Information:** including the name of the pipeline, and the latest evaluation timestamp
* **Evaluation Breakdown:** A summary of rules passing versus failing
* **Risk & Compliance Issues:** Breakdown of risk and compliance issues into critical, high, medium and low.
* **Evaluation Trend:** This graph presents the trend of evaluations over time, showing the number of rules passing and failing with respect to the date. This helps users visualize the improvement or decline in the security posture of their repositories.

<DocImage path={require('./static/cicdspm-overview-tab.png')} width="100%" height="100%" title="Click to view full size image" />

## Risk and Compliance Tab

In this tab, you will find a list of rules applied to the pipeline, each accompanied by its name and the compliance standard to which it belongs. The latest status indicates whether the rule has passed or failed in the most recent evaluation, along with the date and time of the last evaluation. The evaluation history column shows the rule's status (passed or failed) over the last 7 evaluations, providing a clear view of its compliance trend.

Filters can help you narrow down the rules based on severity, including low, medium, high, and critical levels. You can filter the rules by their evaluation status, such as passed, failed, or all. 

<DocImage path={require('./static/cicdspm-randc-tab.png')} width="100%" height="100%" title="Click to view full size image" />


By clicking on a specific evaluation status, you can access detailed information about the rule, including the reason for its failure and general remediation steps to help address the issues identified. Importantly, you can find the failed occurrences list with evidence snippets and the file location.

<DocImage path={require('./static/cicdspm-rac-details.png')} width="100%" height="100%" title="Click to view full size image" />

## Plugins Tab​
The Plugin tab provides a list of all plugins used in the pipeline. The tab name may vary based on the integration type. For instance, with GitHub, it will be labeled Actions.

<DocImage path={require('./static/cicdspm-plugins-tab.png')} width="100%" height="100%" title="Click to view full size image" />

For a complete overview of your supply chain's compliance posture, refer [Manage Compliance Posture](./manage-risk-and-compliance/manage-compliance-posture) documentation.
