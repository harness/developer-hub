---
title: Entity caching with Git Experience
description: Improve load times for remote entities, with caching.
sidebar_position: 4
---
import GitXconnect from '/docs/platform/shared/gitx-connectivity.md'

Entity caching reduces delays in loading your remote entities on the Harness UI. The Harness UI maintains a local cache to reduce delays in loading your remote entities. Caching is especially useful when there are multiple levels of nesting, such as those involving pipeline templates, stage templates, and step templates. Loading such nested entities can be time-consuming involving numerous network calls, thereby reducing the performance.

Harness caches the following remote entities:
- Remote pipelines
- Remote input sets
- Remote templates

:::note
The Git cache is only used to render entities faster in the Harness UI, not to improve pipeline execution. When executing a pipeline, Harness always fetches entities from Git to avoid using the stale data.
:::

You can reload the entities from Git and update the cache at any time. 

## What you will learn in this topic

- How Harness [sets up caching](#set-up-caching) for remote entities.
- How the cache is [maintained separately for each branch](#caching-entities-saved-on-multiple-branches).
- The [entity cache life cycle](#entity-cache-life-cycle) and how cache status is shown in the UI.
- How to [refresh the cache from Git](#refresh-the-cache-from-git), from the UI or through the API.
- What happens to the cache when you [commit cached changes](#commit-cached-changes).

## Set up caching
Caching occurs with Git entities (GitHub, Bitbucket, and others) where a webhook has been established. For example, set up a webhook as a part of [the GitX bidirectional sync](/docs/platform/git-experience/gitexp-bidir-sync-setup/#setup-via-webhooks-page) or a webhook as a part of [Bitbucket caching](/docs/continuous-delivery/kb-articles/articles/bitbucket-api-limit/#setting-up-a-webhook-for-caching).

Caching occurs for each webhook created on a **per repo** basis. Every repo that is storing entities needs its own webhook in order to establish caching.

## Caching entities saved on multiple branches

To ensure isolation between caches for different entities for different branches, the cache for each entity is maintained separately for each branch. 
For example, if you have a stage template saved in separate branches in Git, Harness maintains a separate cache corresponding to each branch for the stage template. When this stage template is encountered during your entity fetch, the cache corresponding to a unique key is requested from the server. The server then looks for a cache with this key and returns the cache (if available). 

## Entity cache life cycle 

Harness UI uses the following cache life cycle to render a remote entity:
1. The first time you load a remote entity to the Harness UI, the Harness UI fetches the entity from Git, renders it in the UI, and then updates the cache. Subsequently, the Harness UI loads the entity from the cache.
2. Harness displays a green tick if an entity's cache has been updated in the last two hours.

   ![](../git-experience/static/latest-cache.png)

   Harness displays an orange tick against any entity whose cache was last updated more than two hours ago.

   ![](../git-experience/static/stale-cache.png)

   You can refresh the cache and reload the entity from Git at any time. Go to [Refresh the cache from Git](#refresh-the-cache-from-git) to reload from the UI or through the API.

  The cache status you see in the UI is only indicative of the cache status of the entity being fetched. Entities referenced within the fetched entity may have different cache statuses.
  For example, the cache status in the pipeline studio corresponds to the cache status of the pipeline. It is possible for referenced remote templates within this pipeline to have a different cache status.
  If you refresh the cache, the caches of all the referenced entities are also retrieved and reloaded from Git.

3. Harness clears the cache for any entity that has not been fetched from Git in the previous 30 days. Any subsequent access (whether through the API or UI) fetches the entity from Git, updates the cache, and returns the response.

4. If the UI utilizes caching, the backend uses cached data and never pulls the latest from Git by default. 

5. When the cache is unavailable, Harness fetches the latest data from Git, updates the cache, and returns the response.

   For example, if you open a remote pipeline whose cache has expired, the backend updates its cache based on the latest Git version.
   
<GitXconnect />

## Refresh the cache from Git

The Git cache is used only to render remote entities faster in the Harness UI. When the source in Git changes, refresh the cache to pull the latest version. You can refresh the cache from the UI, or through the API.

Cache refresh is supported for the following **remote** entities:

- Pipelines
- Input sets
- Templates

:::note
Refresh applies to remote entities only. Inline entities are not stored in Git and do not use the Git cache.
:::

### Reload from Git

Use the **Reload from Git** option to refresh the cache and reload a remote entity from Git in the UI.

1. Open the remote pipeline, input set, or template in its studio.
2. Select the more options menu (**⋮**) in the top-right corner.
3. Select **Reload from Git**.

Harness fetches the latest version from the entity's Git branch, updates the cache, and re-renders the entity. The caches of all referenced entities are also reloaded from Git.

<div align="center">
  <DocImage path={require('./static/reload-from-git-menu.png')} width="90%" height="90%" alt="Reload from Git option in the more options menu of the pipeline studio" title="Click to view full size image" />
</div>

### Refresh the cache using the API

:::note
This feature is behind the feature flag `PIPE_GITX_FORCE_REFRESH`, which is disabled by default. Contact [Harness Support](mailto:support@harness.io) to enable it for your account.
:::

Each entity has a `refresh-and-get` endpoint that clears the cached copy of the entity, fetches the current version from the branch you specify, updates the cache, and returns the refreshed entity in a single call. This is the API equivalent of **Reload from Git**. These endpoints are available for remote pipelines, input sets, and templates.

Note the following when you call these endpoints:

- The `branch` query parameter is required. Harness refreshes the cache for the branch you specify and returns the entity from that branch.
- You need the same view permission that the UI requires: **View** on pipelines for pipelines and input sets, and **View** on templates for templates.

Go to the [Harness API reference](https://apidocs.harness.io/) to review the request and response schema for each `refresh-and-get` endpoint.

## Commit cached changes

When you commit changes to an entity that has been cached, Harness displays a warning if the cached version of the entity differs from that in Git.
To view the differences, select **See What Changed**.

![](../git-experience/static/commitcachedentity.png)

You can do one of the following when there are differences:
- **Cancel**: Retain changes made to the UI. There are no commits pushed to Git.
- **Save**: Resolve the conflicts and commit your changes in the UI to Git.

![](../git-experience/static/CacheDiff.png)

## Change a Git repo name
Go to [Repo renaming and Git Experience caching](/docs/platform/git-experience/harness-git-cache-rename) to understand the process a team should follow when renaming a Git repo.

## Next steps

- [Refresh the cache from Git](#refresh-the-cache-from-git): Reload a remote entity from the UI or through the API.
- [Set up bidirectional sync for Git Experience](/docs/platform/git-experience/gitexp-bidir-sync-setup): Keep Harness and Git in sync automatically through webhooks.
- [Repo renaming and Git Experience caching](/docs/platform/git-experience/harness-git-cache-rename): Handle the cache correctly when you rename a Git repo.