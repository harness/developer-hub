---
title: AI-Powered PR Summaries and Code Review
description: Use Harness AI to generate pull request summaries, analyze code changes, and facilitate code review in Harness Code Repository.
sidebar_label: PR Summaries & Code Review
sidebar_position: 51
keywords:
  - AI PR summary
  - code review
  - pull request summary
  - code change analysis
  - Harness Code Repository
  - impact assessment
tags:
  - harness-ai
  - code-repository
  - code-review
redirect_from:
  - /docs/platform/harness-aida/aida-code-pr
  - /docs/platform/harness-ai/code-pr
---

Harness AI enhances the code review process by automatically generating pull request (PR) summaries and providing intelligent analysis of code changes. These capabilities help teams review code faster, maintain quality, and improve collaboration.

---

## What you will learn in this topic

By the end of this topic, you will be able to:

- [Understand how Harness AI generates PR summaries](#pr-summary-generation).
- [Generate a PR summary in Harness Code Repository](#generate-a-pr-summary).
- [Use AI-assisted code review to analyze changes](#code-review-assistance).
- [Enable PR summaries for your account](#enable-pr-summaries).

---

## Before you begin

Before you generate PR summaries and use AI-assisted code review, ensure you have the following:

- **Harness AI access**: Harness AI must be active for your account. Go to <a href="/docs/platform/harness-ai/overview#enable-ai" target="_blank">Overview of Harness AI</a> to enable Harness AI.
- **Harness Code Repository access**: A repository managed in Harness Code Repository with permission to create and review pull requests. Go to <a href="/docs/code-repository/pull-requests/code-pr" target="_blank">Manage pull requests</a> to work with PRs.

---

## PR summary generation

Harness AI automatically generates comprehensive summaries for pull requests by analyzing the code changes in the PR. This eliminates the need for developers to manually write detailed PR descriptions.

When you create or update a pull request, Harness AI analyzes the diff and generates a summary that includes:

- **Purpose of the changes**: A clear description of what the PR accomplishes and why the changes were made.
- **Issues addressed**: Identification of bugs, feature requests, or technical debt the PR resolves.
- **Potential impacts**: Analysis of how the changes may affect the existing codebase, including dependencies and downstream effects.
- **File-level change summaries**: A breakdown of what changed in each file, so reviewers can navigate large PRs.

### Generate a PR summary

Generate a summary to give reviewers immediate context on a pull request without reading every line of the diff.

1. Create or open a pull request in Harness Code Repository.
2. Click **Generate Summary**, powered by Harness AI.
3. Review the AI-generated description that appears in the PR description field.
4. Edit the summary if needed, then click **Save**.

### Benefits

AI-generated summaries improve review speed and consistency across every pull request.

- **Faster reviews**: Reviewers understand the intent and scope of changes without reading every line of code.
- **Consistent documentation**: Every PR gets a well-structured description, which improves traceability and audit trails.
- **Better communication**: Clear summaries reduce back-and-forth between authors and reviewers.
- **Improved code quality**: Better understanding of changes helps teams catch issues earlier in the review process.

---

## Code review assistance

Harness AI facilitates code review by providing intelligent analysis of code changes within pull requests. Reviewers use AI to understand complex changes, identify potential issues, and make informed decisions.

Key code review capabilities include:

- **Code change analysis**: AI analyzes the semantic meaning of code changes, not just the diff, to explain what changed and why it matters.
- **File change summaries**: For each modified file, AI generates a concise summary of what changed and its purpose.
- **Impact assessment**: AI identifies potential side effects, breaking changes, or areas that may need additional testing.

These capabilities map directly into your development workflow, so teams maintain high code quality while accelerating the review process.

---

## Enable PR summaries

Enable Harness AI to make PR summaries and code review assistance available across your repositories. PR summary generation is available for all repositories managed in Harness Code Repository.

To use AI-powered PR summaries, go to <a href="/docs/platform/harness-ai/overview#enable-ai" target="_blank">Overview of Harness AI</a> to enable Harness AI in your account settings.

---

## Next steps

Use AI-powered PR summaries and code review to accelerate reviews while keeping code quality high.

- **Harness AI**: Go to <a href="/docs/platform/harness-ai/overview" target="_blank">Overview of Harness AI</a> to review available AI features.
- **Pull requests**: Go to <a href="/docs/code-repository/pull-requests/code-pr" target="_blank">Manage pull requests</a> to create, review, and merge PRs in Harness Code Repository.
- **AI agents in PRs**: Go to <a href="/docs/code-repository/pull-requests/ai-agents" target="_blank">AI agents in pull requests</a> to automate review workflows.