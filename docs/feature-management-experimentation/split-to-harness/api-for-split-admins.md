---
title: Before and After Guide (API for Split Admins)
description: Learn how how the API for Split administrators works before and after your account migration.
sidebar_label: API for Split Admins
sidebar_position: 8
---

## Overview

This guide provides a Postman collection with API examples for the five Split Admin API endpoints that will be replaced by Harness API endpoints during your Split-to-Harness migration.

Each folder includes an overview section with detailed guidance tailored for both experienced Split administrators and those new to Split and Harness FME—to support a smooth and well-prepared transition for you. 

## Authorization moves from Bearer Token to `x-api-key`

Historically, you have presented the API token as a bearer token with Split. With the Harness platform, API tokens must be in an x-api-key header instead. The Postman collection below was updated to reflect that on April 18th, 2025. 

If you downloaded the Postman collection before April 18th, download an updated copy.

## Postman Collection

You can view the interactive collection experience [Before and After: APIs for Split Admins](https://www.postman.com/fme-tech-enablement/harness-fme/collection/evlmqcu/before-and-after-apis-for-split-admins) on Postman.

:::info Changelog for 3/24/25
 
  * Added Harness API Doc URLs to the "Documentation" for each Harness endpoint.
  * Fixed base URLs for auth and resource group endpoints.
:::

![](./static/postman.gif)

## FAQs

### Are the Harness Project identifier and Split Project Id (wsId) equivalent? Can I use either in the Split Admin API endpoints after migration?

No. Once you know the Harness Project `identifier`, you must obtain the Harness Project `name` and use that to look up the Split Project ID (`wsId`) by calling the `GET /workspaces` with the **filter (by name)** option to obtain `thewsId`. Once you have `thewsId`, you proceed as usual with the Split Admin API endpoints.  

See the discussion of **Retrieving wsId Using the Harness Project Name** in the [Projects > Harness (AFTER)](https://www.postman.com/fme-tech-enablement/harness-fme/documentation/evlmqcu/before-and-after-apis-for-split-admins?entity=folder-39aa2120-1aa4-4c0d-afc6-8679da5dd010) section of the Postman collection for more details.

### Will this collection be published on GitHub as well?

Yes. You can access [this collection](https://github.com/splitio/public-api-postman) on GitHub as well as its [revision history](https://github.com/splitio/public-api-postman/commits/main/Before%20and%20After-%20APIs%20for%20Split%20Admins.postman_collection%20from%20harness-fme.json).

### Will the existing Postman collection for Split Public API endpoints on GitHub be maintained going forward?

Yes. For clarity and consistency the variables in that collection will be updated soon to use the same variables as this collection. Later, we will update it to include the “after” endpoints seen here. 

