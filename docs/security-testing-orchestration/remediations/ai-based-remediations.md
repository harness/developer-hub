---
title: Fix security issues using Harness AI
description: Enhanced remediation using Harness AI.
sidebar_label: Use AI to fix security issues
sidebar_position: 10
redirect_from: 
  - /docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/ai-based-remediations
---


import Intro from '/docs/security-testing-orchestration/use-sto/shared/sto-aida-overview-partial.md';
import Notes from '/docs/security-testing-orchestration/use-sto/shared/sto-aida-notes-partial.md';
import Workflow from '/docs/security-testing-orchestration/use-sto/shared/sto-aida-workflow-partial.md';


<Intro />

## Important notes for Harness AI remediations in STO


<Notes />

## View AI remediations for security issues
Harness AI analyzes security issues and provides AI remediation within the security details for each specific issue. This includes an analysis of the issue, remediation concepts, and step-by-step instructions to fix them, along with example code snippets. Additionally, AI remediation details can be found for each occurrence of an issue. You also have the option to make a Code Suggestion or create a Pull Request to apply the suggested remediation.

Moreover, you can [enhance the AI remediation](#edit-to-enhance-the-ai-remediations) by editing its content to better suit your needs.

<DocImage path={require('./static/ai-remediation-for-a-issue.png')} width="70%" height="70%" title="Click to view full size image" />

## Make Code Suggestion from STO

In the AI Remediation details of a selected issue, STO provides the option to make code suggestions for applying the recommended fixes. To use this feature, simply click on **Suggest Fix**. Once you have created a code suggestion, you can view it by clicking on the **View Fix** button. Make sure to read the [configuration details](#configuration-for-code-suggestions-and-create-pull-request-features) to understand the requirements and what is supported for this feature.

Please note that the **Suggest Fix** option will only be available if there is a match between the file where the issue was found and the files being modified in the pull request. This ensures that the suggested changes are directly committed in the existing PR without the need for a separate PR.

## Create Pull Request from STO

In the AI Remediation details of a selected issue, STO provides the option to create a Pull Request to apply the recommended fixes. To use this feature, click on **Create Pull Request**, STO will create a Pull Request with the recommended fixes. You can view the PR by clicking on the **View Fix** button. Make sure to read the [configuration details](#configuration-for-code-suggestions-and-create-pull-request-features) to understand the requirements and what is supported for this feature.

The **Create Pull Request** option is available for both branch scanning and PR scanning. However, in the case of PR scanning, this option will only appear if the remediation suggestions apply to code files that were not modified in the PR. These suggestions may address new or existing vulnerabilities identified in the base branch.

## Edit to enhance the AI remediations

<Workflow />

## Configuration for Code Suggestions and Create Pull Request features
These features are currently supported for Harness Code Repository and GitHub.
- **Harness Code Repository**: No configuration is needed; these features are enabled by default.
- **GitHub**: To enable these features, you’ll need to configure your GitHub connector. Follow the steps below to set it up.

To enable code suggestions and create pull requests in GitHub from STO, you need to configure the GitHub connector within STO’s Default Settings. Go to **Account Settings**, select **Default Settings**, and then choose the **Security Testing Orchestration** tile. Locate the **GitHub Connector for Pull Requests** field and set up your GitHub connector. Ensure your GitHub token includes the following permissions:
- `repo` - Full control of private repositories
- `write:org` - Read and write org and team membership, read and write org projects
- `write:discussion` - Read and write team discussions
- `project` - Full control of projects

You can also configure these settings at the organization or project level, based on your requirements.

Currently, this feature is supported for scan results from all [Secret detection](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners) and [SAST scanners](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners) including both built-in open-source and commercial scanners. The feature will only appear if the scanner provides the exact vulnerable code snippet. If the code snippet is not provided, you can still use the feature by manually adding context on the vulnerable code. For details on how to do this, refer to [Edit to enhance AI remediations](/docs/security-testing-orchestration/remediations/ai-based-remediations#edit-to-enhance-the-ai-remediations).