---
title: Component Violations
sidebar_label: Component violations
description: View Component Violations for Artifacts and Code Repositories
sidebar_position: 4
---

Compliance Violations Dashboard for Artifacts and Repositories displays the number of pipelines flagged for SBOM policy violations. This dashboard eliminates the need to manually search for components across repositories and projects, providing a single point of access, especially helpful during zero-day attacks.


Follow the steps below to view compliance violations for artifacts. You can follow the same process to view violations for code repositories.

- **Total Pipeline Executions:** Cumulative count of all pipeline executions that include the SBOM Policy Enforcement step for artifacts.

- **Pipeline Executions with Component Violations:** Count of pipeline executions that resulted in SBOM policy violations for artifacts.

- **Total Artifacts Evaluated:** Unique count of artifacts that underwent the SBOM orchestration step. Multiple branches of the same repository are counted as one.

- **Violated Artifacts:** Total number of artifacts that violated SBOM policies.

<DocImage path={require('./static/component-violations.png')} width="80%" height="80%" title="Click to view full size image" /> 


You can apply filters to enable efficient querying and navigation across the following key dimensions:

- **Organization:** Filter data by the selected Harness Organization.

- **Project:** Limit results to a specific project within the organization.

- **Pipeline Name:** Filter issues based on the pipeline name that executed the SBOM Policy Enforcement step.

- **Artifact Name:** Filter results by artifact name.

- **Date:** Filter by predefined presets (e.g., last 7 days) or a custom date range.

<DocImage path={require('./static/cv-violations.png')} width="80%" height="80%" title="Click to view full size image" /> 


### Pipeline Execution Summary

A detailed table lists the pipelines that violated the SBOM Allow/Deny List policy.

- **Pipeline Identifier:** Unique name/ID of the pipeline.

- **Org Identifier:** The organization the pipeline belongs to.

- **Project Identifier:** The project the pipeline resides in.

- **Executions With Violations:** Number of executions that failed SBOM policy checks. Clicking this opens a pop-up table with the following columns:

   - **Artifact Name:** Name of the Artifact.

   - **Tag/Branch:** Branch or tag associated with the artifact.

   - **Pipeline Execution ID:** Unique ID of the pipeline execution. Clicking this redirects you to the pipeline execution tab.

   - **Last Updated At Date:** Date when the pipeline execution was last updated with violation information.

- Executions Without Violations: Number of executions that passed the SBOM policy checks.

<DocImage path={require('./static/cv-pipeline-summary.png')} width="80%" height="80%" title="Click to view full size image" /> 