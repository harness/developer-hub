---
title: Entity caching with Git Experience
description: Improve load times for remote entities, with caching.
sidebar_position: 4
---

Entity caching reduces delays in loading your remote entities on the Harness UI. The Harness UI maintains a local cache to reduce delays in loading your remote entities. Caching is especially useful when there are multiple levels of nesting, such as those involving pipeline templates, stage templates, and step templates. Loading such nested entities can be time-consuming involving numerous network calls, thereby reducing the performance.

Harness caches the following remote entities:
- Remote pipelines
- Remote templates

:::note
The Git cache is only used to render entities faster in the Harness UI, not to improve pipeline execution. When executing a pipeline, Harness always fetches entities from Git to avoid using the stale data.
:::

You can reload the entities from Git and update the cache at any time. 

## Entity cache life cycle 

Harness UI uses the following cache life cycle to render a remote entity:
1. The first time you load a remote entity to the Harness UI, the Harness UI fetches the entity from Git, renders it in the UI, and then updates the cache. Subsequently, the Harness UI loads the entity from the cache.
2. Harness displays a green tick if an entity's cache has been updated in the last two hours.

    ![](../10_Git-Experience/static/activecache.png)

Harness displays an orange tick against any entity whose cache was last updated more than two hours ago.

   ![](../10_Git-Experience/static/stalecache.png)

   Refresh the cache and reload the entities from Git by selecting the refresh option. The following pop-up appears to confirm the reload of the entities from Git.

   ![](../10_Git-Experience/static/refreshcache.png)
  
  The cache status you see in the UI is only indicative of the cache status of the entity being fetched. Entities referenced within the fetched entity may have different cache statuses.
  For example, the cache status in the pipeline studio corresponds to the cache status of the pipeline. It is possible for referenced remote templates within this pipeline to have a different cache status.
  If you select refresh cache, the caches of all the referenced entities are also retrieved and reloaded from Git.

3.  Harness clears the cache for any entity that hasn't been referred to or loaded on the Harness UI in the previous 72 hours. Any subsequent access (whether through API or UI) will fetch the entity from GIT, update the cache, and return the response.
   
## Caching entities saved on multiple branches

To ensure isolation between caches for different entities for different branches, the cache for each entity is maintained separately for each branch. 
For example, if you have a stage template saved in separate branches in Git, Harness maintains a separate cache corresponding to each branch for the stage template. When this stage template is encountered during your entity fetch, the cache corresponding to a unique key is requested from the server. The server then looks for a cache with this key and returns the cache (if available). 

## Committing changes

When you commit changes to an entity that has been cached, Harness displays a warning if the cached version of the entity differs from that in Git.
To view the differences, click **See What Changed**.

![](../10_Git-Experience/static/commitcachedentity.png)

You can do one of the following when there are differences:
- **Cancel**: Retain changes made to the UI. There are no commits pushed to Git.
- **Save**: Resolve the conflicts and commit your changes in the UI to Git.

![](../10_Git-Experience/static/CacheDiff.png)

