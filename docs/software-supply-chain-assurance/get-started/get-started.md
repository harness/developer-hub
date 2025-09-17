---
title: Get started
sidebar_label: Get started
description: Get started with Harness SCS
sidebar_position: 3
redirect_from:
    - /docs/software-supply-chain-assurance/get-started/get-started-with-rspm
    - /docs/software-supply-chain-assurance/get-started/onboarding-guide
    - /docs/software-supply-chain-assurance/integrations-and-permissions

tags:
  - harness-scs 
  - get-started
  - on-boarding  
---

This guide will help you onboard to the Harness SCS features, allowing you to set up RSPM, CI/CD SPM, and Artifact Security with integrations.

To begin, navigate to the **Get Started** section in the Harness SCS and click on **Get Started**.

<DocImage path={require('./static/get-started-01.png')} width="80%" height="80%" title="Click to view full size image" />

:::note
Please refer to the [Use SCS](/docs/software-supply-chain-assurance/ssca-supported#use-scs) section in the what's supported page to see the full list of supported integrations for each SCS feature.
:::


## Setup RSPM and CI/CD SPM on GitHub repos and Actions
Follow the instructions to connect your GitHub account with Harness SCS for RSPM and CI/CD SPM by installing the Harness SCS GitHub app or via Harness GitHub connector.

To begin, from the **Get Started** page click to expand the **GitHub** integration.

<DocImage path={require('./static/getstarted-gh.png')} width="80%" height="80%" title="Click to view full size image" />


You can select **Configure** in the **Repo Security** and **CI/CD Security** option. This will take you to a new screen with two options.

- [Harness Connector](/docs/software-supply-chain-assurance/get-started/#harness-connector)
- [Configure the GitHub App](/docs/software-supply-chain-assurance/get-started/#configuring-the-github-app)

<DocImage path={require('./static/onboarding.png')} width="80%" height="80%" title="Click to view full size image" />


### Harness Connector

1. Click on Harness connector, where you can select Harness GitHub connector to onboard your repositories then click on **Apply Selected**.

<DocImage path={require('./static/connector.png')} width="80%" height="80%" title="Click to view full size image" />

2. Choose repositories to scan. By default, all repositories are selected through your integration. You can modify your selection here or click **Finish** to onboard the repositories. You will be redirected to the Integrations page, where you can check the integration status.  A pipeline is then triggered to perform operations on the selected repositories.

<DocImage path={require('./static/repos.png')} width="80%" height="80%" title="Click to view full size image" />



### Configuring the GitHub App

1. You can click on **Launch GitHub to configure** to proceed.

<DocImage path={require('./static/get-started-gh-02.png')} width="80%" height="80%" title="Click to view full size image" />


2. Visit the [Harness-SCS GitHub app](https://github.com/apps/harness-ssca) and click the ‘Configure’ button.

<DocImage path={require('./static/get-started-step-3.png')} width="80%" height="80%" title="Click to view full size image" />


3. Authorize Harness by selecting the organization where you want to install the app.


  <DocImage path={require('./static/get-started-step-4.png')} width="50%" height="50%" title="Click to view full size image" />


:::note
If the button says **Authorize and Request** instead of **Install and Authorize**," you don’t have permission to install the GitHub App. Please contact your GitHub admin for permissions.
:::


4. Grant access to repositories. You can either select all repositories or choose specific ones. By default, Harness performs scans on your repositories every 24 hours.


<DocImage path={require('./static/get-started-step-5.png')} width="80%" height="80%" title="Click to view full size image" />



After configuring, you will be redirected back to the Harness **Get Started** flow, where you can choose the list of repositories. The list will show the repositories already selected through your integration. You can modify your selection here or finish the onboarding.


<DocImage path={require('./static/get-started-step-6.png')} width="80%" height="80%" title="Click to view full size image" />


While selecting repositories, you also have the option to automatically add any newly created repositories in the future. To enable this, simply check the option _Automatically add all future repositories owned by the resource owner._

Once your selection is done, click on **Finish**.

After clicking **Finish** a pipeline is triggered to perform operations on the selected repositories. You will be redirected to the Integrations page, where you can check the status of the integration.

Navigate to the **Code Repositories** section to view your repositories, and the **CI/CD** section to view your pipelines, along with their risk and security posture.


## Setup CI/CD SPM on Harness pipelines
From the **Get started** page, click on **Harness** under available integrations, and select **Enable** on the CI/CD Security options. This will set up the CI/CD SPM on your Harness pipelines.

<DocImage path={require('./static/get-started-harness-01.png')} width="80%" height="80%" title="Click to view full size image" />

Navigate to the **CI/CD** section to view your pipelines, along with their risk and security posture.