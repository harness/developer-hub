---
title: Split and Harness
description: Split is now Harness SEI.
sidebar_position: 18
---

<CTABanner
  buttonText="View Migration Guide"
  title="We have started to migrate the Propelo platform users to Harness SEI"
  link="/docs/software-engineering-insights/get-started/migrate-propelo-to-harness/migrate-propelo-to-harness-sei"
  closable={true}
  target="_self"
/>

In May 2024, Harness acquired Split, now called Harness Feature Management & Experimentation (FME). This page provides information to support you during the transition to Feature Management & Experimentation in the Harness Platform.

If you are using standalone Split you can continue to do so. Our customer success and support teams will be in contact with you to help you ensure a smooth transition into FME when the time is right.

For more information about the acquisition, go to the [Harness blog](https://www.harness.io/blog/harness-to-acquire-split).

## Get started with Harness

If you're new to Harness, go to [Get started with Harness](/docs/category/get-started-with-harness) for a jumpstart into the Harness software delivery platform.

## Authentication, access, and user management

Authentication, access, and user management are part of the Harness Platform. Permissions granted to users and user groups depends on their associations with resources and resource groups, which are controlled at the account, organization, and project level in Harness. For more information about authentication, access, and user management, go to the following:

* [Harness Platform authentication (including 2FA and SSO)](/docs/category/authentication)
* [Harness RBAC overview](/docs/platform/role-based-access-control/rbac-in-harness)

<!-- todo: add info about FME Admin/User roles and permissions and their management --->

<!-- decision: 2025/02/07 - LS/DK/JA - Remove terminology section because Account and Projects renames are
                                       familiar to readers, while Admin API and Admin API Key will be transitioned
                                       over server steps.

## Terminology

Some Split terminology changed to align with the Harness Platform.

| Split term | Harness term | Comments |
| ------------ | ------------ | -------- |
| Organization | Account | Your company has one Harness account. This is the highest level container. |
| Workspaces | Projects | Each Harness project is a workspace. Harness organizations are umbrellas over projects. |
| Admin API | Harness API | Split Admin API endpoints will eventually be added into Harness API, and endpoints for managing workspaces, users, groups, and permissions will be handled by Harness API. |
| Admin API key | API Key | You will be able to generate Harness API key tokens to work with HTTP API endpoints for Harness FME. |

The following terms are the same:

* [Feature flags](./key-concepts/feature-flags.md)
* [Metrics](./key-concepts/metrics.md)
* [Events](./key-concepts/events.md)
* [Impressions](./key-concepts/impressions.md)
* [Traffic types](./key-concepts/traffic-types.md)
* [Segments](./key-concepts/segments.md)

-->

## Harness platform integrations coming soon

We are moving rapidly to unlock integrations with Harness's innovative DevOps tools, DevEx improvements, Security features, and Cloud optimizations. Check back here for how to switch on these benefits for your team.