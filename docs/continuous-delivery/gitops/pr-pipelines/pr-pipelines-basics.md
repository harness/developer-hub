---
title: Harness GitOps PR pipelines basics
description: Harness PR Pipelines basics
sidebar_position: 1
---


# Harness GitOps PR Pipelines Basics

Harness GitOps PR (Pull Request) Pipelines provide first-class support for modifying existing GitOps Applications or creating new ones through automation. With PR Pipelines, you can manage Git-based deployments in a structured and auditable way, ensuring your infrastructure and application updates go through version-controlled changes.

---

## What are PR Pipelines?

A PR Pipeline in Harness GitOps is a pipeline designed to:

- Create or update a GitOps Application (or multiple Applications).
- Automatically raise a pull request to the GitOps repository with changes.
- Wait for review and merge of the PR.
- Sync the GitOps Application once the PR is merged into the main branch.

This promotes GitOps best practices such as Git being the single source of truth, approval-based changes, and audit trails through version control.

---

## Creating a PR Pipeline in Harness

To help you get started with creating PR Pipelines in Harness, here are some sample configurations and examples:

- **Basic PR Pipeline Setup:**  
  Learn how to create a PR pipeline from scratch using this [GitOps PR Pipeline Sample](https://github.com/harness-community/Gitops-Samples/tree/main/PR-Pipeline).

- **Adding Failure Strategy to PR Pipeline:**  
  Add failure handling mechanisms to your pipeline using this [PR Pipeline with Failure Strategy Sample](https://github.com/harness-community/Gitops-Samples/tree/main/PR-Pipeline-STO).

- **Adding Notifications to PR Pipeline:**  
  Set up Slack or email notifications using this [PR Pipeline with Notifications Sample](https://github.com/harness-community/Gitops-Samples/tree/main/PR-Pipeline-STO).

- **Integrating Continuous Verification (CV):**  
  Include CV steps in your pipeline using this [PR Pipeline with CV Integration Sample](https://github.com/harness-community/Gitops-Samples/tree/main/PR-Pipeline-CV).