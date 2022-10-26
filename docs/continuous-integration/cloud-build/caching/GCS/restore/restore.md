# Restore cache step

Step yaml syntax
```yaml
- step:
    identifier: restoreCache
    name: restore cache
    type: RestoreCacheGCS
    spec:
        connectorRef: <+input>
        key: m2-{{ checksum pom.xml }}
        bucket: cache
        region: us-west-2
        archiveFormat: Gzip
```

### Spec parameter reference

- **connectorRef** : GCP connector with permission to upload to specified bucket. Required

- **key** : cache key to restore the cached directories. Refer [key template](/caching/key-template/) to templatize the key. Required

- **bucket** : GCS bucket name. Required

- **region** : GCP bucket region. (`us-east-1`, `eu-west-1`, ...). Required

- **archive-format** : archive format to use to store the cache directories (`Tar`, `Gzip`) (default: `Tar`)

- **failIfKeyNotFound** : fails the step if cache is not found in S3 store (default: `false`)