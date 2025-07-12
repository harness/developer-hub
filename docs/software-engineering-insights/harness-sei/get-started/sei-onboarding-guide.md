---
title: SEI 2.0 - Onboarding Guide
description: The new experience for measuring engineering insights in Harness SEI
sidebar_label: SEI 2.0 Onboarding Guide
sidebar_position: 10
---

This guide explains what you need to know to get started using Harness SEI 2.0.

## Complete Harness Platform onboarding

If you're new to Harness, review the [Harness Platform onboarding guide](/docs/platform/get-started/onboarding-guide and [Harness Platform key concepts](/docs/platform/get-started/key-concepts) before onboarding to SEI 2.0.

## SEI 1.0 and SEI 2.0

If you're switching over to Harness SEI 2.0 from the SEI 1.0 experience, review the [SEI 1.0 vs SEI 2.0 Guide](/docs/software-engineering-insights/harness-sei/sei-overview.md) for useful information about what's new in the SEI 2.0 experience.

## Onboarding Path

### Phase 1: Setup your Harness account

| **Step** | **Purpose** | **Documentation** |
|---------|-------------|-------------------|
| <a href="/docs/software-engineering-insights/harness-sei/get-started/sei-key-concepts">Review Key Concepts</a> | Learn about the basic concepts of SEI 2.0 | [View Setup Guide](/docs/software-engineering-insights/harness-sei/get-started/sei-key-concepts) |  
| <a href="/docs/platform/organizations-and-projects/create-an-organization">Account and Project setup</a> | Create projects and invite users | [View Setup Guide](/docs/platform/organizations-and-projects/create-an-organization) |

### Phase 2: Single Sign-On (Automate onboarding of users from external sources​)

| **Step** | **Purpose** | **Documentation** |
|---------|-------------|-------------------|
| <a href="/docs/platform/authentication/authentication-overview">Configure SSO</a> | Automate the onboarding of users from external sources | [View Setup Guide](/docs/platform/authentication/authentication-overview) |  
| <a href="/docs/platform/automation/api/api-quickstart">API Guide</a> | Learn how to programmatically create any resource on SEI using REST APIs | [View Setup Guide](/docs/platform/automation/api/api-quickstart) |

### Phase 3: Create integrations

| **Step** | **Purpose** | **Documentation** |
|---------|-------------|-------------------|
| <a href="/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/sei-integrations-overview">Create Integrations (Cloud)</a> | Learn how to create cloud integrations for third-party tools | [View Setup Guide](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/sei-integrations-overview) |
| <a href="/docs/software-engineering-insights/propelo-sei/setup-sei/sei-ingestion-satellite/satellite-overview">Ingestion Satellite Overview</a> | Use the Ingestion Satellite to connect SEI with on-premise tools | [View Setup Guide](/docs/software-engineering-insights/propelo-sei/setup-sei/sei-ingestion-satellite/satellite-overview) |
| <a href="/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/custom-cicd/sei-custom-cicd-integration">Create custom CI/CD integrations</a> | Learn how to create custom CI/CD integrations | [View Setup Guide](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/custom-cicd/sei-custom-cicd-integration) |
| <a href="/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/sei-integrations-overview#integration-monitoring">Integration Monitoring</a> | Monitor the health status of the integrations | [View Setup Guide](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/sei-integrations-overview#integration-monitoring) |
| <a href="/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/github/sei-github-integration">Configure GitHub Integration</a> | Create and configure the integration for GitHub Cloud or GitHub Enterprise | <ul><li>[GitHub Cloud – View Setup Guide](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/github/sei-github-integration)</li><li>[GitHub Enterprise – View Setup Guide](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/github/sei-github-integration)</li></ul> |
| <a href="/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/jira/sei-jira-integration">Configure Jira Integration</a> | Create and configure the integration for Jira Cloud or Jira Data Center | [View Setup Guide](/docs/software-engineering-insights/propelo-sei/setup-sei/configure-integrations/jira/sei-jira-integration) |


### Phase 4: Create profiles

| **Profile Type** | **Purpose** | **Documentation** |
|------------------|-------------|--------------------|
| [Efficiency Profile](/docs/software-engineering-insights/harness-sei/setup-sei/setup-profiles/efficiency-profile) | Define how you track DORA and Sprint insights (Coming soon) | [View Setup Guide](/docs/software-engineering-insights/harness-sei/setup-sei/setup-profiles/efficiency-profile) |
| [Productivity Profile](/docs/category/set-up-profiles) | Track developer activity and collaboration, including PR throughput, cycle time, and PR activity | [View Setup Guide](/docs/category/set-up-profiles) |
| Business Alignment Profile (Coming soon) | Define how engineering efforts align to product goals and delivery of business value. | Coming soon |

### Phase 5: Upload your developer records

| **Step** | **Purpose** | **Documentation** |
|---------|-------------|-------------------|
| [Prepare CSV Export](/docs/software-engineering-insights/harness-sei/setup-sei/upload-developer-records) | Export your developer records from HRIS systems like Workday as a CSV | [View Setup Guide](/docs/software-engineering-insights/harness-sei/setup-sei/upload-developer-records) |
| [Upload Developer CSV](/docs/software-engineering-insights/harness-sei/setup-sei/upload-developer-records) | Upload your HRIS-based developer file to SEI | [View Setup Guide](/docs/software-engineering-insights/harness-sei/setup-sei/upload-developer-records) |

### Phase 6: Create the Org Tree

| **Step** | **Purpose** | **Documentation** |
|---------|-------------|-------------------|
| [Build Org Tree](/docs/software-engineering-insights/harness-sei/setup-sei/setup-org-tree) | Create an Org Tree using HRIS records to reflect reporting relationships | [View Setup Guide](/docs/software-engineering-insights/harness-sei/setup-sei/setup-org-tree) |
| [Track Changes to the Org Tree](/docs/software-engineering-insights/harness-sei/setup-sei/setup-org-tree) | Learn how SEI tracks changes and allows version control | [View Setup Guide](/docs/software-engineering-insights/harness-sei/setup-sei/setup-org-tree) |

### Phase 7: Set up teams & view insights

| **Step** | **Purpose** | **Documentation** |
|---------|-------------|-------------------|
| [Set up Teams](/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams) | Learn how teams are created from Org Tree leaf nodes | [View Setup Guide](/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams) |
| [Review & update developer identifiers](/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams) | Review & update the developer identifiers (i.e. integration usernames/account IDs) for your team developers | [View Setup Guide](/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams) |
| [View Dashboards and Insights](/docs/software-engineering-insights/harness-sei/setup-sei/view-insights/insights) | Access prebuilt dashboards and filter insights by team | [View Setup Guide](/docs/software-engineering-insights/harness-sei/setup-sei/view-insights/insights) |