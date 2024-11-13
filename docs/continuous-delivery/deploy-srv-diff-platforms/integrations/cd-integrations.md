---
title: Integrations
description: A high level overview of integrations enabled by and provided by Harness.
sidebar_position: 1
---

# Integrations

Harness supports a wide range of use cases and integrations with other platforms to get the best out of your DevOps Experience.

## Requirements and Planning:

We integrate with Jira, GitLab, Azure DevOps and GitHub for issue tracking and requirements.
- Jira
- GitLab
- GitHub
- Azure DevOps Boards

## UX Design

Harness supports integration with various UX Design tools such as Figma. Customers can also streamline deployments without gates using Feature Flags. Feature Flags grant developers control over feature rollouts with or without UX.

You can use the [shell script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step.md) in order to integrate with various UX Design tools.

## System Center Configuration Manager (SCCM)

Harness supports integration with System Center Configuration Manager (SCCM) using Harness Pipelines. For example, the [shell script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step.md) will support an integration with SCCM.

For example, if you wanted to create a pipeline that installed required infrastructure in a window's environment you could use the [CLI](https://learn.microsoft.com/en-us/mem/configmgr/core/servers/deploy/install/use-a-command-line-to-install-sites) within a [shell script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step.md) to do so. Simply use the required CLI commands in the step, and add the step where you need it in your deployment pipeline. 

## Modeling

Harness supports integration with flow modeling tools (LucidChart, Visio etc,) and DB Modeling tools (ER/Studio, Erwin Data Modeler).

These platforms are supported through our native pipeline tools/steps such as the [shell script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step.md) or the [http step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step.md).

For example, let's say you wanted to create a pipeline that transfered a test plan document in LucidChart from your development team to your test team when an artifact succesfully deploys to your QA or Dev environment. To do this you could follow these broad steps: 
1. Store the the access token for LucidChart's V1 API in the [Harness Secret Manager](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview/)
2. Use the [http step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step.md) to build a request for your desired API endpoint. In this example, the API endpoint would be `/transferUserContent` as a `POST` request. Simply fill out the required fields in the step as described in the step reference doc. 
3. Add the step to the end of your deployment pipeline for artifacts going to the QA or Dev environment pipeline so that the transfer happens after a succesful deployment.

## IT Service Management (ITSM)

ServiceNow is the most common ITSM tool, followed closely by Jira by customers who need an ITSM integration or tool.

For ServiceNow, we can:
- Delegate approvals to Service Now as well as create and update tickets using the Harness pipeline. https://tinyurl.com/323ykx7r
- Incidents flow to and from Service Reliability Management: https://tinyurl.com/mtr582tp
Jira also can be used for approvals: https://tinyurl.com/2p82d3wx

## Internal Developer Portal (IDP)

We are delivering Harness plugins for Backstage here:
https://github.com/harness/backstage-plugins

## Value Stream Management Platform (VSMP)

Harness integrates with Value Stream Management platforms such as Jellyfish.

Iterable showcased our integration with Jellyfish with their blog found here:
https://iterable.com/blog/deployment-frequency-tracking-with-harness-jellyfish-integration/

Since Jellyfish exposes their API, you can use the Harness [shell script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step.md) or [http step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step.md).
to integrate with Jellyfish. 

The broad steps are as follows:
1. Use the [Harness Secret Manager](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview/) to store your API key or other relevant secrets for Jellyfish in Harness.
2. Build out your request in the shell script step or the http step. The shell script step will allow for more customizability whereas the http step will give more readability. 
3. Add your step to the correct spot in your pipeline. Consider adding the deploy to Jellyfish in parallel to the production deploy step for more access to built in variables. 

For more information, please read the Iterable blog referenced above!

## FAQs

For frequently asked questions about Harness integration with other platforms, go to [Integrations FAQs](/docs/continuous-delivery/deploy-srv-diff-platforms/integrations/integrations-faqs).