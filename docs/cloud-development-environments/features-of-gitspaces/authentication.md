---
title: Authentication
description: Learn how to configure a Git provider for authentication
sidebar_position: 1
sidebar_label: Authentication
redirect_from:
  - /docs/cloud-development-environments/features-of-gitspaces/authentication
---

Gitspaces allow you to configure your preferred Git provider for seamless development. This integration enables you to create a Gitspace directly from your project repository (public or private) hosted on your chosen Git provider.

By authorizing and configuring a Git provider, your credentials are securely embedded in your account, eliminating the need for repeated authentication.

We offer the following Git provider integrations for your Gitspaces:
- Harness Code
- GitHub Cloud
- GitLab Cloud
- Bitbucket
- Any Public Git Repository

To create a Gitspace, you’ll first need to configure your preferred Git provider using ```OAuth``` in the Harness UI and link your project repository.

### Configuring OAuth
When creating a Gitspace, you can select your Git provider to fetch repository details. Choose your provider from the dropdown menu, then select the option from the yellow box to configure OAuth from your profile. This will redirect you to your profile section to complete the setup.

<img width="650" alt="oauth1" src="https://github.com/user-attachments/assets/62f8c2f5-af74-4ed6-a709-f87af8c706a3"/>

Alternatively, you can configure OAuth directly from your profile section. Simply navigate to your ```“Profile Overview”``` from the bottom-left corner.

<img width="1200" alt="oauth2" src="https://github.com/user-attachments/assets/ce788c1a-8481-472b-87d3-d684fe9e023d"/>

Refer to this guide to learn how to [connect and configure OAuth for your Git providers](https://developer.harness.io/docs/platform/git-experience/oauth-integration/).



