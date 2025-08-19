---
title: Configure Cloud Providers
description: Learn more on how to configure Cloud Git Providers for Gitspaces. 
sidebar_position: 1
sidebar_label: Cloud Providers
---

Gitspaces allow you to configure your preferred **cloud Git provider** for seamless development. This integration enables you to create a Gitspace directly from your project repository (public or private) hosted on your chosen Git provider.

By authorizing and configuring a Git provider, your credentials are securely embedded in your account, eliminating the need for repeated authentication.

### Supported Cloud Git Providers
We offer the following Cloud Git provider integrations for your Gitspaces:
- [Harness Code](https://developer.harness.io/docs/code-repository/get-started/overview/)
- [GitHub Cloud](https://docs.github.com/en/get-started/start-your-journey/about-github-and-git)
- [GitLab Cloud](https://about.gitlab.com/)
- [Bitbucket Cloud](https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-cloud/)
- Any Public Git Repository

## Configuring Cloud Providers
To create a Gitspace with a Cloud Git Provider, you’ll first need to c**onfigure your preferred Git provider** using ```OAuth``` in the Harness UI and link your project repository.

### Configuring OAuth
When creating a Gitspace, you can select your **Git provider** to fetch repository details. Choose your provider from the dropdown menu, then select the option from the yellow box to **configure OAuth** from your profile. This will redirect you to your profile section to complete the setup.

<img width="650" alt="oauth1" src="https://github.com/user-attachments/assets/62f8c2f5-af74-4ed6-a709-f87af8c706a3"/>

Alternatively, you can configure OAuth directly from your profile section. Simply navigate to your ```“Profile Overview”``` from the bottom-left corner.

<img width="1200" alt="oauth2" src="https://github.com/user-attachments/assets/ce788c1a-8481-472b-87d3-d684fe9e023d"/>

Refer to this guide to learn how to [connect and configure OAuth for your Git providers](https://developer.harness.io/docs/platform/git-experience/oauth-integration/).



