---
title: Configure IDP 
description: After enabling the Internal Developer Portal module, follow these steps to set it up in your account.
sidebar_position: 2
redirect_from:
  - /docs/internal-developer-portal/getting-started/setting-up-idp
  - /docs/internal-developer-portal/get-started/onboarding-guide
---

## Introduction
This document describes the steps a Harness Account Admin can take to set up the IDP module. Presently, the module needs to be enabled on request. [Read more](./enabling-module.md).

## Prerequisites

- IDP must be provisioned for the given account.

- Only users with the **Harness Account Admin** role or assigned **IDP Admin** role (with permissions shown below) can configure IDP. Here's the detailed [documentation on how to assign roles](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/#assign-roles-and-resource-groups) 

![](static/assign-role.png)

![](static/idp-roles.png)

## Getting Started

1. You land on the IDP module by navigating from the sidebar after logging into your Harness account. We strongly recommend users to follow the onboarding guide selecting the **Get Started**, for a seamless onboarding resulting in a catalog with software components.

1. You can access the IDP module by clicking on it in the sidebar after logging into your Harness account. To set up your catalog easily, we strongly recommend usersclick **Get Started** and follow the onboarding guide. 

![](static/option1.png)
![](static/option2.png)


## Connector Setup

The software components in IDP are defined using YAML files, which are typically stored in your git repositories hence configuring a connector for these git providers is essential to fetch and manage these YAML files.

