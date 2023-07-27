---
title: SEI SonarQube integration
description: Integrate SEI with SonarQube or SonarCloud.
sidebar_position: 200
sidebar_label: SonarQube
---

SonarQube is an open-source platform for continuous inspection of code quality to perform automatic reviews with static analysis of code to detect bugs, code smells, and security vulnerabilities on 20+ programming languages.

Use the SEI SonarQube integration to integrate SEI with SonarQube or SonarCloud.

To integrate with the on-premises SonarQube instances, you must use the [generic SEI integration](./sei-integration-generic.md).

## Requirements

To use the SEI SonarQube integration you need a SonarQube API token.

* The user creating the token must have **Administer System** permissions.
   * To configure permissions in SonarQube, go to **Administration**, then **Security**, and then **Global Permissions**.
   * Due to the scope of access required, consider using a managed service account, rather than a personal user account, to create the token.
* For instructions on creating API tokens, go to the SonarQube documentation on [Generating and using tokens](https://docs.sonarsource.com/sonarqube/9.7/user-guide/user-account/generating-and-using-tokens/).
* Copy the key somewhere that you can retrieve it when you configure the integration.

## Configure the integration

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Integrations** under **Data Settings**.
3. Select **Available Integrations**, locate the **SonarQube** integration, and select **Install**.
4. Configure and save the integration.

   * **URL:** Enter the URL of the server where SonarQube is running. For SonarCloud, enter `https://sonarcloud.io`.
   * **Username:** The email address of the user that created the token in SonarQube.
   * **API Key:** Enter the SonarQube API token.
   * **Organization:** Enter your SonarQube **Organization Name**. For SonarCloud, you can find your organization name under **My Account**. Note that **Organization Key** is different from the **Organization Name**.
   * **Project Keys:** Enter one or more project keys to ingest. If you want SEI to ingest all projects, leave this field empty. Project keys are case sensitive.
   * **Name:** Enter a name for the integration.
   * **Description** and **Tags** are optional.
