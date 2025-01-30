---
title: Integrations and permissions
description: Details of the integrations and their permissions required
sidebar_position: 89
---

Harness requires gathering data from all relevant integrations to perform security scanning and apply standards across multiple software supply chain targets. The SCS module facilitates this by using Harness-built integration apps that connect with these target types and fetch the necessary data. These target types include code repositories, artifacts, and CI/CD toolchains. 

:::note
Currently, Harness supports only Code Repositories, and specifically GitHub. In the near future, Harness will add support for other integrations.
:::
<DocImage path={require('./static/integrations-overview.png')} width="100%" height="100%" title="Click to view full size image" />

To find all the integrations, navigate to the “Integrations” section within the SCS module. From here, you can perform various operations, including:



* Adding a new integration
* Updating an existing integration
* Deleting an integration
* Filtering by integration status
* Searching for a specific integration


## GitHub App Integration

You can configure your GitHub account directly from the “Get Started” section or by clicking “Add Integration” in the Integrations section.

The integration is done by installing the [Harness-SCS app on GitHub](https://github.com/apps/harness-ssca). This app, developed by Harness, facilitates the connection between your GitHub account and Harness SCS.
    

<DocImage path={require('./static/integrations-permissions-gh-app.png')} width="50%" height="50%" title="Click to view full size image" />


### Permission required for the GitHub app

The GitHub app requires read level permissions on your code repositories and organization settings.
