---
title: GitHub Actions
sidebar_label: GitHub Actions
description: ""
---

## Feature Flags Evaluator GitHub Action

[GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) is a continuous integration and continous delivery (CI/CD) platform. GitHub Actions allows you to trigger workflows that execute a series of commands on your GitHub repository files. 

The Split Feature Flags Evaluator Github Action integrates the Harness FME SDK into your existing GitHub workflows. This GitHub Action uses the [Harness FME Node.js SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/nodejs-sdk) to evaluate feature flags and outputs the feature flag treatment results for use later in the workflow.

The [Split Feature Flags Evaluator GitHub Action](https://github.com/marketplace/actions/split-software-feature-flags-evaluator) is a community-supported integration. We do our best to ensure that we share only high-quality community integrations and solutions but we do not work on these projects directly, nor can we guarantee that they’re consistently maintained.

## How it works

GitHub workflows are triggered by events on your repository, like a merge into the main branch. A GitHub workflow step can run the Split Feature Flag Evaluator GitHub Action and make the feature flag evaluation results available to other workflow steps and jobs. This allows you to refine your CI/CD processes using Harness FME feature flags.

## Setting up the Split Feature Flags Evaluator

### In Harness FME

In the Harness FME, you first need to create your feature flags. Take note of the FME environment for which you create your feature flag targeting rules. In Admin Settings find the _server-side SDK API Key_ for this environment and store it as a GitHub [secret](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) for use in your GitHub workflow.

### In a GitHub workflow

To learn how to integrate the Split Feature Flags Evaluator into a GitHub workflow, see [Split Software: Feature Flags Evaluator](https://github.com/marketplace/actions/split-software-feature-flags-evaluator) in GitHub Marketplace.

## About this integration

This is a third-party integration that has been tested by the Harness FME team. Harness does not own or maintain this integration. For more information, contact the [contributor](mailto:sebastian.arrubia@split.io).

If you’d like a demo of Harness FME or need help implementing any of our integrations, contact [support@split.io](mailto:support@split.io).