The following set of git providers are supported: 

  - [Harness Code Repository](https://www.harness.io/products/code-repository)
  - [GitHub](https://github.com/)
    - GitHub Enterprise
    - GitHub App
  - [GitLab](https://about.gitlab.com/)
  - [Bitbucket](https://bitbucket.org/product/)
    - Bitbucket Cloud
    - Bitbucket Server
  - [Azure Repository](https://azure.microsoft.com/en-us/products/devops/repos)

:::warning

#### Limitations

- Only HTTP mode is supported for all the git providers. SSH connection type is not supported.

    In IDP, API calls to git providers are used to fetch YAML data, retrieve the last commit SHA, and detect new changes. Since SSH authentication is only suitable for cloning repositories and cannot be used for these API calls, the primary git connector for IDP's git integration must support API requests, making HTTP the only supported option.

:::

:::info

- **Multiple Connectors with different hostname can be used for a single Git Provider at once**.
- While setting up connector, both Account & Repo type for URL is supported.
- Connection through Harness platform and delegate is supported.
- You can provide the repository URL to verify repository read permission with the given host and credentials before saving the Git integration.

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs queryString="Git-Provider">
<TabItem value="harness-code-repo-enabled" label="Harness Code Repository Enabled">

### Harness Code Repository \{#harness-code-repository}

1. In case you are already using Harness Code Repository, a default connector with only **Read Permission** would be available for the code repo set-up under the same account as that of IDP. Note this connector is uneditable and managed by Harness.

![](static/new-git-integration-hce-enabled.png)

2. You can as well create a new connector for other git-providers under the **+New Integration**.  If you already have a connector available which you want to use in IDP to save your `catalog-info.yaml`, then select the connector under **Select Git Connector**, use a URL to validate and save the connector. If you don't have your connector configured already follow the steps mentioned below. 

![](static/set-up-connector.png)

</TabItem>
<TabItem value="other-git-provider" label="Harness Code Repository Not Enabled">

1. Select the **Git Provider** you want to configure from the available options.

![](static/select-git-provider.png)

2. If you already have a connector available which you want to use in IDP to save your `catalog-info.yaml`, then select the connector under **Select Git Connector**, use a URL to validate and save the connector. If you don't have your connector configured already follow the steps mentioned below. 

![](static/set-up-connector.png)

</TabItem>
</Tabs>


<Tabs queryString="Connector">
<TabItem value="harness-code-repo" label="Harness Code Repository">

- **We don't allow to create a new connector for Harness Code Repository.**

</TabItem>
<TabItem value="azure-connector" label="Azure Repository">

### Azure Repository \{#azure-repository}

- Select **Azure Repo** icon followed by **Create or Select a Connector**.
- From the dropdown under **Select Azure Repo Connector** and either select an already present connector or create **+New Connector**.
- [Connect to Azure Repos](https://developer.harness.io/docs/platform/connectors/code-repositories/connect-to-a-azure-repo). You can also add multiple organizations as different connectors and use them together.
- After the connection test runs, select Finish to save the connector.

</TabItem>
<TabItem value="bitbucket-connector" label="Bitbucket">

### Bitbucket \{#bitbucket}

- Select **Bitbucket** icon followed by **Create or Select a Connector**.
- From the dropdown under **Select Bitbucket Connector** and either select an already present connector or create **+New Connector**.
- Configure the [Bitbucket connector settings](https://developer.harness.io/docs/platform/connectors/code-repositories/ref-source-repo-provider/bitbucket-connector-settings-reference).

:::info

Same secret can't be configured for both **Password & Personal Access token** as backstage makes use of API token to fetch data.Create a secret with token and configure in the Personal Access token field. [Reference for creating token](https://confluence.atlassian.com/bitbucketserver/personal-access-tokens-939515499.html)

![](./static/bitbucket-connector.png)

For **Bitbucket Cloud** the url needs to have **src** instead of **blob**. For e.g. `https://bitbucket.org/org-name/repo-name/src/branch/harness-services/Organization/default.yaml`

:::

- After the connection test runs, select **Finish** to save the connector.

</TabItem>
<TabItem value="github-connector" label="GitHub">

### GitHub \{#github}

- Select **GitHub** icon followed by **Create or Select a Connector**.
- From the dropdown under **Select GitHub Connector** either select an already present connector or create **+New Connector**.
- Configure the [GitHub connector settings](https://developer.harness.io/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference). You can configure connectors for both `github.com` and `GitHub Enterprise` and use them at once to fetch `catalog-info.yaml` from both the sources at same time.
- After the connection test runs, select **Finish** to save the connector.

:::warning

While using GitHub App, you need a **private key for your GitHub app** to configure your Harness GitHub connector, follow the instructions mentioned [here](https://developer.harness.io/docs/platform/connectors/code-repositories/git-hub-app-support/#generate-a-private-key) **to convert the key file to the necessary format for the Harness GitHub connector**

:::

More instructions on [using GitHub app in GitHub connector](https://developer.harness.io/docs/platform/connectors/code-repositories/git-hub-app-support).

</TabItem>
<TabItem value="gitlab-connector" label="GitLab">

### GitLab \{#gitlab}

- Select **GitLab** icon followed by **Create or Select a Connector**.
- From the dropdown under **Select GitLab Connector** either select an already present connector or create **+New Connector**.
- Configure the [GitLab connector settings](https://developer.harness.io/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-lab-connector-settings-reference). You can configure connectors for both `gitlab.com` and `GitLab on-prem` and use them at once to fetch `catalog-info.yaml` from both the sources at same time.
- After the connection test runs, select **Finish** to save the connector.

</TabItem>
</Tabs>

:::info

The scope is tied to URL format `https://gitprovider.com/org-name`, so all the Git Providers must provide the URL until at least the org name. Further, it can be scoped down to the repository or project level as well.

:::

- Once the connectors are created, you can see all the git providers configured for IDP. 

![](static/connector-final-setup.png)

:::warning

Make sure to enable API access while configuring the connector for the IDP catalog setup.

![](./static/enable-api-access.png)

::::

## Onboard Services

Users will now have option to onboard existing Harness services into IDP, or start with a sample service.  

![](static/select-onboarding-path.png)

<Tabs queryString="Import Harness Services">
<TabItem value="import-harness-services" label="Import Harness Services">

### Import Harness Services

- User will be shown the list of services in their account. It will be defined in terms of IDP entity i.e Harness organization is a domain, Harness project is a system and Harness service is a component in the IDP world. This list includes services at all scopes.

- User can choose all the services / individual services / no services

| Onboarding Option | Description                                               |
|-------------------|-----------------------------------------------------------|
| All               | Import all Harness services into IDP.                     |
| Individual        | Select specific Harness services to import.               |
| No                | Start with a sample entity for testing and initial setup. |

![](static/select-harness-services.png)

- User gets a view on how the entity definition looks like

![](static/preview-catalog.png)

- Now add the details on where the entities will be created in git:

<Tabs queryString="set-up-path">
<TabItem value="path-to-save-yaml" label="Harness Code Repository YAML Path">

- **Connector** - The connector is selected by default.

- **Directory Path** - Give a path for the directory in which you want to write the `catalog-info.yaml` files.

![](static/select-path.png)

- **Repo Path** - Go to the Code Repository and under files select **Clone** and copy the repository path. 


![](static/copy-repo-path.png)

Validate the permission and the `catalog-info.yaml` files would be created in your directory in Code repository. 

![](static/repo-path-code-repo.png)

</TabItem>
<TabItem value="other-git-provider-yaml-path" label="Other Git Providers YAML Path">


- **Connector** - Select the connector of the git provider you want to use. 

- **Repo** - Enter the full path to your repo. Example

```
https://github.com/user-name/onboarding-test.git
https://github.com/user-name/onboarding-test
```

- The provided repo in the repo URL should belong to the same organization / project for which the connector has been setup. Ex -

**In connector** - The account path is `https://github.com/user-name`. So the repo URL in IDP onboarding flow should be `https://github.com/{USER_NAME}/{SOME_REPO}`. It cannot be `https://github.com/{SOMETHING_ELSE}/{SOME_REPO}` - this will not work.

- Provided repo should exist with a valid default HEAD branch. Ideally this will be case when the repo is initialized with README file

- Branch - Can be new branch / some existing branch. In both the cases, the commit will be done on top of the base HEAD branch.

- Path - Defaults to harness-services. Can be changed as well.

![](static/write-catalog.png)

</TabItem>
</Tabs>


</TabItem>
<TabItem value="sample-service" label="Start with Sample Service">

### Start with Sample Service

- User will be shown a demo service metadata in the form of the `catalog-info.yaml`.

![](static/preview-catalog.png)

- Now this will be added to the git provider: 

<Tabs queryString="set-up-path">
<TabItem value="path-to-save-yaml" label="Harness Code Repository YAML Path">

- **Connector** - The connector is selected by default.

- **Directory Path** - Give a path for the directory in which you want to write the `catalog-info.yaml` files.

![](static/select-path.png)

- **Repo Path** - Go to the Code Repository and under files select **Clone** and copy the repository path. 

:::info

Once you copy the repository path replace the `git.eu.harness.io` with `accounts.eu.harness.io`.

![](static/replace-vanity-url.png)

:::

![](static/copy-repo-path.png)

Validate the permission and the catalog-info.yaml files would be created in your directory in Code repository. 

![](static/repo-path-code-repo.png)

</TabItem>
<TabItem value="other-git-provider-yaml-path" label="Other Git Providers YAML Path">


- **Connector** - Select the connector of the git provider you want to use. 

- **Repo** - Enter the full path to your repo. Example

```
https://github.com/user-name/onboarding-test.git
https://github.com/user-name/onboarding-test
```

- The provided repo in the repo URL should belong to the same organization / project for which the connector has been setup. Ex -

**In connector** - The account path is `https://github.com/user-name`. So the repo URL in IDP onboarding flow should be `https://github.com/{USER_NAME}/{SOME_REPO}`. It cannot be `https://github.com/{SOMETHING_ELSE}/{SOME_REPO}` - this will not work.

- Provided repo should exist with a valid default HEAD branch. Ideally this will be case when the repo is initialized with README file

- Branch - Can be new branch / some existing branch. In both the cases, the commit will be done on top of the base HEAD branch.

- Path - Defaults to harness-services. Can be changed as well.

![](static/write-catalog.png)

</TabItem>
</Tabs>

</TabItem>
</Tabs>

## Create and Register Entities

- Once the required details are entered and submitted for importing, we will push the generated entity YAML files to the repo and path provided. You will be seeing two commits - one during the sync process and another asynchronously, which will consist of remaining entities will be pushed in an asynchronous manner. The time frame for asynchronous operation(second commit) will depend on the repo size is and number of revisions the provided repo has.

- In the background, the catalog are also imported into IDP along with their associated configs.

![](static/onboarding-completed.png)

## Catalog

- User can navigate to the IDP homepage to get started. Catalog will start showing up software components once the asynchronous operation is completed.

- Since during the onboarding flow Harness will not be able to discover the complete metadata of the entity, the **owner** field will be set to **Unknown**. As part of the IDP provisioning, Harness users and groups are imported to IDP. With this in place, customers can start editing the catalog info YAML definition to update the owner for each of the entity.

![](static/catalog.png)

- Post onboarding, users can import any number of entities into Harness IDP using the [register component flow](https://developer.harness.io/docs/internal-developer-portal/catalog/register-software-component). This flow expects you to provide the complete URL where the entity definition is stored.

### Onboard Services Post Getting Started

- You can add new services to the IDP after the initial onboarding flow. Simply navigate to **Admin**, select **Get Started**, and you’ll find the Onboard Service Wizard available for use.

![](./static/get-started-admin.png)

**Recommendations**

If you're using GitHub connector, you can go with App based authentication which provides higher number of API requests in an hour window for your catalog to be in sync with the latest updates without resulting in rate limit error. Read more about [GitHub Apps](https://docs.github.com/en/apps/creating-github-apps/setting-up-a-github-app/rate-limits-for-github-apps)

## Next steps

Check out the [Getting Started with Software Catalog](/docs/internal-developer-portal/get-started/register-a-new-software-component) to onboard more software components to IDP. 
