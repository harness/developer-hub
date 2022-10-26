# Restore cache step

Step yaml syntax
```yaml
- step:
    identifier: restoreCache
    name: restore cache
    type: RestoreCacheS3
    spec:
        connectorRef: <+input>
        key: m2-{{ checksum pom.xml }}
        bucket: cache
        region: us-west-2
        archiveFormat: Gzip
```

### Spec parameter reference

- **connectorRef** : AWS connector with permission to upload to specified bucket. Required

- **key** : cache key to restore the cached directories. Refer [key template](../../key-template/) to templatize the key. Required

- **bucket** : AWS bucket name. Required

- **region** : AWS bucket region. (`us-east-1`, `eu-west-1`, ...). Required

- **archive-format** : archive format to use to store the cache directories (`Tar`, `Gzip`) (default: `Tar`)

- **endpoint** : endpoint for the s3 connection. Only required for hosted s3 compatible store. e.g. minio

- **path-style** : use path style for bucket paths. (true for `minio`, false for `aws`) (default: `false`)

- **failIfKeyNotFound** : fails the step if cache is not found in S3 store (default: `false`)