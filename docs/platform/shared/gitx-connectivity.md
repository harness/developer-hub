## Connectivity loss
Customers may be naturally curious about what might happen in the event of a potential network outage between Harness and the entity repository provider.  In this case, several scenarios need to be considered.  In general, while the connectivity is broken, Harness will utilize the "locked" cached version of the entity.

### Updates to remote entities at the remote entity repo
If autocreation is enabled, new entities will not be created automatically and must be imported manually.  Another option would be for customers to recreate the file once the connectivity is fixed. For existing entities, we provide an option to `Reload from Git` where customers can manually reload from the repository once the connectivity is restored.

![](/docs/platform/git-experience/static/entitycache-reloadfromgit.png)

At a base level, if the entities' `.yaml` files are updated in the remote repository while the connection is broken, the webhook event will never reach Harness, and the cache we maintain will never be updated. Customers should be able to see both the attempt to reach Harness and the failure to reach Harness within the repository logs.

### Updates to remote entities from the Harness UI
If the connectivity is broken, customers will not be able to make changes to the entity locally.  The create, edit, or delete operation will fail, and the cache will not be updated.  The following error message may appear when attempting to update.  This is because, as part of storing a remote entity, Harness cannot update the remote entity at the repo, resulting in the failure.

![](/docs/platform/git-experience/static/entitycache-brokenconnection.png)

### Harness Executions (no changes or updates)
For existing entities, if the connectivity is broken, the pipeline will continue running and reference the last cache version of the entities during execution. This includes any remote entities that were kept in the remote repo.  Harness maintains a cache with an expiration, and as long as the cache hasn't expired, users will see a `Branch Fetch Failed` error, but will still be able to execute the pipeline.
![](/docs/platform/git-experience/static/entitycache-brokenconnectrun.png)

If we don’t have a cache for the pipeline or it has expired, our end users will see a page where the pipeline is not visible, as shown in the screenshot below. 
![](/docs/platform/git-experience/static/entitycache-brokenconnection.png)

Any updates made during the downtime period will not be reflected in the execution.  Basically, the cache has an effective "locked" state.  
