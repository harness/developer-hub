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

In the AI Remediation details of a selected issue, STO provides the option to make code suggestions for applying the recommended fixes. To use this feature, simply click on **Suggest Fix**. Once you have created a code suggestion, you can view it by clicking on the **View Fix** button. This feature is currently supported for Harness Code Repository and GitHub.

Please note that the **Suggest Fix** option will only be available if there is a match between the file where the issue was found and the files being modified in the pull request. This ensures that the suggested changes directly relate to the identified issue.

## Create Pull Request from STO

In the AI Remediation details of a selected issue, STO provides the option to create a Pull Request to apply the recommended fixes. To use this feature, click on **Create Pull Request**. Once you have created a code suggestion, you can view it by clicking on the **View Fix** button. This feature is currently supported for Harness Code Repository and GitHub.

The **Create Pull Request** option is available for both branch scanning and PR scanning. However, in the case of PR scanning, this option will only appear if the remediation suggestions apply to code files that were not modified in the PR.

## Edit to enhance the AI remediations

<Workflow />