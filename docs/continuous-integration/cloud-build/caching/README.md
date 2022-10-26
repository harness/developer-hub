# Caching

CI builds need to download external dependencies which rarely changes. Caching allows faster builds by saving the dependencies as an archive in an object store & restores them on-demand.

HarnessCI supports S3 and GCS object stores for caching.

How to use caching in a CI pipeline:
1. Restore the cache from object store
2. Run build and test steps
3. Save the cache to object store.

In the first build of a pipeline, restore cache step won't be able to find the cached data since it is not populated yet. So, build step will download the external dependencies and save cache step will publish them as an archive to the object store.

In subsequent build runs, restore step will find the cache data and download it. Since dependencies are already downloaded via restore step, build step won't require downloading the external dependencies which will save the build time.

## Examples

- [S3 caching with golang](examples/go-s3) 

### Save cache step

Save cache step saves the data to cache on an S3/GCS object store. Refer [S3 save cache step](S3/save/) or [GCS save cache step](GCS/save/) to know more about them.

### Restore cache step

Restore cache step restores the cached data from S3/GCS object store. Refer [S3 restore cache step](S3/restore/) or [GCS restore cache step](GCS/restore/) to know more about them.