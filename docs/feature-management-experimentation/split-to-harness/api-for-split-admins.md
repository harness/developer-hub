---
title: API for Split Admins
description: Learn how how the API for Split administrators works before and after your account migration.
sidebar_label: API for Split Admins
sidebar_position: 1
---

## Overview

This guide provides a Postman collection with API examples for the five Split Admin API endpoints that will be replaced by Harness API endpoints during your Split-to-Harness migration.

Each folder includes an overview section with detailed guidance tailored for both experienced Split administrators and those new to Split and Harness FME—to support a smooth and well-prepared transition for you. 

## Authorization moves from Bearer Token to `x-api-key`

Historically, you have presented the API token as a bearer token with Split. With the Harness platform, API tokens must be in an `x-api-key` header instead. The Postman collection below was updated to reflect that on April 18th, 2025. 

If you downloaded the Postman collection before April 18th, download an updated copy.

## Postman Collection

You can view the interactive collection experience [Before and After: APIs for Split Admins](https://www.postman.com/harness-fme-enablement/harness-fme/collection/hyphfpd/before-and-after-apis-for-split-admins) on Postman.

:::info Changelog for 3/24/25
 
  * Added Harness API Doc URLs to the "Documentation" for each Harness endpoint.
  * Fixed base URLs for auth and resource group endpoints.
:::

![](./static/postman.gif)

## FAQs

### Are the Harness Project identifier and Split Project Id (wsId) equivalent? Can I use either in the Split Admin API endpoints after migration?

No. The Harness Project `identifier` and the Split Project ID (`wsId`) are not equivalent and cannot be used interchangeably in Split Admin API endpoints.

After migration, you need the Split project ID (`wsId`) to call Split Admin API endpoints that require a project (workspace) identifier. However, you no longer need to rely on the Harness project name to retrieve the `wsId`.

To retrieve the `wsId` for a Harness project:

1. Call the [Get Projects (Workspaces) endpoint](https://docs.split.io/reference/get-workspaces).
1. Filter the results using one of the following options:

   * Recommended: Use the `organizationIdentifier` and `projectIdentifier` query parameters.
   * Alternatively, use the `name` query parameter with the Harness project name (not the Harness project ID).

1. Extract the `id` field from the response and use it as the `wsId` in subsequent Split Admin API calls.

:::tip Notes
- Harness project names are not read-only and can be changed.
- Filtering by `organizationIdentifier` and `projectIdentifier` provides a more stable way to retrieve the correct `wsId`.
- The Harness platform project ID cannot be used directly in Split Admin API endpoints.
:::

For more information, see the **Retrieving a Project (Workspace) ID Using Harness Identifiers** section of the [Postman collection](https://www.postman.com/harness-fme-enablement/harness-fme/folder/qqutu4c/harness-after).

### Will this collection be published on GitHub as well?

Yes. You can access [this collection](https://github.com/splitio/public-api-postman) on GitHub as well as its [revision history](https://github.com/splitio/public-api-postman/commits/main/Before%20and%20After-%20APIs%20for%20Split%20Admins.postman_collection%20from%20harness-fme.json).

### Will the existing Postman collection for Split Public API endpoints on GitHub be maintained going forward?

Yes. For clarity and consistency the variables in that collection will be updated soon to use the same variables as this collection. Later, we will update it to include the “after” endpoints seen here. 
