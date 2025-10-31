---
title: Customize branding in Harness UI
sidebar_label: Customize branding in Harness UI
description: Learn how to customize the Harness UI by personalizing its appearance through updating the favicon and logo.
sidebar_position: 41
tags:
  - branding
  - UI
  - customization
  - white-label
keywords:
  - harness branding
  - UI customization
  - white label
  - logo
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PipelineStatus from './static/pipeline-status.png';
import LogoSidebar from './static/sidebar-collasped.png';
import LogoSidebarExpanded from './static/sidebar-expanded.png';
import LogoSignIn from './static/sign-in-page.png';

:::info Feature Availability
  This feature is available behind `PL_ENABLE_BRANDING` feature flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

This feature allows you to customize the Harness UI to match your organization’s branding by updating the logo and favicon. This document explains how to configure these settings and outlines the available customization options. 

## Prerequisites

You must be an account administrator or have `Edit` permission for the **Branding** resource.

## Customization options

You can customize the favicon and logo by following the guidelines listed below. 

### Favicon 

A favicon is an icon for a website that shows in your browser tabs, bookmarks, and shortcuts. The default favicon is the Harness logo. 

Customize the apperance of the favicon by replacing it with your own favicon. You can use any image that is less than 50 KB in size, and the recommended dimensions are 32 × 32 px. 

:::note 
Currently, custom favicons are not supported on the pipeline execution page. During pipeline execution, the favicon automatically switches to the Harness default to indicate status: green for success, red for failure, and blue for running, as shown in the image below. When you navigate away from the page, it reverts to your custom favicon.

<img src={PipelineStatus} width="500"  alt="Pipeline Status" />
:::

### Logo

Logos appear in multiple places throughout Harness. This feature allows you to customize the sidebar and sign-in page logos specifically. Upload your own logos to replace the default Harness branding in these locations. All logos must be under 300 KB in file size.

#### Customize sidebar logo

- Small Logo (Sidebar Collapsed - Dark Background): When the sidebar is collapsed, a small logo appears at the top-left corner against a dark background. The recommended dimensions are 50 × 50 px.

    <img src={LogoSidebar} width="600"  alt="logo" /> 

- Large Logo (Sidebar Expanded - Dark Background): When the sidebar is expanded, a large logo appears at the top-left corner. The recommended dimensions are 225 × 50 px.
    <img src={LogoSidebarExpanded} width="600"  alt="logo" /> 

#### Customize sign-in page

:::info Important note
  Customizations on the sign-in page (including favicon and logo) are only supported for accounts with a [vanity URL](/docs/platform/authentication/authentication-overview/#set-up-vanity-url).
:::

- Large Logo (Sign-in Page - Light Background): This logo appears at the top of the sign-in form. The recommended dimensions are 225 × 50 px.

    <img src={LogoSignIn} width="400"  alt="logo" /> 

## Steps to customize branding in Harness UI

<Tabs>
<TabItem value="demo" label="Interactive">
    <iframe
    src="https://app.tango.us/app/embed/ba9df270-bebe-4e68-9de3-8a6c7a030e67"
    style={{ minHeight: '800px', width: '100%' }}
    sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
    security="restricted"
    title="Apply Branding Changes in Harness"
    referrerPolicy="strict-origin-when-cross-origin"
    frameBorder="0"
    webkitAllowFullScreen
    mozAllowFullScreen
    allowFullScreen
    />
</TabItem>

<TabItem value="steps" label="Manual">

1. Navigate to **Account Settings** -> **General** -> **Branding**.

2. Customize your favicon and logo files:

    - **Favicon**: Click **Upload** to add a favicon (recommended: 32 × 32 px, under 50 KB, PNG format). This will appear in browser tabs, bookmarks, and shortcuts. Use **Delete** to reset to default.
    
    - **Logo**: Click **Upload** to add logos for the sidebar (Small: 50 × 50 px, Large: 225 × 50 px, under 300 KB, PNG format). Use **Delete** to reset to default.

3. Enable the **Apply branding changes to the sign-in page** checkbox to update the logo on your sign-in and registration pages. This option is only available for accounts that have a vanity URL.

4. Click **Save Changes** to apply your settings.

</TabItem>
</Tabs>

