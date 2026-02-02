---
title: AI-Powered PR Summaries and Code Review
description: Use Harness AI to generate PR summaries, analyze code changes, and facilitate code review.
sidebar_label: PR Summaries & Code Review
sidebar_position: 51
---

# AI-Powered PR Summaries and Code Review

Harness AI enhances the code review process by automatically generating pull request summaries and providing intelligent analysis of code changes. These capabilities help teams review code faster, maintain quality, and improve collaboration.

## PR Summary Generation

Harness AI automatically generates comprehensive and informative summaries for pull requests by analyzing the code changes in the PR. This eliminates the need for developers to manually write detailed PR descriptions.

When you create or update a pull request, Harness AI analyzes the diff and generates a summary that includes:

- **Purpose of the changes** — A clear description of what the PR accomplishes and why the changes were made.
- **Issues addressed** — Identification of bugs, feature requests, or technical debt the PR resolves.
- **Potential impacts** — Analysis of how the changes may affect the existing codebase, including dependencies and downstream effects.
- **File-level change summaries** — A breakdown of what changed in each file, making it easy for reviewers to navigate large PRs.

### Generate a PR Summary

1. Create or open a pull request in Harness Code Repository.
2. Select **Generate Summary** (powered by Harness AI).
3. Review the AI-generated description that appears in the PR description field.
4. Edit the summary if needed, then save.

### Benefits

- **Faster reviews** — Reviewers can quickly understand the intent and scope of changes without reading every line of code.
- **Consistent documentation** — Every PR gets a well-structured description, improving traceability and audit trails.
- **Better communication** — Clear summaries reduce back-and-forth between authors and reviewers.
- **Improved code quality** — By promoting better understanding of changes, teams catch issues earlier in the review process.

## Code Review Assistance

Harness AI facilitates code review by providing intelligent analysis of code changes within pull requests. Reviewers can leverage AI to understand complex changes, identify potential issues, and make informed decisions.

Key code review capabilities include:

- **Code change analysis** — AI analyzes the semantic meaning of code changes, not just the diff, to explain what changed and why it matters.
- **File change summaries** — For each modified file, AI generates a concise summary of what was changed and its purpose.
- **Impact assessment** — AI identifies potential side effects, breaking changes, or areas that may need additional testing.

These capabilities map directly into your development workflow, helping teams maintain high code quality while accelerating the review process.

## Enable PR Summaries

To use AI-powered PR summaries, [enable Harness AI](/docs/platform/harness-aida/aida-overview) in your account settings. PR summary generation is available for all repositories managed in Harness Code Repository.
