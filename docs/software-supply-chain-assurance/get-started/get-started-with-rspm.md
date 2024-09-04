---
title: Get started with RSPM
sidebar_label: Get started with RSPM
description: Get started with RSPM Onboarding in Harness SCS
sidebar_position: 4
---

This guide will help you onboard into the Repository Security Posture Management (RSPM) feature in Harness. The process consists of two main steps: configuring your integrations and selecting your resources.

If you've already configured your integrations and want to explore the RSPM features, please visit the Repository Security Posture Management documentation

:::note
The current onboarding process supports only GitHub. Support for other integrations will be added soon.
:::

## Configure Your Integrations

Navigate to the “Get Started” section in the SCS module. The process happens in two steps, which you can initiate by clicking on “Get Started.”


<DocImage path={require('./static/get-started-step-1.png')} width="100%" height="100%" title="Click to view full size image" />



1. Select “Code Repositories” when asked, "What would you like to secure?"
2. Choose “GitHub” as the integration type.
3. Click “Launch GitHub to configure” to proceed.

<DocImage path={require('./static/get-started-step-2.png')} width="100%" height="100%" title="Click to view full size image" />

You will be redirected to the Harness-SCS GitHub app to configure the app for connection with Harness SCS.


### Configuring the GitHub App: Harness-SCS

Configuring the Harness-SCS app allows SCS to connect with your GitHub and fetch necessary information for setting up repository posture management.



1. Visit the [Harness-SCS GitHub app](https://github.com/apps/harness-ssca) and click the ‘Configure’ button.

<DocImage path={require('./static/get-started-step-3.png')} width="70%" height="70%" title="Click to view full size image" />


2. Authorize Harness by selecting the organization where you want to install the app.


    <DocImage path={require('./static/get-started-step-4.png')} width="50%" height="50%" title="Click to view full size image" />


:::note
If the button says "Authorize and Request" instead of "Install and Authorize," you don’t have permission to install the GitHub App. Please contact your GitHub admin for permissions. For detailed information about permissions, refer to the [Integrations and Permissions](../integrations-and-permissions) document.
:::



3. Grant access to repositories. You can either select all repositories or choose specific ones. By default, Harness performs scans on your repositories every 24 hours.


<DocImage path={require('./static/get-started-step-5.png')} width="70%" height="70%" title="Click to view full size image" />



After configuring, you will be redirected back to the Harness “Get Started” flow, where you can choose the list of repositories. The list will show the repositories already selected through your integration. You can modify your selection here or finish the onboarding.


<DocImage path={require('./static/get-started-step-6.png')} width="100%" height="100%" title="Click to view full size image" />


While selecting repositories, you also have the option to automatically add any newly created repositories in the future. To enable this, simply check the option “_Automatically add all future repositories owned by the resource owner._”

Once your selection is done, click on “Finish.”

After clicking “Finish,” a pipeline is triggered to perform operations on the selected repositories. You will be redirected to the Integrations page, where you can check the status of the integration.

## View code repositories
To view all the selected repositories, navigate to the “Code Repositories” section. It might take some time for all repositories to be listed as the pipeline needs to complete. For more information about this process and the Code Repository section, refer to the [Repository Security Posture Management documentation](../repository-security-posture-management-rspm.md)


<DocImage path={require('./static/get-started-step-7.png')} width="100%" height="100%" title="Click to view full size image" />

