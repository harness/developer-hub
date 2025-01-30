---
title: Get started
sidebar_label: Get started
description: Get started with Harness SCS
sidebar_position: 4
redirect_from:
    - /docs/software-supply-chain-assurance/get-started/get-started-with-rspm
---

This guide will help you onboard to the Harness SCS features, allowing you to set up RSPM, CI/CD SPM, and Artifact Security with integrations. The onboarding process involves two main steps, configuring your integrations and selecting your resources.

To begin, navigate to the **Get Started** section in the SCS module and click on **Get Started**.

<DocImage path={require('./static/get-started-01.png')} width="100%" height="100%" title="Click to view full size image" />

Here, you’ll find a list of all currently supported integrations and those that are coming soon. You can also click to expand each integration and view the features it supports.

:::note
Please refer to the [Use SCS](../get-started/onboarding-guide#use-scs) section in the onboarding document to see the full list of supported integrations for each feature.
:::

Depending on your chosen integration and SCS features, refer to the appropriate sections below to get started:
- [Setup RSPM and CI/CD SPM on GitHub repos and Actions](#setup-rspm-and-cicd-spm-on-github-repos-and-actions)
- [Setup CI/CD SPM on Harness pipelines](#setup-cicd-spm-on-harness-pipelines)


## Setup RSPM and CI/CD SPM on GitHub repos and Actions
Follow the instructions to connect your GitHub account with Harness SCS for RSPM and CI/CD SPM by installing the Harness-SCS GitHub app.

To begin, from the **Get Started** page click to expand the **GitHub** integration.

<DocImage path={require('./static/getstarted-gh.png')} width="100%" height="80%" title="Click to view full size image" />


You can select **Configure** in the **Repo Security** and **CI/CD Security** option. This will take you to a new screen with two steps: configuring your integration and selecting the repositories to scan.

You can click on **Launch GitHub to configure** to proceed.

<DocImage path={require('./static/get-started-gh-02.png')} width="100%" height="100%" title="Click to view full size image" />

You will be redirected to the Harness-SCS GitHub app to configure the app for connection with Harness SCS.


### Configuring the GitHub App: Harness-SCS

Configuring the Harness-SCS app allows SCS to connect with your GitHub and fetch necessary information.



1. Visit the [Harness-SCS GitHub app](https://github.com/apps/harness-ssca) and click the ‘Configure’ button.

<DocImage path={require('./static/get-started-step-3.png')} width="70%" height="70%" title="Click to view full size image" />


2. Authorize Harness by selecting the organization where you want to install the app.


    <DocImage path={require('./static/get-started-step-4.png')} width="50%" height="50%" title="Click to view full size image" />


:::note
If the button says **Authorize and Request** instead of **Install and Authorize**," you don’t have permission to install the GitHub App. Please contact your GitHub admin for permissions. For detailed information about permissions, refer to the [Integrations and Permissions](../integrations-and-permissions) document.
:::



3. Grant access to repositories. You can either select all repositories or choose specific ones. By default, Harness performs scans on your repositories every 24 hours.


<DocImage path={require('./static/get-started-step-5.png')} width="70%" height="70%" title="Click to view full size image" />



After configuring, you will be redirected back to the Harness **Get Started** flow, where you can choose the list of repositories. The list will show the repositories already selected through your integration. You can modify your selection here or finish the onboarding.


<DocImage path={require('./static/get-started-step-6.png')} width="100%" height="100%" title="Click to view full size image" />


While selecting repositories, you also have the option to automatically add any newly created repositories in the future. To enable this, simply check the option _Automatically add all future repositories owned by the resource owner._

Once your selection is done, click on **Finish**.

After clicking **Finish** a pipeline is triggered to perform operations on the selected repositories. You will be redirected to the Integrations page, where you can check the status of the integration.

Navigate to the **Code Repositories** section to view your repositories, and the **CI/CD** section to view your pipelines, along with their risk and security posture.


## Setup CI/CD SPM on Harness pipelines
From the **Get started** page, click on **Harness** under available integrations, and select **Enable** on the CI/CD Security options. This will setup the CI/CD SPM on your Harness pipelines.

<DocImage path={require('./static/get-started-harness-01.png')} width="100%" height="100%" title="Click to view full size image" />

Navigate to the **CI/CD** section to view your pipelines, along with their risk and security posture.