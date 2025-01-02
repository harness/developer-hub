---
title: Manage Compliance Posture
sidebar_label: Manage compliance posture
description: Assess and understand the risk posture of your software supply chain
sidebar_position: 1
---

The Compliance section within the SCS module serves as a hub for assessing and understanding the risk posture of your entire supply chain. This section is indispensable for GRC (Governance, Risk, and Compliance) and security teams as it provides detailed evaluation results after applying all relevant rules to various entity types within your supply chain. You can access a thorough summary of these evaluations, including the specific rules applied, their execution statuses, and the entities impacted by each rule.


<DocImage path={require('./static/rac-overview.png')} width="100%" height="100%" title="Click to view full size image" />


To learn more about the supported standards and the rules applied to entities, please refer to the documentation on [Standards and Rule Definitions](./manage-compliance-posture).

:::note
Currently Harness supports Code Repositories, and CI/CD. Please refer to the [Use SCS](../get-started/onboarding-guide#use-scs) section in the onboarding document to see the full list of supported integrations for each feature. In the near future, Harness will add support for other entities and integrations.
:::

## Compliance Overview

The Summery tab provides comprehensive details of evaluations conducted across all entity types of the software supply chain. This tab offers details about:

<DocImage path={require('./static/compliance-summery-tab.png')} width="100%" height="100%" title="Click to view full size image" />

* **Evaluation Breakdown**: A summary of rules passing versus failing. 
* **Failure by Severity**: Displays the number of failures categorized by severity levels: critical, high, medium, and low. 
* **Evaluation Trend**: This graph presents the trend of evaluations over time, showing the number of rules passing and failing with respect to the date. It helps users visualize the improvement or decline in the security posture.
* **Rules that Failed the Most Often**: Highlights the rules with the highest number of evaluation failures. 
* **Evaluation by Type**: Presents the number of failures in each category, which includes code repositories, artifacts, and CI/CD tools. 

Additionally, users can apply filters based on standards to view evaluations and details specific to each standard. The history of the data can be viewed for the last 24 hours, 7 days, and 30 days.


## View Rule Evaluations

The Rules tab in the “Compliance” section provides a detailed view of all the rules and their complete execution details applied across all the entities configured. For each rule, along with its name and description, the view provides the following information:

<DocImage path={require('./static/compliance-evaluations.png')} width="100%" height="100%" title="Click to view full size image" />

* **Evaluations**: Displays the total number of evaluations occurred, indicating whether they passed or failed, and the total number of entity types to which the rule is applied (e.g., code repositories, artifacts, CI/CD tools).
* **Severity**: Presents the severity of each rule, categorized as critical, high, medium, or low.
* **Standard:** Indicates the standard to which the rule belongs and the rule's ID according to the official ID convention.

Users can view rules filtered by standards and apply an additional filter specific to severity. Also, users can perform searches within the filtered results. The history of the data can be viewed for the last 24 hours, 7 days, and 30 days.


## View Impacted Entities

Upon clicking a rule in the Rules tab, you will see a list of all the entities impacted by the evaluation. This page provides information about the rule, its description, evaluation history and general remediation steps to address any failures.

<DocImage path={require('./static/compliance-rules-impacted-entity.png')} width="100%" height="100%" title="Click to view full size image" />


Clicking on an item will bring up the latest evaluation details. Alternatively, you can click on an icon from the evaluation history to view specific evaluation details. The information includes the time of evaluation, the reason for failure (if failed), and the remediation information to address the issues.

<DocImage path={require('./static/compliance-rules-impacted-entity-details.png')} width="100%" height="100%" title="Click to view full size image" />


