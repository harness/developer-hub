---
title: Set favorites
description: Set your projects and connectors as favorites.
sidebar_position: 2
---

```mdx-code-block
import set_project_fav from './static/set-proj-fav.png'
import set_connector_fav from './static/set_connector_fav.png'
import filter_connector_fav from './static/filter-fav.png'
```

:::info important
Currently, this feature is behind the feature flag `PL_FAVORITES`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::


You can set the frequently accessed projects and connectors as favorites. Harness shows favorites on the listing page and helps you navigate faster to their favorite entities or pages.

You can set a connector as a favorite in any [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes).

## Set a project as a favorite

To set a project as a favorite: 
1. Select **Projects**.
2. Hover on the project you want to mark as a favorite, and select **Add to Favorites**.
   
   
   ```mdx-code-block
      <img src={set_project_fav} alt="set_project_fav" height="100" width="300"/>
   ```

## Set a connector as favorite

To set a connector as a favorite in Harness: 
1. Select **Projects**, and then select **Connectors**.
2. Select **Add to Favorites** beside the connector.

   ```mdx-code-block
      <img src={set_connector_fav} alt="set_connector_fav" height="300" width="600"/>
   ```

A filter is available on the listing pages to help you find your favorite projects and connectors. You can also filter favorite connectors in pipelines or other resources.

## View favorites

Select the favorites filter on the project or connector listing page to see all your favorite projects or connectors.

 ```mdx-code-block
    <img src={filter_connector_fav} alt="filter_connector_fav" height="300" width="600"/>
 ```