## Connectivity loss
Customers may be naturally curious as to what may happen in the event of a potential network outage between Harness and the entity repository provider.  In this case, there are several scenarios to consider.  In general, while the connectivity is broken, Harness will utilize the "locked" cached version of the entity.

### Updates to remote entities at the remote entity repo
If autocreation is enabled, the new entities will not be created automatically and will have to be imported manually.  Another option would be for customers to recreate the file once the connectivity is fixed. For existing entities, we provide an option to `Reload from Git` where customers can manually reload from the repository once the connectivity is fixed.

![](/docs/platform/git-experience/static/entitycache-reloadfromgit.png)

At a base level, in case the entities `.yaml` files are updated on the remote repository while the connection is broken, the webhook event will never reach Harness and the cache that we maintain will never be updated. Customers should be able to see the attempt to reach Harness and a failure to reach Harness within the repo logs.

### Updates to remote entities from the Harness UI
If the connectivity is broken, customers will not be able to make changed to the entity locally.  The create/edit/delete operation will fail and the cache will not be updated.  The following error message may be seen when attempt to make an update.  This is because as a part of storing a remote entity, Harness cannot update the remote entity at the repo, resulting in the failure.

![](/docs/platform/git-experience/static/entitycache-brokenconnection.png)

### Harness Executions (no changes or updates)
For existing entities, if the connectivity is broken, the pipeline will continue running and reference last cache version of the entities during execution. This includes any remote entities that were kept in the remote repo.  Harness maintains cache with some expiration and so long as the cache hasn't expired, users will see a `Branch Fetch Failed` error, but still would be able to execute the pipeline.
![](/docs/platform/git-experience/static/entitycache-brokenconnectrun.png)

In case we don’t have cache for the pipeline, our end users would see a page where the pipeline would not be visible, as per the below screenshot. 
![](/docs/platform/git-experience/static/entitycache-brokenconnection.png)

Any updates made during the downtime period will not be reflected in the execution.  Basically, the cache has an effective "locked" state.  