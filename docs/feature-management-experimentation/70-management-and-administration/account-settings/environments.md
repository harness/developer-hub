---
title: Environments
sidebar_position: 60
---

Environments allow you to manage your feature flag throughout your development lifecycle, from local development to staging and production.

When you first create your account, your default project is provided with two environments which  are named Staging and Production by default. Each environment is automatically set up with its own API keys. These API keys are used to connect the FME SDK to a specific environment.

Each feature flag that you create has its own set of targeting rules in each environment making it easy to define different targeting rules in your staging and production environments. This allows you to quickly change the targeting rules for a specific feature flag for quality testing on your staging environment with confidence that the feature flag is not enabled for users on your production environments.

You can manage your environments for each project from your Admin settings. You can also add new environments or edit existing.

## Navigating

The Environments section provides you and your team insights into the feature flags configured in each environment. Teams can now easily toggle between any environment via the environments dropdown.

Navigate to the environments icon to quickly see the status of each feature flag in a given environment and a log of feature flag changes to quickly see any modifications made by your team. Summary statistics and sorting provide an easy starting point to find the feature flags you and your team are managing.

<img src="https://help.split.io/hc/article_attachments/15587079043853" alt="feature_flag_status_by_environment.png" width="900" />

## Editing

When you first create your account, you are provided with two environments. To manage your environments, go to the **Projects** tab in your **Admin settings** page. Select the project that you want to edit environments for. You can: 

* Rename environments to match your deployment process as well update their permissions by clicking **Edit**.
* Add additional environments by clicking **Create environment**.

<img src="https://help.split.io/hc/article_attachments/15587865204621" alt="create_environment.png" width="900" />


## Localhost

A developer can set up a feature flag on their development machine without the SDK requiring network connectivity. This is called the localhost environment. This environment does not show up in the user interface because, by definition, that requires network connectivity. To configure your SDK for this mode, refer to your language SDK guide.
