---
title: GitHub Actions
sidebar_label: GitHub Actions
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/24994768544269-GitHub-Actions </button>
</p>

# Feature Flags Evaluator GitHub Action

[GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) is a continuous integration and continous delivery (CI/CD) platform. GitHub Actions allows you to trigger workflows that execute a series of commands on your GitHub repository files. 

The Split Feature Flags Evaluator Github Action integrates the Split SDK into your existing GitHub workflows. This GitHub Action uses the [Split Node.js SDK](https://help.split.io/hc/en-us/articles/360020564931-Node-js-SDK) to evaluate feature flags and outputs the feature flag treatment results for use later in the workflow.

The [Split Feature Flags Evaluator GitHub Action](https://github.com/marketplace/actions/split-software-feature-flags-evaluator) is a community-supported integration. We do our best to ensure that we share only high-quality community integrations and solutions but we do not work on these projects directly, nor can we guarantee that they’re consistently maintained.

# How it works

GitHub workflows are triggered by events on your repository, like a merge into the main branch. A GitHub workflow step can run the Split Feature Flag Evaluator GitHub Action and make the feature flag evaluation results available to other workflow steps and jobs. This allows you to refine your CI/CD processes using Split feature flags.

# Setting up the Split Feature Flags Evaluator

## In Split

In the Split UI, you first need to create your Split feature flags. Take note of the Split environment for which you create your feature flag targeting rules. In Admin Settings find the _server-side SDK API Key_ for this Split environment and store it as a GitHub [secret](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) for use in your GitHub workflow.

## In a GitHub workflow

To learn how to integrate the Split Feature Flags Evaluator into a GitHub workflow, see [Split Software: Feature Flags Evaluator](https://github.com/marketplace/actions/split-software-feature-flags-evaluator) in GitHub Marketplace.

# About this integration

This is a third-party integration that has been tested by Split. Split does not own or maintain this integration. For more information, contact the [contributor](mailto:sebastian.arrubia@split.io).

To learn more about all of Split's integrations, check out our [integrations page](https://help.split.io/hc/en-us/categories/360001538192-Integrate-automate). If you’d like a demo of Split or need help implementing any of our integrations, contact [support@split.io](mailto:support@split.io).
